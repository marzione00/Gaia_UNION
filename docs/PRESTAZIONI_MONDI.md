# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento e con la nave dell'esploratore sulla piazzola della base, in discesa con i getti e la polvere nella vista delle stazioni, a terra con la rampa aperta nelle altre due; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,32 ms | 1,47 ms | 115,5 ms | 67 / 98 | 1,14 milioni | 4287 |
| camera delle stazioni | bilanciato | 0,08 ms | 0,19 ms | 4,4 ms | 65 / 96 | 0,85 milioni | 3129 |
| camera delle stazioni | leggero | 0,08 ms | 0,16 ms | 18,2 ms | 62 / 85 | 0,65 milioni | 1968 |
| esploratore in corsa | dettaglio alto | 0,33 ms | 2,41 ms | 14,9 ms | 81 / 113 | 1,20 milioni | 4233 |
| esploratore in corsa | bilanciato | 0,28 ms | 2,27 ms | 18,2 ms | 79 / 111 | 0,92 milioni | 3077 |
| esploratore in corsa | leggero | 0,26 ms | 2,01 ms | 10,7 ms | 76 / 105 | 0,67 milioni | 1917 |
| rover a 1,3 km dalla base | dettaglio alto | 0,81 ms | 4,50 ms | 20,0 ms | 65 / 94 | 0,72 milioni | 2891 |
| rover a 1,3 km dalla base | bilanciato | 0,74 ms | 4,14 ms | 15,4 ms | 64 / 91 | 0,69 milioni | 2677 |
| rover a 1,3 km dalla base | leggero | 0,76 ms | 4,31 ms | 14,6 ms | 62 / 85 | 0,66 milioni | 2468 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Radiazione termica e luce delle stelle» (pianeta 115), con 2,33 ms in media (camera delle stazioni, dettaglio alto); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,20 milioni, e quello con più chiamate di disegno «Dagli zeri alla struttura di un polinomio» (pianeta 12), con 113. Con il dettaglio alto la preparazione richiede in media 0,32 ms con la camera delle stazioni, 0,33 ms con l'esploratore e 0,81 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie. Dalla 1.73.0 i siti della zona entro 1050 unità dalla camera hanno un modello semplificato, costruito uno per fotogramma a partire dal più vicino, e quello dettagliato entro 200 unità. Dalla 1.74.0 lo stesso vale per i luoghi rari, e i modelli semplificati di siti e luoghi rari di ogni quarto della zona sono uniti in una sola mesh: costano al più quattro chiamate di disegno, più una per ogni modello dettagliato entro 70 unità dalla camera.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie. Dalla 1.77.0 le tre griglie esterne del terreno, oltre 256 unità dal centro della vista, si costruiscono nei fotogrammi seguenti, 10 ms per fotogramma: da 20 a 57 fotogrammi, in mediana 26.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 183 ms | 302 ms | 680 ms |
| Maglie dei modelli | 242 ms | 379 ms | 729 ms |
| Terreno lontano, nei fotogrammi seguenti | 197 ms | 270 ms | 669 ms |
| Memoria delle maglie e delle istanze | 17,5 MiB | 19,5 MiB | 22,4 MiB |

La superficie più lunga da costruire è quella di «Algebra» (pianeta 2), con 1363 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 22,4 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 7 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 246 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,16 / 4,0 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 5,72 / 34,7 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,64 / 2,7 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,43 / 1,6 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 1,00 / 3,4 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 4,01 / 5,0 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 2,4 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,40 ms · 63 | 0,51 ms · 77 | 1,55 ms · 60 | 0,66 milioni | 1033 ms |
| 2 | 0,45 ms · 73 | 1,17 ms · 94 | 1,60 ms · 69 | 1,10 milioni | 1363 ms |
| 3 | 0,80 ms · 60 | 0,53 ms · 69 | 1,32 ms · 55 | 0,51 milioni | 805 ms |
| 4 | 0,33 ms · 61 | 0,47 ms · 78 | 0,75 ms · 62 | 0,71 milioni | 725 ms |
| 5 | 0,31 ms · 58 | 0,62 ms · 73 | 0,71 ms · 57 | 0,59 milioni | 791 ms |
| 6 | 0,40 ms · 55 | 0,31 ms · 67 | 0,91 ms · 59 | 0,56 milioni | 813 ms |
| 7 | 0,23 ms · 84 | 0,38 ms · 106 | 1,34 ms · 80 | 1,03 milioni | 815 ms |
| 8 | 0,28 ms · 84 | 0,33 ms · 110 | 0,61 ms · 77 | 0,94 milioni | 554 ms |
| 9 | 0,31 ms · 86 | 0,17 ms · 98 | 0,87 ms · 79 | 1,04 milioni | 922 ms |
| 10 | 0,14 ms · 87 | 0,27 ms · 103 | 0,85 ms · 78 | 0,92 milioni | 480 ms |
| 11 | 0,37 ms · 46 | 0,35 ms · 59 | 0,63 ms · 45 | 0,41 milioni | 666 ms |
| 12 | 0,32 ms · 85 | 0,34 ms · 113 | 1,17 ms · 79 | 1,13 milioni | 755 ms |
| 13 | 0,47 ms · 56 | 0,50 ms · 67 | 0,71 ms · 52 | 0,54 milioni | 605 ms |
| 14 | 0,19 ms · 89 | 0,35 ms · 100 | 0,83 ms · 77 | 1,06 milioni | 728 ms |
| 15 | 0,14 ms · 59 | 0,25 ms · 79 | 0,95 ms · 66 | 0,57 milioni | 550 ms |
| 16 | 0,29 ms · 47 | 0,21 ms · 60 | 0,74 ms · 49 | 0,42 milioni | 755 ms |
| 17 | 0,17 ms · 64 | 0,25 ms · 76 | 0,95 ms · 67 | 0,73 milioni | 624 ms |
| 18 | 0,17 ms · 82 | 0,44 ms · 103 | 0,92 ms · 84 | 1,00 milioni | 800 ms |
| 19 | 0,45 ms · 60 | 0,34 ms · 79 | 0,34 ms · 64 | 0,65 milioni | 587 ms |
| 20 | 0,17 ms · 49 | 0,13 ms · 60 | 0,59 ms · 56 | 0,45 milioni | 589 ms |
| 21 | 0,16 ms · 83 | 0,39 ms · 95 | 0,97 ms · 75 | 0,93 milioni | 979 ms |
| 22 | 0,29 ms · 63 | 0,27 ms · 75 | 0,72 ms · 63 | 0,68 milioni | 581 ms |
| 23 | 0,21 ms · 89 | 0,23 ms · 105 | 1,03 ms · 85 | 1,17 milioni | 686 ms |
| 24 | 0,07 ms · 63 | 0,25 ms · 76 | 0,82 ms · 64 | 0,68 milioni | 797 ms |
| 25 | 0,28 ms · 88 | 0,28 ms · 99 | 0,75 ms · 76 | 1,05 milioni | 696 ms |
| 26 | 0,22 ms · 55 | 0,22 ms · 59 | 0,68 ms · 51 | 0,43 milioni | 534 ms |
| 27 | 0,31 ms · 59 | 0,26 ms · 70 | 0,64 ms · 60 | 0,57 milioni | 571 ms |
| 28 | 0,25 ms · 65 | 0,24 ms · 81 | 0,87 ms · 69 | 0,67 milioni | 747 ms |
| 29 | 0,25 ms · 84 | 0,41 ms · 96 | 1,63 ms · 71 | 1,07 milioni | 894 ms |
| 30 | 0,30 ms · 86 | 0,47 ms · 104 | 0,88 ms · 79 | 1,00 milioni | 712 ms |
| 31 | 0,36 ms · 61 | 0,30 ms · 70 | 0,69 ms · 61 | 0,57 milioni | 552 ms |
| 32 | 0,24 ms · 69 | 0,25 ms · 86 | 0,62 ms · 74 | 0,74 milioni | 619 ms |
| 33 | 0,22 ms · 60 | 0,29 ms · 76 | 0,42 ms · 65 | 0,57 milioni | 600 ms |
| 34 | 0,17 ms · 78 | 0,25 ms · 97 | 0,72 ms · 80 | 0,92 milioni | 545 ms |
| 35 | 0,43 ms · 63 | 0,28 ms · 76 | 0,72 ms · 69 | 0,62 milioni | 798 ms |
| 36 | 0,12 ms · 76 | 0,25 ms · 86 | 0,75 ms · 69 | 0,74 milioni | 491 ms |
| 37 | 0,19 ms · 89 | 0,26 ms · 104 | 0,26 ms · 70 | 0,97 milioni | 631 ms |
| 38 | 0,45 ms · 48 | 0,29 ms · 62 | 0,60 ms · 52 | 0,41 milioni | 768 ms |
| 39 | 0,28 ms · 75 | 0,38 ms · 96 | 0,54 ms · 54 | 0,92 milioni | 647 ms |
| 40 | 0,04 ms · 58 | 0,19 ms · 76 | 0,87 ms · 59 | 0,74 milioni | 615 ms |
| 41 | 0,33 ms · 79 | 0,34 ms · 92 | 1,33 ms · 75 | 0,87 milioni | 953 ms |
| 42 | 0,39 ms · 62 | 0,35 ms · 74 | 0,87 ms · 64 | 0,65 milioni | 621 ms |
| 43 | 0,28 ms · 60 | 0,27 ms · 80 | 1,25 ms · 66 | 0,67 milioni | 856 ms |
| 44 | 0,18 ms · 71 | 0,28 ms · 83 | 0,78 ms · 74 | 0,84 milioni | 580 ms |
| 45 | 0,46 ms · 58 | 0,43 ms · 77 | 1,36 ms · 61 | 0,59 milioni | 833 ms |
| 46 | 0,10 ms · 86 | 0,26 ms · 99 | 0,35 ms · 79 | 1,00 milioni | 841 ms |
| 47 | 0,43 ms · 68 | 0,47 ms · 86 | 1,44 ms · 66 | 0,78 milioni | 524 ms |
| 48 | 0,24 ms · 59 | 0,27 ms · 67 | 0,22 ms · 62 | 0,55 milioni | 697 ms |
| 49 | 0,11 ms · 85 | 0,30 ms · 98 | 0,90 ms · 79 | 0,97 milioni | 861 ms |
| 50 | 0,14 ms · 62 | 0,20 ms · 76 | 0,77 ms · 65 | 0,68 milioni | 537 ms |
| 51 | 0,31 ms · 85 | 0,45 ms · 95 | 0,68 ms · 51 | 0,97 milioni | 1053 ms |
| 52 | 0,35 ms · 54 | 0,21 ms · 61 | 0,76 ms · 55 | 0,49 milioni | 672 ms |
| 53 | 0,24 ms · 46 | 0,46 ms · 59 | 0,61 ms · 52 | 0,40 milioni | 663 ms |
| 54 | 0,49 ms · 90 | 0,51 ms · 108 | 1,36 ms · 82 | 1,14 milioni | 757 ms |
| 55 | 0,16 ms · 61 | 0,26 ms · 76 | 0,63 ms · 65 | 0,67 milioni | 582 ms |
| 56 | 0,38 ms · 62 | 0,81 ms · 80 | 0,67 ms · 70 | 0,58 milioni | 733 ms |
| 57 | 0,19 ms · 44 | 0,19 ms · 54 | 0,74 ms · 45 | 0,41 milioni | 738 ms |
| 58 | 0,09 ms · 62 | 0,24 ms · 85 | 0,79 ms · 65 | 0,73 milioni | 648 ms |
| 59 | 0,44 ms · 85 | 0,40 ms · 96 | 1,03 ms · 71 | 1,10 milioni | 1116 ms |
| 60 | 0,34 ms · 88 | 0,70 ms · 98 | 1,11 ms · 69 | 1,03 milioni | 784 ms |
| 61 | 0,03 ms · 63 | 0,20 ms · 68 | 0,61 ms · 61 | 0,57 milioni | 997 ms |
| 62 | 0,19 ms · 45 | 0,32 ms · 57 | 0,68 ms · 44 | 0,41 milioni | 656 ms |
| 63 | 0,23 ms · 63 | 0,25 ms · 75 | 0,60 ms · 58 | 0,58 milioni | 598 ms |
| 64 | 0,25 ms · 84 | 0,38 ms · 97 | 0,77 ms · 80 | 1,02 milioni | 669 ms |
| 65 | 0,22 ms · 53 | 0,22 ms · 61 | 0,61 ms · 54 | 0,42 milioni | 744 ms |
| 66 | 0,24 ms · 90 | 0,33 ms · 108 | 0,41 ms · 77 | 1,10 milioni | 742 ms |
| 67 | 0,37 ms · 47 | 0,29 ms · 62 | 0,57 ms · 50 | 0,43 milioni | 678 ms |
| 68 | 0,29 ms · 55 | 0,27 ms · 71 | 0,87 ms · 58 | 0,69 milioni | 583 ms |
| 69 | 0,11 ms · 83 | 0,33 ms · 94 | 1,20 ms · 73 | 1,05 milioni | 633 ms |
| 70 | 0,14 ms · 66 | 0,34 ms · 78 | 0,48 ms · 70 | 0,80 milioni | 598 ms |
| 71 | 0,12 ms · 67 | 0,37 ms · 79 | 1,03 ms · 70 | 0,74 milioni | 694 ms |
| 72 | 0,42 ms · 47 | 0,29 ms · 64 | 0,58 ms · 50 | 0,42 milioni | 746 ms |
| 73 | 0,37 ms · 86 | 0,45 ms · 105 | 1,34 ms · 80 | 1,03 milioni | 586 ms |
| 74 | 0,27 ms · 64 | 0,25 ms · 81 | 0,47 ms · 62 | 0,71 milioni | 696 ms |
| 75 | 0,18 ms · 74 | 0,35 ms · 97 | 1,17 ms · 71 | 0,86 milioni | 1190 ms |
| 76 | 2,18 ms · 65 | 0,33 ms · 84 | 0,43 ms · 71 | 0,79 milioni | 618 ms |
| 77 | 0,33 ms · 64 | 0,32 ms · 79 | 0,83 ms · 71 | 0,65 milioni | 825 ms |
| 78 | 0,09 ms · 68 | 0,22 ms · 86 | 0,56 ms · 70 | 0,78 milioni | 805 ms |
| 79 | 0,32 ms · 63 | 0,27 ms · 79 | 0,70 ms · 63 | 0,68 milioni | 611 ms |
| 80 | 0,14 ms · 88 | 0,24 ms · 108 | 0,59 ms · 90 | 1,05 milioni | 842 ms |
| 81 | 0,24 ms · 44 | 0,22 ms · 64 | 1,19 ms · 49 | 0,40 milioni | 657 ms |
| 82 | 0,10 ms · 74 | 0,22 ms · 89 | 0,66 ms · 65 | 0,76 milioni | 495 ms |
| 83 | 0,26 ms · 56 | 0,23 ms · 68 | 0,84 ms · 54 | 0,68 milioni | 514 ms |
| 84 | 0,43 ms · 98 | 0,46 ms · 113 | 0,59 ms · 94 | 1,20 milioni | 938 ms |
| 85 | 0,24 ms · 55 | 0,20 ms · 65 | 0,29 ms · 59 | 0,50 milioni | 592 ms |
| 86 | 0,28 ms · 60 | 0,40 ms · 81 | 0,73 ms · 67 | 0,63 milioni | 736 ms |
| 87 | 0,40 ms · 46 | 0,32 ms · 55 | 0,70 ms · 49 | 0,42 milioni | 655 ms |
| 88 | 1,53 ms · 65 | 0,29 ms · 79 | 0,78 ms · 67 | 0,70 milioni | 888 ms |
| 89 | 0,23 ms · 54 | 0,20 ms · 60 | 1,01 ms · 58 | 0,50 milioni | 585 ms |
| 90 | 0,19 ms · 80 | 0,23 ms · 98 | 0,99 ms · 71 | 0,84 milioni | 708 ms |
| 91 | 0,24 ms · 61 | 0,24 ms · 79 | 1,13 ms · 65 | 0,67 milioni | 605 ms |
| 92 | 0,30 ms · 48 | 0,30 ms · 60 | 0,99 ms · 54 | 0,48 milioni | 638 ms |
| 93 | 0,38 ms · 61 | 0,39 ms · 78 | 1,24 ms · 63 | 0,61 milioni | 812 ms |
| 94 | 0,32 ms · 62 | 0,35 ms · 75 | 0,56 ms · 60 | 0,65 milioni | 631 ms |
| 95 | 0,19 ms · 69 | 0,30 ms · 78 | 1,02 ms · 61 | 0,81 milioni | 569 ms |
| 96 | 0,25 ms · 47 | 0,22 ms · 53 | 0,63 ms · 49 | 0,41 milioni | 551 ms |
| 97 | 0,45 ms · 59 | 0,34 ms · 64 | 0,60 ms · 55 | 0,52 milioni | 549 ms |
| 98 | 0,35 ms · 59 | 0,36 ms · 69 | 0,65 ms · 62 | 0,58 milioni | 655 ms |
| 99 | 0,20 ms · 50 | 0,21 ms · 62 | 0,70 ms · 51 | 0,42 milioni | 515 ms |
| 100 | 0,52 ms · 85 | 0,51 ms · 101 | 0,75 ms · 85 | 1,06 milioni | 729 ms |
| 101 | 0,23 ms · 47 | 0,18 ms · 60 | 0,56 ms · 46 | 0,43 milioni | 679 ms |
| 102 | 0,28 ms · 47 | 0,25 ms · 57 | 0,66 ms · 46 | 0,41 milioni | 654 ms |
| 103 | 0,42 ms · 65 | 0,42 ms · 79 | 0,60 ms · 70 | 0,80 milioni | 602 ms |
| 104 | 0,07 ms · 81 | 0,24 ms · 99 | 0,37 ms · 84 | 1,04 milioni | 708 ms |
| 105 | 0,44 ms · 89 | 0,49 ms · 113 | 1,24 ms · 81 | 1,06 milioni | 958 ms |
| 106 | 0,12 ms · 68 | 0,36 ms · 79 | 1,50 ms · 68 | 1,02 milioni | 697 ms |
| 107 | 0,32 ms · 79 | 0,51 ms · 97 | 0,80 ms · 52 | 1,11 milioni | 1356 ms |
| 108 | 0,23 ms · 82 | 0,33 ms · 104 | 1,13 ms · 81 | 0,92 milioni | 869 ms |
| 109 | 0,28 ms · 60 | 0,22 ms · 63 | 0,26 ms · 58 | 0,54 milioni | 873 ms |
| 110 | 0,27 ms · 51 | 0,20 ms · 61 | 0,42 ms · 53 | 0,59 milioni | 939 ms |
| 111 | 0,43 ms · 75 | 0,31 ms · 97 | 0,74 ms · 74 | 0,89 milioni | 938 ms |
| 112 | 0,16 ms · 70 | 0,35 ms · 92 | 1,11 ms · 70 | 0,89 milioni | 952 ms |
| 113 | 0,31 ms · 48 | 0,30 ms · 65 | 0,26 ms · 55 | 0,51 milioni | 670 ms |
| 114 | 0,36 ms · 46 | 0,28 ms · 59 | 0,72 ms · 51 | 0,50 milioni | 700 ms |
| 115 | 2,33 ms · 63 | 0,60 ms · 75 | 0,98 ms · 60 | 0,65 milioni | 537 ms |
| 116 | 0,60 ms · 87 | 0,45 ms · 111 | 0,80 ms · 77 | 1,08 milioni | 778 ms |
| 117 | 0,23 ms · 78 | 0,30 ms · 92 | 1,33 ms · 77 | 0,83 milioni | 769 ms |
| 118 | 0,45 ms · 57 | 0,26 ms · 71 | 0,75 ms · 64 | 0,58 milioni | 746 ms |
| 119 | 0,17 ms · 48 | 0,29 ms · 58 | 0,75 ms · 46 | 0,41 milioni | 625 ms |
| 120 | 0,13 ms · 57 | 0,30 ms · 74 | 0,97 ms · 55 | 0,64 milioni | 690 ms |
| 121 | 0,35 ms · 79 | 0,28 ms · 99 | 0,71 ms · 83 | 1,08 milioni | 678 ms |
| 122 | 0,42 ms · 67 | 0,38 ms · 82 | 0,74 ms · 61 | 0,69 milioni | 473 ms |
| 123 | 0,24 ms · 55 | 0,25 ms · 67 | 0,66 ms · 57 | 0,48 milioni | 690 ms |
| 124 | 0,19 ms · 71 | 0,24 ms · 82 | 0,65 ms · 67 | 0,81 milioni | 765 ms |
| 125 | 0,30 ms · 81 | 0,48 ms · 101 | 0,76 ms · 72 | 0,91 milioni | 737 ms |
