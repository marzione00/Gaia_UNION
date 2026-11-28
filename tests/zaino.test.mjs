import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { PACK, packOf, jumpOf, newExplorer, stepExplorer, toggleRover, METRE, G0, JUMP, WALK, RUN, ROVER } from '../src/worlds/explorer.js';
import { travelTimes, minutesText, knownPlaces, placeAt, PLACE_WORDS } from '../src/worlds/travel.js';
import { whatHappens } from '../src/craft/succede.js';
import { planetSurface, planetGenomes } from '../src/worlds/surface.js';
import { prepareZone } from '../src/worlds/lander.js';
import { cleanExplore } from '../src/store.js';
import { jetMeshes } from '../src/scene/world.js';
const { world, buildCost } = await import('../scripts/prestazioni-mondi.mjs');
// The jetpack and the quick travel between the places discovered (1.76.0).
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const flat=(g=1)=>({ground:()=>0,sea:null,blocked:()=>false,gravity:g}),read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const fly=(g,input0,input)=>{const env=flat(g),a=newExplorer(0,0,0,env);let ev=stepExplorer(a,input0,1/60,env),n=1;while(!ev.includes('atterraggio')&&n<9000){ev=stepExplorer(a,input,1/60,env);n++;}return {a,n,env};};

test('zaino: spinta meno peso, poi la salita per inerzia, con la gravità del pianeta',()=>{
 assert.deepEqual({...PACK},{thrust:14,burn:1.2,refill:3});
 for(const g of [.715,1,1.302]){
  const P=packOf(g),G=g*G0,a=PACK.thrust-G,v1=JUMP+a*PACK.burn;
  assert.ok(Math.abs(P.net-a)<1e-12&&Math.abs(P.speed-v1)<1e-12);
  assert.ok(Math.abs(P.height-(JUMP*PACK.burn+a*PACK.burn**2/2+v1*v1/(2*G)))<1e-9);assert.ok(Math.abs(P.earth-packOf(1).height)<1e-9);
  // The pack burning from the take-off reaches exactly that height; the record of the plain jump stays apart.
  const {a:x}=fly(g,{jump:true,boost:true},{boost:true});
  assert.ok(Math.abs(x.packLast-P.height)<1e-6,g+' '+x.packLast+' '+P.height);assert.equal(x.packBest,x.packLast);assert.equal(x.last,0);assert.equal(x.best,0);assert.equal(x.jumps,1);
  // Without the pack the jump is the one of 1.68.0.
  const {a:y}=fly(g,{jump:true},{});assert.ok(Math.abs(y.last-jumpOf(g).height)<1e-9);assert.equal(y.packLast,0);
  assert.ok(P.height>5&&P.height<19,g+' '+P.height);
 }
 // Lower gravity, higher flight: 18,1 m at 0,715 g, 10,1 m on the Earth, 5,4 m at 1,302 g.
 assert.equal(packOf(.715).height.toFixed(1),'18.1');assert.equal(packOf(1).height.toFixed(1),'10.1');assert.equal(packOf(1.302).height.toFixed(1),'5.4');
 // On every planet the thrust beats the weight.
 const gs=planetGenomes().map(x=>x.gravity);assert.equal(gs.length,125);for(const g of gs)assert.ok(packOf(g).net>0,g);
 // Lit after the top, the pack first brakes the fall and then lifts the explorer again: a longer, higher flight.
 const env=flat(1),a=newExplorer(0,0,0,env);stepExplorer(a,{jump:true},1/60,env);let n=1,ev=[];while(!ev.includes('atterraggio')&&n<9000){ev=stepExplorer(a,{boost:a.vy<0},1/60,env);n++;}
 assert.ok(n/60>jumpOf(1).time+.3,n/60);assert.ok(a.packLast>jumpOf(1).height&&a.last===0);
});

test('zaino: carica, consumo, ricarica a terra e niente spinta dal suolo o dal rover',()=>{
 const env=flat(1),a=newExplorer(0,0,0,env);assert.equal(a.fuel,PACK.burn);assert.equal(a.boosting,false);
 // On the ground the held jump does nothing more than the jump.
 for(let k=0;k<30;k++)stepExplorer(a,{boost:true},1/60,env);assert.equal(a.fuel,PACK.burn);assert.equal(a.y,0);assert.ok(a.grounded);
 stepExplorer(a,{jump:true,boost:true},1/60,env);assert.ok(a.boosting);assert.ok(Math.abs(a.fuel-(PACK.burn-1/60))<1e-12);
 for(let k=0;k<900&&!a.grounded;k++)stepExplorer(a,{boost:true},1/60,env);assert.ok(a.grounded&&a.fuel<.01);
 // The charge comes back in PACK.refill seconds.
 for(let k=0;k<Math.round(PACK.refill*60);k++)stepExplorer(a,{},1/60,env);assert.ok(Math.abs(a.fuel-PACK.burn)<1e-9);
 const r=newExplorer(0,0,0,env);assert.ok(toggleRover(r,env));stepExplorer(r,{jump:true,boost:true},1/60,env);assert.equal(r.boosting,false);assert.equal(r.fuel,PACK.burn);
 // An older explorer without the field starts with a full pack.
 const o=newExplorer(0,0,0,env);delete o.fuel;stepExplorer(o,{},1/60,env);assert.equal(o.fuel,PACK.burn);
 assert.deepEqual(cleanExplore({3:{p:{w:5,d:0,j:40,n:2,z:1015}},4:{p:{w:5,d:0,j:40,n:2,z:2.5}}}),{3:{s:[],l:[],p:{w:5,d:0,j:40,n:2,z:1015}},4:{s:[],l:[],p:{w:5,d:0,j:40,n:2}}});
});

test('zaino nella scheda «Che cosa succede» del salto',()=>{
 for(const g of [.715,1,1.302]){const J=jumpOf(g),P={...packOf(g),fuel:.5,last:3.25};
  const x=whatHappens({ground:true,kind:'salto',name:'Il salto dell’esploratore',label:'Pianeta',gravity:g,g0:G0,speed:JUMP,earth:J.earth,last:0,jumps:0,pack:P});
  assert.deepEqual(x.rows.slice(4,8).map(r=>r[0]),['Tempo di volo','Zaino a reazione','Salita con lo zaino','Ultimo salto misurato']);
  assert.equal(x.rows[5][1],'14 m/s² per 1,2 s');assert.equal(x.rows[6][1],`${P.height.toFixed(1).replace('.',',')} m, sulla Terra 10,1 m`);assert.equal(x.rows[7][1],'nessuno, premi SALTA · zaino 3,3 m');
  const t=x.concept.text;assert.ok(t.includes(`l'accelerazione netta è ${P.net.toFixed(2).replace('.',',')} m/s²`)&&t.includes(`in tutto ${P.height.toFixed(1).replace('.',',')} m sopra il punto di stacco`),t);
  for(const r of STYLE)assert.ok(!r.test(t),r);}
 // Without the pack the card is the one of 1.68.0.
 const y=whatHappens({ground:true,kind:'salto',name:'S',label:'P',gravity:1,g0:G0,speed:JUMP,earth:jumpOf(1).earth,last:0,jumps:0});assert.ok(!y.rows.some(r=>r[0]==='Zaino a reazione'));
});

test('viaggio rapido: tempi, luoghi scoperti e scelta sulla mappa',()=>{
 const T=travelTimes(1400*METRE);assert.ok(Math.abs(T.metres-1400)<1e-9&&Math.abs(T.walk-1400/WALK/60)<1e-9&&Math.abs(T.run-1400/RUN/60)<1e-9&&Math.abs(T.rover-1400/ROVER.top/60)<1e-9);
 assert.equal(minutesText(.4),'meno di un minuto');assert.equal(minutesText(16.67),'17 min');assert.equal(minutesText(60),'1 h');assert.equal(minutesText(135.2),'2 h 15 min');
 const s=prepareZone(planetSurface(7)),rec={l:[s.places[0].id,s.settlements[0].id],r:[s.sites[1].id],n:[s.rares[0].id],k:[s.sites[2].id,s.rares[1].id]};
 const none=knownPlaces(s,{});assert.deepEqual(none.map(p=>p.kind),['base']);
 const L=knownPlaces(s,rec,{name:'Navetta Raman',x:5,z:6});
 assert.deepEqual(L.map(p=>p.id),['base','nave',s.settlements[0].id,s.places[0].id,s.sites[1].id,s.sites[2].id,s.rares[0].id,s.rares[1].id]);
 const base=L[0],st=s.stations;assert.ok(Math.abs(base.x-st.reduce((a,q)=>a+q.position[0],0)/st.length)<1e-9);
 assert.deepEqual(L.map(p=>p.gap),[8,3,6,4,22,22,Math.min(40,s.rares[0].r*.6),Math.min(40,s.rares[1].r*.6)]);
 for(const p of L){assert.ok(PLACE_WORDS[p.kind],p.kind);assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.z)&&p.name);}
 const toS=(x,z)=>[x/10,z/10];assert.equal(placeAt(L,toS,s.sites[1].x/10+3,s.sites[1].z/10-4),L[4]);assert.equal(placeAt(L,toS,9999,9999),null);
});

test('zaino e viaggio rapido nel mondo e nell’app',()=>{
 const ctx=world('high');buildCost(ctx,7);const {R,w}=ctx,s=w.surface;
 assert.ok(R.meshes.has('jet-flame')&&R.meshes.has('jet-plume'));assert.ok(w.jetAt[0]<-.05&&w.jetAt[1]>.4&&w.jetAt[1]<1,w.jetAt);
 const J=jetMeshes({v:new Float32Array([0,0,0,...new Array(13).fill(0),-.2,.7,0,...new Array(13).fill(0)])});assert.ok(Math.abs(J.at[0]+.165)<1e-6&&Math.abs(J.at[1]-.7)<1e-6);
 const env=w.explorerEnv(),A=newExplorer(2,2,.6,env),st={scene:'surface',selected:7,time:30,yaw:0,pitch:.45,distance:22,explore:true,exploreBlend:1,exploreFocus:[A.x,A.z],avatar:A,chaseOrbit:0,paused:false,lastFrameMs:16};
 const drawn=[],dm=R.drawMesh.bind(R);R.drawMesh=(id,...r)=>{drawn.push(id);return dm(id,...r);};
 const frame=()=>{drawn.length=0;R.begin();w.draw('surface',st,{modules:[]});return drawn.filter(id=>/^jet-/.test(id));};
 assert.deepEqual(frame(),[]);A.boosting=true;assert.deepEqual(frame(),['jet-flame','jet-plume']);A.mode='rover';assert.deepEqual(frame(),[]);A.mode='piedi';A.aboard=true;assert.deepEqual(frame(),[]);A.aboard=false;
 // High in the air the camera follows the explorer, a unit under it, and backs away a little.
 const g0=s.heightAt(A.x,A.z);A.y=g0+15;const c=w.desiredCamera('surface',st);assert.ok(c.target[1]>=g0+14+1.1-1e-6&&c.target[1]<=g0+15+1.1,c.target[1]-g0);
 const app=read('src/app.js');
 for(const t of ["boost: key(' ') || S.jumpHeld != null","held.add(' ')","S.jumpHeld = e.pointerId","function discover(","discover(site.id)","discover(rare.id)","function quickTravel(","function chooseDest(","function fadeUI(","function padPick(","U.button('zone-travel', 'VIAGGIO RAPIDO'","Luoghi scoperti","con lo zaino a reazione è salito fino a","pack: { ...packOf(g)"])assert.ok(app.includes(t),t);
 for(const t of ['Tocca un luogo scoperto per andarci con un viaggio rapido, o un punto qualsiasi per atterrarci con la nave. Le zone scure sono acqua o terreno troppo ripido per le gambe.','Viaggio rapido: nessun punto libero vicino a '])for(const r of STYLE)assert.ok(!r.test(t),t);
});
