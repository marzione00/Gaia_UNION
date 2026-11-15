"""Replay captured module meshes and UI with the original GAIA GLSL ES shaders.
Not a browser screenshot; this is an offscreen Mesa/EGL renderer check.
"""
import argparse
from pathlib import Path
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('frames',type=Path,help='Directory produced by capture_curriculum.mjs')
parser.add_argument('--start',type=int,default=0)
parser.add_argument('--limit',type=int,default=10000)
args=parser.parse_args()
frames=args.frames.resolve()
root=Path(__file__).resolve().parents[1]
import os,ctypes as C
os.environ['EGL_PLATFORM']='surfaceless'
e=C.CDLL('libEGL.so.1'); ptr=C.c_void_p; I=C.c_int; U=C.c_uint

def egl(name,rest,args):
 f=getattr(e,name);f.restype=rest;f.argtypes=args;return f
get=egl('eglGetDisplay',ptr,[ptr]);init=egl('eglInitialize',U,[ptr,C.POINTER(I),C.POINTER(I)]);bind=egl('eglBindAPI',U,[U]);choose=egl('eglChooseConfig',U,[ptr,C.POINTER(I),C.POINTER(ptr),I,C.POINTER(I)]);surf=egl('eglCreatePbufferSurface',ptr,[ptr,ptr,C.POINTER(I)]);context=egl('eglCreateContext',ptr,[ptr,ptr,ptr,C.POINTER(I)]);current=egl('eglMakeCurrent',U,[ptr,ptr,ptr,ptr]);error=egl('eglGetError',U,[]);proc=egl('eglGetProcAddress',ptr,[C.c_char_p])
d=get(None);a=I();b=I();assert init(d,C.byref(a),C.byref(b)),hex(error());assert bind(0x30A0)
attrs=(I*15)(0x3033,1,0x3040,0x40,0x3024,8,0x3023,8,0x3022,8,0x3021,8,0x3025,24,0x3038);config=ptr();n=I();assert choose(d,attrs,C.byref(config),1,C.byref(n)) and n.value
s=surf(d,config,(I*5)(0x3057,1600,0x3056,1000,0x3038));assert s,hex(error());c=context(d,config,None,(I*3)(0x3098,3,0x3038));assert c,hex(error());assert current(d,s,s,c),hex(error())
getstring=C.CFUNCTYPE(C.c_char_p,U)(proc(b'glGetString'))
print('EGL',a.value,b.value,'GL',getstring(0x1F02),'Renderer',getstring(0x1F01),flush=True)

import numpy as np,json,glob
from PIL import Image
F=C.c_float; B=C.c_ubyte; S=C.c_ssize_t

def gl(name,rest,args):
    address=proc(name.encode());assert address,name
    return C.CFUNCTYPE(rest,*args)(address)
createShader=gl('glCreateShader',U,[U]);shaderSource=gl('glShaderSource',None,[U,I,C.POINTER(C.c_char_p),C.POINTER(I)]);compileShader=gl('glCompileShader',None,[U]);shaderiv=gl('glGetShaderiv',None,[U,U,C.POINTER(I)]);shaderLog=gl('glGetShaderInfoLog',None,[U,I,C.POINTER(I),ptr]);createProgram=gl('glCreateProgram',U,[]);attach=gl('glAttachShader',None,[U,U]);link=gl('glLinkProgram',None,[U]);programiv=gl('glGetProgramiv',None,[U,U,C.POINTER(I)]);programLog=gl('glGetProgramInfoLog',None,[U,I,C.POINTER(I),ptr]);use=gl('glUseProgram',None,[U]);getUniform=gl('glGetUniformLocation',I,[U,C.c_char_p]);mat=gl('glUniformMatrix4fv',None,[I,I,B,ptr]);u1f=gl('glUniform1f',None,[I,F]);u1i=gl('glUniform1i',None,[I,I]);u2f=gl('glUniform2f',None,[I,F,F]);u3f=gl('glUniform3f',None,[I,F,F,F]);u4f=gl('glUniform4f',None,[I,F,F,F,F]);genVAO=gl('glGenVertexArrays',None,[I,C.POINTER(U)]);bindVAO=gl('glBindVertexArray',None,[U]);genBuffers=gl('glGenBuffers',None,[I,C.POINTER(U)]);bindBuffer=gl('glBindBuffer',None,[U,U]);bufferData=gl('glBufferData',None,[U,S,ptr,U]);enableAttrib=gl('glEnableVertexAttribArray',None,[U]);attrib=gl('glVertexAttribPointer',None,[U,I,U,B,I,ptr]);constAttrib=gl('glVertexAttrib4f',None,[U,F,F,F,F]);viewport=gl('glViewport',None,[I,I,I,I]);scissor=gl('glScissor',None,[I,I,I,I]);enable=gl('glEnable',None,[U]);disable=gl('glDisable',None,[U]);clearColor=gl('glClearColor',None,[F,F,F,F]);clear=gl('glClear',None,[U]);drawElements=gl('glDrawElements',None,[U,I,U,ptr]);drawArrays=gl('glDrawArrays',None,[U,I,I]);getError=gl('glGetError',U,[]);blendFunc=gl('glBlendFunc',None,[U,U]);genTextures=gl('glGenTextures',None,[I,C.POINTER(U)]);activeTexture=gl('glActiveTexture',None,[U]);bindTexture=gl('glBindTexture',None,[U,U]);texImage=gl('glTexImage2D',None,[U,I,I,I,I,I,U,U,ptr]);texParam=gl('glTexParameteri',None,[U,U,I]);readPixels=gl('glReadPixels',None,[I,I,I,I,U,U,ptr]);finish=gl('glFinish',None,[])

def shader(kind,source):
    sid=createShader(kind);text=C.c_char_p(source.encode());shaderSource(sid,1,C.byref(text),None);compileShader(sid);ok=I();shaderiv(sid,0x8B81,C.byref(ok))
    if not ok.value:
        msg=C.create_string_buffer(65536);shaderLog(sid,len(msg),None,msg);raise RuntimeError(msg.value.decode())
    return sid

def program(vs,fs):
    p=createProgram();attach(p,shader(0x8B31,vs));attach(p,shader(0x8B30,fs));link(p);ok=I();programiv(p,0x8B82,C.byref(ok))
    if not ok.value:
        msg=C.create_string_buffer(65536);programLog(p,len(msg),None,msg);raise RuntimeError(msg.value.decode())
    return p

def texture(data):
    arr=np.ascontiguousarray(data,dtype=np.uint8);name=U();genTextures(1,C.byref(name));bindTexture(0x0DE1,name.value)
    texImage(0x0DE1,0,0x1908,arr.shape[1],arr.shape[0],0,0x1908,0x1401,arr.ctypes.data)
    for key,val in [(0x2801,0x2601),(0x2800,0x2601),(0x2802,0x812F),(0x2803,0x812F)]:texParam(0x0DE1,key,val)
    return name.value

def vao(vertices,indices=None,ui=False):
    name=U();genVAO(1,C.byref(name));bindVAO(name.value);v=np.ascontiguousarray(vertices,dtype=np.float32);buffer=U();genBuffers(1,C.byref(buffer));bindBuffer(0x8892,buffer.value);bufferData(0x8892,v.nbytes,v.ctypes.data,0x88E4)
    if indices is not None:
        ix=np.ascontiguousarray(indices,dtype=np.uint32);ib=U();genBuffers(1,C.byref(ib));bindBuffer(0x8893,ib.value);bufferData(0x8893,ix.nbytes,ix.ctypes.data,0x88E4)
    for index,size,offset in ([(0,2,0),(1,2,8),(2,4,16),(3,1,32)] if ui else [(0,3,0),(1,3,12),(2,2,24),(3,4,32)]):
        enableAttrib(index);attrib(index,size,0x1406,0,36 if ui else 48,ptr(offset))
    if not ui:constAttrib(4,0,.65,0,0)
    return name.value

sources=json.load(open(frames/'render-shaders.json'));meshProgram=program(sources['vsMesh'],sources['fsMesh']);uiProgram=program(sources['vsUI'],sources['fsUI'])
white=texture(np.full((1,1,4),255,dtype=np.uint8));atlas=texture(np.asarray(Image.open(root/'assets/glyph-atlas.png').convert('RGBA')))
identity=np.eye(4,dtype=np.float32).flatten();report={'method':'Original GLSL ES + captured module geometry/UI; offline EGL replay, not browser end-to-end','renderer':getstring(0x1F01).decode(),'version':getstring(0x1F02).decode(),'frames':[]}
for path in sorted(frames.glob('*.frame.json'))[args.start:args.start+args.limit]:
    frame=json.load(open(path));w,h=frame['w'],frame['h'];assert 0<w<=1600 and 0<h<=1000,'Frame exceeds test pbuffer';viewport(0,0,w,h);disable(0x0C11);disable(0x0BE2);enable(0x0B71);clearColor(.004,.012,.024,1);clear(0x4000|0x0100)
    meshes={key:vao(value['v'],value['i']) for key,value in frame['meshes'].items()}
    use(meshProgram)
    for unit,name in enumerate(['uTex','uShadow','uReflection']):
        activeTexture(0x84C0+unit);bindTexture(0x0DE1,white);u1i(getUniform(meshProgram,name.encode()),unit)
    for call in frame['calls']:
        vp=call['viewport'];viewport(*vp);scissor(*vp);enable(0x0C11);options=call['options'];bindVAO(meshes[call['id']]);constAttrib(4,0,.65,0,0)
        for name,value in [('uVP',call['vp']),('uModel',call['model']),('uLightVP',identity),('uReflectionVP',identity)]:
            array=np.asarray(value,dtype=np.float32);mat(getUniform(meshProgram,name.encode()),1,0,array.ctypes.data)
        for name,value in [('uEye',options['eye']),('uLight',[.4,1,.7]),('uCenter',[0,0,0]),('uFogColor',[.1,.1,.1]),('uAtmosColor',[.11,.36,.81])]:u3f(getUniform(meshProgram,name.encode()),*value)
        u4f(getUniform(meshProgram,b'uTint'),*options['tint']);u1i(getUniform(meshProgram,b'uMaterial'),0);u1i(getUniform(meshProgram,b'uOccluderCount'),0)
        for name,value in {'uTexWeight':0,'uOpacity':1,'uRim':0,'uEmission':options.get('emission',0),'uTime':0,'uSeed':0,'uRadius':1,'uFog':0,'uHasShadow':0,'uMist':0,'uClipBelow':-10000,'uOcean':0}.items():u1f(getUniform(meshProgram,name.encode()),value)
        drawElements(0x0004,len(frame['meshes'][call['id']]['i']),0x1405,None)
    disable(0x0C11);viewport(0,0,w,h);disable(0x0B71);enable(0x0BE2);blendFunc(0x0302,0x0303);use(uiProgram);bindVAO(vao(frame['ui'],ui=True));activeTexture(0x84C0);bindTexture(0x0DE1,atlas);u1i(getUniform(uiProgram,b'uFont'),0);u2f(getUniform(uiProgram,b'uRes'),w,h);drawArrays(0x0004,0,len(frame['ui'])//9);finish()
    err=getError();pixels=np.zeros((h,w,4),dtype=np.uint8);readPixels(0,0,w,h,0x1908,0x1401,pixels.ctypes.data);Image.fromarray(np.flipud(pixels)).save(frames/(frame['name']+'.png'))
    item={'name':frame['name'],'width':w,'height':h,'glError':err,'drawCalls':len(frame['calls']),'triangles':frame['stats'].get('courseTriangles',0),'uiTriangles':len(frame['ui'])//27};report['frames'].append(item);print(item,flush=True)
    assert err==0,hex(err)
if (frames/'egl-report.json').exists():
    old=json.load(open(frames/'egl-report.json'))
    by_name={f['name']:f for f in old['frames']}
    by_name.update({f['name']:f for f in report['frames']})
    report['frames']=list(by_name.values())
json.dump(report,open(frames/'egl-report.json','w'),indent=2)
