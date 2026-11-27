# Catalogo dei modelli dei mondi

Questo file elenca i 3430 modelli dei mondi vivi: 1950 specie, 1201 edifici delle colonie, 200 edifici dei villaggi, 40 popoli nativi, 36 coloni e 3 rover. Con i 997 modelli delle stazioni e delle navi (`docs/CATALOGO.md`) il catalogo 3D del sito ne mostra 4427. Il file è generato dal codice con `node scripts/catalogo-mondi.mjs`, che costruisce le superfici dei 125 pianeti e scrive anche l'indice `content/worlds/modelli.json`; `tests/mondi.test.mjs` controlla che entrambi corrispondano al codice. Nel sito i modelli si guardano nel catalogo 3D, con i gruppi «Specie», «Edifici» e «Abitanti e rover»; triangoli e tempi di costruzione sono in `docs/PRESTAZIONI_MONDI.md`.

## Riepilogo

| Genere | Modelli |
|---|---:|
| Specie | 1950 |
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

**Linguaggio e ragionamento matematico** (pianeta 1): 28 modelli.

- Specie (15): Pulvivessa glacialis, Crustilaria rubra, Medutassa glacialis, Pulvimolia glacialis, Thamnoconia rubra, Mycodiina pallida, Graminora glacialis, Ophicatia glacialis, Medumora glacialis, Medusinia glacialis, Cyathocara fontinalis, Crustilaina cryophila, Pulvinoria nivalis, Pulvinessa morenica, Crusticarassa cryoconica.
- Colonia Borgo Elne, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 1; Colono con lo zaino, respiratore, carnagione 2; Colono bambino, respiratore, carnagione 3; Rover della città adattata.

**Ragionamento, conteggio e infinito** (pianeta 14): 41 modelli.

- Specie (26): Pteriraina rubra, Gramiriria gravis, Hexanessa gravis, Pterocara alpestris, Calamonossa litoralis, Calamotassa rubra, Crustimonia campestris, Dendroriina campestris, Gramicora alpestris, Thamnotara campestris, Dendroritia rubra, Thamnocaina gravis, Gramirissa gravis, Pterocassa litoralis, Pterolaella ferox, Hexacolia gravis, Pterodissa ferox, Medumoria gravis, Medupoina gravis, Octocatia insularis, Pterotaella anularis, Octosinia lagunaris, Pterotara rupicola, Gramicanenia halophila, Thamnomoella arenaria, Pterilatia montana.
- Colonia Base Casol, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Lurumo, popolo Yaru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Esistenza, unicità e approssimazione** (pianeta 13): 18 modelli.

- Specie (8): Pulvicossa vulgaris, Crustidissa nigra, Hexavenia vulgaris, Crustinetia vulgaris, Hexacaporia tabularis, Hexanelura salinaria, Hexatelutia eolica, Hexaconelia saxicola.
- Colonia Approdo Verse, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Radici, campi e nuovi sistemi numerici** (pianeta 18): 41 modelli.

- Specie (27): Gramitatia gravis, Dendronora alpestris, Pteritara aurea, Pterocaella gravis, Pecutetia gravis, Hexacania vulgaris, Mycosiella aurea, Thamnoveella rubra, Thamnoratia gravis, Calamorilia rubra, Mycoluella rubra, Calamotenia aurea, Pterimossa rubra, Calamovetia rubra, Pteritatia gravis, Lyconoria ferox, Hexadiria ferox, Ophidiina litoralis, Saltosissa campestris, Pecudiria alpestris, Saltolaina pratensis, Pteriritia scalaris, Thamnorilia ericina, Pteririlia palustris, Crustidilalia argillicola, Hexataritia saxatilis, Stylopoina tabularis.
- Colonia Base Vasene, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, antenne ramificate.
- Villaggio di Lunolu, popolo Moru (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 2. Algebra ed equazioni

**Algebra** (pianeta 2): 45 modelli.

- Specie (26): Gramimotia aurea, Pteriralia litoralis, Dendrocalia alpestris, Pterolulia alpestris, Meduditia pelagica, Hexamotia vulgaris, Mycotessa vulgaris, Dendrorira litoralis, Gramineria litoralis, Thamnomora alpestris, Crustilulia viridis, Dendrocora campestris, Dendroriella campestris, Calamolaria litoralis, Octovera alpestris, Meduveria pelagica, Saltonoria campestris, Meducaella pelagica, Pteromoria litoralis, Myconeria silvatica, Octotatia saxatilis, Octoluria insularis, Pterocalia fiordica, Calamoteria lagunaris, Octolutia rupicola, Hexaporiella montana.
- Colonia Porto Arcaora, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Shanomo, popolo Hama (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 2; Colono con lo zaino, abiti leggeri, carnagione 3; Colono bambino, abiti leggeri, carnagione 4; Rover dell’insediamento simbiotico.

**Radicali** (pianeta 3): 26 modelli.

- Specie (10): Pulvimoina aurea, Pulviveella vulgaris, Stylonoella campestris, Crustirissa saxatilis, Stylolutia arenicola, Pulvirilia lapidicola, Pterirassa rupestris, Crustivera salinaria, Pulvivetia saxicola, Crusticalia craterica.
- Colonia Approdo Solralo, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 3; Colono con lo zaino, tuta pressurizzata, carnagione 4; Colono bambino, tuta pressurizzata, carnagione 1; Rover dell’avamposto sigillato.

**Equazioni e sistemi** (pianeta 4): 30 modelli.

- Specie (18): Cyatholaella gravis, Ptericonia viridis, Hexadira gravis, Pteroriria gravis, Ptericossa viridis, Ptericalia viridis, Cyathosilia viridis, Thamnotalia gravis, Pteripolia aurea, Cyatholuina thermalis, Dipotalia ferox, Ophirassa gravis, Crustiveina lavicola, Ptericassa calderina, Hexacalassa cinerea, Crustisilalia sulphurea, Octocassa basaltica, Dendrorapossa pyrophila.
- Colonia Approdo Oraliten, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 4; Colono con lo zaino, respiratore, carnagione 1; Colono bambino, respiratore, carnagione 2.

**Disequazioni** (pianeta 5): 26 modelli.

- Specie (12): Crustiraria aurea, Gramimolia aurea, Graminoina glacialis, Mycocassa glacialis, Saltopoella glacialis, Saltotalia glacialis, Hexadivera glacicola, Hexamoriina fontinalis, Crustisiina cryophila, Hexapolulia nivalis, Hexanerara morenica, Crustilunia cryoconica.
- Colonia Nuova Arrili, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 1; Colono con lo zaino, tuta pressurizzata, carnagione 2; Colono bambino, tuta pressurizzata, carnagione 3.

**Dagli zeri alla struttura di un polinomio** (pianeta 12): 41 modelli.

- Specie (27): Pterineina gravis, Dendrositia aurea, Gramicatia aurea, Hexapoella vulgaris, Pecumoina gravis, Pterolussa gravis, Thamnoneria aurea, Dendronoria aurea, Pulvilalia gravis, Thamnodilia aurea, Calamotalia aurea, Gramitessa aurea, Calamoneina gravis, Dendrotetia viridis, Mycodilia rubra, Thamnoneina gravis, Pterorania ferox, Lycocaella gravis, Pecunossa gravis, Hexalaina campestris, Pecusiria gravis, Hexaporia alpestris, Hexaponeella collina, Saltomoella scalaris, Calamocalia palustris, Hexaverania argillicola, Hexaranora saxatilis.
- Colonia Porto Lone, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, piattaforme a foglia, antenne ramificate.
- Villaggio di Enzilu, popolo Nono (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Complessi, aritmetica e polinomi** (pianeta 16): 14 modelli.

- Colonia Rada Nemo, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 4; Colono con lo zaino, tuta pressurizzata, carnagione 1; Colono bambino, tuta pressurizzata, carnagione 2.

### 3. Funzioni e variazione

**Funzioni** (pianeta 8): 44 modelli.

- Specie (26): Gramirara rubra, Pterilassa litoralis, Dendrocassa rubra, Pecucalia gravis, Pterocossa alpestris, Hexaneina gravis, Dendrotelia rubra, Dendronera rubra, Thamnovera rubra, Pteripora rubra, Mycotara alpestris, Thamnoditia rubra, Thamnotaina campestris, Mycopolia aurea, Mycorilia rubra, Pecucaella gravis, Pecutatia gravis, Octosilia ferox, Pterocatia alpestris, Hexacossa vulgaris, Octopossa gravis, Dendroluella silvatica, Pterisiria palustris, Crustisivessa argillicola, Stylolania steppica, Thamnocania tabularis.
- Colonia Nuova Liva, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Talzien, popolo Yati (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 4; Colono con lo zaino, abiti leggeri, carnagione 1; Colono bambino, abiti leggeri, carnagione 2.

**Esponenziali e logaritmi** (pianeta 6): 23 modelli.

- Specie (10): Styloteria aurea, Thamnocassa alpestris, Thamnoluella vulgaris, Crusticassa rubra, Crustineella saxatilis, Crustivessa lapidicola, Pteritecassa rupestris, Crustimoella salinaria, Crustitassa saxicola, Pulviriina craterica.
- Colonia Rada Verra, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, tuta pressurizzata, carnagione 2; Colono con lo zaino, tuta pressurizzata, carnagione 3; Colono bambino, tuta pressurizzata, carnagione 4.

**Limiti, variazione e accumulazione** (pianeta 17): 27 modelli.

- Specie (18): Cyathoralia rubra, Gramicotia rubra, Pteroponia alpestris, Cyathocaria thermalis, Cyathovera rubra, Crustimoria levis, Myconelia rubra, Thamnotera alpestris, Cyathocaina purpurea, Hexacatia levis, Hexarassa levis, Octonora alpestris, Pulvirataria saxatilis, Cyathonoina vulcanica, Cyatholassa calderina, Hexapocoella cinerea, Crustiralia sulphurea, Octosiella basaltica.
- Colonia Approdo Marelver, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Iterazioni, stabilità e precisione numerica** (pianeta 21): 40 modelli.

- Specie (25): Pterimoella aurea, Dendropolia aurea, Graminoella aurea, Medutara pelagica, Hexanelia gravis, Pteriporia aurea, Mycodiella vulgaris, Mycodira gravis, Dendrodiina gravis, Thamnomossa rubra, Calamomora gravis, Calamolussa aurea, Thamnoteella gravis, Octotassa ferox, Ophineria gravis, Medulaella pelagica, Pterocora gravis, Hexadiina gravis, Pterolaina gravis, Mycotetia silvatica, Pulvicania saxatilis, Pterotetia insularis, Pterorara rupicola, Calamonelia halophila, Pteroconia montana.
- Colonia Approdo Oramar, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Ziyaya, popolo Urlu (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 4. Geometria e trasformazioni

**Geometria elementare** (pianeta 11): 12 modelli.

- Colonia Porto Line, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Geometria analitica** (pianeta 7): 43 modelli.

- Specie (25): Gramipossa viridis, Pterimoina litoralis, Dendrotania viridis, Pecupossa campestris, Hexanoella vulgaris, Pterosissa alpestris, Mycositia aurea, Pulviveria viridis, Mycotenia rubra, Thamnopoella viridis, Mycorira alpestris, Thamnomolia viridis, Mycomossa rubra, Pteririra viridis, Gramiporia viridis, Pteronessa litoralis, Dipovera vulgaris, Saltosiella vulgaris, Pteroluella litoralis, Pterotatia alpestris, Saltolunia vulgaris, Saltoporia pratensis, Octotaella palustris, Pulviteina argillicola, Stylorinia steppica.
- Colonia Rada Marmar, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Luziru, popolo Enlu (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 3; Colono con lo zaino, abiti leggeri, carnagione 4; Colono bambino, abiti leggeri, carnagione 1.

**Trigonometria** (pianeta 9): 42 modelli.

- Specie (24): Gramitera viridis, Dendrovessa viridis, Meduluella gravis, Pterovetia gravis, Hexaraina gravis, Pteritaina viridis, Crustiluria viridis, Calamoponia viridis, Crustipora viridis, Dendronoella campestris, Calamonenia gravis, Calamolalia viridis, Crustivelia campestris, Calamolaina litoralis, Saltodissa gravis, Ophicoria ferox, Pterorira gravis, Medurira pelagica, Hexacassa alpestris, Ophinonia silvatica, Pteropoina insularis, Gramipocoella lagunaris, Calamoneella halophila, Hexadiraella montana.
- Colonia Approdo Armopa, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Timama, popolo Talur (5 edifici): capanne, case lunghe, granai, focolari, totem.
- Prima comparsa: Colono adulto, abiti leggeri, carnagione 1; Colono con lo zaino, abiti leggeri, carnagione 2; Colono bambino, abiti leggeri, carnagione 3.

**Vettori, matrici, dati e vincoli** (pianeta 15): 21 modelli.

- Specie (10): Pulvipossa glacialis, Medunoina glacialis, Pulvimora glacialis, Pulvidilia glacialis, Gramicania viridis, Pulvinelia viridis, Crustinonossa cryophila, Pulviritia nivalis, Pulvilunia morenica, Crustimoina cryoconica.
- Colonia Nuova Ismar, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Geometrie, trasformazioni e simmetrie** (pianeta 19): 25 modelli.

- Specie (14): Crustitaina campestris, Pulvilara levis, Hexavelia levis, Crusticoina levis, Stylorilia levis, Stylotara viridis, Hexavessa levis, Saltocossa levis, Hexanoriella tabularis, Pulvinolia lapidicola, Pterilaina rupestris, Crustilutia salinaria, Crusticolara eolica, Crustidivelia saxicola.
- Colonia Base Tensolel, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 3; Colono con lo zaino, respiratore, carnagione 4; Colono bambino, respiratore, carnagione 1.

### 5. Probabilità e dati

**Combinatoria, probabilità e statistica** (pianeta 10): 41 modelli.

- Specie (26): Gramipora aurea, Ptericatia litoralis, Dendronolia aurea, Hexarinia vulgaris, Pteroratia alpestris, Meduratia pelagica, Pteriveina aurea, Dendroriria aurea, Crustitara campestris, Calamopoella litoralis, Crustinoina aurea, Mycorassa alpestris, Crustilussa campestris, Myconoria litoralis, Octonoina ferox, Meduveella pelagica, Meduvetia pelagica, Pteroritia litoralis, Lycomoella ferox, Mycomotia silvatica, Hexacararia saxatilis, Pteriluria anularis, Pterolara fiordica, Octorira lagunaris, Gramilussa halophila, Graminelia arenaria.
- Colonia Nuova Solismar, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Luqeok, popolo Talru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Probabilità, informazione e fenomeni collettivi** (pianeta 20): 16 modelli.

- Specie (7): Stylovelia viridis, Thamnosinia aurea, Stylocoina alpestris, Stylopora arenicola, Crustitamolia lapidicola, Crustipossa salinaria, Pulvilania craterica.
- Colonia Base Ranever, avamposto sigillato (9 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Reti, conservazione e strategie** (pianeta 23): 43 modelli.

- Specie (28): Ptericaria aurea, Dendroratia viridis, Gramiraria viridis, Pteropoella levis, Hexanera levis, Gramidira viridis, Dendrodissa levis, Pteridiella aurea, Thamnomotia vulgaris, Gramiteina litoralis, Mycotera levis, Thamnononia campestris, Calamonoina litoralis, Thamnodinia viridis, Dendromoina viridis, Pterocolia litoralis, Diponetia campestris, Lycocossa levis, Pterodinia alpestris, Ophitaria vulgaris, Pecupoina alpestris, Saltomoina pratensis, Dendroteconia collina, Diponolia silvatica, Thamnopossa ericina, Crustilaneella argillicola, Pecucora steppica, Hexacarissa tabularis.
- Colonia Nuova Momarse, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Luenlu, popolo Urlu (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 6. Matematica per le scienze

**Onde, frequenze e ricostruzione** (pianeta 22): 26 modelli.

- Specie (13): Pulvilatia vulgaris, Styloteella campestris, Hexatelia gravis, Thamnolaina campestris, Styloraria gravis, Thamnotessa viridis, Pulviriella viridis, Hexaditia gravis, Ophilussa arenicola, Pulviralia lapidicola, Thamnoneella rupestris, Hexatesitia salinaria, Hexapodiella eolica.
- Colonia Borgo Sese, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.
- Prima comparsa: Colono adulto, respiratore, carnagione 2; Colono con lo zaino, respiratore, carnagione 3; Colono bambino, respiratore, carnagione 4.

**Scala, energia, equilibrio e trasformazioni** (pianeta 24): 23 modelli.

- Specie (13): Crustinossa viridis, Medusira glacialis, Crusticoella glacialis, Crustipoella glacialis, Pulviluria viridis, Gramidinia viridis, Saltoluria glacialis, Medulatia glacialis, Octosira saxatilis, Crustilassa fontinalis, Ophiteella cryophila, Pulvinetia nivalis, Crustiriraria cryoconica.
- Colonia Nuova Vertomo, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, antenne per lo spazio profondo.

**Oscillazioni, molecole e quantizzazione** (pianeta 25): 39 modelli.

- Specie (24): Pterimora viridis, Dendroraina viridis, Hexaveria vulgaris, Meducoina pelagica, Pterolura alpestris, Crustiveria vulgaris, Mycomonia litoralis, Dendrolutia viridis, Mycocotia aurea, Gramitelia viridis, Calamocora viridis, Crustisissa viridis, Thamnodiina campestris, Dendrorara campestris, Pteridiria viridis, Pteronolia alpestris, Meduconia pelagica, Hexariria campestris, Lycolalia ferox, Hexaluella vulgaris, Calamorassa lagunaris, Octovetia halophila, Thamnonenia arenaria, Pterinetia montana.
- Colonia Porto Arlo, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Moqemo, popolo Halu (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 7. Misura e moto

**Misure, unità e incertezza** (pianeta 26): 12 modelli.

- Colonia Approdo Arse, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Vettori e sistemi di riferimento** (pianeta 27): 21 modelli.

- Specie (12): Stylocaria purpurea, Crustiritia nigra, Hexalutia vulgaris, Pulvinenia purpurea, Pulvisiina rubra, Pulvicotia rubra, Hexatetia alpestris, Hexalacassa lapidicola, Octoconia rupestris, Crustivenelia salinaria, Ophitatia eolica, Hexalusinia saxicola.
- Colonia Porto Raar, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Moto rettilineo uniforme** (pianeta 28): 25 modelli.

- Specie (15): Crusticaria nigra, Pulvirira glacialis, Meducoella glacialis, Hexatatia glacialis, Graminera purpurea, Pulvisissa glacialis, Pulvinoella glacialis, Thamnorira purpurea, Medunera glacialis, Medupolia glacialis, Crusticamossa fontinalis, Crustivetia cryophila, Saltoratia nivalis, Mycoteina tundrica, Crustiratera cryoconica.
- Colonia Borgo Isri, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Moto uniformemente accelerato** (pianeta 29): 42 modelli.

- Specie (27): Gramiritia campestris, Pteririina purpurea, Dendrotaella alpestris, Meduveina levis, Hexatara levis, Crustitalia nigra, Dendroralia levis, Dendrorinia purpurea, Pteritera alpestris, Mycoponia aurea, Calamovenia rubra, Pteripoina levis, Mycolassa aurea, Crusticoria campestris, Hexasissa campestris, Saltonolia vulgaris, Meduvenia levis, Ophidilia levis, Ophinoina levis, Medularia pelagica, Hexaponia vulgaris, Pterodilia insularis, Thamnolumora fiordica, Gramicolaina lagunaris, Pulvisiria rupicola, Gramiravenia halophila, Thamnosissa arenaria.
- Colonia Porto Neora, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Nokaru, popolo Malu (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Traiettorie e lanci** (pianeta 30): 44 modelli.

- Specie (29): Pterimoria litoralis, Dendropoina purpurea, Gramisiria purpurea, Hexaneella vulgaris, Peculussa campestris, Mycocolia rubra, Dendrosilia campestris, Gramilaina purpurea, Mycoraella rubra, Dendrocolia purpurea, Myconora vulgaris, Gramimossa purpurea, Gramiluria purpurea, Calamolunia litoralis, Mycoriella rubra, Pterotania alpestris, Dipopoina ferox, Pecurissa alpestris, Pteroluria litoralis, Dipocara vulgaris, Peculuella campestris, Hexaveella vulgaris, Ptericolia scalaris, Pteriteria silvatica, Hexavelulia ericina, Calamoveina palustris, Crustiritera argillicola, Styloluella steppica, Hexaporalia tabularis.
- Colonia Base Casene, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Okyaok, popolo Notal (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 8. Forze ed energia

**Forze e leggi di Newton** (pianeta 31): 22 modelli.

- Specie (11): Pulviconia rubra, Stylolara rubra, Hexacaria vulgaris, Pulvicassa vulgaris, Pulvisilia rubra, Hexararia vulgaris, Thamnolalia tabularis, Crusticarara lapidicola, Hexasilura salinaria, Crustinolalia eolica, Pulvitessa saxicola.
- Colonia Rada Liriva, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Attrito e vincoli** (pianeta 32): 28 modelli.

- Specie (18): Pterisinia purpurea, Gramirilia campestris, Hexaconia vulgaris, Pteronoella alpestris, Thamnoraella purpurea, Thamnolura vulgaris, Myconetia rubra, Myconolia rubra, Cyathoneella thermalis, Cyathodira purpurea, Hexataria ferox, Ophinora litoralis, Hexalussa vulgaris, Pteriteella vulcanica, Crustiriveella cinerea, Crustinediina sulphurea, Octotelia basaltica, Pterilalia pyrophila.
- Colonia Porto Vanedu, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Lavoro ed energia** (pianeta 33): 24 modelli.

- Specie (13): Pulvitaella purpurea, Myconenia aurea, Mycodinia rubra, Gramidissa glacialis, Crustirilia glacialis, Hexariina glacialis, Ophineina glacialis, Octotessa saxatilis, Hexacoriria glacicola, Ophimossa cryophila, Hexaluriria nivalis, Pulvilaina morenica, Crustipotera cryoconica.
- Colonia Approdo Necato, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Quantità di moto e urti** (pianeta 34): 39 modelli.

- Specie (24): Gramisissa purpurea, Pteriraella litoralis, Dendrolulia purpurea, Meduneina pelagica, Pterotalia gravis, Dendrolaina purpurea, Mycorinia gravis, Calamolura litoralis, Crustiluina nigra, Pterinoella caerulea, Calamoveella nigra, Thamnonora vulgaris, Calamorania nigra, Saltotetia campestris, Hexacaina vulgaris, Pterononia alpestris, Hexalumolia campestris, Octocania litoralis, Medurilia pelagica, Pulviveina saxatilis, Thamnoteria fiordica, Pulvivecoria rupicola, Calamoluria halophila, Hexanolaina montana.
- Colonia Porto Marra, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Hatalok, popolo Shama (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 9. Rotazioni e gravità

**Rotazione e momento d’inerzia** (pianeta 35): 26 modelli.

- Specie (15): Crustirira aurea, Pulvidinia viridis, Hexaveina vulgaris, Pulvitenia aurea, Thamnocara aurea, Thamnonoella viridis, Saltoriina campestris, Saltoriella vulgaris, Hexaterissa saxatilis, Thamnolaria tabularis, Crustiramonia lapidicola, Pteritalia rupestris, Hexalupolia salinaria, Crusticodiella eolica, Hexatanetia saxicola.
- Colonia Porto Marnene, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Momenti, leve ed equilibrio** (pianeta 36): 30 modelli.

- Specie (19): Gramiconia aurea, Pteririria viridis, Pteropossa levis, Ptericania aurea, Crustiteina aurea, Thamnoteina aurea, Cyatholutia aurea, Gramilutia aurea, Cyathonera levis, Ophipolia campestris, Pterodira campestris, Octoralia ferox, Hexapoina levis, Ophicania campestris, Pteritevenia vulcanica, Crusticodira lavicola, Crustinelania sulphurea, Pulvivenia basaltica, Dendrosilara pyrophila.
- Colonia Nuova Sollo, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Gravitazione** (pianeta 37): 41 modelli.

- Specie (26): Gramivelia aurea, Dendromora levis, Ptericoina aurea, Pterovera levis, Hexarara vulgaris, Gramiratia levis, Gramicoina aurea, Thamnoluria aurea, Gramicoria aurea, Gramirira levis, Myconoella levis, Dendrocaella alpestris, Dendroluina alpestris, Calamovera levis, Meducossa levis, Pteroriina levis, Octolunia litoralis, Pterodiina ferox, Saltotessa campestris, Pterovelia levis, Pteroraina litoralis, Thamnonecoina fiordica, Graminocoina lagunaris, Pterodiria rupicola, Gramisilatia halophila, Pterosiella montana.
- Colonia Nuova Marorari, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Yarulu, popolo Urha (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Orbite circolari** (pianeta 38): 12 modelli.

- Colonia Base Oraliten, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 10. Fluidi, oscillazioni e onde

**Fluidi e pressione** (pianeta 39): 40 modelli.

- Specie (25): Gramisitia viridis, Dendrolussa viridis, Pteritenia viridis, Pteroteina alpestris, Pecurilia campestris, Thamnocotia alpestris, Calamoluella viridis, Calamomoella litoralis, Dendrocoina campestris, Gramitara alpestris, Dendropossa litoralis, Calamoriella viridis, Pulvimonia viridis, Gramiraella alpestris, Dipodira campestris, Pteroveina litoralis, Pteronelia alpestris, Hexamocolia vulgaris, Pecunera alpestris, Ophiratia vulgaris, Dendronesinia collina, Saltocaina scalaris, Mycotaina silvatica, Calamomoina palustris, Saltonossa steppica.
- Colonia Porto Arlone, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Noqeti, popolo Tiok (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Galleggiamento e Archimede** (pianeta 40): 27 modelli.

- Specie (18): Gramicalia viridis, Pterilara viridis, Pterocoella alpestris, Crustiriria alpestris, Mycomoella rubra, Thamnolussa viridis, Cyathodiella caerulea, Gramiteria campestris, Gramilania viridis, Dipodinia gravis, Hexarira gravis, Hexasiella alpestris, Hexacoria gravis, Cyathomossa lavicola, Ophipoella calderina, Crustiralania cinerea, Crustilucatia sulphurea, Octocalia basaltica.
- Colonia Rada Arseri, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Oscillazioni armoniche** (pianeta 41): 41 modelli.

- Specie (26): Gramitetia levis, Dendrocatia viridis, Pterinossa viridis, Pterocotia alpestris, Meducotia levis, Hexacara vulgaris, Mycoralia aurea, Thamnotassa viridis, Crustinoella alpestris, Mycocaella levis, Crustisira viridis, Dendronossa litoralis, Calamonolia litoralis, Mycopoina alpestris, Saltotenia vulgaris, Medurania levis, Lyconossa levis, Lycocassa levis, Ophicaina vulgaris, Pteridilia silvatica, Hexalutaella saxatilis, Octocaria insularis, Octoporia lagunaris, Octocaella rupicola, Thamnorara arenaria, Thamnolulara montana.
- Colonia Approdo Eldu, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Maruya, popolo Haru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Onde e sovrapposizione** (pianeta 42): 21 modelli.

- Specie (13): Crustilalia viridis, Hexapora glacialis, Mycocatia glacialis, Pulvinera glacialis, Thamnocatia viridis, Thamnoriina glacialis, Pulviteella glacialis, Hexarilia glacialis, Saltoluina glacialis, Cyathoriria fontinalis, Crustitapoina cryophila, Pulvicoria nivalis, Crustirirassa cryoconica.
- Colonia Rada Rielmo, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

### 11. Calore e termodinamica

**Gas ideali** (pianeta 43): 23 modelli.

- Specie (11): Pulvilaria purpurea, Thamnocoella purpurea, Crustiteella nigra, Crustinotia nigra, Thamnoluina purpurea, Saltosiria glacialis, Meduluria glacialis, Octocotia saxatilis, Hexaponeina glacicola, Cyatholatia fontinalis, Crustitadinia cryoconica.
- Colonia Approdo Carise, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Calore e capacità termica** (pianeta 44): 28 modelli.

- Specie (20): Gramicossa campestris, Pterilutia campestris, Pteromora alpestris, Hexasira vulgaris, Crustisilia nigra, Thamnonoria alpestris, Gramilaria campestris, Gramimoella purpurea, Thamnocoina purpurea, Cyathoteria purpurea, Cyathopoella purpurea, Diporilia campestris, Hexatassa vulgaris, Hexanolia alpestris, Pteroraria campestris, Cyathoriina vulcanica, Hexalusitia cinerea, Crustitadiella sulphurea, Ptericoria basaltica, Myconeina pyrophila.
- Colonia Approdo Liduar, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.

**Termodinamica e rendimento** (pianeta 45): 21 modelli.

- Specie (11): Pulviteria purpurea, Crusticaina nigra, Hexanossa gravis, Styloratia gravis, Pulviporia vulgaris, Pulvitetia vulgaris, Hexataella gravis, Stylonolia tabularis, Thamnoveveria rupestris, Crustirisiina salinaria, Hexacoveella saxicola.
- Colonia Porto Lova, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

### 12. Elettromagnetismo e quanti

**Cariche e campo elettrico** (pianeta 46): 42 modelli.

- Specie (27): Gramitaria aurea, Pterisilia aurea, Dendrorassa aurea, Pterorilia alpestris, Hexaraella vulgaris, Crusticatia vulgaris, Gramilassa aurea, Dendroveria alpestris, Calamocolia litoralis, Calamoriria aurea, Dendrovera aurea, Dendrodira alpestris, Pterivelia vulgaris, Dendrorilia aurea, Medurinia pelagica, Octoriella ferox, Saltonessa vulgaris, Octolulia ferox, Pteropolia litoralis, Saltolaria campestris, Mycotelia silvatica, Dendrocalura insularis, Pteririella anularis, Pulvimotia rupicola, Octorara halophila, Thamnocatetia arenaria, Pteroriella montana.
- Colonia Rada Vaver, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Noyaen, popolo Maur (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Potenziale ed energia elettrica** (pianeta 47): 26 modelli.

- Specie (17): Gramivetia aurea, Pterisitia campestris, Hexasitia vulgaris, Pteromonia alpestris, Crustidiina viridis, Cyathorissa thermalis, Gramiteella aurea, Gramidiria campestris, Cyathoraella aurea, Cyatholania aurea, Hexacaella alpestris, Dipoponia campestris, Cyathodiria vulcanica, Cyathoveina calderina, Gramiditelia cinerea, Crustidicoella sulphurea, Dendrositenia pyrophila.
- Colonia Rada Arcael, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Circuiti e legge di Ohm** (pianeta 48): 21 modelli.

- Specie (10): Crustilania campestris, Stylosiria aurea, Stylonoina aurea, Stylolunia campestris, Crustilapoella saxatilis, Stylolussa tabularis, Pulvidiria lapidicola, Pterinessa rupestris, Crustirilaria eolica, Pulvidiella saxicola.
- Colonia Borgo Marar, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Induzione elettromagnetica** (pianeta 49): 37 modelli.

- Specie (25): Gramiluella aurea, Pterilunia aurea, Dendrotaina alpestris, Pecuditia campestris, Hexanenia vulgaris, Pterotera alpestris, Mycolatia aurea, Dendrolaella litoralis, Dendrotatia litoralis, Thamnodiella alpestris, Mycopoella rubra, Dendrocaina campestris, Mycosissa rubra, Thamnocaella aurea, Pteritaria aurea, Gramiveria aurea, Hexamolia alpestris, Octoteina alpestris, Lycorissa campestris, Saltovetia campestris, Mycosilia pratensis, Octoveria palustris, Hexatelania argillicola, Styloneella steppica, Crustinecossa saxatilis.
- Colonia Porto Vertopa, insediamento simbiotico (6 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, antenne ramificate.
- Villaggio di Luyamo, popolo Talen (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Fotoni ed energia quantizzata** (pianeta 50): 24 modelli.

- Specie (16): Pulvipoina aurea, Crustirara glacialis, Hexamoina glacialis, Gramiveella glacialis, Mycoriria viridis, Mycotalia glacialis, Thamnosira viridis, Myconessa viridis, Lycodinia ferox, Saltorilia glacialis, Ophiriria glacialis, Hexalasilia glacicola, Crustidicaella cryophila, Pulvirinia tundrica, Pulviraina morenica, Crustitavessa cryoconica.
- Colonia Base Nera, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

### 13. Materia e atomi

**Materia, proprietà e densità** (pianeta 51): 39 modelli.

- Specie (25): Dendrolura alpestris, Pterinotia litoralis, Medupora pelagica, Pteroditia alpestris, Thamnoritia alpestris, Calamocassa viridis, Calamolassa litoralis, Dendrolatia alpestris, Dendrolara viridis, Dendrodiria viridis, Mycorissa litoralis, Calamosira viridis, Pteridiina vulgaris, Thamnonetia viridis, Lycoluella alpestris, Pterolalia alpestris, Medutatia pelagica, Saltocolia vulgaris, Octopoella litoralis, Medunessa pelagica, Pterosiria litoralis, Pterisinossa insularis, Ophimoella fiordica, Thamnoditaina arenaria, Thamnonossa montana.
- Colonia Base Ramarsol, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, piattaforme a foglia, antenne ramificate.
- Villaggio di Hayaqe, popolo Maqe (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Atomi, isotopi e massa media** (pianeta 52): 18 modelli.

- Specie (7): Crustidiella viridis, Crustisitenia saxatilis, Stylomonia tabularis, Styloraella arenicola, Crusticorira lapidicola, Crustiditassa salinaria, Crustinonora craterica.
- Colonia Porto Lora, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Mole e quantità di sostanza** (pianeta 53): 12 modelli.

- Colonia Base Line, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Livelli atomici e spettri** (pianeta 54): 42 modelli.

- Specie (27): Gramicolia viridis, Dendromolia viridis, Pteritetia viridis, Hexadiella vulgaris, Pterosiina alpestris, Peculutia campestris, Thamnotetia alpestris, Thamnonessa vulgaris, Pulvipora viridis, Pulviponia vulgaris, Dendroneella litoralis, Gramitalia viridis, Thamnocora campestris, Gramilura alpestris, Gramimonia viridis, Dendrolania litoralis, Pterolaria alpestris, Dipodiella ferox, Pecudilia alpestris, Hexarissa vulgaris, Hexariella alpestris, Pecupoella campestris, Pecuneria campestris, Hexacolania ericina, Octoteria palustris, Hexalaluina argillicola, Stylorara steppica.
- Colonia Porto Mopa, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Qeshaur, popolo Moka (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Periodicità e carica efficace** (pianeta 55): 25 modelli.

- Specie (17): Crustimossa glacialis, Pulvinossa viridis, Hexaralia glacialis, Pulvinoina glacialis, Mycodiria pallida, Thamnovetia glacialis, Thamnonera glacialis, Crustiditia viridis, Saltocania glacialis, Saltosilia glacialis, Lycopoella glacialis, Hexalusira fontinalis, Crustivedilia cryophila, Pulvinotaria nivalis, Pecuconia tundrica, Pulvitavera morenica, Crusticasiina cryoconica.
- Colonia Rada Orapa, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

### 14. Legami e molecole

**Legame ionico e interazioni elettrostatiche** (pianeta 56): 24 modelli.

- Specie (13): Stylorissa campestris, Crustitenia campestris, Hexamoria vulgaris, Stylopolia campestris, Thamnoraria purpurea, Myconera vulgaris, Saltononia vulgaris, Hexalurira saxatilis, Hexaneveria tabularis, Crustimovenia lapidicola, Hexacalaria salinaria, Hexasiriria eolica, Pulviluteella saxicola.
- Colonia Base Maris, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Legame covalente ed energia di legame** (pianeta 57): 10 modelli.

- Colonia Borgo Elcais, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Geometria molecolare e VSEPR** (pianeta 58): 27 modelli.

- Specie (18): Gramiralia gravis, Cyathovenia gravis, Hexalura vulgaris, Myconotia litoralis, Cyathovessa rubra, Pterisiina gravis, Thamnopolia purpurea, Mycolaria aurea, Cyathosiria purpurea, Gramivessa purpurea, Dipotenia gravis, Hexapotia gravis, Pteroveria litoralis, Pterocoria gravis, Ophiveina calderina, Crustirinelia cinerea, Cyathocoina sulphurea, Mycocora pyrophila.
- Colonia Porto Lipa, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Forze intermolecolari** (pianeta 59): 37 modelli.

- Specie (22): Pterivessa litoralis, Graminenia purpurea, Hexalaria vulgaris, Medurassa pelagica, Calamocaria nigra, Pteririssa litoralis, Calamolara litoralis, Calamoconia litoralis, Dendrocotia purpurea, Pterimotia caerulea, Pterinolia vulgaris, Calamopolia litoralis, Gramipolia purpurea, Thamnopora alpestris, Medutenia pelagica, Ophirara vulgaris, Pteroralia litoralis, Pteronenia alpestris, Pteritamora insularis, Octonessa lagunaris, Gramilaella halophila, Thamnomoina arenaria.
- Colonia Rada Pavadu, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Qemamo, popolo Qeti (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 15. Stati e soluzioni

**Gas e stato aeriforme** (pianeta 60): 41 modelli.

- Specie (26): Gramiditia viridis, Pteritessa litoralis, Dendrorania caerulea, Hexadilia vulgaris, Medulania pelagica, Calamoluina litoralis, Calamonessa litoralis, Pterilulia litoralis, Dendronelia viridis, Dendroditia caerulea, Pteriveria caerulea, Thamnolania alpestris, Gramilulia caerulea, Myconoina rubra, Ophiraella litoralis, Octoraella litoralis, Pterorissa alpestris, Octositia alpestris, Medunossa pelagica, Pteronotia alpestris, Pteromoella alpestris, Calamonora lagunaris, Pulvidimossa rupicola, Gramipoluina halophila, Saltovelia arenaria, Pterinocora montana.
- Colonia Borgo Ismosol, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Talokmo, popolo Hatal (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Stati della materia e transizioni** (pianeta 61): 19 modelli.

- Specie (9): Pulvitassa caerulea, Medutelia glacialis, Gramicassa caerulea, Thamnotania glacialis, Mycolaella glacialis, Cyathorilia fontinalis, Pulviraria nivalis, Thamnolassa morenica, Crustiradira cryoconica.
- Colonia Porto Duse, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Soluzioni e concentrazione** (pianeta 62): 10 modelli.

- Colonia Approdo Liisra, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Solubilità ed equilibrio eterogeneo** (pianeta 63): 21 modelli.

- Specie (12): Stylodiina caerulea, Pulvirassa caerulea, Hexalara vulgaris, Mycolulia rubra, Stylomoina caerulea, Mycolara aurea, Hexacora alpestris, Ophineella gravis, Saltolura arenicola, Hexacopotia lapidicola, Hexatatania salinaria, Crustiditania saxicola.
- Colonia Approdo Elmo, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

### 16. Reazioni e quantità

**Stechiometria e reagente limitante** (pianeta 64): 40 modelli.

- Specie (26): Dendromossa aurea, Pterilura aurea, Gramiriella rubra, Pteronetia alpestris, Hexapossa vulgaris, Calamoriina litoralis, Dendrovelia campestris, Mycosinia levis, Pterilussa rubra, Pteritassa rubra, Calamocaella litoralis, Thamnocoria rubra, Crustiporia rubra, Pteridinia levis, Lycoraina alpestris, Medutaina pelagica, Saltoraina levis, Octotetia levis, Saltodilia levis, Medunetia pelagica, Pteriritaria silvatica, Hexanecoella saxatilis, Pterocanonia fiordica, Octosiina lagunaris, Pulvicorania rupicola, Thamnodivera arenaria.
- Colonia Rada Ispaver, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Talenma, popolo Urno (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Resa e bilanci di materia** (pianeta 65): 14 modelli.

- Specie (5): Crustitatia campestris, Pulvinonia saxatilis, Stylonessa tabularis, Stylonelia arenicola, Crustilasinia salinaria.
- Colonia Base Moli, avamposto sigillato (9 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Termochimica e calorimetria** (pianeta 66): 43 modelli.

- Specie (28): Dendrocania rubra, Gramiveina rubra, Pterilania litoralis, Hexalania vulgaris, Pteroluina alpestris, Pecusira campestris, Dendrolalia purpurea, Thamnovelia rubra, Thamnovenia campestris, Pterilaella alpestris, Gramicaria alpestris, Mycolalia vulgaris, Dendrolaria rubra, Dendrotara campestris, Gramisilia campestris, Thamnolara alpestris, Pecupora campestris, Octononia litoralis, Lycorinia ferox, Pecunonia alpestris, Ophiteria vulgaris, Pecurinia campestris, Saltoveella scalaris, Mycolunia silvatica, Calamorissa palustris, Peculura steppica, Hexateteina saxatilis, Hexatelaina tabularis.
- Colonia Base Seto, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Maruha, popolo Mook (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 17. Velocità ed equilibrio

**Velocità di reazione** (pianeta 67): 10 modelli.

- Colonia Base Vadu, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Temperatura e attivazione** (pianeta 68): 19 modelli.

- Specie (12): Crustiraella caerulea, Stylolaina caerulea, Hexatenia vulgaris, Crustinera alpestris, Pulvimoria caerulea, Thamnovessa vulgaris, Crustipoina caerulea, Ophitassa gravis, Crustinomoella saxatilis, Thamnolucassa tabularis, Styloriria arenicola, Ophitania eolica.
- Colonia Approdo Elraar, città adattata (7 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serre industriali, depositi di container, antenne per lo spazio profondo.

**Equilibrio chimico** (pianeta 69): 38 modelli.

- Specie (25): Pterinelia litoralis, Dendrocara caerulea, Gramilunia campestris, Pterolatia alpestris, Meduvelia pelagica, Hexarania vulgaris, Gramipoina caerulea, Crusticaella alpestris, Dendrotalia caerulea, Gramipotia alpestris, Pteritelia caerulea, Gramisinia caerulea, Crustilara caerulea, Dendrosira campestris, Thamnoponia caerulea, Octonotia ferox, Saltocatia vulgaris, Octodissa ferox, Ophirissa litoralis, Medulara pelagica, Ophiluria silvatica, Pteroveratia fiordica, Pterotenia rupicola, Gramiriralia halophila, Gramiverassa arenaria.
- Colonia Borgo Lomo, insediamento simbiotico (7 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia.
- Villaggio di Shamolu, popolo Moma (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Perturbazioni dell’equilibrio** (pianeta 70): 24 modelli.

- Specie (16): Cyathoraria caerulea, Pterineria caerulea, Pterocaria alpestris, Hexavera vulgaris, Gramiponia viridis, Gramirassa caerulea, Crustisinia alpestris, Cyatholara thermalis, Cyathoveella caerulea, Crustidinia vulgaris, Pterotelia alpestris, Hexateina campestris, Hexapomoria lavicola, Crustitesiina cinerea, Pulvimosiina basaltica, Mycorania pyrophila.
- Colonia Rada Orael, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, piattaforme di atterraggio, antenne per lo spazio profondo.

### 18. Acidi, redox e carbonio

**Acidi, basi e pH** (pianeta 71): 26 modelli.

- Specie (18): Cyathoneria thermalis, Gramidiina campestris, Hexalunia vulgaris, Cyathoponia viridis, Cyathotaria thermalis, Crustirania viridis, Gramidiella campestris, Cyathoditia thermalis, Pteripoella caerulea, Hexapodiria campestris, Pterocaina litoralis, Ophirira ferox, Pteromotia alpestris, Ophiraria vulgaris, Pteromorinia vulcanica, Ophinessa calderina, Crustirisitia sulphurea, Pulvirania basaltica.
- Colonia Approdo Riverar, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Soluzioni tampone** (pianeta 72): 11 modelli.

- Colonia Nuova Paten, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Ossidazione, riduzione ed elettrochimica** (pianeta 73): 44 modelli.

- Specie (29): Gramimoria caerulea, Dendrorissa caerulea, Pterimolia gravis, Pteroveella alpestris, Pecuvera gravis, Hexatera gravis, Pulvisitia caerulea, Dendronessa caerulea, Dendrotera campestris, Graminolia caerulea, Thamnotatia caerulea, Gramiraina gravis, Pulvineella vulgaris, Ptericotia gravis, Dendroluria alpestris, Calamositia caerulea, Hexatalia alpestris, Pterosilia gravis, Pteroneria gravis, Pecucassa gravis, Pecusitia campestris, Hexadinia alpestris, Octonelia alpestris, Saltoraria pratensis, Pulvicasiella ericina, Pterimotelia palustris, Pulvitesilia argillicola, Stylodinia steppica, Pteronolalia tabularis.
- Colonia Base Vaten, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Kashama, popolo Moqe (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Chimica organica e scheletri carboniosi** (pianeta 74): 27 modelli.

- Specie (15): Crustinessa caerulea, Pulvicoina glacialis, Gramitaella caerulea, Thamnomonia caerulea, Thamnodiria caerulea, Pulvilulia caerulea, Hexalulia glacialis, Saltolutia glacialis, Saltonoina glacialis, Hexaripoina saxatilis, Hexalalalia glacicola, Crustirarinia fontinalis, Crustiteralia cryophila, Saltotassa nivalis, Crustivelassa cryoconica.
- Colonia Base Moismo, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Polimeri e materiali** (pianeta 75): 40 modelli.

- Specie (25): Gramicaina caerulea, Pterivenia litoralis, Dendroraella caerulea, Pteroneella alpestris, Meduriina pelagica, Hexalalia vulgaris, Crustitessa caerulea, Crustinoria campestris, Calamoratia viridis, Mycosira litoralis, Calamomolia litoralis, Calamorira caerulea, Crustimotia viridis, Dendrodiella viridis, Lycosiria ferox, Ophilaella vulgaris, Saltonotia vulgaris, Meduriella pelagica, Saltoraella campestris, Dendrocamotia silvatica, Dendrosimoella insularis, Pteronoluria rupicola, Ophidissa halophila, Thamnopoveria arenaria, Pterolunia montana.
- Colonia Approdo Sepato, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Okluru, popolo Urok (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 19. La vita e la cellula

**Che cos'è la vita** (pianeta 76): 30 modelli.

- Specie (19): Crustitaella glacialis, Pulvisiella purpurea, Hexanora glacialis, Pulvicora glacialis, Thamnorania rubra, Pulvitaina purpurea, Gramineina glacialis, Pulvitelia rubra, Crustiteria glacialis, Saltosiina glacialis, Saltovenia glacialis, Hexapoteria glacialis, Pulvicocotia saxatilis, Crustiveriria glacicola, Ophinelia cryophila, Pulvipoveria nivalis, Pulvidivessa tundrica, Thamnolacoella morenica, Crustinesinia cryoconica.
- Colonia Base Motova, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Cellule, scala e superficie** (pianeta 77): 23 modelli.

- Specie (14): Stylovetia rubra, Crustimolia campestris, Hexacoella vulgaris, Thamnonelia rubra, Crustitetia nigra, Thamnoriella purpurea, Pulvimoella vulgaris, Octomossa ferox, Ophidira gravis, Hexamomora gravis, Stylonera arenicola, Pulvilutia lapidicola, Crustiricoina eolica, Pulvisiditia saxicola.
- Colonia Approdo Elelora, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Membrane e protocellule** (pianeta 78): 26 modelli.

- Specie (16): Graminetia levis, Pterinenia litoralis, Hexaluria vulgaris, Cyathonoella levis, Ptericoella rubra, Thamnocalia rubra, Pterinora levis, Crustitania campestris, Crusticonia campestris, Pteririnia levis, Pteronoria levis, Ophilania levis, Cyathonolia lavicola, Pteridimonia calderina, Hexatanotia cinerea, Pterinoria basaltica.
- Colonia Porto Cacali, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

### 20. Molecole dal cosmo

**Elementi e molecole della vita nello spazio** (pianeta 79): 25 modelli.

- Specie (17): Crustitaria nigra, Pulvilaella glacialis, Hexaluina glacialis, Meducatia glacialis, Gramivenia rubra, Pulvipoella purpurea, Mycomolia glacialis, Crustirassa glacialis, Graminessa glacialis, Lycomolia ferox, Ophilaina glacialis, Pulviridinia saxatilis, Crustinesiina glacicola, Hexaludiria nivalis, Pulviritara tundrica, Hexaporassa morenica, Crustiluteria cryoconica.
- Colonia Porto Verdumar, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, antenne per lo spazio profondo.

**Meteoriti, comete e campioni di asteroidi** (pianeta 80): 42 modelli.

- Specie (27): Dendronoina purpurea, Pterisira levis, Graminossa purpurea, Peculunia campestris, Hexavetia levis, Pterotaina alpestris, Dendroporia alpestris, Myconeella rubra, Mycolura litoralis, Gramirania purpurea, Dendrosiria campestris, Gramilunoina campestris, Ptericora levis, Dendroponia purpurea, Mycocossa rubra, Calamorinia nigra, Pecunoella alpestris, Pecutessa levis, Lycodilia levis, Hexamonia campestris, Dipoveella ferox, Pecuraina levis, Saltodiria pratensis, Thamnomosiina collina, Hexaluteina ericina, Pterimonia palustris, Crustirasira saxatilis.
- Colonia Porto Molo, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Lutalok, popolo Okma (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Chiralità e omochiralità** (pianeta 81): 11 modelli.

- Colonia Base Vapais, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 21. Chimica prebiotica

**Miller-Urey e la sintesi prebiotica** (pianeta 82): 27 modelli.

- Specie (16): Crustilura caerulea, Pulvidira caerulea, Hexamora glacialis, Gramiriina glacialis, Pulvipolia glacialis, Mycoraina pallida, Crustiluella caerulea, Crusticania glacialis, Gramiluina glacialis, Lycomossa glacialis, Saltosira glacialis, Hexataina glacialis, Crustilapossa glacicola, Ophilara cryophila, Pulvidilara morenica, Crustilacaella cryoconica.
- Colonia Nuova Oraveris, città adattata (11 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Energia, enzimi e catalisi** (pianeta 83): 21 modelli.

- Specie (13): Crustimora viridis, Stylonetia caerulea, Hexanonia vulgaris, Pulvidiina caerulea, Stylocatia viridis, Styloraina campestris, Stylosilia viridis, Hexateella vulgaris, Saltopora vulgaris, Pulvinopoella lapidicola, Crustimomolia salinaria, Hexatenotia eolica, Hexadisissa saxicola.
- Colonia Nuova Verduis, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Sorgenti idrotermali e metabolismo primordiale** (pianeta 84): 44 modelli.

- Specie (29): Dendrocossa caerulea, Pteripossa viridis, Gramipoella campestris, Pecusissa campestris, Hexacoina vulgaris, Pteropotia alpestris, Pteriluina viridis, Dendronenia litoralis, Thamnoriria campestris, Pulvitara alpestris, Dendroveina viridis, Thamnosiina viridis, Gramisiina campestris, Pulvicara caerulea, Mycolaina alpestris, Dendrotenia caerulea, Octotera alpestris, Pterovessa litoralis, Hexanoina alpestris, Hexasimossa alpestris, Hexalutetia vulgaris, Saltolassa campestris, Dendrotetara collina, Ptericaritia scalaris, Pteridira silvatica, Hexarivessa ericina, Ophitaella palustris, Crustilumora argillicola, Saltomolia steppica.
- Colonia Nuova Isora, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Urtalha, popolo Noka (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 22. Informazione e replicatori

**Il mondo a RNA** (pianeta 85): 21 modelli.

- Specie (9): Stylodiria viridis, Pulvipotia viridis, Stylolalia gravis, Thamnoluneria tabularis, Crustiradiria lapidicola, Crustinenoina salinaria, Crustimotaria eolica, Crustitanolia saxicola, Crusticaveella craterica.
- Colonia Approdo Verarri, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**DNA, codice genetico ed espressione** (pianeta 86): 23 modelli.

- Specie (15): Pulvicaria viridis, Crustineria glacialis, Hexalatia glacialis, Mycocoina glacialis, Pulvicalia glacialis, Pulvicolia viridis, Mycolussa aurea, Gramisiella glacialis, Saltonora glacialis, Lycotaella ferox, Saltocoina glacialis, Hexamolussa glacicola, Crusticaritia cryophila, Mycoteria tundrica, Crustinoveria cryoconica.
- Colonia Base Tenmar, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, piattaforme di atterraggio, antenne per lo spazio profondo.

**Mutazioni e soglia d'errore** (pianeta 87): 12 modelli.

- Colonia Approdo Verrase, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 23. Evoluzione e albero della vita

**Ereditarietà e selezione naturale** (pianeta 88): 28 modelli.

- Specie (18): Pulvitalia rubra, Crustidira glacialis, Medunoria glacialis, Hexapolia glacialis, Crusticossa glacialis, Pulvilura rubra, Gramirinia glacialis, Crustinenia glacialis, Thamnolatia rubra, Pulvilassa glacialis, Saltoponia glacialis, Saltolulia glacialis, Hexasinessa ferox, Crustiveditia saxatilis, Hexariluina glacicola, Crustinemolia cryophila, Pulvimoporia tundrica, Crustilupolia cryoconica.
- Colonia Base Rasol, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Deriva genetica** (pianeta 89): 21 modelli.

- Specie (9): Pulviraella gravis, Crustidilia rubra, Pulvitaria gravis, Styloponia tabularis, Pulviraneella lapidicola, Thamnoraina rupestris, Crustimoluella salinaria, Crusticolalia saxicola, Pulvilaluria craterica.
- Colonia Borgo Pato, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**L'albero universale e LUCA** (pianeta 90): 37 modelli.

- Specie (22): Gramitenia rubra, Dendrovetia rubra, Ptericara litoralis, Hexalassa vulgaris, Pteroteella alpestris, Mycoriina viridis, Thamnosilia vulgaris, Dendroveella rubra, Dendrolassa rubra, Crustilaella aurea, Mycovetia aurea, Mycocaina litoralis, Dendrolunia litoralis, Pteronossa litoralis, Pterotassa alpestris, Pteronera litoralis, Octonossa alpestris, Saltomotia campestris, Octolaria insularis, Octoneella anularis, Gramidilaina halophila, Gramitelussa arenaria.
- Colonia Rada Marne, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Tishamo, popolo Maru (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Le prime tracce della vita e il tempo geologico** (pianeta 91): 24 modelli.

- Specie (16): Cyatholura thermalis, Pteriponia rubra, Pterositia alpestris, Cyathomoina rubra, Cyathomotia thermalis, Cyathoritia thermalis, Thamnotaria campestris, Cyathonessa rubra, Mycorara aurea, Pterovenia litoralis, Hexanetalia vulgaris, Hexaratessa saxatilis, Pterinera vulcanica, Gramilarinia cinerea, Cyathopossa sulphurea, Pulvitasilia basaltica.
- Colonia Rada Ripa, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Ossigeno, endosimbiosi e cellule complesse** (pianeta 92): 12 modelli.

- Colonia Approdo Vaverlo, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 24. Vita ai limiti

**Estremofili** (pianeta 93): 23 modelli.

- Specie (12): Pulvinora rubra, Pulvitania aurea, Thamnoporia glacialis, Pulviluella glacialis, Pulvicaella aurea, Ophinossa glacialis, Saltoteria glacialis, Octocolia saxatilis, Crustimolatia cryophila, Pulvirivenia nivalis, Hexarineria morenica, Crustisineella cryoconica.
- Colonia Base Vara, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Respirazione, fermentazione e chemiosintesi** (pianeta 94): 20 modelli.

- Specie (12): Crustivenia aurea, Stylocora aurea, Hexadissa vulgaris, Thamnoveria alpestris, Thamnopoina alpestris, Stylodilia alpestris, Stylocossa aurea, Hexaranelia alpestris, Stylolulia arenicola, Pulvilanoella lapidicola, Pterinonolia rupestris, Crustinetetia eolica.
- Colonia Nuova Nelo, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, antenne per lo spazio profondo.

**Fotosintesi e luce di altre stelle** (pianeta 95): 27 modelli.

- Specie (17): Gramineella aurea, Pteriteina levis, Pteronora alpestris, Cyathonoria aurea, Pterineella rubra, Mycotassa levis, Gramimovelia campestris, Thamnocossa alpestris, Crustinolia aurea, Pteroneina levis, Dipolutia ferox, Hexacosinia levis, Ophinera vulgaris, Hexaterania lavicola, Gramitetassa cinerea, Crustilumotia sulphurea, Ptericarara basaltica.
- Colonia Borgo Vermarlo, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Crescita delle popolazioni microbiche** (pianeta 96): 11 modelli.

- Colonia Base Movapa, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

### 25. Pianeti abitabili

**La zona abitabile** (pianeta 97): 19 modelli.

- Specie (9): Pulvidissa vulgaris, Mycopotia rubra, Pulvinotia caerulea, Styloconia caerulea, Stylocaella tabularis, Stylositia arenicola, Crustiteritia lapidicola, Crustitesira salinaria, Pulvirilulia saxicola.
- Colonia Rada Vaorari, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Atmosfere, effetto serra e clima** (pianeta 98): 23 modelli.

- Specie (11): Pulviditia glacialis, Meduraina glacialis, Crusticara glacialis, Mycoluria aurea, Pulviriria glacialis, Pulvicatia glacialis, Crustinevetia glacicola, Cyathocossa fontinalis, Pulvinenessa nivalis, Pulvicopoina morenica, Crustimocora cryoconica.
- Colonia Porto Pais, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Abitabilità attorno alle nane rosse** (pianeta 99): 11 modelli.

- Colonia Nuova Mose, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

**Biosfera, albedo e Daisyworld** (pianeta 100): 41 modelli.

- Specie (26): Pterirania levis, Dendromoria alpestris, Gramitaina caerulea, Pecuveria levis, Hexaratia levis, Pterolutia levis, Dendrotessa caerulea, Myconossa aurea, Mycotatia aurea, Pulvineria vulgaris, Gramilara litoralis, Thamnorassa caerulea, Calamopossa caerulea, Mycoritia alpestris, Dendromonia levis, Mycocoella levis, Octosissa ferox, Pterocoina levis, Ophivetia ferox, Pecunora campestris, Pterolassa levis, Dendroteina silvatica, Pterimosissa palustris, Gramicocolia steppica, Octodinia saxatilis, Pterolania tabularis.
- Colonia Approdo Toca, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Hamoya, popolo Urqe (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 26. Mondi del sistema solare

**Marte: acqua e abitabilità passata** (pianeta 101): 15 modelli.

- Specie (6): Crustidiria campestris, Pulviracolia lapidicola, Thamnolacoria rupestris, Crustidimora salinaria, Crustirimoria saxicola, Pulvipomoina craterica.
- Colonia Nuova Ridu, avamposto sigillato (9 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, piattaforme di atterraggio, antenne per lo spazio profondo.

**Cercare la vita su Marte** (pianeta 102): 11 modelli.

- Colonia Nuova Raello, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Europa e gli oceani sotto il ghiaccio** (pianeta 103): 25 modelli.

- Specie (15): Pulvineina viridis, Crustisiria glacialis, Hexamoella glacialis, Medumoella glacialis, Thamnosiria viridis, Gramirinotia glacialis, Thamnotaella viridis, Mycolania aurea, Thamnocaria viridis, Medusilia glacialis, Hexanocatia ferox, Octoveina saxatilis, Crustisivera cryophila, Saltoteella nivalis, Hexarisiria morenica.
- Colonia Borgo Verli, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, piattaforme di atterraggio, antenne per lo spazio profondo.

**Encelado e i suoi pennacchi** (pianeta 104): 40 modelli.

- Specie (27): Gramicoella viridis, Dendrotassa viridis, Medutaella pelagica, Hexateria levis, Pteriluella viridis, Pteridissa levis, Crustinonia viridis, Crusticora viridis, Thamnotenia levis, Dendrodinia viridis, Thamnolaella campestris, Crustisiella campestris, Mycocaria viridis, Pterisissa litoralis, Medusiria pelagica, Octocossa levis, Saltomonia levis, Pteroraella ferox, Medunotia pelagica, Meduponia pelagica, Dendrotalunia silvatica, Pterorassa insularis, Calamoporia anularis, Gramilumora lagunaris, Octocaina rupicola, Gramiripoina halophila, Saltovera arenaria.
- Colonia Nuova Movermo, insediamento simbiotico (7 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia.
- Villaggio di Noqemo, popolo Yazi (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Titano, la chimica senza acqua** (pianeta 105): 42 modelli.

- Specie (27): Dendronotia gravis, Pterinoina viridis, Gramidilia viridis, Hexanotia vulgaris, Pecucoina campestris, Pteropora gravis, Gramilupolia alpestris, Gramicara litoralis, Dendrotaria viridis, Thamnopotia campestris, Mycoteella rubra, Pulvitera alpestris, Dendrosissa viridis, Thamnodissa alpestris, Pulvimossa viridis, Thamnolutia gravis, Pteromolia ferox, Hexalucatia campestris, Saltonelia gravis, Lycomoina gravis, Hexaracaria gravis, Hexanodiina vulgaris, Pecuteella gravis, Pteritacalia scalaris, Thamnotanera ericina, Crustiraveria argillicola, Hexacocatia tabularis.
- Colonia Porto Sollidu, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Shaqeok, popolo Ruha (5 edifici): capanne, case lunghe, granai, focolari, totem.

### 27. Cercare la vita nella galassia

**Scoprire gli esopianeti** (pianeta 106): 26 modelli.

- Specie (18): Cyathoteina thermalis, Pterivetia campestris, Hexasiria vulgaris, Pteronoina alpestris, Thamnotelia purpurea, Crusticolia campestris, Thamnocolia purpurea, Crustiraina nigra, Crustisitia campestris, Thamnorissa vulgaris, Hexacanotia campestris, Hexalucaina alpestris, Crustipoconia saxatilis, Ophinotia calderina, Gramilacoria cinerea, Cyathotara sulphurea, Ptericadiella basaltica, Pterinodiella pyrophila.
- Colonia Nuova Lira, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, serbatoi sferici, serre industriali, hangar, antenne per lo spazio profondo.

**Atmosfere degli esopianeti e JWST** (pianeta 107): 41 modelli.

- Specie (26): Dendroconia gravis, Gramimoina purpurea, Pterivera purpurea, Meducaina pelagica, Hexalaella vulgaris, Crustineina gravis, Calamomossa nigra, Dendroneria purpurea, Dendroneina purpurea, Dendrodilia campestris, Thamnositia alpestris, Dendrocolania purpurea, Calamocoina litoralis, Dendrocaria purpurea, Hexaluporia gravis, Medunenia gravis, Hexacatetia ferox, Saltoconia gravis, Medululia pelagica, Lycosissa ferox, Octoditia insularis, Pteronopossa fiordica, Pulvirivelia rupicola, Gramivevenia halophila, Saltopoina arenaria, Hexacomossa montana.
- Colonia Approdo Moliri, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Okokqe, popolo Tital (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Biofirme e falsi positivi** (pianeta 108): 34 modelli.

- Specie (24): Dendroraria alpestris, Graminotia rubra, Pteriratia litoralis, Hexasinia vulgaris, Pecuponia campestris, Gramiporira purpurea, Mycoveina aurea, Pterilaria purpurea, Thamnoveina vulgaris, Dendrovenia purpurea, Mycocara alpestris, Thamnolunia rubra, Mycomoina rubra, Dendrocoria purpurea, Octomoria alpestris, Diponoella vulgaris, Pecusinia alpestris, Hexalucotia campestris, Hexaponora campestris, Hexanolura vulgaris, Dipocoria silvatica, Gramilucoella steppica, Pulvitamotia saxatilis, Thamnocacoella tabularis.
- Colonia Nuova Tooraora, città adattata (10 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, hangar, depositi di container, antenne per lo spazio profondo.

**Panspermia e protezione planetaria** (pianeta 109): 20 modelli.

- Specie (8): Crustipolia nigra, Styloveria rubra, Mycoraria rubra, Thamnolalunia tabularis, Stylotaella arenicola, Crustinetelia lapidicola, Crustilusira salinaria, Pulvinecoria craterica.
- Colonia Approdo Marca, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Tecnofirme, SETI ed equazione di Drake** (pianeta 110): 12 modelli.

- Colonia Borgo Paver, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

### 28. Luce e telescopi

**Onde elettromagnetiche e pressione della luce** (pianeta 111): 36 modelli.

- Specie (28): Pteriditia caerulea, Gramivera caerulea, Dendrononia caerulea, Hexaritia vulgaris, Pecucania campestris, Mycodissa aurea, Mycocalia viridis, Mycoditia levis, Pulvivelia vulgaris, Pterinonia alpestris, Mycoveella aurea, Ptericaella caerulea, Thamnonoina levis, Dendrocoella caerulea, Pulviratia levis, Ophicaella ferox, Dipovelia levis, Ophidiria litoralis, Hexaveditia levis, Hexacalara levis, Pecumotia levis, Saltocoria pratensis, Dendrosinia collina, Dendronocania silvatica, Pulvilucora ericina, Ptericomotia palustris, Crustirapoina saxatilis, Hexaracania tabularis.
- Colonia Nuova Toelva, città adattata (8 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Specchi, lenti e telescopi** (pianeta 112): 37 modelli.

- Specie (23): Pteriveella caerulea, Gramisira caerulea, Dendrosiella alpestris, Hexamossa vulgaris, Pterotaria alpestris, Calamotatia caerulea, Pteriraria caerulea, Calamonoella litoralis, Thamnorinia caerulea, Dendroponeella caerulea, Crusticotia vulgaris, Calamosinia litoralis, Calamoraria litoralis, Lycocolia ferox, Medusissa pelagica, Hexaluralia alpestris, Dendrolupossa silvatica, Pulviluvelia saxatilis, Pterocorara insularis, Gramivedissa lagunaris, Pteroporia rupicola, Octoritia halophila, Gramiluluina arenaria.
- Colonia Rada Solsol, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, piattaforme a foglia, antenne ramificate.
- Villaggio di Maokok, popolo Okur (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Interferenza e interferometri** (pianeta 113): 17 modelli.

- Specie (5): Crustiponia campestris, Pulvinetaria saxatilis, Thamnolucaella tabularis, Pulvicocaria lapidicola, Pterinotaria rupestris.
- Colonia Borgo Casolis, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Diffrazione e potere risolutivo** (pianeta 114): 10 modelli.

- Colonia Base Valois, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Radiazione termica e luce delle stelle** (pianeta 115): 22 modelli.

- Specie (11): Pulvilussa viridis, Thamnodira glacialis, Pulvirissa glacialis, Crustiriina glacialis, Thamnolulia caerulea, Mycotaria glacialis, Crustisidilia glacicola, Crustinoluella cryophila, Pulvipolaella nivalis, Thamnocorissa morenica, Crustitelassa cryoconica.
- Colonia Borgo Isne, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, piattaforme di atterraggio, antenne per lo spazio profondo.

### 29. Campi e plasmi nello spazio

**Legge di Gauss: gusci, pianeti e condensatori** (pianeta 116): 42 modelli.

- Specie (28): Pteritania litoralis, Gramilatia rubra, Dendroteria aurea, Pecuporia campestris, Pterosinia alpestris, Hexasilia vulgaris, Graminonia campestris, Mycomoria alpestris, Thamnonolia rubra, Pulvitatia vulgaris, Gramitassa aurea, Dendrovecoina rubra, Mycopora aurea, Dendronetia campestris, Mycomora litoralis, Calamodilia rubra, Saltodiina campestris, Ophimoina vulgaris, Pecumoella campestris, Ophinoria litoralis, Pterotessa litoralis, Hexateraella ferox, Pecucotia pratensis, Dendrocateina silvatica, Pterisiditia palustris, Pulvilatenia argillicola, Stylotessa steppica, Stylomotia tabularis.
- Colonia Borgo Semo, insediamento simbiotico (8 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Enziok, popolo Ziok (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Particelle cariche nei campi magnetici** (pianeta 117): 38 modelli.

- Specie (23): Dendropora alpestris, Pteritaella rubra, Gramicaella campestris, Hexacalia vulgaris, Pterocania alpestris, Crustipotia vulgaris, Mycovenia litoralis, Pterisiella alpestris, Dendrosiina litoralis, Dendrotasira alpestris, Dendroteella rubra, Dendromotia rubra, Calamocotia litoralis, Medusitia pelagica, Octolura alpestris, Medumonia pelagica, Lycocania ferox, Meducania pelagica, Pulvicotaria saxatilis, Octoraina insularis, Pterivepotia fiordica, Saltolussa arenaria, Pteroterilia montana.
- Colonia Base Loto, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Maurlu, popolo Okti (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Correnti, dipoli e dinamo dei pianeti** (pianeta 118): 21 modelli.

- Specie (10): Stylomossa rubra, Pulvicaina rubra, Hexatania vulgaris, Styloriella rubra, Thamnosiella campestris, Saltotaina arenicola, Crusticosira lapidicola, Hexatenora salinaria, Crustitesiella eolica, Pulviludiria saxicola.
- Colonia Borgo Paar, avamposto sigillato (11 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Induzione, circuiti oscillanti e radio** (pianeta 119): 12 modelli.

- Colonia Rada Ellois, avamposto sigillato (12 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore, impianto della regolite, piattaforme di atterraggio, antenne per lo spazio profondo.

**Equazioni di Maxwell e magnetismo della materia** (pianeta 120): 25 modelli.

- Specie (16): Crustirinia rubra, Pulvirara rubra, Hexacotia glacialis, Meduneria glacialis, Mycotaella aurea, Pulvicoella glacialis, Thamnomoria glacialis, Crustilatia glacialis, Medumotia glacialis, Hexavecora glacialis, Hexarasinia saxatilis, Ophiporia cryophila, Hexanecora nivalis, Mycocania tundrica, Thamnoteneina morenica, Crustirinessa cryoconica.
- Colonia Approdo Toarlo, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

### 30. Dalla relatività al Big Bang

**Relatività ristretta** (pianeta 121): 38 modelli.

- Specie (25): Ptericaina litoralis, Gramimora campestris, Dendropoella aurea, Pteroteria alpestris, Hexatessa vulgaris, Thamnonotia vulgaris, Calamodiina viridis, Gramidineria alpestris, Mycovelia rubra, Mycocoria aurea, Gramiluneina alpestris, Pteripotia vulgaris, Gramineraria campestris, Pulvisinia aurea, Pulvivera aurea, Diporiina campestris, Hexadilatia vulgaris, Saltolaella campestris, Thamnoluvenia collina, Ophirania silvatica, Hexadirara ericina, Ophilulia palustris, Pulvivetania argillicola, Pulvipoteina saxatilis, Styloluria tabularis.
- Colonia Nuova Ravadu, insediamento simbiotico (7 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, antenne ramificate.
- Villaggio di Matilu, popolo Mamo (5 edifici): capanne, case lunghe, granai, focolari, totem.

**Onde di materia, atomi e righe spettrali** (pianeta 122): 25 modelli.

- Specie (16): Crustiveella viridis, Pulvisira viridis, Hexaneria glacialis, Meduteina glacialis, Crustiriella viridis, Gramitania viridis, Crustitelia glacialis, Thamnoriveella glacialis, Hexavecolia glacialis, Hexacatessa glacialis, Hexatariina glacicola, Ophicoella cryophila, Hexalarira nivalis, Gramisilassa tundrica, Thamnorataina morenica, Crustidirilia cryoconica.
- Colonia Porto Sepa, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serre industriali, depositi di container, piattaforme di atterraggio, antenne per lo spazio profondo.

**Nuclei, decadimenti e datazioni** (pianeta 123): 20 modelli.

- Specie (10): Pulviluina rubra, Crustinora aurea, Hexasiina vulgaris, Crustiratia gravis, Saltoteina vulgaris, Stylorira tabularis, Ophimora arenicola, Hexalutenia lapidicola, Ophicalia eolica, Crustinonelia saxicola.
- Colonia Porto Ararel, avamposto sigillato (10 edifici): nodo di comando, moduli abitativi, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, piattaforme di atterraggio, antenne per lo spazio profondo.

**Energia dal nucleo: fusione nelle stelle** (pianeta 124): 27 modelli.

- Specie (18): Graminoria campestris, Cyatholuella aurea, Pteromoina alpestris, Hexanoria vulgaris, Thamnoralia aurea, Cyathorara thermalis, Mycoconia campestris, Crustinelia alpestris, Gramicotania campestris, Mycoporia vulgaris, Mycoramossa campestris, Diponora ferox, Ophipossa campestris, Pterorinia alpestris, Crustipolatia saxatilis, Cyathosiella lavicola, Cyathosissa sulphurea, Dendrovesira pyrophila.
- Colonia Base Versol, città adattata (9 edifici): centro di controllo, blocchi su piloni, blocchi a gradoni, processori atmosferici, impianti di energia, serbatoi sferici, serre industriali, piattaforme di atterraggio, antenne per lo spazio profondo.

**Particelle, espansione e Big Bang** (pianeta 125): 39 modelli.

- Specie (24): Pterirara rubra, Gramilalia aurea, Dendropotia rubra, Hexanetia vulgaris, Pterodiella levis, Calamonotia levis, Calamotaria levis, Mycotania aurea, Crustitera alpestris, Calamocoria levis, Calamocatia rubra, Mycopossa rubra, Dendromoella levis, Dendronoteria litoralis, Hexadirania vulgaris, Pterosira ferox, Pteromossa alpestris, Ophidinia vulgaris, Pteriteritia silvatica, Octorassa saxatilis, Octodiina anularis, Octotalia lagunaris, Octocoella rupicola, Pterolurira montana.
- Colonia Rada Oratenca, insediamento simbiotico (9 edifici): sala centrale, baccelli abitativi, baccelli gemelli, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate.
- Villaggio di Nourtal, popolo Moru (5 edifici): capanne, case lunghe, granai, focolari, totem.
