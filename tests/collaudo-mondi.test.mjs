import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { planetSurface } from '../src/worlds/surface.js';
import { GroundClipmap, LEVELS, CELLS, half } from '../src/worlds/clipmap.js';
import { GROUND_EAGER, GROUND_MS } from '../src/scene/world.js';
import { adaptStep, startGraphics, ORDER, NAMES, WINDOW, SLOW, SKIP, SETTLE } from '../src/ui/adaptive.js';
import { cleanState, fresh } from '../src/store.js';
import { varietyOf, varietyRow, similarity, GRID, NEAR } from '../scripts/varieta.mjs';
const { world, buildCost, measureSurface } = await import('../scripts/prestazioni-mondi.mjs');
// Phones and the testing of the series «Mondi aperti» (1.77.0).
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const used=L=>[...new Set(L.mesh.i)],same=(A,B)=>{assert.deepEqual(Array.from(A.mesh.i),Array.from(B.mesh.i));for(const q of used(A))assert.deepEqual(Array.from(A.mesh.v.subarray(q*16,q*16+16)),Array.from(B.mesh.v.subarray(q*16,q*16+16)));};

test('terreno: le griglie esterne si costruiscono nei fotogrammi seguenti, uguali a quelle costruite subito',()=>{
 assert.equal(GROUND_EAGER,3);assert.equal(GROUND_MS,10);assert.equal(half(GROUND_EAGER-1),256);
 const s=planetSurface(38),A=new GroundClipmap(s),B=new GroundClipmap(s);
 assert.deepEqual(A.update(2,2,GROUND_EAGER),[0,1,2]);assert.deepEqual([...A.pending].sort(),[3,4,5]);for(let k=3;k<LEVELS;k++)assert.equal(A.levels[k].mesh,null);
 // A short budget makes progress a few rows at a time, from the inside out.
 const done=[];let calls=0;while(A.pending.size&&calls<5000){done.push(...A.fill(1));calls++;}
 assert.deepEqual(done,[3,4,5]);assert.ok(calls>3,calls);
 B.update(2,2);for(let k=0;k<LEVELS;k++)same(A.levels[k],B.levels[k]);
 // A pending level that moves starts again on its new centre.
 const C=new GroundClipmap(s);C.update(2,2,GROUND_EAGER);C.fill(.5);C.update(700,-300,GROUND_EAGER);while(C.pending.size)C.fill(Infinity);const D=new GroundClipmap(s);D.update(700,-300);for(let k=0;k<LEVELS;k++)same(C.levels[k],D.levels[k]);
 // The points inside the hole of a level are left out: a quarter of the window of every level but the finest.
 const E=new GroundClipmap(s);E.update(2,2);assert.equal(used(E.levels[0]).length,(CELLS+1)**2);
 for(let k=1;k<LEVELS;k++){const u=used(E.levels[k]).length;assert.ok(u<(CELLS+1)**2*.78,k+' '+u);}
 assert.ok(E.samples<LEVELS*(CELLS+3)**2*.85,E.samples);
});

test('terreno nel mondo: la superficie si apre con tre griglie e completa le altre a 10 ms per fotogramma',()=>{
 const ctx=world('high'),b=buildCost(ctx,7),{R,w}=ctx;
 assert.ok(b.fillFrames>=3&&b.fillMs>0,JSON.stringify(b));assert.equal(w.ground.pending.size,0);for(let k=0;k<LEVELS;k++)assert.ok(R.meshes.has('planet-ground-'+k),k);
 const r=measureSurface(ctx,7,'high','stazioni',{frames:5});assert.ok(r.draws.max<=120);
 // A new planet drops the outer grids of the old one until its own are ready.
 w.planetCache?.delete(8);w.uploadedPlanet=null;w.activatePlanet(8);for(let k=0;k<LEVELS;k++)assert.equal(R.meshes.has('planet-ground-'+k),k<GROUND_EAGER,k);
 const s={scene:'surface',selected:8,time:30,yaw:0,pitch:.45,distance:22,paused:false,lastFrameMs:16};let n=0;while(w.ground.pending.size&&n<400){R.begin();w.draw('surface',s,{modules:[]});n++;}
 assert.equal(w.ground.pending.size,0);for(let k=0;k<LEVELS;k++)assert.ok(R.meshes.has('planet-ground-'+k));
});

test('grafica che si adatta al dispositivo finché non la si sceglie',()=>{
 assert.deepEqual(ORDER,['high','balanced','low']);assert.equal(NAMES.balanced,'Bilanciato');
 assert.equal(startGraphics('high',false,true,390),'balanced');assert.equal(startGraphics('high',false,false,390),'high');assert.equal(startGraphics('high',false,true,800),'high');assert.equal(startGraphics('high',true,true,390),'high');assert.equal(startGraphics('low',false,true,390),'balanced');
 const run=(A,q,ms,from,to,scene='surface')=>{let out=null;for(let t=from;t<=to&&!out;t+=ms)out=adaptStep(A,q,ms,t,scene);return out;};
 // Slow frames for the whole window after the settling time: one step lighter, then again.
 let A={};assert.equal(run(A,'high',50,0,SETTLE+WINDOW-60),null);A={};assert.equal(run(A,'high',50,0,SETTLE+WINDOW+100),'balanced');assert.equal(run(A,'balanced',50,SETTLE+WINDOW+150,2*(SETTLE+WINDOW)),'low');assert.equal(run(A,'low',60,0,60000),null);
 // Fast frames, frames longer than SKIP and a new scene change nothing.
 A={};assert.equal(run(A,'high',16,0,20000),null);A={};assert.equal(run(A,'high',SKIP+50,0,20000),null);
 A={};run(A,'high',50,0,SETTLE+WINDOW-500);assert.equal(adaptStep(A,'high',50,SETTLE+WINDOW+10,'system'),null);assert.equal(A.n,0);
 assert.ok(SLOW>33&&SLOW<40);
 const c=cleanState({...fresh(),preferences:{...fresh().preferences,graphicsSet:true}});assert.equal(c.preferences.graphicsSet,true);assert.equal(cleanState(fresh()).preferences.graphicsSet,false);
 const app=read('src/app.js');for(const t of ['startGraphics(store.data.preferences.graphics, store.data.preferences.graphicsSet','adaptStep(adaptive, S.graphics, S.lastFrameMs, now, S.scene)','store.data.preferences.graphicsSet=true','Grafica alleggerita a «'])assert.ok(app.includes(t),t);
});

test('varietà: il documento corrisponde al codice, una novità ogni poche centinaia di metri, zone tutte diverse',()=>{
 const doc=read('docs/VARIETA_MONDI.md');for(const r of STYLE)assert.ok(!r.test(doc),'VARIETA_MONDI.md '+r);
 assert.ok(doc.startsWith('# Varietà delle zone di atterraggio')&&doc.includes('`node scripts/varieta.mjs`'));
 const rows=[...doc.matchAll(/^\| (\d+)\. .+$/gm)];assert.equal(rows.length,125);
 const titles=JSON.parse(read('content/catalogue.json')).modules.map(m=>m.title);
 // Four planets measured again give the same rows as the file.
 for(const i of [0,28,77,114]){const v=varietyOf(i),line=varietyRow(v,titles);assert.equal(rows.find(r=>r[1]===String(i+1))[0],line);
  assert.ok(v.biomes.length>=5&&v.biomes.length<=8&&v.land>1000&&v.land<=v.points);assert.ok(v.median<=v.p90&&v.p90<=v.max&&v.within[0]<=v.within[1]);
  assert.ok(v.place.median<=v.place.p90&&v.place.p90<=v.place.max&&v.place.median>=v.median);
  assert.equal(GRID,50);assert.deepEqual(NEAR,[300,500]);}
 const a=varietyOf(5),b=varietyOf(5);assert.equal(similarity(a,b),1);assert.ok(similarity(a,varietyOf(6))<1);
 // The summary says what the rows say.
 const nov=rows.map(r=>r[0].split('|')[10].trim().split(' / ').map(Number));assert.ok(nov.every(([m,p])=>m<=p));
 assert.ok(doc.includes('Le descrizioni delle 125 zone sono tutte diverse.'),'zone uguali');
});

test('la pagina della serie «Mondi aperti»: versioni, numeri, mappa dei concetti e collaudo',()=>{
 const md=read('docs/MONDI_APERTI.md'),graphics=read('docs/GRAPHICS.md'),perf=read('docs/PRESTAZIONI_MONDI.md'),variety=read('docs/VARIETA_MONDI.md');
 for(const r of STYLE)assert.ok(!r.test(md),'MONDI_APERTI.md '+r);assert.ok(md.startsWith('# La serie «Mondi aperti»'));
 // Every version of the series, with a section of docs/GRAPHICS.md or its own file, and a test file that exists.
 const rows=[...md.matchAll(/^\| (1\.7\d\.0) \| .+ \| (.+) \| `(tests\/[\w-]+\.test\.mjs)` \|$/gm)];assert.deepEqual(rows.map(r=>r[1]),['1.70.0','1.71.0','1.72.0','1.73.0','1.74.0','1.75.0','1.76.0','1.77.0','1.78.0','1.79.0']);
 for(const r of rows){assert.ok(fs.existsSync(new URL('../'+r[3],import.meta.url)),r[3]);for(const [,sec] of r[2].matchAll(/«([^»]+\(1\.7\d\.0\))»/g))assert.ok(graphics.includes('## '+sec),sec);for(const [,f] of r[2].matchAll(/`(docs\/[\w.]+)`/g))assert.ok(fs.existsSync(new URL('../'+f,import.meta.url)),f);}
 // The units of the concept map exist with these titles.
 const units=new Map(JSON.parse(read('content/catalogue.json')).modules.map(m=>[m.id,m.title]));for(const [,id,title] of md.matchAll(/(physics-\d\d), «([^»]+)»/g))assert.equal(units.get(id),title,id);
 // Numbers that come from the generated files.
 for(const t of ['è in mediana a 194 m','il 99,6% entro 500 m','Il 99,6% dei punti ha una novità entro 300 m','condivide il 97% delle caratteristiche'])assert.ok(variety.includes(t),t);
 for(const t of ['è in mediana a 194 m','il 99,6% dei punti ne ha uno entro 500 m','il 99,6% dei punti ha una novità entro 300 m','ne condivide il 97%'])assert.ok(md.includes(t),t);
 const mesh=perf.match(/^\| Maglie dei modelli \| (\d+) ms \| (\d+) ms \| (\d+) ms \|$/m),fill=perf.match(/da (\d+) a (\d+) fotogrammi, in mediana (\d+)\./);
 assert.ok(md.includes(`richiedono in mediana ${mesh[2]} ms invece dei 570 ms`)&&md.includes(`in mediana in ${fill[3]} fotogrammi`));
 assert.ok(graphics.includes(`in mediana ${mesh[2]} ms, contro i 570 ms della 1.76.0, al più ${mesh[3]} ms contro 993; il terreno lontano arriva in ${fill[1]}-${fill[2]} fotogrammi, in mediana ${fill[3]}`));
 // Nine test files of the series with 46 tests (the minor places since 1.78.0, the weather since 1.79.0).
 const files=['biomi','vita-biomi','siti','rari','nave','zaino','collaudo-mondi','minori','meteo'].map(f=>read(`tests/${f}.test.mjs`));assert.equal(files.reduce((n,t)=>n+(t.match(/^test\(/gm)||[]).length,0),46);assert.ok(md.includes('sono nove, con 46 test'));
});
