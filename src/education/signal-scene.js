import {mul, perspective, lookAt, transform, sphereMesh, project, clamp} from '../renderer.js';
import {sampleSignal, signalValue, signalRange, parameterKey, OBSERVATIONS} from '../models/signal.js';
import {tubePath, mergeMeshes} from './geometry.js';
import {C} from '../ui/toolkit.js';

/** A measured graph plane built from real meshes. Depth has no scientific meaning. */
export class SignalScene {
    constructor(renderer) {this.R=renderer; this.key=''; this.ids=[]; this.labels=[];}
    mesh(id, data) {const key='mission-signal-'+id; this.R.makeMesh(key,data); if(!this.ids.includes(key))this.ids.push(key); return key;}
    rebuild(parameters, snapshotA) {
        const key=parameterKey(parameters)+'|'+(snapshotA?parameterKey(snapshotA.parameters):'');
        if(key===this.key)return;
        this.key=key;
        const top=Math.max(8,signalRange(parameters)[1],snapshotA?signalRange(snapshotA.parameters)[1]:0);
        this.yMax=Math.ceil(top/4)*4;
        this.position=(t,value,z=0)=>[t-5,-3+value/this.yMax*6,z];
        const lines=[];
        for(let t=0;t<=10;t+=2)lines.push(tubePath([this.position(t,0,-.08),this.position(t,this.yMax,-.08)],.012));
        for(let i=0;i<=4;i++)lines.push(tubePath([this.position(0,this.yMax*i/4,-.08),this.position(10,this.yMax*i/4,-.08)],.012));
        this.mesh('grid',mergeMeshes(lines));
        this.mesh('axes',mergeMeshes([tubePath([[-5,-3,0],[5.3,-3,0]],.04),tubePath([[-5,-3,0],[-5,3.3,0]],.04)]));
        this.mesh('curve',tubePath(sampleSignal(parameters).map(p=>this.position(p.t,p.value)),.04,8));
        if(snapshotA)this.mesh('a',tubePath(sampleSignal(snapshotA.parameters).map(p=>this.position(p.t,p.value,.08)),.024,6));
        if(!this.R.meshes.has('mission-signal-point'))this.mesh('point',sphereMesh(14,10));
        // The visible instrument frame is geometry, not a backing image.
        this.mesh('frame',mergeMeshes([
            tubePath([[-5.5,-3.5,-.5],[5.5,-3.5,-.5],[5.5,3.5,-.5],[-5.5,3.5,-.5],[-5.5,-3.5,-.5]],.055,8),
            tubePath([[-5.5,-3.5,-.5],[-5.5,-3.5,.4]],.07,8),
            tubePath([[5.5,-3.5,-.5],[5.5,-3.5,.4]],.07,8)
        ]));
    }
    draw(rect, parameters, snapshotA, time, state) {
        this.rect=rect;this.labels=[];
        if(rect.w<40||rect.h<60)return;
        this.rebuild(parameters,snapshotA);
        const R=this.R,g=R.gl,sx=R.sceneWidth/R.w,sy=R.sceneHeight/R.h;
        const viewport=[Math.round(rect.x*sx),Math.round((R.h-rect.y-rect.h)*sy),Math.round(rect.w*sx),Math.round(rect.h*sy)];
        const aspect=rect.w/rect.h,fov=.65,dist=Math.max(15,6.6/(Math.tan(fov/2)*aspect));
        const yaw=clamp(state.yaw*.6,-.85,.85),pitch=clamp(.10+(state.pitch-.45)*.35,-.25,.35);
        const eye=[Math.sin(yaw)*dist*Math.cos(pitch),Math.sin(pitch)*dist,Math.cos(yaw)*dist*Math.cos(pitch)];
        const vp=mul(perspective(fov,aspect,.1,160),lookAt(eye,[0,0,0]));
        g.viewport(...viewport);g.enable(g.SCISSOR_TEST);g.scissor(...viewport);g.depthMask(true);g.clear(g.DEPTH_BUFFER_BIT);g.enable(g.DEPTH_TEST);
        let triangles=0;
        const draw=(id,model,tint,emission=.15)=>{const name='mission-signal-'+id;R.drawMesh(name,vp,model,{eye,tint,emission});triangles+=(R.meshes.get(name)?.count||0)/3;};
        try {
            draw('grid',transform(),[.10,.24,.29,1],.12);
            draw('frame',transform(),[.16,.39,.44,1],.12);
            draw('axes',transform(),[.45,.64,.69,1],.25);
            if(snapshotA)draw('a',transform(),C.amber,.4);
            draw('curve',transform(),C.cyan,.45);
            for(const point of OBSERVATIONS)draw('point',transform(...this.position(point.t,point.value,.14),.09),C.lime,.3);
            draw('point',transform(...this.position(time,signalValue(parameters,time),.18),.14),C.pale,.5);
            for(let i=0;i<=4;i++)this.label(String(this.yMax*i/4),this.position(0,this.yMax*i/4),vp,rect,-22,-6);
            for(let t=0;t<=10;t+=2)this.label(String(t),this.position(t,0),vp,rect,0,12);
        } finally {g.disable(g.SCISSOR_TEST);g.viewport(0,0,R.sceneWidth,R.sceneHeight);}
        R.frameStats.missionTriangles=triangles;
    }
    label(text,point,vp,rect,dx,dy) {
        const p=project(point,vp,rect.w,rect.h),x=rect.x+p[0]+dx,y=rect.y+p[1]+dy;
        if(p[2]>0&&x>rect.x&&x<rect.x+rect.w&&y>rect.y&&y<rect.y+rect.h-12)this.labels.push({text,x,y});
    }
    drawLabels(U) {for(const p of this.labels)U.text(p.text,p.x,p.y,'micro',C.muted,{align:'center'});}
    contains(x,y) {const r=this.rect;return !!r&&x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;}
    dispose() {for(const id of this.ids)this.R.deleteMesh(id);this.ids=[];this.key='';}
}
