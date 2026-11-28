import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetSurface } from '../src/worlds/surface.js';
import { siteList, clearingOf } from '../src/worlds/sites.js';
import { rareList } from '../src/worlds/wonders.js';
import { LANDER, LANDER_METRES, LENGTH, LEG, RAMP, DROP, DESCENT, ASCENT, RAMP_SECONDS, BOARD, PAD_R, PAD_BLEND, HOP_CLIMB, landerMeshes, landerLegs, feetOf, toWorld, landerPose, landingSpot, padOf, padRelief, joinRelief, prepareZone, padMesh, landerState, cruiseSeconds, cruiseAt, descentSpeed, landerBlocks, landerMatrix, landerStory } from '../src/worlds/lander.js';
import { CATALOG } from '../src/craft/catalog.js';
import { EDGE, METRE } from '../src/worlds/explorer.js';
import { CORE } from '../src/worlds/field.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { transform } from '../src/renderer.js';
import { cleanExplore } from '../src/store.js';
const { world, buildCost } = await import('../scripts/prestazioni-mondi.mjs');
// The ship of the explorer: free landing, descent and take-off (1.75.0).
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const G=9.80665,read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const valid=(m,name)=>{assert.equal(m.stride,16,name);assert.ok(m.v.length%16===0&&m.i.length%3===0&&m.i.length>0,name);assert.ok(m.v.every(Number.isFinite),name);const n=m.v.length/16;assert.ok(m.i.every(k=>k<n),name);};
const box=m=>{const lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9];for(let k=0;k<m.v.length;k+=16)for(let a=0;a<3;a++){lo[a]=Math.min(lo[a],m.v[k+a]);hi[a]=Math.max(hi[a],m.v[k+a]);}return [lo,hi];};

test('nave: la navetta del catalogo alla sua lunghezza, con gambe, rampa e getti',()=>{
 assert.equal(LANDER.id,'s06-6');assert.equal(LANDER.type,'navetta');assert.ok(CATALOG.includes(LANDER));
 assert.equal(LANDER_METRES,50);assert.ok(Math.abs(LENGTH-50*METRE)<1e-12);
 const M=landerMeshes();assert.equal(landerMeshes(),M);
 M.hulls.forEach((m,l)=>valid(m,'scafo '+l));assert.ok(M.hulls[1].i.length<M.hulls[0].i.length);
 // The hull lies along z, 50 m long, centred, with its keel LEG units over the plane of the feet.
 const [lo,hi]=box(M.hulls[0]);assert.ok(Math.abs(hi[2]-lo[2]-LENGTH)<1e-3&&Math.abs(hi[2]+lo[2])<1e-3,JSON.stringify([lo,hi]));assert.ok(Math.abs(lo[1]-LEG)<.3,lo[1]);
 assert.ok(M.half>4&&M.half<16&&M.height>4&&M.height<20,M.half+' '+M.height);
 // Legs hang from the underside, on both sides, at bow and stern; the hinge of the ramp is under the hull.
 assert.equal(M.tops.length,4);for(const t of M.tops){assert.ok(t[1]>LEG&&t[1]<LEG+2.6,t);assert.ok(Math.abs(Math.abs(t[0])-M.legX)<1e-9&&M.legX>=2,t);}
 assert.ok(M.hinge[1]>LEG-.2&&M.hinge[1]<LEG+1.5&&M.hinge[2]<0&&M.hinge[2]-RAMP>-LENGTH/2,M.hinge);
 for(const [m,name] of [[M.ramp,'rampa'],[M.plume,'getti'],[M.flame,'fiamme'],[padMesh(),'piazzola']])valid(m,name);
 const [rl,rh]=box(M.ramp);assert.ok(rl[2]>=-RAMP-.2&&rh[2]<=.2&&rh[1]<1.2,'rampa');
 // Each foot reaches the ground at its own depth, at most DROP under the others.
 const legs=landerLegs([0,.5,1.2,DROP+3]);valid(legs,'gambe');assert.equal(landerLegs([0,.5,1.2,DROP+3]),legs);
 const [ll]=box(legs);assert.ok(Math.abs(ll[1]+DROP)<1e-6,ll[1]);assert.ok(Math.abs(box(landerLegs())[0][1])<1e-6);
 const f=feetOf(10,20,.7);assert.equal(f.length,4);
 f.forEach(([x,z],k)=>{const t=M.tops[k],[tx,tz]=toWorld(10,20,.7,t[0],t[2]);assert.ok(Math.hypot(x-tx,z-tz)>1&&Math.hypot(x-tx,z-tz)<3);});
 // The frame of the ship turns as transform(): +z towards (sin h, cos h).
 const m=landerMatrix(3,4,5,.9),t=transform(3,4,5,1,.9);for(let k=0;k<16;k++)assert.ok(Math.abs(m[k]-t[k])<1e-6,k);
 const [wx,wz]=toWorld(0,0,.9,0,1);assert.ok(Math.abs(wx-Math.sin(.9))<1e-12&&Math.abs(wz-Math.cos(.9))<1e-12);
});

test('nave: discesa con frenata uniforme, decollo con spinta doppia del peso, volo senza salti',()=>{
 const H=DESCENT.metres*METRE,T=DESCENT.seconds;
 for(const g of [.38,1,1.6]){
  const at=t=>landerState({phase:'descent',t0:0},t*1000,g),gu=g*G*METRE,a=2*H/(T*T);
  assert.ok(Math.abs(at(0).height-H)<1e-9&&Math.abs(at(0).speed+2*H/T)<1e-9);assert.equal(at(T).height,0);assert.equal(at(T).speed,0);
  // h(1 − τ)²: the speed falls linearly and the deceleration is a = 2h/T²; the thrust is (a + g)/g weights.
  for(const t of [1,4,7.5]){const d=(at(t+1e-4).height-at(t-1e-4).height)/2e-4;assert.ok(Math.abs(d-at(t).speed)<1e-6);assert.ok(Math.abs(at(t).thrust-(a+gu)/gu)<1e-9);}
  assert.ok(at(2).legs===0&&at(T*.9).legs===1&&at(T).ramp===0&&at(T+RAMP_SECONDS).ramp===1&&at(T+RAMP_SECONDS).done&&!at(T+.5).done);
  assert.ok(at(T-.05).dust>.9&&at(1).dust===0);
  const up=t=>landerState({phase:'ascent',t0:0,then:'orbit'},t*1000,g),c=ASCENT.close;
  assert.ok(up(c/2).height===0&&up(c/2).ramp>0&&up(c).ramp===0);
  // Net force equal to the weight: the ship climbs with acceleration g.
  for(const t of [2,5]){assert.ok(Math.abs(up(c+t).height-.5*gu*t*t)<1e-9);assert.ok(Math.abs(up(c+t).speed-gu*t)<1e-9);assert.equal(up(c+t).thrust,ASCENT.thrust);}
  assert.ok(up(c+ASCENT.seconds).done&&!up(c+ASCENT.seconds-.1).done);
  assert.ok(landerState({phase:'ascent',t0:0,then:'hop'},(c+HOP_CLIMB)*1000,g).done);
 }
 assert.deepEqual(landerState({phase:'parked',t0:0},5000,1),{height:0,speed:0,legs:1,ramp:1,thrust:0,dust:0,done:false});
 // The flight leaves with the speed of the climb and arrives with the speed of the descent.
 const C={from:[0,30,0],to:[400,200,-300],v0:20,v1:-descentSpeed(),seconds:cruiseSeconds(500)};
 assert.ok(Math.abs(C.seconds-(4+500/260))<1e-12);assert.ok(Math.abs(descentSpeed()-2*H/T)<1e-12);
 assert.deepEqual(cruiseAt(C,0),C.from);for(let q=0;q<3;q++)assert.ok(Math.abs(cruiseAt(C,1)[q]-C.to[q])<1e-9);
 const e=1e-5,vy=u=>(cruiseAt(C,u+e)[1]-cruiseAt(C,u-e)[1])/(2*e)/C.seconds;
 assert.ok(Math.abs(vy(e)-C.v0)<.01&&Math.abs(vy(1-e)-C.v1)<.01,vy(e)+' '+vy(1-e));
 const f=1e-6,vx=u=>(cruiseAt(C,u+f)[0]-cruiseAt(C,u-f)[0])/(2*f);assert.ok(Math.abs(vx(f))<.01&&Math.abs(vx(1-f))<.01);
});

test('nave: piazzola della base, rilievo e punti di atterraggio',()=>{
 let pads=0;
 for(let i=0;i<125;i+=3){
  const raw=planetSurface(i),sites=siteList(raw),rares=rareList(raw,sites),s=prepareZone(planetSurface(i));
  // Sites and rare places do not move: the pad is placed after them.
  assert.deepEqual(JSON.parse(JSON.stringify(s.sites)),JSON.parse(JSON.stringify(sites)));assert.deepEqual(JSON.parse(JSON.stringify(s.rares)),JSON.parse(JSON.stringify(rares)));
  assert.equal(prepareZone(s),s);
  const p=s.pad;assert.ok(p,'piazzola '+i);pads++;
  // Outside the square of the stations, inside the zone, on dry ground, level within PAD_R, clear of everything.
  assert.ok(Math.max(Math.abs(p.x),Math.abs(p.z))>=CORE/2+PAD_R+PAD_BLEND&&Math.abs(p.x)<EDGE-PAD_R&&Math.abs(p.z)<EDGE-PAD_R,i+' '+JSON.stringify(p));
  if(s.seaY!==null)assert.ok(p.y>=s.seaY+1.2-1e-9,i);
  for(let k=0;k<24;k++){const a=k*Math.PI/12,d=(k%3+1)/3*PAD_R;assert.ok(Math.abs(s.heightAt(p.x+Math.cos(a)*d,p.z+Math.sin(a)*d)-p.y)<1e-6,i+' '+k);}
  assert.ok(!clearingOf([...sites,...rares])(p.x,p.z,PAD_R+PAD_BLEND));for(const q of s.places)assert.ok(Math.hypot(q.position[0]-p.x,q.position[2]-p.z)>=PAD_R+PAD_BLEND+10);
  assert.ok(s.siteClear(p.x,p.z)&&s.siteClear(p.x+PAD_R,p.z));
  // The ship lands at its middle, with the ramp towards the base.
  const h=Math.atan2(p.x-14,p.z-28),P=landingSpot(s,p.x,p.z,h);assert.ok(P&&P.ok&&P.x===p.x&&P.z===p.z,i);
  assert.ok(P.drop.every(d=>Math.abs(d)<1e-6)&&Math.abs(P.y-p.y)<1e-6,i);assert.ok(P.ramp>.16&&P.ramp<1.05,i);
  assert.ok(Math.abs(P.end[1]-s.heightAt(P.end[0],P.end[2]))<1e-9);
  // Landing spots elsewhere in the zone: feet within DROP, dry, clear of stations and sites, inside the zone.
  for(const [x,z] of [[700,-650],[-900,400],[300,900]]){const Q=landingSpot(s,x,z,.4);if(!Q)continue;
   assert.ok(Q.ok&&Math.hypot(Q.x-x,Q.z-z)<=160+1e-6);assert.ok(Math.max(...Q.drop)<=DROP+1e-9&&Math.min(...Q.drop)>=0);
   assert.ok(Math.abs(Q.y-Math.max(...feetOf(Q.x,Q.z,Q.h).map(([fx,fz])=>s.heightAt(fx,fz))))<1e-9);
   if(s.seaY!==null)for(const [fx,fz] of feetOf(Q.x,Q.z,Q.h))assert.ok(s.heightAt(fx,fz)>=s.seaY+.3);
   assert.ok(s.stations.every(st=>Math.hypot(st.position[0]-Q.x,st.position[2]-Q.z)>=30));assert.ok(!s.siteClear(Q.x,Q.z,1)||Math.hypot(Q.x-p.x,Q.z-p.z)<PAD_R);
   assert.ok(Math.abs(Q.x)<EDGE&&Math.abs(Q.z)<EDGE);}
 }
 assert.equal(pads,42);
 // Relief: the pad is level inside PAD_R and joins the terrain at PAD_R + PAD_BLEND; reliefs add up in order.
 const f=padRelief({x:0,z:0,y:5});assert.equal(f(3,4,9),-4);assert.equal(f(PAD_R+PAD_BLEND,0,9),0);assert.ok(f(PAD_R+PAD_BLEND/2,0,9)<0&&f(PAD_R+PAD_BLEND/2,0,9)>-4);
 const j=joinRelief((x,z,y)=>1,(x,z,y)=>y*2);assert.equal(j(0,0,3),1+8);assert.equal(joinRelief(null,f),f);
 // Over the sea there is no pose; without dry ground there is no pad.
 const s=prepareZone(planetSurface(1));if(s.seaY!==null){let wet=null;for(let x=-1200;x<=1200&&!wet;x+=40)for(let z=-1200;z<=1200&&!wet;z+=40)if(s.heightAt(x,z)<s.seaY-8)wet=[x,z];if(wet)assert.equal(landerPose(s,wet[0],wet[1],0).ok,false);}
 assert.equal(padOf({seaY:null,heightAt:()=>0,places:[],clear:null},()=>true),null);
});

test('nave: scheda con la fisica, diario e salvataggio',()=>{
 const P=planetPhysics();
 for(const i of [0,7,38,77,124]){const t=landerStory(i,P[i].gravity);assert.equal(t.length,5);
  for(const x of t){assert.ok(x.length>40&&/[.]$/.test(x),x);for(const r of STYLE)assert.ok(!r.test(x),x+' '+r);assert.ok(!/undefined|NaN|Infinity/.test(x),x);}
  assert.ok(t[0].startsWith(LANDER.name+', lunga 50 m'));
  assert.ok(t[1].includes((P[i].escape/Math.SQRT2).toFixed(1).replace('.',',')+' km/s'),t[1]);
  assert.ok(t[2].includes(P[i].pressure>=.1?'L’atmosfera':'Luna'),t[2]);
  const g=P[i].gravity*G,a=2*670/100;assert.ok(t[3].includes('13,4 m/s²')&&t[3].includes(((a+g)/g).toFixed(2).replace('.',',')+' volte il peso'),t[3]);
  assert.ok(t[4].includes(Math.round(.5*g*64)+' m'),t[4]);}
 assert.deepEqual(cleanExplore({3:{s:[],l:[],t:4},4:{s:[],l:[],t:-1},5:{s:[],l:[],t:1.5}}),{3:{s:[],l:[],t:4}});
});

test('nave nel mondo: modelli, gambe sul terreno, ostacoli, camera dei voli e app',()=>{
 const ctx=world('high'),i=7;buildCost(ctx,i);const {R,w}=ctx,s=w.surface;
 assert.ok(s.pad&&typeof s.siteClear==='function');for(const id of ['lander-hull-0','lander-hull-1','lander-ramp','lander-plume','lander-flame','lander-pad'])assert.ok(R.meshes.has(id),id);
 const P=landingSpot(s,s.pad.x,s.pad.z,1),st={scene:'surface',selected:i,time:30,yaw:0,pitch:.45,distance:22,paused:false,lastFrameMs:16};
 const pose=(o={})=>({planet:i,x:P.x,y:P.y,z:P.z,h:P.h,legs:1,ramp:P.ramp,open:1,thrust:0,dust:0,drop:P.drop,dustAt:[P.x,P.y,P.z],height:0,...o});
 const drawn=[],dm=R.drawMesh.bind(R);R.drawMesh=(id,vp,m,o={})=>{drawn.push(o.instances==='lander-dust'?'lander-dust':id);return dm(id,vp,m,o);};
 const frame=o=>{st.landerPose=o;drawn.length=0;R.begin();w.draw('surface',st,{modules:[]});return drawn.filter(id=>/^lander-/.test(id)).sort();};
 assert.deepEqual(frame(pose()),['lander-hull-0','lander-legs','lander-pad','lander-ramp']);
 assert.ok(R.meshes.has('lander-legs'));assert.equal(w.legKey,P.drop.map(v=>v.toFixed(2)).join(','));
 // The legs stop the explorer; the end of the ramp stays free; the ship can be picked and has a label.
 const env=w.explorerEnv(),[bx,bz]=landerBlocks(P)[0];assert.ok(env.blocked(bx,bz));assert.ok(!env.blocked(P.end[0],P.end[2]));
 assert.deepEqual(w.nearest([P.x,P.y,P.z]),{type:'ship',index:0});assert.ok(w.projections.some(p=>p.type==='ship'&&p.name===LANDER.name));
 // In flight: the plumes, the hot cores and the dust are three more draws, the legs fold away.
 assert.deepEqual(frame(pose({y:P.y+5,height:5,legs:.9,open:0,thrust:1.5,dust:.8})),['lander-dust','lander-flame','lander-hull-0','lander-legs','lander-pad','lander-plume','lander-ramp']);assert.ok(R.instanceSets.has('lander-dust'));
 assert.deepEqual(frame(pose({y:P.y+200,height:200,legs:0,open:0,thrust:1.05,dust:0})),['lander-flame','lander-hull-0','lander-pad','lander-plume','lander-ramp']);assert.equal(w.shipBlocks,null);
 // Another planet's ship is not drawn; far from the camera the hull has its light model.
 assert.deepEqual(frame(pose({planet:i+1})),['lander-pad']);
 drawn.length=0;st.landerPose=pose();w.eye=[P.x+900,P.y+40,P.z];w.drawLander(st,[0,1,0],[1,1,1]);assert.ok(drawn.includes('lander-hull-1')&&!drawn.includes('lander-hull-0')&&!drawn.includes('lander-ramp'),drawn.join());
 // The camera of the flights replaces the others.
 st.landerView={key:'volo',eye:[P.x+80,P.y+60,P.z],target:[P.x,P.y+50,P.z],fov:.74};const c=w.desiredCamera('surface',st);assert.deepEqual(c.target,st.landerView.target);assert.equal(c.fov,.74);assert.ok(c.eye[1]>=s.heightAt(c.eye[0],c.eye[2])+2);
 const app=read('src/app.js');
 for(const t of ['function landerTick(','function landerDone(','function leaveShip(','function board(','function shipAction(','function zoneMapTick(','function zoneTap(','function landHere(','function zoneMapUI(','function flightHUD(',"U.button('zone-map'","U.button('explore-ship'","'ATTERRA QUI'","c === 'n'","c === 'm'",'Atterraggi della ',"['place','settlement','site','rare','find','ship'].includes(hit?.type)","exploreTick(); landerTick();","type: 'ship', index: 0"])assert.ok(app.includes(t),t);
 for(const t of ['Tocca il punto dove vuoi atterrare.','Nessun punto adatto entro 300 m: acqua, pendii troppo ripidi o costruzioni. Scegli un altro punto.','La nave sta ancora atterrando.','Frenata uniforme: la spinta supera il peso finché la nave si ferma a terra.'])for(const r of STYLE)assert.ok(!r.test(t),t);
 assert.ok(BOARD>10&&BOARD<40);
});
