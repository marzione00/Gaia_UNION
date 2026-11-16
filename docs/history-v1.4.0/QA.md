# Collaudo GAIA 1.4.0

Eseguito il 15 novembre 2026 sui sorgenti consegnati.

| Controllo | Risultato |
|---|---:|
| Test Node | 88 / 88 |
| Riferimenti e risorse | 1477 / 1477 |
| Flussi applicativi con eventi dell'app e DOM simulato | 12 / 12 |
| Fotogrammi su EGL / OpenGL ES | 305 / 305, zero errori GL |
| Fotogrammi cosmici con 1.000.000 di punti inviati alla GPU | 287 / 287 |
| Catture statiche dell'app incluse | 51 |
| Fotogrammi aggiuntivi per il video di tre rotazioni | 180 |
| Controlli HTTP della distribuzione | 20 / 20 |

Il replay usa gli shader GLSL ES originali e le chiamate effettive dell'app: buffer, texture NASA, framebuffer volumetrico, scene, geometrie, illuminazione e UI. Renderer: **llvmpipe (LLVM 19.1.7, 256 bits)**; API: **OpenGL ES 3.2 Mesa 25.0.7-2+deb13u1**. Il metodo è documentato in `COSMIC_ENVIRONMENT.md`. Tre fotogrammi di avvio delle riprese sono inoltre presenti nel rapporto, non duplicati nelle catture statiche.

## Verifiche

- Conteggio GPU effettivo, senza inferirlo dal testo nell'interfaccia: `drawArrays(POINTS, 0, 1000000)` in ogni vista cosmica e transizione, per tutti i preset.
- Venticinque stelle dei sistemi inalterate, catalogo di quindici volumi immutato attraverso galassia, sistema e orbita, cinque regioni assegnate per posizione.
- Estinzione limitata al segmento camera–stella: foreground, background, camera interna e raggi che mancano il volume.
- Hover, drag, clic, zoom, ritorno con camera ripristinata, tastiera, touch, pannelli che bloccano il picking e pianeti aggiuntivi non esplorabili.
- Cinque-dodici pianeti per sistema, quattro esplorabili; 232 corpi, undici famiglie e mappe native NASA 4K/8K delle destinazioni.
- Geometrie di fasce e comete finite, indici validi, seed riproducibile, fasce oltre le orbite planetarie.
- Viste desktop e mobile, shader di gas/polveri, oggetti rari, dossier planetari e scene didattiche. Nessuna nuova immagine IA.
- `PRESERVATION.json`: confronto byte per byte con la 1.3.0 per contenuti, interfaccia, texture, mesh, modelli e documentazione scientifica sorgente.

## Limiti

Il DOM è simulato: non è un collaudo completo nel browser. Browser reali, storage dopo la chiusura e prestazioni su GPU fisiche restano da verificare sul dispositivo destinatario. Il video è codificato a 20 fotogrammi al secondo da render effettivi, non misura il frame rate dell'app. Nessun FPS garantito.

Densità, scale e colori sono una composizione artistica ispirata all'astronomia; non sono dati osservativi 3D NASA. L'estinzione stellare è approssimata, i volumi sovrapposti sono ordinati per profondità, le ombre delle lune sono semplificate. Le comete non hanno un modello dinamico orbitale. I dettagli sono esplicitati in `COSMIC_ENVIRONMENT.md`.

I rapporti 1.3.0 sono archiviati in `history-v1.3.0/`. Nessun sito è stato pubblicato.

## Ripetere le verifiche

```sh
npm test
npm run check
npm run build
node scripts/http_smoke.mjs
GAIA_VIDEO=1 node tools/capture_runtime.mjs ../runtime-qa-v140
python tools/replay_egl.py ../runtime-qa-v140
```

`qa_browser.py` resta disponibile per un collaudo browser separato; è verificato sintatticamente, non eseguito in questa consegna.
