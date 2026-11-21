// Module worker of src/craft/factory.js: builds one craft model per message and sends it back with its
// buffers transferred, so the drawing loop only uploads finished meshes.
import { make, buffers } from './factory.js';

self.onmessage = ({ data }) => {
    const t = performance.now();
    try {
        const model = make(data);
        self.postMessage({ key: data.key, model, ms: performance.now() - t }, buffers(model));
    } catch (e) {
        self.postMessage({ key: data.key, error: String(e?.message || e) });
    }
};
