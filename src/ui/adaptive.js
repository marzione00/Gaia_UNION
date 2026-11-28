/** Graphics that adapt to the device (1.77.0). Until the reader chooses a setting, a phone starts with the
 * balanced graphics, and any device steps down one setting when the frames stay slow: the mean time of the
 * frames over WINDOW milliseconds above SLOW milliseconds, under about 30 frames a second. Frames longer than
 * SKIP milliseconds (the building of a surface, a tab in the background) and the first SETTLE milliseconds of
 * every scene do not count. After a step the measure starts again. */
export const WINDOW = 3000, SLOW = 34, SKIP = 250, SETTLE = 2000;
export const ORDER = Object.freeze(['high', 'balanced', 'low']);
export const NAMES = Object.freeze({ high: 'Dettaglio alto', balanced: 'Bilanciato', low: 'Leggero' });
/** The setting to start with: the one chosen, or the balanced one on a phone (a coarse pointer and a screen
 * whose short side is under 600 CSS pixels). */
export function startGraphics(chosen, set, coarse, shortSide) { return set ? chosen : coarse && shortSide < 600 ? 'balanced' : chosen; }
/** One frame of `ms` milliseconds at time `now` in scene `scene`, for the state `A` (an empty object at first).
 * Returns the lighter setting to use, or null. */
export function adaptStep(A, quality, ms, now, scene) {
    if (A.scene !== scene) { A.scene = scene; A.from = now; A.sum = 0; A.n = 0; }
    if (now - A.from < SETTLE || ms > SKIP || ms <= 0) return null;
    A.sum += ms; A.n++;
    if (now - A.from < SETTLE + WINDOW) return null;
    const mean = A.sum / A.n, k = ORDER.indexOf(quality);
    A.from = now - SETTLE; A.sum = 0; A.n = 0;
    return mean > SLOW && k >= 0 && k < ORDER.length - 1 ? ORDER[k + 1] : null;
}
