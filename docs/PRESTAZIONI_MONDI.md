# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento e con la nave dell'esploratore sulla piazzola della base, in discesa con i getti e la polvere nella vista delle stazioni, a terra con la rampa aperta nelle altre due; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,08 ms | 0,17 ms | 5,9 ms | 67 / 98 | 1,14 milioni | 4287 |
| camera delle stazioni | bilanciato | 0,06 ms | 0,14 ms | 5,9 ms | 65 / 96 | 0,84 milioni | 3129 |
| camera delle stazioni | leggero | 0,06 ms | 0,13 ms | 13,2 ms | 62 / 85 | 0,65 milioni | 1968 |
| esploratore in corsa | dettaglio alto | 0,27 ms | 2,22 ms | 16,3 ms | 81 / 113 | 1,19 milioni | 4233 |
| esploratore in corsa | bilanciato | 0,22 ms | 2,06 ms | 5,4 ms | 79 / 111 | 0,91 milioni | 3077 |
| esploratore in corsa | leggero | 0,22 ms | 1,86 ms | 7,9 ms | 75 / 105 | 0,67 milioni | 1917 |
| rover a 1,3 km dalla base | dettaglio alto | 0,68 ms | 3,90 ms | 11,4 ms | 65 / 94 | 0,72 milioni | 2893 |
| rover a 1,3 km dalla base | bilanciato | 0,62 ms | 3,50 ms | 11,6 ms | 64 / 91 | 0,69 milioni | 2679 |
| rover a 1,3 km dalla base | leggero | 0,61 ms | 3,49 ms | 22,5 ms | 62 / 85 | 0,66 milioni | 2470 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Algebra» (pianeta 2), con 1,40 ms in media (rover a 1,3 km dalla base, dettaglio alto); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,19 milioni, e quello con più chiamate di disegno «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 113. Con il dettaglio alto la preparazione richiede in media 0,08 ms con la camera delle stazioni, 0,27 ms con l'esploratore e 0,68 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie. Dalla 1.73.0 i siti della zona entro 1050 unità dalla camera hanno un modello semplificato, costruito uno per fotogramma a partire dal più vicino, e quello dettagliato entro 200 unità. Dalla 1.74.0 lo stesso vale per i luoghi rari, e i modelli semplificati di siti e luoghi rari di ogni quarto della zona sono uniti in una sola mesh: costano al più quattro chiamate di disegno, più una per ogni modello dettagliato entro 70 unità dalla camera.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie. Dalla 1.77.0 le tre griglie esterne del terreno, oltre 256 unità dal centro della vista, si costruiscono nei fotogrammi seguenti, 10 ms per fotogramma: da 17 a 50 fotogrammi, in mediana 21.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 159 ms | 247 ms | 576 ms |
| Maglie dei modelli | 189 ms | 283 ms | 510 ms |
| Terreno lontano, nei fotogrammi seguenti | 167 ms | 213 ms | 567 ms |
| Memoria delle maglie e delle istanze | 17,5 MiB | 19,5 MiB | 22,4 MiB |

La superficie più lunga da costruire è quella di «Algebra» (pianeta 2), con 973 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 22,4 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 3 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 197 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,15 / 2,9 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 5,90 / 30,8 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,60 / 3,4 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,41 / 2,5 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,91 / 3,8 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 4,88 / 6,6 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 2,2 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,19 ms · 63 | 0,30 ms · 77 | 0,96 ms · 60 | 0,66 milioni | 834 ms |
| 2 | 0,31 ms · 73 | 0,57 ms · 94 | 1,40 ms · 69 | 1,09 milioni | 973 ms |
| 3 | 0,06 ms · 60 | 0,30 ms · 69 | 0,96 ms · 55 | 0,50 milioni | 556 ms |
| 4 | 0,15 ms · 60 | 0,33 ms · 77 | 0,66 ms · 60 | 0,70 milioni | 584 ms |
| 5 | 0,23 ms · 58 | 0,27 ms · 73 | 0,71 ms · 57 | 0,59 milioni | 530 ms |
| 6 | 0,06 ms · 55 | 0,21 ms · 67 | 0,66 ms · 59 | 0,55 milioni | 577 ms |
| 7 | 0,14 ms · 84 | 0,36 ms · 106 | 0,97 ms · 79 | 1,03 milioni | 701 ms |
| 8 | 0,08 ms · 83 | 0,26 ms · 109 | 0,47 ms · 76 | 0,94 milioni | 510 ms |
| 9 | 0,10 ms · 86 | 0,17 ms · 98 | 0,61 ms · 79 | 1,04 milioni | 583 ms |
| 10 | 0,08 ms · 87 | 0,22 ms · 103 | 0,57 ms · 78 | 0,92 milioni | 425 ms |
| 11 | 0,03 ms · 46 | 0,21 ms · 59 | 0,56 ms · 45 | 0,41 milioni | 474 ms |
| 12 | 0,25 ms · 84 | 0,54 ms · 112 | 1,07 ms · 79 | 1,12 milioni | 623 ms |
| 13 | 0,15 ms · 56 | 0,21 ms · 67 | 0,59 ms · 52 | 0,53 milioni | 488 ms |
| 14 | 0,07 ms · 89 | 0,22 ms · 100 | 0,83 ms · 77 | 1,05 milioni | 783 ms |
| 15 | 0,07 ms · 59 | 0,23 ms · 79 | 0,92 ms · 66 | 0,57 milioni | 538 ms |
| 16 | 0,05 ms · 47 | 0,30 ms · 60 | 0,65 ms · 48 | 0,41 milioni | 613 ms |
| 17 | 0,10 ms · 64 | 0,24 ms · 76 | 0,82 ms · 67 | 0,73 milioni | 522 ms |
| 18 | 0,08 ms · 82 | 0,23 ms · 103 | 0,69 ms · 84 | 1,00 milioni | 552 ms |
| 19 | 0,10 ms · 60 | 0,20 ms · 79 | 0,50 ms · 64 | 0,64 milioni | 348 ms |
| 20 | 0,03 ms · 49 | 0,16 ms · 60 | 0,66 ms · 56 | 0,44 milioni | 592 ms |
| 21 | 0,08 ms · 81 | 0,27 ms · 93 | 0,85 ms · 73 | 0,93 milioni | 759 ms |
| 22 | 0,04 ms · 63 | 0,22 ms · 75 | 0,64 ms · 63 | 0,67 milioni | 472 ms |
| 23 | 0,09 ms · 88 | 0,30 ms · 104 | 0,99 ms · 84 | 1,17 milioni | 725 ms |
| 24 | 0,07 ms · 62 | 0,26 ms · 75 | 1,04 ms · 64 | 0,68 milioni | 588 ms |
| 25 | 0,10 ms · 87 | 0,33 ms · 98 | 0,69 ms · 75 | 1,04 milioni | 516 ms |
| 26 | 0,05 ms · 55 | 0,19 ms · 59 | 0,53 ms · 51 | 0,43 milioni | 505 ms |
| 27 | 0,07 ms · 59 | 0,30 ms · 70 | 0,89 ms · 60 | 0,56 milioni | 416 ms |
| 28 | 0,14 ms · 65 | 0,60 ms · 81 | 1,03 ms · 69 | 0,66 milioni | 481 ms |
| 29 | 0,13 ms · 84 | 0,27 ms · 96 | 1,33 ms · 71 | 1,07 milioni | 820 ms |
| 30 | 0,08 ms · 86 | 0,24 ms · 104 | 0,74 ms · 79 | 0,99 milioni | 466 ms |
| 31 | 0,06 ms · 61 | 0,26 ms · 70 | 0,97 ms · 61 | 0,56 milioni | 490 ms |
| 32 | 0,11 ms · 68 | 0,24 ms · 85 | 0,55 ms · 73 | 0,73 milioni | 470 ms |
| 33 | 0,06 ms · 60 | 0,36 ms · 76 | 0,44 ms · 65 | 0,57 milioni | 494 ms |
| 34 | 0,21 ms · 78 | 0,42 ms · 97 | 0,69 ms · 80 | 0,92 milioni | 494 ms |
| 35 | 0,09 ms · 63 | 0,82 ms · 76 | 0,97 ms · 69 | 0,62 milioni | 500 ms |
| 36 | 0,05 ms · 76 | 0,19 ms · 86 | 0,66 ms · 69 | 0,73 milioni | 460 ms |
| 37 | 0,09 ms · 88 | 0,33 ms · 103 | 0,63 ms · 68 | 0,97 milioni | 502 ms |
| 38 | 0,02 ms · 48 | 0,17 ms · 62 | 0,65 ms · 52 | 0,41 milioni | 491 ms |
| 39 | 0,09 ms · 74 | 0,28 ms · 95 | 0,47 ms · 54 | 0,91 milioni | 681 ms |
| 40 | 0,04 ms · 58 | 0,20 ms · 76 | 0,82 ms · 59 | 0,74 milioni | 573 ms |
| 41 | 0,11 ms · 79 | 0,39 ms · 92 | 0,93 ms · 75 | 0,87 milioni | 855 ms |
| 42 | 0,05 ms · 62 | 0,25 ms · 74 | 0,77 ms · 63 | 0,64 milioni | 511 ms |
| 43 | 0,08 ms · 60 | 0,29 ms · 80 | 0,69 ms · 66 | 0,67 milioni | 640 ms |
| 44 | 0,06 ms · 71 | 0,22 ms · 83 | 0,84 ms · 74 | 0,83 milioni | 445 ms |
| 45 | 0,03 ms · 58 | 0,22 ms · 77 | 0,60 ms · 61 | 0,59 milioni | 476 ms |
| 46 | 0,08 ms · 86 | 0,24 ms · 99 | 0,41 ms · 79 | 1,00 milioni | 742 ms |
| 47 | 0,09 ms · 67 | 0,36 ms · 85 | 0,78 ms · 65 | 0,78 milioni | 580 ms |
| 48 | 0,04 ms · 59 | 0,23 ms · 67 | 0,17 ms · 62 | 0,55 milioni | 473 ms |
| 49 | 0,11 ms · 85 | 0,28 ms · 98 | 0,63 ms · 79 | 0,97 milioni | 547 ms |
| 50 | 0,08 ms · 61 | 0,29 ms · 75 | 0,90 ms · 64 | 0,68 milioni | 617 ms |
| 51 | 0,14 ms · 85 | 0,30 ms · 95 | 0,33 ms · 51 | 0,96 milioni | 834 ms |
| 52 | 0,04 ms · 54 | 0,46 ms · 61 | 0,60 ms · 55 | 0,49 milioni | 560 ms |
| 53 | 0,02 ms · 46 | 0,29 ms · 59 | 0,50 ms · 52 | 0,40 milioni | 617 ms |
| 54 | 0,20 ms · 90 | 0,46 ms · 108 | 1,22 ms · 82 | 1,14 milioni | 526 ms |
| 55 | 0,07 ms · 60 | 0,22 ms · 75 | 0,64 ms · 64 | 0,67 milioni | 518 ms |
| 56 | 0,03 ms · 62 | 0,25 ms · 80 | 0,59 ms · 70 | 0,58 milioni | 474 ms |
| 57 | 0,02 ms · 44 | 0,19 ms · 54 | 0,48 ms · 45 | 0,41 milioni | 545 ms |
| 58 | 0,04 ms · 60 | 0,20 ms · 83 | 0,74 ms · 63 | 0,72 milioni | 560 ms |
| 59 | 0,12 ms · 85 | 0,33 ms · 96 | 0,83 ms · 71 | 1,09 milioni | 563 ms |
| 60 | 0,08 ms · 88 | 0,39 ms · 98 | 0,60 ms · 69 | 1,03 milioni | 722 ms |
| 61 | 0,04 ms · 63 | 0,18 ms · 68 | 0,85 ms · 60 | 0,57 milioni | 687 ms |
| 62 | 0,02 ms · 45 | 0,17 ms · 57 | 0,57 ms · 44 | 0,41 milioni | 565 ms |
| 63 | 0,03 ms · 63 | 0,18 ms · 75 | 0,90 ms · 58 | 0,57 milioni | 403 ms |
| 64 | 0,12 ms · 83 | 0,31 ms · 96 | 0,59 ms · 79 | 1,02 milioni | 749 ms |
| 65 | 0,04 ms · 53 | 0,27 ms · 61 | 0,84 ms · 54 | 0,41 milioni | 606 ms |
| 66 | 0,12 ms · 90 | 0,28 ms · 108 | 0,31 ms · 77 | 1,10 milioni | 551 ms |
| 67 | 0,04 ms · 47 | 0,26 ms · 62 | 0,51 ms · 49 | 0,42 milioni | 468 ms |
| 68 | 0,05 ms · 55 | 0,15 ms · 71 | 0,60 ms · 58 | 0,69 milioni | 456 ms |
| 69 | 0,18 ms · 82 | 0,26 ms · 93 | 0,68 ms · 72 | 1,05 milioni | 640 ms |
| 70 | 0,06 ms · 65 | 0,20 ms · 77 | 0,38 ms · 69 | 0,80 milioni | 527 ms |
| 71 | 0,05 ms · 67 | 0,24 ms · 79 | 0,56 ms · 70 | 0,74 milioni | 447 ms |
| 72 | 0,02 ms · 47 | 0,18 ms · 64 | 0,53 ms · 49 | 0,41 milioni | 627 ms |
| 73 | 0,09 ms · 86 | 0,24 ms · 105 | 0,73 ms · 80 | 1,03 milioni | 550 ms |
| 74 | 0,07 ms · 64 | 0,26 ms · 81 | 0,28 ms · 61 | 0,71 milioni | 586 ms |
| 75 | 0,08 ms · 74 | 0,26 ms · 97 | 0,90 ms · 71 | 0,86 milioni | 672 ms |
| 76 | 0,07 ms · 65 | 0,22 ms · 84 | 0,38 ms · 71 | 0,78 milioni | 410 ms |
| 77 | 0,03 ms · 64 | 0,17 ms · 79 | 0,42 ms · 71 | 0,64 milioni | 465 ms |
| 78 | 0,04 ms · 68 | 0,20 ms · 86 | 0,53 ms · 70 | 0,77 milioni | 485 ms |
| 79 | 0,10 ms · 63 | 0,26 ms · 79 | 0,93 ms · 63 | 0,67 milioni | 592 ms |
| 80 | 0,06 ms · 88 | 0,27 ms · 108 | 0,55 ms · 90 | 1,05 milioni | 501 ms |
| 81 | 0,02 ms · 44 | 0,19 ms · 64 | 0,68 ms · 49 | 0,40 milioni | 602 ms |
| 82 | 0,05 ms · 74 | 0,21 ms · 89 | 0,83 ms · 65 | 0,76 milioni | 428 ms |
| 83 | 0,07 ms · 56 | 0,51 ms · 68 | 0,99 ms · 54 | 0,68 milioni | 432 ms |
| 84 | 0,09 ms · 98 | 0,26 ms · 113 | 0,44 ms · 94 | 1,19 milioni | 652 ms |
| 85 | 0,03 ms · 55 | 0,19 ms · 65 | 0,31 ms · 59 | 0,49 milioni | 543 ms |
| 86 | 0,11 ms · 59 | 0,38 ms · 80 | 0,80 ms · 66 | 0,63 milioni | 586 ms |
| 87 | 0,02 ms · 46 | 0,19 ms · 55 | 0,59 ms · 49 | 0,42 milioni | 530 ms |
| 88 | 0,12 ms · 65 | 0,30 ms · 79 | 0,65 ms · 67 | 0,70 milioni | 423 ms |
| 89 | 0,04 ms · 54 | 0,28 ms · 60 | 0,54 ms · 58 | 0,49 milioni | 519 ms |
| 90 | 0,07 ms · 80 | 0,21 ms · 98 | 0,58 ms · 71 | 0,83 milioni | 612 ms |
| 91 | 0,08 ms · 60 | 0,23 ms · 78 | 0,84 ms · 63 | 0,66 milioni | 600 ms |
| 92 | 0,02 ms · 48 | 0,18 ms · 60 | 0,54 ms · 54 | 0,47 milioni | 450 ms |
| 93 | 0,04 ms · 60 | 0,41 ms · 77 | 0,58 ms · 62 | 0,60 milioni | 466 ms |
| 94 | 0,06 ms · 62 | 0,20 ms · 75 | 0,31 ms · 60 | 0,65 milioni | 528 ms |
| 95 | 0,17 ms · 69 | 0,41 ms · 78 | 0,63 ms · 61 | 0,81 milioni | 712 ms |
| 96 | 0,04 ms · 47 | 0,25 ms · 53 | 0,81 ms · 49 | 0,40 milioni | 407 ms |
| 97 | 0,02 ms · 59 | 0,34 ms · 64 | 0,52 ms · 55 | 0,51 milioni | 480 ms |
| 98 | 0,06 ms · 59 | 0,19 ms · 69 | 0,58 ms · 62 | 0,57 milioni | 529 ms |
| 99 | 0,04 ms · 50 | 0,34 ms · 62 | 0,54 ms · 51 | 0,41 milioni | 489 ms |
| 100 | 0,20 ms · 85 | 0,32 ms · 101 | 0,64 ms · 85 | 1,05 milioni | 679 ms |
| 101 | 0,02 ms · 47 | 0,18 ms · 60 | 0,52 ms · 46 | 0,42 milioni | 492 ms |
| 102 | 0,02 ms · 47 | 0,22 ms · 57 | 0,57 ms · 45 | 0,40 milioni | 516 ms |
| 103 | 0,08 ms · 64 | 0,22 ms · 78 | 0,81 ms · 69 | 0,79 milioni | 420 ms |
| 104 | 0,06 ms · 81 | 0,21 ms · 99 | 0,32 ms · 84 | 1,04 milioni | 476 ms |
| 105 | 0,09 ms · 89 | 0,29 ms · 113 | 0,67 ms · 81 | 1,05 milioni | 661 ms |
| 106 | 0,05 ms · 68 | 0,20 ms · 79 | 0,80 ms · 67 | 1,02 milioni | 645 ms |
| 107 | 0,17 ms · 79 | 0,39 ms · 97 | 0,76 ms · 52 | 1,11 milioni | 821 ms |
| 108 | 0,08 ms · 82 | 0,30 ms · 104 | 0,63 ms · 81 | 0,91 milioni | 755 ms |
| 109 | 0,02 ms · 60 | 0,18 ms · 63 | 0,20 ms · 58 | 0,53 milioni | 595 ms |
| 110 | 0,03 ms · 51 | 0,18 ms · 61 | 0,33 ms · 52 | 0,58 milioni | 487 ms |
| 111 | 0,13 ms · 75 | 0,23 ms · 97 | 0,68 ms · 74 | 0,88 milioni | 758 ms |
| 112 | 0,14 ms · 69 | 0,29 ms · 91 | 0,97 ms · 69 | 0,89 milioni | 660 ms |
| 113 | 0,03 ms · 48 | 0,18 ms · 65 | 0,19 ms · 55 | 0,51 milioni | 397 ms |
| 114 | 0,02 ms · 46 | 0,18 ms · 59 | 0,77 ms · 51 | 0,49 milioni | 452 ms |
| 115 | 0,04 ms · 63 | 0,31 ms · 75 | 0,52 ms · 60 | 0,65 milioni | 520 ms |
| 116 | 0,14 ms · 87 | 0,38 ms · 111 | 0,64 ms · 77 | 1,08 milioni | 745 ms |
| 117 | 0,09 ms · 78 | 0,24 ms · 92 | 1,00 ms · 77 | 0,82 milioni | 618 ms |
| 118 | 0,06 ms · 57 | 0,21 ms · 71 | 0,62 ms · 64 | 0,57 milioni | 593 ms |
| 119 | 0,02 ms · 48 | 0,25 ms · 58 | 1,00 ms · 46 | 0,41 milioni | 469 ms |
| 120 | 0,15 ms · 55 | 0,36 ms · 72 | 0,74 ms · 53 | 0,63 milioni | 551 ms |
| 121 | 0,08 ms · 79 | 0,25 ms · 99 | 0,67 ms · 83 | 1,08 milioni | 730 ms |
| 122 | 0,07 ms · 67 | 0,23 ms · 82 | 0,69 ms · 61 | 0,69 milioni | 431 ms |
| 123 | 0,04 ms · 55 | 0,22 ms · 67 | 0,62 ms · 57 | 0,48 milioni | 613 ms |
| 124 | 0,09 ms · 69 | 0,28 ms · 80 | 0,57 ms · 65 | 0,80 milioni | 586 ms |
| 125 | 0,06 ms · 80 | 0,39 ms · 100 | 0,63 ms · 71 | 0,90 milioni | 709 ms |
