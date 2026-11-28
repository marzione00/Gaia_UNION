# Collaudo GAIA 1.75.0

Eseguito il 28 novembre 2026 sul ramo `feat/atterraggio-20261128`, costruito sopra `main` alla versione 1.74.0 (pull request #80), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 757 / 757 |
| Nave, piazzola e atterraggio libero | `node --test tests/nave.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4184 / 4184 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 283 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 125 pianeti esplorabili, nessun errore WebGL |
| Nave in Chromium | pianeta 8 a 1280 × 720, pianeta 39 a 390 × 844: discesa sulla piazzola con getti e polvere, rampa aperta, mappa della zona, scelta di un punto, decollo, volo, discesa, uscita dell’esploratore e decollo per l’orbita | percorso completo fino alla vista dell’orbita; nessun errore di pagina né WebGL |
| Prestazioni | `node scripts/prestazioni-mondi.mjs` | 1125 misure su 125 pianeti, con la nave sulla piazzola; al più 113 chiamate di disegno, 1,19 milioni di triangoli e 4287 istanze per fotogramma; una superficie si costruisce al più in 1434 ms |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`; misure in `PRESTAZIONI_MONDI.md`, luoghi rari e descrizioni in `LUOGHI_RARI.md`, siti e storie in `SITI.md`, biomi e loro vita in `BIOMI.md`, modelli dei mondi in `CATALOGO_MONDI.md`.

La versione è la sesta della serie «Mondi aperti»: la nave dell’esploratore, una piazzola della base su ognuno dei 125 pianeti, la discesa e il decollo con la fisica del pianeta e l’atterraggio in un punto scelto sulla mappa della zona; è descritta nella sezione «Atterraggio libero e nave che scende e decolla» di `docs/GRAPHICS.md`. Il tempo di costruzione più lungo, 1434 ms, resta sotto il limite di 1500 ms; la versione 1.77.0 è dedicata alle prestazioni sui telefoni.

Collaudo precedente, 1.74.0 (28 novembre 2026, ramo `feat/luoghi-rari-20261128`): 752 test Node, 4172 controlli di riferimenti e risorse, 314 controlli HTTP, 283 flussi applicativi, 23 controlli dell’atlante; tutti i 16 tipi di luoghi rari in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Dal 22 novembre 2026, dopo la pull request #66, le pull request non avviano più il workflow, per ridurre il consumo di GitHub Actions. Ogni versione è collaudata in locale con gli stessi comandi prima di aprire la pull request, e l'esecuzione su `main` dopo l'unione resta la condizione per pubblicare. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #79 (`8b7b5ff`), è riuscita, con la verifica del sito pubblicato.

## Controllo del repository

- `main` ha un solo commit radice. Degli 84 rami presenti su GitHub con quello di questo collaudo, 83 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
