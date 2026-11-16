# Collaudo GAIA 1.20.1

Eseguito il 16 novembre 2026 sul ramo `fix/controllo-20261116`, a partire da `main` al commit `9b15efa` (versione 1.20.0), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 303 / 303 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3534 / 3534 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 167 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 118 controlli |
| Interazioni reali dell’atlante in Chromium con WebGL 2 (SwiftShader) | `python3 tools/qa_atlas_browser.py --root dist` | 23 / 23, nessun errore GL |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

Prova aggiuntiva nel browser: all’avvio il sito non richiede alcun file di geometria delle scene Blender; superficie generata, rete della ricerca, laboratorio Daisyworld, orbita e superficie di un prototipo si aprono senza errori della pagina e senza errori WebGL.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai 100 corsi. Per la 1.20.0 (`9b15efa`) build, prova nel browser, pubblicazione e verifica del sito sono riuscite.

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
