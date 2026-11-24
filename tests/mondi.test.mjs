import test from 'node:test';import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {buildIndex,indexText,worldCatalogueMarkdown} from '../scripts/catalogo-mondi.mjs';
import {BUDGET,VIEWS,world,measureSurface,buildCost} from '../scripts/prestazioni-mondi.mjs';
import {worldModels,worldMesh,worldLook,worldCard,worldCounts,indexRecord,BUILDING_NAMES} from '../src/worlds/catalogo.js';
import {planetSurface,planetGenomes,planetSpecies} from '../src/worlds/surface.js';
import {colonyParams,colonySpec,villageParams,villageSpec,ROLE_COLORS} from '../src/worlds/settlements.js';
import {ARCH_TYPES} from '../src/worlds/architecture.js';
import {VILLAGE_TYPES} from '../src/worlds/buildings.js';
import {CRAFT} from '../src/craft/registry.js';
import {CONCEPT_UNITS,GROUND_UNITS} from '../src/craft/succede.js';
import {resolveRoute} from '../src/routing.js';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const index=JSON.parse(await read('content/worlds/modelli.json')),list=worldModels(index),catalogue=JSON.parse(await read('content/catalogue.json')),modules=catalogue.modules;
const surfaces=new Map(),surface=i=>surfaces.get(i)||(surfaces.set(i,planetSurface(i)),surfaces.get(i));

test('mondi: l’indice dei modelli corrisponde alle superfici costruite dal codice',async()=>{
 const built=buildIndex(surface);assert.equal(indexText(built),await read('content/worlds/modelli.json'));
 assert.equal(index.planets.length,125);for(const [i,rec] of index.planets.entries()){assert.deepEqual(indexRecord(surface(i)),rec);assert.ok(rec.t.length>=6&&rec.t.every(t=>BUILDING_NAMES[t]));}
 assert.equal(index.planets.filter(p=>p.v).length,40);
});
test('mondi: CATALOGO_MONDI.md generato dall’indice',async()=>{
 assert.equal(worldCatalogueMarkdown(index,modules.map(m=>m.title)),await read('docs/CATALOGO_MONDI.md'));
});
test('mondi: 2868 modelli con identificatori unici e indirizzi del catalogo',async()=>{
 const c=worldCounts(list);assert.equal(c.total,2868);assert.deepEqual(c.kinds,{specie:1388,colonia:1201,villaggio:200,nativo:40,colono:36,rover:3});
 assert.equal(c.total+CRAFT.length,3865);assert.equal(new Set([...list,...CRAFT].map(e=>e.id)).size,3865);
 // Every model has an address of the catalogue, with the planet of the model as the unit of the page.
 for(const e of list){const r=resolveRoute(`#/craft?unit=${modules[e.planet].id}&model=${e.id}`,modules,[]);assert.equal(r.craftModel,e.id,e.id);assert.equal(r.selected,e.planet);}
 assert.equal(resolveRoute('#/craft?model=m7-x-1',modules,[]).craftModel,null);
 // Shared models: colonists in the gear of each typology, a rover per typology, on all its planets.
 const rovers=list.filter(e=>e.kind==='rover');assert.deepEqual(rovers.map(e=>e.planets.length).sort((a,b)=>a-b),[38,41,46]);
 assert.equal(list.filter(e=>e.kind==='colono').reduce((n,e)=>n+e.planets.length,0),375);
 // In the order of the catalogue: by system, then by planet.
 for(let k=1;k<list.length;k++)assert.ok(list[k-1].system<list[k].system||(list[k-1].system===list[k].system));
 const app=await read('src/app.js'),scene=await read('src/scene/world.js');
 for(const t of ["json('content/worlds/modelli.json')","'craft-family-'","'explore-model', '3D'","function entryModel(e)","U.button('craft-planet', 'SUL PIANETA'"])assert.ok(app.includes(t),t);
 assert.ok(scene.includes('drawWorldModel(s,e)')&&scene.includes('releaseWorldModel()'));
});
test('mondi: ogni modello si costruisce nei due livelli, con meno triangoli nel secondo',()=>{
 for(const e of list){const m0=worldMesh(e,0),m1=worldMesh(e,1),t0=m0.i.length/3,t1=m1.i.length/3;
  assert.ok(t1<t0&&t0<=6000&&t1>=50,`${e.id} ${t0} ${t1}`);assert.equal(m0.stride,m1.stride);
  for(let i=0;i<m0.i.length;i+=97)assert.ok(m0.i[i]<m0.v.length/m0.stride);}
});
test('mondi: schede in italiano con il pianeta e le misure in metri',()=>{
 const title=i=>modules[i].title;
 for(const kind of ['specie','colonia','villaggio','nativo','colono','rover']){const e=list.find(x=>x.kind===kind),c=worldCard(e,title);
  assert.ok(c.title&&c.kind&&c.style&&c.lines.length===3&&c.about.length>40,kind);
  for(const t of [c.title,...c.lines,c.about])assert.ok(!/—/.test(t)&&!/\bnon\b[^.;:\n]{0,80}\bma\b/.test(t),t);
  assert.ok(c.lines.some(l=>/\d,?\d* m\b/.test(l)),kind);}
 assert.ok(worldCard(list.find(e=>e.kind==='specie'),title).lines[1].startsWith('Pianeta di «'));
 assert.ok(worldCard(list.find(e=>e.kind==='colono'&&e.key==='adulto'),title).lines[2].startsWith('Altezza 1,75 m'));
});
test('mondi: nel visore gli stessi edifici, corpi e colori delle superfici',()=>{
 const cards=planetGenomes(),species=planetSpecies();
 for(const i of [1,7,42,84]){const s=surface(i),g=cards[i],colony=s.settlements.find(t=>t.kind==='colonia'),village=s.settlements.find(t=>t.kind==='villaggio'),P=colonyParams(g,species[i].length);
  for(const [t,spec] of Object.entries(colony.types))assert.deepEqual(colonySpec(g,P,t),spec,`${i} ${t}`);
  if(village)for(const [t,spec] of Object.entries(village.types))assert.deepEqual(villageSpec(g,villageParams(g),t),spec,`${i} ${t}`);
  for(const sp of species[i]){const e=list.find(x=>x.id===`m${i}-${sp.id}`),L=worldLook(e);assert.deepEqual(L.tint,sp.color.slice(0,3));assert.equal(L.form,sp.form);}
  if(village){const e=list.find(x=>x.id===`m${i}-n`);assert.deepEqual(e.body,village.body);assert.ok(worldLook(e).biped&&worldLook(e).legs>0);}}
 for(const e of list.filter(x=>x.kind==='colono'))assert.ok(ROLE_COLORS.some(c=>c===worldLook(e).tint));
 assert.equal(worldLook(list.find(e=>e.kind==='rover')).tint,null);
 assert.equal(Object.keys(BUILDING_NAMES).length,new Set([...Object.values(ARCH_TYPES).flatMap(Object.keys),...Object.keys(VILLAGE_TYPES)]).size);
});
test('mondi: documenti della serie, mappa dei concetti e prestazioni entro i limiti',async()=>{
 const md=await read('docs/MONDI_VIVI.md'),units=new Map(modules.map(m=>[m.id,m.title]));
 assert.ok(md.startsWith('# La serie «Mondi vivi»'));
 for(const v of ['1.62.0','1.63.0','1.64.0','1.65.0','1.66.0','1.67.0','1.68.0','1.69.0'])assert.ok(md.includes(`| ${v} |`),v);
 // Every unit of the map of concepts exists, with its title, and is quoted by the panel on the ground.
 const rows=[...md.matchAll(/\| ([a-z]+-[a-z]?\d{2}), «([^»]+)» \|/g)];assert.equal(rows.length,6);
 for(const [,id,name] of rows){assert.equal(units.get(id),name,id);assert.ok(CONCEPT_UNITS[id]===name||GROUND_UNITS[id]===name,id);}
 // The test files of the series exist, and their tests are as many as the page says.
 const files=[...md.matchAll(/`(tests\/[a-z-]+\.test\.mjs)`/g)].map(m=>m[1]),unique=[...new Set(files)];assert.equal(unique.length,8);
 let n=0;for(const f of unique)n+=((await read(f)).match(/^test\(/gm)||[]).length;assert.ok(md.includes(`I test della serie sono ${n}, in otto file`),String(n));
 for(const f of ['docs/CATALOGO_MONDI.md','docs/PRESTAZIONI_MONDI.md','content/worlds/modelli.json'])assert.ok(md.includes('`'+f+'`'),f);
 const p=await read('docs/PRESTAZIONI_MONDI.md'),num=t=>Number(t.replace(/\./g,'').replace(',','.'));
 assert.ok(p.startsWith('# Prestazioni misurate della serie «Mondi vivi»')&&p.includes('`node scripts/prestazioni-mondi.mjs`')&&p.includes('Le superfici di 125 pianeti'));
 const frame=[...p.matchAll(/^\| (camera delle stazioni|esploratore in corsa) \| [^|]+ \| [\d,]+ ms \| [\d,]+ ms \| [\d,]+ ms \| (\d+) \/ (\d+) \| ([\d,]+) milioni \| ([\d.]+) \|$/gm)];
 assert.equal(frame.length,6);for(const r of frame){assert.ok(num(r[3])<=BUDGET.draws);assert.ok(num(r[4])*1e6<=BUDGET.triangles);assert.ok(num(r[5])<=BUDGET.instances);}
 const build=[...p.matchAll(/^\| (Superficie dalla carta|Maglie dei modelli) \| (\d+) ms \| (\d+) ms \| (\d+) ms \|$/gm)];assert.equal(build.length,2);assert.ok(build.every(r=>num(r[4])<=BUDGET.buildMs));
 const mem=/^\| Memoria delle maglie e delle istanze \| [\d,]+ MiB \| [\d,]+ MiB \| ([\d,]+) MiB \|$/m.exec(p);assert.ok(mem&&num(mem[1])<=BUDGET.meshMiB);
 assert.equal([...p.matchAll(/^\| \d+ \| [\d,]+ ms · \d+ \| [\d,]+ ms · \d+ \|/gm)].length,125);
});
test('mondi: una superficie misurata dal vivo resta entro i limiti',()=>{
 const ctx=world('high'),b=buildCost(ctx,84);assert.ok(b.bytes/2**20<=BUDGET.meshMiB);
 for(const v of Object.keys(VIEWS)){const r=measureSurface(ctx,84,'high',v,{frames:8});assert.ok(r.draws.max<=BUDGET.draws&&r.triangles.max<=BUDGET.triangles&&r.instances.max<=BUDGET.instances,`${v} ${r.draws.max} ${r.triangles.max}`);if(v==='esploratore')assert.ok(r.walked>0);}
});
