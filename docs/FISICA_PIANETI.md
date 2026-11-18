# Fisica dei pianeti

Dalla versione 1.27.0 ogni sistema stellare e ogni pianeta esplorabile hanno un modello fisico. La stella ha un sottotipo spettrale con temperatura, luminosità, raggio e massa; ogni corpo del sistema ha un semiasse maggiore in unità astronomiche e un periodo orbitale; ogni pianeta esplorabile ha un albedo, una temperatura di equilibrio, un effetto serra e una temperatura superficiale, che insieme spiegano quello che il sito già disegna: i mari liquidi dei pianeti terrestri e oceanici, i ghiacci dei pianeti glaciali, i laghi caldi dei pianeti vulcanici. La carta d'identità di ogni pianeta (`docs/CARTE_IDENTITA.md`) resta invariata. Il modello sta in `src/worlds/physics.js` e `src/worlds/planet-physics.js`; questo documento è generato da `tools/physics_doc.mjs`, e i test di `tests/physics.test.mjs` ricalcolano ogni grandezza.

Nella vista in orbita il pulsante «Dati fisici» apre la scheda del pianeta, divisa in stella e orbita, geosfera, idrosfera, atmosfera e biosfera.

## Stelle

Le stelle sono nane di sequenza principale della tabella di E. Mamajek, «A Modern Mean Dwarf Stellar Color and Effective Temperature Sequence», versione del 16 aprile 2022, ripresa in Pecaut e Mamajek (2013). I sei sistemi di ciascun tipo prendono i sottotipi in ordine, dal più caldo al più freddo. Per tutti i sottotipi usati la luminosità tabulata coincide entro l'1,1 per cento con quella di un corpo nero di pari raggio e temperatura.

| tipo | sottotipi | temperatura (K) | luminosità (Sole = 1) | massa (Sole = 1) |
|---|---|---:|---:|---:|
| A | A0V, A2V, A5V, A7V | 7760-9700 | 10-38 | 1,77-2,18 |
| F | F0V, F2V, F5V, F8V | 6180-7220 | 1,9-7,2 | 1,18-1,61 |
| G | G0V, G2V, G5V, G8V | 5480-5930 | 0,68-1,3 | 0,94-1,06 |
| K | K0V, K2V, K3V, K5V, K7V | 4100-5270 | 0,1-0,46 | 0,64-0,88 |
| M | M0V, M1V, M2V, M3V, M4V, M5V | 3060-3850 | 0,003-0,069 | 0,162-0,57 |

## Zona abitabile

I bordi della zona abitabile seguono Kopparapu e colleghi (2014): il bordo interno è il limite dell'effetto serra galoppante, quello esterno il limite di massimo effetto serra dell'anidride carbonica, entrambi espressi come flusso efficace in unità del flusso ricevuto dalla Terra e calcolati con i coefficienti del loro programma `hzcalc.py`. Per il Sole i due bordi valgono 1,107 e 0,356. La formula vale per temperature efficaci fra 2600 e 7200 K; per le stelle più calde, cioè i sottotipi A e il sottotipo F0V, il modello usa il valore a 7200 K.

## Distanze delle orbite

Ogni famiglia di pianeti esplorabili richiede un intervallo di temperatura superficiale e un intervallo di albedo, riportati nella tabella seguente. Per ogni pianeta il modello calcola l'intervallo di flusso stellare nel quale la temperatura richiesta è raggiungibile con l'albedo della famiglia e con l'effetto serra consentito dalla sua atmosfera; i pianeti terrestri e oceanici devono inoltre stare dentro la zona abitabile, quelli glaciali non oltre il suo bordo interno.

| famiglia | temperatura superficiale | albedo di Bond | profondità ottica minima | analoghi |
|---|---|---|---:|---|
| terrestre | 275-305 K | 0,25-0,35 | 0,3 | Terra, albedo 0,294 |
| oceanico | 275-315 K | 0,2-0,35 | 0,3 | Terra con più oceano; l'acqua aperta riflette circa il 6 per cento, le nubi alzano l'albedo |
| desertico | 235-330 K | 0,2-0,3 | 0 | Marte, albedo 0,25 |
| roccioso senza aria | 80-420 K | 0,08-0,14 | 0 | Luna, albedo 0,11 |
| glaciale | 225-268 K | 0,45-0,65 | 0 | ghiaccio marino giovane, dal 50 al 70 per cento di luce riflessa, con rocce e nubi |
| vulcanico | 280-360 K | 0,3-0,77 | 0,3 | dalla Terra a Venere, albedo 0,77 |

Le temperature massime dei pianeti vulcanici e desertici restano compatibili con le specie che li abitano; quelle minime dei pianeti glaciali con le loro piante antigelo.

I pianeti esplorabili vengono disposti nell'ordine che li lascia tutti il più possibile dentro il proprio intervallo; fra gli ordini quasi altrettanto robusti si preferisce quello che va dal più caldo, all'interno, al più freddo, all'esterno. Fra due orbite vicine resta sempre una distanza di almeno 10 raggi di Hill reciproci, soglia oltre la quale sistemi di più pianeti di massa terrestre restano stabili per tempi lunghi (Chambers, Wetherill e Boss 1996). I corpi che non si visitano vanno all'interno se sono caldi (mondi rocciosi nudi, desertici, vulcanici e simili a Venere) e all'esterno se sono freddi (giganti gassosi oltre la linea della neve, giganti ghiacciati, mondi gelati). Le masse sono stimate dal raggio disegnato: i pianeti rocciosi hanno la densità della Terra, quindi raggio e gravità in unità terrestri coincidono e la massa ne è il cubo; i giganti gassosi vanno da Saturno (95,16 masse terrestri) a Giove (317,83), quelli ghiacciati da Urano (14,54) a Nettuno (17,15).

Nella vista del sistema il raggio disegnato di un'orbita cresce con il logaritmo naturale del semiasse, di 2,2 unità della scena ogni volta che la distanza si moltiplica per il numero di Nepero, senza scendere sotto la spaziatura minima fra due pianeti. I numeri dei pianeti indicano l'ordine di studio dell'area.

## Temperatura

La temperatura di equilibrio di un pianeta che riceve il flusso S, in unità del flusso terrestre di 1361 W/m², con albedo di Bond A è

T_eq = [S · 1361 W/m² · (1 − A) / (4σ)]^(1/4),

con σ la costante di Stefan-Boltzmann. L'effetto serra è quello di un'atmosfera grigia in equilibrio radiativo, nell'approssimazione di Eddington:

T_s = T_eq · (1 + 3τ/4)^(1/4),

dove τ è la profondità ottica infrarossa dell'atmosfera. Il modello è tarato sui tre pianeti rocciosi con atmosfera del sistema solare, con i valori delle schede planetarie della NASA:

| pianeta | irradianza (W/m²) | albedo di Bond | T_eq (K) | temperatura media (K) | pressione (bar) | profondità ottica |
|---|---:|---:|---:|---:|---:|---:|
| Venere | 2601,3 | 0,77 | 226,6 | 737 | 92 | 148 |
| Terra | 1361 | 0,294 | 255,1 | 288 | 1,01 | 0,832 |
| Marte | 586,2 | 0,25 | 209,8 | 214 | 0,00636 | 0,109 |

Venere e Marte hanno atmosfere quasi di sola anidride carbonica (96,5 e 95,1 per cento in volume). La legge di potenza che passa per i due punti, τ = 4,92 · p^0,753 con p in bar, dà la profondità ottica di un'atmosfera di sola anidride carbonica alla pressione p; un'atmosfera reale sta fra zero e questa curva. La Terra, fatta per lo più di azoto e ossigeno, ha il 17 per cento dell'opacità che avrebbe con sola anidride carbonica alla stessa pressione. Nel modello la profondità ottica di ogni pianeta resta sotto la curva, sopra il minimo della sua famiglia, e ne determina la temperatura superficiale.

La pressione al suolo viene dalla densità dell'atmosfera della carta d'identità, d fra 0 e 1, con la scala logaritmica p = 10^(4,5 d − 2,5) bar: d = 0,05 dà la pressione di Marte, d = 0,55 circa un bar, d = 0,95 circa sessanta bar. Sotto d = 0,1 il pianeta ha soltanto un'esosfera, senza effetto serra.

## Limiti

Il modello è a dimensione zero: una sola temperatura per pianeta, senza stagioni, senza circolazione e senza il legame fra nubi, albedo e temperatura. Le orbite sono circolari nel calcolo dei flussi, la rotazione sincrona dei pianeti vicini alle nane rosse non è trattata, e le masse dei corpi vengono da una regola sul raggio. Albedo, profondità ottica e posizione di ogni pianeta sono scelti dentro gli intervalli della sua famiglia, così che il pianeta mostri il clima che il sito disegna; sono quindi valori plausibili e coerenti con le leggi fisiche del modello, scelti per il sito in assenza di misure. Per le stelle di tipo A la zona abitabile è un'estrapolazione.

## Pianeti

Per ogni sistema: sottotipo della stella, e per ogni pianeta esplorabile la distanza dalla stella in unità astronomiche, il periodo, il flusso ricevuto rispetto alla Terra, la posizione rispetto alla zona abitabile, la temperatura superficiale, la pressione e la profondità ottica.

### 1. Numeri e ragionamento

Stella K0V, 5270 K, luminosità 0,46 volte quella del Sole, massa 0,88; zona abitabile fra 0,66 e 1,2 UA. Corpi del sistema: 12.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Ragionamento, conteggio e infinito | oceanico | 0,714 | 235 | 0,9 | abitabile | 296 | 12 | 1,4 |
| Esistenza, unicità e approssimazione | desertico | 0,829 | 294 | 0,67 | abitabile | 242 | 0,045 | 0,12 |
| Linguaggio e ragionamento matematico | glaciale | 0,923 | 346 | 0,54 | abitabile | 227 | 0,11 | 0,82 |
| Radici, campi e nuovi sistemi numerici | terrestre | 1,06 | 423 | 0,41 | abitabile | 280 | 0,71 | 3,6 |

### 2. Algebra ed equazioni

Stella F0V, 7220 K, luminosità 7,2 volte quella del Sole, massa 1,61; zona abitabile fra 2,4 e 4,1 UA. Corpi del sistema: 9.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Equazioni e sistemi | vulcanico | 0,929 | 258 | 8,4 | interna | 360 | 21 | 0,3 |
| Algebra | oceanico | 2,57 | 1190 | 1,1 | abitabile | 302 | 12 | 0,99 |
| Radicali | desertico | 2,85 | 1380 | 0,89 | abitabile | 260 | 0,014 | 0,097 |
| Disequazioni | glaciale | 3,18 | 1630 | 0,72 | abitabile | 226 | 0,033 | 0,35 |
| Dagli zeri alla struttura di un polinomio | terrestre | 3,61 | 1980 | 0,56 | abitabile | 288 | 0,45 | 2,4 |
| Complessi, aritmetica e polinomi | roccioso senza aria | 4,14 | 2420 | 0,42 | esterna | 216 | esosfera | 0 |

### 3. Funzioni e variazione

Stella K2V, 5100 K, luminosità 0,37 volte quella del Sole, massa 0,82; zona abitabile fra 0,6 e 1,1 UA. Corpi del sistema: 9.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Limiti, variazione e accumulazione | vulcanico | 0,239 | 47 | 6,5 | interna | 360 | 1,2 | 0,31 |
| Esponenziali e logaritmi | desertico | 0,447 | 121 | 1,9 | interna | 307 | 0,01 | 0,061 |
| Iterazioni, stabilità e precisione numerica | oceanico | 0,742 | 258 | 0,67 | abitabile | 292 | 0,74 | 1,8 |
| Funzioni | terrestre | 0,88 | 333 | 0,48 | abitabile | 284 | 2,7 | 3,2 |

### 4. Geometria e trasformazioni

Stella G0V, 5930 K, luminosità 1,3 volte quella del Sole, massa 1,06; zona abitabile fra 1,1 e 1,9 UA. Corpi del sistema: 8.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Vettori, matrici, dati e vincoli | glaciale | 1,23 | 486 | 0,89 | abitabile | 234 | 0,017 | 0,15 |
| Trigonometria | oceanico | 1,42 | 603 | 0,66 | abitabile | 300 | 5,6 | 2,7 |
| Geometria analitica | terrestre | 1,63 | 741 | 0,51 | abitabile | 283 | 5,2 | 2,9 |
| Geometrie, trasformazioni e simmetrie | desertico | 1,81 | 863 | 0,41 | abitabile | 243 | 0,17 | 1 |
| Geometria elementare | roccioso senza aria | 2,06 | 1050 | 0,32 | esterna | 203 | esosfera | 0 |

### 5. Probabilità e dati

Stella F2V, 6820 K, luminosità 5,1 volte quella del Sole, massa 1,46; zona abitabile fra 2 e 3,5 UA. Corpi del sistema: 7.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Combinatoria, probabilità e statistica | oceanico | 2,34 | 1080 | 0,94 | abitabile | 293 | 8,2 | 0,91 |
| Probabilità, informazione e fenomeni collettivi | desertico | 2,64 | 1300 | 0,74 | abitabile | 247 | 0,014 | 0,13 |
| Reti, conservazione e strategie | terrestre | 2,93 | 1520 | 0,6 | abitabile | 292 | 1,5 | 2,8 |

### 6. Matematica per le scienze

Stella G2V, 5770 K, luminosità 1 volte quella del Sole, massa 1; zona abitabile fra 0,96 e 1,7 UA. Corpi del sistema: 6.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Onde, frequenze e ricostruzione | desertico | 0,671 | 201 | 2,3 | interna | 326 | 0,11 | 0,052 |
| Oscillazioni, molecole e quantizzazione | oceanico | 1,07 | 406 | 0,89 | abitabile | 294 | 1,2 | 1,5 |
| Scala, energia, equilibrio e trasformazioni | glaciale | 1,21 | 487 | 0,7 | abitabile | 232 | 0,05 | 0,38 |

### 7. Misura e moto

Stella M0V, 3850 K, luminosità 0,069 volte quella del Sole, massa 0,57; zona abitabile fra 0,27 e 0,52 UA. Corpi del sistema: 11.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Vettori e sistemi di riferimento | desertico | 0,173 | 34,9 | 2,3 | interna | 324 | 0,084 | 0,12 |
| Moto uniformemente accelerato | oceanico | 0,3 | 79,5 | 0,77 | abitabile | 295 | 1,1 | 1,9 |
| Moto rettilineo uniforme | glaciale | 0,342 | 96,6 | 0,59 | abitabile | 231 | 0,11 | 0,7 |
| Traiettorie e lanci | terrestre | 0,39 | 118 | 0,45 | abitabile | 279 | 0,57 | 2,7 |
| Misure, unità e incertezza | roccioso senza aria | 0,444 | 143 | 0,35 | abitabile | 210 | esosfera | 0 |

### 8. Forze ed energia

Stella M1V, 3660 K, luminosità 0,041 volte quella del Sole, massa 0,5; zona abitabile fra 0,21 e 0,4 UA. Corpi del sistema: 5.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Attrito e vincoli | vulcanico | 0,0712 | 9,81 | 8 | interna | 360 | 45 | 0,3 |
| Forze e leggi di Newton | desertico | 0,133 | 25,2 | 2,3 | interna | 326 | 0,062 | 0,094 |
| Lavoro ed energia | glaciale | 0,232 | 57,6 | 0,76 | abitabile | 225 | 0,03 | 0,35 |
| Quantità di moto e urti | oceanico | 0,274 | 74 | 0,54 | abitabile | 304 | 1,9 | 3,3 |

### 9. Rotazioni e gravità

Stella F2V, 6820 K, luminosità 5,1 volte quella del Sole, massa 1,46; zona abitabile fra 2 e 3,5 UA. Corpi del sistema: 10.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Momenti, leve ed equilibrio | vulcanico | 0,942 | 276 | 5,8 | interna | 360 | 2,2 | 0,3 |
| Gravitazione | oceanico | 2,65 | 1310 | 0,73 | abitabile | 285 | 0,41 | 1,6 |
| Rotazione e momento d’inerzia | desertico | 2,93 | 1510 | 0,6 | abitabile | 250 | 0,14 | 0,63 |
| Orbite circolari | roccioso senza aria | 3,27 | 1790 | 0,48 | abitabile | 224 | esosfera | 0 |

### 10. Fluidi, oscillazioni e onde

Stella G2V, 5770 K, luminosità 1 volte quella del Sole, massa 1; zona abitabile fra 0,96 e 1,7 UA. Corpi del sistema: 12.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Galleggiamento e Archimede | vulcanico | 0,362 | 79,7 | 7,8 | interna | 359 | 0,78 | 0,31 |
| Oscillazioni armoniche | oceanico | 1,09 | 414 | 0,87 | abitabile | 292 | 1,1 | 1,4 |
| Onde e sovrapposizione | glaciale | 1,25 | 508 | 0,66 | abitabile | 232 | 0,071 | 0,44 |
| Fluidi e pressione | terrestre | 1,43 | 628 | 0,5 | abitabile | 297 | 1,1 | 3,6 |

### 11. Calore e termodinamica

Stella M2V, 3560 K, luminosità 0,029 volte quella del Sole, massa 0,44; zona abitabile fra 0,18 e 0,34 UA. Corpi del sistema: 5.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Calore e capacità termica | vulcanico | 0,0603 | 8,14 | 7,9 | interna | 359 | 19 | 0,31 |
| Termodinamica e rendimento | desertico | 0,113 | 20,9 | 2,3 | interna | 320 | 0,049 | 0,098 |
| Gas ideali | glaciale | 0,197 | 48 | 0,75 | abitabile | 225 | 0,036 | 0,4 |

### 12. Elettromagnetismo e quanti

Stella F5V, 6550 K, luminosità 3,6 volte quella del Sole, massa 1,33; zona abitabile fra 1,7 e 3 UA. Corpi del sistema: 9.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Potenziale ed energia elettrica | vulcanico | 0,662 | 171 | 8,3 | interna | 359 | 11 | 0,31 |
| Cariche e campo elettrico | oceanico | 1,89 | 825 | 1 | abitabile | 304 | 0,56 | 1,2 |
| Induzione elettromagnetica | terrestre | 2,13 | 982 | 0,8 | abitabile | 287 | 2,2 | 1,5 |
| Circuiti e legge di Ohm | desertico | 2,37 | 1160 | 0,64 | abitabile | 240 | 0,021 | 0,19 |
| Fotoni ed energia quantizzata | glaciale | 2,64 | 1360 | 0,52 | abitabile | 225 | 0,13 | 1 |

### 13. Materia e atomi

Stella G5V, 5660 K, luminosità 0,89 volte quella del Sole, massa 0,98; zona abitabile fra 0,9 e 1,6 UA. Corpi del sistema: 10.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Atomi, isotopi e massa media | desertico | 0,642 | 190 | 2,2 | interna | 315 | esosfera | 0 |
| Materia, proprietà e densità | oceanico | 1,03 | 387 | 0,84 | abitabile | 298 | 0,65 | 1,4 |
| Livelli atomici e spettri | terrestre | 1,18 | 475 | 0,64 | abitabile | 283 | 4,7 | 1,7 |
| Periodicità e carica efficace | glaciale | 1,37 | 591 | 0,48 | abitabile | 225 | 0,21 | 1,5 |
| Mole e quantità di sostanza | roccioso senza aria | 1,59 | 738 | 0,35 | abitabile | 208 | esosfera | 0 |

### 14. Legami e molecole

Stella M3V, 3430 K, luminosità 0,016 volte quella del Sole, massa 0,37; zona abitabile fra 0,13 e 0,26 UA. Corpi del sistema: 12.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Geometria molecolare e VSEPR | vulcanico | 0,0564 | 8,04 | 5,1 | interna | 358 | 2 | 0,37 |
| Legame ionico e interazioni elettrostatiche | desertico | 0,106 | 20,6 | 1,5 | interna | 297 | 0,049 | 0,19 |
| Forze intermolecolari | oceanico | 0,184 | 47,6 | 0,48 | abitabile | 297 | 13 | 3,5 |
| Legame covalente ed energia di legame | roccioso senza aria | 0,227 | 65,1 | 0,31 | abitabile | 202 | esosfera | 0 |

### 15. Stati e soluzioni

Stella A0V, 9700 K, luminosità 38 volte quella del Sole, massa 2,18; zona abitabile fra 5,4 e 9,3 UA. Corpi del sistema: 11.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Gas e stato aeriforme | oceanico | 6,2 | 3810 | 0,99 | abitabile | 293 | 16 | 1,1 |
| Stati della materia e transizioni | glaciale | 6,72 | 4310 | 0,84 | abitabile | 225 | 0,022 | 0,28 |
| Solubilità ed equilibrio eterogeneo | desertico | 7,42 | 5000 | 0,69 | abitabile | 257 | 0,13 | 0,62 |
| Soluzioni e concentrazione | roccioso senza aria | 8,34 | 5960 | 0,55 | abitabile | 234 | esosfera | 0 |

### 16. Reazioni e quantità

Stella K3V, 4830 K, luminosità 0,28 volte quella del Sole, massa 0,78; zona abitabile fra 0,53 e 0,97 UA. Corpi del sistema: 10.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Resa e bilanci di materia | desertico | 0,399 | 104 | 1,8 | interna | 295 | esosfera | 0 |
| Stechiometria e reagente limitante | oceanico | 0,67 | 227 | 0,63 | abitabile | 293 | 2,7 | 2,7 |
| Termochimica e calorimetria | terrestre | 0,766 | 277 | 0,48 | abitabile | 291 | 3,5 | 3,1 |

### 17. Velocità ed equilibrio

Stella A2V, 8800 K, luminosità 24 volte quella del Sole, massa 1,98; zona abitabile fra 4,3 e 7,4 UA. Corpi del sistema: 6.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Perturbazioni dell’equilibrio | vulcanico | 2,04 | 758 | 5,7 | interna | 360 | 44 | 0,3 |
| Equilibrio chimico | oceanico | 5,65 | 3490 | 0,75 | abitabile | 289 | 0,7 | 1,3 |
| Temperatura e attivazione | desertico | 6,32 | 4130 | 0,6 | abitabile | 260 | 0,16 | 0,91 |
| Velocità di reazione | roccioso senza aria | 7,19 | 5000 | 0,46 | abitabile | 223 | esosfera | 0 |

### 18. Acidi, redox e carbonio

Stella A2V, 8800 K, luminosità 24 volte quella del Sole, massa 1,98; zona abitabile fra 4,3 e 7,4 UA. Corpi del sistema: 12.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Acidi, basi e pH | vulcanico | 1,71 | 580 | 8,2 | interna | 360 | 1,3 | 0,3 |
| Polimeri e materiali | oceanico | 4,73 | 2670 | 1,1 | abitabile | 296 | 14 | 0,7 |
| Ossidazione, riduzione ed elettrochimica | terrestre | 5,33 | 3190 | 0,85 | abitabile | 288 | 0,58 | 1,1 |
| Chimica organica e scheletri carboniosi | glaciale | 5,97 | 3790 | 0,67 | abitabile | 228 | 0,052 | 0,33 |
| Soluzioni tampone | roccioso senza aria | 6,65 | 4450 | 0,54 | abitabile | 233 | esosfera | 0 |

### 19. La vita e la cellula

Stella K3V, 4830 K, luminosità 0,28 volte quella del Sole, massa 0,78; zona abitabile fra 0,53 e 0,97 UA. Corpi del sistema: 12.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Membrane e protocellule | vulcanico | 0,223 | 43,6 | 5,7 | interna | 341 | 1,1 | 0,81 |
| Cellule, scala e superficie | desertico | 0,418 | 112 | 1,6 | interna | 317 | 0,16 | 0,63 |
| Che cos'è la vita | glaciale | 0,702 | 243 | 0,57 | abitabile | 233 | 0,27 | 1,4 |

### 20. Molecole dal cosmo

Stella M4V, 3210 K, luminosità 0,0072 volte quella del Sole, massa 0,23; zona abitabile fra 0,088 e 0,17 UA. Corpi del sistema: 10.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Meteoriti, comete e campioni di asteroidi | terrestre | 0,112 | 28,7 | 0,57 | abitabile | 291 | 5,3 | 2,5 |
| Elementi e molecole della vita nello spazio | glaciale | 0,14 | 39,9 | 0,37 | abitabile | 227 | 0,56 | 2,9 |
| Chiralità e omochiralità | roccioso senza aria | 0,174 | 55,4 | 0,24 | abitabile | 190 | esosfera | 0 |

### 21. Chimica prebiotica

Stella A5V, 8100 K, luminosità 12 volte quella del Sole, massa 1,88; zona abitabile fra 3,1 e 5,3 UA. Corpi del sistema: 6.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Sorgenti idrotermali e metabolismo primordiale | terrestre | 4,05 | 2170 | 0,75 | abitabile | 290 | 3,6 | 1,5 |
| Energia, enzimi e catalisi | desertico | 4,43 | 2480 | 0,63 | abitabile | 258 | 0,12 | 0,71 |
| Miller-Urey e la sintesi prebiotica | glaciale | 4,86 | 2850 | 0,52 | abitabile | 244 | 0,45 | 1,6 |

### 22. Informazione e replicatori

Stella G5V, 5660 K, luminosità 0,89 volte quella del Sole, massa 0,98; zona abitabile fra 0,9 e 1,6 UA. Corpi del sistema: 9.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Il mondo a RNA | desertico | 0,821 | 275 | 1,3 | interna | 283 | 0,015 | 0,14 |
| Mutazioni e soglia d'errore | roccioso senza aria | 0,948 | 341 | 0,99 | abitabile | 269 | esosfera | 0 |
| DNA, codice genetico ed espressione | glaciale | 1,32 | 560 | 0,51 | abitabile | 236 | 0,52 | 2,4 |

### 23. Evoluzione e albero della vita

Stella K5V, 4440 K, luminosità 0,17 volte quella del Sole, massa 0,7; zona abitabile fra 0,42 e 0,78 UA. Corpi del sistema: 11.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Le prime tracce della vita e il tempo geologico | vulcanico | 0,152 | 25,8 | 7,5 | interna | 356 | 0,75 | 0,34 |
| Deriva genetica | desertico | 0,285 | 66,3 | 2,1 | interna | 323 | 0,011 | 0,12 |
| L'albero universale e LUCA | oceanico | 0,486 | 148 | 0,74 | abitabile | 297 | 0,35 | 1,9 |
| Ossigeno, endosimbiosi e cellule complesse | roccioso senza aria | 0,564 | 185 | 0,55 | abitabile | 234 | esosfera | 0 |
| Ereditarietà e selezione naturale | glaciale | 0,667 | 238 | 0,39 | abitabile | 225 | 0,33 | 2,2 |

### 24. Vita ai limiti

Stella F5V, 6550 K, luminosità 3,6 volte quella del Sole, massa 1,33; zona abitabile fra 1,7 e 3 UA. Corpi del sistema: 11.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Fotosintesi e luce di altre stelle | vulcanico | 0,72 | 194 | 7 | interna | 360 | 0,76 | 0,31 |
| Respirazione, fermentazione e chemiosintesi | desertico | 1,35 | 497 | 2 | interna | 321 | 0,16 | 0,23 |
| Crescita delle popolazioni microbiche | roccioso senza aria | 1,53 | 598 | 1,6 | interna | 301 | esosfera | 0 |
| Estremofili | glaciale | 2,06 | 936 | 0,86 | abitabile | 233 | 0,034 | 0,097 |

### 25. Pianeti abitabili

Stella A5V, 8100 K, luminosità 12 volte quella del Sole, massa 1,88; zona abitabile fra 3,1 e 5,3 UA. Corpi del sistema: 9.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| La zona abitabile | desertico | 2,34 | 954 | 2,2 | interna | 321 | 0,009 | 0,048 |
| Abitabilità attorno alle nane rosse | roccioso senza aria | 2,57 | 1090 | 1,9 | interna | 318 | esosfera | 0 |
| Biosfera, albedo e Daisyworld | terrestre | 3,45 | 1710 | 1 | abitabile | 283 | 5,7 | 0,58 |
| Atmosfere, effetto serra e clima | glaciale | 3,82 | 1990 | 0,84 | abitabile | 225 | 0,015 | 0,21 |

### 26. Mondi del sistema solare

Stella G8V, 5480 K, luminosità 0,68 volte quella del Sole, massa 0,94; zona abitabile fra 0,8 e 1,4 UA. Corpi del sistema: 9.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Marte: acqua e abitabilità passata | desertico | 0,57 | 162 | 2,1 | interna | 316 | esosfera | 0 |
| Encelado e i suoi pennacchi | oceanico | 0,927 | 336 | 0,79 | abitabile | 294 | 5,9 | 1,5 |
| Titano, la chimica senza acqua | terrestre | 1,07 | 414 | 0,6 | abitabile | 286 | 0,41 | 2,2 |
| Europa e gli oceani sotto il ghiaccio | glaciale | 1,24 | 522 | 0,44 | abitabile | 233 | 0,47 | 2,6 |
| Cercare la vita su Marte | roccioso senza aria | 1,45 | 656 | 0,32 | esterna | 205 | esosfera | 0 |

### 27. Cercare la vita nella galassia

Stella M5V, 3060 K, luminosità 0,003 volte quella del Sole, massa 0,162; zona abitabile fra 0,057 e 0,11 UA. Corpi del sistema: 12.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Scoprire gli esopianeti | vulcanico | 0,0204 | 2,64 | 7,3 | interna | 360 | 22 | 0,3 |
| Panspermia e protezione planetaria | desertico | 0,0382 | 6,78 | 2,1 | interna | 313 | 0,011 | 0,12 |
| Biofirme e falsi positivi | terrestre | 0,0668 | 15,7 | 0,68 | abitabile | 288 | 0,32 | 1,8 |
| Atmosfere degli esopianeti e JWST | oceanico | 0,0879 | 23,7 | 0,39 | abitabile | 305 | 1,6 | 5,2 |
| Tecnofirme, SETI ed equazione di Drake | roccioso senza aria | 0,116 | 36 | 0,22 | esterna | 185 | esosfera | 0 |

### 28. Luce e telescopi

Stella A7V, 7760 K, luminosità 10 volte quella del Sole, massa 1,77; zona abitabile fra 2,8 e 4,8 UA. Corpi del sistema: 10.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Interferenza e interferometri | desertico | 2,15 | 863 | 2,2 | interna | 316 | esosfera | 0 |
| Specchi, lenti e telescopi | oceanico | 3,17 | 1550 | 1 | abitabile | 303 | 0,55 | 1,1 |
| Radiazione termica e luce delle stelle | glaciale | 3,45 | 1760 | 0,84 | abitabile | 226 | 0,022 | 0,26 |
| Onde elettromagnetiche e pressione della luce | terrestre | 3,73 | 1980 | 0,72 | abitabile | 282 | 0,26 | 1,6 |
| Diffrazione e potere risolutivo | roccioso senza aria | 4,03 | 2220 | 0,62 | abitabile | 241 | esosfera | 0 |

### 29. Campi e plasmi nello spazio

Stella K7V, 4100 K, luminosità 0,1 volte quella del Sole, massa 0,64; zona abitabile fra 0,32 e 0,61 UA. Corpi del sistema: 10.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Correnti, dipoli e dinamo dei pianeti | desertico | 0,207 | 43,1 | 2,3 | interna | 326 | 0,049 | 0,026 |
| Particelle cariche nei campi magnetici | oceanico | 0,357 | 97,6 | 0,78 | abitabile | 287 | 4 | 1,2 |
| Equazioni di Maxwell e magnetismo della materia | glaciale | 0,403 | 117 | 0,62 | abitabile | 228 | 0,076 | 0,58 |
| Legge di Gauss: gusci, pianeti e condensatori | terrestre | 0,454 | 140 | 0,48 | abitabile | 286 | 0,63 | 2,9 |
| Induzione, circuiti oscillanti e radio | roccioso senza aria | 0,521 | 172 | 0,37 | abitabile | 212 | esosfera | 0 |

### 30. Dalla relatività al Big Bang

Stella F8V, 6180 K, luminosità 1,9 volte quella del Sole, massa 1,18; zona abitabile fra 1,3 e 2,3 UA. Corpi del sistema: 7.

| unità | famiglia | distanza (UA) | periodo (giorni) | flusso | zona | temperatura (K) | pressione (bar) | τ |
|---|---|---:|---:|---:|---|---:|---:|---:|
| Energia dal nucleo: fusione nelle stelle | vulcanico | 0,504 | 120 | 7,7 | interna | 357 | 30 | 0,34 |
| Nuclei, decadimenti e datazioni | desertico | 0,944 | 308 | 2,2 | interna | 322 | 0,051 | 0,058 |
| Particelle, espansione e Big Bang | oceanico | 1,47 | 600 | 0,9 | abitabile | 292 | 7,4 | 0,99 |
| Relatività ristretta | terrestre | 1,63 | 698 | 0,74 | abitabile | 291 | 7,3 | 1,9 |
| Onde di materia, atomi e righe spettrali | glaciale | 1,82 | 825 | 0,59 | abitabile | 231 | 0,11 | 0,74 |

## Fonti

- E. Mamajek, «A Modern Mean Dwarf Stellar Color and Effective Temperature Sequence», versione 2022.04.16: https://www.pas.rochester.edu/~emamajek/EEM_dwarf_UBVIJHK_colors_Teff.txt; M. J. Pecaut, E. E. Mamajek, ApJS 208, 9 (2013).
- R. K. Kopparapu e colleghi, ApJL 787, L29 (2014); coefficienti in `hzcalc.py`: https://personal.ems.psu.edu/~jfk4/ruk15/planets/hzcalc.py.
- NASA, schede planetarie di Venere, Terra, Marte e Luna: https://nssdc.gsfc.nasa.gov/planetary/factsheet/.
- J. E. Chambers, G. W. Wetherill, A. P. Boss, «The Stability of Multi-Planet Systems», Icarus 119, 261 (1996).
- Unione Astronomica Internazionale, risoluzione B3 del 2015: irradianza solare totale nominale di 1361 W/m², temperatura efficace nominale del Sole di 5772 K.
- CODATA 2018 per la costante di Stefan-Boltzmann.
- Canadian Cryospheric Information Network, «Sea Ice Energy Flux», sull'albedo dell'acqua aperta e del ghiaccio marino.
