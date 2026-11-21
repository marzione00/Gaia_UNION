/** Levels of detail of the stations and ships. Level 0 is the full model, level 1 the low model built with
 * the same recipe (src/craft/kit.js, about 29 % of the triangles over the catalogue), level 2 a point of
 * light. The full model is reserved to what is near the camera, from the largest on screen down, while the
 * craft triangles of the frame stay within the budget of the graphics setting; when the low models alone
 * exceed it, the smallest on screen become points of light. */
export const NEAR = 40;
export const BUDGET = { high: 600000, balanced: 250000, low: 120000 };
/** Ratio of low to full triangles used to estimate a full model not built yet. */
export const LOW_SHARE = .29;

/** `objects`: [{apparent, min, low, full}] with the apparent radius in pixels, the radius below which no
 * mesh is drawn, and the triangles of the two models (`full` may be an estimate). Returns one level each. */
export function chooseLevels(objects, quality = 'high') {
    const budget = BUDGET[quality] ?? BUDGET.high, level = objects.map(o => o.apparent < o.min ? 2 : 1);
    let used = objects.reduce((n, o, k) => n + (level[k] === 1 ? o.low : 0), 0);
    if (used > budget) for (const k of objects.map((o, k) => k).filter(k => level[k] === 1).sort((a, b) => objects[a].apparent - objects[b].apparent)) {
        if (used <= budget) break;
        level[k] = 2; used -= objects[k].low;
    }
    const near = objects.map((o, k) => k).filter(k => level[k] === 1 && objects[k].apparent >= NEAR).sort((a, b) => objects[b].apparent - objects[a].apparent);
    for (const k of near) {
        const extra = objects[k].full - objects[k].low;
        if (used + extra <= budget) { level[k] = 0; used += extra; }
    }
    return level;
}
