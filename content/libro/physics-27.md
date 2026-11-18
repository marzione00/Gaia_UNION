---
unit: physics-27
titolo: Specchi, lenti e telescopi
sottotitolo: Riflessione e rifrazione, riflessione totale, specchi sferici e lenti sottili, il telescopio come strumento che raccoglie la luce, e la storia degli specchi sempre più grandi da Galileo all'Extremely Large Telescope
volume: Volume di fisica
fonte: Testo originale; riferimento principale D. Halliday, R. Resnick, J. Walker, Fundamentals of Physics, 12ª ed., moduli 33.5-33.7 e 34.1-34.5
---

## Prima di cominciare {#apertura}

Nell'estate del 1609 Galileo Galilei costruì a Padova un cannocchiale con due lenti, una convergente e una divergente, e nei mesi seguenti lo puntò verso il cielo. Nel marzo 1610 pubblicò il *Sidereus Nuncius*: la Luna aveva montagne e crateri, la Via Lattea si risolveva in innumerevoli stelle, attorno a Giove giravano quattro satelliti. Lo strumento ingrandiva una ventina di volte, ma la sua qualità più importante era un'altra: l'obiettivo, largo pochi centimetri, raccoglieva molta più luce della pupilla dell'occhio e rendeva visibili stelle che nessuno aveva mai visto.

Da allora la storia dell'astronomia è in gran parte la storia di strumenti capaci di raccogliere più luce e di formare immagini più nitide. Questo capitolo ne presenta la fisica: le leggi della riflessione e della rifrazione, il modo in cui specchi e lenti formano immagini, il funzionamento del telescopio e il motivo per cui i grandi telescopi moderni usano specchi e non lenti. Il capitolo [Onde elettromagnetiche e pressione della luce](unit:physics-26) ha descritto la luce come onda; qui basta l'approssimazione dell'**ottica geometrica**, in cui la luce viaggia lungo raggi rettilinei finché incontra superfici molto più grandi della lunghezza d'onda. I limiti di questa approssimazione, cioè la diffrazione, tornano in [Diffrazione e potere risolutivo](unit:physics-29).

::: obiettivi
- applicare la legge della riflessione e la legge di Snell, e spiegare la rifrazione atmosferica;
- calcolare l'angolo critico della riflessione totale e l'angolo di Brewster;
- usare l'equazione dei punti coniugati per specchi sferici e lenti sottili e calcolare l'ingrandimento;
- descrivere le aberrazioni sferica e cromatica e il motivo per cui i grandi telescopi sono riflettori;
- calcolare l'ingrandimento angolare di un telescopio e la scala dell'immagine sul piano focale;
- collegare il diametro dell'obiettivo alla luce raccolta e alla magnitudine limite;
- confrontare i grandi telescopi, da Hale a Keck, al James Webb Space Telescope e all'Extremely Large Telescope.
:::

## Riflessione e rifrazione {#snell}

Quando un raggio di luce incontra la superficie di separazione fra due mezzi trasparenti, una parte viene riflessa e una parte entra nel secondo mezzo cambiando direzione. Gli angoli si misurano rispetto alla **normale**, la retta perpendicolare alla superficie nel punto di incidenza. Le due leggi che governano il fenomeno erano note prima che si capisse la natura della luce: la riflessione era descritta già nell'antichità, la rifrazione fu formulata da Willebrord Snell nel 1621 e pubblicata da Cartesio nel 1637.

::: legge Riflessione e rifrazione
Il raggio riflesso e il raggio rifratto stanno nel piano che contiene il raggio incidente e la normale. L'angolo di riflessione è uguale all'angolo di incidenza, $\theta_1'=\theta_1$. Per il raggio rifratto vale la **legge di Snell**

$$n_1\sin\theta_1=n_2\sin\theta_2,$$

dove $n=c/v$ è l'**indice di rifrazione** del mezzo, il rapporto fra la velocità della luce nel vuoto e quella nel mezzo.
:::

L'indice di rifrazione dell'aria in condizioni normali vale circa $1{,}0003$, quello dell'acqua $1{,}333$, quello dei vetri ottici comuni fra $1{,}45$ e $1{,}9$. Un raggio che passa da un mezzo meno rifrangente a uno più rifrangente si avvicina alla normale; nel passaggio inverso se ne allontana. La figura 1 mostra un raggio che passa dall'aria all'acqua.

::: figura snell
{"w":760,"h":285,"items":[{"t":"rect","p":[60,150,640,120],"c":"muted","r":0},{"t":"line","p":[60,150,700,150],"c":"ax","w":1.6},{"t":"line","p":[380,30,380,270],"c":"ax","w":1.2,"dash":true},{"t":"arrow","p":[288.1,58.1,380,150],"c":"force","w":2.4,"head":8},{"t":"arrow","p":[380,150,471.9,58.1],"c":"force3","w":2.0,"head":8},{"t":"arrow","p":[380,150,449.0,260.2],"c":"force2","w":2.4,"head":8},{"t":"poly","pts":[[346.1,116.1],[347.4,114.8],[348.8,113.5],[350.3,112.3],[351.8,111.2],[353.3,110.1],[354.9,109.1],[356.5,108.1],[358.2,107.2],[359.9,106.4],[361.6,105.7],[363.4,105.0],[365.2,104.3],[367.0,103.8],[368.8,103.3],[370.6,102.9],[372.5,102.6],[374.4,102.3],[376.2,102.1],[378.1,102.0],[380.0,102.0]],"c":"force","w":1.4},{"t":"text","p":[346,94],"s":"45°","c":"force","size":11},{"t":"poly","pts":[[380.0,102.0],[381.9,102.0],[383.8,102.1],[385.6,102.3],[387.5,102.6],[389.4,102.9],[391.2,103.3],[393.0,103.8],[394.8,104.3],[396.6,105.0],[398.4,105.7],[400.1,106.4],[401.8,107.2],[403.5,108.1],[405.1,109.1],[406.7,110.1],[408.2,111.2],[409.7,112.3],[411.2,113.5],[412.6,114.8],[413.9,116.1]],"c":"force3","w":1.4},{"t":"text","p":[414,94],"s":"45°","c":"force3","size":11},{"t":"poly","pts":[[380.0,198.0],[381.3,198.0],[382.7,197.9],[384.0,197.8],[385.4,197.7],[386.7,197.5],[388.0,197.3],[389.3,197.1],[390.6,196.8],[392.0,196.5],[393.2,196.1],[394.5,195.7],[395.8,195.3],[397.1,194.9],[398.3,194.4],[399.5,193.8],[400.8,193.3],[402.0,192.7],[403.1,192.0],[404.3,191.4],[405.5,190.7]],"c":"force2","w":1.4},{"t":"text","p":[410,216],"s":"32°","c":"force2","size":11},{"t":"text","p":[90,136],"s":"aria, n = 1,000","c":"ax","size":12,"a":"start"},{"t":"text","p":[90,178],"s":"acqua, n = 1,333","c":"ax","size":12,"a":"start"},{"t":"text","p":[282.1,50.1],"s":"incidente","c":"force","size":11,"a":"end"},{"t":"text","p":[477.9,50.1],"s":"riflesso","c":"force3","size":11,"a":"start"},{"t":"text","p":[457.0,260.2],"s":"rifratto","c":"force2","size":11,"a":"start"},{"t":"text","p":[386,40],"s":"normale","c":"muted","size":10,"a":"start"}]}
---
Un raggio che passa dall'aria all'acqua con angolo di incidenza di $45°$ viene in parte riflesso con lo stesso angolo e in parte rifratto verso la normale, a circa $32°$, secondo la legge di Snell.
:::

L'indice di rifrazione dipende dalla lunghezza d'onda: in un vetro comune la luce blu ha un indice un poco maggiore della luce rossa. È la **dispersione**, che in un prisma separa i colori e che Newton usò nel 1666 per mostrare che la luce bianca è una miscela di colori. Per un telescopio a lenti la dispersione è un difetto, perché i diversi colori vengono focalizzati a distanze diverse.

La legge di Snell spiega anche un fenomeno che ogni osservatore del cielo deve correggere: la **rifrazione atmosferica**. L'atmosfera è più densa vicino al suolo, e il suo indice di rifrazione cresce scendendo. La luce di una stella attraversa strati di indice crescente e si incurva verso il basso; l'osservatore la vede arrivare da una direzione più alta di quella vera. L'effetto è nullo allo zenit, vale circa un primo d'arco a $45°$ di altezza e cresce rapidamente verso l'orizzonte, dove raggiunge circa $34'$, più del diametro apparente del Sole, che è di circa $32'$. Quando il Sole al tramonto sembra appoggiato all'orizzonte, in realtà è già tutto al di sotto. La rifrazione è maggiore per il bordo inferiore del disco che per quello superiore, e il Sole che tramonta appare schiacciato. Poiché dipende dalla lunghezza d'onda, la rifrazione allunga inoltre le immagini delle stelle basse in piccoli spettri verticali, e gli spettrografi dei grandi telescopi devono compensarla.

## Riflessione totale e angolo di Brewster {#totale}

Se la luce passa da un mezzo più rifrangente a uno meno rifrangente, per esempio dal vetro all'aria, l'angolo di rifrazione è maggiore dell'angolo di incidenza. Al crescere dell'angolo di incidenza si arriva a un valore per cui il raggio rifratto è radente alla superficie, $\theta_2=90°$; oltre quel valore la legge di Snell non ha soluzione e tutta la luce viene riflessa.

::: legge Angolo critico
La **riflessione totale** avviene per angoli di incidenza maggiori dell'angolo critico

$$\sin\theta_c=\frac{n_2}{n_1}\qquad(n_1>n_2).$$

Per il vetro con $n=1{,}5$ verso l'aria l'angolo critico vale circa $41{,}8°$; per l'acqua circa $48{,}6°$.
:::

La riflessione totale non perde luce, a differenza di uno specchio metallico che ne assorbe una parte. Per questo i prismi dei binocoli funzionano per riflessione totale, e le **fibre ottiche** guidano la luce per chilometri lungo un nucleo di vetro circondato da un rivestimento di indice un poco minore. In astronomia le fibre portano la luce dal piano focale di un telescopio a spettrografi stabili, lontani dalle vibrazioni e dalle variazioni di temperatura della montatura. Lo strumento DESI, sul telescopio Mayall di Kitt Peak, posiziona con piccoli robot cinquemila fibre, ciascuna sull'immagine di una galassia diversa, e misura migliaia di spettri in ogni esposizione.

Anche la riflessione parziale ha una proprietà notevole. La luce riflessa da una superficie trasparente è in generale parzialmente polarizzata, e per un angolo particolare, l'**angolo di Brewster**, la luce riflessa è polarizzata completamente, con il campo elettrico parallelo alla superficie. A quell'angolo il raggio riflesso e il raggio rifratto sono perpendicolari, e da $\theta_B+\theta_2=90°$ e dalla legge di Snell si ricava

$$\tan\theta_B=\frac{n_2}{n_1}.$$

Per l'acqua vale circa $53°$. Gli occhiali da sole polarizzati hanno l'asse verticale e bloccano proprio la luce riflessa dalle superfici orizzontali, come l'acqua o una strada bagnata.

## Specchi sferici {#specchi}

Uno specchio piano forma un'immagine virtuale, dietro lo specchio, alla stessa distanza dell'oggetto e delle stesse dimensioni: i raggi riflessi divergono come se provenissero da quel punto. Uno specchio curvo può invece concentrare i raggi. Per uno specchio **concavo**, la parte interna di una sfera di raggio $R$, i raggi paralleli all'asse e vicini a esso si riflettono passando per il **fuoco**, a metà strada fra il vertice e il centro della sfera: la **distanza focale** vale $f=R/2$.

::: legge Equazione dei punti coniugati
Per uno specchio sferico e per raggi vicini all'asse, la distanza $p$ dell'oggetto e la distanza $i$ dell'immagine dal vertice soddisfano

$$\frac1p+\frac1i=\frac1f,\qquad m=-\frac{i}{p},$$

dove $m$ è l'ingrandimento laterale. Per uno specchio concavo $f>0$; un'immagine con $i>0$ è reale e si forma davanti allo specchio, un'immagine con $i<0$ è virtuale. Un valore negativo di $m$ indica un'immagine capovolta.
:::

Per un oggetto molto lontano, come una stella, $1/p$ è praticamente nullo e l'immagine si forma nel fuoco: è il principio del telescopio a specchio. Per un oggetto a distanza finita l'immagine si sposta oltre il fuoco. Un oggetto posto a tre volte la distanza focale, per esempio, ha l'immagine a una volta e mezza la distanza focale, reale, capovolta e grande la metà. La figura 2 mostra i raggi principali: quello parallelo all'asse, che si riflette passando per il fuoco; quello che passa per il fuoco, che si riflette parallelo; quello che passa per il centro di curvatura, che torna su se stesso.

::: figura specchio
{"w":760,"h":310,"items":[{"t":"line","p":[60,170,720,170],"c":"ax","w":1.2},{"t":"poly","pts":[[622.4,40],[623.7,45],[625.0,50],[626.2,55],[627.4,60],[628.5,65],[629.6,70],[630.6,75],[631.6,80],[632.5,85],[633.3,90],[634.1,95],[634.9,100],[635.6,105],[636.2,110],[636.8,115],[637.4,120],[637.9,125],[638.3,130],[638.7,135],[639.1,140],[639.3,145],[639.6,150],[639.8,155],[639.9,160],[640.0,165],[640.0,170],[640.0,175],[639.9,180],[639.8,185],[639.6,190],[639.3,195],[639.1,200],[638.7,205],[638.3,210],[637.9,215],[637.4,220],[636.8,225],[636.2,230],[635.6,235],[634.9,240],[634.1,245],[633.3,250],[632.5,255],[631.6,260],[630.6,265],[629.6,270],[628.5,275],[627.4,280],[626.2,285],[625.0,290],[623.7,295],[622.4,300]],"c":"body","w":3.2},{"t":"circle","p":[520,170,3.5],"c":"ax"},{"t":"text","p":[520,190],"s":"F","c":"ax","size":12},{"t":"circle","p":[400,170,3.5],"c":"ax"},{"t":"text","p":[400,190],"s":"C","c":"ax","size":12},{"t":"arrow","p":[280,170,280,110],"c":"force","w":2.6,"head":8},{"t":"text","p":[280,100],"s":"oggetto","c":"force","size":11},{"t":"arrow","p":[460.0,170,460.0,200],"c":"force2","w":2.6,"head":8},{"t":"text","p":[464.0,218],"s":"immagine","c":"force2","size":11,"a":"start"},{"t":"line","p":[280,110,640,110],"c":"force3","w":1.4},{"t":"line","p":[640,110,460.0,200],"c":"force3","w":1.4},{"t":"line","p":[280,110,640,200.0],"c":"force4","w":1.4},{"t":"line","p":[640,200.0,420.0,200.0],"c":"force4","w":1.4},{"t":"line","p":[280,110,625.0,282.5],"c":"muted","w":1.4},{"t":"text","p":[648,38],"s":"specchio concavo","c":"body","size":11,"a":"start"},{"t":"text","p":[280,190],"s":"3f","c":"muted","size":11}]}
---
Formazione dell'immagine in uno specchio concavo di distanza focale $f$ per un oggetto posto a $3f$. I tre raggi principali si incontrano nell'immagine reale e capovolta, a $1{,}5f$ dallo specchio e grande la metà dell'oggetto.
:::

L'equazione dei punti coniugati vale soltanto per raggi vicini all'asse. In uno specchio sferico i raggi paralleli che colpiscono le zone esterne si riflettono attraversando l'asse un poco più vicino allo specchio di quelli centrali, e l'immagine di una stella diventa una macchia: è l'**aberrazione sferica**. Uno specchio a forma di **paraboloide** la elimina, perché tutti i raggi paralleli all'asse si riflettono esattamente nel fuoco. Gli specchi primari dei telescopi sono quindi paraboloidi o superfici simili, lavorate con una precisione di poche decine di nanometri, una piccola frazione della lunghezza d'onda della luce.

La storia del telescopio spaziale Hubble mostra quanto questa precisione conti. Dopo il lancio, nel 1990, le prime immagini risultarono sfocate: lo specchio primario di $2{,}4$ m era stato lavorato con una forma sbagliata, più piatta del previsto verso il bordo di circa $2{,}2$ μm, a causa di un errore nello strumento usato per controllarne la forma. Un errore di due millesimi di millimetro bastò a disperdere la luce di una stella in un alone. Nel dicembre 1993 gli astronauti della prima missione di manutenzione installarono ottiche correttive progettate per compensare esattamente l'aberrazione, e da allora Hubble produce immagini nitide.

## Lenti sottili {#lenti}

Una lente è un pezzo di vetro limitato da due superfici curve. Ogni superficie rifrange la luce secondo la legge di Snell; una lente più spessa al centro che ai bordi fa convergere i raggi paralleli in un fuoco, una lente più sottile al centro li fa divergere. Se lo spessore è piccolo rispetto ai raggi di curvatura delle superfici, la lente si dice **sottile** e si comporta in modo semplice.

::: legge Lenti sottili
La distanza focale di una lente sottile di indice $n$ in aria, con superfici di raggi $R_1$ e $R_2$, è data dall'equazione del costruttore di lenti

$$\frac1f=(n-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right).$$

Le distanze dell'oggetto e dell'immagine soddisfano la stessa equazione degli specchi, $1/p+1/i=1/f$, con l'immagine reale dalla parte opposta della lente rispetto all'oggetto.
:::

Per una lente biconvessa con superfici di raggio $20$ cm, cioè $R_1=20$ cm e $R_2=-20$ cm secondo la convenzione dei segni, e vetro con $n=1{,}5$, la distanza focale vale $20$ cm. La figura 3 mostra la formazione dell'immagine.

::: figura lente
{"w":760,"h":290,"items":[{"t":"line","p":[40,150,740,150],"c":"ax","w":1.2},{"t":"poly","pts":[[390,50],[400,42],[410,50],[410,250],[400,258],[390,250]],"c":"body","w":2.4,"close":true},{"t":"circle","p":[305,150,3.5],"c":"ax"},{"t":"text","p":[305,170],"s":"F","c":"ax","size":12},{"t":"circle","p":[495,150,3.5],"c":"ax"},{"t":"text","p":[495,170],"s":"F′","c":"ax","size":12},{"t":"arrow","p":[115,150,115,90],"c":"force","w":2.6,"head":8},{"t":"text","p":[115,80],"s":"oggetto","c":"force","size":11},{"t":"arrow","p":[542.5,150,542.5,180],"c":"force2","w":2.6,"head":8},{"t":"text","p":[548.5,198],"s":"immagine","c":"force2","size":11,"a":"start"},{"t":"line","p":[115,90,400,90],"c":"force3","w":1.4},{"t":"line","p":[400,90,582.5,205.3],"c":"force3","w":1.4},{"t":"line","p":[115,90,582.5,188.4],"c":"muted","w":1.4},{"t":"line","p":[115,90,400,180.0],"c":"force4","w":1.4},{"t":"line","p":[400,180.0,582.5,180.0],"c":"force4","w":1.4},{"t":"text","p":[115,170],"s":"3f","c":"muted","size":11},{"t":"text","p":[400,30],"s":"lente convergente","c":"body","size":11}]}
---
Formazione dell'immagine in una lente convergente sottile per un oggetto a $3f$: il raggio parallelo all'asse passa per il secondo fuoco, il raggio che passa per il centro della lente prosegue diritto, il raggio che passa per il primo fuoco esce parallelo. L'immagine è reale, capovolta e grande la metà.
:::

Le lenti soffrono di un difetto che gli specchi non hanno. L'indice di rifrazione dipende dalla lunghezza d'onda, e con esso la distanza focale: la luce blu viene focalizzata più vicino alla lente della luce rossa, e l'immagine di una stella appare circondata da un alone colorato. È l'**aberrazione cromatica**. Newton la riteneva impossibile da correggere e per questo costruì nel 1668 il primo telescopio a specchio funzionante. Nel 1758 John Dollond brevettò il **doppietto acromatico**, una coppia di lenti di vetri diversi, una convergente e una divergente, le cui dispersioni si compensano per due lunghezze d'onda. I doppietti resero possibili i grandi rifrattori dell'Ottocento.

## Il telescopio {#telescopio}

Il telescopio astronomico più semplice, proposto da Keplero nel 1611, è formato da due lenti convergenti. L'**obiettivo**, di grande distanza focale $f_{\rm ob}$, forma nel proprio fuoco un'immagine reale e capovolta degli oggetti lontani. L'**oculare**, di piccola distanza focale $f_{\rm oc}$, è posto in modo che quell'immagine cada nel suo fuoco: i raggi escono di nuovo paralleli e l'occhio li vede come se provenissero da un oggetto lontano, ma sotto un angolo maggiore.

::: legge Ingrandimento angolare e scala dell'immagine
Il rapporto fra l'angolo sotto cui si vede l'oggetto nel telescopio e quello a occhio nudo vale

$$M=-\frac{f_{\rm ob}}{f_{\rm oc}},$$

dove il segno indica un'immagine capovolta. Sul piano focale dell'obiettivo un angolo $\theta$ in radianti corrisponde alla distanza $s=f_{\rm ob}\,\theta$: la **scala dell'immagine** vale $206\,265''/f_{\rm ob}$ per unità di lunghezza.
:::

Con un obiettivo di $900$ mm e un oculare di $25$ mm l'ingrandimento è $36$ volte; cambiando l'oculare con uno di $10$ mm diventa $90$. L'ingrandimento si sceglie dunque cambiando l'oculare, ed è la meno importante fra le grandezze di un telescopio. La figura 4 mostra lo schema.

::: figura telescopio
{"w":760,"h":330,"items":[{"t":"line","p":[40,150,740,150],"c":"ax","w":1.2},{"t":"poly","pts":[[112,55],[120,47],[128,55],[128,245],[120,253],[112,245]],"c":"body","w":2.2,"close":true},{"t":"poly","pts":[[642,105],[650,97],[658,105],[658,195],[650,203],[642,195]],"c":"body","w":2.2,"close":true},{"t":"line","p":[540,40,540,260],"c":"muted","w":1.2,"dash":true},{"t":"line","p":[40,73.7,120,80],"c":"force","w":1.4},{"t":"line","p":[120,80,540,183.1],"c":"force","w":1.4},{"t":"line","p":[40,143.7,120,150],"c":"force","w":1.4},{"t":"line","p":[120,150,540,183.1],"c":"force","w":1.4},{"t":"line","p":[40,213.7,120,220],"c":"force","w":1.4},{"t":"line","p":[120,220,540,183.1],"c":"force","w":1.4},{"t":"line","p":[540,183.1,650,120],"c":"force2","w":1.4},{"t":"line","p":[650,120,770,83.9],"c":"force2","w":1.4},{"t":"line","p":[540,183.1,650,150],"c":"force2","w":1.4},{"t":"line","p":[650,150,770,113.9],"c":"force2","w":1.4},{"t":"line","p":[540,183.1,650,180],"c":"force2","w":1.4},{"t":"line","p":[650,180,770,143.9],"c":"force2","w":1.4},{"t":"text","p":[120,35],"s":"obiettivo, f_ob","c":"body","size":11},{"t":"text","p":[650,88],"s":"oculare, f_oc","c":"body","size":11},{"t":"text","p":[540,278],"s":"fuoco comune","c":"muted","size":10},{"t":"line","p":[120,315,540,315],"c":"muted","w":1.2},{"t":"text","p":[330.0,308],"s":"f_ob","c":"muted","size":11},{"t":"line","p":[540,315,650,315],"c":"muted","w":1.2},{"t":"text","p":[595.0,308],"s":"f_oc","c":"muted","size":11},{"t":"text","p":[40,255],"s":"luce da una stella","c":"force","size":11,"a":"start"}]}
---
Schema di un telescopio kepleriano. L'obiettivo forma nel fuoco comune un'immagine reale e capovolta di un oggetto lontano; l'oculare la trasforma di nuovo in raggi paralleli, inclinati di un angolo maggiore. L'ingrandimento angolare è il rapporto fra le due distanze focali.
:::

Nei telescopi moderni l'occhio è sostituito da un rivelatore posto nel piano focale, e conta la scala dell'immagine. Un telescopio di $10$ m di distanza focale ha una scala di circa $20''$ per millimetro: la Luna, larga circa mezzo grado, vi forma un'immagine di circa $9$ cm. Il rapporto fra distanza focale e diametro, il **rapporto focale** $f/D$, fissa invece la luminosità dell'immagine di un oggetto esteso, come una nebulosa: a parità di rapporto focale, telescopi diversi danno immagini di uguale luminosità superficiale, più grandi nei telescopi più lunghi.

I telescopi a specchio sostituiscono l'obiettivo con uno specchio concavo. Nello schema di Newton uno specchio piano inclinato devia la luce verso un oculare laterale; nello schema di Cassegrain uno specchio secondario convesso la rimanda indietro attraverso un foro al centro del primario, allungando la distanza focale in un tubo corto. Gli specchi hanno tre vantaggi decisivi. Non producono aberrazione cromatica, perché la riflessione non dipende dalla lunghezza d'onda. La luce non attraversa il vetro, che può quindi essere opaco, con bolle, e anche alveolato per alleggerirlo. Soprattutto uno specchio si sostiene da dietro su tutta la superficie, mentre una lente si può reggere soltanto dal bordo e sotto il proprio peso si deforma. Il rifrattore più grande mai usato in astronomia, quello dell'osservatorio Yerkes, inaugurato nel 1897, ha un obiettivo di circa $1$ m: da allora tutti i grandi telescopi sono riflettori.

## Raccogliere la luce {#raccolta}

Per un astronomo il compito principale di un telescopio è raccogliere luce. Una stella è così lontana che anche nei telescopi maggiori resta un punto; ciò che il telescopio può fare è concentrare sul rivelatore la luce caduta su una superficie grande, proporzionale al quadrato del diametro $D$. Rispetto alla pupilla dell'occhio adattato al buio, larga circa $7$ mm, un obiettivo di diametro $D$ raccoglie $(D/7\ {\rm mm})^2$ volte più luce.

La luminosità apparente delle stelle si misura in **magnitudini**, una scala ereditata dagli astronomi greci e resa quantitativa da Norman Pogson nel 1856: una differenza di $5$ magnitudini corrisponde a un rapporto $100$ fra i flussi, e le stelle più deboli hanno magnitudini maggiori. In formula $m_1-m_2=-2{,}5\log_{10}(F_1/F_2)$. A occhio nudo, sotto un cielo buio, si vedono stelle fino a circa la sesta magnitudine.

::: legge Magnitudine limite di un telescopio
Se l'occhio vede al massimo stelle di magnitudine $m_{\rm occhio}$, un telescopio di diametro $D$ usato a occhio permette di vedere stelle fino a

$$m_{\rm lim}=m_{\rm occhio}+5\log_{10}\frac{D}{d_p},$$

dove $d_p\approx7$ mm è il diametro della pupilla. Il termine $5\log_{10}(D/d_p)$ è il guadagno in magnitudini dovuto alla maggiore raccolta della luce.
:::

La figura 5 mostra la relazione, che è il modello del laboratorio di questa unità. Un binocolo con obiettivi di $5$ cm guadagna circa $4{,}3$ magnitudini; un telescopio amatoriale di $10$ cm arriva circa alla magnitudine $11{,}8$; un telescopio di $1$ m alla $16{,}8$; uno di $10$ m alla $21{,}8$. Sotto un cielo inquinato dalla luce delle città, dove a occhio nudo si arriva alla quarta magnitudine o meno, tutti i valori calano di altrettanto.

::: figura raccolta
{"w":760,"h":290,"items":[{"t":"axes","o":[90,255],"x":[660,"diametro D, cm"],"y":[240,"magnitudine limite"],"sx":200,"sy":9,"xt":[[0,"1"],[1,"10"],[2,"100"]],"yt":[[0,"0"],[5,"5"],[10,"10"],[15,"15"],[20,"20"],[25,"25"]]},{"t":"plot","o":[90,255],"sx":200,"sy":9,"pts":[[0.0,6.7745098],[0.05,7.0245098],[0.1,7.2745098],[0.15,7.5245098],[0.2,7.7745098],[0.25,8.0245098],[0.3,8.2745098],[0.35,8.5245098],[0.4,8.7745098],[0.45,9.0245098],[0.5,9.2745098],[0.55,9.5245098],[0.6,9.7745098],[0.65,10.0245098],[0.7,10.2745098],[0.75,10.5245098],[0.8,10.7745098],[0.85,11.0245098],[0.9,11.2745098],[0.95,11.5245098],[1.0,11.7745098],[1.05,12.0245098],[1.1,12.2745098],[1.15,12.5245098],[1.2,12.7745098],[1.25,13.0245098],[1.3,13.2745098],[1.35,13.5245098],[1.4,13.7745098],[1.45,14.0245098],[1.5,14.2745098],[1.55,14.5245098],[1.6,14.7745098],[1.65,15.0245098],[1.7,15.2745098],[1.75,15.5245098],[1.8,15.7745098],[1.85,16.0245098],[1.9,16.2745098],[1.95,16.5245098],[2.0,16.7745098],[2.05,17.0245098],[2.1,17.2745098],[2.15,17.5245098],[2.2,17.7745098],[2.25,18.0245098],[2.3,18.2745098],[2.35,18.5245098],[2.4,18.7745098],[2.45,19.0245098],[2.5,19.2745098],[2.55,19.5245098],[2.6,19.7745098],[2.65,20.0245098],[2.7,20.2745098],[2.75,20.5245098],[2.8,20.7745098],[2.85,21.0245098],[2.9,21.2745098],[2.95,21.5245098],[3.0,21.7745098]],"c":"force2","w":2.4},{"t":"text","p":[550.0,80.5],"s":"cielo buio","c":"force2","size":10},{"t":"plot","o":[90,255],"sx":200,"sy":9,"pts":[[0.0,4.7745098],[0.05,5.0245098],[0.1,5.2745098],[0.15,5.5245098],[0.2,5.7745098],[0.25,6.0245098],[0.3,6.2745098],[0.35,6.5245098],[0.4,6.7745098],[0.45,7.0245098],[0.5,7.2745098],[0.55,7.5245098],[0.6,7.7745098],[0.65,8.0245098],[0.7,8.2745098],[0.75,8.5245098],[0.8,8.7745098],[0.85,9.0245098],[0.9,9.2745098],[0.95,9.5245098],[1.0,9.7745098],[1.05,10.0245098],[1.1,10.2745098],[1.15,10.5245098],[1.2,10.7745098],[1.25,11.0245098],[1.3,11.2745098],[1.35,11.5245098],[1.4,11.7745098],[1.45,12.0245098],[1.5,12.2745098],[1.55,12.5245098],[1.6,12.7745098],[1.65,13.0245098],[1.7,13.2745098],[1.75,13.5245098],[1.8,13.7745098],[1.85,14.0245098],[1.9,14.2745098],[1.95,14.5245098],[2.0,14.7745098],[2.05,15.0245098],[2.1,15.2745098],[2.15,15.5245098],[2.2,15.7745098],[2.25,16.0245098],[2.3,16.2745098],[2.35,16.5245098],[2.4,16.7745098],[2.45,17.0245098],[2.5,17.2745098],[2.55,17.5245098],[2.6,17.7745098],[2.65,18.0245098],[2.7,18.2745098],[2.75,18.5245098],[2.8,18.7745098],[2.85,19.0245098],[2.9,19.2745098],[2.95,19.5245098],[3.0,19.7745098]],"c":"force4","w":2.4},{"t":"text","p":[550.0,132.5],"s":"cielo cittadino","c":"force4","size":10},{"t":"circle","p":[229.8,162.6,4],"c":"force"},{"t":"text","p":[221.8,154.6],"s":"binocolo","c":"ax","size":10,"a":"end"},{"t":"circle","p":[290.0,149.0,4],"c":"force"},{"t":"text","p":[282.0,141.0],"s":"10 cm","c":"ax","size":10,"a":"end"},{"t":"circle","p":[490.0,104.0,4],"c":"force"},{"t":"text","p":[482.0,96.0],"s":"1 m","c":"ax","size":10,"a":"end"}]}
---
Magnitudine limite in funzione del diametro dell'obiettivo, su scala logaritmica, per un occhio che a occhio nudo arriva alla magnitudine $6$ sotto un cielo buio e alla magnitudine $4$ sotto un cielo cittadino. Ogni fattore dieci nel diametro guadagna cinque magnitudini, cioè un fattore cento nel flusso.
:::

I rivelatori elettronici hanno spostato questi limiti molto più in là. Un sensore CCD registra la maggior parte dei fotoni che lo colpiscono, contro pochi per cento per l'occhio, e accumula la luce per ore: il limite è fissato dal rumore del fondo del cielo e del rivelatore. Sommando centinaia di ore di esposizione, i campi ultraprofondi di Hubble hanno raggiunto galassie oltre la magnitudine $29$, centinaia di milioni di volte più deboli delle stelle più deboli visibili a occhio nudo. Per una sorgente puntiforme limitata dal rumore, a parità di rivelatore e di cielo, il tempo necessario per raggiungere una data precisione è inversamente proporzionale all'area del telescopio: un telescopio di $10$ m fa in un'ora ciò che uno di $1$ m fa in cento.

## Specchi sempre più grandi {#giganti}

Nel Novecento la corsa ai grandi telescopi è stata una corsa agli specchi. Il telescopio Hale di Monte Palomar, con uno specchio di $5{,}08$ m inaugurato nel 1948, rimase per decenni il più grande del mondo: uno specchio monolitico molto più grande diventa troppo pesante e si deforma con la temperatura e con l'inclinazione. La soluzione fu dividere lo specchio in segmenti. I telescopi Keck, sul Mauna Kea, entrati in funzione negli anni Novanta, hanno specchi di $10$ m formati da $36$ segmenti esagonali, mantenuti allineati da sensori e attuatori con una precisione di pochi nanometri. Oggi più di una dozzina di telescopi ha specchi primari di almeno $8$ m.

Il James Webb Space Telescope ha portato la stessa tecnica nello spazio. Il suo specchio primario di $6{,}5$ m è formato da $18$ segmenti esagonali di berillio ricoperti d'oro, che riflette bene l'infrarosso; ripiegato per entrare nella punta del razzo, si è aperto dopo il lancio, avvenuto il 25 dicembre 2021. La superficie di raccolta, circa $25$ m², è circa sei volte quella di Hubble.

Il prossimo passo è l'Extremely Large Telescope dell'ESO, in costruzione sul Cerro Armazones, nel deserto di Atacama in Cile, a $3046$ m di quota. Il suo specchio primario di $39$ m sarà formato da $798$ segmenti, per una superficie di raccolta di $978$ m²: più di tutti i grandi telescopi attuali messi insieme. Secondo il calendario aggiornato dall'ESO, la prima luce tecnica è prevista per il marzo 2029 e le prime osservazioni scientifiche per la fine del 2030. La figura 6 confronta i diametri.

::: figura giganti
{"w":760,"h":295,"items":[{"t":"rect","p":[150,50,93.0,18],"c":"force4","r":3},{"t":"text","p":[140,63],"s":"pupilla dell'occhio","c":"ax","size":11,"a":"end"},{"t":"text","p":[249.0,63],"s":"0,007 m","c":"ax","size":10,"a":"start"},{"t":"rect","p":[150,80,330.9,18],"c":"force2","r":3},{"t":"text","p":[140,93],"s":"Yerkes (1897)","c":"ax","size":11,"a":"end"},{"t":"text","p":[486.9,93],"s":"1,02 m","c":"ax","size":10,"a":"start"},{"t":"rect","p":[150,110,371.8,18],"c":"force2","r":3},{"t":"text","p":[140,123],"s":"Hubble (1990)","c":"ax","size":11,"a":"end"},{"t":"text","p":[527.8,123],"s":"2,4 m","c":"ax","size":10,"a":"start"},{"t":"rect","p":[150,140,407.6,18],"c":"force2","r":3},{"t":"text","p":[140,153],"s":"Hale (1948)","c":"ax","size":11,"a":"end"},{"t":"text","p":[563.6,153],"s":"5,08 m","c":"ax","size":10,"a":"start"},{"t":"rect","p":[150,170,419.4,18],"c":"force2","r":3},{"t":"text","p":[140,183],"s":"Webb (2021)","c":"ax","size":11,"a":"end"},{"t":"text","p":[575.4,183],"s":"6,5 m","c":"ax","size":10,"a":"start"},{"t":"rect","p":[150,200,440.0,18],"c":"force2","r":3},{"t":"text","p":[140,213],"s":"Keck (1993)","c":"ax","size":11,"a":"end"},{"t":"text","p":[596.0,213],"s":"10 m","c":"ax","size":10,"a":"start"},{"t":"rect","p":[150,230,505.0,18],"c":"force2","r":3},{"t":"text","p":[140,243],"s":"ELT (prima luce 2029)","c":"ax","size":11,"a":"end"},{"t":"text","p":[661.0,243],"s":"39 m","c":"ax","size":10,"a":"start"},{"t":"line","p":[150,262,700,262],"c":"ax","w":1.2},{"t":"line","p":[150,262,150,268],"c":"ax","w":1.2},{"t":"text","p":[150,282],"s":"1 mm","c":"ax","size":10},{"t":"line","p":[260,262,260,268],"c":"ax","w":1.2},{"t":"text","p":[260,282],"s":"1 cm","c":"ax","size":10},{"t":"line","p":[370,262,370,268],"c":"ax","w":1.2},{"t":"text","p":[370,282],"s":"10 cm","c":"ax","size":10},{"t":"line","p":[480,262,480,268],"c":"ax","w":1.2},{"t":"text","p":[480,282],"s":"1 m","c":"ax","size":10},{"t":"line","p":[590,262,590,268],"c":"ax","w":1.2},{"t":"text","p":[590,282],"s":"10 m","c":"ax","size":10},{"t":"text","p":[700,282],"s":"diametro","c":"ax","size":11,"a":"end"}]}
---
Diametri di alcuni strumenti, su scala logaritmica, dalla pupilla dell'occhio all'Extremely Large Telescope. La luce raccolta cresce con il quadrato del diametro: con i suoi $978$ m² l'ELT ne raccoglie circa venticinque milioni di volte più dell'occhio.
:::

Un telescopio grande raccoglie più luce, ma dal suolo non vede automaticamente più dettagli. La turbolenza dell'atmosfera sposta e deforma le immagini delle stelle molte volte al secondo, e con una lunga esposizione le allarga a circa un secondo d'arco, poco meno nei siti migliori. I grandi telescopi moderni la correggono con l'**ottica adattiva**: uno specchio deformabile, comandato centinaia o migliaia di volte al secondo dalle misure di una stella di riferimento o di una stella artificiale prodotta con un laser, cancella gran parte della distorsione. Il limite che resta è la diffrazione, tema del capitolo [Diffrazione e potere risolutivo](unit:physics-29).

## Un'esperienza: un telescopio con due lenti {#esperienza}

Un telescopio kepleriano funzionante si costruisce con una lente da occhiali da lettura e una lente d'ingrandimento. Le lenti da lettura si vendono per diottrie, l'inverso della distanza focale in metri: una lente da $+1$ diottria ha distanza focale di $1$ m, una da $+2$ di $50$ cm.

::: metodo Un telescopio con due lenti
1. Misurare la distanza focale delle due lenti: in una stanza, tenere la lente parallela a una parete opposta a una finestra luminosa e spostarla finché sulla parete compare l'immagine nitida e capovolta della finestra. La distanza fra lente e parete è, con buona approssimazione, la distanza focale. Non usare mai il Sole per questa misura.
2. Fissare la lente da lettura, l'obiettivo, all'estremità di un tubo di cartone o di un'asticella, e la lente d'ingrandimento, l'oculare, a una distanza pari alla somma delle due distanze focali.
3. Guardare attraverso l'oculare un oggetto lontano, come un campanile o un'antenna, e regolare la distanza fino a vedere l'immagine nitida, capovolta e ingrandita.
4. Stimare l'ingrandimento guardando con un occhio nel telescopio e con l'altro a occhio nudo un muro di mattoni lontano, e contando quanti mattoni visti a occhio nudo corrispondono a un mattone visto nel telescopio. Confrontare il risultato con il rapporto fra le distanze focali.
5. Osservare i bordi di un oggetto chiaro contro il cielo: compaiono frange colorate, la traccia dell'aberrazione cromatica di una lente semplice. Diaframmare l'obiettivo con un cartoncino forato riduce le frange ma rende l'immagine più scura.
6. Di sera, puntare il telescopio sulla Luna: con un obiettivo di $1$ m di focale e un oculare di $5$ cm l'ingrandimento è circa $20$, simile a quello del cannocchiale di Galileo.
:::

L'esperienza mostra che l'ingrandimento dipende dal rapporto delle focali, che l'immagine è capovolta e che una lente semplice produce aberrazione cromatica, il difetto che spinse Newton a costruire un telescopio a specchio.

## Errori frequenti {#errori}

::: errore Credere che l'ingrandimento sia la qualità principale di un telescopio
L'ingrandimento si cambia sostituendo l'oculare, e oltre un certo valore rende l'immagine soltanto più grande e più scura. Le qualità che contano sono il diametro, che fissa la luce raccolta e la risoluzione, e la qualità delle ottiche.
:::

::: errore Pensare che la rifrazione atmosferica sposti tutte le stelle allo stesso modo
La rifrazione è nulla allo zenit e cresce rapidamente verso l'orizzonte, dove supera mezzo grado. Una stella bassa appare più alta di dove si trova, e il suo spostamento dipende anche dalla lunghezza d'onda.
:::

::: errore Confondere la riflessione totale con la riflessione di uno specchio
Uno specchio metallico riflette a ogni angolo ma assorbe una parte della luce; la riflessione totale avviene soltanto oltre l'angolo critico, e soltanto passando da un mezzo più rifrangente a uno meno rifrangente, ma riflette tutta la luce.
:::

::: errore Applicare l'equazione dei punti coniugati a raggi lontani dall'asse
L'equazione $1/p+1/i=1/f$ vale per raggi vicini all'asse. Per specchi sferici molto aperti i raggi esterni vanno a fuoco in un punto diverso, e l'immagine soffre di aberrazione sferica: per questo gli specchi dei telescopi sono paraboloidi.
:::

::: errore Pensare che un telescopio più grande dia sempre immagini più nitide da terra
Senza ottica adattiva la turbolenza dell'atmosfera limita la nitidezza a circa un secondo d'arco qualunque sia il diametro. Il telescopio grande raccoglie più luce e vede oggetti più deboli; per vedere più dettagli servono l'ottica adattiva o lo spazio.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Nella riflessione l'angolo di riflessione è uguale a quello di incidenza; nella rifrazione vale la legge di Snell, $n_1\sin\theta_1=n_2\sin\theta_2$, con $n=c/v$.
- La rifrazione atmosferica alza le stelle basse, di circa $34'$ all'orizzonte; la dispersione separa i colori.
- Oltre l'angolo critico, $\sin\theta_c=n_2/n_1$, la riflessione è totale; all'angolo di Brewster, $\tan\theta_B=n_2/n_1$, la luce riflessa è polarizzata.
- Per specchi sferici e lenti sottili vale $1/p+1/i=1/f$ con $m=-i/p$; per uno specchio $f=R/2$, per una lente vale l'equazione del costruttore.
- L'aberrazione sferica si elimina con specchi parabolici, quella cromatica con doppietti acromatici o usando specchi.
- Un telescopio ha ingrandimento angolare $f_{\rm ob}/f_{\rm oc}$ e scala dell'immagine $206\,265''/f_{\rm ob}$; il rapporto focale fissa la luminosità delle immagini estese.
- La luce raccolta cresce come $D^2$; la magnitudine limite cresce di $5\log_{10}(D/d_p)$.
- Dal telescopio Hale di $5$ m si è passati agli specchi segmentati di Keck, del James Webb Space Telescope e dell'Extremely Large Telescope, con $39$ m e $798$ segmenti.
:::

## Glossario {#glossario}

- **Ottica geometrica**: descrizione della luce come raggi rettilinei, valida per ostacoli molto più grandi della lunghezza d'onda.
- **Indice di rifrazione**: rapporto $c/v$ fra la velocità della luce nel vuoto e nel mezzo.
- **Legge di Snell**: legge $n_1\sin\theta_1=n_2\sin\theta_2$ della rifrazione.
- **Dispersione**: dipendenza dell'indice di rifrazione dalla lunghezza d'onda.
- **Rifrazione atmosferica**: deviazione della luce delle stelle nell'atmosfera, che le fa apparire più alte.
- **Angolo critico**: angolo di incidenza oltre il quale la riflessione è totale.
- **Angolo di Brewster**: angolo di incidenza per cui la luce riflessa è completamente polarizzata.
- **Distanza focale**: distanza fra uno specchio o una lente e il punto in cui convergono i raggi paralleli all'asse.
- **Aberrazione sferica**: difetto degli specchi e delle lenti sferiche, in cui i raggi esterni vanno a fuoco in un punto diverso da quelli centrali.
- **Aberrazione cromatica**: difetto delle lenti, in cui colori diversi vanno a fuoco a distanze diverse.
- **Ingrandimento angolare**: rapporto fra l'angolo sotto cui si vede un oggetto nello strumento e a occhio nudo.
- **Scala dell'immagine**: angolo nel cielo che corrisponde a un'unità di lunghezza nel piano focale.
- **Rapporto focale**: rapporto fra distanza focale e diametro dell'obiettivo.
- **Magnitudine limite**: magnitudine delle stelle più deboli visibili con uno strumento.
- **Ottica adattiva**: correzione in tempo reale della turbolenza atmosferica con uno specchio deformabile.

## Esercizi {#esercizi}

::: esercizio Un raggio nell'acqua [base]
Un raggio di luce passa dall'aria all'acqua, con $n=1{,}333$, con un angolo di incidenza di $45°$. Calcolare l'angolo di rifrazione.
>>> soluzione
Dalla legge di Snell $\sin\theta_2=\sin45°/1{,}333\approx0{,}530$, quindi $\theta_2\approx32{,}0°$: il raggio si avvicina alla normale.
:::

::: esercizio Uno specchio concavo [base]
Uno specchio concavo ha raggio di curvatura $2$ m. Un oggetto si trova a $3$ m dallo specchio. Calcolare la posizione e l'ingrandimento dell'immagine.
>>> soluzione
La distanza focale vale $f=R/2=1$ m. Dall'equazione dei punti coniugati $1/i=1-1/3=2/3$, quindi $i=1{,}5$ m. L'ingrandimento è $m=-i/p=-0{,}5$: immagine reale, capovolta, grande la metà.
:::

::: esercizio Cambiare oculare [base]
Un telescopio ha un obiettivo di distanza focale $900$ mm. Calcolare l'ingrandimento angolare con oculari di $25$ mm e di $10$ mm.
>>> soluzione
L'ingrandimento è il rapporto fra le focali: $900/25=36$ e $900/10=90$. L'immagine è capovolta in entrambi i casi.
:::

::: esercizio Un telescopio da $20$ cm [base]
Quante volte più luce di una pupilla di $7$ mm raccoglie un telescopio di $20$ cm? Quale magnitudine limite raggiunge, se a occhio nudo si arriva alla $6$?
>>> soluzione
Il rapporto fra le aree è $(200/7)^2\approx816$. Il guadagno in magnitudini vale $5\log_{10}(200/7)\approx7{,}3$, quindi la magnitudine limite è circa $13{,}3$.
:::

::: esercizio L'angolo critico di un vetro [base]
Calcolare l'angolo critico per la luce che dal vetro, con $n=1{,}52$, passa nell'aria.
>>> soluzione
Si ha $\sin\theta_c=1/1{,}52\approx0{,}658$, quindi $\theta_c\approx41{,}1°$. Un raggio che colpisce la superficie interna con un angolo maggiore viene riflesso tutto.
:::

::: esercizio La Luna sul piano focale [base]
Un telescopio ha distanza focale $2$ m. Calcolare la scala dell'immagine in secondi d'arco per millimetro e la dimensione dell'immagine della Luna, larga $31'$.
>>> soluzione
La scala vale $206\,265''/2000\ {\rm mm}\approx103''$/mm. La Luna, $31'=1860''$, forma un'immagine di circa $1860/103\approx18$ mm.
:::

::: esercizio Rosso e blu nella stessa lente [medio]
Una lente biconvessa ha superfici di raggio $20$ cm. Il vetro ha indice $1{,}53$ per la luce blu e $1{,}51$ per la luce rossa. Calcolare le due distanze focali e la loro differenza.
>>> soluzione
Per una lente biconvessa simmetrica $1/f=2(n-1)/R$, quindi $f=R/(2(n-1))$. Si ottiene $f_{\rm blu}\approx18{,}9$ cm e $f_{\rm rosso}\approx19{,}6$ cm: i due colori vanno a fuoco a circa $0{,}7$ cm di distanza, e l'immagine di una stella si circonda di un alone colorato.
:::

::: esercizio Il Sole al tramonto [medio]
All'orizzonte la rifrazione atmosferica vale circa $34'$ e il raggio apparente del Sole circa $16'$. Quando il bordo inferiore del Sole sembra toccare l'orizzonte, dove si trova il Sole senza l'atmosfera?
>>> soluzione
In quel momento il centro appare a $16'$ di altezza. La rifrazione lo alza di circa $34'$, quindi la sua altezza vera è circa $16'-34'=-18'$, e il bordo superiore è a circa $-2'$: il Sole è già tutto sotto l'orizzonte.
:::

::: esercizio Riflessi sull'acqua e sul vetro [medio]
Calcolare l'angolo di Brewster per la luce che si riflette sull'acqua, $n=1{,}333$, e su un vetro con $n=1{,}5$.
>>> soluzione
Da $\tan\theta_B=n$ si ottiene $\theta_B\approx53{,}1°$ per l'acqua e $\theta_B\approx56{,}3°$ per il vetro. A questi angoli la luce riflessa è polarizzata con il campo parallelo alla superficie.
:::

::: esercizio Webb e Hubble [medio]
Lo specchio di Hubble ha diametro $2{,}4$ m; quello del James Webb Space Telescope ha una superficie di raccolta di circa $25$ m². Calcolare il rapporto fra le superfici, usando per Hubble l'area geometrica del cerchio, e il guadagno in magnitudini.
>>> soluzione
L'area di Hubble è $\pi\cdot1{,}2^2\approx4{,}5$ m², e il rapporto vale circa $5{,}5$. Il guadagno è $2{,}5\log_{10}5{,}5\approx1{,}9$ magnitudini. Con l'area efficace di Hubble, ridotta dallo specchio secondario, il rapporto sale a circa sei.
:::

::: esercizio L'ELT e l'occhio [medio]
Calcolare quante volte più luce dell'occhio, con una pupilla di $7$ mm, e di Hubble raccoglie l'Extremely Large Telescope, con $978$ m², e il guadagno in magnitudini rispetto all'occhio.
>>> soluzione
L'area della pupilla è $\pi(3{,}5\cdot10^{-3})^2\approx3{,}85\cdot10^{-5}$ m², e il rapporto vale circa $2{,}5\cdot10^{7}$. Il guadagno è $2{,}5\log_{10}(2{,}5\cdot10^{7})\approx18{,}5$ magnitudini. Rispetto ai $4{,}5$ m² di Hubble il rapporto è circa $220$.
:::

::: esercizio La pupilla d'uscita [medio]
I raggi che escono dall'oculare formano un fascio di diametro $D/M$, la pupilla d'uscita. Per un telescopio di $20$ cm con obiettivo di $1000$ mm di focale, quale ingrandimento minimo serve perché tutta la luce entri in una pupilla di $7$ mm, e con quale oculare?
>>> soluzione
Serve $D/M\le7$ mm, cioè $M\ge200/7\approx29$. La focale dell'oculare deve essere al massimo $1000/28{,}6\approx35$ mm; con un oculare più lungo una parte della luce raccolta resta fuori dall'occhio.
:::

::: esercizio Ore di telescopio [avanzato]
Per una sorgente puntiforme limitata dal rumore del cielo il tempo di esposizione necessario per una data precisione è inversamente proporzionale all'area del telescopio. Se un'osservazione richiede un'ora con un telescopio di $10$ m, quanto richiederebbe con uno di $1$ m, e quanto con l'ELT, stimando le aree dal quadrato dei diametri?
>>> soluzione
Con $1$ m il tempo cresce di $(10/1)^2=100$, quindi servono cento ore. Con l'ELT si riduce di $(39/10)^2\approx15$, e basta circa un quindicesimo d'ora, circa quattro minuti.
:::

::: esercizio L'errore dello specchio di Hubble [avanzato]
Uno specchio astronomico deve avere una forma corretta entro circa un ventesimo della lunghezza d'onda. Confrontare l'errore di $2{,}2$ μm dello specchio di Hubble con questa tolleranza per luce di $633$ nm e con la lunghezza d'onda di $500$ nm.
>>> soluzione
La tolleranza vale $633/20\approx32$ nm, e l'errore di Hubble era circa $70$ volte maggiore:

$$\frac{2200\ {\rm nm}}{31{,}7\ {\rm nm}}\approx69.$$

Rispetto a $500$ nm l'errore vale più di quattro lunghezze d'onda: abbastanza per disperdere la luce di una stella in un alone.
:::

::: esercizio Il cannocchiale di Galileo [avanzato]
Il cannocchiale di Galileo usava un obiettivo convergente e un oculare divergente. Con un obiettivo di focale $1{,}0$ m e un oculare di focale $-50$ mm, calcolare l'ingrandimento e la lunghezza del tubo, sapendo che i fuochi dalla parte dell'occhio coincidono.
>>> soluzione
L'ingrandimento vale $M=-f_{\rm ob}/f_{\rm oc}=+20$: il segno positivo indica un'immagine diritta, il vantaggio dello schema galileiano per l'uso terrestre. La distanza fra le lenti è $f_{\rm ob}+f_{\rm oc}=1000-50=950$ mm, più corta che in un telescopio kepleriano con lo stesso ingrandimento.
:::

::: esercizio Pixel e diffrazione [avanzato]
Un telescopio di $8{,}2$ m con rapporto focale $15$ ha un rivelatore con pixel di $15$ μm. Calcolare la scala in secondi d'arco per pixel e confrontarla con il raggio del disco di diffrazione, $1{,}22\lambda/D$, a $2{,}2$ μm.
>>> soluzione
La distanza focale vale $15\cdot8{,}2=123$ m e la scala $206\,265''/123\,000\ {\rm mm}\approx1{,}68''$/mm, cioè circa $0{,}025''$ per pixel. Il raggio del disco vale

$$1{,}22\cdot\frac{2{,}2\cdot10^{-6}}{8{,}2}\cdot206\,265''\approx0{,}068'',$$

circa $2{,}7$ pixel: l'immagine limitata dalla diffrazione, ottenuta con l'ottica adattiva, è campionata bene.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è D. Halliday, R. Resnick, J. Walker, *Fundamentals of Physics*, 12ª edizione estesa, Wiley, 2022, moduli 33.5 (riflessione e rifrazione), 33.6 (riflessione totale), 33.7 (polarizzazione per riflessione), 34.1 (specchi piani), 34.2 (specchi sferici), 34.3 (superfici rifrangenti sferiche), 34.4 (lenti sottili) e 34.5 (strumenti ottici); l'orientamento astronomico e i dati provengono dalle fonti primarie seguenti.

1. G. Galilei, *Sidereus Nuncius*, Venezia, 1610; I. Newton, *Philosophical Transactions of the Royal Society* 7, 4004 (1672): il telescopio a riflessione.
2. N. Pogson, *Monthly Notices of the Royal Astronomical Society* 17, 12 (1856): la scala delle magnitudini.
3. G. G. Bennett, *Journal of Navigation* 35, 255 (1982): la rifrazione astronomica vicino all'orizzonte.
4. L. Allen e collaboratori, *The Hubble Space Telescope Optical Systems Failure Report*, NASA, 1990: l'errore dello specchio primario.
5. M. W. McElwain e collaboratori, *Publications of the Astronomical Society of the Pacific* 135, 058001 (2023): il telescopio del James Webb Space Telescope.
6. ESO, schede tecniche e calendario dell'Extremely Large Telescope, aggiornamento 2025: diametro, segmenti, superficie di raccolta e date della prima luce.
7. DESI Collaboration, *Astronomical Journal* 164, 207 (2022): lo strumento a cinquemila fibre del telescopio Mayall.
