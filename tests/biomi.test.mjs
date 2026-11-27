import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetCards, STYLES } from '../src/worlds/genome.js';
import { surfaceField, localWeight, CORE } from '../src/worlds/field.js';
import { styleField, colorAt } from '../src/worlds/terrain.js';
import { sphereTerrain } from '../src/worlds/orbit-texture.js';
import { LANDING_SITES } from '../src/worlds/landing-sites.js';
import { BIOMES, BIOME, STYLE_BIOME, planetBiomes, biomesOf, allows, conditionOf, biomeWeight, chunkRocks, SPACING, BLEND, INNER, OUTER, MIN_CELLS, CHUNK, CHUNK_MOST } from '../src/worlds/biomes.js';
import { planetSurface } from '../src/worlds/surface.js';
import { EDGE } from '../src/worlds/explorer.js';
import { cleanExplore } from '../src/store.js';
import { biomesMarkdown } from '../scripts/biomi.mjs';
// Biomes of the zones of the landing sites (1.71.0): five to eight kinds of ground per planet, from its family
// and its physics, on a Voronoi map of cells about 510 m apart, with their shapes, colours and rocks.
const G=planetCards(),read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const inZone=c=>Math.abs(c.x)<=EDGE&&Math.abs(c.z)<=EDGE;

test('biomi: da cinque a otto per pianeta, della sua famiglia e permessi dalla sua fisica, in insiemi tutti diversi',()=>{
 assert.equal(BIOMES.length,46);assert.equal(new Set(BIOMES.map(b=>b.id)).size,46);
 // Every terrain style has its biome, in the family of the style.
 for(const [family,styles] of Object.entries(STYLES))for(const s of styles){const b=BIOME[STYLE_BIOME[s]];assert.ok(b&&b.families.includes(family),s);}
 const lists=planetBiomes();assert.equal(lists.length,125);
 assert.equal(new Set(lists.map(l=>[...l].sort().join())).size,125,'due pianeti con gli stessi biomi');
 const sizes=[0,0,0,0,0,0,0,0,0];lists.forEach(l=>sizes[l.length]++);assert.ok(sizes[5]&&sizes[6]&&sizes[7]&&sizes[8]);assert.equal(sizes[5]+sizes[6]+sizes[7]+sizes[8],125);
 for(const [i,g] of G.entries()){const l=biomesOf(g);
  assert.equal(l[0],STYLE_BIOME[g.terrain.style]);assert.equal(new Set(l).size,l.length);
  for(const id of l.slice(1)){const b=BIOME[id];assert.ok(b.families.includes(g.family)&&!b.base&&allows(g,b),i+' '+id);}}
 // The physics: forests only under a dense air, marshes and lagoons only with wide seas, craters of the
 // deserts only under a thin air.
 for(const [i,g] of G.entries())for(const id of biomesOf(g).slice(1)){const d=g.atmosphere.density;
  if(['foresta','foresta-cenere','steppa','tundra'].includes(id))assert.ok(d>=.3,i+' '+id);
  if(['palude','laguna','salmastra'].includes(id))assert.ok(g.terrain.seaLevel>=.25,i+' '+id);
  if(id==='crateri')assert.ok(d<.2,i+' '+id);}
 assert.equal(conditionOf(BIOME.foresta),'aria con densità almeno 0,35');assert.equal(conditionOf(BIOME.banchisa),'solo come terreno proprio del pianeta');
 // Names and descriptions in the style of the site.
 for(const b of BIOMES){assert.ok(b.name&&b.about.length>40&&b.about.length<200,b.id);for(const r of STYLE)assert.ok(!r.test(b.about),b.id+' '+r);}
});
test('biomi: carta della zona con ogni bioma in almeno tre celle e in non più di tre decimi, base nello stile del pianeta',()=>{
 for(const [i,g] of G.entries()){
  const F=surfaceField(g,LANDING_SITES[i]),B=F.biomes(),zone=B.zone.filter(inZone),n=t=>zone.filter(c=>c.t===t).length;
  assert.deepEqual(B.ids,biomesOf(g));assert.ok(zone.length>=56&&zone.length<=64,i+' '+zone.length);
  for(let t=0;t<B.ids.length;t++){assert.ok(n(t)>=MIN_CELLS,i+' '+B.ids[t]+' '+n(t));assert.ok(n(t)<=Math.ceil(.3*zone.length),i+' '+B.ids[t]+' '+n(t));}
  // The cells near the base are the planet's own style, and so is the biome under the explorer there.
  for(const c of B.zone)if(Math.hypot(c.x,c.z)<330)assert.equal(c.t,0);
  assert.equal(F.biomeAt(14,28).id,B.ids[0]);assert.equal(F.biomeAt(0,0).id,B.ids[0]);
  // The weights of the biomes add up to 1 and change smoothly.
  for(const [x,z] of [[500,300],[-900,700],[1200,-1100],[3000,-2800]]){const w=B.weights(x,z);assert.ok(Math.abs(w.reduce((a,v)=>a+v,0)-1)<1e-9);}
 }
 assert.equal(SPACING,320);assert.equal(BLEND,110);assert.ok(INNER>=Math.hypot(CORE/2,CORE/2)&&OUTER>INNER);
 assert.equal(biomeWeight(INNER),0);assert.equal(biomeWeight(OUTER),1);
});
test('biomi: il quadrato delle stazioni, i mari e le coste restano quelli di prima; il terreno è continuo',()=>{
 for(const i of [0,1,5,7,18,36,40,69,91,99,110,111,119]){
  const g=G[i],F=surfaceField(g,LANDING_SITES[i]),T=sphereTerrain(g),style=styleField(g),{offset}=F.site;
  const old=(x,z)=>T.height(F.dir(x,z))+(style(x/CORE+.5+offset[0],z/CORE+.5+offset[1])-.5)*F.L*localWeight(x,z);
  // Inside 160 units the field is the earlier one, exactly; beyond, the sea and the coasts too.
  for(let z=-112;z<=112;z+=16)for(let x=-112;x<=112;x+=16)assert.equal(F.E(x,z),old(x,z));
  let land=0,changed=0;
  for(let k=0;k<2000;k++){const a=k*2.399,r=170+(k%97)*12,x=Math.cos(a)*r,z=Math.sin(a)*r,e0=old(x,z),e=F.E(x,z);
   if(e0<=F.sea)assert.equal(e,e0);else{land++;assert.ok(e>F.sea,'terra sommersa in '+x+','+z);if(Math.abs(e-e0)*F.S>.5)changed++;}}
  assert.ok(changed>land*.25,'biomi poco visibili sul pianeta '+i+': '+changed+' su '+land);
  // No step added to the ground: along lines crossing cells, coasts and tiles of features, in steps of 0.02
  // units, no change of height stands alone, much larger than the changes on both sides (a cliff is steep over
  // several steps, a step in the ground over one), where the earlier field has none.
  const step=d=>q=>d[q]>=.4&&d[q]>=6*Math.max(d[q-1],d[q+1]);
  for(let k=0;k<6;k++){const a=k*1.1+.2,x0=Math.cos(a)*(170+k*150),z0=Math.sin(a)*(170+k*150),d=[],d0=[];let y=F.E(x0,z0),y0=old(x0,z0);
   for(let q=1;q<=15000;q++){const x=x0+Math.cos(a+.7)*q*.02,z=z0+Math.sin(a+.7)*q*.02,e=F.E(x,z),e0=old(x,z);d.push(Math.abs(e-y)*F.S);d0.push(Math.abs(e0-y0)*F.S);y=e;y0=e0;}
   const added=step(d),before=step(d0);for(let q=1;q<d.length-1;q++)assert.ok(!added(q)||before(q),'gradino di '+d[q].toFixed(2)+' sul pianeta '+i+' alla linea '+k);}
 }
});
test('biomi: colori, rocce e diario',()=>{
 const s=planetSurface(5),F=s.field,g=s.genome;
 // Near the base the colour is the earlier one; beyond, every colour is in range, with a roughness.
 for(const [x,z] of [[0,0],[100,-100]])assert.deepEqual(F.colour(x,z,.6,.2),colorAt(g,.6,F.sea,.2,0,0));
 for(let k=0;k<400;k++){const x=-1250+(k*53.3)%2500,z=-1250+(k*71.9)%2500,e=F.E(x,z),c=F.colour(x,z,e,.3,F.lava(x,z));assert.equal(c.length,Math.hypot(x,z)>INNER?4:3);assert.ok(c.every(v=>v>=0&&v<=1),x+','+z);}
 // The salt flat is white and the canyon red where they are alone.
 const B=F.biomes(),pure=id=>B.zone.find(c=>inZone(c)&&B.ids[c.t]===id&&B.weights(c.x,c.z)[c.t]>.99);
 const salt=pure('salina');if(salt){const e=F.E(salt.x,salt.z);if(e>F.sea+.03){const c=F.colour(salt.x,salt.z,e,.05);assert.ok(Math.min(c[0],c[1],c[2])>.75,'salina '+c);}}
 // Rocks: the same for the same chunk, none in the square of the stations or under the sea, at most 64 a chunk.
 assert.deepEqual(chunkRocks(s,7,-3),chunkRocks(s,7,-3));
 let rocks=0;for(let j=-8;j<8;j++)for(let i=-8;i<8;i++){const c=chunkRocks(s,i,j),n=c[0].length+c[1].length+c[2].length;assert.ok(n%8===0&&n/8<=CHUNK_MOST);rocks+=n/8;
  for(const l of c)for(let q=0;q<l.length;q+=8){assert.ok(Math.max(Math.abs(l[q]),Math.abs(l[q+2]))>120);assert.ok(Math.floor(l[q]/CHUNK)===i&&Math.floor(l[q+2]/CHUNK)===j);assert.ok(l[q+3]>0&&l[q+3]<6);}}
 assert.ok(rocks>200,'rocce: '+rocks);
 // The diary keeps the biomes crossed, up to eight known ones.
 const d=cleanExplore({5:{s:[],l:[],b:['salina','canyon','canyon','vulcano','__proto__',3,'reg','erg','mesa','hamada','crateri','massi','prateria']}});
 assert.deepEqual(d[5].b,['salina','canyon','reg','erg','mesa','hamada','crateri','massi']);
 assert.deepEqual(cleanExplore({7:{s:[],l:[],b:['foresta']}}),{7:{s:[],l:[],b:['foresta']}});
 assert.deepEqual(cleanExplore({7:{s:[],l:[],b:['x']}}),{});
});
test('biomi: docs/BIOMI.md generato dal codice e scritto nello stile del sito',()=>{
 const text=read('docs/BIOMI.md');assert.equal(biomesMarkdown(),text,'docs/BIOMI.md da rigenerare con node scripts/biomi.mjs');
 for(const r of STYLE)assert.ok(!r.test(text),String(r));
 for(const b of BIOMES)assert.ok(text.includes('| '+b.name+' |'),b.id);
 const app=read('src/app.js');assert.ok(app.includes('Nuovo bioma: ')&&app.includes('Biomi attraversati: '));
});
