import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {buildGenomes,genomeDistance,MIN_DISTANCE,STYLES,starTypes} from '../src/worlds/genome.js';
import {terrainHeights,colorAt} from '../src/worlds/terrain.js';
import {AREAS} from '../src/scene/systems.js';
import {planetProfile} from '../src/scene/assets.js';
import {pilotWorld} from '../src/worlds/pilots.js';
const json=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const genomes=buildGenomes(),snapshot=json('content/worlds/genomes.json'),catalogue=json('content/catalogue.json');
test('Carte d’identità: generate in modo deterministico e uguali al file pubblicato',()=>{
 assert.equal(genomes.length,110);assert.deepEqual(JSON.parse(JSON.stringify(buildGenomes())),JSON.parse(JSON.stringify(genomes)));
 snapshot.planets.forEach((p,i)=>{const {unit,title,styleName,...g}=p;assert.deepEqual(g,JSON.parse(JSON.stringify(genomes[i])));assert.equal(unit,catalogue.modules.find(m=>m.planetIndex===i).id)});
});
test('Carte d’identità: nessuna coppia di pianeti sotto la distanza minima; terreni diversi in ogni area',()=>{
 let min=Infinity;for(let i=0;i<genomes.length;i++)for(let j=i+1;j<genomes.length;j++)min=Math.min(min,genomeDistance(genomes[i],genomes[j]));assert.ok(min>=MIN_DISTANCE,String(min));
 for(const area of AREAS){const styles=area.units.map(i=>genomes[i].terrain.style);assert.equal(new Set(styles).size,styles.length,area.name)}
 const used=new Set(genomes.map(g=>g.terrain.style));for(const list of Object.values(STYLES))for(const s of list)assert.ok(used.has(s),s);
 for(const g of genomes)assert.ok(STYLES[g.family].includes(g.terrain.style));
});
test('Carte d’identità: tipi di stella bilanciati, famiglie dei prototipi coerenti con la superficie',()=>{
 const count={};for(const t of starTypes())count[t]=(count[t]||0)+1;assert.deepEqual(count,{M:6,K:5,G:6,F:5,A:5});
 for(const unit of ['biology-25','chemistry-20','physics-12','math-p08']){const m=catalogue.modules.find(m=>m.id===unit);assert.equal(planetProfile(m.planetIndex).biome,pilotWorld(unit).surface);assert.equal(genomes[m.planetIndex].family,{simbiosi:'terrestrial',marea:'oceanic',esodo:'volcanic'}[pilotWorld(unit).surface])}
});
test('Terreni: altezze finite in [0, 1], mare vicino alla frazione richiesta, colori validi',()=>{
 for(const g of genomes){const {h,sea,n}=terrainHeights(g,32);assert.ok(h.every(v=>Number.isFinite(v)&&v>=0&&v<=1));
  if(g.terrain.seaLevel>0){const wet=h.filter(v=>v<=sea).length/(n*n);assert.ok(Math.abs(wet-g.terrain.seaLevel)<.06,`${g.index} ${wet} ${g.terrain.seaLevel}`)}
  for(const v of [0,.3,.6,.95])assert.ok(colorAt(g,v,sea,.2).every(c=>Number.isFinite(c)&&c>=0&&c<=1.0001))}
});
