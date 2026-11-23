# Collaudo GAIA 1.64.0

Eseguito il 23 novembre 2026 sul ramo `feat/mondi-vivi-citta-20261123`, costruito sopra `main` alla versione 1.63.0 (pull request #69), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 705 / 705 |
| Colonie, villaggi, terreno spianato e abitanti | `node --test tests/citta.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4085 / 4085 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 283 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili, nessun errore WebGL |
| Superfici in Chromium | pianeti 7, 20, 25 e 36 a 1280 × 800 e pianeta 7 a 390 × 844: vista delle stazioni, colonia e villaggio in esplorazione | strade e case sul terreno spianato, cupole sul pianeta senza aria, torri sotto la gravità debole, villaggio con capanne, granai, totem e abitanti, scheda dei luoghi, nessun errore di pagina |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione dà a ogni pianeta una colonia umana adattata alla sua carta e a 40 pianeti il villaggio di un popolo nativo, con il terreno spianato sotto strade e case e gli abitanti che camminano; è descritta nella sezione «Città e abitanti» di `docs/GRAPHICS.md`.

Collaudo precedente, 1.63.0 (23 novembre 2026, ramo `feat/mondi-vivi-vita-20261123`): 700 test Node, 4067 controlli di riferimenti e risorse, 314 controlli HTTP, 283 flussi applicativi, 23 controlli dell'atlante; superfici dei pianeti 0, 7, 8 e 36 in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Dal 22 novembre 2026, dopo la pull request #66, le pull request non avviano più il workflow, per ridurre il consumo di GitHub Actions. Ogni versione è collaudata in locale con gli stessi comandi prima di aprire la pull request, e l'esecuzione su `main` dopo l'unione resta la condizione per pubblicare. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #69 (`3672898`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 73 rami presenti su GitHub con quello di questo collaudo, 72 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
