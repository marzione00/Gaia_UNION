import test from 'node:test';import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
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
 // SVG figures next to the chapter: numbered with the others, also inside blocks; other paths stay plain text.
 const f=parseChapter('## A\n![Schema $x$](fig/prova-01.svg "320x200")\n\n::: esempio E\n![Altro](fig/prova-02.svg)\n:::\n![X](../segreto.svg)\n');
 assert.deepEqual(f.images,['fig/prova-01.svg','fig/prova-02.svg']);assert.equal(f.figures.length,2);
 assert.ok(f.html.includes('data-src="fig/prova-01.svg"')&&f.html.includes('aspect-ratio:320/200')&&f.html.includes('aria-label="Schema x"')&&!f.html.includes('segreto.svg"'));
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
// Text written for the site in the handout chapters: the opening and the sections whose id starts with g-.
const ownText=src=>src.split(/^(?=## )/m).filter(b=>/^## .*\{#(apertura|g-[\w-]+)\}/.test(b)).join('\n');
test('Libro: capitoli tratti dalla dispensa di fisica, figure e testo aggiunto',async()=>{
 const caps=index.capitoli.filter(c=>c.stato==='dispensa'),used=new Set();assert.equal(caps.length,24);
 for(const c of caps){
  const src=await read(c.file),ch=parseChapter(src),ids=new Set([...ch.toc.map(t=>t.id),...ch.figures,...ch.exercises.map(e=>e.id)]);
  assert.equal(ch.meta.origine,'dispensa',c.unit);assert.match(ch.meta.fonte,/^Dispensa di fisica, sezion/,c.unit);
  assert.ok(ch.words>=1400,c.unit+' '+ch.words);for(const id of ['apertura','esercizi','fonti'])assert.ok(ids.has(id),c.unit+' '+id);
  assert.ok(ch.exercises.length>=5&&ch.exercises.every(e=>e.solution),c.unit);
  for(const lv of ['base','medio','avanzato'])assert.ok(ch.exercises.some(e=>e.level===lv),c.unit+' '+lv);
  for(const l of ch.links){if(l.startsWith('unit:'))assert.ok(units.has(l.slice(5).split('#')[0]),l);else if(l.startsWith('#'))assert.ok(ids.has(l.slice(1)),c.unit+' '+l);}
  // Formulas balanced; no LaTeX left outside formulas, no placeholders of the converter.
  const text=src.replace(/^---[\s\S]*?\n---\n/,''),prose=text.replace(/\$\$[\s\S]*?\$\$/g,'').replace(/::: figura[\s\S]*?\n---\n/g,'');
  assert.equal((text.match(/\$\$/g)||[]).length%2,0,c.unit);
  for(const para of prose.split(/\n\s*\n/))assert.equal((para.match(/\$/g)||[]).length%2,0,c.unit+': '+para.slice(0,80));
  assert.ok(!/\\[A-Za-z]+/.test(prose.replace(/\$[^$\n]+\$/g,'')),c.unit);assert.ok(!/\x00|REF:|più avanti\)/.test(src),c.unit);
  assert.ok(!src.includes('—'),c.unit);
  // House style on the text written for the site.
  const own=ownText(src);assert.ok(own.length>400,c.unit);assert.ok(!/non solo/i.test(own)&&!/\bnon\b[^.;:\n]{0,80}\bma\b/i.test(own)&&!/\bnon\b[^.;\n]{0,70}:/i.test(own),c.unit);
  // SVG figures: present, well formed, with ids prefixed by their own file name (unique on the page).
  for(const img of ch.images){
   assert.ok(img.startsWith('fig/'+c.unit+'-'),img);used.add(img.slice(4));const svg=await read('content/libro/'+img),prefix=img.slice(4,-4).replace(/[^a-z0-9]/g,'')+'-';
   assert.ok(svg.startsWith('<svg')&&/viewBox="[\d. ]+"/.test(svg)&&!/<script|<foreignObject|\son\w+\s*=/i.test(svg),img);
   for(const m of svg.matchAll(/\bid="([^"]+)"/g))assert.ok(m[1].startsWith(prefix),img+' '+m[1]);
  }
 }
 for(const f of await readdir(new URL('content/libro/fig/',root)))assert.ok(used.has(f),'figura non usata '+f);
});
test('Libro: numeri delle sezioni scritte per il sito, ricalcolati',()=>{
 const g=9.81,r=(x,d)=>d<0?Math.round(x/10**-d)*10**-d:+x.toFixed(d);
 assert.equal(r(1025*g*25+101325,-3),353000);assert.equal(r(13595.1*9.80665*0.760,0),101325);assert.equal(r(Math.sqrt(2*g*1.8),1),5.9);
 assert.equal(r(1200*g*2/400,0),59);assert.equal(r(0.5*1000*(3.6**2-1.2**2),0),5760);assert.equal(r(800*g/156.25,1),50.2);
 assert.equal(r(917/1025,3),0.895);assert.equal(r(1.204*(1-293.15/373.15),2),0.26);assert.equal(r(1000*2.70/(2.70-1.70),0),2700);
 assert.equal(r(0.8*40*Math.sin(Math.PI/3),1),27.7);assert.equal(r((20*g*2+50*g)/4,0),221);assert.equal(r(4*g*0.6/(0.5*1.2),1),39.2);
 assert.equal(r(Math.sqrt(2*1.602176634e-16/9.1093837e-31)/1e7,2),1.88);assert.equal(r(0.5*330e-6*300**2,0),15);assert.equal(r(0.5*8.8541878e-12*9e12,1),39.8);
 assert.equal(r(1.68e-8*10/1.5e-6,3),0.112);assert.equal(r(72/11,2),6.55);assert.equal(r((12-72/11)/4,2),1.36);assert.equal(r((6-72/11)/2,2),-0.27);
 assert.equal(r(Math.sqrt(2*g/1.4),2),3.74);assert.equal(r(Math.sqrt(2*g/1.5),2),3.62);assert.equal(r(Math.sqrt(g),2),3.13);assert.equal(r(0.5*0.625*(100*Math.PI)**2,-2),30800);
});
