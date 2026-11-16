---
unit: chemistry-18
titolo: Temperatura e attivazione
sottotitolo: Energia di attivazione, distribuzione delle energie, equazione di Arrhenius, meccanismi e catalizzatori
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §20-8–20-11
---

## Prima di cominciare {#apertura}

Il latte lasciato sul tavolo in una giornata d'estate inacidisce in meno di un giorno; nel frigorifero si conserva per una settimana. Una lucciola lampeggia più in fretta nelle notti calde che in quelle fresche, e una lucertola al sole è molto più agile della stessa lucertola all'alba. Un fiammifero resta inerte per anni nella sua scatola e brucia in un istante quando lo si sfrega. In tutti questi casi una piccola differenza di temperatura, o un breve riscaldamento locale, cambia di molto la velocità di reazioni chimiche.

Il capitolo [Velocità di reazione](unit:chemistry-17) ha mostrato come la velocità dipenda dalle concentrazioni, attraverso la legge cinetica $v=k[\mathrm A]^m[\mathrm B]^n$. La temperatura agisce su un altro fattore, la costante di velocità $k$, che cresce in modo molto rapido quando si scalda. Questo capitolo spiega l'origine di questa crescita: per trasformarsi, i reagenti devono superare una barriera di energia, e soltanto una piccola frazione delle molecole ha l'energia sufficiente. La frazione dipende in modo esponenziale dalla temperatura, e la sua espressione quantitativa è l'equazione di Arrhenius. Le stesse idee spiegano come agiscono i catalizzatori, le sostanze che accelerano una reazione senza consumarsi: dalla marmitta di un'automobile agli enzimi delle cellule.

::: obiettivi
- descrivere il profilo energetico di una reazione e collegare energia di attivazione, complesso attivato ed entalpia di reazione;
- spiegare con la distribuzione delle energie molecolari perché la velocità cresce rapidamente con la temperatura;
- usare l'equazione di Arrhenius, nella forma esponenziale e in quella logaritmica, e ricavare l'energia di attivazione da misure a due o più temperature;
- valutare quando vale la regola pratica del raddoppio ogni dieci gradi;
- distinguere intermedi e stati di transizione in un meccanismo a più passaggi;
- spiegare come agiscono i catalizzatori omogenei, eterogenei ed enzimatici, e che cosa un catalizzatore lascia invariato.
:::

Il capitolo usa la teoria degli urti e la legge cinetica del capitolo [Velocità di reazione](unit:chemistry-17), l'entalpia di reazione del capitolo [Termochimica e calorimetria](unit:chemistry-16) e la distribuzione delle velocità molecolari introdotta nel capitolo di fisica [Gas ideali](unit:physics-18). Servono il logaritmo naturale e la funzione esponenziale; la costante dei gas vale $R=8{,}314\un{J/(mol\,K)}$, e nelle formule la temperatura è sempre quella assoluta, in kelvin.

## La barriera di energia {#barriera}

Una reazione chimica rompe alcuni legami e ne forma di nuovi. Anche quando il bilancio complessivo libera energia, il passaggio dai reagenti ai prodotti richiede una spesa iniziale: i legami vecchi devono indebolirsi prima che quelli nuovi siano formati, gli atomi devono avvicinarsi vincendo la repulsione delle nuvole elettroniche, le molecole devono deformarsi. Esiste quindi una configurazione intermedia di energia massima, che il sistema deve attraversare.

L'andamento si rappresenta con un **profilo energetico** (o diagramma di reazione): in ascissa si riporta una coordinata che descrive l'avanzamento della trasformazione, come la distanza fra due atomi che si separano, e in ordinata l'energia del sistema. Il profilo parte dal livello dei reagenti, sale fino a un massimo e scende al livello dei prodotti. La differenza fra il massimo e il livello dei reagenti è l'**energia di attivazione** $E_\mathrm a$, espressa in $\mathrm{kJ/mol}$; la differenza fra il livello dei prodotti e quello dei reagenti è l'entalpia di reazione $\Delta H$.

::: figura profilo
{"w":640,"h":306,"items":[{"t":"arrow","p":[70,280,70,20],"c":"muted","w":1.4,"head":8},{"t":"text","p":[78,28],"s":"energia","c":"muted","size":12,"a":"start"},{"t":"arrow","p":[70,280,620,280],"c":"muted","w":1.4,"head":8},{"t":"text","p":[616,300],"s":"avanzamento della reazione","c":"muted","size":12,"a":"end"},{"t":"poly","pts":[[110.0,170.0],[114.6,170.0],[119.2,170.0],[123.8,170.0],[128.4,170.1],[133.0,170.2],[137.6,170.4],[142.2,170.5],[146.8,170.6],[151.4,170.7],[156.0,170.8],[160.6,170.9],[165.2,170.9],[169.8,170.8],[174.4,170.6],[179.0,170.2],[183.6,169.8],[188.2,169.1],[192.8,168.2],[197.4,167.0],[202.0,165.6],[206.6,163.8],[211.2,161.6],[215.8,159.1],[220.4,156.1],[225.0,152.7],[229.6,148.8],[234.2,144.5],[238.8,139.8],[243.4,134.7],[248.0,129.2],[252.6,123.3],[257.2,117.3],[261.8,111.0],[266.4,104.8],[271.0,98.5],[275.6,92.5],[280.2,86.7],[284.8,81.4],[289.4,76.5],[294.0,72.4],[298.6,69.0],[303.2,66.6],[307.8,65.0],[312.4,64.5],[317.0,65.0],[321.6,66.6],[326.2,69.2],[330.8,72.8],[335.4,77.3],[340.0,82.8],[344.6,89.0],[349.2,95.8],[353.8,103.2],[358.4,111.0],[363.0,119.0],[367.6,127.3],[372.2,135.5],[376.8,143.7],[381.4,151.7],[386.0,159.4],[390.6,166.8],[395.2,173.8],[399.8,180.3],[404.4,186.4],[409.0,192.0],[413.6,197.2],[418.2,201.8],[422.8,206.0],[427.4,209.8],[432.0,213.2],[436.6,216.1],[441.2,218.8],[445.8,221.1],[450.4,223.2],[455.0,225.1],[459.6,226.7],[464.2,228.1],[468.8,229.4],[473.4,230.6],[478.0,231.6],[482.6,232.5],[487.2,233.4],[491.8,234.1],[496.4,234.8],[501.0,235.5],[505.6,236.1],[510.2,236.6],[514.8,237.1],[519.4,237.6],[524.0,238.0],[528.6,238.4],[533.2,238.7],[537.8,239.0],[542.4,239.3],[547.0,239.5],[551.6,239.7],[556.2,239.8],[560.8,239.9],[565.4,240.0],[570.0,240.0]],"c":"force2","w":2.6},{"t":"poly","pts":[[110.0,170.0],[114.6,170.0],[119.2,170.0],[123.8,170.1],[128.4,170.2],[133.0,170.4],[137.6,170.5],[142.2,170.7],[146.8,170.9],[151.4,171.1],[156.0,171.3],[160.6,171.5],[165.2,171.6],[169.8,171.8],[174.4,171.9],[179.0,171.9],[183.6,171.8],[188.2,171.7],[192.8,171.4],[197.4,170.9],[202.0,170.3],[206.6,169.6],[211.2,168.6],[215.8,167.4],[220.4,165.9],[225.0,164.2],[229.6,162.3],[234.2,160.1],[238.8,157.6],[243.4,154.9],[248.0,152.0],[252.6,148.9],[257.2,145.7],[261.8,142.4],[266.4,139.1],[271.0,135.7],[275.6,132.6],[280.2,129.5],[284.8,126.8],[289.4,124.3],[294.0,122.3],[298.6,120.7],[303.2,119.7],[307.8,119.2],[312.4,119.3],[317.0,120.0],[321.6,121.4],[326.2,123.3],[330.8,125.9],[335.4,129.0],[340.0,132.7],[344.6,136.7],[349.2,141.2],[353.8,146.0],[358.4,151.1],[363.0,156.3],[367.6,161.5],[372.2,166.9],[376.8,172.1],[381.4,177.3],[386.0,182.2],[390.6,187.0],[395.2,191.6],[399.8,195.8],[404.4,199.8],[409.0,203.6],[413.6,207.0],[418.2,210.1],[422.8,213.0],[427.4,215.6],[432.0,217.9],[436.6,220.1],[441.2,222.0],[445.8,223.7],[450.4,225.3],[455.0,226.7],[459.6,228.0],[464.2,229.1],[468.8,230.2],[473.4,231.2],[478.0,232.1],[482.6,232.9],[487.2,233.6],[491.8,234.3],[496.4,235.0],[501.0,235.6],[505.6,236.2],[510.2,236.7],[514.8,237.2],[519.4,237.6],[524.0,238.0],[528.6,238.4],[533.2,238.7],[537.8,239.0],[542.4,239.3],[547.0,239.5],[551.6,239.7],[556.2,239.8],[560.8,239.9],[565.4,240.0],[570.0,240.0]],"c":"force3","w":2.2,"dash":true},{"t":"line","p":[90,170,160,170],"c":"muted","w":1,"dash":true},{"t":"line","p":[500,240,600,240],"c":"muted","w":1,"dash":true},{"t":"text","p":[100,164],"s":"reagenti","c":"ax","size":12,"a":"start"},{"t":"text","p":[612,260],"s":"prodotti","c":"ax","size":12,"a":"end"},{"t":"arrow","p":[220,168,220,70],"c":"force4","w":1.8,"head":7},{"t":"text","p":[226,120],"s":"Eₐ","c":"force4","size":13,"a":"start"},{"t":"arrow","p":[300,168,300,124],"c":"force3","w":1.8,"head":7},{"t":"text","p":[300,192],"s":"Eₐ con catalizzatore","c":"force3","size":11},{"t":"arrow","p":[560,170,560,236],"c":"force","w":1.8,"head":7},{"t":"text","p":[552,206],"s":"ΔH","c":"force","size":13,"a":"end"},{"t":"text","p":[317,52],"s":"complesso attivato","c":"force2","size":12}]}
---
Profilo energetico di una reazione esotermica, senza catalizzatore (linea continua) e con catalizzatore (linea tratteggiata). L'energia di attivazione $E_\mathrm a$ è il dislivello fra i reagenti e il massimo; $\Delta H$ è il dislivello fra reagenti e prodotti, uguale nei due percorsi. Il catalizzatore abbassa la barriera e lascia invariati i livelli di partenza e di arrivo. Le proporzioni sono illustrative.
:::

L'immagine più efficace è quella di un masso in una valle, separata da una valle più bassa da una collina. Il masso arriverebbe volentieri nella valle più bassa, perché la sua energia potenziale diminuirebbe; per arrivarci, però, deve prima essere spinto fino in cima alla collina. L'altezza della valle d'arrivo rispetto a quella di partenza decide quanta energia si libera alla fine; l'altezza della collina decide quanto è difficile partire. Le due grandezze sono indipendenti: una reazione molto esotermica può avere una barriera altissima, come la combustione del legno a temperatura ambiente, e una reazione endotermica può avere una barriera bassa.

Il profilo si legge anche da destra verso sinistra. La reazione inversa parte dai prodotti e deve superare la stessa collina, alta, rispetto al suo punto di partenza, $E_\mathrm a$ più il dislivello fra le due valli.

::: legge Barriere della reazione diretta e inversa
Per una reazione con entalpia $\Delta H$ ed energia di attivazione diretta $E_\mathrm a$, l'energia di attivazione della reazione inversa è
$$E_\mathrm a'=E_\mathrm a-\Delta H.$$
In una reazione esotermica ($\Delta H<0$) la barriera inversa è più alta di quella diretta; in una reazione endotermica è più bassa.
:::

Per una reazione con $E_\mathrm a=120\un{kJ/mol}$ e $\Delta H=-40\un{kJ/mol}$, la reazione inversa deve superare $160\un{kJ/mol}$. In una reazione endotermica, al contrario, la barriera diretta è sempre almeno uguale a $\Delta H$, perché per salire in una valle più alta bisogna almeno arrivare alla sua quota.

## Il complesso attivato {#complesso}

La configurazione che corrisponde alla cima del profilo si chiama **complesso attivato** o **stato di transizione**. In essa i legami che si rompono sono allungati e indeboliti, quelli che si formano sono abbozzati; l'aggregato di atomi esiste per un tempo brevissimo, dell'ordine della durata di una vibrazione molecolare, intorno a $10^{-13}\un{s}$, e poi prosegue verso i prodotti o ricade verso i reagenti.

Un esempio chiaro è la reazione fra lo ione idrossido e il bromometano in soluzione,

$$\mathrm{OH^-}+\mathrm{CH_3Br}\longrightarrow\mathrm{CH_3OH}+\mathrm{Br^-}.$$

Lo ione idrossido si avvicina all'atomo di carbonio dal lato opposto a quello del bromo. Mentre il nuovo legame carbonio-ossigeno si forma, il legame carbonio-bromo si allunga; nello stato di transizione l'atomo di carbonio è legato a metà con entrambi, e i tre atomi di idrogeno stanno quasi in un piano, come le stecche di un ombrello che si rovescia nel vento. Superato questo punto, lo ione bromuro si allontana e la molecola di metanolo si assesta con i tre idrogeni ribaltati dalla parte opposta. Questa inversione della geometria, osservata con molecole asimmetriche fin dalla fine dell'Ottocento, è una delle prove più dirette che la reazione passa per uno stato di transizione unico, con entrambi i gruppi legati al carbonio nello stesso istante.

Lo stato di transizione spiega anche il **fattore orientazionale** della teoria degli urti. Un urto in cui lo ione idrossido colpisce il bromometano dalla parte del bromo non porta alla configurazione giusta, anche se l'energia è sufficiente. Fra tutte le orientazioni possibili soltanto una piccola parte conduce verso il complesso attivato, e questo riduce la frazione di urti efficaci in misura che dipende dalla complessità delle molecole.

::: approfondimento La teoria dello stato di transizione
Nel 1935 Henry Eyring, e indipendentemente Meredith Evans e Michael Polanyi, proposero di calcolare la velocità di reazione trattando il complesso attivato come una specie in equilibrio con i reagenti, che si trasforma nei prodotti con una frequenza universale, uguale a $k_\mathrm BT/h$, dove $k_\mathrm B$ è la costante di Boltzmann e $h$ la costante di Planck. A $298\un{K}$ questa frequenza vale circa $6\times10^{12}\un{s^{-1}}$. La teoria collega la costante di velocità a grandezze termodinamiche del complesso attivato, l'entalpia e l'entropia di attivazione, e permette di interpretare il fattore orientazionale come una perdita di entropia: per formare il complesso le molecole devono rinunciare a molte delle disposizioni possibili. Oggi le energie degli stati di transizione si calcolano con i metodi della chimica quantistica, e i risultati si confrontano con le misure cinetiche.
:::

## Quante molecole superano la barriera {#distribuzione}

In un gas, o in un liquido, le molecole non hanno tutte la stessa energia. Gli urti ridistribuiscono continuamente l'energia: in un dato istante alcune molecole sono quasi ferme, la maggior parte ha un'energia vicina al valore medio, poche hanno un'energia molto più alta. La distribuzione, calcolata da James Clerk Maxwell e da Ludwig Boltzmann nella seconda metà dell'Ottocento, ha una forma asimmetrica, con una lunga coda verso le energie alte. Il capitolo di fisica [Gas ideali](unit:physics-18) la presenta per le velocità; qui interessa la distribuzione delle energie.

::: figura maxwell
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[200,""],"sx":22,"sy":700,"xt":[[5,"5"],[10,"10"],[15,"15"],[20,"20"]],"yt":[]},{"t":"text","p":[40,30],"s":"frazione di molecole","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"energia cinetica (kJ/mol)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":22,"sy":700,"pts":[[0.1,0.0870183],[0.2,0.1182264],[0.3,0.139107],[0.4,0.1543146],[0.5,0.165749],[0.6,0.1744337],[0.7,0.1810058],[0.8,0.1858991],[0.9,0.1894272],[1.0,0.191827],[1.1,0.1932836],[1.2,0.1939448],[1.3,0.1939313],[1.4,0.1933433],[1.5,0.1922646],[1.6,0.1907667],[1.7,0.1889104],[1.8,0.1867482],[1.9,0.1843256],[2.0,0.1816824],[2.1,0.178853],[2.2,0.1758679],[2.3,0.172754],[2.4,0.1695347],[2.5,0.1662309],[2.6,0.162861],[2.7,0.1594414],[2.8,0.1559865],[2.9,0.1525092],[3.0,0.1490206],[3.1,0.1455309],[3.2,0.142049],[3.3,0.1385827],[3.4,0.1351389],[3.5,0.1317236],[3.6,0.1283423],[3.7,0.1249995],[3.8,0.1216992],[3.9,0.1184451],[4.0,0.1152401],[4.1,0.1120868],[4.2,0.1089873],[4.3,0.1059435],[4.4,0.1029568],[4.5,0.1000285],[4.6,0.0971595],[4.7,0.0943505],[4.8,0.0916019],[4.9,0.0889141],[5.0,0.0862872],[5.1,0.0837212],[5.2,0.0812159],[5.3,0.0787709],[5.4,0.076386],[5.5,0.0740605],[5.6,0.071794],[5.7,0.0695858],[5.8,0.0674351],[5.9,0.0653411],[6.0,0.0633031],[6.1,0.0613201],[6.2,0.0593913],[6.3,0.0575157],[6.4,0.0556922],[6.5,0.05392],[6.6,0.052198],[6.7,0.0505252],[6.8,0.0489006],[6.9,0.0473231],[7.0,0.0457917],[7.1,0.0443053],[7.2,0.0428629],[7.3,0.0414634],[7.4,0.0401059],[7.5,0.0387893],[7.6,0.0375126],[7.7,0.0362747],[7.8,0.0350748],[7.9,0.0339117],[8.0,0.0327846],[8.1,0.0316925],[8.2,0.0306344],[8.3,0.0296095],[8.4,0.0286167],[8.5,0.0276553],[8.6,0.0267244],[8.7,0.025823],[8.8,0.0249504],[8.9,0.0241057],[9.0,0.0232881],[9.1,0.0224969],[9.2,0.0217313],[9.3,0.0209904],[9.4,0.0202737],[9.5,0.0195803],[9.6,0.0189096],[9.7,0.0182608],[9.8,0.0176334],[9.9,0.0170267],[10.0,0.01644],[10.1,0.0158727],[10.2,0.0153242],[10.3,0.014794],[10.4,0.0142815],[10.5,0.013786],[10.6,0.0133072],[10.7,0.0128444],[10.8,0.0123972],[10.9,0.011965],[11.0,0.0115474],[11.1,0.011144],[11.2,0.0107541],[11.3,0.0103775],[11.4,0.0100138],[11.5,0.0096623],[11.6,0.0093229],[11.7,0.0089951],[11.8,0.0086784],[11.9,0.0083726],[12.0,0.0080773],[12.1,0.0077922],[12.2,0.0075168],[12.3,0.007251],[12.4,0.0069943],[12.5,0.0067465],[12.6,0.0065072],[12.7,0.0062763],[12.8,0.0060533],[12.9,0.0058381],[13.0,0.0056304],[13.1,0.0054299],[13.2,0.0052364],[13.3,0.0050496],[13.4,0.0048694],[13.5,0.0046954],[13.6,0.0045276],[13.7,0.0043656],[13.8,0.0042093],[13.9,0.0040586],[14.0,0.0039131],[14.1,0.0037727],[14.2,0.0036373],[14.3,0.0035066],[14.4,0.0033806],[14.5,0.003259],[14.6,0.0031417],[14.7,0.0030285],[14.8,0.0029194],[14.9,0.0028141],[15.0,0.0027126],[15.1,0.0026147],[15.2,0.0025202],[15.3,0.0024291],[15.4,0.0023413],[15.5,0.0022566],[15.6,0.0021749],[15.7,0.0020961],[15.8,0.0020201],[15.9,0.0019469],[16.0,0.0018762],[16.1,0.0018081],[16.2,0.0017425],[16.3,0.0016791],[16.4,0.0016181],[16.5,0.0015592],[16.6,0.0015025],[16.7,0.0014478],[16.8,0.0013951],[16.9,0.0013442],[17.0,0.0012952],[17.1,0.001248],[17.2,0.0012024],[17.3,0.0011585],[17.4,0.0011162],[17.5,0.0010754],[17.6,0.0010361],[17.7,0.0009982],[17.8,0.0009617],[17.9,0.0009265],[18.0,0.0008926],[18.1,0.0008599],[18.2,0.0008284],[18.3,0.000798],[18.4,0.0007687],[18.5,0.0007405],[18.6,0.0007133],[18.7,0.0006871],[18.8,0.0006619],[18.9,0.0006376],[19.0,0.0006141],[19.1,0.0005916],[19.2,0.0005698],[19.3,0.0005488],[19.4,0.0005286],[19.5,0.0005092],[19.6,0.0004904],[19.7,0.0004723],[19.8,0.0004549],[19.9,0.0004381],[20.0,0.000422],[20.1,0.0004064],[20.2,0.0003914],[20.3,0.000377],[20.4,0.000363],[20.5,0.0003496],[20.6,0.0003367],[20.7,0.0003243],[20.8,0.0003123],[20.9,0.0003007],[21.0,0.0002896],[21.1,0.0002789],[21.2,0.0002685],[21.3,0.0002586],[21.4,0.000249],[21.5,0.0002398],[21.6,0.0002309],[21.7,0.0002223],[21.8,0.0002141],[21.9,0.0002062],[22.0,0.0001985],[22.1,0.0001911],[22.2,0.000184],[22.3,0.0001772],[22.4,0.0001706],[22.5,0.0001643],[22.6,0.0001582],[22.7,0.0001523],[22.8,0.0001466],[22.9,0.0001412],[23.0,0.0001359]],"c":"force2","w":2.4},{"t":"plot","o":[80,250],"sx":22,"sy":700,"pts":[[0.1,0.0313886],[0.2,0.0435092],[0.3,0.0522301],[0.4,0.0591132],[0.5,0.0647789],[0.6,0.0695535],[0.7,0.0736354],[0.8,0.0771573],[0.9,0.0802135],[1.0,0.0828745],[1.1,0.0851945],[1.2,0.0872168],[1.3,0.0889766],[1.4,0.0905029],[1.5,0.0918203],[1.6,0.0929495],[1.7,0.0939088],[1.8,0.0947136],[1.9,0.0953778],[2.0,0.0959135],[2.1,0.0963316],[2.2,0.0966418],[2.3,0.0968527],[2.4,0.0969724],[2.5,0.0970078],[2.6,0.0969656],[2.7,0.0968518],[2.8,0.0966716],[2.9,0.0964303],[3.0,0.0961323],[3.1,0.095782],[3.2,0.0953834],[3.3,0.0949399],[3.4,0.0944552],[3.5,0.0939323],[3.6,0.0933741],[3.7,0.0927834],[3.8,0.0921628],[3.9,0.0915147],[4.0,0.0908412],[4.1,0.0901445],[4.2,0.0894265],[4.3,0.0886891],[4.4,0.087934],[4.5,0.0871628],[4.6,0.086377],[4.7,0.0855781],[4.8,0.0847673],[4.9,0.0839461],[5.0,0.0831154],[5.1,0.0822766],[5.2,0.0814305],[5.3,0.0805783],[5.4,0.0797207],[5.5,0.0788588],[5.6,0.0779933],[5.7,0.077125],[5.8,0.0762546],[5.9,0.0753828],[6.0,0.0745103],[6.1,0.0736377],[6.2,0.0727655],[6.3,0.0718943],[6.4,0.0710245],[6.5,0.0701567],[6.6,0.0692914],[6.7,0.0684288],[6.8,0.0675694],[6.9,0.0667137],[7.0,0.0658618],[7.1,0.0650142],[7.2,0.0641711],[7.3,0.0633329],[7.4,0.0624997],[7.5,0.0616719],[7.6,0.0608496],[7.7,0.0600331],[7.8,0.0592226],[7.9,0.0584181],[8.0,0.0576201],[8.1,0.0568284],[8.2,0.0560434],[8.3,0.0552651],[8.4,0.0544936],[8.5,0.0537292],[8.6,0.0529717],[8.7,0.0522215],[8.8,0.0514784],[8.9,0.0507427],[9.0,0.0500143],[9.1,0.0492933],[9.2,0.0485798],[9.3,0.0478737],[9.4,0.0471752],[9.5,0.0464843],[9.6,0.045801],[9.7,0.0451252],[9.8,0.0444571],[9.9,0.0437965],[10.0,0.0431436],[10.1,0.0424983],[10.2,0.0418606],[10.3,0.0412305],[10.4,0.0406079],[10.5,0.0399929],[10.6,0.0393855],[10.7,0.0387855],[10.8,0.038193],[10.9,0.0376079],[11.0,0.0370303],[11.1,0.03646],[11.2,0.035897],[11.3,0.0353413],[11.4,0.0347929],[11.5,0.0342516],[11.6,0.0337175],[11.7,0.0331905],[11.8,0.0326706],[11.9,0.0321576],[12.0,0.0316516],[12.1,0.0311524],[12.2,0.0306601],[12.3,0.0301745],[12.4,0.0296957],[12.5,0.0292235],[12.6,0.0287578],[12.7,0.0282987],[12.8,0.0278461],[12.9,0.0273999],[13.0,0.02696],[13.1,0.0265264],[13.2,0.026099],[13.3,0.0256778],[13.4,0.0252626],[13.5,0.0248535],[13.6,0.0244503],[13.7,0.024053],[13.8,0.0236615],[13.9,0.0232758],[14.0,0.0228958],[14.1,0.0225215],[14.2,0.0221526],[14.3,0.0217893],[14.4,0.0214314],[14.5,0.0210789],[14.6,0.0207317],[14.7,0.0203897],[14.8,0.020053],[14.9,0.0197213],[15.0,0.0193947],[15.1,0.019073],[15.2,0.0187563],[15.3,0.0184444],[15.4,0.0181374],[15.5,0.017835],[15.6,0.0175374],[15.7,0.0172444],[15.8,0.0169559],[15.9,0.0166719],[16.0,0.0163923],[16.1,0.0161171],[16.2,0.0158463],[16.3,0.0155796],[16.4,0.0153172],[16.5,0.0150589],[16.6,0.0148047],[16.7,0.0145546],[16.8,0.0143084],[16.9,0.0140661],[17.0,0.0138277],[17.1,0.013593],[17.2,0.0133622],[17.3,0.013135],[17.4,0.0129115],[17.5,0.0126916],[17.6,0.0124752],[17.7,0.0122623],[17.8,0.0120528],[17.9,0.0118468],[18.0,0.0116441],[18.1,0.0114446],[18.2,0.0112485],[18.3,0.0110555],[18.4,0.0108656],[18.5,0.0106789],[18.6,0.0104952],[18.7,0.0103145],[18.8,0.0101368],[18.9,0.0099621],[19.0,0.0097901],[19.1,0.0096211],[19.2,0.0094548],[19.3,0.0092912],[19.4,0.0091304],[19.5,0.0089723],[19.6,0.0088167],[19.7,0.0086638],[19.8,0.0085133],[19.9,0.0083654],[20.0,0.00822],[20.1,0.008077],[20.2,0.0079363],[20.3,0.0077981],[20.4,0.0076621],[20.5,0.0075284],[20.6,0.007397],[20.7,0.0072678],[20.8,0.0071407],[20.9,0.0070158],[21.0,0.006893],[21.1,0.0067723],[21.2,0.0066536],[21.3,0.0065369],[21.4,0.0064222],[21.5,0.0063094],[21.6,0.0061986],[21.7,0.0060896],[21.8,0.0059825],[21.9,0.0058772],[22.0,0.0057737],[22.1,0.005672],[22.2,0.005572],[22.3,0.0054737],[22.4,0.0053771],[22.5,0.0052821],[22.6,0.0051888],[22.7,0.005097],[22.8,0.0050069],[22.9,0.0049183],[23.0,0.0048312]],"c":"force4","w":2.4},{"t":"text","p":[132.0,112.8],"s":"300 K","c":"force2","size":12,"a":"start"},{"t":"text","p":[231.0,192.9],"s":"600 K","c":"force4","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":22,"sy":700,"pts":[[15,0],[15,0.2]],"c":"force3","w":1.6,"dash":true},{"t":"text","p":[416,114.0],"s":"soglia Eₐ","c":"force3","size":12,"a":"start"},{"t":"text","p":[418,208.0],"s":"molecole capaci di reagire","c":"muted","size":11,"a":"start"}]}
---
Distribuzione delle energie cinetiche molecolari in un gas a $300\un{K}$ e a $600\un{K}$. A temperatura più alta il massimo si abbassa e si sposta verso destra, e la coda si allunga. Le molecole capaci di reagire sono quelle a destra della soglia $E_\mathrm a$, qui fissata per illustrazione a $15\un{kJ/mol}$; la loro frazione cresce di circa venti volte. Le energie di attivazione reali sono di solito molto più alte, e la frazione corrispondente è molto più piccola.
:::

Scaldando, la curva si allarga e si sposta verso energie più alte. L'area sotto la curva, che rappresenta il numero totale di molecole, resta la stessa. La parte decisiva per la reazione è la coda a destra della soglia $E_\mathrm a$: soltanto gli urti con almeno questa energia possono raggiungere il complesso attivato. Un calcolo basato sulla teoria degli urti, che considera l'energia della componente del moto lungo la congiungente dei centri delle due molecole, mostra che la frazione $f$ di urti con energia sufficiente vale

$$f=e^{-E_\mathrm a/(RT)}.$$

Il fattore $RT$ è un'energia per mole, dell'ordine dell'energia termica media: a $300\un{K}$ vale $2{,}49\un{kJ/mol}$. Quando l'energia di attivazione è molte volte $RT$, come accade quasi sempre, la frazione è piccolissima e molto sensibile alla temperatura. Per una reazione con $E_\mathrm a=50\un{kJ/mol}$ la frazione vale

$$\begin{aligned}
f(298{,}15\un{K})&=e^{-20{,}17}=1{,}74\times10^{-9},\\
f(308{,}15\un{K})&=e^{-19{,}52}=3{,}35\times10^{-9}.
\end{aligned}$$

Meno di due urti su un miliardo hanno l'energia sufficiente, e dieci gradi in più bastano a quasi raddoppiare questa frazione, che cresce di un fattore $1{,}92$. Nello stesso intervallo la frequenza degli urti, proporzionale alla velocità media delle molecole e quindi a $\sqrt T$, aumenta soltanto dell'$1{,}7\%$. L'effetto della temperatura sulla velocità di reazione è dovuto quasi interamente all'allungarsi della coda della distribuzione.

::: nota Perché la coda è così sensibile
La funzione $e^{-x}$ diminuisce rapidamente al crescere di $x$. Se $E_\mathrm a/(RT)=20$, un aumento di temperatura del $3\%$ riduce questo rapporto di circa $0{,}6$, e la funzione esponenziale aumenta di $e^{0{,}6}\simeq1{,}8$ volte. La piccola variazione relativa della temperatura viene amplificata dal rapporto $E_\mathrm a/(RT)$: più alta è la barriera, più la velocità è sensibile alla temperatura.
:::

## L'equazione di Arrhenius {#arrhenius}

La costante di velocità è il prodotto di tre fattori: la frequenza degli urti, la frazione di urti con l'orientazione giusta e la frazione di urti con energia sufficiente. I primi due variano poco con la temperatura e si riuniscono in un'unica costante; il terzo è il fattore esponenziale appena discusso.

::: legge Equazione di Arrhenius
La costante di velocità di una reazione dipende dalla temperatura assoluta $T$ secondo
$$k=A\,e^{-E_\mathrm a/(RT)},$$
dove $E_\mathrm a$ è l'energia di attivazione e $A$, detto **fattore preesponenziale** o fattore di frequenza, ha le stesse unità di $k$.
:::

Il fattore preesponenziale rappresenta la costante di velocità che si avrebbe se ogni urto con l'orientazione giusta fosse efficace, cioè in assenza di barriera. Per le reazioni fra due molecole in fase gassosa la frequenza degli urti corrisponde a valori di $A$ intorno a $10^{11}\un{L/(mol\,s)}$; i valori misurati sono spesso più bassi di diversi ordini di grandezza quando le molecole sono complesse e l'orientazione conta molto. Per le reazioni unimolecolari, come la decomposizione o il riarrangiamento di una singola molecola, $A$ ha unità $\mathrm{s^{-1}}$ e valori tipici fra $10^{12}$ e $10^{15}\un{s^{-1}}$, vicini alle frequenze di vibrazione dei legami.

L'equazione mostra in modo compatto i due modi per accelerare una reazione: aumentare la temperatura, che riduce il rapporto $E_\mathrm a/(RT)$ nell'esponente, oppure abbassare l'energia di attivazione, che è il compito dei catalizzatori. Mostra anche perché alcune reazioni molto esotermiche sono di fatto bloccate a temperatura ambiente. Per una barriera di $100\un{kJ/mol}$ il fattore esponenziale vale $3{,}9\times10^{-18}$ a $300\un{K}$ e $6{,}0\times10^{-6}$ a $1000\un{K}$: nella fiamma, a parità di urti, le molecole reagiscono più di mille miliardi di volte più in fretta. Una scintilla o la fiamma di un fiammifero portano una piccola zona di gas a temperatura altissima; se la reazione libera abbastanza calore da mantenere calda la zona vicina, la combustione si propaga da sola.

## Il grafico di Arrhenius {#grafico}

Prendendo il logaritmo naturale dei due membri, l'equazione di Arrhenius diventa

$$\ln k=\ln A-\frac{E_\mathrm a}{R}\cdot\frac1T.$$

È l'equazione di una retta nelle variabili $1/T$ e $\ln k$: la pendenza vale $-E_\mathrm a/R$ e l'intercetta $\ln A$. Misurando la costante di velocità a diverse temperature e riportando $\ln k$ in funzione di $1/T$, si ottiene un **grafico di Arrhenius**. Se i punti stanno su una retta, la reazione segue l'equazione di Arrhenius nell'intervallo studiato, e dalla pendenza si ricava l'energia di attivazione.

::: figura arrhenius
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[205,""],"sx":1300,"sy":40,"xt":[[0.05,"2,9"],[0.15,"3,0"],[0.25,"3,1"],[0.35,"3,2"],[0.45,"3,3"]],"yt":[[1.0,"−1"],[2.0,"0"],[3.0,"1"],[4.0,"2"]]},{"t":"text","p":[40,30],"s":"ln k","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"1000/T (1/K)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":1300,"sy":40,"pts":[[0.03,4.242788],[0.4,1.5727417]],"c":"force3","w":1.6,"dash":true},{"t":"circle","p":[708.3,211.1,5],"c":"force2"},{"t":"text","p":[716.3,205.1],"s":"300 K","c":"ax","size":11,"a":"start"},{"t":"circle","p":[568.5,180.1,5],"c":"force2"},{"t":"text","p":[576.5,174.1],"s":"310 K","c":"ax","size":11,"a":"start"},{"t":"circle","p":[437.5,151.0,5],"c":"force2"},{"t":"text","p":[445.5,145.0],"s":"320 K","c":"ax","size":11,"a":"start"},{"t":"circle","p":[314.4,123.7,5],"c":"force2"},{"t":"text","p":[322.4,117.7],"s":"330 K","c":"ax","size":11,"a":"start"},{"t":"circle","p":[198.5,97.9,5],"c":"force2"},{"t":"text","p":[206.5,91.9],"s":"340 K","c":"ax","size":11,"a":"start"},{"t":"text","p":[430,190],"s":"pendenza = −Eₐ/R","c":"force3","size":12}]}
---
Grafico di Arrhenius per una reazione unimolecolare con $E_\mathrm a=60\un{kJ/mol}$ e $A=1\times10^{10}\un{s^{-1}}$ (valori illustrativi), fra $310$ e $340\un{K}$. In ascissa $1000/T$, per avere numeri comodi: la temperatura cresce verso sinistra. La pendenza della retta è $-E_\mathrm a/R$.
:::

::: esempio Dalla pendenza all'energia di attivazione
I punti della figura a $310\un{K}$ e a $340\un{K}$ hanno $\ln k=-0{,}253$ e $\ln k=1{,}801$, con $k$ in $\mathrm{s^{-1}}$. La pendenza della retta è
$$\frac{1{,}801-(-0{,}253)}{\dfrac1{340\un{K}}-\dfrac1{310\un{K}}}=\frac{2{,}054}{-2{,}846\times10^{-4}\un{K^{-1}}}=-7{,}22\times10^3\un{K}.$$
L'energia di attivazione è
$$E_\mathrm a=7{,}22\times10^3\un{K}\times8{,}314\un{J/(mol\,K)}=6{,}00\times10^4\un{J/mol}=60{,}0\un{kJ/mol}.$$
:::

L'uso dei dati a più temperature ha due vantaggi su quello di due sole misure: gli errori di misura si compensano nella retta che meglio approssima i punti, e la linearità del grafico controlla la validità del modello. Un grafico curvo indica che qualcosa cambia con la temperatura: il meccanismo, il passaggio determinante, oppure, nelle reazioni enzimatiche, la struttura stessa del catalizzatore.

## Confrontare due temperature {#due-temperature}

Se si conoscono le costanti di velocità $k_1$ e $k_2$ a due temperature $T_1$ e $T_2$, si scrive la forma logaritmica per ciascuna e si sottrae. Il fattore preesponenziale si elimina e resta

$$\ln\frac{k_2}{k_1}=\frac{E_\mathrm a}{R}\left(\frac1{T_1}-\frac1{T_2}\right).$$

La formula serve in due direzioni: dal rapporto delle costanti si ricava l'energia di attivazione, oppure dall'energia di attivazione si prevede di quanto cambia la velocità passando da una temperatura all'altra. Poiché le velocità iniziali e i tempi di dimezzamento sono legati direttamente a $k$, il rapporto $k_2/k_1$ è anche il rapporto delle velocità a parità di concentrazioni, e l'inverso del rapporto dei tempi necessari per raggiungere lo stesso grado di avanzamento.

::: esempio Un reagente che si decompone più in fretta
Un reagente in soluzione si decompone con una cinetica del primo ordine e ha un tempo di dimezzamento di $2{,}0\un{h}$ a $25\,^\circ\mathrm C$. L'energia di attivazione è $90\un{kJ/mol}$. Che cosa succede in un laboratorio a $35\,^\circ\mathrm C$?

Il rapporto delle costanti è
$$\ln\frac{k_2}{k_1}=\frac{90\,000}{8{,}314}\left(\frac1{298{,}15}-\frac1{308{,}15}\right)=1{,}178,$$
quindi $k_2/k_1=3{,}25$. Il tempo di dimezzamento si riduce dello stesso fattore, da $120\un{min}$ a circa $37\un{min}$. Dieci gradi in più fanno sparire metà del reagente in poco più di mezz'ora.
:::

::: quotidiano Il latte e il frigorifero
Il latte pastorizzato inacidisce perché i batteri sopravvissuti alla pastorizzazione trasformano il lattosio in acido lattico; la velocità del processo dipende da una catena di reazioni enzimatiche e dalla crescita dei batteri. Supponiamo che una confezione aperta resti buona circa un giorno a $22\,^\circ\mathrm C$ e circa una settimana a $4\,^\circ\mathrm C$: il processo è sette volte più lento in frigorifero. Applicando la formula con $k_2/k_1=7$, $T_1=277{,}15\un{K}$ e $T_2=295{,}15\un{K}$, si trova
$$E_\mathrm a=\frac{8{,}314\times\ln7}{\dfrac1{277{,}15}-\dfrac1{295{,}15}}\un{J/mol}\simeq73{,}5\un{kJ/mol}.$$
Il valore non descrive una singola reazione, perché la crescita batterica è un processo complesso; è un'**energia di attivazione apparente**, che riassume la sensibilità complessiva alla temperatura. È proprio questa sensibilità a rendere così efficace la catena del freddo: ogni grado in meno rallenta il deterioramento di circa il $10\%$ in questo intervallo.
:::

## La regola dei dieci gradi {#dieci-gradi}

Una regola pratica, nota fin dai lavori di Jacobus van 't Hoff negli anni Ottanta dell'Ottocento, afferma che la velocità di molte reazioni raddoppia o triplica per ogni aumento di temperatura di dieci gradi. La regola ha un fondamento nell'equazione di Arrhenius, che permette anche di stabilirne i limiti.

Il fattore di aumento fra $25$ e $35\,^\circ\mathrm C$ dipende soltanto dall'energia di attivazione. Il raddoppio esatto corrisponde a

$$E_\mathrm a=\frac{R\ln2}{\dfrac1{298{,}15\un{K}}-\dfrac1{308{,}15\un{K}}}\simeq52{,}9\un{kJ/mol},$$

un valore tipico per molte reazioni in soluzione. Con barriere diverse il fattore cambia molto, come mostra la tabella.

| $E_\mathrm a$ (kJ/mol) | fattore fra $25$ e $35\,^\circ\mathrm C$ |
|---|---|
| $20$ | $1{,}30$ |
| $50$ | $1{,}92$ |
| $100$ | $3{,}70$ |
| $150$ | $7{,}13$ |

::: figura raddoppio
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[222,""],"sx":3.2,"sy":26,"xt":[[25,"25"],[50,"50"],[75,"75"],[100,"100"],[125,"125"],[150,"150"]],"yt":[[2,"2"],[4,"4"],[6,"6"],[8,"8"]]},{"t":"text","p":[96,30],"s":"aumento di velocità da 25 a 35 °C","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"energia di attivazione (kJ/mol)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":3.2,"sy":26,"pts":[[0,1.0],[2,1.0265275],[4,1.0537587],[6,1.0817123],[8,1.1104075],[10,1.1398638],[12,1.1701016],[14,1.2011415],[16,1.2330047],[18,1.2657133],[20,1.2992895],[22,1.3337564],[24,1.3691377],[26,1.4054575],[28,1.4427408],[30,1.4810131],[32,1.5203007],[34,1.5606305],[36,1.6020301],[38,1.644528],[40,1.6881533],[42,1.7329358],[44,1.7789062],[46,1.8260962],[48,1.874538],[50,1.9242648],[52,1.9753108],[54,2.0277109],[56,2.081501],[58,2.136718],[60,2.1933998],[62,2.2515853],[64,2.3113142],[66,2.3726277],[68,2.4355676],[70,2.5001771],[72,2.5665006],[74,2.6345835],[76,2.7044724],[78,2.7762153],[80,2.8498614],[82,2.9254612],[84,3.0030664],[86,3.0827302],[88,3.1645074],[90,3.2484539],[92,3.3346273],[94,3.4230867],[96,3.5138927],[98,3.6071075],[100,3.7027951],[102,3.801021],[104,3.9018527],[106,4.0053591],[108,4.1116113],[110,4.2206821],[112,4.3326463],[114,4.4475807],[116,4.5655639],[118,4.686677],[120,4.8110028],[122,4.9386268],[124,5.0696363],[126,5.2041211],[128,5.3421735],[130,5.4838881],[132,5.629362],[134,5.7786949],[136,5.9319893],[138,6.0893503],[140,6.2508856],[142,6.416706],[144,6.5869253],[146,6.76166],[148,6.94103],[150,7.1251583],[152,7.314171],[154,7.5081978]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":3.2,"sy":26,"pts":[[0,2],[53,2]],"c":"muted","w":1.1,"dash":true},{"t":"plot","o":[80,250],"sx":3.2,"sy":26,"pts":[[53,0],[53,2]],"c":"muted","w":1.1,"dash":true},{"t":"circle","p":[249.6,198,5],"c":"force4"},{"t":"text","p":[241.6,184],"s":"raddoppio: Eₐ ≈ 53 kJ/mol","c":"ax","size":11,"a":"end"}]}
---
Fattore di aumento della costante di velocità per un riscaldamento da $25$ a $35\,^\circ\mathrm C$, in funzione dell'energia di attivazione. Il raddoppio della regola pratica corrisponde a una barriera di circa $53\un{kJ/mol}$; le reazioni con barriera più alta sono molto più sensibili alla temperatura.
:::

La regola dipende anche dalla temperatura di partenza. Il termine $1/T_1-1/T_2$, per un intervallo fisso di dieci gradi, vale circa $10/T^2$ e diminuisce quando la temperatura cresce: a $100\,^\circ\mathrm C$, per ottenere un raddoppio fra $100$ e $110\,^\circ\mathrm C$, serve un'energia di attivazione di circa $82\un{kJ/mol}$. A parità di barriera, dieci gradi in più contano meno a temperatura alta che a temperatura bassa.

In biologia la sensibilità alla temperatura si indica con il **coefficiente $Q_{10}$**, il rapporto fra le velocità di un processo a due temperature distanti dieci gradi. Per molti processi fisiologici degli animali a sangue freddo, dalla frequenza cardiaca al ritmo dei lampi delle lucciole, $Q_{10}$ è compreso fra $2$ e $3$; per i processi fisici come la diffusione è vicino a $1{,}3$, il valore che corrisponde a barriere basse. La regola dei dieci gradi è quindi un'indicazione utile per un primo orientamento, da non usare come una legge.

## Intermedi e stati di transizione {#intermedi}

Il capitolo precedente ha descritto le reazioni che avvengono in più passaggi elementari. Ogni passaggio ha il proprio stato di transizione e la propria energia di attivazione, e il profilo energetico complessivo presenta tanti massimi quanti sono i passaggi. Fra due massimi successivi il profilo scende in un minimo: corrisponde a un **intermedio di reazione**, una specie che si forma in un passaggio e si consuma in quello seguente.

Intermedio e stato di transizione sono concetti distinti. Lo stato di transizione sta su un massimo, non ha una durata apprezzabile e non può essere isolato. L'intermedio sta in un minimo, anche se poco profondo: è una specie vera, con una vita media che può andare da frazioni di microsecondo a molti secondi, e spesso si riesce a osservarlo con metodi spettroscopici. Nella maggior parte dei meccanismi gli intermedi sono atomi o radicali liberi, ioni instabili o molecole insolite, presenti in concentrazioni molto basse.

Il passaggio cinetico determinante è quello con lo stato di transizione più alto lungo il profilo, misurato a partire dal livello dei reagenti. Il sistema deve raggiungere quella quota in ogni caso, e i massimi più bassi, una volta raggiunta, non costituiscono più un ostacolo. Quando il passaggio lento è preceduto da un equilibrio rapido, come nel meccanismo

$$\begin{aligned}
\mathrm A+\mathrm B&\rightleftharpoons\mathrm I\quad\text{(rapido)},\\
\mathrm I+\mathrm C&\longrightarrow\mathrm P\quad\text{(lento)},
\end{aligned}$$

la velocità è quella del secondo passaggio, $v=k_2[\mathrm I][\mathrm C]$. La concentrazione dell'intermedio si ricava dall'equilibrio del primo passaggio, $[\mathrm I]=K_1[\mathrm A][\mathrm B]$, e la legge cinetica complessiva diventa $v=k_2K_1[\mathrm A][\mathrm B][\mathrm C]$: la reazione appare del terzo ordine anche se nessun passaggio coinvolge tre molecole. L'energia di attivazione misurata è la somma della barriera del passaggio lento e dell'entalpia del primo equilibrio. Se il primo passaggio è esotermico, l'energia di attivazione apparente può risultare piccola, e in alcuni casi persino negativa: la reazione rallenta scaldando, perché l'intermedio diventa meno abbondante più in fretta di quanto acceleri il passaggio lento.

## I catalizzatori {#catalizzatori}

Un **catalizzatore** è una sostanza che aumenta la velocità di una reazione e si ritrova inalterata alla fine. Partecipa alla reazione, perché si lega ai reagenti o reagisce con loro in un passaggio, e viene restituito in un passaggio successivo: compare nel meccanismo e scompare dall'equazione complessiva. Per questo ne bastano quantità piccole, e una stessa particella di catalizzatore può trasformare un numero enorme di molecole di reagente.

Il catalizzatore offre alla reazione un percorso diverso, con un'energia di attivazione più bassa. La figura del profilo energetico all'inizio del capitolo mostra il punto essenziale: i livelli dei reagenti e dei prodotti restano gli stessi, e cambia soltanto la quota del passo da superare. Il guadagno si calcola con l'equazione di Arrhenius. Se il fattore preesponenziale resta circa lo stesso, abbassare la barriera di $20\un{kJ/mol}$ moltiplica la costante di velocità per

$$e^{20\,000/(8{,}314\times298{,}15)}=e^{8{,}07}\simeq3{,}2\times10^3$$

a $25\,^\circ\mathrm C$. Per ottenere lo stesso risultato scaldando, una reazione con barriera di $75\un{kJ/mol}$ andrebbe portata da $25$ a circa $130\,^\circ\mathrm C$.

::: definizione Catalizzatore
Sostanza che aumenta la velocità di una reazione offrendo un meccanismo con energia di attivazione più bassa, e che si ritrova chimicamente inalterata al termine della reazione. Un catalizzatore lascia invariate l'entalpia e la composizione di equilibrio della reazione, e accelera nella stessa misura la reazione diretta e quella inversa.
:::

L'ultima proprietà merita attenzione. Poiché il dislivello fra reagenti e prodotti non cambia, abbassare la collina di una certa quantità abbassa nella stessa misura la barriera vista dai due lati. Il catalizzatore accelera quindi la reazione diretta e quella inversa dello stesso fattore, e il sistema raggiunge prima l'equilibrio, nella stessa posizione che avrebbe raggiunto senza catalizzatore. Una reazione che non procede perché sfavorita dal punto di vista energetico ed entropico resta tale anche con il miglior catalizzatore: il capitolo [Equilibrio chimico](unit:chemistry-19) tratterà la composizione di equilibrio, che dipende soltanto dai livelli della figura.

Un catalizzatore può anche scegliere fra percorsi diversi. Gli stessi reagenti possono dare prodotti diversi a seconda del catalizzatore, perché ognuno abbassa la barriera di una sola delle reazioni possibili. Questa **selettività**, discussa nel capitolo [Resa e bilanci di materia](unit:chemistry-15) per la sintesi dell'ossido di etilene, è spesso più importante della velocità stessa.

## Catalisi omogenea {#omogenea}

Nella **catalisi omogenea** il catalizzatore si trova nella stessa fase dei reagenti, di solito disciolto nella stessa soluzione o mescolato allo stesso gas. Un esempio da laboratorio è la decomposizione dell'acqua ossigenata,

$$2\,\mathrm{H_2O_2(aq)}\longrightarrow2\,\mathrm{H_2O(l)}+\mathrm{O_2(g)},\qquad\Delta H^\circ\simeq-189\un{kJ}.$$

La reazione è fortemente esotermica, ma a temperatura ambiente, in assenza di catalizzatori e di impurezze, procede molto lentamente: la sua energia di attivazione è di circa $75\un{kJ/mol}$. Aggiungendo una piccola quantità di ioduro di potassio, la soluzione libera rapidamente ossigeno. Il meccanismo proposto comprende due passaggi:

$$\begin{aligned}
\mathrm{H_2O_2}+\mathrm{I^-}&\longrightarrow\mathrm{H_2O}+\mathrm{IO^-}\quad\text{(lento)},\\
\mathrm{H_2O_2}+\mathrm{IO^-}&\longrightarrow\mathrm{H_2O}+\mathrm{O_2}+\mathrm{I^-}\quad\text{(rapido)}.
\end{aligned}$$

Lo ione ioduro si consuma nel primo passaggio e si riforma nel secondo: è il catalizzatore. Lo ione ipoiodito $\mathrm{IO^-}$ si forma nel primo e si consuma nel secondo: è un intermedio. La somma dei due passaggi restituisce la reazione complessiva, e la legge cinetica misurata, $v=k[\mathrm{H_2O_2}][\mathrm{I^-}]$, è quella del passaggio lento: la velocità è proporzionale alla concentrazione del catalizzatore. Con lo ioduro l'energia di attivazione scende a circa $56\un{kJ/mol}$; con lo stesso fattore preesponenziale, a $25\,^\circ\mathrm C$ la costante sarebbe circa duemila volte più grande.

Un caso di catalisi omogenea con conseguenze planetarie è la distruzione dell'ozono stratosferico. Le molecole di clorofluorocarburi, stabili nella bassa atmosfera, salgono lentamente nella stratosfera, dove la radiazione ultravioletta le spezza e libera atomi di cloro. Ogni atomo di cloro avvia un ciclo di due passaggi.

::: figura ozono
{"w":660,"h":234,"items":[{"t":"circle","p":[190,100,34],"c":"body"},{"t":"text","p":[190,106],"s":"Cl","c":"force3","size":16},{"t":"circle","p":[470,100,34],"c":"body"},{"t":"text","p":[470,106],"s":"ClO","c":"force4","size":16},{"t":"arrow","p":[232,78,428,78],"c":"force2","w":2.2,"head":9},{"t":"arrow","p":[428,122,232,122],"c":"force2","w":2.2,"head":9},{"t":"text","p":[330,64],"s":"Cl + O₃ → ClO + O₂","c":"ax","size":13},{"t":"text","p":[330,146],"s":"ClO + O → Cl + O₂","c":"ax","size":13},{"t":"text","p":[330,190],"s":"bilancio: O₃ + O → 2 O₂","c":"force3","size":13},{"t":"text","p":[330,214],"s":"l'atomo di cloro esce intatto e ricomincia il ciclo","c":"muted","size":11}]}
---
Ciclo catalitico del cloro nella stratosfera. Nel primo passaggio l'atomo di cloro sottrae un atomo di ossigeno all'ozono; nel secondo il monossido di cloro reagisce con un atomo di ossigeno e restituisce il cloro. Il bilancio è la trasformazione di una molecola di ozono e di un atomo di ossigeno in due molecole di ossigeno.
:::

L'atomo di cloro è il catalizzatore, il monossido di cloro è l'intermedio. Poiché il cloro si rigenera a ogni giro, un solo atomo può distruggere decine di migliaia di molecole di ozono, secondo alcune stime fino a centomila, prima di essere sottratto al ciclo da una reazione che lo lega in forma inattiva, per esempio come acido cloridrico. Il meccanismo fu proposto nel 1974 da Mario Molina e Frank Sherwood Rowland; insieme a Paul Crutzen, che aveva studiato un ciclo analogo degli ossidi di azoto, ricevettero il premio Nobel per la chimica nel 1995. Il protocollo di Montreal del 1987 ha avviato l'eliminazione dei clorofluorocarburi, e lo strato di ozono mostra segni di lenta ricostituzione.

## Catalisi eterogenea {#eterogenea}

Nella **catalisi eterogenea** il catalizzatore è in una fase diversa da quella dei reagenti: quasi sempre è un solido, a contatto con reagenti gassosi o liquidi. La reazione avviene sulla superficie, in una sequenza di passaggi:

1. le molecole di reagente si legano alla superficie, un fenomeno detto **adsorbimento**;
2. i legami interni delle molecole adsorbite si indeboliscono, e alcune si spezzano in frammenti legati alla superficie;
3. i frammenti si muovono sulla superficie, si incontrano e reagiscono;
4. i prodotti si staccano dalla superficie, liberando il posto per nuove molecole.

L'idrogenazione dei doppi legami carbonio-carbonio su nichel, palladio o platino è un esempio tipico. La molecola di idrogeno, adsorbita sul metallo, si scinde in due atomi legati alla superficie; la molecola con il doppio legame si adsorbe vicino, e riceve gli atomi di idrogeno uno alla volta. La reazione trasforma gli oli vegetali in grassi solidi ed è stata usata a lungo per produrre la margarina. Il chimico francese Paul Sabatier, che ne studiò i principi, ricevette il premio Nobel per la chimica nel 1912.

Poiché la reazione avviene sulla superficie, l'attività di un catalizzatore eterogeneo dipende dall'area esposta. I catalizzatori industriali sono preparati in forma di polveri finissime, di granuli porosi o di sottili strati di metallo depositati su un supporto ceramico, con superfici di decine o centinaia di metri quadrati per grammo. Per la stessa ragione un catalizzatore eterogeneo può essere **avvelenato**: una sostanza che si lega alla superficie più fortemente dei reagenti ne occupa i siti attivi e la rende inutilizzabile.

La marmitta catalitica di un'automobile a benzina contiene un supporto ceramico a nido d'ape, attraversato da migliaia di canali sottili, rivestito da un sottile strato di platino, palladio e rodio. Sulla superficie avvengono contemporaneamente l'ossidazione del monossido di carbonio e degli idrocarburi incombusti ad anidride carbonica e acqua, e la riduzione degli ossidi di azoto ad azoto molecolare. Il catalizzatore funziona soltanto dopo aver raggiunto qualche centinaio di gradi, ed è per questo che la maggior parte delle emissioni di un viaggio breve si concentra nei primi minuti, a motore freddo. Il piombo, aggiunto per decenni alla benzina come antidetonante, avvelena i metalli della marmitta: l'introduzione dei catalizzatori, obbligatori in Europa sulle auto nuove dai primi anni Novanta, ha accompagnato l'eliminazione della benzina con piombo.

I due grandi processi industriali dell'azoto sono anch'essi catalitici. La sintesi dell'ammoniaca dall'azoto e dall'idrogeno usa un catalizzatore a base di ferro, a temperature fra $400$ e $500\,^\circ\mathrm C$; l'ossidazione dell'ammoniaca a ossido di azoto, primo passo verso l'acido nitrico e i fertilizzanti nitrati, avviene su reti di platino e rodio. Si stima che la maggior parte dei prodotti dell'industria chimica passi per almeno un passaggio catalitico.

## Gli enzimi {#enzimi}

Gli **enzimi** sono i catalizzatori dei viventi: quasi sempre proteine, molecole formate da centinaia di amminoacidi, ripiegate in una forma tridimensionale precisa. Una piccola regione dell'enzima, il **sito attivo**, accoglie la molecola su cui agisce, detta **substrato**, e la trasforma. L'idea di una corrispondenza stretta fra la forma del substrato e quella del sito attivo fu proposta da Emil Fischer nel 1894 con l'immagine della chiave e della serratura; nel 1958 Daniel Koshland la completò con il modello dell'adattamento indotto, nel quale il sito attivo cambia forma quando il substrato si lega, avvolgendolo e deformandolo verso lo stato di transizione.

L'efficacia degli enzimi supera di molto quella dei catalizzatori artificiali. La catalasi, presente nel fegato, nel sangue e in quasi tutte le cellule che usano l'ossigeno, decompone l'acqua ossigenata che si forma come sottoprodotto del metabolismo: ogni molecola di enzima ne trasforma milioni di molecole al secondo. Le energie di attivazione riportate per la decomposizione dell'acqua ossigenata riassumono il confronto: circa $75\un{kJ/mol}$ senza catalizzatore, $56$ con lo ioduro, $49$ con il platino colloidale, $23$ con la catalasi.

La velocità di una reazione enzimatica dipende dalla concentrazione del substrato in modo caratteristico. A basse concentrazioni la velocità è proporzionale a $[\mathrm S]$; ad alte concentrazioni tutti i siti attivi sono occupati, l'enzima lavora alla massima velocità $v_\text{max}$ e la velocità non cresce più, come una reazione di ordine zero. Leonor Michaelis e Maud Menten descrissero questo comportamento nel 1913 con l'equazione

$$v=\frac{v_\text{max}[\mathrm S]}{K_\mathrm M+[\mathrm S]},$$

dove $K_\mathrm M$, la **costante di Michaelis**, è la concentrazione di substrato alla quale la velocità è metà di quella massima.

La temperatura ha sugli enzimi un effetto doppio. Fino a una certa temperatura la velocità cresce secondo l'equazione di Arrhenius; oltre, la struttura della proteina comincia a disfarsi, il sito attivo perde la sua forma e l'enzima smette di funzionare. Questo processo, la **denaturazione**, è spesso irreversibile, come accade all'albume di un uovo cotto. Gli enzimi umani hanno un massimo di attività intorno alla temperatura corporea; gli enzimi dei batteri che vivono nelle sorgenti termali resistono a temperature molto più alte. La polimerasi del batterio *Thermus aquaticus*, scoperto in una sorgente del parco di Yellowstone, lavora a circa $72\,^\circ\mathrm C$ ed è l'enzima che rende possibile la reazione a catena della polimerasi, la tecnica usata per copiare il DNA nei test diagnostici.

::: quotidiano L'acqua ossigenata sulla ferita
L'acqua ossigenata al $3\%$ venduta in farmacia, versata su una sbucciatura, fa schiuma. Le bollicine sono di ossigeno: la catalasi delle cellule e del sangue decompone l'acqua ossigenata in pochi secondi. La stessa soluzione, sul lavandino, resta tranquilla, e nella bottiglia scura si conserva per mesi. Lo stesso contrasto si osserva versandone una goccia su una fetta di patata cruda e su una fetta di patata bollita: nella seconda la cottura ha denaturato l'enzima, e la schiuma non compare.
:::

::: storia Arrhenius, van 't Hoff e la temperatura
Nel 1884 il chimico olandese Jacobus Henricus van 't Hoff pubblicò gli *Études de dynamique chimique*, nei quali raccoglieva misure di velocità a temperature diverse e proponeva una relazione fra la costante di velocità e la temperatura, ricavata per analogia con la dipendenza delle costanti di equilibrio. Cinque anni dopo lo svedese Svante Arrhenius, studiando l'idrolisi dello zucchero catalizzata dagli acidi, interpretò la relazione esponenziale con l'idea che soltanto una piccola parte delle molecole, quelle «attive», partecipi alla reazione, e che la loro proporzione cresca con la temperatura secondo la legge di distribuzione di Boltzmann. Il modello delle molecole attivate, oggi così naturale, fu accolto lentamente; trovò una giustificazione nella teoria degli urti degli anni Dieci e in quella dello stato di transizione del 1935. Van 't Hoff ricevette il primo premio Nobel per la chimica nel 1901, Arrhenius quello del 1903, per la teoria della dissociazione elettrolitica.
:::

## Errori frequenti {#errori}

::: errore Il catalizzatore sposta l'equilibrio
Un catalizzatore accelera della stessa misura la reazione diretta e quella inversa, e lascia invariata la composizione di equilibrio. Fa arrivare prima all'equilibrio e lascia invariato il punto d'arrivo; per ottenere più prodotto occorre cambiare le condizioni, come la temperatura, la pressione o le concentrazioni.
:::

::: errore Il catalizzatore resta estraneo alla reazione
Il catalizzatore partecipa al meccanismo: si lega ai reagenti, reagisce con loro, forma intermedi. Il suo tratto distintivo è che viene restituito alla fine di ogni ciclo, e per questo è assente nell'equazione complessiva. Nella decomposizione dell'acqua ossigenata catalizzata dallo ioduro, la velocità è proporzionale alla concentrazione del catalizzatore.
:::

::: errore La velocità raddoppia sempre ogni dieci gradi
La regola dei dieci gradi vale per energie di attivazione intorno a $50\un{kJ/mol}$ e a temperature vicine a quella ambiente. Con barriere basse la velocità cambia poco; con barriere alte può aumentare di molte volte. A temperature più alte, a parità di barriera, l'effetto di dieci gradi si riduce.
:::

::: errore L'energia di attivazione coincide con l'entalpia di reazione
L'energia di attivazione misura l'altezza della barriera; l'entalpia di reazione misura il dislivello fra reagenti e prodotti. Una reazione molto esotermica può essere lentissima, come la combustione della carta a temperatura ambiente, e una reazione endotermica può essere rapida.
:::

::: errore Scaldando aumentano soprattutto gli urti
Fra $25$ e $35\,^\circ\mathrm C$ la frequenza degli urti aumenta di meno del $2\%$, mentre la velocità di una reazione tipica quasi raddoppia. L'effetto principale della temperatura è l'aumento della frazione di urti con energia superiore alla barriera.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Per trasformarsi i reagenti devono superare una barriera di energia, l'energia di attivazione, che corrisponde allo stato di transizione o complesso attivato.
- La barriera della reazione inversa è $E_\mathrm a'=E_\mathrm a-\Delta H$.
- Soltanto una frazione $e^{-E_\mathrm a/(RT)}$ degli urti ha energia sufficiente; questa frazione, piccolissima, cresce rapidamente con la temperatura.
- L'equazione di Arrhenius $k=A\,e^{-E_\mathrm a/(RT)}$ lega la costante di velocità alla temperatura; il grafico di $\ln k$ in funzione di $1/T$ è una retta di pendenza $-E_\mathrm a/R$.
- Da due misure, $\ln(k_2/k_1)=(E_\mathrm a/R)(1/T_1-1/T_2)$.
- Il raddoppio ogni dieci gradi a temperatura ambiente corrisponde a $E_\mathrm a\simeq53\un{kJ/mol}$.
- Negli intermedi il profilo ha un minimo, negli stati di transizione un massimo; il passaggio determinante ha lo stato di transizione più alto.
- Un catalizzatore abbassa l'energia di attivazione e lascia invariati $\Delta H$ e l'equilibrio; la catalisi può essere omogenea, eterogenea o enzimatica.
:::

## Glossario {#glossario}

- **Energia di attivazione**: altezza della barriera di energia che separa i reagenti dallo stato di transizione, in $\mathrm{kJ/mol}$.
- **Profilo energetico**: grafico dell'energia del sistema in funzione dell'avanzamento della reazione.
- **Stato di transizione** o **complesso attivato**: configurazione di energia massima lungo il percorso di reazione.
- **Fattore preesponenziale**: costante $A$ dell'equazione di Arrhenius, legata alla frequenza degli urti e alla loro orientazione.
- **Equazione di Arrhenius**: relazione $k=A\,e^{-E_\mathrm a/(RT)}$ fra costante di velocità e temperatura.
- **Grafico di Arrhenius**: grafico di $\ln k$ in funzione di $1/T$, rettilineo con pendenza $-E_\mathrm a/R$.
- **Intermedio di reazione**: specie che si forma in un passaggio del meccanismo e si consuma in un passaggio successivo.
- **Catalizzatore**: sostanza che accelera una reazione abbassandone l'energia di attivazione, e si ritrova inalterata alla fine.
- **Catalisi omogenea**: catalisi in cui catalizzatore e reagenti sono nella stessa fase.
- **Catalisi eterogenea**: catalisi che avviene sulla superficie di un catalizzatore in una fase diversa da quella dei reagenti.
- **Adsorbimento**: legame di molecole alla superficie di un solido.
- **Avvelenamento**: perdita di attività di un catalizzatore per effetto di sostanze che ne occupano i siti attivi.
- **Enzima**: catalizzatore biologico, quasi sempre una proteina.
- **Sito attivo**: regione dell'enzima in cui il substrato si lega e si trasforma.
- **Costante di Michaelis**: concentrazione di substrato alla quale la velocità di una reazione enzimatica è metà di quella massima.
- **Denaturazione**: perdita della struttura tridimensionale di una proteina, che ne annulla l'attività.
- **Coefficiente $Q_{10}$**: rapporto fra le velocità di un processo a due temperature distanti dieci gradi.

## Esercizi {#esercizi}

Gli esercizi sono divisi in tre livelli. Dove non è indicato diversamente, si usi $R=8{,}314\un{J/(mol\,K)}$ e si supponga che il fattore preesponenziale non cambi con la temperatura né con il catalizzatore.

::: esercizio La barriera all'indietro [base]
Una reazione ha energia di attivazione $120\un{kJ/mol}$ ed entalpia di reazione $-40\un{kJ/mol}$. Calcolare l'energia di attivazione della reazione inversa. Un catalizzatore abbassa la barriera diretta a $90\un{kJ/mol}$: quanto vale ora la barriera inversa?
>>> soluzione
La barriera inversa è $E_\mathrm a'=E_\mathrm a-\Delta H$, cioè $120-(-40)=160\un{kJ/mol}$. Con il catalizzatore il dislivello fra reagenti e prodotti resta lo stesso, e la barriera inversa diventa $90+40=130\un{kJ/mol}$; si abbassa degli stessi $30\un{kJ/mol}$ della barriera diretta.
:::

::: esercizio Che cosa cambia un catalizzatore [base]
Per ciascuna grandezza dire se un catalizzatore la modifica: energia di attivazione della reazione diretta; energia di attivazione della reazione inversa; entalpia di reazione; costante di velocità della reazione diretta; composizione della miscela all'equilibrio; tempo necessario per raggiungere l'equilibrio.
>>> soluzione
Il catalizzatore abbassa le due energie di attivazione, della stessa quantità, aumenta la costante di velocità diretta (e quella inversa) e riduce il tempo necessario per raggiungere l'equilibrio. Lascia invariate l'entalpia di reazione e la composizione di equilibrio, che dipendono soltanto dagli stati iniziale e finale.
:::

::: esercizio Dieci gradi alla volta [base]
Una reazione raddoppia la propria velocità per ogni aumento di temperatura di $10\,^\circ\mathrm C$. Di quale fattore cambia la velocità passando da $20$ a $50\,^\circ\mathrm C$? E passando da $20$ a $0\,^\circ\mathrm C$?
>>> soluzione
Da $20$ a $50\,^\circ\mathrm C$ ci sono tre intervalli di dieci gradi: la velocità aumenta di $2^3=8$ volte. Da $20$ a $0\,^\circ\mathrm C$ ci sono due intervalli all'indietro: la velocità si riduce a $1/2^2=1/4$. Il calcolo presuppone che la regola valga nell'intero intervallo, ciò che l'equazione di Arrhenius garantisce soltanto in modo approssimato.
:::

::: esercizio Una frazione piccolissima [base]
Calcolare la frazione $e^{-E_\mathrm a/(RT)}$ per una barriera di $40\un{kJ/mol}$ a $300\un{K}$ e a $600\un{K}$. Di quante volte aumenta?
>>> soluzione
A $300\un{K}$ il rapporto $E_\mathrm a/(RT)$ vale $40\,000/(8{,}314\times300)=16{,}04$, e la frazione vale $e^{-16{,}04}\simeq1{,}1\times10^{-7}$. A $600\un{K}$ l'esponente si dimezza, $8{,}02$, e la frazione vale $3{,}3\times10^{-4}$. Raddoppiando la temperatura assoluta la frazione aumenta di circa $3\times10^3$ volte.
:::

::: esercizio Il ciclo degli ossidi di azoto [base]
Nella stratosfera il monossido di azoto partecipa al meccanismo
$$\begin{aligned}
\mathrm{NO}+\mathrm{O_3}&\longrightarrow\mathrm{NO_2}+\mathrm{O_2},\\
\mathrm{NO_2}+\mathrm O&\longrightarrow\mathrm{NO}+\mathrm{O_2}.
\end{aligned}$$
Scrivere la reazione complessiva e indicare il catalizzatore e l'intermedio.
>>> soluzione
Sommando i due passaggi e semplificando le specie che compaiono da entrambe le parti si ottiene $\mathrm{O_3}+\mathrm O\to2\,\mathrm{O_2}$, la stessa reazione complessiva del ciclo del cloro. Il monossido di azoto si consuma nel primo passaggio e si riforma nel secondo: è il catalizzatore. Il diossido di azoto si forma nel primo e si consuma nel secondo: è l'intermedio.
:::

::: esercizio Energia di attivazione da due misure [medio]
La costante di velocità di una reazione vale $2{,}0\times10^{-3}\un{s^{-1}}$ a $300\un{K}$ e $8{,}0\times10^{-3}\un{s^{-1}}$ a $320\un{K}$. Calcolare l'energia di attivazione.
>>> soluzione
Dalla formula delle due temperature,
$$E_\mathrm a=\frac{R\ln(k_2/k_1)}{1/T_1-1/T_2}=\frac{8{,}314\times\ln4}{\dfrac1{300}-\dfrac1{320}}\un{J/mol}.$$
Il numeratore vale $11{,}53\un{J/(mol\,K)}$, il denominatore $2{,}083\times10^{-4}\un{K^{-1}}$, e $E_\mathrm a\simeq5{,}53\times10^4\un{J/mol}=55{,}3\un{kJ/mol}$.
:::

::: esercizio Quanto accelera [medio]
Una reazione ha energia di attivazione $80\un{kJ/mol}$. Di quante volte aumenta la costante di velocità passando da $25$ a $45\,^\circ\mathrm C$? Che cosa prevederebbe la regola del raddoppio ogni dieci gradi?
>>> soluzione
$$\ln\frac{k_2}{k_1}=\frac{80\,000}{8{,}314}\left(\frac1{298{,}15}-\frac1{318{,}15}\right)=2{,}029,$$
quindi $k_2/k_1\simeq7{,}6$. La regola del raddoppio prevederebbe $2^2=4$: con una barriera di $80\un{kJ/mol}$, più alta di $53\un{kJ/mol}$, la reazione è più sensibile alla temperatura di quanto la regola suggerisca.
:::

::: esercizio Platino ed enzima [medio]
Per la decomposizione dell'acqua ossigenata si riportano energie di attivazione di $75\un{kJ/mol}$ senza catalizzatore, $49\un{kJ/mol}$ con platino colloidale e $23\un{kJ/mol}$ con la catalasi. Stimare di quante volte i due catalizzatori aumentano la costante di velocità a $25\,^\circ\mathrm C$, supponendo invariato il fattore preesponenziale.
>>> soluzione
Con il platino la barriera scende di $26\un{kJ/mol}$; l'esponente vale $26\,000/(8{,}314\times298{,}15)=10{,}49$, e il fattore è $e^{10{,}49}\simeq3{,}6\times10^4$. Con la catalasi scende di $52\un{kJ/mol}$, e il fattore è $e^{20{,}98}\simeq1{,}3\times10^9$. La stima è grossolana, perché il fattore preesponenziale cambia da un percorso all'altro; l'ordine di grandezza mostra comunque il vantaggio enorme dell'enzima.
:::

::: esercizio Stabilità accelerata [medio]
Per stimare la durata di conservazione di un farmaco, lo si conserva a $40\,^\circ\mathrm C$ e si misura che perde il $5\%$ del principio attivo in $6$ mesi. La degradazione ha energia di attivazione $85\un{kJ/mol}$. In quanto tempo si avrebbe la stessa perdita a $25\,^\circ\mathrm C$?
>>> soluzione
Il rapporto fra le costanti a $40$ e a $25\,^\circ\mathrm C$ è
$$\exp\!\left[\frac{85\,000}{8{,}314}\left(\frac1{298{,}15}-\frac1{313{,}15}\right)\right]=e^{1{,}643}\simeq5{,}2.$$
A $25\,^\circ\mathrm C$ la degradazione è circa cinque volte più lenta, e la stessa perdita richiede circa $6\times5{,}2\simeq31$ mesi, poco più di due anni e mezzo. I test di stabilità accelerata dell'industria farmaceutica si basano su questo tipo di estrapolazione, che vale soltanto se il meccanismo di degradazione non cambia fra le due temperature.
:::

::: esercizio Un profilo a due gobbe [medio]
In un meccanismo a due passaggi, misurate a partire dal livello dei reagenti, il primo stato di transizione si trova a $+60\un{kJ/mol}$, l'intermedio a $+20\un{kJ/mol}$, il secondo stato di transizione a $+45\un{kJ/mol}$ e i prodotti a $-30\un{kJ/mol}$. Qual è il passaggio determinante? Quanto valgono l'entalpia di reazione e l'energia di attivazione complessiva? Quale barriera deve superare la reazione inversa?
>>> soluzione
Il passaggio determinante è il primo, che ha lo stato di transizione più alto. L'entalpia di reazione è $-30\un{kJ/mol}$ e l'energia di attivazione complessiva $60\un{kJ/mol}$. La reazione inversa parte dai prodotti e deve raggiungere lo stato di transizione più alto: $60-(-30)=90\un{kJ/mol}$. In senso inverso il passaggio lento resta lo stesso, percorso al contrario.
:::

::: esercizio Quando vale la regola [avanzato]
Calcolare l'energia di attivazione per la quale la costante di velocità raddoppia esattamente fra $25$ e $35\,^\circ\mathrm C$, e quella per la quale raddoppia fra $100$ e $110\,^\circ\mathrm C$. Spiegare la differenza.
>>> soluzione
$$\begin{aligned}
E_\mathrm a(25\to35)&=\frac{8{,}314\ln2}{1/298{,}15-1/308{,}15}\simeq52{,}9\un{kJ/mol},\\
E_\mathrm a(100\to110)&=\frac{8{,}314\ln2}{1/373{,}15-1/383{,}15}\simeq82{,}4\un{kJ/mol}.
\end{aligned}$$
La differenza $1/T_1-1/T_2$ per un intervallo fisso di dieci gradi vale circa $10/T^2$ e diminuisce a temperatura alta: per ottenere lo stesso raddoppio serve una barriera più alta.
:::

::: esercizio La febbre [avanzato]
Un processo enzimatico ha un'energia di attivazione apparente di $50\un{kJ/mol}$. Di quanto aumenta la sua velocità quando la temperatura corporea passa da $37$ a $40\,^\circ\mathrm C$, se l'enzima resta integro? Perché a temperature molto più alte la velocità diminuisce?
>>> soluzione
$$\ln\frac{k_2}{k_1}=\frac{50\,000}{8{,}314}\left(\frac1{310{,}15}-\frac1{313{,}15}\right)=0{,}186,$$
quindi la velocità cresce di circa il $20\%$. A temperature molto più alte prevale la denaturazione: la proteina perde la forma del sito attivo, e il numero di molecole di enzima attive diminuisce più in fretta di quanto cresca la costante di velocità di ciascuna.
:::

::: esercizio Leggere un grafico di Arrhenius [avanzato]
La retta del grafico di Arrhenius di una reazione unimolecolare ha pendenza $-7{,}22\times10^3\un{K}$ e intercetta $\ln A=23{,}0$, con $k$ in $\mathrm{s^{-1}}$. Calcolare l'energia di attivazione, il fattore preesponenziale e la costante di velocità a $25\,^\circ\mathrm C$.
>>> soluzione
L'energia di attivazione è il prodotto di $R$ per la pendenza cambiata di segno, $7{,}22\times10^3\un{K}$, e vale $E_\mathrm a\simeq60{,}0\un{kJ/mol}$. Il fattore preesponenziale è $A=e^{23{,}0}\simeq9{,}7\times10^9\un{s^{-1}}$. A $298{,}15\un{K}$, $\ln k=23{,}0-7220/298{,}15=-1{,}22$, e $k\simeq0{,}30\un{s^{-1}}$. I valori corrispondono alla reazione della figura del grafico di Arrhenius.
:::

::: esercizio Una reazione che rallenta scaldando [avanzato]
In un meccanismo con un equilibrio rapido seguito da un passaggio lento, l'entalpia del primo equilibrio è $-30\un{kJ/mol}$ e l'energia di attivazione del passaggio lento è $20\un{kJ/mol}$. Quanto vale l'energia di attivazione apparente? Di quale fattore cambia la velocità fra $25$ e $35\,^\circ\mathrm C$?
>>> soluzione
L'energia di attivazione apparente è la somma $20+(-30)=-10\un{kJ/mol}$. Il fattore è
$$\exp\!\left[\frac{-10\,000}{8{,}314}\left(\frac1{298{,}15}-\frac1{308{,}15}\right)\right]=e^{-0{,}131}\simeq0{,}88:$$
la velocità diminuisce di circa il $12\%$. Scaldando, l'equilibrio esotermico si sposta verso i reagenti e l'intermedio diventa meno abbondante, ciò che prevale sull'accelerazione del passaggio lento.
:::

::: esercizio Un enzima che si satura [avanzato]
Usando l'equazione di Michaelis e Menten, calcolare la velocità di una reazione enzimatica, come frazione di $v_\text{max}$, per concentrazioni di substrato pari a $0{,}1$, $1$, $4$ e $9$ volte $K_\mathrm M$. Spiegare perché la reazione è circa del primo ordine a basse concentrazioni e circa di ordine zero ad alte concentrazioni.
>>> soluzione
La frazione $v/v_\text{max}=[\mathrm S]/(K_\mathrm M+[\mathrm S])$ vale $0{,}1/1{,}1\simeq0{,}091$, $0{,}5$, $0{,}8$ e $0{,}9$. Quando $[\mathrm S]\ll K_\mathrm M$ il denominatore è quasi uguale a $K_\mathrm M$, e $v\simeq(v_\text{max}/K_\mathrm M)[\mathrm S]$: primo ordine. Quando $[\mathrm S]\gg K_\mathrm M$ il denominatore è quasi uguale a $[\mathrm S]$, e $v\simeq v_\text{max}$, indipendente dalla concentrazione: ordine zero, perché tutti i siti attivi sono occupati.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali; i dati della reazione del grafico di Arrhenius, del reagente che si decompone, del farmaco e dei profili a più passaggi sono illustrativi, come la durata del latte nell'esempio della catena del freddo. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 20-8–20-11. I dati numerici provengono dalle fonti seguenti.

1. Costante dei gas, costante di Boltzmann e costante di Planck: valori raccomandati CODATA 2022.
2. Entalpia di decomposizione dell'acqua ossigenata in soluzione: entalpie standard di formazione di $\mathrm{H_2O_2(aq)}$ e $\mathrm{H_2O(l)}$ delle tabelle NBS, D. D. Wagman et al., J. Phys. Chem. Ref. Data 11 (1982), supplemento 2.
3. Energie di attivazione della decomposizione dell'acqua ossigenata senza catalizzatore e con ioduro, platino colloidale e catalasi: E. A. Moelwyn-Hughes, *Physical Chemistry*, Pergamon Press, nella compilazione riportata da F. Senese, General Chemistry Online, Frostburg State University.
4. Ciclo catalitico del cloro e numero di molecole di ozono distrutte da un atomo di cloro: M. J. Molina e F. S. Rowland, Nature 249 (1974) 810; U.S. Environmental Protection Agency, materiali sulla scienza dell'ozono; World Meteorological Organization, Scientific Assessment of Ozone Depletion 2022.
5. Per la storia e i modelli: J. H. van 't Hoff, *Études de dynamique chimique*, Amsterdam, 1884; S. Arrhenius, Z. Phys. Chem. 4 (1889) 226; H. Eyring, J. Chem. Phys. 3 (1935) 107; M. G. Evans e M. Polanyi, Trans. Faraday Soc. 31 (1935) 875; E. Fischer, Ber. Dtsch. Chem. Ges. 27 (1894) 2985; D. E. Koshland, Proc. Natl. Acad. Sci. USA 44 (1958) 98; L. Michaelis e M. L. Menten, Biochem. Z. 49 (1913) 333; T. D. Brock e H. Freeze, J. Bacteriol. 98 (1969) 289; premi Nobel per la chimica 1901, 1903, 1912 e 1995.
