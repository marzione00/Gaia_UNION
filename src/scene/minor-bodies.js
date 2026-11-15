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
