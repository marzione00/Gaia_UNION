# Collaudo GAIA 1.21.0

Eseguito il 16 novembre 2026 sul ramo `feat/libro-pilota-20261116`, a partire da `main` al commit `158d3b1` (versione 1.20.1), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 306 / 306 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3543 / 3543 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 174 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 118 controlli |
| Interazioni reali dell’atlante in Chromium con WebGL 2 (SwiftShader) | `python3 tools/qa_atlas_browser.py --root dist` | 23 / 23, nessun errore GL |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

Prove aggiuntive nel browser sul capitolo pilota «Forze e leggi di Newton», a 1440 × 900 e a 390 × 844: 338 formule composte da MathJax senza errori, 9 figure, 16 sezioni nell’indice; l’indirizzo con `sezione` apre il capitolo alla sezione richiesta; un rimando a un capitolo non ancora scritto porta al pianeta con un avviso; Esc e «Torna al pianeta» riportano all’orbita; nessun errore della pagina. All’avvio il sito non richiede geometrie delle scene Blender.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai 100 corsi. Per la 1.20.0 (`9b15efa`) build, prova nel browser, pubblicazione e verifica del sito sono riuscite.

## Controllo del repository

- `main` ha un solo commit radice. Tutti i 21 rami presenti su GitHub sono interamente contenuti in `main`: nessuno ha commit propri. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply di GitHub.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
