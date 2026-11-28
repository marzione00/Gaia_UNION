# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento e con la nave dell'esploratore sulla piazzola della base, in discesa con i getti e la polvere nella vista delle stazioni, a terra con la rampa aperta nelle altre due; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,31 ms | 1,38 ms | 110,3 ms | 67 / 98 | 1,14 milioni | 4287 |
| camera delle stazioni | bilanciato | 0,07 ms | 0,14 ms | 4,3 ms | 65 / 96 | 0,85 milioni | 3129 |
| camera delle stazioni | leggero | 0,06 ms | 0,15 ms | 2,0 ms | 62 / 85 | 0,65 milioni | 1968 |
| esploratore in corsa | dettaglio alto | 0,28 ms | 2,21 ms | 10,5 ms | 81 / 113 | 1,20 milioni | 4233 |
| esploratore in corsa | bilanciato | 0,23 ms | 2,04 ms | 7,1 ms | 79 / 111 | 0,92 milioni | 3077 |
| esploratore in corsa | leggero | 0,22 ms | 1,37 ms | 7,0 ms | 76 / 105 | 0,67 milioni | 1917 |
| rover a 1,3 km dalla base | dettaglio alto | 0,67 ms | 3,86 ms | 10,2 ms | 65 / 94 | 0,72 milioni | 2891 |
| rover a 1,3 km dalla base | bilanciato | 0,63 ms | 3,60 ms | 10,3 ms | 64 / 91 | 0,69 milioni | 2677 |
| rover a 1,3 km dalla base | leggero | 0,64 ms | 3,60 ms | 11,0 ms | 62 / 85 | 0,66 milioni | 2468 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Deriva genetica» (pianeta 89), con 2,44 ms in media (camera delle stazioni, dettaglio alto); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,20 milioni, e quello con più chiamate di disegno «Dagli zeri alla struttura di un polinomio» (pianeta 12), con 113. Con il dettaglio alto la preparazione richiede in media 0,31 ms con la camera delle stazioni, 0,28 ms con l'esploratore e 0,67 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie. Dalla 1.73.0 i siti della zona entro 1050 unità dalla camera hanno un modello semplificato, costruito uno per fotogramma a partire dal più vicino, e quello dettagliato entro 200 unità. Dalla 1.74.0 lo stesso vale per i luoghi rari, e i modelli semplificati di siti e luoghi rari di ogni quarto della zona sono uniti in una sola mesh: costano al più quattro chiamate di disegno, più una per ogni modello dettagliato entro 70 unità dalla camera.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie. Dalla 1.77.0 le tre griglie esterne del terreno, oltre 256 unità dal centro della vista, si costruiscono nei fotogrammi seguenti, 10 ms per fotogramma: da 16 a 45 fotogrammi, in mediana 21.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 167 ms | 240 ms | 563 ms |
| Maglie dei modelli | 224 ms | 317 ms | 621 ms |
| Terreno lontano, nei fotogrammi seguenti | 161 ms | 218 ms | 524 ms |
| Memoria delle maglie e delle istanze | 17,5 MiB | 19,5 MiB | 22,4 MiB |

La superficie più lunga da costruire è quella di «Oscillazioni armoniche» (pianeta 41), con 1000 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 22,4 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 5 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 171 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,14 / 3,9 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 5,48 / 38,5 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,55 / 2,7 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,41 / 1,5 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,90 / 2,5 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 3,77 / 4,5 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 3,4 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,19 ms · 63 | 0,53 ms · 77 | 0,90 ms · 60 | 0,66 milioni | 716 ms |
| 2 | 0,19 ms · 73 | 0,34 ms · 94 | 1,04 ms · 69 | 1,10 milioni | 919 ms |
| 3 | 0,54 ms · 60 | 0,36 ms · 69 | 0,86 ms · 55 | 0,51 milioni | 643 ms |
| 4 | 0,42 ms · 61 | 0,32 ms · 78 | 0,63 ms · 62 | 0,71 milioni | 648 ms |
| 5 | 0,34 ms · 58 | 0,28 ms · 73 | 0,61 ms · 57 | 0,59 milioni | 714 ms |
| 6 | 0,26 ms · 55 | 0,24 ms · 67 | 0,66 ms · 59 | 0,56 milioni | 578 ms |
| 7 | 0,19 ms · 84 | 0,29 ms · 106 | 0,95 ms · 80 | 1,03 milioni | 671 ms |
| 8 | 0,19 ms · 84 | 0,26 ms · 110 | 0,47 ms · 77 | 0,94 milioni | 631 ms |
| 9 | 0,27 ms · 86 | 0,15 ms · 98 | 0,67 ms · 79 | 1,04 milioni | 614 ms |
| 10 | 0,15 ms · 87 | 0,22 ms · 103 | 0,75 ms · 78 | 0,92 milioni | 434 ms |
| 11 | 0,32 ms · 46 | 0,31 ms · 59 | 0,91 ms · 45 | 0,41 milioni | 556 ms |
| 12 | 0,48 ms · 85 | 0,32 ms · 113 | 0,77 ms · 79 | 1,13 milioni | 736 ms |
| 13 | 0,39 ms · 56 | 0,24 ms · 67 | 1,01 ms · 52 | 0,54 milioni | 667 ms |
| 14 | 0,18 ms · 89 | 0,24 ms · 100 | 0,79 ms · 77 | 1,06 milioni | 704 ms |
| 15 | 0,12 ms · 59 | 0,30 ms · 79 | 0,74 ms · 66 | 0,57 milioni | 583 ms |
| 16 | 0,42 ms · 47 | 0,28 ms · 60 | 0,64 ms · 49 | 0,42 milioni | 588 ms |
| 17 | 0,18 ms · 64 | 0,41 ms · 76 | 1,03 ms · 67 | 0,73 milioni | 624 ms |
| 18 | 0,08 ms · 82 | 0,22 ms · 103 | 0,96 ms · 84 | 1,00 milioni | 615 ms |
| 19 | 0,52 ms · 60 | 0,36 ms · 79 | 0,35 ms · 64 | 0,65 milioni | 516 ms |
| 20 | 0,16 ms · 49 | 0,12 ms · 60 | 0,54 ms · 56 | 0,45 milioni | 497 ms |
| 21 | 0,25 ms · 83 | 0,26 ms · 95 | 0,91 ms · 75 | 0,93 milioni | 734 ms |
| 22 | 0,28 ms · 63 | 0,21 ms · 75 | 0,64 ms · 63 | 0,68 milioni | 495 ms |
| 23 | 0,14 ms · 89 | 0,24 ms · 105 | 0,81 ms · 85 | 1,17 milioni | 613 ms |
| 24 | 0,05 ms · 63 | 0,21 ms · 76 | 0,64 ms · 64 | 0,68 milioni | 501 ms |
| 25 | 0,27 ms · 88 | 0,25 ms · 99 | 1,14 ms · 76 | 1,05 milioni | 681 ms |
| 26 | 0,23 ms · 55 | 0,18 ms · 59 | 0,52 ms · 51 | 0,43 milioni | 500 ms |
| 27 | 0,54 ms · 59 | 0,33 ms · 70 | 0,74 ms · 60 | 0,57 milioni | 447 ms |
| 28 | 0,18 ms · 65 | 0,24 ms · 81 | 0,77 ms · 69 | 0,67 milioni | 566 ms |
| 29 | 0,21 ms · 84 | 0,44 ms · 96 | 1,26 ms · 71 | 1,07 milioni | 735 ms |
| 30 | 0,31 ms · 86 | 0,42 ms · 104 | 0,78 ms · 79 | 1,00 milioni | 646 ms |
| 31 | 0,52 ms · 61 | 0,51 ms · 70 | 1,01 ms · 61 | 0,57 milioni | 458 ms |
| 32 | 0,29 ms · 69 | 0,38 ms · 86 | 0,76 ms · 74 | 0,74 milioni | 751 ms |
| 33 | 0,04 ms · 60 | 0,21 ms · 76 | 0,31 ms · 65 | 0,57 milioni | 551 ms |
| 34 | 0,22 ms · 78 | 0,41 ms · 97 | 0,78 ms · 80 | 0,92 milioni | 604 ms |
| 35 | 0,42 ms · 63 | 0,20 ms · 76 | 1,09 ms · 69 | 0,62 milioni | 556 ms |
| 36 | 0,19 ms · 76 | 0,45 ms · 86 | 0,70 ms · 69 | 0,74 milioni | 577 ms |
| 37 | 0,12 ms · 89 | 0,24 ms · 104 | 0,22 ms · 70 | 0,97 milioni | 528 ms |
| 38 | 0,28 ms · 48 | 0,20 ms · 62 | 0,51 ms · 52 | 0,41 milioni | 513 ms |
| 39 | 0,39 ms · 75 | 0,64 ms · 96 | 0,46 ms · 54 | 0,92 milioni | 614 ms |
| 40 | 0,08 ms · 58 | 0,31 ms · 76 | 1,28 ms · 59 | 0,74 milioni | 711 ms |
| 41 | 0,26 ms · 79 | 0,28 ms · 92 | 0,95 ms · 75 | 0,87 milioni | 1000 ms |
| 42 | 0,36 ms · 62 | 0,26 ms · 74 | 0,78 ms · 64 | 0,65 milioni | 551 ms |
| 43 | 0,20 ms · 60 | 0,21 ms · 80 | 0,60 ms · 66 | 0,67 milioni | 459 ms |
| 44 | 0,18 ms · 71 | 0,27 ms · 83 | 1,03 ms · 74 | 0,84 milioni | 484 ms |
| 45 | 0,23 ms · 58 | 0,18 ms · 77 | 0,60 ms · 61 | 0,59 milioni | 482 ms |
| 46 | 0,07 ms · 86 | 0,23 ms · 99 | 0,29 ms · 79 | 1,00 milioni | 727 ms |
| 47 | 0,25 ms · 68 | 0,27 ms · 86 | 0,82 ms · 66 | 0,78 milioni | 533 ms |
| 48 | 0,23 ms · 59 | 0,27 ms · 67 | 0,19 ms · 62 | 0,55 milioni | 694 ms |
| 49 | 0,10 ms · 85 | 0,31 ms · 98 | 0,35 ms · 79 | 0,97 milioni | 604 ms |
| 50 | 0,12 ms · 62 | 0,19 ms · 76 | 0,67 ms · 65 | 0,68 milioni | 601 ms |
| 51 | 0,23 ms · 85 | 0,43 ms · 95 | 0,33 ms · 51 | 0,97 milioni | 929 ms |
| 52 | 0,34 ms · 54 | 0,21 ms · 61 | 0,64 ms · 55 | 0,49 milioni | 579 ms |
| 53 | 0,25 ms · 46 | 0,33 ms · 59 | 0,54 ms · 52 | 0,40 milioni | 549 ms |
| 54 | 0,23 ms · 90 | 0,28 ms · 108 | 1,26 ms · 82 | 1,14 milioni | 647 ms |
| 55 | 0,14 ms · 61 | 0,26 ms · 76 | 0,60 ms · 65 | 0,67 milioni | 477 ms |
| 56 | 0,37 ms · 62 | 0,51 ms · 80 | 0,61 ms · 70 | 0,58 milioni | 496 ms |
| 57 | 1,87 ms · 44 | 0,27 ms · 54 | 0,65 ms · 45 | 0,41 milioni | 829 ms |
| 58 | 0,11 ms · 62 | 0,21 ms · 85 | 0,76 ms · 65 | 0,73 milioni | 598 ms |
| 59 | 0,40 ms · 85 | 0,33 ms · 96 | 0,57 ms · 71 | 1,10 milioni | 766 ms |
| 60 | 0,24 ms · 88 | 0,47 ms · 98 | 0,65 ms · 69 | 1,03 milioni | 761 ms |
| 61 | 0,03 ms · 63 | 0,19 ms · 68 | 0,57 ms · 61 | 0,57 milioni | 580 ms |
| 62 | 0,12 ms · 45 | 0,18 ms · 57 | 0,57 ms · 44 | 0,41 milioni | 491 ms |
| 63 | 0,23 ms · 63 | 0,21 ms · 75 | 0,76 ms · 58 | 0,58 milioni | 560 ms |
| 64 | 0,29 ms · 84 | 0,24 ms · 97 | 0,60 ms · 80 | 1,02 milioni | 502 ms |
| 65 | 0,21 ms · 53 | 0,19 ms · 61 | 0,52 ms · 54 | 0,42 milioni | 518 ms |
| 66 | 1,58 ms · 90 | 0,33 ms · 108 | 0,33 ms · 77 | 1,10 milioni | 560 ms |
| 67 | 0,25 ms · 47 | 0,18 ms · 62 | 0,49 ms · 50 | 0,43 milioni | 561 ms |
| 68 | 0,22 ms · 55 | 0,16 ms · 71 | 0,59 ms · 58 | 0,69 milioni | 574 ms |
| 69 | 0,18 ms · 83 | 0,27 ms · 94 | 0,62 ms · 73 | 1,05 milioni | 639 ms |
| 70 | 0,13 ms · 66 | 0,28 ms · 78 | 0,39 ms · 70 | 0,80 milioni | 440 ms |
| 71 | 0,08 ms · 67 | 0,36 ms · 79 | 0,57 ms · 70 | 0,74 milioni | 666 ms |
| 72 | 0,30 ms · 47 | 0,19 ms · 64 | 0,77 ms · 50 | 0,42 milioni | 649 ms |
| 73 | 0,22 ms · 86 | 0,31 ms · 105 | 0,88 ms · 80 | 1,03 milioni | 526 ms |
| 74 | 0,36 ms · 64 | 0,25 ms · 81 | 0,27 ms · 62 | 0,71 milioni | 513 ms |
| 75 | 0,08 ms · 74 | 0,27 ms · 97 | 1,10 ms · 71 | 0,86 milioni | 650 ms |
| 76 | 0,27 ms · 65 | 0,29 ms · 84 | 0,40 ms · 71 | 0,79 milioni | 737 ms |
| 77 | 0,24 ms · 64 | 0,21 ms · 79 | 0,55 ms · 71 | 0,65 milioni | 576 ms |
| 78 | 0,19 ms · 68 | 0,23 ms · 86 | 0,52 ms · 70 | 0,78 milioni | 649 ms |
| 79 | 0,38 ms · 63 | 0,31 ms · 79 | 0,59 ms · 63 | 0,68 milioni | 515 ms |
| 80 | 0,17 ms · 88 | 0,31 ms · 108 | 0,56 ms · 90 | 1,05 milioni | 585 ms |
| 81 | 0,26 ms · 44 | 0,21 ms · 64 | 0,62 ms · 49 | 0,40 milioni | 567 ms |
| 82 | 0,12 ms · 74 | 0,23 ms · 89 | 0,60 ms · 65 | 0,76 milioni | 608 ms |
| 83 | 0,22 ms · 56 | 0,24 ms · 68 | 0,69 ms · 54 | 0,68 milioni | 552 ms |
| 84 | 0,28 ms · 98 | 0,29 ms · 113 | 0,50 ms · 94 | 1,20 milioni | 572 ms |
| 85 | 0,23 ms · 55 | 0,18 ms · 65 | 0,24 ms · 59 | 0,50 milioni | 616 ms |
| 86 | 0,17 ms · 60 | 0,26 ms · 81 | 0,61 ms · 67 | 0,63 milioni | 420 ms |
| 87 | 0,31 ms · 46 | 0,22 ms · 55 | 0,55 ms · 49 | 0,42 milioni | 658 ms |
| 88 | 0,10 ms · 65 | 0,22 ms · 79 | 0,63 ms · 67 | 0,70 milioni | 515 ms |
| 89 | 2,44 ms · 54 | 0,29 ms · 60 | 0,52 ms · 58 | 0,50 milioni | 690 ms |
| 90 | 0,30 ms · 80 | 0,42 ms · 98 | 0,62 ms · 71 | 0,84 milioni | 599 ms |
| 91 | 0,27 ms · 61 | 0,22 ms · 79 | 0,76 ms · 65 | 0,67 milioni | 546 ms |
| 92 | 0,21 ms · 48 | 0,21 ms · 60 | 0,55 ms · 54 | 0,48 milioni | 586 ms |
| 93 | 0,21 ms · 61 | 0,21 ms · 78 | 0,78 ms · 63 | 0,61 milioni | 503 ms |
| 94 | 0,29 ms · 62 | 0,45 ms · 75 | 0,45 ms · 60 | 0,65 milioni | 505 ms |
| 95 | 0,16 ms · 69 | 0,25 ms · 78 | 0,50 ms · 61 | 0,81 milioni | 496 ms |
| 96 | 0,25 ms · 47 | 0,17 ms · 53 | 0,55 ms · 49 | 0,41 milioni | 634 ms |
| 97 | 0,22 ms · 59 | 0,28 ms · 64 | 0,54 ms · 55 | 0,52 milioni | 539 ms |
| 98 | 0,22 ms · 59 | 0,23 ms · 69 | 0,78 ms · 62 | 0,58 milioni | 487 ms |
| 99 | 0,46 ms · 50 | 0,23 ms · 62 | 0,72 ms · 51 | 0,42 milioni | 535 ms |
| 100 | 0,43 ms · 85 | 0,24 ms · 101 | 0,71 ms · 85 | 1,06 milioni | 550 ms |
| 101 | 2,35 ms · 47 | 0,54 ms · 60 | 0,49 ms · 46 | 0,43 milioni | 527 ms |
| 102 | 0,26 ms · 47 | 0,18 ms · 57 | 0,63 ms · 46 | 0,41 milioni | 613 ms |
| 103 | 0,25 ms · 65 | 0,23 ms · 79 | 0,65 ms · 70 | 0,80 milioni | 446 ms |
| 104 | 0,08 ms · 81 | 0,23 ms · 99 | 0,34 ms · 84 | 1,04 milioni | 668 ms |
| 105 | 0,28 ms · 89 | 0,25 ms · 113 | 0,62 ms · 81 | 1,06 milioni | 529 ms |
| 106 | 0,11 ms · 68 | 0,25 ms · 79 | 0,83 ms · 68 | 1,02 milioni | 447 ms |
| 107 | 0,15 ms · 79 | 0,25 ms · 97 | 0,76 ms · 52 | 1,11 milioni | 889 ms |
| 108 | 0,33 ms · 82 | 0,31 ms · 104 | 0,68 ms · 81 | 0,92 milioni | 549 ms |
| 109 | 0,33 ms · 60 | 0,20 ms · 63 | 0,23 ms · 58 | 0,54 milioni | 601 ms |
| 110 | 0,19 ms · 51 | 0,20 ms · 61 | 0,31 ms · 53 | 0,59 milioni | 587 ms |
| 111 | 0,42 ms · 75 | 0,24 ms · 97 | 0,68 ms · 74 | 0,89 milioni | 669 ms |
| 112 | 0,15 ms · 70 | 0,33 ms · 92 | 0,91 ms · 70 | 0,89 milioni | 704 ms |
| 113 | 0,26 ms · 48 | 0,21 ms · 65 | 0,14 ms · 55 | 0,51 milioni | 478 ms |
| 114 | 0,31 ms · 46 | 0,19 ms · 59 | 0,58 ms · 51 | 0,50 milioni | 488 ms |
| 115 | 0,33 ms · 63 | 0,44 ms · 75 | 0,55 ms · 60 | 0,65 milioni | 504 ms |
| 116 | 0,37 ms · 87 | 0,29 ms · 111 | 0,63 ms · 77 | 1,08 milioni | 576 ms |
| 117 | 0,23 ms · 78 | 0,26 ms · 92 | 1,55 ms · 77 | 0,83 milioni | 660 ms |
| 118 | 0,37 ms · 57 | 0,21 ms · 71 | 0,59 ms · 64 | 0,58 milioni | 622 ms |
| 119 | 0,17 ms · 48 | 0,27 ms · 58 | 0,64 ms · 46 | 0,41 milioni | 642 ms |
| 120 | 0,16 ms · 57 | 0,25 ms · 74 | 0,61 ms · 55 | 0,64 milioni | 478 ms |
| 121 | 0,36 ms · 79 | 0,27 ms · 99 | 0,71 ms · 83 | 1,08 milioni | 553 ms |
| 122 | 0,43 ms · 67 | 0,43 ms · 82 | 0,86 ms · 61 | 0,69 milioni | 493 ms |
| 123 | 0,30 ms · 55 | 0,22 ms · 67 | 0,65 ms · 57 | 0,48 milioni | 533 ms |
| 124 | 0,22 ms · 71 | 0,28 ms · 82 | 0,91 ms · 67 | 0,81 milioni | 460 ms |
| 125 | 0,29 ms · 81 | 0,48 ms · 101 | 0,56 ms · 72 | 0,91 milioni | 722 ms |
