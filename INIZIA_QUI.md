# Avvia GAIA 1.4.0

1. Estrai lo ZIP COMPLETO. Lo ZIP ORIGINALI_NASA è facoltativo per l’avvio: contiene i file originali di provenienza ; per ricostruire gli asset, copia la sua sottocartella sources/nasa nella cartella omonima di questa versione.
2. Usa Node.js 22 o successivo.
3. Su Windows apri `AVVIA_WINDOWS.bat`; in alternativa esegui `npm start` nella cartella del progetto.
4. Apri http://localhost:8000 in un browser con WebGL 2.

Non serve npm install. Il doppio clic su index.html non è sufficiente. Il primo caricamento prepara le geometrie locali dei tre biomi.

## Dalla galassia alla superficie

- **Galassia:** un milione di stelle 3D; 25 sono sistemi esplorabili. Passa il mouse su una stella evidenziata per la descrizione, fai un solo clic per entrare. Puoi anche usare ESPLORA IL SISTEMA.
- **Sistema:** da 5 a 12 pianeti, con quattro esplorabili. Passa su un pianeta per identificarlo; un clic su una destinazione esplorabile avvicina la camera. Gli altri mostrano una descrizione e restano senza accesso alla superficie.
- **Pianeta:** SCENDI ALLA STAZIONE apre il bioma. Echo 08 mostra Simbiosi; Echo 02 Marea; Echo 03 e 04 Esodo.
- I pulsanti di ritorno e Esc risalgono i livelli conservando rotazione e zoom. Le quattro stazioni si selezionano con S1–S4 o le etichette.

Trascina per ruotare; usa rotella o +/− per lo zoom. Su touch il primo tocco descrive, il secondo entra. Tab e Invio raggiungono sistemi, pianeti e controlli. Spazio sospende il movimento e rende immediati gli zoom.

Alta, bilanciata e ridotta mantengono sempre il milione nelle viste cosmiche: cambiano risoluzione della scena ed effetti, non la UI. Il numero casuale dei pianeti resta stabile nelle visite successive. Le mappe NASA ad alta risoluzione vengono caricate avvicinandosi al pianeta. I contenuti scientifici, il lettore, i quiz, i laboratori e il diario sono conservati.

Le catture in previews provengono dal replay dei comandi effettivi del renderer. Non sono fondali dell’app e non sono immagini IA. I file Blender in models sono modificabili ma non servono all’avvio. Per il metodo di collaudo e i limiti effettivi leggere docs/QA.md.

Novità 1.4.0: ambiente cosmico continuo, nebulose e polveri renderizzate in 3D, ammassi, asteroidi e comete. I controlli sono quelli precedenti. Tutte le texture necessarie sono già incluse. Per gli originali NASA opzionali della 1.3.0, copiare solo la cartella sources/nasa nella cartella omonima di questa versione.
