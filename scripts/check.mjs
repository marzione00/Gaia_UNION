import {checkCurriculum} from './check-curriculum.mjs';
import {checkMissions} from './check-missions.mjs';
import {DOCUMENTS,docOf} from '../src/documents.js';
/** Validate local references and rendering assets; optional HTTP smoke is separate. */
import {readFileSync,existsSync,readdirSync,statSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');const errors=[];let checks=0;
const verify=(name,condition)=>{checks++;if(!condition)errors.push(name)};
const json=f=>JSON.parse(readFileSync(resolve(root,f),'utf8'));
for(const m of json('content/catalogue.json').modules){for(const k of ['lesson','quiz'])if(m[k])verify(m[k],existsSync(resolve(root,m[k])));if(m.source){const d=DOCUMENTS[docOf(m.source)];verify(m.id+' PDF source',m.source.file===d.file&&existsSync(resolve(root,d.file))&&m.source.pdfPages[0]>=1&&m.source.pdfPages[0]<=m.source.pdfPages.at(-1)&&m.source.pdfPages.at(-1)<=d.pages);}}
for(const doc of Object.values(json('assets/reader/index.json')))for(const [type,v] of Object.entries(doc.variants)){verify(doc.key+' '+type+' dimensions',v.width>0&&v.height>0);for(const tile of v.tiles)verify(tile.file,existsSync(resolve(root,tile.file))&&statSync(resolve(root,tile.file)).size>0);}
{const g=json('content/worlds/genomes.json');verify('genomes: 100 carte d’identità',g.planets.length===100&&g.planets.every((p,i)=>p.index===i));}
{const w=json('content/worlds/catalogue.json'),ids=json('content/catalogue.json').modules.map(m=>m.id);verify('worlds: 100 fenomeni',w.worlds.length===100&&w.worlds.every((x,i)=>x.unit===ids[i]));for(const x of w.worlds)verify('world '+x.unit+' kit',x.kits.every(k=>k in w.kits));}
for(const d of Object.values(DOCUMENTS)){const pages=json(d.index);verify(d.index+' pagine',pages.length===d.pages);for(const p of pages)verify(p.file,existsSync(resolve(root,p.file)));}
for(const p of json('assets/planets/manifest.json'))verify(p.path,existsSync(resolve(root,p.path)));
const scan=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?scan(resolve(dir,e.name)):[resolve(dir,e.name)]);
for(const p of scan(resolve(root,'src')).filter(x=>x.endsWith('.js'))){const text=readFileSync(p,'utf8');for(const m of text.matchAll(/from\s+['"]([^'"]+)['"]/g))verify(p+' -> '+m[1],existsSync(resolve(dirname(p),m[1])));verify(p+' no eval',!text.includes('eval('));verify(p+' no Canvas2D',!/getContext\(['"]2d/.test(text));}
verify('No font binaries',!scan(root).some(x=>/\.(ttf|otf|woff2?|eot)$/i.test(x)));
const missionChecks=checkMissions(root);checks+=missionChecks.checks;errors.push(...missionChecks.errors);
const curriculumChecks=checkCurriculum(root);checks+=curriculumChecks.checks;errors.push(...curriculumChecks.errors);
const report={checks,passed:checks-errors.length,errors};writeFileSync(resolve(root,'docs/CHECK.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
