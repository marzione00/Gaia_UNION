import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {planetGenomes,planetSurface,surfaceScatter} from '../src/worlds/surface.js';
import {ecosystem,dayOf,sunAt,gaitHeading,SPEED,HUNT,VIGILANCE,DAY_SECONDS,STEP} from '../src/worlds/ecosystem.js';
import {whatHappens,CONCEPT_UNITS as SYSTEM_UNITS,GROUND_UNITS} from '../src/craft/succede.js';
const CONCEPT_UNITS={...SYSTEM_UNITS,...GROUND_UNITS};
import {World} from '../src/scene/world.js';
import {counter,BUDGET} from '../scripts/prestazioni.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const genomes=planetGenomes(),deg=x=>x*180/Math.PI;
const STYLE=[/—/,/\bnon solo\b|\bnon soltanto\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];

test('giorno: il sole sull’equatore celeste, mezzogiorno verso la luce della superficie, alba e tramonto',()=>{
 const hours=genomes.map(g=>dayOf(g,null,[0,1,0]).hours).sort((a,b)=>a-b);assert.ok(Math.abs(hours[62]-24)<.5);
 for(const i of [0,7,36,53,99]){const s=planetSurface(i),D=dayOf(s.genome,s.site,s.light.direction);
  assert.equal(D.seconds,DAY_SECONDS*D.hours/24);assert.ok(Math.abs(deg(D.lat))<=53);
  // Sunrise and sunset at a quarter and three quarters of the day, at every latitude.
  for(const f of [.25,.75]){const t=(f-D.start)*D.seconds;assert.ok(Math.abs(sunAt(D,t).height)<1e-9);}
  const noon=sunAt(D,(.5-D.start)*D.seconds);assert.ok(Math.abs(deg(noon.height)-(90-Math.abs(deg(D.lat))))<1e-6);
  // At noon the sun stands towards the azimuth of the light of the surface; at landing it has the height of that light.
  const az=Math.atan2(noon.dir[2],noon.dir[0]);if(Math.abs(deg(D.lat))>1)assert.ok(Math.abs(Math.atan2(Math.sin(az-D.az),Math.cos(az-D.az)))<1e-6);
  const start=sunAt(D,0),el=Math.asin(s.light.direction[1]);assert.ok(Math.abs(start.height-Math.min(el,Math.PI/2-Math.abs(D.lat)))<1e-6);
  for(let t=0;t<D.seconds;t+=D.seconds/37){const u=sunAt(D,t);assert.ok(Math.abs(Math.hypot(...u.dir)-1)<1e-9);assert.ok(u.hour>=0&&u.hour<D.hours);}
 }
});

test('ecosistema: mandrie al pascolo e in fuga, predatori a caccia, stormi allineati, colonie alla deriva',()=>{
 let hunts=0,flee=0,orders=[];
 for(const i of [7,20,36,53]){
  const s=planetSurface(i),sc=surfaceScatter(s),eco=ecosystem(s,sc.species),sea=s.seaY,seen=new Set();
  assert.ok(eco.groups.length>0);
  // Every animal of the planet belongs to one group.
  assert.equal(eco.groups.reduce((a,G)=>a+G.members.length,0),sc.species.filter(p=>p.species.kind==='animal').reduce((a,p)=>a+p.instances.length,0));
  for(let k=0;k<30*240;k++){eco.step(STEP,1);for(const G of eco.groups){seen.add(G.kind+':'+G.state);if(G.kind==='mandria'&&G.state==='fuga')flee++;}}
  hunts+=eco.hunts;
  for(const G of eco.groups){
   if(G.kind==='mandria'||G.kind==='branco'){
    // Herds and packs stay on dry ground outside the settlements, near the places of their species.
    assert.ok((sea===null||s.heightAt(G.x,G.z)>sea+.3)&&!s.clear.blocked(G.x,G.z),`${i} ${G.species.name}`);
    for(const j of G.members){const o=G.items[j];assert.ok(Math.abs(o.y-(s.heightAt(o.x,o.z)-.05))<1e-6);}}
   if(G.kind==='deriva')for(const j of G.members){const o=G.items[j];assert.ok(sea!==null&&s.heightAt(o.x,o.z)<sea);}
   if(G.kind==='stormo'&&G.members.length>2){const n=G.members.length,m=G.vel.map(v=>{const l=Math.hypot(...v);return [v[0]/l,v[1]/l];}).reduce((a,v)=>[a[0]+v[0]/n,a[1]+v[1]/n],[0,0]);orders.push(Math.hypot(...m));
    for(const j of G.members){const o=G.items[j];assert.ok(o.y-s.heightAt(o.x,o.z)>4);const sp=Math.hypot(...G.vel[G.members.indexOf(j)]);assert.ok(sp>=SPEED.fly*.7-1e-9&&sp<=SPEED.fly*1.3+1e-9);}}
  }
  // At night the herds rest and the flocks roost.
  for(let k=0;k<30*60;k++)eco.step(STEP,0);
  for(const G of eco.groups){if(G.kind==='mandria'&&G.state!=='fuga')assert.equal(G.state,'riposo');if(G.kind==='stormo'){assert.equal(G.state,'riposo');for(const j of G.members)assert.ok(G.items[j].y-s.heightAt(G.items[j].x,G.items[j].z)<.2);}if(G.kind==='branco'&&!G.nocturnal&&!['pasto','sosta'].includes(G.state))assert.equal(G.state,'riposo');}
 }
 assert.ok(hunts>0&&flee>0);
 // Flocks fly aligned: the mean of the unit velocities is long.
 assert.ok(orders.reduce((a,b)=>a+b,0)/orders.length>.8,'allineamento '+orders.map(x=>x.toFixed(2)));
 // The same steps give the same scene.
 const s=planetSurface(7),run=()=>{const e=ecosystem(s,surfaceScatter(s).species);for(let k=0;k<900;k++)e.step(STEP,1);return JSON.stringify(e.groups.map(G=>[G.x,G.z,G.state,G.members.map(j=>[G.items[j].x,G.items[j].z])]));};
 assert.equal(run(),run());
 // Gait in the heading, for shader mode 8.
 for(const [h,g] of [[0,0],[1,1],[-2,2],[7,1]]){const a=gaitHeading(h,g),k=Math.floor(a/7);assert.equal(k,g);assert.ok(Math.abs(a-7*k-(((h%(2*Math.PI))+2*Math.PI)%(2*Math.PI)))<1e-9);}
 assert.ok(read('src/scene/shaders.js').includes('if(uInstanced==8){float k=floor(a/7.);'));
});

test('scena: animali che si muovono, luce del giorno e della notte, abitanti a casa di notte, limiti di un fotogramma',()=>{
 const biomes=JSON.parse(read('assets/scenes/manifest.json')).biomes,R=counter('high'),w=new World(R,{},biomes);let updates=0;const up=R.updateInstances;R.updateInstances=(k,d)=>{updates++;up(k,d);};
 w.activatePlanet(7);const s={scene:'surface',selected:7,time:100,yaw:0,pitch:.45,distance:22,paused:false,lastFrameMs:16};
 R.begin();w.draw('surface',s,{modules:[]});const day=w.sunNow;assert.ok(day.daylight>.9);assert.deepEqual(day.light,day.dir);
 const live=w.groups.filter(G=>G.live&&G.n),before=live.map(G=>G.items.map(o=>[o.x,o.z]).join());
 for(let k=1;k<=120;k++){s.time=100+k/30;R.begin();w.draw('surface',s,{modules:[]});const f=R.frame;assert.ok(f.draws<=BUDGET.draws&&f.triangles<=BUDGET.triangles);}
 assert.ok(updates>=live.length*2*60);assert.ok(live.some((G,k)=>G.items.map(o=>[o.x,o.z]).join()!==before[k]));
 // Instance data carry the place and the gait of every animal.
 for(const G of live)G.items.forEach((o,i)=>{assert.equal(G.all[i*8],Math.fround(o.x));assert.equal(Math.floor(G.all[i*8+7]/7),o.gait||0);});
 // Night: dim blue light from the side opposite the sun, stars, three inhabitants in ten in the streets.
 const folk=()=>w.groups.filter(G=>G.mode===7).reduce((a,G)=>a+G.drawn[0]+G.drawn[1],0),dayFolk=folk();
 w.landTime-=((.95-w.sunNow.fraction+1)%1)*w.day.seconds;s.time+=1/30;R.begin();w.draw('surface',s,{modules:[]});const n=w.sunNow;
 assert.ok(n.daylight<.05&&n.height<0&&n.sky.stars>.9&&Math.max(...n.color)<.35&&n.light[1]>0);assert.ok(folk()<dayFolk*.45,`${folk()} ${dayFolk}`);
 // A paused scene stands still.
 s.paused=true;const t0=w.eco.time;s.time+=5;R.begin();w.draw('surface',s,{modules:[]});assert.equal(w.eco.time,t0);
});

test('pannello «Che cosa succede» a terra: numeri dal vivo e un concetto delle unità',()=>{
 const modules=JSON.parse(read('content/catalogue.json')).modules,biomes=JSON.parse(read('assets/scenes/manifest.json')).biomes,R=counter('high'),w=new World(R,{},biomes),kinds=new Set();
 for(const id of ['biology-20','math-c10','math-p07','physics-02','physics-03'])assert.equal(modules.find(m=>m.id===id).title,CONCEPT_UNITS[id]);
 for(const i of [7,20,36]){w.activatePlanet(i);const s={scene:'surface',selected:i,time:50,yaw:0,pitch:.45,distance:22,paused:false,lastFrameMs:16};
  for(let k=0;k<300;k++){s.time=50+k/30;R.begin();w.draw('surface',s,{modules:[]});}
  const subjects=[w.groundSubject({k:null}),...[...new Set(w.eco.groups.map(G=>G.k))].map(k=>w.groundSubject({k}))];
  for(const x of subjects){const v=whatHappens(x);kinds.add(x.kind);assert.ok(CONCEPT_UNITS[v.concept.unit]);assert.ok(v.rows.length>=4&&v.title&&v.tag);
   for(const t of [v.concept.text,...v.rows.flat()]){for(const re of STYLE)assert.doesNotMatch(t,re,t);assert.doesNotMatch(t,/NaN|undefined|Infinity/);}
   assert.ok(v.concept.text.length<=360);for(const [l,val] of v.rows){assert.ok(l.length<=30&&val.length<=52,l+' '+val);}
   if(x.kind==='mandria'){const none=(1-VIGILANCE)**x.n;assert.ok(v.concept.text.includes(`= ${(1-none).toFixed(2).replace('.',',')}`)||v.concept.text.includes((1-none).toFixed(2).replace('.',',')));}
   if(x.kind==='sole'&&x.height>0)assert.ok(v.concept.text.includes(Math.sin(x.height*Math.PI/180).toFixed(2).replace('.',',')));}
 }
 for(const k of ['sole','mandria','branco','stormo','deriva'])assert.ok(kinds.has(k),k);
 assert.equal(HUNT.sprint??SPEED.sprint,SPEED.sprint);assert.ok(SPEED.sprint>SPEED.flee&&SPEED.sprint*HUNT.sprintTime>HUNT.sprintFrom);
 const app=read('src/app.js');assert.ok(app.includes("followPanel({ subject: ground }, tint, stopGround)")&&app.includes("U.button('ground-sun', 'SOLE'"));
});
