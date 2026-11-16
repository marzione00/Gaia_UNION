---
unit: chemistry-10
titolo: Gas e stato aeriforme
sottotitolo: Pressione, leggi dei gas, equazione di stato, miscele e gas reali
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §6-1–6-9
---

## Prima di cominciare {#apertura}

Un pallone sonda lasciato al sole si gonfia; di notte si affloscia. Una bombola di gas scaldata può esplodere. Una siringa tappata resiste se si spinge lo stantuffo, e lo respinge appena lo si lascia. Dietro questi comportamenti ci sono poche leggi, scoperte fra il Seicento e l'Ottocento, che legano pressione, volume, temperatura e quantità di gas.

Un gas è fatto di particelle lontane fra loro rispetto alle loro dimensioni, che si muovono in ogni direzione e urtano le pareti del recipiente. Per questo i gas hanno proprietà comuni, assenti nei liquidi e nei solidi: riempiono qualunque recipiente, si comprimono facilmente, si mescolano in ogni proporzione. E per questo le leggi dei gas valgono, in prima approssimazione, per qualunque gas, qualunque sia la natura chimica delle sue molecole. La stazione sul pianeta vulcanico le usa per misurare la quantità di gas emessa dalle fumarole, per calcolare quanto ossigeno contengono le sue bombole e per capire come cambia l'atmosfera salendo di quota.

::: obiettivi
- definire la pressione, misurarla con un barometro e convertirla fra pascal, bar, atmosfere e millimetri di mercurio;
- enunciare le leggi di Boyle, di Charles e di Avogadro e ricavarne l'equazione di stato dei gas ideali;
- usare l'equazione di stato per calcolare quantità, densità e masse molari di gas;
- applicare la stechiometria alle reazioni che consumano o producono gas;
- descrivere le miscele di gas con le pressioni parziali e le frazioni molari;
- interpretare pressione e temperatura con il modello cinetico, calcolare velocità molecolari e confrontare velocità di effusione;
- riconoscere quando un gas si discosta dal comportamento ideale e descriverlo con l'equazione di van der Waals.
:::

Le forze intermolecolari del capitolo [Forze intermolecolari](unit:chemistry-09) spiegano perché i gas reali si discostano dalle leggi di questo capitolo. Il modello cinetico è trattato dal punto di vista fisico nel volume di fisica, nel capitolo [Gas ideali](unit:physics-18), con la distribuzione delle velocità di Maxwell e Boltzmann.

## La pressione {#pressione}

La **pressione** è la forza esercitata perpendicolarmente su una superficie, divisa per l'area della superficie:
$$P=\frac FA.$$
Nel Sistema Internazionale si misura in pascal: $1\un{Pa}=1\un{N/m^2}$. È un'unità piccola, la pressione di un foglio di carta appoggiato su un tavolo, e nella pratica si usano spesso il kilopascal e il **bar**, $1\un{bar}=10^5\un{Pa}$, che dal 1982 è la pressione standard della termodinamica chimica.

La pressione dell'atmosfera fu misurata per la prima volta nel 1644 da Evangelista Torricelli, allievo di Galileo. Riempì di mercurio un tubo di vetro lungo circa un metro, chiuso a un'estremità, e lo capovolse in una bacinella anch'essa piena di mercurio. Il mercurio scese nel tubo e si fermò a un'altezza di circa $76\un{cm}$ sopra il livello della bacinella, lasciando sopra di sé uno spazio vuoto. Il peso della colonna di mercurio è equilibrato dalla pressione dell'aria sulla superficie libera della bacinella.

::: figura barometro
{"w":560,"h":336,"items":[{"t":"rect","p":[150,250,260,50],"c":"muted","r":4},{"t":"rect","p":[256,60,48,212],"c":"muted","r":2},{"t":"rect","p":[258,118,44,180],"c":"force2","r":1},{"t":"rect","p":[152,262,256,36],"c":"force2","r":2},{"t":"poly","pts":[[254,58],[306,58],[306,272],[254,272]],"close":true,"c":"ax","w":2},{"t":"text","p":[280,92],"s":"vuoto","c":"ax","size":12},{"t":"arrow","p":[370,196,370,256],"c":"force","w":2.4,"head":9},{"t":"text","p":[370,170],"s":"pressione","c":"force","size":12},{"t":"text","p":[370,186],"s":"atmosferica","c":"force","size":12},{"t":"line","p":[232,118,232,262],"c":"ax","w":1.4},{"t":"line","p":[224,118,240,118],"c":"ax","w":1.4},{"t":"line","p":[224,262,240,262],"c":"ax","w":1.4},{"t":"text","p":[222,182],"s":"760 mm","c":"ax","size":13,"a":"end"},{"t":"text","p":[222,200],"s":"al livello del mare","c":"muted","size":11,"a":"end"},{"t":"text","p":[280,322],"s":"mercurio","c":"force2","size":12}]}
---
Il barometro di Torricelli. La pressione dell'atmosfera sulla superficie del mercurio nella bacinella sostiene una colonna alta circa $760\un{mm}$; sopra la colonna resta il vuoto.
:::

La pressione esercitata da una colonna di liquido di densità $\rho$ e altezza $h$ è $P=\rho gh$. Una colonna di mercurio, $\rho=13{,}595\un{g/cm^3}$ a $0\,^\circ\mathrm{C}$, alta $760\un{mm}$ esercita la pressione di $101\,325\un{Pa}$, che si chiama **atmosfera standard**. Le unità di pressione più comuni sono quindi legate da

$$1\un{atm}=101{,}325\un{kPa}=1{,}01325\un{bar}=760\un{mmHg}.$$

Il millimetro di mercurio si chiama anche torr, in onore di Torricelli. Con l'acqua, tredici volte e mezzo meno densa del mercurio, la stessa pressione sostiene una colonna di più di dieci metri; per questo un subacqueo, scendendo di dieci metri in mare, sente aumentare la pressione di circa un bar.

La pressione atmosferica diminuisce con la quota, perché diminuisce il peso dell'aria sovrastante. Nel 1648, su suggerimento di Blaise Pascal, Florin Périer portò un barometro sulla cima del Puy de Dôme, nel centro della Francia, e misurò una colonna più bassa di circa otto centimetri. Sulla vetta dell'Everest la pressione è circa un terzo di quella al livello del mare.

## Volume e pressione: la legge di Boyle {#boyle}

Nel 1662 Robert Boyle, con l'aiuto di Robert Hooke, studiò come varia il volume di una quantità fissata d'aria al variare della pressione, intrappolandola nel ramo chiuso di un tubo a forma di J e aggiungendo mercurio nell'altro ramo. Trovò che, a temperatura costante, il volume è inversamente proporzionale alla pressione: raddoppiando la pressione il volume si dimezza. La **legge di Boyle** si scrive

$$PV=\text{costante}\qquad(n,\ T\ \text{costanti}),$$

oppure, per due stati dello stesso campione, $P_1V_1=P_2V_2$.

::: figura boyle
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[210,""],"sx":12.0,"sy":52,"xt":[[10,"10"],[20,"20"],[30,"30"],[40,"40"]],"yt":[[1,"1"],[2,"2"],[3,"3"]]},{"t":"text","p":[40,30],"s":"pressione (bar)","c":"ax","size":12,"a":"start"},{"t":"text","p":[600,292],"s":"volume (L)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":12.0,"sy":52,"pts":[[7.5,3.0281273],[7.75,2.9304458],[8.0,2.8388693],[8.25,2.752843],[8.5,2.671877],[8.75,2.5955377],[9.0,2.5234394],[9.25,2.4552383],[9.5,2.3906268],[9.75,2.3293287],[10.0,2.2710955],[10.25,2.2157029],[10.5,2.1629481],[10.75,2.1126469],[11.0,2.0646322],[11.25,2.0187515],[11.5,1.9748656],[11.75,1.9328472],[12.0,1.8925796],[12.25,1.8539555],[12.5,1.8168764],[12.75,1.7812513],[13.0,1.7469965],[13.25,1.7140343],[13.5,1.6822929],[13.75,1.6517058],[14.0,1.622211],[14.25,1.5937512],[14.5,1.5662727],[14.75,1.5397257],[15.0,1.5140636],[15.25,1.4892429],[15.5,1.4652229],[15.75,1.4419654],[16.0,1.4194347],[16.25,1.3975972],[16.5,1.3764215],[16.75,1.3558779],[17.0,1.3359385],[17.25,1.3165771],[17.5,1.2977688],[17.75,1.2794904],[18.0,1.2617197],[18.25,1.2444359],[18.5,1.2276192],[18.75,1.2112509],[19.0,1.1953134],[19.25,1.1797899],[19.5,1.1646643],[19.75,1.1499218],[20.0,1.1355477],[20.25,1.1215286],[20.5,1.1078514],[20.75,1.0945038],[21.0,1.081474],[21.25,1.0687508],[21.5,1.0563235],[21.75,1.0441818],[22.0,1.0323161],[22.25,1.0207171],[22.5,1.0093758],[22.75,0.9982837],[23.0,0.9874328],[23.25,0.9768153],[23.5,0.9664236],[23.75,0.9562507],[24.0,0.9462898],[24.25,0.9365342],[24.5,0.9269777],[24.75,0.9176143],[25.0,0.9084382],[25.25,0.8994437],[25.5,0.8906257],[25.75,0.8819788],[26.0,0.8734983],[26.25,0.8651792],[26.5,0.8570172],[26.75,0.8490077],[27.0,0.8411465],[27.25,0.8334295],[27.5,0.8258529],[27.75,0.8184128],[28.0,0.8111055],[28.25,0.8039276],[28.5,0.7968756],[28.75,0.7899462],[29.0,0.7831364],[29.25,0.7764429],[29.5,0.7698629],[29.75,0.7633934],[30.0,0.7570318],[30.25,0.7507754],[30.5,0.7446215],[30.75,0.7385676],[31.0,0.7326114],[31.25,0.7267505],[31.5,0.7209827],[31.75,0.7153057],[32.0,0.7097173],[32.25,0.7042156],[32.5,0.6987986],[32.75,0.6934643],[33.0,0.6882107],[33.25,0.6830362],[33.5,0.6779389],[33.75,0.6729172],[34.0,0.6679693],[34.25,0.6630936],[34.5,0.6582885],[34.75,0.6535527],[35.0,0.6488844],[35.25,0.6442824],[35.5,0.6397452],[35.75,0.6352715],[36.0,0.6308599],[36.25,0.6265091],[36.5,0.6222179],[36.75,0.6179852],[37.0,0.6138096],[37.25,0.6096901],[37.5,0.6056255],[37.75,0.6016147],[38.0,0.5976567],[38.25,0.5937504],[38.5,0.5898949],[38.75,0.5860892],[39.0,0.5823322],[39.25,0.578623],[39.5,0.5749609],[39.75,0.5713448],[40.0,0.5677739],[40.25,0.5642473],[40.5,0.5607643],[40.75,0.557324],[41.0,0.5539257],[41.25,0.5505686],[41.5,0.5472519],[41.75,0.543975],[42.0,0.540737],[42.25,0.5375374],[42.5,0.5343754],[42.75,0.5312504],[43.0,0.5281617],[43.25,0.5251088],[43.5,0.5220909],[43.75,0.5191075],[44.0,0.5161581],[44.25,0.5132419],[44.5,0.5103585],[44.75,0.5075074],[45.0,0.5046879]],"c":"force2","w":2.4},{"t":"text","p":[560.0,240.5],"s":"0 °C","c":"force2","size":12},{"t":"plot","o":[80,250],"sx":12.0,"sy":52,"pts":[[8.0,3.8781772],[8.25,3.7606566],[8.5,3.6500491],[8.75,3.545762],[9.0,3.4472686],[9.25,3.3540992],[9.5,3.2658334],[9.75,3.1820941],[10.0,3.1025417],[10.25,3.02687],[10.5,2.9548016],[10.75,2.8860853],[11.0,2.8204925],[11.25,2.7578149],[11.5,2.6978624],[11.75,2.640461],[12.0,2.5854514],[12.25,2.5326871],[12.5,2.4820334],[12.75,2.4333661],[13.0,2.3865706],[13.25,2.3415409],[13.5,2.2981791],[13.75,2.256394],[14.0,2.2161012],[14.25,2.1772223],[14.5,2.1396839],[14.75,2.1034181],[15.0,2.0683612],[15.25,2.0344536],[15.5,2.0016398],[15.75,1.9698678],[16.0,1.9390886],[16.25,1.9092564],[16.5,1.8803283],[16.75,1.8522637],[17.0,1.8250245],[17.25,1.7985749],[17.5,1.772881],[17.75,1.7479108],[18.0,1.7236343],[18.25,1.7000229],[18.5,1.6770496],[18.75,1.6546889],[19.0,1.6329167],[19.25,1.61171],[19.5,1.591047],[19.75,1.5709072],[20.0,1.5512709],[20.25,1.5321194],[20.5,1.513435],[20.75,1.4952008],[21.0,1.4774008],[21.25,1.4600196],[21.5,1.4430427],[21.75,1.426456],[22.0,1.4102462],[22.25,1.3944008],[22.5,1.3789074],[22.75,1.3637546],[23.0,1.3489312],[23.25,1.3344265],[23.5,1.3202305],[23.75,1.3063334],[24.0,1.2927257],[24.25,1.2793986],[24.5,1.2663436],[24.75,1.2535522],[25.0,1.2410167],[25.25,1.2287294],[25.5,1.216683],[25.75,1.2048706],[26.0,1.1932853],[26.25,1.1819207],[26.5,1.1707705],[26.75,1.1598287],[27.0,1.1490895],[27.25,1.1385474],[27.5,1.128197],[27.75,1.1180331],[28.0,1.1080506],[28.25,1.0982449],[28.5,1.0886111],[28.75,1.0791449],[29.0,1.069842],[29.25,1.060698],[29.5,1.0517091],[29.75,1.0428712],[30.0,1.0341806],[30.25,1.0256336],[30.5,1.0172268],[30.75,1.0089567],[31.0,1.0008199],[31.25,0.9928134],[31.5,0.9849339],[31.75,0.9771785],[32.0,0.9695443],[32.25,0.9620284],[32.5,0.9546282],[32.75,0.947341],[33.0,0.9401642],[33.25,0.9330953],[33.5,0.9261319],[33.75,0.9192716],[34.0,0.9125123],[34.25,0.9058516],[34.5,0.8992875],[34.75,0.8928178],[35.0,0.8864405],[35.25,0.8801537],[35.5,0.8739554],[35.75,0.8678438],[36.0,0.8618171],[36.25,0.8558736],[36.5,0.8500114],[36.75,0.844229],[37.0,0.8385248],[37.25,0.8328971],[37.5,0.8273445],[37.75,0.8218654],[38.0,0.8164583],[38.25,0.811122],[38.5,0.805855],[38.75,0.8006559],[39.0,0.7955235],[39.25,0.7904565],[39.5,0.7854536],[39.75,0.7805136],[40.0,0.7756354],[40.25,0.7708178],[40.5,0.7660597],[40.75,0.7613599],[41.0,0.7567175],[41.25,0.7521313],[41.5,0.7476004],[41.75,0.7431238],[42.0,0.7387004],[42.25,0.7343294],[42.5,0.7300098],[42.75,0.7257408],[43.0,0.7215213],[43.25,0.7173507],[43.5,0.713228],[43.75,0.7091524],[44.0,0.7051231],[44.25,0.7011394],[44.5,0.6972004],[44.75,0.6933054],[45.0,0.6894537]],"c":"force4","w":2.4},{"t":"text","p":[214.0,92.4],"s":"100 °C","c":"force4","size":12,"a":"start"},{"t":"circle","p":[352.5,198.0,5],"c":"force2"},{"t":"circle","p":[216.3,146.0,5],"c":"force2"},{"t":"text","p":[358.5,216.0],"s":"22,7 L · 1 bar","c":"ax","size":11,"a":"start"},{"t":"text","p":[224.3,138.0],"s":"11,4 L · 2 bar","c":"ax","size":11,"a":"start"},{"t":"text","p":[330,40],"s":"una mole di gas ideale: PV costante a T fissata","c":"muted","size":11}]}
---
Isoterme di una mole di gas ideale a $0\,^\circ\mathrm{C}$ e a $100\,^\circ\mathrm{C}$. Su ciascuna curva il prodotto $PV$ è costante; a temperatura più alta la curva si sposta verso l'alto.
:::

La legge di Boyle spiega il funzionamento dei polmoni: quando il diaframma si abbassa, il volume della cavità toracica aumenta, la pressione dell'aria nei polmoni scende sotto quella esterna e l'aria entra. Spiega anche perché un subacqueo che respira aria compressa in profondità deve risalire espirando: trattenendo il fiato, l'aria nei polmoni si espanderebbe al diminuire della pressione e potrebbe lacerarli.

## Volume e temperatura: la legge di Charles {#charles}

Un gas scaldato a pressione costante si espande. Le prime misure accurate furono fatte da Jacques Charles verso il 1787, senza pubblicarle, e da Joseph Louis Gay-Lussac nel 1802. A pressione costante il volume di un gas cresce linearmente con la temperatura, e la retta ha la stessa intercetta per tutti i gas: prolungata verso le basse temperature, raggiunge il volume zero a $-273{,}15\,^\circ\mathrm{C}$.

::: figura charles
{"w":640,"h":300,"items":[{"t":"line","p":[60,250,600,250],"c":"ax","w":1.6},{"t":"arrow","p":[360,262,360,40],"c":"ax","w":1.6,"head":9},{"t":"text","p":[368,46],"s":"volume (L)","c":"ax","size":12,"a":"start"},{"t":"text","p":[600,292],"s":"temperatura (°C)","c":"ax","size":13,"a":"end"},{"t":"line","p":[140.0,250,140.0,255],"c":"ax","w":1.2},{"t":"text","p":[140.0,270],"s":"−200","c":"muted","size":12},{"t":"line","p":[250.0,250,250.0,255],"c":"ax","w":1.2},{"t":"text","p":[250.0,270],"s":"−100","c":"muted","size":12},{"t":"line","p":[360.0,250,360.0,255],"c":"ax","w":1.2},{"t":"text","p":[360.0,270],"s":"0","c":"muted","size":12},{"t":"line","p":[470.0,250,470.0,255],"c":"ax","w":1.2},{"t":"text","p":[470.0,270],"s":"100","c":"muted","size":12},{"t":"line","p":[580.0,250,580.0,255],"c":"ax","w":1.2},{"t":"text","p":[580.0,270],"s":"200","c":"muted","size":12},{"t":"line","p":[355,204.0,360,204.0],"c":"ax","w":1.2},{"t":"text","p":[351,208.0],"s":"10","c":"muted","size":12,"a":"end"},{"t":"line","p":[355,158.0,360,158.0],"c":"ax","w":1.2},{"t":"text","p":[351,162.0],"s":"20","c":"muted","size":12,"a":"end"},{"t":"line","p":[355,112.0,360,112.0],"c":"ax","w":1.2},{"t":"text","p":[351,116.0],"s":"30","c":"muted","size":12,"a":"end"},{"t":"line","p":[355,66.0,360,66.0],"c":"ax","w":1.2},{"t":"text","p":[351,70.0],"s":"40","c":"muted","size":12,"a":"end"},{"t":"plot","o":[360,250],"sx":1.1,"sy":4.6,"pts":[[-50,18.5537233],[200,39.3398799]],"c":"force2","w":2.6},{"t":"plot","o":[360,250],"sx":1.1,"sy":4.6,"pts":[[-273.15,0],[-50,18.5537233]],"c":"force2","w":1.6,"dash":true},{"t":"text","p":[588.0,73.0],"s":"1 bar","c":"force2","size":12,"a":"start"},{"t":"plot","o":[360,250],"sx":1.1,"sy":4.6,"pts":[[-50,9.2768617],[200,19.6699399]],"c":"force3","w":2.6},{"t":"plot","o":[360,250],"sx":1.1,"sy":4.6,"pts":[[-273.15,0],[-50,9.2768617]],"c":"force3","w":1.6,"dash":true},{"t":"text","p":[588.0,163.5],"s":"2 bar","c":"force3","size":12,"a":"start"},{"t":"plot","o":[360,250],"sx":1.1,"sy":4.6,"pts":[[-50,4.6384308],[200,9.83497]],"c":"force","w":2.6},{"t":"plot","o":[360,250],"sx":1.1,"sy":4.6,"pts":[[-273.15,0],[-50,4.6384308]],"c":"force","w":1.6,"dash":true},{"t":"text","p":[588.0,208.8],"s":"4 bar","c":"force","size":12,"a":"start"},{"t":"circle","p":[59.5,250.0,5],"c":"force4"},{"t":"text","p":[59.5,270],"s":"−273,15","c":"force4","size":12},{"t":"text","p":[150,60],"s":"tratto continuo: misure","c":"muted","size":11},{"t":"text","p":[150,76],"s":"tratteggio: estrapolazione","c":"muted","size":11}]}
---
Volume di una mole di gas ideale in funzione della temperatura, a tre pressioni diverse. Le rette prolungate si incontrano tutte nello stesso punto, a $-273{,}15\,^\circ\mathrm{C}$; nessun gas reale arriva fin lì, perché prima condensa.
:::

Nessun gas raggiunge davvero il volume zero: prima condensa in un liquido. La temperatura a cui le rette convergono ha però un significato preciso: è lo **zero assoluto**, la temperatura più bassa possibile. Nel 1848 William Thomson, poi lord Kelvin, propose una scala di temperatura con lo zero in quel punto. Nella **scala Kelvin** la temperatura si ottiene da quella Celsius aggiungendo $273{,}15$:

$$T/\mathrm{K}=t/{}^\circ\mathrm{C}+273{,}15.$$

Con la temperatura assoluta la **legge di Charles** diventa una proporzionalità diretta:

$$\frac VT=\text{costante}\qquad(n,\ P\ \text{costanti}).$$

Nello stesso modo, a volume costante, la pressione di un gas è proporzionale alla temperatura assoluta. È per questo che una bombola esposta al fuoco può esplodere, e che la pressione degli pneumatici va controllata a freddo.

## Volume e quantità: la legge di Avogadro {#avogadro}

Nel 1808 Gay-Lussac osservò che i volumi dei gas che reagiscono fra loro, misurati alla stessa temperatura e pressione, stanno in rapporti di numeri interi piccoli: due volumi di idrogeno reagiscono con un volume di ossigeno e danno due volumi di vapore acqueo. Nel 1811 Amedeo Avogadro, professore a Vercelli, propose la spiegazione: **volumi uguali di gas diversi, alla stessa temperatura e pressione, contengono lo stesso numero di molecole**. Perché i volumi tornassero, Avogadro dovette ammettere che i gas elementari come l'idrogeno e l'ossigeno fossero formati da molecole di due atomi, un'idea che la comunità chimica accettò soltanto nel 1860, quando Stanislao Cannizzaro la ripropose al congresso di Karlsruhe.

La **legge di Avogadro** si scrive

$$\frac Vn=\text{costante}\qquad(P,\ T\ \text{costanti}).$$

Il volume occupato da una mole di gas, il **volume molare**, è quindi lo stesso per tutti i gas ideali alle stesse condizioni. Vale $22{,}711\un{L}$ a $0\,^\circ\mathrm{C}$ e $1\un{bar}$, $24{,}790\un{L}$ a $25\,^\circ\mathrm{C}$ e $1\un{bar}$, e $22{,}414\un{L}$ a $0\,^\circ\mathrm{C}$ e $1\un{atm}$, il valore delle condizioni normali usate nei testi più vecchi.

## L'equazione di stato dei gas ideali {#stato}

Le tre leggi si riuniscono in un'unica relazione. Il volume è proporzionale a $n$ e a $T$, e inversamente proporzionale a $P$; la costante di proporzionalità è la stessa per tutti i gas, e si chiama **costante dei gas**, $R$. L'**equazione di stato dei gas ideali** è

::: legge Equazione di stato dei gas ideali
$$PV=nRT$$
con $R=8{,}314\un{J/(mol\,K)}$, cioè $0{,}08314\un{L\,bar/(mol\,K)}$ o $0{,}08206\un{L\,atm/(mol\,K)}$.
:::

Un **gas ideale** è un gas che obbedisce esattamente a questa equazione. Nessun gas reale lo fa a tutte le pressioni e temperature, ma a pressioni dell'ordine di un bar e a temperature ben superiori a quella di ebollizione gli scarti sono minori dell'uno per cento, e spesso dell'uno per mille. Per l'azoto a $25\,^\circ\mathrm{C}$ e $1\un{bar}$ il prodotto $PV$ differisce da $nRT$ di circa due parti su diecimila.

Quando una quantità fissa di gas passa da uno stato a un altro, l'equazione dà la relazione

$$\frac{P_1V_1}{T_1}=\frac{P_2V_2}{T_2},$$

che contiene le tre leggi come casi particolari.

::: esempio La bombola del subacqueo
Una bombola da $12{,}0\un{L}$ è caricata con aria a $200\un{bar}$ e $20\,^\circ\mathrm{C}$. Calcolare quante moli d'aria contiene, la loro massa, con una massa molare media dell'aria di $28{,}96\un{g/mol}$, e il volume che l'aria occuperebbe alla pressione di $1\un{bar}$ e alla stessa temperatura.

Con $P=200\un{bar}$, $V=12{,}0\un{L}$ e $T=293{,}15\un{K}$ si ottiene $n=PV/(RT)\simeq98{,}5\un{mol}$, cioè circa $2{,}85\un{kg}$ d'aria. Alla stessa temperatura e a $1\un{bar}$ il volume sarebbe duecento volte maggiore, $2400\un{L}$. A pressioni così alte l'aria non è più del tutto ideale, e il risultato va corretto di qualche per cento.
:::

::: esempio Lo pneumatico dopo il viaggio
Il manometro di un distributore indica per uno pneumatico $2{,}2\un{bar}$ a $10\,^\circ\mathrm{C}$. Dopo un lungo viaggio in autostrada l'aria nello pneumatico è a $40\,^\circ\mathrm{C}$. Che cosa indica il manometro, se il volume non cambia e la pressione atmosferica è $1{,}013\un{bar}$?

Il manometro misura la **pressione relativa**, la differenza fra la pressione interna e quella atmosferica. Nelle leggi dei gas serve la pressione assoluta, $2{,}2+1{,}013=3{,}21\un{bar}$. A volume costante la pressione assoluta è proporzionale alla temperatura assoluta, e diventa $3{,}21\times313{,}15/283{,}15\simeq3{,}55\un{bar}$. Il manometro indica allora circa $2{,}5\un{bar}$. Usare direttamente la pressione relativa porterebbe a $2{,}43\un{bar}$, un errore piccolo in questo caso, ma che diventa grande quando la pressione relativa è vicina a zero.
:::

::: errore Le temperature in gradi Celsius
Nelle leggi dei gas la temperatura va sempre espressa in kelvin. Un gas che passa da $10$ a $20\,^\circ\mathrm{C}$ a pressione costante aumenta di volume del $3{,}5\%$, il rapporto fra $293{,}15$ e $283{,}15$; il suo volume raddoppia soltanto se la temperatura assoluta raddoppia, per esempio da $10$ a $293\,^\circ\mathrm{C}$.
:::

## Densità e massa molare {#densita}

Poiché $n=m/M$, l'equazione di stato si può scrivere in funzione della massa e della densità $\rho=m/V$:

$$\rho=\frac{PM}{RT}.$$

La densità di un gas è proporzionale alla sua massa molare e alla pressione, e inversamente proporzionale alla temperatura. A $25\,^\circ\mathrm{C}$ e $1\un{bar}$ l'aria ha densità $1{,}17\un{g/L}$, l'elio $0{,}16\un{g/L}$: un litro di elio sposta un litro d'aria che pesa circa un grammo in più, e questa differenza fa salire i palloncini. L'anidride carbonica, con $44\un{g/mol}$, è più densa dell'aria, e si accumula nei luoghi chiusi e bassi, come le cantine dove fermenta il mosto o le grotte vulcaniche.

Misurando la densità di un gas a temperatura e pressione note si ricava la sua massa molare, $M=\rho RT/P$. Fu il metodo con cui, nell'Ottocento, si determinarono le masse molari di molte sostanze volatili, e con cui nel 1894 John William Strutt, lord Rayleigh, scoprì che l'azoto estratto dall'aria era più denso di quello ottenuto per via chimica: la differenza, mezzo per cento, era dovuta all'argon, un gas fino ad allora sconosciuto.

## I gas nelle reazioni chimiche {#reazioni}

L'equazione di stato collega volume e quantità chimica, e permette di applicare la stechiometria alle reazioni in cui compaiono gas. Quando reagenti e prodotti gassosi sono misurati alla stessa temperatura e pressione, i loro volumi stanno negli stessi rapporti dei coefficienti stechiometrici, come aveva osservato Gay-Lussac: nella combustione del propano,

$$\mathrm{C_3H_8(g)}+5\,\mathrm{O_2(g)}\longrightarrow3\,\mathrm{CO_2(g)}+4\,\mathrm{H_2O(g)},$$

un litro di propano consuma cinque litri di ossigeno e produce tre litri di anidride carbonica, se tutti i volumi sono misurati nelle stesse condizioni.

::: esempio L'elettrolisi dell'acqua
Calcolare i volumi di idrogeno e ossigeno che si ottengono, a $25\,^\circ\mathrm{C}$ e $1\un{bar}$, decomponendo per elettrolisi $1{,}00\un{g}$ di acqua secondo la reazione $2\,\mathrm{H_2O(l)}\to2\,\mathrm{H_2(g)}+\mathrm{O_2(g)}$.

Un grammo di acqua corrisponde a $1{,}00/18{,}015=0{,}0555\un{mol}$. Si formano $0{,}0555\un{mol}$ di idrogeno e la metà, $0{,}0278\un{mol}$, di ossigeno. Con il volume molare a $25\,^\circ\mathrm{C}$ e $1\un{bar}$, $24{,}79\un{L/mol}$, i volumi sono $1{,}38\un{L}$ di idrogeno e $0{,}688\un{L}$ di ossigeno. Un grammo di liquido produce quasi due litri di gas: il volume cresce di circa duemila volte.
:::

## Le miscele di gas {#miscele}

In una miscela di gas che non reagiscono fra loro, ogni componente si comporta come se fosse solo nel recipiente. La pressione che un componente eserciterebbe se occupasse da solo tutto il volume, alla stessa temperatura, si chiama **pressione parziale**. Nel 1801 John Dalton osservò che la pressione totale di una miscela è la somma delle pressioni parziali dei componenti:

$$P_\mathrm{tot}=P_\mathrm{A}+P_\mathrm{B}+P_\mathrm{C}+\cdots$$

Poiché ogni pressione parziale è proporzionale al numero di moli del componente, $P_\mathrm{A}=n_\mathrm{A}RT/V$, il rapporto fra pressione parziale e pressione totale è uguale alla **frazione molare** del componente, $x_\mathrm{A}=n_\mathrm{A}/n_\mathrm{tot}$:

$$P_\mathrm{A}=x_\mathrm{A}\,P_\mathrm{tot}.$$

L'aria secca contiene in volume, e quindi in moli, il $78{,}08\%$ di azoto, il $20{,}95\%$ di ossigeno, lo $0{,}93\%$ di argon e circa lo $0{,}04\%$ di anidride carbonica, la cui frazione cresce ogni anno per la combustione dei combustibili fossili e ha superato nel 2023 le $420$ parti per milione. Al livello del mare la pressione parziale dell'ossigeno è quindi circa $21{,}2\un{kPa}$.

::: figura aria
{"w":660,"h":246,"items":[{"t":"text","p":[330,24],"s":"pressioni parziali dell'aria secca (kPa)","c":"ax","size":12},{"t":"text","p":[140,74],"s":"livello del mare","c":"ax","size":12,"a":"end"},{"t":"rect","p":[150,58,316.4,26],"c":"force2","r":1},{"t":"text","p":[308.2,102],"s":"N₂ 79,1","c":"ax","size":11},{"t":"rect","p":[466.4,58,84.9,26],"c":"force4","r":1},{"t":"text","p":[508.8,102],"s":"O₂ 21,2","c":"ax","size":11},{"t":"rect","p":[551.3,58,3.8,26],"c":"force3","r":1},{"t":"text","p":[563.0,76],"s":"totale 101,3","c":"muted","size":11,"a":"start"},{"t":"text","p":[140,164],"s":"vetta dell'Everest","c":"ax","size":12,"a":"end"},{"t":"rect","p":[150,148,105.3,26],"c":"force2","r":1},{"t":"text","p":[202.6,192],"s":"N₂ 26,3","c":"ax","size":11},{"t":"rect","p":[255.3,148,28.2,26],"c":"force4","r":1},{"t":"text","p":[269.4,192],"s":"O₂ 7,1","c":"ax","size":11},{"t":"rect","p":[283.5,148,1.3,26],"c":"force3","r":1},{"t":"text","p":[292.7,166],"s":"totale 33,7","c":"muted","size":11,"a":"start"},{"t":"text","p":[330,232],"s":"la frazione molare di ogni gas resta la stessa; cambia la pressione totale","c":"muted","size":11}]}
---
Pressioni parziali dei componenti dell'aria secca al livello del mare e sulla vetta dell'Everest. Le frazioni molari sono le stesse; la pressione parziale dell'ossigeno in vetta, circa $7{,}1\un{kPa}$, è un terzo di quella a cui l'organismo umano è abituato.
:::

Quando un gas prodotto in laboratorio si raccoglie facendolo gorgogliare in un recipiente capovolto pieno d'acqua, il gas raccolto contiene anche vapore acqueo. La sua pressione parziale è la **tensione di vapore** dell'acqua alla temperatura dell'esperimento, $3{,}17\un{kPa}$ a $25\,^\circ\mathrm{C}$, e va sottratta dalla pressione totale per ottenere quella del gas raccolto.

::: quotidiano Le pressioni parziali del subacqueo
Scendendo in mare la pressione cresce di circa un bar ogni dieci metri, e l'aria respirata dalla bombola viene erogata alla pressione dell'acqua circostante. A trenta metri la pressione totale è circa $4\un{bar}$, e la pressione parziale dell'ossigeno, quattro volte quella in superficie, vale circa $0{,}84\un{bar}$. L'ossigeno diventa tossico per il sistema nervoso quando la sua pressione parziale supera $1{,}4$–$1{,}6\un{bar}$, e l'azoto, a pressioni parziali di qualche bar, provoca la narcosi d'azoto, un'ebbrezza simile a quella dell'alcol. Per questo le immersioni profonde si fanno con miscele diverse dall'aria: miscele più ricche di ossigeno, chiamate nitrox, per le immersioni ripetute a profondità moderate, miscele con elio al posto di una parte dell'azoto per le immersioni più profonde. Le profondità massime per ogni miscela si calcolano con la legge di Dalton.
:::

## Il modello cinetico {#cinetico}

Le leggi dei gas trovano spiegazione in un modello microscopico, la **teoria cinetica dei gas**, sviluppata nell'Ottocento da Rudolf Clausius, James Clerk Maxwell e Ludwig Boltzmann. Le sue ipotesi sono quattro.

- Un gas è formato da un numero enorme di molecole in moto continuo e disordinato.
- Il volume delle molecole è trascurabile rispetto al volume del recipiente.
- Fra un urto e l'altro le molecole si muovono in linea retta, senza attrarsi né respingersi.
- Gli urti fra molecole e con le pareti sono elastici.

La pressione è l'effetto medio degli urti delle molecole contro le pareti. Calcolando la quantità di moto trasferita alla parete per unità di tempo e di superficie si ottiene

$$PV=\tfrac13\,N m\,\overline{v^2},$$

dove $N$ è il numero di molecole, $m$ la massa di ciascuna e $\overline{v^2}$ la media dei quadrati delle velocità. Confrontando con $PV=nRT$ si trova che l'energia cinetica media di traslazione di una mole di molecole è

$$E_\mathrm{c}=\tfrac32RT.$$

La temperatura assoluta è quindi una misura dell'energia cinetica media delle molecole, ed è la stessa per tutti i gas alla stessa temperatura: a $25\,^\circ\mathrm{C}$ vale $3{,}72\un{kJ/mol}$, per l'idrogeno come per l'anidride carbonica. A parità di energia, le molecole più leggere sono più veloci. La **velocità quadratica media**, la radice di $\overline{v^2}$, è

$$v_\mathrm{qm}=\sqrt{\frac{3RT}{M}},$$

con $M$ in chilogrammi per mole.

::: figura velocita
{"w":660,"h":250,"items":[{"t":"text","p":[330,22],"s":"velocità quadratica media a 25 °C (m/s)","c":"ax","size":12},{"t":"text","p":[120,54],"s":"H₂","c":"ax","size":13,"a":"end"},{"t":"text","p":[128,54],"s":"2,0 g/mol","c":"muted","size":10,"a":"start"},{"t":"rect","p":[200,40,403.3,22],"c":"force2","r":1},{"t":"text","p":[609.3,56],"s":"1921","c":"ax","size":11,"a":"start"},{"t":"text","p":[120,88],"s":"He","c":"ax","size":13,"a":"end"},{"t":"text","p":[128,88],"s":"4,0 g/mol","c":"muted","size":10,"a":"start"},{"t":"rect","p":[200,74,286.2,22],"c":"force2","r":1},{"t":"text","p":[492.2,90],"s":"1363","c":"ax","size":11,"a":"start"},{"t":"text","p":[120,122],"s":"H₂O","c":"ax","size":13,"a":"end"},{"t":"text","p":[128,122],"s":"18,0 g/mol","c":"muted","size":10,"a":"start"},{"t":"rect","p":[200,108,134.9,22],"c":"force2","r":1},{"t":"text","p":[340.9,124],"s":"643","c":"ax","size":11,"a":"start"},{"t":"text","p":[120,156],"s":"N₂","c":"ax","size":13,"a":"end"},{"t":"text","p":[128,156],"s":"28,0 g/mol","c":"muted","size":10,"a":"start"},{"t":"rect","p":[200,142,108.2,22],"c":"force2","r":1},{"t":"text","p":[314.2,158],"s":"515","c":"ax","size":11,"a":"start"},{"t":"text","p":[120,190],"s":"O₂","c":"ax","size":13,"a":"end"},{"t":"text","p":[128,190],"s":"32,0 g/mol","c":"muted","size":10,"a":"start"},{"t":"rect","p":[200,176,101.2,22],"c":"force2","r":1},{"t":"text","p":[307.2,192],"s":"482","c":"ax","size":11,"a":"start"},{"t":"text","p":[120,224],"s":"CO₂","c":"ax","size":13,"a":"end"},{"t":"text","p":[128,224],"s":"44,0 g/mol","c":"muted","size":10,"a":"start"},{"t":"rect","p":[200,210,86.3,22],"c":"force2","r":1},{"t":"text","p":[292.3,226],"s":"411","c":"ax","size":11,"a":"start"}]}
---
Velocità quadratiche medie di alcune molecole a $25\,^\circ\mathrm{C}$. Tutte hanno la stessa energia cinetica media; la velocità è inversamente proporzionale alla radice della massa molare.
:::

Le molecole di azoto dell'aria che respiriamo si muovono in media a circa $500\un{m/s}$, più veloci del suono, che nell'aria a $25\,^\circ\mathrm{C}$ viaggia a $346\un{m/s}$. Le velocità delle singole molecole sono distribuite attorno a questo valore, e la forma della distribuzione, ricavata da Maxwell nel 1860, è descritta nel capitolo [Gas ideali](unit:physics-18) del volume di fisica.

::: approfondimento Quanto spazio c'è in un gas
A $25\,^\circ\mathrm{C}$ e $1\un{bar}$ ogni molecola dispone in media di un volume $kT/P\simeq4{,}1\times10^{-26}\un{m^3}$, un cubo di lato $3{,}4\un{nm}$, circa dieci volte il diametro di una molecola di azoto, $0{,}37\un{nm}$. Le molecole occupano meno dell'uno per mille del volume del gas, e questo giustifica la seconda ipotesi del modello.

Una molecola percorre in media, fra un urto e il successivo, una distanza detta **cammino libero medio**,
$$\lambda=\frac{kT}{\sqrt2\,\pi d^2P},$$
dove $d$ è il diametro molecolare. Per l'azoto a $25\,^\circ\mathrm{C}$ e $1\un{bar}$ si ottiene circa $68\un{nm}$, duecento volte il diametro della molecola. Con una velocità media di $475\un{m/s}$, ogni molecola subisce circa sette miliardi di urti al secondo. Il cammino libero medio è inversamente proporzionale alla pressione: in un vuoto da laboratorio a un milionesimo di bar diventa di qualche centimetro, confrontabile con le dimensioni del recipiente.
:::

## Effusione e diffusione {#effusione}

L'**effusione** è il passaggio di un gas attraverso un forellino in una parete sottile, verso una regione a pressione minore. Il numero di molecole che passano per unità di tempo è proporzionale alla loro velocità media, e quindi inversamente proporzionale alla radice della massa molare. Thomas Graham lo scoprì sperimentalmente nel 1846; la **legge di Graham** si scrive, per due gas alle stesse condizioni,

$$\frac{\text{velocità di effusione di A}}{\text{velocità di effusione di B}}=\sqrt{\frac{M_\mathrm{B}}{M_\mathrm{A}}}.$$

L'elio effonde $\sqrt{28{,}0/4{,}00}\simeq2{,}65$ volte più velocemente dell'azoto, ed è per questo che un palloncino di gomma gonfiato con l'elio si sgonfia in un giorno, mentre uno gonfiato con il fiato resta gonfio per giorni. La **diffusione**, il mescolamento spontaneo di un gas con un altro, segue una legge simile, anche se più lenta, perché ogni molecola procede a zigzag fra miliardi di urti: il profumo di una bottiglia aperta impiega minuti, invece di millisecondi, ad attraversare una stanza, e nella pratica è trasportato soprattutto dalle correnti d'aria.

La legge di Graham ha avuto un'applicazione storica nella separazione degli isotopi dell'uranio. L'uranio naturale contiene lo $0{,}72\%$ di uranio $235$, l'isotopo fissile, e il resto quasi tutto di uranio $238$. Trasformato nell'esafluoruro $\mathrm{UF_6}$, un composto volatile, l'uranio fu arricchito per effusione attraverso membrane porose negli impianti costruiti negli Stati Uniti dal 1945. A ogni passaggio la frazione dell'isotopo più leggero aumenta di un fattore minimo, e servono centinaia di stadi in serie.

::: storia Gay-Lussac in pallone
Il 16 settembre 1804 Joseph Louis Gay-Lussac partì da solo, in pallone a idrogeno, dal giardino del Conservatorio di arti e mestieri di Parigi. Portava barometri, termometri, igrometri, una bussola e alcuni flaconi vuoti. Salì fino a circa $7000\un{m}$, dove la pressione scese a meno della metà di quella al suolo e la temperatura sotto lo zero; misurò temperatura e pressione a quote diverse e riempì i flaconi d'aria. Tornato a terra, analizzò i campioni e trovò che l'aria in quota conteneva la stessa proporzione di ossigeno dell'aria al suolo. Il record di quota resistette per più di cinquant'anni. Quattro anni dopo lo stesso Gay-Lussac enunciò la legge dei volumi di combinazione dei gas.
:::

## I gas reali {#reali}

L'equazione di stato dei gas ideali vale quando le molecole sono lontane fra loro, cioè a pressioni basse e a temperature alte. Per misurare quanto un gas reale se ne discosta si usa il **fattore di compressibilità**

$$Z=\frac{PV}{nRT},$$

che vale esattamente $1$ per un gas ideale. Valori minori di $1$ indicano che il gas occupa meno volume di un gas ideale, perché le attrazioni fra molecole le tengono più vicine; valori maggiori di $1$ indicano che prevale il volume proprio delle molecole, che a pressioni alte non è più trascurabile.

::: figura z
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[200,""],"sx":1.2,"sy":260,"xt":[[100,"100"],[200,"200"],[300,"300"],[400,"400"]],"yt":[[0.15,"0,8"],[0.35,"1,0"],[0.55,"1,2"],[0.75,"1,4"]]},{"t":"text","p":[40,30],"s":"Z = PV/(nRT)","c":"ax","size":12,"a":"start"},{"t":"text","p":[600,292],"s":"pressione (bar)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":1.2,"sy":260,"pts":[[0,0.35],[420,0.35]],"c":"muted","w":1.4,"dash":true},{"t":"text","p":[582.0,151.0],"s":"gas ideale","c":"muted","size":11,"a":"end"},{"t":"plot","o":[80,250],"sx":1.2,"sy":260,"pts":[[1,0.3506695],[5,0.3533615],[10,0.3567572],[15,0.3601866],[20,0.3636496],[25,0.3671456],[30,0.3706743],[35,0.3742353],[40,0.3778282],[45,0.3814527],[50,0.3851083],[55,0.3887946],[60,0.3925113],[65,0.3962579],[70,0.400034],[75,0.4038393],[80,0.4076733],[85,0.4115357],[90,0.4154259],[95,0.4193436],[100,0.4232885],[105,0.42726],[110,0.4312579],[115,0.4352816],[120,0.4393308],[125,0.4434051],[130,0.4475041],[135,0.4516274],[140,0.4557746],[145,0.4599453],[150,0.4641392],[155,0.4683558],[160,0.4725947],[165,0.4768557],[170,0.4811383],[175,0.4854421],[180,0.4897668],[185,0.4941121],[190,0.4984775],[195,0.5028627],[200,0.5072674],[205,0.5116912],[210,0.5161337],[215,0.5205947],[220,0.5250739],[225,0.5295708],[230,0.5340851],[235,0.5386166],[240,0.5431649],[245,0.5477298],[250,0.5523108],[255,0.5569078],[260,0.5615203],[265,0.5661482],[270,0.5707912],[275,0.5754489],[280,0.580121],[285,0.5848074],[290,0.5895077],[295,0.5942218],[300,0.5989492],[305,0.6036898],[310,0.6084432],[315,0.6132094],[320,0.617988],[325,0.6227788],[330,0.6275815],[335,0.6323959],[340,0.6372219],[345,0.6420591],[350,0.6469074],[355,0.6517666],[360,0.6566364],[365,0.6615166],[370,0.6664071],[375,0.6713076],[380,0.6762179],[385,0.6811379],[390,0.6860674],[395,0.6910062],[400,0.695954],[405,0.7009108],[410,0.7058764],[415,0.7108505],[420,0.7158331]],"c":"force3","w":2.4},{"t":"text","p":[590.0,67.9],"s":"H₂","c":"force3","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":1.2,"sy":260,"pts":[[1,0.3493515],[5,0.3467984],[10,0.3437019],[15,0.340717],[20,0.3378497],[25,0.3351068],[30,0.3324949],[35,0.3300206],[40,0.3276908],[45,0.3255123],[50,0.3234921],[55,0.3216368],[60,0.3199532],[65,0.3184478],[70,0.317127],[75,0.315997],[80,0.3150636],[85,0.3143322],[90,0.3138078],[95,0.3134952],[100,0.3133984],[105,0.313521],[110,0.313866],[115,0.3144358],[120,0.3152321],[125,0.3162561],[130,0.3175082],[135,0.3189884],[140,0.3206957],[145,0.3226288],[150,0.3247857],[155,0.3271638],[160,0.3297602],[165,0.3325711],[170,0.3355927],[175,0.3388205],[180,0.34225],[185,0.3458759],[190,0.3496933],[195,0.3536965],[200,0.35788],[205,0.3622381],[210,0.366765],[215,0.371455],[220,0.3763022],[225,0.3813009],[230,0.3864452],[235,0.3917297],[240,0.3971487],[245,0.4026967],[250,0.4083686],[255,0.414159],[260,0.4200631],[265,0.4260758],[270,0.4321925],[275,0.4384087],[280,0.4447199],[285,0.4511219],[290,0.4576107],[295,0.4641824],[300,0.4708331],[305,0.4775594],[310,0.4843577],[315,0.4912249],[320,0.4981577],[325,0.5051532],[330,0.5122085],[335,0.5193208],[340,0.5264875],[345,0.5337062],[350,0.5409744],[355,0.54829],[360,0.5556506],[365,0.5630543],[370,0.5704991],[375,0.5779832],[380,0.5855046],[385,0.5930618],[390,0.6006532],[395,0.6082771],[400,0.615932],[405,0.6236167],[410,0.6313297],[415,0.6390698],[420,0.6468357]],"c":"force2","w":2.4},{"t":"text","p":[590.0,85.8],"s":"N₂","c":"force2","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":1.2,"sy":260,"pts":[[1,0.3480218],[5,0.3400913],[10,0.330142],[15,0.3201594],[20,0.3101521],[25,0.3001308],[30,0.2901078],[35,0.2800979],[40,0.2701184],[45,0.2601896],[50,0.2503351],[55,0.2405821],[60,0.2309622],[65,0.2215111],[70,0.2122694],[75,0.2032821],[80,0.1945991],[85,0.1862743],[90,0.1783651],[95,0.1709312],[100,0.1640328],[105,0.157729],[110,0.1520751],[115,0.1471207],[120,0.1429071],[125,0.1394653],[130,0.1368152],[135,0.1349647],[140,0.1339097],[145,0.1336357],[150,0.1341184],[155,0.1353264],[160,0.1372222],[165,0.139765],[170,0.1429117],[175,0.1466186],[180,0.1508426],[185,0.1555418],[190,0.1606765],[195,0.1662092],[200,0.1721049],[205,0.1783315],[210,0.1848593],[215,0.1916611],[220,0.1987123],[225,0.2059902],[230,0.2134747],[235,0.2211471],[240,0.2289907],[245,0.2369904],[250,0.2451325],[255,0.2534046],[260,0.2617954],[265,0.2702946],[270,0.2788932],[275,0.2875826],[280,0.2963553],[285,0.3052043],[290,0.3141233],[295,0.3231066],[300,0.3321488],[305,0.3412453],[310,0.3503916],[315,0.3595836],[320,0.3688178],[325,0.3780907],[330,0.3873993],[335,0.3967407],[340,0.4061123],[345,0.4155116],[350,0.4249365],[355,0.4343849],[360,0.4438549],[365,0.4533448],[370,0.4628528],[375,0.4723777],[380,0.4819178],[385,0.491472],[390,0.501039],[395,0.5106178],[400,0.5202074],[405,0.5298066],[410,0.5394148],[415,0.5490309],[420,0.5586543]],"c":"force","w":2.4},{"t":"text","p":[590.0,108.7],"s":"CH₄","c":"force","size":12,"a":"start"}]}
---
Fattore di compressibilità di idrogeno, azoto e metano a $300\un{K}$, calcolato con l'equazione di van der Waals, che riproduce l'andamento qualitativo delle misure. Per il metano, con forze di dispersione più intense, prevalgono a pressioni moderate le attrazioni; per l'idrogeno il volume molecolare prevale già a pressioni basse.
:::

Nel 1873 Johannes van der Waals propose di correggere l'equazione dei gas ideali con due parametri caratteristici di ciascun gas. Il volume a disposizione delle molecole è $V-nb$, minore di $V$, dove $b$ è il volume escluso da una mole di molecole. La pressione misurata è minore di quella che si avrebbe senza attrazioni, perché ogni molecola che sta per urtare la parete è trattenuta dalle vicine; la correzione è proporzionale al quadrato della concentrazione, $an^2/V^2$. L'**equazione di van der Waals** è

$$\left(P+\frac{an^2}{V^2}\right)\left(V-nb\right)=nRT.$$

Il parametro $a$ misura l'intensità delle attrazioni fra le molecole, e cresce con la temperatura di ebollizione, che dipende dalle stesse forze; il parametro $b$ è legato alle dimensioni delle molecole.

::: figura vdw-a
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[210,""],"sx":1.25,"sy":34,"xt":[[100,"100"],[200,"200"],[300,"300"],[400,"400"]],"yt":[[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"]]},{"t":"text","p":[40,26],"s":"a (bar L²/mol²)","c":"ax","size":12,"a":"start"},{"t":"text","p":[600,292],"s":"temperatura di ebollizione (K)","c":"ax","size":13,"a":"end"},{"t":"circle","p":[85.2,248.8,5],"c":"force"},{"t":"text","p":[93.2,242.8],"s":"He","c":"ax","size":12,"a":"start"},{"t":"circle","p":[176.8,203.4,5],"c":"force"},{"t":"text","p":[168.8,195.4],"s":"N₂","c":"ax","size":12,"a":"end"},{"t":"circle","p":[189.1,203.9,5],"c":"force"},{"t":"text","p":[197.1,215.9],"s":"Ar","c":"ax","size":12,"a":"start"},{"t":"circle","p":[219.6,171.7,5],"c":"force"},{"t":"text","p":[227.6,165.7],"s":"CH₄","c":"ax","size":12,"a":"start"},{"t":"circle","p":[286.4,107.5,5],"c":"force"},{"t":"text","p":[278.4,101.5],"s":"Xe","c":"ax","size":12,"a":"end"},{"t":"circle","p":[379.8,106.4,5],"c":"force"},{"t":"text","p":[387.8,118.4],"s":"NH₃","c":"ax","size":12,"a":"start"},{"t":"circle","p":[546.4,61.8,5],"c":"force"},{"t":"text","p":[538.4,53.8],"s":"H₂O","c":"ax","size":12,"a":"end"}]}
---
Il parametro $a$ dell'equazione di van der Waals in funzione della temperatura di ebollizione. Le sostanze con forze intermolecolari più intense hanno valori di $a$ maggiori e bollono a temperature più alte.
:::

Le forze di attrazione sono anche la ragione per cui i gas possono essere liquefatti. Comprimendo un gas a temperatura costante, le molecole si avvicinano, e se l'energia termica non basta a vincere le attrazioni il gas condensa. Al di sopra di una temperatura caratteristica di ogni sostanza, la **temperatura critica**, l'energia termica è troppo grande e nessuna compressione produce un liquido distinto dal gas. Per l'anidride carbonica la temperatura critica è $31{,}0\,^\circ\mathrm{C}$, per questo a temperatura ambiente si può tenere liquida in bombola sotto pressione; per l'azoto è $-147\,^\circ\mathrm{C}$, e l'azoto si liquefa soltanto dopo averlo raffreddato sotto questa temperatura. Il comportamento vicino al punto critico è descritto nel capitolo [Stati della materia e transizioni](unit:chemistry-11).

## Errori frequenti {#errori}

::: errore Il volume molare vale sempre 22,4 litri
Il volume molare dipende da temperatura e pressione: $22{,}4\un{L}$ è il valore a $0\,^\circ\mathrm{C}$ e $1\un{atm}$. A $25\,^\circ\mathrm{C}$ e $1\un{bar}$, condizioni più vicine a quelle di un laboratorio, vale $24{,}8\un{L}$, il $10\%$ in più.
:::

::: errore Le molecole pesanti sono lente perché hanno meno energia
Alla stessa temperatura tutte le molecole di un gas hanno la stessa energia cinetica media. Le molecole pesanti sono più lente perché, a parità di energia, una massa maggiore corrisponde a una velocità minore.
:::

::: errore Pressione parziale e percentuale in massa
La pressione parziale è proporzionale alla frazione molare del componente, e la frazione in massa è un'altra grandezza. Nell'aria l'ossigeno è il $20{,}95\%$ delle molecole e il $23{,}1\%$ della massa, perché le sue molecole sono più pesanti di quelle dell'azoto.
:::

::: errore I gas reali occupano sempre meno spazio dei gas ideali
Il fattore di compressibilità di un gas reale è minore di $1$ quando prevalgono le attrazioni, a pressioni moderate, e maggiore di $1$ quando prevale il volume delle molecole, a pressioni alte. Per l'idrogeno e l'elio a temperatura ambiente prevale il secondo effetto già a pochi bar.
:::

::: errore Lo zero assoluto si può raggiungere raffreddando abbastanza
Lo zero assoluto è un limite. Le tecniche di raffreddamento più avanzate hanno raggiunto temperature inferiori a un miliardesimo di kelvin, senza mai toccarlo; il terzo principio della termodinamica stabilisce che non lo si può raggiungere con un numero finito di operazioni.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- La pressione è forza per unità di superficie: $1\un{atm}=101{,}325\un{kPa}=760\un{mmHg}$, $1\un{bar}=100\un{kPa}$.
- A temperatura costante $PV$ è costante (Boyle); a pressione costante $V/T$ è costante, con $T$ in kelvin (Charles); a $P$ e $T$ costanti $V/n$ è costante (Avogadro).
- Le tre leggi si riuniscono nell'equazione di stato $PV=nRT$, con $R=8{,}314\un{J/(mol\,K)}$, pari a $0{,}08314\un{L\,bar/(mol\,K)}$.
- Il volume molare vale $22{,}7\un{L}$ a $0\,^\circ\mathrm{C}$ e $1\un{bar}$, $24{,}8\un{L}$ a $25\,^\circ\mathrm{C}$ e $1\un{bar}$.
- La densità di un gas è $\rho=PM/(RT)$, e permette di ricavarne la massa molare.
- In una miscela la pressione totale è la somma delle pressioni parziali, e $P_\mathrm{A}=x_\mathrm{A}P_\mathrm{tot}$.
- Nel modello cinetico la pressione nasce dagli urti delle molecole e l'energia cinetica media è $\tfrac32RT$ per mole; la velocità quadratica media è $\sqrt{3RT/M}$.
- Le velocità di effusione stanno nel rapporto inverso delle radici delle masse molari (Graham).
- I gas reali si discostano dal comportamento ideale per le attrazioni fra molecole e per il loro volume; l'equazione di van der Waals ne tiene conto con i parametri $a$ e $b$.
:::

## Glossario {#glossario}

- **Pressione**: forza perpendicolare per unità di superficie.
- **Barometro**: strumento per misurare la pressione atmosferica.
- **Atmosfera standard**: pressione di $101\,325\un{Pa}$, pari a quella di una colonna di mercurio alta $760\un{mm}$.
- **Legge di Boyle**: a temperatura costante il volume di una quantità fissata di gas è inversamente proporzionale alla pressione.
- **Legge di Charles**: a pressione costante il volume di una quantità fissata di gas è proporzionale alla temperatura assoluta.
- **Legge di Avogadro**: volumi uguali di gas alla stessa temperatura e pressione contengono lo stesso numero di molecole.
- **Zero assoluto**: la temperatura più bassa possibile, $0\un{K}=-273{,}15\,^\circ\mathrm{C}$.
- **Volume molare**: volume occupato da una mole di gas a temperatura e pressione specificate.
- **Gas ideale**: gas che obbedisce esattamente all'equazione $PV=nRT$.
- **Pressione parziale**: pressione che un componente di una miscela eserciterebbe da solo nello stesso volume e alla stessa temperatura.
- **Frazione molare**: rapporto fra le moli di un componente e le moli totali della miscela.
- **Velocità quadratica media**: radice quadrata della media dei quadrati delle velocità delle molecole.
- **Effusione**: passaggio di un gas attraverso un forellino verso una regione a pressione minore.
- **Cammino libero medio**: distanza media percorsa da una molecola fra due urti successivi.
- **Fattore di compressibilità**: rapporto $PV/(nRT)$, uguale a $1$ per un gas ideale.
- **Temperatura critica**: temperatura al di sopra della quale un gas non può essere liquefatto per sola compressione.

## Esercizi {#esercizi}

Dati utili: $R=8{,}314\un{J/(mol\,K)}$, pari a $0{,}08314\un{L\,bar/(mol\,K)}$; $1\un{atm}=101{,}325\un{kPa}=760\un{mmHg}$; $k=1{,}381\times10^{-23}\un{J/K}$; volume molare a $25\,^\circ\mathrm{C}$ e $1\un{bar}$: $24{,}79\un{L/mol}$; tensione di vapore dell'acqua a $25\,^\circ\mathrm{C}$: $3{,}17\un{kPa}$.

::: esercizio Unità di pressione [base]
Un barometro segna $745\un{mmHg}$. Esprimere la pressione in kilopascal, in atmosfere e in bar.
>>> soluzione
$745\times101{,}325/760\simeq99{,}3\un{kPa}$, cioè $745/760\simeq0{,}980\un{atm}$ e $0{,}993\un{bar}$.
:::

::: esercizio Comprimere una siringa [base]
In una siringa tappata ci sono $20{,}0\un{mL}$ d'aria a $1{,}00\un{bar}$. Spingendo lo stantuffo il volume scende a $8{,}0\un{mL}$ senza variazioni di temperatura. Qual è la nuova pressione?
>>> soluzione
Per la legge di Boyle $P_2=P_1V_1/V_2$, cioè $1{,}00\times20{,}0/8{,}0=2{,}5\un{bar}$.
:::

::: esercizio Un palloncino nel congelatore [base]
Un palloncino contiene $3{,}0\un{L}$ d'aria a $20\,^\circ\mathrm{C}$. Che volume ha nel congelatore, a $-15\,^\circ\mathrm{C}$, alla stessa pressione?
>>> soluzione
Con le temperature assolute, $V_2=3{,}0\times258{,}15/293{,}15\simeq2{,}6\un{L}$. Scrivere i rapporti con le temperature in gradi Celsius darebbe un volume negativo, privo di senso.
:::

::: esercizio Quante moli in un recipiente [base]
Un recipiente da $5{,}0\un{L}$ contiene anidride carbonica a $25\,^\circ\mathrm{C}$ e $1{,}00\un{bar}$. Calcolare la quantità chimica e la massa del gas.
>>> soluzione
$n=PV/(RT)\simeq0{,}202\un{mol}$, cioè $0{,}202\times44{,}01\simeq8{,}9\un{g}$.
:::

::: esercizio L'ossigeno in montagna [base]
In un rifugio alpino la pressione atmosferica è $70{,}0\un{kPa}$. Calcolare la pressione parziale dell'ossigeno, sapendo che la sua frazione molare nell'aria secca è $0{,}2095$, e confrontarla con quella al livello del mare.
>>> soluzione
$P_{\mathrm{O_2}}=0{,}2095\times70{,}0\simeq14{,}7\un{kPa}$, contro $21{,}2\un{kPa}$ al livello del mare: il $31\%$ in meno, anche se la composizione dell'aria è la stessa.
:::

::: esercizio Riconoscere un gas dalla densità [medio]
Un gas incolore ha densità $1{,}80\un{g/L}$ a $25\,^\circ\mathrm{C}$ e $1{,}00\un{bar}$. Calcolarne la massa molare e proporre quale gas potrebbe essere. Quale misura aggiuntiva permetterebbe di decidere?
>>> soluzione
$M=\rho RT/P\simeq44{,}6\un{g/mol}$. Hanno masse molari vicine l'anidride carbonica, $44{,}01$, il protossido di azoto, $44{,}01$, e il propano, $44{,}10\un{g/mol}$. Bastano prove chimiche: il propano brucia, l'anidride carbonica intorbida l'acqua di calce, il protossido di azoto ravviva la combustione di una scheggia di legno.
:::

::: esercizio Ossigeno raccolto su acqua [medio]
Si raccolgono $250\un{mL}$ di ossigeno su acqua a $25\,^\circ\mathrm{C}$; la pressione totale nel recipiente è $100{,}8\un{kPa}$. Calcolare la massa di ossigeno raccolto.
>>> soluzione
La pressione parziale dell'ossigeno è $100{,}8-3{,}17=97{,}6\un{kPa}$. Con $V=2{,}50\times10^{-4}\un{m^3}$, $n=PV/(RT)\simeq9{,}85\times10^{-3}\un{mol}$, cioè circa $0{,}315\un{g}$.
:::

::: esercizio Volumi di combinazione [medio]
Calcolare il volume di ossigeno necessario per bruciare completamente $2{,}5\un{L}$ di propano e i volumi di anidride carbonica e di vapore acqueo prodotti, tutti misurati a $150\,^\circ\mathrm{C}$ e alla stessa pressione. Come cambia il risultato per l'acqua se i prodotti si raffreddano a $25\,^\circ\mathrm{C}$?
>>> soluzione
I volumi stanno come i coefficienti: $12{,}5\un{L}$ di ossigeno, $7{,}5\un{L}$ di anidride carbonica e $10\un{L}$ di vapore. A $25\,^\circ\mathrm{C}$ quasi tutta l'acqua condensa, e i volumi gassosi vanno inoltre ricalcolati per la nuova temperatura.
:::

::: esercizio Il pallone ad aria calda [medio]
Calcolare la densità dell'aria, $M=28{,}96\un{g/mol}$, a $101{,}3\un{kPa}$ e alle temperature di $20$ e $100\,^\circ\mathrm{C}$. Quale massa può sollevare un pallone di $2800\un{m^3}$ riempito d'aria a $100\,^\circ\mathrm{C}$ in un ambiente a $20\,^\circ\mathrm{C}$?
>>> soluzione
$\rho=PM/(RT)$ vale $1{,}204\un{kg/m^3}$ a $20\,^\circ\mathrm{C}$ e $0{,}946\un{kg/m^3}$ a $100\,^\circ\mathrm{C}$. Ogni metro cubo d'aria calda pesa $0{,}258\un{kg}$ meno dell'aria che sposta, e il pallone può sollevare circa $720\un{kg}$, comprese la sua struttura e la sua tela.
:::

::: esercizio Elio e azoto [medio]
Calcolare la velocità quadratica media dell'elio e dell'azoto a $25\,^\circ\mathrm{C}$ e il rapporto fra le loro velocità di effusione.
>>> soluzione
$v_\mathrm{qm}=\sqrt{3RT/M}$: per l'elio, $M=4{,}003\times10^{-3}\un{kg/mol}$, circa $1363\un{m/s}$; per l'azoto, $M=28{,}01\times10^{-3}\un{kg/mol}$, circa $515\un{m/s}$. Il rapporto delle velocità di effusione è $\sqrt{28{,}01/4{,}003}\simeq2{,}65$.
:::

::: esercizio Van der Waals per l'anidride carbonica [avanzato]
Calcolare la pressione di $1{,}000\un{mol}$ di anidride carbonica in un recipiente da $1{,}000\un{L}$ a $300\un{K}$ con l'equazione dei gas ideali e con quella di van der Waals, con $a=3{,}640\un{L^2\,bar/mol^2}$ e $b=0{,}04267\un{L/mol}$. Quale delle due correzioni pesa di più?
>>> soluzione
Gas ideale: $P=0{,}08314\times300/1{,}000\simeq24{,}94\un{bar}$. Van der Waals: il primo termine, $nRT/(V-nb)$, vale $24{,}94/0{,}9573\simeq26{,}06\un{bar}$, più del valore ideale perché il volume disponibile è minore; sottraendo $an^2/V^2=3{,}64\un{bar}$ si ottiene $22{,}42\un{bar}$. La correzione per le attrazioni, $3{,}6\un{bar}$, supera quella per il volume, $1{,}1\un{bar}$: a questa densità l'anidride carbonica è più comprimibile di un gas ideale, e $Z\simeq0{,}90$.
:::

::: esercizio Urti fra molecole [avanzato]
Calcolare il cammino libero medio delle molecole di azoto, $d=0{,}37\un{nm}$, a $25\,^\circ\mathrm{C}$ e $1\un{bar}$, e il numero di urti al secondo di ciascuna molecola, con velocità media $475\un{m/s}$. Ripetere il calcolo per una pressione di $10^{-6}\un{bar}$.
>>> soluzione
$\lambda=kT/(\sqrt2\pi d^2P)$: con $kT=4{,}12\times10^{-21}\un{J}$ e $\sqrt2\pi d^2P=6{,}08\times10^{-14}\un{N}$ si ottiene $\lambda\simeq6{,}8\times10^{-8}\un{m}$, cioè $68\un{nm}$, e circa $475/6{,}8\times10^{-8}\simeq7\times10^{9}$ urti al secondo. A $10^{-6}\un{bar}$ il cammino libero medio è un milione di volte maggiore, circa $7\un{cm}$, e gli urti diventano circa settemila al secondo.
:::

::: esercizio Arricchire l'uranio [avanzato]
Il rapporto fra le velocità di effusione di $\mathrm{^{235}UF_6}$, $M=349{,}03\un{g/mol}$, e $\mathrm{^{238}UF_6}$, $M=352{,}04\un{g/mol}$, è il fattore di separazione ideale di uno stadio. Calcolarlo. Il rapporto fra le quantità dei due isotopi viene moltiplicato per questo fattore a ogni stadio: quanti stadi ideali servono per passare dallo $0{,}72\%$ al $4{,}0\%$ di uranio $235$?
>>> soluzione
Il fattore vale $\sqrt{352{,}04/349{,}03}\simeq1{,}0043$. Il rapporto fra gli isotopi passa da $0{,}0072/0{,}9928\simeq0{,}00725$ a $0{,}040/0{,}960\simeq0{,}0417$, cioè cresce di $5{,}75$ volte. Il numero di stadi è $\ln5{,}75/\ln1{,}0043\simeq410$. Gli stadi reali, meno efficienti di quelli ideali, sono molti di più.
:::

::: esercizio Profondità massima [avanzato]
In mare la pressione totale alla profondità $d$, in metri, vale circa $P=1{,}013+0{,}1006\,d$ in bar. Calcolare la profondità alla quale la pressione parziale dell'ossigeno raggiunge $1{,}4\un{bar}$ respirando aria, con $x_{\mathrm{O_2}}=0{,}2095$, e respirando una miscela nitrox al $32\%$ di ossigeno.
>>> soluzione
Con l'aria la pressione totale deve essere $1{,}4/0{,}2095\simeq6{,}68\un{bar}$, raggiunta a $(6{,}68-1{,}013)/0{,}1006\simeq56\un{m}$. Con il nitrox al $32\%$ basta $1{,}4/0{,}32\simeq4{,}38\un{bar}$, raggiunta a circa $33\un{m}$. La miscela più ricca di ossigeno riduce l'azoto respirato, ma limita la profondità.
:::

::: esercizio Lo spazio vuoto di un gas [avanzato]
Calcolare il volume medio a disposizione di una molecola di un gas ideale a $25\,^\circ\mathrm{C}$ e $1\un{bar}$, e il lato del cubo corrispondente. Confrontare quel volume con il volume di una molecola di azoto considerata come una sfera di diametro $0{,}37\un{nm}$. Ripetere il confronto per l'azoto liquido, densità $0{,}807\un{g/cm^3}$.
>>> soluzione
$kT/P\simeq4{,}12\times10^{-26}\un{m^3}$, un cubo di lato circa $3{,}45\un{nm}$. La sfera, di raggio $0{,}185\un{nm}$, ha volume $\tfrac43\pi r^3\simeq2{,}65\times10^{-29}\un{m^3}$, lo $0{,}064\%$ del volume a disposizione. Nel liquido ogni molecola dispone del volume $M/(\rho N_A)\simeq5{,}8\times10^{-23}\un{cm^3}$, cioè $5{,}8\times10^{-29}\un{m^3}$, e la sfera ne occupa quasi la metà.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 6-1–6-9. I dati numerici provengono dalle fonti seguenti.

1. Costanti fondamentali e costante dei gas: CODATA 2022. Densità del mercurio e volumi molari: tabelle correnti di fisica e chimica; definizione dell'atmosfera standard e della pressione standard IUPAC.
2. Composizione dell'aria secca: valori di riferimento della US Standard Atmosphere; frazione dell'anidride carbonica: NOAA Global Monitoring Laboratory, medie annue di Mauna Loa. Pressione sulla vetta dell'Everest: J. B. West e altri, J. Appl. Physiol. 55 (1983) 678.
3. Parametri di van der Waals, temperature critiche e temperature di ebollizione: CRC Handbook of Chemistry and Physics. Masse isotopiche dell'uranio e del fluoro: AME 2020.
4. Limiti di pressione parziale dell'ossigeno per l'immersione: manuali di immersione delle principali didattiche subacquee e US Navy Diving Manual.
5. Per la storia: E. Torricelli, lettera a M. Ricci (1644); R. Boyle (1662); J. L. Gay-Lussac (1802, 1804, 1808); A. Avogadro, J. Phys. 73 (1811) 58; J. Dalton (1801); T. Graham (1846); J. D. van der Waals (1873); lord Rayleigh e W. Ramsay (1895).
