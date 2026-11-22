import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { Frontier } from '../src/craft/swarm.js';
import { EXERCISE_SETS, SYSTEM_UNITS, EXAMPLE_STATIONS, CHAIN_STATIONS } from '../src/craft/esercizi-indice.js';
import { examplesMarkdown } from '../scripts/esercizi-esempi.mjs';
import { fixture, layoutErrors, catalogue } from '../tools/atlas-fixture.mjs';
// The series «Didattica dai sistemi» as a whole (1.56.0): the index of the four sets against what they produce,
// the same rules for every exercise, no favourite position for the right answer, the cards of the units, the
// generated examples and the measured times quoted in the teacher's guide.
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const run=(seed,end)=>{const F=new Frontier(seed,0);for(let t=0;t<=end;t+=10)F.update(t);return F;};
const fronts=[[7919,0],[7919,600],[7919,1500],[7919,2400],[15838,1800],[23757,3600],[31676,5400],[39595,7200]].map(([s,e])=>run(s,e));
const generate=set=>set.topic==='stazioni'?CHAIN_STATIONS.filter((_,i)=>i%4===0).flatMap(e=>[1,2].map(seed=>set.make(e,seed))):fronts.flatMap(F=>[1,2,3].map(seed=>set.make(F,seed)));
const guide=fs.readFileSync(new URL('../docs/GUIDA_DOCENTE.md',import.meta.url),'utf8');

test('indice: quattro serie, sei unità del catalogo, e ogni serie produce esattamente gli esercizi che dichiara',()=>{
 assert.deepEqual(EXERCISE_SETS.map(s=>s.topic),['statistica','stazioni','energia','crescita']);
 assert.deepEqual([...SYSTEM_UNITS].sort(),['biology-21','chemistry-14','chemistry-17','math-c10','math-p07','physics-20']);
 const ids=new Set(catalogue.modules.map(m=>m.id));for(const u of SYSTEM_UNITS)assert.ok(ids.has(u),u);
 for(const set of EXERCISE_SETS){const seen=new Set();for(const list of generate(set))for(const e of list){seen.add(e.id);assert.ok(set.units.includes(e.unit),`${set.topic} ${e.id} ${e.unit}`);}
  assert.deepEqual([...seen].sort(),[...set.ids].sort(),set.topic);for(const u of set.card)assert.ok(set.units.includes(u));}
});
test('regole comuni: quattro risposte distinte e leggibili, risposta corretta senza posizione preferita',()=>{
 const pos=[0,0,0,0];let n=0;
 for(const set of EXERCISE_SETS)for(const list of generate(set))for(const e of list){
  for(const k of ['id','unit','title','prompt'])assert.equal(typeof e[k],'string',k);assert.ok(Array.isArray(e.steps)&&e.steps.length>=2);
  assert.equal(e.options.length,4);assert.equal(new Set(e.options).size,4);assert.ok(Number.isInteger(e.correct)&&e.correct>=0&&e.correct<4);
  for(const t of [e.prompt,...e.options,...e.steps])assert.ok(!/NaN|Infinity|undefined|\bnull\b/.test(t),t);
  pos[e.correct]++;n++;}
 assert.ok(n>=600,'esercizi generati: '+n);for(const p of pos)assert.ok(p/n>.18&&p/n<.32,'posizioni della risposta corretta: '+pos.join(' '));
});
test('schede delle unità: ogni unità della serie porta ai suoi esercizi, nei margini, su schermo largo e su telefono',()=>{
 for(const [w,h] of [[1280,900],[320,568]]){
  const f=fixture(w,h),calls=[];f.world.frontier=fronts[3];f.A.api.openStationDrill=id=>calls.push(id);
  for(const set of EXERCISE_SETS)for(const u of set.card){
   f.api.selectIndex(catalogue.modules.findIndex(m=>m.id===u));f.A.open('detail');f.draw();assert.deepEqual(layoutErrors(f),[],`${u} ${w}x${h}`);
   f.click('atlas-detail-esercizi');
   if(set.topic==='stazioni')assert.equal(calls.at(-1),u);else{assert.equal(f.A.sheet,'esercizi');assert.equal(f.A.drill.topic,set.topic,u);}
  }
 }
});
test('documentazione: gli esempi corrispondono al codice, la guida cita ogni serie e i tempi del fronte misurati',()=>{
 const md=examplesMarkdown();assert.equal(fs.readFileSync(new URL('../docs/ESERCIZI_SISTEMI.md',import.meta.url),'utf8'),md,'docs/ESERCIZI_SISTEMI.md è da rigenerare con node scripts/esercizi-esempi.mjs');
 for(const set of EXERCISE_SETS){assert.ok(md.includes('## '+set.title));assert.ok(guide.includes('## '+set.title));for(const u of set.units)assert.ok(guide.includes(u),u);}
 assert.equal(md.split('\n').filter(l=>l.startsWith('#### ')).length,EXERCISE_SETS.reduce((a,s)=>a+s.ids.length*(s.topic==='stazioni'?EXAMPLE_STATIONS.length:1),0));
 // The times quoted in the guide, measured again on twelve sessions.
 const t={3:[],8:[],key:[],freed:[]};
 for(let k=1;k<=12;k++){const F=new Frontier(k*7919,0),first={};for(let s=0;s<=7200;s+=10){F.update(s);const n=F.record.filter(x=>x.forecast).length;
  if(n>=3)first[3]??=s;if(n>=8)first[8]??=s;if(F.keys.length)first.key??=s;if([...F.freed.values()].some(v=>v>0))first.freed??=s;}for(const q in t)t[q].push(first[q]);}
 const span=q=>`fra ${Math.round(Math.min(...t[q])/60)} e ${Math.round(Math.max(...t[q])/60)} minuti`;
 assert.ok(guide.includes(`le prime tre incursioni concluse arrivano ${span(3)}, le prime otto ${span(8)}, la prima chiave ${span('key')} e i primi droni liberati ${span('freed')}`),'tempi della guida da aggiornare');
 for(const p of guide.split('\n\n').filter(p=>!p.startsWith('|')&&!p.startsWith('#')))for(const r of STYLE)assert.ok(!r.test(p),p.slice(0,80));
});
