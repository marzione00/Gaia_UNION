import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { AREAS, systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh, perspective, lookAt, mul } from '../src/renderer.js';
import { World, displayRadius } from '../src/scene/world.js';
import { systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { Economy } from '../src/craft/economy.js';
import { Frontier, SWARM, rapporto } from '../src/craft/swarm.js';
import { fixture, layoutErrors } from '../tools/atlas-fixture.mjs';
// The Sciame della Frontiera, second part (1.50.0): the Sciame learns, the laboratories turn captured drones
// into keys, the keys free drones that help the systems, and the Rapporto sets forecasts against outcomes.
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
// A frontier with a key delivered to every arm, without incursions of its own.
function keyed(seed=3){const F=new Frontier(seed,0);F.next=Infinity;F.study(Math.ceil(SWARM.key.samples/SWARM.key.capture));F.update(SWARM.key.delivery[1]+1);return F;}
const run=(seed,end=3600)=>{const F=new Frontier(seed,0);for(let t=0;t<=end;t+=10)F.update(t);return F;};

test('apprendimento: lo Sciame rafforza il braccio dove converte, indebolisce quello dove è respinto e lancia secondo i pesi',()=>{
 const F=new Frontier(5,0),L=SWARM.learn,r=F.launch(),k=r.arm,w0=F.weights[k];
 F.settle(r,'conversione',0);assert.ok(Math.abs(F.weights[k]-w0*L.win)<1e-9);
 const r2=F.launch();r2.arm=k;r2.system=F.front(k);F.settle(r2,'respinta',r2.n);assert.ok(Math.abs(F.weights[k]-w0*L.win*L.loss)<1e-9);
 for(let i=0;i<30;i++)F.learn(0,'conversione');for(let i=0;i<30;i++)F.learn(1,'respinta');assert.equal(F.weights[0],L.max);assert.equal(F.weights[1],L.min);
 assert.equal(F.favourite,0);assert.ok(F.log.some(e=>e.text==='Lo Sciame impara: concentra le incursioni sul braccio della Matematica'));
 const G=new Frontier(11,0);G.weights=[4,.25,.25,.25];const arms=[0,0,0,0];for(let i=0;i<400;i++)arms[G.launch().arm]++;
 const p=G.forecast().map(f=>f.p);assert.ok(Math.abs(p.reduce((a,b)=>a+b,0)-1)<1e-9);assert.ok(Math.abs(p[0]-4/4.75)<1e-9);
 assert.ok(Math.abs(arms[0]/400-p[0])<.06,'estrazione lontana dai pesi: '+arms);
 F.log.forEach(e=>style(e.text));
});
test('chiavi: i campioni dei droni abbattuti diventano una chiave, i corrieri la portano ai quattro fronti e lo Sciame la rende obsoleta',()=>{
 const F=new Frontier(3,0);F.next=Infinity;assert.equal(F.freedBy(0,20),0);
 F.study(Math.ceil(SWARM.key.samples/SWARM.key.capture)-8);assert.equal(F.keys.length,0);assert.ok(F.progress>0&&F.progress<1);
 F.study(8);assert.equal(F.keys.length,1);const key=F.keys[0];
 assert.equal(key.lab,F.arms[F.weights.indexOf(Math.max(...F.weights))].at(-1),'il laboratorio è lontano dalla frontiera');
 assert.equal(F.deliveries.length,4);for(const d of F.deliveries)assert.ok(d.at>=SWARM.key.delivery[0]&&d.at<=SWARM.key.delivery[1]);
 assert.equal(F.freedBy(0,20),0,'chiave usata prima della consegna');
 F.update(SWARM.key.delivery[1]+1);assert.equal(F.deliveries.length,0);assert.deepEqual([...key.arms].sort(),[0,1,2,3]);
 for(const k of [0,1,2,3]){assert.equal(F.keyOf(k),key);assert.equal(F.freedBy(k,20),Math.round(20*SWARM.key.strength*SWARM.key.share));}
 assert.equal(F.log.filter(e=>e.text.startsWith('Un corriere porta la chiave 1 al fronte del braccio')).length,4);
 // Samples while the key works wait; a worn key lets the laboratories make the next one.
 F.study(200);assert.equal(F.keys.length,1);assert.equal(F.progress,1);
 const r={arm:2,system:F.front(2)};let uses=0;while(F.keyOf(2)){F.free(r,5);uses++;if(uses===4)assert.ok(key.strength<SWARM.key.renew);}
 assert.equal(uses,8);assert.equal(F.freedBy(2,20),0);assert.ok(F.log.some(e=>e.text==='Lo Sciame cambia protocollo: la chiave 1 non libera più droni'));
 assert.equal(F.freed.get(r.system),SWARM.freedCap,'droni liberati oltre il limite');assert.equal(F.stats.freed,40);
 F.study(7);assert.equal(F.keys.length,2);assert.equal(F.keys[1].strength,SWARM.key.strength);
 F.log.forEach(e=>style(e.text));
});
test('esito con la chiave: i droni liberati escono dall\'ondata prima della battaglia e restano nel sistema',()=>{
 const F=keyed(),before=F.stats.freed;let n=0;
 for(let i=0;i<12;i++){const r=F.launch(),freed=F.freedBy(r.arm,r.n);F.resolve(r);n++;
  assert.equal(r.freed,freed);assert.ok(r.killed<=r.n-freed);assert.equal(r.outcome,r.killed>=r.n-freed?'respinta':'conversione');}
 assert.ok(F.stats.freed>before);assert.ok([...F.freed.values()].every(v=>v<=SWARM.freedCap));
 assert.ok(F.log.some(e=>/^\d+ droni liberati dalla chiave restano nel sistema /.test(e.text)));
});
test('previsione: le probabilità sommano a uno, la chiave alza la probabilità di respingere e il punteggio batte il caso',()=>{
 const F=new Frontier(21,0),before=F.forecast();
 for(const f of before){assert.ok(f.repel>=0&&f.repel<=1);assert.ok(f.wave[0]<=f.wave[1]&&f.wave[1]<=SWARM.cap);assert.equal(f.freed,0);assert.equal(f.key,null);}
 F.next=Infinity;F.study(75);F.update(SWARM.key.delivery[1]+1);
 F.forecast().forEach((f,k)=>{assert.ok(f.freed>0);assert.ok(f.repel>=before[k].repel,'la chiave abbassa la difesa');});
 assert.deepEqual(new Frontier(1,0).score(),{n:0,top:0,expected:0,brier:null});
 let n=0,brier=0,top=0,expected=0;
 for(const seed of [7919,15838,23757,31676]){const sc=run(seed).score();assert.ok(sc.top<=sc.n&&sc.expected>=.25&&sc.expected<=1);n+=sc.n;brier+=sc.brier*sc.n;top+=sc.top;expected+=sc.expected*sc.n;}
 assert.ok(n>=40,'incursioni: '+n);assert.ok(brier/n<.2,'Brier '+brier/n);assert.ok(top/n>=expected/n-.1,'previsione del braccio sbagliata');
});
test('Rapporto: righe per braccio in ordine di probabilità, punteggio, chiavi e ultime incursioni, in prosa che rispetta lo stile',()=>{
 const empty=rapporto(new Frontier(1,0));assert.equal(empty.recent.length,0);assert.ok(empty.score.startsWith('Nessuna incursione conclusa'));style(empty.text,1200);
 const F=run(7919),rp=rapporto(F);
 assert.equal(rp.rows.length,4);for(let i=1;i<4;i++)assert.ok(parseInt(rp.rows[i-1].p)>=parseInt(rp.rows[i].p));
 assert.equal(rp.next,Math.max(0,Math.round(F.next-F.time)));assert.ok(rp.recent.length>0&&rp.recent.length<=5);
 assert.ok(Math.abs(rp.learning.reduce((a,x)=>a+x.share,0)-1)<1e-9);
 for(const r of rp.rows)for(const v of [r.arm,r.system,r.p,r.wave,r.repel,r.key])style(String(v),60);
 for(const x of rp.recent)style(`${x.system} · ${x.n} droni · respinta prevista ${x.predicted} · esito: ${x.outcome}`,120);
 style(rp.score,260);style(rp.keys,260);style(rp.text,1600);assert.ok(rp.text.includes('Prossima incursione fra circa'));
});
test('economia: i droni liberati riparano le stazioni senza attendere i ricambi e scavano accanto alle miniere',()=>{
 const a=world(5,17),b=world(5,17);a.run(60);b.run(60);
 const s=a.E.stations.find(x=>!x.repair&&!x.damage&&!x.entry.defence&&x.producing),i=a.E.stations.indexOf(s);assert.ok(s,'nessuna stazione integra');
 for(const w of [a,b]){w.E.threats.harm(w.E.stations[i],.3);}
 // Twenty free drones mend 0.008 of damage per second: 0.3 in under 40 s, before the parts arrive.
 a.E.helpers=20;a.run(100);b.run(100);
 assert.equal(a.E.stations[i].damage,0,'nessuna riparazione dai droni liberati');assert.equal(a.E.stations[i].repair,null);assert.ok(b.E.stations[i].damage>0);
 assert.ok(a.news.includes(`I droni liberati riparano ${s.entry.name}`));
 const mine=world(1,4),plain=world(1,4),m=mine.E.stations.findIndex(x=>x.make.minerale||x.make.silicati);assert.ok(m>=0,'nessuna miniera');
 mine.E.helpers=20;for(const w of [mine,plain])w.run(120);
 const ore=w=>(w.E.stations[m].stock.minerale||0)+(w.E.stations[m].stock.silicati||0);
 assert.ok(ore(mine)>ore(plain),'le miniere non guadagnano dai droni liberati');
 a.news.forEach(t=>style(t));
});
test('incursione dal vivo con la chiave: i droni liberati non colpiscono e restano ad aiutare il sistema',()=>{
 const w=world(5,17),raid={id:1},done=[];w.run(30);w.E.threats.onRaid=ev=>done.push(ev);
 const ev=w.E.threats.spawn('incursione',{n:24,raid,freed:9});assert.equal(ev.freed,9);assert.equal(ev.frees.length,9);
 for(;w.clock.t<=Math.ceil(ev.tEnd);w.clock.t++)w.E.update(w.clock.t);
 assert.equal(done.length,1);assert.equal(done[0].freed,9);assert.equal(ev.hits,ev.n-ev.freed-ev.killed);assert.ok(ev.killed<=ev.n-ev.freed);
 assert.equal(w.E.helpers,9);
 assert.equal(w.E.threats.spawn('incursione',{n:4,raid:{id:2},freed:9}).freed,4);
});
test('scena e mappa: i droni liberati volano nel sistema, il fronte apre il Rapporto e la scheda resta nei margini',()=>{
 const made=new Set(),sets=new Map();
 const R={w:1600,h:1000,makeStars(){},makeMesh(id){made.add(id);},deleteMesh(){},drawMesh(){},makeInstances(key,mesh,data){sets.set(key,{mesh,n:data.length/8});},updateInstances(key,data){sets.get(key).n=data.length/8;},deleteInstances(key){sets.delete(key);},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,W=new World(R,{},biomes);W.cameraSpace='system';W.travelling=false;W.fov=1.2;W.eye=[0,150,30];W.vp=mul(perspective(1.2,1.6,.012,600),lookAt(W.eye,[0,0,0]));
 const sys={...systemArchitecture(5),id:5},s={scene:'system',time:3};
 W.frontier=new Frontier(7,3);W.frontier.freed.set(5,12);W.projections=[];W.drawStations(s,5,sys);
 assert.equal(W.craft.life.helpers,12);s.time=4;W.projections=[];W.drawStations(s,5,sys);
 assert.ok(made.has('free-drone'));assert.ok(sets.get('instances-free')?.n>=1,'droni liberati non disegnati');
 for(const [w,h] of [[1280,900],[390,844]]){
  const f=fixture(w,h);f.world.frontier=run(7919);f.draw();
  const b=f.U.buttons.find(x=>x.id==='atlas-rapporto');assert.ok(b,'pulsante del Rapporto assente '+w);assert.ok(b.label.startsWith('Apri il Rapporto'));
  f.click('atlas-rapporto');assert.equal(f.A.sheet,'rapporto');f.draw();assert.deepEqual(layoutErrors(f),[],`${w}x${h}`);assert.ok(f.R.uiData.every(Number.isFinite));
  assert.ok(f.A.semanticText().includes('Rapporto sullo Sciame della Frontiera. Prossima incursione fra circa'));
 }
});
