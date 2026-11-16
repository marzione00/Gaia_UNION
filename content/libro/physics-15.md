---
unit: physics-15
titolo: Galleggiamento e Archimede
sottotitolo: Spinta, peso efficace e galleggiamento
volume: Volume di fisica
fonte: Dispensa di fisica, sezioni 2.7.2 e materiali delle sezioni 2.23
origine: dispensa
---
## Prima di cominciare {#apertura}

Un oggetto viene immerso gradualmente in un fluido e il laboratorio vuole prevedere la spinta che riceve. La spinta dipende dal volume effettivamente immerso e dalla densità del fluido, e resta la stessa per corpi di forma diversa che spostano lo stesso volume.

Il capitolo parte dalla sezione della dispensa sulla spinta di Archimede e sul peso efficace. Le sezioni aggiunte per il sito ricavano la spinta dalla differenza di pressione fra le facce di un corpo immerso, discutono galleggiamento e frazione immersa, densimetri, palloni aerostatici e stabilità delle imbarcazioni. Il capitolo presuppone la [pressione nei fluidi](unit:physics-14).

## Spinta di Archimede e peso efficace {#s-2-7-2}

La pressione cresce con la profondità, quindi la risultante delle forze di pressione su un corpo immerso possiede una componente verso l'alto. Per un fluido in equilibrio,

::: legge Principio di Archimede
$$F_A=\rho_f V_{\mathrm{sp}}g,$$
:::

dove $\rho_f$ è la densità del fluido e $V_{\mathrm{sp}}$ il volume di fluido spostato. Un corpo galleggia in equilibrio quando il peso del fluido spostato uguaglia il suo peso. Per un corpo omogeneo che galleggia,

$$\frac{V_{\mathrm{imm}}}{V}=\frac{\rho_{\mathrm{corpo}}}{\rho_f}.$$

La spinta modifica anche la velocità limite. Per una sfera che scende in un fluido e resta completamente immersa, il peso efficace è

$$W_{\mathrm{eff}}=(m-\rho_fV)g.$$

Nel regime lineare $v_t=W_{\mathrm{eff}}/b$; nel modello quadratico

$$v_t=\sqrt{\frac{2W_{\mathrm{eff}}}{C_D\rho_fA}}.$$

Le formule richiedono $m>\rho_fV$ e moto verso il basso. Se il corpo è meno denso del fluido, il verso spontaneo si inverte.

::: errore La spinta di Archimede non richiede che il corpo galleggi
La spinta agisce anche su un corpo che affonda, purché sia immerso in un fluido. Galleggiamento, equilibrio sospeso o affondamento dipendono dal confronto fra spinta, peso e altre forze, non dalla presenza o assenza della spinta.
:::

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

## Esercizi {#esercizi}

Gli esercizi riprendono quelli della dispensa. Ogni soluzione è nascosta finché non la apri: prova prima a impostare il problema da solo.

### Problemi di sintesi: dinamica

::: esercizio Peso apparente immerso in acqua [base]
Un oggetto di massa $2{,}2\un{kg}$ e volume $0{,}003\un{m^3}$ è completamente immerso in acqua. Calcolare spinta e forza necessaria verso il basso o l'alto per mantenerlo fermo.
>>> soluzione
**Spinta.**  $F_A=\rho gV=29{,}4\un{N}$.

**Confronto.**  Il peso è $mg=21{,}6\un{N}$. Poiché la spinta è maggiore, serve una forza verso il basso di $F_A-mg=7{,}85\un{N}$.
:::

## Fonti {#fonti}

Il testo, le formule, i diagrammi e gli esercizi di questo capitolo provengono dalla *Dispensa di fisica* del corso (sezioni 2.7.2 e materiali delle sezioni 2.23), consultabile nel lettore della galassia. Per la lettura sul sito sono cambiati l'impaginazione, i colori delle figure, la numerazione e la posizione di alcuni riquadri ed esercizi; la sezione iniziale è scritta per il pianeta di questa unità.
