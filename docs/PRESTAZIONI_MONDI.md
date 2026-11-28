# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,07 ms | 0,16 ms | 8,8 ms | 60 / 91 | 1,12 milioni | 4269 |
| camera delle stazioni | bilanciato | 0,06 ms | 0,13 ms | 6,5 ms | 58 / 89 | 0,83 milioni | 3103 |
| camera delle stazioni | leggero | 0,06 ms | 0,12 ms | 1,6 ms | 55 / 78 | 0,63 milioni | 1938 |
| esploratore in corsa | dettaglio alto | 0,25 ms | 1,97 ms | 9,5 ms | 77 / 109 | 1,19 milioni | 4250 |
| esploratore in corsa | bilanciato | 0,23 ms | 1,93 ms | 6,7 ms | 75 / 107 | 0,91 milioni | 3089 |
| esploratore in corsa | leggero | 0,23 ms | 1,86 ms | 9,1 ms | 71 / 101 | 0,67 milioni | 1930 |
| rover a 1,3 km dalla base | dettaglio alto | 0,64 ms | 3,79 ms | 14,5 ms | 62 / 91 | 0,72 milioni | 2893 |
| rover a 1,3 km dalla base | bilanciato | 0,66 ms | 3,93 ms | 17,4 ms | 61 / 88 | 0,68 milioni | 2679 |
| rover a 1,3 km dalla base | leggero | 0,63 ms | 3,80 ms | 17,8 ms | 59 / 82 | 0,65 milioni | 2470 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Algebra» (pianeta 2), con 1,87 ms in media (rover a 1,3 km dalla base, bilanciato); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,19 milioni, e quello con più chiamate di disegno «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 109. Con il dettaglio alto la preparazione richiede in media 0,07 ms con la camera delle stazioni, 0,25 ms con l'esploratore e 0,64 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie. Dalla 1.73.0 i siti della zona entro 1050 unità dalla camera hanno un modello semplificato, costruito uno per fotogramma a partire dal più vicino, e quello dettagliato entro 200 unità. Dalla 1.74.0 lo stesso vale per i luoghi rari, e i modelli semplificati di siti e luoghi rari di ogni quarto della zona sono uniti in una sola mesh: costano al più quattro chiamate di disegno, più una per ogni modello dettagliato entro 70 unità dalla camera.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 170 ms | 269 ms | 655 ms |
| Maglie dei modelli | 406 ms | 597 ms | 1169 ms |
| Memoria delle maglie e delle istanze | 16,7 MiB | 18,8 MiB | 21,7 MiB |

La superficie più lunga da costruire è quella di «Orbite circolari» (pianeta 38), con 1402 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 21,7 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 5 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 197 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,14 / 2,1 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 5,37 / 177,4 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,57 / 2,5 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,40 / 2,2 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,86 / 2,3 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 3,50 / 4,8 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 1,4 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,11 ms · 56 | 0,35 ms · 73 | 0,58 ms · 58 | 0,65 milioni | 1040 ms |
| 2 | 0,14 ms · 66 | 0,31 ms · 90 | 0,79 ms · 66 | 1,09 milioni | 1167 ms |
| 3 | 0,06 ms · 53 | 0,29 ms · 65 | 0,60 ms · 52 | 0,50 milioni | 749 ms |
| 4 | 0,11 ms · 53 | 0,39 ms · 73 | 0,79 ms · 57 | 0,70 milioni | 777 ms |
| 5 | 0,14 ms · 51 | 0,22 ms · 69 | 0,55 ms · 54 | 0,58 milioni | 758 ms |
| 6 | 0,03 ms · 48 | 0,17 ms · 63 | 0,80 ms · 56 | 0,55 milioni | 789 ms |
| 7 | 0,08 ms · 77 | 0,21 ms · 102 | 0,70 ms · 76 | 1,02 milioni | 909 ms |
| 8 | 0,11 ms · 76 | 0,26 ms · 105 | 0,73 ms · 73 | 0,93 milioni | 980 ms |
| 9 | 0,17 ms · 79 | 0,43 ms · 94 | 0,62 ms · 76 | 1,02 milioni | 849 ms |
| 10 | 0,16 ms · 80 | 0,44 ms · 99 | 0,56 ms · 75 | 0,92 milioni | 738 ms |
| 11 | 0,03 ms · 39 | 0,19 ms · 55 | 0,47 ms · 42 | 0,40 milioni | 974 ms |
| 12 | 0,12 ms · 77 | 0,25 ms · 108 | 0,62 ms · 75 | 1,12 milioni | 823 ms |
| 13 | 0,17 ms · 49 | 0,22 ms · 63 | 0,51 ms · 49 | 0,53 milioni | 927 ms |
| 14 | 0,10 ms · 82 | 0,36 ms · 96 | 0,83 ms · 74 | 1,04 milioni | 819 ms |
| 15 | 0,10 ms · 52 | 0,25 ms · 75 | 0,70 ms · 63 | 0,57 milioni | 801 ms |
| 16 | 0,03 ms · 40 | 0,18 ms · 56 | 0,55 ms · 45 | 0,41 milioni | 829 ms |
| 17 | 0,12 ms · 57 | 0,38 ms · 72 | 0,76 ms · 64 | 0,72 milioni | 1052 ms |
| 18 | 0,05 ms · 75 | 0,18 ms · 99 | 0,76 ms · 81 | 0,99 milioni | 871 ms |
| 19 | 0,08 ms · 53 | 0,23 ms · 75 | 0,21 ms · 61 | 0,64 milioni | 906 ms |
| 20 | 0,03 ms · 42 | 0,17 ms · 56 | 0,75 ms · 53 | 0,44 milioni | 1065 ms |
| 21 | 0,06 ms · 74 | 0,22 ms · 89 | 0,69 ms · 70 | 0,93 milioni | 1059 ms |
| 22 | 0,03 ms · 56 | 0,19 ms · 71 | 0,68 ms · 60 | 0,66 milioni | 728 ms |
| 23 | 0,07 ms · 81 | 0,22 ms · 100 | 0,65 ms · 81 | 1,17 milioni | 736 ms |
| 24 | 0,17 ms · 55 | 0,20 ms · 71 | 1,01 ms · 61 | 0,67 milioni | 787 ms |
| 25 | 0,10 ms · 80 | 0,27 ms · 94 | 0,97 ms · 72 | 1,04 milioni | 855 ms |
| 26 | 0,05 ms · 48 | 0,15 ms · 55 | 0,58 ms · 48 | 0,42 milioni | 847 ms |
| 27 | 0,10 ms · 52 | 0,30 ms · 66 | 0,86 ms · 57 | 0,56 milioni | 742 ms |
| 28 | 0,06 ms · 58 | 0,19 ms · 77 | 0,84 ms · 66 | 0,65 milioni | 725 ms |
| 29 | 0,13 ms · 77 | 0,34 ms · 92 | 1,23 ms · 68 | 1,05 milioni | 1167 ms |
| 30 | 0,09 ms · 79 | 0,29 ms · 100 | 1,06 ms · 76 | 0,98 milioni | 829 ms |
| 31 | 0,04 ms · 54 | 0,23 ms · 66 | 0,68 ms · 58 | 0,56 milioni | 776 ms |
| 32 | 0,07 ms · 61 | 0,25 ms · 81 | 0,75 ms · 70 | 0,72 milioni | 784 ms |
| 33 | 0,06 ms · 53 | 0,28 ms · 72 | 0,18 ms · 62 | 0,56 milioni | 831 ms |
| 34 | 0,14 ms · 71 | 0,25 ms · 93 | 0,92 ms · 77 | 0,92 milioni | 751 ms |
| 35 | 0,04 ms · 56 | 0,20 ms · 72 | 0,53 ms · 66 | 0,61 milioni | 719 ms |
| 36 | 0,22 ms · 69 | 0,29 ms · 82 | 0,62 ms · 66 | 0,73 milioni | 757 ms |
| 37 | 0,09 ms · 81 | 0,27 ms · 99 | 0,65 ms · 65 | 0,96 milioni | 809 ms |
| 38 | 0,03 ms · 41 | 0,23 ms · 58 | 0,79 ms · 49 | 0,40 milioni | 1402 ms |
| 39 | 0,09 ms · 67 | 0,24 ms · 91 | 0,47 ms · 51 | 0,91 milioni | 880 ms |
| 40 | 0,03 ms · 51 | 0,17 ms · 72 | 0,73 ms · 56 | 0,74 milioni | 749 ms |
| 41 | 0,16 ms · 72 | 0,25 ms · 88 | 0,88 ms · 72 | 0,86 milioni | 1097 ms |
| 42 | 0,05 ms · 55 | 0,23 ms · 70 | 0,75 ms · 60 | 0,64 milioni | 724 ms |
| 43 | 0,06 ms · 53 | 0,24 ms · 76 | 0,71 ms · 63 | 0,66 milioni | 923 ms |
| 44 | 0,07 ms · 64 | 0,27 ms · 79 | 0,93 ms · 71 | 0,82 milioni | 777 ms |
| 45 | 0,03 ms · 51 | 0,19 ms · 73 | 0,75 ms · 58 | 0,58 milioni | 621 ms |
| 46 | 0,08 ms · 79 | 0,22 ms · 95 | 0,31 ms · 76 | 0,98 milioni | 1001 ms |
| 47 | 0,15 ms · 60 | 0,35 ms · 81 | 0,81 ms · 62 | 0,76 milioni | 650 ms |
| 48 | 0,03 ms · 52 | 0,27 ms · 63 | 0,23 ms · 59 | 0,54 milioni | 949 ms |
| 49 | 0,12 ms · 78 | 0,39 ms · 94 | 0,34 ms · 76 | 0,96 milioni | 820 ms |
| 50 | 0,09 ms · 54 | 0,31 ms · 71 | 0,54 ms · 60 | 0,68 milioni | 932 ms |
| 51 | 0,33 ms · 78 | 0,63 ms · 91 | 0,30 ms · 48 | 0,96 milioni | 1251 ms |
| 52 | 0,02 ms · 47 | 0,18 ms · 57 | 0,53 ms · 52 | 0,48 milioni | 914 ms |
| 53 | 0,02 ms · 39 | 0,29 ms · 55 | 0,48 ms · 49 | 0,39 milioni | 1008 ms |
| 54 | 0,10 ms · 83 | 0,42 ms · 104 | 0,98 ms · 79 | 1,12 milioni | 834 ms |
| 55 | 0,07 ms · 53 | 0,22 ms · 71 | 0,47 ms · 60 | 0,66 milioni | 684 ms |
| 56 | 0,04 ms · 55 | 0,27 ms · 76 | 0,57 ms · 67 | 0,57 milioni | 782 ms |
| 57 | 0,03 ms · 37 | 0,20 ms · 50 | 0,65 ms · 42 | 0,41 milioni | 1128 ms |
| 58 | 0,05 ms · 53 | 0,16 ms · 79 | 0,64 ms · 60 | 0,72 milioni | 924 ms |
| 59 | 0,21 ms · 78 | 0,28 ms · 92 | 0,51 ms · 68 | 1,09 milioni | 1061 ms |
| 60 | 0,06 ms · 81 | 0,40 ms · 94 | 0,54 ms · 66 | 1,02 milioni | 1032 ms |
| 61 | 0,04 ms · 56 | 0,31 ms · 64 | 0,51 ms · 57 | 0,56 milioni | 1369 ms |
| 62 | 0,02 ms · 38 | 0,18 ms · 53 | 0,66 ms · 41 | 0,40 milioni | 1202 ms |
| 63 | 0,02 ms · 56 | 0,14 ms · 71 | 0,42 ms · 55 | 0,55 milioni | 702 ms |
| 64 | 0,07 ms · 76 | 0,25 ms · 93 | 0,54 ms · 76 | 1,01 milioni | 961 ms |
| 65 | 0,03 ms · 46 | 0,20 ms · 57 | 0,52 ms · 51 | 0,41 milioni | 852 ms |
| 66 | 0,14 ms · 83 | 0,38 ms · 104 | 0,45 ms · 74 | 1,10 milioni | 1039 ms |
| 67 | 0,02 ms · 40 | 0,17 ms · 58 | 0,52 ms · 46 | 0,42 milioni | 857 ms |
| 68 | 0,05 ms · 48 | 0,17 ms · 67 | 0,81 ms · 55 | 0,68 milioni | 823 ms |
| 69 | 0,06 ms · 75 | 0,20 ms · 89 | 0,83 ms · 69 | 1,05 milioni | 686 ms |
| 70 | 0,05 ms · 58 | 0,21 ms · 73 | 0,48 ms · 66 | 0,78 milioni | 841 ms |
| 71 | 0,08 ms · 60 | 0,29 ms · 75 | 0,58 ms · 67 | 0,72 milioni | 731 ms |
| 72 | 0,02 ms · 40 | 0,19 ms · 60 | 0,49 ms · 46 | 0,41 milioni | 1067 ms |
| 73 | 0,17 ms · 79 | 0,24 ms · 101 | 0,71 ms · 78 | 1,02 milioni | 840 ms |
| 74 | 0,03 ms · 57 | 0,18 ms · 77 | 0,22 ms · 58 | 0,70 milioni | 665 ms |
| 75 | 0,09 ms · 67 | 0,26 ms · 93 | 0,94 ms · 68 | 0,85 milioni | 1162 ms |
| 76 | 0,05 ms · 58 | 0,23 ms · 80 | 0,34 ms · 68 | 0,78 milioni | 585 ms |
| 77 | 0,09 ms · 57 | 0,22 ms · 75 | 0,39 ms · 67 | 0,64 milioni | 717 ms |
| 78 | 0,04 ms · 61 | 0,21 ms · 82 | 0,55 ms · 67 | 0,77 milioni | 833 ms |
| 79 | 0,08 ms · 56 | 0,21 ms · 75 | 0,78 ms · 60 | 0,67 milioni | 901 ms |
| 80 | 0,09 ms · 81 | 0,30 ms · 104 | 0,48 ms · 87 | 1,04 milioni | 956 ms |
| 81 | 0,02 ms · 37 | 0,17 ms · 60 | 0,62 ms · 46 | 0,39 milioni | 872 ms |
| 82 | 0,07 ms · 67 | 0,33 ms · 85 | 0,58 ms · 61 | 0,76 milioni | 833 ms |
| 83 | 0,04 ms · 49 | 0,19 ms · 64 | 0,71 ms · 51 | 0,67 milioni | 883 ms |
| 84 | 0,08 ms · 91 | 0,27 ms · 109 | 0,62 ms · 91 | 1,19 milioni | 897 ms |
| 85 | 0,04 ms · 48 | 0,24 ms · 61 | 0,38 ms · 56 | 0,49 milioni | 848 ms |
| 86 | 0,10 ms · 52 | 0,29 ms · 76 | 0,71 ms · 63 | 0,62 milioni | 927 ms |
| 87 | 0,02 ms · 39 | 0,18 ms · 51 | 0,52 ms · 46 | 0,41 milioni | 823 ms |
| 88 | 0,08 ms · 58 | 0,22 ms · 75 | 0,90 ms · 64 | 0,69 milioni | 852 ms |
| 89 | 0,03 ms · 47 | 0,26 ms · 56 | 0,47 ms · 55 | 0,49 milioni | 1010 ms |
| 90 | 0,06 ms · 73 | 0,22 ms · 94 | 0,57 ms · 68 | 0,82 milioni | 960 ms |
| 91 | 0,08 ms · 53 | 0,20 ms · 74 | 0,73 ms · 60 | 0,66 milioni | 678 ms |
| 92 | 0,03 ms · 41 | 0,25 ms · 56 | 0,48 ms · 51 | 0,47 milioni | 986 ms |
| 93 | 0,06 ms · 53 | 0,24 ms · 73 | 0,48 ms · 60 | 0,60 milioni | 790 ms |
| 94 | 0,05 ms · 55 | 0,26 ms · 71 | 0,40 ms · 57 | 0,64 milioni | 1048 ms |
| 95 | 0,11 ms · 62 | 0,34 ms · 74 | 0,52 ms · 58 | 0,81 milioni | 970 ms |
| 96 | 0,02 ms · 40 | 0,29 ms · 49 | 0,67 ms · 46 | 0,40 milioni | 1258 ms |
| 97 | 0,04 ms · 52 | 0,15 ms · 60 | 0,44 ms · 52 | 0,50 milioni | 758 ms |
| 98 | 0,05 ms · 52 | 0,27 ms · 65 | 0,52 ms · 59 | 0,55 milioni | 789 ms |
| 99 | 0,04 ms · 43 | 0,18 ms · 58 | 0,77 ms · 48 | 0,41 milioni | 933 ms |
| 100 | 0,08 ms · 78 | 0,25 ms · 97 | 0,63 ms · 82 | 1,05 milioni | 963 ms |
| 101 | 0,03 ms · 40 | 0,26 ms · 56 | 0,72 ms · 43 | 0,42 milioni | 1178 ms |
| 102 | 0,02 ms · 40 | 0,22 ms · 53 | 0,71 ms · 42 | 0,40 milioni | 1389 ms |
| 103 | 0,06 ms · 57 | 0,33 ms · 74 | 0,61 ms · 65 | 0,79 milioni | 903 ms |
| 104 | 0,14 ms · 74 | 0,34 ms · 95 | 0,33 ms · 80 | 1,04 milioni | 1083 ms |
| 105 | 0,14 ms · 82 | 0,41 ms · 109 | 0,74 ms · 78 | 1,03 milioni | 1108 ms |
| 106 | 0,10 ms · 61 | 0,26 ms · 75 | 1,16 ms · 64 | 1,00 milioni | 930 ms |
| 107 | 0,11 ms · 72 | 0,29 ms · 93 | 1,13 ms · 49 | 1,10 milioni | 1359 ms |
| 108 | 0,07 ms · 75 | 0,28 ms · 100 | 0,88 ms · 78 | 0,91 milioni | 953 ms |
| 109 | 0,03 ms · 53 | 0,23 ms · 59 | 0,20 ms · 55 | 0,51 milioni | 1111 ms |
| 110 | 0,02 ms · 44 | 0,17 ms · 57 | 0,43 ms · 49 | 0,58 milioni | 964 ms |
| 111 | 0,09 ms · 68 | 0,21 ms · 93 | 0,58 ms · 71 | 0,88 milioni | 1022 ms |
| 112 | 0,18 ms · 62 | 0,36 ms · 87 | 0,78 ms · 65 | 0,88 milioni | 1046 ms |
| 113 | 0,02 ms · 41 | 0,18 ms · 61 | 0,16 ms · 52 | 0,50 milioni | 769 ms |
| 114 | 0,03 ms · 39 | 0,25 ms · 55 | 0,50 ms · 48 | 0,49 milioni | 846 ms |
| 115 | 0,02 ms · 56 | 0,17 ms · 71 | 0,49 ms · 57 | 0,64 milioni | 823 ms |
| 116 | 0,11 ms · 80 | 0,28 ms · 107 | 0,97 ms · 74 | 1,06 milioni | 672 ms |
| 117 | 0,07 ms · 71 | 0,23 ms · 88 | 1,37 ms · 74 | 0,82 milioni | 1085 ms |
| 118 | 0,03 ms · 50 | 0,17 ms · 67 | 0,52 ms · 61 | 0,57 milioni | 717 ms |
| 119 | 0,04 ms · 41 | 0,25 ms · 54 | 0,78 ms · 43 | 0,40 milioni | 918 ms |
| 120 | 0,06 ms · 48 | 0,18 ms · 68 | 0,56 ms · 50 | 0,63 milioni | 700 ms |
| 121 | 0,11 ms · 72 | 0,35 ms · 95 | 1,07 ms · 81 | 1,07 milioni | 786 ms |
| 122 | 0,05 ms · 60 | 0,22 ms · 78 | 0,81 ms · 58 | 0,67 milioni | 813 ms |
| 123 | 0,04 ms · 48 | 0,17 ms · 63 | 0,51 ms · 54 | 0,48 milioni | 644 ms |
| 124 | 0,05 ms · 62 | 0,20 ms · 76 | 0,53 ms · 62 | 0,80 milioni | 806 ms |
| 125 | 0,04 ms · 73 | 0,34 ms · 96 | 0,48 ms · 68 | 0,90 milioni | 831 ms |
