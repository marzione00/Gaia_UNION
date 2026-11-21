import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { AREAS, systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh } from '../src/renderer.js';
import { displayRadius } from '../src/scene/world.js';
import { CATALOG, EXTRAS, SHIP_EXTRAS, DEFENCE, DEFENCE_FLEET, systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips, frontierRank, defenceStationCount, build, LOW_DETAIL } from '../src/craft/catalog.js';
import { DEFENCE_SHIPS, DEFENCE_STATIONS, DEFENCE_SHIP_KEYS, DEFENCE_STATION_KEYS } from '../src/craft/defence.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy, RECIPES, stationReport, shipReport } from '../src/craft/economy.js';
import { style } from '../src/craft/styles.js';
import { dice } from '../src/craft/kit.js';
// Defence fleet (1.47.0): eleven ship classes, five defensive stations, the defence line and the patrols.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const rock=sphereMesh(6,4),finite=m=>m.v.every(Number.isFinite)&&m.i.every(i=>i<m.v.length/16);
const systemOf=id=>{const sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,rock);sys.belt={inner:b.inner,outer:b.outer};}return sys;};
test('catalogo: 84 stazioni e 134 navi di difesa, più forti verso la frontiera, nomi unici scritti con l\'atlante',()=>{
 assert.equal(DEFENCE.length,84);assert.equal(DEFENCE_FLEET.length,134);
 assert.deepEqual(DEFENCE_SHIP_KEYS.length,11);assert.deepEqual(DEFENCE_STATION_KEYS.length,5);
 for(const k of DEFENCE_SHIP_KEYS)assert.ok(DEFENCE_FLEET.some(e=>e.type===k),'classe assente: '+k);
 for(const k of DEFENCE_STATION_KEYS)assert.ok(DEFENCE.some(e=>e.type===k),'stazione assente: '+k);
 AREAS.forEach((_,id)=>{
  const st=systemDefence(id),sh=systemDefenceShips(id),r=frontierRank(id);
  assert.equal(st.length,defenceStationCount(id));assert.equal(st[0].type,'baseflotta');assert.equal(st[1].type,'sorveglianza');
  assert.equal(sh.length,[8,6,5,4][r]??3,'sistema '+id);
  st.forEach((e,k)=>assert.equal(e.slot,60+k));sh.forEach((e,k)=>assert.equal(e.slot,70+k));
  if(sh.some(e=>e.type==='superportaerei'))assert.equal(r,0,'superportaerei lontana dalla frontiera');
 });
 const all=[...CATALOG,...EXTRAS,...SHIP_EXTRAS,...DEFENCE,...DEFENCE_FLEET];
 assert.equal(new Set(all.map(e=>e.id)).size,all.length);assert.equal(new Set(all.map(e=>e.name)).size,all.length);
 for(const e of [...DEFENCE,...DEFENCE_FLEET]){assert.equal(e.style,'difesa');assert.ok(e.defence&&e.drawn>0);for(const ch of e.name+e.about)assert.ok(ch in glyphs,`«${ch}» in ${e.id}`);for(const r of STYLE)assert.ok(!r.test(e.about),e.about);}
 for(const e of DEFENCE)assert.ok(RECIPES[e.works],e.works);
 for(const e of DEFENCE_FLEET){assert.deepEqual(e.fleet.carries,[]);assert.equal(e.fleet.idle,'guard');assert.ok(e.wing>=1&&e.wing<=3);}
});
test('modelli: mesh valide, luci, dimensioni crescenti dal caccia alla superportaerei, livello semplificato coerente',()=>{
 const median=[];
 for(const [key,spec] of [...Object.entries(DEFENCE_SHIPS),...Object.entries(DEFENCE_STATIONS)]){
  const ship=key in DEFENCE_SHIPS,radii=[];
  for(let s=0;s<3;s++){
   const m=spec.build(dice(500+s*11,s),style('difesa'));
   for(const p of m.parts)assert.ok(finite(p.mesh),key);
   assert.ok(m.triangles<=(ship?16000:8000),key+': '+m.triangles);assert.ok(m.lights.length>=1,key);assert.ok(m.radius>1.5&&m.radius<16,key+': '+m.radius);radii.push(m.radius);
   const again=spec.build(dice(500+s*11,s),style('difesa'));assert.equal(again.triangles,m.triangles,'non deterministico: '+key);
  }
  if(ship)median.push(radii.sort((a,b)=>a-b)[1]);
 }
 for(let i=1;i<median.length;i++)assert.ok(median[i]>=median[i-1]*.95,'ordine delle dimensioni: '+DEFENCE_SHIP_KEYS[i]);
 assert.ok(median.at(-1)>median[0]*4);
 let full=0,low=0;
 for(const e of [...systemDefence(5),...systemDefenceShips(5)]){const f=build(e),l=build(e,e.seed,{detail:LOW_DETAIL});full+=f.triangles;low+=l.triangles;assert.equal(l.parts.length,f.parts.length,e.id);assert.ok(Math.abs(l.radius/f.radius-1)<.03,e.id);assert.deepEqual(l.recipe,f.recipe);assert.ok(f.recipe.length>=2,e.id);}
 assert.ok(low/full<.5,'livello semplificato '+(low/full).toFixed(2));
});
test('linea di difesa: oltre la porta e l\'anello esterno, le altre stazioni restano dove erano',()=>{
 let minS=Infinity,minP=Infinity;
 AREAS.forEach((_,id)=>{
  const sys=systemOf(id),base=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id)],A=placeStations(sys,base,displayRadius),B=placeStations(sys,[...base,...systemDefence(id)],displayRadius);
  A.forEach((p,i)=>assert.deepEqual(B[i],p,'stazione spostata: '+p.entry.id));
  const gate=B.find(p=>p.entry.type==='porta'),D=B.filter(p=>p.entry.defence),edge=Math.max(...B.filter(p=>p.kind==='edge'&&!p.entry.defence).map(p=>p.distance));
  for(const d of D){assert.equal(d.kind,'edge');assert.ok(d.distance>=gate.distance+1.8-1e-9&&d.distance>=edge+1.8-1e-9);assert.equal(d.size,d.entry.drawn);}
  for(let T=0;T<=900;T+=30){
   const at=p=>stationPosition(p,T,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),T).position);
   for(const d of D){const q=at(d);for(const o of B)if(o!==d)minS=Math.min(minS,Math.hypot(...q.map((v,i)=>v-at(o)[i]))/(d.size+o.size));for(const b of sys.bodies)minP=Math.min(minP,Math.hypot(...q.map((v,i)=>v-bodyAtTime(b,T).position[i]))/(d.size+displayRadius(b)));}
  }
 });
 assert.ok(minS>2,'stazioni troppo vicine: '+minS.toFixed(2));assert.ok(minP>2,'pianeti troppo vicini: '+minP.toFixed(2));
});
test('pattuglie: le navi di difesa non portano merci e girano fra base, stazioni di difesa, porta e porto; resoconti brevi',()=>{
 const texts=new Set();let visits=0,half=0,n=0;
 for(const id of [5,13,26]){
  const sys=systemOf(id),entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id),...systemDefence(id),...systemDefenceShips(id)],P=placeStations(sys,entries,displayRadius),clock={t:0};
  const pos=p=>p.beyond!==undefined?[90,0,0]:p.station!==undefined?stationPosition(P[p.station],clock.t,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),clock.t).position):bodyAtTime(sys.bodies.find(b=>b.slot===p.body),clock.t).position;
  const E=new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:sys.bodies.map(b=>b.slot),seed:id*7+1,time:0,distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))});
  const guards=E.ships.filter(s=>s.entry.defence),moved=new Set(),name=p=>p.station!==undefined?E.stations[p.station].entry.name:'altrove';
  assert.equal(guards.length>=systemDefenceShips(id).length,true);
  for(const s of guards)if(s.entry.drawn>=.11)assert.equal(guards.filter(o=>o.entry===s.entry).length,1,'gemella di una nave maggiore');
  for(clock.t=0;clock.t<=1200;clock.t++){
   E.update(clock.t);
   for(const s of guards){assert.equal(s.cargo,null);assert.equal(s.job,null);if(s.phase==='travel')moved.add(s.id);if(s.phase==='dock'&&s.t0===clock.t&&E.stations[s.at.station]?.entry.defence)visits++;if(clock.t%60===0)shipReport(s,clock.t,name).forEach(t=>texts.add(t));}
   for(const s of E.stations)if(s.entry.defence){n++;if(s.missing.length)half++;assert.equal(s.level,1);if(clock.t%60===0)stationReport(s).forEach(t=>texts.add(t));}
  }
  assert.equal(moved.size,guards.length,'sistema '+id+': navi di difesa ferme');
 }
 assert.ok(visits>=30,'soste alle stazioni di difesa: '+visits);assert.ok(half/n<.2,'a metà forza '+(half/n).toFixed(3));
 for(const t of texts){assert.ok(t.length>0&&t.length<=60,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);}
 for(const t of ['Rifornisce la flotta di difesa','Di guardia','Rifornimento alla base'])assert.ok(texts.has(t),'resoconto assente: '+t);
 assert.ok([...texts].some(t=>t.startsWith('In pattuglia, arrivo fra ')));
});
