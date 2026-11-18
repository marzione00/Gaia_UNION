import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
// Reading levels: Base, Applica and Approfondisci must be three distinct explanations, not copies of one another.
// REWRITTEN lists the disciplines whose path texts have been rewritten; extend it with each new discipline.
const REWRITTEN=['chemistry'];
const root=new URL('../',import.meta.url),bundle=JSON.parse(fs.readFileSync(new URL('content/curriculum/bundle.json',root),'utf8'));
const LEVELS=['base','intermediate','advanced'],MIN={0:90,1:230,2:100,3:120,5:75},MAX_SIMILARITY=.2;
// Phrasings the project style guide forbids in site prose.
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const words=t=>t.join(' ').split(/\s+/).filter(Boolean).length;
const trigrams=t=>{const w=t.join(' ').toLowerCase().split(/\s+/),s=new Set();for(let i=0;i+3<=w.length;i++)s.add(w.slice(i,i+3).join(' '));return s;};
const similarity=(a,b)=>{const A=trigrams(a),B=trigrams(b);let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n||1);};
const units=bundle.courses.filter(d=>REWRITTEN.some(p=>d.id.startsWith(p+'-')));
test('le discipline riscritte sono presenti nel curriculum',()=>{for(const p of REWRITTEN)assert.ok(units.some(d=>d.id.startsWith(p+'-')),p);});
for(const d of units)test(d.id+': tre livelli distinti, abbastanza lunghi e nello stile del progetto',()=>{
 const seen=new Map();
 d.steps.forEach((s,i)=>{
  if(i===4)return; // Verifica shows the quiz, so its text is never displayed.
  const L=LEVELS.map(k=>s.text[k]);
  L.forEach((t,k)=>{assert.ok(Array.isArray(t)&&t.length,`${d.id} tappa ${i} ${LEVELS[k]}: vuoto`);assert.ok(words(t)>=MIN[i],`${d.id} tappa ${i} ${LEVELS[k]}: ${words(t)} parole, minimo ${MIN[i]}`);});
  for(let a=0;a<3;a++)for(let b=a+1;b<3;b++){
   assert.ok(!L[a].some(p=>L[b].includes(p)),`${d.id} tappa ${i}: paragrafo condiviso fra ${LEVELS[a]} e ${LEVELS[b]}`);
   const j=similarity(L[a],L[b]);assert.ok(j<=MAX_SIMILARITY,`${d.id} tappa ${i}: ${LEVELS[a]} e ${LEVELS[b]} simili (${j.toFixed(2)})`);
  }
  for(const [k,t] of L.entries())for(const p of t){
   for(const r of STYLE)assert.ok(!r.test(p),`${d.id} tappa ${i} ${LEVELS[k]}: stile ${r}`);
   assert.ok(!seen.has(p.trim()),`${d.id}: paragrafo ripetuto nelle tappe ${seen.get(p.trim())} e ${i}`);seen.set(p.trim(),i);
  }
 });
 // A lab unit has no activity panel, so every level of the Sperimenta step explains how to save both configurations.
 if(!d.activity)for(const k of LEVELS){const t=d.steps[2].text[k].join(' ');assert.ok(t.includes('Salva A')&&t.includes('Salva B'),`${d.id} tappa 2 ${k}: protocollo A/B assente`);}
});
