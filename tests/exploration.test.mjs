import test from 'node:test';import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {planetGenomes,planetSpecies,planetSurface,surfaceScatter} from '../src/worlds/surface.js';
import {speciesOf,allSpecies,FORMS,FLIGHT_DENSITY,FLOAT_SEA} from '../src/worlds/species.js';
import {placeList,STYLE_PLACES} from '../src/worlds/places.js';
import {STYLES} from '../src/worlds/genome.js';
import {cleanExplore,cleanState,fresh} from '../src/store.js';
import {World} from '../src/scene/world.js';import {project} from '../src/renderer.js';
const root=new URL('../',import.meta.url),biomes=JSON.parse(await readFile(new URL('assets/scenes/manifest.json',root))).biomes;
const genomes=planetGenomes(),species=planetSpecies();

test('Specie: generate dalla carta, nomi unici, forme coerenti con atmosfera e mare',()=>{
 assert.equal(species.length,110);
 assert.deepEqual(JSON.parse(JSON.stringify(allSpecies(genomes))),JSON.parse(JSON.stringify(species)));
 const genera=species.flat().map(s=>s.name.split(' ')[0]);assert.equal(new Set(genera).size,genera.length);
 species.forEach((list,i)=>{const g=genomes[i];
  if(g.family==='barren')assert.equal(list.length,0);
  if(['terrestrial','oceanic','volcanic'].includes(g.family))assert.ok(list.length>=3);
  assert.equal(new Set(list.map(s=>s.id)).size,list.length);
  for(const s of list){assert.ok(FORMS[s.form]);assert.equal(s.kind,FORMS[s.form].kind);
   if(s.form==='volatore')assert.ok(g.atmosphere.density>=FLIGHT_DENSITY);
   if(s.form==='medusa')assert.ok(g.terrain.seaLevel>=FLOAT_SEA);
   assert.ok(s.traits.length>=1&&s.traits.every(t=>typeof t==='string'&&t.length>20&&!t.includes('—')));
   assert.ok(s.color.every(c=>c>=0&&c<=1));assert.ok(s.size>0&&s.count>0);}
 });
 // Taller plants under lower gravity, for the same form.
 const trees=species.flat().filter(s=>s.form==='albero').map(s=>s.size),grav=species.flatMap((l,i)=>l.filter(s=>s.form==='albero').map(()=>genomes[i].gravity));
 const low=trees.filter((_,k)=>grav[k]<.9),high=trees.filter((_,k)=>grav[k]>1.1);assert.ok(Math.min(...low)>Math.max(...high));
});
test('Luoghi: punto più alto e forma del paesaggio per ogni pianeta, eventi dalla carta',()=>{
 assert.equal(Object.keys(STYLE_PLACES).length,Object.values(STYLES).flat().length);
 for(const g of genomes){const list=placeList(g);
  assert.equal(list[0].kind,'vetta');assert.equal(list[1].kind,'forma');assert.ok(list.length>=2&&list.length<=5);
  for(const p of list.filter(p=>p.kind==='evento'))assert.ok(g.events.includes(p.event));
  assert.ok(list.every(p=>p.text.length>40&&!p.text.includes('—')));assert.equal(new Set(list.map(p=>p.id)).size,list.length);}
 assert.ok(genomes.every(g=>!g.events.includes('pioggia di meteoriti')||g.atmosphere.density<.1));
});
test('Superfici: luoghi distanti fra loro e dalle stazioni, individui nel proprio habitat',()=>{
 for(const index of [0,7,20,36,44,69,80,99]){
  const s=planetSurface(index),sc=surfaceScatter(s);
  s.places.forEach((p,k)=>{assert.ok(p.position.every(Number.isFinite));assert.ok(Math.abs(p.position[0])<=72&&Math.abs(p.position[2])<=72);
   for(const st of s.stations)assert.ok(Math.hypot(st.position[0]-p.position[0],st.position[2]-p.position[2])>=12);
   s.places.slice(k+1).forEach(q=>assert.ok(Math.hypot(q.position[0]-p.position[0],q.position[2]-p.position[2])>=18));});
  const vetta=s.places.find(p=>p.kind==='vetta'),forma=s.places.find(p=>p.kind==='forma');
  if(forma.at!=='max')assert.ok(s.places.every(p=>p.kind==='evento'||p.position[1]<=vetta.position[1]+1e-6));
  assert.equal(sc.species.length,s.species.length);
  for(const p of sc.species){assert.ok(p.instances.length>0,p.species.name);
   for(const o of p.instances){
    for(const st of s.stations)assert.ok(Math.hypot(st.position[0]-o.x,st.position[2]-o.z)>=7);
    const ground=s.heightAt(o.x,o.z);
    if(p.species.form==='medusa')assert.ok(ground<s.seaY&&Math.abs(o.y-s.seaY-.05)<1e-6);
    else if(p.species.form==='volatore')assert.ok(o.y>=ground+9);
    else assert.ok(s.seaY===null||ground>s.seaY);}}
 }
});
test('Diario di esplorazione: record puliti e conservati nel salvataggio',()=>{
 const raw={'7':{s:['s0','s3','s3','x'],l:['l1'],at:'2026-11-16T10:00:00Z'},'abc':{s:['s1']},'101':{s:['s1']},'5':{s:[],l:[]},'9':'nope'};
 assert.deepEqual(cleanExplore(raw),{'7':{s:['s0','s3'],l:['l1'],at:'2026-11-16T10:00:00Z'}});
 assert.deepEqual(fresh().explore,{});
 const kept=cleanState({...fresh(),explore:raw});assert.deepEqual(kept.explore,cleanExplore(raw));
 assert.deepEqual(cleanState({...fresh(),explore:undefined}).explore,{});
});
test('Esplorazione: camera sul punto scelto, clic sul terreno, specie vicina',()=>{
 const w=new World({w:1600,h:1000,makeStars(){},makeMesh(){}},{},biomes),s={scene:'surface',selected:7,yaw:0,pitch:.45,distance:60,paused:true,lastFrameMs:16};
 w.activatePlanet(7);w.camera('surface',s);const station=[...w.target];
 s.explore=true;s.exploreFocus=[-30,10];s.exploreBlend=1;w.cameraScene=null;w.camera('surface',s);w.camera('surface',s);
 assert.ok(Math.abs(w.target[0]+30)<1e-6&&Math.abs(w.target[2]-10)<1e-6);assert.ok(Math.hypot(...w.eye.map((v,i)=>v-w.target[i]))<50);assert.ok(Math.hypot(station[0]+30,station[2]-10)>20);
 assert.ok(w.eye[1]>w.surface.heightAt(w.eye[0],w.eye[2])+4.9);
 w.projections=[];const hit=w.pick(800,500,s);assert.equal(hit?.type,'ground');assert.ok(Math.hypot(hit.point[0]+30,hit.point[2]-10)<6);
 const p=w.population[0],o=p.instances[0];assert.deepEqual(w.nearest([o.x,0,o.z]),{type:'species',index:0});
 const place=w.surface.places[0];assert.deepEqual(w.nearest(place.position),{type:'place',index:0});
 w.projections=w.surface.places.map((q,k)=>{const xy=project([q.position[0],q.position[1]+6.6,q.position[2]],w.vp,1600,1000);return {type:'place',index:k,x:xy[0],y:xy[1],depth:xy[2],r:26};}).filter(q=>q.depth>0);
 for(const q of w.projections)assert.equal(w.pick(q.x,q.y,s)?.type,'place');
});
