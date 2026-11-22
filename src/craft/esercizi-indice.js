/** The four sets of exercises drawn from the systems of the galaxy (1.52.0-1.55.0), in one index (1.56.0): what
 * each set covers, which units it serves, where it opens and which exercises it can contain. The teacher's
 * guide (docs/GUIDA_DOCENTE.md), the generated examples (docs/ESERCIZI_SISTEMI.md) and the tests of the series
 * read this index. */
import { exercises, EXERCISE_UNITS } from './esercizi.js';
import { CHAIN_UNITS, CHAIN_STATIONS, chainStation, chainExercises } from './esercizi-catene.js';
import { energyExercises, ENERGY_UNITS } from './esercizi-energia.js';
import { growthExercises, GROWTH_UNITS } from './esercizi-crescita.js';
import { CRAFT_BY_ID } from './registry.js';

/** `make(F, seed)` builds a set from the frontier, except the stations, built from a model of the catalogue. */
export const EXERCISE_SETS = Object.freeze([
    { topic: 'statistica', version: '1.52.0', title: 'Esercizi sul Rapporto', units: EXERCISE_UNITS, card: ['math-c10', 'math-p07'],
      opens: 'nel Rapporto sullo Sciame della Frontiera, pulsante «Esercizi di statistica»',
      ids: ['probabilita', 'onda', 'totale', 'brier', 'scarto'], make: (F, seed) => exercises(F, seed) },
    { topic: 'stazioni', version: '1.53.0', title: 'Esercizi sulle stazioni', units: CHAIN_UNITS, card: CHAIN_UNITS,
      opens: 'nel catalogo 3D, pulsante «Esercizi sulla stazione» di una stazione che trasforma almeno due merci',
      ids: ['limitante', 'eccesso', 'proporzione', 'velocita', 'condizioni'], make: (e, seed, live = null) => chainExercises(chainStation(e, live, seed), seed) },
    { topic: 'energia', version: '1.54.0', title: 'Energia e informazione', units: ENERGY_UNITS, card: ['physics-20'],
      opens: 'nel Rapporto sullo Sciame della Frontiera, pulsante «Energia e informazione»',
      ids: ['landauer', 'freddo', 'carnot', 'entropia', 'sorpresa'], make: (F, seed) => energyExercises(F, seed) },
    { topic: 'crescita', version: '1.55.0', title: 'Crescita e replicazione', units: GROWTH_UNITS, card: GROWTH_UNITS,
      opens: 'nel Rapporto sullo Sciame della Frontiera, pulsante «Crescita e replicazione»',
      ids: ['raddoppio', 'esponenziale', 'logistica', 'resistenza', 'peso'], make: (F, seed) => growthExercises(F, seed) }
]);
/** Units with exercises from the systems, each once. */
export const SYSTEM_UNITS = Object.freeze([...new Set(EXERCISE_SETS.flatMap(s => s.units))]);
/** Stations used by the examples: one that stops when an input is missing and one that slows to half rate. */
export const EXAMPLE_STATIONS = Object.freeze(['s17-11', 's17-3'].map(id => CRAFT_BY_ID.get(id)));
export { CHAIN_STATIONS };
