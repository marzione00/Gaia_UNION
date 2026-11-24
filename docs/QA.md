# Collaudo GAIA 1.69.0

Eseguito il 24 novembre 2026 sul ramo `feat/catalogo-mondi-20261124`, costruito sopra `main` alla versione 1.68.0 (pull request #74), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 731 / 731 |
| Catalogo, documenti e prestazioni della serie | `node --test tests/mondi.test.mjs` | 8 / 8 |
| Riferimenti e risorse | `node scripts/check.mjs` | 4119 / 4119 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 314 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 283 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 125 pianeti esplorabili, nessun errore WebGL |
| Catalogo dei mondi in Chromium | a 1280 × 800 una specie, un edificio di una colonia, un popolo nativo, un totem, un colono e un rover aperti nel catalogo, il primo dal suo indirizzo; a 390 × 844 elenco della famiglia «Mondi» e pulsante «3D» dell'esplorazione | modelli costruiti nei due livelli, schede con pianeta e misure, indirizzi conservati; nessun errore di pagina né WebGL |
| Prestazioni della serie | `node scripts/prestazioni-mondi.mjs` | 750 misure su 125 pianeti, al più 97 chiamate di disegno e 1,13 milioni di triangoli per fotogramma |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`; misure in `PRESTAZIONI_MONDI.md`.

La versione chiude la serie «Mondi vivi»: catalogo dei 2868 modelli dei mondi nel catalogo 3D, documento della serie `docs/MONDI_VIVI.md`, elenco `docs/CATALOGO_MONDI.md` e prestazioni `docs/PRESTAZIONI_MONDI.md`; è descritta nella sezione «Catalogo dei mondi» di `docs/GRAPHICS.md`.

Collaudo precedente, 1.68.0 (24 novembre 2026, ramo `feat/esplorazione-20261124`): 723 test Node, 4106 controlli di riferimenti e risorse, 314 controlli HTTP, 283 flussi applicativi, 23 controlli dell'atlante; esplorazione dei pianeti 42 e 7 in Chromium senza errori.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Dal 22 novembre 2026, dopo la pull request #66, le pull request non avviano più il workflow, per ridurre il consumo di GitHub Actions. Ogni versione è collaudata in locale con gli stessi comandi prima di aprire la pull request, e l'esecuzione su `main` dopo l'unione resta la condizione per pubblicare. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #74 (`30d6852`), è riuscita, con la verifica del sito pubblicato.

## Controllo del repository

- `main` ha un solo commit radice. Dei 77 rami presenti su GitHub con quello di questo collaudo, 76 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
