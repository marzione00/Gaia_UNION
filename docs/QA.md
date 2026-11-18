# Collaudo GAIA 1.26.0

Eseguito il 18 novembre 2026 sul ramo `feat/libro-fisica-astro-20261117`, costruito sopra `main` alla versione 1.25.0 con la pull request #26, con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 411 / 411 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3844 / 3844 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 300 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 143 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Capitoli di astrofisica in Chromium | `python3 tools/qa_libro_browser.py --solo physics-NN`, per le unità 26-40 | 15 capitoli, 4228 formule, 90 figure, nessun errore |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

Prove aggiuntive nel browser: in ogni capitolo di astrofisica le formule sono composte da MathJax senza errori, le sei figure si caricano tutte e la pagina non registra errori. A 390 pixel di larghezza nessuna formula supera la pagina: le formule in linea restano sotto i trentaquattro caratteri circa e quelle a sé sotto i 330 pixel. Le figure sono state controllate una per una in anteprima sul tema scuro, senza scritte sovrapposte. I test di `tests/fisica.test.mjs` ricalcolano i numeri di ogni capitolo e i valori dei modelli del laboratorio. Il foglio delle vedute dall'alto è stato rigenerato con 125 pianeti e la distanza minima fra due carte resta 0,175.

Collaudo precedente, 1.25.0 (17 novembre 2026, ramo `feat/libro-biologia-pilota-20261117`): 380 test Node, 3664 controlli di riferimenti e risorse, 270 controlli HTTP, 128 flussi applicativi; atlante con 27 sistemi e 110 pianeti esplorabili; 35 capitoli di biologia in Chromium con 7925 formule e 219 figure, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #26 (`0ce83b8`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 30 rami presenti su GitHub, 29 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
