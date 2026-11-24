# Catalogo dei modelli dei mondi

Questo file elenca i 2868 modelli dei mondi vivi: 1388 specie, 1201 edifici delle colonie, 200 edifici dei villaggi, 40 popoli nativi, 36 coloni e 3 rover. Con i 997 modelli delle stazioni e delle navi (`docs/CATALOGO.md`) il catalogo 3D del sito ne mostra 3865. Il file è generato dal codice con `node scripts/catalogo-mondi.mjs`, che costruisce le superfici dei 125 pianeti e scrive anche l'indice `content/worlds/modelli.json`; `tests/mondi.test.mjs` controlla che entrambi corrispondano al codice. Nel sito i modelli si guardano nel catalogo 3D, con i gruppi «Specie», «Edifici» e «Abitanti e rover»; triangoli e tempi di costruzione sono in `docs/PRESTAZIONI_MONDI.md`.

## Riepilogo

| Genere | Modelli |
|---|---:|
| Specie | 1388 |
| Edificio della colonia | 1201 |
| Edificio del villaggio | 200 |
| Colono | 36 |
| Abitante nativo | 40 |
| Rover dell’esploratore | 3 |

Coloni e rover sono gli stessi su più pianeti: un colono dipende dalla tenuta della tipologia, dalla figura e dal colore della pelle e dei capelli, un rover dalla tipologia. Il catalogo li mette sotto il primo pianeta in cui compaiono.

| Modello condiviso | Pianeti |
|---|---:|
| Colono adulto, abiti leggeri, carnagione 1 | 13 |
| Colono adulto, abiti leggeri, carnagione 2 | 10 |
| Colono adulto, abiti leggeri, carnagione 3 | 7 |
| Colono adulto, abiti leggeri, carnagione 4 | 11 |
| Colono adulto, respiratore, carnagione 1 | 3 |
| Colono adulto, respiratore, carnagione 2 | 11 |
| Colono adulto, respiratore, carnagione 3 | 13 |
| Colono adulto, respiratore, carnagione 4 | 11 |
| Colono adulto, tuta pressurizzata, carnagione 1 | 16 |
| Colono adulto, tuta pressurizzata, carnagione 2 | 10 |
| Colono adulto, tuta pressurizzata, carnagione 3 | 11 |
| Colono adulto, tuta pressurizzata, carnagione 4 | 9 |
| Colono bambino, abiti leggeri, carnagione 1 | 7 |
| Colono bambino, abiti leggeri, carnagione 2 | 11 |
| Colono bambino, abiti leggeri, carnagione 3 | 13 |
| Colono bambino, abiti leggeri, carnagione 4 | 10 |
| Colono bambino, respiratore, carnagione 1 | 13 |
| Colono bambino, respiratore, carnagione 2 | 11 |
| Colono bambino, respiratore, carnagione 3 | 3 |
| Colono bambino, respiratore, carnagione 4 | 11 |
| Colono bambino, tuta pressurizzata, carnagione 1 | 11 |
| Colono bambino, tuta pressurizzata, carnagione 2 | 9 |
| Colono bambino, tuta pressurizzata, carnagione 3 | 16 |
| Colono bambino, tuta pressurizzata, carnagione 4 | 10 |
| Colono con lo zaino, abiti leggeri, carnagione 1 | 11 |
| Colono con lo zaino, abiti leggeri, carnagione 2 | 13 |
| Colono con lo zaino, abiti leggeri, carnagione 3 | 10 |
| Colono con lo zaino, abiti leggeri, carnagione 4 | 7 |
| Colono con lo zaino, respiratore, carnagione 1 | 11 |
| Colono con lo zaino, respiratore, carnagione 2 | 3 |
| Colono con lo zaino, respiratore, carnagione 3 | 11 |
| Colono con lo zaino, respiratore, carnagione 4 | 13 |
| Colono con lo zaino, tuta pressurizzata, carnagione 1 | 9 |
| Colono con lo zaino, tuta pressurizzata, carnagione 2 | 16 |
| Colono con lo zaino, tuta pressurizzata, carnagione 3 | 10 |
| Colono con lo zaino, tuta pressurizzata, carnagione 4 | 11 |
| Rover dell’avamposto sigillato | 46 |
| Rover dell’insediamento simbiotico | 41 |
| Rover della città adattata | 38 |

## Pianeti

Per ogni sistema e per ogni pianeta: le specie, gli edifici della colonia e, dove c'è, il villaggio con il suo popolo.

### 1. Numeri e ragionamento

**Linguaggio e ragionamento matematico** (pianeta 1): 23 modelli.

- Specie (10): Pulvivessa glacialis, Crustilaria rubra, Medutassa glacialis, Pulvimolia glacialis, Thamnoconia rubra, Mycodiina pallida, Graminora glacialis, Ophicatia glacialis, Medumora glacialis, Medusinia glacialis.
- Colonia Borgo Elne, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 1; Colono con lo zaino, respiratore, carnagione 2; Colono bambino, respiratore, carnagione 3; Rover della città adattata.

**Ragionamento, conteggio e infinito** (pianeta 14): 34 modelli.

- Specie (19): Pteriraina rubra, Gramiriria gravis, Hexanessa gravis, Pterocara alpestris, Calamonossa litoralis, Calamotassa rubra, Crustimonia campestris, Dendroriina campestris, Gramicora alpestris, Thamnotara campestris, Dendroritia rubra, Thamnocaina gravis, Gramirissa gravis, Pterocassa litoralis, Pterolaella ferox, Hexacolia gravis, Pterodissa ferox, Medumoria gravis, Medupoina gravis.
- Colonia Base Casol, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Lurumo, popolo Yaru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Esistenza, unicità e approssimazione** (pianeta 13): 14 modelli.

- Specie (4): Pulvicossa vulgaris, Crustidissa nigra, Hexavenia vulgaris, Crustinetia vulgaris.
- Colonia Approdo Verse, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Radici, campi e nuovi sistemi numerici** (pianeta 18): 34 modelli.

- Specie (20): Gramitatia gravis, Dendronora alpestris, Pteritara aurea, Pterocaella gravis, Pecutetia gravis, Hexacania vulgaris, Mycosiella aurea, Thamnoveella rubra, Thamnoratia gravis, Calamorilia rubra, Mycoluella rubra, Calamotenia aurea, Pterimossa rubra, Calamovetia rubra, Pteritatia gravis, Lyconoria ferox, Hexadiria ferox, Ophidiina litoralis, Saltosissa campestris, Pecudiria alpestris.
- Colonia Base Vasene, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, antenne ramificate.
- Villaggio di Lunolu, popolo Moru (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 2. Algebra ed equazioni

**Algebra** (pianeta 2): 38 modelli.

- Specie (19): Gramimotia aurea, Pteriralia litoralis, Dendrocalia alpestris, Pterolulia alpestris, Meduditia pelagica, Hexamotia vulgaris, Mycotessa vulgaris, Dendrorira litoralis, Gramineria litoralis, Thamnomora alpestris, Crustilulia viridis, Dendrocora campestris, Dendroriella campestris, Calamolaria litoralis, Octovera alpestris, Meduveria pelagica, Saltonoria campestris, Meducaella pelagica, Pteromoria litoralis.
- Colonia Porto Arcaora, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Shanomo, popolo Hama (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 2; Colono con lo zaino, abiti leggeri, carnagione 3; Colono bambino, abiti leggeri, carnagione 4; Rover dell’insediamento simbiotico.

**Radicali** (pianeta 3): 19 modelli.

- Specie (3): Pulvimoina aurea, Pulviveella vulgaris, Stylonoella campestris.
- Colonia Approdo Solralo, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 3; Colono con lo zaino, tuta pressurizzata, carnagione 4; Colono bambino, tuta pressurizzata, carnagione 1; Rover dell’avamposto sigillato.

**Equazioni e sistemi** (pianeta 4): 24 modelli.

- Specie (12): Cyatholaella gravis, Ptericonia viridis, Hexadira gravis, Pteroriria gravis, Ptericossa viridis, Ptericalia viridis, Cyathosilia viridis, Thamnotalia gravis, Pteripolia aurea, Cyatholuina thermalis, Dipotalia ferox, Ophirassa gravis.
- Colonia Approdo Oraliten, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 4; Colono con lo zaino, respiratore, carnagione 1; Colono bambino, respiratore, carnagione 2.

**Disequazioni** (pianeta 5): 20 modelli.

- Specie (6): Crustiraria aurea, Gramimolia aurea, Graminoina glacialis, Mycocassa glacialis, Saltopoella glacialis, Saltotalia glacialis.
- Colonia Nuova Arrili, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 1; Colono con lo zaino, tuta pressurizzata, carnagione 2; Colono bambino, tuta pressurizzata, carnagione 3.

**Dagli zeri alla struttura di un polinomio** (pianeta 12): 36 modelli.

- Specie (22): Pterineina gravis, Dendrositia aurea, Gramicatia aurea, Hexapoella vulgaris, Pecumoina gravis, Pterolussa gravis, Thamnoneria aurea, Dendronoria aurea, Pulvilalia gravis, Thamnodilia aurea, Calamotalia aurea, Gramitessa aurea, Calamoneina gravis, Dendrotetia viridis, Mycodilia rubra, Thamnoneina gravis, Pterorania ferox, Lycocaella gravis, Pecunossa gravis, Hexalaina campestris, Pecusiria gravis, Hexaporia alpestris.
- Colonia Porto Lone, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, piattaforme a foglia, antenne ramificate.
- Villaggio di Enzilu, popolo Nono (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Complessi, aritmetica e polinomi** (pianeta 16): 14 modelli.

- Colonia Rada Nemo, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 4; Colono con lo zaino, tuta pressurizzata, carnagione 1; Colono bambino, tuta pressurizzata, carnagione 2.

### 3. Funzioni e variazione

**Funzioni** (pianeta 8): 39 modelli.

- Specie (21): Gramirara rubra, Pterilassa litoralis, Dendrocassa rubra, Pecucalia gravis, Pterocossa alpestris, Hexaneina gravis, Dendrotelia rubra, Dendronera rubra, Thamnovera rubra, Pteripora rubra, Mycotara alpestris, Thamnoditia rubra, Thamnotaina campestris, Mycopolia aurea, Mycorilia rubra, Pecucaella gravis, Pecutatia gravis, Octosilia ferox, Pterocatia alpestris, Hexacossa vulgaris, Octopossa gravis.
- Colonia Nuova Liva, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Talzien, popolo Yati (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 4; Colono con lo zaino, abiti leggeri, carnagione 1; Colono bambino, abiti leggeri, carnagione 2.

**Esponenziali e logaritmi** (pianeta 6): 17 modelli.

- Specie (4): Styloteria aurea, Thamnocassa alpestris, Thamnoluella vulgaris, Crusticassa rubra.
- Colonia Rada Verra, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 2; Colono con lo zaino, tuta pressurizzata, carnagione 3; Colono bambino, tuta pressurizzata, carnagione 4.

**Limiti, variazione e accumulazione** (pianeta 17): 21 modelli.

- Specie (12): Cyathoralia rubra, Gramicotia rubra, Pteroponia alpestris, Cyathocaria thermalis, Cyathovera rubra, Crustimoria levis, Myconelia rubra, Thamnotera alpestris, Cyathocaina purpurea, Hexacatia levis, Hexarassa levis, Octonora alpestris.
- Colonia Approdo Marelver, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Iterazioni, stabilità e precisione numerica** (pianeta 21): 34 modelli.

- Specie (19): Pterimoella aurea, Dendropolia aurea, Graminoella aurea, Medutara pelagica, Hexanelia gravis, Pteriporia aurea, Mycodiella vulgaris, Mycodira gravis, Dendrodiina gravis, Thamnomossa rubra, Calamomora gravis, Calamolussa aurea, Thamnoteella gravis, Octotassa ferox, Ophineria gravis, Medulaella pelagica, Pterocora gravis, Hexadiina gravis, Pterolaina gravis.
- Colonia Approdo Oramar, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Ziyaya, popolo Urlu (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 4. Geometria e trasformazioni

**Geometria elementare** (pianeta 11): 12 modelli.

- Colonia Porto Line, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Geometria analitica** (pianeta 7): 39 modelli.

- Specie (21): Gramipossa viridis, Pterimoina litoralis, Dendrotania viridis, Pecupossa campestris, Hexanoella vulgaris, Pterosissa alpestris, Mycositia aurea, Pulviveria viridis, Mycotenia rubra, Thamnopoella viridis, Mycorira alpestris, Thamnomolia viridis, Mycomossa rubra, Pteririra viridis, Gramiporia viridis, Pteronessa litoralis, Dipovera vulgaris, Saltosiella vulgaris, Pteroluella litoralis, Pterotatia alpestris, Saltolunia vulgaris.
- Colonia Rada Marmar, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Luziru, popolo Enlu (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 3; Colono con lo zaino, abiti leggeri, carnagione 4; Colono bambino, abiti leggeri, carnagione 1.

**Trigonometria** (pianeta 9): 37 modelli.

- Specie (19): Gramitera viridis, Dendrovessa viridis, Meduluella gravis, Pterovetia gravis, Hexaraina gravis, Pteritaina viridis, Crustiluria viridis, Calamoponia viridis, Crustipora viridis, Dendronoella campestris, Calamonenia gravis, Calamolalia viridis, Crustivelia campestris, Calamolaina litoralis, Saltodissa gravis, Ophicoria ferox, Pterorira gravis, Medurira pelagica, Hexacassa alpestris.
- Colonia Approdo Armopa, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Timama, popolo Talur (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 1; Colono con lo zaino, abiti leggeri, carnagione 2; Colono bambino, abiti leggeri, carnagione 3.

**Vettori, matrici, dati e vincoli** (pianeta 15): 17 modelli.

- Specie (6): Pulvipossa glacialis, Medunoina glacialis, Pulvimora glacialis, Pulvidilia glacialis, Gramicania viridis, Pulvinelia viridis.
- Colonia Nuova Ismar, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Geometrie, trasformazioni e simmetrie** (pianeta 19): 19 modelli.

- Specie (8): Crustitaina campestris, Pulvilara levis, Hexavelia levis, Crusticoina levis, Stylorilia levis, Stylotara viridis, Hexavessa levis, Saltocossa levis.
- Colonia Base Tensolel, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 3; Colono con lo zaino, respiratore, carnagione 4; Colono bambino, respiratore, carnagione 1.

### 5. Probabilità e dati

**Combinatoria, probabilità e statistica** (pianeta 10): 34 modelli.

- Specie (19): Gramipora aurea, Ptericatia litoralis, Dendronolia aurea, Hexarinia vulgaris, Pteroratia alpestris, Meduratia pelagica, Pteriveina aurea, Dendroriria aurea, Crustitara campestris, Calamopoella litoralis, Crustinoina aurea, Mycorassa alpestris, Crustilussa campestris, Myconoria litoralis, Octonoina ferox, Meduveella pelagica, Meduvetia pelagica, Pteroritia litoralis, Lycomoella ferox.
- Colonia Nuova Solismar, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Luqeok, popolo Talru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Probabilità, informazione e fenomeni collettivi** (pianeta 20): 12 modelli.

- Specie (3): Stylovelia viridis, Thamnosinia aurea, Stylocoina alpestris.
- Colonia Base Ranever, avamposto sigillato (9 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Reti, conservazione e strategie** (pianeta 23): 36 modelli.

- Specie (21): Ptericaria aurea, Dendroratia viridis, Gramiraria viridis, Pteropoella levis, Hexanera levis, Gramidira viridis, Dendrodissa levis, Pteridiella aurea, Thamnomotia vulgaris, Gramiteina litoralis, Mycotera levis, Thamnononia campestris, Calamonoina litoralis, Thamnodinia viridis, Dendromoina viridis, Pterocolia litoralis, Diponetia campestris, Lycocossa levis, Pterodinia alpestris, Ophitaria vulgaris, Pecupoina alpestris.
- Colonia Nuova Momarse, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Luenlu, popolo Urlu (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 6. Matematica per le scienze

**Onde, frequenze e ricostruzione** (pianeta 22): 21 modelli.

- Specie (8): Pulvilatia vulgaris, Styloteella campestris, Hexatelia gravis, Thamnolaina campestris, Styloraria gravis, Thamnotessa viridis, Pulviriella viridis, Hexaditia gravis.
- Colonia Borgo Sese, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 2; Colono con lo zaino, respiratore, carnagione 3; Colono bambino, respiratore, carnagione 4.

**Scala, energia, equilibrio e trasformazioni** (pianeta 24): 18 modelli.

- Specie (8): Crustinossa viridis, Medusira glacialis, Crusticoella glacialis, Crustipoella glacialis, Pulviluria viridis, Gramidinia viridis, Saltoluria glacialis, Medulatia glacialis.
- Colonia Nuova Vertomo, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, antenne per lo spazio profondo.

**Oscillazioni, molecole e quantizzazione** (pianeta 25): 35 modelli.

- Specie (20): Pterimora viridis, Dendroraina viridis, Hexaveria vulgaris, Meducoina pelagica, Pterolura alpestris, Crustiveria vulgaris, Mycomonia litoralis, Dendrolutia viridis, Mycocotia aurea, Gramitelia viridis, Calamocora viridis, Crustisissa viridis, Thamnodiina campestris, Dendrorara campestris, Pteridiria viridis, Pteronolia alpestris, Meduconia pelagica, Hexariria campestris, Lycolalia ferox, Hexaluella vulgaris.
- Colonia Porto Arlo, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Moqemo, popolo Halu (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 7. Misura e moto

**Misure, unità e incertezza** (pianeta 26): 12 modelli.

- Colonia Approdo Arse, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Vettori e sistemi di riferimento** (pianeta 27): 16 modelli.

- Specie (7): Stylocaria purpurea, Crustiritia nigra, Hexalutia vulgaris, Pulvinenia purpurea, Pulvisiina rubra, Pulvicotia rubra, Hexatetia alpestris.
- Colonia Porto Raar, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Moto rettilineo uniforme** (pianeta 28): 20 modelli.

- Specie (10): Crusticaria nigra, Pulvirira glacialis, Meducoella glacialis, Hexatatia glacialis, Graminera purpurea, Pulvisissa glacialis, Pulvinoella glacialis, Thamnorira purpurea, Medunera glacialis, Medupolia glacialis.
- Colonia Borgo Isri, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Moto uniformemente accelerato** (pianeta 29): 36 modelli.

- Specie (21): Gramiritia campestris, Pteririina purpurea, Dendrotaella alpestris, Meduveina levis, Hexatara levis, Crustitalia nigra, Dendroralia levis, Dendrorinia purpurea, Pteritera alpestris, Mycoponia aurea, Calamovenia rubra, Pteripoina levis, Mycolassa aurea, Crusticoria campestris, Hexasissa campestris, Saltonolia vulgaris, Meduvenia levis, Ophidilia levis, Ophinoina levis, Medularia pelagica, Hexaponia vulgaris.
- Colonia Porto Neora, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Nokaru, popolo Malu (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Traiettorie e lanci** (pianeta 30): 37 modelli.

- Specie (22): Pterimoria litoralis, Dendropoina purpurea, Gramisiria purpurea, Hexaneella vulgaris, Peculussa campestris, Mycocolia rubra, Dendrosilia campestris, Gramilaina purpurea, Mycoraella rubra, Dendrocolia purpurea, Myconora vulgaris, Gramimossa purpurea, Gramiluria purpurea, Calamolunia litoralis, Mycoriella rubra, Pterotania alpestris, Dipopoina ferox, Pecurissa alpestris, Pteroluria litoralis, Dipocara vulgaris, Peculuella campestris, Hexaveella vulgaris.
- Colonia Base Casene, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Okyaok, popolo Notal (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 8. Forze ed energia

**Forze e leggi di Newton** (pianeta 31): 17 modelli.

- Specie (6): Pulviconia rubra, Stylolara rubra, Hexacaria vulgaris, Pulvicassa vulgaris, Pulvisilia rubra, Hexararia vulgaris.
- Colonia Rada Liriva, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Attrito e vincoli** (pianeta 32): 23 modelli.

- Specie (13): Pterisinia purpurea, Gramirilia campestris, Hexaconia vulgaris, Pteronoella alpestris, Thamnoraella purpurea, Thamnolura vulgaris, Myconetia rubra, Myconolia rubra, Cyathoneella thermalis, Cyathodira purpurea, Hexataria ferox, Ophinora litoralis, Hexalussa vulgaris.
- Colonia Porto Vanedu, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Lavoro ed energia** (pianeta 33): 18 modelli.

- Specie (7): Pulvitaella purpurea, Myconenia aurea, Mycodinia rubra, Gramidissa glacialis, Crustirilia glacialis, Hexariina glacialis, Ophineina glacialis.
- Colonia Approdo Necato, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Quantità di moto e urti** (pianeta 34): 34 modelli.

- Specie (19): Gramisissa purpurea, Pteriraella litoralis, Dendrolulia purpurea, Meduneina pelagica, Pterotalia gravis, Dendrolaina purpurea, Mycorinia gravis, Calamolura litoralis, Crustiluina nigra, Pterinoella caerulea, Calamoveella nigra, Thamnonora vulgaris, Calamorania nigra, Saltotetia campestris, Hexacaina vulgaris, Pterononia alpestris, Hexalumolia campestris, Octocania litoralis, Medurilia pelagica.
- Colonia Porto Marra, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Hatalok, popolo Shama (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 9. Rotazioni e gravità

**Rotazione e momento d’inerzia** (pianeta 35): 19 modelli.

- Specie (8): Crustirira aurea, Pulvidinia viridis, Hexaveina vulgaris, Pulvitenia aurea, Thamnocara aurea, Thamnonoella viridis, Saltoriina campestris, Saltoriella vulgaris.
- Colonia Porto Marnene, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Momenti, leve ed equilibrio** (pianeta 36): 25 modelli.

- Specie (14): Gramiconia aurea, Pteririria viridis, Pteropossa levis, Ptericania aurea, Crustiteina aurea, Thamnoteina aurea, Cyatholutia aurea, Gramilutia aurea, Cyathonera levis, Ophipolia campestris, Pterodira campestris, Octoralia ferox, Hexapoina levis, Ophicania campestris.
- Colonia Nuova Sollo, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Gravitazione** (pianeta 37): 36 modelli.

- Specie (21): Gramivelia aurea, Dendromora levis, Ptericoina aurea, Pterovera levis, Hexarara vulgaris, Gramiratia levis, Gramicoina aurea, Thamnoluria aurea, Gramicoria aurea, Gramirira levis, Myconoella levis, Dendrocaella alpestris, Dendroluina alpestris, Calamovera levis, Meducossa levis, Pteroriina levis, Octolunia litoralis, Pterodiina ferox, Saltotessa campestris, Pterovelia levis, Pteroraina litoralis.
- Colonia Nuova Marorari, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Yarulu, popolo Urha (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Orbite circolari** (pianeta 38): 12 modelli.

- Colonia Base Oraliten, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 10. Fluidi, oscillazioni e onde

**Fluidi e pressione** (pianeta 39): 35 modelli.

- Specie (20): Gramisitia viridis, Dendrolussa viridis, Pteritenia viridis, Pteroteina alpestris, Pecurilia campestris, Thamnocotia alpestris, Calamoluella viridis, Calamomoella litoralis, Dendrocoina campestris, Gramitara alpestris, Dendropossa litoralis, Calamoriella viridis, Pulvimonia viridis, Gramiraella alpestris, Dipodira campestris, Pteroveina litoralis, Pteronelia alpestris, Hexamocolia vulgaris, Pecunera alpestris, Ophiratia vulgaris.
- Colonia Porto Arlone, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Noqeti, popolo Tiok (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Galleggiamento e Archimede** (pianeta 40): 22 modelli.

- Specie (13): Gramicalia viridis, Pterilara viridis, Pterocoella alpestris, Crustiriria alpestris, Mycomoella rubra, Thamnolussa viridis, Cyathodiella caerulea, Gramiteria campestris, Gramilania viridis, Dipodinia gravis, Hexarira gravis, Hexasiella alpestris, Hexacoria gravis.
- Colonia Rada Arseri, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Oscillazioni armoniche** (pianeta 41): 34 modelli.

- Specie (19): Gramitetia levis, Dendrocatia viridis, Pterinossa viridis, Pterocotia alpestris, Meducotia levis, Hexacara vulgaris, Mycoralia aurea, Thamnotassa viridis, Crustinoella alpestris, Mycocaella levis, Crustisira viridis, Dendronossa litoralis, Calamonolia litoralis, Mycopoina alpestris, Saltotenia vulgaris, Medurania levis, Lyconossa levis, Lycocassa levis, Ophicaina vulgaris.
- Colonia Approdo Eldu, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Maruya, popolo Haru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Onde e sovrapposizione** (pianeta 42): 17 modelli.

- Specie (9): Crustilalia viridis, Hexapora glacialis, Mycocatia glacialis, Pulvinera glacialis, Thamnocatia viridis, Thamnoriina glacialis, Pulviteella glacialis, Hexarilia glacialis, Saltoluina glacialis.
- Colonia Rada Rielmo, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

### 11. Calore e termodinamica

**Gas ideali** (pianeta 43): 19 modelli.

- Specie (7): Pulvilaria purpurea, Thamnocoella purpurea, Crustiteella nigra, Crustinotia nigra, Thamnoluina purpurea, Saltosiria glacialis, Meduluria glacialis.
- Colonia Approdo Carise, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Calore e capacità termica** (pianeta 44): 23 modelli.

- Specie (15): Gramicossa campestris, Pterilutia campestris, Pteromora alpestris, Hexasira vulgaris, Crustisilia nigra, Thamnonoria alpestris, Gramilaria campestris, Gramimoella purpurea, Thamnocoina purpurea, Cyathoteria purpurea, Cyathopoella purpurea, Diporilia campestris, Hexatassa vulgaris, Hexanolia alpestris, Pteroraria campestris.
- Colonia Approdo Liduar, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.

**Termodinamica e rendimento** (pianeta 45): 17 modelli.

- Specie (7): Pulviteria purpurea, Crusticaina nigra, Hexanossa gravis, Styloratia gravis, Pulviporia vulgaris, Pulvitetia vulgaris, Hexataella gravis.
- Colonia Porto Lova, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

### 12. Elettromagnetismo e quanti

**Cariche e campo elettrico** (pianeta 46): 35 modelli.

- Specie (20): Gramitaria aurea, Pterisilia aurea, Dendrorassa aurea, Pterorilia alpestris, Hexaraella vulgaris, Crusticatia vulgaris, Gramilassa aurea, Dendroveria alpestris, Calamocolia litoralis, Calamoriria aurea, Dendrovera aurea, Dendrodira alpestris, Pterivelia vulgaris, Dendrorilia aurea, Medurinia pelagica, Octoriella ferox, Saltonessa vulgaris, Octolulia ferox, Pteropolia litoralis, Saltolaria campestris.
- Colonia Rada Vaver, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Noyaen, popolo Maur (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Potenziale ed energia elettrica** (pianeta 47): 21 modelli.

- Specie (12): Gramivetia aurea, Pterisitia campestris, Hexasitia vulgaris, Pteromonia alpestris, Crustidiina viridis, Cyathorissa thermalis, Gramiteella aurea, Gramidiria campestris, Cyathoraella aurea, Cyatholania aurea, Hexacaella alpestris, Dipoponia campestris.
- Colonia Rada Arcael, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Circuiti e legge di Ohm** (pianeta 48): 15 modelli.

- Specie (4): Crustilania campestris, Stylosiria aurea, Stylonoina aurea, Stylolunia campestris.
- Colonia Borgo Marar, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Induzione elettromagnetica** (pianeta 49): 32 modelli.

- Specie (20): Gramiluella aurea, Pterilunia aurea, Dendrotaina alpestris, Pecuditia campestris, Hexanenia vulgaris, Pterotera alpestris, Mycolatia aurea, Dendrolaella litoralis, Dendrotatia litoralis, Thamnodiella alpestris, Mycopoella rubra, Dendrocaina campestris, Mycosissa rubra, Thamnocaella aurea, Pteritaria aurea, Gramiveria aurea, Hexamolia alpestris, Octoteina alpestris, Lycorissa campestris, Saltovetia campestris.
- Colonia Porto Vertopa, insediamento simbiotico (6 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, antenne ramificate.
- Villaggio di Luyamo, popolo Talen (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Fotoni ed energia quantizzata** (pianeta 50): 19 modelli.

- Specie (11): Pulvipoina aurea, Crustirara glacialis, Hexamoina glacialis, Gramiveella glacialis, Mycoriria viridis, Mycotalia glacialis, Thamnosira viridis, Myconessa viridis, Lycodinia ferox, Saltorilia glacialis, Ophiriria glacialis.
- Colonia Base Nera, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

### 13. Materia e atomi

**Materia, proprietà e densità** (pianeta 51): 35 modelli.

- Specie (21): Dendrolura alpestris, Pterinotia litoralis, Medupora pelagica, Pteroditia alpestris, Thamnoritia alpestris, Calamocassa viridis, Calamolassa litoralis, Dendrolatia alpestris, Dendrolara viridis, Dendrodiria viridis, Mycorissa litoralis, Calamosira viridis, Pteridiina vulgaris, Thamnonetia viridis, Lycoluella alpestris, Pterolalia alpestris, Medutatia pelagica, Saltocolia vulgaris, Octopoella litoralis, Medunessa pelagica, Pterosiria litoralis.
- Colonia Base Ramarsol, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, piattaforme a foglia, antenne ramificate.
- Villaggio di Hayaqe, popolo Maqe (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Atomi, isotopi e massa media** (pianeta 52): 12 modelli.

- Specie (1): Crustidiella viridis.
- Colonia Porto Lora, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Mole e quantità di sostanza** (pianeta 53): 12 modelli.

- Colonia Base Line, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Livelli atomici e spettri** (pianeta 54): 38 modelli.

- Specie (23): Gramicolia viridis, Dendromolia viridis, Pteritetia viridis, Hexadiella vulgaris, Pterosiina alpestris, Peculutia campestris, Thamnotetia alpestris, Thamnonessa vulgaris, Pulvipora viridis, Pulviponia vulgaris, Dendroneella litoralis, Gramitalia viridis, Thamnocora campestris, Gramilura alpestris, Gramimonia viridis, Dendrolania litoralis, Pterolaria alpestris, Dipodiella ferox, Pecudilia alpestris, Hexarissa vulgaris, Hexariella alpestris, Pecupoella campestris, Pecuneria campestris.
- Colonia Porto Mopa, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Qeshaur, popolo Moka (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Periodicità e carica efficace** (pianeta 55): 19 modelli.

- Specie (11): Crustimossa glacialis, Pulvinossa viridis, Hexaralia glacialis, Pulvinoina glacialis, Mycodiria pallida, Thamnovetia glacialis, Thamnonera glacialis, Crustiditia viridis, Saltocania glacialis, Saltosilia glacialis, Lycopoella glacialis.
- Colonia Rada Orapa, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

### 14. Legami e molecole

**Legame ionico e interazioni elettrostatiche** (pianeta 56): 18 modelli.

- Specie (7): Stylorissa campestris, Crustitenia campestris, Hexamoria vulgaris, Stylopolia campestris, Thamnoraria purpurea, Myconera vulgaris, Saltononia vulgaris.
- Colonia Base Maris, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Legame covalente ed energia di legame** (pianeta 57): 10 modelli.

- Colonia Borgo Elcais, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Geometria molecolare e VSEPR** (pianeta 58): 23 modelli.

- Specie (14): Gramiralia gravis, Cyathovenia gravis, Hexalura vulgaris, Myconotia litoralis, Cyathovessa rubra, Pterisiina gravis, Thamnopolia purpurea, Mycolaria aurea, Cyathosiria purpurea, Gramivessa purpurea, Dipotenia gravis, Hexapotia gravis, Pteroveria litoralis, Pterocoria gravis.
- Colonia Porto Lipa, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Forze intermolecolari** (pianeta 59): 33 modelli.

- Specie (18): Pterivessa litoralis, Graminenia purpurea, Hexalaria vulgaris, Medurassa pelagica, Calamocaria nigra, Pteririssa litoralis, Calamolara litoralis, Calamoconia litoralis, Dendrocotia purpurea, Pterimotia caerulea, Pterinolia vulgaris, Calamopolia litoralis, Gramipolia purpurea, Thamnopora alpestris, Medutenia pelagica, Ophirara vulgaris, Pteroralia litoralis, Pteronenia alpestris.
- Colonia Rada Pavadu, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Qemamo, popolo Qeti (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 15. Stati e soluzioni

**Gas e stato aeriforme** (pianeta 60): 36 modelli.

- Specie (21): Gramiditia viridis, Pteritessa litoralis, Dendrorania caerulea, Hexadilia vulgaris, Medulania pelagica, Calamoluina litoralis, Calamonessa litoralis, Pterilulia litoralis, Dendronelia viridis, Dendroditia caerulea, Pteriveria caerulea, Thamnolania alpestris, Gramilulia caerulea, Myconoina rubra, Ophiraella litoralis, Octoraella litoralis, Pterorissa alpestris, Octositia alpestris, Medunossa pelagica, Pteronotia alpestris, Pteromoella alpestris.
- Colonia Borgo Ismosol, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Talokmo, popolo Hatal (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Stati della materia e transizioni** (pianeta 61): 15 modelli.

- Specie (5): Pulvitassa caerulea, Medutelia glacialis, Gramicassa caerulea, Thamnotania glacialis, Mycolaella glacialis.
- Colonia Porto Duse, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Soluzioni e concentrazione** (pianeta 62): 10 modelli.

- Colonia Approdo Liisra, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Solubilità ed equilibrio eterogeneo** (pianeta 63): 17 modelli.

- Specie (8): Stylodiina caerulea, Pulvirassa caerulea, Hexalara vulgaris, Mycolulia rubra, Stylomoina caerulea, Mycolara aurea, Hexacora alpestris, Ophineella gravis.
- Colonia Approdo Elmo, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

### 16. Reazioni e quantità

**Stechiometria e reagente limitante** (pianeta 64): 34 modelli.

- Specie (20): Dendromossa aurea, Pterilura aurea, Gramiriella rubra, Pteronetia alpestris, Hexapossa vulgaris, Calamoriina litoralis, Dendrovelia campestris, Mycosinia levis, Pterilussa rubra, Pteritassa rubra, Calamocaella litoralis, Thamnocoria rubra, Crustiporia rubra, Pteridinia levis, Lycoraina alpestris, Medutaina pelagica, Saltoraina levis, Octotetia levis, Saltodilia levis, Medunetia pelagica.
- Colonia Rada Ispaver, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Talenma, popolo Urno (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Resa e bilanci di materia** (pianeta 65): 10 modelli.

- Specie (1): Crustitatia campestris.
- Colonia Base Moli, avamposto sigillato (9 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Termochimica e calorimetria** (pianeta 66): 37 modelli.

- Specie (22): Dendrocania rubra, Gramiveina rubra, Pterilania litoralis, Hexalania vulgaris, Pteroluina alpestris, Pecusira campestris, Dendrolalia purpurea, Thamnovelia rubra, Thamnovenia campestris, Pterilaella alpestris, Gramicaria alpestris, Mycolalia vulgaris, Dendrolaria rubra, Dendrotara campestris, Gramisilia campestris, Thamnolara alpestris, Pecupora campestris, Octononia litoralis, Lycorinia ferox, Pecunonia alpestris, Ophiteria vulgaris, Pecurinia campestris.
- Colonia Base Seto, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Maruha, popolo Mook (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 17. Velocità ed equilibrio

**Velocità di reazione** (pianeta 67): 10 modelli.

- Colonia Base Vadu, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Temperatura e attivazione** (pianeta 68): 15 modelli.

- Specie (8): Crustiraella caerulea, Stylolaina caerulea, Hexatenia vulgaris, Crustinera alpestris, Pulvimoria caerulea, Thamnovessa vulgaris, Crustipoina caerulea, Ophitassa gravis.
- Colonia Approdo Elraar, città adattata (7 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serre industriali, depositi di container, antenne per lo spazio profondo.

**Equilibrio chimico** (pianeta 69): 33 modelli.

- Specie (20): Pterinelia litoralis, Dendrocara caerulea, Gramilunia campestris, Pterolatia alpestris, Meduvelia pelagica, Hexarania vulgaris, Gramipoina caerulea, Crusticaella alpestris, Dendrotalia caerulea, Gramipotia alpestris, Pteritelia caerulea, Gramisinia caerulea, Crustilara caerulea, Dendrosira campestris, Thamnoponia caerulea, Octonotia ferox, Saltocatia vulgaris, Octodissa ferox, Ophirissa litoralis, Medulara pelagica.
- Colonia Borgo Lomo, insediamento simbiotico (7 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia.
- Villaggio di Shamolu, popolo Moma (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Perturbazioni dell’equilibrio** (pianeta 70): 20 modelli.

- Specie (12): Cyathoraria caerulea, Pterineria caerulea, Pterocaria alpestris, Hexavera vulgaris, Gramiponia viridis, Gramirassa caerulea, Crustisinia alpestris, Cyatholara thermalis, Cyathoveella caerulea, Crustidinia vulgaris, Pterotelia alpestris, Hexateina campestris.
- Colonia Rada Orael, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, piattaforme di atterraggio, antenne per lo spazio profondo.

### 18. Acidi, redox e carbonio

**Acidi, basi e pH** (pianeta 71): 22 modelli.

- Specie (14): Cyathoneria thermalis, Gramidiina campestris, Hexalunia vulgaris, Cyathoponia viridis, Cyathotaria thermalis, Crustirania viridis, Gramidiella campestris, Cyathoditia thermalis, Pteripoella caerulea, Hexapodiria campestris, Pterocaina litoralis, Ophirira ferox, Pteromotia alpestris, Ophiraria vulgaris.
- Colonia Approdo Riverar, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Soluzioni tampone** (pianeta 72): 11 modelli.

- Colonia Nuova Paten, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Ossidazione, riduzione ed elettrochimica** (pianeta 73): 38 modelli.

- Specie (23): Gramimoria caerulea, Dendrorissa caerulea, Pterimolia gravis, Pteroveella alpestris, Pecuvera gravis, Hexatera gravis, Pulvisitia caerulea, Dendronessa caerulea, Dendrotera campestris, Graminolia caerulea, Thamnotatia caerulea, Gramiraina gravis, Pulvineella vulgaris, Ptericotia gravis, Dendroluria alpestris, Calamositia caerulea, Hexatalia alpestris, Pterosilia gravis, Pteroneria gravis, Pecucassa gravis, Pecusitia campestris, Hexadinia alpestris, Octonelia alpestris.
- Colonia Base Vaten, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Kashama, popolo Moqe (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Chimica organica e scheletri carboniosi** (pianeta 74): 21 modelli.

- Specie (9): Crustinessa caerulea, Pulvicoina glacialis, Gramitaella caerulea, Thamnomonia caerulea, Thamnodiria caerulea, Pulvilulia caerulea, Hexalulia glacialis, Saltolutia glacialis, Saltonoina glacialis.
- Colonia Base Moismo, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Polimeri e materiali** (pianeta 75): 34 modelli.

- Specie (19): Gramicaina caerulea, Pterivenia litoralis, Dendroraella caerulea, Pteroneella alpestris, Meduriina pelagica, Hexalalia vulgaris, Crustitessa caerulea, Crustinoria campestris, Calamoratia viridis, Mycosira litoralis, Calamomolia litoralis, Calamorira caerulea, Crustimotia viridis, Dendrodiella viridis, Lycosiria ferox, Ophilaella vulgaris, Saltonotia vulgaris, Meduriella pelagica, Saltoraella campestris.
- Colonia Approdo Sepato, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Okluru, popolo Urok (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 19. La vita e la cellula

**Che cos'è la vita** (pianeta 76): 23 modelli.

- Specie (12): Crustitaella glacialis, Pulvisiella purpurea, Hexanora glacialis, Pulvicora glacialis, Thamnorania rubra, Pulvitaina purpurea, Gramineina glacialis, Pulvitelia rubra, Crustiteria glacialis, Saltosiina glacialis, Saltovenia glacialis, Hexapoteria glacialis.
- Colonia Base Motova, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Cellule, scala e superficie** (pianeta 77): 19 modelli.

- Specie (10): Stylovetia rubra, Crustimolia campestris, Hexacoella vulgaris, Thamnonelia rubra, Crustitetia nigra, Thamnoriella purpurea, Pulvimoella vulgaris, Octomossa ferox, Ophidira gravis, Hexamomora gravis.
- Colonia Approdo Elelora, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Membrane e protocellule** (pianeta 78): 22 modelli.

- Specie (12): Graminetia levis, Pterinenia litoralis, Hexaluria vulgaris, Cyathonoella levis, Ptericoella rubra, Thamnocalia rubra, Pterinora levis, Crustitania campestris, Crusticonia campestris, Pteririnia levis, Pteronoria levis, Ophilania levis.
- Colonia Porto Cacali, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

### 20. Molecole dal cosmo

**Elementi e molecole della vita nello spazio** (pianeta 79): 19 modelli.

- Specie (11): Crustitaria nigra, Pulvilaella glacialis, Hexaluina glacialis, Meducatia glacialis, Gramivenia rubra, Pulvipoella purpurea, Mycomolia glacialis, Crustirassa glacialis, Graminessa glacialis, Lycomolia ferox, Ophilaina glacialis.
- Colonia Porto Verdumar, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, antenne per lo spazio profondo.

**Meteoriti, comete e campioni di asteroidi** (pianeta 80): 37 modelli.

- Specie (22): Dendronoina purpurea, Pterisira levis, Graminossa purpurea, Peculunia campestris, Hexavetia levis, Pterotaina alpestris, Dendroporia alpestris, Myconeella rubra, Mycolura litoralis, Gramirania purpurea, Dendrosiria campestris, Gramilunoina campestris, Ptericora levis, Dendroponia purpurea, Mycocossa rubra, Calamorinia nigra, Pecunoella alpestris, Pecutessa levis, Lycodilia levis, Hexamonia campestris, Dipoveella ferox, Pecuraina levis.
- Colonia Porto Molo, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Lutalok, popolo Okma (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Chiralità e omochiralità** (pianeta 81): 11 modelli.

- Colonia Base Vapais, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 21. Chimica prebiotica

**Miller-Urey e la sintesi prebiotica** (pianeta 82): 23 modelli.

- Specie (12): Crustilura caerulea, Pulvidira caerulea, Hexamora glacialis, Gramiriina glacialis, Pulvipolia glacialis, Mycoraina pallida, Crustiluella caerulea, Crusticania glacialis, Gramiluina glacialis, Lycomossa glacialis, Saltosira glacialis, Hexataina glacialis.
- Colonia Nuova Oraveris, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Energia, enzimi e catalisi** (pianeta 83): 17 modelli.

- Specie (9): Crustimora viridis, Stylonetia caerulea, Hexanonia vulgaris, Pulvidiina caerulea, Stylocatia viridis, Styloraina campestris, Stylosilia viridis, Hexateella vulgaris, Saltopora vulgaris.
- Colonia Nuova Verduis, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Sorgenti idrotermali e metabolismo primordiale** (pianeta 84): 37 modelli.

- Specie (22): Dendrocossa caerulea, Pteripossa viridis, Gramipoella campestris, Pecusissa campestris, Hexacoina vulgaris, Pteropotia alpestris, Pteriluina viridis, Dendronenia litoralis, Thamnoriria campestris, Pulvitara alpestris, Dendroveina viridis, Thamnosiina viridis, Gramisiina campestris, Pulvicara caerulea, Mycolaina alpestris, Dendrotenia caerulea, Octotera alpestris, Pterovessa litoralis, Hexanoina alpestris, Hexasimossa alpestris, Hexalutetia vulgaris, Saltolassa campestris.
- Colonia Nuova Isora, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Urtalha, popolo Noka (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 22. Informazione e replicatori

**Il mondo a RNA** (pianeta 85): 15 modelli.

- Specie (3): Stylodiria viridis, Pulvipotia viridis, Stylolalia gravis.
- Colonia Approdo Verarri, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**DNA, codice genetico ed espressione** (pianeta 86): 19 modelli.

- Specie (11): Pulvicaria viridis, Crustineria glacialis, Hexalatia glacialis, Mycocoina glacialis, Pulvicalia glacialis, Pulvicolia viridis, Mycolussa aurea, Gramisiella glacialis, Saltonora glacialis, Lycotaella ferox, Saltocoina glacialis.
- Colonia Base Tenmar, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, piattaforme di atterraggio, antenne per lo spazio profondo.

**Mutazioni e soglia d'errore** (pianeta 87): 12 modelli.

- Colonia Approdo Verrase, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 23. Evoluzione e albero della vita

**Ereditarietà e selezione naturale** (pianeta 88): 23 modelli.

- Specie (13): Pulvitalia rubra, Crustidira glacialis, Medunoria glacialis, Hexapolia glacialis, Crusticossa glacialis, Pulvilura rubra, Gramirinia glacialis, Crustinenia glacialis, Thamnolatia rubra, Pulvilassa glacialis, Saltoponia glacialis, Saltolulia glacialis, Hexasinessa ferox.
- Colonia Base Rasol, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Deriva genetica** (pianeta 89): 15 modelli.

- Specie (3): Pulviraella gravis, Crustidilia rubra, Pulvitaria gravis.
- Colonia Borgo Pato, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**L'albero universale e LUCA** (pianeta 90): 33 modelli.

- Specie (18): Gramitenia rubra, Dendrovetia rubra, Ptericara litoralis, Hexalassa vulgaris, Pteroteella alpestris, Mycoriina viridis, Thamnosilia vulgaris, Dendroveella rubra, Dendrolassa rubra, Crustilaella aurea, Mycovetia aurea, Mycocaina litoralis, Dendrolunia litoralis, Pteronossa litoralis, Pterotassa alpestris, Pteronera litoralis, Octonossa alpestris, Saltomotia campestris.
- Colonia Rada Marne, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Tishamo, popolo Maru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Le prime tracce della vita e il tempo geologico** (pianeta 91): 19 modelli.

- Specie (11): Cyatholura thermalis, Pteriponia rubra, Pterositia alpestris, Cyathomoina rubra, Cyathomotia thermalis, Cyathoritia thermalis, Thamnotaria campestris, Cyathonessa rubra, Mycorara aurea, Pterovenia litoralis, Hexanetalia vulgaris.
- Colonia Rada Ripa, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Ossigeno, endosimbiosi e cellule complesse** (pianeta 92): 12 modelli.

- Colonia Approdo Vaverlo, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 24. Vita ai limiti

**Estremofili** (pianeta 93): 18 modelli.

- Specie (7): Pulvinora rubra, Pulvitania aurea, Thamnoporia glacialis, Pulviluella glacialis, Pulvicaella aurea, Ophinossa glacialis, Saltoteria glacialis.
- Colonia Base Vara, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Respirazione, fermentazione e chemiosintesi** (pianeta 94): 16 modelli.

- Specie (8): Crustivenia aurea, Stylocora aurea, Hexadissa vulgaris, Thamnoveria alpestris, Thamnopoina alpestris, Stylodilia alpestris, Stylocossa aurea, Hexaranelia alpestris.
- Colonia Nuova Nelo, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, antenne per lo spazio profondo.

**Fotosintesi e luce di altre stelle** (pianeta 95): 23 modelli.

- Specie (13): Gramineella aurea, Pteriteina levis, Pteronora alpestris, Cyathonoria aurea, Pterineella rubra, Mycotassa levis, Gramimovelia campestris, Thamnocossa alpestris, Crustinolia aurea, Pteroneina levis, Dipolutia ferox, Hexacosinia levis, Ophinera vulgaris.
- Colonia Borgo Vermarlo, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Crescita delle popolazioni microbiche** (pianeta 96): 11 modelli.

- Colonia Base Movapa, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

### 25. Pianeti abitabili

**La zona abitabile** (pianeta 97): 14 modelli.

- Specie (4): Pulvidissa vulgaris, Mycopotia rubra, Pulvinotia caerulea, Styloconia caerulea.
- Colonia Rada Vaorari, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Atmosfere, effetto serra e clima** (pianeta 98): 18 modelli.

- Specie (6): Pulviditia glacialis, Meduraina glacialis, Crusticara glacialis, Mycoluria aurea, Pulviriria glacialis, Pulvicatia glacialis.
- Colonia Porto Pais, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Abitabilità attorno alle nane rosse** (pianeta 99): 11 modelli.

- Colonia Nuova Mose, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Biosfera, albedo e Daisyworld** (pianeta 100): 36 modelli.

- Specie (21): Pterirania levis, Dendromoria alpestris, Gramitaina caerulea, Pecuveria levis, Hexaratia levis, Pterolutia levis, Dendrotessa caerulea, Myconossa aurea, Mycotatia aurea, Pulvineria vulgaris, Gramilara litoralis, Thamnorassa caerulea, Calamopossa caerulea, Mycoritia alpestris, Dendromonia levis, Mycocoella levis, Octosissa ferox, Pterocoina levis, Ophivetia ferox, Pecunora campestris, Pterolassa levis.
- Colonia Approdo Toca, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Hamoya, popolo Urqe (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 26. Mondi del sistema solare

**Marte: acqua e abitabilità passata** (pianeta 101): 10 modelli.

- Specie (1): Crustidiria campestris.
- Colonia Nuova Ridu, avamposto sigillato (9 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, piattaforme di atterraggio, antenne per lo spazio profondo.

**Cercare la vita su Marte** (pianeta 102): 11 modelli.

- Colonia Nuova Raello, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Europa e gli oceani sotto il ghiaccio** (pianeta 103): 21 modelli.

- Specie (11): Pulvineina viridis, Crustisiria glacialis, Hexamoella glacialis, Medumoella glacialis, Thamnosiria viridis, Gramirinotia glacialis, Thamnotaella viridis, Mycolania aurea, Thamnocaria viridis, Medusilia glacialis, Hexanocatia ferox.
- Colonia Borgo Verli, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Encelado e i suoi pennacchi** (pianeta 104): 33 modelli.

- Specie (20): Gramicoella viridis, Dendrotassa viridis, Medutaella pelagica, Hexateria levis, Pteriluella viridis, Pteridissa levis, Crustinonia viridis, Crusticora viridis, Thamnotenia levis, Dendrodinia viridis, Thamnolaella campestris, Crustisiella campestris, Mycocaria viridis, Pterisissa litoralis, Medusiria pelagica, Octocossa levis, Saltomonia levis, Pteroraella ferox, Medunotia pelagica, Meduponia pelagica.
- Colonia Nuova Movermo, insediamento simbiotico (7 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia.
- Villaggio di Noqemo, popolo Yazi (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Titano, la chimica senza acqua** (pianeta 105): 38 modelli.

- Specie (23): Dendronotia gravis, Pterinoina viridis, Gramidilia viridis, Hexanotia vulgaris, Pecucoina campestris, Pteropora gravis, Gramilupolia alpestris, Gramicara litoralis, Dendrotaria viridis, Thamnopotia campestris, Mycoteella rubra, Pulvitera alpestris, Dendrosissa viridis, Thamnodissa alpestris, Pulvimossa viridis, Thamnolutia gravis, Pteromolia ferox, Hexalucatia campestris, Saltonelia gravis, Lycomoina gravis, Hexaracaria gravis, Hexanodiina vulgaris, Pecuteella gravis.
- Colonia Porto Sollidu, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Shaqeok, popolo Ruha (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 27. Cercare la vita nella galassia

**Scoprire gli esopianeti** (pianeta 106): 20 modelli.

- Specie (12): Cyathoteina thermalis, Pterivetia campestris, Hexasiria vulgaris, Pteronoina alpestris, Thamnotelia purpurea, Crusticolia campestris, Thamnocolia purpurea, Crustiraina nigra, Crustisitia campestris, Thamnorissa vulgaris, Hexacanotia campestris, Hexalucaina alpestris.
- Colonia Nuova Lira, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, antenne per lo spazio profondo.

**Atmosfere degli esopianeti e JWST** (pianeta 107): 35 modelli.

- Specie (20): Dendroconia gravis, Gramimoina purpurea, Pterivera purpurea, Meducaina pelagica, Hexalaella vulgaris, Crustineina gravis, Calamomossa nigra, Dendroneria purpurea, Dendroneina purpurea, Dendrodilia campestris, Thamnositia alpestris, Dendrocolania purpurea, Calamocoina litoralis, Dendrocaria purpurea, Hexaluporia gravis, Medunenia gravis, Hexacatetia ferox, Saltoconia gravis, Medululia pelagica, Lycosissa ferox.
- Colonia Approdo Moliri, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Okokqe, popolo Tital (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Biofirme e falsi positivi** (pianeta 108): 30 modelli.

- Specie (20): Dendroraria alpestris, Graminotia rubra, Pteriratia litoralis, Hexasinia vulgaris, Pecuponia campestris, Gramiporira purpurea, Mycoveina aurea, Pterilaria purpurea, Thamnoveina vulgaris, Dendrovenia purpurea, Mycocara alpestris, Thamnolunia rubra, Mycomoina rubra, Dendrocoria purpurea, Octomoria alpestris, Diponoella vulgaris, Pecusinia alpestris, Hexalucotia campestris, Hexaponora campestris, Hexanolura vulgaris.
- Colonia Nuova Tooraora, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, antenne per lo spazio profondo.

**Panspermia e protezione planetaria** (pianeta 109): 15 modelli.

- Specie (3): Crustipolia nigra, Styloveria rubra, Mycoraria rubra.
- Colonia Approdo Marca, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Tecnofirme, SETI ed equazione di Drake** (pianeta 110): 12 modelli.

- Colonia Borgo Paver, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 28. Luce e telescopi

**Onde elettromagnetiche e pressione della luce** (pianeta 111): 29 modelli.

- Specie (21): Pteriditia caerulea, Gramivera caerulea, Dendrononia caerulea, Hexaritia vulgaris, Pecucania campestris, Mycodissa aurea, Mycocalia viridis, Mycoditia levis, Pulvivelia vulgaris, Pterinonia alpestris, Mycoveella aurea, Ptericaella caerulea, Thamnonoina levis, Dendrocoella caerulea, Pulviratia levis, Ophicaella ferox, Dipovelia levis, Ophidiria litoralis, Hexaveditia levis, Hexacalara levis, Pecumotia levis.
- Colonia Nuova Toelva, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Specchi, lenti e telescopi** (pianeta 112): 30 modelli.

- Specie (16): Pteriveella caerulea, Gramisira caerulea, Dendrosiella alpestris, Hexamossa vulgaris, Pterotaria alpestris, Calamotatia caerulea, Pteriraria caerulea, Calamonoella litoralis, Thamnorinia caerulea, Dendroponeella caerulea, Crusticotia vulgaris, Calamosinia litoralis, Calamoraria litoralis, Lycocolia ferox, Medusissa pelagica, Hexaluralia alpestris.
- Colonia Rada Solsol, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, piattaforme a foglia, antenne ramificate.
- Villaggio di Maokok, popolo Okur (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Interferenza e interferometri** (pianeta 113): 13 modelli.

- Specie (1): Crustiponia campestris.
- Colonia Borgo Casolis, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Diffrazione e potere risolutivo** (pianeta 114): 10 modelli.

- Colonia Base Valois, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Radiazione termica e luce delle stelle** (pianeta 115): 17 modelli.

- Specie (6): Pulvilussa viridis, Thamnodira glacialis, Pulvirissa glacialis, Crustiriina glacialis, Thamnolulia caerulea, Mycotaria glacialis.
- Colonia Borgo Isne, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

### 29. Campi e plasmi nello spazio

**Legge di Gauss: gusci, pianeti e condensatori** (pianeta 116): 36 modelli.

- Specie (22): Pteritania litoralis, Gramilatia rubra, Dendroteria aurea, Pecuporia campestris, Pterosinia alpestris, Hexasilia vulgaris, Graminonia campestris, Mycomoria alpestris, Thamnonolia rubra, Pulvitatia vulgaris, Gramitassa aurea, Dendrovecoina rubra, Mycopora aurea, Dendronetia campestris, Mycomora litoralis, Calamodilia rubra, Saltodiina campestris, Ophimoina vulgaris, Pecumoella campestris, Ophinoria litoralis, Pterotessa litoralis, Hexateraella ferox.
- Colonia Borgo Semo, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Enziok, popolo Ziok (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Particelle cariche nei campi magnetici** (pianeta 117): 33 modelli.

- Specie (18): Dendropora alpestris, Pteritaella rubra, Gramicaella campestris, Hexacalia vulgaris, Pterocania alpestris, Crustipotia vulgaris, Mycovenia litoralis, Pterisiella alpestris, Dendrosiina litoralis, Dendrotasira alpestris, Dendroteella rubra, Dendromotia rubra, Calamocotia litoralis, Medusitia pelagica, Octolura alpestris, Medumonia pelagica, Lycocania ferox, Meducania pelagica.
- Colonia Base Loto, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Maurlu, popolo Okti (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Correnti, dipoli e dinamo dei pianeti** (pianeta 118): 16 modelli.

- Specie (5): Stylomossa rubra, Pulvicaina rubra, Hexatania vulgaris, Styloriella rubra, Thamnosiella campestris.
- Colonia Borgo Paar, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Induzione, circuiti oscillanti e radio** (pianeta 119): 12 modelli.

- Colonia Rada Ellois, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Equazioni di Maxwell e magnetismo della materia** (pianeta 120): 19 modelli.

- Specie (10): Crustirinia rubra, Pulvirara rubra, Hexacotia glacialis, Meduneria glacialis, Mycotaella aurea, Pulvicoella glacialis, Thamnomoria glacialis, Crustilatia glacialis, Medumotia glacialis, Hexavecora glacialis.
- Colonia Approdo Toarlo, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

### 30. Dalla relatività al Big Bang

**Relatività ristretta** (pianeta 121): 31 modelli.

- Specie (18): Ptericaina litoralis, Gramimora campestris, Dendropoella aurea, Pteroteria alpestris, Hexatessa vulgaris, Thamnonotia vulgaris, Calamodiina viridis, Gramidineria alpestris, Mycovelia rubra, Mycocoria aurea, Gramiluneina alpestris, Pteripotia vulgaris, Gramineraria campestris, Pulvisinia aurea, Pulvivera aurea, Diporiina campestris, Hexadilatia vulgaris, Saltolaella campestris.
- Colonia Nuova Ravadu, insediamento simbiotico (7 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, antenne ramificate.
- Villaggio di Matilu, popolo Mamo (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Onde di materia, atomi e righe spettrali** (pianeta 122): 19 modelli.

- Specie (10): Crustiveella viridis, Pulvisira viridis, Hexaneria glacialis, Meduteina glacialis, Crustiriella viridis, Gramitania viridis, Crustitelia glacialis, Thamnoriveella glacialis, Hexavecolia glacialis, Hexacatessa glacialis.
- Colonia Porto Sepa, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Nuclei, decadimenti e datazioni** (pianeta 123): 15 modelli.

- Specie (5): Pulviluina rubra, Crustinora aurea, Hexasiina vulgaris, Crustiratia gravis, Saltoteina vulgaris.
- Colonia Porto Ararel, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Energia dal nucleo: fusione nelle stelle** (pianeta 124): 23 modelli.

- Specie (14): Graminoria campestris, Cyatholuella aurea, Pteromoina alpestris, Hexanoria vulgaris, Thamnoralia aurea, Cyathorara thermalis, Mycoconia campestris, Crustinelia alpestris, Gramicotania campestris, Mycoporia vulgaris, Mycoramossa campestris, Diponora ferox, Ophipossa campestris, Pterorinia alpestris.
- Colonia Base Versol, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Particelle, espansione e Big Bang** (pianeta 125): 33 modelli.

- Specie (18): Pterirara rubra, Gramilalia aurea, Dendropotia rubra, Hexanetia vulgaris, Pterodiella levis, Calamonotia levis, Calamotaria levis, Mycotania aurea, Crustitera alpestris, Calamocoria levis, Calamocatia rubra, Mycopossa rubra, Dendromoella levis, Dendronoteria litoralis, Hexadirania vulgaris, Pterosira ferox, Pteromossa alpestris, Ophidinia vulgaris.
- Colonia Rada Oratenca, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Nourtal, popolo Moru (5 edifici): capanne, case lunghe, granai, focolari, totem.
