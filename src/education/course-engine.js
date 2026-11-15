/** Guided curriculum state: all results are recomputed from declared models.
 * Importing a diary cannot inject executable content or claim arbitrary model outputs. */
import {MODEL_IDS,defaults,parameters,parameterKey,value,probePoints,trend} from '../models/curriculum.js';
import {ACTIVITY_KINDS,cleanActivity,activityProgress,validateCards} from './activities.js';
export const LEVELS=Object.freeze(['base','intermediate','advanced']);
export const PREDICTIONS=Object.freeze(['increases','decreases','constant','undefined']);
const ids=new Set(MODEL_IDS),plain=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const int=(x,a,b,f=a)=>Number.isInteger(x)?Math.max(a,Math.min(b,x)):f;
const date=x=>typeof x==='string'&&x.length<=40&&Number.isFinite(Date.parse(x))?x:null;
export function freshCourse(id){if(!ids.has(id))throw Error('Unità sconosciuta');return {version:1,stage:0,level:'base',parameters:defaults(id),prediction:null,snapshots:{A:null,B:null},answers:{},attempts:{},activity:null,acknowledgedLimits:false,completedAt:null,completionSignature:null};}
export function cleanCourseRecords(records){
 const result={};if(!plain(records))return result;
 for(const [id,v] of Object.entries(records).slice(0,200)){
  if(!ids.has(id)||!plain(v))continue;
  const r=freshCourse(id);r.stage=int(v.stage,0,5);if(LEVELS.includes(v.level))r.level=v.level;
  try{r.parameters=parameters(id,v.parameters);}catch{/* preserve the rest with defaults */}
  if(plain(v.prediction)&&PREDICTIONS.includes(v.prediction.choice)&&v.prediction.key===parameterKey(id,r.parameters))r.prediction={choice:v.prediction.choice,key:v.prediction.key};
  for(const slot of ['A','B'])if(plain(v.snapshots?.[slot])){
   const s=v.snapshots[slot];try{const p=parameters(id,s.parameters);if(PREDICTIONS.includes(s.prediction))r.snapshots[slot]={parameters:p,prediction:s.prediction,recordedAt:date(s.recordedAt)};}catch{/* drop invalid snapshot */}
  }
  const key=k=>typeof k==='string'&&k.startsWith(id+'-')&&/^[a-z0-9-]{3,60}$/.test(k);
  if(plain(v.answers))for(const [k,a] of Object.entries(v.answers).slice(0,12))if(key(k)&&['A','B','C','D'].includes(a))r.answers[k]=a;
  if(plain(v.attempts))for(const [k,n] of Object.entries(v.attempts).slice(0,12))if(key(k)&&Number.isInteger(n))r.attempts[k]=int(n,0,9999);
  if(plain(v.activity)&&ACTIVITY_KINDS.includes(v.activity.kind))r.activity=cleanActivity(v.activity,v.activity.kind);
  r.acknowledgedLimits=v.acknowledgedLimits===true;r.completedAt=date(v.completedAt);
  r.completionSignature=typeof v.completionSignature==='string'&&/^[a-f0-9]{8}$/.test(v.completionSignature)?v.completionSignature:null;
  result[id]=r;
 }
 return result;
}
export function validateBundle(bundle){
 if(!plain(bundle)||bundle.schemaVersion!==1||!Array.isArray(bundle.courses)||bundle.courses.length!==100||!Array.isArray(bundle.sources))throw Error('Registro dei percorsi non valido');
 const found=new Set(),sourceIds=new Set(bundle.sources.map(s=>s.id));
 for(const d of bundle.courses){
  const activity=d.activity!==undefined&&d.activity!==null;if(activity&&(!plain(d.activity)||!ACTIVITY_KINDS.includes(d.activity.kind)))throw Error('Attività non valida: '+d.id);
  if(activity&&d.activity.kind==='cards')validateCards(d.activity);
  // Generated units carry 4 questions with 3 options; hand-written units up to 8 questions with 3 or 4 options.
  const qn=d.questions?.length,on=[3,4];
  if(!ids.has(d.id)||found.has(d.id)||d.modelId!==d.id||typeof d.title!=='string'||d.title.length>150||d.steps?.length!==6||!(qn>=4&&qn<=8))throw Error('Percorso non valido: '+d.id);
  found.add(d.id);
  for(const s of d.steps)for(const l of LEVELS)if(!Array.isArray(s.text?.[l])||s.text[l].some(t=>typeof t!=='string'||!t.trim()))throw Error('Spiegazioni mancanti: '+d.id);
  const qs=new Set();for(const q of d.questions){const n=q.options?.length;if(qs.has(q.id)||!q.id.startsWith(d.id+'-')||!on.includes(n)||new Set(q.options.map(o=>o.id)).size!==n||q.options.some((o,i)=>o.id!=='ABCD'[i])||!q.options.some(o=>o.id===q.correct)||q.options.some(o=>typeof o.text!=='string'||typeof o.feedback!=='string'))throw Error('Verifica non valida: '+d.id);qs.add(q.id);}
  if(d.sources.some(id=>!sourceIds.has(id))||d.connections.some(id=>!ids.has(id)))throw Error('Rimandi non validi: '+d.id);
 }
 if(!Array.isArray(bundle.paths)||bundle.paths.length!==7||new Set(bundle.paths.map(p=>p.id)).size!==7||bundle.paths.some(p=>!Array.isArray(p.units)||!p.units.length||new Set(p.units).size!==p.units.length||p.units.some(id=>!ids.has(id))))throw Error('Percorsi di studio non validi');
 for(const s of bundle.sources)if(!/^https:\/\//.test(s.url))throw Error('Fonte non HTTPS');
 return bundle;
}
export function changeCourseParameters(id,r,patch){const p=parameters(id,{...r.parameters,...patch});r.parameters=p;r.prediction=null;r.completedAt=null;r.completionSignature=null;return p;}
export function predictCourse(id,r,choice){if(!PREDICTIONS.includes(choice))throw Error('Previsione non valida');r.prediction={choice,key:parameterKey(id,r.parameters)};}
export function experimentResult(id,snapshot){
 if(!snapshot)return null;
 const p=parameters(id,snapshot.parameters),points=probePoints(id).map(x=>({x,y:value(id,x,p)})),actual=trend(id,p);
 return {parameters:p,points,actual,prediction:snapshot.prediction,predictionCorrect:actual===snapshot.prediction,recordedAt:snapshot.recordedAt};
}
export function captureCourse(id,r,slot){
 if(!['A','B'].includes(slot))throw Error('Scenario non valido');
 if(!r.prediction||r.prediction.key!==parameterKey(id,r.parameters))throw Error('Formula prima una previsione per i parametri correnti.');
 r.snapshots[slot]={parameters:{...r.parameters},prediction:r.prediction.choice,recordedAt:new Date().toISOString()};r.completedAt=null;r.completionSignature=null;
 return experimentResult(id,r.snapshots[slot]);
}
export function answerCourse(d,r,id,choice){const q=d.questions.find(q=>q.id===id);if(!q||!q.options.some(o=>o.id===choice))throw Error('Risposta non valida');r.answers[id]=choice;r.attempts[id]=Math.min(9999,(r.attempts[id]||0)+1);r.completedAt=null;r.completionSignature=null;return choice===q.correct;}
function signature(d,r,note){const s=JSON.stringify(d.activity?[d.version,r.answers,note.trim(),r.acknowledgedLimits,d.activity.kind,r.activity?.solved||[]]:[d.version,r.snapshots,r.answers,note.trim(),r.acknowledgedLimits]);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16).padStart(8,'0');}
export function courseProgress(d,r,note=''){
 const correct=d.questions.filter(q=>r.answers[q.id]===q.correct).length,answered=d.questions.filter(q=>r.answers[q.id]).length;
 const activity=d.activity?activityProgress(d.activity,r.activity):null,firstTry=d.questions.filter(q=>r.answers[q.id]===q.correct&&r.attempts?.[q.id]===1).length;
 const experiments=activity?activity.done:!!r.snapshots.A&&!!r.snapshots.B&&parameterKey(d.id,r.snapshots.A.parameters)!==parameterKey(d.id,r.snapshots.B.parameters);
 const reflectionRecorded=typeof note==='string'&&note.trim().length>=60;
 const eligible=experiments&&correct===d.questions.length&&reflectionRecorded&&r.acknowledgedLimits;
 return {correct,answered,total:d.questions.length,firstTry,experiments,activity,reflectionRecorded,eligible,completed:eligible&&!!r.completedAt&&r.completionSignature===signature(d,r,note)};
}
export function completeCourse(d,r,note){if(!courseProgress(d,r,note).eligible)throw Error(d.activity?'Servono l’attività completata, tutte le risposte corrette, un diario di almeno 60 caratteri e il riconoscimento dei limiti.':'Servono A e B distinti, tutte le risposte corrette, un diario di almeno 60 caratteri e il riconoscimento dei limiti.');r.completedAt=new Date().toISOString();r.completionSignature=signature(d,r,note);return courseProgress(d,r,note);}
