import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { CATALOG, build, recipeDistance, systemCraft, SHIP_ORDER } from '../src/craft/catalog.js';
import { STATIONS } from '../src/craft/stations.js';
import { AREAS } from '../src/scene/layout.js';
// Stations and ships of the star systems: 300 generated models, ten per system, all different.
const root=new URL('../',import.meta.url),glyphs=JSON.parse(fs.readFileSync(new URL('assets/glyphs.json',root),'utf8')).styles.body.glyphs;
const BUDGET={stazione:30000,nave:10000};
const models=new Map(CATALOG.map(e=>[e.id,build(e)]));
test('catalogo: 300 modelli, dieci per sistema, sei stazioni e quattro navi',()=>{
 assert.equal(CATALOG.length,300);assert.equal(new Set(CATALOG.map(e=>e.id)).size,300);
 AREAS.forEach((_,s)=>{const list=systemCraft(s);assert.equal(list.length,10,'sistema '+s);assert.equal(list.filter(e=>e.kind==='stazione').length,6);assert.equal(list[0].type,'porto');assert.equal(list[1].type,'porta');});
 for(const t of Object.keys(STATIONS))assert.ok(CATALOG.some(e=>e.type===t),t);
 for(const t of SHIP_ORDER)assert.equal(CATALOG.filter(e=>e.type===t).length,10,t);
});
test('miniere solo nei sistemi con la fascia di asteroidi',()=>{for(const e of CATALOG.filter(e=>e.type==='miniera'))assert.equal(e.system%3,1,e.id);});
test('nomi unici, scritti con le lettere dell\'atlante dei caratteri',()=>{
 assert.equal(new Set(CATALOG.map(e=>e.name)).size,300);
 for(const e of CATALOG)for(const ch of e.name)assert.ok(ch in glyphs,`${e.id}: «${ch}» manca nell'atlante (${e.name})`);
});
test('stili: porti e stazioni tematiche nella disciplina del sistema, porte nello stile civile',()=>{
 const disc=['matematica','fisica','chimica','biologia'];
 for(const e of CATALOG){
  if(e.type==='porta')assert.equal(e.style,'civile',e.id);
  else if(e.kind==='stazione')assert.equal(e.style,disc[AREAS[e.system].sector],e.id);
  else assert.equal(e.style,e.slot<8?disc[AREAS[e.system].sector]:'civile',e.id);
 }
});
test('generazione deterministica',()=>{for(const e of CATALOG.filter((_,i)=>i%17===0)){const a=models.get(e.id),b=build(e);assert.deepEqual(b.recipe,a.recipe);assert.equal(b.triangles,a.triangles);assert.deepEqual(Array.from(b.parts[0].mesh.v.slice(0,64)),Array.from(a.parts[0].mesh.v.slice(0,64)),e.id);}});
test('mesh valide: valori finiti, indici nei limiti, budget di triangoli',()=>{
 for(const e of CATALOG){
  const m=models.get(e.id);
  assert.ok(m.triangles<=BUDGET[e.kind],`${e.id}: ${m.triangles} triangoli`);
  assert.ok(Number.isFinite(m.radius)&&m.radius>1,e.id);
  for(const p of [...m.parts.map(p=>p.mesh),...(m.field?[m.field]:[])]){
   assert.equal(p.stride,16);assert.equal(p.v.length%16,0);assert.equal(p.i.length%3,0);
   const n=p.v.length/16;for(const x of p.v)assert.ok(Number.isFinite(x),e.id+': valore non finito');
   for(const i of p.i)assert.ok(i<n,e.id+': indice fuori dai limiti');
  }
  for(const l of m.lights){assert.ok(l.p.every(Number.isFinite),e.id);assert.ok(l.part>=0&&l.part<m.parts.length,e.id);}
 }
});
test('nessuna struttura ripetuta: stessi tipo e stile differiscono in almeno due scelte',()=>{
 const list=CATALOG.map(e=>({...e,recipe:models.get(e.id).recipe}));
 for(let a=0;a<list.length;a++)for(let b=a+1;b<list.length;b++){
  const A=list[a],B=list[b];if(A.type!==B.type||A.style!==B.style)continue;
  assert.ok(recipeDistance(A.recipe,B.recipe)>=2,`${A.id} e ${B.id} troppo simili: ${A.recipe.join(', ')}`);
 }
});
