import { cosmicField } from './cosmic-shader.js';
// All environments are evaluated in 3D. No painted backgrounds or generated images.
const noise = `
float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float s=0.,a=.53;for(int i=0;i<5;i++){s+=a*noise3(p);p=p*2.03+vec3(7.1,3.2,5.8);a*=.48;}return s;}
vec3 film(vec3 x){return pow(clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.),vec3(1./2.2));}
`;
export const vsMesh = `#version 300 es
layout(location=0) in vec3 aPos;layout(location=1) in vec3 aNormal;layout(location=2) in vec2 aUV;layout(location=3) in vec4 aColor;layout(location=4) in vec4 aPBR;
// Per-instance data for the planet phenomena: position and scale, colour and heading (or phase).
layout(location=5) in vec4 aInst;layout(location=6) in vec4 aInstC;
uniform mat4 uVP,uModel,uLightVP,uReflectionVP;uniform highp int uMaterial,uInstanced;uniform vec4 uMotion;uniform float uTime;out vec3 vNormal,vWorld,vLocal;out vec2 vUV;out vec4 vColor,vPBR,vShadow,vReflection;
vec3 turn(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}
void main(){vec3 vertex=aPos,normal=aNormal;vec4 color=aColor;if(uMaterial==10&&aPBR.w>1.5&&aPBR.w<2.5)vertex.xz*=8.;
 if(uInstanced>0){
  // 1 static (optional sway), 2 rising particles, 3 animals walking on small circles, 4 flyers on wider circles with flapping wings.
  vec3 base=aInst.xyz;float s=aInst.w,a=aInstC.w;
  if(uInstanced==1&&uMotion.z>0.)vertex.x+=sin(uTime*1.3+a*3.)*uMotion.z*max(vertex.y,0.);
  if(uInstanced==2){float t=fract(uTime*uMotion.x+a*.1592);base.y+=t*uMotion.y;base.x+=sin(t*6.283+a)*uMotion.z;s*=(1.-t)*(.4+t*2.2);}
  if(uInstanced==3){float w=uTime*uMotion.x*(.7+.6*fract(a*7.13))+a;base.x+=cos(w)*uMotion.y;base.z+=sin(w)*uMotion.y;a=atan(-cos(w),-sin(w));base.y+=abs(sin(w*9.))*.06;}
  if(uInstanced==4){float w=uTime*uMotion.x*(.7+.6*fract(a*7.13))+a;base.x+=cos(w)*uMotion.y;base.z+=sin(w)*uMotion.y;base.y+=sin(w*2.+a)*.8;vertex.y+=sin(uTime*7.+a*5.)*max(abs(vertex.z)-.12,0.)*.7;a=atan(-cos(w),-sin(w));}
  vertex=turn(vertex,a)*s+base;normal=turn(normal,a);
  // The instance colour replaces only the white parts of a mesh (petals, bodies, water), so centres, stems and legs keep their own colour.
  if(min(color.r,min(color.g,color.b))>.97)color.rgb*=aInstC.rgb;
 }
 // Open sea of the phenomenon worlds: tide offset plus three travelling waves.
 if(uMaterial==18&&uInstanced==0){vec2 q=vertex.xz;float t=uTime;vertex.y+=uMotion.x+uMotion.y*(sin(q.x*.21+t*.9)*.5+sin(q.x*.07+q.y*.18-t*.6)*.35+sin(q.y*.33+t*1.3)*.15);
  float dx=uMotion.y*(cos(q.x*.21+t*.9)*.105+cos(q.x*.07+q.y*.18-t*.6)*.0245),dz=uMotion.y*(cos(q.x*.07+q.y*.18-t*.6)*.063+cos(q.y*.33+t*1.3)*.0495);normal=normalize(vec3(-dx,1.,-dz));}
 vec4 p=uModel*vec4(vertex,1.);vWorld=p.xyz;vLocal=aPos;vNormal=normalize(mat3(uModel)*normal);vUV=aUV;vColor=color;vPBR=aPBR;vShadow=uLightVP*p;vReflection=uReflectionVP*p;gl_Position=uVP*p;}`;
export const fsMesh = `#version 300 es
precision highp float;
in vec3 vNormal,vWorld,vLocal;in vec2 vUV;in vec4 vColor,vPBR,vShadow,vReflection;out vec4 outColor;
uniform sampler2D uTex,uShadow,uReflection;uniform vec3 uEye,uLight,uCenter,uFogColor,uAtmosColor;uniform vec4 uTint;
uniform int uOccluderCount;uniform vec4 uOccluder[4];
uniform float uTexWeight,uOpacity,uRim,uEmission,uTime,uSeed,uRadius,uFog,uHasShadow,uMist,uClipBelow,uOcean,uDisguise;uniform vec3 uLightColor;uniform highp int uMaterial;
${noise}
float solarVisibility(vec3 point,vec3 light){float visibility=1.;for(int k=0;k<4;k++){if(k>=uOccluderCount)break;vec3 delta=uOccluder[k].xyz-point;float along=dot(delta,light);if(along>0.){float impact=length(delta-light*along),r=uOccluder[k].w;visibility*=smoothstep(r*.94,r*1.06,impact);}}return visibility;}
float shadow(vec3 n,vec3 l){if(uHasShadow<.5)return 1.;vec3 p=vShadow.xyz/vShadow.w*.5+.5;if(any(lessThan(p,vec3(0)))||any(greaterThan(p,vec3(1))))return 1.;float b=max(.00065,.0014*(1.-dot(n,l))),s=0.;vec2 texel=1./vec2(textureSize(uShadow,0));for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)s+=p.z-b<texture(uShadow,p.xy+vec2(x,y)*texel).r?1.:.24;return s/9.;}
vec3 shade(vec3 c,vec3 n,vec3 l,vec3 v,float metal,float rough,float visibility){
 float ndl=max(dot(n,l),0.),ndv=max(dot(n,v),.001);vec3 h=normalize(l+v);float ndh=max(dot(n,h),0.),vdh=max(dot(v,h),0.);
 float a=max(.045,rough*rough),a2=a*a,den=ndh*ndh*(a2-1.)+1.;float D=a2/(3.141593*den*den),k=(rough+1.)*(rough+1.)/8.;float G=ndl/(ndl*(1.-k)+k)*ndv/(ndv*(1.-k)+k);vec3 F=mix(vec3(.04),c,metal)+(1.-mix(vec3(.04),c,metal))*pow(1.-vdh,5.);
 vec3 ambient=mix(vec3(.13,.15,.18),vec3(.29,.35,.39),n.y*.5+.5)*c;
 return ambient+(c*(1.-metal)*(1.-F)+D*G*F/max(4.*ndl*ndv,.001))*ndl*visibility*2.0;
}
void main(){
 if(vWorld.y<uClipBelow)discard;
 vec3 n=normalize(vNormal),l=normalize(uLight),v=normalize(uEye-vWorld),p=normalize(vLocal),c=vColor.rgb*uTint.rgb;float alpha=uOpacity*vColor.a;
 // Flat colour for map markers and orbit lines: the tint is the colour, independent of the light.
 if(uMaterial==16){outColor=vec4(uTint.rgb*(.82+.18*abs(dot(n,v))),alpha);return;}
 // Water of the phenomenon worlds (sea and lakes): colour from the instance or the tint, fresnel and sun glint.
 if(uMaterial==18){c=pow(c,vec3(2.2));float a1=vWorld.x*1.7+vWorld.z*.9+uTime*.7,b1=vWorld.z*2.3-vWorld.x*.6-uTime*.5;vec3 nn=normalize(n+vec3(cos(a1)*.05+cos(b1*1.7)*.02,0,sin(b1)*.05+sin(a1*1.9)*.02));
  float fres=pow(1.-max(0.,dot(nn,v)),4.),glint=pow(max(dot(reflect(-l,nn),v),0.),90.);vec3 col=(c*(.42+.62*max(dot(nn,l),0.)))*uLightColor+vec3(.16,.24,.3)*fres*.6+vec3(1.9,1.7,1.4)*glint*uLightColor;
  float fog=1.-exp(-length(uEye-vWorld)*uFog*.8);col=mix(film(col*.78),uFogColor,clamp(fog,0.,.8));outColor=vec4(col,alpha*(.86+.14*fres));return;}
 // Soft puffs (steam, spores): opaque towards the centre of each small sphere.
 if(uMaterial==19){float f=pow(max(dot(n,v),0.),2.6);outColor=vec4(film(c*(.55+.45*max(dot(n,l),0.))),alpha*f);return;}
 // Star glow: transparent at the rim of the sphere, denser towards the centre of the disc.
 if(uMaterial==17){float f=dot(n,v);if(f<0.)discard;outColor=vec4(uTint.rgb,alpha*pow(f,2.4)*.6);return;}
 if(uMaterial==6){
  if(dot(n,v)<0.)discard;
  vec3 ro=uEye-uCenter,rd=-v;float b=dot(ro,rd),rr=uRadius*1.028,disc=b*b-dot(ro,ro)+rr*rr;if(disc<0.)discard;
  float nearT=max(0.,-b-sqrt(disc)),farT=-b+sqrt(disc),ground=b*b-dot(ro,ro)+uRadius*uRadius;
  if(ground>0.){float hit=-b-sqrt(ground);if(hit>0.)farT=min(farT,hit);}
  float dt=max(0.,farT-nearT)/14.,opt=0.;vec3 scatter=vec3(0);
  for(int i=0;i<14;i++){vec3 q=ro+rd*(nearT+(float(i)+.5)*dt);float h=max(0.,length(q)/uRadius-1.);float density=exp(-h*155.);float sun=smoothstep(-.13,.18,dot(normalize(q),l))*solarVisibility(q+uCenter,l);vec3 tint=mix(vec3(.34,.12,.04),uAtmosColor,sun);float d=density*dt/uRadius*6.;scatter+=exp(-opt)*d*tint*(.1+sun*1.5);opt+=d;}
  alpha=(1.-exp(-opt))*.92;outColor=vec4(pow(clamp(scatter/max(alpha,.001),0.,1.),vec3(.65)),alpha*uOpacity);return;
 }
 if(uMaterial==5){if(dot(n,v)<0.)discard;float a=texture(uTex,vUV).r;float sun=max(0.,dot(n,l))*solarVisibility(vWorld,l);alpha*=smoothstep(.12,.95,a)*.84;outColor=vec4(film(vec3(.001)+vec3(1.)*sun),alpha);return;}
 if(uMaterial==12||uMaterial==15){
  if(uMaterial==15)l=normalize(uCenter-vWorld);
  vec2 uv=uDisguise>.5?vec2(1.-vUV.x,1.-vUV.y):vUV;vec3 albedo=texture(uTex,uv).rgb;float water=uOcean*smoothstep(.01,.12,albedo.b-max(albedo.r,albedo.g*.85));
  if(uDisguise>.5){float a=uDisguise>1.5?.55:-.62;vec3 k=vec3(.57735);albedo=clamp(albedo*cos(a)+cross(k,albedo)*sin(a)+k*dot(k,albedo)*(1.-cos(a)),0.,1.);}
  vec3 base=pow(albedo,vec3(2.2))*uTint.rgb;c=shade(base,n,l,v,0.,mix(.88,.18,water),solarVisibility(vWorld,l));
  float day=smoothstep(-.12,.08,dot(n,l));c*=mix(.035,1.,day);
  c+=water*pow(max(dot(reflect(-l,n),v),0.),110.)*vec3(.65,.62,.55)*day;
  if(uMaterial==15)c*=.12;
  outColor=vec4(film(c*.8),alpha);return;
 }
 if(uMaterial==14){float core=pow(abs(dot(n,v)),.7);outColor=vec4(uTint.rgb,alpha*pow(1.-vUV.y,1.7)*core*.42);return;}
 if(uMaterial==13){vec4 tex=texture(uTex,vUV);alpha*=tex.a;float sun=.25+.75*abs(dot(n,l));outColor=vec4(tex.rgb*sun,alpha);return;}
 if(uMaterial==9){float cells=fbm(p*14.+vec3(0,uTime*.03,0)),grain=noise3(p*95.);float limb=.48+.52*pow(max(0.,dot(n,v)),.4);vec3 hot=mix(uTint.rgb*vec3(1.,.62,.27),vec3(1.,.94,.73)*uTint.rgb,.3+cells*.7);outColor=vec4(film(hot*(1.5+cells+grain*.24)*limb),1);return;}
 if(uMaterial==11){if(dot(n,v)<0.)discard;float rim=pow(1.-max(0.,dot(n,v)),3.4);float flame=.65+.35*noise3(p*12.+uTime*.02);outColor=vec4(uTint.rgb,alpha*rim*flame*.40);return;}
 if(uMaterial==10){
  float kind=vPBR.w,rough=clamp(vPBR.y,.08,1.),metal=clamp(vPBR.x,0.,1.);vec3 base=max(c,vec3(0));
  if(kind<1.5){float grain=fbm(vWorld*.7);base*=.5+grain*1.0;base*=mix(vec3(.72,.80,.64),vec3(1.12,1.08,.93),smoothstep(.34,.63,fbm(vWorld*2.5)));vec3 dp1=dFdx(vWorld),dp2=dFdy(vWorld),r1=cross(dp2,n),r2=cross(n,dp1);float det=dot(dp1,r1),h=noise3(vWorld*4.)*.013;n=normalize(n-sign(det)*(dFdx(h)*r1+dFdy(h)*r2)/max(abs(det),.00001));}
  if(kind>1.5&&kind<2.5){float a=vWorld.x*2.3+vWorld.z*1.45+uTime*.48,b=vWorld.z*3.6-vWorld.x*.7-uTime*.32;n=normalize(n+vec3(cos(a)*.036+cos(b*1.8)*.012,0,sin(b)*.037+sin(a*2.1)*.014));base=vec3(.008,.046,.065);rough=.16;metal=.05;}
  c=shade(base,n,l,v,metal,rough,shadow(normalize(vNormal),l))*uLightColor;
  if(kind>1.5&&kind<2.5){float fres=pow(1.-max(0.,dot(n,v)),5.);c+=vec3(.2,.33,.38)*(.12+fres*.65);c+=pow(max(dot(reflect(-l,n),v),0.),120.)*vec3(2.1,1.8,1.4);}
  c+=base*max(vPBR.z,uEmission)*1.4;
  if(kind>2.5&&kind<3.5)c+=base*max(0.,dot(-n,l))*.8;
  float distanceToEye=length(uEye-vWorld),heightDensity=exp(-max(vWorld.y,0.)*.12);float fog=1.-exp(-distanceToEye*uFog*(.45+.55*heightDensity));
  c=film(c*(kind>3.5?.76:.48));if(kind>1.5&&kind<2.5){vec2 uv=vReflection.xy/vReflection.w*.5+.5;uv+=n.xz*.018;vec3 reflection=texture(uReflection,clamp(uv,.002,.998)).rgb;float f=.28+.48*pow(1.-max(0.,dot(n,v)),3.);c=mix(c,reflection,f);}
  c=mix(c,uFogColor,clamp(fog,0.,.84));
  if(uMist>.5){float optical=0.;for(int j=0;j<8;j++){vec3 q=mix(uEye,vWorld,(float(j)+.5)/8.);vec3 a=(q-vec3(-15,1.4,-7))/vec3(11,2.3,9),b=(q-vec3(9,1.7,-9))/vec3(10,2.2,8),d=(q-vec3(0,2.8,-20))/vec3(19,3.2,7);optical+=(exp(-dot(a,a)*2.)+exp(-dot(b,b)*2.)+exp(-dot(d,d)*2.))*(.65+.35*noise3(q*.3+uTime*.015));}float fogVolume=1.-exp(-optical*distanceToEye*.008);c=mix(c,vec3(.15,.23,.12),fogVolume);}
  outColor=vec4(c,alpha);return;
 }
 // Original scientific objects and UI-associated geometry retain their colours.
 c=mix(c,texture(uTex,vUV).rgb*uTint.rgb,uTexWeight);c*=.22+.89*max(0.,dot(n,l));float rim=pow(1.-abs(dot(n,v)),3.);c+=uRim*rim*vec3(.16,.78,.91)+uEmission*vColor.rgb;
 outColor=vec4(c,alpha);
}`;
export const vsFullscreen = `#version 300 es
out vec2 vUV;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vUV=p;gl_Position=vec4(p*2.-1.,0,1);}`;
export const fsEnvironment = `#version 300 es
precision highp float;in vec2 vUV;out vec4 outColor;
uniform vec3 uEye,uForward,uRight,uUp,uLight,uFogColor,uSkyTop,uSunColor;uniform float uAspect,uTanHalf,uTime,uExposure,uStars;uniform int uMode;
${noise}
${cosmicField}
void main(){vec2 uv=vUV*2.-1.;vec3 rd=normalize(uForward+uv.x*uAspect*uTanHalf*uRight+uv.y*uTanHalf*uUp);vec3 c=vec3(.001,.002,.005);
 if(uMode==2){float elevation=max(rd.y,0.);float horizon=exp(-elevation*5.);c=mix(uSkyTop,uFogColor,horizon);float sun=max(dot(rd,normalize(uLight)),0.);c+=uSunColor*pow(sun,360.)*.55+uSunColor*vec3(.14,.13,.10)*pow(sun,12.);
  // Stars show through thin atmospheres; none at all under a dense sky.
  if(uStars>0.){vec3 q=floor(rd*420.);float h=hash(q);c+=vec3(.9,.92,1.)*step(.9975,h)*uStars*smoothstep(0.,.08,rd.y)*(.4+.6*fract(h*91.));}c+=vec3(.018)*fbm(rd*7.+vec3(0,0,uTime*.006));outColor=vec4(c,1);return;}
 if(uMode==1){
  vec3 inv=1./(rd+vec3(.000001)),a=(-vec3(43,18,43)-uEye)*inv,b=(vec3(43,18,43)-uEye)*inv;vec3 lo=min(a,b),hi=max(a,b);float t0=max(max(lo.x,lo.y),max(lo.z,0.)),t1=min(min(hi.x,hi.y),hi.z);
  if(t1>t0){float dt=(t1-t0)/float(uSteps),trans=1.;for(int j=0;j<72;j++){if(j>=uSteps)break;vec3 p=uEye+rd*(t0+(float(j)+.5)*dt);float r=length(p.xz),angle=atan(p.z,p.x),spiral=sin((angle-1.85*log(r+1.))*2.);float arm=exp(-spiral*spiral*20.);float fall=exp(-pow(r/28.,2.));float z=exp(-p.y*p.y/(2.0+r*.16));float grain=noise3(p*.65)*.75+.25;float core=exp(-r*r/25.-p.y*p.y*.25);float density=(arm*.055+ .006)*fall*z*grain;vec3 light=mix(vec3(.17,.3,.58),vec3(.63,.56,.50),exp(-r*.08));float dust=exp(-pow(sin((angle-1.85*log(r+1.)+.11)*2.),2.)*48.)*z*fall*.018;vec3 emit=density*light+core*vec3(.10,.063,.028);c+=trans*emit*dt;trans*=exp(-(density*.22+dust)*dt);}}
 }
 if(uMode==1)c=nebulaRadiance(uEye,rd,c);
 outColor=vec4(film(c*uExposure),1);
}`;
export const vsShadow = `#version 300 es
layout(location=0) in vec3 aPos;uniform mat4 uLightVP;void main(){gl_Position=uLightVP*vec4(aPos,1.);}`;
export const fsShadow = `#version 300 es
precision highp float;void main(){}`;
export const fsPost = `#version 300 es
precision highp float;in vec2 vUV;out vec4 outColor;uniform sampler2D uScene;uniform vec2 uPixel;uniform float uBloom;
void main(){vec3 c=texture(uScene,vUV).rgb;vec3 north=texture(uScene,vUV+vec2(0,uPixel.y)).rgb,south=texture(uScene,vUV-vec2(0,uPixel.y)).rgb,east=texture(uScene,vUV+vec2(uPixel.x,0)).rgb,west=texture(uScene,vUV-vec2(uPixel.x,0)).rgb;float contrast=length(north-south)+length(east-west);c=mix(c,(north+south+east+west+c*4.)/8.,smoothstep(.14,.55,contrast)*.65);vec3 glow=vec3(0);for(int x=-2;x<=2;x++)for(int y=-2;y<=2;y++){vec3 s=texture(uScene,vUV+vec2(x,y)*uPixel*3.).rgb;float l=max(s.r,max(s.g,s.b));glow+=s*smoothstep(.78,1.,l)/25.;}outColor=vec4(c+glow*.075*uBloom,1);}`;

export const fsCopy = `#version 300 es
precision highp float;in vec2 vUV;out vec4 outColor;uniform sampler2D uScene;void main(){outColor=texture(uScene,vUV);}`;
