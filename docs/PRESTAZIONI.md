# Prestazioni misurate della serie «Galassia viva»

Questo documento è generato da `node scripts/prestazioni.mjs`; `tests/galassia.test.mjs` ne controlla la struttura e i limiti. Ognuno dei 30 sistemi è stato disegnato dal codice del sito con la vista di «CENTRA» (distanza 34, inclinazione 0,48), dopo il tempo necessario a costruire i modelli delle stazioni e delle navi; seguono 240 fotogrammi da 1/60 di secondo misurati. Al posto della scheda grafica c'è un contatore che applica le regole di `src/renderer.js`, per cui chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.30GHz, Node v22.23.4; il seme della sessione è fissato a 20261122, quindi due esecuzioni sulla stessa macchina disegnano la stessa scena.

I tempi della scheda grafica dipendono dalla scheda e dalla risoluzione e si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo: il pannello in basso a destra riporta fotogrammi al secondo, tempo di disegno sul processore, chiamate di disegno e triangoli (`src/ui/diagnostics.js`).

## Un fotogramma di sistema

| Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) | Mezzi di servizio in vista |
|---|---|---|---|---|---|---|---|
| dettaglio alto | 1,03 ms | 2,34 ms | 11,4 ms | 99 / 116 | 0,70 milioni | 1585 | 102–161 |
| bilanciato | 0,71 ms | 2,01 ms | 24,8 ms | 99 / 116 | 0,65 milioni | 1406 | 68–106 |
| leggero | 0,46 ms | 1,61 ms | 8,0 ms | 99 / 116 | 0,60 milioni | 1266 | 40–62 |

Il tempo medio è la media sui sistemi del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Con il dettaglio alto il sistema 7 è il più lento da preparare (1,29 ms in media), il 16 il più ricco di triangoli (0,70 milioni) e il 13 quello con più chiamate di disegno (116). I mezzi di servizio in vista sono quelli disegnati nel fotogramma: restano fuori i rimorchiatori senza una stazione da servire e i caccia di scorta quando nessun convoglio da accompagnare è nel sistema. Un fotogramma a 60 al secondo dura 16,7 ms: la preparazione della scena ne occupa in media il 6 % con il dettaglio alto e il 3 % con la grafica leggera, e il resto rimane alla scheda grafica e all'interfaccia.

Le chiamate di disegno restano le stesse alle tre impostazioni, perché ogni gruppo di navi o di mezzi della stessa classe è una sola chiamata con istanze: la grafica più leggera riduce le istanze e i triangoli e lascia invariato il numero delle chiamate.

I limiti controllati dai test per un fotogramma di sistema sono 160 chiamate di disegno, 1,20 milioni di triangoli e 2500 istanze.

## Oggetto seguito e pannello «Che cosa succede»

Sistema 13, dettaglio alto: la camera segue l'oggetto e il pannello è ricalcolato a ogni fotogramma, come nel sito.

| Oggetto seguito | Tempo medio | 95° percentile | Chiamate di disegno (massimo) |
|---|---|---|---|
| nessuno | 0,95 ms | 2,32 ms | 116 |
| stella | 0,82 ms | 1,66 ms | 95 |
| pianeta | 1,17 ms | 2,36 ms | 119 |
| cometa | 0,81 ms | 1,89 ms | 117 |
| cintura | 1,02 ms | 2,34 ms | 117 |
| stazione | 0,81 ms | 1,85 ms | 119 |
| nave | 0,39 ms | 1,00 ms | 79 |
| servizio | 0,78 ms | 1,92 ms | 113 |

Il calcolo della posizione di una cometa con l'equazione di Keplero richiede 0,6 µs. Le stelle cadenti di un fotogramma sulla superficie di un pianeta con aria costano 1,1 µs fuori dagli sciami e 3,5 µs durante uno sciame, quando se ne vedono in media 1,13 per fotogramma contro 0,18.

## Cinture, comete e sciami

Le maglie delle cinture si costruiscono alla prima visita di un sistema e restano in memoria per gli ultimi 3 sistemi disegnati. Un sistema ha da 680 a 1556 rocce nelle sue cinture, cioè da 24.187 a 55.234 vertici (3,4 MiB al massimo), costruiti in 14,4–44,6 ms. Con tre sistemi in memoria i vertici delle cinture sono al più 165.702. Cinture, comete e scie dei 30 sistemi si calcolano in 3,9 ms all'apertura della galassia; ogni cometa porta 480 granuli della sua scia, disegnati in una sola chiamata. Gli sciami di un sistema si calcolano la prima volta che servono, in 1,2–4,9 ms.

| Sistema | Cinture | Rocce | Vertici | Costruzione | Comete | Sciami |
|---|---|---|---|---|---|---|
| 0 | 2 | 1464 | 52.014 | 37,2 ms | 1 | 2 |
| 1 | 2 | 1552 | 55.094 | 36,8 ms | 2 | 1 |
| 2 | 2 | 1556 | 55.234 | 37,6 ms | 1 | 0 |
| 3 | 1 | 712 | 25.307 | 16,1 ms | 1 | 1 |
| 4 | 2 | 1440 | 51.174 | 33,1 ms | 2 | 3 |
| 5 | 1 | 876 | 31.047 | 18,7 ms | 1 | 0 |
| 6 | 2 | 1352 | 48.094 | 30,5 ms | 1 | 2 |
| 7 | 1 | 688 | 24.467 | 14,5 ms | 2 | 1 |
| 8 | 1 | 704 | 25.027 | 14,8 ms | 1 | 1 |
| 9 | 2 | 1408 | 50.054 | 31,1 ms | 1 | 1 |
| 10 | 2 | 1332 | 47.394 | 29,2 ms | 2 | 0 |
| 11 | 2 | 1296 | 46.134 | 27,1 ms | 1 | 0 |
| 12 | 1 | 720 | 25.587 | 16,1 ms | 1 | 1 |
| 13 | 2 | 1416 | 50.334 | 31,9 ms | 2 | 2 |
| 14 | 1 | 864 | 30.627 | 18,6 ms | 1 | 0 |
| 15 | 2 | 1456 | 51.734 | 33,2 ms | 1 | 0 |
| 16 | 2 | 1428 | 50.754 | 31,0 ms | 2 | 1 |
| 17 | 1 | 696 | 24.747 | 14,4 ms | 1 | 0 |
| 18 | 2 | 1260 | 44.874 | 27,6 ms | 1 | 2 |
| 19 | 1 | 840 | 29.787 | 17,9 ms | 2 | 1 |
| 20 | 1 | 680 | 24.187 | 15,0 ms | 1 | 0 |
| 21 | 2 | 1432 | 50.894 | 34,4 ms | 1 | 2 |
| 22 | 2 | 1380 | 49.074 | 34,0 ms | 2 | 0 |
| 23 | 2 | 1244 | 44.314 | 28,5 ms | 1 | 0 |
| 24 | 1 | 752 | 26.707 | 17,9 ms | 1 | 0 |
| 25 | 1 | 796 | 28.247 | 19,8 ms | 2 | 2 |
| 26 | 1 | 776 | 27.547 | 23,1 ms | 1 | 1 |
| 27 | 1 | 736 | 26.147 | 22,2 ms | 1 | 0 |
| 28 | 2 | 1428 | 50.754 | 44,6 ms | 2 | 2 |
| 29 | 1 | 836 | 29.647 | 25,6 ms | 1 | 0 |

## Sistemi uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma, per ognuna delle tre impostazioni.

| Sistema | Alto | Bilanciato | Leggero | Stazioni | Navi | Servizio in vista (alto) |
|---|---|---|---|---|---|---|
| 0 | 1,28 ms · 112 | 0,65 ms · 112 | 0,42 ms · 112 | 17 | 24 | 135 |
| 1 | 1,13 ms · 98 | 0,51 ms · 98 | 0,39 ms · 98 | 15 | 22 | 117 |
| 2 | 1,23 ms · 100 | 1,02 ms · 100 | 0,44 ms · 100 | 22 | 29 | 155 |
| 3 | 1,21 ms · 93 | 1,03 ms · 93 | 0,46 ms · 93 | 21 | 37 | 133 |
| 4 | 1,11 ms · 106 | 0,84 ms · 106 | 0,50 ms · 106 | 20 | 26 | 145 |
| 5 | 0,86 ms · 90 | 0,78 ms · 90 | 0,44 ms · 90 | 19 | 28 | 124 |
| 6 | 0,89 ms · 98 | 0,52 ms · 98 | 0,34 ms · 98 | 14 | 20 | 113 |
| 7 | 1,29 ms · 83 | 0,66 ms · 83 | 0,45 ms · 83 | 21 | 31 | 144 |
| 8 | 0,87 ms · 93 | 0,86 ms · 93 | 0,54 ms · 93 | 19 | 26 | 127 |
| 9 | 1,09 ms · 110 | 0,71 ms · 110 | 0,59 ms · 110 | 17 | 23 | 131 |
| 10 | 0,90 ms · 76 | 0,58 ms · 76 | 0,33 ms · 76 | 15 | 19 | 118 |
| 11 | 1,06 ms · 96 | 0,94 ms · 96 | 0,48 ms · 96 | 22 | 34 | 152 |
| 12 | 0,93 ms · 95 | 0,63 ms · 95 | 0,55 ms · 95 | 20 | 25 | 127 |
| 13 | 1,10 ms · 116 | 0,66 ms · 116 | 0,51 ms · 116 | 18 | 27 | 131 |
| 14 | 0,77 ms · 99 | 0,51 ms · 99 | 0,57 ms · 99 | 16 | 23 | 105 |
| 15 | 0,95 ms · 97 | 0,53 ms · 97 | 0,37 ms · 97 | 15 | 28 | 118 |
| 16 | 1,06 ms · 106 | 0,77 ms · 106 | 0,63 ms · 106 | 23 | 39 | 158 |
| 17 | 1,07 ms · 112 | 0,94 ms · 112 | 0,51 ms · 112 | 22 | 36 | 141 |
| 18 | 0,82 ms · 98 | 0,49 ms · 98 | 0,39 ms · 98 | 17 | 22 | 131 |
| 19 | 0,90 ms · 102 | 0,56 ms · 102 | 0,39 ms · 102 | 15 | 21 | 121 |
| 20 | 1,17 ms · 85 | 0,79 ms · 85 | 0,45 ms · 85 | 22 | 29 | 138 |
| 21 | 1,01 ms · 95 | 0,63 ms · 95 | 0,48 ms · 95 | 20 | 31 | 142 |
| 22 | 0,96 ms · 107 | 0,65 ms · 107 | 0,50 ms · 107 | 18 | 26 | 141 |
| 23 | 1,02 ms · 97 | 0,68 ms · 97 | 0,36 ms · 97 | 16 | 24 | 122 |
| 24 | 1,01 ms · 90 | 0,81 ms · 90 | 0,37 ms · 90 | 15 | 28 | 102 |
| 25 | 1,15 ms · 109 | 0,74 ms · 109 | 0,56 ms · 109 | 23 | 35 | 161 |
| 26 | 1,12 ms · 112 | 0,80 ms · 112 | 0,49 ms · 112 | 22 | 36 | 138 |
| 27 | 0,82 ms · 95 | 0,54 ms · 95 | 0,38 ms · 95 | 18 | 24 | 120 |
| 28 | 0,88 ms · 96 | 0,56 ms · 96 | 0,39 ms · 96 | 17 | 26 | 133 |
| 29 | 1,15 ms · 97 | 0,83 ms · 97 | 0,63 ms · 94 | 25 | 37 | 159 |
