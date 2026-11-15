import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {DOMAIN,SIGNAL_DEFAULTS,REFERENCE_SIGNAL,OBSERVATIONS,validParameters,signalValue,signalTrend,signalError,signalRange,parameterKey,sampleSignal} from '../src/models/signal.js';
import {freshMission,cleanMission,cleanMissionRecords,validateMission,changeParameters,predict,captureExperiment,experimentReport,answerQuestion,progress,completeMission,LEVELS} from '../src/education/mission-engine.js';
import {tubePath,mergeMeshes} from '../src/education/geometry.js';
import {fresh,cleanState,openStore} from '../src/store.js';
import {resolveRoute} from '../src/routing.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const definition=JSON.parse(readFileSync(root+'content/missions/echo08-signal.json','utf8'));
const catalogue=JSON.parse(readFileSync(root+'content/catalogue.json','utf8'));
const date='2026-11-15T12:00:00Z';
const populated=()=>{
 const r=freshMission();predict(r,'increases');captureExperiment(r,'A',date);
 changeParameters(r,REFERENCE_SIGNAL);predict(r,'decreases');captureExperiment(r,'B',date);
 for(const q of definition.questions)answerQuestion(definition,r,q.id,q.correct);
 r.acknowledgedLimits=true;return r;
};
test('mission content: six stages, three levels, four original questions',()=>{
 assert.equal(validateMission(definition),definition);assert.equal(definition.steps.length,6);assert.equal(definition.questions.length,4);
 for(const s of definition.steps)for(const level of LEVELS)assert.equal(s.text[level].length,3);
});
test('mission references and prerequisites exist',()=>{
 for(const ref of definition.references)assert.ok(existsSync(root+ref.path),ref.path);
 for(const id of definition.prerequisites)assert.ok(catalogue.modules.some(m=>m.id===id));
 assert.deepEqual(definition.experiment.reference,REFERENCE_SIGNAL);assert.deepEqual(definition.experiment.domain,DOMAIN);
});
test('reject incomplete content, duplicate options and duplicate question ids',()=>{
 const d=structuredClone(definition);delete d.steps[0].text.base;assert.throws(()=>validateMission(d));
 const b=structuredClone(definition);b.questions[0].options[1].id='A';assert.throws(()=>validateMission(b));
 const c=structuredClone(definition);c.questions[1].id=c.questions[0].id;assert.throws(()=>validateMission(c));
});
test('synthetic data match the documented reference',()=>{
 assert.deepEqual(OBSERVATIONS.map(p=>p.value),[7.25,3.25,1.25,1.25,3.25,7.25]);assert.equal(signalValue(REFERENCE_SIGNAL,5),1);
});
test('linear and quadratic values and trends',()=>{
 assert.equal(signalValue(SIGNAL_DEFAULTS,2),3);assert.equal(signalValue(SIGNAL_DEFAULTS,4),5);
 assert.equal(signalTrend(SIGNAL_DEFAULTS),'increases');assert.equal(signalTrend(REFERENCE_SIGNAL),'decreases');
 assert.equal(signalTrend({...REFERENCE_SIGNAL,a:0}),'constant');
});
test('RMSE exact reference and mismatch',()=>{assert.equal(signalError(REFERENCE_SIGNAL),0);assert.ok(signalError(SIGNAL_DEFAULTS)>0);});
test('true interval range includes the unsampled vertex',()=>{
 assert.deepEqual(signalRange(REFERENCE_SIGNAL),[1,7.25]);assert.deepEqual(signalRange(SIGNAL_DEFAULTS),[1,11]);
 assert.deepEqual(signalRange({...REFERENCE_SIGNAL,a:0}),[1,1]);
});
test('bounds, finite parameters and finite time are enforced',()=>{
 for(const patch of [{a:NaN},{b:Infinity},{h:-1},{model:'unknown'},{a:3},{b:'1'}])assert.equal(validParameters({...SIGNAL_DEFAULTS,...patch}),false);
 for(const t of [-1,11,NaN,Infinity,'2'])assert.throws(()=>signalValue(SIGNAL_DEFAULTS,t));
});
test('graphic sampling includes endpoints and rejects unreasonable counts',()=>{
 const s=sampleSignal(REFERENCE_SIGNAL);assert.equal(s.length,81);assert.equal(s[0].t,0);assert.equal(s.at(-1).t,10);
 for(const n of [0,1,1.5,1002,NaN])assert.throws(()=>sampleSignal(SIGNAL_DEFAULTS,n));
});
test('equivalent laws are not treated as different experiments',()=>{
 assert.equal(parameterKey({...SIGNAL_DEFAULTS,h:0}),parameterKey({...SIGNAL_DEFAULTS,h:10}));
 assert.equal(parameterKey({...SIGNAL_DEFAULTS,a:0}),parameterKey({...REFERENCE_SIGNAL,a:0}));
});
test('reading a stage does not imply completion',()=>{
 const r=freshMission();r.stage=5;assert.equal(progress(definition,r).completed,false);assert.equal(progress(definition,r).eligible,false);
});
test('prediction is required before registration',()=>{
 const r=freshMission();assert.throws(()=>captureExperiment(r,'A',date));predict(r,'increases');assert.doesNotThrow(()=>captureExperiment(r,'A',date));
});
test('changing parameters invalidates the current prediction, not snapshots',()=>{
 const r=freshMission();predict(r,'increases');captureExperiment(r,'A',date);const a=structuredClone(r.snapshots.A);
 changeParameters(r,REFERENCE_SIGNAL);assert.equal(r.prediction,null);assert.deepEqual(r.snapshots.A,a);
});
test('changing an irrelevant coefficient preserves the prediction',()=>{
 const r=freshMission();predict(r,'increases');changeParameters(r,{h:9});assert.equal(r.prediction.choice,'increases');
});
test('registered experiments have immutable values when current parameters change',()=>{
 const r=populated(),a=experimentReport(r.snapshots.A),b=experimentReport(r.snapshots.B);changeParameters(r,{a:2,b:4});
 assert.deepEqual(experimentReport(r.snapshots.A),a);assert.deepEqual(experimentReport(r.snapshots.B),b);
});
test('wrong predictions are recorded honestly and do not block investigation',()=>{
 const r=freshMission();predict(r,'decreases');const a=captureExperiment(r,'A',date);
 assert.equal(a.predictionCorrect,false);assert.equal(a.observedTrend,'increases');assert.equal(a.at2,3);assert.equal(a.at4,5);
});
test('two identical scenarios are insufficient evidence of a comparison',()=>{
 const r=freshMission();predict(r,'increases');captureExperiment(r,'A',date);captureExperiment(r,'B',date);
 assert.equal(progress(definition,r).experiment,false);
});
test('registration rejects invalid slot and time',()=>{
 const r=freshMission();predict(r,'increases');assert.throws(()=>captureExperiment(r,'C',date));assert.throws(()=>captureExperiment(r,'A','invalid'));
});
test('feedback is specific to the selected option',()=>{
 const r=freshMission();const q=definition.questions[0];const wrong=q.options.find(o=>o.id!==q.correct);
 const f=answerQuestion(definition,r,q.id,wrong.id);assert.equal(f.correct,false);assert.equal(f.feedback,wrong.feedback);
 assert.throws(()=>answerQuestion(definition,r,'unknown','A'));assert.throws(()=>answerQuestion(definition,r,q.id,'Z'));
});
test('score distinguishes wrong and unanswered',()=>{
 const r=freshMission();answerQuestion(definition,r,'domain','A');const s=progress(definition,r);
 assert.equal(s.wrong,1);assert.equal(s.unanswered,3);assert.equal(s.correct,0);
});
test('completion needs evidence, current correct answers, reflection and limits',()=>{
 const r=populated();assert.throws(()=>completeMission(definition,r,''));assert.equal(progress(definition,r,'Nota personale.').eligible,true);
 r.acknowledgedLimits=false;assert.throws(()=>completeMission(definition,r,'Nota personale.'));r.acknowledgedLimits=true;
 completeMission(definition,r,'Nota personale.',date);assert.equal(progress(definition,r,'Nota personale.').completed,true);
});
test('new answer or changed experiment invalidates prior completion',()=>{
 const r=populated();completeMission(definition,r,'Nota',date);answerQuestion(definition,r,'domain','A');
 assert.equal(r.completedAt,null);assert.equal(progress(definition,r,'Nota').completed,false);
});
test('imported completion flags do not bypass evidence',()=>{
 const r=cleanMission({...freshMission(),completedAt:date,complete:true,score:100});
 assert.equal(progress(definition,r,'Test').completed,false);assert.equal('score' in r,false);
});
test('mission state round-trips through the existing diary',()=>{
 const s=fresh();s.notes.general='Conservare';s.notes['mission:echo08-signal']='Osservazione';s.missions['echo08-signal']=populated();
 s.quiz['08.01']={answer:'B',checked:true};s.read=['math-c08-s01'];
 const r=cleanState(JSON.parse(JSON.stringify(s)));assert.deepEqual(r.missions,s.missions);assert.deepEqual(r.quiz,s.quiz);assert.deepEqual(r.notes,s.notes);assert.deepEqual(r.read,s.read);
});
test('old diaries without mission data migrate without loss',()=>{
 const s=fresh();delete s.missions;s.notes.general='Registro precedente';const r=cleanState(s);assert.deepEqual(r.missions,{});assert.equal(r.notes.general,s.notes.general);
});
test('untrusted imported keys cannot pollute prototypes',()=>{
 const value=JSON.parse('{"__proto__":{"version":1},"constructor":{"version":1},"echo08-signal":{"version":1,"answers":{"__proto__":"A","constructor":"B"}}}');
 const out=cleanMissionRecords(value);assert.deepEqual(Object.keys(out),['echo08-signal']);assert.deepEqual(out['echo08-signal'].answers,{});assert.equal({}.polluted,undefined);
});
test('import bounds and malformed snapshots are sanitized',()=>{
 const r=cleanMission({version:1,stage:999,level:'injected',parameters:{model:'quadratic',a:Infinity,b:1,h:5},snapshots:{A:{parameters:REFERENCE_SIGNAL,prediction:'bad',capturedAt:date}}});
 assert.equal(r.stage,5);assert.equal(r.level,'base');assert.deepEqual(r.parameters,SIGNAL_DEFAULTS);assert.equal(r.snapshots.A,null);
});
test('storage unavailable preserves session state and reports failure',()=>{
 const storage={getItem(){throw Error('denied')},setItem(){throw Error('denied')}};
 const s=openStore(storage);s.data.missions['echo08-signal']=populated();assert.equal(s.save(),false);assert.equal(s.persistent,false);assert.ok(JSON.parse(s.export()).missions['echo08-signal']);
});
test('mission deep link selects ECHO08 and preserves existing routes',()=>{
 const route=resolveRoute('#/pilot?unit=biology-01',catalogue.modules,['math-c08']);assert.equal(route.scene,'pilot');assert.equal(route.selected,7);
 assert.equal(resolveRoute('#/lab?model=daisyworld',catalogue.modules,['math-c08']).scene,'lab');
 assert.equal(resolveRoute('#/unknown',catalogue.modules,['math-c08']).scene,'galaxy');
});
test('tube geometry is finite, indexed and has normalized normals',()=>{
 const m=tubePath([[0,0,0],[1,1,0],[2,0,0]],.03,8);assert.equal(m.v.length/12,24);assert.equal(m.i.length,96);
 assert.ok([...m.v].every(Number.isFinite));assert.ok([...m.i].every(i=>i<m.v.length/12));
 for(let i=0;i<m.v.length;i+=12)assert.ok(Math.abs(Math.hypot(...m.v.slice(i+3,i+6))-1)<1e-6);
});
test('geometry rejects invalid data and merges index offsets',()=>{
 assert.throws(()=>tubePath([[0,0,0]],.1));assert.throws(()=>tubePath([[0,0,0],[NaN,1,2]],.1));
 const a=tubePath([[0,0,0],[1,0,0]]),b=mergeMeshes([a,a]);assert.equal(b.v.length,a.v.length*2);assert.equal(b.i.length,a.i.length*2);
 assert.ok([...b.i].every(i=>i<b.v.length/12));
});
test('mission content introduces no raster assets or remote runtime resources',()=>{
 const json=JSON.stringify(definition);assert.doesNotMatch(json,/<img|data:image|https?:\/\//i);
 const source=['mission-ui.js','signal-scene.js','geometry.js','mission-engine.js'].map(p=>readFileSync(root+'src/education/'+p,'utf8')).join('\n');
 assert.doesNotMatch(source,/getContext\(['"]2d|new Image\(|<img|\.png|\.webp|\.jpe?g/);
});
