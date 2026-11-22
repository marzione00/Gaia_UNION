import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { CRAFT, CRAFT_BY_ID } from '../src/craft/registry.js';
import { RECIPES, RESOURCES, Economy } from '../src/craft/economy.js';
import { THREAT } from '../src/craft/threats.js';
import { CHAIN_UNITS, CHAIN_STATIONS, chainable, chainStation, chainExercises } from '../src/craft/esercizi-catene.js';
import { systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips } from '../src/craft/catalog.js';
import { systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh } from '../src/renderer.js';
import { displayRadius } from '../src/scene/world.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
// Exercises on the chains of production (1.53.0): every answer recomputed here from the station, four distinct
// options, live stores of an open system, and prose in the style of the site.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max)=>{assert.ok(t.length>0&&t.length<=max,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);};
const dec=(v,k=2)=>v.toFixed(k).replace('.',','),num=t=>Number(t.replace(',','.')),name=r=>RESOURCES[r].name;
const rate=v=>dec(v,Math.abs(v*100-Math.round(v*100))>1e-9?3:2);
// The answer of each exercise, computed independently of src/craft/esercizi-catene.js.
function expected(st,e){
 const ins=Object.keys(st.use),product=Object.keys(st.make)[0],mk=st.make[product];
 const last=ins.filter(r=>st.stock[r]>0).map(r=>[r,st.stock[r]/st.use[r]]).sort((a,b)=>a[1]-b[1]);
 if(e.id==='limitante')return `${name(last[0][0])}, ${Math.round(last[0][1])} s`;
 if(e.id==='eccesso'){const ex=last.at(-1)[0];return dec(st.stock[ex]-st.use[ex]*Math.round(last[0][1]),1);}
 if(e.id==='proporzione'){const [,u,r]=e.prompt.match(/fra l'altro, ([\d,]+) di (.+?) al secondo/),Q=+e.prompt.match(/per produrre (\d+) di/)[1];assert.equal(num(u),st.use[Object.keys(RESOURCES).find(k=>name(k)===r)]);return dec(Q*num(u)/mk,1);}
 if(e.id==='velocita'){const [,T,a,b]=e.prompt.match(/Durante (\d+) s .* passa da (\d+) a ([\d,]+)\./);return rate((num(b)-a)/T);}
 if(e.id==='condizioni'){const d=+e.prompt.match(/un danno del (\d+) %/)[1]/100;return rate(mk*.5*(1-THREAT.slow*d));}
 throw new Error(e.id);
}

test('stazioni con esercizi: 178 ricette che trasformano almeno due merci in prodotti, senza navi, difesa ed equipaggi',()=>{
 assert.equal(CHAIN_STATIONS.length,178);assert.ok(CHAIN_STATIONS.every(chainable));
 for(const e of CRAFT){const r=RECIPES[e.works||e.type],ok=e.kind==='stazione'&&!!r&&Object.keys(r.make||{}).length>0&&!('equipaggi' in (r.make||{}))&&Object.keys(r.use||{}).filter(k=>k!=='equipaggi').length>=2;assert.equal(chainable(e),ok,e.id);}
 assert.ok(!CRAFT.some(e=>e.defence&&chainable(e)));assert.ok(!CRAFT.some(e=>['porto','habitat'].includes(e.works||e.type)&&chainable(e)));
 for(let s=0;s<30;s++)assert.ok(CHAIN_STATIONS.some(e=>e.system===s),'sistema '+s+' senza stazioni con esercizi');
});
test('esercizi sulle stazioni: ogni risposta corrisponde alla ricetta e alle scorte e compare nello svolgimento',()=>{
 const seen=new Set();
 for(const e of CHAIN_STATIONS.filter((_,i)=>i%3===0))for(const seed of [1,2]){
  const st=chainStation(e,null,seed),list=chainExercises(st,seed);assert.ok(list.length>=3,e.id);if(Object.keys(st.use).filter(r=>st.stock[r]>0).length>=2)assert.ok(list.some(x=>x.id==='limitante'),e.id+': manca la merce limitante');
  for(const x of list){seen.add(x.id);assert.ok(CHAIN_UNITS.includes(x.unit));assert.equal(x.options.length,4);assert.equal(new Set(x.options).size,4,x.options.join(' | '));
   assert.equal(x.options[x.correct],expected(st,x),`${e.id} ${x.id}`);const a=x.options[x.correct].split(', ').at(-1).replace(' s','');assert.ok(x.steps.some(t=>t.includes(a)),`${e.id} ${x.id}: risposta assente dallo svolgimento`);}
 }
 assert.deepEqual([...seen].sort(),['condizioni','eccesso','limitante','proporzione','velocita']);
 const st=chainStation(CHAIN_STATIONS[0],null,5);assert.deepEqual(chainExercises(st,5),chainExercises(st,5));
});
test('scorte: quelle della stazione viva quando il sistema è aperto, altrimenti estratte come all\'avvio dell\'economia',()=>{
 // An open system, built as the scene builds it.
 const id=CHAIN_STATIONS[0].system,sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,sphereMesh(6,4));sys.belt={inner:b.inner,outer:b.outer};}
 const entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id),...systemDefence(id),...systemDefenceShips(id)],P=placeStations(sys,entries,displayRadius),clock={t:0};
 const pos=p=>p.point?p.point:p.beyond!==undefined?[90,0,0]:p.station!==undefined?stationPosition(P[p.station],clock.t,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),clock.t).position):bodyAtTime(sys.bodies.find(b=>b.slot===p.body),clock.t).position;
 const E=new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:sys.bodies.map(b=>b.slot),seed:3,time:0,position:pos,distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))});
 for(;clock.t<=200;clock.t++)E.update(clock.t);
 const live=E.stations.find(s=>chainable(s.entry)),st=chainStation(live.entry,live,1);
 assert.ok(st.live);for(const r of Object.keys(st.use))assert.equal(st.use[r],Math.round(live.use[r]*1000)/1000);assert.equal(st.stock[Object.keys(st.use)[0]],Math.round(live.stock[Object.keys(st.use)[0]]||0));
 assert.ok(chainExercises(st,1).some(x=>x.prompt.includes('In questo momento il magazzino contiene')));
 const off=chainStation(live.entry,null,1),rec=RECIPES[live.entry.works||live.entry.type];assert.ok(!off.live);
 for(const [r,c] of Object.entries(rec.cap))assert.ok(off.stock[r]>=Math.round(c*.15)&&off.stock[r]<=Math.round(c*.75),r);
 assert.equal(off.strict,!!rec.inputs);
});
test('esercizi sulle stazioni: domande, risposte e svolgimenti nello stile del sito, con la sosta a metà ritmo delle stazioni morbide',()=>{
 for(const e of CHAIN_STATIONS){const st=chainStation(e,null,1);for(const x of chainExercises(st,1)){style(x.title,40);style(x.prompt,460);x.options.forEach(o=>style(o,40));x.steps.forEach(t=>style(t,320));
  if(x.id==='eccesso')assert.ok(x.steps.at(-1).includes(st.strict?'la produzione si ferma':'a metà ritmo'),e.id);}}
});
