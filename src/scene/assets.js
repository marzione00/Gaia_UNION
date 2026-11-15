import { systemPlanet } from './systems.js';
// Binary scene resources are shipped locally. Runtime never fetches a CDN.
export function planetProfile(index) {
    const body=systemPlanet(index);return {...body.profile,seed:index*.731+2.7,type:body.type};
}
export class PlanetTextures {
    constructor(gpu,manifest,base,loadImage){this.gpu=gpu;this.manifest=manifest;this.base=base;this.loadImage=loadImage;this.high=new Map();this.pending=new Set();this.failed=new Set();this.errors=[];this.limit=gpu.gl.getParameter(gpu.gl.MAX_TEXTURE_SIZE);}
    get(id,detailed=false){
        if(!detailed)return this.base[id];
        if(this.high.has(id)){const t=this.high.get(id);this.high.delete(id);this.high.set(id,t);return t;}
        const item=this.manifest.find(m=>m.id===id),level=item?.levels?.filter(l=>Math.max(l.width,l.height)<=this.limit).at(-1);
        if(level&&level.path!==item.path&&!this.pending.has(id)&&!this.failed.has(id)){
            this.pending.add(id);
            this.loadImage(level.path).then(img=>{
                const texture=this.gpu.uploadTexture(img);this.high.set(id,texture);
                while(this.high.size>2){const oldest=this.high.keys().next().value;this.gpu.gl.deleteTexture(this.high.get(oldest));this.high.delete(oldest);}
            }).catch(e=>{this.failed.add(id);this.errors.push(id+': '+e.message);}).finally(()=>this.pending.delete(id));
        }
        return this.base[id];
    }
}
export async function loadScenes(gpu, manifest, resolveAsset = p => p, progress = () => {}) {
    const biomes = Object.values(manifest.biomes);
    let completed = 0, total = biomes.reduce((n,b) => n + b.meshes.length, 0);
    // Sequential mesh pairs bound temporary memory while uploading large scenes.
    for (const biome of biomes) {
        if (biome.grid.cells.length !== 875 || biome.stations.length !== 4) throw Error('Metadati della scena non validi');
        for (const item of biome.meshes) {
            const buffers = await Promise.all([item.vertices, item.indices].map(async path => {
                const response = await fetch(resolveAsset(path));
                if (!response.ok) throw Error('Geometria mancante: ' + path);
                return response.arrayBuffer();
            }));
            if (buffers[0].byteLength !== item.vertexCount * 64 || buffers[1].byteLength !== item.indexCount * 4) throw Error('Geometria incompleta: ' + item.id);
            gpu.makeMesh(item.id, { v: new Float32Array(buffers[0]), i: new Uint32Array(buffers[1]), stride: 16 });
            progress(++completed / total);
        }
    }
    return manifest.biomes;
}
