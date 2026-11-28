import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetSurface } from '../src/worlds/surface.js';
import { siteList, clearingOf } from '../src/worlds/sites.js';
import { RARE_KINDS, RARE_GAP, RARE_INNER, MOST_RARE, rareList, rareModel, reliefOf, boiling, frost, LAVA_POWER } from '../src/worlds/wonders.js';
import { axesOf, bearingOf, pointOf, sideAngle, compassMarks, detect, distanceText, SCAN_RANGE, COMPASS_FIELD } from '../src/worlds/compass.js';
import { dayOf, sunAt } from '../src/worlds/ecosystem.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { EDGE, METRE } from '../src/worlds/explorer.js';
import { CORE } from '../src/worlds/field.js';
import { cleanExplore } from '../src/store.js';
const { allRares, raresMarkdown } = await import('../scripts/rari.mjs');
const { world, measureSurface, buildCost } = await import('../scripts/prestazioni-mondi.mjs');
// Rare natural places of the zone, compass and long-range scanner (1.74.0).
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const it=(x,d=1)=>x.toFixed(d).replace('.',',').replace(/^-(?=[\d,]*[1-9])/,'−').replace(/^-/,'');
const P=planetPhysics(),data=allRares();

test('luoghi rari: il documento corrisponde al codice e le descrizioni seguono lo stile',()=>{
 const doc=fs.readFileSync(new URL('../docs/LUOGHI_RARI.md',import.meta.url),'utf8');
 assert.equal(doc,raresMarkdown(data));for(const r of STYLE)assert.ok(!r.test(doc),'LUOGHI_RARI.md '+r);
 const all=data.flatMap(d=>d.rares);assert.ok(all.length>700,all.length);
 for(const k of Object.keys(RARE_KINDS))assert.ok(all.some(x=>x.kind===k),k);
 for(const x of all){assert.ok(x.story.length>=3&&x.story.length<=4,x.name);for(const t of x.story){assert.ok(t.length>20&&/[.]$/.test(t),t);for(const r of STYLE)assert.ok(!r.test(t),t+' '+r);assert.ok(!/undefined|NaN|null|Infinity/.test(t),t);}}
});

test('luoghi rari: uno per tipo, nei biomi e con la fisica giusta, lontani da base, siti e fra loro',()=>{
 data.forEach((d,i)=>{
  const s=planetSurface(i),sites=siteList(s),clear=clearingOf(sites),L=d.rares,p=P[i];
  assert.deepEqual(JSON.parse(JSON.stringify(rareList(s,sites))),JSON.parse(JSON.stringify(L)));
  assert.ok(L.length>=3&&L.length<=MOST_RARE,i+' '+L.length);assert.deepEqual(L.map(x=>x.id),L.map((_,j)=>'n'+j));
  assert.equal(new Set(L.map(x=>x.kind)).size,L.length);assert.equal(new Set(L.map(x=>x.name)).size,L.length);
  for(const [j,x] of L.entries()){
   const K=RARE_KINDS[x.kind];assert.ok(K.when(p,s),x.name);assert.ok(K.biomes.includes(x.biome),x.name);
   if(!K.shore)assert.equal(s.field.biomeAt(x.x,x.z).id,x.biome,x.name);
   assert.ok(Math.hypot(x.x,x.z)>=RARE_INNER&&Math.abs(x.x)<=EDGE-K.r-20+16&&Math.abs(x.z)<=EDGE-K.r-20+16,x.name);
   for(const o of L.slice(j+1))assert.ok(Math.hypot(o.x-x.x,o.z-x.z)>=RARE_GAP-.02);
   assert.ok(!clear(x.x,x.z,30),x.name);assert.ok(Math.abs(s.heightAt(x.x,x.z)-x.y)<.001);
   if(K.shore)assert.ok(Math.abs(x.y-s.seaY-.1)<=.36,x.name);else if(s.seaY!==null)assert.ok(x.y>=s.seaY+1.5-.01,x.name);
   if(K.relief)assert.ok(Math.max(Math.abs(x.x),Math.abs(x.z))-x.r>=CORE/2,x.name);
  }
 });
 // Some kinds are common, others rare: the most frequent is on more planets than the least by a factor of five.
 const by=Object.keys(RARE_KINDS).map(k=>data.filter(d=>d.rares.some(x=>x.kind===k)).length);assert.ok(Math.max(...by)>=5*Math.min(...by),by.join());
});

test('luoghi rari: le formule e i numeri delle descrizioni',()=>{
 assert.ok(Math.abs(boiling(1.01325)-100)<.01);assert.ok(Math.abs(boiling(5.73)-157)<2.5);assert.ok(Math.abs(boiling(.5)-81.3)<1.5);
 assert.ok(Math.abs(frost(1.01325)+78.5)<.01);assert.ok(Math.abs(frost(.006)+126.5)<3);assert.ok(Math.abs(LAVA_POWER-217.8e3)<200);
 data.forEach((d,i)=>{const p=P[i],s=planetSurface(i),g=s.genome.gravity,lat=Math.abs(axesOf(s).lat);
  for(const x of d.rares){const t=x.story.join(' ');
   if(x.kind==='sorgente')assert.ok(t.includes(`${it(boiling(p.pressure),0)} °C`)&&boiling(p.pressure)-(p.ts-273.15)>=30,t);
   if(x.kind==='ragni')assert.ok(t.includes(`${it(frost(p.pressure),0)} °C`),t);
   if(x.kind==='cratere'){const E=.5*p.escape**2;assert.ok(t.includes(`${it(p.escape,1)} km/s`)&&t.includes(`${it(E,0)} MJ`)&&t.includes(`${it(E/4.184,0)} volte`),t);assert.ok(t.includes(`largo ${it(x.size*2/METRE,0)} m`));}
   if(x.kind==='lava')assert.ok(t.includes(`${it(LAVA_POWER/1000,0)} kW`)&&t.includes(`${it(LAVA_POWER/(p.flux*1361),0)} volte`),t);
   if(x.kind==='inselberg')assert.ok(t.includes(`${it(2700*9.80665*g*x.height/METRE/1e6,1)} MPa`),t);
   if(x.kind==='masso'){const tn=4/3*Math.PI*x.boulder.reduce((a,b)=>a*b,1)/METRE**3*2.7;assert.ok(t.includes(`${it(tn*9.80665*g,0)} kN`),t);}
   if(x.kind==='arco'&&Math.abs(g-1)>=.05)assert.ok(t.includes(`${it(g<1?1/g:g,2)} volte`),t);
   if(x.kind==='penitenti')assert.ok(t.includes(`${it(90-lat*180/Math.PI,0)}°`),t);
   if(x.kind==='barcane')assert.ok(t.includes(`${it(x.highest/x.lowest,1)} volte`)&&t.includes(`${it(x.highest/METRE,1)} m`),t);
  }});
});

test('luoghi rari: il rilievo dei crateri, dei pozzi di lava, delle sorgenti, delle saline e delle dune',()=>{
 assert.equal(reliefOf([]),null);
 const find=k=>{for(const [i,d] of data.entries()){const x=d.rares.find(o=>o.kind===k);if(x)return [i,x];}};
 const [ic,c]=find('cratere'),f=reliefOf([c]);assert.ok(Math.abs(f(c.x,c.z,0)+c.depth)<1e-4);assert.ok(f(c.x+c.size,c.z,0)>0);assert.equal(f(c.x+c.size*2.4,c.z,0),0);
 const [,l]=find('lava'),fl=reliefOf([l]);assert.ok(fl(l.x,l.z,l.y)<-l.depth*.99&&fl(l.x+l.size+2.5,l.z,l.y)>.5);
 const [,w]=find('sorgente'),fw=reliefOf([w]);assert.ok(Math.abs(fw(w.x,w.z,w.y)+1.4)<.01&&Math.abs(fw(w.x+3,w.z,w.y+.7)+2.1)<.01);
 const [,q]=find('poligoni'),fq=reliefOf([q]);assert.ok(Math.abs(fq(q.x+3,q.z,q.y+2)+2)<1e-9);assert.equal(fq(q.x+q.size+9,q.z,q.y+2),0);
 const [,b]=find('barcane'),fb=reliefOf([b]);let top=0;for(let z=-70;z<=70;z+=1)for(let x=-70;x<=70;x+=1)top=Math.max(top,fb(b.x+x,b.z+z,0));assert.ok(top>b.highest*.9&&top<=b.highest+1e-9,top);
 // The surface adds the relief outside the square of the stations, and the ground there follows it.
 const s=planetSurface(ic),y0=s.heightAt(c.x,c.z);s.setRelief(reliefOf(data[ic].rares));assert.ok(Math.abs(s.heightAt(c.x,c.z)-(y0-c.depth))<1e-6);assert.equal(s.heightAt(3,4),planetSurface(ic).heightAt(3,4));
});

test('luoghi rari: modelli validi ai due livelli di dettaglio, nello stesso posto',()=>{
 const box=m=>{const lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9];for(let k=0;k<m.v.length;k+=16)for(let q=0;q<3;q++){lo[q]=Math.min(lo[q],m.v[k+q]);hi[q]=Math.max(hi[q],m.v[k+q]);}return [lo,hi];};
 const seen=new Set();
 data.forEach((d,i)=>{if(d.rares.every(x=>seen.has(x.kind)))return;const s=planetSurface(i);s.setRelief(reliefOf(d.rares));
  for(const x of d.rares){if(seen.has(x.kind))continue;seen.add(x.kind);
   const [a,b]=[rareModel(s,x,0),rareModel(s,x,1)];
   for(const m of [a.mesh,b.mesh]){assert.equal(m.stride,16);assert.ok(m.v.length%16===0&&m.i.length%3===0&&m.i.length>300,x.kind);assert.ok(m.v.every(Number.isFinite),x.kind);const n=m.v.length/16;assert.ok(m.i.every(k=>k<n),x.kind);}
   assert.ok(b.mesh.i.length<a.mesh.i.length&&a.mesh.i.length/3<20000,x.kind+' '+a.mesh.i.length/3);
   assert.equal(a.blocks.length,b.blocks.length,x.kind);a.blocks.forEach((c,k)=>assert.ok(Math.hypot(c[0]-b.blocks[k][0],c[1]-b.blocks[k][1])<.05,x.kind));
   const [A,B]=[box(a.mesh),box(b.mesh)];for(let q=0;q<3;q++)assert.ok(B[0][q]>=A[0][q]-3&&B[1][q]<=A[1][q]+3,x.kind);
   // Everything lies on the ground of the place, which rocks and plants leave free.
   assert.ok(Math.max(Math.abs(A[0][0]),Math.abs(A[1][0]),Math.abs(A[0][2]),Math.abs(A[1][2]))<=x.r+6,x.kind+' '+JSON.stringify(A));
  }});
 assert.equal(seen.size,Object.keys(RARE_KINDS).length);
});

test('bussola e impulso dello scanner',()=>{
 const s=planetSurface(5),A=axesOf(s),D=dayOf(s.genome,s.site,s.light.direction);
 assert.ok(Math.abs(Math.hypot(...A.north)-1)<1e-9&&Math.abs(A.north[0]*A.east[0]+A.north[1]*A.east[1])<1e-9);
 // Facing north the east is on the right; the sun rises in the east.
 assert.ok(Math.abs(sideAngle(A.north,A.east)-90)<1e-9);
 const morning=sunAt(D,((.3-D.start+1)%1)*D.seconds);assert.ok(morning.dir[0]*A.east[0]+morning.dir[2]*A.east[1]>0);
 assert.equal(bearingOf(A,...A.north),0);assert.ok(Math.abs(bearingOf(A,...A.east)-90)<1e-9);assert.equal(pointOf(44),'NE');assert.equal(pointOf(359),'N');assert.equal(pointOf(225),'SO');
 for(let t=0;t<40;t++){const a=t*.37,b=t*1.91,f=[Math.cos(a),Math.sin(a)],d=[Math.cos(b),Math.sin(b)];const diff=((bearingOf(A,...d)-bearingOf(A,...f)+540)%360)-180;assert.ok(Math.abs(sideAngle(f,d)-diff)<1e-6);}
 const marks=compassMarks(A,A.north,0,0,[{x:A.east[0]*100,z:A.east[1]*100,id:'a'},{x:-A.north[0]*50,z:-A.north[1]*50,id:'b'}]);
 assert.deepEqual(marks.filter(m=>m.name).map(m=>m.name),['N','NE','NO']);
 const a=marks.find(m=>m.id==='a'),b=marks.find(m=>m.id==='b');assert.ok(Math.abs(a.side-60)<1e-9&&!a.inside&&Math.abs(a.distance-100)<1e-9);assert.ok(Math.abs(Math.abs(b.side)-60)<1e-9&&!b.inside);
 assert.deepEqual(detect([{x:900,z:0,id:'f'},{x:10,z:0,id:'n'},{x:500,z:0,id:'m'}],0,0).map(o=>o.id),['n','m']);assert.equal(SCAN_RANGE,820);assert.equal(COMPASS_FIELD,120);
 assert.equal(distanceText(820),'1,3 km');assert.equal(distanceText(100*METRE),'100 m');
 assert.deepEqual(cleanExplore({3:{s:[],l:[],n:['n0','n8','n9','x'],k:['r3','n2','r19','z']}}),{3:{s:[],l:[],n:['n0','n8'],k:['r3','n2']}});
});

test('luoghi rari nel mondo: rilievo, modelli, terreno sgombro, scanner e scheda',()=>{
 const ctx=world('high'),i=data.findIndex(d=>d.rares.some(x=>x.kind==='cratere')&&d.rares.length>=6);buildCost(ctx,i);const {R,w}=ctx,s=w.surface;
 assert.deepEqual(JSON.parse(JSON.stringify(s.rares)),JSON.parse(JSON.stringify(data[i].rares)));assert.equal(typeof s.reliefAt,'function');
 assert.deepEqual(w.features.slice(s.sites.length).map(F=>F.o),s.rares);
 const c=s.rares.find(x=>x.kind==='cratere'),j=s.sites.length+s.rares.indexOf(c);
 assert.ok(s.heightAt(c.x,c.z)<c.y-c.depth*.99);for(const x of s.rares)assert.ok(s.siteClear(x.x,x.z),x.name);
 for(let k=0;k<4;k++)w.zoneModels([c.x,c.y,c.z]);assert.equal(w.featureBuilt[j],2);assert.ok(R.meshes.has('zone-near-'+j));
 assert.deepEqual(w.nearest([c.x,c.y,c.z]),{type:'rare',index:s.rares.indexOf(c)});
 const r=measureSurface(ctx,i,'high','lontano',{frames:10});assert.ok(r.draws.max<=120,JSON.stringify(r.draws));
 const app=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 for(const t of ["type: 'rare', index: k","'Luogo raro registrato: '","function impulse()","function compassHUD(","c === 'q'","'Luoghi rari: '","explore-pulse"])assert.ok(app.includes(t),t);
});
