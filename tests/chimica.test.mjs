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
