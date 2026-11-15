/** Camera-facing solid 3D hexagons, conceptual routes and a geometric compass. */
import { transform, project, mul, perspective, lookAt } from '../renderer.js';
import { tubePath, mergeMeshes } from '../education/geometry.js';
import { contains, edgeIndicator, routeSystems } from './atlas-model.js';
const norm=v=>{const l=Math.hypot(...v)||1;return v.map(n=>n/l);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export function billboard(position, eye, target, scale) {
    const z=norm(eye.map((v,i)=>v-target[i])),x=norm(cross([0,1,0],z)),y=cross(z,x);
    return new Float32Array([...x.map(v=>v*scale),0,...y.map(v=>v*scale),0,...z.map(v=>v*scale),0,...position,1]);
}
export function hexGeometry() {
    const p=Array.from({length:7},(_,i)=>[Math.cos(Math.PI/6+i*Math.PI/3),Math.sin(Math.PI/6+i*Math.PI/3),0]);
    return tubePath(p,.035,6);
}
export function routeGeometry(ids, systems) {
    const parts=[];
    for(let i=1;i<ids.length;i++){
        const a=systems[ids[i-1]]?.position,b=systems[ids[i]]?.position;if(!a||!b||ids[i]===ids[i-1])continue;
        const points=Array.from({length:17},(_,j)=>{const t=j/16;return a.map((v,k)=>v+(b[k]-v)*t+(k===1?Math.sin(Math.PI*t)*1.5:0));});
        parts.push(tubePath(points,.045,5));
    }
    return mergeMeshes(parts);
}
export class AtlasScene {
    constructor(R){this.R=R;this.ready=false;this.routeKey='';this.edge=null;this.drawn=0;}
    init(){if(this.ready)return;const R=this.R;R.makeMesh('atlas-hex',hexGeometry());
        R.makeMesh('atlas-arrow',tubePath([[-.5,-.6,0],[.6,0,0],[-.5,.6,0]],.1,6));
        for(const [i,end] of [[0,[1,0,0]],[1,[0,1,0]],[2,[0,0,1]]])R.makeMesh('atlas-axis-'+i,tubePath([[0,0,0],end],.045,6));
        R.makeMesh('atlas-compass-ring',tubePath(Array.from({length:49},(_,i)=>[Math.cos(i*Math.PI/24)*1.15,0,Math.sin(i*Math.PI/24)*1.15]),.02,5));this.ready=true;
    }
    draw(world,state,layout,{selected,hover,contrast,path,modules,labels=true}){
        const R=this.R;this.drawn=0;this.edge=null;if(state.scene!=='galaxy'||world.cameraProgress<1)return;
        this.init();
        const ids=routeSystems(path,modules),key=ids.join(',');
        if(key!==this.routeKey){R.deleteMesh('atlas-route');if(ids.length>1)R.makeMesh('atlas-route',routeGeometry(ids,world.systems));this.routeKey=key;}
        if(ids.length>1)R.drawMesh('atlas-route',world.vp,transform(),{eye:world.eye,tint:[.85,.68,.4,1],emission:.65,opacity:.7});
        const selectedIds=new Set(ids),radius=layout.compact?23:19;
        for(const point of world.projections){if(point.type!=='system'||point.depth<=0)continue;
            point.r=24; // 48 CSS px hit diameter, kept consistent with the visible marker.
            if(!contains(layout.map,point.x,point.y))continue;
            const active=point.index===selected,highlighted=point.index===hover,visibleRadius=active||highlighted?radius+3:radius;
            const scale=2*point.depth*Math.tan(world.fov/2)*visibleRadius/R.h;
            const onPath=!path||selectedIds.has(point.index),tint=active?[1,.84,.45,1]:highlighted?[.8,1,.72,1]:onPath?[.35,.88,.88,1]:[.48,.64,.67,1];
            R.drawMesh('atlas-hex',world.vp,billboard(world.systems[point.index].position,world.eye,world.target,scale),{eye:world.eye,tint,emission:contrast?1.2:.7,opacity:onPath||active?1:.65});
            if(active)R.drawMesh('atlas-hex',world.vp,billboard(world.systems[point.index].position,world.eye,world.target,scale*1.22),{eye:world.eye,tint,emission:.6,opacity:.7});
            this.drawn++;
        }
        const selectedPoint=world.projections.find(p=>p.type==='system'&&p.index===selected);
        this.edge=edgeIndicator(selectedPoint,layout.map);
        // HUD compass is also mesh geometry, with an explicit screen-space projection.
        const map=layout.map,unit=28,cx=map.x+34,cy=map.y+34;
        const ortho=new Float32Array([2/R.w,0,0,0,0,-2/R.h,0,0,0,0,-.01,0,-1,1,0,1]);
        const oldFog=R.fogDensity;R.fogDensity=0;
        R.gl.disable(R.gl.DEPTH_TEST);
        const frame=mul(perspective(.9,1,.1,10),lookAt(norm(world.eye.map((v,i)=>v-world.target[i])).map(v=>v*3),[0,0,0]));
        const center=[cx,cy,0];
        for(let i=0;i<3;i++){
            const axis=[0,0,0];axis[i]=1;
            const p=project(axis,frame,unit*2,unit*2);const end=[cx+p[0]-unit,cy+p[1]-unit,0];
            const dx=end[0]-cx,dy=end[1]-cy,len=Math.hypot(dx,dy)||1;
            const axisModel=new Float32Array([dx,dy,0,0,-dy/len*24,dx/len*24,0,0,0,0,24,0,cx,cy,0,1]);
            R.drawMesh('atlas-axis-0',ortho,axisModel,{eye:[cx,cy,100],tint:[[1,.75,.45,1],[.6,1,.65,1],[.5,.85,1,1]][i],emission:1});
        }
        if(this.edge){const e=this.edge,co=Math.cos(e.angle),si=Math.sin(e.angle),s=12,mat=new Float32Array([s*co,s*si,0,0,-s*si,s*co,0,0,0,0,s,0,e.x,e.y,0,1]);R.drawMesh('atlas-arrow',ortho,mat,{eye:[e.x,e.y,100],tint:[1,.84,.45,1],emission:1});}
        R.gl.enable(R.gl.DEPTH_TEST);R.fogDensity=oldFog;
        R.frameStats.atlasMarkers=this.drawn;
    }
}
