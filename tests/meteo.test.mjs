import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { WEATHER_KINDS, CLEAR_START, EPISODE, RAMP, EARTH, airOf, terminal, stokes, vapourOf, climateOf, allClimates, episodesOf, weatherAt, strengthWord, DROP } from '../src/worlds/weather.js';
import { planetPhysics } from '../src/worlds/planet-physics.js';
import { boiling } from '../src/worlds/wonders.js';
import { whatHappens, GROUND_UNITS } from '../src/craft/succede.js';
import { WEATHER_BOX, WEATHER_COUNT, WEATHER_LOOK } from '../src/scene/world.js';
import { METRE } from '../src/worlds/explorer.js';
import { cleanExplore } from '../src/store.js';
import { vsMesh } from '../src/scene/shaders.js';
import { weatherMarkdown, climateRow } from '../scripts/meteo.mjs';
const { BUDGET, world, buildCost, measureSurface } = await import('../scripts/prestazioni-mondi.mjs');
// Weather of the zones of the landing sites (1.79.0).
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i,/, non /i];
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const P=planetPhysics(),C=allClimates(),titles=JSON.parse(read('content/catalogue.json')).modules.map(m=>m.title);

test('meteo: il documento corrisponde al codice e segue lo stile',()=>{
 const doc=read('docs/METEO.md');assert.equal(doc,weatherMarkdown());for(const r of STYLE)assert.ok(!r.test(doc),'METEO.md '+r);
 const rows=[...doc.matchAll(/^\| (\d+)\. .+$/gm)];assert.equal(rows.length,125);rows.forEach((r,i)=>assert.equal(r[0],climateRow(C[i],titles[i])));
 assert.ok(doc.includes(`I ${C.filter(c=>!(c.air.rho>0)).length} pianeti senza atmosfera restano sempre sereni e senza vento.`));
});

test('meteo: i fenomeni seguono l’aria, l’acqua e la temperatura di ogni pianeta',()=>{
 assert.deepEqual(Object.keys(WEATHER_KINDS),['sereno','nuvoloso','pioggia','neve','nebbia','polvere','cenere']);
 C.forEach((c,i)=>{const p=P[i],k=Object.keys(c.kinds),f=p.family;
  assert.equal(c.index,i);assert.ok(k.includes('sereno'));
  if(p.pressure===0){assert.deepEqual(k,['sereno']);assert.equal(c.air.rho,0);assert.ok(episodesOf(c,900).every(e=>e.wind===0&&e.kind==='sereno'));return;}
  assert.ok(k.length>=2,String(i));assert.equal(k.includes('nuvoloso'),p.pressure>=.01);
  if(k.includes('pioggia'))assert.ok(['terrestrial','oceanic','volcanic'].includes(f)&&p.pressure>.2&&p.ts>273.15&&p.ts-273.15<boiling(p.pressure),String(i));
  if(k.includes('neve'))assert.ok(f==='arctic'||(f==='terrestrial'&&p.ts<283.15),String(i));
  if(k.includes('nebbia'))assert.ok(f!=='desert'&&f!=='barren'&&p.pressure>=.2,String(i));
  assert.equal(k.includes('polvere'),f==='desert');assert.equal(k.includes('cenere'),f==='volcanic');
 });
 // Every kind is somewhere, and the climates differ: the oceans rain, the deserts blow dust, the volcanoes rain ash.
 for(const k of Object.keys(WEATHER_KINDS))assert.ok(C.some(c=>k in c.kinds),k);
 assert.ok(C.filter(c=>'pioggia' in c.kinds).length>40&&C.filter(c=>'neve' in c.kinds).length>20);
});

test('meteo: episodi dalla stessa sequenza, intensità continua e vento',()=>{
 assert.equal(CLEAR_START,60);assert.deepEqual(EPISODE,[80,200]);assert.equal(RAMP,20);
 for(const i of [0,2,7,40,77]){
  const c=climateOf(i),E=episodesOf(c,3000);assert.deepEqual(episodesOf(climateOf(i),3000),E);
  assert.equal(E[0].kind,'sereno');assert.equal(E[0].end,CLEAR_START);
  E.slice(1).forEach((e,j)=>{assert.equal(e.start,E[j].end);assert.ok(e.end-e.start>=EPISODE[0]&&e.end-e.start<=EPISODE[1]);assert.notEqual(e.kind,E[j].kind);assert.ok(e.kind in c.kinds);
   if(e.kind==='polvere')assert.ok(e.wind>=1.2*c.dust.wind-.01&&e.wind<=2*c.dust.wind+.01);else{const W=WEATHER_KINDS[e.kind].wind;assert.ok(e.wind>=W[0]&&e.wind<=W[1]);}});
  let last=weatherAt(c,0);assert.equal(last.strength,0);assert.equal(last.sight,Infinity);
  for(let t=.5;t<2000;t+=.5){const w=weatherAt(c,t);assert.ok(w.strength>=0&&w.strength<=1);assert.ok(Math.abs(w.strength-last.strength)<.05,i+' '+t);assert.ok(Math.abs(w.wind-last.wind)<1.5,i+' '+t);
   if(w.kind!=='sereno'&&w.strength>0)assert.ok(Math.abs(w.sight-WEATHER_KINDS[w.kind].sight/Math.max(.05,w.strength))<1e-6);last=w;}
  // Some weather comes within ten minutes of the landing.
  assert.ok(E.filter(e=>e.start<600).some(e=>e.kind!=='sereno'),String(i));
 }
 assert.equal(strengthWord('pioggia',.2),'debole');assert.equal(strengthWord('neve',.6),'moderata');assert.equal(strengthWord('polvere',.9),'forte');assert.equal(strengthWord('nuvoloso',.9),'');
});

test('meteo: la fisica con i numeri della Terra e dei pianeti',()=>{
 const near=(a,b,e)=>assert.ok(Math.abs(a-b)<=e,a+' '+b);
 near(EARTH.air.rho,1.225,.01);near(EARTH.air.M,.029,.0002);near(EARTH.rain,6.5,.1);near(EARTH.snow,1.5,.05);near(EARTH.dust.wind,1.9,.1);near(EARTH.ash,.18,.01);near(EARTH.fog.density,12.9,.2);near(EARTH.air.mu,1.79e-5,.03e-5);
 // Pure carbon dioxide is heavier: 44 g/mol; four times the density, half the speed of a drop; Stokes ignores the density.
 const co2=airOf({ts:288.15,pressure:1.01325,co2Share:1,gravity:1});near(co2.M,.044,.0001);
 const dense=airOf({ts:288.15,pressure:4.053,co2Share:.0004,gravity:1});near(terminal(DROP.r,DROP.rho,DROP.cd,dense),EARTH.rain/2,.01);near(stokes(25e-6,2400,dense),EARTH.ash,.001);
 near(vapourOf(273.15).pressure,611.2,1e-6);
 // The panel: rows and the formula of each kind with the numbers of a planet, in the style of the site.
 for(const u of ['physics-07','physics-14','physics-18','physics-19'])assert.ok(GROUND_UNITS[u]);
 const ctx=world('high'),{w}=ctx;
 for(const [i,kinds] of [[7,['sereno','nuvoloso','pioggia','nebbia']],[2,['polvere']],[0,['neve']],[77,['cenere']],[10,['sereno']]]){buildCost(ctx,i);
  for(const k of kinds){w.weatherOverride={kind:k,strength:.8,wind:6,from:200};measureSurface(ctx,i,'high','stazioni',{frames:1});const x=w.weatherSubject(),v=whatHappens(x),c=C[i],dec=(y,d)=>y.toFixed(d).replace('.',',');
   assert.equal(v.tag,'METEO');assert.ok(v.rows.length>=4&&v.rows.length<=6);assert.ok(v.concept.text.length<=360,v.concept.text);assert.ok(GROUND_UNITS[v.concept.unit]);
   for(const t of [v.concept.text,...v.rows.flat()]){for(const r of STYLE)assert.ok(!r.test(t),t);assert.ok(!/NaN|undefined|Infinity|null/.test(t),t);}
   for(const [l,val] of v.rows)assert.ok(l.length<=30&&val.length<=52,l+' '+val);
   if(!(c.air.rho>0)){assert.equal(v.concept.unit,'physics-18');assert.ok(v.concept.text.includes('pressione al suolo è zero'));continue;}
   if(k==='pioggia')assert.ok(v.concept.text.includes(`= ${dec(c.rain.v,1)} m/s`));
   if(k==='neve')assert.ok(v.concept.text.includes(`= ${dec(c.snow.v,1)} m/s`));
   if(k==='polvere')assert.ok(v.concept.text.includes(`circa ${dec(c.dust.wind,0)} m/s`));
   if(k==='cenere')assert.ok(v.concept.text.includes(`vale ${dec(c.ash.v,2)} m/s`));
   if(k==='nebbia')assert.ok(v.concept.text.includes(`${dec(c.fog.density,1)} g di vapore`));
   if(k==='sereno'||k==='nuvoloso')assert.ok(v.concept.text.includes(`ρ = pM/(RT) = ${dec(c.air.rho,2)} kg/m³`));}}
 w.weatherOverride=null;
});

test('meteo nel mondo e nell’app: luce, nebbia, particelle entro i limiti, diario',()=>{
 const ctx=world('high'),{R,w}=ctx,i=84;buildCost(ctx,i);
 const at=(o,view='esploratore')=>{w.weatherOverride=o;const r=measureSurface(ctx,i,'high',view,{frames:3});return {r,W:w.weatherNow,sun:w.sunNow,fog:R.fogDensity};};
 const clear=at({kind:'sereno',strength:0,wind:2,from:0}),rain=at({kind:'pioggia',strength:1,wind:8,from:90}),half=at({kind:'pioggia',strength:.5,wind:8,from:90}),fog=at({kind:'nebbia',strength:1,wind:1,from:90});
 assert.ok(fog.fog>rain.fog&&rain.fog>half.fog&&half.fog>=clear.fog);assert.ok(Math.abs(rain.W.fog-3/(700*METRE))<1e-9);
 assert.ok(rain.sun.color[0]<clear.sun.color[0]*.5);assert.ok(rain.r.draws.max===clear.r.draws.max+1&&rain.r.instances.max-clear.r.instances.max===WEATHER_COUNT.high);
 assert.ok(Math.abs(half.r.instances.max-clear.r.instances.max-Math.round(WEATHER_COUNT.high*.575))<=1);
 // The wind of 8 m/s from the east blows the particles to the west.
 assert.ok(Math.abs(Math.hypot(...rain.W.windVector)-8*METRE)<1e-9);
 // The heaviest weather on the richest planet stays within the limits of a frame, from every view.
 for(const view of ['stazioni','esploratore','lontano']){const {r}=at({kind:'neve',strength:1,wind:6,from:0},view);assert.ok(r.draws.max<=BUDGET.draws&&r.triangles.max<=BUDGET.triangles&&r.instances.max<=BUDGET.instances,`${view} ${r.draws.max} ${r.triangles.max} ${r.instances.max}`);}
 w.weatherOverride=null;at(null);assert.equal(w.weatherNow.kind,'sereno');
 assert.equal(WEATHER_BOX,18);assert.deepEqual(Object.keys(WEATHER_LOOK).sort(),['cenere','neve','pioggia','polvere']);assert.ok(WEATHER_COUNT.low<WEATHER_COUNT.balanced&&WEATHER_COUNT.balanced<WEATHER_COUNT.high);
 assert.ok(vsMesh.includes('uInstanced==9')&&vsMesh.includes('uniform vec3 uEye,uCenter;'));
 // The diary keeps the kinds of weather met.
 assert.deepEqual(cleanExplore({4:{s:[],l:[],e:['pioggia','neve','grandine',3,'pioggia']}}),{4:{s:[],l:[],e:['pioggia','neve']}});
 const app=read('src/app.js');
 for(const t of ["'explore-weather', 'METEO'","followGround('meteo')","S.groundFollow.k === 'meteo' ? W.weatherSubject()",'function weatherSeen(','Meteo osservato: ','`Meteo: ${text}. METEO ne spiega la fisica.`'])assert.ok(app.includes(t),t);
});
