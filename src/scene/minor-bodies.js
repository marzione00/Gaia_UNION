import {seededRandom} from './systems.js';
// Geometry only. Asteroid surfaces use the existing NASA lunar map.
export function asteroidBelt(system,unitSphere){
 const rng=seededRandom(0x42454c54^system.id),verts=[],indices=[],count=280+Math.floor(rng()*180),inner=system.outerRadius+1.7;
 for(let j=0;j<count;j++){
  const a=rng()*Math.PI*2,d=inner+rng()*1.4,center=[Math.cos(a)*d,(rng()-.5)*.45,Math.sin(a)*d],size=.008+Math.pow(rng(),3)*.035,scale=[.7+rng()*.6,.6+rng()*.5,.8+rng()*.6],offset=verts.length/12;
  for(let k=0;k<unitSphere.v.length;k+=12){const v=unitSphere.v.slice(k,k+12);for(let c=0;c<3;c++)v[c]=center[c]+v[c]*size*scale[c];verts.push(...v);}
  for(const ix of unitSphere.i)indices.push(offset+ix);
 }
 return {v:new Float32Array(verts),i:new Uint32Array(indices),count,inner,outer:inner+1.4};
}
export function cometTail(head,length,width,bend=0){
 const axis=head.map(v=>v/Math.hypot(...head)),side=[axis[2],0,-axis[0]],v=[],ix=[];
 for(let j=0;j<=24;j++){
  const t=j/24,rad=width*(.06+Math.sin(t*Math.PI*.5));
  for(let k=0;k<=12;k++){
   const a=k/12*Math.PI*2,n=[side[0]*Math.cos(a),Math.sin(a),side[2]*Math.cos(a)];
   const pos=head.map((x,i)=>x+axis[i]*t*length+n[i]*rad+side[i]*bend*t*t);
   v.push(...pos,...n,k/12,t,1,1,1,1);
   if(j<24&&k<12){const p=j*13+k;ix.push(p,p+13,p+1,p+1,p+13,p+14);}
  }
 }
 return {v:new Float32Array(v),i:new Uint32Array(ix)};
}
/** Rocks of one ring of a belt (1.60.0): radii from 0.012 to 0.08 units, a thin layer thicker for wider belts. */
export function beltRing(belt,ring,unitSphere,count){
 const r=belt.rings[ring],rng=seededRandom(0x52494e47^(belt.seed*16+ring)),verts=[],indices=[],thick=.05+.08*(belt.outer-belt.inner);
 for(let j=0;j<count;j++){
  const a=rng()*Math.PI*2,d=r.inner+rng()*(r.outer-r.inner),center=[Math.cos(a)*d,(rng()-.5)*thick,Math.sin(a)*d],size=.012+Math.pow(rng(),3)*.068,scale=[.7+rng()*.6,.6+rng()*.5,.8+rng()*.6],offset=verts.length/12;
  for(let k=0;k<unitSphere.v.length;k+=12){const v=unitSphere.v.slice(k,k+12);for(let c=0;c<3;c++)v[c]=center[c]+v[c]*size*scale[c];verts.push(...v);}
  for(const ix of unitSphere.i)indices.push(offset+ix);
 }
 return {v:new Float32Array(verts),i:new Uint32Array(indices)};
}
/** Dust of a belt: a flat ring, brightest in the middle (the tail material fades with uv.y). */
export function dustBand(belt,segments=128){
 const v=[],ix=[],rows=[[belt.inner,1],[(belt.inner+belt.outer)/2,0],[belt.outer,1]];
 for(let j=0;j<=segments;j++){const a=j/segments*Math.PI*2;for(const [r,u] of rows)v.push(Math.cos(a)*r,0,Math.sin(a)*r,0,1,0,j/segments,u,1,1,1,1);}
 for(let j=0;j<segments;j++)for(let k=0;k<2;k++){const p=j*3+k;ix.push(p,p+3,p+1,p+1,p+3,p+4);}
 return {v:new Float32Array(v),i:new Uint32Array(ix)};
}
/** A comet tail of unit length along +z from the head at the origin, `width` wide at the end, bending
 * towards +x by `bend` (1.60.0); the scene orients and scales it. */
export function unitTail(width,bend=0){
 const v=[],ix=[];
 for(let j=0;j<=24;j++){
  const t=j/24,rad=width*(.06+Math.sin(t*Math.PI*.5));
  for(let k=0;k<=12;k++){
   const a=k/12*Math.PI*2,n=[Math.cos(a),Math.sin(a),0];
   v.push(n[0]*rad+bend*t*t,n[1]*rad,t,...n,k/12,t,1,1,1,1);
   if(j<24&&k<12){const p=j*13+k;ix.push(p,p+13,p+1,p+1,p+13,p+14);}
  }
 }
 return {v:new Float32Array(v),i:new Uint32Array(ix)};
}
