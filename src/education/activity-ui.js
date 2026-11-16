/** Canvas UI for the activities of the hand-written units. Everything is laid out in a flow that pages itself,
 * so the same activity fits a desktop column and a 320-pixel phone screen. */
import {clamp,color} from '../renderer.js';
import {C} from '../ui/toolkit.js';
import {fittedRows} from './course-ui.js';
import {VSEPR_CHALLENGES,vseprInfo,vseprValid,vseprPositions,shapeOptions,checkVsepr,
 GENOTYPES,punnett,sow,chiSquare,newMystery,testcross,judgeMystery,EVIDENCE_SEEDS,
 STATEMENTS,testValue,checkStatement,activityProgress,recordSolved,
 BISECTION_TASKS,checkGuarantee,bisectionStep,signWord,formatNumber,
 IONIC_CHALLENGES,ion,ionLabel,signed,checkIonic,checkCard,checkOrder,scrambled,
 fitData,fitError,fitStart,fitStep,checkFit,checkStep} from './activities.js';
import {descriptor,samples} from '../models/curriculum.js';
const LINE={body:25,mini:20,micro:18};
const pct=x=>(Math.round(x*1000)/10).toLocaleString('it-IT')+'%';
const fmt=x=>String(x).replace('.',',').replace('-','−');
class Flow{
 constructor(owner,U,rect){this.o=owner;this.U=U;this.R=owner.R;this.rect=rect;this.items=[];this.w=rect.w-24;}
 text(t,style='mini',tint=C.pale){for(const row of fittedRows(this.R,[t],this.w,style).filter(Boolean))this.items.push({h:LINE[style],draw:(x,y)=>this.U.text(row,x,y,style,tint)});return this;}
 gap(h=6){this.items.push({h,draw:()=>{}});return this;}
 buttons(list,minW=64,h=34){const per=Math.max(1,Math.min(list.length,Math.floor((this.w+6)/(minW+6))));
  for(let i=0;i<list.length;i+=per){const chunk=list.slice(i,i+per);this.items.push({h:h+6,draw:(x,y,w)=>{const bw=(w-6*(chunk.length-1))/chunk.length;
   chunk.forEach((b,j)=>{this.U.button(b.id,b.label,x+j*(bw+6),y,bw,h,b.action,{active:!!b.active,disabled:!!b.disabled});this.U.buttons.at(-1).label=b.aria||b.label;});}});}
  return this;}
 canvas(h,draw){this.items.push({h,draw});return this;}
 /** One line of text with small buttons on its right, for lists that the student reorders. */
 row(t,list,style='mini',tint=C.pale){const bw=44,gap=6,rows=fittedRows(this.R,[t],this.w-list.length*(bw+gap)-4,style).filter(Boolean),h=Math.max(38,rows.length*LINE[style]+8);
  this.items.push({h:h+4,draw:(x,y,w)=>{rows.forEach((row,i)=>this.U.text(row,x,y+Math.max(4,(h-rows.length*LINE[style])/2)+i*LINE[style],style,tint));
   list.forEach((b,j)=>{this.U.button(b.id,b.label,x+w-(list.length-j)*(bw+gap)+gap,y+(h-34)/2,bw,34,b.action,{active:!!b.active,disabled:!!b.disabled});this.U.buttons.at(-1).label=b.aria||b.label;});}});
  return this;}
 /** Marks the next item: when the token passed to render changes, the flow opens the page that contains it. */
 mark(){this.focus=this.items.length;return this;}
 /** Items between begin() and end() stay on the same page whenever they fit in one. */
 begin(){this.gs=this.items.length;return this;}
 end(){for(let i=this.gs;i<this.items.length;i++)this.items[i].group=this.gs;return this;}
 render(key,token){const r=this.rect,x=r.x+12,top=r.y+12,room=r.h-60,pages=[[]],pageOf=[];let used=0;
  this.items.forEach((item,i)=>{const head=item.group===i,gh=head?this.items.filter(o=>o.group===i).reduce((a,o)=>a+o.h,0):item.h;
   if((head&&gh<=room?used+gh:used+item.h)>room&&pages.at(-1).length){pages.push([]);used=0;}pages.at(-1).push(item);pageOf.push(pages.length-1);used+=item.h;});
  if(token!==undefined&&this.o.pageTokens[key]!==token){this.o.pageTokens[key]=token;if(this.focus!==undefined)this.o.pages[key]=pageOf[Math.min(this.focus,pageOf.length-1)];}
  const page=clamp(this.o.pages[key]||0,0,pages.length-1);this.o.pages[key]=page;let y=top;
  for(const item of pages[page]){item.draw(x,y,this.w,Math.min(item.h,room));y+=item.h;}
  const by=r.y+r.h-42;
  if(pages.length>1){this.U.button('act-page-prev','◂',x,by,44,32,()=>this.o.pages[key]=page-1,{disabled:page===0});this.U.buttons.at(-1).label='Parte precedente dell’attività';
   this.U.text(`${page+1} / ${pages.length}`,r.x+r.w/2,by+9,'micro',C.muted,{align:'center'});
   this.U.button('act-page-next','▸',r.x+r.w-56,by,44,32,()=>this.o.pages[key]=page+1,{disabled:page===pages.length-1});this.U.buttons.at(-1).label='Parte successiva dell’attività';}
  return pages.length;}
}
export class ActivityUI{
 constructor(R,api){this.R=R;this.api=api;this.reset();}
 reset(){this.pages={};this.pageTokens={};this.focusToken=undefined;this.mode=0;this.x=4;this.e=0;this.challenge=0;this.shape=null;this.revealed=false;this.message='';this.spin=0;this.last=0;
  this.p1='Aa';this.p2='Aa';this.sowings=[];this.mystery=null;this.statement=0;this.tested=null;this.verdict=null;
  this.round=0;this.orders={};this.fits={};this.fitTries={};this.task=0;this.compound=0;this.resetRound();this.startTask();this.startCompound();}
 resetRound(){this.card=0;this.errors=0;this.cardDone=false;this.choice=null;this.message='';this.revealed=false;}
 startTask(){const t=BISECTION_TASKS[this.task%BISECTION_TASKS.length];this.phase='ask';this.ba=t.a;this.bb=t.b;this.halvings=0;this.message='';this.revealed=false;}
 startCompound(){const c=IONIC_CHALLENGES[this.compound%IONIC_CHALLENGES.length],C=ion(c.cation),A=ion(c.anion);this.qc=C.polyatomic?C.charge:null;this.qa=A.polyatomic?A.charge:null;this.n=1;this.m=1;this.message='';this.revealed=false;}
 key(){return [this.mode,this.x,this.e,this.challenge,this.shape,this.revealed,this.message,this.p1,this.p2,this.sowings.length,this.mystery&&this.mystery.viola+this.mystery.bianco,this.statement,this.tested,this.verdict,
  this.round,this.card,this.errors,this.cardDone,this.choice,JSON.stringify(this.orders),JSON.stringify(this.fits),this.task,this.phase,this.ba,this.bb,this.compound,this.qc,this.qa,this.n,this.m,JSON.stringify(this.pages)].join('|');}
 solved(state,id){recordSolved(state,id);this.api.save();const p=activityProgress(this.def||state.kind,state);this.api.say(p.done?'Attività completata: '+p.solved+' su '+p.goal+'.':'Risolti '+p.solved+' su '+p.goal+'.');}
 /** def: the unit's activity object; the 'cards' rounds come from it. */
 draw(U,rect,state,paused,def=state.kind){
  this.def=def;this.focusToken=undefined;U.panel(rect.x,rect.y,rect.w,rect.h,C.lime,.96);
  const f=new Flow(this,U,rect),p=activityProgress(def,state);
  f.text(`Attività · ${p.solved}/${p.goal}${p.done?' · completata':''}`,'mini',p.done?C.lime:C.amber);
  const kind=state.kind;
  if(kind==='vsepr')this.vsepr(f,state,paused);else if(kind==='punnett')this.punnett(f,state);else if(kind==='cards')this.cards(f,state,def);
  else if(kind==='fit')this.fit(f,state,def);else if(kind==='steps')this.steps(f,state,def);
  else if(kind==='bisection')this.bisection(f,state);else if(kind==='ionic')this.ionic(f,state);else this.logic(f,state);
  f.render(kind+':'+(['cards','fit','steps'].includes(kind)?this.round:kind==='bisection'?this.task:kind==='ionic'?this.compound:this.mode),this.focusToken);
 }
 /** Three-button header to move between the items of an activity. */
 pager(f,prefix,label,index,n,done,go,what){f.buttons([{id:`act-${prefix}-prev`,label:'◂',action:()=>go(-1),aria:what+' precedente'},{id:`act-${prefix}-index`,label:`${label} ${index+1} / ${n}${done?' ✓':''}`,action:()=>{},aria:`${what} ${index+1} di ${n}${done?', risolta':''}`},{id:`act-${prefix}-next`,label:'▸',action:()=>go(1),aria:what+' successiva'}],40);}
 // ---------- Cards: classify or order ----------
 cards(f,state,def){
  const n=def.rounds.length,r=def.rounds[this.round%n],go=k=>{this.round=(this.round+k+n)%n;this.resetRound();};
  this.pager(f,'round','SERIE',this.round%n,n,state.solved.includes(r.id),go,'Serie');
  f.text(r.title,'body',C.pale);f.text(r.prompt,'mini',C.muted);
  if(r.type==='classify')this.classify(f,state,r);else this.ordering(f,state,r);
 }
 classify(f,state,r){
  const total=r.items.length;
  if(this.card>=total){const ok=this.errors<=r.maxErrors;
   f.text(ok?`Serie superata con ${this.errors} ${this.errors===1?'errore':'errori'}. ${r.explain}`:`Serie conclusa con ${this.errors} errori: per superarla ne servono al massimo ${r.maxErrors}. Rileggi le spiegazioni delle carte e ricomincia.`,'mini',ok?C.lime:C.amber);
   f.buttons([{id:'act-round-restart',label:'RICOMINCIA LA SERIE',action:()=>this.resetRound()}],140);return;}
  const it=r.items[this.card];
  f.text(`Carta ${this.card+1} di ${total} · errori ${this.errors}, al massimo ${r.maxErrors}`,'mini',C.muted);
  f.text(it.text,'body',C.pale);
  f.buttons(r.categories.map((c,i)=>({id:'act-cat-'+i,label:c.label,active:this.choice===c.id,disabled:this.cardDone,aria:'Categoria '+c.label,
   action:()=>{const res=checkCard(r,this.card,c.id);this.choice=c.id;this.message=res.message;this.revealed=res.ok;if(res.ok)this.cardDone=true;else this.errors++;}})),Math.max(96,...r.categories.map(c=>this.R.textWidth(c.label,'micro',.1)+14)));
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
  if(this.cardDone)f.buttons([{id:'act-card-next',label:this.card+1<total?'CARTA SUCCESSIVA':'CONCLUDI LA SERIE',action:()=>{this.card++;this.cardDone=false;this.choice=null;this.message='';this.revealed=false;if(this.card>=total&&this.errors<=r.maxErrors)this.solved(state,r.id);}}],140);
 }
 orderFor(r){if(!Array.isArray(this.orders[r.id]))this.orders[r.id]=scrambled(r);return this.orders[r.id];}
 ordering(f,state,r){
  const ids=this.orderFor(r),byId=new Map(r.items.map(it=>[it.id,it])),swap=(i,j)=>{[ids[i],ids[j]]=[ids[j],ids[i]];this.message='';this.revealed=false;};
  // The check and its message come before the list, so they stay on the first page when the list pages itself.
  f.buttons([{id:'act-check',label:'VERIFICA L’ORDINE',action:()=>{const res=checkOrder(r,ids);this.message=res.message;this.revealed=res.ok;if(res.ok)this.solved(state,r.id);}}],120);
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
  ids.forEach((id,i)=>{const t=byId.get(id).text;f.row(`${i+1}. ${t}`,[{id:'act-up-'+i,label:'↑',disabled:i===0,action:()=>swap(i,i-1),aria:'Sposta in su: '+t},{id:'act-down-'+i,label:'↓',disabled:i===ids.length-1,action:()=>swap(i,i+1),aria:'Sposta in giù: '+t}]);});
 }
 // ---------- Fit: model and data ----------
 fitParams(r){if(!this.fits[r.id])this.fits[r.id]=fitStart(r);return this.fits[r.id];}
 fit(f,state,def){
  const n=def.rounds.length,r=def.rounds[this.round%n],go=k=>{this.round=(this.round+k+n)%n;this.resetRound();},m=descriptor(r.model),p=this.fitParams(r),num=x=>formatNumber(x,4);
  this.pager(f,'round','SERIE',this.round%n,n,state.solved.includes(r.id),go,'Serie di dati');
  f.text(r.title,'body',C.pale);f.text(r.prompt,'mini',C.muted);
  this.focusToken='fit:'+r.id;f.mark().begin();
  f.canvas(clamp(f.rect.h*.28,100,220),(x,y,w,h)=>this.fitPlot(x,y,w,h,r,p,m));
  for(const key of r.fit){const c=m.controls.find(c=>c.key===key),unit=c.unit==='1'?'':' '+c.unit,set=d=>{this.fits[r.id]=fitStep(r,p,key,d);this.message='';this.revealed=false;};
   f.row(`${c.label}: ${num(p[key])}${unit}`,[{id:`act-fit-${key}-minus`,label:'−',disabled:p[key]<=c.min,action:()=>set(-1),aria:c.label+': diminuisci'},{id:`act-fit-${key}-plus`,label:'+',disabled:p[key]>=c.max,action:()=>set(1),aria:c.label+': aumenta'}]);}
  f.text(`Scarto quadratico medio: ${formatNumber(fitError(r,p),3)} ${m.yUnit==='1'?'':m.yUnit}`,'mini',C.pale);
  f.buttons([{id:'act-check',label:'VERIFICA',action:()=>{const t=this.fitTries[r.id]||0,res=checkFit(r,p,t);this.fitTries[r.id]=t+1;this.message=res.message;this.revealed=res.ok;if(res.ok)this.solved(state,r.id);}}],100);
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
  f.end();
  const fixed=m.controls.filter(c=>!r.fit.includes(c.key));if(fixed.length){const t='Fissati: '+fixed.map(c=>`${c.label} ${num(p[c.key])}${c.unit==='1'?'':' '+c.unit}`).join('; ');f.text(t.endsWith('.')?t:t+'.','micro',C.muted);}
 }
 fitPlot(x0,y0,w,h,r,p,m){const R=this.R,pad=10,data=fitData(r),xs=data.map(q=>q.x),span=Math.max(...xs)-Math.min(...xs)||1;
  const lo=Math.max(m.domain[0],Math.min(...xs)-span*.08),hi=Math.min(m.domain[1],Math.max(...xs)+span*.08);
  const curve=samples(r.model,p,m.discrete?121:161).filter(q=>q.y!==null&&q.x>=lo-1e-12&&q.x<=hi+1e-12),ys=[...data.map(q=>q.y),...curve.map(q=>q.y)];
  let ylo=Math.min(...ys),yhi=Math.max(...ys);const dy=(yhi-ylo)||Math.abs(yhi)||1;ylo-=dy*.08;yhi+=dy*.08;
  const top=18,bottom=18,X=v=>x0+pad+(v-lo)/(hi-lo||1)*(w-2*pad),Y=v=>y0+h-bottom-(v-ylo)/(yhi-ylo)*(h-top-bottom),unit=u=>u==='1'?'':` [${u}]`;
  R.rect(x0,y0,w,h,color('#0d2a33',.5));
  if(ylo<0&&yhi>0)R.line([x0+pad,Y(0)],[x0+w-pad,Y(0)],color('#9fb4b9',.5),1);
  if(m.discrete)for(const q of curve)R.roundRect(X(q.x)-3,Y(q.y)-3,6,6,3,C.cyan);
  else for(let i=1;i<curve.length;i++)R.line([X(curve[i-1].x),Y(curve[i-1].y)],[X(curve[i].x),Y(curve[i].y)],C.cyan,2);
  for(const q of data)R.roundRect(X(q.x)-5,Y(q.y)-5,10,10,2,color('#e4c18b',.9),C.amber);
  this.R.text(m.xLabel+unit(m.xUnit),x0+w-pad,y0+h-14,'micro',C.muted,{align:'right'});this.R.text(m.yLabel+unit(m.yUnit),x0+pad,y0+3,'micro',C.muted);}
 // ---------- Steps: guided problems ----------
 steps(f,state,def){
  const n=def.problems.length,pr=def.problems[this.round%n],go=k=>{this.round=(this.round+k+n)%n;this.resetRound();},total=pr.steps.length;
  this.pager(f,'round','PROBLEMA',this.round%n,n,state.solved.includes(pr.id),go,'Problema');
  f.text(pr.title,'body',C.pale);f.text(pr.text,'mini',C.pale);
  for(let i=0;i<Math.min(this.card,total);i++)f.text('✓ '+pr.steps[i].result,'mini',C.lime);
  if(this.card>=total){const ok=this.errors<=pr.maxErrors;
   f.text(ok?`Problema risolto con ${this.errors} ${this.errors===1?'errore':'errori'}. ${pr.explain}`:`Problema concluso con ${this.errors} errori: per superarlo ne servono al massimo ${pr.maxErrors}. Rileggi i commenti e ricomincia.`,'mini',ok?C.lime:C.amber);
   f.buttons([{id:'act-round-restart',label:'RICOMINCIA IL PROBLEMA',action:()=>this.resetRound()}],150);return;}
  const st=pr.steps[this.card];this.focusToken=`${this.round}:${this.card}`;f.mark();
  f.text(`Passo ${this.card+1} di ${total} · errori ${this.errors}, al massimo ${pr.maxErrors}`,'micro',C.muted);
  f.text(st.prompt,'mini',C.amber);
  // Feedback and the next step come before the options, so they stay on the page the student is reading.
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
  if(this.cardDone)f.buttons([{id:'act-step-next',label:this.card+1<total?'PASSO SUCCESSIVO':'CONCLUDI IL PROBLEMA',action:()=>{this.card++;this.cardDone=false;this.choice=null;this.message='';this.revealed=false;if(this.card>=total&&this.errors<=pr.maxErrors)this.solved(state,pr.id);}}],150);
  st.options.forEach((o,i)=>f.row(`${'ABCD'[i]}. ${o.text}`,[{id:'act-option-'+i,label:'ABCD'[i],active:this.choice===i,disabled:this.cardDone,aria:`Risposta ${'ABCD'[i]}: ${o.text}`,
   action:()=>{const res=checkStep(pr,this.card,i);this.choice=i;this.message=res.message;this.revealed=res.ok;if(res.ok)this.cardDone=true;else this.errors++;}}]));
 }
 // ---------- Bisection ----------
 bisection(f,state){
  const n=BISECTION_TASKS.length,t=BISECTION_TASKS[this.task%n],go=k=>{this.task=(this.task+k+n)%n;this.startTask();},num=x=>formatNumber(x);
  this.pager(f,'task','FUNZIONE',this.task%n,n,state.solved.includes(t.id),go,'Funzione');
  f.text(`${t.label} su [${num(t.a)}; ${num(t.b)}]`,'body',C.pale);
  f.canvas(clamp(f.rect.h*.3,96,190),(x,y,w,h)=>this.plot(x,y,w,h,t));
  if(this.phase==='ask'){
   f.text(`f(${num(t.a)}) = ${num(t.f(t.a))} e f(${num(t.b)}) = ${num(t.f(t.b))}. Il teorema degli zeri garantisce almeno una radice nell’intervallo?`,'mini',C.pale);
   f.buttons([{id:'act-guarantee-yes',label:'SÌ, È GARANTITA',action:()=>this.guarantee(state,t,true)},{id:'act-guarantee-no',label:'NO, NON È GARANTITA',action:()=>this.guarantee(state,t,false)}],130);
  }else if(this.phase==='halve'){
   const a=this.ba,b=this.bb,m=(a+b)/2;
   f.text(`Dimezzamento ${this.halvings+1} di ${t.steps}. Intervallo [${num(a)}; ${num(b)}], ampiezza ${num(b-a)}.`,'mini',C.pale);
   f.text(`f(${num(a)}) è ${signWord(t.f(a))}, f(${num(b)}) è ${signWord(t.f(b))}. Punto medio m = ${num(m)}: f(m) = ${num(t.f(m))}.`,'mini',C.lime);
   f.buttons([{id:'act-keep-left',label:`TIENI [${num(a)}; ${num(m)}]`,action:()=>this.halve(state,t,'left'),aria:'Tieni la metà sinistra'},{id:'act-keep-right',label:`TIENI [${num(m)}; ${num(b)}]`,action:()=>this.halve(state,t,'right'),aria:'Tieni la metà destra'}],130);
  }
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
  if(this.phase==='done')f.buttons([{id:'act-next',label:'FUNZIONE SUCCESSIVA',action:()=>go(1)}],140);
 }
 guarantee(state,t,answer){const r=checkGuarantee(t,answer);this.message=r.message;this.revealed=r.ok;if(!r.ok)return;if(t.guaranteed)this.phase='halve';else{this.phase='done';this.solved(state,t.id);}}
 halve(state,t,side){const r=bisectionStep(t,this.ba,this.bb,side),num=x=>formatNumber(x);this.message=r.message;this.revealed=r.ok;if(!r.ok)return;this.ba=r.a;this.bb=r.b;this.halvings++;
  if(this.halvings>=t.steps||r.exact){this.phase='done';this.message+=` Stima finale: ${num((r.a+r.b)/2)}, con errore al massimo ${num((r.b-r.a)/2)}. ${t.note}`;this.solved(state,t.id);}}
 plot(x0,y0,w,h,t){const R=this.R,pad=8,X=v=>x0+pad+(v-t.a)/(t.b-t.a)*(w-2*pad),pts=[];
  for(let i=0;i<=120;i++){const v=t.a+(t.b-t.a)*i/120,y=t.f(v);pts.push({v,y:Number.isFinite(y)&&Math.abs(y)<1e6?y:null});}
  const ys=pts.filter(p=>p.y!==null).map(p=>p.y),lo=Math.max(Math.min(0,...ys),-3),hi=Math.min(Math.max(0,...ys),3),Y=v=>y0+h-pad-(clamp(v,lo,hi)-lo)/(hi-lo||1)*(h-2*pad);
  R.rect(X(this.ba),y0+2,Math.max(2,X(this.bb)-X(this.ba)),h-4,color('#b6e36b',.16));
  R.line([x0+pad,Y(0)],[x0+w-pad,Y(0)],color('#9fb4b9',.6),1);
  for(let i=1;i<pts.length;i++){const p=pts[i-1],q=pts[i];if(p.y===null||q.y===null||Math.sign(p.v)!==Math.sign(q.v)&&t.id==='reciproco')continue;R.line([X(p.v),Y(p.y)],[X(q.v),Y(q.y)],C.cyan,2);}
  if(this.phase==='halve'){const m=(this.ba+this.bb)/2;R.line([X(m),y0+4],[X(m),y0+h-4],color('#e4c18b',.8),1);}
  this.centre(formatNumber(t.a),x0+pad+10,y0+h-pad-12,'micro',C.muted);this.centre(formatNumber(t.b),x0+w-pad-10,y0+h-pad-12,'micro',C.muted);}
 // ---------- Ionic compounds ----------
 ionic(f,state){
  const n=IONIC_CHALLENGES.length,c=IONIC_CHALLENGES[this.compound%n],cat=ion(c.cation),an=ion(c.anion),go=k=>{this.compound=(this.compound+k+n)%n;this.startCompound();};
  this.pager(f,'compound','COMPOSTO',this.compound%n,n,state.solved.includes(c.id),go,'Composto');
  f.text(`Scrivi la formula del ${c.name}.`,'body',C.pale);
  const choose=(key,i,qs)=>{if(i.polyatomic){f.text(`${key==='qc'?'Catione':'Anione'}: ione ${i.name} ${ionLabel(i)}, carica ${signed(i.charge)}.`,'mini',C.pale);return;}
   f.row(`${key==='qc'?'Catione':'Anione'}: ${i.symbol}, ${i.name}, gruppo ${i.group}. Che carica ha?`,qs.map(q=>({id:`act-${key}-${Math.abs(q)}`,label:signed(q),active:this[key]===q,action:()=>{this[key]=q;this.message='';this.revealed=false;},aria:`Carica ${signed(q)}`})));};
  choose('qc',cat,[1,2,3]);choose('qa',an,[-1,-2,-3]);
  const set=(k,d)=>{this[k]=clamp(this[k]+d,1,4);this.message='';this.revealed=false;};
  f.buttons([{id:'act-n-minus',label:'CATIONI −',disabled:this.n<=1,action:()=>set('n',-1),aria:'Un catione in meno'},{id:'act-n-plus',label:'CATIONI +',disabled:this.n>=4,action:()=>set('n',1),aria:'Un catione in più'},
   {id:'act-m-minus',label:'ANIONI −',disabled:this.m<=1,action:()=>set('m',-1),aria:'Un anione in meno'},{id:'act-m-plus',label:'ANIONI +',disabled:this.m>=4,action:()=>set('m',1),aria:'Un anione in più'}],80);
  f.canvas(48,(x,y,w,h)=>this.tokens(x,y,w,h,cat,an));
  if(this.qc&&this.qa){const tot=this.n*this.qc+this.m*this.qa;f.text(`Carica totale: ${this.n} · (${signed(this.qc)}) + ${this.m} · (${signed(this.qa)}) = ${tot===0?'0':signed(tot)}`,'mini',tot===0?C.lime:C.amber);}
  else f.text('Scegli prima le cariche dei due ioni.','mini',C.muted);
  f.buttons([{id:'act-check',label:'VERIFICA',disabled:!this.qc||!this.qa,action:()=>{const r=checkIonic(c,this.qc,this.qa,this.n,this.m);this.message=r.message;this.revealed=r.ok;if(r.ok)this.solved(state,c.id);}},{id:'act-next',label:'ALTRO COMPOSTO',action:()=>go(1)}],110);
  if(this.message)f.text(this.message,'mini',this.revealed?C.lime:C.amber);
 }
 tokens(x,y,w,h,cat,an){const R=this.R,k=this.n+this.m,size=Math.min(44,(w-8)/k-6);let px=x+(w-k*(size+6))/2;
  const one=(i,fill,edge)=>{R.roundRect(px,y+(h-size)/2,size,size,size/2,fill,edge);this.centre(ionLabel(i),px+size/2,y+h/2-7,size>34?'mini':'micro',C.pale);px+=size+6;};
  for(let i=0;i<this.n;i++)one(cat,color('#e4c18b',.3),C.amber);for(let i=0;i<this.m;i++)one(an,color('#74d8d4',.3),C.cyan);}
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
 semanticText(state,def=state.kind){const p=activityProgress(def,state),head=`Attività: ${p.solved} su ${p.goal} risolti.`,num=x=>formatNumber(x);
  if(state.kind==='cards'){const r=def.rounds[this.round%def.rounds.length];if(r.type==='classify'){const it=r.items[this.card];return `${head} Serie: ${r.title}. ${r.prompt} ${it?`Carta ${this.card+1} di ${r.items.length}: ${it.text}. Categorie: ${r.categories.map(c=>c.label).join(', ')}.`:''} Errori: ${this.errors}. ${this.message}`;}
   const byId=new Map(r.items.map(it=>[it.id,it.text]));return `${head} Serie: ${r.title}. ${r.prompt} Ordine attuale: ${this.orderFor(r).map((id,i)=>`${i+1}. ${byId.get(id)}`).join('; ')}. ${this.message}`;}
  if(state.kind==='fit'){const r=def.rounds[this.round%def.rounds.length],p=this.fitParams(r),m=descriptor(r.model);return `${head} Serie: ${r.title}. ${r.prompt} Punti misurati: ${fitData(r).map(q=>`(${num(q.x)}; ${num(q.y)})`).join(', ')}. Parametri: ${m.controls.map(c=>`${c.label} ${num(p[c.key])}`).join(', ')}. Scarto quadratico medio ${num(fitError(r,p))}. ${this.message}`;}
  if(state.kind==='steps'){const pr=def.problems[this.round%def.problems.length],st=pr.steps[this.card];return `${head} Problema: ${pr.title}. ${pr.text} ${pr.steps.slice(0,this.card).map(s=>s.result).join(' ')} ${st?`Passo ${this.card+1}: ${st.prompt} ${st.options.map((o,i)=>'ABCD'[i]+'. '+o.text).join(' ')}`:''} ${this.message}`;}
  if(state.kind==='bisection'){const t=BISECTION_TASKS[this.task%BISECTION_TASKS.length];return `${head} ${t.label} su [${num(t.a)}; ${num(t.b)}]. ${this.phase==='halve'?`Intervallo attuale [${num(this.ba)}; ${num(this.bb)}], punto medio ${num((this.ba+this.bb)/2)}, f del punto medio ${num(t.f((this.ba+this.bb)/2))}.`:''} ${this.message}`;}
  if(state.kind==='ionic'){const c=IONIC_CHALLENGES[this.compound%IONIC_CHALLENGES.length];return `${head} Composto: ${c.name}. Cariche scelte: catione ${this.qc?signed(this.qc):'nessuna'}, anione ${this.qa?signed(this.qa):'nessuna'}. Cationi ${this.n}, anioni ${this.m}. ${this.message}`;}
  if(state.kind==='vsepr'){const i=vseprInfo(this.x,this.e);if(this.mode===0)return `${head} Esplora: ${i.notation}, geometria elettronica ${i.electron}, forma ${i.shape}, angolo ${i.angle}.`;const c=VSEPR_CHALLENGES[this.challenge%VSEPR_CHALLENGES.length];return `${head} Sfida: ${c.formula}. ${c.hint} Domini impostati: ${i.notation}. Forma scelta: ${this.shape||'nessuna'}. ${this.message}`;}
  if(state.kind==='punnett'){if(this.mode===0){const t=punnett(this.p1,this.p2);return `${head} Incrocio ${this.p1} per ${this.p2}: attesi viola ${pct(t.phenotype.viola)}, bianchi ${pct(t.phenotype.bianco)}. ${this.sowings.map(s=>`Semina di ${s.n}: viola ${s.viola}, bianchi ${s.bianco}.`).join(' ')}`;}const m=this.mystery;return `${head} Pianta misteriosa: figli viola ${m?.viola||0}, bianchi ${m?.bianco||0}. ${this.message}`;}
  const s=STATEMENTS[this.statement%STATEMENTS.length];return `${head} ${s.text} ${this.tested===null?'':`Valore provato ${fmt(this.tested)}: ${testValue(s,this.tested).holds?'vale':'non vale'}.`} ${this.message}`;}
}
