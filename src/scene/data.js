export function random(seed = 4141) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }
const ARM_TINT=[[1,.72,.4],[.5,.72,1],[.72,.6,1],[.45,.88,.64]];
export function stars(count = 1000000, seed = 554412) {
    if (!Number.isInteger(count) || count < 1 || count > 1000000)
        throw new RangeError('Conteggio stelle non valido');
    const r = random(seed), a = new Float32Array(count * 7);
    for (let i=0;i<count;i++) {
        const halo=i%13===0,core=i%5===0,d=core?Math.pow(r(),1.65)*10:2+Math.pow(r(),.72)*37;
        const gaussian=(r()+r()+r()+r()-2),theta=(i%4)*Math.PI/2+1.85*Math.log(d+1)+gaussian*(core?2.5:.24);
        const j=i*7,heightNoise=r()+r()+r()+r()-2;
        a[j]=halo?(r()-.5)*145:Math.cos(theta)*d;
        a[j+1]=halo?(r()-.5)*85:heightNoise*(core?2.2:.40+d*.02);
        a[j+2]=halo?(r()-.5)*145:Math.sin(theta)*d;
        const warm=core||r()<.16,b=.65+r()*.35;
        a[j+3]=warm?b:b*.62;a[j+4]=warm?b*.79:b*.78;a[j+5]=warm?b*.54:b;
        // Arm i%4 is the arm of discipline i%4: a light tint, stronger away from the core, lets the
        // legend colours be read on the stars themselves. No extra random draws, positions unchanged.
        if(!halo&&!core){const t=ARM_TINT[i%4],k=Math.min(.62,.3+d*.012);a[j+3]+=(t[0]*b-a[j+3])*k;a[j+4]+=(t[1]*b-a[j+4])*k;a[j+5]+=(t[2]*b-a[j+5])*k;}
        a[j+6]=.22+r()*.62+(r()<.002?1.7:0);
        if(core&&!halo){const polar=r()*2-1,phi=r()*Math.PI*2,radial=d*Math.sqrt(1-polar*polar);a[j]=Math.cos(phi)*radial;a[j+1]=d*polar*.48;a[j+2]=Math.sin(phi)*radial;}
    }
    return a;
}
export function planetPositions() {
    const r = random(610);
    const a = [];
    for (let s = 0; s < 4; s++)
        for (let i = 0; i < 25; i++) {
            const radius = 8 + Math.floor(i / 5) * 4.3 + (r() - .5) * .8, theta = s * Math.PI / 2 + .1 + (i % 5 + .5) * 1.36 / 5;
            const size = i === 7 ? .86 : .36 + r() * .22;
            a.push({ index: s * 25 + i, sector: s, x: Math.cos(theta) * radius, y: (r() - .5) * 2.6, z: Math.sin(theta) * radius, r: size, spin: r() * Math.PI * 2 });
        }
    return a;
}
export function raySphere(origin, direction, center, radius) {
    const o = origin.map((v, i) => v - center[i]), b = o.reduce((n, v, i) => n + v * direction[i], 0), c = o.reduce((n, v) => n + v * v, 0) - radius * radius, d = b * b - c;
    if (d < 0)
        return null;
    const t = -b - Math.sqrt(d);
    return t >= 0 ? t : (-b + Math.sqrt(d) >= 0 ? -b + Math.sqrt(d) : null);
}

export function backgroundStars(count=6000,seed=91071){
    const r=random(seed),a=new Float32Array(count*7);
    for(let i=0;i<count;i++){const y=r()*2-1,t=r()*Math.PI*2,k=Math.sqrt(1-y*y),j=i*7;a.set([Math.cos(t)*k*170,y*170,Math.sin(t)*k*170,.6+r()*.4,.65+r()*.35,.7+r()*.3,.4+r()*1.6],j);}
    return a;
}
