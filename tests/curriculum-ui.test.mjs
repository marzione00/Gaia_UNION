import test from 'node:test';import assert from 'node:assert/strict';import {fixture,bundle,layoutErrors} from '../tools/course-fixture.mjs';
import {descriptor,trend} from '../src/models/curriculum.js';import {cleanState} from '../src/store.js';import {validateBundle} from '../src/education/course-engine.js';
const sizes=[[1600,1000],[1280,820],[1280,720],[390,844],[320,568]];
test('curriculum UI: 4.000 combinazioni moduli/stati/finestre senza comandi sovrapposti o fuori finestra',()=>{
 let count=0;for(const [w,h]of sizes){const f=fixture(w,h);for(const d of bundle.courses){f.state.unit=d.id;f.E.select(d.id);for(const [stage,view,tab]of [[0,'lesson',0],[1,'lesson',0],[4,'lesson',0],[2,'lab',0],[2,'controls',0],[2,'controls',1],[5,'controls',2],[0,'sources',0]]){Object.assign(f.E,{view,controlTab:tab,focusReading:false,page:0});f.E.record.stage=stage;f.draw();assert.deepEqual(layoutErrors(f),[],d.id+'/'+w+'/'+view+'/'+stage);count++;}}}assert.equal(count,4000);
});
test('curriculum UI: tutti i quesiti e feedback in lettura espansa su 320x568',()=>{
 const f=fixture(320,568);for(const d of bundle.courses){f.state.unit=d.id;f.E.select(d.id);f.E.record.stage=4;f.E.focusReading=true;for(let i=0;i<4;i++){f.E.question=i;f.E.feedback=false;f.draw();assert.deepEqual(layoutErrors(f),[],d.id+'/'+i);const q=d.questions[i];f.click('course-answer-'+q.correct);assert.equal(f.E.summary.correct,i+1);f.draw();assert.deepEqual(layoutErrors(f),[]);assert.ok(f.E.semanticText().includes(q.options.find(o=>o.id===q.correct).feedback));}}
});
test('curriculum UI: laboratorio, diario, esportazione e completamento per tutte le cento unità',()=>{
 const f=fixture(1280,900);for(const d of bundle.courses){f.state.unit=d.id;f.E.select(d.id);f.E.controlTab=1;f.E.view='controls';const m=descriptor(d.id);
 f.click('course-predict-'+trend(d.id,f.E.record.parameters));f.click('course-capture-A');const original=JSON.stringify(f.E.record.snapshots.A);const c=m.controls[0];f.E.setParameters({[c.key]:c.value===c.min?c.max:c.min});assert.equal(f.E.record.prediction,null);assert.equal(JSON.stringify(f.E.record.snapshots.A),original);
 f.click('course-predict-'+trend(d.id,f.E.record.parameters));f.click('course-capture-B');assert.ok(f.E.summary.experiments);assert.equal(f.E.summary.eligible,false);
 for(const q of d.questions)f.E.answer(q.id,q.correct);f.store.data.notes[f.E.noteKey]='Ho confrontato due configurazioni. Registro parametri, previsione, risultati e limiti; il modello non coincide con ogni dettaglio della realtà.';f.E.controlTab=2;f.click('course-ack');assert.ok(f.E.summary.eligible);f.click('course-complete');assert.ok(f.E.summary.completed);f.click('course-report');assert.equal(f.api.downloaded.data.unitId,d.id);assert.ok(f.api.downloaded.data.experiments.A);f.click('course-csv');assert.match(f.api.downloaded.data,/^x \[/);f.click('course-journal');assert.equal(f.state.journalTab,'course:'+d.id);f.state.scene='mission';
 }const restored=cleanState(JSON.parse(JSON.stringify(f.store.data)));assert.equal(Object.keys(restored.courses).length,100);assert.equal(Object.keys(restored.notes).filter(k=>k.startsWith('course:')).length,100);
});
test('curriculum UI: sette percorsi, cinque finestre, collegamenti espliciti',()=>{
 for(const [w,h]of sizes){const f=fixture(w,h);for(let p=0;p<7;p++){f.E.pathIndex=p;f.R.texts=[];f.U.begin();f.E.drawPathsUI(f.U,f.state);assert.deepEqual(layoutErrors(f),[],p+'/'+w);const id=bundle.paths[p].units[0],b=f.U.buttons.find(x=>x.id==='path-unit-'+id);assert.ok(b);f.U.activate(b,b.x+10);assert.equal(f.state.unit,id);}}
});
test('curriculum UI: slider con minimo non nullo, intervallo piccolissimo e limiti',()=>{
 const f=fixture();for(const [min,max,step]of [[.05,.95,.1],[1e-9,5e-9,1e-10],[-7,9,.2]]){let got;const b={x:0,w:100,min,max,step,value:min,slider:true,action:v=>got=v};for(const [px,expected]of [[-10,min],[0,min],[100,max],[110,max]]){f.U.activate(b,px);assert.ok(Math.abs(got-expected)<Math.max(1e-20,Math.abs(expected)*1e-11),String(got)+' != '+expected);}f.U.activate(b,50);assert.ok(got>=min&&got<=max);assert.ok(Math.abs((got-min)/step-Math.round((got-min)/step))<1e-7);}
});
test('curriculum UI: fonti e materiale originale, niente richiesta di rete automatica',()=>{
 const f=fixture(1280,900);f.E.view='sources';f.click('course-source-open');assert.match(f.api.external,/^https:\/\//);f.click('course-original');assert.equal(f.api.pdf,f.E.definition.originalSource.pdfPages[0]);f.E.sourceIndex=f.E.definition.sources.length;f.click('course-source-open');assert.equal(f.state.scene,'pilot');f.state.unit='physics-01';f.state.scene='mission';f.E.select('physics-01');f.E.view='sources';f.click('course-original');assert.match(f.api.downloaded.name,/_testo\.txt$/);
});
test('curriculum UI: passaggio di unità rilascia le mesh, non cento scene residenti',()=>{
 const f=fixture(1280,900);for(const d of bundle.courses){f.state.unit=d.id;f.E.select(d.id);f.draw(true);assert.ok(f.R.meshes.size>0&&f.R.meshes.size<=8);f.E.scene.dispose();assert.equal(f.R.meshes.size,0);}
});
test('curriculum: percorsi con riferimenti mancanti rifiutati',()=>{const b=structuredClone(bundle);b.paths[0].units[0]='nonsense';assert.throws(()=>validateBundle(b));});
