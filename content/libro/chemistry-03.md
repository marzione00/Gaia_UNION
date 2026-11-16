---
unit: chemistry-03
titolo: Mole e quantità di sostanza
sottotitolo: Contare le particelle pesando la materia
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §2-7, 2-8, 3-2, 3-3
---

## Prima di cominciare {#apertura}

Nella cucina della stazione orbitale il cuoco lavora con la bilancia: grammi di farina, grammi di sale, grammi d'acqua. Nel laboratorio accanto, una chimica prepara l'idrogeno e l'ossigeno per le celle a combustibile che alimentano i moduli. La sua ricetta è scritta in un'altra lingua: due molecole di idrogeno per ogni molecola di ossigeno. Le molecole però sono troppo piccole per essere viste e troppo numerose per essere contate una per una, e sulla stazione, come in ogni laboratorio, l'unico strumento affidabile per dosare i reagenti resta la bilancia. Serve un ponte fra il numero di particelle, che decide come procede una reazione, e la massa, che sappiamo misurare.

Quel ponte è la **mole**, l'unità di misura della quantità di sostanza. Questo capitolo la costruisce passo per passo: da dove viene, che cosa conta, perché il suo valore è stato scelto proprio così, come si passa dalla massa al numero di particelle e ritorno, come si legge in una formula chimica la quantità di ciascun elemento e, al contrario, come si ricava una formula dai risultati di un'analisi.

::: obiettivi
- distinguere massa, quantità di sostanza e numero di entità elementari;
- enunciare la definizione della mole in vigore dal 2019 e il ruolo della costante di Avogadro;
- calcolare la massa molare di elementi, molecole, composti ionici e idrati;
- convertire fra massa, quantità di sostanza e numero di particelle controllando le unità;
- calcolare la composizione percentuale in massa di un composto;
- ricavare formula minima e formula molecolare da dati di composizione e da un'analisi per combustione;
- stimare ordini di grandezza e riconoscere gli errori più frequenti.
:::

Il capitolo presuppone le idee di atomo, numero di massa e isotopo del capitolo [Atomi, isotopi e massa media](unit:chemistry-02), e l'uso consapevole di unità e cifre significative del capitolo [Misure, unità e incertezza](unit:physics-01). La mole sarà lo strumento principale di [Stechiometria e reagente limitante](unit:chemistry-14), di [Soluzioni e concentrazione](unit:chemistry-12) e di [Gas e stato aeriforme](unit:chemistry-10).

## Contare pesando {#contare}

Una banca che deve contare migliaia di monete da un euro non le conta una per una. Le mette su una bilancia: sapendo che ogni moneta ha una massa di $7{,}5\un{g}$, un sacchetto di $3{,}75\un{kg}$ ne contiene $3750/7{,}5=500$. Il metodo funziona a due condizioni: tutte le monete devono avere la stessa massa, o almeno la stessa massa media, e la massa di una moneta deve essere nota.

La chimica affronta lo stesso problema su una scala enormemente più piccola. In un grammo di acqua ci sono circa $3\times10^{22}$ molecole: anche contandone un miliardo al secondo, servirebbe un milione di anni per finire. Contare pesando è l'unica strada praticabile, e richiede le stesse due informazioni della banca. La prima è la massa di ciascuna particella, o almeno la massa media; la seconda è un'unità di conteggio adatta a numeri così grandi.

Per gli oggetti comuni usiamo da sempre unità di conteggio: la dozzina vale dodici oggetti, la risma cinquecento fogli. Nessuno confonde una dozzina di uova con una dozzina di angurie: il numero è lo stesso, la massa è diversissima. La mole è un'unità di conteggio dello stesso tipo, con un numero molto più grande. Una mole di atomi di carbonio e una mole di molecole di zucchero contengono lo stesso numero di entità; le loro masse stanno nello stesso rapporto delle masse delle singole entità.

::: quotidiano Contare viti con la bilancia
In un magazzino di ferramenta le viti si vendono a peso. Il magazziniere pesa una confezione campione di cento viti, ottiene $236\un{g}$, e da quel momento pesa le confezioni invece di contarle: $1{,}18\un{kg}$ di viti corrispondono a circa cinquecento pezzi. Il chimico fa la stessa cosa, con una differenza importante: la massa di riferimento per atomi e molecole è stata misurata una volta per tutte ed è raccolta nelle tabelle delle masse atomiche.
:::

Il resto del capitolo sviluppa questa idea in tre passi. Prima occorre stabilire come si confrontano le masse di atomi diversi: è la scala delle masse atomiche relative. Poi serve l'unità di conteggio: la mole, con la costante di Avogadro. Infine le due cose si uniscono nella massa molare, che permette di passare dalla bilancia al numero di particelle con una sola divisione.

## Dalle masse relative alla costante di Avogadro {#storia}

All'inizio dell'Ottocento la chimica disponeva già di una regolarità sperimentale importante: gli elementi si combinano in rapporti di massa fissi, e quando due elementi formano più composti, le masse di uno che si combinano con una massa fissa dell'altro stanno fra loro in rapporti di numeri interi piccoli. John Dalton interpretò queste leggi con l'ipotesi atomica: ogni elemento è formato da atomi tutti uguali fra loro, e un composto è formato da atomi di elementi diversi uniti in rapporti fissi. Da questa ipotesi seguiva un programma di lavoro preciso: misurare le **masse relative** degli atomi, cioè quante volte un atomo è più pesante di un altro.

Il programma si scontrò subito con una difficoltà. Per ricavare la massa relativa di un atomo dalle masse che si combinano occorre conoscere la formula del composto, e per conoscere la formula occorrono le masse relative. Dalton, per esempio, assegnò all'acqua la formula più semplice possibile, un atomo di idrogeno e uno di ossigeno, e ottenne per l'ossigeno una massa relativa circa metà di quella corretta.

Nel 1811 Amedeo Avogadro propose una via d'uscita: volumi uguali di gas diversi, alla stessa temperatura e alla stessa pressione, contengono lo stesso numero di molecole, e le molecole dei gas elementari come idrogeno e ossigeno possono essere formate da due atomi. Con questa ipotesi i rapporti fra i volumi dei gas che reagiscono diventano rapporti fra numeri di molecole, e la formula dell'acqua risulta $\mathrm{H_2O}$. L'idea rimase quasi ignorata per mezzo secolo. Nel 1858 Stanislao Cannizzaro la riprese in un sommario delle sue lezioni a Genova e la usò per costruire una tabella coerente delle masse atomiche; al congresso di Karlsruhe del 1860 l'opuscolo di Cannizzaro convinse molti chimici, e le masse atomiche moderne derivano da quel lavoro.

Restava aperta una domanda: quante molecole ci sono davvero in una data quantità di gas? Nel 1865 Josef Loschmidt ottenne la prima stima, usando la teoria cinetica dei gas e le misure di viscosità. Il valore era approssimato, ma per la prima volta l'ordine di grandezza era noto. Alla fine dell'Ottocento Wilhelm Ostwald introdusse il termine *Mol*, abbreviazione di molecola, per indicare la quantità di sostanza la cui massa in grammi è numericamente uguale alla massa molecolare relativa. Nel 1909 Jean Perrin, dopo aver misurato in molti modi indipendenti il numero di molecole in una mole, ottenendo valori concordi, propose di chiamarlo numero di Avogadro. Quell'accordo fra metodi diversi fu una delle prove decisive dell'esistenza reale di atomi e molecole.

::: figura linea-tempo
{"w":620,"h":220,"items":[
{"t":"line","p":[30,110,600,110],"c":"ax","w":2},
{"t":"line","p":[57,103,57,117],"c":"ax","w":2},{"t":"text","p":[57,92],"s":"1811","c":"force","size":13},{"t":"text","p":[57,74],"s":"Avogadro","c":"ax","size":12},
{"t":"line","p":[172,103,172,117],"c":"ax","w":2},{"t":"text","p":[172,92],"s":"1858","c":"force","size":13},{"t":"text","p":[172,74],"s":"Cannizzaro","c":"ax","size":12},
{"t":"line","p":[189,103,189,117],"c":"ax","w":2},{"t":"text","p":[189,136],"s":"1865","c":"force","size":13},{"t":"text","p":[189,154],"s":"Loschmidt","c":"ax","size":12},
{"t":"line","p":[262,103,262,117],"c":"ax","w":2},{"t":"text","p":[262,92],"s":"fine '800","c":"force","size":13},{"t":"text","p":[262,74],"s":"Ostwald, «Mol»","c":"ax","size":12},
{"t":"line","p":[296,103,296,117],"c":"ax","w":2},{"t":"text","p":[296,136],"s":"1909","c":"force","size":13},{"t":"text","p":[296,154],"s":"Perrin","c":"ax","size":12},
{"t":"line","p":[448,103,448,117],"c":"ax","w":2},{"t":"text","p":[448,92],"s":"1971","c":"force","size":13},{"t":"text","p":[448,74],"s":"la mole entra nel SI","c":"ax","size":12},
{"t":"line","p":[565,103,565,117],"c":"ax","w":2},{"t":"text","p":[600,136],"s":"2019","c":"force","size":13,"a":"end"},{"t":"text","p":[600,154],"s":"costante fissata","c":"ax","size":12,"a":"end"},
{"t":"text","p":[30,200],"s":"1800","c":"muted","size":11,"a":"start"},{"t":"text","p":[600,200],"s":"2025","c":"muted","size":11,"a":"end"}
]}
---
Le tappe principali della storia della mole, su una scala dei tempi lineare dal 1800 al 2025.
:::

Nel 1971 la quattordicesima Conferenza generale dei pesi e delle misure introdusse la mole come settima unità di base del Sistema Internazionale, definendola come la quantità di sostanza che contiene tante entità elementari quanti sono gli atomi in $0{,}012\un{kg}$ di carbonio-12. Con questa definizione la massa molare del carbonio-12 era esattamente $12\un{g/mol}$, e il numero di Avogadro era una grandezza da misurare. Dal 20 maggio 2019 la situazione è rovesciata: il numero è fissato per definizione e la massa molare del carbonio-12 diventa una grandezza misurata, uguale a $12\un{g/mol}$ entro una parte su un miliardo. La sezione [La mole e la costante di Avogadro](#mole) spiega che cosa cambia in pratica.

## Massa atomica relativa e dalton {#massa-atomica}

Le masse degli atomi sono piccolissime: un atomo di carbonio-12 ha una massa di circa $2\times10^{-26}\un{kg}$. Esprimerle in chilogrammi è scomodo, e per i calcoli chimici serve soprattutto il loro rapporto. Per questo si usa un'unità di massa su misura per gli atomi.

::: definizione Unità di massa atomica
L'**unità di massa atomica unificata**, simbolo $\mathrm{u}$, chiamata anche **dalton** (simbolo $\mathrm{Da}$), è un dodicesimo della massa di un atomo di carbonio-12 nello stato fondamentale e in quiete:
$$1\un{u}=\frac{m(^{12}\mathrm{C})}{12}=1{,}660\,539\,068\,92(52)\times10^{-27}\un{kg}.$$
Il valore in chilogrammi è quello raccomandato da CODATA nel 2022; le cifre fra parentesi indicano l'incertezza sulle ultime cifre.
:::

La **massa atomica relativa** di un atomo, $A_r$, è il rapporto fra la sua massa e l'unità $\mathrm{u}$: è un numero puro. L'atomo di carbonio-12 ha $A_r=12$ esattamente; l'atomo di idrogeno-1 ha $A_r\simeq1{,}007\,83$; l'ossigeno-16 ha $A_r\simeq15{,}994\,91$. Le masse atomiche relative dei nuclidi sono vicine al numero di massa, senza coincidere con esso, per due ragioni: protoni e neutroni hanno masse leggermente diverse da $1\un{u}$, e l'energia di legame del nucleo, per la relazione $E=mc^2$, riduce la massa dell'atomo rispetto alla somma delle masse dei suoi costituenti.

Un campione naturale di un elemento contiene in generale più isotopi. Il cloro, per esempio, è formato per circa il $75{,}76\%$ di atomi di cloro-35, con $A_r=34{,}969$, e per circa il $24{,}24\%$ di atomi di cloro-37, con $A_r=36{,}966$. In una reazione chimica i due isotopi si comportano quasi allo stesso modo, e la bilancia pesa sempre la miscela. Il valore utile è quindi la media pesata con le abbondanze:

$$\bar A_r(\mathrm{Cl})=0{,}7576\cdot34{,}969+0{,}2424\cdot36{,}966\simeq35{,}45.$$

::: figura cloro
{"w":560,"h":270,"items":[
{"t":"axes","o":[80,225],"x":[470,"massa atomica relativa"],"y":[190,"abbondanza (%)"],"sx":90,"sy":2.0,"xt":[[1,"35"],[2,"36"],[3,"37"]],"yt":[[25,"25"],[50,"50"],[75,"75"]]},
{"t":"rect","p":[158.2,73.5,18,151.5],"c":"force2","r":1},
{"t":"rect","p":[337.9,176.5,18,48.5],"c":"force2","r":1},
{"t":"text","p":[167,64],"s":"cloro-35: 75,76%","c":"force2","size":12},
{"t":"text","p":[347,167],"s":"cloro-37: 24,24%","c":"force2","size":12},
{"t":"line","p":[210.8,225,210.8,100],"c":"force","dash":true,"w":2},
{"t":"text","p":[217,104],"s":"media 35,45","c":"force","size":13,"a":"start"}
]}
---
Gli isotopi del cloro e le loro abbondanze in un campione terrestre tipico. La massa atomica media, $35{,}45$, cade fra i due isotopi, più vicina al cloro-35, che è il più abbondante; nessun singolo atomo di cloro ha quella massa.
:::

I valori medi per i campioni terrestri sono pubblicati dalla Commissione sulle abbondanze isotopiche e i pesi atomici della IUPAC (CIAAW) come **pesi atomici standard**. Per alcuni elementi la composizione isotopica varia leggermente secondo la provenienza del campione, e la commissione indica un intervallo; per i calcoli correnti si usano i valori abbreviati, arrotondati in modo da coprire quella variabilità. In questo capitolo useremo i valori della tabella seguente, con $1{,}008$ per l'idrogeno.

| Elemento | Simbolo | Peso atomico standard abbreviato |
|---|---|---|
| idrogeno | H | $1{,}0080$ |
| carbonio | C | $12{,}011$ |
| azoto | N | $14{,}007$ |
| ossigeno | O | $15{,}999$ |
| sodio | Na | $22{,}990$ |
| magnesio | Mg | $24{,}305$ |
| zolfo | S | $32{,}06$ |
| cloro | Cl | $35{,}45$ |
| potassio | K | $39{,}098$ |
| calcio | Ca | $40{,}078$ |
| ferro | Fe | $55{,}845$ |
| rame | Cu | $63{,}546$ |

Il numero di cifre di questi valori non è uniforme. Il ferro è noto a cinque cifre significative, lo zolfo soltanto a quattro, perché i campioni naturali di zolfo hanno composizioni isotopiche più variabili. Nei calcoli il risultato non può essere più preciso del dato meno preciso che vi entra.

## La mole e la costante di Avogadro {#mole}

La quantità di sostanza è una delle sette grandezze di base del Sistema Internazionale, accanto a lunghezza, massa, tempo, corrente elettrica, temperatura e intensità luminosa. Il suo simbolo è $n$ e la sua unità è la mole.

::: definizione Mole
La **mole**, simbolo $\mathrm{mol}$, è l'unità di quantità di sostanza del Sistema Internazionale. Una mole contiene esattamente $6{,}022\,140\,76\times10^{23}$ entità elementari. Questo numero è il valore numerico della **costante di Avogadro** $N_A$ espressa in $\mathrm{mol^{-1}}$:
$$N_A=6{,}022\,140\,76\times10^{23}\un{mol^{-1}}\qquad\text{(valore esatto)}.$$
:::

La quantità di sostanza di un campione che contiene $N$ entità è quindi

$$n=\frac{N}{N_A}.$$

La costante di Avogadro ha un'unità, $\mathrm{mol^{-1}}$, e vale la pena tenerla sempre nei calcoli: $N$ è un numero puro, $n$ si misura in moli, e il rapporto fra i due deve avere le dimensioni di un numero di entità per mole.

::: legge Quantità di sostanza
$$n=\frac{N}{N_A}\qquad\Longleftrightarrow\qquad N=n\,N_A.$$
:::

**Mole di che cosa?** La definizione parla di entità elementari, e le entità vanno sempre specificate. Possono essere atomi, molecole, ioni, elettroni, oppure gruppi di particelle indicati da una formula, come l'unità formula $\mathrm{NaCl}$ di un cristallo ionico. L'espressione «una mole di ossigeno» è ambigua: una mole di molecole $\mathrm{O_2}$ contiene due moli di atomi di ossigeno. Per questo si scrive sempre la formula accanto alla quantità: $n(\mathrm{O_2})=1\un{mol}$ oppure $n(\mathrm{O})=2\un{mol}$.

::: figura entita
{"w":580,"h":220,"items":[
{"t":"circle","p":[85,95,20],"c":"muted","s":"O","size":13},
{"t":"circle","p":[60,121,12],"c":"body","s":"H","size":11},
{"t":"circle","p":[110,121,12],"c":"body","s":"H","size":11},
{"t":"text","p":[85,170],"s":"1 mol di molecole H₂O","c":"ax","size":13},
{"t":"arrow","p":[150,105,240,105],"c":"muted","w":2,"s":"contiene","v":false,"at":"mid","off":[0,-12],"size":12},
{"t":"circle","p":[272,68,12],"c":"body","s":"H","size":11},
{"t":"circle","p":[302,68,12],"c":"body","s":"H","size":11},
{"t":"text","p":[328,73],"s":"2 mol di atomi H","c":"ax","size":13,"a":"start"},
{"t":"circle","p":[287,138,19],"c":"muted","s":"O","size":13},
{"t":"text","p":[328,143],"s":"1 mol di atomi O","c":"ax","size":13,"a":"start"},
{"t":"text","p":[290,205],"s":"massa: 2 · 1,008 g + 15,999 g = 18,015 g","c":"force","size":13}
]}
---
Una mole di molecole d'acqua contiene due moli di atomi di idrogeno e una mole di atomi di ossigeno: in tutto tre moli di atomi. Le masse si sommano nello stesso modo e danno la massa molare dell'acqua.
:::

**Perché proprio quel numero?** Il valore di $N_A$ non è stato scelto a caso. Fissandolo nel 2019, la comunità scientifica lo ha preso uguale alla migliore misura disponibile della vecchia costante, quella che rendeva la massa di una mole di carbonio-12 esattamente uguale a $12\un{g}$. In questo modo tutte le tabelle, i libri e gli strumenti tarati prima del 2019 sono rimasti validi. La conseguenza utile è questa: la massa in grammi di una mole di qualunque sostanza è numericamente uguale, con ottima approssimazione, alla massa media della singola entità espressa in dalton.

::: approfondimento La costante di massa molare dopo il 2019
Il legame fra unità di massa atomica e grammo per mole passa per la **costante di massa molare** $M_u=N_A\cdot1\un{u}$. Prima del 2019 valeva esattamente $1\un{g/mol}$. Oggi $N_A$ è esatta e $1\un{u}$ è una grandezza misurata, quindi anche $M_u$ è misurata: secondo i valori CODATA 2022, la massa molare del carbonio-12 vale $12{,}000\,000\,0126(37)\un{g/mol}$, cioè $M_u\simeq1{,}000\,000\,001\un{g/mol}$. La differenza da $1\un{g/mol}$ è di una parte su un miliardo, molto al di sotto dell'incertezza di qualunque pesata di laboratorio e dell'incertezza dei pesi atomici standard. Nei calcoli chimici si continua a porre $M_u=1\un{g/mol}$ senza alcun errore apprezzabile.
:::

## Quanto è grande una mole {#grandezza}

Il numero $6{,}022\times10^{23}$ è così grande che le analogie quotidiane faticano a renderlo. Alcuni confronti aiutano a fissarne l'ordine di grandezza.

- Se tutti gli otto miliardi di abitanti della Terra contassero un milione di particelle al secondo ciascuno, senza mai fermarsi, servirebbero circa $2{,}4$ anni per contarne una mole.
- Una mole d'acqua ha una massa di circa $18\un{g}$ e occupa circa $18\un{mL}$: poco più di un cucchiaio. Un bicchiere da $250\un{mL}$ contiene circa $13{,}9\un{mol}$ di acqua, cioè circa $8{,}4\times10^{24}$ molecole.
- Una goccia d'acqua di $0{,}05\un{mL}$ contiene circa $1{,}7\times10^{21}$ molecole.
- Una singola molecola d'acqua ha una massa di circa $3{,}0\times10^{-26}\un{kg}$.

L'ultimo dato si ottiene direttamente dalla definizione di dalton, $18{,}015\un{u}\cdot1{,}6605\times10^{-27}\un{kg/u}$, oppure dividendo la massa di una mole per il numero di molecole che contiene:

$$m(\mathrm{H_2O})=\frac{18{,}015\un{g/mol}}{6{,}022\times10^{23}\un{mol^{-1}}}\simeq2{,}99\times10^{-23}\un{g}.$$

I due calcoli danno lo stesso risultato, come deve essere: è proprio il significato della costante di massa molare.

::: nota La mole e il mondo macroscopico
Il valore di $N_A$ è enorme perché atomi e molecole sono molto leggeri, e la mole è stata costruita perché i campioni che maneggiamo in laboratorio, da qualche milligrammo a qualche chilogrammo, corrispondano a quantità comprese grosso modo fra il millesimo e le decine di moli. La mole è quindi un'unità di scala umana per contare oggetti di scala atomica.
:::

## Massa molare {#massa-molare}

La **massa molare** $M$ di una sostanza è il rapporto fra la massa di un campione e la sua quantità di sostanza:

$$M=\frac{m}{n},\qquad[M]=\mathrm{g/mol}.$$

È una proprietà della sostanza, indipendente dalla dimensione del campione: un granello di sale e un sacco di sale hanno la stessa massa molare. Grazie alla costante di massa molare, il valore numerico di $M$ in grammi per mole coincide con la massa atomica relativa per un elemento, e con la **massa molecolare relativa** $M_r$, somma delle masse atomiche relative di tutti gli atomi della formula, per un composto.

::: metodo Calcolare la massa molare da una formula
1. Leggere la formula e contare gli atomi di ciascun elemento, moltiplicando gli indici dentro le parentesi per l'indice esterno.
2. Moltiplicare ogni peso atomico per il numero di atomi corrispondente.
3. Sommare i contributi ed esprimere il risultato in $\mathrm{g/mol}$, con il numero di decimali consentito dal dato meno preciso.
:::

::: esempio Masse molari di alcune sostanze
Per l'acqua, $M(\mathrm{H_2O})=2\cdot1{,}008+15{,}999=18{,}015\un{g/mol}$.

Per il glucosio,
$$\begin{aligned}M(\mathrm{C_6H_{12}O_6})&=6\cdot12{,}011+12\cdot1{,}008+6\cdot15{,}999\\&=72{,}066+12{,}096+95{,}994=180{,}156\un{g/mol}.\end{aligned}$$

Per il carbonato di calcio, $M(\mathrm{CaCO_3})=40{,}078+12{,}011+3\cdot15{,}999=100{,}086\un{g/mol}$.

Per l'acido solforico, $M(\mathrm{H_2SO_4})=2\cdot1{,}008+32{,}06+4\cdot15{,}999=98{,}07\un{g/mol}$: il risultato ha due decimali perché il peso atomico dello zolfo ne ha due.
:::

I composti ionici, come il cloruro di sodio, sono formati da reticoli di ioni: nel cristallo gli ioni $\mathrm{Na^+}$ e $\mathrm{Cl^-}$ si alternano in rapporto uno a uno, e nessun gruppo di atomi forma una molecola isolata. L'entità elementare è allora l'**unità formula** $\mathrm{NaCl}$, e la massa molare $58{,}44\un{g/mol}$ è la massa di una mole di unità formula. Per gli ioni si trascura la massa degli elettroni aggiunti o tolti, che vale circa $0{,}000\,55\un{u}$ per elettrone, molto meno dell'incertezza dei pesi atomici.

::: figura massa-una-mole
{"w":580,"h":300,"items":[
{"t":"axes","o":[70,250],"x":[480,""],"y":[225,"massa di 1 mol (g)"],"sx":1,"sy":0.58,"yt":[[100,"100"],[200,"200"],[300,"300"]]},
{"t":"rect","p":[95,248.83,46,1.17],"c":"force","r":1},
{"t":"rect","p":[169,239.55,46,10.45],"c":"force","r":1},
{"t":"rect","p":[243,216.1,46,33.9],"c":"force","r":1},
{"t":"rect","p":[317,191.95,46,58.05],"c":"force","r":1},
{"t":"rect","p":[391,145.5,46,104.5],"c":"force","r":1},
{"t":"rect","p":[465,51.5,46,198.5],"c":"force","r":1},
{"t":"text","p":[118,240],"s":"2,0 g","c":"force","size":12},
{"t":"text","p":[192,231],"s":"18,0 g","c":"force","size":12},
{"t":"text","p":[266,208],"s":"58,4 g","c":"force","size":12},
{"t":"text","p":[340,184],"s":"100,1 g","c":"force","size":12},
{"t":"text","p":[414,137],"s":"180,2 g","c":"force","size":12},
{"t":"text","p":[488,43],"s":"342,3 g","c":"force","size":12},
{"t":"text","p":[118,272],"s":"H₂","c":"ax","size":13},
{"t":"text","p":[192,272],"s":"H₂O","c":"ax","size":13},
{"t":"text","p":[266,272],"s":"NaCl","c":"ax","size":13},
{"t":"text","p":[340,272],"s":"CaCO₃","c":"ax","size":13},
{"t":"text","p":[414,272],"s":"C₆H₁₂O₆","c":"ax","size":13},
{"t":"text","p":[488,272],"s":"C₁₂H₂₂O₁₁","c":"ax","size":13}
]}
---
Massa di una mole di sei sostanze: idrogeno, acqua, cloruro di sodio, carbonato di calcio, glucosio e saccarosio. Ogni colonna contiene lo stesso numero di entità, $6{,}022\times10^{23}$; le masse differiscono perché differiscono le masse delle singole entità.
:::

Gli **idrati** sono composti ionici che contengono molecole d'acqua in rapporto fisso con le unità formula, legate nel cristallo. Il solfato di rame pentaidrato, il cristallo azzurro dei laboratori scolastici, si scrive $\mathrm{CuSO_4\cdot5H_2O}$: per ogni unità $\mathrm{CuSO_4}$ ci sono cinque molecole d'acqua. La massa molare comprende anche l'acqua:

$$M(\mathrm{CuSO_4\cdot5H_2O})=159{,}60+5\cdot18{,}015=249{,}68\un{g/mol}.$$

Il punto nella formula indica un'aggregazione nel cristallo; nel calcolo della massa molare corrisponde a una somma.

## Massa, moli e numero di particelle {#conversioni}

Le due relazioni $n=m/M$ e $N=n\,N_A$ bastano per passare in ogni direzione fra le tre grandezze che descrivono un campione: la massa, che si misura con la bilancia; la quantità di sostanza, che governa le reazioni; il numero di entità, che dà il significato microscopico.

::: figura ponte
{"w":620,"h":200,"items":[
{"t":"text","p":[95,45],"s":"bilancia","c":"muted","size":12},
{"t":"text","p":[310,45],"s":"reazioni","c":"muted","size":12},
{"t":"text","p":[525,45],"s":"particelle","c":"muted","size":12},
{"t":"rect","p":[20,70,150,60],"c":"body","s":"massa m","size":15},
{"t":"rect","p":[235,70,150,60],"c":"body","s":"quantità n","size":15},
{"t":"rect","p":[450,70,150,60],"c":"body","s":"numero N","size":15},
{"t":"arrow","p":[172,84,233,84],"c":"force","w":2.4,"s":": M","v":false,"i":false,"at":"mid","off":[0,-10],"size":13},
{"t":"arrow","p":[233,116,172,116],"c":"force2","w":2.4,"s":"× M","v":false,"i":false,"at":"mid","off":[0,24],"size":13},
{"t":"arrow","p":[387,84,448,84],"c":"force","w":2.4,"s":"× N","sub":"A","v":false,"i":false,"at":"mid","off":[-3,-10],"size":13},
{"t":"arrow","p":[448,116,387,116],"c":"force2","w":2.4,"s":": N","sub":"A","v":false,"i":false,"at":"mid","off":[-3,24],"size":13},
{"t":"text","p":[95,160],"s":"g","c":"ax","size":13},
{"t":"text","p":[310,160],"s":"mol","c":"ax","size":13},
{"t":"text","p":[525,160],"s":"numero puro","c":"ax","size":13}
]}
---
Il ponte fra la bilancia e le particelle. Per passare dalla massa alla quantità di sostanza si divide per la massa molare; per passare dalla quantità di sostanza al numero di entità si moltiplica per la costante di Avogadro. I percorsi inversi usano le operazioni inverse.
:::

Il controllo delle unità è lo strumento più efficace per evitare errori. Grammi divisi per grammi per mole danno moli; moli moltiplicate per entità per mole danno entità. Se una catena di calcolo produce unità sbagliate, anche il numero è sbagliato.

::: esempio Dalla massa alle molecole
Quante molecole contiene un cucchiaino di zucchero da tavola, saccarosio $\mathrm{C_{12}H_{22}O_{11}}$, con una massa di $4{,}0\un{g}$?

La massa molare è $M=12\cdot12{,}011+22\cdot1{,}008+11\cdot15{,}999=342{,}30\un{g/mol}$. La quantità di sostanza vale
$$n=\frac{m}{M}=\frac{4{,}0\un{g}}{342{,}30\un{g/mol}}\simeq1{,}17\times10^{-2}\un{mol},$$
e il numero di molecole
$$N=n\,N_A\simeq1{,}17\times10^{-2}\un{mol}\cdot6{,}022\times10^{23}\un{mol^{-1}}\simeq7{,}0\times10^{21}.$$
Il risultato ha due cifre significative, come la massa del cucchiaino.
:::

::: esempio Dal numero di atomi alla massa
Un filo di rame contiene $2{,}50\times10^{23}$ atomi. Quanto pesa?

La quantità di sostanza è $n=N/N_A=2{,}50\times10^{23}/6{,}022\times10^{23}\un{mol}\simeq0{,}415\un{mol}$, e la massa $m=nM=0{,}415\un{mol}\cdot63{,}546\un{g/mol}\simeq26{,}4\un{g}$.
:::

Quando lo stesso calcolo coinvolge più passaggi conviene scriverlo come un'unica catena di fattori di conversione, ognuno dei quali vale uno perché numeratore e denominatore rappresentano la stessa quantità. Per il saccarosio dell'esempio:

$$4{,}0\un{g}\cdot\frac{1\un{mol}}{342{,}30\un{g}}\cdot\frac{6{,}022\times10^{23}\ \text{molecole}}{1\un{mol}}\simeq7{,}0\times10^{21}\ \text{molecole}.$$

Le unità si semplificano in diagonale, e quello che resta è proprio l'unità cercata.

## Cifre significative e controlli di plausibilità {#controlli}

Nei calcoli con le moli entrano grandezze di natura molto diversa, e conviene sapere quali limitano la precisione del risultato. La costante di Avogadro è esatta e non introduce alcuna incertezza. I pesi atomici standard hanno quattro o cinque cifre significative, e la massa molare di una molecola ne ha di solito altrettante. La grandezza misurata, quasi sempre una massa o un volume, ha in genere meno cifre di tutte le altre, e fissa il numero di cifre del risultato. Per questo un cucchiaino di zucchero pesato a $4{,}0\un{g}$ dà un numero di molecole con due cifre significative, anche se la massa molare del saccarosio è nota con sei.

Prima di accettare un risultato conviene confrontarlo con qualche ordine di grandezza familiare:

- qualche grammo di una sostanza comune corrisponde a una quantità fra un centesimo di mole e qualche mole;
- un campione visibile contiene fra $10^{18}$ e $10^{26}$ entità circa;
- la massa di una singola molecola, in grammi, ha un esponente fra $-24$ e $-20$, salvo che per le macromolecole.

Un risultato fuori da questi intervalli segnala quasi sempre un errore di impostazione. Moltiplicare la massa per la massa molare invece di dividerla, per esempio, porterebbe a dire che un cucchiaino di zucchero contiene $4{,}0\cdot342\simeq1370$ moli: più di quattrocento chilogrammi di saccarosio, un risultato evidentemente assurdo. Il controllo delle unità avrebbe segnalato l'errore prima ancora del numero, perché grammi per grammi su mole danno grammi al quadrato su mole.

Un secondo controllo, sempre disponibile, è il calcolo inverso: dal risultato si torna al dato di partenza percorrendo il ponte nell'altro verso. Se si ritrova il dato, l'impostazione è coerente.

## Le moli dentro una formula {#formule}

Una formula chimica è anche una tabella di rapporti fra quantità di sostanza. La formula $\mathrm{C_6H_{12}O_6}$ dice che ogni molecola di glucosio contiene sei atomi di carbonio, dodici di idrogeno e sei di ossigeno; quindi ogni mole di glucosio contiene sei moli di atomi di carbonio, dodici di idrogeno e sei di ossigeno. Gli indici della formula sono fattori di conversione fra la quantità del composto e quella dei suoi elementi:

$$n(\mathrm{C})=6\,n(\mathrm{C_6H_{12}O_6}),\qquad n(\mathrm{H})=12\,n(\mathrm{C_6H_{12}O_6}),\qquad n(\mathrm{O})=6\,n(\mathrm{C_6H_{12}O_6}).$$

::: esempio Quanto ferro c'è nell'ematite
L'ematite, un minerale da cui si estrae il ferro, è formata in gran parte da ossido di ferro(III), $\mathrm{Fe_2O_3}$, con massa molare $2\cdot55{,}845+3\cdot15{,}999=159{,}687\un{g/mol}$. Quanto ferro si può ottenere al massimo da $1{,}00\un{kg}$ di ossido puro?

La quantità di ossido è $n=1000\un{g}/159{,}687\un{g/mol}\simeq6{,}262\un{mol}$; la quantità di ferro è il doppio, $12{,}52\un{mol}$, e la massa di ferro vale $12{,}52\un{mol}\cdot55{,}845\un{g/mol}\simeq699\un{g}$. Il ferro rappresenta circa il $70\%$ della massa dell'ossido.
:::

Lo stesso ragionamento vale per gli ioni. In una mole di solfato di sodio, $\mathrm{Na_2SO_4}$, ci sono due moli di ioni $\mathrm{Na^+}$ e una mole di ioni solfato $\mathrm{SO_4^{2-}}$: tre moli di ioni in tutto. Questa informazione diventerà importante nello studio delle soluzioni, dove alcune proprietà dipendono dal numero totale di particelle disciolte.

## Composizione percentuale {#composizione}

La **composizione percentuale in massa** di un composto indica quale frazione della sua massa è dovuta a ciascun elemento. Per un elemento E presente con $k$ atomi nella formula,

$$w(\mathrm{E})=\frac{k\,A_r(\mathrm{E})}{M_r}\cdot100\%.$$

La composizione è indipendente dalla dimensione del campione ed è una proprietà del composto, conseguenza della legge delle proporzioni definite.

::: esempio Composizione del glucosio
Per $\mathrm{C_6H_{12}O_6}$, con $M_r=180{,}156$:
$$\begin{aligned}w(\mathrm{C})&=\frac{72{,}066}{180{,}156}\simeq40{,}00\%,\\ w(\mathrm{H})&=\frac{12{,}096}{180{,}156}\simeq6{,}71\%,\\ w(\mathrm{O})&=\frac{95{,}994}{180{,}156}\simeq53{,}28\%.\end{aligned}$$
La somma è $99{,}99\%$; lo scarto di un centesimo viene dagli arrotondamenti.
:::

::: figura glucosio
{"w":580,"h":230,"items":[
{"t":"text","p":[124,73],"s":"numero di atomi","c":"ax","size":13,"a":"end"},
{"t":"rect","p":[135,50,100,36],"c":"force","r":0},
{"t":"rect","p":[235,50,200,36],"c":"force2","r":0},
{"t":"rect","p":[435,50,100,36],"c":"force4","r":0},
{"t":"text","p":[185,108],"s":"C 25%","c":"force","size":12},
{"t":"text","p":[335,108],"s":"H 50%","c":"force2","size":12},
{"t":"text","p":[485,108],"s":"O 25%","c":"force4","size":12},
{"t":"text","p":[124,163],"s":"massa","c":"ax","size":13,"a":"end"},
{"t":"rect","p":[135,140,160,36],"c":"force","r":0},
{"t":"rect","p":[295,140,26.8,36],"c":"force2","r":0},
{"t":"rect","p":[321.8,140,213.2,36],"c":"force4","r":0},
{"t":"text","p":[215,198],"s":"C 40,0%","c":"force","size":12},
{"t":"text","p":[308,216],"s":"H 6,7%","c":"force2","size":12},
{"t":"text","p":[428,198],"s":"O 53,3%","c":"force4","size":12}
]}
---
Il glucosio $\mathrm{C_6H_{12}O_6}$ descritto in due modi. Per numero di atomi l'idrogeno è metà della molecola; per massa ne è meno del sette per cento, perché ogni atomo di idrogeno pesa circa dodici volte meno di uno di carbonio e sedici volte meno di uno di ossigeno.
:::

La figura mette in evidenza la differenza fra due descrizioni che è facile confondere. Le percentuali in massa interessano chi pesa: dicono quanti grammi di ciascun elemento ci sono in cento grammi di composto. Le frazioni di atomi interessano chi conta: dicono come sono fatte le molecole. Il passaggio fra le due richiede i pesi atomici, ed è proprio il passaggio che permette di ricavare una formula dalla composizione.

::: quotidiano Le etichette dei fertilizzanti
Sui sacchi di fertilizzante il contenuto di azoto è indicato come percentuale in massa. Il nitrato di ammonio, $\mathrm{NH_4NO_3}$, contiene il $35\%$ di azoto in massa; l'urea, $\mathrm{CO(NH_2)_2}$, circa il $46{,}6\%$. A parità di azoto da distribuire, un agricoltore deve spargere circa un quarto di urea in meno, e paga meno trasporto. Un esercizio alla fine del capitolo verifica questi numeri.
:::

## Dalla composizione alla formula minima {#formula-minima}

Un'analisi elementare restituisce le percentuali in massa degli elementi di un composto sconosciuto. La formula che si può ricavare da questi dati è la **formula minima**, o empirica: il rapporto più semplice, a numeri interi, fra gli atomi dei diversi elementi. La strada percorre al contrario il calcolo della composizione.

::: figura procedura
{"w":600,"h":250,"items":[
{"t":"rect","p":[20,30,170,56],"c":"body","s":"percentuali in massa","size":13},
{"t":"rect","p":[215,30,170,56],"c":"body","s":"grammi in 100 g","size":13},
{"t":"rect","p":[410,30,170,56],"c":"body","s":"moli: m / M","size":13},
{"t":"rect","p":[410,150,170,56],"c":"body","s":"dividi per il minimo","size":13},
{"t":"rect","p":[215,150,170,56],"c":"body","s":"interi piccoli","size":13},
{"t":"rect","p":[20,150,170,56],"c":"body","s":"formula minima","size":14},
{"t":"arrow","p":[191,58,214,58],"c":"force","w":2.2,"head":9},
{"t":"arrow","p":[386,58,409,58],"c":"force","w":2.2,"head":9},
{"t":"arrow","p":[495,87,495,149],"c":"force","w":2.2,"head":9},
{"t":"arrow","p":[409,178,386,178],"c":"force","w":2.2,"head":9},
{"t":"arrow","p":[214,178,191,178],"c":"force","w":2.2,"head":9},
{"t":"text","p":[300,232],"s":"× 2, 3, 4… se compaiono frazioni come 1,5 o 1,33","c":"muted","size":12}
]}
---
La procedura per ricavare la formula minima dalla composizione percentuale in massa. Il passaggio decisivo è la divisione per la massa molare di ciascun elemento, che trasforma grammi in moli di atomi.
:::

::: metodo Formula minima dalla composizione
1. Supporre un campione di $100\un{g}$: le percentuali diventano grammi.
2. Dividere la massa di ciascun elemento per il suo peso atomico, ottenendo le moli di atomi.
3. Dividere tutte le quantità per la più piccola.
4. Se i rapporti sono vicini a numeri interi, sono gli indici della formula. Se compaiono frazioni riconoscibili, come $1{,}5$, $1{,}33$, $1{,}25$ o $1{,}67$, moltiplicare tutto per il numero intero che le rende intere: $2$, $3$, $4$ o $3$.
5. Controllare il risultato ricalcolando la composizione dalla formula trovata.
:::

::: esempio Un composto di carbonio, idrogeno e ossigeno
Un composto contiene il $40{,}00\%$ di carbonio, il $6{,}71\%$ di idrogeno e il $53{,}29\%$ di ossigeno. In $100\un{g}$:
$$\begin{aligned}n(\mathrm{C})&=\frac{40{,}00}{12{,}011}\simeq3{,}330\un{mol},\\ n(\mathrm{H})&=\frac{6{,}71}{1{,}008}\simeq6{,}657\un{mol},\\ n(\mathrm{O})&=\frac{53{,}29}{15{,}999}\simeq3{,}331\un{mol}.\end{aligned}$$
Dividendo per $3{,}330$ si ottiene $1:1{,}999:1{,}000$, cioè la formula minima $\mathrm{CH_2O}$.
:::

::: esempio Un rapporto non intero
Un ossido di ferro contiene il $69{,}94\%$ di ferro. L'ossigeno è il resto, $30{,}06\%$. In $100\un{g}$ ci sono $69{,}94/55{,}845\simeq1{,}2524\un{mol}$ di ferro e $30{,}06/15{,}999\simeq1{,}8789\un{mol}$ di ossigeno. Il rapporto ossigeno/ferro vale $1{,}500$: non è intero, e moltiplicando per due si ottiene $\mathrm{Fe_2O_3}$.
:::

Arrotondare troppo presto è l'errore più insidioso di questo calcolo. Un rapporto di $1{,}48$ può essere un $1{,}5$ deformato dall'incertezza sperimentale, e non va trasformato in $1$. Per questo conviene conservare tre o quattro cifre significative fino all'ultimo passaggio, e decidere l'arrotondamento guardando insieme tutti i rapporti.

## Formula minima e formula molecolare {#formula-molecolare}

La formula minima fissa i rapporti fra gli atomi; la **formula molecolare** dice quanti atomi ci sono davvero in una molecola. La formula molecolare è sempre un multiplo intero della formula minima. Molte sostanze diverse condividono la stessa formula minima.

| Sostanza | Formula molecolare | Massa molare (g/mol) | Multiplo di $\mathrm{CH_2O}$ |
|---|---|---|---|
| metanale (formaldeide) | $\mathrm{CH_2O}$ | $30{,}026$ | $1$ |
| acido acetico | $\mathrm{C_2H_4O_2}$ | $60{,}052$ | $2$ |
| acido lattico | $\mathrm{C_3H_6O_3}$ | $90{,}078$ | $3$ |
| glucosio | $\mathrm{C_6H_{12}O_6}$ | $180{,}156$ | $6$ |

Le quattro sostanze hanno la stessa composizione percentuale e proprietà del tutto diverse: un gas pungente, il componente acido dell'aceto, un composto che i muscoli producono sotto forma di ione lattato durante lo sforzo intenso, uno zucchero. Per distinguerle serve un'informazione in più: la massa molare, misurata per esempio con la spettrometria di massa, con la densità del vapore o con le proprietà delle soluzioni. Il fattore moltiplicativo è il rapporto fra la massa molare misurata e quella della formula minima,

$$k=\frac{M}{M_\mathrm{minima}}.$$

Se il composto dell'esempio precedente ha massa molare $180\un{g/mol}$, $k=180/30{,}026\simeq6$ e la formula molecolare è $\mathrm{C_6H_{12}O_6}$.

::: nota Formule e struttura
Nemmeno la formula molecolare identifica sempre una sostanza. Il glucosio e il fruttosio hanno la stessa formula $\mathrm{C_6H_{12}O_6}$ e strutture diverse: sono isomeri. Per distinguerli occorrono le formule di struttura, che il capitolo [Chimica organica e scheletri carboniosi](unit:chemistry-24) presenta in dettaglio.
:::

## Analisi elementare per combustione {#combustione}

Come si ottengono, in pratica, le percentuali di carbonio e idrogeno di un composto organico? Il metodo classico, messo a punto nell'Ottocento e oggi automatizzato negli analizzatori elementari, è l'**analisi per combustione**. Un campione pesato con precisione brucia in una corrente di ossigeno in eccesso. Tutto il carbonio si trasforma in diossido di carbonio, $\mathrm{CO_2}$, e tutto l'idrogeno in acqua. I gas di combustione attraversano due assorbitori in serie: il primo trattiene l'acqua, il secondo il diossido di carbonio. L'aumento di massa di ciascun assorbitore misura la massa del prodotto corrispondente.

::: figura combustione
{"w":640,"h":210,"items":[
{"t":"arrow","p":[8,100,58,100],"c":"force2","w":2.4,"s":"O₂","v":false,"i":false,"at":"mid","off":[0,-12],"size":13},
{"t":"rect","p":[60,70,170,60],"c":"muted","s":"campione in fornace","size":13,"r":6},
{"t":"line","p":[230,100,285,100],"c":"ax","w":3},
{"t":"rect","p":[285,70,130,60],"c":"body","s":"assorbe H₂O","size":13},
{"t":"line","p":[415,100,460,100],"c":"ax","w":3},
{"t":"rect","p":[460,70,130,60],"c":"body","s":"assorbe CO₂","size":13},
{"t":"arrow","p":[590,100,632,100],"c":"muted","w":2},
{"t":"text","p":[145,160],"s":"C → CO₂ ; H → H₂O","c":"ax","size":12},
{"t":"text","p":[350,160],"s":"aumento di massa:","c":"muted","size":12},
{"t":"text","p":[350,178],"s":"idrogeno del campione","c":"muted","size":12},
{"t":"text","p":[525,160],"s":"aumento di massa:","c":"muted","size":12},
{"t":"text","p":[525,178],"s":"carbonio del campione","c":"muted","size":12}
]}
---
Schema di un'analisi per combustione. L'assorbitore dell'acqua precede quello del diossido di carbonio, perché il reagente che trattiene il $\mathrm{CO_2}$ trattiene anche l'acqua e falserebbe la misura.
:::

Dalle masse dei prodotti si risale alle masse degli elementi. Tutto il carbonio di $\mathrm{CO_2}$ viene dal campione, e in una mole di $\mathrm{CO_2}$ ce n'è una di carbonio; tutto l'idrogeno dell'acqua viene dal campione, e in una mole d'acqua ce ne sono due di idrogeno:

$$m(\mathrm{C})=m(\mathrm{CO_2})\,\frac{A_r(\mathrm{C})}{M_r(\mathrm{CO_2})},\qquad m(\mathrm{H})=m(\mathrm{H_2O})\,\frac{2A_r(\mathrm{H})}{M_r(\mathrm{H_2O})}.$$

L'ossigeno del campione non si può ricavare allo stesso modo, perché quello dei prodotti viene in gran parte dalla corrente di ossigeno. Se il composto contiene soltanto carbonio, idrogeno e ossigeno, la massa di ossigeno si ottiene per differenza.

::: esempio Un liquido incolore
Un campione di $0{,}2000\un{g}$ di un liquido che contiene soltanto C, H e O brucia e produce $0{,}3821\un{g}$ di $\mathrm{CO_2}$ e $0{,}2346\un{g}$ di $\mathrm{H_2O}$.

Massa di carbonio: $0{,}3821\cdot12{,}011/44{,}009\simeq0{,}1043\un{g}$, cioè $8{,}683\times10^{-3}\un{mol}$.

Massa di idrogeno: $0{,}2346\cdot2{,}016/18{,}015\simeq0{,}02625\un{g}$, cioè $2{,}604\times10^{-2}\un{mol}$.

Massa di ossigeno per differenza: $0{,}2000-0{,}1043-0{,}0263\simeq0{,}0695\un{g}$, cioè $4{,}34\times10^{-3}\un{mol}$.

Dividendo per la quantità minore si ottiene $\mathrm{C:H:O}=2{,}00:6{,}00:1{,}00$, e la formula minima è $\mathrm{C_2H_6O}$. Con una massa molare di circa $46\un{g/mol}$, la formula molecolare coincide con quella minima: il liquido potrebbe essere etanolo oppure il suo isomero dimetiletere, che però a temperatura ambiente è un gas. L'analisi elementare restringe le possibilità; la struttura richiede altre misure.
:::

::: storia Liebig e il «Kaliapparat»
Negli anni Trenta dell'Ottocento Justus von Liebig rese l'analisi per combustione rapida e affidabile con un assorbitore di vetro a cinque bolle riempito di soluzione di idrossido di potassio, che tratteneva il diossido di carbonio e si pesava prima e dopo la combustione. Lo strumento permise di analizzare centinaia di composti organici e contribuì alla nascita della chimica organica come disciplina quantitativa. La forma di quell'apparecchio è ancora oggi il simbolo dell'American Chemical Society.
:::

## Idrati e analisi per riscaldamento {#idrati}

Molti sali cristallizzano dall'acqua trattenendo un numero fisso di molecole d'acqua per unità formula. Scaldando con cautela un idrato, l'acqua si allontana e resta il sale **anidro**. La perdita di massa misura l'acqua, e il confronto fra le quantità di sostanza dà la formula.

::: esempio Il solfato di rame che cambia colore
Un campione di $2{,}500\un{g}$ di solfato di rame idrato, di colore azzurro, viene scaldato fino a massa costante. Resta una polvere quasi bianca di $1{,}598\un{g}$.

L'acqua persa è $0{,}902\un{g}$, cioè $0{,}902/18{,}015\simeq5{,}007\times10^{-2}\un{mol}$. Il sale anidro corrisponde a $1{,}598/159{,}60\simeq1{,}001\times10^{-2}\un{mol}$ di $\mathrm{CuSO_4}$. Il rapporto vale $5{,}00$, e la formula dell'idrato è $\mathrm{CuSO_4\cdot5H_2O}$. L'acqua rappresenta il $36{,}1\%$ della massa del cristallo.
:::

Il cambiamento di colore ha un'origine interessante: nel cristallo idrato alcune molecole d'acqua sono legate direttamente agli ioni rame, e modificano l'energia degli elettroni dello ione. Senza acqua lo ione rame assorbe la luce in modo diverso e il solido appare quasi bianco. Per lo stesso motivo il solfato di rame anidro si usa come rivelatore di umidità: a contatto con l'acqua torna azzurro.

## Una prima reazione letta in moli {#reazioni}

Il problema da cui è partito il capitolo, la ricetta della chimica della stazione, si può ora scrivere in modo quantitativo. La reazione delle celle a combustibile è

$$\mathrm{2\,H_2+O_2\longrightarrow2\,H_2O}.$$

L'equazione si legge su tre piani. Sul piano microscopico dice che due molecole di idrogeno reagiscono con una molecola di ossigeno e formano due molecole d'acqua. Moltiplicando ogni coefficiente per $N_A$, il rapporto resta lo stesso: due moli di idrogeno reagiscono con una mole di ossigeno e formano due moli d'acqua. Moltiplicando infine ogni quantità di sostanza per la massa molare corrispondente si ottiene il piano della bilancia:

$$2\cdot2{,}016\un{g}+31{,}998\un{g}\longrightarrow2\cdot18{,}015\un{g},\qquad36{,}030\un{g}\longrightarrow36{,}030\un{g}.$$

La massa si conserva, come richiede la legge di Lavoisier, mentre il numero di molecole cambia: tre molecole di reagenti diventano due molecole di prodotto. Le quantità di sostanza seguono i coefficienti dell'equazione; le masse seguono i coefficienti moltiplicati per le masse molari. Confondere i due piani è l'origine di molti errori nei calcoli sulle reazioni.

::: esempio L'acqua prodotta da un chilogrammo di idrogeno
Un serbatoio della stazione contiene $1{,}000\un{kg}$ di idrogeno. Quanta acqua producono le celle a combustibile consumandolo tutto, e quanto ossigeno serve?

La quantità di idrogeno è $n(\mathrm{H_2})=1000\un{g}/2{,}016\un{g/mol}\simeq496{,}0\un{mol}$. Per l'equazione, l'acqua prodotta ha la stessa quantità di sostanza, $496{,}0\un{mol}$, cioè $496{,}0\cdot18{,}015\un{g}\simeq8{,}94\un{kg}$. L'ossigeno necessario è la metà in moli, $248{,}0\un{mol}$, cioè circa $7{,}94\un{kg}$. Controllo: $1{,}00+7{,}94=8{,}94\un{kg}$, come vuole la conservazione della massa. Un chilogrammo di idrogeno richiede quasi otto chilogrammi di ossigeno: per i progettisti della stazione la voce più pesante del carico è l'ossigeno.
:::

Il capitolo [Stechiometria e reagente limitante](unit:chemistry-14) sviluppa questo metodo per reazioni qualsiasi, anche quando i reagenti non sono nelle proporzioni dell'equazione.

## Un'esperienza: le molecole in una goccia {#esperienza}

::: metodo Attività sperimentale: quante molecole in una goccia d'acqua
**Materiale.** Una buretta o una pipetta contagocce, un becher piccolo, una bilancia con risoluzione di $0{,}01\un{g}$, acqua distillata.

**Procedura.** Tarare la bilancia con il becher vuoto. Lasciare cadere nel becher cinquanta gocce, contandole con attenzione, e leggere la massa. Ripetere tre volte e calcolare la media.

**Elaborazione.** Dividere la massa per cinquanta per ottenere la massa di una goccia; dividere per la massa molare dell'acqua per ottenere le moli; moltiplicare per $N_A$.

**Un risultato tipico.** Cinquanta gocce hanno una massa di $2{,}48\un{g}$; una goccia pesa $0{,}0496\un{g}$ e contiene $2{,}75\times10^{-3}\un{mol}$, cioè circa $1{,}7\times10^{21}$ molecole.

**Discussione.** Con la risoluzione di $0{,}01\un{g}$, pesare una goccia sola darebbe un'incertezza del venti per cento; pesandone cinquanta l'incertezza sulla massa della singola goccia scende sotto l'uno per cento. La dimensione della goccia dipende però dal contagocce e dalla velocità con cui si lascia scendere il liquido: confrontare i risultati di gruppi diversi e discutere quale incertezza domina.
:::

L'esperienza mostra in piccolo la strategia di tutta la chimica quantitativa. Un oggetto troppo piccolo per essere pesato da solo si pesa in gruppo; un numero troppo grande per essere contato si ricava dividendo una massa per un'altra.

## Uno sguardo ai gas: il volume molare {#gas}

Per i gas c'è una scorciatoia preziosa, conseguenza diretta dell'ipotesi di Avogadro. A temperatura e pressione fissate, una mole di qualunque gas che si comporti in modo ideale occupa lo stesso volume, il **volume molare**. Dall'equazione di stato dei gas ideali, $V_m=RT/p$, si ottiene

$$V_m=22{,}414\un{L/mol}\ \ \text{a }0\,{}^\circ\mathrm{C}\text{ e }101{,}325\un{kPa},\qquad V_m=22{,}711\un{L/mol}\ \ \text{a }0\,{}^\circ\mathrm{C}\text{ e }100\un{kPa}.$$

La seconda coppia di valori corrisponde alle condizioni normali di riferimento raccomandate dalla IUPAC dal 1982; molti testi usano ancora la prima. Conoscere il volume molare permette di misurare la quantità di sostanza di un gas con un recipiente graduato, e di ricavare la massa molare di un gas dalla sua densità: un litro di un gas che a $0\,{}^\circ\mathrm{C}$ e $1\un{atm}$ pesa $1{,}25\un{g}$ ha massa molare di circa $1{,}25\cdot22{,}414\simeq28{,}0\un{g/mol}$. Le leggi dei gas e i loro limiti sono l'argomento del capitolo [Gas e stato aeriforme](unit:chemistry-10).

## Come si realizza oggi la mole {#metrologia}

La definizione del 2019 fissa il numero di entità in una mole, e lascia aperta una domanda pratica: come si prepara, in laboratorio, un campione che contiene un numero noto di entità? La risposta è che si conta indirettamente, misurando una massa e conoscendo la massa di ciascuna entità.

Il conteggio più accurato mai realizzato è quello delle sfere di silicio del progetto internazionale Avogadro. Sfere di circa un chilogrammo di silicio arricchito in silicio-28, lucidate fino a scostamenti dalla forma sferica dell'ordine di qualche decina di nanometri, sono state misurate in tre modi: il volume con l'interferometria laser, la distanza fra gli atomi del reticolo cristallino con la diffrazione dei raggi X, la composizione isotopica con la spettrometria di massa. Dal volume della sfera e dal volume occupato da un atomo si ricava il numero di atomi, con un'incertezza relativa dell'ordine di $10^{-8}$. Quelle misure hanno contribuito a fissare il valore di $N_A$ adottato nel 2019, e oggi le stesse sfere servono per realizzare il chilogrammo.

Per il lavoro quotidiano, naturalmente, nessun laboratorio conta atomi. Si pesa un campione di purezza nota, si divide per la massa molare calcolata dai pesi atomici standard, e si ottiene la quantità di sostanza. L'incertezza del risultato dipende quasi sempre dalla bilancia e dalla purezza del campione; quella dei pesi atomici è di regola trascurabile, e quella sulla costante di massa molare lo è sempre.

## Errori frequenti {#errori}

::: errore Massa e quantità di sostanza
Due campioni con la stessa massa non contengono lo stesso numero di particelle. Dieci grammi di idrogeno $\mathrm{H_2}$ sono circa cinque moli; dieci grammi di ossigeno $\mathrm{O_2}$ sono circa $0{,}31$ moli. Al contrario, una mole di $\mathrm{H_2}$ e una di $\mathrm{O_2}$ contengono lo stesso numero di molecole e hanno masse che stanno nel rapporto di circa uno a sedici.
:::

::: errore Dimenticare gli indici o le parentesi
Nella massa molare ogni atomo conta. Per l'acqua l'idrogeno compare due volte: $18{,}015\un{g/mol}$, e $17{,}007$ è sbagliato. In $\mathrm{Ca(OH)_2}$ l'indice esterno moltiplica tutto il contenuto della parentesi: due ossigeni e due idrogeni.
:::

::: errore Non dichiarare l'entità
«Mezza mole di azoto» può voler dire $0{,}5\un{mol}$ di molecole $\mathrm{N_2}$, pari a $14\un{g}$, oppure $0{,}5\un{mol}$ di atomi, pari a $7\un{g}$. Scrivere sempre la formula: $n(\mathrm{N_2})$ oppure $n(\mathrm{N})$.
:::

::: errore Arrotondare troppo presto
Nel calcolo della formula minima un rapporto di $1{,}48$ diventato $1$ trasforma $\mathrm{Fe_2O_3}$ in $\mathrm{FeO}$. Conservare le cifre fino alla fine e riconoscere le frazioni semplici.
:::

::: errore Confondere percentuale in massa e percentuale di atomi
Nell'acqua gli atomi di idrogeno sono i due terzi del totale e portano soltanto l'$11{,}2\%$ della massa. Le due percentuali coincidono soltanto se tutti gli atomi hanno la stessa massa.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- La quantità di sostanza $n$ conta entità elementari; la sua unità è la mole, che contiene esattamente $6{,}022\,140\,76\times10^{23}$ entità.
- $n=N/N_A$; l'entità va sempre dichiarata con la formula.
- L'unità di massa atomica è un dodicesimo della massa del carbonio-12; i pesi atomici standard sono medie isotopiche dei campioni terrestri.
- La massa molare $M=m/n$ in $\mathrm{g/mol}$ coincide numericamente con la massa atomica o molecolare relativa, entro una parte su un miliardo.
- $n=m/M$ e $N=nN_A$ collegano bilancia e particelle; il controllo delle unità protegge dagli errori.
- Gli indici di una formula sono rapporti fra quantità di sostanza; la composizione percentuale in massa si calcola dai pesi atomici.
- Dalla composizione si ricava la formula minima; con la massa molare si ricava la formula molecolare.
- L'analisi per combustione misura carbonio e idrogeno attraverso le masse di $\mathrm{CO_2}$ e $\mathrm{H_2O}$; l'ossigeno si ottiene per differenza.
:::

## Glossario {#glossario}

- **Quantità di sostanza** ($n$): grandezza di base del SI proporzionale al numero di entità elementari di un campione.
- **Mole** ($\mathrm{mol}$): unità di quantità di sostanza; contiene esattamente $6{,}022\,140\,76\times10^{23}$ entità.
- **Costante di Avogadro** ($N_A$): numero di entità per mole, $6{,}022\,140\,76\times10^{23}\un{mol^{-1}}$, valore esatto.
- **Entità elementare**: oggetto contato dalla mole; atomo, molecola, ione, elettrone o unità formula, da dichiarare sempre.
- **Unità di massa atomica** ($\mathrm{u}$, dalton): un dodicesimo della massa di un atomo di carbonio-12.
- **Massa atomica relativa** ($A_r$): massa di un atomo divisa per $1\un{u}$; numero puro.
- **Peso atomico standard**: massa atomica relativa media di un elemento nei campioni terrestri, pubblicata dalla CIAAW.
- **Massa molecolare relativa** ($M_r$): somma delle masse atomiche relative degli atomi di una formula.
- **Massa molare** ($M$): massa di una mole di entità, in $\mathrm{g/mol}$.
- **Unità formula**: gruppo di ioni indicato dalla formula di un composto ionico, usato come entità elementare.
- **Composizione percentuale**: frazioni in massa degli elementi di un composto, espresse in percentuale.
- **Formula minima** (empirica): rapporto più semplice, a numeri interi, fra gli atomi degli elementi di un composto.
- **Formula molecolare**: numero effettivo di atomi di ciascun elemento in una molecola; multiplo intero della formula minima.
- **Idrato**: composto ionico che contiene molecole d'acqua in rapporto fisso con le unità formula.
- **Volume molare**: volume di una mole di gas a temperatura e pressione specificate.

## Esercizi {#esercizi}

Per i pesi atomici usare la tabella della sezione [Massa atomica relativa e dalton](#massa-atomica). Le soluzioni sono nascoste: prova prima a impostare il calcolo, scrivendo le unità in ogni passaggio.

::: esercizio Moli di calcare [base]
Quante moli di carbonato di calcio, $\mathrm{CaCO_3}$, ci sono in $50{,}0\un{g}$ di calcare puro?
>>> soluzione
$M(\mathrm{CaCO_3})=40{,}078+12{,}011+3\cdot15{,}999=100{,}086\un{g/mol}$, quindi $n=50{,}0/100{,}086\un{mol}\simeq0{,}500\un{mol}$.
:::

::: esercizio Un quarto di mole di sale [base]
Quale massa di cloruro di sodio corrisponde a $0{,}250\un{mol}$?
>>> soluzione
$m=nM=0{,}250\un{mol}\cdot58{,}44\un{g/mol}\simeq14{,}6\un{g}$.
:::

::: esercizio Molecole in un grammo d'acqua [base]
Quante molecole d'acqua ci sono in $1{,}00\un{g}$ di acqua?
>>> soluzione
$n=1{,}00/18{,}015\un{mol}\simeq5{,}551\times10^{-2}\un{mol}$, e $N=nN_A\simeq3{,}34\times10^{22}$ molecole.
:::

::: esercizio Due masse molari [base]
Calcolare la massa molare dell'acido solforico, $\mathrm{H_2SO_4}$, e quella della caffeina, $\mathrm{C_8H_{10}N_4O_2}$.
>>> soluzione
$M(\mathrm{H_2SO_4})=2\cdot1{,}008+32{,}06+4\cdot15{,}999\simeq98{,}07\un{g/mol}$. Per la caffeina:
$$\begin{aligned}M(\mathrm{C_8H_{10}N_4O_2})&=8\cdot12{,}011+10\cdot1{,}008+4\cdot14{,}007+2\cdot15{,}999\\&=96{,}088+10{,}080+56{,}028+31{,}998=194{,}194\un{g/mol}.\end{aligned}$$
:::

::: esercizio Ossigeno nel diossido di carbonio [base]
Quante moli e quanti atomi di ossigeno ci sono in $0{,}500\un{mol}$ di $\mathrm{CO_2}$?
>>> soluzione
Ogni molecola contiene due atomi di ossigeno: $n(\mathrm{O})=2\cdot0{,}500=1{,}000\un{mol}$, cioè $6{,}022\times10^{23}$ atomi.
:::

::: esercizio Ferro nell'ossido [base]
Calcolare la percentuale in massa del ferro nell'ossido $\mathrm{Fe_2O_3}$.
>>> soluzione
$w(\mathrm{Fe})=2\cdot55{,}845/159{,}687\simeq0{,}6994$, cioè $69{,}94\%$.
:::

::: esercizio Atomi di carbonio nel glucosio [medio]
Una bevanda contiene $9{,}00\un{g}$ di glucosio. Quante molecole di glucosio e quanti atomi di carbonio contiene?
>>> soluzione
$n=9{,}00/180{,}156\un{mol}\simeq4{,}996\times10^{-2}\un{mol}$; molecole $N=nN_A\simeq3{,}01\times10^{22}$. Gli atomi di carbonio sono sei volte tanti: circa $1{,}81\times10^{23}$.
:::

::: esercizio Zolfo nell'acido solforico [medio]
Quanti grammi di zolfo ci sono in $25{,}0\un{g}$ di acido solforico?
>>> soluzione
Una mole di $\mathrm{H_2SO_4}$ contiene una mole di zolfo, quindi $m(\mathrm{S})=25{,}0\cdot32{,}06/98{,}07\un{g}\simeq8{,}17\un{g}$.
:::

::: esercizio Un idrocarburo [medio]
Un idrocarburo contiene l'$85{,}63\%$ di carbonio e il $14{,}37\%$ di idrogeno. La sua massa molare è $56{,}1\un{g/mol}$. Trovare la formula minima e la formula molecolare.
>>> soluzione
In $100\un{g}$: $n(\mathrm{C})=85{,}63/12{,}011\simeq7{,}129\un{mol}$; $n(\mathrm{H})=14{,}37/1{,}008\simeq14{,}26\un{mol}$. Il rapporto è $1:2{,}00$, formula minima $\mathrm{CH_2}$ con $M=14{,}027\un{g/mol}$. Il fattore è $56{,}1/14{,}027\simeq4{,}00$ e la formula molecolare è $\mathrm{C_4H_8}$.
:::

::: esercizio Un ossido di azoto [medio]
Un ossido di azoto contiene il $25{,}94\%$ di azoto in massa. Trovare la formula minima.
>>> soluzione
In $100\un{g}$: $n(\mathrm{N})=25{,}94/14{,}007\simeq1{,}852\un{mol}$; $n(\mathrm{O})=74{,}06/15{,}999\simeq4{,}629\un{mol}$. Il rapporto ossigeno/azoto vale $2{,}50$; moltiplicando per due si ottiene $\mathrm{N_2O_5}$.
:::

::: esercizio Il sale inglese [medio]
Un campione di $1{,}000\un{g}$ di solfato di magnesio idrato, $\mathrm{MgSO_4\cdot}x\mathrm{H_2O}$, scaldato fino a massa costante, lascia $0{,}488\un{g}$ di sale anidro. Trovare $x$.
>>> soluzione
Acqua persa: $0{,}512\un{g}$, cioè $0{,}512/18{,}015\simeq2{,}842\times10^{-2}\un{mol}$. Sale anidro: $0{,}488/120{,}36\simeq4{,}054\times10^{-3}\un{mol}$. Il rapporto vale $7{,}01$, quindi $x=7$: $\mathrm{MgSO_4\cdot7H_2O}$.
:::

::: esercizio Combustione di un solvente [medio]
Un campione di $0{,}1500\un{g}$ di un solvente formato da C, H e O produce per combustione $0{,}3409\un{g}$ di $\mathrm{CO_2}$ e $0{,}1396\un{g}$ di $\mathrm{H_2O}$. Trovare la formula minima.
>>> soluzione
$m(\mathrm{C})=0{,}3409\cdot12{,}011/44{,}009\simeq0{,}09304\un{g}$, cioè $7{,}746\times10^{-3}\un{mol}$. $m(\mathrm{H})=0{,}1396\cdot2{,}016/18{,}015\simeq0{,}01562\un{g}$, cioè $1{,}550\times10^{-2}\un{mol}$. $m(\mathrm{O})=0{,}1500-0{,}0930-0{,}0156\simeq0{,}0413\un{g}$, cioè $2{,}584\times10^{-3}\un{mol}$. Dividendo per la quantità di ossigeno: $\mathrm{C:H:O}=3{,}00:6{,}00:1$. La formula minima è $\mathrm{C_3H_6O}$, quella dell'acetone.
:::

::: esercizio Un bicchiere di alcol [medio]
Quante molecole contengono $100\un{mL}$ di etanolo, $\mathrm{C_2H_5OH}$, la cui densità è $0{,}789\un{g/mL}$?
>>> soluzione
La massa è $100\cdot0{,}789=78{,}9\un{g}$. Con $M=46{,}069\un{g/mol}$ si ha $n\simeq1{,}713\un{mol}$ e $N\simeq1{,}03\times10^{24}$ molecole.
:::

::: esercizio Massa media del rame [medio]
Il rame naturale contiene il $69{,}15\%$ di rame-63, con $A_r=62{,}930$, e il $30{,}85\%$ di rame-65, con $A_r=64{,}928$. Calcolare il peso atomico medio e confrontarlo con il valore della tabella.
>>> soluzione
$\bar A_r=0{,}6915\cdot62{,}930+0{,}3085\cdot64{,}928\simeq43{,}516+20{,}030=63{,}546$, uguale al valore tabulato.
:::

::: esercizio Un acido aromatico [avanzato]
Un campione di $0{,}2443\un{g}$ di un acido organico che contiene soltanto C, H e O produce $0{,}6163\un{g}$ di $\mathrm{CO_2}$ e $0{,}1081\un{g}$ di $\mathrm{H_2O}$. La massa molare, misurata a parte, è circa $122\un{g/mol}$. Trovare formula minima e formula molecolare.
>>> soluzione
$m(\mathrm{C})=0{,}6163\cdot12{,}011/44{,}009\simeq0{,}1682\un{g}$, cioè $1{,}400\times10^{-2}\un{mol}$. $m(\mathrm{H})=0{,}1081\cdot2{,}016/18{,}015\simeq0{,}01210\un{g}$, cioè $1{,}200\times10^{-2}\un{mol}$. $m(\mathrm{O})=0{,}2443-0{,}1682-0{,}0121=0{,}0640\un{g}$, cioè $4{,}00\times10^{-3}\un{mol}$. I rapporti sono $\mathrm{C:H:O}=3{,}50:3{,}00:1$; moltiplicando per due si ottiene $\mathrm{C_7H_6O_2}$, con $M=122{,}12\un{g/mol}$. La formula molecolare coincide con quella minima: è la formula dell'acido benzoico.
:::

::: esercizio Una miscela di cloruri [avanzato]
Una miscela di cloruro di sodio e cloruro di potassio ha massa $1{,}000\un{g}$ e contiene $0{,}528\un{g}$ di cloro. Calcolare la massa di ciascun sale.
>>> soluzione
La frazione in massa del cloro vale $35{,}45/58{,}44\simeq0{,}6066$ in $\mathrm{NaCl}$ e $35{,}45/74{,}548\simeq0{,}4755$ in $\mathrm{KCl}$. Detta $x$ la massa di $\mathrm{NaCl}$ in grammi: $0{,}6066\,x+0{,}4755\,(1{,}000-x)=0{,}528$. Ne segue $x=(0{,}528-0{,}4755)/0{,}1311\simeq0{,}400\un{g}$ di $\mathrm{NaCl}$ e $0{,}600\un{g}$ di $\mathrm{KCl}$.
:::

::: esercizio Un atomo di carbonio e un tratto di matita [avanzato]
Calcolare la massa di un atomo di carbonio-12 usando la costante di Avogadro, e confrontarla con $12\un{u}$. Una riga tracciata con la matita lascia sul foglio $1{,}0\un{mg}$ di grafite: quanti atomi di carbonio contiene?
>>> soluzione
Con $M(^{12}\mathrm{C})=12{,}000\un{g/mol}$:
$$m=\frac{12{,}000\un{g/mol}}{6{,}022\,140\,76\times10^{23}\un{mol^{-1}}}\simeq1{,}9926\times10^{-23}\un{g}=1{,}9926\times10^{-26}\un{kg},$$
in accordo con $12\cdot1{,}660\,54\times10^{-27}\un{kg}$; la differenza fra i due calcoli è di una parte su un miliardo. Per la riga: $n=1{,}0\times10^{-3}/12{,}011\un{mol}\simeq8{,}3\times10^{-5}\un{mol}$, cioè circa $5{,}0\times10^{19}$ atomi.
:::

::: esercizio Un ossido magnetico [avanzato]
Un ossido di ferro nero e magnetico contiene il $72{,}36\%$ di ferro. Trovare la formula minima, spiegando come si riconosce il fattore da usare.
>>> soluzione
In $100\un{g}$: $n(\mathrm{Fe})=72{,}36/55{,}845\simeq1{,}2957\un{mol}$; $n(\mathrm{O})=27{,}64/15{,}999\simeq1{,}7276\un{mol}$. Il rapporto ossigeno/ferro vale $1{,}3333$, cioè $4/3$: moltiplicando per tre si ottiene $\mathrm{Fe_3O_4}$, la magnetite. Un rapporto di $1{,}33$ arrotondato a $1$ porterebbe alla formula sbagliata $\mathrm{FeO}$.
:::

::: esercizio Quale fertilizzante [avanzato]
Confrontare il contenuto di azoto in massa di nitrato di ammonio $\mathrm{NH_4NO_3}$, urea $\mathrm{CO(NH_2)_2}$ e solfato di ammonio $\mathrm{(NH_4)_2SO_4}$. Quale massa di ciascun fertilizzante serve per fornire $100\un{kg}$ di azoto?
>>> soluzione
Ogni formula contiene due atomi di azoto. Le masse molari sono $80{,}043$, $60{,}056$ e $132{,}13\un{g/mol}$, quindi le frazioni di azoto sono $28{,}014/80{,}043\simeq35{,}0\%$, $28{,}014/60{,}056\simeq46{,}6\%$ e $28{,}014/132{,}13\simeq21{,}2\%$. Per $100\un{kg}$ di azoto servono circa $286\un{kg}$ di nitrato di ammonio, $214\un{kg}$ di urea e $472\un{kg}$ di solfato di ammonio.
:::

::: esercizio Un gas da identificare [avanzato]
Un litro di un gas puro, misurato a $0\,{}^\circ\mathrm{C}$ e $101{,}325\un{kPa}$, ha massa $1{,}25\un{g}$. Calcolare la massa molare e proporre almeno due gas compatibili. Quale misura aggiuntiva permetterebbe di decidere?
>>> soluzione
$n=1{,}00/22{,}414\un{mol}\simeq4{,}46\times10^{-2}\un{mol}$ e $M=1{,}25/0{,}0446\simeq28{,}0\un{g/mol}$. Sono compatibili l'azoto $\mathrm{N_2}$ ($28{,}014$), il monossido di carbonio $\mathrm{CO}$ ($28{,}010$) e l'etilene $\mathrm{C_2H_4}$ ($28{,}054$): con tre cifre significative la massa molare da sola non basta. Un'analisi elementare per combustione deciderebbe subito: l'azoto non produce $\mathrm{CO_2}$, il monossido di carbonio produce $\mathrm{CO_2}$ senza acqua, l'etilene produce entrambi.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 2-7, 2-8, 3-2 e 3-3. I dati numerici provengono dalle fonti seguenti.

1. Bureau International des Poids et Mesures, *Le Système international d'unités (SI)*, 9ª edizione, 2019: definizione della mole e valore esatto della costante di Avogadro.
2. P. J. Mohr, D. B. Newell, B. N. Taylor, E. Tiesinga, *CODATA Recommended Values of the Fundamental Physical Constants: 2022*, NIST: unità di massa atomica, $1{,}660\,539\,068\,92(52)\times10^{-27}\un{kg}$, e massa molare del carbonio-12, $12{,}000\,000\,0126(37)\un{g/mol}$.
3. IUPAC, Commission on Isotopic Abundances and Atomic Weights, *Abridged Standard Atomic Weights*: pesi atomici standard abbreviati della tabella.
4. Per le abbondanze isotopiche di cloro e rame: IUPAC, *Isotopic compositions of the elements*, valori rappresentativi.
5. Per la storia: gli scritti di Avogadro (1811), Cannizzaro (1858), Loschmidt (1865) e Perrin (1909), nelle ricostruzioni storiche correnti; le risoluzioni della 14ª (1971) e della 26ª (2018) Conferenza generale dei pesi e delle misure.
