import { stars } from './data.js';
self.onmessage = ({ data }) => {
    try {
        const values = stars(data.count, data.seed);
        self.postMessage({ values }, [values.buffer]);
    }
    catch (e) {
        self.postMessage({ error: e.message });
    }
};
