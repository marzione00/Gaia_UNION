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
test('Chimica 07: legame covalente, numeri ricalcolati',()=>{
 const kJ=e*NA/1000,D=3.33564e-30,u=1.66053906892e-27;
 // Partial charges from dipole moments and bond lengths (Huber-Herzberg, CRC).
 assert.deepEqual([[1.826,91.68],[1.109,127.46],[0.827,141.44],[0.448,160.92]].map(([m,d])=>r(m*D/(e*d*1e-12),2)),[0.41,0.18,0.12,0.06]);
 assert.equal(r(e*1e-10/D,2),4.8);assert.equal(r(1.826*D*1e30,2),6.09);assert.equal(r(e*91.7e-12*1e29,2),1.47);
 // Morse parameters of H2: De 4.7476 eV, a 0.019443 /pm.
 const De=4.7476*e,k=2*De*(1.9443e10)**2,mH=1.00782503/2*u,mD=2.01410178/2*u,w=Math.sqrt(k/mH);
 assert.equal(r(k,0),575);assert.equal(r(w/1e14,2),8.29);assert.equal(r(hbar*w/2*NA/1000,1),26.3);assert.equal(r(De*NA/1000,1),458.1);
 const zD=hbar*Math.sqrt(k/mD)/2*NA/1000;assert.equal(r(zD,1),18.6);assert.equal(r(458.1-18.6,1),439.5);assert.equal(r(4.5563*kJ,1),439.6);
 assert.equal(r(4.4781*kJ,1),432.1);assert.equal(r(458.1-432.1,1),26);assert.equal(r(26e3/(NA*e),2),0.27);assert.equal(r(8.314462618*298.15/1000,2),2.48);
 assert.equal(r(h*c0/(4.478*e)*1e9,1),276.9);assert.equal(r(4.478*e*1e19,3),7.175);
 // Bond enthalpies from Table D.2.
 assert.equal(r(436.0+243.4-2*432.0,1),-184.6);assert.equal(r(2*111.9-30.91,1),192.9);assert.equal(r(218.0+111.9+36.40,1),366.3);
 assert.equal(r(436.0+192.9-2*366.3,1),-103.7);assert.equal(r(436.0+192.9,1),628.9);assert.equal(r(2*(432.0-366.3),0),131);assert.equal(r(243.4-192.9,0),51);
 assert.equal(r(2*218.0+2*249.2+136.3,1),1070.7);assert.equal(r(1070.7-2*463.5,1),143.7);assert.equal(r(498.4/143.7,1),3.5);
 assert.equal(r(218.0+78.99+271.1,0),568);assert.equal(r(218.0+106.8-26.48,0),298);assert.equal(r(439+243-350-432,0),-100);assert.equal(r(-81.9-92.31+74.81,1),-99.4);
 // Molecular ions (spectroscopic D0) and bond orders.
 assert.equal(r(2.6507*kJ,0),256);assert.equal(r(19101.29*h*c0*100*NA/1000,0),229);
 const bo=(nb,na)=>(nb-na)/2;assert.deepEqual([bo(1,0),bo(2,0),bo(2,1),bo(2,2),bo(8,4),bo(8,3),bo(8,5),bo(8,6)],[0.5,1,0.5,0,2,2.5,1.5,1]);
 assert.deepEqual([3.98-2.2,2.96-2.2,2.66-2.2,3.44-2.2,2.55-2.2].map(x=>r(x,2)),[1.78,0.76,0.46,1.24,0.35]);
});
test('Chimica 08: geometria molecolare, numeri ricalcolati',()=>{
 const deg=x=>x*180/Math.PI,rad=x=>x*Math.PI/180;
 assert.equal(r(deg(Math.acos(-1/3)),2),109.47);assert.equal(r(deg(Math.acos(1/3)),1),70.5);
 // Bond dipoles from molecular moments (CRC) and gas-phase angles.
 assert.equal(r(2*Math.cos(rad(104.5/2)),3),1.224);assert.equal(r(1.85/(2*Math.cos(rad(104.5/2))),2),1.51);
 const ca=Math.sqrt((2*Math.cos(rad(106.67))+1)/3);assert.equal(r(ca,3),0.377);assert.equal(r(1.47/(3*0.377),2),1.3);
 assert.equal(r(2*Math.cos(rad(46.05)),3),1.388);assert.equal(r(0.97/1.388,2),0.7);
 assert.equal(r(2*Math.cos(rad(109.47/2)),2),1.15);assert.deepEqual([1.60/1.89,1.04/1.89].map(x=>r(x,2)),[0.85,0.55]);
 // Coulson relation cos(theta) = -1/lambda, s character 1/(1+lambda).
 const lam=t=>-1/Math.cos(rad(t)),sc=t=>100/(1+lam(t));
 assert.equal(r(Math.cos(rad(104.48)),3),-0.25);assert.equal(r(lam(104.48),1),4);assert.equal(r(sc(104.48),0),20);
 assert.equal(r(Math.cos(rad(106.67)),3),-0.287);assert.equal(r(lam(106.67),2),3.49);assert.equal(r(sc(106.67),0),22);assert.equal(r(100-3*sc(106.67),0),33);
 assert.equal(r(Math.cos(rad(93.3)),3),-0.058);assert.equal(r(lam(93.3),0),17);assert.equal(r(sc(93.3),0),5);
 assert.equal(r(Math.cos(rad(92.1)),3),-0.037);assert.equal(r(lam(92.1),0),27);assert.equal(r(sc(92.1),1),3.5);
 assert.equal(r(109.47-93.3,0),16);
 // Henry constants (Sander 2023): SO2 about 1.2e-2, CO2 3.3e-4 mol m-3 Pa-1.
 assert.ok(1.2e-2/3.4e-4>30);
 // Electronegativity differences; CO2 bending band; microwave wavelength.
 assert.deepEqual([3.04-2.2,3.98-3.04,2.58-2.2,3.44-2.2].map(x=>r(x,2)),[0.84,0.94,0.38,1.24]);
 assert.equal(r(1e4/667,1),15);assert.equal(r(c0/2.45e9*100,0),12);
 // Valence electron counts.
 assert.deepEqual([4+2*6,5+2*6,5+2*6+1,6+2*6,6+3*6+2],[16,17,18,18,26]);
});
test('Chimica 09: forze intermolecolari, numeri ricalcolati',()=>{
 const k=8.9875517862e9,D=3.33564e-30,kJ=x=>x*NA/1000;
 // Dipole-dipole energies, head-to-tail: E = -2 mu^2 k / r^3.
 const dd=(m,rr)=>-2*(m*D)**2*k/rr**3;
 assert.equal(r(dd(1.109,4e-10)*1e21,1),-3.8);assert.equal(r(kJ(dd(1.109,4e-10)),1),-2.3);assert.equal(r(8.314462618*298.15/1000,2),2.48);
 assert.equal(r(1.85*D*1e30,2),6.17);assert.equal(r(dd(1.85,5e-10)*1e21,1),-5.5);assert.equal(r(kJ(dd(1.85,5e-10)),1),-3.3);
 // London estimate for Ar2 (Miller polarizability, NIST IE) and measured well depth 99.5 cm-1.
 const lon=-0.75*(1.641e-30)**2*15.76*e/(3.76e-10)**6;assert.equal(r(lon*1e21,1),-1.8);assert.equal(r(kJ(lon),2),-1.09);
 assert.equal(r(99.5*h*c0*100*NA/1000,2),1.19);assert.equal(r(1.1**6,2),1.77);assert.equal(r(100*(1-1/1.1**6),0),44);
 // Ratios quoted in the text.
 assert.equal(r(4.044/0.205,0),20);assert.equal(r(165.1/4.22,0),39);assert.equal(r(81.6+42.1,0),124);assert.equal(r(78.3+24.8,0),103);assert.equal(r(927/40.7,0),23);
 assert.equal(r(-35.4+85.1,0),50);assert.equal(r(51/2,0),26);assert.equal(r(463/25,0),19);
 // Trouton ratios (CRC enthalpies of vaporization at the boiling point).
 assert.deepEqual([[8.19,111.7],[28.85,341.9],[29.82,349.9],[30.72,353.2],[38.56,351.4],[40.65,373.1]].map(([H,T])=>r(H*1000/T,0)),[73,84,85,87,110,109]);
 assert.equal(r(0.088*398.8,1),35.1);assert.equal(r(0.088*373.1,1),32.8);
 // Ice and water at 0 C; capillary rise; surface energy estimate.
 assert.deepEqual([18.015/0.9998,18.015/0.9167].map(x=>r(x,2)),[18.02,19.65]);assert.equal(r(100*(0.9998/0.9167-1),1),9.1);
 assert.equal(r(1000*9.81*5e-4,1),4.9);assert.equal(r(0.144/4.905,3),0.029);assert.equal(r(2*0.022/(789*9.81*5e-4),3),0.011);
 const A=(3.0e-29)**(2/3);assert.equal(r(A*1e20,1),9.7);assert.equal(r(1/A/1e19,1),1);assert.equal(r(0.072*A*NA/1000,0),4);
 // Alcohol solubility trend.
 assert.equal(r(7/2,1),3.5);assert.equal(r(Math.cbrt(2/0.05),1),3.4);
});
test('Chimica 10: gas, numeri ricalcolati',()=>{
 const R=8.314462618,Rb=R/100,kB=1.380649e-23,vq=(M,T)=>Math.sqrt(3*R*T/(M/1000));
 // Units, molar volumes, mercury column.
 assert.equal(r(101325/(13595.1*9.80665)*1000,0),760);assert.equal(r(R*273.15/1e5*1000,3),22.711);assert.equal(r(R*298.15/1e5*1000,3),24.79);assert.equal(r(R*273.15/101325*1000,3),22.414);
 assert.equal(r(R/101325*1000,5),0.08206);assert.equal(r(1025*9.81*10/1e5,2),1.01);assert.equal(r(0.08*9.81,2),0.78);
 // Worked examples: cylinder, tyre, electrolysis, densities.
 const n=200*12/(Rb*293.15);assert.equal(r(n,1),98.5);assert.equal(r(n*28.96/1000,2),2.85);
 assert.equal(r(2.2+1.013,2),3.21);assert.equal(r(3.213*313.15/283.15,2),3.55);assert.equal(r(3.213*313.15/283.15-1.013,1),2.5);assert.equal(r(2.2*313.15/283.15,2),2.43);
 assert.equal(r(1/18.015,4),0.0555);assert.equal(r(1/18.015*24.79,2),1.38);assert.equal(r(0.5/18.015*24.79,3),0.688);
 assert.equal(r(28.96*1e5/(R*298.15)/1000,2),1.17);assert.equal(r(4.003*1e5/(R*298.15)/1000,2),0.16);
 assert.equal(r(100*(293.15/283.15-1),1),3.5);assert.equal(r(2*283.15-273.15,0),293);
 // Dalton.
 assert.equal(r(0.2095*101.325,1),21.2);assert.equal(r(0.2095*33.7,1),7.1);assert.equal(r(0.7808*101.325,1),79.1);assert.equal(r(0.7808*33.7,1),26.3);assert.equal(r(0.2095*4,2),0.84);
 assert.equal(r(0.2095*31.998/(0.7808*28.014+0.2095*31.998+0.0093*39.948+0.0004*44.01)*100,1),23.1);
 // Kinetic theory.
 assert.equal(r(1.5*R*298.15/1000,2),3.72);assert.deepEqual([2.016,4.003,18.015,28.014,31.998,44.009].map(M=>r(vq(M,298.15),0)),[1921,1363,643,515,482,411]);
 assert.equal(r(Math.sqrt(8*R*298.15/(Math.PI*0.028014)),0),475);const lam=kB*298.15/(Math.SQRT2*Math.PI*(3.7e-10)**2*1e5);assert.equal(r(lam*1e9,0),68);assert.equal(r(475/lam/1e9,0),7);
 assert.equal(r(kB*298.15/1e5*1e26,2),4.12);assert.equal(r(Math.cbrt(kB*298.15/1e5)*1e9,2),3.45);assert.equal(r(4/3*Math.PI*(0.185e-9)**3*1e29,2),2.65);assert.equal(r(100*4/3*Math.PI*(0.185e-9)**3/(kB*298.15/1e5),3),0.064);
 assert.equal(r(28.01/(0.807*NA)*1e23,1),5.8);
 // Graham and uranium enrichment.
 assert.equal(r(Math.sqrt(28.014/4.003),2),2.65);const a=Math.sqrt((238.0508+6*18.9984)/(235.0439+6*18.9984));assert.equal(r(a,4),1.0043);
 const Rr=(0.04/0.96)/(0.0072/0.9928);assert.equal(r(Rr,2),5.75);assert.equal(r(Math.log(Rr)/Math.log(a),-1),410);
 // Van der Waals CO2 (CRC a, b).
 assert.equal(r(Rb*300,2),24.94);assert.equal(r(Rb*300/(1-0.04267),2),26.06);assert.equal(r(Rb*300/(1-0.04267)-3.640,2),22.42);assert.equal(r((Rb*300/(1-0.04267)-3.640)/(Rb*300),2),0.9);
 // Exercises.
 assert.equal(r(745*101.325/760,1),99.3);assert.equal(r(745/760,3),0.98);assert.equal(r(3*258.15/293.15,1),2.6);const nc=5/(Rb*298.15);assert.equal(r(nc,3),0.202);assert.equal(r(nc*44.01,1),8.9);
 assert.equal(r(0.2095*70,1),14.7);assert.equal(r(1.8*Rb*298.15,1),44.6);const no=(100.8-3.17)*1e3*2.5e-4/(R*298.15);assert.equal(r(no*1e3,2),9.85);assert.equal(r(no*31.998,3),0.315);
 const d20=28.96*101300/(R*293.15)/1000,d100=28.96*101300/(R*373.15)/1000;assert.equal(r(d20,3),1.204);assert.equal(r(d100,3),0.946);assert.equal(r((d20-d100)*2800,-1),720);
 assert.equal(r(1.4/0.2095,2),6.68);assert.equal(r((6.68-1.013)/0.1006,0),56);assert.equal(r(1.4/0.32,2),4.38);assert.equal(r((4.375-1.013)/0.1006,0),33);
});
test('Chimica 11: stati e transizioni, numeri ricalcolati',()=>{
 const R=8.314462618,Tc=647.096,pc=22.064e6,A=[-7.85951783,1.84408259,-11.7866497,22.6807411,-15.9618719,1.80122502];
 // IAPWS (Wagner-Pruss 1993) saturation pressure of water and its inverse.
 const ps=T=>{const t=1-T/Tc;return pc*Math.exp(Tc/T*(A[0]*t+A[1]*t**1.5+A[2]*t**3+A[3]*t**3.5+A[4]*t**4+A[5]*t**7.5));};
 const ts=p=>{let lo=200,hi=640;for(let i=0;i<100;i++){const m=(lo+hi)/2;if(ps(m)>p)hi=m;else lo=m;}return lo-273.15;};
 assert.equal(r(ps(273.16),3),611.657);assert.deepEqual([273.15,293.15,298.15,323.15,353.15,373.15].map(T=>r(ps(T)/1000,2)),[0.61,2.34,3.17,12.35,47.42,101.42]);
 assert.equal(r(ts(101325),2),99.97);assert.equal(r(ts(33700),0),72);assert.equal(r(ts(70000),0),90);assert.equal(r(ts(2e5),1),120.2);
 assert.equal(r(ts(0.6*ps(298.15)),1),16.7);assert.equal(r(0.6*3.17,2),1.9);assert.equal(r(ts(0.5*3.17e3),1),13.9);assert.equal(r(ps(287.15)/1000,2),1.6);assert.equal(r(ps(288.15)/1000,2),1.71);
 // Vapour volume at the normal boiling point.
 const rv=18.015*101325/(R*373.15)/1000;assert.equal(r(1/rv,2),1.7);assert.equal(r(1/0.9584,2),1.04);
 // Clausius-Clapeyron.
 const cc=(T1,P1,P2,H)=>1/(1/T1-R*Math.log(P2/P1)/H);
 assert.equal(r(Math.log(2/1.013),3),0.68);assert.equal(r(R*Math.log(2/1.013)/40700*1e4,2),1.39);assert.equal(r(1/373.15-R*Math.log(2/1.013)/40700,6),0.002541);assert.equal(r(cc(373.15,1.013,2,40700),0),394);
 assert.equal(r(R*Math.log(47.4/2.34)/(1/293.15-1/353.15)/1000,1),43.2);assert.equal(r(Math.log(47.4/2.34),3),3.008);assert.equal(r((1/293.15-1/353.15)*1e4,3),5.796);
 assert.equal(r(42300/R,0),5088);assert.equal(r((1/298.15-1/351.45)*1e4,2),5.09);assert.equal(r(101.3*Math.exp(-42300/R*(1/298.15-1/351.45)),1),7.6);
 assert.equal(r(Math.log(33.7/101.3),3),-1.101);assert.equal(r(R/40700*1e4,2),2.04);assert.equal(r(cc(373.15,101.3,33.7,40700),1),344.3);assert.equal(r(cc(373.15,101.3,33.7,41900)-273.15,1),71.9);
 // Heating curve and latent heats.
 assert.deepEqual([100*2.09*20,100*334,100*4.18*100,100*2257,100*2.0*20].map(x=>r(x/1000,1)),[4.2,33.4,41.8,225.7,4]);assert.equal(r((4180+33400+41800+225700+4000)/1000,0),309);
 assert.equal(r(6010/18.015,0),334);assert.equal(r(40650/18.015,0),2256);assert.equal(r(2257/334,2),6.76);
 assert.equal(r((25*2.09*10+25*334+25*4.18*100+25*2257)/1000,1),75.7);assert.equal(r((50*334+50*4.18*20)/1000,1),20.9);
 assert.equal(r((10*2257+10*4.18*63)/1000,1),25.2);assert.equal(r(10*4.18*63/1000,1),2.6);assert.equal(r(100*4.2*10/334,1),12.6);
 assert.equal(r(6.01+45.05,2),51.06);assert.equal(r(200/18.015*51.06,0),567);
 // Clapeyron slope for ice.
 const dV=(18.015/0.9998-18.015/0.9167)*1e-6,sl=273.15*dV/6010;assert.equal(r(dV*1e6,2),-1.63);assert.equal(r(sl*1e8,1),-7.4);assert.equal(r(sl*1e5,4),-0.0074);assert.equal(r(-1/(sl*1e5),0),135);
 assert.equal(r(70*9.81/2e-4/1e5,0),34);assert.equal(r(34*0.0074,2),0.25);
});
test('Chimica 12: soluzioni e concentrazione, numeri ricalcolati',()=>{
 // Molarities and conversions (CIAAW molar masses, CRC densities).
 assert.equal(r(9/58.44,3),0.154);assert.equal(r(0.9*5,1),4.5);assert.equal(r(5.85/58.44/0.25,3),0.4);assert.equal(r(0.2*0.25*105.99,2),5.3);
 assert.equal(r(900/180.16/1000*1000,2),5);assert.equal(r(0.02*0.5*158.03,3),1.58);assert.equal(r(1*500/12,1),41.7);assert.equal(r(2*25/500,2),0.1);
 assert.equal(r(0.37*1180,0),437);assert.equal(r(0.37*1180/36.46,1),12);assert.equal(r(0.1/12*1000,1),8.3);
 assert.equal(r(0.12*750*0.789,0),71);assert.equal(r(120*0.789,1),94.7);assert.equal(r(120*0.789/46.07,2),2.06);
 const n=10/180.16;assert.equal(r(n,4),0.0555);assert.equal(r(n/0.25,3),0.222);assert.equal(r(250/18.015,2),13.88);assert.equal(r(n/(n+250/18.015),4),0.004);
 assert.equal(r(37/36.46,3),1.015);assert.equal(r(37/36.46/0.063,1),16.1);assert.equal(r(0.63*1180,0),743);
 // Precipitation of chloride.
 assert.equal(r(0.025*0.154*1e3,2),3.85);assert.equal(r(0.025*0.154/0.1*1000,1),38.5);assert.equal(r(0.025*0.154*143.32,3),0.552);
 // ppm, lead atoms, concentration scale.
 assert.equal(r(15e-6/207.2*1e8,1),7.2);assert.equal(r(15e-6/207.2*NA/1e16,0),4);assert.equal(r(19.35/35.45,3),0.546);assert.equal(r(50e-3/62.0*1e4,0),8);assert.equal(r(10e-6/207.2*1e9,0),48);
 assert.equal(r(Math.log10(12/(10e-6/207.2)),1),8.4);
 // Solubility and gases.
 assert.equal(r(168.8-31.6,1),137.2);assert.equal(r(137.2/168.8*100,0),81);assert.equal(r(243.6/13.3,0),18);assert.equal(r(1-6.41/14.62,2),0.56);
 assert.equal(r(1.2e-5*21200,2),0.25);assert.equal(r(1.2e-5*21200*32,1),8.1);assert.equal(r(6.4e-6*79000,2),0.51);assert.equal(r(6.4e-6*316000,1),2);
 // Isotonic solutions, serial dilution, temperature.
 assert.equal(r(2*0.154,3),0.308);assert.equal(r(50/180.16,3),0.278);assert.equal(r(0.308/3,3),0.103);assert.equal(r(0.05+0.03,2),0.08);assert.equal(r(0.08/0.4,2),0.2);
 assert.equal(r(6.0e23*1e-24,2),0.6);assert.equal(r(1/NA*1e24,1),1.7);assert.equal(r(Math.log10(6.0e23)/2,1),11.9);
 assert.equal(r(0.99705/0.9832,4),1.0141);assert.equal(r(0.9832/0.99705,3),0.986);
});
test('Chimica 13: solubilità ed equilibrio eterogeneo, numeri ricalcolati',()=>{
 // Ksp values at 25 C (CRC); molar solubilities.
 const K={AgCl:1.77e-10,AgBr:5.35e-13,AgI:8.52e-17,Ag2CrO4:1.12e-12,BaSO4:1.08e-10,CaF2:3.45e-11,MgOH2:5.61e-12,FeOH3:2.79e-39,CaSO4:4.93e-5,SrSO4:3.44e-7,CaOH2:5.02e-6};
 const s1=k=>Math.sqrt(k),s2=k=>Math.cbrt(k/4),s3=k=>(k/27)**0.25;
 assert.equal(r(s1(K.AgCl)*1e5,2),1.33);assert.equal(r(s1(K.AgCl)*143.32*1e3,1),1.9);assert.equal(r(1/(s1(K.AgCl)*143.32),-1),520);
 assert.equal(r(s2(K.CaF2)*1e4,2),2.05);assert.equal(r(K.CaF2/4*1e12,1),8.6);assert.equal(r(s2(K.CaF2)*78.07*1e3,0),16);assert.equal(r(2*s2(K.CaF2)*19.00*1e3,1),7.8);
 assert.equal(r(4*(1.35e-3)**3*1e9,1),9.8);assert.equal(r(s2(K.Ag2CrO4)*1e5,2),6.54);assert.equal(r(0.0217/331.73*1e5,2),6.54);assert.equal(r(4*(0.0217/331.73)**3*1e12,2),1.12);
 assert.equal(r(s2(K.Ag2CrO4)/s1(K.AgCl),0),5);assert.equal(r(K.AgCl/K.Ag2CrO4,0),158);
 assert.equal(r(s1(K.AgBr)*1e7,1),7.3);assert.equal(r(s1(K.AgCl)/s1(K.AgBr),0),18);assert.equal(r(1/(s1(K.AgBr)*187.77),-2),7300);
 assert.equal(r(s1(K.BaSO4)*1e5,2),1.04);assert.equal(r(s1(K.BaSO4)*233.39*1e3,1),2.4);
 assert.equal(r(s2(K.MgOH2)*1e4,2),1.12);assert.equal(r(2*s2(K.MgOH2)*1e4,1),2.2);assert.equal(r(s2(K.MgOH2)*58.32*1e3,1),6.5);
 assert.equal(r(s3(K.FeOH3)*1e10,1),1);assert.equal(r(K.FeOH3/1e-21*1e18,1),2.8);
 assert.equal(r(s1(K.CaSO4)*1e3,0),7);assert.equal(r(s1(K.SrSO4)*1e4,0),6);assert.equal(r(s2(K.CaOH2)*1e2,1),1.1);
 // Common ion.
 assert.equal(r(K.AgCl/0.1*1e9,1),1.8);assert.equal(r(s1(K.AgCl)/(K.AgCl/0.1),-3),8000);assert.ok(Math.abs(K.AgCl/0.02*1e9-8.85)<0.01);assert.equal(r(s1(K.AgCl)/(K.AgCl/0.02),-2),1500);
 assert.equal(r(K.CaF2/1e-4*1e7,2),3.45);assert.equal(r(s2(K.CaF2)/(K.CaF2/1e-4),-2),600);
 // Silver chloro complexes (Martell-Smith log K1 = 3.31, log beta2 = 5.25) at 0.10 M chloride.
 const tot=K.AgCl/0.1+K.AgCl*10**3.31+K.AgCl*10**5.25*0.1;assert.equal(r(tot*1e6,1),3.5);
 // Precipitation tests.
 assert.equal(r((5e-4)**2*1e7,1),2.5);assert.equal(r((5e-4)**2/K.AgCl,-2),1400);assert.equal(r((1e-4)**2,10),1e-8);assert.ok((1e-6)**2<K.BaSO4);
 // Fractional precipitation.
 const agcl=K.AgCl/0.01,agcro=Math.sqrt(K.Ag2CrO4/0.01);assert.equal(r(agcl*1e8,1),1.8);assert.equal(r(agcro*1e5,2),1.06);assert.equal(r(agcro/agcl,-2),600);
 assert.equal(r(K.AgCl/agcro*1e5,1),1.7);assert.equal(r(100*(1-K.AgCl/agcro/0.01),1),99.8);
 assert.equal(r(K.AgI/0.01*1e15,1),8.5);assert.equal(r(K.AgI/agcl*1e9,1),4.8);assert.equal(r(K.AgCl/1e-3*1e7,1),1.8);
 // Complex formation in ammonia.
 const Kc=K.AgCl*1.6e7,rt=Math.sqrt(Kc),s=rt/(1+2*rt);assert.equal(r(Kc*1e3,1),2.8);assert.equal(r(rt,3),0.053);assert.equal(r(s,3),0.048);assert.equal(r(s/s1(K.AgCl),-2),3600);
 assert.equal(r(5.35e-13*2.9e13,0),16);
});
test('Chimica 14: stechiometria, numeri ricalcolati',()=>{
 const M={H2:2.016,O2:31.998,H2O:18.015,C8H18:114.23,CO2:44.009,Fe2O3:159.69,Al:26.982,Fe:55.845,Al2O3:101.96,CH4:16.043,Mg:24.305,EtOH:46.069,NaHCO3:84.007,N2:28.014,NH3:17.031,S:32.06,H2SO4:98.08,C4H10:58.12,BaSO4:233.39,CaCO3:100.09,CaO:56.077,Glc:180.156,HNO3:63.013};
 // Mass-energy check for the combustion of one mole of hydrogen.
 assert.equal(r(285800/c0**2*1e12,1),3.2);
 // Octane and ethanol.
 const no=703/M.C8H18;assert.equal(r(no,3),6.154);assert.equal(r(8*no,2),49.23);assert.equal(r(8*no*M.CO2/1000,2),2.17);assert.equal(r(12.5*no*M.O2/703,1),3.5);
 const ne=789/M.EtOH;assert.equal(r(ne,2),17.13);assert.equal(r(2*ne,2),34.25);assert.equal(r(2*ne*M.CO2/1000,2),1.51);
 // Thermite.
 const nf=100/M.Fe2O3;assert.equal(r(nf,4),0.6262);assert.equal(r(2*nf,3),1.252);assert.equal(r(2*nf*M.Al,1),33.8);assert.equal(r(2*nf*M.Fe,1),69.9);assert.equal(r(nf*M.Al2O3,2),63.85);assert.equal(r(2*nf*M.Al,2),33.79);assert.equal(r(2*nf*M.Fe,2),69.94);assert.equal(r(100+2*nf*M.Al,2),133.79);assert.equal(r(2*nf*M.Fe+nf*M.Al2O3,2),133.79);assert.equal(r(50-2*nf*M.Al,1),16.2);
 // Camping cylinder.
 const nb=450/M.C4H10;assert.equal(r(nb,2),7.74);assert.equal(r(6.5*nb,1),50.3);assert.equal(r(6.5*nb*24.79,-1),1250);assert.equal(r(6.5*nb*24.79/0.2095,-1),5960);
 // Solutions.
 assert.equal(r(0.025*0.15*2/0.1*1000,1),75);assert.equal(r(0.5/M.Mg,4),0.0206);assert.equal(r(2*0.5/M.Mg/0.2*1000,0),206);assert.equal(r(0.03*0.12/2/0.025,4),0.072);
 assert.equal(r(0.005*M.BaSO4,2),1.17);assert.equal(r(0.001/0.09,4),0.0111);
 // Tanks of the service module.
 assert.equal(r(100000/M.H2/1000,1),49.6);assert.equal(r(600000/M.O2/1000,2),18.75);assert.equal(r(2*600000/M.O2*M.H2O/1000,0),676);assert.equal(r(2*600000/M.O2*M.H2/1000,1),75.6);assert.equal(r(100-2*600000/M.O2*M.H2/1000,1),24.4);
 // Rocket mixture ratio.
 assert.equal(r(M.O2/(2*M.H2),2),7.94);const o=6000/M.O2;assert.equal(r(o,1),187.5);assert.equal(r(2*o*M.H2/1000,3),0.756);assert.equal(r(100*(1-2*o*M.H2/1000),0),24);
 // Hydrogen and oxygen in excess; methane; nitrogen to hydrogen mass ratio.
 assert.equal(r(10/M.H2,2),4.96);assert.equal(r(2*64/M.O2*M.H2O,1),72.1);assert.equal(r((10/M.H2-2*64/M.O2)*M.H2,1),1.9);assert.equal(r(10/M.CH4*2*M.O2,1),39.9);assert.equal(r(3*M.H2/M.N2,3),0.216);
 // Ammonia with extent of reaction.
 const nN=28/M.N2,nH=9/M.H2;assert.equal(r(nH,2),4.46);assert.equal(r(nH/3,2),1.49);assert.equal(r(2*nN*M.NH3,1),34);assert.equal(r(nH-3*nN,2),1.47);assert.equal(r((nH-3*nN)*M.H2,1),3);
 // Mixture analysis, impure limestone, sulfur, Ostwald, respiration.
 assert.equal(r(0.4*2*M.NaHCO3/(M.H2O+M.CO2),2),1.08);assert.equal(r(0.4*M.NaHCO3/(M.H2O+M.CO2)*100,0),54);
 assert.equal(r(920000/M.CaCO3/1000,2),9.19);assert.equal(r(920000/M.CaCO3*M.CaO/1000,0),515);
 assert.equal(r(M.H2SO4/M.S,2),3.06);assert.equal(r(1.5*1e6/M.S*M.O2/1e6,2),1.5);assert.equal(r(M.HNO3/M.NH3,2),3.7);
 const ng=100/M.Glc;assert.equal(r(ng,3),0.555);assert.equal(r(6*ng,2),3.33);assert.equal(r(6*ng*M.CO2,0),147);assert.equal(r(6*ng*24.79,0),83);
});
test('Chimica 15: resa e bilanci di materia, numeri ricalcolati',()=>{
 const sa=138.12,an=102.09,asp=180.16,ac=60.05;
 // Aspirin examples and atom economy.
 const n1=5/sa,na1=7*1.082/an;assert.equal(r(n1,4),0.0362);assert.equal(r(7*1.082,2),7.57);assert.equal(r(na1,4),0.0742);assert.equal(r(n1*asp,2),6.52);assert.equal(r(100*5.2/(n1*asp),0),80);
 assert.equal(r(100/0.8/asp*sa,1),95.8);assert.equal(r(0.95*5.2,2),4.94);assert.equal(r(100*0.95*5.2/(n1*asp),0),76);
 const n2=2/sa;assert.equal(r(n2,4),0.0145);assert.equal(r(5*1.082,2),5.41);assert.equal(r(5*1.082/an,3),0.053);assert.equal(r(n2*asp,2),2.61);assert.equal(r(100*2.1/(n2*asp),0),80);
 assert.equal(r(50/0.75,1),66.7);assert.equal(r(50/0.75/asp,3),0.37);assert.equal(r(50/0.75/asp*sa,1),51.1);
 assert.equal(r(100*asp/(sa+an),0),75);assert.equal(r(1000/asp,2),5.55);assert.equal(r(1000/asp*ac,0),333);
 // Lime and multistep yields.
 assert.equal(r(10/100.09,4),0.0999);assert.equal(r(10/100.09*56.08,2),5.6);assert.equal(r(100*5.12/(10/100.09*56.08),1),91.4);
 assert.equal(r(0.9*0.85*0.8,3),0.612);assert.equal(r(0.9**3,2),0.73);assert.equal(r(0.9**10,2),0.35);assert.equal(r(100*0.8**20,1),1.2);assert.equal(r(0.8**8,2),0.17);assert.equal(r(0.8**5,2),0.33);
 assert.equal(r(0.8**30*1000,1),1.2);assert.equal(r(0.8**10,2),0.11);assert.equal(r(0.85**12,2),0.14);assert.equal(r(0.85**7,2),0.32);assert.equal(r(0.85**10,3),0.197);assert.equal(r(1/0.85**10,1),5.1);
 assert.equal(r(0.9*0.85*100,1),76.5);
 // Boiler mass balances (air 20.95% O2, 79.05% inert).
 const N=o=>o*79.05/20.95;assert.equal(r(N(2.4),2),9.06);assert.equal(r(1+2+0.4+N(2.4),2),12.46);assert.equal(r(100/(1+0.4+N(2.4)),1),9.6);assert.equal(r(40/(1+0.4+N(2.4)),1),3.8);
 assert.equal(r(N(2.2),2),8.3);assert.equal(r(1+0.2+N(2.2),2),9.5);assert.deepEqual([1,0.2,N(2.2)].map(x=>r(100*x/(1.2+N(2.2)),1)),[10.5,2.1,87.4]);
 // Recycle, dryer, car, Solvay, E factor, ibuprofen, salt.
 assert.equal(r(100/0.15,0),667);assert.equal(r(100/0.15-100,0),567);assert.equal(r(1/0.15,1),6.7);assert.equal(r(0.85/0.15,1),5.7);
 assert.equal(r(0.75/0.98,3),0.765);assert.equal(r(1-0.75/0.98,3),0.235);assert.equal(r(5*2.167,1),10.8);assert.equal(r(5*2.167*10,0),108);
 assert.equal(r(100*105.99/(100.09+2*58.44),0),49);assert.equal(r(110.98/105.99,2),1.05);
 assert.equal(r(4+40-1,0),43);assert.equal(r(4+4-1,0),7);
 assert.equal(r(134.22+102.09+2.016+28.01,2),266.34);assert.equal(r(100*206.28/266.34,0),77);
 assert.equal(r(2.5*0.6,1),1.5);assert.equal(r(9.5-1.5,1),8);assert.equal(r(100*8/9.5,0),84);
 assert.equal(r(1000*0.035/0.25,0),140);assert.equal(r(1000/0.035/1000,1),28.6);
});
test('Chimica 17: velocità di reazione, numeri ricalcolati',()=>{
 const L2=Math.LN2;
 // Initial rates (illustrative data) and orders.
 assert.equal(r(Math.log2(8e-4/2e-4),0),2);assert.equal(r(Math.log2(4e-4/2e-4),0),1);assert.equal(r(2e-4/(0.1**2*0.1),2),0.2);
 assert.equal(r(Math.log2(2.4e-3/1.2e-3),0),1);assert.equal(r(1.2e-3/0.05,3),0.024);
 // Stoichiometric rates; average rate.
 assert.equal(r(4e-5/2,7),2e-5);assert.equal(r(4e-5/4,7),1e-5);assert.equal(r(0.09/60,4),0.0015);
 // Zero order: alcohol elimination at 0.15 g/L per hour.
 assert.equal(r(0.3/0.15,1),2);assert.equal(r(0.8/0.15,1),5.3);assert.equal(r(0.4/0.15,1),2.7);assert.equal(r(0.9/0.15,1),6);
 // First order: iodine-131, technetium-99m, carbon-14, generic.
 assert.equal(r(L2/8.02,4),0.0864);assert.equal(r(0.5**3,3),0.125);assert.equal(r(0.5**5*100,0),3);assert.equal(r(1/2**10*1000,1),1);
 assert.equal(r(24/6.01,1),4);assert.equal(r(0.5**(24/6.01),3),0.063);
 const kc=L2/5730;assert.equal(r(kc*1e4,2),1.21);assert.equal(r(Math.log(1/0.3),3),1.204);assert.equal(r(Math.log(1/0.3)/kc,-1),9950);assert.equal(r(0.5**(5300/5730),2),0.53);
 assert.equal(r(L2/15,3),0.046);assert.equal(r(Math.LN10/(L2/15),0),50);assert.equal(r(Math.LN10/L2,2),3.32);
 assert.deepEqual([0,100,200,300].map(t=>r(Math.exp(-3e-3*t),3)),[1,0.741,0.549,0.407]);assert.deepEqual([1,0.741,0.549,0.407].map(c=>r(1/c,2)),[1,1.35,1.82,2.46]);
 assert.equal(r(L2/2,2),0.35);assert.equal(r(1.0-1.0e-3,3),0.999);
 // Second order.
 assert.equal(r(1/(0.5*0.1),0),20);assert.equal(r((1/0.025-1/0.1)/0.5,0),60);
 // Repeated dosing and caffeine.
 assert.equal(r(2-1/2**4,4),1.9375);assert.equal(r(100*0.5**5,1),3.1);
 // Collisions: oxygen concentration factor; efficient fraction.
 assert.equal(r(1/0.2095,1),4.8);assert.equal(r(1e-5/1e11,20),1e-16);
});

test('Chimica 18: temperatura e attivazione, numeri ricalcolati',()=>{
 const R=8.314462618,f=(Ea,T1,T2)=>Math.exp(Ea/R*(1/T1-1/T2));
 // Reverse barrier.
 assert.equal(120-(-40),160);assert.equal(90+40,130);
 // Fraction of energetic collisions, Ea = 50 kJ/mol, and collision frequency.
 assert.equal(r(50000/(R*298.15),2),20.17);assert.equal(r(50000/(R*308.15),2),19.52);
 assert.equal(r(Math.exp(-50000/(R*298.15))*1e9,2),1.74);assert.equal(r(Math.exp(-50000/(R*308.15))*1e9,2),3.35);
 assert.equal(r(f(50000,298.15,308.15),2),1.92);assert.equal(r(100*(Math.sqrt(308.15/298.15)-1),1),1.7);
 assert.equal(r(R*300/1000,2),2.49);assert.equal(r(Math.exp(20-20/1.03),1),1.8);
 assert.equal(r(1.380649e-23*298/6.62607015e-34/1e12,0),6);
 assert.equal(r(Math.exp(-15000/(R*600))/Math.exp(-15000/(R*300)),0),20);
 // High barrier at 300 K and 1000 K.
 assert.equal(r(Math.exp(-1e5/(R*300))*1e18,1),3.9);assert.equal(r(Math.exp(-1e5/(R*1000))*1e6,1),6);
 // Arrhenius plot of the figure (Ea 60 kJ/mol, A 1e10 1/s).
 const lk=T=>Math.log(1e10)-60000/(R*T);assert.equal(r(lk(310),3),-0.253);assert.equal(r(lk(340),3),1.801);
 assert.equal(r((1/340-1/310)*1e4,3),-2.846);assert.equal(r((lk(340)-lk(310))/(1/340-1/310),-1),-7220);assert.equal(r(7220*8.314/1000,1),60);
 // Two temperatures: decomposing reagent, milk, doubling.
 assert.equal(r(Math.log(f(90000,298.15,308.15)),3),1.178);assert.equal(r(f(90000,298.15,308.15),2),3.25);assert.equal(r(120/f(90000,298.15,308.15),0),37);
 assert.equal(r(R*Math.log(7)/(1/277.15-1/295.15)/1000,1),73.5);assert.equal(r(100*(1-Math.pow(7,-1/18)),0),10);
 assert.equal(r(R*Math.LN2/(1/298.15-1/308.15)/1000,1),52.9);assert.equal(r(R*Math.LN2/(1/373.15-1/383.15)/1000,1),82.4);
 assert.deepEqual([20,50,100,150].map(E=>r(f(E*1000,298.15,308.15),2)),[1.3,1.92,3.7,7.13]);
 // Catalysts: 20 kJ/mol lower barrier, same gain by heating, H2O2 catalysts.
 assert.equal(r(20000/(R*298.15),2),8.07);assert.equal(r(Math.exp(20000/(R*298.15)),-2),3200);
 assert.equal(r(1/(1/298.15-Math.log(Math.exp(20000/(R*298.15)))*R/75000)-273.15,-1),130);
 assert.equal(r(Math.exp(19000/(R*298.15)),-3),2000);
 assert.equal(r(26000/(R*298.15),2),10.49);assert.equal(r(Math.exp(26000/(R*298.15))/1e4,1),3.6);
 assert.equal(r(52000/(R*298.15),2),20.98);assert.equal(r(Math.exp(52000/(R*298.15))/1e9,1),1.3);
 assert.equal(r(2*(-285.83)-2*(-191.17),0),-189);
 // Exercises.
 assert.equal(2**3,8);assert.equal(r(40000/(R*300),2),16.04);assert.equal(r(Math.exp(-40000/(R*300))*1e7,1),1.1);
 assert.equal(r(Math.exp(-40000/(R*600))*1e4,1),3.3);assert.equal(r(Math.exp(40000/(R*600)),-3),3000);
 assert.equal(r(8.314*Math.log(4),2),11.53);assert.equal(r((1/300-1/320)*1e4,3),2.083);assert.equal(r(8.314*Math.log(4)/(1/300-1/320)/1000,1),55.3);
 assert.equal(r(Math.log(f(80000,298.15,318.15)),3),2.029);assert.equal(r(f(80000,298.15,318.15),1),7.6);
 assert.equal(r(85000/8.314*(1/298.15-1/313.15),3),1.643);assert.equal(r(f(85000,298.15,313.15),1),5.2);assert.equal(r(6*f(85000,298.15,313.15),0),31);
 assert.equal(60-(-30),90);
 assert.equal(r(Math.log(f(50000,310.15,313.15)),3),0.186);assert.equal(r(f(50000,310.15,313.15),2),1.2);
 assert.equal(r(Math.exp(23)/1e9,1),9.7);assert.equal(r(23-7220/298.15,2),-1.22);assert.equal(r(Math.exp(23-7220/298.15),2),0.3);
 assert.equal(r(Math.log(f(-10000,298.15,308.15)),3),-0.131);assert.equal(r(f(-10000,298.15,308.15),2),0.88);
 assert.deepEqual([0.1,1,4,9].map(s=>r(s/(1+s),3)),[0.091,0.5,0.8,0.9]);
});
