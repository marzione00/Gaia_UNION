import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetSurface } from '../src/worlds/surface.js';
import { prepareZone, PAD_R } from '../src/worlds/lander.js';
import { clearingOf } from '../src/worlds/sites.js';
import { FIND_KINDS, FIND_TARGET, FIND_STEP, MOST_FINDS, FIND_GAP, FIND_SEARCH, FIND_SCAN, MINERALS, findList, findModel, marksOf } from '../src/worlds/finds.js';
import { knownPlaces, PLACE_WORDS } from '../src/worlds/travel.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { EDGE, METRE } from '../src/worlds/explorer.js';
import { FIND_MARK, FIND_TINT, SITE_REACH } from '../src/scene/world.js';
import { cleanExplore } from '../src/store.js';
import { findsRow } from '../scripts/minori.mjs';
const { world, buildCost } = await import('../scripts/prestazioni-mondi.mjs');
// Minor places in the empty parts of the zones (1.78.0).
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const it=(x,d=1)=>x.toFixed(d).replace('.',',').replace(/^-(?=[\d,]*[1-9])/,'−').replace(/^-/,'');
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const P=planetPhysics(),SAMPLE=[0,4,7,28,40,77,114],zones=new Map(SAMPLE.map(i=>[i,prepareZone(planetSurface(i))]));
const titles=JSON.parse(read('content/catalogue.json')).modules.map(m=>m.title);

test('luoghi minori: il documento corrisponde al codice e le descrizioni seguono lo stile',()=>{
 const doc=read('docs/LUOGHI_MINORI.md');for(const r of STYLE)assert.ok(!r.test(doc),'LUOGHI_MINORI.md '+r);
 assert.ok(doc.startsWith('# Luoghi minori delle zone di atterraggio')&&doc.includes('`node scripts/minori.mjs`'));
 const rows=[...doc.matchAll(/^- \*\*(.+)\*\* \(pianeta (\d+), .+$/gm)];assert.equal(rows.length,125);
 for(const i of SAMPLE){const s=zones.get(i);assert.equal(rows.find(r=>r[2]===String(i+1))[0],findsRow({family:s.genome.family,finds:s.finds},i,titles));}
 // The example is the first planet, story by story; the counts of the summary agree with the rows.
 for(const x of zones.get(0).finds)assert.ok(doc.includes(`- **${x.name}** (${FIND_KINDS[x.kind].label}). ${x.story.join(' ')}`),x.name);
 const counts=rows.map(r=>Number(r[0].match(/: (\d+) luoghi minori/)[1])),total=counts.reduce((a,b)=>a+b,0);
 assert.ok(doc.includes(`da ${Math.min(...counts)} a ${Math.max(...counts)} luoghi minori`)&&doc.includes(`in tutto ${total.toLocaleString('it-IT')} sui 125 pianeti, di 7 tipi`));
 assert.ok(counts.every(n=>n<=MOST_FINDS)&&total>2500,total);
 for(const s of zones.values())for(const x of s.finds){assert.equal(x.story.length,3,x.name);for(const t of x.story){assert.ok(t.length>20&&/[.]$/.test(t),t);for(const r of STYLE)assert.ok(!r.test(t),t+' '+r);assert.ok(!/undefined|NaN|null|Infinity/.test(t),t);}}
});

test('luoghi minori: sulla terraferma più lontana da tutto, asciutti, lontani fra loro e dagli altri luoghi',()=>{
 assert.equal(FIND_TARGET,400);assert.equal(FIND_STEP,50);assert.equal(MOST_FINDS,40);assert.equal(FIND_GAP,90);assert.equal(FIND_SEARCH,120);
 for(const [i,s] of zones){
  const L=s.finds;assert.deepEqual(JSON.parse(JSON.stringify(prepareZone(planetSurface(i)).finds)),JSON.parse(JSON.stringify(L)));
  assert.ok(L.length>=1&&L.length<=MOST_FINDS,i+' '+L.length);assert.deepEqual(L.map(x=>x.id),L.map((_,j)=>'f'+j));assert.equal(new Set(L.map(x=>x.name)).size,L.length);
  const animals=s.species.some(sp=>sp.kind==='animal'&&sp.form!=='medusa'),clear=clearingOf([...s.sites,...s.rares,{x:s.pad.x,z:s.pad.z,r:42}]);
  for(const [j,x] of L.entries()){
   assert.ok(FIND_KINDS[x.kind],x.kind);if(x.kind==='ossa')assert.ok(animals,x.name);assert.equal(x.r,FIND_KINDS[x.kind].r);
   assert.ok(Math.abs(s.heightAt(x.x,x.z)-x.y)<.001&&(s.seaY===null||x.y>=s.seaY+.35),x.name);
   assert.ok(Math.max(Math.abs(x.x),Math.abs(x.z))>=122+x.r&&Math.abs(x.x)<=EDGE-x.r-30&&Math.abs(x.z)<=EDGE-x.r-30,x.name);
   assert.ok(!clear(x.x,x.z,x.r+8)&&!s.clear.blocked(x.x,x.z)&&Math.hypot(x.x-s.pad.x,x.z-s.pad.z)>PAD_R+x.r,x.name);
   for(const o of L.slice(j+1))assert.ok(Math.hypot(o.x-x.x,o.z-x.z)>=FIND_GAP-.02);
   // Rocks and plants leave their ground free.
   assert.ok(s.siteClear(x.x,x.z),x.name);
  }
  // The same kinds in turn, so every planet with enough places has all of them.
  const kinds=Object.keys(FIND_KINDS).filter(k=>FIND_KINDS[k].when(s));if(L.length>=kinds.length)assert.equal(new Set(L.map(x=>x.kind)).size,kinds.length,String(i));
 }
 // The empty parts are filled: on planets with dry land enough, almost every point has a place to see within 500 m.
 const near=(s,list)=>{const n=Math.floor(2*EDGE/(FIND_STEP*METRE)),at=k=>-EDGE+(k+.5)*FIND_STEP*METRE,m=[...marksOf(s),...list.map(x=>[x.x,x.z])];let land=0,ok=0;for(let j=0;j<n;j++)for(let k=0;k<n;k++){const x=at(k),z=at(j);if(s.seaY!==null&&s.heightAt(x,z)<s.seaY-.5)continue;land++;if(m.some(([a,b])=>Math.hypot(a-x,b-z)<=500*METRE))ok++;}return ok/land;};
 for(const i of [7,40]){const s=zones.get(i),a=near(s,[]),b=near(s,s.finds);assert.ok(b>=.97&&b>a+.1,i+' '+a+' '+b);}
 // A surface without biomes has none.
 assert.deepEqual(findList({field:{}}),[]);
});

test('luoghi minori: le formule e i numeri delle descrizioni',()=>{
 const G0=9.80665;let seen=new Set();
 for(const [i,s] of zones){const p=P[i],g=p.gravity;
  for(const x of s.finds){const t=x.story.join(' ');seen.add(x.kind);
   if(x.kind==='affioramento'){const M=MINERALS[x.mineral];assert.ok(t.includes(`${M.rho.toLocaleString('it-IT')} kg`)&&t.includes(`${it(M.rho*g*G0/1000,1)} kN, contro ${it(M.rho*G0/1000,1)} kN`),t);
    if(M.habit!=='crosta')assert.ok(t.includes(`fino a ${it(x.crystal/METRE*100,0)} cm`)&&x.crystal/METRE>=(M.habit==='cubo'?.06:.25)-1e-3&&x.crystal/METRE<=(M.habit==='cubo'?.15:.6)+1e-3,t);}
   if(x.kind==='grotta')assert.ok(t.includes(`${it(p.ts-273.15,0)} °C`)&&t.includes(`largo ${it(x.width/METRE,1)} m`),t);
   if(x.kind==='meteorite'){const R=x.size/METRE,m=4/3*Math.PI*R**3*7800;assert.ok(t.includes(`${Math.round(m/1000).toLocaleString('it-IT')} t`)&&t.includes(`${Math.round(.5*m*(p.escape*1000)**2/4.184e9).toLocaleString('it-IT')} tonnellate`)&&t.includes(`${it(p.escape,1)} km/s`),t);}
   if(x.kind==='faro'){const h=x.height/METRE,R=p.radius*6371e3;assert.ok(t.includes(`${it(Math.sqrt(2*R*h)/1000,1)} km`)&&t.includes(`alto ${it(h,0)} m`),t);}
   if(x.kind==='attrezzatura')assert.ok(t.includes(`${Math.round(p.flux*1361).toLocaleString('it-IT')} W/m²`)&&t.includes(`${Math.round(p.flux*1361*.4).toLocaleString('it-IT')} W`),t);
   if(x.kind==='cippo')assert.ok(t.includes(`${it(2*Math.PI/Math.sqrt(g*G0),2)} s, contro 2,01 s`)&&t.includes(`${it(g*G0,2)} m/s²`),t);
   if(x.kind==='ossa')assert.ok(t.includes(`${it(g,2)} g`)&&t.includes(`lungo ${it(x.length/METRE,0)} m`),t);
  }}
 assert.equal(seen.size,7);
 // The Earth's own values: a pendulum of 1 m beats in 2,01 s, and the horizon from 15 m is 13,8 km away.
 assert.equal(it(2*Math.PI/Math.sqrt(G0),2),'2,01');assert.equal(it(Math.sqrt(2*6371e3*15)/1000,1),'13,8');
});

test('luoghi minori: modelli validi ai due livelli di dettaglio, nello stesso posto',()=>{
 const box=m=>{const lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9];for(let k=0;k<m.v.length;k+=16)for(let q=0;q<3;q++){lo[q]=Math.min(lo[q],m.v[k+q]);hi[q]=Math.max(hi[q],m.v[k+q]);}return [lo,hi];};
 const kinds=m=>new Set(Array.from({length:m.v.length/16},(_,k)=>m.v[k*16+15]));
 const seen=new Set();
 for(const s of zones.values())for(const x of s.finds){
  const [a,b]=[findModel(s,x,0),findModel(s,x,1)];
  for(const m of [a.mesh,b.mesh]){assert.equal(m.stride,16);assert.ok(m.v.length%16===0&&m.i.length%3===0&&m.i.length>60,x.kind);assert.ok(m.v.every(Number.isFinite),x.kind);const n=m.v.length/16;assert.ok(m.i.every(k=>k<n),x.kind);}
  // Light enough for a zone with forty of them: the far model has a few hundred triangles.
  assert.ok(b.mesh.i.length<a.mesh.i.length&&a.mesh.i.length/3<4000&&b.mesh.i.length/3<1000,x.kind+' '+a.mesh.i.length/3+' '+b.mesh.i.length/3);
  assert.equal(a.blocks.length,b.blocks.length,x.kind);a.blocks.forEach((c,k)=>assert.deepEqual(c,b.blocks[k]));
  const [A,B]=[box(a.mesh),box(b.mesh)];for(let q=0;q<3;q++)assert.ok(B[0][q]>=A[0][q]-1&&B[1][q]<=A[1][q]+1,x.kind);
  assert.ok(Math.max(Math.abs(A[0][0]),Math.abs(A[1][0]),Math.abs(A[0][2]),Math.abs(A[1][2]))<=x.r+4,x.kind+' '+JSON.stringify(A));
  // Rock, ice and bone are lit as the ground (kind 0), made things as hulls (kind 4).
  const K=kinds(a.mesh);if(['faro','attrezzatura'].includes(x.kind))assert.deepEqual([...K],[4],x.kind);else if(['grotta','ossa'].includes(x.kind))assert.deepEqual([...K],[0],x.kind);else assert.deepEqual([...K].sort(),[0,4],x.kind);
  seen.add(x.kind);
 }
 assert.equal(seen.size,7);
});

test('luoghi minori nel mondo: modelli, scelta, scanner, bussola, mappa e diario',()=>{
 const ctx=world('high'),i=7;buildCost(ctx,i);const {R,w}=ctx,s=w.surface,L=s.finds;
 assert.deepEqual(w.features.slice(s.sites.length+s.rares.length).map(F=>F.o),L);assert.ok(w.features.slice(s.sites.length+s.rares.length).every(F=>F.type==='find'));
 const f=L.find(x=>x.kind==='faro')||L[0],j=s.sites.length+s.rares.length+L.indexOf(f);
 // The sites and rare places in reach are built first, then the minor places.
 let k=0;for(;k<400&&w.featureBuilt[j]<2;k++)w.zoneModels([f.x,f.y,f.z]);assert.equal(w.featureBuilt[j],2);assert.ok(R.meshes.has('zone-near-'+j));
 w.features.forEach((F,q)=>{if(F.type!=='find'&&Math.hypot(F.o.x-f.x,F.o.z-f.z)<SITE_REACH)assert.ok(w.featureBuilt[q]>=1,F.o.name);});
 assert.deepEqual(w.nearest([f.x,f.y,f.z]),{type:'find',index:L.indexOf(f)});
 assert.ok(FIND_MARK>200&&FIND_MARK<300&&FIND_TINT.length===4);assert.ok(Math.abs(FIND_SCAN/METRE-500)<1e-9);
 // Quick travel: the minor places known by the impulse (k) or registered (f).
 const known=knownPlaces(s,{k:[L[0].id],f:[L[1].id]});assert.deepEqual(known.filter(p=>p.kind==='minore').map(p=>p.id),[L[0].id,L[1].id]);
 assert.equal(known.find(p=>p.id===L[0].id).gap,L[0].r+2);assert.equal(PLACE_WORDS.minore,'luogo minore');
 // The diary keeps f0 to f39, also among the places detected.
 assert.deepEqual(cleanExplore({3:{s:[],l:[],f:['f0','f39','f40','f7','x','f07'],k:['f12','n2','f40','r3']}}),{3:{s:[],l:[],f:['f0','f39','f7'],k:['f12','n2','r3']}});
 const app=read('src/app.js');
 for(const t of ["type: 'find', index: k","'Luogo minore registrato: '","'Luoghi minori: '","detect((s.finds || []).map(o => ({ ...o, type: 'find' })), A.x, A.z, FIND_SCAN)","kind: 'find', on","p.kind === 'minore'","t.type === 'find' ? list[k].data.r + 2","Luogo minore: ${find.name}"])assert.ok(app.includes(t),t);
});
