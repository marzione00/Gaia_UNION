# Prestazioni misurate della serie «Mondi vivi»

Questo documento è generato da `node scripts/prestazioni-mondi.mjs`; `tests/mondi.test.mjs` ne controlla la struttura e i limiti. Le superfici di 125 pianeti sono state costruite e disegnate dal codice del sito, con la camera delle stazioni, con la camera che segue l'esploratore mentre corre vicino alla base e con quella che segue il rover a 1,3 km dalla base, alle tre impostazioni grafiche, con l'ecosistema e il giorno in movimento e con la nave dell'esploratore sulla piazzola della base, in discesa con i getti e la polvere nella vista delle stazioni, a terra con la rampa aperta nelle altre due; per ogni vista si misurano 60 fotogrammi da 1/60 di secondo dopo 20 fotogrammi di assestamento. Al posto della scheda grafica c'è il contatore di `scripts/prestazioni.mjs`, che applica le regole di `src/renderer.js`: chiamate di disegno, triangoli e istanze sono quelli che il sito invia alla scheda. I tempi sono quelli del processore che prepara il fotogramma, misurati su Intel(R) Xeon(R) Processor @ 2.10GHz, Node v22.23.4. I tempi della scheda grafica si misurano nel browser aprendo il sito con `?diagnostica` nell'indirizzo.

## Un fotogramma di superficie

| Vista | Grafica | Tempo medio | 95° percentile | Peggiore | Chiamate di disegno (media / massimo) | Triangoli (massimo) | Istanze (massimo) |
|---|---|---|---|---|---|---|---|
| camera delle stazioni | dettaglio alto | 0,08 ms | 0,16 ms | 6,8 ms | 67 / 98 | 1,14 milioni | 4287 |
| camera delle stazioni | bilanciato | 0,06 ms | 0,13 ms | 4,0 ms | 65 / 96 | 0,84 milioni | 3129 |
| camera delle stazioni | leggero | 0,06 ms | 0,12 ms | 4,4 ms | 62 / 85 | 0,65 milioni | 1968 |
| esploratore in corsa | dettaglio alto | 0,27 ms | 2,12 ms | 26,0 ms | 81 / 113 | 1,19 milioni | 4233 |
| esploratore in corsa | bilanciato | 0,24 ms | 1,91 ms | 10,9 ms | 79 / 111 | 0,91 milioni | 3077 |
| esploratore in corsa | leggero | 0,23 ms | 1,84 ms | 7,3 ms | 75 / 105 | 0,67 milioni | 1917 |
| rover a 1,3 km dalla base | dettaglio alto | 0,64 ms | 3,58 ms | 12,7 ms | 65 / 94 | 0,72 milioni | 2893 |
| rover a 1,3 km dalla base | bilanciato | 0,65 ms | 3,87 ms | 11,2 ms | 64 / 91 | 0,69 milioni | 2679 |
| rover a 1,3 km dalla base | leggero | 0,61 ms | 3,59 ms | 8,8 ms | 62 / 85 | 0,66 milioni | 2470 |

Il tempo medio è la media sui pianeti del tempo medio di ciascuno; il 95° percentile e il peggiore riguardano i singoli fotogrammi. Il pianeta più lento da preparare è «Specchi, lenti e telescopi» (pianeta 112), con 1,39 ms in media (rover a 1,3 km dalla base, dettaglio alto); il più ricco di triangoli è «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 1,19 milioni, e quello con più chiamate di disegno «Sorgenti idrotermali e metabolismo primordiale» (pianeta 84), con 113. Con il dettaglio alto la preparazione richiede in media 0,08 ms con la camera delle stazioni, 0,27 ms con l'esploratore e 0,64 ms con il rover lontano, su 16,7 ms di un fotogramma a 60 al secondo. In corsa l'esploratore sposta la camera e gli individui si ridistribuiscono fra i due livelli di dettaglio ogni 6 unità; dalla 1.70.0 il terreno segue la camera, e il rover a 10 m/s ricostruisce la griglia più fine ogni 2 unità, cioè circa tre volte al secondo, calcolando soltanto le file di punti nuove. Dalla 1.71.0 ogni punto fuori dal quadrato delle stazioni somma le forme dei biomi vicini, e le rocce dei biomi si rigenerano quando la camera entra in un nuovo gruppo di 64 unità; dalla 1.72.0 negli stessi gruppi nascono le piante e gli animali della zona, che si aggiungono alle istanze delle loro specie. Dalla 1.73.0 i siti della zona entro 1050 unità dalla camera hanno un modello semplificato, costruito uno per fotogramma a partire dal più vicino, e quello dettagliato entro 200 unità. Dalla 1.74.0 lo stesso vale per i luoghi rari, e i modelli semplificati di siti e luoghi rari di ogni quarto della zona sono uniti in una sola mesh: costano al più quattro chiamate di disegno, più una per ogni modello dettagliato entro 70 unità dalla camera.

Le impostazioni più leggere disegnano sette o quattro individui su dieci e avvicinano i modelli dettagliati alla camera, quindi riducono i triangoli e le istanze; le chiamate di disegno cambiano poco, perché ogni specie, ogni tipo di edificio e ogni figura di abitanti è una chiamata con istanze per livello. I limiti controllati dai test per un fotogramma di superficie sono 120 chiamate di disegno, 1,30 milioni di triangoli e 6000 istanze.

## Costruzione di una superficie

Alla prima visita di un pianeta il sito costruisce la superficie dalla carta d'identità (terreno, mari, luoghi, colonia e villaggio, specie) e poi le maglie dei modelli, che carica sulla scheda grafica. Le ultime 3 superfici visitate restano in memoria: tornando su una di esse il sito rifà le maglie e riusa la superficie.

| Fase | Minimo | Mediana | Massimo |
|---|---|---|---|
| Superficie dalla carta | 153 ms | 258 ms | 595 ms |
| Maglie dei modelli | 411 ms | 549 ms | 1198 ms |
| Memoria delle maglie e delle istanze | 17,4 MiB | 19,5 MiB | 22,4 MiB |

La superficie più lunga da costruire è quella di «Cercare la vita su Marte» (pianeta 102), con 1434 ms in tutto, la più pesante in memoria quella di «Membrane e protocellule» (pianeta 78), con 22,4 MiB. La memoria conta 4 byte per ogni numero dei vertici e degli indici e 32 byte per ogni istanza. I limiti dei test sono 1500 ms per la costruzione e 64 MiB per la memoria di una superficie.

## Catalogo dei modelli dei mondi

Il catalogo 3D elenca 3430 modelli dei mondi, ricavati in 7 ms dall'indice `content/worlds/modelli.json` e dalle specie delle carte, che la prima volta si calcolano per tutti i pianeti in 223 ms; un modello si costruisce quando lo si apre, prima nella versione semplificata e poi in quella dettagliata.

| Genere | Modelli | Triangoli, dettaglio (min / mediana / max) | Triangoli, versione semplificata (min / mediana / max) | Costruzione (mediana / max) |
|---|---|---|---|---|
| Specie | 1950 | 144 / 564 / 1403 | 60 / 120 / 376 | 0,15 / 2,9 ms |
| Edifici delle colonie | 1201 | 432 / 2067 / 5936 | 196 / 512 / 1356 | 5,87 / 31,8 ms |
| Edifici dei villaggi | 200 | 520 / 868 / 1268 | 114 / 268 / 508 | 0,62 / 4,0 ms |
| Popoli nativi | 40 | 1097 / 1151 / 1319 | 267 / 294 / 342 | 0,40 / 2,2 ms |
| Coloni | 36 | 1232 / 1512 / 1701 | 488 / 536 / 648 | 0,89 / 2,7 ms |
| Rover | 3 | 2292 / 2292 / 2432 | 716 / 716 / 744 | 3,42 / 3,7 ms |

## Esploratore

Un passo dell'esploratore in corsa, con il controllo del suolo, delle pendenze, dell'acqua e degli edifici, richiede 1,8 µs. Il salto si calcola con una formula esatta: 49 cm sulla Terra, da 38 a 69 cm sui 125 pianeti.

## Pianeti uno per uno

Tempo medio di preparazione e chiamate di disegno massime per fotogramma con il dettaglio alto, triangoli massimi e costruzione della superficie.

| Pianeta | Stazioni | Esploratore | Rover lontano | Triangoli (massimo) | Costruzione |
|---|---|---|---|---|---|
| 1 | 0,19 ms · 63 | 0,81 ms · 77 | 0,88 ms · 60 | 0,66 milioni | 1121 ms |
| 2 | 0,15 ms · 73 | 0,44 ms · 94 | 0,88 ms · 69 | 1,09 milioni | 1402 ms |
| 3 | 0,08 ms · 60 | 0,36 ms · 69 | 0,57 ms · 55 | 0,50 milioni | 963 ms |
| 4 | 0,15 ms · 60 | 0,62 ms · 77 | 0,57 ms · 60 | 0,70 milioni | 1080 ms |
| 5 | 0,21 ms · 58 | 0,46 ms · 73 | 0,54 ms · 57 | 0,59 milioni | 780 ms |
| 6 | 0,08 ms · 55 | 0,28 ms · 67 | 0,64 ms · 59 | 0,55 milioni | 749 ms |
| 7 | 0,09 ms · 84 | 0,22 ms · 106 | 1,14 ms · 79 | 1,03 milioni | 838 ms |
| 8 | 0,07 ms · 83 | 0,28 ms · 109 | 0,42 ms · 76 | 0,94 milioni | 724 ms |
| 9 | 0,21 ms · 86 | 0,31 ms · 98 | 0,50 ms · 79 | 1,04 milioni | 813 ms |
| 10 | 0,08 ms · 87 | 0,21 ms · 103 | 0,57 ms · 78 | 0,92 milioni | 659 ms |
| 11 | 0,03 ms · 46 | 0,24 ms · 59 | 0,46 ms · 45 | 0,41 milioni | 912 ms |
| 12 | 0,21 ms · 84 | 0,37 ms · 112 | 1,07 ms · 79 | 1,12 milioni | 932 ms |
| 13 | 0,16 ms · 56 | 0,22 ms · 67 | 0,60 ms · 52 | 0,53 milioni | 805 ms |
| 14 | 0,13 ms · 89 | 0,38 ms · 100 | 0,78 ms · 77 | 1,05 milioni | 958 ms |
| 15 | 0,06 ms · 59 | 0,20 ms · 79 | 0,66 ms · 66 | 0,57 milioni | 733 ms |
| 16 | 0,05 ms · 47 | 0,31 ms · 60 | 0,63 ms · 48 | 0,41 milioni | 918 ms |
| 17 | 0,08 ms · 64 | 0,24 ms · 76 | 0,56 ms · 67 | 0,73 milioni | 1029 ms |
| 18 | 0,07 ms · 82 | 0,31 ms · 103 | 0,61 ms · 84 | 1,00 milioni | 1014 ms |
| 19 | 0,05 ms · 60 | 0,27 ms · 79 | 0,33 ms · 64 | 0,64 milioni | 622 ms |
| 20 | 0,03 ms · 49 | 0,16 ms · 60 | 0,45 ms · 56 | 0,44 milioni | 885 ms |
| 21 | 0,08 ms · 81 | 0,29 ms · 93 | 0,74 ms · 73 | 0,93 milioni | 1090 ms |
| 22 | 0,06 ms · 63 | 0,38 ms · 75 | 0,72 ms · 63 | 0,67 milioni | 835 ms |
| 23 | 0,06 ms · 88 | 0,21 ms · 104 | 0,75 ms · 84 | 1,17 milioni | 786 ms |
| 24 | 0,13 ms · 62 | 0,41 ms · 75 | 0,62 ms · 64 | 0,68 milioni | 720 ms |
| 25 | 0,09 ms · 87 | 0,30 ms · 98 | 0,75 ms · 75 | 1,04 milioni | 665 ms |
| 26 | 0,02 ms · 55 | 0,17 ms · 59 | 0,57 ms · 51 | 0,43 milioni | 720 ms |
| 27 | 0,05 ms · 59 | 0,20 ms · 70 | 0,55 ms · 60 | 0,56 milioni | 632 ms |
| 28 | 0,08 ms · 65 | 0,26 ms · 81 | 0,80 ms · 69 | 0,66 milioni | 666 ms |
| 29 | 0,15 ms · 84 | 0,42 ms · 96 | 0,80 ms · 71 | 1,07 milioni | 938 ms |
| 30 | 0,07 ms · 86 | 0,30 ms · 104 | 0,99 ms · 79 | 0,99 milioni | 848 ms |
| 31 | 0,03 ms · 61 | 0,18 ms · 70 | 0,56 ms · 61 | 0,56 milioni | 735 ms |
| 32 | 0,09 ms · 68 | 0,30 ms · 85 | 0,88 ms · 73 | 0,73 milioni | 861 ms |
| 33 | 0,04 ms · 60 | 0,18 ms · 76 | 0,18 ms · 65 | 0,57 milioni | 914 ms |
| 34 | 0,10 ms · 78 | 0,25 ms · 97 | 0,65 ms · 80 | 0,92 milioni | 601 ms |
| 35 | 0,06 ms · 63 | 0,30 ms · 76 | 0,54 ms · 69 | 0,62 milioni | 734 ms |
| 36 | 0,06 ms · 76 | 0,22 ms · 86 | 0,72 ms · 69 | 0,73 milioni | 703 ms |
| 37 | 0,14 ms · 88 | 0,23 ms · 103 | 1,03 ms · 68 | 0,97 milioni | 724 ms |
| 38 | 0,02 ms · 48 | 0,17 ms · 62 | 0,52 ms · 52 | 0,41 milioni | 1167 ms |
| 39 | 0,08 ms · 74 | 0,24 ms · 95 | 0,52 ms · 54 | 0,91 milioni | 808 ms |
| 40 | 0,04 ms · 58 | 0,18 ms · 76 | 0,76 ms · 59 | 0,74 milioni | 724 ms |
| 41 | 0,11 ms · 79 | 0,33 ms · 92 | 1,05 ms · 75 | 0,87 milioni | 935 ms |
| 42 | 0,04 ms · 62 | 0,20 ms · 74 | 0,68 ms · 63 | 0,64 milioni | 689 ms |
| 43 | 0,08 ms · 60 | 0,29 ms · 80 | 0,51 ms · 66 | 0,67 milioni | 658 ms |
| 44 | 0,06 ms · 71 | 0,20 ms · 83 | 0,67 ms · 74 | 0,83 milioni | 706 ms |
| 45 | 0,04 ms · 58 | 0,17 ms · 77 | 0,51 ms · 61 | 0,59 milioni | 622 ms |
| 46 | 0,08 ms · 86 | 0,26 ms · 99 | 0,30 ms · 79 | 1,00 milioni | 878 ms |
| 47 | 0,17 ms · 67 | 0,25 ms · 85 | 0,75 ms · 65 | 0,78 milioni | 764 ms |
| 48 | 0,02 ms · 59 | 0,16 ms · 67 | 0,18 ms · 62 | 0,55 milioni | 850 ms |
| 49 | 0,08 ms · 85 | 0,25 ms · 98 | 0,30 ms · 79 | 0,97 milioni | 859 ms |
| 50 | 0,04 ms · 61 | 0,20 ms · 75 | 0,52 ms · 64 | 0,68 milioni | 641 ms |
| 51 | 0,21 ms · 85 | 0,32 ms · 95 | 0,52 ms · 51 | 0,96 milioni | 1140 ms |
| 52 | 0,03 ms · 54 | 0,19 ms · 61 | 0,60 ms · 55 | 0,49 milioni | 1000 ms |
| 53 | 0,02 ms · 46 | 0,32 ms · 59 | 0,67 ms · 52 | 0,40 milioni | 1044 ms |
| 54 | 0,26 ms · 90 | 0,31 ms · 108 | 1,04 ms · 82 | 1,14 milioni | 824 ms |
| 55 | 0,06 ms · 60 | 0,21 ms · 75 | 0,46 ms · 64 | 0,67 milioni | 750 ms |
| 56 | 0,05 ms · 62 | 0,25 ms · 80 | 0,51 ms · 70 | 0,58 milioni | 910 ms |
| 57 | 0,02 ms · 44 | 0,25 ms · 54 | 0,60 ms · 45 | 0,41 milioni | 1187 ms |
| 58 | 0,04 ms · 60 | 0,21 ms · 83 | 0,71 ms · 63 | 0,72 milioni | 855 ms |
| 59 | 0,11 ms · 85 | 0,37 ms · 96 | 0,70 ms · 71 | 1,09 milioni | 1170 ms |
| 60 | 0,08 ms · 88 | 0,44 ms · 98 | 0,54 ms · 69 | 1,03 milioni | 836 ms |
| 61 | 0,06 ms · 63 | 0,26 ms · 68 | 0,76 ms · 60 | 0,57 milioni | 1097 ms |
| 62 | 0,05 ms · 45 | 0,25 ms · 57 | 0,84 ms · 44 | 0,41 milioni | 1096 ms |
| 63 | 0,05 ms · 63 | 0,18 ms · 75 | 0,51 ms · 58 | 0,57 milioni | 683 ms |
| 64 | 0,09 ms · 83 | 0,30 ms · 96 | 0,90 ms · 79 | 1,02 milioni | 849 ms |
| 65 | 0,03 ms · 53 | 0,25 ms · 61 | 0,57 ms · 54 | 0,41 milioni | 722 ms |
| 66 | 0,11 ms · 90 | 0,27 ms · 108 | 0,56 ms · 77 | 1,10 milioni | 1102 ms |
| 67 | 0,02 ms · 47 | 0,18 ms · 62 | 0,54 ms · 49 | 0,42 milioni | 1058 ms |
| 68 | 0,07 ms · 55 | 0,13 ms · 71 | 0,52 ms · 58 | 0,69 milioni | 769 ms |
| 69 | 0,13 ms · 82 | 0,35 ms · 93 | 1,03 ms · 72 | 1,05 milioni | 1045 ms |
| 70 | 0,06 ms · 65 | 0,20 ms · 77 | 0,32 ms · 69 | 0,80 milioni | 633 ms |
| 71 | 0,10 ms · 67 | 0,27 ms · 79 | 0,69 ms · 70 | 0,74 milioni | 875 ms |
| 72 | 0,04 ms · 47 | 0,22 ms · 64 | 0,73 ms · 49 | 0,41 milioni | 1126 ms |
| 73 | 0,09 ms · 86 | 0,24 ms · 105 | 0,75 ms · 80 | 1,03 milioni | 1086 ms |
| 74 | 0,06 ms · 64 | 0,27 ms · 81 | 0,34 ms · 61 | 0,71 milioni | 950 ms |
| 75 | 0,14 ms · 74 | 0,30 ms · 97 | 0,97 ms · 71 | 0,86 milioni | 1052 ms |
| 76 | 0,04 ms · 65 | 0,23 ms · 84 | 0,54 ms · 71 | 0,78 milioni | 752 ms |
| 77 | 0,05 ms · 64 | 0,19 ms · 79 | 0,43 ms · 71 | 0,64 milioni | 708 ms |
| 78 | 0,06 ms · 68 | 0,20 ms · 86 | 0,84 ms · 70 | 0,77 milioni | 749 ms |
| 79 | 0,10 ms · 63 | 0,30 ms · 79 | 0,88 ms · 63 | 0,67 milioni | 701 ms |
| 80 | 0,13 ms · 88 | 0,34 ms · 108 | 0,46 ms · 90 | 1,05 milioni | 1080 ms |
| 81 | 0,02 ms · 44 | 0,18 ms · 64 | 0,62 ms · 49 | 0,40 milioni | 1048 ms |
| 82 | 0,09 ms · 74 | 0,33 ms · 89 | 0,62 ms · 65 | 0,76 milioni | 801 ms |
| 83 | 0,06 ms · 56 | 0,20 ms · 68 | 0,54 ms · 54 | 0,68 milioni | 804 ms |
| 84 | 0,15 ms · 98 | 0,40 ms · 113 | 0,69 ms · 94 | 1,19 milioni | 856 ms |
| 85 | 0,04 ms · 55 | 0,21 ms · 65 | 0,26 ms · 59 | 0,49 milioni | 1147 ms |
| 86 | 0,08 ms · 59 | 0,21 ms · 80 | 0,68 ms · 66 | 0,63 milioni | 735 ms |
| 87 | 0,02 ms · 46 | 0,19 ms · 55 | 0,52 ms · 49 | 0,42 milioni | 1069 ms |
| 88 | 0,08 ms · 65 | 0,23 ms · 79 | 0,57 ms · 67 | 0,70 milioni | 779 ms |
| 89 | 0,03 ms · 54 | 0,22 ms · 60 | 0,44 ms · 58 | 0,49 milioni | 820 ms |
| 90 | 0,11 ms · 80 | 0,30 ms · 98 | 0,89 ms · 71 | 0,83 milioni | 1277 ms |
| 91 | 0,09 ms · 60 | 0,30 ms · 78 | 0,63 ms · 63 | 0,66 milioni | 871 ms |
| 92 | 0,04 ms · 48 | 0,21 ms · 60 | 0,51 ms · 54 | 0,47 milioni | 708 ms |
| 93 | 0,04 ms · 60 | 0,19 ms · 77 | 0,82 ms · 62 | 0,60 milioni | 865 ms |
| 94 | 0,04 ms · 62 | 0,45 ms · 75 | 0,48 ms · 60 | 0,65 milioni | 680 ms |
| 95 | 0,13 ms · 69 | 0,33 ms · 78 | 0,50 ms · 61 | 0,81 milioni | 989 ms |
| 96 | 0,04 ms · 47 | 0,16 ms · 53 | 0,44 ms · 49 | 0,40 milioni | 886 ms |
| 97 | 0,03 ms · 59 | 0,19 ms · 64 | 0,66 ms · 55 | 0,51 milioni | 1080 ms |
| 98 | 0,04 ms · 59 | 0,21 ms · 69 | 0,50 ms · 62 | 0,57 milioni | 701 ms |
| 99 | 0,02 ms · 50 | 0,20 ms · 62 | 0,49 ms · 51 | 0,41 milioni | 691 ms |
| 100 | 0,08 ms · 85 | 0,21 ms · 101 | 0,83 ms · 85 | 1,05 milioni | 703 ms |
| 101 | 0,02 ms · 47 | 0,27 ms · 60 | 0,72 ms · 46 | 0,42 milioni | 803 ms |
| 102 | 0,03 ms · 47 | 0,29 ms · 57 | 0,77 ms · 45 | 0,40 milioni | 1434 ms |
| 103 | 0,05 ms · 64 | 0,21 ms · 78 | 0,51 ms · 69 | 0,79 milioni | 632 ms |
| 104 | 0,06 ms · 81 | 0,23 ms · 99 | 0,28 ms · 84 | 1,04 milioni | 674 ms |
| 105 | 0,09 ms · 89 | 0,25 ms · 113 | 1,16 ms · 81 | 1,05 milioni | 796 ms |
| 106 | 0,07 ms · 68 | 0,20 ms · 79 | 0,75 ms · 67 | 1,02 milioni | 672 ms |
| 107 | 0,16 ms · 79 | 0,27 ms · 97 | 0,85 ms · 52 | 1,11 milioni | 1248 ms |
| 108 | 0,10 ms · 82 | 0,42 ms · 104 | 0,52 ms · 81 | 0,91 milioni | 943 ms |
| 109 | 0,02 ms · 60 | 0,38 ms · 63 | 0,18 ms · 58 | 0,53 milioni | 807 ms |
| 110 | 0,04 ms · 51 | 0,18 ms · 61 | 0,29 ms · 52 | 0,58 milioni | 972 ms |
| 111 | 0,17 ms · 75 | 0,20 ms · 97 | 0,60 ms · 74 | 0,88 milioni | 840 ms |
| 112 | 0,12 ms · 69 | 0,31 ms · 91 | 1,39 ms · 69 | 0,89 milioni | 1424 ms |
| 113 | 0,03 ms · 48 | 0,19 ms · 65 | 0,16 ms · 55 | 0,51 milioni | 663 ms |
| 114 | 0,03 ms · 46 | 0,18 ms · 59 | 0,71 ms · 51 | 0,49 milioni | 1108 ms |
| 115 | 0,03 ms · 63 | 0,17 ms · 75 | 0,51 ms · 60 | 0,65 milioni | 711 ms |
| 116 | 0,19 ms · 87 | 0,31 ms · 111 | 0,86 ms · 77 | 1,08 milioni | 820 ms |
| 117 | 0,12 ms · 78 | 0,25 ms · 92 | 0,92 ms · 77 | 0,82 milioni | 1076 ms |
| 118 | 0,03 ms · 57 | 0,17 ms · 71 | 0,55 ms · 64 | 0,57 milioni | 673 ms |
| 119 | 0,02 ms · 48 | 0,89 ms · 58 | 0,60 ms · 46 | 0,41 milioni | 880 ms |
| 120 | 0,05 ms · 55 | 0,25 ms · 72 | 0,78 ms · 53 | 0,63 milioni | 798 ms |
| 121 | 0,09 ms · 79 | 0,23 ms · 99 | 0,66 ms · 83 | 1,08 milioni | 721 ms |
| 122 | 0,06 ms · 67 | 0,30 ms · 82 | 0,54 ms · 61 | 0,69 milioni | 875 ms |
| 123 | 0,08 ms · 55 | 0,27 ms · 67 | 0,83 ms · 57 | 0,48 milioni | 835 ms |
| 124 | 0,07 ms · 69 | 0,20 ms · 80 | 0,85 ms · 65 | 0,80 milioni | 715 ms |
| 125 | 0,05 ms · 80 | 0,33 ms · 100 | 0,51 ms · 71 | 0,90 milioni | 1160 ms |
