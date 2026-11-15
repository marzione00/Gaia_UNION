/** Small geometric primitives: every stroke is a solid 3D tube, not an image. */
const norm = v => {const length = Math.hypot(...v); return length > 1e-12 ? v.map(x => x / length) : [1, 0, 0];};
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
export function tubePath(points, radius = 0.035, sides = 6) {
    if (!Array.isArray(points) || points.length < 2 || points.some(p => !Array.isArray(p) || p.length !== 3 || p.some(x => !Number.isFinite(x))))
        throw new TypeError('Punti 3D non validi');
    if (!Number.isFinite(radius) || radius <= 0 || !Number.isInteger(sides) || sides < 3 || sides > 32)
        throw new RangeError('Sezione del tubo non valida');
    const vertices = [], indices = [];
    points.forEach((point, i) => {
        const a = points[Math.max(0, i-1)], b = points[Math.min(points.length-1, i+1)];
        const direction = norm(b.map((x,k) => x-a[k]));
        const u = norm(cross(direction, Math.abs(direction[2]) < .9 ? [0,0,1] : [0,1,0]));
        const v = cross(direction, u);
        for (let j=0;j<sides;j++) {
            const angle = j * Math.PI * 2 / sides;
            const normal = u.map((x,k) => x*Math.cos(angle)+v[k]*Math.sin(angle));
            vertices.push(...point.map((x,k) => x+radius*normal[k]), ...normal, i/(points.length-1), j/sides, 1,1,1,1);
            if (i < points.length-1) {
                const n=i*sides+j, next=i*sides+(j+1)%sides;
                indices.push(n,next,n+sides,next,next+sides,n+sides);
            }
        }
    });
    return {v:new Float32Array(vertices),i:new Uint32Array(indices),stride:12};
}
export function mergeMeshes(meshes) {
    const v=[], i=[];
    for (const m of meshes) {
        const offset = v.length / 12;
        for (const x of m.v) v.push(x);
        for (const x of m.i) i.push(x+offset);
    }
    return {v:new Float32Array(v),i:new Uint32Array(i),stride:12};
}
