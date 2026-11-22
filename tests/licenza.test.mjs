import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { AUTHOR, LICENCE, CREDIT, LICENCE_ROW } from '../src/licenza.js';
// Author and licence (1.61.1): the site, the metadata and the licence files say the same thing, and the line of
// the bottom bar fits from a 320 px phone to a wide screen.
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const STYLE=[/—/,/\bnon (solo|soltanto)\b/i,/\bnon\b[^.;:\n]{0,80}\bma\b/i,/\bnon\b[^.;\n]{0,70}:/i,/, e non /i];
const styles=JSON.parse(read('assets/glyphs.json')).styles;
const width=(t,style)=>[...t].reduce((n,c)=>n+(styles[style].glyphs[c]||styles[style].glyphs['?']).advance,0);
const glyphs=(t,style)=>{for(const c of t)assert.ok(c===' '||styles[style].glyphs[c],`glifo mancante «${c}» (${style}) in ${t}`);};

test('licenza: stesso autore e stessa licenza in package.json, LICENSE, LICENSE.md, README e index.html',()=>{
 assert.equal(AUTHOR,'Marzio De Corato');assert.equal(LICENCE.short,'CC BY-NC 4.0');assert.ok(LICENCE.url.startsWith('https://creativecommons.org/licenses/by-nc/4.0/'));
 const pkg=JSON.parse(read('package.json'));assert.equal(pkg.license,LICENCE.spdx);assert.equal(pkg.author,AUTHOR);
 const legal=read('LICENSE');assert.equal(legal.split('\n')[0],'Attribution-NonCommercial 4.0 International');assert.ok(legal.includes('NonCommercial means not primarily intended for or directed towards'));
 const md=read('LICENSE.md');
 assert.ok(md.includes(`**${AUTHOR}**`)&&md.includes(`**${LICENCE.name} (${LICENCE.short})**`)&&md.includes('https://creativecommons.org/licenses/by-nc/4.0/'));
 assert.ok(md.includes(`«GAIA — Beyond Knowledge, ${AUTHOR}, https://github.com/marzione00/Gaia_UNION, ${LICENCE.short}»`));
 // CC BY 4.0 remains only in the note on the versions published before.
 assert.deepEqual(md.split('\n').filter(l=>/CC BY 4\.0|licenses\/by\/4\.0/.test(l)).length,1);assert.ok(md.includes('Le versioni fino alla 1.61.0 sono state pubblicate con licenza Creative Commons Attribution 4.0 International (CC BY 4.0)'));
 const readme=read('README.md'),notices=read('THIRD_PARTY_NOTICES.md');
 assert.ok(readme.includes(`di ${AUTHOR}, sono distribuite con **${LICENCE.name} (${LICENCE.short})**`)&&!/CC BY 4\.0|licenses\/by\/4\.0/.test(readme));
 assert.ok(notices.includes(`distribuite con ${LICENCE.short};`)&&!/CC BY 4\.0;/.test(notices));
 const html=read('index.html');assert.ok(html.includes(`<meta name="author" content="${AUTHOR}">`)&&html.includes(`<link rel="license" href="${LICENCE.url}">`));
 for(const p of [...md.split('\n\n').slice(0,4),readme.slice(readme.indexOf('## Licenza')).split('\n\n')[1]])for(const r of STYLE)assert.ok(!r.test(p.replace(/GAIA — Beyond Knowledge/g,'GAIA')),p.slice(0,80));
});
test('pagina: la riga della barra in basso entra in ogni larghezza e la voce «Autore e licenza» apre le fonti',()=>{
 glyphs(CREDIT.long,'micro');glyphs(CREDIT.short,'micro');glyphs(LICENCE_ROW[0],'micro');glyphs(LICENCE_ROW[1],'body');glyphs('Leggi la licenza','mini');
 const lead='GAIA · Atlante scientifico';
 for(const w of [320,360,390,768,1024,1280,1920]){
  const both=width(lead,'micro')+width(CREDIT.long,'micro')+100<=w,credit=both?CREDIT.long:CREDIT.short,cx=both?w-26-width(credit,'micro'):26;
  assert.ok(cx>=26&&cx+width(credit,'micro')<=w-20,`${w}: ${credit}`);if(both)assert.ok(26+width(lead,'micro')+40<cx,'riga sovrapposta a '+w);
  if(w>=768)assert.ok(both,'forma lunga attesa a '+w);
 }
 assert.ok(LICENCE_ROW[1].includes(AUTHOR)&&LICENCE_ROW[1].includes(`${LICENCE.name} (${LICENCE.short})`)&&LICENCE_ROW[1].includes('fini non commerciali'));
 for(const r of STYLE)assert.ok(!r.test(LICENCE_ROW[1]),LICENCE_ROW[1]);
 const app=read('src/app.js');
 for(const t of ["import { AUTHOR, LICENCE, CREDIT, LICENCE_ROW } from './licenza.js';","id: 'credits'","action: () => route('sources')","function sourceRows() { return [LICENCE_ROW,","'source-licence', 'LEGGI LA LICENZA'","window.open(LICENCE.url, '_blank', 'noopener,noreferrer')","S.scene === 'sources' ? sourcesText()"])assert.ok(app.includes(t),t);
 // The site ships the licence files.
 assert.ok(read('scripts/build.mjs').includes("['LICENSE','LICENSE.md','THIRD_PARTY_NOTICES.md'"));
});
