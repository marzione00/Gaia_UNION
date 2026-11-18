# La nave da esplorazione

Dalla versione 1.29.0 lo studente esplora la galassia con una nave disarmata. La nave porta i sensori di base, che danno la stella e l'orbita di ogni pianeta, e sette strumenti che si ottengono studiando. Ogni strumento mostra alcune righe della scheda «Dati fisici» (`docs/FISICA_PIANETI.md`); finché manca, la riga indica quale strumento la misura.

## Strumenti

| strumento | unità che lo dà | sezioni del capitolo | righe della scheda |
|---|---|---:|---|
| radiometro infrarosso | Radiazione termica e luce delle stelle (`physics-30`) | 18 | Luce, Temperatura |
| spettrografo | Onde di materia, atomi e righe spettrali (`physics-37`) | 19 | Pressione, Effetto serra |
| gravimetro | Gravitazione (`physics-12`) | 12 | Raggio e massa, Gravità |
| magnetometro | Correnti, dipoli e dinamo dei pianeti (`physics-33`) | 17 | Magnetosfera |
| radar di profondità | Induzione, circuiti oscillanti e radio (`physics-34`) | 17 | Acqua |
| laboratorio di datazione | Nuclei, decadimenti e datazioni (`physics-38`) | 17 | Vulcanismo |
| analizzatore di biofirme | Biofirme e falsi positivi (`biology-33`) | 15 | Vita |

Ogni strumento sale a bordo in uno di due modi: completando il percorso guidato della sua unità, oppure leggendo fino in fondo tutte le sezioni del suo capitolo. Le sezioni da leggere sono in `content/atlas/instruments.json`, generato da `tools/build_instruments.mjs`; le regole stanno in `src/navigation/instruments.js`.

## Modalità esploratore

La modalità esploratore è attiva in partenza: le righe della scheda fisica compaiono con gli strumenti. Dalla schermata della nave si può disattivarla, e allora la scheda mostra tutto, come un archivio. In nessun caso gli strumenti chiudono capitoli, percorsi o aree della mappa.

## Diario di bordo

Quando la scheda fisica di un pianeta si apre con almeno uno strumento a bordo, il diario registra quali strumenti l'hanno misurato. La scheda «Esplorazione» del diario conta i pianeti misurati e, per ognuno, elenca gli strumenti accanto a specie e luoghi registrati in superficie.

## Dove si trova

- Nella scheda «Dati fisici», il pulsante «Nave».
- Nel diario, alla scheda «Esplorazione», il pulsante «La nave».
- All'indirizzo `#/ship` (anche `#/nave`).

La schermata elenca gli strumenti: che cosa misurano, quali righe mostrano, se sono a bordo e, per quelli da ottenere, quante sezioni del capitolo restano da leggere, con un pulsante che apre il capitolo.

## Una correzione

Dalla 1.25.0 il salvataggio scartava, a ogni riapertura del sito, le registrazioni del diario sui pianeti con indice da 100 in su, cioè quelli delle aree aggiunte con la biologia e con l'astrofisica. Dalla 1.29.0 il salvataggio accetta tutti i 125 pianeti.

## Verifiche

`tests/instruments.test.mjs` controlla il file delle sezioni, la corrispondenza fra strumenti e righe della scheda, le due regole per ottenere uno strumento, la modalità esploratore, le misure nel diario e l'indirizzo della nave. I flussi applicativi leggono il capitolo del radiometro e verificano che la scheda mostri luce e temperatura e che il diario registri la misura.
