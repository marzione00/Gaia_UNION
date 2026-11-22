import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh, perspective, lookAt, mul } from '../src/renderer.js';
import { World, displayRadius } from '../src/scene/world.js';
import { systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { SERVICE_KINDS, SERVICE_NAMES, SERVICE_ABOUT, SERVICE_SIZE, SERVICE_BUDGET, planService, servicePose, serviceMesh, serviceLanes } from '../src/craft/servizio.js';
// Service traffic of the systems (1.57.0): shuttles, barges, tugs, miners, tankers, escorts and maintenance
// pods drawn as 3D models, more than a hundred craft for each system at high quality.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max=60)=>{assert.equal(typeof t,'string');assert.ok(t.length>0&&t.length<=max,'riga di '+t.length+' caratteri: '+t);for(const r of STYLE)assert.ok(!r.test(t),'costruzione vietata: '+t);for(const c of t)assert.ok(c===' '||glyphs[c],'glifo mancante «'+c+'» in '+t);};
const rock=sphereMesh(6,4);
/** Stations of a system as the scene builds them, with their positions at `time`. */
function scene(id){
 const sys={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(sys,rock);sys.belt={inner:b.inner,outer:b.outer};}
 const entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id),...systemDefence(id),...systemDefenceShips(id)],P=placeStations(sys,entries,displayRadius);
 const at=(k,t)=>({position:stationPosition(P[k],t,s=>bodyAtTime(sys.bodies.find(b=>b.slot===s),t).position),radius:P[k].size});
 const stations=P.map(p=>({type:p.entry.type==='porta'?'porta':p.entry.works||p.entry.type,level:1}));
 return {sys,P,at,stations,ships:entries.filter(e=>e.kind==='nave').length,names:P.map(p=>p.entry.name),plan:(quality,levels)=>planService({time:0,stations:levels?stations.map(s=>({...s,level:levels})):stations,points:P.map((_,k)=>at(k,0).position),belt:sys.belt?{inner:sys.belt.inner,outer:sys.belt.outer}:null,quality})};
}
const drawn=plan=>plan.length+plan.filter(v=>v.role==='traino').length;
test('piano: oltre cento mezzi per sistema in alta qualità con le navi, meno nelle qualità inferiori, ruoli secondo il sistema',()=>{
 assert.deepEqual(Object.keys(SERVICE_NAMES),SERVICE_KINDS);assert.deepEqual(Object.keys(SERVICE_ABOUT),SERVICE_KINDS);assert.deepEqual(Object.keys(SERVICE_SIZE),SERVICE_KINDS);
 assert.ok(SERVICE_BUDGET.high>SERVICE_BUDGET.balanced&&SERVICE_BUDGET.balanced>SERVICE_BUDGET.low);
 const kinds=new Set();let least=Infinity,most=0,lowest=Infinity;
 for(let id=0;id<30;id++){
  const w=scene(id),high=w.plan('high'),balanced=w.plan('balanced'),low=w.plan('low');
  assert.deepEqual(high.map(v=>v.id),high.map((_,k)=>k),'identificativi');
  assert.ok(drawn(high)>drawn(balanced)&&drawn(balanced)>drawn(low),'sistema '+id);
  assert.ok(drawn(high)+w.ships>100,'sistema '+id+': '+(drawn(high)+w.ships));assert.ok(drawn(low)>=30&&drawn(low)<=drawn(high)*.5,'sistema '+id+' bassa: '+drawn(low));
  least=Math.min(least,drawn(high)+w.ships);most=Math.max(most,drawn(high)+w.ships);lowest=Math.min(lowest,drawn(low));
  for(const v of high)kinds.add(v.kind);
  w.stations.forEach((_,k)=>assert.ok(high.filter(v=>v.role==='ronda'&&v.at===k).length>=2,'stazione senza manutenzione'));
  const mines=w.stations.filter(s=>['miniera','ghiaccio'].includes(s.type)).length;
  if(w.sys.belt){assert.equal(high.filter(v=>v.role==='fascia').length,16);assert.equal(high.filter(v=>v.role==='miniera').length,0);}
  else{assert.equal(high.filter(v=>v.role==='fascia').length,0);assert.equal(high.filter(v=>v.role==='miniera').length,3*mines);}
  assert.equal(high.filter(v=>v.role==='scorta').length%2,0);assert.ok(low.filter(v=>v.role==='scorta').length>=2);
  assert.ok(high.filter(v=>v.role==='rifornimento').length<=6);assert.equal(new Set(high.filter(v=>v.role==='rifornimento').map(v=>v.park)).size,high.filter(v=>v.role==='rifornimento').length,'due cisterne alla stessa stazione');
  // Every station is on a lane or on a regular line, so the traffic reaches it.
  w.stations.forEach((_,k)=>assert.ok(high.some(v=>v.role==='spola'&&(v.a===k||v.b===k)),'stazione isolata: '+w.names[k]));
  assert.ok(drawn(w.plan('high',3))>drawn(high),'la crescita delle stazioni non aggiunge traffico');
 }
 for(const k of SERVICE_KINDS)if(k!=='container')assert.ok(kinds.has(k),'mezzo mai usato: '+k);
 assert.ok(least>100&&most<260,least+' '+most);assert.ok(lowest>=30);
 // Lanes pair each station with its nearest neighbour once.
 const lanes=serviceLanes([[0,0,0],[1,0,0],[5,0,0],[6.5,0,0]]);assert.deepEqual(lanes,[[0,1],[2,3]]);
});
test('moto: posizioni continue nel tempo, velocità limitate, rimorchi al cantiere quando cambia la meta, righe per il riquadro',()=>{
 for(const id of [2,13,26]){
  const w=scene(id),plan=w.plan('high'),gate=w.stations.findIndex(s=>s.type==='porta');
  // Two ships docked at the gate in turn and a convoy crossing the system.
  const dockAt=t=>w.at(gate,t).position.map((x,i)=>x+[.4,0,.1][i]);
  const ctx=t=>({station:k=>w.at(k,t),stationAt:w.at,names:w.names,docked:[{id:3,at:gate,position:dockAt(t),forward:[1,0,0],name:'Chiatta Alfa',t0:10,t1:40},{id:5,at:gate,position:dockAt(t),forward:[1,0,0],name:'Chiatta Beta',t0:50,t1:90}].filter(d=>t>=d.t0&&t<=d.t1),
   visitors:t>=20&&t<=120?[{id:1,position:[-20+t*.3,.5,4],forward:[1,0,0],name:'Convoglio da Alfa',docked:false}]:[],beltSpin:.0008});
  const prev=new Map(),roles=new Map();let tows=0,beams=0,links=0,scans=0;
  for(let t=0;t<=300;t+=.25){
   const c=ctx(t);
   for(const v of plan){
    const p=servicePose(v,t,c);
    assert.equal(p.size,SERVICE_SIZE[v.kind]);assert.ok(Math.abs(Math.hypot(...p.forward)-1)<1e-6,v.role+' direzione');
    if(!p.visible){prev.delete(v.id);continue;}
    assert.equal(p.lines.length,2);
    const q=prev.get(v.id);
    // Escorts appear with their convoy; everything else moves at most 3 units per second.
    if(q&&!(v.role==='scorta'&&(t===20||t===120.25)))assert.ok(Math.hypot(...p.position.map((x,i)=>x-q[i]))<=.75,`${v.role} salta di ${Math.hypot(...p.position.map((x,i)=>x-q[i])).toFixed(2)} a t=${t}`);
    prev.set(v.id,p.position);
    if(p.tow){tows++;assert.ok(Math.hypot(...p.tow.position.map((x,i)=>x-p.position[i]))<.2);}
    if(p.beam)beams++;if(p.link)links++;if(p.scan)scans++;
    if(t%30===0){roles.set(v.role,(roles.get(v.role)||new Set()));for(const line of p.lines){style(line);roles.get(v.role).add(line);}}
   }
  }
  assert.ok(tows>0&&links>0&&scans>0,[tows,links,scans].join(' '));assert.equal(beams>0,plan.some(v=>v.role==='fascia'||v.role==='miniera'),'raggi di estrazione');
  assert.ok([...roles.get('spola')].some(l=>l.startsWith('Linea regolare, arrivo fra')));assert.ok([...roles.get('attesa')].some(l=>l.startsWith('In coda a ')));
  assert.ok([...roles.get('rifornimento')].some(l=>l.startsWith('Rifornisce Chiatta')||l.startsWith('In attesa presso')));
 }
 // A tanker reaches its ship beside it and goes back to its place before the ship leaves.
 const w=scene(2),gate=w.stations.findIndex(s=>s.type==='porta'),v=w.plan('high').find(x=>x.role==='rifornimento'&&x.park===gate);
 const ship={id:7,at:gate,position:[w.at(gate,30).position[0]+.4,0,0],forward:[1,0,0],name:'Nave Gamma',t0:20,t1:60},ctx=t=>({station:k=>w.at(k,30),names:w.names,docked:[ship],visitors:[]});
 const before=servicePose(v,19,ctx(19)),mid=servicePose(v,40,ctx(40)),after=servicePose(v,61,ctx(61));
 assert.ok(mid.link&&mid.lines[0]==='Rifornisce Nave Gamma');assert.ok(!before.link&&!after.link);assert.ok(Math.hypot(...before.position.map((x,i)=>x-after.position[i]))<1e-9);
 // Escorts fly beside their convoy and wait beside it at the dock.
 const e=w.plan('high').find(x=>x.role==='scorta'&&x.n===1),flying=servicePose(e,0,{station:k=>w.at(k,0),names:w.names,docked:[],visitors:[{id:5,position:[3,0,3],forward:[0,0,1],name:'Convoglio da Beta',docked:false}]});
 assert.ok(flying.visible&&Math.hypot(...flying.position.map((x,i)=>x-[3,0,3][i]))<.3);assert.equal(flying.lines[0],'Scorta il convoglio da Beta');
 assert.equal(servicePose(e,0,{station:k=>w.at(k,0),names:w.names,docked:[],visitors:[{id:5,position:[3,0,3],forward:[0,0,1],name:'Convoglio da Beta',docked:true}]}).lines[1],'In attesa accanto al convoglio attraccato');
 assert.equal(servicePose(e,0,{station:k=>w.at(k,0),names:w.names,docked:[],visitors:[{id:4,position:[3,0,3],forward:[0,0,1],name:'Convoglio da Beta',docked:false}]}).visible,false);
});
test('modelli: raggio unitario, prua lungo +z, motori a poppa, pochi triangoli',()=>{
 for(const kind of SERVICE_KINDS){
  const m=serviceMesh(kind),v=m.v;let r=0,z=0,n=0;
  for(let i=0;i<v.length;i+=16){r=Math.max(r,Math.hypot(v[i],v[i+1],v[i+2]));if(v[i+14]>=3){z+=v[i+2];n++;}}
  assert.ok(Math.abs(r-1)<1e-5,kind+' raggio '+r);assert.ok(m.i.length/3<=800,kind+' triangoli '+m.i.length/3);
  if(kind!=='container'){assert.ok(n>0,kind+' senza motore');assert.ok(z/n<-.3,kind+' motore a prua');}
 }
 assert.throws(()=>serviceMesh('nessuno'));
});
test('scena: un disegno per tipo di mezzo, mezzi indicabili con il loro riquadro, piano rifatto con la qualità e con il sistema',()=>{
 const made=new Set(),sets=new Map();
 const R={w:1600,h:1000,makeStars(){},makeMesh(id){made.add(id);},deleteMesh(){},drawMesh(){},makeInstances(key,mesh,data){assert.ok(made.has(mesh)||mesh==='lowSphere',mesh);sets.set(key,{mesh,n:data.length/8});},updateInstances(key,data){sets.get(key).n=data.length/8;},deleteInstances(key){sets.delete(key);},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);w.cameraSpace='system';w.travelling=false;w.fov=1.2;w.eye=[0,40,70];w.vp=mul(perspective(1.2,1.6,.012,600),lookAt(w.eye,[0,0,0]));
 const s={scene:'system',time:30},sys={...systemArchitecture(13),id:13};
 w.projections=[];w.drawStations(s,13,sys);
 for(const k of SERVICE_KINDS)assert.ok(made.has('service-'+k),'modello mancante: '+k);
 const count=()=>[...sets].filter(([key])=>key.startsWith('instances-service-')).reduce((a,[,v])=>a+v.n,0);
 const high=w.craftStats.service;assert.ok(high>=90,'mezzi in vista: '+high);assert.equal(count(),high);
 assert.ok(high+w.craft.life.ships.length>100,'mezzi con le navi: '+(high+w.craft.life.ships.length));
 assert.ok(sets.has('instances-service-minatore')&&sets.has('instances-service-manutenzione')&&sets.has('instances-service-navetta'));
 const P=w.projections.filter(p=>p.entry?.kind==='servizio');assert.ok(P.length>=60,'mezzi indicabili: '+P.length);
 for(const p of P){assert.equal(p.lines.length,2);p.lines.forEach(t=>style(t));style(p.entry.name,40);assert.ok(['civile','difesa'].includes(p.entry.style));assert.ok(p.entry.about.length>40);assert.ok(p.index>=20000);}
 assert.ok(P.some(p=>p.tail),'nessuna scia');
 const indices=new Set(w.projections.map(p=>p.type+':'+p.index));assert.equal(indices.size,w.projections.length,'indici ripetuti');
 // Lower quality: a new, smaller plan with the same calls.
 R.sceneQuality='low';s.time=31;w.projections=[];w.drawStations(s,13,sys);
 assert.ok(w.craftStats.service<high*.5,'qualità bassa: '+w.craftStats.service);assert.equal(count(),w.craftStats.service);
 // Another system: the instances of the first are released and the plan follows the new stations.
 R.sceneQuality='high';const other={...systemArchitecture(2),id:2},first=w.craft.service.length;s.time=32;w.projections=[];w.drawStations(s,2,other);
 assert.ok(!w.craft.service.some(v=>v.role==='fascia'),'minatori della fascia in un sistema senza fascia');assert.notEqual(w.craft.service.length,first);
 assert.equal(count(),w.craftStats.service);
});
