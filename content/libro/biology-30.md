---
unit: biology-30
titolo: Titano, la chimica senza acqua
sottotitolo: Un'atmosfera di azoto più densa della nostra, nebbie organiche, laghi e piogge di metano, e la missione Dragonfly
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, cap. 10 (§10.1-10.6)
---

## Prima di cominciare {#apertura}

Il 14 gennaio 2005 la sonda europea Huygens, staccatasi tre settimane prima dalla sonda Cassini, entrò nell'atmosfera di Titano, la più grande luna di Saturno. Scese appesa a un paracadute per due ore e ventisette minuti attraverso una nebbia arancione, fotografando colline solcate da canali ramificati, e toccò il suolo a circa $4{,}5$ metri al secondo. Continuò a trasmettere per altri settantadue minuti, finché Cassini scese sotto l'orizzonte. Le sue immagini mostravano una pianura cosparsa di ciottoli arrotondati di ghiaccio d'acqua, a $-179$ °C, sotto un cielo color ruggine. Fu il primo atterraggio su un corpo del sistema solare esterno.

Titano è l'unica luna con un'atmosfera densa, ed è l'unico corpo, oltre alla Terra, con liquidi stabili sulla superficie: laghi, mari e fiumi, fatti però di metano ed etano. Ha nubi, piogge, dune, stagioni. La luce del Sole e le particelle cariche della magnetosfera di Saturno trasformano l'azoto e il metano dell'atmosfera in molecole organiche sempre più complesse, che formano una nebbia e si depositano al suolo. Titano è un enorme laboratorio di chimica organica, attivo da miliardi di anni senza acqua liquida in superficie.

Shaw dedica a Titano l'intero capitolo finale del suo libro, scritto mentre Huygens scendeva. Questo capitolo segue la stessa traccia con i dati raccolti da Cassini fino al 2017: l'atmosfera e la sua altezza di scala, la fotochimica e le nebbie, il clima e il ciclo del metano, la chimica alle basse temperature, l'interno, la possibilità di una vita in un solvente diverso dall'acqua e la missione Dragonfly.

::: obiettivi
- descrivere l'atmosfera di Titano e calcolare la sua altezza di scala;
- spiegare la fotochimica del metano e dell'azoto e la formazione delle nebbie organiche;
- discutere il bilancio energetico di Titano, con effetto serra e anti-serra;
- descrivere il ciclo del metano, i laghi e le dune;
- applicare le leggi di Arrhenius e di van 't Hoff alle basse temperature;
- discutere lo stato dell'interno di Titano e le ipotesi di vita in solventi non acquosi;
- descrivere gli obiettivi della missione Dragonfly.
:::

Il capitolo usa i gas del capitolo [Gas e stato aeriforme](unit:chemistry-10), la cinetica del capitolo [Temperatura e attivazione](unit:chemistry-18), il bilancio radiativo del capitolo [Atmosfere, effetto serra e clima](unit:biology-23) e le membrane del capitolo [Membrane e protocellule](unit:biology-03).

## Un'atmosfera più densa della nostra {#atmosfera}

Titano ha un raggio di $2574{,}7$ km, più grande di Mercurio, e una massa di $1{,}345\cdot10^{23}$ kg, meno della metà di quella di Mercurio. La densità media, $1{,}88$ g/cm$^3$, indica un corpo fatto per metà circa di roccia e per metà di ghiaccio d'acqua, e la gravità in superficie è $1{,}352$ m/s$^2$, meno di quella della Luna. Orbita attorno a Saturno a circa $1{,}22$ milioni di km in poco meno di sedici giorni, in rotazione sincrona. Saturno dista dal Sole circa $9{,}5$ unità astronomiche, e Titano riceve circa l'$1\%$ della luce che arriva alla Terra.

Huygens misurò al suolo una temperatura di $93{,}65$ K e una pressione di $1467$ hPa, una volta e mezza quella terrestre. L'atmosfera è fatta per circa il $95\%$ di azoto molecolare e per circa il $5{,}7\%$ di metano vicino al suolo, con frazioni minori di idrogeno, argon e idrocarburi; il metano scende all'$1{,}5\%$ circa nella stratosfera, dove viene distrutto dalla luce ultravioletta. Poiché la gravità è debole, per produrre quella pressione serve molto gas: la massa d'aria sopra ogni metro quadrato, $p/g$, è circa $108\,500$ kg, più di dieci volte quella terrestre, e la massa totale dell'atmosfera è quasi il doppio di quella della Terra. La densità dell'aria al suolo, circa $5{,}2$ kg/m$^3$, è più di quattro volte quella terrestre.

::: legge Altezza di scala di un'atmosfera isoterma
In equilibrio idrostatico $\mathrm dp/\mathrm dz=-\rho g$; per un gas ideale di massa molare $M$ alla temperatura $T$, $\rho=pM/(RT)$. Se $T$ e $g$ sono costanti, la pressione decresce esponenzialmente con la quota:

$$p(z)=p_0\,\mathrm e^{-z/H},\qquad H=\frac{RT}{Mg}.$$

$H$ è l'**altezza di scala**: la quota sulla quale la pressione si riduce di un fattore $\mathrm e$.
:::

Per Titano, con $T=94$ K, $g=1{,}352$ m/s$^2$ e azoto, $M=28$ g/mol, l'altezza di scala è circa $20{,}6$ km; per la Terra, con $288$ K, $9{,}81$ m/s$^2$ e $M=29$ g/mol, circa $8{,}4$ km (figura 1). Il freddo comprime l'atmosfera, ma la gravità debole la estende di più: l'atmosfera di Titano è alta, e la pressione diminuisce lentamente salendo. Per questo la nebbia si stende per centinaia di chilometri, e lo strato superiore dell'atmosfera si trova a più di mille chilometri dalla superficie.

::: figura pressione
{"w":760,"h":285,"items":[{"t":"axes","o":[80,250],"x":[640,"quota, km"],"y":[230,"pressione, bar"],"sx":5,"sy":140,"xt":[[0,"0"],[10,"10"],[20,"20"],[30,"30"],[40,"40"],[50,"50"],[60,"60"],[70,"70"],[80,"80"],[90,"90"]],"yt":[[0,"0"],[0.5,"0,5"],[1,"1"],[1.5,"1,5"]]},{"t":"plot","o":[80,250],"sx":5,"sy":140,"pts":[[0,1.467],[1,1.3974873],[2,1.3312683],[3,1.2681871],[4,1.208095],[5,1.1508503],[6,1.0963181],[7,1.0443698],[8,0.9948831],[9,0.9477413],[10,0.9028333],[11,0.8600532],[12,0.8193002],[13,0.7804782],[14,0.7434958],[15,0.7082658],[16,0.6747051],[17,0.6427347],[18,0.6122792],[19,0.5832668],[20,0.5556291],[21,0.529301],[22,0.5042205],[23,0.4803283],[24,0.4575683],[25,0.4358868],[26,0.4152326],[27,0.3955571],[28,0.3768139],[29,0.3589589],[30,0.3419499],[31,0.3257468],[32,0.3103115],[33,0.2956076],[34,0.2816005],[35,0.268257],[36,0.2555459],[37,0.243437],[38,0.2319019],[39,0.2209134],[40,0.2104456],[41,0.2004738],[42,0.1909745],[43,0.1819253],[44,0.1733049],[45,0.165093],[46,0.1572702],[47,0.149818],[48,0.142719],[49,0.1359564],[50,0.1295142],[51,0.1233772],[52,0.1175311],[53,0.111962],[54,0.1066567],[55,0.1016029],[56,0.0967885],[57,0.0922022],[58,0.0878333],[59,0.0836714],[60,0.0797067],[61,0.0759298],[62,0.072332],[63,0.0689046],[64,0.0656396],[65,0.0625293],[66,0.0595664],[67,0.0567439],[68,0.0540551],[69,0.0514937],[70,0.0490537],[71,0.0467294],[72,0.0445151],[73,0.0424058],[74,0.0403964],[75,0.0384823],[76,0.0366588],[77,0.0349218],[78,0.033267],[79,0.0316907],[80,0.0301891],[81,0.0287586],[82,0.0273959],[83,0.0260977],[84,0.0248611],[85,0.0236831],[86,0.0225609],[87,0.0214919],[88,0.0204735],[89,0.0195034],[90,0.0185792]],"c":"force","w":2.6},{"t":"plot","o":[80,250],"sx":5,"sy":140,"pts":[[0,1.013],[1,0.8993065],[2,0.7983733],[3,0.7087683],[4,0.62922],[5,0.5585999],[6,0.4959057],[7,0.440248],[8,0.390837],[9,0.3469716],[10,0.3080294],[11,0.2734579],[12,0.2427665],[13,0.2155197],[14,0.191331],[15,0.1698571],[16,0.1507932],[17,0.133869],[18,0.1188443],[19,0.1055059],[20,0.0936645],[21,0.0831521],[22,0.0738196],[23,0.0655345],[24,0.0581792],[25,0.0516495],[26,0.0458527],[27,0.0407064],[28,0.0361378],[29,0.0320819],[30,0.0284812],[31,0.0252846],[32,0.0224468],[33,0.0199275],[34,0.0176909],[35,0.0157054],[36,0.0139427],[37,0.0123779],[38,0.0109886],[39,0.0097553],[40,0.0086605],[41,0.0076884],[42,0.0068255],[43,0.0060595],[44,0.0053794],[45,0.0047756],[46,0.0042397],[47,0.0037638],[48,0.0033414],[49,0.0029664],[50,0.0026334],[51,0.0023379],[52,0.0020755],[53,0.0018425],[54,0.0016357],[55,0.0014522],[56,0.0012892],[57,0.0011445],[58,0.001016],[59,0.000902],[60,0.0008008],[61,0.0007109],[62,0.0006311],[63,0.0005603],[64,0.0004974],[65,0.0004416],[66,0.000392],[67,0.000348],[68,0.000309],[69,0.0002743],[70,0.0002435],[71,0.0002162],[72,0.0001919],[73,0.0001704],[74,0.0001512],[75,0.0001343],[76,0.0001192],[77,0.0001058],[78,9.39e-05],[79,8.34e-05],[80,7.4e-05],[81,6.57e-05],[82,5.84e-05],[83,5.18e-05],[84,4.6e-05],[85,4.08e-05],[86,3.62e-05],[87,3.22e-05],[88,2.86e-05],[89,2.54e-05],[90,2.25e-05]],"c":"force2","w":2.6},{"t":"text","p":[236,194.1],"s":"Titano, H circa 20,6 km","c":"force","size":10,"a":"start"},{"t":"text","p":[158,219.2],"s":"Terra, H circa 8,4 km","c":"force2","size":10,"a":"start"}]}
---
Pressione in funzione della quota per un'atmosfera isoterma, $p=p_0\mathrm e^{-z/H}$, con i valori al suolo e le altezze di scala di Titano, circa $20{,}6$ km, e della Terra, circa $8{,}4$ km. Il modello trascura la variazione della temperatura con la quota, ed è indicativo per i primi chilometri.
:::

Perché una luna piccola trattiene un'atmosfera così densa, mentre Ganimede e Callisto, di dimensioni simili, ne sono quasi privi? La velocità di fuga di Titano, circa $2{,}6$ km/s, è molto maggiore della velocità media delle molecole di azoto a quelle temperature, circa $290$ m/s, e a $94$ K l'azoto sfugge molto lentamente. La domanda vera riguarda l'origine. Lo spettrometro di Huygens trovò pochissimo argon-36 primordiale e un rapporto fra azoto-14 e azoto-15 di circa $168$, più basso di quello terrestre: l'azoto non è stato catturato come gas dalla nebulosa, e probabilmente deriva da ammoniaca contenuta nei ghiacci da cui Titano si è formato, trasformata in azoto dalla luce, dagli impatti o dal calore interno. Shaw discute già questa ipotesi nel §10.2.

## Fotochimica e nebbie organiche {#fotochimica}

Negli strati alti dell'atmosfera la luce ultravioletta del Sole spezza le molecole di metano in frammenti reattivi, i radicali metile, metilene e metilidino, insieme ad atomi e molecole di idrogeno. L'azoto molecolare, con il suo triplo legame, è molto più resistente: lo rompono solo la radiazione ultravioletta estrema, gli elettroni della magnetosfera di Saturno, nella quale Titano orbita, e i raggi cosmici. I frammenti si ricombinano in molecole più grandi. Si formano così etano, acetilene, propano, benzene, acido cianidrico, cianoacetilene, acetonitrile e decine di altre molecole, già individuate dallo spettrometro a infrarossi delle sonde Voyager e poi da Cassini e dai radiotelescopi terrestri.

::: legge Due reazioni iniziali
Lo schema della fotochimica di Titano comincia con reazioni come

$$\mathrm{CH_4}+h\nu\longrightarrow\mathrm{CH_3}+\mathrm H,$$

$$\mathrm{N}+\mathrm{CH_3}\longrightarrow\mathrm{HCN}+\mathrm{H_2}.$$

L'idrogeno prodotto, leggero, sfugge nello spazio; il carbonio e l'azoto restano in molecole sempre più ricche di carbonio.
:::

Le molecole continuano a crescere. Nel 2007 gli spettrometri di Cassini misurarono, fra $950$ e $1200$ km di quota, ioni positivi e negativi con masse di centinaia e fino a migliaia di unità di massa atomica: la chimica organica comincia molto in alto, negli strati ionizzati, e produce aggregati che scendono lentamente formando una nebbia. Le particelle della nebbia sono simili ai **tholin**, il nome che Carl Sagan e Bishun Khare diedero nel 1979 ai solidi bruno-rossastri ottenuti in laboratorio irradiando miscele di azoto e metano. È questa nebbia di particelle organiche, più che le nubi di metano, a dare a Titano il colore arancione e a nasconderne la superficie alla luce visibile.

Il destino di questo materiale è la superficie. In miliardi di anni la nebbia ha depositato uno strato di sostanze organiche solide, e l'etano prodotto dalla fotolisi si raccoglie nei laghi. La distruzione del metano ha anche una conseguenza importante: al ritmo attuale il metano dell'atmosfera verrebbe consumato in alcune decine di milioni di anni, molto meno dell'età del sistema solare. Deve quindi essere rifornito dall'interno, attraverso il ghiaccio, oppure l'attuale abbondanza è temporanea. Il cianoacetilene e l'acido cianidrico, come si è visto nel capitolo [Miller-Urey e la sintesi prebiotica](unit:biology-07), sono tra le molecole chiave della chimica prebiotica terrestre.

## Effetto serra e anti-serra {#bilancio}

Titano riceve circa $15$ W/m$^2$ di luce solare, e riflette circa un quarto di quanto riceve. La temperatura di equilibrio di un corpo con questa albedo, come si è visto nel capitolo [La zona abitabile](unit:biology-22), è circa $83$ K; la superficie misurata da Huygens è a quasi $94$ K, una decina di gradi più calda. Il bilancio netto nasconde però due effetti opposti, che Christopher McKay, James Pollack e Régis Courtin descrissero nel 1991 (figura 2).

::: figura bilancio
{"w":760,"h":285,"items":[{"t":"axes","o":[90,250],"x":[640,""],"y":[215,"temperatura, K"],"sx":1,"sy":4,"xt":[],"yt":[[0,"60"],[10,"70"],[20,"80"],[30,"90"],[40,"100"],[50,"110"]]},{"t":"rect","p":[130,158,100,92],"c":"muted","r":3},{"t":"text","p":[180,150],"s":"equilibrio, 83 K","c":"muted","size":10},{"t":"rect","p":[270,74,100,84],"c":"force4","r":3},{"t":"text","p":[320,66],"s":"serra, +21 K","c":"force4","size":10},{"t":"rect","p":[410,74,100,36],"c":"force2","r":3},{"t":"text","p":[460,66],"s":"anti-serra, −9 K","c":"force2","size":10},{"t":"rect","p":[550,114,100,136],"c":"force","r":3},{"t":"text","p":[600,106],"s":"misurata, 94 K","c":"force","size":10},{"t":"line","p":[230,158,270,158],"c":"muted","w":1.1,"dash":true},{"t":"line","p":[370,74,410,74],"c":"muted","w":1.1,"dash":true},{"t":"line","p":[510,110,550,110],"c":"muted","w":1.1,"dash":true}]}
---
Il bilancio della temperatura superficiale di Titano: dalla temperatura di equilibrio di circa $83$ K, il riscaldamento per effetto serra di circa $21$ K e il raffreddamento per effetto anti-serra di circa $9$ K portano a circa $95$ K, vicino alla temperatura misurata, circa $94$ K. I valori dei due effetti sono quelli calcolati da McKay, Pollack e Courtin.
:::

Il primo è un **effetto serra**. L'atmosfera è trasparente alla poca luce visibile che arriva al suolo, mentre il metano, l'idrogeno e l'azoto, che a quella pressione e a quelle temperature assorbono anche per collisioni fra molecole, intrappolano la radiazione infrarossa emessa dalla superficie. Questo effetto scalda la superficie di circa $21$ K. Il secondo è un **effetto anti-serra**: la nebbia organica nella stratosfera assorbe una parte della luce del Sole prima che arrivi al suolo e la riemette nello spazio come radiazione infrarossa, raffreddando la superficie di circa $9$ K. La somma dei due effetti, circa $12$ K, spiega entro le incertezze la differenza fra la temperatura di equilibrio e quella misurata. Secondo alcuni modelli, una nebbia simile, in un'atmosfera ricca di metano, avrebbe raffreddato anche la Terra dell'Archeano, prima dell'arrivo dell'ossigeno descritto nel capitolo [Ossigeno, endosimbiosi e cellule complesse](unit:biology-17).

Il profilo verticale della temperatura, misurato da Huygens durante la discesa, ricorda quello terrestre (figura 3). Nella troposfera la temperatura diminuisce salendo, fino a circa $70$ K a $44$ km di quota; nella stratosfera risale, scaldata dall'assorbimento della luce solare da parte della nebbia e del metano, fino a circa $186$ K verso i $250$ km.

::: figura struttura
{"w":760,"h":300,"items":[{"t":"axes","o":[80,260],"x":[640,"temperatura, K"],"y":[240,"quota, km"],"sx":2.8,"sy":0.42,"xt":[[0,"50"],[50,"100"],[100,"150"],[150,"200"]],"yt":[[0,"0"],[100,"100"],[200,"200"],[300,"300"],[400,"400"],[500,"500"]]},{"t":"plot","o":[80,260],"sx":2.8,"sy":0.42,"pts":[[43.65,0],[42.91704,5],[40.81059,10],[37.59627,15],[33.67941,20],[29.55393,25],[25.74005,30],[22.71871,35],[20.87089,40],[20.40672,45],[20.6418,50],[21.21139,55],[22.11217,60],[23.33891,65],[24.88448,70],[26.7399,75],[28.89438,80],[31.33541,85],[34.0488,90],[37.01877,95],[40.22807,100],[43.65805,105],[47.28877,110],[51.09914,115],[55.06701,120],[59.16931,125],[63.38221,130],[67.68123,135],[72.04138,140],[76.43732,145],[80.84351,150],[85.23433,155],[89.58427,160],[93.86805,165],[98.06077,170],[102.13807,175],[106.07625,180],[109.85243,185],[113.44466,190],[116.83206,195],[119.99494,200],[122.91493,205],[125.57506,210],[127.95986,215],[130.05548,220],[131.84973,225],[133.3322,230],[134.49426,235],[135.32916,240],[135.83205,245],[136.0,250],[135.9636,255],[135.85456,260],[135.67335,265],[135.42074,270],[135.09781,275],[134.70595,280],[134.24684,285],[133.72243,290],[133.13498,295],[132.48701,300],[131.78128,305],[131.02082,310],[130.20888,315],[129.34894,320],[128.44469,325],[127.5,330],[126.51891,335],[125.50562,340],[124.46447,345],[123.39992,350],[122.31654,355],[121.21895,360],[120.11185,365],[119.0,370],[117.88815,375],[116.78105,380],[115.68346,385],[114.60008,390],[113.53553,395],[112.49438,400],[111.48109,405],[110.5,410],[109.55531,415],[108.65106,420],[107.79112,425],[106.97918,430],[106.21872,435],[105.51299,440],[104.86502,445],[104.27757,450],[103.75316,455],[103.29405,460],[102.90219,465],[102.57926,470],[102.32665,475],[102.14544,480],[102.0364,485],[102.0,490]],"c":"force","w":2.6},{"t":"line","p":[80.0,241.5,500.0,241.5],"c":"muted","w":1.1,"dash":true},{"t":"text","p":[504.0,245.5],"s":"tropopausa, 44 km","c":"muted","size":10,"a":"start"},{"t":"circle","p":[202.2,260.0,5],"c":"force2"},{"t":"text","p":[212.2,252.0],"s":"superficie, 93,65 K","c":"force2","size":10,"a":"start"},{"t":"circle","p":[137.1,241.5,5],"c":"force2"},{"t":"circle","p":[460.8,155.0,5],"c":"force2"},{"t":"text","p":[468.8,159.0],"s":"186 K","c":"force2","size":10,"a":"start"},{"t":"poly","pts":[[85.6,113.0],[494.4,113.0],[494.4,218.0],[85.6,218.0]],"close":true,"c":"force4","w":1.2,"dash":true},{"t":"text","p":[96.8,121.4],"s":"nebbia organica, centinaia di km","c":"force4","size":10,"a":"start"},{"t":"text","p":[360.0,201.2],"s":"stratosfera","c":"muted","size":11},{"t":"text","p":[402.0,251.6],"s":"troposfera","c":"muted","size":11}]}
---
Profilo di temperatura dell'atmosfera di Titano ricostruito dalle misure di Huygens, semplificato: troposfera fino alla tropopausa, a circa $44$ km e $70$ K; stratosfera fino a circa $250$ km e $186$ K; la nebbia organica si estende per centinaia di chilometri. Per confronto, la quota della tropopausa terrestre è di circa $12$ km.
:::

::: nota Il colore di Titano
Le nubi di metano di Titano sono rare e coprono di solito una piccola parte del cielo. Il colore arancione del disco viene dalla nebbia di particelle organiche della stratosfera, che assorbe la luce blu e diffonde quella rossa.
:::

## Il ciclo del metano {#ciclo}

Alle temperature di Titano il metano può essere gas, liquido o solido, come l'acqua sulla Terra. Esiste quindi un ciclo del metano: evaporazione dai laghi e dal suolo, trasporto nell'atmosfera, formazione di nubi, pioggia, scorrimento in fiumi, raccolta in laghi e mari (figura 4). Huygens misurò al suolo un'umidità relativa del metano di circa il $50\%$, e sentì il metano liberarsi dal terreno scaldato dalla sonda stessa: il suolo era umido.

::: figura ciclo
{"w":760,"h":300,"items":[{"t":"rect","p":[20,250,720,40],"c":"muted","r":4},{"t":"text","p":[380,276],"s":"superficie: ghiaccio d'acqua coperto di materiale organico","c":"muted","size":10},{"t":"rect","p":[60,236,170,14],"c":"force2","r":4},{"t":"text","p":[145,230],"s":"laghi di metano ed etano","c":"force2","size":10},{"t":"poly","pts":[[500,250],[518,226],[536,250]],"c":"force","w":1.6,"close":true,"fill":true},{"t":"poly","pts":[[536,250],[554,226],[572,250]],"c":"force","w":1.6,"close":true,"fill":true},{"t":"poly","pts":[[572,250],[590,226],[608,250]],"c":"force","w":1.6,"close":true,"fill":true},{"t":"poly","pts":[[608,250],[626,226],[644,250]],"c":"force","w":1.6,"close":true,"fill":true},{"t":"poly","pts":[[644,250],[662,226],[680,250]],"c":"force","w":1.6,"close":true,"fill":true},{"t":"text","p":[590,218],"s":"dune organiche","c":"force","size":10},{"t":"arrow","p":[150,226,190,150],"c":"force2","w":1.8,"head":7},{"t":"text","p":[140,180],"s":"evaporazione","c":"force2","size":10,"a":"end"},{"t":"rect","p":[190,110,170,36],"c":"ax","r":18},{"t":"text","p":[275,133],"s":"nubi di metano","c":"muted","size":10},{"t":"line","p":[220,150,212,200],"c":"force2","w":1.6,"dash":true},{"t":"line","p":[250,150,242,200],"c":"force2","w":1.6,"dash":true},{"t":"line","p":[280,150,272,200],"c":"force2","w":1.6,"dash":true},{"t":"line","p":[310,150,302,200],"c":"force2","w":1.6,"dash":true},{"t":"text","p":[320,190],"s":"pioggia","c":"force2","size":10,"a":"start"},{"t":"poly","pts":[[20,20],[740,20],[740,60],[20,60]],"close":true,"c":"force4","w":1.4,"dash":true},{"t":"text","p":[380,45],"s":"alta atmosfera: luce UV e particelle cariche spezzano metano e azoto","c":"force4","size":10},{"t":"arrow","p":[420,110,470,64],"c":"force","w":1.8,"head":7},{"t":"text","p":[482,92],"s":"metano che sale","c":"force","size":10,"a":"start"},{"t":"arrow","p":[600,64,600,200],"c":"force4","w":1.8,"head":7},{"t":"text","p":[608,120],"s":"nebbia, etano,","c":"force4","size":10,"a":"start"},{"t":"text","p":[608,135],"s":"acetilene, HCN","c":"force4","size":10,"a":"start"},{"t":"text","p":[608,150],"s":"che si depositano","c":"force4","size":10,"a":"start"}]}
---
Il ciclo del metano e la chimica organica di Titano. Il metano evapora dai laghi e dal suolo, condensa in nubi e cade come pioggia; negli strati alti la luce ultravioletta e le particelle cariche lo trasformano in etano, acetilene, acido cianidrico e particelle di nebbia, che si depositano al suolo e formano le dune.
:::

Nel 2006 il radar di Cassini, capace di vedere attraverso la nebbia, scoprì vicino al polo nord centinaia di laghi scuri e lisci. Il più grande, Kraken Mare, ha un'estensione di circa $400\,000$ km$^2$, più del Mar Caspio. Ligeia Mare, di circa $126\,000$ km$^2$, ha profondità che il radar ha misurato fino a circa $160$ m, ed è fatta soprattutto di metano. Ontario Lacus, il lago più grande del sud, contiene invece molto etano, identificato nel 2008 nel suo spettro infrarosso. La quantità totale di idrocarburi liquidi in superficie è di alcune decine di migliaia di chilometri cubi (figura 5).

::: figura laghi
{"w":760,"h":270,"items":[{"t":"text","p":[256,44],"s":"Kraken Mare, Titano","c":"ax","size":11,"a":"end"},{"t":"rect","p":[270,32,400.0,16],"c":"force","r":3},{"t":"text","p":[678.0,44],"s":"400","c":"force","size":10,"a":"start"},{"t":"text","p":[256,80],"s":"Mar Caspio, Terra","c":"ax","size":11,"a":"end"},{"t":"rect","p":[270,68,371.0,16],"c":"muted","r":3},{"t":"text","p":[649.0,80],"s":"371","c":"muted","size":10,"a":"start"},{"t":"text","p":[256,116],"s":"Ligeia Mare, Titano","c":"ax","size":11,"a":"end"},{"t":"rect","p":[270,104,126.0,16],"c":"force","r":3},{"t":"text","p":[404.0,116],"s":"126","c":"force","size":10,"a":"start"},{"t":"text","p":[256,152],"s":"Lago Superiore, Terra","c":"ax","size":11,"a":"end"},{"t":"rect","p":[270,140,82.1,16],"c":"muted","r":3},{"t":"text","p":[360.1,152],"s":"82,1","c":"muted","size":10,"a":"start"},{"t":"text","p":[256,188],"s":"Ontario Lacus, Titano","c":"ax","size":11,"a":"end"},{"t":"rect","p":[270,176,15.0,16],"c":"force","r":3},{"t":"text","p":[293.0,188],"s":"15","c":"force","size":10,"a":"start"},{"t":"line","p":[270,220,670,220],"c":"ax","w":1.2},{"t":"line","p":[270.0,216,270.0,224],"c":"ax","w":1.2},{"t":"text","p":[270.0,238],"s":"0","c":"muted","size":10},{"t":"line","p":[370.0,216,370.0,224],"c":"ax","w":1.2},{"t":"text","p":[370.0,238],"s":"100","c":"muted","size":10},{"t":"line","p":[470.0,216,470.0,224],"c":"ax","w":1.2},{"t":"text","p":[470.0,238],"s":"200","c":"muted","size":10},{"t":"line","p":[570.0,216,570.0,224],"c":"ax","w":1.2},{"t":"text","p":[570.0,238],"s":"300","c":"muted","size":10},{"t":"line","p":[670.0,216,670.0,224],"c":"ax","w":1.2},{"t":"text","p":[670.0,238],"s":"400","c":"muted","size":10},{"t":"text","p":[470.0,258],"s":"superficie, migliaia di km²","c":"muted","size":11}]}
---
Superficie dei principali mari e laghi di Titano a confronto con il Mar Caspio e con il Lago Superiore, in migliaia di chilometri quadrati.
:::

I laghi si concentrano ai poli perché lì l'aria più fredda e la minore insolazione riducono l'evaporazione.

Le piogge sono rare ma intense. Nel 2010 Cassini osservò grandi tempeste nelle regioni equatoriali, seguite da un oscuramento della superficie su centinaia di migliaia di chilometri quadrati, interpretato come suolo bagnato dalla pioggia. Le valli e i canali fotografati da Huygens sono stati scavati da queste piogge, e i ciottoli arrotondati della pianura di atterraggio sono stati trasportati e levigati dai liquidi.

Nelle regioni equatoriali, più secche, si stendono grandi campi di **dune** lineari, alte un centinaio di metri e lunghe centinaia di chilometri, simili a quelle del deserto del Namib. Sono fatte di granelli di materiale organico, probabilmente la nebbia depositata e rimaneggiata dal vento. Una delle prime missioni di Dragonfly sarà atterrare fra queste dune.

## Chimica al freddo {#freddo}

A $94$ K le reazioni chimiche si comportano in modo molto diverso che a temperatura ambiente. Shaw dedica a questo problema il §10.3, con due strumenti: la legge di Arrhenius per la velocità e la legge di van 't Hoff per l'equilibrio.

La velocità di una reazione con energia di attivazione $E_a$ cresce con la temperatura secondo la legge di Arrhenius, vista nel capitolo [Temperatura e attivazione](unit:chemistry-18). Con un fattore preesponenziale proporzionale a $\sqrt T$, come nella teoria delle collisioni, il rapporto fra le costanti di velocità a due temperature è

$$\begin{aligned}\frac{k(T_2)}{k(T_1)}&=\sqrt{\frac{T_2}{T_1}}\\&\quad\cdot\exp\!\left[-\frac{E_a}{R}\left(\frac{1}{T_2}-\frac{1}{T_1}\right)\right].\end{aligned}$$

Per $E_a=100$ kJ/mol, un valore tipico per la rottura o la formazione di legami covalenti, il rapporto fra la velocità a $92$ K e quella a $298$ K è circa $3\cdot10^{-40}$: una reazione che a temperatura ambiente richiede un secondo, a $92$ K richiederebbe un tempo enormemente più lungo dell'età dell'universo. Nella stratosfera, a $170$ K, il rapporto sale a circa $5\cdot10^{-14}$, ancora piccolissimo (figura 6).

::: figura arrhenius
{"w":760,"h":290,"items":[{"t":"axes","o":[90,250],"x":[640,"temperatura, K"],"y":[230,"k(T)/k(298 K)"],"sx":2.0,"sy":3.6,"xt":[[0,"50"],[50,"100"],[100,"150"],[150,"200"],[200,"250"],[250,"300"]],"yt":[[0,"10⁻⁶⁰"],[20,"10⁻⁴⁰"],[40,"10⁻²⁰"],[60,"1"]]},{"t":"plot","o":[90,250],"sx":2.0,"sy":3.6,"pts":[[0,50.9179751],[2,51.3283112],[4,51.7085615],[6,52.0619383],[8,52.3912118],[10,52.6987833],[12,52.9867451],[14,53.2569282],[16,53.5109422],[18,53.7502078],[20,53.9759835],[22,54.1893886],[24,54.3914212],[26,54.5829751],[28,54.7648522],[30,54.9377746],[32,55.1023943],[34,55.259301],[36,55.40903],[38,55.5520679],[40,55.6888582],[42,55.819806],[44,55.9452821],[46,56.0656262],[48,56.1811507],[50,56.2921428],[52,56.3988674],[54,56.5015692],[56,56.6004742],[58,56.6957919],[60,56.7877166],[62,56.8764289],[64,56.9620964],[66,57.0448756],[68,57.1249122],[70,57.2023422],[72,57.2772929],[74,57.3498832],[76,57.4202246],[78,57.4884218],[80,57.5545728],[82,57.6187698],[84,57.6810996],[86,57.7416438],[88,57.8004794],[90,57.857679],[92,57.913311],[94,57.9674401],[96,58.0201276],[98,58.0714313],[100,58.121406],[102,58.1701036],[104,58.2175736],[106,58.2638625],[108,58.3090147],[110,58.3530725],[112,58.396076],[114,58.4380633],[116,58.4790708],[118,58.519133],[120,58.558283],[122,58.5965523],[124,58.6339708],[126,58.6705673],[128,58.7063691],[130,58.7414024],[132,58.7756923],[134,58.8092627],[136,58.8421365],[138,58.8743357],[140,58.9058814],[142,58.9367936],[144,58.9670918],[146,58.9967946],[148,59.0259196],[150,59.0544841],[152,59.0825045],[154,59.1099965],[156,59.1369753],[158,59.1634556],[160,59.1894514],[162,59.2149763],[164,59.2400431],[166,59.2646646],[168,59.2888527],[170,59.3126192],[172,59.3359752],[174,59.3589317],[176,59.3814989],[178,59.4036871],[180,59.425506],[182,59.446965],[184,59.4680732],[186,59.4888393],[188,59.5092719],[190,59.5293791],[192,59.549169],[194,59.5686491],[196,59.587827],[198,59.6067097],[200,59.6253044],[202,59.6436177],[204,59.6616561],[206,59.6794261],[208,59.6969337],[210,59.7141849],[212,59.7311855],[214,59.7479411],[216,59.7644571],[218,59.7807387],[220,59.7967912],[222,59.8126194],[224,59.8282281],[226,59.8436222],[228,59.8588061],[230,59.8737842],[232,59.8885609],[234,59.9031403],[236,59.9175265],[238,59.9317234],[240,59.9457349],[242,59.9595647],[244,59.9732165],[246,59.9866938],[248,60.0],[250,60.0131385]],"c":"force3","w":2.4},{"t":"text","p":[114.0,50.3],"s":"Eₐ = 10 kJ/mol","c":"force3","size":10,"a":"start"},{"t":"plot","o":[90,250],"sx":2.0,"sy":3.6,"pts":[[0,16.1403682],[2,18.157982],[4,20.0264524],[6,21.7617479],[8,23.3776353],[10,24.8860466],[12,26.2973745],[14,27.6207134],[16,28.8640555],[18,30.0344535],[20,31.1381541],[22,32.1807103],[24,33.1670752],[26,34.1016806],[28,34.9885041],[30,35.8311256],[32,36.6327761],[34,37.3963788],[36,38.1245854],[38,38.8198064],[40,39.4842385],[42,40.119887],[44,40.7285872],[46,41.3120211],[48,41.8717337],[50,42.4091465],[52,42.9255694],[54,43.4222117],[56,43.9001917],[58,44.3605445],[60,44.8042304],[62,45.2321408],[64,45.6451049],[66,46.0438945],[68,46.4292293],[70,46.801781],[72,47.1621771],[74,47.511005],[76,47.8488146],[78,48.1761215],[80,48.4934097],[82,48.8011336],[84,49.0997209],[86,49.3895738],[88,49.6710715],[90,49.9445714],[92,50.2104108],[94,50.4689082],[96,50.7203647],[98,50.9650654],[100,51.2032799],[102,51.4352636],[104,51.6612589],[106,51.8814956],[108,52.0961919],[110,52.3055552],[112,52.5097825],[114,52.7090614],[116,52.9035702],[118,53.0934791],[120,53.2789499],[122,53.4601372],[124,53.6371882],[126,53.8102438],[128,53.9794381],[130,54.1448997],[132,54.3067513],[134,54.4651104],[136,54.6200892],[138,54.7717954],[140,54.9203322],[142,55.0657982],[144,55.2082883],[146,55.3478933],[148,55.4847003],[150,55.6187931],[152,55.7502521],[154,55.8791546],[156,56.0055748],[158,56.1295841],[160,56.2512512],[162,56.3706422],[164,56.4878207],[166,56.6028481],[168,56.7157833],[170,56.8266832],[172,56.9356028],[174,57.0425948],[176,57.1477103],[178,57.2509985],[180,57.352507],[182,57.4522816],[184,57.5503667],[186,57.646805],[188,57.741638],[190,57.8349057],[192,57.9266467],[194,58.0168984],[196,58.1056971],[198,58.1930778],[200,58.2790744],[202,58.3637198],[204,58.4470458],[206,58.5290831],[208,58.6098617],[210,58.6894105],[212,58.7677576],[214,58.8449302],[216,58.9209546],[218,58.9958565],[220,59.0696608],[222,59.1423915],[224,59.2140722],[226,59.2847254],[228,59.3543734],[230,59.4230376],[232,59.4907388],[234,59.5574973],[236,59.6233329],[238,59.6882646],[240,59.7523111],[242,59.8154905],[244,59.8778204],[246,59.939318],[248,60.0],[250,60.0598826]],"c":"force2","w":2.4},{"t":"text","p":[238.0,95.5],"s":"Eₐ = 50 kJ/mol","c":"force2","size":10,"a":"start"},{"t":"plot","o":[90,250],"sx":2.0,"sy":3.6,"pts":[[18,0.3897607],[20,2.5908673],[22,4.6698625],[24,6.6366427],[26,8.5000626],[28,10.2680691],[30,11.9478144],[32,13.5457534],[34,15.0677261],[36,16.5190297],[38,17.9044797],[40,19.2284638],[42,20.4949883],[44,21.7077186],[46,22.8700147],[48,23.9849625],[50,25.0554011],[52,26.0839468],[54,27.0730149],[56,28.0248385],[58,28.9414853],[60,29.8248725],[62,30.6767808],[64,31.4988655],[66,32.2926682],[68,33.0596258],[70,33.8010794],[72,34.5182825],[74,35.2124074],[76,35.8845521],[78,36.5357462],[80,37.1669558],[82,37.7790884],[84,38.3729975],[86,38.9494864],[88,39.5093117],[90,40.053187],[92,40.5817855],[94,41.0957432],[96,41.5956612],[98,42.0821081],[100,42.5556222],[102,43.0167135],[104,43.4658655],[106,43.903537],[108,44.3301634],[110,44.7461585],[112,45.1519156],[114,45.547809],[116,45.9341946],[118,46.3114117],[120,46.6797835],[122,47.0396183],[124,47.39121],[126,47.7348393],[128,48.0707744],[130,48.3992713],[132,48.7205751],[134,49.0349199],[136,49.34253],[138,49.6436201],[140,49.9383957],[142,50.227054],[144,50.5097839],[146,50.7867666],[148,51.0581761],[150,51.3241793],[152,51.5849367],[154,51.8406022],[156,52.0913241],[158,52.3372446],[160,52.5785008],[162,52.8152245],[164,53.0475427],[166,53.2755774],[168,53.4994464],[170,53.7192633],[172,53.9351372],[174,54.1471737],[176,54.3554745],[178,54.5601378],[180,54.7612583],[182,54.9589274],[184,55.1532336],[186,55.3442622],[188,55.5320957],[190,55.7168138],[192,55.8984938],[194,56.07721],[196,56.2530348],[198,56.4260379],[200,56.596287],[202,56.7638475],[204,56.9287828],[206,57.0911544],[208,57.2510218],[210,57.4084425],[212,57.5634727],[214,57.7161665],[216,57.8665765],[218,58.0147538],[220,58.1607478],[222,58.3046067],[224,58.4463772],[226,58.5861044],[228,58.7238326],[230,58.8596043],[232,58.9934612],[234,59.1254436],[236,59.2555909],[238,59.383941],[240,59.5105313],[242,59.6353976],[244,59.7585753],[246,59.8800983],[248,60.0],[250,60.1183127]],"c":"force4","w":2.4},{"t":"text","p":[258.0,130.2],"s":"Eₐ = 100 kJ/mol","c":"force4","size":10,"a":"start"},{"t":"line","p":[178.0,250.0,178.0,34.0],"c":"muted","w":1.1,"dash":true},{"t":"text","p":[182.0,242.8],"s":"superficie di Titano","c":"muted","size":10,"a":"start"},{"t":"line","p":[330.0,250.0,330.0,34.0],"c":"muted","w":1.1,"dash":true},{"t":"text","p":[334.0,242.8],"s":"stratosfera","c":"muted","size":10,"a":"start"}]}
---
Rapporto fra la costante di velocità a una temperatura $T$ e quella a $298$ K, in scala logaritmica, per tre energie di attivazione, secondo la legge di Arrhenius con fattore $\sqrt T$. Sono indicate la temperatura della superficie di Titano e quella della sua stratosfera.
:::

Le reazioni con barriere alte sono quindi congelate, e la chimica di Titano procede per altre vie: reazioni fra radicali, fra ioni e molecole, o di radicali con molecole stabili, che hanno energie di attivazione quasi nulle e restano veloci anche al freddo, come si è visto per la chimica interstellare. L'energia per creare i radicali la fornisce la luce ultravioletta, che a quelle quote abbonda.

::: legge Legge di van 't Hoff
La costante di equilibrio $K$ di una reazione con entalpia $\Delta_rH$ dipende dalla temperatura secondo $\mathrm d\ln K/\mathrm dT=\Delta_rH/(RT^2)$; se $\Delta_rH$ è costante,

$$\ln\frac{K_2}{K_1}=-\frac{\Delta_rH}{R}\left(\frac{1}{T_2}-\frac{1}{T_1}\right).$$

Per una reazione esotermica, $\Delta_rH<0$, la costante di equilibrio cresce quando la temperatura diminuisce.
:::

Il freddo ha quindi due effetti opposti. La termodinamica favorisce i prodotti delle reazioni esotermiche, come la combinazione di frammenti in molecole più grandi, e gli equilibri si spostano molto verso di loro. La cinetica rende invece lentissime tutte le reazioni con una barriera. Ciò che si forma su Titano dipende quindi da quali reazioni hanno vie prive di barriera, più che dalle costanti di equilibrio.

::: errore Un segno sbagliato
Nell'esempio 10.1 Shaw applica la legge di van 't Hoff alla formazione dell'ozono, $\mathrm O+\mathrm O_2\rightarrow\mathrm O_3$, con $\Delta_rH=-106{,}47$ kJ/mol e $K=1{,}05$ a $298$ K, e ottiene $K\approx8{,}85\cdot10^{-39}$ a $98$ K, concludendo che al freddo la reazione favorisce i reagenti. Il segno è sbagliato: con un'entalpia negativa $\ln K$ cresce di circa $87{,}7$ passando da $298$ a $98$ K, e $K$ diventa circa $1{,}3\cdot10^{38}$. Anche il valore riportato a $170$ K, $32{,}41$, è in realtà $\ln K$; la costante vale circa $1{,}2\cdot10^{14}$. Al freddo la reazione favorisce i prodotti, e il problema è la velocità.
:::

## L'interno: un oceano o una melma? {#interno}

Shaw riporta i modelli dell'epoca, che prevedevano sotto la crosta di ghiaccio un oceano di acqua e ammoniaca profondo fino a duecento chilometri. Nel 2012 Luciano Iess e collaboratori misurarono con Cassini quanto Titano si deforma sotto la marea di Saturno lungo la sua orbita leggermente ellittica. Il numero di Love $k_2$, la grandezza che esprime questa deformabilità, risultò circa $0{,}6$, troppo alto per un corpo interamente solido. Per più di dieci anni la spiegazione accettata è stata un oceano globale di acqua, probabilmente molto salata, sotto una crosta di ghiaccio spessa da cinquanta a cento chilometri, e sopra strati di ghiaccio ad alta pressione che lo separano dal nucleo roccioso, come su Ganimede.

Nel dicembre 2025 Flavio Petricca, Baptiste Journaux e collaboratori hanno rianalizzato gli stessi dati considerando anche il ritardo della deformazione rispetto alla forza di marea. Hanno trovato che Titano raggiunge la massima deformazione circa quindici ore dopo il massimo della forza, e che dissipa molta più energia di quanto farebbe un corpo con un oceano globale. Secondo il loro modello, sotto la crosta si trova uno spesso strato di ghiaccio ad alta pressione semifuso, una sorta di melma, al posto di un oceano aperto, con sacche e canali di acqua liquida che, scaldate dall'attrito, potrebbero arrivare a una ventina di gradi. Il volume totale d'acqua liquida resterebbe confrontabile con quello dell'Oceano Atlantico.

La questione è aperta, e ha conseguenze per l'abitabilità. Sacche d'acqua relativamente calde, vicine al nucleo roccioso e alimentate dalle molecole organiche che scendono dalla superficie attraverso il ghiaccio, sarebbero ambienti più concentrati di un oceano diluito, anche se più piccoli e isolati. Le misure di Dragonfly sulla superficie, compresi un sismometro e le misure del campo elettrico, potranno aiutare a decidere.

## Vita in un altro solvente? {#solventi}

L'acqua liquida in superficie manca, ma Titano offre un solvente diverso: il metano e l'etano dei laghi. È possibile una vita che usi questi liquidi al posto dell'acqua? Le difficoltà sono serie. Il metano e l'etano sono molecole **apolari**: sciolgono bene gli idrocarburi e altre molecole apolari, ma pochissimo i sali e le molecole polari, comprese quelle su cui si basa la biochimica terrestre. A $94$ K le reazioni sono lente, e l'energia disponibile è poca. Le membrane terrestri, formate da lipidi che espongono le teste polari all'acqua, in un solvente apolare non si formerebbero; servirebbero strutture invertite, con le parti polari all'interno. Nel capitolo [Membrane e protocellule](unit:biology-03) si è visto che le membrane di acrilonitrile proposte nel 2015, gli azotosomi, secondo calcoli successivi non si formerebbero spontaneamente.

Ci sono anche vantaggi. Un solvente apolare non idrolizza i polimeri, mentre in acqua i legami delle proteine e degli acidi nucleici tendono a spezzarsi; le molecole grandi potrebbero quindi durare a lungo. E l'energia chimica esiste: l'atmosfera contiene idrogeno, e la superficie acetilene ed etano prodotti dalla fotochimica, che potrebbero reagire con l'idrogeno liberando energia.

::: approfondimento Un'ipotesi da verificare
Nel 2005 Christopher McKay e Heather Smith proposero che organismi ipotetici nei laghi di Titano potessero ricavare energia dalla reazione dell'acetilene con l'idrogeno, $\mathrm{C_2H_2}+3\,\mathrm{H_2}\rightarrow2\,\mathrm{CH_4}$, e predissero due tracce osservabili: una diminuzione dell'idrogeno vicino al suolo e una scarsità di acetilene sulla superficie. Nel 2010 due analisi dei dati di Cassini trovarono un flusso di idrogeno diretto verso il basso e una quantità di acetilene al suolo minore del previsto. Gli stessi autori sottolinearono che entrambi i risultati hanno spiegazioni non biologiche, come reazioni chimiche sulla superficie o errori dei modelli; è un buon esempio di previsione verificabile, e del motivo per cui una previsione confermata non basta a dimostrare la vita.
:::

## Dragonfly {#dragonfly}

L'atmosfera densa e la gravità debole di Titano rendono il volo molto più facile che sulla Terra. Per sostenere in volo un oggetto di una certa massa serve una potenza che cresce con il suo peso e diminuisce con la densità dell'aria: su Titano il peso è circa sette volte minore e l'aria più di quattro volte più densa, e la potenza necessaria risulta circa quaranta volte minore. Da questa osservazione nasce Dragonfly, la missione della NASA selezionata nel 2019 nel programma New Frontiers: un drone a otto rotori, grande come un'automobile, alimentato da un generatore a radioisotopi.

Il lancio è previsto fra il 5 e il 25 luglio 2028 su un razzo Falcon Heavy, e l'arrivo su Titano nel 2034. Dragonfly atterrerà fra le dune del campo chiamato Shangri-La e, nel corso di una missione di più di tre anni, compirà voli di alcuni chilometri ciascuno fino al cratere Selk, largo circa $80$ km. Selk è un bersaglio scelto per l'astrobiologia: l'impatto che lo ha formato ha fuso il ghiaccio della crosta, e l'acqua liquida può essere rimasta a contatto con le molecole organiche della superficie per centinaia o migliaia di anni prima di gelare. È l'esperimento di chimica prebiotica che Titano ha condotto da solo, mescolando i prodotti della fotochimica con acqua liquida.

Dragonfly porta uno spettrometro di massa capace di analizzare campioni prelevati dal suolo con un trapano, uno spettrometro a raggi gamma e neutroni per misurare la composizione elementare sotto il veicolo, strumenti meteorologici e un sismometro, e camere per scegliere i luoghi di atterraggio. Cercherà molecole come amminoacidi e basi azotate, misurerà la loro chiralità e la distribuzione delle loro masse, e confronterà la chimica delle dune con quella dei materiali di Selk, che sono stati in contatto con l'acqua.

## Un'esperienza: che cosa scioglie che cosa {#esperienza}

La chimica in un solvente apolare come il metano liquido è molto diversa da quella in acqua. Olio da cucina e acqua permettono di vedere la differenza.

::: metodo Acqua e olio come solventi
**Materiale.** Sei bicchierini trasparenti, acqua, olio di semi, sale da cucina, zucchero, paprica o curcuma in polvere, un cucchiaino, sapone per piatti.

**Procedura.** Si mette acqua in tre bicchierini e olio negli altri tre. In una coppia di bicchierini, uno d'acqua e uno d'olio, si aggiunge un pizzico di sale; nella seconda coppia un pizzico di zucchero; nella terza un pizzico di paprica o curcuma. Si mescola per un minuto e si lascia riposare. Infine, in un bicchiere con metà acqua e metà olio, si aggiunge una goccia di sapone e si agita.

**Analisi.** Quali sostanze si sciolgono in acqua e quali nell'olio? Quale colore passa nell'olio? Che cosa fa il sapone all'interfaccia fra olio e acqua? Quali molecole della vita terrestre si scioglierebbero in un lago di metano?
:::

Il sale e lo zucchero, fatti di ioni e di molecole polari, si sciolgono in acqua e restano sul fondo dell'olio. I pigmenti della paprica e della curcuma, molecole lunghe e poco polari, colorano invece l'olio. Il sapone ha una testa polare e una coda apolare, e stabilizza goccioline d'olio in acqua o d'acqua in olio, come le membrane e le micelle del capitolo [Membrane e protocellule](unit:biology-03). Un lago di metano scioglierebbe gli idrocarburi e le molecole apolari, e quasi nulla delle molecole polari e dei sali su cui si basa la biochimica terrestre: una vita in quel solvente dovrebbe usare molecole del tutto diverse.

## Errori frequenti {#errori}

::: errore Credere che il colore arancione venga dalle nubi di metano
Il colore viene dalla nebbia di particelle organiche della stratosfera. Le nubi di metano sono rare e coprono di solito una piccola parte del cielo.
:::

::: errore Pensare che il freddo impedisca ogni chimica
Le reazioni con barriere alte sono congelate, ma quelle fra radicali e fra ioni e molecole restano veloci. L'energia della luce ultravioletta e delle particelle cariche produce i radicali, e la fotochimica di Titano forma molecole organiche complesse.
:::

::: errore Confondere l'equilibrio con la velocità
Per una reazione esotermica la costante di equilibrio cresce al diminuire della temperatura, ma la reazione può diventare lentissima. Al freddo la termodinamica favorisce spesso i prodotti, e la cinetica decide che cosa si forma davvero.
:::

::: errore Dare per certo l'oceano di Titano
Le misure di Cassini, interpretate per anni come prova di un oceano globale, sono state reinterpretate nel 2025 come uno strato di ghiaccio semifuso con sacche d'acqua liquida. La questione è aperta.
:::

::: errore Credere che un'atmosfera densa richieda un pianeta grande
Titano ha meno massa di Mercurio e un'atmosfera con quasi il doppio della massa di quella terrestre. Conta la temperatura, che rende lenta la fuga dei gas, e conta l'origine dei gas.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Titano ha un raggio di $2574{,}7$ km, gravità di $1{,}352$ m/s$^2$ e un'atmosfera di azoto con circa il $5{,}7\%$ di metano al suolo, a $93{,}65$ K e $1467$ hPa.
- L'altezza di scala $H=RT/(Mg)$ vale circa $20{,}6$ km, contro $8{,}4$ km sulla Terra; sopra ogni metro quadrato c'è più di dieci volte la massa d'aria terrestre.
- La fotochimica del metano e dell'azoto produce etano, acetilene, acido cianidrico, benzene e una nebbia di particelle organiche, simili ai tholin, che dà il colore arancione.
- L'effetto serra scalda la superficie di circa $21$ K, l'effetto anti-serra della nebbia la raffredda di circa $9$ K.
- Un ciclo del metano produce nubi, piogge, fiumi e laghi polari di metano ed etano; all'equatore si stendono dune di materiale organico.
- A $94$ K le reazioni con barriere alte sono congelate, mentre l'equilibrio delle reazioni esotermiche si sposta verso i prodotti.
- L'interno contiene acqua liquida in un oceano globale, secondo l'interpretazione del 2012, o in sacche dentro uno strato semifuso, secondo quella del 2025.
- Una vita nel metano liquido richiederebbe una biochimica diversa; Dragonfly, con lancio nel 2028 e arrivo nel 2034, studierà la chimica delle dune e del cratere Selk.
:::

## Glossario {#glossario}

- **Altezza di scala**: quota sulla quale la pressione di un'atmosfera isoterma si riduce di un fattore $\mathrm e$.
- **Anti-serra**: raffreddamento della superficie causato da uno strato che assorbe la luce solare in alto e la riemette nello spazio.
- **Apolare**: detto di una molecola con distribuzione di carica quasi uniforme, che scioglie bene altre molecole apolari.
- **Fotochimica**: chimica avviata dall'assorbimento di luce, in particolare ultravioletta.
- **Legge di van 't Hoff**: relazione fra la variazione della costante di equilibrio e la temperatura.
- **Numero di Love**: grandezza che misura quanto un corpo si deforma sotto una forza di marea.
- **Radicale**: frammento molecolare con un elettrone spaiato, molto reattivo.
- **Tholin**: solidi organici bruno-rossastri prodotti irradiando miscele di azoto e metano.

## Esercizi {#esercizi}

::: esercizio L'altezza di scala di Titano [base]
Calcolare l'altezza di scala di un'atmosfera di azoto, $M=0{,}028$ kg/mol, a $94$ K con $g=1{,}352$ m/s$^2$.
>>> soluzione
Si calcola

$$\begin{aligned}H&=\frac{RT}{Mg}=\frac{8{,}314\cdot94}{0{,}028\cdot1{,}352}\ \text{m}\\&\approx20{,}6\ \text{km}.\end{aligned}$$
:::

::: esercizio L'altezza di scala della Terra [base]
Calcolare l'altezza di scala dell'atmosfera terrestre con $T=288$ K, $M=0{,}029$ kg/mol e $g=9{,}81$ m/s$^2$.
>>> soluzione
Si calcola

$$H=\frac{8{,}314\cdot288}{0{,}029\cdot9{,}81}\ \text{m}\approx8{,}4\ \text{km}.$$
:::

::: esercizio L'aria sopra un metro quadrato [base]
La massa d'aria sopra ogni metro quadrato è $p/g$. Calcolarla per Titano, $p=146\,700$ Pa e $g=1{,}352$ m/s$^2$, e per la Terra, $p=101\,325$ Pa e $g=9{,}81$ m/s$^2$.
>>> soluzione
Su Titano circa $108\,500$ kg, sulla Terra circa $10\,330$ kg: più di dieci volte tanto.
:::

::: esercizio La luce che arriva [base]
Con un flusso solare di $1361$ W/m$^2$ a $1$ UA, quanto vale il flusso a $9{,}54$ UA? Che frazione è di quello terrestre?
>>> soluzione
$1361/9{,}54^2\approx15$ W/m$^2$, circa l'$1{,}1\%$.
:::

::: esercizio Gravità dimezzata [base]
Come cambia l'altezza di scala se la gravità si dimezza, a parità di temperatura e composizione? Calcolarla per Titano con $g=0{,}676$ m/s$^2$.
>>> soluzione
Raddoppia, perché $H$ è inversamente proporzionale a $g$: circa $41{,}3$ km.
:::

::: esercizio L'aria densa [base]
Calcolare la densità dell'aria al suolo di Titano con $\rho=pM/(RT)$, $p=146\,700$ Pa, $T=93{,}65$ K e massa molare media $0{,}0274$ kg/mol, e confrontarla con quella terrestre, circa $1{,}23$ kg/m$^3$.
>>> soluzione
Si calcola

$$\rho=\frac{146\,700\cdot0{,}0274}{8{,}314\cdot93{,}65}\ \tfrac{\text{kg}}{\text{m}^3}\approx5{,}2\ \tfrac{\text{kg}}{\text{m}^3},$$

circa quattro volte quella terrestre.
:::

::: esercizio La temperatura di equilibrio [medio]
Con un flusso di $15{,}0$ W/m$^2$ e un'albedo di $0{,}265$, calcolare la temperatura di equilibrio di Titano con $\sigma T^4=S(1-A)/4$, $\sigma=5{,}67\cdot10^{-8}$ W/(m$^2$·K$^4$). Di quanto è più calda la superficie misurata da Huygens?
>>> soluzione
Si calcola

$$T=\left[\frac{15{,}0\cdot0{,}735}{4\cdot5{,}67\cdot10^{-8}}\right]^{1/4}\ \text{K}\approx83{,}5\ \text{K},$$

circa dieci gradi meno dei $93{,}65$ K misurati.
:::

::: esercizio Il freddo e la velocità [medio]
Con la formula di Arrhenius con fattore $\sqrt T$ e $E_a=100$ kJ/mol, calcolare il rapporto fra la costante di velocità a $92$ K e quella a $298$ K, e fra quella a $170$ K e quella a $298$ K.
>>> soluzione
Si calcola

$$\begin{aligned}\frac{k(92)}{k(298)}&=\sqrt{\tfrac{92}{298}}\;\mathrm e^{-12\,028\,(1/92-1/298)}\\&\approx0{,}556\cdot\mathrm e^{-90{,}4}\approx3\cdot10^{-40},\end{aligned}$$

e allo stesso modo, a $170$ K, si ottiene $0{,}755\cdot\mathrm e^{-30{,}4}\approx5\cdot10^{-14}$.
:::

::: esercizio Salire nell'atmosfera [medio]
Con il modello isotermo e $H=20{,}6$ km, quale pressione si trova a $10$ km di quota su Titano, partendo da $1{,}467$ bar? A quale quota la pressione scende all'$1\%$ del valore al suolo, su Titano e sulla Terra?
>>> soluzione
$p=1{,}467\,\mathrm e^{-10/20{,}6}\approx0{,}90$ bar. La pressione scende all'$1\%$ a $H\ln100$: circa $95$ km su Titano e circa $39$ km sulla Terra.
:::

::: esercizio Il fondo di Ligeia Mare [medio]
Calcolare la pressione sul fondo di Ligeia Mare, a $160$ m di profondità, con densità del liquido di circa $450$ kg/m$^3$ e una pressione atmosferica di $146\,700$ Pa.
>>> soluzione
Si calcola

$$\begin{aligned}p&=146\,700+450\cdot1{,}352\cdot160\ \text{Pa}\\&\approx2{,}44\cdot10^5\ \text{Pa},\end{aligned}$$

circa $2{,}4$ bar.
:::

::: esercizio Molecole veloci e lente [medio]
Calcolare la velocità quadratica media $\sqrt{3RT/M}$ dell'azoto e dell'idrogeno molecolare a $94$ K, e confrontarle con la velocità di fuga di Titano, circa $2{,}64$ km/s.
>>> soluzione
Per l'azoto $\sqrt{3\cdot8{,}314\cdot94/0{,}028}\approx290$ m/s, per l'idrogeno circa $1080$ m/s. Entrambe sono minori della velocità di fuga, ma l'idrogeno, più veloce, ha molte più molecole nella coda veloce della distribuzione e sfugge, come osservato.
:::

::: esercizio Volare su Titano [medio]
Per un elicottero la potenza necessaria per restare sospeso cresce come $W^{3/2}/\sqrt\rho$, dove $W$ è il peso e $\rho$ la densità dell'aria. Con $g=1{,}352$ m/s$^2$ e $\rho=5{,}2$ kg/m$^3$ su Titano, $g=9{,}81$ m/s$^2$ e $\rho=1{,}225$ kg/m$^3$ sulla Terra, quale rapporto di potenza si ottiene per lo stesso veicolo?
>>> soluzione
Il rapporto è

$$\begin{aligned}&\left(\frac{1{,}352}{9{,}81}\right)^{3/2}\sqrt{\frac{1{,}225}{5{,}2}}\\&\quad\approx0{,}051\cdot0{,}49\approx0{,}025,\end{aligned}$$

circa quaranta volte meno potenza che sulla Terra.
:::

::: esercizio Il segno di van 't Hoff [avanzato]
Per $\mathrm O+\mathrm O_2\rightarrow\mathrm O_3$ si usino, come nell'esempio di Shaw, $\Delta_rH=-106{,}47$ kJ/mol e $K=1{,}05$ a $298$ K. Calcolare $K$ a $98$ K e a $170$ K con la legge di van 't Hoff, e dire se il freddo favorisce i reagenti o i prodotti.
>>> soluzione
Si ha $-\Delta_rH/R\approx12\,806$ K, e

$$\begin{aligned}\ln K_{98}&=\ln1{,}05+12\,806\left(\tfrac{1}{98}-\tfrac{1}{298}\right)\\&\approx0{,}05+87{,}70\approx87{,}75,\end{aligned}$$

quindi $K\approx1{,}3\cdot10^{38}$. A $170$ K, $\ln K\approx32{,}4$ e $K\approx1{,}2\cdot10^{14}$. Il freddo favorisce i prodotti di questa reazione esotermica.
:::

::: esercizio Chi sfugge dall'atmosfera [avanzato]
Il parametro di Jeans $\lambda=GMm/(kTr)$ confronta l'energia gravitazionale di una molecola con l'energia termica alla quota da cui le molecole sfuggono. Calcolarlo per azoto, metano e idrogeno a $r=4075$ km dal centro, cioè a circa $1500$ km di quota, con $T=150$ K e massa di Titano $1{,}345\cdot10^{23}$ kg. Le molecole sfuggono in modo apprezzabile quando $\lambda$ è minore di circa $10$-$15$.
>>> soluzione
Con $m=M_\text{mol}\cdot1{,}66\cdot10^{-27}$ kg si ottengono $\lambda\approx49$ per l'azoto, $28$ per il metano e $3{,}5$ per l'idrogeno: l'azoto e il metano restano, l'idrogeno sfugge rapidamente.
:::

::: esercizio La massa dell'atmosfera [avanzato]
Moltiplicando la massa per metro quadrato, circa $108\,500$ kg, per la superficie di Titano, calcolare la massa totale dell'atmosfera e confrontarla con quella terrestre, circa $5{,}15\cdot10^{18}$ kg.
>>> soluzione
La superficie è $4\pi\cdot(2{,}5747\cdot10^6)^2\approx8{,}33\cdot10^{13}$ m$^2$, e la massa circa $9{,}0\cdot10^{18}$ kg, circa $1{,}75$ volte quella terrestre, pur essendo la superficie di Titano meno di un sesto di quella della Terra.
:::

::: esercizio Pioggia lenta [avanzato]
Una goccia che cade a velocità limite equilibra peso e resistenza dell'aria, $mg\approx\tfrac12 C\rho_\text{aria}Av^2$. Per gocce di uguale forma e dimensione, la velocità limite scala quindi come $\sqrt{\rho_\text{liq}\,g/\rho_\text{aria}}$. Confrontare una goccia di metano su Titano, $\rho_\text{liq}=450$ kg/m$^3$, $g=1{,}352$ m/s$^2$, $\rho_\text{aria}=5{,}2$ kg/m$^3$, con una goccia d'acqua sulla Terra, $1000$ kg/m$^3$, $9{,}81$ m/s$^2$ e $1{,}23$ kg/m$^3$.
>>> soluzione
Il rapporto è

$$\begin{aligned}&\sqrt{\frac{450\cdot1{,}352/5{,}2}{1000\cdot9{,}81/1{,}23}}\\&\quad\approx\sqrt{\frac{117}{7976}}\approx0{,}12:\end{aligned}$$

le gocce di Titano cadono circa otto volte più lentamente, come fiocchi di neve terrestri.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, capitolo 10, scritto nell'estate del 2005, prima dei risultati principali di Cassini e di Huygens; i dati provengono dalle fonti primarie seguenti. Alcune affermazioni di Shaw sono state corrette: il colore arancione di Titano viene dalla nebbia organica, e le nubi di metano vi contribuiscono poco (§10.1); nell'esempio 10.1 la legge di van 't Hoff è applicata con il segno sbagliato, e i valori corretti sono $K\approx1{,}3\cdot10^{38}$ a $98$ K e $K\approx1{,}2\cdot10^{14}$ a $170$ K (§10.3); l'oceano di acqua e ammoniaca profondo duecento chilometri è un modello pre-Cassini, oggi discusso (§10.2 e §10.6); Titano è l'unica luna con un'atmosfera densa, mentre anche Venere, Marte e i pianeti giganti hanno atmosfere importanti (sintesi del capitolo 10).

1. M. Fulchignoni e collaboratori, *Nature* 438, 785 (2005): temperatura e pressione misurate da Huygens; H. B. Niemann e collaboratori, *Nature* 438, 779 (2005) e *Journal of Geophysical Research* 115, E12006 (2010): la composizione dell'atmosfera e gli isotopi; M. G. Tomasko e collaboratori, *Nature* 438, 765 (2005): le immagini della discesa.
2. Y. L. Yung, M. Allen, J. P. Pinto, *Astrophysical Journal Supplement* 55, 465 (1984): la fotochimica di Titano; J. H. Waite e collaboratori, *Science* 316, 870 (2007): gli ioni pesanti dell'alta atmosfera; C. Sagan, B. N. Khare, *Nature* 277, 102 (1979): i tholin.
3. C. P. McKay, J. B. Pollack, R. Courtin, *Science* 253, 1118 (1991): effetto serra e anti-serra.
4. E. R. Stofan e collaboratori, *Nature* 445, 61 (2007): i laghi; M. Mastrogiuseppe e collaboratori, *Geophysical Research Letters* 41, 1432 (2014): la profondità di Ligeia Mare; R. H. Brown e collaboratori, *Nature* 454, 607 (2008): l'etano di Ontario Lacus; E. P. Turtle e collaboratori, *Science* 331, 1414 (2011): le piogge; R. D. Lorenz e collaboratori, *Science* 312, 724 (2006): le dune.
5. L. Iess e collaboratori, *Science* 337, 457 (2012): la marea di Titano; F. Petricca e collaboratori, *Nature* (2025): l'interno semifuso.
6. C. P. McKay, H. D. Smith, *Icarus* 178, 274 (2005): l'ipotesi di vita nel metano; D. F. Strobel, *Icarus* 208, 878 (2010) e R. N. Clark e collaboratori, *Journal of Geophysical Research* 115, E10005 (2010): idrogeno e acetilene.
7. R. D. Lorenz e collaboratori, *Johns Hopkins APL Technical Digest* 34, 374 (2018): la missione Dragonfly; R. D. Lorenz e collaboratori, *Planetary Science Journal* 2, 24 (2021): il sito di atterraggio vicino al cratere Selk.
