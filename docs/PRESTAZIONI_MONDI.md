# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.30GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,05 ms | 0,10 ms | 5,1 ms | 63 / 97 | 1,11 milioni | 4275 |
| camera delle stazioni | bilanciato | 0,04 ms | 0,08 ms | 3,8 ms | 61 / 95 | 0,81 milioni | 3109 |
| camera delle stazioni | leggero | 0,04 ms | 0,08 ms | 4,3 ms | 58 / 84 | 0,61 milioni | 1944 |
| esploratore in corsa | dettaglio alto | 0,18 ms | 1,71 ms | 7,2 ms | 80 / 114 | 1,18 milioni | 4255 |
| esploratore in corsa | bilanciato | 0,17 ms | 1,47 ms | 6,2 ms | 78 / 110 | 0,89 milioni | 3094 |
| esploratore in corsa | leggero | 0,17 ms | 1,61 ms | 8,2 ms | 75 / 106 | 0,65 milioni | 1935 |
| rover a 1,3 km dalla base | dettaglio alto | 0,44 ms | 2,81 ms | 8,5 ms | 63 / 94 | 0,70 milioni | 2902 |
| rover a 1,3 km dalla base | bilanciato | 0,43 ms | 2,80 ms | 6,7 ms | 62 / 91 | 0,67 milioni | 2688 |
| rover a 1,3 km dalla base | leggero | 0,44 ms | 2,80 ms | 8,0 ms | 60 / 85 | 0,64 milioni | 2479 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Particelle cariche nei campi magnetici» (pianeta 117), con 1,21 ms in media (rover a 1,3 km dalla base, leggero); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,18 milioni, e quello con più chiamate di disegno «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 114. Con il dettaglio alto la preparazione richiede in media 0,05 ms con la camera delle stazioni, 0,18 ms con l'esploratore e 0,44 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie. Dalla 1.73.0 i siti della zona entro 1050 unità dalla camera hanno un modello semplificato, costruito uno per fotogramma a partire dal più vicino, e quello dettagliato entro 200 unità; ogni sito è un gruppo di una sola istanza, con una chiamata di disegno.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 125 ms | 190 ms | 424 ms |
| Maglie dei modelli | 319 ms | 402 ms | 741 ms |
| Memoria delle maglie e delle istanze | 16,7 MiB | 18,8 MiB | 21,7 MiB |

La superficie più lunga da costruire è quella di «Tecnofirme, SETI ed equazione di Drake» (pianeta 110), con 1017 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 21,7 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 3 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 148 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,11 / 4,2 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 4,03 / 30,2 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,45 / 4,0 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,32 / 1,3 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,66 / 1,8 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 3,12 / 3,8 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 1,3 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,10 ms · 59 | 0,32 ms · 75 | 0,58 ms · 60 | 0,64 milioni | 729 ms |
| 2 | 0,12 ms · 69 | 0,24 ms · 93 | 0,66 ms · 67 | 1,08 milioni | 848 ms |
| 3 | 0,05 ms · 57 | 0,16 ms · 69 | 0,44 ms · 53 | 0,49 milioni | 649 ms |
| 4 | 0,16 ms · 57 | 0,25 ms · 78 | 0,69 ms · 56 | 0,69 milioni | 646 ms |
| 5 | 0,19 ms · 54 | 0,21 ms · 72 | 0,47 ms · 57 | 0,57 milioni | 617 ms |
| 6 | 0,02 ms · 51 | 0,14 ms · 65 | 0,41 ms · 56 | 0,54 milioni | 580 ms |
| 7 | 0,09 ms · 78 | 0,27 ms · 103 | 0,66 ms · 78 | 1,01 milioni | 677 ms |
| 8 | 0,05 ms · 79 | 0,19 ms · 108 | 0,36 ms · 73 | 0,92 milioni | 547 ms |
| 9 | 0,06 ms · 83 | 0,11 ms · 98 | 0,50 ms · 78 | 1,02 milioni | 668 ms |
| 10 | 0,06 ms · 84 | 0,21 ms · 102 | 0,65 ms · 79 | 0,91 milioni | 578 ms |
| 11 | 0,02 ms · 44 | 0,18 ms · 57 | 0,39 ms · 44 | 0,39 milioni | 684 ms |
| 12 | 0,11 ms · 83 | 0,22 ms · 113 | 0,54 ms · 76 | 1,11 milioni | 575 ms |
| 13 | 0,04 ms · 54 | 0,17 ms · 67 | 0,43 ms · 49 | 0,51 milioni | 579 ms |
| 14 | 0,06 ms · 83 | 0,21 ms · 97 | 0,66 ms · 73 | 1,02 milioni | 700 ms |
| 15 | 0,03 ms · 56 | 0,16 ms · 78 | 0,52 ms · 64 | 0,56 milioni | 566 ms |
| 16 | 0,03 ms · 44 | 0,15 ms · 61 | 0,46 ms · 46 | 0,40 milioni | 708 ms |
| 17 | 0,06 ms · 60 | 0,18 ms · 74 | 0,44 ms · 68 | 0,71 milioni | 609 ms |
| 18 | 0,04 ms · 77 | 0,18 ms · 101 | 0,50 ms · 81 | 0,98 milioni | 583 ms |
| 19 | 0,04 ms · 54 | 0,16 ms · 76 | 0,26 ms · 62 | 0,62 milioni | 512 ms |
| 20 | 0,03 ms · 45 | 0,12 ms · 59 | 0,37 ms · 54 | 0,43 milioni | 632 ms |
| 21 | 0,05 ms · 80 | 0,16 ms · 93 | 0,53 ms · 74 | 0,91 milioni | 679 ms |
| 22 | 0,03 ms · 60 | 0,16 ms · 74 | 0,46 ms · 57 | 0,64 milioni | 579 ms |
| 23 | 0,05 ms · 85 | 0,17 ms · 104 | 0,75 ms · 84 | 1,15 milioni | 533 ms |
| 24 | 0,04 ms · 59 | 0,17 ms · 76 | 0,50 ms · 61 | 0,67 milioni | 554 ms |
| 25 | 0,05 ms · 85 | 0,20 ms · 98 | 0,41 ms · 79 | 1,03 milioni | 565 ms |
| 26 | 0,02 ms · 50 | 0,13 ms · 58 | 0,36 ms · 49 | 0,41 milioni | 506 ms |
| 27 | 0,05 ms · 55 | 0,16 ms · 69 | 0,39 ms · 60 | 0,54 milioni | 553 ms |
| 28 | 0,06 ms · 59 | 0,25 ms · 78 | 0,50 ms · 64 | 0,64 milioni | 585 ms |
| 29 | 0,08 ms · 80 | 0,18 ms · 95 | 0,57 ms · 71 | 1,05 milioni | 694 ms |
| 30 | 0,16 ms · 81 | 0,19 ms · 100 | 0,54 ms · 77 | 0,96 milioni | 723 ms |
| 31 | 0,03 ms · 60 | 0,17 ms · 70 | 0,44 ms · 58 | 0,55 milioni | 527 ms |
| 32 | 0,05 ms · 63 | 0,17 ms · 84 | 0,39 ms · 72 | 0,70 milioni | 544 ms |
| 33 | 0,06 ms · 56 | 0,25 ms · 74 | 0,16 ms · 65 | 0,56 milioni | 573 ms |
| 34 | 0,06 ms · 76 | 0,17 ms · 98 | 0,50 ms · 78 | 0,91 milioni | 523 ms |
| 35 | 0,04 ms · 59 | 0,17 ms · 76 | 0,40 ms · 69 | 0,60 milioni | 516 ms |
| 36 | 0,07 ms · 75 | 0,17 ms · 88 | 0,47 ms · 69 | 0,72 milioni | 516 ms |
| 37 | 0,06 ms · 85 | 0,18 ms · 104 | 0,59 ms · 67 | 0,95 milioni | 537 ms |
| 38 | 0,02 ms · 45 | 0,13 ms · 62 | 0,37 ms · 52 | 0,40 milioni | 815 ms |
| 39 | 0,04 ms · 71 | 0,18 ms · 95 | 0,38 ms · 49 | 0,89 milioni | 657 ms |
| 40 | 0,02 ms · 54 | 0,15 ms · 75 | 0,57 ms · 57 | 0,73 milioni | 640 ms |
| 41 | 0,07 ms · 75 | 0,24 ms · 91 | 0,70 ms · 72 | 0,86 milioni | 768 ms |
| 42 | 0,05 ms · 60 | 0,23 ms · 75 | 0,63 ms · 59 | 0,63 milioni | 577 ms |
| 43 | 0,04 ms · 54 | 0,16 ms · 76 | 0,42 ms · 64 | 0,65 milioni | 558 ms |
| 44 | 0,05 ms · 67 | 0,16 ms · 82 | 0,49 ms · 72 | 0,80 milioni | 480 ms |
| 45 | 0,02 ms · 51 | 0,15 ms · 72 | 0,43 ms · 57 | 0,57 milioni | 602 ms |
| 46 | 0,06 ms · 82 | 0,18 ms · 98 | 0,19 ms · 77 | 0,97 milioni | 680 ms |
| 47 | 0,05 ms · 70 | 0,18 ms · 90 | 0,55 ms · 65 | 0,75 milioni | 580 ms |
| 48 | 0,02 ms · 55 | 0,17 ms · 66 | 0,12 ms · 58 | 0,52 milioni | 623 ms |
| 49 | 0,06 ms · 82 | 0,17 ms · 96 | 0,19 ms · 74 | 0,95 milioni | 561 ms |
| 50 | 0,04 ms · 62 | 0,15 ms · 77 | 0,40 ms · 65 | 0,67 milioni | 557 ms |
| 51 | 0,11 ms · 83 | 0,23 ms · 95 | 0,25 ms · 50 | 0,96 milioni | 813 ms |
| 52 | 0,03 ms · 50 | 0,16 ms · 62 | 0,46 ms · 54 | 0,47 milioni | 698 ms |
| 53 | 0,02 ms · 40 | 0,23 ms · 55 | 0,44 ms · 51 | 0,38 milioni | 764 ms |
| 54 | 0,08 ms · 86 | 0,28 ms · 107 | 0,44 ms · 80 | 1,11 milioni | 570 ms |
| 55 | 0,04 ms · 57 | 0,17 ms · 74 | 0,40 ms · 63 | 0,66 milioni | 526 ms |
| 56 | 0,03 ms · 57 | 0,21 ms · 78 | 0,42 ms · 66 | 0,56 milioni | 628 ms |
| 57 | 0,01 ms · 42 | 0,13 ms · 56 | 0,35 ms · 44 | 0,40 milioni | 777 ms |
| 58 | 0,09 ms · 55 | 0,23 ms · 82 | 0,51 ms · 61 | 0,71 milioni | 580 ms |
| 59 | 0,06 ms · 82 | 0,17 ms · 96 | 0,38 ms · 74 | 1,08 milioni | 623 ms |
| 60 | 0,05 ms · 86 | 0,30 ms · 98 | 0,43 ms · 70 | 1,02 milioni | 610 ms |
| 61 | 0,03 ms · 59 | 0,17 ms · 67 | 0,42 ms · 60 | 0,55 milioni | 643 ms |
| 62 | 0,01 ms · 43 | 0,13 ms · 57 | 0,43 ms · 39 | 0,40 milioni | 580 ms |
| 63 | 0,02 ms · 56 | 0,13 ms · 71 | 0,38 ms · 55 | 0,54 milioni | 494 ms |
| 64 | 0,06 ms · 79 | 0,19 ms · 96 | 0,46 ms · 80 | 1,00 milioni | 684 ms |
| 65 | 0,02 ms · 51 | 0,13 ms · 62 | 0,38 ms · 48 | 0,40 milioni | 589 ms |
| 66 | 0,08 ms · 87 | 0,19 ms · 107 | 0,44 ms · 78 | 1,09 milioni | 510 ms |
| 67 | 0,02 ms · 45 | 0,18 ms · 62 | 0,39 ms · 50 | 0,41 milioni | 774 ms |
| 68 | 0,03 ms · 49 | 0,10 ms · 68 | 0,41 ms · 51 | 0,67 milioni | 506 ms |
| 69 | 0,07 ms · 78 | 0,42 ms · 91 | 0,49 ms · 71 | 1,04 milioni | 656 ms |
| 70 | 0,05 ms · 62 | 0,17 ms · 77 | 0,47 ms · 73 | 0,77 milioni | 532 ms |
| 71 | 0,04 ms · 64 | 0,16 ms · 78 | 0,53 ms · 70 | 0,72 milioni | 556 ms |
| 72 | 0,02 ms · 46 | 0,16 ms · 65 | 0,45 ms · 48 | 0,41 milioni | 894 ms |
| 73 | 0,08 ms · 82 | 0,19 ms · 104 | 0,55 ms · 73 | 1,01 milioni | 613 ms |
| 74 | 0,03 ms · 60 | 0,15 ms · 81 | 0,16 ms · 60 | 0,69 milioni | 539 ms |
| 75 | 0,08 ms · 73 | 0,22 ms · 99 | 0,68 ms · 72 | 0,85 milioni | 817 ms |
| 76 | 0,03 ms · 60 | 0,14 ms · 83 | 0,27 ms · 70 | 0,76 milioni | 527 ms |
| 77 | 0,02 ms · 60 | 0,14 ms · 79 | 0,46 ms · 69 | 0,63 milioni | 512 ms |
| 78 | 0,04 ms · 67 | 0,17 ms · 87 | 0,36 ms · 71 | 0,76 milioni | 675 ms |
| 79 | 0,05 ms · 60 | 0,16 ms · 79 | 0,40 ms · 64 | 0,66 milioni | 522 ms |
| 80 | 0,04 ms · 85 | 0,16 ms · 107 | 0,34 ms · 92 | 1,03 milioni | 611 ms |
| 81 | 0,02 ms · 39 | 0,18 ms · 61 | 0,46 ms · 49 | 0,38 milioni | 862 ms |
| 82 | 0,04 ms · 72 | 0,16 ms · 89 | 0,44 ms · 70 | 0,75 milioni | 540 ms |
| 83 | 0,03 ms · 53 | 0,15 ms · 68 | 0,37 ms · 50 | 0,66 milioni | 598 ms |
| 84 | 0,09 ms · 97 | 0,21 ms · 114 | 0,31 ms · 94 | 1,18 milioni | 820 ms |
| 85 | 0,02 ms · 46 | 0,13 ms · 59 | 0,16 ms · 55 | 0,48 milioni | 668 ms |
| 86 | 0,04 ms · 54 | 0,17 ms · 77 | 0,41 ms · 62 | 0,61 milioni | 507 ms |
| 87 | 0,02 ms · 45 | 0,15 ms · 58 | 0,42 ms · 49 | 0,41 milioni | 693 ms |
| 88 | 0,09 ms · 64 | 0,23 ms · 81 | 0,43 ms · 71 | 0,69 milioni | 545 ms |
| 89 | 0,02 ms · 49 | 0,15 ms · 59 | 0,39 ms · 53 | 0,48 milioni | 612 ms |
| 90 | 0,05 ms · 74 | 0,18 ms · 95 | 0,49 ms · 71 | 0,81 milioni | 790 ms |
| 91 | 0,05 ms · 57 | 0,23 ms · 78 | 0,43 ms · 62 | 0,65 milioni | 612 ms |
| 92 | 0,02 ms · 44 | 0,14 ms · 59 | 0,43 ms · 52 | 0,45 milioni | 598 ms |
| 93 | 0,03 ms · 53 | 0,14 ms · 74 | 0,41 ms · 59 | 0,59 milioni | 625 ms |
| 94 | 0,03 ms · 58 | 0,15 ms · 75 | 0,29 ms · 57 | 0,63 milioni | 568 ms |
| 95 | 0,07 ms · 65 | 0,33 ms · 77 | 0,50 ms · 61 | 0,80 milioni | 652 ms |
| 96 | 0,02 ms · 46 | 0,20 ms · 54 | 0,39 ms · 50 | 0,39 milioni | 739 ms |
| 97 | 0,02 ms · 54 | 0,14 ms · 62 | 0,38 ms · 53 | 0,48 milioni | 541 ms |
| 98 | 0,05 ms · 54 | 0,17 ms · 68 | 0,44 ms · 61 | 0,55 milioni | 658 ms |
| 99 | 0,03 ms · 46 | 0,15 ms · 61 | 0,42 ms · 48 | 0,40 milioni | 891 ms |
| 100 | 0,06 ms · 81 | 0,19 ms · 99 | 0,49 ms · 85 | 1,03 milioni | 593 ms |
| 101 | 0,01 ms · 44 | 0,15 ms · 63 | 0,40 ms · 42 | 0,42 milioni | 694 ms |
| 102 | 0,01 ms · 42 | 0,13 ms · 55 | 0,43 ms · 40 | 0,39 milioni | 903 ms |
| 103 | 0,06 ms · 62 | 0,17 ms · 79 | 0,41 ms · 71 | 0,78 milioni | 510 ms |
| 104 | 0,06 ms · 79 | 0,19 ms · 100 | 0,21 ms · 84 | 1,03 milioni | 709 ms |
| 105 | 0,06 ms · 83 | 0,20 ms · 110 | 0,49 ms · 78 | 1,02 milioni | 559 ms |
| 106 | 0,04 ms · 65 | 0,17 ms · 79 | 0,60 ms · 65 | 0,99 milioni | 557 ms |
| 107 | 0,08 ms · 75 | 0,22 ms · 95 | 0,58 ms · 47 | 1,09 milioni | 920 ms |
| 108 | 0,05 ms · 77 | 0,22 ms · 102 | 0,46 ms · 76 | 0,90 milioni | 676 ms |
| 109 | 0,02 ms · 55 | 0,14 ms · 62 | 0,15 ms · 55 | 0,50 milioni | 733 ms |
| 110 | 0,02 ms · 45 | 0,15 ms · 59 | 0,26 ms · 50 | 0,56 milioni | 1017 ms |
| 111 | 0,08 ms · 71 | 0,16 ms · 93 | 0,45 ms · 75 | 0,86 milioni | 645 ms |
| 112 | 0,13 ms · 67 | 0,27 ms · 92 | 0,69 ms · 69 | 0,88 milioni | 892 ms |
| 113 | 0,01 ms · 44 | 0,21 ms · 64 | 0,10 ms · 52 | 0,49 milioni | 629 ms |
| 114 | 0,02 ms · 46 | 0,14 ms · 60 | 0,41 ms · 49 | 0,47 milioni | 568 ms |
| 115 | 0,03 ms · 58 | 0,14 ms · 73 | 0,39 ms · 57 | 0,63 milioni | 542 ms |
| 116 | 0,11 ms · 83 | 0,28 ms · 110 | 0,57 ms · 73 | 1,05 milioni | 718 ms |
| 117 | 0,06 ms · 73 | 0,19 ms · 88 | 0,78 ms · 74 | 0,81 milioni | 848 ms |
| 118 | 0,02 ms · 51 | 0,15 ms · 68 | 0,44 ms · 62 | 0,55 milioni | 588 ms |
| 119 | 0,02 ms · 44 | 0,23 ms · 58 | 0,46 ms · 43 | 0,40 milioni | 756 ms |
| 120 | 0,06 ms · 50 | 0,17 ms · 70 | 0,45 ms · 52 | 0,62 milioni | 548 ms |
| 121 | 0,06 ms · 74 | 0,17 ms · 98 | 0,49 ms · 78 | 1,06 milioni | 580 ms |
| 122 | 0,05 ms · 64 | 0,17 ms · 82 | 0,41 ms · 56 | 0,66 milioni | 663 ms |
| 123 | 0,02 ms · 50 | 0,13 ms · 65 | 0,40 ms · 51 | 0,46 milioni | 545 ms |
| 124 | 0,05 ms · 68 | 0,16 ms · 81 | 0,41 ms · 67 | 0,79 milioni | 537 ms |
| 125 | 0,06 ms · 78 | 0,28 ms · 99 | 0,39 ms · 71 | 0,89 milioni | 695 ms |
