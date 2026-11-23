/** Species of the explorable planets, derived from the identity card (src/worlds/genome.js).
 * The card decides which forms can live on a planet (family, atmosphere, sea), their colour (star type),
 * their proportions (gravity) and the adaptations described in the exploration diary. These are
 * illustrative hypotheses, inspired by published speculation on life on other worlds, not predictions. */
import { seededRandom } from '../scene/systems.js';
import { bodyPlan } from './bodyplan.js';

/** Body plans. `size` is the scale of the mesh at 1 g; `count` the number of individuals on the surface. */
export const FORMS = Object.freeze({
    ciuffo: { kind: 'plant', mesh: 'tuft', label: 'erba a ciuffi', size: 1.15, count: [150, 240], habitat: 'pianura' },
    felce: { kind: 'plant', mesh: 'frond', label: 'felce a rosetta', size: 1.25, count: [50, 100], habitat: 'riva' },
    albero: { kind: 'plant', mesh: 'tree', label: 'albero a ombrello', size: 1.35, count: [24, 46], habitat: 'altura' },
    colonna: { kind: 'plant', mesh: 'column', label: 'pianta a colonna', size: 1.3, count: [26, 52], habitat: 'pianura' },
    cuscino: { kind: 'plant', mesh: 'cushion', label: 'pianta a cuscino', size: 1.1, count: [70, 140], habitat: 'ovunque' },
    calice: { kind: 'plant', mesh: 'cup', label: 'organismo a calice', size: 1.3, count: [36, 70], habitat: 'sfiati' },
    crosta: { kind: 'plant', mesh: 'patch', label: 'crosta biologica', size: 1.5, count: [90, 160], habitat: 'pianura' },
    pascolatore: { kind: 'animal', mesh: 'grazer', label: 'pascolatore', size: 1.5, count: [7, 13], habitat: 'pianura' },
    esapode: { kind: 'animal', mesh: 'hexapod', label: 'esapode', size: 1.3, count: [8, 16], habitat: 'ovunque' },
    volatore: { kind: 'animal', mesh: 'flyer', label: 'volatore', size: 1.6, count: [5, 9], habitat: 'altura' },
    medusa: { kind: 'animal', mesh: 'floater', label: 'medusa galleggiante', size: 1.5, count: [8, 14], habitat: 'mare' },
    // Forms added in 1.63.0.
    arbusto: { kind: 'plant', mesh: 'shrub', label: 'arbusto', size: 1.2, count: [60, 130], habitat: 'altura' },
    canneto: { kind: 'plant', mesh: 'reed', label: 'canna di riva', size: 1.25, count: [60, 120], habitat: 'riva' },
    fungo: { kind: 'fungus', mesh: 'fungus', label: 'fungo', size: 1.1, count: [30, 70], habitat: 'ovunque' },
    saltatore: { kind: 'animal', mesh: 'hopper', label: 'saltatore', size: 1.1, count: [10, 22], habitat: 'pianura' },
    serpentino: { kind: 'animal', mesh: 'crawler', label: 'animale strisciante', size: 1.2, count: [6, 12], habitat: 'ovunque' },
    cacciatore: { kind: 'animal', mesh: 'hunter', label: 'cacciatore a quattro zampe', size: 1.6, count: [3, 6], habitat: 'pianura' },
    bipede: { kind: 'animal', mesh: 'biped', label: 'corridore bipede', size: 1.8, count: [2, 5], habitat: 'ovunque' },
    ottopode: { kind: 'animal', mesh: 'octopod', label: 'ottopode', size: 1, count: [4, 8], habitat: 'riva' }
});
export const HABITATS = Object.freeze({ riva: 'riva del mare', pianura: 'pianure', altura: 'alture', mare: 'mare aperto', sfiati: 'zone calde', ovunque: 'tutto il paesaggio' });
/** Forms available to each family; the card's atmosphere and sea then filter them. */
const POOLS = {
    terrestrial: { plants: ['albero', 'felce', 'ciuffo'], animals: ['pascolatore', 'esapode', 'volatore'] },
    oceanic: { plants: ['albero', 'ciuffo', 'felce'], animals: ['medusa', 'volatore', 'esapode'] },
    volcanic: { plants: ['calice', 'ciuffo', 'felce'], animals: ['esapode', 'volatore'] },
    arctic: { plants: ['cuscino', 'crosta'], animals: ['esapode', 'medusa'] },
    desert: { plants: ['colonna', 'crosta', 'cuscino'], animals: ['esapode'] },
    barren: { plants: [], animals: [] }
};
/** Minimum atmosphere density for flying, minimum sea level for floating colonies. */
export const FLIGHT_DENSITY = .45, FLOAT_SEA = .3;

const ROOTS = { ciuffo: 'Grami', felce: 'Pteri', albero: 'Dendro', colonna: 'Stylo', cuscino: 'Pulvi', calice: 'Cyatho', crosta: 'Crusti', pascolatore: 'Pecu', esapode: 'Hexa', volatore: 'Ptero', medusa: 'Medu',
    arbusto: 'Thamno', canneto: 'Calamo', fungo: 'Myco', saltatore: 'Salto', serpentino: 'Ophi', cacciatore: 'Lyco', bipede: 'Dipo', ottopode: 'Octo' };
const SYLLABLES = ['la', 'ri', 'ne', 'ta', 'mo', 've', 'si', 'co', 'lu', 'ra', 'di', 'no', 'ca', 'te', 'po'];
const ENDINGS = ['ria', 'lia', 'nia', 'ella', 'ina', 'ssa', 'ra', 'tia'];
const PLACE_EPITHETS = { riva: 'litoralis', pianura: 'campestris', altura: 'alpestris', mare: 'pelagica', sfiati: 'thermalis', ovunque: 'vulgaris' };
const comma = (x, d = 2) => x.toFixed(d).replace('.', ',');
const hueOf = ([r, g, b]) => { const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min; if (d < 1e-6) return 0; const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
function colourEpithet(c) {
    const lum = .2126 * c[0] + .7152 * c[1] + .0722 * c[2], spread = Math.max(...c) - Math.min(...c), h = hueOf(c);
    if (lum < .13) return 'nigra';
    if (spread < .08) return 'pallida';
    return h < 25 || h >= 330 ? 'rubra' : h < 70 ? 'aurea' : h < 165 ? 'viridis' : h < 265 ? 'caerulea' : 'purpurea';
}
const mix = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
function shiftHue([r, g, b], deg) {
    const a = deg * Math.PI / 180, k = 1 / Math.sqrt(3), c = Math.cos(a), s = Math.sin(a), dot = k * (r + g + b);
    const cross = [k * (b - g), k * (r - b), k * (g - r)];
    return [r, g, b].map((v, i) => Math.max(0, Math.min(1, v * c + cross[i] * s + k * dot * (1 - c))));
}
function shuffled(list, r) { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/** Leaf colour explained by the star type (after Kiang et al., 2007, on pigments under other stars). */
const PIGMENT_TRAIT = {
    M: 'Foglie quasi nere. Una nana rossa emette soprattutto luce rossa e infrarossa e poca luce visibile: un pigmento scuro ne assorbe la parte più ampia possibile.',
    K: 'Foglie rosso-brune, colorate da pigmenti accessori simili agli antociani terrestri, che proteggono i tessuti dalla luce in eccesso.',
    G: 'Foglie verdi come sulla Terra: la luce della stella è simile a quella del Sole.',
    F: 'Foglie dorate. Sotto una stella più calda del Sole i fotoni blu sono abbondanti: un pigmento che assorbe il blu riflette il giallo.',
    A: 'Foglie verde-azzurre e lucide. La stella, molto calda, emette molto ultravioletto e la superficie riflettente protegge i tessuti.'
};
const FORM_TRAIT = {
    ciuffo: 'Cresce dalla base delle foglie, così sopravvive al pascolo e al calpestio.',
    felce: 'Foglie a rosetta che si aprono dal centro; si riproduce con spore portate dal vento.',
    albero: 'Chioma a ombrello: le foglie stanno in un solo strato largo e catturano la luce senza farsi ombra a vicenda.',
    colonna: 'Fusto a colonna con coste: accumula acqua nei tessuti ed espone al sole poca superficie, come i cactus.',
    cuscino: 'Forma bassa e compatta: l’aria ferma fra i rametti trattiene calore e umidità.',
    calice: 'Vive vicino alle zone calde: batteri simbionti ricavano energia dai composti dello zolfo (chemiosintesi), come intorno alle sorgenti idrotermali terrestri.',
    crosta: 'Strato sottile di microrganismi e licheni che trattiene il suolo e l’acqua, come le croste biologiche dei deserti terrestri.',
    pascolatore: 'Bruca le piante e vive in branchi: in gruppo il rischio di essere predato si divide fra molti individui.',
    esapode: 'Sei zampe: ne tiene sempre tre a terra, in un treppiede stabile, come gli insetti.',
    volatore: 'Ali ampie. La portanza di un’ala è proporzionale alla densità dell’aria: in un’atmosfera densa come questa il volo costa meno energia.',
    medusa: 'Galleggia con una camera di gas e una vela, e si lascia spingere dal vento come la caravella portoghese terrestre.',
    arbusto: 'Arbusto con molti fusti legnosi bassi: se un fusto secca o viene brucato, gli altri continuano a crescere.',
    canneto: 'Canne cave e flessibili lungo le rive: le radici trattengono il fango e i fusti piegati dal vento si raddrizzano.',
    fungo: 'Il micelio, una rete di filamenti sottili nel suolo, scompone foglie e resti animali e restituisce al terreno azoto e fosforo.',
    saltatore: 'Si sposta a balzi sulle zampe posteriori: i tendini elastici restituiscono a ogni salto parte dell’energia, come nei canguri.',
    cacciatore: 'Quattro zampe e occhi rivolti in avanti: la visione binoculare permette di stimare la distanza della preda, come nei felini terrestri.',
    bipede: 'Corre su due zampe e tiene la coda tesa all’indietro come contrappeso, secondo lo schema dei teropodi terrestri.',
    ottopode: 'Otto zampe sottili e un corpo piccolo: tende agguati fra le rocce della riva, come molti ragni terrestri.'
};
/** Traits of the shapes that change within a form (1.63.0): the crown of trees, the legs of crawlers. */
const CROWN = {
    ombrello: ['albero a ombrello', FORM_TRAIT.albero],
    cono: ['albero a cono', 'Chioma a cono, come quella degli abeti: la neve scivola lungo i rami e la luce radente raggiunge anche i rami bassi.'],
    sfere: ['albero a chioma divisa', 'Chioma divisa in ciuffi tondi su rami brevi: ogni ciuffo riceve luce da più lati.'],
    salice: ['albero a rami pendenti', 'Rami sottili e pendenti, come quelli del salice piangente: si piegano al vento senza spezzarsi.'],
    palma: ['albero a palma', 'Fusto senza rami con un ciuffo di grandi foglie in cima, come le palme: la pianta cresce da un’unica gemma all’apice.']
};
const CRAWL = {
    false: 'Corpo allungato senza zampe: avanza con onde laterali che spingono contro le irregolarità del suolo, come i serpenti.',
    true: 'Corpo lungo a segmenti con molte zampe corte, come i millepiedi: il peso si distribuisce su molti punti d’appoggio.'
};
const formTrait = (form, plan) => form === 'albero' ? CROWN[plan.crown][1] : form === 'serpentino' ? CRAWL[plan.legs] : FORM_TRAIT[form];
function gravityTrait(form, kind, g) {
    const v = comma(g);
    if (form === 'crosta') return null;
    if (kind === 'fungus') return g < .9 ? `Gravità di ${v} g: il gambo regge facilmente il cappello e il fungo cresce più alto.` : g > 1.1 ? `Gravità di ${v} g: gambo corto e grosso, cappello basso.` : `Gravità di ${v} g, vicina a quella terrestre: proporzioni simili a quelle dei funghi della Terra.`;
    if (form === 'serpentino' && g > 1.1) return `Gravità di ${v} g: il corpo resta aderente al suolo e avanza con onde basse.`;
    if (form === 'serpentino' && g < .9) return `Gravità di ${v} g: il corpo è leggero e può sollevare la parte anteriore per guardarsi intorno.`;
    if (form === 'medusa') return `Gravità di ${v} g: per chi galleggia conta poco, perché anche la spinta di Archimede cresce con la gravità.`;
    if (form === 'volatore') return g < .9 ? `Gravità di ${v} g: il peso da sostenere in volo è minore e bastano ali più strette.` : g > 1.1 ? `Gravità di ${v} g: il peso da sostenere in volo è maggiore e servono ali più ampie e muscoli più forti.` : `Gravità di ${v} g, vicina a quella terrestre.`;
    if (form === 'cuscino' && g < .9) return `Gravità di ${v} g: i rametti crescono più lunghi e il cuscino è più alto.`;
    if (g < .9) return kind === 'plant' ? `Gravità di ${v} g: il fusto regge più facilmente il proprio peso e la pianta cresce più alta.` : `Gravità di ${v} g: corpo slanciato e zampe sottili.`;
    if (g > 1.1) return kind === 'plant' ? `Gravità di ${v} g: forma bassa e robusta, che sostiene meglio il proprio peso.` : `Gravità di ${v} g: zampe corte e grosse. Se un animale raddoppia le dimensioni, la massa cresce di otto volte e la sezione delle ossa solo di quattro.`;
    return `Gravità di ${v} g, vicina a quella terrestre: proporzioni simili a quelle di una forma analoga sulla Terra.`;
}
function climateTrait(kind, g) {
    if (g.family === 'arctic') return 'Freddo intenso: zuccheri e proteine antigelo nei tessuti impediscono la formazione di cristalli di ghiaccio.';
    if (g.atmosphere.density < .3) return kind !== 'animal' ? 'Atmosfera sottile: alla bassa pressione l’acqua evapora in fretta e un rivestimento spesso la trattiene.' : 'Atmosfera sottile: un guscio spesso limita la perdita d’acqua.';
    return null;
}

/** Species list of one genome. `names` is the set of genera already used, so names stay unique. */
export function speciesOf(g, names = new Set()) {
    const r = seededRandom(g.terrain.seed ^ 0x5BEC1E5), pool = POOLS[g.family], d = g.atmosphere.density, sea = g.terrain.seaLevel;
    let nPlants = 0, nAnimals = 0;
    if (g.family === 'terrestrial') { nPlants = 3; nAnimals = 2 + (r() < .6); }
    else if (g.family === 'oceanic') { nPlants = 2 + (r() < .6); nAnimals = 2 + (r() < .5); }
    else if (g.family === 'volcanic') { nPlants = 2; nAnimals = 1 + (d > .75); }
    else if (g.family === 'arctic') { nPlants = 1 + (d > .3); nAnimals = (d >= .3) + (sea >= .35); }
    else if (g.family === 'desert') { nPlants = d < .1 ? 1 : 1 + (d > .2); nAnimals = d >= .2 ? 1 : 0; }
    const allowed = f => (f !== 'volatore' || d >= FLIGHT_DENSITY) && (f !== 'medusa' || sea >= FLOAT_SEA) && (f !== 'esapode' || g.family !== 'arctic' || d >= .3);
    const plants = (g.family === 'desert' && d < .1 ? ['crosta'] : shuffled(pool.plants, r)).filter(allowed).slice(0, nPlants);
    const animals = shuffled(pool.animals, r).filter(allowed).slice(0, nAnimals);
    return [...plants, ...animals].map((form, k) => {
        const F = FORMS[form], kind = F.kind, habitat = F.habitat === 'riva' && sea < .15 ? 'pianura' : F.habitat;
        // Plants take the card pigment, shifted per species; animals blend ground and pigment colours.
        const color = kind === 'plant' ? shiftHue(g.palette.pigment, (r() - .5) * 46).map(v => Math.min(1, v * (form === 'crosta' ? .8 : 1.15)))
            : form === 'medusa' ? mix(g.palette.water, [.92, .95, 1], .6)
            : form === 'volatore' ? shiftHue(mix(g.palette.pigment, [.95, .9, .8], .45), 150 + r() * 60)
            : shiftHue(mix(g.palette.rock, [.85, .8, .72], .35 + r() * .25), (r() - .5) * 40);
        const epithet = kind === 'plant' && r() < .65 ? colourEpithet(color) : g.family === 'arctic' ? 'glacialis' : g.gravity < .85 && r() < .5 ? 'levis' : g.gravity > 1.15 && r() < .5 ? 'gravis' : PLACE_EPITHETS[habitat];
        // Genera are unique over the galaxy: two planets never share a lineage.
        let genus = '';
        for (let t = 0; t < 80 && (!genus || names.has(genus)); t++) {
            const middle = SYLLABLES[Math.floor(r() * SYLLABLES.length)] + (t > 20 ? SYLLABLES[Math.floor(r() * SYLLABLES.length)] : '');
            genus = ROOTS[form] + middle + ENDINGS[Math.floor(r() * ENDINGS.length)];
        }
        names.add(genus);
        const name = genus + ' ' + epithet;
        // Taller and slimmer under low gravity, lower and sturdier under high gravity.
        const size = +(F.size * Math.pow(1 / g.gravity, kind === 'plant' ? .6 : .35)).toFixed(3);
        const traits = [FORM_TRAIT[form], kind === 'plant' && form !== 'calice' && form !== 'crosta' ? PIGMENT_TRAIT[g.star.type] : null, gravityTrait(form, kind, g.gravity), climateTrait(kind, g)].filter(Boolean).slice(0, 4);
        const count = Math.round(F.count[0] + (F.count[1] - F.count[0]) * r() * (kind === 'plant' ? Math.min(1, .45 + d) : 1));
        return { id: 's' + k, form, kind, mesh: F.mesh, label: F.label, habitat, habitatName: HABITATS[habitat], name, color: color.map(v => +v.toFixed(3)), size, count, traits };
    });
}
/** Why a planet has no species, for the diary. */
export function lifelessReason(g) {
    return g.atmosphere.density < .1 ? 'Nessuna specie in superficie: senza un’atmosfera apprezzabile l’acqua liquida non resta stabile e la radiazione della stella arriva al suolo senza filtro.' : 'Nessuna specie in superficie.';
}

/** Roles in the food web (1.63.0) and their trophic level: producers 1, consumers of producers 2, predators 3.
 * Decomposers feed on the remains of every level and are given level 0. */
export const ROLES = Object.freeze({ produttore: 1, erbivoro: 2, filtratore: 2, predatore: 3, decompositore: 0 });
/** Species of a planet from 1.63.0 on: about RICHNESS species on the planets with air and water, fewer on
 * cold and dry planets with thin air; the forms are drawn from EXTRA_POOLS, where a form listed twice is
 * drawn twice as often. */
export const RICHNESS = Object.freeze({ terrestrial: 22, oceanic: 20, volcanic: 14, arctic: 10, desert: 8, barren: 0 });
const EXTRA_POOLS = {
    terrestrial: { plants: ['albero', 'albero', 'arbusto', 'arbusto', 'felce', 'ciuffo', 'ciuffo', 'cuscino', 'canneto', 'fungo', 'fungo'], animals: ['pascolatore', 'pascolatore', 'saltatore', 'esapode', 'esapode', 'serpentino', 'volatore', 'volatore', 'cacciatore', 'bipede', 'ottopode'] },
    oceanic: { plants: ['albero', 'albero', 'felce', 'ciuffo', 'arbusto', 'canneto', 'canneto', 'fungo', 'crosta'], animals: ['medusa', 'medusa', 'volatore', 'volatore', 'esapode', 'ottopode', 'ottopode', 'serpentino', 'saltatore', 'cacciatore'] },
    volcanic: { plants: ['calice', 'calice', 'ciuffo', 'felce', 'fungo', 'crosta', 'arbusto'], animals: ['esapode', 'esapode', 'serpentino', 'volatore', 'ottopode', 'bipede'] },
    arctic: { plants: ['cuscino', 'cuscino', 'crosta', 'ciuffo', 'fungo', 'arbusto'], animals: ['esapode', 'medusa', 'saltatore', 'serpentino', 'cacciatore'] },
    desert: { plants: ['colonna', 'colonna', 'crosta', 'cuscino', 'arbusto', 'fungo'], animals: ['esapode', 'serpentino', 'saltatore', 'ottopode'] }
};
const HABITAT_CHOICES = {
    ciuffo: ['pianura', 'altura', 'riva'], felce: ['riva', 'altura', 'ovunque'], albero: ['altura', 'pianura', 'riva'], arbusto: ['altura', 'pianura', 'ovunque'], colonna: ['pianura', 'altura'],
    cuscino: ['ovunque', 'altura'], calice: ['sfiati'], crosta: ['pianura', 'altura', 'ovunque'], fungo: ['ovunque', 'riva', 'altura'], canneto: ['riva'],
    pascolatore: ['pianura', 'altura'], saltatore: ['pianura', 'ovunque'], esapode: ['ovunque', 'pianura', 'altura'], serpentino: ['ovunque', 'riva'], volatore: ['altura', 'riva'], medusa: ['mare'],
    cacciatore: ['pianura', 'altura'], bipede: ['ovunque', 'pianura'], ottopode: ['riva', 'altura']
};
const ROLE_CHOICES = { pascolatore: ['erbivoro'], saltatore: ['erbivoro'], esapode: ['erbivoro', 'erbivoro', 'predatore'], serpentino: ['predatore', 'erbivoro'], volatore: ['erbivoro', 'predatore'], medusa: ['filtratore'], cacciatore: ['predatore'], bipede: ['predatore'], ottopode: ['predatore'] };
/** Large animals need air dense enough to breathe and to carry heat away; shore reeds need a sea. */
const LARGE = new Set(['pascolatore', 'cacciatore', 'bipede']);
const allowedExtra = (f, g) => (FORMS[f].kind !== 'animal' || g.atmosphere.density >= .2) && (!LARGE.has(f) || g.atmosphere.density >= .35) && (f !== 'volatore' || g.atmosphere.density >= FLIGHT_DENSITY) && (f !== 'medusa' || g.terrain.seaLevel >= FLOAT_SEA) && (f !== 'canneto' || g.terrain.seaLevel >= .15);
const roleOf = (form, kind) => kind === 'fungus' ? 'decompositore' : kind === 'plant' ? 'produttore' : form === 'medusa' ? 'filtratore' : 'erbivoro';
const consumer = sp => sp.role === 'erbivoro' || sp.role === 'filtratore';
const names = list => list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' e ' + list.at(-1);

/** Species added to a planet in 1.63.0, after the `legacy` ones of speciesOf, with their own random source,
 * so the species of the earlier versions keep names, colours and numbers. */
export function extraSpecies(g, legacy, used = new Set()) {
    const r = seededRandom(g.terrain.seed ^ 0xB10DE), d = g.atmosphere.density, sea = g.terrain.seaLevel, pool = EXTRA_POOLS[g.family];
    if (!pool || !legacy.length || d < .1) return [];
    const thin = g.family === 'arctic' || g.family === 'desert' ? Math.min(1.2, Math.max(.45, d / .35)) : 1;
    const target = Math.min(24, Math.max(legacy.length, Math.round(RICHNESS[g.family] * thin) + Math.floor(r() * 3) - 1));
    const animals = d < .2 ? 0 : Math.round(target * (thin < 1 || g.family === 'arctic' || g.family === 'desert' ? .35 : .42));
    const had = legacy.filter(sp => sp.kind === 'animal').length, plants = Math.max(0, target - animals - (legacy.length - had)), more = Math.max(0, animals - had);
    const draw = list => { const ok = list.filter(f => allowedExtra(f, g)); return ok.length ? ok[Math.floor(r() * ok.length)] : null; };
    const picks = [];
    for (let k = 0; k < plants; k++) { const f = draw(pool.plants); if (f) picks.push({ form: f, role: roleOf(f, FORMS[f].kind) }); }
    for (let k = 0; k < more; k++) { const f = draw(pool.animals); if (f) { const c = ROLE_CHOICES[f]; picks.push({ form: f, role: c[Math.floor(r() * c.length)] }); } }
    // Predators are a fraction of the consumers: about one predator species every two and a half.
    const eaters = legacy.filter(sp => sp.kind === 'animal').length + picks.filter(p => p.role === 'erbivoro' || p.role === 'filtratore').length, quota = Math.floor(eaters / 2.5);
    let hunters = 0;
    const kept = picks.filter(p => { if (p.role !== 'predatore') return true; if (hunters < quota) { hunters++; return true; } if (ROLE_CHOICES[p.form].includes('erbivoro')) { p.role = 'erbivoro'; return true; } return false; });
    return kept.map(({ form, role }, j) => {
        const F = FORMS[form], kind = F.kind, choices = HABITAT_CHOICES[form];
        let habitat = choices[Math.floor(r() * choices.length)];
        if (habitat === 'riva' && sea < .15) habitat = form === 'ottopode' ? 'altura' : 'pianura';
        const color = kind === 'plant' ? shiftHue(g.palette.pigment, (r() - .5) * 60).map(v => Math.min(1, v * (form === 'crosta' ? .8 : form === 'canneto' ? .95 : 1.15)))
            : kind === 'fungus' ? shiftHue(mix(g.palette.rock, [.92, .86, .74], .5 + r() * .3), (r() - .5) * 80)
            : form === 'medusa' ? mix(g.palette.water, [.92, .95, 1], .5 + r() * .2)
            : form === 'volatore' ? shiftHue(mix(g.palette.pigment, [.95, .9, .8], .45), 150 + r() * 60)
            : role === 'predatore' ? shiftHue(mix(g.palette.rock, [.7, .6, .5], .25 + r() * .2), (r() - .5) * 60).map(v => v * .85)
            : shiftHue(mix(g.palette.rock, [.85, .8, .72], .35 + r() * .25), (r() - .5) * 50);
        const epithet = kind !== 'animal' && r() < .5 ? colourEpithet(color) : role === 'predatore' && r() < .4 ? 'ferox' : g.family === 'arctic' ? 'glacialis' : g.gravity < .85 && r() < .5 ? 'levis' : g.gravity > 1.15 && r() < .5 ? 'gravis' : PLACE_EPITHETS[habitat];
        let genus = '';
        for (let t = 0; t < 80 && (!genus || used.has(genus)); t++) {
            const middle = SYLLABLES[Math.floor(r() * SYLLABLES.length)] + (t > 20 ? SYLLABLES[Math.floor(r() * SYLLABLES.length)] : '');
            genus = ROOTS[form] + middle + ENDINGS[Math.floor(r() * ENDINGS.length)];
        }
        used.add(genus);
        const size = +(F.size * Math.pow(1 / g.gravity, kind === 'animal' ? .35 : .6)).toFixed(3);
        // Predators of forms that also graze (hexapods, crawlers, flyers) are half as many as the grazers of the form.
        const drawn = F.count[0] + (F.count[1] - F.count[0]) * r(), count = kind !== 'animal' ? Math.round(drawn * 2.4 * Math.min(1, .45 + d)) : role === 'predatore' && ROLE_CHOICES[form].length > 1 ? Math.max(2, Math.round(drawn * .5)) : Math.round(drawn);
        // The first trait, that of the form, is written with the body plan (foodWeb).
        const traits = [null, kind === 'plant' && form !== 'calice' && form !== 'crosta' ? PIGMENT_TRAIT[g.star.type] : null, gravityTrait(form, kind, g.gravity), climateTrait(kind, g)];
        return { id: 's' + (legacy.length + j), form, kind, mesh: F.mesh, label: F.label, habitat, habitatName: HABITATS[habitat], name: genus + ' ' + epithet, color: color.map(v => +v.toFixed(3)), size, count, traits, role, reach: 100 };
    });
}
/** Body plan, role, trophic level and diet of every species of a planet (1.63.0). Diets join species of the
 * same planet: consumers eat producers, preferably of their own habitat; predators eat consumers. */
function foodWeb(g, list) {
    const r = seededRandom(g.terrain.seed ^ 0xF00D5), producers = list.filter(sp => sp.kind === 'plant');
    list.forEach((sp, k) => {
        sp.role ||= roleOf(sp.form, sp.kind); sp.reach ||= 78; sp.level = ROLES[sp.role];
        sp.plan = bodyPlan(sp.form, seededRandom((g.terrain.seed ^ 0xB0D7) + Math.imul(k + 1, 0x9E3779B1)), g);
        if (sp.form === 'albero') sp.label = CROWN[sp.plan.crown][0];
    });
    for (const sp of list) {
        let menu = [];
        if (sp.role === 'erbivoro') { const near = producers.filter(p => p.habitat === sp.habitat || p.habitat === 'ovunque' || sp.habitat === 'ovunque'); menu = near.length ? near : producers; }
        else if (sp.role === 'predatore') { const prey = list.filter(consumer), near = sp.form === 'ottopode' ? prey.filter(p => ['riva', 'mare', 'ovunque', 'bassofondo'].includes(p.habitat)) : prey; menu = near.length ? near : prey; }
        sp.diet = shuffled(menu, r).slice(0, Math.min(menu.length, 1 + Math.floor(r() * 3))).map(p => p.id);
        const meal = names(sp.diet.map(id => list.find(p => p.id === id).name));
        const role = sp.role === 'erbivoro' ? `Erbivoro: si nutre di ${meal}.` : sp.role === 'predatore' ? `Predatore: caccia ${meal}.`
            : sp.role === 'filtratore' ? 'Filtratore: trattiene con i tentacoli il plancton, cioè alghe e animali microscopici sospesi nell’acqua.'
            : sp.role === 'decompositore' ? 'Decompositore: si nutre dei resti di piante e animali e ne restituisce i nutrienti al suolo.' : null;
        sp.traits = [formTrait(sp.form, sp.plan), role, ...sp.traits.slice(1)].filter(Boolean).slice(0, 5);
    }
    return list;
}
/** Species of all the planets, in planet order; genera are unique over the whole galaxy. The species of the
 * versions before 1.63.0 are made first for every planet, so their genera do not change. */
export function allSpecies(genomes) {
    const used = new Set(), base = genomes.map(g => speciesOf(g, used));
    return base.map((list, i) => foodWeb(genomes[i], [...list, ...extraSpecies(genomes[i], list, used)]));
}

/** Individuals of each species on a generated surface (src/worlds/surface.js), in clusters that fit the
 * habitat and stay clear of the stations. Returns, per species, instances (x, y, z, scale, colour, heading)
 * and the centre of the first cluster, used to bring the camera there. */
export function populate(s, species) {
    const g = s.genome, r = seededRandom(g.terrain.seed ^ 0x9091A7E), sea = s.seaY, land = [];
    for (let z = -70; z <= 70; z += 3) for (let x = -70; x <= 70; x += 3) { const y = s.heightAt(x, z); if (sea === null || y > sea + .3) land.push(y); }
    land.sort((a, b) => a - b);
    const q = p => land.length ? land[Math.min(land.length - 1, Math.floor(p * land.length))] : 0;
    const q35 = q(.35), q65 = q(.65), q70 = q(.7);
    const near = (x, z, d) => s.stations.some(st => Math.hypot(st.position[0] - x, st.position[2] - z) < d);
    const slope = (x, z) => Math.hypot(s.heightAt(x + 1, z) - s.heightAt(x - 1, z), s.heightAt(x, z + 1) - s.heightAt(x, z - 1)) / 2;
    const hot = (x, z) => s.lavaAt ? s.lavaAt(x, z) > .2 : s.heightAt(x, z) > q70;
    const fits = (habitat, x, z, reach = 78) => {
        if (Math.abs(x) > reach || Math.abs(z) > reach || near(x, z, 7)) return false;
        const y = s.heightAt(x, z), wet = sea !== null && y <= sea + .3;
        if (habitat === 'mare') return sea !== null && y < sea - .8;
        if (habitat === 'bassofondo') return sea !== null && y < sea - .1;
        if (wet || slope(x, z) > .85) return false;
        if (habitat === 'riva') return sea !== null && y < sea + 2.4;
        if (habitat === 'pianura') return y < q65;
        if (habitat === 'altura') return y > q35;
        if (habitat === 'sfiati') return hot(x, z);
        return true;
    };
    const centres = [], relaxed = h => h === 'mare' ? 'bassofondo' : 'ovunque';
    return species.map((sp, k) => {
        // The species added in 1.63.0 (reach 100) spread over more and wider clusters; the earlier ones keep
        // the same draws, so their individuals stay where they were.
        const animal = sp.kind === 'animal', wider = (sp.reach || 78) > 78, u = r(), clusters = animal ? 1 + Math.floor(u * 2) : wider ? 4 + Math.floor(u * 4) : 3 + Math.floor(u * 3);
        const spread = animal ? (wider ? 8 : 6) : wider ? 16 : 13, side = wider ? 190 : 150, items = [], found = [];
        let reach = sp.reach || 78;
        // Cluster centres: the first one is preferably inside the default view.
        for (let t = 0; t < 400 && found.length < clusters; t++) {
            const wide = t > 120 || found.length > 0, x = (r() - .5) * (wide ? side : 80), z = (r() - .5) * (wide ? side : 80);
            if (!fits(sp.habitat, x, z, reach) || centres.some(c => Math.hypot(c[0] - x, c[2] - z) < 9)) continue;
            found.push([x, 0, z]);
        }
        if (!found.length) for (let t = 0; t < 600 && !found.length; t++) { const x = (r() - .5) * side, z = (r() - .5) * side; if (fits(relaxed(sp.habitat), x, z, reach)) found.push([x, 0, z]); }
        // Since 1.62.0 the landing site may leave the sea beyond the area: sea species then live in the nearest
        // sea, up to 150 and then 400 units away.
        for (const far of [150, 400]) if (!found.length && sp.habitat === 'mare') for (let t = 0; t < 600 && !found.length; t++) { const x = (r() - .5) * 2 * far, z = (r() - .5) * 2 * far; if (fits('mare', x, z, far)) { found.push([x, 0, z]); reach = far; } }
        for (const c of found) { c[1] = sp.habitat === 'mare' ? sea : s.heightAt(c[0], c[2]); centres.push(c); }
        for (let t = 0; t < sp.count * 12 && items.length < sp.count && found.length; t++) {
            const c = found[t % found.length], a = r() * Math.PI * 2, d = Math.sqrt(r()) * spread, x = c[0] + Math.cos(a) * d, z = c[2] + Math.sin(a) * d;
            if (!fits(sp.habitat, x, z, reach) && !(t > sp.count * 8 && fits(relaxed(sp.habitat), x, z, reach))) continue;
            const ground = s.heightAt(x, z), y = sp.form === 'medusa' ? sea + .05 : sp.form === 'volatore' ? ground + 9 + r() * 6 : ground - .05, k2 = .78 + r() * .44;
            const tone = .86 + r() * .28;
            items.push({ x, y, z, s: sp.size * k2, r: Math.min(1, sp.color[0] * tone), g: Math.min(1, sp.color[1] * tone), b: Math.min(1, sp.color[2] * tone), h: r() * 6.283 });
        }
        // A species of 1.63.0 whose clusters fell on a strip too narrow (a coast of a small island) moves to the
        // relaxed habitat anywhere in its area.
        if (wider && !items.length && sp.form !== 'medusa') {
            found.length = 0;
            for (let t = 0; t < 600 && found.length < 3; t++) { const x = (r() - .5) * side, z = (r() - .5) * side; if (fits(relaxed(sp.habitat), x, z, reach)) found.push([x, s.heightAt(x, z), z]); }
            for (let t = 0; t < sp.count * 12 && items.length < sp.count && found.length; t++) {
                const c = found[t % found.length], a = r() * Math.PI * 2, d = Math.sqrt(r()) * spread, x = c[0] + Math.cos(a) * d, z = c[2] + Math.sin(a) * d;
                if (!fits(relaxed(sp.habitat), x, z, reach)) continue;
                const ground = s.heightAt(x, z), tone = .86 + r() * .28;
                items.push({ x, y: sp.form === 'volatore' ? ground + 9 + r() * 6 : ground - .05, z, s: sp.size * (.78 + r() * .44), r: Math.min(1, sp.color[0] * tone), g: Math.min(1, sp.color[1] * tone), b: Math.min(1, sp.color[2] * tone), h: r() * 6.283 });
            }
        }
        return { species: sp, instances: items, centre: items.length ? found[0] || null : null, index: k };
    });
}
