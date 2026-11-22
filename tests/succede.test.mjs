import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture } from '../src/scene/systems.js';
import { perspective, lookAt, mul, project } from '../src/renderer.js';
import { World, FOLLOW_ZOOM, FOLLOW_LIMITS, followFrame, followKey } from '../src/scene/world.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { CONCEPT_UNITS, WIEN, T_SUN, V_EARTH, orbitOf, starOf, whatHappens } from '../src/craft/succede.js';
// «Che cosa succede» (1.58.0): the camera follows an object of the system and a panel explains it with live
// numbers and a concept of a unit worked out on them.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const catalogue=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url),'utf8')),modules=catalogue.modules||catalogue;
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const style=(t,max)=>{assert.equal(typeof t,'string');assert.ok(t.length>0&&(!max||t.length<=max),'testo di '+t.length+' caratteri: '+t);for(const r of STYLE)assert.ok(!r.test(t),'costruzione vietata: '+t);for(const c of t)assert.ok(c===' '||glyphs[c],'glifo mancante «'+c+'» in '+t);assert.ok(!/NaN|undefined|Infinity|null/.test(t),'valore non numerico: '+t);};
/** Every panel: a tag, a title, at most six rows with short labels, a concept of a known unit. */
function check(v){
 style(v.tag,28);assert.equal(v.tag,v.tag.toUpperCase());style(v.title,48);if(v.subtitle)style(v.subtitle,90);
 assert.ok(v.rows.length>=2&&v.rows.length<=6,'righe: '+v.rows.length);for(const [l,x] of v.rows){style(l,30);style(x,52);}
 assert.ok(CONCEPT_UNITS[v.concept.unit],'unità sconosciuta: '+v.concept.unit);assert.equal(v.concept.title,CONCEPT_UNITS[v.concept.unit]);style(v.concept.text,330);
 return v;
}
const num=t=>Number(t.replace(',','.'));
test('unità: i concetti citati esistono nel catalogo con lo stesso titolo',()=>{
 for(const [id,title] of Object.entries(CONCEPT_UNITS)){const m=modules.find(x=>x.id===id);assert.ok(m,'unità assente: '+id);assert.equal(m.title,title);}
});
test('fisica: periodo, velocità e luce dei pianeti come nelle schede, luminosità delle stelle dalla legge di Stefan-Boltzmann',()=>{
 const earth=orbitOf(1,1,1);assert.ok(Math.abs(earth.days-365.25)<1e-9);assert.equal(earth.speed,V_EARTH);assert.equal(earth.flux,1);
 for(const c of planetPhysics()){const o=orbitOf(c.a,c.star.mass,c.star.luminosity);assert.ok(Math.abs(o.days/c.period-1)<1e-9,c.index+' periodo');assert.ok(Math.abs(o.flux/c.flux-1)<1e-9,c.index+' flusso');assert.ok(Math.abs(o.years**2/c.a**3-o.kepler)<1e-9);}
 assert.ok(Math.abs(starOf(T_SUN,1).L-1)<1e-12);assert.ok(Math.abs(starOf(T_SUN,1).peak-502.1)<.1);
 for(let id=0;id<30;id++){const st=systemArchitecture(id).star;assert.ok(Math.abs(starOf(st.teff,st.radius).L/st.luminosity-1)<.02,'sistema '+id);}
});
test('pannelli: numeri ricalcolati per navi, stazioni, mezzi di servizio, pianeti e stelle',()=>{
 // A ship near the end: 47.3 u in 34.6 s, 12.1 u left, 11 s to go while it brakes.
 let v=check(whatHappens({kind:'ship',name:'Cargo Alfa',typeName:'Cargo',style:'civile',travel:true,from:'Porto',to:'Raffineria',L:47.3,T:34.6,rem:12.1,left:11,cargo:{name:'metalli',unit:'t',amount:50}}));
 const speed=47.3/34.6;assert.equal(v.concept.unit,'physics-03');assert.ok(v.rows.some(r=>r[1]===speed.toFixed(2).replace('.',',')+' u/s'));assert.ok(v.concept.text.includes((12.1/speed).toFixed(1).replace('.',',')+' s'));
 assert.ok(v.concept.text.includes('frena per attraccare'),'nave in frenata');
 assert.ok(check(whatHappens({kind:'ship',name:'Cargo Alfa',typeName:'Cargo',style:'civile',travel:true,to:'Raffineria',L:40,T:40,rem:35,left:30,cargo:null})).concept.text.includes('accelerare'),'nave in accelerazione');
 v=check(whatHappens({kind:'ship',name:'Cargo Beta',typeName:'Cargo',style:'civile',travel:false,where:'Porto',task:'Carica merci',cargo:{name:'acqua',unit:'t',amount:30},capacity:40,left:5}));
 assert.equal(v.concept.unit,'chemistry-15');assert.ok(v.rows.some(r=>r[1]==='75 % di 40 t'));
 v=check(whatHappens({kind:'ship',name:'Fregata Gamma',typeName:'Fregata',style:'difesa',travel:false,where:'Base',task:'Sosta',cargo:null,capacity:0,left:5,frameSpeed:.0731}));assert.equal(v.concept.unit,'physics-02');assert.ok(v.concept.text.includes('0,07 u/s'));
 // A recipe with two inputs: the limiting one runs out first.
 v=check(whatHappens({kind:'station',name:'Fonderia',typeName:'Fonderia',style:'chimica',process:'Fusione',level:2,make:[{name:'metalli',unit:'t',rate:.4,stock:3,cap:90}],use:[{name:'minerale',unit:'t',rate:.8,stock:40},{name:'energia',unit:'celle',rate:.2,stock:6}],producing:1,missing:[],frameSpeed:.05,chain:true,catalog:'x'}));
 assert.equal(v.concept.unit,'chemistry-14');assert.ok(v.rows.some(r=>r[0]==='Finisce prima'&&r[1]==='energia, in 30 s'));assert.ok(v.concept.text.includes('basta per 30 s'));assert.equal(v.drill,true);
 v=check(whatHappens({kind:'station',name:'Miniera',typeName:'Miniera',style:'civile',process:'Estrazione',level:1,make:[{name:'minerale',unit:'t',rate:.6,stock:20,cap:200}],use:[],producing:1,missing:[],frameSpeed:.05}));
 assert.equal(v.concept.unit,'chemistry-17');assert.ok(v.concept.text.includes('36,0 t al minuto')&&v.concept.text.includes('in 300 s'));
 v=check(whatHappens({kind:'station',name:'Porta',typeName:'Porta',style:'civile',process:'Scambi',level:1,make:[],use:[],producing:1,missing:[],gate:{imports:3,exports:5},frameSpeed:.05}));assert.equal(v.concept.unit,'chemistry-15');assert.ok(v.concept.text.includes('importa 3')&&v.concept.text.includes('esporta 5'));
 v=check(whatHappens({kind:'station',name:'Ripetitore',typeName:'Ripetitore',style:'civile',process:'',level:1,make:[],use:[],producing:0,missing:[],frameSpeed:.0412}));assert.equal(v.concept.unit,'physics-02');
 // Service craft: a shuttle and a tug of 3.6 u in 4 s, circles, the belt, a tanker and an escort.
 v=check(whatHappens({kind:'service',serviceKind:'navetta',role:'spola',name:'Navetta di servizio 3',typeName:'Navetta',facts:{from:'A',to:'B',d:3.6,T:4,left:2,moving:true,line:false}}));
 assert.equal(v.concept.unit,'physics-03');assert.ok(v.concept.text.includes('0,90 u/s')&&v.concept.text.includes('1,35 u/s'));
 v=check(whatHappens({kind:'service',serviceKind:'rimorchiatore',role:'traino',name:'Rimorchiatore 7',typeName:'Rimorchiatore',facts:{from:'Cantiere',to:'B',d:3.6,T:4,left:2,moving:true,out:true}}));
 assert.equal(v.concept.unit,'physics-04');assert.ok(v.concept.text.includes('6d/T² = 1,350 u/s²'));
 for(const [role,facts] of [['attesa',{station:'Porto',omega:.12,R:.7,cycle:60,turn:20,wait:12}],['miniera',{station:'Miniera',omega:.3,R:.43}],['ronda',{station:'Porto',R:.31,lap:80,check:false,next:5}]]){
  v=check(whatHappens({kind:'service',serviceKind:'chiatta',role,name:'Mezzo 1',typeName:'Mezzo',facts}));assert.equal(v.concept.unit,'physics-13');
  const omega=role==='ronda'?2*Math.PI/80:facts.omega;assert.ok(v.concept.text.includes((omega*facts.R).toFixed(3).replace('.',',')+' u/s'),role);assert.ok(v.rows.some(r=>r[1]===(2*Math.PI/omega).toFixed(1).replace('.',',')+' s'),role);
 }
 v=check(whatHappens({kind:'service',serviceKind:'minatore',role:'fascia',name:'Minatore 9',typeName:'Minatore',facts:{omega:.0008,r:30.5,fill:.42,fillTime:120}}));assert.equal(v.concept.unit,'physics-10');assert.ok(v.concept.text.includes('7854 s')&&v.concept.text.includes('0,0244 u/s'));
 v=check(whatHappens({kind:'service',serviceKind:'cisterna',role:'rifornimento',name:'Cisterna 2',typeName:'Cisterna',facts:{ship:'Cargo Alfa',park:'Porta',left:6,transfer:12}}));assert.equal(v.concept.unit,'chemistry-15');
 check(whatHappens({kind:'service',serviceKind:'cisterna',role:'rifornimento',name:'Cisterna 2',typeName:'Cisterna',facts:{ship:null,park:'Porta',left:null,transfer:null}}));
 v=check(whatHappens({kind:'service',serviceKind:'scorta',role:'scorta',name:'Caccia di scorta 1',typeName:'Caccia',facts:{convoy:'Convoglio da Alfa',docked:false},speed:1.234}));assert.equal(v.concept.unit,'physics-02');assert.equal(v.style,'difesa');assert.ok(v.concept.text.includes('1,23 u/s'));
 // An Earth twin around a Sun twin, and the Sun itself.
 v=check(whatHappens({kind:'planet',name:'Terrestre',a:1,M:1,L:1,teq:255,unit:{id:'physics-13',title:'Orbite circolari'}}));
 assert.equal(v.concept.unit,'physics-13');assert.ok(v.rows.some(r=>r[1]==='365,3 giorni')&&v.rows.some(r=>r[1]==='29,8 km/s')&&v.rows.some(r=>r[1]==='255 K'));assert.equal(v.open,'physics-13');
 assert.ok(check(whatHappens({kind:'planet',name:'Gigante',a:5.2,M:1,L:1,teq:null,unit:null})).rows.some(r=>r[1]==='11,86 anni'));
 v=check(whatHappens({kind:'star',name:'Stella di Prova',spt:'G2V',teff:5772,L:1,R:1,M:1}));assert.equal(v.concept.unit,'physics-30');assert.ok(v.rows.some(r=>r[1]===(WIEN/5772).toFixed(0)+' nm'));assert.ok(v.concept.text.includes('= 1,0000'));
 assert.throws(()=>whatHappens({kind:'boh'}));
});
test('camera: segue ogni tipo di oggetto, lo mette nel punto previsto dello schermo, rinuncia quando esce dalla scena',()=>{
 const made=new Set(),sets=new Map();
 const R={w:1600,h:1000,makeStars(){},makeMesh(id){made.add(id);},deleteMesh(){},drawMesh(){},makeInstances(key,mesh,data){sets.set(key,{mesh,n:data.length/8});},updateInstances(key,data){sets.get(key).n=data.length/8;},deleteInstances(key){sets.delete(key);},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);
 const sys={...systemArchitecture(13),id:13,name:'Area di prova'};w.systems=[];w.systems[13]=sys;w.cameraSpace='system';w.travelling=false;
 const s={scene:'system',system:13,time:30,yaw:.3,pitch:.48,distance:34,paused:true};
 w.camera('system',s);w.projections=[];for(let k=0;k<3;k++){s.time+=1;w.projections=[];w.drawStations(s,13,sys);}
 const life=w.craft.life,service=w.craft.service.find(v=>v.role==='ronda'),body=sys.bodies.find(b=>!Number.isInteger(b.index)),unit=sys.bodies.find(b=>Number.isInteger(b.index));
 const cases=[['station',{kind:'station',k:0}],['ship',{kind:'ship',id:life.ships[0].id,visitor:false}],['service',{kind:'service',id:service.id,plan:w.craft.serviceKey}],['planet',{kind:'planet',slot:body.slot}],['planet',{kind:'planet',slot:unit.slot}],['star',{kind:'star'}]];
 for(const [width,height] of [[1600,1000],[390,844]]){
  R.w=width;R.h=height;const frame=followFrame(width,height);
  for(const [kind,f] of cases){
   s.follow=f;s.followZoom=null;w.camera('system',s);
   const F=w.followed;assert.ok(F,'oggetto non seguito: '+kind);assert.equal(F.kind,kind);
   const xy=project(F.position,w.vp,width,height);assert.ok(Math.abs(xy[0]-frame.center[0])<1.5&&Math.abs(xy[1]-frame.center[1])<1.5,`${kind} a ${xy[0].toFixed(1)},${xy[1].toFixed(1)} invece di ${frame.center}`);
   const d=Math.hypot(...w.eye.map((v,i)=>v-w.target[i]));assert.ok(Math.abs(d-Math.max(.1,FOLLOW_ZOOM[kind]*F.radius))<1e-6,kind+' distanza');
   const sub={...F.subject};if(sub.kind==='planet'&&sub.unit){const m=modules[sub.unit.index]||modules[0];sub.unit={id:m.id,title:m.title};}
   check(whatHappens(sub));
  }
 }
 // Zoom within limits, and objects that leave the scene.
 assert.deepEqual(FOLLOW_LIMITS,[2.2,40]);
 s.follow={kind:'station',k:0};s.followZoom=20;w.camera('system',s);assert.ok(Math.abs(Math.hypot(...w.eye.map((v,i)=>v-w.target[i]))-20*w.followed.radius)<1e-6);
 for(const f of [{kind:'ship',id:99999,visitor:false},{kind:'service',id:0,plan:'altro piano'},{kind:'planet',slot:99},{kind:'station',k:999}]){s.follow=f;w.camera('system',s);assert.equal(w.followed,null,JSON.stringify(f));}
 assert.notEqual(followKey({kind:'ship',id:3}),followKey({kind:'ship',id:3,visitor:true}));
 // The camera moves smoothly to the object when the follow starts.
 s.paused=false;s.lastFrameMs=16;s.follow=null;w.camera('system',s);w.cameraProgress=1;s.follow={kind:'star'};w.camera('system',s);assert.ok(w.cameraProgress<1,'passaggio senza transizione');
});
test('scelta: stelle indicabili, stazioni e pianeti raggiungibili fra cento mezzi di servizio, marchi con il loro oggetto da seguire',()=>{
 const R={w:1600,h:1000,makeStars(){},makeMesh(){},deleteMesh(){},drawMesh(){},makeInstances(){},updateInstances(){},deleteInstances(){},shadowKey:null,sceneQuality:'high'};
 const biomes=JSON.parse(fs.readFileSync(new URL('../assets/scenes/manifest.json',import.meta.url))).biomes,w=new World(R,{},biomes);
 const sys={...systemArchitecture(2),id:2,name:'Area di prova'};w.systems=[];w.systems[2]=sys;w.cameraSpace='system';w.travelling=false;
 const s={scene:'system',system:2,time:40,yaw:0,pitch:.48,distance:34,paused:true};w.camera('system',s);w.cameraProgress=1;
 for(let k=0;k<2;k++){s.time+=1;w.projections=[];w.drawStations(s,2,sys);}
 const craft=w.projections.filter(p=>p.type==='craft');assert.ok(craft.length>60);
 for(const p of craft)assert.ok(p.follow&&['station','ship','service'].includes(p.follow.kind),'marchio senza oggetto da seguire');
 const station=craft.filter(p=>p.follow.kind==='station'&&p.x>0&&p.x<R.w&&p.y>0&&p.y<R.h);assert.ok(station.length>5);
 for(const p of station){const hit=w.pick(p.x,p.y,s);assert.ok(hit&&hit.index===p.index,'stazione coperta da '+(hit?.entry?.name||'nulla'));}
 const star=project([0,0,0],w.vp,R.w,R.h),hit=w.pick(star[0],star[1],s);assert.ok(hit,'stella non indicabile');
 if(hit.type==='star')assert.equal(hit.index,2);
});
