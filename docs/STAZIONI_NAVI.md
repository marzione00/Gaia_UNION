# Stazioni e navi dei sistemi

I trenta sistemi stellari ospitano 300 modelli tridimensionali: dieci per sistema, cioè sei stazioni e quattro navi. Il lavoro è arrivato in tre aggiornamenti: la 1.38.0 ha portato il generatore dei modelli e il loro catalogo, la 1.39.0 ha collocato le stazioni nei sistemi, la 1.40.0 dà vita ai sistemi, con stazioni che producono e navi che trasportano le merci. La 1.41.0 ha rinnovato il motore di disegno e la 1.42.0 aggiunge una grammatica dei tipi con 120 tipi di stazione, che entreranno nei sistemi con la 1.43.0.

## Come sono costruiti

Il sito non scarica geometrie. Ogni modello nasce dal codice in `src/craft/` a partire da un seme numerico:

- `kit.js` raccoglie le primitive (scatole a pannelli, cilindri e coni con giunture, tori, sfere, parabole, tralicci, scafi raccordati fra sezioni) e il generatore di numeri casuali `dice`, che annota ogni scelta strutturale;
- `parts.js` contiene i moduli comuni: pannelli solari, radiatori, hangar illuminati, antenne, serbatoi, bobine, tubazioni, fasce di pericolo, finestre e i poliedri convessi, le cui facce vengono ricavate dai vertici;
- `styles.js` definisce i cinque stili di costruzione;
- `stations.js` e `ships.js` contengono i dodici tipi classici di stazione e le dodici classi di nave;
- `modules.js`, `families.js` e `grammar.js` formano la grammatica dei 120 tipi di stazione della 1.42.0;
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

Dalla 1.40.0 ogni sistema aperto ha un'economia: le stazioni producono e consumano merci, le navi le portano dove mancano. Le merci sono sette: minerale, carburante, cibo, energia (in celle), dati, parti di nave ed equipaggi. Le quantità sono per secondo del tempo della scena, che scorre di un secondo al secondo (al massimo 0,08 s per fotogramma) e si ferma con il movimento ridotto.

| Stazione | Produce | Consuma | Chiede |
|---|---|---|---|
| Miniera | minerale, 1,6 t/s | | |
| Raffineria | carburante, 1,4 t/s | | |
| Serra | cibo, 1 t/s | | |
| Centrale | energia, 1,2 celle/s | | |
| Telescopio, radiotelescopio, stazione poliedrica | dati, 0,5, 0,6 e 0,4 TB/s | | |
| Laboratorio dei campi | dati, 0,45 TB/s | energia, 0,15 celle/s | energia |
| Cantiere | parti, 0,25 moduli/s | minerale 0,9 t/s, energia 0,3 celle/s | minerale ed energia |
| Deposito criogenico | | | carburante fino a 260 t; ne cede oltre 110 t |
| Porto | equipaggi, 0,25 persone/s | cibo 0,3 t/s, carburante 0,35 t/s, energia 0,15 celle/s | cibo, carburante ed energia |
| Porta | importa equipaggi, cibo, carburante, energia e minerale | dati 0,3 TB/s, parti 0,08 moduli/s | dati e parti |

Le stazioni diverse dal porto e dalla porta consumano anche 0,06 persone di equipaggio al secondo e ne chiedono 16. Laboratorio e cantiere si fermano quando manca un ingrediente; ogni stazione si ferma quando il suo magazzino è pieno. Le capacità e le altre soglie sono in `RECIPES`.

Ogni nave del catalogo viaggia con fino a due navi gemelle dello stesso modello (con il nome seguito da II e III); navette, navi cargo, cisterne e navi passeggeri ne possono avere due, le altre una. Un sistema ha quindi da 4 a 11 navi. Quando una nave è libera sceglie il trasporto migliore fra quelli che la sua classe può fare: la quantità divisa per la strada da percorrere, con un fattore casuale fra 0,7 e 1,3, e un carico minimo pari al 30 % della stiva. La merce viene prenotata alla partenza, così due navi non vanno a prendere lo stesso carico. Senza nulla da trasportare ogni classe ha il suo comportamento: le navi scientifiche, le esploratrici e le sonde osservano un pianeta e ne riportano dati, la nave di soccorso fa il giro delle stazioni, il posaboe va e viene dalla porta, la nave gru lavora al cantiere, navette e navi passeggeri si spostano fra le stazioni.

Le navi viaggiano su archi sollevati sopra il piano delle orbite di un ottavo della distanza, accelerano e frenano agli estremi e girano al largo della stella quando il percorso diretto le passerebbe a meno di 2,2 raggi stellari più un'unità. Le velocità vanno da 1,2 a 3,2 unità al secondo; un viaggio dura 2 s più la distanza divisa per la velocità, una sosta in stazione da 4 a 12 s secondo la classe, con una variazione casuale del 20 %.

Ogni avvio del sito sceglie un seme nuovo con `crypto.getRandomValues`, quindi scorte iniziali (dal 15 al 75 % della capacità), navi gemelle, posizioni di partenza e scelte dei viaggi cambiano da una visita all'altra. L'economia di un sistema gira mentre il sistema è aperto e conserva il suo stato per tutta la visita; quando si torna in un sistema dopo un'assenza, recupera al massimo due minuti.

Nella vista del sistema ogni nave è un punto nel colore del suo stile, con una scia breve mentre viaggia, e i rombi delle stazioni pulsano mentre producono. Il puntatore mostra lo stato in tempo reale: per una stazione che cosa produce e che cosa chiede, per una nave il carico, la destinazione e il tempo di arrivo. In orbita le navi vicine si vedono intere, con i motori accesi in volo; durante il carico e lo scarico quattro luci nel colore della merce passano fra la nave e la stazione, e le fiamme delle stazioni, come le torce delle raffinerie, si abbassano quando la produzione si ferma.

Una simulazione di 1200 s per ognuno dei 30 sistemi con tre semi diversi muove tutte le 590 navi coinvolte; le navi passano in viaggio dal 35 al 65 % del tempo, con mediana del 50 %, e nessuna arriva a meno di 2,73 raggi stellari dalla stella.

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

## Controlli

`tests/craft.test.mjs` verifica che i modelli siano 300, dieci per sistema con sei stazioni e quattro navi, che le miniere stiano solo nei sistemi con la fascia, che nomi e identificatori siano unici e scritti con l'atlante dei caratteri, che gli stili seguano la regola descritta sopra, che la generazione sia deterministica, che le mesh contengano solo valori finiti e indici validi entro i limiti di triangoli, e che due modelli dello stesso tipo e stile differiscano in almeno due scelte.

`tests/stations.test.mjs` verifica che ogni sistema abbia sei stazioni collocate in modo deterministico, la porta oltre la fascia, la miniera dentro la fascia, il porto attorno a un pianeta di studio e il cantiere accanto al porto, la raffineria attorno a un gigante quando il sistema ne ha uno; che le stazioni restino alla distanza prevista dall'ospite, fuori dal pianeta disegnato; e che la scena costruisca prima i modelli semplificati, uno per fotogramma quando manca il worker, poi il modello completo di una stazione vicina, disegni le navi e i bagliori a istanze, renda selezionabili stazioni e navi e liberi mesh e istanze al cambio di sistema.

`tests/life.test.mjs` verifica che ogni stazione e ogni nave abbiano regole valide; che in 1800 s di simulazione le scorte restino nei limiti, le prenotazioni non scendano sotto zero, ogni nave compia almeno tre viaggi e i carichi vengano consegnati; che lo stesso seme ripeta le stesse rotte e semi diversi ne diano di diverse; che nessuna nave passi vicino alla stella; e che i resoconti mostrati sullo schermo siano brevi, nello stile del sito e scritti con l'atlante dei caratteri.

`tests/grammar.test.mjs` verifica che i tipi siano 120, uno per ruolo e famiglia, con nomi unici concordati e scritti con l'atlante dei caratteri; che i moduli siano almeno 60 e restino entro la presa in ogni stile; che ogni tipo, in ognuno dei cinque stili, abbia mesh valide, al massimo 30 000 triangoli, almeno una luce e un raggio fra 4 e 15; che lo stesso seme ripeta lo stesso modello e che il livello semplificato resti sotto il 40 % dei triangoli; e che le sagome dei tipi siano diverse, con i limiti descritti in «La grammatica dei tipi».

`tests/engine.test.mjs` verifica che il modello semplificato di ognuno dei 300 modelli abbia la stessa ricetta, le stesse parti e luci, meno del 70 % dei triangoli e un raggio entro il 3 % del completo; che il modello impacchettato conservi tutti i triangoli; che la scelta dei livelli rispetti soglie, ordine e bilanci; che la coda dei lavori metta prima i semplificati, consegni ogni modello una volta e scarti le risposte di un sistema già chiuso; che il worker trasferisca i buffer; che la base costruita nello shader coincida con `shipMatrix`; e che il pannello diagnostico calcoli frequenza e durata dei fotogrammi.

## Aggiornamenti

1. Generatore e catalogo (1.38.0).
2. Stazioni nei sistemi (1.39.0).
3. Vita dei sistemi: produzione delle stazioni e traffico delle navi (1.40.0).
4. Motore: livelli di dettaglio, costruzione in un worker, navi e bagliori a istanze, pagina diagnostica (1.41.0).
5. Grammatica dei tipi: 60 moduli, 12 famiglie, 10 ruoli, 120 tipi di stazione (1.42.0).
6. I nuovi tipi nei sistemi, da 12 a 20 stazioni ciascuno (1.43.0, da fare).
