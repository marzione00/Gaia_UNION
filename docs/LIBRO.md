# Il libro della galassia

Dalla 1.21.0 ogni pianeta può avere un capitolo di libro: una pagina HTML che si apre sopra la scena 3D, con testo, formule, figure ed esercizi. Il primo capitolo, pilota, è «Forze e leggi di Newton» (`physics-06`).

## File

- `content/libro/index.json`: elenco dei capitoli scritti, con unità, file, titolo, volume e stato. Un'unità senza voce mostra in orbita i pulsanti di sempre; un rimando a un capitolo non ancora scritto porta la camera sul pianeta.
- `content/libro/<unità>.md`: il capitolo, nel formato descritto sotto.
- `src/book/markdown.js`: lettura del formato e produzione dell'HTML. Tutto il testo viene escapato prima della formattazione; le formule sono lasciate a MathJax.
- `src/book/figures.js`: figure SVG generate da una descrizione JSON.
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

Una figura contiene una descrizione JSON, una riga `---` e la didascalia. Elementi: `line`, `arrow` (con etichetta, pedice e posizione), `rect`, `circle`, `poly`, `text`, `spring`, `ground`, `arc` (angolo con etichetta), `axes` e `plot` (coordinate dei dati con origine e scale). Colori: `ax`, `muted`, `force`, `force2`, `force3`, `force4`, `body`, `accent`.

Macro delle formule: `\vect{F}` (vettore in grassetto, come nella dispensa), `\dd` (differenziale), `\un{N}` (unità di misura). Nei numeri decimali si scrive `9{,}81`.

## Regole per ogni capitolo

1. Seguire la sezione corrispondente della dispensa del corso (matematica e fisica) per struttura e notazione, scrivendo un testo nuovo per la pagina web.
2. Verificare ogni dato numerico su una fonte di riferimento e citarla nella sezione finale; ricalcolare ogni risultato degli esempi e degli esercizi.
3. Struttura minima: apertura con il fenomeno del pianeta e gli obiettivi, teoria con leggi e definizioni, esempi svolti, figure, errori tipici, limiti del modello, sintesi, esercizi ai tre livelli con soluzione, glossario e fonti.
4. Stile: prosa accademica in italiano, senza lineette lunghe e senza costruzioni contrapposte del tipo «non solo» o «non… ma».
5. I test (`tests/book.test.mjs`) controllano formato, rimandi, formule bilanciate, soluzioni presenti, stile e alcuni risultati numerici.

## Capitolo pilota

«Forze e leggi di Newton» copre le sezioni 2.1-2.6 della dispensa di fisica, con esclusione di attrito e resistenza del mezzo, che appartengono al capitolo «Attrito e vincoli». Contiene 16 sezioni, 9 figure, 20 esercizi (6 di base, 8 intermedi, 6 avanzati) e circa 8.000 parole.
