import test from 'node:test';import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
import {loadScenes,sceneMetadata,planetProfile} from '../src/scene/assets.js';
import {backgroundStars} from '../src/scene/data.js';
import {World} from '../src/scene/world.js';import {project} from '../src/renderer.js';
const root=new URL('../',import.meta.url),manifest=JSON.parse(await readFile(new URL('assets/scenes/manifest.json',root)));
const biomes=manifest.biomes;
const gpu=()=>({w:1600,h:1000,makeStars(){},makeMesh(){}});
const state=()=>({scene:'galaxy',selected:7,yaw:0,pitch:.45,distance:60,paused:true,lastFrameMs:16});
test('Grafica: i 26 buffer nativi hanno hash, dimensioni e indici validi',async()=>{
 for(const biome of Object.values(biomes))for(const item of biome.meshes){
  const vb=await readFile(new URL(item.vertices,root)),ib=await readFile(new URL(item.indices,root));
  assert.equal(createHash('sha256').update(vb).digest('hex'),item.sha256.vertices);assert.equal(createHash('sha256').update(ib).digest('hex'),item.sha256.indices);
  assert.equal(vb.byteLength,item.vertexCount*64);assert.equal(ib.byteLength,item.indexCount*4);
  const v=new Float32Array(vb.buffer,vb.byteOffset,vb.length/4),ix=new Uint32Array(ib.buffer,ib.byteOffset,ib.length/4);
  assert.ok(v.every(Number.isFinite));assert.ok(ix.every(i=>i<item.vertexCount));
  for(let i=0;i<v.length;i+=16){assert.ok(Math.abs(Math.hypot(v[i+3],v[i+4],v[i+5])-1)<1e-4);assert.equal(v[i+15],item.kind);}
 }
});
test('Grafica: tre biomi con 875 celle reali campionate e quattro stazioni',()=>{
 assert.deepEqual(Object.keys(biomes).sort(),['esodo','marea','simbiosi']);
 for(const biome of Object.values(biomes)){assert.equal(biome.grid.cells.length,875);assert.equal(biome.stations.length,4);assert.equal(new Set(biome.stations.map(s=>s.index)).size,4);assert.ok(biome.grid.cells.every(p=>[p.x,p.y,p.z].every(Number.isFinite)));}
 assert.ok(biomes.marea.grid.cells.filter(p=>p.wet).length>800);
});
test('Grafica: cento profili riproducibili, Echo 08 resta Simbiosi',()=>{
 const profiles=Array.from({length:110},(_,i)=>planetProfile(i));assert.equal(profiles[7].biome,'simbiosi');assert.equal(new Set(profiles.map(p=>p.seed)).size,110);assert.equal(new Set(profiles.map(p=>p.kind)).size,4);assert.equal(new Set(profiles.map(p=>p.biome)).size,3);
});
test('Grafica: sfondo celeste separato con 6000 stelle finite',()=>{
 const a=backgroundStars();assert.equal(a.length,42000);assert.deepEqual(a,backgroundStars());
 for(let i=0;i<a.length;i+=7)assert.ok(Math.abs(Math.hypot(a[i],a[i+1],a[i+2])-170)<1e-4);
});
test('Grafica: transizione della camera converge e pausa la rende immediata',()=>{
 const w=new World(gpu(),{},biomes),s=state();w.camera('galaxy',s);const original=[...w.eye];s.paused=false;w.camera('orbit',s);assert.ok(Math.hypot(...w.eye.map((v,i)=>v-original[i]))<1);
 for(let i=0;i<120;i++)w.camera('orbit',s);assert.equal(w.cameraProgress,1);assert.ok(w.vp.every(Number.isFinite));s.paused=true;w.camera('surface',s);assert.equal(w.cameraProgress,1);assert.ok(w.eye[1]>20);
});
test('Grafica: selezione dei quattro anchor e del complesso centrale in ogni biome',()=>{
 const w=new World(gpu(),{},biomes),s=state();s.scene='surface';
 for(const index of [7,1,3]){w.activateBiome(index);w.camera('surface',s);w.projections=[];
  w.projections=w.surface.stations.map(station=>{const p=project(station.labelPosition,w.vp,1600,1000);return {type:'station',index:station.index,x:p[0],y:p[1],depth:p[2],r:28};});
  for(const p of w.projections)assert.equal(w.pick(p.x,p.y,s)?.index,p.index);
  w.projections=[];const station=w.surface.stations[0],center=[station.position[0],(station.position[1]+station.labelPosition[1])*.5,station.position[2]],p=project(center,w.vp,1600,1000);assert.equal(w.pick(p[0],p[1],s)?.index,0);
 }
});
test('Grafica: caricamento completo e rifiuto esplicito di buffer troncati',async t=>{
 const original=globalThis.fetch;let uploaded=0;
 t.after(()=>{globalThis.fetch=original});
 globalThis.fetch=async path=>({ok:true,arrayBuffer:async()=>{const b=await readFile(new URL(path,root));return b.buffer.slice(b.byteOffset,b.byteOffset+b.length)}});
 await loadScenes({makeMesh(id,m){assert.equal(m.stride,16);uploaded++;}},manifest);assert.equal(uploaded,13);
 globalThis.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(4)});
 await assert.rejects(loadScenes({makeMesh(){}},manifest),/incompleta/);
 globalThis.fetch=async()=>({ok:false});await assert.rejects(loadScenes({makeMesh(){}},manifest),/mancante/);
});
test('Avvio: solo i metadati delle scene Blender, senza scaricare le geometrie',async t=>{
 const original=globalThis.fetch;let calls=0;t.after(()=>{globalThis.fetch=original});globalThis.fetch=async()=>{calls++;return {ok:false};};
 assert.deepEqual(Object.keys(sceneMetadata(manifest)),Object.keys(biomes));assert.equal(calls,0);
 const app=await readFile(new URL('src/app.js',root),'utf8');assert.ok(!/loadScenes\(/.test(app));
 const broken=structuredClone(manifest);Object.values(broken.biomes)[0].stations.pop();assert.throws(()=>sceneMetadata(broken),/Metadati/);
});
test('Superfici generate: stazioni selezionabili, camera sopra il terreno, una superficie diversa per pianeta',async()=>{
 const {planetSurface}=await import('../src/worlds/surface.js');
 const w=new World(gpu(),{},biomes),s=state();s.scene='surface';
 for(const index of [7,36,69,99]){w.activatePlanet(index);w.camera('surface',s);const S=w.surface;assert.equal(S.key,'planet-'+index);
  assert.ok(w.eye[1]>S.heightAt(w.eye[0],w.eye[2])+4.9);assert.ok(w.vp.every(Number.isFinite));
  w.projections=S.stations.map(st=>{const p=project(st.labelPosition,w.vp,1600,1000);return {type:'station',index:st.index,x:p[0],y:p[1],depth:p[2],r:28};});
  for(const p of w.projections)assert.equal(w.pick(p.x,p.y,s)?.index,p.index);
 }
 const signatures=new Set();
 for(let index=0;index<110;index++){const S=planetSurface(index,41);assert.ok(S.mesh.v.every(Number.isFinite));assert.equal(S.stations.length,4);
  for(const st of S.stations)assert.ok(S.seaY===null||st.position[1]>=S.seaY+.44);
  signatures.add(Array.from(S.heights.filter((_,k)=>k%97===0),v=>v.toFixed(2)).join());}
 assert.equal(signatures.size,110);
});
