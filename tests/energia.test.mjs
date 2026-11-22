import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { Frontier } from '../src/craft/swarm.js';
import { energyExercises, ENERGY_UNITS, K_B, LN2, HOT } from '../src/craft/esercizi-energia.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { indicesForSystem, AREAS } from '../src/scene/systems.js';
import { CRAFT } from '../src/craft/registry.js';
import { fixture, layoutErrors, catalogue } from '../tools/atlas-fixture.mjs';
// Exercises on energy and information (1.54.0): every answer recomputed here from the prompt and from the
// physical model, four distinct options, prose in the style of the site, and the sheet within its margins.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max)=>{assert.ok(t.length>0&&t.length<=max,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);};
const dec=(v,k=2)=>v.toFixed(k).replace('.',','),num=t=>Number(t.replace(',','.')),log2=v=>Math.log(v)/Math.LN2;
const run=(seed,end)=>{const F=new Frontier(seed,0);for(let t=0;t<=end;t+=10)F.update(t);return F;};
const states=[run(7919,0),run(7919,1200),run(7919,3600),run(15838,2400),run(23757,5400),run(31676,7200)],planets=planetPhysics();
// The front system of the most likely arm, as the Rapporto shows it.
const front=F=>{const fc=F.forecast(),best=Math.max(...fc.map(f=>f.p));return fc.find(f=>f.p===best).system;};
function expected(F,e){
 if(e.id==='landauer'){const t=+e.prompt.match(/di circa (\d+) K;/)[1];return dec(K_B*t*LN2/1e-21,2)+' × 10⁻²¹ J';}
 if(e.id==='freddo'){const [,h,c]=e.prompt.match(/circa (\d+) K, il più freddo di circa (\d+) K/);return dec(h/c,2);}
 if(e.id==='carnot'){const t=+e.prompt.match(/circa (\d+) K\./)[1];return dec((1-t/HOT)*100,1)+' %';}
 if(e.id==='entropia'){const p=[...e.prompt.matchAll(/ (0,\d{3})/g)].map(m=>num(m[1]));assert.equal(p.length,4);assert.ok(Math.abs(p.reduce((a,b)=>a+b,0)-1)<1e-9);return dec(-p.reduce((a,v)=>a+(v>0?v*log2(v):0),0),2)+' bit';}
 if(e.id==='sorpresa'){const q=num(e.prompt.match(/probabilità (0,\d{3})/)[1]);return dec(-log2(q),2)+' bit';}
 throw new Error(e.id);
}

test('energia e informazione: ogni risposta corrisponde ai numeri della domanda e compare nello svolgimento',()=>{
 const seen=new Set();
 for(const F of states)for(const seed of [1,2,3]){const list=energyExercises(F,seed,planets);assert.ok(list.length>=4);
  for(const e of list){seen.add(e.id);assert.ok(ENERGY_UNITS.includes(e.unit));assert.equal(e.options.length,4);assert.equal(new Set(e.options).size,4,e.options.join(' | '));
   assert.equal(e.options[e.correct],expected(F,e),e.id);assert.ok(e.steps.some(s=>s.includes(e.options[e.correct].replace(' bit','').replace(' %',''))),e.id+': risposta assente dallo svolgimento');}}
 assert.deepEqual([...seen].sort(),['carnot','entropia','freddo','landauer','sorpresa']);
 assert.ok(energyExercises(states[0],1,planets).every(e=>e.id!=='sorpresa'),'sorpresa senza incursioni concluse');
});
test('energia e informazione: temperature del modello fisico nel sistema del bersaglio più probabile, e la centrale di quel sistema',()=>{
 for(const F of states){const sys=front(F),teq=indicesForSystem(sys).map(i=>Math.round(planets[i].teq)),list=energyExercises(F,1,planets);
  for(const e of list){assert.ok(e.id==='entropia'||e.id==='sorpresa'||e.prompt.includes(AREAS[sys].name),e.id);
   for(const m of e.prompt.matchAll(/circa (\d+) K/g))assert.ok(teq.includes(+m[1]),`${m[1]} K fuori dal sistema ${sys}`);}
  const c=list.find(e=>e.id==='carnot'),plant=CRAFT.find(x=>x.system===sys&&(x.works||x.type)==='centrale');assert.ok(plant?c.prompt.startsWith(plant.name+', la centrale a fusione'):c.prompt.startsWith('Una centrale a fusione'));
  const f=list.find(e=>e.id==='freddo');if(f){const [,h,c2]=f.prompt.match(/circa (\d+) K, il più freddo di circa (\d+) K/);assert.equal(+h,Math.max(...teq));assert.equal(+c2,Math.min(...teq));}}
 assert.deepEqual(energyExercises(states[2],4,planets),energyExercises(states[2],4,planets));
});
test('energia e informazione: domande, risposte e svolgimenti nello stile del sito',()=>{
 for(const F of states)for(const e of energyExercises(F,1,planets)){style(e.title,40);style(e.prompt,520);e.options.forEach(o=>style(o,24));e.steps.forEach(s=>style(s,280));}
});
test('scheda: dal Rapporto e dall\'unità di termodinamica, risposta e svolgimento interi su schermo largo e su telefono',()=>{
 for(const [w,h] of [[1280,900],[390,844],[320,568]]){
  const f=fixture(w,h),seen=[],draw=f.R.text.bind(f.R);f.R.text=(t,...a)=>{seen.push(String(t));return draw(t,...a);};const drawn=()=>{seen.length=0;f.draw();return seen.join(' ');};
  f.world.frontier=states[2];f.A.open('rapporto');f.draw();assert.deepEqual(layoutErrors(f),[],`Rapporto ${w}x${h}`);
  f.click('atlas-rapporto-energia');assert.equal(f.A.sheet,'esercizi');assert.equal(f.A.drill.topic,'energia');f.draw();assert.deepEqual(layoutErrors(f),[],`energia ${w}x${h}`);
  assert.ok(drawn().includes(w<400?'ENERGIA':'ENERGIA E INFORMAZIONE'));
  const D=f.A.drill;D.list.forEach((e,i)=>{D.i=i;assert.ok(drawn().includes(e.prompt.split(' ').at(-1)),`${w}x${h} ${e.id}: domanda tagliata`);
   D.chosen[i]=(e.correct+1)%4;const t=drawn();for(const st of e.steps)assert.ok(t.includes(st.split(' ').at(-1)),`${w}x${h} ${e.id}: svolgimento tagliato`);assert.deepEqual(layoutErrors(f),[],`${w}x${h} ${e.id}`);});
  assert.ok(f.A.semanticText().includes('La risposta corretta è '));
  f.click('atlas-drill-rapporto');f.click('atlas-rapporto-esercizi');assert.equal(f.A.drill.topic,'statistica');
  const i=catalogue.modules.findIndex(m=>m.id==='physics-20');f.api.selectIndex(i);f.A.open('detail');f.draw();assert.deepEqual(layoutErrors(f),[],`physics-20 ${w}x${h}`);
  f.click('atlas-detail-esercizi');assert.equal(f.A.sheet,'esercizi');assert.equal(f.A.drill.topic,'energia');assert.equal(f.A.drill.seed,2);
 }
});
