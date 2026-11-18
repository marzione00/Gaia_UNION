// Volume di fisica, unità di astrofisica F26-F40: struttura dei capitoli originali e numeri ricalcolati.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseChapter} from '../src/book/markdown.js';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const index=JSON.parse(await read('content/libro/index.json'));
const originali=index.capitoli.filter(c=>c.volume==='Fisica'&&c.stato==='originale');
const r=(x,d)=>d<0?Math.round(x/10**-d)*10**-d:+x.toFixed(d);
// Constants: SI 2019 exact values, CODATA 2022, IAU 2015 nominal solar values.
const c=299792458,G=6.6743e-11,AU=1.495978707e11,S0=1361,LSUN=3.828e26,MSUN=1.98840987e30,eps0=8.8541878188e-12,mu0=1.25663706127e-6,h=6.62607015e-34,kB=1.380649e-23,e=1.602176634e-19,me=9.1093837139e-31,mp=1.67262192595e-27,sigma=5.670374419e-8;
test('Fisica: i capitoli originali sono completi, collegati e scritti nello stile del sito',async()=>{
 assert.ok(originali.length>=1);
 for(const ch0 of originali){
  assert.match(ch0.unit,/^physics-(2[6-9]|3\d|40)$/);
  const src=await read(ch0.file),ch=parseChapter(src),ids=new Set([...ch.toc.map(t=>t.id),...ch.figures,...ch.exercises.map(e=>e.id)]);
  assert.equal(ch.meta.unit,ch0.unit);assert.equal(ch.meta.volume,'Volume di fisica');assert.match(ch.meta.fonte,/^Testo originale; riferimento principale D\. Halliday, R\. Resnick, J\. Walker/,ch0.unit);assert.match(src,/## Fonti \{#fonti\}/);
  assert.ok(ch.words>=5000,ch0.unit+' '+ch.words);assert.ok(ch.toc.filter(t=>t.level===2).length>=12,ch0.unit);assert.ok(ch.figures.length>=6,ch0.unit);
  assert.ok(ch.exercises.length>=16&&ch.exercises.every(e=>e.solution),ch0.unit);for(const [lv,n] of [['base',6],['medio',6],['avanzato',4]])assert.ok(ch.exercises.filter(e=>e.level===lv).length>=n,ch0.unit+' '+lv);
  for(const l of ch.links){if(l.startsWith('#'))assert.ok(ids.has(l.slice(1)),ch0.unit+' '+l);}
  const text=src.replace(/^---[\s\S]*?\n---\n/,''),prose=text.replace(/::: figura[\s\S]*?\n---\n/g,'');
  assert.equal((text.match(/\$\$/g)||[]).length%2,0,ch0.unit);
  for(const para of prose.replace(/\$\$[\s\S]*?\$\$/g,'').split(/\n\s*\n/))assert.equal((para.match(/\$/g)||[]).length%2,0,ch0.unit+': '+para.slice(0,80));
  // Control characters (for example a backspace left by an unescaped \\b) break MathJax.
  assert.ok(!/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(src),ch0.unit+' carattere di controllo');
  assert.ok(!src.includes('—'),ch0.unit);assert.ok(!/non solo/i.test(prose),ch0.unit);assert.ok(!/\bnon\b[^.;:\n]{0,80}\bma\b/i.test(prose),ch0.unit);assert.ok(!/\bnon\b[^.;\n]{0,70}:/i.test(prose),ch0.unit);assert.ok(!/, e non /i.test(prose),ch0.unit);
  // Figures are cited by number: every «figura N» must exist.
  for(const m of prose.matchAll(/\bfigura (\d+)\b/g))assert.ok(+m[1]>=1&&+m[1]<=ch.figures.length,ch0.unit+' figura '+m[1]);
 }
});
test('Fisica 26: onde elettromagnetiche e pressione della luce, numeri ricalcolati',()=>{
 assert.ok(Math.abs(1/Math.sqrt(mu0*eps0)-c)<1);assert.equal(r(1000/c*1e6,1),3.3);
 const Em=I=>Math.sqrt(2*I/(c*eps0));assert.equal(r(Em(S0)/1e3,2),1.01);assert.equal(r(Em(S0)/c*1e6,1),3.4);assert.equal(r(1e-3/(Math.PI*0.5e-3**2),-2),1300);
 const L=4*Math.PI*AU**2*S0;assert.equal(r(L/1e26,2),3.83);assert.ok(L/6.2e20>5e5);
 const I=d=>S0/d**2;assert.equal(r(I(0.387),-2),9100);assert.ok(I(0.387)/S0>6);assert.equal(r(I(5.2),0),50);assert.equal(r(I(30.07),1),1.5);assert.equal(r(30.07**2,-2),900);assert.equal(r(14000/5.2**2,-2),500);
 assert.equal(r(S0/c*1e6,1),4.5);assert.equal(r(2*S0/c*1e6,1),9.1);assert.equal(r(101325/(S0/c)/1e10,1),2.2);
 const Fe=S0/c*Math.PI*6.371e6**2,Fg=1.32712e20*5.972e24/AU**2;assert.equal(r(Fe/1e8,1),5.8);assert.equal(r(Fe/9.81/1e3,-4),60000);assert.equal(r(Fg/1e22,1),3.5);assert.equal(r(Fg/Fe/1e13,0),6);
 const beta=3*LSUN/(16*Math.PI*G*MSUN*c);assert.equal(r(beta/1e3*1e6,2),0.57);assert.equal(r(0.57/(2.5*0.5),2),0.46);
 const tPR=c*AU**2/(4*1.32712e20)/3.156e7;assert.equal(r(tPR,-2),400);assert.equal(r(tPR/0.1,-3),4000);
 const a1=2*S0/(c*0.01);assert.equal(r(a1*1e3,2),0.91);assert.equal(r(a1*86400,0),78);assert.equal(r(a1*3.156e7/1e3,0),29);
 assert.equal(r(1.12e-3/315*1e6,1),3.6);assert.equal(r(315/196,1),1.6);assert.equal(r(1.12e-3/(2*S0/c*196)*100,0),63);
 // Exercises.
 assert.equal(r(S0/1.52**2,0),589);assert.equal(r(Em(S0/1.52**2),0),666);assert.equal(r(c/1.4204e9,3),0.211);assert.equal(r(c/550e-9/1e14,2),5.45);assert.equal(r(c/550e-9/1.4204e9,-5),400000);
 const L10=4*Math.PI*3.086e17**2*1e-9;assert.equal(r(L10/1e27,1),1.2);assert.equal(r(L10/LSUN,1),3.1);assert.equal(r(S0/c*10*1e5,1),4.5);assert.equal(r(5e-6*9.81*1e5,1),4.9);
 assert.equal(r(0.5*Math.cos(Math.PI/3)**2,4),0.125);assert.equal(r(AU/c,0),499);assert.equal(r(30.07*AU/c,-2),15000);assert.equal(r(30.07*AU/c/3600,2),4.17);
 const Fm=S0/c*Math.PI*1.737e6**2,Gm=1.32712e20*7.35e22/AU**2;assert.equal(r(Fm/1e7,1),4.3);assert.equal(r(Gm/1e20,1),4.4);assert.equal(r(Math.log10(Fm/Gm),0),-13);
 assert.equal(r(0.57/2.5,2),0.23);assert.equal(r(0.57/(2.5*0.3),2),0.76);assert.equal(r(400/0.05*2.5**2,-3),50000);assert.equal(r(1.12e-3/315*8.64e6,0),31);
 const sc=LSUN/(2*Math.PI*c*1.32712e20);assert.equal(r(sc*1e3,2),1.53);assert.equal(r(1.39,1),1.4);
 const Il=5e-3/(Math.PI*1e-6);assert.equal(r(Il/1e3,1),1.6);assert.equal(r(Em(Il)/1e3,1),1.1);
 assert.equal(r(LSUN/c**2/1e9,2),4.26);assert.equal(r(4.6e9*3.156e7/1e17,2),1.45);assert.equal(r(LSUN/c**2*1.45e17/1e26,1),6.2);assert.equal(r(LSUN/c**2*1.45e17/1.989e30*1e4,0),3);
 assert.equal(r(14000/5.2**2,0),518);assert.equal(r(14000/5.46**2,0),470);
 assert.equal(r(0.5*Math.cos(Math.PI/12)**12,3),0.330);assert.equal(r(Math.PI**2/4,2),2.47);
 assert.equal(r(a1*1e3/0.09,1),10.1);assert.equal(r(1.32712e20/(0.3*AU)**2,3),0.066);assert.equal(r(a1/0.09/(1.32712e20/(0.3*AU)**2),2),0.15);assert.equal(r(sc/0.01,2),0.15);
 // Model probes: sail acceleration at r = 1.4 and 2.6 AU (25% and 50% of the domain) for sigma = 10 and 5 g/m2.
 const m=(x,s)=>2*1361/(299792458*s/1000)/(x*x)*1000;assert.deepEqual([m(1.4,10),m(2.6,10),m(1.4,5),m(2.6,5)].map(v=>r(v,3)),[0.463,0.134,0.926,0.269]);
});
test('Fisica 27: specchi, lenti e telescopi, numeri ricalcolati',()=>{
 const deg=x=>x*180/Math.PI,asin=x=>deg(Math.asin(x)),atan=x=>deg(Math.atan(x));
 assert.equal(r(asin(Math.sin(Math.PI/4)/1.333),0),32);assert.equal(r(asin(1/1.5),1),41.8);assert.equal(r(asin(1/1.333),1),48.6);assert.equal(r(atan(1.333),0),53);
 assert.equal(r(1/(0.5*(1/20+1/20)),0),20);assert.equal(r(1/(1-1/3),1),1.5);
 assert.equal(900/25,36);assert.equal(900/10,90);assert.equal(r(206265/10000,1),20.6);assert.equal(r(0.5*Math.PI/180*10000,0),87);
 const lim=(D,m0=6)=>m0+5*Math.log10(D/0.7);assert.equal(r(5*Math.log10(5/0.7),1),4.3);assert.equal(r(lim(10),1),11.8);assert.equal(r(lim(100),1),16.8);assert.equal(r(lim(1000),1),21.8);
 assert.equal(r(978/(Math.PI*0.0035**2)/1e7,1),2.5);
 // Exercises.
 assert.equal(r(Math.sin(Math.PI/4)/1.333,3),0.530);assert.equal(r(asin(Math.sin(Math.PI/4)/1.333),1),32);assert.equal(r((200/7)**2,0),816);assert.equal(r(lim(20),1),13.3);
 assert.equal(r(asin(1/1.52),1),41.1);assert.equal(r(206265/2000,0),103);assert.equal(r(1860/(206265/2000),0),18);
 assert.equal(r(20/(2*0.53),1),18.9);assert.equal(r(20/(2*0.51),1),19.6);assert.equal(r(20/(2*0.51)-20/(2*0.53),1),0.7);assert.equal(16-34,-18);assert.equal(-18+16,-2);
 assert.equal(r(atan(1.333),1),53.1);assert.equal(r(atan(1.5),1),56.3);
 const AH=Math.PI*1.2**2;assert.equal(r(AH,1),4.5);assert.equal(r(25/AH,1),5.5);assert.equal(r(2.5*Math.log10(25/AH),1),1.9);
 const pup=Math.PI*0.0035**2;assert.equal(r(pup*1e5,2),3.85);assert.equal(r(2.5*Math.log10(978/pup),1),18.5);assert.equal(r(978/AH,-1),220);
 assert.equal(r(200/7,0),29);assert.equal(r(1000/(200/7),0),35);assert.equal((10/1)**2,100);assert.equal(r((39/10)**2,0),15);assert.equal(r(60/(39/10)**2,0),4);
 assert.equal(r(633/20,0),32);assert.equal(r(2200/31.7,0),69);assert.equal(r(2200/500,1),4.4);assert.equal(-1000/-50,20);assert.equal(1000-50,950);
 const sc=206265/123000;assert.equal(r(15*8.2,1),123);assert.equal(r(sc,2),1.68);assert.equal(r(sc*0.015,3),0.025);const th=1.22*2.2e-6/8.2*206265;assert.equal(r(th,3),0.068);assert.equal(r(th/(sc*0.015),1),2.7);
 // Model probes: limiting magnitude at D = 250.75 and 500.5 cm (25% and 50% of the domain) for m0 = 6 and 5.
 assert.deepEqual([lim(250.75),lim(500.5),lim(250.75,5),lim(500.5,5)].map(v=>r(v,2)),[18.77,20.27,17.77,19.27]);
});
test('Fisica 28: interferenza e interferometri, numeri ricalcolati',()=>{
 assert.equal(r(4e3*1e-21/1.7e-15*1e3,1),2.4);assert.equal(r(550**2/300,-2),1000);assert.equal(r(633e-9*1/0.25e-3*1e3,1),2.5);
 assert.equal(r(4*1.33*100,0),532);assert.equal(r(((1.5-1)/(1.5+1))**2,2),0.04);assert.equal(r(0.96**10,2),0.66);assert.equal(r(550/(4*1.38),0),100);
 const I=(D,l)=>Math.cos(Math.PI*D/l)**2;assert.equal(r(I(266,1064),2),0.5);assert.equal(r(I(532,1064),6),0);
 assert.equal(r(0.21/100*1.22*206265/60,0),9);assert.equal(r(1.3e-3/1.07e7*206265e6,0),25);assert.equal(r(1.7/(1.3e8*3.156e7)*1e16,0),4);
 // Exercises.
 assert.equal(r(532e-9*2/0.3e-3*1e3,1),3.5);assert.equal(r(0.15e-3*4e-3/1,9),6e-7);assert.equal(1.5/0.5,3);assert.equal(r(c/600e-9/1e14,1),5);assert.equal(600/1.5,400);
 assert.equal(r(2*0.1e-3/633e-9,0),316);assert.equal(r(4*Math.cos(Math.PI/4)**2,6),2);assert.equal(r(600/(4*1.33),0),113);assert.equal(r(3*600/(4*1.33),0),338);
 assert.equal(r(630**2/20/1e3,0),20);assert.equal(r(2e-3/(630**2/20*1e-9),-1),100);assert.equal(r(1e-21*4e3,20),4e-18);assert.equal(r(4e-18/1064e-9*1e12,0),4);assert.equal(r(4e-18/1.7e-15*1e3,1),2.4);
 assert.equal(r(1.3e-3/16e3*206265,3),0.017);assert.equal(r(0.21/36e3*206265,1),1.2);assert.equal(r(1.3e8*3.156e7/1e15,1),4.1);
 const GMc2=1.32712e20/c**2;assert.equal(r(GMc2,0),1477);const Rg=GMc2*6.5e9;assert.equal(r(Rg/1e12,1),9.6);const sh=2*Math.sqrt(27)*Rg;assert.equal(r(sh/1e14,1),1);const dM=16.8*3.0857e22;assert.equal(r(dM/1e23,2),5.18);assert.equal(r(sh/dM*206265e6,0),40);assert.equal(r(1.3e-3/1.07e7*1e10,1),1.2);
 assert.equal(r(2*11*(3e4)**2/(5e-7*(3e8)**2),2),0.44);
 const Rc=((1.5-1.38**2)/(1.5+1.38**2))**2;assert.equal(r(Rc*100,1),1.4);assert.equal(r((1-Rc)**10,2),0.87);
 const th=0.047/206265;assert.equal(r(th*1e7,2),2.28);assert.equal(r(1.22*575e-9/th,1),3.1);assert.equal(r(170*3.0857e16/1e18,2),5.25);assert.equal(r(th*170*3.0857e16/1e12,1),1.2);assert.equal(r(th*170*3.0857e16/1.39e9,-1),860);
 // Model probes: Michelson output at path differences 500 and 1000 nm (25% and 50% of the domain) for 1064 and 532 nm.
 assert.deepEqual([I(500,1064),I(1000,1064),I(500,532),I(1000,532)].map(v=>r(v,4)),[0.0089,0.9647,0.9647,0.8638]);
});
test('Fisica 29: diffrazione e potere risolutivo, numeri ricalcolati',()=>{
 const as=206264.806,R=(l,D)=>1.22*l/D*as;
 // Bessel J1 from its power series, adequate for the arguments used here.
 const J1=x=>{let t=x/2,s=t;for(let k=1;k<40;k++){t*=-(x*x/4)/(k*(k+1));s+=t;}return s;},A=u=>u===0?1:(2*J1(u)/u)**2,sinc2=x=>(Math.sin(Math.PI*x)/(Math.PI*x))**2;
 assert.equal(r(sinc2(1.4303)*100,1),4.7);assert.equal(r(633e-9/0.1e-3*1e3,1),6.3);assert.equal(r(2*2*6.33e-3*100,1),2.5);
 const z1=3.8317;assert.ok(Math.abs(J1(z1))<1e-4);const J0=x=>{let t=1,s=1;for(let k=1;k<40;k++){t*=-(x*x/4)/(k*k);s+=t;}return s;};assert.equal(r((1-J0(z1)**2)*100,0),84);assert.equal(r((1-2*A(z1/2))*100,0),26);
 assert.equal(r(1.22*0.55*10,1),6.7);assert.equal(r(R(550e-9,2.4),3),0.058);assert.equal(r(R(550e-9,0.2),1),0.7);assert.equal(r(R(550e-9,3e-3),0),46);
 assert.equal(r(R(2e-6,6.5),2),0.08);assert.equal(r(R(20e-6,6.5),1),0.8);assert.equal(r(R(0.21,100)/60,0),9);assert.equal(r(R(550e-9,8),3),0.017);
 assert.equal(r(R(2.2e-6,39),3),0.014);assert.equal(r(R(2.2e-6,6.5)/R(2.2e-6,39),0),6);
 // Nyquist sampling and Hubble WFC3/UVIS (0.0395 arcsec per pixel).
 const lD=550e-9/2.4*as;assert.equal(r(lD,3),0.047);assert.equal(r(lD/2,3),0.024);assert.equal(r(0.0395/(lD/2),1),1.7);assert.equal(r(2*2.4*0.0395/as*1e9,-1),920);
 // Direct imaging: reflected-light and thermal contrast of the Earth, halo at 0.1 arcsec for D = 6 m.
 assert.equal(r((6.371e6/AU)**2*1e9,1),1.8);assert.equal(r(Math.log10((6.371e6/AU)**2*0.37/Math.PI),0),-10);
 const Bp=(l,T)=>1/Math.expm1(h*c/(l*kB*T));assert.equal(r(Math.log10((6.371e6/6.957e8)**2*Bp(10e-6,288)/Bp(10e-6,5772)),0),-7);
 const n=0.1/as/(500e-9/6);assert.equal(r(n,1),5.8);const u=Math.PI*n;assert.equal(r(8/(Math.PI*u**3)*1e4,0),4);assert.ok(8/(Math.PI*u**3)/1e-10>1e6);
 // Gratings, spectrographs and Bragg reflection.
 const d=1e-3/600,deg=x=>Math.asin(x)*180/Math.PI;assert.equal(r(d*1e6,2),1.67);assert.equal(r(deg(656e-9/d),1),23.2);assert.equal(r(deg(2*656e-9/d),1),51.9);assert.ok(3*656e-9/d>1);assert.equal(r(589.3/0.6,0),982);
 assert.equal(r(c/115000/1e3,1),2.6);assert.equal(r(c/115000,-2),2600);
 const K=(P,m)=>Math.cbrt(2*Math.PI*G/P)*m/MSUN**(2/3);assert.equal(r(K(11.862*3.15576e7,1.898e27),1),12.5);assert.equal(r(K(3.15576e7,5.972e24)*100,0),9);assert.ok(59/0.09>600);
 assert.equal(r(deg(0.65/1.6),0),24);assert.equal(r(25*Math.tan(Math.asin(0.65/1.6)),0),11);assert.equal(r(deg(0.65/0.74),0),61);
 // Exercises.
 assert.equal(r(2*633e-9/0.1e-3*1e3,1),12.7);assert.equal(r(1.22*550e-9/0.2*1e9,0),3355);assert.equal(r(1.22*550e-9/3e-3*1e4,1),2.2);
 assert.equal(r(656e-9/d,3),0.394);assert.equal(r(2*656e-9/d,3),0.787);assert.equal(r(3*656e-9/d,2),1.18);assert.equal(r(1.22*0.21/100*1e3,1),2.6);assert.equal(r(R(0.21,100)/60,1),8.8);
 assert.equal(r(1.22*2e-6/6.5*1e7,2),3.75);assert.equal(r(R(2e-6,6.5),3),0.077);assert.equal(r(R(20e-6,6.5),2),0.77);
 assert.equal(r(5e-7/0.15*as,2),0.69);assert.equal(r(1.22*5e-7/8*1e8,1),7.6);assert.equal(r(R(5e-7,8),3),0.016);assert.equal(r(5e-7/0.15/(1.22*5e-7/8),0),44);
 assert.equal(r(0.1/as*1e7,2),4.85);assert.equal(r(1.22*550e-9/(0.1/as),1),1.4);
 assert.equal(r(0.154/0.4,3),0.385);assert.equal(r(deg(0.385),1),22.6);assert.equal(r(2*deg(0.385),1),45.3);assert.equal(r(0.65/1.6,3),0.406);assert.equal(r(0.65/0.74,3),0.878);
 assert.equal(r(0.058/as*1e7,1),2.8);assert.equal(r(0.058/as*3.844e8,0),108);assert.equal(r(4/3.844e8*1e8,2),1.04);assert.equal(r(1.22*550e-9/(4/3.844e8),-1),60);assert.ok(Math.abs(1.22*550e-9/(4/3.844e8)-65)<1);
 assert.equal(r(550*59/3e8*1e4,1),1.1);assert.equal(r(550/115000*1e3,1),4.8);assert.equal(r(550/115000/(550*59/3e8),0),44);
 assert.equal(r(0.09/3e8*1e10,1),3);assert.equal(r(550*0.09/3e8*1e7,2),1.65);assert.equal(r(550*0.09/3e8*10*1e6,2),1.65);assert.ok(1.65/0.2<10);
 assert.equal(r(1.22*0.55*10*2,1),13.4);assert.equal(r(13.4/3.8,1),3.5);assert.equal(r(0.55*10/2,2),2.75);assert.equal(r(3.8/2.75,1),1.4);assert.equal(r(2*3.8/0.55,0),14);
 // Model probes: Rayleigh limit at D = 10.075 and 20.05 m (25% and 50% of the domain) for 0.55 and 2.2 micrometres.
 const m=(x,a)=>1.22*a*1e-6/x*206264.806;assert.deepEqual([m(10.075,.55),m(20.05,.55),m(10.075,2.2),m(20.05,2.2)].map(v=>r(v,4)),[0.0137,0.0069,0.0549,0.0276]);
});
test('Fisica 30: radiazione termica e luce delle stelle, numeri ricalcolati',()=>{
 const b=2.897771955e-3,eV=e,Ts=5772,Rs=6.957e8,P=(l,T)=>2*h*c**2/l**5/Math.expm1(h*c/(l*kB*T));
 // Stefan-Boltzmann constant from h, k and c, and the solar nominal values.
 assert.ok(Math.abs(2*Math.PI**5*kB**4/(15*h**3*c**2)/sigma-1)<1e-9);assert.equal(2**4,16);assert.equal(r((2800/300)**4,-2),7600);
 assert.equal(r(2*c*kB*Ts/(500e-9)**4/P(500e-9,Ts),-1),30);assert.equal(r(h*c/550e-9*1e19,1),3.6);assert.equal(r(h*c/550e-9/eV,2),2.25);assert.equal(r(h*c/10e-6/eV*8,1),1);
 // Wien.
 assert.equal(r(b/Ts*1e9,0),502);assert.equal(r(b/2980*1e9,0),972);assert.equal(r(b/25400*1e9,0),114);assert.equal(r(b/310*1e6,1),9.3);assert.equal(r(b/288*1e6,0),10);
 const fk=2.8214393721*kB/h;assert.equal(r(fk/1e10,2),5.88);assert.equal(r(c/(fk*Ts)*1e9,-1),880);
 // Stefan-Boltzmann, luminosity and solar constant.
 assert.equal(r(sigma*Ts**4/1e7,2),6.29);assert.equal(r(4*Math.PI*Rs**2*sigma*Ts**4/1e26,3),3.828);assert.equal(r(LSUN/(4*Math.PI*AU**2),0),1361);
 // Photons.
 const Em=2.70*kB*Ts;assert.equal(r(Em*1e19,2),2.15);assert.equal(r(Em/eV,2),1.34);assert.equal(r(LSUN/Em/1e45,1),1.8);assert.equal(r(S0/Em/1e21,0),6);assert.equal(r(h*c/(1.12*eV)*1e6,1),1.1);
 // Stars.
 const dS=1/0.37921*3.0857e16,RA=6.048e-3/2/206264.806*dS;assert.equal(r(RA/Rs,2),1.71);assert.equal(r(1.713**2*(9845/Ts)**4,0),25);
 const RB=Math.sqrt(0.02448)*(Ts/25369)**2;assert.equal(r(RB,4),0.0081);assert.equal(r(RB*Rs/1e3,-2),5600);assert.ok(RB*Rs<6.371e6);
 assert.equal(r(760*Rs/AU,1),3.5);assert.ok(760*Rs/AU>1.524&&760*Rs/AU<5.2);assert.equal(r(0.146**2*(2980/Ts)**4,4),0.0015);
 // Planets.
 const Teq=(S,A)=>(S*(1-A)/(4*sigma))**0.25;assert.equal(r(Teq(S0,0.3),0),255);assert.equal(288-255,33);assert.equal(r(Teq(S0/0.723332**2,0.77),0),227);assert.equal(r(737-227,-2),500);assert.equal(r(Teq(S0/1.523679**2,0.25),-1),210);
 assert.equal(r(Teq(S0/16,0.3)/Teq(S0,0.3),2),0.5);assert.equal(r(0.00151/0.0485**2,2),0.64);
 assert.equal(r(Ts*Math.sqrt(Rs/(2*AU))*0.7**0.25,0),r(Teq(S0,0.3),0));
 // Cosmic microwave background.
 const T0=2.72548,hb=h/(2*Math.PI);assert.equal(r(3000/T0,-2),1100);assert.equal(r(fk*T0/1e9,0),160);assert.equal(r(c/(fk*T0)*1e3,1),1.9);assert.equal(r(b/T0*1e3,2),1.06);
 assert.equal(r(4*sigma/c*T0**4/eV/1e6,2),0.26);assert.equal(r(2*1.2020569/Math.PI**2*(kB*T0/(hb*c))**3/1e6,0),411);
 // Experiment and frequent errors.
 assert.equal(r(0.10*900*6/60,0),9);assert.equal(r(9/(0.95*0.01),-1),950);assert.equal(r(950/1361,1),0.7);assert.equal(r(4*Math.PI*AU**2*S0/1e26,1),3.8);
 assert.equal(r((293/20)**4,-3),46000);assert.equal(r(sigma*273.15**4,-2),300);assert.equal(r(1/0.02448,0),41);
 // Exercises.
 assert.equal(r(b/3000*1e9,0),966);assert.equal(r(1e9/(sigma*Ts**4),0),16);assert.equal(r(6.626e-34*3e8/5.5e-7*1e19,2),3.61);assert.equal(r(0.21/550e-9,-4),380000);assert.equal(r(h*c/0.21/eV*1e6,1),5.9);
 assert.equal(0.5**2*2**4,4);assert.equal(r(b/1e-5,-1),290);assert.equal(r(b/1e-3,1),2.9);
 assert.equal(r(4*Math.PI*Rs**2/1e18,2),6.08);assert.equal(r(6.08e18*6.29e7/1e26,2),3.82);assert.equal(r(4*Math.PI*Rs**2*sigma*Ts**4/(4*Math.PI*1.496e11**2),0),1361);
 const RB2=Math.sqrt(0.0245)*(Ts/25400)**2;assert.equal(r(Math.sqrt(0.0245),3),0.157);assert.equal(r((Ts/25400)**2,4),0.0516);assert.equal(r(RB2,4),0.0081);assert.equal(r(RB2*6.957e5,-2),5600);
 assert.equal(r(Teq(1361,0),0),278);
 assert.equal(r(2.70*1.38e-23*5772*1e19,2),2.15);assert.equal(r(LSUN/2.15e-19/1e45,1),1.8);assert.equal(r(1361/2.15e-19/1e21,1),6.3);
 assert.equal(r(764**2/1e5,2),5.84);assert.equal(r((3600/Ts)**4,3),0.151);assert.equal(r(764**2*(3600/Ts)**4/1e4,1),8.8);assert.equal(r(764**2*(3600/Ts)**4*LSUN/1e31,1),3.4);
 assert.equal(r(Math.sqrt(0.00151),4),0.0389);assert.equal(r((Ts/2980)**2,2),3.75);assert.equal(r(Math.sqrt(0.00151)*(Ts/2980)**2,3),0.146);
 const SV=1361/0.723**2;assert.equal(r(SV,-2),2600);assert.equal(r(Teq(2600,0.77),0),227);assert.equal(r(Teq(2600,0.3),0),299);
 const kev=kB/eV;assert.equal(r(kev*1e5,3),8.617);assert.equal(r(2.70*kev*2.725*1e4,2),6.34);assert.equal(r(411*2.70*kev*2.725,2),0.26);assert.equal(r(4*sigma/c*1e16,3),7.566);assert.equal(r(4*sigma/c*2.725**4*1e14,2),4.17);
 const Pp=0.15*900*4.2/60;assert.equal(r(Pp,2),9.45);assert.equal(r(Pp/(0.95*0.012),-1),830);assert.equal(r(Pp/(0.95*0.012)/1361*100,0),61);assert.equal(r(4*Math.PI*1.496e11**2*1361/1e26,2),3.83);
 const Sb=1361*0.00151/0.0485**2;assert.equal(r(Sb,0),874);assert.equal(r(Sb/1361*100,0),64);assert.equal(r(Teq(874,0.3),0),228);assert.equal(r(Teq(1361,0.3)-Teq(874,0.3),0),27);
 // Model probes: luminosity at T = 11875 and 21250 K (25% and 50% of the domain) for R = 1 and 10 solar radii.
 const m=(x,a)=>a*a*(x/5772)**4;assert.deepEqual([m(11875,1),m(21250,1),m(11875,10),m(21250,10)].map(v=>+v.toPrecision(4)),[17.92,183.7,1792,18370]);
});
test('Fisica 31: legge di Gauss, gusci, pianeti e condensatori, numeri ricalcolati',()=>{
 const k=1/(4*Math.PI*eps0),ME=5.972e24,RE=6.371e6;
 // Gauss and Coulomb give the same field; the radius cancels in the flux.
 for(const rr of [0.1,1,7])assert.ok(Math.abs(k*1e-9/rr**2*4*Math.PI*rr**2-1e-9/eps0)<1e-9);
 const g=(x,gs)=>x<1?gs*x:gs/(x*x);assert.equal(r(g(0.5,9.81),1),4.9);assert.equal(r(g(2,9.81),2),2.45);
 // Earth interior: two-layer model and PREM-like core boundary value.
 assert.equal(r(ME/(4/3*Math.PI*RE**3)/1e3,2),5.51);assert.equal(r(3480/6371,2),0.55);const gc=G*0.325*ME/3.48e6**2;assert.equal(r(gc,1),10.7);
 const GM=3.986004418e14;assert.equal(r(GM/G/1e24,3),5.972);assert.equal(r(0.00015/6.6743*1e5,1),2.2);
 const Pc=5514*9.82*RE/2;assert.equal(r(Pc/1e9,-1),170);assert.equal(r(Pc/101325/1e6,1),1.7);assert.equal(r(3344*1.62*1.7374e6/2/1e9,1),4.7);
 const T=2*Math.PI*Math.sqrt(RE/9.82);assert.equal(r(T/60,0),84);assert.equal(r(T/120,0),42);
 // Capacitors and energy.
 assert.equal(r(eps0*1/1e-3*1e9,2),8.85);assert.equal(r(1e-3/eps0/1e6,0),113);assert.equal(r(4*Math.PI*eps0*RE*1e6,-1),710);
 assert.equal(r(0.5*100e-6*300**2,1),4.5);assert.equal(r(0.5*eps0*(3e6)**2,-1),40);assert.equal(r(0.5*eps0*130**2*1e8,1),7.5);
 const R2=(a,b)=>((Math.sqrt(a)-Math.sqrt(b))/(Math.sqrt(a)+Math.sqrt(b)))**2;assert.equal(r(R2(3.2,80)*100,0),44);assert.equal(r(R2(3.2,8)*100,0),5);
 // Global electric circuit.
 const sg=eps0*130,QE=sg*4*Math.PI*RE**2;assert.equal(r(sg*1e9,2),1.15);assert.equal(r(QE/1e5,0),6);assert.equal(r(QE/1e3/60,0),10);assert.equal(r(130*60e3/1e6,1),7.8);assert.equal(r(130*60e3/250e3,-1),30);
 // Experiment: kitchen capacitor.
 assert.equal(r(eps0*2.3*0.04/10e-6*1e9,-1),80);
 // Exercises.
 assert.equal(r(200*0.5*Math.cos(Math.PI/3),6),50);assert.equal(r(1e-9/eps0,0),113);assert.equal(r(1e-9/eps0/6,1),18.8);assert.equal(r(k*5e-6/0.04/1e6,2),1.12);
 assert.equal(r(4*Math.PI*eps0*RE*1e6,0),709);assert.equal(r(1/(4*Math.PI*eps0*RE),-2),1400);assert.equal(r(eps0*0.01/1e-3*1e12,1),88.5);assert.equal(r(eps0*0.01/1e-3*100*1e9,2),8.85);
 assert.equal(r(g(0.5,1.62),2),0.81);assert.equal(r(g(2,1.62),2),0.41);
 assert.equal(r(2e-6/(2*Math.PI*eps0*0.05)/1e5,1),7.2);assert.equal(r(1e-6/(2*eps0)/1e4,1),5.6);assert.equal(r(1e-6/eps0/1e5,2),1.13);
 assert.equal(r(4*Math.PI*RE**2/1e14,2),5.1);assert.equal(r(QE/1e5,1),5.9);assert.equal(r(4.5/1e-3/1e3,1),4.5);
 assert.equal(r(9.82*3480/6371,1),5.4);assert.equal(r(Math.sqrt(9.82*RE)/1e3,1),7.9);
 assert.equal(r(Pc/1e11,1),1.7);assert.ok(Pc<364e9/2);
 const a=4.217e8,Tp=1.769*86400;assert.equal(r(4*Math.PI**2*a**3/(G*Tp**2)/1e27,2),1.9);
 const C=4*Math.PI*eps0*6.371e6*6.431e6/6e4;assert.equal(r(C,3),0.076);assert.equal(r(C*2.5e5/1e4,1),1.9);assert.equal(r(5.9e5/(C*2.5e5),-1),30);assert.equal(r(250e3/130/1e3,1),1.9);
 assert.equal(r(Math.sqrt(3.2),2),1.79);assert.equal(r(Math.sqrt(80),2),8.94);assert.equal(r(Math.sqrt(8),2),2.83);assert.equal(r(R2(3.2,80),2),0.44);assert.equal(r(R2(3.2,8),2),0.05);assert.equal(r(R2(3.2,80)/R2(3.2,8),0),9);
 const v=c/Math.sqrt(3.2);assert.equal(r(v/1e8,2),1.68);assert.equal(r(3000/v*1e6,0),18);
 // Model probes: gravity at r/R = 1 and 2 (25% and 50% of the domain) for g_s = 9.81 (Earth) and 3.71 m/s2 (Mars).
 assert.deepEqual([g(1,9.81),g(2,9.81),g(1,3.71),g(2,3.71)].map(v=>r(v,4)),[9.81,2.4525,3.71,0.9275]);
});
test('Fisica 32: particelle cariche nei campi magnetici, numeri ricalcolati',()=>{
 const u=1.66053906892e-27,rL=(m,v,q,B)=>m*v/(q*B);
 // Thomson, cyclotron frequencies and Larmor radii.
 assert.equal(r(e/me/1e11,3),1.759);assert.ok(mp/me>1000);assert.equal(r(e/(2*Math.PI*me)/1e9,0),28);assert.equal(r(e/(2*Math.PI*mp)/1e6,1),15.2);assert.equal(r(e*46e-6/(2*Math.PI*me)/1e6,1),1.3);
 assert.equal(r(rL(mp,4e5,e,5e-9)/1e3,-1),840);assert.equal(r(rL(me,4e5,e,5e-9),-1),450);assert.ok(mp/me>1800&&mp/me<2000);
 const pc1=Math.sqrt(1+2*0.938);assert.equal(r(pc1,1),1.7);assert.ok(pc1*1e9/(c*5e-9)>1e9);
 // Hall voltage in copper, mass spectrometry and the comet 67P.
 assert.equal(r(5/(8.5e28*e*1e-4)*1e6,1),3.7);assert.equal(r(5.3e-4/1.56e-4,0),3);
 // Accelerators.
 assert.equal(r(7e12/(c*2804),2),8.33);assert.equal(r(7e12/(c*8.33)/1e3,1),2.8);
 // Mirror and cutoff.
 const Rc=l=>14.9*Math.cos(l*Math.PI/180)**4;assert.equal(r(Rc(0),1),14.9);assert.equal(r(Rc(45),1),3.7);assert.equal(r(Rc(60),2),0.93);assert.ok(Rc(60)<1);
 assert.equal(r(2*Math.PI*me*40e6/e*1e3,1),1.4);assert.equal(r(2*Math.PI*me*40e6/e/46e-6,-1),30);
 // Experiment.
 assert.equal(r(rL(me,1e7,e,46e-6),1),1.2);assert.equal(r(0.5*me*1e14/e,-2),300);
 // Exercises.
 assert.equal(r(e*4e5*5e-9*1e22,1),3.2);assert.equal(r(mp*9.81*1e26,1),1.6);assert.equal(r(e*4e5*5e-9/(mp*9.81),-4),20000);
 assert.equal(r(rL(me,1e7,e,46e-6),2),1.24);assert.equal(r(e/(2*Math.PI*me)/1e10,2),2.8);assert.equal(r(e*46e-6/(2*Math.PI*me)/1e6,2),1.29);
 assert.equal(r(1e4/0.02/1e5,1),5);assert.equal(r(rL(mp,4e5,e,5e-9)/1e3,0),835);assert.equal(r(rL(me,4e5,e,5e-9),0),455);assert.equal(r(mp/me,0),1836);
 assert.equal(r(2*Math.PI*mp/(e*5e-9),1),13.1);assert.equal(r(e*5e-9/(2*Math.PI*mp),3),0.076);
 const rN=(m,V,B)=>Math.sqrt(2*m*u*V/e)/B;assert.equal(r(rN(19.99244,1000,0.1)*100,1),20.4);assert.equal(r(rN(21.991385,1000,0.1)*100,1),21.4);assert.equal(r(2*(rN(21.991385,1000,0.1)-rN(19.99244,1000,0.1))*100,1),2);
 const Te=2*Math.PI*me/(e*46e-6);assert.equal(r(rL(me,1e7*0.5,e,46e-6),2),0.62);assert.equal(r(Te*1e7,1),7.8);assert.equal(r(1e7*Math.cos(Math.PI/6)*Te,1),6.7);
 assert.equal(r(pc1,2),1.7);assert.equal(r(1.7e9/(3e8*5e-9)/1e9,1),1.1);assert.ok(1.13e9/3.844e8>2.9&&1.13e9/3.844e8<3);
 assert.equal(r(e*1.5/(2*Math.PI*mp)/1e6,1),22.9);const Kc=(e*1.5*0.5)**2/(2*mp);assert.equal(r(Kc*1e12,1),4.3);assert.equal(r(Kc/e/1e6,0),27);
 assert.equal(r(7e12/(3e8*2804),1),8.3);
 const pc45=Rc(45);assert.equal(r(pc45,2),3.73);assert.equal(r(Math.sqrt(pc45**2+0.938**2),2),3.84);assert.equal(r(Math.sqrt(pc45**2+0.938**2)-0.938,1),2.9);
 const Beq=30/64,Bs=30*Math.sqrt(1+3*0.75);assert.equal(r(Beq,3),0.469);assert.equal(r(Bs,1),54.1);assert.equal(r(Beq/Bs*1e3,1),8.7);assert.equal(r(Math.asin(Math.sqrt(Beq/Bs))*180/Math.PI,1),5.3);
 assert.equal(r(2*Math.PI*9.11e-31*4e7/1.6e-19*1e3,2),1.43);
 assert.equal(r(rN(18.011,3000,0.35)*100,2),9.56);assert.equal(r(rN(19.017,3000,0.35)*100,2),9.83);assert.equal(r(5.3/1.56,1),3.4);
 // Model probes: Larmor radius at B = 25.75 and 50.5 nT (25% and 50% of the domain) for v = 400 and 800 km/s.
 const m=(x,a)=>1.67262192e-27*a*1e3/(1.602176634e-19*x*1e-9)/1e3;assert.deepEqual([m(25.75,400),m(50.5,400),m(25.75,800),m(50.5,800)].map(v=>r(v,1)),[162.2,82.7,324.3,165.4]);
});
test('Fisica 33: correnti, dipoli e dinamo dei pianeti, numeri ricalcolati',()=>{
 const Bw=(I,r)=>mu0*I/(2*Math.PI*r);assert.equal(r(Bw(10,0.05)*1e6,0),40);assert.ok(Math.abs(mu0/(4*Math.PI*1e-7)-1)<1e-9);
 // Loop on the axis tends to the dipole law.
 const Bz=z=>1/(1+z*z)**1.5;assert.ok(Math.abs(Bz(3)*27-1)<0.15);assert.ok(Math.abs(Bz(10)*1000-1)<0.02);
 assert.equal(r(mu0*1000*2*1e3,1),2.5);
 // Earth's dipole from the IGRF-14 coefficients (2025).
 const Bd=Math.hypot(29350,1410.3,4545.5)*1e-9,a=6.3712e6,m=4*Math.PI*a**3*Bd/mu0;assert.equal(r(m/1e22,1),7.7);assert.equal(r(Bd*1e6,0),30);assert.equal(r(Math.acos(29350e-9/Bd)*180/Math.PI,0),9);
 assert.ok(0.2*30e-6>1e-6&&0.5*30e-6<1e-4);
 // Dynamo: decay time, equivalent current, relative moments.
 assert.equal(r(mu0*1e6*3.48e6**2/Math.PI**2/3.156e7,-4),50000);assert.equal(r(m/(Math.PI*3.48e6**2)/1e9,0),2);
 const rel=(B,R)=>B/(Bd*1e9)*(R/6371.2)**3;assert.equal(r(1/rel(750,2634),-2),600);assert.equal(r(1/rel(195,2440),-3),3000);
 assert.equal(r(30/1000*1e3,0),30);assert.equal(r(30/5,0),6);
 // Magnetopause.
 const Pd=n=>n*1e6*mp*(4e5)**2,mpz=(B0,P)=>(2*B0**2/(mu0*P))**(1/6);assert.equal(r(Pd(5)*1e9,1),1.3);assert.equal(r(mpz(Bd,Pd(5)),0),10);assert.equal(r((1-2**(-1/6))*100,0),11);
 assert.equal(r(mpz(195e-9,Pd(5)/0.387**2),1),1.4);assert.equal(r(mpz(428e-6,Pd(5)/5.2**2),0),42);
 // Exercises.
 assert.equal(r(Bw(10,0.05)*1e5,1),4);assert.equal(r(mu0*2/0.1*1e5,1),2.5);assert.equal(r(mu0*100/(2*Math.PI*0.01)*1e3,1),2);assert.equal(r(mu0*2000*1e3,1),2.5);assert.equal(r(2.5e-3/50e-6,0),50);
 const mu=100*0.5*Math.PI*0.02**2;assert.equal(r(mu,3),0.063);assert.equal(r(mu*0.1*1e3,1),6.3);assert.equal(r(30/64,2),0.47);
 assert.equal(r(mu0*20*1e-3/(2*Math.PI*4e-6)*1e3,1),1);assert.equal(r(Bw(20,2e-3)*1e3,1),2);assert.equal(r(Bw(20,4e-3)*1e3,1),1);
 assert.equal(r(4*Math.PI*6.371e6**3*29.7e-6/mu0/1e22,1),7.7);assert.equal(r(4*Math.PI*6.371e6**3*29.7e-6/mu0/(Math.PI*3.48e6**2)/1e9,0),2);assert.equal(r(2*29.7,0),59);
 assert.equal(r(mu0*500/(2*Math.PI*0.1)*1e3,1),1);assert.equal(r(2*mu*0.1*1e2,1),1.3);
 const rj=(71400/6378)**3;assert.equal(r(rj,-2),1400);assert.equal(r(20000/rj,0),14);assert.equal(r(0.31*20000/rj,1),4.4);
 assert.equal(r(5e6*1.67e-27*16e10*1e9,2),1.34);assert.equal(r(2*(29.7e-6)**2/(mu0*1.34e-9)/1e6,2),1.05);assert.equal(r((2*(29.7e-6)**2/(mu0*1.34e-9))**(1/6),0),10);
 assert.equal(r(1.34e-9/27*1e11,0),5);assert.equal(r(mpz(428e-6,1.34e-9/5.2**2),0),42);
 assert.equal(r(0.025*780000/1e3,1),19.5);assert.equal(r(2*0.025*780000/1e3,0),39);
 assert.equal(r(1.34e-9/0.387**2*1e9,1),8.9);assert.equal(r(mpz(1.95e-7,8.9e-9),1),1.4);
 // Model probes: equatorial dipole field at r/R = 5.75 and 10.5 (25% and 50% of the domain) for B0 = 30 and 428 microtesla.
 const md=(x,b)=>b*1000/x**3;assert.deepEqual([md(5.75,30),md(10.5,30),md(5.75,428),md(10.5,428)].map(v=>+v.toPrecision(4)),[157.8,25.92,2251,369.7]);
});
test('Fisica 34: induzione, circuiti oscillanti e radio, numeri ricalcolati',()=>{
 const fLC=(L,C)=>1/(2*Math.PI*Math.sqrt(L*C)),w2=2*Math.PI;
 // Jansky, motional emf, Io and Europa.
 assert.equal(r(c/20.5e6,1),14.6);assert.equal(r(40e-6*60*250,1),0.6);assert.equal(r(428/5.9**3,0),2);assert.equal(r(2e-6*3.64e6*57e3/1e3,-2),400);
 // Induced electric field in a circular region.
 assert.equal(r(2.5e5*1e-8*1e3,1),2.5);
 // RL, energy densities, LC frequency.
 assert.equal(r((1-Math.exp(-1))*100,0),63);assert.equal(r(Math.exp(-1)*100,0),37);
 assert.equal(r((50e-6)**2/(2*mu0)*1e3,1),1);assert.equal(r(9/(2*mu0)/1e6,1),3.6);const um=1e20/(2*mu0);assert.equal(r(um/1e25,0),4);assert.ok(um/c**2/11340>1e4&&um/c**2/11340<1e5);
 assert.equal(r(fLC(1e-6,100e-12)/1e6,1),15.9);assert.equal(r(fLC(1e-6,400e-12)/fLC(1e-6,100e-12),2),0.5);
 // RLC and AC.
 const Q=Math.sqrt(1e-6/100e-12)/2;assert.equal(Q,50);assert.equal(r(fLC(1e-6,100e-12)/Q/1e6,1),0.3);assert.equal(r(230*Math.SQRT2,0),325);
 // Radio astronomy.
 assert.equal(r(1/((w2*1420e6)**2*1e-6)*1e12,2),0.01);assert.equal(r(c/1420.405751e6*100,1),21.1);
 // Experiment: free fall over 1 m.
 assert.equal(r(Math.sqrt(2/9.81),2),0.45);
 // Exercises.
 assert.equal(r(100*0.5*0.01/0.1,1),5);assert.equal(r(mu0*1e6*1e-4*0.1*1e6,1),12.6);assert.equal(r(10e-3/100*1e3,2),0.1);assert.equal(r(fLC(1e-6,400e-12)/1e6,1),8);assert.equal(0.5*0.5*4,1);
 assert.equal(r(1/((w2*20.5e6)**2*1e-6)*1e12,0),60);assert.equal(r((3/5e-5)**2/1e9,1),3.6);
 const XL=w2*10e6*1e-6,XC=1/(w2*10e6*100e-12);assert.equal(r(XL,1),62.8);assert.equal(r(XC,0),159);assert.equal(r(XL-XC,1),-96.3);assert.equal(r(Math.hypot(50,XL-XC),0),109);assert.equal(r(Math.atan((XL-XC)/50)*180/Math.PI,0),-63);
 const Eg=200*0.2*0.01*w2*50;assert.equal(r(Eg,0),126);assert.equal(r(Eg/Math.SQRT2,0),89);assert.equal(r(230*2*Math.cos(Math.PI/6),0),398);assert.equal(230*2,460);
 const EIo=2e-6*3.64e6*5.7e4;assert.equal(r(EIo/1e5,1),4.1);assert.equal(r(EIo*1e6/1e11,0),4);
 assert.equal(r(2.5e5*1e-8*1e3,1),2.5);assert.equal(r(2.5e5*1e-8*1e6,-2),2500);
 assert.equal(r(1.42e9*1e5/3e8/1e6,2),0.47);assert.equal(r(1420.406e6/1e3/1e6,1),1.4);
 assert.equal(r(1e20/(2*1.257e-6)/1e25,1),4);assert.equal(r(1e20/(2*1.257e-6)/c**2/1e8,1),4.4);assert.equal(r(1e20/(2*1.257e-6)/c**2/11340,-3),39000);
 // Model probes: LC frequency at C = 257.5 and 505 pF (25% and 50% of the domain) for L = 1 and 10 microhenry.
 const m=(x,a)=>1/(2*Math.PI*Math.sqrt(a*1e-6*x*1e-12))/1e6;assert.deepEqual([m(257.5,1),m(505,1),m(257.5,10),m(505,10)].map(v=>r(v,3)),[9.918,7.082,3.136,2.24]);
});
test('Fisica 35: equazioni di Maxwell e magnetismo della materia, numeri ricalcolati',()=>{
 const muB=e*(h/(2*Math.PI))/(2*me),R=0.05;
 // Maxwell: speed of light and displacement current between circular plates.
 assert.equal(r(1/Math.sqrt(mu0*eps0)/1e8,3),2.998);assert.equal(r(mu0*1*0.03/(2*Math.PI*R**2)*1e6,1),2.4);assert.equal(r(50/2.4,0),21);
 // Electron moment and thermal energy.
 assert.equal(r(muB*1e24,3),9.274);assert.equal(r(2*muB/e*1e4,1),1.2);assert.equal(r(kB*300/e,3),0.026);assert.ok(kB*300/(2*muB)>200);assert.ok(mp/me>1800);
 // Diamagnetic levitation of water.
 assert.equal(r(mu0*1000*9.81/9e-6,-2),1400);
 // Two-level paramagnet.
 const M=(T,B)=>Math.tanh(muB*B/(kB*T));assert.equal(r(muB/kB*300/300,3),0.672);assert.equal(r(muB/(kB*300)*1e4,0),22);assert.equal(r(M(300,1)*100,2),0.22);assert.equal(r(M(1,1)*100,0),59);
 // Ferromagnetism: iron moment per atom.
 const nFe=7874/55.845e-3*6.02214076e23;assert.equal(r(1.71e6/nFe/muB,1),2.2);
 // Experiment: water versus iron susceptibility.
 assert.ok(5000/9e-6>1e8);
 // Exercises.
 assert.equal(r(1e-9*1e6*1e3,1),1);assert.equal(r(1.2566e-6*8.854e-12*1e17,4),1.1126);assert.equal(r(1/Math.sqrt(1.2566e-6*8.854e-12)/1e8,3),2.998);
 assert.equal(r(1.602e-19*1.055e-34/(2*9.109e-31)*1e24,2),9.28);assert.equal(r(2*muB*1e23,3),1.855);assert.equal(r(2*muB/e*1e4,2),1.16);assert.equal(r(kB*300/e,4),0.0259);
 assert.equal(r(mu0*1*0.05/(2*Math.PI*R**2)*1e6,1),4);assert.equal(r(mu0*1/(2*Math.PI*0.1)*1e6,1),2);assert.equal(r(1/(eps0*Math.PI*R**2)/1e13,1),1.4);
 assert.equal(r(muB/kB,3),0.672);assert.equal(r(M(1,1),3),0.586);assert.equal(r(M(4.2,1),3),0.159);assert.equal(r(muB/(kB*4.2),3),0.16);assert.ok((muB/(kB*4.2)-M(4.2,1))/M(4.2,1)<0.01);assert.ok((muB/kB-M(1,1))/M(1,1)>0.14);
 assert.equal(r(1.257e-6*1000*9.81/9e-6/16,0),86);
 assert.equal(r(nFe/1e28,2),8.49);assert.equal(r(1.71e6/nFe*1e23,1),2);assert.equal(r((853-288)/25,0),23);
 const mAg=107.8682*1.66053906892e-27,aSG=muB*1000/mAg,tSG=0.035/550;assert.equal(r(mAg*1e25,2),1.79);assert.equal(r(muB*1000*1e21,2),9.27);assert.equal(r(aSG/1e4,1),5.2);assert.equal(r(tSG*1e5,1),6.4);assert.equal(r(0.5*aSG*tSG**2*1e3,2),0.1);assert.equal(r(aSG*tSG**2*1e3,1),0.2);
 assert.equal(r(1.41e-26*3/(1.381e-23*310)*1e6,1),9.9);
 const jd=8.85e-12*2*Math.PI*1e8*1000;assert.equal(r(jd,1),5.6);assert.ok(4000/jd>700);assert.ok(1/Math.sqrt(Math.PI*1e8*mu0*4)<0.05);
 assert.equal(r((3.107-2.998)/2.998*100,1),3.6);assert.equal(r((2.98-2.998)/2.998*100,1),-0.6);
 // Model probes: magnetisation at T = 75.75 and 150.5 K (25% and 50% of the domain) for B = 1 and 10 T.
 const m=(x,b)=>Math.tanh(9.2740100783e-24*b/(1.380649e-23*x));assert.deepEqual([m(75.75,1),m(150.5,1),m(75.75,10),m(150.5,10)].map(v=>+v.toPrecision(4)),[0.008867,0.004463,0.08844,0.0446]);
});
test('Fisica 36: relatività ristretta, numeri ricalcolati',()=>{
 const g=b=>1/Math.sqrt(1-b*b),tau=2.197e-6;
 // Muons and time dilation.
 assert.equal(r(c*2.2e-6,-2),700);assert.ok(c*2.2e-6>600);assert.equal(r(g(0.995),0),10);assert.equal(r(2.2*g(0.995),0),22);assert.ok(0.995*c*2.2e-6*g(0.995)>6000);
 assert.equal(r((250/c)**2/2*1e13,0),3);assert.equal(r(g(0.5),2),1.15);assert.equal(r(g(0.9),1),2.3);assert.equal(r(g(0.99),1),7.1);
 assert.equal(r(2.197*29.33,1),64.4);assert.equal(-184+144,-40);assert.equal(96+179,275);
 assert.equal(r(15/g(0.995),1),1.5);assert.equal(r(Math.exp(-15000/(0.995*c*tau*g(0.995))),2),0.1);
 // Velocity addition, Doppler, energy.
 assert.equal(r(1.6/1.64,3),0.976);assert.equal(r(Math.sqrt(1.5/0.5)-1,2),0.73);
 assert.equal(r((g(0.99)-1)*0.511,1),3.1);assert.equal(r(0.5*0.511*0.99**2,2),0.25);const gL=6.8e12/938.272e6;assert.equal(r(gL,-2),7200);assert.ok(c/(2*gL**2)<3);
 assert.equal(r(LSUN/c**2/1e9,1),4.3);assert.equal(r(LSUN/c**2*4.6e9*3.156e7/MSUN*1e4,0),3);
 // Twins, interstellar travel.
 assert.equal(r(4.24/0.9,1),4.7);assert.equal(r(g(0.9),2),2.29);assert.equal(r(4.24/0.9/g(0.9),1),2.1);assert.ok(4.24/0.9*2-4.24/0.9/g(0.9)*2>5);
 assert.equal(r((g(0.9)-1)*1000*c**2/1e20,1),1.2);assert.equal(r((g(0.9)-1)*1000*c**2/620e18,2),0.19);assert.equal(r(4.24/0.2,0),21);assert.equal(r((g(0.2)-1)*100,0),2);
 // GPS.
 assert.equal(r(c*1e-9,1),0.3);assert.equal(r((3874/c)**2/2*86400*1e6,0),7);assert.equal(r(45.7-7.2,0),39);assert.ok(38e-6*c>1e4);
 // Superluminal motion.
 assert.equal(r(g(0.99)*0.99,1),7);assert.equal(r(g(0.9)*0.9,1),2.1);
 // Experiment: one muon per cm2 per minute.
 assert.equal(r(1e4/60,-1),170);
 // Exercises.
 assert.equal(g(0.6),1.25);assert.equal(r(g(0.8),2),1.67);assert.equal(r(g(0.98),2),5.03);assert.equal(r(2.2*g(0.98),1),11.1);assert.equal(r(0.98*3e8*1.11e-5/1e3,1),3.3);
 assert.equal(100/1.25,80);assert.equal(r(c*38e-6/1e3,0),11);assert.equal(r(me*c**2*1e14,2),8.19);assert.equal(r(me*c**2/1.602176634e-13,3),0.511);assert.equal(r((0.5+0.5)/1.25,1),0.8);
 assert.equal(r(7660/c*1e5,2),2.56);assert.equal(r((7660/c)**2/2*1e10,1),3.3);assert.equal(r(182.5*86400/1e7,2),1.58);assert.equal(r((7660/c)**2/2*182.5*86400*1e3,0),5);
 const z1=Math.sqrt(1.1/0.9);assert.equal(r(z1,4),1.1055);assert.equal(r(656.3*z1,1),725.6);assert.equal(r(656.3*1.1,1),721.9);assert.equal(r(656.3*z1-656.3*1.1,1),3.6);
 assert.equal(r(g(0.99),2),7.09);assert.equal(r(g(0.99)*0.99*0.511,2),3.59);assert.ok(3.11/0.25>12);
 assert.equal(r(3.83e26/9e16/1e9,1),4.3);assert.equal(r(3.83e26/9e16*3.16e7/1e17,1),1.3);
 assert.equal(r(Math.sqrt(1-1/29.33**2),5),0.99942);assert.equal(r(0.99942*c*64.4e-6/1e3,1),19.3);assert.equal(r(0.99942*c*64.4e-6/(Math.PI*14),-1),440);
 assert.equal(r(6.8e12/9.383e8,-1),7250);assert.equal(r(c/(2*7250**2),1),2.9);
 const tFS=1907/(0.995*3e8);assert.equal(r(tFS*1e6,2),6.39);assert.equal(r(568*Math.exp(-6.39/2.2),0),31);assert.equal(r(568*Math.exp(-6.39/22),0),425);assert.equal(r(6.39/(2.2*Math.log(568/412)),0),9);
 const th=10*Math.PI/180;assert.equal(r(0.99*Math.sin(th)/(1-0.99*Math.cos(th)),1),6.9);assert.equal(r(Math.acos(0.99)*180/Math.PI,1),8.1);
 assert.equal(r(300e12*3600/1e18,2),1.08);assert.equal(r(300e12*3600/c**2,0),12);
 assert.equal(r(3.2e20/9.383e8/1e11,1),3.4);assert.equal(r(1e5*3.16e7/3.4e11,0),9);
 // Model probes: dilated time at beta = 0.2475 and 0.495 (25% and 50% of the domain) for tau = 1 and 2.2 microseconds.
 const m=(x,t)=>t/Math.sqrt(1-x*x);assert.deepEqual([m(0.2475,1),m(0.495,1),m(0.2475,2.2),m(0.495,2.2)].map(v=>r(v,4)),[1.0321,1.1509,2.2706,2.532]);
});
test('Fisica 37: onde di materia, atomi e righe spettrali, numeri ricalcolati',()=>{
 const hb=h/(2*Math.PI),eV=e,RH=10967758.34,hc=h*c/e*1e9,lam=(n1,n2)=>1e9/(RH*(1/n1**2-1/n2**2));
 // Matter waves.
 assert.equal(r(h/Math.sqrt(2*me*e)*1e9,3),1.226);assert.equal(r(h/Math.sqrt(2*me*54*e)*1e9,3),0.167);assert.equal(r(h/(0.145*40)*1e34,1),1.1);
 assert.equal(r(h/Math.sqrt(2*1.67492750e-27*0.025*e)*1e9,2),0.18);assert.equal(r(hc*1e-6/Math.sqrt(0.2**2+2*0.2*0.51099895)*1e3,1),2.5);
 // Uncertainty, atom size, natural width.
 assert.equal(r(hb/2e-10*1e25,1),5.3);assert.equal(r(hb/2e-10/me/1e5,1),5.8);assert.equal(r(hb/(2e-6*1e-9)*1e20,1),5.3);
 const a0=4*Math.PI*eps0*hb**2/(me*e**2);assert.equal(r(a0*1e12,1),52.9);assert.equal(r(me*e**4/(8*eps0**2*h**2)/e,1),13.6);
 const A=6.2648e8;assert.equal(r(1e9/A,1),1.6);assert.equal(r(hb*A/e*1e7,1),4.1);assert.equal(r(A/(2*Math.PI)/1e6,-1),100);
 const nuL=c/(lam(1,2)*1e-9);assert.equal(r(A/(2*Math.PI)/nuL*1e8,1),4);assert.equal(r(nuL/1e15,3),2.466);const vth=Math.sqrt(2*kB*1e4/mp);assert.equal(r(vth/1e3,1),12.8);assert.equal(r(vth/c*1e5,1),4.3);assert.equal(r(vth/c/(A/(2*Math.PI)/nuL),-2),1100);
 // Particle in a box.
 const E1=L=>h**2/(8*me*L**2)/e;assert.equal(r(E1(1e-10),1),37.6);assert.equal(r(E1(1e-9),3),0.376);assert.ok(E1(1e-8)<4e-3);assert.equal(r(4*0.376,2),1.5);assert.equal(r(9*0.376,2),3.38);assert.equal(r(hc/(3*0.376),-2),1100);
 // Hydrogen levels and series.
 assert.equal(r(hc/13.6057,1),91.1);assert.equal(r(lam(1,1e9),1),91.2);assert.equal(r(lam(1,2),1),121.6);assert.equal(r(lam(2,3),1),656.5);assert.equal(r(lam(2,4),1),486.3);assert.equal(r(lam(2,5),1),434.2);assert.equal(r(lam(2,6),1),410.3);assert.equal(r(lam(2,1e9),1),364.7);
 assert.equal(r(lam(3,4),1),1875.6);assert.equal(r(lam(3,1e9),1),820.6);assert.equal(r((1-RH/10973731.568)*1e4,1),5.4);assert.equal(r(2.77e-4*c/1e3,0),83);assert.equal(r(656.47-656.28,2),0.19);
 assert.equal(2*3**2,18);assert.equal(1+3+5,9);
 const nu=RH*c*(1/109**2-1/110**2);assert.equal(r(nu/1e6,0),5009);assert.equal(r(110**2*a0*1e6,2),0.64);assert.ok(110**2>1e4);assert.equal(r(RH*c/1e15,3),3.288);
 // Deuterium.
 const md=3.3435837724e-27,rD=(1+me/mp)/(1+me/md);assert.equal(r(rD,6),1.000272);assert.equal(r(656.47*(1-1/rD),3),0.179);assert.equal(r((rD-1)*c/1e3,0),82);
 // Ionisation energies (NIST).
 assert.equal(r(24.587,1),24.6);assert.equal(r(5.392,1),5.4);assert.equal(r(21.565,1),21.6);assert.equal(r(5.139,1),5.1);assert.equal(r(15.760,1),15.8);
 // Zeeman effect and magnetic resonance.
 const z=B=>2.5*e*(630.25e-9)**2*B/(4*Math.PI*me*c);assert.equal(r(z(0.3)*1e12,1),13.9);assert.equal(r(z(0.1)*1e12,1),4.6);assert.equal(r(e/(4*Math.PI*me*c),1),46.7);assert.equal(r(630.25e-9**2*1e13,2),3.97);
 assert.equal(r(0.3/50e-6,-3),6000);assert.equal(r(42.577*1.5,0),64);
 // X rays.
 assert.equal(r(hc/35000*1e3,1),35.4);assert.equal(r(hc/30000*1e3,1),41.3);assert.equal(r(hc/60000*1e3,1),20.7);
 const Ka=Z=>0.75*13.6*(Z-1)**2;assert.equal(r(Ka(26)/1e3,2),6.38);assert.equal(r(hc/Ka(26),3),0.194);assert.equal(r(Ka(29)/1e3,2),8);assert.equal(r(hc/Ka(29),3),0.155);assert.ok(Math.abs(Ka(26)/6400-1)<0.01&&Math.abs(Ka(29)/8050-1)<0.01);
 // Lasers, lunar ranging.
 assert.equal(r(2/(kB*300/e),1),77.4);assert.equal(r(Math.log10(Math.exp(-2/(kB*300/e))),0),-34);
 const Er=hc/694.3;assert.equal(r(Er,2),1.79);assert.equal(r(Er/(kB*300/e),0),69);assert.equal(r(Math.log10(Math.exp(-Er/(kB*300/e))),0),-30);assert.equal(r(Er/(kB/e*Math.LN2),-3),30000);
 assert.equal(r(2*384400e3/c,2),2.56);
 // Masers and NGC 4258.
 assert.equal(r(c/22.235e9*100,2),1.35);assert.equal(r(Math.hypot(0.082,0.076)/7.576*100,1),1.5);
 const M=4e7*1.989e30,rr=0.2*3.0857e16,v=Math.sqrt(G*M/rr);assert.equal(r(M/1e37,2),7.96);assert.equal(r(G*M/1e27,2),5.31);assert.equal(r(rr/1e15,2),6.17);assert.equal(r(v/1e3,-1),930);assert.equal(r(2*Math.PI*rr/v/1e10,1),4.2);assert.equal(r(2*Math.PI*rr/v/3.156e7,-2),1300);
 assert.equal(r(0.2/7.58e6*1e8,1),2.6);assert.equal(r(0.2/7.58e6*206264.8e3,1),5.4);
 // Stellar lines: Boltzmann and Saha.
 const b=T=>4*Math.exp(-10.2/(kB*T/e));assert.equal(r(kB*5772/e,3),0.497);assert.equal(r(b(5772)*1e9,0),5);assert.equal(r(kB*1e4/e,3),0.862);assert.equal(r(b(1e4)*1e5,1),2.9);assert.equal(r(b(1e4)/b(5772),-3),6000);
 const saha=T=>{const ne=20/(kB*T),s=(2*Math.PI*me*kB*T/h**2)**1.5/ne*Math.exp(-13.598*e/(kB*T));return [b(T)/(1+b(T))/(1+s),s/(1+s)];};
 let Tm=5000;for(let T=5000;T<=25000;T+=10)if(saha(T)[0]>saha(Tm)[0])Tm=T;assert.equal(r(Tm,-2),9900);assert.ok(saha(Tm)[0]<1e-5);assert.ok(saha(9000)[1]>0.2&&saha(8000)[1]<0.05);assert.ok(saha(2e4)[1]>0.99);
 // Nebulae and the bench spectroscope.
 assert.ok(2.5e19/1e4>1e15);const th=Math.asin(546.1e-9/2e-6);assert.equal(r(th*180/Math.PI,1),15.8);assert.equal(r(Math.tan(th)*100,0),28);
 // Model probes: Balmer and Lyman wavelengths at n2 = 4 and 6 (25% and 50% of the domain) for n1 = 2 and 1.
 assert.deepEqual([lam(2,4),lam(2,6),lam(1,4),lam(1,6)].map(v=>r(v,2)),[486.27,410.29,97.25,93.78]);
});
test('Fisica 38: nuclei, decadimenti e datazioni, numeri ricalcolati',()=>{
 const u=931.49410242,kc=1.43996,mH=1.007825032,mn=1.008664916,yr=3.15576e7,age=(T,x)=>T/Math.LN2*Math.log1p(x);
 // Nucleus discovery and properties.
 assert.equal(r(2*79*kc/5,0),46);assert.equal(r(2*79*kc/7.7,1),29.5);assert.equal(r(1.2*197**(1/3),1),7);assert.equal(r(29.5/7,1),4.2);
 assert.equal(r(1.2*238**(1/3),1),7.4);const rho=3*1.66054e-27/(4*Math.PI*(1.2e-15)**3);assert.equal(r(rho/1e17,1),2.3);assert.equal(r(rho*1e-6/1e3/1e6,-1),230);
 assert.equal(r(1.4*MSUN/(4/3*Math.PI*1.2e4**3)/1e17,1),3.8);assert.equal(r((3*1.99e30/(4*Math.PI*rho))**(1/3)/1e3,0),13);
 assert.equal(r(1.2*12**(1/3),2),2.75);assert.equal(r(1.2*208**(1/3),2),7.11);assert.equal(r(208/12,0),17);
 assert.ok(2.01e19/13.8e9>1e9);
 // Binding energies (AME2020).
 const B=(Z,A,M)=>(Z*mH+(A-Z)*mn-M)*u;assert.equal(r(B(1,2,2.014101778),2),2.22);assert.equal(r(B(2,4,4.002603254),1),28.3);assert.equal(r(B(2,4,4.002603254)/4,2),7.07);
 assert.equal(r(B(26,56,55.934936326)/56,2),8.79);assert.equal(r(B(28,62,61.928345)/62,1),8.8);assert.equal(r(B(92,238,238.050786936)/238,2),7.57);
 assert.equal(r(2*1.007825+2*1.008665,6),4.03298);assert.equal(r(4.03298-4.002603,6),0.030377);assert.equal(r(0.030377*931.5,1),28.3);
 // Decay law and activity.
 assert.equal(r(Math.LN2/(1600*yr)*6.02214076e23/226.0254/1e10,1),3.7);assert.equal(1000/2**3,125);
 assert.equal(r(Math.LN2/87.7*1e3,1),7.9);assert.equal(r(Math.LN2/(87.7*yr)*1e10,1),2.5);
 // Alpha decay and tunnelling.
 assert.equal(r((238.0507870-234.0436014-4.0026033)*u,2),4.27);assert.equal(r(0.004583*931.5,2),4.27);
 const Rb=1.2*(234**(1/3)+4**(1/3));assert.equal(r(Rb,1),9.3);assert.equal(r(2*90*kc/Rb,0),28);assert.equal(r(2*90*kc/4.27,0),61);
 assert.equal(r(Math.log10(4.468e9*yr/0.294e-6),0),24);
 // Radioisotope generators.
 const Pu=Math.LN2/(87.7*yr)*6.02214076e23/238.0495599*5.593*1.602176634e-13;assert.equal(r(Pu,2),0.57);assert.equal(r(2400*2**(-49/87.7),-1),1630);assert.equal(r(2**(-49/87.7),2),0.68);
 // Beta decay, geoneutrinos, aluminium-26.
 assert.equal(r(878.4*Math.LN2/60,0),10);assert.equal(r((20+4)/44,1),0.5);
 const NAl=2.8*1.98841e30/(26*1.66054e-27),lAl=Math.LN2/(7.2e5*yr);assert.equal(r(NAl/1e56,1),1.3);assert.equal(r(lAl*1e14,2),3.05);assert.equal(r(NAl*lAl/1e42,1),3.9);
 assert.equal(r(NAl*lAl*1.809*1.602176634e-13/1e30,1),1.1);assert.equal(r(NAl*lAl*1.809*1.602176634e-13/LSUN,-2),3000);
 // Radiometric dating.
 assert.equal(age(4.47,1),4.47);assert.equal(r(age(4.47,3)/4.47,6),2);assert.equal(r(age(4.47,7)/4.47,6),3);assert.equal(r(age(0.704,3),2),1.41);
 assert.equal(r(5700*Math.log2(4),-2),11400);assert.equal(r(5700*Math.log2(10),-2),18900);assert.ok(0.5**(50000/5700)<1/400);
 assert.equal(r(1e-6/238*6.02214076e23/1e15,1),2.5);assert.equal(r(4567.30-4404,0),163);
 const l8=Math.LN2/4.468,l5=Math.LN2/0.7038;assert.equal(r(l5*4.55,2),4.48);assert.equal(r(l8*4.55,3),0.706);assert.equal(r(Math.exp(l5*4.55)-1,1),87.3);assert.equal(r(Math.exp(l8*4.55)-1,2),1.03);
 assert.equal(r((Math.exp(l5*4.55)-1)/(Math.exp(l8*4.55)-1)/137.8,2),0.62);
 assert.equal(r(2**(-2.2/2.6),2),0.56);assert.equal(r(2**(-7.5/2.6),2),0.14);assert.equal(r(4.5e9/2.6e6,-2),1700);
 // Dose.
 assert.equal(r(1.8/2.4*12,0),9);assert.equal(360*1.8+500*0.67,983);assert.equal(r(983/2.4,-1),410);assert.ok(648/983>0.65);
 // Dice experiment.
 assert.equal(r(Math.LN2/Math.log(6/5),1),3.8);assert.equal(r(600*(5/6)**10,0),97);
 // Model probes: age at D/P = 0.5 and 1 (25% and 50% of the domain) for half-lives of 4.47 and 0.704 billion years.
 assert.deepEqual([age(4.47,0.5),age(4.47,1),age(0.704,0.5),age(0.704,1)].map(v=>r(v,4)),[2.6148,4.47,0.4118,0.704]);
});
test('Fisica 39: energia dal nucleo e fusione nelle stelle, numeri ricalcolati',()=>{
 const MeV=1.602176634e-13,yr=3.15576e7,u=931.49410242,kev=kB/e/1e3,life=(M,a)=>10*M**(1-a);
 // Kelvin-Helmholtz time and Eddington's mass defect.
 const tKH=G*MSUN**2/(6.957e8*LSUN);assert.equal(r(tKH/yr/1e6,0),31);assert.ok(4.54e9/(tKH/yr)>100);
 assert.equal(r(G*1.99e30**2/1e50,2),2.64);assert.equal(r(6.96e8*3.83e26/1e35,2),2.67);assert.equal(r(G*1.99e30**2/(6.96e8*3.83e26)/1e14,1),9.9);assert.equal(r(4540/31.4,-1),140);
 // Fission.
 assert.equal(r((8.5-7.6)*236,-2),200);assert.equal(r(200*MeV*1e11,1),3.2);assert.equal(r(1/(200*MeV)/1e10,1),3.1);
 const N235=1000/235.0439*6.02214076e23;assert.equal(r(N235/1e24,2),2.56);assert.equal(r(N235*200*MeV/1e13,1),8.2);assert.equal(r(N235*200*MeV/29e6/1e3,-2),2800);
 // Oklo.
 const l8=Math.LN2/4.468,l5=Math.LN2/0.7038,r0=0.7204/99.2742,f=t=>{const x=r0*Math.exp((l5-l8)*t);return 100*x/(1+x);};
 assert.equal(r(f(0),2),0.72);assert.equal(r(f(2),1),3.7);assert.equal(r((l5-l8)*2,2),1.66);assert.equal(r(Math.exp(1.66),1),5.3);assert.equal(r(0.00726*Math.exp(1.66),3),0.038);
 // Coulomb barrier, Gamow peak.
 const kT=15.7e6*kev;assert.equal(r(kT,2),1.35);assert.equal(r(1.44/2,2),0.72);assert.equal(r(720/1.35,-1),530);assert.equal(r(500/1.353,-1),370);
 const EG=2*938.272/2*(Math.PI/137.035999)**2*1e3;assert.equal(r(EG,0),493);const E0=T=>(493*(T*kev)**2/4)**(1/3);assert.equal(r(E0(15.7e6),1),6.1);assert.equal(r(E0(15.7e6)/kT,1),4.5);assert.equal(r(E0(25e6),1),8.3);
 const sum=(kt,eg)=>{let s=0;for(let E=0.5;E<=40;E+=0.5)s+=Math.exp(-E/kt-Math.sqrt(eg/E));return s;};
 assert.equal(r(sum(1.488,493)/sum(1.353,493),2),1.65);const EGc=2*12/13*938.272*(6*Math.PI/137.036)**2;assert.equal(r(EGc,1),32.8);assert.equal(r((EGc*1e3*1.353**2/4)**(1/3),0),25);
 assert.ok(sum(1.353,EGc*1e3)/sum(1.353,493)<1e-17);assert.equal(r(sum(1.488,EGc*1e3)/sum(1.353,EGc*1e3),0),6);
 // Proton-proton chain and solar budget.
 const dm=4*1.007825032-4.002603254;assert.equal(r(dm*u,1),26.7);assert.equal(r(dm/(4*1.007825032)*100,2),0.71);assert.equal(r(0.53/26.73*100,0),2);
 assert.equal(r(4*1.007825-4.002603,6),0.028697);assert.equal(r(0.028697/4.0313*100,2),0.71);
 const mdot=LSUN/(0.0071*c**2);assert.equal(r(mdot/1e11,1),6);assert.equal(r(mdot*1e10*yr/MSUN,2),0.1);assert.equal(r(LSUN/c**2/1e9,1),4.3);
 const nnu=2*LSUN/(26.2*MeV);assert.equal(r(nnu/2/1e37,1),9.1);assert.equal(r(nnu/1e38,1),1.8);assert.equal(r(4*Math.PI*1.496e11**2/1e23,2),2.81);assert.equal(r(nnu/(4*Math.PI*AU**2)/1e4/1e10,1),6.5);assert.equal(r(6.5e10*86400/1e15,1),5.6);
 assert.equal(r(6.957e8/c,1),2.3);assert.equal(r(150/11.34,0),13);
 // Coal Sun.
 assert.ok(MSUN*29e6/LSUN/yr<1e4&&MSUN*29e6/LSUN/yr>1e3);
 // Lifetimes.
 assert.equal(r(life(10,3.5)*1e3,0),32);assert.equal(r(life(20,3.5)*1e3,1),5.6);assert.equal(r(life(0.5,3.5),0),57);assert.equal(r(life(4,3.5)*1e3,-1),310);assert.equal(4**2.5,32);
 assert.equal(life(20,3)*1e3,25);assert.equal(r(life(20,4)*1e3,2),1.25);assert.equal(r(20**0.5,1),4.5);assert.ok(10**3.5>3000);
 // Controlled fusion.
 assert.equal(r(17.6/5,1),3.5);assert.equal(r(17.6*4/5,1),14.1);assert.equal(r(150/15.7,1),9.6);assert.equal(r(1/1.56e-4,-2),6400);
 assert.equal(3e21/(1e20*15),2);assert.ok(2.5e25/1e20>1e5);
 const eDT=17.59*MeV/(5.0301*1.66054e-27);assert.equal(r(eDT/1e14,1),3.4);assert.equal(r(eDT/(N235*200*MeV),0),4);assert.equal(r(3.4e14*2e-7/1e6,0),68);assert.equal(r(69/29,1),2.4);assert.ok(2.4/2e-7>1e7);
 assert.equal(r(3.15/2.05,2),1.54);assert.equal(r(8.6/2.08,1),4.1);
 // Model probes: lifetime at M = 5.375 and 10.25 solar masses (25% and 50% of the domain) for alpha = 3.5 and 3.
 assert.deepEqual([life(5.375,3.5),life(10.25,3.5),life(5.375,3),life(10.25,3)].map(v=>+v.toPrecision(4)),[0.1493,0.02973,0.3461,0.09518]);
});
