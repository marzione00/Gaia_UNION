/** Static, offline runtime distribution. It does not redownload assets. */
import { cp, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dest=resolve(root,'dist');
await rm(dest,{recursive:true,force:true});await mkdir(dest,{recursive:true});
for(const item of ['index.html','src','content','assets','materials','vendor/mathjax'])await cp(resolve(root,item),resolve(dest,item),{recursive:true});
// Ship the project's license and the notices for the assets it displays.
for(const item of ['LICENSE','LICENSE.md','THIRD_PARTY_NOTICES.md','docs/licenses','docs/SCIENTIFIC_MODEL.md','docs/CURRICULUM.md','docs/CURRICULUM_COVERAGE.csv','docs/CURRICULUM_COVERAGE.md','docs/CURRICULUM_STATS.json','docs/CURRICULUM_QA.json','sources/nasa/LEGGIMI.md','sources/nasa/sources.json','sources/nasa/mars-tiles.json','vendor/mathjax/LICENSE']){
    await mkdir(dirname(resolve(dest,item)),{recursive:true});
    await cp(resolve(root,item),resolve(dest,item),{recursive:true});
}
await writeFile(resolve(dest,'.nojekyll'),'');
const metadata=JSON.parse(await readFile(resolve(root,'package.json'),'utf8'));
await writeFile(resolve(dest,'build-info.json'),JSON.stringify({version:metadata.version,commit:process.env.GITHUB_SHA||'local',features:['atlas-navigation','curriculum-recovery']},null,2)+'\n');
console.log('Distribuzione generata in dist/ (risorse già incluse, nessun download).');
