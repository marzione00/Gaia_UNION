---
unit: biology-18
titolo: Estremofili
sottotitolo: Caldo, freddo, sale, acidità, pressione e radiazione: i limiti della vita conosciuta e che cosa insegnano sugli altri mondi
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §1.3, 9.4; J. R. Morris et al., Biology: How Life Works, 2ª ed., §26.4, 26.5
---

## Prima di cominciare {#apertura}

Nel 1956, in un laboratorio dell'Oregon, alcune scatolette di carne furono sterilizzate con dosi di raggi gamma migliaia di volte superiori a quelle letali per un essere umano. Dopo qualche tempo la carne andò a male lo stesso. Il responsabile era un batterio sopravvissuto all'irradiazione, oggi chiamato *Deinococcus radiodurans*, capace di resistere a dosi di radiazione che frammentano il suo DNA in centinaia di pezzi e di ricostruirlo in poche ore. Pochi anni dopo, nel 1966, Thomas Brock trovò batteri che crescevano nelle sorgenti calde del parco di Yellowstone a temperature vicine all'ebollizione; uno di essi, *Thermus aquaticus*, fornì l'enzima che rese possibile la moltiplicazione del DNA in laboratorio.

Da allora si sono scoperti organismi che vivono sopra i cento gradi, nei sedimenti marini a chilometri di profondità, nell'acqua satura di sale, in acque acide come il succo gastrico, nelle vene di salamoia del permafrost. Questi organismi sono chiamati **estremofili**. Il termine è antropocentrico: un batterio che cresce a cento gradi muore a temperatura ambiente, e per lui l'ambiente estremo è il nostro.

Per l'astrobiologia gli estremofili sono essenziali per due ragioni. Mostrano i limiti fisici e chimici entro cui la vita terrestre funziona, e quindi quali ambienti di altri pianeti potrebbero ospitarla. Mostrano anche quali organismi potrebbero sopravvivere a un viaggio nello spazio, sulle sonde o nelle rocce, un problema che riguarda sia la panspermia sia la protezione planetaria.

::: obiettivi
- classificare gli estremofili in base al fattore ambientale a cui sono adattati;
- spiegare con quali adattamenti molecolari le cellule resistono al calore, al freddo, al sale, all'acidità e alla pressione;
- usare l'attività dell'acqua e la temperatura di ebollizione sotto pressione per discutere i limiti della vita;
- descrivere l'inattivazione da radiazione con la dose decimale e calcolare la frazione sopravvissuta;
- distinguere la crescita dalla sopravvivenza in stato di quiescenza;
- confrontare i limiti della vita terrestre con le condizioni di Marte e delle lune ghiacciate.
:::

Il capitolo usa il pH del capitolo [Acidi, basi e pH](unit:chemistry-21), la pressione del capitolo [Fluidi e pressione](unit:physics-14) e le transizioni di fase del capitolo [Stati della materia e transizioni](unit:chemistry-11).

## Che cosa vuol dire estremo {#definizioni}

Gli estremofili si classificano in base al fattore ambientale a cui sono adattati. Le definizioni usate più spesso sono queste.

| Nome | Ambiente | Criterio indicativo |
|---|---|---|
| ipertermofilo | caldo | crescita ottimale a $80\ ^\circ\mathrm C$ o più |
| termofilo | caldo | crescita ottimale fra $45$ e $80\ ^\circ\mathrm C$ |
| psicrofilo | freddo | crescita ottimale sotto $15\ ^\circ\mathrm C$ |
| alofilo | salato | richiede almeno $0{,}2$ mol/L di sale |
| acidofilo | acido | crescita ottimale a pH $3$ o meno |
| alcalofilo | basico | crescita ottimale a pH $9$ o più |
| piezofilo | alta pressione | crescita più rapida sopra $10$ MPa |
| xerofilo | secco | crescita a bassa attività dell'acqua |
| radiotollerante | radiazione | resistenza a dosi elevate di radiazione ionizzante |

Per la temperatura i gruppi si dispongono lungo un intervallo di quasi centoquaranta gradi (figura 1).

::: figura temperatura
{"w":820,"h":262,"items":[{"t":"text","p":[186,54],"s":"psicrofili","c":"force2","size":12,"a":"end"},{"t":"rect","p":[220.0,41,140.0,18],"c":"force2","r":3},{"t":"text","p":[186,94],"s":"mesofili","c":"force3","size":12,"a":"end"},{"t":"rect","p":[320.0,81,148.0,18],"c":"force3","r":3},{"t":"text","p":[186,134],"s":"termofili","c":"force4","size":12,"a":"end"},{"t":"rect","p":[440.0,121,160.0,18],"c":"force4","r":3},{"t":"text","p":[186,174],"s":"ipertermofili","c":"force","size":12,"a":"end"},{"t":"rect","p":[540.0,161,228.0,18],"c":"force","r":3},{"t":"line","p":[200.0,205,800.0,205],"c":"ax","w":1.4},{"t":"line","p":[200.0,205,200.0,211],"c":"ax","w":1.2},{"t":"text","p":[200.0,227],"s":"−20","c":"muted","size":10},{"t":"line","p":[280.0,205,280.0,211],"c":"ax","w":1.2},{"t":"text","p":[280.0,227],"s":"0","c":"muted","size":10},{"t":"line","p":[360.0,205,360.0,211],"c":"ax","w":1.2},{"t":"text","p":[360.0,227],"s":"20","c":"muted","size":10},{"t":"line","p":[440.0,205,440.0,211],"c":"ax","w":1.2},{"t":"text","p":[440.0,227],"s":"40","c":"muted","size":10},{"t":"line","p":[520.0,205,520.0,211],"c":"ax","w":1.2},{"t":"text","p":[520.0,227],"s":"60","c":"muted","size":10},{"t":"line","p":[600.0,205,600.0,211],"c":"ax","w":1.2},{"t":"text","p":[600.0,227],"s":"80","c":"muted","size":10},{"t":"line","p":[680.0,205,680.0,211],"c":"ax","w":1.2},{"t":"text","p":[680.0,227],"s":"100","c":"muted","size":10},{"t":"line","p":[760.0,205,760.0,211],"c":"ax","w":1.2},{"t":"text","p":[760.0,227],"s":"120","c":"muted","size":10},{"t":"text","p":[500.0,248],"s":"temperatura di crescita, °C","c":"ax","size":11},{"t":"line","p":[220.0,28,220.0,196],"c":"muted","w":1,"dash":true},{"t":"text","p":[220.0,22],"s":"−15 °C","c":"muted","size":10},{"t":"line","p":[768.0,28,768.0,196],"c":"muted","w":1,"dash":true},{"t":"text","p":[768.0,22],"s":"122 °C","c":"muted","size":10},{"t":"line","p":[280.0,28,280.0,196],"c":"force2","w":1,"dash":true},{"t":"text","p":[280.0,22],"s":"0 °C","c":"force2","size":10},{"t":"line","p":[680.0,28,680.0,196],"c":"force4","w":1,"dash":true},{"t":"text","p":[680.0,22],"s":"100 °C","c":"force4","size":10}]}
---
Intervalli tipici di temperatura di crescita dei quattro gruppi termici, in forma schematica. Le linee tratteggiate esterne indicano i limiti di crescita documentati, $-15$ e $122\ ^\circ\mathrm C$; quelle interne il congelamento e l'ebollizione dell'acqua a pressione atmosferica.
:::

Conviene distinguere fra **estremofili**, che richiedono la condizione estrema per crescere al meglio, ed **estremotolleranti**, che la sopportano senza preferirla. *Deinococcus radiodurans* è radiotollerante: cresce benissimo senza radiazione, che non esiste in natura alle dosi a cui resiste. Molti organismi sono **poliestremofili**, adattati a più fattori insieme: gli archei delle sorgenti acide calde vivono a pH $2$ e a $80\ ^\circ\mathrm C$, molti alofili sopportano anche una forte radiazione ultravioletta.

Una seconda distinzione è fra **crescita** e **sopravvivenza**. Un organismo cresce quando si moltiplica; sopravvive quando resta vivo, magari in uno stato di quiescenza, senza moltiplicarsi, e può riprendere a crescere quando le condizioni migliorano. I limiti di sopravvivenza sono molto più larghi di quelli di crescita: le spore batteriche sopravvivono a condizioni nelle quali nessuna cellula potrebbe dividersi. Per l'abitabilità di un pianeta contano i limiti di crescita; per il trasporto della vita da un mondo all'altro contano quelli di sopravvivenza.

## Vivere nel caldo {#caldo}

Gli organismi che crescono meglio sopra gli ottanta gradi sono quasi tutti archei, insieme a pochi batteri come *Aquifex* e *Thermotoga*, e vivono nelle sorgenti idrotermali sottomarine e terrestri. Il record di temperatura di crescita appartiene a un ceppo dell'archeo metanogeno *Methanopyrus kandleri*, isolato da una sorgente idrotermale della dorsale centrale dell'Oceano Indiano, che nel 2008 si dimostrò capace di moltiplicarsi a $122\ ^\circ\mathrm C$ sotto una pressione di $20$ MPa. *Pyrolobus fumarii* cresce fino a $113\ ^\circ\mathrm C$ e sopravvive per un'ora in autoclave a $121\ ^\circ\mathrm C$, la temperatura usata per sterilizzare gli strumenti medici.

Il calore minaccia tutte le molecole della cellula. Le proteine si srotolano, le membrane diventano troppo fluide e lasciano passare i protoni, il DNA si separa nei due filamenti, e piccole molecole come l'ATP si idrolizzano spontaneamente in pochi minuti. Gli ipertermofili rispondono con molti adattamenti.

- **Proteine più rigide.** Le loro proteine hanno più legami ionici fra amminoacidi carichi, nuclei idrofobi più compatti e meno anse flessibili. Molecole chiamate **chaperonine** aiutano a ripiegare quelle che si srotolano.
- **Membrane di lipidi diversi.** Le membrane degli archei sono fatte di lipidi con legami etere, più resistenti all'idrolisi dei legami estere dei batteri, e in molti ipertermofili le catene dei lipidi attraversano l'intera membrana, formando un singolo strato invece di due.
- **DNA protetto.** Molti ipertermofili possiedono la girasi inversa, un enzima che avvolge il DNA in senso opposto al normale e lo rende più difficile da separare, e proteine che lo legano e lo stabilizzano.

Il limite superiore della vita non è noto con certezza. Nel 2003 un archeo chiamato «ceppo 121» fu descritto come capace di crescere a $121\ ^\circ\mathrm C$ e di sopravvivere a $130\ ^\circ\mathrm C$, ma il risultato non è stato confermato da altri laboratori. Molti ricercatori stimano che il limite si collochi fra $120$ e $150\ ^\circ\mathrm C$, la temperatura oltre la quale l'ATP e altre piccole molecole essenziali si decompongono più in fretta di quanto una cellula possa ricostruirle.

Per vivere a $122\ ^\circ\mathrm C$ serve acqua liquida, e l'acqua resta liquida sopra i cento gradi solo sotto pressione. La temperatura di ebollizione cresce con la pressione: circa $180\ ^\circ\mathrm C$ a $1$ MPa, $264\ ^\circ\mathrm C$ a $5$ MPa, $311\ ^\circ\mathrm C$ a $10$ MPa (figura 2). In mare la pressione aumenta di circa $1$ MPa ogni cento metri, e sotto circa $2{,}2$ chilometri supera la pressione critica dell'acqua, $22{,}1$ MPa, oltre la quale la distinzione fra liquido e vapore scompare. Per questo le sorgenti idrotermali profonde emettono fluidi a $350$ o $400\ ^\circ\mathrm C$ senza bollire.

::: figura ebollizione
{"w":880,"h":330,"items":[{"t":"rect","p":[80,206.8,600,73.2],"c":"muted","r":0},{"t":"axes","o":[80,280],"x":[780,"pressione, MPa"],"y":[260,"temperatura, °C"],"sx":24,"sy":0.6,"xt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"]],"yt":[[0,"0"],[100,"100"],[200,"200"],[300,"300"],[400,"400"]]},{"t":"plot","o":[80,280],"sx":24,"sy":0.6,"pts":[[0.1013,100.0],[0.5,151.8],[1,179.9],[2,212.4],[5,263.9],[8.6,300.0],[10,311.0],[15,342.2],[20,365.8],[22.064,373.95]],"c":"force2","w":2.6},{"t":"circle","p":[609.5,55.6,5],"c":"force"},{"t":"text","p":[599.5,49.6],"s":"punto critico","c":"force","size":11,"a":"end"},{"t":"text","p":[368,130.0],"s":"liquido","c":"ax","size":12},{"t":"text","p":[176,82.0],"s":"vapore","c":"ax","size":12},{"t":"text","p":[89.6,200.8],"s":"crescita osservata: fino a 122 °C","c":"ax","size":11,"a":"start"},{"t":"text","p":[200,314.0],"s":"≈ 0,5 km","c":"muted","size":10},{"t":"text","p":[320,314.0],"s":"≈ 1 km","c":"muted","size":10},{"t":"text","p":[440,314.0],"s":"≈ 1,5 km","c":"muted","size":10},{"t":"text","p":[560,314.0],"s":"≈ 2 km","c":"muted","size":10}]}
---
Temperatura di ebollizione dell'acqua in funzione della pressione, con la profondità oceanica corrispondente. Le regioni sopra la curva sono di vapore, quelle sotto di liquido; la curva termina nel punto critico, a $22{,}1$ MPa e $374\ ^\circ\mathrm C$. La fascia colorata indica le temperature a cui è stata osservata la crescita di microrganismi.
:::

::: esempio Quanto è profonda una sorgente a 300 gradi
Una sorgente emette acqua liquida a $300\ ^\circ\mathrm C$. Dalla curva di ebollizione, l'acqua resta liquida a questa temperatura se la pressione supera circa $8{,}6$ MPa. In mare la pressione cresce di $\rho g\approx1025\cdot9{,}81\approx1{,}0\cdot10^4$ Pa per metro, e quindi la sorgente deve trovarsi a più di

$$h\approx\frac{8{,}6\cdot10^6-1{,}0\cdot10^5}{1{,}0\cdot10^4}\ \mathrm m\approx850\ \mathrm m$$

di profondità. Più in alto il fluido bollirebbe nella risalita, come accade nei geyser.
:::

## Vivere nel freddo {#freddo}

Più di tre quarti della biosfera terrestre si trova stabilmente sotto i cinque gradi: gli oceani profondi, le regioni polari, il permafrost, i ghiacciai, l'atmosfera alta. Il freddo rallenta tutte le reazioni chimiche, irrigidisce le membrane e, soprattutto, trasforma l'acqua in ghiaccio, i cui cristalli possono lacerare le cellule.

Gli **psicrofili** compensano in vari modi. Le loro membrane contengono più acidi grassi insaturi o ramificati, che restano fluide a bassa temperatura, come l'olio di semi resta liquido in frigorifero mentre il burro si indurisce. I loro enzimi hanno strutture più flessibili, che lavorano anche quando l'agitazione termica è scarsa. Molti producono proteine **anticongelanti**, che si legano ai piccoli cristalli di ghiaccio e ne impediscono la crescita, e accumulano soluti come zuccheri e amminoacidi che abbassano il punto di congelamento del citoplasma.

Il limite inferiore della crescita è fissato soprattutto dalla disponibilità di acqua liquida. Nel ghiaccio marino e nel permafrost l'acqua liquida sopravvive in sottili vene di salamoia fra i cristalli, perché il sale ne abbassa il punto di congelamento. Nel 2013 Nadia Mykytczuk e collaboratori descrissero il batterio *Planococcus halocryophilus*, isolato dal permafrost dell'Artico canadese, capace di dividersi a $-15\ ^\circ\mathrm C$, la temperatura più bassa documentata per la crescita, e di mantenere un'attività metabolica a $-25\ ^\circ\mathrm C$.

::: approfondimento Il lago che non gela
Nelle Valli Secche dell'Antartide, una delle regioni più fredde e aride della Terra, si trova lo stagno Don Juan, profondo una decina di centimetri e così ricco di cloruro di calcio da restare liquido anche a $-50\ ^\circ\mathrm C$. È uno dei luoghi più simili alle salamoie che potrebbero formarsi oggi sulla superficie di Marte. Se nello stagno vivano microrganismi attivi è ancora discusso: attorno c'è vita microbica, ma nell'acqua stessa le prove sono ambigue. Il caso mostra che l'acqua liquida è necessaria per la vita, e che può non bastare quando è troppo salata.
:::

## Acqua disponibile: sale e siccità {#sale}

Una cellula ha bisogno di acqua liquida, e l'acqua deve essere disponibile, cioè non trattenuta troppo saldamente dai soluti. La grandezza che misura questa disponibilità è l'**attività dell'acqua**.

::: definizione Attività dell'acqua
L'attività dell'acqua $a_w$ di una soluzione o di un materiale è il rapporto fra la pressione del vapore acqueo in equilibrio con esso e quella dell'acqua pura alla stessa temperatura:

$$a_w=\frac{p}{p_0}.$$

Vale $1$ per l'acqua pura e diminuisce quando l'acqua è legata da soluti o superfici; coincide con l'umidità relativa dell'aria in equilibrio con il campione.
:::

Per una soluzione ideale l'attività dell'acqua è uguale alla frazione molare dell'acqua, come prevede la legge di Raoult. Un litro di acqua contiene circa $55{,}5$ moli di molecole; sciogliendovi una mole di cloruro di sodio, che si separa in due moli di ioni, la frazione molare dell'acqua diventa $55{,}5/57{,}5\approx0{,}965$. Le soluzioni reali concentrate si discostano dal comportamento ideale: una soluzione satura di cloruro di sodio ha $a_w\approx0{,}75$, più bassa di quanto prevede la legge di Raoult (figura 3).

::: figura acqua
{"w":780,"h":210,"items":[{"t":"line","p":[60.0,150,760.0,150],"c":"ax","w":1.6},{"t":"line","p":[60.0,150,60.0,157],"c":"ax","w":1.2},{"t":"text","p":[60.0,173],"s":"0,5","c":"muted","size":10},{"t":"line","p":[200.0,150,200.0,157],"c":"ax","w":1.2},{"t":"text","p":[200.0,173],"s":"0,6","c":"muted","size":10},{"t":"line","p":[340.0,150,340.0,157],"c":"ax","w":1.2},{"t":"text","p":[340.0,173],"s":"0,7","c":"muted","size":10},{"t":"line","p":[480.0,150,480.0,157],"c":"ax","w":1.2},{"t":"text","p":[480.0,173],"s":"0,8","c":"muted","size":10},{"t":"line","p":[620.0,150,620.0,157],"c":"ax","w":1.2},{"t":"text","p":[620.0,173],"s":"0,9","c":"muted","size":10},{"t":"line","p":[760.0,150,760.0,157],"c":"ax","w":1.2},{"t":"text","p":[760.0,173],"s":"1,0","c":"muted","size":10},{"t":"text","p":[410.0,196],"s":"attività dell'acqua","c":"ax","size":11},{"t":"rect","p":[417.0,112,343.0,12],"c":"force2","r":2},{"t":"text","p":[411.0,122],"s":"procarioti alofili","c":"force2","size":11,"a":"end"},{"t":"rect","p":[214.0,86,546.0,12],"c":"force3","r":2},{"t":"text","p":[208.0,96],"s":"muffe xerofile","c":"force3","size":11,"a":"end"},{"t":"line","p":[760.0,46,760.0,146],"c":"muted","w":1,"dash":true},{"t":"text","p":[758.0,40],"s":"acqua pura","c":"ax","size":11,"a":"end"},{"t":"line","p":[732.0,64,732.0,146],"c":"muted","w":1,"dash":true},{"t":"text","p":[730.0,58],"s":"acqua di mare","c":"ax","size":11,"a":"end"},{"t":"line","p":[620.0,46,620.0,146],"c":"muted","w":1,"dash":true},{"t":"text","p":[620.0,40],"s":"limite del lievito comune","c":"ax","size":11},{"t":"line","p":[417.0,64,417.0,146],"c":"muted","w":1,"dash":true},{"t":"text","p":[417.0,58],"s":"sale saturo","c":"ax","size":11},{"t":"line","p":[200.0,46,200.0,146],"c":"muted","w":1,"dash":true},{"t":"text","p":[200.0,40],"s":"miele","c":"ax","size":11},{"t":"line","p":[60.0,64,60.0,146],"c":"muted","w":1,"dash":true},{"t":"text","p":[66.0,58],"s":"regioni speciali","c":"ax","size":11,"a":"start"}]}
---
Scala dell'attività dell'acqua, con alcuni materiali e i limiti di crescita dei gruppi di microrganismi più tolleranti. Sotto circa $0{,}6$ nessun organismo conosciuto si moltiplica, anche se molti sopravvivono in stato di quiescenza.
:::

Quando l'attività dell'acqua esterna è bassa, l'acqua tende a uscire dalla cellula per osmosi, e la cellula si disidrata. Gli **alofili** usano due strategie. Gli archei alofili del gruppo degli Haloarchaea accumulano nel citoplasma cloruro di potassio in concentrazioni paragonabili a quelle del sale esterno; per resistere a questa concentrazione, le loro proteine hanno superfici ricche di amminoacidi acidi, carichi negativamente, che le mantengono idratate e che le farebbero precipitare in acqua dolce. Molti batteri e alghe accumulano invece **soluti compatibili**, piccole molecole organiche come la glicina betaina, l'ectoina o il glicerolo, che bilanciano la pressione osmotica senza disturbare le proteine.

I procarioti più alofili si moltiplicano nel sale saturo, ad attività dell'acqua $0{,}755$; uno studio del 2015 guidato da Andrew Stevenson e John Hallsworth ha stimato per estrapolazione limiti teorici fino a $0{,}611$ per i più tolleranti. Alcune muffe xerofile, che crescono su marmellate e frutta secca, si moltiplicano a valori di poco superiori a $0{,}6$. Gli autori suggeriscono che esista un limite comune per i tre domini, fissato dalla fisica dell'acqua e delle macromolecole, intorno a $0{,}6$.

## Vivere nell'acido e nella base {#ph}

Il pH degli ambienti naturali va da valori negativi, in alcune acque di miniera ricche di acido solforico, fino a $12$ e oltre in laghi alcalini e in sorgenti che attraversano rocce del mantello. Le cellule, però, mantengono il proprio citoplasma vicino alla neutralità, perché molti enzimi e il DNA si danneggiano a pH estremi; anche il sangue umano è regolato in un intervallo strettissimo, fra $7{,}35$ e $7{,}45$.

Gli **acidofili** estremi vivono in acque in cui la concentrazione di ioni idrogeno è milioni di volte quella del loro citoplasma. L'archeo *Picrophilus torridus*, isolato da suoli vulcanici giapponesi, cresce a pH $0$, con un ottimo a pH $0{,}7$ e a $60\ ^\circ\mathrm C$, mantenendo il citoplasma intorno a pH $4{,}6$. Le membrane degli acidofili sono pochissimo permeabili ai protoni, e molti invertono il potenziale elettrico della membrana, rendendo positivo l'interno per respingere gli ioni idrogeno. Il fiume Tinto, in Spagna, con acque rosse di ferro a pH vicino a $2$, è studiato come analogo degli antichi ambienti acidi e ferrosi di Marte.

::: esempio Il salto di pH attraverso una membrana
Un acidofilo vive a pH $1{,}0$ e mantiene il citoplasma a pH $6{,}0$. La differenza è di $5$ unità di pH, quindi la concentrazione di ioni idrogeno fuori è $10^5$, centomila volte, quella dentro. Il gradiente spinge i protoni ad entrare, e la cellula deve spendere energia per espellerli; ma è anche una risorsa, perché il flusso dei protoni attraverso l'ATP sintasi produce ATP, come si vede nel capitolo [Respirazione, fermentazione e chemiosintesi](unit:biology-19).
:::

Gli **alcalofili** affrontano il problema opposto: fuori i protoni scarseggiano, e la cellula deve trattenerli o usare ioni sodio al loro posto per produrre energia. *Alkaliphilus transvaalensis*, isolato dalle acque di una miniera d'oro sudafricana a più di tre chilometri di profondità, cresce fino a pH $12{,}5$.

## Vivere sotto pressione {#pressione}

La pressione aumenta di circa $10$ MPa ogni chilometro di profondità oceanica. Nella fossa delle Marianne, a quasi $11$ chilometri, supera i $110$ MPa, più di mille volte quella atmosferica. Tre quarti del volume degli oceani si trovano sopra i $10$ MPa, la soglia oltre la quale si parla di alta pressione. La pressione cresce in modo quasi lineare con la profondità (figura 4).

::: figura pressione
{"w":880,"h":305,"items":[{"t":"axes","o":[80,270],"x":[780,"profondità nell'oceano, km"],"y":[250,"pressione, MPa"],"sx":55,"sy":1.6,"xt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"],[12,"12"]],"yt":[[0,"0"],[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"],[120,"120"],[140,"140"]]},{"t":"plot","o":[80,270],"sx":55,"sy":1.6,"pts":[[0.0,0.1],[0.1,1.106],[0.2,2.112],[0.3,3.118],[0.4,4.124],[0.5,5.13],[0.6,6.136],[0.7,7.142],[0.8,8.148],[0.9,9.154],[1.0,10.16],[1.1,11.166],[1.2,12.172],[1.3,13.178],[1.4,14.184],[1.5,15.19],[1.6,16.196],[1.7,17.202],[1.8,18.208],[1.9,19.214],[2.0,20.22],[2.1,21.226],[2.2,22.232],[2.3,23.238],[2.4,24.244],[2.5,25.25],[2.6,26.256],[2.7,27.262],[2.8,28.268],[2.9,29.274],[3.0,30.28],[3.1,31.286],[3.2,32.292],[3.3,33.298],[3.4,34.304],[3.5,35.31],[3.6,36.316],[3.7,37.322],[3.8,38.328],[3.9,39.334],[4.0,40.34],[4.1,41.346],[4.2,42.352],[4.3,43.358],[4.4,44.364],[4.5,45.37],[4.6,46.376],[4.7,47.382],[4.8,48.388],[4.9,49.394],[5.0,50.4],[5.1,51.406],[5.2,52.412],[5.3,53.418],[5.4,54.424],[5.5,55.43],[5.6,56.436],[5.7,57.442],[5.8,58.448],[5.9,59.454],[6.0,60.46],[6.1,61.466],[6.2,62.472],[6.3,63.478],[6.4,64.484],[6.5,65.49],[6.6,66.496],[6.7,67.502],[6.8,68.508],[6.9,69.514],[7.0,70.52],[7.1,71.526],[7.2,72.532],[7.3,73.538],[7.4,74.544],[7.5,75.55],[7.6,76.556],[7.7,77.562],[7.8,78.568],[7.9,79.574],[8.0,80.58],[8.1,81.586],[8.2,82.592],[8.3,83.598],[8.4,84.604],[8.5,85.61],[8.6,86.616],[8.7,87.622],[8.8,88.628],[8.9,89.634],[9.0,90.64],[9.1,91.646],[9.2,92.652],[9.3,93.658],[9.4,94.664],[9.5,95.67],[9.6,96.676],[9.7,97.682],[9.8,98.688],[9.9,99.694],[10.0,100.7],[10.1,101.706],[10.2,102.712],[10.3,103.718],[10.4,104.724],[10.5,105.73],[10.6,106.736],[10.7,107.742],[10.8,108.748],[10.9,109.754],[11.0,110.76],[11.1,111.766],[11.2,112.772],[11.3,113.778],[11.4,114.784],[11.5,115.79],[11.6,116.796],[11.7,117.802],[11.8,118.808],[11.9,119.814],[12.0,120.82]],"c":"force2","w":2.6},{"t":"line","p":[80,62.0,740,62.0],"c":"force","w":1.2,"dash":true},{"t":"text","p":[91.0,56.0],"s":"limite di crescita, 130 MPa","c":"force","size":11,"a":"start"},{"t":"circle","p":[217.5,229.6,5],"c":"force4"},{"t":"text","p":[227.5,243.6],"s":"sorgenti idrotermali tipiche","c":"force4","size":11,"a":"start"},{"t":"circle","p":[352.8,190.0,5],"c":"force4"},{"t":"text","p":[362.8,204.0],"s":"Thermococcus piezophilus, 50 MPa","c":"force4","size":11,"a":"start"},{"t":"circle","p":[679.5,94.4,5],"c":"force4"},{"t":"text","p":[669.5,86.4],"s":"fossa delle Marianne","c":"force4","size":11,"a":"end"}]}
---
Pressione in funzione della profondità nell'oceano, con alcuni ambienti citati nel testo. La linea tratteggiata indica la pressione più alta a cui è stata osservata la crescita di un microrganismo.
:::

La pressione agisce sulla vita perché favorisce gli stati che occupano meno volume, secondo il principio di Le Chatelier del capitolo [Equilibrio chimico](unit:chemistry-19). Comprime le membrane, che diventano meno fluide, e può spingere le proteine a srotolarsi o a dissociarsi, perché la proteina srotolata, con l'acqua che la circonda, occupa talvolta un volume minore. I **piezofili** hanno membrane ricche di acidi grassi insaturi, proteine meno sensibili alla compressione e accumulano soluti che stabilizzano le proteine.

Il record di pressione per la crescita appartiene a *Thermococcus piezophilus*, un archeo isolato nel 2016 da una sorgente idrotermale del Mar dei Caraibi a quasi cinque chilometri di profondità, che cresce al meglio a $50$ MPa e $75\ ^\circ\mathrm C$, si moltiplica bene fino ad almeno $120$ MPa e con difficoltà fino a $130$ MPa.

::: nota La biosfera profonda
La vita non si ferma al fondo del mare. Microrganismi attivi sono stati trovati nei sedimenti marini fino a circa $2{,}5$ chilometri sotto il fondale, nelle acque di miniere profonde più di tre chilometri, nelle fratture di rocce a temperature di decine di gradi. Le stime più recenti indicano che i microrganismi del sottosuolo continentale e marino contengono una frazione rilevante di tutta la biomassa microbica della Terra. Questi ecosistemi vivono lentissimamente, con tempi di rinnovo delle cellule di anni o secoli, e ricavano energia da reazioni fra le rocce e l'acqua: sono il modello più vicino a ciò che potrebbe esistere sotto la superficie di Marte.
:::

## Resistere alla radiazione {#radiazione}

La radiazione ionizzante, cioè raggi gamma, raggi X e particelle cariche veloci, cede energia alla materia che attraversa e spezza le molecole, direttamente o producendo radicali reattivi dalla scissione dell'acqua. La quantità di energia assorbita si misura in **gray**: $1\ \mathrm{Gy}$ corrisponde a un joule assorbito da un chilogrammo di materia. Per un essere umano una dose di circa $4$ o $5\ \mathrm{Gy}$ ricevuta in breve tempo è letale nella metà dei casi senza cure.

I microrganismi sono molto più resistenti, e la loro sensibilità si misura con la **dose decimale** $D_{10}$, la dose che riduce di dieci volte il numero di cellule capaci di riprodursi. Se ogni dose uguale uccide la stessa frazione delle cellule ancora vive, la sopravvivenza decresce in modo esponenziale, come il decadimento radioattivo del capitolo [Le prime tracce della vita e il tempo geologico](unit:biology-16).

::: legge Sopravvivenza alla radiazione
Con dose decimale $D_{10}$ costante, la frazione $S$ di cellule sopravvissute dopo una dose $D$ è

$$S=10^{-D/D_{10}},$$

cioè

$$\log_{10}S=-\frac{D}{D_{10}}.$$

Ogni dose $D_{10}$ toglie un fattore dieci; il logaritmo della sopravvivenza decresce linearmente con la dose.
:::

Per i batteri comuni la dose decimale è dell'ordine di qualche centinaio di gray: per *Escherichia coli* circa $0{,}3$ kGy. Le spore batteriche hanno in media $D_{10}$ di circa $2$ kGy. *Deinococcus radiodurans* sopporta $5$ kGy quasi senza perdite, e la sua dose decimale media è intorno a $10$ kGy (figura 5). Le curve reali mostrano spesso una **spalla** iniziale, un tratto di dosi basse in cui la sopravvivenza diminuisce poco perché i danni vengono riparati, seguito dal tratto esponenziale.

::: figura sopravvivenza
{"w":880,"h":305,"items":[{"t":"axes","o":[90,270],"x":[760,"dose, kGy"],"y":[250,"frazione sopravvissuta"],"sx":20,"sy":22,"xt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"],[30,"30"]],"yt":[[10,"1"],[8,"10⁻²"],[6,"10⁻⁴"],[4,"10⁻⁶"],[2,"10⁻⁸"],[0,"10⁻¹⁰"]]},{"t":"plot","o":[90,270],"sx":20,"sy":22,"pts":[[0,10],[3.0,0.0]],"c":"force","w":2.6},{"t":"plot","o":[90,270],"sx":20,"sy":22,"pts":[[0,10],[20,0.0]],"c":"force3","w":2.6},{"t":"plot","o":[90,270],"sx":20,"sy":22,"pts":[[0,10],[30,7.0]],"c":"force2","w":2.6},{"t":"text","p":[158,268],"s":"batterio comune, 0,3 kGy","c":"force","size":11,"a":"start"},{"t":"text","p":[498,268],"s":"spore, 2 kGy","c":"force3","size":11,"a":"start"},{"t":"text","p":[686,134],"s":"Deinococcus, 10 kGy","c":"force2","size":11,"a":"end"}]}
---
Frazione sopravvissuta in funzione della dose, su scala logaritmica, per tre valori di dose decimale tipici di un batterio comune, delle spore batteriche e di *Deinococcus radiodurans*. Nel modello esponenziale le curve sono rette, con pendenza $-1/D_{10}$.
:::

::: esempio Dieci kilogray
Con $D_{10}=0{,}3$ kGy, una dose di $3$ kGy riduce i sopravvissuti di $10^{3/0{,}3}=10^{10}$ volte: di dieci miliardi di cellule ne resta, in media, una. Con $D_{10}=10$ kGy, la stessa dose lascia $10^{-0{,}3}\approx0{,}5$, la metà delle cellule. Una dose di $10$ kGy, letale per qualsiasi animale, ridurrebbe *Escherichia coli* di più di trenta ordini di grandezza e *Deinococcus* di uno solo.
:::

La resistenza di *Deinococcus* ha più cause. Ogni cellula contiene da quattro a dieci copie del genoma, così che un tratto danneggiato in una copia può essere ricostruito copiando le altre; il genoma frammentato in centinaia di pezzi viene riassemblato in poche ore da un sistema di riparazione molto efficiente. Gli studi di Michael Daly e collaboratori hanno mostrato che conta soprattutto la protezione delle proteine: la cellula accumula complessi di manganese che neutralizzano i radicali dell'ossigeno, e così gli enzimi di riparazione restano funzionanti anche dopo dosi enormi. In un batterio sensibile il DNA può essere riparabile, ma gli enzimi che dovrebbero ripararlo sono già danneggiati.

In natura non esistono dosi di radiazione come quelle a cui *Deinococcus* resiste. La spiegazione più accettata è che la resistenza sia un effetto collaterale dell'adattamento al disseccamento, che produce danni simili: le cellule secche accumulano rotture del DNA e proteine ossidate, e devono ripararle quando l'acqua ritorna.

## Sopravvivere senza crescere {#quiescenza}

Molti organismi superano le condizioni avverse sospendendo la propria attività. Le **endospore** di batteri come *Bacillus* e *Clostridium* sono cellule a riposo con un nucleo disidratato, ricco di acido dipicolinico legato al calcio, e con il DNA rivestito da piccole proteine che lo proteggono. Sopravvivono all'ebollizione, al disseccamento, a molti disinfettanti, e possono germinare dopo decenni.

I **tardigradi**, animali di mezzo millimetro che vivono nei muschi, sopportano la perdita quasi completa dell'acqua ritraendosi in una forma compatta, chiamata barilotto, in cui il metabolismo diventa irrilevabile. In questo stato di **anidrobiosi** le loro cellule sono protette da zuccheri come il trealosio e da proteine prive di struttura fissa, che formano una sorta di vetro attorno alle molecole delicate. Nel 2007 alcuni tardigradi esposti per dieci giorni al vuoto dello spazio, a bordo di un satellite in orbita bassa, sopravvissero e si riprodussero dopo il ritorno; l'esposizione diretta alla radiazione ultravioletta solare ne uccise però la maggior parte.

Gli esperimenti nello spazio hanno misurato la resistenza delle spore. Sul satellite LDEF della NASA, rimasto in orbita per quasi sei anni fra il 1984 e il 1990, spore di *Bacillus subtilis* protette dalla luce solare sopravvissero fino all'$80\%$; la radiazione ultravioletta solare, senza protezione, ridusse la sopravvivenza di quattro ordini di grandezza o più. Il nemico principale delle spore nello spazio è la luce ultravioletta, più della radiazione cosmica o del vuoto.

::: storia Spore di milioni di anni?
Nel 1995 Raúl Cano e Monica Borucki annunciarono di aver fatto germinare spore di *Bacillus* conservate nell'intestino di api fossili nell'ambra, di età compresa fra $25$ e $40$ milioni di anni. Nel 2000 un altro gruppo riferì un batterio rivitalizzato da un cristallo di sale di $250$ milioni di anni. Entrambi i risultati sono molto discussi: i geni dei batteri rivitalizzati sono quasi identici a quelli di specie attuali, cosa difficile da spiegare dopo tanti milioni di anni di evoluzione separata, e una contaminazione durante l'estrazione non si può escludere. Sono buoni esempi di affermazioni straordinarie che richiedono prove straordinarie, come quelle sulle tracce di vita più antiche.
:::

## I limiti della vita conosciuta {#limiti}

La tabella raccoglie i valori estremi a cui è stata osservata la crescita, cioè la moltiplicazione, di un organismo. I limiti di sopravvivenza sono molto più larghi.

| Fattore | Limite di crescita | Organismo |
|---|---|---|
| temperatura massima | $122\ ^\circ\mathrm C$ | *Methanopyrus kandleri* |
| temperatura minima | $-15\ ^\circ\mathrm C$ | *Planococcus halocryophilus* |
| pH minimo | $0$ | *Picrophilus torridus* |
| pH massimo | $12{,}5$ | *Alkaliphilus transvaalensis* |
| pressione | $130$ MPa | *Thermococcus piezophilus* |
| attività dell'acqua | $0{,}755$ per i procarioti, circa $0{,}6$ per alcune muffe | alofili, muffe xerofile |

Ogni limite è stato raggiunto in condizioni favorevoli per gli altri fattori: il record di temperatura è stato misurato con abbondante acqua, pH neutro e nutrienti, quello di pressione a temperature ottimali. Combinare più fattori estremi restringe molto l'intervallo. Per questo, più di una lista di record, è utile un diagramma che mostri dove vivono realmente gli organismi (figura 6).

::: figura mappa
{"w":860,"h":320,"items":[{"t":"axes","o":[90,280],"x":[730,"temperatura ottimale, °C"],"y":[260,"pH ottimale"],"sx":3.6,"sy":18,"xt":[[0,"−20"],[20,"0"],[40,"20"],[60,"40"],[80,"60"],[100,"80"],[120,"100"],[140,"120"]],"yt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"],[12,"12"]]},{"t":"line","p":[108.0,280,108.0,46],"c":"muted","w":1,"dash":true},{"t":"line","p":[601.2,280,601.2,46],"c":"muted","w":1,"dash":true},{"t":"line","p":[90.0,280,630.0,280],"c":"muted","w":1,"dash":true},{"t":"line","p":[90.0,55.0,630.0,55.0],"c":"muted","w":1,"dash":true},{"t":"circle","p":[378.0,267.4,5],"c":"force"},{"t":"text","p":[386.0,271.4],"s":"Picrophilus","c":"force","size":11,"a":"start"},{"t":"circle","p":[432.0,235.0,5],"c":"force"},{"t":"text","p":[440.0,239.0],"s":"Sulfolobus","c":"force","size":11,"a":"start"},{"t":"circle","p":[543.6,181.0,5],"c":"force4"},{"t":"text","p":[535.6,185.0],"s":"Pyrolobus","c":"force4","size":11,"a":"end"},{"t":"circle","p":[414.0,145.0,5],"c":"force3"},{"t":"text","p":[422.0,139.0],"s":"Thermus","c":"force3","size":11,"a":"start"},{"t":"circle","p":[295.2,154,5],"c":"force2"},{"t":"text","p":[287.2,148],"s":"E. coli","c":"force2","size":11,"a":"end"},{"t":"circle","p":[324.0,127.0,5],"c":"force3"},{"t":"text","p":[332.0,123.0],"s":"Natronomonas","c":"force3","size":11,"a":"start"},{"t":"circle","p":[306.0,100,5],"c":"force3"},{"t":"text","p":[314.0,104],"s":"Alkaliphilus","c":"force3","size":11,"a":"start"},{"t":"text","p":[595.2,49.0],"s":"limiti di crescita","c":"muted","size":10,"a":"end"}]}
---
Temperatura e pH di crescita ottimale di alcuni microrganismi, con i limiti di crescita noti indicati dalle linee tratteggiate. Gli acidofili più estremi sono anche termofili; gli ipertermofili più estremi vivono a pH vicino alla neutralità.
:::

Che cosa hanno in comune tutti questi ambienti? L'acqua liquida, una fonte di energia chimica o luminosa, e gli elementi necessari a costruire le cellule. La vita terrestre non è stata trovata dove manca l'acqua liquida per tempi lunghi, e questo fatto guida la definizione di **zona abitabile** del capitolo [La zona abitabile](unit:biology-22). Gli estremofili mostrano però che, purché ci sia acqua liquida, la vita si adatta a un intervallo enorme di temperatura, salinità, acidità e pressione.

::: nota Gli estremofili e l'origine della vita
Negli alberi molecolari di Batteri e Archei i rami più vicini alla radice sono spesso occupati da ipertermofili anaerobici, e questo ha fatto pensare che i primi organismi vivessero in ambienti caldi, come le sorgenti idrotermali. L'interpretazione è discussa: le ricostruzioni delle proteine ancestrali danno risultati diversi a seconda dei metodi, e un ambiente caldo per gli antenati non implica un oceano caldo, come si vede nei capitoli [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09) e [L'albero universale e LUCA](unit:biology-15).
:::

## Estremofili e altri mondi {#altrimondi}

La superficie di Marte combina quasi tutti i fattori estremi: una temperatura media di circa $-60\ ^\circ\mathrm C$, una pressione di circa sei millibar, vicina a quella del punto triplo dell'acqua, alla quale il ghiaccio tende a sublimare invece di fondere, un'aridità estrema, sali ossidanti come i perclorati, la radiazione ultravioletta solare non filtrata e una dose di radiazione cosmica che lo strumento RAD del rover Curiosity ha misurato in circa $0{,}21$ milligray al giorno. Nessun organismo terrestre conosciuto potrebbe crescere stabilmente in superficie. Il sottosuolo è più promettente: a qualche metro di profondità la radiazione è molto ridotta, la temperatura è stabile, e potrebbero esistere sacche di salamoia.

Per proteggere Marte dalla contaminazione terrestre, il Comitato per la ricerca spaziale, COSPAR, definisce **regioni speciali** i luoghi in cui la temperatura supera $-25\ ^\circ\mathrm C$ e l'attività dell'acqua supera $0{,}5$, per periodi identificabili entro cinquecento anni. Sono valori scelti con un margine di sicurezza rispetto ai limiti di crescita conosciuti, $-15\ ^\circ\mathrm C$ e circa $0{,}6$, proprio perché quei limiti potrebbero essere superati da organismi non ancora scoperti. Le sonde dirette verso le regioni speciali devono rispettare requisiti di pulizia molto severi, discussi nel capitolo [Panspermia e protezione planetaria](unit:biology-34).

Gli oceani sotto il ghiaccio di Europa e di Encelado, discussi nei capitoli [Europa e gli oceani sotto il ghiaccio](unit:biology-28) e [Encelado e i suoi pennacchi](unit:biology-29), sono più vicini alle condizioni terrestri di quanto la loro distanza dal Sole faccia pensare: acqua liquida a temperature vicine allo zero, salinità moderata, forse sorgenti idrotermali sul fondale. Il fattore estremo è la pressione, che dipende dalla gravità e dalla profondità. Sul fondo dell'oceano di Encelado, una luna piccola, la pressione è di pochi megapascal; su Europa, molto più grande, può superare i cento megapascal, vicino al record di crescita terrestre.

## Un'esperienza: il lievito e il sale {#esperienza}

Il lievito di birra, *Saccharomyces cerevisiae*, è un fungo unicellulare che fermenta gli zuccheri producendo anidride carbonica. La quantità di gas prodotta in un tempo fissato misura la sua attività, e permette di vedere come il sale e la temperatura la limitano.

::: metodo Palloncini di lievito
**Materiale.** Quattro bottigliette di plastica uguali, quattro palloncini, lievito di birra secco, zucchero, sale da cucina, acqua tiepida, un metro da sarta, una bilancia da cucina.

**Procedura.** In ogni bottiglietta si versano $100$ millilitri di acqua a circa $35\ ^\circ\mathrm C$, un cucchiaio di zucchero e un cucchiaino di lievito. Si aggiungono $0$, $2$, $5$ e $10$ grammi di sale, uno per bottiglietta, si mescola e si chiude ogni bottiglietta con un palloncino. Dopo $30$ e $60$ minuti si misura la circonferenza dei palloncini. In una seconda prova, senza sale, si confrontano bottigliette tenute in frigorifero, a temperatura ambiente e a bagnomaria a $35$ e a $60\ ^\circ\mathrm C$.

**Analisi.** Stimare l'attività dell'acqua di ogni soluzione con la legge di Raoult, trascurando lo zucchero, e riportare in un grafico la circonferenza dei palloncini in funzione dell'attività dell'acqua. A quale concentrazione di sale l'attività del lievito si riduce visibilmente? Che cosa succede a $60\ ^\circ\mathrm C$, e il lievito riprende a fermentare quando la bottiglietta torna a $35\ ^\circ\mathrm C$?
:::

Con $10$ grammi di sale in $100$ millilitri, cioè circa $1{,}7$ moli per litro e quindi $3{,}4$ moli di ioni, la legge di Raoult dà un'attività dell'acqua di circa $55{,}5/58{,}9\approx0{,}94$; con $5$ grammi circa $0{,}97$. Il lievito comune smette di crescere intorno a $0{,}9$, e già a $0{,}94$ la fermentazione rallenta molto. A $60\ ^\circ\mathrm C$ le proteine del lievito si denaturano e la fermentazione si arresta senza riprendere: per il lievito, un mesofilo, quella temperatura è letale.

## Errori frequenti {#errori}

::: errore Credere che gli estremofili preferiscano qualsiasi condizione difficile
Ogni estremofilo è adattato a uno o a pochi fattori. Un ipertermofilo muore a temperatura ambiente, un alofilo si disgrega in acqua dolce: ciò che per noi è normale per loro è estremo.
:::

::: errore Confondere crescita e sopravvivenza
Una spora che resiste sei anni nello spazio sopravvive, senza crescere. Per l'abitabilità di un ambiente contano i limiti di crescita, molto più stretti di quelli di sopravvivenza.
:::

::: errore Pensare che l'acqua liquida basti sempre
In una salamoia molto concentrata l'acqua è liquida ma poco disponibile: sotto un'attività dell'acqua di circa $0{,}6$ nessun organismo conosciuto si moltiplica.
:::

::: errore Leggere la dose decimale come una dose letale
Dopo una dose $D_{10}$ sopravvive ancora un decimo delle cellule. Per ridurre una popolazione a una cellula su un milione serve una dose sei volte maggiore.
:::

::: errore Concludere che la resistenza alla radiazione sia un adattamento alla radiazione
Sulla Terra non esistono dosi naturali paragonabili a quelle a cui resiste *Deinococcus*. La sua resistenza è probabilmente un effetto collaterale dell'adattamento al disseccamento, che produce danni simili.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Gli estremofili richiedono condizioni estreme per crescere al meglio; gli estremotolleranti le sopportano. Si classificano in base al fattore: temperatura, sale, pH, pressione, aridità, radiazione.
- Gli ipertermofili, quasi tutti archei, crescono fino a $122\ ^\circ\mathrm C$ con proteine rigide, membrane di lipidi a legami etere e DNA protetto; l'acqua resta liquida sopra i cento gradi solo sotto pressione.
- Gli psicrofili crescono fino a $-15\ ^\circ\mathrm C$ nelle vene di salamoia, con membrane fluide, enzimi flessibili e proteine anticongelanti.
- L'attività dell'acqua $a_w=p/p_0$ misura l'acqua disponibile; gli alofili usano la strategia del sale all'interno o i soluti compatibili, e nessun organismo noto cresce sotto circa $0{,}6$.
- Acidofili e alcalofili crescono da pH $0$ a pH $12{,}5$ mantenendo il citoplasma vicino alla neutralità; i piezofili crescono fino a $130$ MPa.
- La sopravvivenza alla radiazione segue $S=10^{-D/D_{10}}$; la dose decimale è circa $0{,}3$ kGy per *Escherichia coli* e $10$ kGy per *Deinococcus*, che protegge le proteine con complessi di manganese e ripara il genoma da più copie.
- Spore e tardigradi sopravvivono in quiescenza a condizioni nelle quali non potrebbero crescere, incluso il vuoto dello spazio se protetti dalla luce ultravioletta.
- La superficie di Marte è fuori dai limiti di crescita conosciuti; le regioni speciali, con temperatura sopra $-25\ ^\circ\mathrm C$ e attività dell'acqua sopra $0{,}5$, richiedono una protezione particolare.
:::

## Glossario {#glossario}

- **Alofilo**: organismo che richiede concentrazioni elevate di sale.
- **Anidrobiosi**: stato di vita sospesa in assenza quasi completa di acqua.
- **Attività dell'acqua**: rapporto fra la pressione del vapore acqueo sopra un campione e quella sopra l'acqua pura.
- **Dose decimale**: dose di radiazione che riduce di dieci volte il numero di cellule vive.
- **Endospora**: cellula di resistenza disidratata prodotta da alcuni batteri.
- **Estremofilo**: organismo che cresce al meglio in condizioni estreme per gli esseri umani.
- **Gray**: unità di dose assorbita, pari a un joule per chilogrammo.
- **Ipertermofilo**: organismo con temperatura ottimale di crescita di almeno $80\ ^\circ\mathrm C$.
- **Piezofilo**: organismo che cresce più rapidamente ad alta pressione.
- **Psicrofilo**: organismo con temperatura ottimale di crescita inferiore a $15\ ^\circ\mathrm C$.
- **Regione speciale**: luogo di Marte in cui organismi terrestri potrebbero moltiplicarsi, protetto da regole particolari.
- **Soluto compatibile**: piccola molecola organica accumulata per bilanciare la pressione osmotica senza danneggiare le proteine.

## Esercizi {#esercizi}

::: esercizio Classificare [base]
Classificare gli organismi seguenti: un archeo con crescita ottimale a $95\ ^\circ\mathrm C$ e pH $6$; un batterio che cresce meglio a $10\ ^\circ\mathrm C$; un archeo che cresce meglio a pH $1$ e $70\ ^\circ\mathrm C$; un batterio che cresce più rapidamente a $50$ MPa che a pressione atmosferica.
>>> soluzione
Il primo è un ipertermofilo; il secondo uno psicrofilo; il terzo un acidofilo termofilo, cioè un poliestremofilo; il quarto un piezofilo.
:::

::: esercizio Sopravvivenza delle spore [base]
Una popolazione di spore ha $D_{10}=2$ kGy. Quale frazione sopravvive a $6$ kGy?
>>> soluzione
$S=10^{-6/2}=10^{-3}$, una spora su mille.
:::

::: esercizio Protoni dentro e fuori [base]
Un acidofilo vive a pH $2{,}0$ e mantiene il citoplasma a pH $6{,}5$. Di quante volte la concentrazione di ioni idrogeno all'esterno supera quella interna?
>>> soluzione
La differenza è di $4{,}5$ unità, quindi il rapporto è $10^{4{,}5}\approx3{,}2\cdot10^4$, circa trentamila volte.
:::

::: esercizio La pressione di una sorgente profonda [base]
*Thermococcus piezophilus* è stato isolato a $4964$ metri di profondità. Calcolare la pressione con $\rho=1025\ \mathrm{kg/m^3}$ e $g=9{,}81\ \mathrm{m/s^2}$ e confrontarla con la sua pressione ottimale di crescita, $50$ MPa.
>>> soluzione
$$\begin{aligned}p&\approx0{,}1+1025\cdot9{,}81\cdot4964\cdot10^{-6}\\&\approx0{,}1+49{,}9\approx50{,}0\ \text{MPa}:\end{aligned}$$

l'organismo cresce al meglio proprio alla pressione del suo ambiente naturale.
:::

::: esercizio Raoult per sale e zucchero [base]
Stimare con la legge di Raoult l'attività dell'acqua di una soluzione con una mole di cloruro di sodio per litro e di una con una mole di glucosio per litro. Perché sono diverse?
>>> soluzione
Per il sale, che dà due moli di ioni, $a_w\approx55{,}5/57{,}5\approx0{,}965$; per il glucosio, che non si dissocia, $a_w\approx55{,}5/56{,}5\approx0{,}982$. Conta il numero di particelle disciolte, e il sale ne produce il doppio.
:::

::: esercizio Crescita o sopravvivenza? [base]
Quali dei dati seguenti riguardano la crescita e quali la sopravvivenza: *Methanopyrus kandleri* a $122\ ^\circ\mathrm C$; *Pyrolobus fumarii* dopo un'ora a $121\ ^\circ\mathrm C$; spore di *Bacillus subtilis* dopo sei anni in orbita; *Planococcus halocryophilus* a $-15\ ^\circ\mathrm C$?
>>> soluzione
Riguardano la crescita il primo e l'ultimo, in cui le cellule si dividono. Riguardano la sopravvivenza il secondo e il terzo: le cellule restano vive senza moltiplicarsi.
:::

::: esercizio Una su un milione [medio]
Quale dose lascia una cellula su un milione per *Escherichia coli*, con $D_{10}=0{,}3$ kGy, e per *Deinococcus*, con $D_{10}=10$ kGy?
>>> soluzione
Servono sei dosi decimali: $1{,}8$ kGy per *Escherichia coli* e $60$ kGy per *Deinococcus*.
:::

::: esercizio Radiazione su Marte [medio]
Sulla superficie di Marte la dose di radiazione cosmica è circa $0{,}21$ mGy al giorno. In quanto tempo si accumula una dose di $10$ kGy? Quale frazione di cellule con $D_{10}=10$ kGy sopravvive dopo un milione di anni, se restano inattive in superficie?
>>> soluzione
$10\,000/(0{,}21\cdot10^{-3})\approx4{,}8\cdot10^7$ giorni, circa $130\,000$ anni. In un milione di anni la dose è $0{,}21\cdot10^{-3}\cdot365\cdot10^6\approx77$ kGy, e sopravvive $10^{-7{,}7}\approx2\cdot10^{-8}$ delle cellule. Sotto qualche metro di suolo la dose è molto più bassa.
:::

::: esercizio Una sorgente a 350 gradi [medio]
A $350\ ^\circ\mathrm C$ la pressione di vapore dell'acqua è circa $16{,}5$ MPa. A quale profondità minima si deve trovare una sorgente che emette acqua liquida a questa temperatura?
>>> soluzione
$$h\approx\frac{(16{,}5-0{,}1)\cdot10^6}{1025\cdot9{,}81}\approx1\,630\ \text{m}.$$

Le sorgenti idrotermali con fluidi a $350\ ^\circ\mathrm C$ si trovano infatti di solito a profondità di due o tre chilometri.
:::

::: esercizio Il sale saturo [medio]
Una soluzione satura di cloruro di sodio contiene circa $6{,}15$ moli di sale per chilogrammo di acqua. Calcolare l'attività dell'acqua secondo la legge di Raoult e confrontarla con il valore misurato, $0{,}755$. Perché il valore reale è più basso?
>>> soluzione
Un chilogrammo di acqua contiene $55{,}5$ moli; con $12{,}3$ moli di ioni la frazione molare dell'acqua è $55{,}5/67{,}8\approx0{,}82$. Il valore reale è più basso perché la soluzione si discosta dal comportamento ideale. Molte molecole d'acqua sono legate strettamente agli ioni nei loro gusci di idratazione e non contribuiscono alla pressione di vapore.
:::

::: esercizio Una curva con la spalla [medio]
Un ceppo resiste senza perdite fino a $5$ kGy; oltre questa dose la sopravvivenza diminuisce con $D_{10}=10$ kGy. Quale frazione sopravvive a $25$ kGy? Quale frazione prevederebbe il modello senza spalla?
>>> soluzione
Con la spalla conta solo la dose oltre $5$ kGy: $S=10^{-20/10}=10^{-2}$. Senza spalla $S=10^{-25/10}\approx3{,}2\cdot10^{-3}$, circa tre volte meno.
:::

::: esercizio La pressione negli oceani delle lune [medio]
Stimare la pressione sul fondo dell'oceano di Encelado, con gravità $0{,}113\ \mathrm{m/s^2}$ e una profondità totale di ghiaccio e acqua di $40$ chilometri, e di Europa, con gravità $1{,}31\ \mathrm{m/s^2}$ e una profondità di $120$ chilometri. Si usi una densità media di $1000\ \mathrm{kg/m^3}$ e si trascuri la variazione della gravità con la profondità. Confrontare con il record terrestre di $130$ MPa.
>>> soluzione
Per Encelado $p\approx1000\cdot0{,}113\cdot40\,000\approx4{,}5$ MPa, come a quattrocento metri di profondità in un oceano terrestre. Per Europa $p\approx1000\cdot1{,}31\cdot120\,000\approx157$ MPa, poco sopra il record terrestre di crescita.
:::

::: esercizio Ricavare la dose decimale [avanzato]
In un esperimento la frazione sopravvissuta vale $1$, $0{,}40$, $0{,}16$ e $0{,}063$ dopo $0$, $2$, $4$ e $6$ kGy. Verificare che i dati seguono il modello esponenziale e ricavare la dose decimale.
>>> soluzione
I logaritmi decimali valgono $0$, $-0{,}40$, $-0{,}80$ e $-1{,}20$, allineati su una retta di pendenza $-0{,}20$ per kGy. La dose decimale è l'inverso della pendenza cambiato di segno, $D_{10}=5$ kGy.
:::

::: esercizio Sterilizzare con una probabilità [avanzato]
Un oggetto porta $10^6$ spore con $D_{10}=2$ kGy. Quale dose rende il numero atteso di spore sopravvissute pari a $10^{-3}$? Che cosa significa un numero atteso minore di uno?
>>> soluzione
Serve $10^6\cdot10^{-D/D_{10}}=10^{-3}$, cioè $D=9\,D_{10}=18$ kGy. Un numero atteso di $10^{-3}$ significa che, trattando mille oggetti uguali, in media uno solo conserverebbe una spora viva: la sterilità è sempre una probabilità, e le norme di protezione planetaria si esprimono in questi termini.
:::

::: esercizio L'energia del gradiente acido [avanzato]
Il contributo del gradiente di pH all'energia libera di un protone che entra nella cellula è $\Delta G=-2{,}303\,RT\,\Delta\mathrm{pH}$. Calcolarlo per *Picrophilus torridus*, che vive a pH $0{,}7$ e $60\ ^\circ\mathrm C$ con citoplasma a pH $4{,}6$, e confrontarlo con i circa $50$ kJ/mol necessari a sintetizzare una mole di ATP nelle condizioni cellulari.
>>> soluzione
Con $T=333$ K e $\Delta\mathrm{pH}=3{,}9$ si ha

$$\begin{aligned}\Delta G&\approx-2{,}303\cdot8{,}314\cdot333\cdot3{,}9\ \text{J/mol}\\&\approx-24{,}9\ \text{kJ/mol}.\end{aligned}$$

Il solo gradiente di pH fornisce quindi circa metà dell'energia necessaria per un ATP per ogni protone che entra, e due o tre protoni bastano a sintetizzarne uno: l'ambiente acido è anche una risorsa energetica.
:::

::: esercizio Sale, ghiaccio e acqua disponibile [avanzato]
L'acqua di mare contiene circa $0{,}6$ moli di cloruro di sodio per chilogrammo d'acqua. Stimare con la legge di Raoult l'attività dell'acqua e, con la costante crioscopica dell'acqua, $1{,}86\ \mathrm{K\,kg/mol}$, l'abbassamento del punto di congelamento. Confrontare con i valori reali, circa $0{,}98$ e $-1{,}9\ ^\circ\mathrm C$, e spiegare perché una salamoia di cloruro di calcio può restare liquida a temperature molto più basse.
>>> soluzione
Gli ioni sono $1{,}2$ moli, e $a_w\approx55{,}5/56{,}7\approx0{,}979$. L'abbassamento è $\Delta T\approx2\cdot1{,}86\cdot0{,}6\approx2{,}2$ K, poco più del valore reale. Il cloruro di calcio è molto solubile e libera tre ioni per unità di formula: concentrato, abbassa il punto di congelamento di decine di gradi, ma riduce anche l'attività dell'acqua, e una salamoia così fredda può essere liquida e inabitabile insieme.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §1.3 (le condizioni per la vita) e §9.4 (estremofili, batteri nello spazio), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §26.4 (diversità dei Batteri) e §26.5 (diversità degli Archei). Alcune affermazioni sono state corrette: il pH del sangue umano è $7{,}4$, mentre Shaw indica $6{,}7$; il limite inferiore documentato per la crescita batterica è oggi $-15\ ^\circ\mathrm C$; il ceppo di *Methanopyrus kandleri* che cresce a $122\ ^\circ\mathrm C$ proviene dalla dorsale centrale dell'Oceano Indiano, mentre Morris lo colloca nel Golfo di California. Dati ed esperimenti provengono dalle fonti primarie seguenti.

1. A. W. Anderson e collaboratori, *Food Technology* 10, 575 (1956): la scoperta di *Deinococcus radiodurans*; T. D. Brock, H. Freeze, *Journal of Bacteriology* 98, 289 (1969): *Thermus aquaticus*.
2. K. Takai e collaboratori, *PNAS* 105, 10949 (2008); E. Blöchl e collaboratori, *Extremophiles* 1, 14 (1997); K. Kashefi, D. R. Lovley, *Science* 301, 934 (2003): i limiti di temperatura alta.
3. N. C. S. Mykytczuk e collaboratori, *ISME Journal* 7, 1211 (2013): la crescita a $-15\ ^\circ\mathrm C$.
4. A. Stevenson e collaboratori, *ISME Journal* 9, 1333 (2015): il limite dell'attività dell'acqua.
5. C. Schleper e collaboratori, *Nature* 375, 741 (1995): *Picrophilus*; K. Takai e collaboratori, *International Journal of Systematic and Evolutionary Microbiology* 51, 1245 (2001): *Alkaliphilus transvaalensis*.
6. C. Dalmasso e collaboratori, *Systematic and Applied Microbiology* 39, 440 (2016): *Thermococcus piezophilus*; F. Inagaki e collaboratori, *Science* 349, 420 (2015): la vita nei sedimenti profondi.
7. M. J. Daly e collaboratori, *Science* 306, 1025 (2004) e *PLOS Biology* 5, e92 (2007); K. Zahradka e collaboratori, *Nature* 443, 569 (2006); V. Mattimore, J. R. Battista, *Journal of Bacteriology* 178, 633 (1996): la resistenza di *Deinococcus*.
8. G. Horneck, H. Bücker, G. Reitz, *Advances in Space Research* 14(10), 41 (1994); K. I. Jönsson e collaboratori, *Current Biology* 18, R729 (2008): spore e tardigradi nello spazio.
9. R. J. Cano, M. K. Borucki, *Science* 268, 1060 (1995); R. H. Vreeland, W. D. Rosenzweig, D. W. Powers, *Nature* 407, 897 (2000): le spore antiche.
10. D. M. Hassler e collaboratori, *Science* 343, 1244797 (2014): la radiazione sulla superficie di Marte.
11. G. Kminek e collaboratori, *Advances in Space Research* 46, 811 (2010); J. D. Rummel e collaboratori, *Astrobiology* 14, 887 (2014): le regioni speciali di Marte.
