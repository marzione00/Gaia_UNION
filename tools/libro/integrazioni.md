# Sezioni aggiunte per il sito

Ogni sezione `# physics-NN` contiene capitoli scritti per il sito che tex2libro.py
inserisce dopo il testo della dispensa, nei capitoli in cui la dispensa dedica
all'argomento poche pagine. Gli identificatori delle sezioni iniziano con `g-`.

# physics-14

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

# physics-15

## Da dove viene la spinta {#g-origine}

La spinta di Archimede è l'effetto complessivo delle forze di pressione che il fluido esercita sulla superficie di un corpo immerso. Il caso di un cubo di lato $L$, con le facce orizzontali, permette di vederlo con un calcolo diretto. Le forze sulle facce laterali si compensano a due a due, perché punti alla stessa profondità sono alla stessa pressione. Sulla faccia superiore, alla profondità $h$, il fluido spinge verso il basso con forza $F_1=(p_0+\rho_f gh)L^2$; sulla faccia inferiore, alla profondità $h+L$, spinge verso l'alto con forza $F_2=[p_0+\rho_f g(h+L)]L^2$. La risultante è diretta verso l'alto e vale

$$F_A=F_2-F_1=\rho_f\,g\,L^3=\rho_f\,g\,V.$$

La profondità $h$ e la pressione atmosferica si sono semplificate: la spinta dipende soltanto dal volume immerso e dalla densità del fluido.

::: figura cubo-immerso
{"w":520,"h":330,"items":[
{"t":"rect","p":[40,60,440,255],"c":"muted","r":0},
{"t":"line","p":[40,60,480,60],"c":"force2","w":2.2},
{"t":"text","p":[470,50],"s":"superficie libera","c":"force2","size":12,"a":"end"},
{"t":"rect","p":[200,120,120,120],"c":"body"},
{"t":"arrow","p":[260,72,260,117],"c":"force","w":2.4,"s":"F","sub":"1","off":[22,-10]},
{"t":"arrow","p":[260,305,260,243],"c":"force","w":3.4,"s":"F","sub":"2","off":[24,30]},
{"t":"arrow","p":[150,180,197,180],"c":"muted","w":1.8},
{"t":"arrow","p":[370,180,323,180],"c":"muted","w":1.8},
{"t":"line","p":[100,120,198,120],"c":"muted","dash":true,"w":1},
{"t":"line","p":[60,240,198,240],"c":"muted","dash":true,"w":1},
{"t":"arrow","p":[110,62,110,118],"c":"ax","w":1.4,"head":7},
{"t":"text","p":[96,96],"s":"h","c":"ax","size":15,"a":"end","i":true},
{"t":"arrow","p":[70,62,70,238],"c":"ax","w":1.4,"head":7},
{"t":"text","p":[56,160],"s":"h + L","c":"ax","size":14,"a":"end","i":true},
{"t":"text","p":[260,186],"s":"L","c":"ax","size":15,"i":true}
]}
---
Forze di pressione su un cubo immerso. Le forze laterali si annullano; la forza $F_2$ sulla faccia inferiore supera la forza $F_1$ sulla faccia superiore di $\rho_f g L^3$, il peso del fluido spostato.
:::

Per un corpo di forma qualsiasi si usa un argomento di sostituzione. Si immagini di togliere il corpo e di riempire la cavità con lo stesso fluido. Quella porzione di fluido resta in equilibrio, quindi le forze di pressione sul suo contorno sostengono esattamente il suo peso, $\rho_f gV$, e sono applicate al baricentro del fluido sostituito. Le forze di pressione dipendono soltanto dalla forma del contorno e dalla profondità dei suoi punti, quindi agiscono allo stesso modo sul corpo che occupa quella cavità. Il punto di applicazione della spinta, il **centro di spinta**, è il baricentro del volume immerso.

::: legge Principio di Archimede
Un corpo immerso, in tutto o in parte, in un fluido in quiete riceve una forza verticale verso l'alto pari al peso del fluido spostato:
$$F_A=\rho_f\,g\,V_\mathrm{imm}.$$
La spinta è applicata nel baricentro del volume immerso.
:::

## Galleggiare: la frazione immersa {#g-galleggiamento}

Un corpo di densità media $\rho_c$ immerso completamente in un fluido di densità $\rho_f$ riceve una spinta $\rho_f gV$ e ha peso $\rho_c gV$. Se $\rho_c>\rho_f$ il peso prevale e il corpo affonda; se $\rho_c<\rho_f$ prevale la spinta e il corpo sale. Arrivato in superficie, emerge finché la spinta, che ora dipende soltanto dalla parte ancora immersa, eguaglia il peso:

$$\rho_f\,g\,V_\mathrm{imm}=\rho_c\,g\,V\qquad\Longrightarrow\qquad\frac{V_\mathrm{imm}}{V}=\frac{\rho_c}{\rho_f}.$$

Un blocco di legno con densità $600\un{kg/m^3}$ galleggia in acqua dolce con il $60\%$ del volume immerso. Il ghiaccio ha densità di circa $917\un{kg/m^3}$ e l'acqua di mare di circa $1025\un{kg/m^3}$: un iceberg resta immerso per circa l'$89\%$ del proprio volume.

Una nave d'acciaio galleggia anche se l'acciaio è quasi otto volte più denso dell'acqua, perché conta la densità media dello scafo con tutto ciò che racchiude, aria compresa. Caricando la nave aumenta il peso, la nave affonda di più e sposta più acqua finché la spinta torna a eguagliare il peso; la linea di galleggiamento sale. Se una falla lascia entrare acqua, la densità media cresce e la nave può affondare.

::: errore La spinta di un corpo che galleggia
In un corpo che galleggia in equilibrio, la spinta è uguale al peso, qualunque sia la densità del fluido. Un'imbarcazione che passa dall'acqua di mare all'acqua dolce di un fiume riceve la stessa spinta: affonda un poco di più, perché per spostare lo stesso peso di un fluido meno denso deve spostarne un volume maggiore.
:::

## Peso apparente e misure di densità {#g-densita}

Un corpo appeso a un dinamometro e immerso completamente in un liquido mostra un peso apparente minore di quello in aria, $P_\mathrm{app}=P-\rho_\ell gV$. Dalla differenza si ricava il volume del corpo, e da questo la densità:

$$\rho_c=\rho_\ell\,\frac{P}{P-P_\mathrm{app}}.$$

Un campione che pesa $2{,}70\un{N}$ in aria e $1{,}70\un{N}$ in acqua ha densità $1000\cdot2{,}70/1{,}00\un{kg/m^3}=2700\un{kg/m^3}$, compatibile con l'alluminio. Il metodo non richiede di misurare il volume con il calibro e funziona per oggetti di forma irregolare.

::: storia La corona di Gerone
Vitruvio, nel nono libro del *De architectura*, racconta che Archimede scoprì una frode nella corona del re Gerone confrontando il volume d'acqua spostato dalla corona con quello spostato da masse uguali di oro e di argento. Il racconto è stato scritto circa due secoli dopo la morte di Archimede. Galileo, nel breve scritto *La bilancetta* del 1586, giudicò più plausibile un confronto basato sulla spinta, eseguito con una bilancia a bracci uguali immersa in acqua, perché le differenze di volume in gioco sarebbero state troppo piccole da apprezzare sul livello di un recipiente.
:::

Il **densimetro** sfrutta la frazione immersa. È un cilindro di vetro zavorrato in basso, con una scala graduata sul collo: galleggia più in profondità nei liquidi meno densi. Lo si usa per controllare la concentrazione di zucchero nei mosti, il contenuto alcolico, lo stato di carica delle batterie al piombo.

## Palloni e aria {#g-aerostati}

Anche l'aria esercita una spinta di Archimede, piccola perché la sua densità è piccola: a $20\,{}^\circ\mathrm{C}$ e alla pressione atmosferica standard l'aria secca ha densità di circa $1{,}20\un{kg/m^3}$. Un pallone sale se la sua densità media è minore di quella dell'aria circostante.

In una mongolfiera l'aria interna viene scaldata. A pressione costante la densità di un gas ideale è inversamente proporzionale alla temperatura assoluta; a $100\,{}^\circ\mathrm{C}$ l'aria ha densità $1{,}20\cdot293/373\un{kg/m^3}\simeq0{,}95\un{kg/m^3}$. Ogni metro cubo di involucro fornisce quindi una spinta netta corrispondente a circa $0{,}26\un{kg}$. Un involucro di $2800\un{m^3}$ può sostenere circa $720\un{kg}$, comprensivi di involucro, cesta, bruciatori e passeggeri. Con l'elio, che a $20\,{}^\circ\mathrm{C}$ ha densità di circa $0{,}17\un{kg/m^3}$, ogni metro cubo sostiene circa $1{,}0\un{kg}$, quattro volte di più.

## Stabilità di un corpo che galleggia {#g-stabilita}

Il peso di un corpo galleggiante è applicato nel baricentro $G$; la spinta nel centro di spinta $B$, baricentro della parte immersa. In equilibrio le due forze stanno sulla stessa verticale. Se il corpo si inclina, la forma della parte immersa cambia e il centro di spinta si sposta verso il lato che affonda. Peso e spinta formano allora una coppia. L'equilibrio è stabile se questa coppia tende a raddrizzare il corpo.

Per inclinazioni piccole la verticale per il nuovo centro di spinta interseca l'asse di simmetria del corpo in un punto detto **metacentro**. La condizione di stabilità è che il metacentro si trovi sopra il baricentro. Per questo le navi caricano zavorra sul fondo, che abbassa il baricentro, e uno scafo largo è più stabile di uno stretto, perché inclinandosi sposta di più il centro di spinta. Un tronco cilindrico lungo galleggia disteso e non in piedi per la stessa ragione.

::: esercizio Iceberg [base]
Con le densità indicate nel testo, calcolare quale frazione del volume di un iceberg emerge dall'acqua di mare. Se la parte emersa ha un volume di $5{,}0\times10^{3}\un{m^3}$, quale è il volume totale?
>>> soluzione
La frazione immersa vale $917/1025\simeq0{,}895$, quindi emerge circa il $10{,}5\%$ del volume. Il volume totale è $5{,}0\times10^{3}/0{,}105\un{m^3}\simeq4{,}7\times10^{4}\un{m^3}$.
:::

::: esercizio Densità di un sasso [base]
Un sasso pesa $3{,}6\un{N}$ in aria e $2{,}3\un{N}$ quando è completamente immerso in acqua. Calcolare volume e densità del sasso.
>>> soluzione
La spinta vale $3{,}6-2{,}3=1{,}3\un{N}$, quindi $V=F_A/(\rho_w g)=1{,}3/(1000\cdot9{,}81)\un{m^3}\simeq1{,}3\times10^{-4}\un{m^3}$. La densità è $\rho=1000\cdot3{,}6/1{,}3\un{kg/m^3}\simeq2{,}8\times10^{3}\un{kg/m^3}$.
:::

::: esercizio Zattera carica [medio]
Una zattera di legno ($\rho=600\un{kg/m^3}$) ha volume $0{,}80\un{m^3}$. Quale massa massima può trasportare in acqua dolce prima che il piano superiore arrivi al livello dell'acqua?
>>> soluzione
Al limite la zattera è tutta immersa e la spinta vale $1000\cdot g\cdot0{,}80$, corrispondente a $800\un{kg}$. La zattera ha massa $600\cdot0{,}80=480\un{kg}$; la massa trasportabile è quindi $800-480=320\un{kg}$.
:::

::: esercizio Pallone a elio [medio]
Un pallone sonda contiene $4{,}0\un{m^3}$ di elio a $20\,{}^\circ\mathrm{C}$. L'involucro con gli strumenti ha massa $2{,}5\un{kg}$. Usando le densità del testo, calcolare l'accelerazione iniziale verso l'alto, trascurando la resistenza dell'aria e la massa d'aria trascinata.
>>> soluzione
La spinta vale $1{,}20\cdot4{,}0\cdot g$, cioè il peso di $4{,}8\un{kg}$. La massa totale è $2{,}5+0{,}17\cdot4{,}0\simeq3{,}18\un{kg}$. La forza netta vale $(4{,}8-3{,}18)\cdot9{,}81\un{N}\simeq15{,}9\un{N}$ e l'accelerazione iniziale è $15{,}9/3{,}18\un{m/s^2}\simeq5{,}0\un{m/s^2}$. Il valore reale è minore, perché il pallone deve mettere in moto anche l'aria circostante e la resistenza cresce subito con la velocità.
:::

::: esercizio Oscillazioni di un galleggiante [avanzato]
Un cilindro di legno galleggia in acqua con l'asse verticale e $12\un{cm}$ di altezza immersa. Viene spinto un poco verso il basso e lasciato libero. Mostrare che, trascurando gli attriti e la massa d'acqua messa in moto, il cilindro oscilla di moto armonico e calcolarne il periodo.
>>> soluzione
In equilibrio la spinta $\rho_f gAh$ eguaglia il peso $mg$. Se il cilindro si abbassa di $y$ rispetto all'equilibrio, la spinta aumenta di $\rho_f gAy$, e la forza risultante è $-\rho_f gA\,y$: una forza di richiamo proporzionale allo spostamento, come quella di una molla con $k=\rho_f gA$. Usando $m=\rho_f Ah$,
$$\omega=\sqrt{\frac{k}{m}}=\sqrt{\frac{g}{h}},\qquad T=2\pi\sqrt{\frac{h}{g}}=2\pi\sqrt{\frac{0{,}12}{9{,}81}}\un{s}\simeq0{,}69\un{s}.$$
Il periodo dipende soltanto dall'altezza immersa. Le [oscillazioni armoniche](unit:physics-16) hanno un capitolo dedicato.
:::

# physics-11

## Il momento come prodotto vettoriale {#g-momento}

L'effetto di rotazione di una forza $\vect F$ applicata nel punto $P$, rispetto a un polo $O$, è descritto dal **momento** della forza

$$\vect\tau=\vect r\times\vect F,\qquad \vect r=\overrightarrow{OP}.$$

Il modulo vale $\tau=rF\sin\theta$, dove $\theta$ è l'angolo fra $\vect r$ e $\vect F$. Lo stesso prodotto si legge in due modi equivalenti: $F$ per il **braccio** $b=r\sin\theta$, cioè la distanza del polo dalla retta d'azione della forza, oppure $r$ per la componente di $\vect F$ perpendicolare a $\vect r$. La direzione di $\vect\tau$ è perpendicolare al piano di $\vect r$ e $\vect F$, con il verso della regola della mano destra; nei problemi piani si usa un segno, positivo per le rotazioni antiorarie.

La porta del pianeta di questa unità mostra la regola all'opera. Una forza di $40\un{N}$ applicata alla maniglia, a $0{,}80\un{m}$ dalla cerniera, con un angolo di $60^\circ$ rispetto al piano della porta, produce un momento $0{,}80\cdot40\cdot\sin60^\circ\un{N\,m}\simeq27{,}7\un{N\,m}$. La stessa forza diretta verso la cerniera ha braccio nullo e momento nullo.

## Le condizioni di equilibrio del corpo rigido {#g-equilibrio}

Un corpo rigido è in equilibrio se resta fermo, oppure se il centro di massa si muove di moto rettilineo uniforme e il corpo non cambia il proprio stato di rotazione. Servono due condizioni:

$$\sum\vect F_\mathrm{est}=\vect 0,\qquad \sum\vect\tau_\mathrm{est}=\vect 0.$$

La prima riguarda la traslazione del centro di massa, la seconda la rotazione. Quando la risultante delle forze è nulla, il momento totale non dipende dal polo scelto. Se $O'$ è un altro polo e $\vect d=\overrightarrow{O'O}$, ogni braccio cambia da $\vect r_i$ a $\vect r_i+\vect d$ e

$$\sum\vect\tau'=\sum(\vect r_i+\vect d)\times\vect F_i=\sum\vect\tau+\vect d\times\sum\vect F_i=\sum\vect\tau.$$

Questo risultato è un potente strumento di calcolo. Conviene scegliere il polo nel punto di applicazione di una forza incognita, che così sparisce dall'equazione dei momenti.

::: metodo Risolvere un problema di statica
1. Isolare il corpo e disegnare tutte le forze esterne nel loro punto di applicazione; il peso va nel baricentro.
2. Scrivere le equazioni delle componenti della risultante.
3. Scegliere il polo dove agiscono più forze incognite e scrivere l'equazione dei momenti con i segni.
4. Risolvere e controllare con un'equazione dei momenti rispetto a un secondo polo.
:::

::: figura trave-appoggiata
{"w":560,"h":290,"items":[
{"t":"rect","p":[60,120,400,18],"c":"body","r":2},
{"t":"poly","pts":[[69,138],[54,170],[84,170]],"close":true,"fill":true,"c":"muted"},
{"t":"poly","pts":[[451,138],[436,170],[466,170]],"close":true,"fill":true,"c":"muted"},
{"t":"ground","p":[30,170,110]},{"t":"ground","p":[412,170,490]},
{"t":"arrow","p":[69,225,69,142],"c":"force3","w":3,"s":"R","sub":"A","off":[-28,72]},
{"t":"arrow","p":[451,225,451,142],"c":"force3","w":3,"s":"R","sub":"B","off":[30,72]},
{"t":"arrow","p":[260,129,260,215],"c":"force","w":3,"s":"P","sub":"t","off":[0,18]},
{"t":"rect","p":[128,78,64,42],"c":"muted","s":"50 kg"},
{"t":"arrow","p":[160,129,160,215],"c":"force4","w":3,"s":"P","sub":"c","off":[0,18]},
{"t":"line","p":[69,262,451,262],"c":"muted","w":1},
{"t":"line","p":[69,255,69,269],"c":"muted"},{"t":"line","p":[160,255,160,269],"c":"muted"},{"t":"line","p":[260,255,260,269],"c":"muted"},{"t":"line","p":[451,255,451,269],"c":"muted"},
{"t":"text","p":[114,284],"s":"1,0 m","c":"muted","size":12},
{"t":"text","p":[355,284],"s":"lunghezza 4,0 m","c":"muted","size":12}
]}
---
Trave omogenea di $20\un{kg}$, lunga $4{,}0\un{m}$, appoggiata alle estremità con un carico di $50\un{kg}$ a $1{,}0\un{m}$ dall'appoggio $A$. Le reazioni degli appoggi si ricavano dall'equazione dei momenti.
:::

::: esempio Reazioni di una trave appoggiata
Per la trave della figura si sceglie il polo in $A$, dove agisce l'incognita $R_A$. I momenti antiorari sono positivi:
$$R_B\cdot4{,}0-(20\cdot9{,}81)\cdot2{,}0-(50\cdot9{,}81)\cdot1{,}0=0\qquad\Longrightarrow\qquad R_B\simeq221\un{N}.$$
L'equazione della risultante verticale dà $R_A=(70\cdot9{,}81-221)\un{N}\simeq466\un{N}$. Controllo con il polo in $B$: $R_A\cdot4{,}0=196{,}2\cdot2{,}0+490{,}5\cdot3{,}0$, da cui $R_A\simeq466\un{N}$. L'appoggio più vicino al carico sostiene la parte maggiore del peso.
:::

## Le leve {#g-leve}

Una leva è un corpo rigido che può ruotare attorno a un punto fisso, il **fulcro**. Su di essa agiscono una forza motrice $F_m$ con braccio $b_m$ e una forza resistente $F_r$ con braccio $b_r$. In equilibrio i momenti rispetto al fulcro si compensano:

$$F_m\,b_m=F_r\,b_r\qquad\Longrightarrow\qquad \frac{F_r}{F_m}=\frac{b_m}{b_r}.$$

Il rapporto $b_m/b_r$ è il vantaggio meccanico. Come nel sollevatore idraulico, la forza moltiplicata si paga con uno spostamento ridotto: i punti di applicazione percorrono archi proporzionali ai bracci, quindi il lavoro motore e quello resistente coincidono in assenza di attriti.

Le leve si classificano secondo la posizione del fulcro. In quelle di primo genere il fulcro sta fra le due forze, come nell'altalena a bilico e nelle forbici. In quelle di secondo genere la resistenza sta fra il fulcro e la forza motrice, come nella carriola e nello schiaccianoci: il vantaggio è sempre maggiore di uno. In quelle di terzo genere la forza motrice sta fra il fulcro e la resistenza, come nelle pinzette: il vantaggio è minore di uno, e la leva serve a ottenere spostamenti ampi e rapidi.

::: quotidiano L'avambraccio è una leva di terzo genere
Il gomito fa da fulcro, il bicipite si inserisce sul radio pochi centimetri più avanti, la mano regge il carico molto più lontano. Con valori tipici di $4\un{cm}$ per il braccio del muscolo e $35\un{cm}$ per quello del carico, reggere $5{,}0\un{kg}$ con l'avambraccio orizzontale richiede al bicipite una forza di circa $5{,}0\cdot9{,}81\cdot35/4\un{N}\simeq430\un{N}$, trascurando il peso dell'avambraccio. La disposizione è svantaggiosa per la forza e vantaggiosa per la velocità della mano.
:::

## Baricentro e stabilità {#g-baricentro}

Il peso di un corpo esteso agisce come se fosse applicato in un solo punto, il **baricentro**, che in un campo gravitazionale uniforme coincide con il centro di massa. Un corpo appoggiato su una base è in equilibrio se la verticale per il baricentro cade dentro la base d'appoggio; in caso contrario il peso produce un momento rispetto allo spigolo e il corpo si ribalta.

Una cassa con base larga $0{,}40\un{m}$ e baricentro a $0{,}60\un{m}$ di altezza, inclinata attorno a uno spigolo, si ribalta quando la verticale per il baricentro supera lo spigolo, cioè per un angolo $\theta$ con $\tan\theta=0{,}20/0{,}60$, circa $18^\circ$. Abbassando il baricentro o allargando la base l'angolo critico cresce: è il motivo per cui si caricano in basso gli oggetti pesanti di un furgone e per cui un equilibrista allarga le braccia o usa un'asta lunga.

::: esercizio Altalena a bilico [base]
Due bambini di $25\un{kg}$ e $35\un{kg}$ siedono su un'altalena a bilico con il fulcro al centro. Il primo è a $1{,}4\un{m}$ dal fulcro. A quale distanza deve sedersi il secondo perché l'asse resti in equilibrio orizzontale?
>>> soluzione
L'equilibrio dei momenti rispetto al fulcro richiede $25\cdot1{,}4=35\cdot d$, quindi $d=1{,}0\un{m}$. Il peso dell'asse ha braccio nullo, perché il baricentro dell'asse coincide con il fulcro.
:::

::: esercizio Carriola [medio]
Una carriola carica pesa in totale $600\un{N}$; il baricentro si trova a $0{,}50\un{m}$ dall'asse della ruota, misurati in orizzontale, e le maniglie a $1{,}30\un{m}$. Quale forza verticale serve per sollevare le maniglie? Quale forza sostiene la ruota?
>>> soluzione
Con il polo sull'asse della ruota: $F\cdot1{,}30=600\cdot0{,}50$, quindi $F\simeq231\un{N}$. La ruota sostiene $600-231\simeq369\un{N}$. La carriola è una leva di secondo genere: la forza richiesta è minore del peso.
:::

::: esercizio Mensola con tirante [avanzato]
Una mensola orizzontale omogenea, lunga $1{,}2\un{m}$ e di massa $4{,}0\un{kg}$, è incernierata al muro e sostenuta all'estremità libera da un tirante che forma un angolo di $30^\circ$ con la mensola. Calcolare la tensione del tirante e le componenti della forza della cerniera.
>>> soluzione
Momenti rispetto alla cerniera: $T\sin30^\circ\cdot1{,}2=4{,}0\cdot9{,}81\cdot0{,}60$, quindi $T=39{,}2\un{N}$. Equilibrio orizzontale: la cerniera spinge verso l'esterno del muro con $H=T\cos30^\circ\simeq34{,}0\un{N}$. Equilibrio verticale: $V=39{,}2-T\sin30^\circ=39{,}2-19{,}6=19{,}6\un{N}$ verso l'alto. Cerniera e tirante si dividono a metà il peso, come richiede la simmetria della mensola omogenea.
:::

# physics-22

## Lavoro del campo ed energia potenziale {#g-lavoro}

In un campo elettrico uniforme $\vect E$, una carica $q$ che si sposta di $d$ nel verso del campo riceve dal campo il lavoro $W=qEd$. Il lavoro della forza elettrostatica è indipendente dal percorso. La forza è quindi conservativa, come il peso nel campo gravitazionale uniforme, e ammette un'energia potenziale con $\Delta U=-W$. Il **potenziale** è l'energia potenziale per unità di carica, $V=U/q$, e la differenza di potenziale fra due punti è

$$\Delta V=V_B-V_A=-\int_A^B\vect E\cdot\dd\vect s,$$

che nel campo uniforme si riduce a $\Delta V=-Ed$ lungo le linee di campo. Una carica puntiforme $Q$ genera il potenziale $V(r)=kQ/r$, con riferimento nullo all'infinito; due cariche puntiformi a distanza $r$ hanno energia potenziale $U=kq_1q_2/r$, positiva se si respingono e negativa se si attraggono.

::: esempio Un elettrone accelerato
Un elettrone parte da fermo e attraversa una differenza di potenziale di $1{,}0\un{kV}$. Il campo compie il lavoro $W=e\Delta V=1{,}602\times10^{-19}\cdot1{,}0\times10^{3}\un{J}=1{,}6\times10^{-16}\un{J}$, che diventa energia cinetica:
$$v=\sqrt{\frac{2e\Delta V}{m_e}}=\sqrt{\frac{2\cdot1{,}602\times10^{-16}}{9{,}109\times10^{-31}}}\un{m/s}\simeq1{,}9\times10^{7}\un{m/s}.$$
La velocità è circa il $6\%$ di quella della luce, e la meccanica classica dà ancora una buona approssimazione.
:::

## Dal potenziale al campo {#g-gradiente}

Il potenziale si ottiene dal campo con un integrale; il campo si ottiene dal potenziale con una derivata. In una dimensione $E_x=-\dd V/\dd x$; nello spazio

$$\vect E=-\nabla V.$$

Il campo punta dove il potenziale diminuisce più rapidamente, e il suo modulo è tanto maggiore quanto più le superfici equipotenziali sono fitte. Su una superficie equipotenziale lo spostamento di una carica non richiede lavoro, quindi il campo è perpendicolare in ogni punto alla superficie. La superficie di un conduttore in equilibrio è equipotenziale: se non lo fosse, le cariche libere si muoverebbero.

::: figura equipotenziali
{"w":480,"h":350,"items":[{"t":"poly","pts":[[390.0,172.0],[389.4,185.1],[387.7,198.0],[384.9,210.8],[381.0,223.3],[375.9,235.4],[369.9,247.0],[362.9,258.0],[354.9,268.4],[346.1,278.1],[336.4,286.9],[326.0,294.9],[315.0,301.9],[303.4,307.9],[291.3,313.0],[278.8,316.9],[266.0,319.7],[253.1,321.4],[240.0,322.0],[226.9,321.4],[214.0,319.7],[201.2,316.9],[188.7,313.0],[176.6,307.9],[165.0,301.9],[154.0,294.9],[143.6,286.9],[133.9,278.1],[125.1,268.4],[117.1,258.0],[110.1,247.0],[104.1,235.4],[99.0,223.3],[95.1,210.8],[92.3,198.0],[90.6,185.1],[90.0,172.0],[90.6,158.9],[92.3,146.0],[95.1,133.2],[99.0,120.7],[104.1,108.6],[110.1,97.0],[117.1,86.0],[125.1,75.6],[133.9,65.9],[143.6,57.1],[154.0,49.1],[165.0,42.1],[176.6,36.1],[188.7,31.0],[201.2,27.1],[214.0,24.3],[226.9,22.6],[240.0,22.0],[253.1,22.6],[266.0,24.3],[278.8,27.1],[291.3,31.0],[303.4,36.1],[315.0,42.1],[326.0,49.1],[336.4,57.1],[346.1,65.9],[354.9,75.6],[362.9,86.0],[369.9,97.0],[375.9,108.6],[381.0,120.7],[384.9,133.2],[387.7,146.0],[389.4,158.9]],"close":true,"c":"muted","dash":true,"w":1.4},{"t":"poly","pts":[[315.0,172.0],[314.7,178.5],[313.9,185.0],[312.4,191.4],[310.5,197.7],[308.0,203.7],[305.0,209.5],[301.4,215.0],[297.5,220.2],[293.0,225.0],[288.2,229.5],[283.0,233.4],[277.5,237.0],[271.7,240.0],[265.7,242.5],[259.4,244.4],[253.0,245.9],[246.5,246.7],[240.0,247.0],[233.5,246.7],[227.0,245.9],[220.6,244.4],[214.3,242.5],[208.3,240.0],[202.5,237.0],[197.0,233.4],[191.8,229.5],[187.0,225.0],[182.5,220.2],[178.6,215.0],[175.0,209.5],[172.0,203.7],[169.5,197.7],[167.6,191.4],[166.1,185.0],[165.3,178.5],[165.0,172.0],[165.3,165.5],[166.1,159.0],[167.6,152.6],[169.5,146.3],[172.0,140.3],[175.0,134.5],[178.6,129.0],[182.5,123.8],[187.0,119.0],[191.8,114.5],[197.0,110.6],[202.5,107.0],[208.3,104.0],[214.3,101.5],[220.6,99.6],[227.0,98.1],[233.5,97.3],[240.0,97.0],[246.5,97.3],[253.0,98.1],[259.4,99.6],[265.7,101.5],[271.7,104.0],[277.5,107.0],[283.0,110.6],[288.2,114.5],[293.0,119.0],[297.5,123.8],[301.4,129.0],[305.0,134.5],[308.0,140.3],[310.5,146.3],[312.4,152.6],[313.9,159.0],[314.7,165.5]],"close":true,"c":"muted","dash":true,"w":1.4},{"t":"poly","pts":[[290.0,172.0],[289.8,176.4],[289.2,180.7],[288.3,184.9],[287.0,189.1],[285.3,193.1],[283.3,197.0],[281.0,200.7],[278.3,204.1],[275.4,207.4],[272.1,210.3],[268.7,213.0],[265.0,215.3],[261.1,217.3],[257.1,219.0],[252.9,220.3],[248.7,221.2],[244.4,221.8],[240.0,222.0],[235.6,221.8],[231.3,221.2],[227.1,220.3],[222.9,219.0],[218.9,217.3],[215.0,215.3],[211.3,213.0],[207.9,210.3],[204.6,207.4],[201.7,204.1],[199.0,200.7],[196.7,197.0],[194.7,193.1],[193.0,189.1],[191.7,184.9],[190.8,180.7],[190.2,176.4],[190.0,172.0],[190.2,167.6],[190.8,163.3],[191.7,159.1],[193.0,154.9],[194.7,150.9],[196.7,147.0],[199.0,143.3],[201.7,139.9],[204.6,136.6],[207.9,133.7],[211.3,131.0],[215.0,128.7],[218.9,126.7],[222.9,125.0],[227.1,123.7],[231.3,122.8],[235.6,122.2],[240.0,122.0],[244.4,122.2],[248.7,122.8],[252.9,123.7],[257.1,125.0],[261.1,126.7],[265.0,128.7],[268.7,131.0],[272.1,133.7],[275.4,136.6],[278.3,139.9],[281.0,143.3],[283.3,147.0],[285.3,150.9],[287.0,154.9],[288.3,159.1],[289.2,163.3],[289.8,167.6]],"close":true,"c":"muted","dash":true,"w":1.4},{"t":"text","p":[393.0,118.7],"s":"V","sub":"3","c":"muted","size":13,"i":true,"a":"start"},{"t":"text","p":[322.5,144.3],"s":"V","sub":"2","c":"muted","size":13,"i":true,"a":"start"},{"t":"text","p":[299.0,152.9],"s":"V","sub":"1","c":"muted","size":13,"i":true,"a":"start"},{"t":"arrow","p":[262.2,181.2,398.9,237.8],"c":"force","w":2},{"t":"arrow","p":[249.2,194.2,305.8,330.9],"c":"force","w":2},{"t":"arrow","p":[230.8,194.2,174.2,330.9],"c":"force","w":2},{"t":"arrow","p":[217.8,181.2,81.1,237.8],"c":"force","w":2},{"t":"arrow","p":[217.8,162.8,81.1,106.2],"c":"force","w":2},{"t":"arrow","p":[230.8,149.8,174.2,13.1],"c":"force","w":2},{"t":"arrow","p":[249.2,149.8,305.8,13.1],"c":"force","w":2},{"t":"arrow","p":[262.2,162.8,398.9,106.2],"c":"force","w":2},{"t":"circle","p":[240,172,15],"c":"force4","s":"+"},{"t":"text","p":[470,30],"s":"linee di campo","c":"force","size":13,"a":"end"},{"t":"text","p":[470,335],"s":"superfici equipotenziali","c":"muted","size":13,"a":"end"}]}
---
Carica puntiforme positiva: linee di campo radiali e tre superfici equipotenziali con $V_1-V_2=V_2-V_3$. Poiché $V\propto1/r$, a passi uguali di potenziale le superfici si diradano allontanandosi dalla carica, dove il campo è più debole.
:::

Per una carica puntiforme le superfici equipotenziali sono sfere concentriche. I raggi della figura stanno nel rapporto $1:1{,}5:3$, quindi i potenziali stanno nel rapporto $3:2:1$ e le differenze fra superfici consecutive sono uguali. Lo spazio fra le superfici cresce con la distanza perché il campo diminuisce come $1/r^2$.

## L'elettronvolt {#g-elettronvolt}

Nella fisica atomica e delle particelle si usa come unità di energia l'**elettronvolt**, l'energia acquistata da una carica elementare che attraversa una differenza di potenziale di un volt:

$$1\un{eV}=1{,}602\,176\,634\times10^{-19}\un{J}.$$

Il valore è esatto, perché dal 2019 la carica elementare ha un valore fissato per definizione nel Sistema Internazionale. Le energie di legame chimico valgono qualche elettronvolt; i fotoni della luce visibile, fra circa $380$ e $750\un{nm}$, trasportano fra circa $3{,}3$ e $1{,}7\un{eV}$; l'elettrone dell'esempio precedente ha un'energia cinetica di $1{,}0\un{keV}$.

## Energia immagazzinata in un condensatore {#g-energia}

Caricare un condensatore richiede lavoro, perché ogni nuova carica va portata contro la differenza di potenziale creata dalle cariche già presenti. Quando l'armatura contiene la carica $q$, la differenza di potenziale vale $q/C$ e il trasferimento di $\dd q$ costa $\dd W=(q/C)\dd q$. Sommando dal condensatore scarico fino alla carica finale $Q$:

$$U=\int_0^Q\frac{q}{C}\,\dd q=\frac{Q^2}{2C}=\frac12CV^2=\frac12QV.$$

Il fattore $1/2$ ricorda che durante la carica la differenza di potenziale cresce da zero al valore finale. Un condensatore da $100\un{\mu F}$ a $12\un{V}$ immagazzina $7{,}2\un{mJ}$; quello da $330\un{\mu F}$ del flash di una fotocamera, caricato a $300\un{V}$, circa $15\un{J}$, che vengono liberati in un tempo molto breve.

L'energia si può attribuire al campo elettrico stesso. Nel condensatore piano $C=\varepsilon_0A/d$ e $V=Ed$, quindi $U=\tfrac12\varepsilon_0E^2\,(Ad)$: l'energia per unità di volume del campo vale

$$u=\tfrac12\varepsilon_0E^2.$$

Con $E=3\times10^{6}\un{V/m}$, il campo oltre il quale l'aria secca diventa conduttrice in condizioni ordinarie, si ottengono circa $40\un{J/m^3}$.

::: esercizio Differenza di potenziale fra due piastre [base]
Fra due piastre parallele distanti $5{,}0\un{mm}$ c'è un campo uniforme di $2{,}4\times10^{4}\un{V/m}$. Calcolare la differenza di potenziale e il lavoro compiuto dal campo su un protone che va dalla piastra positiva a quella negativa.
>>> soluzione
$\Delta V=Ed=2{,}4\times10^{4}\cdot5{,}0\times10^{-3}\un{V}=120\un{V}$. Il protone si muove nel verso del campo e riceve il lavoro $W=e\Delta V=1{,}602\times10^{-19}\cdot120\un{J}\simeq1{,}9\times10^{-17}\un{J}$, cioè $120\un{eV}$.
:::

::: esercizio Energia di due cariche [medio]
Due cariche di $+2{,}0\un{\mu C}$ e $-3{,}0\un{\mu C}$ si trovano a $0{,}30\un{m}$. Calcolare l'energia potenziale del sistema e il lavoro necessario per allontanarle fino a distanza infinita.
>>> soluzione
$U=kq_1q_2/r=8{,}99\times10^{9}\cdot(2{,}0\times10^{-6})(-3{,}0\times10^{-6})/0{,}30\un{J}\simeq-0{,}18\un{J}$. Per separarle occorre fornire un lavoro esterno pari a $0{,}18\un{J}$, perché l'energia finale è nulla.
:::

::: esercizio Condensatore e batteria [medio]
Un condensatore da $47\un{\mu F}$ viene caricato a $9{,}0\un{V}$. Calcolare carica ed energia immagazzinata. Se la tensione raddoppia, come cambiano?
>>> soluzione
$Q=CV=47\times10^{-6}\cdot9{,}0\un{C}\simeq4{,}2\times10^{-4}\un{C}$; $U=\tfrac12CV^2=\tfrac12\cdot47\times10^{-6}\cdot81\un{J}\simeq1{,}9\un{mJ}$. Raddoppiando la tensione la carica raddoppia e l'energia quadruplica.
:::

# physics-23

## Resistenza e resistività {#g-resistivita}

La resistenza di un conduttore dipende dal materiale e dalla geometria. Per un filo di lunghezza $L$ e sezione $A$ uniformi,

$$R=\rho\,\frac{L}{A},$$

dove la **resistività** $\rho$ caratterizza il materiale. Il rame a $20\,{}^\circ\mathrm{C}$ ha $\rho\simeq1{,}68\times10^{-8}\un{\Omega\,m}$: un filo lungo $10\un{m}$ con sezione di $1{,}5\un{mm^2}$, una misura comune negli impianti domestici, ha resistenza $1{,}68\times10^{-8}\cdot10/1{,}5\times10^{-6}\un{\Omega}\simeq0{,}11\un{\Omega}$.

Nei metalli la resistività cresce con la temperatura; in un intervallo moderato vale l'approssimazione lineare $\rho(T)\simeq\rho_0[1+\alpha(T-T_0)]$, con $\alpha\simeq0{,}0039\un{K^{-1}}$ per il rame. La legge di Ohm $V=RI$ con $R$ costante descrive bene un resistore metallico a temperatura costante. Altri componenti hanno un comportamento diverso: la resistenza del filamento di una lampadina cresce molto mentre si scalda, e un diodo conduce in un verso e quasi per niente nell'altro.

## Resistori in serie e in parallelo {#g-serie-parallelo}

Due resistori sono **in serie** se la stessa corrente li attraversa uno dopo l'altro. Le differenze di potenziale si sommano, $V=R_1I+R_2I=(R_1+R_2)I$, quindi la resistenza equivalente è la somma:

$$R_s=R_1+R_2+\dots$$

Due resistori sono **in parallelo** se sono collegati agli stessi due nodi e hanno la stessa differenza di potenziale. Per la conservazione della carica la corrente che entra nel nodo si divide, $I=I_1+I_2=V/R_1+V/R_2$, quindi

$$\frac1{R_p}=\frac1{R_1}+\frac1{R_2}+\dots$$

Con $R_1=100\un{\Omega}$ e $R_2=300\un{\Omega}$ si ottiene $R_s=400\un{\Omega}$ e $R_p=75\un{\Omega}$. La resistenza di un parallelo è sempre minore della minore resistenza presente: aggiungere un ramo offre alla corrente un percorso in più.

Due resistori in serie formano un **partitore di tensione**: la tensione si divide in proporzione alle resistenze, $V_1=V\,R_1/(R_1+R_2)$. È il principio dei potenziometri e di molti circuiti di misura.

## Le leggi di Kirchhoff {#g-kirchhoff}

I circuiti con più maglie si risolvono con due leggi, conseguenze dirette di due principi di conservazione.

::: legge Leggi di Kirchhoff
**Legge dei nodi.** In ogni nodo la somma delle correnti entranti è uguale alla somma delle correnti uscenti, per la conservazione della carica.

**Legge delle maglie.** Lungo un percorso chiuso la somma algebrica delle differenze di potenziale è nulla, perché il campo elettrostatico è conservativo.
:::

Un generatore reale ha una resistenza interna $r$. Una batteria con forza elettromotrice $12\un{V}$ e $r=0{,}50\un{\Omega}$, collegata a un carico di $5{,}5\un{\Omega}$, eroga $I=12/(5{,}5+0{,}50)\un{A}=2{,}0\un{A}$, e ai suoi morsetti si misurano $12-2{,}0\cdot0{,}50=11\un{V}$.

::: figura due-maglie
{"w":560,"h":300,"items":[
{"t":"line","p":[60,60,110,60],"c":"ax","w":2},{"t":"rect","p":[110,48,70,24],"c":"body","s":"R₁"},{"t":"line","p":[180,60,340,60],"c":"ax","w":2},
{"t":"rect","p":[340,48,70,24],"c":"body","s":"R₂"},{"t":"line","p":[410,60,460,60],"c":"ax","w":2},
{"t":"line","p":[60,60,60,163],"c":"ax","w":2},{"t":"line","p":[38,163,82,163],"c":"force","w":3},{"t":"line","p":[48,177,72,177],"c":"force","w":3},{"t":"line","p":[60,177,60,240],"c":"ax","w":2},
{"t":"text","p":[30,174],"s":"E","sub":"1","c":"force","size":15,"a":"end","i":true},{"t":"text","p":[92,160],"s":"+","c":"force","size":14},
{"t":"line","p":[460,60,460,163],"c":"ax","w":2},{"t":"line","p":[438,163,482,163],"c":"force","w":3},{"t":"line","p":[448,177,472,177],"c":"force","w":3},{"t":"line","p":[460,177,460,240],"c":"ax","w":2},
{"t":"text","p":[492,174],"s":"E","sub":"2","c":"force","size":15,"a":"start","i":true},{"t":"text","p":[428,160],"s":"+","c":"force","size":14},
{"t":"line","p":[260,60,260,115],"c":"ax","w":2},{"t":"rect","p":[248,115,24,70],"c":"body"},{"t":"text","p":[284,156],"s":"R₃","c":"ax","size":14,"a":"start","i":true},{"t":"line","p":[260,185,260,240],"c":"ax","w":2},
{"t":"line","p":[60,240,460,240],"c":"ax","w":2},
{"t":"circle","p":[260,60,5],"c":"ax"},{"t":"circle","p":[260,240,5],"c":"ax"},
{"t":"text","p":[260,40],"s":"A","c":"ax","size":15,"i":true},{"t":"text","p":[260,268],"s":"B","c":"ax","size":15,"i":true},
{"t":"arrow","p":[195,80,240,80],"c":"force3","w":2,"s":"I","sub":"1","off":[-22,22]},
{"t":"arrow","p":[325,80,280,80],"c":"force3","w":2,"s":"I","sub":"2","off":[22,22]},
{"t":"arrow","p":[290,195,290,235],"c":"force3","w":2,"s":"I","sub":"3","off":[18,-10]}
]}
---
Circuito a due maglie: $\mathcal E_1=12\un{V}$, $\mathcal E_2=6{,}0\un{V}$, $R_1=4{,}0\un{\Omega}$, $R_2=2{,}0\un{\Omega}$, $R_3=6{,}0\un{\Omega}$. Le frecce indicano i versi scelti per le correnti; il segno delle soluzioni dice se il verso reale coincide.
:::

::: esempio Un circuito a due maglie
Per il circuito della figura si prende come riferimento il potenziale del nodo $B$ e si chiama $V$ il potenziale del nodo $A$. Le correnti nei tre rami valgono
$$I_1=\frac{\mathcal E_1-V}{R_1},\qquad I_2=\frac{\mathcal E_2-V}{R_2},\qquad I_3=\frac{V}{R_3}.$$
La legge dei nodi in $A$, $I_1+I_2=I_3$, diventa
$$\frac{12-V}{4{,}0}+\frac{6{,}0-V}{2{,}0}=\frac{V}{6{,}0}\qquad\Longrightarrow\qquad V=\frac{72}{11}\un{V}\simeq6{,}55\un{V}.$$
Ne seguono $I_1\simeq1{,}36\un{A}$, $I_2\simeq-0{,}27\un{A}$ e $I_3\simeq1{,}09\un{A}$. Il segno negativo di $I_2$ indica che la corrente nel ramo destro scorre in verso opposto a quello scelto: il generatore più forte carica quello più debole. Controllo: $1{,}36-0{,}27=1{,}09$.
:::

## Potenza ed effetto Joule {#g-joule}

Una carica $\dd q$ che attraversa un componente con differenza di potenziale $V$ cede l'energia $V\,\dd q$; dividendo per il tempo si ottiene la potenza

$$P=VI.$$

In un resistore l'energia ceduta diventa energia interna e calore, per l'effetto Joule; con la legge di Ohm $P=RI^2=V^2/R$. Un bollitore da $2000\un{W}$ alimentato a $230\un{V}$ assorbe $I=2000/230\un{A}\simeq8{,}7\un{A}$ e ha una resistenza di circa $26\un{\Omega}$. In tre minuti consuma $2000\cdot180\un{J}=3{,}6\times10^{5}\un{J}$, cioè $0{,}10\un{kWh}$.

Nei cavi l'effetto Joule è una perdita: a parità di potenza trasmessa la corrente è inversamente proporzionale alla tensione, e la potenza dissipata nei cavi cresce come il quadrato della corrente. Per questo l'energia elettrica viaggia sulle lunghe distanze ad alta tensione. Fusibili e interruttori magnetotermici proteggono gli impianti interrompendo il circuito quando la corrente supera il valore per cui i cavi sono dimensionati.

::: esercizio Prolunga [base]
Una prolunga ha due conduttori di rame lunghi $15\un{m}$ ciascuno, con sezione $1{,}0\un{mm^2}$. Calcolare la resistenza complessiva dei due conduttori e la potenza dissipata quando alimenta una stufa che assorbe $8{,}0\un{A}$.
>>> soluzione
La corrente percorre $30\un{m}$ di rame: $R=1{,}68\times10^{-8}\cdot30/1{,}0\times10^{-6}\un{\Omega}\simeq0{,}50\un{\Omega}$. La potenza dissipata nei cavi è $RI^2=0{,}50\cdot64\un{W}\simeq32\un{W}$.
:::

::: esercizio Serie e parallelo [base]
Tre resistori da $60\un{\Omega}$, $30\un{\Omega}$ e $20\un{\Omega}$ sono collegati in parallelo a una batteria ideale da $12\un{V}$. Calcolare la resistenza equivalente, la corrente totale e la corrente in ciascun resistore.
>>> soluzione
$1/R_p=1/60+1/30+1/20=6/60$, quindi $R_p=10\un{\Omega}$ e $I=1{,}2\un{A}$. Ogni resistore ha $12\un{V}$ ai capi: le correnti sono $0{,}20$, $0{,}40$ e $0{,}60\un{A}$, la cui somma è $1{,}2\un{A}$.
:::

::: esercizio Batteria con resistenza interna [medio]
Ai morsetti di una batteria si misurano $9{,}0\un{V}$ a circuito aperto e $8{,}4\un{V}$ quando eroga $1{,}5\un{A}$. Calcolare la resistenza interna e la resistenza del carico.
>>> soluzione
A circuito aperto la tensione misurata coincide con la forza elettromotrice, $9{,}0\un{V}$. Sotto carico la caduta interna è $0{,}6\un{V}$, quindi $r=0{,}6/1{,}5\un{\Omega}=0{,}40\un{\Omega}$. Il carico ha $R=8{,}4/1{,}5\un{\Omega}=5{,}6\un{\Omega}$.
:::

# physics-10

## Momenti d'inerzia notevoli {#g-momenti-notevoli}

Il momento d'inerzia $I=\int r_\perp^2\,\dd m$ dipende dalla massa del corpo, dalla sua forma e dalla posizione dell'asse. Per i corpi omogenei di forma semplice l'integrale si calcola una volta per tutte, e il risultato si scrive come $I=k\,MR^2$ oppure $I=k\,ML^2$, con un coefficiente numerico $k$ che riassume la distribuzione della massa.

| Corpo omogeneo | Asse | Momento d'inerzia |
|---|---|---|
| Anello o guscio cilindrico sottile di raggio $R$ | asse di simmetria | $MR^2$ |
| Disco o cilindro pieno di raggio $R$ | asse di simmetria | $\tfrac12MR^2$ |
| Sfera piena di raggio $R$ | un diametro | $\tfrac25MR^2$ |
| Guscio sferico sottile di raggio $R$ | un diametro | $\tfrac23MR^2$ |
| Asta sottile di lunghezza $L$ | perpendicolare, per il centro | $\tfrac1{12}ML^2$ |
| Asta sottile di lunghezza $L$ | perpendicolare, per un estremo | $\tfrac13ML^2$ |

Il confronto fra anello e disco mostra il peso della distribuzione: a parità di massa e raggio, l'anello ha tutta la massa alla distanza massima dall'asse e un momento d'inerzia doppio di quello del disco.

::: legge Teorema degli assi paralleli
Se $I_\mathrm{cm}$ è il momento d'inerzia rispetto a un asse passante per il centro di massa, il momento rispetto a un asse parallelo a distanza $d$ vale
$$I=I_\mathrm{cm}+Md^2.$$
:::

Il teorema, attribuito a Steiner, segue dalla definizione. Scrivendo la posizione di ogni elemento rispetto al nuovo asse come somma della posizione del centro di massa e della posizione relativa, il termine misto si annulla perché il centro di massa è la media pesata delle posizioni. Per un'asta di $1{,}2\un{kg}$ lunga $0{,}90\un{m}$ si ottiene, rispetto a un estremo, $I=\tfrac1{12}ML^2+M(L/2)^2=0{,}081+0{,}243=0{,}324\un{kg\,m^2}$, lo stesso valore di $\tfrac13ML^2$ della tabella. Il momento d'inerzia minimo, fra tutti gli assi paralleli, è quello per il centro di massa.

## Energia di rotazione e rotolamento {#g-rotolamento}

Ogni elemento di un corpo che ruota attorno a un asse fisso con velocità angolare $\omega$ ha velocità $r_\perp\omega$. Sommando le energie cinetiche degli elementi:

$$K_\mathrm{rot}=\int\tfrac12(r_\perp\omega)^2\,\dd m=\tfrac12I\omega^2.$$

Un volano d'acciaio a forma di disco, di $20\un{kg}$ e raggio $0{,}25\un{m}$, ha $I=\tfrac12MR^2=0{,}625\un{kg\,m^2}$. A $3000$ giri al minuto, cioè $\omega\simeq314\un{rad/s}$, immagazzina $K\simeq3{,}1\times10^{4}\un{J}$, l'energia necessaria per sollevare una tonnellata di circa tre metri.

Un corpo che rotola senza strisciare ha il punto di contatto istantaneamente fermo, quindi la velocità del centro e quella angolare sono legate da $v=R\omega$. La sua energia cinetica è la somma di un termine di traslazione del centro di massa e di uno di rotazione attorno al centro di massa:

$$K=\tfrac12Mv^2+\tfrac12I_\mathrm{cm}\omega^2=\tfrac12Mv^2\left(1+\frac{I_\mathrm{cm}}{MR^2}\right).$$

L'attrito statico che impedisce lo strisciamento agisce su un punto fermo e non compie lavoro, quindi l'energia meccanica si conserva. Un corpo che scende di una quota $h$ partendo da fermo raggiunge la velocità

$$v=\sqrt{\frac{2gh}{1+I_\mathrm{cm}/(MR^2)}}.$$

::: esempio La gara dei corpi che rotolano
Una sfera piena, un cilindro pieno e un anello scendono rotolando lungo lo stesso piano inclinato da un dislivello di $1{,}0\un{m}$. Con $I_\mathrm{cm}/(MR^2)$ pari a $0{,}4$, $0{,}5$ e $1$ si ottengono velocità finali di circa $3{,}74$, $3{,}62$ e $3{,}13\un{m/s}$. Un blocco che scivolasse senza attrito arriverebbe a $4{,}43\un{m/s}$. L'ordine di arrivo è indipendente dalla massa e dal raggio e dipende soltanto da come la massa è distribuita. La sfera vince perché destina alla rotazione la frazione più piccola dell'energia disponibile.
:::

::: esercizio Asta che cade [medio]
Un'asta omogenea lunga $1{,}0\un{m}$, incernierata senza attrito a un estremo, viene lasciata cadere da ferma in posizione orizzontale. Calcolare la velocità angolare quando passa per la verticale e la velocità dell'estremo libero.
>>> soluzione
Il centro di massa scende di $L/2$. La conservazione dell'energia dà $Mg\,L/2=\tfrac12\cdot\tfrac13ML^2\omega^2$, quindi $\omega=\sqrt{3g/L}\simeq5{,}42\un{rad/s}$. L'estremo libero si muove a $v=L\omega\simeq5{,}42\un{m/s}$, più veloce di un corpo caduto liberamente dalla stessa altezza del centro di massa.
:::

::: esercizio Energia di un disco che rotola [base]
Quale frazione dell'energia cinetica di un cilindro pieno che rotola senza strisciare è energia di rotazione?
>>> soluzione
Con $I_\mathrm{cm}=\tfrac12MR^2$ e $\omega=v/R$, l'energia di rotazione è $\tfrac14Mv^2$ e quella di traslazione $\tfrac12Mv^2$. La frazione di rotazione è $\tfrac14/\tfrac34=1/3$.
:::

::: esercizio Volano e frenata [medio]
Il volano dell'esempio del testo rallenta da $3000$ a $1500$ giri al minuto. Quanta energia cede? Se la cede in $20\un{s}$, quale potenza media fornisce?
>>> soluzione
L'energia è proporzionale a $\omega^2$: dimezzando la velocità angolare resta un quarto dell'energia iniziale. Il volano cede quindi $\tfrac34\cdot3{,}08\times10^{4}\un{J}\simeq2{,}3\times10^{4}\un{J}$, con una potenza media di circa $1{,}2\un{kW}$.
:::
