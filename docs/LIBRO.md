# Il libro della galassia

Dalla 1.21.0 ogni pianeta può avere un capitolo di libro: una pagina HTML che si apre sopra la scena 3D, con testo, formule, figure ed esercizi. Il primo capitolo, pilota, è «Forze e leggi di Newton» (`physics-06`). Dalla 1.22.0 tutte le 25 unità di fisica hanno un capitolo: le altre 24 riprendono testo, formule, diagrammi ed esercizi della dispensa di fisica del corso, con un'apertura scritta per il pianeta e, dove la dispensa dedica poche pagine all'argomento, sezioni aggiunte per il sito.

## File

- `content/libro/index.json`: elenco dei capitoli scritti, con unità, file, titolo, volume e stato. Un'unità senza voce mostra in orbita i pulsanti di sempre; un rimando a un capitolo non ancora scritto porta la camera sul pianeta.
- `content/libro/<unità>.md`: il capitolo, nel formato descritto sotto.
- `src/book/markdown.js`: lettura del formato e produzione dell'HTML. Tutto il testo viene escapato prima della formattazione; le formule sono lasciate a MathJax.
- `src/book/figures.js`: figure SVG generate da una descrizione JSON.
- `content/libro/fig/<unità>-<nn>.svg`: diagrammi della dispensa, compilati da TikZ e ricolorati per il tema scuro (in stampa tornano ai colori originali). Si caricano quando si avvicinano allo schermo.
- `tools/libro/`: conversione della dispensa (vedi sotto).
- `tools/qa_libro_browser.py`: apre ogni capitolo in Chromium, attende MathJax e carica tutte le figure; segnala formule con errori, figure mancanti e simboli `$` rimasti nel testo.
- `src/book/reader.js` e `src/book/reader.css`: livello di lettura, indice, avanzamento, stampa. MathJax (`vendor/mathjax`, versione 3.2.2) si carica alla prima apertura di un capitolo.

Indirizzo di un capitolo: `#/libro?unit=physics-06`, con `&sezione=<id>` per aprirlo a una sezione.

## Formato del capitolo

```
---
unit: physics-06
titolo: Forze e leggi di Newton
sottotitolo: Dalla descrizione del moto alle sue cause
volume: Volume di fisica
fonte: Dispensa di fisica, sezioni 2.1-2.6
---
## Titolo della sezione {#id}
### Sottosezione {#id}
Paragrafo con $F=ma$, **grassetto**, *corsivo*, [rimando a un capitolo](unit:physics-07#id) o [a una sezione](#id).

$$
\sum\vect F=m\vect a
$$

::: legge Seconda legge della dinamica
...
:::
```

Blocchi disponibili: `definizione`, `legge`, `esempio`, `errore`, `storia`, `metodo`, `quotidiano`, `nota`, `approfondimento` (si apre a richiesta), `sintesi`, `obiettivi`, `esercizio`, `figura`.

Un esercizio indica il livello fra parentesi quadre e separa la soluzione con una riga `>>> soluzione`:

```
::: esercizio Forze allineate [base]
Testo dell'esercizio.
>>> soluzione
Soluzione spiegata.
:::
```

Un diagramma salvato come file SVG accanto al capitolo si inserisce con una riga, anche dentro un blocco; la didascalia può mancare e le dimensioni naturali, facoltative, riservano lo spazio della figura prima che venga caricata:

```
![Didascalia con $F=ma$](fig/physics-07-03.svg "320x200")
```

Una figura disegnata nel capitolo contiene una descrizione JSON, una riga `---` e la didascalia. Elementi: `line`, `arrow` (con etichetta, pedice e posizione), `rect`, `circle`, `poly`, `text`, `spring`, `ground`, `arc` (angolo con etichetta), `axes` e `plot` (coordinate dei dati con origine e scale). Colori: `ax`, `muted`, `force`, `force2`, `force3`, `force4`, `body`, `accent`.

Macro delle formule: `\vect{F}` (vettore in grassetto, come nella dispensa), `\vers{u}` (versore), `\dd` (differenziale), `\un{N}` (unità di misura), `\ket{}`, `\bra{}`, `\braket{}{}`, `\oiint`. Nei numeri decimali si scrive `9{,}81`.

## Regole per ogni capitolo

1. Seguire la sezione corrispondente della dispensa del corso (matematica e fisica) per struttura e notazione, scrivendo un testo nuovo per la pagina web.
2. Verificare ogni dato numerico su una fonte di riferimento e citarla nella sezione finale; ricalcolare ogni risultato degli esempi e degli esercizi.
3. Struttura minima: apertura con il fenomeno del pianeta e gli obiettivi, teoria con leggi e definizioni, esempi svolti, figure, errori tipici, limiti del modello, sintesi, esercizi ai tre livelli con soluzione, glossario e fonti.
4. Stile: prosa accademica in italiano, senza lineette lunghe e senza costruzioni contrapposte del tipo «non solo» o «non… ma».
5. I test (`tests/book.test.mjs`) controllano formato, rimandi, formule bilanciate, soluzioni presenti, stile e alcuni risultati numerici.

## Capitolo pilota

«Forze e leggi di Newton» copre le sezioni 2.1-2.6 della dispensa di fisica, con esclusione di attrito e resistenza del mezzo, che appartengono al capitolo «Attrito e vincoli». Contiene 16 sezioni, 9 figure, 20 esercizi (6 di base, 8 intermedi, 6 avanzati) e circa 8.000 parole.

## Capitoli tratti dalla dispensa

I capitoli delle unità `physics-01`…`physics-25`, escluso il pilota, sono generati dalla dispensa di fisica in LaTeX con

```
python3 tools/libro/tex2libro.py --dispensa <cartella della dispensa>
```

La dispensa non fa parte del repository: i capitoli e le figure generati sono salvati in `content/libro/`, e lo script documenta come sono stati ottenuti. Servono `pdflatex` con i pacchetti della dispensa e `pdftocairo`. Con `--no-figure` lo script rigenera soltanto il testo; va usato solo se la numerazione delle figure non cambia.

- `tools/libro/mappa.json` assegna a ogni unità le sezioni della dispensa (anche singole sottosezioni, come `2.7.2`), smista per titolo casi di studio, attività, esempi ed esercizi delle sezioni di raccolta (`aggregati`, `spostamenti`), collega i rimandi «Capitolo N» della dispensa al capitolo della galassia corrispondente e può rinominare una sezione (`titoli`).
- `tools/libro/aperture.md` contiene il paragrafo «Prima di cominciare» di ogni capitolo, scritto per il pianeta dell'unità.
- `tools/libro/integrazioni.md` contiene le sezioni scritte per il sito, con identificatori che iniziano con `g-`: fluidi e pressione, galleggiamento, momenti e leve, rotazione, potenziale elettrico, circuiti.

La conversione mantiene il testo della dispensa e cambia soltanto la forma: riquadri della dispensa nei blocchi del formato, `\SI{}{}` in numeri con la virgola e `\un{}`, citazioni numerate con l'elenco delle opere nella sezione «Fonti», voci del glossario della dispensa nel capitolo in cui il termine compare per la prima volta, esercizi raccolti in fondo con la soluzione e un livello assegnato dividendo in tre fasce gli esercizi del capitolo secondo l'ampiezza della soluzione. Le note per il docente non sono riportate.

I test controllano per ogni capitolo generato: formato, apertura, esercizi e fonti; soluzioni presenti e livelli diversi; rimandi validi; formule bilanciate; assenza di comandi LaTeX fuori dalle formule; figure SVG ben formate, con identificatori unici sulla pagina e tutte usate; regole di stile sul testo scritto per il sito; risultati numerici delle sezioni aggiunte, ricalcolati.

## Unità di astrofisica del volume di fisica

Dalla 1.26.0 il volume di fisica conta 40 capitoli. Ai 25 capitoli tratti dalla dispensa si aggiungono quindici unità orientate all'astrofisica, in tre nuovi sistemi stellari: «Luce e telescopi» (unità 26-30), «Campi e plasmi nello spazio» (31-35) e «Dalla relatività al Big Bang» (36-40). I capitoli sono scritti per il sito. Il manuale di D. Halliday, R. Resnick e J. Walker, *Fundamentals of Physics* (12ª edizione estesa, Wiley, 2022), è protetto da diritto d'autore e serve soltanto per la scelta e l'ordine degli argomenti: testi, figure, tabelle, esempi ed esercizi sono originali, e ogni capitolo cita nella sezione «Fonti» i moduli consultati. I dati vengono da articoli originali, dai risultati delle missioni spaziali e dei grandi esperimenti e da raccolte di riferimento come CODATA, NIST Atomic Spectra Database, AME2020 e NUBASE2020, Particle Data Group e i parametri cosmologici di Planck, aggiornati al 2026.

I quindici capitoli contano circa 87.000 parole, 90 figure e 240 esercizi risolti. Ogni capitolo ha almeno 5000 parole, dodici sezioni, sei figure e sedici esercizi, con almeno sei esercizi di base, sei di livello medio e quattro avanzati, e comprende un'esperienza da svolgere a casa o in classe, errori frequenti, sintesi, glossario e fonti. Le figure sono disegnate nel capitolo da una descrizione JSON (`src/book/figures.js`).

| unità | capitolo | Halliday, Resnick, Walker, moduli |
|---|---|---|
| 26 | Onde elettromagnetiche e pressione della luce | 33.1-33.4 |
| 27 | Specchi, lenti e telescopi | 33.5-33.7, 34.1-34.5 |
| 28 | Interferenza e interferometri | 35.1-35.5 |
| 29 | Diffrazione e potere risolutivo | 36.1-36.7 |
| 30 | Radiazione termica e luce delle stelle | 18.6, 38.1, 38.4 |
| 31 | Legge di Gauss: gusci, pianeti e condensatori | 13.4, 23.1-23.6, 25.1-25.5 |
| 32 | Particelle cariche nei campi magnetici | 28.1-28.5 |
| 33 | Correnti, dipoli e dinamo dei pianeti | 28.7-28.8, 29.1-29.5 |
| 34 | Induzione, circuiti oscillanti e radio | 30.1-30.9, 31.1-31.5 |
| 35 | Equazioni di Maxwell e magnetismo della materia | 32.1-32.8 |
| 36 | Relatività ristretta | 37.1-37.6 |
| 37 | Onde di materia, atomi e righe spettrali | 38.5-38.7, 39.1-39.5, 40.1-40.7 |
| 38 | Nuclei, decadimenti e datazioni | 42.1-42.8 |
| 39 | Energia dal nucleo: fusione nelle stelle | 38.9, 43.1-43.6 |
| 40 | Particelle, espansione e Big Bang | 44.1-44.4 |

I test del volume, in `tests/fisica.test.mjs`, controllano che i quindici capitoli esistano e siano completi, con formato, lunghezza minima, sezioni, figure, esercizi e livelli, rimandi, formule bilanciate e regole di stile; un test per capitolo ricalcola i numeri del testo e delle soluzioni degli esercizi e i valori del laboratorio citati nel percorso guidato.

## Volume di chimica

Il volume di chimica non dispone di una dispensa del corso: i capitoli sono scritti per il sito. Il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications* (11ª edizione, Pearson Canada, 2017), è protetto da diritto d'autore e serve soltanto come riferimento per la scelta e l'ordine degli argomenti e per controllare definizioni e risultati. Dal manuale non si riprendono testi, figure, tabelle, esempi o esercizi, neppure tradotti; i capitoli lo citano nella sezione «Fonti» con i paragrafi consultati. Costanti e pesi atomici si prendono dalle fonti primarie: BIPM per le definizioni del SI, CODATA per le costanti misurate, CIAAW per i pesi atomici standard.

Dalla 1.24.0 il volume è completo: 25 capitoli, uno per unità, per circa 149.000 parole, 163 figure e 409 esercizi risolti. Ogni capitolo si apre con lo scenario del pianeta, dichiara gli obiettivi, conta almeno dodici sezioni, cinque figure e quindici esercizi divisi in tre livelli con almeno quattro esercizi per livello, e si chiude con errori frequenti, sintesi, glossario e fonti. I capitoli sulla struttura dell'atomo («Livelli atomici e spettri», «Periodicità e carica efficace») e sulla termochimica («Termochimica e calorimetria») sono più estesi, con la meccanica quantistica dell'atomo di idrogeno e degli atomi a molti elettroni, l'entropia e l'energia di Gibbs.

| unità | capitolo | paragrafi di riferimento |
|---|---|---|
| 01 | Materia, proprietà e densità | 1-1–1-7 |
| 02 | Atomi, isotopi e massa media | 2-1–2-6 |
| 03 | Mole e quantità di sostanza | 2-7, 2-8, 3-2, 3-3 |
| 04 | Livelli atomici e spettri | 8-1–8-8 |
| 05 | Periodicità e carica efficace | 8-9–8-11, 9-1–9-6, 10-3 |
| 06 | Legame ionico e interazioni elettrostatiche | 3-1, 3-5, 9-2, 10-1, 12-6, 12-7 |
| 07 | Legame covalente ed energia di legame | 10-2–10-6, 10-8, 10-9, 11-2, 11-5 |
| 08 | Geometria molecolare e VSEPR | 10-7, 11-1, 11-3, 11-4 |
| 09 | Forze intermolecolari | 12-1, 12-2, 14-3 |
| 10 | Gas e stato aeriforme | 6-1–6-9 |
| 11 | Stati della materia e transizioni | 12-2–12-5 |
| 12 | Soluzioni e concentrazione | 4-3, 14-1–14-5 |
| 13 | Solubilità ed equilibrio eterogeneo | 18-1–18-7 |
| 14 | Stechiometria e reagente limitante | 4-1–4-4, 4-6 |
| 15 | Resa e bilanci di materia | 4-5 |
| 16 | Termochimica e calorimetria | 7-1–7-10, 13-1–13-4 |
| 17 | Velocità di reazione | 20-1–20-8 |
| 18 | Temperatura e attivazione | 20-8–20-11 |
| 19 | Equilibrio chimico | 15-1–15-5, 15-7, 13-5 |
| 20 | Perturbazioni dell'equilibrio | 15-6, 13-6, 13-7 |
| 21 | Acidi, basi e pH | 16-1–16-6, 16-8, 16-10, 16-11, 17-3 |
| 22 | Soluzioni tampone | 17-1, 17-2, 17-4 |
| 23 | Ossidazione, riduzione ed elettrochimica | 5-4–5-6, 19-1–19-8 |
| 24 | Chimica organica e scheletri carboniosi | 26-1–26-8 |
| 25 | Polimeri e materiali | 27-8, 26-7 |

I dati numerici vengono dalle tabelle dell'appendice D del manuale, che sono dati e non testo protetto, o da fonti primarie: CODATA 2022, CIAAW, tabelle NBS e NIST-JANAF, IAPWS, CRC Handbook, rapporti di enti pubblici come USGS, NOAA, OCSE e Agenzia internazionale dell'energia. Quando un valore è stimato, per esempio con entalpia ed entropia supposte costanti, il testo lo dice. Le figure sono disegnate in JSON con il formato del lettore, controllate in anteprima sul tema scuro e prive di sovrapposizioni.

Vincoli per il telefono: le formule in linea non superano circa trentatré caratteri visibili, le equazioni lunghe vanno in formule a sé con `aligned`, le tabelle hanno al massimo quattro colonne e non scorrono di lato a 390 pixel di larghezza; quando una tabella non ci sta diventa un elenco.

I test del volume, in `tests/chimica.test.mjs`, controllano per ogni capitolo formato, lunghezza minima, sezioni, figure, esercizi e livelli, rimandi, formule bilanciate e regole di stile; un test per capitolo ricalcola i numeri del testo, degli esempi e delle soluzioni degli esercizi.

## Volume di biologia

Il volume di biologia accompagna il programma di astrobiologia della 1.25.0: 35 unità in nove sistemi stellari, dalle definizioni della vita e dalle molecole dello spazio alla chimica prebiotica, all'informazione e all'evoluzione, alla vita negli ambienti estremi, all'abitabilità dei pianeti, ai mondi del sistema solare e alla ricerca di biofirme e di tecnofirme nella Galassia. I capitoli sono scritti per il sito. Due testi protetti da diritto d'autore servono soltanto per la scelta e l'ordine degli argomenti: A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology* (Wiley, 2006), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works* (2ª edizione, Macmillan, 2016). Dai due libri si ricavano soltanto gli argomenti: testi, figure, tabelle, esempi ed esercizi sono originali, e ogni capitolo li cita nella sezione «Fonti» con i paragrafi consultati. I dati vengono da articoli originali, dai risultati delle missioni spaziali e dei telescopi, da cataloghi come il NASA Exoplanet Archive e da rapporti di enti come WMO e IPCC, aggiornati al 2026. Il libro di Shaw è del 2006: le affermazioni superate o errate sono corrette nel testo e segnalate nelle «Fonti» di ciascun capitolo.

Il volume conta 35 capitoli, uno per unità, per circa 223.000 parole, 219 figure e 569 esercizi risolti. Ogni capitolo ha almeno 5000 parole, dodici sezioni, sei figure e sedici esercizi, con almeno sei esercizi di base, sei di livello medio e quattro avanzati, e comprende un'esperienza da svolgere a casa o in classe, errori frequenti, sintesi, glossario e fonti. Le figure sono disegnate nel capitolo da una descrizione JSON (`src/book/figures.js`).

| unità | capitolo | Shaw, paragrafi | Morris, paragrafi |
|---|---|---|---|
| 01 | Che cos'è la vita | 1.3, 1.5, 8.1 | 1.2, 1.3, 2.3, 2.4 |
| 02 | Cellule, scala e superficie | 6.7, 9.2 | 1.3, 5.2, 5.3, 26.1 |
| 03 | Membrane e protocellule | 9.1, 9.2 | 5.1, 5.2, 26.1 |
| 04 | Elementi e molecole della vita nello spazio | 1.1, 4.3, 5.2, 5.4, 5.8, 5.9, 5.11 | 2.1, 2.2, 2.5 |
| 05 | Meteoriti, comete e campioni di asteroidi | 6.1, 6.2, 6.3, 6.6, 6.8–6.13, 8.5 | 2.6 |
| 06 | Chiralità e omochiralità | 1.3, 8.6 | 2.5, 4.1 |
| 07 | Miller-Urey e la sintesi prebiotica | 1.5, 8.2, 8.4 | 2.6, 3.3 |
| 08 | Energia, enzimi e catalisi | 8.2, 8.3 | 6.1–6.5 |
| 09 | Sorgenti idrotermali e metabolismo primordiale | 8.7, 8.8, 9.4 | Caso 1, 6.5, 7.4–7.6, 26.2, 26.5 |
| 10 | Il mondo a RNA | 8.9 | Caso 1, 3.3, 4.2, 4.3 |
| 11 | DNA, codice genetico ed espressione | 1.3, 9.2 | 3.1–3.4, 4.1, 4.2, 12.1, 19.2, 19.3 |
| 12 | Mutazioni e soglia d'errore | 1.3, 8.9 | 12.1, 14.1–14.4, 21.1 |
| 13 | Ereditarietà e selezione naturale | 1.3 | 16.2–16.4, 21.3–21.5 |
| 14 | Deriva genetica | 9.3 | 21.2, 21.5, 21.6 |
| 15 | L'albero universale e LUCA | 9.3 | 23.1, 23.2, 26.1, 26.6, 27.2 |
| 16 | Le prime tracce della vita e il tempo geologico | 6.4, 7.3, 7.5 | 23.3, 26.6 |
| 17 | Ossigeno, endosimbiosi e cellule complesse | 9.4 | 8.5, 11.3, 27.2, 28.5 |
| 18 | Estremofili | 1.3, 9.4 | 26.4, 26.5 |
| 19 | Respirazione, fermentazione e chemiosintesi | 9.4 | 7.1-7.7, 26.2-26.3 |
| 20 | Fotosintesi e luce di altre stelle | 7.11 | 8.1-8.5 |
| 21 | Crescita delle popolazioni microbiche | 9.4-9.5 | 46.1-46.2 |
| 22 | La zona abitabile | 7.1, 7.6-7.7 |  |
| 23 | Atmosfere, effetto serra e clima | 7.9-7.10 | 25.1-25.2, 48.1 |
| 24 | Abitabilità attorno alle nane rosse | 4.1-4.3, 7.7-7.8 |  |
| 25 | Biosfera, albedo e Daisyworld | 7.6 | 25.1-25.3, 48.1, 48.3 |
| 26 | Marte: acqua e abitabilità passata | 9.5, 7.9 |  |
| 27 | Cercare la vita su Marte | 6.7, 9.5 |  |
| 28 | Europa e gli oceani sotto il ghiaccio | cap. 7 (introduzione), cap. 8 (sorgenti idrotermali), cap. 10 (introduzione) |  |
| 29 | Encelado e i suoi pennacchi | 4.5, 8.7, cap. 10 (introduzione) |  |
| 30 | Titano, la chimica senza acqua | cap. 10 (10.1-10.6) |  |
| 31 | Scoprire gli esopianeti | 7.8, 7.1 |  |
| 32 | Atmosfere degli esopianeti e JWST | 7.8, 7.9, 3.3 |  |
| 33 | Biofirme e falsi positivi | 7.10-7.11 | 25.1, 26.3, 26.5 |
| 34 | Panspermia e protezione planetaria | 1.5, 6.7, 9.4 |  |
| 35 | Tecnofirme, SETI ed equazione di Drake | 1.4, 3.6, 3.7 |  |

I test del volume, in `tests/biologia.test.mjs`, controllano che i 35 capitoli esistano e siano completi, con formato, lunghezza minima, sezioni, figure, esercizi e livelli, rimandi, formule bilanciate e regole di stile; un test per capitolo ricalcola i numeri del testo e delle soluzioni degli esercizi e i valori del laboratorio citati nel percorso guidato.
