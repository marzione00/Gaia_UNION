import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetCards } from '../src/worlds/genome.js';
import { sphereTerrain } from '../src/worlds/orbit-texture.js';
import { landingSite, surfaceField, storedSite, siteOf, stitch, CORE, ANGLE, RINGS } from '../src/worlds/field.js';
import { GroundClipmap, LEVELS, CELLS, REACH, half, centreOf } from '../src/worlds/clipmap.js';
import { EDGE } from '../src/worlds/explorer.js';
import { LANDING_SITES } from '../src/worlds/landing-sites.js';
import { planetSurface, surfaceScatter, EXTENT, GRID } from '../src/worlds/surface.js';
import { HEADER } from '../scripts/landing-sites.mjs';
import { World, HORIZON } from '../src/scene/world.js';
// Terrain of the landing surfaces (1.62.0): the piece of the planet seen from orbit around its landing site;
// since 1.70.0 streamed around the camera in six nested grids up to the horizon, with no crack where they meet.
// Planets of every family whose search is quick: the whole file takes about a minute to recompute.
const G=planetCards(),SAMPLE=[1,8,5,18,42,54,11,22,10,25,35,43];
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('siti di atterraggio: salvati come li trova la ricerca, terra sotto le stazioni, lontano dai poli',()=>{
 assert.equal(LANDING_SITES.length,125);assert.equal(LANDING_SITES.length,G.length);
 for(const s of LANDING_SITES){assert.equal(s.length,5);assert.ok(s.every(Number.isFinite));assert.ok(Math.abs(Math.hypot(s[0],s[1],s[2])-1)<1e-5);assert.ok(Math.abs(s[1])<=.86);}
 // The file is the output of the search, checked on twelve planets.
 for(const i of SAMPLE)assert.deepEqual(storedSite(landingSite(G[i])),LANDING_SITES[i],'pianeta '+i);
 assert.ok(read('src/worlds/landing-sites.js').startsWith(HEADER+'\n'),'src/worlds/landing-sites.js da rigenerare con node scripts/landing-sites.mjs');
 for(const [i,g] of G.entries()){const F=surfaceField(g,LANDING_SITES[i]);assert.ok(F.Y(14,28)>0,'stazioni in acqua sul pianeta '+i);assert.ok(F.Y(0,0)>0,'centro in acqua sul pianeta '+i);}
});
test('superficie dalla sfera: coste e mari dell\'orizzonte sono quelli della mappa d\'orbita',()=>{
 const diffs=[];
 for(const [i,g] of G.entries()){
  const F=surfaceField(g,LANDING_SITES[i]),T=F.terrain;let a=0,b=0,c=0;
  // Over the square the field is the map of the sphere plus the local style, at most half its weight away.
  for(const [x,z] of [[0,0],[50,-30],[-80,60],[100,100]])assert.ok(Math.abs(F.E(x,z)-T.height(F.dir(x,z)))<=F.L/2+1e-9);
  for(let r=300;r<=1700;r+=200)for(let k=0;k<24;k++){const x=Math.cos(k*Math.PI/12)*r,z=Math.sin(k*Math.PI/12)*r;c++;a+=F.E(x,z)<F.sea;b+=T.height(F.dir(x,z))<F.sea;}
  diffs.push(Math.abs(a-b)/c);
  // The direction of a point is on the tangent plane at ANGLE rad per unit.
  const d0=F.dir(0,0),d1=F.dir(1000,0),ang=Math.acos(d0[0]*d1[0]+d0[1]*d1[1]+d0[2]*d1[2]);assert.ok(Math.abs(ang-Math.atan(1000*ANGLE))<1e-9);
 }
 diffs.sort((x,y)=>x-y);
 assert.ok(diffs[62]<=.02,'mediana '+diffs[62]);assert.ok(diffs[124]<=.3,'massimo '+diffs[124]);
 assert.equal(sphereTerrain(G[7]).sea,surfaceField(G[7],LANDING_SITES[7]).sea);
});
test('terreno in streaming: sei griglie annidate fino a 2048 unità, senza crepe, uguali al quadrato delle stazioni',()=>{
 assert.equal(EXTENT,CORE);assert.equal(HORIZON,CORE/2*2**RINGS.length);assert.equal(REACH,2048);assert.equal(half(0),64);assert.ok(EDGE+half(0)<REACH);
 // The edges of the grid of the stations still fall on the lines of a 4-unit grid.
 RINGS.forEach((step,k)=>assert.equal((CORE/2*2**k)%step,0,'bordo fuori griglia per il passo '+step));
 for(const i of [7,36,99]){
  const s=planetSurface(i),G=new GroundClipmap(s);
  for(const [fx,fz] of [[2,2],[613,-298],[EDGE,-EDGE]]){
   G.update(fx,fz);const at=k=>{const L=G.levels[k],v=L.mesh.v,n=CELLS+1,map=new Map();for(let q=0;q<n*n;q++)map.set(v[q*16]+','+v[q*16+2],v[q*16+1]);return map;};
   for(const L of G.levels){const [cx,cz]=L.centre;assert.deepEqual([cx,cz],centreOf(L.k,fx,fz));assert.equal(cx%(2*L.step),0);
    const v=L.mesh.v;let mx=0;for(let q=0;q<v.length;q+=16)mx=Math.max(mx,Math.abs(v[q]-cx),Math.abs(v[q+2]-cz));assert.equal(mx,half(L.k));
    // The hole of a level is exactly the square of the level inside it.
    const tri=L.mesh.i.length/3;assert.equal(tri,L.k?2*(CELLS*CELLS-(CELLS/2)**2):2*CELLS*CELLS);
    for(let t=0;t<L.mesh.i.length;t+=3)if(L.k){const I=G.levels[L.k-1],x=(v[L.mesh.i[t]*16]+v[L.mesh.i[t+1]*16]+v[L.mesh.i[t+2]*16])/3,z=(v[L.mesh.i[t]*16+2]+v[L.mesh.i[t+1]*16+2]+v[L.mesh.i[t+2]*16+2])/3;assert.ok(Math.max(Math.abs(x-I.centre[0]),Math.abs(z-I.centre[1]))>half(I.k)-1e-6);}}
   // No crack: the edge of every level lies on the lines of the coarser one.
   for(let k=0;k<LEVELS-1;k++){const fine=at(k),coarse=at(k+1),L=G.levels[k],h=half(k),st=L.step;
    for(const [key,y] of fine){const [x,z]=key.split(',').map(Number);const ex=Math.abs(Math.abs(x-L.centre[0])-h)<1e-9,ez=Math.abs(Math.abs(z-L.centre[1])-h)<1e-9;if(!ex&&!ez)continue;
     if(coarse.has(key)){assert.ok(Math.abs(coarse.get(key)-y)<1e-4,'crepa in '+key);continue;}
     const [a,b]=ex?[[x,z-st],[x,z+st]]:[[x-st,z],[x+st,z]];assert.ok(Math.abs((coarse.get(a.join(','))+coarse.get(b.join(',')))/2-y)<1e-4,'crepa in '+key);}}
   // The finest grid samples the heights of the surface on whole units, away from its edge.
   const L0=G.levels[0],v0=L0.mesh.v;for(let q=0;q<v0.length;q+=16*37){const x=v0[q],z=v0[q+2];if(Math.max(Math.abs(x-L0.centre[0]),Math.abs(z-L0.centre[1]))<half(0))assert.ok(Math.abs(v0[q+1]-s.heightAt(x,z))<1e-4);}
  }
  // Around the stations the finest grid is the mesh of the surface: same vertices, normals and colours.
  G.update(2,2);const v0=G.levels[0].mesh.v,m=s.mesh.v,n=CELLS+1;let same=0;
  for(let q=0;q<n*n;q++){const r=Math.floor(q/n),c=q%n;if(!r||!c||r===n-1||c===n-1)continue;const x=v0[q*16],z=v0[q*16+2],o=((z+112)*GRID+(x+112))*16;for(let f=0;f<16;f++)assert.ok(Math.abs(v0[q*16+f]-m[o+f])<1e-6,'quadrato '+x+','+z);same++;}
  assert.equal(same,(n-2)**2);
  // Moving step by step gives the same ground as a new one built at the end: the cache of points wraps round.
  const s0=G.samples,b0=G.built;for(let k=0;k<=240;k++)G.update(2+k/240*900,2-k/240*400);const H=new GroundClipmap(s);H.update(902,-398);
  G.levels.forEach((L,k)=>{assert.deepEqual(L.centre,H.levels[k].centre);assert.deepEqual(Array.from(L.mesh.v),Array.from(H.levels[k].mesh.v));assert.deepEqual(Array.from(L.mesh.i),Array.from(H.levels[k].mesh.i));});
  // Each rebuild of a level computes only a strip of new points, a small share of its window.
  const ds=G.samples-s0,db=G.built-b0;assert.ok(db>200&&ds<db*(CELLS+3)**2*.15,'punti ricalcolati: '+ds+' in '+db+' ricostruzioni');
 }
 const Y=Float32Array.from([0,5,9,3,1,7,2,8,4]);stitch(Y,9,1,4,k=>k);assert.deepEqual(Array.from(Y),[0,.25,.5,.75,1,1.75,2.5,3.25,4]);
});
test('vita e luoghi sulla nuova superficie: ogni specie ha individui, i luoghi restano nell\'area',()=>{
 let far=0;
 for(const i of [0,1,14,30,36,60,99,119]){const s=planetSurface(i,113),sc=surfaceScatter(s);
  for(const p of sc.species){assert.ok(p.instances.length>0,i+' '+p.species.name);if(p.instances.some(o=>Math.max(Math.abs(o.x),Math.abs(o.z))>p.species.reach)){far++;assert.equal(p.species.habitat,'mare');}}
  for(const p of s.places)assert.ok(Math.abs(p.position[0])<=72&&Math.abs(p.position[2])<=72);
  // Beyond the square the height is the field itself.
  assert.ok(Math.abs(s.heightAt(300,-200)-s.field.Y(300,-200))<1e-9);}
 assert.ok(far<=2,'specie lontane: '+far);
});
test('scena: terreno in streaming e mare lontano in GPU, camera fino all\'orizzonte, mappe d\'orbita in dissolvenza, dettaglio che si spegne lontano',()=>{
 const made=new Map(),draws=[];
 const R={w:1600,h:1000,meshes:{has:id=>made.has(id)},makeStars(){},makeMesh(id,m){made.set(id,m);},deleteMesh(id){made.delete(id);},drawMesh(id,vp,model,o={}){draws.push({id,o});},makeInstances(){},updateInstances(){},deleteInstances(){},drawEnvironment(){},drawStars(){},renderShadow(){},starCount:1e6,shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(read('assets/scenes/manifest.json')).biomes,w=new World(R,{},biomes);
 w.activatePlanet(7);for(let k=0;k<LEVELS;k++)assert.ok(made.has('planet-ground-'+k));assert.ok(made.has('planet-sea-far')&&!made.has('planet-terrain'));
 const s={scene:'surface',selected:7,time:10,yaw:0,pitch:.45,distance:22,paused:true};
 w.camera('surface',s);
 // A point 1700 units ahead, on the line of sight, is inside the clip volume.
 const f=w.target.map((v,i)=>v-w.eye[i]),l=Math.hypot(...f),p=w.eye.map((v,i)=>v+f[i]/l*1700),vp=w.vp,c=[0,1,2,3].map(r=>vp[r]*p[0]+vp[4+r]*p[1]+vp[8+r]*p[2]+vp[12+r]);
 assert.ok(c[3]>0&&Math.abs(c[2]/c[3])<1,'orizzonte fuori dal volume di vista');
 // The lines of sight pass over the relief between camera and target and between camera and stations.
 for(const i of [0,25,7]){w.activatePlanet(i);const st={...s,selected:i};w.camera('surface',st);const S=w.surface;
  for(const end of [w.target,...S.stations.map(st=>st.position)])for(let k=1;k<20;k++){const t=k/20,x=w.eye[0]+(end[0]-w.eye[0])*t,z=w.eye[2]+(end[2]-w.eye[2])*t,y=w.eye[1]+(end[1]-w.eye[1])*t;assert.ok(y-Math.max(S.heightAt(x,z),S.seaY??-99)>=1.5-1e-6,'vista coperta sul pianeta '+i);}}
 w.activatePlanet(7);w.camera('surface',s);
 w.draw('surface',s,{modules:[]});for(let k=0;k<LEVELS;k++)assert.ok(draws.some(d=>d.id==='planet-ground-'+k&&d.o.material===10));assert.ok(draws.some(d=>d.id==='planet-sea-far'));
 // The ground and the near sea follow the camera far from the base; the waves keep their place.
 const far={...s,explore:true,exploreFocus:[900,-700],exploreBlend:1};w.cameraScene=null;draws.length=0;w.draw('surface',far,{modules:[]});
 // After a jump of the camera the ground waits for one frame without movement, then follows it.
 assert.notDeepEqual(w.ground.levels[0].centre,[900,-700]);draws.length=0;w.draw('surface',far,{modules:[]});assert.deepEqual(w.ground.levels[0].centre,[900,-700]);
 const sea=draws.find(d=>d.id==='planet-sea');assert.ok(sea&&sea.o.motion[2]===960&&sea.o.motion[3]===-640);
 // Planet maps: the previous map fades into the new one.
 const body={explorable:true,index:7,moons:0,profile:{texture:'earth'},spin:0,rotation:0,tilt:0,phase:0};let tex={id:'a'};w.orbitTexture=()=>tex;draws.length=0;
 w.drawPlanet(body,0,[0,0,0],1,[1,0,0]);tex={id:'b'};w.drawPlanet(body,0,[0,0,0],1,[1,0,0]);
 const last=draws.filter(d=>d.o.material===12).at(-1).o;assert.equal(last.texture.id,'b');assert.equal(last.textureFrom.id,'a');assert.ok(last.textureFade>=0&&last.textureFade<1);
 // The landing site shines on the planet seen from orbit when it faces the camera.
 const [x,y,z]=LANDING_SITES[7];w.eye=[x*10,y*10,z*10];draws.length=0;w.drawPlanet(body,0,[0,0,0],1,[1,0,0],true);
 assert.ok(draws.some(d=>d.id==='lowSphere'&&d.o.material===17&&d.o.tint[0]===1&&d.o.tint[1]===.82));assert.ok(Math.abs(Math.hypot(...w.landingMark)-1.01)<1e-4);
 w.eye=[-x*10,-y*10,-z*10];draws.length=0;w.drawPlanet(body,0,[0,0,0],1,[1,0,0],true);assert.equal(w.landingMark,null);assert.ok(!draws.some(d=>d.id==='lowSphere'&&d.o.material===17));
 const shaders=read('src/scene/shaders.js'),renderer=read('src/renderer.js');
 assert.ok(shaders.includes('texel=mix(texture(uTexPrev,uv),texel,uTexFade)')&&renderer.includes("uniform1f(this.uniform(p,'uTexFade')"));
 assert.ok(shaders.includes('near=1.-smoothstep(60.,240.,length(uEye-vWorld))')&&shaders.includes('smoothstep(1250.,1750.,distanceToEye)'));
});
