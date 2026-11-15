/** Daisyworld: model family of Watson & Lovelock (1983), eqs. 1–6.
 * Numerical implementation/parameter choices are documented in docs/SCIENTIFIC_MODEL.md.
 * Temperatures in kelvin internally; model time is dimensionless, NOT calendar years.
 */
export const DEFAULTS = Object.freeze({ luminosity: 1, flux: 917, sigma: 5.67e-8, q: 2e9, death: 0.3, blackAlbedo: 0.25, whiteAlbedo: 0.75, groundAlbedo: 0.5, optimalC: 22.5, curvature: 0.003265, fertile: 1, dt: 0.1, duration: 300, initialBlack: 0.01, initialWhite: 0.01 });
export function validate(p = {}) {
    const o = { ...DEFAULTS, ...p };
    for (const [k, v] of Object.entries(o))
        if (!Number.isFinite(v))
            throw new TypeError(`Parametro non finito: ${k}`);
    if (o.curvature <= 0 || o.optimalC <= -273.15)
        throw new RangeError('Parametri di crescita non validi');
    if (o.luminosity <= 0 || o.flux <= 0 || o.sigma <= 0 || o.dt <= 0 || o.dt > 0.5 || o.duration <= 0 || o.duration > 3000)
        throw new RangeError('Scala o passo fuori intervallo');
    if (o.q < 0 || o.q > o.flux * o.luminosity / o.sigma)
        throw new RangeError('Contrasto termico non ammissibile');
    for (const k of ['death', 'blackAlbedo', 'whiteAlbedo', 'groundAlbedo', 'fertile', 'initialBlack', 'initialWhite'])
        if (o[k] < 0 || o[k] > 1)
            throw new RangeError(k);
    if (o.initialBlack + o.initialWhite > o.fertile || o.fertile === 0)
        throw new RangeError('Copertura iniziale oltre la superficie fertile');
    if (!(o.blackAlbedo < o.groundAlbedo && o.groundAlbedo < o.whiteAlbedo))
        throw new RangeError('Richiesto A_scure < A_suolo < A_chiare');
    return o;
}
export function growth(tempC, p = DEFAULTS) { return Math.max(0, 1 - p.curvature * (p.optimalC - tempC) ** 2); }
export function environment(black, white, p = DEFAULTS) { const ground = 1 - black - white; const albedo = black * p.blackAlbedo + white * p.whiteAlbedo + ground * p.groundAlbedo; const t4 = p.flux * p.luminosity * (1 - albedo) / p.sigma; const temperatureK = Math.pow(Math.max(0, t4), .25); const blackK = Math.pow(Math.max(0, t4 + p.q * (albedo - p.blackAlbedo)), .25), whiteK = Math.pow(Math.max(0, t4 + p.q * (albedo - p.whiteAlbedo)), .25); const bareK = Math.pow(p.flux * p.luminosity * (1 - p.groundAlbedo) / p.sigma, .25); return { black, white, ground, albedo, temperatureK, temperatureC: temperatureK - 273.15, blackC: blackK - 273.15, whiteC: whiteK - 273.15, bareC: bareK - 273.15, absorbed: p.flux * p.luminosity * (1 - albedo), emitted: p.sigma * temperatureK ** 4 }; }
export function derivative(black, white, p) { const e = environment(black, white, p), free = Math.max(0, p.fertile - black - white); return [black * (free * growth(e.blackC, p) - p.death), white * (free * growth(e.whiteC, p) - p.death)]; }
export function rk4(b, w, p, dt = p.dt) {
    const k1 = derivative(b, w, p), k2 = derivative(b + k1[0] * dt / 2, w + k1[1] * dt / 2, p), k3 = derivative(b + k2[0] * dt / 2, w + k2[1] * dt / 2, p), k4 = derivative(b + k3[0] * dt, w + k3[1] * dt, p);
    let nb = Math.max(0, b + dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])), nw = Math.max(0, w + dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]));
    if (nb + nw > p.fertile + 1e-10)
        throw new Error('Passo numerico fuori dal simplesso');
    return [nb, nw];
}
export function simulate(params = {}) {
    const p = validate(params);
    let b = p.initialBlack, w = p.initialWhite, trace = [{ t: 0, ...environment(b, w, p) }], steps = Math.ceil(p.duration / p.dt);
    const stride = Math.max(1, Math.floor(steps / 300));
    for (let i = 1; i <= steps; i++) {
        [b, w] = rk4(b, w, p, Math.min(p.dt, p.duration - (i - 1) * p.dt));
        if (i % stride === 0 || i === steps)
            trace.push({ t: Math.min(p.duration, i * p.dt), ...environment(b, w, p) });
    }
    const final = environment(b, w, p), residual = Math.max(...derivative(b, w, p).map(Math.abs));
    return { parameters: p, final, trace, residual, converged: residual < 1e-7, method: 'RK4', model: 'Daisyworld pedagogico, equazioni 1–6 di Watson & Lovelock (1983)', timeUnit: 'tempo del modello, non anni' };
}
export function sweep(parameters = {}, count = 51) {
    if (!Number.isInteger(count) || count < 2 || count > 501)
        throw new RangeError('Numero di campioni non valido');
    return Array.from({ length: count }, (_, i) => { const L = .6 + i / (count - 1), r = simulate({ ...parameters, luminosity: L }); return { luminosity: L, ...r.final, converged: r.converged }; });
}
