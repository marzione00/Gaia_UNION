import test from 'node:test';import assert from 'node:assert/strict';
import {planetGenomes} from '../src/worlds/surface.js';
import {orbitMap,sphereTerrain,texelDirection} from '../src/worlds/orbit-texture.js';
import {sphereMesh} from '../src/renderer.js';
const genomes=planetGenomes();

test('Mappe d’orbita: direzione dei texel coerente con le coordinate UV della sfera',()=>{
 const m=sphereMesh(16,8);
 for(let k=0;k<m.v.length;k+=12){const u=m.v[k+6],v=m.v[k+7];if(v<=0||v>=1)continue;
  // Inverse of texelDirection at the vertex UV (texel centres are at (i + .5) / w).
  const w=1600,h=800,d=texelDirection(u*w-.5,v*h-.5,w,h);assert.ok(Math.hypot(d[0]-m.v[k],d[1]-m.v[k+1],d[2]-m.v[k+2])<1e-6);}
});
test('Mappe d’orbita: mare con la frazione della carta, alfa solo sul mare, nessuna cucitura',()=>{
 for(const index of [0,7,20,44,69,80,99]){
  const g=genomes[index],w=192,h=96,m=orbitMap(g,w,h);m.step();
  let sea=0,area=0;
  for(let j=0;j<h;j++){const a=Math.sin((j+.5)/h*Math.PI);for(let i=0;i<w;i++){const al=m.pixels[(j*w+i)*4+3];assert.ok(al===0||al===255);area+=a;if(al===0)sea+=a;}}
  assert.ok(Math.abs(sea/area-g.terrain.seaLevel)<.05,index+': '+(sea/area).toFixed(3)+' vs '+g.terrain.seaLevel);
  // The date line is no rougher than any other pair of neighbouring columns.
  const col=(i,j)=>[0,1,2].map(c=>m.pixels[(j*w+i)*4+c]),diff=(a,b)=>{let s=0;for(let j=0;j<h;j++){const x=col(a,j),y=col(b,j);s+=Math.abs(x[0]-y[0])+Math.abs(x[1]-y[1])+Math.abs(x[2]-y[2]);}return s;};
  const seam=diff(w-1,0),inner=Array.from({length:w-1},(_,i)=>diff(i,i+1)).sort((a,b)=>a-b);assert.ok(seam<=inner.at(-1));
 }
});
test('Mappe d’orbita: generazione a passi uguale a quella in un colpo, deterministica',()=>{
 const g=genomes[36],a=orbitMap(g,96,48),b=orbitMap(g,96,48);a.step();let n=0;while(!b.step(.01))n++;
 assert.ok(n>0);assert.ok(b.done);assert.deepEqual(Array.from(a.pixels),Array.from(b.pixels));
 const t=sphereTerrain(g);assert.equal(t.height([0,1,0]),sphereTerrain(g).height([0,1,0]));
});
