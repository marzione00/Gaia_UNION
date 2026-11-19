import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh } from '../src/renderer.js';
import { displayRadius } from '../src/scene/world.js';
import { systemCraft } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy, RECIPES, FLEET, RESOURCES, stationReport, shipReport } from '../src/craft/economy.js';
import { shipPose, shipMatrix, SHIP_SIZE } from '../src/craft/traffic.js';
// Life of the systems: stations produce and consume, ships carry goods; every seed gives other routes.
const rock=sphereMesh(6,4),glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
function world(id,seed){
 const sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,rock);sys.belt={inner:b.inner,outer:b.outer};}
 const entries=systemCraft(id),P=placeStations(sys,entries,displayRadius),clock={t:0};
 const body=slot=>sys.bodies.find(b=>b.slot===slot);
 const site=(place,t=clock.t)=>place.station!==undefined?{position:stationPosition(P[place.station],t,s=>bodyAtTime(body(s),t).position),radius:P[place.station].size}:{position:bodyAtTime(body(place.body),t).position,radius:displayRadius(body(place.body))};
 const distance=(a,b)=>{const p=site(a).position,q=site(b).position;return Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2]);};
 const E=new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:sys.bodies.map(b=>b.slot),seed,time:0,distance});
 return {sys,P,E,site,clock};
}
const run=(w,until,step=.5,each=()=>{})=>{for(w.clock.t=0;w.clock.t<=until;w.clock.t+=step){w.E.update(w.clock.t);each(w.clock.t);}};
test('regole: ogni stazione ha una ricetta, ogni nave una classe con merci note',()=>{
 for(const e of systemCraft(0).concat(...Array.from({length:29},(_,i)=>systemCraft(i+1))))assert.ok(e.kind==='nave'?FLEET[e.type]:RECIPES[e.type],e.type);
 for(const c of Object.values(FLEET))for(const r of c.carries)assert.ok(RESOURCES[r],r);
 for(const r of Object.values(RECIPES))for(const k of [...Object.keys(r.make||{}),...Object.keys(r.use||{}),...Object.keys(r.want||{})])assert.ok(RESOURCES[k]&&(r.cap?.[k]??0)>0,k);
});
test('economia: scorte nei limiti, prenotazioni coerenti, navi sempre in uno stato valido, merci consegnate',()=>{
 for(const id of [0,1,7,13,20,26,29]){
  const w=world(id,1000+id),moved={carica:0,scarica:0},seen=new Map(),trips=new Map();
  run(w,1800,.5,()=>{
   for(const s of w.E.stations){for(const [r,v] of Object.entries(s.stock)){assert.ok(v>=-1e-9&&v<=(s.cap[r]??Infinity)+1e-9,`${s.entry.id} ${r} ${v}`);}for(const v of [...Object.values(s.reserved),...Object.values(s.incoming)])assert.ok(v>=-1e-9);}
   for(const sh of w.E.ships){
    assert.ok(['dock','travel'].includes(sh.phase));assert.ok(sh.t1>=sh.t0&&Number.isFinite(sh.t1));
    const key=sh.phase+sh.task+sh.t1;if(seen.get(sh.id)!==key){seen.set(sh.id,key);if(sh.phase==='dock'&&moved[sh.task]!==undefined)moved[sh.task]++;if(sh.phase==='travel')trips.set(sh.id,(trips.get(sh.id)||0)+1);}
   }
  });
  assert.ok(moved.carica>5&&moved.scarica>5,`sistema ${id}: ${JSON.stringify(moved)}`);
  assert.ok(w.E.ships.every(sh=>(trips.get(sh.id)||0)>=3),`sistema ${id}: una nave resta ferma`);
 }
});
test('ogni avvio è diverso: semi diversi danno rotte diverse, lo stesso seme le stesse',()=>{
 const trace=seed=>{const w=world(13,seed),out=[];run(w,300,.5,t=>{if(t%30===0)out.push(w.E.ships.map(s=>s.phase+(s.to?.station??s.to?.body)).join());});return out.join('|')+w.E.ships.length;};
 assert.equal(trace(7),trace(7));
 const distinct=new Set([1,2,3,4,5].map(trace));assert.ok(distinct.size>=4,'semi diversi, rotte uguali');
});
test('rotte: posizioni finite, nessun passaggio vicino alla stella, matrice ortonormale',()=>{
 for(const id of [0,1,13,26]){
  const w=world(id,77),avoid=w.sys.starRadius*2.2+1;let min=Infinity;
  run(w,900,.5,t=>{for(const sh of w.E.ships){const p=shipPose(sh,t,place=>w.site(place,t),avoid);assert.ok(p.position.every(Number.isFinite)&&p.forward.every(Number.isFinite));if(sh.phase==='travel')min=Math.min(min,Math.hypot(p.position[0],p.position[2]));}});
  assert.ok(min>w.sys.starRadius*1.5,`sistema ${id}: una nave passa a ${min.toFixed(2)} dalla stella`);
 }
 const M=shipMatrix([1,2,3],[.6,.0,.8],2);const col=k=>[M[k*4],M[k*4+1],M[k*4+2]];
 for(const k of [0,1,2])assert.ok(Math.abs(Math.hypot(...col(k))-2)<1e-6);
 const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];assert.ok(Math.abs(dot(col(0),col(1)))<1e-6&&Math.abs(dot(col(1),col(2)))<1e-6&&Math.abs(dot(col(0),col(2)))<1e-6);
 for(const t of Object.keys(FLEET))assert.ok(SHIP_SIZE[t]>0,t);
});
test('resoconti: due righe brevi, nello stile del sito e con le lettere dell\'atlante',()=>{
 const w=world(1,5),texts=new Set();
 run(w,600,1,t=>{for(const s of w.E.stations)stationReport(s).forEach(x=>texts.add(x));for(const sh of w.E.ships)shipReport(sh,t,p=>p.station!==undefined?w.P[p.station].entry.name:'corpo '+(p.body+1)+' (gigante gassoso)').forEach(x=>texts.add(x));});
 assert.ok(texts.size>20);
 for(const t of texts){assert.ok(t.length>0&&t.length<=60,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);}
});
