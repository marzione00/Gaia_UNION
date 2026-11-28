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
uniform mat4 uVP,uModel,uLightVP,uReflectionVP;uniform highp int uMaterial,uInstanced;uniform vec4 uMotion;uniform float uTime;uniform vec3 uEye,uCenter;out vec3 vNormal,vWorld,vLocal;out vec2 vUV;out vec4 vColor,vPBR,vShadow,vReflection;
vec3 turn(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}
void main(){vec3 vertex=aPos,normal=aNormal;vec4 color=aColor;if(uMaterial==10&&aPBR.w>1.5&&aPBR.w<2.5)vertex.xz*=8.;
 if(uInstanced>0){
  // 1 static (optional sway), 2 rising particles, 3 animals walking on small circles, 4 flyers on wider circles with flapping wings.
  vec3 base=aInst.xyz;float s=aInst.w,a=aInstC.w;
  if(uInstanced==1&&uMotion.z>0.)vertex.x+=sin(uTime*1.3+a*3.)*uMotion.z*max(vertex.y,0.);
  if(uInstanced==2){float t=fract(uTime*uMotion.x+a*.1592);base.y+=t*uMotion.y;base.x+=sin(t*6.283+a)*uMotion.z;s*=(1.-t)*(.4+t*2.2);}
  if(uInstanced==3){float w=uTime*uMotion.x*(.7+.6*fract(a*7.13))+a;base.x+=cos(w)*uMotion.y;base.z+=sin(w)*uMotion.y;a=atan(-cos(w),-sin(w));base.y+=abs(sin(w*9.))*.06;
   // Legs below the height uMotion.w swing forwards and back, left and right legs and front and hind legs in opposite phase.
   if(uMotion.w>0.)vertex.x+=sin(w*9.+(vertex.z>0.?0.:3.1416)+(vertex.x>0.?3.1416:0.))*max(uMotion.w-vertex.y,0.)*.35;}
  // 7: inhabitants walking back and forth along a stretch of street of length uMotion.y (1.64.0). The heading
  // carries the slope of the stretch in whole hundredths, seven units apart.
  if(uInstanced==7){float k=floor(a/7.);a-=k*7.;float slope=(k-50.)/100.,t=fract(uTime*uMotion.x/(2.*uMotion.y)*(.8+.4*fract(a*3.7))+fract(a*.61)),u=1.-abs(t*2.-1.)*2.,d=u*uMotion.y*.5;
   base.x+=cos(a)*d;base.z-=sin(a)*d;base.y+=d*slope+abs(sin(d*5.))*.03;
   if(uMotion.w>0.)vertex.x+=sin(d*5.+(vertex.z>0.?0.:3.1416))*max(uMotion.w-vertex.y,0.)*.6;
   if(t>.5)a+=3.1416;}
  // 8: animals placed by the ecosystem (1.65.0). The heading carries the gait, seven units apart: 0 standing,
  // 1 walking, 2 running or flying; legs below uMotion.w swing and wings beat where uMotion.z is set. Where
  // uMotion.y is 1 the body is a biped, the explorer of 1.68.0, and each leg swings as one piece.
  if(uInstanced==8){float k=floor(a/7.);a-=k*7.;float g=min(k,2.)*.5,ph=uTime*(5.+6.*g)+fract(a*3.7)*6.283;base.y+=abs(sin(ph))*.05*min(g*2.,1.)*(1.-uMotion.z);
   if(uMotion.w>0.)vertex.x+=sin(ph+(vertex.z>0.?0.:3.1416)+(uMotion.y>.5?0.:(vertex.x>0.?3.1416:0.)))*max(uMotion.w-vertex.y,0.)*.45*min(g*2.,1.);
   if(uMotion.z>0.)vertex.y+=sin(uTime*7.+a*5.)*max(abs(vertex.z)-.12,0.)*.7*step(.9,g);}
  if(uInstanced==4){float w=uTime*uMotion.x*(.7+.6*fract(a*7.13))+a;base.x+=cos(w)*uMotion.y;base.z+=sin(w)*uMotion.y;base.y+=sin(w*2.+a)*.8;vertex.y+=sin(uTime*7.+a*5.)*max(abs(vertex.z)-.12,0.)*.7;a=atan(-cos(w),-sin(w));}
  // 5: ships and stations of the systems; the second vector is the heading (the +z of the model), y stays up.
  if(uInstanced==5){vec3 f=normalize(aInstC.xyz),x=cross(vec3(0,1,0),f);x=dot(x,x)>1e-8?normalize(x):vec3(1,0,0);vec3 y=cross(f,x);vertex=(x*vertex.x+y*vertex.y+f*vertex.z)*s+base;normal=x*normal.x+y*normal.y+f*normal.z;}
  // 6: glows of the systems (running lights, flames, wakes, goods): colour and opacity come with the instance.
  else if(uInstanced==6){vertex=vertex*s+base;color=aInstC;}
  // 9: weather of the zone (1.79.0): rain, snow, dust and ash in a box of side uMotion.y centred at uCenter, just in
  // front of the eye. They fall at uMotion.x units a second, each a little faster or slower, the wind carries them
  // (uMotion.zw) and they sway by aInstC.x units; each lies along its own motion, so raindrops are streaks, and
  // near the faces of the box they shrink, so the box has no edge.
  else if(uInstanced==9){float L=uMotion.y;vec3 vel=vec3(uMotion.z,-uMotion.x,uMotion.w)*(.8+.4*fract(a*3.71));
   vec3 q=base+vel*uTime+vec3(sin(uTime*1.1+a*5.),0.,cos(uTime*.8+a*3.))*aInstC.x;q=uCenter+mod(q-uCenter+.5*L,L)-.5*L;
   s*=1.-smoothstep(.6,1.,length(q-uCenter)/(.5*L));
   vec3 d=normalize(vel-vec3(0,1e-3,0)),x=normalize(abs(d.y)<.999?cross(d,vec3(0,1,0)):vec3(1,0,0)),z=cross(x,d);
   vertex=(x*vertex.x+d*vertex.y+z*vertex.z)*s+q;normal=x*normal.x+d*normal.y+z*normal.z;}
  else{vertex=turn(vertex,a)*s+base;normal=turn(normal,a);
  // The instance colour replaces only the white parts of a mesh (petals, bodies, water), so centres, stems and legs keep their own colour.
  if(min(color.r,min(color.g,color.b))>.97)color.rgb*=aInstC.rgb;}
 }
 // Open sea of the phenomenon worlds: tide offset plus three travelling waves.
 // Waves of the sea; far from the eye (1.70.0) they flatten, so on shallow flats the crests no longer cross the
 // ground in a regular pattern.
 if(uMaterial==18&&uInstanced==0){vec2 q=vertex.xz+uMotion.zw;float t=uTime,amp=uMotion.y*(1.-smoothstep(60.,220.,length(uEye-(uModel*vec4(vertex,1.)).xyz)));vertex.y+=uMotion.x+amp*(sin(q.x*.21+t*.9)*.5+sin(q.x*.07+q.y*.18-t*.6)*.35+sin(q.y*.33+t*1.3)*.15);
  float dx=amp*(cos(q.x*.21+t*.9)*.105+cos(q.x*.07+q.y*.18-t*.6)*.0245),dz=amp*(cos(q.x*.07+q.y*.18-t*.6)*.063+cos(q.y*.33+t*1.3)*.0495);normal=normalize(vec3(-dx,1.,-dz));}
 vec4 p=uModel*vec4(vertex,1.);vWorld=p.xyz;vLocal=aPos;vNormal=normalize(mat3(uModel)*normal);vUV=aUV;vColor=color;vPBR=aPBR;vShadow=uLightVP*p;vReflection=uReflectionVP*p;gl_Position=uVP*p;}`;
export const fsMesh = `#version 300 es
precision highp float;
in vec3 vNormal,vWorld,vLocal;in vec2 vUV;in vec4 vColor,vPBR,vShadow,vReflection;out vec4 outColor;
uniform sampler2D uTex,uShadow,uReflection,uTexPrev;uniform float uTexFade;uniform vec3 uEye,uLight,uCenter,uFogColor,uAtmosColor;uniform vec4 uTint;
uniform int uOccluderCount;uniform vec4 uOccluder[4];
// Atmosphere of a planet (1.59.0): outer radius of the shell, inverse scale height (radii), optical scale, twilight strength.
uniform vec4 uShell;
vec3 dusk(vec3 sky){vec3 c=clamp(1.05-sky/max(max(sky.r,sky.g),max(sky.b,.01))*.9,.05,1.);return c/max(c.r,max(c.g,c.b));}
uniform float uTexWeight,uOpacity,uRim,uEmission,uTime,uSeed,uRadius,uFog,uHasShadow,uMist,uClipBelow,uOcean,uDisguise;uniform vec3 uLightColor;uniform highp int uMaterial;
${noise}
float solarVisibility(vec3 point,vec3 light){float visibility=1.;for(int k=0;k<4;k++){if(k>=uOccluderCount)break;vec3 delta=uOccluder[k].xyz-point;float along=dot(delta,light);if(along>0.){float impact=length(delta-light*along),r=uOccluder[k].w;visibility*=smoothstep(r*.94,r*1.06,impact);}}return visibility;}
float shadow(vec3 n,vec3 l){if(uHasShadow<.5)return 1.;vec3 p=vShadow.xyz/vShadow.w*.5+.5;if(any(lessThan(p,vec3(0)))||any(greaterThan(p,vec3(1))))return 1.;float b=max(.00065,.0014*(1.-dot(n,l))),s=0.;vec2 texel=1./vec2(textureSize(uShadow,0));for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)s+=p.z-b<texture(uShadow,p.xy+vec2(x,y)*texel).r?1.:.24;return mix(1.,s/9.,smoothstep(0.,.15,min(min(p.x,1.-p.x),min(p.y,1.-p.y))));}
vec3 shade(vec3 c,vec3 n,vec3 l,vec3 v,float metal,float rough,float visibility){
 float ndl=max(dot(n,l),0.),ndv=max(dot(n,v),.001);vec3 h=normalize(l+v);float ndh=max(dot(n,h),0.),vdh=max(dot(v,h),0.);
 float a=max(.045,rough*rough),a2=a*a,den=ndh*ndh*(a2-1.)+1.;float D=a2/(3.141593*den*den),k=(rough+1.)*(rough+1.)/8.;float G=ndl/(ndl*(1.-k)+k)*ndv/(ndv*(1.-k)+k);vec3 F=mix(vec3(.04),c,metal)+(1.-mix(vec3(.04),c,metal))*pow(1.-vdh,5.);
 vec3 ambient=mix(vec3(.13,.15,.18),vec3(.29,.35,.39),n.y*.5+.5)*c;
 return ambient+(c*(1.-metal)*(1.-F)+D*G*F/max(4.*ndl*ndv,.001))*ndl*visibility*2.0;
}
void main(){
 if(vWorld.y<uClipBelow)discard;
 // A zero light vector means a star at the origin: each fragment is lit from its own direction (instanced craft).
 vec3 n=normalize(vNormal),l=dot(uLight,uLight)>0.?normalize(uLight):normalize(-vWorld),v=normalize(uEye-vWorld),p=normalize(vLocal),c=vColor.rgb*uTint.rgb;float alpha=uOpacity*vColor.a;
 // Flat colour for map markers and orbit lines: the tint is the colour, independent of the light.
 if(uMaterial==16){outColor=vec4(uTint.rgb*(.82+.18*abs(dot(n,v))),alpha);return;}
 // Water of the phenomenon worlds (sea and lakes): colour from the instance or the tint, fresnel and sun glint.
 if(uMaterial==18){c=pow(c,vec3(2.2));float a1=vWorld.x*1.7+vWorld.z*.9+uTime*.7,b1=vWorld.z*2.3-vWorld.x*.6-uTime*.5,ripple=1.-smoothstep(30.,120.,length(uEye-vWorld));vec3 nn=normalize(n+vec3(cos(a1)*.05+cos(b1*1.7)*.02,0,sin(b1)*.05+sin(a1*1.9)*.02)*ripple);
  float fres=pow(1.-max(0.,dot(nn,v)),4.),glint=pow(max(dot(reflect(-l,nn),v),0.),90.);vec3 col=(c*(.42+.62*max(dot(nn,l),0.)))*uLightColor+vec3(.16,.24,.3)*fres*.6+vec3(1.9,1.7,1.4)*glint*uLightColor;
  float dist=length(uEye-vWorld),fog=1.-exp(-dist*uFog*.8);col=mix(film(col*.78),uFogColor,max(clamp(fog,0.,.8),smoothstep(1250.,1750.,dist)));outColor=vec4(col,alpha*(.86+.14*fres));return;}
 // Soft puffs (steam, spores): opaque towards the centre of each small sphere.
 if(uMaterial==19){float f=pow(max(dot(n,v),0.),2.6);outColor=vec4(film(c*(.55+.45*max(dot(n,l),0.))),alpha*f);return;}
 // Star glow: transparent at the rim of the sphere, denser towards the centre of the disc.
 if(uMaterial==17){float f=dot(n,v);if(f<0.)discard;outColor=vec4(c,alpha*pow(f,2.4)*.6);return;}
 if(uMaterial==6){
  if(dot(n,v)<0.)discard;
  // The shell follows the card of the planet: thicker, denser and with a stronger twilight for higher pressures.
  bool card=uShell.x>1.;float outer=card?uShell.x:1.028,invH=card?uShell.y:155.,k=card?uShell.z:6.;vec3 sunset=dusk(uAtmosColor);float forward=1.+2.5*pow(max(dot(-v,l),0.),8.);
  vec3 ro=uEye-uCenter,rd=-v;float b=dot(ro,rd),rr=uRadius*outer,disc=b*b-dot(ro,ro)+rr*rr;if(disc<0.)discard;
  float nearT=max(0.,-b-sqrt(disc)),farT=-b+sqrt(disc),ground=b*b-dot(ro,ro)+uRadius*uRadius;
  if(ground>0.){float hit=-b-sqrt(ground);if(hit>0.)farT=min(farT,hit);}
  float dt=max(0.,farT-nearT)/14.,opt=0.;vec3 scatter=vec3(0);
  for(int i=0;i<14;i++){vec3 q=ro+rd*(nearT+(float(i)+.5)*dt);float h=max(0.,length(q)/uRadius-1.);float density=exp(-h*invH);float cs=dot(normalize(q),l),sun=smoothstep(-.13,.18,cs)*solarVisibility(q+uCenter,l),band=exp(-cs*cs/.026);vec3 tint=mix(sunset*.3,uAtmosColor,sun)+sunset*band*.7;float d=density*dt/uRadius*k;scatter+=exp(-opt)*d*tint*(.1+sun*1.5*forward+band*.6);opt+=d;}
  alpha=(1.-exp(-opt))*.92;outColor=vec4(pow(clamp(scatter/max(alpha,.001),0.,1.),vec3(.65)),alpha*uOpacity);return;
 }
 if(uMaterial==5){if(dot(n,v)<0.)discard;float a=texture(uTex,vUV).r;float cs=dot(n,l),vis=solarVisibility(vWorld,l),sun=max(0.,cs)*vis,band=exp(-pow((cs-.04)/.12,2.))*uShell.w*vis;alpha*=smoothstep(.12,.95,a)*.84;outColor=vec4(film(vec3(.001)+mix(dusk(uAtmosColor),vec3(1.),smoothstep(.02,.3,cs))*sun+dusk(uAtmosColor)*band*.35),alpha);return;}
 if(uMaterial==12||uMaterial==15){
  if(uMaterial==15)l=normalize(uCenter-vWorld);
  vec2 uv=uDisguise>.5?vec2(1.-vUV.x,1.-vUV.y):vUV;vec4 texel=texture(uTex,uv);if(uTexFade<1.)texel=mix(texture(uTexPrev,uv),texel,uTexFade);vec3 albedo=texel.rgb;float water=max(uOcean*smoothstep(.01,.12,albedo.b-max(albedo.r,albedo.g*.85)),1.-texel.a);
  if(uDisguise>.5){float a=uDisguise>1.5?.55:-.62;vec3 k=vec3(.57735);albedo=clamp(albedo*cos(a)+cross(k,albedo)*sin(a)+k*dot(k,albedo)*(1.-cos(a)),0.,1.);}
  vec3 base=pow(albedo,vec3(2.2))*uTint.rgb;c=shade(base,n,l,v,0.,mix(.88,.18,water),solarVisibility(vWorld,l));
  float day=smoothstep(-.12,.08,dot(n,l));c*=mix(.035,1.,day);
  // Twilight (1.59.0): along the terminator an atmosphere lights the ground with the colour of its dusk.
  c+=(base*.6+vec3(.04))*dusk(uAtmosColor)*exp(-pow((dot(n,l)+.03)/.1,2.))*uShell.w*solarVisibility(vWorld,l);
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
  // Grain, tint and bumps of the ground fade out between 60 and 240 units (1.62.0): further away they are
  // smaller than a pixel and would flicker as the camera moves.
  if(kind<1.5){float near=1.-smoothstep(60.,240.,length(uEye-vWorld)),grain=fbm(vWorld*.7);base*=mix(1.,.5+grain*1.0,near);base*=mix(vec3(.92,.94,.79),mix(vec3(.72,.80,.64),vec3(1.12,1.08,.93),smoothstep(.34,.63,fbm(vWorld*2.5))),near);vec3 dp1=dFdx(vWorld),dp2=dFdy(vWorld),r1=cross(dp2,n),r2=cross(n,dp1);float det=dot(dp1,r1),h=noise3(vWorld*4.)*.013*near;n=normalize(n-sign(det)*(dFdx(h)*r1+dFdy(h)*r2)/max(abs(det),.00001));}
  if(kind>1.5&&kind<2.5){float a=vWorld.x*2.3+vWorld.z*1.45+uTime*.48,b=vWorld.z*3.6-vWorld.x*.7-uTime*.32;n=normalize(n+vec3(cos(a)*.036+cos(b*1.8)*.012,0,sin(b)*.037+sin(a*2.1)*.014));base=vec3(.008,.046,.065);rough=.16;metal=.05;}
  c=shade(base,n,l,v,metal,rough,shadow(normalize(vNormal),l))*uLightColor;
  if(kind>1.5&&kind<2.5){float fres=pow(1.-max(0.,dot(n,v)),5.);c+=vec3(.2,.33,.38)*(.12+fres*.65);c+=pow(max(dot(reflect(-l,n),v),0.),120.)*vec3(2.1,1.8,1.4);}
  c+=base*max(vPBR.z,uEmission)*1.4;
  if(kind>2.5&&kind<3.5)c+=base*max(0.,dot(-n,l))*.8;
  float distanceToEye=length(uEye-vWorld),heightDensity=exp(-max(vWorld.y,0.)*.12);float fog=1.-exp(-distanceToEye*uFog*(.45+.55*heightDensity));
  c=film(c*(kind>3.5?.76:.48));if(kind>1.5&&kind<2.5){vec2 uv=vReflection.xy/vReflection.w*.5+.5;uv+=n.xz*.018;vec3 reflection=texture(uReflection,clamp(uv,.002,.998)).rgb;float f=.28+.48*pow(1.-max(0.,dot(n,v)),3.);c=mix(c,reflection,f);}
  // The rings of the horizon (1.62.0) end in the haze of the horizon from 1250 units on.
  c=mix(c,uFogColor,max(clamp(fog,0.,.84),smoothstep(1250.,1750.,distanceToEye)));
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
