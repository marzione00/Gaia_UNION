import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {planetGenomes,planetSpecies,planetSurface} from '../src/worlds/surface.js';
import {colonyParams,HUB,ZONES} from '../src/worlds/settlements.js';
import {archMesh,archPalette,typologyOf,worksMesh,weather,ARCH_TYPES,SATURATION,tame} from '../src/worlds/architecture.js';
import {colonistSpec,colonistMesh,COLONIST_FIGURES,GEAR} from '../src/worlds/people.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const genomes=planetGenomes(),species=planetSpecies();
const SAMPLE=[0,3,7,12,19,25,40,44,58,70,90,104];
const surfaces=new Map(SAMPLE.map(i=>[i,planetSurface(i)]));
const sat=c=>{const M=Math.max(c[0],c[1],c[2]),m=Math.min(c[0],c[1],c[2]);return M>0?(M-m)/M:0;};
// Types of the colonies of 1.64.0 that are archetypes of the Earth, and words of their parts.
const EARTH=['casa','palafitta','blocco','torre','piazza','magazzino','serbatoio'];

test('stile: tre tipologie dalla carta, 46 avamposti sigillati, 41 insediamenti simbiotici, 38 città adattate',()=>{
 const n={sigillato:0,simbiotico:0,adattato:0};
 genomes.forEach((g,i)=>{const t=typologyOf(g,species[i].length);n[t]++;const d=g.atmosphere.density;
  assert.equal(t,d<.3?'sigillato':species[i].length>=15&&d>=.45?'simbiotico':'adattato');});
 assert.deepEqual(n,{sigillato:46,simbiotico:41,adattato:38});
 for(const [i,s] of surfaces){const c=s.settlements[0];assert.equal(c.typology,typologyOf(genomes[i],species[i].length));assert.equal(colonyParams(genomes[i],species[i].length).typology,c.typology);}
});

test('stile: nessun archetipo terrestre negli edifici delle colonie',()=>{
 for(const [t,types] of Object.entries(ARCH_TYPES)){for(const k of Object.keys(types))assert.ok(!EARTH.includes(k),k);assert.ok(HUB[t] in types);for(const z of Object.values(ZONES[t]))for(const k of z)assert.ok(k in types,k);}
 for(const s of surfaces.values()){const c=s.settlements[0];for(const b of c.buildings){assert.ok(b.type in ARCH_TYPES[c.typology],b.type);assert.ok(!EARTH.includes(b.type));}}
 // The code of the architecture has no pitched roofs, chimneys or porches.
 const code=read('src/worlds/architecture.js');for(const word of ['falde','camino','chimney','porch','portico','obelisco','pitched'])assert.ok(!code.toLowerCase().includes(word),word);
});

test('stile: colori entro i limiti di saturazione, accenti limitati, polvere alla base',()=>{
 genomes.forEach((g,i)=>{for(const t of Object.keys(ARCH_TYPES)){const c=archPalette(g,t);for(const [k,top] of Object.entries(SATURATION))assert.ok(sat(c[k])<=top+.005,`${i} ${t} ${k} ${sat(c[k])}`);}});
 assert.deepEqual(tame([1,0,0,1],.5),[1,.5,.5,1]);
 for(const s of surfaces.values()){const c=s.settlements[0],P=c.params.colors;
  for(const sp of Object.values(c.types)){const m=archMesh(sp,0);let strong=0,all=0;
   for(let t=0;t<m.i.length;t+=3){const [a,b,d]=[m.i[t],m.i[t+1],m.i[t+2]].map(q=>q*16);if(m.v[a+14]>.5||m.v[a+15]<1.5)continue;const P=q=>[m.v[q],m.v[q+1],m.v[q+2]],u=P(b).map((x,k)=>x-P(a)[k]),w=P(d).map((x,k)=>x-P(a)[k]),area=Math.hypot(u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0])/2;
    all+=area;if(sat([m.v[a+8],m.v[a+9],m.v[a+10]])>.55)strong+=area;}
   // Strong colours are only accents, lights and crops: a small share of the surface of the model.
   assert.ok(strong/all<.1,`${sp.type} ${(strong/all).toFixed(3)}`);}}
 // Dust: at the foot of a wall the colour moves 60 % of the way to the soil, from 1.6 units up nothing changes.
 const v=new Float32Array(48);for(const [k,y] of [[0,0],[1,.8],[2,1.7]]){v[k*16+1]=y;v.set([1,1,1],k*16+8);}const w=weather({v,i:[]},[0,0,0]).v;
 assert.ok(Math.abs(w[8]-.4)<1e-6);assert.ok(w[24]>.4&&w[24]<1);assert.equal(w[40],1);
});

test('stile: proporzioni dei coloni e degli edifici',()=>{
 for(const gear of Object.values(GEAR))for(const f of COLONIST_FIGURES){const p=colonistSpec(f,gear,1),m=colonistMesh(p,0),l=colonistMesh(p,1);
  assert.equal(m.stride,16);assert.ok(l.i.length<m.i.length);let top=-1,bottom=9,white=0;for(let i=0;i<m.v.length;i+=16){top=Math.max(top,m.v[i+1]);bottom=Math.min(bottom,m.v[i+1]);if(Math.min(m.v[i+8],m.v[i+9],m.v[i+10])>.97)white++;}
  assert.ok(white>0);assert.ok(bottom>-.02&&bottom<.02);
  // 7.5 heads for adults, 5.5 for children; a helmet adds a few centimetres.
  assert.equal(p.heads,f==='bambino'?5.5:7.5);assert.ok(Math.abs(top-p.height)<(gear==='tuta'?.06:.02),`${gear} ${f} ${top}`);assert.ok(Math.abs(p.legs/p.height-(f==='bambino'?.44:.5))<1e-9);}
 for(const s of surfaces.values())for(const sp of Object.values(s.settlements[0].types)){
  // Doors and hatches fit a colonist of 1.1 units; nothing is a dwarf or a skyscraper.
  assert.ok(sp.height>=.5&&sp.height<=26,`${sp.type} ${sp.height}`);assert.ok(sp.radius>=2&&sp.radius<=12,`${sp.type} ${sp.radius}`);}
 const code=read('src/worlds/architecture.js');for(const m of code.matchAll(/hatch\(k, [^,]+, [^,]+, [^,]+, ([^,]+), ([^,]+), c\)/g)){const h=Number(m[2]);if(!Number.isNaN(h))assert.ok(h>=1.1&&h<=1.4,m[0]);}
});

test('stile: pianta a raggiera con edificio centrale, anelli, zone e opere lungo le strade',()=>{
 for(const [i,s] of surfaces){const c=s.settlements[0],hub=c.buildings.find(b=>b.type===HUB[c.typology]);
  assert.ok(hub,'pianeta '+i);assert.ok(Math.hypot(hub.x-c.position[0],hub.z-c.position[2])<1e-9);
  assert.ok(c.spokes>=5&&c.spokes<=7);assert.ok(c.streets.some(st=>st.kind==='raggio'),'raggi '+i);assert.ok(c.streets.some(st=>st.kind==='anello'),'anelli '+i);
  assert.ok(Object.keys(c.zones).length>=3,i+' '+JSON.stringify(c.zones));
  const m=worksMesh(c);assert.equal(m.stride,16);assert.ok(m.v.every(Number.isFinite)&&m.i.length>0);let glow=0;for(let k=0;k<m.v.length;k+=16)if(m.v[k+14]>2)glow++;assert.ok(glow>0);}
});
