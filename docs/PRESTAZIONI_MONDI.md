# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni e con la camera che segue l'esploratore mentre corre, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,07 ms | 0,20 ms | 71,4 ms | 51 / 83 | 1,12 milioni | 3839 |
| camera delle stazioni | bilanciato | 0,05 ms | 0,16 ms | 8,4 ms | 49 / 82 | 0,84 milioni | 2798 |
| camera delle stazioni | leggero | 0,04 ms | 0,12 ms | 4,1 ms | 46 / 74 | 0,61 milioni | 1757 |
| esploratore in corsa | dettaglio alto | 0,06 ms | 0,16 ms | 8,6 ms | 65 / 97 | 1,13 milioni | 3840 |
| esploratore in corsa | bilanciato | 0,06 ms | 0,14 ms | 10,7 ms | 63 / 95 | 0,85 milioni | 2799 |
| esploratore in corsa | leggero | 0,04 ms | 0,11 ms | 4,9 ms | 60 / 88 | 0,61 milioni | 1758 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Cercare la vita su Marte» (pianeta 102), con 1,21 ms in media (camera delle stazioni, dettaglio alto); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,13 milioni, e quello con più chiamate di disegno «Titano, la chimica senza acqua» (pianeta 105), con 97. Con il dettaglio alto la preparazione richiede in media 0,07 ms con la camera delle stazioni e 0,06 ms con l'esploratore, su 16,7 ms di un fotogramma a 60 al secondo; in corsa l'esploratore sposta la camera, e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 119 ms | 204 ms | 485 ms |
| Maglie dei modelli | 147 ms | 237 ms | 516 ms |
| Memoria delle maglie e delle istanze | 16,9 MiB | 19,1 MiB | 21,9 MiB |

La superficie più lunga da costruire è quella di «Polimeri e materiali» (pianeta 75), con 936 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 21,9 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 2868 modelli dei mondi, ricavati in 3 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 195 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1388 | 144 / 564 / 1403 | 60 / 128 / 376 | 0,13 / 8,7 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 4,47 / 135,6 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,47 / 2,4 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,29 / 1,3 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,75 / 2,0 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 2,98 / 3,3 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 0,6 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|
| 1 | 0,11 ms · 48 | 0,10 ms · 62 | 0,66 milioni | 574 ms |
| 2 | 0,19 ms · 69 | 0,18 ms · 82 | 1,05 milioni | 737 ms |
| 3 | 0,06 ms · 45 | 0,05 ms · 56 | 0,49 milioni | 446 ms |
| 4 | 0,12 ms · 55 | 0,08 ms · 65 | 0,68 milioni | 564 ms |
| 5 | 0,08 ms · 47 | 0,05 ms · 58 | 0,56 milioni | 487 ms |
| 6 | 0,04 ms · 42 | 0,16 ms · 51 | 0,54 milioni | 438 ms |
| 7 | 0,24 ms · 77 | 0,32 ms · 91 | 0,98 milioni | 640 ms |
| 8 | 0,10 ms · 79 | 0,09 ms · 93 | 0,87 milioni | 515 ms |
| 9 | 0,09 ms · 69 | 0,09 ms · 81 | 0,99 milioni | 503 ms |
| 10 | 0,07 ms · 74 | 0,08 ms · 87 | 0,89 milioni | 373 ms |
| 11 | 0,04 ms · 33 | 0,04 ms · 42 | 0,40 milioni | 374 ms |
| 12 | 0,09 ms · 80 | 0,13 ms · 96 | 1,06 milioni | 581 ms |
| 13 | 0,06 ms · 43 | 0,09 ms · 54 | 0,50 milioni | 475 ms |
| 14 | 0,15 ms · 73 | 0,12 ms · 84 | 1,02 milioni | 573 ms |
| 15 | 0,03 ms · 48 | 0,05 ms · 61 | 0,56 milioni | 538 ms |
| 16 | 0,02 ms · 31 | 0,03 ms · 43 | 0,40 milioni | 542 ms |
| 17 | 0,06 ms · 50 | 0,08 ms · 60 | 0,73 milioni | 571 ms |
| 18 | 0,12 ms · 75 | 0,11 ms · 89 | 0,97 milioni | 592 ms |
| 19 | 0,03 ms · 49 | 0,05 ms · 61 | 0,62 milioni | 341 ms |
| 20 | 0,02 ms · 36 | 0,02 ms · 45 | 0,43 milioni | 383 ms |
| 21 | 0,18 ms · 71 | 0,22 ms · 80 | 0,89 milioni | 681 ms |
| 22 | 0,03 ms · 48 | 0,05 ms · 59 | 0,62 milioni | 380 ms |
| 23 | 0,15 ms · 74 | 0,20 ms · 88 | 1,08 milioni | 359 ms |
| 24 | 0,04 ms · 50 | 0,03 ms · 62 | 0,71 milioni | 492 ms |
| 25 | 0,06 ms · 79 | 0,05 ms · 87 | 0,98 milioni | 408 ms |
| 26 | 0,02 ms · 38 | 0,03 ms · 46 | 0,42 milioni | 384 ms |
| 27 | 0,05 ms · 46 | 0,04 ms · 55 | 0,53 milioni | 368 ms |
| 28 | 0,04 ms · 56 | 0,04 ms · 68 | 0,64 milioni | 517 ms |
| 29 | 0,05 ms · 70 | 0,07 ms · 81 | 1,09 milioni | 593 ms |
| 30 | 0,11 ms · 74 | 0,22 ms · 86 | 0,92 milioni | 624 ms |
| 31 | 0,03 ms · 46 | 0,04 ms · 55 | 0,56 milioni | 413 ms |
| 32 | 0,05 ms · 55 | 0,04 ms · 68 | 0,67 milioni | 407 ms |
| 33 | 0,03 ms · 47 | 0,11 ms · 60 | 0,56 milioni | 430 ms |
| 34 | 0,07 ms · 73 | 0,07 ms · 86 | 0,93 milioni | 481 ms |
| 35 | 0,05 ms · 50 | 0,03 ms · 63 | 0,60 milioni | 449 ms |
| 36 | 0,07 ms · 61 | 0,04 ms · 72 | 0,69 milioni | 460 ms |
| 37 | 0,06 ms · 81 | 0,05 ms · 91 | 0,93 milioni | 347 ms |
| 38 | 0,02 ms · 36 | 0,04 ms · 47 | 0,40 milioni | 327 ms |
| 39 | 0,11 ms · 72 | 0,07 ms · 82 | 0,90 milioni | 470 ms |
| 40 | 0,04 ms · 53 | 0,04 ms · 63 | 0,74 milioni | 496 ms |
| 41 | 0,06 ms · 67 | 0,04 ms · 78 | 0,84 milioni | 583 ms |
| 42 | 0,04 ms · 50 | 0,08 ms · 63 | 0,62 milioni | 446 ms |
| 43 | 0,03 ms · 52 | 0,03 ms · 65 | 0,65 milioni | 409 ms |
| 44 | 0,15 ms · 60 | 0,11 ms · 71 | 0,81 milioni | 513 ms |
| 45 | 0,03 ms · 50 | 0,03 ms · 62 | 0,58 milioni | 346 ms |
| 46 | 0,08 ms · 75 | 0,07 ms · 86 | 1,02 milioni | 589 ms |
| 47 | 0,05 ms · 59 | 0,05 ms · 70 | 0,70 milioni | 396 ms |
| 48 | 0,02 ms · 45 | 0,03 ms · 56 | 0,56 milioni | 419 ms |
| 49 | 0,05 ms · 71 | 0,05 ms · 85 | 0,90 milioni | 375 ms |
| 50 | 0,03 ms · 50 | 0,06 ms · 63 | 0,65 milioni | 347 ms |
| 51 | 0,22 ms · 71 | 0,21 ms · 82 | 0,94 milioni | 743 ms |
| 52 | 0,02 ms · 36 | 0,02 ms · 46 | 0,47 milioni | 410 ms |
| 53 | 0,02 ms · 35 | 0,05 ms · 45 | 0,39 milioni | 360 ms |
| 54 | 0,07 ms · 79 | 0,06 ms · 92 | 1,12 milioni | 496 ms |
| 55 | 0,05 ms · 49 | 0,04 ms · 60 | 0,65 milioni | 409 ms |
| 56 | 0,04 ms · 49 | 0,05 ms · 63 | 0,57 milioni | 477 ms |
| 57 | 0,01 ms · 31 | 0,01 ms · 39 | 0,40 milioni | 271 ms |
| 58 | 0,06 ms · 55 | 0,05 ms · 69 | 0,70 milioni | 305 ms |
| 59 | 0,07 ms · 72 | 0,05 ms · 84 | 1,06 milioni | 487 ms |
| 60 | 0,84 ms · 73 | 0,06 ms · 84 | 1,02 milioni | 507 ms |
| 61 | 0,03 ms · 45 | 0,03 ms · 54 | 0,56 milioni | 496 ms |
| 62 | 0,01 ms · 33 | 0,02 ms · 42 | 0,40 milioni | 464 ms |
| 63 | 0,02 ms · 48 | 0,02 ms · 59 | 0,54 milioni | 334 ms |
| 64 | 0,05 ms · 70 | 0,04 ms · 82 | 0,97 milioni | 322 ms |
| 65 | 0,02 ms · 36 | 0,02 ms · 47 | 0,40 milioni | 311 ms |
| 66 | 0,11 ms · 79 | 0,11 ms · 93 | 1,05 milioni | 432 ms |
| 67 | 0,02 ms · 35 | 0,04 ms · 46 | 0,41 milioni | 512 ms |
| 68 | 0,03 ms · 41 | 0,03 ms · 54 | 0,70 milioni | 376 ms |
| 69 | 0,09 ms · 74 | 0,07 ms · 82 | 0,99 milioni | 380 ms |
| 70 | 0,05 ms · 52 | 0,05 ms · 62 | 0,73 milioni | 384 ms |
| 71 | 0,12 ms · 52 | 0,09 ms · 65 | 0,70 milioni | 525 ms |
| 72 | 0,01 ms · 34 | 0,02 ms · 47 | 0,41 milioni | 461 ms |
| 73 | 0,06 ms · 78 | 0,06 ms · 90 | 0,97 milioni | 410 ms |
| 74 | 0,05 ms · 54 | 0,06 ms · 67 | 0,68 milioni | 436 ms |
| 75 | 0,10 ms · 69 | 0,07 ms · 81 | 0,82 milioni | 936 ms |
| 76 | 0,05 ms · 56 | 0,04 ms · 70 | 0,76 milioni | 453 ms |
| 77 | 0,04 ms · 50 | 0,11 ms · 64 | 0,63 milioni | 508 ms |
| 78 | 0,04 ms · 55 | 0,04 ms · 68 | 0,75 milioni | 443 ms |
| 79 | 0,04 ms · 53 | 0,04 ms · 65 | 0,67 milioni | 384 ms |
| 80 | 0,06 ms · 78 | 0,05 ms · 92 | 0,96 milioni | 532 ms |
| 81 | 0,02 ms · 37 | 0,03 ms · 49 | 0,39 milioni | 580 ms |
| 82 | 0,06 ms · 57 | 0,05 ms · 70 | 0,78 milioni | 556 ms |
| 83 | 0,04 ms · 44 | 0,06 ms · 55 | 0,66 milioni | 574 ms |
| 84 | 0,12 ms · 82 | 0,09 ms · 95 | 1,13 milioni | 639 ms |
| 85 | 0,02 ms · 42 | 0,06 ms · 53 | 0,48 milioni | 409 ms |
| 86 | 0,04 ms · 51 | 0,04 ms · 64 | 0,62 milioni | 392 ms |
| 87 | 0,02 ms · 33 | 0,03 ms · 42 | 0,41 milioni | 500 ms |
| 88 | 0,07 ms · 54 | 0,07 ms · 65 | 0,68 milioni | 548 ms |
| 89 | 0,02 ms · 42 | 0,05 ms · 49 | 0,48 milioni | 548 ms |
| 90 | 0,14 ms · 71 | 0,09 ms · 84 | 0,79 milioni | 597 ms |
| 91 | 0,03 ms · 51 | 0,07 ms · 62 | 0,62 milioni | 440 ms |
| 92 | 0,03 ms · 35 | 0,05 ms · 46 | 0,39 milioni | 358 ms |
| 93 | 0,02 ms · 53 | 0,04 ms · 64 | 0,58 milioni | 513 ms |
| 94 | 0,03 ms · 48 | 0,03 ms · 60 | 0,65 milioni | 322 ms |
| 95 | 0,05 ms · 53 | 0,05 ms · 60 | 0,80 milioni | 550 ms |
| 96 | 0,03 ms · 34 | 0,03 ms · 42 | 0,40 milioni | 485 ms |
| 97 | 0,02 ms · 41 | 0,02 ms · 49 | 0,49 milioni | 390 ms |
| 98 | 0,03 ms · 46 | 0,03 ms · 57 | 0,54 milioni | 411 ms |
| 99 | 0,02 ms · 37 | 0,02 ms · 48 | 0,41 milioni | 388 ms |
| 100 | 0,08 ms · 72 | 0,05 ms · 85 | 1,03 milioni | 441 ms |
| 101 | 0,01 ms · 34 | 0,02 ms · 43 | 0,41 milioni | 379 ms |
| 102 | 1,21 ms · 32 | 0,03 ms · 41 | 0,40 milioni | 473 ms |
| 103 | 0,06 ms · 52 | 0,04 ms · 63 | 0,74 milioni | 472 ms |
| 104 | 0,05 ms · 70 | 0,06 ms · 82 | 0,97 milioni | 432 ms |
| 105 | 0,06 ms · 83 | 0,07 ms · 97 | 1,00 milioni | 392 ms |
| 106 | 0,04 ms · 54 | 0,04 ms · 65 | 0,96 milioni | 414 ms |
| 107 | 0,05 ms · 72 | 0,06 ms · 83 | 1,05 milioni | 845 ms |
| 108 | 0,05 ms · 74 | 0,04 ms · 87 | 0,89 milioni | 546 ms |
| 109 | 0,02 ms · 40 | 0,02 ms · 49 | 0,51 milioni | 445 ms |
| 110 | 0,02 ms · 37 | 0,03 ms · 48 | 0,42 milioni | 485 ms |
| 111 | 0,06 ms · 68 | 0,08 ms · 79 | 0,82 milioni | 532 ms |
| 112 | 0,07 ms · 65 | 0,05 ms · 77 | 0,85 milioni | 696 ms |
| 113 | 0,02 ms · 38 | 0,02 ms · 49 | 0,44 milioni | 350 ms |
| 114 | 0,02 ms · 31 | 0,04 ms · 43 | 0,39 milioni | 367 ms |
| 115 | 0,02 ms · 48 | 0,03 ms · 61 | 0,63 milioni | 398 ms |
| 116 | 0,08 ms · 80 | 0,05 ms · 93 | 1,06 milioni | 331 ms |
| 117 | 0,06 ms · 62 | 0,04 ms · 75 | 0,83 milioni | 666 ms |
| 118 | 0,05 ms · 44 | 0,04 ms · 55 | 0,55 milioni | 617 ms |
| 119 | 0,02 ms · 34 | 0,05 ms · 43 | 0,40 milioni | 500 ms |
| 120 | 0,07 ms · 46 | 0,08 ms · 60 | 0,64 milioni | 477 ms |
| 121 | 0,09 ms · 67 | 0,10 ms · 83 | 1,01 milioni | 486 ms |
| 122 | 0,03 ms · 51 | 0,04 ms · 65 | 0,65 milioni | 404 ms |
| 123 | 0,02 ms · 40 | 0,04 ms · 51 | 0,46 milioni | 460 ms |
| 124 | 0,07 ms · 56 | 0,05 ms · 67 | 0,76 milioni | 425 ms |
| 125 | 0,06 ms · 68 | 0,05 ms · 82 | 0,86 milioni | 419 ms |
