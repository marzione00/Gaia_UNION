/** Capture new atlas meshes and panels for isolated EGL replay (not a browser screenshot). */
import fs from 'node:fs';import vm from 'node:vm';import {resolve} from 'node:path';
import {fixture} from './atlas-fixture.mjs';import {color} from '../src/renderer.js';import {C} from '../src/ui/toolkit.js';import {vsMesh,fsMesh} from '../src/scene/shaders.js';
const out=resolve(process.argv[2]||'qa-atlas/render');fs.mkdirSync(out,{recursive:true});
const renderer=fs.readFileSync(new URL('../src/renderer.js',import.meta.url),'utf8'),app=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
fs.writeFileSync(out+'/render-shaders.json',JSON.stringify({vsMesh,fsMesh,vsUI:renderer.match(/const vsUI = `([\s\S]*?)`;/)[1],fsUI:renderer.match(/const fsUI = `([\s\S]*?)`;/)[1]}));
const common=app.slice(app.indexOf('function common() {'),app.indexOf('function galaxyUI() {'));
const nav=[['galaxy','ATLANTE'],['surface','SUPERFICIE'],['research','RICERCA'],['catalogue','CATALOGO'],['theory','TEORIA'],['mission','MISSIONI'],['lab','LABORATORI'],['quiz','VERIFICA'],['journal','DIARIO']];
for(const [name,w,h,sheet,scale]of[['desktop-map',1280,900,null,1],['mobile-map',390,844,null,1],['mobile-detail-large',390,844,'detail',1.4],['compact-list',320,568,'list',1.2],['landscape-map',844,390,null,1],['desktop-route',1280,900,null,1]]){
 const f=fixture(w,h,{capture:true,scale});f.A.sheet=sheet;if(name==='desktop-route')f.A.pathId=f.A.bundle.paths[4].id;f.draw();f.R.uiData=[];f.U.begin();vm.runInNewContext('('+common+')',{R:f.R,U:f.U,S:f.state,C,color,nav})();f.A.draw(f.U);f.A.drawOverlay(f.U);
 const meshes=Object.fromEntries([...f.R.meshes].map(([id,m])=>[id,{v:[...m.v],i:[...m.i]}]));
 fs.writeFileSync(`${out}/${name}.frame.json`,JSON.stringify({name,w,h,meshes,calls:f.R.calls,ui:f.R.uiData,stats:f.R.frameStats}));
}
console.log('Six atlas views captured for isolated geometry replay');
