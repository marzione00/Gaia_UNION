import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {VSEPR_CHALLENGES,VSEPR_SHAPES,vseprInfo,vseprValid,vseprPositions,shapeOptions,checkVsepr,punnett,sow,chiSquare,testcross,judgeMystery,EVIDENCE_SEEDS,STATEMENTS,testValue,checkStatement,freshActivity,cleanActivity,recordSolved,activityProgress} from '../src/education/activities.js';
import {freshCourse,cleanCourseRecords,answerCourse,courseProgress,completeCourse} from '../src/education/course-engine.js';
const bundle=JSON.parse(fs.readFileSync(new URL('../content/curriculum/bundle.json',import.meta.url),'utf8'));
const seq=values=>{let i=0;return ()=>values[i++%values.length];};
test('VSEPR: tredici combinazioni, sfide risolvibili e posizioni unitarie',()=>{
 assert.equal(Object.keys(VSEPR_SHAPES).length,13);assert.equal(vseprValid(3,3),false);assert.equal(vseprValid(2,4),false);assert.equal(vseprInfo(3,1).shape,'piramidale trigonale');assert.equal(vseprInfo(2,2).notation,'AX₂E₂');
 for(const c of VSEPR_CHALLENGES){const i=vseprInfo(c.x,c.e),o=shapeOptions(c);assert.equal(o.length,4);assert.equal(new Set(o).size,4);assert.ok(o.includes(i.shape));assert.ok(checkVsepr(c,c.x,c.e,i.shape).ok,c.id);}
 for(const k of Object.keys(VSEPR_SHAPES)){const [x,e]=k.split(',').map(Number),p=vseprPositions(x,e);assert.equal(p.atoms.length,x);assert.equal(p.lonePairs.length,e);for(const v of [...p.atoms,...p.lonePairs])assert.ok(Math.abs(Math.hypot(...v)-1)<1e-6);}
 assert.ok(vseprPositions(4,1).lonePairs.every(v=>Math.abs(v[1])<1e-9),'coppia solitaria equatoriale in SF₄');
 const opposite=vseprPositions(4,2).lonePairs;assert.ok(Math.abs(opposite[0][1]+opposite[1][1])<1e-9,'coppie opposte in XeF₄');
});
test('VSEPR: il feedback distingue gli errori tipici',()=>{
 const co2=VSEPR_CHALLENGES.find(c=>c.id==='co2'),nh3=VSEPR_CHALLENGES.find(c=>c.id==='nh3');
 assert.match(checkVsepr(co2,4,0,'tetraedrica').message,/legame multiplo/);
 assert.match(checkVsepr(nh3,3,1,'tetraedrica').message,/disposizione di tutti i domini/);
 assert.match(checkVsepr(nh3,3,0,'trigonale planare').message,/coppie solitarie/);
 assert.match(checkVsepr(nh3,2,1,'angolata').message,/Conta gli atomi legati/);
});
test('Mendel: quadrato di Punnett, semine e chi quadro',()=>{
 const t=punnett('Aa','Aa');assert.deepEqual(t.genotype,{AA:.25,Aa:.5,aa:.25});assert.equal(t.phenotype.bianco,.25);
 assert.deepEqual(punnett('AA','aa').genotype,{AA:0,Aa:1,aa:0});assert.equal(punnett('Aa','aa').phenotype.viola,.5);
 const s=sow('Aa','Aa',100,seq([.1,.9,.6,.3]));assert.equal(s.counts.AA+s.counts.Aa+s.counts.aa,100);assert.equal(s.viola+s.bianco,100);
 assert.equal(chiSquare({viola:75,bianco:25},{viola:75,bianco:25}),0);assert.ok(Math.abs(chiSquare({viola:70,bianco:30},{viola:75,bianco:25})-4/3)<1e-12);assert.equal(chiSquare({viola:10,bianco:0},{viola:10,bianco:0}),null);
 assert.throws(()=>sow('Aa','Aa',0));assert.throws(()=>sow('AB','Aa',10));
});
test('Mendel: il reincrocio decide solo con prove sufficienti',()=>{
 const aa={hidden:'Aa',viola:3,bianco:1};assert.ok(judgeMystery(aa,'Aa').ok);assert.equal(judgeMystery(aa,'AA').ok,false);
 const few={hidden:'AA',viola:EVIDENCE_SEEDS-1,bianco:0};assert.equal(judgeMystery(few,'AA').ok,false);assert.match(judgeMystery(few,'AA').message,/almeno/);
 const many={hidden:'AA',viola:EVIDENCE_SEEDS,bianco:0};assert.ok(judgeMystery(many,'AA').ok);assert.equal(judgeMystery(many,'Aa').ok,false);
 const unlucky={hidden:'Aa',viola:EVIDENCE_SEEDS,bianco:0};assert.equal(judgeMystery(unlucky,'AA').ok,false);
 const m={hidden:'AA',viola:0,bianco:0};testcross(m,10,()=>.3);assert.deepEqual([m.viola,m.bianco],[10,0]);
});
test('Quantificatori: valori di prova coerenti con la verità di ogni proposizione',()=>{
 assert.equal(STATEMENTS.length,8);
 for(const s of STATEMENTS){const holds=s.values.map(v=>testValue(s,v).holds);
  if(s.kind==='all'&&s.truth)assert.ok(holds.every(Boolean),s.id);if(s.kind==='all'&&!s.truth)assert.ok(holds.some(h=>!h),s.id);
  if(s.kind==='exists'&&s.truth)assert.ok(holds.some(Boolean),s.id);if(s.kind==='exists'&&!s.truth)assert.ok(!holds.some(Boolean),s.id);
  assert.equal(checkStatement(s,s.truth?'falsa':'vera').ok,false);}
 const gt=STATEMENTS.find(s=>s.id==='sq-gt');assert.equal(checkStatement(gt,'falsa',null).ok,false);assert.equal(checkStatement(gt,'falsa',2).ok,false);assert.ok(checkStatement(gt,'falsa',1).ok);assert.ok(checkStatement(gt,'falsa',0).ok);
 assert.ok(checkStatement(STATEMENTS.find(s=>s.id==='euler'),'falsa',40).ok);assert.ok(checkStatement(STATEMENTS.find(s=>s.id==='odd-even'),'falsa').ok);
});
test('Attività: stato importato ripulito e completamento legato ai risultati',()=>{
 assert.deepEqual(cleanActivity({kind:'vsepr',solved:['co2','co2','hack','h2o'],attempts:-4},'vsepr'),{kind:'vsepr',solved:['co2','h2o'],attempts:0});
 assert.deepEqual(cleanActivity({kind:'logic',solved:['co2']},'vsepr').solved,[]);assert.deepEqual(cleanActivity({kind:'punnett',solved:['mistero-1','x']},'punnett').solved,['mistero-1']);
 const d=bundle.courses.find(x=>x.id==='chemistry-08'),r=freshCourse(d.id),note='Ho contato i domini di quattro molecole e confrontato forma e polarità con il modello.';
 for(const q of d.questions)answerCourse(d,r,q.id,q.correct);r.acknowledgedLimits=true;r.activity=freshActivity('vsepr');
 assert.equal(courseProgress(d,r,note).eligible,false);for(const id of ['co2','h2o','nh3'])recordSolved(r.activity,id);assert.equal(activityProgress('vsepr',r.activity).done,false);
 recordSolved(r.activity,'ch4');assert.ok(courseProgress(d,r,note).eligible);assert.equal(courseProgress(d,r,note).firstTry,6);completeCourse(d,r,note);assert.ok(courseProgress(d,r,note).completed);
 r.activity.solved.pop();assert.equal(courseProgress(d,r,note).completed,false);
 const restored=cleanCourseRecords(JSON.parse(JSON.stringify({[d.id]:{...r,answers:{...r.answers,'chemistry-08-q9':'E','altro-q1':'A'}}})))[d.id];
 assert.deepEqual(Object.keys(restored.answers).sort(),d.questions.map(q=>q.id).sort());assert.deepEqual(restored.activity.solved,r.activity.solved);
});
