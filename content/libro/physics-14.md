---
unit: physics-14
titolo: Fluidi e pressione
sottotitolo: Pressione, viscosità, continuità e Bernoulli
volume: Volume di fisica
fonte: Dispensa di fisica, sezione 2.7 e materiali delle sezioni 2.23
origine: dispensa
---
## Prima di cominciare {#apertura}

Un sensore viene calato in un bacino e il display mostra una pressione che cresce con la profondità. Il valore letto comprende la pressione dell'atmosfera sopra la superficie, e chi interpreta i dati deve separare il contributo del fluido dalla pressione assoluta.

Il capitolo tratta i fluidi a partire dalla dispensa: equilibrio idrostatico e principio di Pascal, viscosità e numero di Reynolds, equazione di continuità ed equazione di Bernoulli. Le sezioni aggiunte per il sito sviluppano la pressione come grandezza, la legge di Stevino, i manometri e i barometri, e alcune applicazioni del moto dei fluidi. La [spinta di Archimede](unit:physics-15) ha un capitolo proprio.

## Fluidi: pressione, galleggiamento e moto ideale {#s-2-7}

### Equilibrio idrostatico e principio di Pascal

In un fluido incomprimibile, fermo e di densità uniforme, scegliendo l'asse $y$ verso l'alto,

::: legge Variazione idrostatica della pressione
$$\frac{\dd p}{\dd y}=-\rho g,
\qquad
p_2-p_1=\rho g(y_1-y_2).$$

A profondità $h$ sotto una superficie alla pressione $p_0$,

$$p=p_0+\rho gh.$$
:::

Punti alla stessa quota nello stesso fluido connesso hanno la stessa pressione, purché il fluido sia in equilibrio e la densità possa essere trattata come uniforme. La pressione assoluta include quella atmosferica; la pressione relativa o manometrica è $p-p_{\mathrm{atm}}$.

Una variazione di pressione applicata a un fluido confinato viene trasmessa a tutto il fluido. In una pressa idraulica ideale,

$$\frac{F_1}{A_1}=\frac{F_2}{A_2}.$$

Il guadagno di forza non crea energia: se il fluido è incomprimibile, il pistone grande percorre una distanza minore, così che idealmente $F_1\Delta x_1=F_2\Delta x_2$.

::: esempio Pressa idraulica e conservazione del lavoro
Un pistone di area $A_1=5{,}0\un{cm^2}$ riceve una forza di $150\un{N}$ e comunica con un pistone di area $A_2=200\un{cm^2}$. Trascurando differenze di quota e perdite,

$$F_2=F_1\frac{A_2}{A_1}=150\frac{200}{5}=6{,}0\times10^{3}\un{N}.$$

Il secondo pistone esercita una forza quaranta volte maggiore, ma si sposta di un tratto quaranta volte minore per lo stesso volume di fluido trasferito.
:::

### Viscosità e numero di Reynolds

La viscosità dinamica $\eta$ misura la risposta del fluido a gradienti di velocità. Il confronto fra effetti inerziali e viscosi è organizzato dal numero adimensionale

::: legge Numero di Reynolds
$$\mathrm{Re}=\frac{\rho vL}{\eta},$$
:::

### Continuità e Bernoulli

In un condotto, la conservazione della massa impone in regime stazionario

::: legge Portata di massa e continuità
$$\dot m=\rho Av=\text{costante}.$$

Per un fluido incomprimibile,

$$A_1v_1=A_2v_2=Q,$$
:::

dove $Q$ è la portata volumica. Una sezione più stretta implica una velocità media maggiore, non perché il fluido “decida di accelerare”, ma perché la stessa quantità di volume deve attraversare ogni sezione nell'unità di tempo.

Per un fluido ideale, incomprimibile, in moto stazionario e lungo una stessa linea di corrente, il bilancio dell'energia meccanica per unità di volume dà

::: legge Equazione di Bernoulli
$$p+\frac12\rho v^2+\rho gy=\text{costante}.$$
:::

La relazione confronta pressione, energia cinetica e quota. Non è una legge universale per ogni fluido: viscosità, pompe, turbine, scambio termico, moto turbolento e variazioni rapide richiedono termini aggiuntivi o modelli diversi.

::: esempio Velocità di efflusso da un serbatoio
Un piccolo foro si trova $h=1{,}80\un{m}$ sotto la superficie libera di un grande serbatoio aperto. Se la velocità della superficie è trascurabile e la pressione è atmosferica sia alla superficie sia all'uscita, Bernoulli fornisce la legge di Torricelli:

$$v=\sqrt{2gh}=\sqrt{2(9{,}81)(1{,}80)}=5{,}94\un{m/s}.$$

La formula non include contrazione del getto, viscosità o variazione apprezzabile del livello durante lo svuotamento.
:::

::: errore “Più veloce” non significa sempre “pressione più bassa”
Bernoulli collega due punti soltanto sotto ipotesi precise e, nella forma elementare, lungo una linea di corrente. La pressione può aumentare insieme alla velocità se una pompa fornisce energia, e può diminuire per attrito anche senza aumento della velocità. La frase mnemonica non sostituisce il bilancio completo.
:::

::: sintesi Controllo di regime per i fluidi
Prima di usare una formula, chiedere: il fluido è fermo o in moto? È ragionevole trattarlo come incomprimibile? Il moto è stazionario? Viscosità e turbolenza sono trascurabili? I punti confrontati appartengono alla stessa linea di corrente? Una risposta negativa non rende il problema insolubile, ma richiede un modello più ricco.
:::

## La pressione come grandezza {#g-pressione}

Una forza distribuita su una superficie produce effetti che dipendono dall'area su cui agisce. Una persona di $70\un{kg}$ in piedi su due scarpe, con una superficie d'appoggio complessiva di circa $0{,}040\un{m^2}$, esercita sul pavimento una pressione media

$$p=\frac{F_\perp}{A}=\frac{70\cdot9{,}81}{0{,}040}\un{Pa}\simeq1{,}7\times10^{4}\un{Pa}.$$

La stessa persona su un tacco sottile concentra il peso su un'area cento volte minore e la pressione cresce dello stesso fattore. La pressione è il rapporto fra il modulo della componente normale della forza e l'area; nel Sistema Internazionale si misura in pascal, $1\un{Pa}=1\un{N/m^2}$.

::: definizione Pressione
In un punto di una superficie, la pressione è il limite del rapporto fra la componente normale della forza e l'area dell'elemento di superficie su cui agisce:
$$p=\lim_{\Delta A\to0}\frac{\Delta F_\perp}{\Delta A}.$$
Unità di uso frequente: $1\un{bar}=10^5\un{Pa}$; $1\un{atm}=101\,325\un{Pa}$.
:::

In un fluido in quiete la pressione ha una proprietà notevole: in un punto assume lo stesso valore qualunque sia l'orientazione della superficie di prova. Per questo la pressione è una grandezza scalare, anche se la forza che produce su una parete è un vettore, sempre perpendicolare alla parete stessa. Un fluido in quiete non esercita forze tangenziali; se lo facesse, gli strati scorrerebbero e il fluido smetterebbe di essere in quiete.

::: errore Pressione e forza
Pressione e forza hanno unità diverse e rispondono a domande diverse. La forza su una diga dipende dall'area della parete; la pressione in un punto della parete dipende soltanto dalla profondità e dalla densità dell'acqua. Due dighe con lo stesso livello d'acqua subiscono la stessa pressione alla base, e la diga più larga sopporta una forza totale maggiore.
:::

## La legge di Stevino {#g-stevino}

Si consideri, dentro un liquido in quiete di densità $\rho$ uniforme, un cilindro immaginario verticale di area di base $A$ e altezza $h$, con la base superiore alla profondità $z$ e quella inferiore alla profondità $z+h$. Le forze laterali si compensano per simmetria. Lungo la verticale agiscono il peso del liquido contenuto, $\rho Ahg$, la forza $p(z)A$ verso il basso sulla base superiore e la forza $p(z+h)A$ verso l'alto su quella inferiore. L'equilibrio impone

$$p(z+h)A=p(z)A+\rho Ahg\qquad\Longrightarrow\qquad p(z+h)=p(z)+\rho gh.$$

Se la superficie libera si trova alla pressione atmosferica $p_0$, alla profondità $h$ vale la **legge di Stevino**

$$p(h)=p_0+\rho gh.$$

In acqua dolce ogni $10\un{m}$ di profondità aggiungono $\rho gh=1000\cdot9{,}81\cdot10\un{Pa}=9{,}81\times10^{4}\un{Pa}$, poco meno di un'atmosfera. Un subacqueo a $25\un{m}$ in mare, con $\rho=1025\un{kg/m^3}$, si trova a una pressione assoluta di circa $3{,}5\times10^{5}\un{Pa}$, cioè circa $3{,}5$ volte la pressione in superficie.

La legge contiene una conseguenza poco intuitiva, nota come paradosso idrostatico: la pressione sul fondo dipende soltanto dalla profondità e dalla densità del liquido, e resta la stessa in recipienti di forma diversa riempiti fino allo stesso livello. Nei vasi comunicanti il liquido si porta alla stessa quota in tutti i rami, perché in un liquido in quiete i punti alla stessa profondità sono alla stessa pressione.

::: nota Pressione assoluta e pressione relativa
Molti strumenti misurano la differenza fra la pressione del sistema e quella atmosferica, detta pressione relativa o manometrica: $p_\mathrm{rel}=p-p_0$. Il manometro di uno pneumatico che indica $2{,}2\un{bar}$ segnala una pressione assoluta di circa $3{,}2\un{bar}$. Il sensore del pianeta di questa unità deve dichiarare quale delle due grandezze mostra.
:::

## Manometri e barometri {#g-manometri}

Un manometro a tubo a U contiene un liquido di densità $\rho_\ell$. Un ramo è collegato al recipiente che contiene il gas, l'altro è aperto verso l'atmosfera. Se il liquido nel ramo aperto sale di un dislivello $\Delta h$ rispetto all'altro ramo, la legge di Stevino applicata ai due rami fornisce

$$p_\mathrm{gas}-p_0=\rho_\ell g\,\Delta h.$$

Con acqua e un dislivello di $12\un{cm}$ la sovrappressione del gas vale $1000\cdot9{,}81\cdot0{,}12\un{Pa}\simeq1{,}18\times10^{3}\un{Pa}$.

::: figura manometro
{"w":520,"h":310,"items":[
{"t":"rect","p":[30,30,110,70],"c":"muted","s":"gas"},
{"t":"poly","pts":[[140,65],[170,65],[170,40]],"c":"ax","w":2},
{"t":"rect","p":[150,160,40,95],"c":"force2","r":0},
{"t":"rect","p":[290,105,40,150],"c":"force2","r":0},
{"t":"rect","p":[150,225,180,40],"c":"force2","r":0},
{"t":"poly","pts":[[150,40],[150,265],[160,280],[320,280],[330,265],[330,30]],"c":"ax","w":2.4},
{"t":"poly","pts":[[190,40],[190,225],[290,225],[290,30]],"c":"ax","w":2.4},
{"t":"arrow","p":[310,8,310,95],"c":"muted","w":1.6,"s":"p","sub":"0","off":[18,-60]},
{"t":"line","p":[190,160,420,160],"c":"muted","dash":true,"w":1.2},
{"t":"line","p":[330,105,420,105],"c":"muted","dash":true,"w":1.2},
{"t":"arrow","p":[405,160,405,108],"c":"accent","w":1.8,"head":8},
{"t":"arrow","p":[405,108,405,157],"c":"accent","w":1.8,"head":8},
{"t":"text","p":[418,138],"s":"Δh","c":"accent","size":15,"a":"start","i":true},
{"t":"text","p":[85,125],"s":"pressione del gas","c":"muted","size":12}
]}
---
Manometro a tubo a U: il liquido sale nel ramo aperto finché la differenza di quota $\Delta h$ compensa la differenza fra la pressione del gas e quella atmosferica, $p_\mathrm{gas}-p_0=\rho_\ell g\,\Delta h$.
:::

Il barometro di Torricelli rovescia lo stesso ragionamento. Un tubo chiuso a un'estremità, riempito di mercurio e capovolto in una vaschetta, lascia scendere il mercurio finché la colonna residua equilibra la pressione dell'atmosfera sulla superficie libera della vaschetta; sopra la colonna resta un volume quasi vuoto, occupato soltanto da vapore di mercurio a pressione trascurabile. A $0\,{}^\circ\mathrm{C}$, con densità del mercurio $13\,595\un{kg/m^3}$ e $g=9{,}80665\un{m/s^2}$, una colonna alta $760\un{mm}$ esercita $101\,325\un{Pa}$: da qui l'atmosfera standard e l'unità millimetro di mercurio. Con l'acqua la colonna equivalente supera i $10\un{m}$, perché l'acqua è circa $13{,}6$ volte meno densa.

::: storia Un oceano d'aria
Nel 1644 Evangelista Torricelli descrisse a Michelangelo Ricci gli esperimenti con tubi riempiti di mercurio e concluse che viviamo sul fondo di un oceano d'aria che preme con il proprio peso. Blaise Pascal propose una verifica decisiva: se la colonna è sostenuta dal peso dell'aria, salendo di quota deve accorciarsi. Il 19 settembre 1648 il cognato Florin Périer misurò la colonna alla base e sulla cima del Puy de Dôme, nel Massiccio Centrale, e trovò in vetta un valore sensibilmente minore.
:::

## Pascal e le macchine idrauliche {#g-pascal}

Per la legge di Stevino, una variazione della pressione sulla superficie di un liquido in quiete si somma alla pressione in ogni punto del liquido: è il principio di Pascal, discusso nella sezione [Equilibrio idrostatico e principio di Pascal](#s-2-7). Un sollevatore idraulico ne fa uso. Un pistone piccolo di area $A_1$ spinge il liquido con forza $F_1$; la sovrappressione $F_1/A_1$ raggiunge il pistone grande di area $A_2$, che esercita la forza

$$F_2=F_1\frac{A_2}{A_1}.$$

Il guadagno di forza ha un prezzo. Il liquido è praticamente incomprimibile, quindi il volume spostato dal pistone piccolo, $A_1d_1$, coincide con quello ricevuto dal grande, $A_2d_2$. Ne segue $F_1d_1=F_2d_2$: in assenza di attriti il lavoro compiuto sul pistone piccolo è uguale al lavoro fatto dal pistone grande, e la forza moltiplicata si paga con uno spostamento ridotto nello stesso rapporto.

::: esempio Un'automobile sul ponte idraulico
Un'auto di $1200\un{kg}$ poggia su un pistone di area $400\un{cm^2}$; il pistone di comando ha area $2{,}0\un{cm^2}$. Trascurando le masse dei pistoni, la forza necessaria per sostenere l'auto è
$$F_1=mg\,\frac{A_1}{A_2}=1200\cdot9{,}81\cdot\frac{2{,}0}{400}\un{N}\simeq59\un{N}.$$
Per alzare l'auto di $10\un{cm}$ il pistone di comando deve percorrere $0{,}10\cdot400/2{,}0\un{m}=20\un{m}$. Le pompe reali ottengono questa corsa con molte spinte brevi e una valvola che impedisce al liquido di tornare indietro.
:::

## Fluidi in moto: applicazioni dell'equazione di Bernoulli {#g-bernoulli}

L'equazione di Bernoulli, presentata nella sezione sulla continuità, collega pressione, velocità e quota lungo una linea di corrente di un fluido ideale in moto stazionario:

$$p+\tfrac12\rho v^2+\rho gz=\text{costante}.$$

Tre applicazioni mostrano come si usa.

**Efflusso da un serbatoio.** Un serbatoio aperto ha un piccolo foro a profondità $h$ sotto la superficie. Sulla superficie e all'uscita la pressione è atmosferica; se il serbatoio è ampio, la superficie scende lentamente e la sua velocità è trascurabile. L'equazione si riduce a $\rho gh=\tfrac12\rho v^2$, cioè alla **legge di Torricelli**

$$v=\sqrt{2gh}.$$

Il liquido esce con la velocità che avrebbe un corpo caduto liberamente da un'altezza $h$. Con $h=1{,}8\un{m}$ si ottiene $v\simeq5{,}9\un{m/s}$; da un foro di $1{,}0\un{cm^2}$ escono idealmente circa $0{,}59$ litri al secondo. La portata misurata è minore, perché il getto si restringe subito dopo il foro e l'attrito interno non è nullo.

**Il tubo di Venturi.** In una strozzatura la velocità aumenta per la continuità, $A_1v_1=A_2v_2$, e la pressione diminuisce di $\Delta p=\tfrac12\rho(v_2^2-v_1^2)$. Se in un tubo d'acqua la sezione si riduce a un terzo e la velocità a monte vale $1{,}2\un{m/s}$, nella strozzatura la velocità diventa $3{,}6\un{m/s}$ e la pressione cala di $5{,}76\times10^{3}\un{Pa}$. Misurando questa differenza con un manometro si ricava la portata: è il principio dei misuratori di Venturi.

**Limiti del modello.** L'equazione vale per un fluido ideale, incomprimibile e privo di viscosità, in moto stazionario. Nei tubi lunghi e stretti la viscosità dissipa energia e la pressione cala lungo il percorso anche a sezione costante; nei getti turbolenti il moto non è stazionario. Il [numero di Reynolds](#s-2-7) aiuta a decidere quale regime aspettarsi.

::: esercizio Pressione a 25 metri [base]
Un subacqueo scende a $25\un{m}$ di profondità in mare ($\rho=1025\un{kg/m^3}$). La pressione atmosferica è $101\,325\un{Pa}$. Calcolare la pressione relativa e quella assoluta.
>>> soluzione
La pressione relativa è $\rho gh=1025\cdot9{,}81\cdot25\un{Pa}\simeq2{,}51\times10^{5}\un{Pa}$. Sommando la pressione atmosferica si ottiene la pressione assoluta, circa $3{,}53\times10^{5}\un{Pa}$, pari a circa $3{,}5$ atmosfere.
:::

::: esercizio Manometro ad acqua [base]
Un manometro ad acqua collegato a una condotta del gas mostra un dislivello di $4{,}0\un{cm}$ tra i due rami, con il liquido più alto nel ramo aperto. Calcolare la sovrappressione del gas.
>>> soluzione
Il liquido più alto nel ramo aperto indica che il gas è a pressione maggiore di quella atmosferica. La sovrappressione è $\rho g\Delta h=1000\cdot9{,}81\cdot0{,}040\un{Pa}\simeq392\un{Pa}$, circa lo $0{,}4\%$ della pressione atmosferica.
:::

::: esercizio Getto da una botte [medio]
Una botte aperta contiene vino ($\rho\simeq990\un{kg/m^3}$) fino a $1{,}25\un{m}$ sopra un rubinetto. Con il modello di Torricelli calcolare la velocità di uscita. Dire poi se il risultato dipende dalla densità del liquido.
>>> soluzione
La velocità vale $v=\sqrt{2gh}=\sqrt{2\cdot9{,}81\cdot1{,}25}\un{m/s}\simeq4{,}95\un{m/s}$. La densità si semplifica, perché nell'equazione di Bernoulli sia l'energia cinetica per unità di volume sia l'energia potenziale per unità di volume sono proporzionali a $\rho$, che si semplifica.
:::

::: esercizio Sollevatore e lavoro [medio]
Il pistone di comando di un sollevatore ha diametro $2{,}0\un{cm}$, quello di carico $25\un{cm}$. Quale forza serve per sostenere un carico di $800\un{kg}$? Di quanto deve scendere il pistone di comando perché il carico salga di $5{,}0\un{mm}$? Verificare che i lavori coincidono.
>>> soluzione
Il rapporto fra le aree è il quadrato del rapporto fra i diametri, $(25/2{,}0)^2=156{,}25$. La forza è $F_1=800\cdot9{,}81/156{,}25\un{N}\simeq50{,}2\un{N}$. Il pistone di comando scende di $5{,}0\un{mm}\cdot156{,}25\simeq0{,}78\un{m}$. Lavoro sul comando: $50{,}2\cdot0{,}781\un{J}\simeq39{,}2\un{J}$; lavoro sul carico: $800\cdot9{,}81\cdot0{,}0050\un{J}\simeq39{,}2\un{J}$.
:::

::: esercizio Forza su una diga [avanzato]
Una diga ha una parete verticale rettangolare larga $50\un{m}$; l'acqua dolce arriva a $20\un{m}$ di altezza. Considerando soltanto la pressione relativa, calcolare la forza totale dell'acqua sulla parete e l'altezza del suo punto di applicazione rispetto al fondo.
>>> soluzione
A profondità $z$ la pressione relativa vale $\rho gz$ e agisce su una striscia di area $W\dd z$. Integrando da $0$ a $H$:
$$F=\int_0^H\rho g z\,W\,\dd z=\tfrac12\rho gWH^2=\tfrac12\cdot1000\cdot9{,}81\cdot50\cdot20^2\un{N}\simeq9{,}8\times10^{7}\un{N}.$$
Il momento rispetto al fondo è $\int_0^H\rho gzW(H-z)\,\dd z=\rho gWH^3/6$; dividendo per $F$ si trova che la forza agisce a $H/3\simeq6{,}7\un{m}$ dal fondo. La pressione cresce con la profondità, quindi la parte bassa della diga sopporta il carico maggiore, e per questo le dighe a gravità sono più spesse alla base.
:::

## Esercizi {#esercizi}

Gli esercizi riprendono quelli della dispensa. Ogni soluzione è nascosta finché non la apri: prova prima a impostare il problema da solo.

### Problemi di sintesi: dinamica

::: esercizio Pressa idraulica [base]
In una pressa idraulica le aree dei pistoni sono $0{,}0004\un{m^2}$ e $0{,}02\un{m^2}$. Una forza di $180\un{N}$ agisce sul pistone piccolo. Quale forza ideale si ottiene sul grande?
>>> soluzione
**Pascal.**  $F_1/A_1=F_2/A_2$.

$$F_2=F_1\frac{A_2}{A_1}=9000\un{N}.$$

Lo spostamento del pistone grande è ridotto nello stesso rapporto, così il lavoro ideale si conserva.
:::

::: esercizio Strozzatura in una condotta [medio]
Acqua scorre orizzontalmente in una condotta. In una sezione $A_1=0{,}01\un{m^2}$ la velocità è $2\un{m/s}$; in una strozzatura $A_2=0{,}004\un{m^2}$. Calcolare $v_2$ e $p_1-p_2$ nel modello ideale.
>>> soluzione
**Continuità.**  $v_2=v_1A_1/A_2=5{,}00\un{m/s}$.

**Bernoulli.**  A quota uguale,

$$p_1-p_2=\frac12\rho(v_2^2-v_1^2)=1{,}05\times10^{4}\un{Pa}.$$
:::

## Fonti {#fonti}

Il testo, le formule, i diagrammi e gli esercizi di questo capitolo provengono dalla *Dispensa di fisica* del corso (sezione 2.7 e materiali delle sezioni 2.23), consultabile nel lettore della galassia. Per la lettura sul sito sono cambiati l'impaginazione, i colori delle figure, la numerazione e la posizione di alcuni riquadri ed esercizi; la sezione iniziale è scritta per il pianeta di questa unità.
