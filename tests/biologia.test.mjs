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
