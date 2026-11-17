# Collaudo GAIA 1.25.0

Eseguito il 17 novembre 2026 sul ramo `feat/libro-biologia-pilota-20261117`, costruito sopra `main` alla versione 1.24.1 (pull request #24), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 380 / 380 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3664 / 3664 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 270 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 128 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 27 sistemi, 253 pianeti, 110 esplorabili |
| Capitoli di biologia in Chromium | `python3 tools/qa_libro_browser.py --solo biology-NN`, per le 35 unità | 35 capitoli, 7925 formule, 219 figure, nessun errore |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

Prove aggiuntive nel browser: in ogni capitolo di biologia le formule sono composte da MathJax senza errori, le figure si caricano tutte e nessun simbolo `$` resta nel testo. La prima prova ha trovato un errore di MathJax in «Deriva genetica», un carattere di controllo al posto di `\b` in `\bar`, corretto; un test ora rifiuta i caratteri di controllo nei capitoli di biologia. A 390 pixel di larghezza nessuna formula supera la pagina: le formule in linea restano sotto i trentatré caratteri circa e quelle a sé sotto i 330 pixel. Le figure sono state controllate una per una in anteprima sul tema scuro, senza scritte sovrapposte. I test di `tests/biologia.test.mjs` ricalcolano i numeri di ogni capitolo e i valori del laboratorio citati nei percorsi guidati. Il foglio delle vedute dall'alto è stato rigenerato con 110 pianeti e la distanza minima fra due carte resta 0,175.

Collaudo precedente, 1.24.0 (16 novembre 2026, ramo `feat/libro-chimica-20261116`): 334 test Node, 3543 controlli di riferimenti e risorse, 225 controlli HTTP, 118 flussi applicativi; 25 capitoli di chimica in Chromium con 8988 formule e 163 figure, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 110 dalla 1.25.0. Per la 1.20.0 (`9b15efa`) build, prova nel browser, pubblicazione e verifica del sito sono riuscite.

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
