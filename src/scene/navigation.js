import { systemForPlanet, indicesForSystem, SYSTEM_COUNT } from './systems.js';
const defaults = scene => scene === 'galaxy' ? {yaw:0,pitch:.45,distance:60,sector:-1} : scene === 'system' ? {yaw:0,pitch:.48,distance:34} : scene === 'orbit' ? {yaw:0,pitch:.45,distance:22} : scene === 'craft' ? {yaw:.7,pitch:.5,distance:11} : {yaw:0,pitch:.45,distance:60};
export function viewKey(scene,s) { return scene==='system' ? 'system:'+s.system : ['orbit','surface'].includes(scene) ? scene+':'+s.selected : scene; }
export class NavigationMemory {
    constructor() { this.views = new Map(); }
    move(s,scene,extra={}) {
        const beforeKey=viewKey(s.scene,s), next={...s,...extra,scene};
        next.system=scene==='system' && extra.system!==undefined ? Math.max(0,Math.min(SYSTEM_COUNT-1,Math.floor(extra.system))) : systemForPlanet(next.selected);
        if(scene==='system' && systemForPlanet(next.selected)!==next.system)next.selected=indicesForSystem(next.system)[0];
        const nextKey=viewKey(scene,next);
        if(beforeKey!==nextKey){
            this.views.set(beforeKey,{yaw:s.yaw,pitch:s.pitch,distance:s.distance,...(s.scene==='galaxy'?{sector:s.sector}: {})});
            Object.assign(next,defaults(scene),this.views.get(nextKey)||{});
        }
        Object.assign(s,next);
        return {from:beforeKey,to:nextKey};
    }
}
