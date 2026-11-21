# Collaudo GAIA 1.50.0

Eseguito il 21 novembre 2026 sul ramo `feat/rapporto-sciame-20261121`, costruito sopra `main` alla versione 1.49.0 (pull request #52), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 639 / 639 |
| Apprendimento, chiavi e Rapporto | `node --test tests/rapporto.test.mjs` | 8 / 8 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3988 / 3988 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Sistema e mappa in Chromium | incursione di 20 droni avviata a mano nel sistema di frontiera «Acidi, redox e carbonio» dopo un'ora del modello della galassia e la consegna di una chiave, poi mappa della galassia e Rapporto, a 1600 × 1000 e a 390 × 844 | nessun errore WebGL o di pagina; la chiave libera 4 droni su 20, 6 navi ne abbattono 12; Rapporto con i quattro bracci, i pesi, i punteggi e le ultime incursioni entro i margini |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge l'apprendimento dello Sciame, le chiavi, i droni liberati, la previsione e il Rapporto (`src/craft/swarm.js`), i droni liberati nelle battaglie e nell'economia dei sistemi (`src/craft/threats.js`, `src/craft/economy.js`), il loro disegno nella scena (`src/scene/world.js`), la scheda del Rapporto sulla mappa della galassia (`src/navigation/atlas-ui.js`) e il numero dei droni liberati nella cronaca del sistema (`src/app.js`).

Collaudo precedente, 1.49.0 (21 novembre 2026, ramo `feat/sciame-frontiera-20261121`): 631 test Node, 4 test dello Sciame della Frontiera, 3987 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; incursione dal vivo e fronte sulla mappa in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #52 (`42e7904`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 56 rami presenti su GitHub con quello di questo collaudo, 55 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
