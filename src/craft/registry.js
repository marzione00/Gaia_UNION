/** The catalogue of every station and ship of the galaxy (1.51.0): the 997 models of src/craft/catalog.js in
 * one order, the filters of the 3D catalogue and the card of each model, with its system, its work in the
 * economy (src/craft/economy.js) and, for the defence fleet, its strength against the Sciame. */
import { CATALOG, EXTRAS, SHIP_EXTRAS, DEFENCE, DEFENCE_FLEET } from './catalog.js';
import { RECIPES, RESOURCES, FLEET } from './economy.js';
import { POWER } from './threats.js';
import { AREAS, DISCIPLINE_NAMES, SYSTEM_COUNT } from '../scene/layout.js';

/** Groups of the catalogue, in the order of the filter buttons. */
export const GROUPS = Object.freeze([['tutti', 'Tutti'], ['stazioni', 'Stazioni'], ['navi', 'Navi'], ['difesa', 'Difesa']]);
/** Name of each construction style, as the catalogue writes it. */
export const STYLE_NAMES = Object.freeze({ matematica: 'stile della matematica', fisica: 'stile della fisica', chimica: 'stile della chimica', biologia: 'stile della biologia', civile: 'stile civile', difesa: 'stile della flotta' });
/** Where each model comes from, in the order of the releases. */
export const SOURCES = Object.freeze([['classici', 'Modelli classici', CATALOG], ['stazioni', 'Stazioni della grammatica dei tipi', EXTRAS], ['navi', 'Navi civili delle 120 classi', SHIP_EXTRAS], ['difesa-stazioni', 'Stazioni di difesa', DEFENCE], ['difesa-navi', 'Navi della flotta di difesa', DEFENCE_FLEET]]);

const rank = e => (e.kind === 'stazione' ? 0 : 1) * 2 + (e.defence ? 1 : 0);
/** Every model, by system; in a system the stations first, then the ships, each with the defence last. */
export const CRAFT = Object.freeze([...CATALOG, ...EXTRAS, ...SHIP_EXTRAS, ...DEFENCE, ...DEFENCE_FLEET].sort((a, b) => a.system - b.system || rank(a) - rank(b) || a.slot - b.slot));
export const CRAFT_BY_ID = new Map(CRAFT.map(e => [e.id, e]));

/** Group of a model: stazioni, navi or difesa. */
export const groupOf = e => e.defence ? 'difesa' : e.kind === 'nave' ? 'navi' : 'stazioni';
/** Models of a group, in one system or (system -1) in the whole galaxy. */
export function craftList({ group = 'tutti', system = -1 } = {}) {
    return CRAFT.filter(e => (group === 'tutti' || groupOf(e) === group) && (system < 0 || e.system === system));
}
/** The model `step` places after `id` in `list`, going round at the ends. */
export function craftStep(list, id, step) {
    if (!list.length) return null;
    const k = list.findIndex(e => e.id === id);
    return list[((k < 0 ? 0 : k + step) % list.length + list.length) % list.length];
}

const comma = v => String(Math.round(v * 100) / 100).replace('.', ',');
const goods = list => list.map(r => RESOURCES[r]?.name || r);
const listed = (names, max = 5) => names.length <= max + 1 ? names.join(', ') : names.slice(0, max).join(', ') + ` e altre ${names.length - max}`;
/** Kind of a model, as the card names it. */
export const kindName = e => e.defence ? (e.kind === 'nave' ? 'Nave di difesa' : 'Stazione di difesa') : e.kind === 'nave' ? 'Nave' : 'Stazione';
/** Card of a model: title, kind, style and the short lines of the 3D catalogue, then the description. */
export function craftCard(e) {
    const area = AREAS[e.system], lines = [typeof e.size === 'string' ? `${e.typeName}, ${e.size}` : e.typeName, `Sistema ${area.name}, braccio della ${DISCIPLINE_NAMES[area.sector]}`];
    if (e.kind === 'stazione') {
        const r = RECIPES[e.works || e.type], make = goods(Object.keys(r.make || {})), use = goods(Object.keys(r.use || {}));
        lines.push(`Processo: ${r.process}`);
        if (make.length) lines.push(`Produce ${listed(make)}`);
        if (use.length) lines.push(`Consuma ${listed(use)}`);
    } else if (e.defence) {
        lines.push(`Forza contro i droni dello Sciame: ${POWER[e.type]}`);
        if (e.wing > 1) lines.push(`Vola in formazione di ${e.wing}`);
    } else {
        const f = e.fleet || FLEET[e.type];
        lines.push(`Trasporta ${listed(goods(f.carries))}`);
        lines.push(`Carico ${f.capacity} unità, velocità ${comma(f.speed)}`);
    }
    return { title: e.name, kind: kindName(e), style: STYLE_NAMES[e.style], lines, about: e.about };
}
/** One line for the accessible description of the catalogue page. */
export function craftText(e, levels = null) {
    const c = craftCard(e), tri = levels ? ` Modello di ${levels.full} triangoli, ${levels.low} nella versione semplificata.` : '';
    return `${c.kind} ${c.title}, ${c.style}. ${c.lines.join('. ')}. ${c.about}${tri}`;
}
/** Counts of the catalogue, for the documentation and the tests. */
export function craftCounts() {
    const by = (key) => CRAFT.reduce((m, e) => (m[key(e)] = (m[key(e)] || 0) + 1, m), {});
    return { total: CRAFT.length, groups: by(groupOf), kinds: by(e => e.kind), styles: by(e => e.style), types: Object.keys(by(e => e.type)).length, systems: Array.from({ length: SYSTEM_COUNT }, (_, i) => CRAFT.filter(e => e.system === i).length), sources: SOURCES.map(([id, name, list]) => [id, name, list.length]) };
}
