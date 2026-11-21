import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { CATALOG, EXTRAS, SHIP_EXTRAS, DEFENCE, DEFENCE_FLEET } from '../src/craft/catalog.js';
import { CRAFT, CRAFT_BY_ID, GROUPS, craftList, craftStep, craftCard, craftText, craftCounts, groupOf } from '../src/craft/registry.js';
import { RECIPES } from '../src/craft/economy.js';
import { POWER } from '../src/craft/threats.js';
import { CraftFactory } from '../src/craft/factory.js';
import { resolveRoute } from '../src/routing.js';
import { World } from '../src/scene/world.js';
import { perspective, lookAt, mul } from '../src/renderer.js';
import { catalogueMarkdown } from '../scripts/craft-catalogue.mjs';
// The 3D catalogue of stations and ships (1.51.0): every model in one order, the filters, the cards, the
// route, the model drawn by the viewer and the generated documentation.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max=120)=>{assert.ok(t.length>0&&t.length<=max,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);};
const modules=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url),'utf8')).modules;

test('catalogo: 997 modelli unici in un solo ordine, per sistema, con le stazioni prima delle navi e la difesa in fondo',()=>{
 const all=[...CATALOG,...EXTRAS,...SHIP_EXTRAS,...DEFENCE,...DEFENCE_FLEET];
 assert.equal(CRAFT.length,997);assert.equal(CRAFT.length,all.length);assert.equal(new Set(CRAFT.map(e=>e.id)).size,997);assert.equal(new Set(CRAFT.map(e=>e.name)).size,997);
 for(const e of all)assert.equal(CRAFT_BY_ID.get(e.id),e);
 const c=craftCounts();assert.deepEqual(c.groups,{stazioni:480,navi:299,difesa:218});assert.deepEqual(c.kinds,{stazione:564,nave:433});assert.equal(c.systems.reduce((a,b)=>a+b,0),997);
 assert.deepEqual(c.sources.map(s=>s[2]),[300,300,179,84,134]);
 const rank=e=>(e.kind==='nave'?2:0)+(e.defence?1:0);
 for(let i=1;i<CRAFT.length;i++){const a=CRAFT[i-1],b=CRAFT[i];assert.ok(a.system<b.system||(a.system===b.system&&(rank(a)<rank(b)||(rank(a)===rank(b)&&a.slot<b.slot))),a.id+' prima di '+b.id);}
 for(let id=0;id<30;id++)for(const [g] of GROUPS.slice(1))assert.ok(craftList({group:g,system:id}).length>0,`sistema ${id} senza ${g}`);
});
test('filtri: gruppi e sistemi, scorrimento circolare dei modelli',()=>{
 assert.equal(craftList().length,997);assert.equal(craftList({group:'difesa'}).length,218);assert.ok(craftList({group:'navi'}).every(e=>e.kind==='nave'&&!e.defence));
 const list=craftList({system:5});assert.ok(list.every(e=>e.system===5));assert.equal(list.length,craftCounts().systems[5]);
 assert.equal(craftStep(list,list.at(-1).id,1),list[0]);assert.equal(craftStep(list,list[0].id,-1),list.at(-1));assert.equal(craftStep(list,list[3].id,2),list[5]);
 assert.equal(craftStep(list,'nessuno',1),list[0]);assert.equal(craftStep([],'s00-0',1),null);
 assert.equal(groupOf(CRAFT_BY_ID.get('s00-70')),'difesa');assert.equal(groupOf(CRAFT_BY_ID.get('s00-7')),'navi');assert.equal(groupOf(CRAFT_BY_ID.get('s00-0')),'stazioni');
});
test('schede: tipo, sistema, lavoro nell\'economia o forza contro lo Sciame, nello stile del sito',()=>{
 for(const e of CRAFT){
  const c=craftCard(e);style(c.title,60);style(c.kind,20);style(c.style,30);style(c.about,200);c.lines.forEach(l=>style(l,80));
  assert.ok(c.lines[1].startsWith('Sistema '));
  if(e.kind==='stazione')assert.ok(c.lines.includes('Processo: '+RECIPES[e.works||e.type].process));
  else if(e.defence)assert.ok(c.lines.includes('Forza contro i droni dello Sciame: '+POWER[e.type]));
  else assert.ok(c.lines.some(l=>l.startsWith('Trasporta ')));
 }
 const t=craftText(CRAFT_BY_ID.get('s00-70'),{full:4000,low:1200});style(t,600);assert.ok(t.startsWith('Nave di difesa Caccia '));assert.ok(t.endsWith('Modello di 4000 triangoli, 1200 nella versione semplificata.'));
});
test('indirizzo: il catalogo si apre su un modello nominato dal suo identificativo',()=>{
 let r=resolveRoute('#/craft?model=s05-12',modules,[]);assert.equal(r.scene,'craft');assert.equal(r.craftModel,'s05-12');
 r=resolveRoute('#/modelli?model=s29-70',modules,[]);assert.equal(r.scene,'craft');assert.equal(r.craftModel,'s29-70');
 assert.equal(resolveRoute('#/craft?model=../../x',modules,[]).craftModel,null);assert.equal(resolveRoute('#/system?model=s05-12',modules,[]).craftModel,null);
});
test('visore: prima il modello semplificato, poi quello completo, con luci e parti mobili; al cambio di modello le mesh vengono liberate',()=>{
 const made=new Set(),deleted=new Set(),drawn=[],sets=new Map();
 const R={w:1600,h:1000,makeStars(){},makeMesh(id){made.add(id);},deleteMesh(id){deleted.add(id);made.delete(id);},drawMesh(id){drawn.push(id);},makeInstances(key,mesh,data){sets.set(key,data.length/8);},updateInstances(key,data){sets.set(key,data.length/8);},deleteInstances(key){sets.delete(key);},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,W=new World(R,{},biomes);
 W.factory=new CraftFactory({worker:false});W.eye=[0,4,10];W.vp=mul(perspective(.62,1.6,.05,200),lookAt(W.eye,[0,0,0]));
 const s={scene:'craft',time:2,craftModel:'s05-60'};
 W.drawViewer(s);assert.equal(W.viewerInfo.id,'s05-60');assert.ok(W.viewerInfo.loading);assert.ok(W.viewerInfo.low>0,'manca il modello semplificato');assert.ok([...made].some(id=>id.startsWith('viewer-s05-60-1-')));
 W.drawViewer(s);assert.ok(!W.viewerInfo.loading);assert.ok(W.viewerInfo.full>W.viewerInfo.low);assert.ok([...made].some(id=>id.startsWith('viewer-s05-60-0-')));
 drawn.length=0;W.drawViewer(s);assert.ok(drawn.includes('viewer-s05-60-0-body'));assert.ok(sets.get('instances-viewer')>0,'luci assenti');
 W.drawViewer({...s,craftModel:'s05-0'});assert.ok([...deleted].some(id=>id.startsWith('viewer-s05-60')));assert.ok(![...made].some(id=>id.startsWith('viewer-s05-60')));assert.equal(W.viewerInfo.id,'s05-0');
 W.drawViewer({...s,craftModel:'inesistente'});assert.equal(W.viewerInfo.id,CRAFT[0].id);
});
test('documentazione: docs/CATALOGO.md corrisponde al codice ed è scritto nello stile del sito',()=>{
 const md=catalogueMarkdown(),file=fs.readFileSync(new URL('../docs/CATALOGO.md',import.meta.url),'utf8');
 assert.equal(file,md,'docs/CATALOGO.md è da rigenerare con node scripts/craft-catalogue.mjs');
 assert.equal(md.split('\n').filter(l=>/^\| .+ \| (Stazione|Nave)( di difesa)? \| /.test(l)).length,997);
 for(const p of md.split('\n\n').filter(p=>!p.startsWith('|')&&!p.startsWith('#')))for(const r of STYLE)assert.ok(!r.test(p),p.slice(0,80));
});
