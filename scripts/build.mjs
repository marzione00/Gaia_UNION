/** Static, offline runtime distribution. It does not redownload assets. */
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dest=resolve(root,'dist');
await rm(dest,{recursive:true,force:true});await mkdir(dest,{recursive:true});
for(const item of ['index.html','src','content','assets','materials'])await cp(resolve(root,item),resolve(dest,item),{recursive:true});
await writeFile(resolve(dest,'.nojekyll'),'');
console.log('Distribuzione generata in dist/ (risorse già incluse, nessun download).');
