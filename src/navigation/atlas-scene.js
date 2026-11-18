/** Camera-facing 3D hexagons in the colour of each discipline, progress arcs and conceptual routes. */
import { transform } from '../renderer.js';
import { tubePath, mergeMeshes } from '../education/geometry.js';
import { contains, edgeIndicator, routeSystems } from './atlas-model.js';
import { AREAS } from '../scene/systems.js';
import { DISCIPLINE } from '../ui/toolkit.js';
const DIM=[.36,.45,.48,1];
const norm=v=>{const l=Math.hypot(...v)||1;return v.map(n=>n/l);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export function billboard(position, eye, target, scale) {
    const z=norm(eye.map((v,i)=>v-target[i])),x=norm(cross([0,1,0],z)),y=cross(z,x);
    return new Float32Array([...x.map(v=>v*scale),0,...y.map(v=>v*scale),0,...z.map(v=>v*scale),0,...position,1]);
}
export function hexGeometry(radius=.035) {
    const p=Array.from({length:7},(_,i)=>[Math.cos(Math.PI/6+i*Math.PI/3),Math.sin(Math.PI/6+i*Math.PI/3),0]);
    return tubePath(p,radius,6);
}
/** Flat hexagon slightly behind the outline, used as a translucent fill. */
export function hexFillGeometry() {
    const v=[0,0,-.03,0,0,1,.5,.5,1,1,1,1],i=[];
    for(let k=0;k<6;k++){const a=Math.PI/6+k*Math.PI/3;v.push(Math.cos(a)*.96,Math.sin(a)*.96,-.03,0,0,1,.5,.5,1,1,1,1);i.push(0,1+k,1+(k+1)%6);}
    return {v:new Float32Array(v),i:new Uint32Array(i),stride:12};
}
/** Arc around the marker, clockwise from the top, covering `fraction` of the circle. */
export function arcGeometry(fraction, radius=1.34) {
    const n=Math.max(2,Math.ceil(48*fraction)+1);
    return tubePath(Array.from({length:n},(_,k)=>{const a=Math.PI/2-2*Math.PI*fraction*k/(n-1);return [Math.cos(a)*radius,Math.sin(a)*radius,0];}),.075,6);
}
export const ARC_STEPS=12;
export function routeGeometry(ids, systems) {
    const parts=[];
    for(let i=1;i<ids.length;i++){
        const a=systems[ids[i-1]]?.position,b=systems[ids[i]]?.position;if(!a||!b||ids[i]===ids[i-1])continue;
        const points=Array.from({length:17},(_,j)=>{const t=j/16;return a.map((v,k)=>v+(b[k]-v)*t+(k===1?Math.sin(Math.PI*t)*1.5:0));});
        parts.push(tubePath(points,.045,5));
    }
    return mergeMeshes(parts);
}
/** Arcs between the systems of each pair, raised above the galactic plane by `lift`. */
export function passageGeometry(pairs, systems, lift=1, radius=.03) {
    const parts=[];
    for(const [x,y] of pairs){const a=systems[x]?.position,b=systems[y]?.position;if(!a||!b)continue;
        parts.push(tubePath(Array.from({length:17},(_,j)=>{const t=j/16;return a.map((v,k)=>v+(b[k]-v)*t+(k===1?Math.sin(Math.PI*t)*lift:0));}),radius,5));}
    return parts.length?mergeMeshes(parts):null;
}
const LANE=[.55,.78,.84,1],JUMP=[1,.84,.45,1];
export class AtlasScene {
    constructor(R){this.R=R;this.ready=false;this.routeKey='';this.passageKey='';this.edge=null;this.drawn=0;}
    /** Open passages: lanes inside an arm and jumps between arms, those of the selected system brighter. */
    passages(world,open,selected){
        const R=this.R,key=open.map(p=>p.id).join(',')+'|'+selected;
        if(key!==this.passageKey){
            for(const id of ['atlas-lanes','atlas-jumps','atlas-near'])R.deleteMesh(id);
            const pairs=kind=>open.filter(p=>p.kind===kind&&!p.systems.includes(selected)).map(p=>p.systems),near=open.filter(p=>p.systems.includes(selected));
            const lanes=passageGeometry(pairs('corsia'),world.systems,1),jumps=passageGeometry(pairs('salto'),world.systems,2.6),mine=near.length?mergeMeshes(near.map(p=>passageGeometry([p.systems],world.systems,p.kind==='salto'?2.6:1,.045))):null;
            if(lanes)R.makeMesh('atlas-lanes',lanes);if(jumps)R.makeMesh('atlas-jumps',jumps);if(mine)R.makeMesh('atlas-near',mine);
            this.passageMeshes={lanes:!!lanes,jumps:!!jumps,near:!!mine};this.passageKey=key;
        }
        const m=this.passageMeshes||{},draw=(id,tint,opacity)=>R.drawMesh(id,world.vp,transform(),{eye:world.eye,tint,emission:.5,opacity});
        if(m.lanes)draw('atlas-lanes',LANE,.32);if(m.jumps)draw('atlas-jumps',JUMP,.36);if(m.near)draw('atlas-near',[1,.93,.78,1],.8);
        R.frameStats.atlasPassages=open.length;
    }
    init(){if(this.ready)return;const R=this.R;R.makeMesh('atlas-hex',hexGeometry(.075));R.makeMesh('atlas-hex-fill',hexFillGeometry());
        R.makeMesh('atlas-arrow',tubePath([[-.5,-.6,0],[.6,0,0],[-.5,.6,0]],.1,6));
        for(let k=1;k<=ARC_STEPS;k++)R.makeMesh('atlas-arc-'+k,arcGeometry(k/ARC_STEPS));
        R.makeMesh('atlas-arc-track',arcGeometry(1));this.ready=true;
    }
    draw(world,state,layout,{selected,hover,contrast,path,modules,progress=[],labels=true,passages=[],visited=null}){
        const R=this.R;this.drawn=0;this.signals=0;this.edge=null;if(state.scene!=='galaxy'||world.cameraProgress<1)return;
        this.init();
        const ids=routeSystems(path,modules),key=ids.join(',');
        if(key!==this.routeKey){R.deleteMesh('atlas-route');if(ids.length>1)R.makeMesh('atlas-route',routeGeometry(ids,world.systems));this.routeKey=key;}
        if(ids.length>1)R.drawMesh('atlas-route',world.vp,transform(),{eye:world.eye,tint:[.85,.68,.4,1],emission:.65,opacity:.7});
        if(!path)this.passages(world,passages,selected);
        const selectedIds=new Set(ids),radius=layout.compact?14:18;
        for(const point of world.projections){if(point.type!=='system'||point.depth<=0)continue;
            point.r=24; // 48 CSS px hit diameter, kept consistent with the visible marker.
            if(!contains(layout.map,point.x,point.y))continue;
            const active=point.index===selected,highlighted=point.index===hover,visibleRadius=active?radius+5:highlighted?radius+3:radius;
            const scale=2*point.depth*Math.tan(world.fov/2)*visibleRadius/R.h,position=world.systems[point.index].position;
            const sector=AREAS[point.index]?.sector??0,filtered=state.sector>=0&&state.sector!==sector,onPath=(!path||selectedIds.has(point.index))&&!filtered;
            const tint=onPath||active?DISCIPLINE[sector]:DIM,emission=0,material=16,p=progress[point.index]||{done:0,n:1,active:false};
            // A system never visited is still a signal: outline only, fainter, until the student goes there.
            const signal=visited&&!visited.has(point.index)&&!p.active&&!active&&!highlighted;
            const opacity=(onPath||active?1:filtered?.3:.55)*(signal?.62:1),frame=billboard(position,world.eye,world.target,scale);
            if(!signal)R.drawMesh('atlas-hex-fill',world.vp,frame,{eye:world.eye,tint,material,opacity:opacity*(active?.42:highlighted||p.active?.3:.16)});
            R.drawMesh('atlas-hex',world.vp,frame,{eye:world.eye,tint:active?[1,1,1,1]:tint,material,opacity});
            if(signal)this.signals++;
            // Completed units of the area, as a clockwise arc; the faint track shows the whole.
            if(p.done>0&&(onPath||active)){const k=Math.max(1,Math.round(ARC_STEPS*p.done/p.n));R.drawMesh('atlas-arc-track',world.vp,frame,{eye:world.eye,tint,material,opacity:.22});R.drawMesh('atlas-arc-'+k,world.vp,frame,{eye:world.eye,tint,material,opacity:1});}
            if(active)R.drawMesh('atlas-hex',world.vp,billboard(position,world.eye,world.target,scale*1.3),{eye:world.eye,tint,material,opacity:.55});
            this.drawn++;
        }
        const selectedPoint=world.projections.find(p=>p.type==='system'&&p.index===selected);
        this.edge=edgeIndicator(selectedPoint,layout.map);
        // Only the off-screen arrow is drawn in screen space; the former axis compass was removed
        // because three short strokes could not be read as directions.
        if(this.edge){const ortho=new Float32Array([2/R.w,0,0,0,0,-2/R.h,0,0,0,0,-.01,0,-1,1,0,1]),oldFog=R.fogDensity;R.fogDensity=0;R.gl.disable(R.gl.DEPTH_TEST);
            const e=this.edge,co=Math.cos(e.angle),si=Math.sin(e.angle),s=12,mat=new Float32Array([s*co,s*si,0,0,-s*si,s*co,0,0,0,0,s,0,e.x,e.y,0,1]);R.drawMesh('atlas-arrow',ortho,mat,{eye:[e.x,e.y,100],tint:[1,.84,.45,1],emission:1});
            R.gl.enable(R.gl.DEPTH_TEST);R.fogDensity=oldFog;}
        R.frameStats.atlasMarkers=this.drawn;R.frameStats.atlasSignals=this.signals;
    }
}
