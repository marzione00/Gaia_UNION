import test from 'node:test';import assert from 'node:assert/strict';
import { planetGenomes, planetSpecies, planetEndemics, planetSurface, surfaceScatter } from '../src/worlds/surface.js';
import { allSpecies, allEndemics, FORMS, FLIGHT_DENSITY, FLOAT_SEA } from '../src/worlds/species.js';
import { BIOME, LIFE, BASE_LIFE, BIOMES, biomesOf, CHUNK } from '../src/worlds/biomes.js';
import { assemblages, chunkLife, wander, PLANTS_MOST, ENDEMIC_WEIGHT } from '../src/worlds/zone-life.js';
import { EDGE } from '../src/worlds/explorer.js';
import { cleanExplore } from '../src/store.js';
const { world, measureSurface, buildCost } = await import('../scripts/prestazioni-mondi.mjs');
// Flora and fauna of the biomes over the whole zone (1.72.0): endemic species, assemblages of the biomes,
// individuals in chunks of 64 units around the camera, animals that wander.
const G=planetGenomes(),species=planetSpecies(),endemics=planetEndemics();
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const population=s=>[...surfaceScatter(s).species,...s.endemics.map(sp=>({species:sp,instances:[]}))];

test('vita dei biomi: una specie endemica per bioma con vita, permessa dalla fisica del pianeta',()=>{
 // The species of the earlier versions do not change.
 assert.equal(species.flat().length,1388);assert.deepEqual(JSON.parse(JSON.stringify(allSpecies(G))),JSON.parse(JSON.stringify(species)));
 assert.deepEqual(JSON.parse(JSON.stringify(allEndemics(G,species))),JSON.parse(JSON.stringify(endemics)));
 assert.equal(endemics.flat().length,562);
 // Every biome of a family with life, other than those only of a planet's own style, has its life.
 for(const b of BIOMES)if(!b.base&&b.families.some(f=>f!=='barren'))assert.ok(LIFE[b.id],b.id);
 for(const [id,L] of Object.entries(LIFE)){assert.ok(BIOME[id]);assert.ok(L.forms.every(f=>FORMS[f]));assert.ok(L.flora>=0&&L.fauna>=0&&L.habitats.length);
  assert.ok(L.trait.startsWith('Vive soltanto ')&&L.trait.length<200);for(const r of STYLE)assert.ok(!r.test(L.trait),id+' '+r);}
 assert.equal(Object.keys(BASE_LIFE).length,6);
 const genera=[...species.flat(),...endemics.flat()].map(sp=>sp.name.split(' ')[0]);assert.equal(new Set(genera).size,genera.length);
 G.forEach((g,i)=>{const list=species[i],ends=endemics[i],all=[...list,...ends];
  if(!list.length){assert.equal(ends.length,0);return;}
  assert.ok(all.length<=32,'troppe specie per il diario: '+i);
  assert.deepEqual(ends.map(sp=>sp.id),ends.map((_,j)=>'s'+(list.length+j)));
  const own=biomesOf(g);assert.ok(ends.every(sp=>own.slice(1).includes(sp.biome)));assert.equal(new Set(ends.map(sp=>sp.biome)).size,ends.length);
  for(const sp of ends){const d=g.atmosphere.density;
   assert.ok(LIFE[sp.biome].forms.includes(sp.form),sp.name);assert.equal(sp.kind,FORMS[sp.form].kind);
   if(sp.kind==='animal')assert.ok(d>=.2,sp.name);if(['pascolatore','cacciatore','bipede'].includes(sp.form))assert.ok(d>=.35,sp.name);
   if(sp.form==='volatore')assert.ok(d>=FLIGHT_DENSITY);if(sp.form==='medusa')assert.ok(g.terrain.seaLevel>=FLOAT_SEA);
   assert.ok(sp.name.endsWith(' '+LIFE[sp.biome].epithet));assert.equal(sp.habitatName,BIOME[sp.biome].name.toLowerCase()+', endemica');
   assert.ok(sp.traits.length>=2&&sp.traits.length<=5&&sp.traits.includes(LIFE[sp.biome].trait));assert.ok(sp.traits.every(t=>t.length>20&&!t.includes('—')));
   assert.ok(sp.color.every(c=>c>=0&&c<=1)&&sp.size>0&&sp.plan);
   // Diets join species of the same planet: herbivores eat plants, predators consumers.
   for(const id of sp.diet||[]){const f=all.find(x=>x.id===id);assert.ok(f,id);if(sp.role==='erbivoro')assert.equal(f.kind,'plant');if(sp.role==='predatore')assert.ok(['erbivoro','filtratore'].includes(f.role));}
   if(sp.role==='erbivoro'||sp.role==='predatore')assert.ok(sp.diet.length>=1);}
 });
 // The diary keeps the endemic species, numbered after those of the planet.
 assert.deepEqual(cleanExplore({7:{s:['s0','s28'],l:[]}}),{7:{s:['s0','s28'],l:[]}});
});
test('vita dei biomi: individui della zona nei gruppi di 64 unità, nel proprio bioma e sul proprio terreno',()=>{
 for(const i of [0,1,5,7,69,99,110]){
  const s=planetSurface(i),pop=population(s),A=assemblages(s,pop),B=s.field.biomes(),sea=s.seaY;
  assert.equal(A.length,B.ids.length);
  // Each endemic species lives in the assemblage of its biome only, with more weight than the others.
  pop.forEach((p,k)=>{if(!p.species.biome)return;const t=B.ids.indexOf(p.species.biome);A.forEach((a,u)=>{const has=[...a.plants,...a.animals].find(([q])=>q===k);if(u===t)assert.equal(has[1],ENDEMIC_WEIGHT);else assert.ok(!has);});});
  assert.deepEqual(chunkLife(s,pop,A,5,-9),chunkLife(s,pop,A,5,-9));
  const seen=new Set(),byBiome={};let plants=0,animals=0;
  for(let cj=-20;cj<20;cj++)for(let ci=-20;ci<20;ci++){const l=chunkLife(s,pop,A,ci,cj);
   assert.ok(l.filter(o=>!o.home).length<=PLANTS_MOST);
   for(const o of l){const sp=pop[o.k].species,ground=s.heightAt(o.x,o.z);
    assert.ok(Math.max(Math.abs(o.x),Math.abs(o.z))>120);
    if(sp.form==='medusa')assert.ok(ground<sea&&Math.abs(o.y-sea-.05)<1e-6);
    else if(sp.form==='volatore')assert.ok(o.y>=ground+8.9);
    else{assert.ok(sea===null||ground>sea+.3,sp.name);assert.ok(Math.abs(o.y-ground+.05)<1e-6);}
    if(sp.biome){seen.add(o.k);const w=B.weights(o.x,o.z);assert.ok(w[B.ids.indexOf(sp.biome)]>0,sp.name);}
    if(o.home){animals++;assert.ok(o.radius>=2&&o.pace>0);}else{plants++;const id=s.field.biomeAt(o.x,o.z).id;byBiome[id]=(byBiome[id]||0)+1;}}}
  if(!pop.length){assert.equal(plants+animals,0);continue;}
  // Every endemic species of the planet lives somewhere in the zone, and there are plants and animals.
  assert.equal(seen.size,s.endemics.length,'endemiche mancanti sul pianeta '+i);assert.ok(plants>500,i+' '+plants);
  if(pop.some(p=>p.species.kind==='animal'&&p.species.habitat!=='mare'))assert.ok(animals>20,i+' '+animals);
  // Densities follow the biomes: plants per cell of the biome differ by more than three times among them.
  const per=Object.entries(byBiome).map(([id,n])=>n/B.zone.filter(c=>B.ids[c.t]===id).length);assert.ok(Math.max(...per)>3*Math.min(...per),i+' '+per);
 }
 // No life on the barren planets.
 const b=G.findIndex(g=>g.family==='barren'),s=planetSurface(b);assert.equal(s.endemics.length,0);assert.equal(chunkLife(s,population(s),assemblages(s,population(s)),9,9).length,0);
});
test('vita dei biomi: gli animali della zona vagano attorno al loro posto, con pause',()=>{
 const s=planetSurface(99),pop=population(s),A=assemblages(s,pop),walkers=[];
 for(let cj=-12;cj<12;cj++)for(let ci=-12;ci<12;ci++)for(const o of chunkLife(s,pop,A,ci,cj))if(o.home)walkers.push(o);
 assert.ok(walkers.length>20);const gaits=new Set();
 for(const t of [0,7.5,15,22.5,30,45,60,90]){wander(s,walkers,t);
  for(const o of walkers){assert.ok(Math.hypot(o.x-o.home[0],o.z-o.home[1])<=o.radius+1e-9);gaits.add(o.gait);
   if(!o.fly&&!o.float){assert.ok(s.heightAt(o.x,o.z)>s.seaY);assert.ok(Math.abs(o.y-(s.heightAt(o.x,o.z)-.05))<1e-6);}}}
 assert.ok(gaits.has(0)&&gaits.has(1),'gli animali camminano e si fermano');
});
test('vita dei biomi: il mondo unisce gli individui della zona a quelli della base e trova le endemiche',()=>{
 const ctx=world('high'),i=99;buildCost(ctx,i);
 const r=measureSurface(ctx,i,'high','lontano',{frames:10}),w=ctx.w,s=w.surface;
 assert.equal(w.population.length,s.species.length+s.endemics.length);
 const zone=w.population.reduce((n,p)=>n+(p.zone?.length||0),0);assert.ok(zone>200,'individui della zona: '+zone);
 for(const p of w.population){assert.equal(p.life.n,p.instances.length+(p.zone?.length||0));assert.ok(p.zone.every(o=>p.life.items.includes(o)));}
 assert.ok(r.draws.max<=120&&r.instances.max<=6000);
 // The scanner finds an individual of the zone; an endemic species is sought in the nearest cell of its biome.
 const p=w.population.find(q=>q.zone?.length),k=w.population.indexOf(p),o=p.zone[0];
 assert.deepEqual(w.nearest([o.x,o.y,o.z],3),{type:'species',index:k});
 const B=s.field.biomes();
 for(const [j,q] of w.population.entries()){if(!q.species.biome)continue;const at=w.spotOf(j,[0,0]);assert.ok(at,q.species.name);
  if(!q.zone.length){assert.ok(B.weights(at[0],at[2])[B.ids.indexOf(q.species.biome)]>.5&&Math.abs(at[0])<=EDGE+120&&Math.abs(at[2])<=EDGE+120);assert.ok(at[1]>s.seaY);}}
});
