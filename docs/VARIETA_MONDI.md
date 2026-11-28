# Varietà delle zone di atterraggio

Questo file è generato da `node scripts/varieta.mjs`; `tests/collaudo-mondi.test.mjs` controlla che corrisponda al codice.

La serie «Mondi aperti» chiede zone in cui ogni 300-500 m si incontri qualcosa di nuovo e nessun pianeta somigli a un altro. Le due richieste si misurano così. La zona di 4 × 4 km di ogni pianeta è coperta da punti a 50 m l’uno dall’altro; su ogni punto di terraferma si misura la distanza dalla novità più vicina, cioè il più vicino fra la base, gli insediamenti, i luoghi della carta, i siti, i luoghi rari e i luoghi minori, oppure il più vicino punto di un altro bioma, con una distanza a scacchiera sulla griglia. Per confrontare i pianeti, ogni zona è descritta dalla famiglia del pianeta, dallo stile del terreno, dal tipo di colonia, dalla presenza di un villaggio, dai biomi, dai tipi di sito e dai tipi di luogo raro; la somiglianza di due zone è la quota di queste caratteristiche che hanno in comune (indice di Jaccard). I luoghi minori restano fuori dal confronto, perché i loro sette tipi si ripetono su quasi ogni pianeta.

## Una novità ogni poche centinaia di metri

I punti di terraferma dei 125 pianeti sono 556.697. Il più vicino luogo da vedere (base, insediamento, luogo della carta, sito, luogo raro o luogo minore) è in mediana a 194 m, mediana delle mediane dei pianeti; il 90% dei punti di un pianeta ne ha uno entro 274-1364 m, in mediana entro 296 m. Il 90% dei punti ha un luogo da vedere entro 300 m e il 99,6% entro 500 m.

Contando anche il passaggio a un altro bioma, la novità più vicina è in mediana a 50 m; il 90% dei punti di un pianeta ne ha una entro 141-241 m, in mediana entro 159 m. Il 99,6% dei punti ha una novità entro 300 m e tutti tranne 60 entro 500 m. La zona più uniforme è quella di «Moto uniformemente accelerato» (pianeta 29), dove il 90% dei punti ha una novità entro 241 m e il punto più lontano da tutto dista 395 m.

Ogni zona ha da 5 a 8 biomi sulla terraferma (in mediana 6), da 14 a 19 siti costruiti, da 3 a 9 luoghi rari e da 6 a 40 luoghi minori (in mediana 31), oltre alla base, agli insediamenti e ai luoghi della carta.

## Nessuna zona uguale a un’altra

Le descrizioni delle 125 zone sono tutte diverse. La somiglianza fra due zone vale in mediana 0,40; la coppia più simile, «Disequazioni» (pianeta 5) e «Radiazione termica e luce delle stelle» (pianeta 115), condivide il 97% delle caratteristiche. Anche le zone più simili differiscono nel rilievo, nei colori, nelle specie e nella posizione di ogni sito, perché ogni pianeta ha il proprio seme.

## Pianeti

Distanze in metri: mediana e 90° percentile sui punti di terraferma del pianeta.

| Pianeta | Famiglia | Biomi | Siti (tipi) | Luoghi rari (tipi) | Luoghi minori | Insediamenti | Specie | Luogo da vedere | Novità | Novità entro 300 m |
|---|---|---:|---:|---:|---:|---:|---:|---|---|---:|
| 1. Linguaggio e ragionamento matematico | Glaciale | 6 | 17 (12) | 8 (8) | 17 | 1 | 15 | 188 / 295 | 50 / 141 | 100% |
| 2. Algebra | Oceanico | 8 | 15 (13) | 4 (4) | 24 | 2 | 26 | 191 / 294 | 50 / 150 | 100% |
| 3. Radicali | Desertico | 8 | 15 (12) | 8 (8) | 40 | 1 | 10 | 204 / 312 | 50 / 171 | 99,6% |
| 4. Equazioni e sistemi | Vulcanico | 7 | 18 (12) | 6 (6) | 23 | 1 | 18 | 188 / 299 | 50 / 175 | 99,9% |
| 5. Disequazioni | Glaciale | 7 | 15 (12) | 8 (8) | 27 | 1 | 12 | 206 / 373 | 50 / 191 | 97% |
| 6. Esponenziali e logaritmi | Desertico | 7 | 15 (12) | 9 (9) | 40 | 1 | 10 | 206 / 308 | 50 / 150 | 99% |
| 7. Geometria analitica | Terrestre | 5 | 14 (13) | 9 (9) | 18 | 2 | 25 | 190 / 291 | 71 / 191 | 99,8% |
| 8. Funzioni | Terrestre | 6 | 14 (13) | 9 (9) | 27 | 2 | 26 | 202 / 306 | 50 / 150 | 99% |
| 9. Trigonometria | Oceanico | 6 | 16 (13) | 4 (4) | 37 | 2 | 24 | 197 / 299 | 50 / 170 | 99,7% |
| 10. Combinatoria, probabilità e statistica | Oceanico | 7 | 18 (14) | 5 (5) | 28 | 2 | 26 | 196 / 290 | 50 / 150 | 99,5% |
| 11. Geometria elementare | Craterizzato | 7 | 16 (12) | 5 (5) | 40 | 1 | 0 | 211 / 317 | 50 / 164 | 99,8% |
| 12. Dagli zeri alla struttura di un polinomio | Terrestre | 6 | 17 (13) | 8 (8) | 28 | 2 | 27 | 187 / 292 | 50 / 191 | 99,6% |
| 13. Esistenza, unicità e approssimazione | Desertico | 5 | 18 (12) | 9 (9) | 37 | 1 | 8 | 201 / 296 | 50 / 191 | 99% |
| 14. Ragionamento, conteggio e infinito | Oceanico | 8 | 14 (13) | 5 (5) | 28 | 2 | 26 | 188 / 292 | 50 / 182 | 99,8% |
| 15. Vettori, matrici, dati e vincoli | Glaciale | 5 | 14 (12) | 7 (7) | 15 | 1 | 10 | 183 / 282 | 50 / 185 | 99,9% |
| 16. Complessi, aritmetica e polinomi | Craterizzato | 6 | 19 (12) | 5 (5) | 39 | 1 | 0 | 188 / 286 | 50 / 157 | 99,9% |
| 17. Limiti, variazione e accumulazione | Vulcanico | 7 | 18 (12) | 9 (9) | 24 | 1 | 18 | 186 / 285 | 50 / 159 | 99,9% |
| 18. Radici, campi e nuovi sistemi numerici | Terrestre | 8 | 14 (13) | 9 (9) | 21 | 2 | 27 | 189 / 291 | 50 / 141 | 99,6% |
| 19. Geometrie, trasformazioni e simmetrie | Desertico | 7 | 15 (12) | 9 (9) | 40 | 1 | 14 | 203 / 292 | 50 / 150 | 100% |
| 20. Probabilità, informazione e fenomeni collettivi | Desertico | 5 | 19 (12) | 9 (9) | 35 | 1 | 7 | 189 / 291 | 50 / 171 | 99,7% |
| 21. Iterazioni, stabilità e precisione numerica | Oceanico | 7 | 16 (13) | 4 (4) | 19 | 2 | 25 | 193 / 296 | 50 / 180 | 99,7% |
| 22. Onde, frequenze e ricostruzione | Desertico | 6 | 17 (12) | 9 (9) | 40 | 1 | 13 | 205 / 308 | 50 / 161 | 99,5% |
| 23. Reti, conservazione e strategie | Terrestre | 8 | 17 (13) | 9 (9) | 25 | 2 | 28 | 186 / 289 | 50 / 141 | 100% |
| 24. Scala, energia, equilibrio e trasformazioni | Glaciale | 6 | 16 (12) | 6 (6) | 20 | 1 | 13 | 179 / 274 | 50 / 150 | 99,8% |
| 25. Oscillazioni, molecole e quantizzazione | Oceanico | 5 | 19 (14) | 4 (4) | 39 | 2 | 24 | 197 / 294 | 60 / 191 | 99,6% |
| 26. Misure, unità e incertezza | Craterizzato | 6 | 19 (12) | 5 (5) | 40 | 1 | 0 | 204 / 308 | 50 / 150 | 99,7% |
| 27. Vettori e sistemi di riferimento | Desertico | 6 | 18 (12) | 9 (9) | 40 | 1 | 12 | 202 / 303 | 50 / 164 | 99% |
| 28. Moto rettilineo uniforme | Glaciale | 6 | 16 (12) | 8 (8) | 30 | 1 | 15 | 197 / 298 | 50 / 150 | 100% |
| 29. Moto uniformemente accelerato | Oceanico | 7 | 14 (13) | 3 (3) | 12 | 2 | 27 | 196 / 295 | 75 / 241 | 97% |
| 30. Traiettorie e lanci | Terrestre | 8 | 14 (13) | 9 (9) | 27 | 2 | 29 | 182 / 280 | 50 / 150 | 99,7% |
| 31. Forze e leggi di Newton | Desertico | 6 | 19 (12) | 9 (9) | 40 | 1 | 11 | 202 / 294 | 50 / 150 | 99,9% |
| 32. Attrito e vincoli | Vulcanico | 6 | 16 (12) | 9 (9) | 30 | 1 | 18 | 186 / 293 | 50 / 150 | 100% |
| 33. Lavoro ed energia | Glaciale | 7 | 15 (12) | 6 (6) | 16 | 1 | 13 | 245 / 563 | 50 / 191 | 98% |
| 34. Quantità di moto e urti | Oceanico | 6 | 14 (13) | 5 (5) | 30 | 2 | 24 | 199 / 296 | 68 / 200 | 98% |
| 35. Rotazione e momento d’inerzia | Desertico | 8 | 17 (12) | 9 (9) | 40 | 1 | 15 | 204 / 304 | 50 / 150 | 99,9% |
| 36. Momenti, leve ed equilibrio | Vulcanico | 6 | 18 (12) | 6 (6) | 24 | 1 | 19 | 192 / 292 | 50 / 191 | 99,5% |
| 37. Gravitazione | Oceanico | 6 | 17 (14) | 3 (3) | 23 | 2 | 26 | 190 / 289 | 63 / 197 | 99% |
| 38. Orbite circolari | Craterizzato | 5 | 18 (12) | 5 (5) | 40 | 1 | 0 | 206 / 307 | 50 / 150 | 99,9% |
| 39. Fluidi e pressione | Terrestre | 6 | 16 (13) | 9 (9) | 26 | 2 | 25 | 184 / 283 | 50 / 158 | 99,9% |
| 40. Galleggiamento e Archimede | Vulcanico | 6 | 14 (12) | 5 (5) | 15 | 1 | 18 | 200 / 298 | 50 / 171 | 99% |
| 41. Oscillazioni armoniche | Oceanico | 8 | 14 (13) | 6 (6) | 31 | 2 | 26 | 185 / 296 | 50 / 150 | 99,6% |
| 42. Onde e sovrapposizione | Glaciale | 5 | 18 (12) | 8 (8) | 36 | 1 | 13 | 185 / 285 | 50 / 152 | 100% |
| 43. Gas ideali | Glaciale | 5 | 17 (12) | 4 (4) | 35 | 1 | 11 | 192 / 286 | 50 / 150 | 99,9% |
| 44. Calore e capacità termica | Vulcanico | 6 | 16 (12) | 9 (9) | 24 | 1 | 20 | 187 / 289 | 50 / 150 | 100% |
| 45. Termodinamica e rendimento | Desertico | 5 | 15 (12) | 9 (9) | 40 | 1 | 11 | 206 / 312 | 50 / 180 | 99,8% |
| 46. Cariche e campo elettrico | Oceanico | 7 | 18 (14) | 4 (4) | 17 | 2 | 27 | 183 / 291 | 51 / 170 | 100% |
| 47. Potenziale ed energia elettrica | Vulcanico | 6 | 19 (12) | 7 (7) | 11 | 1 | 17 | 188 / 291 | 50 / 150 | 100% |
| 48. Circuiti e legge di Ohm | Desertico | 7 | 18 (12) | 7 (7) | 40 | 1 | 10 | 205 / 308 | 50 / 150 | 99,9% |
| 49. Induzione elettromagnetica | Terrestre | 6 | 14 (13) | 9 (9) | 18 | 2 | 25 | 183 / 282 | 71 / 203 | 99% |
| 50. Fotoni ed energia quantizzata | Glaciale | 6 | 18 (12) | 6 (6) | 23 | 1 | 16 | 185 / 296 | 50 / 155 | 100% |
| 51. Materia, proprietà e densità | Oceanico | 5 | 14 (13) | 3 (3) | 14 | 2 | 25 | 191 / 297 | 90 / 208 | 99,6% |
| 52. Atomi, isotopi e massa media | Desertico | 7 | 15 (12) | 7 (7) | 40 | 1 | 7 | 204 / 305 | 50 / 141 | 100% |
| 53. Mole e quantità di sostanza | Craterizzato | 8 | 19 (12) | 5 (5) | 40 | 1 | 0 | 206 / 312 | 50 / 150 | 99,9% |
| 54. Livelli atomici e spettri | Terrestre | 5 | 16 (13) | 9 (9) | 23 | 2 | 27 | 186 / 286 | 50 / 180 | 99,9% |
| 55. Periodicità e carica efficace | Glaciale | 7 | 16 (12) | 7 (7) | 26 | 1 | 17 | 190 / 283 | 50 / 150 | 99,9% |
| 56. Legame ionico e interazioni elettrostatiche | Desertico | 7 | 19 (12) | 9 (9) | 30 | 1 | 13 | 191 / 290 | 50 / 150 | 100% |
| 57. Legame covalente ed energia di legame | Craterizzato | 5 | 18 (12) | 5 (5) | 40 | 1 | 0 | 210 / 311 | 50 / 147 | 100% |
| 58. Geometria molecolare e VSEPR | Vulcanico | 5 | 15 (12) | 9 (9) | 24 | 1 | 18 | 191 / 302 | 71 / 191 | 99,6% |
| 59. Forze intermolecolari | Oceanico | 5 | 19 (14) | 4 (4) | 23 | 2 | 22 | 193 / 293 | 50 / 171 | 99,7% |
| 60. Gas e stato aeriforme | Oceanico | 6 | 14 (13) | 5 (5) | 29 | 2 | 26 | 185 / 283 | 60 / 191 | 99,8% |
| 61. Stati della materia e transizioni | Glaciale | 5 | 14 (12) | 6 (6) | 14 | 1 | 9 | 190 / 287 | 50 / 183 | 99,7% |
| 62. Soluzioni e concentrazione | Craterizzato | 6 | 15 (12) | 5 (5) | 40 | 1 | 0 | 212 / 316 | 50 / 176 | 99% |
| 63. Solubilità ed equilibrio eterogeneo | Desertico | 5 | 14 (12) | 9 (9) | 40 | 1 | 12 | 206 / 310 | 50 / 178 | 99,5% |
| 64. Stechiometria e reagente limitante | Oceanico | 7 | 17 (14) | 4 (4) | 27 | 2 | 26 | 203 / 303 | 50 / 150 | 99,9% |
| 65. Resa e bilanci di materia | Desertico | 5 | 15 (12) | 7 (7) | 40 | 1 | 5 | 206 / 316 | 50 / 150 | 99,8% |
| 66. Termochimica e calorimetria | Terrestre | 7 | 16 (13) | 9 (9) | 24 | 2 | 28 | 190 / 290 | 50 / 157 | 99,9% |
| 67. Velocità di reazione | Craterizzato | 6 | 17 (12) | 5 (5) | 40 | 1 | 0 | 208 / 314 | 50 / 150 | 100% |
| 68. Temperatura e attivazione | Desertico | 5 | 16 (12) | 6 (6) | 32 | 1 | 12 | 187 / 286 | 50 / 150 | 100% |
| 69. Equilibrio chimico | Oceanico | 6 | 15 (13) | 4 (4) | 20 | 2 | 25 | 189 / 292 | 50 / 150 | 99,8% |
| 70. Perturbazioni dell’equilibrio | Vulcanico | 5 | 17 (12) | 7 (7) | 18 | 1 | 16 | 190 / 291 | 55 / 181 | 99,5% |
| 71. Acidi, basi e pH | Vulcanico | 5 | 17 (12) | 4 (4) | 18 | 1 | 18 | 191 / 291 | 71 / 197 | 99% |
| 72. Soluzioni tampone | Craterizzato | 5 | 17 (12) | 5 (5) | 40 | 1 | 0 | 206 / 306 | 50 / 171 | 99,8% |
| 73. Ossidazione, riduzione ed elettrochimica | Terrestre | 7 | 14 (13) | 9 (9) | 26 | 2 | 29 | 183 / 283 | 50 / 144 | 99,9% |
| 74. Chimica organica e scheletri carboniosi | Glaciale | 7 | 14 (12) | 8 (8) | 40 | 1 | 15 | 188 / 289 | 50 / 141 | 99,8% |
| 75. Polimeri e materiali | Oceanico | 7 | 15 (13) | 5 (5) | 6 | 2 | 25 | 190 / 300 | 50 / 171 | 99,9% |
| 76. Che cos'è la vita | Glaciale | 8 | 15 (12) | 7 (7) | 36 | 1 | 19 | 192 / 288 | 50 / 150 | 99,8% |
| 77. Cellule, scala e superficie | Desertico | 5 | 15 (12) | 8 (8) | 40 | 1 | 14 | 207 / 317 | 50 / 171 | 99,6% |
| 78. Membrane e protocellule | Vulcanico | 5 | 17 (12) | 6 (6) | 14 | 1 | 16 | 203 / 1364 | 50 / 150 | 99,9% |
| 79. Elementi e molecole della vita nello spazio | Glaciale | 7 | 19 (12) | 7 (7) | 36 | 1 | 17 | 200 / 321 | 50 / 150 | 99,7% |
| 80. Meteoriti, comete e campioni di asteroidi | Terrestre | 6 | 16 (13) | 7 (7) | 21 | 2 | 27 | 188 / 291 | 50 / 180 | 99% |
| 81. Chiralità e omochiralità | Craterizzato | 6 | 19 (12) | 5 (5) | 40 | 1 | 0 | 206 / 304 | 50 / 158 | 99,6% |
| 82. Miller-Urey e la sintesi prebiotica | Glaciale | 5 | 17 (12) | 4 (4) | 16 | 1 | 16 | 191 / 298 | 50 / 150 | 99% |
| 83. Energia, enzimi e catalisi | Desertico | 5 | 17 (12) | 9 (9) | 32 | 1 | 13 | 195 / 287 | 50 / 150 | 99,9% |
| 84. Sorgenti idrotermali e metabolismo primordiale | Terrestre | 8 | 19 (14) | 9 (9) | 28 | 2 | 29 | 197 / 299 | 50 / 150 | 99,9% |
| 85. Il mondo a RNA | Desertico | 7 | 15 (12) | 8 (8) | 40 | 1 | 9 | 205 / 298 | 50 / 150 | 99,9% |
| 86. DNA, codice genetico ed espressione | Glaciale | 5 | 14 (12) | 5 (5) | 31 | 1 | 15 | 194 / 292 | 50 / 180 | 99,7% |
| 87. Mutazioni e soglia d'errore | Craterizzato | 5 | 19 (12) | 5 (5) | 40 | 1 | 0 | 200 / 297 | 52 / 197 | 99% |
| 88. Ereditarietà e selezione naturale | Glaciale | 6 | 18 (12) | 5 (5) | 20 | 1 | 18 | 185 / 285 | 50 / 141 | 100% |
| 89. Deriva genetica | Desertico | 7 | 16 (12) | 9 (9) | 35 | 1 | 9 | 202 / 305 | 50 / 150 | 99,8% |
| 90. L'albero universale e LUCA | Oceanico | 5 | 15 (13) | 4 (4) | 33 | 2 | 22 | 193 / 291 | 50 / 171 | 99,6% |
| 91. Le prime tracce della vita e il tempo geologico | Vulcanico | 6 | 17 (12) | 9 (9) | 25 | 1 | 16 | 189 / 287 | 50 / 150 | 100% |
| 92. Ossigeno, endosimbiosi e cellule complesse | Craterizzato | 5 | 17 (12) | 4 (4) | 40 | 1 | 0 | 209 / 316 | 71 / 201 | 99% |
| 93. Estremofili | Glaciale | 6 | 15 (12) | 8 (8) | 40 | 1 | 12 | 198 / 293 | 50 / 150 | 99,9% |
| 94. Respirazione, fermentazione e chemiosintesi | Desertico | 5 | 15 (12) | 8 (8) | 40 | 1 | 12 | 206 / 318 | 50 / 150 | 99,8% |
| 95. Fotosintesi e luce di altre stelle | Vulcanico | 5 | 18 (12) | 6 (6) | 28 | 1 | 17 | 196 / 305 | 71 / 191 | 99% |
| 96. Crescita delle popolazioni microbiche | Craterizzato | 6 | 17 (12) | 5 (5) | 40 | 1 | 0 | 196 / 292 | 50 / 171 | 99% |
| 97. La zona abitabile | Desertico | 6 | 14 (12) | 8 (8) | 40 | 1 | 9 | 209 / 318 | 50 / 171 | 99,5% |
| 98. Atmosfere, effetto serra e clima | Glaciale | 6 | 18 (12) | 7 (7) | 36 | 1 | 11 | 189 / 292 | 50 / 150 | 99% |
| 99. Abitabilità attorno alle nane rosse | Craterizzato | 6 | 14 (12) | 5 (5) | 40 | 1 | 0 | 211 / 317 | 50 / 155 | 100% |
| 100. Biosfera, albedo e Daisyworld | Terrestre | 6 | 16 (13) | 9 (9) | 32 | 2 | 26 | 194 / 294 | 50 / 150 | 100% |
| 101. Marte: acqua e abitabilità passata | Desertico | 6 | 19 (12) | 6 (6) | 40 | 1 | 6 | 200 / 303 | 50 / 169 | 99,7% |
| 102. Cercare la vita su Marte | Craterizzato | 6 | 18 (12) | 5 (5) | 40 | 1 | 0 | 206 / 304 | 50 / 171 | 99,7% |
| 103. Europa e gli oceani sotto il ghiaccio | Glaciale | 5 | 19 (12) | 7 (7) | 30 | 1 | 15 | 189 / 319 | 50 / 165 | 99% |
| 104. Encelado e i suoi pennacchi | Oceanico | 8 | 17 (14) | 4 (4) | 13 | 2 | 27 | 186 / 291 | 50 / 150 | 100% |
| 105. Titano, la chimica senza acqua | Terrestre | 5 | 14 (13) | 8 (8) | 33 | 2 | 27 | 188 / 285 | 50 / 171 | 99,7% |
| 106. Scoprire gli esopianeti | Vulcanico | 7 | 16 (12) | 9 (9) | 23 | 1 | 18 | 190 / 299 | 50 / 175 | 99,6% |
| 107. Atmosfere degli esopianeti e JWST | Oceanico | 7 | 19 (14) | 4 (4) | 15 | 2 | 26 | 193 / 308 | 50 / 171 | 99% |
| 108. Biofirme e falsi positivi | Terrestre | 5 | 19 (12) | 9 (9) | 31 | 1 | 24 | 185 / 289 | 50 / 175 | 99% |
| 109. Panspermia e protezione planetaria | Desertico | 6 | 16 (12) | 9 (9) | 40 | 1 | 8 | 205 / 310 | 50 / 195 | 99% |
| 110. Tecnofirme, SETI ed equazione di Drake | Craterizzato | 5 | 16 (12) | 5 (5) | 40 | 1 | 0 | 206 / 304 | 50 / 181 | 99% |
| 111. Onde elettromagnetiche e pressione della luce | Terrestre | 8 | 16 (12) | 7 (7) | 40 | 1 | 28 | 198 / 300 | 50 / 150 | 99,6% |
| 112. Specchi, lenti e telescopi | Oceanico | 7 | 16 (13) | 3 (3) | 18 | 2 | 23 | 186 / 286 | 71 / 193 | 99,5% |
| 113. Interferenza e interferometri | Desertico | 5 | 17 (12) | 6 (6) | 40 | 1 | 5 | 211 / 323 | 50 / 171 | 99,9% |
| 114. Diffrazione e potere risolutivo | Craterizzato | 7 | 17 (12) | 5 (5) | 40 | 1 | 0 | 207 / 316 | 50 / 171 | 99% |
| 115. Radiazione termica e luce delle stelle | Glaciale | 6 | 17 (12) | 8 (8) | 40 | 1 | 11 | 198 / 292 | 50 / 168 | 99,8% |
| 116. Legge di Gauss: gusci, pianeti e condensatori | Terrestre | 7 | 15 (13) | 9 (9) | 40 | 2 | 28 | 204 / 304 | 50 / 160 | 99,8% |
| 117. Particelle cariche nei campi magnetici | Oceanico | 6 | 16 (13) | 6 (6) | 28 | 2 | 23 | 185 / 290 | 50 / 150 | 100% |
| 118. Correnti, dipoli e dinamo dei pianeti | Desertico | 6 | 19 (12) | 9 (9) | 39 | 1 | 10 | 190 / 286 | 50 / 150 | 99,9% |
| 119. Induzione, circuiti oscillanti e radio | Craterizzato | 6 | 14 (12) | 4 (4) | 40 | 1 | 0 | 208 / 313 | 50 / 171 | 99,8% |
| 120. Equazioni di Maxwell e magnetismo della materia | Glaciale | 7 | 15 (12) | 7 (7) | 21 | 1 | 16 | 200 / 328 | 50 / 176 | 99,7% |
| 121. Relatività ristretta | Terrestre | 8 | 18 (14) | 9 (9) | 25 | 2 | 25 | 186 / 285 | 50 / 144 | 100% |
| 122. Onde di materia, atomi e righe spettrali | Glaciale | 7 | 18 (12) | 8 (8) | 20 | 1 | 16 | 183 / 297 | 50 / 151 | 99,9% |
| 123. Nuclei, decadimenti e datazioni | Desertico | 6 | 14 (12) | 8 (8) | 40 | 1 | 10 | 212 / 314 | 50 / 150 | 99,8% |
| 124. Energia dal nucleo: fusione nelle stelle | Vulcanico | 5 | 15 (12) | 6 (6) | 24 | 1 | 18 | 190 / 292 | 58 / 182 | 99,7% |
| 125. Particelle, espansione e Big Bang | Oceanico | 7 | 15 (13) | 5 (5) | 34 | 2 | 24 | 198 / 292 | 50 / 150 | 99,9% |

## Tipi

I siti sono di 14 tipi, i luoghi rari di 16 e i luoghi minori di 7 (`docs/LUOGHI_MINORI.md`); i biomi della zona sono fra i 46 del catalogo dei biomi (`docs/BIOMI.md`).
