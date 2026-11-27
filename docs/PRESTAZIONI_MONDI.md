# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,04 ms | 0,08 ms | 7,7 ms | 54 / 84 | 1,06 milioni | 3839 |
| camera delle stazioni | bilanciato | 0,03 ms | 0,06 ms | 2,4 ms | 52 / 82 | 0,77 milioni | 2798 |
| camera delle stazioni | leggero | 0,03 ms | 0,05 ms | 0,7 ms | 49 / 71 | 0,56 milioni | 1757 |
| esploratore in corsa | dettaglio alto | 0,18 ms | 1,66 ms | 9,1 ms | 69 / 101 | 1,06 milioni | 3840 |
| esploratore in corsa | bilanciato | 0,16 ms | 0,66 ms | 6,5 ms | 67 / 99 | 0,81 milioni | 2799 |
| esploratore in corsa | leggero | 0,15 ms | 0,66 ms | 11,0 ms | 64 / 92 | 0,59 milioni | 1758 |
| rover a 1,3 km dalla base | dettaglio alto | 0,39 ms | 2,59 ms | 14,1 ms | 39 / 46 | 0,37 milioni | 370 |
| rover a 1,3 km dalla base | bilanciato | 0,36 ms | 2,53 ms | 7,3 ms | 39 / 46 | 0,37 milioni | 370 |
| rover a 1,3 km dalla base | leggero | 0,38 ms | 2,56 ms | 8,3 ms | 39 / 46 | 0,37 milioni | 370 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Induzione, circuiti oscillanti e radio» (pianeta 119), con 0,92 ms in media (rover a 1,3 km dalla base, dettaglio alto); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,06 milioni, e quello con più chiamate di disegno «Titano, la chimica senza acqua» (pianeta 105), con 101. Con il dettaglio alto la preparazione richiede in media 0,04 ms con la camera delle stazioni, 0,18 ms con l'esploratore e 0,39 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 114 ms | 208 ms | 417 ms |
| Maglie dei modelli | 210 ms | 301 ms | 557 ms |
| Memoria delle maglie e delle istanze | 16,6 MiB | 18,7 MiB | 21,5 MiB |

La superficie più lunga da costruire è quella di «Atmosfere degli esopianeti e JWST» (pianeta 107), con 910 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 21,5 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 2868 modelli dei mondi, ricavati in 5 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 172 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1388 | 144 / 564 / 1403 | 60 / 128 / 376 | 0,12 / 1,8 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 4,51 / 26,7 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,46 / 2,4 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,29 / 1,5 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,62 / 2,4 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 3,93 / 4,4 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 0,5 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,10 ms · 50 | 0,22 ms · 66 | 0,41 ms · 38 | 0,62 milioni | 578 ms |
| 2 | 0,20 ms · 62 | 0,27 ms · 84 | 0,73 ms · 42 | 1,03 milioni | 789 ms |
| 3 | 0,08 ms · 46 | 0,23 ms · 56 | 0,39 ms · 40 | 0,46 milioni | 459 ms |
| 4 | 0,10 ms · 50 | 0,22 ms · 68 | 0,38 ms · 36 | 0,66 milioni | 566 ms |
| 5 | 0,09 ms · 46 | 0,19 ms · 62 | 0,34 ms · 37 | 0,54 milioni | 602 ms |
| 6 | 0,02 ms · 41 | 0,13 ms · 54 | 0,26 ms · 34 | 0,52 milioni | 467 ms |
| 7 | 0,07 ms · 71 | 0,19 ms · 94 | 0,41 ms · 45 | 0,96 milioni | 589 ms |
| 8 | 0,05 ms · 70 | 0,17 ms · 97 | 0,38 ms · 43 | 0,85 milioni | 530 ms |
| 9 | 0,16 ms · 70 | 0,17 ms · 84 | 0,37 ms · 41 | 0,97 milioni | 576 ms |
| 10 | 0,04 ms · 73 | 0,33 ms · 89 | 0,33 ms · 44 | 0,83 milioni | 455 ms |
| 11 | 0,04 ms · 33 | 0,26 ms · 46 | 0,28 ms · 35 | 0,38 milioni | 423 ms |
| 12 | 0,06 ms · 71 | 0,18 ms · 100 | 0,44 ms · 44 | 1,03 milioni | 605 ms |
| 13 | 0,01 ms · 43 | 0,12 ms · 56 | 0,28 ms · 37 | 0,49 milioni | 480 ms |
| 14 | 0,04 ms · 76 | 0,25 ms · 88 | 0,45 ms · 43 | 0,99 milioni | 682 ms |
| 15 | 0,02 ms · 44 | 0,19 ms · 66 | 0,50 ms · 41 | 0,54 milioni | 531 ms |
| 16 | 0,02 ms · 34 | 0,15 ms · 47 | 0,44 ms · 37 | 0,38 milioni | 512 ms |
| 17 | 0,06 ms · 51 | 0,22 ms · 65 | 0,33 ms · 38 | 0,66 milioni | 489 ms |
| 18 | 0,05 ms · 71 | 0,29 ms · 92 | 0,41 ms · 44 | 0,94 milioni | 580 ms |
| 19 | 0,03 ms · 44 | 0,15 ms · 63 | 0,43 ms · 37 | 0,60 milioni | 372 ms |
| 20 | 0,02 ms · 36 | 0,16 ms · 49 | 0,34 ms · 34 | 0,41 milioni | 501 ms |
| 21 | 0,04 ms · 70 | 0,18 ms · 83 | 0,45 ms · 39 | 0,85 milioni | 850 ms |
| 22 | 0,03 ms · 49 | 0,16 ms · 61 | 0,32 ms · 39 | 0,60 milioni | 452 ms |
| 23 | 0,11 ms · 75 | 0,15 ms · 92 | 0,34 ms · 42 | 1,06 milioni | 529 ms |
| 24 | 0,02 ms · 51 | 0,13 ms · 66 | 0,41 ms · 40 | 0,64 milioni | 469 ms |
| 25 | 0,06 ms · 75 | 0,27 ms · 87 | 0,33 ms · 40 | 0,96 milioni | 513 ms |
| 26 | 0,02 ms · 42 | 0,16 ms · 47 | 0,33 ms · 38 | 0,40 milioni | 435 ms |
| 27 | 0,02 ms · 45 | 0,13 ms · 57 | 0,42 ms · 34 | 0,51 milioni | 420 ms |
| 28 | 0,03 ms · 53 | 0,16 ms · 72 | 0,34 ms · 40 | 0,62 milioni | 515 ms |
| 29 | 0,03 ms · 72 | 0,30 ms · 85 | 0,54 ms · 39 | 1,00 milioni | 821 ms |
| 30 | 0,03 ms · 72 | 0,16 ms · 90 | 0,47 ms · 40 | 0,92 milioni | 388 ms |
| 31 | 0,02 ms · 48 | 0,27 ms · 58 | 0,30 ms · 39 | 0,53 milioni | 411 ms |
| 32 | 0,04 ms · 55 | 0,16 ms · 72 | 0,34 ms · 39 | 0,67 milioni | 474 ms |
| 33 | 0,03 ms · 47 | 0,13 ms · 64 | 0,31 ms · 40 | 0,53 milioni | 479 ms |
| 34 | 0,09 ms · 67 | 0,19 ms · 86 | 0,43 ms · 43 | 0,86 milioni | 512 ms |
| 35 | 0,03 ms · 52 | 0,15 ms · 67 | 0,34 ms · 42 | 0,58 milioni | 566 ms |
| 36 | 0,03 ms · 63 | 0,18 ms · 75 | 0,36 ms · 40 | 0,67 milioni | 484 ms |
| 37 | 0,03 ms · 77 | 0,14 ms · 93 | 0,39 ms · 39 | 0,89 milioni | 415 ms |
| 38 | 0,03 ms · 35 | 0,13 ms · 51 | 0,26 ms · 39 | 0,38 milioni | 406 ms |
| 39 | 0,04 ms · 63 | 0,17 ms · 86 | 0,35 ms · 37 | 0,85 milioni | 511 ms |
| 40 | 0,02 ms · 47 | 0,14 ms · 66 | 0,43 ms · 33 | 0,71 milioni | 484 ms |
| 41 | 0,04 ms · 68 | 0,19 ms · 80 | 0,57 ms · 40 | 0,81 milioni | 779 ms |
| 42 | 0,02 ms · 50 | 0,16 ms · 64 | 0,39 ms · 39 | 0,60 milioni | 438 ms |
| 43 | 0,02 ms · 48 | 0,15 ms · 68 | 0,34 ms · 42 | 0,63 milioni | 550 ms |
| 44 | 0,04 ms · 59 | 0,27 ms · 71 | 0,46 ms · 38 | 0,76 milioni | 561 ms |
| 45 | 0,02 ms · 45 | 0,15 ms · 66 | 0,35 ms · 38 | 0,55 milioni | 515 ms |
| 46 | 0,04 ms · 74 | 0,18 ms · 90 | 0,38 ms · 40 | 0,95 milioni | 729 ms |
| 47 | 0,03 ms · 56 | 0,17 ms · 71 | 0,40 ms · 39 | 0,68 milioni | 498 ms |
| 48 | 0,02 ms · 48 | 0,15 ms · 58 | 0,32 ms · 40 | 0,51 milioni | 497 ms |
| 49 | 0,03 ms · 72 | 0,16 ms · 86 | 0,33 ms · 41 | 0,87 milioni | 485 ms |
| 50 | 0,03 ms · 49 | 0,17 ms · 64 | 0,35 ms · 38 | 0,63 milioni | 499 ms |
| 51 | 0,17 ms · 73 | 0,17 ms · 83 | 0,21 ms · 38 | 0,91 milioni | 698 ms |
| 52 | 0,02 ms · 40 | 0,15 ms · 49 | 0,37 ms · 37 | 0,44 milioni | 463 ms |
| 53 | 0,02 ms · 33 | 0,16 ms · 48 | 0,26 ms · 38 | 0,38 milioni | 528 ms |
| 54 | 0,05 ms · 76 | 0,33 ms · 96 | 0,39 ms · 40 | 1,06 milioni | 496 ms |
| 55 | 0,02 ms · 48 | 0,16 ms · 63 | 0,37 ms · 37 | 0,64 milioni | 485 ms |
| 56 | 0,02 ms · 48 | 0,16 ms · 68 | 0,40 ms · 42 | 0,54 milioni | 532 ms |
| 57 | 0,02 ms · 31 | 0,15 ms · 43 | 0,33 ms · 33 | 0,38 milioni | 410 ms |
| 58 | 0,03 ms · 49 | 0,17 ms · 73 | 0,40 ms · 37 | 0,69 milioni | 461 ms |
| 59 | 0,04 ms · 70 | 0,18 ms · 83 | 0,36 ms · 42 | 1,04 milioni | 670 ms |
| 60 | 0,03 ms · 76 | 0,17 ms · 87 | 0,36 ms · 41 | 0,98 milioni | 633 ms |
| 61 | 0,02 ms · 50 | 0,12 ms · 58 | 0,29 ms · 38 | 0,54 milioni | 444 ms |
| 62 | 0,02 ms · 32 | 0,16 ms · 45 | 0,40 ms · 33 | 0,38 milioni | 561 ms |
| 63 | 0,03 ms · 49 | 0,15 ms · 63 | 0,32 ms · 38 | 0,51 milioni | 396 ms |
| 64 | 0,03 ms · 71 | 0,16 ms · 86 | 0,32 ms · 41 | 0,94 milioni | 479 ms |
| 65 | 0,03 ms · 38 | 0,16 ms · 47 | 0,43 ms · 36 | 0,38 milioni | 461 ms |
| 66 | 0,07 ms · 78 | 0,18 ms · 96 | 0,38 ms · 43 | 0,98 milioni | 508 ms |
| 67 | 0,02 ms · 34 | 0,17 ms · 50 | 0,30 ms · 37 | 0,39 milioni | 387 ms |
| 68 | 0,02 ms · 41 | 0,08 ms · 57 | 0,39 ms · 37 | 0,65 milioni | 483 ms |
| 69 | 0,03 ms · 70 | 0,17 ms · 83 | 0,33 ms · 34 | 0,97 milioni | 478 ms |
| 70 | 0,02 ms · 52 | 0,17 ms · 66 | 0,36 ms · 37 | 0,72 milioni | 522 ms |
| 71 | 0,04 ms · 55 | 0,17 ms · 69 | 0,35 ms · 38 | 0,68 milioni | 643 ms |
| 72 | 0,02 ms · 34 | 0,22 ms · 51 | 0,34 ms · 37 | 0,39 milioni | 466 ms |
| 73 | 0,03 ms · 71 | 0,16 ms · 91 | 0,35 ms · 42 | 0,95 milioni | 467 ms |
| 74 | 0,04 ms · 52 | 0,23 ms · 71 | 0,33 ms · 42 | 0,66 milioni | 595 ms |
| 75 | 0,03 ms · 63 | 0,16 ms · 85 | 0,57 ms · 43 | 0,80 milioni | 712 ms |
| 76 | 0,03 ms · 53 | 0,15 ms · 74 | 0,50 ms · 40 | 0,74 milioni | 456 ms |
| 77 | 0,05 ms · 49 | 0,16 ms · 68 | 0,35 ms · 39 | 0,60 milioni | 547 ms |
| 78 | 0,03 ms · 55 | 0,16 ms · 72 | 0,35 ms · 40 | 0,73 milioni | 527 ms |
| 79 | 0,02 ms · 51 | 0,12 ms · 69 | 0,34 ms · 39 | 0,63 milioni | 432 ms |
| 80 | 0,06 ms · 76 | 0,18 ms · 96 | 0,69 ms · 43 | 0,94 milioni | 578 ms |
| 81 | 0,02 ms · 31 | 0,15 ms · 53 | 0,42 ms · 38 | 0,37 milioni | 538 ms |
| 82 | 0,02 ms · 59 | 0,14 ms · 74 | 0,33 ms · 42 | 0,72 milioni | 438 ms |
| 83 | 0,03 ms · 45 | 0,15 ms · 59 | 0,53 ms · 33 | 0,64 milioni | 549 ms |
| 84 | 0,04 ms · 84 | 0,16 ms · 98 | 0,35 ms · 46 | 1,06 milioni | 571 ms |
| 85 | 0,02 ms · 44 | 0,14 ms · 57 | 0,11 ms · 41 | 0,46 milioni | 440 ms |
| 86 | 0,04 ms · 47 | 0,16 ms · 67 | 0,36 ms · 38 | 0,58 milioni | 507 ms |
| 87 | 0,01 ms · 33 | 0,17 ms · 44 | 0,49 ms · 35 | 0,39 milioni | 591 ms |
| 88 | 0,03 ms · 53 | 0,20 ms · 69 | 0,36 ms · 36 | 0,65 milioni | 538 ms |
| 89 | 0,02 ms · 43 | 0,14 ms · 51 | 0,32 ms · 33 | 0,46 milioni | 516 ms |
| 90 | 0,07 ms · 67 | 0,18 ms · 88 | 0,45 ms · 42 | 0,77 milioni | 661 ms |
| 91 | 0,02 ms · 46 | 0,17 ms · 65 | 0,32 ms · 34 | 0,60 milioni | 409 ms |
| 92 | 0,02 ms · 35 | 0,18 ms · 50 | 0,42 ms · 39 | 0,37 milioni | 480 ms |
| 93 | 0,02 ms · 49 | 0,16 ms · 68 | 0,32 ms · 40 | 0,57 milioni | 553 ms |
| 94 | 0,03 ms · 48 | 0,21 ms · 63 | 0,12 ms · 37 | 0,60 milioni | 544 ms |
| 95 | 0,06 ms · 55 | 0,18 ms · 64 | 0,38 ms · 34 | 0,75 milioni | 557 ms |
| 96 | 0,03 ms · 34 | 0,13 ms · 43 | 0,44 ms · 34 | 0,38 milioni | 407 ms |
| 97 | 0,02 ms · 45 | 0,15 ms · 53 | 0,42 ms · 35 | 0,46 milioni | 486 ms |
| 98 | 0,03 ms · 47 | 0,22 ms · 59 | 0,53 ms · 38 | 0,52 milioni | 617 ms |
| 99 | 0,02 ms · 37 | 0,14 ms · 51 | 0,31 ms · 38 | 0,39 milioni | 429 ms |
| 100 | 0,04 ms · 72 | 0,16 ms · 87 | 0,36 ms · 40 | 0,94 milioni | 565 ms |
| 101 | 0,02 ms · 33 | 0,16 ms · 47 | 0,41 ms · 32 | 0,39 milioni | 596 ms |
| 102 | 0,02 ms · 34 | 0,25 ms · 45 | 0,39 ms · 34 | 0,38 milioni | 861 ms |
| 103 | 0,03 ms · 49 | 0,12 ms · 66 | 0,51 ms · 36 | 0,72 milioni | 369 ms |
| 104 | 0,05 ms · 69 | 0,26 ms · 86 | 0,65 ms · 39 | 0,95 milioni | 626 ms |
| 105 | 0,03 ms · 75 | 0,15 ms · 101 | 0,36 ms · 45 | 0,97 milioni | 574 ms |
| 106 | 0,03 ms · 55 | 0,21 ms · 68 | 0,47 ms · 37 | 0,94 milioni | 538 ms |
| 107 | 0,05 ms · 67 | 0,17 ms · 87 | 0,66 ms · 37 | 1,03 milioni | 910 ms |
| 108 | 0,03 ms · 67 | 0,16 ms · 91 | 0,36 ms · 40 | 0,83 milioni | 673 ms |
| 109 | 0,01 ms · 45 | 0,14 ms · 52 | 0,34 ms · 36 | 0,47 milioni | 381 ms |
| 110 | 0,02 ms · 38 | 0,16 ms · 50 | 0,34 ms · 39 | 0,40 milioni | 488 ms |
| 111 | 0,04 ms · 61 | 0,13 ms · 82 | 0,32 ms · 34 | 0,80 milioni | 513 ms |
| 112 | 0,04 ms · 58 | 0,18 ms · 81 | 0,57 ms · 41 | 0,83 milioni | 792 ms |
| 113 | 0,02 ms · 34 | 0,30 ms · 54 | 0,46 ms · 38 | 0,43 milioni | 394 ms |
| 114 | 0,02 ms · 33 | 0,15 ms · 47 | 0,34 ms · 37 | 0,37 milioni | 547 ms |
| 115 | 0,03 ms · 51 | 0,14 ms · 63 | 0,34 ms · 40 | 0,61 milioni | 480 ms |
| 116 | 0,14 ms · 73 | 0,21 ms · 97 | 0,11 ms · 41 | 0,96 milioni | 723 ms |
| 117 | 0,03 ms · 65 | 0,17 ms · 79 | 0,90 ms · 38 | 0,76 milioni | 680 ms |
| 118 | 0,02 ms · 43 | 0,15 ms · 59 | 0,34 ms · 38 | 0,53 milioni | 605 ms |
| 119 | 0,01 ms · 35 | 0,13 ms · 47 | 0,92 ms · 35 | 0,38 milioni | 650 ms |
| 120 | 0,06 ms · 44 | 0,19 ms · 64 | 0,41 ms · 39 | 0,59 milioni | 542 ms |
| 121 | 0,04 ms · 66 | 0,24 ms · 86 | 0,51 ms · 41 | 1,00 milioni | 692 ms |
| 122 | 0,04 ms · 53 | 0,22 ms · 69 | 0,37 ms · 40 | 0,62 milioni | 594 ms |
| 123 | 0,02 ms · 41 | 0,15 ms · 55 | 0,32 ms · 35 | 0,44 milioni | 483 ms |
| 124 | 0,04 ms · 57 | 0,24 ms · 68 | 0,29 ms · 36 | 0,75 milioni | 506 ms |
| 125 | 0,04 ms · 67 | 0,22 ms · 85 | 0,38 ms · 40 | 0,83 milioni | 665 ms |
