# Stazioni e navi dei sistemi

I trenta sistemi stellari ospitano 300 modelli tridimensionali: dieci per sistema, cioè sei stazioni e quattro navi. Il lavoro procede in tre aggiornamenti: la 1.38.0 ha portato il generatore dei modelli e il loro catalogo, la 1.39.0 colloca le stazioni nei sistemi, il terzo aggiornamento farà muovere le navi lungo le rotte.

## Come sono costruiti

Il sito non scarica geometrie. Ogni modello nasce dal codice in `src/craft/` a partire da un seme numerico:

- `kit.js` raccoglie le primitive (scatole a pannelli, cilindri e coni con giunture, tori, sfere, parabole, tralicci, scafi raccordati fra sezioni) e il generatore di numeri casuali `dice`, che annota ogni scelta strutturale;
- `parts.js` contiene i moduli comuni: pannelli solari, radiatori, hangar illuminati, antenne, serbatoi, bobine, tubazioni, fasce di pericolo, finestre e i poliedri convessi, le cui facce vengono ricavate dai vertici;
- `styles.js` definisce i cinque stili di costruzione;
- `stations.js` e `ships.js` contengono i dodici tipi di stazione e le dodici classi di nave;
- `catalog.js` assegna i modelli ai sistemi, sceglie i nomi e costruisce un modello su richiesta con `build(voce)`;
- `placement.js` decide dove stanno le stazioni di un sistema e dove si trovano in ogni istante.

Un modello è un elenco di parti (le parti mobili ruotano attorno a un asse che passa per l'origine), un elenco di luci di posizione e di scarichi dei motori, l'eventuale campo di una porta e la ricetta, cioè l'elenco delle scelte strutturali estratte dal seme. Le mesh usano il vertice a 16 valori di `src/renderer.js` e il materiale 10 nella variante per gli scafi.

## Stili

Ogni disciplina costruisce a modo suo:

- **Matematica** (ambra): scafi sfaccettati a sei, otto o dodici lati, poliedri come ornamento;
- **Fisica** (azzurro): bobine luminose, antenne e radiatori;
- **Chimica** (viola): tubazioni lungo gli scafi, serbatoi, fasce di pericolo gialle e nere;
- **Biologia** (verde): forme arrotondate, baccelli e cupole di vetro verde;
- **Civile** (corallo): lo stile del traffico fra i sistemi, usato dalle porte e da metà delle navi.

Nel catalogo 42 modelli sono nello stile della matematica, 63 in quello della fisica, 42 in quello della chimica, 63 in quello della biologia e 90 nello stile civile.

## Le stazioni

Ogni sistema ha un porto nello stile della propria disciplina, una porta di passaggio nello stile civile e quattro stazioni scelte in base ai suoi temi. Le stazioni sono 180, di dodici tipi:

| Tipo | Esemplari | Impianti principali, a rotazione |
|---|---|---|
| Porto | 30 | anello abitato, due anelli, disco, nessun anello con più bracci di attracco |
| Porta | 30 | anello tondo, quadrato, pentagonale, esagonale, ottagonale, dodecagonale |
| Radiotelescopio | 14 | grande parabola, schiera di antenne, corona rotante, parabole gemelle |
| Centrale | 14 | asse verticale, asse orizzontale, radiatori a raggiera |
| Cantiere | 13 | gabbia, anelli, ponte con bracci |
| Deposito criogenico | 12 | grappolo di sfere, fascio di cilindri, pila di sfere, anello di serbatoi |
| Telescopio | 12 | tubo con paraluce, interferometro, specchio a segmenti con schermo, tubo con occultatore |
| Laboratorio dei campi | 12 | acceleratore ad anello, pila di bobine, antenne lunghe, sfera di plasma in una gabbia |
| Serra | 12 | tamburi rotanti, cupole di vetro, toro di vetro |
| Stazione poliedrica | 11 | un solido diverso per esemplare, dal tetraedro al rombicubottaedro |
| Raffineria | 10 | traliccio singolo, due tralicci paralleli, torre |
| Miniera | 10 | catena di moduli accanto all'asteroide, base ancorata alla superficie, anello attorno all'asteroide |

Le miniere compaiono solo nei dieci sistemi con la fascia di asteroidi. L'impianto principale di ogni tipo ruota con il numero dell'esemplare, quindi i diversi impianti compaiono con la stessa frequenza; tutte le altre scelte (numero di moduli, serbatoi, bracci, pannelli, torce, bobine, schermi) vengono dal seme. Il campo delle porte prende il colore della disciplina del sistema.

## Le navi

Le navi sono 120, dieci per ognuna delle dodici classi: navetta, corriere, nave cargo, cisterna, rimorchiatore minerario, nave scientifica, nave da esplorazione, nave passeggeri, posaboe, nave di soccorso, sonda e nave gru. La prua punta verso +z; la luce rossa sta a sinistra (+x) e quella verde a destra (−x). Il sistema di indice *s*, da 0 a 29 nell'ordine della tabella seguente, riceve le classi (4*s* + *j*) mod 12 per *j* da 0 a 3, nell'ordine dell'elenco qui sopra: le prime due nello stile della disciplina, le altre due nello stile civile. Ne segue che i rimorchiatori minerari capitano proprio nei sistemi con la fascia di asteroidi.

## Assegnazione ai sistemi

| Sistema | Stile | Stazioni tematiche | Navi |
|---|---|---|---|
| 1. Numeri e ragionamento | Matematica | Stazione poliedrica, Deposito criogenico, Cantiere, Radiotelescopio | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 2. Algebra ed equazioni | Matematica | Stazione poliedrica, Miniera, Cantiere, Centrale | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 3. Funzioni e variazione | Matematica | Stazione poliedrica, Telescopio, Laboratorio dei campi, Deposito criogenico | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 4. Geometria e trasformazioni | Matematica | Stazione poliedrica, Cantiere, Radiotelescopio, Serra | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 5. Probabilità e dati | Matematica | Stazione poliedrica, Miniera, Deposito criogenico, Telescopio | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 6. Matematica per le scienze | Matematica | Stazione poliedrica, Centrale, Serra, Laboratorio dei campi | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 7. Misura e moto | Fisica | Cantiere, Telescopio, Radiotelescopio, Centrale | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 8. Forze ed energia | Fisica | Miniera, Cantiere, Centrale, Deposito criogenico | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 9. Rotazioni e gravità | Fisica | Telescopio, Radiotelescopio, Laboratorio dei campi, Stazione poliedrica | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 10. Fluidi, oscillazioni e onde | Fisica | Radiotelescopio, Laboratorio dei campi, Telescopio, Serra | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 11. Calore e termodinamica | Fisica | Centrale, Miniera, Raffineria, Deposito criogenico | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 12. Elettromagnetismo e quanti | Fisica | Laboratorio dei campi, Centrale, Radiotelescopio, Cantiere | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 13. Materia e atomi | Chimica | Raffineria, Laboratorio dei campi, Deposito criogenico, Stazione poliedrica | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 14. Legami e molecole | Chimica | Raffineria, Miniera, Cantiere, Deposito criogenico | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 15. Stati e soluzioni | Chimica | Deposito criogenico, Raffineria, Centrale, Serra | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 16. Reazioni e quantità | Chimica | Raffineria, Cantiere, Centrale, Laboratorio dei campi | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 17. Velocità ed equilibrio | Chimica | Raffineria, Miniera, Deposito criogenico, Telescopio | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 18. Acidi, redox e carbonio | Chimica | Raffineria, Serra, Deposito criogenico, Centrale | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 19. La vita e la cellula | Biologia | Serra, Laboratorio dei campi, Radiotelescopio, Cantiere | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 20. Molecole dal cosmo | Biologia | Miniera, Radiotelescopio, Raffineria, Telescopio | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 21. Chimica prebiotica | Biologia | Serra, Raffineria, Centrale, Deposito criogenico | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 22. Informazione e replicatori | Biologia | Serra, Cantiere, Laboratorio dei campi, Stazione poliedrica | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 23. Evoluzione e albero della vita | Biologia | Serra, Miniera, Telescopio, Cantiere | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 24. Vita ai limiti | Biologia | Serra, Centrale, Deposito criogenico, Raffineria | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 25. Pianeti abitabili | Biologia | Serra, Telescopio, Radiotelescopio, Centrale | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 26. Mondi del sistema solare | Biologia | Miniera, Radiotelescopio, Serra, Cantiere | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 27. Cercare la vita nella galassia | Biologia | Radiotelescopio, Telescopio, Laboratorio dei campi, Stazione poliedrica | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |
| 28. Luce e telescopi | Fisica | Telescopio, Radiotelescopio, Centrale, Stazione poliedrica | Navetta, Corriere, Nave cargo (civile), Cisterna (civile) |
| 29. Campi e plasmi nello spazio | Fisica | Laboratorio dei campi, Miniera, Centrale, Radiotelescopio | Rimorchiatore minerario, Nave scientifica, Nave da esplorazione (civile), Nave passeggeri (civile) |
| 30. Dalla relatività al Big Bang | Fisica | Telescopio, Radiotelescopio, Laboratorio dei campi, Cantiere | Posaboe, Nave di soccorso, Sonda (civile), Nave gru (civile) |

## Nomi

Ogni modello ha un nome proprio, unico nel catalogo: il tipo seguito da uno scienziato della disciplina (per esempio «Porto Noether», «Raffineria Lavoisier», «Serra Margulis») oppure, nello stile civile, da un vento o da una stella («Porta Vega», «Nave cargo Maestrale»). I nomi usano soltanto le lettere presenti nell'atlante dei caratteri del sito (`assets/glyphs.json`).

## Varietà

Due modelli dello stesso tipo e dello stesso stile differiscono in almeno due scelte della ricetta. Quando il seme di un modello produce una ricetta troppo vicina a quella di un modello precedente, il catalogo passa a un seme successivo; la tabella `REROLL` di `src/craft/catalog.js` registra i 32 modelli spostati. Dopo una modifica a un costruttore la tabella si ricalcola con `node scripts/craft-reroll.mjs --write`.

## Numeri

| Misura | Stazioni | Navi |
|---|---|---|
| Triangoli, minimo | 2148 | 920 |
| Triangoli, mediana | 8252 | 2943 |
| Triangoli, massimo | 27 690 | 8988 |
| Limite controllato dai test | 30 000 | 10 000 |

I dieci modelli di un sistema sommano fra 44 260 e 92 504 triangoli, con mediana 68 294; il sistema più pesante è «Legami e molecole». Costruire i 300 modelli richiede circa 2,7 secondi con Node sulla macchina di sviluppo, cioè circa 9 ms per modello. Un modello porta da 1 a 46 luci; 61 modelli hanno parti mobili: anelli abitati di stazioni e navi, dischi, tamburi, antenne rotanti, nodi torici.

## Le stazioni nei sistemi

Dalla 1.39.0 le sei stazioni di ogni sistema compaiono nella vista del sistema e attorno ai pianeti visti in orbita. `placement.js` sceglie per ogni stazione un pianeta ospite adatto al suo compito:

- il porto orbita attorno al primo pianeta di studio, nell'ordine di distanza dalla stella, e il cantiere attorno allo stesso pianeta, su un'orbita più larga;
- la raffineria cerca un gigante gassoso, il laboratorio dei campi un gigante con anelli, la serra un pianeta oceanico o terrestre, il deposito criogenico un mondo ghiacciato, la centrale il pianeta più vicino alla stella, telescopio e radiotelescopio i pianeti più esterni;
- quando l'ospite preferito ha già una stazione, la scelta passa alla preferenza successiva, e in mancanza di un ospite adatto a un pianeta libero;
- la miniera ruota con la fascia di asteroidi, alla sua distanza media dalla stella;
- la porta sta 5,2 unità oltre il bordo del sistema disegnato (`outerRadius` in `src/scene/systems.js`), quindi oltre la fascia, con l'anello rivolto verso la stella.

Una stazione orbita a 1,75 raggi del pianeta disegnato più una volta e mezza la propria dimensione; ogni stazione successiva attorno allo stesso pianeta si allontana di altri 0,6 raggi. Le orbite hanno inclinazioni fra 0,25 e 0,6 radianti e versi diversi. Il raggio disegnato di una stazione è 0,2 unità del sistema per il porto, 0,55 per la porta, 0,17 per la miniera e 0,15 per le altre; i pianeti disegnati misurano da 0,33 a 0,99 unità di raggio.

Il sito costruisce soltanto le stazioni del sistema aperto, un modello per fotogramma, e libera le mesh del sistema precedente quando se ne apre un altro. Nella vista del sistema una stazione lontana è un piccolo rombo nel colore del suo stile; passando con il puntatore compaiono nome, stile e funzione, e un tocco li mostra nella barra dei messaggi. In orbita attorno a un pianeta le stazioni vicine si vedono intere, illuminate dalla stella del sistema; le luci di posizione si accendono quando una stazione supera i 22 pixel di raggio sullo schermo, salvo con la grafica al livello più basso.

## Controlli

`tests/craft.test.mjs` verifica che i modelli siano 300, dieci per sistema con sei stazioni e quattro navi, che le miniere stiano solo nei sistemi con la fascia, che nomi e identificatori siano unici e scritti con l'atlante dei caratteri, che gli stili seguano la regola descritta sopra, che la generazione sia deterministica, che le mesh contengano solo valori finiti e indici validi entro i limiti di triangoli, e che due modelli dello stesso tipo e stile differiscano in almeno due scelte.

`tests/stations.test.mjs` verifica che ogni sistema abbia sei stazioni collocate in modo deterministico, la porta oltre la fascia, la miniera dentro la fascia, il porto attorno a un pianeta di studio e il cantiere accanto al porto, la raffineria attorno a un gigante quando il sistema ne ha uno; che le stazioni restino alla distanza prevista dall'ospite, fuori dal pianeta disegnato; e che la scena costruisca un modello per fotogramma, renda selezionabili le stazioni e liberi le mesh al cambio di sistema.

## Prossimi aggiornamenti

1. Generatore e catalogo (1.38.0).
2. Stazioni nei sistemi (1.39.0).
3. Navi e rotte: le navi percorreranno rotte fra porti, porte e stazioni del sistema.
