---
unit: biology-23
titolo: Atmosfere, effetto serra e clima
sottotitolo: Come un'atmosfera trattiene il calore, perché Venere, la Terra e Marte hanno climi così diversi e come la Terra è rimasta abitabile per quattro miliardi di anni
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §7.9-7.10; J. R. Morris et al., Biology: How Life Works, 2ª ed., §25.1-25.2, §48.1
---

## Prima di cominciare {#apertura}

Venere, la Terra e Marte si sono formati nella stessa regione del sistema solare, da materiali simili, più di quattro miliardi e mezzo di anni fa. Oggi sono mondi diversissimi. La superficie di Venere è a circa $737$ K, $464$ °C, sotto un'atmosfera di anidride carbonica con una pressione di $92$ bar; quella di Marte è in media a circa $210$ K, $-63$ °C, sotto un'atmosfera di anidride carbonica con una pressione più di cento volte minore di quella terrestre. In mezzo, la Terra ha una temperatura media di $15$ °C, oceani liquidi da più di quattro miliardi di anni e un'atmosfera di azoto e ossigeno.

La distanza dal Sole spiega solo una parte della differenza. Il capitolo [La zona abitabile](unit:biology-22) ha mostrato che le temperature di equilibrio dei tre pianeti, calcolate dal flusso solare e dall'albedo, sono vicine: circa $227$, $255$ e $210$ K. Il resto lo fanno le atmosfere: quanto sono spesse, di che cosa sono fatte, come trattengono la radiazione infrarossa e come sono cambiate nel tempo.

Questo capitolo studia le atmosfere planetarie come sistemi fisici e chimici. Parte dalla pressione e dalla composizione, spiega perché alcuni gas assorbono l'infrarosso e altri no, costruisce un modello quantitativo dell'effetto serra, esamina le retroazioni che amplificano o smorzano i cambiamenti, e ripercorre la storia divergente dei tre pianeti. Alla fine torna al paradosso del Sole giovane e al termostato geologico che ha mantenuto la Terra abitabile, un tema che riguarda direttamente la ricerca della vita su altri pianeti.

::: obiettivi
- calcolare la pressione alla superficie e l'altezza di scala di un'atmosfera;
- spiegare quali molecole assorbono l'infrarosso e in quali bande;
- usare il modello di atmosfera grigia per collegare profondità ottica e temperatura della superficie;
- descrivere il profilo di temperatura, la convezione e il livello di emissione;
- distinguere retroazioni positive e negative nel sistema climatico e stimare la forzante dell'anidride carbonica;
- ricostruire la storia di Venere, della Terra e di Marte e il ruolo del ciclo dei carbonati e dei silicati.
:::

Il capitolo usa la pressione dei fluidi del capitolo [Fluidi e pressione](unit:physics-14), i gas del capitolo [Gas e stato aeriforme](unit:chemistry-10), la geometria delle molecole del capitolo [Geometria molecolare e VSEPR](unit:chemistry-08) e la temperatura di equilibrio del capitolo [La zona abitabile](unit:biology-22).

## Pressione e composizione {#composizione}

Un'atmosfera è uno strato di gas trattenuto dalla gravità. La pressione alla superficie è il peso della colonna d'aria sovrastante diviso per l'area della sua base. Per un'atmosfera di massa $M_\text{atm}$ su un pianeta di raggio $R$ con accelerazione di gravità $g$ si ha quindi

$$p_0=\frac{M_\text{atm}\,g}{4\pi R^2}.$$

Rovesciando la formula, dalla pressione media di $1{,}013$ bar si ricava che l'atmosfera terrestre ha una massa di circa $5\cdot10^{18}$ kg, meno di un milionesimo della massa della Terra. L'atmosfera di Venere ha una massa quasi cento volte più grande, quella di Marte circa duecento volte più piccola.

La pressione diminuisce con la quota, perché ogni strato sostiene soltanto il peso dell'aria che ha sopra. In un'atmosfera a temperatura uniforme la diminuzione è esponenziale:

$$p(z)=p_0\,\mathrm e^{-z/H},\qquad H=\frac{RT}{\mathcal Mg},$$

dove $\mathcal M$ è la massa molare media del gas e $H$ si chiama **altezza di scala**: salendo di $H$ la pressione si riduce di un fattore $\mathrm e\approx2{,}72$. Per la Terra, con $T=288$ K e $\mathcal M=0{,}029$ kg/mol, l'altezza di scala è circa $8{,}4$ km; alla quota della vetta dell'Everest, $8{,}85$ km, la pressione è circa un terzo di quella al livello del mare. Per Venere, più calda e con molecole più pesanti, l'altezza di scala è circa $16$ km; per Marte, con gravità bassa, circa $11$ km (figura 1).

::: figura pressione
{"w":740,"h":285,"items":[{"t":"axes","o":[80,250],"x":[620,"quota, km"],"y":[225,"pressione, bar"],"sx":8,"sy":36,"xt":[[0,"0"],[10,"10"],[20,"20"],[30,"30"],[40,"40"],[50,"50"],[60,"60"]],"yt":[[0,"0,001"],[1,"0,01"],[2,"0,1"],[3,"1"],[4,"10"],[5,"100"]]},{"t":"plot","o":[80,250],"sx":8,"sy":36,"pts":[[0,4.9637878],[1,4.9364737],[2,4.9091596],[3,4.8818455],[4,4.8545314],[5,4.8272172],[6,4.7999031],[7,4.772589],[8,4.7452749],[9,4.7179608],[10,4.6906466],[11,4.6633325],[12,4.6360184],[13,4.6087043],[14,4.5813902],[15,4.5540761],[16,4.5267619],[17,4.4994478],[18,4.4721337],[19,4.4448196],[20,4.4175055],[21,4.3901913],[22,4.3628772],[23,4.3355631],[24,4.308249],[25,4.2809349],[26,4.2536208],[27,4.2263066],[28,4.1989925],[29,4.1716784],[30,4.1443643],[31,4.1170502],[32,4.089736],[33,4.0624219],[34,4.0351078],[35,4.0077937],[36,3.9804796],[37,3.9531654],[38,3.9258513],[39,3.8985372],[40,3.8712231],[41,3.843909],[42,3.8165949],[43,3.7892807],[44,3.7619666],[45,3.7346525],[46,3.7073384],[47,3.6800243],[48,3.6527101],[49,3.625396],[50,3.5980819],[51,3.5707678],[52,3.5434537],[53,3.5161396],[54,3.4888254],[55,3.4615113],[56,3.4341972],[57,3.4068831],[58,3.379569],[59,3.3522548],[60,3.3249407]],"c":"force","w":2.6},{"t":"plot","o":[80,250],"sx":8,"sy":36,"pts":[[0,3.0056094],[1,2.9539077],[2,2.902206],[3,2.8505043],[4,2.7988025],[5,2.7471008],[6,2.6953991],[7,2.6436974],[8,2.5919957],[9,2.5402939],[10,2.4885922],[11,2.4368905],[12,2.3851888],[13,2.333487],[14,2.2817853],[15,2.2300836],[16,2.1783819],[17,2.1266801],[18,2.0749784],[19,2.0232767],[20,1.971575],[21,1.9198732],[22,1.8681715],[23,1.8164698],[24,1.7647681],[25,1.7130663],[26,1.6613646],[27,1.6096629],[28,1.5579612],[29,1.5062594],[30,1.4545577],[31,1.402856],[32,1.3511543],[33,1.2994526],[34,1.2477508],[35,1.1960491],[36,1.1443474],[37,1.0926457],[38,1.0409439],[39,0.9892422],[40,0.9375405],[41,0.8858388],[42,0.834137],[43,0.7824353],[44,0.7307336],[45,0.6790319],[46,0.6273301],[47,0.5756284],[48,0.5239267],[49,0.472225],[50,0.4205232],[51,0.3688215],[52,0.3171198],[53,0.2654181],[54,0.2137163],[55,0.1620146],[56,0.1103129],[57,0.0586112],[58,0.0069095]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":8,"sy":36,"pts":[[0,0.7853298],[1,0.7454863],[2,0.7056428],[3,0.6657992],[4,0.6259557],[5,0.5861122],[6,0.5462687],[7,0.5064251],[8,0.4665816],[9,0.4267381],[10,0.3868945],[11,0.347051],[12,0.3072075],[13,0.2673639],[14,0.2275204],[15,0.1876769],[16,0.1478333],[17,0.1079898],[18,0.0681463],[19,0.0283028]],"c":"force3","w":2.6},{"t":"text","p":[150,71.2],"s":"Venere","c":"force","size":11,"a":"start"},{"t":"text","p":[150,148.7],"s":"Terra","c":"force2","size":11,"a":"start"},{"t":"text","p":[102,216.6],"s":"Marte","c":"force3","size":11,"a":"start"}]}
---
Pressione in funzione della quota per Venere, la Terra e Marte, in scala logaritmica, calcolata con le altezze di scala alla superficie. La pressione al suolo di Venere è $92$ bar, quella di Marte circa $0{,}006$ bar: a $40$ km di quota su Venere la pressione è ancora più alta che al suolo di Marte.
:::

Le composizioni sono molto diverse (tabella qui sotto, con i valori delle schede della NASA). L'atmosfera terrestre è fatta per il $78\%$ di azoto, per il $21\%$ di ossigeno e per quasi l'$1\%$ di argon; l'anidride carbonica è appena lo $0{,}04\%$, e il vapore acqueo varia da quasi zero a qualche punto percentuale. Le atmosfere di Venere e di Marte sono invece fatte per il $95$-$97\%$ di anidride carbonica, con qualche punto percentuale di azoto e di argon.

| Grandezza | Venere | Terra | Marte |
|---|---|---|---|
| pressione al suolo | $92$ bar | $1{,}013$ bar | circa $0{,}006$ bar |
| anidride carbonica | $96{,}5\%$ | $0{,}04\%$ | $95\%$ |
| azoto | $3{,}5\%$ | $78\%$ | $2{,}8\%$ |
| ossigeno | tracce | $21\%$ | tracce |
| temperatura media | $737$ K | $288$ K | $210$ K |

La differenza più vistosa riguarda l'anidride carbonica. Sulla Terra quasi tutto il carbonio si trova nelle rocce: i calcari e le altre rocce carbonatiche ne contengono una quantità che, liberata come gas, darebbe un'atmosfera di anidride carbonica di decine di bar, paragonabile a quella di Venere. La Terra ha quindi un inventario di carbonio simile a quello di Venere; la differenza sta nel luogo in cui lo conserva. Lo stesso vale per l'ossigeno: la Terra ne ha tanto nell'aria perché la fotosintesi lo produce di continuo, come si è visto nel capitolo [Ossigeno, endosimbiosi e cellule complesse](unit:biology-17).

## Perché alcuni gas trattengono il calore {#assorbimento}

Il Sole emette soprattutto luce visibile e vicino infrarosso, con un massimo intorno a $0{,}5$ micrometri; la Terra, a $288$ K, emette nell'infrarosso termico, con un massimo intorno a $10$ micrometri, secondo la legge di Wien. Le due radiazioni occupano bande quasi separate, e un gas può essere trasparente alla prima e opaco alla seconda. È questa asimmetria a produrre l'effetto serra.

Una molecola assorbe radiazione infrarossa quando la frequenza della radiazione coincide con quella di una sua vibrazione e la vibrazione fa oscillare la distribuzione delle cariche, cioè il **momento di dipolo** elettrico. Le molecole biatomiche formate da due atomi uguali, come l'azoto e l'ossigeno, vibrano in modo simmetrico e restano senza dipolo: sono quasi trasparenti all'infrarosso, anche se costituiscono il $99\%$ dell'aria. L'anidride carbonica è lineare e senza dipolo permanente, ma due suoi modi di vibrazione lo creano: la flessione, che piega la molecola, assorbe intorno a $15$ micrometri, proprio vicino al massimo dell'emissione terrestre; lo stiramento asimmetrico assorbe intorno a $4{,}3$ micrometri. L'acqua, molecola piegata con un dipolo permanente, assorbe in una banda intorno a $6{,}3$ micrometri e, con le sue rotazioni, in quasi tutto l'infrarosso oltre i $20$ micrometri. Il metano assorbe intorno a $7{,}7$ micrometri, l'ozono intorno a $9{,}6$.

Fra circa $8$ e $13$ micrometri l'atmosfera terrestre umida è relativamente trasparente: è la **finestra atmosferica**, attraverso cui una parte dell'infrarosso della superficie sfugge direttamente nello spazio (figura 2). I gas che assorbono nella finestra, come l'ozono e molti composti industriali, hanno un effetto serra per molecola molto grande; quelli che assorbono dove l'atmosfera è già opaca hanno un effetto minore, perché aggiungono assorbimento a una banda già quasi satura.

::: figura spettro
{"w":800,"h":305,"items":[{"t":"rect","p":[91.0,96.6,28.0,173.4],"c":"muted","r":0},{"t":"rect","p":[117.6,96.6,8.4,173.4],"c":"muted","r":0},{"t":"rect","p":[145.6,96.6,7.0,173.4],"c":"muted","r":0},{"t":"rect","p":[203.0,96.6,49.0,173.4],"c":"muted","r":0},{"t":"rect","p":[294,96.6,280,173.4],"c":"muted","r":0},{"t":"text","p":[105.0,86.4],"s":"H₂O","c":"ax","size":10},{"t":"text","p":[121.8,66.0],"s":"CH₄","c":"ax","size":10},{"t":"text","p":[149.1,86.4],"s":"O₃","c":"ax","size":10},{"t":"text","p":[227.5,86.4],"s":"CO₂","c":"ax","size":10},{"t":"text","p":[434.0,86.4],"s":"H₂O","c":"ax","size":10},{"t":"axes","o":[70,270],"x":[700,"lunghezza d'onda, μm"],"y":[245,"emissione, normalizzata"],"sx":14,"sy":170,"xt":[[0,"4"],[6,"10"],[16,"20"],[26,"30"],[36,"40"]],"yt":[[0,"0"],[0.5,"0,5"],[1,"1"]]},{"t":"plot","o":[70,270],"sx":14,"sy":170,"pts":[[0.0,0.0539897],[0.2,0.0766752],[0.4,0.1043394],[0.6,0.1368724],[0.8,0.1739514],[1.0,0.2150766],[1.2,0.2596153],[1.4,0.3068475],[1.6,0.3560094],[1.8,0.4063313],[2.0,0.4570688],[2.2,0.5075261],[2.4,0.5570737],[2.6,0.6051578],[2.8,0.6513065],[3.0,0.6951301],[3.2,0.7363189],[3.4,0.7746388],[3.6,0.8099251],[3.8,0.8420748],[4.0,0.8710399],[4.2,0.8968191],[4.4,0.9194511],[4.6,0.9390069],[4.8,0.9555845],[5.0,0.9693021],[5.2,0.9802939],[5.4,0.988705],[5.6,0.9946883],[5.8,0.9984005],[6.0,1.0],[6.2,0.9996442],[6.4,0.9974882],[6.6,0.9936829],[6.8,0.9883742],[7.0,0.9817019],[7.2,0.9737995],[7.4,0.9647934],[7.6,0.9548028],[7.8,0.9439398],[8.0,0.9323092],[8.2,0.9200085],[8.4,0.9071284],[8.6,0.8937528],[8.8,0.879959],[9.0,0.8658183],[9.2,0.8513958],[9.4,0.8367514],[9.6,0.8219394],[9.8,0.8070092],[10.0,0.7920059],[10.2,0.7769699],[10.4,0.7619379],[10.6,0.7469425],[10.8,0.7320133],[11.0,0.7171764],[11.2,0.7024552],[11.4,0.6878701],[11.6,0.6734394],[11.8,0.6591787],[12.0,0.645102],[12.2,0.631221],[12.4,0.6175459],[12.6,0.6040853],[12.8,0.5908462],[13.0,0.5778345],[13.2,0.5650548],[13.4,0.5525108],[13.6,0.5402052],[13.8,0.5281396],[14.0,0.5163151],[14.2,0.504732],[14.4,0.4933901],[14.6,0.4822884],[14.8,0.4714257],[15.0,0.4608003],[15.2,0.4504098],[15.4,0.440252],[15.6,0.4303241],[15.8,0.4206229],[16.0,0.4111454],[16.2,0.4018881],[16.4,0.3928474],[16.6,0.3840196],[16.8,0.3754011],[17.0,0.3669878],[17.2,0.3587759],[17.4,0.3507613],[17.6,0.34294],[17.8,0.3353081],[18.0,0.3278613],[18.2,0.3205958],[18.4,0.3135075],[18.6,0.3065924],[18.8,0.2998464],[19.0,0.2932658],[19.2,0.2868465],[19.4,0.2805848],[19.6,0.2744768],[19.8,0.2685188],[20.0,0.2627071],[20.2,0.2570382],[20.4,0.2515084],[20.6,0.2461144],[20.8,0.2408526],[21.0,0.2357197],[21.2,0.2307125],[21.4,0.2258277],[21.6,0.2210622],[21.8,0.2164129],[22.0,0.2118769],[22.2,0.2074511],[22.4,0.2031328],[22.6,0.1989191],[22.8,0.1948073],[23.0,0.1907948],[23.2,0.186879],[23.4,0.1830572],[23.6,0.1793272],[23.8,0.1756864],[24.0,0.1721326],[24.2,0.1686634],[24.4,0.1652766],[24.6,0.1619701],[24.8,0.1587418],[25.0,0.1555897],[25.2,0.1525116],[25.4,0.1495058],[25.6,0.1465702],[25.8,0.1437031],[26.0,0.1409028],[26.2,0.1381673],[26.4,0.1354952],[26.6,0.1328846],[26.8,0.1303341],[27.0,0.127842],[27.2,0.1254069],[27.4,0.1230273],[27.6,0.1207017],[27.8,0.1184288],[28.0,0.1162072],[28.2,0.1140356],[28.4,0.1119127],[28.6,0.1098372],[28.8,0.1078081],[29.0,0.105824],[29.2,0.1038839],[29.4,0.1019866],[29.6,0.100131],[29.8,0.0983162],[30.0,0.096541],[30.2,0.0948045],[30.4,0.0931057],[30.6,0.0914437],[30.8,0.0898176],[31.0,0.0882264],[31.2,0.0866693],[31.4,0.0851455],[31.6,0.0836542],[31.8,0.0821945],[32.0,0.0807656],[32.2,0.0793669],[32.4,0.0779975],[32.6,0.0766569],[32.8,0.0753442],[33.0,0.0740588],[33.2,0.0728],[33.4,0.0715672],[33.6,0.0703599],[33.8,0.0691773],[34.0,0.0680189],[34.2,0.066884],[34.4,0.0657723],[34.6,0.064683],[34.8,0.0636158],[35.0,0.0625699],[35.2,0.0615451],[35.4,0.0605407],[35.6,0.0595563],[35.8,0.0585914],[36.0,0.0576457]],"c":"force","w":2.6},{"t":"text","p":[177.8,219.0],"s":"finestra","c":"force2","size":11},{"t":"text","p":[177.8,233.0],"s":"8-13 μm","c":"force2","size":10}]}
---
Emissione di un corpo nero a $288$ K in funzione della lunghezza d'onda, con le principali bande di assorbimento dell'atmosfera terrestre indicate in modo schematico. Fra circa $8$ e $13$ micrometri si apre la finestra atmosferica, interrotta dalla banda dell'ozono.
:::

::: nota La saturazione delle bande
Al centro della banda a $15$ micrometri l'anidride carbonica assorbe già quasi tutto l'infrarosso nei primi metri d'aria. Aggiungere gas allarga però la banda verso le sue ali, dove l'assorbimento è incompleto, e sposta più in alto il livello da cui la radiazione sfugge verso lo spazio. Per questo l'effetto di un aumento di anidride carbonica cresce con il logaritmo della concentrazione: ogni raddoppio aggiunge circa la stessa forzante.
:::

## Un modello di effetto serra {#eddington}

Il modello a uno strato del capitolo [La zona abitabile](unit:biology-22) tratta l'atmosfera come un'unica lastra. Un'atmosfera reale è spessa: la radiazione infrarossa emessa dal suolo viene assorbita a una certa quota, riemessa in tutte le direzioni, assorbita di nuovo più in alto, e così via molte volte prima di sfuggire nello spazio. Per descrivere questo processo serve la **profondità ottica**.

Un fascio di radiazione che attraversa uno strato assorbente si attenua in modo esponenziale, secondo la legge di Beer e Lambert: $I=I_0\,\mathrm e^{-\tau}$. La grandezza adimensionale $\tau$ misura quanto lo strato è opaco. Con $\tau=1$ passa il $37\%$ della radiazione, con $\tau=0{,}5$ il $61\%$, con $\tau=5$ meno dell'$1\%$. Un'atmosfera con profondità ottica infrarossa $\tau$ molto maggiore di uno è opaca: la radiazione del suolo non arriva direttamente nello spazio, e il pianeta irraggia dagli strati alti.

Il caso più semplice è un'**atmosfera grigia**, che assorbe nello stesso modo a tutte le lunghezze d'onda dell'infrarosso e lascia passare la luce della stella. Per un'atmosfera di questo tipo in equilibrio radiativo, Arthur Eddington ricavò negli anni Venti, studiando gli strati esterni delle stelle, una soluzione approssimata che si applica anche ai pianeti.

::: legge Atmosfera grigia
In un'atmosfera grigia con profondità ottica infrarossa totale $\tau$, trasparente alla luce della stella, la temperatura della superficie è circa

$$T_s=T_\text{eq}\left(1+\frac34\tau\right)^{1/4},$$

dove $T_\text{eq}$ è la temperatura di equilibrio del pianeta.
:::

Senza atmosfera, $\tau=0$, la superficie è alla temperatura di equilibrio. Con $\tau=1$ e $T_\text{eq}=255$ K, i valori terrestri, la superficie è a circa $293$ K, $20$ °C. Rovesciando la formula si stima la profondità ottica che spiega le temperature osservate: per la Terra, con $288$ K, circa $0{,}84$; per Marte, con un effetto serra di pochi gradi, circa $0{,}1$; per Venere, con $737$ K e una temperatura di equilibrio di $227$ K, quasi $150$ (figura 3).

::: figura eddington
{"w":800,"h":290,"items":[{"t":"axes","o":[80,250],"x":[640,"profondità ottica τ"],"y":[225,"temperatura della superficie, K"],"sx":120,"sy":0.27,"xt":[[0,"0,01"],[1,"0,1"],[2,"1"],[3,"10"],[4,"100"]],"yt":[[50,"200"],[250,"400"],[450,"600"],[650,"800"],[800,""]]},{"t":"plot","o":[80,250],"sx":120,"sy":0.27,"pts":[[0.0,77.0236852],[0.02,77.0435945],[0.04,77.0644364],[0.06,77.0862544],[0.08,77.1090939],[0.1,77.1330024],[0.12,77.1580296],[0.14,77.1842275],[0.16,77.2116503],[0.18,77.2403548],[0.2,77.2704005],[0.22,77.3018495],[0.24,77.3347666],[0.26,77.3692197],[0.28,77.4052798],[0.3,77.443021],[0.32,77.4825207],[0.34,77.5238599],[0.36,77.5671233],[0.38,77.6123991],[0.4,77.6597799],[0.42,77.7093619],[0.44,77.7612459],[0.46,77.8155372],[0.48,77.8723456],[0.5,77.9317858],[0.52,77.9939775],[0.54,78.0590457],[0.56,78.1271209],[0.58,78.198339],[0.6,78.2728422],[0.62,78.3507785],[0.64,78.4323024],[0.66,78.517575],[0.68,78.6067641],[0.7,78.7000448],[0.72,78.7975995],[0.74,78.8996183],[0.76,79.0062991],[0.78,79.117848],[0.8,79.2344797],[0.82,79.3564176],[0.84,79.4838941],[0.86,79.6171511],[0.88,79.7564401],[0.9,79.9020226],[0.92,80.0541703],[0.94,80.2131657],[0.96,80.3793019],[0.98,80.5528836],[1.0,80.7342266],[1.02,80.9236589],[1.04,81.1215205],[1.06,81.3281639],[1.08,81.5439541],[1.1,81.7692694],[1.12,82.0045014],[1.14,82.250055],[1.16,82.5063491],[1.18,82.7738167],[1.2,83.052905],[1.22,83.3440756],[1.24,83.647805],[1.26,83.9645842],[1.28,84.2949195],[1.3,84.6393319],[1.32,84.9983579],[1.34,85.3725489],[1.36,85.7624715],[1.38,86.1687077],[1.4,86.5918543],[1.42,87.0325232],[1.44,87.4913412],[1.46,87.9689493],[1.48,88.4660034],[1.5,88.983173],[1.52,89.5211414],[1.54,90.0806054],[1.56,90.6622741],[1.58,91.2668693],[1.6,91.8951242],[1.62,92.5477833],[1.64,93.225601],[1.66,93.9293418],[1.68,94.6597785],[1.7,95.4176921],[1.72,96.2038704],[1.74,97.0191073],[1.76,97.8642018],[1.78,98.7399566],[1.8,99.6471775],[1.82,100.5866718],[1.84,101.5592477],[1.86,102.5657126],[1.88,103.606872],[1.9,104.6835288],[1.92,105.7964813],[1.94,106.9465229],[1.96,108.13444],[1.98,109.3610115],[2.0,110.6270076],[2.02,111.9331883],[2.04,113.2803026],[2.06,114.6690878],[2.08,116.1002678],[2.1,117.5745529],[2.12,119.0926387],[2.14,120.6552054],[2.16,122.2629169],[2.18,123.9164206],[2.2,125.6163465],[2.22,127.3633073],[2.24,129.1578974],[2.26,131.0006933],[2.28,132.8922531],[2.3,134.8331164],[2.32,136.8238048],[2.34,138.8648214],[2.36,140.9566515],[2.38,143.0997627],[2.4,145.2946052],[2.42,147.5416127],[2.44,149.8412023],[2.46,152.1937754],[2.48,154.5997186],[2.5,157.0594039],[2.52,159.5731899],[2.54,162.1414222],[2.56,164.7644347],[2.58,167.44255],[2.6,170.1760808],[2.62,172.9653302],[2.64,175.8105932],[2.66,178.7121573],[2.68,181.6703035],[2.7,184.6853073],[2.72,187.7574398],[2.74,190.8869681],[2.76,194.0741567],[2.78,197.3192683],[2.8,200.6225646],[2.82,203.984307],[2.84,207.4047578],[2.86,210.8841806],[2.88,214.4228416],[2.9,218.0210097],[2.92,221.6789577],[2.94,225.3969627],[2.96,229.175307],[2.98,233.0142785],[3.0,236.9141715],[3.02,240.8752872],[3.04,244.8979338],[3.06,248.9824279],[3.08,253.129094],[3.1,257.3382657],[3.12,261.6102856],[3.14,265.9455059],[3.16,270.3442889],[3.18,274.8070069],[3.2,279.334043],[3.22,283.9257911],[3.24,288.5826561],[3.26,293.3050544],[3.28,298.093414],[3.3,302.9481747],[3.32,307.8697881],[3.34,312.8587183],[3.36,317.9154413],[3.38,323.040446],[3.4,328.2342336],[3.42,333.4973181],[3.44,338.8302263],[3.46,344.2334981],[3.48,349.7076861],[3.5,355.2533563],[3.52,360.8710877],[3.54,366.5614726],[3.56,372.3251167],[3.58,378.1626389],[3.6,384.0746717],[3.62,390.0618609],[3.64,396.124866],[3.66,402.26436],[3.68,408.4810295],[3.7,414.7755748],[3.72,421.1487098],[3.74,427.6011622],[3.76,434.1336736],[3.78,440.7469991],[3.8,447.4419081],[3.82,454.2191834],[3.84,461.0796221],[3.86,468.0240351],[3.88,475.0532475],[3.9,482.1680983],[3.92,489.3694406],[3.94,496.6581417],[3.96,504.0350831],[3.98,511.5011607],[4.0,519.0572846],[4.02,526.7043792],[4.04,534.4433833],[4.06,542.2752505],[4.08,550.2009487],[4.1,558.2214605],[4.12,566.337783],[4.14,574.5509285],[4.16,582.8619237],[4.18,591.2718106],[4.2,599.7816458],[4.22,608.3925015],[4.24,617.1054646],[4.26,625.9216375],[4.28,634.8421381],[4.3,643.8680994],[4.32,653.0006704],[4.34,662.2410154],[4.36,671.5903146],[4.38,681.0497643],[4.4,690.6205765],[4.42,700.3039795],[4.44,710.1012177],[4.46,720.0135521],[4.48,730.04226],[4.5,740.1886354]],"c":"force","w":2.4},{"t":"text","p":[626.0,50.1],"s":"Venere, 227 K","c":"force","size":10,"a":"start"},{"t":"plot","o":[80,250],"sx":120,"sy":0.27,"pts":[[0.0,105.4767861],[0.02,105.4991906],[0.04,105.5226446],[0.06,105.5471971],[0.08,105.5728991],[0.1,105.5998041],[0.12,105.627968],[0.14,105.6574493],[0.16,105.688309],[0.18,105.7206111],[0.2,105.7544225],[0.22,105.789813],[0.24,105.8268556],[0.26,105.8656268],[0.28,105.9062063],[0.3,105.9486776],[0.32,105.9931279],[0.34,106.0396482],[0.36,106.0883338],[0.38,106.1392841],[0.4,106.1926031],[0.42,106.2483993],[0.44,106.306786],[0.46,106.3678817],[0.48,106.4318099],[0.5,106.4986998],[0.52,106.5686861],[0.54,106.6419093],[0.56,106.7185164],[0.58,106.7986604],[0.6,106.8825012],[0.62,106.9702053],[0.64,107.0619467],[0.66,107.1579065],[0.68,107.2582738],[0.7,107.3632455],[0.72,107.4730268],[0.74,107.5878317],[0.76,107.7078829],[0.78,107.8334124],[0.8,107.9646616],[0.82,108.1018821],[0.84,108.2453354],[0.86,108.3952936],[0.88,108.5520398],[0.9,108.7158683],[0.92,108.8870849],[0.94,109.0660073],[0.96,109.2529655],[0.98,109.4483023],[1.0,109.6523733],[1.02,109.8655473],[1.04,110.0882071],[1.06,110.3207493],[1.08,110.5635847],[1.1,110.817139],[1.12,111.0818528],[1.14,111.3581819],[1.16,111.6465976],[1.18,111.9475872],[1.2,112.2616539],[1.22,112.5893172],[1.24,112.9311133],[1.26,113.2875948],[1.28,113.6593313],[1.3,114.0469093],[1.32,114.4509323],[1.34,114.872021],[1.36,115.3108131],[1.38,115.7679632],[1.4,116.2441432],[1.42,116.7400416],[1.44,117.2563636],[1.46,117.7938309],[1.48,118.3531812],[1.5,118.9351682],[1.52,119.5405608],[1.54,120.1701428],[1.56,120.8247127],[1.58,121.5050824],[1.6,122.2120771],[1.62,122.9465346],[1.64,123.7093039],[1.66,124.5012451],[1.68,125.3232282],[1.7,126.1761318],[1.72,127.0608427],[1.74,127.9782541],[1.76,128.929265],[1.78,129.9147791],[1.8,130.9357028],[1.82,131.9929449],[1.84,133.0874147],[1.86,134.2200208],[1.88,135.3916698],[1.9,136.603265],[1.92,137.855705],[1.94,139.1498823],[1.96,140.4866822],[1.98,141.8669812],[2.0,143.2916458],[2.02,144.7615314],[2.04,146.2774809],[2.06,147.8403238],[2.08,149.450875],[2.1,151.1099338],[2.12,152.8182828],[2.14,154.5766875],[2.16,156.385895],[2.18,158.2466339],[2.2,160.1596133],[2.22,162.1255223],[2.24,164.1450302],[2.26,166.2187855],[2.28,168.3474163],[2.3,170.53153],[2.32,172.7717133],[2.34,175.0685325],[2.36,177.4225337],[2.38,179.8342431],[2.4,182.3041674],[2.42,184.8327945],[2.44,187.4205939],[2.46,190.0680174],[2.48,192.7754998],[2.5,195.5434598],[2.52,198.372301],[2.54,201.2624124],[2.56,204.2141696],[2.58,207.2279358],[2.6,210.3040626],[2.62,213.4428914],[2.64,216.644754],[2.66,219.909974],[2.68,223.2388675],[2.7,226.6317448],[2.72,230.0889106],[2.74,233.6106658],[2.76,237.1973079],[2.78,240.8491325],[2.8,244.5664341],[2.82,248.349507],[2.84,252.1986462],[2.86,256.1141486],[2.88,260.0963134],[2.9,264.1454434],[2.92,268.2618456],[2.94,272.4458318],[2.96,276.6977197],[2.98,281.0178333],[3.0,285.4065037],[3.02,289.8640698],[3.04,294.3908787],[3.06,298.9872864],[3.08,303.6536583],[3.1,308.3903696],[3.12,313.1978059],[3.14,318.0763637],[3.16,323.0264504],[3.18,328.0484853],[3.2,333.1428993],[3.22,338.3101356],[3.24,343.5506501],[3.26,348.8649112],[3.28,354.2534006],[3.3,359.7166132],[3.32,365.2550573],[3.34,370.8692549],[3.36,376.559742],[3.38,382.3270686],[3.4,388.1717986],[3.42,394.0945107],[3.44,400.0957975],[3.46,406.1762666],[3.48,412.3365399],[3.5,418.5772544],[3.52,424.8990616],[3.54,431.302628],[3.56,437.7886353],[3.58,444.3577799],[3.6,451.0107735],[3.62,457.748343],[3.64,464.5712305],[3.66,471.4801933],[3.68,478.4760041],[3.7,485.5594509],[3.72,492.7313372],[3.74,499.9924818],[3.76,507.3437192],[3.78,514.7858993],[3.8,522.3198877],[3.82,529.9465656],[3.84,537.6668298],[3.86,545.4815929],[3.88,553.3917834],[3.9,561.3983454],[3.92,569.5022389],[3.94,577.7044401],[3.96,586.0059409],[3.98,594.4077493],[4.0,602.9108896],[4.02,611.516402],[4.04,620.2253431],[4.06,629.0387859],[4.08,637.9578196],[4.1,646.9835499],[4.12,656.1170992],[4.14,665.3596062],[4.16,674.7122266],[4.18,684.1761328],[4.2,693.7525141],[4.22,703.4425767],[4.24,713.247544],[4.26,723.1686565],[4.28,733.2071722],[4.3,743.3643661],[4.32,753.6415311],[4.34,764.0399776],[4.36,774.5610337],[4.38,785.2060454],[4.4,795.9763769],[4.42,806.8734103],[4.44,817.898546],[4.46,829.053203],[4.48,840.3388186],[4.5,851.7568492]],"c":"force2","w":2.4},{"t":"text","p":[626.0,20.0],"s":"Terra, 255 K","c":"force2","size":10,"a":"start"},{"t":"plot","o":[80,250],"sx":120,"sy":0.27,"pts":[[0.0,60.1922734],[0.02,60.2107066],[0.04,60.2300033],[0.06,60.2502037],[0.08,60.2713499],[0.1,60.2934859],[0.12,60.3166576],[0.14,60.3409132],[0.16,60.3663029],[0.18,60.3928793],[0.2,60.4206974],[0.22,60.4498147],[0.24,60.4802914],[0.26,60.5121902],[0.28,60.5455768],[0.3,60.5805198],[0.32,60.6170911],[0.34,60.6553654],[0.36,60.6954213],[0.38,60.7373404],[0.4,60.7812084],[0.42,60.8271144],[0.44,60.8751518],[0.46,60.9254179],[0.48,60.9780146],[0.5,61.0330479],[0.52,61.0906288],[0.54,61.1508729],[0.56,61.213901],[0.58,61.2798391],[0.6,61.3488186],[0.62,61.4209768],[0.64,61.4964565],[0.66,61.575407],[0.68,61.6579837],[0.7,61.7443486],[0.72,61.8346707],[0.74,61.9291259],[0.76,62.0278974],[0.78,62.1311761],[0.8,62.2391608],[0.82,62.3520583],[0.84,62.4700838],[0.86,62.5934612],[0.88,62.7224234],[0.9,62.8572124],[0.92,62.99808],[0.94,63.1452876],[0.96,63.2991065],[0.98,63.4598189],[1.0,63.6277173],[1.02,63.8031052],[1.04,63.9862975],[1.06,64.1776204],[1.08,64.3774121],[1.1,64.5860226],[1.12,64.8038146],[1.14,65.031163],[1.16,65.2684556],[1.18,65.5160933],[1.2,65.7744901],[1.22,66.0440735],[1.24,66.3252846],[1.26,66.618578],[1.28,66.9244223],[1.3,67.2433002],[1.32,67.5757082],[1.34,67.9221569],[1.36,68.2831709],[1.38,68.659289],[1.4,69.0510637],[1.42,69.4590617],[1.44,69.8838631],[1.46,70.3260616],[1.48,70.7862644],[1.5,71.2650913],[1.52,71.7631751],[1.54,72.2811607],[1.56,72.8197048],[1.58,73.3794756],[1.6,73.9611521],[1.62,74.5654233],[1.64,75.1929881],[1.66,75.8445539],[1.68,76.5208364],[1.7,77.2225587],[1.72,77.9504502],[1.74,78.7052459],[1.76,79.4876855],[1.78,80.2985123],[1.8,81.1384724],[1.82,82.0083131],[1.84,82.9087828],[1.86,83.8406289],[1.88,84.8045973],[1.9,85.8014313],[1.92,86.8318702],[1.94,87.8966483],[1.96,88.9964939],[1.98,90.1321281],[2.0,91.3042639],[2.02,92.513605],[2.04,93.7608451],[2.06,95.0466664],[2.08,96.3717395],[2.1,97.736722],[2.12,99.1422578],[2.14,100.5889766],[2.16,102.0774932],[2.18,103.608407],[2.2,105.1823014],[2.22,106.7997435],[2.24,108.4612837],[2.26,110.1674557],[2.28,111.9187762],[2.3,113.7157451],[2.32,115.5588449],[2.34,117.4485416],[2.36,119.3852846],[2.38,121.3695066],[2.4,123.4016248],[2.42,125.4820404],[2.44,127.6111396],[2.46,129.7892943],[2.48,132.0168622],[2.5,134.2941877],[2.52,136.621603],[2.54,138.999428],[2.56,141.4279717],[2.58,143.9075331],[2.6,146.4384013],[2.62,149.0208573],[2.64,151.6551741],[2.66,154.3416178],[2.68,157.0804487],[2.7,159.8719218],[2.72,162.716288],[2.74,165.6137948],[2.76,168.564687],[2.78,171.5692078],[2.8,174.6275995],[2.82,177.7401042],[2.84,180.9069646],[2.86,184.128425],[2.88,187.4047316],[2.9,190.7361334],[2.92,194.1228831],[2.94,197.5652373],[2.96,201.0634572],[2.98,204.6178095],[3.0,208.2285666],[3.02,211.8960073],[3.04,215.6204171],[3.06,219.402089],[3.08,223.2413236],[3.1,227.1384296],[3.12,231.0937243],[3.14,235.1075337],[3.16,239.1801934],[3.18,243.3120479],[3.2,247.503452],[3.22,251.7547704],[3.24,256.066378],[3.26,260.4386603],[3.28,264.8720135],[3.3,269.3668449],[3.32,273.9235726],[3.34,278.5426262],[3.36,283.2244466],[3.38,287.9694862],[3.4,292.7782092],[3.42,297.6510915],[3.44,302.5886208],[3.46,307.591297],[3.48,312.6596317],[3.5,317.7941489],[3.52,322.9953848],[3.54,328.2638877],[3.56,333.6002183],[3.58,339.0049499],[3.6,344.4786678],[3.62,350.0219701],[3.64,355.6354673],[3.66,361.3197826],[3.68,367.0755516],[3.7,372.9034228],[3.72,378.804057],[3.74,384.7781281],[3.76,390.8263227],[3.78,396.9493399],[3.8,403.1478919],[3.82,409.4227038],[3.84,415.7745133],[3.86,422.2040714],[3.88,428.7121418],[3.9,435.2995014],[3.92,441.9669401],[3.94,448.7152609],[3.96,455.54528],[3.98,462.4578267],[4.0,469.4537436],[4.02,476.5338868],[4.04,483.6991254],[4.06,490.9503423],[4.08,498.2884335],[4.1,505.7143089],[4.12,513.2288918],[4.14,520.8331191],[4.16,528.5279417],[4.18,536.3143242],[4.2,544.1932449],[4.22,552.1656964],[4.24,560.2326852],[4.26,568.3952319],[4.28,576.6543715],[4.3,585.011153],[4.32,593.4666401],[4.34,602.021911],[4.36,610.6780583],[4.38,619.4361895],[4.4,628.297427],[4.42,637.2629077],[4.44,646.3337841],[4.46,655.5112235],[4.48,664.7964084],[4.5,674.1905371]],"c":"force3","w":2.4},{"t":"text","p":[626.0,68.0],"s":"Marte, 210 K","c":"force3","size":10,"a":"start"},{"t":"circle","p":[310.7,212.7,5],"c":"force2"},{"t":"text","p":[302.7,204.7],"s":"Terra","c":"force2","size":11,"a":"end"},{"t":"circle","p":[580.4,91.5,5],"c":"force"},{"t":"text","p":[572.4,83.5],"s":"Venere","c":"force","size":11,"a":"end"}]}
---
Temperatura della superficie nel modello di atmosfera grigia, in funzione della profondità ottica infrarossa in scala logaritmica, per le temperature di equilibrio di Venere, della Terra e di Marte. I punti indicano la Terra e Venere con le temperature osservate.
:::

::: esempio Quanto deve essere opaca l'atmosfera di un pianeta freddo
Un pianeta ha una temperatura di equilibrio di $210$ K, come Marte. Per portare la superficie a $273{,}15$ K serve

$$1+\frac34\tau=\left(\frac{273{,}15}{210}\right)^4\approx2{,}86,$$

cioè $\tau\approx2{,}5$, tre volte la profondità ottica dell'atmosfera terrestre. Il ciclo dei carbonati, accumulando anidride carbonica, potrebbe in principio raggiungerla, se il pianeta ha abbastanza carbonio, vulcani attivi e una gravità sufficiente a trattenere un'atmosfera densa.
:::

La formula di Eddington cattura l'idea centrale dell'effetto serra: la temperatura della superficie cresce con lo spessore ottico dell'atmosfera, e per atmosfere molto opache come quella di Venere cresce come la radice quarta di $\tau$. I suoi limiti sono altrettanto chiari. Le atmosfere reali assorbono in bande separate da finestre, ben diverse da un assorbitore grigio. Mancano dell'equilibrio puramente radiativo, perché negli strati bassi il calore viene trasportato soprattutto dalla convezione. E le nubi riflettono la luce della stella, cambiando l'albedo, mentre trattengono l'infrarosso.

## Convezione e livello di emissione {#convezione}

Nella parte bassa dell'atmosfera terrestre, la **troposfera**, la temperatura diminuisce con la quota di circa $6{,}5$ gradi per chilometro in media. Il motivo è la convezione. L'aria scaldata dal suolo sale, si espande perché la pressione diminuisce e si raffredda; un'espansione senza scambi di calore, cioè **adiabatica**, raffredda l'aria secca di $g/c_p\approx9{,}8$ gradi per chilometro, dove $c_p$ è il calore specifico a pressione costante. Quando l'aria umida sale, il vapore condensa e libera calore latente, e il raffreddamento è più lento. La diminuzione di temperatura con la quota si chiama **gradiente termico verticale**.

Questa struttura suggerisce un modo intuitivo di capire l'effetto serra. Un pianeta deve irraggiare verso lo spazio tanta energia quanta ne assorbe dalla stella, e quindi irraggia, nel complesso, alla temperatura di equilibrio. La radiazione che arriva nello spazio parte però, in media, da una quota a cui l'atmosfera sovrastante è diventata abbastanza trasparente, il **livello di emissione**. Per la Terra la temperatura di $255$ K si trova a circa $5$ km di quota: con un gradiente di $6{,}5$ gradi per chilometro la superficie, cinque chilometri più in basso, è più calda di circa $33$ gradi (figura 4).

::: figura profilo
{"w":680,"h":285,"items":[{"t":"axes","o":[80,250],"x":[560,"temperatura, K"],"y":[220,"quota, km"],"sx":4.2,"sy":18,"xt":[[0,"200"],[20,"220"],[40,"240"],[60,"260"],[80,"280"],[100,"300"]],"yt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"],[12,"12"]]},{"t":"plot","o":[80,250],"sx":4.2,"sy":18,"pts":[[88.0,0],[16.5,11]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":4.2,"sy":18,"pts":[[91.0,0],[19.5,11]],"c":"force","w":2.2,"dash":true},{"t":"line","p":[80.0,158.6,311.0,158.6],"c":"muted","w":1,"dash":true},{"t":"circle","p":[311.0,158.6,5],"c":"force2"},{"t":"text","p":[92.6,150.6],"s":"livello di emissione, 255 K","c":"force2","size":11,"a":"start"},{"t":"circle","p":[311.0,150.3,5],"c":"force"},{"t":"text","p":[321.0,142.3],"s":"più gas serra: emissione più in alto","c":"force","size":10,"a":"start"},{"t":"text","p":[411.8,241.0],"s":"288 K al suolo","c":"force2","size":10,"a":"end"},{"t":"text","p":[468.2,242],"s":"291 K","c":"force","size":10,"a":"start"}]}
---
Profilo di temperatura della troposfera con un gradiente di $6{,}5$ K/km. Il pianeta irraggia nello spazio come un corpo a $255$ K dal livello di emissione, a circa $5$ km. Se un gas serra in più alza il livello di emissione, la temperatura a quel livello resta $255$ K e l'intero profilo si sposta verso temperature più alte.
:::

Se l'atmosfera diventa più opaca, il livello di emissione sale. Per restare in equilibrio il pianeta deve continuare a irraggiare come un corpo a $255$ K; a parità di gradiente, la nuova quota di emissione può avere $255$ K solo se tutto il profilo si sposta verso temperature più alte. Ogni cento metri in più del livello di emissione corrispondono a circa $0{,}65$ gradi in più al suolo.

Sopra la troposfera, nella **stratosfera** terrestre, la temperatura torna a crescere con la quota, perché l'ozono assorbe la radiazione ultravioletta del Sole. Su Venere e su Marte, privi di uno strato di ozono, questa inversione è assente o molto debole. Anche questa è una traccia della vita: lo strato di ozono esiste perché la fotosintesi ha riempito l'atmosfera di ossigeno.

## Retroazioni e sensibilità climatica {#retroazioni}

Il clima di un pianeta reagisce ai cambiamenti attraverso **retroazioni**, processi innescati da una variazione di temperatura che a loro volta la amplificano o la smorzano.

La più importante retroazione negativa è quella di Planck: un pianeta più caldo irraggia di più, secondo la legge di Stefan e Boltzmann, e si raffredda. Per la Terra un grado in più alla temperatura di emissione aumenta l'irraggiamento verso lo spazio di circa $3{,}2$ watt per metro quadrato, secondo le stime del sesto rapporto dell'IPCC; la derivata della legge del corpo nero, $4\sigma T^3$ a $255$ K, dà un valore simile, circa $3{,}8$. Fra le retroazioni positive ci sono il **vapore acqueo**, perché un'atmosfera più calda ne contiene di più, circa il $7\%$ per grado, e il vapore è un gas serra; e il **ghiaccio**, perché un pianeta più freddo si copre di neve e ghiaccio, riflette più luce e si raffredda ancora. Le **nubi** agiscono in entrambi i sensi, riflettendo la luce e trattenendo l'infrarosso, e sono la fonte principale di incertezza dei modelli del clima.

L'effetto di un cambiamento si misura con la **forzante radiativa**, la variazione del bilancio energetico alla sommità dell'atmosfera, in watt per metro quadrato. Per l'anidride carbonica una formula approssimata, proposta da Gunnar Myhre e collaboratori nel 1998, dà

$$\Delta F\approx5{,}35\,\ln\frac{C}{C_0}\ \mathrm{W/m^2},$$

dove $C$ e $C_0$ sono le concentrazioni finale e iniziale. Un raddoppio produce circa $3{,}7$ watt per metro quadrato. Senza altre retroazioni oltre a quella di Planck, il riscaldamento sarebbe di circa $3{,}7/3{,}2\approx1{,}2$ gradi; con le retroazioni del vapore, del ghiaccio e delle nubi, il sesto rapporto dell'IPCC, del 2021, stima per un raddoppio un riscaldamento di equilibrio molto probabilmente fra $2{,}5$ e $4$ gradi, con un valore centrale di $3$.

::: approfondimento Il clima della Terra oggi
La concentrazione di anidride carbonica nell'aria, che nelle carote di ghiaccio antartiche è oscillata fra circa $170$ e $300$ parti per milione negli ultimi ottocentomila anni e valeva circa $280$ prima della rivoluzione industriale, ha superato le $420$ parti per milione, soprattutto per la combustione di carbone, petrolio e gas. La forzante corrispondente, rispetto a $280$ parti per milione, è circa $5{,}35\ln(420/280)\approx2{,}2$ watt per metro quadrato. Secondo l'IPCC la temperatura media globale nel decennio 2011-2020 era di circa $1{,}1$ gradi superiore a quella del periodo 1850-1900. Le stesse leggi fisiche che spiegano il clima di Venere e di Marte spiegano anche questo cambiamento.
:::

Una retroazione positiva molto forte può portare il clima a uno stato diverso. Se il ghiaccio arriva alle basse latitudini, l'albedo cresce tanto che il pianeta può gelare completamente. Le rocce della fine del Proterozoico, con depositi glaciali vicini all'equatore di allora, indicano che questo accadde almeno due volte, fra circa $720$ e $635$ milioni di anni fa: è la **Terra a palla di neve**, proposta da Joseph Kirschvink nel 1992 e sviluppata da Paul Hoffman e collaboratori nel 1998. La Terra ne uscì perché i vulcani continuarono a emettere anidride carbonica, che con la superficie ghiacciata non veniva più sottratta dall'alterazione delle rocce; dopo milioni di anni l'effetto serra divenne abbastanza forte da fondere il ghiaccio. All'estremo opposto, la retroazione del vapore acqueo può diventare inarrestabile: è la serra galoppante del capitolo [La zona abitabile](unit:biology-22).

## Tre pianeti, tre storie {#divergenza}

**Venere** riceve quasi il doppio del flusso solare della Terra. Se ebbe oceani nella sua giovinezza, quando il Sole era più debole, li perse: il vapore acqueo raggiunse l'alta atmosfera, la radiazione ultravioletta lo scisse e l'idrogeno sfuggì nello spazio. Una traccia di questa fuga è il rapporto fra deuterio e idrogeno. Il deuterio, più pesante, sfugge più lentamente e si accumula; nel 1982 Thomas Donahue e collaboratori misurarono con la sonda Pioneer Venus un rapporto circa cento volte più alto che negli oceani terrestri, il segno di una perdita di acqua enorme. Se Venere abbia mai avuto oceani in superficie è discusso: nel 2016 Michael Way e collaboratori trovarono con modelli del clima che un Venere giovane in rotazione lenta poteva restare temperato grazie alle nubi, mentre nel 2021 Martin Turbet e collaboratori conclusero che il vapore della giovane Venere non riuscì mai a condensare. Senza acqua liquida l'alterazione delle rocce si ferma, e l'anidride carbonica resta nell'atmosfera; i $92$ bar di Venere sono, in buona parte, il carbonio che sulla Terra sta nei calcari.

**Marte** è un pianeta piccolo, con un decimo della massa terrestre. Si raffreddò in fretta e perse il campo magnetico globale circa quattro miliardi di anni fa, come mostrano le rocce magnetizzate della sua crosta più antica. Senza lo scudo magnetico, il vento solare ha eroso l'alta atmosfera. La sonda MAVEN ha misurato questa perdita: nel 2017 Bruce Jakosky e collaboratori stimarono dai rapporti fra gli isotopi dell'argon che circa due terzi dell'argon atmosferico di Marte sono sfuggiti nello spazio. Il rapporto fra deuterio e idrogeno, misurato dal rover Curiosity nel 2013, è circa sei volte quello terrestre. Eppure valli fluviali, delta e minerali argillosi mostrano che più di tre miliardi e mezzo di anni fa Marte ebbe acqua liquida in superficie, come si discute nel capitolo [Marte: acqua e abitabilità passata](unit:biology-26).

La **Terra** ha conservato gli oceani per tre ragioni principali. È abbastanza lontana dal Sole da non essere entrata nella serra umida. È abbastanza grande da trattenere un'atmosfera densa e da mantenere attive la tettonica a placche e il campo magnetico. E la sua troposfera, fredda in alto, funziona da **trappola fredda**: il vapore condensa prima di arrivare nella stratosfera, dove verrebbe scisso, e l'idrogeno che sfugge nello spazio è pochissimo. La vita, a sua volta, ha cambiato l'atmosfera, aggiungendo ossigeno e metano e modificando la velocità con cui le rocce si alterano.

::: nota Perché le atmosfere sfuggono
Le molecole di un gas hanno una distribuzione di velocità. Negli strati più alti, dove gli urti sono rari, le molecole più veloci possono superare la velocità di fuga del pianeta, $11{,}2$ km/s per la Terra, $10{,}4$ per Venere, $5{,}0$ per Marte. Le molecole leggere, come l'idrogeno, sono le più veloci a parità di temperatura e sfuggono più facilmente. A questa **fuga termica** si aggiungono altri processi, detti non termici, come reazioni chimiche che liberano atomi veloci, ioni trascinati dal vento solare, urti di particelle cariche. Per i pianeti piccoli e senza campo magnetico i processi non termici sono spesso i più importanti.
:::

## Il Sole giovane e debole {#solegiovane}

Quattro miliardi di anni fa il Sole aveva circa il $74\%$ della luminosità attuale, e la temperatura di equilibrio della Terra, con l'albedo di oggi, era di circa $236$ K. Con la profondità ottica attuale, circa $0{,}84$, il modello di atmosfera grigia dà una temperatura della superficie di circa $267$ K, sei gradi sotto lo zero: gran parte degli oceani sarebbe stata gelata. Le rocce dicono altro. Gli zirconi di $4{,}4$ miliardi di anni portano tracce di acqua liquida, e le rocce sedimentarie di Isua, in Groenlandia, di $3{,}8$ miliardi di anni, si sono deposte in acqua. È il **paradosso del Sole giovane e debole**, formulato nel 1972 da Carl Sagan e George Mullen.

Per mantenere la superficie a $288$ K serviva una profondità ottica di circa $1{,}6$ quattro miliardi di anni fa, quasi il doppio di quella attuale (figura 5). Le soluzioni proposte sono diverse e non si escludono a vicenda. Molta più **anidride carbonica**, accumulata dal ciclo dei carbonati, è la candidata più naturale; i suoli fossili di $2{,}2$-$2{,}75$ miliardi di anni pongono però un limite superiore, perché con troppa anidride carbonica si sarebbero formati minerali che non vi si trovano. Il **metano**, prodotto dagli archei metanogeni in un mondo senza ossigeno, è un gas serra molto efficace. Un'atmosfera con molto **idrogeno** e azoto, secondo Robin Wordsworth e Raymond Pierrehumbert, avrebbe aggiunto un effetto serra dovuto agli urti fra le molecole. Un'**albedo** più bassa, con meno continenti e nubi diverse, avrebbe fatto assorbire più luce.

::: figura solegiovane
{"w":780,"h":285,"items":[{"t":"axes","o":[80,250],"x":[660,"tempo, miliardi di anni fa"],"y":[225,"profondità ottica necessaria"],"sx":110,"sy":110,"xt":[[0,"4"],[1,"3"],[2,"2"],[3,"1"],[4,"0"]],"yt":[[0,"0,0"],[0.5,"0,5"],[1.0,"1,0"],[1.5,"1,5"],[2.0,"2,0"]]},{"t":"plot","o":[80,250],"sx":110,"sy":110,"pts":[[0.0,1.6141004],[0.05,1.6045464],[0.1,1.5949923],[0.15,1.5854382],[0.2,1.5758841],[0.25,1.56633],[0.3,1.5567759],[0.35,1.5472219],[0.4,1.5376678],[0.45,1.5281137],[0.5,1.5185596],[0.55,1.5090055],[0.6,1.4994515],[0.65,1.4898974],[0.7,1.4803433],[0.75,1.4707892],[0.8,1.4612351],[0.85,1.4516811],[0.9,1.442127],[0.95,1.4325729],[1.0,1.4230188],[1.05,1.4134647],[1.1,1.4039107],[1.15,1.3943566],[1.2,1.3848025],[1.25,1.3752484],[1.3,1.3656943],[1.35,1.3561403],[1.4,1.3465862],[1.45,1.3370321],[1.5,1.327478],[1.55,1.3179239],[1.6,1.3083699],[1.65,1.2988158],[1.7,1.2892617],[1.75,1.2797076],[1.8,1.2701535],[1.85,1.2605995],[1.9,1.2510454],[1.95,1.2414913],[2.0,1.2319372],[2.05,1.2223831],[2.1,1.2128291],[2.15,1.203275],[2.2,1.1937209],[2.25,1.1841668],[2.3,1.1746127],[2.35,1.1650587],[2.4,1.1555046],[2.45,1.1459505],[2.5,1.1363964],[2.55,1.1268423],[2.6,1.1172883],[2.65,1.1077342],[2.7,1.0981801],[2.75,1.088626],[2.8,1.0790719],[2.85,1.0695179],[2.9,1.0599638],[2.95,1.0504097],[3.0,1.0408556],[3.05,1.0313015],[3.1,1.0217475],[3.15,1.0121934],[3.2,1.0026393],[3.25,0.9930852],[3.3,0.9835311],[3.35,0.9739771],[3.4,0.964423],[3.45,0.9548689],[3.5,0.9453148],[3.55,0.9357607],[3.6,0.9262067],[3.65,0.9166526],[3.7,0.9070985],[3.75,0.8975444],[3.8,0.8879903],[3.85,0.8784363],[3.9,0.8688822],[3.95,0.8593281],[4.0,0.849774]],"c":"force","w":2.6},{"t":"line","p":[80,158.0,520,158.0],"c":"muted","w":1.2,"dash":true},{"t":"text","p":[526,158.0],"s":"oggi, 0,84","c":"muted","size":10,"a":"start"},{"t":"circle","p":[80,72.4,5],"c":"force"},{"t":"text","p":[90,66.4],"s":"4 miliardi di anni fa, 1,6","c":"force","size":11,"a":"start"}]}
---
Profondità ottica infrarossa necessaria, nel modello di atmosfera grigia, per mantenere la superficie della Terra a $288$ K, in funzione del tempo, con la luminosità solare della formula di Gough e albedo $0{,}30$ costante. Alla formazione della Terra serviva circa il doppio della profondità ottica attuale.
:::

Il ruolo del metano lega il clima alla storia della vita. Intorno a $2{,}4$ miliardi di anni fa, quando l'ossigeno prodotto dai cianobatteri si accumulò nell'atmosfera, il metano venne ossidato rapidamente; molti ricercatori collegano a questa perdita di effetto serra le glaciazioni uroniane, che coprirono di ghiaccio gran parte del pianeta. La fotosintesi ossigenica, che ha reso la Terra riconoscibile da lontano, ha anche rischiato di congelarla.

## Il termostato dei carbonati e dei silicati {#carbonati}

Su tempi di centinaia di migliaia di anni la quantità di anidride carbonica nell'aria è regolata da un ciclo geologico. La pioggia, leggermente acida perché scioglie l'anidride carbonica, altera le rocce silicatiche dei continenti. Per un silicato di calcio la reazione complessiva si scrive

$$\begin{aligned}&\mathrm{CaSiO_3+2\,CO_2+H_2O}\\&\quad\mathrm{\to Ca^{2+}+2\,HCO_3^-+SiO_2}.\end{aligned}$$

Gli ioni arrivano al mare con i fiumi, e lì gli organismi, come i coralli, i molluschi e il plancton calcareo, e in parte le reazioni chimiche spontanee li trasformano in carbonato di calcio, che si deposita sul fondo:

$$\begin{aligned}&\mathrm{Ca^{2+}+2\,HCO_3^-}\\&\quad\mathrm{\to CaCO_3+CO_2+H_2O}.\end{aligned}$$

Il bilancio netto, $\mathrm{CaSiO_3+CO_2\to CaCO_3+SiO_2}$, trasferisce una molecola di anidride carbonica dall'aria alle rocce. Il movimento delle placche trascina i sedimenti nel mantello, dove il calore e la pressione liberano di nuovo l'anidride carbonica, che i vulcani riportano nell'atmosfera (figura 6).

::: figura carbonati
{"w":760,"h":280,"items":[{"t":"poly","pts":[[280,20],[480,20],[480,68],[280,68]],"close":true,"c":"force2","w":1.8},{"t":"text","p":[380.0,40],"s":"atmosfera","c":"force2","size":12},{"t":"text","p":[380.0,57],"s":"anidride carbonica","c":"muted","size":10},{"t":"poly","pts":[[540,120],[730,120],[730,168],[540,168]],"close":true,"c":"force3","w":1.8},{"t":"text","p":[635.0,140],"s":"oceano","c":"force3","size":12},{"t":"text","p":[635.0,157],"s":"bicarbonato e calcio","c":"muted","size":10},{"t":"poly","pts":[[280,215],[480,215],[480,263],[280,263]],"close":true,"c":"force","w":1.8},{"t":"text","p":[380.0,235],"s":"sedimenti","c":"force","size":12},{"t":"text","p":[380.0,252],"s":"carbonati sul fondale","c":"muted","size":10},{"t":"poly","pts":[[20,120],[210,120],[210,168],[20,168]],"close":true,"c":"force4","w":1.8},{"t":"text","p":[115.0,140],"s":"mantello","c":"force4","size":12},{"t":"text","p":[115.0,157],"s":"carbonio subdotto","c":"muted","size":10},{"t":"arrow","p":[480,50,600,118],"c":"force3","w":2,"head":8},{"t":"text","p":[585,70],"s":"pioggia e alterazione","c":"ax","size":10,"a":"start"},{"t":"text","p":[585,84],"s":"dei silicati","c":"ax","size":10,"a":"start"},{"t":"arrow","p":[600,170,480,232],"c":"force","w":2,"head":8},{"t":"text","p":[585,216],"s":"organismi calcarei","c":"ax","size":10,"a":"start"},{"t":"arrow","p":[280,240,150,170],"c":"force4","w":2,"head":8},{"t":"text","p":[170,232],"s":"subduzione","c":"ax","size":10,"a":"end"},{"t":"arrow","p":[150,118,280,50],"c":"force2","w":2,"head":8},{"t":"text","p":[170,72],"s":"vulcani","c":"ax","size":10,"a":"end"}]}
---
Il ciclo dei carbonati e dei silicati. L'alterazione delle rocce silicatiche sottrae anidride carbonica all'atmosfera e la porta negli oceani; i carbonati si depositano sul fondale, vengono trascinati nel mantello dalla subduzione e restituiscono anidride carbonica attraverso i vulcani.
:::

Il ciclo funziona da termostato perché l'alterazione dipende dal clima. Con un clima più caldo piove di più e le reazioni sono più veloci, e l'anidride carbonica viene sottratta più in fretta; il clima si raffredda. Con un clima più freddo l'alterazione rallenta, e l'anidride carbonica dei vulcani si accumula; il clima si riscalda. James Walker, Paul Hays e James Kasting proposero questo meccanismo nel 1981, ed è la ragione per cui il bordo esterno della zona abitabile si trova al massimo effetto serra dell'anidride carbonica.

La vita interviene nel termostato. Le radici delle piante e i funghi del suolo accelerano l'alterazione delle rocce, e Robert Berner ha collegato la diffusione delle piante terrestri, nel Devoniano, a una forte diminuzione dell'anidride carbonica atmosferica. Il plancton calcareo trasforma in sedimenti gran parte del carbonio. Il termostato è però lento. I flussi naturali di carbonio dovuti all'alterazione dei silicati sono stimati in poco più di un decimo di miliardo di tonnellate all'anno, mentre le attività umane ne emettono circa dieci miliardi: il ciclo geologico riporterà l'anidride carbonica ai valori preindustriali solo in centinaia di migliaia di anni, e nel frattempo il riequilibrio è affidato agli oceani e alla biosfera.

Per un esopianeta il termostato richiede acqua liquida, rocce silicatiche esposte e un modo di riciclare il carbonio. Un pianeta interamente coperto da un oceano profondo, o un pianeta senza tettonica a placche, potrebbe regolare il clima in modo diverso o non regolarlo affatto. Per questo i modelli della zona abitabile sono ipotesi sul funzionamento della geologia, oltre che sul trasferimento della radiazione.

## Un'esperienza: misurare una profondità ottica {#esperienza}

La legge di Beer e Lambert, $I=I_0\,\mathrm e^{-\tau}$, vale per qualunque strato che assorbe o diffonde la radiazione, dall'atmosfera di un pianeta a un foglio di carta. Uno smartphone con un'applicazione che legge il sensore di luminosità permette di misurarla.

::: metodo Fogli di carta e luce
**Materiale.** Uno smartphone con un'applicazione gratuita che mostra la luminosità in lux, una lampada da scrivania, una decina di fogli uguali di carta da forno o di carta da lucido, del nastro adesivo, un righello.

**Procedura.** Si appoggia lo smartphone sul tavolo con il sensore, di solito vicino alla fotocamera anteriore, rivolto verso l'alto, e si fissa la lampada sopra di esso a circa $30$ cm, in una stanza poco illuminata. Si legge il valore senza fogli, $I_0$. Si appoggia un foglio sopra il sensore, coprendolo bene, e si legge di nuovo; poi due fogli, tre, e così via fino a otto o dieci, ripetendo ogni lettura tre volte e annotando la media. Lampada e telefono non vanno spostati durante la misura.

**Analisi.** Calcolare per ogni numero $n$ di fogli il valore di $\ln(I/I_0)$ e disegnarlo in funzione di $n$. Se i punti stanno su una retta, la pendenza, cambiata di segno, è la profondità ottica di un foglio. Quanti fogli servono per arrivare a una profondità ottica totale di uno, cioè per lasciar passare il $37\%$ della luce? I primi punti si discostano dalla retta? Perché la carta, che soprattutto diffonde la luce, segue la stessa legge di un gas che la assorbe?
:::

L'esperienza mostra il significato della profondità ottica: una grandezza che si somma strato per strato e che riduce la radiazione in modo esponenziale. Nell'atmosfera di un pianeta il ruolo dei fogli lo svolgono le molecole di anidride carbonica e di vapore acqueo, e la radiazione che conta per il clima è l'infrarosso, invisibile a occhio nudo e al sensore del telefono.

## Errori frequenti {#errori}

::: errore Credere che l'effetto serra sia dannoso in sé
L'effetto serra naturale porta la superficie terrestre da circa $255$ a $288$ K e rende possibile l'acqua liquida. Il problema climatico attuale riguarda la sua crescita rapida, dovuta alle emissioni umane di anidride carbonica e di altri gas.
:::

::: errore Pensare che l'azoto e l'ossigeno trattengano il calore
Le molecole biatomiche di due atomi uguali restano senza dipolo anche quando vibrano, e assorbono pochissimo l'infrarosso. L'effetto serra terrestre è dovuto a gas presenti in piccole quantità, come vapore acqueo, anidride carbonica, metano e ozono, e alle nubi.
:::

::: errore Spiegare l'effetto serra con il vetro di una serra
In una serra da giardino il riscaldamento dipende soprattutto dal blocco della convezione: l'aria calda non può salire e mescolarsi con quella esterna. Nell'atmosfera conta invece l'assorbimento e la riemissione della radiazione infrarossa, e il nome è soltanto una metafora.
:::

::: errore Attribuire il clima di Venere soltanto alla vicinanza al Sole
La temperatura di equilibrio di Venere, circa $227$ K, è più bassa di quella della Terra, perché le nubi riflettono gran parte della luce. I $737$ K della superficie sono dovuti all'atmosfera di anidride carbonica a $92$ bar, che ha una profondità ottica infrarossa enorme.
:::

::: errore Credere che il ciclo dei carbonati compensi rapidamente le emissioni
Il termostato geologico agisce su centinaia di migliaia di anni e muove ogni anno una quantità di carbonio decine di volte più piccola delle emissioni umane. Su tempi umani l'anidride carbonica in eccesso viene assorbita in parte dagli oceani e dalla biosfera, e il resto si accumula nell'aria.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- La pressione alla superficie è il peso dell'atmosfera per unità di area; con temperatura uniforme decresce in modo esponenziale con la quota, con altezza di scala $H=RT/(\mathcal Mg)$, circa $8{,}4$ km per la Terra.
- I gas assorbono l'infrarosso quando le loro vibrazioni fanno oscillare il dipolo: anidride carbonica a $15$ e $4{,}3$ micrometri, acqua a $6{,}3$ e oltre $20$, metano a $7{,}7$, ozono a $9{,}6$; fra $8$ e $13$ micrometri si apre la finestra atmosferica.
- In un'atmosfera grigia la temperatura della superficie è $T_s=T_\text{eq}(1+3\tau/4)^{1/4}$; la profondità ottica infrarossa vale circa $0{,}84$ per la Terra e quasi $150$ per Venere.
- Nella troposfera la temperatura diminuisce di circa $6{,}5$ gradi per chilometro; un gas serra in più alza il livello di emissione e riscalda la superficie.
- La retroazione di Planck stabilizza il clima; vapore acqueo e ghiaccio amplificano i cambiamenti; le nubi sono la fonte principale di incertezza. Un raddoppio dell'anidride carbonica produce una forzante di circa $3{,}7$ W/m$^2$ e, secondo l'IPCC, un riscaldamento probabilmente fra $2{,}5$ e $4$ gradi.
- Venere ha perso l'acqua e conserva il carbonio nell'atmosfera; Marte ha perso gran parte dell'atmosfera; la Terra ha conservato oceani, tettonica e un termostato geologico.
- Il paradosso del Sole giovane e debole richiede un effetto serra più forte nell'Archeano, con anidride carbonica, metano e forse idrogeno.
- Il ciclo dei carbonati e dei silicati regola l'anidride carbonica su centinaia di migliaia di anni ed è alla base della zona abitabile.
:::

## Glossario {#glossario}

- **Altezza di scala**: quota su cui la pressione di un'atmosfera isoterma si riduce di un fattore $\mathrm e$.
- **Atmosfera grigia**: atmosfera ideale che assorbe l'infrarosso nello stesso modo a tutte le lunghezze d'onda.
- **Finestra atmosferica**: intervallo di lunghezze d'onda, fra circa $8$ e $13$ micrometri, in cui l'atmosfera terrestre è relativamente trasparente all'infrarosso.
- **Forzante radiativa**: variazione del bilancio energetico alla sommità dell'atmosfera prodotta da un cambiamento, in watt per metro quadrato.
- **Gradiente termico verticale**: diminuzione della temperatura con la quota nella troposfera.
- **Livello di emissione**: quota media da cui la radiazione infrarossa del pianeta sfugge nello spazio.
- **Profondità ottica**: grandezza adimensionale che misura l'opacità di uno strato; la radiazione che lo attraversa si riduce del fattore $\mathrm e^{-\tau}$.
- **Retroazione**: processo innescato da un cambiamento climatico che lo amplifica, se positiva, o lo smorza, se negativa.
- **Sensibilità climatica**: riscaldamento di equilibrio prodotto da un raddoppio dell'anidride carbonica.
- **Terra a palla di neve**: stato in cui il pianeta è coperto di ghiaccio fino alle basse latitudini.
- **Trappola fredda**: zona fredda alla sommità della troposfera in cui il vapore condensa e non raggiunge la stratosfera.
- **Troposfera**: strato più basso dell'atmosfera, in cui la temperatura diminuisce con la quota e il calore è trasportato dalla convezione.

## Esercizi {#esercizi}

::: esercizio La massa dell'atmosfera [base]
Calcolare la massa dell'atmosfera terrestre dalla pressione media al suolo, $101\,325$ Pa, con raggio terrestre $6{,}371\cdot10^6$ m e $g=9{,}81$ m/s$^2$.
>>> soluzione
Dalla formula della pressione al suolo

$$\begin{aligned}M&=\frac{4\pi R^2p_0}{g}\\&=\frac{4\pi\cdot(6{,}371\cdot10^6)^2\cdot101\,325}{9{,}81}\ \mathrm{kg}\\&\approx5{,}3\cdot10^{18}\ \mathrm{kg}.\end{aligned}$$

Il valore accurato, che tiene conto dei rilievi e della variazione di $g$, è circa $5{,}1\cdot10^{18}$ kg.
:::

::: esercizio La pressione in montagna [base]
Con un'altezza di scala di $8{,}4$ km e una pressione di $1{,}013$ bar al livello del mare, stimare la pressione a $5$ km di quota.
>>> soluzione
$p=1{,}013\cdot\mathrm e^{-5/8{,}4}$ bar, cioè circa $1{,}013\cdot0{,}55\approx0{,}56$ bar, poco più di metà della pressione al livello del mare.
:::

::: esercizio Strati opachi [base]
Quale frazione di una radiazione attraversa strati con profondità ottica $0{,}5$, $1$ e $2$?
>>> soluzione
$\mathrm e^{-0{,}5}\approx0{,}61$, $\mathrm e^{-1}\approx0{,}37$ e $\mathrm e^{-2}\approx0{,}14$: il $61\%$, il $37\%$ e il $14\%$.
:::

::: esercizio La Terra grigia [base]
Con $T_\text{eq}=255$ K, calcolare la temperatura della superficie nel modello di atmosfera grigia per $\tau=0$ e $\tau=1$.
>>> soluzione
Per $\tau=0$ si ha $255$ K. Per $\tau=1$ si ha $255\cdot1{,}75^{1/4}\approx293$ K, circa $20$ °C.
:::

::: esercizio Dove emette un pianeta [base]
Con la legge di Wien, $\lambda_\text{max}\approx2898/T$ micrometri con $T$ in kelvin, trovare la lunghezza d'onda di massima emissione per la superficie terrestre a $288$ K, per quella di Venere a $737$ K e per il Sole a $5772$ K.
>>> soluzione
Circa $10$ micrometri per la Terra, $3{,}9$ per Venere e $0{,}50$ per il Sole. La Terra emette proprio nella regione della banda a $15$ micrometri dell'anidride carbonica e della finestra atmosferica.
:::

::: esercizio Il gradiente termico [base]
Con una temperatura al suolo di $288$ K e un gradiente di $6{,}5$ K/km, a quale quota la temperatura vale $255$ K? Quale temperatura c'è a $10$ km?
>>> soluzione
$(288-255)/6{,}5\approx5{,}1$ km. A $10$ km la temperatura è $288-65=223$ K, circa $-50$ °C, vicina a quella della sommità della troposfera alle medie latitudini.
:::

::: esercizio La profondità ottica di due pianeti [medio]
Dalla formula dell'atmosfera grigia stimare la profondità ottica infrarossa della Terra, con $T_\text{eq}=255$ K e $T_s=288$ K, e di Venere, con $T_\text{eq}=226{,}6$ K e $T_s=737$ K.
>>> soluzione
Da $\tau=\tfrac43[(T_s/T_\text{eq})^4-1]$ si ottiene circa $0{,}84$ per la Terra e circa $148$ per Venere. L'atmosfera di Venere è opaca all'infrarosso quasi duecento volte più di quella terrestre.
:::

::: esercizio Un pianeta freddo [medio]
Quale profondità ottica serve a un pianeta con $T_\text{eq}=210$ K per avere la superficie a $0$ °C? Come potrebbe raggiungerla?
>>> soluzione
$(273{,}15/210)^4\approx2{,}86$, quindi $\tau=\tfrac43\cdot1{,}86\approx2{,}5$. Il ciclo dei carbonati può accumulare anidride carbonica se il pianeta ha vulcani attivi e acqua liquida almeno in parte; un pianeta piccolo come Marte, che perde atmosfera nello spazio, fatica a mantenerla.
:::

::: esercizio La forzante dell'anidride carbonica [medio]
Con $\Delta F=5{,}35\ln(C/C_0)$ W/m$^2$, calcolare la forzante di un raddoppio e del passaggio da $280$ a $420$ parti per milione, e il riscaldamento corrispondente con la sola retroazione di Planck, $3{,}2$ W/m$^2$ per grado.
>>> soluzione
Il raddoppio dà $5{,}35\ln2\approx3{,}7$ W/m$^2$ e circa $1{,}2$ gradi; il passaggio da $280$ a $420$ ppm dà $5{,}35\ln1{,}5\approx2{,}2$ W/m$^2$ e circa $0{,}7$ gradi. Le retroazioni del vapore acqueo e del ghiaccio portano il riscaldamento di equilibrio a valori più alti.
:::

::: esercizio Alzare il livello di emissione [medio]
Se un aumento di gas serra alza il livello di emissione di $150$ m, di quanto cresce la temperatura della superficie, con un gradiente di $6{,}5$ K/km costante?
>>> soluzione
$0{,}15\cdot6{,}5\approx0{,}98$ K, circa un grado. Il ragionamento suppone che la temperatura al livello di emissione resti $255$ K e che il gradiente non cambi.
:::

::: esercizio Il Sole giovane [medio]
Quattro miliardi di anni fa la temperatura di equilibrio della Terra era circa $236$ K. Calcolare la temperatura della superficie con la profondità ottica attuale, $0{,}84$, e la profondità ottica necessaria per avere $288$ K.
>>> soluzione
$236\cdot(1+0{,}63)^{1/4}\approx267$ K, circa $-6$ °C, con oceani in gran parte gelati. Per $288$ K serve $\tau=\tfrac43[(288/236)^4-1]\approx1{,}6$, quasi il doppio di oggi.
:::

::: esercizio Velocità di fuga e idrogeno [medio]
Calcolare la velocità di fuga di Marte, $v=\sqrt{2GM/R}$, con $M=6{,}42\cdot10^{23}$ kg, $R=3{,}39\cdot10^6$ m e $G=6{,}67\cdot10^{-11}$ unità SI, e confrontarla con la velocità quadratica media degli atomi di idrogeno a $1000$ K, $\sqrt{3kT/m}$, con $m=1{,}67\cdot10^{-27}$ kg.
>>> soluzione
La velocità di fuga è circa $5{,}0$ km/s; quella quadratica media dell'idrogeno a $1000$ K è anch'essa circa $5{,}0$ km/s. Una parte consistente degli atomi di idrogeno negli strati alti supera la velocità di fuga, e Marte perde idrogeno con facilità. Per l'azoto, ventotto volte più pesante, la velocità quadratica media è circa $0{,}94$ km/s.
:::

::: esercizio La saturazione logaritmica [avanzato]
Calcolare la forzante per i passaggi da $280$ a $560$ ppm, da $560$ a $1120$ ppm e da $280$ a $1120$ ppm. Che cosa mostra il confronto, e da quale fenomeno fisico dipende?
>>> soluzione
I primi due passaggi danno entrambi $5{,}35\ln2\approx3{,}7$ W/m$^2$, il terzo $5{,}35\ln4\approx7{,}4$ W/m$^2$. Ogni raddoppio aggiunge la stessa forzante: il centro della banda a $15$ micrometri è saturo, e il gas aggiunto agisce sulle ali della banda e sull'altezza del livello di emissione.
:::

::: esercizio Venere ancora più opaca [avanzato]
Nel modello di atmosfera grigia, per $\tau\gg1$, la temperatura della superficie cresce come $\tau^{1/4}$. Calcolare la temperatura della superficie di Venere se la profondità ottica passasse da $148$ a $300$, con $T_\text{eq}=226{,}6$ K. Di quale fattore cresce?
>>> soluzione
Con $\tau=148$ si ritrovano circa $737$ K; con $\tau=300$ si ottiene $226{,}6\cdot226^{1/4}\approx879$ K. Il rapporto è circa $1{,}19\approx2^{1/4}$: raddoppiare la profondità ottica di un'atmosfera già opachissima aumenta la temperatura assoluta di circa un quinto.
:::

::: esercizio Uscire dalla palla di neve [avanzato]
Una Terra ghiacciata ha albedo di circa $0{,}6$. Calcolare la temperatura di equilibrio con $S=1361$ W/m$^2$, la temperatura della superficie con la profondità ottica attuale, $0{,}84$, e la profondità ottica necessaria per arrivare a $273$ K.
>>> soluzione
$T_\text{eq}=[0{,}4\cdot1361/(4\sigma)]^{1/4}\approx221$ K. Con $\tau=0{,}84$ la superficie è a circa $250$ K, e il ghiaccio resta stabile. Per $273$ K serve $\tau=\tfrac43[(273/221)^4-1]\approx1{,}8$, più del doppio dell'attuale: l'anidride carbonica dei vulcani deve accumularsi per milioni di anni prima che il ghiaccio fonda.
:::

::: esercizio Quanta acqua ha perso Venere [avanzato]
Supponiamo che Venere abbia perso idrogeno ma pochissimo deuterio, e che il rapporto fra deuterio e idrogeno della sua acqua sia aumentato di cento volte. Quale frazione dell'acqua iniziale resta, e quale si è persa? Perché la stima è un limite inferiore della perdita?
>>> soluzione
Se il deuterio resta, la sua quantità è costante e il rapporto D/H cresce come l'inverso dell'idrogeno rimasto: con un aumento di cento volte resta circa l'$1\%$ dell'acqua, e se ne è perso il $99\%$. Se anche una parte del deuterio è sfuggita, per ottenere lo stesso arricchimento la perdita deve essere ancora maggiore, e l'acqua dei vulcani e delle comete arrivata più tardi diluisce il segnale.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §7.9-7.10 (atmosfere planetarie e fotochimica), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §25.1-25.2 (ciclo del carbonio a breve e a lungo termine) e §48.1 (basi fisiche del clima). Shaw indica nella formula della pressione al suolo la massa del pianeta al posto di quella dell'atmosfera, e chiama massa della Terra i $5{,}3\cdot10^{18}$ kg che sono la massa dell'atmosfera; colloca nel vicino infrarosso l'emissione terrestre a $9{,}7$ micrometri, che appartiene all'infrarosso termico; attribuisce il clima di Venere soprattutto al vapore acqueo, mentre l'effetto serra venusiano è dovuto all'anidride carbonica a $92$ bar e alle nubi. Le grandezze planetarie provengono dalle schede della NASA.

1. A. S. Eddington, *The Internal Constitution of the Stars*, Cambridge University Press (1926): l'equilibrio radiativo di un'atmosfera grigia.
2. G. A. Schmidt e collaboratori, *Journal of Geophysical Research* 115, D20106 (2010): i contributi all'effetto serra terrestre.
3. G. Myhre e collaboratori, *Geophysical Research Letters* 25, 2715 (1998): la forzante dell'anidride carbonica.
4. IPCC, *Climate Change 2021: The Physical Science Basis*, Cambridge University Press (2021): retroazioni, sensibilità climatica e riscaldamento osservato.
5. D. Lüthi e collaboratori, *Nature* 453, 379 (2008): l'anidride carbonica negli ultimi ottocentomila anni.
6. J. L. Kirschvink, in *The Proterozoic Biosphere*, Cambridge University Press (1992); P. F. Hoffman e collaboratori, *Science* 281, 1342 (1998): la Terra a palla di neve.
7. T. M. Donahue e collaboratori, *Science* 216, 630 (1982): il deuterio su Venere; M. J. Way e collaboratori, *Geophysical Research Letters* 43, 8376 (2016); M. Turbet e collaboratori, *Nature* 598, 276 (2021): gli oceani di Venere.
8. B. M. Jakosky e collaboratori, *Science* 355, 1408 (2017): la perdita dell'atmosfera di Marte; C. R. Webster e collaboratori, *Science* 341, 260 (2013): gli isotopi dell'idrogeno su Marte.
9. C. Sagan, G. Mullen, *Science* 177, 52 (1972): il Sole giovane e debole; R. Rye, P. H. Kuo, H. D. Holland, *Nature* 378, 603 (1995): limiti all'anidride carbonica dai suoli fossili; R. Wordsworth, R. Pierrehumbert, *Science* 339, 64 (2013); M. T. Rosing e collaboratori, *Nature* 464, 744 (2010).
10. J. C. G. Walker, P. B. Hays, J. F. Kasting, *Journal of Geophysical Research* 86, 9776 (1981): il termostato dei carbonati e dei silicati; R. A. Berner, *Science* 276, 544 (1997): le piante e l'anidride carbonica nel Paleozoico.
11. J. Gaillardet, A. Galy, *Science* 320, 1727 (2008): i flussi di carbonio dell'alterazione; P. Friedlingstein e collaboratori, *Earth System Science Data* (2023): il bilancio globale del carbonio.
