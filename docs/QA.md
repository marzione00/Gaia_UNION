# Collaudo GAIA 1.28.0

Eseguito il 18 novembre 2026 sul ramo `feat/mappa-scoperte-20261118`, costruito sopra `main` alla versione 1.27.0 (pull request #28), con Node.js 22.

| Controllo | Comando | Risultato |
|---|---|---:|
| Test Node | `node --test tests/*.test.mjs` | 422 / 422 |
| Riferimenti e risorse | `node scripts/check.mjs` | 3864 / 3864 |
| Distribuzione `dist/` servita via HTTP | `node scripts/http_smoke.mjs` | 305 controlli |
| Flussi applicativi | `node tools/qa_application_curriculum.mjs` | 270 controlli |
| Atlante in Chromium | `python3 tools/qa_atlas_browser.py --root dist` | 23 controlli, 30 sistemi, 280 pianeti, 125 esplorabili |
| Mappa e diario in Chromium | salvataggio con 25 sezioni lette e 5 aree visitate, a 1440 × 900, 390 × 844 e 320 × 568 | nessun errore, 38 passaggi aperti |

Log: `TEST_NODE.log`, `CHECK.log`, `BUILD.log`, `CHECK.json`, `HTTP_SMOKE.json`.

I test di `tests/passages.test.mjs` ricostruiscono la rete dai capitoli e dai percorsi guidati e la confrontano con `content/atlas/passages.json`: 147 passaggi, 78 corsie e 69 porte di salto, 624 rimandi. Verificano che ogni rimando unisca le aree giuste e indichi una sezione esistente del capitolo, che la rete colleghi tutte le 30 aree e che un passaggio si apra soltanto leggendo la sua sezione o arrivando ai collegamenti del percorso. I flussi applicativi segnano come letta una sezione e controllano che il suo passaggio compaia sulla mappa e nel testo per i lettori di schermo. Il test sulla disposizione dell'atlante controlla che la guida, con il nuovo testo sui segnali e sui passaggi, resti dentro lo schermo a 320 × 568 con il testo al 140 per cento.

Collaudo precedente, 1.27.0 (18 novembre 2026, ramo `feat/fisica-pianeti-20261118`): 417 test Node, 3859 controlli di riferimenti e risorse, 300 controlli HTTP, 269 flussi applicativi; atlante con 30 sistemi e 125 pianeti esplorabili; scheda «Dati fisici» in Chromium su tre formati, nessun errore.

## Integrazione continua

Il workflow `.github/workflows/pages.yml` esegue su `main` test, controllo delle risorse, build, verifiche HTTP, interazioni reali dell’atlante e pubblicazione su GitHub Pages. Il passo finale scarica dal sito pubblico `build-info.json` e il curriculum e verifica che corrispondano al commit appena pubblicato e ai corsi del curriculum, 125 dalla 1.26.0. L'ultima esecuzione su `main`, per l'unione della pull request #28 (`82cc590`), è riuscita.

## Controllo del repository

- `main` ha un solo commit radice. Dei 32 rami presenti su GitHub, 31 sono interamente contenuti in `main`; l'unico con commit propri è il ramo di questo collaudo. Due rami senza pull request (`feat/accessible-atlas-20261115` e `feat/atlas-accessible-navigation-20261115`) puntano allo stesso commit, l’unione della pull request #3.
- Nessuna pull request o segnalazione aperta.
- Gli autori dei commit usano indirizzi noreply, di GitHub e di Anthropic.
- Due esecuzioni fallite nella storia di `main`, entrambe superate dai commit successivi: il primo tentativo di pubblicazione (`bacea5c`, errore in `configure-pages`) e l’unione della pull request #5 (`1d6c911`, verifica del sito pubblicato con un numero di versione fisso, corretta in `b7dc1e8`).
- Avvisi dell’integrazione continua sulla 1.20.0: quattro azioni giravano ancora su Node.js 20, deprecato. Nella 1.20.1 usano versioni su Node.js 24 (`configure-pages@v6`, `deploy-pages@v5`, `upload-artifact@v7`, `upload-pages-artifact@v5`).

## Limiti

- Nessuna prova su GPU fisiche, Safari o telefoni reali. I tempi per fotogramma misurati con SwiftShader, un renderer software, non rappresentano un dispositivo reale.
- Nessuna certificazione formale di accessibilità.
- Il replay dei comandi del renderer su EGL / OpenGL ES è stato eseguito l’ultima volta sulla 1.4.0: risultati e catture sono in `history-v1.4.0/`.
