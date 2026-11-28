# Varietà delle zone di atterraggio

Questo file è generato da `node scripts/varieta.mjs`; `tests/varieta.test.mjs` controlla che corrisponda al codice.

La serie «Mondi aperti» chiede zone in cui ogni 300-500 m si incontri qualcosa di nuovo e nessun pianeta somigli a un altro. Le due richieste si misurano così. La zona di 4 × 4 km di ogni pianeta è coperta da punti a 50 m l’uno dall’altro; su ogni punto di terraferma si misura la distanza dalla novità più vicina, cioè il più vicino fra la base, gli insediamenti, i luoghi della carta, i siti e i luoghi rari, oppure il più vicino punto di un altro bioma, con una distanza a scacchiera sulla griglia. Per confrontare i pianeti, ogni zona è descritta dalla famiglia del pianeta, dallo stile del terreno, dal tipo di colonia, dalla presenza di un villaggio, dai biomi, dai tipi di sito e dai tipi di luogo raro; la somiglianza di due zone è la quota di queste caratteristiche che hanno in comune (indice di Jaccard).

## Una novità ogni poche centinaia di metri

I punti di terraferma dei 125 pianeti sono 556.697. Il più vicino luogo da vedere (base, insediamento, luogo della carta, sito o luogo raro) è in mediana a 295 m, mediana delle mediane dei pianeti; il 90% dei punti di un pianeta ne ha uno entro 344-1463 m, in mediana entro 597 m. Il 49% dei punti ha un luogo da vedere entro 300 m e l’81% entro 500 m.

Contando anche il passaggio a un altro bioma, la novità più vicina è in mediana a 50 m; il 90% dei punti di un pianeta ne ha una entro 141-312 m, in mediana entro 191 m. Il 99% dei punti ha una novità entro 300 m e tutti tranne 570 entro 500 m. La zona più uniforme è quella di «Moto uniformemente accelerato» (pianeta 29), dove il 90% dei punti ha una novità entro 312 m e il punto più lontano da tutto dista 600 m.

Ogni zona ha da 5 a 8 biomi sulla terraferma (in mediana 6), da 14 a 19 siti costruiti e da 3 a 9 luoghi rari, oltre alla base, agli insediamenti e ai luoghi della carta.

## Nessuna zona uguale a un’altra

Le descrizioni delle 125 zone sono tutte diverse. La somiglianza fra due zone vale in mediana 0,40; la coppia più simile, «Disequazioni» (pianeta 5) e «Radiazione termica e luce delle stelle» (pianeta 115), condivide il 97% delle caratteristiche. Anche le zone più simili differiscono nel rilievo, nei colori, nelle specie e nella posizione di ogni sito, perché ogni pianeta ha il proprio seme.

## Pianeti

Distanze in metri: mediana e 90° percentile sui punti di terraferma del pianeta.

| Pianeta | Famiglia | Biomi | Siti (tipi) | Luoghi rari (tipi) | Insediamenti | Specie | Luogo da vedere | Novità | Novità entro 300 m |
|---|---|---:|---:|---:|---:|---:|---|---|---:|
| 1. Linguaggio e ragionamento matematico | Glaciale | 6 | 17 (12) | 8 (8) | 1 | 15 | 245 / 421 | 50 / 150 | 100% |
| 2. Algebra | Oceanico | 8 | 15 (13) | 4 (4) | 2 | 26 | 288 / 545 | 50 / 150 | 100% |
| 3. Radicali | Desertico | 8 | 15 (12) | 8 (8) | 1 | 10 | 346 / 992 | 50 / 191 | 99% |
| 4. Equazioni e sistemi | Vulcanico | 7 | 18 (12) | 6 (6) | 1 | 18 | 277 / 506 | 71 / 212 | 97% |
| 5. Disequazioni | Glaciale | 7 | 15 (12) | 8 (8) | 1 | 12 | 345 / 1191 | 50 / 221 | 94% |
| 6. Esponenziali e logaritmi | Desertico | 7 | 15 (12) | 9 (9) | 1 | 10 | 350 / 633 | 50 / 171 | 99% |
| 7. Geometria analitica | Terrestre | 5 | 14 (13) | 9 (9) | 2 | 25 | 250 / 457 | 71 / 212 | 97% |
| 8. Funzioni | Terrestre | 6 | 14 (13) | 9 (9) | 2 | 26 | 297 / 665 | 50 / 155 | 98% |
| 9. Trigonometria | Oceanico | 6 | 16 (13) | 4 (4) | 2 | 24 | 331 / 650 | 50 / 191 | 98% |
| 10. Combinatoria, probabilità e statistica | Oceanico | 7 | 18 (14) | 5 (5) | 2 | 26 | 282 / 537 | 50 / 171 | 99% |
| 11. Geometria elementare | Craterizzato | 7 | 16 (12) | 5 (5) | 1 | 0 | 368 / 732 | 50 / 191 | 99% |
| 12. Dagli zeri alla struttura di un polinomio | Terrestre | 6 | 17 (13) | 8 (8) | 2 | 27 | 276 / 609 | 53 / 200 | 98% |
| 13. Esistenza, unicità e approssimazione | Desertico | 5 | 18 (12) | 9 (9) | 1 | 8 | 288 / 622 | 50 / 200 | 98% |
| 14. Ragionamento, conteggio e infinito | Oceanico | 8 | 14 (13) | 5 (5) | 2 | 26 | 308 / 525 | 69 / 212 | 98% |
| 15. Vettori, matrici, dati e vincoli | Glaciale | 5 | 14 (12) | 7 (7) | 1 | 10 | 235 / 433 | 50 / 200 | 98% |
| 16. Complessi, aritmetica e polinomi | Craterizzato | 6 | 19 (12) | 5 (5) | 1 | 0 | 308 / 569 | 50 / 188 | 100% |
| 17. Limiti, variazione e accumulazione | Vulcanico | 7 | 18 (12) | 9 (9) | 1 | 18 | 255 / 462 | 50 / 191 | 100% |
| 18. Radici, campi e nuovi sistemi numerici | Terrestre | 8 | 14 (13) | 9 (9) | 2 | 27 | 255 / 452 | 50 / 150 | 99% |
| 19. Geometrie, trasformazioni e simmetrie | Desertico | 7 | 15 (12) | 9 (9) | 1 | 14 | 292 / 774 | 50 / 171 | 100% |
| 20. Probabilità, informazione e fenomeni collettivi | Desertico | 5 | 19 (12) | 9 (9) | 1 | 7 | 276 / 500 | 50 / 191 | 99% |
| 21. Iterazioni, stabilità e precisione numerica | Oceanico | 7 | 16 (13) | 4 (4) | 2 | 25 | 265 / 494 | 50 / 200 | 98% |
| 22. Onde, frequenze e ricostruzione | Desertico | 6 | 17 (12) | 9 (9) | 1 | 13 | 337 / 681 | 50 / 191 | 98% |
| 23. Reti, conservazione e strategie | Terrestre | 8 | 17 (13) | 9 (9) | 2 | 28 | 255 / 450 | 50 / 150 | 100% |
| 24. Scala, energia, equilibrio e trasformazioni | Glaciale | 6 | 16 (12) | 6 (6) | 1 | 13 | 244 / 466 | 50 / 191 | 98% |
| 25. Oscillazioni, molecole e quantizzazione | Oceanico | 5 | 19 (14) | 4 (4) | 2 | 24 | 316 / 575 | 71 / 212 | 97% |
| 26. Misure, unità e incertezza | Craterizzato | 6 | 19 (12) | 5 (5) | 1 | 0 | 333 / 610 | 50 / 171 | 99% |
| 27. Vettori e sistemi di riferimento | Desertico | 6 | 18 (12) | 9 (9) | 1 | 12 | 321 / 616 | 50 / 200 | 96% |
| 28. Moto rettilineo uniforme | Glaciale | 6 | 16 (12) | 8 (8) | 1 | 15 | 292 / 534 | 50 / 171 | 100% |
| 29. Moto uniformemente accelerato | Oceanico | 7 | 14 (13) | 3 (3) | 2 | 27 | 264 / 494 | 100 / 312 | 89% |
| 30. Traiettorie e lanci | Terrestre | 8 | 14 (13) | 9 (9) | 2 | 29 | 280 / 490 | 50 / 171 | 99% |
| 31. Forze e leggi di Newton | Desertico | 6 | 19 (12) | 9 (9) | 1 | 11 | 299 / 582 | 50 / 150 | 100% |
| 32. Attrito e vincoli | Vulcanico | 6 | 16 (12) | 9 (9) | 1 | 18 | 280 / 635 | 50 / 164 | 100% |
| 33. Lavoro ed energia | Glaciale | 7 | 15 (12) | 6 (6) | 1 | 13 | 364 / 1072 | 50 / 200 | 98% |
| 34. Quantità di moto e urti | Oceanico | 6 | 14 (13) | 5 (5) | 2 | 24 | 312 / 591 | 71 / 250 | 95% |
| 35. Rotazione e momento d’inerzia | Desertico | 8 | 17 (12) | 9 (9) | 1 | 15 | 318 / 636 | 50 / 164 | 100% |
| 36. Momenti, leve ed equilibrio | Vulcanico | 6 | 18 (12) | 6 (6) | 1 | 19 | 266 / 456 | 50 / 200 | 99% |
| 37. Gravitazione | Oceanico | 6 | 17 (14) | 3 (3) | 2 | 26 | 271 / 501 | 71 / 221 | 98% |
| 38. Orbite circolari | Craterizzato | 5 | 18 (12) | 5 (5) | 1 | 0 | 342 / 661 | 50 / 183 | 99% |
| 39. Fluidi e pressione | Terrestre | 6 | 16 (13) | 9 (9) | 2 | 25 | 259 / 540 | 50 / 191 | 98% |
| 40. Galleggiamento e Archimede | Vulcanico | 6 | 14 (12) | 5 (5) | 1 | 18 | 259 / 485 | 50 / 191 | 99% |
| 41. Oscillazioni armoniche | Oceanico | 8 | 14 (13) | 6 (6) | 2 | 26 | 322 / 895 | 50 / 151 | 99% |
| 42. Onde e sovrapposizione | Glaciale | 5 | 18 (12) | 8 (8) | 1 | 13 | 301 / 616 | 50 / 171 | 100% |
| 43. Gas ideali | Glaciale | 5 | 17 (12) | 4 (4) | 1 | 11 | 328 / 673 | 50 / 171 | 100% |
| 44. Calore e capacità termica | Vulcanico | 6 | 16 (12) | 9 (9) | 1 | 20 | 263 / 478 | 50 / 168 | 100% |
| 45. Termodinamica e rendimento | Desertico | 5 | 15 (12) | 9 (9) | 1 | 11 | 340 / 589 | 71 / 200 | 99% |
| 46. Cariche e campo elettrico | Oceanico | 7 | 18 (14) | 4 (4) | 2 | 27 | 237 / 456 | 60 / 191 | 99% |
| 47. Potenziale ed energia elettrica | Vulcanico | 6 | 19 (12) | 7 (7) | 1 | 17 | 223 / 395 | 50 / 150 | 100% |
| 48. Circuiti e legge di Ohm | Desertico | 7 | 18 (12) | 7 (7) | 1 | 10 | 328 / 655 | 50 / 171 | 100% |
| 49. Induzione elettromagnetica | Terrestre | 6 | 14 (13) | 9 (9) | 2 | 25 | 240 / 456 | 71 / 250 | 96% |
| 50. Fotoni ed energia quantizzata | Glaciale | 6 | 18 (12) | 6 (6) | 1 | 16 | 264 / 627 | 50 / 184 | 100% |
| 51. Materia, proprietà e densità | Oceanico | 5 | 14 (13) | 3 (3) | 2 | 25 | 266 / 507 | 100 / 250 | 97% |
| 52. Atomi, isotopi e massa media | Desertico | 7 | 15 (12) | 7 (7) | 1 | 7 | 359 / 663 | 50 / 150 | 99% |
| 53. Mole e quantità di sostanza | Craterizzato | 8 | 19 (12) | 5 (5) | 1 | 0 | 334 / 586 | 50 / 166 | 100% |
| 54. Livelli atomici e spettri | Terrestre | 5 | 16 (13) | 9 (9) | 2 | 27 | 255 / 425 | 69 / 200 | 99% |
| 55. Periodicità e carica efficace | Glaciale | 7 | 16 (12) | 7 (7) | 1 | 17 | 288 / 578 | 50 / 171 | 100% |
| 56. Legame ionico e interazioni elettrostatiche | Desertico | 7 | 19 (12) | 9 (9) | 1 | 13 | 274 / 492 | 50 / 171 | 99% |
| 57. Legame covalente ed energia di legame | Craterizzato | 5 | 18 (12) | 5 (5) | 1 | 0 | 349 / 666 | 50 / 150 | 100% |
| 58. Geometria molecolare e VSEPR | Vulcanico | 5 | 15 (12) | 9 (9) | 1 | 18 | 281 / 853 | 71 / 226 | 96% |
| 59. Forze intermolecolari | Oceanico | 5 | 19 (14) | 4 (4) | 2 | 22 | 277 / 470 | 50 / 191 | 99% |
| 60. Gas e stato aeriforme | Oceanico | 6 | 14 (13) | 5 (5) | 2 | 26 | 306 / 554 | 71 / 221 | 97% |
| 61. Stati della materia e transizioni | Glaciale | 5 | 14 (12) | 6 (6) | 1 | 9 | 243 / 467 | 50 / 191 | 100% |
| 62. Soluzioni e concentrazione | Craterizzato | 6 | 15 (12) | 5 (5) | 1 | 0 | 363 / 661 | 50 / 200 | 99% |
| 63. Solubilità ed equilibrio eterogeneo | Desertico | 5 | 14 (12) | 9 (9) | 1 | 12 | 353 / 634 | 50 / 200 | 99% |
| 64. Stechiometria e reagente limitante | Oceanico | 7 | 17 (14) | 4 (4) | 2 | 26 | 294 / 549 | 50 / 171 | 100% |
| 65. Resa e bilanci di materia | Desertico | 5 | 15 (12) | 7 (7) | 1 | 5 | 370 / 974 | 50 / 150 | 100% |
| 66. Termochimica e calorimetria | Terrestre | 7 | 16 (13) | 9 (9) | 2 | 28 | 260 / 481 | 50 / 179 | 99% |
| 67. Velocità di reazione | Craterizzato | 6 | 17 (12) | 5 (5) | 1 | 0 | 351 / 781 | 50 / 171 | 100% |
| 68. Temperatura e attivazione | Desertico | 5 | 16 (12) | 6 (6) | 1 | 12 | 291 / 535 | 50 / 171 | 100% |
| 69. Equilibrio chimico | Oceanico | 6 | 15 (13) | 4 (4) | 2 | 25 | 273 / 495 | 50 / 150 | 100% |
| 70. Perturbazioni dell’equilibrio | Vulcanico | 5 | 17 (12) | 7 (7) | 1 | 16 | 258 / 483 | 71 / 200 | 98% |
| 71. Acidi, basi e pH | Vulcanico | 5 | 17 (12) | 4 (4) | 1 | 18 | 256 / 475 | 71 / 250 | 95% |
| 72. Soluzioni tampone | Craterizzato | 5 | 17 (12) | 5 (5) | 1 | 0 | 358 / 683 | 50 / 191 | 99% |
| 73. Ossidazione, riduzione ed elettrochimica | Terrestre | 7 | 14 (13) | 9 (9) | 2 | 29 | 268 / 547 | 50 / 150 | 100% |
| 74. Chimica organica e scheletri carboniosi | Glaciale | 7 | 14 (12) | 8 (8) | 1 | 15 | 344 / 664 | 50 / 150 | 99% |
| 75. Polimeri e materiali | Oceanico | 7 | 15 (13) | 5 (5) | 2 | 25 | 217 / 344 | 50 / 191 | 99% |
| 76. Che cos'è la vita | Glaciale | 8 | 15 (12) | 7 (7) | 1 | 19 | 309 / 632 | 50 / 171 | 100% |
| 77. Cellule, scala e superficie | Desertico | 5 | 15 (12) | 8 (8) | 1 | 14 | 355 / 923 | 50 / 191 | 100% |
| 78. Membrane e protocellule | Vulcanico | 5 | 17 (12) | 6 (6) | 1 | 16 | 262 / 1463 | 50 / 157 | 100% |
| 79. Elementi e molecole della vita nello spazio | Glaciale | 7 | 19 (12) | 7 (7) | 1 | 17 | 330 / 734 | 50 / 171 | 100% |
| 80. Meteoriti, comete e campioni di asteroidi | Terrestre | 6 | 16 (13) | 7 (7) | 2 | 27 | 266 / 497 | 50 / 200 | 98% |
| 81. Chiralità e omochiralità | Craterizzato | 6 | 19 (12) | 5 (5) | 1 | 0 | 338 / 619 | 50 / 191 | 99% |
| 82. Miller-Urey e la sintesi prebiotica | Glaciale | 5 | 17 (12) | 4 (4) | 1 | 16 | 260 / 631 | 50 / 150 | 99% |
| 83. Energia, enzimi e catalisi | Desertico | 5 | 17 (12) | 9 (9) | 1 | 13 | 282 / 674 | 50 / 150 | 99% |
| 84. Sorgenti idrotermali e metabolismo primordiale | Terrestre | 8 | 19 (14) | 9 (9) | 2 | 29 | 282 / 579 | 50 / 150 | 100% |
| 85. Il mondo a RNA | Desertico | 7 | 15 (12) | 8 (8) | 1 | 9 | 345 / 652 | 50 / 177 | 99% |
| 86. DNA, codice genetico ed espressione | Glaciale | 5 | 14 (12) | 5 (5) | 1 | 15 | 321 / 669 | 71 / 213 | 97% |
| 87. Mutazioni e soglia d'errore | Craterizzato | 5 | 19 (12) | 5 (5) | 1 | 0 | 314 / 574 | 71 / 221 | 97% |
| 88. Ereditarietà e selezione naturale | Glaciale | 6 | 18 (12) | 5 (5) | 1 | 18 | 250 / 629 | 50 / 141 | 100% |
| 89. Deriva genetica | Desertico | 7 | 16 (12) | 9 (9) | 1 | 9 | 331 / 611 | 50 / 171 | 100% |
| 90. L'albero universale e LUCA | Oceanico | 5 | 15 (13) | 4 (4) | 2 | 22 | 312 / 533 | 50 / 200 | 97% |
| 91. Le prime tracce della vita e il tempo geologico | Vulcanico | 6 | 17 (12) | 9 (9) | 1 | 16 | 267 / 477 | 50 / 167 | 100% |
| 92. Ossigeno, endosimbiosi e cellule complesse | Craterizzato | 5 | 17 (12) | 4 (4) | 1 | 0 | 360 / 760 | 71 / 262 | 94% |
| 93. Estremofili | Glaciale | 6 | 15 (12) | 8 (8) | 1 | 12 | 332 / 673 | 50 / 171 | 99% |
| 94. Respirazione, fermentazione e chemiosintesi | Desertico | 5 | 15 (12) | 8 (8) | 1 | 12 | 375 / 762 | 50 / 171 | 100% |
| 95. Fotosintesi e luce di altre stelle | Vulcanico | 5 | 18 (12) | 6 (6) | 1 | 17 | 285 / 578 | 71 / 221 | 96% |
| 96. Crescita delle popolazioni microbiche | Craterizzato | 6 | 17 (12) | 5 (5) | 1 | 0 | 325 / 644 | 50 / 191 | 98% |
| 97. La zona abitabile | Desertico | 6 | 14 (12) | 8 (8) | 1 | 9 | 348 / 637 | 50 / 200 | 97% |
| 98. Atmosfere, effetto serra e clima | Glaciale | 6 | 18 (12) | 7 (7) | 1 | 11 | 317 / 591 | 50 / 150 | 99% |
| 99. Abitabilità attorno alle nane rosse | Craterizzato | 6 | 14 (12) | 5 (5) | 1 | 0 | 390 / 745 | 50 / 191 | 99% |
| 100. Biosfera, albedo e Daisyworld | Terrestre | 6 | 16 (13) | 9 (9) | 2 | 26 | 287 / 513 | 50 / 150 | 100% |
| 101. Marte: acqua e abitabilità passata | Desertico | 6 | 19 (12) | 6 (6) | 1 | 6 | 312 / 1068 | 50 / 191 | 99% |
| 102. Cercare la vita su Marte | Craterizzato | 6 | 18 (12) | 5 (5) | 1 | 0 | 347 / 699 | 50 / 200 | 98% |
| 103. Europa e gli oceani sotto il ghiaccio | Glaciale | 5 | 19 (12) | 7 (7) | 1 | 15 | 276 / 946 | 50 / 200 | 97% |
| 104. Encelado e i suoi pennacchi | Oceanico | 8 | 17 (14) | 4 (4) | 2 | 27 | 236 / 422 | 50 / 168 | 99% |
| 105. Titano, la chimica senza acqua | Terrestre | 5 | 14 (13) | 8 (8) | 2 | 27 | 295 / 556 | 50 / 200 | 98% |
| 106. Scoprire gli esopianeti | Vulcanico | 7 | 16 (12) | 9 (9) | 1 | 18 | 267 / 548 | 50 / 200 | 99% |
| 107. Atmosfere degli esopianeti e JWST | Oceanico | 7 | 19 (14) | 4 (4) | 2 | 26 | 245 / 450 | 50 / 194 | 98% |
| 108. Biofirme e falsi positivi | Terrestre | 5 | 19 (12) | 9 (9) | 1 | 24 | 270 / 480 | 50 / 200 | 99% |
| 109. Panspermia e protezione planetaria | Desertico | 6 | 16 (12) | 9 (9) | 1 | 8 | 330 / 597 | 71 / 225 | 95% |
| 110. Tecnofirme, SETI ed equazione di Drake | Craterizzato | 5 | 16 (12) | 5 (5) | 1 | 0 | 355 / 651 | 50 / 191 | 99% |
| 111. Onde elettromagnetiche e pressione della luce | Terrestre | 8 | 16 (12) | 7 (7) | 1 | 28 | 341 / 740 | 50 / 200 | 97% |
| 112. Specchi, lenti e telescopi | Oceanico | 7 | 16 (13) | 3 (3) | 2 | 23 | 254 / 437 | 80 / 245 | 96% |
| 113. Interferenza e interferometri | Desertico | 5 | 17 (12) | 6 (6) | 1 | 5 | 360 / 691 | 50 / 191 | 99% |
| 114. Diffrazione e potere risolutivo | Craterizzato | 7 | 17 (12) | 5 (5) | 1 | 0 | 356 / 728 | 50 / 199 | 98% |
| 115. Radiazione termica e luce delle stelle | Glaciale | 6 | 17 (12) | 8 (8) | 1 | 11 | 329 / 659 | 50 / 191 | 98% |
| 116. Legge di Gauss: gusci, pianeti e condensatori | Terrestre | 7 | 15 (13) | 9 (9) | 2 | 28 | 342 / 778 | 50 / 191 | 99% |
| 117. Particelle cariche nei campi magnetici | Oceanico | 6 | 16 (13) | 6 (6) | 2 | 23 | 293 / 586 | 50 / 171 | 99% |
| 118. Correnti, dipoli e dinamo dei pianeti | Desertico | 6 | 19 (12) | 9 (9) | 1 | 10 | 304 / 606 | 50 / 161 | 99% |
| 119. Induzione, circuiti oscillanti e radio | Craterizzato | 6 | 14 (12) | 4 (4) | 1 | 0 | 376 / 659 | 50 / 191 | 99% |
| 120. Equazioni di Maxwell e magnetismo della materia | Glaciale | 7 | 15 (12) | 7 (7) | 1 | 16 | 297 / 791 | 50 / 200 | 98% |
| 121. Relatività ristretta | Terrestre | 8 | 18 (14) | 9 (9) | 2 | 25 | 265 / 541 | 50 / 150 | 100% |
| 122. Onde di materia, atomi e righe spettrali | Glaciale | 7 | 18 (12) | 8 (8) | 1 | 16 | 250 / 606 | 50 / 171 | 99% |
| 123. Nuclei, decadimenti e datazioni | Desertico | 6 | 14 (12) | 8 (8) | 1 | 10 | 349 / 630 | 50 / 171 | 100% |
| 124. Energia dal nucleo: fusione nelle stelle | Vulcanico | 5 | 15 (12) | 6 (6) | 1 | 18 | 278 / 580 | 71 / 200 | 99% |
| 125. Particelle, espansione e Big Bang | Oceanico | 7 | 15 (13) | 5 (5) | 2 | 24 | 330 / 676 | 50 / 191 | 98% |

## Tipi

I siti sono di 14 tipi e i luoghi rari di 16; i biomi della zona sono fra i 46 del catalogo dei biomi (`docs/BIOMI.md`).
