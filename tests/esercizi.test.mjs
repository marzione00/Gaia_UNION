import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { Frontier } from '../src/craft/swarm.js';
import { exercises, EXERCISE_UNITS } from '../src/craft/esercizi.js';
import { DISCIPLINE_NAMES } from '../src/scene/layout.js';
import { fixture, layoutErrors, catalogue } from '../tools/atlas-fixture.mjs';
// Exercises on the Rapporto (1.52.0): every answer recomputed here from the state of the frontier, four
// distinct options, prose in the style of the site, and the sheet within its margins.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max)=>{assert.ok(t.length>0&&t.length<=max,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);};
const dec=(v,k=2)=>v.toFixed(k).replace('.',','),pct=(v,k=1)=>dec(v*100,k)+' %',r2=v=>Math.round(v*100)/100;
const run=(seed,end)=>{const F=new Frontier(seed,0);for(let t=0;t<=end;t+=10)F.update(t);return F;};
const states=[run(7919,0),run(7919,900),run(7919,3600),run(15838,2400),run(23757,5400),run(31676,7200)];
// The answer of each exercise, computed independently of src/craft/esercizi.js.
function expected(F,e){
 const fc=F.forecast(),past=F.record.filter(x=>x.forecast);
 if(e.id==='probabilita'){const w=F.weights.map(r2),k=DISCIPLINE_NAMES.findIndex(n=>e.prompt.endsWith(`braccio della ${n}?`));return pct(w[k]/r2(w.reduce((a,b)=>a+b,0)));}
 if(e.id==='onda'){const [lo,hi]=fc[0].wave;return dec((lo+hi)/2,1);}
 if(e.id==='totale'){const total=fc.reduce((a,f)=>a+f.p,0),milli=fc.map(f=>f.p/total*1000),base=milli.map(Math.floor);let left=1000-base.reduce((a,b)=>a+b,0);milli.map((v,i)=>[v-base[i],i]).sort((a,b)=>b[0]-a[0]).forEach(([,i])=>{if(left-->0)base[i]++;});return pct(base.reduce((a,b,i)=>a+b/1000*r2(fc[i].repel),0));}
 if(e.id==='brier'){const last=past.slice(-5);return dec(last.reduce((a,x)=>a+Math.round((r2(x.forecast.repel)-(x.outcome==='respinta'?1:0))**2*1e4)/1e4,0)/last.length,3);}
 if(e.id==='scarto'){const last=past.slice(-20),T=last.filter(x=>x.forecast.top).length,mu=r2(last.reduce((a,x)=>a+x.forecast.max,0)),V=r2(last.reduce((a,x)=>a+x.forecast.max*(1-x.forecast.max),0));return dec((T-mu)/Math.sqrt(V));}
 throw new Error(e.id);
}

test('esercizi: ogni risposta corrisponde ai numeri del fronte e compare nello svolgimento',()=>{
 const seen=new Set();
 for(const F of states)for(const seed of [1,2,3]){const list=exercises(F,seed);assert.ok(list.length>=2,'troppo pochi esercizi');
  for(const e of list){seen.add(e.id);assert.ok(EXERCISE_UNITS.includes(e.unit));assert.equal(e.options.length,4);assert.equal(new Set(e.options).size,4,e.options.join(' | '));
   assert.ok(e.correct>=0&&e.correct<4);assert.equal(e.options[e.correct],expected(F,e),e.id);assert.ok(e.steps.some(s=>s.includes(e.options[e.correct].replace(' %',''))),e.id+': risposta assente dallo svolgimento');}}
 assert.deepEqual([...seen].sort(),['brier','onda','probabilita','scarto','totale']);
});
test('esercizi: la stessa richiesta dà gli stessi esercizi, con le opzioni in ordine diverso fra un seme e l\'altro',()=>{
 const F=states[2];assert.deepEqual(exercises(F,4),exercises(F,4));
 const orders=new Set([1,2,3,4,5,6].map(s=>exercises(F,s).map(e=>e.correct).join('')));assert.ok(orders.size>1,'la risposta corretta è sempre nello stesso posto');
 assert.ok(exercises(states[0],1).every(e=>e.id!=='brier'&&e.id!=='scarto'),'esercizi sulla storia senza incursioni concluse');
});
test('esercizi: domande, opzioni e svolgimenti nello stile del sito',()=>{
 for(const F of states)for(const e of exercises(F,1)){style(e.title,40);style(e.prompt,520);e.options.forEach(o=>style(o,12));e.steps.forEach(s=>style(s,260));}
});
test('scheda degli esercizi: dal Rapporto e dall\'unità, risposta, svolgimento e margini su schermo largo e su telefono',()=>{
 for(const [w,h] of [[1280,900],[390,844],[320,568]]){
  const f=fixture(w,h);f.world.frontier=run(7919,3600);f.A.open('rapporto');f.draw();assert.deepEqual(layoutErrors(f),[],`Rapporto ${w}x${h}`);
  f.click('atlas-rapporto-esercizi');assert.equal(f.A.sheet,'esercizi');f.draw();assert.deepEqual(layoutErrors(f),[],`esercizi ${w}x${h}`);
  const D=f.A.drill,e=D.list[0],wrong=(e.correct+1)%4;assert.match(f.A.semanticText(),/Esercizio 1 di \d, /);
  f.click('atlas-drill-option-'+wrong);f.draw();assert.equal(D.chosen[0],wrong);assert.deepEqual(layoutErrors(f),[],`risposta ${w}x${h}`);
  assert.ok(f.A.semanticText().includes('La risposta corretta è '+e.options[e.correct]+'.'));assert.ok(f.A.semanticText().includes(e.steps[0]));
  if(f.U.buttons.some(b=>b.id==='atlas-drill-option-'+e.correct)){f.click('atlas-drill-option-'+e.correct);assert.equal(D.chosen[0],wrong,'la prima risposta resta');}
  f.click('atlas-drill-next');f.draw();assert.equal(D.i,1);f.click('atlas-drill-rapporto');assert.equal(f.A.sheet,'rapporto');
  f.click('atlas-rapporto-esercizi');assert.equal(f.A.drill.seed,2);assert.equal(f.A.drill.chosen.length,0);
  for(const id of EXERCISE_UNITS){const i=catalogue.modules.findIndex(m=>m.id===id);f.api.selectIndex(i);f.A.open('detail');f.draw();assert.ok(f.U.buttons.some(b=>b.id==='atlas-detail-esercizi'),id);assert.deepEqual(layoutErrors(f),[],`${id} ${w}x${h}`);}
  f.api.selectIndex(catalogue.modules.findIndex(m=>m.id==='physics-11'));f.A.open('detail');f.draw();assert.ok(!f.U.buttons.some(b=>b.id==='atlas-detail-esercizi'));
 }
});
test('scheda degli esercizi: domanda e svolgimento entrano interi anche sul telefono più piccolo',()=>{
 for(const [w,h] of [[320,568],[390,844],[1280,900]])for(const F of states.slice(2)){
  const f=fixture(w,h),seen=[],draw=f.R.text.bind(f.R);f.R.text=(t,...a)=>{seen.push(String(t));return draw(t,...a);};
  const drawn=()=>{seen.length=0;f.draw();return seen.join(' ');};
  f.world.frontier=F;f.A.open('rapporto');f.draw();f.click('atlas-rapporto-esercizi');const D=f.A.drill;
  D.list.forEach((e,i)=>{D.i=i;assert.ok(drawn().includes(e.prompt.split(' ').at(-1)),`${w}x${h} ${e.id}: domanda tagliata`);
   D.chosen[i]=(e.correct+1)%4;const t=drawn();for(const st of e.steps)assert.ok(t.includes(st.split(' ').at(-1)),`${w}x${h} ${e.id}: svolgimento tagliato`);});
 }
});
