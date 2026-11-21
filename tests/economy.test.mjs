import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { AREAS, systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh } from '../src/renderer.js';
import { displayRadius } from '../src/scene/world.js';
import { systemCraft, systemExtras, systemShipExtras, EXTRAS } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy, RESOURCES, RECIPES, FLEET, GROWTH, kitOf, stationReport } from '../src/craft/economy.js';
import { ROLES, TYPES, worksOf } from '../src/craft/grammar.js';
// Economy 2.0 (1.45.0): 24 goods in production chains, gates that balance the chains, carriers for every good.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const rock=sphereMesh(6,4);
function world(id,seed,full=true){
 const sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,rock);sys.belt={inner:b.inner,outer:b.outer};}
 const entries=[...systemCraft(id),...(full?[...systemExtras(id),...systemShipExtras(id)]:[])],P=placeStations(sys,entries,displayRadius),clock={t:0};
 const pos=p=>p.station!==undefined?stationPosition(P[p.station],clock.t,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),clock.t).position):bodyAtTime(sys.bodies.find(b=>b.slot===p.body),clock.t).position;
 return {P,clock,E:new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:sys.bodies.map(b=>b.slot),seed,time:0,distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))})};
}
test('merci e ricette: 24 merci in cinque famiglie, ricette coerenti, ogni variante dei ruoli usata',()=>{
 assert.equal(Object.keys(RESOURCES).length,24);
 const kinds={};for(const r of Object.values(RESOURCES)){kinds[r.kind]=(kinds[r.kind]||0)+1;assert.ok(r.name&&r.unit&&r.color.length===4);}
 assert.deepEqual(kinds,{grezzo:5,lavorato:9,vita:4,avanzato:5,persone:1});
 for(const [k,r] of Object.entries(RECIPES)){
  for(const g of [...Object.keys(r.make||{}),...Object.keys(r.use||{}),...Object.keys(r.want||{}),...Object.keys(r.keep||{})])assert.ok(RESOURCES[g]&&(r.cap?.[g]??0)>0,k+' '+g);
  for(const g of Object.keys(r.want||{}))assert.ok(r.cap[g]>=r.want[g],k+' '+g);
  assert.ok(typeof r.process==='string'&&r.process.length>0&&r.process.length<=28,k);assert.ok(!(r.inputs&&r.soft),k);
 }
 // Every good is made somewhere and, apart from the people, used or stored somewhere.
 for(const g of Object.keys(RESOURCES)){assert.ok(Object.values(RECIPES).some(r=>r.make?.[g]),'nessuno produce '+g);if(g!=='equipaggi'&&g!=='dati')assert.ok(Object.values(RECIPES).some(r=>r.use?.[g]||r.want?.[g]),'nessuno usa '+g);}
 const used=new Set(EXTRAS.map(e=>e.works));for(const r of Object.values(ROLES))for(const v of r.recipe){assert.ok(RECIPES[v],v);assert.ok(used.has(v),'variante mai usata: '+v);}
 for(const t of TYPES)assert.ok(ROLES[t.role].recipe.includes(worksOf(t)));
});
test('porte e navi: ogni catena si chiude e ogni merce richiesta ha una nave che la porta, in ogni sistema',()=>{
 for(const c of Object.values(FLEET))for(const g of c.carries)assert.ok(RESOURCES[g],g);
 for(const g of Object.keys(RESOURCES))assert.ok(Object.values(FLEET).some(c=>c.carries.includes(g)),'nessuna classe porta '+g);
 for(const full of [false,true])AREAS.forEach((_,id)=>{
  const {E}=world(id,3,full),gate=E.stations.find(s=>s.entry.type==='porta'),made={},used={};
  // Expansion kits (1.46.0) count as a small steady use.
  for(const s of E.stations)if(s!==gate&&s.grows)for(const [g,v] of Object.entries(kitOf(s)))used[g]=(used[g]||0)+v/(GROWTH.time*3);
  for(const s of E.stations)if(s!==gate){for(const [g,v] of Object.entries(s.make))made[g]=(made[g]||0)+v;for(const [g,v] of Object.entries(s.use))if(g!=='equipaggi')used[g]=(used[g]||0)+v;}
  for(const [g,u] of Object.entries(used)){const m=made[g]||0;if(m<u*1.5)assert.ok(gate.imports[g]>=Math.max(u-m,u*.25)-1e-3,`sistema ${id}: la porta non importa ${g}`);}
  for(const [g,m] of Object.entries(made))if(g!=='equipaggi'&&m>=(used[g]||0)*1.5&&m>(used[g]||0))assert.ok(gate.use[g]>0,`sistema ${id}: la porta non esporta ${g}`);
  for(const g of Object.keys(RESOURCES))assert.ok(gate.cap[g]>0,`sistema ${id}: la porta non accetta ${g}`);
  const carried=new Set(E.ships.flatMap(s=>s.cls.carries));
  for(const s of E.stations)for(const g of Object.keys(s.want))if(g!=='equipaggi')assert.ok(carried.has(g),`sistema ${id}: nessuna nave porta ${g}`);
 });
});
test('vita: le stazioni lavorano quasi sempre, le catene consegnano le loro merci, i resoconti restano brevi',()=>{
 const delivered=new Set(),texts=new Set();let n=0,full=0,stop=0;
 for(const id of [2,13,20,26]){
  const w=world(id,40+id),moved=new Set();
  for(w.clock.t=0;w.clock.t<=1200;w.clock.t+=1){
   w.E.update(w.clock.t);
   for(const s of w.E.stations){if(!Object.keys(s.make).length||s.entry.type==='porta')continue;n++;if(s.producing===1)full++;if(s.inputs&&s.missing.length)stop++;for(const [g,v] of Object.entries(s.stock))assert.ok(v>=-1e-9&&v<=(s.cap[g]??Infinity)+1e-9,s.entry.id+' '+g);}
   for(const sh of w.E.ships){if(sh.phase==='travel'&&sh.born<=900)moved.add(sh.id);if(sh.phase==='dock'&&sh.task==='scarica'&&sh.cargo)delivered.add(sh.cargo.res);}
   if(w.clock.t%60===0)for(const s of w.E.stations)stationReport(s).forEach(x=>texts.add(x));
  }
  assert.equal(moved.size,w.E.ships.filter(sh=>sh.born<=900).length,'sistema '+id+': navi ferme');
 }
 assert.ok(full/n>.7,'a pieno ritmo '+(full/n).toFixed(3));assert.ok(stop/n<.05,'ferme per mancanza di ingredienti '+(stop/n).toFixed(3));
 assert.ok(delivered.size>=20,'merci consegnate: '+delivered.size);
 for(const t of texts){assert.ok(t.length>0&&t.length<=60,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);}
 assert.ok([...texts].some(t=>t.startsWith('Elettrolisi')||t.startsWith('Riduzione')||t.startsWith('Fusione')),'nessun processo nei resoconti');
});
