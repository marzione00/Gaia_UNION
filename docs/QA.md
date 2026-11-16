# Collaudo GAIA 1.24.0

Eseguito il 16 novembre 2026 sul ramo `feat/libro-chimica-20261116`, costruito sopra `feat/libro-chimica-pilota-20261116` (versione 1.23.0, pull request #22), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 334 / 334 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3543 / 3543 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 225 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 118 controlli |
| Capitoli di chimica in Chromium | `python3 tools/qa_libro_browser.py --solo chemistry-NN`, per le 25 unità | 25 capitoli, 8988 formule, 163 figure, nessun errore |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

Prove aggiuntive nel browser: in ogni capitolo di chimica le formule sono composte da MathJax senza errori, le figure si caricano tutte e nessun simbolo `$` resta nel testo. A 390 × 844 nessuna formula in linea e nessuna tabella supera la larghezza della pagina. Le figure sono state controllate una per una in anteprima sul tema scuro, senza scritte sovrapposte. I test di `tests/chimica.test.mjs` ricalcolano i numeri di tutti i capitoli. I risultati della 1.22.0 per la fisica (25 capitoli, 8237 formule, 575 figure) restano validi: il codice del lettore non è cambiato.

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
