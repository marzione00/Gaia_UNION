import {clamp,color} from '../renderer.js';
import {scaledText} from '../navigation/text.js';
import {C,T,DISCIPLINE,caseLabel} from '../ui/toolkit.js';
import {DOCUMENTS,docOf} from '../documents.js';
import {descriptor,defaults,value,samples,probePoints,parameterKey} from '../models/curriculum.js';
import {LEVELS,PREDICTIONS,freshCourse,validateBundle,changeCourseParameters,predictCourse,captureCourse,answerCourse,experimentResult,courseProgress,completeCourse} from './course-engine.js';
import {CourseScene,formatNumber as num,SCHEMATIC_KINDS} from './course-scene.js';
import {ActivityUI} from './activity-ui.js';
import {freshActivity} from './activities.js';
const names={increases:'CRESCE',decreases:'DIMINUISCE',constant:'UGUALE',undefined:'NON DEFINITO'};
/** Existing glyph atlas only: explicit fallbacks for the few characters it lacks, never missing squares.
 * Superscripts ⁰ to ⁹ with ⁺ and ⁻, σ, ′ and ⇌ are in the atlas since 1.9.0. */
export function displayText(s){return String(s).replace(/[Åâôˣℏ∫]/g,c=>({'Å':'angstrom','â':'a','ô':'o','ˣ':'^x','ℏ':'h/(2pi)','∫':'integrale '}[c]));}
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
 /** Vertical rhythm of the unit screen: desktop, stacked (narrow or short) and compact (height under 700). */
 navMetrics(){const R=this.R,stacked=R.w<1050||R.h<820,compact=R.h<700,pad=R.w<500?14:24,rh=compact?32:stacked?38:40,gap=compact?5:8;
  if(!stacked)return {stacked,compact,pad,rh,gap,stepY:168,rowY:168+rh+gap,top:168+rh+gap+36+14,nav:R.h-82,navH:40};
  const stepY=compact?166:176,levelY=stepY+rh+gap,viewY=levelY+rh+gap;return {stacked,compact,pad,rh,gap,stepY,levelY,viewY,top:viewY+rh+(compact?8:12),nav:compact?R.h-78:R.h-82,navH:compact?34:40};}
 layout(){const R=this.R,nav=this.navMetrics(),stacked=nav.stacked,pad=nav.pad,top=nav.top,bottom=R.h-100,body={x:pad,y:top,w:R.w-pad*2,h:Math.max(130,bottom-top)};
  if(stacked)return {nav,stacked,body,left:body,right:body,plot:body,graph:{x:body.x+6,y:body.y+86,w:body.w-12,h:Math.max(60,body.h-150)},controls:body};
  const left={...body,w:Math.min(540,body.w*.4)},right={x:body.x+left.w+18,y:top,w:body.w-left.w-18,h:body.h};
  // A wide column puts the controls beside the graph, so the plot keeps the full height;
  // a narrower one stacks them below it.
  let plot,controls;if(right.w>=640){const cw=clamp(right.w*.42,300,380);controls={x:right.x+right.w-cw,y:right.y,w:cw,h:right.h};plot={x:right.x,y:right.y,w:right.w-cw-14,h:right.h};}
  else{const ch=262;controls={x:right.x,y:right.y+right.h-ch,w:right.w,h:ch};plot={x:right.x,y:right.y,w:right.w,h:right.h-ch-12};}
  const graph={x:plot.x+6,y:plot.y+86,w:plot.w-12,h:Math.max(80,plot.h-158)};
  return {nav,stacked,body,left,right,plot,graph,controls};
 }
 draw3D(state){if(state.scene!=='mission'||this.focusReading){this.scene.rect=null;return;}this.select(this.api.currentUnit?.()||this.id);if(this.definition.activity){this.scene.rect=null;return;}const l=this.layout();if(!l.stacked||this.view==='lab')this.scene.draw(l.graph,this.id,this.record.parameters,this.record.snapshots.A?.parameters||null,this.time,state,this.mode);else this.scene.rect=null;}
 rows(text,width,style='body'){const key=JSON.stringify([text,width,style]);if(!this.rowCache.has(key)){if(this.rowCache.size>32)this.rowCache.clear();this.rowCache.set(key,fittedRows(this.R,text,width,style));}return this.rowCache.get(key);}
 txt(U,t,x,y,style='body',color=C.pale,options={}){U.text(displayText(t),x,y,style,color,options);}
 short(t,width,style='micro'){t=displayText(t);while(t.length&&this.R.textWidth(t,style)>width)t=t.slice(0,-1);return t;}
 drawUI(U,state){
  this.select(this.api.currentUnit?.()||this.id);const R=this.R,d=this.definition,r=this.record,l=this.layout(),n=l.nav,pad=n.pad,accent=DISCIPLINE[d.sector],w=R.w-pad*2;
  const code=this.id.replace(/^(math|physics|chemistry|biology)-/,'').toUpperCase(),kind=d.activity?'attività':d.editorialStatus==='hand-written-draft'?'laboratorio':'nucleo guidato';
  let crumb=`${['Matematica','Fisica','Chimica','Biologia'][d.sector]} · ${code} · unità con ${kind}`;if(R.textWidth(crumb.toUpperCase(),'micro',.7)>w)crumb=`${['Mat','Fis','Chi','Bio'][d.sector]} · ${code} · ${kind}`;
  U.tag(crumb,pad,104,accent);
  if(this.focusReading){
   const rect={x:pad,y:130,w,h:R.h-180};U.panel(rect.x,rect.y,rect.w,rect.h,accent,.98);
   if(this.view==='sources')this.sourcesUI(U,rect);else if(r.stage===4)this.quizUI(U,rect);else this.readingUI(U,d.steps[r.stage].text[r.level],rect,`${r.stage+1}. ${d.steps[r.stage].title}`);
   return;
  }
  const big=!n.stacked;U.wrap(displayText(d.title),pad,124,w,C.pale,big?32:R.w<600?21:24,big?1:2,big?'head':R.w<600?'body':'sub');
  const gap=n.stacked?4:6;
  if(!n.stacked){const sw=(w-gap*5)/6;d.steps.forEach((s,i)=>{U.button('course-stage-'+i,`${i+1}  ${caseLabel(s.label)}`,pad+i*(sw+gap),n.stepY,sw,n.rh,()=>this.setStage(i),{active:r.stage===i});U.buttons.at(-1).label=`${i+1}. ${caseLabel(s.label)}`;});}
  else{const act=`${r.stage+1} · ${caseLabel(d.steps[r.stage].label)}`,aw=Math.min(w*.42,R.textWidth(act,'mini')+28),ow=(w-aw-gap*5)/5;let x=pad;
   d.steps.forEach((s,i)=>{const bw=i===r.stage?aw:ow;U.button('course-stage-'+i,i===r.stage?act:String(i+1),x,n.stepY,bw,n.rh,()=>this.setStage(i),{active:r.stage===i});U.buttons.at(-1).label=`${i+1}. ${caseLabel(s.label)}`;x+=bw+gap;});}
  const levels=['Base','Applica','Approfondisci'];
  if(!n.stacked){
   levels.forEach((t,i)=>U.button('course-level-'+i,t,pad+i*156,n.rowY,150,36,()=>this.setLevel(LEVELS[i]),{active:r.level===LEVELS[i]}));
   U.button('course-view-lesson','Lezione',R.w-pad-226,n.rowY,110,36,()=>{this.view='lesson';this.page=0;},{active:this.view!=='sources'});
   U.button('course-view-sources','Fonti',R.w-pad-110,n.rowY,110,36,()=>{this.view='sources';this.page=0;},{active:this.view==='sources'});
  }else{
   const lw=(w-gap*2)/3;levels.forEach((t,i)=>U.button('course-level-'+i,t,pad+i*(lw+gap),n.levelY,lw,n.rh,()=>this.setLevel(LEVELS[i]),{active:r.level===LEVELS[i]}));
   const vw=(w-gap*3)/4;(d.activity?['Lezione','Attività','Esito','Fonti']:['Lezione','Lab 3D',R.w<360?'Prove':'Esperimento','Fonti']).forEach((t,i)=>{const v=['lesson','lab','controls','sources'][i];U.button('course-view-'+v,t,pad+i*(vw+gap),n.viewY,vw,n.rh,()=>{this.view=v;this.page=0;},{active:this.view===v});});
  }
  if(!l.stacked||['lesson','sources'].includes(this.view)){
   U.panel(l.left.x,l.left.y,l.left.w,l.left.h,accent,.97);
   if(this.view==='sources')this.sourcesUI(U,l.left);else if(r.stage===4)this.quizUI(U,l.left);else{
    const t=[...d.steps[r.stage].text[r.level]];
    if(r.stage===5)t.push(d.activity?`Autoverifica: ${this.summary.correct}/${this.summary.total}. Attività: ${this.summary.activity.solved}/${this.summary.activity.goal}. Diario di almeno 60 caratteri: ${this.summary.reflectionRecorded?'presente':'da scrivere'}. Per concludere usa Esito.`:`Autoverifica: ${this.summary.correct}/${this.summary.total}. Due configurazioni distinte: ${this.summary.experiments?'sì':'no'}. Diario di almeno 60 caratteri: ${this.summary.reflectionRecorded?'presente':'da scrivere'}. Per concludere usa Esperimento, poi Esito.`);
    this.readingUI(U,t,l.left,`${r.stage+1}. ${d.steps[r.stage].title}`);
   }
  }
  if(d.activity){const a=this.activityState,rt=l.right;
   if(!l.stacked){this.activity.draw(U,{x:rt.x,y:rt.y,w:rt.w,h:rt.h-134},a,state.paused,d.activity);this.completionUI(U,{x:rt.x,y:rt.y+rt.h-126,w:rt.w,h:126});}
   else if(this.view==='lab')this.activity.draw(U,l.body,a,state.paused,d.activity);else if(this.view==='controls')this.completionUI(U,l.controls);
  }else{
   if(!l.stacked||this.view==='lab')this.graphUI(U,l,state);
   if(!l.stacked||this.view==='controls')this.controlsUI(U,l.controls,state);
  }
  const fY=n.nav,bw=(w-18)/4,idx=this.bundle.courses.findIndex(d=>d.id===this.id);
  U.button('course-unit-prev','◂ Unità',pad,fY,bw,n.navH,()=>this.goUnit(this.bundle.courses[idx-1].id),{disabled:idx===0});
  U.button('course-catalogue','Catalogo',pad+bw+6,fY,bw,n.navH,()=>this.api.route('catalogue'));
  U.button('course-journal','Diario',pad+2*(bw+6),fY,bw,n.navH,()=>this.openJournal());
  U.button('course-unit-next','Unità ▸',pad+3*(bw+6),fY,bw,n.navH,()=>this.goUnit(this.bundle.courses[idx+1].id),{disabled:idx===this.bundle.courses.length-1});
  if(!this.store.persistent)this.txt(U,'Solo sessione: esporta il diario prima di chiudere.',pad,fY-17,'micro',C.amber);
 }
 readingUI(U,paragraphs,rect,heading,reserve=0){
  const accent=DISCIPLINE[this.definition.sector],scale=this.R.readingScale||1,x=rect.x+16,w=rect.w-32,top=rect.y+14,rows=this.rows(paragraphs,w/scale),line=25*scale;
  const hh=this.rows([heading],w,'mini').filter(Boolean).slice(0,2);hh.forEach((s,i)=>this.txt(U,s,x,top+i*20,'mini',accent));
  const y=top+hh.length*20+12,bh=32,by=rect.y+rect.h-bh-10-reserve,cap=Math.max(1,Math.floor((by-6-y)/line));
  const pages=Math.max(1,Math.ceil(rows.length/cap));this.page=clamp(this.page,0,pages-1);
  rows.slice(this.page*cap,(this.page+1)*cap).forEach((t,i)=>scaledText(this.R,displayText(t),x,y+i*line,'body',C.pale,scale));
  U.button('course-focus',this.focusReading?'Riduci':'Espandi',x,by,96,bh,()=>{this.focusReading=!this.focusReading;this.page=0;});
  if(pages>1){
   U.button('course-page-prev','◂',rect.x+rect.w-16-132,by,40,bh,()=>this.page--,{disabled:this.page===0});U.buttons.at(-1).label='Pagina precedente';
   this.txt(U,`${this.page+1} / ${pages}`,rect.x+rect.w-16-66,by+9,'micro',C.muted,{align:'center'});
   U.button('course-page-next','▸',rect.x+rect.w-16-40,by,40,bh,()=>this.page++,{disabled:this.page===pages-1});U.buttons.at(-1).label='Pagina successiva';
  }
 }
 quizUI(U,rect){
  const d=this.definition,r=this.record,total=d.questions.length;this.question=clamp(this.question,0,total-1);
  const q=d.questions[this.question],choice=r.answers[q.id],fb=q.options.find(o=>o.id===choice),accent=DISCIPLINE[d.sector],R=this.R;
  const x=rect.x+16,w=rect.w-32,bh=32,ny=rect.y+rect.h-bh-10,heading=`Domanda ${this.question+1}/${total} · corrette ${this.summary.correct}`;
  U.button('course-question-prev','◂',x,ny,44,bh,()=>{this.question--;this.feedback=false;this.page=0;},{disabled:this.question===0});U.buttons.at(-1).label='Domanda precedente';
  U.button('course-feedback',this.feedback?'Rivedi le risposte':'Spiegazione',x+50,ny,w-100,bh,()=>{this.feedback=!this.feedback;this.page=0;},{disabled:!choice});
  U.button('course-question-next','▸',x+w-44,ny,44,bh,()=>{this.question++;this.feedback=false;this.page=0;},{disabled:this.question===total-1});U.buttons.at(-1).label='Domanda successiva';
  if(this.feedback&&fb){const ok=choice===q.correct;this.readingUI(U,[q.prompt,`Risposta ${choice}: ${fb.text}`,(ok?'Corretta. ':'Da rivedere. ')+fb.feedback],rect,heading,bh+8);return;}
  const top=rect.y+14,hh=this.rows([heading],w,'mini').filter(Boolean).slice(0,2),prompt=this.rows([q.prompt],w,'body').filter(Boolean);
  const opt=q.options.map(o=>this.rows([o.text],w-58,'body').filter(Boolean)),optH=opt.map(rows=>Math.max(46,rows.length*23+22));
  let y=top+hh.length*20+12;const need=prompt.length*25+14+optH.reduce((a,h)=>a+h+8,0);
  if(need<=ny-10-y){
   hh.forEach((t,i)=>this.txt(U,t,x,top+i*20,'mini',accent));
   prompt.forEach((t,i)=>this.txt(U,t,x,y+i*25,'body',C.pale));y+=prompt.length*25+14;
   q.options.forEach((o,i)=>{const h=optH[i],id='course-answer-'+o.id,sel=choice===o.id,right=o.id===q.correct,hover=U.hover===id,focus=U.focus===id;
    const mark=sel?(right?C.lime:C.red):null;
    R.roundRect(x,y,w,h,10,sel?color(right?'#16382c':'#3d1f22'):color(hover?T.hover:T.raised),mark);
    if(focus)R.roundRect(x-3,y-3,w+6,h+6,12,color('#000000',0),color('#ffffff',.85));
    R.roundRect(x+10,y+(h-28)/2,28,28,14,mark||color(T.surface));
    this.txt(U,o.id,x+24,y+(h-28)/2+6,'mini',sel?color(T.ink):C.pale,{align:'center'});
    opt[i].forEach((t,k)=>this.txt(U,t,x+48,y+11+k*23,'body',C.pale));
    U.buttons.push({id,label:o.id+'. '+o.text,x,y,w,h,action:()=>this.answer(q.id,o.id),disabled:false});
    y+=h+8;});
   return;
  }
  this.readingUI(U,[q.prompt,...q.options.map(o=>`${o.id}. ${o.text}`)],rect,heading,bh*2+16);
  const n=q.options.length,bw=(w-6*(n-1))/n,ay=ny-bh-8;
  q.options.forEach((o,i)=>{U.button('course-answer-'+o.id,o.id,x+i*(bw+6),ay,bw,bh,()=>this.answer(q.id,o.id),{active:choice===o.id});U.buttons.at(-1).label=o.id+'. '+o.text;});
 }
 completionUI(U,rect){U.panel(rect.x,rect.y,rect.w,rect.h,DISCIPLINE[this.definition.sector],.97);const x=rect.x+14,w=rect.w-28,y=rect.y+12,r=this.record,s=this.summary,bw=(w-6)/2,bh=32;
  this.txt(U,this.short(`Esito · attività ${s.activity.solved}/${s.activity.goal} · quiz ${s.correct}/${s.total}, al primo tentativo ${s.firstTry} · diario ${s.reflectionRecorded?'sì':'no'}`,w,'micro'),x,y,'micro',C.lime);
  U.button('course-ack',r.acknowledgedLimits?'✓ Limiti riconosciuti':'Riconosco i limiti',x,y+22,bw,bh,()=>{r.acknowledgedLimits=!r.acknowledgedLimits;r.completedAt=null;this.save();},{active:r.acknowledgedLimits});
  U.button('course-complete',s.completed?'Percorso registrato':'Concludi il percorso',x+bw+6,y+22,bw,bh,()=>{try{completeCourse(this.definition,r,this.reflection);this.save();this.api.say('Percorso registrato: attività e autoverifica, non certificazione.');}catch(e){this.api.say(e.message);}},{disabled:!s.eligible,active:s.completed});
  U.button('course-report','Rapporto JSON',x,y+60,bw,bh,()=>this.exportReport());U.button('course-csv','Dati CSV',x+bw+6,y+60,bw,bh,()=>this.exportCSV());
  if(rect.h>=124)this.txt(U,this.short('Per concludere: attività completata, tutte le risposte giuste, diario di almeno 60 caratteri.',w,'micro'),x,y+100,'micro',C.muted);
 }
 graphUI(U,l,state){
  const r=l.plot,m=descriptor(this.id),y=value(this.id,this.time,this.record.parameters),hasSchema=SCHEMATIC_KINDS.has(m.kind),u=x=>x==='1'?'':' '+x;
  this.R.roundRect(r.x,r.y,r.w,r.h,14,color('#000000',0),color(T.line,.9));
  this.txt(U,this.short(m.yLabel+' ['+m.yUnit+']',r.w-28,'mini'),r.x+14,r.y+12,'mini',C.cyan);
  this.txt(U,this.short('in funzione di: '+m.xLabel+' ['+m.xUnit+']',r.w-28,'micro'),r.x+14,r.y+32,'micro',C.muted);
  const narrow=r.w<360,gw=narrow?78:92,sw=narrow?92:110,rw=narrow?34:38;
  U.button('course-graph-mode','Grafico',r.x+14,r.y+50,gw,30,()=>this.mode='graph',{active:this.mode==='graph'});
  if(hasSchema)U.button('course-schema-mode','Schema 3D',r.x+20+gw,r.y+50,sw,30,()=>this.mode='schema',{active:this.mode==='schema'});
  U.button('course-rotate-left','◂',r.x+r.w-14-2*rw-6,r.y+50,rw,30,()=>state.yaw-=.2);U.buttons.at(-1).label='Ruota a sinistra';
  U.button('course-rotate-right','▸',r.x+r.w-14-rw,r.y+50,rw,30,()=>state.yaw+=.2);U.buttons.at(-1).label='Ruota a destra';
  this.scene.drawLabels(U);
  const by=l.graph.y+l.graph.h+8;
  this.txt(U,this.short(`${m.xLabel} ${num(this.time)}${u(m.xUnit)} · ${m.yLabel} ${num(y)}${u(m.yUnit)}`,r.w-28,'micro'),r.x+14,by,'micro',C.lime);
  const caption=this.mode==='schema'?this.scene.schematic?.caption||'Schema illustrativo.':`Linea azzurra: valori attuali. Linea ambra: configurazione A salvata.${m.discrete?' I valori sono calcolati solo nei punti interi.':''}`;
  const lines=this.rows([caption],r.w-28,'micro').filter(Boolean).slice(0,l.stacked&&r.h<250?1:2);lines.forEach((s,i)=>this.txt(U,s,r.x+14,by+19+i*17,'micro',C.muted));
 }
 controlsUI(U,rect,state){
  U.panel(rect.x,rect.y,rect.w,rect.h,DISCIPLINE[this.definition.sector],.97);const x=rect.x+14,w=rect.w-28,y=rect.y+10,r=this.record,m=descriptor(this.id),tabW=(w-12)/3,bh=32,u=x=>x==='1'?'':' '+x;
  ['Regola','A / B','Esito'].forEach((t,i)=>U.button('course-control-tab-'+i,t,x+i*(tabW+6),y,tabW,bh,()=>{this.controlTab=i;},{active:this.controlTab===i}));
  if(this.controlTab===0){
   // In a narrow panel each parameter takes two lines: the name above, value and buttons below.
   const narrow=w<320&&rect.h>=176+m.controls.length*60,full=m.xLabel+' ['+m.xUnit+']',wrap=this.R.textWidth(displayText(full),'mini')>w-110&&rect.h>=194+m.controls.length*(narrow?60:44),head=wrap?this.rows([full],w-60,'mini').filter(Boolean).slice(0,2):[this.short(full,w-110,'mini')],sy=y+44+18*(head.length-1);
   U.slider('course-x','',x,sy,w,this.time,m.domain[0],m.domain[1],m.discrete?1:(m.domain[1]-m.domain[0])/200,v=>this.time=clamp(m.discrete?Math.round(v):v,...m.domain),num);head.forEach((t,i)=>this.txt(U,t,x,y+44+18*i,'mini',C.cyan));U.buttons.at(-1).label=full;
   m.controls.forEach((c,i)=>{
    const yy=sy+52+i*(narrow?60:44),by=narrow?yy+20:yy;
    this.txt(U,narrow?this.short(c.label,w,'mini'):this.short(c.label,w-210,'micro'),x,narrow?yy:yy+9,narrow?'mini':'micro',narrow?C.pale:C.muted);
    this.txt(U,num(r.parameters[c.key])+u(c.unit),x+w-92,by+8,'mini',narrow?C.cyan:C.pale,{align:'right'});
    for(const [j,dir] of [-1,1].entries()){const xx=x+w-82+j*44;
     U.button('course-param-'+c.key+'-'+dir,dir<0?'−':'+',xx,by,38,bh,()=>{const v=clamp(Number((r.parameters[c.key]+dir*c.step).toPrecision(12)),c.min,c.max);this.setParameters({[c.key]:v});},{disabled:dir<0?r.parameters[c.key]<=c.min:r.parameters[c.key]>=c.max});U.buttons.at(-1).label=(dir<0?'Diminuisci ':'Aumenta ')+c.label;
    }
   });
   if(rect.h>=235){this.txt(U,this.short(m.formula,w-130,'micro'),x,rect.y+rect.h-34,'micro',C.lime);U.button('course-reset','Ripristina',x+w-116,rect.y+rect.h-42,116,bh,()=>{this.setParameters(defaults(this.id));this.time=m.fixture[0];state.yaw=0;state.pitch=.45;});}
  }else if(this.controlTab===1){
   const probes=probePoints(this.id);this.txt(U,this.short(`Prevedi come cambia y da x = ${num(probes[0])} a x = ${num(probes[1])}`,w,'micro'),x,y+50,'micro',C.pale);
   const bw=(w-6)/2;PREDICTIONS.forEach((p,i)=>U.button('course-predict-'+p,names[p],x+(i%2)*(bw+6),y+72+Math.floor(i/2)*38,bw,bh,()=>{predictCourse(this.id,r,p);this.save();},{active:r.prediction?.choice===p}));
   ['A','B'].forEach((s,i)=>U.button('course-capture-'+s,`Salva ${s}${r.snapshots[s]?' ✓':''}`,x+i*(bw+6),y+150,bw,34,()=>this.capture(s),{disabled:!r.prediction}));
   if(rect.h>=232){const results=['A','B'].map(s=>{const q=experimentResult(this.id,r.snapshots[s]);return q?`${s}: ${q.points.map(p=>num(p.y)).join(' → ')}; previsione ${q.predictionCorrect?'giusta':'da rivedere'}`:`${s}: da registrare`;});results.forEach((t,i)=>this.txt(U,this.short(t,w,'micro'),x,y+194+i*18,'micro',C.muted));}
  }else{
   const s=this.summary,bw=(w-6)/2;
   this.txt(U,this.short(`Quiz ${s.correct}/${s.total} · A/B ${s.experiments?'sì':'no'} · Diario ${s.reflectionRecorded?'sì':'no'}`,w,'micro'),x,y+50,'micro',C.lime);
   U.button('course-ack',r.acknowledgedLimits?'✓ Limiti riconosciuti':'Riconosco i limiti',x,y+72,w,34,()=>{r.acknowledgedLimits=!r.acknowledgedLimits;r.completedAt=null;this.save();},{active:r.acknowledgedLimits});
   U.button('course-complete',s.completed?'Percorso registrato':'Concludi il percorso',x,y+112,w,34,()=>{try{completeCourse(this.definition,r,this.reflection);this.save();this.api.say('Percorso registrato: attività e autoverifica, non certificazione.');}catch(e){this.api.say(e.message);}},{disabled:!s.eligible,active:s.completed});
   U.button('course-report','Rapporto JSON',x,y+154,bw,bh,()=>this.exportReport());U.button('course-csv','Dati CSV',x+bw+6,y+154,bw,bh,()=>this.exportCSV());
   if(rect.h>=216)this.rows(['Diario: almeno 60 caratteri, senza valutazione automatica.'],w,'micro').filter(Boolean).slice(0,rect.h>=236?2:1).forEach((t,i)=>this.txt(U,t,x,y+196+i*18,'micro',C.muted));
  }
 }
 sourcesUI(U,rect){
  const d=this.definition,list=[...d.sources.map(id=>this.bundle.sources.find(s=>s.id===id)),...(this.id==='math-c08'?[{id:'pilot',title:'Missione pilota: Il segnale di Simbiosi',route:'pilot'}]:[])];this.sourceIndex=clamp(this.sourceIndex,0,list.length-1);const s=list[this.sourceIndex];
  const paragraphs=[d.editorialStatus==='hand-written-draft'?`Copertura: ${d.scope}. Unità scritta per intero, in bozza da rivedere.`:`Copertura: ${d.scope}. Nucleo guidato, non manuale integrale. Testi originali: revisione scientifico-didattica umana non certificata.`,...d.objectives,...d.glossary.map(g=>g.term+': '+g.definition),`Riferimento di approfondimento ${this.sourceIndex+1}/${list.length}: ${s.title}. ${s.route?'Il collegamento apre la missione pilota locale.':'Il collegamento apre un sito esterno; nessun testo o immagine è scaricato durante l’uso del laboratorio.'}`,`Prerequisiti consigliati: ${d.prerequisites.join(', ')||'nessuno'}. Collegamento: ${d.connections.join(', ')}.`,...(d.originalSource?[`Dispensa originale: ${DOCUMENTS[docOf(d.originalSource)].title}${d.originalSource.sections?', sezioni '+d.originalSource.sections:''}, pagine stampate ${d.originalSource.printedPages[0]}-${d.originalSource.printedPages[1]}. Il pulsante «Dispensa PDF» la apre alla prima pagina.`]:[])];
  this.readingUI(U,paragraphs,rect,'Fonti, obiettivi e glossario',84);
  const x=rect.x+16,w=rect.w-32,y=rect.y+rect.h-84,bw=(w-6)/2,bh=32;
  U.button('course-source-prev','◂ Fonte',x,y,84,bh,()=>{this.sourceIndex--;this.page=0;},{disabled:this.sourceIndex===0});
  U.button('course-source-open','Apri',x+90,y,w-180,bh,()=>s.route?this.api.route(s.route):this.api.openExternal(s.url));
  U.button('course-source-next','Fonte ▸',x+w-84,y,84,bh,()=>{this.sourceIndex++;this.page=0;},{disabled:this.sourceIndex===list.length-1});
  U.button('course-original',d.originalSource?'Dispensa PDF':'Testo locale',x,y+40,bw,bh,()=>d.originalSource?this.api.openPDF(d.originalSource.pdfPages[0],docOf(d.originalSource)):this.api.download('GAIA_'+this.id+'_testo.txt',d.steps.map(s=>s.title+'\n'+s.text[rLevel(this.record)].join('\n\n')).join('\n\n'),'text/plain;charset=utf-8'));
  U.button('course-connection','Unità collegata',x+bw+6,y+40,bw,bh,()=>this.goUnit(d.connections[0]));
 }
 drawPathsUI(U,state){
  const R=this.R,pad=R.w<500?14:24,paths=this.bundle.paths,ww=R.w-pad*2;
  this.pathIndex=clamp(this.pathIndex,0,paths.length-1);const path=paths[this.pathIndex];
  U.tag('Curriculum · navigazione libera',pad,104,C.lime);
  this.txt(U,'Percorsi di studio',pad,128,R.w<500?'sub':'head',C.pale);
  const cw=(ww-15)/4;['MATEMATICA','FISICA','CHIMICA','BIOLOGIA'].forEach((name,i)=>U.button('path-select-'+i,R.w<400?['MAT','FIS','CHI','BIO'][i]:name,pad+i*(cw+5),174,cw,34,()=>{this.pathIndex=i;this.pathPage=0;},{active:this.pathIndex===i}));
  const tw=(ww-10)/3;['CLIMA','MATERIA','POPOLAZIONI'].forEach((name,j)=>{const i=j+4;U.button('path-select-'+i,name,pad+j*(tw+5),214,tw,34,()=>{this.pathIndex=i;this.pathPage=0;},{active:this.pathIndex===i});});
  const complete=path.units.filter(id=>{const r=this.store.data.courses?.[id];return r&&courseProgress(this.byId.get(id),r,this.store.data.notes['course:'+id]||'').completed;}).length;
  this.txt(U,this.short(path.title+' · '+complete+'/'+path.units.length+' percorsi registrati',ww,'mini'),pad,259,'mini',C.lime);
  const rows=Math.max(1,Math.floor((R.h-398)/68)),pages=Math.max(1,Math.ceil(path.units.length/rows));this.pathPage=clamp(this.pathPage,0,pages-1);
  path.units.slice(this.pathPage*rows,(this.pathPage+1)*rows).forEach((id,i)=>{
   const d=this.byId.get(id),r=this.store.data.courses?.[id],y=292+i*68,s=r?courseProgress(d,r,this.store.data.notes['course:'+id]||''):null;
   U.button('path-unit-'+id,'',pad,y,ww,61,()=>this.goUnit(id),{active:s?.completed});U.buttons.at(-1).label=d.title+(s?.completed?' — percorso registrato':'');
   this.rows([d.title],ww-28,'mini').filter(Boolean).slice(0,2).forEach((t,j)=>this.txt(U,t,pad+14,y+8+j*19,'mini',C.pale));
   this.txt(U,s?.completed?'Attività registrate':s?'Autoverifica '+s.correct+'/'+s.total:'Da iniziare',pad+14,y+44,'micro',s?.completed?C.lime:C.muted);
  });
  this.txt(U,'Il completamento non è una certificazione.',pad,R.h-111,'micro',C.muted);
  const bw=(ww-12)/3,by=R.h-82;
  U.button('paths-prev','◂',pad,by,bw,40,()=>this.pathPage--,{disabled:this.pathPage===0});U.buttons.at(-1).label='Pagina precedente';
  U.button('paths-catalogue','Catalogo',pad+bw+6,by,bw,40,()=>this.api.route('catalogue'));
  U.button('paths-next','▸',pad+2*(bw+6),by,bw,40,()=>this.pathPage++,{disabled:this.pathPage===pages-1});U.buttons.at(-1).label='Pagina successiva';
 }
 semanticPathsText(){const path=this.bundle.paths[this.pathIndex];return ['Percorsi di studio. La navigazione non è bloccata dai prerequisiti.',path.title,...path.units.map(id=>this.byId.get(id).title),'Il completamento registra attività e autoverifica, non certifica competenze.'].join('\n\n');}
 semanticKey(){return [this.activity.key(),JSON.stringify(this.record.activity),this.id,this.record.stage,this.record.level,this.page,this.question,this.feedback,this.view,this.controlTab,this.sourceIndex,this.time,this.mode,this.focusReading,parameterKey(this.id,this.record.parameters),JSON.stringify(this.record.answers),JSON.stringify(this.record.snapshots),this.record.completedAt,this.record.acknowledgedLimits,this.reflection].join('|');}
 semanticText(){const d=this.definition,r=this.record,m=descriptor(this.id),q=d.questions[clamp(this.question,0,d.questions.length-1)];
  if(d.activity)return [d.title,d.narrativeStatus,...d.objectives,d.steps[r.stage].title,...d.steps[r.stage].text[r.level],this.activity.semanticText(this.activityState,d.activity),...(r.stage===4?[q.prompt,...q.options.map(o=>o.id+'. '+o.text),q.options.find(o=>o.id===r.answers[q.id])?.feedback||'']:[]),...d.glossary.map(g=>g.term+': '+g.definition),...d.sources.map(id=>this.bundle.sources.find(s=>s.id===id).title),`Autoverifica ${this.summary.correct}/${this.summary.total}.`].join('\n\n');
  return [d.title,d.narrativeStatus,...d.objectives,d.steps[r.stage].title,...d.steps[r.stage].text[r.level],m.formula,`${m.xLabel}: ${num(this.time)} ${m.xUnit}. ${m.yLabel}: ${num(value(this.id,this.time,r.parameters))} ${m.yUnit}.`,...['A','B'].map(s=>{const e=experimentResult(this.id,r.snapshots[s]);return e?`${s}: `+JSON.stringify(e):`${s} non registrato.`;}),...(r.stage===4?[q.prompt,...q.options.map(o=>o.id+'. '+o.text),q.options.find(o=>o.id===r.answers[q.id])?.feedback||'']:[]),...d.glossary.map(g=>g.term+': '+g.definition),...d.sources.map(id=>this.bundle.sources.find(s=>s.id===id).title),`Autoverifica ${this.summary.correct}/${this.summary.total}. Il completamento non certifica competenze.`,this.mode==='schema'?this.scene.schematic?.caption||'':'Grafico con scale adattive; la profondità non è una variabile scientifica.'].join('\n\n');}
}
const rLevel=r=>LEVELS.includes(r.level)?r.level:'base';
