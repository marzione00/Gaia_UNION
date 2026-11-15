"""GAIA cosmic art direction. Native procedural 3D, no AI image assets.
blender -b -t 8 --python build_cosmos.py -- galaxy 64 1600
Variants: galaxy, biosfera, primordiale.
"""
import bpy,sys,math,random,json
from pathlib import Path
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view
from math import sin,cos,pi,exp,log,sqrt

ROOT=Path(__file__).resolve().parent;(ROOT/'render').mkdir(exist_ok=True)
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
THEME=args[0] if args else 'galaxy';SAMPLES=int(args[1]) if len(args)>1 else 64;WIDTH=int(args[2]) if len(args)>2 else 1600
random.seed(37844)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=SAMPLES;scene.cycles.use_denoising=False;scene.cycles.adaptive_threshold=.03
scene.cycles.max_bounces=7;scene.cycles.diffuse_bounces=1;scene.cycles.glossy_bounces=2;scene.cycles.volume_bounces=1;scene.cycles.transparent_max_bounces=12
scene.render.resolution_x=WIDTH;scene.render.resolution_y=round(WIDTH*1000/1600);scene.render.resolution_percentage=100;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA'
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=0
world=bpy.data.worlds.new('Vuoto interstellare');world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.001,.002,.006,1);world.node_tree.nodes['Background'].inputs[1].default_value=.04;scene.world=world

def material(name,col,rough=.5,metal=0,emission=0):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*col,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 if emission:p.inputs['Emission Color'].default_value=(*col,1);p.inputs['Emission Strength'].default_value=emission
 return m
def emission(name,col,strength):
 m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes;n.clear();e=n.new('ShaderNodeEmission');e.inputs[0].default_value=(*col,1);e.inputs[1].default_value=strength;out=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(e.outputs[0],out.inputs['Surface']);return m
def sphere(name,r,mat,p=(0,0,0),segments=160,rings=96):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=segments,ring_count=rings,radius=r,location=p);o=bpy.context.object;o.name=name;o.data.materials.append(mat)
 for f in o.data.polygons:f.use_smooth=True
 return o
def mesh(name,vs,fs,mat):
 m=bpy.data.meshes.new(name);m.from_pydata(vs,[],fs);m.update();o=bpy.data.objects.new(name,m);scene.collection.objects.link(o);m.materials.append(mat);return o
def curve(name,points,r,mat):
 c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.bevel_depth=r;c.bevel_resolution=3;c.use_fill_caps=True;s=c.splines.new('POLY');s.points.add(len(points)-1)
 for p,q in zip(s.points,points):p.co=(*q,1)
 o=bpy.data.objects.new(name,c);scene.collection.objects.link(o);c.materials.append(mat);return o
def cube(name,p,sz,mat):
 bpy.ops.mesh.primitive_cube_add(size=1,location=p);o=bpy.context.object;o.name=name;o.scale=sz;o.data.materials.append(mat);return o
def camera(p,target,scale):
 bpy.ops.object.camera_add(location=p);o=bpy.context.object;o.name='Camera GAIA';o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler();o.data.type='ORTHO';o.data.ortho_scale=scale;scene.camera=o;bpy.context.view_layer.update();return o
def sun(direction,energy=3):
 d=bpy.data.lights.new('Stella del sistema','SUN');d.energy=energy;d.angle=.009;d.color=(1,.95,.85);o=bpy.data.objects.new('Stella del sistema',d);scene.collection.objects.link(o);o.rotation_euler=(-Vector(direction)).to_track_quat('-Z','Y').to_euler()
def star_mesh(name,points,mat):
 vs=[];fs=[];offsets=[(1,0,0),(-1,0,0),(0,1,0),(0,-1,0),(0,0,1),(0,0,-1)];faces=[(0,2,4),(2,1,4),(1,3,4),(3,0,4),(2,0,5),(1,2,5),(3,1,5),(0,3,5)]
 for x,y,z,r in points:
  k=len(vs);vs.extend([(x+a*r,y+b*r,z+c*r) for a,b,c in offsets]);fs.extend([tuple(k+i for i in f) for f in faces])
 o=mesh(name,vs,fs,mat);o.visible_shadow=False;return o
def background_stars(cam,scale,count=1800):
 rot=cam.rotation_euler.to_matrix();right=rot@Vector((1,0,0));up=rot@Vector((0,1,0));fw=rot@Vector((0,0,-1));base=cam.location+fw*140;pts=[]
 for j in range(count):
  pos=base+right*random.uniform(-scale*.6,scale*.6)+up*random.uniform(-scale*.4,scale*.4)+fw*random.uniform(-25,25);r=random.uniform(.002,.009)*scale/22
  if j%80==0:r*=2.2
  pts.append((*pos,r))
 star_mesh('Stelle di fondo in profondita',pts,emission('Stelle remote',(.45,.62,.83),1.4))
def node_math(n,l,op,a,b=None):
 o=n.new('ShaderNodeMath');o.operation=op
 for k,v in enumerate([a,b]):
  if v is None:continue
  if isinstance(v,(float,int)):o.inputs[k].default_value=v
  else:l.new(v,o.inputs[k])
 return o.outputs[0]
def ramp(n,l,source,stops):
 o=n.new('ShaderNodeValToRGB');r=o.color_ramp
 while len(r.elements)>2:r.elements.remove(r.elements[-1])
 for i,(p,c) in enumerate(stops):
  e=r.elements[i] if i<2 else r.elements.new(p);e.position=p;e.color=(*c,1)
 l.new(source,o.inputs[0]);return o.outputs['Color']
def noise_node(n,l,vec,scale,detail=5,rough=.65):
 o=n.new('ShaderNodeTexNoise');o.inputs['Scale'].default_value=scale;o.inputs['Detail'].default_value=detail;o.inputs['Roughness'].default_value=rough;l.new(vec,o.inputs['Vector']);return o
def warped_coords(n,l,scale,amount,seed=0):
 c=n.new('ShaderNodeTexCoord');v=c.outputs['Object'];nt=noise_node(n,l,v,scale,4);nt.noise_dimensions='4D';nt.inputs['W'].default_value=seed
 mul=n.new('ShaderNodeVectorMath');mul.operation='SCALE';mul.inputs['Scale'].default_value=amount;l.new(nt.outputs['Color'],mul.inputs[0]);add=n.new('ShaderNodeVectorMath');add.operation='ADD';l.new(v,add.inputs[0]);l.new(mul.outputs['Vector'],add.inputs[1]);return add.outputs['Vector'],v

if THEME=='galaxy':
 cam=camera((0,-47,37),(1.4,0,-.7),70);background_stars(cam,70,2100)
 warm=emission('Giganti dorate',(1,.62,.25),4);cold=emission('Stelle azzurre',(.35,.61,1),6);white=emission('Popolazione stellare',(.85,.88,1),4);red=emission('Regioni di formazione stellare',(.7,.13,.28),2)
 groups=[[],[],[],[]]
 for i in range(76000):
  arm=i%4;r=1.5+(random.random()**.66)*26;t=arm*pi/2+1.85*log(r+1)+random.gauss(0,.10+.045*r/27)
  p=(r*cos(t),r*sin(t),random.gauss(0,.09+.011*r));s=random.uniform(.004,.012)
  if i%160==0:s*=2.2
  kind=0 if r<7 else (1 if i%4==0 else 2);groups[kind].append((*p,s))
 for i in range(12000):
  r=abs(random.gauss(0,3.6));t=random.random()*2*pi;groups[0].append((r*cos(t),r*sin(t),random.gauss(0,.35),random.uniform(.007,.020)))
 for i in range(5000):
  r=random.uniform(8,26);t=(i%4)*pi/2+1.85*log(r+1)+.15+random.gauss(0,.025);groups[3].append((r*cos(t),r*sin(t),random.gauss(0,.12),random.uniform(.013,.029)))
 for i,g in enumerate(groups):star_mesh('Popolazione stellare '+str(i),g,[warm,cold,white,red][i])
 # Continuous unresolved stellar populations are represented by a 3D emissive
 # field with spiral structure, radial/vertical falloff and turbulent clumps.
 haze=bpy.data.materials.new('Popolazione stellare diffusa tridimensionale');haze.use_nodes=True;n=haze.node_tree.nodes;l=haze.node_tree.links;n.clear();out=n.new('ShaderNodeOutputMaterial');v=n.new('ShaderNodeVolumePrincipled');v.inputs['Density'].default_value=.001
 geo=n.new('ShaderNodeNewGeometry');sep=n.new('ShaderNodeSeparateXYZ');l.new(geo.outputs['Position'],sep.inputs[0]);x,y,z=sep.outputs['X'],sep.outputs['Y'],sep.outputs['Z']
 radius=node_math(n,l,'SQRT',node_math(n,l,'ADD',node_math(n,l,'MULTIPLY',x,x),node_math(n,l,'MULTIPLY',y,y)))
 angle=node_math(n,l,'ARCTAN2',y,x);twist=node_math(n,l,'MULTIPLY',node_math(n,l,'LOGARITHM',node_math(n,l,'ADD',radius,1),math.e),1.85)
 phase=node_math(n,l,'MULTIPLY',node_math(n,l,'SUBTRACT',angle,twist),4)
 armfield=node_math(n,l,'POWER',node_math(n,l,'ADD',node_math(n,l,'MULTIPLY',node_math(n,l,'COSINE',phase),.5),.5),9)
 heightfield=node_math(n,l,'EXPONENT',node_math(n,l,'MULTIPLY',node_math(n,l,'MULTIPLY',z,z),-1.6))
 radial=node_math(n,l,'MULTIPLY',node_math(n,l,'EXPONENT',node_math(n,l,'MULTIPLY',radius,-.045)),node_math(n,l,'MAXIMUM',node_math(n,l,'SUBTRACT',1,node_math(n,l,'DIVIDE',radius,31)),0))
 clump=noise_node(n,l,geo.outputs['Position'],.35,5,.72);strength=node_math(n,l,'MULTIPLY',node_math(n,l,'ADD',node_math(n,l,'MULTIPLY',armfield,.5),.014),node_math(n,l,'MULTIPLY',heightfield,radial));strength=node_math(n,l,'MULTIPLY',strength,node_math(n,l,'ADD',node_math(n,l,'MULTIPLY',clump.outputs['Fac'],1.7),.3))
 l.new(strength,v.inputs['Emission Strength']);col=ramp(n,l,node_math(n,l,'DIVIDE',radius,30),[(0,(1,.63,.29)),(.25,(.63,.66,.76)),(.65,(.27,.39,.64)),(1,(.22,.27,.43))]);l.new(col,v.inputs['Emission Color']);l.new(v.outputs[0],out.inputs['Volume']);cube('Disco stellare continuo',(0,0,0),(62,62,5),haze)
 # A three-dimensional emissive bulge with smooth density falloff.
 m=bpy.data.materials.new('Bagliore del bulge');m.use_nodes=True;n=m.node_tree.nodes;l=m.node_tree.links;n.clear();out=n.new('ShaderNodeOutputMaterial');vol=n.new('ShaderNodeVolumePrincipled');vol.inputs['Density'].default_value=.018;vol.inputs['Emission Color'].default_value=(1,.55,.17,1)
 tc=n.new('ShaderNodeTexCoord');sub=n.new('ShaderNodeVectorMath');sub.operation='SUBTRACT';sub.inputs[1].default_value=(.5,.5,.5);l.new(tc.outputs['Generated'],sub.inputs[0]);length=n.new('ShaderNodeVectorMath');length.operation='LENGTH';l.new(sub.outputs[0],length.inputs[0]);d=node_math(n,l,'MULTIPLY',length.outputs['Value'],-12);fall=node_math(n,l,'EXPONENT',d);l.new(node_math(n,l,'MULTIPLY',fall,1.5),vol.inputs['Emission Strength']);l.new(vol.outputs[0],out.inputs['Volume']);o=sphere('Bulge volumetrico',1,m,segments=48,rings=24);o.scale=(7,7,2.2)
 # Absorbing dark lanes are genuine volumetric tubes inside the stellar disk.
 dust=bpy.data.materials.new('Polveri interstellari');dust.use_nodes=True;n=dust.node_tree.nodes;n.clear();v=n.new('ShaderNodeVolumeAbsorption');v.inputs['Color'].default_value=(.36,.19,.095,1);v.inputs['Density'].default_value=1.6;out=n.new('ShaderNodeOutputMaterial');dust.node_tree.links.new(v.outputs[0],out.inputs['Volume'])
 for arm in range(4):
  for lane in range(2):
   pts=[]
   for j in range(170):
    r=4+j/169*22;t=arm*pi/2+1.85*log(r+1)+.055+lane*.07;pts.append((r*cos(t),r*sin(t),.24+.06*sin(r)))
   curve('Filamento di polvere',pts,.16+lane*.08,dust)
 marker_mats=[emission('Matematica',(1,.65,.25),1.3),emission('Fisica',(.25,.72,.91),1.4),emission('Chimica',(.65,.35,.85),1.4),emission('Biologia',(.45,.81,.40),1.4)]
 units=json.loads((ROOT/'units.json').read_text());selected=None
 for u in units:
  p=(u['x']*.94,u['z']*.94,u['y']*.2+.45);r=.105 if u['index']!=7 else .22;sphere('Unita '+str(u['index']+1),r,marker_mats[u['sector']],p,16,8)
  if u['index']==7:selected=p
 # Exact original selected-unit label is placed by the original UI renderer.
 co=world_to_camera_view(scene,cam,Vector(selected));(ROOT/'selected_projection.json').write_text(json.dumps({'x':co.x*1600,'y':(1-co.y)*1000,'r':14,'depth':1,'index':7}))
 track=emission('Rilevamento unita',(.50,.78,.66),.5)
 for start,end in [(0,.9),(1.2,2.3),(2.6,3.6),(4.0,5.6)]:curve('Arco localizzatore',[(selected[0]+.65*cos(a),selected[1]+.65*sin(a),selected[2]) for a in [start+j*(end-start)/30 for j in range(31)]],.018,track)

else:
 cam=camera((0,-23,7),(1.1,0,.35),22.5);background_stars(cam,22.5,1000);sun((-1,-.75,.65),3.2)
 m=bpy.data.materials.new('Superficie planetaria '+THEME);m.use_nodes=True;n=m.node_tree.nodes;l=m.node_tree.links;p=n.get('Principled BSDF');coords,original=warped_coords(n,l,.58,.70 if THEME=='biosfera' else 2.1,4.1 if THEME=='biosfera' else 12.7)
 big=noise_node(n,l,coords,.42,4,.55);small=noise_node(n,l,coords,6,4,.72)
 if THEME=='biosfera':
  color=ramp(n,l,big.outputs['Fac'],[(.20,(.002,.009,.025)),(.475,(.006,.025,.06)),(.492,(.018,.072,.10)),(.505,(.29,.25,.13)),(.517,(.035,.075,.034)),(.575,(.065,.13,.05)),(.67,(.27,.26,.16)),(.76,(.65,.68,.60))]);l.new(color,p.inputs['Base Color'])
  land=node_math(n,l,'GREATER_THAN',big.outputs['Fac'],.505);rough=node_math(n,l,'ADD',node_math(n,l,'MULTIPLY',land,.63),.16);l.new(rough,p.inputs['Roughness']);p.inputs['IOR'].default_value=1.36
  relief=node_math(n,l,'MULTIPLY',small.outputs['Fac'],land);b=n.new('ShaderNodeBump');b.inputs['Strength'].default_value=.45;b.inputs['Distance'].default_value=.10;l.new(relief,b.inputs['Height']);l.new(b.outputs['Normal'],p.inputs['Normal'])
  # Sparse luminous patches occur on land; they are visual fiction, not observations.
  patches=noise_node(n,l,coords,22,2);mask=node_math(n,l,'MULTIPLY',node_math(n,l,'GREATER_THAN',patches.outputs['Fac'],.74),land);p.inputs['Emission Color'].default_value=(.08,.37,.19,1);l.new(node_math(n,l,'MULTIPLY',mask,.10),p.inputs['Emission Strength'])
 else:
  color=ramp(n,l,small.outputs['Fac'],[(.20,(.012,.01,.012)),(.48,(.055,.042,.033)),(.72,(.18,.14,.10)),(.85,(.36,.29,.20))]);l.new(color,p.inputs['Base Color']);p.inputs['Roughness'].default_value=.82
  vor=n.new('ShaderNodeTexVoronoi');vor.feature='DISTANCE_TO_EDGE';vor.inputs['Scale'].default_value=1.75;l.new(coords,vor.inputs['Vector']);lava=ramp(n,l,vor.outputs['Distance'],[(.003,(1,1,1)),(.010,(0,0,0))]);active=ramp(n,l,big.outputs['Fac'],[(.48,(0,0,0)),(.63,(1,1,1))]);p.inputs['Emission Color'].default_value=(1,.13,.008,1);l.new(node_math(n,l,'MULTIPLY',node_math(n,l,'MULTIPLY',lava,active),1.8),p.inputs['Emission Strength'])
  b=n.new('ShaderNodeBump');b.inputs['Strength'].default_value=.65;b.inputs['Distance'].default_value=.12;l.new(small.outputs['Fac'],b.inputs['Height']);l.new(b.outputs['Normal'],p.inputs['Normal'])
 sphere('Pianeta con rilievi e materiali',5.2,m,segments=240,rings=144)
 # Independent cloud geometry, including opacity, self shading and shadows.
 if THEME=='biosfera':
  c=bpy.data.materials.new('Nubi procedurali su strato separato');c.use_nodes=True;n=c.node_tree.nodes;l=c.node_tree.links;n.clear();out=n.new('ShaderNodeOutputMaterial');pr=n.new('ShaderNodeBsdfPrincipled');pr.inputs['Base Color'].default_value=(.92,.95,1,1);pr.inputs['Roughness'].default_value=.9;trans=n.new('ShaderNodeBsdfTransparent');mix=n.new('ShaderNodeMixShader');l.new(trans.outputs[0],mix.inputs[1]);l.new(pr.outputs[0],mix.inputs[2]);l.new(mix.outputs[0],out.inputs['Surface'])
  coords,orig=warped_coords(n,l,.7,1.7,8);large=noise_node(n,l,coords,.75,6,.72);fine=noise_node(n,l,coords,12,4,.72);cover=node_math(n,l,'ADD',node_math(n,l,'MULTIPLY',large.outputs['Fac'],.78),node_math(n,l,'MULTIPLY',fine.outputs['Fac'],.22));alpha=ramp(n,l,cover,[(.52,(0,0,0)),(.67,(1,1,1))]);l.new(alpha,mix.inputs[0]);b=n.new('ShaderNodeBump');b.inputs['Strength'].default_value=.45;b.inputs['Distance'].default_value=.03;l.new(fine.outputs['Fac'],b.inputs['Height']);l.new(b.outputs[0],pr.inputs['Normal']);sphere('Strato nuvoloso',5.225,c,segments=200,rings=128)
 # Thin scattering volume follows an exponential height profile around the sphere.
 atm=bpy.data.materials.new('Atmosfera con densita esponenziale');atm.use_nodes=True;n=atm.node_tree.nodes;l=atm.node_tree.links;n.clear();out=n.new('ShaderNodeOutputMaterial');scatter=n.new('ShaderNodeVolumeScatter');scatter.inputs['Color'].default_value=(.20,.45,.82,1) if THEME=='biosfera' else (.55,.29,.11,1);scatter.inputs['Anisotropy'].default_value=.18
 geo=n.new('ShaderNodeNewGeometry');length=n.new('ShaderNodeVectorMath');length.operation='LENGTH';l.new(geo.outputs['Position'],length.inputs[0]);alt=node_math(n,l,'MAXIMUM',node_math(n,l,'SUBTRACT',length.outputs['Value'],5.2),0);density=node_math(n,l,'MULTIPLY',node_math(n,l,'EXPONENT',node_math(n,l,'MULTIPLY',alt,-35)),2.5 if THEME=='biosfera' else .9);l.new(density,scatter.inputs['Density']);l.new(scatter.outputs[0],out.inputs['Volume']);sphere('Guscio atmosferico',5.33 if THEME=='biosfera' else 5.29,atm,segments=180,rings=96)
 # Moon and a small observation satellite establish depth and scale.
 moonmat=material('Regolite del satellite',(.13,.12,.105),.93);n=moonmat.node_tree.nodes;l=moonmat.node_tree.links;tc=n.new('ShaderNodeTexCoord');tex=noise_node(n,l,tc.outputs['Object'],11,5);b=n.new('ShaderNodeBump');b.inputs['Strength'].default_value=.85;b.inputs['Distance'].default_value=.09;l.new(tex.outputs['Fac'],b.inputs['Height']);l.new(b.outputs[0],n.get('Principled BSDF').inputs['Normal']);sphere('Luna rocciosa',.62,moonmat,(-6.2,4,-2.6),96,48)
 metal=material('Sonda: titanio',(.28,.32,.34),.31,.8);panel=material('Sonda: celle fotovoltaiche',(.018,.055,.13),.24,.6);antenna=emission('Sonda: segnalazione',(.25,.63,.7),1)
 x,y,z=-5.5,-4,-2.3;cube('Modulo sonda',(x,y,z),(.13,.2,.16),metal)
 for side in [-1,1]:cube('Pannello solare',(x+side*.28,y,z),(.35,.22,.015),panel)
 curve('Antenna sonda',[(x,y,z),(x,y,z+.25)],.008,metal);sphere('Luce della sonda',.014,antenna,(x,y,z+.25),12,6)
 if THEME=='primordiale':
  pts=[]
  for i in range(2400):
   t=random.uniform(0,2*pi);r=random.uniform(6.1,7.4);pts.append((cos(t)*r,sin(t)*r*.84,sin(t)*r*.54,random.uniform(.008,.024)))
  star_mesh('Detriti dell anello',pts,material('Polvere dell anello',(.26,.20,.14),.8))

scene.use_nodes=True;n=scene.node_tree.nodes;n.clear();rl=n.new('CompositorNodeRLayers');glow=n.new('CompositorNodeGlare');glow.glare_type='FOG_GLOW';glow.quality='HIGH';glow.threshold=1.8;glow.size=8;out=n.new('CompositorNodeComposite');scene.node_tree.links.new(rl.outputs['Image'],glow.inputs[0]);scene.node_tree.links.new(glow.outputs[0],out.inputs[0])
scene.render.filepath=str(ROOT/'render'/f'{THEME}.png');bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'render'/f'{THEME}.blend'));bpy.ops.render.render(write_still=True)
print('GAIA_COSMOS_COMPLETE',THEME,flush=True)
