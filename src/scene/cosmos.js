// One deterministic, camera-independent 3D catalogue. No image/skybox assets.
import { seededRandom } from './systems.js';
export const COSMIC_FAMILIES = ['Formazione stellare','Nube a riflessione','Polveri interstellari','Ammasso aperto','Periferia galattica'];
export const COSMIC_QUALITY = {low:{scale:.4,steps:28},balanced:{scale:.55,steps:48},high:{scale:.7,steps:72}};
export const MAX_COSMIC_VOLUMES=15;
export function createCosmos(systems){
 const rng=seededRandom(0x434f534d),volumes=[],regions=[];
 const anchors=[0,7,13,20,5],colors=[[.72,.14,.23],[.13,.38,.83],[.46,.29,.13],[.22,.38,.57],[.33,.25,.48]];
 for(let i=0;i<5;i++){
  const s=systems[anchors[i]],a=i*1.8,center=s.position.map((x,k)=>x+[Math.cos(a)*3,-3.2,-7-Math.sin(a)*2][k]);
  const region={id:i,name:COSMIC_FAMILIES[i],center,color:colors[i],radius:i===4?5:7};regions.push(region);
  const axes=[region.radius,3.6+i*.25,5.4+i*.3],strength=[.68,.88,.65,.4,.24][i];
  volumes.push({id:'region-'+i,center,axes,color:colors[i],kind:i===2?1:0,strength,seed:13+i*9});
  volumes.push({id:'filament-'+i,center:center.map((v,k)=>v+[3,1,-3][k]),axes:[5.5,2.2,3.2],color:colors[i],kind:1,strength:.7,seed:57+i*11});
 }
 // Rare expanding shells; positions are persistent astronomical scenery.
 for(const [i,kind] of [[9,2],[18,3]]){
  const s=systems[i];volumes.push({id:'remnant-'+i,center:s.position.map((v,k)=>v+[2.7,1.6,-4.5][k]),axes:kind===2?[2.9,2.6,2.9]:[1.8,2.8,1.8],color:kind===2?[.14,.54,.66]:[.61,.25,.12],kind,strength:kind===2?.22:1.2,seed:i*2});
 }
 for(let i=0;i<3;i++)volumes.push({id:'distant-galaxy-'+i,center:[[80,33,-110],[-115,25,-60],[30,-35,125]][i],axes:[[13,2,10],[11,4,13],[9,2,12]][i],color:[.42,.45,.66],kind:4,strength:.9,seed:i*31});
 return {seed:0x434f534d,regions,volumes,systems:systems.map(s=>({id:s.id,region:regionAt(s.position,regions).id}))};
}
export function regionAt(position,regions){return regions.reduce((a,b)=>Math.hypot(...position.map((x,k)=>x-a.center[k]))<Math.hypot(...position.map((x,k)=>x-b.center[k]))?a:b);}
export function orderedVolumes(cosmos,eye){return [...cosmos.volumes].sort((a,b)=>Math.hypot(...b.center.map((v,k)=>v-eye[k]))-Math.hypot(...a.center.map((v,k)=>v-eye[k])));}
// Use existing slots in the million-point buffer, preserving all selectable stars.
export function enrichCosmicStars(points,cosmos,systems){
 const reserved=new Set(systems.map(s=>s.starIndex)),rng=seededRandom(0x53544152);
 for(let i=0;i<points.length/7;i++){
  if(reserved.has(i))continue;
  const j=i*7;
  if(i%83===0){const region=cosmos.regions[Math.floor(rng()*5)],r=Math.pow(rng(),2)*2.8,az=rng()*Math.PI*2,y=rng()*2-1,q=Math.sqrt(1-y*y);points.set([region.center[0]+Math.cos(az)*q*r,region.center[1]+y*r,region.center[2]+Math.sin(az)*q*r,.64+rng()*.3,.74+rng()*.25,1,.35+rng()*.75],j);}
  if(i%397===0){points[j+6]=1.6+rng()*1.8;const warm=rng()<.32;points[j+3]=warm?1:.7;points[j+4]=warm?.72:.84;points[j+5]=warm?.48:1;}
 }
 return points;
}
// Ray/ellipsoid interval is also used by tests to check front/behind extinction.
export function volumeInterval(eye,direction,volume,maxDistance=Infinity){
 const p=eye.map((v,k)=>(v-volume.center[k])/volume.axes[k]),d=direction.map((v,k)=>v/volume.axes[k]);
 const a=d.reduce((s,v)=>s+v*v,0),b=p.reduce((s,v,k)=>s+v*d[k],0),c=p.reduce((s,v)=>s+v*v,0)-1,disc=b*b-a*c;
 if(disc<=0)return null;const near=Math.max(0,(-b-Math.sqrt(disc))/a),far=Math.min(maxDistance,(-b+Math.sqrt(disc))/a);return far>near?[near,far]:null;
}
