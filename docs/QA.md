# Collaudo GAIA 1.78.0

Eseguito il 28 novembre 2026 sul ramo `feat/luoghi-minori-20261128`, costruito sopra `main` alla versione 1.77.0 (pull request #83), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 772 / 772 |
| Luoghi minori: documento, posizione, copertura, descrizioni, modelli, mondo e app | `node --test tests/minori.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4203 / 4203 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 283 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 125 pianeti esplorabili, nessun errore WebGL |
| Luoghi minori in Chromium | pianeta 41 dalla distribuzione a 1280 × 800, i sette tipi; lo stesso pianeta dalle sorgenti a 390 × 844 come telefono | modelli dettagliati costruiti, scheda, bussola e messaggio di scoperta; nessun errore di pagina né WebGL |
| Luoghi minori | `node scripts/minori.mjs` | 3770 luoghi di 7 tipi, da 6 a 40 per zona; zone con il 90° percentile della distanza dal luogo da vedere oltre 800 m: da 10 a 1 |
| Varietà | `node scripts/varieta.mjs` | 556.697 punti di terraferma sui 125 pianeti; luogo da vedere più vicino in mediana a 194 m (295 nella 1.77.0); 99,6% dei punti con un luogo da vedere entro 500 m (81% nella 1.77.0); 125 zone tutte diverse |
| Prestazioni | `node scripts/prestazioni-mondi.mjs` | 1125 misure su 125 pianeti; al più 113 chiamate di disegno, 1,20 milioni di triangoli e 4287 istanze per fotogramma; maglie dei modelli in mediana 379 ms, al più 729 ms; terreno lontano in 20-57 fotogrammi; la superficie più lunga in 1363 ms in tutto, sotto il limite di 1500 ms |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`; misure in `PRESTAZIONI_MONDI.md` e `VARIETA_MONDI.md`, la serie in `MONDI_APERTI.md`, luoghi minori e descrizioni in `LUOGHI_MINORI.md`, luoghi rari in `LUOGHI_RARI.md`, siti e storie in `SITI.md`, biomi e loro vita in `BIOMI.md`, modelli dei mondi in `CATALOGO_MONDI.md`.

La versione aggiunge alla serie «Mondi aperti» i luoghi minori nelle parti delle zone più lontane da tutto; è descritta nella sezione «Luoghi minori nelle zone vuote (1.78.0)» di `docs/GRAPHICS.md` e, per la classe, in `docs/MONDI_APERTI.md`. Nelle misure delle prestazioni la camera delle stazioni con il dettaglio alto ha registrato un fotogramma isolato di 115,5 ms; una seconda misura della stessa vista sui 125 pianeti non ha dato alcun fotogramma oltre 20 ms. I modelli dei luoghi minori si costruiscono dopo quelli dei siti e dei luoghi rari, uno per fotogramma, e portano la preparazione media di un fotogramma con la camera delle stazioni da 0,08 a 0,32 ms.

Collaudo precedente, 1.77.0 (28 novembre 2026, ramo `feat/collaudo-mondi-20261128`): 767 test Node, 4191 controlli di riferimenti e risorse, 314 controlli HTTP, 283 flussi applicativi, 23 controlli dell’atlante; arrivo su una superficie in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Dal 22 novembre 2026, dopo la pull request #66, le pull request non avviano più il workflow, per ridurre il consumo di GitHub Actions. Ogni versione è collaudata in locale con gli stessi comandi prima di aprire la pull request, e l'esecuzione su `main` dopo l'unione resta la condizione per pubblicare. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #79 (`8b7b5ff`), è riuscita, con la verifica del sito pubblicato.

## Controllo del repository

- `main` ha un solo commit radice. Degli 87 rami presenti su GitHub con quello di questo collaudo, 86 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale; la grafica che si adatta alleggerisce le immagini dove i fotogrammi restano lenti.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
