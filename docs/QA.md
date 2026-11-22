# Collaudo GAIA 1.61.0

Eseguito il 22 novembre 2026 sul ramo `feat/galassia-viva-collaudo-20261122`, costruito sopra `main` alla versione 1.60.0 (pull request #63), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 689 / 689 |
| Serie «Galassia viva» | `node --test tests/galassia.test.mjs` | 4 / 4 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4047 / 4047 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 282 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili, nessun errore WebGL |
| Prestazioni dei 30 sistemi | `node scripts/prestazioni.mjs` | 90 misure alle tre impostazioni e 7 oggetti seguiti, entro i limiti di `tests/galassia.test.mjs` |
| Contatore e renderer a confronto | sistema 13 a 1600 × 1000 in Chromium, letto con `GAIA.diagnostics().performance` | 119 chiamate di disegno alle tre impostazioni contro le 116 del contatore; triangoli 0,69, 0,65 e 0,61 milioni contro 0,67, 0,62 e 0,59; nessun errore di pagina |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`, `PRESTAZIONI.md`.

La versione chiude la serie «Galassia viva» con `docs/GALASSIA_VIVA.md` e con le prestazioni misurate in `docs/PRESTAZIONI.md`. Il calcolo degli sciami (`meteorShowers` in `src/scene/comete.js`) è più rapido e dà gli stessi risultati, confrontati in `tests/galassia.test.mjs` con il calcolo precedente. Nel confronto con il browser la sessione ha un seme diverso da quello fissato dallo script, quindi navi e mezzi di servizio sono in posizioni diverse; le differenze restano sotto il 5 % dei triangoli e sono di tre chiamate di disegno.

Collaudo precedente, 1.60.0 (22 novembre 2026, ramo `feat/galassia-viva-comete-20261122`): 685 test Node, 6 test di comete, sciami e cinture, 4047 controlli di riferimenti e risorse, 314 controlli HTTP, 282 flussi applicativi, 23 controlli dell'atlante; comete, cinture e stelle cadenti in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #63 (`0599d2c`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 67 rami presenti su GitHub con quello di questo collaudo, 66 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
