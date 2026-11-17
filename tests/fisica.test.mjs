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
