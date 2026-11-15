/** Deterministic geometry/UI fixture. Not a browser. */
import fs from 'node:fs';
import {GPU,project,lookAt,perspective,mul} from '../src/renderer.js';
import {UI,C} from '../src/ui/toolkit.js';
import {AtlasUI} from '../src/navigation/atlas-ui.js';
import {galaxyCamera} from '../src/navigation/atlas-model.js';
import {buildSystems,pickProjected,systemForPlanet} from '../src/scene/systems.js';
import {stars} from '../src/scene/data.js';
import {fresh} from '../src/store.js';
const json=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
export const catalogue=json('content/catalogue.json'),bundle=json('content/curriculum/bundle.json'),metrics=json('assets/glyphs.json');
const systems=buildSystems(stars(1000000),catalogue.modules);
export function fixture(w=1280,h=900,{scale=1,capture=false}={}){
    const R=Object.create(GPU.prototype);Object.assign(R,{w,h,sceneWidth:w,sceneHeight:h,metrics,uiData:[],texts:[],meshes:new Map(),frameStats:{stars:0},calls:[],viewport:[0,0,w,h],made:0,fogDensity:0});
    R.gl={DEPTH_TEST:2929,disable(){},enable(){}};
    R.makeMesh=(id,data)=>{R.made++;R.meshes.set(id,{...data,count:data.i.length});};R.deleteMesh=id=>R.meshes.delete(id);
    R.drawMesh=(id,vp,model,options)=>{if(capture)R.calls.push({id,vp:[...vp],model:[...model],options,viewport:[...R.viewport]});};
    const state={scene:'galaxy',system:systemForPlanet(7),selected:7,sector:-1,yaw:0,pitch:.45,distance:60,paused:true,time:0,toastUntil:0};
    const store={data:fresh(),persistent:true,save(){return true;}};store.data.atlas.textScale=scale;
    const world={systems,projections:[],cameraProgress:1,fov:.84,pick(x,y){return pickProjected(this.projections,x,y);}};
    const api={state,selectIndex(i){state.selected=i;state.system=systemForPlanet(i);},route(scene){state.scene=scene;A.onRoute(scene);},enterSystem(id){state.system=id;state.scene='system';A.onRoute('system');},openCourse(id){state.selected=catalogue.modules.find(m=>m.id===id).planetIndex;state.scene='mission';A.onRoute('mission');},zoom(x){state.distance=Math.max(23,Math.min(100,state.distance*x));},say(s){api.message=s;},reducedMotion:()=>false,focusCanvas(){}};
    const A=new AtlasUI(R,world,store,catalogue,bundle,api),U=new UI(R);
    function draw(geometry=true){R.uiData=[];R.texts=[];R.calls=[];U.begin();A.tick(1000);Object.assign(world,galaxyCamera(state,w,h));world.vp=mul(perspective(.84,w/h,.00004,400),lookAt(world.eye,world.target));world.projections=systems.map(s=>{const [x,y,depth]=project(s.position,world.vp,w,h);return {index:s.id,type:'system',x,y,depth,r:24};});if(geometry)A.draw3D(state,null,null,U.focus);A.draw(U);A.drawOverlay(U);}
    function click(id){draw();const b=U.buttons.find(b=>b.id===id);if(!b||b.disabled)throw Error('Missing action '+id);U.activate(b,b.x+b.w/2);}
    return {R,U,A,state,store,world,api,draw,click};
}
export function layoutErrors(f){const {R,U}=f,errors=[];
    for(const b of U.buttons){if(b.x<0||b.y<0||b.x+b.w>R.w+.1||b.y+b.h>R.h+.1)errors.push('outside '+b.id);if(b.w<43.9||b.h<43.9)errors.push('small target '+b.id+' '+b.w+'x'+b.h);}
    for(let i=0;i<U.buttons.length;i++)for(let j=i+1;j<U.buttons.length;j++){const a=U.buttons[i],b=U.buttons[j];if(a.x<b.x+b.w-.1&&a.x+a.w>b.x+.1&&a.y<b.y+b.h-.1&&a.y+a.h>b.y+.1)errors.push('overlap '+a.id+' / '+b.id);}
    return errors;
}
