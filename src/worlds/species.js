/** Species of the explorable planets, derived from the identity card (src/worlds/genome.js).
 * The card decides which forms can live on a planet (family, atmosphere, sea), their colour (star type),
 * their proportions (gravity) and the adaptations described in the exploration diary. These are
 * illustrative hypotheses, inspired by published speculation on life on other worlds, not predictions. */
import { seededRandom } from '../scene/systems.js';

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
    medusa: { kind: 'animal', mesh: 'floater', label: 'medusa galleggiante', size: 1.5, count: [8, 14], habitat: 'mare' }
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

const ROOTS = { ciuffo: 'Grami', felce: 'Pteri', albero: 'Dendro', colonna: 'Stylo', cuscino: 'Pulvi', calice: 'Cyatho', crosta: 'Crusti', pascolatore: 'Pecu', esapode: 'Hexa', volatore: 'Ptero', medusa: 'Medu' };
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
    medusa: 'Galleggia con una camera di gas e una vela, e si lascia spingere dal vento come la caravella portoghese terrestre.'
};
function gravityTrait(form, kind, g) {
    const v = comma(g);
    if (form === 'crosta') return null;
    if (form === 'medusa') return `Gravità di ${v} g: per chi galleggia conta poco, perché anche la spinta di Archimede cresce con la gravità.`;
    if (form === 'volatore') return g < .9 ? `Gravità di ${v} g: il peso da sostenere in volo è minore e bastano ali più strette.` : g > 1.1 ? `Gravità di ${v} g: il peso da sostenere in volo è maggiore e servono ali più ampie e muscoli più forti.` : `Gravità di ${v} g, vicina a quella terrestre.`;
    if (form === 'cuscino' && g < .9) return `Gravità di ${v} g: i rametti crescono più lunghi e il cuscino è più alto.`;
    if (g < .9) return kind === 'plant' ? `Gravità di ${v} g: il fusto regge più facilmente il proprio peso e la pianta cresce più alta.` : `Gravità di ${v} g: corpo slanciato e zampe sottili.`;
    if (g > 1.1) return kind === 'plant' ? `Gravità di ${v} g: forma bassa e robusta, che sostiene meglio il proprio peso.` : `Gravità di ${v} g: zampe corte e grosse. Se un animale raddoppia le dimensioni, la massa cresce di otto volte e la sezione delle ossa solo di quattro.`;
    return `Gravità di ${v} g, vicina a quella terrestre: proporzioni simili a quelle di una forma analoga sulla Terra.`;
}
function climateTrait(kind, g) {
    if (g.family === 'arctic') return 'Freddo intenso: zuccheri e proteine antigelo nei tessuti impediscono la formazione di cristalli di ghiaccio.';
    if (g.atmosphere.density < .3) return kind === 'plant' ? 'Atmosfera sottile: alla bassa pressione l’acqua evapora in fretta e un rivestimento spesso la trattiene.' : 'Atmosfera sottile: un guscio spesso limita la perdita d’acqua.';
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
/** Species of all the planets, in planet order; genera are unique over the whole galaxy. */
export function allSpecies(genomes) { const names = new Set(); return genomes.map(g => speciesOf(g, names)); }

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
        const animal = sp.kind === 'animal', clusters = animal ? 1 + Math.floor(r() * 2) : 3 + Math.floor(r() * 3), spread = animal ? 6 : 13, items = [], found = [];
        // Cluster centres: the first one is preferably inside the default view.
        for (let t = 0; t < 400 && found.length < clusters; t++) {
            const wide = t > 120 || found.length > 0, x = (r() - .5) * (wide ? 150 : 80), z = (r() - .5) * (wide ? 150 : 80);
            if (!fits(sp.habitat, x, z) || centres.some(c => Math.hypot(c[0] - x, c[2] - z) < 9)) continue;
            found.push([x, 0, z]);
        }
        if (!found.length) for (let t = 0; t < 600 && !found.length; t++) { const x = (r() - .5) * 150, z = (r() - .5) * 150; if (fits(relaxed(sp.habitat), x, z)) found.push([x, 0, z]); }
        // Since 1.62.0 the landing site may leave the sea beyond the area: sea species then live in the nearest
        // sea, up to 150 and then 400 units away.
        let reach = 78;
        for (const far of [150, 400]) if (!found.length && sp.habitat === 'mare') for (let t = 0; t < 600 && !found.length; t++) { const x = (r() - .5) * 2 * far, z = (r() - .5) * 2 * far; if (fits('mare', x, z, far)) { found.push([x, 0, z]); reach = far; } }
        for (const c of found) { c[1] = sp.habitat === 'mare' ? sea : s.heightAt(c[0], c[2]); centres.push(c); }
        for (let t = 0; t < sp.count * 12 && items.length < sp.count && found.length; t++) {
            const c = found[t % found.length], a = r() * Math.PI * 2, d = Math.sqrt(r()) * spread, x = c[0] + Math.cos(a) * d, z = c[2] + Math.sin(a) * d;
            if (!fits(sp.habitat, x, z, reach) && !(t > sp.count * 8 && fits(relaxed(sp.habitat), x, z, reach))) continue;
            const ground = s.heightAt(x, z), y = sp.mesh === 'floater' ? sea + .05 : sp.mesh === 'flyer' ? ground + 9 + r() * 6 : ground - .05, k2 = .78 + r() * .44;
            const tone = .86 + r() * .28;
            items.push({ x, y, z, s: sp.size * k2, r: Math.min(1, sp.color[0] * tone), g: Math.min(1, sp.color[1] * tone), b: Math.min(1, sp.color[2] * tone), h: r() * 6.283 });
        }
        return { species: sp, instances: items, centre: found[0] || null, index: k };
    });
}
