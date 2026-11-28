/** Quick travel between the places discovered in the zone of the landing site (1.76.0). The explorer may jump
 * to the base, to its ship, and to every place it knows: the settlements and places registered in the diary,
 * and the sites and rare places registered, detected by the impulse of the scanner or reached on foot. The
 * map of the zone lists them with the time the same way would take on foot, running and in the rover. */
import { METRE, WALK, RUN, ROVER } from './explorer.js';

/** Minutes to cover `units` on foot, running and in the rover, at the speeds of the explorer. */
export function travelTimes(units) {
    const m = units / METRE;
    return { metres: m, walk: m / WALK / 60, run: m / RUN / 60, rover: m / ROVER.top / 60 };
}
/** Minutes as words: under one minute, whole minutes, or hours and minutes. */
export function minutesText(min) {
    if (min < 1) return 'meno di un minuto';
    const r = Math.round(min); if (r < 60) return r + ' min';
    const h = Math.floor(r / 60), q = r % 60; return h + ' h' + (q ? ' ' + q + ' min' : '');
}
/** The places known on surface `s` with the diary record `rec`: the base (the middle of the stations), the ship
 * when it stands in the zone, the settlements and places registered (l), the sites known (r, k) and the rare
 * places known (n, k). Each has an id, a name, a kind, the point (x, z) and the distance at which the explorer
 * stops before it. */
export function knownPlaces(s, rec = {}, ship = null) {
    const st = s.stations || [], base = st.length ? [st.reduce((a, q) => a + q.position[0], 0) / st.length, st.reduce((a, q) => a + q.position[2], 0) / st.length] : [14, 28];
    const k = new Set(rec.k || []), l = new Set(rec.l || []), r = new Set([...(rec.r || []), ...k]), n = new Set([...(rec.n || []), ...k]);
    const out = [{ id: 'base', name: 'Base', kind: 'base', x: base[0], z: base[1], gap: 8 }];
    if (ship) out.push({ id: 'nave', name: ship.name, kind: 'nave', x: ship.x, z: ship.z, gap: 3 });
    for (const t of s.settlements || []) if (l.has(t.id)) out.push({ id: t.id, name: t.name, kind: t.kind, x: t.position[0], z: t.position[2], gap: 6 });
    for (const p of s.places || []) if (l.has(p.id)) out.push({ id: p.id, name: p.name, kind: 'luogo', x: p.position[0], z: p.position[2], gap: 4 });
    for (const x of s.sites || []) if (r.has(x.id)) out.push({ id: x.id, name: x.name, kind: 'sito', state: x.state, x: x.x, z: x.z, gap: 22 });
    for (const x of s.rares || []) if (n.has(x.id)) out.push({ id: x.id, name: x.name, kind: 'raro', x: x.x, z: x.z, gap: Math.min(40, x.r * .6) });
    return out;
}
/** Words for the kind of a known place. */
export const PLACE_WORDS = Object.freeze({ base: 'base', nave: 'nave', colonia: 'colonia', villaggio: 'villaggio', luogo: 'luogo', sito: 'sito', raro: 'luogo raro' });
/** The known place nearest to the screen point (x, y), within `radius` pixels, given a function from the zone
 * to the screen; null when there is none. */
export function placeAt(list, toScreen, x, y, radius = 16) {
    let best = null, d0 = radius;
    for (const p of list) { const [sx, sy] = toScreen(p.x, p.z), d = Math.hypot(sx - x, sy - y); if (d <= d0) { d0 = d; best = p; } }
    return best;
}
