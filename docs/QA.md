# Collaudo GAIA 1.58.0

Eseguito il 22 novembre 2026 sul ramo `feat/galassia-viva-zoom-20261122`, costruito sopra `main` alla versione 1.57.0 (pull request #60), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 674 / 674 |
| Zoom e pannello | `node --test tests/succede.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4042 / 4042 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 282 controlli, con il pianeta di un'unità seguito, il suo pannello e il testo accessibile |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Zoom in Chromium | sistema 13 a 1600 × 1000: clic su una nave in viaggio, poi una stazione, un modulo di manutenzione, la stella e un pianeta di un'unità; sistema 2 a 390 × 844 e sistema 7 a 320 × 568, con le due pagine del pannello | oggetto inquadrato e pannello completo in ogni caso, nessun errore di pagina |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge la camera che segue gli oggetti del sistema e il pannello «Che cosa succede» (`src/craft/succede.js`), descritti nella sezione omonima di `docs/STAZIONI_NAVI.md`.

Collaudo precedente, 1.57.0 (22 novembre 2026, ramo `feat/galassia-viva-densita-20261122`): 669 test Node, 4 test del traffico di servizio, 4036 controlli di riferimenti e risorse, 314 controlli HTTP, 281 flussi applicativi, 23 controlli dell'atlante; traffico in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #60 (`d73cbe5`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 64 rami presenti su GitHub con quello di questo collaudo, 63 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
