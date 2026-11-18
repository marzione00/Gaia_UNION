/** Worlds of synthesis in the Nucleo di Gaia: Venus, Mars and the Archean Earth, the three cases that tie
 * together the physical model of the planets (src/worlds/physics.js) and Lovelock's diagnosis
 * (src/worlds/biosignatures.js). Measured values come from the NASA fact sheets and from the papers in
 * `source`; the model rows are computed here with the grey atmosphere of the site. */
import { CALIBRATION, equilibriumTemperature, surfaceTemperature, opticalDepth, calibratedDepth, S_EARTH } from './physics.js';

/** Age of the Sun (Gyr) in Gough's (1981) formula, as reported by Feulner (2012). */
export const SUN_AGE = 4.57;
/** Luminosity of the Sun `ago` Gyr before today, in units of the present one: L/L0 = 1 / (1 + 2/5 (1 − t/t0)). */
export const youngSun = ago => 1 / (1 + .4 * (1 - (SUN_AGE - ago) / SUN_AGE));
/** The Archean eon, Gyr before today (Catling and Zahnle 2020). */
export const ARCHEAN = Object.freeze({ start: 4, end: 2.5 });
const tau = x => x.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const it = (x, d = 2) => x.toLocaleString('it-IT', { maximumSignificantDigits: Math.max(d, String(Math.round(Math.abs(x))).length) });

/** Model rows of a world: equilibrium temperature, and the grey greenhouse that gives its surface. */
function modelRows(id) {
    if (id === 'archeano') {
        const earth = CALIBRATION.earth, today = calibratedDepth(earth);
        return [ARCHEAN.end, 3.8].map(ago => {
            const l = youngSun(ago), teq = equilibriumTemperature(l, earth.albedo);
            return { ago, luminosity: l, teq, todayTs: surfaceTemperature(teq, today), freezingTau: opticalDepth(teq, 273), todayTau: today };
        });
    }
    const c = CALIBRATION[id === 'venere' ? 'venus' : 'mars'], teq = equilibriumTemperature(c.irradiance / S_EARTH, c.albedo);
    return [{ teq, tau: calibratedDepth(c), ts: c.ts, pressure: c.p, irradiance: c.irradiance, albedo: c.albedo }];
}

/** The three worlds: name, era, measured rows, model text, the reading in Lovelock's terms, related
 * chapters and sources. */
export const SYNTHESIS_WORLDS = Object.freeze([
    {
        id: 'venere', name: 'Venere', era: 'oggi',
        rows: [['Luce del Sole', '2601 W/m², 1,91 volte quella della Terra'], ['Albedo', '0,77'], ['Pressione al suolo', '92 bar'], ['Temperatura media', '737 K'], ['Atmosfera', '96,5% anidride carbonica, 3,5% azoto'], ['Squilibrio chimico', '0,06 J/mol']],
        reading: 'Un effetto serra estremo e un’atmosfera vicina all’equilibrio chimico: lo zolfo con l’anidride carbonica lascia appena 0,06 J/mol. La diagnosi di Lovelock non vede alcuna vita.',
        units: ['biology-23', 'physics-30', 'biology-33'],
        source: 'NASA, Venus Fact Sheet; Krissansen-Totton, Bergsman e Catling 2016'
    },
    {
        id: 'marte', name: 'Marte', era: 'oggi',
        rows: [['Luce del Sole', '586 W/m², 0,43 volte quella della Terra'], ['Albedo', '0,25'], ['Pressione al suolo', '0,00636 bar'], ['Temperatura media', '214 K'], ['Atmosfera', '95,1% anidride carbonica, 2,59% azoto, 1,94% argo, 0,16% ossigeno, 0,06% monossido di carbonio'], ['Squilibrio chimico', '136 J/mol']],
        reading: 'Lo squilibrio supera quello della sola atmosfera terrestre: la luce ultravioletta scinde l’anidride carbonica e lascia monossido di carbonio e ossigeno. È uno squilibrio senza vita, e insegna che conta quali gas coesistono.',
        units: ['biology-26', 'biology-27', 'biology-33'],
        source: 'NASA, Mars Fact Sheet; Krissansen-Totton, Bergsman e Catling 2016'
    },
    {
        id: 'archeano', name: 'Terra dell’Archeano', era: 'da 4 a 2,5 miliardi di anni fa',
        rows: [['Luce del Sole', 'dal 75 all’82% di quella di oggi, fra 3,8 e 2,5 miliardi di anni fa'], ['Ossigeno', 'meno di un milionesimo del livello attuale'], ['Azoto', 'simile a oggi, o forse alcune volte più basso'], ['Anidride carbonica', 'da circa 10 a 2500 volte il livello moderno'], ['Metano', 'da 100 a 10.000 volte il livello moderno'], ['Squilibrio chimico', 'da 5,1 a 234 J/mol, con l’oceano']],
        reading: 'Una biosfera senza ossigeno: anidride carbonica, azoto, metano e acqua liquida restano insieme grazie alla vita che produce metano. È la firma che il Nucleo legge nei pianeti desertici dei sistemi.',
        units: ['biology-16', 'biology-17', 'biology-23'],
        source: 'Gough 1981 in Feulner 2012; Catling e Zahnle 2020; Krissansen-Totton, Olson e Catling 2018'
    }
]);
/** Ids of the worlds, which the save records as visited. */
export const SYNTHESIS_IDS = Object.freeze(SYNTHESIS_WORLDS.map(w => w.id));

/** What the grey model of the site says of a world, in one paragraph. */
export function modelText(id) {
    const m = modelRows(id);
    if (id === 'archeano') {
        const [late, early] = m;
        return `Con l’albedo di oggi, 0,294, la temperatura di equilibrio scende a ${it(early.teq, 3)} K 3,8 miliardi di anni fa e a ${it(late.teq, 3)} K alla fine dell’Archeano. Con l’effetto serra di oggi, profondità ottica ${tau(early.todayTau)}, la superficie starebbe a ${it(early.todayTs, 3)} K nel primo caso, sotto il punto di congelamento: per restare sopra 273 K serviva una profondità ottica di almeno ${tau(early.freezingTau)}, più di oggi. È il paradosso del Sole giovane e debole: secondo Catling e Zahnle (2020) i gas serra dell’Archeano bastavano a compensarlo.`;
    }
    const [v] = m;
    return `Temperatura di equilibrio ${it(v.teq, 3)} K. Per arrivare a ${it(v.ts, 3)} K al suolo il modello grigio del sito richiede una profondità ottica di ${it(v.tau, 3)}: è uno dei due punti su cui il sito tara la curva dell’anidride carbonica.`;
}
export { modelRows };

/** Visited worlds of a loaded save: known ids only. */
export const cleanVisited = list => Array.isArray(list) ? SYNTHESIS_IDS.filter(id => list.includes(id)) : [];
