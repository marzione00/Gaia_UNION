// Shader-defined density volumes, no raster background or AI-generated imagery.
export const cosmicField = `
uniform int uVolumeCount,uSteps;
uniform vec4 uVolumeCenter[15],uVolumeAxes[15],uVolumeColor[15];
vec2 ellipsoid(vec3 ro,vec3 rd,vec3 center,vec3 axes){vec3 p=(ro-center)/axes,d=rd/axes;float a=dot(d,d),b=dot(p,d),c=dot(p,p)-1.,h=b*b-a*c;if(h<=0.)return vec2(1,-1);h=sqrt(h);return vec2(max(0.,(-b-h)/a),(-b+h)/a);}
// Domain-warped density, sculpted cavities and narrow opaque filaments.
vec2 cloudDensity(vec3 q,float seed,float kind){
 float radius=length(q);if(radius>=1.)return vec2(0);
 vec3 p=q*5.3+vec3(seed,seed*.37,seed*.19);
 vec3 warp=vec3(noise3(p*.7),noise3(p*.7+17.),noise3(p*.7-9.))-.5;
 float n=noise3(p+warp*1.9)*.62+noise3(p*2.07+warp)*.27+noise3(p*4.2)*.11;
 float edge=pow(max(0.,1.-radius*radius),1.3),ridge=pow(max(0.,1.-abs(n-.49)*5.),3.);
 float cavity=smoothstep(.12,.4,length(q-vec3(-.22,.09,.14)));
 float detail=noise3(p*3.1)*.5+noise3(p*6.3)*.3+noise3(p*12.7)*.2;
 float gas=edge*smoothstep(.40,.72,n)*cavity*smoothstep(.30,.65,detail);
 float dust=edge*ridge*smoothstep(.17,.62,noise3(p*.65+27.))*(.2+1.8*smoothstep(.35,.65,detail));
 if(kind>1.5&&kind<3.5){float shell=exp(-pow((radius-(kind<2.5?.68:.60))/.105,2.));gas=shell*(.15+n*.9);dust=gas*.12;}
 if(kind>3.5){float r=length(q.xz),angle=atan(q.z,q.x),arms=pow(.5+.5*cos(angle*2.-log(r+.07)*4.5),7.);float disk=exp(-q.y*q.y*70.)*exp(-r*r*3.);gas=disk*(arms*.6+.12)+exp(-dot(q,q)*65.)*.9;dust=disk*pow(.5+.5*cos(angle*2.-log(r+.07)*4.5+.6),12.)*.65;}
 return vec2(gas,dust);
}
vec3 nebulaRadiance(vec3 ro,vec3 rd,vec3 background){
 vec3 c=background;
 // Catalogue sorted back-to-front. Each bounded volume integrates front-to-back.
 for(int n=0;n<15;n++){
  if(n>=uVolumeCount)break;
  vec3 center=uVolumeCenter[n].xyz,axes=uVolumeAxes[n].xyz;float kind=uVolumeAxes[n].w,seed=uVolumeCenter[n].w,strength=uVolumeColor[n].w;
  vec2 hit=ellipsoid(ro,rd,center,axes);if(hit.y<=hit.x)continue;
  float dt=(hit.y-hit.x)/float(uSteps),trans=1.;vec3 light=vec3(0);
  for(int j=0;j<72;j++){
   if(j>=uSteps||trans<.015)break;
   vec3 world=ro+rd*(hit.x+(float(j)+.5)*dt),q=(world-center)/axes;
   vec2 density=cloudDensity(q,seed,kind);
   float gas=density.x,dust=density.y,absorb=(gas*.28+dust*(kind<.5?1.15:1.8))*strength;
   float optical=absorb*dt,alpha=1.-exp(-optical);
   vec3 tint=mix(uVolumeColor[n].rgb,vec3(.46,.67,.82),smoothstep(.25,.75,gas)*.35);
   float illumination=.32+1.4*exp(-length(q-vec3(-.25,.1,.1))*2.);
   vec3 source=tint*gas*illumination*strength*(kind>.5&&kind<1.5?.19:.36);
   light+=trans*source*(1.-exp(-optical))/max(absorb,.0001);trans*=1.-alpha;
  }
  c=light+trans*c;
  // Compact hot stellar core at the centre of the rare planetary nebula.
  if(kind>2.5&&kind<3.5){vec3 to=center-ro;float along=dot(to,rd),impact=length(to-rd*along);if(along>0.)c+=vec3(.7,.85,1.)*exp(-impact*impact/.002)*.65;}
 }
 return c;
}
`;
// Coarse optical depth per star, integrated only BETWEEN camera and star.
// Bounds give foreground stars zero extinction and avoid a screen-space mask.
export const starExtinction = `
uniform vec3 uCosmicEye;
uniform int uDustCount;
uniform vec4 uDustCenter[10],uDustAxes[10];
float extinction(vec3 star){
 vec3 delta=star-uCosmicEye;float distanceToStar=length(delta);vec3 rd=delta/max(distanceToStar,.000001);float optical=0.;
 for(int n=0;n<10;n++){if(n>=uDustCount)break;
  vec3 p=(uCosmicEye-uDustCenter[n].xyz)/uDustAxes[n].xyz,d=rd/uDustAxes[n].xyz;
  float a=dot(d,d),b=dot(p,d),h=b*b-a*(dot(p,p)-1.);if(h<=0.)continue;
  h=sqrt(h);float nearT=max(0.,(-b-h)/a),farT=min(distanceToStar,(-b+h)/a);if(farT<=nearT)continue;
  vec3 q=p+d*(nearT+farT)*.5;float density=exp(-dot(q,q)*3.);
  optical+=(farT-nearT)*density*uDustCenter[n].w*.16;
 }
 return exp(-optical);
}
`;
