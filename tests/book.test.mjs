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
test('Libro: il capitolo pilota di chimica «Mole e quantità di sostanza» è completo',async()=>{
 const src=await read('content/libro/chemistry-03.md'),ch=parseChapter(src),ids=new Set([...ch.toc.map(t=>t.id),...ch.figures,...ch.exercises.map(e=>e.id)]);
 assert.equal(index.capitoli.find(c=>c.unit==='chemistry-03')?.stato,'pilota');assert.match(ch.meta.fonte,/Petrucci/);
 assert.ok(ch.words>=7000,ch.words);assert.ok(ch.toc.filter(t=>t.level===2).length>=14);assert.ok(ch.figures.length>=8);
 assert.ok(ch.exercises.length>=18&&ch.exercises.every(e=>e.solution));for(const lv of ['base','medio','avanzato'])assert.ok(ch.exercises.filter(e=>e.level===lv).length>=5,lv);
 for(const l of ch.links){if(l.startsWith('unit:'))assert.ok(units.has(l.slice(5).split('#')[0]),l);else if(l.startsWith('#'))assert.ok(ids.has(l.slice(1)),l);}
 const text=src.replace(/^---[\s\S]*?\n---\n/,'');assert.equal((text.match(/\$\$/g)||[]).length%2,0);
 for(const para of text.replace(/\$\$[\s\S]*?\$\$/g,'').replace(/::: figura[\s\S]*?\n---\n/g,'').split(/\n\s*\n/))assert.equal((para.match(/\$/g)||[]).length%2,0,para.slice(0,80));
 // House style: the whole chapter is written for the site.
 assert.ok(!src.includes('—')&&!/non solo/i.test(src)&&!/\bnon\b[^.;:\n]{0,80}\bma\b/i.test(src)&&!/\bnon\b[^.;\n]{0,70}:/i.test(src));
 // Numbers of the chapter recomputed from the abridged standard atomic weights (CIAAW) and the SI constants.
 const A={H:1.008,C:12.011,N:14.007,O:15.999,Na:22.990,Mg:24.305,S:32.06,Cl:35.45,K:39.098,Ca:40.078,Fe:55.845,Cu:63.546},NA=6.02214076e23;
 const M=f=>[...f.matchAll(/([A-Z][a-z]?)(\d*)/g)].reduce((t,[,e,k])=>t+A[e]*(k?+k:1),0),r=(x,d)=>+x.toFixed(d);
 assert.equal(r(M('H2O'),3),18.015);assert.equal(r(M('C6H12O6'),3),180.156);assert.equal(r(M('CaCO3'),3),100.086);assert.equal(r(M('C12H22O11'),2),342.3);
 assert.equal(r(M('Fe2O3'),3),159.687);assert.equal(r(M('C8H10N4O2'),3),194.194);assert.equal(r(M('CuSO4')+5*M('H2O'),2),249.68);assert.equal(r(M('H2SO4'),2),98.07);
 assert.equal(r(6*A.C/M('C6H12O6')*100,2),40.00);assert.equal(r(12*A.H/M('C6H12O6')*100,2),6.71);assert.equal(r(0.7576*34.969+0.2424*36.966,2),35.45);
 assert.equal(r(NA/(8e9*1e6)/(365.25*86400),1),2.4);assert.equal(r(4.0/M('C12H22O11')*NA/1e21,1),7.0);assert.equal(r(2.5e23/NA*A.Cu,1),26.4);
 assert.equal(r(1000/M('H2')*M('H2O')/1000,2),8.94);assert.equal(r(1000/M('H2')/2*M('O2')/1000,2),7.94);assert.equal(r(2*A.Fe/M('Fe2O3')*1000,0),699);
 const comb=(mc,mh,m)=>{const c=mc*A.C/M('CO2'),h=mh*2*A.H/M('H2O'),o=m-c-h;return [c/A.C,h/A.H].map(x=>r(x/(o/A.O),2));};
 assert.deepEqual(comb(0.3821,0.2346,0.2),[2,6]);assert.deepEqual(comb(0.3409,0.1396,0.15),[3,6]);assert.deepEqual(comb(0.6163,0.1081,0.2443),[3.5,3]);
 assert.equal(r((0.512/M('H2O'))/(0.488/M('MgSO4')),1),7);assert.equal(r((0.902/M('H2O'))/(1.598/M('CuSO4')),2),5);
 assert.equal(r((27.64/A.O)/(72.36/A.Fe),3),1.333);assert.equal(r((74.06/A.O)/(25.94/A.N),2),2.5);assert.equal(r((14.37/A.H)/(85.63/A.C),2),2);
 assert.equal(r(100/(2*A.N/M('N2H4O3')),0),286);assert.equal(r(100/(2*A.N/M('CH4N2O')),0),214);assert.equal(r(100/(2*A.N/M('N2H8SO4')),0),472);
 assert.equal(r(8.314462618*273.15/101325*1000,3),22.414);assert.equal(r(8.314462618*273.15/1e5*1000,3),22.711);assert.equal(r(1.25*22.414,1),28.0);
 assert.equal(r(12.0000000126/12,9),1.000000001);assert.equal(r(0.6915*62.930+0.3085*64.928,3),63.546);assert.equal(r((0.528-35.45/74.548)/(35.45/58.44-35.45/74.548),3),0.4);
});
