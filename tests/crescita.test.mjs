import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { Frontier, SWARM } from '../src/craft/swarm.js';
import { growthExercises, GROWTH_UNITS, DOUBLING, PER_RAID, RATE } from '../src/craft/esercizi-crescita.js';
import { fixture, layoutErrors, catalogue } from '../tools/atlas-fixture.mjs';
// Exercises on growth and replication (1.55.0): every answer recomputed here from the prompt, four distinct
// options, the numbers taken from the frontier, prose in the style of the site, and the sheet within its margins.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max)=>{assert.ok(t.length>0&&t.length<=max,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);};
const dec=(v,k=2)=>v.toFixed(k).replace('.',','),num=t=>Number(t.replace(',','.'));
const run=(seed,end)=>{const F=new Frontier(seed,0);for(let t=0;t<=end;t+=10)F.update(t);return F;};
const states=[run(7919,0),run(7919,1200),run(7919,3600),run(15838,2400),run(23757,5400),run(31676,7200)];
function expected(F,e){
 if(e.id==='raddoppio'){const N=+e.prompt.match(/i droni sono (\d+),/)[1];assert.equal(N,F.forecast()[0].wave[1]);return dec(DOUBLING*Math.log2(N),1)+' s';}
 if(e.id==='esponenziale'){const N0=num(e.prompt.match(/è di ([\d,]+) droni/)[1]),k=+e.prompt.match(/dopo (\d+) incursioni/)[1];const [lo,hi]=F.forecast()[0].wave;assert.equal(N0,(lo+hi)/2);return dec(N0*(1+PER_RAID)**k,1);}
 if(e.id==='logistica'){const n=+e.prompt.match(/ci sono (\d+) droni liberati/)[1],K=SWARM.freedCap;assert.ok([...F.freed.values()].includes(n));return dec(RATE*n*(1-n/K),2);}
 if(e.id==='resistenza'){const s=num(e.prompt.match(/ha forza ([\d,]+)\./)[1]);assert.equal(s,Math.round(F.keys.at(-1).strength*100)/100);let n=0;while(s*SWARM.key.decay**n>=SWARM.key.obsolete)n++;return n===1?'1 uso':`${n} usi`;}
 if(e.id==='peso'){const w=num(e.prompt.match(/il peso ([\d,]+)\./)[1]);assert.equal(w,Math.round(Math.min(...F.weights)*100)/100);let n=0,v=w;while(v<SWARM.learn.max-1e-9){v*=SWARM.learn.win;n++;}return n===1?'1 conversione':`${n} conversioni`;}
 throw new Error(e.id);
}

test('crescita e replicazione: ogni risposta corrisponde ai numeri del fronte e compare nello svolgimento',()=>{
 const seen=new Set();
 for(const F of states)for(const seed of [1,2,3]){const list=growthExercises(F,seed);assert.ok(list.length>=3);
  for(const e of list){seen.add(e.id);assert.ok(GROWTH_UNITS.includes(e.unit));assert.equal(e.options.length,4);assert.equal(new Set(e.options).size,4,e.options.join(' | '));
   assert.equal(e.options[e.correct],expected(F,e),e.id);const a=e.options[e.correct].replace(/ (s|usi|uso|conversioni|conversione)$/,'');assert.ok(e.steps.some(s=>s.includes(a)),e.id+': risposta assente dallo svolgimento');}}
 assert.deepEqual([...seen].sort(),['esponenziale','logistica','peso','raddoppio','resistenza']);
 assert.ok(growthExercises(states[0],1).every(e=>e.id!=='resistenza'&&e.id!=='logistica'),'chiavi e droni liberati prima delle incursioni');
 assert.deepEqual(growthExercises(states[3],4),growthExercises(states[3],4));
});
test('crescita e replicazione: domande, risposte e svolgimenti nello stile del sito',()=>{
 for(const F of states)for(const e of growthExercises(F,1)){style(e.title,40);style(e.prompt,520);e.options.forEach(o=>style(o,20));e.steps.forEach(s=>style(s,280));}
});
test('scheda: dal Rapporto e dall\'unità sulla crescita microbica, risposta e svolgimento interi su schermo largo e su telefono',()=>{
 for(const [w,h] of [[1280,900],[390,844],[320,568]]){
  const f=fixture(w,h),seen=[],draw=f.R.text.bind(f.R);f.R.text=(t,...a)=>{seen.push(String(t));return draw(t,...a);};const drawn=()=>{seen.length=0;f.draw();return seen.join(' ');};
  f.world.frontier=states[3];f.A.open('rapporto');f.draw();assert.deepEqual(layoutErrors(f),[],`Rapporto ${w}x${h}`);
  f.click('atlas-rapporto-crescita');assert.equal(f.A.drill.topic,'crescita');assert.ok(drawn().includes(w<400?'CRESCITA':'CRESCITA E REPLICAZIONE'));
  const D=f.A.drill;assert.equal(D.list.length,5);D.list.forEach((e,i)=>{D.i=i;assert.ok(drawn().includes(e.prompt.split(' ').at(-1)),`${w}x${h} ${e.id}: domanda tagliata`);assert.deepEqual(layoutErrors(f),[],`${w}x${h} ${e.id}`);
   D.chosen[i]=(e.correct+1)%4;const t=drawn();for(const st of e.steps)assert.ok(t.includes(st.split(' ').at(-1)),`${w}x${h} ${e.id}: svolgimento tagliato`);assert.deepEqual(layoutErrors(f),[],`${w}x${h} ${e.id} risposta`);});
  const i=catalogue.modules.findIndex(m=>m.id==='biology-21');f.api.selectIndex(i);f.A.open('detail');f.draw();assert.deepEqual(layoutErrors(f),[],`biology-21 ${w}x${h}`);
  f.click('atlas-detail-esercizi');assert.equal(f.A.drill.topic,'crescita');assert.equal(f.A.drill.seed,2);
 }
});
