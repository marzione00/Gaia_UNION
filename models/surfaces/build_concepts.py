"""Original procedural 3D art studies for GAIA. No generated bitmap assets.
Run with Blender 4.3: blender -b -t 8 --python build_concepts.py -- simbiosi 64 1600
"""
import bpy, math, random, sys, os
from pathlib import Path
from mathutils import Vector, noise
from math import sin, cos, pi, exp, sqrt

ROOT=Path(__file__).resolve().parent
(ROOT/'render').mkdir(exist_ok=True)
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
THEME=args[0] if args else 'simbiosi'; SAMPLES=int(args[1]) if len(args)>1 else 64; WIDTH=int(args[2]) if len(args)>2 else 1600
random.seed(241)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene; scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=SAMPLES;scene.cycles.use_denoising=False
scene.cycles.max_bounces=5;scene.cycles.diffuse_bounces=2;scene.cycles.glossy_bounces=3;scene.cycles.transmission_bounces=3;scene.cycles.volume_bounces=1
scene.cycles.adaptive_threshold=.04;scene.render.resolution_x=WIDTH;scene.render.resolution_y=round(WIDTH*1000/1600);scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.render.film_transparent=False
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=.3

def mat(name,c,metal=0,rough=.5,emit=0):
 m=bpy.data.materials.new(name);m.diffuse_color=(*c,1);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 if emit:p.inputs['Emission Color'].default_value=(*c,1);p.inputs['Emission Strength'].default_value=emit
 return m
def noise_mat(name,colors,scale=3,rough=.8,metal=0):
 m=mat(name,colors[1],metal,rough);n=m.node_tree.nodes;l=m.node_tree.links;p=n.get('Principled BSDF');tex=n.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=scale;tex.inputs['Detail'].default_value=5;tex.inputs['Roughness'].default_value=.75
 ramp=n.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.25;ramp.color_ramp.elements[0].color=(*colors[0],1);ramp.color_ramp.elements[1].position=.75;ramp.color_ramp.elements[1].color=(*colors[2],1);ramp.color_ramp.elements.new(.5).color=(*colors[1],1)
 coord=n.new('ShaderNodeTexCoord');l.new(coord.outputs['Object'],tex.inputs['Vector']);l.new(tex.outputs['Fac'],ramp.inputs[0]);l.new(ramp.outputs[0],p.inputs['Base Color']);bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.28;bump.inputs['Distance'].default_value=.07;l.new(tex.outputs['Fac'],bump.inputs['Height']);l.new(bump.outputs[0],p.inputs['Normal']);return m
ivory=mat('Ceramica minerale',(.57,.62,.55),.45,.3)
dark=mat('Titanio scuro',(.035,.059,.062),.65,.32)
glass=mat('Vetro ottico blu',(.018,.105,.13),.75,.19)
gold=mat('Ottone satinato',(.48,.28,.075),.72,.32)
red=mat('Ceramica ossido',(.28,.045,.018),.4,.38)
violet=noise_mat('Chitina viola',[(.045,.018,.06),(.15,.055,.22),(.29,.13,.35)],8,.4,.35)
bio=mat('Fosforescenza simbionte',(.27,.8,.4),.2,.38,2.5)
cyan=mat('Luce di laboratorio',(.15,.61,.71),.25,.25,3)
amber=mat('Segnaletica ambra',(.8,.37,.055),.3,.25,3)
white=mat('Ceramica chiara',(.68,.71,.68),.3,.27)

def mesh(name,vs,fs,material,smooth=False):
 m=bpy.data.meshes.new(name);m.from_pydata(vs,[],fs);m.update();o=bpy.data.objects.new(name,m);scene.collection.objects.link(o);m.materials.append(material)
 if smooth:
  for p in m.polygons:p.use_smooth=True
 return o
def cube(name,p,sz,material,bevel=.06):
 bpy.ops.mesh.primitive_cube_add(size=1,location=p);o=bpy.context.object;o.name=name;o.scale=sz;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(material)
 if bevel:mod=o.modifiers.new('Spigoli lavorati','BEVEL');mod.width=bevel;mod.segments=2
 return o
def cyl(name,p,r,h,material,vertices=32,r2=None):
 bpy.ops.mesh.primitive_cone_add(vertices=vertices,radius1=r,radius2=r if r2 is None else r2,depth=h,location=p);o=bpy.context.object;o.name=name;o.data.materials.append(material)
 mod=o.modifiers.new('Bordi smussati','BEVEL');mod.width=.035;mod.segments=2
 for f in o.data.polygons:f.use_smooth=True
 return o
def curve(name,pts,r,material,closed=False):
 c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.resolution_u=1;c.bevel_depth=r;c.bevel_resolution=2;s=c.splines.new('POLY');s.points.add(len(pts)-1)
 for p,q in zip(s.points,pts):p.co=(*q,1)
 s.use_cyclic_u=closed;o=bpy.data.objects.new(name,c);scene.collection.objects.link(o);o.data.materials.append(material);return o
def ring(name,p,r,material,width=.025,N=96):return curve(name,[(p[0]+r*cos(t*2*pi/N),p[1]+r*sin(t*2*pi/N),p[2]) for t in range(N)],width,material,True)
def ellipsoid(name,p,sz,material,segments=24):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=segments,ring_count=12,location=p);o=bpy.context.object;o.name=name;o.scale=sz;o.data.materials.append(material)
 for f in o.data.polygons:f.use_smooth=True
 return o
def set_camera():
 bpy.ops.object.camera_add(location=(26,-38,28));c=bpy.context.object;c.name='GAIA confronto - camera comune';c.rotation_euler=(Vector((0,2,1.8))-c.location).to_track_quat('-Z','Y').to_euler();c.data.type='ORTHO';c.data.ortho_scale=49;scene.camera=c
set_camera()
world=bpy.data.worlds.new('Atmosfera extraterrestre');world.use_nodes=True;scene.world=world
world.node_tree.nodes['Background'].inputs['Color'].default_value=(.18,.28,.33,1);world.node_tree.nodes['Background'].inputs['Strength'].default_value=.45
def area(name,p,power,c,size,target=(0,0,0)):
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.color=c;d.shape='DISK';d.size=size;o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=p;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
sun=bpy.data.lights.new('Sole remoto','SUN');sun.energy=2.4;sun.angle=.065;sun.color=(1,.84,.64);o=bpy.data.objects.new('Sole remoto',sun);scene.collection.objects.link(o);o.rotation_euler=(.50,-.60,-.4)
area('Luce diffusa del cielo',(3,-8,20),1900,(.48,.75,1),20)

def n(x,y,s=1):return noise.fractal(Vector((x*s,y*s,3.7)),1.0,2.0,4)
def height(x,y):
 if THEME=='marea':return -2.5 + max(0, n(x,y,.095)-.12)*8
 d=sqrt((x+3)**2+(y-1)**2);blend=min(1,max(0,(d-6)/11));base=.10+.07*n(x,y,.4)
 hills=(.7+2.5*n(x,y,.075)+.7*n(x,y,.24))*blend
 ridge=max(0,(y-8)/16)*max(0,n(x,y,.13)+.45)*6
 return base+hills+ridge
if THEME=='simbiosi':ground=noise_mat('Basalte, lichens et mousse',[(.024,.045,.029),(.08,.12,.075),(.24,.245,.13)],2.8)
elif THEME=='esodo':ground=noise_mat('Regolite e argilla',[(.095,.044,.023),(.25,.135,.065),(.54,.32,.16)],3.2)
else:ground=noise_mat('Basalto oceanico',[(.015,.032,.032),(.05,.08,.068),(.14,.16,.12)],5)
N=210;extent=90;vs=[];fs=[]
for j in range(N+1):
 y=(j/N-.5)*extent
 for i in range(N+1):
  x=(i/N-.5)*extent;vs.append((x,y,height(x,y)))
for j in range(N):
 for i in range(N):
  k=j*(N+1)+i;fs.append((k,k+1,k+N+2,k+N+1))
mesh('Continente continuo',vs,fs,ground,True)

def rock_model():
 bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2,radius=1,location=(0,0,-100));o=bpy.context.object;o.name='Forma minerale'
 for v in o.data.vertices:v.co*=.8+.3*noise.noise(v.co*2)
 o.data.materials.append(ground);return o
rock=rock_model()
for k in range(240):
 x=random.uniform(-36,36);y=random.uniform(-25,35)
 if (x+3)**2+(y-1)**2<55:continue
 h=height(x,y);s=random.uniform(.2,1.1);ob=bpy.data.objects.new('Affioramento',rock.data);scene.collection.objects.link(ob);ob.location=(x,y,h+.1);ob.scale=(s,s*.75,s*random.uniform(.3,1.6));ob.rotation_euler=(random.random(),random.random(),random.random()*6)

def road(a,b,material=dark,width=.15):
 pts=[]
 for i in range(50):
  t=i/49;x=a[0]*(1-t)+b[0]*t;y=a[1]*(1-t)+b[1]*t;pts.append((x,y,max(height(x,y),.05)+.10))
 curve('Connessione tra distretti',pts,width,material)

def laboratory(p,scale=1,mode='normal'):
 x,y,z=p;S=scale
 cyl('Basamento esagonale',(x,y,z+.12*S),1.3*S,.24*S,dark,6)
 if mode=='organic':
  ellipsoid('Scocca bioceramica',(x,y,z+.55*S),(.95*S,.68*S,.65*S),ivory)
  ellipsoid('Lente biosensore',(x,y-.4*S,z+.67*S),(.62*S,.37*S,.24*S),glass)
  for j in range(5):
   t=j*pi/4;curve('Costola simbiotica',[(x+cos(t)*.9*S,y+sin(t)*.65*S,z+.28*S),(x+cos(t)*.55*S,y+sin(t)*.4*S,z+1.05*S),(x,y,z+1.1*S)],.035*S,violet)
  ring('Anello bioattivo',(x,y,z+.27*S),1.23*S,bio,.018*S,6)
 else:
  cube('Modulo abitato',(x,y,z+.65*S),(1.65*S,1.1*S,1.1*S),white)
  cube('Fascia ottica',(x,y-.56*S,z+.72*S),(1.4*S,.035*S,.25*S),glass,.01)
  cube('Lamelle radiatore',(x,y+.2*S,z+1.22*S),(1.35*S,.6*S,.10*S),dark,.025)
  for j in range(7):cube('Radiatore',(x-.57*S+j*.19*S,y+.2*S,z+1.30*S),(.055*S,.65*S,.10*S),ivory,.01)
  for j in range(4):cube('Luce interna',(x-.5*S+j*.33*S,y-.58*S,z+.72*S),(.13*S,.015*S,.07*S),amber,.002)

# The mapping layer is embedded in the landscape, not raised game-board pieces.
grid=mat('Incisioni cartografiche',(.24,.36,.32),.35,.6)
for row in range(-7,9):
 for col in range(-11,12):
  r=1.43;x=col*sqrt(3)*r+(row%2)*sqrt(3)*r*.5-3;y=row*1.5*r
  if (x+3)**2+(y-1)**2<28 or abs(x)>24 or y>21:continue
  if random.random()>.48:continue
  pts=[]
  for j in range(6):
   a=j*pi/3+pi/6;b=(j+1)*pi/3+pi/6
   for k in range(6):
    t=k/6;xx=x+r*((1-t)*cos(a)+t*cos(b));yy=y+r*((1-t)*sin(a)+t*sin(b));pts.append((xx,yy,max(height(xx,yy),-.05)+.065))
  if THEME!='marea':curve('Griglia esagonale topografica',pts,.012,grid,True)

def mushroom_model():
 vs=[];fs=[];U=30;V=12
 for j in range(V+1):
  t=j/V;r=.06+(sin(t*pi*.75)**1.2)*.82;z=1.15+.32*cos(t*pi/2)+.05*sin(t*18)
  for i in range(U):
   a=i*2*pi/U;rr=r*(1+.09*sin(a*7+t*2));vs.append((rr*cos(a),rr*sin(a),z+.07*sin(a*7)*t))
 for j in range(V):
  for i in range(U):k=j*U+i;fs.append((k,j*U+(i+1)%U,(j+1)*U+(i+1)%U,k+U))
 o=mesh('Corolla xeno',vs,fs,violet,True);o.location=(0,0,-100);return o

if THEME=='simbiosi':
 sun.energy=1.7;sun.color=(.85,1,.68);world.node_tree.nodes['Background'].inputs['Color'].default_value=(.11,.20,.19,1)
 cap=mushroom_model();stemmat=noise_mat('Fibre vegetali',[(.018,.032,.027),(.08,.115,.065),(.19,.23,.11)],5,.7)
 stem=cyl('Stelo sorgente',(0,0,-100),.13,1.4,stemmat,8,r2=.05)
 for i in range(430):
  x=random.uniform(-30,30);y=random.uniform(-22,30)
  if (x+3)**2+(y-1)**2<65:continue
  if n(x,y,.14)<-.05:continue
  size=random.uniform(.35,1.35);z=height(x,y)
  for name,proto,zz in [('Flora a ventaglio',cap,z),('Stelo',stem,z+.6*size)]:
   ob=bpy.data.objects.new(name,proto.data);scene.collection.objects.link(ob);ob.location=(x,y,zz);ob.scale=(size,size,size);ob.rotation_euler[2]=random.random()*6
  if i%5==0:ellipsoid('Spora luminosa',(x,y,z+size*1.35),(.10*size,.1*size,.08*size),bio,12)
 cx,cy=-3,1;z=.22
 cyl('Fondazione simbiotica',(cx,cy,z),4.1,.35,dark,12)
 ring('Circuito biologico',(cx,cy,z+.23),3.95,bio,.035)
 ellipsoid('Nucleo di biosfera',(cx,cy,3.25),(1.35,1.35,2.6),glass)
 for k in range(8):
  a=k*pi/4;vs=[];fs=[];edge=[]
  for j in range(46):
   t=j/45;rr=3.7-2.8*sin(t*pi*.70)+.6*t*t;ang=a+t*.48;zz=.32+7.2*t;w=.12+.75*sin(pi*t)**.8;edge.append((cx+rr*cos(ang),cy+rr*sin(ang),zz))
   for side in range(7):
    u=side/3-1;rad=rr+.18*(1-u*u);vs.append((cx+rad*cos(ang)-u*w*sin(ang),cy+rad*sin(ang)+u*w*cos(ang),zz))
  for j in range(45):
   for s in range(6):q=j*7+s;fs.append((q,q+1,q+8,q+7))
  blade=mesh('Costola di organismo-architettura',vs,fs,violet,True);mod=blade.modifiers.new('Spessore chitina','SOLIDIFY');mod.thickness=.10
  curve('Vena fotobiologica',edge,.028,bio)
 for k in range(12):
  a=k*2*pi/12;rr=5+random.random()*1.8;x=cx+cos(a)*rr;y=cy+sin(a)*rr;laboratory((x,y,max(height(x,y),.1)),random.uniform(.65,1.0),'organic');road((cx,cy),(x,y),ivory,.07)
 for a in [0,2,4]:
  pts=[(cx+cos(a+t*.4)*(4+t*8),cy+sin(a+t*.4)*(4+t*8),.1+height(cx+cos(a+t*.4)*(4+t*8),cy+sin(a+t*.4)*(4+t*8))) for t in [j/60 for j in range(61)]];curve('Radice nel territorio',pts,.13,violet)
 # Low local volumes provide depth without painting fog into the image.
 fogmat=bpy.data.materials.new('Miasma tenue');fogmat.use_nodes=True;ns=fogmat.node_tree.nodes;ns.clear();out=ns.new('ShaderNodeOutputMaterial');vol=ns.new('ShaderNodeVolumePrincipled');vol.inputs['Color'].default_value=(.24,.43,.23,1);vol.inputs['Density'].default_value=.055;vol.inputs['Anisotropy'].default_value=.25;fogmat.node_tree.links.new(vol.outputs['Volume'],out.inputs['Volume'])
 for p,sz in [((-15,7,1.4),(11,9,2.3)),((9,9,1.7),(10,8,2.2)),((0,20,2.8),(19,7,3.2))]:ellipsoid('Banca di miasma',p,sz,fogmat)

elif THEME=='esodo':
 sun.energy=2.7;sun.color=(1,.78,.52);world.node_tree.nodes['Background'].inputs['Color'].default_value=(.30,.24,.19,1)
 # Stepped settlement, vertical civic axis and a monumental open gate.
 cx,cy=-3,1
 for r,z in [(5.1,.25),(4.4,.52),(3.7,.79)]:cyl('Terrazza civica',(cx,cy,z),r,.38,ivory,6)
 for side in [-1,1]:
  x=cx+side*2.0
  cube('Pilone del portale',(x,cy,3.35),(1.1,1.55,5.7),white,.12)
  cube('Pannello verticale ossido',(x,cy-.80,3.7),(.33,.04,4.5),red,.02)
  cube('Coronamento',(x,cy,6.35),(1.5,1.9,.32),ivory)
 cube('Trave del portale',(cx,cy,6.12),(5.2,1.3,.45),white)
 cube('Fregio ambra',(cx,cy-.68,6.13),(4.8,.03,.07),amber,.01)
 for k in range(11):
  x=cx-2.3+k*.46;cube('Alette monumentali',(x,cy,6.55),(.09,1.7,.45),gold,.02)
 for side in [-1,1]:
  for j in range(5):
   x=cx+side*(3.6+j*.18);y=cy-3+j*1.4;h=1.8+random.random()*1.8
   cube('Torre coloniale',(x,y,.9+h/2),(1.05,.9,h),white)
   for zz in [.9+k*.44 for k in range(1,int(h/.44))]:cube('Finestratura continua',(x,y-.46,zz),(.83,.015,.10),glass,.005)
   cube('Accento verticale',(x+side*.52,y,.9+h/2),(.035,.36,h*.85),red,.01)
 for k in range(24):
  a=k*2*pi/24;rr=random.uniform(6,10);x=cx+cos(a)*rr;y=cy+sin(a)*rr;laboratory((x,y,max(height(x,y),.1)),random.uniform(.65,1.1));road((cx,cy),(x,y),dark,.13)
 # Terraced research plots with parallel agronomic strips.
 for k in range(5):
  x=-14+k*1.3;y=-4
  cube('Modulo agrario',(x,y,height(x,y)+.15),(.9,5,.20),dark,.025)
  for j in range(8):cube('Coltura protetta',(x,y-2.1+j*.6,height(x,y)+.3),(.66,.25,.14),mat('Coltura'+str(k)+str(j),(.12,.19,.065)),.035)
 for x,y in [(9,-1),(-12,9),(6,10)]:
  cyl('Antenna di ricerca',(x,y,height(x,y)+2),.10,4,ivory,12);ellipsoid('Radome',(x,y,height(x,y)+4),(.65,.65,.4),white)

else:
 sun.energy=1.9;sun.color=(.78,.91,1);world.node_tree.nodes['Background'].inputs['Color'].default_value=(.12,.24,.30,1)
 area('Riflesso del cielo sull oceano',(-18,24,32),23000,(.62,.82,1),22)
 water=mat('Oceano con riflessione',(.015,.085,.105),.38,.20);p=water.node_tree.nodes.get('Principled BSDF');p.inputs['IOR'].default_value=1.333
 ns=water.node_tree.nodes;links=water.node_tree.links;tex=ns.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=4.8;tex.inputs['Detail'].default_value=3;tex.inputs['Roughness'].default_value=.65;coord=ns.new('ShaderNodeTexCoord');links.new(coord.outputs['Object'],tex.inputs['Vector']);bump=ns.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.4;bump.inputs['Distance'].default_value=.10;links.new(tex.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs[0],p.inputs['Normal'])
 cube('Superficie oceanica',(0,0,-.18),(160,160,.12),water,0)
 # Floating modules, layered seawalls, connecting bridges and scientific towers.
 centers=[(-3,1,3.2),(-9,-2,2),(-5,-6,2),(3,-3,2.3),(4,5,2.5),(-7,8,2.2)]
 for idx,(x,y,r) in enumerate(centers):
  cyl('Piattaforma galleggiante',(x,y,.16),r,.55,dark,6)
  cyl('Coperta in ceramica',(x,y,.48),r*.94,.12,ivory,6)
  ring('Perimetro illuminato',(x,y,.58),r*.93,cyan,.022,6)
  for k in range(6):
   a=k*pi/3;xx=x+cos(a)*r*.78;yy=y+sin(a)*r*.78;cyl('Parabordo',(xx,yy,.03),.2,.7,red,10)
  if idx==0:
   for k in range(6):
    a=k*pi/3;xx=x+cos(a)*1.5;yy=y+sin(a)*1.5;h=2.7+.8*(k%3);cube('Torre oceanografica',(xx,yy,.58+h/2),(.83,.83,h),white)
    for j in range(5):cube('Luce tra i ponti',(xx,yy-.425,1+j*.45),(.58,.018,.10),cyan,.005)
   cyl('Spina centrale',(x,y,3.5),.48,5.8,dark,12,r2=.18)
   for z in [3,4.5,6.0]:ring('Ricevitore oceanico',(x,y,z),1.1,ivory,.09)
   curve('Antenna orbitale',[(x,y,5),(x,y,8)],.035,ivory)
  else:
   laboratory((x,y,.55),1.0)
   for q in [-1,1]:cube('Serra idroponica',(x+q*.8,y+1,.95),(.6,1.2,.65),glass,.15)
 for a,b in [(0,1),(0,2),(0,3),(0,4),(0,5),(1,2),(3,4)]:
  x,y,_=centers[a];xx,yy,_=centers[b];curve('Passerella sopra acqua',[(x,y,.66),(xx,yy,.66)],.20,dark);curve('Guida luminosa',[(x,y,.85),(xx,yy,.85)],.022,cyan)
 for k in range(20):
  x=random.uniform(-25,25);y=random.uniform(-20,25)
  if (x+3)**2+(y-1)**2<120:continue
  # Emergent basalt stacks with a spiral of bioluminescent marine life.
  h=random.uniform(.7,3.5);ob=bpy.data.objects.new('Ago di basalto',rock.data);scene.collection.objects.link(ob);ob.location=(x,y,h*.35);ob.scale=(.7,.8,h)
  pts=[(x+cos(t*3*pi)*.72,y+sin(t*3*pi)*.72,-.05+t*h*.5) for t in [j/45 for j in range(46)]];curve('Organismo costiero',pts,.055,violet)
 for x,y in [(-14,-9),(10,8),(13,-2)]:
  ring('Sensore pelagico',(x,y,-.04),2.7,cyan,.018)
  cyl('Boa scientifica',(x,y,.22),.23,.7,gold,8)

# Shared distant haze, physically rendered as volume.
haze=bpy.data.materials.new('Profondita atmosferica');haze.use_nodes=True;nodes=haze.node_tree.nodes;nodes.clear();out=nodes.new('ShaderNodeOutputMaterial');volume=nodes.new('ShaderNodeVolumePrincipled');volume.inputs['Density'].default_value=.006;volume.inputs['Color'].default_value=(.33,.40,.37,1) if THEME!='esodo' else (.57,.37,.20,1);volume.inputs['Anisotropy'].default_value=.2;haze.node_tree.links.new(volume.outputs['Volume'],out.inputs['Volume']);cube('Atmosfera locale',(0,10,9),(85,85,22),haze,0)

# Gentle optical bloom from actual emissive geometry, no AI denoising.
scene.use_nodes=True;nodes=scene.node_tree.nodes;nodes.clear();rl=nodes.new('CompositorNodeRLayers');glare=nodes.new('CompositorNodeGlare');glare.glare_type='FOG_GLOW';glare.quality='HIGH';glare.threshold=2;glare.size=7;comp=nodes.new('CompositorNodeComposite');scene.node_tree.links.new(rl.outputs['Image'],glare.inputs['Image']);scene.node_tree.links.new(glare.outputs['Image'],comp.inputs['Image'])
scene.render.filepath=str(ROOT/'render'/f'{THEME}.png')
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'render'/f'{THEME}.blend'))
bpy.ops.render.render(write_still=True)
print('GAIA_RENDER_COMPLETE',THEME,scene.render.filepath,flush=True)
