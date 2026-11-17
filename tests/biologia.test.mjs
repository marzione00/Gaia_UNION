// Volume di biologia (astrobiologia): struttura dei capitoli originali e numeri ricalcolati.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseChapter} from '../src/book/markdown.js';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const index=JSON.parse(await read('content/libro/index.json'));
const biologia=index.capitoli.filter(c=>c.volume==='Biologia');
const minWords={'biology-03':7000};
const r=(x,d)=>d<0?Math.round(x/10**-d)*10**-d:+x.toFixed(d);
test('Biologia: ogni capitolo è completo, collegato e scritto nello stile del sito',async()=>{
 assert.ok(biologia.length>=1);
 for(const c of biologia){
  const src=await read(c.file),ch=parseChapter(src),ids=new Set([...ch.toc.map(t=>t.id),...ch.figures,...ch.exercises.map(e=>e.id)]);
  assert.equal(ch.meta.unit,c.unit);assert.equal(ch.meta.volume,'Volume di biologia');assert.match(ch.meta.fonte,/Testo originale/,c.unit);assert.match(src,/## Fonti \{#fonti\}/);
  assert.ok(ch.words>=(minWords[c.unit]||5000),c.unit+' '+ch.words);assert.ok(ch.toc.filter(t=>t.level===2).length>=12,c.unit);assert.ok(ch.figures.length>=5,c.unit);
  assert.ok(ch.exercises.length>=15&&ch.exercises.every(e=>e.solution),c.unit);for(const lv of ['base','medio','avanzato'])assert.ok(ch.exercises.filter(e=>e.level===lv).length>=4,c.unit+' '+lv);
  for(const l of ch.links){if(l.startsWith('#'))assert.ok(ids.has(l.slice(1)),c.unit+' '+l);}
  const text=src.replace(/^---[\s\S]*?\n---\n/,''),prose=text.replace(/::: figura[\s\S]*?\n---\n/g,'');
  assert.equal((text.match(/\$\$/g)||[]).length%2,0,c.unit);
  for(const para of prose.replace(/\$\$[\s\S]*?\$\$/g,'').split(/\n\s*\n/))assert.equal((para.match(/\$/g)||[]).length%2,0,c.unit+': '+para.slice(0,80));
  assert.ok(!src.includes('—'),c.unit);assert.ok(!/non solo/i.test(prose),c.unit);assert.ok(!/\bnon\b[^.;:\n]{0,80}\bma\b/i.test(prose),c.unit);assert.ok(!/\bnon\b[^.;\n]{0,70}:/i.test(prose),c.unit);assert.ok(!/, e non /i.test(prose),c.unit);
  // Figures are cited by number: every «figura N» must exist.
  for(const m of prose.matchAll(/\bfigura (\d+)\b/g))assert.ok(+m[1]>=1&&+m[1]<=ch.figures.length,c.unit+' figura '+m[1]);
 }
});
// Constants (SI 2019 exact values, CODATA 2022).
const R=8.314462618,F=96485.33212,NA=6.02214076e23,T25=298.15,T37=310.15,T70=343.15;
test('Biologia 03: membrane e protocellule, numeri ricalcolati',()=>{
 // Packing parameter with Tanford's estimates.
 const v=n=>27.4+26.9*n,l=n=>1.5+1.265*n;
 assert.equal(r(v(16),0),458);assert.equal(r(l(16),1),21.7);assert.equal(r(v(16)/(64*l(16)),2),0.33);assert.equal(r(2*v(16)/(64*l(16)),2),0.66);
 assert.equal(r(v(12),0),350);assert.equal(r(l(12),1),16.7);assert.equal(r(v(12)/(60*l(12)),2),0.35);assert.equal(r(v(12)/(35*l(12)),2),0.6);
 // Critical micelle concentrations of diacyl PCs (Avanti): more than seven orders of magnitude, ratios per two carbons.
 const cmc=[15e-3,0.27e-3,5e-6,90e-9,6e-9,0.46e-9],ratios=cmc.slice(1).map((c,i)=>cmc[i]/c);
 assert.ok(Math.log10(cmc[0]/cmc[5])>7);assert.equal(r(Math.min(...ratios),0),13);assert.equal(r(Math.max(...ratios),0),56);
 // Aggregation balance.
 assert.equal((50-20)/50,0.6);assert.equal(5/25,0.2);assert.equal(r(50/3,1),16.7);assert.equal(r(15/35,2),0.43);
 // Lipids in vesicles.
 const S=x=>4*Math.PI*x**2;
 assert.equal(r(S(50),-2),31400);assert.equal(r(S(46),-2),26600);assert.equal(r((S(50)+S(46))/0.64/1e4,1),9.1);assert.equal(r(2*S(50)/0.64/1e4,1),9.8);
 assert.equal(r((S(100)+S(96))/0.64/1e5,1),3.8);
 // Permeation times tau = r/(3P), r in cm.
 const tau=(rcm,P)=>rcm/(3*P);
 assert.equal(r(tau(5e-6,2e-3)*1e4,0),8);assert.equal(r(tau(5e-6,1e-10)/1e4,1),1.7);assert.equal(r(tau(5e-6,1e-10)/3600,1),4.6);assert.equal(r(tau(5e-6,1e-12)/86400,0),19);
 assert.equal(r(tau(5e-4,2e-3),2),0.08);assert.equal(r(tau(5e-4,1e-10)/86400,0),19);assert.equal(r(tau(5e-4,1e-12)/86400/365.25,1),5.3);
 assert.equal(r(tau(1e-4,2e-3)*1e3,0),17);assert.equal(r(tau(1e-4,1e-10)*Math.LN2/3600,0),64);assert.equal(r(tau(1e-4,1e-10)/1e5,1),3.3);
 const t5=tau(5e-6,1e-10);assert.equal(r(1-Math.exp(-3600/t5),2),0.19);assert.equal(r(1-Math.exp(-86400/t5),3),0.994);assert.equal(r(3600/t5,3),0.216);assert.equal(r(86400/t5,2),5.18);
 assert.equal(r(1e-11*S(5e-8)*NA,2),0.19);
 // Osmotic pressures.
 assert.equal(r(10*R*T25/1e4,2),2.48);assert.equal(r(10*R*T25/(1000*9.80665),1),2.5);assert.equal(r(50*R*T25/1e3,0),124);assert.equal(r(50*R*T25/101325,2),1.22);
 assert.equal(r(1000*R*T25/1e6,1),2.5);assert.equal(r(0.1/1.1,3),0.091);assert.equal(r(2.48e4*5e-8/2*1e3,2),0.62);
 // Nernst potentials and Gibbs energies.
 const k=R*T37/F;
 assert.equal(r(k*1e3,2),26.73);assert.equal(r(k*Math.LN10*1e3,1),61.5);assert.equal(r(k*Math.log(5/150)*1e3,1),-90.9);assert.equal(r(k*Math.log(145/12)*1e3,1),66.6);
 assert.equal(r(-k*Math.log(11)*1e3,1),-64.1);
 assert.equal(r(R*T37*Math.log(12/145)/1e3,1),-6.4);assert.equal(r(-F*0.070/1e3,1),-6.8);assert.equal(r((R*T37*Math.log(12/145)-F*0.070)/1e3,1),-13.2);
 assert.equal(r(R*T37*Math.log(5/150)/1e3,2),-8.77);assert.equal(r(F*0.070/1e3,2),6.75);assert.equal(r((R*T37*Math.log(5/150)+F*0.070)/1e3,1),-2);
 const k25=R*T25/F;assert.equal(r(k25*Math.LN10*1e3,1),59.2);assert.equal(r(0.150/(k25*Math.LN10),1),2.5);assert.equal(r(-R*T25*Math.log(1e4)/1e3,1),-22.8);assert.equal(r(30.5/22.8,2),1.34);
 const k70=R*T70/F;assert.equal(r(k70*1e3,2),29.57);assert.equal(r(k70*Math.log(30)*1e3,1),100.6);assert.equal(r(k*Math.log(30)*1e3,1),90.9);assert.equal(r(k70*Math.LN10*1e3,1),68.1);
 // Geometry of division.
 assert.equal(r(2*Math.SQRT1_2**3,2),0.71);assert.equal(r(2**1.5,2),2.83);assert.equal(4*0.5**3,0.5);
 // Encapsulation numbers.
 const V=4/3*Math.PI*(46e-9)**3*1e3;
 assert.equal(r(V*1e19,2),4.08);assert.equal(r(1e-6*V*NA,2),0.25);assert.equal(r(1/(V*NA)*1e6,2),4.07);assert.equal(r(55.5*V*NA/1e7,1),1.4);
 const V200=4/3*Math.PI*(1e-7)**3*1e3;assert.equal(r(V200*1e18,2),4.19);assert.equal(r(55.5*V200*NA/1e8,1),1.4);
 assert.equal(r(1-Math.exp(-0.25),3),0.221);assert.equal(r((1-Math.exp(-0.25))**2,3),0.049);assert.equal(r(-Math.log(0.05),1),3);assert.equal(r(-Math.log(0.05)*4.07,0),12);
 // Gorter and Grendel, feeding by micelles.
 assert.equal(r(4.7e9*99e-12,3),0.465);assert.equal(r(0.98/0.465,1),2.1);assert.equal(r(9.1e4/50/1e3,1),1.8);
});
test('Biologia 01: che cos\'è la vita, numeri ricalcolati',()=>{
 // Clausius-Clapeyron with the normal boiling point as reference (model of the unit).
 const Teb=(p,H=40.7,p0=101.325,T0=373.15)=>1/(1/T0-R*Math.log(p/p0)/(H*1000))-273.15,pv=(t,H=40.7)=>101.325*Math.exp(-H*1000/R*(1/(t+273.15)-1/373.15));
 assert.equal(r(Teb(33.7),1),71.1);assert.equal(r(Teb(50),1),80.9);assert.equal(r(Teb(200),1),120.4);assert.equal(r(Teb(1000),1),178.9);assert.equal(r(Teb(16530),0),337);
 assert.equal(r(Teb(0.611657),1),-4.6);assert.equal(r(Teb(0.611657,45.05),1),2.9);assert.equal(r(-R*Math.log(0.611657/101.325)/(1/273.16-1/373.15)/1e3,1),43.3);
 assert.equal(r(Math.log(33.7/101.325),3),-1.101);assert.equal(r(R/40700*1e4,3),2.043);assert.equal(r(1/(1/373.15-R*Math.log(33.7/101.325)/40700)*1e0,1),344.3);
 assert.equal(r(pv(25),2),3.74);assert.equal(r(pv(25,44),2),2.86);assert.equal(r((pv(25)-3.17)/3.17*100,0),18);assert.equal(r((pv(25,44)-3.17)/3.17*100,0),-10);
 assert.equal(r(pv(45),1),10.5);assert.equal(r(pv(37),2),7.05);assert.equal(r((pv(37)-6.28)/6.28*100,0),12);
 // Two-point enthalpy and the Mars and Titan estimates.
 assert.equal(r(R*Math.log(101.42/47.41)/(1/353.15-1/373.15)/1e3,1),41.7);
 assert.equal(r(Teb(1.2,45,0.611657,273.16),1),9.6);assert.equal(r(1/(1/111.67-R*Math.log(146.7/101.325)/8190),1),116.6);
 // Arrhenius slowdown from 300 K to 94 K.
 assert.equal(r(Math.log10(Math.exp(50000/R*(1/94-1/300))),1),19.1);assert.equal(r(Math.exp(20000/R*(1/94-1/300))/1e7,1),4.3);
 // Elements, water and ice.
 assert.equal(r(18.5/0.02,0),925);assert.equal(r(3.2/0.0019,-2),1700);assert.equal(r(9.5/0.14,0),68);assert.equal(r(1181404/531560,2),2.22);
 assert.equal(r(4.18*1000*80/1e3,0),334);assert.equal(r(1000/18.015*40.7,-1),2260);assert.equal(r(1000/18.015*40.7/(4.18*80),1),6.8);assert.equal(r(1000/2.44,-1),410);
 assert.equal(r(0.9167/1.025,3),0.894);assert.equal(r(0.9167/0.99984,3),0.917);assert.equal(r((1-0.9167/0.99984)*100,0),8);assert.equal(r((0.99984/0.9167-1)*100,0),9);
 assert.equal(r((16.53e6-101325)/(1025*9.81),-1),1630);assert.equal(r(1025*9.81*100/1e6,1),1);
 assert.equal(239.82-195.42>44.39,true);assert.equal(r(111.67-90.69,1),21);assert.equal(r(184.55-90.36,1),94.2);
 // Solar abundances (Asplund et al. 2009): carbon about eight times silicon by number.
 assert.equal(r(10**(8.43-7.51),0),8);
});
