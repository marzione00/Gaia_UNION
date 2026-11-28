import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetSurface } from '../src/worlds/surface.js';
import { SITE_KINDS, STATES, SITE_GAP, SITE_INNER, FEWEST_SITES, MOST_SITES, siteList, siteModel, clearingOf } from '../src/worlds/sites.js';
import { chunkRocks, CHUNK } from '../src/worlds/biomes.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { CATALOG } from '../src/craft/catalog.js';
import { EDGE, METRE } from '../src/worlds/explorer.js';
import { TOWN_NEAR } from '../src/scene/world.js';
import { cleanExplore } from '../src/store.js';
const { allSites, sitesMarkdown } = await import('../scripts/siti.mjs');
const { world, measureSurface, buildCost } = await import('../scripts/prestazioni-mondi.mjs');
// Structures of the zone of a landing site (1.73.0): inhabited and abandoned structures, wrecks and ruins, each
// with a story written from the data of the planet.
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const it=(x,d=1)=>x.toFixed(d).replace('.',',').replace(/^-(?=[\d,]*[1-9])/,'−').replace(/^-/,'');
const P=planetPhysics(),data=allSites();
const size=e=>parseFloat(e.size.replace(/[^\d.]/g,''));

test('siti: il documento corrisponde al codice e le storie seguono lo stile',()=>{
 assert.equal(fs.readFileSync(new URL('../docs/SITI.md',import.meta.url),'utf8'),sitesMarkdown(data));
 const doc=fs.readFileSync(new URL('../docs/SITI.md',import.meta.url),'utf8');for(const r of STYLE)assert.ok(!r.test(doc),'SITI.md '+r);
 for(const d of data)for(const x of d.sites){assert.ok(x.story.length>=3&&x.story.length<=4,x.name);
  for(const t of x.story){assert.ok(t.length>20&&/[.]$/.test(t),t);for(const r of STYLE)assert.ok(!r.test(t),t+' '+r);assert.ok(!/undefined|NaN|null/.test(t),t);}}
 // Every kind of site appears, and every state; the four labels of the states.
 const all=data.flatMap(d=>d.sites);for(const k of Object.keys(SITE_KINDS))assert.ok(all.some(x=>x.kind===k),k);
 assert.deepEqual(Object.keys(STATES),['abitato','abbandonato','relitto','rovina']);assert.equal(all.length,2043);
});

test('siti: posti asciutti e in piano, lontani dalla base e fra loro, tutti gli stati su ogni pianeta',()=>{
 const share={};
 data.forEach((d,i)=>{const s=planetSurface(i),L=d.sites,village=s.settlements?.some(t=>t.kind==='villaggio');
  assert.ok(L.length>=FEWEST_SITES&&L.length<=MOST_SITES,i+' '+L.length);assert.deepEqual(L.map(x=>x.id),L.map((_,j)=>'r'+j));
  assert.deepEqual(JSON.parse(JSON.stringify(siteList(s))),JSON.parse(JSON.stringify(L)));
  for(const [j,x] of L.entries()){
   assert.ok(Math.hypot(x.x,x.z)>=SITE_INNER&&Math.abs(x.x)<=EDGE-80&&Math.abs(x.z)<=EDGE-80);
   for(const o of L.slice(j+1))assert.ok(Math.hypot(o.x-x.x,o.z-x.z)>=SITE_GAP-.02);
   const y=s.heightAt(x.x,x.z);assert.ok(Math.abs(y-x.y)<.001);if(s.seaY!==null)assert.ok(y>=s.seaY+1.5-.01);
   assert.ok(Math.max(...[[12,0],[-12,0],[0,12],[0,-12]].map(([a,b])=>Math.abs(s.heightAt(x.x+a,x.z+b)-y)))<=2.65,x.name);
   assert.equal(x.state,SITE_KINDS[x.kind].state);if(x.biome)assert.equal(x.biome,s.field.biomeAt(x.x,x.z).id);
   if(x.kind==='campo'||x.kind==='rovine')assert.ok(village,i+' '+x.kind);}
  for(const k of Object.keys(STATES))assert.ok(L.some(x=>x.state===k),i+' '+k);
  assert.equal(L.filter(x=>x.kind==='spedizione').length,1);assert.equal(new Set(L.map(x=>x.name)).size,L.length);
  assert.ok(new Set(L.map(x=>x.kind)).size>=10,i);
  (share[d.family]||=[]).push(L.filter(x=>x.state==='abitato').length/L.length);
 });
 // The share of inhabited sites grows with the hospitality of the family.
 const mean=f=>share[f].reduce((a,b)=>a+b,0)/share[f].length;assert.ok(mean('terrestrial')>mean('desert')&&mean('desert')>mean('barren'));
 // Sites follow one another every few hundred metres: the median distance to the nearest is between 450 and 700 m.
 const gaps=data.flatMap(d=>d.sites.map(a=>Math.min(...d.sites.filter(b=>b!==a).map(b=>Math.hypot(a.x-b.x,a.z-b.z))))).sort((a,b)=>a-b),m=gaps[gaps.length>>1]/METRE;
 assert.ok(m>450&&m<700,m);
});

test('siti: i numeri delle storie sono quelli della scheda del pianeta',()=>{
 data.forEach((d,i)=>{const p=P[i],g=planetSurface(i).genome;
  for(const x of d.sites){const t=x.story.join(' ');
   if(x.kind==='stazione')assert.ok(t.includes(`${it(p.ts-273.15,0)} °C`)&&t.includes(`${it(p.pressure,p.pressure<.1?3:2)} bar`)&&t.includes(`${it(p.teq-273.15,0)} °C`),t);
   if(x.kind==='miniera')assert.ok(t.includes(`${it(g.gravity,2)} g`)&&t.includes(`${it(10*g.gravity,1)} t`),t);
   if(x.kind==='miniera-abbandonata'||x.kind==='relitto')assert.ok(t.includes(`${it(p.escape,1)} km/s`),t);
   if(x.kind==='serre'||x.kind==='serre-abbandonate')assert.ok(t.includes(`${it(p.flux,2)} volte`),t);
   if(x.kind==='serre')assert.ok(t.includes(`${Math.round(p.period)} giorni`)&&t.includes(p.star.spt),t);
   if(x.kind==='osservatorio')assert.ok(t.includes(`${Math.round(p.period)} giorni terrestri`)&&t.includes(`${it(p.a,2)} UA`),t);
   if(x.kind==='faro')assert.ok(t.includes(`${it(Math.hypot(x.x,x.z)/METRE/299.792458,1)} µs`),t);
   if(x.kind==='sonda'){if(p.pressure>=.001)assert.ok(t.includes(`${it(p.pressure,p.pressure<.1?3:2)} bar`),t);assert.equal(t.includes('paracadute,')||t.includes('con il paracadute'),p.pressure>=.1,t);}
   // A wreck is a ship of the system of the planet up to 100 m long; a probe one of the probes of the fleet.
   if(x.kind==='relitto'){const e=CATALOG.find(c=>c.id===x.ship);assert.ok(e&&e.kind==='nave'&&e.system===p.system&&size(e)<=100,x.name);assert.ok(t.includes(e.name));}
   if(x.kind==='sonda'){const e=CATALOG.find(c=>c.id===x.ship);assert.ok(e&&e.type==='sonda');assert.ok(t.includes(e.name));}
   if(x.kind==='campo'||x.kind==='rovine'){const v=planetSurface(i).settlements.find(s=>s.kind==='villaggio');assert.ok(t.includes(v.people),t);}}
 });
});

test('siti: modelli validi ai due livelli di dettaglio, nello stesso posto',()=>{
 const seen=new Set();
 for(const i of [0,1,5,99,data.findIndex(d=>d.family==='barren'),data.findIndex(d=>d.sites.some(x=>x.kind==='rovine'))]){
  const s=planetSurface(i);
  for(const x of data[i].sites){if(seen.has(x.kind+i))continue;seen.add(x.kind+i);
   const [a,b]=[siteModel(s,x,0),siteModel(s,x,1)];
   for(const m of [a.mesh,b.mesh]){assert.equal(m.stride,16);assert.ok(m.v.length%16===0&&m.i.length%3===0&&m.i.length>300,x.kind);
    assert.ok(m.v.every(Number.isFinite),x.kind);const n=m.v.length/16;assert.ok(m.i.every(k=>k<n),x.kind);}
   assert.ok(b.mesh.i.length<a.mesh.i.length,x.kind+' '+b.mesh.i.length+' '+a.mesh.i.length);
   // The circles that stop the explorer are near the site and the same at both levels.
   assert.ok(a.blocks.length>=2&&a.blocks.every(([bx,bz,br])=>br>0&&Math.hypot(bx-x.x,bz-x.z)<80),x.kind);
   assert.equal(a.blocks.length,b.blocks.length);a.blocks.forEach((c,k)=>{assert.ok(Math.hypot(c[0]-b.blocks[k][0],c[1]-b.blocks[k][1])<.05&&Math.abs(c[2]-b.blocks[k][2])<.25*c[2],x.kind);});
   // The far level lies within the near one (it drops half of the small debris), so the change of level does
   // not move the pieces.
   const box=m=>{const lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9];for(let k=0;k<m.v.length;k+=16)for(let q=0;q<3;q++){lo[q]=Math.min(lo[q],m.v[k+q]);hi[q]=Math.max(hi[q],m.v[k+q]);}return [lo,hi];};
   const [A,B]=[box(a.mesh),box(b.mesh)];for(let q=0;q<3;q++)assert.ok(B[0][q]>=A[0][q]-1&&B[1][q]<=A[1][q]+1,x.kind+' '+A+' '+B);}
 }
 assert.ok(['relitto','sonda','rovine','campo','spedizione','faro','osservatorio','serre-abbandonate'].every(k=>[...seen].some(v=>v.startsWith(k))));
 // The diary keeps the sites registered, r0 to r18.
 assert.deepEqual(cleanExplore({7:{s:[],l:[],r:['r0','r18','r19','x','r0']}}),{7:{s:[],l:[],r:['r0','r18']}});
});

test('siti: il mondo costruisce i modelli vicini, il più vicino prima, e lo scanner li trova',()=>{
 const ctx=world('high'),i=99;buildCost(ctx,i);const {R,w}=ctx,s=w.surface;
 assert.deepEqual(s.sites,data[i].sites);
 for(let k=0;k<25;k++)w.siteModels([0,0,0]);
 s.sites.forEach((x,j)=>{const d=Math.hypot(x.x,x.z);assert.equal(w.siteBuilt[j],d<1050?1:0,x.name);});
 const x=s.sites[0];for(let k=0;k<3;k++)w.siteModels([x.x,x.y,x.z]);
 assert.equal(w.siteBuilt[0],2);assert.equal(w.siteGroups[0].near,TOWN_NEAR);assert.ok(R.meshes.has('site-0-mesh-0')&&R.meshes.has('site-0-mesh-1'));
 const [bx,bz]=w.siteBlocks[0];assert.ok(w.explorerEnv().blocked(bx,bz));
 // Rocks, plants and walking animals keep off the ground of the sites: their models and the band of a wreck.
 assert.equal(typeof s.siteClear,'function');
 for(const [j,y] of s.sites.entries()){const m=siteModel(s,y,1);for(let k=0;k<m.mesh.v.length;k+=16*9){const vx=y.x+m.mesh.v[k],vz=y.z+m.mesh.v[k+2];if(Math.hypot(vx-y.x,vz-y.z)<60||y.ship)assert.ok(s.siteClear(vx,vz,1),y.kind+' '+j);}
  const ci=Math.floor(y.x/CHUNK),cj=Math.floor(y.z/CHUNK);
  for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){for(const l of chunkRocks(s,ci+di,cj+dj))for(let k=0;k<l.length;k+=8)assert.ok(!s.siteClear(l[k],l[k+2]),'roccia '+y.kind);}}
 assert.equal(clearingOf([])(0,0),false);
 assert.deepEqual(w.nearest([x.x,x.y,x.z]),{type:'site',index:0});
 const r=measureSurface(ctx,i,'high','lontano',{frames:10});assert.ok(r.draws.max<=120&&r.instances.max<=6000&&r.triangles.max<=1.3e6,JSON.stringify(r.draws));
 const zone=w.population.flatMap(p=>p.zone||[]);assert.ok(zone.length>100);for(const o of zone)if(!o.fly)assert.ok(!s.siteClear(o.x,o.z),'individuo su un sito');
 // The app lists the sites with the places, registers them in the diary and announces them.
 const app=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 for(const t of ["type: 'site', index: k","'Sito registrato: '","Lo scanner ne registra la storia nel diario.","'Siti: '","STATES[e.data.state]"])assert.ok(app.includes(t),t);
});
