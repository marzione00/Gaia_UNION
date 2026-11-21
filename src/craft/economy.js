/** Life of a star system: the stations produce and consume goods, the ships carry them where they are
 * missing. Every run of the site starts from a different seed, so stocks, cargoes and routes change from one
 * visit to the next. Rates are per second of scene time; positions and distances come from the caller
 * (src/craft/placement.js and src/scene/world.js), so this module holds only the rules. */
import { seededRandom } from '../scene/layout.js';
import { Threats, THREAT, THREAT_TARGETS } from './threats.js';

/** Goods moved between stations, with their unit, the colour of the transfer seen near a station and their
 * family: raw goods extracted from rocks, ice and gas giants, processed goods, goods for life, advanced goods
 * and people. From 1.45.0 the goods are 24 and form production chains (RECIPES). */
export const RESOURCES = {
    minerale: { name: 'minerale', unit: 't', color: [.9, .62, .36, 1], kind: 'grezzo' },
    ghiaccio: { name: 'ghiaccio', unit: 't', color: [.75, .9, 1, 1], kind: 'grezzo' },
    idrogeno: { name: 'idrogeno', unit: 't', color: [.95, .8, .55, 1], kind: 'grezzo' },
    silicati: { name: 'silicati', unit: 't', color: [.8, .75, .65, 1], kind: 'grezzo' },
    terre: { name: 'terre rare', unit: 'kg', color: [.85, .5, .9, 1], kind: 'grezzo' },
    metalli: { name: 'metalli', unit: 't', color: [.78, .8, .85, 1], kind: 'lavorato' },
    acqua: { name: 'acqua', unit: 't', color: [.4, .7, 1, 1], kind: 'lavorato' },
    ossigeno: { name: 'ossigeno', unit: 't', color: [.7, .85, 1, 1], kind: 'lavorato' },
    vetro: { name: 'vetro', unit: 't', color: [.7, .95, .95, 1], kind: 'lavorato' },
    carburante: { name: 'carburante', unit: 't', color: [1, .72, .3, 1], kind: 'lavorato' },
    polimeri: { name: 'polimeri', unit: 't', color: [.95, .95, .7, 1], kind: 'lavorato' },
    fertilizzanti: { name: 'fertilizzanti', unit: 't', color: [.75, .9, .4, 1], kind: 'lavorato' },
    semiconduttori: { name: 'semiconduttori', unit: 'kg', color: [.55, .75, .95, 1], kind: 'lavorato' },
    leghe: { name: 'leghe', unit: 't', color: [.9, .8, .6, 1], kind: 'lavorato' },
    cibo: { name: 'cibo', unit: 't', color: [.5, .95, .55, 1], kind: 'vita' },
    biomassa: { name: 'biomassa', unit: 't', color: [.4, .75, .35, 1], kind: 'vita' },
    medicinali: { name: 'medicinali', unit: 'kg', color: [1, .55, .6, 1], kind: 'vita' },
    energia: { name: 'energia', unit: 'celle', color: [.6, .85, 1, 1], kind: 'vita' },
    parti: { name: 'parti di nave', unit: 'moduli', color: [.92, .92, .86, 1], kind: 'avanzato' },
    elettronica: { name: 'elettronica', unit: 'moduli', color: [.5, 1, .85, 1], kind: 'avanzato' },
    strumenti: { name: 'strumenti', unit: 'unità', color: [.85, .85, 1, 1], kind: 'avanzato' },
    moduli: { name: 'moduli abitativi', unit: 'unità', color: [.95, .85, .7, 1], kind: 'avanzato' },
    dati: { name: 'dati', unit: 'TB', color: [.82, .72, 1, 1], kind: 'avanzato' },
    equipaggi: { name: 'equipaggi', unit: 'persone', color: [1, .86, .62, 1], kind: 'persone' }
};
/** A recipe from rates per second: the store holds 160 s of each product (at least 20) and 450 s of each
 * input (at least 20); a station asks for 300 s of each input (want) and keeps that much before supplying
 * others (keep, by default equal to want). With `inputs` a station stops when an input runs out; with
 * `soft` it works at half rate. */
function recipe(process, make, use = {}, more = {}) {
    const cap = {}, want = {};
    for (const [r, v] of Object.entries(make)) cap[r] = Math.max(20, Math.round(v * 160));
    for (const [r, v] of Object.entries(use)) { cap[r] = Math.max(cap[r] || 0, 20, Math.round(v * 450)); want[r] = Math.max(12, Math.round(v * 300)); }
    return { process, make, use, ...more, cap: { ...cap, ...more.cap }, want: { ...want, ...more.want } };
}
/** What each kind of station makes and uses. The twelve classic types keep their names; the roles of the
 * type grammar have one recipe or more (their variants, chosen by the family: see `worksOf` in
 * src/craft/grammar.js). The chains follow real processes: ore is reduced to metals, silicates melt into
 * glass or grow into silicon crystals, ice melts into water, water splits into oxygen and hydrogen,
 * hydrogen gives ammonia for fertilisers, polymers and propellant, plants and algae turn light into food,
 * biomass and oxygen. */
export const RECIPES = {
    miniera: recipe('Estrazione', { minerale: 1.2, silicati: .5, ghiaccio: .4, terre: .08 }),
    raffineria: recipe('Distillazione dei gas', { idrogeno: .8, carburante: .6 }, { energia: .1 }, { soft: true }),
    serra: recipe('Fotosintesi', { cibo: .8, biomassa: .3 }, { acqua: .3, fertilizzanti: .08, energia: .08 }, { soft: true }),
    alghe: recipe('Fotobioreattore', { biomassa: .6, ossigeno: .25 }, { acqua: .3, energia: .05 }, { soft: true }),
    centrale: recipe('Fusione dell\'idrogeno', { energia: 1.5 }, { idrogeno: .12 }, { soft: true }),
    solare: recipe('Pannelli solari', { energia: 1.1 }),
    telescopio: recipe('Osservazione del cielo', { dati: .5 }, { energia: .05 }, { soft: true }),
    radiotelescopio: recipe('Ascolto radio', { dati: .6 }, { energia: .05 }, { soft: true }),
    poliedrica: recipe('Calcolo', { dati: .4 }, { energia: .05 }, { soft: true }),
    laboratorio: recipe('Esperimenti', { dati: .35, medicinali: .06 }, { energia: .15, biomassa: .05, strumenti: .01 }, { soft: true }),
    cantiere: recipe('Montaggio di navi', { parti: .25 }, { metalli: .5, leghe: .06, polimeri: .12, energia: .3 }, { inputs: true }),
    montaggio: recipe('Montaggio di parti', { parti: .25 }, { metalli: .5, polimeri: .12, energia: .3 }, { inputs: true }),
    circuiti: recipe('Assemblaggio di circuiti', { elettronica: .15 }, { semiconduttori: .2, metalli: .1, energia: .2 }, { inputs: true }),
    moduli: recipe('Costruzione di moduli', { moduli: .1 }, { parti: .15, vetro: .2, elettronica: .05, energia: .2 }, { inputs: true }),
    altoforno: recipe('Riduzione del minerale', { metalli: .6 }, { minerale: 1, energia: .3 }, { inputs: true }),
    leghe: recipe('Fusione di leghe', { leghe: .25 }, { metalli: .4, terre: .05, energia: .25 }, { inputs: true }),
    vetreria: recipe('Fusione dei silicati', { vetro: .5 }, { silicati: .8, energia: .25 }, { inputs: true }),
    silicio: recipe('Crescita del silicio', { semiconduttori: .12 }, { silicati: .3, terre: .03, energia: .35 }, { inputs: true }),
    ghiaccio: recipe('Fusione del ghiaccio', { acqua: 1 }, { ghiaccio: 1.1, energia: .1 }, { inputs: true }),
    elettrolisi: recipe('Elettrolisi dell\'acqua', { ossigeno: .5, idrogeno: .1 }, { acqua: .6, energia: .4 }, { inputs: true }),
    ammoniaca: recipe('Sintesi dell\'ammoniaca', { fertilizzanti: .3 }, { idrogeno: .3, energia: .3 }, { inputs: true }),
    polimeri: recipe('Polimerizzazione', { polimeri: .4 }, { idrogeno: .25, biomassa: .1, energia: .2 }, { inputs: true }),
    propellente: recipe('Sintesi del propellente', { carburante: .8 }, { idrogeno: .5, ossigeno: .2 }, { inputs: true }),
    strumenti: recipe('Costruzione di strumenti', { strumenti: .1 }, { elettronica: .08, vetro: .1, energia: .2 }, { inputs: true }),
    farmaci: recipe('Sintesi di farmaci', { medicinali: .15 }, { biomassa: .2, acqua: .1, energia: .15 }, { inputs: true }),
    deposito: { process: 'Deposito', cap: { carburante: 400, acqua: 200, ossigeno: 160 }, want: { carburante: 260, acqua: 120, ossigeno: 90 }, keep: { carburante: 110, acqua: 50, ossigeno: 40 } },
    habitat: recipe('Vita a bordo', { equipaggi: .2 }, { cibo: .3, acqua: .25, ossigeno: .15, energia: .15, medicinali: .02, moduli: .01 }, { cap: { equipaggi: 50 } }),
    magazzino: { process: 'Smistamento', cap: { minerale: 200, metalli: 160, cibo: 150, acqua: 150, energia: 150, carburante: 200, parti: 60 }, want: { minerale: 110, metalli: 80, cibo: 80, acqua: 80, energia: 80, carburante: 110, parti: 30 }, keep: { minerale: 50, metalli: 35, cibo: 35, acqua: 35, energia: 35, carburante: 50, parti: 12 } },
    ripetitore: recipe('Ritrasmissione', {}, { energia: .12 }),
    porto: recipe('Imbarco', { equipaggi: .25 }, { cibo: .3, acqua: .2, ossigeno: .15, carburante: .35, energia: .15, medicinali: .02 }, { cap: { equipaggi: 60 } }),
    porta: { process: 'Porta', make: { equipaggi: .15 }, use: {}, cap: { equipaggi: 40 }, want: {}, keep: {} },
    // Defensive stations (1.47.0): the base supplies the fleet, the others use energy; without it they work
    // at half strength. The surveillance station sends out what it observes as data.
    'difesa-base': recipe('Rifornimento della flotta', {}, { carburante: .3, energia: .2, cibo: .08, parti: .03 }, { soft: true }),
    'difesa-sorveglianza': recipe('Sorveglianza dei confini', { dati: .25 }, { energia: .1 }, { soft: true }),
    'difesa-piattaforma': recipe('Difesa ravvicinata', {}, { energia: .12 }, { soft: true }),
    'difesa-fortezza': recipe('Difesa della porta', {}, { energia: .3, parti: .02 }, { soft: true }),
    'difesa-scudo': recipe('Scudo della porta', {}, { energia: .45, idrogeno: .03 }, { soft: true })
};
/** Crews rotate on every station except the port, the habitats and the gate, where they arrive. */
const CREW = { use: .06, cap: 24, want: 16 };
/** Ship classes: goods carried, capacity, cruise speed (system units per second), docking time (s) and
 * the behaviour when there is nothing to carry. */
export const FLEET = {
    navetta: { carries: ['equipaggi', 'cibo', 'acqua', 'ossigeno', 'medicinali', 'energia'], capacity: 12, speed: 2.6, dock: 6, idle: 'transfer' },
    corriere: { carries: ['dati', 'equipaggi', 'medicinali', 'elettronica', 'semiconduttori', 'strumenti', 'terre'], capacity: 30, speed: 3.2, dock: 5, idle: 'transfer' },
    cargo: { carries: ['minerale', 'silicati', 'terre', 'idrogeno', 'carburante', 'cibo', 'biomassa', 'fertilizzanti', 'polimeri', 'metalli', 'leghe', 'vetro', 'semiconduttori', 'parti', 'elettronica', 'strumenti', 'moduli', 'medicinali', 'energia'], capacity: 70, speed: 1.6, dock: 10, idle: 'wait' },
    cisterna: { carries: ['carburante', 'acqua', 'ossigeno', 'idrogeno'], capacity: 80, speed: 1.5, dock: 10, idle: 'wait' },
    rimorchiatore: { carries: ['minerale', 'silicati', 'ghiaccio', 'biomassa', 'metalli', 'parti'], capacity: 50, speed: 1.4, dock: 9, idle: 'wait' },
    scientifica: { carries: ['dati', 'strumenti', 'elettronica', 'semiconduttori', 'energia'], capacity: 40, speed: 2, dock: 8, idle: 'survey' },
    esploratrice: { carries: ['dati', 'terre'], capacity: 30, speed: 2.2, dock: 8, idle: 'survey' },
    passeggeri: { carries: ['equipaggi', 'cibo', 'acqua', 'ossigeno', 'medicinali'], capacity: 40, speed: 2, dock: 9, idle: 'transfer' },
    posaboe: { carries: ['parti', 'energia', 'strumenti'], capacity: 20, speed: 1.6, dock: 8, idle: 'buoys' },
    soccorso: { carries: ['energia', 'cibo', 'carburante', 'ossigeno', 'acqua', 'medicinali'], capacity: 20, speed: 2.6, dock: 6, idle: 'patrol' },
    sonda: { carries: ['dati'], capacity: 15, speed: 2.4, dock: 4, idle: 'survey' },
    gru: { carries: ['parti', 'metalli', 'leghe', 'vetro', 'polimeri', 'elettronica', 'moduli', 'energia'], capacity: 30, speed: 1.2, dock: 12, idle: 'shipyard' }
};
const ROMAN = ['', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII', ' IX', ' X', ' XI', ' XII'];
/** Growth of the stations (1.46.0): after 300 s at full rate per level a station asks for an expansion kit
 * (12 ship parts, or 4 habitat modules for habitats and ports) and, once it has it, moves up one level, up
 * to three: each level adds a quarter to its rates and a fifth to its stores. */
export const GROWTH = { time: 300, max: 3, rate: .25, store: .2 };
/** Shipyards launch a ship when they have 30 parts in store, at most every 120 s, while the fleet is below
 * its limit (the starting fleet plus a quarter of the stations, at least two). */
export const LAUNCH = { cost: 30, every: 120 };
/** Convoys from the neighbouring systems reach the gate every 60 to 120 s, unload what the system imports
 * and leave with what it exports. */
export const CONVOY = { every: [60, 120], approach: 14, dock: 10 };
const YARDS = ['cantiere', 'montaggio'];
/** Stations that grow: those that produce, apart from the gate and the defensive stations. */
const growsOf = s => Object.keys(s.make).length > 0 && s.entry.type !== 'porta' && !s.entry.defence;
export const kitOf = s => ['habitat', 'porto'].includes(s.entry.works || s.entry.type) ? { moduli: 4 } : { parti: 12 };
const scaled = (o, f) => Object.fromEntries(Object.entries(o).map(([r, v]) => [r, +(v * f).toFixed(4)]));

/** Economy and traffic of one system. `stations` and `ships` are catalogue entries (src/craft/catalog.js);
 * `bodies` the slots of the planets ships may visit; `distance(a, b)` the current distance between two
 * places, where a place is { station: i } or { body: slot }. */
export class Economy {
    constructor({ stations, ships, bodies = [], seed = 1, time = 0, distance, position = null, threats = true, neighbours = ['un sistema vicino'] }) {
        this.rng = seededRandom(seed >>> 0); this.time = time; this.distance = distance; this.position = position; this.bodies = bodies;
        const R = this.rng;
        this.stations = stations.map((entry, i) => {
            const rec = RECIPES[entry.works || entry.type] || {}, crew = !rec.make?.equipaggi;
            const cap = { ...rec.cap, ...(crew ? { equipaggi: CREW.cap } : {}) }, want = { ...rec.want, ...(crew ? { equipaggi: CREW.want } : {}) }, use = { ...rec.use, ...(crew ? { equipaggi: CREW.use } : {}) };
            const stock = Object.fromEntries(Object.keys(cap).map(r => [r, Math.round(cap[r] * (.15 + .6 * R()))]));
            return { i, entry, process: rec.process || '', make: { ...rec.make }, use, inputs: !!rec.inputs, soft: !!rec.soft, cap, want, keep: { ...want, ...rec.keep }, stock, reserved: {}, incoming: {}, producing: 0, missing: [] };
        });
        // The gate balances the chains of its system. When the stations make less than one and a half times
        // what they use, it imports the shortfall with a fifth more, and at least a quarter of the use as a
        // reserve; when they make more, it exports the surplus.
        const gate = this.stations.find(s => s.entry.type === 'porta');
        if (gate) {
            const made = {}, used = {};
            // Expansion kits count as a small steady use, so the gate also brings parts and modules.
            for (const s of this.stations) if (s !== gate && growsOf(s)) for (const [r, v] of Object.entries(kitOf(s))) used[r] = (used[r] || 0) + v / (GROWTH.time * 3);
            for (const s of this.stations) if (s !== gate) { for (const [r, v] of Object.entries(s.make)) made[r] = (made[r] || 0) + v; for (const [r, v] of Object.entries(s.use)) if (r !== 'equipaggi') used[r] = (used[r] || 0) + v; }
            for (const r of new Set([...Object.keys(made), ...Object.keys(used)])) {
                const u = used[r] || 0, m = made[r] || 0; if (r === 'equipaggi' || (!u && m < .01)) continue;
                if (u > 0 && m < u * 1.5) { const v = Math.max((u - m) * 1.2, u * .25); gate.make[r] = +v.toFixed(3); gate.cap[r] = Math.max(60, Math.round(v * 300)); gate.keep[r] = 10; gate.stock[r] = Math.round(gate.cap[r] * (.3 + .4 * R())); }
                else { gate.use[r] = +(m - u).toFixed(3); gate.cap[r] = Math.max(60, Math.round((m - u) * 300)); gate.want[r] = gate.keep[r] = Math.round(gate.cap[r] * .7); gate.stock[r] = 0; }
            }
            // Any cargo without a buyer can still be unloaded at the gate and leave the system.
            for (const r of Object.keys(RESOURCES)) gate.cap[r] ??= 60;
        }
        // Each catalogue ship sails with up to two sister ships of the same model, as chance has it; beyond the
        // six stations of the catalogue every five stations add one or two more sisters to each model.
        this.ships = []; const more = Math.max(0, (this.stations.length - 6) / 5);
        for (const entry of ships) {
            // The ship classes of the grammar (1.44.0) sail alone or with one sister.
            const copies = entry.fleet ? 1 + (R() < .35 && !(entry.defence && entry.drawn >= .11) ? 1 : 0) : 1 + Math.floor(R() * (['cargo', 'cisterna', 'navetta', 'passeggeri'].includes(entry.type) ? 3 : 2)) + (more ? Math.round(more * (.5 + .5 * R())) : 0);
            for (let c = 0; c < copies; c++) {
                const start = { station: Math.floor(R() * this.stations.length) };
                this.ships.push({ id: this.ships.length, entry, name: entry.name + ROMAN[c], cls: entry.fleet || FLEET[entry.type], phase: 'dock', at: start, task: 'sosta', t0: time, t1: time + 1 + R() * 12, cargo: null, job: null });
            }
        }
        // A good the stations need that no ship of the system carries goes to the ship with the largest hold.
        const carried = new Set(this.ships.flatMap(sh => sh.cls.carries)), biggest = this.ships.reduce((m, sh) => !m || sh.cls.capacity > m.cls.capacity ? sh : m, null);
        const needed = [...new Set(this.stations.flatMap(st => Object.keys(st.want).filter(r => r !== 'equipaggi')))].filter(r => !carried.has(r));
        if (biggest && needed.length) biggest.cls = { ...biggest.cls, carries: [...biggest.cls.carries, ...needed] };
        // Growth, launches, convoys and news (1.46.0). The gate no longer imports continuously: its imports
        // arrive with the convoys, in the amount the import rates give for the time since the last one.
        this.news = []; this.visitors = []; this.nextVisitor = 10000; this.neighbours = neighbours;
        this.fleetCap = this.ships.length + Math.max(2, Math.round(this.stations.length / 4));
        for (const ship of this.ships) ship.born = time;
        for (const s of this.stations) Object.assign(s, { level: 1, growth: 0, kit: null, grows: growsOf(s), yard: YARDS.includes(s.entry.works || s.entry.type), base: { make: { ...s.make }, use: { ...s.use }, cap: { ...s.cap }, want: { ...s.want }, keep: { ...s.keep } }, state: 'run', since: time, told: -Infinity });
        this.gate = gate || null;
        if (gate) {
            gate.imports = Object.fromEntries(Object.entries(gate.make).filter(([r]) => r !== 'equipaggi'));
            for (const r of Object.keys(gate.imports)) delete gate.make[r];
            this.convoy = { next: time + 15 + R() * 30, last: time, exported: {} };
        }
        // Natural threats (1.48.0) need the positions of the stations, which the scene and the tests give.
        this.threats = position && threats ? new Threats(this, seed, time) : null;
    }
    /** What a station asks for beyond its recipe: the kit to grow and the parts for its repairs (1.48.0). */
    ask(s) {
        const extra = {};
        for (const o of [s.kit, s.repair]) if (o) for (const [r, v] of Object.entries(o)) extra[r] = (extra[r] || 0) + v;
        for (const r of new Set([...Object.keys(extra), ...Object.keys(s.asked || {})])) {
            if (extra[r]) { s.want[r] = (s.base.want[r] || 0) + extra[r]; s.keep[r] = s.want[r]; s.cap[r] = Math.max(s.cap[r] || 0, s.want[r] + 10); s.stock[r] ??= 0; }
            else if (s.base.want[r] === undefined) { delete s.want[r]; delete s.keep[r]; }
            else { s.want[r] = s.base.want[r]; s.keep[r] = s.base.keep[r]; }
        }
        s.asked = extra;
    }
    /** A line for the news of the system; the last 24 are kept. */
    tell(text) { this.news.push({ time: this.time, text }); if (this.news.length > 24) this.news.shift(); }
    surplus(s, r) { return (s.stock[r] || 0) - (s.reserved[r] || 0) - (s.keep[r] || 0); }
    deficit(s, r) { return s.want[r] ? s.want[r] - (s.stock[r] || 0) - (s.incoming[r] || 0) : 0; }
    /** Advances the system to `time`, in steps of at most one second. */
    update(time) {
        let dt = time - this.time;
        if (!(dt > 0)) return this;
        // After a long absence the system jumps ahead: at most two minutes are simulated.
        if (dt > 120) { this.time = time - 120; dt = 120; }
        while (dt > 0) { const h = Math.min(1, dt); this.time += h; dt -= h; this.step(h); }
        return this;
    }
    step(h) {
        for (const s of this.stations) {
            // A station uses its inputs first; with strict inputs it produces only with all of them, with soft
            // inputs it works at half rate when one is missing; it always needs room in the store.
            const missing = s.inputs || s.soft ? Object.keys(s.use).filter(r => r !== 'equipaggi' && (s.stock[r] || 0) < s.use[r] * h) : [];
            for (const [r, v] of Object.entries(s.use)) { const take = Math.min(s.stock[r] || 0, v * h); s.stock[r] = (s.stock[r] || 0) - take; if (s === this.gate) this.convoy.exported[r] = (this.convoy.exported[r] || 0) + take; }
            const room = Object.keys(s.make).some(r => (s.stock[r] || 0) < s.cap[r]);
            s.producing = Object.keys(s.make).length && room && !(s.inputs && missing.length) ? (missing.length ? .5 : 1) : 0; s.missing = missing;
            // A damaged station works more slowly, and a flare halves the work of the stations it reaches.
            s.flare = !!this.threats?.flared(s);
            if (s.damage) s.producing *= 1 - THREAT.slow * s.damage;
            if (s.flare) s.producing *= .5;
            if (s.repair) this.threats.mend(s);
            if (s.producing) for (const [r, v] of Object.entries(s.make)) s.stock[r] = Math.min(s.cap[r], (s.stock[r] || 0) + v * h * s.producing);
            this.grow(s, h); this.watch(s);
        }
        if (this.ships.length < this.fleetCap) for (const yard of this.stations) if (yard.yard && this.time >= (yard.nextLaunch || 0) && (yard.stock.parti || 0) - (yard.reserved.parti || 0) >= LAUNCH.cost) { this.launch(yard); break; }
        if (this.gate && this.time >= this.convoy.next) this.sendConvoy();
        for (const ship of this.ships) if (this.time >= ship.t1) ship.phase === 'travel' ? this.arrive(ship) : this.finish(ship);
        for (const v of [...this.visitors]) if (this.time >= v.t1) this.moveVisitor(v);
        this.threats?.step();
    }
    /** Growth of a station: progress at full rate, then a kit, then the next level. */
    grow(s, h) {
        if (!s.grows || s.level >= GROWTH.max) return;
        if (!s.kit) {
            if (s.producing === 1) s.growth += h;
            if (s.growth < GROWTH.time * s.level) return;
            s.kit = kitOf(s); this.ask(s);
            return;
        }
        if (!Object.entries(s.kit).every(([r, v]) => (s.stock[r] || 0) >= v)) return;
        for (const [r, v] of Object.entries(s.kit)) s.stock[r] -= v;
        s.level++; s.growth = 0; s.kit = null;
        const f = 1 + GROWTH.rate * (s.level - 1), g = 1 + GROWTH.store * (s.level - 1);
        s.make = scaled(s.base.make, f); s.use = scaled(s.base.use, f); s.cap = { ...s.cap, ...scaled(s.base.cap, g) };
        this.ask(s);
        this.tell(`${s.entry.name} sale al livello ${s.level}`);
        this.rebalance();
    }
    /** After a station grows the gate balances the chains again with the same rule as at the start, keeping
     * its stores: imports and exports follow the new rates. */
    rebalance() {
        const gate = this.gate; if (!gate) return;
        const made = {}, used = {}, imports = {}, exports = {};
        for (const s of this.stations) if (s !== gate) {
            if (s.grows && s.level < GROWTH.max) for (const [r, v] of Object.entries(kitOf(s))) used[r] = (used[r] || 0) + v / (GROWTH.time * 3);
            for (const [r, v] of Object.entries(s.make)) made[r] = (made[r] || 0) + v;
            for (const [r, v] of Object.entries(s.use)) if (r !== 'equipaggi') used[r] = (used[r] || 0) + v;
        }
        for (const r of new Set([...Object.keys(made), ...Object.keys(used)])) {
            const u = used[r] || 0, m = made[r] || 0; if (r === 'equipaggi' || (!u && m < .01)) continue;
            if (u > 0 && m < u * 1.5) imports[r] = +Math.max((u - m) * 1.2, u * .25).toFixed(3); else exports[r] = +(m - u).toFixed(3);
        }
        for (const r of Object.keys(gate.use)) if (!(r in exports)) { delete gate.use[r]; delete gate.want[r]; delete gate.keep[r]; }
        for (const [r, v] of Object.entries(imports)) { gate.cap[r] = Math.max(gate.cap[r] || 0, 60, Math.round(v * 300)); gate.keep[r] = 10; }
        for (const [r, v] of Object.entries(exports)) { gate.use[r] = v; gate.cap[r] = Math.max(gate.cap[r] || 0, 60, Math.round(v * 300)); gate.want[r] = gate.keep[r] = Math.round(gate.cap[r] * .7); }
        gate.imports = imports;
    }
    /** News when a processing station stops for a missing input after working a while, and when it restarts. */
    watch(s) {
        if (!s.inputs) return;
        const now = s.missing.length ? 'stop' : 'run';
        if (now === s.state) return;
        if (now === 'stop' && this.time - s.since >= 30 && this.time - s.told >= 180) { this.tell(`${s.entry.name}: produzione ferma, senza ${RESOURCES[s.missing[0]].name}`); s.told = this.time; s.reported = true; }
        else if (now === 'run' && s.reported) { this.tell(`${s.entry.name}: produzione ripresa`); s.reported = false; }
        s.state = now; s.since = this.time;
    }
    /** A shipyard launches a model of the system's fleet: the one whose goods the stations miss most. */
    launch(yard) {
        const models = [...new Map(this.ships.map(sh => [sh.entry, sh])).values()];
        const need = sh => sh.cls.carries.reduce((n, r) => n + this.stations.reduce((m, st) => m + Math.max(0, this.deficit(st, r)), 0), 0);
        const pick = models.reduce((m, sh) => need(sh) > need(m) ? sh : m), n = this.ships.filter(sh => sh.entry === pick.entry).length;
        const ship = { id: this.ships.length, entry: pick.entry, name: pick.entry.name + (ROMAN[n] ?? ' ' + (n + 1)), cls: pick.cls, phase: 'dock', at: { station: yard.i }, task: 'varo', t0: this.time, t1: this.time + 8, cargo: null, job: null, born: this.time, yard: yard.i };
        this.ships.push(ship); yard.stock.parti -= LAUNCH.cost; yard.nextLaunch = this.time + LAUNCH.every;
        this.tell(`${yard.entry.name} vara ${ship.name}`);
    }
    /** A convoy sets out from a neighbouring system towards the gate. */
    sendConvoy() {
        const R = this.rng, fleet = [...new Map(this.ships.map(sh => [sh.entry, sh])).values()], model = fleet.reduce((m, sh) => sh.cls.capacity > m.cls.capacity ? sh : m, fleet[0]);
        const origin = this.neighbours[Math.floor(R() * this.neighbours.length)], id = this.nextVisitor++, beyond = { beyond: id % 3 };
        this.visitors.push({ id, visitor: true, entry: model.entry, cls: model.cls, name: 'Convoglio da ' + origin, origin, phase: 'travel', task: 'arrivo', from: beyond, to: { station: this.gate.i }, at: beyond, beyond, t0: this.time, t1: this.time + CONVOY.approach, cargo: null, job: null });
        this.convoy.next = this.time + CONVOY.every[0] + R() * (CONVOY.every[1] - CONVOY.every[0]);
    }
    /** Next step of a convoy: unloading at the gate, then back where it came from, then gone. */
    moveVisitor(v) {
        const gate = this.gate;
        if (v.phase === 'travel' && v.task === 'arrivo') {
            const span = this.time - this.convoy.last, load = Object.entries(gate.imports).map(([r, rate]) => [r, rate * span]).sort((a, b) => b[1] - a[1]);
            for (const [r, a] of load) gate.stock[r] = Math.min(gate.cap[r], (gate.stock[r] || 0) + a);
            this.convoy.last = this.time;
            if (load.length) { const [r, a] = load[0], more = load.length - 1; v.cargo = { res: r, amount: Math.round(a) }; this.tell(`Convoglio da ${v.origin} alla porta: ${Math.round(a)} ${RESOURCES[r].unit} di ${RESOURCES[r].name}${more ? ` e altre ${more} merci` : ''}`); }
            Object.assign(v, { phase: 'dock', task: 'scarica', at: { station: gate.i }, t0: this.time, t1: this.time + CONVOY.dock });
        } else if (v.phase === 'dock') {
            const out = Object.entries(this.convoy.exported).sort((a, b) => b[1] - a[1])[0]; this.convoy.exported = {};
            Object.assign(v, { phase: 'travel', task: 'partenza', from: { station: gate.i }, to: v.beyond, t0: this.time, t1: this.time + CONVOY.approach, cargo: out && out[1] >= 1 ? { res: out[0], amount: Math.round(out[1]) } : null });
        } else this.visitors.splice(this.visitors.indexOf(v), 1);
    }
    arrive(ship) {
        const job = ship.job, here = ship.to, s = here.station !== undefined ? this.stations[here.station] : null, D = ship.cls.dock * (.8 + .4 * this.rng());
        Object.assign(ship, { phase: 'dock', at: here, t0: this.time, t1: this.time + D });
        // A defence ship at the point where a threat will pass waits there until it has gone by (1.48.0).
        if (here.point) { const ev = this.threats?.find(here.threat); ship.task = 'intercetta'; ship.t1 = Math.max(ship.t1, (ev ? ev.tPass + THREAT.window[1] : this.time) + 1); return; }
        if (job && s && job.from === here.station && !ship.cargo) { s.stock[job.res] = Math.max(0, (s.stock[job.res] || 0) - job.amount); s.reserved[job.res] = Math.max(0, (s.reserved[job.res] || 0) - job.amount); ship.cargo = { res: job.res, amount: job.amount }; ship.task = 'carica'; }
        else if (ship.cargo && s && job?.to === here.station) ship.task = 'scarica';
        else if (here.body !== undefined) ship.task = 'osserva';
        else ship.task = 'sosta';
    }
    finish(ship) {
        const s = ship.at.station !== undefined ? this.stations[ship.at.station] : null;
        if (ship.task === 'scarica' && s && ship.cargo) {
            const { res, amount } = ship.cargo; s.stock[res] = Math.min(s.cap[res] ?? Infinity, (s.stock[res] || 0) + amount); s.incoming[res] = Math.max(0, (s.incoming[res] || 0) - amount);
            ship.cargo = null; ship.job = null;
        }
        // A survey brings back data from the planet it observed.
        if (ship.task === 'osserva') ship.cargo = { res: 'dati', amount: Math.round(8 + this.rng() * (ship.cls.capacity - 8)) };
        this.plan(ship);
    }
    /** Chooses the next leg of a ship and starts it. */
    plan(ship) {
        const R = this.rng, here = ship.at, cls = ship.cls;
        if (ship.alert) {
            const ev = this.threats?.find(ship.alert);
            if (ev && this.time < ev.tPass && !here.point) { ship.task = 'intercetta'; this.toLeg(ship, { point: ev.at, threat: ev.id }); return; }
            ship.alert = null; ship.task = 'sosta';
        }
        let to = null, job = ship.job;
        if (ship.cargo) {
            if (!job) job = ship.job = this.sinkFor(ship.cargo.res, ship.cargo.amount, here);
            if (job) to = { station: job.to };
            else { ship.cargo = null; }
        }
        if (!to && !ship.cargo) {
            const best = this.bestJob(ship);
            if (best) {
                ship.job = best; const src = this.stations[best.from], dst = this.stations[best.to];
                src.reserved[best.res] = (src.reserved[best.res] || 0) + best.amount; dst.incoming[best.res] = (dst.incoming[best.res] || 0) + best.amount;
                if (here.station === best.from) { this.toLeg(ship, here); this.arrive(ship); return; }
                to = { station: best.from };
            }
        }
        if (!to) to = this.idle(ship);
        if (!to) { Object.assign(ship, { phase: 'dock', task: 'sosta', t0: this.time, t1: this.time + 6 + R() * 10 }); return; }
        this.toLeg(ship, to);
    }
    toLeg(ship, to) {
        const d = this.distance(ship.at, to), T = d < 1e-6 ? 0 : 2 + d / ship.cls.speed;
        Object.assign(ship, { phase: T ? 'travel' : 'dock', from: ship.at, to, t0: this.time, t1: this.time + T });
    }
    /** The station that needs `res` most, for a cargo already on board. */
    sinkFor(res, amount, here) {
        let best = null, score = 0;
        for (const s of this.stations) { const need = this.deficit(s, res); if (need <= 0) continue; const v = Math.min(need, amount) / (1 + this.distance(here, { station: s.i })); if (v > score) { score = v; best = s; } }
        if (!best) best = this.stations.find(s => s.entry.type === 'porta' && (s.cap[res] ?? 0) > 0);
        if (!best) return null;
        best.incoming[res] = (best.incoming[res] || 0) + amount; return { res, amount, from: null, to: best.i };
    }
    /** Best transport job for an empty ship: amount over distance, with a little chance to vary the routes.
     * A ship sails with at least 30 % of its hold, or with half of what the station asks for when that is
     * less, so slow inputs (glass, polymers, electronics) also find a carrier. */
    bestJob(ship) {
        const cls = ship.cls, min = Math.max(4, cls.capacity * .3); let best = null, score = 0;
        for (const res of cls.carries) for (const a of this.stations) {
            const have = this.surplus(a, res); if (have < 3) continue;
            for (const b of this.stations) {
                if (b === a) continue; const need = this.deficit(b, res), floor = Math.max(3, Math.min(min, (b.want[res] || 0) * .5)); if (need < floor || have < floor) continue;
                // A station about to stop for lack of an input (less than 90 s of it left) comes first, one that
                // would slow down to half rate comes next.
                const low = (b.stock[res] || 0) < (b.use[res] || 0) * 90, urgent = low && b.inputs ? 3 : low && b.soft ? 2 : 1;
                const amount = Math.round(Math.min(cls.capacity, have, need)), v = urgent * amount / (1 + this.distance(ship.at, { station: a.i }) + this.distance({ station: a.i }, { station: b.i })) * (.7 + .6 * this.rng());
                if (v > score) { score = v; best = { res, amount, from: a.i, to: b.i }; }
            }
        }
        return best;
    }
    /** Where a ship goes when there is nothing to carry. */
    idle(ship) {
        const R = this.rng, n = this.stations.length, here = ship.at.station, find = type => this.stations.find(s => s.entry.type === type)?.i;
        const other = () => { let k = Math.floor(R() * n); if (k === here) k = (k + 1) % n; return { station: k }; };
        switch (ship.cls.idle) {
            case 'transfer': return R() < .7 ? other() : null;
            case 'survey': return here !== undefined && this.bodies.length && R() < .75 ? { body: this.bodies[Math.floor(R() * this.bodies.length)] } : { station: find('porto') ?? 0 };
            case 'buoys': { const gate = find('porta'); return here === gate ? { station: find('porto') ?? 0 } : { station: gate ?? 0 }; }
            case 'patrol': return { station: ((here ?? -1) + 1) % n };
            // The defence fleet (1.47.0) patrols between its base, the defensive stations, the gate and the port,
            // and now and then sweeps past any station of the system; it rests at the base between patrols.
            case 'guard': {
                const posts = this.posts ??= this.stations.filter(s => s.entry.defence || s.entry.type === 'porta' || s.entry.type === 'porto').map(s => s.i), base = this.stations.find(s => s.entry.works === 'difesa-base')?.i ?? posts[0] ?? 0;
                const post = () => R() < .3 ? other() : { station: posts[Math.floor(R() * posts.length)] };
                return here === base ? (R() < .8 ? post() : null) : R() < .5 ? { station: base } : post();
            }
            case 'shipyard': { const yard = find('cantiere') ?? find('porto') ?? 0, port = find('porto') ?? 0; return here === yard ? (R() < .4 ? { station: port } : null) : { station: yard }; }
            default: return R() < .3 ? other() : null;
        }
    }
}

const fmt = v => Math.round(v).toLocaleString('it-IT');
/** Italian list: «a», «a e b», «a, b e c», with «ed» before a word starting with e. */
const list = items => items.length < 2 ? items.join('') : items.slice(0, -1).join(', ') + (/^e/i.test(items.at(-1)) ? ' ed ' : ' e ') + items.at(-1);
const departure = left => left > 0 ? `partenza fra ${left} s` : 'in partenza';
/** Two short lines on what a station is doing now: its process and main product, or what stops it; then
 * what it asks for. */
export function stationReport(s) {
    const kind = s.entry.works || s.entry.type, made = Object.keys(s.make).filter(r => r !== 'equipaggi' || kind === 'porto' || kind === 'habitat'), name = r => RESOURCES[r].name, unit = r => RESOURCES[r].unit;
    const short = items => items.length > 3 ? list([...items.slice(0, 2), `altre ${items.length - 2} merci`]) : list(items);
    let first;
    if (kind === 'deposito') first = `Conserva carburante: ${fmt(s.stock.carburante)} su ${fmt(s.cap.carburante)} t`;
    else if (kind === 'porto') first = `${fmt(s.stock.equipaggi)} persone in attesa di imbarco`;
    else if (kind === 'habitat') first = `${fmt(s.stock.equipaggi)} persone pronte a imbarcarsi`;
    else if (kind === 'magazzino') first = `Smista merci: ${fmt(Object.values(s.stock).reduce((a, b) => a + b, 0) - (s.stock.equipaggi || 0))} unità in deposito`;
    else if (kind === 'ripetitore') first = (s.stock.energia || 0) > 1 ? 'Ritrasmette i segnali del sistema' : 'Ferma: manca energia';
    else if (kind.startsWith('difesa-') && kind !== 'difesa-sorveglianza') first = s.missing.length ? `A metà forza, senza ${short(s.missing.map(name))}` : DEFENCE_READY[kind];
    else if (s.entry.type === 'porta') { const out = Object.keys(s.use).length, inn = Object.keys(s.imports || {}).length; first = `Importa ${inn} merci, ne esporta ${out}`; }
    else if (!made.length) first = 'Nessuna produzione';
    else if (s.inputs && s.missing.length) first = `Ferma: ${s.missing.length > 1 ? 'mancano' : 'manca'} ${short(s.missing.map(name))}`;
    else if (!s.producing) first = `Magazzino pieno di ${name(made[0])}`;
    else if (s.missing.length) first = `A metà: ${s.missing.length > 1 ? 'mancano' : 'manca'} ${short(s.missing.map(name))}`;
    else first = `${s.process}: ${fmt(s.stock[made[0]])} ${unit(made[0])} di ${name(made[0])}`;
    if (first.length > 60) first = `${s.process}: ${name(made[0])}`;
    const needs = Object.keys(s.want).filter(r => (s.stock[r] || 0) < s.want[r] * .6 && r !== 'equipaggi');
    const second = needs.length ? `Chiede ${short(needs.map(name))}` : Object.keys(s.want).length ? 'Scorte sufficienti' : 'Carica le navi in arrivo';
    const level = s.level > 1 ? `Livello ${s.level} · ` : '', kit = s.kit ? `Per crescere chiede ${list(Object.keys(s.kit).map(name))}` : null;
    const line = s.flare ? 'Brillamento: produzione a metà' : s.damage ? `Danni: lavora al ${Math.round((1 - THREAT.slow * s.damage) * 100)} %, chiede ${s.repair.parti} parti` : kit || level + second;
    return [first, line.length > 60 ? level + `Chiede ${needs.length} merci` : line];
}
/** First line of a defensive station that has what it needs (1.47.0). */
const DEFENCE_READY = { 'difesa-base': 'Rifornisce la flotta di difesa', 'difesa-piattaforma': 'Torrette pronte', 'difesa-fortezza': 'Torrette e difese pronte', 'difesa-scudo': 'Scudo acceso davanti alla porta' };
/** Two short lines on what a ship is doing now; `placeName(place)` names a station or a planet. */
export function shipReport(ship, time, placeName) {
    const left = Math.max(0, Math.ceil(ship.t1 - time)), c = ship.cargo, load = c ? `${fmt(c.amount)} ${RESOURCES[c.res].unit} di ${RESOURCES[c.res].name}` : '';
    if (ship.visitor) {
        if (ship.task === 'arrivo') return [`Viene da ${ship.origin}`, `Verso la porta, arrivo fra ${left} s`];
        if (ship.task === 'scarica') return [c ? `Scarica ${load}` : 'Scarica le merci importate', `Porta, ${departure(left)}`];
        return [c ? `Esporta ${load}` : 'Riparte senza carico', `Verso ${ship.origin}`];
    }
    if (ship.cls.idle === 'guard' && ship.task === 'intercetta') {
        const what = THREAT_TARGETS[ship.alertKind] || 'la minaccia';
        return ship.phase === 'travel' ? [`Intercettazione, arrivo fra ${left} s`, `Contro ${what}`] : ['In posizione di tiro', `Contro ${what}`];
    }
    if (ship.cls.idle === 'guard') {
        if (ship.phase === 'travel') return [`In pattuglia, arrivo fra ${left} s`, `Verso ${placeName(ship.to)}`];
        const where = placeName(ship.at);
        return [where.startsWith('Base della flotta') ? 'Rifornimento alla base' : 'Di guardia', `${where}, ${departure(left)}`];
    }
    if (ship.task === 'varo') return ['Appena varata', `${placeName(ship.at)}, ${departure(left)}`];
    if (ship.phase === 'travel') {
        const where = placeName(ship.to);
        if (c) return [`Trasporta ${load}`, `Verso ${where}, arrivo fra ${left} s`];
        if (ship.job) return [`Va a caricare ${RESOURCES[ship.job.res].name}`, `Verso ${where}, arrivo fra ${left} s`];
        if (ship.to.body !== undefined) return ['Missione di osservazione', `Verso ${where}, arrivo fra ${left} s`];
        return ['In trasferimento', `Verso ${where}, arrivo fra ${left} s`];
    }
    const where = placeName(ship.at);
    if (ship.task === 'carica') return [`Carica ${load}`, `${where}, ${departure(left)}`];
    if (ship.task === 'scarica') return [`Scarica ${load}`, `${where}, ${departure(left)}`];
    if (ship.task === 'osserva') return [`Osserva ${where}`, left > 0 ? `Ripartenza fra ${left} s` : 'In partenza'];
    return [`In sosta: ${where}`, left > 0 ? `Partenza fra ${left} s` : 'In partenza'];
}
