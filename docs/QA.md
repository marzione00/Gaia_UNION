# Collaudo GAIA 1.57.0

Eseguito il 22 novembre 2026 sul ramo `feat/galassia-viva-densita-20261122`, costruito sopra `main` alla versione 1.56.0 (pull request #59), con Node.js 22. È la prima versione della serie «Galassia viva».

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 669 / 669 |
| Traffico di servizio | `node --test tests/servizio.test.mjs` | 4 / 4 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4036 / 4036 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 281 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Traffico in Chromium | sistema 13, con la fascia, a 1600 × 1000 e sistema 2 a 390 × 844, in alta qualità, dopo 240 s del modello; riquadro di un rimorchiatore sotto il puntatore | 135 mezzi di servizio in vista con 31 navi nel sistema 13, 140 con 36 navi nel sistema 2; nessun errore di pagina |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

La versione aggiunge il traffico di servizio in 3D (`src/craft/servizio.js`), descritto nella sezione «Traffico di servizio» di `docs/STAZIONI_NAVI.md`. `tests/stations.test.mjs` tiene conto dei nuovi mezzi, che hanno modelli, istanze e indici propri.

Collaudo precedente, 1.56.0 (22 novembre 2026, ramo `feat/guida-docente-20261122`): 665 test Node, 4 test della serie, 4031 controlli di riferimenti e risorse, 314 controlli HTTP, 281 flussi applicativi, 23 controlli dell'atlante; esercizi in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #59 (`9598929`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 63 rami presenti su GitHub con quello di questo collaudo, 62 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
