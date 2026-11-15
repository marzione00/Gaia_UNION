import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {planetProfile,PlanetTextures} from '../src/scene/assets.js';
const root=new URL('../',import.meta.url),manifest=JSON.parse(fs.readFileSync(new URL('assets/planets/manifest.json',root)));
test('Texture: le cento destinazioni usano mappe NASA con dettaglio almeno 4K nativo',()=>{
 for(let i=0;i<100;i++){const p=planetProfile(i),m=manifest.find(m=>m.id===p.texture);assert.ok(m);assert.ok(m.source.includes('NASA'));assert.ok(m.levels.at(-1).width>=4096);assert.ok(m.source_dimensions[0]>=m.levels.at(-1).width);}
 assert.ok(manifest.every(m=>m.url.startsWith('https://')&&new URL(m.url).hostname.endsWith('nasa.gov')));
});
test('Texture: ogni PNG e buffer UV mantiene hash e dimensioni dichiarate',()=>{
 for(const m of manifest){for(const l of m.levels){const b=fs.readFileSync(new URL(l.path,root));assert.equal(createHash('sha256').update(b).digest('hex'),l.sha256);assert.equal(b.readUInt32BE(16),l.width);assert.equal(b.readUInt32BE(20),l.height);}
  if(m.mesh){const v=fs.readFileSync(new URL(m.mesh.vertices,root)),i=fs.readFileSync(new URL(m.mesh.indices,root));assert.equal(v.length,m.mesh.vertexCount*48);assert.equal(i.length,m.mesh.indexCount*4);assert.equal(createHash('sha256').update(v).digest('hex'),m.mesh.vertex_sha256);assert.equal(createHash('sha256').update(i).digest('hex'),m.mesh.index_sha256);}
 }
});
test('Texture: il dettaglio rispetta il limite GPU e libera le risorse precedenti',async()=>{
 const calls=[],deleted=[],gpu={gl:{MAX_TEXTURE_SIZE:1,getParameter:()=>4096,deleteTexture:t=>deleted.push(t)},uploadTexture:img=>img};
 const data=['a','b','c'].map(id=>({id,path:id+'-2k',levels:[{path:id+'-2k',width:2048,height:1024},{path:id+'-4k',width:4096,height:2048},{path:id+'-8k',width:8192,height:4096}]}));
 const cache=new PlanetTextures(gpu,data,{a:'a-base',b:'b-base',c:'c-base'},async p=>{calls.push(p);return p});
 for(const id of ['a','b','c']){assert.equal(cache.get(id,true),id+'-base');await new Promise(r=>setImmediate(r));assert.equal(cache.get(id,true),id+'-4k');}
 assert.deepEqual(calls,['a-4k','b-4k','c-4k']);assert.deepEqual(deleted,['a-4k']);assert.equal(cache.high.size,2);
});
test('Texture: fallimenti HD conservano la mappa esterna di base senza cicli di retry',async()=>{
 let requests=0;const cache=new PlanetTextures({gl:{MAX_TEXTURE_SIZE:1,getParameter:()=>8192}},[{id:'a',path:'base',levels:[{path:'hi',width:8192,height:4096}]}],{a:'original-map'},async()=>{requests++;throw Error('missing')});
 assert.equal(cache.get('a',true),'original-map');await new Promise(r=>setImmediate(r));assert.equal(cache.get('a',true),'original-map');assert.equal(requests,1);assert.equal(cache.errors.length,1);
});
