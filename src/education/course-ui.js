import {clamp} from '../renderer.js';
import {scaledText} from '../navigation/text.js';
import {C} from '../ui/toolkit.js';
import {descriptor,defaults,value,samples,probePoints,parameterKey} from '../models/curriculum.js';
import {LEVELS,PREDICTIONS,freshCourse,validateBundle,changeCourseParameters,predictCourse,captureCourse,answerCourse,experimentResult,courseProgress,completeCourse} from './course-engine.js';
import {CourseScene,formatNumber as num,SCHEMATIC_KINDS} from './course-scene.js';
import {ActivityUI} from './activity-ui.js';
import {freshActivity} from './activities.js';
const names={increases:'CRESCE',decreases:'DIMINUISCE',constant:'UGUALE',undefined:'NON DEFINITO'};
const superMap=Object.fromEntries([... '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻'].map((c,i)=>[c,'0123456789+-'[i]]));
/** Existing glyph atlas only: explicit mathematical fallbacks, never missing squares. The atlas has ⁰ to ⁵. */
export function displayText(s){return String(s).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g,t=>/[⁶⁷⁸⁹⁺⁻]/.test(t)?'^('+[...t].map(c=>superMap[c]).join('')+')':t).replace(/[Åâˣσ′ℏ⇌∫]/g,c=>({'Å':'angstrom','â':'a','ˣ':'^x','σ':'sigma','′':"'",'ℏ':'h/(2pi)','⇌':'<->','∫':'integrale '}[c]));}
export function fittedRows(R,paragraphs,width,style='body'){
 const rows=[];for(const para of paragraphs){let line='';for(const word of displayText(para).split(/\s+/)){
  if(R.textWidth(word,style)>width){if(line){rows.push(line);line='';}let chunk='';for(const ch of word){if(chunk&&R.textWidth(chunk+ch,style)>width){rows.push(chunk);chunk='';}chunk+=ch;}line=chunk;continue;}
  const next=line?line+' '+word:word;if(line&&R.textWidth(next,style)>width){rows.push(line);line=word;}else line=next;
 }if(line)rows.push(line);rows.push('');}return rows;
}
export class CourseUI{
 constructor(R,store,bundle,api){this.R=R;this.store=store;this.bundle=validateBundle(bundle);this.byId=new Map(bundle.courses.map(d=>[d.id,d]));this.api=api;this.scene=new CourseScene(R);this.id='math-c08';this.page=0;this.question=0;this.feedback=false;this.view='lesson';this.controlTab=0;this.sourceIndex=0;this.time=descriptor(this.id).fixture[0];this.mode='graph';this.rowCache=new Map();this.focusReading=false;this.pathIndex=0;this.pathPage=0;this.activity=new ActivityUI(R,{say:t=>this.api.say(t),save:()=>this.save()});}
 select(id){if(!this.byId.has(id))throw Error('Percorso non disponibile: '+id);if(this.id===id)return;this.id=id;this.page=0;this.question=0;this.feedback=false;this.view='lesson';this.controlTab=0;this.sourceIndex=0;this.time=descriptor(id).fixture[0];this.mode='graph';this.scene.dispose();this.rowCache.clear();this.focusReading=false;this.activity.reset();}
 get definition(){return this.byId.get(this.id);}
 get record(){this.store.data.courses||={};return this.store.data.courses[this.id]||=freshCourse(this.id);}
 get activityState(){const d=this.definition;if(!d.activity)return null;const r=this.record;if(!r.activity||r.activity.kind!==d.activity.kind)r.activity=freshActivity(d.activity.kind);return r.activity;}
 get noteKey(){return 'course:'+this.id;}
 get reflection(){return this.store.data.notes[this.noteKey]||'';}
 get summary(){return courseProgress(this.definition,this.record,this.reflection);}
 save(){this.store.save();}
 setStage(n){this.focusReading=false;this.record.stage=clamp(n,0,5);this.page=0;this.feedback=false;this.view='lesson';this.save();}
 setLevel(l){if(LEVELS.includes(l)){this.record.level=l;this.page=0;this.save();}}
 setParameters(patch){changeCourseParameters(this.id,this.record,patch);this.save();}
 capture(slot){try{const r=captureCourse(this.id,this.record,slot);this.save();this.api.say(`${slot} registrato. Previsione ${r.predictionCorrect?'confermata':'da rivedere'} nei due punti scelti.`);}catch(e){this.api.say(e.message);}}
 answer(id,choice){answerCourse(this.definition,this.record,id,choice);this.feedback=true;this.page=0;this.save();}
 openJournal(){this.api.route('journal',{journalTab:this.noteKey});this.api.say('Scrivi previsione, parametri, risultati e limiti: almeno 60 caratteri per registrare la riflessione.');}
 goUnit(id){this.api.openCourse(id);}
 exportReport(){const r=this.record,d=this.definition;this.api.download('GAIA_'+this.id+'_rapporto.json',{schemaVersion:1,unitId:this.id,version:d.version,modelId:d.modelId,exportedAt:new Date().toISOString(),formula:descriptor(this.id).formula,parameters:{...r.parameters},...(d.activity?{activity:{kind:d.activity.kind,solved:[...(r.activity?.solved||[])]}}:{experiments:Object.fromEntries(['A','B'].map(s=>[s,experimentResult(this.id,r.snapshots[s])]))}),answers:{...r.answers},attempts:{...r.attempts},reflection:this.reflection,progress:this.summary,scope:d.scope,editorialStatus:d.editorialStatus,narrativeStatus:d.narrativeStatus});}
 exportCSV(){if(this.definition.activity){const a=this.activityState;this.api.download('GAIA_'+this.id+'_attivita.csv',['attività,elemento risolto',...a.solved.map(id=>`${a.kind},${id}`)].join('\n'),'text/csv;charset=utf-8');return;}const m=descriptor(this.id),rows=[`x [${m.xUnit}],y [${m.yUnit}]`,...samples(this.id,this.record.parameters,401).map(p=>`${p.x},${p.y===null?'':p.y}`)];this.api.download('GAIA_'+this.id+'_campioni.csv',rows.join('\n'),'text/csv;charset=utf-8');}
 layout(){const R=this.R,stacked=R.w<1050||R.h<820,pad=R.w<500?14:24,top=stacked?276:250,bottom=R.h-100,body={x:pad,y:top,w:R.w-pad*2,h:Math.max(130,bottom-top)};
  if(stacked)return {stacked,body,left:body,right:body,graph:{x:body.x+5,y:body.y+62,w:body.w-10,h:Math.max(60,body.h-130)},controls:body};
  const left={...body,w:Math.min(540,body.w*.4)},right={x:body.x+left.w+18,y:top,w:body.w-left.w-18,h:body.h};
  const ch=250,graph={x:right.x+5,y:right.y+60,w:right.w-10,h:Math.max(80,right.h-ch-130)},controls={x:right.x,y:right.y+right.h-ch,w:right.w,h:ch};
  return {stacked,body,left,right,graph,controls};
 }
 draw3D(state){if(state.scene!=='mission'||this.focusReading){this.scene.rect=null;return;}this.select(this.api.currentUnit?.()||this.id);if(this.definition.activity){this.scene.rect=null;return;}const l=this.layout();if(!l.stacked||this.view==='lab')this.scene.draw(l.graph,this.id,this.record.parameters,this.record.snapshots.A?.parameters||null,this.time,state,this.mode);else this.scene.rect=null;}
 rows(text,width,style='body'){const key=JSON.stringify([text,width,style]);if(!this.rowCache.has(key)){if(this.rowCache.size>32)this.rowCache.clear();this.rowCache.set(key,fittedRows(this.R,text,width,style));}return this.rowCache.get(key);}
 txt(U,t,x,y,style='body',color=C.pale,options={}){U.text(displayText(t),x,y,style,color,options);}
 short(t,width,style='micro'){t=displayText(t);while(t.length&&this.R.textWidth(t,style)>width)t=t.slice(0,-1);return t;}
 drawUI(U,state){
  this.select(this.api.currentUnit?.()||this.id);const R=this.R,d=this.definition,r=this.record,l=this.layout(),pad=l.body.x;
  U.tag(`${['MAT','FIS','CHI','BIO'][d.sector]} / ${this.id.replace(/^(math|physics|chemistry|biology)-/,'').toUpperCase()} / ${d.activity?'UNITÀ CON ATTIVITÀ':'NUCLEO GUIDATO'}`,pad,109,C.lime);
  if(this.focusReading){
   const rect={x:pad,y:134,w:R.w-pad*2,h:R.h-184};U.panel(rect.x,rect.y,rect.w,rect.h,C.cyan,.98);
   if(this.view==='sources')this.sourcesUI(U,rect);else if(r.stage===4)this.quizUI(U,rect);else this.readingUI(U,d.steps[r.stage].text[r.level],rect,`${r.stage+1}. ${d.steps[r.stage].title}`);
   return;
  }

  U.wrap(displayText(d.title),pad,132,R.w-pad*2,C.pale,21,2,R.w<600?'body':'sub');
  const sw=(R.w-pad*2-25)/6;d.steps.forEach((s,i)=>U.button('course-stage-'+i,l.stacked?String(i+1):s.label,pad+i*(sw+5),180,sw,27,()=>this.setStage(i),{active:r.stage===i,small:true}));
  const lw=l.stacked?(R.w-pad*2-10)/3:145;
  ['BASE','APPLICA','APPROFONDISCI'].forEach((t,i)=>U.button('course-level-'+i,t,pad+i*(lw+5),215,lw,27,()=>this.setLevel(LEVELS[i]),{active:r.level===LEVELS[i],small:true}));
  if(l.stacked){const bw=(R.w-pad*2-15)/4;(d.activity?['LEZIONE','ATTIVITÀ','ESITO','FONTI']:['LEZIONE','LAB 3D',R.w<360?'PROVE':'ESPERIMENTO','FONTI']).forEach((t,i)=>{const v=['lesson','lab','controls','sources'][i];U.button('course-view-'+v,t,pad+i*(bw+5),249,bw,24,()=>{this.view=v;this.page=0;},{active:this.view===v,small:true});});}
  else{
   U.button('course-view-lesson','LEZIONE',R.w-pad-220,215,105,27,()=>{this.view='lesson';this.page=0;},{active:this.view!=='sources',small:true});
   U.button('course-view-sources','FONTI',R.w-pad-105,215,105,27,()=>{this.view='sources';this.page=0;},{active:this.view==='sources',small:true});
  }
  if(!l.stacked||['lesson','sources'].includes(this.view)){
   U.panel(l.left.x,l.left.y,l.left.w,l.left.h,C.cyan,.96);
   if(this.view==='sources')this.sourcesUI(U,l.left);else if(r.stage===4)this.quizUI(U,l.left);else{
    const t=[...d.steps[r.stage].text[r.level]];
    if(r.stage===5)t.push(d.activity?`Autoverifica: ${this.summary.correct}/${this.summary.total}. Attività: ${this.summary.activity.solved}/${this.summary.activity.goal}. Diario di almeno 60 caratteri: ${this.summary.reflectionRecorded?'presente':'da scrivere'}. Per concludere usa ESITO.`:`Autoverifica: ${this.summary.correct}/4. Due configurazioni distinte: ${this.summary.experiments?'sì':'no'}. Diario di almeno 60 caratteri: ${this.summary.reflectionRecorded?'presente':'da scrivere'}. Per concludere usa ESPERIMENTO > ESITO.`);
    this.readingUI(U,t,l.left,`${r.stage+1}. ${d.steps[r.stage].title}`);
   }
  }
  if(d.activity){const a=this.activityState,rt=l.right;
   if(!l.stacked){this.activity.draw(U,{x:rt.x,y:rt.y,w:rt.w,h:rt.h-122},a,state.paused);this.completionUI(U,{x:rt.x,y:rt.y+rt.h-114,w:rt.w,h:114});}
   else if(this.view==='lab')this.activity.draw(U,l.body,a,state.paused);else if(this.view==='controls')this.completionUI(U,l.controls);
  }else{
   if(!l.stacked||this.view==='lab')this.graphUI(U,l,state);
   if(!l.stacked||this.view==='controls')this.controlsUI(U,l.controls,state);
  }
  const fY=R.h-80,bw=(R.w-pad*2-18)/4,idx=this.bundle.courses.findIndex(d=>d.id===this.id);
  U.button('course-unit-prev','◂ UNITÀ',pad,fY,bw,34,()=>this.goUnit(this.bundle.courses[idx-1].id),{disabled:idx===0,small:true});
  U.button('course-catalogue','CATALOGO',pad+bw+6,fY,bw,34,()=>this.api.route('catalogue'),{small:true});
  U.button('course-journal','DIARIO',pad+2*(bw+6),fY,bw,34,()=>this.openJournal(),{small:true});
  U.button('course-unit-next','UNITÀ ▸',pad+3*(bw+6),fY,bw,34,()=>this.goUnit(this.bundle.courses[idx+1].id),{disabled:idx===99,small:true});
  if(!this.store.persistent)this.txt(U,'Solo sessione: esporta il diario prima di chiudere.',pad,R.h-97,'micro',C.amber);
 }
 readingUI(U,paragraphs,rect,heading,reserve=0){
  const scale=this.R.readingScale||1,x=rect.x+14,w=rect.w-28,top=rect.y+10,rows=this.rows(paragraphs,w/scale),line=23*scale;
  const hh=this.rows([heading],w,'mini').filter(Boolean).slice(0,2);hh.forEach((s,i)=>this.txt(U,s,x,top+i*18,'mini',C.lime));
  const y=top+hh.length*18+12,cap=Math.max(1,Math.floor((rect.y+rect.h-43-reserve-y)/line));
  const pages=Math.max(1,Math.ceil(rows.length/cap));this.page=clamp(this.page,0,pages-1);
  rows.slice(this.page*cap,(this.page+1)*cap).forEach((t,i)=>scaledText(this.R,displayText(t),x,y+i*line,'body',C.pale,scale));
  const by=rect.y+rect.h-34-reserve;
  U.button('course-page-prev','◂',x,by,32,25,()=>this.page--,{disabled:this.page===0,small:true});
  U.button('course-focus',this.focusReading?'RIDUCI':'ESPANDI',x+40,by,74,25,()=>{this.focusReading=!this.focusReading;this.page=0;},{small:true});
  this.txt(U,`${this.page+1} / ${pages}`,rect.x+rect.w-104,by+6,'micro',C.muted,{align:'center'});
  U.button('course-page-next','▸',rect.x+rect.w-46,by,32,25,()=>this.page++,{disabled:this.page===pages-1,small:true});
 }
 quizUI(U,rect){
  const d=this.definition,r=this.record,q=d.questions[this.question],choice=r.answers[q.id],fb=q.options.find(o=>o.id===choice);
  const paragraphs=this.feedback&&fb?[q.prompt,`${choice}. ${fb.text}`,fb.feedback]:[q.prompt,...q.options.map(o=>`${o.id}. ${o.text}`)];
  const total=d.questions.length,n=q.options.length;this.question=clamp(this.question,0,total-1);
  this.readingUI(U,paragraphs,rect,`QUESITO ${this.question+1}/${total} · CORRETTE ${this.summary.correct}`,72);
  const x=rect.x+14,w=rect.w-28,y=rect.y+rect.h-75,bw=(w-5*(n-1))/n;
  q.options.forEach((o,i)=>{U.button('course-answer-'+o.id,`${o.id}${choice===o.id?' SELEZ.':''}`,x+i*(bw+5),y,bw,29,()=>this.answer(q.id,o.id),{active:choice===o.id,small:true});U.buttons.at(-1).label=o.id+'. '+o.text;});
  U.button('course-question-prev','◂ Q',x,y+35,49,27,()=>{this.question--;this.feedback=false;this.page=0;},{disabled:this.question===0,small:true});
  U.button('course-feedback',this.feedback?'DOMANDA':'SPIEGAZIONE',x+55,y+35,w-110,27,()=>{this.feedback=!this.feedback;this.page=0;},{disabled:!choice,small:true});
  U.button('course-question-next','Q ▸',x+w-49,y+35,49,27,()=>{this.question++;this.feedback=false;this.page=0;},{disabled:this.question===d.questions.length-1,small:true});
 }
 completionUI(U,rect){U.panel(rect.x,rect.y,rect.w,rect.h,C.cyan,.97);const x=rect.x+12,w=rect.w-24,y=rect.y+10,r=this.record,s=this.summary,bw=(w-6)/2;
  this.txt(U,this.short(`ESITO · Attività ${s.activity.solved}/${s.activity.goal} · Quiz ${s.correct}/${s.total}, al primo tentativo ${s.firstTry} · Diario ${s.reflectionRecorded?'sì':'no'}`,w,'micro'),x,y,'micro',C.lime);
  U.button('course-ack',r.acknowledgedLimits?'✓ LIMITI RICONOSCIUTI':'RICONOSCO I LIMITI',x,y+20,bw,26,()=>{r.acknowledgedLimits=!r.acknowledgedLimits;r.completedAt=null;this.save();},{active:r.acknowledgedLimits,small:true});
  U.button('course-complete',s.completed?'PERCORSO REGISTRATO':'CONCLUDI PERCORSO',x+bw+6,y+20,bw,26,()=>{try{completeCourse(this.definition,r,this.reflection);this.save();this.api.say('Percorso registrato: attività e autoverifica, non certificazione.');}catch(e){this.api.say(e.message);}},{disabled:!s.eligible,active:s.completed,small:true});
  U.button('course-report','RAPPORTO JSON',x,y+52,bw,26,()=>this.exportReport(),{small:true});U.button('course-csv','DATI CSV',x+bw+6,y+52,bw,26,()=>this.exportCSV(),{small:true});
  if(rect.h>=110)this.txt(U,this.short('Per concludere: attività completata, tutte le risposte giuste, diario di almeno 60 caratteri.',w,'micro'),x,y+86,'micro',C.muted);
 }
 graphUI(U,l,state){
  const r=l.right,m=descriptor(this.id),y=value(this.id,this.time,this.record.parameters),hasSchema=SCHEMATIC_KINDS.has(m.kind);
  this.txt(U,this.short(m.yLabel+' ['+m.yUnit+']',r.w-22,'mini'),r.x+10,r.y+5,'mini',C.cyan);
  this.txt(U,this.short(m.xLabel+' ['+m.xUnit+']',r.w-22,'micro'),r.x+10,r.y+25,'micro',C.muted);
  U.button('course-graph-mode','GRAFICO',r.x+10,r.y+41,80,25,()=>this.mode='graph',{active:this.mode==='graph',small:true});
  if(hasSchema)U.button('course-schema-mode','SCHEMA 3D',r.x+96,r.y+41,95,25,()=>this.mode='schema',{active:this.mode==='schema',small:true});
  U.button('course-rotate-left','◂',r.x+r.w-71,r.y+41,27,25,()=>state.yaw-=.2,{small:true});
  U.button('course-rotate-right','▸',r.x+r.w-38,r.y+41,27,25,()=>state.yaw+=.2,{small:true});
  this.scene.drawLabels(U);
  const by=l.graph.y+l.graph.h+5;
  this.txt(U,`x=${num(this.time)} [${m.xUnit}]; y=${num(y)} [${m.yUnit}]`,r.x+10,by,'micro',C.lime);
  const caption=this.mode==='schema'?this.scene.schematic?.caption||'Schema illustrativo.':`Ciano: corrente; ambra: A. ${m.discrete?'Campioni discreti':'Campionamento finito'}; scala adattiva. Profondità non fisica.`;
  const lines=this.rows([caption],r.w-20,'micro').slice(0,l.stacked&&r.h<250?2:3);lines.forEach((s,i)=>this.txt(U,s,r.x+10,by+18+i*14,'micro',C.muted));
 }
 controlsUI(U,rect,state){
  U.panel(rect.x,rect.y,rect.w,rect.h,C.cyan,.97);const x=rect.x+12,w=rect.w-24,y=rect.y+8,r=this.record,m=descriptor(this.id),tabW=(w-10)/3;
  ['REGOLA','A / B','ESITO'].forEach((t,i)=>U.button('course-control-tab-'+i,t,x+i*(tabW+5),y,tabW,25,()=>{this.controlTab=i;},{active:this.controlTab===i,small:true}));
  if(this.controlTab===0){
   const label=this.short(m.xLabel+' ['+m.xUnit+']',w-96,'mini');
   U.slider('course-x','',x,y+36,w,this.time,m.domain[0],m.domain[1],m.discrete?1:(m.domain[1]-m.domain[0])/200,v=>this.time=clamp(m.discrete?Math.round(v):v,...m.domain),num);this.txt(U,label,x,y+36,'mini',C.cyan);U.buttons.at(-1).label=m.xLabel+' ['+m.xUnit+']';
   m.controls.forEach((c,i)=>{
    const yy=y+90+i*43;
    this.txt(U,this.short(c.label+' ['+c.unit+']',w-152,'micro'),x,yy+6,'micro',C.muted);
    this.txt(U,`${c.key}=${num(r.parameters[c.key])}`,x+w-104,yy+6,'micro',C.pale,{align:'center'});
    for(const [j,dir] of [-1,1].entries()){const xx=x+w-60+j*32;
     U.button('course-param-'+c.key+'-'+dir,dir<0?'−':'+',xx,yy,28,27,()=>{const v=clamp(Number((r.parameters[c.key]+dir*c.step).toPrecision(12)),c.min,c.max);this.setParameters({[c.key]:v});},{disabled:dir<0?r.parameters[c.key]<=c.min:r.parameters[c.key]>=c.max,small:true});U.buttons.at(-1).label=(dir<0?'Diminuisci ':'Aumenta ')+c.label;
    }
   });
   if(rect.h>=235){this.txt(U,this.short(m.formula,w,'micro'),x,rect.y+rect.h-52,'micro',C.lime);U.button('course-reset','RIPRISTINA',x+w-110,rect.y+rect.h-30,110,23,()=>{this.setParameters(defaults(this.id));this.time=m.fixture[0];state.yaw=0;state.pitch=.45;},{small:true});}
  }else if(this.controlTab===1){
   const probes=probePoints(this.id);this.txt(U,this.short(`Prevedi y: x=${num(probes[0])} → ${num(probes[1])}`,w,'micro'),x,y+37,'micro',C.pale);
   const bw=(w-6)/2;PREDICTIONS.forEach((p,i)=>U.button('course-predict-'+p,names[p],x+(i%2)*(bw+6),y+59+Math.floor(i/2)*31,bw,26,()=>{predictCourse(this.id,r,p);this.save();},{active:r.prediction?.choice===p,small:true}));
   ['A','B'].forEach((s,i)=>U.button('course-capture-'+s,`SALVA ${s}${r.snapshots[s]?' ✓':''}`,x+i*(bw+6),y+125,bw,28,()=>this.capture(s),{disabled:!r.prediction,small:true}));
   if(rect.h>=210){const results=['A','B'].map(s=>{const q=experimentResult(this.id,r.snapshots[s]);return q?`${s}: ${q.points.map(p=>num(p.y)).join(' → ')}; previsione ${q.predictionCorrect?'sì':'no'}`:`${s}: da registrare`;});results.forEach((t,i)=>this.txt(U,this.short(t,w,'micro'),x,y+164+i*17,'micro',C.muted));}
  }else{
   const s=this.summary,bw=(w-6)/2;
   this.txt(U,`Quiz ${s.correct}/4 · A/B ${s.experiments?'sì':'no'} · Diario ${s.reflectionRecorded?'sì':'no'}`,x,y+37,'micro',C.lime);
   U.button('course-ack',r.acknowledgedLimits?'✓ LIMITI RICONOSCIUTI':'RICONOSCO I LIMITI',x,y+58,w,27,()=>{r.acknowledgedLimits=!r.acknowledgedLimits;r.completedAt=null;this.save();},{active:r.acknowledgedLimits,small:true});
   U.button('course-complete',s.completed?'PERCORSO REGISTRATO':'CONCLUDI PERCORSO',x,y+92,w,28,()=>{try{completeCourse(this.definition,r,this.reflection);this.save();this.api.say('Percorso registrato: attività e autoverifica, non certificazione.');}catch(e){this.api.say(e.message);}},{disabled:!s.eligible,active:s.completed,small:true});
   U.button('course-report','RAPPORTO JSON',x,y+130,bw,26,()=>this.exportReport(),{small:true});U.button('course-csv','DATI CSV',x+bw+6,y+130,bw,26,()=>this.exportCSV(),{small:true});
   if(rect.h>=215)this.txt(U,'Diario: almeno 60 caratteri, senza valutazione automatica.',x,y+174,'micro',C.muted);
  }
 }
 sourcesUI(U,rect){
  const d=this.definition,list=[...d.sources.map(id=>this.bundle.sources.find(s=>s.id===id)),...(this.id==='math-c08'?[{id:'pilot',title:'Missione pilota: Il segnale di Simbiosi',route:'pilot'}]:[])];this.sourceIndex=clamp(this.sourceIndex,0,list.length-1);const s=list[this.sourceIndex];
  const paragraphs=[d.activity?`Copertura: ${d.scope}. Testi originali in bozza, da rivedere.`:`Copertura: ${d.scope}. Nucleo guidato, non manuale integrale. Testi originali: revisione scientifico-didattica umana non certificata.`,...d.objectives,...d.glossary.map(g=>g.term+': '+g.definition),`Riferimento di approfondimento ${this.sourceIndex+1}/${list.length}: ${s.title}. ${s.route?'Il collegamento apre la missione pilota locale.':'Il collegamento apre un sito esterno; nessun testo o immagine è scaricato durante l’uso del laboratorio.'}`,`Prerequisiti consigliati: ${d.prerequisites.join(', ')||'nessuno'}. Collegamento: ${d.connections.join(', ')}.`];
  this.readingUI(U,paragraphs,rect,'FONTI, OBIETTIVI E GLOSSARIO',72);
  const x=rect.x+14,w=rect.w-28,y=rect.y+rect.h-75,bw=(w-6)/2;
  U.button('course-source-prev','◂ FONTE',x,y,72,27,()=>{this.sourceIndex--;this.page=0;},{disabled:this.sourceIndex===0,small:true});
  U.button('course-source-open','APRI',x+78,y,w-156,27,()=>s.route?this.api.route(s.route):this.api.openExternal(s.url),{small:true});
  U.button('course-source-next','FONTE ▸',x+w-72,y,72,27,()=>{this.sourceIndex++;this.page=0;},{disabled:this.sourceIndex===list.length-1,small:true});
  U.button('course-original',d.originalSource?'DISPENSA PDF':'TESTO LOCALE',x,y+35,bw,27,()=>d.originalSource?this.api.openPDF(d.originalSource.pdfPages[0]):this.api.download('GAIA_'+this.id+'_testo.txt',d.steps.map(s=>s.title+'\n'+s.text[rLevel(this.record)].join('\n\n')).join('\n\n'),'text/plain;charset=utf-8'),{small:true});
  U.button('course-connection','COLLEGAMENTO',x+bw+6,y+35,bw,27,()=>this.goUnit(d.connections[0]),{small:true});
 }
 drawPathsUI(U,state){
  const R=this.R,pad=R.w<500?14:24,paths=this.bundle.paths,ww=R.w-pad*2;
  this.pathIndex=clamp(this.pathIndex,0,paths.length-1);const path=paths[this.pathIndex];
  U.tag('CURRICULUM / NAVIGAZIONE LIBERA',pad,110,C.lime);
  this.txt(U,'PERCORSI DI STUDIO',pad,137,R.w<500?'body':'sub',C.pale);
  const cw=(ww-15)/4;['MATEMATICA','FISICA','CHIMICA','BIOLOGIA'].forEach((name,i)=>U.button('path-select-'+i,R.w<400?['MAT','FIS','CHI','BIO'][i]:name,pad+i*(cw+5),178,cw,29,()=>{this.pathIndex=i;this.pathPage=0;},{active:this.pathIndex===i,small:true}));
  const tw=(ww-10)/3;['CLIMA','MATERIA','POPOLAZIONI'].forEach((name,j)=>{const i=j+4;U.button('path-select-'+i,name,pad+j*(tw+5),215,tw,29,()=>{this.pathIndex=i;this.pathPage=0;},{active:this.pathIndex===i,small:true});});
  const complete=path.units.filter(id=>{const r=this.store.data.courses?.[id];return r&&courseProgress(this.byId.get(id),r,this.store.data.notes['course:'+id]||'').completed;}).length;
  this.txt(U,this.short(path.title+' · '+complete+'/'+path.units.length+' percorsi registrati',ww,'mini'),pad,259,'mini',C.lime);
  const rows=Math.max(1,Math.floor((R.h-398)/68)),pages=Math.max(1,Math.ceil(path.units.length/rows));this.pathPage=clamp(this.pathPage,0,pages-1);
  path.units.slice(this.pathPage*rows,(this.pathPage+1)*rows).forEach((id,i)=>{
   const d=this.byId.get(id),r=this.store.data.courses?.[id],y=292+i*68,s=r?courseProgress(d,r,this.store.data.notes['course:'+id]||''):null;
   U.button('path-unit-'+id,'',pad,y,ww,61,()=>this.goUnit(id),{active:s?.completed});U.buttons.at(-1).label=d.title+(s?.completed?' — percorso registrato':'');
   this.rows([d.title],ww-28,'mini').filter(Boolean).slice(0,2).forEach((t,j)=>this.txt(U,t,pad+14,y+7+j*17,'mini',C.pale));
   this.txt(U,s?.completed?'ATTIVITÀ REGISTRATE':s?'AUTOVERIFICA '+s.correct+'/'+s.total:'DA INIZIARE',pad+14,y+44,'micro',s?.completed?C.lime:C.muted);
  });
  this.txt(U,'Il completamento non è una certificazione.',pad,R.h-111,'micro',C.muted);
  const bw=(ww-12)/3,by=R.h-80;
  U.button('paths-prev','◂',pad,by,bw,34,()=>this.pathPage--,{disabled:this.pathPage===0,small:true});
  U.button('paths-catalogue','CATALOGO',pad+bw+6,by,bw,34,()=>this.api.route('catalogue'),{small:true});
  U.button('paths-next','▸',pad+2*(bw+6),by,bw,34,()=>this.pathPage++,{disabled:this.pathPage===pages-1,small:true});
 }
 semanticPathsText(){const path=this.bundle.paths[this.pathIndex];return ['Percorsi di studio. La navigazione non è bloccata dai prerequisiti.',path.title,...path.units.map(id=>this.byId.get(id).title),'Il completamento registra attività e autoverifica, non certifica competenze.'].join('\n\n');}
 semanticKey(){return [this.activity.key(),JSON.stringify(this.record.activity),this.id,this.record.stage,this.record.level,this.page,this.question,this.feedback,this.view,this.controlTab,this.sourceIndex,this.time,this.mode,this.focusReading,parameterKey(this.id,this.record.parameters),JSON.stringify(this.record.answers),JSON.stringify(this.record.snapshots),this.record.completedAt,this.record.acknowledgedLimits,this.reflection].join('|');}
 semanticText(){const d=this.definition,r=this.record,m=descriptor(this.id),q=d.questions[clamp(this.question,0,d.questions.length-1)];
  if(d.activity)return [d.title,d.narrativeStatus,...d.objectives,d.steps[r.stage].title,...d.steps[r.stage].text[r.level],this.activity.semanticText(this.activityState),...(r.stage===4?[q.prompt,...q.options.map(o=>o.id+'. '+o.text),q.options.find(o=>o.id===r.answers[q.id])?.feedback||'']:[]),...d.glossary.map(g=>g.term+': '+g.definition),...d.sources.map(id=>this.bundle.sources.find(s=>s.id===id).title),`Autoverifica ${this.summary.correct}/${this.summary.total}.`].join('\n\n');
  return [d.title,d.narrativeStatus,...d.objectives,d.steps[r.stage].title,...d.steps[r.stage].text[r.level],m.formula,`${m.xLabel}: ${num(this.time)} ${m.xUnit}. ${m.yLabel}: ${num(value(this.id,this.time,r.parameters))} ${m.yUnit}.`,...['A','B'].map(s=>{const e=experimentResult(this.id,r.snapshots[s]);return e?`${s}: `+JSON.stringify(e):`${s} non registrato.`;}),...(r.stage===4?[q.prompt,...q.options.map(o=>o.id+'. '+o.text),q.options.find(o=>o.id===r.answers[q.id])?.feedback||'']:[]),...d.glossary.map(g=>g.term+': '+g.definition),...d.sources.map(id=>this.bundle.sources.find(s=>s.id===id).title),`Autoverifica ${this.summary.correct}/4. Il completamento non certifica competenze.`,this.mode==='schema'?this.scene.schematic?.caption||'':'Grafico con scale adattive; la profondità non è una variabile scientifica.'].join('\n\n');}
}
const rLevel=r=>LEVELS.includes(r.level)?r.level:'base';
