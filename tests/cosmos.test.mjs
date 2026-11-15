import test from 'node:test';import assert from 'node:assert/strict';
import {stars} from '../src/scene/data.js';
import {buildSystems,MIN_STARS} from '../src/scene/systems.js';
import {createCosmos,enrichCosmicStars,orderedVolumes,regionAt,volumeInterval,COSMIC_QUALITY,MAX_COSMIC_VOLUMES} from '../src/scene/cosmos.js';
import {asteroidBelt,cometTail} from '../src/scene/minor-bodies.js';
import {sphereMesh} from '../src/renderer.js';
const points=stars(MIN_STARS),systems=buildSystems(points),cosmos=createCosmos(systems);
test('Cosmo: cinque regioni e quindici volumi stabili indipendenti dalla camera',()=>{
 assert.deepEqual(cosmos,createCosmos(systems));assert.equal(cosmos.regions.length,5);assert.equal(cosmos.volumes.length,MAX_COSMIC_VOLUMES);assert.equal(new Set(cosmos.volumes.map(v=>v.id)).size,15);
 assert.equal(new Set(cosmos.systems.map(s=>s.region)).size,5);
 for(const v of cosmos.volumes){assert.ok([...v.center,...v.axes,...v.color,v.strength,v.seed].every(Number.isFinite));assert.ok(v.axes.every(x=>x>0));}
 const before=JSON.stringify(cosmos);for(const eye of [[0,20,60],[10,0,0],[-20,3,-4]]){const sorted=orderedVolumes(cosmos,eye);assert.equal(sorted.length,15);assert.ok(Math.hypot(...sorted[0].center.map((x,i)=>x-eye[i]))>=Math.hypot(...sorted.at(-1).center.map((x,i)=>x-eye[i])));}assert.equal(JSON.stringify(cosmos),before);
});
test('Cosmo: tutti i sistemi hanno la medesima regione deterministica in ogni vista',()=>{
 for(const s of systems)assert.equal(cosmos.systems[s.id].region,regionAt(s.position,cosmos.regions).id);
});
test('Cosmo: ammassi e stelle brillanti conservano 1M punti e tutte le 25 stelle navigabili',()=>{
 const a=points.slice(),b=points.slice();enrichCosmicStars(a,cosmos,systems);enrichCosmicStars(b,cosmos,systems);assert.deepEqual(a,b);assert.equal(a.length,MIN_STARS*7);assert.ok(a.every(Number.isFinite));
 for(const s of systems)assert.deepEqual(a.slice(s.starIndex*7,s.starIndex*7+7),points.slice(s.starIndex*7,s.starIndex*7+7));
 let changed=0;for(let i=0;i<a.length;i+=7)if(a[i]!==points[i])changed++;assert.ok(changed>10000&&changed<13000);
});
test('Cosmo: estinzione limitata al segmento camera-stella, inclusa camera interna',()=>{
 const v={center:[0,0,10],axes:[2,3,2]};assert.equal(volumeInterval([0,0,0],[0,0,1],v,7),null);assert.deepEqual(volumeInterval([0,0,0],[0,0,1],v,20),[8,12]);assert.deepEqual(volumeInterval([0,0,10],[0,0,1],v,20),[0,2]);assert.equal(volumeInterval([0,0,0],[1,0,0],v),null);assert.equal(volumeInterval([0,0,0],[0,0,-1],v),null);
});
test('Cosmo: qualità riduce campionamento volumetrico con limite esplicito dello shader',()=>{
 assert.ok(COSMIC_QUALITY.low.steps<COSMIC_QUALITY.balanced.steps&&COSMIC_QUALITY.balanced.steps<COSMIC_QUALITY.high.steps);for(const q of Object.values(COSMIC_QUALITY)){assert.ok(q.steps<=72&&q.steps>=20);assert.ok(q.scale>0&&q.scale<=1);assert.equal('stars' in q,false);}
});
test('Asteroidi: geometrie riproducibili oltre le orbite planetarie, UV NASA e indici validi',()=>{
 const sphere=sphereMesh(6,4),belt=asteroidBelt(systems[7],sphere);assert.deepEqual(belt,asteroidBelt(systems[7],sphere));assert.ok(belt.count>=280&&belt.count<460);assert.ok(belt.inner>systems[7].outerRadius);assert.ok(belt.v.every(Number.isFinite));assert.ok(belt.i.every(x=>x<belt.v.length/12));for(let i=0;i<belt.v.length;i+=12){assert.ok(Math.hypot(belt.v[i],belt.v[i+2])>systems[7].outerRadius);assert.ok(belt.v[i+6]>=0&&belt.v[i+6]<=1);}
});
test('Comete: code tridimensionali orientate dalla stella verso l’esterno',()=>{
 const head=[-10,2,-7],tail=cometTail(head,7,.2);assert.ok(tail.v.every(Number.isFinite));assert.ok(tail.i.every(x=>x<tail.v.length/12));const end=Array.from(tail.v.slice(-12,-9));assert.ok(Math.hypot(...end)>Math.hypot(...head)+6);assert.equal(tail.v.at(-5),1);
});
