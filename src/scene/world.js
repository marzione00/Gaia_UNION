import { beltRing, dustBand, unitTail } from './minor-bodies.js';
import { distanceMap, systemBelts, systemComets, cometState, streamOf, meteorShowers, showerState, ringOmega, years, visViva } from './comete.js';
import { createCosmos, enrichCosmicStars, regionAt } from './cosmos.js';
import { galaxyCamera } from '../navigation/atlas-model.js';
import { MIN_STARS, SYSTEM_SCALE, buildSystems, bodyAtTime, systemArchitecture, systemPlanet, systemForPlanet, indicesForSystem, pickProjected } from './systems.js';
import { viewKey } from './navigation.js';
import { mesh, sphereMesh, transform, perspective, lookAt, mul, project, TAU } from '../renderer.js';
import { random, raySphere, backgroundStars } from './data.js';
import { planetProfile } from './assets.js';
import { DISCIPLINE } from '../ui/toolkit.js';
import { pilotWorld } from '../worlds/pilots.js';
import { planetSurface, surfaceScatter, systemStarLight, planetGenomes } from '../worlds/surface.js';
import { orbitMap } from '../worlds/orbit-texture.js';
import { systemCraft, systemExtras, systemShipExtras, systemDefence, systemDefenceShips, LOW_DETAIL } from '../craft/catalog.js';
import { CraftFactory } from '../craft/factory.js';
import { chooseLevels, LOW_SHARE } from '../craft/detail.js';
import { placeStations, stationPosition, stationYaw } from '../craft/placement.js';
import { Economy, RESOURCES, stationReport, shipReport } from '../craft/economy.js';
import { Threats, THREAT } from '../craft/threats.js';
import { Frontier, raidLength } from '../craft/swarm.js';
import { Kit } from '../craft/kit.js';
import { CRAFT, CRAFT_BY_ID } from '../craft/registry.js';
import { SERVICE_KINDS, SERVICE_NAMES, SERVICE_ABOUT, SERVICE_SIZE, planService, servicePose, serviceMesh } from '../craft/servizio.js';
import { polyhedron } from '../craft/parts.js';
import { SHIP_SIZE, shipPose, shipMatrix } from '../craft/traffic.js';
import { CHAIN_STATIONS } from '../craft/esercizi-catene.js';
import { planetPhysics } from '../worlds/planet-physics.js';
import { pressureFromDensity, APPRECIABLE_DENSITY } from '../worlds/physics.js';
import { horizonMesh, CORE, RINGS } from '../worlds/field.js';
import { LANDING_SITES } from '../worlds/landing-sites.js';
import { tuft, rock, station as stationMesh, seaPlane, seaRing, beacon, curtain } from '../worlds/geometry.js';
import { bodyMesh } from '../worlds/bodyplan.js';
import { buildingMesh } from '../worlds/buildings.js';
import { colonistMesh, nativeMesh, nativeLegs } from '../worlds/people.js';
import { WALK } from '../worlds/settlements.js';
/** Instance mode, motion uniform and PBR of each form of the species (src/worlds/species.js); every species
 * has its own two meshes, built from its body plan (src/worlds/bodyplan.js). For walking animals the fourth
 * motion value, the height of the legs in the mesh, is written per species and makes the legs swing. */
const LIFE = {
    ciuffo: [1, [0, 0, .06, 0], [0, .8, .02, 3]], felce: [1, [0, 0, .03, 0], [0, .75, .02, 3]], albero: [1, [0, 0, .012, 0], [0, .8, .02, 3]], arbusto: [1, [0, 0, .02, 0], [0, .8, .02, 3]], canneto: [1, [0, 0, .05, 0], [0, .7, .02, 3]],
    colonna: [1, [0, 0, 0, 0], [0, .6, .02, 3]], cuscino: [1, [0, 0, 0, 0], [0, .85, .02, 3]], calice: [1, [0, 0, .02, 0], [0, .6, .12, 3]], crosta: [1, [0, 0, 0, 0], [0, .9, 0, 3]], fungo: [1, [0, 0, 0, 0], [0, .7, .06, 3]],
    pascolatore: [3, [.05, 1.6, 0, 0], [0, .7, 0, 0]], cacciatore: [3, [.09, 2.6, 0, 0], [0, .6, 0, 0]], bipede: [3, [.07, 2.2, 0, 0], [0, .6, 0, 0]], saltatore: [3, [.1, 1.4, 0, 0], [0, .75, 0, 0]],
    esapode: [3, [.08, 1.2, 0, 0], [0, .45, 0, 0]], ottopode: [3, [.05, 1, 0, 0], [0, .5, 0, 0]], serpentino: [3, [.04, 1.4, 0, 0], [0, .4, 0, 0]], volatore: [4, [.12, 9, 0, 0], [0, .6, 0, 0]], medusa: [3, [.025, 2.5, 0, 0], [0, .35, .05, 0]]
};
const LEGS = { pascolatore: p => p.legs, cacciatore: p => p.legs, bipede: p => p.height * .55, esapode: p => p.legs * .9, ottopode: p => p.legs * .7 };
/** Distances of the levels of detail of the species (1.63.0): detailed shapes within LIFE_NEAR of the camera,
 * light ones up to LIFE_FAR, none beyond; the split is made again when the camera moves by LIFE_STEP. */
export const LIFE_NEAR = 40, LIFE_FAR = 260, LIFE_STEP = 6;
/** Share of the individuals drawn at each graphics setting; the golden ratio spreads the kept ones evenly. */
export const LIFE_SHARE = Object.freeze({ high: 1, balanced: .7, low: .4 });
/** The detailed shapes come closer to the camera at the lighter settings, chosen on phones. */
export const LIFE_NEAR_SHARE = Object.freeze({ high: 1, balanced: .8, low: .6 });
const kept = (i, share) => share >= 1 || (i * .6180339887) % 1 < share;
/** Settlements (1.64.0): buildings in two levels of detail within TOWN_NEAR and up to TOWN_FAR, inhabitants
 * within FOLK_NEAR and up to FOLK_FAR. Walkers go back and forth along a stretch of street (shader mode 7):
 * the slope of the stretch travels in the heading, as whole hundredths, seven units apart. */
export const TOWN_NEAR = 70, TOWN_FAR = 900, FOLK_NEAR = 26, FOLK_FAR = 180, WALK_SPEED = .9;
export const walkHeading = (h, slope) => (((h % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) + 7 * (Math.round(Math.max(-.5, Math.min(.5, slope)) * 100) + 50);
/** Ribbons of the streets and paths of the settlements, as one mesh following their points. */
function streetMesh(settlements, palette) {
    const v = [], i = [];
    for (const t of settlements) {
        const c = t.kind === 'colonia' ? palette.road : palette.path;
        for (const st of t.streets) {
            const P = st.points, h = st.width / 2, base = v.length / 12;
            P.forEach((p, k) => { const a = P[Math.max(0, k - 1)], b = P[Math.min(P.length - 1, k + 1)], dx = b[0] - a[0], dz = b[2] - a[2], l = Math.hypot(dx, dz) || 1, nx = -dz / l * h, nz = dx / l * h; v.push(p[0] + nx, p[1], p[2] + nz, 0, 1, 0, 0, k, ...c, p[0] - nx, p[1], p[2] - nz, 0, 1, 0, 1, k, ...c); });
            for (let k = 0; k + 1 < P.length; k++) { const a = base + k * 2; i.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
        }
    }
    return { v: new Float32Array(v.length ? v : 12), i: new Uint32Array(i.length ? i : [0, 0, 0]), stride: 12 };
}
const MESHES = { 'planet-beacon': beacon };
/** Colour of the marker of each kind of place. */
export const PLACE_TINTS = { vetta: [.95, .82, .45, 1], forma: [.55, .82, .98, 1], costa: [.45, .9, .85, 1], evento: [.95, .55, .85, 1], colonia: [1, .62, .3, 1], villaggio: [.75, .95, .45, 1] };
/** Drawn radius: the scale is illustrative, so planets of the units are enlarged to be read and
 * picked, ambient bodies slightly. Orbits keep their computed spacing. */
const clock = () => globalThis.performance?.now() ?? Date.now();
/** Half side of the terrain of a landing surface with its rings (1.62.0): 1792 units. */
export const HORIZON = CORE / 2 * 2 ** RINGS.length;
export const displayRadius = body => body.radius * (body.explorable ? 1.55 : 1.1);
/** Seed of the life of the systems: it changes with every run of the site, so routes and stocks differ. */
const SESSION = (globalThis.crypto?.getRandomValues ? globalThis.crypto.getRandomValues(new Uint32Array(1))[0] : Math.floor(Math.random() * 2 ** 32)) >>> 0;
/** Drone of the Sciame della Frontiera (1.49.0): a dark truncated octahedron with raised faces, a glowing
 * core and four spines, about one unit across, pointing towards +z. */
function droneMesh(core=[.45,.95,1,1],faces=[[.1,.12,.16,1],[.16,.2,.26,1],[.07,.09,.12,1]]){
    const st={hull:faces[0],dark:[.04,.05,.07,1],steel:[.28,.32,.4,1],trim:core,accent:core,glass:[.05,.1,.14,1],window:core,panel:[.04,.06,.1,1],seg:n=>n},k=new Kit(st);
    k.hull();polyhedron(k,'ottaedro troncato',[0,0,0],.62,faces,.06);
    k.glow(core,3.2);k.sphere([0,0,.58],.14,10,8);
    for(const [x,y] of [[1,0],[-1,0],[0,1],[0,-1]]){k.steel();k.beam([x*.4,y*.4,-.1],[x*.95,y*.95,-.55],.035);k.glow(core,2.6);k.sphere([x*.95,y*.95,-.55],.06,8,6);}
    return k.mesh();
}
/** Free drone (1.50.0): the same body in pale grey with a green core, once the key has cut its link. */
const FREE_CORE=[.55,1,.6,1],freeMesh=()=>droneMesh(FREE_CORE,[[.5,.54,.56,1],[.62,.66,.68,1],[.42,.46,.48,1]]);
/** Places of the ships of a formation (1.47.0), in sizes of the leader: side and distance behind. */
const WINGMEN=[[0,0],[1,1],[-1,1]];
/** Drawn size of a station of level 2 or 3 (1.46.0): an eighth larger for each level. */
const grown=state=>1+.125*((state?.level||1)-1);
/** Pairs of stations for the minor traffic: each station with its nearest neighbour, once per pair, with
 * two lights on short lanes and three on long ones. */
export function minorLanes(points){
    const pairs=new Map();
    points.forEach((p,a)=>{let best=-1,dist=Infinity;points.forEach((q,b)=>{if(b===a)return;const d=Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2]);if(d<dist){dist=d;best=b;}});if(best>=0){const key=Math.min(a,best)+':'+Math.max(a,best);if(!pairs.has(key))pairs.set(key,[Math.min(a,best),Math.max(a,best),dist>6?3:2]);}});
    return [...pairs.values()];
}
/** Glow of a far station or ship, in the colour of its construction style (src/craft/styles.js). */
const IDENTITY = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
/** Atmosphere of a planet for the shaders (1.59.0): outer radius of the shell, inverse scale height in radii,
 * optical scale and strength of the twilight, from the pressure at the ground `p` in bar and the haze of the
 * card. Between 0.01 and 100 bar the shell grows from 1.8 % to 6.8 % of the radius; no shell without air. */
export function shellOf(p, haze = .5) {
    if (!(p > 0)) return null;
    const s = Math.min(1, Math.max(0, (Math.log10(p) + 2) / 4)), thick = .018 + .05 * s;
    return [1 + thick, 4 / thick, (3 + 12 * s) * (.7 + .6 * haze), .25 + .75 * s];
}
/** What the docked ships are doing, for the panel «Che cosa succede» (1.58.0). */
const TASKS = { carica: 'Carica merci', scarica: 'Scarica merci', sosta: 'Sosta', osserva: 'Osserva il pianeta', varo: 'Appena varata', intercetta: 'In posizione di tiro', arrivo: 'Arrivo alla porta', partenza: 'Partenza' };
/** Distance of the camera from a followed object, in radii of the object, when the follow starts. */
export const FOLLOW_ZOOM = Object.freeze({ service: 9, ship: 8, station: 6, planet: 5, star: 3.6, comet: 7, belt: 3.2 }), FOLLOW_LIMITS = Object.freeze([2.2, 40]);
const CHAIN_IDS = new Set(CHAIN_STATIONS.map(e => e.id));
/** Layout of the follow mode (1.58.0) on a screen of w × h pixels: the panel «Che cosa succede» and the point
 * of the screen where the followed object sits, between the title and the panel on phones, between the list
 * of units and the panel on wide screens. */
export function followFrame(w, h) {
    // Short phones hide the title of the page while following, so the object has the band under the menu.
    if (w < 850) { const top = h < 700 ? 100 : 175, ph = Math.round(Math.max(200, Math.min(320, h - 100 - top - (h < 700 ? 110 : 180)))); return { panel: { x: 18, y: h - 100 - ph, w: w - 36, h: ph }, top, center: [w / 2, (top + h - 100 - ph) / 2] }; }
    const ph = Math.min(560, h - 360); return { panel: { x: w - 337, y: 245, w: 304, h: ph }, top: 235, center: [(300 + w - 337) / 2, (235 + h - 115) / 2] };
}
let physics = null;
/** Running light of each kind of service craft (1.57.0), seen from afar. */
const SERVICE_LIGHT = { navetta: [1, .86, .62], chiatta: [1, .78, .5], rimorchiatore: [1, .7, .45], container: [.9, .8, .6], minatore: [1, .62, .32], cisterna: [.75, 1, .8], scorta: [1, .45, .38], manutenzione: [.75, .88, 1] };
const CRAFT_TINTS = { matematica: [.95, .72, .4, 1], fisica: [.5, .7, 1, 1], chimica: [.71, .61, 1, 1], biologia: [.44, .83, .63, 1], civile: [1, .58, .4, 1], difesa: [.91, .4, .35, 1] };
/** Rotation of a moving part after `time`: angular speeds `w` around x, y and z (column-major, Ry · Rx · Rz). */
function spin(w, time) {
    const [rx, ry, rz] = w.map(v => v * time), [a, b, c, d, e, f] = [Math.cos(rx), Math.sin(rx), Math.cos(ry), Math.sin(ry), Math.cos(rz), Math.sin(rz)];
    return mul([c, 0, -d, 0, 0, 1, 0, 0, d, 0, c, 0, 0, 0, 0, 1], mul([1, 0, 0, 0, 0, a, b, 0, 0, -b, a, 0, 0, 0, 0, 1], [e, f, 0, 0, -f, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
}
// Earth maps become fictional worlds: mirrored in both directions and shifted in hue.
const DISGUISE = { earth: 1, 'earth-winter': 2 };
const normal = v => { let n = Math.hypot(...v) || 1; return v.map(x => x / n); }, cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function annulus(inner=1,outer=1.006,planetary=false) {
    const v = [], ix = [];
    for (let i = 0; i <= 128; i++) {
        const a = i * TAU / 128;
        for (let k = 0; k < 2; k++)
            v.push(Math.cos(a) * (k?outer:inner), 0, Math.sin(a) * (k?outer:inner), 0, 1, 0, planetary?k:i/128, planetary?.5:k, 1, 1, 1, 1);
        if (i < 128) {
            let n = 2 * i;
            ix.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
        }
    }
    return mesh(v, ix);
}
function orbitMesh(body){
 const v=[],ix=[];
 for(let j=0;j<=192;j++){
  const p=bodyAtTime(body,(j/192*TAU-body.phase)/body.speed).position;
  for(const k of [0,1])v.push(...p.map(x=>x*(1+k*.0035)),0,1,0,j/192,k,1,1,1,1);
  if(j<192){const n=j*2;ix.push(n,n+1,n+2,n+1,n+3,n+2);}
 }
 return mesh(v,ix);
}
export function box(sx = 1, sy = 1, sz = 1) {
    const v = [], ix = [];
    const ps = [[-sx, -sy, -sz], [sx, -sy, -sz], [sx, sy, -sz], [-sx, sy, -sz], [-sx, -sy, sz], [sx, -sy, sz], [sx, sy, sz], [-sx, sy, sz]], faces = [[0, 3, 2, 1, 0, 0, -1], [4, 5, 6, 7, 0, 0, 1], [0, 4, 7, 3, -1, 0, 0], [1, 2, 6, 5, 1, 0, 0], [3, 7, 6, 2, 0, 1, 0], [0, 1, 5, 4, 0, -1, 0]];
    for (const f of faces) {
        const n = v.length / 12;
        for (let k = 0; k < 4; k++)
            v.push(...ps[f[k]], ...f.slice(4), 0, 0, 1, 1, 1, 1);
        ix.push(n, n + 1, n + 2, n, n + 2, n + 3);
    }
    return mesh(v, ix);
}
function tube(a, b, r = .025) {
    const d = normal(b.map((v, i) => v - a[i])), u = normal(cross(d, Math.abs(d[1]) < .95 ? [0, 1, 0] : [1, 0, 0])), v0 = cross(d, u), v = [], ix = [];
    for (let end = 0; end < 2; end++)
        for (let j = 0; j < 6; j++) {
            let t = j * TAU / 6, n = u.map((v, i) => v * Math.cos(t) + v0[i] * Math.sin(t)), c = end ? b : a;
            v.push(...c.map((x, i) => x + r * n[i]), ...n, 0, 0, 1, 1, 1, 1);
        }
    for (let j = 0; j < 6; j++) {
        let k = (j + 1) % 6;
        ix.push(j, k, j + 6, k, k + 6, j + 6);
    }
    return mesh(v, ix);
}
function merge(parts) {
    let v = [], ix = [];
    for (const m of parts) {
        let o = v.length / 12;
        for (const x of m.v)
            v.push(x);
        for (const i of m.i)
            ix.push(o + i);
    }
    return mesh(v, ix);
}
export const RESEARCH = [
    { id: 'gaia', label: 'GAIA', discipline: 4, pos: [0, 0, 2], module: 'gaia' },
    { id: 'functions', label: 'FUNZIONI', discipline: 0, pos: [-8, 2, 0], module: 'math-c08' },
    { id: 'systems', label: 'SISTEMI', discipline: 0, pos: [-11, -2, -1], module: 'math-c04' },
    { id: 'probability', label: 'PROBABILITÀ', discipline: 0, pos: [-7, -5, 0], module: 'math-c10' },
    { id: 'iterations', label: 'ITERAZIONI', discipline: 0, pos: [-5, 6, -1], module: 'math-p08' },
    { id: 'radiation', label: 'RADIAZIONE', discipline: 1, pos: [6, 6, 0], module: 'physics-01' },
    { id: 'energy', label: 'BILANCIO ENERGETICO', discipline: 1, pos: [4, 2, 1], module: 'gaia', section: 1 },
    { id: 'albedo', label: 'ALBEDO', discipline: 1, pos: [1, -3, 1], module: 'gaia', section: 1 },
    { id: 'atmosphere', label: 'ATMOSFERA', discipline: 2, pos: [9, 1, -1], module: 'chemistry-01' },
    { id: 'carbon', label: 'CICLO DEL CARBONIO', discipline: 2, pos: [9, -5, 0], module: 'chemistry-02' },
    { id: 'populations', label: 'POPOLAZIONI', discipline: 3, pos: [-3, -4, 1], module: 'gaia', section: 2 },
    { id: 'ecosystem', label: 'ZONA ABITABILE', discipline: 3, pos: [3, -6, -1], module: 'biology-22' },
    { id: 'biodiversity', label: 'BIOFIRME', discipline: 3, pos: [-1, 7, -1], module: 'biology-33' },
    { id: 'feedback', label: 'RETROAZIONI', discipline: 4, pos: [0, 3, 1.5], module: 'gaia', section: 0 },
    { id: 'daisyworld', label: 'DAISYWORLD', discipline: 4, pos: [4, -1, 2], lab: 'daisyworld' },
    { id: 'exp', label: 'ESPONENZIALI', discipline: 0, pos: [-10, 6, -2], module: 'math-c06' }
];
export const EDGES = [[0, 13], [0, 14], [13, 1], [13, 6], [13, 12], [14, 6], [14, 7], [14, 10], [10, 11], [7, 8], [8, 9], [1, 2], [1, 3], [1, 4], [6, 5], [10, 15], [3, 12], [11, 9]];
const TINTS = [[.93, .78, .47, 1], [.38, .82, .91, 1], [.69, .57, .89, 1], [.59, .83, .56, 1], [.72, .95, .91, 1]];
export class World {
    constructor(gpu, textures, biomes) {
        this.R = gpu;
        this.textures = textures;
        this.biomes = biomes;
        this.biome = null;
        this.cameraScene = null;
        gpu.makeStars(backgroundStars(), true);
        this.systems = [];
        this.craft = { system: -1, list: [], models: [], instances: new Set() };
        this.cameraSpace = 'other';
        this.cameraSystem = 7;
        this.projections = [];
        this.eye = [0, 23, 54];
        this.target = [0, 0, 0];
        this.fov = .84;
        this.vp = null;
        this.activateBiome(7);
        for (const [id, m] of [['sphere', sphereMesh(48, 32)], ['lowSphere', sphereMesh(14, 10)], ['fineSphere', sphereMesh(144, 96)], ['box', box()], ['ring', annulus()], ['planet-rings',annulus(1.3,2.35,true)]])
            gpu.makeMesh(id, m);
        let r = random(123);
        this.debris = Array.from({length:180},()=>{const a=r()*TAU,d=6.4+r()*1.5;return {pos:[Math.cos(a)*d,(r()-.5)*.16+Math.sin(a)*.55,Math.sin(a)*d],size:.018+r()*.075,spin:r()*TAU};});
        EDGES.forEach(([i,j],k)=>gpu.makeMesh('research-edge-'+k,tube(RESEARCH[i].pos,RESEARCH[j].pos,.032)));
        gpu.makeMesh('research-links', merge(EDGES.map(([i, j]) => tube(RESEARCH[i].pos, RESEARCH[j].pos, .022))));
        this.patches = Array.from({ length: 180 }, (_, i) => { let y = 1 - 2 * (i + .5) / 180, a = i * Math.PI * (3 - Math.sqrt(5)), rr = Math.sqrt(1 - y * y); return [Math.cos(a) * rr, y, Math.sin(a) * rr]; });
    }
    activateBiome(index) {
        const key=planetProfile(index).biome;
        if(this.biome===key)return;
        this.biome=key;this.surface=this.biomes[key];
        this.terrain={height:new Map(this.surface.grid.cells.map((p,i)=>[String(i),p]))};
        this.towers=this.surface.stations.map(s=>s.position);
        this.trees=Array.from({length:this.surface.vegetationCount});
    }
    /** Landing surface generated from the planet's identity card; meshes are uploaded once per planet. */
    activatePlanet(index) {
        this.planetCache ||= new Map();
        let s = this.planetCache.get(index);
        if (!s) { s = planetSurface(index); this.planetCache.set(index, s); if (this.planetCache.size > 3) this.planetCache.delete(this.planetCache.keys().next().value); }
        this.surface = s; this.biome = s.key;
        if (this.uploadedPlanet !== s.key) {
            const R = this.R; R.makeMesh('planet-terrain', s.mesh);
            // The rings of the horizon (1.62.0, src/worlds/field.js): the planet seen from orbit around the landing site.
            R.makeMesh('planet-horizon', horizonMesh(s.genome, s.field));
            if (!this.planetMeshes) { R.makeMesh('world-tuft', tuft()); R.makeMesh('world-rock', rock()); R.makeMesh('planet-station', stationMesh()); R.makeMesh('planet-sea', seaPlane(900, 900, 180, 180)); R.makeMesh('planet-sea-far', seaRing(HORIZON, 448)); for (const [id, make] of Object.entries(MESHES)) R.makeMesh(id, make()); this.planetMeshes = true; }
            // Species, rocks, geyser plume and aurora of this planet.
            const sc = surfaceScatter(s), pack = l => { const a = new Float32Array(Math.max(1, l.length) * 8); l.forEach((o, i) => a.set([o.x, o.y, o.z, o.s, o.r, o.g, o.b, o.h], i * 8)); return a; };
            this.population = sc.species; this.planetCounts = [sc.species.reduce((n, p) => n + p.instances.length, 0), sc.rocks.length]; this.lifeAt = null;
            if (R.makeInstances) {
                for (const G of this.groups || []) for (const l of [0, 1]) { R.deleteInstances?.(G.sets[l]); R.deleteMesh?.(G.meshes[l]); }
                R.makeInstances('planet-rocks', 'world-rock', pack(sc.rocks));
                // Groups drawn with instances in two levels of detail, each with two meshes and two instance sets
                // with room for all its items: the species, the buildings of each type, the inhabitants of each figure.
                const groups = this.groups = [], group = (name, mesh, items, o) => {
                    const G = { meshes: [0, 1].map(l => o.meshIds ? o.meshIds[l] : `${name}-mesh-${l}`), sets: [0, 1].map(l => `${name}-${l}`), all: pack(items), items, n: items.length, drawn: [0, 0], ...o };
                    for (const l of [0, 1]) { R.makeMesh(G.meshes[l], mesh(l)); if (items.length) R.makeInstances(G.sets[l], G.meshes[l], G.all); }
                    groups.push(G); return G;
                };
                sc.species.forEach((p, k) => {
                    const sp = p.species, legs = LEGS[sp.form];
                    p.life = group(`life-${k}`, l => bodyMesh(sp.plan, l), p.instances, { meshIds: [`life-mesh-${k}-0`, `life-mesh-${k}-1`], mode: LIFE[sp.form][0], motion: legs ? [...LIFE[sp.form][1].slice(0, 3), legs(sp.plan)] : LIFE[sp.form][1], pbr: LIFE[sp.form][2], near: LIFE_NEAR, far: LIFE_FAR, thin: true });
                });
                (s.settlements || []).forEach((t, a) => {
                    Object.entries(t.types).forEach(([type, spec], b) => group(`town-${a}-${b}`, l => buildingMesh(spec, l), t.buildings.filter(x => x.type === type).map(x => ({ x: x.x, y: x.y, z: x.z, s: x.s, r: x.tint[0], g: x.tint[1], b: x.tint[2], h: x.h })), { mode: 1, motion: [0, 0, 0, 0], pbr: [.05, .8, 0, 4], near: TOWN_NEAR, far: TOWN_FAR, thin: false }));
                    t.figures.forEach((f, b) => group(`folk-${a}-${b}`, l => t.kind === 'colonia' ? colonistMesh(f, l) : nativeMesh(f, l), t.walkers.filter(w => w.figure === b).map(w => ({ x: w.x, y: w.y, z: w.z, s: w.s, r: w.tint[0], g: w.tint[1], b: w.tint[2], h: walkHeading(w.h, w.slope) })), { mode: 7, motion: [WALK_SPEED, WALK[t.kind], 0, t.kind === 'colonia' ? f.legs : nativeLegs(f)], pbr: [0, .75, 0, 0], near: FOLK_NEAR, far: FOLK_FAR, thin: true }));
                });
                const rock = s.genome.palette.rock, sealed = s.genome.atmosphere.density < .3;
                R.makeMesh('planet-streets', streetMesh(s.settlements || [], { road: sealed ? [...rock.map(v => .35 + v * .25), 1] : [.27, .27, .29, 1], path: [...rock.map(v => v * .55 + .18), 1] }));
                R.deleteInstances?.('planet-geyser');
                const geyser = s.places.find(p => p.event === 'eruzione di geyser');
                if (geyser) { const r = random(s.index + 77), q = geyser.position; R.makeInstances('planet-geyser', 'lowSphere', pack(Array.from({ length: 46 }, () => ({ x: q[0] + (r() - .5) * 1.2, y: q[1] + .2, z: q[2] + (r() - .5) * 1.2, s: .7 + r() * .8, r: .92, g: .94, b: .96, h: r() * 6.283 })))); }
            }
            if (s.genome.events.includes('aurora')) R.makeMesh('planet-aurora', curtain(Math.atan2(-Math.cos(.6), -Math.sin(.6)) - .35, 1.5, s.index % 7));
            this.aurora = s.genome.events.includes('aurora');
            this.uploadedPlanet = s.key; this.builtWorld = null; this.towers = s.stations.map(t => t.position); this.terrain = { height: new Map(s.grid.cells.map((p, i) => [String(i), p])) };
        }
    }
    /** Splits the individuals of each species between the detailed and the light mesh by their distance from
     * the camera (1.63.0); runs again only when the camera has moved by LIFE_STEP or the graphics changed. */
    lifeSplit(force = false) {
        const R = this.R, groups = this.groups, e = this.eye; if (!groups || !R.updateInstances || !e) return;
        const q = R.sceneQuality || 'high', last = this.lifeAt;
        if (!force && last && last[2] === q && Math.hypot(e[0] - last[0], e[2] - last[1]) < LIFE_STEP) return;
        this.lifeAt = [e[0], e[2], q];
        const scratch = this.lifeScratch ||= [new Float32Array(0), new Float32Array(0)];
        for (const L of groups) {
            const n = L.n; if (!n) continue;
            const share = L.thin ? LIFE_SHARE[q] ?? 1 : 1, near = L.near * (LIFE_NEAR_SHARE[q] ?? 1);
            if (scratch[0].length < n * 8) { scratch[0] = new Float32Array(n * 8); scratch[1] = new Float32Array(n * 8); }
            const c = [0, 0];
            for (let i = 0; i < n; i++) {
                if (!kept(i, share)) continue;
                const o = L.items[i], d = Math.hypot(o.x - e[0], o.z - e[2]); if (d > L.far) continue;
                const l = d < near ? 0 : 1; scratch[l].set(L.all.subarray(i * 8, i * 8 + 8), c[l]++ * 8);
            }
            for (const l of [0, 1]) { R.updateInstances(L.sets[l], scratch[l].subarray(0, c[l] * 8)); L.drawn[l] = c[l]; }
        }
    }
    /** Orbit map of explorable planet `index`, generated from its identity card. A 128 × 64 map is made at
     * once; 512 × 256 maps and, for the planet seen from orbit, a 1024 × 512 map are built a few rows per
     * frame in orbitTick. Least recently used maps are released (12 medium, 3 large). */
    orbitTexture(index, detailed) {
        const R = this.R; if (!R.uploadPixels) return null;
        const M = this.orbitMaps ||= { low: new Map(), mid: new Map(), high: new Map(), jobs: [] }, g = planetGenomes()[index];
        if (!M.low.has(index)) { const m = orbitMap(g, 128, 64); m.step(); M.low.set(index, R.uploadPixels(128, 64, m.pixels)); }
        const want = (tier, w, h, keep) => {
            const cache = M[tier];
            if (cache.has(index)) { const t = cache.get(index); cache.delete(index); cache.set(index, t); return t; }
            if (!M.jobs.some(j => j.index === index && j.tier === tier)) M.jobs.push({ index, tier, keep, map: orbitMap(g, w, h) });
            return null;
        };
        const mid = want('mid', 512, 256, 12), high = detailed ? want('high', 1024, 512, 3) : null;
        return high || mid || M.low.get(index);
    }
    /** Advances the pending orbit maps for about `ms` milliseconds; the planet seen from orbit goes first. */
    orbitTick(ms = 6, first = -1) {
        const M = this.orbitMaps; if (!M?.jobs.length) return;
        M.jobs.sort((a, b) => (b.index === first) - (a.index === first) || (a.tier === 'mid' ? 0 : 1) - (b.tier === 'mid' ? 0 : 1));
        const job = M.jobs[0];
        if (!job.map.step(ms)) return;
        M.jobs.shift(); const cache = M[job.tier];
        cache.set(job.index, this.R.uploadPixels(job.map.width, job.map.height, job.map.pixels));
        while (cache.size > job.keep) { const oldest = cache.keys().next().value; this.R.gl?.deleteTexture(cache.get(oldest)); cache.delete(oldest); }
    }
    bindStars(stars, modules) {
        this.systems=buildSystems(stars,modules);this.cosmos=createCosmos(this.systems);this.R.cosmos=this.cosmos;enrichCosmicStars(stars,this.cosmos,this.systems);
        for(const system of this.systems){
            for(const body of system.bodies)this.R.makeMesh('orbit-'+body.id,orbitMesh(body));
            // Belts and comets (1.60.0, src/scene/comete.js): an icy belt in every system, a rocky one where a gap
            // between the planets leaves room near the snow line, one or two comets with their meteoroid streams;
            // the meshes of the belts are built when the system is drawn.
            minorBodies(system);
            if(this.R.makeInstances)system.comets.forEach((c,k)=>{const p=streamOf(c,system.map),d=new Float32Array(p.length/3*8);for(let j=0;j<p.length/3;j++)d.set([p[j*3],p[j*3+1],p[j*3+2],.022,.82,.74,.6,.24],j*8);this.R.makeInstances(`stream-${system.id}-${k}`,'lowSphere',d);});
        }
        this.R.makeMesh('comet-ion',unitTail(.025));this.R.makeMesh('comet-dust',unitTail(.085,.3));
        return this.systems;
    }
    systemPosition(id) { return this.systems[id]?.position || [0,0,0]; }
    galacticCamera(camera) {
        if(camera.space!=='system')return {eye:camera.eye,target:camera.target,fov:camera.fov};
        const origin=this.systemPosition(camera.system);
        return {eye:camera.eye.map((v,i)=>origin[i]+v*SYSTEM_SCALE),target:camera.target.map((v,i)=>origin[i]+v*SYSTEM_SCALE),fov:camera.fov};
    }
    desiredCamera(scene,s) {
        const w=this.R.w,h=this.R.h,system=s.system??systemForPlanet(s.selected);let eye,target=[0,0,0],fov=.84,space='other';
        if(scene==='galaxy'){
            ({eye,target}=galaxyCamera(s,w,h));space='galaxy';
        }else if(scene==='system'){
            const distance=s.distance*Math.max(1,systemArchitecture(system).outerRadius/13)*Math.max(1,1.05/(w/h)),pitch=s.pitch;
            eye=[Math.sin(s.yaw)*distance*Math.cos(pitch),distance*Math.sin(pitch),Math.cos(s.yaw)*distance*Math.cos(pitch)];target=w<850?[0,0,0]:[2.4,0,0];fov=.78;space='system';
            // A followed object (1.58.0): the camera turns around it at a distance measured in its radii, with
            // the object left of the panel on wide screens and above it on phones.
            const F=this.followed=s.follow?this.followSubject(s):null;
            if(F){
                const d=Math.max(.1,(s.followZoom||FOLLOW_ZOOM[F.kind])*F.radius),dir=[Math.sin(s.yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(s.yaw)*Math.cos(pitch)];
                const right=normal(cross(dir.map(v=>-v),[0,1,0])),up=cross(right,dir.map(v=>-v)),k=Math.tan(fov/2)*d,[cx,cy]=followFrame(w,h).center,nx=2*cx/w-1,ny=1-2*cy/h;
                const shift=right.map((v,i)=>-v*nx*k*w/h-up[i]*ny*k);
                target=F.position.map((v,i)=>v+shift[i]);eye=target.map((v,i)=>v+dir[i]*d);
            }
        }else if(scene==='orbit'){
            // The camera sits about 65° away from the star direction, so the day/night line is visible.
            const body=systemPlanet(s.selected,s.time),phone=w<850,angle=s.yaw*.45+Math.atan2(-body.position[0],-body.position[2])+1.15,pitch=.14+(s.pitch-.45)*.35,scale=displayRadius(body)/5.3,distance=(s.distance||22)*(phone?1.38:1);
            const heroEye=[Math.sin(angle)*distance*Math.cos(pitch),Math.sin(pitch)*distance,Math.cos(angle)*distance*Math.cos(pitch)];
            // Wide screens: planet left of the card. Phones: planet in the upper half, card below.
            const framing=phone?[0,-4.6,0]:[Math.cos(angle)*2,0,-Math.sin(angle)*2];
            eye=heroEye.map((v,i)=>body.position[i]+(v+framing[i])*scale);target=body.position.map((v,i)=>v+framing[i]*scale);space='system';
        }else if(scene==='surface'){
            // Prototype worlds may ask for their own framing (for example a low camera for the sky).
            // Generated surfaces use a lower camera with the horizon in view; the old surfaces keep theirs.
            // In exploration (blend b from 0 to 1) the camera follows a focus point on the ground, closer and higher.
            const gen=this.surface?.heightAt,b=gen&&s.exploreFocus?(s.exploreBlend??1):0,wc=b>0?null:s.worldCamera,angle=.6+s.yaw*.5,base=wc?wc.pitch:gen?.2+.22*b:.58,pitch=Math.max(gen||wc?.06:.24,Math.min(.96,base+(s.pitch-.45)*.6)),distance=wc?wc.distance:gen?64+((w<850?42:36)-64)*b:52;
            const fc=s.worldFocus,x0=w<850?(fc?fc[0]:gen?-4:-3):gen?2:3,z0=w<850?(fc?fc[1]:gen?8:-1):gen?2:-2,tx=b?x0+(s.exploreFocus[0]-x0)*b:x0,tz=b?z0+(s.exploreFocus[1]-z0)*b:z0,ty=wc?wc.targetY:gen?Math.max(this.surface.seaY??-99,this.surface.heightAt(tx,tz))+3:1.8;
            eye=[tx+Math.sin(angle)*distance*Math.cos(pitch),Math.sin(pitch)*distance+2+(gen?ty-3:0),tz+Math.cos(angle)*distance*Math.cos(pitch)];target=[tx,ty,tz];fov=gen?.72:.60;
            // Since 1.64.0 the roofs of the settlements count as ground for the camera.
            if(gen){const roof=this.surface.clear?.roofAt,ground=(x,z)=>Math.max(this.surface.heightAt(x,z),this.surface.seaY??-99,roof?roof(x,z):-99);eye[1]=Math.max(eye[1],ground(eye[0],eye[2])+5);
                // The relief of the planet (1.62.0) may rise between the camera and the target or the stations: the
                // camera goes up until the lines of sight pass at least 1.5 units over the ground.
                let lift=0;for(const end of [target,...(b>0?[]:this.surface.stations.map(st=>st.position))])for(let k=1;k<20;k++){const t=k/20,x=eye[0]+(end[0]-eye[0])*t,z=eye[2]+(end[2]-eye[2])*t,y=eye[1]+(end[1]-eye[1])*t;lift=Math.max(lift,(ground(x,z)+1.5-y)/(1-t));}
                eye[1]+=lift;}
        }else if(scene==='craft'){
            // The 3D catalogue (1.51.0): one model at the centre with radius 3; on phones it sits above the card.
            const d=(s.distance||11)*Math.max(1,1/(w/h)),p=.12+(s.pitch-.45)*.8;eye=[Math.sin(s.yaw)*d*Math.cos(p),Math.sin(p)*d,Math.cos(s.yaw)*d*Math.cos(p)];target=w<850?[0,-1.8,0]:[0,-.3,0];fov=.62;
        }else if(scene==='research')eye=[Math.sin(s.yaw*.12)*3,1,37];
        else if(scene==='lab'&&s.lab==='daisyworld')eye=[0,4,30];
        else eye=[0,5,32];
        return {eye,target,fov,space,system};
    }
    camera(scene,s) {
        const desired=this.desiredCamera(scene,s),key=viewKey(scene,s)+(scene==='system'&&s.follow&&this.followed?'|'+followKey(s.follow):''),previous=this.cameraSpace;
        if(this.cameraScene!==key){
            this.cameraFrom=this.vp?{eye:[...this.eye],target:[...this.target],fov:this.fov,space:this.cameraSpace,system:this.cameraSystem}:null;
            this.cameraProgress=0;this.cameraScene=key;
            this.bridge=!!this.cameraFrom&&((previous==='galaxy'&&desired.space==='system')||(previous==='system'&&desired.space==='galaxy'));
            this.travelSystem=desired.space==='system'?desired.system:this.cameraSystem;
        }
        this.cameraProgress=Math.min(1,this.cameraProgress+Math.min(80,Math.max(0,s.lastFrameMs||16))/(this.bridge?1750:950));
        if(s.paused||!this.cameraFrom)this.cameraProgress=1;
        const t=this.cameraProgress*this.cameraProgress*(3-2*this.cameraProgress);
        let from=this.cameraFrom,to=desired;
        this.travelling=this.bridge&&this.cameraProgress<1;
        if(this.travelling){from=this.galacticCamera(from);to=this.galacticCamera(desired);}
        // Different unrelated teaching scenes use the destination frame directly.
        if(!this.travelling&&from&&from.space!==desired.space)from=null;
        if(from&&t<1){
            const a=from.eye.map((v,i)=>v-from.target[i]),b=to.eye.map((v,i)=>v-to.target[i]),da=Math.hypot(...a),db=Math.hypot(...b);
            let direction=a.map((v,i)=>v/da*(1-t)+b[i]/db*t);direction=normal(Math.hypot(...direction)<.001?b:direction);
            const distance=Math.exp(Math.log(Math.max(.00001,da))*(1-t)+Math.log(Math.max(.00001,db))*t);
            const targetT=this.travelling?(desired.space==='system'?1-Math.pow(1-t,3):Math.pow(t,3)):t;
            this.target=from.target.map((v,i)=>v*(1-targetT)+to.target[i]*targetT);this.eye=this.target.map((v,i)=>v+direction[i]*distance);this.fov=from.fov*(1-t)+to.fov*t;
        }else{this.eye=[...to.eye];this.target=[...to.target];this.fov=to.fov;}
        this.cameraSpace=this.travelling?'galaxy':desired.space;this.cameraSystem=this.travelling?this.travelSystem:desired.system;
        // Landing surfaces reach the haze of the horizon at HORIZON units (1.62.0).
        const ground=scene==='surface'&&!!this.surface?.field;
        this.vp=mul(perspective(this.fov,this.R.w/this.R.h,this.cameraSpace==='galaxy'?.00004:ground?.05:.012,ground?HORIZON*2.2:400),lookAt(this.eye,this.target));
        const cosmic=this.galacticCamera({eye:this.eye,target:this.target,fov:this.fov,space:this.cameraSpace,system:this.cameraSystem});
        this.galaxyEye=cosmic.eye;this.galaxyTarget=cosmic.target;
        this.galaxyVP=mul(perspective(this.fov,this.R.w/this.R.h,.00004,500),lookAt(cosmic.eye,cosmic.target));
    }
    drawPlanet(body,time,center,radius,light,detailed=false,tint=null) {
        const moons=Array.from({length:body.moons},(_,j)=>{const a=time*(.06/(j+1))+body.phase+j*2.4,d=radius*(2.8+j*.65);return {center:center.map((v,i)=>v+[Math.cos(a)*d,Math.sin(a)*d*.12,Math.sin(a)*d][i]),radius:radius*(.12+j*.025),angle:a};});
        // Explorable planets use the map generated from their identity card, so orbit and surface agree.
        const card=body.explorable?planetGenomes()[body.index]:null,generated=card?this.orbitTexture(body.index,detailed):null,sky=card?card.atmosphere.sky:null,skyMax=sky?Math.max(...sky,.01):1;
        // A sharper map fades in over 0.6 s instead of replacing the previous one at once (1.62.0).
        let fadeFrom=null,fade=1;
        if(generated){const F=this.mapFades??=new Map(),now=clock(),e=F.get(body.index);if(!e)F.set(body.index,{tex:generated,prev:null,t0:now});else if(e.tex!==generated){F.set(body.index,{tex:generated,prev:e.tex,t0:now});}const f=F.get(body.index);if(f.prev&&this.R.gl?.isTexture&&!this.R.gl.isTexture(f.prev))f.prev=null;if(f.prev){fade=(now-f.t0)/600;if(fade>=1)f.prev=null;else fadeFrom=f.prev;}}
        const R=this.R,profile=body.profile,options={eye:this.eye,light,material:12,center,radius,textureFrom:fadeFrom,textureFade:fade,texture:generated||this.planetTextures?.get(profile.texture,detailed)||this.textures[profile.texture],atmosphere:generated?sky.map(v=>v/skyMax*.9):profile.atmosphere,ocean:generated?false:profile.ocean,disguise:generated?0:DISGUISE[profile.texture]||0,tint:tint||[1,1,1,1],occluders:moons.map(m=>[...m.center,m.radius])},size=radius/5.3;
        // The atmosphere follows the card: pressure from its density, haze, sky (1.59.0).
        const pressure=generated?(card.atmosphere.density<APPRECIABLE_DENSITY?0:pressureFromDensity(card.atmosphere.density)):profile.atmosphere?(body.type==='desert'?.07:1):0,air=shellOf(pressure,generated?card.atmosphere.haze:.5);options.shell=air||[0,0,0,0];
        const geometry=this.R.meshes.has('planet-'+profile.texture)?'planet-'+profile.texture:detailed?'fineSphere':'sphere',rotation=time*body.spin+body.rotation;
        const model=transform(...center,radius,rotation,body.tilt);R.drawMesh(geometry,this.vp,model,options);
        // The landing site (1.62.0, src/worlds/landing-sites.js) as a small light on the planet seen from orbit,
        // on the side facing the camera: «Scendi in superficie» lands there.
        if(detailed&&card&&LANDING_SITES[body.index]){const [x,y,z]=LANDING_SITES[body.index],p=[0,1,2].map(i=>model[i]*x+model[4+i]*y+model[8+i]*z+model[12+i]),n=normal(p.map((v,i)=>v-center[i]));
            if(n.reduce((a,v,i)=>a+v*(this.eye[i]-p[i]),0)>0){const q=p.map((v,i)=>v+n[i]*radius*.01);R.drawMesh('lowSphere',this.vp,transform(...q,radius*.018),{eye:this.eye,material:17,tint:[1,.82,.35,1],opacity:.95,radius:radius*.018,center:q});this.landingMark=q;}else this.landingMark=null;}
        // Clouds and atmosphere follow the card: cloud cover and density decide whether and how strongly they show.
        const clouds=generated?(card.atmosphere.clouds>0?Math.min(.9,card.atmosphere.clouds*1.4):0):profile.clouds?.9:0;
        if(clouds)R.drawMesh(geometry,this.vp,transform(...center,radius*1.006,rotation+time*.002,body.tilt),{...options,texture:this.planetTextures?.get('clouds',detailed)||this.textures.clouds,material:5,opacity:clouds});
        if(air)R.drawMesh(geometry,this.vp,transform(...center,radius*air[0]),{...options,material:6,opacity:.95});
        if(body.rings)R.drawMesh('planet-rings',this.vp,transform(...center,radius,0,body.tilt),{eye:this.eye,light,texture:this.textures.rings,material:13,opacity:.88});
        for(const moon of moons)R.drawMesh(detailed?'sphere':'lowSphere',this.vp,transform(...moon.center,moon.radius,moon.angle),{eye:this.eye,light,material:12,texture:this.textures.moon,occluders:[[...center,radius]]});
        if(detailed&&body.explorable){
            const probe=center.map((v,i)=>v+[-4.9,-2.6,2.1][i]*size);
            R.drawMesh('box',this.vp,transform(...probe,.07*size,.3),{eye:this.eye,light,tint:[.76,.68,.47,1]});
            for(const side of [-1,1]){const m=transform(probe[0]+side*.24*size,probe[1],probe[2],.1*size,.3);for(const i of [0,1,2])m[i]*=1.55;for(const i of [4,5,6])m[i]*=.08;R.drawMesh('box',this.vp,m,{eye:this.eye,light,tint:[.08,.18,.29,1]});}
        }
    }
    drawSystem(s) {
        const R=this.R,id=this.travelling?this.travelSystem:s.system,system=this.systems[id];if(!system)return;
        const scale=this.cameraSpace==='galaxy'?SYSTEM_SCALE:1,origin=this.cameraSpace==='galaxy'?system.position:[0,0,0];
        const map=p=>p.map((v,i)=>origin[i]+v*scale),starColor=systemStarLight(id),starRadius=system.starRadius*scale;
        R.drawMesh('fineSphere',this.vp,transform(...origin,starRadius,s.time*.025),{eye:this.eye,material:9,tint:[...starColor,1],seed:id,radius:starRadius,center:origin});
        R.drawMesh('sphere',this.vp,transform(...origin,starRadius*1.19),{eye:this.eye,material:11,tint:[...starColor,1],opacity:.75,radius:starRadius,center:origin});
        // Soft glow in the colour of the star, brightest towards the centre of the disc.
        if(s.scene!=='galaxy')R.drawMesh('sphere',this.vp,transform(...origin,starRadius*2.8),{eye:this.eye,material:17,tint:[...starColor,1],opacity:.9,radius:starRadius,center:origin});
        // Belts (1.60.0): every ring turns with the angular speed of an orbit at its radius, inner rings faster.
        // Their meshes are built when a system is first drawn; the belts of the three systems drawn last stay.
        if(system.belts&&!this.beltBuilt?.includes(id)){
            const rock=this.beltRock??=sphereMesh(6,4);this.beltBuilt??=[];
            system.belts.forEach((b,k)=>{b.rings.forEach((_,j)=>R.makeMesh(`belt-${id}-${k}-${j}`,beltRing(b,j,rock,Math.round(b.count/b.rings.length))));R.makeMesh(`belt-dust-${id}-${k}`,dustBand(b));});
            this.beltBuilt.push(id);
            if(this.beltBuilt.length>3){const old=this.beltBuilt.shift();this.systems[old].belts.forEach((b,k)=>{b.rings.forEach((_,j)=>R.deleteMesh?.(`belt-${old}-${k}-${j}`));R.deleteMesh?.(`belt-dust-${old}-${k}`);});}
        }
        (system.belts||[]).forEach((b,k)=>{
            const icy=b.kind==='ghiacciata';
            b.rings.forEach((ring,j)=>R.drawMesh(`belt-${id}-${k}-${j}`,this.vp,transform(...origin,scale,-ring.omega*s.time),{eye:this.eye,center:origin,material:15,texture:this.textures.moon,tint:icy?[.85,.93,1,1]:[1,.9,.78,1]}));
            R.drawMesh(`belt-dust-${id}-${k}`,this.vp,transform(...origin,scale),{eye:this.eye,material:14,tint:icy?[.62,.78,1,1]:[.95,.76,.52,1],opacity:icy?.8:.95});
        });
        // Comets on their ellipses: nucleus, coma and tails grow near the star; the ion tail points away from it,
        // the dust tail bends back along the orbit. The meteoroid stream marks the whole orbit.
        (system.comets||[]).forEach((c,k)=>{
            const st=cometState(c,s.time,system.map,system.star),head=map(st.position),act=st.activity,coma=(.05+.22*Math.sqrt(act))*scale;
            R.drawMesh('lowSphere',this.vp,transform(...head,.045*scale),{eye:this.eye,material:12,texture:this.textures.moon,light:st.out.map(v=>-v)});
            if(R.instanceSets?.has(`stream-${id}-${k}`))R.drawMesh('lowSphere',this.vp,transform(...origin,scale),{eye:this.eye,material:17,instances:`stream-${id}-${k}`,instanceMode:6,blend:true});
            if(act>0){
                R.drawMesh('sphere',this.vp,transform(...head,coma*2.6),{eye:this.eye,material:17,tint:[.72,.88,1,1],opacity:.45+.45*act,radius:coma,center:head});
                const ion=(.4+7*act**.7)*scale,dust=(.3+5*act**.7)*scale,trail=normal(st.out.map((v,i)=>v*.85-st.ahead[i]*.5));
                R.drawMesh('comet-ion',this.vp,basisMatrix(head,st.out,st.ahead.map(v=>-v),ion),{eye:this.eye,material:14,tint:[.25,.62,1,1],opacity:.75*Math.min(1,act*3)});
                R.drawMesh('comet-dust',this.vp,basisMatrix(head,trail,st.ahead.map(v=>-v),dust),{eye:this.eye,material:14,tint:[.85,.72,.45,1],opacity:.6*Math.min(1,act*3)});
            }
            if(s.scene==='system'&&!this.travelling){const xy=project(head,this.vp,R.w,R.h),apparent=coma*R.h/(2*Math.tan(this.fov/2)*xy[2]);this.projections.push({type:'comet',index:k,follow:{kind:'comet',k},name:c.name,lines:[`A ${dec2(st.r)} UA dalla stella, ${dec1(st.v)} km/s`,act>0?`Coda attiva al ${Math.round(act*100)} %`:'Nucleo spento, lontano dalla stella'],...xyToObj(xy),r:Math.max(11,apparent*1.3),position:head,worldRadius:coma});}
        });
        for(const body of system.bodies){
            const p=bodyAtTime(body,s.time),center=map(p.position),radius=displayRadius(p)*scale;
            // Orbits of the units in the colour of the discipline; the others stay faint.
            if(s.scene!=='orbit')R.drawMesh('orbit-'+body.id,this.vp,transform(...origin,scale),{eye:this.eye,material:16,tint:body.explorable?DISCIPLINE[body.sector]:[.5,.56,.64,1],opacity:body.explorable?(body.index===s.selected?.95:.68):.14});
            this.drawPlanet(p,s.time,center,radius,normal(p.position.map(v=>-v)),s.scene==='orbit'&&body.index===s.selected,body.index===s.selected?s.worldTint:null);
            const xy=project(center,this.vp,R.w,R.h),apparent=radius*R.h/(2*Math.tan(this.fov/2)*xy[2]);
            if(s.scene==='system'&&!this.travelling)this.projections.push({type:body.explorable?'planet':'ambient',index:body.explorable?body.index:body.slot,body,...xyToObj(xy),r:Math.max(11,apparent*1.12),position:center,worldRadius:radius});
        }
        if(!this.travelling&&this.cameraSpace==='system')this.drawStations(s,id,system);
    }
    /** Stations and ships of the open system (src/craft/). Only that system is built, and the meshes of the
     * previous system are released. Models come from the factory (src/craft/factory.js, a module worker in
     * the browser): first the low level of detail of every station and ship, then the full model of what
     * comes near the camera (src/craft/detail.js). Ships of one class share their mesh and are drawn in one
     * instanced call. The economy of the system (src/craft/economy.js) runs while the system is open and
     * keeps its state for the rest of the visit; its seed changes with every run of the site. Far stations
     * and ships are points of light in the colour of their style, near ones are drawn whole, with running
     * lights, engine flames and the goods moving while a ship docks. */
    drawStations(s,id,system) {
        const R=this.R,C=this.craft,F=this.factory??=new CraftFactory();
        if(C.system!==id){
            this.releaseCraft();F.clear();
            // The six stations and four ships of the catalogue, the stations of the grammar (1.43.0), its ships
            // (1.44.0) and the defence of the system (1.47.0).
            const entries=[...systemCraft(id),...systemExtras(id),...systemShipExtras(id),...systemDefence(id),...systemDefenceShips(id)];C.system=id;
            C.list=placeStations(system,entries,displayRadius).map((placement,k)=>({entry:placement.entry,placement,prefix:'craft-'+k,levels:[null,null]}));
            C.models=entries.filter(e=>e.kind==='nave').map((entry,j)=>({entry,prefix:'ship-'+j,levels:[null,null]}));
            C.sites={time:null,hosts:new Map()};
            const site=place=>this.craftSite(system,place,C.siteTime??s.time);
            this.lives??=new Map();
            if(!this.lives.has(id))this.lives.set(id,new Economy({stations:C.list.map(item=>item.placement.entry),ships:C.models.map(m=>m.entry),bodies:system.bodies.map(b=>b.slot),seed:SESSION^Math.imul(id+1,0x27D4EB2F),time:s.time,neighbours:this.neighbourNames(id),position:place=>site(place).position,distance:(a,b)=>{const p=site(a).position,q=site(b).position;return Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2]);}}));
            C.life=this.lives.get(id);C.lanes=null;C.serviceKey=null;
        }
        const items=[...C.list,...C.models];
        for(const item of items)if(!item.levels[1])F.want(item.entry,LOW_DETAIL);
        F.pump();
        for(const item of items)for(const level of [1,0])if(!item.levels[level]){const m=F.take(item.entry,level?LOW_DETAIL:1);if(m)this.uploadCraft(item,level,m);}
        C.siteTime=s.time;C.hosts=new Map();
        const life=C.life.update(s.time),site=place=>this.craftSite(system,place,s.time),avoid=system.starRadius*2.2+1;
        // The Sciame della Frontiera (1.49.0): an incursion on this system is fought here, and its outcome goes
        // back to the front; the Cronaca della frontiera enters the news of the system.
        const FR=this.frontier;
        if(FR&&life.threats){
            for(const r of FR.raids)if(!r.settled&&!r.live&&r.system===id){FR.goLive(r,s.time);life.threats.spawn('incursione',{n:r.n,raid:r,freed:FR.freedBy(r.arm,r.n)});}
            life.threats.onRaid=ev=>{if(ev.raid)FR.settle(ev.raid,ev.outcome,ev.killed,ev.freed);};
            life.helpers=FR.freed.get(id)||0;
            life.frontSeen??=FR.serial;for(const e of FR.log)if(e.n>life.frontSeen)life.tell('Fronte: '+e.text);life.frontSeen=FR.serial;
        }
        const k2=2*Math.tan(this.fov/2),lightColor=systemStarLight(id).map(v=>v*.8),shadowKey=R.shadowKey;R.shadowKey=null;
        // Glows are collected and drawn at the end in one instanced call, after every hull.
        const glows=[],glow=(p,r,tint,opacity)=>glows.push(p[0],p[1],p[2],r,tint[0],tint[1],tint[2],opacity);
        const lights=(m,mats,size,flame)=>{for(const l of m.lights){
            const M=mats[l.part],p=[0,1,2].map(i=>M[i]*l.p[0]+M[4+i]*l.p[1]+M[8+i]*l.p[2]+M[12+i]),on=!l.blink?1:l.blink<0?(((s.time*1.1+l.blink)%1+1)%1<.3?1:.12):(Math.sin(s.time*TAU*l.blink)>-.2?1:.15),f=l.flame?flame:1;
            if(f>.04)glow(p,l.size*size/m.radius*(l.flame?f:2.4),l.color,(l.flame?.85:.95)*on);}};
        const turning=(m,base)=>m.parts.map(p=>p.spin?mul(base,spin(p.spin,s.time)):base);
        // Where everything is this frame, then one level of detail each.
        const seen=[];
        C.list.forEach((item,k)=>{const pos=site({station:k}).position,xy=project(pos,this.vp,R.w,R.h);if(xy[2]<=0)return;const pixel=xy[2]*k2/R.h,size=item.placement.size*grown(life.stations[k]);seen.push({item,k,pos,xy,pixel,size,apparent:size/pixel,min:1.2});});
        // Convoys from the neighbouring systems (1.46.0) appear and vanish beyond the gate with a flash.
        [...life.ships,...life.visitors].forEach(ship=>{
            const slot=C.models.findIndex(item=>item.entry===ship.entry),item=C.models[slot],u=(s.time-ship.t0)/Math.max(1e-6,ship.t1-ship.t0);
            const fade=!ship.visitor||ship.phase!=='travel'?1:Math.max(.02,Math.min(1,(ship.task==='arrivo'?u:1-u)*5)),size=(SHIP_SIZE[ship.entry.type]||ship.entry.drawn||.07)*fade;
            const pose=shipPose(ship,s.time,site,avoid),xy=project(pose.position,this.vp,R.w,R.h);if(xy[2]<=0)return;
            const pixel=xy[2]*k2/R.h;if(fade<1)glow(pose.position,pixel*(3+9*(1-fade)),[.75,.9,1],.9*(1-fade));
            seen.push({item,ship,slot,pose,xy,pixel,size,apparent:size/pixel,min:1});
        });
        const levels=chooseLevels(seen.map(o=>{const low=o.item?.levels[1]?.triangles??0;return {apparent:o.apparent,min:o.min,low,full:o.item?.levels[0]?.triangles??low/LOW_SHARE};}),R.sceneQuality);
        const stats={stations:C.list.length,ships:life.ships.length,visitors:life.visitors.length,full:0,low:0,light:0,triangles:0,pending:F.pending(),worker:F.stats.worker},groups=new Map();
        seen.forEach((o,n)=>{
            const want=levels[n];if(want===0&&o.item&&!o.item.levels[0])F.want(o.item.entry,1);
            o.model=want===2||!o.item?null:want===0?o.item.levels[0]||o.item.levels[1]:o.item.levels[1]||o.item.levels[0];
            if(!o.model)stats.light++;else{stats[o.model===o.item.levels[0]?'full':'low']++;stats.triangles+=o.model.triangles;}
        });
        for(const o of seen){
            if(o.ship)continue;
            const {item,k,pos,xy,pixel,apparent,size}=o,pl=item.placement,state=life.stations[k],tint=CRAFT_TINTS[pl.entry.style];
            if(s.scene==='system')this.projections.push({type:'craft',index:k,follow:{kind:'station',k},entry:pl.entry,lines:stationReport(state),active:state.producing,...xyToObj(xy),r:Math.max(12,apparent*1.3),apparent,position:pos,worldRadius:size});
            if(apparent<9&&s.scene!=='system')glow(pos,pixel*4.5,tint,.95*Math.min(1,(9-apparent)/4));
            const m=o.model;if(!m)continue;
            const light=normal(pos.map(v=>-v)),base=transform(...pos,size/m.radius,stationYaw(pl,s.time,pos)),mats=turning(m,base),draw={eye:this.eye,light,lightColor,material:10};
            if(m.ids.body)R.drawMesh(m.ids.body,this.vp,base,draw);
            for(const p of m.ids.spinning)R.drawMesh(p.id,this.vp,mats[p.part],draw);
            if(m.ids.field)R.drawMesh(m.ids.field,this.vp,base,{eye:this.eye,light,material:10,opacity:.8,lightColor:[.1,.1,.1]});
            // Flares and drills burn while the station produces.
            if(apparent>=22&&R.sceneQuality!=='low')lights(m,mats,size,.35+.65*state.producing);
        }
        for(const o of seen){
            if(!o.ship)continue;
            const {ship,slot,pose,xy,pixel,apparent,size}=o,tint=CRAFT_TINTS[ship.entry.style];
            if(s.scene==='system'){
                const back=pose.thrust>.05?project(shipPose(ship,s.time-1.5,site,avoid).position,this.vp,R.w,R.h):null;
                this.projections.push({type:'craft',index:100+ship.id,follow:{kind:'ship',id:ship.id,visitor:!!ship.visitor},entry:{...ship.entry,name:ship.name,...(ship.visitor?{about:'Convoglio di linea fra '+ship.origin+' e questo sistema: consegna alla porta del sistema le merci importate e riparte con quelle esportate.'}:{})},lines:shipReport(ship,s.time,place=>this.craftName(system,place)),tail:back&&back[2]>0?[back[0],back[1]]:null,...xyToObj(xy),r:Math.max(10,apparent*1.4),apparent,position:pose.position,worldRadius:size});
            }
            // Goods moving between a docked ship and its station.
            if(pose.docked&&(ship.task==='carica'||ship.task==='scarica')&&ship.cargo){
                const a=ship.task==='carica'?pose.docked:pose.position,b=ship.task==='carica'?pose.position:pose.docked,c=RESOURCES[ship.cargo.res].color;
                for(let q=0;q<4;q++){const u=((s.time*.7+q/4)%1),p=a.map((v,i)=>v+(b[i]-v)*u);glow(p,Math.max(size*.18,pixel*1.6),c,.8*Math.sin(u*Math.PI));}
            }
            if(apparent<6){
                glow(pose.position,pixel*(2.4+1.6*pose.thrust),tint,.55+.4*pose.thrust);
                if(pose.thrust>.05)for(let q=1;q<=3;q++){const back=shipPose(ship,s.time-q*.45,site,avoid);if(back.docked)break;glow(back.position,pixel*(2.2-q*.45),tint,(.5-q*.12)*pose.thrust);}
            }
            const m=o.model;if(!m)continue;
            const scale=size/m.radius;
            if(m.ids.body){
                const key=m.ids.body;let g=groups.get(key);if(!g)groups.set(key,g=[]);
                // Fighters and interceptors (1.47.0) fly in formation: the wingmen follow behind on either side.
                for(const [x,z] of WINGMEN.slice(0,ship.entry.wing||1)){const f=pose.forward,r=Math.hypot(f[0],f[2])>1e-6?[f[2]/Math.hypot(f[0],f[2]),0,-f[0]/Math.hypot(f[0],f[2])]:[1,0,0];g.push(...pose.position.map((v,i)=>v+r[i]*x*size*2.4-f[i]*z*size*2.4),scale,...f,0);}
            }
            if(m.ids.spinning.length||apparent>=18&&R.sceneQuality!=='low'){
                const mats=turning(m,shipMatrix(pose.position,pose.forward,scale));
                for(const p of m.ids.spinning)R.drawMesh(p.id,this.vp,mats[p.part],{eye:this.eye,light:normal(pose.position.map(v=>-v)),lightColor,material:10});
                if(apparent>=18&&R.sceneQuality!=='low')lights(m,mats,size,pose.thrust);
            }
        }
        // Natural threats (1.48.0): fragments of a swarm and rogue asteroids on their way, the beams of the ships
        // and stations that destroy them, the flash of what gets through, and the front of a flare with the
        // shield around a shield generator.
        if(life.threats){
            this.drones=[];this.freeDrones=[];
            const now=s.time,px=p=>Math.hypot(p[0]-this.eye[0],p[1]-this.eye[1],p[2]-this.eye[2])*k2/R.h,HOT=[1,.72,.45],BEAM=[1,.38,.24],SHIELD=[.45,.8,1];
            const hash=(a,b)=>{const v=Math.sin(a*12.9898+b*78.233)*43758.5453;return v-Math.floor(v)-.5;};
            for(const ev of life.threats.active){
                if(now<ev.t0)continue;
                if(ev.kind==='brillamento'){
                    if(now>ev.tEnd)continue;
                    const age=now-ev.t0,fade=1-age/(ev.tEnd-ev.t0),r=age*THREAT.flare.speed;
                    glow([0,0,0],system.starRadius*(3+2*Math.sin(age*3)**2),[1,.85,.55],.55*fade);
                    if(r<90)for(let q=0;q<96;q++){const a=q/96*TAU,p=[Math.cos(a)*r,Math.sin(a*5+age)*.15,Math.sin(a)*r];glow(p,px(p)*3,[1,.8,.5],.75*Math.max(0,1-r/90));}
                    if(ev.shields)for(const item of C.list)if(item.entry.works==='difesa-scudo'){const c=site({station:C.list.indexOf(item)}).position;for(let q=0;q<40;q++){const a=q/40*TAU,p=[c[0]+Math.cos(a)*THREAT.flare.cover,c[1],c[2]+Math.sin(a)*THREAT.flare.cover];glow(p,px(p)*1.8,SHIELD,(.25+.1*Math.sin(now*4+q))*fade);}}
                    continue;
                }
                if(now>ev.tEnd)continue;
                const target=site({station:ev.target}).position,rock=ev.kind==='asteroide';
                if(ev.kind==='incursione'){this.drawRaid(ev,now,target,glow,px,hash,life,site,avoid,s.scene,C.list[ev.target].entry.name);continue;}
                for(let j=0;j<ev.n;j++){
                    const kill=ev.kills.find(k=>k.j===j);
                    if(kill&&now>=kill.t){
                        const c=Threats.fragment(ev,j,kill.t,target),age=now-kill.t;
                        if(age<.7)glow(c,px(c)*(rock?7:4),[1,.88,.65],.95*(1-age/.7));
                        if(rock&&age<4)for(let q=0;q<10;q++){const p=[c[0]+hash(q,1)*age*1.3,c[1]+hash(q,2)*age*.6,c[2]+hash(q,3)*age*1.3];glow(p,px(p)*1.6,HOT,.8*(1-age/4));}
                        continue;
                    }
                    if(now>=ev.tImpact)continue;
                    const p=Threats.fragment(ev,j,now,target);
                    if(rock){R.drawMesh('lowSphere',this.vp,transform(...p,.13,now*.7),{eye:this.eye,light:normal(p.map(v=>-v)),material:12,texture:this.textures?.moon});glow(p,px(p)*2.5,HOT,.35);}
                    else glow(p,Math.max(.02,px(p)*2.2),HOT,.9);
                    for(const back of [.35,.7]){const q=Threats.fragment(ev,j,now-back,target);glow(q,px(q)*(rock?2.2:1.6),HOT,(rock?.45:.35)*(1-back));}
                }
                for(const k of ev.kills)if(now>k.t-.9&&now<k.t){
                    const ship=k.by.ship!==undefined?life.ships[k.by.ship]:null,from=ship?shipPose(ship,now,site,avoid).position:site({station:k.by.station}).position,to=Threats.fragment(ev,k.j,now,target),on=.55+.45*Math.sin(now*40+k.j);
                    for(let q=0;q<8;q++){const p=from.map((v,i)=>v+(to[i]-v)*(q+.5)/8);glow(p,px(p)*1.3,BEAM,.8*on);}
                }
                if(ev.hits>0&&now>=ev.tImpact&&now<ev.tImpact+3){const age=now-ev.tImpact;glow(target,px(target)*(6+5*age),[1,.6,.3],.85*(1-age/3));for(let q=0;q<8;q++){const p=[target[0]+hash(q,ev.id)*age,target[1]+hash(q,ev.id+1)*age*.5,target[2]+hash(q,ev.id+2)*age];glow(p,px(p)*1.5,HOT,.7*(1-age/3));}}
                // A threat on its way can be pointed at: where it goes, when it strikes, what the defence is doing.
                if(s.scene==='system'&&now<ev.tImpact){
                    const p=Threats.fragment(ev,0,now,target),xy=project(p,this.vp,R.w,R.h);
                    if(xy[2]>0){const left=Math.max(0,Math.ceil(ev.tImpact-now)),done=ev.kills.filter(k=>k.t<=now).length,name=C.list[ev.target].entry.name;
                        const second=rock?(done?'Distrutto dalla difesa':ev.defenders.length?`${ev.defenders.length} ${ev.defenders.length>1?'navi':'nave'} in volo per fermarlo`:'Nessuna nave in volo'):`${ev.n} frammenti, ${done} distrutti`;
                        this.projections.push({type:'craft',index:5000+ev.id,entry:{name:ev.name,kind:'minaccia',style:'minaccia',typeName:'Minaccia naturale',about:rock?'Roccia vagante: per distruggerla serve una nave dalla fregata in su, o una fortezza vicina.':'Nube di frammenti di roccia e ghiaccio: la flotta la aspetta lungo la rotta.'},lines:[`Verso ${name}`,left>0?`Impatto fra ${left} s · ${second}`:second],...xyToObj(xy),r:14,apparent:1,position:p,worldRadius:.1});}
                }
            }
            stats.threats=life.threats.active.length;
            // Free drones (1.50.0) settled in the system fly between the stations, up to sixteen in sight.
            if(life.helpers&&C.list.length>1){
                const lanes=C.lanes??=minorLanes(C.list.map((_,k)=>site({station:k}).position));
                for(let i=0;i<Math.min(16,life.helpers);i++){const [a,b]=lanes[i%lanes.length],pa=site({station:a}).position,pb=site({station:b}).position,run=now*.03+i*.37,back=Math.floor(run)%2,u=run%1,w=back?1-u:u,p=pa.map((v,q)=>v+(pb[q]-v)*w+(q===1?.25+Math.sin(w*Math.PI)*.4:0)),f=normal(pb.map((v,q)=>(v-pa[q])*(back?-1:1)));this.freeDrones.push(p[0],p[1],p[2],.05,f[0],f[1],f[2],0);}
            }
            if(this.freeDrones.length){if(!this.freeReady){R.makeMesh('free-drone',freeMesh());this.freeReady=true;}const key='instances-free',data=new Float32Array(this.freeDrones);if(C.instances.has(key))R.updateInstances(key,data);else{R.makeInstances(key,'free-drone',data);C.instances.add(key);}R.drawMesh('free-drone',this.vp,IDENTITY,{eye:this.eye,light:[0,0,0],lightColor,material:10,instances:key,instanceMode:5});}
            if(this.drones?.length){const key='instances-drones',data=new Float32Array(this.drones);if(C.instances.has(key))R.updateInstances(key,data);else{R.makeInstances(key,'swarm-drone',data);C.instances.add(key);}R.drawMesh('swarm-drone',this.vp,IDENTITY,{eye:this.eye,light:[0,0,0],lightColor,material:10,instances:key,instanceMode:5});}
        }
        // Service traffic (1.57.0, src/craft/servizio.js): shuttles, barges, tugs with their containers, miners,
        // tankers and escorts drawn as 3D models, one instanced call per kind. The plan follows the stations,
        // their levels and the graphics quality.
        if(C.list.length>1){
            minorBodies(system);
            const kinds=C.list.map((item,k)=>({type:item.entry.type==='porta'?'porta':item.entry.works||item.entry.type,level:life.stations[k]?.level||1})),key=R.sceneQuality+':'+kinds.map(x=>x.level).join('');
            if(C.serviceKey!==key){C.service=planService({stations:kinds,points:C.list.map((_,k)=>site({station:k}).position),belt:system.miningBelt?{inner:system.miningBelt.inner,outer:system.miningBelt.outer}:null,quality:R.sceneQuality,time:s.time});C.serviceKey=key;}
            if(!this.serviceReady){for(const k of SERVICE_KINDS)R.makeMesh('service-'+k,serviceMesh(k));this.serviceReady=true;}
            const docked=[],visitors=[];
            for(const ship of life.ships)if(ship.phase!=='travel'){const p=shipPose(ship,s.time,site,avoid);docked.push({id:ship.id,at:ship.at?.station??-1,position:p.position,forward:p.forward,name:ship.name,t0:ship.t0,t1:ship.t1});}
            for(const ship of life.visitors){const p=shipPose(ship,s.time,site,avoid);visitors.push({id:ship.id,position:p.position,forward:p.forward,name:ship.name,docked:ship.phase!=='travel'});}
            const ctx={station:k=>site({station:k}),stationAt:(k,t)=>this.craftSite(system,{station:k},t),names:C.list.map(item=>item.entry.name),docked,visitors,belt:system.miningBelt?{omega:r=>ringOmega(system.miningBelt,r),au:r=>system.map.toAU(r),mass:system.star.mass,icy:system.miningBelt.kind==='ghiacciata'}:null};C.serviceCtx={names:ctx.names,docked,visitors,belt:ctx.belt};const sets=Object.fromEntries(SERVICE_KINDS.map(k=>[k,[]]));let count=0;
            for(const v of C.service){
                const p=servicePose(v,s.time,ctx);if(!p.visible)continue;
                const xy=project(p.position,this.vp,R.w,R.h);if(xy[2]<=0)continue;
                const pixel=xy[2]*k2/R.h,apparent=p.size/pixel;
                sets[v.kind].push(...p.position,p.size,...p.forward,0);count++;
                if(p.tow){sets.container.push(...p.tow.position,SERVICE_SIZE.container,...p.tow.forward,0);count++;}
                // A running light keeps the far craft visible; engines while moving, mining beams towards the rock,
                // refuelling hoses and the inspection light of the maintenance pods.
                if(apparent<6)glow(p.position,pixel*2.6,SERVICE_LIGHT[v.kind],.95*Math.min(1,(6-apparent)/3));
                if(p.moving)glow(p.position.map((x,i)=>x-p.forward[i]*p.size*1.1),Math.max(p.size*.45,pixel*1.1),v.kind==='scorta'?[1,.62,.28]:[.55,.8,1],.65);
                for(const [ends,tint] of [[p.beam,[1,.7,.35]],[p.link,[.6,1,.7]],[p.scan,[.8,.92,1]]])if(ends)for(let q=0;q<3;q++){const u=((s.time*1.4+q/3)%1),c=ends[0].map((x,i)=>x+(ends[1][i]-x)*u);glow(c,Math.max(p.size*.22,pixel*1.1),tint,.7*Math.sin(u*Math.PI));}
                if(s.scene==='system'){const back=p.moving?project(servicePose(v,s.time-1.5,ctx).position,this.vp,R.w,R.h):null;this.projections.push({type:'craft',index:20000+v.id,follow:{kind:'service',id:v.id,plan:C.serviceKey},entry:{name:`${SERVICE_NAMES[v.kind]} ${v.id+1}`,kind:'servizio',style:v.kind==='scorta'?'difesa':'civile',typeName:SERVICE_NAMES[v.kind],about:SERVICE_ABOUT[v.kind]},lines:p.lines,tail:back&&back[2]>0?[back[0],back[1]]:null,...xyToObj(xy),r:Math.max(8,apparent*1.4),apparent,position:p.position,worldRadius:p.size});}
            }
            for(const k of SERVICE_KINDS){const data=sets[k];if(!data.length)continue;const key='instances-service-'+k,f=new Float32Array(data);if(C.instances.has(key))R.updateInstances(key,f);else{R.makeInstances(key,'service-'+k,f);C.instances.add(key);}R.drawMesh('service-'+k,this.vp,IDENTITY,{eye:this.eye,light:[0,0,0],lightColor,material:10,instances:key,instanceMode:5});}
            stats.service=count;stats.minor=count;
        }
        // One instanced call for each class and level: the ships of a class differ only by place and heading.
        for(const [mesh,list] of groups){
            const key='instances-'+mesh,data=new Float32Array(list);
            if(C.instances.has(key))R.updateInstances(key,data);else{R.makeInstances(key,mesh,data);C.instances.add(key);}
            R.drawMesh(mesh,this.vp,IDENTITY,{eye:this.eye,light:[0,0,0],lightColor,material:10,instances:key,instanceMode:5});
        }
        if(glows.length){
            const key='instances-glows',data=new Float32Array(glows);
            if(C.instances.has(key))R.updateInstances(key,data);else{R.makeInstances(key,'lowSphere',data);C.instances.add(key);}
            R.drawMesh('lowSphere',this.vp,IDENTITY,{eye:this.eye,material:17,instances:key,instanceMode:6,blend:true});
        }
        stats.glows=glows.length/8;R.shadowKey=shadowKey;this.craftStats=stats;
    }
    /** An incursion of the Sciame (1.49.0): drones growing like crystals at their rock, flying to the target
     * with their spines forward, the beams of the defence and the flashes of the drones it destroys, the
     * drones on board the converted station and their return to dust. Drones go to `this.drones` for one
     * instanced call. */
    drawRaid(ev,now,target,glow,px,hash,life,site,avoid,scene,name){
        const R=this.R,C=this.craft,CYAN=[.45,.95,1],DUST=[.6,.7,.8],size=.06;
        if(!this.droneReady){R.makeMesh('swarm-drone',droneMesh());this.droneReady=true;}
        this.drones??=[];
        // The incursion can be pointed at while the drones grow, fly or sit on board.
        if(scene==='system'&&now<ev.tImpact+THREAT.raid.attach&&(now<ev.tImpact||ev.hits>0)){
            const p=now<ev.tImpact?Threats.fragment(ev,0,now,target):target,xy=project(p,this.vp,R.w,R.h),done=ev.kills.filter(k=>k.t<=now).length;
            const line=now<ev.tLaunch?`Crescono ${ev.n} droni · partenza fra ${Math.ceil(ev.tLaunch-now)} s`:now<ev.tImpact?`Impatto fra ${Math.ceil(ev.tImpact-now)} s · ${ev.n} droni, ${done} distrutti`:`Conversione: ${ev.hits} ${ev.hits>1?'droni':'drone'} a bordo`;
            if(xy[2]>0)this.projections.push({type:'craft',index:5000+ev.id,entry:{name:ev.name,kind:'minaccia',style:'minaccia',typeName:'Sciame della Frontiera',about:'Sonde che si replicano con la materia degli asteroidi e la trasformano in substrato di calcolo.'},lines:[`Verso ${name}`,line],...xyToObj(xy),r:14,apparent:1,position:p,worldRadius:.1});
        }
        const put=(p,f,sc)=>this.drones.push(p[0],p[1],p[2],sc,f[0],f[1],f[2],0),dir=normal(ev.at.map((v,i)=>v-ev.from[i]));
        if(now<ev.tLaunch){
            // Growth at the rock: the drones swell from nothing, with a cold glow.
            const g=Math.max(.05,(now-ev.t0)/(ev.tLaunch-ev.t0));R.drawMesh('lowSphere',this.vp,transform(...ev.from,.28,now*.2),{eye:this.eye,light:normal(ev.from.map(v=>-v)),material:12,texture:this.textures?.moon});
            glow(ev.from,px(ev.from)*(4+3*Math.sin(now*3)**2),CYAN,.45);
            for(let j=0;j<ev.n;j++){const p=Threats.fragment(ev,j,now,target);put(p,dir,size*g);}
            return;
        }
        const hits=[],port=site({station:Math.max(0,C.list.findIndex(item=>item.entry.type==='porto'))}).position;
        for(let j=0;j<ev.n;j++){
            const kill=ev.kills.find(k=>k.j===j),free=ev.frees?.find(f=>f.j===j);
            // Reached by the key: a green flash, then the drone turns pale and flies to the port.
            if(free&&now>=free.t){const c=Threats.fragment(ev,j,free.t,target),age=now-free.t;if(age<.8)glow(c,px(c)*4,FREE_CORE,.9*(1-age/.8));if(age<20){const u=age/20,p=c.map((v,i)=>v+(port[i]-v)*u);(this.freeDrones??=[]).push(p[0],p[1],p[2],size,...normal(port.map((v,i)=>v-c[i]+1e-6)),0);}continue;}
            if(kill&&now>=kill.t){const c=Threats.fragment(ev,j,kill.t,target),age=now-kill.t;if(age<.7)glow(c,px(c)*4.5,[.8,1,1],.95*(1-age/.7));if(age<3)for(let q=0;q<6;q++){const p=[c[0]+hash(q,j)*age,c[1]+hash(q,j+1)*age*.5,c[2]+hash(q,j+2)*age];glow(p,px(p)*1.3,DUST,.6*(1-age/3));}continue;}
            if(now<ev.tImpact){const p=Threats.fragment(ev,j,now,target),q=Threats.fragment(ev,j,now-.4,target);put(p,normal(p.map((v,i)=>v-q[i])),size);glow(q,px(q)*1.5,CYAN,.35);}
            else hits.push(j);
        }
        // On board: the drones circle the station until they return to dust.
        const end=ev.tImpact+THREAT.raid.attach;
        hits.forEach((j,n)=>{
            const a=now*.8+n*TAU/hits.length,r=.32+.05*Math.sin(now*2+n),p=[target[0]+Math.cos(a)*r,target[1]+Math.sin(now+n)*.08,target[2]+Math.sin(a)*r];
            if(now<end)put(p,[-Math.sin(a),0,Math.cos(a)],size*.8);
            else if(now<end+4){const age=now-end;for(let q=0;q<4;q++){const d=[p[0]+hash(q,n)*age*.6,p[1]+hash(q,n+3)*age*.3,p[2]+hash(q,n+5)*age*.6];glow(d,px(d)*1.4,DUST,.55*(1-age/4));}}
        });
        if(hits.length&&now>=ev.tImpact&&now<end)glow(target,px(target)*(3+Math.sin(now*5)),CYAN,.3);
        for(const k of ev.kills)if(now>k.t-.9&&now<k.t){
            const ship=k.by.ship!==undefined?life.ships[k.by.ship]:null,from=ship?shipPose(ship,now,site,avoid).position:site({station:k.by.station}).position,to=Threats.fragment(ev,k.j,now,target),on=.55+.45*Math.sin(now*40+k.j);
            for(let q=0;q<8;q++){const p=from.map((v,i)=>v+(to[i]-v)*(q+.5)/8);glow(p,px(p)*1.3,[1,.38,.24],.8*on);}
        }
    }
    /** Upload one level of a model; the mesh names carry the slot of the station or ship and the level. */
    uploadCraft(item,level,m){
        const R=this.R,tag=item.prefix+'-'+level,ids={body:null,spinning:[],field:null};
        if(m.body){ids.body=tag+'-body';R.makeMesh(ids.body,m.body);}
        m.spinning.forEach((p,n)=>{const id=tag+'-turn-'+n;R.makeMesh(id,p.mesh);ids.spinning.push({id,part:p.part});});
        if(m.field){ids.field=tag+'-field';R.makeMesh(ids.field,m.field);}
        item.levels[level]={ids,parts:m.parts,lights:m.lights,radius:m.radius,triangles:m.triangles,recipe:m.recipe};
    }
    /** The model shown by the 3D catalogue (1.51.0), `s.craftModel`: built by the same factory as the systems,
     * first simplified and then whole, turning slowly unless `s.craftTurn` is false, with its moving parts,
     * its shield and its lights. `viewerInfo` tells the page what is shown and how many triangles it has. */
    drawViewer(s){
        const R=this.R,F=this.factory??=new CraftFactory(),entry=CRAFT_BY_ID.get(s.craftModel)||CRAFT[0],V=this.viewer??={entry:null,prefix:'viewer',levels:[null,null],instances:new Set()};
        if(V.entry!==entry){this.releaseViewer();V.entry=entry;V.prefix='viewer-'+entry.id;}
        for(const level of [1,0])if(!V.levels[level]){F.want(entry,level?LOW_DETAIL:1);}
        F.pump();
        for(const level of [1,0])if(!V.levels[level]){const m=F.take(entry,level?LOW_DETAIL:1);if(m)this.uploadCraft(V,level,m);}
        const m=V.levels[0]||V.levels[1];
        this.viewerInfo={id:entry.id,loading:!V.levels[0],full:V.levels[0]?.triangles??null,low:V.levels[1]?.triangles??null};
        if(!m)return;
        const k=3/m.radius,base=transform(0,0,0,k,s.craftTurn===false?0:s.time*.12),mats=m.parts.map(p=>p.spin?mul(base,spin(p.spin,s.time)):base);
        const light=normal([-.45,.62,.64]),lightColor=[.95,.92,.86],draw={eye:this.eye,light,lightColor,material:10};
        if(m.ids.body)R.drawMesh(m.ids.body,this.vp,base,draw);
        for(const p of m.ids.spinning)R.drawMesh(p.id,this.vp,mats[p.part],draw);
        if(m.ids.field)R.drawMesh(m.ids.field,this.vp,base,{eye:this.eye,light,material:10,opacity:.8,lightColor:[.1,.1,.1]});
        // Running lights and engine flames, as in the systems, in one instanced call.
        const glows=[];
        for(const l of m.lights){const M=mats[l.part],p=[0,1,2].map(i=>M[i]*l.p[0]+M[4+i]*l.p[1]+M[8+i]*l.p[2]+M[12+i]),on=!l.blink?1:l.blink<0?(((s.time*1.1+l.blink)%1+1)%1<.3?1:.12):(Math.sin(s.time*TAU*l.blink)>-.2?1:.15);glows.push(p[0],p[1],p[2],l.size*k*(l.flame?.8:2.4),...l.color.slice(0,3),(l.flame?.85:.95)*on);}
        if(glows.length){const key='instances-viewer',data=new Float32Array(glows);if(V.instances.has(key))R.updateInstances(key,data);else{R.makeInstances(key,'lowSphere',data);V.instances.add(key);}R.drawMesh('lowSphere',this.vp,IDENTITY,{eye:this.eye,material:17,instances:key,instanceMode:6,blend:true});}
    }
    /** Release the meshes of the model shown by the 3D catalogue. */
    releaseViewer(){
        const R=this.R,V=this.viewer;if(!V)return;
        for(const key of V.instances)R.deleteInstances(key);V.instances.clear();
        for(const m of V.levels)if(m){if(m.ids.body)R.deleteMesh(m.ids.body);m.ids.spinning.forEach(p=>R.deleteMesh(p.id));if(m.ids.field)R.deleteMesh(m.ids.field);}
        V.levels=[null,null];
    }
    /** Release the meshes and instance sets of the open system. */
    releaseCraft(){
        const R=this.R,C=this.craft;
        for(const key of C.instances||[])R.deleteInstances(key);C.instances=new Set();
        for(const item of [...(C.list||[]),...(C.models||[])])for(const m of item.levels)if(m){if(m.ids.body)R.deleteMesh(m.ids.body);m.ids.spinning.forEach(p=>R.deleteMesh(p.id));if(m.ids.field)R.deleteMesh(m.ids.field);}
    }
    /** Position and size of a station or a planet of the open system at `time`. */
    craftSite(system,place,time){
        const C=this.craft;
        // A point in space: where a defence ship waits for a threat (1.48.0).
        if(place.point)return {position:place.point,radius:0};
        if(place.station!==undefined){const pl=C.list[place.station].placement;return {position:stationPosition(pl,time,slot=>this.craftHost(system,slot,time)),radius:pl.size*grown(C.life?.stations[place.station])};}
        // Beyond the gate: the convoys of the neighbouring systems come and go from three points past it.
        if(place.beyond!==undefined){
            const gate=C.list.findIndex(item=>item.entry.type==='porta'),g=gate<0?[40,0,0]:this.craftSite(system,{station:gate},time).position,a=Math.atan2(g[2],g[0])+(place.beyond-1)*.35;
            return {position:[g[0]+Math.cos(a)*20,g[1]+(place.beyond-1)*2,g[2]+Math.sin(a)*20],radius:0};
        }
        const body=system.bodies.find(b=>b.slot===place.body);return {position:this.craftHost(system,place.body,time),radius:displayRadius(body)};
    }
    /** Names of the three systems nearest to `id` in the galaxy, where its convoys come from. */
    neighbourNames(id){
        const all=this.systems||[],me=all[id];if(!me)return ['un sistema vicino'];
        const d=o=>(o.position[0]-me.position[0])**2+(o.position[1]-me.position[1])**2+(o.position[2]-me.position[2])**2;
        return all.filter(o=>o!==me).sort((a,b)=>d(a)-d(b)).slice(0,3).map(o=>o.name);
    }
    craftHost(system,slot,time){
        const C=this.craft,key=slot+':'+time;if(C.hosts?.has(key))return C.hosts.get(key);
        const p=bodyAtTime(system.bodies.find(b=>b.slot===slot),time).position;if(C.hosts&&C.hosts.size<400)C.hosts.set(key,p);return p;
    }
    /** Name of a place for the ship reports. */
    craftName(system,place){
        if(place.point)return 'punto di intercettazione';
        if(place.station!==undefined)return this.craft.list[place.station].placement.entry.name;
        if(place.beyond!==undefined)return 'fuori dal sistema';
        const body=system.bodies.find(b=>b.slot===place.body);return 'corpo '+(body.slot+1)+' ('+body.profile.name.toLowerCase()+')';
    }
    /** Shooting stars in the sky of the surface at `s.time` (1.60.0): none without an atmosphere. Each meteor
     * is a function of its slot of time, so the sky is the same for the same time. */
    meteors(s){
        const g=this.surface.genome;if(!g||g.atmosphere.density<APPRECIABLE_DENSITY)return [];
        const system=this.systems?.find(x=>x.bodies.some(b=>b.index===s.selected));let shower=null;
        if(system){minorBodies(system);system.showers??=meteorShowers(system,system.comets,system.map);const body=system.bodies.find(b=>b.index===s.selected),list=system.showers.get(body.slot)||[];for(const sh of list){const st=showerState(body,sh,s.time);if(st.active&&(!shower||st.strength>shower.strength))shower={...sh,...st};}}
        // The meteors fall in the part of the sky in front of the camera, low enough to be in view.
        const out=[],life=.9,eye=this.eye,t=this.target||[0,0,0],look=Math.atan2(t[2]-eye[2],t[0]-eye[0]),pitch=Math.atan2(t[1]-eye[1],Math.hypot(t[0]-eye[0],t[2]-eye[2])),fov=this.fov||.8,hash=(n,k)=>{const x=Math.sin(n*127.1+k*311.7)*43758.5453;return x-Math.floor(x);};
        const one=(n,dt,radiant,salt=0)=>{
            const t0=n*dt+hash(n+salt,1)*dt*.6,u=(s.time-t0)/life;if(u<0||u>1)return;
            const az=look+(hash(n+salt,2)-.5)*fov*1.6,el=Math.max(.04,pitch+fov*(.12+.3*hash(n+salt,3))),dir=[Math.cos(el)*Math.cos(az),Math.sin(el),Math.cos(el)*Math.sin(az)];
            let move=radiant?normal(dir.map((v,i)=>v-radiant[i])):normal([Math.cos(az+(hash(n+salt,5)<.5?1.4:-1.4)),-.35,Math.sin(az+(hash(n+salt,5)<.5?1.4:-1.4))]);
            const start=dir.map((v,i)=>eye[i]+v*55),head=start.map((v,i)=>v+move[i]*14*u);
            out.push({head,back:move.map(v=>-v),length:4+5*hash(n+salt,4),opacity:Math.sin(u*Math.PI)});
        };
        const now=s.time;for(let n=Math.floor(now/7)-1;n<=Math.floor(now/7);n++)one(n,7,null);
        if(shower){const er=Math.max(.1,pitch+fov*.5),r=[Math.cos(look+Math.sin(shower.mean*7)*.4)*Math.cos(er),Math.sin(er),Math.sin(look+Math.sin(shower.mean*7)*.4)*Math.cos(er)],dt=.8/Math.max(.25,shower.strength);for(let n=Math.floor(now/dt)-2;n<=Math.floor(now/dt);n++)one(n,dt,normal(r),100000);}
        return out;
    }
    /** The object followed by the camera in the open system (1.58.0), resolved at `s.time`: its position and
     * radius for the camera, and the subject of the panel «Che cosa succede» (src/craft/succede.js). Null
     * when the object has left the scene: a ship gone beyond the gate, a plan of the service traffic made
     * again for a new quality. */
    followSubject(s){
        const f=s.follow,id=s.system,system=this.systems[id];if(!f||!system)return null;minorBodies(system);
        const arch=systemArchitecture(id),star=arch.star;
        if(f.kind==='star')return {kind:'star',position:[0,0,0],radius:system.starRadius,subject:{kind:'star',name:`Stella di «${system.name}»`,spt:star.spt,teff:star.teff,L:star.luminosity,R:star.radius,M:star.mass}};
        if(f.kind==='comet'){
            const c=system.comets?.[f.k];if(!c)return null;
            const st=cometState(c,s.time,system.map,star),act=st.activity,M=star.mass;
            return {kind:'comet',position:st.position,radius:Math.max(.12,.05+.22*Math.sqrt(act)),subject:{kind:'comet',name:c.name,r:st.r,q:c.q,Q:c.Q,a:c.a,e:c.e,years:years(c.a,M),v:st.v,vq:visViva(c.q,c.a,M),vQ:visViva(c.Q,c.a,M),activity:act,flux:st.flux,ract:st.ract,ion:act>0?.4+7*act**.7:0,dust:act>0?.3+5*act**.7:0,retro:c.inclination>Math.PI/2,L:star.luminosity,M}};
        }
        if(f.kind==='belt'){
            const b=system.belts?.[f.k];if(!b)return null;
            const mid=(b.inner+b.outer)/2,a=f.angle+ringOmega(b,mid)*s.time;
            return {kind:'belt',position:[Math.cos(a)*mid,0,Math.sin(a)*mid],radius:(b.outer-b.inner)/2,subject:{kind:'belt',name:b.name,icy:b.kind==='ghiacciata',aIn:b.aIn,aOut:b.aOut,M:star.mass,count:b.count,inner:b.inner,outer:b.outer,laps:b.rings.map(r=>2*Math.PI/r.omega)}};
        }
        if(f.kind==='planet'){
            const body=system.bodies.find(b=>b.slot===f.slot);if(!body)return null;
            const unit=Number.isInteger(body.index)?body.index:null,card=unit===null?null:(physics??=planetPhysics())[unit];
            const genome=unit===null?null:planetGenomes()[unit]?.atmosphere,atm=card&&genome?{pressure:card.pressure,tau:card.tau,teq:card.teq,ts:card.ts,greenhouse:card.greenhouse,albedo:card.albedo,exosphere:card.exosphere,sky:genome.sky,haze:genome.haze,clouds:genome.clouds}:null;
            // Meteor showers (1.60.0): the streams of the comets this planet crosses, computed once per system.
            system.showers??=meteorShowers(system,system.comets||[],system.map);
            const showers=(system.showers.get(body.slot)||[]).map(sh=>({...sh,...showerState(body,sh,s.time)})),air=atm?!atm.exosphere:!!body.profile.atmosphere;
            return {kind:'planet',position:bodyAtTime(body,s.time).position,radius:displayRadius(body),subject:{kind:'planet',name:body.profile.name,a:body.a,M:star.mass,L:star.luminosity,teff:star.teff,atm,air,showers,unit:unit===null?null:{index:unit}}};
        }
        const C=this.craft;if(C.system!==id||!C.life)return null;
        const life=C.life,site=place=>this.craftSite(system,place,s.time),avoid=system.starRadius*2.2+1;
        const moving=k=>{const a=this.craftSite(system,{station:k},s.time).position,b=this.craftSite(system,{station:k},s.time-1).position;return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);};
        const res=(r,amount)=>({name:RESOURCES[r].name,unit:RESOURCES[r].unit,amount});
        if(f.kind==='station'){
            const item=C.list[f.k],state=life.stations[f.k];if(!item||!state)return null;
            const e=item.entry,make=Object.entries(state.make).filter(([r])=>r!=='equipaggi').map(([r,rate])=>({...res(r),rate,stock:state.stock[r]||0,cap:state.cap[r]||0}));
            const use=Object.entries(state.use).filter(([r,rate])=>rate>0&&r!=='equipaggi').map(([r,rate])=>({...res(r),rate,stock:state.stock[r]||0}));
            const gate=e.type==='porta'?{imports:Object.keys(state.imports||{}).length,exports:Object.keys(state.use).length}:null;
            return {kind:'station',position:site({station:f.k}).position,radius:site({station:f.k}).radius,subject:{kind:'station',name:e.name,typeName:e.typeName||e.name,style:e.style,process:state.process,level:state.level,make,use:gate?[]:use,producing:state.producing,missing:(state.missing||[]).map(r=>RESOURCES[r].name),gate,frameSpeed:moving(f.k),chain:CHAIN_IDS.has(e.id),catalog:CRAFT_BY_ID.has(e.id)?e.id:null}};
        }
        if(f.kind==='ship'){
            const ship=(f.visitor?life.visitors:life.ships).find(x=>x.id===f.id);if(!ship)return null;
            const pose=shipPose(ship,s.time,site,avoid),size=SHIP_SIZE[ship.entry.type]||ship.entry.drawn||.07,name=place=>place?.beyond!==undefined&&ship.visitor?ship.origin:this.craftName(system,place);
            const base={kind:'ship',name:ship.name,typeName:ship.entry.typeName||ship.entry.name,style:ship.entry.style,visitor:!!ship.visitor,cargo:ship.cargo?res(ship.cargo.res,ship.cargo.amount):null,capacity:ship.cls?.capacity||0,left:ship.t1-s.time,catalog:CRAFT_BY_ID.has(ship.entry.id)?ship.entry.id:null};
            if(ship.phase==='travel'){
                // The length of the path, sampled along the arc of the trip as it stands now.
                const arc=(a,b,n)=>{let L=0,q=null;for(let i=0;i<=n;i++){const p=shipPose(ship,a+(b-a)*i/n,site,avoid).position;if(q)L+=Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2]);q=p;}return L;};
                const now=Math.min(ship.t1,Math.max(ship.t0,s.time));
                return {kind:'ship',position:pose.position,radius:size,subject:{...base,travel:true,from:name(ship.from),to:name(ship.to),L:arc(ship.t0,ship.t1,32),rem:arc(now,ship.t1,24),T:ship.t1-ship.t0}};
            }
            return {kind:'ship',position:pose.position,radius:size,subject:{...base,travel:false,where:name(ship.at),task:TASKS[ship.task]||'Sosta',frameSpeed:ship.at?.station!==undefined?moving(ship.at.station):0}};
        }
        if(f.kind==='service'){
            const v=C.serviceKey===f.plan?C.service?.[f.id]:null;if(!v)return null;
            const ctx={...C.serviceCtx,station:k=>site({station:k}),stationAt:(k,t)=>this.craftSite(system,{station:k},t)};
            const p=servicePose(v,s.time,ctx);if(!p.visible)return null;
            const q=servicePose(v,s.time-1,ctx),speed=Math.hypot(...p.position.map((x,i)=>x-q.position[i]));
            return {kind:'service',position:p.position,radius:p.size,subject:{kind:'service',serviceKind:v.kind,role:v.role,name:`${SERVICE_NAMES[v.kind]} ${v.id+1}`,typeName:'Traffico di servizio',facts:p.facts,speed}};
        }
        return null;
    }
    draw(scene, s, data) {
        const R = this.R;
        // The front of the Sciame della Frontiera runs in every scene; the open system fights its incursions.
        this.frontier??=new Frontier(SESSION,s.time);this.frontier.update(s.time,(scene==='system'||scene==='orbit')&&!this.travelling?this.craft?.system??null:null);
        const surface=scene==='surface';
        if(scene==='system'||scene==='orbit')this.orbitTick(6,scene==='orbit'?s.selected:-1);
        if(surface)this.activatePlanet(s.selected);else this.activateBiome(s.selected);
        this.camera(scene, s); R.time=s.time;
        this.projections = [];
        const planet=surface&&this.surface.genome;
        R.fogColor=planet?this.surface.fog.color:this.surface.fog.color.map(x=>x*.58);R.fogDensity=surface?this.surface.fog.density:0;R.mist=false;
        const cosmic=['galaxy','system','orbit'].includes(scene);
        // Inside a system the nebulae are dimmed, so the planets keep their contrast.
        const exposure=scene==='system'?.42:scene==='orbit'?.55:cosmic?.72:1;this.exposure=s.paused||this.exposure===undefined?exposure:this.exposure+(exposure-this.exposure)*.08;
        R.drawEnvironment(surface?2:cosmic?1:0,cosmic?this.galaxyEye:this.eye,cosmic?this.galaxyTarget:this.target,this.fov,this.surface.light.direction,R.fogColor,this.exposure,planet?this.surface.sky:null);
        if(cosmic){
            if(R.starCount<MIN_STARS)throw Error('Rendering interrotto: meno di un milione di stelle');
            R.drawStars(this.galaxyVP,R.starCount,0,false,.28+.57*Math.min(1,Math.hypot(...this.galaxyEye.map((v,i)=>v-this.galaxyTarget[i]))/30));
        }else if(!surface)R.drawStars(this.vp,6000,0,true);
        if(scene==='galaxy'){
            if(this.travelling)this.drawSystem(s);
            else for(const system of this.systems){
                const xy=project(system.position,this.vp,R.w,R.h);
                this.projections.push({type:'system',index:system.id,...xyToObj(xy),r:14,starIndex:system.starIndex});
            }
        }else if(scene==='system'||scene==='orbit')this.drawSystem(s);
        else if(scene==='craft')this.drawViewer(s);
        else if (scene === 'surface') {
            const S0=this.surface,ortho=new Float32Array([1/60,0,0,0,0,1/60,0,0,0,0,-2/180,0,0,0,-1,1]);
            const light=S0.light.direction,lightColor=S0.light.color,lightEye=light.map(x=>x*90),lightVP=mul(ortho,lookAt(lightEye,[0,0,0]));
            R.renderShadow(this.biome,['planet-terrain'],lightVP);
            // Prototype worlds draw their phenomenon on top of the generated surface (src/worlds/pilots.js).
            const unit=data?.modules?.[s.selected]?.id,world=unit&&s.worldState?pilotWorld(unit):null,id=transform();
            R.drawMesh('planet-terrain',this.vp,id,{eye:this.eye,light,lightColor,material:10});
            if(S0.field)R.drawMesh('planet-horizon',this.vp,id,{eye:this.eye,light,lightColor,material:10});
            if(S0.seaY!==null&&!world?.hidesWater)R.drawMesh('planet-sea',this.vp,id,{eye:this.eye,light,lightColor,material:18,tint:[...S0.water.map(v=>Math.min(1,v*1.6)),1],motion:[S0.seaY,.12,0,0],opacity:.96});
            if(S0.seaY!==null&&S0.field&&!world?.hidesWater)R.drawMesh('planet-sea-far',this.vp,id,{eye:this.eye,light,lightColor,material:18,tint:[...S0.water.map(v=>Math.min(1,v*1.6)),1],motion:[S0.seaY,.12,0,0],opacity:.96});
            // Species in two levels of detail (1.63.0); lower graphics settings draw a share of the individuals.
            this.lifeSplit();
            for(const L of this.groups||[])for(const l of [0,1])if(L.drawn[l])R.drawMesh(L.meshes[l],this.vp,id,{eye:this.eye,light,lightColor,material:10,instances:L.sets[l],instanceMode:L.mode,motion:L.motion,pbr:L.pbr});
            // Streets and paths of the settlements (1.64.0).
            if(S0.settlements&&this.groups)R.drawMesh('planet-streets',this.vp,id,{eye:this.eye,light,lightColor,material:10,pbr:[0,.92,0,0]});
            if(R.instanceSets?.has('planet-geyser'))R.drawMesh('lowSphere',this.vp,id,{eye:this.eye,light,material:19,instances:'planet-geyser',instanceMode:2,motion:[.16,10,.7,0],opacity:.32});
            // Shooting stars (1.60.0) on worlds with an atmosphere: a sporadic one every 7 s, one every 0.8 s while
            // the planet crosses the stream of a comet, radiating from one point of the sky.
            for(const m of this.meteors(s))R.drawMesh('comet-ion',this.vp,basisMatrix(m.head,m.back,[0,1,0],m.length),{eye:this.eye,material:14,tint:[1,1,.92,1],opacity:m.opacity});
            // Aurora in sky coordinates around the eye, swaying slowly; drawn after the ground, so the relief hides it.
            if(this.aurora){const m=transform(...this.eye,1,Math.sin(s.time*.05)*.03);R.drawMesh('planet-aurora',this.vp,m,{eye:this.eye,material:16,tint:[.35,1,.62,1],opacity:.4});const m2=transform(this.eye[0],this.eye[1]+18,this.eye[2],1.04,Math.sin(s.time*.05+1)*.03);R.drawMesh('planet-aurora',this.vp,m2,{eye:this.eye,material:16,tint:[1,.35,.5,1],opacity:.18});}
            if(R.instanceSets?.has('planet-rocks'))R.drawMesh('world-rock',this.vp,id,{eye:this.eye,light,lightColor,material:10,instances:'planet-rocks',instanceMode:1,pbr:[0,.9,0,1]});
            // Moons above the horizon, right of the default view, where the sky is clear of the title.
            // Moons beyond the horizon (1.62.0), with the same apparent size as before at 320 units.
            for(const m of S0.moons){const az=Math.atan2(-Math.cos(.6),-Math.sin(.6))+m.azimuth,d=S0.field?3200:320,pos=[Math.cos(az)*d,Math.tan(m.elevation*.7)*d+6,Math.sin(az)*d];const back=normal(this.eye.map((v,i)=>v-pos[i])),moonLight=normal(light.map((v,i)=>v+back[i]*.7));R.drawMesh('sphere',this.vp,transform(...pos,m.size*d/320),{eye:this.eye,light:moonLight,material:12,texture:this.textures.moon});}
            if(world){
                if(this.builtWorld!==unit){world.build(R,S0);this.builtWorld=unit;}
                world.update(R,s.worldState);world.draw(R,{vp:this.vp,eye:this.eye,target:this.target,light,sun:light,lightColor,identity:id},s.worldState,this.textures);
                this.worldLabels=world.labels?world.labels(s.worldState).map(l=>({...l,screen:project(l.position,this.vp,R.w,R.h)})):[];
            }else this.worldLabels=[];
            for(const station of S0.stations){
                const p=station.position,label=station.labelPosition,selected=station.index===s.station;
                R.drawMesh('planet-station',this.vp,transform(p[0],p[1],p[2],.68,.4*station.index),{eye:this.eye,light,lightColor,material:10,pbr:[.1,.5,.05,4]});
                if(selected)R.drawMesh('ring',this.vp,transform(p[0],p[1]+.35,p[2],station.radius*1.08),{eye:this.eye,tint:TINTS[station.index],emission:.7,opacity:.7});
                if(!s.explore)this.projections.push({type:'station',index:station.index,...xyToObj(project(label,this.vp,R.w,R.h)),r:28,position:p,worldRadius:station.radius});
            }
            // Exploration: markers of the places and a ring around the selected species or place.
            if(s.explore){
                S0.places.forEach((p,k)=>{const q=p.position,on=s.exploreTarget?.type==='place'&&s.exploreTarget.index===k;
                    R.drawMesh('planet-beacon',this.vp,transform(q[0],q[1],q[2],1),{eye:this.eye,light,lightColor,material:10,pbr:[.2,.5,0,4]});
                    R.drawMesh('lowSphere',this.vp,transform(q[0],q[1]+5.3,q[2],on?.55:.42),{eye:this.eye,material:16,tint:PLACE_TINTS[p.kind]});
                    if(on)R.drawMesh('ring',this.vp,transform(q[0],q[1]+.3,q[2],3.2),{eye:this.eye,tint:PLACE_TINTS[p.kind],emission:.7,opacity:.75});
                    this.projections.push({type:'place',index:k,...xyToObj(project([q[0],q[1]+6.6,q[2]],this.vp,R.w,R.h)),r:26,position:q});});
                // Settlements (1.64.0): a marker over the square of the colony and over the fire of the village.
                (S0.settlements||[]).forEach((t0,k)=>{const q=t0.position,on=s.exploreTarget?.type==='settlement'&&s.exploreTarget.index===k,top=Math.max(...t0.buildings.filter(b=>Math.hypot(b.x-q[0],b.z-q[2])<12).map(b=>b.y+b.height),q[1])+3;
                    R.drawMesh('lowSphere',this.vp,transform(q[0],top+2.3,q[2],on?.7:.55),{eye:this.eye,material:16,tint:PLACE_TINTS[t0.kind]});
                    if(on)R.drawMesh('ring',this.vp,transform(q[0],q[1]+.3,q[2],t0.kind==='colonia'?14:10),{eye:this.eye,tint:PLACE_TINTS[t0.kind],emission:.7,opacity:.75});
                    this.projections.push({type:'settlement',index:k,...xyToObj(project([q[0],top+3.6,q[2]],this.vp,R.w,R.h)),r:28,position:q});});
                const t=s.exploreTarget,c=t?.type==='species'?this.population?.[t.index]?.centre:null;
                if(c)R.drawMesh('ring',this.vp,transform(c[0],c[1]+.3,c[2],7),{eye:this.eye,tint:[.6,.95,.7,1],emission:.7,opacity:.6});
            }
        }
        else if (scene === 'research') {
            R.drawMesh('research-links', this.vp, transform(), { eye: this.eye, tint: TINTS[1], opacity: .55, emission: .3 });
            EDGES.forEach(([a,b],k)=>{if(a===s.node||b===s.node)R.drawMesh('research-edge-'+k,this.vp,transform(),{eye:this.eye,tint:TINTS[4],emission:.6,opacity:.85});});
            RESEARCH.forEach((n, i) => {
                let selected = i === s.node;
                R.drawMesh('sphere', this.vp, transform(...n.pos, n.discipline === 4 ? .52 : .30, s.time * .04), { eye: this.eye, tint: TINTS[n.discipline], emission: selected ? .4 : .08, rim: .25 });
                if (selected)
                    R.drawMesh('ring', this.vp, transform(...n.pos, .85, 0, Math.PI / 2), { eye: this.eye, tint: TINTS[n.discipline], emission: .5, opacity: .8 });
                this.projections.push({ type: 'node', index: i, ...xyToObj(project(n.pos, this.vp, R.w, R.h)), r: 18 });
            });
        }
        else if (scene === 'lab' && s.lab === 'daisyworld') {
            const d = s.sim.final, c = [-6, 0, 0], r = 4.9;
            R.drawMesh('fineSphere', this.vp, transform(...c, r, s.time * .025), { eye: this.eye, tint: [.31, .40, .29, 1], rim: .3 });
            const nb = Math.round(d.black * 180), nw = Math.round(d.white * 180);
            for (let i = 0; i < nb + nw && i < 180; i++) {
                const p = this.patches[i];
                R.drawMesh('lowSphere', this.vp, transform(c[0] + p[0] * r, p[1] * r, p[2] * r, .19), { eye: this.eye, tint: i < nb ? [.07, .10, .12, 1] : [.92, .94, .83, 1], emission: .03 });
            }
            R.drawMesh('ring', this.vp, transform(...c, r * 1.08), { eye: this.eye, tint: TINTS[3], opacity: .5, emission: .3 });
        }
        else {
            R.drawMesh('sphere', this.vp, transform(10, 0, -13, 7, s.time * .023), { texture: this.textures.earth, eye: this.eye, rim: .4, opacity: .48 });
        }
    }
    /** Nearest species (by its individuals) or place within `radius` of a ground point, for exploration. */
    nearest(point, radius = 7) {
        let best = null, d0 = radius;
        (this.population || []).forEach((p, k) => { for (const o of p.instances) { const d = Math.hypot(o.x - point[0], o.z - point[2]); if (d < d0) { d0 = d; best = { type: 'species', index: k }; } } });
        (this.surface?.places || []).forEach((p, k) => { const d = Math.hypot(p.position[0] - point[0], p.position[2] - point[2]); if (d < d0 + 2) { d0 = d - 2; best = { type: 'place', index: k }; } });
        // A building or a street of a settlement selects the settlement (1.64.0).
        (this.surface?.settlements || []).forEach((t, k) => { for (const b of t.buildings) { const d = Math.hypot(b.x - point[0], b.z - point[2]) - b.radius; if (d < d0) { d0 = d; best = { type: 'settlement', index: k }; } } });
        return best;
    }
    pick(x, y, s) {
        if(this.cameraProgress<1)return null;
        if(s.scene==='galaxy')return pickProjected(this.projections,x,y);
        if(s.scene==='system'){
            // The nearest mark to the pointer in proportion to its size, the nearer one on a tie: a hundred service
            // craft (1.57.0) must leave the planets and the stations reachable. A mark behind the stellar disc
            // gives way to the star, which can be followed (1.58.0).
            const star=project([0,0,0],this.vp,this.R.w,this.R.h),r=star[2]>0?this.systems[s.system].starRadius*this.R.h/(2*Math.tan(this.fov/2)*star[2]):0,onStar=star[2]>0&&Math.hypot(star[0]-x,star[1]-y)<Math.max(10,r);
            // Belts (1.60.0): the point of the middle of a belt nearest to the pointer, within 12 pixels.
            const system=this.systems[s.system],marks=[...this.projections];
            (system.belts||[]).forEach((b,k)=>{const mid=(b.inner+b.outer)/2;let best=null;for(let j=0;j<96;j++){const a=j/96*Math.PI*2,q=project([Math.cos(a)*mid,0,Math.sin(a)*mid],this.vp,this.R.w,this.R.h);if(q[2]>0){const d=Math.hypot(q[0]-x,q[1]-y);if(!best||d<best.d)best={d,a,q};}}
                if(best&&best.d<=12)marks.push({type:'belt',index:k,belt:b,follow:{kind:'belt',k,angle:best.a-b.rings[Math.floor(b.rings.length/2)].omega*s.time},...xyToObj(best.q),r:12});});
            const hit=marks.filter(p=>p.depth>0&&Math.hypot(p.x-x,p.y-y)<=p.r&&!(onStar&&star[2]<p.depth)).sort((a,b)=>(Math.hypot(a.x-x,a.y-y)/a.r-Math.hypot(b.x-x,b.y-y)/b.r)||a.depth-b.depth)[0];
            return hit||(onStar?{type:'star',index:s.system,x:star[0],y:star[1],depth:star[2],r:Math.max(10,r)}:null);
        }
        if(s.scene==='surface'){
            const f=normal(this.target.map((v,i)=>v-this.eye[i])),right=normal(cross(f,[0,1,0])),up=cross(right,f),t=Math.tan(this.fov/2);
            const direction=normal(f.map((v,i)=>v+right[i]*(2*x/this.R.w-1)*t*this.R.w/this.R.h+up[i]*(1-2*y/this.R.h)*t));
            const label=this.projections.find(p=>p.depth>0&&Math.hypot(p.x-x,p.y-y)<p.r);if(label)return label;
            // Exploration: the first point where the ray meets the ground or the sea.
            if(s.explore&&this.surface.heightAt){const S0=this.surface;for(let t=1;t<420;t+=.5){const q=this.eye.map((v,i)=>v+direction[i]*t);if(Math.abs(q[0])>110||Math.abs(q[2])>110)break;const ground=Math.max(S0.heightAt(q[0],q[2]),S0.seaY??-99,S0.clear?S0.clear.roofAt(q[0],q[2]):-99);if(q[1]<=ground)return {type:'ground',point:[q[0],ground,q[2]]};}return null;}
            let hit=null,near=Infinity;
            for(const station of this.surface.stations){const center=[station.position[0],(station.position[1]+station.labelPosition[1])*.5,station.position[2]],d=raySphere(this.eye,direction,center,station.radius);if(d!==null&&d<near){near=d;hit={type:'station',index:station.index};}}
            return hit;
        }
        return this.projections.filter(p => p.depth > 0 && Math.hypot(p.x - x, p.y - y) < p.r).sort((a, b) => a.depth - b.depth)[0] || null;
    }
}
function xyToObj(p) { return { x: p[0], y: p[1], depth: p[2] }; }
/** Belts, comets and the map of distances of a system (1.60.0), computed once and kept on the system. */
export function minorBodies(system) {
    // `belt` keeps its meaning for the stations (src/craft/placement.js): the outer belt of the systems whose id
    // leaves remainder 1 on division by 3, as before 1.60.0; the miners work the rocky belt where there is one.
    if (!system.map) { system.map = distanceMap(system); system.belts = systemBelts(system, system.map); system.comets = systemComets(system); const icy = system.belts.find(b => b.kind === 'ghiacciata'); system.belt = system.id % 3 === 1 ? icy : null; system.miningBelt = system.belts.find(b => b.kind === 'rocciosa') || system.belt; }
    return system;
}
/** Model matrix with +z along `axis`, +x towards `side` (made perpendicular) and uniform scale (1.60.0). */
export function basisMatrix(position, axis, side, scale) {
    const z = normal(axis), d = side[0] * z[0] + side[1] * z[1] + side[2] * z[2];
    let x = side.map((v, i) => v - d * z[i]); if (Math.hypot(...x) < 1e-6) x = Math.abs(z[1]) < .9 ? normal(cross([0, 1, 0], z)) : [1, 0, 0]; x = normal(x);
    const y = cross(z, x);
    return new Float32Array([...x.map(v => v * scale), 0, ...y.map(v => v * scale), 0, ...z.map(v => v * scale), 0, ...position, 1]);
}
const dec1 = v => v.toFixed(1).replace('.', ','), dec2 = v => (v < 10 ? v.toFixed(2) : v.toFixed(1)).replace('.', ',');
/** Identity of a followed object, for the camera transition. */
export function followKey(f) { return f.kind + ':' + (f.k ?? f.id ?? f.slot ?? '') + (f.visitor ? 'v' : ''); }
