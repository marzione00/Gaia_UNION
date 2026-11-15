/** Validate local references and rendering assets; optional HTTP smoke is separate. */
import {readFileSync,existsSync,readdirSync,statSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');const errors=[];let checks=0;
const verify=(name,condition)=>{checks++;if(!condition)errors.push(name)};
const json=f=>JSON.parse(readFileSync(resolve(root,f),'utf8'));
for(const m of json('content/catalogue.json').modules){for(const k of ['lesson','quiz'])if(m[k])verify(m[k],existsSync(resolve(root,m[k])));if(m.source){verify(m.id+' PDF source',m.source.pdfPages[0]>=1&&m.source.pdfPages.at(-1)<=769);}}
for(const doc of Object.values(json('assets/reader/index.json')))for(const [type,v] of Object.entries(doc.variants)){verify(doc.key+' '+type+' dimensions',v.width>0&&v.height>0);for(const tile of v.tiles)verify(tile.file,existsSync(resolve(root,tile.file))&&statSync(resolve(root,tile.file)).size>0);}
for(const p of json('assets/pdf/index.json'))verify(p.file,existsSync(resolve(root,p.file)));
for(const p of json('assets/planets/manifest.json'))verify(p.path,existsSync(resolve(root,p.path)));
const scan=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?scan(resolve(dir,e.name)):[resolve(dir,e.name)]);
for(const p of scan(resolve(root,'src')).filter(x=>x.endsWith('.js'))){const text=readFileSync(p,'utf8');for(const m of text.matchAll(/from\s+['"]([^'"]+)['"]/g))verify(p+' -> '+m[1],existsSync(resolve(dirname(p),m[1])));verify(p+' no eval',!text.includes('eval('));verify(p+' no Canvas2D',!/getContext\(['"]2d/.test(text));}
verify('No font binaries',!scan(root).some(x=>/\.(ttf|otf|woff2?|eot)$/i.test(x)));
const report={checks,passed:checks-errors.length,errors};writeFileSync(resolve(root,'docs/CHECK.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
