import { MODEL_IDS } from '../models/curriculum.js';
/** Load the curriculum using a compact fallback if the large bundle is temporarily unavailable on Pages. */
export async function loadCurriculum(getJson, { onFallback } = {}) {
    if (typeof getJson !== 'function')
        throw new TypeError('È richiesta una funzione per caricare i JSON didattici.');
    try {
        return await getJson('content/curriculum/bundle.json');
    }
    catch (primaryError) {
        if (typeof onFallback === 'function') onFallback(primaryError);
        const [index, provenance, learning] = await Promise.all([
            getJson('content/curriculum/index.json'),
            getJson('content/curriculum/sources.json'),
            getJson('content/curriculum/paths.json')
        ]);
        if (index.schemaVersion !== 1 || !Array.isArray(index.courses) || index.courses.length !== MODEL_IDS.length ||
            !Array.isArray(provenance.sources) || !Array.isArray(learning.paths))
            throw new Error('Impossibile ricostruire il curriculum dai moduli separati.');
        const courses = await Promise.all(index.courses.map(({ path }) => {
            if (typeof path !== 'string' || !/^content\/curriculum\/[a-z0-9-]+\.json$/.test(path))
                throw new Error('Percorso di un modulo non valido.');
            return getJson(path);
        }));
        return { schemaVersion: 1, version: index.version, note: provenance.note,
            sources: provenance.sources, courses, paths: learning.paths };
    }
}
