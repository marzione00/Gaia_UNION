import { asteroidBelt, cometTail } from './minor-bodies.js';
import { createCosmos, enrichCosmicStars, regionAt } from './cosmos.js';
import { galaxyCamera } from '../navigation/atlas-model.js';
import { MIN_STARS, SYSTEM_SCALE, buildSystems, bodyAtTime, systemArchitecture, systemPlanet, systemForPlanet, indicesForSystem, pickProjected } from './systems.js';
import { viewKey } from './navigation.js';
import { mesh, sphereMesh, transform, perspective, lookAt, mul, project, TAU } from '../renderer.js';
import { random, raySphere, backgroundStars } from './data.js';
import { planetProfile } from './assets.js';
const normal = v => { let n = Math.hypot(...v) || 1; return v.map(x => x / n); }, cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function annulus(inner=1,outer=1.006,planetary=false) {
    const v = [], ix = [];
    for (let i = 0; i <= 128; i++) {
        const a = i * TAU / 128;
        for (let k = 0; k < 2; k++)
            v.push(Math.cos(a) * (k?outer:inner), 0, Math.sin(a) * (k?outer:inner), 0, 1, 0, planetary?k:i/128, planetary?.5:k, 1, 1, 1, 1);
        if (i < 128) {
            let n = 2 * i;
            ix.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
        }
    }
    return mesh(v, ix);
}
function orbitMesh(body){
 const v=[],ix=[];
 for(let j=0;j<=192;j++){
  const p=bodyAtTime(body,(j/192*TAU-body.phase)/body.speed).position;
  for(const k of [0,1])v.push(...p.map(x=>x*(1+k*.0035)),0,1,0,j/192,k,1,1,1,1);
  if(j<192){const n=j*2;ix.push(n,n+1,n+2,n+1,n+3,n+2);}
 }
 return mesh(v,ix);
}
export function box(sx = 1, sy = 1, sz = 1) {
    const v = [], ix = [];
    const ps = [[-sx, -sy, -sz], [sx, -sy, -sz], [sx, sy, -sz], [-sx, sy, -sz], [-sx, -sy, sz], [sx, -sy, sz], [sx, sy, sz], [-sx, sy, sz]], faces = [[0, 3, 2, 1, 0, 0, -1], [4, 5, 6, 7, 0, 0, 1], [0, 4, 7, 3, -1, 0, 0], [1, 2, 6, 5, 1, 0, 0], [3, 7, 6, 2, 0, 1, 0], [0, 1, 5, 4, 0, -1, 0]];
    for (const f of faces) {
        const n = v.length / 12;
        for (let k = 0; k < 4; k++)
            v.push(...ps[f[k]], ...f.slice(4), 0, 0, 1, 1, 1, 1);
        ix.push(n, n + 1, n + 2, n, n + 2, n + 3);
    }
    return mesh(v, ix);
}
function tube(a, b, r = .025) {
    const d = normal(b.map((v, i) => v - a[i])), u = normal(cross(d, Math.abs(d[1]) < .95 ? [0, 1, 0] : [1, 0, 0])), v0 = cross(d, u), v = [], ix = [];
    for (let end = 0; end < 2; end++)
        for (let j = 0; j < 6; j++) {
            let t = j * TAU / 6, n = u.map((v, i) => v * Math.cos(t) + v0[i] * Math.sin(t)), c = end ? b : a;
            v.push(...c.map((x, i) => x + r * n[i]), ...n, 0, 0, 1, 1, 1, 1);
        }
    for (let j = 0; j < 6; j++) {
        let k = (j + 1) % 6;
        ix.push(j, k, j + 6, k, k + 6, j + 6);
    }
    return mesh(v, ix);
}
function merge(parts) {
    let v = [], ix = [];
    for (const m of parts) {
        let o = v.length / 12;
        for (const x of m.v)
            v.push(x);
        for (const i of m.i)
            ix.push(o + i);
    }
    return mesh(v, ix);
}
export const RESEARCH = [
    { id: 'gaia', label: 'GAIA', discipline: 4, pos: [0, 0, 2], module: 'gaia' },
    { id: 'functions', label: 'FUNZIONI', discipline: 0, pos: [-8, 2, 0], module: 'math-c08' },
    { id: 'systems', label: 'SISTEMI', discipline: 0, pos: [-11, -2, -1], module: 'math-c04' },
    { id: 'probability', label: 'PROBABILITÀ', discipline: 0, pos: [-7, -5, 0], module: 'math-c10' },
    { id: 'iterations', label: 'ITERAZIONI', discipline: 0, pos: [-5, 6, -1], module: 'math-p08' },
    { id: 'radiation', label: 'RADIAZIONE', discipline: 1, pos: [6, 6, 0], module: 'physics-01' },
    { id: 'energy', label: 'BILANCIO ENERGETICO', discipline: 1, pos: [4, 2, 1], module: 'gaia', section: 1 },
    { id: 'albedo', label: 'ALBEDO', discipline: 1, pos: [1, -3, 1], module: 'gaia', section: 1 },
    { id: 'atmosphere', label: 'ATMOSFERA', discipline: 2, pos: [9, 1, -1], module: 'chemistry-01' },
    { id: 'carbon', label: 'CICLO DEL CARBONIO', discipline: 2, pos: [9, -5, 0], module: 'chemistry-02' },
    { id: 'populations', label: 'POPOLAZIONI', discipline: 3, pos: [-3, -4, 1], module: 'gaia', section: 2 },
    { id: 'ecosystem', label: 'ECOSISTEMI', discipline: 3, pos: [3, -6, -1], module: 'biology-01' },
    { id: 'biodiversity', label: 'BIODIVERSITÀ', discipline: 3, pos: [-1, 7, -1], module: 'biology-02' },
    { id: 'feedback', label: 'RETROAZIONI', discipline: 4, pos: [0, 3, 1.5], module: 'gaia', section: 0 },
    { id: 'daisyworld', label: 'DAISYWORLD', discipline: 4, pos: [4, -1, 2], lab: 'daisyworld' },
    { id: 'exp', label: 'ESPONENZIALI', discipline: 0, pos: [-10, 6, -2], module: 'math-c06' }
];
export const EDGES = [[0, 13], [0, 14], [13, 1], [13, 6], [13, 12], [14, 6], [14, 7], [14, 10], [10, 11], [7, 8], [8, 9], [1, 2], [1, 3], [1, 4], [6, 5], [10, 15], [3, 12], [11, 9]];
const TINTS = [[.93, .78, .47, 1], [.38, .82, .91, 1], [.69, .57, .89, 1], [.59, .83, .56, 1], [.72, .95, .91, 1]];
export class World {
    constructor(gpu, textures, biomes) {
        this.R = gpu;
        this.textures = textures;
        this.biomes = biomes;
        this.biome = null;
        this.cameraScene = null;
        gpu.makeStars(backgroundStars(), true);
        this.systems = [];
        this.cameraSpace = 'other';
        this.cameraSystem = 7;
        this.projections = [];
        this.eye = [0, 23, 54];
        this.target = [0, 0, 0];
        this.fov = .84;
        this.vp = null;
        this.activateBiome(7);
        for (const [id, m] of [['sphere', sphereMesh(48, 32)], ['lowSphere', sphereMesh(14, 10)], ['fineSphere', sphereMesh(144, 96)], ['box', box()], ['ring', annulus()], ['planet-rings',annulus(1.3,2.35,true)]])
            gpu.makeMesh(id, m);
        let r = random(123);
        this.debris = Array.from({length:180},()=>{const a=r()*TAU,d=6.4+r()*1.5;return {pos:[Math.cos(a)*d,(r()-.5)*.16+Math.sin(a)*.55,Math.sin(a)*d],size:.018+r()*.075,spin:r()*TAU};});
        EDGES.forEach(([i,j],k)=>gpu.makeMesh('research-edge-'+k,tube(RESEARCH[i].pos,RESEARCH[j].pos,.032)));
        gpu.makeMesh('research-links', merge(EDGES.map(([i, j]) => tube(RESEARCH[i].pos, RESEARCH[j].pos, .022))));
        this.patches = Array.from({ length: 180 }, (_, i) => { let y = 1 - 2 * (i + .5) / 180, a = i * Math.PI * (3 - Math.sqrt(5)), rr = Math.sqrt(1 - y * y); return [Math.cos(a) * rr, y, Math.sin(a) * rr]; });
    }
    activateBiome(index) {
        const key=planetProfile(index).biome;
        if(this.biome===key)return;
        this.biome=key;this.surface=this.biomes[key];
        this.terrain={height:new Map(this.surface.grid.cells.map((p,i)=>[String(i),p]))};
        this.towers=this.surface.stations.map(s=>s.position);
        this.trees=Array.from({length:this.surface.vegetationCount});
    }
    bindStars(stars, modules) {
        this.systems=buildSystems(stars,modules);this.cosmos=createCosmos(this.systems);this.R.cosmos=this.cosmos;enrichCosmicStars(stars,this.cosmos,this.systems);
        const rock=sphereMesh(6,4);
        for(const system of this.systems){
            for(const body of system.bodies)this.R.makeMesh('orbit-'+body.id,orbitMesh(body));
            if(system.id%3===1){const belt=asteroidBelt(system,rock);system.belt={count:belt.count,inner:belt.inner,outer:belt.outer};this.R.makeMesh('belt-'+system.id,belt);}
            if(system.id%9===3){
                const head=[-system.outerRadius*.6,2.2,-system.outerRadius*.65];system.comet={head};
                this.R.makeMesh('ion-tail-'+system.id,cometTail(head,7,.16));this.R.makeMesh('dust-tail-'+system.id,cometTail(head,5,.42,1.5));
            }
        }
        return this.systems;
    }
    systemPosition(id) { return this.systems[id]?.position || [0,0,0]; }
    galacticCamera(camera) {
        if(camera.space!=='system')return {eye:camera.eye,target:camera.target,fov:camera.fov};
        const origin=this.systemPosition(camera.system);
        return {eye:camera.eye.map((v,i)=>origin[i]+v*SYSTEM_SCALE),target:camera.target.map((v,i)=>origin[i]+v*SYSTEM_SCALE),fov:camera.fov};
    }
    desiredCamera(scene,s) {
        const w=this.R.w,h=this.R.h,system=s.system??systemForPlanet(s.selected);let eye,target=[0,0,0],fov=.84,space='other';
        if(scene==='galaxy'){
            ({eye,target}=galaxyCamera(s,w,h));space='galaxy';
        }else if(scene==='system'){
            const distance=s.distance*Math.max(1,systemArchitecture(system).outerRadius/13)*Math.max(1,1.05/(w/h)),pitch=s.pitch;
            eye=[Math.sin(s.yaw)*distance*Math.cos(pitch),distance*Math.sin(pitch),Math.cos(s.yaw)*distance*Math.cos(pitch)];target=w<850?[0,0,0]:[2.4,0,0];fov=.78;space='system';
        }else if(scene==='orbit'){
            const body=systemPlanet(s.selected,s.time),angle=s.yaw*.45+Math.atan2(-body.position[0],-body.position[2])+.55,pitch=.14+(s.pitch-.45)*.35,scale=body.radius/5.3,distance=s.distance||22;
            const heroEye=[Math.sin(angle)*distance*Math.cos(pitch),Math.sin(pitch)*distance,Math.cos(angle)*distance*Math.cos(pitch)];
            const framing=[Math.cos(angle)*2,0,-Math.sin(angle)*2];
            eye=heroEye.map((v,i)=>body.position[i]+(v+framing[i])*scale);target=body.position.map((v,i)=>v+framing[i]*scale);space='system';
        }else if(scene==='surface'){
            const angle=.6+s.yaw*.5,pitch=Math.max(.24,Math.min(.96,.58+(s.pitch-.45)*.6)),distance=52;
            eye=[Math.sin(angle)*distance*Math.cos(pitch),Math.sin(pitch)*distance+2,Math.cos(angle)*distance*Math.cos(pitch)];target=w<850?[-3,1.8,-1]:[3,1.8,-2];fov=.60;
        }else if(scene==='research')eye=[Math.sin(s.yaw*.12)*3,1,37];
        else if(scene==='lab'&&s.lab==='daisyworld')eye=[0,4,30];
        else eye=[0,5,32];
        return {eye,target,fov,space,system};
    }
    camera(scene,s) {
        const desired=this.desiredCamera(scene,s),key=viewKey(scene,s),previous=this.cameraSpace;
        if(this.cameraScene!==key){
            this.cameraFrom=this.vp?{eye:[...this.eye],target:[...this.target],fov:this.fov,space:this.cameraSpace,system:this.cameraSystem}:null;
            this.cameraProgress=0;this.cameraScene=key;
            this.bridge=!!this.cameraFrom&&((previous==='galaxy'&&desired.space==='system')||(previous==='system'&&desired.space==='galaxy'));
            this.travelSystem=desired.space==='system'?desired.system:this.cameraSystem;
        }
        this.cameraProgress=Math.min(1,this.cameraProgress+Math.min(80,Math.max(0,s.lastFrameMs||16))/(this.bridge?1750:950));
        if(s.paused||!this.cameraFrom)this.cameraProgress=1;
        const t=this.cameraProgress*this.cameraProgress*(3-2*this.cameraProgress);
        let from=this.cameraFrom,to=desired;
        this.travelling=this.bridge&&this.cameraProgress<1;
        if(this.travelling){from=this.galacticCamera(from);to=this.galacticCamera(desired);}
        // Different unrelated teaching scenes use the destination frame directly.
        if(!this.travelling&&from&&from.space!==desired.space)from=null;
        if(from&&t<1){
            const a=from.eye.map((v,i)=>v-from.target[i]),b=to.eye.map((v,i)=>v-to.target[i]),da=Math.hypot(...a),db=Math.hypot(...b);
            let direction=a.map((v,i)=>v/da*(1-t)+b[i]/db*t);direction=normal(Math.hypot(...direction)<.001?b:direction);
            const distance=Math.exp(Math.log(Math.max(.00001,da))*(1-t)+Math.log(Math.max(.00001,db))*t);
            const targetT=this.travelling?(desired.space==='system'?1-Math.pow(1-t,3):Math.pow(t,3)):t;
            this.target=from.target.map((v,i)=>v*(1-targetT)+to.target[i]*targetT);this.eye=this.target.map((v,i)=>v+direction[i]*distance);this.fov=from.fov*(1-t)+to.fov*t;
        }else{this.eye=[...to.eye];this.target=[...to.target];this.fov=to.fov;}
        this.cameraSpace=this.travelling?'galaxy':desired.space;this.cameraSystem=this.travelling?this.travelSystem:desired.system;
        this.vp=mul(perspective(this.fov,this.R.w/this.R.h,this.cameraSpace==='galaxy'?.00004:.012,400),lookAt(this.eye,this.target));
        const cosmic=this.galacticCamera({eye:this.eye,target:this.target,fov:this.fov,space:this.cameraSpace,system:this.cameraSystem});
        this.galaxyEye=cosmic.eye;this.galaxyTarget=cosmic.target;
        this.galaxyVP=mul(perspective(this.fov,this.R.w/this.R.h,.00004,500),lookAt(cosmic.eye,cosmic.target));
    }
    drawPlanet(body,time,center,radius,light,detailed=false) {
        const moons=Array.from({length:body.moons},(_,j)=>{const a=time*(.06/(j+1))+body.phase+j*2.4,d=radius*(2.8+j*.65);return {center:center.map((v,i)=>v+[Math.cos(a)*d,Math.sin(a)*d*.12,Math.sin(a)*d][i]),radius:radius*(.12+j*.025),angle:a};});
        const R=this.R,profile=body.profile,options={eye:this.eye,light,material:12,center,radius,texture:this.planetTextures?.get(profile.texture,detailed)||this.textures[profile.texture],atmosphere:profile.atmosphere,ocean:profile.ocean,occluders:moons.map(m=>[...m.center,m.radius])},size=radius/5.3;
        const geometry=this.R.meshes.has('planet-'+profile.texture)?'planet-'+profile.texture:detailed?'fineSphere':'sphere',rotation=time*body.spin+body.rotation;
        R.drawMesh(geometry,this.vp,transform(...center,radius,rotation,body.tilt),options);
        if(profile.clouds)R.drawMesh(geometry,this.vp,transform(...center,radius*1.006,rotation+time*.002,body.tilt),{...options,texture:this.planetTextures?.get('clouds',detailed)||this.textures.clouds,material:5,opacity:.9});
        if(profile.atmosphere)R.drawMesh(geometry,this.vp,transform(...center,radius*1.028),{...options,material:6,opacity:body.type==='desert'?.35:.85});
        if(body.rings)R.drawMesh('planet-rings',this.vp,transform(...center,radius,0,body.tilt),{eye:this.eye,light,texture:this.textures.rings,material:13,opacity:.88});
        for(const moon of moons)R.drawMesh(detailed?'sphere':'lowSphere',this.vp,transform(...moon.center,moon.radius,moon.angle),{eye:this.eye,light,material:12,texture:this.textures.moon,occluders:[[...center,radius]]});
        if(detailed&&body.explorable){
            const probe=center.map((v,i)=>v+[-4.9,-2.6,2.1][i]*size);
            R.drawMesh('box',this.vp,transform(...probe,.07*size,.3),{eye:this.eye,light,tint:[.76,.68,.47,1]});
            for(const side of [-1,1]){const m=transform(probe[0]+side*.24*size,probe[1],probe[2],.1*size,.3);for(const i of [0,1,2])m[i]*=1.55;for(const i of [4,5,6])m[i]*=.08;R.drawMesh('box',this.vp,m,{eye:this.eye,light,tint:[.08,.18,.29,1]});}
        }
    }
    drawSystem(s) {
        const R=this.R,id=this.travelling?this.travelSystem:s.system,system=this.systems[id];if(!system)return;
        const scale=this.cameraSpace==='galaxy'?SYSTEM_SCALE:1,origin=this.cameraSpace==='galaxy'?system.position:[0,0,0];
        const map=p=>p.map((v,i)=>origin[i]+v*scale),starColor=system.color.map(v=>Math.max(.3,v)),starRadius=system.starRadius*scale;
        R.drawMesh('fineSphere',this.vp,transform(...origin,starRadius,s.time*.025),{eye:this.eye,material:9,tint:[...starColor,1],seed:id,radius:starRadius,center:origin});
        R.drawMesh('sphere',this.vp,transform(...origin,starRadius*1.19),{eye:this.eye,material:11,tint:[...starColor,1],opacity:.75,radius:starRadius,center:origin});
        if(system.belt)R.drawMesh('belt-'+id,this.vp,transform(...origin,scale,s.time*.0008),{eye:this.eye,center:origin,material:15,texture:this.textures.moon});
        if(system.comet){
            const head=map(system.comet.head);
            R.drawMesh('lowSphere',this.vp,transform(...head,.075*scale),{eye:this.eye,material:12,texture:this.textures.moon});
            R.drawMesh('dust-tail-'+id,this.vp,transform(...origin,scale),{eye:this.eye,material:14,tint:[.6,.49,.28,1],opacity:.45});
            R.drawMesh('ion-tail-'+id,this.vp,transform(...origin,scale),{eye:this.eye,material:14,tint:[.18,.56,.92,1],opacity:.65});
        }
        for(const body of system.bodies){
            const p=bodyAtTime(body,s.time),center=map(p.position),radius=p.radius*scale;
            if(s.scene!=='orbit')R.drawMesh('orbit-'+body.id,this.vp,transform(...origin,scale),{eye:this.eye,tint:body.explorable?TINTS[body.sector]:[.32,.36,.39,1],opacity:s.scene==='orbit'?.035:body.explorable?.26:.11,emission:.35});
            this.drawPlanet(p,s.time,center,radius,normal(p.position.map(v=>-v)),s.scene==='orbit'&&body.index===s.selected);
            const xy=project(center,this.vp,R.w,R.h),apparent=radius*R.h/(2*Math.tan(this.fov/2)*xy[2]);
            if(s.scene==='system'&&!this.travelling)this.projections.push({type:body.explorable?'planet':'ambient',index:body.explorable?body.index:body.slot,body,...xyToObj(xy),r:Math.max(11,apparent*1.12),position:center,worldRadius:radius});
        }
    }
    draw(scene, s, data) {
        const R = this.R;
        this.activateBiome(s.selected);
        this.camera(scene, s); R.time=s.time;
        this.projections = [];
        const surface=scene==='surface';
        R.fogColor=this.surface.fog.color.map(x=>x*.58);R.fogDensity=surface?this.surface.fog.density:0;R.mist=surface&&this.biome==='simbiosi';
        const cosmic=['galaxy','system','orbit'].includes(scene);
        R.drawEnvironment(surface?2:cosmic?1:0,cosmic?this.galaxyEye:this.eye,cosmic?this.galaxyTarget:this.target,this.fov,this.surface.light.direction,R.fogColor,cosmic?.72:1);
        if(cosmic){
            if(R.starCount<MIN_STARS)throw Error('Rendering interrotto: meno di un milione di stelle');
            R.drawStars(this.galaxyVP,R.starCount,0,false,.28+.57*Math.min(1,Math.hypot(...this.galaxyEye.map((v,i)=>v-this.galaxyTarget[i]))/30));
        }else if(!surface)R.drawStars(this.vp,6000,0,true);
        if(scene==='galaxy'){
            if(this.travelling)this.drawSystem(s);
            else for(const system of this.systems){
                const xy=project(system.position,this.vp,R.w,R.h);
                this.projections.push({type:'system',index:system.id,...xyToObj(xy),r:14,starIndex:system.starIndex});
            }
        }else if(scene==='system'||scene==='orbit')this.drawSystem(s);
        else if (scene === 'surface') {
            const ortho=new Float32Array([1/48,0,0,0,0,1/48,0,0,0,0,-2/150,0,0,0,-1,1]);
            const light=this.surface.light.direction,lightEye=light.map(x=>x*75),lightVP=mul(ortho,lookAt(lightEye,[0,0,0]));
            R.renderShadow(this.biome,this.surface.meshes.filter(m=>m.kind!==2).map(m=>m.id),lightVP);
            if(this.biome==='marea')R.renderReflection(this.vp,this.eye,this.surface.meshes.filter(m=>m.kind!==2).map(m=>m.id),light);
            for(const m of this.surface.meshes)R.drawMesh(m.id,this.vp,transform(),{eye:this.eye,light,material:10});
            for(const station of this.surface.stations){
                const p=station.position,label=station.labelPosition,selected=station.index===s.station;
                if(selected)R.drawMesh('ring',this.vp,transform(p[0],p[1]+.12,p[2],station.radius*1.08),{eye:this.eye,tint:TINTS[station.index],emission:.7,opacity:.7});
                this.projections.push({type:'station',index:station.index,...xyToObj(project(label,this.vp,R.w,R.h)),r:28,position:p,worldRadius:station.radius});
            }
        }
        else if (scene === 'research') {
            R.drawMesh('research-links', this.vp, transform(), { eye: this.eye, tint: TINTS[1], opacity: .55, emission: .3 });
            EDGES.forEach(([a,b],k)=>{if(a===s.node||b===s.node)R.drawMesh('research-edge-'+k,this.vp,transform(),{eye:this.eye,tint:TINTS[4],emission:.6,opacity:.85});});
            RESEARCH.forEach((n, i) => {
                let selected = i === s.node;
                R.drawMesh('sphere', this.vp, transform(...n.pos, n.discipline === 4 ? .52 : .30, s.time * .04), { eye: this.eye, tint: TINTS[n.discipline], emission: selected ? .4 : .08, rim: .25 });
                if (selected)
                    R.drawMesh('ring', this.vp, transform(...n.pos, .85, 0, Math.PI / 2), { eye: this.eye, tint: TINTS[n.discipline], emission: .5, opacity: .8 });
                this.projections.push({ type: 'node', index: i, ...xyToObj(project(n.pos, this.vp, R.w, R.h)), r: 18 });
            });
        }
        else if (scene === 'lab' && s.lab === 'daisyworld') {
            const d = s.sim.final, c = [-6, 0, 0], r = 4.9;
            R.drawMesh('fineSphere', this.vp, transform(...c, r, s.time * .025), { eye: this.eye, tint: [.31, .40, .29, 1], rim: .3 });
            const nb = Math.round(d.black * 180), nw = Math.round(d.white * 180);
            for (let i = 0; i < nb + nw && i < 180; i++) {
                const p = this.patches[i];
                R.drawMesh('lowSphere', this.vp, transform(c[0] + p[0] * r, p[1] * r, p[2] * r, .19), { eye: this.eye, tint: i < nb ? [.07, .10, .12, 1] : [.92, .94, .83, 1], emission: .03 });
            }
            R.drawMesh('ring', this.vp, transform(...c, r * 1.08), { eye: this.eye, tint: TINTS[3], opacity: .5, emission: .3 });
        }
        else {
            R.drawMesh('sphere', this.vp, transform(10, 0, -13, 7, s.time * .023), { texture: this.textures.earth, eye: this.eye, rim: .4, opacity: .48 });
        }
    }
    pick(x, y, s) {
        if(this.cameraProgress<1)return null;
        if(s.scene==='galaxy')return pickProjected(this.projections,x,y);
        if(s.scene==='system'){
            const hits=this.projections.filter(p=>p.depth>0&&Math.hypot(p.x-x,p.y-y)<=p.r).sort((a,b)=>a.depth-b.depth);
            const hit=hits[0];if(!hit)return null;
            // Do not pick a planet hidden behind the stellar disc.
            const star=project([0,0,0],this.vp,this.R.w,this.R.h),r=this.systems[s.system].starRadius*this.R.h/(2*Math.tan(this.fov/2)*star[2]);
            return star[2]>0&&star[2]<hit.depth&&Math.hypot(star[0]-x,star[1]-y)<r?null:hit;
        }
        if(s.scene==='surface'){
            const f=normal(this.target.map((v,i)=>v-this.eye[i])),right=normal(cross(f,[0,1,0])),up=cross(right,f),t=Math.tan(this.fov/2);
            const direction=normal(f.map((v,i)=>v+right[i]*(2*x/this.R.w-1)*t*this.R.w/this.R.h+up[i]*(1-2*y/this.R.h)*t));
            const label=this.projections.find(p=>p.depth>0&&Math.hypot(p.x-x,p.y-y)<p.r);if(label)return label;
            let hit=null,near=Infinity;
            for(const station of this.surface.stations){const center=[station.position[0],(station.position[1]+station.labelPosition[1])*.5,station.position[2]],d=raySphere(this.eye,direction,center,station.radius);if(d!==null&&d<near){near=d;hit={type:'station',index:station.index};}}
            return hit;
        }
        return this.projections.filter(p => p.depth > 0 && Math.hypot(p.x - x, p.y - y) < p.r).sort((a, b) => a.depth - b.depth)[0] || null;
    }
}
function xyToObj(p) { return { x: p[0], y: p[1], depth: p[2] }; }
