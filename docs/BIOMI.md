# Biomi delle zone di atterraggio

Questo file è generato da `node scripts/biomi.mjs` a partire da `src/worlds/biomes.js`; `tests/biomi.test.mjs` controlla che corrisponda al codice.

Dalla versione 1.71.0 la zona di atterraggio di ogni pianeta, un quadrato di circa 4,0 km di lato, è un mosaico di biomi. Ogni pianeta ne ha da cinque a otto (37 pianeti ne hanno cinque, 43 sei, 28 sette e 17 otto), scelti fra i 46 tipi del catalogo che appartengono alla sua famiglia e che la sua fisica consente: le foreste richiedono un’aria densa, le paludi e le lagune mari estesi, i campi di crateri dei deserti un’aria sottile, che frena poco i meteoriti e cancella lentamente i bordi. Il primo bioma di ogni elenco è quello dello stile del terreno del pianeta, che resta il terreno intorno alla base. Due pianeti non hanno mai lo stesso insieme di biomi.

## Come nasce la carta dei biomi

La zona è divisa in celle di Voronoi intorno a punti distanti 320 unità (509 m), spostati a caso fino a 0,35 della distanza. Ogni cella prende un bioma dall’altezza, dalla pendenza e dalla vicinanza del mare nella mappa del pianeta, con una quota di caso: le paludi preferiscono le terre basse vicine al mare, i gradoni e le mesa le alture, i canyon e i campi di massi i pendii. Ogni bioma del pianeta occupa almeno 3 celle della zona e nessuno più di tre decimi; le celle entro 330 unità dalla base hanno il bioma dello stile del pianeta. Fra due celle il terreno passa da un bioma all’altro su circa 110 unità (175 m).

Un bioma ha forme proprie, uno stile di terreno di `src/worlds/terrain.js` con un suo seme, una sua scala e un suo rilievo, oppure un bacino spianato verso il mare o verso il fondo della cella; i coni, i crateri e gli anelli si ripetono su una griglia di tessere che copre tutta la zona. Ha poi colori propri della roccia, della vegetazione e della neve, e rocce proprie: massi, lastre e guglie, generati a gruppi di 64 × 64 unità intorno alla camera. I mari, le coste e i fondali restano quelli della mappa del pianeta. Il quadrato delle stazioni conserva il terreno delle versioni precedenti fino a 160 unità dalla base, e i biomi prendono il posto delle forme locali fra 160 e 360 unità (255 e 573 m).

Nella colonna del rilievo l’altezza fra il 1° e il 99° percentile delle forme del bioma, in metri, per un pianeta di rilievo medio; le rocce sono quelle attese in un gruppo di 64 × 64 unità tutto nel bioma.

## Tipi di bioma (46)

### Terrestre (19 pianeti)

| Bioma | Descrizione | Condizioni | Rilievo | Rocce | Pianeti |
|---|---|---|---:|---:|---:|
| Prateria | Pianura alluvionale coperta di vegetazione bassa e continua, con canali poco incisi dove scorre l’acqua delle piene. Terreno proprio dei pianeti di stile «Pianura alluvionale». | nessuna | 10 m | 2 | 14 |
| Colline | Colline arrotondate dall’erosione, con valli fluviali sinuose fra un rilievo e l’altro. Terreno proprio dei pianeti di stile «Colline e fiumi». | nessuna | 35 m | 3 | 14 |
| Gradoni | Versanti a gradini formati da strati di roccia di diversa durezza: gli strati teneri si erodono e quelli duri restano come ripiani. Terreno proprio dei pianeti di stile «Altopiani a terrazze». | nessuna | 41 m | 6 | 13 |
| Foresta | Rilievi dolci sotto una copertura vegetale fitta, dove l’umidità del suolo sostiene la produzione primaria più alta della zona. | aria con densità almeno 0,35 | 19 m | 3 | 11 |
| Brughiera | Rilievi ondulati su suoli poveri e acidi, con arbusti bassi e affioramenti di roccia. | nessuna | 22 m | 14 | 10 |
| Palude | Terreno quasi piano poco sopra il livello del mare, saturo d’acqua, con vegetazione scura e densa. | mare su almeno il 25 % della superficie | 3 m | 0 | 16 |
| Calanchi | Rete fitta di creste e solchi scavati dall’acqua di ruscellamento in rocce argillose poco permeabili. | nessuna | 25 m | 2 | 13 |
| Steppa | Pianura ampia e asciutta con vegetazione rada; le piogge scarse limitano la copertura del suolo. | aria con densità almeno 0,3 | 10 m | 4 | 13 |
| Campo di massi | Campo di massi staccati dai versanti per frantumazione meccanica e accumulati su un terreno irregolare. | nessuna | 16 m | 60 | 9 |
| Mesa | Rilievi tabulari con cima piatta e pareti ripide: uno strato resistente in cima protegge la roccia più tenera sottostante. Terreno proprio dei pianeti di stile «Mese e altipiani». | nessuna | 48 m | 10 | 12 |

### Oceanico (23 pianeti)

| Bioma | Descrizione | Condizioni | Rilievo | Rocce | Pianeti |
|---|---|---|---:|---:|---:|
| Foresta | Rilievi dolci sotto una copertura vegetale fitta, dove l’umidità del suolo sostiene la produzione primaria più alta della zona. | aria con densità almeno 0,35 | 19 m | 3 | 12 |
| Campo di massi | Campo di massi staccati dai versanti per frantumazione meccanica e accumulati su un terreno irregolare. | nessuna | 16 m | 60 | 9 |
| Arcipelago | Isole e bracci di mare fra rilievi in parte sommersi. Terreno proprio dei pianeti di stile «Arcipelago». | nessuna | 38 m | 3 | 21 |
| Atolli | Anelli di scogliera intorno a lagune poco profonde, resti di antichi coni sprofondati. Terreno proprio dei pianeti di stile «Atolli e lagune». | nessuna | 22 m | 2 | 15 |
| Fiordi | Valli strette e profonde scavate dai ghiacci e poi invase dal mare. Terreno proprio dei pianeti di stile «Fiordi». | nessuna | 64 m | 6 | 18 |
| Laguna | Specchi d’acqua bassi separati dal mare da cordoni di sabbia e isolotti piatti. | mare su almeno il 30 % della superficie | 5 m | 1 | 14 |
| Scogliere | Coste alte e tavolati di roccia, tagliati da fratture dove il mare erode la base dei versanti. | nessuna | 38 m | 14 | 16 |
| Palude salmastra | Piana costiera inondata dalle maree, con acqua salmastra e vegetazione tollerante al sale. | mare su almeno il 30 % della superficie | 3 m | 0 | 17 |
| Dune costiere | Cordoni di dune formati dalla sabbia che il vento solleva dalle spiagge. | nessuna | 13 m | 0 | 17 |
| Altopiano vulcanico | Tavolato di lave antiche con coni isolati, ancora ben conservati sopra il livello del mare. | nessuna | 41 m | 6 | 15 |

### Desertico (27 pianeti)

| Bioma | Descrizione | Condizioni | Rilievo | Rocce | Pianeti |
|---|---|---|---:|---:|---:|
| Campo di massi | Campo di massi staccati dai versanti per frantumazione meccanica e accumulati su un terreno irregolare. | nessuna | 16 m | 60 | 9 |
| Mesa | Rilievi tabulari con cima piatta e pareti ripide: uno strato resistente in cima protegge la roccia più tenera sottostante. Terreno proprio dei pianeti di stile «Mese e altipiani». | nessuna | 48 m | 10 | 24 |
| Erg | Mare di dune: la sabbia si accumula in creste parallele orientate dal vento dominante. Terreno proprio dei pianeti di stile «Mare di dune». | aria con densità almeno 0,05 | 22 m | 0 | 23 |
| Reg | Pianura di ciottoli: il vento ha asportato la sabbia fine e lasciato in superficie i frammenti più pesanti. | nessuna | 6 m | 50 | 23 |
| Canyon | Gole profonde incise da corsi d’acqua del passato in un tavolato di roccia stratificata. Terreno proprio dei pianeti di stile «Canyon». | nessuna | 67 m | 10 | 21 |
| Salina | Bacino chiuso e piatto: l’acqua evaporata vi ha lasciato una crosta bianca di sali. | nessuna | 2 m | 0 | 21 |
| Yardang | Dorsali allungate scolpite dal vento, parallele alla sua direzione prevalente. | aria con densità almeno 0,15 | 19 m | 6 | 15 |
| Hamada | Tavolato roccioso spoglio, con lastre fratturate e poca sabbia. | nessuna | 19 m | 22 | 19 |
| Crateri | Pianura costellata di crateri da impatto; l’atmosfera sottile, o assente, frena poco i meteoriti e cancella lentamente i bordi. Terreno proprio dei pianeti di stile «Pianura di crateri». | aria con densità sotto 0,2 | 32 m | 6 | 8 |

### Craterizzato (18 pianeti)

| Bioma | Descrizione | Condizioni | Rilievo | Rocce | Pianeti |
|---|---|---|---:|---:|---:|
| Campo di massi | Campo di massi staccati dai versanti per frantumazione meccanica e accumulati su un terreno irregolare. | nessuna | 16 m | 60 | 10 |
| Crateri | Pianura costellata di crateri da impatto; l’atmosfera sottile, o assente, frena poco i meteoriti e cancella lentamente i bordi. Terreno proprio dei pianeti di stile «Pianura di crateri». | aria con densità sotto 0,2 | 32 m | 6 | 16 |
| Altopiano fratturato | Altopiano attraversato da fratture lunghe e strette, aperte dalle tensioni della crosta. Terreno proprio dei pianeti di stile «Altopiano fratturato». | nessuna | 25 m | 12 | 15 |
| Dorsali | Dorsali e scarpate parallele, pieghe della crosta formate quando il pianeta si è raffreddato e contratto. Terreno proprio dei pianeti di stile «Dorsali e scarpate». | nessuna | 29 m | 6 | 15 |
| Mare basaltico | Pianura scura di lave basaltiche molto fluide che hanno riempito un bacino antico. | nessuna | 5 m | 2 | 12 |
| Scarpate | Gradini lunghi chilometri nella crosta, sollevati da faglie inverse durante il raffreddamento del pianeta. | nessuna | 41 m | 10 | 13 |
| Regolite | Pianura di polvere e frammenti fini prodotti da miliardi di anni di piccoli impatti, con crateri minuti. | nessuna | 10 m | 5 | 11 |
| Bacino da impatto | Grande depressione circondata da un anello di rilievi, prodotta da un impatto di grande energia. | nessuna | 64 m | 6 | 14 |

### Glaciale (23 pianeti)

| Bioma | Descrizione | Condizioni | Rilievo | Rocce | Pianeti |
|---|---|---|---:|---:|---:|
| Campo di massi | Campo di massi staccati dai versanti per frantumazione meccanica e accumulati su un terreno irregolare. | nessuna | 16 m | 60 | 10 |
| Ghiacciaio | Valli occupate da lingue di ghiaccio che scorrono lentamente verso il basso e scavano la roccia. Terreno proprio dei pianeti di stile «Valli glaciali». | nessuna | 57 m | 4 | 19 |
| Banchisa | Mare gelato: lastre di ghiaccio separate da fratture e creste di compressione. Terreno proprio dei pianeti di stile «Banchisa». | solo come terreno proprio del pianeta | dello stile | 1 | 10 |
| Criovulcani | Coni da cui risalgono acqua, ammoniaca o metano allo stato liquido, che gelano appena escono. Terreno proprio dei pianeti di stile «Criovulcani». | nessuna | 48 m | 4 | 17 |
| Crepacci | Ghiaccio fratturato da crepacci profondi, aperti dove il ghiacciaio si stira su un pendio irregolare. | nessuna | 14 m | 2 | 19 |
| Campo di neve | Distesa piana di neve compatta, con poche asperità smussate dal vento. | nessuna | 6 m | 1 | 18 |
| Tundra | Terreno gelato in profondità con vegetazione bassa nella breve stagione calda. | aria con densità almeno 0,3 | 16 m | 6 | 9 |
| Morene | Creste di detriti e massi trasportati e abbandonati dai ghiacciai durante il ritiro. | nessuna | 22 m | 44 | 16 |
| Ghiaccio azzurro | Ghiaccio antico e compatto, privo di bolle d’aria, messo a nudo dal vento che asporta la neve. | nessuna | 6 m | 1 | 22 |

### Vulcanico (15 pianeti)

| Bioma | Descrizione | Condizioni | Rilievo | Rocce | Pianeti |
|---|---|---|---:|---:|---:|
| Campo di massi | Campo di massi staccati dai versanti per frantumazione meccanica e accumulati su un terreno irregolare. | nessuna | 16 m | 60 | 4 |
| Coni vulcanici | Campo di coni vulcanici con crateri sommitali e colate recenti. Terreno proprio dei pianeti di stile «Campo vulcanico». | nessuna | 80 m | 6 | 14 |
| Colate di lava | Colate di lava che scorrono in canali e si raffreddano in superfici rugose. Terreno proprio dei pianeti di stile «Colate laviche». | nessuna | 25 m | 4 | 11 |
| Caldera | Ampia depressione circolare formata dal collasso di un vulcano dopo lo svuotamento della camera magmatica. Terreno proprio dei pianeti di stile «Caldera con lago». | nessuna | 70 m | 6 | 12 |
| Campo di cenere | Distesa di cenere e lapilli caduti dalle eruzioni, modellata dal vento in ondulazioni basse. | nessuna | 10 m | 2 | 12 |
| Fumarole | Terreno caldo e fratturato, dove i gas vulcanici escono dal suolo e depositano zolfo giallo. | nessuna | 16 m | 12 | 13 |
| Basalti colonnari | Lava raffreddata lentamente e fratturata in colonne poligonali, che formano gradini e pareti verticali. | nessuna | 32 m | 28 | 12 |
| Foresta su cenere | Vegetazione pioniera cresciuta sui suoli fertili di cenere vulcanica alterata. | aria con densità almeno 0,6 | 19 m | 3 | 9 |

## Varietà lungo il cammino

Su ogni pianeta il codice percorre otto linee rette dalla base al confine della zona, a passi di 4 unità, e annota il bioma con più peso in ogni punto. Il primo bioma diverso da quello della base si incontra in mediana a 573 m; i cambi successivi si susseguono in mediana ogni 439 m, con una mediana per pianeta compresa fra 270 e 668 m. Lungo le 1000 linee i cambi di bioma sono 3504.

## Biomi dei pianeti

Per ogni pianeta i biomi, il primo dei quali è quello della base, con il numero di celle che ognuno occupa nella zona.

- **Linguaggio e ragionamento matematico** (pianeta 1, glaciale): Ghiacciaio 10, Criovulcani 6, Crepacci 8, Campo di neve 16, Morene 14, Ghiaccio azzurro 10.
- **Algebra** (pianeta 2, oceanico): Atolli 14, Foresta 6, Campo di massi 8, Arcipelago 8, Fiordi 5, Laguna 7, Scogliere 12, Altopiano vulcanico 4.
- **Radicali** (pianeta 3, desertico): Mesa 8, Campo di massi 7, Erg 3, Reg 8, Canyon 10, Salina 16, Hamada 5, Crateri 7.
- **Equazioni e sistemi** (pianeta 4, vulcanico): Coni vulcanici 11, Colate di lava 11, Caldera 8, Campo di cenere 7, Fumarole 9, Basalti colonnari 13, Foresta su cenere 5.
- **Disequazioni** (pianeta 5, glaciale): Banchisa 20, Ghiacciaio 10, Criovulcani 11, Crepacci 5, Campo di neve 8, Morene 4, Ghiaccio azzurro 6.
- **Esponenziali e logaritmi** (pianeta 6, desertico): Mesa 13, Campo di massi 6, Reg 8, Canyon 12, Salina 8, Hamada 8, Crateri 9.
- **Geometria analitica** (pianeta 7, terrestre): Colline 13, Prateria 11, Palude 16, Calanchi 8, Steppa 16.
- **Funzioni** (pianeta 8, terrestre): Gradoni 9, Foresta 7, Palude 20, Calanchi 8, Steppa 15, Mesa 5.
- **Trigonometria** (pianeta 9, oceanico): Fiordi 10, Foresta 14, Arcipelago 8, Laguna 12, Palude salmastra 5, Altopiano vulcanico 15.
- **Combinatoria, probabilità e statistica** (pianeta 10, oceanico): Arcipelago 13, Foresta 15, Campo di massi 9, Atolli 5, Fiordi 5, Laguna 5, Palude salmastra 8, Dune costiere 4.
- **Geometria elementare** (pianeta 11, craterizzato): Altopiano fratturato 15, Crateri 8, Dorsali 7, Mare basaltico 5, Scarpate 14, Regolite 7, Bacino da impatto 8.
- **Dagli zeri alla struttura di un polinomio** (pianeta 12, terrestre): Prateria 11, Colline 12, Gradoni 15, Palude 16, Calanchi 6, Campo di massi 4.
- **Esistenza, unicità e approssimazione** (pianeta 13, desertico): Erg 13, Mesa 10, Salina 16, Yardang 7, Hamada 18.
- **Ragionamento, conteggio e infinito** (pianeta 14, oceanico): Fiordi 10, Arcipelago 9, Atolli 5, Laguna 10, Scogliere 9, Palude salmastra 5, Dune costiere 3, Altopiano vulcanico 13.
- **Vettori, matrici, dati e vincoli** (pianeta 15, glaciale): Criovulcani 12, Crepacci 9, Campo di neve 17, Morene 11, Ghiaccio azzurro 15.
- **Complessi, aritmetica e polinomi** (pianeta 16, craterizzato): Crateri 18, Campo di massi 5, Altopiano fratturato 14, Dorsali 9, Regolite 6, Bacino da impatto 12.
- **Limiti, variazione e accumulazione** (pianeta 17, vulcanico): Colate di lava 11, Campo di massi 8, Coni vulcanici 11, Caldera 9, Campo di cenere 10, Fumarole 8, Basalti colonnari 7.
- **Radici, campi e nuovi sistemi numerici** (pianeta 18, terrestre): Colline 11, Prateria 7, Gradoni 4, Brughiera 8, Palude 16, Calanchi 4, Campo di massi 4, Mesa 10.
- **Geometrie, trasformazioni e simmetrie** (pianeta 19, desertico): Erg 11, Mesa 10, Reg 5, Canyon 4, Salina 14, Yardang 13, Hamada 7.
- **Probabilità, informazione e fenomeni collettivi** (pianeta 20, desertico): Canyon 8, Erg 9, Reg 11, Salina 20, Crateri 16.
- **Iterazioni, stabilità e precisione numerica** (pianeta 21, oceanico): Atolli 11, Foresta 7, Campo di massi 5, Arcipelago 14, Scogliere 6, Palude salmastra 9, Altopiano vulcanico 12.
- **Onde, frequenze e ricostruzione** (pianeta 22, desertico): Mesa 12, Erg 11, Reg 12, Canyon 4, Salina 12, Yardang 13.
- **Reti, conservazione e strategie** (pianeta 23, terrestre): Gradoni 9, Prateria 7, Colline 9, Foresta 10, Brughiera 6, Calanchi 7, Steppa 9, Mesa 7.
- **Scala, energia, equilibrio e trasformazioni** (pianeta 24, glaciale): Ghiacciaio 14, Campo di massi 9, Criovulcani 9, Crepacci 9, Campo di neve 11, Ghiaccio azzurro 12.
- **Oscillazioni, molecole e quantizzazione** (pianeta 25, oceanico): Arcipelago 14, Laguna 9, Palude salmastra 9, Dune costiere 12, Altopiano vulcanico 20.
- **Misure, unità e incertezza** (pianeta 26, craterizzato): Altopiano fratturato 13, Campo di massi 6, Crateri 12, Dorsali 11, Scarpate 10, Bacino da impatto 12.
- **Vettori e sistemi di riferimento** (pianeta 27, desertico): Mesa 14, Reg 9, Canyon 7, Salina 16, Yardang 12, Hamada 6.
- **Moto rettilineo uniforme** (pianeta 28, glaciale): Ghiacciaio 16, Criovulcani 10, Crepacci 5, Campo di neve 11, Tundra 12, Ghiaccio azzurro 10.
- **Moto uniformemente accelerato** (pianeta 29, oceanico): Atolli 10, Arcipelago 8, Fiordi 14, Laguna 16, Scogliere 3, Palude salmastra 10, Dune costiere 3.
- **Traiettorie e lanci** (pianeta 30, terrestre): Prateria 11, Gradoni 5, Foresta 8, Brughiera 6, Palude 16, Calanchi 3, Steppa 4, Mesa 11.
- **Forze e leggi di Newton** (pianeta 31, desertico): Erg 14, Mesa 12, Reg 9, Salina 15, Yardang 9, Hamada 5.
- **Attrito e vincoli** (pianeta 32, vulcanico): Colate di lava 10, Coni vulcanici 6, Campo di cenere 17, Fumarole 8, Basalti colonnari 9, Foresta su cenere 14.
- **Lavoro ed energia** (pianeta 33, glaciale): Criovulcani 15, Campo di massi 8, Ghiacciaio 7, Crepacci 6, Campo di neve 11, Morene 13, Ghiaccio azzurro 4.
- **Quantità di moto e urti** (pianeta 34, oceanico): Arcipelago 18, Campo di massi 8, Fiordi 3, Scogliere 7, Palude salmastra 13, Altopiano vulcanico 15.
- **Rotazione e momento d’inerzia** (pianeta 35, desertico): Erg 16, Campo di massi 14, Mesa 4, Reg 4, Canyon 5, Salina 13, Yardang 5, Hamada 3.
- **Momenti, leve ed equilibrio** (pianeta 36, vulcanico): Caldera 19, Coni vulcanici 12, Colate di lava 4, Fumarole 10, Basalti colonnari 11, Foresta su cenere 8.
- **Gravitazione** (pianeta 37, oceanico): Arcipelago 12, Fiordi 9, Laguna 11, Scogliere 9, Palude salmastra 11, Altopiano vulcanico 12.
- **Orbite circolari** (pianeta 38, craterizzato): Altopiano fratturato 18, Crateri 7, Dorsali 18, Mare basaltico 11, Regolite 10.
- **Fluidi e pressione** (pianeta 39, terrestre): Prateria 7, Colline 17, Gradoni 5, Foresta 8, Palude 16, Steppa 11.
- **Galleggiamento e Archimede** (pianeta 40, vulcanico): Coni vulcanici 17, Colate di lava 9, Caldera 10, Campo di cenere 11, Fumarole 11, Basalti colonnari 6.
- **Oscillazioni armoniche** (pianeta 41, oceanico): Atolli 9, Foresta 11, Campo di massi 10, Arcipelago 10, Laguna 6, Scogliere 6, Dune costiere 3, Altopiano vulcanico 9.
- **Onde e sovrapposizione** (pianeta 42, glaciale): Banchisa 19, Criovulcani 11, Crepacci 11, Campo di neve 14, Ghiaccio azzurro 9.
- **Gas ideali** (pianeta 43, glaciale): Banchisa 20, Campo di massi 9, Ghiacciaio 11, Criovulcani 13, Ghiaccio azzurro 11.
- **Calore e capacità termica** (pianeta 44, vulcanico): Caldera 10, Coni vulcanici 9, Campo di cenere 13, Fumarole 12, Basalti colonnari 11, Foresta su cenere 9.
- **Termodinamica e rendimento** (pianeta 45, desertico): Erg 19, Mesa 7, Canyon 12, Salina 17, Hamada 9.
- **Cariche e campo elettrico** (pianeta 46, oceanico): Fiordi 10, Foresta 4, Arcipelago 9, Atolli 11, Scogliere 8, Palude salmastra 7, Dune costiere 3, Altopiano vulcanico 12.
- **Potenziale ed energia elettrica** (pianeta 47, vulcanico): Colate di lava 14, Coni vulcanici 10, Caldera 13, Campo di cenere 12, Fumarole 8, Foresta su cenere 7.
- **Circuiti e legge di Ohm** (pianeta 48, desertico): Erg 20, Campo di massi 7, Mesa 8, Reg 5, Canyon 8, Yardang 11, Hamada 5.
- **Induzione elettromagnetica** (pianeta 49, terrestre): Colline 17, Prateria 6, Palude 20, Calanchi 8, Steppa 9, Campo di massi 4.
- **Fotoni ed energia quantizzata** (pianeta 50, glaciale): Criovulcani 11, Ghiacciaio 13, Crepacci 10, Tundra 15, Morene 7, Ghiaccio azzurro 8.
- **Materia, proprietà e densità** (pianeta 51, oceanico): Atolli 17, Arcipelago 17, Fiordi 6, Dune costiere 7, Altopiano vulcanico 17.
- **Atomi, isotopi e massa media** (pianeta 52, desertico): Canyon 13, Campo di massi 14, Mesa 5, Erg 6, Reg 7, Salina 6, Crateri 13.
- **Mole e quantità di sostanza** (pianeta 53, craterizzato): Dorsali 14, Campo di massi 9, Crateri 6, Altopiano fratturato 10, Mare basaltico 6, Scarpate 6, Regolite 7, Bacino da impatto 6.
- **Livelli atomici e spettri** (pianeta 54, terrestre): Gradoni 16, Brughiera 14, Palude 20, Calanchi 8, Steppa 6.
- **Periodicità e carica efficace** (pianeta 55, glaciale): Ghiacciaio 13, Criovulcani 7, Crepacci 8, Campo di neve 12, Tundra 10, Morene 8, Ghiaccio azzurro 6.
- **Legame ionico e interazioni elettrostatiche** (pianeta 56, desertico): Canyon 10, Campo di massi 9, Mesa 9, Reg 7, Salina 13, Yardang 8, Hamada 8.
- **Legame covalente ed energia di legame** (pianeta 57, craterizzato): Dorsali 14, Crateri 12, Mare basaltico 14, Regolite 12, Bacino da impatto 12.
- **Geometria molecolare e VSEPR** (pianeta 58, vulcanico): Coni vulcanici 17, Caldera 9, Campo di cenere 12, Fumarole 17, Foresta su cenere 9.
- **Forze intermolecolari** (pianeta 59, oceanico): Fiordi 17, Arcipelago 17, Laguna 10, Palude salmastra 8, Dune costiere 12.
- **Gas e stato aeriforme** (pianeta 60, oceanico): Fiordi 13, Laguna 12, Scogliere 7, Palude salmastra 14, Dune costiere 3, Altopiano vulcanico 15.
- **Stati della materia e transizioni** (pianeta 61, glaciale): Ghiacciaio 13, Criovulcani 13, Campo di neve 14, Morene 10, Ghiaccio azzurro 14.
- **Soluzioni e concentrazione** (pianeta 62, craterizzato): Crateri 15, Campo di massi 7, Altopiano fratturato 13, Mare basaltico 9, Scarpate 11, Bacino da impatto 9.
- **Solubilità ed equilibrio eterogeneo** (pianeta 63, desertico): Mesa 14, Erg 10, Reg 9, Salina 20, Hamada 11.
- **Stechiometria e reagente limitante** (pianeta 64, oceanico): Arcipelago 18, Foresta 8, Campo di massi 6, Fiordi 9, Laguna 5, Scogliere 15, Dune costiere 3.
- **Resa e bilanci di materia** (pianeta 65, desertico): Canyon 11, Campo di massi 9, Mesa 13, Erg 17, Salina 14.
- **Termochimica e calorimetria** (pianeta 66, terrestre): Prateria 7, Gradoni 8, Foresta 7, Palude 19, Steppa 9, Campo di massi 6, Mesa 8.
- **Velocità di reazione** (pianeta 67, craterizzato): Dorsali 12, Crateri 9, Altopiano fratturato 13, Mare basaltico 14, Scarpate 8, Regolite 8.
- **Temperatura e attivazione** (pianeta 68, desertico): Canyon 12, Campo di massi 11, Mesa 11, Erg 17, Yardang 13.
- **Equilibrio chimico** (pianeta 69, oceanico): Arcipelago 20, Foresta 7, Fiordi 15, Scogliere 8, Palude salmastra 11, Dune costiere 3.
- **Perturbazioni dell’equilibrio** (pianeta 70, vulcanico): Coni vulcanici 14, Colate di lava 13, Campo di cenere 13, Basalti colonnari 10, Foresta su cenere 14.
- **Acidi, basi e pH** (pianeta 71, vulcanico): Colate di lava 18, Coni vulcanici 19, Caldera 13, Fumarole 7, Basalti colonnari 7.
- **Soluzioni tampone** (pianeta 72, craterizzato): Altopiano fratturato 18, Crateri 11, Dorsali 10, Scarpate 7, Regolite 18.
- **Ossidazione, riduzione ed elettrochimica** (pianeta 73, terrestre): Colline 8, Prateria 5, Brughiera 7, Palude 19, Calanchi 6, Steppa 12, Mesa 7.
- **Chimica organica e scheletri carboniosi** (pianeta 74, glaciale): Banchisa 10, Campo di massi 11, Ghiacciaio 12, Criovulcani 7, Crepacci 5, Campo di neve 10, Ghiaccio azzurro 9.
- **Polimeri e materiali** (pianeta 75, oceanico): Atolli 17, Foresta 3, Arcipelago 13, Scogliere 7, Palude salmastra 10, Dune costiere 3, Altopiano vulcanico 11.
- **Che cos'è la vita** (pianeta 76, glaciale): Banchisa 11, Campo di massi 7, Ghiacciaio 11, Crepacci 5, Campo di neve 10, Tundra 8, Morene 3, Ghiaccio azzurro 9.
- **Cellule, scala e superficie** (pianeta 77, desertico): Mesa 15, Erg 10, Reg 11, Yardang 16, Hamada 12.
- **Membrane e protocellule** (pianeta 78, vulcanico): Coni vulcanici 15, Colate di lava 12, Caldera 12, Campo di cenere 13, Basalti colonnari 12.
- **Elementi e molecole della vita nello spazio** (pianeta 79, glaciale): Banchisa 16, Campo di massi 5, Ghiacciaio 9, Campo di neve 9, Tundra 7, Morene 7, Ghiaccio azzurro 11.
- **Meteoriti, comete e campioni di asteroidi** (pianeta 80, terrestre): Gradoni 10, Prateria 5, Colline 15, Brughiera 10, Palude 20, Campo di massi 4.
- **Chiralità e omochiralità** (pianeta 81, craterizzato): Crateri 17, Altopiano fratturato 16, Mare basaltico 5, Scarpate 8, Regolite 9, Bacino da impatto 9.
- **Miller-Urey e la sintesi prebiotica** (pianeta 82, glaciale): Criovulcani 17, Ghiacciaio 14, Crepacci 7, Morene 17, Ghiaccio azzurro 9.
- **Energia, enzimi e catalisi** (pianeta 83, desertico): Erg 19, Reg 9, Salina 11, Yardang 10, Hamada 15.
- **Sorgenti idrotermali e metabolismo primordiale** (pianeta 84, terrestre): Prateria 9, Colline 7, Gradoni 3, Foresta 10, Brughiera 8, Palude 12, Calanchi 7, Steppa 8.
- **Il mondo a RNA** (pianeta 85, desertico): Erg 7, Mesa 11, Reg 11, Salina 13, Yardang 8, Hamada 10, Crateri 4.
- **DNA, codice genetico ed espressione** (pianeta 86, glaciale): Criovulcani 20, Ghiacciaio 13, Crepacci 8, Tundra 15, Ghiaccio azzurro 8.
- **Mutazioni e soglia d'errore** (pianeta 87, craterizzato): Crateri 19, Campo di massi 20, Mare basaltico 8, Scarpate 8, Bacino da impatto 9.
- **Ereditarietà e selezione naturale** (pianeta 88, glaciale): Criovulcani 11, Campo di massi 10, Ghiacciaio 7, Crepacci 9, Tundra 20, Ghiaccio azzurro 7.
- **Deriva genetica** (pianeta 89, desertico): Erg 5, Mesa 9, Reg 8, Canyon 8, Salina 13, Hamada 11, Crateri 10.
- **L'albero universale e LUCA** (pianeta 90, oceanico): Fiordi 20, Arcipelago 12, Atolli 12, Palude salmastra 10, Dune costiere 10.
- **Le prime tracce della vita e il tempo geologico** (pianeta 91, vulcanico): Caldera 15, Campo di massi 9, Coni vulcanici 10, Campo di cenere 12, Fumarole 12, Basalti colonnari 6.
- **Ossigeno, endosimbiosi e cellule complesse** (pianeta 92, craterizzato): Dorsali 16, Campo di massi 6, Altopiano fratturato 12, Scarpate 10, Bacino da impatto 20.
- **Estremofili** (pianeta 93, glaciale): Ghiacciaio 12, Campo di massi 8, Crepacci 11, Campo di neve 17, Morene 7, Ghiaccio azzurro 9.
- **Respirazione, fermentazione e chemiosintesi** (pianeta 94, desertico): Mesa 16, Erg 12, Reg 15, Canyon 8, Yardang 13.
- **Fotosintesi e luce di altre stelle** (pianeta 95, vulcanico): Coni vulcanici 13, Colate di lava 17, Campo di cenere 12, Fumarole 10, Basalti colonnari 12.
- **Crescita delle popolazioni microbiche** (pianeta 96, craterizzato): Dorsali 16, Campo di massi 9, Crateri 13, Mare basaltico 8, Regolite 11, Bacino da impatto 7.
- **La zona abitabile** (pianeta 97, desertico): Canyon 14, Mesa 10, Erg 7, Reg 6, Salina 16, Hamada 11.
- **Atmosfere, effetto serra e clima** (pianeta 98, glaciale): Banchisa 18, Ghiacciaio 10, Criovulcani 12, Campo di neve 11, Morene 7, Ghiaccio azzurro 6.
- **Abitabilità attorno alle nane rosse** (pianeta 99, craterizzato): Dorsali 14, Campo di massi 10, Crateri 10, Altopiano fratturato 8, Mare basaltico 13, Scarpate 9.
- **Biosfera, albedo e Daisyworld** (pianeta 100, terrestre): Colline 13, Foresta 11, Palude 12, Steppa 7, Campo di massi 8, Mesa 13.
- **Marte: acqua e abitabilità passata** (pianeta 101, desertico): Mesa 10, Reg 8, Canyon 11, Salina 14, Hamada 8, Crateri 13.
- **Cercare la vita su Marte** (pianeta 102, craterizzato): Crateri 18, Altopiano fratturato 12, Dorsali 9, Scarpate 10, Regolite 9, Bacino da impatto 6.
- **Europa e gli oceani sotto il ghiaccio** (pianeta 103, glaciale): Banchisa 20, Campo di massi 9, Crepacci 12, Campo di neve 13, Morene 10.
- **Encelado e i suoi pennacchi** (pianeta 104, oceanico): Fiordi 11, Foresta 7, Arcipelago 14, Atolli 7, Laguna 7, Scogliere 3, Palude salmastra 11, Dune costiere 4.
- **Titano, la chimica senza acqua** (pianeta 105, terrestre): Colline 18, Gradoni 13, Brughiera 9, Calanchi 17, Mesa 7.
- **Scoprire gli esopianeti** (pianeta 106, vulcanico): Coni vulcanici 13, Campo di massi 8, Caldera 11, Campo di cenere 13, Fumarole 7, Basalti colonnari 3, Foresta su cenere 9.
- **Atmosfere degli esopianeti e JWST** (pianeta 107, oceanico): Atolli 7, Arcipelago 15, Fiordi 8, Scogliere 12, Palude salmastra 6, Dune costiere 3, Altopiano vulcanico 13.
- **Biofirme e falsi positivi** (pianeta 108, terrestre): Colline 15, Foresta 5, Steppa 17, Campo di massi 16, Mesa 11.
- **Panspermia e protezione planetaria** (pianeta 109, desertico): Canyon 10, Mesa 11, Erg 10, Reg 9, Salina 17, Crateri 7.
- **Tecnofirme, SETI ed equazione di Drake** (pianeta 110, craterizzato): Altopiano fratturato 18, Campo di massi 12, Dorsali 13, Regolite 11, Bacino da impatto 10.
- **Onde elettromagnetiche e pressione della luce** (pianeta 111, terrestre): Gradoni 10, Prateria 3, Colline 5, Foresta 7, Brughiera 6, Palude 20, Campo di massi 5, Mesa 8.
- **Specchi, lenti e telescopi** (pianeta 112, oceanico): Atolli 14, Foresta 7, Campo di massi 11, Arcipelago 4, Laguna 6, Scogliere 9, Palude salmastra 10, Dune costiere 3.
- **Interferenza e interferometri** (pianeta 113, desertico): Erg 20, Campo di massi 11, Mesa 9, Reg 14, Canyon 10.
- **Diffrazione e potere risolutivo** (pianeta 114, craterizzato): Altopiano fratturato 14, Campo di massi 6, Crateri 13, Dorsali 12, Mare basaltico 3, Scarpate 10, Bacino da impatto 6.
- **Radiazione termica e luce delle stelle** (pianeta 115, glaciale): Banchisa 13, Ghiacciaio 11, Crepacci 8, Campo di neve 10, Morene 14, Ghiaccio azzurro 8.
- **Legge di Gauss: gusci, pianeti e condensatori** (pianeta 116, terrestre): Gradoni 12, Prateria 4, Foresta 8, Palude 15, Calanchi 8, Steppa 6, Mesa 11.
- **Particelle cariche nei campi magnetici** (pianeta 117, oceanico): Atolli 12, Campo di massi 3, Arcipelago 16, Fiordi 8, Dune costiere 10, Altopiano vulcanico 15.
- **Correnti, dipoli e dinamo dei pianeti** (pianeta 118, desertico): Canyon 14, Erg 8, Reg 11, Salina 13, Yardang 11, Hamada 7.
- **Induzione, circuiti oscillanti e radio** (pianeta 119, craterizzato): Crateri 13, Altopiano fratturato 11, Dorsali 12, Mare basaltico 6, Scarpate 14, Bacino da impatto 8.
- **Equazioni di Maxwell e magnetismo della materia** (pianeta 120, glaciale): Criovulcani 15, Campo di massi 9, Crepacci 7, Campo di neve 12, Tundra 6, Morene 5, Ghiaccio azzurro 10.
- **Relatività ristretta** (pianeta 121, terrestre): Prateria 8, Colline 11, Foresta 5, Brughiera 6, Palude 11, Calanchi 5, Campo di massi 9, Mesa 9.
- **Onde di materia, atomi e righe spettrali** (pianeta 122, glaciale): Banchisa 20, Ghiacciaio 4, Crepacci 10, Campo di neve 6, Tundra 3, Morene 11, Ghiaccio azzurro 10.
- **Nuclei, decadimenti e datazioni** (pianeta 123, desertico): Canyon 18, Mesa 5, Erg 9, Reg 13, Yardang 11, Hamada 8.
- **Energia dal nucleo: fusione nelle stelle** (pianeta 124, vulcanico): Caldera 16, Campo di massi 14, Colate di lava 10, Fumarole 8, Foresta su cenere 16.
- **Particelle, espansione e Big Bang** (pianeta 125, oceanico): Fiordi 9, Foresta 11, Campo di massi 7, Atolli 15, Laguna 8, Scogliere 6, Altopiano vulcanico 8.
