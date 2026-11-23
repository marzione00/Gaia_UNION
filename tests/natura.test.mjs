import test from 'node:test';import assert from 'node:assert/strict';
import {planetSpecies,planetSurface} from '../src/worlds/surface.js';
import {bodyMesh} from '../src/worlds/bodyplan.js';
import {nativeMesh,nativeLegs} from '../src/worlds/people.js';
import {buildingMesh} from '../src/worlds/buildings.js';
import {Shape,curve,profile} from '../src/worlds/organic.js';
const all=planetSpecies().flat();
const bounds=(m,st=12)=>{const b={x0:1e9,x1:-1e9,y0:1e9,y1:-1e9,z0:1e9,z1:-1e9};for(let i=0;i<m.v.length;i+=st){b.x0=Math.min(b.x0,m.v[i]);b.x1=Math.max(b.x1,m.v[i]);b.y0=Math.min(b.y0,m.v[i+1]);b.y1=Math.max(b.y1,m.v[i+1]);b.z0=Math.min(b.z0,m.v[i+2]);b.z1=Math.max(b.z1,m.v[i+2]);}return b;};
const WALKERS=['pascolatore','cacciatore','bipede','saltatore','esapode','ottopode'];

test('natura: superfici lisce con normali unitarie, curve e profili',()=>{
 const S=new Shape(0);S.tube(curve([[0,0,0],[1,.5,0],[2,0,0]],4),t=>[.2+.1*t,.15],8,[1,1,1,1],{capStart:true});S.ellipsoid([0,1,0],[.5,.3,.4],10,6,[1,0,0,1]);S.ribbon(curve([[0,0,0],[0,1,0]],3),.1,[1,0,0],[0,1,0,1],{fold:.3});
 const m=S.mesh();assert.equal(m.stride,12);assert.ok(m.v.every(Number.isFinite));const nv=m.v.length/12;assert.ok(m.i.every(x=>x<nv));
 for(let i=0;i<m.v.length;i+=12)assert.ok(Math.abs(Math.hypot(m.v[i+3],m.v[i+4],m.v[i+5])-1)<1e-6);
 // The light level keeps the shape with fewer points.
 const L=new Shape(1);L.tube(curve([[0,0,0],[1,.5,0],[2,0,0]],4),.2,8,[1,1,1,1]);assert.ok(L.mesh().i.length<new Shape(0).tube(curve([[0,0,0],[1,.5,0],[2,0,0]],4),.2,8,[1,1,1,1]).mesh().i.length);
 const p=profile([[0,1],[.5,3],[1,2]]);assert.equal(p(0),1);assert.equal(p(.5),3);assert.equal(p(1),2);assert.ok(p(.25)>1&&p(.25)<3);
});

test('natura: animali sul terreno, zampe sotto il corpo, ali lungo z, alberi con rami',()=>{
 for(const s of all.filter((_,k)=>k%3===0)){const m=bodyMesh(s.plan,0),b=bounds(m);
  if(WALKERS.includes(s.form))assert.ok(b.y0>-.03&&b.y0<.06,`${s.form} ${b.y0}`);
  // Quadrupeds and bipeds face +x: the head is the front of the body.
  if(['pascolatore','cacciatore','bipede'].includes(s.form))assert.ok(b.x1>Math.abs(b.x0)*.6,s.form);
  if(s.form==='volatore')assert.ok(Math.max(Math.abs(b.z0),b.z1)>.5);
  if(s.form==='albero'){let dark=0;for(let i=0;i<m.v.length;i+=12)if(m.v[i+1]>s.plan.height*.5&&Math.abs(m.v[i+8]-s.plan.dark[0])<1e-6&&Math.abs(m.v[i+9]-s.plan.dark[1])<1e-6)dark++;assert.ok(dark>0,'rami '+s.plan.crown);}
 }
 // Under the light level the shapes keep their size.
 for(const s of all.filter((_,k)=>k%41===0)){const a=bounds(bodyMesh(s.plan,0)),b=bounds(bodyMesh(s.plan,1));assert.ok(Math.abs((a.y1-a.y0)-(b.y1-b.y0))<.35*(a.y1-a.y0)+.05,s.form);}
});

test('natura: popoli nativi digitigradi, alti quanto il piano, villaggi entro la loro impronta',()=>{
 let villages=0;
 for(const i of [1,7,11,40,77]){const v=planetSurface(i).settlements.find(t=>t.kind==='villaggio');if(!v)continue;villages++;const f=v.figures[0],m=nativeMesh(f,0),l=nativeMesh(f,1),b=bounds(m);
  assert.equal(m.stride,12);assert.ok(l.i.length<m.i.length);assert.ok(b.y0>-.03&&b.y0<.03);
  // The top of the head is at the height of the plan; crests and ears may rise a little above it.
  assert.ok(b.y1>f.height*.95&&b.y1<f.height*1.12,`${i} ${b.y1} ${f.height}`);assert.ok(nativeLegs(f)<f.height*.46+1e-9);
  // Digitigrade: the heel is raised, so no vertex of the feet lies on the ground behind the ankle.
  let heel=0;for(let j=0;j<m.v.length;j+=12)if(m.v[j+1]<.03&&m.v[j]<-.02)heel++;assert.equal(heel,0,`${i} talloni`);
  for(const sp of Object.values(v.types)){const a=buildingMesh(sp,0),c=buildingMesh(sp,1);assert.ok(c.i.length<a.i.length,sp.type);let r=0,h=0;for(let j=0;j<a.v.length;j+=16)if(a.v[j+1]>-.05){r=Math.max(r,Math.hypot(a.v[j],a.v[j+2]));h=Math.max(h,a.v[j+1]);}assert.ok(r<=sp.radius+.05&&h<=sp.height+.05,`${sp.type} ${r} ${h}`);}
 }
 assert.ok(villages>=3);
});
