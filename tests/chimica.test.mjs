// Volume di chimica: struttura dei capitoli originali e numeri ricalcolati.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseChapter} from '../src/book/markdown.js';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const index=JSON.parse(await read('content/libro/index.json')),catalogue=JSON.parse(await read('content/curriculum/index.json'));
const units=new Set((catalogue.modules||catalogue.units||catalogue).map?.(m=>m.id)||[]);
const chimica=index.capitoli.filter(c=>c.volume==='Chimica');
// Chapters written with extra depth on request (atomic theory, thermochemistry) have higher minimum length.
const minWords={'chemistry-03':7000,'chemistry-04':7500,'chemistry-05':7500,'chemistry-16':7500};
const r=(x,d)=>d<0?Math.round(x/10**-d)*10**-d:+x.toFixed(d);
test('Chimica: ogni capitolo è completo, collegato e scritto nello stile del sito',async()=>{
 assert.ok(chimica.length>=1);
 for(const c of chimica){
  const src=await read(c.file),ch=parseChapter(src),ids=new Set([...ch.toc.map(t=>t.id),...ch.figures,...ch.exercises.map(e=>e.id)]);
  assert.equal(ch.meta.unit,c.unit);assert.match(ch.meta.fonte,/Testo originale/,c.unit);assert.match(src,/## Fonti \{#fonti\}/);
  assert.ok(ch.words>=(minWords[c.unit]||5000),c.unit+' '+ch.words);assert.ok(ch.toc.filter(t=>t.level===2).length>=12,c.unit);assert.ok(ch.figures.length>=5,c.unit);
  assert.ok(ch.exercises.length>=15&&ch.exercises.every(e=>e.solution),c.unit);for(const lv of ['base','medio','avanzato'])assert.ok(ch.exercises.filter(e=>e.level===lv).length>=4,c.unit+' '+lv);
  for(const l of ch.links){if(l.startsWith('#'))assert.ok(ids.has(l.slice(1)),c.unit+' '+l);}
  const text=src.replace(/^---[\s\S]*?\n---\n/,''),prose=text.replace(/::: figura[\s\S]*?\n---\n/g,'');
  assert.equal((text.match(/\$\$/g)||[]).length%2,0,c.unit);
  for(const para of prose.replace(/\$\$[\s\S]*?\$\$/g,'').split(/\n\s*\n/))assert.equal((para.match(/\$/g)||[]).length%2,0,c.unit+': '+para.slice(0,80));
  assert.ok(!src.includes('—'),c.unit);assert.ok(!/non solo/i.test(prose),c.unit);assert.ok(!/\bnon\b[^.;:\n]{0,80}\bma\b/i.test(prose),c.unit);assert.ok(!/\bnon\b[^.;\n]{0,70}:/i.test(prose),c.unit);
 }
});
// Constants (SI 2019 exact values, CODATA 2022) used by the chapters.
const h=6.62607015e-34,c0=299792458,e=1.602176634e-19,NA=6.02214076e23,me=9.1093837139e-31,Rinf=10973731.568157,RH=Rinf/(1+1/1836.152673426),a0=5.29177210544e-11,hbar=h/2/Math.PI;
test('Chimica 04: livelli atomici e spettri, numeri ricalcolati',()=>{
 const L=(a,b)=>1e9/(RH*(1/a**2-1/b**2));
 assert.equal(r(L(2,3),1),656.5);assert.equal(r(L(2,4),1),486.3);assert.equal(r(L(1,1e9),2),91.18);assert.equal(r(L(3,4),1),1875.6);assert.equal(r(L(2,1e9),1),364.7);
 assert.equal(r(1/(1/L(1,2)+1/L(2,3)),2),102.57);assert.equal(r(13.598434*e*NA/1000,0),1312);assert.equal(r(h*c0*Rinf/e,2),13.61);
 const E=l=>h*c0/(l*1e-9);assert.equal(r(E(500)/1e-19,2),3.97);assert.equal(r(E(500)/e,2),2.48);assert.equal(r(E(500)*NA/1000,0),239);assert.equal(r(E(400)*NA/1000,0),299);assert.equal(r(E(300)*NA/1000,0),399);
 assert.equal(r(E(250)/e-4.50,2),0.46);assert.equal(r(h*c0/(4.5*e)*1e9,0),276);assert.equal(r(h/Math.sqrt(2*me*e*100)*1e9,3),0.123);assert.equal(r(h/(me*1e6)*1e9,3),0.727);
 assert.equal(r(hbar/(2*me*1e-10)/1e5,1),5.8);assert.equal(r(hbar/(2*me*50e-12)/1e6,1),1.2);const box=L_=>h**2/(8*me*L_**2);assert.equal(r(box(1e-9)/e,3),0.376);assert.equal(r(h*c0/(3*box(1e-9))*1e9,-2),1100);assert.equal(r(h*c0/(3*box(0.5e-9))*1e9,0),275);
 assert.equal(r(1e9/(4*(Rinf/(1+1/7294.29954171))*(1/9-1/16)),1),468.7);assert.equal(r(1-5*Math.exp(-2),3),0.323);assert.equal(r(1-13*Math.exp(-4),3),0.762);assert.equal(r(9.2740100657e-24*2/e*1e4,2),1.16);
 assert.equal(r(2.897771955e-3/5800*1e9,0),500);assert.equal(r(h/(1.67492750056e-27*2200)*1e9,3),0.18);assert.equal(r(me*e**4/(8*8.8541878188e-12**2*h**3*c0)/1e7,4),1.0974);assert.equal(r(1e4/667,1),15);assert.equal(r(1e4/2349,2),4.26);
});
test('Chimica 05: periodicità e carica efficace, numeri ricalcolati',()=>{
 const kJ=e*NA/1000,Ry=h*c0*Rinf/e,Eh=2*Ry,cm=h*c0*100/e;
 // Ionization energies (NIST ASD, eV) converted to kJ/mol.
 const I={H:13.5984,He:24.5874,Li:5.3917,Be:9.3227,B:8.298,C:11.2603,N:14.5341,O:13.6181,F:17.4228,Ne:21.5645,Na:5.1391,Mg:7.6462,Al:5.9858,Si:8.1517,P:10.4867,S:10.36,Cl:12.9676,Ar:15.7596,K:4.3407,Rb:4.1771};
 const k=Object.fromEntries(Object.entries(I).map(([s,v])=>[s,r(v*kJ,0)]));
 assert.deepEqual([k.Li,k.Be,k.B,k.C,k.N,k.O,k.F,k.Ne],[520,900,801,1086,1402,1314,1681,2081]);
 assert.deepEqual([k.Na,k.Mg,k.Al,k.Si,k.P,k.S,k.Cl,k.Ar],[496,738,578,787,1012,1000,1251,1521]);
 assert.deepEqual([k.H,k.He,k.K,k.Rb],[1312,2372,419,403]);
 assert.deepEqual([47.2864,15.03527,80.1437,18.82855,28.44765,119.992,153.825].map(v=>r(v*kJ,0)),[4562,1451,7733,1817,2745,11577,14842]);
 // Electron affinities (eV) in kJ/mol, Mulliken electronegativities.
 assert.deepEqual([3.612724,3.4011898,1.4611136,2.0771042,1.262119,0.618049,0.501459].map(v=>r(v*kJ,0)),[349,328,141,200,122,60,48]);
 assert.equal(r(5.1391*kJ-3.612724*kJ,0),147);assert.equal(r(4.3407*kJ-3.4011898*kJ,1),90.6);
 assert.deepEqual([[17.4228,3.4011898],[12.9676,3.612724],[13.6181,1.4611136],[13.5984,0.754195],[11.2603,1.262119],[5.3917,0.618049],[5.1391,0.547926],[4.3407,0.501459]].map(([a,b])=>r((a+b)/2,2)),[10.41,8.29,7.54,7.18,6.26,3,2.84,2.42]);
 // Effective charges: Slater, from ionization energies, sodium levels.
 assert.deepEqual([6-(3*.35+2*.85),11-(8*.85+2),8-(5*.35+2*.85),9-(6*.35+2*.85),26-(5*.35+18),26-(.35+14*.85+10),19-(8*.85+10)].map(v=>r(v,2)),[3.25,2.2,4.55,5.2,6.25,3.75,2.2]);
 assert.deepEqual([[5.3917,2],[5.1391,3],[4.3407,4],[4.1771,5]].map(([v,n])=>r(n*Math.sqrt(v/Ry),2)),[1.26,1.84,2.26,2.77]);
 const ion=41449.451,p3=(2*16956.172+4*16973.368)/6,d3=(6*29172.839+4*29172.889)/10;
 assert.deepEqual([ion,ion-p3,ion-d3].map(b=>r(b*cm,3)),[5.139,3.035,1.522]);assert.deepEqual([ion,ion-p3,ion-d3].map(b=>r(3*Math.sqrt(b*cm/Ry),2)),[1.84,1.42,1]);
 assert.equal(r(p3*cm,3),2.104);assert.equal(r(1239.841984/3.035,1),408.5);assert.equal(r(1239.841984/5.139,0),241);
 // Helium (variational), lithium ions.
 assert.equal(r((27/16)**2*Eh,2),77.49);assert.equal(r((27/16)**2*Eh-54.41776,2),23.07);assert.equal(r(24.5874+54.41776,2),79.01);assert.equal(r(4*Eh,1),108.8);
 assert.equal(r(Ry*1.3**2/4,2),5.75);assert.equal(r(2*Math.sqrt(5.3917/Ry),2),1.26);assert.equal(r(9*Ry,2),122.45);assert.equal(r(Math.sqrt(75.64/Ry),2),2.36);assert.equal(r(Ry*2.7**2,0),99);
 // Moseley's law.
 const ka=z=>0.75*Ry*(z-1)**2;assert.equal(r(ka(29),0),8000);assert.equal(r(ka(26),0),6378);assert.equal(r(ka(28),0),7439);assert.equal(r(Math.sqrt(0.75*Ry),2),3.19);
 assert.equal(r(1+Math.sqrt(5899/10.2),0),25);assert.equal(r(1+Math.sqrt(6930/10.2),0),27);assert.equal(r(1239.84/6930,3),0.179);assert.equal(r((17479.34-ka(42))/17479.34*100,0),2);
 // Magnetism, radii, Mendeleev.
 assert.deepEqual([1,2,3,4,5].map(n=>r(Math.sqrt(n*(n+2)),2)),[1.73,2.83,3.87,4.9,5.92]);
 assert.equal(r((140/53.5)**3,1),17.9);assert.equal(r((103-86)/103*100,1),16.5);assert.equal(r(17/14,1),1.2);
 assert.equal(r(72/5.5,1),13.1);assert.equal(r(72.630/5.323,1),13.6);assert.equal(r(1/22.990*495.8,1),21.6);
});
test('Chimica 16: termochimica e calorimetria, numeri ricalcolati',()=>{
 const R=8.314462618,RT=R*298.15/1000,M=(c,h,o=0)=>12.011*c+1.008*h+15.999*o;
 // Table D.2 (Petrucci, from NBS) formation enthalpies, kJ/mol.
 const f={H2Ol:-285.8,H2Og:-241.8,CO2:-393.5,CO:-110.5,CH4:-74.81,C2H2:226.7,C2H6:-84.68,C3H8:-103.8,C4H10:-125.6,MeOH:-238.7,MeOHg:-200.7,EtOH:-277.7,BzA:-385.2,Fe2O3:-824.2,Al2O3:-1676,Cg:716.7,Hg:218,Og:249.2,Clg:121.7,HCl:-92.31};
 const comb=(fu,c,h)=>c*f.CO2+h*f.H2Ol-fu;
 assert.equal(r(comb(f.CH4,1,2),1),-890.3);assert.equal(r(f.CO2+2*f.H2Og-f.CH4,1),-802.3);assert.equal(r(comb(f.C4H10,4,5),1),-2877.4);assert.equal(r(comb(f.MeOH,1,2),1),-726.4);assert.equal(r(comb(f.EtOH,2,3),1),-1366.7);
 assert.deepEqual([[-285.8,2.016],[comb(f.CH4,1,2),M(1,4)],[comb(f.C4H10,4,5),M(4,10)],[-5470,M(8,18)],[-393.5,12.011],[comb(f.EtOH,2,3),M(2,6,1)],[comb(f.MeOH,1,2),M(1,4,1)]].map(([h,m])=>r(-h/m,1)),[141.8,55.5,49.5,47.9,32.8,29.7,22.7]);
 assert.deepEqual([[1,comb(f.CH4,1,2)],[4,comb(f.C4H10,4,5)],[8,-5470],[1,-393.5],[2,comb(f.EtOH,2,3)],[1,comb(f.MeOH,1,2)]].map(([n,h])=>r(n*44.009/(-h/1000),1)),[49.4,61.2,64.4,111.8,64.4,60.6]);
 assert.equal(r(8*f.CO2+9*f.H2Ol+5470,0),-250);assert.equal(r(f.CO2-(f.CO2-f.CO),1),-110.5);assert.equal(r(f.CO2-f.CO,1),-283);
 assert.equal(r(-285.8+1.5*RT,1),-282.1);assert.equal(r(-726.4+0.5*RT,1),-725.2);assert.equal(r(RT,2),2.48);assert.equal(r(-84.68-226.7,1),-311.4);
 // Bond enthalpies from atomization.
 const CH=(f.Cg+4*f.Hg-f.CH4)/4,CC=2*f.Cg+6*f.Hg-f.C2H6-6*CH;
 assert.deepEqual([2*f.Hg,2*f.Og,2*f.Clg,f.Hg+f.Clg-f.HCl,(2*f.Hg+f.Og-f.H2Og)/2,CH,(f.Cg+2*f.Og-f.CO2)/2,CC].map(v=>r(v,1)),[436,498.4,243.4,432,463.5,415.9,804.3,330.8]);
 assert.equal(r(3*f.Cg+8*f.Hg-(2*CC+8*CH),1),-94.5);assert.equal(r(4*f.Cg+10*f.Hg-(3*CC+10*CH),0),-104);
 // Calorimetry.
 assert.equal(r((50*0.897*95+200*4.18*20)/(50*0.897+200*4.18),1),23.8);assert.equal(r((75*0.384*100+150*4.18*22)/(75*0.384+150*4.18),1),25.4);
 const nN=10/(2*14.007+4*1.008+3*15.999);assert.equal(r(nN*25.7e3/(100*4.18),2),7.68);assert.equal(r(100*4.18*7.68/nN/1000,1),25.7);
 const Cb=1.2*26.434/3.095;assert.equal(r(Cb,2),10.25);assert.equal(r(Cb*2.745/0.95*46.069,0),1364);
 const Cm=26.434/2.52;assert.equal(r(Cm*2.589/1.2*M(1,4,1),1),725.2);
 assert.equal(r((50*4.18*20.8-50*4.18*19.2)/19.2,1),17.4);assert.equal(r(20+5/110.978*81.4e3/(105*4.18),1),28.4);assert.equal(r(25/55.845*1648.4/4,0),184);
 assert.equal(r(-100*4.18*10.6/0.1/1000,1),-44.3);assert.equal(r(600/44*18.015,0),246);assert.equal(r(1e5/(R*298.15)*0.8903,1),35.9);
 // Solutions, Gibbs, phase changes.
 assert.equal(r(-339.9+365.6,1),25.7);assert.equal(r(-542.8-2*167.2+795.8,1),-81.4);assert.equal(r(25.7-298.15*0.1087,1),-6.7);assert.equal(r(25700/108.7,0),236);
 const dH=3*f.CO-f.Fe2O3,dS=2*27.28+3*197.7-87.4-3*5.74;assert.equal(r(dH,1),492.7);assert.equal(r(dS,1),543);assert.equal(r(dH*1000/dS,0),907);assert.equal(r(dH-298.15*dS/1000,0),331);
 assert.equal(r(30.91e3/93.3,0),331);assert.equal(r(38e3/113,0),336);const nb=(-1131-241.8-393.5+2*950.8),sb=135+188.8+213.7-2*101.7;assert.equal(r(nb,1),135.3);assert.equal(r(nb*1000/sb,0),405);
 assert.equal(r(6010/273.15,1),22);assert.equal(r(44+(33.6-75.3)*75/1000,1),40.9);assert.equal(r(-241.8+(33.6-28.8-14.7)*75/1000,1),-242.5);
 assert.equal(r(18.02*2.1*20/1000+6.01+18.02*4.18*100/1000+40.7+18.02*2*20/1000,1),55.7);assert.equal(r(1000/18.015*44/1000,2),2.44);
 // Heat capacities, food, fuels in practice.
 assert.deepEqual([[24.2,26.982],[25.1,55.845],[24.4,63.546],[25.4,107.87],[26.4,207.2]].map(([c,m])=>r(c/m,3)),[0.897,0.449,0.384,0.235,0.127]);assert.equal(r(3*R,1),24.9);
 assert.equal(18*17+4*17+6*37,596);assert.equal(r(596/4.184,0),142);assert.equal(r(88/890.3*100,1),9.9);
 const q=40000*4.18*25/1000,n=q/802.3;assert.equal(r(n*16.043,1),83.6);assert.equal(r(n*44.01,0),229);assert.equal(r(q/890.3*16.043,0),75);
 assert.equal(r((f.Al2O3-f.Fe2O3)/(2*26.982+2*55.845+3*15.999),2),-3.99);assert.equal(r(2*f.Fe2O3/(4*55.845),2),-7.38);
});
test('Chimica 01: materia, proprietà e densità, numeri ricalcolati',()=>{
 const rho=t=>999.97495*(1-(t-3.983035)**2*(t+301.797)/(522528.9*(t+69.34881)))/1000; // Tanaka et al. 2001
 assert.equal(r(rho(0),5),0.99984);assert.equal(r(rho(3.98),5),0.99997);assert.equal(r(rho(20),5),0.99821);assert.equal(r(1000/rho(20)-1000/rho(4),1),1.8);
 assert.equal(r(0.99984/0.917,2),1.09);assert.equal(r(0.917/0.9982,2),0.92);assert.equal(r(0.917/1.03,2),0.89);
 assert.equal(r(101325*0.018015/(8.314462618*373.15),2),0.59);assert.equal(r(958.4/0.5883,-2),1600);
 const V=(152.4-122.0)/0.9982;assert.equal(r(V,1),30.5);assert.equal(r(152.4/V,2),5);assert.equal(r(152.4/19.32,1),7.9);assert.equal(r((0.2/30.4+0.1/152.4)*5,2),0.04);
 assert.equal(r(76.5/8.6,1),8.9);assert.equal(r(76.5/8.6*0.2/8.6,1),0.2);const V2=(76.5-67.97)/0.9982;assert.equal(r(V2,2),8.55);assert.equal(r(76.5/V2,2),8.95);
 assert.equal(r(250*0.789,0),197);assert.equal(r(60*1.204,0),72);assert.equal(r(144*1.204,0),173);assert.equal(r(1000/19.32,1),51.8);assert.equal(r(1000/2.7,-1),370);
 const mw=78.205-28.315,Vp=mw/0.9982;assert.equal(r(Vp,2),49.98);assert.equal(r((67.795-28.315)/Vp,3),0.79);
 const m=(57-1000/19.32)/(1/10.49-1/19.32);assert.equal(r(m,0),120);assert.equal(r(4*119.98/(6.02214076e23*(5.417e-8)**3),2),5.01);
 const Vs=4/3*Math.PI;assert.equal(r(32.8/Vs,2),7.83);assert.equal(r(32.8/Vs*(0.015+0.1/32.8),2),0.14);assert.equal(r(1/(0.75/19.32+0.125/10.49+0.125/8.96),1),15.5);
 assert.equal(r(2*1.008/(2*1.008+15.999)*100,1),11.2);
});
test('Chimica 02: atomi, isotopi e massa media, numeri ricalcolati',()=>{
 const avg=l=>l.reduce((s,[x,m])=>s+x*m,0);
 // Isotopic masses and abundances: Petrucci Table D.5.
 assert.equal(r(avg([[0.7899,23.985042],[0.1,24.985837],[0.1101,25.982593]]),3),24.305);assert.equal(r(avg([[0.199,10.012937],[0.801,11.009305]]),3),10.811);
 assert.equal(r(avg([[0.922297,27.976927],[0.046832,28.976495],[0.030872,29.97377]]),3),28.085);assert.equal(r(avg([[0.014,203.973029],[0.241,205.974449],[0.221,206.975881],[0.524,207.976636]]),1),207.2);
 assert.equal(r(avg([[0.758,34.968853],[0.242,36.965903]]),2),35.45);assert.equal(r((64.927794-63.546)/(64.927794-62.929601),4),0.6915);assert.equal(r((70.924705-69.723)/(70.924705-68.925581),4),0.6011);
 assert.equal(r(avg([[0.0072,235.043923],[0.9928,238.050783]]),3),238.029);assert.equal(r(avg([[0.04,235.043923],[0.96,238.050783]]),3),237.931);
 const p=0.5069,q=0.4931;assert.deepEqual([p*p/(2*p*q)*100,q*q/(2*p*q)*100].map(v=>r(v,1)),[51.4,48.6]);
 assert.equal(r(15.999/12.011,3),1.332);assert.equal(r(2*15.999/12.011,3),2.664);
 assert.equal(r(e/me/1e11,3),1.759);assert.equal(r(e/1.67262192595e-27/1e7,2),9.58);assert.equal(r(1.67262192595e-27/me,0),1836);
 const rho=1.67e-27/(4/3*Math.PI*(1.2e-15)**3);assert.equal(r(rho/1e17,1),2.3);assert.equal(r(rho*5e-6/1e12,1),1.2);assert.equal(r(1.2*197**(1/3),1),7);
 const dm=2*1.007825+2*1.008665-4.002603;assert.equal(r(dm,6),0.030377);assert.equal(r(dm*931.494,1),28.3);assert.equal(r(dm*931.494/4,1),7.1);
 assert.equal(r(12*1.66053906892e-27*1e26,3),1.993);assert.equal(r(5730*Math.log2(1/0.3),-1),9950);
});
test('Chimica 06: legame ionico, numeri ricalcolati',()=>{
 const kJ=e*NA/1000,k=8.9875517862e9,kk=k*e*e*NA/1000*1e12;
 assert.equal(r(-k*e*e/236e-12/1e-19,2),-9.78);assert.equal(r(-k*e*e/236e-12/e,2),-6.1);assert.equal(r(-kk/236,0),-589);assert.equal(r(-kk/282,0),-493);assert.equal(r(kk/1e5,3),1.389);
 // Born-Haber with Table D.2 / CODATA and NIST IE, EA.
 const IE={Na:5.1391,K:4.3407,Li:5.3917},EA={F:3.4011898,Cl:3.612724,Br:3.363588,I:3.059038},at={Na:107.3,K:89.24,Li:159.4,F:78.99,Cl:121.7,Br:111.9,I:106.8};
 const U=(m,x,f)=>at[m]+at[x]+IE[m]*kJ-EA[x]*kJ-f;
 assert.deepEqual([U('Na','F',-573.6),U('Na','Br',-361.1),U('Na','I',-287.8),U('K','Cl',-436.7),U('Li','Cl',-408.6)].map(v=>r(v,0)),[928,752,703,718,861]);
 assert.equal(r(107.3+121.7+495.8-348.6+411.2,0),787);assert.equal(r(107.3+121.7+495.8,0),725);assert.equal(r(107.3+121.7+495.8-348.6,0),376);
 assert.equal(r(147.1+249.2+737.7+1450.7-141+744+601.7,0),3789);assert.equal(r(177.8+249.2+589.8+1145.4-141+744+635.1,0),3400);assert.equal(r((6.1132+11.87172)*kJ,1),1735.3);
 assert.equal(r(147.1+2*121.7+737.7+1450.7-2*348.6+641.3,0),2523);const fMgCl=147.1+121.7+737.7-348.6-760;assert.equal(r(fMgCl,0),-102);assert.equal(r(-641.3-2*fMgCl,0),-437);
 assert.equal(r(kk*1.7476/282*(1-1/8),0),753);assert.equal(r(4*58.44/(NA*(564e-10)**3),2),2.16);assert.equal(r(2.16e-3/58.44*NA/1e19,1),2.2);
 assert.deepEqual([3.16-0.93,3.98-0.82,3.44-1.31,3.16-2.2].map(d=>r(100*(1-Math.exp(-d*d/4)),0)),[71,92,68,21]);
 assert.deepEqual([[861,257],[787,283],[718,319]].map(([u,d])=>r(u*d/1e5,2)),[2.21,2.23,2.29]);assert.equal(r((5.1391+47.2864)*kJ,0),5058);
});
