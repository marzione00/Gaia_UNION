# Avvia GAIA 1.20.1

1. Estrai lo ZIP COMPLETO. Lo ZIP ORIGINALI_NASA è facoltativo per l’avvio: contiene i file originali di provenienza ; per ricostruire gli asset, copia la sua sottocartella sources/nasa nella cartella omonima di questa versione.
2. Usa Node.js 22 o successivo.
3. Su Windows apri `AVVIA_WINDOWS.bat`; in alternativa esegui `npm start` nella cartella del progetto.
4. Apri http://localhost:8000 in un browser con WebGL 2.

Non serve npm install. Il doppio clic su index.html non è sufficiente. Il primo caricamento prepara stelle e texture; la superficie di un pianeta si genera all’atterraggio.

## Dalla galassia alla superficie

- **Ingresso:** cerca un argomento, segui un percorso o esplora la galassia.
- **Galassia:** quattro bracci, uno per disciplina; 25 aree tematiche in ordine di studio dal centro verso l’esterno. La scheda elenca le unità dell’area: APRI L’UNITÀ apre la lezione, SISTEMA 3D mostra i pianeti.
- **Sistema:** un pianeta per unità, dall’orbita interna a quella esterna; gli altri pianeti sono di contorno.
- **Pianeta:** APRI L’UNITÀ o SCENDI IN SUPERFICIE. Le quattro stazioni aprono lezione, laboratorio, verifica e collegamenti dell’unità.
- **Esplorazione:** ESPLORA IL PIANETA avvicina la camera a specie e luoghi d’interesse; ogni scoperta si registra nella scheda «Esplorazione» del diario.
- I pulsanti di ritorno e Esc risalgono i livelli conservando rotazione e zoom. Le quattro stazioni si selezionano con S1–S4 o le etichette.

Trascina per ruotare; usa rotella o +/− per lo zoom. Su touch il primo tocco descrive, il secondo entra. Tab e Invio raggiungono sistemi, pianeti e controlli. Spazio sospende il movimento e rende immediati gli zoom.

Alta, bilanciata e ridotta mantengono sempre il milione nelle viste cosmiche: cambiano risoluzione della scena ed effetti, non la UI. Il numero casuale dei pianeti resta stabile nelle visite successive. I pianeti esplorabili usano mappe generate dalle loro carte d’identità; i corpi di contorno usano mappe NASA. I contenuti scientifici, il lettore, i quiz, i laboratori e il diario sono conservati.

Le catture in previews provengono dal replay dei comandi effettivi del renderer. Non sono fondali dell’app e non sono immagini IA. I file Blender in models sono modificabili ma non servono all’avvio. Per il metodo di collaudo e i limiti effettivi leggere docs/QA.md.

Le novità di ogni versione sono in `CHANGELOG.md`. Tutte le texture necessarie sono già incluse. Per gli originali NASA opzionali della 1.3.0, copiare solo la cartella sources/nasa nella cartella omonima di questa versione.
