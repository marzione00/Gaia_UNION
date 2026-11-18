/** Layout primitives shared by the scene and by the identity cards: thematic areas, the unit-to-system
 * map, the seeded random generator and the drawn bodies of each system (src/scene/systems.js places them). */
import { PLANET_TYPES } from './planet-types.js';
/** Thematic areas: one galaxy arm per discipline, one star system per area, units in study order.
 * Indices refer to the catalogue order (0-24 mathematics, 25-49 physics, 50-74 chemistry, 75-99 biology,
 * 100-109 the two astrobiology areas added to the biology arm). */
export const DISCIPLINE_NAMES = Object.freeze(['Matematica', 'Fisica', 'Chimica', 'Biologia']);
export const AREAS = Object.freeze([
    { key:'mat-numeri', sector:0, name:'Numeri e ragionamento', units:[0, 13, 12, 17] },
    { key:'mat-algebra', sector:0, name:'Algebra ed equazioni', units:[1, 2, 3, 4, 11, 15] },
    { key:'mat-funzioni', sector:0, name:'Funzioni e variazione', units:[7, 5, 16, 20] },
    { key:'mat-geometria', sector:0, name:'Geometria e trasformazioni', units:[10, 6, 8, 14, 18] },
    { key:'mat-probabilita', sector:0, name:'Probabilità e dati', units:[9, 19, 22] },
    { key:'mat-scienze', sector:0, name:'Matematica per le scienze', units:[21, 23, 24] },
    { key:'fis-moto', sector:1, name:'Misura e moto', units:[25, 26, 27, 28, 29] },
    { key:'fis-forze', sector:1, name:'Forze ed energia', units:[30, 31, 32, 33] },
    { key:'fis-gravita', sector:1, name:'Rotazioni e gravità', units:[34, 35, 36, 37] },
    { key:'fis-onde', sector:1, name:'Fluidi, oscillazioni e onde', units:[38, 39, 40, 41] },
    { key:'fis-termo', sector:1, name:'Calore e termodinamica', units:[42, 43, 44] },
    { key:'fis-elettro', sector:1, name:'Elettromagnetismo e quanti', units:[45, 46, 47, 48, 49] },
    { key:'chi-atomi', sector:2, name:'Materia e atomi', units:[50, 51, 52, 53, 54] },
    { key:'chi-legami', sector:2, name:'Legami e molecole', units:[55, 56, 57, 58] },
    { key:'chi-stati', sector:2, name:'Stati e soluzioni', units:[59, 60, 61, 62] },
    { key:'chi-reazioni', sector:2, name:'Reazioni e quantità', units:[63, 64, 65] },
    { key:'chi-equilibrio', sector:2, name:'Velocità ed equilibrio', units:[66, 67, 68, 69] },
    { key:'chi-acidi', sector:2, name:'Acidi, redox e carbonio', units:[70, 71, 72, 73, 74] },
    { key:'bio-cellula', sector:3, name:'La vita e la cellula', units:[75, 76, 77] },
    { key:'bio-energia', sector:3, name:'Molecole dal cosmo', units:[78, 79, 80] },
    { key:'bio-ereditarieta', sector:3, name:'Chimica prebiotica', units:[81, 82, 83] },
    { key:'bio-geni', sector:3, name:'Informazione e replicatori', units:[84, 85, 86] },
    { key:'bio-evoluzione', sector:3, name:'Evoluzione e albero della vita', units:[87, 88, 89, 90, 91] },
    { key:'bio-popolazioni', sector:3, name:'Vita ai limiti', units:[92, 93, 94, 95] },
    { key:'bio-ecosistemi', sector:3, name:'Pianeti abitabili', units:[96, 97, 98, 99] },
    { key:'bio-sistema-solare', sector:3, name:'Mondi del sistema solare', units:[100, 101, 102, 103, 104] },
    { key:'bio-galassia', sector:3, name:'Cercare la vita nella galassia', units:[105, 106, 107, 108, 109] },
    { key:'fis-luce', sector:1, name:'Luce e telescopi', units:[110, 111, 112, 113, 114] },
    { key:'fis-campi', sector:1, name:'Campi e plasmi nello spazio', units:[115, 116, 117, 118, 119] },
    { key:'fis-cosmo', sector:1, name:'Dalla relatività al Big Bang', units:[120, 121, 122, 123, 124] }
]);
/** Number of star systems (one per area) and of explorable planets (one per unit). */
export const SYSTEM_COUNT = AREAS.length;
export const UNIT_COUNT = AREAS.reduce((n, area) => n + area.units.length, 0);
const AREA_OF_UNIT = new Array(UNIT_COUNT).fill(0);
AREAS.forEach((area, id) => area.units.forEach(index => { AREA_OF_UNIT[index] = id; }));
export const systemForPlanet = index => AREA_OF_UNIT[Math.max(0, Math.min(UNIT_COUNT - 1, Math.floor(Number(index) || 0)))];
export const indicesForSystem = index => [...(AREAS[Math.max(0, Math.min(SYSTEM_COUNT - 1, Math.floor(Number(index) || 0)))].units)];
export const areaOf = index => AREAS[systemForPlanet(index)];
/** Position of a unit inside its area, counted from 1, and the area's unit count. */
export function unitPlace(index) { const area = areaOf(index); return { position: area.units.indexOf(index) + 1, count: area.units.length }; }
// Planet families tied to the landing surfaces of the four web lessons and to the prototype units:
// a glacial world for logic, a volcanic one for molecular shapes, a living one for Mendel's greenhouse.
// The four prototype worlds of the phenomena (src/worlds/pilots.js) need the matching landing
// surface: sea for the herd island (20) and the tides (36), volcanic ground for the cobalt lakes (69),
// meadows for Daisyworld (99). The solar-system area mirrors its subjects: desert and barren worlds for
// Mars (100, 101), ice for Europa (102), an ocean for Enceladus (103), hills and rivers for Titan (104).
// The galaxy area (105-109) uses the families that keep every pair of planets above the minimum distance.
// The three astrophysics areas of physics (110-124) take the families found by a search that keeps the
// minimum distance between any two planets at its previous value.
const UNIT_ANCHORS = { 1:'oceanic', 2:'desert', 3:'volcanic', 7:'terrestrial', 0:'arctic', 57:'volcanic', 83:'terrestrial', 20:'oceanic', 36:'oceanic', 69:'volcanic', 99:'terrestrial',
    100:'desert', 101:'barren', 102:'arctic', 103:'oceanic', 104:'terrestrial', 105:'volcanic', 106:'oceanic', 107:'terrestrial', 108:'desert', 109:'barren',
    110:'terrestrial', 111:'oceanic', 112:'desert', 113:'barren', 114:'arctic', 115:'terrestrial', 116:'oceanic', 117:'desert', 118:'barren', 119:'arctic',
    120:'terrestrial', 121:'arctic', 122:'desert', 123:'volcanic', 124:'oceanic' };

export const SYSTEM_SEED = 0x47414941;
const bodiesCache=new Map();
export function seededRandom(seed) { let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}; }
function shuffled(values,rng){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
/** Bodies of system `id` with every drawn parameter (type, radius, spin, tilt, moons, rings, phase...)
 * in generation order. The identity cards are built from these; src/scene/systems.js then places the
 * bodies at their physical distances. `gap` and `pace` keep the random draws of the drawn spacing and
 * of the orbital speed, so the sequence of draws, and with it every card, is unchanged. */
export function systemBodies(id,seed=SYSTEM_SEED){
 const key=seed+':'+id;if(bodiesCache.has(key))return bodiesCache.get(key);
 const units=indicesForSystem(id),rng=seededRandom(seed^Math.imul(id+1,0x9E3779B1)),count=Math.min(12,Math.max(units.length+1,5+Math.floor(rng()*8))),starRadius=.65+rng()*.65;
 const slots=shuffled(Array.from({length:count},(_,i)=>i),rng).slice(0,units.length).sort((a,b)=>a-b);
 const solid=shuffled(['terrestrial','oceanic','desert','barren','arctic','volcanic'],rng);
 // Keep the established landing biomes of the introductory lessons, each on its own unit.
 units.forEach((index,k)=>{const anchor=UNIT_ANCHORS[index];if(anchor&&k<solid.length){const at=solid.indexOf(anchor);[solid[k],solid[at]]=[solid[at],solid[k]];}});
 const bodies=[];
 const extras=['gas','ringed','icegiant','rocky','arctic','volcanic','acid','desert'];let extraIndex=0;
 for(let slot=0;slot<count;slot++){
  const sector=slots.indexOf(slot),explorable=sector>=0,type=explorable?solid[sector%solid.length]:extras[(id+extraIndex++)%extras.length],profile=PLANET_TYPES[type];
  const radius=profile.solid?.30+rng()*.25:.62+rng()*.29,gap=rng();
  const phase=rng()*Math.PI*2,tilt=(rng()-.5)*.9,inclination=(rng()-.5)*.24,eccentricity=rng()*.012;
  bodies.push({id:'s'+id+'-p'+slot,slot,system:id,index:explorable?units[sector]:null,sector:explorable?AREAS[id].sector:-1,order:sector,explorable,type,profile,
   radius,gap,phase,tilt,inclination,eccentricity,node:rng()*Math.PI*2,pace:.16+rng()*.03,spin:(rng()<.15?-1:1)*(.016+rng()*.04),rotation:rng()*Math.PI*2,
   moons:Math.floor(rng()*(profile.solid?3:5)),rings:type==='ringed'||(!profile.solid&&rng()<.25)});
 }
 const result={id,seed,count,bodies,starRadius,architecture:count>=10?'Affollato':count<=6?'Rado':bodies.some(p=>Math.abs(p.inclination)>.1)?'Inclinato':'Misto'};
 bodiesCache.set(key,result);return result;
}
