---
unit: chemistry-17
titolo: Velocità di reazione
sottotitolo: Misura della velocità, teoria degli urti, legge cinetica, ordini e tempo di dimezzamento
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §20-1–20-7, 20-8
---

## Prima di cominciare {#apertura}

Un fiammifero brucia in un secondo, un chiodo arrugginisce in mesi, una statua di marmo si consuma sotto la pioggia acida in secoli. Tutte sono reazioni chimiche, e tutte liberano energia; eppure procedono con velocità diversissime. La termochimica dice quanta energia si libera in una reazione, e il capitolo [Equilibrio chimico](unit:chemistry-19) dirà fin dove arriva. Nessuna delle due dice quanto tempo ci vuole.

La **cinetica chimica** studia quanto in fretta avviene una reazione e da che cosa dipende. È una delle parti della chimica con le applicazioni più dirette: decide la durata di conservazione di un alimento e di un farmaco, il dosaggio di un medicinale, il dimensionamento di un reattore industriale, la sicurezza di un magazzino di sostanze infiammabili, la velocità con cui un inquinante scompare dall'aria. Questo capitolo definisce e misura la velocità di reazione, ne spiega l'origine con il modello degli urti fra molecole, e introduce la legge cinetica e le leggi integrate che permettono di prevedere come cambiano le concentrazioni nel tempo. L'effetto della temperatura e dei catalizzatori sarà l'argomento del capitolo successivo, [Temperatura e attivazione](unit:chemistry-18).

::: obiettivi
- definire la velocità di una reazione e collegare fra loro le velocità riferite a reagenti e prodotti diversi;
- distinguere velocità media e velocità istantanea, e descrivere alcuni metodi di misura;
- spiegare con il modello degli urti perché la velocità dipende dalle concentrazioni, dall'energia e dall'orientazione delle molecole;
- scrivere una legge cinetica e ricavare gli ordini di reazione con il metodo delle velocità iniziali;
- usare le leggi integrate di ordine zero, uno e due, e riconoscere l'ordine dai grafici dei dati;
- calcolare e interpretare il tempo di dimezzamento.
:::

Il capitolo usa le concentrazioni molari del capitolo [Soluzioni e concentrazione](unit:chemistry-12) e la frequenza degli urti fra molecole stimata nel capitolo [Gas e stato aeriforme](unit:chemistry-10). Le funzioni esponenziali e i logaritmi naturali, che compaiono nelle leggi integrate, sono usati qui come strumenti di calcolo.

## La velocità di una reazione {#velocita}

La **velocità di reazione** misura quanto rapidamente cambia la concentrazione di un reagente o di un prodotto. Per un reagente A, la cui concentrazione diminuisce, si definisce la **velocità media** in un intervallo di tempo $\Delta t$ come

$$v=-\frac{\Delta[\mathrm A]}{\Delta t},$$

in $\mathrm{mol/(L\,s)}$. Il segno meno rende positiva la velocità, perché la concentrazione del reagente diminuisce e $\Delta[\mathrm A]$ è negativo; per un prodotto, la cui concentrazione cresce, il segno meno non serve.

Le concentrazioni delle diverse sostanze cambiano a ritmi diversi, legati dai coefficienti stechiometrici. Nella decomposizione del pentossido di diazoto,

$$2\,\mathrm{N_2O_5(g)}\longrightarrow4\,\mathrm{NO_2(g)}+\mathrm{O_2(g)},$$

per ogni mole di ossigeno che si forma scompaiono due moli di pentossido e se ne formano quattro di diossido: il diossido di azoto compare con una velocità quadrupla di quella dell'ossigeno. Per avere un'unica velocità della reazione si divide ogni variazione per il proprio coefficiente:

$$v=-\frac12\frac{\Delta[\mathrm{N_2O_5}]}{\Delta t}=\frac14\frac{\Delta[\mathrm{NO_2}]}{\Delta t}=\frac{\Delta[\mathrm{O_2}]}{\Delta t}.$$

## Velocità media e velocità istantanea {#istantanea}

La velocità di quasi tutte le reazioni diminuisce man mano che i reagenti si consumano. Il grafico della concentrazione di un reagente in funzione del tempo è quindi una curva, ripida all'inizio e sempre più piatta. La velocità media su un intervallo è la pendenza della retta che congiunge due punti della curva, cambiata di segno; la **velocità istantanea** in un dato momento è la pendenza della retta tangente alla curva in quel punto, il limite della velocità media per intervalli sempre più brevi:

$$v=-\frac{\mathrm d[\mathrm A]}{\mathrm dt}.$$

::: figura tangente
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[210,""],"sx":2.6,"sy":190,"xt":[[50,"50"],[100,"100"],[150,"150"]],"yt":[[0.25,"0,25"],[0.5,"0,50"],[0.75,"0,75"],[1.0,"1,00"]]},{"t":"text","p":[40,30],"s":"[A] (mol/L)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"tempo (s)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":2.6,"sy":190,"pts":[[0,1.0],[2,0.9762857],[4,0.9531338],[6,0.9305309],[8,0.908464],[10,0.8869204],[12,0.8658877],[14,0.8453538],[16,0.8253069],[18,0.8057353],[20,0.7866279],[22,0.7679735],[24,0.7497616],[26,0.7319815],[28,0.7146231],[30,0.6976763],[32,0.6811314],[34,0.6649789],[36,0.6492094],[38,0.6338138],[40,0.6187834],[42,0.6041094],[44,0.5897834],[46,0.5757971],[48,0.5621424],[50,0.5488116],[52,0.535797],[54,0.5230909],[56,0.5106862],[58,0.4985756],[60,0.4867523],[62,0.4752093],[64,0.46394],[66,0.452938],[68,0.4421969],[70,0.4317105],[72,0.4214728],[74,0.4114779],[76,0.40172],[78,0.3921935],[80,0.3828929],[82,0.3738129],[84,0.3649481],[86,0.3562937],[88,0.3478444],[90,0.3395955],[92,0.3315423],[94,0.32368],[96,0.3160041],[98,0.3085103],[100,0.3011942],[102,0.2940516],[104,0.2870784],[106,0.2802705],[108,0.2736241],[110,0.2671353],[112,0.2608004],[114,0.2546157],[116,0.2485777],[118,0.2426828],[120,0.2369278],[122,0.2313092],[124,0.2258239],[126,0.2204686],[128,0.2152403],[130,0.2101361],[132,0.2051528],[134,0.2002878],[136,0.1955381],[138,0.1909011],[140,0.186374],[142,0.1819542],[144,0.1776393],[146,0.1734267],[148,0.1693141],[150,0.1652989],[152,0.1613789],[154,0.157552],[156,0.1538157],[158,0.1501681],[160,0.146607],[162,0.1431303],[164,0.139736],[166,0.1364223],[168,0.1331871],[170,0.1300287],[172,0.1269452],[174,0.1239348],[176,0.1209957],[178,0.1181264],[180,0.1153251],[182,0.1125903],[184,0.1099203],[186,0.1073136],[188,0.1047687],[190,0.1022842]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":2.6,"sy":190,"pts":[[0,1],[55,0.34]],"c":"force4","w":1.8,"dash":true},{"t":"text","p":[227.0,201.4],"s":"tangente in t = 0","c":"force4","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":2.6,"sy":190,"pts":[[50,0.4819107],[160,0.0843344]],"c":"force4","w":1.8,"dash":true},{"t":"circle","p":[340.0,192.8,4],"c":"force4"},{"t":"text","p":[492.0,250.0],"s":"tangente in t = 100 s","c":"force4","size":11,"a":"end"},{"t":"plot","o":[80,250],"sx":2.6,"sy":190,"pts":[[20,0.7866279],[80,0.3828929]],"c":"force3","w":2.2},{"t":"circle","p":[132.0,100.5,4],"c":"force3"},{"t":"circle","p":[288.0,177.3,4],"c":"force3"},{"t":"text","p":[144.0,92.5],"s":"secante fra 20 e 80 s: velocità media","c":"force3","size":11,"a":"start"}]}
---
Concentrazione di un reagente in funzione del tempo. La pendenza della secante dà la velocità media fra $20$ e $80\un{s}$; le pendenze delle tangenti danno le velocità istantanee all'inizio, la **velocità iniziale**, e dopo $100\un{s}$, molto minore.
:::

La velocità iniziale, misurata quando si è consumata una piccola frazione dei reagenti, ha un vantaggio pratico: corrisponde a concentrazioni note, quelle di partenza, ed è libera dall'influenza dei prodotti che si accumulano e che in alcune reazioni rallentano o accelerano il processo.

## Come si misura la velocità {#misure}

Per misurare una velocità bisogna seguire nel tempo la concentrazione di almeno una sostanza, senza disturbare la reazione. I metodi dipendono dalle proprietà delle sostanze coinvolte.

- **Assorbimento della luce.** Se una sostanza è colorata, o assorbe nell'ultravioletto, la quantità di luce che attraversa la soluzione dipende dalla sua concentrazione; uno spettrofotometro la segue in continuo. È il metodo più diffuso.
- **Pressione o volume.** Nelle reazioni fra gas in cui cambia il numero di moli, la pressione a volume costante segue l'andamento della reazione; nelle reazioni che liberano un gas da una soluzione, si misura il volume di gas raccolto.
- **Conducibilità elettrica.** Se la reazione forma o consuma ioni, la conducibilità della soluzione cambia con l'avanzamento.
- **Prelievi.** Per le reazioni lente si prelevano campioni a intervalli regolari, si blocca la reazione raffreddandoli o diluendoli, e se ne analizza la composizione, per esempio con una titolazione o con la cromatografia.

Le reazioni più rapide richiedono metodi speciali. Nei dispositivi a flusso interrotto due soluzioni vengono mescolate in un millesimo di secondo e la miscela viene osservata con uno spettrofotometro. Con la fotolisi a lampo, sviluppata negli anni Cinquanta da Ronald Norrish e George Porter, un impulso di luce intensissimo fa partire la reazione, che viene seguita con un secondo impulso: il metodo valse loro, con Manfred Eigen, il premio Nobel per la chimica del 1967. Negli anni Ottanta Ahmed Zewail usò impulsi laser di pochi femtosecondi, $10^{-15}\un{s}$, per osservare i legami che si rompono e si formano durante una singola reazione, e ricevette il premio Nobel nel 1999.

## Da che cosa dipende la velocità {#fattori}

L'esperienza quotidiana e di laboratorio indica cinque fattori principali.

- **La natura dei reagenti.** Il sodio reagisce con l'acqua in modo violento, il ferro arrugginisce lentamente; le reazioni fra ioni in soluzione, come le precipitazioni e le neutralizzazioni, sono di solito istantanee, quelle che richiedono la rottura di legami covalenti forti possono essere lentissime.
- **Le concentrazioni.** Una scheggia di legno incandescente brucia lentamente nell'aria e si accende con una fiammata in ossigeno puro, dove la concentrazione di ossigeno è quasi cinque volte maggiore.
- **La temperatura.** Gli alimenti si conservano più a lungo in frigorifero; molte reazioni accelerano di due o tre volte ogni dieci gradi in più.
- **La superficie di contatto.** Quando uno dei reagenti è un solido, la reazione avviene sulla sua superficie. Un blocco di legno brucia lentamente, la segatura in sospensione nell'aria può esplodere.
- **I catalizzatori.** Alcune sostanze accelerano una reazione senza essere consumate: gli enzimi nei viventi, i metalli nelle marmitte catalitiche.

Il modello degli urti, descritto nel paragrafo seguente, spiega tutti questi effetti con un'unica idea.

## La teoria degli urti {#urti}

Perché due molecole reagiscano, devono incontrarsi. Il **modello degli urti** parte da questa osservazione e aggiunge due condizioni: l'urto deve avere un'energia sufficiente e un'orientazione adatta.

La frequenza degli urti in un gas è enorme. Nel capitolo sui gas si è stimato che una molecola di azoto, a temperatura ambiente e alla pressione di un bar, subisce circa sette miliardi di urti al secondo. Se ogni urto fra molecole di reagenti portasse alla reazione, le reazioni fra gas si completerebbero in miliardesimi di secondo. La maggior parte delle reazioni è invece molto più lenta: soltanto una piccolissima frazione degli urti è **efficace**.

La prima condizione riguarda l'energia. Per riorganizzare i legami le molecole devono urtarsi con un'energia almeno uguale a un valore minimo, l'**energia di attivazione**; gli urti più deboli fanno soltanto rimbalzare le molecole. La frazione di molecole con energia sufficiente cresce rapidamente con la temperatura, ed è il motivo per cui le reazioni accelerano scaldando, come si vedrà nel capitolo successivo.

La seconda condizione riguarda la geometria. Anche un urto energetico è inefficace se le molecole si incontrano dalla parte sbagliata.

::: figura urti
{"w":640,"h":300,"items":[{"t":"circle","p":[80,70,16],"c":"body"},{"t":"text","p":[80,74.5],"s":"A","c":"ax","size":13},{"t":"circle","p":[108,70,16],"c":"body"},{"t":"text","p":[108,74.5],"s":"B","c":"force2","size":13},{"t":"arrow","p":[220,70,150,70],"c":"muted","w":2,"head":8},{"t":"circle","p":[240,70,16],"c":"body"},{"t":"text","p":[240,74.5],"s":"C","c":"force3","size":13},{"t":"arrow","p":[290,70,350,70],"c":"force3","w":2.4,"head":9},{"t":"circle","p":[400,70,16],"c":"body"},{"t":"text","p":[400,74.5],"s":"A","c":"ax","size":13},{"t":"circle","p":[480,70,16],"c":"body"},{"t":"text","p":[480,74.5],"s":"B","c":"force2","size":13},{"t":"circle","p":[508,70,16],"c":"body"},{"t":"text","p":[508,74.5],"s":"C","c":"force3","size":13},{"t":"text","p":[330,110],"s":"urto con l'orientazione giusta: si forma B–C","c":"force3","size":12},{"t":"circle","p":[80,180,16],"c":"body"},{"t":"text","p":[80,184.5],"s":"A","c":"ax","size":13},{"t":"circle","p":[108,180,16],"c":"body"},{"t":"text","p":[108,184.5],"s":"B","c":"force2","size":13},{"t":"arrow","p":[36,248,52,200],"c":"muted","w":2,"head":8},{"t":"circle","p":[30,256,16],"c":"body"},{"t":"text","p":[30,260.5],"s":"C","c":"force3","size":13},{"t":"arrow","p":[290,200,350,200],"c":"force4","w":2.4,"head":9},{"t":"circle","p":[410,180,16],"c":"body"},{"t":"text","p":[410,184.5],"s":"A","c":"ax","size":13},{"t":"circle","p":[438,180,16],"c":"body"},{"t":"text","p":[438,184.5],"s":"B","c":"force2","size":13},{"t":"circle","p":[520,230,16],"c":"body"},{"t":"text","p":[520,234.5],"s":"C","c":"force3","size":13},{"t":"text","p":[330,286],"s":"C urta dalla parte di A: le molecole rimbalzano","c":"force4","size":12}]}
---
Nella reazione $\mathrm{A{-}B}+\mathrm C\to\mathrm A+\mathrm{B{-}C}$ l'urto è efficace soltanto se C colpisce la molecola dalla parte di B, dove si deve formare il nuovo legame; un urto dalla parte di A, anche energetico, lascia le molecole come prima.
:::

Il modello spiega in modo naturale i fattori elencati sopra. Raddoppiando la concentrazione di un reagente raddoppia la frequenza degli urti con l'altro; aumentando la superficie di un solido aumenta il numero di molecole esposte agli urti; scaldando crescono sia la frequenza degli urti sia, molto di più, la frazione di urti abbastanza energetici. Un catalizzatore offre alla reazione un percorso diverso, con un'energia di attivazione minore.

::: approfondimento Quanti urti sono efficaci
Per una reazione fra due gas a temperatura ambiente, se ogni urto fosse efficace, la costante di velocità, che si definirà fra poco, varrebbe circa $10^{11}\un{L/(mol\,s)}$. Le costanti misurate per le reazioni fra molecole stabili sono spesso milioni o miliardi di volte più piccole. Il rapporto fra la costante misurata e quella degli urti è la frazione di urti efficaci, e per molte reazioni è dell'ordine di un miliardesimo o meno. Le poche reazioni che si avvicinano al limite degli urti sono quelle fra radicali o fra atomi, che non devono rompere legami per reagire, e quelle fra ioni di carica opposta in soluzione, che si attraggono a distanza.
:::

## La legge cinetica {#legge}

Per molte reazioni la velocità, a temperatura costante, è proporzionale al prodotto delle concentrazioni dei reagenti, ciascuna elevata a una potenza. Per una reazione $a\,\mathrm A+b\,\mathrm B\to\text{prodotti}$ la **legge cinetica**, o equazione cinetica, si scrive

::: legge Legge cinetica
$$v=k\,[\mathrm A]^m\,[\mathrm B]^n,$$
dove $k$ è la **costante di velocità**, che dipende dalla reazione e dalla temperatura, e gli esponenti $m$ e $n$ sono gli **ordini di reazione** rispetto ad A e a B. La loro somma, $m+n$, è l'**ordine complessivo**.
:::

Gli ordini sono numeri piccoli, di solito $0$, $1$ o $2$, talvolta frazionari, e vanno **determinati sperimentalmente**: in generale non coincidono con i coefficienti dell'equazione bilanciata. La reazione fra idrogeno e iodio gassosi, $\mathrm H_2+\mathrm I_2\to2\,\mathrm{HI}$, ha legge cinetica $v=k[\mathrm H_2][\mathrm{I_2}]$; quella fra idrogeno e bromo, $\mathrm H_2+\mathrm{Br_2}\to2\,\mathrm{HBr}$, che ha la stessa forma, ha all'inizio legge cinetica $v=k[\mathrm H_2][\mathrm{Br_2}]^{1/2}$, come trovarono nel 1906 Max Bodenstein e Samuel Lind. La differenza nasce dal modo in cui la reazione avviene davvero, attraverso una sequenza di passaggi elementari, il suo **meccanismo**, che le equazioni bilanciate non mostrano.

Le unità della costante di velocità dipendono dall'ordine complessivo, perché la velocità ha sempre le unità $\mathrm{mol/(L\,s)}$: per l'ordine zero $k$ si misura in $\mathrm{mol/(L\,s)}$, per il primo ordine in $\mathrm s^{-1}$, per il secondo in $\mathrm{L/(mol\,s)}$, per il terzo in $\mathrm{L^2/(mol^2\,s)}$. Le unità di una costante di velocità rivelano quindi l'ordine della reazione.

## Il metodo delle velocità iniziali {#iniziali}

Il modo più diretto per trovare gli ordini consiste nel misurare la velocità iniziale in più esperimenti, cambiando la concentrazione iniziale di un reagente alla volta. Il rapporto fra due velocità dipende soltanto dal rapporto fra le concentrazioni del reagente variato, elevato al suo ordine.

::: esempio Trovare gli ordini
Per la reazione $2\,\mathrm A+\mathrm B\to\text{prodotti}$ si misurano a temperatura costante le velocità iniziali seguenti, che sono dati illustrativi.

| esperimento | $[\mathrm A]_0$ (M) | $[\mathrm B]_0$ (M) | $v_0$ (M/s) |
|---|---|---|---|
| 1 | $0{,}10$ | $0{,}10$ | $2{,}0\times10^{-4}$ |
| 2 | $0{,}20$ | $0{,}10$ | $8{,}0\times10^{-4}$ |
| 3 | $0{,}10$ | $0{,}20$ | $4{,}0\times10^{-4}$ |

Ricavare la legge cinetica e la costante di velocità.

Fra gli esperimenti 1 e 2 raddoppia $[\mathrm A]_0$ e la velocità quadruplica: $2^m=4$, quindi $m=2$. Fra 1 e 3 raddoppia $[\mathrm B]_0$ e la velocità raddoppia: $n=1$. La legge cinetica è $v=k[\mathrm A]^2[\mathrm B]$, del terzo ordine complessivo. Dall'esperimento 1 si ottiene $k=v_0/([\mathrm A]_0^2[\mathrm B]_0)$, cioè $0{,}20\un{L^2/(mol^2\,s)}$, e gli altri esperimenti danno lo stesso valore. La reazione fra monossido di azoto e ossigeno, $2\,\mathrm{NO}+\mathrm O_2\to2\,\mathrm{NO_2}$, che colora di bruno l'aria inquinata delle città, ha proprio una legge cinetica di questa forma.
:::

## Reazioni di ordine zero {#ordine-zero}

Nelle reazioni di **ordine zero** la velocità è indipendente dalla concentrazione del reagente, $v=k$. La concentrazione diminuisce linearmente nel tempo,

$$[\mathrm A]=[\mathrm A]_0-kt,$$

finché il reagente non si esaurisce. Le reazioni di ordine zero sono quasi sempre reazioni in cui il passaggio che limita la velocità riguarda qualcosa di diverso dal reagente in soluzione, come una reazione su una superficie catalitica completamente occupata, o una reazione catalizzata da un enzima saturo di substrato, che lavora alla massima velocità qualunque sia la quantità di substrato disponibile.

L'esempio più noto è l'eliminazione dell'alcol etilico dal corpo. L'enzima del fegato che lo ossida si satura già a basse concentrazioni di alcol, e la concentrazione dell'alcol nel sangue diminuisce di una quantità quasi costante ogni ora, in media circa $0{,}15\un{g/L}$, con differenze notevoli fra persona e persona.

::: figura ordine-zero
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[205,""],"sx":80,"sy":220,"xt":[[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"],[6,"6"]],"yt":[[0.2,"0,2"],[0.4,"0,4"],[0.6,"0,6"],[0.8,"0,8"]]},{"t":"text","p":[40,30],"s":"alcol nel sangue (g/L)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"tempo (h)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":80,"sy":220,"pts":[[0,0.8],[5.33333,0]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":80,"sy":220,"pts":[[0,0.5],[6.3,0.5]],"c":"force4","w":1.4,"dash":true},{"t":"text","p":[582.0,132.0],"s":"0,5 g/L","c":"force4","size":11,"a":"end"},{"t":"circle","p":[240.0,140.0,5],"c":"force4"},{"t":"text","p":[248.0,156.0],"s":"dopo 2 ore","c":"ax","size":11,"a":"start"},{"t":"text","p":[372.0,183.5],"s":"pendenza −0,15 g/L all'ora","c":"muted","size":11,"a":"start"}]}
---
Andamento tipico della concentrazione di alcol nel sangue dopo l'assorbimento, con una velocità di eliminazione costante di $0{,}15\un{g/L}$ all'ora. Partendo da $0{,}8\un{g/L}$ servono circa due ore per scendere sotto $0{,}5\un{g/L}$, il limite per la guida in Italia per la maggior parte dei conducenti, e più di cinque ore per eliminare tutto l'alcol.
:::

Bere molta acqua, prendere un caffè o fare una doccia fredda non accelerano l'eliminazione, che dipende dalla quantità di enzima disponibile: è la conseguenza pratica di una cinetica di ordine zero.

## Reazioni del primo ordine {#primo-ordine}

Nelle reazioni del **primo ordine** la velocità è proporzionale alla concentrazione di un solo reagente: $v=-\mathrm d[\mathrm A]/\mathrm dt=k[\mathrm A]$. In ogni istante si trasforma la stessa frazione del reagente rimasto, e la concentrazione diminuisce in modo esponenziale:

::: legge Legge integrata del primo ordine
$$[\mathrm A]=[\mathrm A]_0\,e^{-kt},\qquad\ln[\mathrm A]=\ln[\mathrm A]_0-kt.$$
:::

La seconda forma mostra che il logaritmo della concentrazione diminuisce linearmente nel tempo: riportando $\ln[\mathrm A]$ in funzione di $t$ si ottiene una retta di pendenza $-k$. È il modo più semplice per riconoscere una reazione del primo ordine e per misurarne la costante.

::: figura logaritmo
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[210,""],"sx":1.5,"sy":180,"xt":[[100,"100"],[200,"200"],[300,"300"]],"yt":[[0.25,"−0,75"],[0.5,"−0,50"],[0.75,"−0,25"],[1.0,"0,00"]]},{"t":"text","p":[40,30],"s":"ln [A]","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"tempo (s)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":1.5,"sy":180,"pts":[[0,1.0],[330,0.01]],"c":"force2","w":2.4},{"t":"circle","p":[80.0,70.0,5],"c":"force2"},{"t":"circle","p":[230.0,124.0,5],"c":"force2"},{"t":"circle","p":[380.0,178.0,5],"c":"force2"},{"t":"circle","p":[530.0,232.0,5],"c":"force2"},{"t":"text","p":[390.0,166.0],"s":"pendenza −k","c":"force2","size":12,"a":"start"}]}
---
Logaritmo della concentrazione di un reagente in funzione del tempo per una reazione del primo ordine con $k=3{,}0\times10^{-3}\un{s^{-1}}$. I punti stanno su una retta di pendenza $-k$.
:::

Il **tempo di dimezzamento**, $t_{1/2}$, è il tempo necessario perché la concentrazione si riduca alla metà. Ponendo $[\mathrm A]=[\mathrm A]_0/2$ nella legge integrata si ottiene

$$t_{1/2}=\frac{\ln2}{k}\simeq\frac{0{,}693}k.$$

Per una reazione del primo ordine il tempo di dimezzamento è indipendente dalla concentrazione iniziale. Dopo un tempo di dimezzamento resta la metà del reagente, dopo due un quarto, dopo tre un ottavo, dopo dieci circa un millesimo. Il decadimento dei nuclei radioattivi segue esattamente questa legge, e per questo i radioisotopi si caratterizzano con il loro tempo di dimezzamento.

::: figura dimezzamento
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[520,""],"y":[210,""],"sx":12.5,"sy":2.0,"xt":[[8,"8"],[16,"16"],[24,"24"],[32,"32"],[40,"40"]],"yt":[[25,"25"],[50,"50"],[75,"75"],[100,"100"]]},{"t":"text","p":[40,30],"s":"attività residua (%)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"tempo (giorni)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[0.0,100.0],[0.25,97.8624923],[0.5,95.770674],[0.75,93.7235685],[1.0,91.72022],[1.25,89.7596933],[1.5,87.8410729],[1.75,85.9634632],[2.0,84.1259876],[2.25,82.3277881],[2.5,80.5680253],[2.75,78.8458776],[3.0,77.1605409],[3.25,75.5112284],[3.5,73.8971701],[3.75,72.3176124],[4.0,70.7718179],[4.25,69.2590648],[4.5,67.778647],[4.75,66.3298732],[5.0,64.9120671],[5.25,63.5245666],[5.5,62.1667242],[5.75,60.8379056],[6.0,59.5374907],[6.25,58.2648723],[6.5,57.0194562],[6.75,55.8006609],[7.0,54.6079175],[7.25,53.4406691],[7.5,52.2983706],[7.75,51.180489],[8.0,50.0865021],[8.25,49.0158992],[8.5,47.9681806],[8.75,46.9428571],[9.0,45.9394499],[9.25,44.9574906],[9.5,43.9965208],[9.75,43.0560918],[10.0,42.1357645],[10.25,41.2351093],[10.5,40.3537057],[10.75,39.4911421],[11.0,38.6470159],[11.25,37.820933],[11.5,37.0125076],[11.75,36.2213624],[12.0,35.447128],[12.25,34.6894429],[12.5,33.9479534],[12.75,33.2223133],[13.0,32.5121838],[13.25,31.8172334],[13.5,31.1371376],[13.75,30.4715789],[14.0,29.8202465],[14.25,29.1828365],[14.5,28.5590511],[14.75,27.9485992],[15.0,27.3511957],[15.25,26.7665618],[15.5,26.1944245],[15.75,25.6345167],[16.0,25.0865769],[16.25,24.5503494],[16.5,24.0255838],[16.75,23.5120351],[17.0,23.0094635],[17.25,22.5176345],[17.5,22.0363183],[17.75,21.5652903],[18.0,21.1043306],[18.25,20.6532239],[18.5,20.2117596],[18.75,19.7797317],[19.0,19.3569384],[19.25,18.9431824],[19.5,18.5382704],[19.75,18.1420134],[20.0,17.7542265],[20.25,17.3747286],[20.5,17.0033424],[20.75,16.6398946],[21.0,16.2842156],[21.25,15.9361393],[21.5,15.5955031],[21.75,15.262148],[22.0,14.9359184],[22.25,14.616662],[22.5,14.3042297],[22.75,13.9984757],[23.0,13.6992572],[23.25,13.4064345],[23.5,13.119871],[23.75,12.8394327],[24.0,12.5649889],[24.25,12.2964113],[24.5,12.0335745],[24.75,11.7763559],[25.0,11.5246354],[25.25,11.2782955],[25.5,11.037221],[25.75,10.8012996],[26.0,10.570421],[26.25,10.3444774],[26.5,10.1233634],[26.75,9.9069757],[27.0,9.6952134],[27.25,9.4879774],[27.5,9.2851712],[27.75,9.0866999],[28.0,8.892471],[28.25,8.7023938],[28.5,8.5163794],[28.75,8.3343412],[29.0,8.156194],[29.25,7.9818547],[29.5,7.811242],[29.75,7.6442761],[30.0,7.4808791],[30.25,7.3209747],[30.5,7.1644883],[30.75,7.0113468],[31.0,6.8614787],[31.25,6.7148141],[31.5,6.5712844],[31.75,6.4308227],[32.0,6.2933634],[32.25,6.1588423],[32.5,6.0271965],[32.75,5.8983648],[33.0,5.7722868],[33.25,5.6489037],[33.5,5.5281579],[33.75,5.4099931],[34.0,5.2943541],[34.25,5.1811869],[34.5,5.0704386],[34.75,4.9620576],[35.0,4.8559932],[35.25,4.752196],[35.5,4.6506175],[35.75,4.5512102],[36.0,4.4539277],[36.25,4.3587246],[36.5,4.2655566],[36.75,4.17438],[37.0,4.0851523],[37.25,3.9978318],[37.5,3.9123779],[37.75,3.8287505],[38.0,3.7469107],[38.25,3.6668201],[38.5,3.5884416],[38.75,3.5117384],[39.0,3.4366747],[39.25,3.3632155],[39.5,3.2913265],[39.75,3.2209742],[40.0,3.1521256],[40.25,3.0847487],[40.5,3.0188119],[40.75,2.9542846],[41.0,2.8911365]],"c":"force2","w":2.6},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[8.02,0],[8.02,50.0]],"c":"muted","w":1.1,"dash":true},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[0,50.0],[8.02,50.0]],"c":"muted","w":1.1,"dash":true},{"t":"circle","p":[180.2,150.0,4],"c":"force"},{"t":"text","p":[186.2,142.0],"s":"50%","c":"ax","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[16.04,0],[16.04,25.0]],"c":"muted","w":1.1,"dash":true},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[0,25.0],[16.04,25.0]],"c":"muted","w":1.1,"dash":true},{"t":"circle","p":[280.5,200.0,4],"c":"force"},{"t":"text","p":[286.5,192.0],"s":"25%","c":"ax","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[24.06,0],[24.06,12.5]],"c":"muted","w":1.1,"dash":true},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[0,12.5],[24.06,12.5]],"c":"muted","w":1.1,"dash":true},{"t":"circle","p":[380.8,225.0,4],"c":"force"},{"t":"text","p":[386.8,217.0],"s":"12,5%","c":"ax","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[32.08,0],[32.08,6.25]],"c":"muted","w":1.1,"dash":true},{"t":"plot","o":[80,250],"sx":12.5,"sy":2.0,"pts":[[0,6.25],[32.08,6.25]],"c":"muted","w":1.1,"dash":true},{"t":"circle","p":[481.0,237.5,4],"c":"force"},{"t":"text","p":[487.0,229.5],"s":"6,25%","c":"ax","size":11,"a":"start"},{"t":"text","p":[420,80],"s":"ogni 8,02 giorni l'attività si dimezza","c":"muted","size":11}]}
---
Attività residua dello iodio $131$, usato in medicina per la diagnosi e la cura delle malattie della tiroide, in funzione del tempo. Il tempo di dimezzamento, $8{,}02$ giorni, è lo stesso qualunque sia la quantità iniziale.
:::

::: esempio Il tecnezio della medicina nucleare
Il tecnezio $99$m, l'isotopo più usato nella diagnostica per immagini, ha un tempo di dimezzamento di $6{,}01$ ore. Quale frazione dell'attività iniettata resta dopo sei ore, e dopo ventiquattro?

Dopo sei ore, quasi esattamente un tempo di dimezzamento, resta circa la metà. Dopo ventiquattro ore, cioè $24/6{,}01\simeq4{,}0$ tempi di dimezzamento, resta $0{,}5^{4{,}0}\simeq0{,}063$, circa il $6\%$. Il tempo di dimezzamento breve è la ragione della sua diffusione: il tecnezio rimane abbastanza a lungo per eseguire l'esame, e scompare in pochi giorni, riducendo la dose di radiazione ricevuta dal paziente.
:::

::: approfondimento La datazione con il carbonio 14
Nell'alta atmosfera i neutroni dei raggi cosmici trasformano continuamente una piccola parte dell'azoto in carbonio $14$, radioattivo, che si ossida ad anidride carbonica e, attraverso la fotosintesi e le catene alimentari, entra in tutti i viventi. Finché un organismo è vivo, scambia carbonio con l'ambiente, e il suo carbonio contiene una frazione costante di carbonio $14$: circa quattordici disintegrazioni al minuto per grammo di carbonio. Quando muore, gli scambi cessano, e il carbonio $14$ decade con un tempo di dimezzamento di $5730$ anni.

Misurando l'attività residua di un campione si ricava il tempo trascorso dalla morte: $t=\ln(A_0/A)/k$, con $k=\ln2/5730\simeq1{,}21\times10^{-4}$ all'anno. Un campione con il $30\%$ dell'attività originale ha circa $9950$ anni. Il metodo, sviluppato da Willard Libby alla fine degli anni Quaranta e premiato con il Nobel per la chimica nel 1960, funziona fino a circa cinquantamila anni, quando l'attività residua diventa troppo piccola da misurare; le date più precise si ottengono correggendo le piccole variazioni passate del carbonio $14$ atmosferico con le serie degli anelli degli alberi.
:::

## Reazioni del secondo ordine {#secondo-ordine}

Nelle reazioni del **secondo ordine** rispetto a un solo reagente la velocità è proporzionale al quadrato della sua concentrazione, $v=k[\mathrm A]^2$. La legge integrata è

$$\frac1{[\mathrm A]}=\frac1{[\mathrm A]_0}+kt:$$

riportando l'inverso della concentrazione in funzione del tempo si ottiene una retta di pendenza $k$. Il tempo di dimezzamento vale

$$t_{1/2}=\frac1{k[\mathrm A]_0},$$

e dipende dalla concentrazione iniziale: ogni dimezzamento richiede il doppio del tempo del precedente, perché la velocità cala con il quadrato della concentrazione. Le reazioni del secondo ordine rallentano quindi molto più di quelle del primo ordine quando i reagenti si diluiscono: è il caso di molte reazioni fra due molecole uguali, come la combinazione di due radicali.

Quando una reazione dipende da due reagenti, $v=k[\mathrm A][\mathrm B]$, e uno dei due è in grande eccesso, la sua concentrazione resta praticamente costante, e la reazione si comporta come se fosse del primo ordine rispetto all'altro, con una costante $k'=k[\mathrm B]_0$. Si parla di **pseudo primo ordine**. Molte reazioni in soluzione acquosa in cui partecipa l'acqua stessa, presente in enorme eccesso, sono di pseudo primo ordine. Lo stesso principio è alla base del **metodo dell'isolamento**: per studiare l'ordine rispetto a un reagente si mettono tutti gli altri in grande eccesso, così che la velocità dipenda soltanto da quello, e si ripete l'esperimento isolando a turno ciascun reagente.

## Passaggi elementari e meccanismo {#meccanismi}

La maggior parte delle reazioni avviene in più passaggi. Ogni **passaggio elementare** descrive un singolo evento molecolare: una molecola che si spezza, due molecole che si urtano e si trasformano. Soltanto per i passaggi elementari la legge cinetica si può scrivere direttamente dall'equazione: un passaggio in cui reagiscono due molecole, detto **bimolecolare**, ha una velocità proporzionale al prodotto delle loro concentrazioni, perché dipende dalla frequenza dei loro urti; un passaggio **unimolecolare** ha una velocità proporzionale alla concentrazione dell'unica molecola coinvolta. Gli urti simultanei di tre molecole sono rarissimi, e i passaggi con più di tre molecole non esistono in pratica.

Quando un passaggio è molto più lento degli altri, è lui a decidere la velocità complessiva, come la cassa più lenta di un supermercato decide la lunghezza della coda: si chiama **passaggio cinetico determinante**. La reazione fra diossido di azoto e monossido di carbonio, $\mathrm{NO_2}+\mathrm{CO}\to\mathrm{NO}+\mathrm{CO_2}$, a temperature inferiori a circa $225\,^\circ\mathrm{C}$ ha legge cinetica $v=k[\mathrm{NO_2}]^2$, nella quale il monossido di carbonio non compare. La spiegazione è un meccanismo in due passaggi: un primo passaggio lento, $2\,\mathrm{NO_2}\to\mathrm{NO_3}+\mathrm{NO}$, seguito da un secondo passaggio rapido, $\mathrm{NO_3}+\mathrm{CO}\to\mathrm{NO_2}+\mathrm{CO_2}$. La somma dei due passaggi dà la reazione complessiva, e la velocità è quella del primo, che coinvolge due molecole di diossido di azoto. Proporre un meccanismo e verificarne la coerenza con la legge cinetica misurata è uno dei compiti principali della cinetica chimica.

## Riconoscere l'ordine dai dati {#grafici}

Quando si dispone delle concentrazioni misurate a tempi diversi, l'ordine si riconosce provando quale grafico è lineare.

| ordine | grafico lineare | pendenza | $t_{1/2}$ |
|---|---|---|---|
| $0$ | $[\mathrm A]$ contro $t$ | $-k$ | $[\mathrm A]_0/2k$ |
| $1$ | $\ln[\mathrm A]$ contro $t$ | $-k$ | $\ln2/k$ |
| $2$ | $1/[\mathrm A]$ contro $t$ | $k$ | $1/k[\mathrm A]_0$ |

Un criterio rapido è il tempo di dimezzamento: se resta costante durante la reazione, l'ordine è uno; se raddoppia a ogni dimezzamento, l'ordine è due; se si dimezza, l'ordine è zero.

::: quotidiano Una compressa ogni otto ore
Quasi tutti i farmaci vengono eliminati dal corpo con una cinetica del primo ordine: il fegato e i reni rimuovono ogni ora la stessa frazione del farmaco presente. Il tempo di dimezzamento del farmaco nel sangue decide la frequenza delle dosi. La caffeina, per esempio, ha in un adulto sano un tempo di dimezzamento di circa cinque ore, con grandi differenze da persona a persona: il caffè del pomeriggio è ancora in circolo per metà all'ora di cena. Dopo cinque tempi di dimezzamento resta circa il $3\%$ di una dose, e il farmaco si considera eliminato. Se una dose si prende ogni tempo di dimezzamento, la quantità nel corpo cresce a ogni assunzione fino a stabilizzarsi fra un minimo pari a una dose e un massimo pari a due: per questo alcune terapie cominciano con una dose doppia, che porta subito al livello di regime.
:::

::: figura dosi
{"w":640,"h":306,"items":[{"t":"axes","o":[80,250],"x":[530,""],"y":[200,""],"sx":52,"sy":80,"xt":[[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"],[6,"6"],[7,"7"],[8,"8"],[9,"9"]],"yt":[[0.5,"0,5"],[1.0,"1,0"],[1.5,"1,5"],[2.0,"2,0"]]},{"t":"text","p":[40,30],"s":"quantità nel corpo (in dosi)","c":"ax","size":12,"a":"start"},{"t":"text","p":[610,292],"s":"tempo (in tempi di dimezzamento)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":52,"sy":80,"pts":[[0.0,1.0],[0.05,0.9659363],[0.1,0.933033],[0.15,0.9012505],[0.2,0.8705506],[0.25,0.8408964],[0.3,0.8122524],[0.35,0.7845841],[0.4,0.7578583],[0.45,0.7320428],[0.5,0.7071068],[0.55,0.6830201],[0.6,0.659754],[0.65,0.6372803],[0.7,0.6155722],[0.75,0.5946036],[0.8,0.5743492],[0.85,0.5547847],[0.9,0.5358867],[0.95,0.5176325],[1.0,0.5],[1.0,1.5],[1.05,1.4489045],[1.1,1.3995495],[1.15,1.3518757],[1.2,1.3058258],[1.25,1.2613446],[1.3,1.2183786],[1.35,1.1768761],[1.4,1.1367874],[1.45,1.0980643],[1.5,1.0606602],[1.55,1.0245302],[1.6,0.9896309],[1.65,0.9559205],[1.7,0.9233583],[1.75,0.8919053],[1.8,0.8615238],[1.85,0.8321771],[1.9,0.8038301],[1.95,0.7764487],[2.0,0.75],[2.0,1.75],[2.05,1.6903886],[2.1,1.6328077],[2.15,1.5771883],[2.2,1.5234635],[2.25,1.4715687],[2.3,1.4214417],[2.35,1.3730222],[2.4,1.326252],[2.45,1.281075],[2.5,1.2374369],[2.55,1.1952852],[2.6,1.1545694],[2.65,1.1152405],[2.7,1.0772514],[2.75,1.0405562],[2.8,1.0051111],[2.85,0.9708733],[2.9,0.9378018],[2.95,0.9058568],[3.0,0.875],[3.0,1.875],[3.05,1.8111306],[3.1,1.7494369],[3.15,1.6898446],[3.2,1.6322823],[3.25,1.5766808],[3.3,1.5229732],[3.35,1.4710952],[3.4,1.4209843],[3.45,1.3725803],[3.5,1.3258252],[3.55,1.2806627],[3.6,1.2370387],[3.65,1.1949006],[3.7,1.1541979],[3.75,1.1148817],[3.8,1.0769047],[3.85,1.0402214],[3.9,1.0047876],[3.95,0.9705609],[4.0,0.9375],[4.0,1.9375],[4.05,1.8715016],[4.1,1.8077514],[4.15,1.7461728],[4.2,1.6866917],[4.25,1.6292368],[4.3,1.573739],[4.35,1.5201317],[4.4,1.4683504],[4.45,1.418333],[4.5,1.3700194],[4.55,1.3233515],[4.6,1.2782733],[4.65,1.2347306],[4.7,1.1926712],[4.75,1.1520444],[4.8,1.1128015],[4.85,1.0748954],[4.9,1.0382805],[4.95,1.0029129],[5.0,0.96875],[5.0,1.96875],[5.05,1.9016871],[5.1,1.8369087],[5.15,1.7743368],[5.2,1.7138964],[5.25,1.6555148],[5.3,1.5991219],[5.35,1.5446499],[5.4,1.4920335],[5.45,1.4412094],[5.5,1.3921165],[5.55,1.3446959],[5.6,1.2988906],[5.65,1.2546456],[5.7,1.2119078],[5.75,1.1706258],[5.8,1.1307499],[5.85,1.0922324],[5.9,1.055027],[5.95,1.0190889],[6.0,0.984375],[6.0,1.984375],[6.05,1.9167799],[6.1,1.8514873],[6.15,1.7884189],[6.2,1.7274988],[6.25,1.6686538],[6.3,1.6118133],[6.35,1.5569091],[6.4,1.503875],[6.45,1.4526475],[6.5,1.403165],[6.55,1.3553681],[6.6,1.3091993],[6.65,1.2646031],[6.7,1.2215261],[6.75,1.1799164],[6.8,1.1397241],[6.85,1.100901],[6.9,1.0634002],[6.95,1.0271769],[7.0,0.9921875],[7.0,1.9921875],[7.05,1.9243263],[7.1,1.8587767],[7.15,1.7954599],[7.2,1.7343],[7.25,1.6752233],[7.3,1.6181591],[7.35,1.5630386],[7.4,1.5097958],[7.45,1.4583666],[7.5,1.4086893],[7.55,1.3607042],[7.6,1.3143536],[7.65,1.2695819],[7.7,1.2263353],[7.75,1.1845618],[7.8,1.1442113],[7.85,1.1052352],[7.9,1.0675868],[7.95,1.0312209],[8.0,0.9960938],[8.0,1.9960938],[8.05,1.9280995],[8.1,1.8624213],[8.15,1.7989804],[8.2,1.7377005],[8.25,1.6785081],[8.3,1.6213319],[8.35,1.5661034],[8.4,1.5127562],[8.45,1.4612262],[8.5,1.4114514],[8.55,1.3633722],[8.6,1.3169307],[8.65,1.2720713],[8.7,1.2287398],[8.75,1.1868844],[8.8,1.1464548],[8.85,1.1074023],[8.9,1.0696802],[8.95,1.0332429],[9.0,0.9980469]],"c":"force3","w":2.4},{"t":"plot","o":[80,250],"sx":52,"sy":80,"pts":[[0,2],[9.4,2]],"c":"muted","w":1.1,"dash":true},{"t":"text","p":[566.8,82],"s":"picco limite: 2 dosi","c":"muted","size":11,"a":"end"},{"t":"plot","o":[80,250],"sx":52,"sy":80,"pts":[[0,1],[9.4,1]],"c":"muted","w":1.1,"dash":true},{"t":"text","p":[566.8,186],"s":"minimo limite: 1 dose","c":"muted","size":11,"a":"end"}]}
---
Quantità di un farmaco nel corpo, in unità di una dose, quando si somministra una dose a ogni tempo di dimezzamento. Dopo quattro o cinque dosi la quantità oscilla fra una e due dosi.
:::

::: storia Wilhelmy e lo zucchero che ruota la luce
La prima legge cinetica fu scritta nel 1850 da Ludwig Wilhelmy, un farmacista tedesco che si era dedicato alla fisica. Studiava l'«inversione» dello zucchero da cucina, il saccarosio, che in soluzione acida si scinde in glucosio e fruttosio, e la seguiva con un polarimetro: il saccarosio ruota il piano della luce polarizzata in un verso, la miscela dei prodotti nel verso opposto, e l'angolo di rotazione indica a ogni istante quanto zucchero resta. Wilhelmy trovò che la velocità era proporzionale alla quantità di zucchero non ancora trasformato e alla quantità di acido, e integrò l'equazione ottenendo una legge esponenziale. Il suo lavoro passò quasi inosservato; furono Augustus Harcourt e William Esson, a Oxford, negli anni Sessanta dell'Ottocento, a fondare lo studio sistematico delle velocità di reazione, e soltanto nel 1884 Wilhelm Ostwald riportò l'attenzione sul lavoro pionieristico di Wilhelmy.
:::

## Errori frequenti {#errori}

::: errore Gli ordini dai coefficienti
Gli esponenti della legge cinetica si ricavano dagli esperimenti. Coincidono con i coefficienti soltanto per i singoli passaggi elementari di un meccanismo; per una reazione complessiva possono essere diversi, anche frazionari, come nella reazione fra idrogeno e bromo.
:::

::: errore La velocità è costante
In quasi tutte le reazioni la velocità diminuisce mentre i reagenti si consumano. Una velocità costante è la firma di una reazione di ordine zero, un caso particolare.
:::

::: errore Il tempo di dimezzamento è metà del tempo totale
Per una reazione del primo ordine, dopo due tempi di dimezzamento resta un quarto del reagente, non zero. La reazione non finisce mai del tutto in senso matematico; nella pratica si considera completa dopo un certo numero di tempi di dimezzamento.
:::

::: errore Velocità e costante di velocità
La velocità dipende dalle concentrazioni e cambia nel corso della reazione; la costante di velocità, a temperatura fissata, resta la stessa. Raddoppiare la concentrazione di un reagente può raddoppiare la velocità, e lascia invariata $k$.
:::

::: errore Una reazione veloce libera molta energia
Velocità ed energia della reazione sono indipendenti. La combustione del diamante libera molta energia ed è lentissima a temperatura ambiente; alcune reazioni che assorbono calore sono rapide. La velocità dipende dall'energia di attivazione, non dal bilancio energetico complessivo.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- La velocità di reazione è la variazione di concentrazione nel tempo, divisa per il coefficiente stechiometrico: $v=-\tfrac1a\Delta[\mathrm A]/\Delta t$.
- La velocità istantanea è la pendenza della tangente alla curva concentrazione-tempo; la velocità iniziale corrisponde alle concentrazioni di partenza.
- La velocità dipende dalla natura dei reagenti, dalle concentrazioni, dalla temperatura, dalla superficie di contatto e dai catalizzatori.
- Secondo la teoria degli urti reagiscono soltanto le molecole che si urtano con energia sufficiente e con l'orientazione giusta; gli urti efficaci sono una piccolissima frazione.
- La legge cinetica $v=k[\mathrm A]^m[\mathrm B]^n$ ha ordini determinati sperimentalmente, per esempio con il metodo delle velocità iniziali.
- Ordine zero: $[\mathrm A]$ cala linearmente. Primo ordine: $\ln[\mathrm A]$ cala linearmente e $t_{1/2}=\ln2/k$ è costante. Secondo ordine: $1/[\mathrm A]$ cresce linearmente e $t_{1/2}=1/(k[\mathrm A]_0)$.
- Molte reazioni avvengono in più passaggi elementari; il più lento determina la velocità e la forma della legge cinetica.
- Il decadimento radioattivo e l'eliminazione della maggior parte dei farmaci seguono cinetiche del primo ordine.
:::

## Glossario {#glossario}

- **Cinetica chimica**: studio della velocità delle reazioni e dei fattori che la influenzano.
- **Velocità di reazione**: variazione della concentrazione di un reagente o di un prodotto nell'unità di tempo, divisa per il suo coefficiente.
- **Velocità istantanea**: velocità in un dato istante, pendenza della tangente alla curva concentrazione-tempo.
- **Velocità iniziale**: velocità istantanea all'inizio della reazione.
- **Teoria degli urti**: modello secondo cui le reazioni avvengono per urti fra molecole con energia e orientazione adatte.
- **Energia di attivazione**: energia minima che un urto deve avere per portare alla reazione.
- **Legge cinetica**: relazione fra la velocità e le concentrazioni dei reagenti.
- **Costante di velocità**: costante di proporzionalità della legge cinetica, dipendente dalla temperatura.
- **Ordine di reazione**: esponente di una concentrazione nella legge cinetica; l'ordine complessivo è la somma degli esponenti.
- **Meccanismo di reazione**: sequenza di passaggi elementari attraverso cui avviene una reazione.
- **Legge integrata**: relazione fra concentrazione e tempo ottenuta dalla legge cinetica.
- **Tempo di dimezzamento**: tempo necessario perché la concentrazione di un reagente si riduca alla metà.
- **Passaggio elementare**: singolo evento molecolare che fa parte di un meccanismo di reazione.
- **Passaggio cinetico determinante**: il passaggio più lento di un meccanismo, che fissa la velocità complessiva.
- **Pseudo primo ordine**: comportamento del primo ordine di una reazione in cui un secondo reagente è in grande eccesso.

## Esercizi {#esercizi}

Dati utili: $\ln2\simeq0{,}693$; $\ln10\simeq2{,}303$.

::: esercizio Velocità di sostanze diverse [base]
Nella reazione $2\,\mathrm{N_2O_5}\to4\,\mathrm{NO_2}+\mathrm O_2$, in un certo istante il diossido di azoto si forma alla velocità di $4{,}0\times10^{-5}\un{mol/(L\,s)}$. Con quale velocità scompare il pentossido di diazoto e si forma l'ossigeno? Qual è la velocità della reazione?
>>> soluzione
Il pentossido scompare con velocità metà di quella con cui si forma il diossido, $2{,}0\times10^{-5}\un{mol/(L\,s)}$; l'ossigeno si forma con velocità un quarto, $1{,}0\times10^{-5}\un{mol/(L\,s)}$. La velocità della reazione, divisa per i coefficienti, è $1{,}0\times10^{-5}\un{mol/(L\,s)}$.
:::

::: esercizio Una velocità media [base]
La concentrazione di un reagente scende da $0{,}500$ a $0{,}410\un{M}$ in $60\un{s}$. Calcolare la velocità media in quell'intervallo.
>>> soluzione
La concentrazione diminuisce di $0{,}090\un{M}$, e $v=0{,}090/60=1{,}5\times10^{-3}\un{mol/(L\,s)}$.
:::

::: esercizio Le unità della costante [base]
Una costante di velocità vale $4{,}2\times10^{-3}\un{L/(mol\,s)}$. Di che ordine complessivo è la reazione? Quali unità avrebbe la costante di una reazione di ordine zero e di una del primo ordine?
>>> soluzione
Le unità $\mathrm{L/(mol\,s)}$ corrispondono al secondo ordine complessivo. Per l'ordine zero la costante si misura in $\mathrm{mol/(L\,s)}$, per il primo ordine in $\mathrm{s^{-1}}$.
:::

::: esercizio Lo iodio radioattivo [base]
Lo iodio $131$ ha un tempo di dimezzamento di $8{,}02$ giorni. Quale frazione di un campione resta dopo $24$ giorni circa, e dopo $40$?
>>> soluzione
Ventiquattro giorni sono circa tre tempi di dimezzamento: resta un ottavo. Quaranta giorni sono circa cinque tempi di dimezzamento: resta circa un trentaduesimo, il $3\%$.
:::

::: esercizio Polveri che esplodono [base]
La farina e lo zucchero a velo, in mucchio, bruciano con difficoltà; dispersi nell'aria possono esplodere, e hanno causato gravi incidenti nei mulini e negli zuccherifici. Spiegare il fenomeno con i fattori che influenzano la velocità.
>>> soluzione
Una polvere finissima dispersa nell'aria ha una superficie enorme a contatto con l'ossigeno, e ogni granello è circondato da aria. La reazione avviene contemporaneamente su tutta la superficie, il calore liberato accende i granelli vicini, e la combustione si propaga in una frazione di secondo: la velocità altissima trasforma una combustione in un'esplosione.
:::

::: esercizio Velocità iniziali [medio]
Per la reazione $\mathrm A+\mathrm B\to\text{prodotti}$ si ottengono le velocità iniziali seguenti: con $[\mathrm A]_0=0{,}050$ e $[\mathrm B]_0=0{,}050\un{M}$, $1{,}2\times10^{-3}\un{M/s}$; con $[\mathrm A]_0=0{,}100$ e $[\mathrm B]_0=0{,}050\un{M}$, $2{,}4\times10^{-3}\un{M/s}$; con $[\mathrm A]_0=0{,}050$ e $[\mathrm B]_0=0{,}100\un{M}$, $1{,}2\times10^{-3}\un{M/s}$. Scrivere la legge cinetica e calcolare $k$.
>>> soluzione
Raddoppiando A la velocità raddoppia: primo ordine rispetto ad A. Raddoppiando B la velocità resta la stessa: ordine zero rispetto a B. La legge è $v=k[\mathrm A]$, con $k=1{,}2\times10^{-3}/0{,}050=0{,}024\un{s^{-1}}$.
:::

::: esercizio Dal dimezzamento alla costante [medio]
Una reazione del primo ordine ha un tempo di dimezzamento di $15\un{min}$. Calcolare la costante di velocità e il tempo necessario perché resti il $10\%$ del reagente.
>>> soluzione
$k=0{,}693/15\simeq0{,}046\un{min^{-1}}$. Per arrivare al $10\%$ serve $t=\ln10/k=2{,}303/0{,}0462\simeq50\un{min}$, cioè $3{,}32$ tempi di dimezzamento.
:::

::: esercizio L'alcol nel sangue [medio]
Dopo una cena la concentrazione di alcol nel sangue di una persona è $0{,}90\un{g/L}$. Con una velocità di eliminazione costante di $0{,}15\un{g/L}$ all'ora, quanto tempo serve per scendere sotto $0{,}50\un{g/L}$? E per arrivare a zero?
>>> soluzione
Per scendere di $0{,}40\un{g/L}$ servono $0{,}40/0{,}15\simeq2{,}7\un{h}$; per eliminare tutto, $0{,}90/0{,}15=6{,}0\un{h}$. Con una cinetica di ordine zero il tempo è proporzionale alla quantità da eliminare.
:::

::: esercizio Una reazione del secondo ordine [medio]
Una reazione $2\,\mathrm A\to\text{prodotti}$ è del secondo ordine con $k=0{,}50\un{L/(mol\,s)}$, e $[\mathrm A]_0=0{,}100\un{M}$. Calcolare il primo tempo di dimezzamento e il tempo per arrivare a un quarto della concentrazione iniziale.
>>> soluzione
$t_{1/2}=1/(k[\mathrm A]_0)$, cioè $1/0{,}050=20\un{s}$. Per arrivare a $0{,}025\un{M}$: $1/0{,}025-1/0{,}100=30\un{L/mol}=kt$, da cui $t=60\un{s}$. Il secondo dimezzamento ha richiesto $40\un{s}$, il doppio del primo.
:::

::: esercizio Quale ordine? [medio]
Una reazione dà, a $t=0$, $100$, $200$ e $300\un{s}$, le concentrazioni $1{,}000$, $0{,}741$, $0{,}549$ e $0{,}407\un{M}$. Stabilire l'ordine calcolando $\ln[\mathrm A]$ e $1/[\mathrm A]$, e ricavare $k$.
>>> soluzione
I logaritmi valgono $0$, $-0{,}300$, $-0{,}600$, $-0{,}900$, e diminuiscono di $0{,}300$ ogni $100\un{s}$: il grafico è lineare, e la reazione è del primo ordine, con $k=3{,}0\times10^{-3}\un{s^{-1}}$. Gli inversi, $1{,}00$, $1{,}35$, $1{,}82$, $2{,}46$, crescono con incrementi crescenti, e il loro grafico non è lineare.
:::

::: esercizio Datare un reperto [avanzato]
Il carbonio di un frammento di legno di un antico villaggio ha un'attività pari al $30\%$ di quella del legno vivo. Calcolare l'età del reperto, con un tempo di dimezzamento del carbonio $14$ di $5730$ anni. Quale attività residua ci si aspetta per un reperto di $5300$ anni?
>>> soluzione
$k=0{,}693/5730\simeq1{,}21\times10^{-4}$ all'anno; Con $\ln(1/0{,}30)\simeq1{,}204$ si ottiene $t=1{,}204/k\simeq9950$ anni. Per $5300$ anni la frazione residua è $e^{-kt}=0{,}5^{5300/5730}\simeq0{,}53$, cioè il $53\%$.
:::

::: esercizio Il tempo di dimezzamento negli altri ordini [avanzato]
Ricavare dalle leggi integrate il tempo di dimezzamento di una reazione di ordine zero e di una del secondo ordine. Come cambia nei due casi quando la concentrazione iniziale raddoppia?
>>> soluzione
Ordine zero: $[\mathrm A]_0/2=[\mathrm A]_0-kt_{1/2}$, da cui $t_{1/2}=[\mathrm A]_0/(2k)$: raddoppia se la concentrazione iniziale raddoppia. Secondo ordine: $2/[\mathrm A]_0=1/[\mathrm A]_0+kt_{1/2}$, da cui $t_{1/2}=1/(k[\mathrm A]_0)$: si dimezza se la concentrazione iniziale raddoppia.
:::

::: esercizio Pseudo primo ordine [avanzato]
Una reazione $\mathrm A+\mathrm B\to\text{prodotti}$ ha legge cinetica $v=k[\mathrm A][\mathrm B]$ con $k=2{,}0\un{L/(mol\,s)}$. Si parte da $[\mathrm A]_0=1{,}0\times10^{-3}\un{M}$ e $[\mathrm B]_0=1{,}0\un{M}$. Calcolare la costante di pseudo primo ordine e il tempo di dimezzamento di A. Di quanto cambia $[\mathrm B]$ durante la reazione?
>>> soluzione
Con B in grande eccesso, $k'=k[\mathrm B]_0=2{,}0\un{s^{-1}}$, e $t_{1/2}=0{,}693/2{,}0\simeq0{,}35\un{s}$. Anche quando tutto A ha reagito, $[\mathrm B]$ scende soltanto da $1{,}000$ a $0{,}999\un{M}$: l'approssimazione è eccellente.
:::

::: esercizio Dosi ripetute [avanzato]
Un farmaco ha un tempo di dimezzamento di $8\un{h}$ e si somministra una dose ogni $8\un{h}$. Mostrare che, subito dopo la $n$-esima dose, la quantità nel corpo è $1+\tfrac12+\tfrac14+\cdots+\tfrac1{2^{n-1}}$ dosi, e calcolarla per $n=5$ e per $n$ molto grande.
>>> soluzione
Ogni dose, dopo $j$ intervalli, si è ridotta a $1/2^j$. Subito dopo la $n$-esima dose sono presenti la dose appena presa, metà della precedente, un quarto di quella prima, e così via: la somma di una serie geometrica di ragione $\tfrac12$, che vale $2-1/2^{n-1}$. Per $n=5$ si hanno $1{,}9375$ dosi; per $n$ molto grande la somma tende a $2$.
:::

::: esercizio Quanti urti funzionano [avanzato]
Una reazione fra due gas ha, a temperatura ambiente, una costante di velocità di $1\times10^{-5}\un{L/(mol\,s)}$. Se ogni urto fra le molecole fosse efficace, la costante sarebbe circa $1\times10^{11}\un{L/(mol\,s)}$. Stimare la frazione di urti efficaci e commentare.
>>> soluzione
La frazione è circa $10^{-5}/10^{11}=10^{-16}$: un urto su diecimila miliardi di miliardi porta alla reazione. Gli urti sono frequentissimi, ma quasi tutti hanno troppo poca energia o l'orientazione sbagliata. Il prossimo capitolo mostra come questa frazione dipenda dall'energia di attivazione e dalla temperatura.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali; i dati delle velocità iniziali e della reazione generica $\mathrm A\to\text{prodotti}$ sono illustrativi. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 20-1–20-8. I dati numerici provengono dalle fonti seguenti.

1. Tempi di dimezzamento dello iodio $131$ e del carbonio $14$: NUBASE2020 e convenzioni della datazione al radiocarbonio.
2. Velocità media di eliminazione dell'alcol etilico e tempo di dimezzamento della caffeina: letteratura di farmacologia clinica e tossicologia forense. Limite di alcolemia per la guida: codice della strada italiano, articolo 186.
3. Leggi cinetiche delle reazioni fra idrogeno e alogeni: M. Bodenstein e S. C. Lind, Z. Phys. Chem. 57 (1906) 168.
4. Per la storia: L. Wilhelmy, Ann. Phys. Chem. 81 (1850) 413; A. G. Vernon Harcourt e W. Esson, Phil. Trans. R. Soc. (1866–1867); W. F. Libby (1949); premi Nobel per la chimica 1967 e 1999.
