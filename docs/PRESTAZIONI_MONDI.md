# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.30GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,05 ms | 0,11 ms | 6,6 ms | 56 / 87 | 1,10 milioni | 4269 |
| camera delle stazioni | bilanciato | 0,04 ms | 0,09 ms | 6,6 ms | 54 / 85 | 0,80 milioni | 3103 |
| camera delle stazioni | leggero | 0,04 ms | 0,09 ms | 7,6 ms | 51 / 74 | 0,59 milioni | 1938 |
| esploratore in corsa | dettaglio alto | 0,17 ms | 1,42 ms | 5,6 ms | 72 / 104 | 1,16 milioni | 4250 |
| esploratore in corsa | bilanciato | 0,17 ms | 1,15 ms | 6,6 ms | 70 / 102 | 0,87 milioni | 3089 |
| esploratore in corsa | leggero | 0,17 ms | 1,56 ms | 10,1 ms | 66 / 95 | 0,63 milioni | 1930 |
| rover a 1,3 km dalla base | dettaglio alto | 0,46 ms | 2,89 ms | 7,6 ms | 55 / 83 | 0,69 milioni | 2957 |
| rover a 1,3 km dalla base | bilanciato | 0,45 ms | 2,89 ms | 9,1 ms | 54 / 80 | 0,66 milioni | 2740 |
| rover a 1,3 km dalla base | leggero | 0,45 ms | 2,87 ms | 11,1 ms | 52 / 74 | 0,63 milioni | 2528 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Particelle cariche nei campi magnetici» (pianeta 117), con 1,35 ms in media (rover a 1,3 km dalla base, leggero); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,16 milioni, e quello con più chiamate di disegno «Titano, la chimica senza acqua» (pianeta 105), con 104. Con il dettaglio alto la preparazione richiede in media 0,05 ms con la camera delle stazioni, 0,17 ms con l'esploratore e 0,46 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 121 ms | 193 ms | 485 ms |
| Maglie dei modelli | 310 ms | 416 ms | 788 ms |
| Memoria delle maglie e delle istanze | 16,7 MiB | 18,8 MiB | 21,7 MiB |

La superficie più lunga da costruire è quella di «Atmosfere degli esopianeti e JWST» (pianeta 107), con 1055 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 21,7 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 3 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 139 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,10 / 2,1 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 3,58 / 30,3 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,41 / 6,0 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,30 / 1,2 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,73 / 2,0 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 2,49 / 3,6 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 0,5 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,19 ms · 53 | 0,26 ms · 69 | 0,56 ms · 52 | 0,64 milioni | 678 ms |
| 2 | 0,23 ms · 63 | 0,23 ms · 85 | 0,77 ms · 62 | 1,07 milioni | 881 ms |
| 3 | 0,05 ms · 49 | 0,16 ms · 59 | 0,46 ms · 47 | 0,47 milioni | 695 ms |
| 4 | 0,14 ms · 50 | 0,25 ms · 68 | 0,46 ms · 53 | 0,68 milioni | 602 ms |
| 5 | 0,07 ms · 47 | 0,20 ms · 63 | 0,65 ms · 48 | 0,56 milioni | 628 ms |
| 6 | 0,03 ms · 44 | 0,14 ms · 57 | 0,39 ms · 49 | 0,53 milioni | 609 ms |
| 7 | 0,06 ms · 73 | 0,17 ms · 96 | 0,54 ms · 69 | 1,00 milioni | 616 ms |
| 8 | 0,09 ms · 73 | 0,23 ms · 100 | 0,39 ms · 66 | 0,91 milioni | 733 ms |
| 9 | 0,05 ms · 75 | 0,09 ms · 88 | 0,68 ms · 68 | 1,00 milioni | 820 ms |
| 10 | 0,09 ms · 76 | 0,29 ms · 94 | 0,49 ms · 66 | 0,89 milioni | 604 ms |
| 11 | 0,02 ms · 35 | 0,17 ms · 48 | 0,41 ms · 37 | 0,38 milioni | 779 ms |
| 12 | 0,12 ms · 74 | 0,25 ms · 103 | 0,71 ms · 67 | 1,09 milioni | 675 ms |
| 13 | 0,03 ms · 45 | 0,17 ms · 58 | 0,45 ms · 43 | 0,50 milioni | 625 ms |
| 14 | 0,05 ms · 78 | 0,17 ms · 92 | 0,57 ms · 68 | 1,01 milioni | 759 ms |
| 15 | 0,03 ms · 48 | 0,15 ms · 69 | 0,47 ms · 55 | 0,54 milioni | 546 ms |
| 16 | 0,01 ms · 36 | 0,14 ms · 49 | 0,45 ms · 40 | 0,39 milioni | 680 ms |
| 17 | 0,13 ms · 54 | 0,20 ms · 69 | 0,47 ms · 57 | 0,71 milioni | 627 ms |
| 18 | 0,05 ms · 72 | 0,17 ms · 94 | 0,54 ms · 74 | 0,97 milioni | 621 ms |
| 19 | 0,03 ms · 49 | 0,16 ms · 68 | 0,16 ms · 54 | 0,61 milioni | 497 ms |
| 20 | 0,02 ms · 38 | 0,08 ms · 51 | 0,36 ms · 46 | 0,42 milioni | 638 ms |
| 21 | 0,06 ms · 72 | 0,16 ms · 85 | 0,52 ms · 66 | 0,89 milioni | 720 ms |
| 22 | 0,02 ms · 52 | 0,13 ms · 64 | 0,41 ms · 52 | 0,63 milioni | 497 ms |
| 23 | 0,09 ms · 78 | 0,18 ms · 95 | 0,52 ms · 72 | 1,13 milioni | 558 ms |
| 24 | 0,03 ms · 53 | 0,17 ms · 68 | 0,55 ms · 57 | 0,65 milioni | 650 ms |
| 25 | 0,05 ms · 77 | 0,17 ms · 89 | 0,44 ms · 65 | 1,01 milioni | 511 ms |
| 26 | 0,02 ms · 44 | 0,18 ms · 49 | 0,44 ms · 40 | 0,40 milioni | 605 ms |
| 27 | 0,08 ms · 48 | 0,26 ms · 60 | 0,84 ms · 48 | 0,53 milioni | 770 ms |
| 28 | 0,05 ms · 54 | 0,18 ms · 73 | 0,53 ms · 57 | 0,63 milioni | 647 ms |
| 29 | 0,08 ms · 74 | 0,23 ms · 87 | 0,74 ms · 62 | 1,04 milioni | 853 ms |
| 30 | 0,08 ms · 75 | 0,28 ms · 94 | 0,57 ms · 70 | 0,95 milioni | 659 ms |
| 31 | 0,02 ms · 50 | 0,14 ms · 61 | 0,44 ms · 53 | 0,54 milioni | 504 ms |
| 32 | 0,06 ms · 58 | 0,19 ms · 77 | 0,39 ms · 64 | 0,69 milioni | 599 ms |
| 33 | 0,03 ms · 49 | 0,15 ms · 66 | 0,12 ms · 53 | 0,54 milioni | 531 ms |
| 34 | 0,06 ms · 68 | 0,19 ms · 88 | 0,56 ms · 71 | 0,90 milioni | 592 ms |
| 35 | 0,03 ms · 52 | 0,16 ms · 67 | 0,44 ms · 59 | 0,59 milioni | 604 ms |
| 36 | 0,04 ms · 66 | 0,15 ms · 78 | 0,49 ms · 61 | 0,71 milioni | 504 ms |
| 37 | 0,05 ms · 78 | 0,16 ms · 95 | 0,47 ms · 61 | 0,93 milioni | 500 ms |
| 38 | 0,02 ms · 37 | 0,14 ms · 53 | 0,37 ms · 41 | 0,38 milioni | 830 ms |
| 39 | 0,05 ms · 64 | 0,16 ms · 87 | 0,35 ms · 47 | 0,88 milioni | 607 ms |
| 40 | 0,02 ms · 48 | 0,13 ms · 67 | 0,62 ms · 50 | 0,72 milioni | 590 ms |
| 41 | 0,09 ms · 68 | 0,20 ms · 82 | 0,71 ms · 72 | 0,84 milioni | 813 ms |
| 42 | 0,03 ms · 51 | 0,14 ms · 66 | 0,57 ms · 55 | 0,61 milioni | 494 ms |
| 43 | 0,07 ms · 49 | 0,22 ms · 70 | 0,41 ms · 56 | 0,64 milioni | 638 ms |
| 44 | 0,07 ms · 61 | 0,18 ms · 74 | 0,51 ms · 65 | 0,79 milioni | 675 ms |
| 45 | 0,02 ms · 47 | 0,13 ms · 68 | 0,40 ms · 53 | 0,56 milioni | 472 ms |
| 46 | 0,05 ms · 76 | 0,16 ms · 92 | 0,18 ms · 69 | 0,96 milioni | 640 ms |
| 47 | 0,05 ms · 57 | 0,17 ms · 74 | 0,55 ms · 56 | 0,73 milioni | 533 ms |
| 48 | 0,03 ms · 48 | 0,13 ms · 58 | 0,12 ms · 52 | 0,51 milioni | 546 ms |
| 49 | 0,06 ms · 74 | 0,17 ms · 89 | 0,18 ms · 66 | 0,93 milioni | 519 ms |
| 50 | 0,02 ms · 51 | 0,15 ms · 66 | 0,42 ms · 51 | 0,65 milioni | 517 ms |
| 51 | 0,10 ms · 75 | 0,20 ms · 84 | 0,25 ms · 43 | 0,94 milioni | 702 ms |
| 52 | 0,02 ms · 43 | 0,15 ms · 52 | 0,49 ms · 44 | 0,46 milioni | 780 ms |
| 53 | 0,02 ms · 35 | 0,17 ms · 50 | 0,40 ms · 41 | 0,38 milioni | 716 ms |
| 54 | 0,10 ms · 79 | 0,23 ms · 99 | 0,59 ms · 71 | 1,10 milioni | 618 ms |
| 55 | 0,07 ms · 50 | 0,17 ms · 65 | 0,42 ms · 52 | 0,65 milioni | 564 ms |
| 56 | 0,03 ms · 51 | 0,18 ms · 71 | 0,72 ms · 58 | 0,55 milioni | 701 ms |
| 57 | 0,01 ms · 33 | 0,13 ms · 45 | 0,39 ms · 35 | 0,38 milioni | 840 ms |
| 58 | 0,04 ms · 51 | 0,15 ms · 75 | 0,52 ms · 57 | 0,70 milioni | 503 ms |
| 59 | 0,23 ms · 74 | 0,17 ms · 86 | 0,36 ms · 59 | 1,06 milioni | 732 ms |
| 60 | 0,05 ms · 78 | 0,17 ms · 89 | 0,41 ms · 61 | 1,00 milioni | 684 ms |
| 61 | 0,02 ms · 53 | 0,14 ms · 61 | 0,38 ms · 49 | 0,55 milioni | 542 ms |
| 62 | 0,02 ms · 34 | 0,17 ms · 47 | 0,47 ms · 35 | 0,39 milioni | 747 ms |
| 63 | 0,03 ms · 52 | 0,14 ms · 66 | 0,60 ms · 48 | 0,54 milioni | 578 ms |
| 64 | 0,08 ms · 73 | 0,20 ms · 89 | 0,47 ms · 69 | 0,99 milioni | 642 ms |
| 65 | 0,01 ms · 42 | 0,14 ms · 51 | 0,43 ms · 43 | 0,39 milioni | 646 ms |
| 66 | 0,09 ms · 79 | 0,23 ms · 98 | 0,25 ms · 68 | 1,07 milioni | 663 ms |
| 67 | 0,01 ms · 36 | 0,14 ms · 52 | 0,39 ms · 39 | 0,39 milioni | 746 ms |
| 68 | 0,03 ms · 44 | 0,11 ms · 61 | 0,48 ms · 50 | 0,66 milioni | 607 ms |
| 69 | 0,06 ms · 72 | 0,20 ms · 85 | 0,78 ms · 62 | 1,03 milioni | 551 ms |
| 70 | 0,03 ms · 56 | 0,14 ms · 70 | 0,25 ms · 59 | 0,76 milioni | 517 ms |
| 71 | 0,06 ms · 57 | 0,17 ms · 71 | 0,56 ms · 58 | 0,71 milioni | 596 ms |
| 72 | 0,02 ms · 36 | 0,14 ms · 53 | 0,69 ms · 39 | 0,39 milioni | 929 ms |
| 73 | 0,08 ms · 75 | 0,19 ms · 96 | 0,60 ms · 67 | 0,99 milioni | 650 ms |
| 74 | 0,03 ms · 53 | 0,17 ms · 72 | 0,17 ms · 52 | 0,68 milioni | 738 ms |
| 75 | 0,07 ms · 65 | 0,29 ms · 88 | 0,67 ms · 63 | 0,83 milioni | 872 ms |
| 76 | 0,05 ms · 54 | 0,17 ms · 75 | 0,27 ms · 61 | 0,75 milioni | 570 ms |
| 77 | 0,04 ms · 53 | 0,19 ms · 71 | 0,32 ms · 57 | 0,62 milioni | 665 ms |
| 78 | 0,04 ms · 58 | 0,15 ms · 75 | 0,47 ms · 56 | 0,74 milioni | 654 ms |
| 79 | 0,06 ms · 52 | 0,18 ms · 69 | 0,72 ms · 50 | 0,64 milioni | 603 ms |
| 80 | 0,05 ms · 78 | 0,19 ms · 99 | 0,59 ms · 79 | 1,01 milioni | 712 ms |
| 81 | 0,03 ms · 33 | 0,15 ms · 55 | 0,47 ms · 40 | 0,38 milioni | 751 ms |
| 82 | 0,03 ms · 64 | 0,16 ms · 80 | 0,43 ms · 55 | 0,73 milioni | 496 ms |
| 83 | 0,04 ms · 45 | 0,15 ms · 59 | 0,39 ms · 43 | 0,65 milioni | 636 ms |
| 84 | 0,06 ms · 87 | 0,21 ms · 103 | 0,34 ms · 83 | 1,16 milioni | 800 ms |
| 85 | 0,01 ms · 44 | 0,13 ms · 57 | 0,17 ms · 52 | 0,47 milioni | 607 ms |
| 86 | 0,05 ms · 49 | 0,18 ms · 71 | 0,42 ms · 58 | 0,60 milioni | 602 ms |
| 87 | 0,02 ms · 35 | 0,15 ms · 46 | 0,43 ms · 38 | 0,39 milioni | 619 ms |
| 88 | 0,16 ms · 55 | 0,39 ms · 71 | 0,44 ms · 53 | 0,67 milioni | 668 ms |
| 89 | 0,03 ms · 43 | 0,14 ms · 51 | 0,35 ms · 45 | 0,47 milioni | 619 ms |
| 90 | 0,09 ms · 70 | 0,19 ms · 91 | 0,41 ms · 61 | 0,80 milioni | 627 ms |
| 91 | 0,03 ms · 50 | 0,14 ms · 70 | 0,64 ms · 53 | 0,63 milioni | 467 ms |
| 92 | 0,02 ms · 37 | 0,15 ms · 52 | 0,42 ms · 42 | 0,44 milioni | 554 ms |
| 93 | 0,03 ms · 50 | 0,15 ms · 69 | 0,42 ms · 55 | 0,58 milioni | 563 ms |
| 94 | 0,03 ms · 51 | 0,13 ms · 66 | 0,22 ms · 51 | 0,62 milioni | 496 ms |
| 95 | 0,06 ms · 58 | 0,18 ms · 68 | 0,41 ms · 52 | 0,78 milioni | 687 ms |
| 96 | 0,01 ms · 36 | 0,12 ms · 45 | 0,35 ms · 37 | 0,38 milioni | 696 ms |
| 97 | 0,05 ms · 48 | 0,22 ms · 56 | 0,36 ms · 45 | 0,48 milioni | 721 ms |
| 98 | 0,03 ms · 48 | 0,16 ms · 60 | 0,43 ms · 51 | 0,54 milioni | 607 ms |
| 99 | 0,01 ms · 39 | 0,12 ms · 53 | 0,38 ms · 40 | 0,39 milioni | 544 ms |
| 100 | 0,05 ms · 74 | 0,16 ms · 90 | 0,43 ms · 76 | 1,02 milioni | 554 ms |
| 101 | 0,01 ms · 36 | 0,12 ms · 50 | 0,37 ms · 39 | 0,40 milioni | 641 ms |
| 102 | 0,01 ms · 36 | 0,15 ms · 47 | 0,41 ms · 36 | 0,38 milioni | 900 ms |
| 103 | 0,06 ms · 54 | 0,17 ms · 70 | 0,38 ms · 55 | 0,76 milioni | 555 ms |
| 104 | 0,05 ms · 71 | 0,18 ms · 89 | 0,22 ms · 74 | 1,01 milioni | 632 ms |
| 105 | 0,07 ms · 78 | 0,20 ms · 104 | 0,51 ms · 69 | 1,01 milioni | 655 ms |
| 106 | 0,05 ms · 58 | 0,17 ms · 72 | 0,66 ms · 59 | 0,97 milioni | 632 ms |
| 107 | 0,12 ms · 68 | 0,23 ms · 88 | 0,59 ms · 45 | 1,07 milioni | 1055 ms |
| 108 | 0,06 ms · 71 | 0,19 ms · 95 | 0,48 ms · 70 | 0,88 milioni | 900 ms |
| 109 | 0,03 ms · 49 | 0,14 ms · 55 | 0,15 ms · 47 | 0,49 milioni | 606 ms |
| 110 | 0,02 ms · 40 | 0,13 ms · 52 | 0,23 ms · 42 | 0,55 milioni | 955 ms |
| 111 | 0,07 ms · 64 | 0,16 ms · 87 | 0,46 ms · 63 | 0,85 milioni | 620 ms |
| 112 | 0,09 ms · 60 | 0,21 ms · 84 | 0,65 ms · 60 | 0,86 milioni | 745 ms |
| 113 | 0,03 ms · 37 | 0,14 ms · 57 | 0,08 ms · 45 | 0,48 milioni | 572 ms |
| 114 | 0,01 ms · 35 | 0,15 ms · 49 | 0,43 ms · 40 | 0,47 milioni | 610 ms |
| 115 | 0,03 ms · 52 | 0,13 ms · 64 | 0,37 ms · 52 | 0,62 milioni | 557 ms |
| 116 | 0,20 ms · 76 | 0,32 ms · 102 | 0,51 ms · 70 | 1,04 milioni | 637 ms |
| 117 | 0,05 ms · 67 | 0,19 ms · 82 | 0,83 ms · 66 | 0,80 milioni | 773 ms |
| 118 | 0,04 ms · 46 | 0,23 ms · 63 | 0,50 ms · 53 | 0,54 milioni | 819 ms |
| 119 | 0,01 ms · 37 | 0,16 ms · 49 | 0,51 ms · 37 | 0,38 milioni | 797 ms |
| 120 | 0,06 ms · 46 | 0,18 ms · 66 | 0,47 ms · 48 | 0,61 milioni | 574 ms |
| 121 | 0,07 ms · 68 | 0,19 ms · 89 | 0,57 ms · 72 | 1,04 milioni | 622 ms |
| 122 | 0,04 ms · 56 | 0,18 ms · 72 | 0,59 ms · 53 | 0,64 milioni | 919 ms |
| 123 | 0,02 ms · 44 | 0,16 ms · 59 | 0,43 ms · 46 | 0,45 milioni | 606 ms |
| 124 | 0,04 ms · 60 | 0,18 ms · 72 | 0,41 ms · 55 | 0,78 milioni | 582 ms |
| 125 | 0,04 ms · 70 | 0,19 ms · 89 | 0,43 ms · 60 | 0,87 milioni | 825 ms |
