/** Actual module draw-call capture for original-shader EGL replay, not a browser test. */
import fs from 'node:fs';import vm from 'node:vm';import {resolve} from 'node:path';
import {fixture,bundle,root} from './course-fixture.mjs';
import {color} from '../src/renderer.js';import {C} from '../src/ui/toolkit.js';
import {vsMesh,fsMesh} from '../src/scene/shaders.js';
import {descriptor,trend} from '../src/models/curriculum.js';import {predictCourse,captureCourse,changeCourseParameters,answerCourse,completeCourse} from '../src/education/course-engine.js';
const out=resolve(process.argv[2]||root+'qa-all/render')+'/';fs.mkdirSync(out,{recursive:true});
const rs=fs.readFileSync(root+'src/renderer.js','utf8'),app=fs.readFileSync(root+'src/app.js','utf8');
fs.writeFileSync(out+'render-shaders.json',JSON.stringify({vsMesh,fsMesh,vsUI:rs.match(/const vsUI = `([\s\S]*?)`;/)[1],fsUI:rs.match(/const fsUI = `([\s\S]*?)`;/)[1]}));
const commonText=app.slice(app.indexOf('function common() {'),app.indexOf('function galaxyUI() {'));
const nav=[['galaxy','ATLANTE'],['surface','SUPERFICIE'],['research','RICERCA'],['catalogue','CATALOGO'],['theory','TEORIA'],['mission','MISSIONI'],['lab','LABORATORI'],['quiz','VERIFICA'],['journal','DIARIO']];
const configs=[...bundle.courses.map(d=>({name:d.id,w:1280,h:900,id:d.id,stage:1})),
 {name:'desktop-molecule-3d',id:'chemistry-08',w:1600,h:1000,mode:'schema',time:104.5},
 {name:'desktop-dna-3d',id:'biology-10',w:1600,h:1000,mode:'schema'},
 {name:'desktop-populations-3d',id:'biology-19',w:1600,h:1000,mode:'schema',time:20},
 {name:'desktop-vector-3d',id:'physics-02',w:1600,h:1000,mode:'schema'},
 {name:'mobile-graph',id:'physics-05',w:390,h:844,view:'lab',time:10},
 {name:'mobile-controls',id:'biology-02',w:390,h:844,view:'controls'},
 {name:'mobile-quiz',id:'chemistry-23',w:390,h:844,stage:4},
 {name:'compact-quiz',id:'physics-18',w:320,h:568,stage:4,question:1},
 {name:'compact-quiz-expanded',id:'physics-18',w:320,h:568,stage:4,question:1,focus:true},
 {name:'compact-controls',id:'biology-02',w:320,h:568,view:'controls'},
 {name:'compact-sources',id:'math-p12',w:320,h:568,view:'sources'},
 {name:'mobile-complete',id:'physics-08',w:390,h:844,view:'controls',tab:2,complete:true},
 {name:'desktop-comparison',id:'math-c06',w:1600,h:1000,compare:true,tab:1}
];
const reports=[];
for(const cfg of configs){
 const f=fixture(cfg.w,cfg.h,{capture:true,id:cfg.id}),{R,U,E,state}=f;E.record.stage=cfg.stage??2;E.question=cfg.question??0;E.view=cfg.view||'lesson';E.controlTab=cfg.tab||0;E.mode=cfg.mode||'graph';E.focusReading=cfg.focus||false;E.time=cfg.time??E.time;if(cfg.mode==='schema'){state.yaw=.6;state.pitch=.65;}
 if(cfg.compare||cfg.complete){predictCourse(E.id,E.record,trend(E.id,E.record.parameters));captureCourse(E.id,E.record,'A');const c=descriptor(E.id).controls[0],newValue=c.value===c.min?c.max:c.min;changeCourseParameters(E.id,E.record,{[c.key]:newValue});predictCourse(E.id,E.record,trend(E.id,E.record.parameters));captureCourse(E.id,E.record,'B');}
 if(cfg.complete){for(const q of E.definition.questions)answerCourse(E.definition,E.record,q.id,q.correct);E.record.acknowledgedLimits=true;f.store.data.notes[E.noteKey]='Ho previsto l’aumento di energia con la velocità. Ho confrontato masse diverse mantenendo le altre condizioni; il modello trascura relatività e deformazioni.';completeCourse(E.definition,E.record,E.reflection);}
 E.draw3D(state);vm.runInNewContext('('+commonText+')',{R,U,S:state,nav,C,color})();E.drawUI(U,state);
 const buttons=U.buttons.map(({id,label,x,y,w,h,disabled})=>({id,label,x,y,w,h,disabled}));
 const meshes=Object.fromEntries([...R.meshes].map(([id,m])=>[id,{v:[...m.v],i:[...m.i]}]));
 fs.writeFileSync(out+cfg.name+'.frame.json',JSON.stringify({name:cfg.name,w:cfg.w,h:cfg.h,meshes,calls:R.calls,ui:R.uiData,buttons,texts:R.texts,stats:R.frameStats}));
 const report={name:cfg.name,model:cfg.id,width:cfg.w,height:cfg.h,drawCalls:R.calls.length,triangles:R.frameStats.courseTriangles||0,controls:buttons.length};reports.push(report);console.log(cfg.name,report.triangles,'triangoli');
}
fs.writeFileSync(out+'capture-report.json',JSON.stringify({method:'Runtime meshes/UI captured with adapter; EGL replay required, not browser',frames:reports},null,2));
