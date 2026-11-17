---
unit: biology-19
titolo: Respirazione, fermentazione e chemiosintesi
sottotitolo: Come le cellule ricavano energia dalle reazioni di ossidoriduzione, dal glucosio all'idrogeno delle sorgenti idrotermali
volume: Volume di biologia
fonte: Testo originale; riferimenti principali A. M. Shaw, Astrochemistry, §9.4; J. R. Morris et al., Biology: How Life Works, 2ª ed., §7.1-7.7, 26.2-26.3
---

## Prima di cominciare {#apertura}

Ogni cellula vivente è una piccola macchina chimica sempre in attività. Costruisce proteine, copia il DNA, pompa ioni attraverso le membrane, si muove. Tutto questo lavoro richiede energia, e l'energia viene da reazioni chimiche che la cellula accoppia ai propri processi. Quasi tutte le forme di vita conosciute usano lo stesso schema: trasferiscono elettroni da una sostanza che li cede a una che li accetta, usano l'energia liberata per pompare protoni attraverso una membrana, e lasciano che i protoni rientrino attraverso una turbina molecolare che produce ATP.

La varietà sta nelle sostanze. Noi bruciamo zuccheri con l'ossigeno; un lievito senza ossigeno trasforma lo zucchero in alcol; alcuni batteri respirano nitrati o solfati; altri ricavano energia dall'idrogeno, dallo zolfo o dal ferro delle rocce, senza bisogno né di luce né di cibo organico. Questi ultimi, i **chemiolitotrofi**, sono decisivi per l'astrobiologia, perché mostrano che la vita può prosperare lontano dal Sole, sul fondo di un oceano o nelle rocce del sottosuolo, alimentata soltanto dalla chimica fra l'acqua e i minerali. Le sonde che hanno trovato idrogeno molecolare nei pennacchi di Encelado cercavano proprio una fonte di energia di questo tipo.

Questo capitolo descrive il metabolismo energetico come una scala di reazioni di ossidoriduzione, dalla fermentazione alla respirazione aerobica, dalla respirazione anaerobica alla chemiosintesi, e usa l'energia libera di Gibbs per capire quali reazioni possono sostenere la vita in un ambiente.

::: obiettivi
- descrivere il metabolismo energetico come un trasferimento di elettroni da un donatore a un accettore;
- calcolare l'energia libera di una reazione di ossidoriduzione dai potenziali standard;
- descrivere la glicolisi, la fermentazione, il ciclo di Krebs e la catena di trasporto degli elettroni;
- spiegare la chemiosmosi e il funzionamento dell'ATP sintasi;
- confrontare la resa in ATP della fermentazione e della respirazione;
- descrivere la respirazione anaerobica, la chemiosintesi e la successione degli accettori negli ambienti naturali;
- valutare la disponibilità di energia chimica come criterio di abitabilità.
:::

Il capitolo usa l'energia libera e i potenziali di ossidoriduzione dei capitoli [Termochimica e calorimetria](unit:chemistry-16) e [Ossidazione, riduzione ed elettrochimica](unit:chemistry-23), gli enzimi del capitolo [Energia, enzimi e catalisi](unit:biology-08) e le sorgenti idrotermali del capitolo [Sorgenti idrotermali e metabolismo primordiale](unit:biology-09).

## Energia dagli elettroni {#redox}

Una reazione di **ossidoriduzione** trasferisce elettroni da un **donatore**, che si ossida, a un **accettore**, che si riduce. La tendenza di una sostanza ad accettare elettroni si misura con il suo **potenziale di riduzione**. In biologia si usano i potenziali standard a pH $7$, indicati con $E^{\circ\prime}$: più il potenziale è positivo, più la forma ossidata attrae elettroni; più è negativo, più la forma ridotta li cede volentieri.

| Coppia (forma ossidata / forma ridotta) | $E^{\circ\prime}$ (V) |
|---|---|
| $\mathrm{O_2}$ / $\mathrm{H_2O}$ | $+0{,}82$ |
| $\mathrm{NO_3^-}$ / $\mathrm{N_2}$ | $+0{,}74$ |
| $\mathrm{NO_3^-}$ / $\mathrm{NO_2^-}$ | $+0{,}42$ |
| fumarato / succinato | $+0{,}03$ |
| piruvato / lattato | $-0{,}19$ |
| $\mathrm{SO_4^{2-}}$ / $\mathrm{HS^-}$ | $-0{,}22$ |
| $\mathrm{CO_2}$ / $\mathrm{CH_4}$ | $-0{,}24$ |
| $\mathrm{NAD^+}$ / NADH | $-0{,}32$ |
| $\mathrm{H^+}$ / $\mathrm{H_2}$ | $-0{,}41$ |

Disponendo le coppie su una scala verticale si ottiene una **torre degli elettroni** (figura 1). Gli elettroni «cadono» spontaneamente da una coppia in alto, con potenziale più negativo, a una in basso, con potenziale più positivo, e la differenza di potenziale misura l'energia liberata.

::: legge Energia libera di una reazione di ossidoriduzione
Se $n$ moli di elettroni passano da un donatore a un accettore con differenza di potenziale $\Delta E^{\circ\prime}=E^{\circ\prime}_\text{accettore}-E^{\circ\prime}_\text{donatore}$, la variazione di energia libera standard è

$$\Delta G^{\circ\prime}=-nF\,\Delta E^{\circ\prime},$$

dove $F=96\,485\ \mathrm{C/mol}$ è la costante di Faraday. Una differenza positiva dà un'energia libera negativa: la reazione è spontanea.
:::

::: figura torre
{"w":760,"h":480,"items":[{"t":"line","p":[330,50.0,330,435.7],"c":"ax","w":2},{"t":"line","p":[320,418.3,330,418.3],"c":"force3","w":2},{"t":"text","p":[314,422.3],"s":"O₂ / H₂O   +0,82","c":"force3","size":11,"a":"end"},{"t":"line","p":[320,302.3,330,302.3],"c":"force3","w":2},{"t":"text","p":[314,306.3],"s":"NO₃⁻ / NO₂⁻   +0,42","c":"force3","size":11,"a":"end"},{"t":"line","p":[320,125.4,330,125.4],"c":"muted","w":2},{"t":"text","p":[314,129.4],"s":"piruvato / lattato   −0,19","c":"muted","size":11,"a":"end"},{"t":"line","p":[320,87.7,330,87.7],"c":"force","w":2},{"t":"text","p":[314,91.7],"s":"NAD⁺ / NADH   −0,32","c":"force","size":11,"a":"end"},{"t":"line","p":[330,395.1,340,395.1],"c":"force3","w":2},{"t":"text","p":[356,399.1],"s":"NO₃⁻ / N₂   +0,74","c":"force3","size":11,"a":"start"},{"t":"line","p":[330,189.2,340,189.2],"c":"muted","w":2},{"t":"text","p":[356,193.2],"s":"fumarato / succinato   +0,03","c":"muted","size":11,"a":"start"},{"t":"line","p":[330,116.7,340,116.7],"c":"force4","w":2},{"t":"line","p":[340,116.7,352,122.7],"c":"muted","w":1},{"t":"text","p":[356,126.7],"s":"SO₄²⁻ / HS⁻   −0,22","c":"force4","size":11,"a":"start"},{"t":"line","p":[330,110.9,340,110.9],"c":"force4","w":2},{"t":"line","p":[340,110.9,352,88.9],"c":"muted","w":1},{"t":"text","p":[356,92.9],"s":"CO₂ / CH₄   −0,24","c":"force4","size":11,"a":"start"},{"t":"line","p":[330,61.6,340,61.6],"c":"force","w":2},{"t":"text","p":[356,65.6],"s":"H⁺ / H₂   −0,41","c":"force","size":11,"a":"start"},{"t":"arrow","p":[560,87.7,560,412.3],"c":"force2","w":1.8,"head":8},{"t":"text","p":[570,253.0],"s":"ΔE = 1,14 V","c":"force2","size":12,"a":"start"},{"t":"text","p":[570,271.0],"s":"dal NADH all'ossigeno","c":"force2","size":11,"a":"start"},{"t":"text","p":[330,30],"s":"potenziale più negativo: donatori","c":"ax","size":11},{"t":"text","p":[330,457.7],"s":"potenziale più positivo: accettori","c":"ax","size":11}]}
---
La torre degli elettroni: coppie di ossidoriduzione ordinate secondo il potenziale standard a pH $7$. Un donatore in alto può cedere elettroni a un accettore più in basso; l'energia liberata è proporzionale al dislivello. L'ossigeno è l'accettore più energetico fra quelli usati dalla vita.
:::

::: esempio Dal NADH all'ossigeno
Nella respirazione il NADH cede due elettroni che arrivano infine all'ossigeno. La differenza di potenziale è $\Delta E^{\circ\prime}=0{,}82-(-0{,}32)=1{,}14$ V, e

$$\begin{aligned}\Delta G^{\circ\prime}&=-2\cdot96\,485\cdot1{,}14\ \mathrm{J/mol}\\&\approx-220\ \mathrm{kJ/mol}.\end{aligned}$$

Se gli stessi elettroni andassero al solfato, la differenza sarebbe $-0{,}22-(-0{,}32)=0{,}10$ V, e l'energia liberata circa $19$ kJ/mol: più di dieci volte meno.
:::

La torre spiega perché la respirazione aerobica è così vantaggiosa e perché, dove l'ossigeno manca, gli organismi usano accettori via via meno energetici. Spiega anche la chemiosintesi: un batterio che ossida l'idrogeno, in cima alla torre, con l'ossigeno o il nitrato, in fondo, ricava energia senza alcuna sostanza organica.

## L'ATP, la valuta energetica {#atp}

Prima di usarla, la cellula converte l'energia delle ossidoriduzioni in una forma universale, l'**adenosina trifosfato**, o ATP. L'idrolisi dell'ATP in ADP e fosfato libera in condizioni standard $30{,}5$ kJ/mol, e nelle condizioni reali della cellula, dove il rapporto fra ATP e ADP è tenuto molto alto, circa $50$ o $60$ kJ/mol. Accoppiando questa idrolisi a reazioni che da sole non avverrebbero, la cellula le rende possibili, come si vede nel capitolo [Energia, enzimi e catalisi](unit:biology-08).

L'ATP si consuma appena prodotto. Una cellula ne contiene una scorta che basta per pochi secondi o minuti di attività, e la rigenera di continuo. Un essere umano a riposo consuma circa un quarto di litro di ossigeno al minuto; da questo valore si stima che rigeneri ogni giorno una quantità di ATP dell'ordine di decine di chilogrammi, paragonabile alla propria massa, usando sempre la stessa scorta di un centinaio di grammi circa.

## La glicolisi {#glicolisi}

La demolizione del glucosio comincia nel citoplasma con la **glicolisi**, una sequenza di dieci reazioni catalizzate da enzimi che spezza una molecola di glucosio, a sei atomi di carbonio, in due molecole di **piruvato**, a tre atomi. Nella prima parte la cellula investe due ATP per attivare lo zucchero; nella seconda ne recupera quattro, e ottiene inoltre due molecole di NADH, che trasportano elettroni ad alta energia. Il bilancio netto è

$$\begin{aligned}&\mathrm{glucosio}+2\,\mathrm{NAD^+}+2\,\mathrm{ADP}+2\,\mathrm P_i\\&\quad\longrightarrow2\,\mathrm{piruvato}+2\,\mathrm{NADH}+2\,\mathrm{ATP}.\end{aligned}$$

La glicolisi non usa ossigeno ed è presente, con poche varianti, in quasi tutti gli organismi, dai batteri agli esseri umani. Questa universalità suggerisce che sia una via molto antica, nata quando l'ossigeno mancava. L'ATP prodotto nella glicolisi si forma per **fosforilazione a livello del substrato**: un enzima trasferisce direttamente un gruppo fosfato da una molecola ricca di energia all'ADP, senza membrane né gradienti.

## La fermentazione {#fermentazione}

La glicolisi consuma NAD$^+$ e lo trasforma in NADH. Se il NADH non viene riossidato, la scorta di NAD$^+$ si esaurisce in fretta e la glicolisi si ferma. Senza un accettore esterno di elettroni, la cellula risolve il problema cedendo gli elettroni del NADH allo stesso piruvato, o a una molecola che ne deriva: è la **fermentazione**.

- Nella **fermentazione lattica**, compiuta da molti batteri e dai muscoli umani sotto sforzo, il piruvato è ridotto a lattato.
- Nella **fermentazione alcolica**, compiuta dal lievito, il piruvato perde anidride carbonica e diventa acetaldeide, che è ridotta a etanolo.

In entrambi i casi la cellula ottiene soltanto i due ATP della glicolisi per ogni glucosio. Gran parte dell'energia chimica resta nei prodotti: l'etanolo brucia, e il lattato può essere ossidato da altre cellule. La trasformazione del glucosio in due molecole di lattato libera in condizioni standard circa $196$ kJ/mol, contro i $2870$ kJ/mol della sua ossidazione completa con l'ossigeno.

::: errore Fermentazione e respirazione anaerobica
Fermentazione e respirazione anaerobica avvengono entrambe senza ossigeno, e capita di confonderle. Nella fermentazione manca un accettore esterno: gli elettroni tornano a una molecola derivata dallo stesso substrato, e l'ATP viene solo dalla glicolisi. Nella respirazione anaerobica una catena di trasporto cede gli elettroni a un accettore esterno diverso dall'ossigeno, come il nitrato o il solfato, e produce ATP con un gradiente di protoni.
:::

## La respirazione aerobica {#respirazione}

In presenza di ossigeno la cellula ricava dal glucosio molta più energia, ossidandolo completamente fino ad anidride carbonica. Il processo complessivo è

$$\mathrm{C_6H_{12}O_6}+6\,\mathrm{O_2}\longrightarrow6\,\mathrm{CO_2}+6\,\mathrm{H_2O},$$

con $\Delta G^{\circ\prime}\approx-2870$ kJ/mol,

e si svolge in tre fasi. Negli eucarioti le ultime due avvengono nei mitocondri, nei batteri sulla membrana cellulare.

1. **Ossidazione del piruvato.** Ogni piruvato perde una molecola di anidride carbonica e diventa un gruppo acetile legato al coenzima A, producendo un NADH.
2. **Ciclo di Krebs.** Il gruppo acetile entra in un ciclo di otto reazioni che lo ossida completamente a due molecole di anidride carbonica. Per ogni acetile il ciclo produce tre NADH, un FADH$_2$, un altro trasportatore di elettroni, e un ATP, o un GTP equivalente.
3. **Catena di trasporto degli elettroni.** NADH e FADH$_2$ cedono i loro elettroni a una serie di complessi proteici inseriti nella membrana interna del mitocondrio. Gli elettroni passano da un complesso all'altro scendendo lungo la torre dei potenziali, fino all'ossigeno, che si riduce ad acqua.

L'energia liberata nella caduta degli elettroni non produce direttamente ATP. Tre dei complessi la usano per pompare protoni dall'interno del mitocondrio allo spazio fra le due membrane, creando una differenza di concentrazione e una differenza di potenziale elettrico. Insieme, queste formano la **forza motrice protonica**, che nei mitocondri vale circa $0{,}15$-$0{,}20$ volt.

I protoni rientrano attraverso l'**ATP sintasi**, una macchina molecolare che funziona come una turbina: il flusso dei protoni fa ruotare una parte dell'enzima, e la rotazione cambia la forma dei siti catalitici, che uniscono ADP e fosfato in ATP (figura 2). Questo meccanismo, chiamato **chemiosmosi**, fu proposto nel 1961 da Peter Mitchell, che dovette convincere una comunità scettica e ricevette il premio Nobel nel 1978. Nel 1997 un gruppo giapponese guidato da Masasuke Yoshida e Kazuhiko Kinosita filmò al microscopio la rotazione della parte catalitica dell'enzima, legandovi un filamento fluorescente.

::: figura chemiosmosi
{"w":740,"h":315,"items":[{"t":"rect","p":[40,140,660,50],"c":"muted","r":0},{"t":"text","p":[370,60],"s":"spazio fra le membrane: molti protoni","c":"ax","size":11},{"t":"text","p":[370,300],"s":"interno del mitocondrio","c":"ax","size":11},{"t":"poly","pts":[[90,125],[150,125],[150,205],[90,205]],"close":true,"c":"force2","w":2},{"t":"text","p":[120,170],"s":"I","c":"force2","size":14},{"t":"arrow","p":[160,235,160,95],"c":"force4","w":1.6,"head":7},{"t":"text","p":[168,90],"s":"H⁺","c":"force4","size":11,"a":"start"},{"t":"poly","pts":[[230,125],[290,125],[290,205],[230,205]],"close":true,"c":"force2","w":2},{"t":"text","p":[260,170],"s":"III","c":"force2","size":14},{"t":"arrow","p":[300,235,300,95],"c":"force4","w":1.6,"head":7},{"t":"text","p":[308,90],"s":"H⁺","c":"force4","size":11,"a":"start"},{"t":"poly","pts":[[370,125],[430,125],[430,205],[370,205]],"close":true,"c":"force2","w":2},{"t":"text","p":[400,170],"s":"IV","c":"force2","size":14},{"t":"arrow","p":[440,235,440,95],"c":"force4","w":1.6,"head":7},{"t":"text","p":[448,90],"s":"H⁺","c":"force4","size":11,"a":"start"},{"t":"arrow","p":[150,250,226,250],"c":"force3","w":1.6,"head":7},{"t":"arrow","p":[290,250,366,250],"c":"force3","w":1.6,"head":7},{"t":"text","p":[188,244],"s":"e⁻","c":"force3","size":11},{"t":"text","p":[328,244],"s":"e⁻","c":"force3","size":11},{"t":"text","p":[90,272],"s":"NADH → NAD⁺","c":"force3","size":11},{"t":"text","p":[440,254],"s":"O₂ → H₂O","c":"force3","size":11,"a":"start"},{"t":"poly","pts":[[560,125],[600,125],[600,205],[560,205]],"close":true,"c":"force","w":2},{"t":"circle","p":[580,236,20],"c":"body"},{"t":"poly","pts":[[600.0,236.0],[599.3,241.2],[597.3,246.0],[594.1,250.1],[590.0,253.3],[585.2,255.3],[580.0,256.0],[574.8,255.3],[570.0,253.3],[565.9,250.1],[562.7,246.0],[560.7,241.2],[560.0,236.0],[560.7,230.8],[562.7,226.0],[565.9,221.9],[570.0,218.7],[574.8,216.7],[580.0,216.0],[585.2,216.7],[590.0,218.7],[594.1,221.9],[597.3,226.0],[599.3,230.8],[600.0,236.0]],"c":"force","w":2},{"t":"arrow","p":[620,95,620,230],"c":"force4","w":1.6,"head":7},{"t":"text","p":[628,90],"s":"H⁺","c":"force4","size":11,"a":"start"},{"t":"text","p":[580,175],"s":"ATP","c":"force","size":10},{"t":"text","p":[580,112],"s":"ATP sintasi","c":"force","size":11},{"t":"text","p":[580,282],"s":"ADP + fosfato → ATP","c":"force","size":11}]}
---
Schema della chemiosmosi. Gli elettroni ceduti dal NADH percorrono i complessi della catena di trasporto fino all'ossigeno; tre complessi usano l'energia per pompare protoni attraverso la membrana. I protoni rientrano attraverso l'ATP sintasi, che li usa per produrre ATP.
:::

Il bilancio finale dipende da quanti protoni servono per ogni ATP e da come gli elettroni del NADH citoplasmatico entrano nel mitocondrio. Le stime attuali danno circa $2{,}5$ ATP per ogni NADH e $1{,}5$ per ogni FADH$_2$, e in totale circa $30$-$32$ ATP per glucosio, contro i $2$ della fermentazione (figura 3). I testi meno recenti indicano $36$ o $38$, valori calcolati con ipotesi oggi superate.

::: figura bilancio
{"w":820,"h":305,"items":[{"t":"axes","o":[80,270],"x":[720,"glucosio consumato, mmol"],"y":[260,"ATP ottenuto, mmol"],"sx":50,"sy":0.75,"xt":[[0,"0"],[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"]],"yt":[[0,"0"],[50,"50"],[100,"100"],[150,"150"],[200,"200"],[250,"250"],[300,"300"]]},{"t":"plot","o":[80,270],"sx":50,"sy":0.75,"pts":[[0,0],[10,300]],"c":"force2","w":2.6},{"t":"plot","o":[80,270],"sx":50,"sy":0.75,"pts":[[0,0],[10,20]],"c":"force","w":2.6},{"t":"circle","p":[180,225.0,5],"c":"force2"},{"t":"circle","p":[180,267.0,5],"c":"force"},{"t":"text","p":[190,229.0],"s":"60 mmol","c":"force2","size":11,"a":"start"},{"t":"text","p":[186,257.0],"s":"4 mmol","c":"force","size":11,"a":"start"},{"t":"text","p":[574,35.0],"s":"respirazione, 30 ATP per glucosio","c":"force2","size":11,"a":"end"},{"t":"text","p":[574,245.0],"s":"fermentazione, 2 ATP per glucosio","c":"force","size":11,"a":"end"}]}
---
ATP ottenuto in funzione del glucosio consumato, con la resa della respirazione aerobica, circa $30$ ATP per glucosio, e quella della fermentazione, $2$. Per ottenere la stessa quantità di ATP un organismo che fermenta deve consumare circa quindici volte più glucosio.
:::

::: esempio Quanta energia finisce nell'ATP
Con $30$ ATP per glucosio e $30{,}5$ kJ/mol per ATP in condizioni standard, l'energia conservata è $30\cdot30{,}5\approx915$ kJ/mol, circa il $32\%$ dei $2870$ kJ/mol disponibili. Usando il valore cellulare di circa $50$ kJ/mol per ATP, la frazione sale a circa il $50\%$. Il resto si disperde come calore, quello che mantiene la temperatura del nostro corpo.
:::

## Respirare senza ossigeno {#accettori}

Molti procarioti possiedono catene di trasporto che cedono gli elettroni ad accettori diversi dall'ossigeno. Questa **respirazione anaerobica** produce ATP con lo stesso meccanismo chemiosmotico, ma con meno energia, perché gli accettori alternativi si trovano più in alto nella torre dei potenziali.

- **Nitrato.** I batteri denitrificanti riducono il nitrato fino ad azoto molecolare, restituendolo all'atmosfera. La resa è vicina a quella della respirazione aerobica.
- **Ossidi di manganese e di ferro.** Alcuni batteri trasferiscono gli elettroni a minerali solidi, come gli ossidi di ferro ferrico, attraverso proteine della superficie cellulare o filamenti conduttori.
- **Solfato.** I batteri e gli archei solfato-riduttori producono idrogeno solforato; sono antichissimi, e la loro impronta isotopica nello zolfo risale a circa tre miliardi e mezzo di anni fa.
- **Anidride carbonica.** Gli archei metanogeni riducono l'anidride carbonica a metano usando l'idrogeno come donatore; gli acetogeni la riducono ad acetato.

Negli ambienti naturali questi metabolismi si dispongono secondo un ordine preciso. In un sedimento lacustre o marino l'ossigeno viene consumato nei primi millimetri o centimetri; sotto, gli organismi usano il nitrato, poi gli ossidi di manganese e di ferro, poi il solfato, e infine, quando anche il solfato è esaurito, prevale la metanogenesi. Ogni gruppo vince la competizione finché il suo accettore è disponibile, perché ricava più energia dagli stessi donatori. Il risultato è una **zonazione redox** che si legge nei profili chimici dell'acqua dei pori (figura 4).

::: figura sedimento
{"w":640,"h":345,"items":[{"t":"line","p":[110,60,570,60],"c":"ax","w":1.4},{"t":"line","p":[110,60,110,340],"c":"ax","w":1.4},{"t":"text","p":[570,50],"s":"concentrazione relativa","c":"ax","size":11,"a":"end"},{"t":"text","p":[100,340],"s":"profondità","c":"ax","size":11,"a":"end"},{"t":"poly","pts":[[550.0,60.0],[508.1,61.4],[470.2,62.7],[436.0,64.0],[404.9,65.4],[376.9,66.8],[351.5,68.1],[328.5,69.5],[307.7,70.8],[288.9,72.2],[271.9,73.5],[256.5,74.8],[242.5,76.2],[229.9,77.5],[218.5,78.9],[208.2,80.2],[198.8,81.6],[190.4,83.0],[182.7,84.3],[175.8,85.7],[169.5,87.0],[163.9,88.3],[158.8,89.7],[154.1,91.0],[149.9,92.4],[146.1,93.8],[142.7,95.1],[139.6,96.5],[136.8,97.8],[134.2,99.2],[131.9,100.5],[129.8,101.8],[127.9,103.2],[126.2,104.5],[124.7,105.9],[123.3,107.2],[122.0,108.6],[120.9,110.0],[119.8,111.3],[118.9,112.7],[118.1,114.0],[117.3,115.3],[116.6,116.7],[116.0,118.0],[115.4,119.4],[114.9,120.8],[114.4,122.1],[114.0,123.5],[113.6,124.8],[113.3,126.2],[113.0,127.5],[112.7,128.8],[112.4,130.2],[112.2,131.6],[112.0,132.9],[111.8,134.2],[111.6,135.6],[111.5,136.9],[111.3,138.3],[111.2,139.7],[111.1,141.0],[111.0,142.3],[110.9,143.7],[110.8,145.1],[110.7,146.4],[110.7,147.8],[110.6,149.1],[110.5,150.4],[110.5,151.8],[110.4,153.2],[110.4,154.5],[110.4,155.8],[110.3,157.2],[110.3,158.6],[110.3,159.9],[110.2,161.2],[110.2,162.6],[110.2,163.9],[110.2,165.3],[110.2,166.7],[110.1,168.0],[110.1,169.3],[110.1,170.7],[110.1,172.1],[110.1,173.4],[110.1,174.8],[110.1,176.1],[110.1,177.4],[110.1,178.8],[110.1,180.2],[110.1,181.5],[110.0,182.8],[110.0,184.2],[110.0,185.6],[110.0,186.9],[110.0,188.2],[110.0,189.6],[110.0,190.9],[110.0,192.3],[110.0,193.7],[110.0,195.0],[110.0,196.3],[110.0,197.7],[110.0,199.1],[110.0,200.4],[110.0,201.8],[110.0,203.1],[110.0,204.4],[110.0,205.8],[110.0,207.2],[110.0,208.5],[110.0,209.8],[110.0,211.2],[110.0,212.6],[110.0,213.9],[110.0,215.2],[110.0,216.6],[110.0,217.9],[110.0,219.3],[110.0,220.7],[110.0,222.0],[110.0,223.3],[110.0,224.7],[110.0,226.1],[110.0,227.4],[110.0,228.8],[110.0,230.1],[110.0,231.4],[110.0,232.8],[110.0,234.2],[110.0,235.5],[110.0,236.8],[110.0,238.2],[110.0,239.6],[110.0,240.9],[110.0,242.2],[110.0,243.6],[110.0,244.9],[110.0,246.3],[110.0,247.7],[110.0,249.0],[110.0,250.3],[110.0,251.7],[110.0,253.1],[110.0,254.4],[110.0,255.8],[110.0,257.1],[110.0,258.4],[110.0,259.8],[110.0,261.1],[110.0,262.5],[110.0,263.9],[110.0,265.2],[110.0,266.6],[110.0,267.9],[110.0,269.2],[110.0,270.6],[110.0,271.9],[110.0,273.3],[110.0,274.6],[110.0,276.0],[110.0,277.4],[110.0,278.7],[110.0,280.1],[110.0,281.4],[110.0,282.8],[110.0,284.1],[110.0,285.4],[110.0,286.8],[110.0,288.1],[110.0,289.5],[110.0,290.9],[110.0,292.2],[110.0,293.6],[110.0,294.9],[110.0,296.2],[110.0,297.6],[110.0,298.9],[110.0,300.3],[110.0,301.6],[110.0,303.0],[110.0,304.4],[110.0,305.7],[110.0,307.1],[110.0,308.4],[110.0,309.8],[110.0,311.1],[110.0,312.4],[110.0,313.8],[110.0,315.1],[110.0,316.5],[110.0,317.9],[110.0,319.2],[110.0,320.6],[110.0,321.9],[110.0,323.2],[110.0,324.6],[110.0,325.9],[110.0,327.3],[110.0,328.6],[110.0,330.0]],"c":"force3","w":2.2},{"t":"poly","pts":[[374.0,60.0],[373.8,61.4],[373.2,62.7],[372.2,64.0],[370.8,65.4],[369.0,66.8],[366.8,68.1],[364.2,69.5],[361.3,70.8],[358.0,72.2],[354.4,73.5],[350.5,74.8],[346.2,76.2],[341.7,77.5],[336.9,78.9],[331.9,80.2],[326.7,81.6],[321.2,83.0],[315.6,84.3],[309.8,85.7],[303.9,87.0],[297.9,88.3],[291.7,89.7],[285.5,91.0],[279.3,92.4],[273.0,93.8],[266.7,95.1],[260.4,96.5],[254.2,97.8],[248.0,99.2],[241.8,100.5],[235.8,101.8],[229.8,103.2],[223.9,104.5],[218.2,105.9],[212.6,107.2],[207.1,108.6],[201.8,110.0],[196.6,111.3],[191.6,112.7],[186.8,114.0],[182.2,115.3],[177.7,116.7],[173.4,118.0],[169.3,119.4],[165.3,120.8],[161.6,122.1],[158.0,123.5],[154.6,124.8],[151.4,126.2],[148.4,127.5],[145.5,128.8],[142.8,130.2],[140.2,131.6],[137.8,132.9],[135.6,134.2],[133.5,135.6],[131.5,136.9],[129.7,138.3],[128.0,139.7],[126.4,141.0],[125.0,142.3],[123.6,143.7],[122.3,145.1],[121.2,146.4],[120.1,147.8],[119.2,149.1],[118.3,150.4],[117.4,151.8],[116.7,153.2],[116.0,154.5],[115.4,155.8],[114.8,157.2],[114.3,158.6],[113.9,159.9],[113.4,161.2],[113.1,162.6],[112.7,163.9],[112.4,165.3],[112.1,166.7],[111.9,168.0],[111.7,169.3],[111.5,170.7],[111.3,172.1],[111.1,173.4],[111.0,174.8],[110.9,176.1],[110.8,177.4],[110.7,178.8],[110.6,180.2],[110.5,181.5],[110.4,182.8],[110.4,184.2],[110.3,185.6],[110.3,186.9],[110.2,188.2],[110.2,189.6],[110.2,190.9],[110.2,192.3],[110.1,193.7],[110.1,195.0],[110.1,196.3],[110.1,197.7],[110.1,199.1],[110.1,200.4],[110.1,201.8],[110.0,203.1],[110.0,204.4],[110.0,205.8],[110.0,207.2],[110.0,208.5],[110.0,209.8],[110.0,211.2],[110.0,212.6],[110.0,213.9],[110.0,215.2],[110.0,216.6],[110.0,217.9],[110.0,219.3],[110.0,220.7],[110.0,222.0],[110.0,223.3],[110.0,224.7],[110.0,226.1],[110.0,227.4],[110.0,228.8],[110.0,230.1],[110.0,231.4],[110.0,232.8],[110.0,234.2],[110.0,235.5],[110.0,236.8],[110.0,238.2],[110.0,239.6],[110.0,240.9],[110.0,242.2],[110.0,243.6],[110.0,244.9],[110.0,246.3],[110.0,247.7],[110.0,249.0],[110.0,250.3],[110.0,251.7],[110.0,253.1],[110.0,254.4],[110.0,255.8],[110.0,257.1],[110.0,258.4],[110.0,259.8],[110.0,261.1],[110.0,262.5],[110.0,263.9],[110.0,265.2],[110.0,266.6],[110.0,267.9],[110.0,269.2],[110.0,270.6],[110.0,271.9],[110.0,273.3],[110.0,274.6],[110.0,276.0],[110.0,277.4],[110.0,278.7],[110.0,280.1],[110.0,281.4],[110.0,282.8],[110.0,284.1],[110.0,285.4],[110.0,286.8],[110.0,288.1],[110.0,289.5],[110.0,290.9],[110.0,292.2],[110.0,293.6],[110.0,294.9],[110.0,296.2],[110.0,297.6],[110.0,298.9],[110.0,300.3],[110.0,301.6],[110.0,303.0],[110.0,304.4],[110.0,305.7],[110.0,307.1],[110.0,308.4],[110.0,309.8],[110.0,311.1],[110.0,312.4],[110.0,313.8],[110.0,315.1],[110.0,316.5],[110.0,317.9],[110.0,319.2],[110.0,320.6],[110.0,321.9],[110.0,323.2],[110.0,324.6],[110.0,325.9],[110.0,327.3],[110.0,328.6],[110.0,330.0]],"c":"force2","w":2.2},{"t":"poly","pts":[[110.4,60.0],[110.5,61.4],[110.6,62.7],[110.8,64.0],[111.0,65.4],[111.2,66.8],[111.4,68.1],[111.7,69.5],[112.0,70.8],[112.4,72.2],[112.9,73.5],[113.4,74.8],[114.0,76.2],[114.8,77.5],[115.6,78.9],[116.5,80.2],[117.6,81.6],[118.9,83.0],[120.3,84.3],[121.9,85.7],[123.7,87.0],[125.7,88.3],[127.9,89.7],[130.4,91.0],[133.2,92.4],[136.2,93.8],[139.6,95.1],[143.2,96.5],[147.2,97.8],[151.5,99.2],[156.1,100.5],[161.1,101.8],[166.4,103.2],[172.1,104.5],[178.0,105.9],[184.3,107.2],[190.9,108.6],[197.8,110.0],[204.9,111.3],[212.3,112.7],[219.9,114.0],[227.6,115.3],[235.4,116.7],[243.2,118.0],[251.1,119.4],[258.9,120.8],[266.5,122.1],[274.1,123.5],[281.3,124.8],[288.3,126.2],[294.9,127.5],[301.1,128.8],[306.9,130.2],[312.1,131.6],[316.7,132.9],[320.7,134.2],[324.0,135.6],[326.6,136.9],[328.5,138.3],[329.6,139.7],[330.0,141.0],[329.6,142.3],[328.5,143.7],[326.6,145.1],[324.0,146.4],[320.7,147.8],[316.7,149.1],[312.1,150.4],[306.9,151.8],[301.1,153.2],[294.9,154.5],[288.3,155.8],[281.3,157.2],[274.1,158.6],[266.5,159.9],[258.9,161.2],[251.1,162.6],[243.2,163.9],[235.4,165.3],[227.6,166.7],[219.9,168.0],[212.3,169.3],[204.9,170.7],[197.8,172.1],[190.9,173.4],[184.3,174.8],[178.0,176.1],[172.1,177.4],[166.4,178.8],[161.1,180.2],[156.1,181.5],[151.5,182.8],[147.2,184.2],[143.2,185.6],[139.6,186.9],[136.2,188.2],[133.2,189.6],[130.4,190.9],[127.9,192.3],[125.7,193.7],[123.7,195.0],[121.9,196.3],[120.3,197.7],[118.9,199.1],[117.6,200.4],[116.5,201.8],[115.6,203.1],[114.8,204.4],[114.0,205.8],[113.4,207.2],[112.9,208.5],[112.4,209.8],[112.0,211.2],[111.7,212.6],[111.4,213.9],[111.2,215.2],[111.0,216.6],[110.8,217.9],[110.6,219.3],[110.5,220.7],[110.4,222.0],[110.3,223.3],[110.3,224.7],[110.2,226.1],[110.2,227.4],[110.1,228.8],[110.1,230.1],[110.1,231.4],[110.1,232.8],[110.1,234.2],[110.0,235.5],[110.0,236.8],[110.0,238.2],[110.0,239.6],[110.0,240.9],[110.0,242.2],[110.0,243.6],[110.0,244.9],[110.0,246.3],[110.0,247.7],[110.0,249.0],[110.0,250.3],[110.0,251.7],[110.0,253.1],[110.0,254.4],[110.0,255.8],[110.0,257.1],[110.0,258.4],[110.0,259.8],[110.0,261.1],[110.0,262.5],[110.0,263.9],[110.0,265.2],[110.0,266.6],[110.0,267.9],[110.0,269.2],[110.0,270.6],[110.0,271.9],[110.0,273.3],[110.0,274.6],[110.0,276.0],[110.0,277.4],[110.0,278.7],[110.0,280.1],[110.0,281.4],[110.0,282.8],[110.0,284.1],[110.0,285.4],[110.0,286.8],[110.0,288.1],[110.0,289.5],[110.0,290.9],[110.0,292.2],[110.0,293.6],[110.0,294.9],[110.0,296.2],[110.0,297.6],[110.0,298.9],[110.0,300.3],[110.0,301.6],[110.0,303.0],[110.0,304.4],[110.0,305.7],[110.0,307.1],[110.0,308.4],[110.0,309.8],[110.0,311.1],[110.0,312.4],[110.0,313.8],[110.0,315.1],[110.0,316.5],[110.0,317.9],[110.0,319.2],[110.0,320.6],[110.0,321.9],[110.0,323.2],[110.0,324.6],[110.0,325.9],[110.0,327.3],[110.0,328.6],[110.0,330.0]],"c":"force4","w":2.2},{"t":"poly","pts":[[505.8,60.0],[505.8,61.4],[505.8,62.7],[505.7,64.0],[505.7,65.4],[505.7,66.8],[505.7,68.1],[505.7,69.5],[505.6,70.8],[505.6,72.2],[505.6,73.5],[505.6,74.8],[505.5,76.2],[505.5,77.5],[505.5,78.9],[505.4,80.2],[505.4,81.6],[505.4,83.0],[505.3,84.3],[505.3,85.7],[505.2,87.0],[505.2,88.3],[505.1,89.7],[505.1,91.0],[505.0,92.4],[505.0,93.8],[504.9,95.1],[504.8,96.5],[504.7,97.8],[504.7,99.2],[504.6,100.5],[504.5,101.8],[504.4,103.2],[504.3,104.5],[504.2,105.9],[504.1,107.2],[503.9,108.6],[503.8,110.0],[503.7,111.3],[503.5,112.7],[503.3,114.0],[503.2,115.3],[503.0,116.7],[502.8,118.0],[502.6,119.4],[502.4,120.8],[502.2,122.1],[501.9,123.5],[501.6,124.8],[501.4,126.2],[501.1,127.5],[500.8,128.8],[500.4,130.2],[500.1,131.6],[499.7,132.9],[499.3,134.2],[498.9,135.6],[498.4,136.9],[497.9,138.3],[497.4,139.7],[496.9,141.0],[496.3,142.3],[495.7,143.7],[495.1,145.1],[494.4,146.4],[493.7,147.8],[492.9,149.1],[492.1,150.4],[491.2,151.8],[490.3,153.2],[489.3,154.5],[488.3,155.8],[487.2,157.2],[486.1,158.6],[484.9,159.9],[483.6,161.2],[482.2,162.6],[480.8,163.9],[479.3,165.3],[477.6,166.7],[476.0,168.0],[474.2,169.3],[472.3,170.7],[470.3,172.1],[468.2,173.4],[466.1,174.8],[463.8,176.1],[461.3,177.4],[458.8,178.8],[456.1,180.2],[453.3,181.5],[450.4,182.8],[447.4,184.2],[444.2,185.6],[440.9,186.9],[437.4,188.2],[433.8,189.6],[430.0,190.9],[426.1,192.3],[422.0,193.7],[417.8,195.0],[413.5,196.3],[408.9,197.7],[404.3,199.1],[399.5,200.4],[394.6,201.8],[389.5,203.1],[384.3,204.4],[379.0,205.8],[373.5,207.2],[367.9,208.5],[362.3,209.8],[356.5,211.2],[350.6,212.6],[344.7,213.9],[338.7,215.2],[332.6,216.6],[326.5,217.9],[320.4,219.3],[314.2,220.7],[308.0,222.0],[301.8,223.3],[295.6,224.7],[289.5,226.1],[283.4,227.4],[277.3,228.8],[271.3,230.1],[265.4,231.4],[259.5,232.8],[253.7,234.2],[248.1,235.5],[242.5,236.8],[237.0,238.2],[231.7,239.6],[226.5,240.9],[221.4,242.2],[216.5,243.6],[211.7,244.9],[207.1,246.3],[202.5,247.7],[198.2,249.0],[194.0,250.3],[189.9,251.7],[186.0,253.1],[182.2,254.4],[178.6,255.8],[175.1,257.1],[171.8,258.4],[168.6,259.8],[165.6,261.1],[162.7,262.5],[159.9,263.9],[157.2,265.2],[154.7,266.6],[152.2,267.9],[149.9,269.2],[147.8,270.6],[145.7,271.9],[143.7,273.3],[141.8,274.6],[140.0,276.0],[138.4,277.4],[136.7,278.7],[135.2,280.1],[133.8,281.4],[132.4,282.8],[131.1,284.1],[129.9,285.4],[128.8,286.8],[127.7,288.1],[126.7,289.5],[125.7,290.9],[124.8,292.2],[123.9,293.6],[123.1,294.9],[122.3,296.2],[121.6,297.6],[120.9,298.9],[120.3,300.3],[119.7,301.6],[119.1,303.0],[118.6,304.4],[118.1,305.7],[117.6,307.1],[117.1,308.4],[116.7,309.8],[116.3,311.1],[115.9,312.4],[115.6,313.8],[115.2,315.1],[114.9,316.5],[114.6,317.9],[114.4,319.2],[114.1,320.6],[113.8,321.9],[113.6,323.2],[113.4,324.6],[113.2,325.9],[113.0,327.3],[112.8,328.6],[112.7,330.0]],"c":"accent","w":2.2},{"t":"poly","pts":[[110.0,60.0],[110.0,61.4],[110.0,62.7],[110.0,64.0],[110.0,65.4],[110.0,66.8],[110.0,68.1],[110.0,69.5],[110.0,70.8],[110.0,72.2],[110.0,73.5],[110.0,74.8],[110.0,76.2],[110.0,77.5],[110.0,78.9],[110.0,80.2],[110.0,81.6],[110.0,83.0],[110.0,84.3],[110.0,85.7],[110.0,87.0],[110.0,88.3],[110.0,89.7],[110.0,91.0],[110.0,92.4],[110.0,93.8],[110.0,95.1],[110.0,96.5],[110.0,97.8],[110.0,99.2],[110.0,100.5],[110.0,101.8],[110.0,103.2],[110.0,104.5],[110.0,105.9],[110.0,107.2],[110.0,108.6],[110.0,110.0],[110.0,111.3],[110.0,112.7],[110.0,114.0],[110.0,115.3],[110.0,116.7],[110.0,118.0],[110.0,119.4],[110.1,120.8],[110.1,122.1],[110.1,123.5],[110.1,124.8],[110.1,126.2],[110.2,127.5],[110.2,128.8],[110.2,130.2],[110.3,131.6],[110.3,132.9],[110.4,134.2],[110.4,135.6],[110.5,136.9],[110.6,138.3],[110.7,139.7],[110.8,141.0],[111.0,142.3],[111.1,143.7],[111.3,145.1],[111.5,146.4],[111.8,147.8],[112.1,149.1],[112.4,150.4],[112.8,151.8],[113.2,153.2],[113.7,154.5],[114.2,155.8],[114.8,157.2],[115.5,158.6],[116.3,159.9],[117.1,161.2],[118.1,162.6],[119.2,163.9],[120.3,165.3],[121.6,166.7],[123.1,168.0],[124.7,169.3],[126.4,170.7],[128.3,172.1],[130.4,173.4],[132.7,174.8],[135.1,176.1],[137.8,177.4],[140.7,178.8],[143.8,180.2],[147.2,181.5],[150.8,182.8],[154.6,184.2],[158.7,185.6],[163.1,186.9],[167.7,188.2],[172.5,189.6],[177.7,190.9],[183.1,192.3],[188.7,193.7],[194.6,195.0],[200.8,196.3],[207.1,197.7],[213.7,199.1],[220.5,200.4],[227.4,201.8],[234.6,203.1],[241.8,204.4],[249.2,205.8],[256.7,207.2],[264.2,208.5],[271.7,209.8],[279.3,211.2],[286.8,212.6],[294.2,213.9],[301.5,215.2],[308.6,216.6],[315.6,217.9],[322.3,219.3],[328.8,220.7],[335.0,222.0],[340.8,223.3],[346.2,224.7],[351.3,226.1],[355.9,227.4],[360.0,228.8],[363.6,230.1],[366.8,231.4],[369.3,232.8],[371.4,234.2],[372.8,235.5],[373.7,236.8],[374.0,238.2],[373.7,239.6],[372.8,240.9],[371.4,242.2],[369.3,243.6],[366.8,244.9],[363.6,246.3],[360.0,247.7],[355.9,249.0],[351.3,250.3],[346.2,251.7],[340.8,253.1],[335.0,254.4],[328.8,255.8],[322.3,257.1],[315.6,258.4],[308.6,259.8],[301.5,261.1],[294.2,262.5],[286.8,263.9],[279.3,265.2],[271.7,266.6],[264.2,267.9],[256.7,269.2],[249.2,270.6],[241.8,271.9],[234.6,273.3],[227.4,274.6],[220.5,276.0],[213.7,277.4],[207.1,278.7],[200.8,280.1],[194.6,281.4],[188.7,282.8],[183.1,284.1],[177.7,285.4],[172.5,286.8],[167.7,288.1],[163.1,289.5],[158.7,290.9],[154.6,292.2],[150.8,293.6],[147.2,294.9],[143.8,296.2],[140.7,297.6],[137.8,298.9],[135.1,300.3],[132.7,301.6],[130.4,303.0],[128.3,304.4],[126.4,305.7],[124.7,307.1],[123.1,308.4],[121.6,309.8],[120.3,311.1],[119.2,312.4],[118.1,313.8],[117.1,315.1],[116.3,316.5],[115.5,317.9],[114.8,319.2],[114.2,320.6],[113.7,321.9],[113.2,323.2],[112.8,324.6],[112.4,325.9],[112.1,327.3],[111.8,328.6],[111.5,330.0]],"c":"muted","w":2.2},{"t":"poly","pts":[[110.0,60.0],[110.0,61.4],[110.0,62.7],[110.0,64.0],[110.0,65.4],[110.0,66.8],[110.0,68.1],[110.0,69.5],[110.0,70.8],[110.0,72.2],[110.0,73.5],[110.0,74.8],[110.0,76.2],[110.0,77.5],[110.0,78.9],[110.0,80.2],[110.0,81.6],[110.0,83.0],[110.0,84.3],[110.0,85.7],[110.0,87.0],[110.0,88.3],[110.0,89.7],[110.0,91.0],[110.0,92.4],[110.0,93.8],[110.0,95.1],[110.0,96.5],[110.0,97.8],[110.0,99.2],[110.0,100.5],[110.0,101.8],[110.0,103.2],[110.0,104.5],[110.0,105.9],[110.0,107.2],[110.0,108.6],[110.0,110.0],[110.0,111.3],[110.0,112.7],[110.0,114.0],[110.0,115.3],[110.0,116.7],[110.0,118.0],[110.0,119.4],[110.0,120.8],[110.0,122.1],[110.0,123.5],[110.0,124.8],[110.0,126.2],[110.0,127.5],[110.0,128.8],[110.0,130.2],[110.0,131.6],[110.0,132.9],[110.0,134.2],[110.0,135.6],[110.1,136.9],[110.1,138.3],[110.1,139.7],[110.1,141.0],[110.1,142.3],[110.1,143.7],[110.1,145.1],[110.1,146.4],[110.1,147.8],[110.1,149.1],[110.1,150.4],[110.1,151.8],[110.1,153.2],[110.2,154.5],[110.2,155.8],[110.2,157.2],[110.2,158.6],[110.2,159.9],[110.2,161.2],[110.3,162.6],[110.3,163.9],[110.3,165.3],[110.3,166.7],[110.4,168.0],[110.4,169.3],[110.4,170.7],[110.5,172.1],[110.5,173.4],[110.5,174.8],[110.6,176.1],[110.6,177.4],[110.7,178.8],[110.8,180.2],[110.8,181.5],[110.9,182.8],[111.0,184.2],[111.1,185.6],[111.2,186.9],[111.3,188.2],[111.4,189.6],[111.5,190.9],[111.6,192.3],[111.8,193.7],[111.9,195.0],[112.1,196.3],[112.2,197.7],[112.4,199.1],[112.7,200.4],[112.9,201.8],[113.1,203.1],[113.4,204.4],[113.7,205.8],[114.0,207.2],[114.4,208.5],[114.7,209.8],[115.1,211.2],[115.6,212.6],[116.0,213.9],[116.6,215.2],[117.1,216.6],[117.7,217.9],[118.4,219.3],[119.1,220.7],[119.9,222.0],[120.7,223.3],[121.6,224.7],[122.6,226.1],[123.6,227.4],[124.8,228.8],[126.0,230.1],[127.3,231.4],[128.8,232.8],[130.3,234.2],[132.0,235.5],[133.8,236.8],[135.7,238.2],[137.8,239.6],[140.0,240.9],[142.4,242.2],[145.0,243.6],[147.8,244.9],[150.7,246.3],[153.8,247.7],[157.2,249.0],[160.8,250.3],[164.6,251.7],[168.6,253.1],[172.9,254.4],[177.4,255.8],[182.2,257.1],[187.3,258.4],[192.6,259.8],[198.2,261.1],[204.0,262.5],[210.1,263.9],[216.5,265.2],[223.1,266.6],[230.0,267.9],[237.0,269.2],[244.3,270.6],[251.8,271.9],[259.5,273.3],[267.3,274.6],[275.3,276.0],[283.4,277.4],[291.5,278.7],[299.8,280.1],[308.0,281.4],[316.2,282.8],[324.5,284.1],[332.6,285.4],[340.7,286.8],[348.7,288.1],[356.5,289.5],[364.2,290.9],[371.7,292.2],[379.0,293.6],[386.0,294.9],[392.9,296.2],[399.5,297.6],[405.9,298.9],[412.0,300.3],[417.8,301.6],[423.4,303.0],[428.7,304.4],[433.8,305.7],[438.6,307.1],[443.1,308.4],[447.4,309.8],[451.4,311.1],[455.2,312.4],[458.8,313.8],[462.2,315.1],[465.3,316.5],[468.2,317.9],[471.0,319.2],[473.6,320.6],[476.0,321.9],[478.2,323.2],[480.3,324.6],[482.2,325.9],[484.0,327.3],[485.7,328.6],[487.2,330.0]],"c":"force","w":2.2},{"t":"text","p":[140.0,77.5],"s":"O₂","c":"force3","size":12,"a":"start"},{"t":"text","p":[390.8,80.2],"s":"NO₃⁻","c":"force2","size":12,"a":"start"},{"t":"text","p":[346.8,145.0],"s":"Fe²⁺","c":"force4","size":12,"a":"start"},{"t":"text","p":[496.4,182.8],"s":"SO₄²⁻","c":"accent","size":12,"a":"start"},{"t":"text","p":[390.8,247.6],"s":"HS⁻","c":"muted","size":12,"a":"start"},{"t":"text","p":[514.0,317.8],"s":"CH₄","c":"force","size":12,"a":"start"}]}
---
Profili schematici delle sostanze disciolte in un sedimento marino in funzione della profondità. Gli accettori di elettroni vengono consumati nell'ordine della torre dei potenziali: prima l'ossigeno, poi il nitrato, il ferro e il solfato; più in basso si accumulano il solfuro e il metano. Le profondità reali variano da millimetri a metri.
:::

## La chemiosintesi {#chemiosintesi}

Nel 1887 il microbiologo russo Sergej Vinogradskij osservò che il batterio *Beggiatoa*, che vive nelle acque sulfuree, accumula granuli di zolfo e li consuma, e propose che ricavasse energia dall'ossidazione dello zolfo. Fu la scoperta della **chemiolitotrofia**: la capacità di ricavare energia da sostanze inorganiche ridotte. Molti chemiolitotrofi sono anche **autotrofi**, cioè costruiscono le proprie molecole a partire dall'anidride carbonica; insieme formano la base di ecosistemi completamente indipendenti dalla luce, che compiono la **chemiosintesi**.

| Donatore | Accettore tipico | Organismi |
|---|---|---|
| $\mathrm{H_2}$ | $\mathrm{O_2}$, $\mathrm{SO_4^{2-}}$, $\mathrm{CO_2}$ | idrogeno-ossidanti, solfato-riduttori, metanogeni |
| $\mathrm{H_2S}$, $\mathrm S$ | $\mathrm{O_2}$, $\mathrm{NO_3^-}$ | solfo-ossidanti, come *Beggiatoa* |
| $\mathrm{NH_4^+}$, $\mathrm{NO_2^-}$ | $\mathrm{O_2}$ | nitrificanti |
| $\mathrm{Fe^{2+}}$ | $\mathrm{O_2}$, $\mathrm{NO_3^-}$ | ferro-ossidanti |
| $\mathrm{CH_4}$ | $\mathrm{O_2}$, $\mathrm{SO_4^{2-}}$ | metanotrofi |

Gli esempi più spettacolari si trovano attorno alle sorgenti idrotermali profonde, scoperte nel 1977 alle Galápagos. Il verme tubicolo gigante *Riftia pachyptila*, lungo fino a due metri, è privo di bocca e di intestino. Ospita in un organo specializzato miliardi di batteri solfo-ossidanti, ai quali porta con il sangue idrogeno solforato, ossigeno e anidride carbonica, e dai quali riceve le sostanze organiche. La chemiosintesi è però diffusa ben oltre gli abissi: i batteri nitrificanti del suolo, i solfo-ossidanti delle paludi e gli idrogeno-ossidanti del sottosuolo sono ovunque.

Per fissare l'anidride carbonica le cellule usano almeno sei vie diverse. Oltre al ciclo di Calvin delle piante e dei cianobatteri, molti procarioti usano il ciclo di Krebs percorso al contrario, o la **via dell'acetil-coenzima A**, nota anche come via di Wood e Ljungdahl, che riduce l'anidride carbonica con l'idrogeno attraverso enzimi ricchi di ferro, nichel e zolfo. Quest'ultima, la più economica in termini di energia, è usata da metanogeni e acetogeni ed è spesso proposta come la via più antica, legata alla chimica delle sorgenti idrotermali alcaline.

## Quanta energia basta per vivere {#soglia}

I potenziali standard si riferiscono a concentrazioni di $1$ mol/L e pressioni di $1$ bar, ben diverse da quelle naturali. L'energia libera effettivamente disponibile dipende dalle concentrazioni, secondo la relazione del capitolo [Equilibrio chimico](unit:chemistry-19):

$$\Delta G=\Delta G^{\circ\prime}+RT\ln Q,$$

dove $Q$ è il quoziente di reazione, il rapporto fra le attività dei prodotti e quelle dei reagenti, ciascuna elevata al proprio coefficiente.

::: esempio La metanogenesi con poco idrogeno
La metanogenesi $4\,\mathrm{H_2}+\mathrm{CO_2}\rightarrow\mathrm{CH_4}+2\,\mathrm{H_2O}$ ha $\Delta G^{\circ\prime}\approx-131$ kJ per mole di metano. In un sedimento con pressioni parziali di $10^{-4}$ bar di idrogeno e $0{,}1$ bar sia di anidride carbonica sia di metano, il quoziente vale

$$Q=\frac{p_\mathrm{CH_4}}{p_\mathrm{H_2}^4\,p_\mathrm{CO_2}}=\frac{0{,}1}{(10^{-4})^4\cdot0{,}1}=10^{16},$$

e a $25\ ^\circ\mathrm C$, con $RT\approx2{,}48$ kJ/mol,

$$\begin{aligned}\Delta G&\approx-131+2{,}48\cdot\ln10^{16}\\&\approx-131+91\approx-40\ \mathrm{kJ/mol}.\end{aligned}$$

L'idrogeno scarso riduce l'energia disponibile a meno di un terzo del valore standard.
:::

Poiché l'idrogeno compare alla quarta potenza, l'energia della metanogenesi dipende fortemente dalla sua concentrazione (figura 5). Sotto circa $10^{-5}$ bar di idrogeno l'energia disponibile scende sotto i $20$ kJ/mol, un valore vicino alla **soglia energetica minima** stimata per la vita: per sintetizzare un ATP la cellula deve accumulare l'energia di più reazioni, e sotto una decina o una ventina di kilojoule per mole di reazione la crescita diventa impossibile. Negli ambienti naturali le concentrazioni di idrogeno sono spesso mantenute proprio vicino a questa soglia, perché i microrganismi lo consumano finché ne ricavano energia.

::: figura metanogenesi
{"w":840,"h":320,"items":[{"t":"rect","p":[90,85.0,480,15.0],"c":"muted","r":0},{"t":"axes","o":[90,280],"x":[720,"log₁₀ della pressione di H₂ (bar)"],"y":[260,"ΔG, kJ/mol"],"sx":80,"sy":1.5,"xt":[[0,"−6"],[1,"−5"],[2,"−4"],[3,"−3"],[4,"−2"],[5,"−1"],[6,"0"]],"yt":[[0,"−140"],[40,"−100"],[80,"−60"],[120,"−20"],[160,"20"]]},{"t":"line","p":[90,70.0,570,70.0],"c":"ax","w":1,"dash":true},{"t":"plot","o":[90,280],"sx":80,"sy":1.5,"pts":[[0.0,145.9922281],[0.1,143.7090243],[0.2,141.4258205],[0.3,139.1426167],[0.4,136.8594129],[0.5,134.5762091],[0.6,132.2930053],[0.7,130.0098015],[0.8,127.7265977],[0.9,125.4433938],[1.0,123.16019],[1.1,120.8769862],[1.2,118.5937824],[1.3,116.3105786],[1.4,114.0273748],[1.5,111.744171],[1.6,109.4609672],[1.7,107.1777634],[1.8,104.8945596],[1.9,102.6113558],[2.0,100.328152],[2.1,98.0449482],[2.2,95.7617444],[2.3,93.4785406],[2.4,91.1953368],[2.5,88.912133],[2.6,86.6289292],[2.7,84.3457254],[2.8,82.0625216],[2.9,79.7793178],[3.0,77.496114],[3.1,75.2129102],[3.2,72.9297064],[3.3,70.6465026],[3.4,68.3632988],[3.5,66.080095],[3.6,63.7968912],[3.7,61.5136874],[3.8,59.2304836],[3.9,56.9472798],[4.0,54.664076],[4.1,52.3808722],[4.2,50.0976684],[4.3,47.8144646],[4.4,45.5312608],[4.5,43.248057],[4.6,40.9648532],[4.7,38.6816494],[4.8,36.3984456],[4.9,34.1152418],[5.0,31.832038],[5.1,29.5488342],[5.2,27.2656304],[5.3,24.9824266],[5.4,22.6992228],[5.5,20.416019],[5.6,18.1328152],[5.7,15.8496114],[5.8,13.5664076],[5.9,11.2832038],[6.0,9.0]],"c":"force2","w":2.6},{"t":"circle","p":[250,129.5,5],"c":"force"},{"t":"text","p":[260,123.5],"s":"esempio: −40 kJ/mol","c":"force","size":11,"a":"start"},{"t":"text","p":[554.0,96.5],"s":"soglia minima per la vita","c":"ax","size":11,"a":"end"}]}
---
Energia libera della metanogenesi da idrogeno e anidride carbonica, a $25\ ^\circ\mathrm C$, in funzione della pressione parziale dell'idrogeno, con anidride carbonica e metano a $0{,}1$ bar. La fascia indica l'intervallo stimato della soglia energetica minima per la vita.
:::

## I cicli degli elementi {#cicli}

Le reazioni di ossidoriduzione dei microrganismi, sommate su tutto il pianeta, muovono i grandi **cicli biogeochimici**. Nel ciclo del carbonio la fotosintesi e la chemiosintesi riducono l'anidride carbonica, la respirazione e la fermentazione la restituiscono, la metanogenesi e la metanotrofia regolano il metano. Nel ciclo dello zolfo i solfato-riduttori producono solfuri e i solfo-ossidanti li riossidano.

Il ciclo dell'azoto è dominato dai procarioti. L'azoto molecolare dell'atmosfera, con il suo triplo legame, è quasi inerte, e solo alcuni batteri e archei sanno trasformarlo in ammoniaca, con l'enzima **nitrogenasi**:

$$\begin{aligned}&\mathrm{N_2}+8\,\mathrm{H^+}+8\,e^-+16\,\mathrm{ATP}\\&\quad\longrightarrow2\,\mathrm{NH_3}+\mathrm{H_2}+16\,\mathrm{ADP}+16\,\mathrm P_i.\end{aligned}$$

Il costo, sedici ATP per molecola di azoto, mostra quanto sia difficile rompere quel legame. I nitrificanti ossidano poi l'ammoniaca a nitrito e nitrato, e i denitrificanti riducono il nitrato ad azoto molecolare, chiudendo il ciclo. Senza i procarioti l'azoto disponibile per costruire proteine e acidi nucleici sarebbe scarsissimo.

Questi cicli lasciano tracce nell'atmosfera. Il metano, l'ossido di diazoto e l'ossigeno della Terra sono prodotti in gran parte dalla vita, e la loro presenza contemporanea, lontana dall'equilibrio chimico, è una delle biofirme cercate sui pianeti di altre stelle, come si discute nel capitolo [Biofirme e falsi positivi](unit:biology-33).

## Energia e abitabilità {#astrobiologia}

Per l'astrobiologia la domanda «c'è acqua liquida?» è soltanto la prima. La seconda è: «c'è una fonte di energia che un organismo possa sfruttare?». Su un mondo senza luce solare, come un oceano sotto chilometri di ghiaccio, l'unica energia disponibile è quella delle reazioni fra sostanze lontane dall'equilibrio chimico, come un donatore di elettroni e un accettore che si incontrano.

Nel 2015 la sonda Cassini attraversò il pennacchio di Encelado a meno di cinquanta chilometri dalla superficie. Nel 2017 Hunter Waite e collaboratori riferirono di avervi misurato idrogeno molecolare fino all'$1{,}4\%$ in volume e anidride carbonica fino allo $0{,}8\%$. L'idrogeno è probabilmente prodotto dalle reazioni fra l'acqua calda e le rocce del nucleo, come nelle sorgenti idrotermali terrestri, e la sua coesistenza con l'anidride carbonica rappresenta un disequilibrio chimico sufficiente, secondo gli autori, a sostenere la metanogenesi. Encelado offre quindi acqua, sali, molecole organiche e una fonte di energia chimica, come si discute nel capitolo [Encelado e i suoi pennacchi](unit:biology-29).

Su Europa la superficie ghiacciata è bombardata dalle particelle cariche della magnetosfera di Giove, che producono ossidanti come l'ossigeno e l'acqua ossigenata. Se questi ossidanti raggiungono l'oceano, e se il fondale libera sostanze riducenti come l'idrogeno, l'oceano potrebbe ospitare una torre degli elettroni completa, dall'alto e dal basso. Su Marte i perclorati scoperti dal lander Phoenix nel 2008, tossici per molti organismi, sono anche accettori di elettroni usati da alcuni batteri terrestri, e i minerali ferrosi del sottosuolo potrebbero produrre idrogeno.

::: nota Energia e potenza
Una reazione deve liberare energia abbastanza in fretta. Una cellula consuma energia anche per mantenersi, riparando le proteine e mantenendo i gradienti delle membrane, e se il flusso di energia è troppo basso non riesce a crescere. Negli ambienti più poveri del sottosuolo terrestre le cellule vivono con potenze così basse che il loro tempo di rinnovo stimato è di secoli. Valutare l'abitabilità di un mondo significa quindi stimare, oltre alla presenza di energia chimica, anche il suo flusso.
:::

## Un'esperienza: la colonna di Vinogradskij {#esperienza}

Un ecosistema stratificato di microrganismi, con la zonazione degli accettori descritta in questo capitolo, si costruisce in una bottiglia.

::: metodo Una colonna di fango
**Materiale.** Una bottiglia di plastica trasparente da un litro e mezzo, fango scuro di uno stagno o di un fosso, carta di giornale sminuzzata, un tuorlo d'uovo sodo o un cucchiaino di gesso, un cucchiaino di gesso da lavagna in polvere, cioè carbonato di calcio, acqua dello stesso stagno, pellicola trasparente.

**Procedura.** Si mescola circa metà del fango con la carta, che fornisce cellulosa come fonte di carbonio, con il tuorlo o il solfato di calcio, che forniscono zolfo, e con il carbonato. Si riempie la bottiglia per un terzo con questo impasto, comprimendolo per eliminare le bolle, e per un altro terzo con il fango rimasto; si completa con l'acqua dello stagno, lasciando qualche centimetro d'aria, e si copre con la pellicola. La colonna va tenuta vicino a una finestra, al riparo dal sole diretto, per sei-otto settimane, osservando ogni settimana i colori che compaiono. La bottiglia va aperta solo all'aperto, perché si forma idrogeno solforato, e il contenuto va smaltito con i rifiuti organici; dopo averla maneggiata ci si lavano le mani.

**Analisi.** Disegnare la colonna indicando gli strati e i loro colori. Quale strato si forma per primo? Dove compaiono le zone nere, e dove quelle verdi, rosse e porpora? Collegare ogni strato ai donatori e agli accettori di elettroni disponibili a quella profondità.
:::

Nelle settimane si formano strati colorati (figura 6). In alto, dove arrivano luce e ossigeno, crescono alghe e cianobatteri verdi. In basso la decomposizione della cellulosa consuma l'ossigeno, e i batteri solfato-riduttori producono idrogeno solforato, che reagisce con il ferro formando solfuro di ferro nero. Fra le due zone, dove arriva la luce e c'è idrogeno solforato ma poco ossigeno, crescono i batteri fotosintetici sulfurei, verdi e porpora, che usano l'idrogeno solforato come donatore di elettroni, come i fotosintetizzatori più antichi del capitolo [Ossigeno, endosimbiosi e cellule complesse](unit:biology-17).

::: figura colonna
{"w":620,"h":350,"items":[{"t":"line","p":[354,55.0,384,55.0],"c":"muted","w":1},{"t":"text","p":[390,59.0],"s":"aria","c":"ax","size":11,"a":"start"},{"t":"rect","p":[230,70,120,80],"c":"force2","r":0},{"t":"line","p":[354,110.0,384,110.0],"c":"muted","w":1},{"t":"text","p":[390,114.0],"s":"acqua e cianobatteri","c":"ax","size":11,"a":"start"},{"t":"rect","p":[230,150,120,25],"c":"force4","r":0},{"t":"line","p":[354,162.5,384,162.5],"c":"muted","w":1},{"t":"text","p":[390,166.5],"s":"batteri porpora","c":"ax","size":11,"a":"start"},{"t":"rect","p":[230,175,120,25],"c":"force3","r":0},{"t":"line","p":[354,187.5,384,187.5],"c":"muted","w":1},{"t":"text","p":[390,191.5],"s":"batteri verdi dello zolfo","c":"ax","size":11,"a":"start"},{"t":"rect","p":[230,200,120,130],"c":"muted","r":0},{"t":"line","p":[354,265.0,384,265.0],"c":"muted","w":1},{"t":"text","p":[390,269.0],"s":"fango nero: solfato-riduttori","c":"ax","size":11,"a":"start"},{"t":"poly","pts":[[230,40],[350,40],[350,330],[230,330]],"close":true,"c":"ax","w":2},{"t":"arrow","p":[150,60,150,190],"c":"force3","w":1.8,"head":8},{"t":"text","p":[142,70],"s":"luce","c":"force3","size":11,"a":"end"},{"t":"text","p":[142,86],"s":"ossigeno","c":"force3","size":11,"a":"end"},{"t":"arrow","p":[190,320,190,170],"c":"force4","w":1.8,"head":8},{"t":"text","p":[182,316],"s":"idrogeno","c":"force4","size":11,"a":"end"},{"t":"text","p":[182,332],"s":"solforato","c":"force4","size":11,"a":"end"}]}
---
Schema di una colonna di Vinogradskij dopo alcune settimane. L'ossigeno diffonde dall'alto, l'idrogeno solforato dal basso; i microrganismi si dispongono secondo i gradienti di luce, ossigeno e solfuro.
:::

## Errori frequenti {#errori}

::: errore Credere che solo gli animali respirino
Respirano anche le piante, i funghi e moltissimi batteri, giorno e notte. La respirazione è un processo cellulare, distinto dalla ventilazione dei polmoni, che serve soltanto a portare l'ossigeno alle cellule.
:::

::: errore Pensare che l'ATP sia una riserva di energia
L'ATP è una valuta di scambio, rigenerata di continuo da una scorta minima. Le riserve di energia sono i grassi, l'amido e il glicogeno.
:::

::: errore Dire che la catena di trasporto produce ATP
La catena di trasporto usa l'energia degli elettroni per pompare protoni. È l'ATP sintasi a produrre ATP, sfruttando il ritorno dei protoni attraverso la membrana.
:::

::: errore Credere che la vita richieda luce o cibo organico
I chemiolitotrofi autotrofi ricavano energia e carbonio da sostanze inorganiche. Interi ecosistemi, come quelli delle sorgenti idrotermali e del sottosuolo profondo, vivono senza luce solare.
:::

::: errore Usare i potenziali standard come energie reali
L'energia disponibile in un ambiente dipende dalle concentrazioni effettive di reagenti e prodotti. Una reazione molto favorevole in condizioni standard può diventare marginale quando un reagente è scarso.
:::

## Sintesi {#sintesi}

::: sintesi In breve
- Il metabolismo energetico trasferisce elettroni da un donatore a un accettore; con $n$ elettroni e differenza di potenziale $\Delta E^{\circ\prime}$ l'energia libera è $\Delta G^{\circ\prime}=-nF\Delta E^{\circ\prime}$.
- La cellula converte questa energia in ATP, la valuta universale, che rigenera di continuo da una scorta minima.
- La glicolisi spezza il glucosio in due piruvati con un guadagno netto di due ATP e due NADH; la fermentazione rigenera il NAD$^+$ cedendo gli elettroni al piruvato o a un suo derivato.
- La respirazione aerobica ossida completamente il glucosio con il ciclo di Krebs e la catena di trasporto; la chemiosmosi e l'ATP sintasi producono circa $30$-$32$ ATP per glucosio, quindici volte la fermentazione.
- La respirazione anaerobica usa accettori come nitrato, ossidi metallici, solfato e anidride carbonica; negli ambienti naturali gli accettori vengono consumati nell'ordine della torre dei potenziali.
- I chemiolitotrofi ricavano energia da idrogeno, zolfo, ammoniaca o ferro, e sostengono ecosistemi senza luce; la via dell'acetil-coenzima A è forse la via di fissazione del carbonio più antica.
- L'energia reale dipende dalle concentrazioni, $\Delta G=\Delta G^{\circ\prime}+RT\ln Q$; la vita sembra richiedere almeno $10$-$20$ kJ per mole di reazione.
- Una fonte di energia chimica è un requisito di abitabilità: l'idrogeno nei pennacchi di Encelado ne è il primo esempio misurato fuori dalla Terra.
:::

## Glossario {#glossario}

- **Accettore di elettroni**: sostanza che si riduce ricevendo elettroni.
- **ATP sintasi**: enzima di membrana che produce ATP sfruttando il flusso dei protoni.
- **Autotrofo**: organismo che costruisce le proprie molecole a partire dall'anidride carbonica.
- **Chemiolitotrofo**: organismo che ricava energia dall'ossidazione di sostanze inorganiche.
- **Chemiosmosi**: produzione di ATP sfruttando un gradiente di protoni attraverso una membrana.
- **Ciclo di Krebs**: ciclo di reazioni che ossida completamente il gruppo acetile ad anidride carbonica.
- **Donatore di elettroni**: sostanza che si ossida cedendo elettroni.
- **Fermentazione**: via metabolica senza accettore esterno, in cui gli elettroni tornano a un derivato del substrato.
- **Forza motrice protonica**: energia immagazzinata nel gradiente di concentrazione e di carica dei protoni.
- **Glicolisi**: sequenza di reazioni che spezza il glucosio in due molecole di piruvato.
- **Potenziale di riduzione**: misura della tendenza di una sostanza ad acquistare elettroni.
- **Respirazione anaerobica**: respirazione con un accettore finale diverso dall'ossigeno.

## Esercizi {#esercizi}

::: esercizio Idrogeno e ossigeno [base]
Calcolare $\Delta G^{\circ\prime}$ per l'ossidazione dell'idrogeno con l'ossigeno, per due elettroni, con i potenziali della tabella.
>>> soluzione
$\Delta E^{\circ\prime}=0{,}82-(-0{,}41)=1{,}23$ V, e

$$\begin{aligned}\Delta G^{\circ\prime}&=-2\cdot96\,485\cdot1{,}23\ \mathrm{J/mol}\\&\approx-237\ \mathrm{kJ/mol},\end{aligned}$$

uguale all'energia libera di formazione dell'acqua.
:::

::: esercizio Lo stesso ATP [base]
Un organismo aerobico consuma $1$ mmol di glucosio con una resa di $30$ ATP per glucosio. Quanto glucosio deve consumare un organismo che fermenta, con resa $2$, per ottenere lo stesso ATP?
>>> soluzione
L'organismo aerobico ottiene $30$ mmol di ATP; con resa $2$ servono $15$ mmol di glucosio, quindici volte di più.
:::

::: esercizio Fermentazione o respirazione anaerobica? [base]
Classificare i processi seguenti: un lievito che produce etanolo; un batterio che riduce il nitrato ad azoto molecolare; un muscolo che produce lattato; un archeo che produce metano da idrogeno e anidride carbonica.
>>> soluzione
Il lievito e il muscolo fermentano: gli elettroni tornano a un derivato del piruvato. Il batterio denitrificante e l'archeo metanogeno respirano senza ossigeno, con il nitrato e l'anidride carbonica come accettori esterni.
:::

::: esercizio Gli strati di un sedimento [base]
In quale ordine vengono consumati, dall'alto verso il basso, gli accettori di elettroni in un sedimento: solfato, ossigeno, nitrato, ossidi di ferro? Perché?
>>> soluzione
Ossigeno, nitrato, ossidi di ferro, solfato. È l'ordine dei potenziali di riduzione: gli organismi che usano l'accettore più energetico disponibile ricavano più energia dagli stessi donatori e prevalgono finché quell'accettore non si esaurisce.
:::

::: esercizio Il NAD nella glicolisi [base]
Perché un lievito senza ossigeno non può limitarsi alla glicolisi, eliminando il piruvato senza trasformarlo?
>>> soluzione
La glicolisi consuma NAD$^+$ trasformandolo in NADH. Senza un modo per riossidare il NADH la scorta di NAD$^+$ si esaurirebbe e la glicolisi si fermerebbe. Riducendo il piruvato o l'acetaldeide, la fermentazione rigenera il NAD$^+$.
:::

::: esercizio Batteri senza luce [base]
Un batterio delle sorgenti idrotermali ossida l'idrogeno solforato con l'ossigeno e costruisce le proprie molecole a partire dall'anidride carbonica. Come si classifica?
>>> soluzione
È un chemiolitotrofo, perché ricava energia da una sostanza inorganica, e un autotrofo, perché il suo carbonio viene dall'anidride carbonica.
:::

::: esercizio Contare gli ATP [medio]
Per ogni glucosio la glicolisi produce $2$ ATP e $2$ NADH; l'ossidazione dei due piruvati $2$ NADH; i due giri del ciclo di Krebs $6$ NADH, $2$ FADH$_2$ e $2$ ATP. Con $2{,}5$ ATP per NADH e $1{,}5$ per FADH$_2$, quanti ATP si ottengono? Quanti se i due NADH della glicolisi rendono solo $1{,}5$ ATP ciascuno, perché entrano nel mitocondrio attraverso un percorso meno efficiente?
>>> soluzione
I NADH sono $10$ e danno $25$ ATP; i FADH$_2$ ne danno $3$; si aggiungono $4$ ATP diretti, per un totale di $32$. Se due NADH rendono $1{,}5$ invece di $2{,}5$ si perdono $2$ ATP, e il totale è $30$.
:::

::: esercizio Il rendimento nelle condizioni cellulari [medio]
Con $32$ ATP per glucosio e circa $50$ kJ/mol per ATP nelle condizioni cellulari, quale frazione dei $2870$ kJ/mol del glucosio viene conservata? Dove va il resto?
>>> soluzione
$32\cdot50/2870\approx0{,}56$, circa il $56\%$. Il resto si disperde come calore, che negli animali a sangue caldo contribuisce a mantenere la temperatura corporea.
:::

::: esercizio Metanogenesi con più idrogeno [medio]
Ripetere il calcolo dell'esempio con una pressione parziale di idrogeno di $10^{-3}$ bar, lasciando anidride carbonica e metano a $0{,}1$ bar.
>>> soluzione
$Q=0{,}1/((10^{-3})^4\cdot0{,}1)=10^{12}$, e

$$\begin{aligned}\Delta G&\approx-131+2{,}48\cdot\ln10^{12}\\&\approx-131+68{,}5\approx-62{,}5\ \mathrm{kJ/mol}.\end{aligned}$$
:::

::: esercizio Idrogeno con due accettori [medio]
Calcolare l'energia libera standard per due elettroni ceduti dall'idrogeno al solfato, che si riduce a solfuro, e confrontarla con quella per l'ossigeno dell'esercizio «Idrogeno e ossigeno». Quanto vale per una mole di solfato, che richiede otto elettroni?
>>> soluzione
$\Delta E^{\circ\prime}=-0{,}22-(-0{,}41)=0{,}19$ V, e per due elettroni $\Delta G^{\circ\prime}\approx-37$ kJ/mol, circa sei volte e mezzo meno che con l'ossigeno. Per una mole di solfato, con otto elettroni, si ottiene circa $-147$ kJ/mol.
:::

::: esercizio Quanto ATP in un giorno [medio]
Un essere umano a riposo consuma circa $0{,}25$ litri di ossigeno al minuto, misurati a $0\ ^\circ\mathrm C$ e $1$ atm. Con $2{,}5$ ATP per ogni coppia di elettroni ceduta a un atomo di ossigeno, quante moli di ATP produce in un giorno? Quanti chilogrammi, se la massa molare dell'ATP è $507$ g/mol?
>>> soluzione
In un giorno consuma $0{,}25\cdot1440=360$ litri, cioè circa $360/22{,}4\approx16$ moli di ossigeno molecolare, $32$ moli di atomi. Gli ATP sono circa $32\cdot2{,}5=80$ moli, cioè $80\cdot507\ \mathrm g\approx41$ kg.
:::

::: esercizio Il prezzo dell'azoto [medio]
La nitrogenasi consuma $16$ ATP per ogni molecola di azoto ridotta a due molecole di ammoniaca. Quanto glucosio deve ossidare per via aerobica, con $30$ ATP per glucosio, un batterio che fissa una mole di azoto? Quanti grammi di glucosio servono per ogni mole di ammoniaca, con massa molare del glucosio $180$ g/mol?
>>> soluzione
Servono $16/30\approx0{,}53$ moli di glucosio per mole di azoto, cioè circa $0{,}27$ moli per mole di ammoniaca, pari a circa $48$ grammi.
:::

::: esercizio La soglia dell'idrogeno [avanzato]
Con anidride carbonica e metano a $0{,}1$ bar e $25\ ^\circ\mathrm C$, a quale pressione parziale dell'idrogeno l'energia della metanogenesi scende a $-20$ kJ/mol?
>>> soluzione
Con queste pressioni $\Delta G=-131-4RT\ln p_\mathrm{H_2}$. Imponendo $-20=-131-4\cdot2{,}48\ln p_\mathrm{H_2}$ si ottiene $\ln p_\mathrm{H_2}\approx-11{,}2$, cioè $p_\mathrm{H_2}\approx1{,}4\cdot10^{-5}$ bar. Le concentrazioni di idrogeno misurate nei sedimenti metanogenici sono spesso di questo ordine.
:::

::: esercizio Quanti protoni per un ATP [avanzato]
L'energia libera ceduta da una mole di protoni che attraversa una membrana con forza motrice protonica $\Delta p$ è $F\,\Delta p$. Calcolarla per $\Delta p=0{,}18$ V e stimare quanti protoni servono, come minimo, per sintetizzare un ATP che costa $50$ kJ/mol.
>>> soluzione
$F\,\Delta p=96\,485\cdot0{,}18\ \mathrm{J/mol}\approx17{,}4$ kJ/mol. Servono almeno $50/17{,}4\approx2{,}9$ protoni per ATP. I valori misurati, includendo il trasporto di ADP e fosfato nel mitocondrio, sono di circa $3{,}7$ protoni per ATP, coerenti con circa $2{,}5$ ATP per NADH, che pompa $10$ protoni.
:::

::: esercizio Un oceano più ricco di idrogeno [avanzato]
In un oceano extraterrestre l'idrogeno disciolto è cento volte più concentrato che nel sedimento dell'esempio, mentre le altre condizioni restano uguali. Di quanto cambia l'energia della metanogenesi? Perché la risposta dipende così fortemente dall'idrogeno?
>>> soluzione
Il quoziente diminuisce di $100^4=10^8$ volte, e $\Delta G$ diventa più negativo di $RT\ln10^8\approx2{,}48\cdot18{,}4\approx46$ kJ/mol, passando da circa $-40$ a circa $-85$ kJ/mol. La dipendenza è forte perché nella reazione l'idrogeno compare con coefficiente quattro, e quindi alla quarta potenza nel quoziente.
:::

::: esercizio La scala degli accettori per il NADH [avanzato]
Calcolare $\Delta G^{\circ\prime}$ per due elettroni ceduti dal NADH all'ossigeno, al nitrato che diventa nitrito, al fumarato e al solfato. Che cosa suggerisce il risultato sul solfato, sapendo che la sintesi di un ATP richiede circa $50$ kJ/mol?
>>> soluzione
Le differenze di potenziale sono $1{,}14$, $0{,}74$, $0{,}35$ e $0{,}10$ V, e le energie circa $-220$, $-143$, $-68$ e $-19$ kJ/mol. Con il solfato il NADH libera troppo poco per un ATP: i solfato-riduttori usano donatori più energetici, come l'idrogeno o il lattato, e meccanismi che uniscono l'energia di più reazioni.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti i riferimenti principali sono A. M. Shaw, *Astrochemistry: From Astronomy to Astrobiology*, Wiley, 2006, §9.4 (fonti di energia degli autotrofi), e J. R. Morris, D. L. Hartl, A. H. Knoll e collaboratori, *Biology: How Life Works*, 2ª edizione, Macmillan, 2016, §7.1-7.7 (respirazione cellulare e fermentazione), §26.2 (diversità metabolica dei procarioti) e §26.3 (cicli biogeochimici). I potenziali e le energie libere sono tratti dalle fonti primarie seguenti, insieme ai dati e agli esperimenti citati.

1. R. K. Thauer, K. Jungermann, K. Decker, *Bacteriological Reviews* 41, 100 (1977): energetica dei batteri chemiotrofi e potenziali standard.
2. P. Mitchell, *Nature* 191, 144 (1961): l'ipotesi chemiosmotica.
3. H. Noji, R. Yasuda, M. Yoshida, K. Kinosita, *Nature* 386, 299 (1997): la rotazione dell'ATP sintasi.
4. P. C. Hinkle, *Biochimica et Biophysica Acta* 1706, 1 (2005): i rapporti fra fosfato e ossigeno.
5. S. Winogradsky, *Botanische Zeitung* 45, 489 (1887): i batteri dello zolfo e la chemiolitotrofia.
6. C. M. Cavanaugh e collaboratori, *Science* 213, 340 (1981): i simbionti di *Riftia*.
7. Y. Shen, R. Buick, D. E. Canfield, *Nature* 410, 77 (2001): la riduzione microbica del solfato $3{,}47$ miliardi di anni fa.
8. I. A. Berg, *Applied and Environmental Microbiology* 77, 1925 (2011): le vie di fissazione del carbonio.
9. T. M. Hoehler, B. B. Jørgensen, *Nature Reviews Microbiology* 11, 83 (2013): la vita con pochissima energia.
10. J. H. Waite e collaboratori, *Science* 356, 155 (2017): l'idrogeno nel pennacchio di Encelado.
11. J. D. Coates, L. A. Achenbach, *Nature Reviews Microbiology* 2, 569 (2004): la riduzione microbica del perclorato.
