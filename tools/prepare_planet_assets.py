"""Package external NASA maps. Only decode, resize and losslessly encode; no painting.
Preserve GLTF UVs for atlas textures. Source bytes and hashes remain in sources/nasa.
"""
from pathlib import Path
import json,struct,io,hashlib
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS=300_000_000
root=Path(__file__).resolve().parents[1];source=root/'sources/nasa';out=root/'assets/planets';out.mkdir(exist_ok=True)
catalog=json.loads((source/'sources.json').read_text());manifest=[]
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def glb(path):
 b=path.read_bytes();size,_=struct.unpack_from('<II',b,12);d=json.loads(b[20:20+size]);off=20+size;ln,_=struct.unpack_from('<II',b,off);return d,b[off+8:off+8+ln]
def accessor(d,raw,index):
 a=d['accessors'][index];view=d['bufferViews'][a['bufferView']];dtype={5126:'<f4',5125:'<u4',5123:'<u2'}[a['componentType']];components={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']]
 offset=view.get('byteOffset',0)+a.get('byteOffset',0);stride=view.get('byteStride',np.dtype(dtype).itemsize*components)
 return np.ndarray((a['count'],components),dtype=dtype,buffer=raw,offset=offset,strides=(stride,np.dtype(dtype).itemsize)).copy()
for item in catalog:
 path=source/item['file'];record={**item,'source_sha256':sha(path)};record.pop('file')
 if path.suffix=='.glb':
  d,raw=glb(path);mat=d['materials'][item.get('material',0)];ti=mat['pbrMetallicRoughness']['baseColorTexture']['index'];img=d['images'][d['textures'][ti]['source']];view=d['bufferViews'][img['bufferView']];start=view.get('byteOffset',0)
  im=Image.open(io.BytesIO(raw[start:start+view['byteLength']])).convert('RGBA' if item['id']=='rings' else 'RGB')
  record['embedded_image']=img.get('name','image');record['embedded_sha256']=hashlib.sha256(raw[start:start+view['byteLength']]).hexdigest()
  if item.get('atlas'):
   primitives=[p for m in d['meshes'] for p in m['primitives'] if p.get('material',0)==item.get('material',0)]
   vertices=[];indices=[];offset=0
   for p in primitives:
    attrs=p['attributes'];pos=accessor(d,raw,attrs['POSITION']);norm=accessor(d,raw,attrs['NORMAL']);uv=accessor(d,raw,attrs['TEXCOORD_0']);idx=accessor(d,raw,p['indices']).ravel()
    # NASA planet object geometry is centered at its origin; normalize size only.
    pos=pos/np.median(np.linalg.norm(pos,axis=1));norm=norm/np.linalg.norm(norm,axis=1)[:,None]
    vertices.append(np.concatenate([pos,norm,uv,np.ones((len(pos),4))],axis=1).astype('<f4'));indices.append(idx.astype('<u4')+offset);offset+=len(pos)
   v=np.concatenate(vertices);ix=np.concatenate(indices);vp=out/(item['id']+'.f32');ip=out/(item['id']+'.u32');vp.write_bytes(v.tobytes());ip.write_bytes(ix.astype('<u4').tobytes())
   record['mesh']={'id':'planet-'+item['id'],'vertices':str(vp.relative_to(root)),'indices':str(ip.relative_to(root)),'vertexCount':len(v),'indexCount':len(ix),'vertex_sha256':sha(vp),'index_sha256':sha(ip)}
 else:im=Image.open(path).convert('RGB')
 record['source_dimensions']=list(im.size);levels=[];max_size=min(item.get('max_size',8192),im.width)
 for size in sorted(set([min(2048,max_size),min(4096,max_size),max_size])):
  w=int(size);h=round(im.height*w/im.width);converted=im if (w,h)==im.size else im.resize((w,h),Image.Resampling.LANCZOS)
  target=out/(item['id']+'-'+str(w)+'.png');converted.save(target,compress_level=6)
  levels.append({'path':str(target.relative_to(root)),'width':w,'height':h,'sha256':sha(target)})
 record.update(path=levels[0]['path'],sha256=levels[0]['sha256'],levels=levels,processing='Decode and lossless PNG encoding; Lanczos downsampling for display levels; no synthesized detail or recoloring.')
 manifest.append(record);print(item['id'],record['source_dimensions'],'->',[(l['width'],l['height']) for l in levels],flush=True)
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
