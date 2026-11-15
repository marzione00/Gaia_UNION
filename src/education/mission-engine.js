import {SIGNAL_DEFAULTS, validParameters, parameterKey, signalValue, signalTrend, signalError, sampleSignal} from '../models/signal.js';
export const LEVELS = Object.freeze(['base', 'intermediate', 'advanced']);
export const TRENDS = Object.freeze(['increases', 'decreases', 'constant']);
const own = (o, key) => Object.hasOwn(o, key);
const plain = o => !!o && typeof o === 'object' && !Array.isArray(o);
const safeId = s => typeof s === 'string' && /^[a-z][a-z0-9-]{0,79}$/.test(s) && !['constructor', 'prototype'].includes(s);
const iso = s => typeof s === 'string' && s.length <= 40 && Number.isFinite(Date.parse(s));
const params = p => ({model: p.model, a: p.a, b: p.b, h: p.h});
export function freshMission() {
    return {version: 1, stage: 0, level: 'base', parameters: {...SIGNAL_DEFAULTS},
        prediction: null, snapshots: {A: null, B: null}, answers: {}, acknowledgedLimits: false, completedAt: null};
}
export function cleanMission(value) {
    const r = freshMission();
    if (!plain(value) || value.version !== 1) return r;
    if (Number.isInteger(value.stage)) r.stage = Math.max(0, Math.min(5, value.stage));
    if (LEVELS.includes(value.level)) r.level = value.level;
    if (validParameters(value.parameters)) r.parameters = params(value.parameters);
    if (plain(value.prediction) && TRENDS.includes(value.prediction.choice) && value.prediction.key === parameterKey(r.parameters))
        r.prediction = {choice: value.prediction.choice, key: value.prediction.key};
    for (const slot of ['A', 'B']) {
        const s = value.snapshots?.[slot];
        if (plain(s) && validParameters(s.parameters) && TRENDS.includes(s.prediction) && iso(s.capturedAt))
            r.snapshots[slot] = {parameters: params(s.parameters), prediction: s.prediction, capturedAt: s.capturedAt};
    }
    if (plain(value.answers)) for (const [key, answer] of Object.entries(value.answers).slice(0, 50))
        if (safeId(key) && typeof answer === 'string' && /^[A-D]$/.test(answer)) r.answers[key] = answer;
    r.acknowledgedLimits = value.acknowledgedLimits === true;
    if (iso(value.completedAt)) r.completedAt = value.completedAt;
    return r;
}
export function cleanMissionRecords(value) {
    const result = {};
    if (plain(value)) for (const [id, record] of Object.entries(value).slice(0, 100))
        if (safeId(id) && plain(record) && record.version === 1) result[id] = cleanMission(record);
    return result;
}
export function validateMission(definition) {
    if (!plain(definition) || definition.schemaVersion !== 1 || !safeId(definition.id)) throw new TypeError('Missione non valida');
    if (!definition.title || !definition.unitId || definition.experiment?.kind !== 'signal') throw new TypeError('Metadati della missione incompleti');
    if (!Array.isArray(definition.steps) || definition.steps.length !== 6) throw new TypeError('Servono sei fasi didattiche');
    const ids = new Set();
    for (const step of definition.steps) {
        if (!safeId(step.id) || ids.has(step.id) || !step.title) throw new TypeError('Identificativi delle fasi non validi');
        ids.add(step.id);
        for (const level of LEVELS) if (!Array.isArray(step.text?.[level]) || !step.text[level].length ||
            step.text[level].some(p => typeof p !== 'string' || !p.trim())) throw new TypeError('Spiegazione mancante: ' + step.id);
    }
    if (!Array.isArray(definition.questions) || !definition.questions.length) throw new TypeError('Verifica mancante');
    ids.clear();
    for (const q of definition.questions) {
        if (!safeId(q.id) || ids.has(q.id) || !q.prompt || !Array.isArray(q.options) || q.options.length !== 3)
            throw new TypeError('Domanda non valida');
        ids.add(q.id);
        const options = new Set(q.options.map(o => o.id));
        if (options.size !== q.options.length || !options.has(q.correct) || q.options.some(o => !/^[A-D]$/.test(o.id) || !o.text || !o.feedback))
            throw new TypeError('Alternative o feedback non validi');
    }
    return definition;
}
export function changeParameters(record, patch) {
    const next = {...record.parameters, ...patch};
    if (!validParameters(next)) throw new RangeError('Parametri non ammessi');
    const changed = parameterKey(next) !== parameterKey(record.parameters);
    record.parameters = params(next);
    if (changed) record.prediction = null;
}
export function predict(record, choice) {
    if (!TRENDS.includes(choice)) throw new TypeError('Previsione non valida');
    record.prediction = {choice, key: parameterKey(record.parameters)};
}
export function captureExperiment(record, slot, date = new Date().toISOString()) {
    if (!['A', 'B'].includes(slot) || !iso(date)) throw new TypeError('Registrazione non valida');
    if (!record.prediction || record.prediction.key !== parameterKey(record.parameters))
        throw new Error('Formula una previsione per questi parametri prima di registrare.');
    record.snapshots[slot] = {parameters: params(record.parameters), prediction: record.prediction.choice, capturedAt: date};
    record.completedAt = null;
    return experimentReport(record.snapshots[slot]);
}
export function experimentReport(snapshot) {
    const p = snapshot.parameters;
    return {...structuredClone(snapshot), formulaUnit: 'I in unità arbitrarie; t in secondi dello scenario',
        at2: signalValue(p, 2), at4: signalValue(p, 4), observedTrend: signalTrend(p),
        predictionCorrect: snapshot.prediction === signalTrend(p), rmse: signalError(p), trace: sampleSignal(p)};
}
export function answerQuestion(definition, record, id, answer) {
    const q = definition.questions.find(q => q.id === id);
    if (!q?.options.some(o => o.id === answer)) throw new TypeError('Risposta non valida');
    record.answers[id] = answer;
    record.completedAt = null;
    return {correct: answer === q.correct, feedback: q.options.find(o => o.id === answer).feedback};
}
export function progress(definition, record, reflection = '') {
    const a = record.snapshots.A, b = record.snapshots.B;
    const experiment = !!a && !!b && parameterKey(a.parameters) !== parameterKey(b.parameters);
    const correct = definition.questions.filter(q => own(record.answers, q.id) && record.answers[q.id] === q.correct).length;
    const answered = definition.questions.filter(q => own(record.answers, q.id)).length;
    const reflectionRecorded = typeof reflection === 'string' && reflection.trim().length > 0;
    const eligible = experiment && correct === definition.questions.length && reflectionRecorded && record.acknowledgedLimits;
    return {experiment, correct, wrong: answered - correct, unanswered: definition.questions.length - answered,
        total: definition.questions.length, reflectionRecorded, eligible, completed: eligible && !!record.completedAt};
}
export function completeMission(definition, record, reflection, date = new Date().toISOString()) {
    if (!progress(definition, record, reflection).eligible || !iso(date)) throw new Error('Completa esperimenti, verifica, diario e limiti.');
    record.completedAt = date;
}
