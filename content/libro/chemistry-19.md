---
unit: chemistry-19
titolo: Equilibrio chimico
sottotitolo: Reazioni reversibili, equilibrio dinamico, costante di equilibrio, quoziente di reazione ed energia di Gibbs
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §15-1–15-5, 15-7 e 13-5
---

## Prima di cominciare {#apertura}

In una bottiglia di acqua frizzante ancora chiusa le bollicine non si vedono. Il liquido sembra immobile, eppure l'anidride carbonica continua a passare dalla soluzione allo spazio gassoso sotto il tappo e dal gas alla soluzione; i due passaggi avvengono con la stessa velocità e si compensano. Quando si svita il tappo il gas esce, la pressione sopra il liquido crolla e la compensazione si rompe: l'anidride carbonica lascia la soluzione in forma di bollicine, finché l'acqua diventa piatta.

Molte reazioni chimiche si comportano allo stesso modo. Gli esercizi di stechiometria del capitolo [Stechiometria e reagente limitante](unit:chemistry-14) supponevano che i reagenti si trasformassero completamente nei prodotti, fino all'esaurimento del reagente limitante. Spesso la reazione si ferma prima: rimane una miscela di reagenti e prodotti la cui composizione, a temperatura costante, non cambia più. Questo stato è l'**equilibrio chimico**. Il capitolo ne descrive la natura dinamica, introduce la costante di equilibrio, che riassume in un solo numero la composizione finale, e mostra come prevedere in quale verso procede una reazione e come calcolare le quantità presenti all'equilibrio. L'ultima parte collega la costante di equilibrio all'energia di Gibbs introdotta nel capitolo [Termochimica e calorimetria](unit:chemistry-16).

::: obiettivi
- riconoscere una reazione reversibile e descrivere l'equilibrio come uno stato dinamico;
- scrivere l'espressione della costante di equilibrio per reazioni omogenee ed eterogenee;
- combinare le costanti di reazioni collegate e passare da $K_c$ a $K_p$;
- interpretare il valore numerico di una costante di equilibrio;
- usare il quoziente di reazione per prevedere il verso di una trasformazione;
- calcolare la composizione all'equilibrio con una tabella delle quantità, anche con approssimazioni giustificate;
- collegare la costante di equilibrio all'energia di Gibbs standard di reazione.
:::

Il capitolo usa le concentrazioni molari del capitolo [Soluzioni e concentrazione](unit:chemistry-12), le pressioni parziali del capitolo [Gas e stato aeriforme](unit:chemistry-10), il prodotto di solubilità del capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13) e la legge cinetica del capitolo [Velocità di reazione](unit:chemistry-17). Il capitolo successivo, [Perturbazioni dell'equilibrio](unit:chemistry-20), studierà come l'equilibrio risponde ai cambiamenti di concentrazione, pressione e temperatura.

## Reazioni che si fermano prima {#reversibili}

Si mescolino una mole di acido acetico e una mole di etanolo, con qualche goccia di acido solforico come catalizzatore. I due composti reagiscono e formano acetato di etile, il solvente dall'odore fruttato di molti smalti per unghie, e acqua:

$$\mathrm{CH_3COOH}+\mathrm{C_2H_5OH}\rightleftharpoons\mathrm{CH_3COOC_2H_5}+\mathrm{H_2O}.$$

La reazione, un'**esterificazione**, procede abbastanza in fretta all'inizio, poi rallenta e si arresta quando si sono formati circa due terzi di mole di estere. Da quel momento la composizione della miscela resta costante, per quanto a lungo si aspetti. Rimane un terzo di mole di acido e un terzo di mole di alcol che non reagiscono più, anche se nessuno dei due reagenti è esaurito.

::: figura avvicinamento
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[215,""],"sx":90,"sy":200,"xt":[],"yt":[[0.5,"0,5"],[1.0,"1,0"]]},{"t":"text","p":[40,30],"s":"quantità (mol)","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"tempo","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":90,"sy":200,"pts":[[0.0,1.0],[0.05,0.9523905],[0.1,0.9091599],[0.15,0.8697778],[0.2,0.8337951],[0.25,0.8008294],[0.3,0.7705529],[0.35,0.742683],[0.4,0.7169745],[0.45,0.693214],[0.5,0.6712147],[0.55,0.6508123],[0.6,0.631862],[0.65,0.6142353],[0.7,0.597818],[0.75,0.5825084],[0.8,0.5682152],[0.85,0.5548567],[0.9,0.5423592],[0.95,0.5306562],[1.0,0.5196876],[1.05,0.5093989],[1.1,0.4997404],[1.15,0.490667],[1.2,0.4821374],[1.25,0.4741138],[1.3,0.4665619],[1.35,0.4594496],[1.4,0.452748],[1.45,0.4464301],[1.5,0.4404711],[1.55,0.4348481],[1.6,0.4295399],[1.65,0.424527],[1.7,0.419791],[1.75,0.4153152],[1.8,0.4110837],[1.85,0.4070821],[1.9,0.4032966],[1.95,0.3997145],[2.0,0.3963241],[2.05,0.3931143],[2.1,0.3900747],[2.15,0.3871956],[2.2,0.384468],[2.25,0.3818833],[2.3,0.3794336],[2.35,0.3771115],[2.4,0.3749098],[2.45,0.372822],[2.5,0.370842],[2.55,0.3689638],[2.6,0.3671819],[2.65,0.3654913],[2.7,0.363887],[2.75,0.3623644],[2.8,0.3609193],[2.85,0.3595475],[2.9,0.3582451],[2.95,0.3570086],[3.0,0.3558344],[3.05,0.3547194],[3.1,0.3536605],[3.15,0.3526548],[3.2,0.3516995],[3.25,0.350792],[3.3,0.34993],[3.35,0.349111],[3.4,0.3483328],[3.45,0.3475935],[3.5,0.3468909],[3.55,0.3462233],[3.6,0.3455889],[3.65,0.3449859],[3.7,0.3444129],[3.75,0.3438683],[3.8,0.3433506],[3.85,0.3428586],[3.9,0.3423909],[3.95,0.3419463],[4.0,0.3415237],[4.05,0.3411219],[4.1,0.3407399],[4.15,0.3403768],[4.2,0.3400315],[4.25,0.3397033],[4.3,0.3393912],[4.35,0.3390945],[4.4,0.3388124],[4.45,0.3385441],[4.5,0.338289],[4.55,0.3380465],[4.6,0.3378159],[4.65,0.3375965],[4.7,0.337388],[4.75,0.3371897],[4.8,0.3370011],[4.85,0.3368217],[4.9,0.3366512],[4.95,0.336489],[5.0,0.3363347],[5.05,0.336188],[5.1,0.3360485],[5.15,0.3359159],[5.2,0.3357897],[5.25,0.3356697],[5.3,0.3355555],[5.35,0.335447],[5.4,0.3353437],[5.45,0.3352456],[5.5,0.3351522],[5.55,0.3350633],[5.6,0.3349789],[5.65,0.3348985],[5.7,0.3348221],[5.75,0.3347494],[5.8,0.3346803],[5.85,0.3346145],[5.9,0.334552],[5.95,0.3344925],[6.0,0.3344359]],"c":"force4","w":2.4},{"t":"plot","o":[80,250],"sx":90,"sy":200,"pts":[[0.0,0.0],[0.05,0.0476095],[0.1,0.0908401],[0.15,0.1302222],[0.2,0.1662049],[0.25,0.1991706],[0.3,0.2294471],[0.35,0.257317],[0.4,0.2830255],[0.45,0.306786],[0.5,0.3287853],[0.55,0.3491877],[0.6,0.368138],[0.65,0.3857647],[0.7,0.402182],[0.75,0.4174916],[0.8,0.4317848],[0.85,0.4451433],[0.9,0.4576408],[0.95,0.4693438],[1.0,0.4803124],[1.05,0.4906011],[1.1,0.5002596],[1.15,0.509333],[1.2,0.5178626],[1.25,0.5258862],[1.3,0.5334381],[1.35,0.5405504],[1.4,0.547252],[1.45,0.5535699],[1.5,0.5595289],[1.55,0.5651519],[1.6,0.5704601],[1.65,0.575473],[1.7,0.580209],[1.75,0.5846848],[1.8,0.5889163],[1.85,0.5929179],[1.9,0.5967034],[1.95,0.6002855],[2.0,0.6036759],[2.05,0.6068857],[2.1,0.6099253],[2.15,0.6128044],[2.2,0.615532],[2.25,0.6181167],[2.3,0.6205664],[2.35,0.6228885],[2.4,0.6250902],[2.45,0.627178],[2.5,0.629158],[2.55,0.6310362],[2.6,0.6328181],[2.65,0.6345087],[2.7,0.636113],[2.75,0.6376356],[2.8,0.6390807],[2.85,0.6404525],[2.9,0.6417549],[2.95,0.6429914],[3.0,0.6441656],[3.05,0.6452806],[3.1,0.6463395],[3.15,0.6473452],[3.2,0.6483005],[3.25,0.649208],[3.3,0.65007],[3.35,0.650889],[3.4,0.6516672],[3.45,0.6524065],[3.5,0.6531091],[3.55,0.6537767],[3.6,0.6544111],[3.65,0.6550141],[3.7,0.6555871],[3.75,0.6561317],[3.8,0.6566494],[3.85,0.6571414],[3.9,0.6576091],[3.95,0.6580537],[4.0,0.6584763],[4.05,0.6588781],[4.1,0.6592601],[4.15,0.6596232],[4.2,0.6599685],[4.25,0.6602967],[4.3,0.6606088],[4.35,0.6609055],[4.4,0.6611876],[4.45,0.6614559],[4.5,0.661711],[4.55,0.6619535],[4.6,0.6621841],[4.65,0.6624035],[4.7,0.662612],[4.75,0.6628103],[4.8,0.6629989],[4.85,0.6631783],[4.9,0.6633488],[4.95,0.663511],[5.0,0.6636653],[5.05,0.663812],[5.1,0.6639515],[5.15,0.6640841],[5.2,0.6642103],[5.25,0.6643303],[5.3,0.6644445],[5.35,0.664553],[5.4,0.6646563],[5.45,0.6647544],[5.5,0.6648478],[5.55,0.6649367],[5.6,0.6650211],[5.65,0.6651015],[5.7,0.6651779],[5.75,0.6652506],[5.8,0.6653197],[5.85,0.6653855],[5.9,0.665448],[5.95,0.6655075],[6.0,0.6655641]],"c":"force2","w":2.4},{"t":"plot","o":[80,250],"sx":90,"sy":200,"pts":[[0,0.6666667],[6,0.6666667]],"c":"muted","w":1,"dash":true},{"t":"plot","o":[80,250],"sx":90,"sy":200,"pts":[[0,0.3333333],[6,0.3333333]],"c":"muted","w":1,"dash":true},{"t":"text","p":[111.0,74.0],"s":"acido acetico (ed etanolo)","c":"force4","size":12,"a":"start"},{"t":"text","p":[215.0,98.0],"s":"acetato di etile (e acqua)","c":"force2","size":12,"a":"start"},{"t":"text","p":[626,120.7],"s":"2/3","c":"ax","size":12,"a":"start"},{"t":"text","p":[626,187.3],"s":"1/3","c":"ax","size":12,"a":"start"},{"t":"plot","o":[80,250],"sx":90,"sy":200,"pts":[[4.0,0],[4.0,1.02]],"c":"force3","w":1.2,"dash":true},{"t":"text","p":[446.0,50.0],"s":"da qui le quantità restano costanti","c":"force3","size":11,"a":"start"}]}
---
Andamento delle quantità nell'esterificazione di una mole di acido acetico con una mole di etanolo. L'acido diminuisce e l'estere aumenta finché le quantità raggiungono valori costanti, un terzo e due terzi di mole. La scala dei tempi è arbitraria: dipende dalla temperatura e dal catalizzatore, mentre i valori finali dipendono soltanto dalla temperatura.
:::

L'esperimento si può fare anche al contrario: mescolando una mole di acetato di etile con una mole di acqua, sempre con il catalizzatore, l'estere si idrolizza parzialmente e la miscela arriva alla stessa composizione finale, due terzi di mole di estere e un terzo di mole di acido. La reazione procede quindi in entrambi i versi: è una **reazione reversibile**, e la doppia freccia $\rightleftharpoons$ lo indica. Lo stato finale, raggiungibile da una parte o dall'altra, è lo stato di **equilibrio**.

Le reazioni che sembrano completarsi, come la combustione del metano o la neutralizzazione di un acido forte con una base forte, sono anch'esse reversibili in linea di principio. La loro reazione inversa è però così sfavorita che all'equilibrio le quantità di reagenti residui sono troppo piccole per essere misurate. Il valore della costante di equilibrio, introdotta più avanti, distingue questi casi in modo quantitativo.

## L'equilibrio dinamico {#dinamico}

All'equilibrio la reazione continua ad avvenire in entrambi i versi. Il capitolo [Velocità di reazione](unit:chemistry-17) mostra che la velocità di una reazione dipende dalle concentrazioni dei reagenti. All'inizio dell'esterificazione sono presenti soltanto acido e alcol: la reazione diretta è veloce e quella inversa è assente, perché mancano estere e acqua. Man mano che i reagenti si consumano la reazione diretta rallenta; man mano che i prodotti si accumulano la reazione inversa accelera. Quando le due velocità diventano uguali, ogni molecola di estere che si forma è compensata da una che si idrolizza, e le quantità smettono di cambiare.

::: figura velocita
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[215,""],"sx":90,"sy":200,"xt":[],"yt":[[0.5,"0,5"],[1.0,"1,0"]]},{"t":"text","p":[40,30],"s":"velocità (unità arbitrarie)","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"tempo","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":90,"sy":200,"pts":[[0.0,1.0],[0.05,0.9070477],[0.1,0.8265718],[0.15,0.7565133],[0.2,0.6952142],[0.25,0.6413277],[0.3,0.5937518],[0.35,0.551578],[0.4,0.5140524],[0.45,0.4805456],[0.5,0.4505291],[0.55,0.4235567],[0.6,0.3992496],[0.65,0.377285],[0.7,0.3573864],[0.75,0.339316],[0.8,0.3228685],[0.85,0.3078659],[0.9,0.2941535],[0.95,0.281596],[1.0,0.2700752],[1.05,0.2594872],[1.1,0.2497404],[1.15,0.2407541],[1.2,0.2324564],[1.25,0.2247839],[1.3,0.21768],[1.35,0.211094],[1.4,0.2049808],[1.45,0.1992998],[1.5,0.1940148],[1.55,0.1890929],[1.6,0.1845046],[1.65,0.1802232],[1.7,0.1762245],[1.75,0.1724867],[1.8,0.1689898],[1.85,0.1657158],[1.9,0.1626481],[1.95,0.1597717],[2.0,0.1570728],[2.05,0.1545389],[2.1,0.1521583],[2.15,0.1499204],[2.2,0.1478156],[2.25,0.1458348],[2.3,0.1439699],[2.35,0.142213],[2.4,0.1405574],[2.45,0.1389963],[2.5,0.1375238],[2.55,0.1361343],[2.6,0.1348226],[2.65,0.1335839],[2.7,0.1324138],[2.75,0.131308],[2.8,0.1302627],[2.85,0.1292744],[2.9,0.1283395],[2.95,0.1274551],[3.0,0.1266181],[3.05,0.1258259],[3.1,0.1250758],[3.15,0.1243654],[3.2,0.1236925],[3.25,0.123055],[3.3,0.122451],[3.35,0.1218785],[3.4,0.1213357],[3.45,0.1208212],[3.5,0.1203333],[3.55,0.1198706],[3.6,0.1194317],[3.65,0.1190153],[3.7,0.1186203],[3.75,0.1182454],[3.8,0.1178897],[3.85,0.117552],[3.9,0.1172315],[3.95,0.1169273],[4.0,0.1166384],[4.05,0.1163641],[4.1,0.1161037],[4.15,0.1158564],[4.2,0.1156215],[4.25,0.1153983],[4.3,0.1151864],[4.35,0.1149851],[4.4,0.1147938],[4.45,0.1146121],[4.5,0.1144395],[4.55,0.1142754],[4.6,0.1141196],[4.65,0.1139714],[4.7,0.1138307],[4.75,0.1136969],[4.8,0.1135697],[4.85,0.1134489],[4.9,0.113334],[4.95,0.1132248],[5.0,0.1131211],[5.05,0.1130224],[5.1,0.1129286],[5.15,0.1128395],[5.2,0.1127547],[5.25,0.1126741],[5.3,0.1125975],[5.35,0.1125247],[5.4,0.1124554],[5.45,0.1123896],[5.5,0.112327],[5.55,0.1122674],[5.6,0.1122108],[5.65,0.112157],[5.7,0.1121058],[5.75,0.1120572],[5.8,0.1120109],[5.85,0.1119669],[5.9,0.111925],[5.95,0.1118852],[6.0,0.1118474]],"c":"force4","w":2.4},{"t":"plot","o":[80,250],"sx":90,"sy":200,"pts":[[0.0,0.0],[0.05,0.0005667],[0.1,0.002063],[0.15,0.0042395],[0.2,0.006906],[0.25,0.0099172],[0.3,0.0131615],[0.35,0.016553],[0.4,0.0200259],[0.45,0.0235294],[0.5,0.0270249],[0.55,0.030483],[0.6,0.0338814],[0.65,0.0372036],[0.7,0.0404376],[0.75,0.0435748],[0.8,0.0466095],[0.85,0.0495381],[0.9,0.0523588],[0.95,0.0550709],[1.0,0.057675],[1.05,0.0601724],[1.1,0.0625649],[1.15,0.064855],[1.2,0.0670454],[1.25,0.0691391],[1.3,0.0711391],[1.35,0.0730487],[1.4,0.0748712],[1.45,0.0766099],[1.5,0.0782681],[1.55,0.0798492],[1.6,0.0813562],[1.65,0.0827923],[1.7,0.0841606],[1.75,0.0854641],[1.8,0.0867056],[1.85,0.0878879],[1.9,0.0890137],[1.95,0.0900857],[2.0,0.0911061],[2.05,0.0920776],[2.1,0.0930022],[2.15,0.0938823],[2.2,0.0947199],[2.25,0.0955171],[2.3,0.0962757],[2.35,0.0969975],[2.4,0.0976844],[2.45,0.0983381],[2.5,0.09896],[2.55,0.0995517],[2.6,0.1001147],[2.65,0.1006503],[2.7,0.1011599],[2.75,0.1016448],[2.8,0.102106],[2.85,0.1025449],[2.9,0.1029623],[2.95,0.1033595],[3.0,0.1037373],[3.05,0.1040968],[3.1,0.1044387],[3.15,0.104764],[3.2,0.1050734],[3.25,0.1053677],[3.3,0.1056478],[3.35,0.1059141],[3.4,0.1061675],[3.45,0.1064086],[3.5,0.1066379],[3.55,0.106856],[3.6,0.1070635],[3.65,0.1072609],[3.7,0.1074486],[3.75,0.1076272],[3.8,0.1077971],[3.85,0.1079587],[3.9,0.1081124],[3.95,0.1082587],[4.0,0.1083978],[4.05,0.1085301],[4.1,0.108656],[4.15,0.1087757],[4.2,0.1088896],[4.25,0.1089979],[4.3,0.109101],[4.35,0.109199],[4.4,0.1092923],[4.45,0.109381],[4.5,0.1094653],[4.55,0.1095456],[4.6,0.109622],[4.65,0.1096946],[4.7,0.1097637],[4.75,0.1098294],[4.8,0.1098919],[4.85,0.1099514],[4.9,0.1100079],[4.95,0.1100617],[5.0,0.1101129],[5.05,0.1101616],[5.1,0.1102079],[5.15,0.1102519],[5.2,0.1102938],[5.25,0.1103337],[5.3,0.1103716],[5.35,0.1104077],[5.4,0.110442],[5.45,0.1104746],[5.5,0.1105057],[5.55,0.1105352],[5.6,0.1105633],[5.65,0.11059],[5.7,0.1106154],[5.75,0.1106396],[5.8,0.1106626],[5.85,0.1106845],[5.9,0.1107053],[5.95,0.1107251],[6.0,0.1107439]],"c":"force2","w":2.4},{"t":"text","p":[117.5,126.0],"s":"reazione diretta","c":"force4","size":12,"a":"start"},{"t":"text","p":[278.0,246],"s":"reazione inversa","c":"force2","size":12,"a":"start"},{"t":"text","p":[368.0,213.8],"s":"velocità uguali: equilibrio dinamico","c":"force3","size":12,"a":"start"}]}
---
Velocità della reazione diretta e della reazione inversa durante l'esterificazione della figura precedente. La prima diminuisce, la seconda cresce; quando diventano uguali le quantità restano costanti, anche se le due reazioni continuano ad avvenire.
:::

La natura dinamica dell'equilibrio si verifica con gli isotopi. Se a una miscela di esterificazione già all'equilibrio si aggiunge una piccola quantità di acqua in cui una parte degli atomi di ossigeno è l'isotopo pesante ossigeno $18$, dopo qualche tempo l'isotopo si ritrova anche nelle molecole di acido acetico, mentre le quantità complessive delle quattro sostanze restano invariate. Le molecole continuano a reagire nei due versi; soltanto il bilancio netto è nullo.

Un sistema all'equilibrio ha quattro caratteristiche:

1. le proprietà macroscopiche, come concentrazioni, pressione, colore, restano costanti nel tempo;
2. a livello molecolare le reazioni diretta e inversa continuano, con velocità uguali;
3. lo stesso stato si raggiunge partendo dai reagenti, dai prodotti o da qualunque miscela intermedia con la stessa composizione elementare complessiva;
4. il sistema deve essere chiuso: se un prodotto gassoso può sfuggire, come l'anidride carbonica della bottiglia aperta, l'equilibrio non si stabilisce.

Il termine «equilibrio» richiama l'immagine di una bilancia ferma. L'analogia più fedele è quella di una scala mobile percorsa contemporaneamente in salita e in discesa da persone diverse: se il numero di persone che salgono ogni minuto è uguale a quello delle persone che scendono, il numero di persone al piano superiore resta costante, anche se nessuna di loro sta ferma.

## La legge dell'azione di massa {#azione-massa}

Nel 1864 i norvegesi Cato Guldberg, matematico, e Peter Waage, chimico, proposero una relazione generale fra le concentrazioni all'equilibrio, che chiamarono **legge dell'azione di massa**. Per una reazione generica

$$a\,\mathrm A+b\,\mathrm B\rightleftharpoons c\,\mathrm C+d\,\mathrm D$$

il rapporto fra il prodotto delle concentrazioni dei prodotti e quello delle concentrazioni dei reagenti, ciascuna elevata al proprio coefficiente stechiometrico, assume all'equilibrio un valore costante, che dipende soltanto dalla reazione e dalla temperatura.

::: legge Costante di equilibrio
Per la reazione $a\,\mathrm A+b\,\mathrm B\rightleftharpoons c\,\mathrm C+d\,\mathrm D$, all'equilibrio e a temperatura fissata,
$$K_c=\frac{[\mathrm C]^c\,[\mathrm D]^d}{[\mathrm A]^a\,[\mathrm B]^b},$$
dove le parentesi quadre indicano le concentrazioni molari all'equilibrio.
:::

Per l'esterificazione, con le quantità della figura e un volume $V$ della miscela,

$$K_c=\frac{[\text{estere}][\text{acqua}]}{[\text{acido}][\text{alcol}]}=\frac{(2/3)^2/V^2}{(1/3)^2/V^2}=4.$$

Il volume si semplifica, perché la reazione ha lo stesso numero di molecole da entrambe le parti, e la costante si può calcolare direttamente con le quantità in moli. Il valore è lo stesso qualunque sia la miscela di partenza, come mostrano le composizioni di equilibrio di miscele diverse, calcolate con $K_c=4$ con il metodo del paragrafo sui calcoli di equilibrio.

| miscela iniziale (mol) | estere all'equilibrio (mol) | acido convertito |
|---|---|---|
| $1$ acido, $1$ alcol | $0{,}667$ | $66{,}7\%$ |
| $1$ estere, $1$ acqua | $0{,}667$ | (da destra) |
| $1$ acido, $3$ alcol | $0{,}903$ | $90{,}3\%$ |
| $1$ acido, $1$ alcol, $1$ acqua | $0{,}543$ | $54{,}3\%$ |

Le quantità all'equilibrio cambiano molto da una riga all'altra; il rapporto della legge dell'azione di massa resta lo stesso. La terza riga anticipa un risultato pratico importante: un eccesso di uno dei reagenti aumenta la conversione dell'altro, ed è il modo in cui si preparano gli esteri in laboratorio.

Per le reazioni che avvengono in un unico passaggio elementare la legge si ricava dalla cinetica. Se la reazione diretta $\mathrm A\to\mathrm B$ ha velocità $k_\mathrm d[\mathrm A]$ e la reazione inversa $\mathrm B\to\mathrm A$ ha velocità $k_\mathrm i[\mathrm B]$, all'equilibrio le due velocità sono uguali, $k_\mathrm d[\mathrm A]=k_\mathrm i[\mathrm B]$, e quindi

$$K_c=\frac{[\mathrm B]}{[\mathrm A]}=\frac{k_\mathrm d}{k_\mathrm i}.$$

Con $k_\mathrm d=0{,}30\un{s^{-1}}$ e $k_\mathrm i=0{,}10\un{s^{-1}}$ la costante vale $3$, e una soluzione che contiene inizialmente $0{,}40\un{M}$ di A raggiunge l'equilibrio con $[\mathrm B]=0{,}30\un{M}$ e $[\mathrm A]=0{,}10\un{M}$. Per una reazione in più passaggi il risultato complessivo è lo stesso, perché all'equilibrio ogni passaggio è a sua volta in equilibrio; la costante non dipende dal meccanismo, e la sua giustificazione generale viene dalla termodinamica, come si vedrà alla fine del capitolo.

## Scrivere la costante {#espressione}

L'espressione della costante si scrive dall'equazione chimica bilanciata, con poche regole.

- **I prodotti stanno al numeratore, i reagenti al denominatore**, ciascuno elevato al proprio coefficiente.
- **I solidi puri e i liquidi puri non compaiono.** La loro «concentrazione» è fissata dalla densità e non cambia durante la reazione; la si include nella costante. Il capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13) ha applicato questa regola al prodotto di solubilità, dal quale il sale solido è assente.
- **Il solvente non compare** nelle soluzioni diluite, perché la sua concentrazione resta praticamente quella del solvente puro. In acqua, $[\mathrm{H_2O}]$ vale circa $55{,}5\un{M}$ e cambia in modo trascurabile.
- **La costante si riferisce all'equazione scritta.** Se l'equazione cambia, cambia anche la costante, secondo le regole del paragrafo successivo.

Qualche esempio:

$$\begin{aligned}
\mathrm{N_2O_4(g)}\rightleftharpoons2\,\mathrm{NO_2(g)}&:\quad K_c=\frac{[\mathrm{NO_2}]^2}{[\mathrm{N_2O_4}]},\\
\mathrm{CaCO_3(s)}\rightleftharpoons\mathrm{CaO(s)}+\mathrm{CO_2(g)}&:\quad K_c=[\mathrm{CO_2}],\\
\mathrm{NH_3(aq)}+\mathrm{H_2O(l)}\rightleftharpoons\mathrm{NH_4^+(aq)}+\mathrm{OH^-(aq)}&:\quad K_c=\frac{[\mathrm{NH_4^+}][\mathrm{OH^-}]}{[\mathrm{NH_3}]}.
\end{aligned}$$

Nell'esterificazione l'acqua compare nell'espressione, perché è un prodotto in una miscela di liquidi organici e la sua concentrazione cambia durante la reazione; in una soluzione acquosa diluita, dove l'acqua è il solvente, la si omette.

::: approfondimento Attività e costanti senza unità
Le espressioni scritte con le concentrazioni hanno in generale unità di misura, che dipendono dai coefficienti: $K_c$ della dissociazione del tetrossido di diazoto ha le unità di una concentrazione. La termodinamica definisce invece una costante adimensionale, scritta con le **attività**: per un soluto ideale l'attività è il rapporto fra la concentrazione e la concentrazione standard, $c^\circ=1\un{mol/L}$; per un gas ideale è il rapporto fra la pressione parziale e la pressione standard, $p^\circ=1\un{bar}$; per un solido o un liquido puro vale $1$. Con queste convenzioni i valori numerici coincidono con quelli calcolati con concentrazioni in $\mathrm{mol/L}$ e pressioni in bar, e la regola che esclude solidi e liquidi puri diventa una conseguenza della definizione. Nelle soluzioni concentrate, dove le interazioni fra gli ioni sono importanti, l'attività differisce dalla concentrazione e le costanti scritte con le concentrazioni variano con la composizione.
:::

## Combinare le costanti {#relazioni}

Poiché la costante si riferisce a un'equazione precisa, le operazioni sulle equazioni si traducono in operazioni sulle costanti.

- **Invertendo l'equazione** la costante diventa il reciproco: $K'=1/K$.
- **Moltiplicando i coefficienti per un numero $n$** la costante si eleva alla potenza $n$: $K'=K^n$. Dimezzando i coefficienti si prende la radice quadrata.
- **Sommando due equazioni** le costanti si moltiplicano: $K_3=K_1K_2$.

Le tre regole seguono dalla struttura dell'espressione. Per la terza, il prodotto delle due espressioni contiene le concentrazioni delle sostanze che compaiono in entrambe le reazioni una volta al numeratore e una volta al denominatore, e queste si semplificano.

::: esempio Ossidi di azoto a temperatura ambiente
A $25\,^\circ\mathrm C$ la reazione $\mathrm{N_2(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{NO(g)}$ ha costante $K_1\simeq4{,}7\times10^{-31}$, e la reazione $2\,\mathrm{NO(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{NO_2(g)}$ ha costante $K_2\simeq2{,}2\times10^{12}$, entrambe in termini di pressioni parziali in bar. Sommando le due equazioni il monossido di azoto si semplifica e si ottiene
$$\mathrm{N_2(g)}+2\,\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{NO_2(g)},$$
con costante $K_3=K_1K_2\simeq1{,}1\times10^{-18}$. La costante della reazione inversa, la decomposizione del diossido di azoto negli elementi, è $1/K_3\simeq10^{18}$; quella della formazione di una sola mole di diossido, con i coefficienti dimezzati, è $\sqrt{K_3}\simeq1{,}0\times10^{-9}$.
:::

## Costanti in pressione {#kp}

Per le reazioni fra gas è spesso più comodo usare le pressioni parziali, misurate in bar, al posto delle concentrazioni. Si ottiene la costante $K_p$:

$$K_p=\frac{p_\mathrm C^{\,c}\,p_\mathrm D^{\,d}}{p_\mathrm A^{\,a}\,p_\mathrm B^{\,b}}.$$

Per un gas ideale la pressione parziale e la concentrazione sono proporzionali, $p_i=(n_i/V)RT=[i]\,RT$. Sostituendo nell'espressione di $K_p$ si trova

$$K_p=K_c\,(RT)^{\Delta n},$$

dove $\Delta n$ è la differenza fra la somma dei coefficienti dei prodotti gassosi e quella dei reagenti gassosi, e $R=0{,}08314\un{L\,bar/(mol\,K)}$ quando le concentrazioni sono in $\mathrm{mol/L}$ e le pressioni in bar. Quando il numero di moli di gas resta lo stesso, $\Delta n=0$ e le due costanti coincidono.

Per la dissociazione del tetrossido di diazoto, $\mathrm{N_2O_4(g)}\rightleftharpoons2\,\mathrm{NO_2(g)}$, a $25\,^\circ\mathrm C$ si ha $K_p\simeq0{,}148$. Qui $\Delta n=2-1=1$ e il prodotto $RT$ vale $0{,}08314\times298{,}15=24{,}79\un{L\,bar/mol}$, quindi

$$K_c=\frac{K_p}{RT}=\frac{0{,}148}{24{,}79}\simeq5{,}99\times10^{-3}.$$

Le due costanti descrivono lo stesso equilibrio con unità di misura diverse; i loro valori numerici differiscono perché un gas a $1\un{bar}$ e $25\,^\circ\mathrm C$ ha una concentrazione di circa $0{,}040\un{mol/L}$.

## Quanto vale una costante {#grandezza}

Il valore numerico della costante dice fin dove procede una reazione. Una costante molto grande significa che all'equilibrio prevalgono di gran lunga i prodotti, e la reazione si può considerare completa; una costante molto piccola significa che si formano soltanto tracce di prodotti; valori intermedi, fra circa $10^{-3}$ e $10^3$, corrispondono a miscele in cui reagenti e prodotti sono presenti in quantità confrontabili. L'elenco raccoglie alcune costanti a $25\,^\circ\mathrm C$, calcolate dalle energie di Gibbs standard di formazione con il metodo del paragrafo sull'energia di Gibbs.

- formazione dell'acqua liquida, $2\,\mathrm{H_2(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{H_2O(l)}$: $K\sim10^{83}$, all'equilibrio soltanto prodotti;
- dissociazione del tetrossido di diazoto, $\mathrm{N_2O_4(g)}\rightleftharpoons2\,\mathrm{NO_2(g)}$: $K=0{,}148$, una miscela;
- decomposizione del calcare, $\mathrm{CaCO_3(s)}\rightleftharpoons\mathrm{CaO(s)}+\mathrm{CO_2(g)}$: $K=1{,}3\times10^{-23}$, soltanto reagenti;
- formazione del monossido di azoto, $\mathrm{N_2(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{NO(g)}$: $K=4{,}7\times10^{-31}$, soltanto reagenti.

La costante dice fin dove arriva una reazione, e tace sul tempo necessario per arrivarci. Una miscela di idrogeno e ossigeno, con una costante di equilibrio di $10^{83}$, resta inalterata per anni a temperatura ambiente, perché la barriera di attivazione è alta; una scintilla basta a farla esplodere. L'azoto e l'ossigeno dell'aria, all'opposto, coesistono senza formare monossido di azoto perché a temperatura ambiente l'equilibrio stesso lo vieta. Cinetica ed equilibrio rispondono a domande diverse, come il capitolo [Temperatura e attivazione](unit:chemistry-18) ha mostrato per i catalizzatori, che accelerano il raggiungimento dell'equilibrio senza spostarlo.

## Il quoziente di reazione {#quoziente}

Per sapere se una miscela è all'equilibrio, e in caso contrario in quale verso evolverà, si calcola con le concentrazioni del momento la stessa espressione della costante. Il risultato si chiama **quoziente di reazione** e si indica con $Q$:

$$Q_c=\frac{[\mathrm C]^c\,[\mathrm D]^d}{[\mathrm A]^a\,[\mathrm B]^b}\quad\text{con concentrazioni qualsiasi}.$$

All'equilibrio, e soltanto all'equilibrio, $Q=K$. Il confronto fra i due numeri indica il verso della trasformazione netta.

::: legge Verso di una reazione
- Se $Q<K$ i prodotti sono troppo pochi rispetto all'equilibrio: la reazione procede verso destra, formando prodotti, finché $Q$ cresce fino a $K$.
- Se $Q>K$ i prodotti sono troppi: la reazione procede verso sinistra, finché $Q$ scende fino a $K$.
- Se $Q=K$ il sistema è all'equilibrio e la composizione non cambia.
:::

::: figura quoziente
{"w":660,"h":290,"items":[{"t":"arrow","p":[60,120,620,120],"c":"ax","w":1.6,"head":9},{"t":"text","p":[620,146],"s":"Q","c":"ax","size":14,"a":"end"},{"t":"line","p":[110,114,110,126],"c":"ax","w":1.4},{"t":"text","p":[110,146],"s":"10⁻⁴","c":"muted","size":12},{"t":"line","p":[220,114,220,126],"c":"ax","w":1.4},{"t":"text","p":[220,146],"s":"10⁻²","c":"muted","size":12},{"t":"line","p":[330,114,330,126],"c":"ax","w":1.4},{"t":"text","p":[330,146],"s":"1","c":"muted","size":12},{"t":"line","p":[440,114,440,126],"c":"ax","w":1.4},{"t":"text","p":[440,146],"s":"10²","c":"muted","size":12},{"t":"line","p":[550,114,550,126],"c":"ax","w":1.4},{"t":"text","p":[550,146],"s":"10⁴","c":"muted","size":12},{"t":"line","p":[385,80,385,160],"c":"force3","w":2.4},{"t":"text","p":[385,70],"s":"K","c":"force3","size":15},{"t":"arrow","p":[365,200,235,200],"c":"force2","w":2.2,"head":9},{"t":"text","p":[295,190],"s":"Q < K","c":"force2","size":13},{"t":"text","p":[295,226],"s":"la reazione procede","c":"ax","size":12},{"t":"text","p":[295,244],"s":"verso i prodotti","c":"ax","size":12},{"t":"arrow","p":[405,200,535,200],"c":"force4","w":2.2,"head":9},{"t":"text","p":[475,190],"s":"Q > K","c":"force4","size":13},{"t":"text","p":[475,226],"s":"la reazione procede","c":"ax","size":12},{"t":"text","p":[475,244],"s":"verso i reagenti","c":"ax","size":12},{"t":"text","p":[385,276],"s":"Q = K: equilibrio, nessuna variazione netta","c":"force3","size":12}]}
---
Il quoziente di reazione $Q$ su una scala logaritmica, confrontato con la costante $K$. A sinistra di $K$ la reazione forma prodotti, a destra li consuma; in entrambi i casi $Q$ si muove verso $K$.
:::

Una miscela per l'esterificazione contiene $1{,}0\un{mol}$ di acido, $1{,}0\un{mol}$ di alcol, $1{,}5\un{mol}$ di estere e $1{,}5\un{mol}$ di acqua. Il quoziente vale $1{,}5^2/1{,}0^2=2{,}25$, minore di $4$: si formerà altro estere. Una miscela con $0{,}2\un{mol}$ di acido e di alcol e $1{,}0\un{mol}$ di estere e di acqua ha invece $Q=25$, maggiore di $4$: una parte dell'estere si idrolizzerà.

Il quoziente spiega anche la bottiglia aperta. Finché è chiusa, il gas sopra il liquido e l'anidride carbonica disciolta sono in equilibrio. Quando la si apre, la pressione dell'anidride carbonica sopra il liquido scende a quella dell'aria, il quoziente dell'equilibrio di solubilità diventa molto più grande della costante, e il gas lascia la soluzione.

## Calcoli di equilibrio {#calcoli}

Il problema tipico chiede la composizione all'equilibrio a partire da una miscela iniziale nota e dalla costante. Il metodo più ordinato usa una tabella con tre righe, che riportano le concentrazioni (o le quantità, o le pressioni) **iniziali**, la loro **variazione** e i valori **all'equilibrio**. Le variazioni sono tutte legate dalla stechiometria a un'unica incognita, che si indica con $x$.

::: metodo Tabella delle quantità
1. Scrivere l'equazione bilanciata e l'espressione della costante.
2. Se non è evidente, calcolare $Q$ per stabilire il verso della reazione.
3. Compilare la tabella: riga iniziale, riga delle variazioni espresse con $x$ e i coefficienti, riga di equilibrio come somma delle due.
4. Sostituire i valori di equilibrio nell'espressione della costante e risolvere per $x$.
5. Calcolare le concentrazioni di equilibrio e controllare che, sostituite nell'espressione, restituiscano la costante.
:::

::: esempio La dissociazione del tetrossido di diazoto
In un recipiente da $1{,}00\un{L}$ a $25\,^\circ\mathrm C$ si introducono $0{,}0400\un{mol}$ di tetrossido di diazoto. Calcolare le concentrazioni all'equilibrio, con $K_c=5{,}99\times10^{-3}$.

La tabella è

| | $[\mathrm{N_2O_4}]$ (M) | $[\mathrm{NO_2}]$ (M) |
|---|---|---|
| iniziale | $0{,}0400$ | $0$ |
| variazione | $-x$ | $+2x$ |
| equilibrio | $0{,}0400-x$ | $2x$ |

e l'equazione da risolvere è
$$\frac{(2x)^2}{0{,}0400-x}=5{,}99\times10^{-3}.$$
Riordinando si ottiene l'equazione di secondo grado
$$4x^2+5{,}99\times10^{-3}\,x-2{,}40\times10^{-4}=0,$$
che ha come unica soluzione positiva $x=7{,}02\times10^{-3}$. All'equilibrio $[\mathrm{NO_2}]=0{,}0140\un{M}$ e $[\mathrm{N_2O_4}]=0{,}0330\un{M}$: si è dissociato il $17{,}6\%$ del tetrossido. Il controllo, $0{,}0140^2/0{,}0330=5{,}9\times10^{-3}$, restituisce la costante entro l'arrotondamento.
:::

Quando la costante è molto piccola la reazione procede poco, e la variazione $x$ è trascurabile rispetto alle concentrazioni iniziali dei reagenti. L'approssimazione evita l'equazione di secondo grado; va sempre verificata alla fine, e la si accetta quando $x$ risulta inferiore a circa il $5\%$ della concentrazione a cui è stato sottratto.

::: esempio Monossido di azoto in un motore
A $2000\un{K}$, una temperatura raggiunta nei cilindri di un motore e nei fulmini, la reazione $\mathrm{N_2}+\mathrm{O_2}\rightleftharpoons2\,\mathrm{NO}$ ha una costante stimata $K_p\simeq3{,}9\times10^{-4}$. Quale frazione di monossido di azoto si forma in aria, con $p_{\mathrm{N_2}}=0{,}78\un{bar}$ e $p_{\mathrm{O_2}}=0{,}21\un{bar}$?

Se le pressioni dei reagenti diminuiscono di $x$, quella del monossido di azoto cresce di $2x$, e
$$\frac{(2x)^2}{(0{,}78-x)(0{,}21-x)}=3{,}9\times10^{-4}.$$
Supponendo $x$ piccolo rispetto a $0{,}21$, il denominatore vale circa $0{,}78\times0{,}21=0{,}164$, e
$$4x^2\simeq3{,}9\times10^{-4}\times0{,}164,\qquad x\simeq4{,}0\times10^{-3}\un{bar}.$$
La pressione del monossido di azoto è $2x\simeq8\times10^{-3}\un{bar}$, cioè circa lo $0{,}8\%$ della miscela; $x$ è il $1{,}9\%$ di $0{,}21$, e l'approssimazione è accettabile. A temperatura ambiente, con la costante dell'elenco precedente, la stessa aria conterrebbe all'equilibrio una pressione di monossido di azoto di circa $3\times10^{-16}\un{bar}$. I gas di scarico si raffreddano troppo in fretta perché il monossido formato nei cilindri torni a decomporsi, ed è uno dei compiti della marmitta catalitica.
:::

## Energia di Gibbs ed equilibrio {#gibbs}

Il capitolo [Termochimica e calorimetria](unit:chemistry-16) ha introdotto l'energia di Gibbs e il criterio di spontaneità: a temperatura e pressione costanti una trasformazione avviene spontaneamente se $\Delta G<0$. Il valore di $\Delta G$ di una reazione dipende però dalla composizione della miscela. L'energia di Gibbs standard $\Delta G^\circ$ si riferisce alla trasformazione completa dei reagenti nei loro stati standard nei prodotti nei loro stati standard; in una miscela qualsiasi l'energia di Gibbs di reazione vale

$$\Delta G=\Delta G^\circ+RT\ln Q,$$

dove $Q$ è il quoziente di reazione scritto con le attività, cioè con le concentrazioni in $\mathrm{mol/L}$ e le pressioni in bar. Quando la reazione procede, $Q$ cambia, e con esso $\Delta G$. La reazione si ferma quando $\Delta G=0$: in quel momento $Q=K$, e quindi

::: legge Energia di Gibbs standard e costante di equilibrio
$$\Delta G^\circ=-RT\ln K,\qquad K=e^{-\Delta G^\circ/(RT)}.$$
:::

La relazione collega una grandezza tabulata, calcolabile dalle energie di Gibbs standard di formazione, al numero che descrive la composizione all'equilibrio. Per la dissociazione del tetrossido di diazoto le tabelle danno $\Delta_\mathrm fG^\circ=51{,}31\un{kJ/mol}$ per il diossido e $97{,}89\un{kJ/mol}$ per il tetrossido, quindi

$$\Delta G^\circ=2\times51{,}31-97{,}89=4{,}73\un{kJ},$$

$$K=\exp\!\left(-\frac{4730}{8{,}314\times298{,}15}\right)=e^{-1{,}908}\simeq0{,}148.$$

È il valore di $K_p$ usato nei paragrafi precedenti. La costante è minore di $1$ perché $\Delta G^\circ$ è positivo; la dissociazione avviene comunque in parte, perché in una miscela di tetrossido quasi puro il termine $RT\ln Q$ è molto negativo e rende negativo $\Delta G$.

::: figura gibbs
{"w":680,"h":306,"items":[{"t":"axes","o":[70,250],"x":[510,""],"y":[224,""],"sx":480,"sy":26,"xt":[[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"],[1.0,"1,0"]],"yt":[[1,"−2"],[3,"0"],[5,"2"],[7,"4"]]},{"t":"text","p":[86,26],"s":"G − G°(N₂O₄) (kJ)","c":"ax","size":12,"a":"start"},{"t":"text","p":[600,292],"s":"avanzamento ξ (mol)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[70,250],"sx":480,"sy":26,"pts":[[0.0,3.0],[0.0025,2.9337587],[0.005,2.8847003],[0.0075,2.8421277],[0.01,2.8037669],[0.0125,2.7685383],[0.015,2.7358059],[0.0175,2.7051494],[0.02,2.6762701],[0.0225,2.6489449],[0.025,2.6230005],[0.0275,2.5982984],[0.03,2.5747254],[0.0325,2.5521875],[0.035,2.5306051],[0.0375,2.5099097],[0.04,2.4900425],[0.0425,2.4709517],[0.045,2.4525918],[0.0475,2.4349222],[0.05,2.4179067],[0.0525,2.4015128],[0.055,2.385711],[0.0575,2.3704744],[0.06,2.3557788],[0.0625,2.3416016],[0.065,2.3279222],[0.0675,2.3147218],[0.07,2.3019826],[0.0725,2.2896883],[0.075,2.2778238],[0.0775,2.2663749],[0.08,2.2553283],[0.0825,2.2446715],[0.085,2.234393],[0.0875,2.2244818],[0.09,2.2149275],[0.0925,2.2057203],[0.095,2.1968511],[0.0975,2.1883111],[0.1,2.1800919],[0.1025,2.1721858],[0.105,2.1645852],[0.1075,2.1572831],[0.11,2.1502726],[0.1125,2.1435473],[0.115,2.137101],[0.1175,2.1309278],[0.12,2.125022],[0.1225,2.1193782],[0.125,2.1139912],[0.1275,2.1088561],[0.13,2.1039681],[0.1325,2.0993225],[0.135,2.094915],[0.1375,2.0907413],[0.14,2.0867973],[0.1425,2.0830791],[0.145,2.0795828],[0.1475,2.0763049],[0.15,2.0732417],[0.1525,2.0703899],[0.155,2.0677461],[0.1575,2.0653071],[0.16,2.0630699],[0.1625,2.0610315],[0.165,2.0591889],[0.1675,2.0575394],[0.17,2.0560803],[0.1725,2.0548088],[0.175,2.0537225],[0.1775,2.0528189],[0.18,2.0520955],[0.1825,2.0515501],[0.185,2.0511802],[0.1875,2.0509839],[0.19,2.0509588],[0.1925,2.0511029],[0.195,2.0514142],[0.1975,2.0518907],[0.2,2.0525305],[0.2025,2.0533316],[0.205,2.0542923],[0.2075,2.0554109],[0.21,2.0566854],[0.2125,2.0581144],[0.215,2.059696],[0.2175,2.0614288],[0.22,2.0633111],[0.2225,2.0653414],[0.225,2.0675183],[0.2275,2.0698402],[0.23,2.0723058],[0.2325,2.0749136],[0.235,2.0776623],[0.2375,2.0805506],[0.24,2.0835772],[0.2425,2.0867408],[0.245,2.0900401],[0.2475,2.093474],[0.25,2.0970412],[0.2525,2.1007407],[0.255,2.1045713],[0.2575,2.1085318],[0.26,2.1126212],[0.2625,2.1168385],[0.265,2.1211825],[0.2675,2.1256523],[0.27,2.1302468],[0.2725,2.1349651],[0.275,2.1398063],[0.2775,2.1447694],[0.28,2.1498535],[0.2825,2.1550576],[0.285,2.160381],[0.2875,2.1658227],[0.29,2.1713818],[0.2925,2.1770577],[0.295,2.1828494],[0.2975,2.1887562],[0.3,2.1947772],[0.3025,2.2009117],[0.305,2.207159],[0.3075,2.2135183],[0.31,2.2199889],[0.3125,2.2265701],[0.315,2.2332612],[0.3175,2.2400615],[0.32,2.2469703],[0.3225,2.253987],[0.325,2.2611109],[0.3275,2.2683415],[0.33,2.275678],[0.3325,2.2831199],[0.335,2.2906666],[0.3375,2.2983175],[0.34,2.306072],[0.3425,2.3139296],[0.345,2.3218896],[0.3475,2.3299516],[0.35,2.3381151],[0.3525,2.3463794],[0.355,2.3547441],[0.3575,2.3632086],[0.36,2.3717726],[0.3625,2.3804354],[0.365,2.3891967],[0.3675,2.3980559],[0.37,2.4070126],[0.3725,2.4160663],[0.375,2.4252166],[0.3775,2.4344631],[0.38,2.4438052],[0.3825,2.4532427],[0.385,2.4627751],[0.3875,2.472402],[0.39,2.482123],[0.3925,2.4919377],[0.395,2.5018457],[0.3975,2.5118467],[0.4,2.5219402],[0.4025,2.532126],[0.405,2.5424036],[0.4075,2.5527728],[0.41,2.5632331],[0.4125,2.5737843],[0.415,2.5844261],[0.4175,2.595158],[0.42,2.6059798],[0.4225,2.6168912],[0.425,2.6278919],[0.4275,2.6389815],[0.43,2.6501599],[0.4325,2.6614267],[0.435,2.6727816],[0.4375,2.6842243],[0.44,2.6957547],[0.4425,2.7073723],[0.445,2.7190771],[0.4475,2.7308687],[0.45,2.7427469],[0.4525,2.7547114],[0.455,2.766762],[0.4575,2.7788985],[0.46,2.7911207],[0.4625,2.8034283],[0.465,2.8158212],[0.4675,2.828299],[0.47,2.8408617],[0.4725,2.853509],[0.475,2.8662408],[0.4775,2.8790568],[0.48,2.8919568],[0.4825,2.9049408],[0.485,2.9180084],[0.4875,2.9311596],[0.49,2.9443942],[0.4925,2.9577119],[0.495,2.9711128],[0.4975,2.9845966],[0.5,2.9981631],[0.5025,3.0118123],[0.505,3.0255439],[0.5075,3.039358],[0.51,3.0532542],[0.5125,3.0672326],[0.515,3.081293],[0.5175,3.0954353],[0.52,3.1096594],[0.5225,3.1239651],[0.525,3.1383524],[0.5275,3.1528212],[0.53,3.1673714],[0.5325,3.1820029],[0.535,3.1967156],[0.5375,3.2115095],[0.54,3.2263844],[0.5425,3.2413403],[0.545,3.2563772],[0.5475,3.271495],[0.55,3.2866935],[0.5525,3.3019729],[0.555,3.317333],[0.5575,3.3327737],[0.56,3.3482952],[0.5625,3.3638972],[0.565,3.3795798],[0.5675,3.395343],[0.57,3.4111867],[0.5725,3.427111],[0.575,3.4431157],[0.5775,3.459201],[0.58,3.4753668],[0.5825,3.4916131],[0.585,3.5079399],[0.5875,3.5243472],[0.59,3.5408351],[0.5925,3.5574035],[0.595,3.5740526],[0.5975,3.5907822],[0.6,3.6075925],[0.6025,3.6244836],[0.605,3.6414553],[0.6075,3.6585078],[0.61,3.6756412],[0.6125,3.6928555],[0.615,3.7101507],[0.6175,3.727527],[0.62,3.7449844],[0.6225,3.762523],[0.625,3.7801429],[0.6275,3.7978441],[0.63,3.8156267],[0.6325,3.833491],[0.635,3.8514369],[0.6375,3.8694645],[0.64,3.887574],[0.6425,3.9057656],[0.645,3.9240393],[0.6475,3.9423952],[0.65,3.9608336],[0.6525,3.9793545],[0.655,3.9979581],[0.6575,4.0166446],[0.66,4.035414],[0.6625,4.0542667],[0.665,4.0732027],[0.6675,4.0922223],[0.67,4.1113256],[0.6725,4.1305128],[0.675,4.1497842],[0.6775,4.1691398],[0.68,4.1885801],[0.6825,4.208105],[0.685,4.227715],[0.6875,4.2474102],[0.69,4.2671909],[0.6925,4.2870573],[0.695,4.3070096],[0.6975,4.3270482],[0.7,4.3471734],[0.7025,4.3673853],[0.705,4.3876843],[0.7075,4.4080707],[0.71,4.4285448],[0.7125,4.4491069],[0.715,4.4697574],[0.7175,4.4904965],[0.72,4.5113246],[0.7225,4.5322421],[0.725,4.5532493],[0.7275,4.5743466],[0.73,4.5955344],[0.7325,4.6168131],[0.735,4.638183],[0.7375,4.6596447],[0.74,4.6811985],[0.7425,4.7028448],[0.745,4.7245841],[0.7475,4.746417],[0.75,4.7683437],[0.7525,4.7903649],[0.755,4.8124811],[0.7575,4.8346927],[0.76,4.8570003],[0.7625,4.8794044],[0.765,4.9019056],[0.7675,4.9245044],[0.77,4.9472015],[0.7725,4.9699975],[0.775,4.9928929],[0.7775,5.0158884],[0.78,5.0389848],[0.7825,5.0621825],[0.785,5.0854824],[0.7875,5.1088852],[0.79,5.1323916],[0.7925,5.1560023],[0.795,5.1797181],[0.7975,5.2035399],[0.8,5.2274684],[0.8025,5.2515045],[0.805,5.2756491],[0.8075,5.299903],[0.81,5.3242673],[0.8125,5.3487427],[0.815,5.3733304],[0.8175,5.3980314],[0.82,5.4228466],[0.8225,5.4477772],[0.825,5.4728242],[0.8275,5.4979888],[0.83,5.5232722],[0.8325,5.5486757],[0.835,5.5742004],[0.8375,5.5998477],[0.84,5.6256188],[0.8425,5.6515153],[0.845,5.6775386],[0.8475,5.7036901],[0.85,5.7299713],[0.8525,5.756384],[0.855,5.7829296],[0.8575,5.80961],[0.86,5.836427],[0.8625,5.8633823],[0.865,5.8904779],[0.8675,5.9177158],[0.87,5.945098],[0.8725,5.9726268],[0.875,6.0003044],[0.8775,6.028133],[0.88,6.0561152],[0.8825,6.0842535],[0.885,6.1125505],[0.8875,6.1410091],[0.89,6.1696321],[0.8925,6.1984226],[0.895,6.2273838],[0.8975,6.2565189],[0.9,6.2858317],[0.9025,6.3153256],[0.905,6.3450046],[0.9075,6.3748729],[0.91,6.4049347],[0.9125,6.4351946],[0.915,6.4656575],[0.9175,6.4963285],[0.92,6.5272129],[0.9225,6.5583167],[0.925,6.589646],[0.9275,6.6212073],[0.93,6.6530078],[0.9325,6.6850549],[0.935,6.7173568],[0.9375,6.7499223],[0.94,6.7827608],[0.9425,6.8158825],[0.945,6.8492988],[0.9475,6.8830216],[0.95,6.9170644],[0.9525,6.9514419],[0.955,6.9861703],[0.9575,7.0212677],[0.96,7.0567543],[0.9625,7.0926529],[0.965,7.1289892],[0.9675,7.1657928],[0.97,7.2030978],[0.9725,7.2409439],[0.975,7.2793781],[0.9775,7.3184571],[0.98,7.35825],[0.9825,7.3988434],[0.985,7.4403489],[0.9875,7.4829157],[0.99,7.5267541],[0.9925,7.5721818],[0.995,7.6197389],[0.9975,7.6705621],[1.0,7.73]],"c":"force2","w":2.6},{"t":"circle","p":[161.2,196.7,5],"c":"force4"},{"t":"text","p":[171.2,214.7],"s":"equilibrio: ξ ≈ 0,19","c":"force4","size":12,"a":"start"},{"t":"circle","p":[70,172,4],"c":"force3"},{"t":"circle","p":[550,49.0,4],"c":"force3"},{"t":"text","p":[542,39.0],"s":"2 NO₂ puro","c":"ax","size":11,"a":"end"},{"t":"text","p":[78,162],"s":"N₂O₄ puro","c":"ax","size":11,"a":"start"},{"t":"plot","o":[70,250],"sx":480,"sy":26,"pts":[[1.04,3],[1.04,7.73]],"c":"force","w":1.6},{"t":"text","p":[575.2,113.6],"s":"ΔG° = 4,73","c":"force","size":12,"a":"start"},{"t":"plot","o":[70,250],"sx":480,"sy":26,"pts":[[0,3],[1.04,3]],"c":"muted","w":1,"dash":true}]}
---
Energia di Gibbs di una miscela di tetrossido e diossido di azoto a $25\,^\circ\mathrm C$ e pressione totale di $1\un{bar}$, in funzione dell'avanzamento $\xi$ della dissociazione di una mole di tetrossido. Gli estremi sono le sostanze pure, che differiscono di $\Delta G^\circ=4{,}73\un{kJ}$; il mescolamento abbassa l'energia di Gibbs, e il minimo, a $\xi\simeq0{,}19$, è la composizione di equilibrio.
:::

La figura chiarisce il significato dell'equilibrio. L'energia di Gibbs della miscela ha un minimo a una composizione intermedia: partendo dal tetrossido puro la reazione scende verso il minimo, partendo dal diossido puro risale la reazione inversa scendendo anch'essa verso il minimo. La pendenza della curva in un punto è proprio $\Delta G$ della reazione per quella composizione: negativa a sinistra del minimo, positiva a destra, nulla al minimo. La miscela di equilibrio, con il $18{,}9\%$ del tetrossido dissociato, ha un'energia di Gibbs di circa $0{,}95\un{kJ}$ più bassa di quella del tetrossido puro.

::: esempio Da che parte va una miscela
Una miscela di tetrossido e diossido di azoto a $25\,^\circ\mathrm C$ ha $p_{\mathrm{NO_2}}=0{,}10\un{bar}$ e $p_{\mathrm{N_2O_4}}=0{,}90\un{bar}$. Il quoziente è $Q=0{,}10^2/0{,}90=0{,}0111$, e
$$\Delta G=4{,}73\un{kJ}+(2{,}479\un{kJ})\ln0{,}0111=4{,}73-11{,}15\simeq-6{,}42\un{kJ}.$$
$\Delta G$ è negativo: il tetrossido continuerà a dissociarsi. Lo stesso risultato segue dal confronto $Q=0{,}0111<K=0{,}148$.
:::

La relazione fra $\Delta G^\circ$ e $K$ è logaritmica. A $25\,^\circ\mathrm C$ il prodotto $RT\ln10$ vale $5{,}71\un{kJ/mol}$: ogni $5{,}71\un{kJ/mol}$ di $\Delta G^\circ$ corrispondono a un fattore dieci nella costante. Una reazione con $\Delta G^\circ=-20\un{kJ/mol}$ ha $K\simeq3{,}2\times10^3$; con $-40\un{kJ/mol}$, $K\simeq1\times10^7$; con $+40\un{kJ/mol}$, $K\simeq1\times10^{-7}$. Bastano poche decine di kilojoule per passare da una reazione praticamente completa a una che non avviene.

::: figura logk
{"w":660,"h":300,"items":[{"t":"line","p":[66,150,620,150],"c":"ax","w":1.4},{"t":"arrow","p":[330,282,330,20],"c":"ax","w":1.6,"head":9},{"t":"text","p":[338,28],"s":"log₁₀ K","c":"ax","size":12,"a":"start"},{"t":"text","p":[618,138],"s":"ΔG° (kJ/mol)","c":"ax","size":12,"a":"end"},{"t":"line","p":[66.0,146,66.0,154],"c":"ax","w":1.2},{"t":"text","p":[66.0,170],"s":"−60","c":"muted","size":11},{"t":"line","p":[154.0,146,154.0,154],"c":"ax","w":1.2},{"t":"text","p":[154.0,170],"s":"−40","c":"muted","size":11},{"t":"line","p":[242.0,146,242.0,154],"c":"ax","w":1.2},{"t":"text","p":[242.0,170],"s":"−20","c":"muted","size":11},{"t":"line","p":[418.0,146,418.0,154],"c":"ax","w":1.2},{"t":"text","p":[418.0,170],"s":"20","c":"muted","size":11},{"t":"line","p":[506.0,146,506.0,154],"c":"ax","w":1.2},{"t":"text","p":[506.0,170],"s":"40","c":"muted","size":11},{"t":"line","p":[594.0,146,594.0,154],"c":"ax","w":1.2},{"t":"text","p":[594.0,170],"s":"60","c":"muted","size":11},{"t":"line","p":[326,215.0,334,215.0],"c":"ax","w":1.2},{"t":"text","p":[320,219.0],"s":"−10","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,182.5,334,182.5],"c":"ax","w":1.2},{"t":"text","p":[320,186.5],"s":"−5","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,117.5,334,117.5],"c":"ax","w":1.2},{"t":"text","p":[320,121.5],"s":"5","c":"muted","size":11,"a":"end"},{"t":"line","p":[326,85.0,334,85.0],"c":"ax","w":1.2},{"t":"text","p":[320,89.0],"s":"10","c":"muted","size":11,"a":"end"},{"t":"plot","o":[330,150],"sx":4.4,"sy":6.5,"pts":[[-60,10.5115452],[60,-10.5115452]],"c":"force2","w":2.6},{"t":"text","p":[164.0,98.4],"s":"prodotti favoriti","c":"force3","size":12,"a":"start"},{"t":"text","p":[462.0,229.9],"s":"reagenti favoriti","c":"force4","size":12,"a":"start"},{"t":"text","p":[79.2,189.0],"s":"ogni 5,71 kJ/mol: un fattore 10 in K","c":"muted","size":11,"a":"start"}]}
---
Logaritmo decimale della costante di equilibrio in funzione dell'energia di Gibbs standard di reazione, a $25\,^\circ\mathrm C$. La retta ha pendenza $-1/(RT\ln10)$: un'energia di Gibbs standard negativa corrisponde a $K>1$, una positiva a $K<1$.
:::

## Equilibri eterogenei {#eterogenei}

Un equilibrio è **eterogeneo** quando coinvolge sostanze in fasi diverse. Poiché solidi e liquidi puri non compaiono nell'espressione della costante, molti equilibri eterogenei hanno costanti molto semplici. La decomposizione del carbonato di calcio, che nelle fornaci da calce produce l'ossido di calcio usato nelle malte e nell'industria,

$$\mathrm{CaCO_3(s)}\rightleftharpoons\mathrm{CaO(s)}+\mathrm{CO_2(g)},\qquad K_p=p_{\mathrm{CO_2}},$$

ha come costante la sola pressione dell'anidride carbonica. A temperatura fissata, in un recipiente chiuso che contiene entrambi i solidi, la pressione del gas assume un valore preciso, qualunque sia la quantità di carbonato e di ossido presente. Il comportamento ricorda quello della tensione di vapore di un liquido, studiata nel capitolo [Stati della materia e transizioni](unit:chemistry-11): anche $\mathrm{H_2O(l)}\rightleftharpoons\mathrm{H_2O(g)}$ è un equilibrio eterogeneo, con costante $K_p=p_{\mathrm{H_2O}}$.

A $25\,^\circ\mathrm C$ le tabelle danno per la decomposizione del carbonato $\Delta G^\circ=130{,}6\un{kJ}$, e quindi $p_{\mathrm{CO_2}}=1{,}3\times10^{-23}\un{bar}$. La pressione parziale dell'anidride carbonica nell'aria, circa $4\times10^{-4}\un{bar}$, è enormemente più grande: il quoziente supera la costante, e il calcare a contatto con l'aria è stabile. Per decomporlo bisogna scaldarlo finché la pressione di equilibrio supera quella del gas circostante. Con le entalpie e le entropie standard, $\Delta H^\circ=178{,}4\un{kJ}$ e $\Delta S^\circ=160{,}6\un{J/K}$, supposte costanti, $\Delta G^\circ$ si annulla, e $p_{\mathrm{CO_2}}$ raggiunge $1\un{bar}$, a

$$T=\frac{\Delta H^\circ}{\Delta S^\circ}=\frac{178\,400\un{J}}{160{,}6\un{J/K}}\simeq1110\un{K},$$

circa $840\,^\circ\mathrm C$. La temperatura misurata è intorno ai $900\,^\circ\mathrm C$; la differenza nasce dall'approssimazione di $\Delta H^\circ$ e $\Delta S^\circ$ costanti. Le fornaci da calce lavorano oltre questa temperatura e allontanano continuamente l'anidride carbonica, che altrimenti si accumulerebbe fino alla pressione di equilibrio. L'effetto della temperatura sulle costanti sarà studiato nel capitolo [Perturbazioni dell'equilibrio](unit:chemistry-20).

::: quotidiano L'acqua frizzante in numeri
Il capitolo [Soluzioni e concentrazione](unit:chemistry-12) ha descritto la bibita che si sgasa con la legge di Henry. Quella legge è un equilibrio eterogeneo, $\mathrm{CO_2(g)}\rightleftharpoons\mathrm{CO_2(aq)}$, con costante $K=[\mathrm{CO_2(aq)}]/p_{\mathrm{CO_2}}$, che per l'anidride carbonica in acqua a $25\,^\circ\mathrm C$ vale circa $0{,}034\un{mol/(L\,bar)}$, cioè $3{,}4\times10^{-4}\un{mol/(m^3\,Pa)}$. Con una pressione di $3\un{bar}$ sotto il tappo, la concentrazione di equilibrio è di circa $0{,}10\un{mol/L}$, quasi $4{,}5\un{g/L}$. A contatto con l'aria, dove la pressione parziale del gas è di circa $4\times10^{-4}\un{bar}$, la concentrazione di equilibrio scende a poco più di $10^{-5}\un{mol/L}$, settemila volte meno. La costante fissa il punto d'arrivo; il tempo per arrivarci, che per una bottiglia aperta in frigorifero è di molte ore, dipende dalla velocità con cui il gas raggiunge la superficie o forma bollicine.
:::

::: storia Berthollet, Guldberg e Waage
Nel 1798 il chimico francese Claude Louis Berthollet accompagnò Napoleone nella spedizione in Egitto. Sulle rive dei laghi salati dello uadi Natrun osservò depositi di carbonato di sodio che si formavano dal cloruro di sodio delle acque e dal calcare del terreno, cioè la reazione inversa di quella che in laboratorio procede spontaneamente fra carbonato di sodio e cloruro di calcio. Nel suo *Essai de statique chimique* del 1803 ne concluse che le reazioni possono procedere nei due versi e che l'abbondanza dei reagenti influisce sul risultato. L'idea restò qualitativa per sessant'anni. Nel 1862 Marcellin Berthelot e Léon Péan de Saint-Gilles misurarono con cura l'esterificazione dell'acido acetico, mostrando che si arresta a circa due terzi qualunque sia la temperatura di lavoro, e che un eccesso di alcol aumenta la resa. Nel 1864 Guldberg e Waage, cognati e colleghi all'università di Christiania, l'odierna Oslo, formularono la legge dell'azione di massa; la pubblicarono in norvegese, poi in francese nel 1867, e soltanto la versione tedesca del 1879 la fece conoscere ampiamente. Nel frattempo van 't Hoff l'aveva riscoperta in modo indipendente.
:::

## Errori frequenti {#errori}

::: errore All'equilibrio le concentrazioni sono uguali
All'equilibrio sono uguali le velocità delle reazioni diretta e inversa. Le concentrazioni sono costanti, e i loro valori possono essere molto diversi fra loro: nell'esterificazione l'estere è il doppio dell'acido, nella decomposizione del calcare a temperatura ambiente il prodotto gassoso è quasi assente.
:::

::: errore All'equilibrio la reazione si ferma
La composizione resta costante perché le due reazioni procedono con la stessa velocità. Gli esperimenti con gli isotopi mostrano che le molecole continuano a trasformarsi nei due versi.
:::

::: errore La costante cambia con le concentrazioni
A temperatura fissata la costante è una sola. Cambiando le quantità iniziali cambiano le concentrazioni di equilibrio, in modo che il rapporto della legge dell'azione di massa resti lo stesso. Soltanto la temperatura modifica la costante.
:::

::: errore I solidi vanno nell'espressione
Solidi e liquidi puri hanno attività unitaria e restano fuori dall'espressione della costante. La loro quantità non influisce sull'equilibrio, purché ne resti un po'.
:::

::: errore Una costante grande significa una reazione veloce
La costante riguarda la composizione finale; la velocità dipende dall'energia di attivazione. Idrogeno e ossigeno, con una costante enorme, possono restare mescolati per anni senza reagire.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Una reazione reversibile raggiunge uno stato di equilibrio dinamico, in cui le reazioni diretta e inversa hanno la stessa velocità e la composizione resta costante.
- Per $a\,\mathrm A+b\,\mathrm B\rightleftharpoons c\,\mathrm C+d\,\mathrm D$ la costante è $K_c=[\mathrm C]^c[\mathrm D]^d/([\mathrm A]^a[\mathrm B]^b)$; solidi, liquidi puri e solvente non compaiono.
- Invertendo l'equazione la costante diventa il reciproco; moltiplicando i coefficienti per $n$ si eleva alla $n$; sommando equazioni le costanti si moltiplicano.
- Per i gas $K_p=K_c(RT)^{\Delta n}$.
- Se $Q<K$ la reazione procede verso i prodotti, se $Q>K$ verso i reagenti.
- La composizione di equilibrio si calcola con una tabella delle quantità; per costanti piccole si possono trascurare le variazioni, verificando poi l'approssimazione.
- $\Delta G=\Delta G^\circ+RT\ln Q$ e, all'equilibrio, $\Delta G^\circ=-RT\ln K$; a $25\,^\circ\mathrm C$ un fattore dieci in $K$ corrisponde a $5{,}71\un{kJ/mol}$.
:::

## Glossario {#glossario}

- **Reazione reversibile**: reazione che può procedere in entrambi i versi, indicata con la doppia freccia.
- **Equilibrio chimico**: stato in cui le reazioni diretta e inversa hanno la stessa velocità e la composizione del sistema resta costante.
- **Legge dell'azione di massa**: relazione che fissa, a temperatura costante, il valore del rapporto fra le concentrazioni di equilibrio dei prodotti e dei reagenti, elevate ai coefficienti stechiometrici.
- **Costante di equilibrio**: valore di quel rapporto; si indica con $K_c$ se scritto con concentrazioni, con $K_p$ se scritto con pressioni parziali.
- **Quoziente di reazione**: stessa espressione della costante, calcolata con le concentrazioni o le pressioni di un istante qualsiasi.
- **Attività**: concentrazione o pressione divisa per il valore standard; vale $1$ per solidi e liquidi puri.
- **Equilibrio omogeneo**: equilibrio in cui tutte le specie sono nella stessa fase.
- **Equilibrio eterogeneo**: equilibrio che coinvolge sostanze in fasi diverse.
- **Tabella delle quantità**: schema con valori iniziali, variazioni ed equilibrio usato nei calcoli di equilibrio.
- **Energia di Gibbs standard di reazione**: variazione di energia di Gibbs per la trasformazione dei reagenti nei prodotti, tutti negli stati standard; è legata alla costante da $\Delta G^\circ=-RT\ln K$.
- **Avanzamento di reazione**: quantità che misura quanto è progredita una reazione, in moli.
- **Esterificazione**: reazione fra un acido carbossilico e un alcol che forma un estere e acqua.

## Esercizi {#esercizi}

Gli esercizi sono divisi in tre livelli. Dove serve si usino $R=8{,}314\un{J/(mol\,K)}$, oppure $R=0{,}08314\un{L\,bar/(mol\,K)}$, la temperatura di $25\,^\circ\mathrm C$ ($298{,}15\un{K}$) e i dati termodinamici riportati nel testo.

::: esercizio Scrivere le costanti [base]
Scrivere l'espressione della costante di equilibrio per le reazioni
$$\begin{aligned}
&2\,\mathrm{SO_2(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{SO_3(g)},\\
&\mathrm{C(s)}+\mathrm{H_2O(g)}\rightleftharpoons\mathrm{CO(g)}+\mathrm{H_2(g)},\\
&\mathrm{PbI_2(s)}\rightleftharpoons\mathrm{Pb^{2+}(aq)}+2\,\mathrm{I^-(aq)}.
\end{aligned}$$
>>> soluzione
Nell'ordine, $K_c=[\mathrm{SO_3}]^2/([\mathrm{SO_2}]^2[\mathrm{O_2}])$; $K_c=[\mathrm{CO}][\mathrm{H_2}]/[\mathrm{H_2O}]$, senza il carbonio solido; $K_c=[\mathrm{Pb^{2+}}][\mathrm{I^-}]^2$, il prodotto di solubilità, senza il sale solido.
:::

::: esercizio Equazioni collegate [base]
A $25\,^\circ\mathrm C$ la reazione $\mathrm{N_2O_4(g)}\rightleftharpoons2\,\mathrm{NO_2(g)}$ ha $K_p=0{,}148$. Calcolare la costante delle reazioni $2\,\mathrm{NO_2}\rightleftharpoons\mathrm{N_2O_4}$, $\tfrac12\,\mathrm{N_2O_4}\rightleftharpoons\mathrm{NO_2}$ e $\mathrm{NO_2}\rightleftharpoons\tfrac12\,\mathrm{N_2O_4}$.
>>> soluzione
La reazione inversa ha costante $1/0{,}148\simeq6{,}76$. Dimezzando i coefficienti si prende la radice quadrata, $\sqrt{0{,}148}\simeq0{,}385$; la reazione inversa di quest'ultima ha costante $1/0{,}385\simeq2{,}60$.
:::

::: esercizio Da che parte va [base]
Per l'esterificazione dell'acido acetico, con $K_c=4$, stabilire se ciascuna miscela è all'equilibrio o in quale verso evolve: (a) $0{,}50\un{mol}$ di acido, $0{,}50$ di alcol, $1{,}0$ di estere, $1{,}0$ di acqua; (b) $2{,}0$ di acido, $1{,}0$ di alcol, $2{,}0$ di estere, $2{,}0$ di acqua; (c) $0{,}50$ di acido, $0{,}50$ di alcol, $1{,}5$ di estere, $1{,}0$ di acqua.
>>> soluzione
(a) $Q=1{,}0/0{,}25=4$: all'equilibrio. (b) $Q=4{,}0/2{,}0=2$, minore di $K$: si forma altro estere. (c) $Q=1{,}5/0{,}25=6$, maggiore di $K$: una parte dell'estere si idrolizza.
:::

::: esercizio Il significato di una costante [base]
Per tre reazioni del tipo $\mathrm A\rightleftharpoons\mathrm B$ le costanti valgono $1\times10^{10}$, $1$ e $1\times10^{-10}$. Quanto vale, in ciascun caso, il rapporto $[\mathrm B]/[\mathrm A]$ all'equilibrio? Quale reazione si può considerare completa, quale praticamente assente?
>>> soluzione
Per questo tipo di reazione il rapporto è uguale alla costante. Con $K=10^{10}$ resta una molecola di A ogni dieci miliardi di molecole di B: la reazione è completa. Con $K=1$ le due specie sono in quantità uguali. Con $K=10^{-10}$ si forma una molecola di B ogni dieci miliardi di A: la reazione è praticamente assente.
:::

::: esercizio Il calcare in un recipiente chiuso [base]
A una certa temperatura la decomposizione $\mathrm{CaCO_3(s)}\rightleftharpoons\mathrm{CaO(s)}+\mathrm{CO_2(g)}$ ha $K_p=0{,}20$. In un recipiente chiuso si introducono $10\un{g}$ di carbonato di calcio. Quale pressione di anidride carbonica si stabilisce? Che cosa cambierebbe partendo da $20\un{g}$?
>>> soluzione
Poiché $K_p=p_{\mathrm{CO_2}}$, la pressione all'equilibrio è $0{,}20\un{bar}$. Partendo da $20\un{g}$ la pressione è la stessa, purché nel recipiente restino entrambi i solidi: si decompone la stessa quantità di carbonato, quella necessaria a portare il gas a $0{,}20\un{bar}$ nel volume disponibile.
:::

::: esercizio Acqua aggiunta all'esterificazione [medio]
Verificare il valore dell'ultima riga della tabella delle miscele di esterificazione: si parte da $1\un{mol}$ di acido, $1\un{mol}$ di alcol e $1\un{mol}$ di acqua, con $K_c=4$. Perché la conversione è minore che senza acqua?
>>> soluzione
Con $x$ moli di estere formate, all'equilibrio ci sono $1-x$ moli di acido e di alcol, $x$ di estere e $1+x$ di acqua:
$$\frac{x(1+x)}{(1-x)^2}=4,\qquad3x^2-9x+4=0.$$
La soluzione accettabile, minore di $1$, è $x=(9-\sqrt{33})/6\simeq0{,}543$. L'acqua aggiunta è un prodotto: all'inizio il quoziente non è nullo, e per raggiungere $K$ basta formare meno estere.
:::

::: esercizio Tetrossido più diluito [medio]
In un recipiente da $1{,}00\un{L}$ a $25\,^\circ\mathrm C$ si introducono $0{,}0200\un{mol}$ di tetrossido di diazoto. Con $K_c=5{,}99\times10^{-3}$, calcolare le concentrazioni all'equilibrio e la frazione dissociata, e confrontarla con quella dell'esempio del testo.
>>> soluzione
L'equazione è $(2x)^2/(0{,}0200-x)=5{,}99\times10^{-3}$, cioè $4x^2+5{,}99\times10^{-3}x-1{,}20\times10^{-4}=0$, con soluzione positiva $x\simeq4{,}77\times10^{-3}$. All'equilibrio $[\mathrm{NO_2}]\simeq9{,}55\times10^{-3}\un{M}$ e $[\mathrm{N_2O_4}]\simeq0{,}0152\un{M}$; la frazione dissociata è il $23{,}9\%$, maggiore del $17{,}6\%$ dell'esempio. Diluendo, la dissociazione aumenta: un risultato che il capitolo successivo collegherà al principio di Le Chatelier.
:::

::: esercizio Dai dati termodinamici [medio]
Con le energie di Gibbs standard di formazione $\Delta_\mathrm fG^\circ(\mathrm{SO_2})=-300{,}2\un{kJ/mol}$ e $\Delta_\mathrm fG^\circ(\mathrm{SO_3})=-371{,}1\un{kJ/mol}$, calcolare $\Delta G^\circ$, $K_p$ e $K_c$ a $25\,^\circ\mathrm C$ per la reazione $2\,\mathrm{SO_2(g)}+\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{SO_3(g)}$.
>>> soluzione
$\Delta G^\circ=2(-371{,}1)-2(-300{,}2)$, cioè $-141{,}8\un{kJ}$. L'esponente vale $141\,800/(8{,}314\times298{,}15)=57{,}2$, e $K_p=e^{57{,}2}\simeq7\times10^{24}$. Con $\Delta n=2-3=-1$, $K_c=K_p(RT)$, cioè $K_p\times24{,}79\simeq1{,}7\times10^{26}$. A temperatura ambiente l'ossidazione dell'anidride solforosa è praticamente completa all'equilibrio; nell'industria la si conduce comunque a caldo e con un catalizzatore, perché a temperatura ambiente è lentissima.
:::

::: esercizio Il segno di ΔG [medio]
Una miscela a $25\,^\circ\mathrm C$ contiene diossido e tetrossido di azoto, entrambi con pressione parziale di $0{,}50\un{bar}$. Calcolare $\Delta G$ per la dissociazione del tetrossido, sapendo che $\Delta G^\circ=4{,}73\un{kJ}$, e dire in quale verso evolve la miscela.
>>> soluzione
$Q=0{,}50^2/0{,}50=0{,}50$ e
$$\Delta G=4{,}73+2{,}479\ln0{,}50\simeq4{,}73-1{,}72=+3{,}01\un{kJ}.$$
Il valore positivo indica che procede la reazione inversa: una parte del diossido si dimerizza. Coerentemente, $Q=0{,}50$ è maggiore di $K=0{,}148$.
:::

::: esercizio Combinare due equilibri [medio]
Con le costanti dell'esempio sugli ossidi di azoto, $K_1=4{,}7\times10^{-31}$ e $K_2=2{,}2\times10^{12}$, calcolare $\Delta G^\circ$ della reazione $\mathrm{N_2(g)}+2\,\mathrm{O_2(g)}\rightleftharpoons2\,\mathrm{NO_2(g)}$ e confrontarlo con il doppio dell'energia di Gibbs standard di formazione del diossido di azoto, $51{,}31\un{kJ/mol}$.
>>> soluzione
$K_3=K_1K_2\simeq1{,}03\times10^{-18}$ e
$$\Delta G^\circ=-RT\ln K_3=-2{,}479\un{kJ}\times\ln(1{,}03\times10^{-18})\simeq102{,}7\un{kJ},$$
uguale, entro gli arrotondamenti delle due costanti, a $2\times51{,}31=102{,}62\un{kJ}$. Moltiplicare le costanti equivale a sommare le energie di Gibbs, come vuole la legge di Hess applicata a $\Delta G^\circ$.
:::

::: esercizio Monossido di azoto senza approssimazioni [avanzato]
Risolvere esattamente l'equazione dell'esempio sul monossido di azoto a $2000\un{K}$ e confrontare con il risultato approssimato. Stimare poi la pressione del monossido di azoto all'equilibrio a $25\,^\circ\mathrm C$, con $K=4{,}7\times10^{-31}$.
>>> soluzione
Sviluppando si ottiene un'equazione di secondo grado con soluzione $x\simeq3{,}95\times10^{-3}\un{bar}$, e $p_\mathrm{NO}\simeq7{,}9\times10^{-3}\un{bar}$; il valore approssimato, $4{,}0\times10^{-3}$, differisce di circa l'$1\%$. A $25\,^\circ\mathrm C$, $4x^2\simeq4{,}7\times10^{-31}\times0{,}164$, quindi $2x\simeq2{,}8\times10^{-16}\un{bar}$: l'aria è, di fatto, priva di monossido di azoto all'equilibrio.
:::

::: esercizio Dissociazione e pressione totale [avanzato]
Una mole di tetrossido di diazoto si dissocia per una frazione $\alpha$ a $25\,^\circ\mathrm C$ e pressione totale $P$. Mostrare che $K_p=4\alpha^2P/(1-\alpha^2)$ e calcolare $\alpha$ per $P=1{,}0\un{bar}$ e per $P=0{,}10\un{bar}$, con $K_p=0{,}148$.
>>> soluzione
All'equilibrio ci sono $1-\alpha$ moli di tetrossido e $2\alpha$ di diossido, in totale $1+\alpha$; le pressioni parziali sono $P(1-\alpha)/(1+\alpha)$ e $2\alpha P/(1+\alpha)$. Sostituendo,
$$K_p=\frac{4\alpha^2P^2/(1+\alpha)^2}{P(1-\alpha)/(1+\alpha)}=\frac{4\alpha^2P}{1-\alpha^2}.$$
Risolvendo, $\alpha=\sqrt{K_p/(K_p+4P)}$: a $1{,}0\un{bar}$, $\alpha\simeq0{,}189$, il minimo della figura sull'energia di Gibbs; a $0{,}10\un{bar}$, $\alpha\simeq0{,}520$.
:::

::: esercizio Quando si decompone il calcare all'aria [avanzato]
Con $\Delta H^\circ=178{,}4\un{kJ}$ e $\Delta S^\circ=160{,}6\un{J/K}$, supposti costanti, stimare la temperatura alla quale la pressione di equilibrio dell'anidride carbonica sopra il carbonato di calcio uguaglia quella dell'aria, $4{,}2\times10^{-4}\un{bar}$.
>>> soluzione
La condizione è $\Delta H^\circ-T\Delta S^\circ=-RT\ln p$, cioè
$$T=\frac{\Delta H^\circ}{\Delta S^\circ-R\ln p}=\frac{178\,400}{160{,}6+64{,}6}\un{K}\simeq792\un{K},$$
circa $520\,^\circ\mathrm C$. Sopra questa temperatura il calcare a contatto con l'aria comincia a perdere anidride carbonica, lentamente; per una decomposizione rapida le fornaci lavorano a temperature molto più alte, dove la pressione di equilibrio supera $1\un{bar}$.
:::

::: esercizio L'energia di Gibbs dell'esterificazione [avanzato]
Calcolare $\Delta G^\circ$ dell'esterificazione dell'acido acetico, con $K=4$ a $25\,^\circ\mathrm C$. Una miscela ha quoziente $Q=40$: quanto vale $\Delta G$ e in quale verso evolve?
>>> soluzione
$\Delta G^\circ=-RT\ln4$, cioè $-2{,}479\times1{,}386\simeq-3{,}44\un{kJ/mol}$. Con $Q=40$,
$$\Delta G=-3{,}44+2{,}479\ln40\simeq-3{,}44+9{,}14=+5{,}71\un{kJ/mol},$$
e procede l'idrolisi dell'estere. Il valore $5{,}71\un{kJ/mol}$ ha una ragione precisa: $Q$ è dieci volte $K$.
:::

::: esercizio Il gas di una bottiglia [avanzato]
Un litro di acqua frizzante è in equilibrio con anidride carbonica a $3{,}0\un{bar}$ e $25\,^\circ\mathrm C$, con costante di Henry $0{,}034\un{mol/(L\,bar)}$. Calcolare la concentrazione disciolta in moli e in grammi per litro, e il volume di gas, a $25\,^\circ\mathrm C$ e $1\un{bar}$, che si libera quando l'acqua raggiunge l'equilibrio con l'aria ($p_{\mathrm{CO_2}}=4{,}2\times10^{-4}\un{bar}$).
>>> soluzione
La concentrazione iniziale è $0{,}034\times3{,}0=0{,}102\un{mol/L}$, cioè $0{,}102\times44{,}01\simeq4{,}5\un{g/L}$. In equilibrio con l'aria resta $0{,}034\times4{,}2\times10^{-4}\simeq1{,}4\times10^{-5}\un{mol/L}$, trascurabile. Si liberano quindi circa $0{,}102\un{mol}$ di gas, che a $25\,^\circ\mathrm C$ e $1\un{bar}$ occupano $0{,}102\times24{,}79\simeq2{,}5\un{L}$: due volte e mezzo il volume dell'acqua.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali; le costanti di velocità della reazione $\mathrm A\rightleftharpoons\mathrm B$ e le composizioni delle miscele negli esercizi sono illustrative, e l'andamento nel tempo dell'esterificazione nelle figure è schematico. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 15-1–15-5 e 15-7 e paragrafo 13-5. I dati numerici provengono dalle fonti seguenti.

1. Costante dei gas: valore raccomandato CODATA 2022.
2. Entalpie, energie di Gibbs di formazione ed entropie standard di $\mathrm{NO}$, $\mathrm{NO_2}$, $\mathrm{N_2O_4}$, $\mathrm{N_2}$, $\mathrm{O_2}$, $\mathrm{H_2O}$, $\mathrm{SO_2}$, $\mathrm{SO_3}$, $\mathrm{CaCO_3}$, $\mathrm{CaO}$ e $\mathrm{CO_2}$: tabelle di dati termodinamici dell'appendice D del manuale di Petrucci et al., coerenti con le tabelle NBS (D. D. Wagman et al., J. Phys. Chem. Ref. Data 11, 1982, supplemento 2). Le costanti a $2000\un{K}$ e la temperatura di decomposizione del calcare sono stime con $\Delta H^\circ$ e $\Delta S^\circ$ costanti.
3. Costante di equilibrio dell'esterificazione dell'acido acetico con l'etanolo: M. Berthelot e L. Péan de Saint-Gilles, Ann. Chim. Phys. 65 (1862) 385, 66 (1862) 5 e 68 (1863) 225.
4. Costante della legge di Henry per l'anidride carbonica: R. Sander, Atmos. Chem. Phys. 23 (2023) 10901. Frazione di anidride carbonica nell'aria: NOAA Global Monitoring Laboratory.
5. Per la storia: C. L. Berthollet, *Essai de statique chimique*, Parigi, 1803; C. M. Guldberg e P. Waage, *Études sur les affinités chimiques*, Christiania, 1867, e J. Prakt. Chem. 19 (1879) 69; J. H. van 't Hoff, Ber. Dtsch. Chem. Ges. 10 (1877) 669.
