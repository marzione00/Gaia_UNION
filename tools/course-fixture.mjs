/** Test adapter, not a browser or a substitute for visual/device acceptance. */
import fs from 'node:fs';import {fileURLToPath} from 'node:url';
import {GPU} from '../src/renderer.js';import {UI,C} from '../src/ui/toolkit.js';import {CourseUI} from '../src/education/course-ui.js';import {fresh} from '../src/store.js';
export const root=fileURLToPath(new URL('../',import.meta.url));
export const bundle=JSON.parse(fs.readFileSync(root+'content/curriculum/bundle.json','utf8'));
export const metrics=JSON.parse(fs.readFileSync(root+'assets/glyphs.json','utf8'));
export function fixture(w=1600,h=1000,{capture=false,id='math-c08'}={}){
 const R=Object.create(GPU.prototype);Object.assign(R,{w,h,sceneWidth:w,sceneHeight:h,metrics,uiData:[],texts:[],meshes:new Map(),frameStats:{stars:0},calls:[],viewport:[0,0,w,h],made:0});
 R.gl={SCISSOR_TEST:3089,DEPTH_BUFFER_BIT:256,DEPTH_TEST:2929,viewport:(...v)=>R.viewport=v,enable(){},disable(){},scissor(){},clear(){},depthMask(){}};
 R.makeMesh=(id,data)=>{R.made++;R.meshes.set(id,{...data,count:data.i.length});};R.deleteMesh=id=>R.meshes.delete(id);R.drawMesh=(id,vp,model,options)=>{if(capture)R.calls.push({id,vp:[...vp],model:[...model],options,viewport:[...R.viewport]});};
 if(!capture)for(const method of ['rect','line','roundRect','hexagon','quad'])R[method]=()=>{};
 R.text=(t,x,y,style='body',color=C.pale,options={})=>{const text=String(t),width=R.textWidth(text,style,options.track||0),left=options.align==='right'?x-width:options.align==='center'?x-width/2:x;R.texts.push({text,x:left,y,w:width,h:metrics.styles[style]?.size||14,style});if(capture)GPU.prototype.text.call(R,text,x,y,style,color,options);};
 const state={scene:'mission',yaw:0,pitch:.45,unit:id},store={data:fresh(),persistent:true,save(){return true;}};
 const api={state,currentUnit:()=>state.unit,route(scene,extra={}){Object.assign(state,{scene},extra);},openCourse(next,stage=null){state.unit=next;state.scene='mission';E.select(next);if(stage!==null)E.setStage(stage);},openPDF(page){api.pdf=page;},openExternal(url){api.external=url;},say(t){api.message=t;},download(name,data,type){api.downloaded={name,data,type};}};
 const E=new CourseUI(R,store,bundle,api),U=new UI(R);E.select(id);
 const draw=(geometry=false)=>{R.uiData=[];R.texts=[];R.calls=[];U.begin();if(geometry)E.draw3D(state);E.drawUI(U,state);};
 const click=id=>{draw();const b=U.buttons.find(b=>b.id===id);if(!b||b.disabled)throw Error('Controllo non disponibile: '+id);U.activate(b,b.x+b.w/2);};
 return {R,U,E,state,store,api,draw,click};
}
export function layoutErrors(f){const {R,U}=f,errors=[];for(const b of U.buttons){if(b.x<0||b.y<98||b.x+b.w>R.w+.1||b.y+b.h>R.h-36)errors.push('Controllo fuori finestra: '+b.id);}
 for(let i=0;i<U.buttons.length;i++)for(let j=i+1;j<U.buttons.length;j++){const a=U.buttons[i],b=U.buttons[j];if(a.x<b.x+b.w-.1&&a.x+a.w>b.x+.1&&a.y<b.y+b.h-.1&&a.y+a.h>b.y+.1)errors.push('Sovrapposizione: '+a.id+' / '+b.id);}
 for(const t of R.texts)if(t.text.trim()&&(t.x<-.5||t.x+t.w>R.w+.5||t.y<98||t.y+t.h>R.h-36))errors.push('Testo fuori finestra: '+t.text);
 return errors;
}
