import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { SHIP_TYPES, SHIP_ROLES, SHIP_ROLE_KEYS, HULLS, HULL_KEYS, SHIP_MODULES, mountShip, buildShipType, shipTrade, GRAMMAR_SHIPS } from '../src/craft/shipclasses.js';
import { Kit, dice } from '../src/craft/kit.js';
import { style, STYLE_KEYS, DISCIPLINE_STYLES } from '../src/craft/styles.js';
import { CATALOG, EXTRAS, SHIP_EXTRAS, systemCraft, systemExtras, systemShipExtras, shipCount, build, LOW_DETAIL } from '../src/craft/catalog.js';
import { FLEET, RESOURCES, Economy } from '../src/craft/economy.js';
import { AREAS, systemArchitecture, bodyAtTime } from '../src/scene/systems.js';
import { asteroidBelt } from '../src/scene/minor-bodies.js';
import { sphereMesh } from '../src/renderer.js';
import { displayRadius } from '../src/scene/world.js';
import { placeStations, stationPosition } from '../src/craft/placement.js';
// Civil ship classes of the grammar (1.44.0): 40 modules, 12 hull families, 10 roles, 120 classes.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const finite=m=>{for(const v of m.v)if(!Number.isFinite(v))return false;const n=m.v.length/16;for(const i of m.i)if(i>=n)return false;return m.i.length%3===0;};
const seedOf=(i,j=0)=>2000+i*7+j*131;

test('classi: 120, una per ruolo e famiglia di scafo, con nomi unici concordati e scritti con l\'atlante',()=>{
 assert.equal(SHIP_ROLE_KEYS.length,10);assert.equal(HULL_KEYS.length,12);assert.equal(SHIP_TYPES.length,120);
 assert.equal(new Set(SHIP_TYPES.map(t=>t.name)).size,120);
 for(const t of SHIP_TYPES){for(const ch of t.name+t.about)assert.ok(ch in glyphs,`${t.key}: «${ch}»`);assert.ok(t.name.endsWith(HULLS[t.family][SHIP_ROLES[t.role].gender]));}
 assert.equal(SHIP_TYPES.find(t=>t.key==='cisterna-affusolato').name,'Cisterna affusolata');assert.equal(SHIP_TYPES.find(t=>t.key==='cargo-affusolato').name,'Cargo affusolato');
});
test('moduli di bordo: 40, ognuno costruito in ogni stile dentro la presa',()=>{
 const keys=Object.keys(SHIP_MODULES);assert.equal(keys.length,40);
 for(const r of SHIP_ROLE_KEYS){assert.equal(SHIP_ROLES[r].modules.length,4);for(const m of SHIP_ROLES[r].modules)assert.equal(SHIP_MODULES[m]?.role,r,m);}
 for(const key of keys)for(const sk of STYLE_KEYS){
  const k=new Kit(style(sk));mountShip(k,dice(3,0),key,{p:[0,0,0],n:[0,1,0],L:1.2,R:.7,S:.8});const m=k.mesh();assert.ok(m.i.length>0&&finite(m),key+' '+sk);
  for(let i=0;i<m.v.length;i+=16){const [x,y,z]=[m.v[i],m.v[i+1],m.v[i+2]];assert.ok(y>-.3&&y<1.2*1.8&&Math.abs(x)<.7*2+.3&&Math.abs(z)<.8*2+.3,`${key} ${sk}: ${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)}`);}
 }
 // On the starboard side (−x) the module still points its length towards the bow.
 const k=new Kit(style('civile'));mountShip(k,dice(3,0),'propulsore ausiliario',{p:[0,0,0],n:[-1,0,0],L:1.2,R:.7,S:.8});assert.ok(k.lights.every(l=>l.p[2]<0),'ugello verso poppa');
});
const models=SHIP_TYPES.map((t,i)=>STYLE_KEYS.map((sk,j)=>buildShipType(t,dice(seedOf(i,j),j),style(sk))));
test('ogni classe in ogni stile: mesh valide, al massimo 10 000 triangoli, luci, raggio, commercio valido',()=>{
 SHIP_TYPES.forEach((t,i)=>models[i].forEach((m,j)=>{const id=t.key+' '+STYLE_KEYS[j];for(const p of m.parts)assert.ok(finite(p.mesh),id);assert.ok(m.triangles<=10000,id+': '+m.triangles);assert.ok(m.lights.length>=1,id);assert.ok(m.radius>1.5&&m.radius<8,id+': '+m.radius);}));
 for(const t of SHIP_TYPES){const f=shipTrade(t,FLEET);assert.ok(f.capacity>0&&f.speed>0&&f.dock>0,t.key);assert.ok(f.carries.length&&f.carries.every(r=>RESOURCES[r]),t.key);assert.equal(f.idle,FLEET[SHIP_ROLES[t.role].fleet].idle);}
 assert.deepEqual(shipTrade(SHIP_TYPES.find(t=>t.role==='minerario'),FLEET).carries,['minerale','silicati','ghiaccio','terre']);
 const fast=shipTrade(SHIP_TYPES.find(t=>t.key==='corriere-affusolato'),FLEET),slow=shipTrade(SHIP_TYPES.find(t=>t.key==='corriere-modulare'),FLEET);assert.ok(fast.speed>slow.speed&&fast.capacity<slow.capacity);
 let full=0,low=0;SHIP_TYPES.forEach((t,i)=>{const e={kind:'nave',type:t.key,style:'civile',nth:0,seed:seedOf(i)},f=build(e),l=build(e,e.seed,{detail:LOW_DETAIL});full+=f.triangles;low+=l.triangles;assert.equal(l.parts.length,f.parts.length);assert.ok(Math.abs(l.radius/f.radius-1)<.03,t.key);});
 assert.ok(low/full<.5,'quota '+(low/full).toFixed(3));assert.equal(Object.keys(GRAMMAR_SHIPS).length,120);
});
const N=32;
function outline(model){
 const views=[[0,2],[0,1],[2,1]],out=views.map(()=>new Uint8Array(N*N)),R=model.radius*1.02;
 for(const m of model.parts.map(p=>p.mesh))for(let t=0;t<m.i.length;t+=3){
  const P=[0,1,2].map(j=>[m.v[m.i[t+j]*16],m.v[m.i[t+j]*16+1],m.v[m.i[t+j]*16+2]]);
  views.forEach(([a,b],w)=>{
   const q=P.map(p=>[(p[a]/R*.5+.5)*N,(p[b]/R*.5+.5)*N]),M=out[w],at=v=>Math.min(N-1,Math.max(0,Math.floor(v)));
   for(const p of q)M[at(p[1])*N+at(p[0])]=1;
   const area=(q[1][0]-q[0][0])*(q[2][1]-q[0][1])-(q[2][0]-q[0][0])*(q[1][1]-q[0][1]);if(Math.abs(area)<1e-9)return;
   for(let y=at(Math.min(q[0][1],q[1][1],q[2][1]));y<=at(Math.max(q[0][1],q[1][1],q[2][1]));y++)for(let x=at(Math.min(q[0][0],q[1][0],q[2][0]));x<=at(Math.max(q[0][0],q[1][0],q[2][0]));x++){
    const px=x+.5,py=y+.5,e=(A,B)=>(B[0]-A[0])*(py-A[1])-(B[1]-A[1])*(px-A[0]),w0=e(q[1],q[2]),w1=e(q[2],q[0]),w2=e(q[0],q[1]);
    if((w0>=0&&w1>=0&&w2>=0)||(w0<=0&&w1<=0&&w2<=0))M[y*N+x]=1;
   }
  });
 }
 return out;
}
const overlap=(A,B)=>A.reduce((s,M,w)=>{let i=0,u=0;for(let k=0;k<M.length;k++){i+=M[k]&B[w][k];u+=M[k]|B[w][k];}return s+(u?i/u:1);},0)/A.length;
test('sagome: classi diverse hanno contorni diversi, e più ancora fra famiglie di scafo diverse',()=>{
 const shapes=SHIP_TYPES.map((t,i)=>outline(models[i][STYLE_KEYS.indexOf('civile')])),same=[],other=[];
 for(let a=0;a<120;a++)for(let b=a+1;b<120;b++){const v=overlap(shapes[a],shapes[b]),pair=SHIP_TYPES[a].key+' ~ '+SHIP_TYPES[b].key;assert.ok(v<.93,pair+': '+v.toFixed(3));if(SHIP_TYPES[a].family===SHIP_TYPES[b].family)same.push(v);else{other.push(v);assert.ok(v<.82,pair+': '+v.toFixed(3));}}
 const median=v=>v.slice().sort((x,y)=>x-y)[v.length>>1];assert.ok(median(same)<.7,median(same).toFixed(3));assert.ok(median(other)<.5,median(other).toFixed(3));
});
test('catalogo: da 4 a 8 navi aggiunte per sistema, tutte le 120 classi, nomi e coppie classe-stile unici',()=>{
 assert.equal(SHIP_EXTRAS.length,AREAS.reduce((n,_,s)=>n+shipCount(s),0));assert.equal(new Set(SHIP_EXTRAS.map(e=>e.type)).size,120);
 const all=[...CATALOG,...EXTRAS,...SHIP_EXTRAS];assert.equal(new Set(all.map(e=>e.id)).size,all.length);assert.equal(new Set(all.map(e=>e.name)).size,all.length);
 assert.equal(new Set(SHIP_EXTRAS.map(e=>e.type+'/'+e.style)).size,SHIP_EXTRAS.length);
 AREAS.forEach((area,s)=>{const list=systemShipExtras(s);assert.equal(list.length,shipCount(s));assert.ok(list.length>=4&&list.length<=8);assert.equal(new Set(list.map(e=>e.family)).size,list.length,'famiglia ripetuta nel sistema '+s);
  list.forEach((e,k)=>{assert.equal(e.slot,30+k);assert.ok(['civile',DISCIPLINE_STYLES[area.sector]].includes(e.style));assert.ok(e.fleet&&e.drawn>0);for(const ch of e.name)assert.ok(ch in glyphs,e.id);});});
});
test('economia: le navi aggiunte viaggiano e trasportano merci',()=>{
 const rock=sphereMesh(6,4);
 for(const id of [2,13,20]){
  const system={...systemArchitecture(id),id};if(id%3===1){const b=asteroidBelt(system,rock);system.belt={inner:b.inner,outer:b.outer};}
  const entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id)],P=placeStations(system,entries,displayRadius);
  let T=0;const pos=p=>p.station!==undefined?stationPosition(P[p.station],T,s=>bodyAtTime(system.bodies.find(b=>b.slot===s),T).position):bodyAtTime(system.bodies.find(b=>b.slot===p.body),T).position;
  const E=new Economy({stations:P.map(p=>p.entry),ships:entries.filter(e=>e.kind==='nave'),bodies:system.bodies.map(b=>b.slot),seed:11+id,time:0,distance:(a,b)=>Math.hypot(...pos(a).map((v,i)=>v-pos(b)[i]))});
  const added=E.ships.filter(s=>s.entry.fleet);assert.ok(added.length>=systemShipExtras(id).length,'sistema '+id);
  const moved=new Set(),loaded=new Set();
  for(T=0;T<=900;T++){E.update(T);for(const s of added){if(s.phase==='travel')moved.add(s.id);if(s.cargo)loaded.add(s.id);}}
  assert.equal(moved.size,added.length,'sistema '+id+': navi aggiunte ferme');assert.ok(loaded.size>=added.length/2,'sistema '+id+': carichi '+loaded.size+' su '+added.length);
 }
});
