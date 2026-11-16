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

## Volume di chimica

Il volume di chimica non dispone di una dispensa del corso: i capitoli sono scritti per il sito. Il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications* (11ª edizione, Pearson Canada, 2017), è protetto da diritto d'autore e serve soltanto come riferimento per la scelta e l'ordine degli argomenti e per controllare definizioni e risultati. Dal manuale non si riprendono testi, figure, tabelle, esempi o esercizi, neppure tradotti; i capitoli lo citano nella sezione «Fonti» con i paragrafi consultati. Costanti e pesi atomici si prendono dalle fonti primarie: BIPM per le definizioni del SI, CODATA per le costanti misurate, CIAAW per i pesi atomici standard.

Il capitolo pilota è «Mole e quantità di sostanza» (`chemistry-03`). Corrispondenza prevista fra le unità e i capitoli del manuale usati come riferimento: 01–03 capitoli 1–3; 04–05 capitoli 8–9; 06–09 capitoli 10–12; 10–13 capitoli 6, 12, 14 e 18; 14–16 capitoli 4 e 7; 17–20 capitoli 13, 15 e 20; 21–23 capitoli 5, 16, 17 e 19; 24–25 capitoli 26 e 27.
