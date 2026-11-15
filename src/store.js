export const STORE_KEY = 'gaia.beyond-knowledge.v1';
export function fresh() { return { schema: 1, notes: {}, read: [], quiz: {}, bookmarks: [], scenarios: [], preferences: { quality: 1000000, graphics: 'high', motion: true }, updatedAt: null }; }
export function cleanState(value) {
    if (!value || typeof value !== 'object' || value.schema !== 1)
        throw new TypeError('Formato del diario non riconosciuto');
    const o = fresh();
    if (value.notes && typeof value.notes === 'object' && !Array.isArray(value.notes))
        for (const [k, v] of Object.entries(value.notes).slice(0, 300))
            if (typeof v === 'string' && k.length < 120 && !['__proto__', 'constructor', 'prototype'].includes(k))
                o.notes[k] = v.slice(0, 30000);
    o.read = Array.isArray(value.read) ? [...new Set(value.read.filter(x => typeof x === 'string' && x.length < 120))].slice(0, 2000) : [];
    o.bookmarks = Array.isArray(value.bookmarks) ? value.bookmarks.filter(x => typeof x === 'string').slice(0, 200) : [];
    if (value.quiz && typeof value.quiz === 'object')
        for (const [k, v] of Object.entries(value.quiz))
            if (/^08\.\d{2}$/.test(k) && ['A', 'B', 'C', 'D'].includes(v?.answer))
                o.quiz[k] = { answer: v.answer, checked: Boolean(v.checked) };
    o.scenarios = Array.isArray(value.scenarios) ? value.scenarios.filter(x => x && typeof x === 'object' && typeof x.label === 'string').slice(-30) : [];
    // Migrate old point budgets without reducing the galaxy's million stars.
    o.preferences.quality = 1000000;
    o.preferences.graphics = ['high','balanced','low'].includes(value.preferences?.graphics) ? value.preferences.graphics : value.preferences?.quality === 60000 ? 'low' : value.preferences?.quality === 250000 ? 'balanced' : 'high';
    o.preferences.motion = value.preferences?.motion !== false;
    return o;
}
export function openStore(storage) {
    let data = fresh(), persistent = true, message = '';
    try {
        storage = storage || globalThis.localStorage;
        const old = storage.getItem(STORE_KEY);
        if (old)
            data = cleanState(JSON.parse(old));
        storage.setItem(STORE_KEY, JSON.stringify(data));
    }
    catch (e) {
        persistent = false;
        message = 'Salvataggio persistente non disponibile: esporta il diario.';
    }
    return { get data() { return data; }, get persistent() { return persistent; }, get message() { return message; }, save() {
            data.updatedAt = new Date().toISOString();
            try {
                storage.setItem(STORE_KEY, JSON.stringify(data));
                persistent = true;
                return true;
            }
            catch {
                persistent = false;
                message = 'Memoria non disponibile: esporta il diario.';
                return false;
            }
        }, import(value) { data = cleanState(value); this.save(); return data; }, export() { return JSON.stringify(data, null, 2); } };
}
export function grade(questions, answers) {
    let correct = 0, wrong = 0, unanswered = 0;
    for (const q of questions) {
        const v = answers[q.id]?.answer;
        if (!v)
            unanswered++;
        else if (v === q.correctOptionId)
            correct++;
        else
            wrong++;
    }
    return { correct, wrong, unanswered, total: questions.length };
}
