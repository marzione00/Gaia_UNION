/** Where the ships of a system are and where they point. A ship parks next to a station or above a planet;
 * between two places it follows an arc raised above the plane of the orbits and kept away from the star,
 * accelerating and braking at the ends. `site(place)` gives { position, radius } of a station or a planet
 * at the time asked (src/scene/world.js). */

/** Drawn size (radius in system units) of each ship class. */
export const SHIP_SIZE = { navetta: .06, corriere: .07, cargo: .1, cisterna: .1, rimorchiatore: .07, scientifica: .08, esploratrice: .09, passeggeri: .1, posaboe: .07, soccorso: .07, sonda: .05, gru: .08 };
const smooth = u => u * u * (3 - 2 * u), norm = v => { const l = Math.hypot(...v); return l > 1e-9 ? v.map(x => x / l) : [0, 0, 1]; };

/** Parking point of ship `k` near a place: on a ring around it, slightly above or below its plane. */
export function parking(site, k) {
    const a = k * 2.39996 + 1.1, r = site.radius * 1.9 + .12, y = site.radius * .35 * Math.sin(k * 1.7);
    return [site.position[0] + Math.cos(a) * r, site.position[1] + y, site.position[2] + Math.sin(a) * r];
}
/** Control point of the arc from a to b: the middle of the arc is lifted by an eighth of the distance and,
 * when the straight path would pass within `avoid` of the star away from its ends, pushed out to 1,2 times
 * that radius on the side of the closest approach. */
export function control(a, b, avoid) {
    const ab = [b[0] - a[0], b[2] - a[2]], L2 = ab[0] ** 2 + ab[1] ** 2, L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const t = L2 > 1e-9 ? Math.max(0, Math.min(1, -(a[0] * ab[0] + a[2] * ab[1]) / L2)) : 0, q = [a[0] + ab[0] * t, a[2] + ab[1] * t], d = Math.hypot(...q);
    let mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + L * .12, (a[2] + b[2]) / 2];
    // Only a crossing in the middle of the path is moved; a place close to the star is reached directly.
    if (d < avoid && t > .05 && t < .95) { const n = d > 1e-6 ? [q[0] / d, q[1] / d] : (L2 > 1e-9 ? [-ab[1] / Math.sqrt(L2), ab[0] / Math.sqrt(L2)] : [1, 0]); mid = [n[0] * avoid * 1.2, mid[1], n[1] * avoid * 1.2]; }
    // A quadratic arc passes through (a + 2c + b) / 4 halfway: c is chosen so that this point is `mid`.
    return [2 * mid[0] - (a[0] + b[0]) / 2, 2 * mid[1] - (a[1] + b[1]) / 2, 2 * mid[2] - (a[2] + b[2]) / 2];
}
/** Position, heading and engine thrust (0 to 1) of a ship at `time`. */
export function shipPose(ship, time, site, avoid) {
    if (ship.phase !== 'travel') {
        const s = site(ship.at), p = parking(s, ship.id);
        return { position: p, forward: norm(s.position.map((v, i) => v - p[i])), thrust: 0, docked: s.position };
    }
    const u = Math.max(0, Math.min(1, (time - ship.t0) / Math.max(1e-6, ship.t1 - ship.t0))), e = smooth(u);
    const A = parking(site(ship.from), ship.id), B = parking(site(ship.to), ship.id), C = control(A, B, avoid), w = 1 - e;
    const position = A.map((v, i) => w * w * v + 2 * w * e * C[i] + e * e * B[i]);
    const forward = norm(A.map((v, i) => 2 * w * (C[i] - v) + 2 * e * (B[i] - C[i])));
    return { position, forward, thrust: Math.min(1, u * 6, (1 - u) * 6) };
}
/** Model matrix of a ship (column-major): the bow (+z of the model) along `forward`, y kept up. */
export function shipMatrix(position, forward, scale) {
    let x = [forward[2], 0, -forward[0]]; const l = Math.hypot(x[0], x[2]);
    x = l > 1e-6 ? [x[0] / l, 0, x[2] / l] : [1, 0, 0];
    const f = forward, y = [f[1] * x[2] - f[2] * x[1], f[2] * x[0] - f[0] * x[2], f[0] * x[1] - f[1] * x[0]];
    return new Float32Array([x[0] * scale, x[1] * scale, x[2] * scale, 0, y[0] * scale, y[1] * scale, y[2] * scale, 0, f[0] * scale, f[1] * scale, f[2] * scale, 0, position[0], position[1], position[2], 1]);
}
