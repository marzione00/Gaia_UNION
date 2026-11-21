import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { TYPES, ROLES, ROLE_KEYS, buildType, GRAMMAR_STATIONS } from '../src/craft/grammar.js';
import { FAMILIES, FAMILY_KEYS } from '../src/craft/families.js';
import { MODULES, mount } from '../src/craft/modules.js';
import { Kit, dice } from '../src/craft/kit.js';
import { style, STYLE_KEYS } from '../src/craft/styles.js';
import { build, LOW_DETAIL } from '../src/craft/catalog.js';
// Type grammar of the stations (1.42): 60 modules, 12 families, 10 roles, 120 types with distinct outlines.
const glyphs=JSON.parse(fs.readFileSync(new URL('../assets/glyphs.json',import.meta.url),'utf8')).styles.body.glyphs;
const seedOf=(i,j=0)=>1000+i*7+j*131;
const finite=m=>{for(const v of m.v)if(!Number.isFinite(v))return false;const n=m.v.length/16;for(const i of m.i)if(i>=n)return false;return m.i.length%3===0;};

test('tipi: 120, uno per ruolo e famiglia, con nomi unici concordati e scritti con l\'atlante',()=>{
 assert.equal(ROLE_KEYS.length,10);assert.equal(FAMILY_KEYS.length,12);assert.equal(TYPES.length,120);
 assert.equal(new Set(TYPES.map(t=>t.key)).size,120);assert.equal(new Set(TYPES.map(t=>t.name)).size,120);
 for(const r of ROLE_KEYS)assert.equal(TYPES.filter(t=>t.role===r).length,12);
 for(const f of FAMILY_KEYS)assert.equal(TYPES.filter(t=>t.family===f).length,10);
 for(const t of TYPES){
  for(const ch of t.name+t.about)assert.ok(ch in glyphs,`${t.key}: «${ch}» manca nell'atlante`);
  assert.ok(t.name.startsWith(ROLES[t.role].noun+' '));assert.ok(t.name.endsWith(FAMILIES[t.family][ROLES[t.role].gender]));
  assert.ok(!/—/.test(t.about)&&t.about.length<220,t.key);
 }
 assert.equal(TYPES.find(t=>t.key==='fonderia-sfera').name,'Fonderia sferica');assert.equal(TYPES.find(t=>t.key==='abitazione-sfera').name,'Habitat sferico');
});
test('moduli: almeno 60, ognuno costruito su una presa in ogni stile, mesh valide entro la presa',()=>{
 const keys=Object.keys(MODULES);assert.ok(keys.length>=60,keys.length);
 for(const r of ROLE_KEYS)for(const m of [...ROLES[r].major,...ROLES[r].minor])assert.ok(MODULES[m],r+': '+m);
 for(const r of ROLE_KEYS)for(const m of ROLES[r].major)assert.equal(MODULES[m].role,r,m);
 for(const key of keys)for(const sk of STYLE_KEYS){
  const k=new Kit(style(sk));mount(k,dice(7,0),key,{p:[0,0,0],n:[0,1,0],L:3,R:1.2});const m=k.mesh();
  assert.ok(m.i.length>0&&finite(m),key+' '+sk);
  let lo=Infinity,hi=-Infinity,far=0;for(let i=0;i<m.v.length;i+=16){lo=Math.min(lo,m.v[i+1]);hi=Math.max(hi,m.v[i+1]);far=Math.max(far,Math.hypot(m.v[i],m.v[i+2]));}
  assert.ok(lo>-.3&&hi<3*1.25&&far<1.2*2.4,`${key} ${sk}: y ${lo.toFixed(2)}..${hi.toFixed(2)}, raggio ${far.toFixed(2)}`);
 }
});
const models=TYPES.map((t,i)=>STYLE_KEYS.map((sk,j)=>buildType(t,dice(seedOf(i,j),j),style(sk))));
test('ogni tipo in ogni stile: mesh valide, al massimo 30 000 triangoli, luci, raggio fra 4 e 15, ricetta',()=>{
 TYPES.forEach((t,i)=>models[i].forEach((m,j)=>{
  const id=t.key+' '+STYLE_KEYS[j];
  for(const p of m.parts)assert.ok(finite(p.mesh),id);
  assert.ok(m.triangles<=30000,id+': '+m.triangles);assert.ok(m.lights.length>=1,id);assert.ok(m.radius>4&&m.radius<15,id+': '+m.radius);
 }));
 const d=dice(5,0);buildType(TYPES[0],d,style('civile'));assert.ok(d.notes.some(n=>n.startsWith('modulo principale: '))&&d.notes.some(n=>n.startsWith('modulo secondario: ')));
});
test('determinismo, livello semplificato e catalogo: stesso seme stessa mesh, meno del 40 % dei triangoli',()=>{
 const a=buildType(TYPES[17],dice(99,2),style('fisica')),b=buildType(TYPES[17],dice(99,2),style('fisica'));
 assert.deepEqual(a.parts.map(p=>[...p.mesh.v.slice(0,64)]),b.parts.map(p=>[...p.mesh.v.slice(0,64)]));assert.equal(a.triangles,b.triangles);
 let full=0,low=0;
 TYPES.forEach((t,i)=>{const e={kind:'stazione',type:t.key,style:'civile',nth:0,seed:seedOf(i)},f=build(e),l=build(e,e.seed,{detail:LOW_DETAIL});full+=f.triangles;low+=l.triangles;assert.equal(l.parts.length,f.parts.length,t.key);assert.ok(Math.abs(l.radius/f.radius-1)<.03,t.key);assert.deepEqual(l.recipe,f.recipe);});
 assert.ok(low/full<.4,'quota '+(low/full).toFixed(3));
 assert.equal(Object.keys(GRAMMAR_STATIONS).length,120);
});
// Outlines: every model drawn from above, from the front and from the side on a 32 × 32 grid scaled to its
// radius; two types differ when the overlap of their outlines (intersection over union) is low.
const N=32;
function outline(model){
 const views=[[0,2],[0,1],[2,1]],out=views.map(()=>new Uint8Array(N*N)),R=model.radius*1.02;
 for(const m of [...model.parts.map(p=>p.mesh),...(model.field?[model.field]:[])])for(let t=0;t<m.i.length;t+=3){
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
test('sagome: tipi diversi hanno contorni diversi, e più ancora fra famiglie diverse',()=>{
 const shapes=TYPES.map((t,i)=>outline(models[i][STYLE_KEYS.indexOf('civile')]));
 const same=[],other=[];
 for(let a=0;a<TYPES.length;a++)for(let b=a+1;b<TYPES.length;b++){
  const v=overlap(shapes[a],shapes[b]),pair=TYPES[a].key+' ~ '+TYPES[b].key;
  assert.ok(v<.88,pair+': '+v.toFixed(3));
  (TYPES[a].family===TYPES[b].family?same:other).push(v);
  if(TYPES[a].family!==TYPES[b].family)assert.ok(v<.8,pair+': '+v.toFixed(3));
 }
 const median=v=>v.slice().sort((x,y)=>x-y)[v.length>>1];
 assert.ok(median(same)<.7,'mediana nella stessa famiglia '+median(same).toFixed(3));assert.ok(median(other)<.45,'mediana fra famiglie '+median(other).toFixed(3));
 // The test is able to see a difference: the same type in two styles overlaps more than two families do.
 assert.ok(overlap(shapes[0],outline(models[0][STYLE_KEYS.indexOf('fisica')]))>median(other));
});
