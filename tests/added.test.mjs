import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { AREAS, systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh } from '../src/renderer.js';
import { displayRadius } from '../src/scene/world.js';
import { CATALOG, EXTRAS, systemCraft, systemExtras, stationCount, build } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy, RECIPES, stationReport } from '../src/craft/economy.js';
import { DISCIPLINE_STYLES } from '../src/craft/styles.js';
// Stations of the grammar added to the systems in 1.43.0: catalogue, placement and economy.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const rock=sphereMesh(6,4);
const systemOf=id=>{const s={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(s,rock);s.belt={inner:b.inner,outer:b.outer};}return s;};

test('catalogo: da 12 a 20 stazioni per sistema, tipi e stili mai ripetuti, nomi unici',()=>{
 assert.equal(EXTRAS.length,300);
 const totals=AREAS.map((_,s)=>6+systemExtras(s).length);
 totals.forEach((n,s)=>{assert.equal(n,stationCount(s));assert.ok(n>=12&&n<=20,'sistema '+s);});
 for(let n=12;n<=20;n++)assert.ok(totals.filter(t=>t===n).length>=3,n+' stazioni');
 const all=[...CATALOG,...EXTRAS];assert.equal(new Set(all.map(e=>e.id)).size,all.length);assert.equal(new Set(all.map(e=>e.name)).size,all.length);
 assert.equal(new Set(EXTRAS.map(e=>e.type+'/'+e.style)).size,300,'stesso tipo nello stesso stile');
 AREAS.forEach((area,s)=>{
  const list=systemExtras(s);assert.equal(new Set(list.map(e=>e.type)).size,list.length,'tipo ripetuto nel sistema '+s);
  list.forEach((e,k)=>{assert.equal(e.slot,10+k);assert.equal(e.id,`s${String(s).padStart(2,'0')}-${10+k}`);assert.ok(['civile',DISCIPLINE_STYLES[area.sector]].includes(e.style),e.id);});
  const fam={};for(const e of list)fam[e.family]=(fam[e.family]||0)+1;assert.ok(Math.max(...Object.values(fam))<=Math.ceil(list.length/12),'famiglia ripetuta nel sistema '+s);
 });
 for(const e of EXTRAS){assert.ok(RECIPES[e.works],e.id+': '+e.works);for(const ch of e.name)assert.ok(ch in glyphs,`${e.id}: «${ch}»`);}
 assert.equal(new Set(EXTRAS.map(e=>e.role)).size,10);
 for(const e of EXTRAS){const m=build(e);assert.ok(m.triangles<=30000&&m.lights.length>0,e.id);}
});
test('collocamento: le sei classiche restano dove erano, le aggiunte lontane da pianeti e stazioni',()=>{
 let lanes=0;
 AREAS.forEach((_,id)=>{
  const system=systemOf(id),classic=placeStations(system,systemCraft(id),displayRadius),P=placeStations(system,[...systemCraft(id),...systemExtras(id)],displayRadius);
  assert.deepEqual(P.slice(0,6),classic,'sistema '+id+': stazioni classiche spostate');assert.equal(P.length,stationCount(id));
  assert.deepEqual(placeStations(system,[...systemCraft(id),...systemExtras(id)],displayRadius),P,'sistema '+id+': non deterministico');
  const added=P.filter(p=>p.entry.role),hosts={};
  for(const p of P)if(p.kind==='orbit')hosts[p.host]=(hosts[p.host]||0)+1;
  for(const p of added){
   assert.ok(['orbit','star','edge','belt'].includes(p.kind),p.entry.id);
   if(p.entry.family==='asteroide'&&system.belt)assert.equal(p.kind,'belt',p.entry.id);
   if(p.entry.role==='comunicazioni')assert.notEqual(p.kind,'orbit',p.entry.id);
   if(p.kind==='orbit')assert.ok(hosts[p.host]<=3,p.entry.id);
   if(p.kind==='star'){lanes++;for(const q of added)if(q.kind==='star'&&Math.abs(q.distance-p.distance)<1e-9)assert.equal(q.speed,p.speed);}
  }
  for(let t=0;t<900;t+=11.3){
   const hostAt=s=>bodyAtTime(system.bodies.find(b=>b.slot===s),t).position,Q=P.map(p=>stationPosition(p,t,hostAt));
   P.forEach((p,a)=>{
    if(!p.entry.role)return;assert.ok(Q[a].every(Number.isFinite));
    P.forEach((q,b)=>{if(b!==a){const d=Math.hypot(...Q[a].map((v,i)=>v-Q[b][i]));assert.ok(d>1.2*(p.size+q.size),`sistema ${id}, ${p.entry.name} e ${q.entry.name} a ${d.toFixed(2)} (t=${t.toFixed(1)})`);}});
    for(const body of system.bodies){if(p.kind==='orbit'&&p.host===body.slot)continue;const h=bodyAtTime(body,t).position,d=Math.hypot(...Q[a].map((v,i)=>v-h[i]));assert.ok(d>1.1*(displayRadius(body)+p.size),`sistema ${id}, ${p.entry.name} vicino al corpo ${body.slot}`);}
   });
  }
 });
 assert.ok(lanes>100,'stazioni nelle corsie: '+lanes);
});
test('economia: ricette valide, più navi, tutte in viaggio, merci consegnate alle stazioni aggiunte',()=>{
 for(const k of ['habitat','magazzino','ripetitore']){const r=RECIPES[k];for(const res of Object.keys(r.want||{})){assert.ok(r.cap[res]>=r.want[res],k+' '+res);if(r.keep?.[res]!==undefined)assert.ok(r.keep[res]<r.want[res],k+' '+res);}}
 for(const id of [2,13,20]){
  const system=systemOf(id),entries=[...systemCraft(id),...systemExtras(id)],P=placeStations(system,entries,displayRadius);
  let T=0;const pos=p=>p.station!==undefined?stationPosition(P[p.station],T,s=>bodyAtTime(system.bodies.find(b=>b.slot===s),T).position):bodyAtTime(system.bodies.find(b=>b.slot===p.body),T).position;
  const make=entries2=>new Economy({stations:P.slice(0,entries2).map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:system.bodies.map(b=>b.slot),seed:7+id,time:0,distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))});
  const E=make(P.length),classic=make(6);assert.ok(E.ships.length>=classic.ships.length,'sistema '+id);
  const moved=new Set(),fed=new Set();
  for(T=0;T<=900;T++){E.update(T);for(const s of E.ships){if(s.phase==='travel')moved.add(s.id);if(s.phase==='dock'&&s.task==='scarica'&&E.stations[s.at.station].entry.role)fed.add(s.at.station);}}
  assert.equal(moved.size,E.ships.length,'sistema '+id+': navi ferme');assert.ok(fed.size>=2,'sistema '+id+': consegne alle stazioni aggiunte '+fed.size);
  for(const s of E.stations){const lines=stationReport(s);assert.equal(lines.length,2);for(const ch of lines.join(''))assert.ok(ch in glyphs,s.entry.name+': «'+ch+'»');assert.ok(!/—|undefined|NaN/.test(lines.join(' ')),lines.join(' '));}
 }
});
