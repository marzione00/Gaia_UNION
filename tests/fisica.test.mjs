// Volume di fisica, unità di astrofisica F26-F40: struttura dei capitoli originali e numeri ricalcolati.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseChapter} from '../src/book/markdown.js';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const index=JSON.parse(await read('content/libro/index.json'));
const originali=index.capitoli.filter(c=>c.volume==='Fisica'&&c.stato==='originale');
const r=(x,d)=>d<0?Math.round(x/10**-d)*10**-d:+x.toFixed(d);
// Constants: SI 2019 exact values, CODATA 2022, IAU 2015 nominal solar values.
const c=299792458,G=6.6743e-11,AU=1.495978707e11,S0=1361,LSUN=3.828e26,MSUN=1.98840987e30,eps0=8.8541878188e-12,mu0=1.25663706127e-6,h=6.62607015e-34,kB=1.380649e-23,e=1.602176634e-19,me=9.1093837139e-31,mp=1.67262192595e-27,sigma=5.670374419e-8;
test('Fisica: i capitoli originali sono completi, collegati e scritti nello stile del sito',async()=>{
 assert.ok(originali.length>=1);
 for(const ch0 of originali){
  assert.match(ch0.unit,/^physics-(2[6-9]|3\d|40)$/);
  const src=await read(ch0.file),ch=parseChapter(src),ids=new Set([...ch.toc.map(t=>t.id),...ch.figures,...ch.exercises.map(e=>e.id)]);
  assert.equal(ch.meta.unit,ch0.unit);assert.equal(ch.meta.volume,'Volume di fisica');assert.match(ch.meta.fonte,/^Testo originale; riferimento principale D\. Halliday, R\. Resnick, J\. Walker/,ch0.unit);assert.match(src,/## Fonti \{#fonti\}/);
  assert.ok(ch.words>=5000,ch0.unit+' '+ch.words);assert.ok(ch.toc.filter(t=>t.level===2).length>=12,ch0.unit);assert.ok(ch.figures.length>=6,ch0.unit);
  assert.ok(ch.exercises.length>=16&&ch.exercises.every(e=>e.solution),ch0.unit);for(const [lv,n] of [['base',6],['medio',6],['avanzato',4]])assert.ok(ch.exercises.filter(e=>e.level===lv).length>=n,ch0.unit+' '+lv);
  for(const l of ch.links){if(l.startsWith('#'))assert.ok(ids.has(l.slice(1)),ch0.unit+' '+l);}
  const text=src.replace(/^---[\s\S]*?\n---\n/,''),prose=text.replace(/::: figura[\s\S]*?\n---\n/g,'');
  assert.equal((text.match(/\$\$/g)||[]).length%2,0,ch0.unit);
  for(const para of prose.replace(/\$\$[\s\S]*?\$\$/g,'').split(/\n\s*\n/))assert.equal((para.match(/\$/g)||[]).length%2,0,ch0.unit+': '+para.slice(0,80));
  // Control characters (for example a backspace left by an unescaped \\b) break MathJax.
  assert.ok(!/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(src),ch0.unit+' carattere di controllo');
  assert.ok(!src.includes('—'),ch0.unit);assert.ok(!/non solo/i.test(prose),ch0.unit);assert.ok(!/\bnon\b[^.;:\n]{0,80}\bma\b/i.test(prose),ch0.unit);assert.ok(!/\bnon\b[^.;\n]{0,70}:/i.test(prose),ch0.unit);assert.ok(!/, e non /i.test(prose),ch0.unit);
  // Figures are cited by number: every «figura N» must exist.
  for(const m of prose.matchAll(/\bfigura (\d+)\b/g))assert.ok(+m[1]>=1&&+m[1]<=ch.figures.length,ch0.unit+' figura '+m[1]);
 }
});
test('Fisica 26: onde elettromagnetiche e pressione della luce, numeri ricalcolati',()=>{
 assert.ok(Math.abs(1/Math.sqrt(mu0*eps0)-c)<1);assert.equal(r(1000/c*1e6,1),3.3);
 const Em=I=>Math.sqrt(2*I/(c*eps0));assert.equal(r(Em(S0)/1e3,2),1.01);assert.equal(r(Em(S0)/c*1e6,1),3.4);assert.equal(r(1e-3/(Math.PI*0.5e-3**2),-2),1300);
 const L=4*Math.PI*AU**2*S0;assert.equal(r(L/1e26,2),3.83);assert.ok(L/6.2e20>5e5);
 const I=d=>S0/d**2;assert.equal(r(I(0.387),-2),9100);assert.ok(I(0.387)/S0>6);assert.equal(r(I(5.2),0),50);assert.equal(r(I(30.07),1),1.5);assert.equal(r(30.07**2,-2),900);assert.equal(r(14000/5.2**2,-2),500);
 assert.equal(r(S0/c*1e6,1),4.5);assert.equal(r(2*S0/c*1e6,1),9.1);assert.equal(r(101325/(S0/c)/1e10,1),2.2);
 const Fe=S0/c*Math.PI*6.371e6**2,Fg=1.32712e20*5.972e24/AU**2;assert.equal(r(Fe/1e8,1),5.8);assert.equal(r(Fe/9.81/1e3,-4),60000);assert.equal(r(Fg/1e22,1),3.5);assert.equal(r(Fg/Fe/1e13,0),6);
 const beta=3*LSUN/(16*Math.PI*G*MSUN*c);assert.equal(r(beta/1e3*1e6,2),0.57);assert.equal(r(0.57/(2.5*0.5),2),0.46);
 const tPR=c*AU**2/(4*1.32712e20)/3.156e7;assert.equal(r(tPR,-2),400);assert.equal(r(tPR/0.1,-3),4000);
 const a1=2*S0/(c*0.01);assert.equal(r(a1*1e3,2),0.91);assert.equal(r(a1*86400,0),78);assert.equal(r(a1*3.156e7/1e3,0),29);
 assert.equal(r(1.12e-3/315*1e6,1),3.6);assert.equal(r(315/196,1),1.6);assert.equal(r(1.12e-3/(2*S0/c*196)*100,0),63);
 // Exercises.
 assert.equal(r(S0/1.52**2,0),589);assert.equal(r(Em(S0/1.52**2),0),666);assert.equal(r(c/1.4204e9,3),0.211);assert.equal(r(c/550e-9/1e14,2),5.45);assert.equal(r(c/550e-9/1.4204e9,-5),400000);
 const L10=4*Math.PI*3.086e17**2*1e-9;assert.equal(r(L10/1e27,1),1.2);assert.equal(r(L10/LSUN,1),3.1);assert.equal(r(S0/c*10*1e5,1),4.5);assert.equal(r(5e-6*9.81*1e5,1),4.9);
 assert.equal(r(0.5*Math.cos(Math.PI/3)**2,4),0.125);assert.equal(r(AU/c,0),499);assert.equal(r(30.07*AU/c,-2),15000);assert.equal(r(30.07*AU/c/3600,2),4.17);
 const Fm=S0/c*Math.PI*1.737e6**2,Gm=1.32712e20*7.35e22/AU**2;assert.equal(r(Fm/1e7,1),4.3);assert.equal(r(Gm/1e20,1),4.4);assert.equal(r(Math.log10(Fm/Gm),0),-13);
 assert.equal(r(0.57/2.5,2),0.23);assert.equal(r(0.57/(2.5*0.3),2),0.76);assert.equal(r(400/0.05*2.5**2,-3),50000);assert.equal(r(1.12e-3/315*8.64e6,0),31);
 const sc=LSUN/(2*Math.PI*c*1.32712e20);assert.equal(r(sc*1e3,2),1.53);assert.equal(r(1.39,1),1.4);
 const Il=5e-3/(Math.PI*1e-6);assert.equal(r(Il/1e3,1),1.6);assert.equal(r(Em(Il)/1e3,1),1.1);
 assert.equal(r(LSUN/c**2/1e9,2),4.26);assert.equal(r(4.6e9*3.156e7/1e17,2),1.45);assert.equal(r(LSUN/c**2*1.45e17/1e26,1),6.2);assert.equal(r(LSUN/c**2*1.45e17/1.989e30*1e4,0),3);
 assert.equal(r(14000/5.2**2,0),518);assert.equal(r(14000/5.46**2,0),470);
 assert.equal(r(0.5*Math.cos(Math.PI/12)**12,3),0.330);assert.equal(r(Math.PI**2/4,2),2.47);
 assert.equal(r(a1*1e3/0.09,1),10.1);assert.equal(r(1.32712e20/(0.3*AU)**2,3),0.066);assert.equal(r(a1/0.09/(1.32712e20/(0.3*AU)**2),2),0.15);assert.equal(r(sc/0.01,2),0.15);
 // Model probes: sail acceleration at r = 1.4 and 2.6 AU (25% and 50% of the domain) for sigma = 10 and 5 g/m2.
 const m=(x,s)=>2*1361/(299792458*s/1000)/(x*x)*1000;assert.deepEqual([m(1.4,10),m(2.6,10),m(1.4,5),m(2.6,5)].map(v=>r(v,3)),[0.463,0.134,0.926,0.269]);
});
