/** Retry static JSON requests that fail during CDN propagation or after a cached 404.
 * Retry URLs use unique query strings; every successful response is still parsed as JSON.
 */
export async function fetchJsonWithRetry(path, { request = fetch, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
    nonce = () => Date.now(), attempts = 3 } = {}) {
    if (typeof path !== 'string' || !path || !Number.isInteger(attempts) || attempts < 1)
        throw new TypeError('Richiesta JSON non valida.');
    let error;
    for (let index = 0; index < attempts; index++) {
        const separator = path.includes('?') ? '&' : '?';
        const target = index ? path + separator + 'gaia_retry=' + nonce() + '-' + index : path;
        try {
            const response = await request(target, { cache: 'no-store' });
            if (response.ok) return await response.json();
            error = new Error('Risorsa mancante: ' + path + ' (HTTP ' + (response.status ?? '?') + ')');
        }
        catch (cause) {
            error = cause instanceof Error ? cause : new Error(String(cause));
        }
        if (index + 1 < attempts) await sleep(index === 0 ? 250 : 750);
    }
    throw error;
}
