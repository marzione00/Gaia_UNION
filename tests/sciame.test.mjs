import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { AREAS, systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh, perspective, lookAt, mul } from '../src/renderer.js';
import { World, displayRadius } from '../src/scene/world.js';
import { systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips, frontierRank } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy, stationReport, shipReport } from '../src/craft/economy.js';
import { Threats, THREAT } from '../src/craft/threats.js';
import { Frontier, SWARM, defencePower, raidLength } from '../src/craft/swarm.js';
// The Sciame della Frontiera (1.49.0): the front across the galaxy, the incursions fought in a system, the
// drones in the scene and the Cronaca della frontiera.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max=120)=>{assert.ok(t.length>0&&t.length<=max,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);};
const rock=sphereMesh(6,4);
function world(id,seed){
 const sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,rock);sys.belt={inner:b.inner,outer:b.outer};}
 const entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id),...systemDefence(id),...systemDefenceShips(id)],P=placeStations(sys,entries,displayRadius),clock={t:0};
 const pos=p=>p.point?p.point:p.beyond!==undefined?[90,0,0]:p.station!==undefined?stationPosition(P[p.station],clock.t,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),clock.t).position):bodyAtTime(sys.bodies.find(b=>b.slot===p.body),clock.t).position;
 const E=new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:sys.bodies.map(b=>b.slot),seed,time:0,position:pos,distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))});
 E.threats.next=Infinity;const news=[];const tell=E.tell.bind(E);E.tell=t=>{news.push(t);tell(t);};
 return {E,clock,news,run(end){for(;clock.t<=end;clock.t++)E.update(clock.t);}};
}
test('fronte: parte dai quattro sistemi di frontiera, colpisce la linea del fronte, avanza e arretra entro quattro sistemi per braccio',()=>{
 const F=new Frontier(1234,0);assert.deepEqual(F.depth,[0,0,0,0]);
 assert.deepEqual(F.contested().sort((a,b)=>a-b),AREAS.map((a,i)=>i).filter(i=>frontierRank(i)===0));
 for(const k of [0,1,2,3])assert.equal(frontierRank(F.front(k)),0);
 const seen=[];let last=0;
 for(let t=0;t<=5400;t+=5){F.update(t);for(const r of F.raids)if(!seen.includes(r)){seen.push(r);assert.equal(frontierRank(r.system),F.depth[r.arm],'incursione fuori dal fronte');assert.ok(r.n<=SWARM.cap);}for(const d of F.depth)assert.ok(d>=0&&d<=SWARM.depth);}
 assert.ok(seen.length>=15,'incursioni: '+seen.length);
 for(let i=1;i<seen.length;i++)assert.ok(seen[i].t0-seen[i-1].t0>=SWARM.every[0]-5&&seen[i].t0-seen[i-1].t0<=SWARM.every[1]+5);
 assert.ok(seen.at(-1).n>seen[0].n,'le ondate non crescono');
 const s=F.summary();assert.ok(s.repelled>0&&s.converted>0,'esiti: '+JSON.stringify(s));assert.ok(s.advances>0,'il fronte non avanza mai');
 const G=new Frontier(1234,0);for(let t=0;t<=5400;t+=5)G.update(t);assert.deepEqual(G.summary(),s,'stesso seme, fronte diverso');
 for(const e of F.log)style(e.text);
});
test('fronte: una conversione dura cinque minuti e sposta il fronte, un\'incursione respinta lo riporta indietro',()=>{
 const F=new Frontier(99,0),k=2,first=F.front(k);
 const r=F.launch();r.arm=k;r.system=first;F.settle(r,'conversione',3);
 assert.equal(F.depth[k],1);assert.equal(F.pressure(first),1);assert.ok(F.converted.get(first)===F.time+SWARM.convert);
 assert.equal(F.pressure(F.front(k)),.4);
 F.update(F.time+SWARM.convert+1);assert.ok(!F.converted.has(first));assert.ok(F.log.some(e=>e.text.startsWith('Il sistema '+AREAS[first].name+' torna libero')));
 const r2={id:99,arm:k,system:F.front(k),n:5,t0:F.time,due:Infinity,live:false,settled:false};F.raids.push(r2);assert.equal(F.pressure(r2.system),.8);
 F.settle(r2,'respinta',5);assert.equal(F.depth[k],0);F.settle(r2,'conversione',0);assert.equal(F.depth[k],0,'esito registrato due volte');
 for(const k2 of [0,1,2,3]){const p=F.arms[k2].slice(0,4).map(defencePower);assert.ok(p[0].ships>=p[3].ships,'la frontiera non è la più difesa');}
 assert.ok(raidLength()>THREAT.raid.growth+THREAT.raid.flight[0]);
});
test('incursione: i droni crescono alla roccia, la flotta li intercetta, quelli che passano convertono la stazione e tornano polvere',()=>{
 for(const [n,expect] of [[2,'respinta'],[40,'conversione']]){
  const w=world(5,17),raid={id:1},done=[];w.run(30);w.E.threats.onRaid=ev=>done.push(ev.outcome);
  const ev=w.E.threats.spawn('incursione',{n,raid});assert.equal(ev.raid,raid);assert.equal(ev.tLaunch,ev.t0+THREAT.raid.growth);
  const nest=Threats.fragment(ev,0,ev.t0+1,[0,0,0]);assert.ok(Math.hypot(...nest.map((v,i)=>v-ev.from[i]))<2,'i droni non crescono alla roccia');
  const target=w.E.stations[ev.target];let stopped=false,drained=false,before=null;
  for(;w.clock.t<=Math.ceil(ev.tEnd);w.clock.t++){
   w.E.update(w.clock.t);
   if(target.converted){stopped=stopped||target.producing===0;before??={...target.stock};drained=drained||Object.keys(before).some(r=>before[r]>5&&target.stock[r]<before[r]);style(stationReport(target)[0]);assert.equal(stationReport(target)[1],'Lo Sciame trasforma la materia in calcolo');}
   for(const s of w.E.ships)if(s.task==='intercetta'&&s.alertKind==='incursione')shipReport(s,w.clock.t,()=>'qui').forEach(t=>style(t,60));
  }
  assert.ok(ev.defenders.length>=1&&ev.defenders.length<=THREAT.raid.defenders);
  assert.equal(ev.outcome,expect);assert.deepEqual(done,[expect]);assert.equal(ev.hits,ev.n-ev.killed);
  if(expect==='conversione'){assert.ok(stopped&&drained,'conversione senza effetti');assert.equal(target.converted,null);assert.ok(target.damage>0);assert.ok(w.news.some(t=>t.includes('tornano polvere')));}
  else assert.ok(w.news.some(t=>t.startsWith('Incursione respinta')));
  w.news.forEach(t=>style(t));
 }
});
test('scena: il fronte vive nel mondo, l\'incursione del sistema aperto si combatte dal vivo e il suo esito torna al fronte',()=>{
 const made=new Set(),sets=new Map();
 const R={w:1600,h:1000,makeStars(){},makeMesh(id){made.add(id);},deleteMesh(){},drawMesh(){},makeInstances(key,mesh,data){assert.ok(made.has(mesh)||mesh==='lowSphere',mesh);sets.set(key,{mesh,n:data.length/8});},updateInstances(key,data){sets.get(key).n=data.length/8;},deleteInstances(key){sets.delete(key);},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);w.cameraSpace='system';w.travelling=false;w.fov=1.2;w.eye=[0,150,30];w.vp=mul(perspective(1.2,1.6,.012,600),lookAt(w.eye,[0,0,0]));
 const sys={...systemArchitecture(5),id:5},s={scene:'system',time:3};
 w.frontier=new Frontier(7,3);w.projections=[];w.drawStations(s,5,sys);
 const life=w.craft.life;life.threats.next=Infinity;
 const r=w.frontier.launch();r.system=5;r.arm=AREAS[5].sector;r.n=40;
 w.projections=[];w.drawStations(s,5,sys);
 assert.ok(r.live,'incursione non combattuta dal vivo');const ev=life.threats.active.find(e=>e.raid===r);assert.ok(ev);
 s.time=ev.t0+4;w.projections=[];w.drawStations(s,5,sys);assert.ok(sets.get('instances-drones')?.n>=1,'droni non disegnati');
 const p=w.projections.find(q=>q.entry?.typeName==='Sciame della Frontiera');assert.ok(p,'incursione non indicabile');p.lines.forEach(t=>style(t,60));
 for(;s.time<=ev.tEnd+1;s.time+=1){w.frontier.update(s.time,5);w.projections=[];w.drawStations(s,5,sys);}
 assert.ok(r.settled,'esito non registrato');assert.equal(r.outcome,ev.outcome);
 assert.ok(life.news.some(n=>n.text.startsWith('Fronte: ')),'cronaca della frontiera assente');
});
