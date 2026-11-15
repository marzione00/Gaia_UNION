import { clamp, color } from '../renderer.js';
import { C } from '../ui/toolkit.js';
import { displayText, fittedRows } from '../education/course-ui.js';
import { AtlasScene } from './atlas-scene.js';
import { DISCIPLINES, TEXT_SCALES, GUIDE, cleanAtlas, atlasLayout, contains, placeLabels, searchModules, unitStatus, rememberVisit } from './atlas-model.js';

import { scaledText } from './text.js';
import { systemForPlanet, indicesForSystem, AREAS } from '../scene/systems.js';
const SECTOR_COLORS=[C.amber,C.cyan,C.purple,C.lime];
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
    get module(){const id=this.hoverId??this.S.system,units=indicesForSystem(id),index=units.includes(this.S.selected)?this.S.selected:units[0];return this.catalogue.modules[index];}
    get results(){return searchModules(this.catalogue.modules,this.query,this.S.sector,this.path);}
    save(){this.store.save();}
    applyPreferences(){const p=this.prefs;this.R.readingScale=p.textScale;this.R.highContrast=p.contrast;
        for(const [key,value] of Object.entries(basePalette))C[key]=p.contrast&&['dim','muted'].includes(key)?color('#c5dce2'):[...value];
    }
    open(sheet){this.sheet=sheet;this.page=0;this.previewPage=0;this.hoverId=null;this.S.menu=false;this.S.settings=false;this.S.toastUntil=0;this.openedFrom=typeof document!=='undefined'?document.activeElement?.dataset?.id:null;this.api.invalidate?.();}
    close(){this.sheet=null;if(this.input){this.input.blur();this.input.disabled=true;}this.api.invalidate?.();this.api.focusCanvas?.();}
    search(){this.open('list');if(this.input){this.input.disabled=false;this.input.value=this.query;this.input.focus();}}
    announce(text){this.api.say(text);}
    selectModule(id,center=false){const m=this.catalogue.modules.find(m=>m.id===id);if(!m)return;this.api.selectIndex(m.planetIndex);this.S.system=systemForPlanet(m.planetIndex);this.hoverId=null;this.previewPage=0;this.close();if(center)this.focusSystem(this.S.system);this.api.updateHash?.();this.announce(`${AREAS[this.S.system].name}. ${DISCIPLINES[m.sector]}: ${m.title}. Selezionata: premi Apri l’unità per studiarla.`);}
    selectSystem(id,center=false){if(!Number.isInteger(id)||id<0||id>=25)return;const units=indicesForSystem(id),index=units.includes(this.S.selected)?this.S.selected:units[0];this.selectModule(this.catalogue.modules[index].id,center);}
    startGuide(){this.open('guide');this.guideStep=0;}
    endGuide(){this.prefs.guideDone=true;this.save();this.close();}
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
        return this.world.systems.map(s=>({id:'scene-system-'+s.id,label:`Seleziona l’area ${s.name}, ${s.discipline}, ${s.planets.length} unità.`,action:()=>this.selectSystem(s.id,true)}));
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
    draw(U){const l=this.layout,R=this.R,S=this.S;const {toolbar:t,card:c,controls:k}=l;this.rects={};
        const area=AREAS[systemForPlanet(S.selected)];
        if(!l.short){let trail=`GALASSIA ▸ ${DISCIPLINES[area.sector].toUpperCase()} ▸ ${area.name.toUpperCase()}`;while(trail.includes(' ▸ ')&&R.textWidth(trail,'mini')>t.w-110)trail=trail.slice(trail.indexOf(' ▸ ')+3);this.text(trail,t.x,t.y+2,t.w-110,'mini',C.lime,1);this.button(U,'access','ACCESSO',t.x+t.w-94,t.y-2,94,()=>this.open('access'));}
        const tabs=[['list','CERCA'],['routes','PERCORSI'],['history','RIPRENDI'],['guide','GUIDA']];if(l.short)tabs.push(['access','ACCESSO']);const bw=(t.w-6*(tabs.length-1))/tabs.length;
        tabs.forEach(([id,label],i)=>{const x=t.x+i*(bw+6),y=t.y+(l.short?0:50);this.button(U,id,label,x,y,bw,()=>id==='guide'?this.startGuide():this.open(id),{active:this.sheet===id});this.rects[id]={x,y,w:bw,h:44};});
        if(this.prefs.showLabels){const selected=this.hoverId??S.system,labels=placeLabels(this.world.projections,l.map,selected,s=>R.textWidth(s,'micro'),26);
            for(const p of labels){const sector=AREAS[p.index].sector,dim=S.sector>=0&&S.sector!==sector;R.roundRect(p.x,p.y,p.w,p.h,4,color('#04131e',.9));this.text(p.text,p.x+5,p.y+4,p.w-8,'micro',p.index===selected?C.pale:dim?C.dim:SECTOR_COLORS[sector],1);}}
        this.legend(U,l);
        if(this.scene.edge){const e=this.scene.edge;this.text('CENTRA',clamp(e.x-28,l.map.x,l.map.x+l.map.w-60),clamp(e.y+18,l.map.y,l.map.y+l.map.h-18),64,'micro',C.amber,1);U.buttons.push({id:'atlas-offscreen',label:'Centra l’area selezionata, fuori campo',x:e.x-22,y:e.y-22,w:44,h:44,action:()=>this.focusSystem()});}
        if(this.path)this.text('PERCORSO · '+this.path.title,l.map.x+86,l.map.y+8,Math.max(60,l.map.w-90),'micro',C.amber,1);
        this.card(U,c,l.compact||c.h<450);
        const entries=[['left','<',()=>this.move(-.18)],['right','>',()=>this.move(.18)],['minus','−',()=>this.api.zoom(1/.86)],['plus','+',()=>this.api.zoom(.86)],['center',this.R.w<360?'MIRA':'CENTRA',()=>this.focusSystem()]],w=(k.w-24)/5;
        entries.forEach(([id,label,action],i)=>this.button(U,id,label,k.x+i*(w+6),k.y,w,action));
        ['Ruota la mappa a sinistra','Ruota la mappa a destra','Allontana la camera','Avvicina la camera','Centra l’area selezionata'].forEach((label,i)=>{const b=U.buttons.find(b=>b.id==='atlas-'+entries[i][0]);if(b)b.label=label;});
    }
    legend(U,l){const m=l.map,compact=l.compact||m.w<560,names=compact?['MAT','FIS','CHI','BIO']:['MATEMATICA','FISICA','CHIMICA','BIOLOGIA'],bw=Math.min(compact?86:150,(m.w-18)/4),y=m.y+m.h-48,x0=m.x+(compact?0:8);
        names.forEach((name,i)=>{const x=x0+i*(bw+6),on=this.S.sector===i;this.button(U,'discipline-'+i,name,x,y,bw,()=>{this.S.sector=on?-1:i;this.page=0;if(!on&&this.catalogue.modules[this.S.selected]?.sector!==i)this.selectSystem(AREAS.findIndex(a=>a.sector===i),true);this.announce(on?'Tutte le discipline.':'Braccio della '+DISCIPLINES[i]+' evidenziato: la scheda mostra la sua prima area.');},{active:on});
            U.buttons.at(-1).label=on?'Mostra di nuovo tutte le discipline':'Evidenzia il braccio della '+DISCIPLINES[i];scaledText(this.R,'●',x+8,y+12,'mini',SECTOR_COLORS[i],1);});
        this.rects.legend={x:x0,y,w:4*bw+18,h:44};
    }
    card(U,c,compact){const m=this.module;if(!m)return;const id=systemForPlanet(m.planetIndex),system=this.world.systems[id];if(!system)return;
        const area=AREAS[id],tint=SECTOR_COLORS[area.sector],units=system.planets,k=units.indexOf(m.planetIndex),n=units.length,pick=i=>this.selectModule(this.catalogue.modules[units[(i+n)%n]].id);
        U.panel(c.x,c.y,c.w,c.h,tint,.96);this.rects.card={...c};
        this.text(`${DISCIPLINES[area.sector].toUpperCase()} · AREA ${system.step} DI ${system.steps}`,c.x+14,c.y+12,c.w-28,'mini',tint,1);
        const open=()=>this.api.openCourse(m.id),explore=()=>{this.api.selectIndex(m.planetIndex);this.api.enterSystem(id);};
        const actions=(y,bw)=>{this.button(U,'explore','SISTEMA 3D',c.x+14,y,bw,explore);U.buttons.at(-1).label='Visita in 3D i pianeti dell’area '+area.name;
            this.button(U,'open-unit','APRI L’UNITÀ',c.x+20+bw,y,bw,open,{active:true});U.buttons.at(-1).label='Apri l’unità '+m.title;};
        if(compact){
            this.text(area.name,c.x+14,c.y+34,c.w-28,'mini',C.pale,1);
            this.text(`${k+1}/${n} · ${m.title}`,c.x+14,c.y+56,c.w-28,'body',C.pale,Math.min(1.2,this.prefs.textScale));
            if(c.h>160){const y=c.y+88;this.button(U,'unit-prev','◂',c.x+14,y,48,()=>pick(k-1));U.buttons.at(-1).label='Unità precedente dell’area';this.button(U,'unit-next','▸',c.x+68,y,48,()=>pick(k+1));U.buttons.at(-1).label='Unità successiva dell’area';
                this.text(unitStatus(m,this.store.data).label,c.x+128,y+14,c.w-142,'mini',C.lime,1);}
            actions(c.y+c.h-56,(c.w-34)/2);return;
        }
        this.text(area.name,c.x+14,c.y+36,c.w-28,'body',C.pale,Math.min(1.2,this.prefs.textScale));
        const y0=c.y+72,rowH=46;
        units.forEach((index,i)=>{const mod=this.catalogue.modules[index],status=unitStatus(mod,this.store.data).code;
            this.button(U,'unit-'+mod.id,`${i+1}. ${mod.title}`,c.x+14,y0+i*rowH,c.w-28,()=>this.selectModule(mod.id),{active:index===m.planetIndex});
            U.buttons.at(-1).label=`Unità ${i+1} di ${n}: ${mod.title}`+(status==='complete'?', completata':['started','experiment'].includes(status)?', iniziata':'');
            if(status==='complete')scaledText(this.R,'✓',c.x+c.w-36,y0+i*rowH+12,'mini',C.lime,1);});
        const top=y0+n*rowH+8,bottom=c.y+c.h-124,lines=fittedRows(this.R,[m.description],(c.w-28)/this.prefs.textScale),count=Math.max(0,Math.floor((bottom-top)/(23*this.prefs.textScale)));
        lines.slice(0,count).forEach((t,i)=>scaledText(this.R,t,c.x+14,top+i*23*this.prefs.textScale,'body',C.muted,this.prefs.textScale));
        this.text(unitStatus(m,this.store.data).label,c.x+14,c.y+c.h-118,c.w-28,'mini',C.lime,1);
        actions(c.y+c.h-94,(c.w-34)/2);
        this.text(`${n} UNITÀ IN ORDINE DI STUDIO · ${system.count} PIANETI`,c.x+14,c.y+c.h-30,c.w-28,'micro',C.muted,1);
    }
    drawOverlay(U){if(!this.sheet)return;if(this.sheet==='guide'){this.guideUI(U);return;}const r=this.layout.sheet;
        // Modal controls replace underlying actions, including map and global navigation.
        U.buttons=[];this.R.rect(0,90,this.R.w,this.R.h-90,color('#03121d',.97));U.panel(r.x,r.y,r.w,r.h,C.cyan,1);
        const headings={list:'CERCA UN ARGOMENTO',detail:'SCHEDA DELL’UNITÀ',routes:'PERCORSI DI STUDIO',history:'UNITÀ STUDIATE DI RECENTE',access:'ACCESSIBILITÀ',welcome:'BENVENUTO IN GAIA'};
        this.text(headings[this.sheet],r.x+14,r.y+16,r.w-126,'mini',C.lime,1);
        this.button(U,'close','CHIUDI',r.x+r.w-108,r.y+4,94,()=>this.close());
        const body={x:r.x+14,y:r.y+62,w:r.w-28,h:r.h-72};
        if(this.sheet==='list')this.listUI(U,body);
        if(this.sheet==='detail')this.detailUI(U,body);
        if(this.sheet==='routes')this.routesUI(U,body);
        if(this.sheet==='history')this.historyUI(U,body);
        if(this.sheet==='welcome')this.welcomeUI(U,body);
        if(this.sheet==='access')this.accessUI(U,body);
    }
    listUI(U,r){const q=this.query||'Scrivi un argomento, per esempio gas o genetica';
        this.button(U,'search',q,r.x,r.y,r.w-56,()=>this.search());this.button(U,'clear','X',r.x+r.w-48,r.y,48,()=>{this.query='';this.page=0;if(this.input)this.input.value='';});
        const filters=['TUTTE','MAT','FIS','CHI','BIO'],w=(r.w-24)/5;
        filters.forEach((name,i)=>this.button(U,'filter-'+i,name,r.x+i*(w+6),r.y+50,w,()=>{this.S.sector=i-1;this.page=0;},{active:this.S.sector===i-1}));
        const items=this.results,rowH=58,cap=Math.max(1,Math.floor((r.h-170)/rowH)),pages=Math.max(1,Math.ceil(items.length/cap));this.page=clamp(this.page,0,pages-1);
        this.text(items.length+' ARGOMENTI'+(this.path?' · FILTRO ROTTA':''),r.x,r.y+106,r.w,'micro',C.muted,1);
        items.slice(this.page*cap,(this.page+1)*cap).forEach((m,i)=>{const area=AREAS[systemForPlanet(m.planetIndex)].name;this.button(U,'result-'+m.id,`${m.title} · ${['MAT','FIS','CHI','BIO'][m.sector]} · ${area}`,r.x,r.y+130+i*rowH,r.w,()=>this.selectModule(m.id,true));const b=U.buttons.at(-1);b.label=`${DISCIPLINES[m.sector]}, area ${area}: ${m.title}. Seleziona e mostra sulla mappa.`;});
        if(!items.length)this.text('Nessun risultato. Cambia ricerca o filtro.',r.x,r.y+144,r.w,'body');
        this.pager(U,r,pages);
    }
    pager(U,r,pages){const y=r.y+r.h-46;this.button(U,'page-prev','<',r.x,y,48,()=>this.page--,{disabled:this.page===0});this.text(`${this.page+1} / ${pages}`,r.x+66,y+12,r.w-132,'mini',C.muted,1);this.button(U,'page-next','>',r.x+r.w-48,y,48,()=>this.page++,{disabled:this.page>=pages-1});}
    detailUI(U,r){const m=this.catalogue.modules[this.S.selected],d=this.bundle.courses.find(d=>d.id===m.id),sys=systemForPlanet(m.planetIndex),units=indicesForSystem(sys),bw=(r.w-6*(units.length-1))/units.length;
        units.forEach((index,i)=>{this.button(U,'detail-unit-'+i,String(i+1),r.x+i*(bw+6),r.y,bw,()=>{this.api.selectIndex(index);this.previewPage=0;},{active:m.planetIndex===index});U.buttons.at(-1).label='Unità '+(i+1)+': '+this.catalogue.modules[index].title;});
        this.text(m.title,r.x,r.y+54,r.w,'body',C.pale,Math.min(this.prefs.textScale,1.2));
        const lw=(r.w-12)/3;['SCOPRI','COMPRENDI','AVANZATO'].forEach((label,i)=>this.button(U,'level-'+i,label,r.x+i*(lw+6),r.y+86,lw,()=>{this.level=i;this.previewPage=0;},{active:this.level===i}));
        const level=['base','intermediate','advanced'][this.level],paragraphs=[m.title,...d.steps[0].text[level]];
        this.body(U,paragraphs,{x:r.x-14,y:r.y+140,w:r.w+28,h:r.h-194});
        const w=(r.w-6)/2;this.button(U,'detail-enter','SISTEMA 3D',r.x,r.y+r.h-46,w,()=>this.api.enterSystem(sys));this.button(U,'learn','APRI L’UNITÀ',r.x+w+6,r.y+r.h-46,w,()=>this.api.openCourse(m.id),{active:true});
    }
    routesUI(U,r){const rows=[{id:null,title:'NESSUN PERCORSO · Esplorazione libera'},...this.bundle.paths],cap=Math.max(1,Math.floor((r.h-108)/50)),pages=Math.max(1,Math.ceil(rows.length/cap));this.page=clamp(this.page,0,pages-1);
        this.text('Ogni percorso collega unità di più aree in un ordine consigliato.',r.x,r.y,r.w,'mini',C.muted,1);
        rows.slice(this.page*cap,(this.page+1)*cap).forEach((p,i)=>this.button(U,'path-'+(p.id||'none'),p.title,r.x,r.y+36+i*50,r.w,()=>{this.pathId=p.id;this.S.sector=-1;this.query='';this.close();if(p.units?.length){const m=this.catalogue.modules.find(m=>m.id===p.units[0]);this.api.selectIndex(m.planetIndex);this.focusSystem(systemForPlanet(m.planetIndex));}this.announce(p.id?'Percorso attivo: '+p.title+'. Usa CERCA per vederne le tappe.':'Percorsi nascosti.');},{active:this.pathId===p.id}));this.pager(U,r,pages);
    }
    historyUI(U,r){const ids=this.prefs.recent,cap=Math.max(1,Math.floor((r.h-110)/64)),pages=Math.max(1,Math.ceil(ids.length/cap));this.page=clamp(this.page,0,pages-1);
        this.text(this.store.persistent?'Salvato su questo dispositivo.':'Solo sessione: esporta il diario.',r.x,r.y,r.w,'mini',C.muted,1);
        if(!ids.length)this.body(U,['Non hai ancora aperto nessuna unità. Le unità che apri compariranno qui.'],{...r,y:r.y+34,h:r.h-34});
        else{ids.slice(this.page*cap,(this.page+1)*cap).forEach((id,i)=>{const m=this.catalogue.modules.find(m=>m.id===id);if(!m)return;const y=r.y+35+i*64;this.button(U,'resume-'+id,m.title,r.x,y,r.w,()=>this.api.openCourse(id));this.text(unitStatus(m,this.store.data).label,r.x+4,y+46,r.w-8,'micro',C.lime,1);});this.pager(U,r,pages);}
    }
    guideUI(U){const R=this.R,step=GUIDE[this.guideStep],l=this.layout,last=this.guideStep===GUIDE.length-1;
        const t=step.target==='map'?l.map:step.target==='card'?l.card:this.rects?.[step.target]||l.toolbar,pad=6,x0=t.x-pad,y0=t.y-pad,x1=t.x+t.w+pad,y1=t.y+t.h+pad,shade=color('#020c14',.62);
        U.buttons=[];
        R.rect(0,0,R.w,Math.max(0,y0),shade);R.rect(0,y1,R.w,Math.max(0,R.h-y1),shade);R.rect(0,y0,Math.max(0,x0),y1-y0,shade);R.rect(x1,y0,Math.max(0,R.w-x1),y1-y0,shade);
        const ring=R.roundPoints(x0,y0,x1-x0,y1-y0,12);R.polyline([...ring,ring[0]],C.lime,3,6);
        const bw=Math.min(440,R.w-32),rows=fittedRows(R,[step.text],(bw-32)/this.prefs.textScale),bh=118+rows.length*24*this.prefs.textScale;
        let bx=clamp(t.x+t.w/2-bw/2,16,R.w-bw-16),by=y1+12;
        if(by+bh>R.h-16)by=y0-bh-12;if(by<16||step.target==='map'){bx=clamp(t.x+t.w/2-bw/2,16,R.w-bw-16);by=clamp(t.y+t.h/2-bh/2,16,R.h-bh-16);}
        if(step.target==='card'&&!l.compact){bx=clamp(t.x-bw-18,16,R.w-bw-16);by=clamp(t.y+40,16,R.h-bh-16);}
        U.panel(bx,by,bw,bh,C.lime,1);
        this.text(step.title,bx+16,by+14,bw-32,'body',C.amber,1);
        rows.forEach((row,i)=>scaledText(R,row,bx+16,by+50+i*24*this.prefs.textScale,'body',C.pale,this.prefs.textScale));
        const w=(bw-44)/3,y=by+bh-58;
        this.button(U,'guide-close','CHIUDI',bx+16,y,w,()=>this.endGuide());
        this.button(U,'guide-prev','INDIETRO',bx+22+w,y,w,()=>{this.guideStep--;},{disabled:this.guideStep===0});
        this.button(U,'guide-next',last?'FINE':'AVANTI',bx+28+2*w,y,w,()=>{if(last)this.endGuide();else this.guideStep++;},{active:true});
    }
    welcomeUI(U,r){const lastId=this.prefs.lastUnit,last=lastId?this.catalogue.modules.find(m=>m.id===lastId):null,scale=this.prefs.textScale,line=24*scale,gap=56;
        const rows=[['welcome-search','CERCA UN ARGOMENTO',()=>{this.close();this.api.route('catalogue');}],['welcome-paths','SEGUI UN PERCORSO DI STUDIO',()=>{this.close();this.api.route('paths');}],['welcome-map','ESPLORA LA GALASSIA',()=>{this.close();if(!this.prefs.guideDone)this.startGuide();}]];
        if(last)rows.unshift(['welcome-resume','RIPRENDI: '+last.title,()=>{this.close();this.api.openCourse(last.id);}]);
        const intro=r.w<560?'100 unità di matematica, fisica, chimica e biologia, ciascuna con lezione, laboratorio e verifica.':'GAIA raccoglie 100 unità di matematica, fisica, chimica e biologia. Ogni unità ha una lezione su tre livelli, un laboratorio e quattro domande di verifica. Puoi arrivarci in tre modi.';
        const room=Math.max(0,Math.floor((r.h-rows.length*gap-40)/line)),lines=fittedRows(this.R,[intro],r.w/scale).slice(0,room);
        lines.forEach((t,i)=>scaledText(this.R,t,r.x,r.y+i*line,'body',C.pale,scale));
        const top=r.y+lines.length*line+(lines.length?18:0);rows.forEach(([id,label,act],i)=>this.button(U,id,label,r.x,top+i*gap,r.w,act,{active:i===0}));
        const note=top+rows.length*gap+8;fittedRows(this.R,['Ogni braccio della galassia è una disciplina; ogni area raccoglie unità vicine.'],r.w/scale).forEach((t,i)=>{if(note+(i+1)*22<r.y+r.h)scaledText(this.R,t,r.x,note+i*22,'mini',C.muted,1);});
    }
    accessUI(U,r){const rows=[
        ['scale','TESTO: '+Math.round(this.prefs.textScale*100)+'%',()=>{this.prefs.textScale=TEXT_SCALES[(TEXT_SCALES.indexOf(this.prefs.textScale)+1)%TEXT_SCALES.length];this.previewPage=0;this.save();this.applyPreferences();}],
        ['contrast','CONTRASTO ALTO: '+(this.prefs.contrast?'SÌ':'NO'),()=>{this.prefs.contrast=!this.prefs.contrast;this.save();this.applyPreferences();}],
        ['motion','MOVIMENTO: '+(this.S.paused?'RIDOTTO':'ATTIVO'),()=>{this.S.paused=!this.S.paused;this.store.data.preferences.motion=!this.S.paused;this.save();}],
        ['labels','NOMI DELLE AREE: '+(this.prefs.showLabels?'SÌ':'NO'),()=>{this.prefs.showLabels=!this.prefs.showLabels;this.save();}],
        ['up','RUOTA VERSO L’ALTO',()=>this.move(0,.1)],['down','RUOTA VERSO IL BASSO',()=>this.move(0,-.1)],
        ['reset','RIPRISTINA VISTA GALATTICA',()=>{this.reset();this.close();this.api.route('galaxy');}]
    ];
        const cap=Math.max(1,Math.floor((r.h-102)/50)),pages=Math.ceil(rows.length/cap);this.page=clamp(this.page,0,pages-1);
        this.text('Il testo vale per la mappa e per le unità.',r.x,r.y,r.w,'mini',C.muted,1);
        rows.slice(this.page*cap,(this.page+1)*cap).forEach(([id,label,act],i)=>this.button(U,'option-'+id,label,r.x,r.y+34+i*50,r.w,act));this.pager(U,r,pages);
    }
    semanticKey(){return [this.S.system,this.S.selected,this.S.sector,this.hoverId,this.sheet,this.query,this.page,this.previewPage,this.level,this.pathId,this.guideStep,this.prefs.textScale,this.prefs.contrast,this.store.data.updatedAt].join('|');}
    semanticText(){const m=this.module,system=m?this.world.systems[systemForPlanet(m.planetIndex)]:null;if(!m||!system)return '';
        let text=`Mappa di GAIA: quattro bracci, uno per disciplina, e 25 aree tematiche. ${system.discipline}, area ${system.name}, ${system.planets.length} unità. Selezionata: ${m.title}. ${m.description}. ${unitStatus(m,this.store.data).label}.`;
        if(this.sheet==='detail'){const d=this.bundle.courses.find(d=>d.id===this.catalogue.modules[this.S.selected].id);text+=' '+d.steps[0].text[['base','intermediate','advanced'][this.level]].join(' ')+' Ambito: '+d.scope;}
        if(this.sheet==='guide')text+=' Guida, '+GUIDE[this.guideStep].title+'. '+GUIDE[this.guideStep].text;
        if(this.sheet==='list')text+=' '+this.results.length+' risultati per '+(this.query||'tutti gli argomenti')+'.';
        if(this.path)text+=' Percorso attivo: '+this.path.title+'.';
        return text;
    }
}
