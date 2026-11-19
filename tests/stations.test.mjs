import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { AREAS, systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh, perspective, lookAt, mul } from '../src/renderer.js';
import { World, displayRadius } from '../src/scene/world.js';
import { systemCraft } from '../src/craft/catalog.js';
import { placeStations, stationPosition, STATION_SIZE } from '../src/craft/placement.js';
// Stations in the star systems: each station has a host suited to its role and stays clear of it.
const rock=sphereMesh(6,4);
const systemOf=id=>{const s={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(s,rock);s.belt={inner:b.inner,outer:b.outer};}return s;};
const GIANTS=['gas','ringed','icegiant'];
test('collocamento: sei stazioni per sistema, porta oltre la fascia, miniera nella fascia, ospiti adatti',()=>{
 AREAS.forEach((_,id)=>{
  const system=systemOf(id),entries=systemCraft(id),P=placeStations(system,entries,displayRadius),again=placeStations(system,entries,displayRadius);
  assert.deepEqual(P,again,'sistema '+id+': collocamento non deterministico');
  assert.equal(P.length,6,'sistema '+id);
  const by=t=>P.find(p=>p.entry.type===t),host=p=>system.bodies.find(b=>b.slot===p.host);
  const gate=by('porta');assert.equal(gate.kind,'edge');assert.ok(gate.distance>(system.belt?.outer??system.outerRadius)+gate.size,'sistema '+id+': porta dentro la fascia');
  const port=by('porto');assert.equal(port.kind,'orbit');assert.ok(host(port).explorable,'sistema '+id+': porto attorno a un pianeta di contorno');
  if(by('cantiere'))assert.equal(by('cantiere').host,port.host,'sistema '+id+': cantiere lontano dal porto');
  const mine=by('miniera');if(mine){assert.equal(mine.kind,'belt');assert.ok(mine.distance>system.belt.inner&&mine.distance<system.belt.outer);}
  const refinery=by('raffineria');if(refinery&&system.bodies.some(b=>GIANTS.includes(b.type)))assert.ok(GIANTS.includes(host(refinery).type),'sistema '+id+': raffineria lontana dai giganti');
  for(const p of P)assert.equal(p.size,STATION_SIZE[p.entry.type]??STATION_SIZE.default);
 });
});
test('orbite: posizioni finite, distanza costante dall\'ospite, nessuna stazione dentro il pianeta',()=>{
 for(const id of [0,1,13,26,29]){
  const system=systemOf(id),P=placeStations(system,systemCraft(id),displayRadius);
  for(const time of [0,17.5,400,12345]){
   const hostAt=slot=>bodyAtTime(system.bodies.find(b=>b.slot===slot),time).position;
   for(const p of P){
    const q=stationPosition(p,time,hostAt);assert.ok(q.every(Number.isFinite));
    if(p.kind==='orbit'){const h=hostAt(p.host),d=Math.hypot(...q.map((v,i)=>v-h[i])),body=system.bodies.find(b=>b.slot===p.host);assert.ok(Math.abs(d-p.distance)<1e-9);assert.ok(d>displayRadius(body)+p.size*1.2,p.entry.id);}
    else assert.ok(Math.abs(Math.hypot(q[0],q[2])-p.distance)<1e-9);
   }
  }
 }
});
test('scena: un modello costruito per fotogramma, mesh liberate al cambio di sistema, stazioni selezionabili',()=>{
 const made=new Set(),deleted=[],draws=[];
 const R={w:1600,h:1000,makeStars(){},makeMesh(id){if(id.startsWith('craft-'))made.add(id);},deleteMesh(id){if(id.startsWith('craft-')){deleted.push(id);made.delete(id);}},drawMesh(id){draws.push(id);},shadowKey:'surface',sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);w.cameraSpace='system';w.travelling=false;w.fov=.78;w.eye=[0,30,60];w.vp=mul(perspective(.78,1.6,.012,400),lookAt(w.eye,[0,0,0]));
 const s={scene:'system',time:3},first=systemOf(13);
 for(let frame=1;frame<=6;frame++){w.projections=[];w.drawStations(s,13,first);assert.equal(w.craft.list.filter(i=>i.model).length,frame);}
 assert.equal(R.shadowKey,'surface','la mappa delle ombre della superficie va ripristinata');
 assert.ok(made.size>=6);assert.equal(w.projections.filter(p=>p.type==='craft').length,6);
 assert.ok(w.projections.filter(p=>p.type==='craft').every(p=>p.entry&&p.entry.system===13&&Number.isFinite(p.x)));
 const before=made.size;w.drawStations(s,1,systemOf(1));
 assert.equal(deleted.length,before,'mesh del sistema precedente non liberate');assert.equal(w.craft.system,1);
});
