# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento e con la nave dell'esploratore sulla piazzola della base, in discesa con i getti e la polvere nella vista delle stazioni, a terra con la rampa aperta nelle altre due; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,09 ms | 0,18 ms | 6,6 ms | 67 / 98 | 1,14 milioni | 4287 |
| camera delle stazioni | bilanciato | 0,06 ms | 0,14 ms | 6,0 ms | 65 / 96 | 0,84 milioni | 3129 |
| camera delle stazioni | leggero | 0,06 ms | 0,13 ms | 2,4 ms | 62 / 85 | 0,65 milioni | 1968 |
| esploratore in corsa | dettaglio alto | 0,27 ms | 2,11 ms | 19,6 ms | 81 / 113 | 1,19 milioni | 4233 |
| esploratore in corsa | bilanciato | 0,23 ms | 1,76 ms | 17,2 ms | 79 / 111 | 0,91 milioni | 3077 |
| esploratore in corsa | leggero | 0,23 ms | 1,62 ms | 8,8 ms | 75 / 105 | 0,67 milioni | 1917 |
| rover a 1,3 km dalla base | dettaglio alto | 0,65 ms | 3,64 ms | 32,2 ms | 65 / 94 | 0,72 milioni | 2893 |
| rover a 1,3 km dalla base | bilanciato | 0,63 ms | 3,64 ms | 11,9 ms | 64 / 91 | 0,69 milioni | 2679 |
| rover a 1,3 km dalla base | leggero | 0,61 ms | 3,53 ms | 10,8 ms | 62 / 85 | 0,66 milioni | 2470 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Oscillazioni armoniche» (pianeta 41), con 1,51 ms in media (rover a 1,3 km dalla base, bilanciato); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,19 milioni, e quello con più chiamate di disegno «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 113. Con il dettaglio alto la preparazione richiede in media 0,09 ms con la camera delle stazioni, 0,27 ms con l'esploratore e 0,65 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie. Dalla 1.73.0 i siti della zona entro 1050 unità dalla camera hanno un modello semplificato, costruito uno per fotogramma a partire dal più vicino, e quello dettagliato entro 200 unità. Dalla 1.74.0 lo stesso vale per i luoghi rari, e i modelli semplificati di siti e luoghi rari di ogni quarto della zona sono uniti in una sola mesh: costano al più quattro chiamate di disegno, più una per ogni modello dettagliato entro 70 unità dalla camera.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 163 ms | 250 ms | 665 ms |
| Maglie dei modelli | 408 ms | 570 ms | 993 ms |
| Memoria delle maglie e delle istanze | 17,5 MiB | 19,5 MiB | 22,4 MiB |

La superficie più lunga da costruire è quella di «Atmosfere degli esopianeti e JWST» (pianeta 107), con 1585 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 22,4 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 8 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 381 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,17 / 2,6 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 6,39 / 191,8 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,66 / 3,8 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,38 / 2,7 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,89 / 13,3 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 3,55 / 5,1 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 1,7 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,18 ms · 63 | 0,30 ms · 77 | 0,61 ms · 60 | 0,66 milioni | 1015 ms |
| 2 | 0,56 ms · 73 | 0,55 ms · 94 | 0,92 ms · 69 | 1,09 milioni | 1238 ms |
| 3 | 0,05 ms · 60 | 0,24 ms · 69 | 0,52 ms · 55 | 0,50 milioni | 742 ms |
| 4 | 0,16 ms · 60 | 0,32 ms · 77 | 0,58 ms · 60 | 0,70 milioni | 874 ms |
| 5 | 0,15 ms · 58 | 0,28 ms · 73 | 1,15 ms · 57 | 0,59 milioni | 716 ms |
| 6 | 0,12 ms · 55 | 0,25 ms · 67 | 0,59 ms · 59 | 0,55 milioni | 813 ms |
| 7 | 0,09 ms · 84 | 0,24 ms · 106 | 0,83 ms · 79 | 1,03 milioni | 765 ms |
| 8 | 0,09 ms · 83 | 0,30 ms · 109 | 0,49 ms · 76 | 0,94 milioni | 759 ms |
| 9 | 0,09 ms · 86 | 0,29 ms · 98 | 0,56 ms · 79 | 1,04 milioni | 852 ms |
| 10 | 0,09 ms · 87 | 0,23 ms · 103 | 0,61 ms · 78 | 0,92 milioni | 701 ms |
| 11 | 0,03 ms · 46 | 0,19 ms · 59 | 0,45 ms · 45 | 0,41 milioni | 908 ms |
| 12 | 0,12 ms · 84 | 0,25 ms · 112 | 0,75 ms · 79 | 1,12 milioni | 805 ms |
| 13 | 0,16 ms · 56 | 0,22 ms · 67 | 0,77 ms · 52 | 0,53 milioni | 650 ms |
| 14 | 0,07 ms · 89 | 0,32 ms · 100 | 0,79 ms · 77 | 1,05 milioni | 848 ms |
| 15 | 0,05 ms · 59 | 0,22 ms · 79 | 0,67 ms · 66 | 0,57 milioni | 761 ms |
| 16 | 0,05 ms · 47 | 0,25 ms · 60 | 0,64 ms · 48 | 0,41 milioni | 910 ms |
| 17 | 0,07 ms · 64 | 0,22 ms · 76 | 0,61 ms · 67 | 0,73 milioni | 787 ms |
| 18 | 0,24 ms · 82 | 0,23 ms · 103 | 0,72 ms · 84 | 1,00 milioni | 785 ms |
| 19 | 0,14 ms · 60 | 0,32 ms · 79 | 0,38 ms · 64 | 0,64 milioni | 626 ms |
| 20 | 0,03 ms · 49 | 0,11 ms · 60 | 0,49 ms · 56 | 0,44 milioni | 804 ms |
| 21 | 0,08 ms · 81 | 0,22 ms · 93 | 0,84 ms · 73 | 0,93 milioni | 1100 ms |
| 22 | 0,04 ms · 63 | 0,26 ms · 75 | 0,79 ms · 63 | 0,67 milioni | 845 ms |
| 23 | 0,08 ms · 88 | 0,21 ms · 104 | 0,77 ms · 84 | 1,17 milioni | 609 ms |
| 24 | 0,11 ms · 62 | 0,61 ms · 75 | 0,65 ms · 64 | 0,68 milioni | 733 ms |
| 25 | 0,13 ms · 87 | 0,28 ms · 98 | 0,67 ms · 75 | 1,04 milioni | 685 ms |
| 26 | 0,04 ms · 55 | 0,18 ms · 59 | 0,49 ms · 51 | 0,43 milioni | 726 ms |
| 27 | 0,07 ms · 59 | 0,25 ms · 70 | 0,58 ms · 60 | 0,56 milioni | 790 ms |
| 28 | 0,07 ms · 65 | 0,21 ms · 81 | 0,58 ms · 69 | 0,66 milioni | 704 ms |
| 29 | 0,12 ms · 84 | 0,46 ms · 96 | 1,05 ms · 71 | 1,07 milioni | 1018 ms |
| 30 | 0,09 ms · 86 | 0,35 ms · 104 | 0,74 ms · 79 | 0,99 milioni | 731 ms |
| 31 | 0,04 ms · 61 | 0,20 ms · 70 | 0,93 ms · 61 | 0,56 milioni | 678 ms |
| 32 | 0,13 ms · 68 | 0,28 ms · 85 | 0,61 ms · 73 | 0,73 milioni | 804 ms |
| 33 | 0,06 ms · 60 | 0,18 ms · 76 | 0,17 ms · 65 | 0,57 milioni | 924 ms |
| 34 | 0,10 ms · 78 | 0,31 ms · 97 | 0,78 ms · 80 | 0,92 milioni | 626 ms |
| 35 | 0,05 ms · 63 | 0,18 ms · 76 | 0,58 ms · 69 | 0,62 milioni | 701 ms |
| 36 | 0,06 ms · 76 | 0,20 ms · 86 | 0,83 ms · 69 | 0,73 milioni | 679 ms |
| 37 | 0,18 ms · 88 | 0,23 ms · 103 | 0,69 ms · 68 | 0,97 milioni | 736 ms |
| 38 | 0,04 ms · 48 | 0,17 ms · 62 | 0,58 ms · 52 | 0,41 milioni | 923 ms |
| 39 | 0,08 ms · 74 | 0,31 ms · 95 | 0,87 ms · 54 | 0,91 milioni | 875 ms |
| 40 | 0,03 ms · 58 | 0,16 ms · 76 | 0,73 ms · 59 | 0,74 milioni | 734 ms |
| 41 | 0,17 ms · 79 | 0,45 ms · 92 | 1,34 ms · 75 | 0,87 milioni | 966 ms |
| 42 | 0,06 ms · 62 | 0,30 ms · 74 | 1,10 ms · 63 | 0,64 milioni | 770 ms |
| 43 | 0,11 ms · 60 | 0,30 ms · 80 | 0,53 ms · 66 | 0,67 milioni | 899 ms |
| 44 | 0,09 ms · 71 | 0,24 ms · 83 | 0,77 ms · 74 | 0,83 milioni | 710 ms |
| 45 | 0,04 ms · 58 | 0,18 ms · 77 | 0,56 ms · 61 | 0,59 milioni | 657 ms |
| 46 | 0,08 ms · 86 | 0,23 ms · 99 | 0,52 ms · 79 | 1,00 milioni | 1109 ms |
| 47 | 0,13 ms · 67 | 0,27 ms · 85 | 0,75 ms · 65 | 0,78 milioni | 768 ms |
| 48 | 0,02 ms · 59 | 0,17 ms · 67 | 0,17 ms · 62 | 0,55 milioni | 768 ms |
| 49 | 0,08 ms · 85 | 0,26 ms · 98 | 0,34 ms · 79 | 0,97 milioni | 723 ms |
| 50 | 0,06 ms · 61 | 0,18 ms · 75 | 0,55 ms · 64 | 0,68 milioni | 893 ms |
| 51 | 0,17 ms · 85 | 0,25 ms · 95 | 0,52 ms · 51 | 0,96 milioni | 996 ms |
| 52 | 0,03 ms · 54 | 0,18 ms · 61 | 0,94 ms · 55 | 0,49 milioni | 808 ms |
| 53 | 0,02 ms · 46 | 0,28 ms · 59 | 0,53 ms · 52 | 0,40 milioni | 843 ms |
| 54 | 0,18 ms · 90 | 0,41 ms · 108 | 0,77 ms · 82 | 1,14 milioni | 859 ms |
| 55 | 0,13 ms · 60 | 0,36 ms · 75 | 0,52 ms · 64 | 0,67 milioni | 857 ms |
| 56 | 0,04 ms · 62 | 0,44 ms · 80 | 0,74 ms · 70 | 0,58 milioni | 845 ms |
| 57 | 0,02 ms · 44 | 0,17 ms · 54 | 0,43 ms · 45 | 0,41 milioni | 1092 ms |
| 58 | 0,06 ms · 60 | 0,34 ms · 83 | 0,75 ms · 63 | 0,72 milioni | 790 ms |
| 59 | 0,05 ms · 85 | 0,27 ms · 96 | 0,79 ms · 71 | 1,09 milioni | 1026 ms |
| 60 | 0,08 ms · 88 | 0,42 ms · 98 | 0,57 ms · 69 | 1,03 milioni | 915 ms |
| 61 | 0,05 ms · 63 | 0,18 ms · 68 | 0,50 ms · 60 | 0,57 milioni | 882 ms |
| 62 | 0,02 ms · 45 | 0,20 ms · 57 | 0,57 ms · 44 | 0,41 milioni | 787 ms |
| 63 | 0,03 ms · 63 | 0,19 ms · 75 | 0,51 ms · 58 | 0,57 milioni | 616 ms |
| 64 | 0,11 ms · 83 | 0,26 ms · 96 | 0,62 ms · 79 | 1,02 milioni | 816 ms |
| 65 | 0,03 ms · 53 | 0,18 ms · 61 | 0,50 ms · 54 | 0,41 milioni | 817 ms |
| 66 | 0,22 ms · 90 | 0,44 ms · 108 | 0,45 ms · 77 | 1,10 milioni | 798 ms |
| 67 | 0,09 ms · 47 | 0,21 ms · 62 | 0,51 ms · 49 | 0,42 milioni | 910 ms |
| 68 | 0,09 ms · 55 | 0,14 ms · 71 | 0,52 ms · 58 | 0,69 milioni | 712 ms |
| 69 | 0,10 ms · 82 | 0,30 ms · 93 | 0,62 ms · 72 | 1,05 milioni | 753 ms |
| 70 | 0,11 ms · 65 | 0,32 ms · 77 | 0,61 ms · 69 | 0,80 milioni | 1081 ms |
| 71 | 0,05 ms · 67 | 0,20 ms · 79 | 0,57 ms · 70 | 0,74 milioni | 838 ms |
| 72 | 0,03 ms · 47 | 0,29 ms · 64 | 0,58 ms · 49 | 0,41 milioni | 1177 ms |
| 73 | 0,30 ms · 86 | 0,54 ms · 105 | 1,02 ms · 80 | 1,03 milioni | 1042 ms |
| 74 | 0,08 ms · 64 | 0,29 ms · 81 | 0,37 ms · 61 | 0,71 milioni | 1013 ms |
| 75 | 0,08 ms · 74 | 0,26 ms · 97 | 1,38 ms · 71 | 0,86 milioni | 1085 ms |
| 76 | 0,04 ms · 65 | 0,21 ms · 84 | 0,65 ms · 71 | 0,78 milioni | 668 ms |
| 77 | 0,05 ms · 64 | 0,24 ms · 79 | 0,54 ms · 71 | 0,64 milioni | 865 ms |
| 78 | 0,06 ms · 68 | 0,21 ms · 86 | 0,58 ms · 70 | 0,77 milioni | 691 ms |
| 79 | 0,06 ms · 63 | 0,25 ms · 79 | 0,81 ms · 63 | 0,67 milioni | 802 ms |
| 80 | 0,06 ms · 88 | 0,22 ms · 108 | 0,54 ms · 90 | 1,05 milioni | 750 ms |
| 81 | 0,02 ms · 44 | 0,18 ms · 64 | 0,56 ms · 49 | 0,40 milioni | 1058 ms |
| 82 | 0,08 ms · 74 | 0,22 ms · 89 | 0,63 ms · 65 | 0,76 milioni | 772 ms |
| 83 | 0,07 ms · 56 | 0,23 ms · 68 | 0,50 ms · 54 | 0,68 milioni | 721 ms |
| 84 | 0,17 ms · 98 | 0,46 ms · 113 | 0,49 ms · 94 | 1,19 milioni | 868 ms |
| 85 | 0,03 ms · 55 | 0,19 ms · 65 | 0,26 ms · 59 | 0,49 milioni | 806 ms |
| 86 | 0,10 ms · 59 | 0,26 ms · 80 | 0,84 ms · 66 | 0,63 milioni | 803 ms |
| 87 | 0,04 ms · 46 | 0,18 ms · 55 | 0,56 ms · 49 | 0,42 milioni | 1149 ms |
| 88 | 0,09 ms · 65 | 0,28 ms · 79 | 1,08 ms · 67 | 0,70 milioni | 749 ms |
| 89 | 0,03 ms · 54 | 0,23 ms · 60 | 0,71 ms · 58 | 0,49 milioni | 923 ms |
| 90 | 0,18 ms · 80 | 0,31 ms · 98 | 0,56 ms · 71 | 0,83 milioni | 919 ms |
| 91 | 0,08 ms · 60 | 0,31 ms · 78 | 0,56 ms · 63 | 0,66 milioni | 800 ms |
| 92 | 0,02 ms · 48 | 0,16 ms · 60 | 0,58 ms · 54 | 0,47 milioni | 662 ms |
| 93 | 0,12 ms · 60 | 0,31 ms · 77 | 0,57 ms · 62 | 0,60 milioni | 735 ms |
| 94 | 0,04 ms · 62 | 0,20 ms · 75 | 0,45 ms · 60 | 0,65 milioni | 705 ms |
| 95 | 0,15 ms · 69 | 0,36 ms · 78 | 0,53 ms · 61 | 0,81 milioni | 928 ms |
| 96 | 0,02 ms · 47 | 0,18 ms · 53 | 0,54 ms · 49 | 0,40 milioni | 1046 ms |
| 97 | 0,03 ms · 59 | 0,26 ms · 64 | 0,70 ms · 55 | 0,51 milioni | 844 ms |
| 98 | 0,04 ms · 59 | 0,26 ms · 69 | 0,65 ms · 62 | 0,57 milioni | 805 ms |
| 99 | 0,06 ms · 50 | 0,25 ms · 62 | 0,71 ms · 51 | 0,41 milioni | 1028 ms |
| 100 | 0,11 ms · 85 | 0,36 ms · 101 | 0,71 ms · 85 | 1,05 milioni | 885 ms |
| 101 | 0,03 ms · 47 | 0,27 ms · 60 | 0,48 ms · 46 | 0,42 milioni | 862 ms |
| 102 | 0,02 ms · 47 | 0,18 ms · 57 | 0,87 ms · 45 | 0,40 milioni | 1083 ms |
| 103 | 0,08 ms · 64 | 0,23 ms · 78 | 0,53 ms · 69 | 0,79 milioni | 836 ms |
| 104 | 0,12 ms · 81 | 0,40 ms · 99 | 0,62 ms · 84 | 1,04 milioni | 1164 ms |
| 105 | 0,08 ms · 89 | 0,24 ms · 113 | 0,68 ms · 81 | 1,05 milioni | 870 ms |
| 106 | 0,07 ms · 68 | 0,23 ms · 79 | 1,13 ms · 67 | 1,02 milioni | 965 ms |
| 107 | 0,17 ms · 79 | 0,45 ms · 97 | 0,75 ms · 52 | 1,11 milioni | 1585 ms |
| 108 | 0,05 ms · 82 | 0,31 ms · 104 | 0,63 ms · 81 | 0,91 milioni | 847 ms |
| 109 | 0,04 ms · 60 | 0,27 ms · 63 | 0,28 ms · 58 | 0,53 milioni | 1115 ms |
| 110 | 0,03 ms · 51 | 0,18 ms · 61 | 0,30 ms · 52 | 0,58 milioni | 1181 ms |
| 111 | 0,24 ms · 75 | 0,41 ms · 97 | 0,60 ms · 74 | 0,88 milioni | 1056 ms |
| 112 | 0,17 ms · 69 | 0,36 ms · 91 | 1,22 ms · 69 | 0,89 milioni | 1119 ms |
| 113 | 0,04 ms · 48 | 0,18 ms · 65 | 0,15 ms · 55 | 0,51 milioni | 724 ms |
| 114 | 0,02 ms · 46 | 0,19 ms · 59 | 0,48 ms · 51 | 0,49 milioni | 801 ms |
| 115 | 0,03 ms · 63 | 0,18 ms · 75 | 0,63 ms · 60 | 0,65 milioni | 1018 ms |
| 116 | 0,15 ms · 87 | 0,32 ms · 111 | 0,94 ms · 77 | 1,08 milioni | 907 ms |
| 117 | 0,16 ms · 78 | 0,35 ms · 92 | 1,01 ms · 77 | 0,82 milioni | 1289 ms |
| 118 | 0,03 ms · 57 | 0,18 ms · 71 | 0,79 ms · 64 | 0,57 milioni | 847 ms |
| 119 | 0,04 ms · 48 | 0,27 ms · 58 | 0,78 ms · 46 | 0,41 milioni | 1007 ms |
| 120 | 0,05 ms · 55 | 0,24 ms · 72 | 0,59 ms · 53 | 0,63 milioni | 688 ms |
| 121 | 0,07 ms · 79 | 0,26 ms · 99 | 0,65 ms · 83 | 1,08 milioni | 700 ms |
| 122 | 0,04 ms · 67 | 0,19 ms · 82 | 0,70 ms · 61 | 0,69 milioni | 664 ms |
| 123 | 0,03 ms · 55 | 0,17 ms · 67 | 0,53 ms · 57 | 0,48 milioni | 742 ms |
| 124 | 0,09 ms · 69 | 0,46 ms · 80 | 0,71 ms · 65 | 0,80 milioni | 908 ms |
| 125 | 0,09 ms · 80 | 0,48 ms · 100 | 0,56 ms · 71 | 0,90 milioni | 858 ms |
