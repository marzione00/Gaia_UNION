/** Type grammar of the stations: every type is a shape family (src/craft/families.js) joined to a role,
 * which fills the sockets of the family with its modules (src/craft/modules.js) and paints the bands of
 * the core. Twelve families and ten roles give 120 types, written as data. Each instance chooses, from
 * its seed, the parameters of the family and the main, second and minor module of the role; the choices
 * are the recipe of the model, as for the twelve classic stations of src/craft/stations.js. */
import { assemble, hash } from './kit.js';
import { mount, HOT, LEAF } from './modules.js';
import { FAMILY_BUILDERS, FAMILIES, FAMILY_KEYS } from './families.js';

export const ROLES = {
    abitazione: { scale: [1, 1.15], noun: 'Habitat', gender: 'm', major: ['modulo abitato', 'cupola abitata', 'baccelli', 'anello abitato', 'terrazze', 'parco'], minor: ['antenna', 'parabola'], band: k => k.accent(.45), recipe: ['habitat'], about: 'Ospita equipaggi e famiglie in moduli con finestre, cupole, baccelli e parchi.' },
    cantiere: { scale: [1.35, 1.25], noun: 'Arsenale', gender: 'm', major: ['scalo', 'gru', 'bacino', 'hangar', 'rampa di varo', 'officina'], minor: ['gru', 'antenna'], band: k => k.trim(), recipe: ['montaggio', 'circuiti', 'moduli'], about: 'Costruisce e ripara navi su scali, bacini e rampe di varo, servito da gru.' },
    fonderia: { scale: [1.15, 1], noun: 'Fonderia', gender: 'f', major: ['forno', 'tramoggia', 'frantoio', 'camino', 'colata'], minor: ['radiatori caldi', 'camino'], band: k => k.glow(HOT, 1.3), recipe: ['altoforno', 'leghe', 'vetreria', 'silicio'], about: 'Fonde il minerale in forni e linee di colata e ne ricava metalli e parti.' },
    chimica: { scale: [1.3, .9], noun: 'Impianto chimico', gender: 'm', major: ['colonna', 'sfere', 'reattore', 'scambiatore', 'fascio di tubi'], minor: ['torcia'], band: k => k.trim(), recipe: ['ghiaccio', 'elettrolisi', 'ammoniaca', 'polimeri', 'propellente'], about: 'Distilla e trasforma gas e ghiacci in colonne, reattori e serbatoi sferici.' },
    energia: { scale: [1.2, 1.5], noun: 'Centrale', gender: 'f', major: ['pannelli', 'toro di fusione', 'radiatori', 'accumulatori', 'specchio'], minor: ['traliccio elettrico'], band: k => k.accent(1.1), recipe: ['centrale', 'solare'], about: 'Produce energia con pannelli, specchi e reattori a fusione, e la conserva in accumulatori.' },
    ricerca: { scale: [1, 1.1], noun: 'Laboratorio', gender: 'm', major: ['laboratorio', 'bobine', 'acceleratore', 'camera a vuoto', 'campionatore'], minor: ['braccio sensore'], band: k => k.accent(.75), recipe: ['strumenti', 'farmaci', 'laboratorio'], about: 'Ospita esperimenti in laboratori, camere a vuoto, bobine e anelli di accelerazione.' },
    osservazione: { scale: [1.1, 1.4], noun: 'Osservatorio', gender: 'm', major: ['parabola', 'telescopio', 'schiera', 'schermo solare', 'cupola ottica'], minor: ['interferometro', 'antenna'], band: k => k.accent(.5), recipe: ['telescopio'], about: 'Osserva stelle e pianeti con telescopi, parabole e schiere di antenne.' },
    agricoltura: { scale: [1.15, 1.2], noun: 'Fattoria', gender: 'f', major: ['serra', 'biocupola', 'vasche di alghe', 'anello verde', 'alveare'], minor: ['petali'], band: k => k.paint(LEAF, .05, .5, .6), recipe: ['serra', 'alghe'], about: 'Coltiva piante e alghe in serre, cupole e vasche illuminate dalla stella.' },
    deposito: { scale: [.9, 1.25], noun: 'Magazzino', gender: 'm', major: ['serbatoi', 'container', 'silo', 'rastrelliera', 'capsule', 'criogenico'], minor: ['antenna'], band: k => k.trim(), recipe: ['magazzino'], about: 'Conserva merci in serbatoi, silos, container e capsule a pressione.' },
    comunicazioni: { scale: [1.7, .7], noun: 'Ripetitore', gender: 'm', major: ['pannello a fase', 'ripetitore', 'guglia', 'terminale laser', 'ventaglio di antenne'], minor: ['antenna'], band: k => k.accent(.9), recipe: ['ripetitore'], about: 'Ritrasmette segnali fra navi, stazioni e sistemi con antenne, pannelli a fase e laser.' },
};
export const ROLE_KEYS = Object.keys(ROLES);
/** Recipe of a type in the economy (src/craft/economy.js): the variants of its role in turn along the
 * twelve families, so fonderie, impianti chimici, arsenali and laboratori of different families work on
 * different links of the production chains. */
export const worksOf = type => { const v = ROLES[type.role].recipe; return v[FAMILY_KEYS.indexOf(type.family) % v.length]; };

/** The 120 types: one for each role and family, with a name in Italian and a short description. */
export const TYPES = ROLE_KEYS.flatMap(role => FAMILY_KEYS.map(family => ({
    key: role + '-' + family, role, family, name: ROLES[role].noun + ' ' + FAMILIES[family][ROLES[role].gender],
    about: ROLES[role].about + ' ' + FAMILIES[family].about,
})));
export const TYPE_BY_KEY = Object.fromEntries(TYPES.map(t => [t.key, t]));

/** Model of one type from a dice and a style. Major sockets alternate between the main and the second
 * module, scaled by the proportions of the role; about a quarter of the minor sockets stay empty. */
export function buildType(type, d, st) {
    const role = ROLES[type.role], { kits, sockets } = FAMILY_BUILDERS[type.family]({ d, st, band: k => role.band(k) });
    const main = d.choose('modulo principale', role.major), second = d.choose('modulo secondario', role.major.filter(m => m !== main)), minor = d.choose('modulo minore', role.minor);
    // Each role has its own proportions: long thin antennas, wide panels and dishes, squat stores.
    const [sl, sr] = role.scale; let n = 0;
    sockets.forEach((s, i) => {
        const fit = { ...s, L: s.L * sl, R: s.R * sr };
        if (s.major) mount(s.k, d, n++ % 2 ? second : main, fit);
        else if (hash(i, s.p[0], s.p[2]) > .25) mount(s.k, d, minor, fit);
    });
    return assemble(kits);
}
/** The types in the form of src/craft/stations.js, so the catalogue and the factory can build them. */
export const GRAMMAR_STATIONS = Object.fromEntries(TYPES.map(t => [t.key, { name: t.name, build: (d, st) => buildType(t, d, st), size: 1, about: t.about, role: t.role, family: t.family }]));
