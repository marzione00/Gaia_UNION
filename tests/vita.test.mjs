import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh } from '../src/renderer.js';
import { displayRadius, minorLanes } from '../src/scene/world.js';
import { systemCraft, systemExtras, systemShipExtras } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy, RESOURCES, GROWTH, LAUNCH, CONVOY, stationReport, shipReport } from '../src/craft/economy.js';
// Life of the systems (1.46.0): stations that grow, shipyards that launch ships, convoys from the neighbouring
// systems, the news of the system and the minor traffic.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const rock=sphereMesh(6,4);
function world(id,seed){
 const sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,rock);sys.belt={inner:b.inner,outer:b.outer};}
 const entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id)],P=placeStations(sys,entries,displayRadius),clock={t:0};
 const pos=p=>p.beyond!==undefined?[80,0,0]:p.station!==undefined?stationPosition(P[p.station],clock.t,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),clock.t).position):bodyAtTime(sys.bodies.find(b=>b.slot===p.body),clock.t).position;
 return {P,clock,E:new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:sys.bodies.map(b=>b.slot),seed,time:0,neighbours:['Alfa','Beta','Gamma'],distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))})};
}
function run(w,end,each=()=>{}){for(w.clock.t=0;w.clock.t<=end;w.clock.t+=1){w.E.update(w.clock.t);each(w.clock.t);}}
test('crescita: dopo il tempo di lavoro e il kit le stazioni salgono di livello, fino al terzo, con ritmi e magazzini più grandi',()=>{
 let grown=0,third=0;
 for(const id of [2,13,26]){
  const w=world(id,70+id),E=w.E,start=E.stations.map(s=>({level:s.level,make:{...s.make},cap:{...s.cap}}));
  assert.ok(E.stations.every(s=>s.level===1));assert.ok(!E.stations.find(s=>s.entry.type==='porta').grows,'la porta non cresce');
  const kits=new Map();
  run(w,1500,()=>{for(const s of E.stations){assert.ok(s.level>=1&&s.level<=GROWTH.max);if(s.kit)kits.set(s.i,{...s.kit});}});
  for(const s of E.stations){
   if(s.level===1)continue;grown++;if(s.level===3)third++;
   assert.ok(kits.has(s.i),'livello senza kit: '+s.entry.name);
   const f=1+GROWTH.rate*(s.level-1),g=1+GROWTH.store*(s.level-1),b=start[s.i];
   for(const [r,v] of Object.entries(b.make))assert.ok(Math.abs(s.make[r]-v*f)<1e-3,s.entry.name+' '+r);
   for(const [r,v] of Object.entries(b.cap))assert.ok(s.cap[r]>=Math.round(v*g)-1,s.entry.name+' '+r);
   assert.ok(stationReport(s)[1].startsWith('Livello '+s.level)||s.kit,'livello assente dal resoconto');
  }
  assert.ok(E.news.length<=24);
 }
 assert.ok(grown>=12,'stazioni cresciute: '+grown);assert.ok(third>=1,'nessuna stazione al terzo livello');
});
test('cantieri: le navi varate restano entro il limite della flotta, con nomi unici, e trovano lavoro',()=>{
 let launched=0;
 for(const id of [5,13,20]){
  const w=world(id,90+id),E=w.E,first=E.ships.length,moved=new Set();
  run(w,1500,()=>{assert.ok(E.ships.length<=E.fleetCap);for(const sh of E.ships)if(sh.phase==='travel')moved.add(sh.id);});
  const born=E.ships.filter(sh=>sh.born>0);launched+=born.length;
  assert.equal(E.ships.length,first+born.length);assert.equal(new Set(E.ships.map(sh=>sh.name)).size,E.ships.length,'nomi ripetuti');
  for(const sh of born){assert.ok(sh.entry&&sh.cls);if(sh.born<=1200)assert.ok(moved.has(sh.id),'nave varata ferma: '+sh.name);}
  // Launches are at least LAUNCH.every apart for each yard.
  const by=new Map();for(const sh of born){assert.ok(E.stations[sh.yard].yard,'varata fuori da un cantiere');by.set(sh.yard,[...(by.get(sh.yard)||[]),sh.born]);}
  for(const times of by.values())for(let i=1;i<times.length;i++)assert.ok(times[i]-times[i-1]>=LAUNCH.every-1e-6);
  assert.ok(born.every(sh=>E.news.some(n=>n.text.endsWith(' vara '+sh.name))||E.news[0].time>sh.born),'varo senza notizia');
 }
 assert.ok(launched>=3,'navi varate: '+launched);assert.ok(LAUNCH.cost>0&&LAUNCH.every>=60);
});
test('convogli: arrivano da un sistema vicino, scaricano alla porta le importazioni e ripartono',()=>{
 let convoys=0;
 for(const id of [2,13,26]){
  const w=world(id,110+id),E=w.E,gate=E.gate,seen=new Map();
  assert.ok(gate&&Object.keys(gate.imports).length>0,'la porta non importa nulla');
  for(const r of Object.keys(gate.imports))assert.ok(!(r in gate.make),'importazione continua: '+r);
  run(w,1200,()=>{
   assert.ok(E.visitors.length<=2);
   for(const v of E.visitors){
    const was=seen.get(v.id)||[];if(was.at(-1)!==v.task)seen.set(v.id,[...was,v.task]);
    assert.ok(v.visitor&&['Alfa','Beta','Gamma'].includes(v.origin)&&v.name==='Convoglio da '+v.origin);
    assert.ok(v.task!=='scarica'||v.at.station===gate.i);
    const lines=shipReport(v,w.clock.t,()=>'qui');assert.equal(lines.length,2);for(const t of lines)assert.ok(t.length<=60,t);
   }
  });
  convoys+=seen.size;
  for(const [id2,steps] of seen)assert.deepEqual(steps.slice(0,3),['arrivo','scarica','partenza'].slice(0,steps.length),'convoglio '+id2);
  const done=[...seen.values()].filter(s=>s.length===3).length;assert.ok(done>=1200/CONVOY.every[1]-3,'convogli completi: '+done);
  assert.ok(E.news.some(n=>n.text.startsWith('Convoglio da ')&&n.text.includes(' alla porta: ')));
 }
 assert.ok(convoys>=24,'convogli: '+convoys);
});
test('cronaca: al più 24 notizie, in ordine di tempo, brevi, nello stile del sito e ripetibili con lo stesso seme',()=>{
 const texts=new Set(),runs=[];
 for(const k of [0,1]){
  const w=world(13,4242),E=w.E;run(w,1500);runs.push(E.news.map(n=>n.time+' '+n.text).join('\n'));
  assert.ok(E.news.length>0&&E.news.length<=24);
  for(let i=1;i<E.news.length;i++)assert.ok(E.news[i].time>=E.news[i-1].time);
  for(const n of E.news)texts.add(n.text);
 }
 assert.equal(runs[0],runs[1],'cronaca diversa con lo stesso seme');
 for(const id of [2,26]){const w=world(id,5);run(w,1500);for(const n of w.E.news)texts.add(n.text);}
 for(const t of texts){assert.ok(t.length>0&&t.length<=96,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);}
 const kinds=[' vara ',' sale al livello ','Convoglio da '];for(const k of kinds)assert.ok([...texts].some(t=>t.includes(k)),'manca il tipo di notizia: '+k);
});
test('traffico minore: ogni stazione ha una corsia verso la più vicina, senza doppioni',()=>{
 const sys={...systemArchitecture(13),id:13},entries=[...systemCraft(13),...systemExtras(13)],P=placeStations(sys,entries,displayRadius);
 const pts=P.map(p=>stationPosition(p,0,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),0).position)),lanes=minorLanes(pts);
 const keys=new Set(lanes.map(([a,b])=>a+':'+b));assert.equal(keys.size,lanes.length);
 for(let k=0;k<pts.length;k++)assert.ok(lanes.some(([a,b])=>a===k||b===k),'stazione senza corsia: '+k);
 for(const [a,b,n] of lanes){assert.ok(a<b&&[2,3].includes(n));}
 assert.ok(lanes.length>=pts.length/2&&lanes.length<=pts.length);
});
