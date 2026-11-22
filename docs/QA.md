# Collaudo GAIA 1.59.0

Eseguito il 22 novembre 2026 sul ramo `feat/galassia-viva-atmosfere-20261122`, costruito sopra `main` alla versione 1.58.0 (pull request #61), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 679 / 679 |
| Atmosfere | `node --test tests/atmosfere.test.mjs` | 5 / 5 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4043 / 4043 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 282 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili, nessun errore WebGL |
| Atmosfere in Chromium | sistema 2: il pianeta delle unità più grande seguito da vicino in controluce e lungo il terminatore a 1600 × 1000, con le pagine «Atmosfera» e «Cielo»; le stesse pagine a 1366 × 768 e a 390 × 844; vista d'insieme del sistema | guscio e crepuscolo visibili, righe degli strumenti nascoste, nessun errore di pagina |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione rende visibili le atmosfere secondo la carta di ogni pianeta e aggiunge al pannello «Che cosa succede» le pagine «Atmosfera» e «Cielo»; le descrizioni sono in `docs/GRAPHICS.md` e in `docs/STAZIONI_NAVI.md`.

Collaudo precedente, 1.58.0 (22 novembre 2026, ramo `feat/galassia-viva-zoom-20261122`): 674 test Node, 5 test di zoom e pannello, 4042 controlli di riferimenti e risorse, 314 controlli HTTP, 282 flussi applicativi, 23 controlli dell'atlante; zoom in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #61 (`586bff2`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 65 rami presenti su GitHub con quello di questo collaudo, 64 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
