import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture } from '../src/scene/systems.js';
import { World, shellOf } from '../src/scene/world.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { planetCards } from '../src/worlds/genome.js';
import { pressureFromDensity, APPRECIABLE_DENSITY } from '../src/worlds/physics.js';
import { CONCEPT_UNITS, WIEN, whatHappens, twilightOf, colourName } from '../src/craft/succede.js';
// Visible atmospheres (1.59.0): a shell, a twilight and clouds that follow the card of each planet, and the
// pages «Atmosfera» and «Cielo» of the panel «Che cosa succede».
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const catalogue=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url),'utf8')),modules=catalogue.modules||catalogue;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max)=>{assert.equal(typeof t,'string');assert.ok(t.length>0&&t.length<=max,'testo di '+t.length+' caratteri: '+t);for(const r of STYLE)assert.ok(!r.test(t),'costruzione vietata: '+t);for(const c of t)assert.ok(c===' '||glyphs[c],'glifo mancante «'+c+'» in '+t);assert.ok(!/NaN|undefined|Infinity|null/.test(t),t);};
const P=planetPhysics(),G=planetCards();
const subject=(i,hidden=null)=>{const c=P[i],g=G[i].atmosphere;return {kind:'planet',name:'Pianeta '+i,a:c.a,M:c.star.mass,L:c.star.luminosity,teff:c.star.teff,atm:{pressure:c.pressure,tau:c.tau,teq:c.teq,ts:c.ts,greenhouse:c.greenhouse,albedo:c.albedo,exosphere:c.exosphere,sky:g.sky,haze:g.haze,clouds:g.clouds},unit:{id:modules[i].id,title:modules[i].title},hidden};};
const it=(v,k)=>v.toFixed(k).replace('.',',');
test('pagine: orbita, atmosfera e cielo per i 125 pianeti delle unità, con i numeri delle schede',()=>{
 for(const id of ['physics-26','biology-23']){const m=modules.find(x=>x.id===id);assert.equal(m.title,CONCEPT_UNITS[id]);}
 let air=0,thin=0;
 for(let i=0;i<P.length;i++){
  const c=P[i],v=whatHappens(subject(i));assert.ok(v.pages,'pagine assenti: '+i);
  assert.deepEqual(v.pages.map(p=>p.key),c.exosphere?['orbita','atmosfera']:['orbita','atmosfera','cielo']);c.exosphere?thin++:air++;
  assert.equal(v.rows,v.pages[0].rows);assert.equal(v.concept,v.pages[0].concept);
  for(const p of v.pages){style(p.label,12);assert.ok(CONCEPT_UNITS[p.concept.unit]);style(p.concept.text,345);for(const [l,x] of p.rows){style(l,30);style(x,52);}}
  const atm=v.pages[1];assert.equal(atm.concept.unit,'biology-23');
  // The grey model of the cards: Ts = Teq (1 + 0.75 τ)^(1/4), and the greenhouse effect is their difference.
  assert.ok(Math.abs(c.ts-c.teq*(1+.75*c.tau)**.25)<1e-9,i+' temperatura al suolo');assert.ok(Math.abs(c.greenhouse-(c.ts-c.teq))<1e-9);
  assert.ok(atm.rows.some(r=>r[1]===it(c.ts,0)+' K'),i+' riga della temperatura');
  if(!c.exosphere){assert.ok(atm.concept.text.includes(`${it(c.teq,0)} × ⁴√(1 + 0,75 × ${it(c.tau,2)}) = ${it(c.ts,0)} K`),i+' formula');assert.ok(atm.rows.some(r=>r[0]==='Pressione al suolo'&&r[1]===it(c.pressure,c.pressure<10?2:0)+' bar'));
   const sky=v.pages[2];assert.equal(sky.concept.unit,'physics-26');assert.ok(sky.concept.text.includes('5,9 volte'));assert.ok(sky.rows.some(r=>r[1]===it(WIEN/c.star.teff,0)+' nm'));assert.ok(sky.rows.some(r=>r[1]===colourName(G[i].atmosphere.sky)));}
  else assert.equal(c.pressure,0);
 }
 assert.ok(air>0&&thin>0,air+' '+thin);
 // An ambient planet keeps the orbit only.
 assert.equal(whatHappens({kind:'planet',name:'Contorno',a:2,M:1,L:1,teff:5772,atm:null,unit:null}).pages,null);
});
test('strumenti: senza spettrografo e radiometro le righe e il concetto non svelano i numeri',()=>{
 const hidden={Luce:'da misurare con il radiometro infrarosso',Temperatura:'da misurare con il radiometro infrarosso',Pressione:'da misurare con lo spettrografo','Effetto serra':'da misurare con lo spettrografo'};
 for(let i=0;i<P.length;i+=7){
  const c=P[i],v=whatHappens(subject(i,hidden)),atm=v.pages[1];
  assert.ok(v.pages[0].rows.some(r=>r[0]==='Luce ricevuta'&&r[1]===hidden.Luce));
  for(const [l,x] of atm.rows)assert.ok(Object.values(hidden).includes(x),i+' '+l+' svelata: '+x);
  for(const n of [it(c.ts,0)+' K',it(c.teq,0)+' K'])assert.ok(!atm.concept.text.includes(n),i+' il concetto svela '+n);
 }
});
test('colori: crepuscolo dal colore del cielo, nomi dei colori, legge di Rayleigh',()=>{
 for(const [rgb,m,f] of [[[1,0,0],'rosso','rossa'],[[1,.55,0],'arancione','arancione'],[[1,.9,0],'giallo','gialla'],[[0,.8,.2],'verde','verde'],[[.3,.6,1],'azzurro','azzurra'],[[.1,.1,1],'blu','blu'],[[.6,.1,1],'viola','viola'],[[1,.2,.6],'rosa','rosa'],[[.5,.5,.5],'grigio','grigia'],[[1,1,1],'bianco','bianca'],[[.62,.68,.82],'azzurro pallido','azzurra pallida']]){assert.equal(colourName(rgb),m,rgb.join());assert.equal(colourName(rgb,true),f,rgb.join());}
 // A blue sky gives a warm dusk and a warm sky a blue one, as on Mars.
 assert.match(colourName(twilightOf([.38,.49,.69]),true),/^(arancione|gialla)/);assert.match(colourName(twilightOf([.56,.48,.43]),true),/^(azzurra|blu)/);
 for(const g of G){const t=twilightOf(g.atmosphere.sky);assert.ok(Math.abs(Math.max(...t)-1)<1e-12&&Math.min(...t)>0);}
 assert.ok(Math.abs((700/450)**4-5.86)<.01);
});
test('guscio: spessore, scala e crepuscolo crescono con la pressione e passano dalla scheda ai materiali del pianeta',()=>{
 assert.equal(shellOf(0),null);assert.equal(shellOf(-1),null);
 let prev=null;for(const p of [.001,.01,.1,1,10,100,1000]){const s=shellOf(p,.5);assert.ok(s[0]>=1.018-1e-12&&s[0]<=1.068+1e-12,p+' spessore');assert.ok(Math.abs(s[1]-4/(s[0]-1))<1e-9);assert.ok(s[3]>=.25&&s[3]<=1);if(prev){assert.ok(s[0]>=prev[0]&&s[2]>=prev[2]&&s[3]>=prev[3]);}prev=s;}
 assert.ok(shellOf(1,1)[2]>shellOf(1,0)[2],'la foschia aumenta lo spessore ottico');
 // The planet draws: surface, clouds and shell share the atmosphere of the card.
 const draws=[];const R={w:1600,h:1000,meshes:new Map(),makeStars(){},makeMesh(){},deleteMesh(){},drawMesh(id,vp,model,o){draws.push({id,model,o});},uploadPixels:()=>({}),makeInstances(){},updateInstances(){},deleteInstances(){},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);w.eye=[0,10,40];w.vp=new Float32Array(16);
 let checked=0;
 for(let id=0;id<30&&checked<12;id++)for(const body of systemArchitecture(id).bodies.filter(b=>b.explorable)){
  const g=G[body.index].atmosphere,p=g.density<APPRECIABLE_DENSITY?0:pressureFromDensity(g.density),want=shellOf(p,g.haze);
  draws.length=0;w.drawPlanet(body,10,[0,0,0],1,[1,0,0]);
  const surface=draws.find(d=>d.o.material===12),shell=draws.find(d=>d.o.material===6),clouds=draws.find(d=>d.o.material===5);
  assert.ok(surface);assert.deepEqual(surface.o.shell,want||[0,0,0,0]);if(clouds)assert.deepEqual(clouds.o.shell,surface.o.shell);
  if(want){assert.ok(shell,'guscio mancante: '+body.index);assert.deepEqual(shell.o.shell,want);assert.ok(Math.abs(Math.hypot(shell.model[0],shell.model[1],shell.model[2])-want[0])<1e-6,'raggio del guscio');}
  else assert.equal(shell,undefined,'guscio su un pianeta senza aria: '+body.index);
  assert.equal(p>0,!P[body.index].exosphere);checked++;
 }
 assert.ok(checked>=12);
});
test('scena: il pianeta seguito porta nel pannello l\'atmosfera della sua scheda',()=>{
 const R={w:1600,h:1000,makeStars(){},makeMesh(){},deleteMesh(){},drawMesh(){},makeInstances(){},updateInstances(){},deleteInstances(){},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);
 const sys={...systemArchitecture(2),id:2,name:'Prova'};w.systems=[];w.systems[2]=sys;
 const unit=sys.bodies.find(b=>Number.isInteger(b.index)),ambient=sys.bodies.find(b=>!Number.isInteger(b.index));
 const F=w.followSubject({follow:{kind:'planet',slot:unit.slot},system:2,time:5});assert.equal(F.subject.atm.pressure,P[unit.index].pressure);assert.deepEqual(F.subject.atm.sky,G[unit.index].atmosphere.sky);assert.equal(F.subject.teff,sys.star.teff);
 assert.equal(w.followSubject({follow:{kind:'planet',slot:ambient.slot},system:2,time:5}).subject.atm,null);
});
