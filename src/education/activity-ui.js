/** Canvas UI for the prototype activities. Everything is laid out in a flow that pages itself,
 * so the same activity fits a desktop column and a 320-pixel phone screen. */
import {clamp,color} from '../renderer.js';
import {C} from '../ui/toolkit.js';
import {fittedRows} from './course-ui.js';
import {VSEPR_CHALLENGES,vseprInfo,vseprValid,vseprPositions,shapeOptions,checkVsepr,
 GENOTYPES,punnett,sow,chiSquare,newMystery,testcross,judgeMystery,EVIDENCE_SEEDS,
 STATEMENTS,testValue,checkStatement,activityProgress,recordSolved} from './activities.js';
const LINE={body:23,mini:17,micro:14};
const pct=x=>(Math.round(x*1000)/10).toLocaleString('it-IT')+'%';
const fmt=x=>String(x).replace('.',',').replace('-','−');
class Flow{
 constructor(owner,U,rect){this.o=owner;this.U=U;this.R=owner.R;this.rect=rect;this.items=[];this.w=rect.w-24;}
 text(t,style='mini',tint=C.pale){for(const row of fittedRows(this.R,[t],this.w,style).filter(Boolean))this.items.push({h:LINE[style],draw:(x,y)=>this.U.text(row,x,y,style,tint)});return this;}
 gap(h=6){this.items.push({h,draw:()=>{}});return this;}
 buttons(list,minW=64,h=28){const per=Math.max(1,Math.min(list.length,Math.floor((this.w+6)/(minW+6))));
  for(let i=0;i<list.length;i+=per){const chunk=list.slice(i,i+per);this.items.push({h:h+6,draw:(x,y,w)=>{const bw=(w-6*(chunk.length-1))/chunk.length;
   chunk.forEach((b,j)=>{let label=b.label;while(label.length>1&&this.R.textWidth(label,'micro',.1)>bw-10)label=label.slice(0,-1);this.U.button(b.id,label,x+j*(bw+6),y,bw,h,b.action,{active:!!b.active,disabled:!!b.disabled,small:true});this.U.buttons.at(-1).label=b.aria||b.label;});}});}
  return this;}
 canvas(h,draw){this.items.push({h,draw});return this;}
 render(key){const r=this.rect,x=r.x+12,top=r.y+10,room=r.h-54,pages=[[]];let used=0;
  for(const item of this.items){if(used+item.h>room&&pages.at(-1).length){pages.push([]);used=0;}pages.at(-1).push(item);used+=item.h;}
  const page=clamp(this.o.pages[key]||0,0,pages.length-1);this.o.pages[key]=page;let y=top;
  for(const item of pages[page]){item.draw(x,y,this.w,Math.min(item.h,room));y+=item.h;}
  const by=r.y+r.h-36;
  if(pages.length>1){this.U.button('act-page-prev','◂',x,by,40,27,()=>this.o.pages[key]=page-1,{disabled:page===0,small:true});this.U.buttons.at(-1).label='Parte precedente dell’attività';
   this.U.text(`${page+1} / ${pages.length}`,r.x+r.w/2,by+7,'micro',C.muted,{align:'center'});
   this.U.button('act-page-next','▸',r.x+r.w-52,by,40,27,()=>this.o.pages[key]=page+1,{disabled:page===pages.length-1,small:true});this.U.buttons.at(-1).label='Parte successiva dell’attività';}
  return pages.length;}
}
export class ActivityUI{
 constructor(R,api){this.R=R;this.api=api;this.reset();}
 reset(){this.pages={};this.mode=0;this.x=4;this.e=0;this.challenge=0;this.shape=null;this.revealed=false;this.message='';this.spin=0;this.last=0;
  this.p1='Aa';this.p2='Aa';this.sowings=[];this.mystery=null;this.statement=0;this.tested=null;this.verdict=null;}
 key(){return [this.mode,this.x,this.e,this.challenge,this.shape,this.revealed,this.message,this.p1,this.p2,this.sowings.length,this.mystery&&this.mystery.viola+this.mystery.bianco,this.statement,this.tested,this.verdict,JSON.stringify(this.pages)].join('|');}
 solved(state,id){recordSolved(state,id);this.api.save();const p=activityProgress(state.kind,state);this.api.say(p.done?'Attività completata: '+p.solved+' su '+p.goal+'.':'Risolti '+p.solved+' su '+p.goal+'.');}
 draw(U,rect,state,paused){
  U.panel(rect.x,rect.y,rect.w,rect.h,C.lime,.96);
  const f=new Flow(this,U,rect),p=activityProgress(state.kind,state);
  f.text(`ATTIVITÀ · ${p.solved}/${p.goal}${p.done?' · COMPLETATA':''}`,'mini',p.done?C.lime:C.amber);
  if(state.kind==='vsepr')this.vsepr(f,state,paused);else if(state.kind==='punnett')this.punnett(f,state);else this.logic(f,state);
  f.render(state.kind+':'+this.mode);
 }
 // ---------- VSEPR ----------
 vsepr(f,state,paused){
  f.buttons([{id:'act-mode-0',label:'ESPLORA',active:this.mode===0,action:()=>{this.mode=0;this.message='';}},{id:'act-mode-1',label:'SFIDA',active:this.mode===1,action:()=>{this.mode=1;this.message='';}}]);
  const step=(dx,de)=>{const x=this.x+dx,e=this.e+de;if(vseprValid(x,e)){this.x=x;this.e=e;this.revealed=false;this.message='';}};
  const controls=[{id:'act-x-minus',label:'ATOMI −',disabled:!vseprValid(this.x-1,this.e),action:()=>step(-1,0),aria:'Un atomo legato in meno'},{id:'act-x-plus',label:'ATOMI +',disabled:!vseprValid(this.x+1,this.e),action:()=>step(1,0),aria:'Un atomo legato in più'},
   {id:'act-e-minus',label:'COPPIE −',disabled:!vseprValid(this.x,this.e-1),action:()=>step(0,-1),aria:'Una coppia solitaria in meno'},{id:'act-e-plus',label:'COPPIE +',disabled:!vseprValid(this.x,this.e+1),action:()=>step(0,1),aria:'Una coppia solitaria in più'}];
  const info=vseprInfo(this.x,this.e);
  if(this.mode===0){
   f.text(`${info.notation}: ${this.x} atomi legati, ${this.e} ${this.e===1?'coppia solitaria':'coppie solitarie'}.`,'mini',C.pale);f.buttons(controls,70);
   this.molecule(f,this.x,this.e,paused);
   f.text(`Geometria elettronica: ${info.electron}. Forma della molecola: ${info.shape}.`,'mini',C.lime);f.text(`Angolo di legame: ${info.angle}. Esempi: ${info.examples}.`,'mini',C.muted);
   return;
  }
  const c=VSEPR_CHALLENGES[this.challenge%VSEPR_CHALLENGES.length],done=state.solved.includes(c.id);
  f.text(`Molecola ${this.challenge%VSEPR_CHALLENGES.length+1} di ${VSEPR_CHALLENGES.length}: ${c.formula}${done?' · risolta':''}`,'body',C.pale);f.text(c.hint,'mini',C.muted);
  f.text(`Imposta i domini: ${info.notation} (${this.x} atomi, ${this.e} coppie).`,'mini',C.pale);f.buttons(controls,70);
  f.text('Scegli la forma della molecola:','mini',C.pale);
  f.buttons(shapeOptions(c).map((s,i)=>({id:'act-shape-'+i,label:s.toUpperCase(),active:this.shape===s,action:()=>{this.shape=s;this.message='';},aria:'Forma '+s})),120);
  f.buttons([{id:'act-check',label:'VERIFICA',disabled:!this.shape,action:()=>{const r=checkVsepr(c,this.x,this.e,this.shape);this.message=r.message;this.revealed=r.ok;if(r.ok)this.solved(state,c.id);}},
   {id:'act-next',label:'ALTRA MOLECOLA',action:()=>{this.challenge=(this.challenge+1)%VSEPR_CHALLENGES.length;this.shape=null;this.revealed=false;this.message='';this.x=4;this.e=0;}}],110);
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
  if(this.revealed)this.molecule(f,c.x,c.e,paused);
 }
 molecule(f,x,e,paused){
  const pos=vseprPositions(x,e);if(!pos)return;
  f.buttons([{id:'act-rotate-left',label:'◂ RUOTA',action:()=>this.spin-=.35,aria:'Ruota la molecola a sinistra'},{id:'act-rotate-right',label:'RUOTA ▸',action:()=>this.spin+=.35,aria:'Ruota la molecola a destra'}],80,24);
  const now=typeof performance!=='undefined'?performance.now():0;if(!paused&&this.last)this.spin+=(now-this.last)/1000*.45;this.last=now;
  f.canvas(clamp(f.rect.h*.4,110,240),(x0,y0,w,h)=>{const R=this.R,cx=x0+w/2,cy=y0+h/2,L=Math.min(w*.32,h*.38),a=this.spin,tilt=.42;
   const project=v=>{const xr=v[0]*Math.cos(a)+v[2]*Math.sin(a),zr=-v[0]*Math.sin(a)+v[2]*Math.cos(a),yr=v[1]*Math.cos(tilt)-zr*Math.sin(tilt),zz=v[1]*Math.sin(tilt)+zr*Math.cos(tilt);return {x:cx+xr*L,y:cy-yr*L,z:zz};};
   const items=[...pos.atoms.map(v=>({...project(v),kind:'atom'})),...pos.lonePairs.map(v=>({...project(v.map(n=>n*.62)),kind:'pair'}))].sort((p,q)=>p.z-q.z);
   for(const p of items.filter(p=>p.z<0))this.part(p,cx,cy);
   R.roundRect(cx-15,cy-15,30,30,15,color('#e4c18b',.95),C.amber);
   for(const p of items.filter(p=>p.z>=0))this.part(p,cx,cy);
  });
 }
 part(p,cx,cy){const R=this.R,s=1+p.z*.18;
  if(p.kind==='atom'){R.line([cx,cy],[p.x,p.y],color('#9fb4b9',.85),3);R.roundRect(p.x-11*s,p.y-11*s,22*s,22*s,11*s,color('#74d8d4',.92),C.cyan);}
  else{R.roundRect(p.x-16*s,p.y-16*s,32*s,32*s,16*s,color('#b1a2df',.34),[.69,.64,.87,.8]);R.roundRect(p.x-7*s,p.y-2,4,4,2,C.purple);R.roundRect(p.x+3*s,p.y-2,4,4,2,C.purple);}
 }
 // ---------- Punnett ----------
 punnett(f,state){
  f.buttons([{id:'act-mode-0',label:'INCROCI',active:this.mode===0,action:()=>{this.mode=0;this.message='';}},{id:'act-mode-1',label:'PIANTE MISTERIOSE',active:this.mode===1,action:()=>{this.mode=1;this.message='';if(!this.mystery)this.mystery=newMystery();}}],100);
  if(this.mode===0){
   for(const [k,label] of [['p1','GENITORE 1'],['p2','GENITORE 2']])f.buttons(GENOTYPES.map(g=>({id:`act-${k}-${g}`,label:`${label.slice(-1)}: ${g}`,active:this[k]===g,action:()=>{this[k]=g;this.sowings=[];},aria:`${label}: genotipo ${g}`})),60);
   const t=punnett(this.p1,this.p2);
   f.canvas(Math.min(150,Math.max(104,f.rect.h*.3)),(x,y,w,h)=>this.grid(x,y,w,h,t));
   f.text(`Attesi: fiori viola ${pct(t.phenotype.viola)}, bianchi ${pct(t.phenotype.bianco)}. Genotipi: AA ${pct(t.genotype.AA)}, Aa ${pct(t.genotype.Aa)}, aa ${pct(t.genotype.aa)}.`,'mini',C.pale);
   f.buttons([20,100,1000].map(n=>({id:'act-sow-'+n,label:'SEMINA '+n,action:()=>{const s=sow(this.p1,this.p2,n);const exp={viola:n*t.phenotype.viola,bianco:n*t.phenotype.bianco};s.chi=chiSquare({viola:s.viola,bianco:s.bianco},exp);this.sowings=[s,...this.sowings].slice(0,4);},aria:`Semina ${n} semi e conta i fiori`})),80);
   for(const [i,s] of this.sowings.entries()){const e=s.n*t.phenotype.bianco;f.text(`${i===0?'Ultima semina':'Semina precedente'} (${s.n}): viola ${s.viola}, bianchi ${s.bianco}; attesi ${fmt(Math.round(e*10)/10)} bianchi${s.chi===null?'':`; chi quadro ${fmt(Math.round(s.chi*100)/100)}${s.chi>3.84?' (scarto grande)':''}`}.`,'mini',i===0?C.lime:C.muted);}
   return;
  }
  const m=this.mystery||(this.mystery=newMystery()),n=state.solved.length+1,total=m.viola+m.bianco;
  f.text(`Pianta misteriosa ${Math.min(n,3)} di 3: fiori viola, genotipo AA oppure Aa.`,'body',C.pale);
  f.text('Incrociala con una pianta bianca aa e osserva i figli.','mini',C.muted);
  f.buttons([{id:'act-cross-1',label:'INCROCIA: 1 SEME',action:()=>{testcross(m,1);this.message='';}},{id:'act-cross-10',label:'INCROCIA: 10 SEMI',action:()=>{testcross(m,10);this.message='';}}],110);
  f.text(`Figli finora: ${total} (viola ${m.viola}, bianchi ${m.bianco}).`,'mini',C.lime);
  f.buttons([{id:'act-answer-AA',label:'È AA',action:()=>this.answer(state,'AA'),disabled:!total},{id:'act-answer-Aa',label:'È Aa',action:()=>this.answer(state,'Aa'),disabled:!total}],80);
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
  if(this.revealed)f.buttons([{id:'act-new-mystery',label:'NUOVA PIANTA',action:()=>{this.mystery=newMystery();this.revealed=false;this.message='';}}],100);
  f.text(`Regola della serra: decidi «AA» solo dopo almeno ${EVIDENCE_SEEDS} figli tutti viola.`,'micro',C.muted);
 }
 answer(state,g){const m=this.mystery,r=judgeMystery(m,g);this.message=r.message;this.revealed=r.ok;
  const total=m.viola+m.bianco;if(r.ok)this.solved(state,'mistero-'+Math.min(9,state.solved.length+1));else if(total>=EVIDENCE_SEEDS&&(g==='AA')===(m.hidden==='Aa')&&!(g==='Aa'&&m.bianco===0)){this.revealed=true;this.message+=' La pianta era '+m.hidden+'. Prova con una nuova pianta.';}}
 grid(x,y,w,h,t){const R=this.R,size=Math.min((w-40)/2,(h-24)/2),gx=x+(w-2*size-34)/2+34,gy=y+20;
  t.cols.forEach((g,j)=>this.centre(g,gx+j*size+size/2,y+2,'mini',C.amber));t.rows.forEach((g,i)=>this.centre(g,gx-18,gy+i*size+size/2-7,'mini',C.amber));
  t.cells.forEach((row,i)=>row.forEach((g,j)=>{const white=g==='aa';R.roundRect(gx+j*size+2,gy+i*size+2,size-4,size-4,8,color(white?'#e5f0ec':'#b1a2df',white?.16:.34),white?C.pale:C.purple);this.centre(g,gx+j*size+size/2,gy+i*size+size/2-8,'body',C.pale);}));}
 centre(t,x,y,style,tint){this.R.text(t,x,y,style,tint,{align:'center'});}
 // ---------- Quantifiers ----------
 logic(f,state){
  const n=STATEMENTS.length,s=STATEMENTS[this.statement%n],done=state.solved.includes(s.id),go=k=>{this.statement=(this.statement+k+n)%n;this.tested=null;this.verdict=null;this.message='';this.revealed=false;};
  f.buttons([{id:'act-statement-prev',label:'◂',action:()=>go(-1),aria:'Proposizione precedente'},{id:'act-statement-index',label:`${this.statement%n+1} / ${n}${done?' ✓':''}`,action:()=>{},aria:`Proposizione ${this.statement%n+1} di ${n}`},{id:'act-statement-next',label:'▸',action:()=>go(1),aria:'Proposizione successiva'}],40);
  f.text(s.text,'body',C.pale);
  f.text(s.kind==='all'?'Proposizione universale: prova alcuni valori.':'Proposizione esistenziale: prova alcuni valori.','mini',C.muted);
  f.buttons(s.values.map(v=>({id:'act-value-'+String(v).replace('.','_').replace('-','m'),label:fmt(v),active:this.tested===v,action:()=>{this.tested=v;this.message='';},aria:'Prova il valore '+fmt(v)})),44);
  if(this.tested!==null){const r=testValue(s,this.tested);f.text(`${s.kind==='all'?'n':'Valore'} = ${fmt(this.tested)}: ${r.text}. L’enunciato ${r.holds?'vale':'non vale'} per questo valore.`,'mini',r.holds?C.lime:C.amber);}
  f.buttons([{id:'act-verdict-true',label:'È VERA',active:this.verdict==='vera',action:()=>{this.verdict='vera';this.message='';}},{id:'act-verdict-false',label:'È FALSA',active:this.verdict==='falsa',action:()=>{this.verdict='falsa';this.message='';}}],80);
  if(this.verdict==='falsa'&&s.kind==='all')f.text(this.tested===null?'Per una proposizione «per ogni» falsa scegli un controesempio tra i valori.':`Controesempio proposto: ${fmt(this.tested)}.`,'mini',C.muted);
  f.buttons([{id:'act-check',label:'VERIFICA',disabled:!this.verdict,action:()=>{const r=checkStatement(s,this.verdict,s.kind==='all'&&this.verdict==='falsa'?this.tested:null);this.message=r.message;this.revealed=r.ok;if(r.ok)this.solved(state,s.id);}}],100);
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
 }
 semanticText(state){const p=activityProgress(state.kind,state),head=`Attività: ${p.solved} su ${p.goal} risolti.`;
  if(state.kind==='vsepr'){const i=vseprInfo(this.x,this.e);if(this.mode===0)return `${head} Esplora: ${i.notation}, geometria elettronica ${i.electron}, forma ${i.shape}, angolo ${i.angle}.`;const c=VSEPR_CHALLENGES[this.challenge%VSEPR_CHALLENGES.length];return `${head} Sfida: ${c.formula}. ${c.hint} Domini impostati: ${i.notation}. Forma scelta: ${this.shape||'nessuna'}. ${this.message}`;}
  if(state.kind==='punnett'){if(this.mode===0){const t=punnett(this.p1,this.p2);return `${head} Incrocio ${this.p1} per ${this.p2}: attesi viola ${pct(t.phenotype.viola)}, bianchi ${pct(t.phenotype.bianco)}. ${this.sowings.map(s=>`Semina di ${s.n}: viola ${s.viola}, bianchi ${s.bianco}.`).join(' ')}`;}const m=this.mystery;return `${head} Pianta misteriosa: figli viola ${m?.viola||0}, bianchi ${m?.bianco||0}. ${this.message}`;}
  const s=STATEMENTS[this.statement%STATEMENTS.length];return `${head} ${s.text} ${this.tested===null?'':`Valore provato ${fmt(this.tested)}: ${testValue(s,this.tested).holds?'vale':'non vale'}.`} ${this.message}`;}
}
