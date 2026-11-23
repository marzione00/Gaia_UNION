# Guida di stile delle colonie (1.66.0)

Questa guida fissa il linguaggio visivo degli insediamenti umani sulle superfici dei pianeti. Il codice che la applica è in `src/worlds/architecture.js` (edifici, tavolozze, opere lungo le strade), `src/worlds/settlements.js` (pianta della colonia) e `src/worlds/people.js` (coloni); le verifiche automatiche sono in `tests/stile.test.mjs`.

## Principio

Le colonie parlano la stessa lingua delle stazioni in orbita: scafi a pannelli con giunti in ombra, oblò e feritoie al posto delle griglie di finestre, tubazioni, portelli stagni, luci di servizio. La forma di ogni edificio discende dalla carta d'identità del pianeta (densità dell'atmosfera, gravità, clima, numero di specie) e dalla funzione che svolge nella colonia.

I riferimenti sono tre. I tre indirizzi estetici di *Civilization: Beyond Earth* (Purity, Harmony, Supremacy) offrono un'ispirazione generale sul modo di distinguere colonie che rispondono in modo diverso allo stesso ambiente; nessun modello del gioco viene riprodotto. L'ipotesi Gaia di Lovelock e il modello Daisyworld di Watson e Lovelock (1983) orientano gli insediamenti che partecipano alla regolazione del clima. Gli studi di habitat lunari e marziani suggeriscono moduli cilindrici chiusi da calotte, cupole geodetiche e coperture di regolite.

## Tre tipologie

| Tipologia | Regola sulla carta | Pianeti | Edificio centrale | Edifici tipici |
|---|---|---|---|---|
| Avamposto sigillato | densità dell'atmosfera < 0,3 | 46 | nodo di comando a cupola geodetica con torre di controllo | moduli pressurizzati su selle, moduli sotto regolite, cupole geodetiche, torri di moduli, serre pressurizzate, radiatori, campi solari, reattore sotto un terrapieno, impianto della regolite, piattaforme di atterraggio, antenne |
| Insediamento simbiotico | almeno 15 specie e densità ≥ 0,45 | 41 | sala centrale a guscio reticolare | baccelli su fusti con radici di sostegno, baccelli gemelli con ponte vetrato, torri vive, serre a membrana, bioreattori, regolatori di albedo, piattaforme a foglia, antenne ramificate |
| Città adattata | tutti gli altri pianeti | 38 | centro di controllo esagonale con pareti inclinate | blocchi arrotondati su piloni, blocchi a gradoni con serre addossate, processori atmosferici, serbatoi sferici, serre idroponiche a volta sfaccettata, hangar, depositi di contenitori pressurizzati, impianti eolici o geotermici o solari |

I regolatori di albedo alternano superfici chiare e scure: la colonia regola la frazione di luce riflessa dal suolo, come le margherite bianche e nere di Daisyworld.

## Materiali e colori

- Lo scafo prende il colore del suolo locale (avamposti e città) o della biomassa (insediamenti simbiotici). La saturazione, misurata come (max − min) / max sui tre canali, resta entro 0,22 per gli scafi, 0,25 per le cornici e 0,15 per l'acciaio.
- Ogni colonia ha un solo colore d'accento, con saturazione entro 0,8: fasce sui moduli, luci di stato, venature luminose dei gusci.
- Le finestre accese hanno un'emissione moderata e si leggono come luce calda attraverso il vetro; di giorno restano più scure del cielo.
- Sotto 1,6 unità di altezza il colore delle pareti tende a quello del suolo: la polvere si deposita alla base degli edifici. Basamenti e terrapieni usano il materiale del terreno, con la sua grana.
- I contenitori del deposito usano sei tinte spente; nessuna superficie ha colori pastello saturi.

## Proporzioni

- Un colono adulto è alto 1,1 unità, come una persona di 1,75 m: un'unità vale circa 1,6 m. Il corpo misura 7,5 teste, con il bacino a metà altezza; un bambino è alto 0,8 unità e misura 5,5 teste.
- Portelli e porte sono alti fra 1,1 e 1,4 unità; i moduli abitativi hanno un raggio fra 1,3 e 1,6 unità, cioè fra 2,1 e 2,6 m.
- Con la gravità cambiano le altezze: torri, alberi, ciminiere e fusti crescono come l'inverso della radice della gravità, e sopra 1,15 g i blocchi su piloni hanno al più due piani.

## Abitanti

L'equipaggiamento dipende dalla tipologia: tuta pressurizzata con casco e visiera scura negli avamposti sigillati, tuta da lavoro con cappuccio e respiratore nelle città adattate, abiti leggeri negli insediamenti simbiotici. Le fasce bianche del modello prendono il colore del ruolo di ogni abitante.

## Pianta

- Al centro sta l'edificio principale della tipologia. Da esso partono da 5 a 7 strade a raggiera, unite da anelli; sul secondo e sul quarto anello ogni arco si divide in due, così gli isolati restano lunghi circa quanto profondi.
- Un incrocio non ancora costruito può spostarsi fino a un terzo di isolato, così le strade seguono il terreno.
- Ogni settore fra due raggi ha una funzione: abitazioni, serre e coltivazioni, industria, ricerca e monitoraggio. Vicino al centro sta il nucleo abitato. Piattaforme di atterraggio, campi di energia e antenne stanno al margine, e una strada d'accesso porta dalle stazioni all'incrocio più vicino.
- Lungo i raggi degli avamposti e delle città corrono due condotte su sostegni; lungo tutte le strade stanno lampioni ogni 9 unità, che negli insediamenti simbiotici sono segnali luminosi bassi.
- Le strade sono piste chiare sulla regolite negli avamposti, terra battuta del colore della biomassa negli insediamenti simbiotici, regolite sinterizzata nelle città.

## Esclusioni

Le colonie escludono gli archetipi terrestri, cioè tetti a falde, camini, portici, piazze con monumenti, facciate piatte con griglie di finestre e case unifamiliari. Le capanne, i granai e i focolari restano propri dei villaggi dei popoli nativi.

## Verifiche automatiche

`tests/stile.test.mjs` controlla per un campione di pianeti che la tipologia segua la regola sulla carta, che i tipi di edificio appartengano alla tipologia e nessuno sia un archetipo terrestre, che i colori rispettino i limiti di saturazione, che coloni ed edifici abbiano le proporzioni indicate e che la pianta abbia l'edificio centrale, i raggi, gli anelli e almeno tre zone.
