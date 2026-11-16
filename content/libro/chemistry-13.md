---
unit: chemistry-13
titolo: Solubilità ed equilibrio eterogeneo
sottotitolo: Prodotto di solubilità, ione comune, precipitazione e ioni complessi
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §18-1–18-7
---

## Prima di cominciare {#apertura}

Nelle grotte carsiche le stalattiti crescono in media di frazioni di millimetro all'anno: l'acqua che gocciola dalla volta deposita carbonato di calcio, un sale quasi insolubile. Nei laboratori fotografici di un tempo il bromuro d'argento delle pellicole, annerito dalla luce, formava l'immagine, e quello rimasto intatto andava sciolto via con un bagno di fissaggio. Negli impianti di depurazione si fanno precipitare i metalli pesanti dalle acque di scarico aggiungendo reagenti scelti con cura. Quanto di questi sali resta in soluzione? E come si fa a farne sciogliere di più, o di meno?

La risposta sta in un equilibrio. In una soluzione satura di un sale poco solubile, come si è visto nel capitolo precedente, il solido si scioglie e si riforma continuamente con la stessa velocità: è un equilibrio dinamico fra due fasi, detto **equilibrio eterogeneo**. Questo capitolo lo descrive con una sola costante, il **prodotto di solubilità**, e mostra come usarla per calcolare la solubilità, per prevedere se un sale precipita, per separare ioni diversi e per capire perché alcuni sali si sciolgono negli acidi o in presenza di ammoniaca.

::: obiettivi
- riconoscere i sali solubili e poco solubili con le regole di solubilità;
- scrivere l'espressione del prodotto di solubilità di un sale poco solubile;
- calcolare la solubilità molare dal prodotto di solubilità e viceversa, per sali di stechiometria diversa;
- prevedere l'effetto di uno ione comune sulla solubilità;
- confrontare il quoziente di reazione con il prodotto di solubilità per decidere se un sale precipita;
- progettare una precipitazione frazionata;
- spiegare l'aumento di solubilità dovuto agli acidi e alla formazione di ioni complessi.
:::

Il capitolo usa la molarità e la solubilità del capitolo [Soluzioni e concentrazione](unit:chemistry-12). Le costanti di equilibrio in generale saranno trattate nel capitolo [Equilibrio chimico](unit:chemistry-19); il prodotto di solubilità ne è il primo esempio.

## Sali solubili e sali poco solubili {#regole}

Fra i composti ionici alcuni si sciolgono in acqua in quantità di centinaia di grammi per litro, altri in quantità di milligrammi o meno. Nessun sale è assolutamente insolubile; nella pratica si chiamano **poco solubili**, o insolubili, i sali con solubilità inferiore a circa un centesimo di mole per litro. Alcune regole empiriche, raccolte dall'esperienza di generazioni di chimici analitici, permettono di prevedere il comportamento dei sali più comuni.

| ioni | in genere | eccezioni principali |
|---|---|---|
| $\mathrm{Na^+}$, $\mathrm{K^+}$, $\mathrm{NH_4^+}$, $\mathrm{NO_3^-}$ | solubili | poche |
| $\mathrm{Cl^-}$, $\mathrm{Br^-}$, $\mathrm{I^-}$ | solubili | sali di $\mathrm{Ag^+}$, $\mathrm{Pb^{2+}}$, $\mathrm{Hg_2^{2+}}$ |
| $\mathrm{SO_4^{2-}}$ | solubili | $\mathrm{Ba^{2+}}$, $\mathrm{Sr^{2+}}$, $\mathrm{Pb^{2+}}$, poco $\mathrm{Ca^{2+}}$ |
| $\mathrm{CO_3^{2-}}$, $\mathrm{PO_4^{3-}}$ | poco solubili | sali dei metalli alcalini e di ammonio |
| $\mathrm{OH^-}$, $\mathrm{S^{2-}}$ | poco solubili | metalli alcalini, ammonio, in parte $\mathrm{Ba^{2+}}$ e $\mathrm{Ca^{2+}}$ |

Le regole dicono soltanto se un sale si scioglie molto o poco. Per sapere quanto, e per fare previsioni quantitative, serve il prodotto di solubilità.

## L'equilibrio di solubilità {#equilibrio}

Si metta un eccesso di cloruro d'argento in acqua. Gli ioni della superficie del cristallo passano in soluzione, e la concentrazione degli ioni disciolti cresce. Man mano che cresce, aumenta anche la frequenza con cui gli ioni in soluzione urtano il cristallo e vi si ridepositano. Quando le due velocità si uguagliano, la concentrazione smette di cambiare: la soluzione è satura, e solido e soluzione sono in equilibrio.

::: figura equilibrio
{"w":680,"h":326,"items":[{"t":"circle","p":[150,200,10],"c":"force2"},{"t":"circle","p":[150,230,14],"c":"force"},{"t":"circle","p":[150,260,10],"c":"force2"},{"t":"circle","p":[188,200,14],"c":"force"},{"t":"circle","p":[188,230,10],"c":"force2"},{"t":"circle","p":[188,260,14],"c":"force"},{"t":"circle","p":[226,200,10],"c":"force2"},{"t":"circle","p":[226,230,14],"c":"force"},{"t":"circle","p":[226,260,10],"c":"force2"},{"t":"circle","p":[264,200,14],"c":"force"},{"t":"circle","p":[264,230,10],"c":"force2"},{"t":"circle","p":[264,260,14],"c":"force"},{"t":"circle","p":[302,200,10],"c":"force2"},{"t":"circle","p":[302,230,14],"c":"force"},{"t":"circle","p":[302,260,10],"c":"force2"},{"t":"circle","p":[340,200,14],"c":"force"},{"t":"circle","p":[340,230,10],"c":"force2"},{"t":"circle","p":[340,260,14],"c":"force"},{"t":"circle","p":[378,200,10],"c":"force2"},{"t":"circle","p":[378,230,14],"c":"force"},{"t":"circle","p":[378,260,10],"c":"force2"},{"t":"circle","p":[416,200,14],"c":"force"},{"t":"circle","p":[416,230,10],"c":"force2"},{"t":"circle","p":[416,260,14],"c":"force"},{"t":"circle","p":[454,200,10],"c":"force2"},{"t":"circle","p":[454,230,14],"c":"force"},{"t":"circle","p":[454,260,10],"c":"force2"},{"t":"circle","p":[190,90,10],"c":"force2"},{"t":"circle","p":[270,120,14],"c":"force"},{"t":"circle","p":[360,80,10],"c":"force2"},{"t":"circle","p":[430,130,14],"c":"force"},{"t":"circle","p":[230,40,14],"c":"force"},{"t":"circle","p":[470,60,10],"c":"force2"},{"t":"line","p":[120,180,500,180],"c":"muted","w":1.2,"dash":true},{"t":"arrow","p":[320,190,350,110],"c":"force3","w":2.4,"head":9},{"t":"text","p":[356,150],"s":"dissoluzione","c":"force3","size":12,"a":"start"},{"t":"arrow","p":[240,104,212,178],"c":"force4","w":2.4,"head":9},{"t":"text","p":[206,140],"s":"precipitazione","c":"force4","size":12,"a":"end"},{"t":"text","p":[560,90],"s":"soluzione satura","c":"ax","size":12,"a":"start"},{"t":"text","p":[560,230],"s":"solido","c":"ax","size":12,"a":"start"},{"t":"text","p":[330,312],"s":"all'equilibrio le due velocità sono uguali","c":"muted","size":11}]}
---
L'equilibrio fra un sale poco solubile e la sua soluzione satura. Gli ioni lasciano continuamente il cristallo e vi ritornano; all'equilibrio le due velocità sono uguali e le concentrazioni in soluzione restano costanti.
:::

Che l'equilibrio sia dinamico si può verificare con un tracciante radioattivo. Se a una soluzione satura di ioduro di piombo, in contatto con il solido, si aggiunge una piccola quantità di ioduro contenente l'isotopo radioattivo iodio $131$, dopo qualche tempo la radioattività si ritrova anche nel solido, mentre la concentrazione della soluzione è rimasta la stessa. Ioni della soluzione sono entrati nel cristallo e altrettanti ne sono usciti. All'equilibrio nulla cambia nelle quantità macroscopiche, mentre a livello delle particelle lo scambio continua senza sosta.

L'equilibrio si scrive con una doppia freccia:

$$\mathrm{AgCl(s)}\rightleftharpoons\mathrm{Ag^+(aq)}+\mathrm{Cl^-(aq)}.$$

L'esperienza mostra che, a temperatura fissata, il prodotto delle concentrazioni dei due ioni nella soluzione satura è costante, qualunque sia la quantità di solido presente e comunque si sia arrivati all'equilibrio. Questa costante è il **prodotto di solubilità**:

$$K_\mathrm{sp}=[\mathrm{Ag^+}][\mathrm{Cl^-}],$$

dove le parentesi quadre indicano le concentrazioni molari all'equilibrio. Il solido resta fuori dall'espressione, perché la sua «concentrazione», la quantità di sostanza per unità di volume del solido stesso, resta la stessa quando se ne scioglie una parte, ed è inclusa nella costante.

Per un sale che libera ioni in rapporto diverso da uno a uno, ogni concentrazione è elevata al proprio coefficiente stechiometrico.

::: definizione Prodotto di solubilità
Per un sale $\mathrm{M}_a\mathrm{X}_b$ che si scioglie secondo $\mathrm{M}_a\mathrm{X}_b(\mathrm s)\rightleftharpoons a\,\mathrm{M}^{m+}(\mathrm{aq})+b\,\mathrm{X}^{x-}(\mathrm{aq})$,
$$K_\mathrm{sp}=[\mathrm M^{m+}]^a\,[\mathrm X^{x-}]^b.$$
:::

Per il fluoruro di calcio, $\mathrm{CaF_2(s)}\rightleftharpoons\mathrm{Ca^{2+}}+2\,\mathrm{F^-}$, si ha $K_\mathrm{sp}=[\mathrm{Ca^{2+}}][\mathrm{F^-}]^2$; per il fosfato di calcio, $\mathrm{Ca_3(PO_4)_2}$, $K_\mathrm{sp}=[\mathrm{Ca^{2+}}]^3[\mathrm{PO_4^{3-}}]^2$. Il prodotto di solubilità, come tutte le costanti di equilibrio, dipende dalla temperatura; i valori tabulati si riferiscono di solito a $25\,^\circ\mathrm{C}$. Alcuni valori sono: $1{,}77\times10^{-10}$ per il cloruro d'argento, $5{,}35\times10^{-13}$ per il bromuro, $8{,}52\times10^{-17}$ per lo ioduro, $1{,}08\times10^{-10}$ per il solfato di bario, $3{,}36\times10^{-9}$ per il carbonato di calcio, $3{,}45\times10^{-11}$ per il fluoruro di calcio.

## Dal prodotto di solubilità alla solubilità {#solubilita-molare}

La **solubilità molare** $s$ di un sale è la quantità di sale, in moli, che si scioglie in un litro di soluzione satura. Dalle relazioni stechiometriche si ricavano le concentrazioni degli ioni in funzione di $s$, e da queste il legame con il prodotto di solubilità.

Per un sale del tipo $\mathrm{AB}$, come il cloruro d'argento, ogni unità formula sciolta libera uno ione di ciascun tipo: $[\mathrm{Ag^+}]=[\mathrm{Cl^-}]=s$, e $K_\mathrm{sp}=s^2$. Quindi

$$s=\sqrt{K_\mathrm{sp}}=\sqrt{1{,}77\times10^{-10}}\simeq1{,}33\times10^{-5}\un{mol/L},$$

che, moltiplicati per la massa molare, $143{,}32\un{g/mol}$, corrispondono a $1{,}9\un{mg}$ per litro. Per sciogliere un grammo di cloruro d'argento servirebbero più di cinquecento litri d'acqua.

::: esempio Il fluoruro di calcio
Calcolare la solubilità molare del fluoruro di calcio, $K_\mathrm{sp}=3{,}45\times10^{-11}$, e la sua solubilità in milligrammi per litro, con $M=78{,}07\un{g/mol}$.

Ogni unità formula sciolta libera uno ione calcio e due ioni fluoruro: $[\mathrm{Ca^{2+}}]=s$, $[\mathrm{F^-}]=2s$. Quindi $K_\mathrm{sp}=s\,(2s)^2=4s^3$, e
$$s=\sqrt[3]{\frac{K_\mathrm{sp}}4}=\sqrt[3]{8{,}6\times10^{-12}}\simeq2{,}05\times10^{-4}\un{mol/L},$$
cioè circa $16\un{mg/L}$. Il minerale fluorite, fatto di fluoruro di calcio, è una delle principali fonti di fluoro per l'industria.
:::

::: metodo Calcolare una solubilità dal prodotto di solubilità
1. Scrivere l'equilibrio di solubilità con i coefficienti corretti.
2. Esprimere la concentrazione di ogni ione in funzione della solubilità molare $s$, tenendo conto dei coefficienti e degli eventuali ioni già presenti in soluzione.
3. Sostituire nell'espressione del prodotto di solubilità e risolvere per $s$, semplificando quando un termine è trascurabile rispetto a un altro.
4. Verificare a posteriori le semplificazioni, e convertire $s$ nelle unità richieste con la massa molare.
:::

Allo stesso modo, per un sale $\mathrm{A_2B}$ o $\mathrm{AB_2}$ si ha $K_\mathrm{sp}=4s^3$, per un sale $\mathrm{AB_3}$ o $\mathrm{A_3B}$ $K_\mathrm{sp}=27s^4$.

## Dalla solubilità al prodotto di solubilità {#da-s-a-ksp}

Il cammino inverso permette di ricavare il prodotto di solubilità da una misura di solubilità. Per lo ioduro di piombo, $\mathrm{PbI_2}$, un sale giallo brillante, si misura una solubilità molare di $1{,}35\times10^{-3}\un{mol/L}$ a $25\,^\circ\mathrm{C}$. Le concentrazioni degli ioni sono $[\mathrm{Pb^{2+}}]=s$ e $[\mathrm{I^-}]=2s$, e

$$K_\mathrm{sp}=4s^3=4\times(1{,}35\times10^{-3})^3\simeq9{,}8\times10^{-9}.$$

I valori tabulati del prodotto di solubilità si ottengono in gran parte così, oppure da misure elettrochimiche o dalle grandezze termodinamiche di formazione dei sali e degli ioni.

## Confrontare le solubilità {#confronto}

Per sali dello stesso tipo stechiometrico, il confronto dei prodotti di solubilità ordina direttamente le solubilità. Fra gli alogenuri d'argento, tutti del tipo $\mathrm{AB}$, il cloruro è il più solubile e lo ioduro il meno solubile, nello stesso ordine dei prodotti di solubilità.

Per sali di tipo diverso il confronto diretto inganna. Il cromato d'argento, $\mathrm{Ag_2CrO_4}$, ha un prodotto di solubilità di $1{,}12\times10^{-12}$, più di cento volte minore di quello del cloruro d'argento; eppure la sua solubilità molare, $\sqrt[3]{K_\mathrm{sp}/4}\simeq6{,}5\times10^{-5}\un{mol/L}$, è cinque volte maggiore. Il prodotto di solubilità del cromato contiene un quadrato e ha unità diverse, e per confrontare due sali bisogna sempre calcolare le solubilità.

::: figura ksp-s
{"w":680,"h":250,"items":[{"t":"text","p":[255,22],"s":"Kₛₚ","c":"ax","size":12},{"t":"text","p":[505,22],"s":"solubilità (mol/L)","c":"ax","size":12},{"t":"text","p":[100,54],"s":"AgCl","c":"ax","size":13,"a":"end"},{"t":"text","p":[108,54],"s":"AB","c":"muted","size":10,"a":"start"},{"t":"rect","p":[150,41,178.6,22],"c":"force2","r":1},{"t":"text","p":[334.6,57],"s":"1,77×10⁻¹⁰","c":"ax","size":10,"a":"start"},{"t":"rect","p":[400,41,78.7,22],"c":"force","r":1},{"t":"text","p":[484.7,57],"s":"1,33×10⁻⁵","c":"ax","size":10,"a":"start"},{"t":"text","p":[100,92],"s":"BaSO₄","c":"ax","size":13,"a":"end"},{"t":"text","p":[108,92],"s":"AB","c":"muted","size":10,"a":"start"},{"t":"rect","p":[150,79,166.8,22],"c":"force2","r":1},{"t":"text","p":[322.8,95],"s":"1,08×10⁻¹⁰","c":"ax","size":10,"a":"start"},{"t":"rect","p":[400,79,71.2,22],"c":"force","r":1},{"t":"text","p":[477.2,95],"s":"1,04×10⁻⁵","c":"ax","size":10,"a":"start"},{"t":"text","p":[100,130],"s":"Ag₂CrO₄","c":"ax","size":13,"a":"end"},{"t":"text","p":[108,130],"s":"A₂B","c":"muted","size":10,"a":"start"},{"t":"rect","p":[150,117,57.7,22],"c":"force2","r":1},{"t":"text","p":[213.7,133],"s":"1,12×10⁻¹²","c":"ax","size":10,"a":"start"},{"t":"rect","p":[400,117,127.1,22],"c":"force","r":1},{"t":"text","p":[533.1,133],"s":"6,54×10⁻⁵","c":"ax","size":10,"a":"start"},{"t":"text","p":[100,168],"s":"CaF₂","c":"ax","size":13,"a":"end"},{"t":"text","p":[108,168],"s":"AB₂","c":"muted","size":10,"a":"start"},{"t":"rect","p":[150,155,139.6,22],"c":"force2","r":1},{"t":"text","p":[295.6,171],"s":"3,45×10⁻¹¹","c":"ax","size":10,"a":"start"},{"t":"rect","p":[400,155,161.8,22],"c":"force","r":1},{"t":"text","p":[567.8,171],"s":"2,05×10⁻⁴","c":"ax","size":10,"a":"start"},{"t":"text","p":[100,206],"s":"Mg(OH)₂","c":"ax","size":13,"a":"end"},{"t":"text","p":[108,206],"s":"AB₂","c":"muted","size":10,"a":"start"},{"t":"rect","p":[150,193,96.2,22],"c":"force2","r":1},{"t":"text","p":[252.2,209],"s":"5,61×10⁻¹²","c":"ax","size":10,"a":"start"},{"t":"rect","p":[400,193,143.4,22],"c":"force","r":1},{"t":"text","p":[549.4,209],"s":"1,12×10⁻⁴","c":"ax","size":10,"a":"start"},{"t":"text","p":[340,236],"s":"barre in scala logaritmica: Ag₂CrO₄ ha la Kₛₚ più piccola ed è il più solubile dei sali d'argento","c":"muted","size":10}]}
---
Prodotti di solubilità, a sinistra, e solubilità molari, a destra, di alcuni sali poco solubili. L'ordine dei prodotti di solubilità coincide con quello delle solubilità soltanto per sali dello stesso tipo stechiometrico.
:::

## Perché alcuni sali sono poco solubili {#perche}

Sciogliere un sale significa separare gli ioni del reticolo, spendendo l'energia reticolare del capitolo [Legame ionico e interazioni elettrostatiche](unit:chemistry-06), e circondarli di acqua, recuperando l'entalpia di idratazione del capitolo [Forze intermolecolari](unit:chemistry-09). Le due energie sono grandi, centinaia o migliaia di kilojoule per mole, e quasi uguali; la solubilità dipende dalla loro piccola differenza e dall'aumento di disordine che accompagna la dissoluzione. Per questo è difficile prevederla da principi generali, e le regole di solubilità restano empiriche.

Alcune tendenze, però, si capiscono. I solfati dei metalli del gruppo 2 diventano meno solubili scendendo nel gruppo: la solubilità molare, calcolata dai prodotti di solubilità, passa da circa $7\times10^{-3}\un{mol/L}$ per il solfato di calcio a $6\times10^{-4}$ per quello di stronzio e a $1\times10^{-5}$ per quello di bario. Gli idrossidi mostrano la tendenza opposta: l'idrossido di magnesio è quasi insolubile, quello di calcio si scioglie per circa un centesimo di mole per litro, quello di bario per due decimi. La spiegazione sta nelle dimensioni degli anioni. Con un anione grande come il solfato, l'energia reticolare cambia poco al crescere del catione, perché la distanza fra gli ioni è dominata dall'anione; l'entalpia di idratazione del catione, invece, diminuisce molto, e il sale diventa meno solubile. Con un anione piccolo come l'idrossido, è l'energia reticolare a diminuire di più, e il sale diventa più solubile.

## Prodotto di solubilità e temperatura {#temperatura}

Come tutte le costanti di equilibrio, il prodotto di solubilità cambia con la temperatura. Per la maggior parte dei sali la dissoluzione assorbe calore, e la solubilità cresce scaldando, come si è visto per il nitrato di potassio nel capitolo precedente. Per alcuni sali la dissoluzione libera calore, e la solubilità diminuisce al crescere della temperatura: è il caso del solfato di calcio e del carbonato di calcio, ed è uno dei motivi per cui le incrostazioni si formano proprio sulle superfici più calde, come le resistenze degli scaldabagni e i tubi delle caldaie. Il legame quantitativo fra la costante di equilibrio, l'entalpia di reazione e la temperatura sarà ricavato nel capitolo [Perturbazioni dell'equilibrio](unit:chemistry-20).

## L'effetto dello ione comune {#ione-comune}

Che cosa succede se si cerca di sciogliere cloruro d'argento in una soluzione che contiene già ioni cloruro, per esempio in acqua salata? Il prodotto $[\mathrm{Ag^+}][\mathrm{Cl^-}]$ deve restare uguale a $K_\mathrm{sp}$; se $[\mathrm{Cl^-}]$ è già alto per la presenza del sale da cucina, la concentrazione degli ioni argento che possono stare in soluzione è più bassa. La solubilità diminuisce: è l'**effetto dello ione comune**.

::: esempio Cloruro d'argento in acqua salata
Calcolare la solubilità del cloruro d'argento in una soluzione $0{,}10\un{M}$ di cloruro di sodio.

Il cloruro d'argento sciolto, $s$, porta $[\mathrm{Ag^+}]=s$ e aggiunge $s$ ioni cloruro a quelli già presenti: $[\mathrm{Cl^-}]=0{,}10+s$. Poiché $s$ sarà molto più piccola di $0{,}10$, si può scrivere $[\mathrm{Cl^-}]\simeq0{,}10$, e
$$s=\frac{K_\mathrm{sp}}{0{,}10}=1{,}8\times10^{-9}\un{mol/L},$$
diecimila volte meno che in acqua pura. L'approssimazione è ampiamente giustificata: $s$ è un cinquantamilionesimo di $0{,}10$. Il risultato è la concentrazione degli ioni argento liberi; più avanti si vedrà che, a queste concentrazioni di cloruro, una piccola parte dell'argento disciolto si trova in altre forme.
:::

::: esempio Fluoruro di calcio e fluoruro di sodio
Calcolare la solubilità del fluoruro di calcio in una soluzione $0{,}010\un{M}$ di fluoruro di sodio, e confrontarla con quella in acqua pura, $2{,}05\times10^{-4}\un{mol/L}$.

Con $[\mathrm{F^-}]\simeq0{,}010\un{M}$ e $[\mathrm{Ca^{2+}}]=s$, il prodotto di solubilità dà $s=K_\mathrm{sp}/(0{,}010)^2=3{,}45\times10^{-7}\un{mol/L}$, circa seicento volte meno che in acqua pura. Lo ione comune compare al quadrato, e il suo effetto è più forte di quello di uno ione con esponente uno.
:::

::: figura ione-comune
{"w":640,"h":306,"items":[{"t":"axes","o":[90,250],"x":[520,""],"y":[200,""],"sx":80,"sy":30,"xt":[[1,"−6"],[2,"−5"],[3,"−4"],[4,"−3"],[5,"−2"],[6,"−1"],[7,"0"]],"yt":[[1,"−9"],[2,"−8"],[3,"−7"],[4,"−6"],[5,"−5"]]},{"t":"text","p":[40,30],"s":"log s (s in mol/L)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"log [Cl⁻] aggiunto","c":"ax","size":13,"a":"end"},{"t":"plot","o":[90,250],"sx":80,"sy":30,"pts":[[0.0,5.1223545],[0.05333,5.1221412],[0.10667,5.1219001],[0.16,5.1216274],[0.21333,5.1213192],[0.26667,5.1209706],[0.32,5.1205766],[0.37333,5.120131],[0.42667,5.1196272],[0.48,5.1190576],[0.53333,5.1184136],[0.58667,5.1176855],[0.64,5.1168622],[0.69333,5.1159314],[0.74667,5.1148791],[0.8,5.1136892],[0.85333,5.1123441],[0.90667,5.1108232],[0.96,5.1091039],[1.01333,5.1071602],[1.06667,5.1049629],[1.12,5.1024791],[1.17333,5.0996716],[1.22667,5.0964986],[1.28,5.0929126],[1.33333,5.0888607],[1.38667,5.0842831],[1.44,5.0791126],[1.49333,5.0732742],[1.54667,5.066684],[1.6,5.0592485],[1.65333,5.0508641],[1.70667,5.0414169],[1.76,5.0307817],[1.81333,5.0188231],[1.86667,5.005396],[1.92,4.990347],[1.97333,4.9735177],[2.02667,4.9547486],[2.08,4.9338847],[2.13333,4.9107829],[2.18667,4.8853207],[2.24,4.8574053],[2.29333,4.8269833],[2.34667,4.7940478],[2.4,4.7586433],[2.45333,4.7208653],[2.50667,4.6808563],[2.56,4.6387965],[2.61333,4.5948918],[2.66667,4.5493612],[2.72,4.5024244],[2.77333,4.4542916],[2.82667,4.4051565],[2.88,4.3551921],[2.93333,4.3045487],[2.98667,4.2533544],[3.04,4.2017162],[3.09333,4.1497228],[3.14667,4.0974462],[3.2,4.0449449],[3.25333,3.9922657],[3.30667,3.9394461],[3.36,3.8865159],[3.41333,3.8334987],[3.46667,3.7804131],[3.52,3.7272739],[3.57333,3.6740926],[3.62667,3.6208783],[3.68,3.5676381],[3.73333,3.5143777],[3.78667,3.4611014],[3.84,3.4078128],[3.89333,3.3545144],[3.94667,3.3012084],[4.0,3.2478964],[4.05333,3.1945798],[4.10667,3.1412596],[4.16,3.0879365],[4.21333,3.0346112],[4.26667,2.9812841],[4.32,2.9279557],[4.37333,2.8746262],[4.42667,2.8212958],[4.48,2.7679648],[4.53333,2.7146333],[4.58667,2.6613014],[4.64,2.6079692],[4.69333,2.5546368],[4.74667,2.5013041],[4.8,2.4479713],[4.85333,2.3946384],[4.90667,2.3413054],[4.96,2.2879723],[5.01333,2.2346392],[5.06667,2.181306],[5.12,2.1279728],[5.17333,2.0746396],[5.22667,2.0213063],[5.28,1.9679731],[5.33333,1.9146398],[5.38667,1.8613065],[5.44,1.8079732],[5.49333,1.7546399],[5.54667,1.7013065],[5.6,1.6479732],[5.65333,1.5946399],[5.70667,1.5413066],[5.76,1.4879732],[5.81333,1.4346399],[5.86667,1.3813066],[5.92,1.3279733],[5.97333,1.2746399],[6.02667,1.2213066],[6.08,1.1679733],[6.13333,1.1146399],[6.18667,1.0613066],[6.24,1.0079733],[6.29333,0.9546399],[6.34667,0.9013066],[6.4,0.8479733]],"c":"force2","w":2.4},{"t":"plot","o":[90,250],"sx":80,"sy":30,"pts":[[0,5.1239866],[6.4,5.1239866]],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[98.0,88.3],"s":"acqua pura: 1,33×10⁻⁵ M","c":"muted","size":11,"a":"start"},{"t":"circle","p":[570,212.6,5],"c":"force4"},{"t":"text","p":[560,216.6],"s":"NaCl 0,10 M: 1,8×10⁻⁹ M","c":"force4","size":11,"a":"end"}]}
---
Solubilità del cloruro d'argento in funzione della concentrazione di ione cloruro aggiunto, in scala logaritmica, calcolata con il solo prodotto di solubilità. Finché il cloruro aggiunto è molto minore di $1{,}3\times10^{-5}\un{M}$ la solubilità resta quella in acqua pura; oltre, la concentrazione degli ioni argento liberi diminuisce di dieci volte per ogni aumento di dieci volte del cloruro.
:::

L'effetto dello ione comune si sfrutta per rendere completa una precipitazione: aggiungendo un eccesso del reagente precipitante, la quantità di sale che resta in soluzione diventa trascurabile. Nella pratica analitica si considera completa una precipitazione che lascia in soluzione meno di un millesimo dello ione da eliminare.

::: approfondimento Quando il prodotto di solubilità non basta
Il calcolo della solubilità dal prodotto di solubilità è un'approssimazione, che funziona bene per i sali molto poco solubili e peggio per gli altri. Le cause principali degli scarti sono quattro.

- **Le attrazioni fra ioni.** In una soluzione che contiene molti ioni, anche estranei, ogni ione è circondato da ioni di carica opposta che ne schermano la carica: il cloruro d'argento è un poco più solubile in una soluzione di nitrato di potassio che in acqua pura. Il calcolo rigoroso usa le **attività** al posto delle concentrazioni.
- **Le coppie ioniche.** Una parte degli ioni disciolti resta associata in coppie neutre, che non contano nel prodotto di solubilità. Per il solfato di calcio, la solubilità calcolata dal prodotto di solubilità, circa $7\times10^{-3}\un{mol/L}$, è circa la metà di quella misurata.
- **Le reazioni degli ioni con l'acqua.** Gli ioni carbonato, solfuro e fosfato reagiscono in parte con l'acqua, e la loro concentrazione è minore di quella prevista: i loro sali sono più solubili di quanto dica il calcolo semplice.
- **I complessi con lo ione comune.** Già a concentrazioni di cloruro di qualche millesimo di mole per litro, una parte dell'argento disciolto è legata al cloruro come $\mathrm{AgCl(aq)}$ e come $\mathrm{AgCl_2^-}$. In cloruro di sodio $0{,}10\un{M}$ l'argento disciolto in tutte le sue forme è di qualche micromole per litro, mille volte più del valore calcolato con il solo prodotto di solubilità, che dà correttamente soltanto la concentrazione degli ioni $\mathrm{Ag^+}$ liberi. A concentrazioni di cloruro ancora maggiori la solubilità totale cresce, e il cloruro d'argento si scioglie nell'acido cloridrico concentrato.
:::

## Precipita o no? {#precipitazione}

Mescolando due soluzioni che contengono gli ioni di un sale poco solubile, il sale precipita soltanto se le concentrazioni sono abbastanza alte. Per deciderlo si calcola il **quoziente di reazione** $Q$, che ha la stessa forma del prodotto di solubilità, ma con le concentrazioni del momento, subito dopo il mescolamento, anziché con quelle di equilibrio:

- se $Q>K_\mathrm{sp}$ la soluzione è soprassatura, e il sale precipita finché $Q$ scende al valore di $K_\mathrm{sp}$;
- se $Q=K_\mathrm{sp}$ la soluzione è esattamente satura;
- se $Q<K_\mathrm{sp}$ la soluzione è insatura, e il precipitato non si forma.

::: esempio Una goccia di argento
Si mescolano $10\un{mL}$ di nitrato d'argento $1{,}0\times10^{-3}\un{M}$ e $10\un{mL}$ di cloruro di sodio $1{,}0\times10^{-3}\un{M}$. Si forma un precipitato?

Il mescolamento raddoppia il volume e dimezza le concentrazioni: $[\mathrm{Ag^+}]=[\mathrm{Cl^-}]=5{,}0\times10^{-4}\un{M}$. Il quoziente vale $Q=(5{,}0\times10^{-4})^2=2{,}5\times10^{-7}$, più di mille volte il prodotto di solubilità, $1{,}77\times10^{-10}$. Il cloruro d'argento precipita, e la soluzione si intorbida. È la reazione con cui si riconosce il cloruro nell'acqua: bastano tracce di ione cloruro per vedere l'opalescenza bianca.
:::

::: figura precipitazione
{"w":640,"h":316,"items":[{"t":"axes","o":[90,260],"x":[510,""],"y":[215,""],"sx":60,"sy":26,"xt":[[1,"−7"],[2,"−6"],[3,"−5"],[4,"−4"],[5,"−3"],[6,"−2"],[7,"−1"]],"yt":[[1,"−7"],[2,"−6"],[3,"−5"],[4,"−4"],[5,"−3"],[6,"−2"],[7,"−1"]]},{"t":"text","p":[40,30],"s":"log [Ag⁺]","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,302],"s":"log [Cl⁻]","c":"ax","size":13,"a":"end"},{"t":"plot","o":[90,260],"sx":60,"sy":26,"pts":[[0.1,6.1479733],[6.1,0.1479733]],"c":"force2","w":2.6},{"t":"text","p":[438.0,241.2],"s":"[Ag⁺][Cl⁻] = Kₛₚ","c":"force2","size":12,"a":"start"},{"t":"text","p":[390.0,104.0],"s":"Q > Kₛₚ: precipita","c":"force4","size":13},{"t":"text","p":[186.0,223.6],"s":"Q < Kₛₚ: soluzione insatura","c":"force3","size":13},{"t":"circle","p":[371.9,137.8,5],"c":"force4"},{"t":"text","p":[379.9,129.8],"s":"esempio del testo","c":"ax","size":11,"a":"start"}]}
---
Il criterio di precipitazione del cloruro d'argento, nel piano dei logaritmi delle concentrazioni. Sopra la retta $[\mathrm{Ag^+}][\mathrm{Cl^-}]=K_\mathrm{sp}$ il sale precipita; sotto, la soluzione è insatura. Il punto indica le concentrazioni dell'esempio.
:::

## La precipitazione frazionata {#frazionata}

Quando una soluzione contiene più ioni che formano sali poco solubili con lo stesso reagente, aggiungendo il reagente a poco a poco precipita per primo il sale che richiede la concentrazione minore di reagente. Se i prodotti di solubilità sono abbastanza diversi, gli ioni si possono separare quasi completamente: è la **precipitazione frazionata**.

::: figura frazionata
{"w":700,"h":254,"items":[{"t":"text","p":[380,22],"s":"[Ag⁺] a cui comincia la precipitazione, anioni 0,010 M (mol/L)","c":"ax","size":12},{"t":"line","p":[206,34,206,196],"c":"muted","w":0.8,"dash":true},{"t":"text","p":[206,214],"s":"10⁻¹⁵","c":"muted","size":11},{"t":"line","p":[278,34,278,196],"c":"muted","w":0.8,"dash":true},{"t":"text","p":[278,214],"s":"10⁻¹³","c":"muted","size":11},{"t":"line","p":[350,34,350,196],"c":"muted","w":0.8,"dash":true},{"t":"text","p":[350,214],"s":"10⁻¹¹","c":"muted","size":11},{"t":"line","p":[422,34,422,196],"c":"muted","w":0.8,"dash":true},{"t":"text","p":[422,214],"s":"10⁻⁹","c":"muted","size":11},{"t":"line","p":[494,34,494,196],"c":"muted","w":0.8,"dash":true},{"t":"text","p":[494,214],"s":"10⁻⁷","c":"muted","size":11},{"t":"line","p":[566,34,566,196],"c":"muted","w":0.8,"dash":true},{"t":"text","p":[566,214],"s":"10⁻⁵","c":"muted","size":11},{"t":"text","p":[160,58],"s":"AgI","c":"ax","size":13,"a":"end"},{"t":"rect","p":[170,45,69.5,22],"c":"force2","r":1},{"t":"text","p":[160,96],"s":"AgBr","c":"ax","size":13,"a":"end"},{"t":"rect","p":[170,83,206.2,22],"c":"force2","r":1},{"t":"text","p":[160,134],"s":"AgCl","c":"ax","size":13,"a":"end"},{"t":"rect","p":[170,121,296.9,22],"c":"force2","r":1},{"t":"text","p":[160,172],"s":"Ag₂CrO₄","c":"ax","size":13,"a":"end"},{"t":"rect","p":[170,159,396.9,22],"c":"force","r":1},{"t":"text","p":[380,240],"s":"l'aggiunta lenta di Ag⁺ precipita gli anioni uno dopo l'altro, dal più insolubile","c":"muted","size":11}]}
---
Concentrazione di ione argento alla quale comincia la precipitazione di ioduro, bromuro, cloruro e cromato d'argento, in soluzioni che contengono $0{,}010\un{M}$ dell'anione. Le soglie differiscono di molti ordini di grandezza.
:::

::: esempio Il metodo di Mohr
Nel metodo di Mohr, introdotto nel 1856 per determinare il cloruro, si titola la soluzione con nitrato d'argento in presenza di una piccola quantità di cromato di potassio. Una soluzione contiene $0{,}010\un{M}$ di ione cloruro e $0{,}010\un{M}$ di ione cromato. Calcolare la concentrazione di ione argento alla quale comincia a precipitare ciascun sale, e la concentrazione di cloruro rimasta quando comincia a precipitare il cromato d'argento.

Il cloruro d'argento comincia a precipitare quando $[\mathrm{Ag^+}]=K_\mathrm{sp}/[\mathrm{Cl^-}]$, cioè $1{,}8\times10^{-8}\un{M}$. Il cromato d'argento, rosso mattone, quando $[\mathrm{Ag^+}]^2[\mathrm{CrO_4^{2-}}]=K_\mathrm{sp}$, cioè a $[\mathrm{Ag^+}]\simeq1{,}1\times10^{-5}\un{M}$, la radice di $1{,}12\times10^{-10}$: seicento volte di più. A quel punto il cloruro rimasto è $K_\mathrm{sp}/[\mathrm{Ag^+}]\simeq1{,}7\times10^{-5}\un{M}$: il $99{,}8\%$ del cloruro è già precipitato. La comparsa del colore rosso segnala la fine della titolazione.
:::

## Solubilità e acidi {#ph}

Molti sali poco solubili contengono anioni che reagiscono con gli ioni idrogeno degli acidi: idrossidi, carbonati, solfuri, fosfati, fluoruri. Un acido sottrae all'equilibrio di solubilità l'anione, e il sale si scioglie per compensare. L'idrossido di magnesio, il latte di magnesia usato contro l'acidità di stomaco, è quasi insolubile in acqua, $K_\mathrm{sp}=5{,}61\times10^{-12}$; nell'acido dello stomaco si scioglie, perché gli ioni idrossido reagiscono con gli ioni idrogeno formando acqua:

$$\mathrm{Mg(OH)_2(s)}+2\,\mathrm{H^+(aq)}\longrightarrow\mathrm{Mg^{2+}(aq)}+2\,\mathrm{H_2O(l)}.$$

Il carbonato di calcio si scioglie negli acidi liberando anidride carbonica; lo si vede facendo cadere una goccia di aceto su un pezzo di marmo, che frigge. Anche l'anidride carbonica disciolta in acqua, che la rende debolmente acida, scioglie il carbonato di calcio, trasformandolo in idrogenocarbonato solubile:

$$\mathrm{CaCO_3(s)}+\mathrm{CO_2(aq)}+\mathrm{H_2O(l)}\rightleftharpoons\mathrm{Ca^{2+}(aq)}+2\,\mathrm{HCO_3^-(aq)}.$$

L'acqua piovana, attraversando il suolo, si arricchisce di anidride carbonica prodotta dalle radici e dai microrganismi, e scava le rocce calcaree. Quando quell'acqua gocciola nell'aria di una grotta, più povera di anidride carbonica, il gas si libera, l'equilibrio si sposta verso sinistra e il carbonato di calcio si deposita, strato dopo strato, in stalattiti e stalagmiti. Gli acidi e le basi saranno studiati nel capitolo [Acidi, basi e pH](unit:chemistry-21).

::: quotidiano Il calcare del bollitore
L'acqua di molti acquedotti è «dura»: contiene ioni calcio e idrogenocarbonato, presi dalle rocce calcaree attraversate. Quando la si scalda, l'anidride carbonica disciolta diventa meno solubile e sfugge, e l'equilibrio fra carbonato di calcio e idrogenocarbonato si sposta verso il solido: sul fondo del bollitore, sulle resistenze delle lavatrici e nelle tubature dell'acqua calda si deposita il calcare. Per toglierlo si usa un acido debole, come l'aceto o l'acido citrico, che scioglie il carbonato liberando anidride carbonica.
:::

## La precipitazione al lavoro {#applicazioni}

La precipitazione è uno degli strumenti più usati per togliere ioni indesiderati dall'acqua. Negli impianti di depurazione il fosfato degli scarichi, che nei laghi alimenta la crescita eccessiva delle alghe, si fa precipitare aggiungendo sali di ferro(III) o di alluminio, che formano fosfati poco solubili. I metalli pesanti delle acque industriali, come piombo, cadmio e cromo, si eliminano facendoli precipitare come idrossidi o come solfuri, alcuni dei quali hanno prodotti di solubilità piccolissimi. L'acqua dura si addolcisce in alcuni impianti aggiungendo idrossido di calcio e carbonato di sodio, che fanno precipitare il calcio come carbonato e il magnesio come idrossido.

Altre precipitazioni sono indesiderate. I calcoli renali più comuni sono formati da ossalato di calcio, $K_\mathrm{sp}\simeq2\times10^{-9}$, che precipita quando le concentrazioni di calcio e di ossalato nell'urina superano il limite di saturazione; bere molta acqua, diluendo l'urina, riduce il quoziente di reazione e il rischio. Le incrostazioni di solfato di bario e di carbonato di calcio nei pozzi petroliferi e negli scambiatori di calore sono un problema tecnico costoso, che si combatte con additivi capaci di legare gli ioni o di rallentare la crescita dei cristalli.

## L'analisi qualitativa dei cationi {#analisi}

Prima della diffusione degli strumenti moderni, la presenza dei metalli in un campione si riconosceva con una sequenza di precipitazioni selettive, l'**analisi qualitativa**. I cationi si dividevano in gruppi aggiungendo in ordine reagenti diversi. L'acido cloridrico faceva precipitare i cloruri poco solubili di argento, piombo e mercurio(I); l'acido solfidrico in ambiente acido precipitava i solfuri meno solubili, come quelli di rame, cadmio e bismuto; in ambiente basico precipitavano altri solfuri e gli idrossidi, come quelli di ferro, alluminio, zinco e nichel; il carbonato d'ammonio precipitava infine calcio, stronzio e bario, lasciando in soluzione i metalli alcalini. Ogni gruppo veniva poi separato e analizzato con reazioni specifiche, spesso basate sulla formazione di complessi colorati.

Lo schema sfrutta proprio i principi di questo capitolo: la scelta dell'anione e del pH decide quali prodotti di solubilità vengono superati. Oggi gli stessi metalli si determinano con la spettroscopia atomica o con la spettrometria di massa, più rapide e sensibili; l'analisi qualitativa resta però un esercizio formativo, perché costringe a ragionare sugli equilibri.

## Ioni complessi {#complessi}

Il cloruro d'argento, quasi insolubile in acqua, si scioglie facilmente in una soluzione di ammoniaca. Gli ioni argento si legano a due molecole di ammoniaca formando uno **ione complesso**, il diamminoargento:

$$\mathrm{Ag^+(aq)}+2\,\mathrm{NH_3(aq)}\rightleftharpoons\mathrm{[Ag(NH_3)_2]^+(aq)}.$$

La formazione del complesso sottrae ioni argento all'equilibrio di solubilità, come gli acidi sottraggono gli anioni basici, e altro cloruro d'argento si scioglie. L'equilibrio di formazione è caratterizzato da una **costante di formazione**, $K_\mathrm f=[\mathrm{Ag(NH_3)_2^+}]/([\mathrm{Ag^+}][\mathrm{NH_3}]^2)$, che per questo complesso vale circa $1{,}6\times10^7$. Combinando le due costanti si trova che in ammoniaca $1{,}0\un{M}$ si sciolgono quasi cinque centesimi di mole di cloruro d'argento per litro, più di tremila volte che in acqua pura.

::: figura complessi
{"w":640,"h":306,"items":[{"t":"axes","o":[90,250],"x":[520,""],"y":[210,""],"sx":250,"sy":2000,"xt":[[0.5,"0,5"],[1.0,"1,0"],[1.5,"1,5"],[2.0,"2,0"]],"yt":[[0.02,"0,02"],[0.04,"0,04"],[0.06,"0,06"],[0.08,"0,08"]]},{"t":"text","p":[40,30],"s":"solubilità di AgCl (mol/L)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"concentrazione di ammoniaca (mol/L)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[90,250],"sx":250,"sy":2000,"pts":[[0.0,0.0],[0.025,0.0012024],[0.05,0.0024049],[0.075,0.0036073],[0.1,0.0048097],[0.125,0.0060122],[0.15,0.0072146],[0.175,0.008417],[0.2,0.0096195],[0.225,0.0108219],[0.25,0.0120243],[0.275,0.0132268],[0.3,0.0144292],[0.325,0.0156317],[0.35,0.0168341],[0.375,0.0180365],[0.4,0.019239],[0.425,0.0204414],[0.45,0.0216438],[0.475,0.0228463],[0.5,0.0240487],[0.525,0.0252511],[0.55,0.0264536],[0.575,0.027656],[0.6,0.0288584],[0.625,0.0300609],[0.65,0.0312633],[0.675,0.0324657],[0.7,0.0336682],[0.725,0.0348706],[0.75,0.036073],[0.775,0.0372755],[0.8,0.0384779],[0.825,0.0396803],[0.85,0.0408828],[0.875,0.0420852],[0.9,0.0432876],[0.925,0.0444901],[0.95,0.0456925],[0.975,0.046895],[1.0,0.0480974],[1.025,0.0492998],[1.05,0.0505023],[1.075,0.0517047],[1.1,0.0529071],[1.125,0.0541096],[1.15,0.055312],[1.175,0.0565144],[1.2,0.0577169],[1.225,0.0589193],[1.25,0.0601217],[1.275,0.0613242],[1.3,0.0625266],[1.325,0.063729],[1.35,0.0649315],[1.375,0.0661339],[1.4,0.0673363],[1.425,0.0685388],[1.45,0.0697412],[1.475,0.0709436],[1.5,0.0721461],[1.525,0.0733485],[1.55,0.0745509],[1.575,0.0757534],[1.6,0.0769558],[1.625,0.0781583],[1.65,0.0793607],[1.675,0.0805631],[1.7,0.0817656],[1.725,0.082968],[1.75,0.0841704],[1.775,0.0853729],[1.8,0.0865753],[1.825,0.0877777],[1.85,0.0889802],[1.875,0.0901826],[1.9,0.091385],[1.925,0.0925875],[1.95,0.0937899],[1.975,0.0949923],[2.0,0.0961948]],"c":"force3","w":2.6},{"t":"circle","p":[340.0,153.8,5],"c":"force3"},{"t":"text","p":[330.0,145.8],"s":"1,0 M: 0,048 mol/L","c":"ax","size":11,"a":"end"},{"t":"text","p":[586.0,240],"s":"in acqua pura: 1,3×10⁻⁵ mol/L","c":"muted","size":11,"a":"end"}]}
---
Solubilità del cloruro d'argento in soluzioni di ammoniaca, calcolata con il prodotto di solubilità e la costante di formazione del complesso diamminoargento. In ammoniaca $1\un{M}$ la solubilità è più di tremila volte quella in acqua pura.
:::

Gli ioni complessi sono ovunque in chimica: l'emoglobina trasporta l'ossigeno legandolo a un complesso del ferro, il colore blu intenso che compare aggiungendo ammoniaca a una soluzione di solfato di rame è quello del complesso $\mathrm{[Cu(NH_3)_4]^{2+}}$, e molti farmaci antitumorali sono complessi del platino.

::: storia Il fissaggio delle fotografie
Nelle prime fotografie le immagini, impresse dalla luce su strati di sali d'argento, continuavano ad annerirsi alla luce del giorno, perché i grani di sale non esposti restavano sensibili. Nel 1819 John Herschel aveva scoperto che il tiosolfato di sodio, allora chiamato iposolfito, scioglie i sali d'argento poco solubili; vent'anni dopo, appena furono annunciati i primi procedimenti fotografici, propose di usarlo per eliminare il sale non esposto e rendere stabili le immagini. Il tiosolfato forma con l'argento un complesso molto stabile, $\mathrm{[Ag(S_2O_3)_2]^{3-}}$, con una costante di formazione di circa $3\times10^{13}$, sufficiente a sciogliere il bromuro d'argento, il meno solubile dei sali usati nelle pellicole. Il «fissaggio» con il tiosolfato è rimasto un passaggio di ogni fotografia chimica in bianco e nero per un secolo e mezzo.
:::

## Errori frequenti {#errori}

::: errore Il solido nell'espressione della costante
Il solido non compare nel prodotto di solubilità. La sua quantità è irrilevante, purché ce ne sia; una soluzione satura in contatto con un grammo o con un chilo di cloruro d'argento ha la stessa concentrazione di ioni.
:::

::: errore Dimenticare i coefficienti
Per il fluoruro di calcio $[\mathrm{F^-}]=2s$, e nel prodotto di solubilità compare al quadrato: $K_\mathrm{sp}=s\,(2s)^2=4s^3$. Scrivere $K_\mathrm{sp}=s^2$ porta a una solubilità sbagliata di molti ordini di grandezza.
:::

::: errore Prodotto di solubilità minore, sale meno solubile
Il confronto vale soltanto fra sali dello stesso tipo. Il cromato d'argento ha un prodotto di solubilità cento volte minore del cloruro d'argento ed è cinque volte più solubile.
:::

::: errore Lo ione comune cambia la costante
Lo ione comune riduce la solubilità e lascia invariato il prodotto di solubilità, che dipende soltanto dalla temperatura. Cambiano le concentrazioni dei singoli ioni, e il loro prodotto resta lo stesso.
:::

::: errore Mescolare senza diluire
Quando si mescolano due soluzioni il volume totale cresce, e le concentrazioni di entrambi gli ioni diminuiscono. Il quoziente $Q$ va calcolato con le concentrazioni dopo il mescolamento.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Le regole di solubilità indicano in modo qualitativo quali sali sono solubili; il prodotto di solubilità dà la risposta quantitativa.
- Un sale poco solubile in equilibrio con la sua soluzione satura obbedisce a $K_\mathrm{sp}=[\mathrm M^{m+}]^a[\mathrm X^{x-}]^b$; il solido non compare nell'espressione.
- Per sali $\mathrm{AB}$ $K_\mathrm{sp}=s^2$, per sali $\mathrm{AB_2}$ o $\mathrm{A_2B}$ $K_\mathrm{sp}=4s^3$, per sali $\mathrm{AB_3}$ o $\mathrm{A_3B}$ $K_\mathrm{sp}=27s^4$.
- I prodotti di solubilità ordinano le solubilità soltanto per sali dello stesso tipo stechiometrico.
- Uno ione comune riduce la solubilità; il prodotto di solubilità resta invariato.
- Un sale precipita se il quoziente $Q$, calcolato con le concentrazioni dopo il mescolamento, supera $K_\mathrm{sp}$.
- Con la precipitazione frazionata si separano ioni i cui sali hanno prodotti di solubilità molto diversi.
- Gli acidi aumentano la solubilità dei sali con anioni basici; la formazione di ioni complessi aumenta la solubilità dei sali dei metalli che li formano.
:::

## Glossario {#glossario}

- **Equilibrio eterogeneo**: equilibrio fra sostanze in fasi diverse, come un solido e la sua soluzione.
- **Prodotto di solubilità**, $K_\mathrm{sp}$: costante di equilibrio della dissoluzione di un sale poco solubile, prodotto delle concentrazioni degli ioni elevate ai rispettivi coefficienti.
- **Solubilità molare**: moli di sale che si sciolgono in un litro di soluzione satura.
- **Effetto dello ione comune**: diminuzione della solubilità di un sale in una soluzione che contiene già uno dei suoi ioni.
- **Quoziente di reazione**, $Q$: espressione con la stessa forma della costante di equilibrio, calcolata con le concentrazioni del momento.
- **Precipitazione frazionata**: separazione di ioni per precipitazione successiva con lo stesso reagente.
- **Titolazione**: determinazione della quantità di una sostanza misurando il volume di una soluzione di concentrazione nota che reagisce con essa.
- **Ione complesso**: specie formata da uno ione metallico legato a molecole o ioni che gli cedono coppie di elettroni.
- **Costante di formazione**, $K_\mathrm f$: costante di equilibrio della formazione di uno ione complesso.
- **Acqua dura**: acqua con concentrazioni elevate di ioni calcio e magnesio.

## Esercizi {#esercizi}

Dati utili, prodotti di solubilità a $25\,^\circ\mathrm{C}$: $\mathrm{AgCl}$ $1{,}77\times10^{-10}$; $\mathrm{AgBr}$ $5{,}35\times10^{-13}$; $\mathrm{AgI}$ $8{,}52\times10^{-17}$; $\mathrm{BaSO_4}$ $1{,}08\times10^{-10}$; $\mathrm{CaF_2}$ $3{,}45\times10^{-11}$; $\mathrm{Mg(OH)_2}$ $5{,}61\times10^{-12}$; $\mathrm{Fe(OH)_3}$ $2{,}79\times10^{-39}$. Costante di formazione di $\mathrm{[Ag(NH_3)_2]^+}$: $1{,}6\times10^7$.

::: esercizio Scrivere le espressioni [base]
Scrivere l'equilibrio di solubilità e l'espressione del prodotto di solubilità per $\mathrm{AgBr}$, $\mathrm{PbI_2}$, $\mathrm{Ca_3(PO_4)_2}$ e $\mathrm{Fe(OH)_3}$.
>>> soluzione
$K_\mathrm{sp}=[\mathrm{Ag^+}][\mathrm{Br^-}]$; $K_\mathrm{sp}=[\mathrm{Pb^{2+}}][\mathrm{I^-}]^2$; $K_\mathrm{sp}=[\mathrm{Ca^{2+}}]^3[\mathrm{PO_4^{3-}}]^2$; $K_\mathrm{sp}=[\mathrm{Fe^{3+}}][\mathrm{OH^-}]^3$. In ogni equilibrio il solido sta a sinistra e gli ioni idratati a destra, con i coefficienti della formula.
:::

::: esercizio Solubile o no [base]
Usando le regole di solubilità, stabilire quali dei sali $\mathrm{KNO_3}$, $\mathrm{BaSO_4}$, $\mathrm{AgCl}$, $\mathrm{Na_2CO_3}$, $\mathrm{CaCO_3}$ e $\mathrm{NH_4Cl}$ sono solubili in acqua.
>>> soluzione
Sono solubili $\mathrm{KNO_3}$, $\mathrm{Na_2CO_3}$ e $\mathrm{NH_4Cl}$, che contengono ioni dei metalli alcalini, ammonio o nitrato. Sono poco solubili $\mathrm{BaSO_4}$, un'eccezione alla regola dei solfati, $\mathrm{AgCl}$, un'eccezione alla regola dei cloruri, e $\mathrm{CaCO_3}$, come quasi tutti i carbonati.
:::

::: esercizio Bromuro d'argento [base]
Calcolare la solubilità molare del bromuro d'argento e confrontarla con quella del cloruro d'argento.
>>> soluzione
$s=\sqrt{5{,}35\times10^{-13}}\simeq7{,}3\times10^{-7}\un{mol/L}$, circa diciotto volte meno del cloruro d'argento, $1{,}33\times10^{-5}\un{mol/L}$. I due sali sono dello stesso tipo, e il confronto dei prodotti di solubilità basta a ordinarli.
:::

::: esercizio Solfato di bario in acqua [base]
Calcolare la solubilità del solfato di bario, $M=233{,}39\un{g/mol}$, in moli e in milligrammi per litro.
>>> soluzione
$s=\sqrt{1{,}08\times10^{-10}}\simeq1{,}04\times10^{-5}\un{mol/L}$, cioè circa $2{,}4\un{mg/L}$. È per questa bassissima solubilità che il solfato di bario si può somministrare come mezzo di contrasto per le radiografie dell'intestino, anche se gli ioni bario disciolti sono tossici.
:::

::: esercizio Acqua o solfato di sodio [base]
Il solfato di bario è più solubile in acqua pura o in una soluzione di solfato di sodio? Spiegare senza calcoli.
>>> soluzione
In acqua pura. Nella soluzione di solfato di sodio è già presente lo ione solfato, uno ione comune: il prodotto $[\mathrm{Ba^{2+}}][\mathrm{SO_4^{2-}}]$ raggiunge il valore di $K_\mathrm{sp}$ con molti meno ioni bario in soluzione.
:::

::: esercizio Il fluoruro di calcio [medio]
Calcolare la concentrazione di ione fluoruro in una soluzione satura di fluoruro di calcio, e confrontarla con la concentrazione di fluoruro raccomandata nell'acqua potabile per la prevenzione della carie, circa $1\un{mg/L}$, con $M(\mathrm F)=19{,}00\un{g/mol}$.
>>> soluzione
$s\simeq2{,}05\times10^{-4}\un{mol/L}$ e $[\mathrm{F^-}]=2s\simeq4{,}1\times10^{-4}\un{mol/L}$, cioè circa $7{,}8\un{mg/L}$. Un'acqua che scorre su rocce ricche di fluorite può contenere più fluoruro di quanto sia raccomandato.
:::

::: esercizio Dalla solubilità al prodotto [medio]
La solubilità del cromato d'argento, $\mathrm{Ag_2CrO_4}$, $M=331{,}73\un{g/mol}$, è $21{,}7\un{mg/L}$ a $25\,^\circ\mathrm{C}$. Calcolarne il prodotto di solubilità.
>>> soluzione
$s=0{,}0217/331{,}73\simeq6{,}54\times10^{-5}\un{mol/L}$; $[\mathrm{Ag^+}]=2s$, $[\mathrm{CrO_4^{2-}}]=s$, e $K_\mathrm{sp}=4s^3\simeq1{,}12\times10^{-12}$.
:::

::: esercizio Precipita? [medio]
Si mescolano volumi uguali di cloruro di bario e di solfato di sodio, entrambi $2{,}0\times10^{-4}\un{M}$. Si forma un precipitato? E se le due soluzioni fossero $2{,}0\times10^{-6}\un{M}$?
>>> soluzione
Dopo il mescolamento le concentrazioni si dimezzano. Nel primo caso $Q=(1{,}0\times10^{-4})^2=1{,}0\times10^{-8}$, maggiore di $1{,}08\times10^{-10}$: precipita solfato di bario. Nel secondo $Q=(1{,}0\times10^{-6})^2=1{,}0\times10^{-12}$, minore di $K_\mathrm{sp}$: la soluzione resta limpida.
:::

::: esercizio Cloruro d'argento e sale [medio]
Calcolare la solubilità del cloruro d'argento in una soluzione $0{,}010\un{M}$ di cloruro di calcio, che libera due ioni cloruro per unità formula.
>>> soluzione
La concentrazione di cloruro è $0{,}020\un{M}$, e $s=K_\mathrm{sp}/0{,}020\simeq8{,}9\times10^{-9}\un{mol/L}$, millecinquecento volte meno che in acqua pura.
:::

::: esercizio Il latte di magnesia [medio]
Calcolare la solubilità molare dell'idrossido di magnesio, $M=58{,}32\un{g/mol}$, la concentrazione di ione idrossido nella soluzione satura e la massa di idrossido disciolta in un litro.
>>> soluzione
Da $K_\mathrm{sp}=4s^3$ si ottiene $s=\sqrt[3]{K_\mathrm{sp}/4}\simeq1{,}12\times10^{-4}\un{mol/L}$; $[\mathrm{OH^-}]=2s\simeq2{,}2\times10^{-4}\un{mol/L}$; la massa disciolta è circa $6{,}5\un{mg}$ per litro. Il resto del farmaco è una sospensione di solido, che si scioglie nell'acido dello stomaco.
:::

::: esercizio Separare ioduro e cloruro [avanzato]
Una soluzione contiene $0{,}010\un{M}$ di ioduro e $0{,}010\un{M}$ di cloruro. Si aggiunge lentamente nitrato d'argento. Quale sale precipita per primo? Quale frazione dello ioduro resta in soluzione quando comincia a precipitare il cloruro d'argento?
>>> soluzione
Lo ioduro d'argento comincia a precipitare a $[\mathrm{Ag^+}]\simeq8{,}5\times10^{-15}\un{M}$, il cloruro a $1{,}8\times10^{-8}\un{M}$. Quando comincia il secondo, lo ioduro rimasto è $K_\mathrm{sp}(\mathrm{AgI})/[\mathrm{Ag^+}]$, cioè circa $4{,}8\times10^{-9}\un{M}$, meno di cinque parti su dieci milioni di quello iniziale: la separazione è praticamente completa.
:::

::: esercizio Completare una precipitazione [avanzato]
Per eliminare il cloruro da una soluzione $0{,}10\un{M}$ si aggiunge nitrato d'argento in modo da lasciare un eccesso di ione argento $1{,}0\times10^{-3}\un{M}$. Calcolare la concentrazione di cloruro che resta in soluzione e la frazione eliminata.
>>> soluzione
$[\mathrm{Cl^-}]=K_\mathrm{sp}/[\mathrm{Ag^+}]\simeq1{,}8\times10^{-7}\un{M}$. Resta meno di due parti per milione del cloruro iniziale: ne è stato eliminato più del $99{,}99\%$.
:::

::: esercizio Cloruro d'argento in ammoniaca [avanzato]
La dissoluzione del cloruro d'argento in ammoniaca si può scrivere come $\mathrm{AgCl(s)}+2\,\mathrm{NH_3}\rightleftharpoons\mathrm{[Ag(NH_3)_2]^+}+\mathrm{Cl^-}$, con costante $K=K_\mathrm{sp}K_\mathrm f$. Calcolare $K$ e la solubilità in ammoniaca $1{,}0\un{M}$, tenendo conto che ogni mole sciolta consuma due moli di ammoniaca.
>>> soluzione
Il prodotto delle due costanti vale $K\simeq2{,}8\times10^{-3}$. All'equilibrio $[\mathrm{Ag(NH_3)_2^+}]=[\mathrm{Cl^-}]=s$ e $[\mathrm{NH_3}]=1{,}0-2s$, e $s^2/(1{,}0-2s)^2=K$. Estraendo la radice, $s/(1{,}0-2s)\simeq0{,}053$, da cui $s\simeq0{,}048\un{mol/L}$, circa tremilaseicento volte la solubilità in acqua pura.
:::

::: esercizio I limiti del calcolo semplice [avanzato]
Calcolare la solubilità dell'idrossido di ferro(III) con la relazione $K_\mathrm{sp}=27s^4$, e la concentrazione di ione idrossido che ne deriverebbe. Confrontarla con la concentrazione di ione idrossido dell'acqua pura, $1{,}0\times10^{-7}\un{M}$. Quale calcolo è più corretto?
>>> soluzione
Si ottiene $s=\sqrt[4]{K_\mathrm{sp}/27}\simeq1{,}0\times10^{-10}\un{mol/L}$ e $[\mathrm{OH^-}]=3s\simeq3\times10^{-10}\un{M}$, molto meno di quella già presente nell'acqua. La concentrazione di ione idrossido è fissata dall'acqua, $1{,}0\times10^{-7}\un{M}$, e quindi $[\mathrm{Fe^{3+}}]=K_\mathrm{sp}/(10^{-7})^3\simeq2{,}8\times10^{-18}\un{M}$. La relazione semplice vale soltanto quando gli ioni del sale prevalgono su quelli provenienti da altre fonti.
:::

::: esercizio Un grammo di sale [avanzato]
Calcolare il volume minimo di acqua necessario per sciogliere $1{,}00\un{g}$ di cloruro d'argento e $1{,}00\un{g}$ di bromuro d'argento, $M=187{,}77\un{g/mol}$. Che cosa suggeriscono i risultati sul lavaggio dei precipitati con acqua?
>>> soluzione
Il cloruro d'argento si scioglie a $1{,}33\times10^{-5}\times143{,}32\simeq1{,}9\times10^{-3}\un{g/L}$, e servono circa $520\un{L}$; il bromuro a $7{,}3\times10^{-7}\times187{,}77\simeq1{,}4\times10^{-4}\un{g/L}$, e servono circa $7300\un{L}$. Lavando un precipitato con poche decine di millilitri d'acqua se ne perde una quantità trascurabile; nelle analisi più accurate si lava con una soluzione diluita che contiene uno ione comune, per ridurre ancora le perdite.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 18-1–18-7. I dati numerici provengono dalle fonti seguenti.

1. Prodotti di solubilità a $25\,^\circ\mathrm{C}$: tabella *Solubility Product Constants* del CRC Handbook of Chemistry and Physics.
2. Costanti di formazione dei complessi dell'argento con ammoniaca e tiosolfato: A. E. Martell e R. M. Smith, *Critical Stability Constants*, Plenum, nella versione NIST SRD 46.
3. Masse molari: pesi atomici standard IUPAC/CIAAW. Concentrazione raccomandata di fluoruro nell'acqua potabile: linee guida dell'Organizzazione mondiale della sanità.
4. Per la storia e i metodi: K. F. Mohr (1856); J. F. W. Herschel, Edinb. Phil. J. 1 (1819) 8, e comunicazioni del 1839.
