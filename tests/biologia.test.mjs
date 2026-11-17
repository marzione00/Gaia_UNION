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
test('Biologia 02: cellule, scala e superficie, numeri ricalcolati',()=>{
 const sv=d=>6/d,sph=d=>Math.PI/6*d**3;
 assert.equal(sv(1),6);assert.equal(r(sv(10),1),0.6);assert.equal(r(sv(100),2),0.06);assert.equal(sv(0.4),15);assert.equal(sv(20),0.3);
 // E. coli as a capsule 1 um wide and 2 um long.
 const V=Math.PI*0.25+4/3*Math.PI*0.125,S=2*Math.PI*0.5+Math.PI;assert.equal(r(V,2),1.31);assert.equal(r(S,2),6.28);assert.equal(r(S/V,1),4.8);
 const re=(3*V/4/Math.PI)**(1/3);assert.equal(r(re,2),0.68);assert.equal(r(3/re,1),4.4);assert.equal(r((S/V)/(3/re)*100-100,0),9);
 // Abbe limit, cubes, Krogh radius.
 assert.equal(r(550/2.8/1e3,2),0.2);assert.equal(r(450/2.8/1e3,2),0.16);assert.equal(54/27,2);assert.equal(162/27,6);
 const q=0.25/22.414/60/0.07;assert.equal(r(0.25/22.414/60*1e4,2),1.86);assert.equal(r(q*1e3,1),2.7);assert.equal(r(Math.sqrt(6*2e-9*0.26/2.7e-3)*1e3,1),1.1);
 assert.equal(r(Math.sqrt(35/21),2),1.29);assert.equal(r(Math.SQRT1_2,2),0.71);
 // Diffusion times t = x^2/(6D).
 assert.equal(r(1/(6*8),2),0.02);assert.equal(r(1e4/(6*7.7),0),216);assert.equal(r(1e8/(6*7.7)/86400,0),25);assert.equal(r(1e-6/(6*2e-9),0),83);assert.equal(r(100/48,1),2.1);assert.equal(r(0.01*1e6/3600,1),2.8);
 // Volumes, genome, membrane fraction.
 assert.equal(r(sph(20)/1.31,-2),3200);assert.equal(r(0.7e-12/18*NA/1e10,1),2.3);assert.equal(r((6*0.009/Math.PI)**(1/3),2),0.26);assert.equal(r(1.31/0.009,0),146);
 const m=543000*650/NA,Vd=m/1.7/1e-12;assert.equal(r(m*1e16,2),5.86);assert.equal(r(Vd*1e4,1),3.4);assert.equal(r(sph(0.05)*1e5,1),6.5);assert.equal(r(Vd/sph(0.05),0),5);assert.equal(r(Vd/sph(0.1),2),0.66);
 assert.equal(r(1-(41/50)**3,2),0.45);assert.equal(r(1-(391/400)**3,2),0.07);
 // Red blood cell, hypha, giant and tiny bacteria, gelatine cubes.
 const rr=(3*90/4/Math.PI)**(1/3);assert.equal(r(rr,2),2.78);assert.equal(r(4*Math.PI*rr**2,0),97);assert.equal(r(136/(4*Math.PI*rr**2),2),1.4);
 const Vh=Math.PI*2.5**2*1e4,rh=(3*Vh/4/Math.PI)**(1/3);assert.equal(r(Vh/1e5,2),1.96);assert.equal(r(rh,0),36);assert.equal(r(3/rh,3),0.083);
 assert.equal(r(1-(373/375)**3,3),0.016);
 const Vp=Math.PI*0.08**2*0.44+4/3*Math.PI*0.08**3,Sp=2*Math.PI*0.08*0.44+4*Math.PI*0.08**2;assert.equal(r(Vp,4),0.011);assert.equal(r(Sp,3),0.302);assert.equal(r(Sp/Vp,0),27);
 assert.equal(r(1-0.2**3,2),0.99);assert.equal(r(1-0.6**3,2),0.78);assert.equal(r(1-0.8**3,2),0.49);assert.equal(r(2*Math.SQRT2,1),2.8);
});
test('Biologia 04: elementi e molecole nello spazio, numeri ricalcolati',()=>{
 const rel=(T,E)=>Math.exp(-E*1000/(R*T)),kB=1.380649e-23,h=6.62607015e-34,c=299792458,u=1.66053906660e-27;
 assert.equal(r(rel(300,2),2),0.45);assert.equal(r(rel(100,2),3),0.09);assert.equal(r(rel(10,2)*1e11,1),3.6);assert.equal(r(Math.log10(rel(10,10)),0),-52);
 assert.equal(r(5000/(R*Math.log(1000)),0),87);assert.equal(r(Math.exp(1000/R*(1/10-1/20)),-1),410);assert.equal(r(1000/R,1),120.3);
 // Nuclear energies.
 assert.equal(r((3*4.002602-12)*931.494,2),7.27);assert.equal(r((3*4.002602-12)/12.007806*100,3),0.065);
 assert.equal(r((4*1.007825-4.002602)*931.494,1),26.7);assert.equal(r((4*1.007825-4.002602)/(4*1.007825)*100,2),0.71);
 // Solar abundances (Asplund et al. 2009) and the phosphorus budget.
 assert.equal(r(10**(8.69-12)*1e6,-1),490);assert.equal(r(10**(8.43-12)*1e6,-1),270);assert.equal(r(10**(7.83-12)*1e6,0),68);assert.equal(r(10**0.26,1),1.8);
 assert.equal(r(1/10**(8.43-12),-2),3700);assert.equal(r(10**(8.43-5.41),-1),1050);assert.equal(r(10**(8.43-5.41)/106,0),10);
 assert.equal(r((50/12.01)/(3/30.97),0),43);assert.equal(r(1050/43,0),24);assert.equal(r(1/0.013,-1),80);
 // Molecules: CO line, levels, populations; glycine.
 assert.equal(r(c/115.27e9*1e3,1),2.6);const hBk=h*57.64e9/kB;assert.equal(r(hBk,2),2.77);assert.deepEqual([1,2,3,4].map(J=>r(hBk*J*(J+1),1)),[5.5,16.6,33.2,55.3]);
 assert.deepEqual([1,2,3,4].map(J=>r(2*57.64*J,1)),[115.3,230.6,345.8,461.1]);assert.equal(r(3*Math.exp(-5.53/10),2),1.73);assert.equal(r(3*Math.exp(-5.53/30),2),2.49);
 assert.equal(r(2*12.011+5*1.008+14.007+2*15.999,2),75.07);
 // Kinetics in a cloud.
 const v=(m,T)=>Math.sqrt(8*kB*T/(Math.PI*m*u));assert.equal(r(v(2.01588,10),0),324);assert.equal(r(1e4*1e-15*v(2.01588,10)*100*1e7,1),3.2);assert.equal(r(1/(1e4*1e-15*v(2.01588,10)*100)/86400/7,0),5);
 assert.equal(r(1/(2e-9*1e4)/3600,0),14);assert.equal(r(v(28.0101,10),0),87);assert.equal(r(1/(1e-21*2e4*8.7e3)/3.15576e7/1e5,1),1.8);
});
test('Biologia 05: meteoriti, comete e asteroidi, numeri ricalcolati',()=>{
 const M=(F,f,t)=>F*f*t*1e-5;
 assert.equal(r(M(10,2,100),3),0.02);assert.equal(r(M(10,2,125),3),0.025);assert.equal(r(M(10,2,250),2),0.05);assert.equal(r(M(100,2,125),2),0.25);assert.equal(r(M(100,2,250),1),0.5);
 assert.equal(r(1e7*0.02*1e8,-11),2e13);assert.equal(r(2e13/5.5e14,3),0.036);assert.equal(r(1e9*0.02*5e8/5.5e14,0),18);assert.equal(r(1e9*0.02*5e8*0.01/5.5e14,2),0.18);
 // Isotopes.
 const Rv=0.0111802;assert.equal(r(Rv*1.0445,6),0.011678);assert.equal(r(Rv*0.975,6),0.010901);assert.equal(r((Rv*1.0445)/(Rv*0.975)-1,2),0.07);
 assert.equal(r((44.5-20)/(44.5+25),2),0.35);assert.equal(r(1.56e-4/2e-5,1),7.8);assert.equal(r(5.3e-4/1.56e-4,1),3.4);assert.equal(r((1.56-1.4)/(5.3-1.4),2),0.04);
 // Comet 67P, flux, oceans, snow line, Strecker.
 assert.equal(r(1e13/1.88e10,-1),530);assert.equal(r(1e10/1e13*100,1),0.1);assert.equal(r(1000*6.45,-2),6500);
 assert.equal(r(5.2e9/5.1e8,0),10);assert.equal(r(5200/365,0),14);assert.equal(r(100*0.02,0),2);assert.equal(r(100*60e-6*1000,0),6);
 assert.equal(r(1.4e21/0.1/5.97e24*100,2),0.23);assert.equal(r((278/170)**2,1),2.7);assert.equal(r(6/75.07*30.03,1),2.4);
});
test('Biologia 06: chiralità e omochiralità, numeri ricalcolati',()=>{
 const ee=(e0,g,n)=>{const a=e0/100;return a*g**n/Math.sqrt(1+a*a*(g**(2*n)-1))*100;};
 assert.deepEqual([0,1,2,3,4,5,6].map(n=>r(ee(1,3,n),1)),[1,3,9,26.1,62.9,92.5,99.1]);
 assert.equal(r(0.27/Math.sqrt(1+1e-4*728),3),0.261);assert.equal(r(ee(1,2,5),1),30.5);assert.equal(r(ee(1,2,7),0),79);assert.equal(r(ee(1,2,8),0),93);
 const y=0.9/Math.sqrt(1-0.81);assert.equal(r(y,3),2.065);assert.equal(r(Math.log(y/0.001)/Math.log(2),2),11.01);assert.equal(r(Math.log(y/0.001)/Math.log(4),1),5.5);
 assert.equal(r(ee(0.1,2,11),1),89.9);assert.equal(r(ee(0.1,2,12),0),97);assert.equal(r(ee(0.1,4,6),0),97);
 // Optical rotation and composition.
 assert.equal(r(66.5*1*0.30,0),20);assert.equal(r(-4.6/(2*0.05),0),-46);assert.equal(r(13.3/66.5,2),0.2);assert.equal(r((52.7-92.4)/2,1),-19.9);
 assert.equal((80-20)/100,0.6);assert.equal((1+0.3)/2,0.65);assert.equal((75-25)/100,0.5);assert.equal(r((1+0.013)/2*100,2),50.65);
 assert.equal(r(1/Math.sqrt(1e4),2),0.01);assert.equal(1/Math.sqrt(1e12),1e-6);assert.equal(r(Math.sqrt(1e6)/1e6*100,1),0.1);
 // Probabilities of all-L chains and the isovaline excess.
 assert.equal(r(0.5**100*1e31,1),7.9);assert.equal(r(0.75**100*1e13,1),3.2);assert.equal(r(0.995**100,2),0.61);
 assert.equal(r((1+0.159)/2*100,0),58);assert.equal(r((1+0.211)/2*100,0),61);assert.equal(r((1+0.185)/2*100,0),59);
});
test('Biologia 07: sintesi prebiotica, numeri ricalcolati',()=>{
 const c=(t,P,th)=>{const k=Math.LN2/th;return P/k*(1-Math.exp(-k*t));};
 assert.equal(r(Math.LN2/20,4),0.0347);assert.equal(r(20/Math.LN2,1),28.9);assert.equal(r(c(50,1,20),1),23.8);assert.equal(r(c(100,1,20),1),28);assert.equal(r((1-Math.exp(-Math.LN2/20*50))*100,0),82);
 assert.equal(r(Math.LN10/Math.LN2,2),3.32);assert.equal(r(20*Math.LN10/Math.LN2,0),66);assert.equal(r(1/(Math.LN2/20+0.1),1),7.4);assert.equal(r(40/Math.LN2,1),57.7);
 assert.equal(r(5*(1.008+12.011+14.007),2),135.13);assert.equal(r(0.01*75.07,2),0.75);assert.equal(r(28.9*100/1000,1),2.9);
 // Ribose (Larralde, Robertson, Miller 1995) and Arrhenius interpolation.
 const t100=73/60/24/365.25,ratio=44/t100,Ea=R*Math.log(ratio)/(1/273.15-1/373.15);
 assert.equal(r(ratio/1e5,2),3.17);assert.equal(r(Ea/1e3,0),107);const f25=Math.exp(Ea/R*(1/273.15-1/298.15));assert.equal(r(Math.log(f25),2),3.96);assert.equal(r(f25,0),53);assert.equal(r(44/f25,2),0.84);
 assert.equal(r(44*Math.exp(-Ea/R*(1/273.15-1/333.15))*365.25,1),3.2);assert.equal(r(1440/73,1),19.7);assert.equal(r(2**(-1440/73)*1e6,1),1.2);
 // Dice simulation.
 assert.equal(r(6/(1/6),0),36);assert.equal(r(Math.LN2/Math.log(6/5),1),3.8);
});
test('Biologia 08: energia, enzimi e catalisi, numeri ricalcolati',()=>{
 const RT=(T)=>R*T/1000;
 assert.equal(r(Math.exp(-14200/(R*298.15))*1e3,1),3.3);assert.equal(r(Math.exp(16300/(R*298.15)),-1),720);
 assert.equal(r(-30.5+RT(310.15)*Math.log(5e-4),0),-50);assert.equal(r(RT(310.15),2),2.58);
 assert.equal(r(Math.exp(10000/(R*298.15)),1),56.5);assert.equal(r(Math.exp(50000/(R*298.15))/1e8,2),5.75);assert.equal(r(Math.exp(20000/(R*298.15))/1e3,1),3.2);
 assert.equal(r(RT(298.15)*Math.log(1e6),0),34);assert.equal(r(RT(298.15)*Math.LN10,1),5.7);
 assert.equal(r(Math.exp(50000/R*(1/298.15-1/308.15)),1),1.9);assert.equal(r(10e-6/60/1e-9,0),167);
 // OMP decarboxylase (Radzicka and Wolfenden 1995).
 assert.equal(r(Math.LN2/2.8e-16/3.15576e7/1e6,0),78);assert.equal(r(Math.LN2/2.8e-16,-14),2.5e15);assert.equal(r(39/2.8e-16/1e17,1),1.4);assert.equal(r(RT(298.15)*Math.log(39/2.8e-16),0),98);
 // ATP turnover and power.
 assert.equal(r(0.4*8400/50,1),67.2);assert.equal(r(67.2*0.507,0),34);assert.equal(r(8.4e6/86400,0),97);
 // Michaelis-Menten.
 const v=(S,V,K)=>V*S/(K+S);
 assert.equal(v(2,10,2),5);assert.equal(r(v(10,10,2),2),8.33);assert.equal(r(v(2,10,6),1),2.5);assert.equal(r(v(18,10,2)/10,2),0.9);assert.equal(r(v(198,10,2)/10,2),0.99);
 assert.equal(r(1/0.2,0),5);assert.equal(r(1/v(5,10,2),3),0.14);
 assert.equal(r(Math.exp(80000/R*(1/298.15-1/373.15)),-1),660);
});
test('Biologia 09: sorgenti idrotermali e metanogenesi, numeri ricalcolati',()=>{
 const RL=T=>R*T*Math.LN10/1000, F=96485.33212;
 assert.equal(r((1025*9.81*2000+101325)/1e5,0),202);assert.equal(r(RL(298.15),2),5.71);assert.equal(r(4*RL(298.15),2),22.83);
 // Methanogenesis: NBS formation energies, enthalpies and entropies.
 const G0=-50.72-2*237.13+394.36;assert.equal(r(G0,1),-130.6);
 const dH=-74.81-2*285.83+393.509,dS=(186.264+2*69.91-213.74-4*130.684)/1000;assert.equal(r(dH,1),-253);assert.equal(r(dS*1000,1),-410.4);assert.equal(r(dH-298.15*dS,1),-130.6);
 const g=(lp,a=0,T=298.15)=>(T===298.15?G0:dH-T*dS)+RL(T)*a-4*RL(T)*lp;
 assert.equal(r(g(-4),0),-39);assert.equal(r(g(-5),0),-16);assert.equal(r(10**(G0/(4*RL(298.15)))*1e6,1),1.9);
 const th=(G0+20)/(4*RL(298.15));assert.equal(r(th,2),-4.84);assert.equal(r(10**th*1e5,1),1.4);assert.equal(r(10**th*0.78e-3*1e9,0),11);
 assert.equal(r((G0-2*RL(298.15)+20)/(4*RL(298.15)),2),-5.34);assert.equal(r(10**((G0-2*RL(298.15)+20)/(4*RL(298.15)))*1e6,1),4.5);
 assert.equal(r(8*F*0.17/1000,0),131);assert.equal(r(8*F*1.23/1000,-1),950);assert.equal(r(4*-237.13,0),-949);
 // Temperature dependence.
 assert.equal(r(dH-373.15*dS,0),-100);assert.equal(r(dH/dS-273.15,0),343);
 const tz=lp=>dH/(dS+4*R*Math.LN10/1000*lp)-273.15;assert.equal(r(tz(-4),0),80);assert.equal(r(tz(-2),0),176);
 // Exercise data (rounded tables).
 assert.equal(r(-74.8-571.6+393.5,1),-252.9);assert.equal(r(186.3+139.8-213.7-522.8,1),-410.4);assert.equal(r(-252.9+298.15*0.4104,1),-130.5);
 assert.equal(r(253000/410.4,0),616);assert.equal(r(253000/(410.4+8*R*Math.LN10)-273.15,0),176);
 const g100=-253+373.15*0.4104;assert.equal(r(g100,1),-99.9);assert.equal(r(RL(373.15),2),7.14);assert.equal(r(g100+16*RL(373.15),1),14.4);
 const lp100=(g100+20)/(4*RL(373.15));assert.equal(r(lp100,2),-2.79);assert.equal(r(10**lp100*1e3,1),1.6);assert.equal(r(10**lp100/10**th,-1),110);
 // Pyrite, olivine, Henry, gradients, acetogens, ethanol, Enceladus.
 assert.equal(r(-166.9+100.4+27.8,1),-38.7);assert.equal(r(1000/(55.845+32.06),1),11.4);assert.equal(r(1000/(55.845+32.06)*2.016,1),22.9);
 const Mf=2*55.845+28.086+4*15.999;assert.equal(r(Mf,1),203.8);assert.equal(r(1000/Mf*2/3,2),3.27);assert.equal(r(1000/Mf*2/3*2.016,1),6.6);assert.equal(r(1000/Mf*2/3*22.71,0),74);
 assert.equal(r(1.5/0.78,1),1.9);assert.equal(r(G0-4*RL(298.15)*Math.log10(1.5/0.78),0),-137);
 assert.equal(r(3*RL(298.15),1),17.1);assert.equal(r(RL(298.15)/F*1e6,1),59.2);assert.equal(r(3.5*RL(298.15),1),20);assert.equal(r(F*0.18/1000,1),17.4);assert.equal(r(50/(F*0.18/1000),1),2.9);
 assert.equal(r(-95+16*RL(298.15),1),-3.7);assert.equal(r((-95+20)/(4*RL(298.15)),2),-3.28);assert.equal(r(10**((-95+20)/(4*RL(298.15)))/10**th,0),36);
 assert.equal(r(9.6-8*RL(298.15),0),-36);assert.equal(50/20,2.5);assert.equal(120/20,6);
 assert.equal(r(10**(10-6.6),-2),2500);assert.equal(r(-0.0591596*10,2),-0.59);
});
test('Biologia 10: il mondo a RNA, numeri ricalcolati',()=>{
 const G=(N0,f,n)=>N0*(1+f)**n;
 assert.equal(G(1,1,10),1024);assert.equal(r(G(1,0.5,10),1),57.7);assert.equal(r(Math.LN2/Math.log(1.5),2),1.71);assert.equal(r(Math.LN2/Math.log(1.3),1),2.6);
 assert.equal(Math.ceil(Math.log(1000)/Math.log(1.3)),27);assert.equal(r(Math.log(1000)/Math.log(1.3),1),26.3);assert.equal(r(Math.log(1000)/Math.LN2,2),9.97);
 assert.equal(r(0.99**34,2),0.71);assert.equal(r(1.71**10,0),214);assert.equal(r(0.99**200,3),0.134);assert.equal(r(1.134**10,1),3.5);assert.equal(r(0.99**100,2),0.37);
 assert.equal(r(Math.LN10/-Math.log(0.99),-1),230);assert.equal(r(220*Math.log10(4),2),132.45);assert.equal(r(4**20/1e12,1),1.1);assert.equal(r(1e15/4**20,-2),900);
 const q=1088/1100;assert.equal(r(q,3),0.989);assert.equal(r(1/(1-q),0),92);assert.equal(r(q**34,2),0.69);assert.equal(r(q**95,2),0.35);assert.equal(r(q**200,2),0.11);
 assert.equal(2**24,16777216);assert.equal(r(1e15/6.02214076e23*250*330*1e4,2),1.37);
 assert.equal((1+0.5*10/2)**2,12.25);assert.equal(r(Math.exp(5),0),148);assert.equal(r(1.69**10,0),190);
 assert.equal(r(Math.LN10/-Math.log(0.989),0),208);assert.equal(r(-Math.log(0.989),5),0.01106);assert.equal(r(Math.exp(-Math.LN10/200),4),0.9886);
 assert.equal(r(1/0.05,6),20);assert.equal(r(20**2*0.05,6),20);
 let N=226;const L=[];for(let k=0;k<3;k++){N=N+N*(1-N/1000);L.push(r(N,0));}assert.deepEqual(L,[401,641,871]);
 let M=1;for(let k=0;k<8;k++)M=M+M*(1-M/1000);assert.equal(r(M,0),226);
 assert.equal(r(6/Math.log10(15),1),5.1);assert.equal(r(4*1.5**6,1),45.6);assert.equal(r(4*(1+0.5*5/6)**6,1),32.3);assert.equal(r((1+0.5*5/6)**6/1.5**6,2),0.71);
 assert.equal(G(1,1,3),8);assert.equal(G(1,1,6),64);assert.equal(r(G(1,0.5,3),3),3.375);assert.equal(r(G(1,0.5,6),2),11.39);
});
test('Biologia 11: DNA, codice ed espressione, numeri ricalcolati',()=>{
 const m=(a,d,t)=>a/d*(1-Math.exp(-d*t));
 assert.equal(r(4.64e6*0.34e-6,1),1.6);assert.equal(r(2*3.1e9*0.34e-9,1),2.1);assert.equal(r(4.64e6/2000,-1),2320);assert.equal(r(4.64e6/2000/60,0),39);
 assert.equal(r(4.64e6*2.2e-10*1e3,1),1);assert.equal(r(1e9*4.64e6*2.2e-10/1e6,1),1);assert.equal(r(Math.exp(-4.64e6*2.2e-10),3),0.999);
 assert.equal(5/0.2,25);assert.equal(r(Math.LN2/0.2,1),3.5);assert.equal(r(m(5,0.2,5),1),15.8);assert.equal(r(m(5,0.2,10),1),21.6);assert.equal(r(Math.LN10/0.2,1),11.5);assert.equal(r(Math.LN10/0.4,1),5.8);
 assert.equal(r(m(5,0.2,2.5),1),9.8);assert.equal(r(m(10,0.4,2.5),1),15.8);assert.equal(r(25*Math.exp(-2),1),3.4);assert.equal(r(Math.log(25)/0.2,0),16);
 assert.equal(r(299*110/1000,0),33);assert.equal(r(299/15,0),20);
 assert.equal(r(0.9999**300,2),0.97);assert.equal(r(0.999**300,2),0.74);assert.equal(r(64/3,0),21);assert.equal(r(3/64,3),0.047);
 assert.equal(Math.log2(64),6);assert.equal(r(Math.log2(21),2),4.39);assert.equal(r((6-Math.log2(21))/6*100,0),27);assert.equal(r(4.64e6*2/1e6,1),9.3);assert.equal(r(4.64e6*2/8/1e6,1),1.2);
 assert.equal(r(25/(Math.LN2/30),-1),1080);assert.equal(r(30/Math.LN2,0),43);assert.equal(r(0.1e-3/2e-9,-3),50000);
 // Codon table: 61 sense codons, 3 stop, degeneracies sum to 64.
 const deg=[6,6,6,4,4,4,4,4,3,3,2,2,2,2,2,2,2,2,2,1,1];assert.equal(deg.reduce((a,b)=>a+b,0),64);
 assert.equal(r(m(5,0.2,10),2),21.62);assert.equal(r(m(5,0.5,5),2),9.18);assert.equal(r(m(5,0.5,10),2),9.93);
});
test('Biologia 12: mutazioni e soglia d\'errore, numeri ricalcolati',()=>{
 const P=(mu,n)=>1-(1-mu)**n;
 assert.equal(r(P(1e-4,1000),3),0.095);assert.equal(r(P(1e-4,10000),2),0.63);assert.equal(r(Math.LN2/1e-4,-2),6900);assert.equal(r(Math.exp(-1),2),0.37);
 assert.equal(r(0.21e-3*365.25*1e6,-4),80000);assert.equal(r(0.21e-3*365.25,3),0.077);assert.equal(r(5000/(0.21e-3*365.25),-3),65000);
 assert.equal(r(1.2e-8*2*3.1e9,0),74);assert.equal(r(4.6e6*2.2e-10,3),0.001);assert.equal(r(0.003/1.7e5*1e8,1),1.8);
 assert.equal(r(Math.exp(-0.5),3),0.607);assert.equal(r(0.5*Math.exp(-0.5),3),0.303);assert.equal(r(1-1.5*Math.exp(-0.5),2),0.09);
 assert.equal(r(Math.LN10/1e-2,-1),230);assert.equal(r(Math.LN10/1e-4,-3),23000);assert.equal(r(Math.log(1000),1),6.9);
 const Q=Math.exp(-399/400);assert.equal(r(Q,2),0.37);assert.equal(r(1/Q,1),2.7);
 const x=(s,ml)=>(s*Math.exp(-ml)-1)/(s-1);assert.equal(r(x(10,1),2),0.3);assert.equal(r(x(10,2),2),0.04);assert.equal(r(Math.log(3),1),1.1);assert.equal(r(Math.LN10,1),2.3);
 assert.equal(r(Math.LN10/(0.6*1e-2),0),384);assert.equal(r(Math.log(1000)/Math.LN10,6),3);
 assert.equal(r(1-Math.exp(-0.1),3),0.095);assert.equal(2**15,32768);assert.equal(r(Math.LN10/0.03,0),77);
 assert.equal(r(60/36,2),1.67);assert.equal(r(Math.exp(-60/36),2),0.19);assert.equal(r(600/36,1),16.7);
 // Model probes: mu = 1e-4 and 2e-4 at n = 2500 and 5000.
 assert.equal(r(P(1e-4,2500),3),0.221);assert.equal(r(P(1e-4,5000),3),0.393);assert.equal(r(P(2e-4,2500),3),0.393);assert.equal(r(P(2e-4,5000),3),0.632);
 assert.equal(r(Math.log(3)/-Math.log(0.99),0),109);
});
test('Biologia 13: ereditarietà e selezione, numeri ricalcolati',()=>{
 const sel=(p,s)=>p*(1+s)/(1+s*p);const odds=p=>p/(1-p);const back=o=>o/(1+o);
 assert.equal(r(5474/1850,2),2.96);assert.equal(r(6022/2001,2),3.01);
 const O=[315,108,101,32],A=[9,3,3,1].map(k=>556*k/16);assert.deepEqual(A,[312.75,104.25,104.25,34.75]);
 assert.equal(r(O.reduce((t,o,i)=>t+(o-A[i])**2/A[i],0),2),0.47);
 assert.equal((2*360+480)/2000,0.6);assert.equal((2*490+420)/2000,0.7);assert.equal(r(2*0.98*0.02,4),0.0392);assert.equal(r(2*0.99*0.01,4),0.0198);
 assert.equal(r(sel(0.5,0.2),3),0.545);assert.equal(r(sel(0.25,0.2),3),0.286);assert.equal(r(odds(0.5)/odds(0.4),2),1.5);
 const T=(p0,p1,s)=>(Math.log(odds(p1))-Math.log(odds(p0)))/Math.log(1+s);
 assert.equal(r(T(0.01,0.99,0.1),0),96);assert.equal(r(T(0.01,0.99,0.01),0),924);assert.equal(r(T(0.01,0.99,0.5),0),23);assert.equal(r(2*Math.log(99),2),9.19);
 assert.equal(r(Math.exp((Math.log(49)+Math.log(99))/47)-1,2),0.2);assert.equal(r(Math.log(49)+Math.log(99),2),8.49);
 assert.equal(r(0.1/0.9,3),0.111);assert.equal(r((1/9)**2,3),0.012);assert.equal(r(2*(8/9)*(1/9),3),0.198);assert.equal(r(1-0.08/0.9,3),0.911);
 assert.equal(r(back(odds(0.01)*1.1**10),3),0.026);assert.equal(r(back(odds(0.01)*1.5**10),2),0.37);assert.equal(r(back(0.9**10),2),0.26);
 assert.equal(r(0.2*0.25/1.1,3),0.045);assert.equal(r(0.1*1e-4*0.99,7),9.9e-6);assert.equal(r(Math.log(100)/Math.log(1.3),1),17.6);
 // Model probes: s = 0.2 and 0.5 at p = 0.25 and 0.5; iteration agrees with the odds formula.
 assert.equal(r(sel(0.25,0.5),4),0.3333);assert.equal(r(sel(0.5,0.5),2),0.6);let p=0.01;for(let k=0;k<10;k++)p=sel(p,0.1);assert.equal(r(p,6),r(back(odds(0.01)*1.1**10),6));
 // Heterozygote advantage trajectories.
 const st=q=>{const P=1-q,w=1-P*P*0.1-q*q*0.8;return (q*q*0.2+P*q)/w;};let q=0.5;for(let k=0;k<100;k++)q=st(q);assert.equal(r(q,3),0.111);
});
test('Biologia 14: deriva genetica, numeri ricalcolati',()=>{
 const sd=(p,N)=>Math.sqrt(p*(1-p)/(2*N));
 assert.equal(r(sd(0.5,100),3),0.035);assert.equal(r(sd(0.5,10),2),0.11);assert.equal(r(sd(0.5,1e4),4),0.0035);assert.equal(r(sd(0.5,1000),3),0.011);assert.equal(r(sd(0.1,100),3),0.021);
 assert.equal(r(Math.exp(-100/100),2),0.37);assert.equal(r(Math.exp(-100/1e4),2),0.99);assert.equal(r(0.98**50,3),0.364);assert.equal(r(0.5*0.98**50,2),0.18);
 assert.equal(r(4*100*Math.LN2,-1),280);assert.equal(r(4*50*Math.LN2,0),139);assert.equal(r(-200*(0.1*Math.log(0.1)+0.9*Math.log(0.9)),0),65);assert.equal(r(4*10*Math.LN2,0),28);
 assert.equal(r(1-Math.exp(-0.02),4),0.0198);assert.equal(r((1-Math.exp(-0.02))/5e-5,-1),400);
 const f=S=>S/(1-Math.exp(-S));assert.equal(r(f(-0.4),2),0.81);assert.equal(r(f(-40)*1e16,1),1.7);assert.equal(r(f(2),2),2.31);assert.equal(r(f(-2),2),0.31);
 assert.equal(r(0.95**5,3),0.774);assert.equal(r(Math.log(0.774)/Math.log(1-1/2000),0),512);assert.equal(r(Math.log(0.95**5)/Math.log(1-1/2000),-1),510);
 assert.equal(r(3/(1/1000+1/10+1/1000),0),29);
 const V=4/3*Math.PI*(0.5e-6)**3*1000;assert.equal(r(V*1e16,1),5.2);assert.equal(r(1e-9*6.02214076e23*V,1),0.3);assert.equal(r(1e-9*6.02214076e23*V*1000,-1),320);
 assert.equal(r(0.4/1.4,2),0.29);assert.equal(r(40/41,2),0.98);assert.equal(r(0.04/2e-9/1e6,0),20);
 assert.equal(r(1000*Math.exp(-10),2),0.05);assert.equal(r(1000*Math.exp(-1),-1),370);
 // Model probes: N = 100 and 400 at p = 0.25 and 0.5.
 assert.equal(r(sd(0.25,100),4),0.0306);assert.equal(r(sd(0.5,100),4),0.0354);assert.equal(r(sd(0.25,400),4),0.0153);assert.equal(r(sd(0.5,400),4),0.0177);
});
test('Biologia 15: albero universale e LUCA, numeri ricalcolati',()=>{
 const p=d=>0.75*(1-Math.exp(-4*d/3)),D=q=>-0.75*Math.log(1-4*q/3);
 assert.equal(r(100*p(0.5),1),36.5);assert.equal(r(100*p(3),0),74);assert.equal(r(p(0.1),3),0.094);assert.equal(r(p(0.5),3),0.365);assert.equal(r(p(3),3),0.736);assert.equal(r(200*p(0.75),0),95);
 assert.equal(r(D(0.3),2),0.38);assert.equal(r(D(0.7),1),2);assert.equal(r(D(0.28),2),0.35);assert.equal(r(D(0.32),2),0.42);assert.equal(r(D(0.68),2),1.78);assert.equal(r(D(0.72),2),2.41);
 const S=['ACGTTGCAAGTCCTGAAGCT','ACGTTGCAAGTCCTGTAGCT','ACGATGCAAGTGCTGTAGCA','TCGATCCAGGTGCAGTAGCA'];
 const dif=(a,b)=>[...a].filter((c,i)=>c!==b[i]).length;
 assert.deepEqual([dif(S[0],S[1]),dif(S[0],S[2]),dif(S[1],S[2]),dif(S[0],S[3]),dif(S[1],S[3]),dif(S[2],S[3])],[1,4,3,8,7,4]);
 assert.equal(r(D(0.05),3),0.052);assert.equal(r(D(0.4),2),0.57);assert.equal(r((0.4+0.35+0.2)/3/2,3),0.158);assert.equal(r((0.2+0.15)/2/2,4),0.0875);
 assert.equal(r(D(0.05)*100*50,0),259);assert.equal(r(D(0.25)/2e-10/1e9,1),1.5);
 const df=k=>{let x=1;for(let i=k;i>0;i-=2)x*=i;return x;};assert.equal(df(5),15);assert.equal(df(17),34459425);assert.equal(r(df(37)/1e21,1),8.2);
 assert.equal(r(0.1-2/3*0.01,4),0.0933);assert.equal(r(p(0.1),4),0.0936);
 // Model probes: L = 100 and 200 at d = 0.75 and 1.5.
 assert.equal(r(100*p(0.75),2),47.41);assert.equal(r(100*p(1.5),2),64.85);assert.equal(r(200*p(0.75),2),94.82);assert.equal(r(200*p(1.5),2),129.7);
});
test('Biologia 16: tempo geologico e prime tracce, numeri ricalcolati',()=>{
 const age=(th,x)=>th/Math.LN2*Math.log1p(x),g=t=>365*(4567-t)/4567,dl=R=>(R/0.011113-1)*1000;
 assert.equal(r(g(3480),0),87);assert.equal(r(g(2400),0),173);assert.equal(r(g(538.8),0),322);assert.equal(r(365*1440/4567,0),115);assert.equal(r(0.3*365*1440/4567,1),34.5);assert.equal(r(100*(4567-538.8)/4567,0),88);assert.equal(r(g(4031),1),42.8);
 assert.equal(r((0.85080-0.70551)/2.9,5),0.0501);assert.equal(r(0.70551+0.0501*0.9,5),0.7506);assert.equal(r(age(49.6,0.0501),2),3.5);assert.equal(r(0.70551-0.0501*0.1,4),0.7005);
 assert.equal(r(dl(0.010835),1),-25);assert.equal(r(dl(0.010891),1),-20);assert.equal(r((0+5)/(0+25),2),0.2);
 assert.equal(r(Math.LN2/Math.log(6/5),2),3.8);assert.deepEqual([1,3,5,10].map(k=>r(100*(5/6)**k,0)),[83,58,40,16]);assert.equal(r(Math.log(1+40/60)/Math.log(6/5),1),2.8);assert.equal(r(Math.LN2/Math.log(12/11),1),8);
 assert.equal(age(4.468,1),4.468);assert.equal(r(age(4.468,7)/4.468,6),3);
 const s7=(0.75050-0.71020)/2;assert.equal(r(s7,5),0.02015);assert.equal(r(age(49.6,s7),2),1.43);assert.equal(r(0.71020-s7*0.5,5),0.70013);
 assert.equal(r(0.05/0.107,3),0.467);assert.equal(r(age(1.248,0.05/0.107),2),0.69);assert.equal(r(age(1.248,0.05),3),0.088);assert.equal(r(age(1.248,0.05/0.107)/age(1.248,0.05),1),7.9);
 assert.equal(r((-5+0.25*25)/0.75,1),1.7);assert.equal(r(0.5**(20000/5730),3),0.089);assert.equal(r(0.5**(50000/5730),4),0.0024);assert.equal(0.9*-30+0.1*-25,-29.5);
 const sens=x=>x/((1+x)*Math.log1p(x));assert.equal(r(sens(0.01),3),0.995);assert.equal(r(sens(1),2),0.72);assert.equal(r(sens(100),2),0.21);
 const a=2**(4/4.468)-1,b=2**(4/0.704)-1;assert.equal(r(a,3),0.86);assert.equal(r(b,1),50.3);assert.equal(r(0.8*a,3),0.688);assert.equal(r(0.8*b,1),40.3);
 assert.equal(r(age(4.468,0.8*a),2),3.37);assert.equal(r(age(0.704,0.8*b),2),3.78);assert.equal(r(b/a,1),58.5);
 assert.deepEqual([1,0.1,0.01].map(l=>r(1-Math.exp(-l*0.5),3)),[0.393,0.049,0.005]);
 const s16=(0.90040-0.71002)/3.8;assert.equal(r(s16,4),0.0501);assert.equal(r(0.71002-s16*0.2,4),0.7);assert.equal(r(0.7+0.0501*1.6,4),0.7802);assert.equal(r(0.7+0.0501,4),0.7501);
 // Model probes: half-life 1.25 and 4.5 Gyr at D/P = 0.5 and 1; extension U-238 at D/P = 0.9.
 assert.equal(r(age(1.25,0.5),3),0.731);assert.equal(age(1.25,1),1.25);assert.equal(r(age(4.5,0.5),3),2.632);assert.equal(age(4.5,1),4.5);assert.equal(r(age(4.468,0.9),2),4.14);
});
test('Biologia 17: ossigeno ed endosimbiosi, numeri ricalcolati',()=>{
 const O=(S,tau,t)=>S*tau*(-Math.expm1(-t/tau));
 assert.equal(r(1-Math.exp(-1),2),0.63);assert.equal(r(1-Math.exp(-3),2),0.95);assert.equal(r(1-Math.exp(-5),3),0.993);
 assert.equal(r(O(1,50,100),1),43.2);assert.equal(r(1-Math.exp(-2),3),0.865);assert.equal(r(O(1,100,100),0),63);assert.equal(r(O(1,50,30),1),22.6);
 const mol=5.15e18/0.02897*0.2095;assert.equal(r(mol/1e19,1),3.7);assert.equal(r(105e15/12/1e15,1),8.8);assert.equal(r(3.7e19/8.7e15,-2),4300);assert.equal(3.7e19/1e13,3.7e6);
 let o=0;const seq=[];for(let k=0;k<10;k++){o=0.8*o+10;seq.push(o);}assert.deepEqual(seq.slice(0,4).map(v=>r(v,1)),[10,18,24.4,29.5]);assert.equal(r(seq[9],1),44.6);
 const e10=seq[9]-O(1,50,100),e5=50*(1-0.9**20)-O(1,50,100);assert.equal(r(e5/e10,1),0.5);
 assert.equal(r((1-0.8)*50,6),10);assert.equal(r((10+5)/25,2),0.6);
 const q=0.1/22.414e-3*1e-6*1e6/3600;assert.equal(r(q*1e3,2),1.24);
 const R=x=>Math.sqrt(6*2e-9*0.28*x/1.24e-3)*1000;assert.equal(r(R(1),2),1.65);assert.equal(r(R(0.1),2),0.52);assert.equal(r(R(0.01),2),0.16);assert.equal(r(1.65*Math.sqrt(0.1),2),0.52);assert.equal(r(R(0.25),2),0.82);assert.equal(r(O(1,50,250),1),49.7);assert.equal(r(O(1,100,125),1),71.3);
 assert.equal(r(Math.sqrt(2*2e-9*0.28/1.24e-3)*1000,2),0.95);
 assert.equal(r(13/37,2),0.35);assert.equal(2**5,32);assert.equal(r(0.21e-5*1e6,1),2.1);
 assert.equal(r(867/3346,2),0.26);assert.equal(r(1-(867/3346)**0.01,3),0.013);assert.equal(r(Math.LN2,2),0.69);assert.equal(r(2.2/3.5,2),0.63);assert.equal(r(0.8/3.5,2),0.23);
 // Model probes: tau = 50 and 100 at t = 125 and 250 (S = 1).
 assert.equal(r(O(1,50,125),2),45.9);assert.equal(r(O(1,50,250),2),49.66);assert.equal(r(O(1,100,125),2),71.35);assert.equal(r(O(1,100,250),2),91.79);
});
test('Biologia 18: estremofili, numeri ricalcolati',()=>{
 const S=(D,d)=>10**(-D/d),aw=(ions)=>55.5/(55.5+ions);
 assert.equal(r((8.6e6-1e5)/(1025*9.81),-1),850);assert.equal(r(1025*9.81,-2),10100);
 assert.equal(r(aw(2),3),0.965);assert.equal(r(aw(1),3),0.982);assert.equal(r(55.51/(55.51+12.3),2),0.82);assert.equal(r(aw(1.2),3),0.979);assert.equal(r(2*1.86*0.6,1),2.2);
 assert.equal(10**5,1e5);assert.equal(r(10**4.5,-3),32000);
 assert.equal(r(Math.log10(S(3,0.3)),6),-10);assert.equal(r(S(3,10),2),0.5);assert.equal(r(-Math.log10(S(10,0.3)),1),33.3);assert.equal(r(S(6,2),6),1e-3);
 assert.equal(r(6*0.3,2),1.8);assert.equal(6*10,60);
 assert.equal(r(10000/0.21e-3/365.25,-4),130000);const dose=0.21e-3*365.25*1e6;assert.equal(r(dose/1000,0),77);assert.equal(r(S(dose/1000,10)*1e8,0),2);
 assert.equal(r((16.5-0.1)*1e6/(1025*9.81),-1),1630);assert.equal(r(0.1+1025*9.81*4964e-6,1),50);assert.equal(r(1025*9.81*4964e-6,1),49.9);
 assert.equal(r(S(20,10),6),0.01);assert.equal(r(S(25,10)*1e3,1),3.2);
 assert.equal(r(1000*0.113*40000/1e6,1),4.5);assert.equal(r(1000*1.31*120000/1e6,0),157);
 assert.deepEqual([0.40,0.16,0.063].map((s,i)=>r(Math.log10(s)/(2*(i+1)),2)),[-0.2,-0.2,-0.2]);assert.equal(r(9*2,0),18);
 assert.equal(r(2.303*8.314*333*3.9/1000,1),24.9);
 const nacl10=10/58.44*10,nacl5=5/58.44*10;assert.equal(r(nacl10,1),1.7);assert.equal(r(aw(2*nacl10),2),0.94);assert.equal(r(aw(2*nacl5),2),0.97);
 // Model probes: D10 = 10 and 2 kGy at D = 7.5 and 15 kGy.
 assert.equal(r(S(7.5,10),4),0.1778);assert.equal(r(S(15,10),4),0.0316);assert.equal(r(S(7.5,2)*1e4,3),1.778);assert.equal(r(S(15,2)*1e8,3),3.162);
});
test('Biologia 19: respirazione e chemiosintesi, numeri ricalcolati',()=>{
 const F=96485,dG=(n,dE)=>-n*F*dE/1000,RT=8.314462618*298.15/1000;
 assert.equal(r(0.82+0.32,2),1.14);assert.equal(r(dG(2,1.14),0),-220);assert.equal(r(dG(2,0.10),0),-19);assert.equal(r(dG(2,1.23),0),-237);
 assert.equal(r(30*30.5,0),915);assert.equal(r(915/2870,2),0.32);assert.equal(r(30*50/2870,2),0.52);assert.equal(r(32*50/2870,2),0.56);
 assert.equal(r(RT,2),2.48);const met=pH2=>-131+RT*Math.log(0.1/(pH2**4*0.1));
 assert.equal(r(Math.log(1e16)*RT,0),91);assert.equal(r(met(1e-4),0),-40);assert.equal(r(met(1e-4)/-131,2),0.3);assert.equal(r(met(1e-5),1),-16.8);assert.equal(r(met(1e-3),1),-62.5);
 assert.equal(r(Math.exp((-20+131)/(-4*RT)),7),1.38e-5);assert.equal(r(Math.log(Math.exp((-20+131)/(-4*RT))),1),-11.2);
 assert.equal(r(met(1e-4)-RT*Math.log(1e8),0),-85);assert.equal(r(RT*Math.log(1e8),0),46);
 assert.equal(10*2.5+2*1.5+4,32);assert.equal(32-2,30);assert.equal(15*2,30);
 assert.equal(r(dG(2,0.19),0),-37);assert.equal(r(dG(2,1.23)/dG(2,0.19),1),6.5);assert.equal(r(4*dG(2,0.19),0),-147);
 const mol=0.25*1440/22.4;assert.equal(r(mol,0),16);assert.equal(r(mol*2*2.5*507/1000,0),41);
 assert.equal(r(16/30,2),0.53);assert.equal(r(16/30/2*180,0),48);
 assert.equal(r(F*0.18/1000,1),17.4);assert.equal(r(50/(F*0.18/1000),1),2.9);assert.equal(r(10/3.7,1),2.7);
 assert.deepEqual([1.14,0.74,0.35,0.10].map(e=>r(dG(2,e),0)),[-220,-143,-68,-19]);
 // Model probes: yield 30 and 2 at glucose = 2.5 and 5 mmol.
 assert.deepEqual([30*2.5,30*5,2*2.5,2*5],[75,150,5,10]);
});
test('Biologia 20: fotosintesi e luce stellare, numeri ricalcolati',()=>{
 const h=6.62607015e-34,c=2.99792458e8,NA=6.02214076e23,eV=1.602176634e-19,kB=1.380649e-23,E=l=>h*c/(l*1e-9);
 assert.equal(r(E(680)*1e19,2),2.92);assert.equal(r(E(680)*NA/1000,0),176);assert.equal(r(E(450)*1e19,2),4.41);assert.equal(r(E(450)*NA/1000,0),266);
 assert.equal(r(8*E(680)*NA/1000,-1),1410);assert.equal(r(2870/6,0),478);assert.equal(r(478/1410,2),0.34);assert.equal(r(478/(10*176),2),0.27);
 assert.equal(6*3,18);assert.equal(6*2,12);
 const A=(I,Am,K)=>Am*I/(K+I)-2;assert.equal(A(200,20,200),8);assert.equal(r(A(1000,20,200),1),14.7);
 assert.equal(r(200*2/18,1),22.2);assert.equal(r(400*2/18,1),44.4);assert.equal(r(200*2/38,1),10.5);assert.equal(r(18.2*200/1.8,0),2022);
 const b=2.897771955e-3;assert.equal(r(b/5772*1e9,0),502);assert.equal(r(b/4000*1e9,0),724);assert.equal(r(b/3000*1e9,0),966);assert.equal(r(b/2570*1e9,0),1128);
 assert.equal(r(3.6697e-3/5772*1e9,-1),640);assert.equal(r(3.6697e-3/3000*1e9,-1),1220);
 const z3=1.2020569031595942,G=x=>{let s=0;for(let k=1;k<500;k++)s+=Math.exp(-k*x)*(x*x/k+2*x/k/k+2/k**3);return s/(2*z3)};
 const fr=(T,lo,hi)=>G(h*c/(hi*1e-9*kB*T))-G(h*c/(lo*1e-9*kB*T));
 assert.deepEqual([5772,3000,2566].map(T=>r(fr(T,400,700),3)),[0.217,0.027,0.011]);assert.deepEqual([5772,3000,2566].map(T=>r(fr(T,400,750),3)),[0.256,0.038,0.017]);
 assert.equal(r(0.217/0.027,1),8);assert.equal(r(0.256/0.038,1),6.7);assert.equal(r(fr(5772,400,750)/fr(5772,400,700),2),1.18);
 assert.equal(r(2000*0.85/8,-1),210);assert.equal(r(210/30,0),7);assert.equal(r(6.63e-34*3e8/450e-9*1e19,2),4.42);assert.equal(r(4.42e-19*6.02e23/1000,0),266);assert.equal(r(3.65/1.14,1),3.2);assert.equal(r(0.45/0.55,2),0.82);assert.equal(r(0.05/0.55,2),0.09);
 assert.equal(r(E(680)/eV,2),1.82);assert.equal(r(2*E(680)/eV,2),3.65);assert.equal(r(2*E(1000)/eV,2),2.48);assert.equal(r(3*E(1000)/eV,2),3.72);
 assert.equal(r(Math.log(100)/0.04,0),115);assert.equal(r(Math.log(100)/0.5,0),9);
 assert.equal(r(0.67*5772/2566,1),1.5);assert.equal(r(1.5*0.011/0.217,3),0.076);
 // Model probes: K = 200 and 400 at I = 250 and 500 (A_max = 20, R_d = 2).
 assert.deepEqual([A(250,20,200),A(500,20,200),A(250,20,400),A(500,20,400)].map(v=>r(v,2)),[9.11,12.29,5.69,9.11]);
});
test('Biologia 21: crescita delle popolazioni, numeri ricalcolati',()=>{
 const L=Math.log,R=8.314,T=c=>c+273.15,lg=(t,K,r,N0)=>K/(1+(K/N0-1)*Math.exp(-r*t)),mu=S=>0.8*S/(2+S);
 assert.equal(24*3,72);assert.equal(r(2**72/1e21,1),4.7);assert.equal(r(2**72*1e-12/1e6,-2),4700);assert.equal(r(2**144*1e-15/5.972e24,-3),4000);
 assert.equal(r(L(2)/20,3),0.035);assert.equal(r(L(2)/20*60,1),2.1);assert.equal(r((2**64-1)/1e19,1),1.8);assert.deepEqual([4e11,1e11].map(n=>r((2**64-1)/n/1e6,-1)),[50,180]);
 assert.equal(r(Math.log2(1000),2),9.97);assert.equal(r(300/Math.log2(1000),0),30);assert.equal(r(L(2)/0.5,2),1.39);
 assert.equal(150/0.1*1e6,1.5e9);
 assert.equal(r(L(9)/0.3,1),7.3);assert.equal(r(0.3*100/4,1),7.5);assert.equal(r(lg(15,100,0.3,10),0),91);assert.deepEqual([0.1,0.3,0.6].map(x=>r(L(9)/x,1)),[22,7.3,3.7]);
 assert.deepEqual([10,50,90].map(N=>r(0.3*N*(1-N/100),1)),[2.7,7.5,2.7]);
 assert.deepEqual([0.5,2,20].map(S=>r(mu(S),2)),[0.16,0.4,0.73]);assert.deepEqual([0.5,2,20].map(S=>r(L(2)/mu(S),2)),[4.33,1.73,0.95]);assert.equal(r(mu(20)/mu(2),2),1.82);
 assert.equal(2*0.4/(0.8-0.4),2);assert.equal(0.5*(100-2),49);assert.equal(r(0.8*100/102,2),0.78);assert.equal(r(L(2)/0.4,1),1.7);
 const Ea=R*L(160)/(1/T(-20)-1/T(5));assert.equal(r(L(160),3),5.075);assert.equal(r((1/T(-20)-1/T(5))*1e4,2),3.55);assert.equal(r(Ea/1000,0),119);assert.equal(r(8.314*5.08/3.55e-4/1000,0),119);
 assert.equal(r(Math.exp(Ea/R*(1/T(-10)-1/T(5))),1),18.7);assert.equal(r((1/T(-10)-1/T(5))*1e4,2),2.05);assert.equal(r((1/T(-5)-1/T(5))*1e4,2),1.34);assert.equal(r(Math.exp(Ea/R*(1/T(-5)-1/T(5))),1),6.8);
 assert.equal(r(L(2)/160,4),0.0043);assert.equal(r(160*24/0.5,-2),7700);assert.equal(r(365/160,1),2.3);assert.equal(r(2**(365/160),1),4.9);assert.ok(365*72>20000);
 assert.equal(4e3/2e6,0.002);assert.equal(r(Math.log2(1e9),1),29.9);assert.equal(r(Math.log2(1e9)*160,-2),4800);assert.equal(r(Math.log2(1e9)*160/365.25,0),13);assert.equal(r(Math.log2(1e9)*20/60,0),10);
 assert.equal(2**(180/30),64);assert.equal(50*24,1200);
 assert.equal(r(lg(5,100,0.3,10),1),33.2);assert.equal(r(lg(10,100,0.3,10),1),69.1);assert.equal(r(L(66.8/33.2),3),0.699);assert.equal(r(L(30.9/69.1),3),-0.805);assert.equal(r((0.699-L(9))/5,3),-0.3);assert.equal(r((-0.805-0.699)/5,3),-0.301);
 const d=0.02*687;assert.equal(r(d,1),13.7);assert.equal(r(d/20,2),0.69);assert.equal(r(Math.log2(1e6),1),19.9);assert.equal(r(Math.log2(1e6)/(d/20),0),29);assert.equal(r(Math.log2(1e6)/(d/20)*687/365.25,0),55);
 assert.equal(r(0.005/0.00002,0),250);assert.equal(r(2.3/0.00002,-3),115000);
 // Model probes: r = 0.3 and 0.1 at t = 7.5 and 15 (K = 100, N0 = 10).
 assert.deepEqual([lg(7.5,100,0.3,10),lg(15,100,0.3,10),lg(7.5,100,0.1,10),lg(15,100,0.1,10)].map(v=>r(v,2)),[51.32,90.91,19.04,33.24]);
});
test('Biologia 22: zona abitabile, numeri ricalcolati',()=>{
 const sig=5.670374e-8,Te=(A,S)=>((1-A)*S/(4*sig))**0.25,G=t=>1/(1+0.4*(1-t/4.57)),d=(L,S)=>Math.sqrt(L/S);
 assert.equal(r(3.828e26/(4*Math.PI*1.495978707e11**2),0),1361);assert.equal(r(1/0.723**2,2),1.91);assert.equal(r(1361/0.723**2,-2),2600);assert.equal(r(1/1.524**2,2),0.43);assert.equal(r(1361/1.524**2,0),586);
 assert.equal(r(Math.sqrt(0.001),3),0.032);assert.equal(r(0.387/Math.sqrt(0.001),0),12);assert.equal(d(4,1),2);assert.equal(d(9,1),3);
 assert.equal(r(Te(0.3,1361),0),255);assert.equal(r(Te(0.3,1361)-273.15,0),-19);assert.equal(r(Te(0.77,2601.3),0),227);assert.equal(r(Te(0.25,586.2),0),210);assert.equal(r(Te(0.3,2601.3),0),299);
 assert.equal(r(0.7*1361/(4*5.67e-8)/1e9,1),4.2);assert.equal(288-255,33);
 assert.equal(r(255*2**0.25,0),303);assert.equal(r(2-2/(288/255)**4,2),0.77);assert.equal(r((288/255)**4,2),1.63);
 assert.deepEqual([1.7753,1.014,0.3438,0.3179].map(S=>r(1/Math.sqrt(S),2)),[0.75,0.99,1.71,1.77]);
 assert.equal(r(d(2,1.1),2),1.35);assert.equal(r(d(2,0.36),2),2.36);assert.equal(r(d(2,0.36)-d(2,1.1),2),1.01);assert.equal(r(d(1,0.36)-d(1,1.1),2),0.71);assert.equal(r(d(1,1.1),2),0.95);assert.equal(r(d(1,0.36),2),1.67);
 assert.equal(r(0.00155/0.0485**2,2),0.66);assert.equal(r(0.000553/0.02925**2,2),0.65);assert.equal(r(Te(0.3,1361*0.646),0),228);assert.equal(r(0.646**0.25,2),0.9);
 assert.equal(r(d(0.0017,1),3),0.041);assert.equal(r(0.387/0.041,1),9.4);
 assert.equal(10*2/25,0.8);assert.equal(r(10*0.1/0.001,0),1000);
 assert.equal(r(G(0),2),0.71);assert.equal(r(G(0.57),2),0.74);assert.equal(r(G(5.57),2),1.1);assert.equal(r(4.57*(1+(1-1/1.1)/0.4),2),5.61);assert.equal(r(4.57*(1+(1-1/1.1)/0.4)-4.57,2),1.04);
 assert.equal(r(4.57*(1+(1-1/1.014)/0.4)-4.57,2),0.16);
 const T0=254.6*0.74**0.25;assert.equal(r(T0,0),236);assert.equal(r(Te(0.3,1361*G(0.57)),0),236);assert.equal(r((273/236)**4,2),1.79);assert.equal(r(2-2/(273/236)**4,2),0.88);assert.equal(r((288/236)**4,2),2.22);assert.equal(r(2-2/(288/236)**4,2),1.1);
 assert.equal(r(Math.PI*(81-49),0),101);assert.equal(r(Math.PI*225,0),707);assert.equal(r((81-49)/225,2),0.14);
 assert.equal(r(255/Math.sqrt(1.524),0),207);assert.equal(r(Te(0.3,1361)/Math.sqrt(1.524),0),206);
 assert.equal(r((254/273)**2,2),0.87);assert.equal(r((254/373)**2,2),0.46);
 assert.equal(r(Math.sqrt(0.69*3.8e26/(4*Math.PI*5.67e-8*273**4))/1.5e11,2),1.72);assert.equal(r(Math.sqrt(0.69*3.8e26/(16*Math.PI*5.67e-8*273**4))/1.496e11,2),0.86);
 assert.equal(r(255/Math.sqrt(10),0),81);assert.equal(r((273/81)**4,-1),130);
 assert.deepEqual([d(0.00155,1.014),d(0.00155,0.344)].map(v=>r(v,3)),[0.039,0.067]);
 // Model probes: S_eff = 1 and 0.35 at L = 1.0075 and 2.005.
 assert.deepEqual([d(1.0075,1),d(2.005,1),d(1.0075,0.35),d(2.005,0.35)].map(v=>r(v,2)),[1,1.42,1.7,2.39]);
});
