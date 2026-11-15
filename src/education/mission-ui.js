import {clamp} from '../renderer.js';
import {C} from '../ui/toolkit.js';
import {PARAMETER_LIMITS, signalValue, signalFormula, signalError, parameterKey, OBSERVATIONS} from '../models/signal.js';
import {LEVELS, TRENDS, freshMission, validateMission, changeParameters, predict, captureExperiment, answerQuestion, experimentReport, progress, completeMission} from './mission-engine.js';
import {SignalScene} from './signal-scene.js';
const number=x=>Number(x.toFixed(3)).toLocaleString('it-IT');
const trendNames={increases:'CRESCE',decreases:'DIMINUISCE',constant:'COSTANTE'};
export function textRows(renderer,paragraphs,width,style='body') {
    const rows=[];
    for(const paragraph of paragraphs) {
        let row='';
        for(const word of paragraph.split(/\s+/)) {
            const next=row?row+' '+word:word;
            if(row&&renderer.textWidth(next,style)>width){rows.push(row);row=word;}else row=next;
        }
        if(row)rows.push(row);
        rows.push('');
    }
    return rows;
}
export class MissionUI {
    constructor(renderer,store,definition,api) {
        this.R=renderer;this.store=store;this.definition=validateMission(definition);this.api=api;
        this.scene=new SignalScene(renderer);this.page=0;this.question=0;this.showFeedback=false;this.view='lesson';this.time=2;
    }
    get record() {
        this.store.data.missions ||= {};
        return this.store.data.missions[this.definition.id] ||= freshMission();
    }
    get noteKey(){return 'mission:'+this.definition.id;}
    get reflection(){return this.store.data.notes[this.noteKey]||'';}
    get summary(){return progress(this.definition,this.record,this.reflection);}
    save(){this.store.save();}
    setStage(stage){this.record.stage=clamp(stage,0,5);this.page=0;this.showFeedback=false;this.view='lesson';this.save();}
    setLevel(level){if(LEVELS.includes(level)){this.record.level=level;this.page=0;this.save();}}
    setParameters(patch){changeParameters(this.record,patch);this.save();}
    choosePrediction(choice){predict(this.record,choice);this.save();}
    capture(slot){
        try {
            const result=captureExperiment(this.record,slot);this.save();
            this.api.say(`${slot} registrato: I(2)=${number(result.at2)}, I(4)=${number(result.at4)}. Previsione ${result.predictionCorrect?'confermata':'da rivedere'}.`);
        }catch(error){this.api.say(error.message);}
    }
    answer(id,choice){answerQuestion(this.definition,this.record,id,choice);this.showFeedback=true;this.page=0;this.save();}
    openJournal(){
        this.api.state.journalTab=this.noteKey;
        this.api.route('journal',{journalTab:this.noteKey});
        this.api.say('Diario della missione: scrivi domanda, previsione, parametri, risultati e limiti.');
    }
    exportReport(){
        const r=this.record;
        this.api.download('GAIA_ECHO08_Rapporto.json',{schemaVersion:1,missionId:this.definition.id,missionVersion:this.definition.version,
            provenance:this.definition.narrativeStatus,exportedAt:new Date().toISOString(),
            observations:OBSERVATIONS,parameters:structuredClone(r.parameters),
            experiments:Object.fromEntries(['A','B'].map(k=>[k,r.snapshots[k]?experimentReport(r.snapshots[k]):null])),
            answers:structuredClone(r.answers),reflection:this.reflection,progress:this.summary,
            limits:'Dati sintetici esatti. Nessuna regressione automatica. Nessuna certificazione delle competenze.'});
    }
    layout() {
        const {w,h}=this.R,mobile=w<1050,compact=h<800;
        const top=mobile?(compact?264:300):(compact?246:270),bottom=h-108;
        const left={x:24,y:top,w:mobile?w-48:Math.min(540,w*.39),h:Math.max(120,bottom-top)};
        const right=mobile?{...left}:{x:left.x+left.w+24,y:top,w:w-left.x-left.w-48,h:left.h};
        const controls=mobile?250:258;
        // Short desktop windows use side-by-side graph/controls, not a tiny graph strip.
        if(compact&&!mobile) {
            const cw=Math.min(320,right.w*.50),controlRect={x:right.x+right.w-cw,y:right.y+58,w:cw,h:controls};
            return {mobile,compact,left,right,controlRect,graph:{x:right.x+5,y:right.y+40,w:right.w-cw-18,h:right.h-56},controlY:controlRect.y};
        }
        return {mobile,compact,left,right,controlRect:{x:right.x,y:right.y+right.h-controls,w:right.w,h:controls},graph:{x:right.x+5,y:right.y+36,w:right.w-10,h:Math.max(65,right.h-controls-36)},controlY:right.y+right.h-controls};
    }
    draw3D(state) {
        if(state.scene!=='mission'){this.scene.rect=null;return;}
        const l=this.layout();
        if(!l.mobile||this.view==='lab')this.scene.draw(l.graph,this.record.parameters,this.record.snapshots.A,this.time,state);
        else this.scene.rect=null;
    }
    drawUI(U,state) {
        const R=this.R,r=this.record,d=this.definition,l=this.layout(),step=d.steps[r.stage];
        U.tag('ECHO-08 / MISSIONE SCIENTIFICA',24,110,C.lime);
        U.text(d.title,24,135,'sub',C.pale);
        if(!l.mobile)U.text('Dati sintetici · nessuna immagine aggiunta · grafico in mesh 3D',R.w-26,145,'mini',C.muted,{align:'right'});
        const stepY=l.compact?168:180,stepW=(R.w-48-5*5)/6;
        d.steps.forEach((s,i)=>U.button('mission-step-'+i,l.mobile?String(i+1):`${i+1} ${s.label}`,24+i*(stepW+5),stepY,stepW,30,()=>this.setStage(i),{active:r.stage===i,small:l.mobile}));
        const levelY=stepY+40,levelW=l.mobile?(R.w-58)/3:134;
        ['BASE','APPLICA','APPROFONDISCI'].forEach((name,i)=>U.button('mission-level-'+LEVELS[i],name,24+i*(levelW+5),levelY,levelW,28,()=>this.setLevel(LEVELS[i]),{active:r.level===LEVELS[i],small:true}));
        if(l.mobile) {
            const tabY=l.left.y-42,bw=(R.w-56)/2;
            U.button('mission-view-lesson',r.stage===4?'VERIFICA':'LEZIONE',24,tabY,bw,30,()=>this.view='lesson',{active:this.view==='lesson',small:true});
            U.button('mission-view-lab','LAB 3D',32+bw,tabY,bw,30,()=>this.view='lab',{active:this.view==='lab',small:true});
        }
        if(!l.mobile||this.view==='lesson') {
            U.panel(l.left.x,l.left.y,l.left.w,l.left.h,C.cyan,.94);
            if(r.stage===4)this.quizUI(U,l.left);
            else {
                const paragraphs=[...step.text[r.level]];
                if(r.stage===5)paragraphs.push(`Stato: ${this.summary.experiment?'due esperimenti distinti':'registra A e B diversi'}; verifica ${this.summary.correct}/${this.summary.total}; diario ${this.summary.reflectionRecorded?'presente':'da scrivere'}.`);
                this.readingUI(U,paragraphs,l.left,step.title,r.stage===5?120:0);
                if(r.stage===5)this.finishUI(U,l.left);
            }
        }
        if(!l.mobile||this.view==='lab')this.labUI(U,l,state);
        const footer=R.h-83,bw=l.mobile?(R.w-64)/3:150;
        U.button('mission-prev','◂ FASE',24,footer,bw,35,()=>this.setStage(r.stage-1),{disabled:r.stage===0,small:true});
        U.button('mission-journal','DIARIO',32+bw,footer,bw,35,()=>this.openJournal(),{small:true});
        U.button('mission-next','FASE ▸',40+bw*2,footer,bw,35,()=>this.setStage(r.stage+1),{disabled:r.stage===5,small:true});
        if(!l.mobile) {
            U.button('mission-export','ESPORTA RAPPORTO',R.w-380,footer,186,35,()=>this.exportReport(),{small:true});
            U.button('mission-theory','TEORIA FUNZIONI',R.w-184,footer,160,35,()=>this.api.openTheory('math-c08'),{small:true});
        }
        if(!this.store.persistent)U.text('Sessione soltanto: esporta il diario prima di chiudere.',24,R.h-104,'micro',C.amber);
    }
    readingUI(U,paragraphs,rect,heading,reserve=0) {
        const x=rect.x+18,y=rect.y+18,w=rect.w-36;
        U.wrap(heading,x,y,w,C.pale,24,2,'sub');
        const rows=textRows(this.R,paragraphs,w),line=24,capacity=Math.max(1,Math.floor((rect.h-114-reserve)/line));
        const count=Math.max(1,Math.ceil(rows.length/capacity));this.page=clamp(this.page,0,count-1);
        rows.slice(this.page*capacity,(this.page+1)*capacity).forEach((row,i)=>U.text(row,x,y+60+i*line,'body',C.pale));
        const by=rect.y+rect.h-42-reserve;
        U.button('mission-page-prev','◂',x,by,38,28,()=>this.page--,{disabled:this.page===0});
        U.text(`PAGINA ${this.page+1}/${count}`,rect.x+rect.w/2,by+8,'micro',C.muted,{align:'center'});
        U.button('mission-page-next','▸',rect.x+rect.w-56,by,38,28,()=>this.page++,{disabled:this.page===count-1});
    }
    labUI(U,l,state) {
        const r=this.record,p=r.parameters,rect=l.right,panel=l.controlRect,x=panel.x,w=panel.w,y=l.controlY;
        U.tag('I [u.a.] · t [s]',rect.x+10,rect.y+7,C.cyan);
        this.scene.drawLabels(U);
        U.text('CAMPIONI',rect.x+12,l.graph.y+10,'micro',C.lime);
        U.text('CORRENTE',rect.x+100,l.graph.y+10,'micro',C.cyan);
        if(r.snapshots.A)U.text('A SALVATO',rect.x+196,l.graph.y+10,'micro',C.amber);
        U.button('mission-rotate-left','◂',x+w-78,rect.y,30,28,()=>state.yaw-=.2,{small:true});
        U.button('mission-rotate-right','▸',x+w-42,rect.y,30,28,()=>state.yaw+=.2,{small:true});
        U.panel(x,y,w,panel.h,C.cyan,.96);
        U.text(signalFormula(p),x+12,y+9,'mini',C.pale);
        U.text('RMSE '+number(signalError(p)),x+w-12,y+9,'micro',C.lime,{align:'right'});
        const sliderW=w-100;
        U.slider('mission-time',`t [s] · I=${number(signalValue(p,this.time))}`,x+12,y+34,sliderW,this.time,0,10,.25,v=>this.time=v,number);
        U.button('mission-center','CENTRA',x+w-78,y+39,66,28,()=>{state.yaw=0;state.pitch=.45;},{small:true});
        const bw=(w-30)/2;
        ['linear','quadratic'].forEach((model,i)=>U.button('mission-model-'+model,i?'QUADRATICA':'LINEARE',x+10+i*(bw+10),y+83,bw,28,()=>this.setParameters({model}),{active:p.model===model,small:true}));
        const cell=(w-24)/3;
        ['a','b','h'].forEach((key,i)=>{
            const xx=x+10+i*cell,inactive=key==='h'&&p.model==='linear',step=key==='a'?.25:key==='b'?.5:1;
            U.text(`${key} = ${number(p[key])}`,xx+cell/2,y+119,'mini',inactive?C.dim:C.pale,{align:'center'});
            const width=Math.min(38,(cell-12)/2),center=xx+cell/2;
            U.button('mission-'+key+'-minus','−',center-width-3,y+139,width,25,()=>this.setParameters({[key]:Math.max(PARAMETER_LIMITS[key][0],Number((this.record.parameters[key]-step).toFixed(3)))}),{disabled:inactive||p[key]<=PARAMETER_LIMITS[key][0],small:true});
            U.button('mission-'+key+'-plus','+',center+3,y+139,width,25,()=>this.setParameters({[key]:Math.min(PARAMETER_LIMITS[key][1],Number((this.record.parameters[key]+step).toFixed(3)))}),{disabled:inactive||p[key]>=PARAMETER_LIMITS[key][1],small:true});
        });
        U.text('PREVEDI: fra t=2 e t=4 il modello…',x+10,y+174,'micro',C.muted);
        TRENDS.forEach((choice,i)=>U.button('mission-predict-'+choice,trendNames[choice],x+10+i*cell,y+192,cell-5,24,()=>this.choosePrediction(choice),{active:r.prediction?.choice===choice,small:true}));
        ['A','B'].forEach((slot,i)=>U.button('mission-capture-'+slot,`REGISTRA ${slot}${r.snapshots[slot]?' ✓':''}`,x+10+i*(bw+10),y+222,bw,26,()=>this.capture(slot),{disabled:!r.prediction,small:true}));
    }
    quizUI(U,rect) {
        const q=this.definition.questions[this.question],answer=this.record.answers[q.id],selected=q.options.find(o=>o.id===answer);
        const x=rect.x+16,w=rect.w-32;
        U.button('mission-quiz-question','DOMANDA',x,rect.y+12,w/2-4,28,()=>{this.showFeedback=false;this.page=0;},{active:!this.showFeedback,small:true});
        U.button('mission-quiz-feedback','SPIEGAZIONE',x+w/2+4,rect.y+12,w/2-4,28,()=>{this.showFeedback=true;this.page=0;},{active:this.showFeedback,disabled:!answer,small:true});
        if(this.showFeedback&&selected) {
            const inner={x:rect.x,y:rect.y+44,w:rect.w,h:rect.h-88};
            this.readingUI(U,[q.prompt,selected.feedback,'Puoi tornare alla domanda e rivedere la risposta. Il risultato è un’autoverifica guidata.'],inner,answer===q.correct?'Risposta corretta':'Ragionamento da rivedere');
        }else {
            let yy=rect.y+54;
            const rows=textRows(this.R,[q.prompt],w).filter(Boolean);
            for(const row of rows){U.text(row,x,yy,'body',C.pale);yy+=23;}
            yy+=14;
            for(const option of q.options){
                const lines=textRows(this.R,[option.id+'. '+option.text],w-22).filter(Boolean),hh=lines.length*21+16;
                U.button('mission-answer-'+q.id+'-'+option.id,'',x,yy,w,hh,()=>this.answer(q.id,option.id),{active:answer===option.id});
                // Native semantic control receives the complete option, not an empty label.
                U.buttons.at(-1).label=option.id+'. '+option.text;
                lines.forEach((line,i)=>U.text(line,x+11,yy+8+i*21,'body',C.pale));yy+=hh+9;
            }
        }
        const by=rect.y+rect.h-37;
        U.button('mission-question-prev','◂',x,by,38,27,()=>{this.question--;this.showFeedback=false;this.page=0;},{disabled:this.question===0});
        U.text(`${this.question+1}/${this.definition.questions.length} · CORRETTE ${this.summary.correct}`,rect.x+rect.w/2,by+8,'micro',C.muted,{align:'center'});
        U.button('mission-question-next','▸',x+w-38,by,38,27,()=>{this.question++;this.showFeedback=false;this.page=0;},{disabled:this.question===this.definition.questions.length-1});
    }
    finishUI(U,rect) {
        const r=this.record,x=rect.x+16,w=rect.w-32,y=rect.y+rect.h-110;
        U.button('mission-limits',r.acknowledgedLimits?'✓ LIMITI RICONOSCIUTI':'RICONOSCO I LIMITI DEL MODELLO',x,y,w,27,()=>{r.acknowledgedLimits=!r.acknowledgedLimits;r.completedAt=null;this.save();},{active:r.acknowledgedLimits,small:true});
        U.button('mission-complete',this.summary.completed?'PERCORSO COMPLETATO':'CONCLUDI IL PERCORSO',x,y+35,w,29,()=>{completeMission(this.definition,r,this.reflection);this.save();this.api.say('Percorso completato: esperimenti e autoverifica registrati, non una certificazione.');},{disabled:!this.summary.eligible,active:this.summary.completed,small:true});
        const bw=(w-12)/3;
        U.button('mission-report','RAPPORTO',x,y+73,bw,27,()=>this.exportReport(),{small:true});
        U.button('mission-source','TEORIA',x+bw+6,y+73,bw,27,()=>this.api.openTheory('math-c08'),{small:true});
        U.button('mission-gaia','GAIA',x+2*(bw+6),y+73,bw,27,()=>this.api.openTheory('gaia'),{small:true});
    }
    semanticKey(){return [this.record.stage,this.record.level,this.page,this.question,this.showFeedback,this.view,this.time,parameterKey(this.record.parameters),JSON.stringify(this.record.answers),JSON.stringify(this.record.snapshots),this.record.completedAt,this.record.acknowledgedLimits,this.reflection].join('|');}
    semanticText(){
        const d=this.definition,r=this.record,q=d.questions[this.question],p=r.parameters;
        const feedback=q.options.find(o=>o.id===r.answers[q.id])?.feedback||'';
        return [d.title,d.narrativeStatus,d.steps[r.stage].title,...d.steps[r.stage].text[r.level],
            signalFormula(p),`Dominio [0; 10] s. t=${number(this.time)}, I=${number(signalValue(p,this.time))} u.a. RMSE=${number(signalError(p))} u.a.`,
            'Campioni sintetici: '+OBSERVATIONS.map(o=>`(${o.t}; ${number(o.value)})`).join(', '),
            ...['A','B'].map(slot=>r.snapshots[slot]?`${slot}: ${signalFormula(r.snapshots[slot].parameters)}; I(2)=${number(signalValue(r.snapshots[slot].parameters,2))}; I(4)=${number(signalValue(r.snapshots[slot].parameters,4))}.`:`${slot} non registrato.`),
            ...(r.stage===4?[q.prompt,...q.options.map(o=>o.id+'. '+o.text),feedback]:[]),
            `Autoverifica: ${this.summary.correct}/${this.summary.total}. Esperimenti distinti: ${this.summary.experiment?'sì':'no'}.`,
            'La profondità 3D non è un terzo asse scientifico. La scala verticale è adattiva.'].join('\n\n');
    }
}
