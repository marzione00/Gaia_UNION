import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {planetGenomes,planetSpecies,planetSurface,surfaceScatter} from '../src/worlds/surface.js';
import {colonyParams,VILLAGE_RULE,COLONY_ID,VILLAGE_ID,WALK,grade} from '../src/worlds/settlements.js';
import {buildingMesh,VILLAGE_TYPES} from '../src/worlds/buildings.js';
import {archMesh,ARCH_TYPES} from '../src/worlds/architecture.js';
import {colonistMesh,nativeMesh} from '../src/worlds/people.js';
import {World,walkHeading,TOWN_NEAR,FOLK_NEAR} from '../src/scene/world.js';
import {counter,BUDGET} from '../scripts/prestazioni.mjs';
import {cleanExplore} from '../src/store.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const genomes=planetGenomes(),species=planetSpecies();
const villages=genomes.map((g,i)=>g.terrain.seaLevel>=VILLAGE_RULE.sea&&g.atmosphere.density>=VILLAGE_RULE.density&&species[i].length>=VILLAGE_RULE.species);
const SAMPLE=[0,3,7,12,19,20,25,36,40,44,53,58,64,70,77,90,99,104,115,120];
const surfaces=new Map(SAMPLE.map(i=>[i,planetSurface(i)]));
const STYLE=[/—/,/\bnon solo\b|\bnon soltanto\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const seg=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[2]-a[2],l=dx*dx+dz*dz||1,t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[2])*dz)/l));return Math.hypot(x-a[0]-t*dx,z-a[2]-t*dz);};

test('città: una colonia su ogni pianeta, adattata alla carta, su terreno spianato',()=>{
 for(const [i,s] of surfaces){const g=genomes[i],c=s.settlements[0],P=colonyParams(g,species[i].length),sea=s.seaY;
  assert.equal(c.id,COLONY_ID);assert.equal(c.kind,'colonia');assert.ok(c.buildings.length>=20&&c.buildings.length<=150,i+' '+c.buildings.length);
  assert.ok(Object.keys(c.types).every(t=>t in ARCH_TYPES[c.typology]));
  // Pressure suits where the air is too thin; at most two floors under high gravity.
  assert.equal(P.sealed,g.atmosphere.density<.3);assert.equal(c.figures[0].gear,P.sealed?'tuta':c.typology==='simbiotico'?'leggero':'maschera');
  if(g.gravity>1.15)assert.ok(Object.values(c.types).every(t=>!t.floors||t.floors<=2));
  c.buildings.forEach((b,k)=>{
   assert.ok(Math.abs(b.x)+b.radius<104&&Math.abs(b.z)+b.radius<104);
   for(const st of s.stations)assert.ok(Math.hypot(st.position[0]-b.x,st.position[2]-b.z)>b.radius+5);
   for(const p of s.places)assert.ok(Math.hypot(p.position[0]-b.x,p.position[2]-b.z)>b.radius+4);
   for(const o of c.buildings.slice(k+1))assert.ok(Math.hypot(o.x-b.x,o.z-b.z)>o.radius+b.radius+.5);
   // The ground under a building is levelled to its floor.
   assert.ok(Math.abs(s.heightAt(b.x,b.z)-b.y)<.05,`${i} ${b.type}`);
  });
  for(const st of c.streets){const P0=st.points;for(let k=0;k<P0.length;k++){const p=P0[k],ground=s.heightAt(p[0],p[2]);
   // The ribbon of the street lies just above the graded ground.
   if(sea===null||p[1]>sea+.98)assert.ok(p[1]-ground>0&&p[1]-ground<.2,`${i} strada`);
   if(k)assert.ok(Math.abs(p[1]-P0[k-1][1])<=.41*Math.hypot(p[0]-P0[k-1][0],p[2]-P0[k-1][2])+1e-6);}}
  // Walkers go along a street.
  for(const w of c.walkers){assert.ok(c.streets.some(st=>st.points.some((p,k)=>k&&seg(w.x,w.z,st.points[k-1],p)<.05)));assert.ok(Math.abs(w.slope)<=.5);}
  assert.ok(c.walkers.length>=c.buildings.length*.5);
  // Plants and grazing animals keep off streets and buildings.
  const sc=surfaceScatter(s);for(const p of sc.species)if(p.species.form!=='volatore'&&p.species.form!=='medusa')for(const o of p.instances)assert.ok(!s.clear.blocked(o.x,o.z),`${i} ${p.species.name}`);
  for(const r of sc.rocks)assert.ok(!s.clear.blocked(r.x,r.z));
 }
 // Grading: a flat strip under a street, a pad under a building, the nearer work deciding where they meet.
 const n=21,Y=new Float32Array(n*n).fill(5);grade({Y,n,cell:1},[{seg:[-5,0,5,0],ya:1,yb:3,half:1,fall:1.5},{pad:[0,6],y:9,r:1.5,fall:1.5}]);
 const at=(x,z)=>Y[(z+10)*n+x+10];assert.equal(at(-5,0),1);assert.equal(at(5,0),3);assert.equal(at(0,0),2);assert.equal(at(0,6),9);assert.equal(at(0,-6),5);assert.ok(at(0,2)>2&&at(0,2)<5);
});

test('villaggi: solo dove ci sono mare, aria densa e una biosfera ricca, lontano dalla colonia',()=>{
 assert.equal(villages.filter(Boolean).length,40);
 for(const [i,s] of surfaces){const v=s.settlements.find(t=>t.kind==='villaggio');assert.equal(!!v,villages[i],'pianeta '+i);if(!v)continue;
  assert.equal(v.id,VILLAGE_ID);assert.ok(Object.keys(v.types).every(t=>t in VILLAGE_TYPES));
  const homes=v.buildings.filter(b=>b.type==='capanna'||b.type==='casalunga');assert.ok(homes.length>=8,i+' '+homes.length);
  const [cx,,cz]=v.position,fire=v.buildings.find(b=>b.type==='focolare');assert.ok(fire&&Math.hypot(fire.x-cx,fire.z-cz)<1e-9);
  // Huts face the fire, and the village stays clear of the colony.
  for(const b of homes){const a=Math.atan2(-(cz-b.z),cx-b.x),d=Math.abs(((b.h-a)%(2*Math.PI)+3*Math.PI)%(2*Math.PI)-Math.PI);assert.ok(d<1e-6);}
  for(const b of v.buildings)for(const o of s.settlements[0].buildings)assert.ok(Math.hypot(o.x-b.x,o.z-b.z)>o.radius+b.radius+2);
  for(const p of v.streets)for(const q of p.points)assert.ok(Math.abs(q[1]-.08-s.heightAt(q[0],q[2]))<1e-3);
  assert.ok(v.walkers.length>=homes.length);
 }
});

test('modelli: edifici e abitanti in due livelli di dettaglio, diversi da colonia a colonia',()=>{
 const keys=new Set();let n=0;
 for(const s of surfaces.values())for(const t of s.settlements){for(const sp of Object.values(t.types)){n++;keys.add(JSON.stringify(sp));
   const make=t.kind==='colonia'?archMesh:buildingMesh,a=make(sp,0),b=make(sp,1);for(const m of [a,b]){assert.equal(m.stride,16);assert.ok(m.v.every(Number.isFinite));const nv=m.v.length/16;assert.ok(m.i.length&&m.i.every(x=>x<nv));}
   assert.ok(b.i.length<=a.i.length,sp.type);assert.ok(a.i.length/3<=6000,sp.type+' '+a.i.length/3);}
  for(const f of t.figures){const make=t.kind==='colonia'?colonistMesh:nativeMesh,a=make(f,0),b=make(f,1);assert.ok(b.i.length<a.i.length);let white=0;const st=a.stride||12;for(let j=8;j<a.v.length;j+=st)if(Math.min(a.v[j],a.v[j+1],a.v[j+2])>.97)white++;assert.ok(white>0);}}
 // Every type of every settlement of the sample is a different model.
 assert.equal(keys.size,n);assert.ok(n>=200);
 // The heading of a walker carries the slope of its stretch of street.
 for(const [h,sl] of [[0,0],[1.2,.31],[-2,-.5],[6.2,.07]]){const a=walkHeading(h,sl),k=Math.floor(a/7);assert.ok(Math.abs(a-k*7-(((h%(2*Math.PI))+2*Math.PI)%(2*Math.PI)))<1e-9);assert.equal((k-50)/100,Math.round(sl*100)/100);}
 assert.ok(read('src/scene/shaders.js').includes('if(uInstanced==7){float k=floor(a/7.);'));
});

test('scena: edifici, abitanti e strade con istanze, camera sopra i tetti, limiti di un fotogramma',()=>{
 const biomes=JSON.parse(read('assets/scenes/manifest.json')).biomes;
 for(const q of ['high','low']){const R=counter(q),w=new World(R,{},biomes);
  for(const i of [7,20,36,53,58]){w.activatePlanet(i);const S=w.surface;
   const s={scene:'surface',selected:i,time:10,yaw:0,pitch:.45,distance:22,paused:true,lastFrameMs:16};w.camera('surface',s);w.camera('surface',s);R.begin();w.draw('surface',s,{modules:[]});
   const f=R.frame;assert.ok(f.draws<=BUDGET.draws&&f.triangles<=(q==='high'?BUDGET.triangles:6e5),`${q} ${i}: ${f.draws} chiamate, ${Math.round(f.triangles)} triangoli`);
   assert.ok(R.meshes.has('planet-streets'));
   const town=w.groups.filter(G=>G.sets[0].startsWith('town-')),folk=w.groups.filter(G=>G.sets[0].startsWith('folk-'));
   assert.equal(town.reduce((a,G)=>a+G.n,0),S.settlements.reduce((a,t)=>a+t.buildings.length,0));assert.equal(folk.reduce((a,G)=>a+G.n,0),S.settlements.reduce((a,t)=>a+t.walkers.length,0));
   assert.ok(town.every(G=>G.near===TOWN_NEAR&&G.mode===1)&&folk.every(G=>G.near===FOLK_NEAR&&G.mode===7&&G.motion[1]===WALK[G.sets[0].startsWith('folk-0-')?'colonia':'villaggio']));
   // The lines of sight from the camera to the stations pass over the roofs.
   for(const st of S.stations)for(let k=1;k<20;k++){const t=k/20,x=w.eye[0]+(st.position[0]-w.eye[0])*t,z=w.eye[2]+(st.position[2]-w.eye[2])*t,y=w.eye[1]+(st.position[1]-w.eye[1])*t;assert.ok(y>S.clear.roofAt(x,z));}
  }
 }
});

test('diario: colonia e villaggio sono luoghi da registrare, con testi nello stile del sito',()=>{
 assert.deepEqual(cleanExplore({'7':{l:['l0','l8','l9','l10']}})['7'].l,['l0','l8','l9']);
 for(const s of surfaces.values())for(const t of s.settlements){assert.ok(t.traits.length>=2&&t.text===t.traits.join(' '));for(const x of t.traits){assert.ok(x.length>20);for(const re of STYLE)assert.doesNotMatch(x,re,x);}
  assert.ok(t.name.length>3&&t.position.every(Number.isFinite));}
 const app=read('src/app.js');assert.ok(app.includes("...(s.settlements || []).map((p, k) => ({ type: 'settlement'")&&app.includes("colonia: 'Luogo · colonia umana'"));
});
