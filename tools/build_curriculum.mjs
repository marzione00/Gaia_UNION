/** Rebuilds the original curriculum from original editorial fields and pure models.
 * No online service, generated image, dynamic evaluation, or silent source replacement. */
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {MODELS,MODEL_IDS,defaults,value,probePoints} from '../src/models/curriculum.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const load=p=>JSON.parse(fs.readFileSync(root+p,'utf8'));
const write=(p,v)=>fs.writeFileSync(root+p,JSON.stringify(v,null,2)+'\n');
const authored=load('content/curriculum/authored.json'),catalogue=load('content/catalogue.json'),prototypes=new Map(load('content/curriculum/prototypes.json').units.map(p=>[p.id,p]));
const sources=[
 {id:'precalculus',title:'OpenStax — Precalculus 2e',url:'https://openstax.org/books/precalculus-2e/pages/preface'},
 {id:'calculus',title:'OpenStax — Calculus Volume 1',url:'https://openstax.org/books/calculus-volume-1/pages/preface'},
 {id:'statistics',title:'OpenStax — Introductory Statistics 2e',url:'https://openstax.org/books/introductory-statistics-2e/pages/preface'},
 {id:'physics1',title:'OpenStax — University Physics Volume 1',url:'https://openstax.org/books/university-physics-volume-1/pages/preface'},
 {id:'physics2',title:'OpenStax — University Physics Volume 2',url:'https://openstax.org/books/university-physics-volume-2/pages/preface'},
 {id:'physics3',title:'OpenStax — University Physics Volume 3',url:'https://openstax.org/books/university-physics-volume-3/pages/preface'},
 {id:'chemistry',title:'OpenStax — Chemistry 2e',url:'https://openstax.org/books/chemistry-2e/pages/preface'},
 {id:'biology',title:'OpenStax — Biology 2e',url:'https://openstax.org/books/biology-2e/pages/preface'},
 {id:'si',title:'BIPM — Costanti che definiscono il Sistema Internazionale',url:'https://www.bipm.org/en/measurement-units/si-defining-constants'},
 {id:'daisyworld',title:'Watson e Lovelock (1983) — The parable of Daisyworld',url:'https://www.jameslovelock.org/biological-homeostasis-of-the-global-environment-the-parable-of-daisyworld/'}
];
const u=unit=>unit==='1'?' (adimensionale)':' '+unit;
const numeric=x=>x===0?'0':Math.abs(x)<1e-4||Math.abs(x)>=1e6?x.toExponential(5).replace('.',','):Number(x.toPrecision(6)).toLocaleString('it-IT',{maximumSignificantDigits:6});
function options(texts,correctIndex,feedbacks,seed){
 const shift=seed%texts.length;
 const arr=texts.map((text,i)=>({text,feedback:feedbacks[i],ok:i===correctIndex}));
 const rotated=[...arr.slice(shift),...arr.slice(0,shift)];
 return {options:rotated.map((o,i)=>({id:'ABC'[i],text:o.text,feedback:o.feedback})),correct:'ABC'[rotated.findIndex(o=>o.ok)]};
}
function q(id,prompt,texts,feedbacks,seed){return {id,prompt,...options(texts,0,feedbacks,seed)};}
function numericQ(id,m,x,p,y,seed,changed=false){
 const delta=Math.max(Math.abs(y)*.5,Math.abs(y)<.01?Math.max(1e-8,Math.abs(y)*2):1);
 const texts=[y,y+delta,y-delta].map(z=>numeric(z)+u(m.yUnit));
 const assignment=m.controls.map(c=>`${c.label} (${c.key})=${numeric(p[c.key])}${u(c.unit)}`).join('; ');
 const explanation=`${m.formula}. Con ${assignment} e ${m.xLabel}=${numeric(x)}${u(m.xUnit)}, il risultato è ${numeric(y)}${u(m.yUnit)}. Conserva le unità e arrotonda solo alla fine.`;
 return {...q(id,`${changed?'Trasferimento':'Calcolo'}: ${assignment}. Per ${m.xLabel}=${numeric(x)}${u(m.xUnit)}, quanto vale ${m.yLabel}?`,texts,[explanation,'Questo valore non soddisfa la relazione. '+explanation,'Controlla sostituzione, segno e unità. '+explanation],seed),numeric:{x,parameters:p,expected:y,unit:m.yUnit}};
}
const levels=(base,intermediate,advanced)=>({base,intermediate,advanced});
const titles=['SCOPRI','CAPISCI','SPERIMENTA','INTERPRETA','VERIFICA','COLLEGA'];
const definitions=[];
for(const [i,a] of authored.courses.entries()){
 const m=MODELS[a.unitId],unit=catalogue.modules.find(u=>u.id===a.unitId);if(!m||!unit)throw Error('Identificativo mancante '+a.unitId);
 const p=defaults(a.unitId),probes=probePoints(a.unitId),assignment=m.controls.map(c=>`${c.label} (${c.key}): ${numeric(p[c.key])}${u(c.unit)}`).join('; ');
 const measure=`La variabile ${m.xLabel} è espressa in ${m.xUnit}; ${m.yLabel} in ${m.yUnit}. Il dominio dello strumento è [${numeric(m.domain[0])}; ${numeric(m.domain[1])}]${m.discrete?', con soli valori interi':''}. La relazione implementata è: ${m.formula}.`;
 const protocol=`Nel laboratorio imposta ${assignment}. Prima di salvare A, prevedi come cambia ${m.yLabel} fra ${m.xLabel}=${numeric(probes[0])} e ${numeric(probes[1])} ${m.xUnit}. Registra A. Cambia un parametro, formula una nuova previsione e salva B. Le due configurazioni restano indipendenti.`;
 const compare=`Il confronto usa due punti del dominio, non dimostra monotonia sull'intero intervallo. «Non definito» significa che almeno un punto è escluso dal modello. Nel grafico i vuoti non vengono uniti; gli indici interi sono visualizzati come campioni discreti.`;
 const view=`Il grafico è costruito da mesh 3D: profondità, spessore dei tubi e colori servono alla leggibilità e non rappresentano una grandezza aggiuntiva. Le scale si adattano ai valori e al confronto A. ${m.discrete?'Quando gli indici sono numerosi, è mostrato un campionamento dichiarato; il cursore calcola ogni indice richiesto.':'La curva collega un numero finito di campioni calcolati; non è una prova del comportamento tra tutti i punti.'}`;
 const src=unit.sector===0?['precalculus',...(a.unitId.startsWith('math-p')||['math-b','math-a'].includes(a.unitId)?['calculus']:[]),...(['math-c10','math-p07'].includes(a.unitId)?['statistics']:[])]:unit.sector===1?[Number(unit.code.slice(1))<=17?'physics1':Number(unit.code.slice(1))<=24?'physics2':'physics3','si']:unit.sector===2?['chemistry','si']:['biology',...(a.unitId==='biology-25'?['daisyworld','physics2']:[])];
 let changed={...p};const c=m.controls[0];changed[c.key]=c.value+c.step<=c.max?Number((c.value+c.step).toPrecision(12)):c.min;
 // Pick a finite, distinct transfer fixture, rather than manufacturing a result in a gap.
 let tx=m.fixture[0],ty=value(m.id,tx,changed);
 if(ty===null){tx=probes.find(x=>value(m.id,x,changed)!==null)??m.domain[0];ty=value(m.id,tx,changed);}
 if(ty===null)throw Error('Trasferimento non finito '+m.id);
 const questions=[
  q(a.unitId+'-concept',a.question,[a.answer,...a.wrong],[a.concept,a.misconception,a.derivation],i),
  numericQ(a.unitId+'-calculation',m,m.fixture[0],p,m.fixture[1],i+1),
  numericQ(a.unitId+'-transfer',m,tx,changed,ty,i+2,true),
  q(a.unitId+'-limits','Quale affermazione descrive correttamente l’ambito di questo esperimento?',
   [a.bound,'Riproduce ogni dettaglio del pianeta reale','Basta il grafico per provare una legge universale'],
   [a.limit,'Il pianeta è una cornice narrativa; i dati sono sintetici. '+a.limit,'Una visualizzazione non è una dimostrazione universale. '+a.limit],i+1)
 ];
 const definition={schemaVersion:1,version:'1.0.0',id:a.unitId,title:unit.sector===0?unit.title:a.title,sector:unit.sector,modelId:m.id,
  coverage:'guided-foundation',editorialStatus:'original-draft',scope:a.bound,
  narrativeStatus:'Scenario di fantasia e dati sintetici calcolati. Nessuna osservazione del pianeta immaginario è dichiarata reale.',
  objectives:[`Spiegare: ${a.bound.toLowerCase()}.`,`Applicare ${m.formula}, dichiarando variabili e unità.`,`Confrontare due configurazioni e discutere i limiti del modello.`],
  prerequisites:unit.sector===0?unit.prerequisites:(i%25?[authored.courses[i-1].unitId]:[]),connections:[a.connection],sources:src,originalSource:unit.source||null,
  glossary:[{term:m.xLabel,definition:`Variabile indipendente, unità ${m.xUnit}; intervallo [${numeric(m.domain[0])}; ${numeric(m.domain[1])}].`},{term:m.yLabel,definition:`Risultato calcolato dal modello, unità ${m.yUnit}.`},...m.controls.map(c=>({term:c.label,definition:`Parametro ${c.key}, unità ${c.unit}; intervallo [${numeric(c.min)}; ${numeric(c.max)}].`}))],
  steps:[
   {label:titles[0],title:'La domanda della spedizione',text:levels([a.story,a.concept],[a.story,a.derivation],[a.story,a.extension,a.limit])},
   {label:titles[1],title:'Dall’intuizione alla relazione',text:levels([a.concept,a.example],[a.derivation,measure,a.example],[a.derivation,a.extension,a.misconception])},
   {label:titles[2],title:'Prevedi, modifica, confronta',text:levels([protocol,a.example,measure],[protocol,measure,a.derivation],[protocol,a.extension,view])},
   {label:titles[3],title:'Leggere senza sovrainterpretare',text:levels([a.misconception,a.limit,compare],[a.misconception,compare,view],[a.limit,a.extension,compare])},
   {label:titles[4],title:'Verifica ragionamento e calcolo',text:levels([a.concept,a.example],[a.derivation,measure],[a.extension,a.limit])},
   {label:titles[5],title:'Conclusione e nuova domanda',text:levels([`Nel diario distingui previsione, risultato e interpretazione. ${a.bound}.`,a.limit,`Collegamento consigliato: ${a.connection}. Il completamento registra attività e autoverifica, non certifica competenze.`],[a.derivation,a.limit,a.extension],[a.extension,a.limit,'Scrivi quale evidenza aggiuntiva servirebbe per trasferire la conclusione a un sistema reale.'])}
  ],questions};
 // Hand-written units replace the generated text and questions. With an activity they drop the model lab;
 // without one they keep the lab of their model and its A/B comparison.
 const proto=prototypes.get(unit.id);
 if(proto){for(const key of ['title','scope','narrativeStatus','objectives','prerequisites','connections','sources','glossary','steps','questions'])definition[key]=structuredClone(proto[key]);
  if(proto.activity)definition.activity=structuredClone(proto.activity);definition.coverage=proto.activity?'guided-activity':'guided-lab';definition.editorialStatus='hand-written-draft';}
 definitions.push(definition);
 unit.curriculum={path:`content/curriculum/${unit.id}.json`,modelId:unit.id,coverage:definition.coverage};
 if(unit.sector>0){unit.title=a.title;unit.status='guided';unit.coverage='guided-foundation';unit.description=a.concept;unit.prerequisites=definition.prerequisites;unit.tags=[['Matematica','Fisica','Chimica','Biologia'][unit.sector],a.title,a.bound];}
 if(proto&&unit.sector>0){unit.title=proto.title;unit.description=proto.description;unit.coverage=definition.coverage;unit.prerequisites=definition.prerequisites;unit.tags=[['Matematica','Fisica','Chimica','Biologia'][unit.sector],proto.title,proto.scope];}
 write(`content/curriculum/${unit.id}.json`,definition);
}
if(definitions.length!==100||MODEL_IDS.some(id=>!definitions.some(c=>c.id===id)))throw Error('Copertura incompleta');
write('content/catalogue.json',catalogue);
write('content/curriculum/index.json',{schemaVersion:1,version:'1.0.0',coverage:'100 nuclei guidati, non cento manuali integrali',courses:definitions.map(d=>({id:d.id,title:d.title,sector:d.sector,path:`content/curriculum/${d.id}.json`,coverage:d.coverage,questions:d.questions.length}))});
write('content/curriculum/bundle.json',{schemaVersion:1,version:'1.0.0',note:authored.note,sources,courses:definitions});
write('content/curriculum/paths.json',{schemaVersion:1,paths:[...['Matematica','Fisica','Chimica','Biologia'].map((title,sector)=>({id:'sector-'+sector,title,units:definitions.filter(d=>d.sector===sector).map(d=>d.id)})),{id:'climate',title:'Energia, temperatura e retroazioni',units:['math-c08','physics-19','chemistry-16','biology-24','biology-25']},{id:'structure',title:'Struttura, energia e materia',units:['math-p12','physics-25','chemistry-04','chemistry-07','biology-04']},{id:'population',title:'Crescita, probabilità ed evoluzione',units:['math-c06','math-c10','biology-07','biology-09','biology-13','biology-19']}]});
const built=load('content/curriculum/bundle.json');built.paths=load('content/curriculum/paths.json').paths;write('content/curriculum/bundle.json',built);
console.log(`Curriculum: ${definitions.length} unità, ${definitions.reduce((n,c)=>n+c.questions.length,0)} quesiti, ${sources.length} riferimenti. Contenuti originali, nessuna risorsa grafica aggiunta.`);
