import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetCards } from '../src/worlds/genome.js';
import { sphereTerrain } from '../src/worlds/orbit-texture.js';
import { landingSite, surfaceField, horizonMesh, storedSite, siteOf, stitch, CORE, ANGLE, RINGS } from '../src/worlds/field.js';
import { LANDING_SITES } from '../src/worlds/landing-sites.js';
import { planetSurface, surfaceScatter, EXTENT, GRID } from '../src/worlds/surface.js';
import { HEADER } from '../scripts/landing-sites.mjs';
import { World, HORIZON } from '../src/scene/world.js';
// Terrain of the landing surfaces (1.62.0): the piece of the planet seen from orbit around its landing site,
// with rings of coarser terrain up to the horizon and no crack where the grids meet.
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
test('anelli dell\'orizzonte: fino a 1792 unità, senza crepe fra anelli e quadrato centrale',()=>{
 assert.equal(EXTENT,CORE);assert.equal(HORIZON,CORE/2*2**RINGS.length);assert.equal(HORIZON,1792);
 RINGS.forEach((step,k)=>assert.equal((CORE/2*2**k)%step,0,'bordo fuori griglia per il passo '+step));
 for(const i of [7,36,99]){
  const s=planetSurface(i),F=s.field,M=horizonMesh(G[i],F),n=M.v.length/16;
  let max=0;const at=new Map();
  for(let k=0;k<n;k++){const x=M.v[k*16],y=M.v[k*16+1],z=M.v[k*16+2];max=Math.max(max,Math.abs(x),Math.abs(z));const key=x+','+z;if(at.has(key))assert.ok(Math.abs(at.get(key)-y)<1e-4,'crepa in '+key);else at.set(key,y);}
  assert.equal(max,HORIZON);
  // Every triangle of the rings lies outside the square of the stations.
  for(let t=0;t<M.i.length;t+=3){const cx=(M.v[M.i[t]*16]+M.v[M.i[t+1]*16]+M.v[M.i[t+2]*16])/3,cz=(M.v[M.i[t]*16+2]+M.v[M.i[t+1]*16+2]+M.v[M.i[t+2]*16+2])/3;assert.ok(Math.max(Math.abs(cx),Math.abs(cz))>CORE/2-1e-6);}
  // The edge of the square meets the first ring: same heights on its grid, straight segments in between.
  const N=s.n,cell=s.cell,ratio=RINGS[0]/cell;assert.equal(N,GRID);assert.ok(Math.abs(ratio-Math.round(ratio))<1e-9);
  for(let k=0;k<N;k++){const x=-CORE/2+k*cell,y=s.heights[k];
   if(k%ratio===0){assert.ok(Math.abs(y-at.get(x+','+(-CORE/2)))<1e-4,'bordo '+x);}
   else{const a=k-k%ratio,b=a+ratio,ya=s.heights[a],yb=s.heights[b];assert.ok(Math.abs(y-(ya+(yb-ya)*(k-a)/ratio))<1e-4);}}
 }
 const Y=Float32Array.from([0,5,9,3,1,7,2,8,4]);stitch(Y,9,1,4,k=>k);assert.deepEqual(Array.from(Y),[0,.25,.5,.75,1,1.75,2.5,3.25,4]);
});
test('vita e luoghi sulla nuova superficie: ogni specie ha individui, i luoghi restano nell\'area',()=>{
 let far=0;
 for(const i of [0,1,14,30,36,60,99,119]){const s=planetSurface(i,113),sc=surfaceScatter(s);
  for(const p of sc.species){assert.ok(p.instances.length>0,i+' '+p.species.name);if(p.instances.some(o=>Math.max(Math.abs(o.x),Math.abs(o.z))>78)){far++;assert.equal(p.species.habitat,'mare');}}
  for(const p of s.places)assert.ok(Math.abs(p.position[0])<=72&&Math.abs(p.position[2])<=72);
  // Beyond the square the height is the field itself.
  assert.ok(Math.abs(s.heightAt(300,-200)-s.field.Y(300,-200))<1e-9);}
 assert.ok(far<=2,'specie lontane: '+far);
});
test('scena: anelli e mare lontano in GPU, camera fino all\'orizzonte, mappe d\'orbita in dissolvenza, dettaglio che si spegne lontano',()=>{
 const made=new Map(),draws=[];
 const R={w:1600,h:1000,meshes:{has:id=>made.has(id)},makeStars(){},makeMesh(id,m){made.set(id,m);},deleteMesh(id){made.delete(id);},drawMesh(id,vp,model,o={}){draws.push({id,o});},makeInstances(){},updateInstances(){},deleteInstances(){},drawEnvironment(){},drawStars(){},renderShadow(){},starCount:1e6,shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(read('assets/scenes/manifest.json')).biomes,w=new World(R,{},biomes);
 w.activatePlanet(7);assert.ok(made.has('planet-horizon')&&made.has('planet-sea-far'));
 const s={scene:'surface',selected:7,time:10,yaw:0,pitch:.45,distance:22,paused:true};
 w.camera('surface',s);
 // A point 1700 units ahead, on the line of sight, is inside the clip volume.
 const f=w.target.map((v,i)=>v-w.eye[i]),l=Math.hypot(...f),p=w.eye.map((v,i)=>v+f[i]/l*1700),vp=w.vp,c=[0,1,2,3].map(r=>vp[r]*p[0]+vp[4+r]*p[1]+vp[8+r]*p[2]+vp[12+r]);
 assert.ok(c[3]>0&&Math.abs(c[2]/c[3])<1,'orizzonte fuori dal volume di vista');
 // The lines of sight pass over the relief between camera and target and between camera and stations.
 for(const i of [0,25,7]){w.activatePlanet(i);const st={...s,selected:i};w.camera('surface',st);const S=w.surface;
  for(const end of [w.target,...S.stations.map(st=>st.position)])for(let k=1;k<20;k++){const t=k/20,x=w.eye[0]+(end[0]-w.eye[0])*t,z=w.eye[2]+(end[2]-w.eye[2])*t,y=w.eye[1]+(end[1]-w.eye[1])*t;assert.ok(y-Math.max(S.heightAt(x,z),S.seaY??-99)>=1.5-1e-6,'vista coperta sul pianeta '+i);}}
 w.activatePlanet(7);w.camera('surface',s);
 w.draw('surface',s,{modules:[]});assert.ok(draws.some(d=>d.id==='planet-horizon'&&d.o.material===10));assert.ok(draws.some(d=>d.id==='planet-sea-far'));
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
