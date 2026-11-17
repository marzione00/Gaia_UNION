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
