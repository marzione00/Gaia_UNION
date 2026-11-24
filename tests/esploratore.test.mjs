import test from 'node:test';import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {METRE,G0,WALK,RUN,JUMP,FOOT,ROVER,EDGE,jumpOf,forward,newExplorer,passable,stepExplorer,toggleRover,travelTo,freeSpot,parkable,lean,roverMatrix} from '../src/worlds/explorer.js';
import {roverMesh,archPalette,typologyOf} from '../src/worlds/architecture.js';
import {whatHappens,CONCEPT_UNITS} from '../src/craft/succede.js';
import {cleanExplore} from '../src/store.js';
import {planetGenomes} from '../src/worlds/surface.js';
import {World,STATION_CLEAR} from '../src/scene/world.js';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8'),biomes=JSON.parse(await read('assets/scenes/manifest.json')).biomes;
const flat=(g=1,extra={})=>({ground:()=>0,sea:null,blocked:()=>false,gravity:g,...extra});
const run=(a,input,env,seconds,dt=1/60)=>{const ev=[];for(let t=0;t<seconds-1e-9;t+=dt)ev.push(...stepExplorer(a,input,dt,env));return ev;};

test('esploratore: il salto segue h = v²/2a con la gravità del pianeta',()=>{
 // A colonist of 1.1 units is 1.75 m tall: one metre is 1.1/1.75 units.
 assert.ok(Math.abs(METRE*1.75-1.1)<1e-12);assert.equal(G0,9.81);
 for(const g of [.38,.725,1,1.302,2.4]){const J=jumpOf(g);
  assert.ok(Math.abs(J.height-JUMP*JUMP/(2*G0*g))<1e-12&&Math.abs(J.time-2*JUMP/(G0*g))<1e-12);
  // The same push: the height goes as 1/g.
  assert.ok(Math.abs(J.height*g-J.earth)<1e-12);
  const a=newExplorer(0,0,0,flat(g));let ev=stepExplorer(a,{jump:true},1/60,flat(g)),frames=1;
  assert.deepEqual(ev,['salto']);assert.equal(a.jumps,1);assert.ok(!a.grounded);
  while(!ev.includes('atterraggio')&&frames<2000){ev=stepExplorer(a,{},1/60,flat(g));frames++;}
  // The top of the arc is exact for a constant acceleration; the landing comes within one frame.
  assert.ok(Math.abs(a.last-J.height)<1e-9,`${g} ${a.last} ${J.height}`);assert.equal(a.best,a.last);assert.ok(Math.abs(frames/60-J.time)<=1/60+1e-9);assert.ok(a.grounded&&a.y===0);
 }
 assert.ok(Math.abs(jumpOf(1).earth-.4898)<1e-4);
 // No jump in the air or from the rover.
 const b=newExplorer(0,0,0,flat());stepExplorer(b,{jump:true},1/60,flat());stepExplorer(b,{jump:true},1/60,flat());assert.equal(b.jumps,1);
 const c=newExplorer(0,0,0,flat());assert.ok(toggleRover(c,flat()));assert.deepEqual(stepExplorer(c,{jump:true},1/60,flat()),[]);assert.equal(c.jumps,0);
});

test('esploratore: passo, corsa, pendii, acqua ed edifici',()=>{
 const a=newExplorer(0,0,0,flat());run(a,{forward:1},flat(),3);
 assert.ok(Math.abs(a.speed-WALK*METRE)<1e-9);assert.ok(Math.abs(a.walked-a.x/METRE)<1e-6);assert.equal(a.gait,1);
 run(a,{forward:1,run:true},flat(),2);assert.ok(Math.abs(a.speed-RUN*METRE)<1e-9);assert.equal(a.gait,2);
 // Turning: A and D turn the heading at FOOT.turn rad/s, positive to the left.
 const t=newExplorer(0,0,0,flat());run(t,{turn:1},flat(),.5);assert.ok(Math.abs(t.h-FOOT.turn*.5)<1e-9);
 // Slopes: 30° is climbed, 40° stops the explorer; going down is free.
 const slope=deg=>({...flat(),ground:x=>Math.max(0,x-1)*Math.tan(deg*Math.PI/180)});
 const up=newExplorer(0,0,0,slope(30));run(up,{forward:1},slope(30),4);assert.ok(up.x>3);
 const steep=newExplorer(0,0,0,slope(40)),ev=run(steep,{forward:1},slope(40),4);assert.ok(steep.x<1.05&&ev.includes('fermo'));
 const down=newExplorer(5,0,Math.PI,slope(40));run(down,{forward:1},slope(40),2);assert.ok(down.x<4);
 // Water: wading up to FOOT.wade units under the sea, never deeper.
 const sea={...flat(),sea:0,ground:x=>x<3?0:-(x-3)};
 const w=newExplorer(0,0,0,sea);run(w,{forward:1},sea,6);assert.ok(w.x>3+FOOT.wade-.05&&w.x<=3+FOOT.wade+1e-9);assert.ok(!passable(4,0,3.4,0,sea,FOOT,false));
 // Buildings and the edge of the map stop it; against a wall it slides along the free axis.
 const wall={...flat(),blocked:x=>x>2};
 const s=newExplorer(0,0,-Math.PI/4,wall);run(s,{forward:1},wall,6);assert.ok(s.x<=2&&s.z>3);
 assert.ok(!passable(EDGE+.1,0,EDGE,0,flat(),FOOT,false)&&passable(EDGE-.1,0,EDGE-.2,0,flat(),FOOT,false));
 // Walking off a ledge starts a fall with the gravity of the planet.
 const ledge={...flat(),ground:x=>x<1?2:0},f=newExplorer(0,0,0,ledge);f.y=2;run(f,{forward:1},ledge,3);assert.ok(f.x>1&&f.y===0&&f.grounded&&f.jumps===0);
});

test('esploratore: rover a sei ruote, salita, discesa e matrice',()=>{
 const env=flat(),a=newExplorer(0,0,0,env);
 // The rover parks 3 units to the side; boarding needs it within 6 units.
 assert.ok(Math.abs(Math.hypot(a.rover.x,a.rover.z)-3)<1e-9);
 const far=newExplorer(0,0,0,env);far.rover={x:20,z:0,h:0};assert.equal(toggleRover(far,env),false);assert.equal(far.mode,'piedi');
 assert.ok(toggleRover(a,env));assert.equal(a.mode,'rover');assert.ok(Math.abs(a.z-3)<1e-9);
 // 2.5 m/s² up to 10 m/s.
 run(a,{forward:1},env,2);assert.ok(Math.abs(a.speed/METRE-5)<1e-6);run(a,{forward:1},env,4);assert.ok(Math.abs(a.speed/METRE-ROVER.top)<1e-9);assert.ok(a.driven>40&&a.walked===0);
 // Braking at 6 m/s².
 run(a,{},env,1);assert.ok(Math.abs(a.speed/METRE-4)<1e-6);run(a,{},env,1);assert.equal(a.speed,0);
 // It leaves the rover on a free side and keeps it where it stopped.
 const at=[a.x,a.z];assert.ok(toggleRover(a,env));assert.equal(a.mode,'piedi');assert.ok(Math.abs(Math.hypot(a.x-at[0],a.z-at[1])-1.8)<1e-9);assert.deepEqual([a.rover.x,a.rover.z],at);
 // Slopes: the rover climbs 20° and stops at 30°, leaning with the ground.
 const slope=deg=>({...flat(),ground:x=>Math.max(0,x-1)*Math.tan(deg*Math.PI/180)});
 for(const [deg,climbs] of [[20,true],[30,false]]){const r=newExplorer(-2,0,0,slope(deg));r.rover={x:-2,z:0,h:0};toggleRover(r,slope(deg));run(r,{forward:1},slope(deg),6);assert.equal(r.x>4,climbs,String(deg));if(climbs){run(r,{forward:1},slope(deg),1);assert.ok(Math.abs(r.pitch-deg*Math.PI/180)<.01);}}
 // Its four corners stay out of the buildings.
 const wall={...flat(),blocked:(x,z)=>z<-.8&&x>3},c=newExplorer(0,0,0,wall);c.rover={x:0,z:0,h:0};toggleRover(c,wall);run(c,{forward:1},wall,3);assert.ok(c.x<3+ROVER.length+.01);
 const L=lean(0,0,0,slope(20));assert.ok(Math.abs(L.pitch-Math.atan((slope(20).ground(ROVER.length)-slope(20).ground(-ROVER.length))/(2*ROVER.length)))<1e-12);
 // R = Ry(h) Rz(pitch) Rx(roll): orthonormal, determinant 1, the nose along the heading tilted by the pitch.
 for(const [h,p,r] of [[0,0,0],[.7,.2,.1],[-2,-.3,.25]]){const M=roverMatrix(1,2,3,h,p,r),c3=i=>[M[i*4],M[i*4+1],M[i*4+2]],dot=(u,v)=>u[0]*v[0]+u[1]*v[1]+u[2]*v[2],X=c3(0),Y=c3(1),Z=c3(2);
  for(const [u,v] of [[X,Y],[X,Z],[Y,Z]])assert.ok(Math.abs(dot(u,v))<1e-6);for(const u of [X,Y,Z])assert.ok(Math.abs(dot(u,u)-1)<1e-6);
  assert.ok(Math.abs(dot(X,[Y[1]*Z[2]-Y[2]*Z[1],Y[2]*Z[0]-Y[0]*Z[2],Y[0]*Z[1]-Y[1]*Z[0]])-1)<1e-6);
  const [fx,fz]=forward(h);assert.ok(Math.abs(X[0]-fx*Math.cos(p))<1e-6&&Math.abs(X[2]-fz*Math.cos(p))<1e-6&&Math.abs(X[1]-Math.sin(p))<1e-6);assert.deepEqual([...M.slice(12)],[1,2,3,1]);}
 // Three styles, two levels of detail, within the budget of a detailed building.
 const g=planetGenomes()[42];for(const typ of ['sigillato','adattato','simbiotico']){const m0=roverMesh(archPalette(g,typ),typ,0),m1=roverMesh(archPalette(g,typ),typ,1);assert.equal(m0.stride,16);assert.ok(m1.i.length<m0.i.length&&m0.i.length/3<3000);let x0=9,x1=-9,y0=9;for(let i=0;i<m0.v.length;i+=16){x0=Math.min(x0,m0.v[i]);x1=Math.max(x1,m0.v[i]);y0=Math.min(y0,m0.v[i+1]);}assert.ok(x1-x0>2.6&&x1-x0<3.2&&Math.abs(y0)<.02,typ);}
});

test('esploratore: meta, viaggio rapido e joystick',()=>{
 const env=flat(),a=newExplorer(0,0,0,env);let ev=[];
 for(let k=0;k<1200&&!ev.includes('arrivato');k++)ev=stepExplorer(a,{goal:[-20,15]},1/60,env);
 assert.ok(ev.includes('arrivato'));assert.ok(Math.hypot(a.x+20,a.z-15)<1.5);
 const b=newExplorer(0,0,0,env);for(let k=0;k<1200&&!ev.includes('arrivato');k++)ev=stepExplorer(b,{goal:[30,0],stop:8},1/60,env);ev=[];for(let k=0;k<1200&&!ev.includes('arrivato');k++)ev=stepExplorer(b,{goal:[30,0],stop:8},1/60,env);assert.ok(Math.abs(b.x-22)<.2);
 // A joystick heading turns the explorer that way; a full push runs.
 const c=newExplorer(0,0,0,env);run(c,{heading:Math.PI/2,push:1},env,2);assert.ok(Math.abs(c.h-Math.PI/2)<1e-3&&c.z<-2&&Math.abs(c.speed-RUN*METRE)<1e-9);
 const d=newExplorer(0,0,0,env);run(d,{heading:0,push:.5},env,2);assert.ok(Math.abs(d.speed-WALK*METRE*.5)<1e-9);
 // Quick travel stops 5 units before the point on foot, 9 in the rover, facing it.
 const e=newExplorer(0,0,0,env);assert.ok(travelTo(e,40,30,env));assert.ok(Math.abs(Math.hypot(e.x-40,e.z-30)-5)<1e-9);const [fx,fz]=forward(e.h);assert.ok(Math.abs(fx-.8)<1e-9&&Math.abs(fz-.6)<1e-9);assert.ok(Math.hypot(e.rover.x-e.x,e.rover.z-e.z)<3.5);
 toggleRover(e,env);assert.ok(travelTo(e,-40,0,env));assert.ok(Math.abs(Math.hypot(e.x+40,e.z)-9)<1e-9&&e.rover.x===e.x);
 // Free ground and parking avoid what is blocked.
 const box={...flat(),blocked:(x,z)=>Math.abs(x)<4&&Math.abs(z)<4},p=freeSpot(0,0,box);assert.ok(p&&!box.blocked(...p)&&Math.hypot(...p)<6);assert.ok(!parkable(4.5,0,0,box)&&parkable(6,0,0,box));
});

test('esploratore: suolo dei pianeti, colonie, stazioni e telecamera in terza persona',()=>{
 const w=new World({w:1600,h:1000,makeStars(){},makeMesh(){}},{},biomes);
 for(const index of [7,42,0,20]){
  w.activatePlanet(index);const S0=w.surface,env=w.explorerEnv();assert.equal(env.gravity,planetGenomes()[index].gravity);assert.equal(env.sea,S0.seaY);
  for(const st of S0.stations)assert.ok(env.blocked(st.position[0],st.position[2])&&!env.blocked(st.position[0]+STATION_CLEAR+.2,st.position[2])||S0.clear.solid(st.position[0]+STATION_CLEAR+.2,st.position[2]));
  // Buildings stop the explorer, the streets are free.
  for(const t of S0.settlements){assert.ok(t.buildings.every(b=>env.blocked(b.x,b.z)));
   const free=t.streets.flatMap(s=>s.points).filter(q=>t.buildings.every(b=>Math.hypot(b.x-q[0],b.z-q[2])>b.radius+.1)&&S0.stations.every(st=>Math.hypot(st.position[0]-q[0],st.position[2]-q[2])>STATION_CLEAR));
   assert.ok(free.length>5&&free.every(q=>!env.blocked(q[0],q[2])),`${index} ${t.kind}`);}
  const spot=freeSpot(2,2,env),A=newExplorer(spot[0],spot[1],.8,env);assert.ok(passable(...spot,...spot,env,FOOT,true));
  const s={scene:'surface',selected:index,yaw:0,pitch:.45,distance:60,paused:true,lastFrameMs:16,explore:true,exploreFocus:[A.x,A.z],exploreBlend:1,avatar:A};
  for(const mode of ['piedi','rover']){if(mode==='rover'){A.rover={x:A.x,z:A.z,h:A.h};toggleRover(A,env);}
   w.cameraScene=null;w.camera('surface',s);w.camera('surface',s);
   const d=[w.eye[0]-A.x,w.eye[2]-A.z],[fx,fz]=forward(A.h),dist=Math.hypot(...w.eye.map((v,i)=>v-w.target[i]));
   // Behind the explorer, 7.5 units on foot and 12 in the rover, above the ground.
   assert.ok((d[0]*fx+d[1]*fz)/Math.hypot(...d)<-.999,`${index} ${mode}`);assert.ok(Math.abs(w.target[0]-A.x)<1e-9&&Math.abs(w.target[2]-A.z)<1e-9);
   assert.ok(dist>=(mode==='rover'?12:7.5)-1e-6&&dist<(mode==='rover'?12:7.5)+6,`${index} ${mode} ${dist}`);assert.ok(w.eye[1]>=Math.max(S0.heightAt(w.eye[0],w.eye[2]),S0.seaY??-99)+1.2-1e-9);}
 }
});

test('esploratore: diario, «Che cosa succede» sul salto e comandi',async()=>{
 const raw={'3':{p:{w:120,d:3400,j:129,n:4}},'4':{p:{w:-1,d:0,j:0,n:0}},'5':{s:['s1'],p:{w:1.5,d:0,j:0,n:1}},'6':{p:{w:0,d:0,j:0,n:0}},'8':{p:{w:5,d:0,j:20000,n:1}}};
 assert.deepEqual(cleanExplore(raw),{'3':{s:[],l:[],p:{w:120,d:3400,j:129,n:4}},'5':{s:['s1'],l:[]}});
 assert.equal(CONCEPT_UNITS['physics-04'],'Moto uniformemente accelerato');
 for(const g of [.725,1,1.302]){const J=jumpOf(g),x=whatHappens({ground:true,kind:'salto',name:'Il salto dell’esploratore',label:'Pianeta',gravity:g,g0:G0,speed:JUMP,earth:J.earth,last:J.height,jumps:3});
  assert.equal(x.tag,'SALTO');assert.equal(x.concept.unit,'physics-04');assert.equal(x.rows.find(r=>r[0]==='Altezza del salto')[1],Math.round(J.height*100)+' cm');assert.equal(x.rows.find(r=>r[0]==='Sulla Terra')[1],'49 cm');
  assert.ok(x.concept.text.includes('h = v²/(2a)')&&x.concept.text.includes((J.height).toFixed(2).replace('.',',')+' m'));
  if(g===1)assert.ok(x.concept.text.includes('uguale a quella terrestre'));else assert.ok(x.concept.text.includes((1/g).toFixed(2).replace('.',',')+' volte'));
  assert.ok(!/—/.test(x.concept.text)&&!/\bnon\b[^.;:\n]{0,80}\bma\b/.test(x.concept.text));}
 const app=await read('src/app.js'),world=await read('src/scene/world.js'),shader=await read('src/scene/shaders.js');
 for(const t of ["held.add(c)","window.addEventListener('keyup'","const z = stickZone();","U.button('explore-jump', 'SALTA'","'explore-rover'","'explore-scan', 'SCANNER'","followGround('salto')","rec.p = p; store.save();","Esploratore: ${p.w} m a piedi"])assert.ok(app.includes(t),t);
 assert.ok(world.includes("instanceMode:8,motion:[0,1,0,this.explorerFigure.legs]")&&world.includes("roverMatrix(v.x"));assert.ok(shader.includes('uMotion.y>.5?0.:'));
 // The rover of the sealed outposts carries suitports; the open one a roll bar and a solar panel.
 assert.equal(typologyOf(planetGenomes()[42],7),'sigillato');
});
