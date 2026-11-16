import {mul,perspective,lookAt,transform,sphereMesh,project,clamp} from '../renderer.js';
import {descriptor,samples,value,parameterKey} from '../models/curriculum.js';
import {tubePath,mergeMeshes} from './geometry.js';
import {C,T,fmtNum,SUP} from '../ui/toolkit.js';
export function formatNumber(x){return fmtNum(x,4);}
export const SCHEMATIC_KINDS=new Set(['vector','rotation','phasor','triangle','orbit','cell','molecule','bond','chain','helix','population','planet','wave']);
/** Tick values on round steps (1, 2, 2,5 or 5 times a power of ten). With `outer` the range widens
 * to the nearest ticks; otherwise the ticks stay inside [lo, hi]. The step is the one that wastes
 * the least space while giving between 3 and 6 intervals. */
export function niceTicks(lo,hi,target=4,outer=false){
 const clean=v=>Number(v.toPrecision(12)),span=Math.abs(hi-lo)||1,top=Math.floor(Math.log10(span));let best=null;
 for(let e=top-2;e<=top+1;e++)for(const f of [1,2,2.5,5]){
  const step=f*10**e,a=outer?Math.floor(lo/step+1e-9)*step:Math.ceil(lo/step-1e-9)*step,b=outer?Math.ceil(hi/step-1e-9)*step:Math.floor(hi/step+1e-9)*step,n=Math.round((b-a)/step);
  if(n<(outer?3:2)||n>6)continue;
  const score=(outer?(b-a)/span-1:1-(b-a)/span)+.04*Math.abs(n-target)+(f===2.5?.05:0);
  if(!best||score<best.score-1e-12)best={score,step,a,b,n};
 }
 if(!best){const step=span/target;best={step,a:lo,b:hi,n:target};}
 const ticks=Array.from({length:best.n+1},(_,i)=>clean(best.a+i*best.step));
 return {step:clean(best.step),ticks,low:ticks[0],high:ticks.at(-1)};
}
/** Shared power of ten for axis labels when the ticks are very small or very large. */
export function tickScale(ticks){
 const top=Math.max(...ticks.map(Math.abs));if(!top)return 0;const e=Math.floor(Math.log10(top));
 return e<=-3||e>=4?e:0;
}
export function graphGeometry(id,p,other=null,aspect=5/3){
 const m=descriptor(id),current=samples(id,p),previous=other?samples(id,other):[],finite=[...current,...previous].filter(q=>q.y!==null).map(q=>q.y);
 let low=Math.min(0,...finite),high=Math.max(0,...finite);if(low===high){low-=1;high+=1;}
 const yt=niceTicks(low,high,4,true);low=yt.low;high=yt.high;
 const xt=niceTicks(m.domain[0],m.domain[1],4);
 const xExtent=3*aspect;
 const pos=(x,y,z=0)=>[-xExtent+2*xExtent*(x-m.domain[0])/(m.domain[1]-m.domain[0]),-3+6*(y-low)/(high-low),z];
 const strokes=points=>{
  const pieces=[];let part=[];const end=()=>{if(part.length>=2)pieces.push(tubePath(part,.045,6));part=[];};
  for(const q of points){if(q.y===null){end();continue;}if(m.discrete){if(q.y!==0)pieces.push(tubePath([pos(q.x,0),pos(q.x,q.y)],.029,6));}else part.push(pos(q.x,q.y));}end();
  return mergeMeshes(pieces);
 };
 const grid=[];for(const x of xt.ticks)grid.push(tubePath([pos(x,low,-.1),pos(x,high,-.1)],.017,5));for(const y of yt.ticks)grid.push(tubePath([pos(m.domain[0],y,-.1),pos(m.domain[1],y,-.1)],.017,5));
 const axes=mergeMeshes([tubePath([pos(m.domain[0],0),pos(m.domain[1],0)],.028,6),tubePath([pos(m.domain[0],low),pos(m.domain[0],high)],.028,6)]);
 const dotTemplate=sphereMesh(6,4),dots=m.discrete?current.filter(q=>q.y!==null).map(q=>{const center=pos(q.x,q.y,.025),v=new Float32Array(dotTemplate.v);for(let i=0;i<v.length;i+=12)for(let k=0;k<3;k++)v[i+k]=center[k]+.045*v[i+k];return {v,i:dotTemplate.i};}):[];
 return {current,previous,low,high,pos,xExtent,xTicks:xt.ticks,yTicks:yt.ticks,yScale:tickScale(yt.ticks),dots:mergeMeshes(dots),grid:mergeMeshes(grid),axes,curve:strokes(current),comparison:strokes(previous)};
}
/** The schematic is a declared illustration, separate from the quantitative graph. */
export function schematicGeometry(id,p,x){
 const m=descriptor(id),paths=[],points=[],kind=m.kind,add=(list,r=.045)=>paths.push(tubePath(list,r,8));
 const circle=(r,plane='xy')=>Array.from({length:97},(_,i)=>{const a=i*Math.PI/48;return plane==='xz'?[r*Math.cos(a),0,r*Math.sin(a)]:[r*Math.cos(a),r*Math.sin(a),0];});
 let caption='Schema geometrico, non in scala. Il valore esatto è riportato nei controlli.';
 if(kind==='triangle'){
  const scale=5/Math.max(x,p.a,1),b=x*scale,h=p.a*scale;add([[-b/2,-h/2,0],[b/2,-h/2,0],[-b/2,h/2,0],[-b/2,-h/2,0]]);add([[-b/2,-h/2,0],[-b/2,h/2,0]],.06);caption='Base e altezza del triangolo variano in proporzione; profondità solo visiva.';
 }else if(kind==='helix'){
  const one=[],two=[];for(let i=0;i<=96;i++){const a=i*Math.PI/12,y=-3+i/16;one.push([Math.cos(a),y,Math.sin(a)]);two.push([-Math.cos(a),y,-Math.sin(a)]);if(i%4===0)add([one.at(-1),two.at(-1)],.025);}add(one,.07);add(two,.07);caption='Doppia elica schematica: non simula replicazione, sequenza o dinamica molecolare. Quantità nel grafico.';
 }else if(kind==='bond'||kind==='molecule'){
  if(id==='chemistry-08'){const t=x*Math.PI/180,scale=2.8,angle=t/2;points.push({p:[0,0,0],r:.4,role:'center'});for(const sign of [-1,1]){const v=[sign*scale*Math.sin(angle),scale*Math.cos(angle),0];points.push({p:v,r:.22,role:'terminal'});add([[0,0,0],v],.08);}caption='Due legami uguali: l’angolo è il cursore, il grafico misura la distanza tra estremi. Lunghezza normalizzata.';}
  else {const d=1+4*(x-m.domain[0])/(m.domain[1]-m.domain[0]);points.push({p:[-d/2,0,0],r:.45},{p:[d/2,0,0],r:.35});add([[-d/2,0,0],[d/2,0,0]],.05);caption=id==='biology-04'?'Enzima e substrato sono simboli schematici: nessuna collisione simulata. La cinetica è nel grafico.':'Centri e distanza schematici: il collegamento non è una traiettoria né una simulazione elettronica.';}
 }else if(kind==='chain'){
  const n=Math.min(24,Math.max(2,Math.round(x)));for(let i=0;i<n;i++){const v=[(i/(n-1)-.5)*8,(i%2-.5)*.65,0];points.push({p:v,r:.12});if(i)add([points[i-1].p,v],.045);}caption='Catena simbolica fino a 24 nodi: non ricostruisce una conformazione atomistica. Conteggi esatti nel grafico.';
 }else if(kind==='cell'||kind==='planet'){
  const t=(x-m.domain[0])/(m.domain[1]-m.domain[0]),r=kind==='planet'?2:1+1.7*t;points.push({p:[0,0,0],r});add(circle(r+.05,'xz'),.035);add(circle(r+.05),.035);caption=kind==='planet'?'Sfera illustrativa. Temperatura radiativa calcolata: non simula il clima né una biosfera spaziale.':'Sfera ideale per il modello; raggio visuale normalizzato, non fotografia né cellula anatomica.';
 }else if(kind==='population'){
  const ys=samples(id,p).filter(q=>q.y!==null),v=value(id,x,p),max=Math.max(...ys.map(q=>Math.abs(q.y)),1e-20),n=v===null?0:Math.max(0,Math.min(64,Math.round(64*Math.abs(v)/max)));
  for(let i=0;i<n;i++)points.push({p:[((i%8)-3.5)*.6,(Math.floor(i/8)-3.5)*.6,(i%3-1)*.3],r:.15});caption='Marcatori proporzionali al modulo del risultato (massimo 64), non individui o dati osservati. Segno e unità nel grafico.';
 }else if(kind==='orbit'){
  const r=1.1+1.8*(x-m.domain[0])/(m.domain[1]-m.domain[0]);add(circle(r,'xz'));points.push({p:[0,0,0],r:.35},{p:[r,0,0],r:.19});add([[0,0,0],[r,0,0]],.025);caption='Distanza radiale normalizzata; l’anello è un riferimento geometrico, non un’orbita integrata nel tempo.';
 }else if(kind==='rotation'||kind==='phasor'){
  const angle=id==='math-p03'?x*p.b:id==='math-c09'?x+p.b:x;
  let vx=Math.cos(angle),vy=Math.sin(angle);
  if(id==='math-p06'){vx=p.a*Math.cos(x)-p.b*Math.sin(x);vy=p.a*Math.sin(x)+p.b*Math.cos(x);}
  const norm=Math.max(Math.hypot(vx,vy),1e-15);add(circle(2.7));add([[0,0,0],[2.7*vx/norm,2.7*vy/norm,0]],.065);points.push({p:[2.7*vx/norm,2.7*vy/norm,0],r:.13});caption='Direzione angolare; raggio normalizzato. Ampiezza, forza e proiezioni esatte sono nel grafico.';
 }else if(kind==='vector'){
  let vx=x,vy=p.a;if(id==='math-c07'){vx=x-p.a;vy=p.b;}if(id==='math-p02'){vx=p.a**x;vy=p.b**x;}if(['physics-06','physics-09'].includes(id)){vx=value(id,x,p)||0;vy=0;}
  const sc=3/Math.max(Math.hypot(vx,vy),1e-15),end=[vx*sc,vy*sc,0];add([[0,0,0],end],.07);add([[0,0,0],[end[0],0,0],end],.025);points.push({p:end,r:.13});caption='Componenti e risultante con lunghezza normalizzata: confronta il valore numerico, non la dimensione sullo schermo.';
 }else if(kind==='wave'){
  const g=graphGeometry(id,p);add(g.current.filter(q=>q.y!==null).map(q=>g.pos(q.x,q.y)),.055);caption='Profilo calcolato in un piano 3D. La profondità non è una seconda oscillazione né un mezzo fisico.';
 }
 const geometry=mergeMeshes(paths),lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
 for(let i=0;i<geometry.v.length;i+=12)for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],geometry.v[i+k]);hi[k]=Math.max(hi[k],geometry.v[i+k]);}
 for(const pt of points)for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],pt.p[k]-pt.r);hi[k]=Math.max(hi[k],pt.p[k]+pt.r);}
 const center=lo.map((v,k)=>Number.isFinite(v)?(v+hi[k])/2:0),half=lo.map((v,k)=>Number.isFinite(v)?Math.max(.2,(hi[k]-v)/2):1);
 return {mesh:geometry,points,caption,center,half};
}
export class CourseScene{
 constructor(R){this.R=R;this.key='';this.ids=[];this.labels=[];this.rect=null;this.mode='graph';}
 mesh(id,data){const key='course-'+id;this.R.makeMesh(key,data);if(!this.ids.includes(key))this.ids.push(key);return key;}
 rebuild(id,p,A,x,mode,aspect){
  const key=[parameterKey(id,p),A?parameterKey(id,A):'',mode,mode==='schema'?x:'',aspect.toFixed(4)].join('|');if(key===this.key)return;
  this.key=key;this.graph=graphGeometry(id,p,A,aspect);const g=this.graph;
  this.mesh('grid',g.grid);this.mesh('axes',g.axes);this.mesh('dots',g.dots);this.mesh('current',g.curve);this.mesh('comparison',g.comparison);
  this.mesh('point',sphereMesh(16,12));
  if(mode==='schema'){this.schematic=schematicGeometry(id,p,x);this.mesh('schematic',this.schematic.mesh);}
 }
 draw(rect,id,p,A,x,state,mode='graph'){
  this.rect=rect;this.labels=[];if(rect.w<50||rect.h<60)return;
  this.rebuild(id,p,A,x,mode,rect.w/rect.h);const R=this.R,gl=R.gl,sx=R.sceneWidth/R.w,sy=R.sceneHeight/R.h;
  const vpRect=[Math.round(rect.x*sx),Math.round((R.h-rect.y-rect.h)*sy),Math.round(rect.w*sx),Math.round(rect.h*sy)];
  const aspect=rect.w/rect.h,fov=.7,yaw=clamp(state.yaw*.6,-1,1),pitch=clamp(.13+(state.pitch-.45)*.35,-.4,.5),half=this.schematic?.half||[5,3,1],center=mode==='schema'?this.schematic.center:[0,0,0];
  const dist=mode==='schema'?Math.max(3,1.45*Math.max(half[1]/Math.tan(fov/2),half[0]/(Math.tan(fov/2)*aspect))+half[2]+half[0]*Math.abs(Math.sin(yaw))):11.2+this.graph.xExtent*Math.abs(Math.sin(yaw));
  const eye=[Math.sin(yaw)*dist*Math.cos(pitch),Math.sin(pitch)*dist,Math.cos(yaw)*dist*Math.cos(pitch)].map((v,i)=>v+center[i]),vp=mul(perspective(fov,aspect,.1,200),lookAt(eye,center));
  gl.viewport(...vpRect);gl.enable(gl.SCISSOR_TEST);gl.scissor(...vpRect);gl.depthMask(true);if(gl.clearColor){gl.clearColor(.035,.06,.11,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.clearColor(.004,.012,.024,1);}else gl.clear(gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);
  let triangles=0;const draw=(id,tr,tint,emission=.3)=>{const name='course-'+id;if(!R.meshes.get(name)?.count)return;R.drawMesh(name,vp,tr,{eye,tint,emission});triangles+=R.meshes.get(name).count/3;};
  try{
   if(mode==='schema'){
    draw('schematic',transform(),C.cyan);for(const [i,pt] of this.schematic.points.entries())draw('point',transform(...pt.p,pt.r),pt.role==='terminal'?C.amber:pt.role==='center'?C.cyan:i%2?C.amber:C.cyan,.18);
   }else{
    draw('grid',transform(),[.1,.25,.3,1],.1);draw('axes',transform(),[.45,.6,.7,1]);
    if(A)draw('comparison',transform(0,0,-.05),C.amber);draw('current',transform(),C.cyan);draw('dots',transform(),C.cyan);
    const y=value(id,x,p);if(y!==null)draw('point',transform(...this.graph.pos(x,y,.12),.11),C.pale,.5);
    const m=descriptor(id),g=this.graph,k=10**g.yScale;
    for(const xx of g.xTicks)this.label(formatNumber(xx),g.pos(xx,g.low),vp,rect,0,10,'center');
    for(const yy of g.yTicks)this.label(formatNumber(Number((yy/k).toPrecision(6))),g.pos(m.domain[0],yy),vp,rect,-10,-8,'right');
    if(g.yScale){const top=project(g.pos(m.domain[0],g.high),vp,rect.w,rect.h);if(top[2]>0)this.labels.push({text:'× 10'+String(g.yScale).split('').map(c=>SUP[c]).join(''),x:Math.max(rect.x+10,rect.x+top[0]-10),y:Math.max(rect.y+4,rect.y+top[1]-26),align:'left'});}
   }
  }finally{gl.disable(gl.SCISSOR_TEST);gl.viewport(0,0,R.sceneWidth,R.sceneHeight);}
  R.frameStats.courseTriangles=triangles;R.frameStats.courseModel=id;
 }
 label(text,point,vp,r,dx,dy,align='center'){const p=project(point,vp,r.w,r.h),x=r.x+p[0]+dx,y=r.y+p[1]+dy;if(p[2]>0&&x>r.x+8&&x<r.x+r.w-8&&y>r.y&&y<r.y+r.h-14)this.labels.push({text,x,y,align});}
 drawLabels(U){for(const p of this.labels)U.text(p.text,p.x,p.y,'micro',C.muted,{align:p.align||'center'});}
 contains(x,y){const r=this.rect;return !!r&&x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;}
 dispose(){for(const id of this.ids)this.R.deleteMesh(id);this.ids=[];this.key='';this.rect=null;}
}
