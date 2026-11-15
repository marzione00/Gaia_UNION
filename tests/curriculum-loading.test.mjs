import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadCurriculum } from '../src/education/curriculum-loader.js';
import { fetchJsonWithRetry } from '../src/education/resource-loader.js';

const readJson = file => JSON.parse(readFileSync(new URL('../' + file, import.meta.url), 'utf8'));

test('Curriculum: il bundle principale viene utilizzato quando disponibile', async () => {
    const bundle = readJson('content/curriculum/bundle.json');
    const paths = [];
    const received = await loadCurriculum(async p => { paths.push(p); return bundle; });
    assert.deepEqual(received, bundle);
    assert.deepEqual(paths, ['content/curriculum/bundle.json']);
});

test('Curriculum: fallback con 100 moduli conserva esattamente gli stessi dati', async () => {
    const loaded = [];
    const result = await loadCurriculum(async p => {
        loaded.push(p);
        if (p === 'content/curriculum/bundle.json') throw Error('HTTP 404 memorizzato');
        return readJson(p);
    });
    assert.equal(loaded.length, 104);
    assert.equal(result.courses.length, 100);
    assert.deepEqual(result, readJson('content/curriculum/bundle.json'));
});

test('Curriculum: fallback segnala un registro incompleto', async () => {
    const index = readJson('content/curriculum/index.json');
    await assert.rejects(loadCurriculum(async p => {
        if (p.includes('bundle.json')) throw Error('HTTP 404');
        if (p.includes('index.json')) return { ...index, courses: index.courses.slice(1) };
        return readJson(p);
    }), /Impossibile ricostruire/);
});

test('Risorse: dopo un HTTP 404 il retry usa cache-busting e no-store', async () => {
    const calls = [];
    const result = await fetchJsonWithRetry('content/curriculum/bundle.json', {
        request: async (url, options) => {
            calls.push([url, options.cache]);
            return calls.length === 1 ? { ok: false, status: 404 } : { ok: true, json: async () => ({ ok: 1 }) };
        }, sleep: async () => {}, nonce: () => 123
    });
    assert.deepEqual(result, { ok: 1 });
    assert.deepEqual(calls, [['content/curriculum/bundle.json', 'no-store'], ['content/curriculum/bundle.json?gaia_retry=123-1','no-store']]);
});

test('Risorse: un errore persistente include il percorso e lo stato HTTP', async () => {
    await assert.rejects(fetchJsonWithRetry('content/a.json', {
        request: async () => ({ ok: false, status: 404 }), sleep: async () => {}, nonce: () => 123
    }), /Risorsa mancante: content\/a.json \(HTTP 404\)/);
});
