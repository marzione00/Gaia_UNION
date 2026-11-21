import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh, perspective, lookAt, mul } from '../src/renderer.js';
import { World, displayRadius } from '../src/scene/world.js';
import { systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy, stationReport, shipReport } from '../src/craft/economy.js';
import { Threats, THREAT, POWER } from '../src/craft/threats.js';
// Natural threats (1.48.0): swarms of meteoroids, rogue asteroids and flares, the defence that meets them,
// the damage of what gets through and the repairs.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const rock=sphereMesh(6,4);
function world(id,seed,{defence=true,threats=true}={}){
 const sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,rock);sys.belt={inner:b.inner,outer:b.outer};}
 const entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id),...(defence?[...systemDefence(id),...systemDefenceShips(id)]:[])],P=placeStations(sys,entries,displayRadius),clock={t:0};
 const pos=p=>p.point?p.point:p.beyond!==undefined?[90,0,0]:p.station!==undefined?stationPosition(P[p.station],clock.t,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),clock.t).position):bodyAtTime(sys.bodies.find(b=>b.slot===p.body),clock.t).position;
 const E=new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:sys.bodies.map(b=>b.slot),seed,time:0,position:pos,threats,distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))});
 const news=[];const tell=E.tell.bind(E);E.tell=t=>{news.push(t);tell(t);};
 return {E,clock,news,run(end,each=()=>{}){for(;clock.t<=end;clock.t++){E.update(clock.t);each(clock.t);}}};
}
const style=t=>{assert.ok(t.length>0&&t.length<=96,t);for(const r of STYLE)assert.ok(!r.test(t),t);for(const ch of t)assert.ok(ch in glyphs,`«${ch}» in ${t}`);};
test('calendario: la prima minaccia fra 80 e 140 s, le altre ogni 220-400 s, ripetibile con lo stesso seme, nessuna senza posizioni',()=>{
 const runs=[];
 for(const k of [0,1]){const w=world(13,77);const times=[];w.run(1800,()=>{for(const ev of w.E.threats.active)if(!times.some(o=>o.id===ev.id))times.push({id:ev.id,t:ev.t0,kind:ev.kind});});runs.push(times);}
 assert.deepEqual(runs[0],runs[1]);
 const t=runs[0].map(o=>o.t);assert.ok(t.length>=4,'minacce: '+t.length);assert.ok(t[0]>=THREAT.first[0]&&t[0]<=THREAT.first[1]+1,'prima minaccia a '+t[0]);
 for(let i=1;i<t.length;i++)assert.ok(t[i]-t[i-1]>=THREAT.every[0]-1&&t[i]-t[i-1]<=THREAT.every[1]+1,'intervallo '+(t[i]-t[i-1]));
 for(const o of runs[0])assert.ok(['sciame','asteroide','brillamento'].includes(o.kind));
 const quiet=new Economy({stations:systemCraft(2).filter(e=>e.kind==='stazione'),ships:[],seed:1,distance:()=>1});assert.equal(quiet.threats,null);
});
test('sciame: la flotta parte subito con la sorveglianza, aspetta sulla rotta e distrugge i frammenti; senza flotta lo sciame colpisce',()=>{
 for(const defence of [true,false]){
  const w=world(5,31,{defence});w.run(60);const ev=w.E.threats.spawn('sciame'),target=w.E.stations[ev.target];
  w.run(Math.ceil(ev.tEnd));
  if(defence){
   assert.ok(ev.watch,'sorveglianza assente');assert.ok(ev.defenders.length>=1&&ev.defenders.length<=4,'navi: '+ev.defenders.length);
   for(const id of ev.defenders){const s=w.E.ships[id];assert.equal(s.cls.idle,'guard');}
   assert.ok(ev.killed>=1,'nessun frammento distrutto');assert.ok(ev.kills.every(k=>k.t>=ev.t0&&k.t<=ev.tImpact),'colpo fuori tempo');
   assert.ok(w.news.some(t=>t.startsWith('Flotta in volo contro lo sciame di meteoroidi')));
  }else{assert.equal(ev.defenders.length,0);assert.equal(ev.killed,0);}
  assert.equal(ev.hits,ev.n-ev.killed);assert.ok(['fermato','impatto'].includes(ev.outcome));
  if(ev.hits){const d=Math.min(THREAT.damage.cap,ev.hits*THREAT.damage.fragment*(target.entry.defence?.5:1));assert.ok(Math.abs(target.damage-d)<1e-9||target.repair===null,'danno '+target.damage);}
 }
});
test('asteroide: alla frontiera una nave dalla fregata in su lo distrugge; senza difesa l\'impatto danneggia la stazione e le sue scorte',()=>{
 const w=world(5,41);w.run(60);const ev=w.E.threats.spawn('asteroide');w.run(Math.ceil(ev.tEnd));
 assert.ok(ev.defenders.every(id=>(POWER[w.E.ships[id].entry.type]||0)>=8),'nave leggera contro un asteroide');
 assert.equal(ev.outcome,'distrutto');assert.ok(w.news.some(t=>t.startsWith('Asteroide vagante distrutto da ')));
 const v=world(13,41,{defence:false});v.run(60);const e2=v.E.threats.spawn('asteroide'),s=v.E.stations[e2.target],before={...s.stock};v.run(Math.ceil(e2.tImpact)+1);
 assert.equal(e2.outcome,'impatto');assert.ok(s.damage>=THREAT.damage.asteroid-1e-9||s.repair===null);assert.ok(v.news.some(t=>t.startsWith('Asteroide vagante su ')&&t.includes('danni al')));
 assert.ok(Object.keys(before).some(r=>before[r]>5&&s.stock[r]<before[r]),'scorte intatte');
});
test('danni e riparazioni: una stazione danneggiata lavora più piano, chiede parti e torna intera quando arrivano',()=>{
 const w=world(13,51);w.run(30);const s=w.E.stations.find(x=>x.entry.works==='altoforno'||x.entry.type==='cantiere'||Object.keys(x.make).length&&!x.entry.defence&&x.entry.type!=='porta');
 w.E.threats.harm(s,.4);assert.ok(Math.abs(s.damage-.4)<1e-9);assert.equal(s.repair.parti,15);assert.ok(s.want.parti>=15);
 w.E.update(++w.clock.t);if(Object.keys(s.make).length&&s.producing)assert.ok(s.producing<=1-THREAT.slow*.4+1e-9);
 const line=stationReport(s)[1];assert.ok(line.startsWith('Danni: lavora al 70 %'),line);style(line);
 s.stock.parti=(s.stock.parti||0)+20;w.E.update(++w.clock.t);
 assert.equal(s.damage,0);assert.equal(s.repair,null);assert.ok(w.news.includes(`Riparazioni concluse su ${s.entry.name}`));
 if(s.base.want.parti===undefined)assert.equal(s.want.parti,undefined);
});
test('brillamento: dimezza il lavoro delle stazioni scoperte per 45 s; stazioni di difesa e stazioni sotto lo scudo restano intere',()=>{
 const w=world(5,61);w.run(40);const ev=w.E.threats.spawn('brillamento');
 assert.ok(w.E.stations.filter(s=>s.entry.defence).every(s=>ev.covered.has(s.i)));
 assert.ok(ev.shields>=1,'sistema di frontiera senza scudo');
 w.E.update(++w.clock.t);
 for(const s of w.E.stations){assert.equal(s.flare,!ev.covered.has(s.i));if(s.flare&&Object.keys(s.make).length)assert.ok(s.producing<=.5+1e-9);}
 assert.equal(stationReport(w.E.stations.find(s=>s.flare))[1],'Brillamento: produzione a metà');
 w.run(Math.ceil(ev.tEnd)+1);assert.ok(w.E.stations.every(s=>!s.flare));
});
test('lunga durata: la difesa ferma quasi tutto, rapporti e notizie nello stile del sito',()=>{
 const texts=new Set();let fragments=0,killed=0,rocks=0,broken=0;
 for(const id of [5,13,26]){
  const w=world(id,id*3+7);
  w.run(1800,t=>{if(t%20)return;for(const s of w.E.ships)if(s.task==='intercetta')shipReport(s,t,()=>'qui').forEach(x=>texts.add(x));for(const s of w.E.stations)stationReport(s).forEach(x=>texts.add(x));});
  const L=w.E.threats.log;fragments+=L.fragments;killed+=L.killed;rocks+=L.destroyed+L.impacts;broken+=L.destroyed;
  w.news.forEach(t=>texts.add(t));
 }
 assert.ok(fragments>0&&killed/fragments>.6,'frammenti distrutti '+killed+' su '+fragments);
 if(rocks)assert.ok(broken/rocks>=.5,'asteroidi distrutti '+broken+' su '+rocks);
 for(const t of texts)style(t);
 assert.ok([...texts].some(t=>t==='In posizione di tiro'||t.startsWith('Intercettazione, arrivo fra ')),'nessuna nave in intercettazione');
});
test('scena: punto di intercettazione, minacce indicabili e conteggio nella diagnostica',()=>{
 const R={w:1600,h:1000,makeStars(){},makeMesh(){},deleteMesh(){},drawMesh(){},makeInstances(){},updateInstances(){},deleteInstances(){},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);w.cameraSpace='system';w.travelling=false;w.fov=.78;w.eye=[0,40,70];w.vp=mul(perspective(.78,1.6,.012,400),lookAt(w.eye,[0,0,0]));
 const sys={...systemArchitecture(5),id:5},s={scene:'system',time:3};
 w.projections=[];w.drawStations(s,5,sys);
 assert.deepEqual(w.craftSite(sys,{point:[1,2,3]},3),{position:[1,2,3],radius:0});assert.equal(w.craftName(sys,{point:[1,2,3]}),'punto di intercettazione');
 const life=w.craft.life;assert.ok(life.threats instanceof Threats,'minacce spente nella scena');
 const ev=life.threats.spawn('sciame');s.time=ev.t0+5;w.projections=[];w.drawStations(s,5,sys);
 const p=w.projections.find(q=>q.entry?.kind==='minaccia');assert.ok(p,'minaccia non indicabile');assert.equal(p.lines.length,2);p.lines.forEach(style);assert.ok(w.craftStats.threats>=1);
});
