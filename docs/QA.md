# Collaudo GAIA 1.49.0

Eseguito il 21 novembre 2026 sul ramo `feat/sciame-frontiera-20261121`, costruito sopra `main` alla versione 1.48.0 (pull request #51), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 631 / 631 |
| Sciame della Frontiera | `node --test tests/sciame.test.mjs` | 4 / 4 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3987 / 3987 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 279 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Sistema e mappa in Chromium | incursione di 18 droni avviata a mano nel sistema di frontiera «Acidi, redox e carbonio», poi mappa della galassia, a 1600 × 1000 | nessun errore WebGL o di pagina; incursione combattuta dal vivo da 6 navi, 11 droni abbattuti; anelli del fronte e riquadro dei sistemi contesi sulla mappa |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge il fronte dello Sciame della Frontiera (`src/craft/swarm.js`), le incursioni nelle battaglie dei sistemi (`src/craft/threats.js`, `src/craft/economy.js`), i droni e il passaggio delle incursioni al sistema aperto (`src/scene/world.js`) e il fronte sulla mappa della galassia (`src/navigation/atlas-ui.js`).

Collaudo precedente, 1.48.0 (21 novembre 2026, ramo `feat/minacce-naturali-20261121`): 627 test Node, 7 test delle minacce naturali, 3979 controlli di riferimenti e risorse, 314 controlli HTTP, 279 flussi applicativi, 23 controlli dell'atlante; sistema di frontiera con sciame e brillamento in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #51 (`7bbba6a`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 55 rami presenti su GitHub con quello di questo collaudo, 54 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
