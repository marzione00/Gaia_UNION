import { COSMIC_QUALITY, orderedVolumes } from './scene/cosmos.js';
import { starExtinction } from './scene/cosmic-shader.js';
import { vsMesh, fsMesh, vsFullscreen, fsEnvironment, vsShadow, fsShadow, fsPost, fsCopy } from './scene/shaders.js';
// GAIA · WebGL 2 renderer. No CSS background images, SVG or Canvas2D drawing.
export const TAU = Math.PI * 2;
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const mix = (a, b, t) => a + (b - a) * t;
export const smooth = (a, b, x) => { let t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
export function color(hex, a = 1) {
    let v = hex.replace('#', '');
    if (v.length === 3)
        v = v.split('').map(x => x + x).join('');
    return [parseInt(v.slice(0, 2), 16) / 255, parseInt(v.slice(2, 4), 16) / 255, parseInt(v.slice(4, 6), 16) / 255, a];
}
export const mul = (a, b) => {
    const o = new Float32Array(16);
    for (let c = 0; c < 4; c++)
        for (let r = 0; r < 4; r++)
            for (let k = 0; k < 4; k++)
                o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
    return o;
};
export function perspective(fov, ar, near, far) { let f = 1 / Math.tan(fov / 2), o = new Float32Array(16); o[0] = f / ar; o[5] = f; o[10] = (far + near) / (near - far); o[11] = -1; o[14] = 2 * far * near / (near - far); return o; }
const norm = v => { let l = Math.hypot(...v) || 1; return v.map(x => x / l); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
export function lookAt(eye, center, up = [0, 1, 0]) { let z = norm(eye.map((x, i) => x - center[i])), x = norm(cross(up, z)), y = cross(z, x); return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, eye), -dot(y, eye), -dot(z, eye), 1]); }
export function transform(x = 0, y = 0, z = 0, s = 1, ry = 0, rx = 0) { let a = Math.cos(ry), b = Math.sin(ry), c = Math.cos(rx), d = Math.sin(rx); return new Float32Array([s * a, s * b * d, -s * b * c, 0, 0, s * c, s * d, 0, s * b, -s * a * d, s * a * c, 0, x, y, z, 1]); }
export function project(point, vp, w, h) { let x = point[0], y = point[1], z = point[2]; let q = [vp[0] * x + vp[4] * y + vp[8] * z + vp[12], vp[1] * x + vp[5] * y + vp[9] * z + vp[13], vp[2] * x + vp[6] * y + vp[10] * z + vp[14], vp[3] * x + vp[7] * y + vp[11] * z + vp[15]]; return [(q[0] / q[3] + 1) * w / 2, (1 - q[1] / q[3]) * h / 2, q[3]]; }
function shader(gl, kind, src) {
    let s = gl.createShader(kind);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        throw Error('Shader: ' + gl.getShaderInfoLog(s));
    return s;
}
function program(gl, vs, fs) {
    let p = gl.createProgram(), v = shader(gl, gl.VERTEX_SHADER, vs), f = shader(gl, gl.FRAGMENT_SHADER, fs);
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS))
        throw Error('Link: ' + gl.getProgramInfoLog(p));
    gl.deleteShader(v);
    gl.deleteShader(f);
    return p;
}
export function mesh(verts, ind) { return { v: new Float32Array(verts), i: new Uint32Array(ind) }; }
const emit = (v, x, y, z, nx, ny, nz, u, vv, c) => v.push(x, y, z, nx, ny, nz, u, vv, ...c);
export function sphereMesh(U = 32, V = 20) {
    let v = [], ix = [];
    for (let j = 0; j <= V; j++) {
        let theta = j * Math.PI / V;
        for (let i = 0; i <= U; i++) {
            let phi = i * TAU / U, p = [Math.cos(phi) * Math.sin(theta), Math.cos(theta), Math.sin(phi) * Math.sin(theta)];
            emit(v, ...p, ...p, 1 - i / U, j / V, [1, 1, 1, 1]);
        }
    }
    for (let j = 0; j < V; j++)
        for (let i = 0; i < U; i++) {
            let a = j * (U + 1) + i, b = a + U + 1;
            ix.push(a, b, a + 1, b, b + 1, a + 1);
        }
    return mesh(v, ix);
}
export function prismHexWorld(cols = 35, rows = 25, seed = 37) {
    let v = [], ix = [], N = 0, topHeight = new Map();
    const rand = (x, y) => { let t = Math.sin((x + seed) * 12.9898 + (y - seed) * 78.233) * 43758.5453; return t - Math.floor(t); };
    const height = (x, y) => { let p = Math.sin(x * .32) * Math.cos(y * .23) + .55 * Math.sin(x * .9 + y * .34) + .37 * Math.cos(y * .55 - x * .3); return -0.1 + Math.max(-.45, p * .42); };
    const dx = 1.12, dz = .97, R = .62;
    for (let z = 0; z < rows; z++)
        for (let x = 0; x < cols; x++) {
            let cx = (x - cols / 2 + (z % 2) * .5) * dx, cz = (z - rows / 2) * dz, h = height(x, z), wet = h < -.03, peak = h > .42;
            let veg = rand(x, z), water = [.065, .29, .40, 1], shallow = [.14, .39, .48, 1], land = [.19 + .12 * veg, .41 + .21 * veg, .32 + .07 * veg, 1], sand = [.62, .53, .38, 1], rock = [.49, .48, .46, 1], c = wet ? (h < -.35 ? water : shallow) : peak ? rock : (h < .08 ? sand : land);
            let corners = [];
            for (let a = 0; a < 6; a++) {
                let t = (a * 60 + 30) * Math.PI / 180;
                corners.push([cx + R * Math.cos(t), h, cz + R * Math.sin(t)]);
            }
            let center = v.length / 12;
            emit(v, cx, h, cz, 0, 1, 0, 0, 0, c);
            for (let a = 0; a < 6; a++)
                emit(v, ...corners[a], 0, 1, 0, 0, 0, c);
            for (let a = 0; a < 6; a++)
                ix.push(center, center + 1 + a, center + 1 + (a + 1) % 6);
            // Walls are genuine vertical faces; edges give the world real thickness.
            for (let a = 0; a < 6; a++) {
                let p = corners[a], q = corners[(a + 1) % 6], mid = (h - .5) / 2;
                let nor = norm([(p[2] - q[2]), 0, q[0] - p[0]]);
                let cc = [c[0] * .45, c[1] * .5, c[2] * .52, 1];
                let start = v.length / 12;
                emit(v, p[0], h, p[2], ...nor, 0, 0, cc);
                emit(v, q[0], h, q[2], ...nor, 0, 0, cc);
                emit(v, p[0], h - .46, p[2], ...nor, 0, 0, cc);
                emit(v, q[0], h - .46, q[2], ...nor, 0, 0, cc);
                ix.push(start, start + 2, start + 1, start + 1, start + 2, start + 3);
            }
            topHeight.set(`${x},${z}`, { x: cx, y: h, z: cz, wet, veg });
        }
    return { geometry: mesh(v, ix), height: topHeight };
}
export function coneMesh(n = 7) {
    let v = [], ix = [];
    const c = [.21, .46, .34, 1];
    for (let i = 0; i < n; i++) {
        let a = i * TAU / n, b = (i + 1) * TAU / n;
        let p = [Math.cos(a), 0, Math.sin(a)], q = [Math.cos(b), 0, Math.sin(b)], normal = norm([p[0] + q[0], .8, p[2] + q[2]]), o = v.length / 12;
        emit(v, ...p, ...normal, 0, 0, c);
        emit(v, ...q, ...normal, 0, 0, c);
        emit(v, 0, 1.8, 0, ...normal, 0, 0, [.32, .66, .44, 1]);
        ix.push(o, o + 1, o + 2);
    }
    return mesh(v, ix);
}
export function daisyDiskMesh(petals = 7) {
    let v = [], ix = [], center = [0, .06, 0], r = .48;
    for (let i = 0; i < petals; i++) {
        let a = TAU * i / petals;
        let off = v.length / 12, p = [Math.cos(a) * .32, .065, Math.sin(a) * .32], q = [Math.cos(a + .2) * r, .06, Math.sin(a + .2) * r], t = [Math.cos(a - .2) * r, .06, Math.sin(a - .2) * r];
        let c = [1, 1, 1, 1];
        emit(v, ...center, 0, 1, 0, 0, 0, c);
        emit(v, ...q, 0, 1, 0, 0, 0, c);
        emit(v, ...t, 0, 1, 0, 0, 0, c);
        ix.push(off, off + 1, off + 2);
    }
    return mesh(v, ix);
}
const vsStars = `#version 300 es
layout(location=0) in vec3 aPos;layout(location=1) in vec3 aRGB;layout(location=2) in float aSize;
uniform mat4 uVP;uniform float uPixels,uTime;uniform int uHoverStar;out vec3 vRGB;out float vAlpha;
${starExtinction}
void main(){vec4 p=uVP*vec4(aPos,1.);gl_Position=p;gl_PointSize=clamp(aSize*(gl_VertexID==uHoverStar?1.5:1.)*uPixels/max(8.,p.w),.6,aSize>3.?14.:9.);vRGB=aRGB*(gl_VertexID==uHoverStar?1.6:aSize>3.?1.25:1.);vAlpha=extinction(aPos);}`;
const fsStars = `#version 300 es
precision mediump float;in vec3 vRGB;in float vAlpha;uniform float uGain;out vec4 outColor;
void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;float h=exp(-r*r*4.8);outColor=vec4(vRGB,vAlpha*h*.13*uGain);}`;
const vsUI = `#version 300 es
layout(location=0) in vec2 aPos;layout(location=1) in vec2 aUV;layout(location=2) in vec4 aCol;layout(location=3) in float aMode;
uniform vec2 uRes;out vec2 vUV;out vec4 vCol;out float vMode;
void main(){gl_Position=vec4(aPos.x/uRes.x*2.-1.,1.-aPos.y/uRes.y*2.,0.,1.);vUV=aUV;vCol=aCol;vMode=aMode;}`;
const fsUI = `#version 300 es
precision highp float;in vec2 vUV;in vec4 vCol;in float vMode;uniform sampler2D uFont;out vec4 outColor;
void main(){vec4 tex=texture(uFont,vUV);if(vMode>1.5){vec3 rgb=vMode>2.5?vec3(1.)-tex.rgb:tex.rgb;outColor=vec4(rgb*vCol.rgb,tex.a*vCol.a);}else{float a=vMode>.5?tex.r:1.;outColor=vec4(vCol.rgb,vCol.a*a);}}`;
export class GPU {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl2', { alpha: false, antialias: true, preserveDrawingBuffer: true, depth: true, stencil: false, powerPreference: 'high-performance' });
        if (!this.gl)
            throw new Error('WebGL 2 non disponibile: non è disponibile un renderer alternativo.');
        let gl = this.gl;
        this.versions = { gl: gl.getParameter(gl.VERSION), glsl: gl.getParameter(gl.SHADING_LANGUAGE_VERSION), renderer: gl.getParameter(gl.RENDERER) };
        this.pMesh = program(gl, vsMesh, fsMesh);
        this.pStars = program(gl, vsStars, fsStars);
        this.pUI = program(gl, vsUI, fsUI);
        this.pEnvironment = program(gl, vsFullscreen, fsEnvironment);
        this.pPost = program(gl, vsFullscreen, fsPost);
        this.pCopy = program(gl, vsFullscreen, fsCopy);
        this.pShadow = program(gl, vsShadow, fsShadow);
        this.locations = new Map();
        this.fullscreenVao = gl.createVertexArray();
        this.lightVP = transform();
        this.reflectionVP = transform();
        this.shadowKey = null;
        this.surfaceLight = [-.643102,.7243,.248615];
        this.fogColor = [.33,.40,.37];
        this.fogDensity = 0;
        this.mist = false;
        this.meshes = new Map();
        this.uiData = [];
        this.atlas = null;
        this.metrics = null;
        this.time = 0;
        this.sceneQuality = 'high';
        this.frameStats = {stars:0,starDrawCalls:0};
        this.meshVao = gl.createVertexArray();
        this.starVao = gl.createVertexArray();
        this.uiVao = gl.createVertexArray();
        this.uiBuffer = gl.createBuffer();
        this._make1px();
        this.w = 1600;
        this.h = 900;
    }
    _make1px() { let gl = this.gl; this.blank = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.blank); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255])); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); }
    uploadTexture(img) { let gl = this.gl, t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE); gl.generateMipmap(gl.TEXTURE_2D); return t; }
    /** Texture from raw RGBA bytes (generated maps): repeats in longitude, clamps at the poles, mipmapped. */
    uploadPixels(width, height, data, texture = null) { const gl = this.gl, t = texture || gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength)); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); gl.generateMipmap(gl.TEXTURE_2D); return t; }
    setFontAtlas(img, metrics) { let gl = this.gl; this.metrics = metrics; this.atlas = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.atlas); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); gl.generateMipmap(gl.TEXTURE_2D); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); }
    deleteMesh(id) {
        const m = this.meshes.get(id);
        if (m) {
            this.gl.deleteVertexArray(m.vao);
            this.gl.deleteBuffer(m.vertexBuffer);
            this.gl.deleteBuffer(m.indexBuffer);
            this.meshes.delete(id);
        }
    }
    makeMesh(id, data) {
        let gl = this.gl, vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        let b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data.v, gl.STATIC_DRAW);
        let ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.i, gl.STATIC_DRAW);
        for (let [i, size, offset] of [[0, 3, 0], [1, 3, 12], [2, 2, 24], [3, 4, 32]]) {
            gl.enableVertexAttribArray(i);
            gl.vertexAttribPointer(i, size, gl.FLOAT, false, (data.stride || 12) * 4, offset);
        }
        if (data.stride === 16) {
            gl.enableVertexAttribArray(4);
            gl.vertexAttribPointer(4, 4, gl.FLOAT, false, 64, 48);
        }
        if (this.meshes.has(id))
            this.deleteMesh(id);
        this.meshes.set(id, { vao, vertexBuffer: b, indexBuffer: ib, count: data.i.length, stride: data.stride || 12 });
        return id;
    }
    /** Instances of an existing mesh: 8 floats each (x, y, z, scale, r, g, b, heading or phase). */
    makeInstances(key, meshId, data) {
        const gl = this.gl, m = this.meshes.get(meshId);if (!m) throw Error('Mesh mancante per le istanze: ' + meshId);
        this.instanceSets ||= new Map();if (this.instanceSets.has(key)) this.deleteInstances(key);
        const vao = gl.createVertexArray();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER, m.vertexBuffer);
        for (let [i, size, offset] of [[0, 3, 0], [1, 3, 12], [2, 2, 24], [3, 4, 32]]) { gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i, size, gl.FLOAT, false, m.stride * 4, offset); }
        if (m.stride === 16) { gl.enableVertexAttribArray(4); gl.vertexAttribPointer(4, 4, gl.FLOAT, false, 64, 48); }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.indexBuffer);
        const buffer = gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER, buffer);gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
        for (const [i, offset] of [[5, 0], [6, 16]]) { gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 32, offset); gl.vertexAttribDivisor(i, 1); }
        gl.bindVertexArray(null);
        this.instanceSets.set(key, { vao, buffer, mesh: meshId, n: data.length / 8, capacity: data.length / 8 });
        return key;
    }
    /** Replace instance data; a larger set reallocates the buffer. */
    updateInstances(key, data) {
        const set = this.instanceSets?.get(key);if (!set) return;const gl = this.gl;gl.bindBuffer(gl.ARRAY_BUFFER, set.buffer);
        if (data.length / 8 > set.capacity) { gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW); set.capacity = data.length / 8; } else gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
        set.n = data.length / 8;
    }
    deleteInstances(key) {
        const set = this.instanceSets?.get(key);if (!set) return;this.gl.deleteVertexArray(set.vao);this.gl.deleteBuffer(set.buffer);this.instanceSets.delete(key);
    }
    makeStars(data, background = false) {
        let gl = this.gl;
        if (background && !this.backgroundVao) this.backgroundVao = gl.createVertexArray();
        gl.bindVertexArray(background ? this.backgroundVao : this.starVao);
        let b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        for (let [i, n, off] of [[0, 3, 0], [1, 3, 12], [2, 1, 24]]) {
            gl.enableVertexAttribArray(i);
            gl.vertexAttribPointer(i, n, gl.FLOAT, false, 28, off);
        }
        if (background) { this.backgroundCount = data.length / 7; this.backgroundBuffer = b; }
        else { this.starCount = data.length / 7; this.starBuffer = b; }
    }
    resize() {
        // The interface is drawn at the full screen density (up to 3x) so text stays sharp; the 3D scene keeps
        // its previous resolution through sceneScale in createTargets.
        let w = this.canvas.clientWidth, h = this.canvas.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 3);
        let W = Math.round(w * dpr), H = Math.round(h * dpr);
        if (this.canvas.width !== W || this.canvas.height !== H) {
            this.canvas.width = W;
            this.canvas.height = H;
        }
        this.w = w;
        this.h = h;
        this.dpr = dpr;
        this.gl.viewport(0, 0, W, H);
    }
    uniform(p, name) {
        let map = this.locations.get(p);
        if (!map) this.locations.set(p, map = new Map());
        if (!map.has(name)) map.set(name, this.gl.getUniformLocation(p, name));
        return map.get(name);
    }
    createTargets() {
        const g = this.gl, scale = (this.sceneQuality === 'low' ? .6 : this.sceneQuality === 'balanced' ? .8 : 1) * Math.min(1, 1.4 / (this.dpr || 1)), w = Math.max(1,Math.round(this.canvas.width*scale)), h = Math.max(1,Math.round(this.canvas.height*scale));
        this.sceneScale=scale;
        if (this.sceneWidth === w && this.sceneHeight === h) return;
        if (this.sceneFbo) { g.deleteFramebuffer(this.sceneFbo); g.deleteTexture(this.sceneColor); g.deleteRenderbuffer(this.sceneDepth); }
        this.sceneWidth = w; this.sceneHeight = h;
        this.sceneFbo = g.createFramebuffer(); g.bindFramebuffer(g.FRAMEBUFFER, this.sceneFbo);
        this.sceneColor = g.createTexture(); g.bindTexture(g.TEXTURE_2D, this.sceneColor);
        g.texImage2D(g.TEXTURE_2D, 0, g.RGBA8, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, null);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
        g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, this.sceneColor, 0);
        this.sceneDepth = g.createRenderbuffer(); g.bindRenderbuffer(g.RENDERBUFFER, this.sceneDepth);
        g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT24, w, h);
        g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, this.sceneDepth);
        if (g.checkFramebufferStatus(g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE) throw Error('Framebuffer della scena incompleto');
        g.bindFramebuffer(g.FRAMEBUFFER, null);
    }
    begin() {
        this.resize(); this.createTargets(); const g = this.gl;
        g.bindFramebuffer(g.FRAMEBUFFER, this.sceneFbo); g.viewport(0, 0, this.sceneWidth, this.sceneHeight);
        g.depthMask(true); g.clearColor(.004,.012,.024,1); g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
        g.enable(g.DEPTH_TEST); g.disable(g.BLEND); this.uiData.length = 0; this.resolved = false; this.frameStats={stars:0,starDrawCalls:0};
    }
    resolveScene() {
        if (this.resolved) return;
        const g = this.gl, p = this.pPost;
        g.bindFramebuffer(g.FRAMEBUFFER, null); g.viewport(0,0,this.canvas.width,this.canvas.height);
        g.disable(g.DEPTH_TEST); g.disable(g.BLEND); g.useProgram(p); g.bindVertexArray(this.fullscreenVao);
        g.activeTexture(g.TEXTURE0); g.bindTexture(g.TEXTURE_2D,this.sceneColor);
        g.uniform1i(this.uniform(p,'uScene'),0); g.uniform2f(this.uniform(p,'uPixel'),1/this.sceneWidth,1/this.sceneHeight);g.uniform1f(this.uniform(p,'uBloom'),this.sceneQuality==='low'?0:1);
        g.drawArrays(g.TRIANGLES,0,3); this.resolved = true;
    }
    drawEnvironment(mode, eye, target, fov, light = [-.6,.7,.3], fogColor = [.33,.4,.37], exposure = 1, sky = null) {
        const g=this.gl,p=this.pEnvironment,forward=norm(target.map((x,i)=>x-eye[i])),right=norm(cross(forward,[0,1,0])),up=cross(right,forward);
        const quality=COSMIC_QUALITY[this.sceneQuality]||COSMIC_QUALITY.high,cosmic=mode===1&&this.cosmos;
        this.cosmicEye=eye;
        if(cosmic){
            const w=Math.max(1,Math.round(this.sceneWidth*quality.scale)),h=Math.max(1,Math.round(this.sceneHeight*quality.scale));
            if(this.cosmicWidth!==w||this.cosmicHeight!==h){
                if(this.cosmicFbo){g.deleteFramebuffer(this.cosmicFbo);g.deleteTexture(this.cosmicColor);}
                this.cosmicWidth=w;this.cosmicHeight=h;
                this.cosmicFbo=g.createFramebuffer();g.bindFramebuffer(g.FRAMEBUFFER,this.cosmicFbo);
                this.cosmicColor=g.createTexture();g.bindTexture(g.TEXTURE_2D,this.cosmicColor);g.texImage2D(g.TEXTURE_2D,0,g.RGBA8,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);
                for(const [key,value] of [[g.TEXTURE_MIN_FILTER,g.LINEAR],[g.TEXTURE_MAG_FILTER,g.LINEAR],[g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE],[g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE]])g.texParameteri(g.TEXTURE_2D,key,value);
                g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,this.cosmicColor,0);
                if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Framebuffer cosmico incompleto');
            }
            g.bindFramebuffer(g.FRAMEBUFFER,this.cosmicFbo);g.viewport(0,0,w,h);
        }
        g.disable(g.DEPTH_TEST);g.depthMask(false);g.disable(g.BLEND);g.useProgram(p);g.bindVertexArray(this.fullscreenVao);
        for(const [name,value] of Object.entries({uEye:eye,uForward:forward,uRight:right,uUp:up,uLight:light,uFogColor:fogColor,uSkyTop:sky?.top||[.035,.073,.10],uSunColor:sky?.sun||[1,.73,.42]}))g.uniform3fv(this.uniform(p,name),value);g.uniform1f(this.uniform(p,'uStars'),sky?.stars||0);
        const volumes=cosmic?orderedVolumes(this.cosmos,eye):[];
        g.uniform1i(this.uniform(p,'uVolumeCount'),volumes.length);g.uniform1i(this.uniform(p,'uSteps'),quality.steps);
        volumes.forEach((v,i)=>{
            g.uniform4fv(this.uniform(p,'uVolumeCenter['+i+']'),[...v.center,v.seed]);
            g.uniform4fv(this.uniform(p,'uVolumeAxes['+i+']'),[...v.axes,v.kind]);
            g.uniform4fv(this.uniform(p,'uVolumeColor['+i+']'),[...v.color,v.strength]);
        });
        g.uniform1f(this.uniform(p,'uExposure'),exposure);g.uniform1i(this.uniform(p,'uMode'),mode);g.uniform1f(this.uniform(p,'uAspect'),this.w/this.h);g.uniform1f(this.uniform(p,'uTanHalf'),Math.tan(fov/2));g.uniform1f(this.uniform(p,'uTime'),this.time);
        g.drawArrays(g.TRIANGLES,0,3);
        if(cosmic){
            g.bindFramebuffer(g.FRAMEBUFFER,this.sceneFbo);g.viewport(0,0,this.sceneWidth,this.sceneHeight);
            g.useProgram(this.pCopy);g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,this.cosmicColor);g.uniform1i(this.uniform(this.pCopy,'uScene'),0);g.drawArrays(g.TRIANGLES,0,3);
            this.frameStats.cosmicVolumes=volumes.length;this.frameStats.volumeSteps=quality.steps;
        }
        g.depthMask(true);g.enable(g.DEPTH_TEST);
    }
    renderShadow(key, ids, lightVP) {
        const g=this.gl;
        this.lightVP=lightVP;
        if(this.shadowKey===key)return;
        if(!this.shadowFbo){
            this.shadowSize=Math.min(2048,g.getParameter(g.MAX_TEXTURE_SIZE));
            this.shadowFbo=g.createFramebuffer();this.shadowTexture=g.createTexture();g.bindTexture(g.TEXTURE_2D,this.shadowTexture);
            g.texImage2D(g.TEXTURE_2D,0,g.DEPTH_COMPONENT24,this.shadowSize,this.shadowSize,0,g.DEPTH_COMPONENT,g.UNSIGNED_INT,null);
            for(const [name,value] of [[g.TEXTURE_MIN_FILTER,g.NEAREST],[g.TEXTURE_MAG_FILTER,g.NEAREST],[g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE],[g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE]])g.texParameteri(g.TEXTURE_2D,name,value);
            g.bindFramebuffer(g.FRAMEBUFFER,this.shadowFbo);g.framebufferTexture2D(g.FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.TEXTURE_2D,this.shadowTexture,0);g.drawBuffers([g.NONE]);g.readBuffer(g.NONE);
            if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Framebuffer delle ombre incompleto');
        }
        g.bindFramebuffer(g.FRAMEBUFFER,this.shadowFbo);g.viewport(0,0,this.shadowSize,this.shadowSize);g.depthMask(true);g.enable(g.DEPTH_TEST);g.disable(g.BLEND);g.clear(g.DEPTH_BUFFER_BIT);
        g.useProgram(this.pShadow);g.uniformMatrix4fv(this.uniform(this.pShadow,'uLightVP'),false,lightVP);
        g.enable(g.POLYGON_OFFSET_FILL);g.polygonOffset(1.5,2.0);
        for(const id of ids){const m=this.meshes.get(id);if(m){g.bindVertexArray(m.vao);g.drawElements(g.TRIANGLES,m.count,g.UNSIGNED_INT,0);}}
        g.disable(g.POLYGON_OFFSET_FILL);g.bindFramebuffer(g.FRAMEBUFFER,this.sceneFbo);g.viewport(0,0,this.sceneWidth,this.sceneHeight);this.shadowKey=key;
    }
    renderReflection(vp, eye, ids, light, waterLevel=-.12) {
        const g=this.gl,w=Math.max(1,Math.round(this.sceneWidth/2)),h=Math.max(1,Math.round(this.sceneHeight/2));
        if(this.reflectionWidth!==w||this.reflectionHeight!==h){
            if(this.reflectionFbo){g.deleteFramebuffer(this.reflectionFbo);g.deleteTexture(this.reflectionTexture);g.deleteRenderbuffer(this.reflectionDepth);}
            this.reflectionWidth=w;this.reflectionHeight=h;
            this.reflectionFbo=g.createFramebuffer();g.bindFramebuffer(g.FRAMEBUFFER,this.reflectionFbo);
            this.reflectionTexture=g.createTexture();g.bindTexture(g.TEXTURE_2D,this.reflectionTexture);g.texImage2D(g.TEXTURE_2D,0,g.RGBA8,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);
            for(const [name,value] of [[g.TEXTURE_MIN_FILTER,g.LINEAR],[g.TEXTURE_MAG_FILTER,g.LINEAR],[g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE],[g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE]])g.texParameteri(g.TEXTURE_2D,name,value);
            g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,this.reflectionTexture,0);
            this.reflectionDepth=g.createRenderbuffer();g.bindRenderbuffer(g.RENDERBUFFER,this.reflectionDepth);g.renderbufferStorage(g.RENDERBUFFER,g.DEPTH_COMPONENT24,w,h);g.framebufferRenderbuffer(g.FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.RENDERBUFFER,this.reflectionDepth);
            if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Framebuffer dei riflessi incompleto');
        }
        const mirror=transform();mirror[5]=-1;mirror[13]=2*waterLevel;this.reflectionVP=mul(vp,mirror);
        g.bindFramebuffer(g.FRAMEBUFFER,this.reflectionFbo);g.viewport(0,0,w,h);g.depthMask(true);g.clearColor(.09,.15,.18,1);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);
        this.inReflection=true;
        for(const id of ids)this.drawMesh(id,this.reflectionVP,transform(),{material:10,eye:[eye[0],2*waterLevel-eye[1],eye[2]],light});
        this.inReflection=false;g.bindFramebuffer(g.FRAMEBUFFER,this.sceneFbo);g.viewport(0,0,this.sceneWidth,this.sceneHeight);
    }
    drawStars(vp, count = this.starCount, offset = 0, background = false, gain = 1) {
        if(!background&&(offset!==0||count<1000000||this.starCount<1000000))throw Error('La galassia deve disegnare almeno 1.000.000 di punti');
        const g=this.gl,p=this.pStars;g.enable(g.BLEND);g.blendFunc(g.SRC_ALPHA,g.ONE);g.depthMask(false);g.useProgram(p);g.bindVertexArray(background ? this.backgroundVao : this.starVao);
        const dust=!background&&this.cosmos?this.cosmos.volumes.slice(0,10):[];
        g.uniform1i(this.uniform(p,'uDustCount'),dust.length);g.uniform3fv(this.uniform(p,'uCosmicEye'),this.cosmicEye||[0,0,0]);
        dust.forEach((v,i)=>{g.uniform4fv(this.uniform(p,'uDustCenter['+i+']'),[...v.center,v.strength]);g.uniform4fv(this.uniform(p,'uDustAxes['+i+']'),[...v.axes,v.kind]);});
        g.uniformMatrix4fv(this.uniform(p,'uVP'),false,vp);g.uniform1f(this.uniform(p,'uPixels'),this.h*this.dpr*this.sceneScale*(background ? .22 : .087));g.uniform1f(this.uniform(p,'uTime'),this.time);
        g.uniform1i(this.uniform(p,'uHoverStar'),background?-1:(this.hoverStarIndex??-1));g.uniform1f(this.uniform(p,'uGain'),gain);const submitted=Math.min(count,(background ? this.backgroundCount : this.starCount)-offset);g.drawArrays(g.POINTS,offset,submitted);this.frameStats.stars+=submitted;this.frameStats.starDrawCalls++;g.depthMask(true);g.disable(g.BLEND);
    }
    drawMesh(id, vp, model, { texture = null, tint = [1,1,1,1], opacity = 1, rim = 0, emission = 0, eye = [0,8,40], light = [.4,1,.7], material = 0, seed = 0, center = [0,0,0], radius = 5.3, atmosphere = [.11,.36,.81], ocean = false, disguise = 0, lightColor = [1,1,1], occluders = [], instances = null, instanceMode = 1, count = null, motion = [0,0,0,0], pbr = [0,.65,0,0] } = {}) {
        const m=this.meshes.get(id);if(!m)return;const set=instances?this.instanceSets?.get(instances):null;if(instances&&!set)return;
        const g=this.gl,p=this.pMesh;g.useProgram(p);g.bindVertexArray(set?set.vao:m.vao);
        if(m.stride!==16)g.vertexAttrib4f(4,...pbr);
        g.uniform1i(this.uniform(p,'uInstanced'),set?instanceMode:0);g.uniform4fv(this.uniform(p,'uMotion'),motion);
        for(const [name,value] of Object.entries({uVP:vp,uModel:model,uLightVP:this.lightVP,uReflectionVP:this.reflectionVP}))g.uniformMatrix4fv(this.uniform(p,name),false,value);
        for(const [name,value] of Object.entries({uEye:eye,uLight:light,uCenter:center,uFogColor:this.fogColor,uAtmosColor:atmosphere,uLightColor:lightColor}))g.uniform3fv(this.uniform(p,name),value);
        g.uniform4fv(this.uniform(p,'uTint'),tint);g.uniform1i(this.uniform(p,'uMaterial'),material);
        g.uniform1i(this.uniform(p,'uOccluderCount'),Math.min(4,occluders.length));occluders.slice(0,4).forEach((o,i)=>g.uniform4fv(this.uniform(p,'uOccluder['+i+']'),o));
        for(const [name,value] of Object.entries({uDisguise:disguise,uOcean:ocean?1:0,uTexWeight:texture?1:0,uOpacity:opacity,uRim:rim,uEmission:emission,uTime:this.time,uSeed:seed,uRadius:radius,uFog:this.fogDensity,uHasShadow:material===10&&this.shadowKey?1:0,uMist:this.mist?1:0,uClipBelow:this.inReflection?-.13:-10000}))g.uniform1f(this.uniform(p,name),value);
        g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,texture||this.blank);g.uniform1i(this.uniform(p,'uTex'),0);
        g.activeTexture(g.TEXTURE1);g.bindTexture(g.TEXTURE_2D,this.shadowTexture||this.blank);g.uniform1i(this.uniform(p,'uShadow'),1);
        g.activeTexture(g.TEXTURE2);g.bindTexture(g.TEXTURE_2D,!this.inReflection&&this.reflectionTexture?this.reflectionTexture:this.blank);g.uniform1i(this.uniform(p,'uReflection'),2);
        if(opacity<1){g.enable(g.BLEND);g.blendFunc(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA);g.depthMask(false);}
        if(set){const n=Math.min(set.n,count??set.n);if(n>0)g.drawElementsInstanced(g.TRIANGLES,m.count,g.UNSIGNED_INT,0,n);}else g.drawElements(g.TRIANGLES,m.count,g.UNSIGNED_INT,0);
        if(opacity<1){g.depthMask(true);g.disable(g.BLEND);}
        g.activeTexture(g.TEXTURE0);
    }
    // GPU-rendered rounded panels, borders, data glyphs and all text.
    quad(x, y, w, h, rgba, mode = 0, uv = [0, 0, 1, 1]) {
        const d = this.uiData;
        let [p, q, r, s] = uv;
        let v = [[x, y, p, q], [x + w, y, r, q], [x + w, y + h, r, s], [x, y + h, p, s]];
        for (let k of [0, 1, 2, 0, 2, 3])
            d.push(v[k][0], v[k][1], v[k][2], v[k][3], ...rgba, mode);
    }
    poly(points, c) {
        if (points.length < 3)
            return;
        const [x, y] = points[0];
        for (let i = 1; i < points.length - 1; i++) {
            for (let p of [[x, y], points[i], points[i + 1]])
                this.uiData.push(p[0], p[1], 0, 0, ...c, 0);
        }
    }
    polyline(points, c, w = 1, glow = 0) {
        if (glow > 0)
            this.polyline(points, [c[0], c[1], c[2], c[3] * .13], w + glow, 0);
        for (let i = 0; i < points.length - 1; i++) {
            let [a, b] = [points[i], points[i + 1]], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, ox = -dy / l * w / 2, oy = dx / l * w / 2;
            this.poly([[a[0] + ox, a[1] + oy], [a[0] - ox, a[1] - oy], [b[0] - ox, b[1] - oy], [b[0] + ox, b[1] + oy]], c);
        }
    }
    rect(x, y, w, h, c) { this.quad(x, y, w, h, c); }
    // Rectangle whose alpha varies smoothly over a grid of vertices, for shades behind text.
    shadeRect(x, y, w, h, rgba, alpha, n = 8) {
        const d = this.uiData, at = (i, j) => [x + w * j / n, y + h * i / n, rgba[3] * alpha(j / n, i / n)];
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
            const v = [at(i, j), at(i, j + 1), at(i + 1, j + 1), at(i + 1, j)];
            for (const k of [0, 1, 2, 0, 2, 3]) d.push(v[k][0], v[k][1], 0, 0, rgba[0], rgba[1], rgba[2], v[k][2], 0);
        }
    }
    roundPoints(x, y, w, h, r) {
        r = Math.min(r, w / 2, h / 2);
        const a = [];
        for (let [xx, yy, offset] of [[x + w - r, y + r, -Math.PI / 2], [x + w - r, y + h - r, 0], [x + r, y + h - r, Math.PI / 2], [x + r, y + r, Math.PI]])
            for (let k = 0; k <= 5; k++) {
                let t = offset + k / 5 * Math.PI / 2;
                a.push([xx + Math.cos(t) * r, yy + Math.sin(t) * r]);
            }
        return a;
    }
    roundRect(x, y, w, h, r, fill, stroke = null, glow = 0) {
        let p = this.roundPoints(x, y, w, h, r);
        this.poly([[x + w / 2, y + h / 2], ...p, p[0]], fill);
        if (stroke)
            this.polyline([...p, p[0]], stroke, 1.05, glow);
    }
    hexagon(cx, cy, r, fill, stroke = null) {
        let p = Array.from({ length: 6 }, (_, i) => [cx + Math.cos(Math.PI / 3 * i + Math.PI / 6) * r, cy + Math.sin(Math.PI / 3 * i + Math.PI / 6) * r]);
        this.poly([[cx, cy], ...p, p[0]], fill);
        if (stroke)
            this.polyline([...p, p[0]], stroke, 1.5, 3);
    }
    line(a, b, c, width = 1, glow = 0) { this.polyline([a, b], c, width, glow); }
    textWidth(s, style = 'body', tracking = 0) {
        const m = this.metrics?.styles[style];
        if (!m)
            return s.length * 10;
        let w = 0;
        for (let c of String(s)) {
            let g = m.glyphs[c] || m.glyphs['?'];
            w += (g?.advance || 7) + tracking;
        }
        return w;
    }
    text(s, x, y, style = 'body', c = color('#f0f6f5'), opts = {}) {
        let m = this.metrics?.styles[style];
        if (!m)
            return;
        const str = String(s), tracking = opts.track || 0;
        let ww = this.textWidth(str, style, tracking);
        if (opts.align === 'right')
            x -= ww;
        else if (opts.align === 'center')
            x -= ww / 2;
        const atlasW = this.metrics.width, atlasH = this.metrics.height;
        const base = y + m.size * .86;
        for (let chr of str) {
            let g = m.glyphs[chr] || m.glyphs['?'];
            if (!g)
                continue;
            if (chr !== ' ' && g.w > 1) {
                let yy = base + g.by, tw = g.tw ?? g.w, th = g.th ?? g.h;
                this.quad(x + g.bx, yy, g.w, g.h, c, 1, [g.x / atlasW, g.y / atlasH, (g.x + tw) / atlasW, (g.y + th) / atlasH]);
            }
            x += g.advance + tracking;
        }
    }
    multiline(s, x, y, maxW, style = 'body', c = color('#d2dfdf'), lh = 26, maxLines = 99) {
        let words = String(s).split(/\s+/), line = '', n = 0;
        for (let w of words) {
            let cand = line ? line + ' ' + w : w;
            if (this.textWidth(cand, style) > maxW && line) {
                this.text(line, x, y + n * lh, style, c);
                n++;
                line = w;
                if (n >= maxLines)
                    break;
            }
            else
                line = cand;
        }
        if (line && n < maxLines) {
            this.text(line, x, y + n * lh, style, c);
            n++;
        }
        return n;
    }
    lineGraph(points, x, y, w, h, c, width = 1.8) { let pts = points.map(([px, py]) => [x + px * w, y + (1 - py) * h]); this.polyline(pts, c, width, 4); }
    drawImage(texture, x, y, w, h, uv = [0, 0, 1, 1], invert = false) { this.drawUI(); this.uiData.length = 0; this.quad(x, y, w, h, [1, 1, 1, 1], invert ? 3 : 2, uv); this.drawUI(texture); this.uiData.length = 0; }
    flush() { this.drawUI(); this.uiData.length = 0; }
    drawUI(texture = this.atlas) {
        this.resolveScene();
        let g = this.gl;
        if (!this.atlas)
            return;
        g.disable(g.DEPTH_TEST);
        g.enable(g.BLEND);
        g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
        g.useProgram(this.pUI);
        g.bindVertexArray(this.uiVao);
        g.bindBuffer(g.ARRAY_BUFFER, this.uiBuffer);
        g.bufferData(g.ARRAY_BUFFER, new Float32Array(this.uiData), g.DYNAMIC_DRAW);
        for (let [i, n, off] of [[0, 2, 0], [1, 2, 8], [2, 4, 16], [3, 1, 32]]) {
            g.enableVertexAttribArray(i);
            g.vertexAttribPointer(i, n, g.FLOAT, false, 36, off);
        }
        g.uniform2f(g.getUniformLocation(this.pUI, 'uRes'), this.w, this.h);
        g.activeTexture(g.TEXTURE0);
        g.bindTexture(g.TEXTURE_2D, texture);
        g.uniform1i(g.getUniformLocation(this.pUI, 'uFont'), 0);
        g.drawArrays(g.TRIANGLES, 0, this.uiData.length / 9);
        g.disable(g.BLEND);
        g.enable(g.DEPTH_TEST);
        return 0;
    }
}
