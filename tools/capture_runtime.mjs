/** Capture the actual WebGL calls emitted by the unchanged app UI and new 3D renderer.
 * DOM shims exercise application routes; native EGL replay validates GLSL and GPU passes.
 * This is not a browser end-to-end test. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.resolve(process.argv[2]||path.join(root,'..','runtime-qa-v140'));fs.mkdirSync(out,{recursive:true});
const constants={ARRAY_BUFFER:0x8892,ELEMENT_ARRAY_BUFFER:0x8893,BLEND:0x0BE2,CLAMP_TO_EDGE:0x812F,COLOR_ATTACHMENT0:0x8CE0,COLOR_BUFFER_BIT:0x4000,DEPTH_ATTACHMENT:0x8D00,DEPTH_BUFFER_BIT:0x100,DEPTH_COMPONENT:0x1902,DEPTH_COMPONENT24:0x81A6,DEPTH_TEST:0xB71,DYNAMIC_DRAW:0x88E8,FLOAT:0x1406,FRAMEBUFFER:0x8D40,FRAMEBUFFER_COMPLETE:0x8CD5,LINEAR:0x2601,MAX_TEXTURE_SIZE:0x0D33,NEAREST:0x2600,NONE:0,ONE:1,ONE_MINUS_SRC_ALPHA:0x303,POINTS:0,POLYGON_OFFSET_FILL:0x8037,RENDERBUFFER:0x8D41,RGBA:0x1908,RGBA8:0x8058,SRC_ALPHA:0x302,TEXTURE0:0x84C0,TEXTURE1:0x84C1,TEXTURE2:0x84C2,TEXTURE_2D:0xDE1,TEXTURE_MAG_FILTER:0x2800,TEXTURE_MIN_FILTER:0x2801,TEXTURE_WRAP_S:0x2802,TEXTURE_WRAP_T:0x2803,TRIANGLES:4,UNSIGNED_BYTE:0x1401,UNSIGNED_INT:0x1405,COMPILE_STATUS:0x8B81,FRAGMENT_SHADER:0x8B30,LINEAR_MIPMAP_LINEAR:0x2703,LINK_STATUS:0x8B82,RENDERER:0x1F01,SHADING_LANGUAGE_VERSION:0x8B8C,STATIC_DRAW:0x88E4,UNPACK_FLIP_Y_WEBGL:0x9240,VERSION:0x1F02,VERTEX_SHADER:0x8B31};
let id=0,binaryId=0,commands=[];
function serialize(value,bulk=false){
 if(ArrayBuffer.isView(value)){if(bulk){const name='buffer-'+(++binaryId)+'.bin';fs.writeFileSync(path.join(out,name),Buffer.from(value.buffer,value.byteOffset,value.byteLength));return {binary:name,bytes:value.byteLength};}return Array.from(value);}
 if(value instanceof Image)return {image:value.src};return value;
}
const gl=new Proxy(constants,{get(t,k){
 if(k in t)return t[k];
 if(k==='getParameter')return key=>key===constants.MAX_TEXTURE_SIZE?4096:'Recorded WebGL commands';
 if(k==='getExtension')return ()=>null;if(k==='getError')return ()=>0;
 if(k==='getShaderParameter'||k==='getProgramParameter')return ()=>true;
 if(k==='checkFramebufferStatus')return ()=>constants.FRAMEBUFFER_COMPLETE;
 return (...args)=>{let result=null;if(k.startsWith('create')||k==='getUniformLocation')result={ref:++id};commands.push({op:k,args:args.map((a)=>serialize(a,k==='bufferData'||k==='texImage2D')),result});return result;};
}});
const listeners=new Map();
function element(name){return {name,style:{},dataset:{},value:'',textContent:'',children:[],clientWidth:1600,clientHeight:1000,width:1600,height:1000,addEventListener(k,f){listeners.set(name+':'+k,f)},append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x},querySelector(selector){const m=/data-id="([^"]+)"/.exec(selector);return m?this.children.find(e=>e.dataset?.id===m[1])||null:null},setAttribute(){},focus(){document.activeElement=this;this.onfocus?.()},blur(){this.onblur?.();document.activeElement=null},setSelectionRange(){},setPointerCapture(){},releasePointerCapture(){},getContext(){return gl},getBoundingClientRect(){return {left:0,top:0,width:this.clientWidth,height:this.clientHeight}}};}
const elements=Object.fromEntries(['gaia','error','editor','semantic','status','fileInput','semantic-text'].map(x=>['#'+x,element(x)]));
globalThis.window=globalThis;window.devicePixelRatio=1;window.addEventListener=(k,f)=>listeners.set('window:'+k,f);
let clock=1000;globalThis.performance={now:()=>clock};
globalThis.document={querySelector:s=>elements[s]||null,createElement:element,addEventListener(){},hidden:false};
globalThis.matchMedia=()=>({matches:false});globalThis.location={href:'http://gaia.local/',hash:'#/galaxy?unit=math-c08'};
globalThis.history={pushState(a,b,h){location.hash=h},replaceState(a,b,h){location.hash=h}};
const storage=new Map();globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
globalThis.fetch=async p=>{const file=path.resolve(root,p);return {ok:fs.existsSync(file),json:async()=>JSON.parse(fs.readFileSync(file,'utf8')),arrayBuffer:async()=>{const b=fs.readFileSync(file);return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)}}};
globalThis.Image=class{set src(p){this._src=p;queueMicrotask(()=>this.onload?.())}get src(){return this._src}};
const {stars}=await import('../src/scene/data.js');
globalThis.Worker=class{postMessage({count,seed}){queueMicrotask(()=>this.onmessage({data:{values:stars(count,seed)}}))}terminate(){}};
let nextFrame=null;globalThis.requestAnimationFrame=f=>{nextFrame=f;return 1};globalThis.cancelAnimationFrame=()=>{};
await import('../src/app.js');
for(let n=0;n<300&&!window.GAIA;n++)await new Promise(r=>setImmediate(r));
if(!window.GAIA)throw Error('App failed: '+elements['#error'].children.map(x=>x.textContent).join(' '));
const initialization=commands;commands=[];const frames=[],checks=[];
const world=GAIA.world,state=GAIA.state;
function event(type,x=0,y=0,extra={}){listeners.get('gaia:'+type)?.({clientX:x,clientY:y,pointerId:1,pointerType:'mouse',preventDefault(){},...extra});}
function click(x,y,pointerType='mouse'){event('pointerdown',x,y,{pointerType});event('pointerup',x,y,{pointerType});}
async function tick(name,dt=16,snapshot=true){
 clock+=dt;nextFrame(clock);await new Promise(r=>setImmediate(r));
 assert.equal(elements['#error'].style.display,undefined,'Application rendering failure');
 const pointDraws=commands.filter(c=>c.op==='drawArrays'&&c.args[0]===constants.POINTS).map(c=>c.args[2]);
 if(['galaxy','system','orbit'].includes(state.scene)){assert.deepEqual(pointDraws,[1000000],name+': actual GPU star submission');assert.equal(GAIA.diagnostics().starsDrawn,1000000);}
 if(state.scene==='orbit'){const guideVaos=new Set([...GAIA.renderer.meshes].filter(([id])=>id.startsWith('orbit-')).map(([,m])=>m.vao.ref));assert.ok(!commands.some(c=>c.op==='bindVertexArray'&&guideVaos.has(c.args[0]?.ref)),name+': close orbit must not draw camera-crossing guides');}
 frames.push({name,width:elements['#gaia'].clientWidth,height:elements['#gaia'].clientHeight,snapshot,scene:state.scene,starSubmissions:pointDraws,commands});commands=[];
}
async function scene(name,id,extra={},size=[1600,1000]){
 Object.assign(elements['#gaia'],{clientWidth:size[0],clientHeight:size[1]});event('pointerleave');
 GAIA.route(id,extra);Object.assign(state,{time:12,paused:true,yaw:0,pitch:.45,distance:id==='system'?34:id==='orbit'?22:60,toastUntil:0});
 await tick(name+'-load',16,false);await tick(name);
}
const visible=p=>p.depth>0&&p.x>300&&p.x<1220&&p.y>270&&p.y<850;
await scene('galaxy','galaxy');assert.equal(world.projections.length,25);assert.ok(world.projections.every(p=>p.type==='system'));checks.push('Galaxy: 25 systems, no planet meshes, one million actual POINTS');
const systems=world.systems;assert.equal(new Set(systems.map(s=>s.starIndex)).size,25);
let target=world.projections.find(p=>p.index===7&&visible(p))||world.projections.find(visible);assert.ok(target);
event('pointermove',target.x,target.y);await tick('hover-pending',16,false);assert.equal(state.hoveredTarget,null);await tick('hover-system',150);assert.equal(state.hoveredTarget.index,target.index);checks.push('System hover: description after 130 ms');
event('pointermove',1450,400);await tick('hover-panel',16,false);assert.equal(state.hoveredTarget,null);click(1450,400);assert.equal(state.scene,'galaxy');checks.push('Panels block underlying scene picking');
const oldYaw=state.yaw;event('pointerdown',target.x,target.y);event('pointermove',target.x+50,target.y+12);event('pointerup',target.x+50,target.y+12);assert.equal(state.scene,'galaxy');assert.notEqual(state.yaw,oldYaw);checks.push('Drag rotates, never enters a system');
Object.assign(state,{yaw:.23,pitch:.51,distance:57});await tick('galaxy-before-entry',16,false);
target=world.projections.find(p=>p.index===7&&visible(p))||world.projections.find(visible);const entry=target.index,galaxyCamera=[state.yaw,state.pitch,state.distance,state.sector];state.paused=false;
click(target.x,target.y);assert.equal(state.scene,'system');assert.equal(state.system,entry);
for(let n=0;n<23;n++)await tick('zoom-system-'+String(n).padStart(2,'0'),80,n%4===0||n===22);
assert.equal(world.cameraProgress,1);assert.equal(world.cameraSpace,'system');assert.equal(world.projections.filter(p=>p.type==='planet').length,4);assert.equal(world.projections.length,world.systems[entry].count);await tick('system');checks.push('One mouse click enters a system in 1.75 seconds with 1M points in every transition frame');
Object.assign(state,{yaw:.17,pitch:.5,distance:32});await tick('system-camera',16,false);const systemCamera=[state.yaw,state.pitch,state.distance];
let planet=world.projections.find(p=>p.index===entry&&visible(p)&&world.pick(p.x,p.y,state)?.index===p.index)||world.projections.find(p=>p.type==='planet'&&visible(p)&&world.pick(p.x,p.y,state)?.index===p.index);assert.ok(planet);
event('pointermove',planet.x,planet.y);await tick('planet-hover-pending',16,false);await tick('hover-planet',150);assert.equal(state.hoveredTarget.type,'planet');assert.equal(state.hoveredTarget.index,planet.index);
click(planet.x,planet.y);assert.equal(state.scene,'orbit');assert.equal(state.selected,planet.index);
for(let n=0;n<13;n++)await tick('zoom-planet-'+String(n).padStart(2,'0'),80,n%4===0||n===12);
assert.equal(world.cameraProgress,1);await tick('orbit');checks.push('Planet hover and single-click orbital approach');
state.paused=true;GAIA.backToParent();await tick('system-return');assert.deepEqual([state.yaw,state.pitch,state.distance],systemCamera);
GAIA.backToParent();await tick('galaxy-return');assert.deepEqual([state.yaw,state.pitch,state.distance,state.sector],galaxyCamera);checks.push('Return restores camera, zoom and discipline exactly');
// Keyboard semantics expose all systems even when a star is behind a panel.
const action=elements['#semantic'].children.find(e=>e.dataset?.id==='scene-system-7');assert.ok(action);action.focus();await tick('keyboard-system',16,false);assert.equal(state.hoveredTarget.index,7);action.onclick();await tick('keyboard-enter',16,false);assert.equal(state.scene,'system');assert.equal(state.system,7);checks.push('Keyboard focus describes systems; activation opens them');action.blur();
await scene('galaxy-quality','galaxy');
let button=GAIA.buttons.find(b=>b.id==='settings');click(button.x+5,button.y+5);await tick('quality-open',16,false);
for(const mode of ['low','balanced','high']){button=GAIA.buttons.find(b=>b.id==='graphics-'+mode);assert.ok(button);click(button.x+8,button.y+8);await tick('quality-'+mode,16,mode==='low');assert.equal(state.graphics,mode);assert.equal(GAIA.diagnostics().starsDrawn,1000000);assert.equal(GAIA.renderer.canvas.width,1600);}
checks.push('All three quality modes retain 1M submitted stars and full-resolution UI');button=GAIA.buttons.find(b=>b.id==='close-settings');click(button.x+8,button.y+8);await tick('quality-close',16,false);
await scene('system-many','system',{system:0,selected:0});
const ambient=world.projections.find(p=>p.type==='ambient'&&visible(p)&&world.pick(p.x,p.y,state)?.type==='ambient');assert.ok(ambient,'Reachable extra planet');
event('pointermove',ambient.x,ambient.y);await tick('ambient-pending',16,false);await tick('ambient-description',150);assert.equal(state.hoveredTarget.type,'ambient');
const previousSelection=state.selected;click(ambient.x,ambient.y);await tick('ambient-click',16,false);assert.equal(state.scene,'system');assert.equal(state.selected,previousSelection);assert.ok(GAIA.buttons.find(b=>b.id==='orbit-unit').disabled);const disabledEntry=GAIA.buttons.find(b=>b.id==='orbit-unit');click(disabledEntry.x+5,disabledEntry.y+5);listeners.get('window:keydown')?.({key:'Enter',target:{tagName:'CANVAS'},preventDefault(){}});assert.equal(state.scene,'system');checks.push('Extra planets describe their type but cannot enter orbit or surface');
await scene('system-few','system',{system:7,selected:7});
for(const type of ['desert','arctic','volcanic','barren','oceanic']){const planet=world.systems.flatMap(s=>s.bodies).find(b=>b.explorable&&b.type===type);await scene('type-'+type,'orbit',{selected:planet.index});}
await scene('biosfera','orbit',{selected:7});await scene('simbiosi','surface');
await scene('oceanico','orbit',{selected:1});await scene('marea','surface');
await scene('primordiale','orbit',{selected:3});await scene('esodo','surface');
await scene('research','research');await scene('lab','lab',{lab:'daisyworld'});await scene('theory','theory',{reader:'math-c08',section:0});await scene('pdf','pdf',{pdfPage:245});await scene('quiz','quiz');
await scene('mobile-galaxy','galaxy',{},[390,844]);
target=world.projections.find(p=>p.depth>0&&p.x>28&&p.x<362&&p.y>283&&p.y<525);assert.ok(target,'Mobile reachable system');
click(target.x,target.y,'touch');await tick('mobile-description');assert.equal(state.scene,'galaxy');assert.equal(state.system,target.index);
click(target.x,target.y,'touch');await tick('mobile-system');assert.equal(state.scene,'system');checks.push('Touch first tap selects and describes, second tap enters');
await scene('mobile-surface','surface',{selected:7},[390,844]);
// Camera-independent astronomical environment and uncommon objects.
const catalogue=JSON.stringify(world.cosmos);
for(const id of [7,13,20,5,9,18,3])await scene('cosmos-system-'+id,'system',{system:id,selected:id});
assert.equal(JSON.stringify(world.cosmos),catalogue,'Camera never changes the cosmic catalogue');
assert.ok(world.systems.filter(s=>s.belt).length===8);assert.ok(world.systems.filter(s=>s.comet).length===3);
await scene('cosmos-mobile-orbit','orbit',{selected:7},[390,844]);
checks.push('Five persistent regions, 15 world-space volumes, eight asteroid belts, three comets; same catalogue in galaxy/system/orbit');
// A continuous camera motion rendered by the real application, for the review video.
if(process.env.GAIA_VIDEO==='1'){
 for(const [shot,sceneId,extra] of [['galaxy','galaxy',{}],['system','system',{system:7,selected:7}],['planet','orbit',{selected:7}]]){
  await scene('video-'+shot+'-start',sceneId,extra,[1280,800]);
  for(let n=0;n<60;n++){const t=n/59;state.yaw=(t*t*(3-2*t))*(shot==='galaxy'?.65:shot==='system'?.9:1.45);await tick('video-'+shot+'-'+String(n).padStart(3,'0'),50,true);}
 }
}
fs.writeFileSync(path.join(out,'calls.json'),JSON.stringify({root,initialization,frames}));
fs.writeFileSync(path.join(out,'application-checks.json'),JSON.stringify({version:'1.4.0',kind:'DOM shim, actual application event handlers and renderer',checks,diagnostics:GAIA.diagnostics(),frames:frames.map(({commands,...f})=>f)},null,2));
console.log(JSON.stringify({frames:frames.length,snapshots:frames.filter(f=>f.snapshot).length,initialCalls:initialization.length,binaryFiles:binaryId,checks},null,2));
