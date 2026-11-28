# Meteo delle zone di atterraggio

Questo file è generato da `node scripts/meteo.mjs` a partire da `src/worlds/weather.js`; `tests/meteo.test.mjs` controlla che corrisponda al codice.

Dalla versione 1.79.0 ogni zona di atterraggio ha il proprio meteo, ricavato dalla carta d'identità del pianeta: la pressione, la temperatura media, la quota di anidride carbonica e la famiglia dicono quali fenomeni l'aria, l'acqua e il calore permettono. I tipi sono 7: cielo sereno, cielo coperto, pioggia, neve, nebbia, tempesta di polvere e pioggia di cenere. I 22 pianeti senza atmosfera restano sempre sereni e senza vento.

Dopo ogni atterraggio il cielo resta sereno per 60 s; poi il meteo segue episodi da 80 a 200 s, ciascuno di un tipo estratto con i pesi del pianeta e mai uguale al precedente, che cresce e cala in 20 s, con il proprio vento. La sequenza viene dal seme del pianeta, quindi lo stesso pianeta ripete lo stesso meteo dopo ogni atterraggio. La scena abbassa la luce della stella e del cielo, porta la nebbia al colore del fenomeno e alla sua visibilità e disegna attorno alla camera fino a 1500 gocce, fiocchi o granelli, 1000 con la grafica bilanciata e 600 con quella leggera, che cadono alla velocità calcolata per il pianeta e vanno con il vento.

## Tipi di meteo

| Tipo | Dove | Luce a piena intensità | Visibilità a piena intensità | Vento | Pianeti |
|---|---|---:|---:|---|---:|
| Cielo sereno | ogni pianeta | 100% | invariata | da 1 a 5 m/s | 125 |
| Cielo coperto | pressione di almeno 0,01 bar | 55% | 6000 m | da 3 a 9 m/s | 102 |
| Pioggia | acqua liquida in superficie (pianeti terrestri, oceanici e vulcanici), pressione oltre 0,2 bar | 45% | 700 m | da 3 a 10 m/s | 57 |
| Neve | pianeti glaciali con almeno 0,01 bar, pianeti terrestri sotto 10 °C | 60% | 350 m | da 2 a 8 m/s | 29 |
| Nebbia | acqua in superficie e pressione di almeno 0,2 bar | 65% | 80 m | da 0 a 2 m/s | 64 |
| Tempesta di polvere | pianeti desertici con almeno 0,004 bar | 40% | 160 m | da 1,2 a 2 volte la soglia della polvere | 23 |
| Pioggia di cenere | pianeti vulcanici | 50% | 450 m | da 1 a 5 m/s | 15 |

## La fisica

L'aria al suolo ha la densità dei gas ideali, ρ = pM/(RT), con la massa molare che va da 29 g/mol per un'aria di azoto e ossigeno a 44 g/mol per un'aria di sola anidride carbonica: sui 103 pianeti con atmosfera va da 0,012 a 44,2 kg/m³, contro 1,23 kg/m³ sulla Terra. Il pannello METEO, nella vista dell'esploratore, mostra i numeri del pianeta e il calcolo del fenomeno in corso.

- Pioggia: una goccia di 2 mm cade alla velocità limite v = √(8 r ρ_acqua g / (3 C ρ)), con C = 0,5, quando l'attrito dell'aria pareggia il peso: 6,5 m/s sulla Terra, da 1,0 m/s su «Attrito e vincoli» (pianeta 32) a 10,1 m/s su «Biofirme e falsi positivi» (pianeta 108).
- Neve: un fiocco di 5 mm, con una densità di 50 kg/m³ e C = 1,2, cade a 1,5 m/s sulla Terra e da 0,5 a 9,4 m/s sui 29 pianeti con la neve: nell'aria rarefatta dei pianeti glaciali scende più in fretta.
- Nebbia: l'aria satura contiene al più ρ_v = e_s/(R_v T) di vapore, con la pressione di saturazione e_s dalla relazione di Clausius e Clapeyron: 12,9 g/m³ sulla Terra a 15 °C, da 0,09 a 439 g/m³ sui 64 pianeti con la nebbia.
- Tempesta di polvere: il vento solleva granelli di 0,1 mm quando la velocità d'attrito supera u* = 0,1 √((ρ_g − ρ) g d / ρ) (Bagnold), cioè con un vento a 2 m dal suolo di u*/0,4 · ln(2/0,01): circa 2 m/s sulla Terra, da 3 a 18 m/s sui 23 pianeti desertici con aria. Le tempeste soffiano da 1,2 a 2 volte quella soglia.
- Cenere: un granello di 50 μm cade secondo la legge di Stokes, v = 2(ρ_g − ρ) g r² / (9η), che dipende dalla viscosità η dell'aria: 0,18 m/s sulla Terra, da 0,12 a 0,20 m/s sui 15 pianeti vulcanici.
- Vento: spinge l'esploratore con F = ½ ρ v² C A, con C = 1 e A = 0,7 m², contro il peso di 100 kg con la tuta.

## Pianeti

Densità dell'aria al suolo in kg/m³; velocità di caduta di gocce, fiocchi e cenere in m/s; vento che solleva la polvere in m/s a 2 m dal suolo. Un trattino indica un fenomeno assente sul pianeta.

| Pianeta | Famiglia | Aria | Meteo possibile | Goccia | Fiocco | Polvere | Cenere |
|---|---|---:|---|---:|---:|---:|---:|
| 1. Linguaggio e ragionamento matematico | Glaciale | 0,24 | sereno, nuvoloso, neve | – | 2,9 | – | – |
| 2. Algebra | Oceanico | 13,59 | sereno, nuvoloso, pioggia, nebbia | 1,9 | – | – | – |
| 3. Radicali | Desertico | 0,023 | sereno, nuvoloso, tempesta di polvere | – | – | 13 | – |
| 4. Equazioni e sistemi | Vulcanico | 20,11 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 1,8 | – | – | 0,20 |
| 5. Disequazioni | Glaciale | 0,076 | sereno, nuvoloso, neve | – | 6,3 | – | – |
| 6. Esponenziali e logaritmi | Desertico | 0,014 | sereno, nuvoloso, tempesta di polvere | – | – | 18 | – |
| 7. Geometria analitica | Terrestre | 7,00 | sereno, nuvoloso, pioggia, neve, nebbia | 2,6 | 0,59 | – | – |
| 8. Funzioni | Terrestre | 3,83 | sereno, nuvoloso, pioggia, nebbia | 4,1 | – | – | – |
| 9. Trigonometria | Oceanico | 6,96 | sereno, nuvoloso, pioggia, nebbia | 3,1 | – | – | – |
| 10. Combinatoria, probabilità e statistica | Oceanico | 9,99 | sereno, nuvoloso, pioggia, nebbia | 2,4 | – | – | – |
| 11. Geometria elementare | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 12. Dagli zeri alla struttura di un polinomio | Terrestre | 0,80 | sereno, nuvoloso, pioggia, nebbia | 9,0 | – | – | – |
| 13. Esistenza, unicità e approssimazione | Desertico | 0,074 | sereno, nuvoloso, tempesta di polvere | – | – | 7 | – |
| 14. Ragionamento, conteggio e infinito | Oceanico | 14,99 | sereno, nuvoloso, pioggia, nebbia | 2,1 | – | – | – |
| 15. Vettori, matrici, dati e vincoli | Glaciale | 0,034 | sereno, nuvoloso, neve | – | 9,2 | – | – |
| 16. Complessi, aritmetica e polinomi | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 17. Limiti, variazione e accumulazione | Vulcanico | 1,18 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 5,9 | – | – | 0,12 |
| 18. Radici, campi e nuovi sistemi numerici | Terrestre | 1,31 | sereno, nuvoloso, pioggia, neve, nebbia | 6,9 | 1,6 | – | – |
| 19. Geometrie, trasformazioni e simmetrie | Desertico | 0,34 | sereno, nuvoloso, tempesta di polvere | – | – | 3 | – |
| 20. Probabilità, informazione e fenomeni collettivi | Desertico | 0,027 | sereno, nuvoloso, tempesta di polvere | – | – | 14 | – |
| 21. Iterazioni, stabilità e precisione numerica | Oceanico | 1,09 | sereno, nuvoloso, pioggia, nebbia | 7,9 | – | – | – |
| 22. Onde, frequenze e ricostruzione | Desertico | 0,12 | sereno, nuvoloso, tempesta di polvere | – | – | 7 | – |
| 23. Reti, conservazione e strategie | Terrestre | 2,16 | sereno, nuvoloso, pioggia, nebbia | 4,4 | – | – | – |
| 24. Scala, energia, equilibrio e trasformazioni | Glaciale | 0,10 | sereno, nuvoloso, neve | – | 4,7 | – | – |
| 25. Oscillazioni, molecole e quantizzazione | Oceanico | 1,60 | sereno, nuvoloso, pioggia, nebbia | 5,9 | – | – | – |
| 26. Misure, unità e incertezza | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 27. Vettori e sistemi di riferimento | Desertico | 0,097 | sereno, nuvoloso, tempesta di polvere | – | – | 7 | – |
| 28. Moto rettilineo uniforme | Glaciale | 0,23 | sereno, nuvoloso, neve | – | 3,3 | – | – |
| 29. Moto uniformemente accelerato | Oceanico | 1,51 | sereno, nuvoloso, pioggia, nebbia | 5,3 | – | – | – |
| 30. Traiettorie e lanci | Terrestre | 1,03 | sereno, nuvoloso, pioggia, neve, nebbia | 6,6 | 1,5 | – | – |
| 31. Forze e leggi di Newton | Desertico | 0,072 | sereno, nuvoloso, tempesta di polvere | – | – | 8 | – |
| 32. Attrito e vincoli | Vulcanico | 44,15 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 1,0 | – | – | 0,14 |
| 33. Lavoro ed energia | Glaciale | 0,071 | sereno, nuvoloso, neve | – | 5,7 | – | – |
| 34. Quantità di moto e urti | Oceanico | 2,59 | sereno, nuvoloso, pioggia, nebbia | 4,9 | – | – | – |
| 35. Rotazione e momento d’inerzia | Desertico | 0,25 | sereno, nuvoloso, tempesta di polvere | – | – | 4 | – |
| 36. Momenti, leve ed equilibrio | Vulcanico | 2,13 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 4,4 | – | – | 0,12 |
| 37. Gravitazione | Oceanico | 0,67 | sereno, nuvoloso, pioggia, nebbia | 7,7 | – | – | – |
| 38. Orbite circolari | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 39. Fluidi e pressione | Terrestre | 1,75 | sereno, nuvoloso, pioggia, nebbia | 5,2 | – | – | – |
| 40. Galleggiamento e Archimede | Vulcanico | 0,78 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 8,9 | – | – | 0,19 |
| 41. Oscillazioni armoniche | Oceanico | 1,46 | sereno, nuvoloso, pioggia, nebbia | 5,3 | – | – | – |
| 42. Onde e sovrapposizione | Glaciale | 0,14 | sereno, nuvoloso, neve | – | 4,9 | – | – |
| 43. Gas ideali | Glaciale | 0,084 | sereno, nuvoloso, neve | – | 4,9 | – | – |
| 44. Calore e capacità termica | Vulcanico | 18,94 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 1,6 | – | – | 0,13 |
| 45. Termodinamica e rendimento | Desertico | 0,059 | sereno, nuvoloso, tempesta di polvere | – | – | 10 | – |
| 46. Cariche e campo elettrico | Oceanico | 0,77 | sereno, nuvoloso, pioggia, nebbia | 8,3 | – | – | – |
| 47. Potenziale ed energia elettrica | Vulcanico | 10,96 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 2,3 | – | – | 0,17 |
| 48. Circuiti e legge di Ohm | Desertico | 0,041 | sereno, nuvoloso, tempesta di polvere | – | – | 10 | – |
| 49. Induzione elettromagnetica | Terrestre | 2,92 | sereno, nuvoloso, pioggia, nebbia | 4,2 | – | – | – |
| 50. Fotoni ed energia quantizzata | Glaciale | 0,30 | sereno, nuvoloso, neve | – | 2,9 | – | – |
| 51. Materia, proprietà e densità | Oceanico | 0,91 | sereno, nuvoloso, pioggia, nebbia | 7,7 | – | – | – |
| 52. Atomi, isotopi e massa media | Desertico | 0 | sereno, senza atmosfera | – | – | – | – |
| 53. Mole e quantità di sostanza | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 54. Livelli atomici e spettri | Terrestre | 6,12 | sereno, nuvoloso, pioggia, neve, nebbia | 3,1 | 0,71 | – | – |
| 55. Periodicità e carica efficace | Glaciale | 0,49 | sereno, nuvoloso, neve, nebbia | – | 2,5 | – | – |
| 56. Legame ionico e interazioni elettrostatiche | Desertico | 0,069 | sereno, nuvoloso, tempesta di polvere | – | – | 8 | – |
| 57. Legame covalente ed energia di legame | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 58. Geometria molecolare e VSEPR | Vulcanico | 1,98 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 5,7 | – | – | 0,19 |
| 59. Forze intermolecolari | Oceanico | 15,56 | sereno, nuvoloso, pioggia, nebbia | 1,9 | – | – | – |
| 60. Gas e stato aeriforme | Oceanico | 19,31 | sereno, nuvoloso, pioggia, nebbia | 1,6 | – | – | – |
| 61. Stati della materia e transizioni | Glaciale | 0,053 | sereno, nuvoloso, neve | – | 6,2 | – | – |
| 62. Soluzioni e concentrazione | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 63. Solubilità ed equilibrio eterogeneo | Desertico | 0,23 | sereno, nuvoloso, tempesta di polvere | – | – | 5 | – |
| 64. Stechiometria e reagente limitante | Oceanico | 3,58 | sereno, nuvoloso, pioggia, nebbia | 3,5 | – | – | – |
| 65. Resa e bilanci di materia | Desertico | 0 | sereno, senza atmosfera | – | – | – | – |
| 66. Termochimica e calorimetria | Terrestre | 4,70 | sereno, nuvoloso, pioggia, nebbia | 3,4 | – | – | – |
| 67. Velocità di reazione | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 68. Temperatura e attivazione | Desertico | 0,30 | sereno, nuvoloso, tempesta di polvere | – | – | 4 | – |
| 69. Equilibrio chimico | Oceanico | 0,99 | sereno, nuvoloso, pioggia, nebbia | 6,9 | – | – | – |
| 70. Perturbazioni dell’equilibrio | Vulcanico | 42,82 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 1,2 | – | – | 0,17 |
| 71. Acidi, basi e pH | Vulcanico | 1,26 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 6,0 | – | – | 0,14 |
| 72. Soluzioni tampone | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 73. Ossidazione, riduzione ed elettrochimica | Terrestre | 0,83 | sereno, nuvoloso, pioggia, nebbia | 9,1 | – | – | – |
| 74. Chimica organica e scheletri carboniosi | Glaciale | 0,11 | sereno, nuvoloso, neve | – | 4,9 | – | – |
| 75. Polimeri e materiali | Oceanico | 16,27 | sereno, nuvoloso, pioggia, nebbia | 1,8 | – | – | – |
| 76. Che cos'è la vita | Glaciale | 0,56 | sereno, nuvoloso, neve, nebbia | – | 1,9 | – | – |
| 77. Cellule, scala e superficie | Desertico | 0,22 | sereno, nuvoloso, tempesta di polvere | – | – | 5 | – |
| 78. Membrane e protocellule | Vulcanico | 1,24 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 5,6 | – | – | 0,12 |
| 79. Elementi e molecole della vita nello spazio | Glaciale | 1,26 | sereno, nuvoloso, neve, nebbia | – | 1,6 | – | – |
| 80. Meteoriti, comete e campioni di asteroidi | Terrestre | 6,86 | sereno, nuvoloso, pioggia, nebbia | 2,5 | – | – | – |
| 81. Chiralità e omochiralità | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 82. Miller-Urey e la sintesi prebiotica | Glaciale | 0,85 | sereno, nuvoloso, neve, nebbia | – | 1,7 | – | – |
| 83. Energia, enzimi e catalisi | Desertico | 0,23 | sereno, nuvoloso, tempesta di polvere | – | – | 4 | – |
| 84. Sorgenti idrotermali e metabolismo primordiale | Terrestre | 4,58 | sereno, nuvoloso, pioggia, nebbia | 3,2 | – | – | – |
| 85. Il mondo a RNA | Desertico | 0,025 | sereno, nuvoloso, tempesta di polvere | – | – | 15 | – |
| 86. DNA, codice genetico ed espressione | Glaciale | 1,08 | sereno, nuvoloso, neve, nebbia | – | 1,6 | – | – |
| 87. Mutazioni e soglia d'errore | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 88. Ereditarietà e selezione naturale | Glaciale | 0,79 | sereno, nuvoloso, neve, nebbia | – | 2,1 | – | – |
| 89. Deriva genetica | Desertico | 0,016 | sereno, nuvoloso, tempesta di polvere | – | – | 18 | – |
| 90. L'albero universale e LUCA | Oceanico | 0,60 | sereno, nuvoloso, pioggia, nebbia | 9,5 | – | – | – |
| 91. Le prime tracce della vita e il tempo geologico | Vulcanico | 0,77 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 8,8 | – | – | 0,18 |
| 92. Ossigeno, endosimbiosi e cellule complesse | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 93. Estremofili | Glaciale | 0,058 | sereno, nuvoloso, neve | – | 6,9 | – | – |
| 94. Respirazione, fermentazione e chemiosintesi | Desertico | 0,19 | sereno, nuvoloso, tempesta di polvere | – | – | 5 | – |
| 95. Fotosintesi e luce di altre stelle | Vulcanico | 0,77 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 7,5 | – | – | 0,13 |
| 96. Crescita delle popolazioni microbiche | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 97. La zona abitabile | Desertico | 0,012 | sereno, tempesta di polvere | – | – | 18 | – |
| 98. Atmosfere, effetto serra e clima | Glaciale | 0,036 | sereno, nuvoloso, neve | – | 9,4 | – | – |
| 99. Abitabilità attorno alle nane rosse | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 100. Biosfera, albedo e Daisyworld | Terrestre | 7,17 | sereno, nuvoloso, pioggia, neve, nebbia | 2,3 | 0,53 | – | – |
| 101. Marte: acqua e abitabilità passata | Desertico | 0 | sereno, senza atmosfera | – | – | – | – |
| 102. Cercare la vita su Marte | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 103. Europa e gli oceani sotto il ghiaccio | Glaciale | 1,04 | sereno, nuvoloso, neve, nebbia | – | 1,7 | – | – |
| 104. Encelado e i suoi pennacchi | Oceanico | 7,30 | sereno, nuvoloso, pioggia, nebbia | 2,4 | – | – | – |
| 105. Titano, la chimica senza acqua | Terrestre | 0,73 | sereno, nuvoloso, pioggia, nebbia | 9,5 | – | – | – |
| 106. Scoprire gli esopianeti | Vulcanico | 20,98 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 1,7 | – | – | 0,17 |
| 107. Atmosfere degli esopianeti e JWST | Oceanico | 2,48 | sereno, nuvoloso, pioggia, nebbia | 5,1 | – | – | – |
| 108. Biofirme e falsi positivi | Terrestre | 0,56 | sereno, nuvoloso, pioggia, nebbia | 10,1 | – | – | – |
| 109. Panspermia e protezione planetaria | Desertico | 0,017 | sereno, nuvoloso, tempesta di polvere | – | – | 15 | – |
| 110. Tecnofirme, SETI ed equazione di Drake | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 111. Onde elettromagnetiche e pressione della luce | Terrestre | 0,46 | sereno, nuvoloso, pioggia, neve, nebbia | 9,2 | 2,1 | – | – |
| 112. Specchi, lenti e telescopi | Oceanico | 0,74 | sereno, nuvoloso, pioggia, nebbia | 8,0 | – | – | – |
| 113. Interferenza e interferometri | Desertico | 0 | sereno, senza atmosfera | – | – | – | – |
| 114. Diffrazione e potere risolutivo | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 115. Radiazione termica e luce delle stelle | Glaciale | 0,050 | sereno, nuvoloso, neve | – | 6,3 | – | – |
| 116. Legge di Gauss: gusci, pianeti e condensatori | Terrestre | 1,10 | sereno, nuvoloso, pioggia, nebbia | 6,6 | – | – | – |
| 117. Particelle cariche nei campi magnetici | Oceanico | 5,10 | sereno, nuvoloso, pioggia, nebbia | 3,0 | – | – | – |
| 118. Correnti, dipoli e dinamo dei pianeti | Desertico | 0,054 | sereno, nuvoloso, tempesta di polvere | – | – | 9 | – |
| 119. Induzione, circuiti oscillanti e radio | Craterizzato | 0 | sereno, senza atmosfera | – | – | – | – |
| 120. Equazioni di Maxwell e magnetismo della materia | Glaciale | 0,17 | sereno, nuvoloso, neve | – | 3,5 | – | – |
| 121. Relatività ristretta | Terrestre | 9,18 | sereno, nuvoloso, pioggia, nebbia | 2,2 | – | – | – |
| 122. Onde di materia, atomi e righe spettrali | Glaciale | 0,23 | sereno, nuvoloso, neve | – | 3,4 | – | – |
| 123. Nuclei, decadimenti e datazioni | Desertico | 0,058 | sereno, nuvoloso, tempesta di polvere | – | – | 10 | – |
| 124. Energia dal nucleo: fusione nelle stelle | Vulcanico | 29,74 | sereno, nuvoloso, pioggia, nebbia, pioggia di cenere | 1,4 | – | – | 0,16 |
| 125. Particelle, espansione e Big Bang | Oceanico | 9,07 | sereno, nuvoloso, pioggia, nebbia | 2,2 | – | – | – |
