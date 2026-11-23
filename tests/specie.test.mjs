import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {planetGenomes,planetSpecies,planetSurface,surfaceScatter} from '../src/worlds/surface.js';
import {speciesOf,FORMS,ROLES,RICHNESS} from '../src/worlds/species.js';
import {bodyPlan,bodyMesh,LEVELS} from '../src/worlds/bodyplan.js';
import {World,LIFE_NEAR,LIFE_FAR,LIFE_STEP,LIFE_SHARE,LIFE_NEAR_SHARE} from '../src/scene/world.js';
import {counter,BUDGET} from '../scripts/prestazioni.mjs';
import {cleanExplore} from '../src/store.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const genomes=planetGenomes(),species=planetSpecies(),all=species.flat();
const STYLE=[/—/,/\bnon solo\b|\bnon soltanto\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];

test('specie: le specie delle versioni precedenti restano uguali, le nuove arrivano fino a 24 per pianeta',()=>{
 const used=new Set(),legacy=genomes.map(g=>speciesOf(g,used));
 species.forEach((list,i)=>{const old=legacy[i];
  assert.deepEqual(list.slice(0,old.length).map(s=>[s.id,s.form,s.name,s.habitat,s.size,s.count,s.color.join()]),old.map(s=>[s.id,s.form,s.name,s.habitat,s.size,s.count,s.color.join()]),'pianeta '+i);
  // Planets without species stay without species: the diagnosis of the biosignatures depends on it.
  assert.equal(list.length===0,genomes[i].family==='barren');assert.ok(list.length<=24);
  assert.deepEqual(list.map(s=>s.id),list.map((_,k)=>'s'+k));
  const f=genomes[i].family;if(f==='terrestrial')assert.ok(list.length>=18);if(f==='oceanic')assert.ok(list.length>=16);if(f==='volcanic')assert.ok(list.length>=11);
 });
 assert.equal(RICHNESS.barren,0);
 const genera=all.map(s=>s.name.split(' ')[0]);assert.equal(new Set(genera).size,genera.length);
 // Every species has its own body plan.
 assert.ok(all.length>=1300);assert.equal(new Set(all.map(s=>JSON.stringify(s.plan))).size,all.length);
 for(const f of Object.keys(FORMS))assert.ok(all.some(s=>s.form===f),'forma mai usata: '+f);
 // The diary keeps up to 24 species per planet.
 assert.deepEqual(cleanExplore({'3':{s:['s0','s23','s123','s7']}})['3'].s,['s0','s23','s7']);
});

test('specie: catene alimentari e piramide dei numeri',()=>{
 species.forEach((list,i)=>{if(!list.length)return;
  const by=new Map(list.map(s=>[s.id,s])),n=role=>list.filter(s=>s.role===role).reduce((a,s)=>a+s.count,0);
  for(const s of list){
   assert.ok(s.role in ROLES);assert.equal(s.level,ROLES[s.role]);
   assert.equal(s.role==='produttore',s.kind==='plant');assert.equal(s.role==='decompositore',s.kind==='fungus');
   if(s.role==='erbivoro'){assert.ok(s.diet.length>=1&&s.diet.length<=3);assert.ok(s.diet.every(id=>by.get(id)?.role==='produttore'));}
   else if(s.role==='predatore'){assert.ok(s.diet.length>=1&&s.diet.length<=3);assert.ok(s.diet.every(id=>['erbivoro','filtratore'].includes(by.get(id)?.role)));}
   else assert.deepEqual(s.diet,[]);
   if(s.diet.length)assert.ok(s.diet.every(id=>s.traits[1].includes(by.get(id).name)));
   assert.ok(s.traits.length>=1&&s.traits.length<=5);
   for(const t of s.traits){assert.ok(typeof t==='string'&&t.length>20);for(const re of STYLE)assert.doesNotMatch(t,re,t);}
   if(s.form==='medusa')assert.ok(genomes[i].terrain.seaLevel>=.3);if(s.form==='volatore')assert.ok(genomes[i].atmosphere.density>=.45);
   if(['pascolatore','cacciatore','bipede'].includes(s.form)&&s.reach>78)assert.ok(genomes[i].atmosphere.density>=.35);
  }
  const hunters=list.filter(s=>s.role==='predatore').length,eaters=list.filter(s=>s.role==='erbivoro'||s.role==='filtratore').length;
  if(hunters){assert.ok(eaters>hunters,'pianeta '+i);assert.ok(n('predatore')<n('erbivoro')+n('filtratore'));}
  if(eaters)assert.ok(n('produttore')>n('erbivoro')+n('filtratore'),'pianeta '+i);
 });
 // On average a producer species counts many more individuals than a consumer, and a consumer more than a predator.
 const mean=r=>{const l=all.filter(s=>s.role===r);return l.reduce((a,s)=>a+s.count,0)/l.length;};
 assert.ok(mean('produttore')>5*mean('erbivoro')&&mean('erbivoro')>2*mean('predatore'));
});

test('specie: piani corporei e due livelli di dettaglio',()=>{
 const card={gravity:1,palette:{rock:[.5,.42,.36],pigment:[.2,.6,.3]}};
 for(const s of all.filter((_,k)=>k%7===0)){
  const a=bodyMesh(s.plan,0),b=bodyMesh(s.plan,1);
  for(const m of [a,b]){assert.equal(m.stride,12);assert.equal(m.v.length%12,0);assert.ok(m.v.every(Number.isFinite));const nv=m.v.length/12;assert.ok(m.i.every(x=>x<nv));
   // The colour of the species goes where the mesh is white; the other parts keep their own colours.
   let white=0;for(let j=8;j<m.v.length;j+=12)if(Math.min(m.v[j],m.v[j+1],m.v[j+2])>.97)white++;assert.ok(white>0,s.form);}
  assert.ok(b.i.length<a.i.length,s.form);assert.ok(a.i.length/3<=1600&&b.i.length/3<=400,s.form);
 }
 // Wings of the flyers lie along z, where the shader flaps them.
 for(const s of all.filter(s=>s.form==='volatore').slice(0,20)){const m=bodyMesh(s.plan,0);let z=0;for(let j=2;j<m.v.length;j+=12)z=Math.max(z,Math.abs(m.v[j]));assert.ok(z>.5);}
 // The same seed gives the same plan; the gravity of the card makes plants taller and slimmer.
 const rng=seed=>{let x=seed;return()=>(x=(x*16807)%2147483647)/2147483647;};
 assert.deepEqual(bodyPlan('albero',rng(5),card),bodyPlan('albero',rng(5),card));
 assert.ok(bodyPlan('albero',rng(5),{...card,gravity:.5}).height>bodyPlan('albero',rng(5),{...card,gravity:1.5}).height);
 assert.ok(bodyPlan('pascolatore',rng(9),{...card,gravity:1.5}).thick>bodyPlan('pascolatore',rng(9),{...card,gravity:.5}).thick);
 assert.equal(LEVELS.length,2);assert.throws(()=>bodyPlan('drago',rng(1),card));
 // Walking animals swing their legs in the vertex shader.
 assert.ok(read('src/scene/shaders.js').includes('if(uMotion.w>0.)vertex.x+=sin(w*9.'));
});

test('specie: individui in superficie, divisi per distanza, entro i limiti di un fotogramma',()=>{
 const biomes=JSON.parse(read('assets/scenes/manifest.json')).biomes;
 for(const q of ['high','low']){
  const R=counter(q),w=new World(R,{},biomes);let updates=0;const update=R.updateInstances;R.updateInstances=(k,d)=>{updates++;update(k,d);};
  for(const i of [0,7,36,99,44]){
   w.activatePlanet(i);
   for(const view of ['stazioni','esplorazione']){
    const s={scene:'surface',selected:i,time:10,yaw:0,pitch:.45,distance:22,paused:true,lastFrameMs:16};
    if(view==='esplorazione'){s.explore=true;s.exploreFocus=[-10,5];s.exploreBlend=1;w.cameraScene=null;}
    w.camera('surface',s);w.camera('surface',s);R.begin();w.draw('surface',s,{modules:[]});
    const f=R.frame,e=w.eye,near=LIFE_NEAR*LIFE_NEAR_SHARE[q];
    assert.ok(f.draws<=BUDGET.draws&&f.triangles<=(q==='high'?BUDGET.triangles:6e5),`${q} ${i} ${view}: ${f.draws} chiamate, ${Math.round(f.triangles)} triangoli`);
    w.population.forEach((p,k)=>{
     const want=[0,0];p.instances.forEach((o,j)=>{if(q==='low'&&(j*.6180339887)%1>=LIFE_SHARE.low)return;const d=Math.hypot(o.x-e[0],o.z-e[2]);if(d<=LIFE_FAR)want[d<near?0:1]++;});
     assert.deepEqual(p.life.drawn,want);
     for(const l of [0,1])if(want[l])assert.equal(R.instanceSets.get(`life-${k}-${l}`).n,want[l]);
    });
   }
   // The split is made again only after the camera has moved by LIFE_STEP.
   const before=updates;w.lifeSplit();assert.equal(updates,before);
   w.eye=[w.eye[0]+LIFE_STEP*1.01,w.eye[1],w.eye[2]];w.lifeSplit();assert.equal(updates,before+2*w.population.filter(p=>p.instances.length).length);
  }
 }
 // At the lighter setting about four individuals in ten are kept, spread over the clusters.
 const s=planetSurface(36),sc=surfaceScatter(s),n=sc.species.reduce((a,p)=>a+p.instances.length,0),kept=sc.species.reduce((a,p)=>a+p.instances.filter((_,j)=>(j*.6180339887)%1<LIFE_SHARE.low).length,0);
 assert.ok(n>2000);assert.ok(Math.abs(kept/n-LIFE_SHARE.low)<.03);
});
