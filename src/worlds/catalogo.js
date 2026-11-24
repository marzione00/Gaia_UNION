/** The models of the living worlds in the 3D catalogue (1.69.0): the 1388 species, the buildings of the 125
 * colonies and of the 40 villages, the inhabitants and the rovers of the explorer. Species, specs and bodies
 * come from the identity cards through the same functions the surfaces use. Which building types a colony or
 * a village actually built, and the body and the names of each native people, depend on the ground, so they
 * are read from the index content/worlds/modelli.json, written by `node scripts/catalogo-mondi.mjs` from the
 * built surfaces; tests/mondi.test.mjs checks that the index matches the code. */
import { planetGenomes, planetSpecies } from './surface.js';
import { bodyMesh } from './bodyplan.js';
import { archMesh, archPalette, roverMesh, typologyOf, ARCH_TYPES, TYPOLOGIES } from './architecture.js';
import { buildingMesh, VILLAGE_TYPES } from './buildings.js';
import { colonistMesh, colonistSpec, nativeMesh, nativeLegs, COLONIST_FIGURES, GEAR } from './people.js';
import { colonyParams, colonySpec, villageParams, villageSpec, HUB, ROLE_COLORS } from './settlements.js';
import { METRE } from './explorer.js';
import { systemForPlanet, AREAS, UNIT_COUNT } from '../scene/layout.js';

/** Groups of the living worlds in the catalogue, after those of the stations and ships. */
export const WORLD_GROUPS = Object.freeze([['specie', 'Specie'], ['edifici', 'Edifici'], ['abitanti', 'Abitanti e rover']]);
/** Names of the kinds of model, as the card writes them. */
export const WORLD_KINDS = Object.freeze({ specie: 'Specie', colonia: 'Edificio della colonia', villaggio: 'Edificio del villaggio', colono: 'Colono', nativo: 'Abitante nativo', rover: 'Rover dell’esploratore' });
const FIGURE_NAMES = { adulto: 'adulto', zaino: 'con lo zaino', bambino: 'bambino' }, GEAR_NAMES = { tuta: 'tuta pressurizzata con casco', maschera: 'tuta da lavoro con respiratore', leggero: 'abiti leggeri' }, GEAR_SHORT = { tuta: 'tuta pressurizzata', maschera: 'respiratore', leggero: 'abiti leggeri' };
const OF_TYPOLOGY = { sigillato: 'dell’avamposto sigillato', simbiotico: 'dell’insediamento simbiotico', adattato: 'della città adattata' };
/** One building of each type, as the title of its model names it. */
export const BUILDING_NAMES = Object.freeze({
    hub: 'nodo di comando', modulo: 'modulo abitativo', schermato: 'modulo sotto regolite', cupola: 'cupola geodetica', pila: 'torre di moduli', serra: 'serra pressurizzata', radiatori: 'batteria di radiatori', solare: 'campo solare', reattore: 'reattore', estrattore: 'impianto della regolite', piattaforma: 'piattaforma di atterraggio', antenna: 'antenna per lo spazio profondo',
    cuore: 'sala centrale', baccello: 'baccello abitativo', gemelli: 'baccelli gemelli', torreviva: 'torre viva', membrana: 'serra a membrana', bioreattore: 'bioreattore', regolatore: 'regolatore di albedo', foglia: 'piattaforma a foglia', ramo: 'antenna ramificata',
    centrale: 'centro di controllo', piloni: 'blocco su piloni', terrazza: 'blocco a gradoni', processore: 'processore atmosferico', energia: 'impianto di energia', sfere: 'serbatoi sferici', capannone: 'serra industriale', hangar: 'hangar', container: 'deposito di container',
    capanna: 'capanna', casalunga: 'casa lunga', granaio: 'granaio', focolare: 'focolare', totem: 'totem'
});
const KIND_ORDER = { specie: 0, colonia: 1, villaggio: 2, nativo: 3, colono: 4, rover: 5 };
const capital = t => t[0].toUpperCase() + t.slice(1), mix = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t), metres = u => { const m = u / METRE; return (m < 3 ? Math.round(m * 100) / 100 : Math.round(m * 10) / 10).toString().replace('.', ','); };

/** Record of the index for one built surface: the colony with the types it built, in the order of the
 * types, and the village with its types, its people and the body of its inhabitants. */
export function indexRecord(s) {
    const colony = s.settlements.find(t => t.kind === 'colonia'), village = s.settlements.find(t => t.kind === 'villaggio');
    const rec = { c: colony.name, t: Object.keys(ARCH_TYPES[colony.typology]).filter(k => colony.types[k]) };
    rec.v = village ? { n: village.name, p: village.people, t: Object.keys(VILLAGE_TYPES).filter(k => village.types[k]), b: village.body } : null;
    return rec;
}
/** Every model of the living worlds, from the index `index` (content/worlds/modelli.json), in the order of the
 * catalogue: by system, by planet, then species, buildings of the colony, buildings of the village, natives;
 * colonists and rovers, shared by several planets, under the first planet where they appear. */
export function worldModels(index) {
    if (!index?.planets || index.planets.length !== UNIT_COUNT) return [];
    const cards = planetGenomes(), species = planetSpecies(), out = [], shared = new Map();
    const share = (id, make, planet) => { if (shared.has(id)) shared.get(id).planets.push(planet); else { const e = make(); e.planets = [planet]; shared.set(id, e); out.push(e); } };
    index.planets.forEach((rec, i) => {
        const g = cards[i], list = species[i], typ = typologyOf(g, list.length), system = systemForPlanet(i), base = { family: 'mondi', planet: i, system };
        list.forEach(sp => out.push({ ...base, id: `m${i}-${sp.id}`, kind: 'specie', group: 'specie', key: sp.id, name: sp.name, typeName: capital(sp.label), style: sp.kind }));
        for (const t of rec.t) out.push({ ...base, id: `m${i}-c-${t}`, kind: 'colonia', group: 'edifici', key: t, typology: typ, name: `${capital(BUILDING_NAMES[t])} · ${rec.c}`, typeName: capital(ARCH_TYPES[typ][t]), place: rec.c, style: typ });
        if (rec.v) {
            for (const t of rec.v.t) out.push({ ...base, id: `m${i}-v-${t}`, kind: 'villaggio', group: 'edifici', key: t, name: `${capital(BUILDING_NAMES[t])} · ${rec.v.n}`, typeName: capital(VILLAGE_TYPES[t]), place: rec.v.n, style: 'villaggio' });
            out.push({ ...base, id: `m${i}-n`, kind: 'nativo', group: 'abitanti', key: 'n', name: `Popolo ${rec.v.p}`, typeName: 'Abitante nativo', place: rec.v.n, body: rec.v.b, style: 'villaggio' });
        }
        COLONIST_FIGURES.forEach((f, k) => { const n = (k + (i % 4)) % 4, id = `colono-${GEAR[typ]}-${f}-${n}`; share(id, () => ({ ...base, id, kind: 'colono', group: 'abitanti', key: f, gear: GEAR[typ], tone: k + (i % 4), name: `Colono ${FIGURE_NAMES[f]}, ${GEAR_SHORT[GEAR[typ]]}, carnagione ${n + 1}`, typeName: 'Colono', style: typ }), i); });
        share('rover-' + typ, () => ({ ...base, id: 'rover-' + typ, kind: 'rover', group: 'abitanti', key: typ, typology: typ, name: `Rover ${OF_TYPOLOGY[typ]}`, typeName: 'Rover a sei ruote', style: typ }), i);
    });
    return out.sort((a, b) => a.system - b.system || a.planet - b.planet || KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
}
/** Counts by kind, for the documentation and the tests. */
export function worldCounts(list) {
    const by = {}; for (const e of list) by[e.kind] = (by[e.kind] || 0) + 1;
    return { total: list.length, kinds: by, groups: Object.fromEntries(WORLD_GROUPS.map(([g]) => [g, list.filter(e => e.group === g).length])) };
}
const speciesOf = e => planetSpecies()[e.planet].find(sp => sp.id === e.key);
/** Mesh of a model at level 0 (detailed) or 1 (light), built by the same functions as on the surfaces. */
export function worldMesh(e, level = 0) {
    const g = planetGenomes()[e.planet];
    if (e.kind === 'specie') return bodyMesh(speciesOf(e).plan, level);
    if (e.kind === 'colonia') return archMesh(colonySpec(g, colonyParams(g, planetSpecies()[e.planet].length), e.key), level);
    if (e.kind === 'villaggio') return buildingMesh(villageSpec(g, villageParams(g), e.key), level);
    if (e.kind === 'nativo') return nativeMesh(e.body, level);
    if (e.kind === 'colono') return colonistMesh(colonistSpec(e.key, e.gear, e.tone), level);
    return roverMesh(archPalette(g, e.typology), e.typology, level);
}
/** How the viewer draws a model: the colour its white parts take, as on the surface, the height of the legs
 * that swing while it walks in place, and whether it is a biped. Rovers have their own colours. */
export function worldLook(e) {
    const g = planetGenomes()[e.planet];
    if (e.kind === 'specie') { const sp = speciesOf(e); return { tint: sp.color.slice(0, 3), form: sp.form, plan: sp.plan, animal: sp.kind === 'animal' }; }
    if (e.kind === 'colonia') return { tint: e.key === HUB[e.typology] ? [1, 1, 1] : ROLE_COLORS[Object.keys(ARCH_TYPES[e.typology]).indexOf(e.key) % ROLE_COLORS.length] };
    if (e.kind === 'villaggio') return { tint: e.key === 'totem' || e.key === 'focolare' ? [1, 1, 1] : mix(g.palette.rock, [.8, .7, .55], .5) };
    if (e.kind === 'nativo') return { tint: mix(g.palette.pigment, g.palette.rock, .3).map(v => Math.min(1, v * 1.1)), legs: nativeLegs(e.body), biped: true };
    if (e.kind === 'colono') { const p = colonistSpec(e.key, e.gear, e.tone); return { tint: ROLE_COLORS[(e.tone + COLONIST_FIGURES.indexOf(e.key)) % ROLE_COLORS.length], legs: p.legs, biped: true }; }
    return { tint: null };
}
/** Height and width in metres of a mesh drawn at scale `scale`, from its vertices. */
export function meshSize(m, scale = 1) {
    let y0 = Infinity, y1 = -Infinity, r = 0; const st = m.stride || 12;
    for (let i = 0; i < m.v.length; i += st) { y0 = Math.min(y0, m.v[i + 1]); y1 = Math.max(y1, m.v[i + 1]); r = Math.max(r, Math.hypot(m.v[i], m.v[i + 2])); }
    return { height: Math.max(0, y1) * scale / METRE, width: 2 * r * scale / METRE, bottom: y0, top: y1, radius: r };
}
/** Card of a model: title, kind, style and the short lines of the catalogue, then the description. `title`
 * gives the name of the unit of a planet. */
const cards = new Map();
export function worldCard(e, title = i => 'pianeta ' + (i + 1)) { if (!cards.has(e.id)) cards.set(e.id, card(e, title)); return cards.get(e.id); }
function card(e, title) {
    const g = planetGenomes()[e.planet], where = `Pianeta di «${title(e.planet)}», sistema ${AREAS[e.system].name}`, lines = [];
    if (e.kind === 'specie') {
        const sp = speciesOf(e), size = meshSize(worldMesh(e, 1), sp.size);
        lines.push(`${e.typeName} · ${sp.habitatName}`, where, `Altezza circa ${metres(size.height * METRE)} m` + (sp.role ? `, ${sp.role}` : ''));
        return { title: e.name, kind: sp.kind === 'plant' ? 'Pianta' : sp.kind === 'fungus' ? 'Fungo' : 'Animale', style: sp.label, lines, about: sp.traits.slice(0, 2).join(' ') };
    }
    if (e.kind === 'colonia' || e.kind === 'villaggio') {
        const P = e.kind === 'colonia' ? colonyParams(g, planetSpecies()[e.planet].length) : villageParams(g), spec = e.kind === 'colonia' ? colonySpec(g, P, e.key) : villageSpec(g, P, e.key);
        lines.push(e.kind === 'colonia' ? `Colonia ${e.place}, ${TYPOLOGIES[e.typology]}` : e.place, where, `Altezza ${metres(spec.height)} m, ingombro ${metres(spec.radius * 2)} m`);
        const about = e.kind === 'colonia' ? `Uno dei tipi di edificio della colonia, costruito con il kit delle stazioni nello stile ${OF_TYPOLOGY[e.typology]}; la gravità di ${g.gravity.toFixed(2).replace('.', ',')} g decide quanto può salire.` : `Edificio del villaggio, con pali, graticcio e paglia del luogo; la gravità di ${g.gravity.toFixed(2).replace('.', ',')} g decide l’altezza dei totem.`;
        return { title: e.name, kind: WORLD_KINDS[e.kind], style: e.kind === 'colonia' ? TYPOLOGIES[e.typology] : 'villaggio nativo', lines, about };
    }
    if (e.kind === 'nativo') {
        const b = e.body; lines.push(e.place, where, `Altezza ${metres(b.height)} m, ${b.arms} braccia${b.tail ? ', con la coda' : ''}${b.crest ? ', con la cresta' : ''}`);
        return { title: e.name, kind: WORLD_KINDS.nativo, style: 'villaggio nativo', lines, about: 'Corpo digitigrado, collo lungo e testa piccola con occhi grandi, scelto per il villaggio dalla carta del pianeta: sotto una gravità debole il corpo è più alto.' };
    }
    const n = e.planets.length, list = e.planets.slice(0, 3).map(title).join(', ') + (n > 3 ? ` e altri ${n - 3}` : '');
    if (e.kind === 'colono') {
        const p = colonistSpec(e.key, e.gear, e.tone); lines.push(capital(GEAR_NAMES[e.gear]), `Nelle colonie di ${n === 1 ? '1 pianeta' : n + ' pianeti'}: ${list}`, `Altezza ${metres(p.height)} m, ${p.heads.toString().replace('.', ',')} teste`);
        return { title: e.name, kind: WORLD_KINDS.colono, style: TYPOLOGIES[e.style], lines, about: 'Le parti bianche del modello prendono il colore del ruolo di ogni colono per le strade.' };
    }
    lines.push(capital(TYPOLOGIES[e.typology]), `Sui ${n} pianeti con questa tipologia: ${list}`, 'Lungo 4,3 m, fino a 10 m/s, sale pendii fino a 25°');
    return { title: e.name, kind: WORLD_KINDS.rover, style: TYPOLOGIES[e.typology], lines, about: e.typology === 'sigillato' ? 'Abitacolo pressurizzato con una fascia di finestre e un portello di aggancio posteriore. Qui con i colori del primo pianeta della lista.' : 'Telaio aperto con due sedili, roll bar, console, portapacchi e pannello solare. Qui con i colori del primo pianeta della lista.' };
}
