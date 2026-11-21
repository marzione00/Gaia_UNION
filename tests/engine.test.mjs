import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { CATALOG, build, LOW_DETAIL } from '../src/craft/catalog.js';
import { pack } from '../src/craft/kit.js';
import { CraftFactory, make, buffers } from '../src/craft/factory.js';
import { chooseLevels, BUDGET, NEAR, LOW_SHARE } from '../src/craft/detail.js';
import { shipMatrix } from '../src/craft/traffic.js';
import { frameSummary, FrameMeter, diagnosticLines } from '../src/ui/diagnostics.js';
// Engine of 1.41: levels of detail, packed models, the build factory and its worker, instanced ships, diagnostics.
test('livello semplificato: stessa ricetta, stesse parti e luci, meno di un terzo dei triangoli sul catalogo',()=>{
 let full=0,low=0;
 for(const e of CATALOG){
  const a=build(e),b=build(e,e.seed,{detail:LOW_DETAIL});full+=a.triangles;low+=b.triangles;
  assert.deepEqual(b.recipe,a.recipe,e.id);assert.equal(b.parts.length,a.parts.length,e.id);assert.equal(b.lights.length,a.lights.length,e.id);
  assert.deepEqual(b.parts.map(p=>p.spin),a.parts.map(p=>p.spin),e.id);assert.equal(Boolean(b.field),Boolean(a.field),e.id);
  assert.ok(b.triangles<a.triangles*.7,e.id+': '+b.triangles+' di '+a.triangles);
  assert.ok(Math.abs(b.radius/a.radius-1)<.03,e.id+': raggio '+b.radius/a.radius);
 }
 assert.ok(low/full<.33,'quota '+(low/full).toFixed(3));assert.ok(Math.abs(low/full-LOW_SHARE)<.03,'LOW_SHARE da aggiornare: '+(low/full).toFixed(3));
});
test('modello impacchettato: le parti ferme in una mesh, le parti che ruotano a parte, nessun triangolo perso',()=>{
 let turning=0;
 for(const e of CATALOG.filter((_,k)=>k%7===0)){
  const m=pack(build(e)),count=x=>x?x.i.length/3:0,vertices=x=>x.v.length/16;
  assert.equal(count(m.body)+m.spinning.reduce((n,p)=>n+count(p.mesh),0)+count(m.field),m.triangles,e.id);
  if(m.body){assert.ok(m.body.i.every(i=>i<vertices(m.body)),e.id);assert.equal(m.body.stride,16);}
  for(const p of m.spinning){assert.ok(m.parts[p.part].spin);turning++;}
  assert.equal(m.parts.filter(p=>p.spin).length,m.spinning.length);assert.ok(m.lights.every(l=>l.part<m.parts.length));
 }
 assert.ok(turning>0,'nessuna parte rotante nel campione');
});
test('livelli: punto luce sotto la soglia, modello completo dal più grande in giù entro il bilancio',()=>{
 const o=(apparent,low=1000,full=4000)=>({apparent,min:1,low,full});
 assert.deepEqual(chooseLevels([o(.5),o(10),o(NEAR),o(300)]),[2,1,0,0]);
 const many=Array.from({length:400},(_,k)=>o(NEAR+k,1000,4000)),levels=chooseLevels(many,'low');
 const used=many.reduce((n,x,k)=>n+(levels[k]===0?x.full:levels[k]===1?x.low:0),0);
 assert.ok(used<=BUDGET.low,'bilancio superato: '+used);
 // Too many low models for the light setting: the smallest become points of light, the largest stay.
 assert.equal(levels[0],2);assert.notEqual(levels.at(-1),2);assert.ok(levels.every((l,k)=>k===0||l<=levels[k-1]),'ordine per dimensione');
 const few=Array.from({length:40},(_,k)=>o(NEAR+k,1000,4000)),high=chooseLevels(few,'high'),light=chooseLevels(few,'low');
 assert.ok(high.every(l=>l===0),'con il bilancio alto tutti completi');
 const full=light.filter(l=>l===0).length;assert.ok(full>0&&full<40);assert.ok(light.slice(40-full).every(l=>l===0),'il completo va ai più grandi');
 assert.ok(chooseLevels(few,'balanced').filter(l=>l===0).length>=full);
});
test('fabbrica: prima i modelli semplificati, una richiesta per modello, consegna una volta, sistemi vecchi scartati',()=>{
 const f=new CraftFactory({worker:false}),[a,b]=CATALOG;
 f.want(a,1);f.want(b,LOW_DETAIL);f.want(b,LOW_DETAIL);f.want(a,LOW_DETAIL);
 assert.deepEqual(f.queue.map(j=>j.key),[b.id+'@'+LOW_DETAIL,a.id+'@'+LOW_DETAIL,a.id+'@1']);
 f.pump();assert.ok(f.take(b,LOW_DETAIL).body);assert.equal(f.take(b,LOW_DETAIL),null);assert.equal(f.stats.built,1);
 f.clear();assert.equal(f.pending(),0);
 // A reply from the worker for a job of the previous system is dropped.
 const posted=[];f.worker={postMessage:job=>posted.push(job)};f.want(a,1);f.pump();const job=posted[0];f.clear();
 f.receive({key:job.key,model:make(job),ms:5});assert.equal(f.take(a,1),null);assert.equal(f.busy.size,0);
 f.want(a,1);f.pump();f.receive({key:posted[1].key,error:'prova'});f.want(a,1);assert.equal(f.pending(),0,'un modello fallito non si richiede di nuovo');
});
test('worker: costruisce il modello e trasferisce i buffer',async()=>{
 const sent=[];globalThis.self={postMessage:(data,transfer)=>sent.push({data,transfer})};
 await import('../src/craft/worker.js');
 const e=CATALOG.find(x=>x.type==='porta');self.onmessage({data:{key:'k',id:e.id,detail:LOW_DETAIL}});
 const {data,transfer}=sent[0];assert.equal(data.key,'k');assert.ok(data.model.field&&data.model.body);
 assert.equal(transfer.length,buffers(data.model).length);assert.ok(transfer.every(t=>t instanceof ArrayBuffer));
 self.onmessage({data:{key:'x',id:'nessuna',detail:1}});assert.match(sent[1].data.error,/sconosciuta/);
 delete globalThis.self;
});
test('istanze delle navi: la base costruita nello shader coincide con la matrice della nave',()=>{
 const vs=fs.readFileSync(new URL('../src/scene/shaders.js',import.meta.url),'utf8');
 assert.match(vs,/uInstanced==5\)\{vec3 f=normalize\(aInstC\.xyz\),x=cross\(vec3\(0,1,0\),f\);/);assert.match(vs,/vec3 y=cross\(f,x\);vertex=\(x\*vertex\.x\+y\*vertex\.y\+f\*vertex\.z\)\*s\+base;/);
 assert.match(vs,/l=dot\(uLight,uLight\)>0\.\?normalize\(uLight\):normalize\(-vWorld\)/);
 assert.match(vs,/else if\(uInstanced==6\)\{vertex=vertex\*s\+base;color=aInstC;\}/);assert.match(vs,/uMaterial==17\)\{float f=dot\(n,v\);if\(f<0\.\)discard;outColor=vec4\(c,/);
 const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],unit=v=>{const l=Math.hypot(...v);return v.map(x=>x/l);};
 for(const f0 of [[1,0,0],[0,.2,1],[-.3,-.8,.5],[.6,.1,-.7]]){
  const f=unit(f0),x=unit(cross([0,1,0],f)),y=cross(f,x),M=shipMatrix([1,2,3],f,2);
  [x,y,f].forEach((axis,c)=>axis.forEach((v,i)=>assert.ok(Math.abs(M[c*4+i]-2*v)<1e-6)));
 }
});
test('diagnostica: frequenza dai tempi dei fotogrammi e righe del pannello',()=>{
 const s=frameSummary([16,16,16,52,0]);assert.equal(s.frames,4);assert.equal(s.worst,52);assert.ok(Math.abs(s.fps-1000/25)<1e-9);
 const m=new FrameMeter(3);for(const t of [10,20,30,40])m.add(t,2);assert.deepEqual(m.times,[20,30,40]);assert.equal(m.summary().cpu,2);
 const lines=diagnosticLines({version:'1.41.0',frame:m.summary(),meshDrawCalls:410,meshTriangles:1920000,craft:{full:2,low:9,light:9,triangles:181000,pending:3},craftFactory:{built:26,worker:true,ms:130},quality:'balanced',canvas:[1920,1080],sceneSize:[1536,864],pixelRatio:1,gpu:'prova'});
 assert.equal(lines.length,8);assert.match(lines[1],/^33,3 fotogrammi al secondo/);assert.match(lines[4],/2 complete, 9 semplificate, 9 punti luce/);assert.match(lines[5],/in un worker, 5,0 ms ciascuno in media, 3 in coda/);
 for(const l of lines){assert.ok(!/—/.test(l));assert.ok(!/\bnon\b[^.;:\n]{0,80}\bma\b/.test(l));}
});
