import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { systemArchitecture, AREAS } from '../src/scene/systems.js';
import { minorBodies, FOLLOW_ZOOM, FOLLOW_LIMITS } from '../src/scene/world.js';
import { meteorShowers, cometAt, V_EARTH } from '../src/scene/comete.js';
import { CONCEPT_UNITS, whatHappens } from '../src/craft/succede.js';
import { planetCards } from '../src/worlds/genome.js';
import { BUDGET, QUALITIES, FOLLOWS, world, measureSystem, beltCost, minorCost } from '../scripts/prestazioni.mjs';
// The series «Galassia viva» as a whole (1.61.0): structural limits of a frame of every kind, the belts kept in
// memory, the faster search of the showers against the full one, and the two documents of the series against
// the code that produces what they describe.
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const prose=md=>md.split('\n\n').filter(p=>!p.startsWith('|')&&!p.startsWith('#'));
const dec=(v,n)=>v.toFixed(n).replace('.',',');
const systems=Array.from({length:30},(_,id)=>minorBodies({...systemArchitecture(id),id}));
let shared=null;const scene=()=>shared??=world('high');

// The search of 1.60.0, every pair of points worked out again: the reference for the faster one.
function fullSearch(system,comets,map){
 const TAU=2*Math.PI,M=system.star.mass,out=new Map();
 for(const body of system.bodies){const list=[];
  comets.forEach((c,k)=>{let best={gap:Infinity};
   for(let i=0;i<360;i++){const E=TAU*i/360,s=cometAt(c,E,M),r=map.toScene(s.r),q=s.p.map(x=>x/s.r*r);
    for(let j=0;j<180;j++){const F=TAU*j/180,x=body.orbit*(Math.cos(F)-body.eccentricity),z=body.orbit*Math.sqrt(1-body.eccentricity**2)*Math.sin(F),cn=Math.cos(body.node),sn=Math.sin(body.node),zz=z*Math.cos(body.inclination);
     const p=[x*cn-zz*sn,z*Math.sin(body.inclination),x*sn+zz*cn],gap=Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2]);if(gap<best.gap)best={gap,E,F,p};}}
   if(best.gap>.3)return;
   const s=cometAt(c,best.E,M),t=[-best.p[2],0,best.p[0]].map(x=>x/Math.hypot(best.p[0],best.p[2])),vp=V_EARTH*Math.sqrt(M/body.a),rel=s.velocity.map((x,i)=>x-t[i]*vp);
   list.push({comet:k,name:c.name,mean:best.F-body.eccentricity*Math.sin(best.F),gap:best.gap,speed:Math.hypot(...rel)});});
  if(list.length)out.set(body.slot,list);}
 return out;
}
test('sciami: il calcolo veloce trova gli stessi incroci, con le stesse velocità, del confronto di tutte le coppie',()=>{
 let n=0;
 for(const s of systems){const fast=meteorShowers(s,s.comets,s.map),full=fullSearch(s,s.comets,s.map);assert.deepEqual([...fast],[...full],'sistema '+s.id);n+=[...full.values()].reduce((a,l)=>a+l.length,0);}
 assert.equal(n,26);
});
test('fotogramma: limiti strutturali in quattro sistemi, alle tre impostazioni e con ogni oggetto seguito',()=>{
 const ctx=scene(),by={};
 for(const id of [13,16,0,2])for(const q of QUALITIES){
  const r=measureSystem(ctx,id,q,{frames:20});by[id+q]=r;
  assert.ok(r.draws.max>50&&r.draws.max<=BUDGET.draws,`${id} ${q}: ${r.draws.max} chiamate`);
  assert.ok(r.triangles.max<=BUDGET.triangles,`${id} ${q}: ${r.triangles.max} triangoli`);
  assert.ok(r.instances.max<=BUDGET.instances,`${id} ${q}: ${r.instances.max} istanze`);
  assert.ok(r.craft.stations>0&&r.craft.ships>0&&r.craft.service>0,`${id} ${q}: sistema vuoto`);
 }
 for(const id of [13,16,0,2]){assert.ok(by[id+'low'].triangles.max<=by[id+'high'].triangles.max,'triangoli '+id);assert.ok(by[id+'low'].craft.service<by[id+'high'].craft.service,'servizio '+id);}
 // The belts of the last three systems stay; those of the system drawn before them are released.
 const kept=new Set(),R=ctx.R;let vertices=0;
 for(const [key,m] of R.meshes){const k=/^belt-(?:dust-)?(\d+)-/.exec(key);if(k){kept.add(+k[1]);vertices+=m.vertices;}}
 assert.deepEqual([...kept].sort((a,b)=>a-b),[0,2,16]);assert.ok(vertices<=BUDGET.beltVertices,'vertici delle cinture: '+vertices);
 const KIND={stella:'star',pianeta:'planet',cometa:'comet',cintura:'belt',stazione:'station',nave:'ship',servizio:'service'};
 for(const [label,f] of Object.entries(FOLLOWS)){const r=measureSystem(ctx,13,'high',{frames:12,follow:f});assert.equal(r.followed,KIND[label],label);assert.ok(r.draws.max<=BUDGET.draws&&r.triangles.max<=BUDGET.triangles&&r.instances.max<=BUDGET.instances,label);}
});
test('documentazione: PRESTAZIONI.md generato dallo script, con cinture e comete come nel codice e misure entro i limiti',()=>{
 const md=read('docs/PRESTAZIONI.md');
 assert.ok(md.startsWith('# Prestazioni misurate della serie «Galassia viva»')&&md.includes('`node scripts/prestazioni.mjs`'));
 for(const h of ['## Un fotogramma di sistema','## Oggetto seguito e pannello «Che cosa succede»','## Cinture, comete e sciami','## Sistemi uno per uno'])assert.ok(md.includes(h),h);
 assert.ok(md.includes(`sono ${BUDGET.draws} chiamate di disegno, ${dec(BUDGET.triangles/1e6,2)} milioni di triangoli e ${BUDGET.instances} istanze`),'limiti da aggiornare');
 const rows=md.split('\n').filter(l=>/^\| (dettaglio alto|bilanciato|leggero) \|/.test(l));assert.equal(rows.length,3);
 for(const l of rows){const c=l.split('|').map(x=>x.trim());const draws=+c[5].split('/')[1].replace(/\./g,''),tri=parseFloat(c[6].replace(',','.'))*1e6,inst=+c[7].replace(/\./g,'');
  assert.ok(draws>50&&draws<=BUDGET.draws&&tri<=BUDGET.triangles&&inst<=BUDGET.instances,l);}
 // Belts, comets and showers of every system, as the scene builds them.
 const table=new Map(md.split('\n').filter(l=>/^\| \d+ \| \d+ \| [\d.]+ \| [\d.]+ \|/.test(l)).map(l=>{const c=l.split('|').map(x=>x.trim());return [+c[1],c];}));
 assert.equal(table.size,30);
 for(const s of systems){const b=beltCost(s),m=minorCost(s.id),c=table.get(s.id),int=v=>v.toLocaleString('it-IT');
  assert.deepEqual([c[2],c[3],c[4],c[6],c[7]],[String(b.belts),int(b.rocks),int(b.vertices),String(m.comets),String(m.showers)],'sistema '+s.id);
  assert.ok(3*b.vertices<=BUDGET.beltVertices);}
 assert.equal(md.split('\n').filter(l=>/^\| \d+ \| [\d,]+ ms · \d+ \|/.test(l)).length,30);
 for(const p of prose(md))for(const r of STYLE)assert.ok(!r.test(p),p.slice(0,80));
});
test('documentazione della serie: GALASSIA_VIVA.md riporta i numeri del codice e la mappa dei concetti completa',()=>{
 const md=read('docs/GALASSIA_VIVA.md'),G=planetCards();
 // What a system contains.
 let rocky=0,comets=0,two=0,retro=0,showers=0,planets=0,units=0,air=0;const speeds=[];
 for(const s of systems){assert.equal(s.belts.filter(b=>b.kind==='ghiacciata').length,1);rocky+=s.belts.length-1;comets+=s.comets.length;two+=s.comets.length===2;retro+=s.comets.filter(c=>c.inclination>Math.PI/2).length;
  for(const [slot,list] of meteorShowers(s,s.comets,s.map)){planets++;showers+=list.length;speeds.push(...list.map(x=>x.speed));const b=s.bodies.find(x=>x.slot===slot);if(Number.isInteger(b.index)){units++;air+=G[b.index].atmosphere.density>=.1;}}}
 assert.ok(md.includes(`Ognuno dei 30 sistemi ha una cintura di ghiaccio oltre l'ultimo pianeta, e ${rocky} hanno anche una cintura di roccia`));
 assert.ok(md.includes(`Le comete sono ${comets}: ${two} sistemi ne hanno due, e ${retro} comete girano in senso opposto ai pianeti. Le loro scie incrociano l'orbita di ${planets} pianeti, con ${showers} sciami in tutto; ${units} di questi pianeti sono pianeti di studio e ${air} hanno aria`));
 assert.ok(md.includes(`fra ${dec(Math.min(...speeds),1)} e ${dec(Math.max(...speeds),1)} km/s`));
 // Pages of the planets of the units, from the panel of the followed planet.
 const ctx=scene(),pages={atmosfera:0,cielo:0},total=systems.reduce((n,s)=>n+s.bodies.filter(b=>Number.isInteger(b.index)).length,0);
 for(const s of systems)for(const b of s.bodies.filter(b=>Number.isInteger(b.index))){const F=ctx.w.followSubject({system:s.id,time:300,follow:{kind:'planet',slot:b.slot}}),v=whatHappens({...F.subject,unit:{id:'x',title:'Unità'}});for(const p of v.pages||[])if(p.key in pages)pages[p.key]++;}
 assert.ok(md.includes(`Dei ${total} pianeti di studio, tutti hanno la pagina dell'atmosfera nel pannello; ${pages.cielo} hanno aria abbastanza densa da avere anche la pagina del cielo, mentre gli altri ${total-pages.cielo} conservano soltanto un'esosfera`));
 assert.equal(pages.atmosfera,total);
 const traffic='da 110 a 171',guide=read('docs/STAZIONI_NAVI.md');assert.ok(guide.includes('i mezzi sono '+traffic+' in alta qualità')&&guide.includes('da 74 a 114')&&guide.includes('da 44 a 66'));
 assert.ok(md.includes(`conta ${traffic} mezzi con il dettaglio alto, che diventano da 74 a 114 con la grafica bilanciata e da 44 a 66 con quella leggera`));
 // Following: distances and limits of the zoom.
 const z=k=>String(FOLLOW_ZOOM[k]).replace('.',',');
 assert.ok(md.includes(`${z('star')} per la stella, ${z('planet')} per un pianeta, ${z('station')} per una stazione, ${z('comet')} per una cometa, ${z('ship')} per una nave, ${z('service')} per un mezzo di servizio e ${z('belt')} semilarghezze per una cintura`));
 assert.ok(md.includes(`fra ${String(FOLLOW_LIMITS[0]).replace('.',',')} e ${FOLLOW_LIMITS[1]} raggi`));
 // The map of the concepts: every unit of the panel, each with its title, and each object with the units it leads to.
 const map=md.split('\n').filter(l=>/^\| [A-Z]/.test(l)&&/\| (physics|chemistry|biology)-\d+ /.test(l)).map(l=>l.split('|').map(x=>x.trim()));
 const used=new Set();for(const c of map){const [code,...title]=c[3].split(' ');assert.equal(title.join(' '),CONCEPT_UNITS[code],c[3]);used.add(code);}
 assert.deepEqual([...used].sort(),Object.keys(CONCEPT_UNITS).sort());
 const OBJECT={star:'Stella',planet:'Pianeta',comet:'Cometa',belt:'Cintura',station:'Stazione',ship:'Nave'};
 for(const f of Object.values(FOLLOWS)){const s={scene:'system',system:13,time:300,yaw:0,pitch:.48,distance:34};const F=ctx.w.followSubject({...s,follow:f(ctx.w,s)});if(!F)continue;const v=whatHappens(F.subject);
  for(const p of v.pages||[v]){const rows=map.filter(c=>F.kind==='service'?!Object.values(OBJECT).includes(c[1]):c[1]===OBJECT[F.kind]);assert.ok(rows.some(c=>c[3].startsWith(p.concept.unit+' ')),`${F.kind} ${p.concept.unit}`);}}
 // The numbers of the suggestions, as the panel shows them for system 13.
 const s=systems[13],st=s.star,M=st.mass;assert.equal(AREAS[13].name,'Legami e molecole');assert.ok(md.includes('sistema 13, «Legami e molecole»'));
 const star=whatHappens({kind:'star',name:'Stella',spt:st.spt,teff:st.teff,L:st.luminosity,R:st.radius,M});
 for(const t of [`2,898·10⁶ nm·K / ${st.teff} K = 845 nm`,`L = R²(T/5772)⁴ = 0,361² × (3430/5772)⁴ = 0,0163`,'0,0162'])assert.ok(star.concept.text.includes(t)&&md.includes(t),t);
 assert.ok(md.includes(`di tipo ${st.spt} a ${st.teff} K`));
 const c=s.comets[0],F=ctx.w.followSubject({system:13,time:300,follow:{kind:'comet',k:0}}),v=whatHappens(F.subject),rows=Object.fromEntries(v.pages[0].rows);
 assert.equal(c.name,'Cometa Westphal');assert.equal(rows['Perielio e afelio'],'0,179 e 4,93 UA');assert.equal(rows.Periodo,'6,7 anni');
 assert.ok(v.pages[0].concept.text.includes('59,6 km/s al perielio, 2,16 km/s all\'afelio'));
 assert.ok(md.includes('perielio a 0,179 UA e l\'afelio a 4,93 UA')&&md.includes('59,6 km/s al perielio e 2,16 km/s all\'afelio')&&md.includes('periodo di 6,7 anni'));
 assert.equal(dec(c.q*F.subject.vq,1),'10,6');assert.equal(dec(c.Q*F.subject.vQ,1),'10,6');assert.ok(md.includes('circa 10,6 UA·km/s'));
 assert.ok(md.includes(`(q + Q)/2 = ${dec((c.q+c.Q)/2,2)} UA e M = ${dec(M,2)} masse solari`));
 const icy=s.belts.find(b=>b.kind==='ghiacciata'),rock=s.belts.find(b=>b.kind!=='ghiacciata'),B=b=>whatHappens({kind:'belt',name:b.name,icy:b.kind==='ghiacciata',aIn:b.aIn,aOut:b.aOut,M,count:b.count,inner:b.inner,outer:b.outer,laps:b.rings.map(r=>2*Math.PI/r.omega)});
 const I=Object.fromEntries(B(icy).rows);assert.deepEqual([I['Distanza dalla stella'],I['Periodo al bordo interno'],I['Periodo al bordo esterno']],['da 54,5 a 103,0 UA','661,3 anni','1717,6 anni']);
 assert.ok(B(icy).concept.text.includes('2,60 volte di più')&&dec((103/54.5)**1.5,2)==='2,60');
 assert.ok(md.includes('va da 54,5 a 103,0 UA. Al bordo interno un giro dura 661,3 anni, al bordo esterno 1717,6 anni, e il rapporto 2,60 coincide con (103,0/54,5)^1,5'));
 assert.equal(Object.fromEntries(B(rock).rows)['Distanza dalla stella'],'da 0,30 a 0,37 UA');assert.ok(md.includes('da 0,30 a 0,37 UA'));
 const meteor=whatHappens({kind:'planet',name:'Terrestre',a:1,M:1,L:1,teff:5772,atm:null,air:true,showers:[{name:'Cometa Encke',speed:40,active:true,next:0}],unit:null}).pages.find(p=>p.key==='meteore');
 assert.ok(meteor.rows.some(r=>r[1]==='800 kJ')&&meteor.concept.text.includes('191 g di tritolo'));assert.ok(md.includes('= 800 kJ, pari a 191 g di tritolo'));
 // The documents the table points to, and the rules of the prose.
 for(const [file,h] of [['docs/STAZIONI_NAVI.md','## Traffico di servizio'],['docs/STAZIONI_NAVI.md','## Che cosa succede'],['docs/STAZIONI_NAVI.md','## Comete, sciami e cinture'],['docs/GRAPHICS.md','## Atmosfere visibili (1.59.0)'],['docs/GRAPHICS.md','## Comete, sciami e cinture (1.60.0)']])assert.ok(read(file).includes(h),file+' '+h);
 for(const p of prose(md))for(const r of STYLE)assert.ok(!r.test(p),p.slice(0,80));
});
