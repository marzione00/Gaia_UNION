/** Offline geometry/UI capture: not a browser end-to-end test. */
import fs from 'node:fs';import vm from 'node:vm';
import {resolve} from 'node:path';import {fileURLToPath} from 'node:url';
import {GPU,color,transform} from '../src/renderer.js';
import {vsMesh,fsMesh} from '../src/scene/shaders.js';
import {UI,C} from '../src/ui/toolkit.js';
import {MissionUI} from '../src/education/mission-ui.js';
import {fresh} from '../src/store.js';
import {predict,captureExperiment,changeParameters,answerQuestion,completeMission} from '../src/education/mission-engine.js';
import {REFERENCE_SIGNAL} from '../src/models/signal.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=resolve(process.argv[2]||'qa-mission')+'/';fs.mkdirSync(out,{recursive:true});
const definition=JSON.parse(fs.readFileSync(root+'content/missions/echo08-signal.json','utf8'));
const rendererSource=fs.readFileSync(root+'src/renderer.js','utf8'),app=fs.readFileSync(root+'src/app.js','utf8');
const shaders={vsMesh,fsMesh,vsUI:rendererSource.match(/const vsUI = `([\s\S]*?)`;/)[1],fsUI:rendererSource.match(/const fsUI = `([\s\S]*?)`;/)[1]};
fs.writeFileSync(out+'render-shaders.json',JSON.stringify(shaders));
const nav=[['galaxy','ATLANTE'],['surface','SUPERFICIE'],['research','RICERCA'],['catalogue','CATALOGO'],['theory','TEORIA'],['mission','MISSIONI'],['lab','LABORATORI'],['quiz','VERIFICA'],['journal','DIARIO']];
const configs=[
 {name:'desktop-discovery',w:1600,h:1000,stage:0},
 {name:'desktop-experiment',w:1600,h:1000,stage:2,experiments:true},
 {name:'mobile-lesson',w:390,h:844,stage:1},
 {name:'mobile-lab',w:390,h:844,stage:2,view:'lab',experiments:true},
 {name:'mobile-quiz',w:390,h:844,stage:4,experiments:true},
 {name:'mobile-complete',w:390,h:844,stage:5,experiments:true,complete:true},
 {name:'compact-lab',w:1280,h:720,stage:2,experiments:true}
];
let failures=[];
for(const cfg of configs){
 const R=Object.create(GPU.prototype);R.w=cfg.w;R.h=cfg.h;R.sceneWidth=cfg.w;R.sceneHeight=cfg.h;R.uiData=[];R.metrics=JSON.parse(fs.readFileSync(root+'assets/glyphs.json','utf8'));R.meshes=new Map();R.frameStats={stars:0};R.viewport=[0,0,cfg.w,cfg.h];R.calls=[];R.texts=[];
 R.gl={SCISSOR_TEST:3089,DEPTH_BUFFER_BIT:256,DEPTH_TEST:2929,viewport:(...args)=>R.viewport=args,enable:()=>{},disable:()=>{},scissor:()=>{},clear:()=>{},depthMask:()=>{}};
 R.makeMesh=(id,data)=>R.meshes.set(id,{...data,count:data.i.length});R.deleteMesh=id=>R.meshes.delete(id);
 R.drawMesh=(id,vp,model,options)=>R.calls.push({id,vp:[...vp],model:[...model],options,viewport:[...R.viewport]});
 R.text=(text,x,y,style='body',c=C.pale,options={})=>{R.texts.push({text,x,y,style,width:R.textWidth(text,style)});GPU.prototype.text.call(R,text,x,y,style,c,options);};
 const U=new UI(R),S={scene:'mission',yaw:0,pitch:.45,menu:false,settings:false},store={data:fresh(),persistent:true,save(){return true}};
 const E=new MissionUI(R,store,definition,{state:S,route(){},openTheory(){},download(){},say(){}});E.record.stage=cfg.stage;E.view=cfg.view||'lesson';
 if(cfg.experiments){predict(E.record,'increases');captureExperiment(E.record,'A');changeParameters(E.record,REFERENCE_SIGNAL);predict(E.record,'decreases');captureExperiment(E.record,'B');}
 if(cfg.complete){for(const q of definition.questions)answerQuestion(definition,E.record,q.id,q.correct);E.record.acknowledgedLimits=true;store.data.notes[E.noteKey]='Ho confrontato due leggi sui campioni sintetici: la parabola coincide con i dati, ma non dimostra una legge naturale.';completeMission(definition,E.record,E.reflection);}
 E.draw3D(S);
 const commonText=app.slice(app.indexOf('function common() {'),app.indexOf('function galaxyUI() {'));
 vm.runInNewContext('('+commonText+')',{R,U,S,nav,C,color})();// Actual unchanged common UI function.
 E.drawUI(U,S);
 const buttons=U.buttons.map(({id,label,x,y,w,h,disabled})=>({id,label,x,y,w,h,disabled}));
 for(const b of buttons)if(b.x<0||b.y<0||b.x+b.w>cfg.w+.1||b.y+b.h>cfg.h-35)failures.push(cfg.name+': out of bounds '+b.id);
 for(let i=0;i<buttons.length;i++)for(let j=i+1;j<buttons.length;j++){
  const a=buttons[i],b=buttons[j];if(a.x<b.x+b.w-.1&&a.x+a.w>b.x+.1&&a.y<b.y+b.h-.1&&a.y+a.h>b.y+.1)failures.push(cfg.name+': overlap '+a.id+' / '+b.id);
 }
 const meshes=Object.fromEntries([...R.meshes].map(([id,m])=>[id,{v:[...m.v],i:[...m.i]}]));
 fs.writeFileSync(out+cfg.name+'.frame.json',JSON.stringify({name:cfg.name,w:cfg.w,h:cfg.h,meshes,calls:R.calls,ui:R.uiData,buttons,texts:R.texts,stats:R.frameStats}));
 console.log(cfg.name,R.calls.length,'draw calls;',R.frameStats.missionTriangles||0,'triangles;',buttons.length,'controls');
}
console.log('Layout failures',failures);fs.writeFileSync(out+'layout-check.json',JSON.stringify({fixtures:configs.length,failures},null,2));
if(failures.length)process.exitCode=1;
