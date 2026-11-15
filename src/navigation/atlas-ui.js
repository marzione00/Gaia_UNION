import { clamp, color } from '../renderer.js';
import { C } from '../ui/toolkit.js';
import { displayText, fittedRows } from '../education/course-ui.js';
import { AtlasScene } from './atlas-scene.js';
import { DISCIPLINES, TEXT_SCALES, GUIDE, cleanAtlas, atlasLayout, contains, placeLabels, searchModules, unitStatus, rememberVisit } from './atlas-model.js';

import { scaledText } from './text.js';
const basePalette=Object.fromEntries(Object.entries(C).map(([k,v])=>[k,[...v]]));
export class AtlasUI {
    constructor(R,world,store,catalogue,bundle,api) {
        Object.assign(this,{R,world,store,catalogue,bundle,api});
        this.scene=new AtlasScene(R);this.sheet=null;this.query='';this.page=0;this.previewPage=0;this.level=0;this.pathId=null;this.guideStep=0;this.hoverId=null;this.hoverSince=0;this.hoverCandidate=null;this.flight=null;this.openedFrom=null;
        store.data.atlas=cleanAtlas(store.data.atlas);this.applyPreferences();
        this.input=typeof document!=='undefined'?document.querySelector('#atlas-search'):null;
        if(this.input){this.input.oninput=()=>{this.query=this.input.value.slice(0,140);this.page=0;};this.input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();const first=this.results[0];if(first)this.selectModule(first.id,true);}if(e.key==='Escape'){e.preventDefault();this.close();}};}
    }
    get S(){return this.api.state;}
    get prefs(){return this.store.data.atlas ||= cleanAtlas();}
    get layout(){return atlasLayout(this.R.w,this.R.h,this.prefs.textScale);}
    get path(){return this.bundle.paths.find(p=>p.id===this.pathId)||null;}
    get module(){const id=this.hoverId??this.S.system;const sector=this.S.sector>=0?this.S.sector:this.catalogue.modules[this.S.selected]?.sector||0;return this.catalogue.modules[id+sector*25];}
    get results(){return searchModules(this.catalogue.modules,this.query,this.S.sector,this.path);}
    save(){this.store.save();}
    applyPreferences(){const p=this.prefs;this.R.readingScale=p.textScale;this.R.highContrast=p.contrast;
        for(const [key,value] of Object.entries(basePalette))C[key]=p.contrast&&['dim','muted'].includes(key)?color('#c5dce2'):[...value];
    }
    open(sheet){this.sheet=sheet;this.page=0;this.previewPage=0;this.hoverId=null;this.S.menu=false;this.S.settings=false;this.S.toastUntil=0;this.openedFrom=typeof document!=='undefined'?document.activeElement?.dataset?.id:null;this.api.invalidate?.();}
    close(){this.sheet=null;if(this.input){this.input.blur();this.input.disabled=true;}this.api.invalidate?.();this.api.focusCanvas?.();}
    search(){this.open('list');if(this.input){this.input.disabled=false;this.input.value=this.query;this.input.focus();}}
    announce(text){this.api.say(text);}
    selectModule(id,center=false){const m=this.catalogue.modules.find(m=>m.id===id);if(!m)return;this.api.selectIndex(m.planetIndex);this.S.system=m.planetIndex%25;this.S.sector=m.sector;this.hoverId=null;this.previewPage=0;this.close();if(center)this.focusSystem(this.S.system);this.api.updateHash?.();this.announce(`ECHO ${String(this.S.system+1).padStart(2,'0')}. ${DISCIPLINES[m.sector]}: ${m.title}. Selezionato; non ancora aperto.`);}
    selectSystem(id,center=false){if(!Number.isInteger(id)||id<0||id>=25)return;const sector=this.S.sector>=0?this.S.sector:0;this.selectModule(this.catalogue.modules[id+25*sector].id,center);}
    focusSystem(id=this.S.system){const position=this.world.systems[id]?.position;if(!position)return;
        const from=Array.isArray(this.S.atlasTarget)?[...this.S.atlasTarget]:[0,0,0];
        if(this.S.paused||this.store.data.preferences.motion===false||this.api.reducedMotion?.()){this.S.atlasTarget=[...position];this.flight=null;}
        else this.flight={from,to:[...position],start:performance.now(),duration:650};
    }
    reset(){this.flight=null;this.S.atlasTarget=[0,0,0];this.S.yaw=0;this.S.pitch=.45;this.S.distance=60;}
    move(dx=0,dy=0){this.flight=null;this.S.yaw+=dx;this.S.pitch=clamp(this.S.pitch+dy,.1,1.2);}
    cancelFlight(){this.flight=null;}
    tick(now){this.applyPreferences();this.S.atlasViewport=this.layout.map;
        if(this.S.scene!=='galaxy')return;
        if(this.flight){const f=this.flight,t=this.S.paused||this.api.reducedMotion?.()?1:clamp((now-f.start)/f.duration,0,1),u=t*t*(3-2*t);this.S.atlasTarget=f.from.map((v,i)=>v+(f.to[i]-v)*u);if(t===1)this.flight=null;}
    }
    onRoute(scene){if(scene!=='galaxy')this.cancelFlight();this.sheet=null;this.hoverId=null;if(this.input){this.input.disabled=true;this.input.blur();}
        const m=this.catalogue.modules[this.S.selected];if(m&&['system','orbit','surface','mission','pilot'].includes(scene)){rememberVisit(this.store.data,m,scene==='system'||scene==='orbit'||scene==='surface');this.save();}
    }
    blocked(x,y){return !!this.sheet||this.S.menu||this.S.settings||!contains(this.layout.map,x,y);}
    draw3D(state,pointer,drag,focus){if(state.scene!=='galaxy'){this.hoverId=null;return;}
        const blocked=this.sheet||state.menu||state.settings||drag||this.world.cameraProgress<1;
        for(const p of this.world.projections)if(p.type==='system')p.r=24;
        const focusMatch=/^scene-system-(\d+)$/.exec(focus||'');
        let candidate=!blocked&&focusMatch?Number(focusMatch[1]):null;
        if(candidate===null&&!blocked&&pointer&&!this.blocked(pointer.x,pointer.y))candidate=this.world.pick(pointer.x,pointer.y,state)?.index??null;
        if(candidate!==this.hoverCandidate){this.hoverCandidate=candidate;this.hoverSince=performance.now();}
        this.hoverId=!blocked&&candidate!==null&&(focusMatch||performance.now()-this.hoverSince>=130)?candidate:null;
        state.hoveredTarget=this.hoverId!==null?this.world.projections.find(p=>p.type==='system'&&p.index===this.hoverId)||null:null;
        this.scene.draw(this.world,state,this.layout,{selected:state.system,hover:this.hoverId,contrast:this.prefs.contrast,path:this.path,modules:this.catalogue.modules});
    }
    focusKey(id){this.hoverId=id;const p=this.world.projections.find(p=>p.type==='system'&&p.index===id);if(!p||!contains(this.layout.map,p.x,p.y))this.focusSystem(id);}
    actions(){if(this.sheet||this.S.menu||this.S.settings||this.world.cameraProgress<1)return [];
        return this.world.systems.map(s=>({id:'scene-system-'+s.id,label:`Seleziona ${s.name}, ${s.count} pianeti, quattro destinazioni didattiche.`,action:()=>this.selectSystem(s.id,true)}));
    }
    key(e){if(e.target?.tagName==='INPUT'||e.target?.tagName==='TEXTAREA')return false;
        if(e.key==='Escape'&&this.sheet){e.preventDefault();this.close();return true;}
        if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'&&this.S.scene==='galaxy'){e.preventDefault();this.search();return true;}
        if(e.altKey&&e.key.toLowerCase()==='a'){e.preventDefault();this.open('access');return true;}
        if(this.sheet&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','PageUp','PageDown',' '].includes(e.key)&&e.target?.tagName!=='BUTTON'){e.preventDefault();return true;}
        if(this.S.scene==='galaxy'&&!this.sheet&&e.key==='Home'){e.preventDefault();this.reset();return true;}
        return false;
    }
    text(t,x,y,width,style='body',tint=C.pale,scale=this.prefs.textScale){
        let text=displayText(t);while(text.length&&this.R.textWidth(text,style)*scale>width)text=text.slice(0,-1);scaledText(this.R,text,x,y,style,tint,scale);
    }
    button(U,id,label,x,y,w,action,options={}){
        U.button('atlas-'+id,'',x,y,w,44,action,options);U.buttons.at(-1).label=label;
        const scale=Math.min(this.prefs.textScale,1.25);let str=displayText(label);while(str.length&&this.R.textWidth(str,'mini')*scale>w-14)str=str.slice(0,-1);
        scaledText(this.R,str,x+w/2,y+12,'mini',options.disabled?C.dim:C.pale,scale,{align:'center'});
    }
    body(U,texts,r,{footer=0}={}){
        const scale=this.prefs.textScale,line=24*scale,rows=fittedRows(this.R,texts,(r.w-28)/scale),count=Math.max(1,Math.floor((r.h-footer-65)/line)),pages=Math.max(1,Math.ceil(rows.length/count));
        this.previewPage=clamp(this.previewPage,0,pages-1);
        rows.slice(this.previewPage*count,(this.previewPage+1)*count).forEach((t,i)=>scaledText(this.R,t,r.x+14,r.y+8+i*line,'body',C.pale,scale));
        const y=r.y+r.h-footer-48;
        this.button(U,'read-prev','<',r.x+14,y,48,()=>this.previewPage--,{disabled:this.previewPage===0});
        this.text(`${this.previewPage+1} / ${pages}`,r.x+78,y+12,r.w-148,'mini',C.muted,1);
        this.button(U,'read-next','>',r.x+r.w-62,y,48,()=>this.previewPage++,{disabled:this.previewPage===pages-1});
    }
    draw(U){const l=this.layout,R=this.R,S=this.S;const {toolbar:t,card:c,controls:k}=l;
        if(!l.short){this.text('ATLANTE / 25 SISTEMI ECHO',t.x,t.y+2,t.w-100,'mini',C.lime,1);this.button(U,'access','ACCESSO',t.x+t.w-94,t.y-2,94,()=>this.open('access'));}
        const tabs=[['list','ELENCO'],['routes','ROTTE'],['history','RIPRENDI'],['guide','GUIDA']];if(l.short)tabs.push(['access','ACCESSO']);const bw=(t.w-6*(tabs.length-1))/tabs.length;
        tabs.forEach(([id,label],i)=>this.button(U,id,label,t.x+i*(bw+6),t.y+(l.short?0:50),bw,()=>this.open(id),{active:this.sheet===id}));
        if(this.prefs.showLabels){const selected=this.hoverId??S.system,labels=placeLabels(this.world.projections,l.map,selected,s=>R.textWidth(s,'micro'),26);
            for(const p of labels){R.roundRect(p.x,p.y,p.w,p.h,4,color('#04131e',.9));this.text(p.text,p.x+5,p.y+4,p.w-8,'micro',p.index===selected?C.lime:C.pale,1);}}
        this.text('XYZ',l.map.x+12,l.map.y+60,72,'micro',C.muted,1);
        if(this.scene.edge){const e=this.scene.edge;this.text('CENTRA',clamp(e.x-28,l.map.x,l.map.x+l.map.w-60),clamp(e.y+18,l.map.y,l.map.y+l.map.h-18),64,'micro',C.amber,1);U.buttons.push({id:'atlas-offscreen',label:'Centra il sistema selezionato fuori campo',x:e.x-22,y:e.y-22,w:44,h:44,action:()=>this.focusSystem()});}
        if(this.path)this.text('ROTTA DIDATTICA · '+this.path.title,l.map.x+86,l.map.y+8,Math.max(60,l.map.w-90),'micro',C.amber,1);
        this.card(U,c,l.compact||c.h<450);
        const entries=[['left','<',()=>this.move(-.18)],['right','>',()=>this.move(.18)],['minus','−',()=>this.api.zoom(1/.86)],['plus','+',()=>this.api.zoom(.86)],['center',this.R.w<360?'MIRA':'CENTRA',()=>this.focusSystem()]],w=(k.w-24)/5;
        entries.forEach(([id,label,action],i)=>this.button(U,id,label,k.x+i*(w+6),k.y,w,action));
        ['Ruota la mappa a sinistra','Ruota la mappa a destra','Allontana la camera','Avvicina la camera','Centra il sistema selezionato'].forEach((label,i)=>{const b=U.buttons.find(b=>b.id==='atlas-'+entries[i][0]);if(b)b.label=label;});
    }
    card(U,c,compact){const m=this.module;if(!m)return;const system=this.world.systems[m.planetIndex%25];if(!system)return;
        U.panel(c.x,c.y,c.w,c.h,C.cyan,.96);
        this.text(system.name+' / '+system.count+' PIANETI',c.x+14,c.y+12,c.w-28,'mini',C.amber,1);
        this.text(DISCIPLINES[m.sector]+' · '+m.title,c.x+14,c.y+39,c.w-28,'body',C.pale,compact?Math.min(1.2,this.prefs.textScale):this.prefs.textScale);
        if(compact){if(c.h>160)this.text(unitStatus(m,this.store.data).label,c.x+14,c.y+76,c.w-28,'mini',C.lime,1);
            const bw=(c.w-34)/2,y=c.y+c.h-56;
            this.button(U,'details','DETTAGLI',c.x+14,y,bw,()=>{this.selectModule(m.id);this.open('detail');});
            this.button(U,'enter','ENTRA',c.x+20+bw,y,bw,()=>{this.api.selectIndex(m.planetIndex);this.api.enterSystem(m.planetIndex%25);},{active:true});return;
        }
        const y=c.y+88;for(let i=0;i<4;i++){const mod=this.catalogue.modules[system.id+25*i];this.button(U,'discipline-'+i,['MAT','FIS','CHI','BIO'][i]+' · '+mod.title,c.x+14,y+i*50,c.w-28,()=>this.selectModule(mod.id),{active:m.sector===i});}
        const area={x:c.x,y:y+206,w:c.w,h:Math.max(45,c.h-372)};
        const lines=fittedRows(this.R,[m.description],(area.w-28)/this.prefs.textScale);const count=Math.max(0,Math.floor((area.h-8)/(23*this.prefs.textScale)));
        lines.slice(0,count).forEach((t,i)=>scaledText(this.R,t,area.x+14,area.y+i*23*this.prefs.textScale,'body',C.pale,this.prefs.textScale));
        this.text(unitStatus(m,this.store.data).label,c.x+14,c.y+c.h-118,c.w-28,'mini',C.lime,1);
        const bw=(c.w-34)/2;
        this.button(U,'details','SPIEGAZIONE',c.x+14,c.y+c.h-94,bw,()=>{this.selectModule(m.id);this.open('detail');});
        this.button(U,'enter','ENTRA',c.x+20+bw,c.y+c.h-94,bw,()=>{this.api.selectIndex(m.planetIndex);this.api.enterSystem(m.planetIndex%25);},{active:true});
        this.text('4 DESTINAZIONI · NUCLEI GUIDATI',c.x+14,c.y+c.h-30,c.w-28,'micro',C.muted,1);
    }
    drawOverlay(U){if(!this.sheet)return;const r=this.layout.sheet;
        // Modal controls replace underlying actions, including map and global navigation.
        U.buttons=[];this.R.rect(0,90,this.R.w,this.R.h-90,color('#03121d',.97));U.panel(r.x,r.y,r.w,r.h,C.cyan,1);
        const headings={list:'CERCA UN ARGOMENTO',detail:'DOSSIER DEL SISTEMA',routes:'ROTTE DELLA CONOSCENZA',history:'DIARIO DELLE ESPLORAZIONI',guide:'ESPLORAZIONE GUIDATA',access:'ACCESSIBILITÀ'};
        this.text(headings[this.sheet],r.x+14,r.y+16,r.w-126,'mini',C.lime,1);
        this.button(U,'close','CHIUDI',r.x+r.w-108,r.y+4,94,()=>this.close());
        const body={x:r.x+14,y:r.y+62,w:r.w-28,h:r.h-72};
        if(this.sheet==='list')this.listUI(U,body);
        if(this.sheet==='detail')this.detailUI(U,body);
        if(this.sheet==='routes')this.routesUI(U,body);
        if(this.sheet==='history')this.historyUI(U,body);
        if(this.sheet==='guide')this.guideUI(U,body);
        if(this.sheet==='access')this.accessUI(U,body);
    }
    listUI(U,r){const q=this.query||'Scrivi titolo, tema o ECHO 08';
        this.button(U,'search',q,r.x,r.y,r.w-56,()=>this.search());this.button(U,'clear','X',r.x+r.w-48,r.y,48,()=>{this.query='';this.page=0;if(this.input)this.input.value='';});
        const filters=['TUTTE','MAT','FIS','CHI','BIO'],w=(r.w-24)/5;
        filters.forEach((name,i)=>this.button(U,'filter-'+i,name,r.x+i*(w+6),r.y+50,w,()=>{this.S.sector=i-1;this.page=0;},{active:this.S.sector===i-1}));
        const items=this.results,rowH=58,cap=Math.max(1,Math.floor((r.h-170)/rowH)),pages=Math.max(1,Math.ceil(items.length/cap));this.page=clamp(this.page,0,pages-1);
        this.text(items.length+' ARGOMENTI'+(this.path?' · FILTRO ROTTA':''),r.x,r.y+106,r.w,'micro',C.muted,1);
        items.slice(this.page*cap,(this.page+1)*cap).forEach((m,i)=>{this.button(U,'result-'+m.id,`ECHO ${String(m.planetIndex%25+1).padStart(2,'0')} · ${m.title}`,r.x,r.y+130+i*rowH,r.w,()=>this.selectModule(m.id,true));const b=U.buttons.at(-1);b.label=`${DISCIPLINES[m.sector]}: ${m.title}. Seleziona e centra ECHO ${m.planetIndex%25+1}.`;});
        if(!items.length)this.text('Nessun risultato. Cambia ricerca o filtro.',r.x,r.y+144,r.w,'body');
        this.pager(U,r,pages);
    }
    pager(U,r,pages){const y=r.y+r.h-46;this.button(U,'page-prev','<',r.x,y,48,()=>this.page--,{disabled:this.page===0});this.text(`${this.page+1} / ${pages}`,r.x+66,y+12,r.w-132,'mini',C.muted,1);this.button(U,'page-next','>',r.x+r.w-48,y,48,()=>this.page++,{disabled:this.page>=pages-1});}
    detailUI(U,r){const m=this.catalogue.modules[this.S.selected],d=this.bundle.courses.find(d=>d.id===m.id),sys=this.S.system,bw=(r.w-18)/4;
        for(let i=0;i<4;i++)this.button(U,'detail-sector-'+i,['MAT','FIS','CHI','BIO'][i],r.x+i*(bw+6),r.y,bw,()=>{this.api.selectIndex(sys+25*i);this.S.sector=i;this.previewPage=0;},{active:m.sector===i});
        this.text(m.title,r.x,r.y+54,r.w,'body',C.pale,Math.min(this.prefs.textScale,1.2));
        const lw=(r.w-12)/3;['SCOPRI','COMPRENDI','AVANZATO'].forEach((label,i)=>this.button(U,'level-'+i,label,r.x+i*(lw+6),r.y+86,lw,()=>{this.level=i;this.previewPage=0;},{active:this.level===i}));
        const level=['base','intermediate','advanced'][this.level],paragraphs=[m.title,...d.steps[0].text[level], 'Ambito: '+d.scope, 'La visita non certifica una competenza.'];
        this.body(U,paragraphs,{x:r.x-14,y:r.y+140,w:r.w+28,h:r.h-194});
        const w=(r.w-6)/2;this.button(U,'detail-enter','ENTRA NEL SISTEMA',r.x,r.y+r.h-46,w,()=>this.api.enterSystem(sys));this.button(U,'learn','APRI LEZIONE',r.x+w+6,r.y+r.h-46,w,()=>this.api.openCourse(m.id),{active:true});
    }
    routesUI(U,r){const rows=[{id:null,title:'NESSUNA ROTTA · Esplorazione libera'},...this.bundle.paths],cap=Math.max(1,Math.floor((r.h-108)/50)),pages=Math.max(1,Math.ceil(rows.length/cap));this.page=clamp(this.page,0,pages-1);
        this.text('Collegamenti didattici, non rotte astronomiche.',r.x,r.y,r.w,'mini',C.muted,1);
        rows.slice(this.page*cap,(this.page+1)*cap).forEach((p,i)=>this.button(U,'path-'+(p.id||'none'),p.title,r.x,r.y+36+i*50,r.w,()=>{this.pathId=p.id;this.S.sector=-1;this.query='';this.close();if(p.units?.length){const m=this.catalogue.modules.find(m=>m.id===p.units[0]);this.api.selectIndex(m.planetIndex);this.focusSystem(m.planetIndex%25);}this.announce(p.id?'Rotta attiva: '+p.title+'. Usa ELENCO per scegliere le tappe.':'Rotte nascoste.');},{active:this.pathId===p.id}));this.pager(U,r,pages);
    }
    historyUI(U,r){const ids=this.prefs.recent,cap=Math.max(1,Math.floor((r.h-110)/64)),pages=Math.max(1,Math.ceil(ids.length/cap));this.page=clamp(this.page,0,pages-1);
        this.text(this.store.persistent?'Salvato su questo dispositivo.':'Solo sessione: esporta il diario.',r.x,r.y,r.w,'mini',C.muted,1);
        if(!ids.length)this.body(U,['Non ci sono ancora esplorazioni registrate. Apri un sistema o una lezione: potrai riprenderli qui.'],{...r,y:r.y+34,h:r.h-34});
        else{ids.slice(this.page*cap,(this.page+1)*cap).forEach((id,i)=>{const m=this.catalogue.modules.find(m=>m.id===id);if(!m)return;const y=r.y+35+i*64;this.button(U,'resume-'+id,m.title,r.x,y,r.w,()=>this.api.openCourse(id));this.text(unitStatus(m,this.store.data).label,r.x+4,y+46,r.w-8,'micro',C.lime,1);});this.pager(U,r,pages);}
    }
    guideUI(U,r){const step=GUIDE[this.guideStep];this.text(step.title,r.x,r.y,r.w,'body',C.amber,1);
        this.body(U,[step.text,'Guida facoltativa. Puoi chiuderla in qualsiasi momento e riaprirla da GUIDA.'],{x:r.x-14,y:r.y+36,w:r.w+28,h:r.h-94});
        const w=(r.w-12)/3,y=r.y+r.h-46;this.button(U,'guide-prev','INDIETRO',r.x,y,w,()=>{this.guideStep--;this.previewPage=0;},{disabled:this.guideStep===0});this.button(U,'guide-try','PROVA',r.x+w+6,y,w,()=>{const action=step.action;this.close();if(action==='list')this.search();else if(action!=='map')this.open(action==='routes'?'routes':action);});
        this.button(U,'guide-next',this.guideStep===GUIDE.length-1?'FINE':'AVANTI',r.x+2*(w+6),y,w,()=>{this.previewPage=0;if(this.guideStep<GUIDE.length-1)this.guideStep++;else{this.prefs.guideDone=true;this.save();this.close();}},{active:true});
    }
    accessUI(U,r){const rows=[
        ['scale','TESTO: '+Math.round(this.prefs.textScale*100)+'%',()=>{this.prefs.textScale=TEXT_SCALES[(TEXT_SCALES.indexOf(this.prefs.textScale)+1)%TEXT_SCALES.length];this.previewPage=0;this.save();this.applyPreferences();}],
        ['contrast','CONTRASTO ALTO: '+(this.prefs.contrast?'SÌ':'NO'),()=>{this.prefs.contrast=!this.prefs.contrast;this.save();this.applyPreferences();}],
        ['motion','MOVIMENTO: '+(this.S.paused?'RIDOTTO':'ATTIVO'),()=>{this.S.paused=!this.S.paused;this.store.data.preferences.motion=!this.S.paused;this.save();}],
        ['labels','ETICHETTE ECHO: '+(this.prefs.showLabels?'SÌ':'NO'),()=>{this.prefs.showLabels=!this.prefs.showLabels;this.save();}],
        ['up','RUOTA VERSO L’ALTO',()=>this.move(0,.1)],['down','RUOTA VERSO IL BASSO',()=>this.move(0,-.1)],
        ['reset','RIPRISTINA VISTA GALATTICA',()=>{this.reset();this.close();this.api.route('galaxy');}]
    ];
        const cap=Math.max(1,Math.floor((r.h-102)/50)),pages=Math.ceil(rows.length/cap);this.page=clamp(this.page,0,pages-1);
        this.text('Testo: schede e lettura dei 100 moduli.',r.x,r.y,r.w,'mini',C.muted,1);
        rows.slice(this.page*cap,(this.page+1)*cap).forEach(([id,label,act],i)=>this.button(U,'option-'+id,label,r.x,r.y+34+i*50,r.w,act));this.pager(U,r,pages);
    }
    semanticKey(){return [this.S.system,this.S.selected,this.S.sector,this.hoverId,this.sheet,this.query,this.page,this.previewPage,this.level,this.pathId,this.guideStep,this.prefs.textScale,this.prefs.contrast,this.store.data.updatedAt].join('|');}
    semanticText(){const m=this.module,system=this.world.systems[m?.planetIndex%25];if(!m||!system)return '';
        let text=`Atlante scientifico. 25 sistemi ECHO, quattro destinazioni per sistema. ${system.name}. ${DISCIPLINES[m.sector]}: ${m.title}. ${m.description}. ${unitStatus(m,this.store.data).label}.`;
        if(this.sheet==='detail'){const d=this.bundle.courses.find(d=>d.id===this.catalogue.modules[this.S.selected].id);text+=' '+d.steps[0].text[['base','intermediate','advanced'][this.level]].join(' ')+' Ambito: '+d.scope;}
        if(this.sheet==='guide')text+=' '+GUIDE[this.guideStep].title+'. '+GUIDE[this.guideStep].text;
        if(this.sheet==='list')text+=' '+this.results.length+' risultati per '+(this.query||'tutti gli argomenti')+'.';
        if(this.path)text+=' Rotta didattica: '+this.path.title+'. Non è una traiettoria astronomica.';
        return text;
    }
}
