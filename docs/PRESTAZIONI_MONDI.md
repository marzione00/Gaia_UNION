# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,04 ms | 0,08 ms | 6,5 ms | 56 / 86 | 1,06 milioni | 3853 |
| camera delle stazioni | bilanciato | 0,03 ms | 0,06 ms | 1,6 ms | 54 / 84 | 0,77 milioni | 2812 |
| camera delle stazioni | leggero | 0,03 ms | 0,06 ms | 0,9 ms | 51 / 73 | 0,56 milioni | 1771 |
| esploratore in corsa | dettaglio alto | 0,18 ms | 1,55 ms | 8,8 ms | 71 / 103 | 1,06 milioni | 3854 |
| esploratore in corsa | bilanciato | 0,17 ms | 0,79 ms | 5,9 ms | 69 / 101 | 0,81 milioni | 2813 |
| esploratore in corsa | leggero | 0,16 ms | 0,68 ms | 7,2 ms | 66 / 94 | 0,59 milioni | 1772 |
| rover a 1,3 km dalla base | dettaglio alto | 0,46 ms | 3,18 ms | 9,8 ms | 41 / 48 | 0,59 milioni | 2242 |
| rover a 1,3 km dalla base | bilanciato | 0,44 ms | 3,08 ms | 10,5 ms | 41 / 48 | 0,59 milioni | 2242 |
| rover a 1,3 km dalla base | leggero | 0,45 ms | 3,09 ms | 10,1 ms | 41 / 48 | 0,59 milioni | 2242 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Algebra» (pianeta 2), con 1,09 ms in media (rover a 1,3 km dalla base, bilanciato); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,06 milioni, e quello con più chiamate di disegno «Titano, la chimica senza acqua» (pianeta 105), con 103. Con il dettaglio alto la preparazione richiede in media 0,04 ms con la camera delle stazioni, 0,18 ms con l'esploratore e 0,46 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 113 ms | 201 ms | 491 ms |
| Maglie dei modelli | 283 ms | 470 ms | 808 ms |
| Memoria delle maglie e delle istanze | 16,6 MiB | 18,7 MiB | 21,6 MiB |

La superficie più lunga da costruire è quella di «Atmosfere degli esopianeti e JWST» (pianeta 107), con 1025 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 21,6 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 2868 modelli dei mondi, ricavati in 3 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 223 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1388 | 144 / 564 / 1403 | 60 / 128 / 376 | 0,13 / 3,4 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 4,93 / 38,2 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,50 / 2,6 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,35 / 2,9 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,75 / 2,6 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 2,51 / 3,0 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 0,8 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,19 ms · 52 | 0,22 ms · 68 | 0,50 ms · 41 | 0,63 milioni | 862 ms |
| 2 | 0,09 ms · 62 | 0,35 ms · 84 | 0,80 ms · 44 | 1,03 milioni | 948 ms |
| 3 | 0,04 ms · 49 | 0,32 ms · 59 | 0,60 ms · 43 | 0,46 milioni | 717 ms |
| 4 | 0,12 ms · 50 | 0,23 ms · 68 | 0,50 ms · 39 | 0,66 milioni | 718 ms |
| 5 | 0,05 ms · 47 | 0,15 ms · 63 | 0,38 ms · 39 | 0,54 milioni | 596 ms |
| 6 | 0,03 ms · 44 | 0,16 ms · 57 | 0,70 ms · 37 | 0,52 milioni | 726 ms |
| 7 | 0,07 ms · 73 | 0,20 ms · 96 | 0,53 ms · 47 | 0,96 milioni | 674 ms |
| 8 | 0,05 ms · 72 | 0,25 ms · 99 | 0,48 ms · 46 | 0,85 milioni | 650 ms |
| 9 | 0,04 ms · 73 | 0,07 ms · 87 | 0,32 ms · 43 | 0,97 milioni | 643 ms |
| 10 | 0,03 ms · 75 | 0,17 ms · 91 | 0,48 ms · 47 | 0,83 milioni | 651 ms |
| 11 | 0,02 ms · 35 | 0,15 ms · 48 | 0,41 ms · 37 | 0,38 milioni | 783 ms |
| 12 | 0,07 ms · 72 | 0,21 ms · 101 | 0,72 ms · 46 | 1,03 milioni | 675 ms |
| 13 | 0,02 ms · 45 | 0,13 ms · 58 | 0,36 ms · 39 | 0,49 milioni | 626 ms |
| 14 | 0,07 ms · 78 | 0,26 ms · 90 | 0,57 ms · 46 | 0,99 milioni | 599 ms |
| 15 | 0,02 ms · 46 | 0,12 ms · 68 | 0,53 ms · 43 | 0,54 milioni | 674 ms |
| 16 | 0,02 ms · 36 | 0,17 ms · 49 | 0,54 ms · 40 | 0,39 milioni | 885 ms |
| 17 | 0,17 ms · 53 | 0,28 ms · 67 | 0,48 ms · 41 | 0,66 milioni | 579 ms |
| 18 | 0,07 ms · 72 | 0,18 ms · 93 | 0,51 ms · 47 | 0,94 milioni | 882 ms |
| 19 | 0,02 ms · 47 | 0,15 ms · 66 | 0,11 ms · 40 | 0,60 milioni | 544 ms |
| 20 | 0,02 ms · 38 | 0,08 ms · 51 | 0,36 ms · 37 | 0,41 milioni | 730 ms |
| 21 | 0,04 ms · 72 | 0,19 ms · 85 | 0,60 ms · 41 | 0,85 milioni | 960 ms |
| 22 | 0,02 ms · 51 | 0,15 ms · 63 | 0,38 ms · 41 | 0,60 milioni | 669 ms |
| 23 | 0,03 ms · 77 | 0,16 ms · 94 | 0,66 ms · 45 | 1,06 milioni | 680 ms |
| 24 | 0,03 ms · 53 | 0,16 ms · 68 | 0,85 ms · 42 | 0,64 milioni | 609 ms |
| 25 | 0,03 ms · 77 | 0,17 ms · 89 | 0,73 ms · 43 | 0,96 milioni | 611 ms |
| 26 | 0,04 ms · 44 | 0,24 ms · 49 | 0,35 ms · 40 | 0,40 milioni | 726 ms |
| 27 | 0,03 ms · 48 | 0,15 ms · 60 | 0,52 ms · 37 | 0,51 milioni | 624 ms |
| 28 | 0,03 ms · 54 | 0,17 ms · 73 | 0,46 ms · 42 | 0,62 milioni | 543 ms |
| 29 | 0,03 ms · 73 | 0,20 ms · 86 | 0,70 ms · 41 | 1,00 milioni | 862 ms |
| 30 | 0,16 ms · 74 | 0,41 ms · 92 | 0,59 ms · 42 | 0,92 milioni | 834 ms |
| 31 | 0,03 ms · 49 | 0,22 ms · 59 | 0,48 ms · 42 | 0,53 milioni | 526 ms |
| 32 | 0,02 ms · 58 | 0,15 ms · 75 | 0,52 ms · 42 | 0,67 milioni | 652 ms |
| 33 | 0,08 ms · 49 | 0,18 ms · 66 | 0,11 ms · 43 | 0,53 milioni | 663 ms |
| 34 | 0,03 ms · 68 | 0,17 ms · 87 | 0,63 ms · 46 | 0,86 milioni | 733 ms |
| 35 | 0,03 ms · 52 | 0,13 ms · 67 | 0,39 ms · 45 | 0,58 milioni | 656 ms |
| 36 | 0,04 ms · 66 | 0,18 ms · 78 | 0,55 ms · 43 | 0,67 milioni | 660 ms |
| 37 | 0,03 ms · 78 | 0,14 ms · 94 | 0,78 ms · 41 | 0,89 milioni | 549 ms |
| 38 | 0,01 ms · 37 | 0,12 ms · 53 | 0,57 ms · 41 | 0,38 milioni | 823 ms |
| 39 | 0,04 ms · 63 | 0,18 ms · 86 | 0,41 ms · 39 | 0,85 milioni | 694 ms |
| 40 | 0,03 ms · 48 | 0,17 ms · 67 | 0,53 ms · 36 | 0,71 milioni | 644 ms |
| 41 | 0,04 ms · 68 | 0,19 ms · 80 | 0,77 ms · 43 | 0,81 milioni | 980 ms |
| 42 | 0,02 ms · 51 | 0,18 ms · 65 | 0,61 ms · 41 | 0,60 milioni | 506 ms |
| 43 | 0,04 ms · 49 | 0,18 ms · 69 | 0,40 ms · 45 | 0,63 milioni | 648 ms |
| 44 | 0,04 ms · 61 | 0,14 ms · 73 | 0,87 ms · 41 | 0,76 milioni | 587 ms |
| 45 | 0,06 ms · 46 | 0,26 ms · 67 | 0,35 ms · 41 | 0,55 milioni | 850 ms |
| 46 | 0,05 ms · 76 | 0,18 ms · 92 | 0,14 ms · 43 | 0,95 milioni | 821 ms |
| 47 | 0,03 ms · 57 | 0,17 ms · 72 | 0,53 ms · 42 | 0,68 milioni | 529 ms |
| 48 | 0,02 ms · 48 | 0,19 ms · 58 | 0,21 ms · 43 | 0,51 milioni | 618 ms |
| 49 | 0,06 ms · 74 | 0,19 ms · 88 | 0,21 ms · 43 | 0,87 milioni | 1004 ms |
| 50 | 0,02 ms · 51 | 0,15 ms · 66 | 0,46 ms · 40 | 0,63 milioni | 626 ms |
| 51 | 0,08 ms · 74 | 0,27 ms · 84 | 0,28 ms · 40 | 0,91 milioni | 791 ms |
| 52 | 0,01 ms · 43 | 0,12 ms · 52 | 0,38 ms · 40 | 0,45 milioni | 696 ms |
| 53 | 0,01 ms · 35 | 0,11 ms · 50 | 0,35 ms · 41 | 0,38 milioni | 590 ms |
| 54 | 0,05 ms · 78 | 0,27 ms · 98 | 0,53 ms · 42 | 1,06 milioni | 736 ms |
| 55 | 0,04 ms · 50 | 0,25 ms · 65 | 0,43 ms · 39 | 0,64 milioni | 637 ms |
| 56 | 0,02 ms · 51 | 0,16 ms · 71 | 0,54 ms · 45 | 0,54 milioni | 741 ms |
| 57 | 0,01 ms · 33 | 0,14 ms · 45 | 0,39 ms · 35 | 0,38 milioni | 919 ms |
| 58 | 0,06 ms · 51 | 0,17 ms · 75 | 0,38 ms · 40 | 0,69 milioni | 841 ms |
| 59 | 0,03 ms · 73 | 0,27 ms · 86 | 0,32 ms · 45 | 1,04 milioni | 674 ms |
| 60 | 0,04 ms · 78 | 0,24 ms · 89 | 0,46 ms · 44 | 0,98 milioni | 862 ms |
| 61 | 0,03 ms · 52 | 0,25 ms · 60 | 0,39 ms · 40 | 0,54 milioni | 815 ms |
| 62 | 0,02 ms · 34 | 0,22 ms · 47 | 0,49 ms · 35 | 0,39 milioni | 795 ms |
| 63 | 0,03 ms · 52 | 0,16 ms · 66 | 0,53 ms · 41 | 0,51 milioni | 805 ms |
| 64 | 0,03 ms · 73 | 0,18 ms · 88 | 0,47 ms · 43 | 0,94 milioni | 728 ms |
| 65 | 0,03 ms · 41 | 0,16 ms · 50 | 0,48 ms · 39 | 0,38 milioni | 614 ms |
| 66 | 0,08 ms · 79 | 0,22 ms · 97 | 0,22 ms · 46 | 0,98 milioni | 707 ms |
| 67 | 0,02 ms · 36 | 0,15 ms · 52 | 0,42 ms · 39 | 0,39 milioni | 815 ms |
| 68 | 0,02 ms · 44 | 0,08 ms · 60 | 0,38 ms · 40 | 0,65 milioni | 604 ms |
| 69 | 0,13 ms · 72 | 0,24 ms · 85 | 0,46 ms · 37 | 0,97 milioni | 649 ms |
| 70 | 0,03 ms · 55 | 0,16 ms · 69 | 0,19 ms · 40 | 0,73 milioni | 579 ms |
| 71 | 0,03 ms · 57 | 0,18 ms · 71 | 0,61 ms · 41 | 0,68 milioni | 646 ms |
| 72 | 0,02 ms · 36 | 0,17 ms · 53 | 0,34 ms · 39 | 0,39 milioni | 940 ms |
| 73 | 0,05 ms · 74 | 0,21 ms · 94 | 0,51 ms · 44 | 0,95 milioni | 676 ms |
| 74 | 0,02 ms · 53 | 0,16 ms · 72 | 0,14 ms · 44 | 0,66 milioni | 591 ms |
| 75 | 0,06 ms · 65 | 0,24 ms · 87 | 0,54 ms · 45 | 0,80 milioni | 939 ms |
| 76 | 0,02 ms · 54 | 0,12 ms · 75 | 0,14 ms · 42 | 0,74 milioni | 536 ms |
| 77 | 0,04 ms · 52 | 0,26 ms · 71 | 0,31 ms · 42 | 0,60 milioni | 532 ms |
| 78 | 0,02 ms · 58 | 0,13 ms · 75 | 0,39 ms · 43 | 0,73 milioni | 697 ms |
| 79 | 0,02 ms · 51 | 0,18 ms · 69 | 0,37 ms · 41 | 0,63 milioni | 678 ms |
| 80 | 0,03 ms · 78 | 0,17 ms · 98 | 0,28 ms · 46 | 0,95 milioni | 605 ms |
| 81 | 0,03 ms · 33 | 0,16 ms · 55 | 0,53 ms · 40 | 0,38 milioni | 953 ms |
| 82 | 0,04 ms · 62 | 0,17 ms · 77 | 0,56 ms · 44 | 0,72 milioni | 671 ms |
| 83 | 0,02 ms · 45 | 0,15 ms · 59 | 0,44 ms · 36 | 0,64 milioni | 678 ms |
| 84 | 0,07 ms · 86 | 0,21 ms · 100 | 0,29 ms · 48 | 1,06 milioni | 871 ms |
| 85 | 0,03 ms · 44 | 0,12 ms · 57 | 0,12 ms · 44 | 0,46 milioni | 546 ms |
| 86 | 0,03 ms · 49 | 0,15 ms · 69 | 0,33 ms · 41 | 0,58 milioni | 502 ms |
| 87 | 0,01 ms · 35 | 0,14 ms · 46 | 0,48 ms · 38 | 0,39 milioni | 922 ms |
| 88 | 0,02 ms · 55 | 0,14 ms · 71 | 0,52 ms · 39 | 0,65 milioni | 691 ms |
| 89 | 0,02 ms · 43 | 0,17 ms · 51 | 0,40 ms · 36 | 0,46 milioni | 625 ms |
| 90 | 0,05 ms · 69 | 0,19 ms · 90 | 0,38 ms · 45 | 0,77 milioni | 802 ms |
| 91 | 0,02 ms · 49 | 0,16 ms · 68 | 0,42 ms · 37 | 0,60 milioni | 554 ms |
| 92 | 0,02 ms · 37 | 0,14 ms · 52 | 0,52 ms · 42 | 0,44 milioni | 505 ms |
| 93 | 0,06 ms · 50 | 0,14 ms · 69 | 0,46 ms · 42 | 0,57 milioni | 779 ms |
| 94 | 0,02 ms · 51 | 0,11 ms · 66 | 0,29 ms · 40 | 0,60 milioni | 510 ms |
| 95 | 0,03 ms · 58 | 0,16 ms · 67 | 0,42 ms · 37 | 0,75 milioni | 638 ms |
| 96 | 0,02 ms · 36 | 0,16 ms · 45 | 0,38 ms · 37 | 0,38 milioni | 840 ms |
| 97 | 0,02 ms · 48 | 0,16 ms · 56 | 0,40 ms · 38 | 0,46 milioni | 697 ms |
| 98 | 0,02 ms · 48 | 0,18 ms · 60 | 0,50 ms · 40 | 0,52 milioni | 635 ms |
| 99 | 0,02 ms · 39 | 0,16 ms · 53 | 0,44 ms · 40 | 0,39 milioni | 742 ms |
| 100 | 0,09 ms · 74 | 0,19 ms · 89 | 0,55 ms · 43 | 0,94 milioni | 536 ms |
| 101 | 0,01 ms · 36 | 0,15 ms · 50 | 0,47 ms · 34 | 0,39 milioni | 627 ms |
| 102 | 0,02 ms · 36 | 0,26 ms · 47 | 0,39 ms · 36 | 0,38 milioni | 984 ms |
| 103 | 0,03 ms · 52 | 0,15 ms · 69 | 0,63 ms · 39 | 0,73 milioni | 642 ms |
| 104 | 0,03 ms · 71 | 0,17 ms · 88 | 0,14 ms · 41 | 0,95 milioni | 618 ms |
| 105 | 0,05 ms · 77 | 0,19 ms · 103 | 0,48 ms · 47 | 0,97 milioni | 793 ms |
| 106 | 0,02 ms · 58 | 0,16 ms · 71 | 0,69 ms · 40 | 0,94 milioni | 693 ms |
| 107 | 0,06 ms · 68 | 0,27 ms · 88 | 0,53 ms · 40 | 1,03 milioni | 1025 ms |
| 108 | 0,04 ms · 70 | 0,19 ms · 94 | 0,47 ms · 43 | 0,84 milioni | 773 ms |
| 109 | 0,02 ms · 48 | 0,17 ms · 55 | 0,16 ms · 39 | 0,47 milioni | 733 ms |
| 110 | 0,02 ms · 40 | 0,20 ms · 52 | 0,31 ms · 42 | 0,55 milioni | 974 ms |
| 111 | 0,09 ms · 63 | 0,11 ms · 84 | 0,69 ms · 37 | 0,80 milioni | 738 ms |
| 112 | 0,03 ms · 60 | 0,18 ms · 83 | 0,72 ms · 43 | 0,83 milioni | 799 ms |
| 113 | 0,02 ms · 36 | 0,14 ms · 56 | 0,09 ms · 41 | 0,45 milioni | 549 ms |
| 114 | 0,02 ms · 35 | 0,18 ms · 49 | 0,44 ms · 40 | 0,47 milioni | 769 ms |
| 115 | 0,03 ms · 52 | 0,12 ms · 64 | 0,68 ms · 42 | 0,61 milioni | 565 ms |
| 116 | 0,09 ms · 75 | 0,22 ms · 99 | 0,45 ms · 43 | 0,97 milioni | 688 ms |
| 117 | 0,05 ms · 67 | 0,19 ms · 81 | 0,61 ms · 41 | 0,76 milioni | 954 ms |
| 118 | 0,02 ms · 46 | 0,16 ms · 62 | 0,36 ms · 41 | 0,53 milioni | 551 ms |
| 119 | 0,01 ms · 37 | 0,15 ms · 49 | 0,55 ms · 37 | 0,38 milioni | 731 ms |
| 120 | 0,05 ms · 46 | 0,15 ms · 66 | 0,69 ms · 42 | 0,59 milioni | 696 ms |
| 121 | 0,03 ms · 68 | 0,17 ms · 88 | 0,51 ms · 44 | 1,00 milioni | 790 ms |
| 122 | 0,02 ms · 55 | 0,16 ms · 71 | 0,36 ms · 42 | 0,63 milioni | 592 ms |
| 123 | 0,02 ms · 44 | 0,17 ms · 58 | 0,50 ms · 38 | 0,44 milioni | 591 ms |
| 124 | 0,02 ms · 60 | 0,15 ms · 71 | 0,35 ms · 39 | 0,75 milioni | 506 ms |
| 125 | 0,03 ms · 70 | 0,17 ms · 88 | 0,32 ms · 43 | 0,83 milioni | 613 ms |
