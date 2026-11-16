# Collaudo GAIA 1.23.0

Eseguito il 16 novembre 2026 sul ramo `feat/libro-chimica-pilota-20261116`, costruito sopra `feat/libro-fisica-20261116` (versione 1.22.0, pull request #21), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 309 / 309 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3543 / 3543 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 201 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 118 controlli |
| Capitolo pilota di chimica in Chromium | `python3 tools/qa_libro_browser.py --solo chemistry-03` | 429 formule, 8 figure, nessun errore |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

Prove aggiuntive nel browser: le otto figure del capitolo sono leggibili sul tema scuro; a 390 × 844 la pagina non scorre di lato e l’indirizzo con `sezione=combustione` apre il capitolo alla sezione richiesta; in orbita l’unità `chemistry-03` mostra «Leggi il capitolo». I risultati della 1.22.0 (25 capitoli di fisica, 8237 formule, 575 figure) restano validi: il codice del lettore non è cambiato.

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
