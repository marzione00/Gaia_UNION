# La serie «Mondi vivi»

La serie, dalla 1.62.0 alla 1.69.0, trasforma le superfici dei 125 pianeti in luoghi abitati da esplorare. Prima della serie il suolo era generato a parte rispetto alla mappa vista dall'orbita, ogni pianeta aveva da una a sei specie con la stessa forma per ciascun tipo e in superficie non c'erano insediamenti. Ogni versione ha affrontato un aspetto, con la propria descrizione e i propri test; questa pagina riassume la serie, elenca i concetti delle unità che si incontrano a terra e rimanda al collaudo e alle prestazioni misurate.

| Versione | Contenuto | Documentazione | Test |
|---|---|---|---|
| 1.62.0 | Terreno dalla sfera: il suolo del sito di atterraggio è il pezzo di pianeta della mappa d'orbita, con gli stessi mari, coste e colori, e anelli fino all'orizzonte | `docs/GRAPHICS.md`, «Terreno dalla sfera (1.62.0)» | `tests/terreno.test.mjs` |
| 1.63.0 | Vita: 1388 specie sui 107 pianeti abitati, ciascuna con un piano corporeo dalla carta, reti alimentari, individui in due livelli di dettaglio | `docs/GRAPHICS.md`, «Vita (1.63.0)» | `tests/specie.test.mjs` |
| 1.64.0 | Città e abitanti: una colonia su ogni pianeta, villaggi di popoli nativi su 40 pianeti, terreno spianato sotto strade e case | `docs/GRAPHICS.md`, «Città e abitanti (1.64.0)» | `tests/citta.test.mjs` |
| 1.65.0 | Ecosistemi, giorno e notte: mandrie, predatori, stormi e colonie alla deriva in simulazione; il sole del sito; il pannello «Che cosa succede» a terra | `docs/GRAPHICS.md`, «Ecosistemi, giorno e notte (1.65.0)» | `tests/ecosistemi.test.mjs` |
| 1.66.0 | Stile delle colonie: avamposti sigillati, insediamenti simbiotici e città adattate, con edifici nel linguaggio delle stazioni e pianta a raggiera | `docs/STILE_COLONIE.md` e `docs/GRAPHICS.md`, «Stile delle colonie (1.66.0)» | `tests/stile.test.mjs` |
| 1.67.0 | Natura e popoli nativi: specie, nativi e villaggi modellati come superfici lisce | `docs/GRAPHICS.md`, «Natura e popoli nativi (1.67.0)» | `tests/natura.test.mjs` |
| 1.68.0 | Esplorazione da videogioco: esploratore in terza persona, rover, joystick, salto con la gravità del pianeta, scanner | `docs/GRAPHICS.md`, «Esplorazione da videogioco (1.68.0)» | `tests/esploratore.test.mjs` |
| 1.69.0 | Catalogo dei 2868 modelli dei mondi nel catalogo 3D, questa pagina, il collaudo della serie e le prestazioni misurate | `docs/CATALOGO_MONDI.md`, `docs/PRESTAZIONI_MONDI.md` | `tests/mondi.test.mjs` |

## Che cosa contiene un pianeta

Ogni pianeta ha un sito di atterraggio con quattro stazioni, i luoghi d'interesse della sua carta (501 in tutto, da due a cinque per pianeta) e una colonia umana. Le colonie sono 46 avamposti sigillati dove l'aria è troppo sottile, 41 insediamenti simbiotici dove la biosfera è ricca e l'aria densa, 38 città adattate sugli altri pianeti: in tutto 6633 edifici e 4641 coloni che camminano per le strade. Sui 40 pianeti con mare, aria densa e almeno 15 specie c'è anche un villaggio di un popolo nativo, con 910 edifici e 1775 abitanti nell'insieme dei villaggi.

I 107 pianeti con un'atmosfera apprezzabile ospitano 1388 specie, con 158 097 individui sui siti di atterraggio. I 4923 animali dei 94 pianeti che ne hanno formano 408 mandrie, 118 branchi di predatori, 18 gruppi di rapaci, 129 stormi e 103 colonie galleggianti, che la simulazione muove con il giorno e la notte del sito. I 18 pianeti senza atmosfera apprezzabile hanno la colonia e nessuna specie.

## Esplorare

Il pulsante «Esplora il pianeta» mette a terra un esploratore nella tenuta della colonia, seguito da una camera in terza persona. Cammina, corre, salta con la gravità della carta e guida un rover a sei ruote nello stile della colonia; sui telefoni si muove con un joystick. Lo scanner registra nel diario la specie o il luogo più vicino, i pulsanti della scheda portano a ogni voce con un viaggio rapido e il pulsante «3D» apre il modello della specie o dell'insediamento nel catalogo. Il diario del pianeta conserva le specie e i luoghi registrati, i metri percorsi a piedi e in rover e il salto più alto.

## Mappa dei concetti

A terra il pannello «Che cosa succede» si apre con i pulsanti «Segui» di un animale, «Sole» e «Fisica» dell'esploratore. Ogni situazione porta al concetto di un'unità del catalogo, scritto con i numeri del momento.

| Oggetto | Situazione | Unità | Relazione |
|---|---|---|---|
| Mandria | Gli animali alternano il pascolo e la vigilanza | math-c10, «Combinatoria, probabilità e statistica» | Probabilità che almeno uno vigili, 1 − (1 − p)^N |
| Predatore | Si avvicina di soppiatto e scatta verso la mandria | physics-03, «Moto rettilineo uniforme» | Tempo dell'inseguimento, t = d / (v₁ − v₂), confrontato con la durata dello scatto |
| Stormo | Gli uccelli seguono le regole di Reynolds | math-p07, «Probabilità, informazione e fenomeni collettivi» | Allineamento, lunghezza della media dei versori delle velocità |
| Colonia galleggiante | Va alla deriva con il vento | physics-02, «Vettori e sistemi di riferimento» | Modulo della velocità dalle componenti est e nord |
| Sole del sito | Sorge, attraversa il cielo e tramonta | biology-20, «Fotosintesi e luce di altre stelle» | Luce sul suolo, sin h, rispetto al sole allo zenit |
| Esploratore | Salta con la gravità del pianeta | physics-04, «Moto uniformemente accelerato» | Altezza h = v² / (2a) e tempo di volo 2v / a, con a = g · 9,81 m/s² |

Il diario della colonia spiega con la fisica la forma degli edifici: la parete di una sfera sotto pressione sopporta metà della tensione di quella di un cilindro dello stesso raggio, la regolite scherma la radiazione, i regolatori di albedo seguono il modello Daisyworld di Watson e Lovelock, il peso che una struttura alta deve reggere cresce con l'altezza e con la gravità, la potenza del vento cresce con la densità dell'aria e con il cubo della velocità. Il diario delle specie lega il colore delle foglie al tipo della stella, dopo Kiang e colleghi (2007), e l'altezza delle piante alla gravità.

## Il catalogo dei modelli

Il catalogo 3D, che si apre dalla schermata di ogni sistema o dal pulsante «3D» dell'esplorazione, ha due famiglie: «Spazio», con i 997 modelli delle stazioni e delle navi, e «Mondi», con i 2868 modelli delle superfici, in tutto 3865. I modelli dei mondi sono 1388 specie, 1201 edifici delle colonie, 200 edifici dei villaggi, 40 popoli nativi, 36 coloni e 3 rover; si scelgono per sistema o in tutta la galassia, con i gruppi «Specie», «Edifici» e «Abitanti e rover». Ogni modello si costruisce con le stesse funzioni delle superfici, prima nella versione semplificata e poi in quella dettagliata; animali e abitanti camminano sul posto, gli uccelli battono le ali. La scheda riporta il pianeta, le misure in metri e una descrizione. L'elenco completo è in `docs/CATALOGO_MONDI.md`.

Quali tipi di edificio ha costruito una colonia o un villaggio, il corpo dei nativi e i nomi dipendono dal terreno del sito; il sito li legge da un indice di 27 kB, `content/worlds/modelli.json`, scritto da `node scripts/catalogo-mondi.mjs` a partire dalle superfici costruite, così il catalogo non deve costruire 125 superfici.

## Collaudo della serie

I test della serie sono 40, in otto file elencati nella tabella delle versioni. `tests/mondi.test.mjs` ricostruisce le superfici dei 125 pianeti e controlla che l'indice e `docs/CATALOGO_MONDI.md` corrispondano al codice, che ognuno dei 2868 modelli si costruisca nei due livelli di dettaglio con meno triangoli nel secondo, che ogni modello abbia un indirizzo valido del catalogo, che i documenti della serie rimandino a unità esistenti e che le misure rispettino i limiti. Il collaudo di ogni versione, con i test, i controlli delle risorse, la distribuzione servita via HTTP, i flussi applicativi, l'atlante in Chromium e le immagini delle superfici, è in `docs/QA.md`.

## Prestazioni

`docs/PRESTAZIONI_MONDI.md` riporta le misure sui 125 pianeti, generate da `node scripts/prestazioni-mondi.mjs` con il contatore delle chiamate di disegno di `scripts/prestazioni.mjs`. Con il dettaglio alto un fotogramma di superficie richiede al più 97 chiamate di disegno e 1,13 milioni di triangoli, con l'esploratore in corsa; con la grafica leggera al più 0,61 milioni di triangoli. Maglie e istanze di una superficie occupano da 16,9 a 21,9 MiB; i tempi di costruzione e di preparazione dei fotogrammi sono nelle tabelle del documento.

## Limiti

- I tempi sono misurati con Node e con un contatore al posto della scheda grafica; le immagini in Chromium usano SwiftShader, un renderer software. Nessuna prova su GPU fisiche, Safari o telefoni reali.
- Le specie, gli edifici e gli abitanti sono modelli procedurali illustrativi ricavati dalle carte d'identità; nessuno ricostruisce un organismo o un progetto reale.
- L'ecosistema e il giorno del sito sono modelli semplificati: il sole resta sull'equatore celeste, come agli equinozi, e le cacce seguono regole fisse.
