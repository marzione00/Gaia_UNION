import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture } from '../src/scene/systems.js';
import { project } from '../src/renderer.js';
import { World, minorBodies, basisMatrix } from '../src/scene/world.js';
import { displayRadius } from '../src/scene/world.js';
import { systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips } from '../src/craft/catalog.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
import { planetCards } from '../src/worlds/genome.js';
import { distanceMap, systemBelts, systemComets, ringOmega, eccentricAnomaly, cometState, cometAt, streamOf, meteorShowers, showerState, years, visViva, ACTIVATION, V_EARTH } from '../src/scene/comete.js';
import { CONCEPT_UNITS, whatHappens } from '../src/craft/succede.js';
// Comets, meteor streams, showers and belts (1.60.0).
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const catalogue=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url),'utf8')),modules=catalogue.modules||catalogue;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max)=>{assert.equal(typeof t,'string');assert.ok(t.length>0&&t.length<=max,'testo di '+t.length+' caratteri: '+t);for(const r of STYLE)assert.ok(!r.test(t),'costruzione vietata: '+t);for(const c of t)assert.ok(c===' '||glyphs[c],'glifo mancante «'+c+'» in '+t);assert.ok(!/NaN|undefined|Infinity|null/.test(t),t);};
const check=v=>{for(const p of v.pages||[v]){assert.ok(CONCEPT_UNITS[p.concept.unit]);style(p.concept.text,360);for(const [l,x] of p.rows){style(l,30);style(x,52);}}return v;};
const systems=Array.from({length:30},(_,id)=>minorBodies({...systemArchitecture(id),id}));
const near=(a,b,eps)=>Math.abs(a-b)<=eps*Math.max(1,Math.abs(b));
test('mappa delle distanze: passa per i pianeti, si inverte, cresce con la distanza',()=>{
 for(const s of systems){
  for(const b of s.bodies)assert.ok(near(s.map.toScene(b.a),b.orbit,1e-9),s.id+' '+b.slot);
  let prev=0;for(let l=-3;l<=2.5;l+=.05){const a=10**l,r=s.map.toScene(a);assert.ok(r>=prev-1e-12);prev=r;if(r>s.starRadius*1.4)assert.ok(near(s.map.toAU(r),a,1e-9),s.id+' '+a);}
 }
 for(const id of ['physics-08','physics-12','chemistry-11'])assert.equal(modules.find(m=>m.id===id).title,CONCEPT_UNITS[id]);
});
test('cinture: una di ghiaccio in ogni sistema, una di roccia dove c\'è spazio, anelli più lenti verso l\'esterno',()=>{
 let rocky=0;
 for(const s of systems){
  const icy=s.belts.filter(b=>b.kind==='ghiacciata');assert.equal(icy.length,1);assert.ok(near(icy[0].inner,s.outerRadius+1.7,1e-9)&&near(icy[0].outer,s.outerRadius+3.1,1e-9));
  assert.equal(s.belt,s.id%3===1?icy[0]:null,'cintura delle stazioni');
  assert.ok(icy[0].aIn>2.7*Math.sqrt(s.star.luminosity),'cintura di ghiaccio dentro la linea del ghiaccio: '+s.id);
  for(const b of s.belts){
   assert.ok(b.aOut>b.aIn&&b.outer>b.inner);assert.ok(near(s.map.toScene(b.aIn),b.inner,1e-9));
   for(let j=1;j<b.rings.length;j++)assert.ok(b.rings[j].omega<b.rings[j-1].omega,'anelli');
   assert.equal(ringOmega(b,b.inner+1e-9),b.rings[0].omega);assert.equal(ringOmega(b,b.outer-1e-9),b.rings.at(-1).omega);
   if(b.kind==='rocciosa'){rocky++;assert.equal(s.miningBelt,b);const snow=2.7*Math.sqrt(s.star.luminosity);assert.ok(b.aIn<=snow*1.3&&b.aOut>=snow/1.45);
    for(const p of s.bodies)assert.ok(p.a<b.aIn/1.29||p.a>b.aOut*1.29,'pianeta dentro la cintura: '+s.id);}
  }
  if(!s.belts.some(b=>b.kind==='rocciosa'))assert.equal(s.miningBelt,s.belt);
 }
 assert.equal(rocky,16);
 // A station in the belt rides its ring: after one turn of the ring it is back in place.
 const s=systems[1],entries=[...systemCraft(1),...systemExtras(1),...systemShipExtras(1),...systemDefence(1),...systemDefenceShips(1)],P=placeStations(s,entries,displayRadius),inBelt=P.filter(p=>p.kind==='belt');
 assert.ok(inBelt.length>0);for(const p of inBelt){const T=2*Math.PI/p.spin,a=stationPosition(p,0),b=stationPosition(p,T),c=stationPosition(p,T/2);assert.ok(p.spin>0);assert.ok(Math.hypot(a[0]-b[0],a[2]-b[2])<1e-6);assert.ok(Math.hypot(a[0]-c[0],a[2]-c[2])>p.distance);}
});
test('comete: equazione di Keplero, leggi delle orbite, attività vicino alla stella',()=>{
 for(const e of [0,.3,.7,.93,.999])for(let M=0;M<6.28;M+=.37){const E=eccentricAnomaly(M,e);assert.ok(Math.abs(E-e*Math.sin(E)-M)<1e-10,`e=${e} M=${M}`);}
 let comets=0,retro=0,active=0;
 for(const s of systems){
  const C=s.comets;assert.equal(C.length,s.id%3===1?2:1);comets+=C.length;const M=s.star.mass,ract=ACTIVATION*Math.sqrt(s.star.luminosity);
  for(const c of C){
   assert.ok(c.q<ract&&c.Q>c.q*3.9&&near(c.e,(c.Q-c.q)/(c.Q+c.q),1e-12)&&c.period>=900&&c.period<=1500);if(c.inclination>Math.PI/2)retro++;
   // Angular momentum per unit mass, |r × v|, stays the same along the orbit (second law); speed from vis-viva.
   let h0=null,on=0;
   for(let i=0;i<200;i++){
    const st=cometState(c,c.period*i/200,s.map,s.star),h=Math.hypot(st.p[1]*st.velocity[2]-st.p[2]*st.velocity[1],st.p[2]*st.velocity[0]-st.p[0]*st.velocity[2],st.p[0]*st.velocity[1]-st.p[1]*st.velocity[0]);
    h0??=h;assert.ok(near(h,h0,1e-9),'momento angolare');assert.ok(st.r>=c.q*(1-1e-9)&&st.r<=c.Q*(1+1e-9));assert.ok(near(Math.hypot(...st.velocity),visViva(st.r,c.a,M),1e-9));
    assert.ok(near(Math.hypot(...st.position),s.map.toScene(st.r),1e-9));assert.ok(st.out.every((x,k)=>near(x,st.p[k]/st.r,1e-12)),'coda opposta alla stella');
    assert.equal(st.activity>0,st.r<ract);if(st.activity>0)on++;
   }
   if(on)active++;
   // At perihelion and aphelion: speeds of the vis-viva equation, period of the third law.
   assert.ok(near(cometAt(c,0,M).r,c.q,1e-9)&&near(cometAt(c,Math.PI,M).r,c.Q,1e-9));assert.ok(near(years(c.a,M),Math.sqrt(c.a**3/M),0));
  }
 }
 assert.equal(comets,40);assert.ok(retro>0&&retro<comets/2,retro+' retrograde');assert.ok(active>=30,active+' comete attive');
});
test('scie e sciami: polvere lungo l\'orbita, pianeti che la attraversano, velocità d\'impatto ricalcolata',()=>{
 let crossings=0;
 for(const s of systems){
  for(const c of s.comets){const orbit=[];for(let i=0;i<4000;i++){const st=cometAt(c,Math.PI*2*i/4000,s.star.mass),r=s.map.toScene(st.r);orbit.push(st.p.map(x=>x/st.r*r));}const p=streamOf(c,s.map,60);for(let j=0;j<p.length;j+=3){let best=Infinity;for(const o of orbit)best=Math.min(best,Math.hypot(p[j]-o[0],p[j+1]-o[1],p[j+2]-o[2]));assert.ok(best<.2,'polvere lontana dall\'orbita: '+best);}}
  const sh=meteorShowers(s,s.comets,s.map);
  for(const [slot,list] of sh){
   const body=s.bodies.find(b=>b.slot===slot);
   for(const x of list){
    crossings++;assert.ok(x.gap<=.3);const c=s.comets[x.comet];
    // Relative speed: the comet at the closest point minus the planet on a circular orbit, forwards.
    assert.ok(x.speed>0&&x.speed<V_EARTH*Math.sqrt(s.star.mass/body.a)+visViva(c.q,c.a,s.star.mass)+1e-9);
    const t=(x.mean-body.phase)/body.speed;assert.ok(showerState(body,x,t).active);assert.ok(showerState(body,x,t).strength>.99);assert.ok(!showerState(body,x,t+Math.PI/body.speed).active);
    const later=showerState(body,x,t+1);assert.ok(later.active||later.next>0);
   }
  }
 }
 assert.ok(crossings>=20,crossings+' attraversamenti');
});
test('pannelli: cometa, cintura, sciame di un pianeta e minatore della cintura',()=>{
 const s=systems[13],c=s.comets[0],M=s.star.mass,st=cometState(c,0,s.map,s.star);
 let v=check(whatHappens({kind:'comet',name:c.name,r:st.r,q:c.q,Q:c.Q,a:c.a,e:c.e,years:years(c.a,M),v:st.v,vq:visViva(c.q,c.a,M),vQ:visViva(c.Q,c.a,M),activity:.4,flux:2.5,ract:.38,ion:3.2,dust:2.3,retro:true,L:s.star.luminosity,M}));
 assert.deepEqual(v.pages.map(p=>p.key),['orbita','coda']);assert.equal(v.pages[0].concept.unit,'physics-12');assert.equal(v.pages[1].concept.unit,'chemistry-11');
 assert.ok(v.pages[0].concept.text.includes(visViva(c.q,c.a,M).toFixed(1).replace('.',',')+' km/s al perielio'));assert.ok(v.pages[0].concept.text.includes('Halley'));assert.ok(v.pages[1].concept.text.includes('pressione della luce'));
 assert.ok(check(whatHappens({kind:'comet',name:c.name,r:20,q:c.q,Q:c.Q,a:c.a,e:c.e,years:1,v:1,vq:2,vQ:.5,activity:0,flux:.001,ract:.38,ion:0,dust:0,retro:false,L:.1,M:1})).pages[1].rows.some(r=>r[1]==='Assente'));
 const b=s.belts[0];v=check(whatHappens({kind:'belt',name:b.name,icy:false,aIn:1,aOut:4,M:1,count:600,inner:b.inner,outer:b.outer,laps:[1000,1100,1200,1300]}));
 assert.equal(v.concept.unit,'physics-13');assert.ok(v.rows.some(r=>r[1]==='8,00 anni')&&v.concept.text.includes('8,00 volte'));
 // A meteoroid of 1 g at 40 km/s: ½ × 0.001 × 40 000² J = 800 kJ, 191 g of TNT.
 v=check(whatHappens({kind:'planet',name:'Terrestre',a:1,M:1,L:1,teff:5772,atm:null,air:true,showers:[{name:'Cometa Encke',speed:40,active:false,next:12.2}],unit:null}));
 const p=v.pages.find(x=>x.key==='meteore');assert.equal(p.concept.unit,'physics-08');assert.ok(p.rows.some(r=>r[1]==='800 kJ')&&p.rows.some(r=>r[1]==='fra 13 s'));assert.ok(p.concept.text.includes('191 g di tritolo')&&p.concept.text.includes('stella cadente'));
 assert.ok(check(whatHappens({kind:'planet',name:'Roccia',a:1,M:1,L:1,teff:5772,atm:null,air:false,showers:[{name:'Cometa Encke',speed:70,active:true,next:0}],unit:null})).pages[1].concept.text.includes('cratere'));
 // Four pages: the atmosphere tab gets a shorter label.
 const G=planetCards();v=check(whatHappens({kind:'planet',name:'Pianeta',a:1,M:1,L:1,teff:5772,air:true,atm:{pressure:1,tau:.8,teq:255,ts:288,greenhouse:33,albedo:.3,exosphere:false,sky:G[0].atmosphere.sky,haze:.2,clouds:.4},showers:[{name:'Cometa Encke',speed:30,active:true,next:0}],unit:{id:'x',title:'Unità'}}));
 assert.deepEqual(v.pages.map(p=>p.label),['ORBITA','ARIA','CIELO','METEORE']);
 v=check(whatHappens({kind:'service',serviceKind:'minatore',role:'fascia',name:'Minatore 1',typeName:'Traffico di servizio',facts:{omega:.004,r:20,fill:.3,fillTime:120,au:2.7,mass:1}}));
 assert.equal(v.concept.unit,'physics-13');assert.ok(v.rows.some(r=>r[1]===Math.sqrt(2.7**3).toFixed(2).replace('.',',')+' anni'));
});
test('scena: comete e cinture si seguono e si indicano, stelle cadenti solo dove c\'è aria',()=>{
 const R={w:1600,h:1000,makeStars(){},makeMesh(){},deleteMesh(){},drawMesh(){},makeInstances(){},updateInstances(){},deleteInstances(){},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);w.systems=systems.map(s=>({...s,name:'Area '+s.id}));
 const s={scene:'system',system:13,time:300,yaw:0,pitch:.48,distance:34,paused:true};
 const F=w.followSubject({...s,follow:{kind:'comet',k:0}});const st=cometState(w.systems[13].comets[0],300,w.systems[13].map,w.systems[13].star);
 assert.deepEqual(F.position,st.position);assert.equal(F.subject.kind,'comet');check(whatHappens(F.subject));
 const B=w.followSubject({...s,follow:{kind:'belt',k:0,angle:1}}),b=w.systems[13].belts[0],mid=(b.inner+b.outer)/2;assert.ok(near(Math.hypot(B.position[0],B.position[2]),mid,1e-9));assert.ok(near(B.radius,(b.outer-b.inner)/2,1e-12));check(whatHappens(B.subject));
 // The followed point of a belt turns with its ring.
 const later=w.followSubject({...s,time:400,follow:{kind:'belt',k:0,angle:1}}),turn=Math.atan2(later.position[2],later.position[0])-Math.atan2(B.position[2],B.position[0]);assert.ok(near(((turn%(2*Math.PI))+2*Math.PI)%(2*Math.PI),(ringOmega(b,mid)*100)%(2*Math.PI),1e-6));
 assert.equal(w.followSubject({...s,follow:{kind:'comet',k:5}}),null);
 // Picking a belt at a point of its middle line.
 w.cameraSpace='system';w.travelling=false;w.camera('system',s);w.projections=[];const a=.3,q=[Math.cos(a)*mid,0,Math.sin(a)*mid];
 const P=[...project(q,w.vp,R.w,R.h)],hit=w.pick(P[0],P[1],s);assert.ok(hit&&hit.type==='belt'&&hit.index===0,JSON.stringify(hit?.type));
 const again=w.followSubject({...s,follow:hit.follow});assert.ok(Math.hypot(again.position[0]-q[0],again.position[2]-q[2])<mid*2*Math.PI/96+1e-9,'punto seguito lontano dal clic');
 // Shooting stars: some over a minute on a world with air, none without; more while a shower is on.
 const G=planetCards(),withAir=G.findIndex(g=>g.atmosphere.density>=.3),noAir=G.findIndex(g=>g.atmosphere.density<.1);
 const count=(index,t0)=>{w.surface={genome:G[index]};w.eye=[0,4,0];let n=0;for(let t=t0;t<t0+60;t+=.1)n+=w.meteors({selected:index,time:t}).length;return n;};
 assert.ok(count(withAir,10)>0);assert.equal(count(noAir,10),0);
 const host=systems.find(x=>{const sh=meteorShowers(x,x.comets,x.map);return [...sh.keys()].some(slot=>{const body=x.bodies.find(b=>b.slot===slot);return Number.isInteger(body.index)&&G[body.index].atmosphere.density>=.1;});});
 assert.ok(host,'nessun pianeta delle unità con aria attraversa una scia');
 const sh=meteorShowers(host,host.comets,host.map),slot=[...sh.keys()].find(k=>{const body=host.bodies.find(b=>b.slot===k);return Number.isInteger(body.index)&&G[body.index].atmosphere.density>=.1;}),body=host.bodies.find(b=>b.slot===slot),x=sh.get(slot)[0];
 const t=(x.mean-body.phase)/body.speed+50*2*Math.PI/body.speed;
 assert.ok(count(body.index,t-30)>count(body.index,t+Math.PI/body.speed-30)*2,'lo sciame non aumenta le stelle cadenti');
 for(const m of w.meteors({selected:body.index,time:t}))assert.ok(m.opacity>=0&&m.opacity<=1&&m.length>=4&&m.length<=9);
 const mat=basisMatrix([1,2,3],[0,0,1],[1,0,0],2);assert.deepEqual([...mat],[2,0,0,0,0,2,0,0,0,0,2,0,1,2,3,1]);
});
