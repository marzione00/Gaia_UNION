import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {daisyCover,blueFraction,tideRatio,logisticStates,logisticRegime,pilotWorld,PILOT_UNITS,worldParameters,LAKE_TEMPERATURES} from '../src/worlds/pilots.js';
import {value,defaults} from '../src/models/curriculum.js';
import {planetProfile} from '../src/scene/assets.js';
const json=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const catalogue=json('content/catalogue.json'),worlds=json('content/worlds/catalogue.json');
test('Mondi: un fenomeno per ciascuna delle 125 unità, kit e superfici validi',()=>{
 const ids=catalogue.modules.map(m=>m.id);assert.equal(worlds.worlds.length,125);assert.deepEqual(worlds.worlds.map(w=>w.unit),ids);
 for(const w of worlds.worlds){assert.ok(w.phenomenon&&w.scene&&w.binding);assert.ok(w.kits.length&&w.kits.every(k=>k in worlds.kits));assert.ok(['simbiosi','marea','esodo'].includes(w.surface));assert.ok(['prototipo','da realizzare'].includes(w.status));assert.ok(!/—/.test(JSON.stringify(w)))}
 assert.deepEqual(worlds.worlds.filter(w=>w.status==='prototipo').map(w=>w.unit).sort(),[...PILOT_UNITS].sort());
});
test('Mondi prototipo: la superficie di atterraggio del pianeta è quella del fenomeno',()=>{
 for(const unit of PILOT_UNITS){const m=catalogue.modules.find(m=>m.id===unit);assert.equal(planetProfile(m.planetIndex).biome,pilotWorld(unit).surface,unit);assert.equal(worlds.worlds.find(w=>w.unit===unit).surface,pilotWorld(unit).surface)}
});
test('Daisyworld: le coperture riproducono l’albedo A fra 0,25 e 0,75',()=>{
 for(let A=.25;A<=.75+1e-9;A+=.05){const c=daisyCover(A);assert.ok(c.reachable);assert.ok(Math.abs(c.albedo-A)<1e-9);assert.ok(c.white>=0&&c.black>=0&&c.ground>=-1e-12&&c.white+c.black<=1+1e-12)}
 assert.equal(daisyCover(.9).reachable,false);assert.equal(daisyCover(.1).reachable,false);assert.equal(daisyCover(.9).white,1);assert.equal(daisyCover(.1).black,1);
 const s=pilotWorld('biology-25').state(defaults('biology-25'),1);assert.equal(s.T,value('biology-25',1,defaults('biology-25')));
});
test('Laghi del cobalto: con ΔH > 0 la forma blu cresce con la temperatura, con ΔH < 0 diminuisce',()=>{
 const up=LAKE_TEMPERATURES.map(T=>blueFraction(T,{a:1,b:20})),down=LAKE_TEMPERATURES.map(T=>blueFraction(T,{a:1,b:-20}));
 for(let i=1;i<up.length;i++){assert.ok(up[i]>up[i-1]);assert.ok(down[i]<down[i-1])}
 assert.ok(Math.abs(blueFraction(298.15,{a:1,b:20})-.5)<1e-12);
});
test('Maree: proporzionali a μ e a 1/r³, uguali a 1 per μ = 10 e r = 2',()=>{
 assert.equal(tideRatio(10,2),1);assert.ok(Math.abs(tideRatio(20,2)-2)<1e-12);assert.ok(Math.abs(tideRatio(10,1)-8)<1e-12);
 const s=pilotWorld('physics-12').state(defaults('physics-12'),2,0);assert.equal(s.g,value('physics-12',2,defaults('physics-12')));assert.ok(Number.isFinite(s.level));
});
test('Branco dell’isola: stati della mappa logistica e regime a lungo termine',()=>{
 const p=defaults('math-p08');logisticStates(p,12).forEach((x,n)=>assert.equal(x,value('math-p08',n,p)));
 assert.equal(logisticRegime(.9).code,'extinct');assert.equal(logisticRegime(2.8).code,'stable');assert.equal(logisticRegime(3.2).label,'oscilla fra 2 valori');assert.equal(logisticRegime(3.5).label,'oscilla fra 4 valori');assert.equal(logisticRegime(3.9).code,'chaos');
 const s=pilotWorld('math-p08').state(p,0,30,false);assert.equal(s.animals,Math.round(s.xn*90));
});
test('Mondi prototipo: parametri dal laboratorio solo se validi, testi senza trattini lunghi',()=>{
 assert.deepEqual(worldParameters('biology-25',{parameters:{a:.7}}),{a:.7});assert.deepEqual(worldParameters('biology-25',{parameters:{a:7}}),defaults('biology-25'));
 for(const unit of PILOT_UNITS){const w=pilotWorld(unit),s=w.state(defaults(unit),w.x?.value??0,5,false);for(const line of w.lines(s)){assert.equal(typeof line,'string');assert.ok(!/—|NaN|undefined/.test(line),line)}}
});
