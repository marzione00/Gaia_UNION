import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {stars} from '../src/scene/data.js';
import {MIN_STARS,systemArchitecture,bodyAtTime,buildSystems,highlightSystemStars,systemForPlanet,indicesForSystem,systemPlanet,HoverTarget,pickProjected} from '../src/scene/systems.js';
import {NavigationMemory} from '../src/scene/navigation.js';
import {fresh,cleanState} from '../src/store.js';import {resolveRoute} from '../src/routing.js';
import {GPU,project} from '../src/renderer.js';import {World} from '../src/scene/world.js';
const modules=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url))).modules;
const points=stars(MIN_STARS),systems=buildSystems(points,modules);
test('Sistemi: 25 stelle navigabili appartengono allo stesso buffer da un milione',()=>{
 assert.equal(systems.length,25);assert.equal(new Set(systems.map(s=>s.starIndex)).size,25);
 for(const s of systems){assert.deepEqual(s.position,Array.from(points.slice(s.starIndex*7,s.starIndex*7+3)));assert.equal(s.available,4);assert.equal(s.planets.length,4);}
 assert.throws(()=>buildSystems(stars(250000),modules),/1.000.000/);
});
test('Sistemi: tutte le 100 unità compaiono una volta e in quattro discipline',()=>{
 const all=systems.flatMap(s=>s.planets);assert.equal(new Set(all).size,100);assert.equal(Math.min(...all),0);assert.equal(Math.max(...all),99);
 for(const s of systems)assert.deepEqual(s.planets.map(i=>modules[i].sector),[0,1,2,3]);
 for(let i=0;i<100;i++)assert.ok(indicesForSystem(systemForPlanet(i)).includes(i));
});
test('Sistemi: evidenziare una stella conserva tutte le coordinate XYZ',()=>{
 const a=points.slice();highlightSystemStars(a,systems);
 for(let i=0;i<a.length;i++)if(i%7!==6)assert.equal(a[i],points[i]);
 assert.ok(systems.every(s=>a[s.starIndex*7+6]===11));
});
test('Sistemi: orbite tridimensionali continue e separate dalla galassia',()=>{
 for(let i=0;i<100;i++){const a=systemPlanet(i,10),b=systemPlanet(i,10.016);assert.ok(Math.hypot(...a.position)>=a.orbit*(1-a.eccentricity)-1e-10&&Math.hypot(...a.position)<=a.orbit*(1+a.eccentricity)+1e-10);assert.ok(Math.hypot(...a.position.map((v,j)=>v-b.position[j]))<.01);assert.ok(a.radius<a.orbit/3);}
});
test('Hover: ritardo, cambio bersaglio, uscita e blocco durante trascinamento',()=>{
 const hover=new HoverTarget(130),a={type:'system',index:7},b={type:'system',index:8};assert.equal(hover.update(a,0),null);assert.equal(hover.update(a,129),null);assert.equal(hover.update(a,130),a);assert.equal(hover.update(b,140),null);assert.equal(hover.update(b,300),b);assert.equal(hover.update(b,301,true),null);assert.equal(hover.update(null,302),null);
});
test('Picking: ignora punti dietro la camera e sceglie il centro più vicino',()=>{
 const p=[{index:0,x:100,y:100,r:14,depth:-1},{index:1,x:102,y:100,r:14,depth:20},{index:2,x:109,y:100,r:14,depth:10}];assert.equal(pickProjected(p,102,100).index,1);assert.equal(pickProjected(p,900,100),null);
});
test('Navigazione: ritorno conserva camera, zoom e filtro per ciascun livello',()=>{
 const n=new NavigationMemory(),s={scene:'galaxy',selected:7,system:7,yaw:1.2,pitch:.61,distance:49,sector:2};
 n.move(s,'system',{system:7});Object.assign(s,{yaw:.7,pitch:.32,distance:27});n.move(s,'orbit',{selected:57});Object.assign(s,{yaw:1,pitch:.6,distance:18});n.move(s,'surface');n.move(s,'orbit');assert.deepEqual([s.yaw,s.pitch,s.distance],[1,.6,18]);n.move(s,'system',{system:7});assert.deepEqual([s.yaw,s.pitch,s.distance],[.7,.32,27]);n.move(s,'galaxy');assert.deepEqual([s.yaw,s.pitch,s.distance,s.sector],[1.2,.61,49,2]);
});
test('Archivio: i vecchi budget diventano qualità effetti, mai meno stelle',()=>{
 for(const [quality,graphics] of [[60000,'low'],[250000,'balanced'],[1000000,'high']]){const s=fresh();s.preferences.quality=quality;s.preferences.graphics=undefined;s.notes.general='Conservata';const c=cleanState(s);assert.equal(c.preferences.quality,1000000);assert.equal(c.preferences.graphics,graphics);assert.equal(c.notes.general,'Conservata');}
});
test('Rotte: sistema nel permalink, compatibilità dei pianeti e parametri malformati',()=>{
 const resolve=hash=>resolveRoute(hash,modules,['math-c08','gaia']);
 assert.equal(resolve('#/system?system=12').system,12);assert.equal(resolve('#/system?system=12').selected,12);
 assert.equal(resolve('#/system?system=NaN').system,7);assert.equal(resolve('#/system?system=10000').system,24);
 assert.equal(resolve('#/orbit?unit=biology-08').system,7);assert.equal(resolve('#/planet/math-c08').scene,'orbit');
});
test('Renderer: la chiamata GPU invia un milione di punti, i budget minori sono rifiutati',()=>{
 const draws=[],gl=new Proxy({POINTS:0,getUniformLocation:()=>0,drawArrays:(...a)=>draws.push(a)},{get:(o,k)=>k in o?o[k]:()=>{}});
 const r={gl,pStars:1,starVao:2,starCount:1000000,h:1000,dpr:1,sceneScale:.6,time:0,uniform:()=>0,frameStats:{stars:0,starDrawCalls:0}};
 GPU.prototype.drawStars.call(r,new Float32Array(16),1000000);assert.deepEqual(draws,[[0,0,1000000]]);assert.equal(r.frameStats.stars,1000000);assert.throws(()=>GPU.prototype.drawStars.call(r,new Float32Array(16),60000),/1.000.000/);
});
test('Camera: zoom multiscala termina entro due secondi senza salto di proiezione',()=>{
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes;
 const w=new World({w:1600,h:1000,makeStars(){},makeMesh(){}},{},biomes);w.systems=systems;
 const s={scene:'galaxy',selected:7,system:7,yaw:0,pitch:.45,distance:60,time:0,paused:true,lastFrameMs:16};w.camera('galaxy',s);
 Object.assign(s,{scene:'system',distance:34,pitch:.48,paused:false});
 let before;for(let frame=0;frame<109;frame++){w.camera('system',s);before=project(systems[7].position,w.vp,1600,1000);assert.ok(w.vp.every(Number.isFinite));}
 assert.ok(w.cameraProgress<1);w.camera('system',s);assert.equal(w.cameraProgress,1);assert.equal(w.cameraSpace,'system');const after=project([0,0,0],w.vp,1600,1000);assert.ok(Math.hypot(before[0]-after[0],before[1]-after[1])<2);
 Object.assign(s,{scene:'galaxy',distance:60,pitch:.45});
 for(let frame=0;frame<109;frame++){w.camera('galaxy',s);before=project(systems[7].position,w.vp,1600,1000);assert.ok(w.vp.every(Number.isFinite));}
 w.camera('galaxy',s);assert.equal(w.cameraProgress,1);assert.equal(w.cameraSpace,'galaxy');const returned=project(systems[7].position,w.vp,1600,1000);assert.ok(Math.hypot(before[0]-returned[0],before[1]-returned[1])<2);
});

test('Sistemi: conteggio casuale stabile da 5 a 12 e quattro soli pianeti esplorabili',()=>{
 const counts=new Set();let total=0;
 for(let i=0;i<25;i++){const a=systemArchitecture(i),b=systemArchitecture(i);assert.deepEqual(a,b);assert.ok(a.count>=5&&a.count<=12);assert.equal(a.bodies.length,a.count);counts.add(a.count);total+=a.count;assert.equal(a.bodies.filter(p=>p.explorable).length,4);assert.ok(a.bodies.filter(p=>!p.explorable).every(p=>p.index===null));assert.ok(a.bodies.filter(p=>p.explorable).every(p=>p.profile.solid));}
 assert.ok(counts.size>=6);assert.ok(total>150);assert.notDeepEqual(systemArchitecture(3,1),systemArchitecture(3,2));
});
test('Sistemi: famiglie, raggi, lune, anelli e orbite realmente eterogenei',()=>{
 const all=Array.from({length:25},(_,i)=>systemArchitecture(i)).flatMap(s=>s.bodies);
 assert.ok(new Set(all.map(p=>p.type)).size>=10);assert.ok(new Set(all.map(p=>p.radius.toFixed(2))).size>20);assert.ok(all.some(p=>p.rings));assert.ok(all.some(p=>p.moons===0)&&all.some(p=>p.moons>=3));
 for(let i=0;i<25;i++){const a=systemArchitecture(i);assert.equal(new Set(a.bodies.filter(p=>p.explorable).map(p=>p.type)).size,4);for(let j=1;j<a.bodies.length;j++){const p=a.bodies[j-1],q=a.bodies[j];assert.ok(q.orbit*(1-q.eccentricity)-q.radius>p.orbit*(1+p.eccentricity)+p.radius);}}
});
