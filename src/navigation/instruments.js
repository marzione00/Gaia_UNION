/** Instruments of the exploration ship. Each one comes from studying one unit and reveals some rows of the
 * planets' physical card (src/worlds/planet-physics.js). The ship always has its base sensors, which give
 * the star and the orbit; the presence of life is seen only by landing. An instrument comes on board when
 * the guided path of its unit is completed or when every section of its chapter has been read (section
 * lists in content/atlas/instruments.json, built by tools/build_instruments.mjs; a unit without a chapter
 * gives its instrument through the guided path only). Instruments never lock content: with the explorer
 * mode off, or before they are on board, the chapters, the paths and the map stay open. */

/** id, name, name with its article, unit that gives it, card rows it reveals (labels of physicsRows), what it
 * measures, and the verb for it when it computes instead of measuring. */
export const INSTRUMENTS = Object.freeze([
    { id: 'radiometro', name: 'radiometro infrarosso', the: 'il radiometro infrarosso', unit: 'physics-30', rows: ['Luce', 'Temperatura'], measures: 'la luce che arriva dalla stella e la radiazione termica del pianeta, da cui le sue temperature' },
    { id: 'computer', name: 'computer di bordo', the: 'il computer di bordo', unit: 'math-c05', rows: ['Zona abitabile'], verb: 'calcola', measures: 'i confini della zona abitabile della stella, risolvendo la disequazione fra il flusso ricevuto e i due flussi limite' },
    { id: 'spettrografo', name: 'spettrografo', the: 'lo spettrografo', unit: 'physics-37', rows: ['Pressione', 'Effetto serra'], measures: 'le righe di assorbimento dell’atmosfera, da cui pressione e opacità ai raggi infrarossi' },
    { id: 'gravimetro', name: 'gravimetro', the: 'il gravimetro', unit: 'physics-12', rows: ['Raggio e massa', 'Gravità'], measures: 'il campo di gravità dall’orbita della nave, da cui massa, gravità e velocità di fuga' },
    { id: 'magnetometro', name: 'magnetometro', the: 'il magnetometro', unit: 'physics-33', rows: ['Magnetosfera'], measures: 'il campo magnetico intorno al pianeta e la presenza di una dinamo interna' },
    { id: 'radar', name: 'radar di profondità', the: 'il radar di profondità', unit: 'physics-34', rows: ['Acqua'], measures: 'gli echi radio della superficie e del sottosuolo, che distinguono acqua liquida, ghiaccio e roccia' },
    { id: 'datazione', name: 'laboratorio di datazione', the: 'il laboratorio di datazione', unit: 'physics-38', rows: ['Vulcanismo'], measures: 'l’età delle rocce con i decadimenti radioattivi, da cui l’attività vulcanica recente' },
    { id: 'biofirme', name: 'analizzatore di biofirme', the: 'l’analizzatore di biofirme', unit: 'biology-33', rows: ['Firma atmosferica'], measures: 'i gas dell’atmosfera che la vita produce o consuma, per la diagnosi di Lovelock con i controlli contro i falsi positivi' }
]);
/** Rows the base sensors always show. */
export const BASE_ROWS = Object.freeze(['Stella', 'Orbita']);
/** Rows shown once the explorer has landed on the planet. */
export const SURFACE_ROWS = Object.freeze(['Vita']);
export const instrumentById = id => INSTRUMENTS.find(i => i.id === id) || null;
/** Instrument that reveals the card row `label`, or null for the base sensors. */
export const instrumentForRow = label => INSTRUMENTS.find(i => i.rows.includes(label)) || null;

/** Section lists of the loaded file, by instrument id; an unexpected file gives none. */
export function cleanInstrumentSections(file) {
    const out = {};
    if (file?.schemaVersion !== 1 || !Array.isArray(file.instruments)) return out;
    for (const e of file.instruments) if (instrumentById(e?.id) && Array.isArray(e.sections) && e.sections.every(s => typeof s === 'string')) out[e.id] = e.sections;
    return out;
}
/** How the instrument came on board, or null: 'percorso' (guided path completed) or 'capitolo' (all sections read). */
export function obtainedBy(instrument, data, sections = {}) {
    const record = data.courses?.[instrument.unit];
    if (record?.completedAt && record?.completionSignature) return 'percorso';
    const list = sections[instrument.id] || [], read = new Set(data.read || []);
    return list.length && list.every(s => read.has('libro:' + instrument.unit + '#' + s)) ? 'capitolo' : null;
}
/** Ids of the instruments on board. */
export const onBoard = (data, sections) => new Set(INSTRUMENTS.filter(i => obtainedBy(i, data, sections)).map(i => i.id));
/** Sections of the chapter still to read for an instrument, and their total. */
export function sectionsLeft(instrument, data, sections = {}) {
    const list = sections[instrument.id] || [], read = new Set(data.read || []);
    return { left: list.filter(s => !read.has('libro:' + instrument.unit + '#' + s)).length, total: list.length };
}
/** Whether the physical card is revealed by the instruments (explorer mode, the default) or shown whole. */
export const explorerMode = data => data.preferences?.explorer !== false;
