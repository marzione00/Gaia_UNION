import test from 'node:test';import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {parseChapter,inline,escapeHtml,BLOCK_TYPES} from '../src/book/markdown.js';
import {renderFigure} from '../src/book/figures.js';
import {resolveRoute} from '../src/routing.js';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const catalogue=JSON.parse(await read('content/catalogue.json')),index=JSON.parse(await read('content/libro/index.json'));
const units=new Set(catalogue.modules.map(m=>m.id));

test('Libro: formato dei capitoli, blocchi, esercizi, figure e testo sempre escapato',()=>{
 const r=parseChapter(`---\nunit: x\ntitolo: Prova\n---\n## Uno {#uno}\nTesto <script>alert(1)</script> con $a<b$ e **forte**.\n\n::: esercizio Prova [avanzato]\nTraccia.\n>>> soluzione\nSoluzione.\n:::\n\n::: approfondimento Più avanti\nAltro.\n:::\n### Due\n- a\n- b\n`);
 assert.equal(r.meta.titolo,'Prova');assert.deepEqual(r.toc.map(t=>[t.id,t.level]),[['uno',2],['due',3]]);
 assert.ok(!r.html.includes('<script>'));assert.ok(r.html.includes('&lt;script&gt;'));assert.ok(r.html.includes('$a&lt;b$'));
 assert.deepEqual(r.exercises,[{id:'esercizio-1',title:'Prova',level:'avanzato',solution:true}]);
 assert.ok(r.html.includes('<details class="libro-blocco libro-approfondimento">'));
 assert.throws(()=>parseChapter('::: inventato\n:::'),/sconosciuto/);assert.throws(()=>parseChapter('::: nota\naperto'),/non chiuso/);assert.throws(()=>parseChapter('testo\n:::'),/senza apertura/);
 assert.match(inline('[a](unit:physics-07#x) [b](#y) [c](javascript:alert(1))'),/data-unit="physics-07" data-anchor="x".*data-anchor="y".*c$/);
 assert.equal(escapeHtml('"<&>'),'&quot;&lt;&amp;&gt;');
 const svg=renderFigure({w:100,h:50,items:[{t:'arrow',p:[0,0,50,0],c:'force',s:'F',sub:'1'},{t:'spring',p:[0,20,100,20]},{t:'arc',p:[10,10],a:[0,45],s:'θ'},{t:'axes',o:[5,45],x:[90,'x'],y:[40,'y'],sx:1,sy:1,xt:[[10,'10']]},{t:'plot',o:[5,45],sx:1,sy:1,pts:[[0,0],[10,10]],s:'m'}]},'Prova <b>');
 assert.ok(svg.startsWith('<svg')&&svg.endsWith('</svg>')&&!svg.includes('NaN')&&svg.includes('aria-label="Prova &lt;b&gt;"'));
 assert.throws(()=>renderFigure({w:0,h:1,items:[]}));assert.throws(()=>renderFigure({w:1,h:1,items:[{t:'ignoto'}]}));
});
test('Libro: indice dei capitoli coerente con il catalogo e con i file',async()=>{
 assert.equal(index.schemaVersion,1);assert.ok(index.capitoli.length>=1);
 for(const c of index.capitoli){assert.ok(units.has(c.unit),c.unit);await access(new URL(c.file,root));const ch=parseChapter(await read(c.file));assert.equal(ch.meta.unit,c.unit);assert.equal(ch.meta.titolo,c.titolo);}
 const r=resolveRoute('#/libro?unit=physics-06&sezione=terzo-principio',catalogue.modules,[]);assert.equal(r.scene,'libro');assert.equal(catalogue.modules[r.selected].id,'physics-06');assert.equal(r.bookSection,'terzo-principio');
 assert.equal(resolveRoute('#/libro?unit=physics-06&sezione=<x>',catalogue.modules,[]).bookSection,null);
});
test('Libro: il capitolo pilota «Forze e leggi di Newton» è completo',async()=>{
 const src=await read('content/libro/physics-06.md'),ch=parseChapter(src),ids=new Set([...ch.toc.map(t=>t.id),...ch.figures,...ch.exercises.map(e=>e.id)]);
 assert.ok(ch.words>=7000,ch.words);assert.ok(ch.toc.filter(t=>t.level===2).length>=12);assert.ok(ch.figures.length>=8);
 assert.ok(ch.exercises.length>=18&&ch.exercises.every(e=>e.solution));for(const lv of ['base','medio','avanzato'])assert.ok(ch.exercises.filter(e=>e.level===lv).length>=5,lv);
 for(const l of ch.links){if(l.startsWith('unit:'))assert.ok(units.has(l.slice(5).split('#')[0]),l);else if(l.startsWith('#'))assert.ok(ids.has(l.slice(1)),l);}
 // Formulas: $…$ and $$…$$ balanced in every paragraph and block.
 const text=src.replace(/^---[\s\S]*?\n---\n/,'');assert.equal((text.match(/\$\$/g)||[]).length%2,0);
 for(const para of text.replace(/\$\$[\s\S]*?\$\$/g,'').split(/\n\s*\n/))assert.equal((para.match(/\$/g)||[]).length%2,0,para.slice(0,80));
 for(const t of BLOCK_TYPES.filter(t=>!['esercizio','figura'].includes(t)))assert.ok(!new RegExp('::: '+t+' ?\\n:::').test(src));
 // House style: no em dashes and none of the banned contrastive constructions.
 assert.ok(!src.includes('—'));assert.ok(!/non solo/i.test(src));assert.ok(!/\bnon\b[^.;:\n]{0,80}\bma\b/i.test(src));
 // Numbers that recur in the text, recomputed.
 const g=9.81;assert.equal((1200*(0-25)/5).toFixed(0),'-6000');assert.equal(((5-3)*g/8).toFixed(2),'2.45');assert.equal((2*3*5*g/8).toFixed(1),'36.8');assert.equal((60*(g+1.5)/g).toFixed(1),'69.2');assert.equal((4*g/(2*Math.sin(Math.PI/6))).toFixed(1),'39.2');assert.equal(((7.292e-5)**2*6.378e6).toFixed(3),'0.034');
});
