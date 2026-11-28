/** Compass and long-range scanner of the explorer (1.74.0).
 * East is where the sun of the landing site rises (src/worlds/ecosystem.js, dayOf and sunAt); north is a quarter
 * turn to the left of east, so that facing north the east is on the right, as on a terrestrial compass. Bearings
 * are in degrees, clockwise from north. The strip of the compass shows the directions within half its field of
 * view on either side of the view of the camera.
 * The impulse of the scanner reaches SCAN_RANGE units (about 1.3 km): it detects the sites and the rare places
 * of the zone within that distance, which the compass then shows with their direction and distance. */
import { dayOf } from './ecosystem.js';
import { METRE } from './explorer.js';

export const POINTS = Object.freeze(['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']);
/** Reach of the impulse (units), its cooldown (ms) and the field of view of the strip (degrees). */
export const SCAN_RANGE = 820, SCAN_COOLDOWN = 4000, COMPASS_FIELD = 120;

/** North and east of the zone, as unit vectors (x, z), and the latitude of the landing site. */
export function axesOf(s) {
    const D = dayOf(s.genome, s.site, s.light.direction), noon = [Math.cos(D.az), Math.sin(D.az)];
    const east = [-noon[1], noon[0]], north = [east[1], -east[0]];
    return { north, east, noon, lat: D.lat };
}
/** Bearing in degrees (0 to 360, clockwise from north) of the direction (dx, dz). */
export function bearingOf(axes, dx, dz) {
    const b = Math.atan2(dx * axes.east[0] + dz * axes.east[1], dx * axes.north[0] + dz * axes.north[1]) * 180 / Math.PI;
    return (b % 360 + 360) % 360;
}
/** Name of the nearest of the eight points of the compass. */
export const pointOf = b => POINTS[Math.round(((b % 360) + 360) % 360 / 45) % 8];
/** Signed angle in degrees of the direction d from the view f (both in x, z): positive to the right of the view. */
export function sideAngle(f, d) {
    const right = [-f[1], f[0]];
    return Math.atan2(d[0] * right[0] + d[1] * right[1], d[0] * f[0] + d[1] * f[1]) * 180 / Math.PI;
}
/** Distance in metres or kilometres, in Italian. */
export const distanceText = units => { const m = units / METRE; return m >= 1000 ? (m / 1000).toFixed(1).replace('.', ',') + ' km' : Math.round(m) + ' m'; };
/** Entries of the zone (with x, z and an id) within `range` of the point (x, z), nearest first. */
export function detect(list, x, z, range = SCAN_RANGE) {
    return list.map(e => ({ e, d: Math.hypot(e.x - x, e.z - z) })).filter(o => o.d <= range).sort((a, b) => a.d - b.d).map(o => o.e);
}
/** Marks of the strip: for each point (x, z, with any other fields) its side angle from the view f at the
 * position (ax, az), its distance in units and whether it lies inside the field; points outside the field are
 * pinned to its edges. Cardinal points come first, with their names. */
export function compassMarks(axes, f, ax, az, points, field = COMPASS_FIELD) {
    const half = field / 2, out = [];
    POINTS.forEach((name, k) => {
        const a = k * Math.PI / 4, d = [axes.north[0] * Math.cos(a) + axes.east[0] * Math.sin(a), axes.north[1] * Math.cos(a) + axes.east[1] * Math.sin(a)], side = sideAngle(f, d);
        if (Math.abs(side) <= half) out.push({ name, cardinal: k % 2 === 0, side, inside: true });
    });
    for (const p of points) {
        const dx = p.x - ax, dz = p.z - az, d = Math.hypot(dx, dz), side = d ? sideAngle(f, [dx / d, dz / d]) : 0;
        out.push({ ...p, side: Math.max(-half, Math.min(half, side)), inside: Math.abs(side) <= half, distance: d });
    }
    return out;
}
