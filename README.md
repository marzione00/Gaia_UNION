# GAIA — Beyond Knowledge · 1.4.0

**Atlante scientifico integrato, con interfaccia e scene WebGL 2.** Deriva dalla preview GAIA approvata, recupera i contenuti didattici della V7 e il materiale grafico tracciato di GeoStatLab. L’ispirazione visiva è Civilization: Beyond Earth; non è un prodotto ufficiale né distribuisce asset di quel gioco.

## Archivi della consegna

Lo ZIP COMPLETO contiene l’applicazione pronta, tutte le texture di runtime 4K/8K, i sorgenti del codice, i modelli Blender, i crediti e le anteprime. Lo ZIP ORIGINALI_NASA contiene separatamente i file di provenienza ad alta risoluzione: usare la sottocartella `sources/nasa/` dell’archivio 1.3.0 già consegnato e copiarla nella cartella `sources/nasa/` di questa versione. Questo secondo archivio serve al rebuild degli asset e non è necessario per avviare l’app.

## Avvio

Estrai lo ZIP. Apri il terminale nella cartella contenente `package.json` e usa Node.js 22 o successivo:

```sh
npm start
```

Apri **http://localhost:8000**. Su Windows puoi avviare anche `AVVIA_WINDOWS.bat`. Non serve `npm install`, non serve una chiave API e il sito non richiede un backend esterno. Tutti i contenuti di runtime sono locali. Non aprire `index.html` con doppio clic: moduli e worker richiedono HTTP.

```sh
npm test
npm run check
npm run build
npm run test:http
node scripts/serve.mjs --dist
```

Il server di sviluppo ascolta soltanto su `127.0.0.1`. Per una porta differente imposta la variabile `PORT`. Nessun servizio viene pubblicato automaticamente.

## Che cosa è effettivamente incluso

| Ambito | Copertura |
|---|---|
| Galassia | 1.000.000 di punti 3D effettivi, 30 sistemi navigabili, 5–12 pianeti per sistema, da tre a sei esplorabili |
| Matematica | 25 unità del catalogo della dispensa; fonte integrale di 769 pagine consultabile in WebGL |
| Dispensa di fisica | «Fisica generale e moderna», bozza revisionata del 25 ottobre 2026: 726 pagine consultabili in WebGL; ogni unità di fisica rimanda alle sezioni corrispondenti |
| Mondi dei pianeti | Catalogo di 125 fenomeni, uno per pianeta, in `docs/MONDI.md`; quattro prototipi 3D in superficie: Daisyworld, laghi del cobalto, maree di una luna vicina, branco con la mappa logistica |
| Carte d’identità dei pianeti | 125 carte generate in `content/worlds/genomes.json` (terreno, mare, stella, atmosfera, gravità, colori, eventi), tabella in `docs/CARTE_IDENTITA.md`, controllo automatico della diversità |
| Teoria narrativa matematica | Quattro lezioni, 33 sezioni; Funzioni copre 8.1–8.11, le altre tre sono percorsi mirati |
| Gaia | Sei nuove sezioni trasversali con ipotesi, formule, protocollo e limiti |
| Verifiche | 40 quesiti interattivi originali di Funzioni, spiegazioni e alternative errate; gli altri quesiti rimangono nella fonte PDF |
| Laboratori | Daisyworld e sei laboratori matematici collegati ai motori precedenti |
| Fisica, chimica, biologia | 40 unità di fisica, 15 delle quali di astrofisica, 25 di chimica e 35 di biologia, orientate all'astrobiologia; ogni unità ha un percorso guidato e un capitolo del libro |

**“Piattaforma integrata” non significa cento corsi terminati.** Il catalogo dichiara la disponibilità reale di ogni unità. La matematica non ancora rielaborata sul web si apre nella fonte originale, non in una lezione generica sostitutiva.

## Ambienti 3D della versione 1.4.0

Nuovo ambiente cosmico: cinque regioni, quindici volumi 3D, ammassi, tre galassie lontane, otto fasce di asteroidi e tre comete. Nebulose e polveri mantengono posizione e identità da galassia a sistema e pianeta. Dettagli, provenienza e limiti in `docs/COSMIC_ENVIRONMENT.md`.

L'interfaccia conserva navigazione, pannelli, controlli e tipografia della versione dell'utente. Le scene sono interattive, renderizzate da geometrie e shader locali:

- Galassia a spirale con nucleo caldo, bracci freddi, polveri volumetriche e un milione di stelle 3D. Trenta stelle del medesimo buffer sono sistemi esplorabili: la descrizione compare al passaggio del mouse e un clic avvia lo zoom. I pianeti compaiono nella vista del sistema: da 5 a 12 per sistema, 253 in totale; in ogni sistema da tre a sei sono destinazioni esplorabili, una per unità. Le altre hanno una descrizione ma non aprono dossier o superfici.
- Undici famiglie ispirate a Haegemonia: terrestri, oceanici, desertici, craterizzati, glaciali, vulcanici, rocciosi, atmosfere acide e tre famiglie di giganti. I corpi di contorno usano mappe NASA esterne; dalla 1.20.0 le destinazioni esplorabili usano mappe generate dalle loro carte d’identità. Le nuvole usano una mappa NASA. Atmosfera e illuminazione rimangono calcoli 3D. Lune, anelli e sonda sono geometrie 3D.
- Simbiosi: architettura organica viola, flora aliena e nebbie verdi; Esodo: colonia terrazzata e ceramica chiara sul terreno ocra; Marea: distretti galleggianti, ponti e basalto.
- Dalla 1.18.0 ogni pianeta ha una superficie di atterraggio generata dalla sua carta d’identità: terreno, mare, luce, cielo, lune e quattro stazioni compatte. Le tre scene Blender (672.891 vertici e 796.060 triangoli in 13 mesh) restano nel repository come riferimento dell’esportazione; dalla 1.20.1 il sito non scarica più le loro geometrie (52,6 MB) e ne usa solo i metadati.
- Dalla 1.19.0 le superfici ospitano specie e luoghi generati dalle carte: con i 125 pianeti della 1.26.0 erano 391 specie, e dalla 1.63.0 sono 1388 (776 piante, 513 animali e 99 funghi, con nomi unici, una forma propria e un posto nella rete alimentare), con 501 luoghi d’interesse. Dalla 1.64.0 ogni pianeta ha una colonia umana adattata alla sua carta e 40 pianeti hanno il villaggio di un popolo nativo; dalla 1.66.0 le colonie sono avamposti sigillati, insediamenti simbiotici o città adattate, con edifici nel linguaggio delle stazioni e una pianta a raggiera (in tutto 6633 edifici e 4641 abitanti, guida in `docs/STILE_COLONIE.md`); dalla 1.65.0 gli animali si muovono in mandrie, branchi e stormi e sul sito di atterraggio si alternano il giorno e la notte. Il pulsante «Esplora il pianeta» sposta la camera da una specie o da un luogo all’altro; ogni scoperta si registra nella scheda «Esplorazione» del diario. I 18 pianeti senza atmosfera apprezzabile non hanno specie in superficie.
- Dalla 1.21.0 i pianeti diventano i capitoli di un libro: «Leggi il capitolo» apre sopra la galassia una pagina con testo, formule, figure ed esercizi risolti. Il primo capitolo, pilota, è «Forze e leggi di Newton». Formato e regole in `docs/LIBRO.md`.
- Dalla 1.22.0 il volume di fisica è completo: 25 capitoli, uno per pianeta, con il testo, i diagrammi e gli esercizi della dispensa di fisica del corso.
- Dalla 1.23.0 comincia il volume di chimica, con il capitolo pilota «Mole e quantità di sostanza», scritto per il sito.
- Dalla 1.24.0 il volume di chimica è completo: 25 capitoli scritti per il sito, dalla materia e dalla mole alla struttura quantistica dell'atomo, al legame, alla termochimica, alla cinetica, agli equilibri, all'elettrochimica, alla chimica organica e ai polimeri.
- Dalla 1.24.1 il catalogo «Argomenti», la scheda dell'unità sulla mappa e il pannello del sistema aprono direttamente il capitolo del libro, quando esiste; il percorso dell'unità resta nell'orbita del pianeta.
- Dalla 1.25.0 la biologia è dedicata all'astrobiologia: 35 unità in nove sistemi stellari, due dei quali nuovi, «Mondi del sistema solare» e «Cercare la vita nella galassia», ciascuna con un capitolo scritto per il sito e un percorso guidato scritto a mano. Il volume va dalle definizioni della vita alla chimica prebiotica, all'evoluzione, agli estremofili, alla zona abitabile, a Marte, Europa, Encelado e Titano, agli esopianeti, alle biofirme e alla ricerca di tecnofirme.
- Dalla 1.26.0 la fisica conta 40 unità: quindici nuove unità di astrofisica in tre sistemi stellari, «Luce e telescopi», «Campi e plasmi nello spazio» e «Dalla relatività al Big Bang», ciascuna con un capitolo scritto per il sito e un percorso guidato scritto a mano. I capitoli vanno dalle onde elettromagnetiche, dai telescopi e dalla luce delle stelle ai campi magnetici dei pianeti, alla radio e al magnetismo della materia, e poi alla relatività, agli atomi e alle righe spettrali, ai nuclei e alle datazioni, alla fusione nelle stelle, alle particelle elementari e al Big Bang.
- Dalla 1.27.0 ogni sistema ha un modello fisico: la stella prende temperatura, luminosità e massa di un sottotipo spettrale tabulato, ogni corpo ha un semiasse in unità astronomiche, e le orbite si dispongono dal pianeta più caldo al più freddo con spaziature stabili. Nella vista in orbita il pulsante «Dati fisici» mostra stella e orbita, geosfera, idrosfera, atmosfera e biosfera del pianeta, con la temperatura di equilibrio e quella superficiale. Modello, fonti e tabella dei 125 pianeti in `docs/FISICA_PIANETI.md`.
- Dalla 1.28.0 la mappa si scopre con lo studio. Le aree mai visitate compaiono come segnali, con il solo contorno dell’esagono; i 147 passaggi fra aree, ricavati dai rimandi fra capitoli e dai collegamenti dei percorsi guidati, compaiono come archi quando si legge la sezione che li contiene o si arriva ai collegamenti del percorso. Corsie dentro un braccio, porte di salto fra discipline diverse. Il diario elenca i passaggi aperti; regole e numeri in `docs/MAPPA_ESPLORAZIONE.md`.
- Dalla 1.29.0 lo studente esplora con una nave disarmata. Sette strumenti, dal radiometro infrarosso all’analizzatore di biofirme, salgono a bordo completando il percorso guidato della loro unità o leggendo tutto il suo capitolo; ognuno mostra alcune righe della scheda «Dati fisici», e il diario registra quali strumenti hanno misurato ogni pianeta. La modalità esploratore si può disattivare dalla schermata della nave per vedere tutti i dati. Dettagli in `docs/NAVE.md`.
- Dalla 1.30.0 la nave ha un Nucleo di Gaia (`#/gaia`) che applica la diagnosi di Lovelock: confronta lo squilibrio chimico delle atmosfere di Terra, Marte, Titano, Venere e Giove, descrive le cinque firme atmosferiche dei pianeti con le loro fonti e verifica il verdetto dell’atmosfera quando lo studente scende in superficie. Un ottavo strumento, il computer di bordo, calcola i bordi della zona abitabile. Dettagli in `docs/NUCLEO_GAIA.md`.
- Dalla 1.31.0 ogni pianeta offre tre spedizioni fatte degli esercizi del suo capitolo: in orbita quelli di base, in superficie gli intermedi, in profondità gli avanzati, 1928 in tutto. Lo studente segna come risolto un esercizio nel libro dopo averlo confrontato con la soluzione; per le unità di matematica la spedizione in orbita usa le domande del percorso guidato. Dettagli in `docs/SPEDIZIONI.md`.
- Dalla 1.32.0 ognuno dei 30 sistemi ha un avamposto di ricerca (`#/outpost`), che riunisce capitoli, laboratori dei percorsi, spedizioni, pianeti misurati e passaggi aperti dell'area. Si costruisce con la prima spedizione completata nell'area; prima di allora è un cantiere con lo stesso riepilogo. Dettagli in `docs/AVAMPOSTI.md`.
- Dalla 1.33.0 ogni braccio della galassia ha la sua nube e una scheda di regione (`#/region`) con i progressi della disciplina; il Nucleo di Gaia è una destinazione al centro della mappa, con tre mondi di sintesi da visitare: Venere, Marte e la Terra dell'Archeano. Dettagli in `docs/REGIONI.md`.
- Dalla 1.34.0 i percorsi guidati di chimica, dalla 1.35.0 quelli di matematica, dalla 1.36.0 quelli di fisica e dalla 1.37.0 quelli di biologia hanno tre livelli distinti in ogni tappa: Base spiega, Applica svolge esempi numerici, Approfondisci estende con dimostrazioni, limiti e storia. In matematica, in fisica e in biologia le spiegazioni sono più ampie e raccontano la storia dei concetti, degli esperimenti e delle scoperte. Regola di scrittura e controlli in `docs/LIVELLI.md`.
- Dalla 1.38.0 il codice genera 300 stazioni e navi, dieci per sistema, in cinque stili di costruzione: un porto, una porta di passaggio, quattro stazioni legate ai temi del sistema e quattro navi. Il catalogo è descritto in `docs/STAZIONI_NAVI.md`. Dalla 1.39.0 le sei stazioni di ogni sistema orbitano attorno ai pianeti adatti al loro compito e si vedono nella vista del sistema e in orbita; dalla 1.40.0 producono e consumano merci, e da 4 a 11 navi per sistema le trasportano su rotte che cambiano a ogni avvio. Dalla 1.41.0 stazioni e navi hanno un modello semplificato per la distanza, si costruiscono in un worker e le navi di una classe si disegnano a istanze; `?diagnostica` nell'indirizzo mostra i tempi dei fotogrammi. La 1.42.0 aggiunge una grammatica dei tipi: dodici famiglie di forme e dieci ruoli danno 120 tipi di stazione costruiti con 60 moduli. Dalla 1.43.0 ogni sistema ha da 12 a 20 stazioni e più navi; dalla 1.44.0 le navi civili hanno 120 classi; dalla 1.45.0 le merci sono 24, legate in catene di lavorazione come l'elettrolisi dell'acqua o la riduzione del minerale. Dalla 1.46.0 le stazioni crescono fino al terzo livello, i cantieri varano navi, convogli dai sistemi vicini portano le importazioni alla porta e una cronaca racconta gli eventi del sistema. Dalla 1.47.0 ogni sistema ha una flotta di difesa, da 3 a 8 classi fra le undici che vanno dal caccia alla superportaerei, e da 2 a 5 stazioni di difesa, più numerose verso la frontiera. Dalla 1.48.0 sciami di meteoroidi, asteroidi vaganti e brillamenti della stella minacciano le stazioni, e la flotta di difesa li intercetta. Dalla 1.49.0 lo Sciame della Frontiera attacca dai margini della galassia, e sulla mappa si vede il fronte avanzare e arretrare. Dalla 1.50.0 lo Sciame impara dove colpire, la difesa ricava dai droni catturati chiavi che liberano parte delle ondate, i droni liberati aiutano i sistemi e il Rapporto sulla mappa confronta le previsioni statistiche con gli esiti. Dalla 1.51.0 il catalogo 3D mostra da vicino tutti i 997 modelli, con una scheda per ciascuno; l'elenco completo è in `docs/CATALOGO.md`. Dalla 1.52.0 il Rapporto propone esercizi di probabilità e statistica con i numeri dello Sciame, collegati alle unità math-c10 e math-p07. Dalla 1.53.0 le ricette delle stazioni del catalogo diventano esercizi di stechiometria e velocità di reazione, collegati alle unità chemistry-14 e chemistry-17. Dalla 1.54.0 il Rapporto propone anche esercizi di energia e informazione, dal limite di Landauer all'entropia delle previsioni, collegati alle unità physics-20 e math-p07. Dalla 1.55.0 aggiunge esercizi di crescita delle popolazioni con i numeri dello Sciame, collegati all'unità biology-21. La guida per il docente su queste quattro serie è in `docs/GUIDA_DOCENTE.md`, con gli esempi in `docs/ESERCIZI_SISTEMI.md`. Dalla 1.57.0 ogni sistema ha un traffico di servizio in 3D, con navette, chiatte, rimorchiatori, minatori, cisterne, scorte e moduli di manutenzione, oltre cento mezzi per sistema in alta qualità. Dalla 1.58.0 ogni oggetto del sistema si segue da vicino con un clic, e un pannello di fianco spiega che cosa succede con i numeri del momento e un concetto delle unità. Dalla 1.59.0 le atmosfere dei pianeti si vedono, con il crepuscolo e le nubi della loro carta, e il pannello spiega effetto serra e colore del cielo. Dalla 1.60.0 ogni sistema ha cinture di asteroidi e di ghiaccio, comete con le code e sciami di meteore, e sui pianeti con aria cadono stelle cadenti. Dalla 1.61.0 la serie è descritta per la classe in `docs/GALASSIA_VIVA.md`, con la mappa dei concetti del pannello, e le sue prestazioni sono misurate in `docs/PRESTAZIONI.md`. Dalla 1.62.0 la superficie di ogni pianeta è il pezzo della sfera vista dall'orbita attorno al sito di atterraggio, con il terreno fino all'orizzonte.
- Dalla 1.20.0 i pianeti esplorabili hanno in orbita e nella vista del sistema una mappa generata dalla loro carta d’identità: stesso stile di terreno, stesso livello del mare e stessi colori della superficie. Nuvole e atmosfera seguono la copertura nuvolosa e la densità della carta. I corpi di contorno mantengono le mappe NASA.
- Ombre filtrate, riflessi planari delle strutture sull'acqua, increspature animate, materiali con metallo/rugosità/emissione. Antialiasing e bloom agiscono sulla scena prima dei pannelli.
- Transizioni della camera, pausa del movimento, selezione delle stazioni e collegamenti di ricerca evidenziati. La preferenza di movimento ridotto viene rispettata.

Funzioni parte da Simbiosi, Algebra da Marea, Radicali ed Equazioni da Esodo. Il bioma è illustrativo e non indica il contenuto scientifico o lo stato di completamento del corso.

Non vengono usate immagini generate da IA come ambienti o texture. Le vecchie mappe planetarie procedurali sono sostituite da mappe NASA, con originali e attribuzioni in `sources/nasa/`. I livelli di dettaglio sono riduzioni delle mappe esterne, senza pittura, ricolorazione o upscaling. I mondi immaginari usano analoghi del Sistema Solare, non osservazioni di esopianeti. Non vengono caricati screenshot dei render al posto delle scene. L'illuminazione WebGL è un'approssimazione in tempo reale: non è un render Cycles identico pixel per pixel.

## Percorso

`Atlante → Sistema stellare → Pianeta → Dossier → Teoria / fonte originale → Laboratorio / verifica → Diario`

Ogni superficie generata contiene quattro stazioni e 2601 celle logiche campionate sul terreno, usate dai fenomeni; la rete scientifica ha 16 nodi e 18 collegamenti concettuali. Non contiene indicatori fittizi di abitabilità o avanzamenti assegnati automaticamente. Le temperature e le frazioni del laboratorio vengono dal modello; il terreno è illustrativo e non viene spacciato per una simulazione spaziale di Daisyworld.

Il catalogo permette ricerca e filtro senza selezionare piccoli oggetti 3D. I link alle pagine sono riferiti al PDF integrale. La fonte originale conserva figure, impaginazione e numerazione.

## Controlli

Alla prima apertura una schermata propone tre ingressi: cerca un argomento, segui un percorso, esplora la galassia. Nella mappa ogni braccio della galassia è una disciplina (matematica, fisica, chimica, biologia) e ogni esagono è un’area tematica; dal centro verso l’esterno le aree seguono l’ordine di studio. I pulsanti in basso evidenziano un braccio. La scheda a destra elenca le unità dell’area: APRI L’UNITÀ apre la lezione, SISTEMA 3D porta ai pianeti, uno per unità, numerati in ordine di studio e disposti alla loro distanza fisica dalla stella. GUIDA mostra cinque passi direttamente sulla mappa. Trascina per ruotare la camera; usa rotellina o +/− per lo zoom.

Tab e Invio raggiungono anche le 25 aree e i pianeti, senza dover centrare punti piccoli. Frecce e Page Up/Down scorrono il lettore; rotellina e trascinamento funzionano anche sui documenti. Ctrl/Cmd+K apre la ricerca. Spazio sospende o riprende il movimento; la pausa rende immediati gli avvicinamenti.

**Il milione di stelle è fisso in tutte le viste cosmiche e durante gli zoom.** Alta, bilanciata e ridotta modificano risoluzione interna della scena e bloom, mantenendo la UI a piena risoluzione. Le vecchie preferenze da 250.000/60.000 vengono migrate; non riducono più le stelle. Il contatore proviene dalle chiamate di disegno effettive. I punti sono procedurali e non costituiscono un catalogo astronomico osservato; il numero sottoposto alla GPU non significa che ogni punto sia distinguibile o dentro il campo visivo.

## Diario e verifiche

Appunti, sezioni dichiarate studiate, risposte controllate e scenari sono salvati localmente quando il browser lo consente. Una sezione consultata non diventa automaticamente una competenza acquisita. Le verifiche separano corrette, errate e bianche; in modalità esame la correzione è disponibile dopo la consegna.

Esporta/importa il diario JSON per trasferire il lavoro: non esiste sincronizzazione cloud. È supportata l’importazione del registro V7 `schemaVersion: 1`, anche tramite il vecchio storage sulla stessa origine. Non viene eliminata la chiave originale. Il laboratorio esporta parametri e risultati; Daisyworld aggiunge una traccia CSV. A e B rappresentano configurazioni distinte: salvare A non la ricalcola quando modifichi B.

## Rendering e leggibilità

Tutti gli elementi visibili dell’applicazione normale sono composti sul canvas WebGL 2: scene, pannelli, pulsanti, grafici, tipografia. Il testo usa triangoli con atlanti di glifi; formule, documenti lunghi e pagine originali usano tessere tipografiche precalcolate con MathJax o PyMuPDF. **Non sono fotografie delle scene 3D e non sono immagini IA.** I caratteri non sono modellati uno per uno come solidi estrusi.

Il contenuto semantico e i controlli nativi sono mantenuti fuori schermo per tastiera e lettura assistita. La copia è disponibile tramite comando, non tramite selezione nativa del testo nel canvas. Le pagine lunghe scorrono in un solo lettore WebGL. Per mancanza/perdita di WebGL viene mostrato un messaggio HTML con accesso al PDF: non viene simulata una scena alternativa 2D. I dialoghi nativi del browser (download/importazione) non sono renderizzati dal sito.

## Sorgenti e riproducibilità

- `sources/v7/`: copie immutate di catalogo, lezioni, quiz e metadati originali.
- `content/`: contenuti correnti e adattamenti narrativi GAIA; identificativi e formule matematiche conservati.
- `materials/`: PDF integrale originale.
- `assets/reader/`, `assets/pdf/`: documenti precalcolati per il display GPU; indici con testo e rimandi.
- `assets/planets/manifest.json`: provenienza NASA, risoluzioni native, livelli GPU, mapping UV e SHA-256 di tutte le mappe.
- `sources/nasa/`: file esterni originali e metadati; `tools/prepare_planet_assets.py`: estrazione e ridimensionamento riproducibili.
- `src/models/`: motori scientifici separati dalla visualizzazione.
- `src/scene/`: stelle, shader procedurali, caricamento binario, camera, picking e worker.
- `assets/scenes/`: mesh native dei tre biomi, metadati e hash SHA-256.
- `models/`: sei scene Blender modificabili e generatori delle preview approvate.
- `tools/`: esportazione delle superfici e collaudo EGL riproducibile.
- `previews/`: catture effettive del renderer della versione 1.4.0.
- `src/ui/`: componenti GPU e cache delle texture.
- `tests/` e `docs/`: controlli riproducibili, attribuzioni e limiti.

Vedi [sistemi e texture NASA](docs/PLANET_SYSTEMS.md), [architettura](docs/ARCHITECTURE.md), [modello scientifico](docs/SCIENTIFIC_MODEL.md), [collaudo](docs/QA.md) e [provenienza](docs/CONTENT_PROVENANCE.json).

## Pubblicazione

Il workflow `.github/workflows/pages.yml` esegue test, controlli delle risorse, build e verifiche HTTP della cartella `dist/`. Per contenere il consumo di GitHub Actions le pull request non avviano il workflow. Gli stessi controlli si eseguono in locale prima di aprirle, come registrato in `docs/QA.md`, e «Run workflow» li avvia a mano su qualsiasi ramo, pubblicando solo da `main`. Ogni push su `main`, o un avvio manuale su `main`, pubblica la distribuzione e verifica via HTTPS i file essenziali del sito.

In **Settings → Pages → Build and deployment → Source** deve essere selezionato **GitHub Actions**; questa impostazione va attivata una sola volta per ogni nuovo repository. `configure-pages` viene eseguito nel job di deploy con i permessi Pages necessari. Non servono token personali o chiavi API. I deploy in corso non vengono interrotti da un nuovo push.

La build include anche `LICENSE`, `LICENSE.md`, `THIRD_PARTY_NOTICES.md`, le note dei caratteri e i metadati di provenienza delle texture.

## Licenza

Le parti originali di GAIA — Beyond Knowledge, di Marzio De Corato, sono distribuite con **Creative Commons Attribuzione-NonCommerciale 4.0 Internazionale (CC BY-NC 4.0)**: si possono condividere e adattare citando l'autore, per fini non commerciali. Vedi [ambito e attribuzione](LICENSE.md), [testo integrale](LICENSE) e [licenza ufficiale](https://creativecommons.org/licenses/by-nc/4.0/).

Il PDF, le lezioni e i quesiti preesistenti, le risorse NASA e gli altri materiali di terzi conservano le condizioni delle rispettive fonti: la CC BY-NC 4.0 del progetto non le sostituisce. I crediti sono in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Limiti da conoscere

La 1.20.1 supera i test Node, il controllo delle risorse, le verifiche HTTP della distribuzione, i flussi applicativi e le interazioni reali in Chromium con WebGL 2; i numeri sono in `docs/QA.md`. Il replay dei comandi del renderer su EGL / OpenGL ES 3.2 (305 fotogrammi senza errori GL, 51 catture) risale alla 1.4.0 ed è archiviato in `docs/history-v1.4.0/`.

Questo collaudo non sostituisce un test completo nel browser: browser, prestazioni su GPU fisiche e persistenza dopo la chiusura restano da verificare sul dispositivo destinatario. Non è stata eseguita una certificazione formale di accessibilità. Metodo, log e test browser riproducibile sono descritti in `docs/QA.md`.
