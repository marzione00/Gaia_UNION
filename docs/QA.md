# Collaudo GAIA 1.60.0

Eseguito il 22 novembre 2026 sul ramo `feat/galassia-viva-comete-20261122`, costruito sopra `main` alla versione 1.59.0 (pull request #62), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 685 / 685 |
| Comete, sciami e cinture | `node --test tests/comete.test.mjs` | 6 / 6 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4047 / 4047 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 282 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili, nessun errore WebGL |
| Comete e cinture in Chromium | sistema 13 a 1600 × 1000: vista d'insieme con le due cinture e la scia, cometa seguita al perielio con le code, cintura di asteroidi seguita da vicino; sistema 7 a 390 × 844 con cintura e cometa; stella cadente sulla superficie del pianeta 0 durante il suo sciame | code, scie, cinture e stelle cadenti visibili, nessun errore di pagina |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge comete, scie, sciami di meteore e cinture (`src/scene/comete.js`), descritti nella sezione «Comete, sciami e cinture» di `docs/STAZIONI_NAVI.md`. `tests/servizio.test.mjs` usa le cinture nuove per i minatori.

Collaudo precedente, 1.59.0 (22 novembre 2026, ramo `feat/galassia-viva-atmosfere-20261122`): 679 test Node, 5 test delle atmosfere, 4043 controlli di riferimenti e risorse, 314 controlli HTTP, 282 flussi applicativi, 23 controlli dell'atlante; atmosfere in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #62 (`09152b8`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 66 rami presenti su GitHub con quello di questo collaudo, 65 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
