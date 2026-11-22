# Stazioni e navi dei sistemi

I trenta sistemi stellari ospitano 997 modelli tridimensionali, da 25 a 45 per sistema: 564 stazioni e 433 navi, di cui 218 della flotta di difesa. Il lavoro è arrivato per aggiornamenti successivi. La 1.38.0 ha portato il generatore e i primi 300 modelli, dieci per sistema; la 1.39.0 ha collocato le stazioni nei sistemi e la 1.40.0 ha dato vita ai sistemi, con stazioni che producono e navi che trasportano le merci. La 1.41.0 ha rinnovato il motore di disegno. La 1.42.0 e la 1.43.0 hanno aggiunto una grammatica dei tipi con 120 tipi di stazione, che porta ogni sistema a 12-20 stazioni, e la 1.44.0 ha fatto lo stesso per le navi civili, con 120 classi. La 1.45.0 e la 1.46.0 hanno legato le merci in catene di lavorazione, con stazioni che crescono, cantieri e convogli. Dalla 1.47.0 ogni sistema ha una flotta di difesa, che dalla 1.48.0 affronta minacce naturali e dalla 1.49.0 lo Sciame della Frontiera. La 1.51.0 apre un catalogo 3D di tutti i modelli; l'elenco completo, sistema per sistema, è in `docs/CATALOGO.md`.

## Come sono costruiti

Il sito non scarica geometrie. Ogni modello nasce dal codice in `src/craft/` a partire da un seme numerico:

- `kit.js` raccoglie le primitive (scatole a pannelli, cilindri e coni con giunture, tori, sfere, parabole, tralicci, scafi raccordati fra sezioni) e il generatore di numeri casuali `dice`, che annota ogni scelta strutturale;
- `parts.js` contiene i moduli comuni: pannelli solari, radiatori, hangar illuminati, antenne, serbatoi, bobine, tubazioni, fasce di pericolo, finestre e i poliedri convessi, le cui facce vengono ricavate dai vertici;
- `styles.js` definisce i cinque stili di costruzione;
- `stations.js` e `ships.js` contengono i dodici tipi classici di stazione e le dodici classi di nave;
- `modules.js`, `families.js` e `grammar.js` formano la grammatica dei 120 tipi di stazione della 1.42.0;
- `shipclasses.js` contiene la grammatica delle 120 classi di navi civili della 1.44.0;
- `catalog.js` assegna i modelli ai sistemi, sceglie i nomi e costruisce un modello su richiesta con `build(voce)`;
- `placement.js` decide dove stanno le stazioni di un sistema e dove si trovano in ogni istante;
- `economy.js` contiene le regole della vita di un sistema: produzione, consumi, scelta dei viaggi delle navi;
- `traffic.js` calcola le rotte delle navi, la loro posizione e il loro orientamento.

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

Il sito costruisce soltanto le stazioni del sistema aperto e libera le mesh del sistema precedente quando se ne apre un altro; dalla 1.41.0 i modelli si costruiscono in un worker, come descritto in «Il motore». Nella vista del sistema una stazione lontana è un piccolo rombo nel colore del suo stile; passando con il puntatore compaiono nome, stile e funzione, e un tocco li mostra nella barra dei messaggi. In orbita attorno a un pianeta le stazioni vicine si vedono intere, illuminate dalla stella del sistema; le luci di posizione si accendono quando una stazione supera i 22 pixel di raggio sullo schermo, salvo con la grafica al livello più basso.

## La vita dei sistemi

Dalla 1.40.0 ogni sistema aperto ha un'economia: le stazioni producono e consumano merci, le navi le portano dove mancano. Le merci erano sette fino alla 1.44.0; dalla 1.45.0 sono 24 e formano catene di lavorazione, descritte in «L'economia delle catene». La tabella riporta le ricette attuali delle dodici stazioni classiche. Le quantità sono per secondo del tempo della scena, che scorre di un secondo al secondo (al massimo 0,08 s per fotogramma) e si ferma con il movimento ridotto.

| Stazione | Processo | Produce | Consuma |
|---|---|---|---|
| Miniera | estrazione | minerale 1,2 t/s, silicati 0,5 t/s, ghiaccio 0,4 t/s, terre rare 0,08 kg/s | |
| Raffineria | distillazione dei gas | idrogeno 0,8 t/s, carburante 0,6 t/s | energia 0,1 celle/s |
| Serra | fotosintesi | cibo 0,8 t/s, biomassa 0,3 t/s | acqua 0,3 t/s, fertilizzanti 0,08 t/s, energia 0,08 celle/s |
| Centrale | fusione dell'idrogeno | energia 1,5 celle/s | idrogeno 0,12 t/s |
| Telescopio, radiotelescopio, stazione poliedrica | osservazione, ascolto radio, calcolo | dati 0,5, 0,6 e 0,4 TB/s | energia 0,05 celle/s |
| Laboratorio dei campi | esperimenti | dati 0,35 TB/s, medicinali 0,06 kg/s | energia 0,15 celle/s, biomassa 0,05 t/s, strumenti 0,01 unità/s |
| Cantiere | montaggio di navi | parti 0,25 moduli/s | metalli 0,5 t/s, leghe 0,06 t/s, polimeri 0,12 t/s, energia 0,3 celle/s |
| Deposito criogenico | deposito | | chiede carburante fino a 260 t, acqua fino a 120 t, ossigeno fino a 90 t |
| Porto | imbarco | equipaggi 0,25 persone/s | cibo 0,3 t/s, acqua 0,2 t/s, ossigeno 0,15 t/s, carburante 0,35 t/s, energia 0,15 celle/s, medicinali 0,02 kg/s |
| Porta | | equipaggi 0,15 persone/s e le merci che il sistema non produce abbastanza | le merci che il sistema produce in eccesso |

Le stazioni diverse dal porto, dagli habitat e dalla porta consumano anche 0,06 persone di equipaggio al secondo e ne chiedono 16. Il cantiere si ferma quando manca un ingrediente; raffineria, serra, centrale, laboratorio e osservatori lavorano a metà ritmo; ogni stazione si ferma quando il suo magazzino è pieno. Le capacità e le altre soglie sono in `RECIPES`.

Ogni nave del catalogo viaggia con fino a due navi gemelle dello stesso modello (con il nome seguito da II e III); navette, navi cargo, cisterne e navi passeggeri ne possono avere due, le altre una. Un sistema ha quindi da 4 a 11 navi. Quando una nave è libera sceglie il trasporto migliore fra quelli che la sua classe può fare: la quantità divisa per la strada da percorrere, con un fattore casuale fra 0,7 e 1,3, e un carico minimo pari al 30 % della stiva (dalla 1.45.0 anche la metà di quanto chiede la stazione, se è meno, e con la precedenza alle stazioni a corto di un ingrediente). La merce viene prenotata alla partenza, così due navi non vanno a prendere lo stesso carico. Senza nulla da trasportare ogni classe ha il suo comportamento: le navi scientifiche, le esploratrici e le sonde osservano un pianeta e ne riportano dati, la nave di soccorso fa il giro delle stazioni, il posaboe va e viene dalla porta, la nave gru lavora al cantiere, navette e navi passeggeri si spostano fra le stazioni.

Le navi viaggiano su archi sollevati sopra il piano delle orbite di un ottavo della distanza, accelerano e frenano agli estremi e girano al largo della stella quando il percorso diretto le passerebbe a meno di 2,2 raggi stellari più un'unità. Le velocità vanno da 1,2 a 3,2 unità al secondo; un viaggio dura 2 s più la distanza divisa per la velocità, una sosta in stazione da 4 a 12 s secondo la classe, con una variazione casuale del 20 %.

Ogni avvio del sito sceglie un seme nuovo con `crypto.getRandomValues`, quindi scorte iniziali (dal 15 al 75 % della capacità), navi gemelle, posizioni di partenza e scelte dei viaggi cambiano da una visita all'altra. L'economia di un sistema gira mentre il sistema è aperto e conserva il suo stato per tutta la visita; quando si torna in un sistema dopo un'assenza, recupera al massimo due minuti.

Nella vista del sistema ogni nave è un punto nel colore del suo stile, con una scia breve mentre viaggia, e i rombi delle stazioni pulsano mentre producono. Il puntatore mostra lo stato in tempo reale: per una stazione che cosa produce e che cosa chiede, per una nave il carico, la destinazione e il tempo di arrivo. In orbita le navi vicine si vedono intere, con i motori accesi in volo; durante il carico e lo scarico quattro luci nel colore della merce passano fra la nave e la stazione, e le fiamme delle stazioni, come le torce delle raffinerie, si abbassano quando la produzione si ferma.

Nella 1.40.0 una simulazione di 1200 s per ognuno dei 30 sistemi con tre semi diversi muoveva tutte le 590 navi coinvolte; le navi passavano in viaggio dal 35 al 65 % del tempo, con mediana del 50 %, e nessuna arrivava a meno di 2,73 raggi stellari dalla stella.

## Il motore

Dalla 1.41.0 ogni stazione e ogni nave ha tre livelli di dettaglio, scelti a ogni fotogramma dal raggio apparente sullo schermo (`src/craft/detail.js`).

| Livello | Quando | Che cosa si disegna |
|---|---|---|
| 0, modello completo | raggio apparente da 40 pixel in su, entro il bilancio di triangoli | il modello del catalogo |
| 1, modello semplificato | da 1,2 pixel per le stazioni e da 1 pixel per le navi fino a 40 | lo stesso modello costruito con dettaglio 0,35 |
| 2, punto luce | sotto queste soglie | un bagliore nel colore dello stile |

Il modello semplificato nasce dalla stessa ricetta del completo e ha le stesse parti, le stesse parti mobili e le stesse luci. Le parti rotonde hanno circa un terzo dei segmenti, con un minimo che conserva la forma (8 lati per i cilindri, 12 per tori e parabole); mancano piastre, sporgenze, fasce, diagonali delle travature, finestre, celle dei pannelli solari, nervature dei radiatori e lampadine delle luci di posizione. Le luci restano come bagliori, e le lampadine contano nel centro e nel raggio del modello anche dove mancano, così i due livelli hanno la stessa dimensione: i raggi differiscono al massimo dell'1,3 %. Sul catalogo i 300 modelli semplificati sommano 588 664 triangoli contro 2 038 346, il 28,9 %. Per un singolo modello la quota va dal 6,3 % di un telescopio coperto di pannelli al 63,2 % di un corriere, che ha già poche parti rotonde, con mediana 32,0 %; una stazione semplificata conta da 204 a 7440 triangoli, una nave da 392 a 3424.

Il modello completo spetta a ciò che è vicino, dal più grande sullo schermo in giù, finché i triangoli di navi e stazioni del fotogramma restano entro un bilancio che dipende dalla grafica scelta nelle impostazioni: 600 000 con dettaglio alto, 250 000 con grafica bilanciata, 120 000 con grafica leggera. Se i soli modelli semplificati superano il bilancio, i più piccoli sullo schermo diventano punti luce. Il modello completo si costruisce la prima volta che qualcosa si avvicina; fino a quel momento resta il semplificato.

I modelli si costruiscono in un worker del browser (`src/craft/factory.js` e `src/craft/worker.js`), che restituisce le mesh pronte trasferendo i buffer, e il ciclo di disegno carica soltanto mesh finite sulla scheda grafica. Prima arrivano i modelli semplificati di tutte le stazioni, poi quelli delle navi, poi i completi richiesti. Il worker riceve due lavori alla volta, così il primo lavoro della coda aspetta al massimo i due già in costruzione. Quando il browser rifiuta i worker di modulo, o il worker si interrompe per un errore, la costruzione torna sul thread principale, un modello per fotogramma come nelle versioni precedenti; nei test con Node accade sempre. Con Node sulla macchina di sviluppo un modello completo richiede in media 8,5 ms e fino a 67 ms per i più complessi, un semplificato 2,7 ms; prima questi tempi cadevano dentro un fotogramma.

Le parti ferme di un modello formano una sola mesh (`pack` in `src/craft/kit.js`), le parti che ruotano restano separate. Le navi della stessa classe e dello stesso livello condividono la mesh e si disegnano con una sola chiamata a istanze: ogni nave porta posizione, scala e direzione di marcia, e lo shader costruisce l'orientamento con la stessa base di `shipMatrix` in `src/craft/traffic.js`, con la luce della stella calcolata in ogni punto dello scafo. Anche tutti i bagliori del sistema (luci di posizione, fiamme, scie e merci in movimento) si disegnano con una sola chiamata, dopo gli scafi. In Chromium una nave disegnata a istanze e la stessa nave disegnata con la propria matrice differiscono al massimo di 2 livelli su 255 per pixel.

Un fotogramma delle stesse viste a 1440 × 900, misurato in Chromium con la 1.40.0 e con la 1.41.0, dà questi conteggi per tutta la scena (stelle escluse); le navi presenti cambiano a ogni avvio, quindi i numeri sono indicativi.

| Vista | Chiamate di disegno, 1.40.0 | 1.41.0 | Triangoli, 1.40.0 | 1.41.0 |
|---|---:|---:|---:|---:|
| Sistema «Legami e molecole» | 83 | 76 | 234 008 | 165 642 |
| Orbita di «Geometria molecolare e VSEPR» | 125 | 66 | 301 528 | 265 162 |

Nella vista in orbita i 65 bagliori del fotogramma occupano una sola chiamata; nella vista del sistema le 12 stazioni e navi disegnate come modelli usano tutte il semplificato, per 29 138 triangoli, dove la 1.40.0 disegnava i completi.

### Pagina diagnostica

Aggiungendo `?diagnostica` all'indirizzo, prima del cancelletto (per esempio `index.html?diagnostica#/system?unit=chemistry-08`), un pannello in basso a destra si aggiorna ogni mezzo secondo con i fotogrammi al secondo, la durata media e massima degli ultimi 120 fotogrammi, il tempo di disegno sul processore, le chiamate di disegno e i triangoli del fotogramma, quante navi e stazioni sono complete, semplificate o punti luce, i modelli costruiti e quelli in coda, la grafica scelta, le dimensioni della tela e della scena e il nome della GPU. Il pannello lascia passare il puntatore, quindi la scena sotto resta utilizzabile. `GAIA.diagnostics().performance` restituisce gli stessi numeri. Con SwiftShader, il renderer software dei collaudi, la vista del sistema «Legami e molecole» a 1440 × 900 procede a circa 0,2 fotogrammi al secondo mentre il disegno sul processore richiede circa 14 ms per fotogramma: il tempo si spende quasi tutto nella GPU emulata. La pagina serve a misurare le GPU reali delle scuole e degli studenti.

## La grammatica dei tipi

Dalla 1.42.0 i tipi di stazione sono dati: ogni tipo unisce una famiglia di forme, che decide la sagoma del nucleo, e un ruolo, che decide i moduli montati sul nucleo. Dodici famiglie e dieci ruoli danno 120 tipi, dieci volte i dodici tipi classici di `stations.js`, che restano come sono. Il nome segue la regola «ruolo + famiglia», con l'aggettivo concordato: «Habitat a ruota», «Fonderia sferica», «Impianto chimico su asteroide».

| Famiglia | Nucleo | Prese per i moduli |
|---|---|---|
| a spina | sezioni cilindriche impilate | una o due corone di 3-5 moduli, le due estremità, prese minori sulle altre sezioni |
| a ruota | anello rotante con raggi attorno a un mozzo | 3-6 moduli sul bordo dell'anello, che girano con lui; sopra e sotto il mozzo |
| a disco | disco basso con bordo finestrato | 3-5 moduli e uno centrale sul ponte, uno sotto, prese minori sul bordo |
| a grappolo | piccolo nodo centrale | bracci lunghi in 4, 6 o 8 direzioni, un modulo ciascuno |
| a traliccio | trave reticolare lunga 14-17 unità con 3-4 nodi | sopra e sotto ogni nodo, alle due estremità |
| sferica | grande sfera con cintura | 4-6 moduli sulla cintura, i due poli |
| poliedrica | icosaedro, dodecaedro, ottaedro o cubottaedro con telaio | sui vertici o sulle facce, alternando moduli maggiori e minori |
| a torre | ponti che si restringono su una base larga | 3-5 moduli sulla base, due corone sui ponti |
| a croce | quattro bracci attorno a un mozzo | estremità dei bracci, sopra e sotto il mozzo |
| a piattaforma | piattaforma piatta con travature sotto | griglia di 2 × 2 o 3 × 2 moduli sul ponte, due sotto |
| a tamburo | cilindro lungo che ruota sul proprio asse, con specchi | le due estremità e due corone statiche di 2-3 moduli |
| su asteroide | roccia irregolare con anello di ormeggio | 4-6 moduli sulla roccia |

| Ruolo | Nome | Moduli |
|---|---|---|
| abitazione | Habitat | modulo abitato, cupola abitata, baccelli, anello abitato, terrazze, parco |
| cantiere | Arsenale | scalo, gru, bacino, hangar, rampa di varo, officina |
| fonderia | Fonderia | forno, tramoggia, frantoio, camino, colata, radiatori caldi |
| chimica | Impianto chimico | colonna, sfere, reattore, scambiatore, fascio di tubi, torcia |
| energia | Centrale | pannelli, toro di fusione, radiatori, accumulatori, specchio, traliccio elettrico |
| ricerca | Laboratorio | laboratorio, bobine, acceleratore, camera a vuoto, campionatore, braccio sensore |
| osservazione | Osservatorio | parabola, telescopio, schiera, schermo solare, cupola ottica, interferometro |
| agricoltura | Fattoria | serra, biocupola, vasche di alghe, anello verde, alveare, petali |
| deposito | Magazzino | serbatoi, container, silo, rastrelliera, capsule, criogenico |
| comunicazioni | Ripetitore | pannello a fase, ripetitore, guglia, terminale laser, ventaglio di antenne, antenna |

I 60 moduli di `modules.js` si disegnano tutti lungo un asse, dentro una lunghezza e un raggio assegnati dalla presa, con un collo che li stacca dallo scafo; così qualunque famiglia può offrire una presa e qualunque ruolo può riempirla. Ogni istanza sceglie dal seme i parametri della famiglia e tre moduli del ruolo: il principale e il secondario si alternano sulle prese maggiori, il minore occupa circa tre quarti delle prese minori. Ogni ruolo ha anche proporzioni proprie: i ripetitori allungano i moduli del 70 % e li assottigliano, centrali e osservatori li allargano del 40-50 % per pannelli e parabole, i magazzini li accorciano. Il ruolo colora le fasce del nucleo: luce calda per le fonderie, verde per le fattorie, il colore della disciplina per centrali e ripetitori. Gli stili restano quelli dei tipi classici: in matematica nuclei e colli sfaccettati, in fisica bobine, in chimica tubi e fasce di pericolo, in biologia forme arrotondate.

Su 600 modelli (ogni tipo nei cinque stili) un tipo conta da 3248 a 28 752 triangoli, con mediana 11 102, e porta da 5 a 95 luci; il livello semplificato ne ha il 32,8 %. Le famiglie più pesanti sono la piattaforma e il traliccio, la più leggera l'asteroide.

Le sagome si confrontano in `tests/grammar.test.mjs`: ogni modello, nello stile civile, si proietta dall'alto, di fronte e di lato su una griglia di 32 × 32 celle scalata sul suo raggio, e due tipi si confrontano con la sovrapposizione media delle tre sagome (area dell'intersezione divisa per l'area dell'unione). Fra due tipi della stessa famiglia la sovrapposizione ha mediana 0,59 e massimo 0,81 (osservatorio e magazzino a torre); fra famiglie diverse ha mediana 0,36 e massimo 0,69. Il test chiede meno di 0,88 per ogni coppia, meno di 0,8 fra famiglie diverse e mediane sotto 0,7 e 0,45.

## Le stazioni aggiunte

Dalla 1.43.0 ogni sistema ha, oltre alle sei stazioni del catalogo, da 6 a 14 stazioni della grammatica dei tipi (`EXTRAS` in `catalog.js`, 300 in tutto): i sistemi hanno da 12 a 20 stazioni, e ognuno di questi nove numeri ricorre in tre o quattro sistemi. I ruoli seguono la disciplina del sistema, con un ordine di frequenza proprio di ognuna: osservatori, laboratori e ripetitori per la matematica, centrali, laboratori e osservatori per la fisica, impianti chimici, fonderie e magazzini per la chimica, fattorie, habitat e laboratori per la biologia; oltre i dieci ruoli l'elenco ricomincia. Habitat, magazzini, ripetitori e arsenali prendono lo stile civile, gli altri ruoli quello della disciplina; quando quella coppia di tipo e stile è già usata altrove si passa all'altro stile o a un'altra famiglia. In un sistema nessun tipo si ripete e una famiglia si ripete solo dove le stazioni aggiunte sono più di dodici; in tutto il catalogo nessun tipo compare due volte nello stesso stile. Le 300 stazioni usano 115 dei 120 tipi; il nome segue la regola dei tipi classici: «Laboratorio a disco Wöhler», «Centrale su asteroide Vega».

Le sei stazioni classiche restano dove erano. Le aggiunte cercano posto in quattro modi, nell'ordine:

1. un pianeta adatto al ruolo, con al massimo tre stazioni attorno, solo se la nuova orbita sta dentro lo spazio libero fra il pianeta e le orbite vicine, comprese le stazioni che le occupano, e almeno 0,4 unità oltre la stazione precedente dello stesso pianeta;
2. una corsia attorno alla stella, fra due orbite consecutive (oppure dentro la prima o fuori dall'ultima), lontana da pianeti e stazioni: le stazioni di una corsia hanno lo stesso raggio e la stessa velocità, quindi non si incontrano mai, e la corsia scelta è quella più vicina al pianeta preferito dal ruolo;
3. un anello esterno, fra la fascia di asteroidi (o il bordo del sistema) e la porta, con le stazioni distribuite lontano dalla porta;
4. le stazioni su asteroide dei dieci sistemi con la fascia ruotano con la fascia, come la miniera.

I ripetitori non orbitano mai attorno ai pianeti. Sulle 300 stazioni aggiunte 196 stanno nelle corsie, 87 nell'anello esterno, 9 attorno a un pianeta e 8 nella fascia: i pianeti disegnati sono grandi rispetto alla distanza fra le orbite, quindi raramente lasciano spazio. Campionando le posizioni ogni 7,3 s per 600 s, una stazione aggiunta resta ad almeno 1,56 volte la somma dei raggi da ogni altra stazione e ad almeno 1,23 volte la somma dei raggi da ogni pianeta che non la ospita.

L'economia usa le ricette dei ruoli: fonderie e arsenali come il cantiere, impianti chimici come la raffineria, centrali, laboratori, osservatori e fattorie come le stazioni classiche omonime. Tre ricette sono nuove:

| Ricetta | Produce | Consuma | Chiede |
|---|---|---|---|
| Habitat | equipaggi, 0,2 persone/s | cibo 0,3 t/s, energia 0,15 celle/s | cibo ed energia |
| Magazzino | | | minerale, cibo, energia, carburante e parti fino a circa metà della capacità; li cede oltre una scorta minima |
| Ripetitore | | energia, 0,12 celle/s | energia |

Con più stazioni del catalogo la porta esporta più dati e parti e importa meno, in proporzione al numero di stazioni diviso per sei. Ogni modello di nave viaggia con le sue gemelle come prima, più altre da una a tre secondo quante stazioni il sistema ha oltre le sei (il nome continua con IV, V e VI). Una simulazione di 1200 s per ognuno dei 30 sistemi con tre semi muove tutte le 1149 navi coinvolte, contro 581 con le sole stazioni classiche; le consegne passano da 12 833 a 32 734. Le stazioni classiche che producono qualcosa lavorano il 55,7 % del tempo invece del 46,0 %, perché trovano più acquirenti; le aggiunte il 36,3 %, e per il resto hanno il magazzino pieno o aspettano un ingrediente. La domanda, più del numero delle navi, limita oggi la produzione: l'economia con più merci e catene di lavorazione arriverà con la 1.45.0.

## Le classi di navi

Dalla 1.44.0 le navi civili seguono la stessa grammatica delle stazioni (`shipclasses.js`): ogni classe unisce una famiglia di scafo, che decide sagoma e motori, e un ruolo, che decide i moduli di bordo e il mestiere. Dodici famiglie e dieci ruoli danno 120 classi, dieci volte le dodici classi di `ships.js`, che restano come sono. Il nome segue la regola «ruolo + famiglia»: «Cisterna a sfere», «Cargo a telaio», «Nave passeggeri ad anello».

| Famiglia | Scafo | Velocità | Stiva |
|---|---|---:|---:|
| affusolata | lungo e sottile, ali a freccia | 1,25 | 0,8 |
| a cuneo | basso a prua, largo a poppa | 1,1 | 0,9 |
| a fuso | asse sottile con moduli a raggiera | 1 | 1 |
| a telaio | trave reticolare aperta con i carichi agganciati | 0,85 | 1,3 |
| a capsula | corto e arrotondato | 0,9 | 0,9 |
| a doppio scafo | due scafi uniti da un ponte | 0,95 | 1,2 |
| a tre scafi | scafo centrale e due scafi minori sui bracci | 1 | 1,1 |
| ad anello | scafo sottile con un anello rotante | 0,9 | 1,1 |
| a disco | disco piatto con una prua sporgente | 1 | 1 |
| modulare | blocchi squadrati in fila | 0,8 | 1,35 |
| ad ala | ala a delta attorno a uno scafo corto | 1,2 | 0,85 |
| a sfere | sfere unite da tubi | 0,9 | 1,2 |

| Ruolo | Nome | Moduli di bordo | Mestiere come |
|---|---|---|---|
| cargo | Cargo | fila di container, blocco di container, stiva, pianale | nave cargo |
| cisterna | Cisterna | serbatoio lungo, sfere in fila, fascio di serbatoi, sfera di carico | cisterna |
| passeggeri | Nave passeggeri | ponte passeggeri, cupola panoramica, veranda, modulo cabine | nave passeggeri |
| corriere | Corriere | capsula postale, propulsore ausiliario, antenna veloce, vano dati | corriere |
| minerario | Nave mineraria | tramoggia di bordo, frantoio di bordo, cassoni, braccio laser | rimorchiatore minerario, solo minerale |
| scientifica | Nave scientifica | braccio sensore, parabola, capsula strumenti, magnetometro | nave scientifica |
| rimorchiatore | Rimorchiatore | artigli, argano, motore di spinta, paraurti | rimorchiatore minerario |
| soccorso | Nave di soccorso | modulo medico, faro, capsula di salvataggio, segnalatore | nave di soccorso |
| costruzione | Nave officina | gru di bordo, telaio, portaparti, braccio saldatore | nave gru |
| navetta | Navetta | cabina, bagagliaio, sensore, oblò | navetta |

Una presa di bordo ha un punto, una normale, un'altezza, una mezza larghezza e una mezza lunghezza lungo lo scafo; i 40 moduli di bordo si disegnano con la lunghezza lungo lo scafo, e sul lato destro (verso −x) la presa gira il modulo di mezzo giro, così ugelli e bracci guardano sempre verso poppa o verso prua come devono. Il ruolo allunga o allarga lo scafo (i cargo e le cisterne sono più lunghi, i rimorchiatori più larghi e corti, i corrieri più sottili) e dà proporzioni proprie ai moduli; cargo, cisterne, navi minerarie e navi officina montano moduli anche sulle prese minori. Il mestiere di una classe (merci, stiva, velocità, sosta e comportamento quando non ha carichi) è quello della classe classica indicata nella tabella, con velocità e stiva moltiplicate per i fattori della famiglia.

Su 600 modelli (ogni classe nei cinque stili) una classe conta da 792 a 9496 triangoli, con mediana 3212, e porta da 1 a 27 luci; il livello semplificato ne ha il 46,1 %, più che per le stazioni, perché gli scafi raccordati hanno pochi segmenti da ridurre. Nelle sagome proiettate da tre lati su 32 × 32 celle due classi della stessa famiglia si sovrappongono con mediana 0,64 e al massimo per lo 0,92 della loro unione (navetta e nave di soccorso a sfere), due classi di famiglie diverse con mediana 0,44 e al massimo 0,74: le navi di una famiglia si somigliano più delle stazioni, come le navi reali costruite sullo stesso scafo, e si distinguono soprattutto per i moduli di bordo.

Ogni sistema riceve da 4 a 8 modelli di queste classi (`SHIP_EXTRAS` in `catalog.js`, 179 in tutto, tre ogni cinque stazioni aggiunte), con identificatori dallo slot 30. I ruoli seguono la disciplina, come per le stazioni; fra i primi tre ruoli ancora da assegnare vale quello che ha classi non ancora presenti nel catalogo, così compaiono tutte le 120 classi. In un sistema le famiglie di scafo non si ripetono, e in tutto il catalogo nessuna classe compare due volte nello stesso stile. Ognuno di questi modelli viaggia da solo o, con probabilità 0,35, con una gemella. La simulazione di 1200 s su 30 sistemi e tre semi muove ora 1864 navi, tutte in viaggio, contro le 1149 della 1.43.0; le consegne salgono da 32 734 a 44 871, le stazioni classiche che producono lavorano il 57,6 % del tempo e le stazioni aggiunte il 40,1 %.

## L'economia delle catene

Dalla 1.45.0 le merci sono 24, in cinque famiglie:

| Famiglia | Merci |
|---|---|
| grezze | minerale, ghiaccio, idrogeno, silicati, terre rare |
| lavorate | metalli, acqua, ossigeno, vetro, carburante, polimeri, fertilizzanti, semiconduttori, leghe |
| per la vita | cibo, biomassa, medicinali, energia |
| avanzate | parti di nave, elettronica, strumenti, moduli abitativi, dati |
| persone | equipaggi |

Le catene seguono processi reali: il minerale si riduce in metalli, i silicati fondono in vetro o crescono in cristalli di silicio per i semiconduttori, il ghiaccio fonde in acqua, l'acqua si separa per elettrolisi in ossigeno e idrogeno, l'idrogeno dà ammoniaca per i fertilizzanti (come nel processo Haber-Bosch), polimeri e propellente, piante e alghe trasformano la luce in cibo, biomassa e ossigeno. Ogni ruolo della grammatica dei tipi ha una o più ricette, che si alternano lungo le dodici famiglie (`worksOf` in `grammar.js`): fonderie, impianti chimici, arsenali e laboratori di famiglie diverse lavorano su anelli diversi della catena.

| Ruolo | Processo | Produce | Consuma |
|---|---|---|---|
| Habitat | vita a bordo | equipaggi 0,2 persone/s | cibo 0,3, acqua 0,25, ossigeno 0,15 t/s, energia 0,15 celle/s, medicinali 0,02 kg/s, moduli abitativi 0,01 unità/s |
| Arsenale | montaggio di parti | parti 0,25 moduli/s | metalli 0,5, polimeri 0,12 t/s, energia 0,3 celle/s |
| | assemblaggio di circuiti | elettronica 0,15 moduli/s | semiconduttori 0,2 kg/s, metalli 0,1 t/s, energia 0,2 celle/s |
| | costruzione di moduli | moduli abitativi 0,1 unità/s | parti 0,15 moduli/s, vetro 0,2 t/s, elettronica 0,05 moduli/s, energia 0,2 celle/s |
| Fonderia | riduzione del minerale | metalli 0,6 t/s | minerale 1 t/s, energia 0,3 celle/s |
| | fusione di leghe | leghe 0,25 t/s | metalli 0,4 t/s, terre rare 0,05 kg/s, energia 0,25 celle/s |
| | fusione dei silicati | vetro 0,5 t/s | silicati 0,8 t/s, energia 0,25 celle/s |
| | crescita del silicio | semiconduttori 0,12 kg/s | silicati 0,3 t/s, terre rare 0,03 kg/s, energia 0,35 celle/s |
| Impianto chimico | fusione del ghiaccio | acqua 1 t/s | ghiaccio 1,1 t/s, energia 0,1 celle/s |
| | elettrolisi dell'acqua | ossigeno 0,5, idrogeno 0,1 t/s | acqua 0,6 t/s, energia 0,4 celle/s |
| | sintesi dell'ammoniaca | fertilizzanti 0,3 t/s | idrogeno 0,3 t/s, energia 0,3 celle/s |
| | polimerizzazione | polimeri 0,4 t/s | idrogeno 0,25, biomassa 0,1 t/s, energia 0,2 celle/s |
| | sintesi del propellente | carburante 0,8 t/s | idrogeno 0,5, ossigeno 0,2 t/s |
| Centrale | fusione dell'idrogeno | energia 1,5 celle/s | idrogeno 0,12 t/s (a metà ritmo senza) |
| | pannelli solari | energia 1,1 celle/s | |
| Laboratorio | costruzione di strumenti | strumenti 0,1 unità/s | elettronica 0,08 moduli/s, vetro 0,1 t/s, energia 0,2 celle/s |
| | sintesi di farmaci | medicinali 0,15 kg/s | biomassa 0,2, acqua 0,1 t/s, energia 0,15 celle/s |
| | esperimenti | come il laboratorio dei campi | |
| Osservatorio | osservazione del cielo | dati 0,5 TB/s | energia 0,05 celle/s (a metà ritmo senza) |
| Fattoria | fotosintesi | come la serra | |
| | fotobioreattore | biomassa 0,6, ossigeno 0,25 t/s | acqua 0,3 t/s, energia 0,05 celle/s (a metà ritmo senza) |
| Magazzino | smistamento | | chiede e cede minerale, metalli, cibo, acqua, energia, carburante e parti |
| Ripetitore | ritrasmissione | | energia 0,12 celle/s |

Le stazioni di trasformazione (arsenali, fonderie, impianti chimici, laboratori di strumenti e farmaci, cantiere) si fermano quando manca un ingrediente; raffinerie, serre, centrali a fusione, laboratori degli esperimenti, osservatori e fotobioreattori lavorano a metà ritmo; miniere, pannelli solari, habitat e porti producono comunque. Il magazzino di una stazione tiene 160 s di ogni prodotto e 450 s di ogni ingrediente, e la stazione chiede 300 s di ogni ingrediente.

La porta di ogni sistema bilancia le catene. Per ogni merce somma ciò che le stazioni producono e consumano: se producono meno di una volta e mezza ciò che consumano, la porta importa la differenza con un quinto in più, e almeno un quarto del consumo come riserva; se producono di più, la porta esporta l'eccedenza. Ogni merce senza acquirente può comunque essere scaricata alla porta. Le classi di navi portano merci più varie di prima: le navi cargo quasi tutte le merci solide e avanzate, le cisterne i fluidi, navette e navi passeggeri anche acqua e ossigeno; se nessuna nave di un sistema porta una merce richiesta, la nave con la stiva più grande la aggiunge alle sue. Una nave libera sceglie il trasporto come prima, con due regole nuove: il carico minimo scende alla metà di quanto chiede la stazione, se è meno del 30 % della stiva, così anche gli ingredienti lenti come vetro, polimeri ed elettronica trovano una nave; e una stazione con meno di 90 s di un ingrediente vale tre volte tanto se rischia di fermarsi, due volte se rischia di scendere a metà ritmo.

Il resoconto di una stazione nomina il processo e il prodotto principale («Elettrolisi dell'acqua: 120 t di ossigeno»), oppure che cosa la ferma («Ferma: manca acqua», «A metà: manca idrogeno»); la seconda riga elenca ciò che chiede.

La simulazione di 1200 s su 30 sistemi e tre semi muove 1897 navi, tutte in viaggio; le consegne salgono a 59 455, contro 44 871 nella 1.44.0, e arrivano a destinazione tutte le 24 merci. Le stazioni classiche che producono lavorano il 95,2 % del tempo e le stazioni aggiunte l'86,2 %, contro il 57,6 e il 40,1 % della 1.44.0. Sul totale delle stazioni che producono, il tempo si divide così: 81,8 % a pieno ritmo, 7,3 % a metà ritmo, 1,5 % ferme per un ingrediente, 9,4 % con il magazzino pieno. Nei sistemi con le sole sei stazioni classiche le consegne passano da 12 833 a 17 299.

## Stazioni che crescono, cantieri e convogli

Dalla 1.46.0 i sistemi cambiano mentre li si osserva.

Le stazioni che producono crescono. Dopo 300 s a pieno ritmo una stazione al primo livello chiede un kit di ampliamento: 12 parti di nave, oppure 4 moduli abitativi per habitat e porti. Quando le navi lo consegnano la stazione sale al secondo livello; al secondo livello servono 600 s a pieno ritmo e un altro kit per il terzo, l'ultimo. Ogni livello aggiunge un quarto ai ritmi di produzione e di consumo e un quinto ai magazzini, e la stazione si disegna più grande di un ottavo. Il resoconto mostra il livello («Livello 2 · Scorte sufficienti») o il kit che la stazione aspetta. La porta non cresce; dopo ogni ampliamento rifà il bilancio delle catene con la regola della 1.45.0, così importazioni ed esportazioni seguono i nuovi ritmi, e fin dall'avvio conta i kit come un piccolo consumo costante di parti e moduli.

I cantieri, classici e della grammatica con la ricetta del montaggio, varano navi. Quando un cantiere ha in magazzino 30 parti non prenotate, le usa per una nave nuova, al più una ogni 120 s, finché la flotta del sistema resta sotto il suo limite: la flotta iniziale più un quarto delle stazioni, almeno due. Il cantiere sceglie fra i modelli del sistema quello che porta le merci di cui le stazioni hanno più bisogno; la nave prende il nome del modello con il numero romano successivo, fino a XII, e dopo il varo lavora come le altre.

La porta non importa più in modo continuo. Ogni 60-120 s arriva un convoglio da uno dei tre sistemi più vicini nella galassia, che compare con un lampo oltre la porta, attracca, scarica le merci importate nel tempo trascorso dal convoglio precedente e riparte con le merci esportate, per poi sparire allo stesso modo. Il resoconto del convoglio dice da dove viene e che cosa scarica o porta via.

La cronaca del sistema, sotto il pannello dell'unità nella vista del sistema su schermi da computer, elenca gli ultimi eventi dal più recente con il tempo trascorso: navi varate, stazioni che salgono di livello, convogli in arrivo, stazioni di trasformazione che si fermano per un ingrediente dopo almeno 30 s di lavoro e che ripartono. L'economia conserva le ultime 24 notizie; sui telefoni la cronaca non compare.

Il traffico minore unisce ogni stazione alla più vicina: su ogni corsia due o tre luci di navette e capsule vanno avanti e indietro, con un lieve arco, e si spengono vicino alle stazioni. Sono soltanto bagliori, nella stessa chiamata a istanze degli altri, e mancano nella qualità più bassa.

La simulazione di 1200 s su 30 sistemi e tre semi, con tutte le stazioni, parte da 1908 navi e ne vara altre 210; le consegne salgono a 63 502, contro 59 453 nella 1.45.0 misurata allo stesso modo, e arrivano 1218 convogli. Alla fine 649 stazioni su 1440 hanno almeno il secondo livello e 160 il terzo. Le stazioni che producono lavorano a pieno ritmo l'83,9 % del tempo (81,8 % nella 1.45.0), a metà ritmo il 6,2 %, restano ferme per un ingrediente l'1,1 % (1,5 %) e con il magazzino pieno l'8,9 %. Nei sistemi con le sole sei stazioni classiche le consegne passano da 17 287 a 18 756 e il tempo da fermi per un ingrediente scende dal 4,5 al 2,8 %.

## La flotta di difesa

Dalla 1.47.0 ogni sistema ha una difesa propria, costruita in un sesto stile, quello della flotta. Dalla 1.47.1 le navi sono scure, spigolose e asimmetriche: piastre di corazza sfaccettate in grigio antracite e canna di fucile, punte di prua di lunghezza diversa, lame e antenne, sponsoni e scafi laterali su un solo lato, guglie di comando fuori asse, giunti e bordi arancio rosso nel colore della flotta, finestre e motori color ambra. Anche le stazioni di difesa prendono i colori scuri dello stile. Lo stile riprende la fantascienza navale delle grandi flotte spaziali senza copiare navi esistenti. Stazioni e navi prendono i nomi di esploratori, navigatori e astronauti. Il codice è in `src/craft/defence.js`.

Le classi di navi sono undici, dalla più piccola:

| Classe | Lunghezza | Forma |
|---|---|---|
| Caccia | circa 18 m | corpo a cuneo con due punte di lunghezza diversa, ali a freccia, a lama o a delta, una lama dorsale su un lato; vola in formazione di tre |
| Intercettore | circa 24 m | scafo ad ago davanti a un blocco motori, due o tre lame inclinate, una sonda su un lato; vola in coppia |
| Pattugliatore | circa 40 m | prua a punta, uno sponsone su un lato con torretta e motore, un'antenna sull'altro, sovrastruttura spostata |
| Corvetta | circa 70 m | due punte di prua di lunghezza diversa, dorso corazzato, torretta, lanciatori, lame di poppa diverse sui due lati, motori 3 × 2 |
| Fregata | circa 110 m | punta ventrale, scafo hangar su un lato e lanciatori sull'altro, due torrette, sovrastruttura spostata, motori 3 × 2 |
| Cacciatorpediniere | circa 150 m | tre punte di prua sfalsate, tre torrette, gondola di lanciatori su un lato e lame sull'altro, motori 4 × 2 |
| Incrociatore | circa 210 m | punte di prua diverse, quattro torrette, torre di comando su un lato e una minore sull'altro, emettitore di scudo, ali a lama asimmetriche, motori 4 × 3 |
| Incrociatore pesante | circa 280 m | due punte di lunghezza diversa, spesso un'arma spinale fra le due, cinque torrette, lame sui fianchi, motori fino a 5 × 3 |
| Corazzata | circa 380 m | dorso a due livelli, punte di prua diverse, lama ventrale, sei torrette, guglia di comando su un lato, due emettitori di scudo, file di lame sui fianchi, motori 6 × 3 |
| Portaerei | circa 420 m | scafo hangar maggiore su un lato con pista e bocca illuminata, scafo minore con la guglia di comando sull'altro, motori 3 × 2 |
| Superportaerei | circa 720 m | due scafi di lunghezza diversa con hangar e piste, trave centrale con una o due guglie spostate, anello abitato che ruota, motori 3 × 3 su ogni scafo |

Le stazioni di difesa sono cinque: la base della flotta, con bracci di attracco, ormeggi e un hangar; la stazione di sorveglianza, con schiere di antenne, parabole e un anello radar che ruota; la piattaforma di difesa, esagonale, con torrette, pannelli o radiatori; la fortezza orbitale, un poliedro corazzato con due piani di torrette; il generatore di scudo, con anelli emettitori che ruotano in versi opposti attorno a un reattore.

La forza della difesa cresce verso la frontiera, cioè verso l'ultimo sistema di ogni braccio della galassia, il più lontano dal centro. Ogni sistema ha la base della flotta, la stazione di sorveglianza, un'ala leggera (caccia nei sistemi pari, intercettori nei dispari), un pattugliatore e una corvetta; il resto dipende dalla distanza dalla frontiera, contata in sistemi lungo il braccio:

| Distanza | Sistemi | Navi in più | Stazioni in più |
|---:|---:|---|---|
| 4 o più | 14 | | |
| 3 | 4 | fregata | |
| 2 | 4 | cacciatorpediniere, corazzata | piattaforma |
| 1 | 4 | fregata, incrociatore, portaerei | piattaforma, fortezza |
| 0 | 4 | caccia e intercettori insieme, fregata, cacciatorpediniere, incrociatore pesante, superportaerei | piattaforma, fortezza, generatore di scudo |

In tutto le stazioni di difesa sono 84 e i modelli di nave 134, con tutte le classi e tutte le stazioni presenti; le superportaerei stanno solo nei quattro sistemi di frontiera.

| | Modelli | Triangoli | Mediana | Livello semplificato |
|---|---:|---:|---:|---:|
| Navi | 134 | da 524 a 9118 | 1696 | 40,1 % |
| Stazioni | 84 | da 1484 a 6480 | 3712 | 27,4 % |

Le stazioni di difesa formano una linea 1,8 unità oltre la porta e oltre l'anello esterno: base della flotta, fortezza e generatore di scudo accanto alla porta, la piattaforma a metà strada, la stazione di sorveglianza dalla parte opposta del sistema. Vengono collocate per ultime, così le altre stazioni restano dove erano. Nelle prove su 900 s una stazione di difesa resta ad almeno 4,6 volte la somma dei raggi da ogni altra stazione e ad almeno 7,3 volte da ogni pianeta.

Le navi di difesa viaggiano senza merci e pattugliano fra la base, le stazioni di difesa, la porta e il porto; a volte passano accanto a una stazione qualunque del sistema, e fra una pattuglia e l'altra si riforniscono alla base. Caccia e intercettori volano in formazione dietro la nave guida, nella stessa chiamata a istanze della loro classe. Dall'incrociatore in su una nave naviga senza gemelle. Il resoconto dice se la nave è in pattuglia, di guardia o in rifornimento.

Le stazioni di difesa consumano merci e quindi entrano nelle catene: la base chiede carburante, energia, cibo e parti per la flotta, la fortezza energia e parti, la piattaforma energia, il generatore di scudo energia e un poco di idrogeno; la stazione di sorveglianza consuma energia e produce dati. Senza ciò che chiedono lavorano a metà forza e il resoconto lo dice («A metà forza, senza carburante»); le stazioni di difesa non crescono.

Nella simulazione di 1200 s su 30 sistemi e tre semi la difesa aggiunge 252 stazioni e 596 navi; le consegne salgono da 63 502 a 66 950 e il tempo a pieno ritmo delle stazioni che producono scende dall'83,9 all'82,2 %, perché la difesa consuma energia e carburante. Su due semi la base della flotta lavora a metà forza il 13,3 % del tempo, il generatore di scudo il 19,7 %, le altre stazioni di difesa meno del 2 %.

## Le minacce naturali

Dalla 1.48.0 i sistemi affrontano tre minacce naturali, scelte dal caso: sciami di meteoroidi (cinque volte su dieci), asteroidi vaganti (tre su dieci) e brillamenti della stella (due su dieci). La prima arriva fra 80 e 140 s dall'apertura del sistema, le altre ogni 220-400 s. Il codice è in `src/craft/threats.js`, con un proprio generatore casuale, così le minacce cambiano l'economia soltanto con i loro effetti.

Uno sciame di 14-24 frammenti, oppure un asteroide, arriva da oltre l'anello esterno verso una stazione e la raggiunge in 48-72 s. La stazione di sorveglianza lo vede appena compare e la flotta parte subito; senza sorveglianza, o se le manca l'energia, la flotta parte quando la minaccia ha percorso un terzo della strada. Partono le navi di difesa che arrivano per prime al punto dove la minaccia passerà, ai sette decimi del percorso: fino a quattro contro uno sciame, fino a due contro un asteroide, scelte fra le navi dalla fregata in su quando ce ne sono. Le navi aspettano in posizione e sparano negli otto secondi attorno al passaggio; ogni nave distrugge tanti frammenti quanta è la sua forza, da 4 per il pattugliatore a 18 per la superportaerei, e un asteroide richiede una forza complessiva di almeno 8. Piattaforme e fortezze entro 10 unità dal bersaglio colpiscono negli ultimi secondi.

Ciò che passa colpisce la stazione: ogni frammento aggiunge il 4 % di danni, un asteroide il 60 % e distrugge il 30 % delle scorte; le stazioni di difesa subiscono metà danno, e i danni arrivano al massimo all'80 %. Una stazione danneggiata lavora più piano, al 70 % con il 40 % di danni, chiede parti di nave per le riparazioni (5 più 25 per ogni unità di danno, cioè 15 parti con il 40 %) e torna intera quando le arrivano. Un brillamento dimezza per 45 s il lavoro delle stazioni; restano intere le stazioni di difesa e quelle entro 14 unità da un generatore di scudo acceso.

Nella scena i frammenti lasciano scie, gli asteroidi sono rocce che ruotano, navi e stazioni sparano raggi rossi, ogni frammento distrutto dà un lampo e un asteroide distrutto si spezza in schegge; ciò che colpisce una stazione dà un lampo più grande. Un brillamento accende la stella e manda verso l'esterno un fronte luminoso, e attorno al generatore di scudo compare l'anello dello scudo. Un triangolo arancio indica la minaccia in arrivo: passandoci sopra si legge dove va, fra quanto colpisce e che cosa fa la difesa. La cronaca racconta avvistamenti, partenze della flotta, intercettazioni, impatti e riparazioni; i resoconti delle navi dicono «Intercettazione» e «In posizione di tiro», quelli delle stazioni i danni o il brillamento.

Nella simulazione di 1800 s su 30 sistemi e tre semi arrivano 277 sciami, 152 asteroidi e 115 brillamenti. Con la flotta di difesa vengono distrutti 4536 frammenti su 5158 (87,9 %) e 139 asteroidi su 146 giunti a destinazione; le stazioni che producono lavorano a pieno ritmo il 78,1 % del tempo, contro l'81,2 % senza minacce, e restano danneggiate l'1,8 % del tempo. Senza flotta di difesa nessuna minaccia viene fermata: il tempo a pieno ritmo scende dall'82,3 al 74,5 %, le stazioni restano danneggiate il 6,6 % del tempo e le riparazioni passano da 76 a 240.

## Lo Sciame della Frontiera

Dalla 1.49.0 la galassia ha un avversario: lo Sciame della Frontiera, un'intelligenza sintetica arrivata dal margine della galassia che trasforma la materia in substrato di calcolo. È uno sciame di sonde autoreplicanti, nel senso che John von Neumann dava alle macchine capaci di costruire copie di sé stesse con materia grezza: i suoi droni crescono come cristalli dalla roccia degli asteroidi e tornano polvere a missione finita. La sua fame ha una ragione fisica: cancellare un bit costa almeno kT ln 2 di energia (il limite di Landauer), quindi un calcolo che cresce cerca materia fredda e modi per smaltire calore. Lo Sciame riprende soltanto temi generali della fantascienza; nomi, personaggi e trame di opere esistenti restano fuori. Il codice è in `src/craft/swarm.js` e, per le battaglie, in `src/craft/threats.js`.

Il fronte si conta lungo ogni braccio della galassia, a partire dall'ultimo sistema, il più lontano dal centro: all'inizio lo Sciame contende i quattro sistemi di frontiera, e al massimo può contendere gli ultimi quattro sistemi di un braccio. La prima incursione parte fra 150 e 240 s dall'apertura del sito, le altre ogni 170-300 s, contro il sistema sulla linea del fronte di un braccio scelto dal caso; le ondate partono da 9-14 droni e crescono di un drone e mezzo circa a ogni incursione, fino a 30. Un'incursione respinta fa arretrare il fronte di quel braccio di un sistema; una riuscita converte alcune stazioni del sistema per 300 s e fa avanzare il fronte. Nessun sistema resta perso: le stazioni convertite tornano libere e il fronte arretra quando la difesa vince.

Se il sistema attaccato è aperto nella scena, l'incursione si combatte lì. I droni crescono per 12 s attorno a una roccia oltre l'anello esterno, poi volano verso una stazione in 50-62 s. La flotta parte subito, perché la crescita si vede; fino a sei navi aspettano sulla rotta, e piattaforme e fortezze vicine al bersaglio colpiscono negli ultimi secondi. Per abbattere un drone servono tre unità di forza. I droni che passano salgono a bordo della stazione: per 40 s la stazione si ferma e le sue scorte diventano substrato, poi i droni tornano polvere e lasciano il 6 % di danni ciascuno, da riparare con le parti di nave. Se il sistema non è aperto, l'esito viene dalla forza delle quattro classi più forti della sua flotta, con una parte di caso, e da piattaforme e fortezze.

Nella scena i droni sono poliedri scuri con un nucleo azzurro e quattro aculei, disegnati a istanze: crescono attorno alla roccia, volano con gli aculei avanti, si illuminano e si sbriciolano quando la difesa li colpisce, girano attorno alla stazione convertita e alla fine si disperdono in polvere. Un triangolo arancio indica l'incursione, con il numero di droni, i tempi e, dopo l'arrivo, i droni a bordo. Sulla mappa della galassia un anello azzurro segna ogni sistema conteso e pulsa dove un'incursione è in corso o ci sono stazioni convertite; un riquadro conta i sistemi contesi. La Cronaca della frontiera entra nella cronaca del sistema aperto con il prefisso «Fronte:».

Nel modello della galassia, su otto semi e 60 minuti, partono 124 incursioni: 48 respinte e 72 riuscite, con 63 avanzate del fronte; il primo avanzamento arriva fra 12 e 37 minuti. Il fronte resta ai sistemi di frontiera il 64 % del tempo, contende due sistemi per braccio il 17 %, tre il 12 % e quattro il 7 %. Nelle battaglie in un sistema aperto, provate in 16 sistemi con due semi, la difesa respinge quasi sempre un'ondata di 10 droni e abbatte circa tre quarti di un'ondata di 18 e metà di una di 26 nei tre sistemi più vicini alla frontiera.

## Lo Sciame che impara, le chiavi e il Rapporto

Dalla 1.50.0 lo Sciame impara dai suoi risultati e la difesa impara dallo Sciame. Il punto debole dello Sciame è la sua conoscenza: ogni drone abbattuto porta con sé il protocollo che lo lega allo sciame, e chi lo studia può spezzare quel legame.

Lo Sciame tiene un peso per ogni braccio della galassia, uguale per tutti all'inizio, e sceglie il braccio della prossima incursione con probabilità proporzionale ai pesi. Una conversione moltiplica il peso del braccio per 1,35, un'incursione respinta per 0,8, sempre fra 0,25 e 4. Quando un braccio supera il 35 % del peso totale diventa il bersaglio preferito, e la Cronaca della frontiera lo annuncia.

Dopo ogni incursione la difesa recupera come campioni il 16 % dei droni abbattuti. Con 12 campioni i laboratori del sistema più interno del braccio preferito ricavano una chiave, e quattro corrieri la portano ai quattro fronti in 60-150 s. Una chiave consegnata libera parte dell'ondata prima della battaglia: con la forza iniziale di 0,5 libera il 30 % dei droni. Ogni incursione in cui la chiave libera droni ne riduce la forza a 0,85 di quella precedente, perché lo Sciame cambia protocollo: dopo quattro usi la forza scende sotto 0,3 e i laboratori possono ricavare la chiave successiva con nuovi campioni, dopo otto scende sotto 0,15 e la chiave smette di funzionare. Mentre la chiave in uso è ancora forte, i campioni si accumulano fino alla quantità che basta per una chiave e lì si fermano.

I droni liberati perdono il legame con lo Sciame e restano nel sistema dove sono stati liberati, al più 40 per sistema. Riparano le stazioni danneggiate senza attendere le parti di nave, al ritmo di 0,0004 di danno al secondo per drone e al più 0,01 al secondo: venti droni tolgono 0,3 di danno in meno di 40 s. Lavorano anche accanto alle miniere, con il 2 % di minerale e silicati in più per drone, fino al 50 %. Nella scena, durante un'incursione combattuta dal vivo, i droni liberati si staccano dall'ondata fra 5 e 11 s dopo la partenza con un lampo verde e raggiungono il porto in 20 s; da allora volano fra le stazioni sulle corsie del traffico minore, fino a 16 alla volta, come poliedri chiari con il nucleo verde. La cronaca del sistema ne indica il numero nel titolo.

Il riquadro del fronte sulla mappa della galassia apre il Rapporto sullo Sciame della Frontiera, una previsione statistica della prossima incursione. Per ogni braccio il Rapporto mostra il sistema sulla linea del fronte, la probabilità che la prossima incursione lo colpisca, l'ondata attesa, i droni che la chiave libererebbe, la probabilità di respingerla e lo stato della chiave. La probabilità di respingere viene dal modello della galassia, mediato sul caso della battaglia. Ogni previsione viene registrata alla partenza dell'incursione, così il Rapporto confronta le ultime cinque previsioni con gli esiti e dà due punteggi: quante volte il braccio più probabile è stato colpito contro le volte attese, e il punteggio di Brier delle previsioni di esito, la media dei quadrati delle differenze fra probabilità prevista ed esito, che vale 0 per una previsione perfetta e 0,25 per una previsione sempre al 50 %. Il Rapporto mostra anche i pesi imparati dallo Sciame, i campioni, l'avanzamento della prossima chiave e i droni liberati. La previsione vale per molte incursioni insieme, e una sola incursione può smentirla: è il tema del sito, la statistica che descrive bene i comportamenti collettivi.

Nel modello della galassia, su otto semi e 60 minuti, partono 123 incursioni: 61 respinte e 58 riuscite, con 49 avanzate del fronte. La difesa raccoglie 268 campioni e ricava 18 chiavi, la prima fra 1150 e 1480 s; le chiavi liberano 407 droni. Il braccio più probabile è colpito nel 46,2 % delle incursioni contro il 50,6 % atteso, e il punteggio di Brier delle previsioni di esito vale 0,126.

## Il catalogo 3D

Dalla 1.51.0 ogni modello si può guardare da vicino nel catalogo 3D: l'elenco e le schede sono in `src/craft/registry.js`, il modello è disegnato dalla scena `craft` di `src/scene/world.js` e la pagina è in `src/app.js`. Il catalogo si apre dal pulsante «Catalogo dei modelli» della schermata di un sistema (su telefono «Navi») oppure con un clic su una stazione o una nave della scena; al tocco, il primo tocco mostra il resoconto e il secondo apre il catalogo. L'indirizzo della pagina nomina il modello, per esempio `#/craft?model=s17-60`, e si può condividere.

I 997 modelli seguono un solo ordine: per sistema, prima le stazioni e poi le navi, con la difesa in fondo a ciascun gruppo. L'elenco a sinistra filtra per gruppo (tutti, stazioni, navi, difesa) e mostra i modelli del sistema aperto o di tutta la galassia, una pagina alla volta; «Precedente» e «Successivo» scorrono l'elenco e dopo l'ultimo modello ricominciano dal primo. Al centro il modello gira lentamente con le parti mobili, lo scudo e le luci; si trascina per guardarlo da ogni lato, si avvicina con lo zoom e si ferma con «Ferma». Lo costruisce la stessa fabbrica dei sistemi, prima nella versione semplificata e poi in quella completa.

La scheda a destra descrive il modello: tipo e dimensioni, quando sono indicate, sistema e braccio; per una stazione il processo, le merci che produce e quelle che consuma; per una nave civile le merci che trasporta, il carico e la velocità; per una nave di difesa la forza contro i droni dello Sciame e la formazione. Seguono la descrizione e i triangoli del modello completo e di quello semplificato; «Vai al sistema» porta al sistema del modello. Su telefono la scheda sta sotto il modello e l'elenco la sostituisce a richiesta. Il testo della scheda entra anche nella descrizione accessibile della pagina.

`docs/CATALOGO.md` elenca gli stessi modelli sistema per sistema, con tipo, genere, stile e lavoro. Lo scrive `node scripts/craft-catalogue.mjs` a partire dal codice, e un test controlla che il file resti allineato.

## Esercizi sul Rapporto

Dalla 1.52.0 il Rapporto diventa materia di esercizio per due unità di matematica, «Combinatoria, probabilità e statistica» (math-c10) e «Probabilità, informazione e fenomeni collettivi» (math-p07). Gli esercizi sono scritti con i numeri dello Sciame nel momento in cui si aprono (`src/craft/esercizi.js`): ogni numero della domanda è mostrato arrotondato, e la risposta è calcolata dai numeri arrotondati, così che lo studente possa rifare ogni passaggio.

Gli esercizi sono cinque. Il primo chiede la probabilità che la prossima incursione colpisca un braccio, a partire dai pesi dello Sciame. Il secondo chiede il numero atteso di droni dell'ondata, supponendo equiprobabili gli interi fra gli estremi previsti, e compare quando gli estremi sono diversi. Il terzo applica il teorema della probabilità totale per ottenere la probabilità che la prossima incursione sia respinta, qualunque braccio colpisca. Il quarto chiede il punteggio di Brier delle ultime cinque previsioni di esito e compare dopo almeno tre incursioni concluse. Il quinto misura in deviazioni standard lo scarto fra le volte in cui il braccio più probabile è stato colpito e le volte attese, trattando le incursioni come prove indipendenti, e compare dopo almeno otto incursioni concluse. Il primo, il secondo e il quarto appartengono alla prima unità, il terzo e il quinto alla seconda.

Ogni esercizio offre quattro risposte. Le tre sbagliate vengono da errori frequenti: la media semplice al posto della media pesata, il rapporto fra le probabilità al posto della probabilità, la somma dei quadrati al posto della loro media, lo scarto diviso per la varianza al posto della deviazione standard. Conta la prima risposta; poi la scheda dice se era esatta, indica quella corretta e mostra lo svolgimento passo per passo, con il conto delle risposte esatte. Gli esercizi restano fermi mentre lo studente risponde; ogni nuova apertura prende i numeri del momento e rimescola le risposte.

Gli esercizi si aprono dal pulsante «Esercizi sul Rapporto», in fondo al Rapporto, e dalla scheda delle due unità sulla mappa, con il pulsante «Esercizi nella galassia». Dalla scheda degli esercizi si torna al Rapporto o si apre l'unità. Su telefono le risposte stanno due per riga e, sugli schermi più bassi, lo svolgimento prende il posto della domanda dopo la risposta. Domanda, risposte e svolgimento entrano nella descrizione accessibile della mappa.

## Esercizi sulle stazioni

Dalla 1.53.0 le ricette delle stazioni diventano esercizi per due unità di chimica, «Stechiometria e reagente limitante» (chemistry-14) e «Velocità di reazione» (chemistry-17). Una stazione che trasforma alcune merci in un prodotto lavora come una reazione a proporzioni fisse: per ogni secondo a pieno ritmo consuma quantità date di ciascuna merce e produce una quantità data di prodotto. Hanno esercizi le 178 stazioni la cui ricetta trasforma almeno due merci in prodotti, con 18 processi e da 2 a 9 stazioni per sistema; restano fuori porti e habitat, che producono equipaggi, e le stazioni di difesa (`src/craft/esercizi-catene.js`).

Gli esercizi sono cinque. Il primo chiede quale merce finisce per prima, senza nuove consegne, e dopo quanti secondi: è la merce limitante, quella con il rapporto più piccolo fra scorta e consumo al secondo. Il secondo chiede quanto resta della merce che dura di più quando la limitante finisce. Il terzo usa la proporzione fissa fra una merce consumata e il prodotto, come i coefficienti di un'equazione bilanciata. Il quarto ricava la velocità media di produzione da due letture del magazzino. Il quinto combina le condizioni che rallentano il lavoro: un brillamento dimezza il ritmo, un danno d lo rallenta di 0,75 · d, e i due fattori si moltiplicano. I primi tre appartengono all'unità sulla stechiometria, gli ultimi due a quella sulla velocità di reazione.

Le scorte sono quelle della stazione nel sistema aperto, quando la stazione si trova lì; altrimenti sono estratte fra il 15 % e il 75 % della capienza, come all'avvio dell'economia. Le velocità di una stazione cresciuta sono arrotondate a tre decimali, la precisione mostrata nelle domande. Lo svolgimento tiene conto del modo di lavorare della stazione: 115 stazioni si fermano quando manca una merce, le altre 63 (serre, alghe e laboratori) lavorano a metà ritmo e continuano a consumare le merci rimaste. Come sul Rapporto, ogni risposta è calcolata dai numeri mostrati, le risposte sbagliate vengono da errori frequenti (la merce con la scorta più piccola al posto di quella che dura meno, il rapporto rovesciato, la somma dei fattori al posto del prodotto), conta la prima risposta e lo svolgimento segue passo per passo.

Gli esercizi si aprono dal pulsante «Esercizi sulla stazione» nella scheda del catalogo 3D (su telefono «Esercizi») e dalla scheda delle due unità sulla mappa, che apre il catalogo su una stazione del sistema dell'unità. Su schermo largo gli esercizi prendono il posto della scheda, accanto al modello che continua a girare; su telefono occupano la pagina e le risposte stanno due per riga. Dopo la risposta, se lo svolgimento non entra, le risposte lasciano il posto allo svolgimento e, sugli schermi più bassi, anche la domanda. Domanda, risposte e svolgimento entrano nella descrizione accessibile della pagina.

## Energia e informazione

Dalla 1.54.0 il Rapporto offre una seconda serie di esercizi, «Energia e informazione», per «Termodinamica e rendimento» (physics-20) e per «Probabilità, informazione e fenomeni collettivi» (math-p07). I droni dello Sciame trasformano la materia in calcolo, e il calcolo ha un prezzo termodinamico: per il principio di Landauer cancellare un bit richiede almeno k · T · ln 2, dove k è la costante di Boltzmann e T la temperatura dell'ambiente in cui il calcolo avviene (`src/craft/esercizi-energia.js`).

Gli esercizi sono cinque e prendono le temperature dal modello fisico dei pianeti (`src/worlds/planet-physics.js`), nel sistema sul fronte del braccio più probabile. Il primo calcola il limite di Landauer alla temperatura di equilibrio di un pianeta di quel sistema, supponendo che una stazione nella sua orbita stia alla stessa temperatura; le domande usano k = 1,381 × 10⁻²³ J/K e ln 2 = 0,693, e le risposte sono in multipli di 10⁻²¹ J. Il secondo confronta il pianeta più caldo e il più freddo del sistema: con la stessa energia, il numero di bit cancellabili è inversamente proporzionale alla temperatura, e per questo il calcolo conviene al freddo. Il terzo chiede il rendimento massimo di una centrale a fusione, quella del sistema quando c'è, come macchina di Carnot fra una camera a 1000 K e radiatori alla temperatura di equilibrio della sua orbita. Il quarto calcola l'entropia di Shannon delle probabilità per braccio date dal Rapporto, in bit, da confrontare con i 2 bit di quattro bracci equiprobabili. Il quinto chiede l'informazione, o sorpresa, portata dall'ultima incursione, −log₂ p, con la probabilità che il Rapporto dava al braccio colpito, e compare dopo la prima incursione conclusa. I primi tre appartengono all'unità di termodinamica, gli ultimi due a quella di probabilità e informazione.

Le risposte sbagliate vengono da errori frequenti: l'energia termica k · T al posto del limite, la temperatura in gradi Celsius, il rapporto delle temperature rovesciato, il rapporto fra temperature al posto del rendimento, i logaritmi naturali o decimali al posto di quelli in base 2. Il Rapporto ha ora due pulsanti in fondo, «Esercizi di statistica» ed «Energia e informazione»; la scheda dell'unità di termodinamica sulla mappa porta direttamente alla seconda serie. Il resto della scheda funziona come per gli esercizi sul Rapporto.

## Crescita e replicazione

Dalla 1.55.0 il Rapporto offre una terza serie di esercizi, «Crescita e replicazione», per «Crescita delle popolazioni microbiche» (biology-21). Lo Sciame si comporta come una popolazione, e i suoi numeri del momento diventano esercizi sui modelli di crescita (`src/craft/esercizi-crescita.js`).

Gli esercizi sono cinque. Il primo immagina che l'ondata massima prevista nasca da un solo drone che si replica ogni 12 s, come una coltura in fase esponenziale, e chiede il tempo necessario: il numero di generazioni è il logaritmo in base 2 dei droni. Il secondo confronta la crescita lineare dell'ondata nel modello, 1,4 droni in più a ogni incursione, con una crescita del 10 % a incursione su dieci incursioni, a partire dall'ondata media del Rapporto. Il terzo applica il modello logistico ai droni liberati di un sistema, con la capacità di 40 per sistema e un tasso di 0,2 al minuto, e compare quando un sistema ha droni liberati sotto la capacità. Il quarto usa la chiave più recente: a ogni uso la sua forza diventa 0,85 volte quella di prima, come un antibiotico che perde effetto quando i batteri diventano resistenti, e la domanda chiede dopo quanti usi scende sotto 0,15. Il quinto chiede quante conversioni consecutive portano il peso più basso fra i bracci al massimo di 4, con una crescita del 35 % a conversione.

Le risposte sbagliate vengono da errori frequenti: una crescita di un drone alla volta al posto dei raddoppi, il 10 % applicato sempre alla partenza, il logaritmo naturale o decimale al posto di quello in base 2, il termine N / K al posto di 1 − N / K, la stima lineare al posto di quella esponenziale. Il Rapporto ha ora tre pulsanti in fondo, «Esercizi di statistica», «Energia e informazione» e «Crescita e replicazione»; la scheda dell'unità sulla crescita microbica porta alla terza serie. Sui telefoni più piccoli i titoli e le righe del Rapporto si accorciano per restare interi.

## Controlli

`tests/craft.test.mjs` verifica che i modelli siano 300, dieci per sistema con sei stazioni e quattro navi, che le miniere stiano solo nei sistemi con la fascia, che nomi e identificatori siano unici e scritti con l'atlante dei caratteri, che gli stili seguano la regola descritta sopra, che la generazione sia deterministica, che le mesh contengano solo valori finiti e indici validi entro i limiti di triangoli, e che due modelli dello stesso tipo e stile differiscano in almeno due scelte.

`tests/stations.test.mjs` verifica che ogni sistema abbia sei stazioni collocate in modo deterministico, la porta oltre la fascia, la miniera dentro la fascia, il porto attorno a un pianeta di studio e il cantiere accanto al porto, la raffineria attorno a un gigante quando il sistema ne ha uno; che le stazioni restino alla distanza prevista dall'ospite, fuori dal pianeta disegnato; e che la scena costruisca prima i modelli semplificati, uno per fotogramma quando manca il worker, poi il modello completo di una stazione vicina, disegni le navi e i bagliori a istanze, renda selezionabili stazioni e navi e liberi mesh e istanze al cambio di sistema.

`tests/life.test.mjs` verifica che ogni stazione e ogni nave abbiano regole valide; che in 1800 s di simulazione le scorte restino nei limiti, le prenotazioni non scendano sotto zero, ogni nave compia almeno tre viaggi e i carichi vengano consegnati; che lo stesso seme ripeta le stesse rotte e semi diversi ne diano di diverse; che nessuna nave passi vicino alla stella; e che i resoconti mostrati sullo schermo siano brevi, nello stile del sito e scritti con l'atlante dei caratteri.

`tests/economy.test.mjs` verifica che le merci siano 24 nelle cinque famiglie; che ogni ricetta usi merci note con capacità sufficienti e un processo con un nome breve; che ogni merce sia prodotta e usata da qualche stazione e che ogni variante dei ruoli compaia nel catalogo; che in ogni sistema, con le sole stazioni classiche e con tutte, la porta importi le merci scarse ed esporti quelle in eccesso e che ogni merce richiesta abbia una nave che la porta; e che in quattro sistemi, in 1200 s, tutte le navi viaggino, le stazioni lavorino a pieno ritmo più del 70 % del tempo e restino ferme per un ingrediente meno del 5 %, arrivino almeno 20 merci diverse e i resoconti restino brevi, nello stile del sito e scritti con l'atlante.

`tests/sciame.test.mjs` verifica che il fronte parta dai quattro sistemi di frontiera, colpisca soltanto la linea del fronte con ondate che crescono, avanzi e arretri entro quattro sistemi per braccio e si ripeta con lo stesso seme; che una conversione duri 300 s e sposti il fronte, che un'incursione respinta lo riporti indietro e che un esito non venga registrato due volte; che in un sistema i droni crescano alla roccia, la flotta li intercetti con al più sei navi, quelli che passano fermino la stazione e ne consumino le scorte e poi tornino polvere lasciando danni; e che nella scena l'incursione del sistema aperto si combatta dal vivo, i droni siano disegnati, l'incursione sia indicabile, il suo esito torni al fronte e la cronaca della frontiera arrivi nella cronaca del sistema.

`tests/crescita.test.mjs` ricalcola dalla domanda la risposta di ogni esercizio di crescita e replicazione in sei stati del fronte e tre semi, controlla che i numeri delle domande siano quelli del fronte (ondata, droni liberati, forza della chiave, peso più basso) e che la risposta compaia fra quattro risposte distinte e nello svolgimento; verifica che prima delle incursioni manchino gli esercizi sulla chiave e sui droni liberati, lo stile, e che la scheda si apra dal Rapporto e dall'unità biology-21 con domanda e svolgimento interi a 1280 × 900, 390 × 844 e 320 × 568.

`tests/energia.test.mjs` ricalcola dalla domanda la risposta di ogni esercizio di energia e informazione in sei stati del fronte e tre semi e verifica che compaia fra quattro risposte distinte e nello svolgimento; controlla che le temperature delle domande siano quelle di equilibrio dei pianeti del sistema sul fronte del braccio più probabile, che il pianeta più caldo e il più freddo siano davvero gli estremi e che la centrale nominata sia quella del sistema; verifica lo stile, e che la scheda si apra dal Rapporto e dall'unità di termodinamica e che domanda e svolgimento entrino interi a 1280 × 900, 390 × 844 e 320 × 568.

`tests/catene.test.mjs` verifica che le stazioni con esercizi siano le 178 ricette che trasformano almeno due merci, senza navi, difesa ed equipaggi, e che ogni sistema ne abbia; ricalcola in modo indipendente la risposta di ogni esercizio per un terzo delle stazioni e due semi, controlla che compaia fra quattro risposte distinte e nello svolgimento e che la merce limitante sia chiesta ogni volta che due merci hanno scorta; verifica che una stazione viva fornisca le sue scorte e le sue velocità e che, altrimenti, le scorte stiano fra il 15 % e il 75 % della capienza; e controlla lo stile di tutte le domande e la frase sulla sosta, diversa per le stazioni che si fermano e per quelle che rallentano.

`tests/esercizi.test.mjs` ricalcola in modo indipendente la risposta di ogni esercizio in sei stati del fronte e verifica che compaia fra le quattro risposte distinte e nello svolgimento; che la stessa richiesta dia gli stessi esercizi e che l'ordine delle risposte cambi fra un'apertura e l'altra; che senza incursioni concluse manchino gli esercizi sulla storia; che domande, risposte e svolgimenti rispettino lo stile del sito; che la scheda si apra dal Rapporto e dalle due unità e manchi nelle altre, che conti la prima risposta e che stia nei margini su schermo largo e su telefono; e che domanda e svolgimento entrino interi anche a 320 × 568.

`tests/catalogo.test.mjs` verifica che il catalogo contenga 997 modelli con identificativi e nomi unici, ordinati per sistema con le stazioni prima delle navi e la difesa in fondo, e che ogni sistema abbia stazioni, navi e difesa; che i filtri per gruppo e per sistema siano corretti e che lo scorrimento ricominci dopo l'ultimo modello; che ogni scheda riporti il sistema, il processo di una stazione, le merci di una nave civile o la forza di una nave di difesa, nello stile del sito e con le lettere dell'atlante; che l'indirizzo apra il modello nominato e scarti identificativi non validi; che il visore disegni prima il modello semplificato e poi quello completo, con luci, e liberi le mesh al cambio di modello; e che `docs/CATALOGO.md` corrisponda al codice.

`tests/rapporto.test.mjs` verifica che una conversione rafforzi il peso del braccio e una sconfitta lo indebolisca entro i limiti, che le incursioni seguano i pesi e che la cronaca annunci il braccio preferito; che i campioni diventino una chiave nel laboratorio previsto, che i corrieri la consegnino ai quattro fronti nei tempi previsti, che la chiave liberi la quota prevista e diventi obsoleta dopo otto usi, che i droni liberati restino entro il limite di 40 per sistema e che una chiave consumata permetta la successiva; che nel modello i droni liberati escano dall'ondata prima della battaglia; che le probabilità sommino a uno, che la chiave alzi la probabilità di respingere e che su quattro semi il punteggio di Brier resti sotto 0,2; che il Rapporto ordini i bracci per probabilità e sia scritto nello stile del sito; che i droni liberati riparino una stazione prima dell'arrivo delle parti e aumentino il minerale delle miniere; che in un'incursione dal vivo i droni liberati non colpiscano e restino nel sistema; e che la scena disegni i droni liberati, che il riquadro del fronte apra il Rapporto e che la scheda stia nei margini su schermo largo e su telefono.

`tests/minacce.test.mjs` verifica che la prima minaccia arrivi fra 80 e 140 s e le altre ogni 220-400 s, con lo stesso calendario per lo stesso seme, e che senza posizioni non ci siano minacce; che contro uno sciame la flotta parta subito con la sorveglianza, con al più quattro navi, e distrugga frammenti, mentre senza flotta lo sciame colpisce; che alla frontiera un asteroide sia distrutto da una nave dalla fregata in su e senza difesa danneggi la stazione e le sue scorte; che una stazione danneggiata lavori più piano, chieda le parti previste e torni intera quando arrivano; che un brillamento dimezzi il lavoro delle sole stazioni scoperte per 45 s; che in 1800 s la difesa distrugga più del 60 % dei frammenti e con rapporti e notizie nello stile del sito; e che la scena conosca il punto di intercettazione e renda indicabili le minacce.

`tests/difesa.test.mjs` verifica che le stazioni di difesa siano 84 e i modelli di nave 134, con le undici classi e le cinque stazioni, il numero previsto per ogni sistema e le superportaerei solo alla frontiera, nomi e identificatori unici, lo stile della flotta e lettere dell'atlante; che ogni classe e ogni stazione abbiano mesh valide, luci, triangoli entro i limiti e dimensioni che crescono dal caccia alla superportaerei, e che il livello semplificato conservi parti, raggio e ricetta; che la linea di difesa stia oltre la porta e l'anello esterno senza spostare le altre stazioni e lontano da stazioni e pianeti; e che in tre sistemi le navi di difesa viaggino senza merci, sostino alle stazioni di difesa e abbiano resoconti brevi, mentre le stazioni di difesa restano al primo livello e raramente a metà forza.

`tests/vita.test.mjs` verifica che in 1500 s le stazioni salgano di livello solo dopo un kit, mai oltre il terzo, con ritmi e magazzini cresciuti nella misura prevista e il livello nel resoconto, e che la porta non cresca; che le navi varate restino entro il limite della flotta, con nomi unici, partano da un cantiere a non meno di 120 s l'una dall'altra e trovino lavoro; che i convogli vengano dai sistemi vicini, seguano arrivo, scarico alla porta e partenza, abbiano resoconti brevi e che la porta non importi più in modo continuo; che la cronaca tenga al più 24 notizie in ordine di tempo, brevi, nello stile del sito, scritte con l'atlante e ripetibili con lo stesso seme; e che il traffico minore dia a ogni stazione una corsia senza doppioni.

`tests/shipclasses.test.mjs` verifica che le classi siano 120 con nomi unici e concordati; che i 40 moduli di bordo restino entro la presa in ogni stile e che sul lato destro gli ugelli guardino verso poppa; che ogni classe, nei cinque stili, abbia mesh valide, al massimo 10 000 triangoli, luci, un raggio fra 1,5 e 8 e un mestiere valido; che il livello semplificato resti sotto il 50 %; che le sagome si sovrappongano meno di 0,93 per ogni coppia e meno di 0,82 fra famiglie diverse; che il catalogo contenga tutte le 120 classi con nomi e coppie di classe e stile unici; e che in tre sistemi le navi aggiunte viaggino e trasportino merci.

`tests/added.test.mjs` verifica che le stazioni aggiunte siano 300, da 12 a 20 per sistema, con identificatori e nomi unici, tipi mai ripetuti in un sistema, coppie di tipo e stile mai ripetute, stile civile o della disciplina e ricette esistenti; che le sei stazioni classiche restino dove erano; che le aggiunte, campionate per 900 s, restino ad almeno 1,2 volte la somma dei raggi da ogni altra stazione e ad almeno 1,1 volte da ogni pianeta che non le ospita; e che in tre sistemi tutte le navi viaggino, le stazioni aggiunte ricevano merci e i resoconti restino brevi e scritti con l'atlante.

`tests/grammar.test.mjs` verifica che i tipi siano 120, uno per ruolo e famiglia, con nomi unici concordati e scritti con l'atlante dei caratteri; che i moduli siano almeno 60 e restino entro la presa in ogni stile; che ogni tipo, in ognuno dei cinque stili, abbia mesh valide, al massimo 30 000 triangoli, almeno una luce e un raggio fra 4 e 15; che lo stesso seme ripeta lo stesso modello e che il livello semplificato resti sotto il 40 % dei triangoli; e che le sagome dei tipi siano diverse, con i limiti descritti in «La grammatica dei tipi».

`tests/engine.test.mjs` verifica che il modello semplificato di ognuno dei 300 modelli abbia la stessa ricetta, le stesse parti e luci, meno del 70 % dei triangoli e un raggio entro il 3 % del completo; che il modello impacchettato conservi tutti i triangoli; che la scelta dei livelli rispetti soglie, ordine e bilanci; che la coda dei lavori metta prima i semplificati, consegni ogni modello una volta e scarti le risposte di un sistema già chiuso; che il worker trasferisca i buffer; che la base costruita nello shader coincida con `shipMatrix`; e che il pannello diagnostico calcoli frequenza e durata dei fotogrammi.

## Aggiornamenti

1. Generatore e catalogo (1.38.0).
2. Stazioni nei sistemi (1.39.0).
3. Vita dei sistemi: produzione delle stazioni e traffico delle navi (1.40.0).
4. Motore: livelli di dettaglio, costruzione in un worker, navi e bagliori a istanze, pagina diagnostica (1.41.0).
5. Grammatica dei tipi: 60 moduli, 12 famiglie, 10 ruoli, 120 tipi di stazione (1.42.0).
6. I nuovi tipi nei sistemi, da 12 a 20 stazioni ciascuno, con nuove ricette e più navi (1.43.0).
7. Navi civili: 40 moduli di bordo, 12 famiglie di scafo, 10 ruoli, 120 classi, da 4 a 8 modelli in più per sistema (1.44.0).
8. Economia delle catene: 24 merci, 31 ricette, porte che bilanciano i sistemi (1.45.0).
9. Stazioni che crescono, cantieri che varano navi, convogli fra i sistemi, cronaca del sistema, traffico minore (1.46.0).
10. Flotta di difesa: 11 classi dal caccia alla superportaerei, 5 stazioni di difesa, linea di difesa, pattuglie (1.47.0).
11. Nuovo disegno delle navi di difesa: scafi scuri, spigolosi e asimmetrici, punte di prua, lame, motori color ambra (1.47.1).
12. Minacce naturali: sciami di meteoroidi, asteroidi vaganti e brillamenti, intercettazione della flotta, danni e riparazioni (1.48.0).
13. Lo Sciame della Frontiera: fronte della galassia, incursioni, droni che crescono e tornano polvere, cronaca della frontiera (1.49.0).
14. Lo Sciame che impara, chiavi ricavate dai droni catturati, droni liberati che riparano e scavano, Rapporto con previsioni e punteggi (1.50.0).
15. Catalogo 3D dei 997 modelli, con elenco filtrabile, schede e indirizzo condivisibile, e catalogo generato in `docs/CATALOGO.md` (1.51.0).
16. Esercizi di probabilità e statistica sul Rapporto, con i numeri dello Sciame, per le unità math-c10 e math-p07 (1.52.0).
17. Esercizi di stechiometria e velocità sulle ricette delle stazioni del catalogo, per le unità chemistry-14 e chemistry-17 (1.53.0).
18. Esercizi di energia e informazione: limite di Landauer, rendimento di Carnot, entropia e sorpresa delle previsioni, per le unità physics-20 e math-p07 (1.54.0).
19. Esercizi di crescita e replicazione: raddoppi, crescita lineare ed esponenziale, modello logistico, resistenza alla chiave, crescita percentuale, per l'unità biology-21 (1.55.0).
