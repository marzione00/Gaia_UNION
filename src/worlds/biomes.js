/** Biomes of the zone of a landing site (1.71.0). Every planet has five to eight kinds of ground, chosen from
 * those its family and its physics allow: forests need a dense air, marshes and lagoons wide seas, fields of
 * craters on deserts a thin air that does not erode them. The zone of about 4 km × 4 km is cut into cells
 * about 320 units (510 m) apart, as a Voronoi diagram of jittered points; each cell takes a biome from its
 * height, slope and nearness to the sea in the map of the planet, with a share of chance, and every biome of
 * the planet appears in the zone at least three times and none in more than three tenths of it. A biome has
 * its own shapes (a terrain style of src/worlds/terrain.js, with its own seed, scale and relief, or a basin
 * flattened towards the sea or the floor of the cell), its own colours of rock, vegetation and snow and its own
 * rocks. Neighbouring cells blend over about 110 units, along winding borders. The seas, the coasts and the square of the stations
 * keep the ground of 1.70.0: on dry land the biomes take the place of the local style between 160 and 360
 * units from the base, and the cells near the base are the biome of the planet's own style. */
import { noiseField, styleHeight, features, FEATURES, colorAt } from './terrain.js';
import { planetCards } from './genome.js';
import { seededRandom } from '../scene/systems.js';
import { EDGE } from './explorer.js';

const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const mix = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
const gauss = (d, w) => Math.exp(-(d * d) / (w * w));
/** Integer hash of three numbers to [0, 1). */
export function hash3(a, b, c) {
    let h = (Math.imul(a | 0, 0x27d4eb2d) ^ Math.imul(b | 0, 0x165667b1) ^ Math.imul(c | 0, 0x9e3779b1)) >>> 0;
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b); h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Spacing of the cells, width of the blend between two cells, and distance from the base over which the
 * biomes replace the local style of the planet (scene units). */
export const SPACING = 320, BLEND = 110, INNER = 160, OUTER = 360;
/** Twice the greatest shift of a point before its cell is found (the borders wind). */
const WARP = 220;
/** Smallest number of cells of each biome of a planet in the zone. */
export const MIN_CELLS = 3;
const SAND = [.84, .78, .62], SNOW = [.88, .93, .98];
/** Vegetation of each family on the earlier surfaces (colorAt). */
const FAMILY_GREEN = { terrestrial: .85, oceanic: .6, volcanic: .15 };

/** Whether the physics of planet g allows biome b: a least density of the air, a least share of the surface
 * under the sea, a greatest density of the air. */
export const allows = (g, b) => !b.needs || ((b.needs.air === undefined || g.atmosphere.density >= b.needs.air) && (b.needs.sea === undefined || g.terrain.seaLevel >= b.needs.sea) && (b.needs.thin === undefined || g.atmosphere.density < b.needs.thin));
/** Kinds of ground. shape: terrain style and scale (scene units per unit of the style); relief: height range in
 * scene units (1st to 99th percentile) on a planet of middle relief; flat: the cell is flattened towards the
 * sea ('mare') or the floor of the cell ('fondo'), keeping a share q of the height; detail: amplitude of the
 * fine relief; tone and toneMix: colour of the ground; veg: vegetation cover (family value when absent) and
 * vegTone: its colour mixed with the pigment of the planet; snow: snow cover on arctic planets; rough:
 * roughness of the ground; rocks: rocks per chunk of 64 × 64 units, size, and shares of boulders, slabs and
 * spires; prefer: preferred ground, by height ('basso', 'alto', 'medio'), slope ('ripido', 'piano') or
 * nearness to the sea ('umido'); needs: the physics the biome requires (allows); base: only as the
 * planet's own style; rare: share of the planets of its families that may draw it. */
export const BIOMES = Object.freeze([
    { id: 'prateria', name: 'Prateria', families: ['terrestrial'], shape: ['pianura', 520], relief: 6, detail: .5, veg: .85, rocks: [2, 1, [1, .3, 0]], prefer: 'basso',
        about: 'Pianura alluvionale coperta di vegetazione bassa e continua, con canali poco incisi dove scorre l’acqua delle piene.' },
    { id: 'colline', name: 'Colline', families: ['terrestrial'], shape: ['colline', 380], relief: 22, detail: .8, veg: .8, rocks: [3, 1, [1, .3, 0]], prefer: 'medio',
        about: 'Colline arrotondate dall’erosione, con valli fluviali sinuose fra un rilievo e l’altro.' },
    { id: 'gradoni', name: 'Gradoni', families: ['terrestrial'], shape: ['terrazze', 330], relief: 26, detail: .6, veg: .6, rocks: [6, 1.1, [.4, 1, 0]], prefer: 'alto',
        about: 'Versanti a gradini formati da strati di roccia di diversa durezza: gli strati teneri si erodono e quelli duri restano come ripiani.' },
    { id: 'foresta', name: 'Foresta', families: ['terrestrial', 'oceanic'], shape: ['colline', 300], relief: 12, detail: .7, veg: 1, vegTone: [[.06, .1, .05], .35], rocks: [3, 1, [1, .2, 0]], prefer: 'medio', needs: { air: .35 },
        about: 'Rilievi dolci sotto una copertura vegetale fitta, dove l’umidità del suolo sostiene la produzione primaria più alta della zona.' },
    { id: 'brughiera', name: 'Brughiera', families: ['terrestrial'], shape: ['colline', 460], relief: 14, detail: 1.1, veg: .55, vegTone: [[.42, .27, .33], .45], tone: [.5, .46, .42], toneMix: .3, rocks: [14, 1.1, [1, .5, 0]], prefer: 'alto',
        about: 'Rilievi ondulati su suoli poveri e acidi, con arbusti bassi e affioramenti di roccia.' },
    { id: 'palude', name: 'Palude', families: ['terrestrial'], shape: ['pianura', 260], relief: 2, flat: ['mare', .25], detail: .25, veg: .95, vegTone: [[.1, .12, .07], .4], rough: .62, rocks: [0, 1, [1, 0, 0]], prefer: 'umido', needs: { sea: .25 },
        about: 'Terreno quasi piano poco sopra il livello del mare, saturo d’acqua, con vegetazione scura e densa.' },
    { id: 'calanchi', name: 'Calanchi', families: ['terrestrial'], shape: ['fiordi', 170], relief: 16, detail: .5, veg: .12, tone: [.78, .72, .62], toneMix: .55, rocks: [2, .8, [1, .4, 0]], prefer: 'ripido',
        about: 'Rete fitta di creste e solchi scavati dall’acqua di ruscellamento in rocce argillose poco permeabili.' },
    { id: 'steppa', name: 'Steppa', families: ['terrestrial'], shape: ['pianura', 620], relief: 6, detail: .5, veg: .45, vegTone: [[.76, .66, .4], .5], rocks: [4, .9, [1, .3, 0]], prefer: 'piano', needs: { air: .3 },
        about: 'Pianura ampia e asciutta con vegetazione rada; le piogge scarse limitano la copertura del suolo.' },
    { id: 'massi', name: 'Campo di massi', families: ['terrestrial', 'oceanic', 'desert', 'barren', 'arctic', 'volcanic'], shape: ['colate', 240], relief: 10, detail: 1.6, veg: .3, snow: .3, rocks: [60, 1.5, [1, .25, .05]], rare: .45, prefer: 'ripido',
        about: 'Campo di massi staccati dai versanti per frantumazione meccanica e accumulati su un terreno irregolare.' },
    { id: 'mesa', name: 'Mesa', families: ['terrestrial', 'desert'], shape: ['mesa', 360], relief: 30, detail: .7, veg: .2, tone: [.66, .44, .3], toneMix: .3, rocks: [10, 1.2, [.6, .6, .2]], prefer: 'alto',
        about: 'Rilievi tabulari con cima piatta e pareti ripide: uno strato resistente in cima protegge la roccia più tenera sottostante.' },
    { id: 'arcipelago', name: 'Arcipelago', families: ['oceanic'], shape: ['arcipelago', 440], relief: 24, detail: .8, veg: .6, rocks: [3, 1, [1, .4, 0]], prefer: 'umido',
        about: 'Isole e bracci di mare fra rilievi in parte sommersi.' },
    { id: 'atollo', name: 'Atolli', families: ['oceanic'], shape: ['atollo', 560], relief: 14, detail: .5, veg: .55, rocks: [2, .9, [1, .3, 0]], prefer: 'umido',
        about: 'Anelli di scogliera intorno a lagune poco profonde, resti di antichi coni sprofondati.' },
    { id: 'fiordi', name: 'Fiordi', families: ['oceanic'], shape: ['fiordi', 420], relief: 40, detail: 1, veg: .5, rocks: [6, 1.2, [.7, .6, .1]], prefer: 'ripido',
        about: 'Valli strette e profonde scavate dai ghiacci e poi invase dal mare.' },
    { id: 'laguna', name: 'Laguna', families: ['oceanic'], shape: ['arcipelago', 300], relief: 3, flat: ['mare', .3], detail: .2, veg: .3, tone: SAND, toneMix: .45, rocks: [1, .8, [1, 0, 0]], prefer: 'umido', needs: { sea: .3 },
        about: 'Specchi d’acqua bassi separati dal mare da cordoni di sabbia e isolotti piatti.' },
    { id: 'scogliera', name: 'Scogliere', families: ['oceanic'], shape: ['altopiano', 340], relief: 24, detail: 1.1, veg: .45, rocks: [14, 1.2, [.4, 1, 0]], prefer: 'medio',
        about: 'Coste alte e tavolati di roccia, tagliati da fratture dove il mare erode la base dei versanti.' },
    { id: 'salmastra', name: 'Palude salmastra', families: ['oceanic'], shape: ['pianura', 280], relief: 2, flat: ['mare', .2], detail: .2, veg: .75, vegTone: [[.42, .42, .22], .35], rough: .62, rocks: [0, 1, [1, 0, 0]], prefer: 'umido', needs: { sea: .3 },
        about: 'Piana costiera inondata dalle maree, con acqua salmastra e vegetazione tollerante al sale.' },
    { id: 'dune-costiere', name: 'Dune costiere', families: ['oceanic'], shape: ['dune', 720], relief: 8, detail: .2, veg: .15, tone: [.88, .8, .62], toneMix: .6, rocks: [0, 1, [1, 0, 0]], prefer: 'basso',
        about: 'Cordoni di dune formati dalla sabbia che il vento solleva dalle spiagge.' },
    { id: 'altopiano-vulcanico', name: 'Altopiano vulcanico', families: ['oceanic'], shape: ['vulcani', 900], relief: 26, detail: .9, veg: .4, tone: [.2, .19, .19], toneMix: .35, rocks: [6, 1.1, [.8, .3, .2]], prefer: 'alto',
        about: 'Tavolato di lave antiche con coni isolati, ancora ben conservati sopra il livello del mare.' },
    { id: 'erg', name: 'Erg', families: ['desert'], shape: ['dune', 820], relief: 14, detail: .15, tone: [.88, .72, .5], toneMix: .45, rough: .8, rocks: [0, 1, [1, 0, 0]], prefer: 'piano', needs: { air: .05 },
        about: 'Mare di dune: la sabbia si accumula in creste parallele orientate dal vento dominante.' },
    { id: 'reg', name: 'Reg', families: ['desert'], shape: ['pianura', 560], relief: 4, detail: .4, tone: [.42, .32, .26], toneMix: .35, rocks: [50, .45, [1, .2, 0]], prefer: 'piano',
        about: 'Pianura di ciottoli: il vento ha asportato la sabbia fine e lasciato in superficie i frammenti più pesanti.' },
    { id: 'canyon', name: 'Canyon', families: ['desert'], shape: ['canyon', 420], relief: 42, detail: .8, tone: [.7, .42, .28], toneMix: .3, rocks: [10, 1.2, [.6, .6, .3]], prefer: 'alto',
        about: 'Gole profonde incise da corsi d’acqua del passato in un tavolato di roccia stratificata.' },
    { id: 'salina', name: 'Salina', families: ['desert'], shape: ['banchisa', 300], relief: 1, flat: ['fondo', .08], detail: .05, tone: [.95, .94, .9], toneMix: .9, rough: .7, rocks: [0, 1, [1, 0, 0]], prefer: 'basso',
        about: 'Bacino chiuso e piatto: l’acqua evaporata vi ha lasciato una crosta bianca di sali.' },
    { id: 'yardang', name: 'Yardang', families: ['desert'], shape: ['dorsali', 260], relief: 12, detail: .4, tone: [.74, .56, .4], toneMix: .3, rocks: [6, 1, [.3, .3, .6]], prefer: 'medio', needs: { air: .15 },
        about: 'Dorsali allungate scolpite dal vento, parallele alla sua direzione prevalente.' },
    { id: 'hamada', name: 'Hamada', families: ['desert'], shape: ['altopiano', 380], relief: 12, detail: 1, tone: [.36, .28, .24], toneMix: .4, rocks: [22, 1.2, [.3, 1, 0]], prefer: 'alto',
        about: 'Tavolato roccioso spoglio, con lastre fratturate e poca sabbia.' },
    { id: 'crateri', name: 'Crateri', families: ['desert', 'barren'], shape: ['crateri', 520], relief: 20, detail: .6, rocks: [6, 1, [1, .3, 0]], prefer: 'piano', needs: { thin: .2 },
        about: 'Pianura costellata di crateri da impatto; l’atmosfera sottile, o assente, frena poco i meteoriti e cancella lentamente i bordi.' },
    { id: 'altopiano', name: 'Altopiano fratturato', families: ['barren'], shape: ['altopiano', 360], relief: 16, detail: .8, rocks: [12, 1.1, [.5, 1, 0]], prefer: 'alto',
        about: 'Altopiano attraversato da fratture lunghe e strette, aperte dalle tensioni della crosta.' },
    { id: 'dorsali', name: 'Dorsali', families: ['barren'], shape: ['dorsali', 380], relief: 18, detail: .7, rocks: [6, 1, [.7, .5, 0]], prefer: 'medio',
        about: 'Dorsali e scarpate parallele, pieghe della crosta formate quando il pianeta si è raffreddato e contratto.' },
    { id: 'mare-basaltico', name: 'Mare basaltico', families: ['barren'], shape: ['pianura', 400], relief: 3, flat: ['fondo', .3], detail: .3, tone: [.16, .16, .17], toneMix: .55, rocks: [2, 1, [1, .2, 0]], prefer: 'basso',
        about: 'Pianura scura di lave basaltiche molto fluide che hanno riempito un bacino antico.' },
    { id: 'scarpate', name: 'Scarpate', families: ['barren'], shape: ['dorsali', 640], relief: 26, detail: .8, rocks: [10, 1.1, [.6, .7, 0]], prefer: 'ripido',
        about: 'Gradini lunghi chilometri nella crosta, sollevati da faglie inverse durante il raffreddamento del pianeta.' },
    { id: 'regolite', name: 'Regolite', families: ['barren'], shape: ['crateri', 240], relief: 6, detail: .3, tone: [.6, .59, .57], toneMix: .35, rocks: [5, .6, [1, 0, 0]], prefer: 'basso',
        about: 'Pianura di polvere e frammenti fini prodotti da miliardi di anni di piccoli impatti, con crateri minuti.' },
    { id: 'bacino', name: 'Bacino da impatto', families: ['barren'], shape: ['caldera', 520], relief: 40, detail: .7, rocks: [6, 1.2, [.8, .4, 0]], prefer: 'basso',
        about: 'Grande depressione circondata da un anello di rilievi, prodotta da un impatto di grande energia.' },
    { id: 'ghiacciaio', name: 'Ghiacciaio', families: ['arctic'], shape: ['ghiacciai', 460], relief: 36, detail: .6, snow: .8, rocks: [4, 1.2, [1, .3, 0]], prefer: 'alto',
        about: 'Valli occupate da lingue di ghiaccio che scorrono lentamente verso il basso e scavano la roccia.' },
    { id: 'banchisa', name: 'Banchisa', families: ['arctic'], base: true, shape: ['banchisa', 300], relief: 4, detail: .3, rocks: [1, 1, [1, 0, 0]], prefer: 'umido',
        about: 'Mare gelato: lastre di ghiaccio separate da fratture e creste di compressione.' },
    { id: 'criovulcani', name: 'Criovulcani', families: ['arctic'], shape: ['criovulcani', 560], relief: 30, detail: .5, snow: .6, rocks: [4, 1, [.5, 0, .8]], prefer: 'medio',
        about: 'Coni da cui risalgono acqua, ammoniaca o metano allo stato liquido, che gelano appena escono.' },
    { id: 'crepacci', name: 'Crepacci', families: ['arctic'], shape: ['altopiano', 150], relief: 9, detail: .3, tone: [.8, .9, .98], toneMix: .6, snow: .5, rough: .5, rocks: [2, 1, [1, .3, 0]], prefer: 'ripido',
        about: 'Ghiaccio fratturato da crepacci profondi, aperti dove il ghiacciaio si stira su un pendio irregolare.' },
    { id: 'nevaio', name: 'Campo di neve', families: ['arctic'], shape: ['pianura', 640], relief: 4, detail: .2, snow: .95, rough: .7, rocks: [1, .9, [1, 0, 0]], prefer: 'piano',
        about: 'Distesa piana di neve compatta, con poche asperità smussate dal vento.' },
    { id: 'tundra', name: 'Tundra', families: ['arctic'], shape: ['colline', 520], relief: 10, detail: .6, veg: .5, vegTone: [[.48, .42, .3], .45], snow: .15, rocks: [6, 1, [1, .3, 0]], prefer: 'basso', needs: { air: .3 },
        about: 'Terreno gelato in profondità con vegetazione bassa nella breve stagione calda.' },
    { id: 'morene', name: 'Morene', families: ['arctic'], shape: ['dorsali', 280], relief: 14, detail: 1, snow: .35, rocks: [44, 1.2, [1, .1, 0]], prefer: 'medio',
        about: 'Creste di detriti e massi trasportati e abbandonati dai ghiacciai durante il ritiro.' },
    { id: 'ghiaccio-azzurro', name: 'Ghiaccio azzurro', families: ['arctic'], shape: ['pianura', 440], relief: 4, detail: .1, tone: [.5, .72, .9], toneMix: .85, snow: 0, rough: .3, rocks: [1, 1, [1, 0, 0]], prefer: 'alto',
        about: 'Ghiaccio antico e compatto, privo di bolle d’aria, messo a nudo dal vento che asporta la neve.' },
    { id: 'vulcani', name: 'Coni vulcanici', families: ['volcanic'], shape: ['vulcani', 900], relief: 50, detail: .9, rocks: [6, 1.1, [.8, .3, .2]], prefer: 'alto',
        about: 'Campo di coni vulcanici con crateri sommitali e colate recenti.' },
    { id: 'colate', name: 'Colate di lava', families: ['volcanic'], shape: ['colate', 380], relief: 16, detail: 1.1, tone: [.1, .09, .09], toneMix: .4, lava: true, rocks: [4, 1, [1, .4, .1]], prefer: 'medio',
        about: 'Colate di lava che scorrono in canali e si raffreddano in superfici rugose.' },
    { id: 'caldera', name: 'Caldera', families: ['volcanic'], shape: ['caldera', 560], relief: 44, detail: .8, rocks: [6, 1.1, [.8, .4, .1]], prefer: 'basso',
        about: 'Ampia depressione circolare formata dal collasso di un vulcano dopo lo svuotamento della camera magmatica.' },
    { id: 'cenere', name: 'Campo di cenere', families: ['volcanic'], shape: ['dune', 520], relief: 6, detail: .2, veg: 0, tone: [.13, .12, .12], toneMix: .7, rough: .92, rocks: [2, .8, [1, 0, 0]], prefer: 'piano',
        about: 'Distesa di cenere e lapilli caduti dalle eruzioni, modellata dal vento in ondulazioni basse.' },
    { id: 'fumarole', name: 'Fumarole', families: ['volcanic'], shape: ['altopiano', 260], relief: 10, detail: .7, veg: 0, tone: [.8, .72, .28], toneMix: .35, rocks: [12, .9, [1, 0, .3]], prefer: 'medio',
        about: 'Terreno caldo e fratturato, dove i gas vulcanici escono dal suolo e depositano zolfo giallo.' },
    { id: 'colonnato', name: 'Basalti colonnari', families: ['volcanic'], shape: ['terrazze', 170], relief: 20, detail: .4, veg: .05, tone: [.11, .11, .12], toneMix: .5, rocks: [28, 1, [0, .2, 1]], prefer: 'ripido',
        about: 'Lava raffreddata lentamente e fratturata in colonne poligonali, che formano gradini e pareti verticali.' },
    { id: 'foresta-cenere', name: 'Foresta su cenere', families: ['volcanic'], shape: ['colline', 320], relief: 12, detail: .6, veg: .65, vegTone: [[.08, .1, .05], .25], rocks: [3, 1, [1, .2, 0]], prefer: 'medio', needs: { air: .6 },
        about: 'Vegetazione pioniera cresciuta sui suoli fertili di cenere vulcanica alterata.' }
]);
export const BIOME = Object.freeze(Object.fromEntries(BIOMES.map(b => [b.id, b])));
/** Biome of each terrain style: the ground of the square of the stations. */
export const STYLE_BIOME = Object.freeze({ colline: 'colline', terrazze: 'gradoni', pianura: 'prateria', arcipelago: 'arcipelago', atollo: 'atollo', fiordi: 'fiordi', dune: 'erg', canyon: 'canyon', mesa: 'mesa', crateri: 'crateri', altopiano: 'altopiano', dorsali: 'dorsali', ghiacciai: 'ghiacciaio', banchisa: 'banchisa', criovulcani: 'criovulcani', vulcani: 'vulcani', colate: 'colate', caldera: 'caldera' });
const decimal = v => String(v).replace('.', ',');
/** Conditions of a biome in words, for docs/BIOMI.md. */
export function conditionOf(b) {
    if (b.base) return 'solo come terreno proprio del pianeta';
    const n = b.needs || {}, out = [];
    if (n.air !== undefined) out.push('aria con densità almeno ' + decimal(n.air));
    if (n.thin !== undefined) out.push('aria con densità sotto ' + decimal(n.thin));
    if (n.sea !== undefined) out.push('mare su almeno il ' + Math.round(n.sea * 100) + ' % della superficie');
    return out.join(', ') || 'nessuna';
}

/** The biomes of planet g, attempt k: its own style first, then four to seven more of its family that its
 * physics allows, in the order of the catalogue. */
function draw(g, k) {
    const r = seededRandom((g.terrain.seed ^ 0xB10E5) + k * 0x9E3779B1), base = STYLE_BIOME[g.terrain.style];
    const pool = BIOMES.filter(b => b.id !== base && b.families.includes(g.family) && !b.base && allows(g, b) && (!b.rare || r() < b.rare)).map(b => b.id), count = Math.min(pool.length, 4 + Math.floor(r() * 4));
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const chosen = new Set(pool.slice(0, count));
    return [base, ...BIOMES.filter(b => chosen.has(b.id)).map(b => b.id)];
}
let lists = null;
/** Biomes of every planet, in planet order: no two planets have the same set (a repeated set is drawn again). */
export function planetBiomes() {
    if (lists) return lists;
    const seen = new Set(); lists = [];
    for (const g of planetCards()) { let k = 0, list; do list = draw(g, k++); while (seen.has([...list].sort().join())); seen.add([...list].sort().join()); lists.push(Object.freeze(list)); }
    return lists;
}
export const biomesOf = g => planetBiomes()[g.index];

/** Weight of the biomes at distance r from the base: 0 over the square of the stations, 1 from 360 units. */
export const biomeWeight = r => smooth(INNER, OUTER, r);

/** Shape of biome b on planet g, in scene units around zero: the style with its own seed, scale and relief; the
 * features of the styles with cones and craters are placed on a lattice of tiles of the style, so they cover
 * the zone. `own` is the local style of the planet (field units), used by the biome of its own style. */
function shapeOf(g, b, t, own, S, L) {
    const relief = .75 + .5 * g.terrain.relief, Nd = noiseField(g.terrain.seed ^ 0xD37A11), fine = (x, z) => (Nd.fbm(x / 5.6, z / 5.6, 3) - .5) * 2 * b.detail;
    if (b.id === STYLE_BIOME[g.terrain.style]) return { h: (x, z) => (own(x, z) - .5) * L * S, lava: null };
    const [style, scale] = b.shape, N = noiseField(Math.floor(hash3(g.terrain.seed, t, 0x51) * 1e9)), spec = FEATURES[style], ou = hash3(g.terrain.seed, t, 1) * 50, ov = hash3(g.terrain.seed, t, 2) * 50;
    // Features of the 3 × 3 tiles around a quarter of a tile, kept if they reach it.
    const tiles = new Map(), near = (u, v) => {
        const qi = Math.floor(u * 4), qj = Math.floor(v * 4), key = qi * 65536 + qj; let F = tiles.get(key);
        if (F) return F;
        F = []; const ti = Math.floor(qi / 4), tj = Math.floor(qj / 4), x0 = qi / 4, y0 = qj / 4;
        for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
            const tile = features(seededRandom(Math.floor(hash3(ti + di, tj + dj, t * 131 + g.terrain.seed % 100003) * 1e9)), ...spec);
            for (const f of tile) { const c = { x: f.x + ti + di, y: f.y + tj + dj, R: f.R }, dx = Math.max(x0 - c.x, 0, c.x - x0 - .25), dy = Math.max(y0 - c.y, 0, c.y - y0 - .25); if (Math.hypot(dx, dy) < 1.9 * c.R) F.push(c); }
        }
        if (tiles.size > 4096) tiles.clear();
        tiles.set(key, F); return F;
    };
    const raw = (u, v) => styleHeight(style, N, spec ? near(u, v) : [], u, v, true);
    // Mean and range of the style over three by three tiles, so the relief (1st to 99th percentile) is the one
    // of the catalogue.
    const s = []; for (let j = 0; j < 36; j++) for (let i = 0; i < 36; i++) s.push(raw(ou + i / 12, ov + j / 12));
    const mean = s.reduce((a, x) => a + x, 0) / s.length; s.sort((a, x) => a - x);
    const amp = b.relief * relief / Math.max(.02, s[Math.floor(s.length * .99)] - s[Math.floor(s.length * .01)]);
    const lava = b.lava ? (x, z) => { const u = x / scale + ou, v = z / scale + ov; return gauss(Math.abs(N.fbm(u * 5 + 3, v * 9) - .5), .02); } : null;
    return { h: (x, z) => (raw(x / scale + ou, z / scale + ov) - mean) * amp + fine(x, z), lava, amp, mean };
}

/** Biome map of planet g on its field. `T` is the map of the sphere, `dir(x, z)` the direction of a point,
 * `own(x, z)` the local style in field units (around 0.5), S and L the scales of the field. */
export function biomeMap(g, { T, dir, own, S, L }) {
    const ids = biomesOf(g), types = ids.map(id => BIOME[id]), sea = T.sea, seed = g.terrain.seed;
    const shapes = types.map((b, t) => shapeOf(g, b, BIOMES.indexOf(b) * 7 + t, own, S, L));
    const height = (x, z) => (T.height(dir(x, z)) - sea) * S;
    // Points of the cells: one per square of the lattice, jittered by up to 0.35 of the spacing.
    const point = (i, j) => [(i + .15 + .7 * hash3(i, j, seed)) * SPACING, (j + .15 + .7 * hash3(i, j, seed ^ 0x2545)) * SPACING];
    const survey = (i, j) => {
        const [x, z] = point(i, j), h = height(x, z), d = 40, gx = (height(x + d, z) - height(x - d, z)) / (2 * d), gz = (height(x, z + d) - height(x, z - d)) / (2 * d);
        let wet = 0; for (let k = 0; k < 8; k++) wet += height(x + Math.cos(k * Math.PI / 4) * 160, z + Math.sin(k * Math.PI / 4) * 160) < 0;
        return { i, j, x, z, h, slope: Math.hypot(gx, gz), wet: wet / 8 };
    };
    // The cells of the zone, surveyed first: their heights and slopes give the scale of the preferences.
    const lo = Math.floor(-EDGE / SPACING), hi = Math.floor(EDGE / SPACING), zone = [];
    for (let j = lo; j <= hi; j++) for (let i = lo; i <= hi; i++) zone.push(survey(i, j));
    const hs = zone.map(c => c.h).sort((a, b) => a - b), ss = zone.map(c => c.slope).sort((a, b) => a - b);
    const rank = (list, v) => { let a = 0, b = list.length; while (a < b) { const m = (a + b) >> 1; if (list[m] < v) a = m + 1; else b = m; } return a / list.length; };
    const PREFER = {
        basso: c => 1 - rank(hs, c.h), alto: c => rank(hs, c.h), medio: c => 1 - 2 * Math.abs(rank(hs, c.h) - .5), ripido: c => rank(ss, c.slope), piano: c => 1 - rank(ss, c.slope),
        umido: c => .5 * (1 - rank(hs, c.h)) + c.wet
    };
    const score = (c, t) => PREFER[types[t].prefer](c) + 1.25 * hash3(c.i * 31 + t, c.j, seed ^ 0x5C0) - (types[t].flat?.[0] === 'mare' && c.h > 25 ? 2 : 0);
    const pick = c => { let best = 0, top = -Infinity; for (let t = 0; t < types.length; t++) { const s = score(c, t); if (s > top) { top = s; best = t; } } return best; };
    // The cells within 330 units of the base, and the nearest one, are the biome of the planet's own style.
    let first = zone[0]; for (const c of zone) if (Math.hypot(c.x, c.z) < Math.hypot(first.x, first.z)) first = c;
    for (const c of zone) { c.fixed = c === first || Math.hypot(c.x, c.z) < 330; c.t = c.fixed ? 0 : pick(c); }
    // Every biome in the zone at least MIN_CELLS times: the missing ones take the cells that suit them best
    // among those of the most common biomes.
    const inZone = c => Math.abs(c.x) <= EDGE && Math.abs(c.z) <= EDGE, count = t => zone.filter(c => inZone(c) && c.t === t).length;
    for (let t = 1; t < types.length; t++) while (count(t) < MIN_CELLS) {
        let best = null, top = -Infinity;
        for (const c of zone) if (inZone(c) && !c.fixed && c.t !== t && count(c.t) > MIN_CELLS) { const s = score(c, t); if (s > top) { top = s; best = c; } }
        if (!best) break; best.t = t;
    }
    // No biome takes more than three tenths of the zone: the cells that suit it least go to the biome that
    // suits them best among those with room.
    const most = Math.ceil(.3 * zone.filter(inZone).length);
    for (let t = 0; t < types.length; t++) while (count(t) > most) {
        let best = null, to = -1, top = -Infinity;
        for (const c of zone) if (inZone(c) && !c.fixed && c.t === t) for (let u = 0; u < types.length; u++) if (u !== t && count(u) < most) { const s = score(c, u) - score(c, t); if (s > top) { top = s; best = c; to = u; } }
        if (!best) break; best.t = to;
    }
    const cells = new Map(zone.map(c => [c.i * 65536 + c.j, c]));
    const cell = (i, j) => { const key = i * 65536 + j; let c = cells.get(key); if (!c) { c = survey(i, j); c.t = pick(c); cells.set(key, c); } return c; };
    // Weights of the biomes at a point: the cells of the 5 × 5 squares around it whose point is within BLEND of
    // the nearest one, weighted (1 - excess / BLEND)², summed by biome; H holds the height of the cells of each
    // biome there, averaged with the same weights, the floor of the basins. Scratch arrays, no allocation.
    // The point is first moved by a smooth noise, along each axis about 20 units in the median and at most about
    // 100, so the borders between cells, straight in a Voronoi diagram, wind like the edges of real biomes.
    const W = new Float64Array(types.length), H = new Float64Array(types.length), D = new Float64Array(25), C = new Array(25), last = [NaN, NaN], Nw = noiseField(seed ^ 0x3A7F1);
    const weights = (x0, z0) => {
        const x = x0 + WARP * (Nw.fbm(x0 / 260, z0 / 260, 3) - .5), z = z0 + WARP * (Nw.fbm(x0 / 260 + 17.3, z0 / 260 - 9.1, 3) - .5);
        const ci = Math.floor(x / SPACING), cj = Math.floor(z / SPACING), n = 25; let near = Infinity;
        if (ci !== last[0] || cj !== last[1]) { let k = 0; for (let dj = -2; dj <= 2; dj++) for (let di = -2; di <= 2; di++) C[k++] = cell(ci + di, cj + dj); last[0] = ci; last[1] = cj; }
        for (let k = 0; k < n; k++) { const dx = x - C[k].x, dz = z - C[k].z, d = dx * dx + dz * dz; D[k] = d; if (d < near) near = d; }
        near = Math.sqrt(near); const reach = (near + BLEND) * (near + BLEND);
        W.fill(0); H.fill(0); let sum = 0;
        for (let k = 0; k < n; k++) if (D[k] < reach) { const e = (Math.sqrt(D[k]) - near) / BLEND, w = (1 - e) * (1 - e); W[C[k].t] += w; H[C[k].t] += w * C[k].h; sum += w; }
        for (let t = 0; t < types.length; t++) { if (W[t]) H[t] /= W[t]; W[t] /= sum; }
        return W;
    };
    return {
        ids, types, zone, cell, weights, shapes,
        /** Height in scene units of a point of dry land: h0 is the height of the earlier field (map of the sphere
         * and local style), `own` the shapes of the planet's style there at full weight and `near` the share of
         * them in h0. The biomes take the place of that share, in proportion to wb and less up to 1.5 units above
         * the sea, so the ground meets the coast without a step; the point stays above the sea, at no less than a
         * quarter of h0. */
        height(x, z, h0, wb, own, near) {
            const w = weights(x, z); let B = 0;
            for (let t = 0; t < types.length; t++) {
                if (!w[t]) continue;
                const b = types[t]; let term = t === 0 ? own : shapes[t].h(x, z);
                if (b.flat) { const [to, q] = b.flat, lim = to === 'mare' ? 10 : 20, ref = to === 'mare' ? 0 : H[t]; term += -(1 - q) * Math.max(-lim, Math.min(lim, h0 - ref)); }
                B += w[t] * term;
            }
            return Math.max(.25 * h0, h0 + wb * smooth(0, 1.5, h0) * (B - near));
        },
        /** Lava mask of the biomes with lava channels. */
        lava(x, z) { const w = weights(x, z); let m = 0; for (let t = 0; t < types.length; t++) if (w[t] && shapes[t].lava) m += w[t] * shapes[t].lava(x, z); return m; },
        /** Index of the biome with most weight at a point. */
        at(x, z) { const w = weights(x, z); let best = 0; for (let t = 1; t < types.length; t++) if (w[t] > w[best]) best = t; return best; }
    };
}

/** Ground colour of biome b at a point: the rock, the colour of the biome, the shore, the vegetation of the
 * biome where the air allows it, snow on arctic planets. The biome of the planet's style keeps colorAt. */
export function biomeColour(g, b, own, height, sea, slope, wet = 0) {
    if (own || height <= sea) return colorAt(g, height, sea, slope, wet, 0);
    const p = g.palette;
    let c = b.tone ? mix(p.rock, b.tone, b.toneMix * (1 - .4 * slope)) : g.family === 'desert' ? mix(p.rock, [.86, .7, .5], .35 * (1 - slope)) : p.rock.slice();
    if (height - sea < .025 && sea > 0) c = mix(c, SAND, .7);
    const veg = (b.veg ?? FAMILY_GREEN[g.family] ?? 0) * Math.min(1, g.atmosphere.density * 1.6);
    if (veg > 0) c = mix(c, b.vegTone ? mix(p.pigment, ...b.vegTone) : p.pigment, veg * (1 - smooth(.25, .6, slope)) * (.7 + .3 * wet));
    if (g.family === 'arctic') { const cover = b.snow ?? .75; if (cover) c = mix(c, SNOW, cover * (1 - smooth(.35, .8, slope))); }
    else if (g.atmosphere.density > .2 && height > .86) c = mix(c, [.95, .96, .98], smooth(.86, .93, height));
    return c;
}

/** Side of a chunk of rocks, and the greatest number of rocks in one. */
export const CHUNK = 64, CHUNK_MOST = 64;
/** Rocks of the chunk (ci, cj) of surface s, beyond the square of the stations (1.71.0): 64 candidate points
 * from a hash of the chunk, each kept with the share of rocks of the biomes there (rocks[0] / 64), on dry
 * ground; the biome with most weight gives size, shape and colour. Three lists of instances of 8 numbers
 * (x, y, z, size, r, g, b, heading): boulders, slabs and spires. */
export function chunkRocks(s, ci, cj) {
    const F = s.field, g = s.genome, out = [[], [], []]; if (!F?.biomes) return out;
    const B = F.biomes(), seed = g.terrain.seed % 1000003;
    for (let k = 0; k < CHUNK_MOST; k++) {
        const h = q => hash3(ci * 977 + k, cj * 991 + q, seed), x = (ci + h(1)) * CHUNK, z = (cj + h(2)) * CHUNK;
        if (Math.max(Math.abs(x), Math.abs(z)) <= 120) continue;
        const w = B.weights(x, z); let want = 0, top = 0;
        for (let t = 0; t < B.types.length; t++) { want += w[t] * B.types[t].rocks[0]; if (w[t] > w[top]) top = t; }
        if (h(3) * CHUNK_MOST >= want * biomeWeight(Math.hypot(x, z))) continue;
        const y = s.heightAt(x, z); if (s.seaY !== null && y < s.seaY - .2) continue;
        const b = B.types[top], [, size, shares] = b.rocks, sum = shares[0] + shares[1] + shares[2], u = h(4) * sum, shape = u < shares[0] ? 0 : u < shares[0] + shares[1] ? 1 : 2;
        const sc = size * (.45 + 1.9 * h(5) * h(5)), lit = .55 + .4 * h(6), c = (b.tone ? mix(g.palette.rock, b.tone, .35) : g.palette.rock).map(v => v * lit);
        out[shape].push(x, y - .25 * sc, z, sc, c[0], c[1], c[2], h(7) * 6.283);
    }
    return out;
}
