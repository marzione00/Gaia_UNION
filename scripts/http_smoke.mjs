import {spawn} from 'node:child_process';import {readFile,writeFile} from 'node:fs/promises';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url)),port=Number(process.env.GAIA_TEST_PORT||8099);
const server=spawn(process.execPath,['scripts/serve.mjs','--dist'],{cwd:root,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
const sha=b=>createHash('sha256').update(b).digest('hex');const results=[];
try{
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Server startup timeout')),8000);server.stdout.once('data',()=>{clearTimeout(timer);resolve()});server.once('error',e=>{clearTimeout(timer);reject(e)});server.once('exit',code=>{if(code){clearTimeout(timer);reject(Error('Server exited '+code))}})});
 for(const path of ['index.html','src/app.js','src/scene/shaders.js','src/scene/assets.js','src/scene/systems.js','src/scene/cosmos.js','src/scene/cosmic-shader.js','src/scene/minor-bodies.js','src/scene/planet-types.js','assets/planets/manifest.json','assets/planets/earth-8192.png','src/scene/navigation.js','assets/scenes/manifest.json','assets/scenes/simbiosi/terrain-0.f32','assets/scenes/simbiosi/terrain-0.u32','assets/reader/index.json','assets/pdf/index.json','assets/glyph-atlas.png','materials/matematica-di-base.pdf']){
  const response=await fetch(`http://127.0.0.1:${port}/${path}`),bytes=Buffer.from(await response.arrayBuffer());assert.equal(response.status,200);assert.equal(sha(bytes),sha(await readFile(root+'dist/'+path)));results.push({path,status:response.status,bytes:bytes.length,type:response.headers.get('content-type')});
 }
 const missing=await fetch(`http://127.0.0.1:${port}/missing-resource.json`);assert.equal(missing.status,404);results.push({path:'missing-resource.json',status:404});
 await writeFile(root+'docs/HTTP_SMOKE.json',JSON.stringify({version:'1.4.0',passed:results.length,checks:results},null,2));console.log('HTTP distribution checks:',results.length);
}finally{server.kill();}
