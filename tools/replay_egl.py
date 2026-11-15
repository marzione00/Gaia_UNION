"""Replay exact application WebGL calls on a native EGL OpenGL ES 3 context.
No browser navigation and no image synthesis. Requires Mesa EGL, numpy and PIL.
The WebGL shader sources are compiled unmodified as GLSL ES 3.00.
"""
from pathlib import Path
import ctypes as C,json,sys,time,os
import numpy as np
from PIL import Image
DATA=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).resolve().parents[2]/'runtime-qa-v130'
record=json.loads((DATA/'calls.json').read_text());root=Path(record['root']);out=DATA/'renders';out.mkdir(exist_ok=True)
E=C.CDLL('libEGL.so.1');E.eglGetProcAddress.argtypes=[C.c_char_p];E.eglGetProcAddress.restype=C.c_void_p
u,i,f,vp=C.c_uint,C.c_int,C.c_float,C.c_void_p
b=C.c_ubyte

def egl(name,rest,*args):
 fn=getattr(E,name);fn.restype=rest;fn.argtypes=list(args);return fn
getdisplay=C.CFUNCTYPE(vp,u,vp,C.POINTER(i))(E.eglGetProcAddress(b'eglGetPlatformDisplayEXT'))
display=getdisplay(0x31DD,None,None);major,minor=i(),i()
assert egl('eglInitialize',u,vp,C.POINTER(i),C.POINTER(i))(display,C.byref(major),C.byref(minor))
assert egl('eglBindAPI',u,u)(0x30A0)
attrs=(i*15)(0x3033,1,0x3040,0x40,0x3024,8,0x3023,8,0x3022,8,0x3021,8,0x3025,24,0x3038);cfg,n=vp(),i()
assert egl('eglChooseConfig',u,vp,C.POINTER(i),C.POINTER(vp),i,C.POINTER(i))(display,attrs,C.byref(cfg),1,C.byref(n)) and n.value
context=egl('eglCreateContext',vp,vp,vp,vp,C.POINTER(i))(display,cfg,None,(i*3)(0x3098,3,0x3038))
surface=egl('eglCreatePbufferSurface',vp,vp,vp,C.POINTER(i))(display,cfg,(i*5)(0x3057,1600,0x3056,1000,0x3038))
assert egl('eglMakeCurrent',u,vp,vp,vp,vp)(display,surface,surface,context)
functions={}
def gl(name,rest,*args):
 key=(name,rest,args)
 if key not in functions:functions[key]=C.CFUNCTYPE(rest,*args)(E.eglGetProcAddress(('gl'+name).encode()))
 return functions[key]
geterror=gl('GetError',u)
info={'api':gl('GetString',C.c_char_p,u)(0x1F02).decode(),'renderer':gl('GetString',C.c_char_p,u)(0x1F01).decode(),'method':'Exact application call replay, native EGL OpenGL ES. DOM shim; not browser E2E.','unaltered_glsl_es':True,'ai_image_assets':False,'frames':{}}
print(json.dumps(info),flush=True)
refs={};shader_text={};program_shaders={}
signatures={
 'attachShader':(u,u),'compileShader':(u,),'linkProgram':(u,),'deleteShader':(u,),
 'bindVertexArray':(u,),'bindBuffer':(u,u),'bindTexture':(u,u),'texParameteri':(u,u,i),'generateMipmap':(u,),
 'enableVertexAttribArray':(u,),'vertexAttribPointer':(u,i,u,b,i,vp),'vertexAttrib4f':(u,f,f,f,f),
 'viewport':(i,i,i,i),'clearColor':(f,f,f,f),'clear':(u,),'enable':(u,),'disable':(u,),
 'depthMask':(b,),'useProgram':(u,),'activeTexture':(u,),'uniform1f':(i,f),'uniform1i':(i,i),'uniform2f':(i,f,f),
 'drawElements':(u,i,u,vp),'drawArrays':(u,i,i),'blendFunc':(u,u),'polygonOffset':(f,f),
 'bindFramebuffer':(u,u),'framebufferTexture2D':(u,u,u,u,i),'bindRenderbuffer':(u,u),'renderbufferStorage':(u,u,i,i),'framebufferRenderbuffer':(u,u,u,u),'readBuffer':(u,),
}
def decode(x):return refs[x['ref']] if isinstance(x,dict) and 'ref'in x else x

def validate(kind,obj):
 pname=0x8B81 if kind=='Shader' else 0x8B82;ok=i();gl('Get'+kind+'iv',None,u,u,C.POINTER(i))(obj,pname,C.byref(ok))
 if not ok.value:
  msg=C.create_string_buffer(32768);gl('Get'+kind+'InfoLog',None,u,i,C.POINTER(i),vp)(obj,len(msg),None,msg)
  raise RuntimeError(kind+': '+msg.value.decode())

def run(calls):
 for index,c in enumerate(calls):
  op=c['op'];a=[decode(x) for x in c['args']];result=None
  if op.startswith('create'):
   kind=op[6:]
   if kind in ('Shader','Program'):result=gl(op[0].upper()+op[1:],u,*([u] if a else []))(*a)
   else:
    result=u();gl('Gen'+{'VertexArray':'VertexArrays'}.get(kind,kind+'s'),None,i,C.POINTER(u))(1,C.byref(result));result=result.value
  elif op=='getUniformLocation':result=gl('GetUniformLocation',i,u,C.c_char_p)(a[0],a[1].encode())
  elif op=='shaderSource':
   raw=a[1].encode();strings=(C.c_char_p*1)(raw);gl('ShaderSource',None,u,i,C.POINTER(C.c_char_p),C.POINTER(i))(a[0],1,strings,None)
  elif op=='bufferData':
   data=(DATA/a[1]['binary']).read_bytes();buf=C.create_string_buffer(data);gl('BufferData',None,u,C.c_ssize_t,vp,u)(a[0],len(data),buf,a[2])
  elif op=='texImage2D':
   if len(a)==6:
    data=np.asarray(Image.open(root/a[5]['image']).convert('RGBA')).copy();h,w=data.shape[:2]
    args=[a[0],a[1],a[2],w,h,0,a[3],a[4],data.ctypes.data]
   else:
    args=a;data=None
    if isinstance(a[-1],dict):
     data=np.fromfile(DATA/a[-1]['binary'],np.uint8);args[-1]=data.ctypes.data
   gl('TexImage2D',None,u,i,i,i,i,i,u,u,vp)(*args)
  elif op=='pixelStorei':
   if a[0]!=0x9240:gl('PixelStorei',None,u,i)(*a)
  elif op in ('uniform3fv','uniform4fv','uniformMatrix4fv'):
   data=np.asarray(a[-1],np.float32)
   if op=='uniformMatrix4fv':gl('UniformMatrix4fv',None,i,i,b,vp)(a[0],1,a[1],data.ctypes.data)
   else:gl(op[0].upper()+op[1:],None,i,i,vp)(a[0],1,data.ctypes.data)
  elif op=='drawBuffers':
   data=(u*len(a[0]))(*a[0]);gl('DrawBuffers',None,i,C.POINTER(u))(len(a[0]),data)
  elif op in ('deleteFramebuffer','deleteTexture','deleteRenderbuffer','deleteVertexArray','deleteBuffer'):
   obj=u(a[0]);plural={'deleteVertexArray':'DeleteVertexArrays'}.get(op,op[0].upper()+op[1:]+'s');gl(plural,None,i,C.POINTER(u))(1,C.byref(obj))
  elif op in signatures:
   args=[0 if x is None else x for x in a];gl(op[0].upper()+op[1:],None,*signatures[op])(*args)
  else:raise RuntimeError('Unimplemented '+op)
  if c['result'] is not None:refs[c['result']['ref']]=result
  if op=='compileShader':validate('Shader',a[0])
  if op=='linkProgram':validate('Program',a[0])
  err=geterror()
  if err:raise RuntimeError(f'GL error {hex(err)} at {index}: {op}, args {str(a)[:220]}')

start=time.time();run(record['initialization']);print('Initialization validated',round(time.time()-start,2),'s',flush=True)
selection=set(os.environ.get('GAIA_FRAMES','').split(','))-{''}
for frame in record['frames']:
 if selection and frame['name'] not in selection:
  run([c for c in frame['commands'] if c['op'] not in ('drawArrays','drawElements')]);continue
 start=time.time();run(frame['commands']);gl('Finish',None)();w,h=frame['width'],frame['height'];pixels=np.empty((h,w,4),np.uint8)
 gl('ReadPixels',None,i,i,i,i,u,u,vp)(0,0,w,h,0x1908,0x1401,pixels.ctypes.data)
 if frame.get('snapshot',True):
  img=Image.fromarray(pixels[::-1,:,:3]);img.save(out/(frame['name']+'.png'))
 err=geterror();assert err==0
 info['frames'][frame['name']]={'width':w,'height':h,'calls':len(frame['commands']),'stars':frame.get('starSubmissions',[]),'snapshot':frame.get('snapshot',True),'gl_errors':err,'seconds':round(time.time()-start,2)}
 print(frame['name'],info['frames'][frame['name']],flush=True)
(out/'validation.json').write_text(json.dumps(info,indent=2));print('Saved',out,flush=True)
