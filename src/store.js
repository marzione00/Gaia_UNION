import { cleanAtlas } from './navigation/atlas-model.js';
import { cleanCourseRecords } from './education/course-engine.js';
import { cleanMissionRecords } from './education/mission-engine.js';
import { INSTRUMENTS } from './navigation/instruments.js';
import { UNIT_COUNT } from './scene/systems.js';
import { cleanSolved } from './navigation/expeditions.js';
import { BIOME } from './worlds/biomes.js';
/** Kinds of weather of the zone (1.79.0), as in src/worlds/weather.js. */
const WEATHER = ['sereno', 'nuvoloso', 'pioggia', 'neve', 'nebbia', 'polvere', 'cenere'];
export const STORE_KEY = 'gaia.beyond-knowledge.v1';
export function fresh() { return { schema: 1, notes: {}, read: [], quiz: {}, missions: {}, courses: {}, atlas: cleanAtlas(), bookmarks: [], scenarios: [], explore: {}, solved: [], preferences: { quality: 1000000, graphics: 'high', motion: true, explorer: true }, updatedAt: null }; }
/** Exploration diary: per planet index, the registered species (s0, s1…), places (l0, l1…), the
 * instruments whose measurements are in the log (m), the biomes crossed (b), the sites (r) and the rare places (n)
 * registered, those the scanner has detected (k), and the landings of the ship (t). Planet indices run up to
 * UNIT_COUNT - 1. */
export function cleanExplore(value) {
    const out = {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) return out;
    const known = new Set(INSTRUMENTS.map(i => i.id));
    for (const [k, v] of Object.entries(value)) {
        if (!/^\d{1,3}$/.test(k) || Number(k) >= UNIT_COUNT || !v || typeof v !== 'object') continue;
        const ids = (list, test, most = 20) => Array.isArray(list) ? [...new Set(list.filter(x => typeof x === 'string' && test(x)))].slice(0, most) : [];
        // Up to 24 species per planet since 1.63.0, numbered from s0 to s23.
        const rec = { s: ids(v.s, x => /^s\d{1,2}$/.test(x), 32), l: ids(v.l, x => /^l\d$/.test(x)) }, m = ids(v.m, x => known.has(x));
        if (m.length) rec.m = m;
        if (typeof v.at === 'string' && v.at.length < 40) rec.at = v.at;
        // v: the explorer has landed on the planet, which shows the presence of life on its card.
        if (v.v === 1) rec.v = 1;
        // p (1.68.0): metres walked and driven by the explorer, best jump in centimetres and number of jumps; z
        // (1.76.0): the highest climb with the jetpack, in centimetres.
        const whole = (x, top) => Number.isInteger(x) && x >= 0 && x <= top;
        if (v.p && typeof v.p === 'object' && whole(v.p.w, 1e7) && whole(v.p.d, 1e7) && whole(v.p.j, 1e4) && whole(v.p.n, 1e6) && v.p.w + v.p.d + v.p.n > 0) { rec.p = { w: v.p.w, d: v.p.d, j: v.p.j, n: v.p.n }; if (whole(v.p.z, 1e5) && v.p.z > 0) rec.p.z = v.p.z; }
        // b (1.71.0): the biomes crossed by the explorer, at most the eight of a planet; r (1.73.0): the sites
        // registered, r0 to r18.
        const b = ids(v.b, x => Object.hasOwn(BIOME, x), 8); if (b.length) rec.b = b;
        const r = ids(v.r, x => /^r(1[0-8]|\d)$/.test(x), 19); if (r.length) rec.r = r;
        // n (1.74.0): the rare places registered, n0 to n8; f (1.78.0): the minor places registered, f0 to f39; k:
        // the sites, rare places and minor places detected by the impulse of the scanner, which the compass shows.
        const n = ids(v.n, x => /^n[0-8]$/.test(x), 9); if (n.length) rec.n = n;
        const f = ids(v.f, x => /^f([1-3]?\d)$/.test(x), 40); if (f.length) rec.f = f;
        const found = ids(v.k, x => /^(r(1[0-8]|\d)|n[0-8]|f([1-3]?\d))$/.test(x), 68); if (found.length) rec.k = found;
        // e (1.79.0): the kinds of weather met on the planet (src/worlds/weather.js, WEATHER_KINDS).
        const e = ids(v.e, x => WEATHER.includes(x), 7); if (e.length) rec.e = e;
        // t (1.75.0): the landings of the ship of the explorer on the planet.
        if (whole(v.t, 1e6) && v.t > 0) rec.t = v.t;
        if (rec.s.length || rec.l.length || m.length || rec.v || rec.p || rec.b || rec.r || rec.n || rec.f || rec.k || rec.e || rec.t) out[k] = rec;
    }
    return out;
}
export function cleanState(value) {
    if (!value || typeof value !== 'object' || value.schema !== 1)
        throw new TypeError('Formato del diario non riconosciuto');
    const o = fresh();
    if (value.notes && typeof value.notes === 'object' && !Array.isArray(value.notes))
        for (const [k, v] of Object.entries(value.notes).slice(0, 300))
            if (typeof v === 'string' && k.length < 120 && !['__proto__', 'constructor', 'prototype'].includes(k))
                o.notes[k] = v.slice(0, 30000);
    o.read = Array.isArray(value.read) ? [...new Set(value.read.filter(x => typeof x === 'string' && x.length < 120))].slice(0, 2000) : [];
    o.bookmarks = Array.isArray(value.bookmarks) ? value.bookmarks.filter(x => typeof x === 'string').slice(0, 200) : [];
    if (value.quiz && typeof value.quiz === 'object')
        for (const [k, v] of Object.entries(value.quiz))
            if (/^08\.\d{2}$/.test(k) && ['A', 'B', 'C', 'D'].includes(v?.answer))
                o.quiz[k] = { answer: v.answer, checked: Boolean(v.checked) };
    o.scenarios = Array.isArray(value.scenarios) ? value.scenarios.filter(x => x && typeof x === 'object' && typeof x.label === 'string').slice(-30) : [];
    // Migrate old point budgets without reducing the galaxy's million stars.
    o.preferences.quality = 1000000;
    o.preferences.graphics = ['high','balanced','low'].includes(value.preferences?.graphics) ? value.preferences.graphics : value.preferences?.quality === 60000 ? 'low' : value.preferences?.quality === 250000 ? 'balanced' : 'high';
    // graphicsSet (1.77.0): the reader chose the graphics, which then stop adapting to the device.
    o.preferences.graphicsSet = value.preferences?.graphicsSet === true;
    o.preferences.motion = value.preferences?.motion !== false;
    o.preferences.explorer = value.preferences?.explorer !== false;
    o.missions = cleanMissionRecords(value.missions);
    o.courses = cleanCourseRecords(value.courses);
    o.atlas = cleanAtlas(value.atlas);
    o.explore = cleanExplore(value.explore);
    // Exercises of the book marked as solved, «unit#exercise» (src/navigation/expeditions.js).
    o.solved = cleanSolved(value.solved);
    return o;
}
export function openStore(storage) {
    let data = fresh(), persistent = true, message = '';
    try {
        storage = storage || globalThis.localStorage;
        const old = storage.getItem(STORE_KEY);
        if (old)
            data = cleanState(JSON.parse(old));
        storage.setItem(STORE_KEY, JSON.stringify(data));
    }
    catch (e) {
        persistent = false;
        message = 'Salvataggio persistente non disponibile: esporta il diario.';
    }
    return { get data() { return data; }, get persistent() { return persistent; }, get message() { return message; }, save() {
            data.updatedAt = new Date().toISOString();
            try {
                storage.setItem(STORE_KEY, JSON.stringify(data));
                persistent = true;
                return true;
            }
            catch {
                persistent = false;
                message = 'Memoria non disponibile: esporta il diario.';
                return false;
            }
        }, import(value) { data = cleanState(value); this.save(); return data; }, export() { return JSON.stringify(data, null, 2); } };
}
export function grade(questions, answers) {
    let correct = 0, wrong = 0, unanswered = 0;
    for (const q of questions) {
        const v = answers[q.id]?.answer;
        if (!v)
            unanswered++;
        else if (v === q.correctOptionId)
            correct++;
        else
            wrong++;
    }
    return { correct, wrong, unanswered, total: questions.length };
}
