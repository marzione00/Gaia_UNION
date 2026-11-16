---
unit: chemistry-21
titolo: Acidi, basi e pH
sottotitolo: Definizioni di Arrhenius, Brønsted-Lowry e Lewis, prodotto ionico dell'acqua, scala del pH, acidi e basi forti e deboli, sali, indicatori
volume: Volume di chimica
fonte: Testo originale; riferimento principale Petrucci et al., General Chemistry, 11ª ed., §16-1–16-6, 16-8, 16-10, 16-11 e 17-3
---

## Prima di cominciare {#apertura}

Il succo di limone è aspro, l'aceto pizzica la lingua, il sapone è scivoloso fra le dita e amaro in bocca. Una foglia di cavolo rosso bollita dà un'acqua violacea che diventa rossa con qualche goccia di aceto e verde con un pizzico di bicarbonato. Sapori, sensazioni al tatto e cambiamenti di colore come questi servirono per secoli a riconoscere due grandi famiglie di sostanze, gli **acidi** e le **basi**, presenti ovunque: in cucina, nei detersivi, nel suolo, nella pioggia, nello stomaco e nel sangue.

Per confrontare la forza di un acido o di una base servono una definizione precisa e una scala numerica. Questo capitolo presenta tre definizioni successive, sempre più generali, di Arrhenius, di Brønsted e Lowry, di Lewis; introduce l'equilibrio di ionizzazione dell'acqua e la scala del pH; distingue acidi e basi forti da acidi e basi deboli, e mostra come calcolare il pH delle loro soluzioni con gli strumenti del capitolo [Equilibrio chimico](unit:chemistry-19). Le ultime parti spiegano perché alcuni sali rendono acida o basica l'acqua in cui si sciolgono, come la struttura delle molecole decide la forza di un acido e come funzionano gli indicatori colorati.

::: obiettivi
- riconoscere acidi e basi secondo le definizioni di Arrhenius, di Brønsted e Lowry e di Lewis, e individuare le coppie coniugate;
- usare il prodotto ionico dell'acqua e la sua dipendenza dalla temperatura;
- calcolare pH e pOH e passare dall'uno all'altro e alle concentrazioni;
- calcolare il pH di soluzioni di acidi e basi forti e deboli, valutando le approssimazioni;
- collegare le costanti di acidità e di basicità di una coppia coniugata;
- descrivere il comportamento degli acidi poliprotici e dei sali in acqua;
- spiegare la forza degli acidi in base alla struttura molecolare;
- scegliere un indicatore in base al suo intervallo di viraggio.
:::

Il capitolo usa le concentrazioni molari del capitolo [Soluzioni e concentrazione](unit:chemistry-12), gli elettroliti forti e deboli dello stesso capitolo, la costante di equilibrio e le tabelle delle quantità del capitolo [Equilibrio chimico](unit:chemistry-19). Servono i logaritmi decimali: $\log10^{-3}=-3$, $\log2\simeq0{,}301$, e $10^{-x}$ è la funzione inversa. Il capitolo successivo, [Soluzioni tampone](unit:chemistry-22), userà queste basi per le miscele che resistono alle variazioni di pH.

## Acidi e basi secondo Arrhenius {#arrhenius}

Nel 1884, nella sua tesi di dottorato sulla conducibilità delle soluzioni, lo svedese Svante Arrhenius propose che gli elettroliti, sciogliendosi in acqua, si separino in ioni. Su questa base diede le prime definizioni moderne.

::: definizione Acido e base secondo Arrhenius
Un **acido** è una sostanza che in acqua libera ioni idrogeno, $\mathrm{H^+}$; una **base** è una sostanza che in acqua libera ioni idrossido, $\mathrm{OH^-}$.
:::

L'acido cloridrico è un acido perché in acqua si separa negli ioni $\mathrm{H^+}$ e $\mathrm{Cl^-}$; l'idrossido di sodio è una base perché si separa in $\mathrm{Na^+}$ e $\mathrm{OH^-}$. La **neutralizzazione** fra un acido e una base si riduce a una sola reazione fra ioni, la stessa per tutte le coppie di acidi e basi forti:

$$\mathrm{H^+(aq)}+\mathrm{OH^-(aq)}\longrightarrow\mathrm{H_2O(l)},\qquad\Delta H^\circ=-55{,}8\un{kJ}.$$

Il valore costante dell'entalpia di neutralizzazione, misurato con acidi e basi diversi, fu uno dei sostegni della teoria. La definizione ha però due limiti. È legata all'acqua come solvente, e lascia fuori le reazioni fra acidi e basi in altri solventi o in fase gassosa, come quella fra l'ammoniaca e l'acido cloridrico gassosi che formano il fumo bianco del cloruro di ammonio. Inoltre non spiega perché l'ammoniaca, che non contiene ioni idrossido, renda basica l'acqua in cui si scioglie.

## Acidi e basi secondo Brønsted e Lowry {#bronsted}

Nel 1923 il danese Johannes Nicolaus Brønsted e l'inglese Thomas Martin Lowry proposero, indipendentemente, una definizione basata sul trasferimento di un protone, cioè di uno ione $\mathrm{H^+}$, da una specie a un'altra.

::: definizione Acido e base secondo Brønsted e Lowry
Un **acido** è una specie che cede un protone; una **base** è una specie che accetta un protone. Una reazione acido-base è un trasferimento di protone dall'acido alla base.
:::

Un protone isolato, un nucleo di idrogeno privo di elettroni, in acqua si lega subito a una molecola d'acqua, formando lo ione **ossonio** $\mathrm{H_3O^+}$, a sua volta circondato da altre molecole d'acqua. Quando l'acido cloridrico si scioglie, cede il protone all'acqua,

$$\mathrm{HCl(aq)}+\mathrm{H_2O(l)}\longrightarrow\mathrm{H_3O^+(aq)}+\mathrm{Cl^-(aq)},$$

e l'acqua si comporta da base. Quando si scioglie l'ammoniaca, è l'acqua a cedere un protone,

$$\mathrm{NH_3(aq)}+\mathrm{H_2O(l)}\rightleftharpoons\mathrm{NH_4^+(aq)}+\mathrm{OH^-(aq)},$$

e l'acqua si comporta da acido. Una specie che può comportarsi sia da acido sia da base, come l'acqua o lo ione idrogenocarbonato $\mathrm{HCO_3^-}$, si dice **anfiprotica**.

Ogni reazione acido-base nel senso di Brønsted è reversibile almeno in linea di principio, e la reazione inversa è anch'essa un trasferimento di protone. Quando un acido $\mathrm{HA}$ cede il protone, ciò che resta, $\mathrm{A^-}$, può riprenderlo: è una base, la **base coniugata** di $\mathrm{HA}$. Allo stesso modo $\mathrm{H_3O^+}$ è l'**acido coniugato** dell'acqua. Una reazione acido-base coinvolge sempre due **coppie coniugate**, che differiscono per un protone.

::: figura coppie
{"w":660,"h":250,"items":[{"t":"text","p":[90,130],"s":"HA","c":"force4","size":20},{"t":"text","p":[90,158],"s":"acido","c":"muted","size":11},{"t":"text","p":[240,130],"s":"H₂O","c":"force2","size":20},{"t":"text","p":[240,158],"s":"base","c":"muted","size":11},{"t":"text","p":[420,130],"s":"A⁻","c":"force2","size":20},{"t":"text","p":[420,158],"s":"base coniugata","c":"muted","size":11},{"t":"text","p":[570,130],"s":"H₃O⁺","c":"force4","size":20},{"t":"text","p":[570,158],"s":"acido coniugato","c":"muted","size":11},{"t":"text","p":[165,130],"s":"+","c":"ax","size":18},{"t":"text","p":[495,130],"s":"+","c":"ax","size":18},{"t":"text","p":[330,130],"s":"⇌","c":"ax","size":22},{"t":"poly","pts":[[90,100],[90,70],[420,70],[420,100]],"c":"force3","w":1.6},{"t":"text","p":[255,62],"s":"coppia coniugata 1","c":"force3","size":12},{"t":"poly","pts":[[240,176],[240,206],[570,206],[570,176]],"c":"force","w":1.6},{"t":"text","p":[405,226],"s":"coppia coniugata 2","c":"force","size":12},{"t":"arrow","p":[110,112,220,112],"c":"accent","w":1.6,"head":7},{"t":"text","p":[165,96],"s":"H⁺","c":"accent","size":12}]}
---
Le due coppie coniugate nella reazione di un acido $\mathrm{HA}$ con l'acqua. L'acido cede il protone all'acqua, che si comporta da base; i prodotti sono la base coniugata dell'acido e l'acido coniugato dell'acqua.
:::

Nella reazione dell'ammoniaca con l'acqua le coppie sono $\mathrm{NH_4^+}/\mathrm{NH_3}$ e $\mathrm{H_2O}/\mathrm{OH^-}$. La definizione di Brønsted spiega in modo naturale la basicità dell'ammoniaca, e vale anche fuori dall'acqua: nella reazione fra ammoniaca e acido cloridrico gassosi il protone passa direttamente dall'acido alla base.

## L'acqua che si ionizza da sola {#kw}

Anche l'acqua più pura conduce un poco la corrente elettrica, perché contiene una piccolissima quantità di ioni. Due molecole d'acqua possono scambiarsi un protone:

$$\mathrm{H_2O(l)}+\mathrm{H_2O(l)}\rightleftharpoons\mathrm{H_3O^+(aq)}+\mathrm{OH^-(aq)}.$$

L'equilibrio, detto **autoionizzazione** o autoprotolisi dell'acqua, è molto spostato a sinistra. La sua costante, nella quale l'acqua come solvente non compare, si chiama **prodotto ionico dell'acqua**.

::: legge Prodotto ionico dell'acqua
$$K_\mathrm w=[\mathrm{H_3O^+}][\mathrm{OH^-}]=1{,}0\times10^{-14}\quad\text{a }25\,^\circ\mathrm C.$$
In ogni soluzione acquosa diluita a $25\,^\circ\mathrm C$ il prodotto delle due concentrazioni vale $1{,}0\times10^{-14}$.
:::

Nell'acqua pura i due ioni si formano in quantità uguali, e quindi $[\mathrm{H_3O^+}]=[\mathrm{OH^-}]=1{,}0\times10^{-7}\un{M}$. Una soluzione è **neutra** quando le due concentrazioni sono uguali, **acida** quando prevale lo ione ossonio, **basica** quando prevale lo ione idrossido. Le concentrazioni dei due ioni sono legate: se un acido porta $[\mathrm{H_3O^+}]$ a $1{,}0\times10^{-3}\un{M}$, la concentrazione dello ione idrossido scende a $1{,}0\times10^{-11}\un{M}$.

L'autoionizzazione è endotermica, e la costante cresce con la temperatura, come prevede l'equazione di van 't Hoff del capitolo [Perturbazioni dell'equilibrio](unit:chemistry-20). A $0\,^\circ\mathrm C$ vale $1{,}1\times10^{-15}$, a $100\,^\circ\mathrm C$ circa $5{,}6\times10^{-13}$. Il valore $1{,}0\times10^{-14}$ è proprio di $25\,^\circ\mathrm C$; a $37\,^\circ\mathrm C$, la temperatura del corpo umano, il prodotto ionico vale circa $2{,}4\times10^{-14}$.

::: figura kw
{"w":660,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[225,""],"sx":5.2,"sy":125,"xt":[[20,"20"],[40,"40"],[60,"60"],[80,"80"],[100,"100"]],"yt":[[0.1,"6,0"],[0.6,"6,5"],[1.1,"7,0"],[1.6,"7,5"]]},{"t":"text","p":[96,28],"s":"pH dell'acqua pura (neutralità)","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"temperatura (°C)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":5.2,"sy":125,"pts":[[0,1.5735],[10,1.367],[20,1.1825],[25,1.0975],[30,1.0165],[40,0.8675],[50,0.7325],[60,0.61],[70,0.4995],[80,0.399],[90,0.3085],[100,0.226]],"c":"force2","w":2.6},{"t":"circle","p":[80.0,53.3,3.5],"c":"force2"},{"t":"circle","p":[132.0,79.1,3.5],"c":"force2"},{"t":"circle","p":[184.0,102.2,3.5],"c":"force2"},{"t":"circle","p":[210.0,112.8,3.5],"c":"force2"},{"t":"circle","p":[236.0,122.9,3.5],"c":"force2"},{"t":"circle","p":[288.0,141.6,3.5],"c":"force2"},{"t":"circle","p":[340.0,158.4,3.5],"c":"force2"},{"t":"circle","p":[392.0,173.8,3.5],"c":"force2"},{"t":"circle","p":[444.0,187.6,3.5],"c":"force2"},{"t":"circle","p":[496.0,200.1,3.5],"c":"force2"},{"t":"circle","p":[548.0,211.4,3.5],"c":"force2"},{"t":"circle","p":[600.0,221.8,3.5],"c":"force2"},{"t":"plot","o":[80,250],"sx":5.2,"sy":125,"pts":[[0,1.1],[100,1.1]],"c":"muted","w":1,"dash":true},{"t":"circle","p":[272.4,136.1,5],"c":"force4"},{"t":"text","p":[280.4,126.1],"s":"37 °C: 6,81","c":"force4","size":12,"a":"start"},{"t":"text","p":[90.4,128.5],"s":"25 °C: 7,00","c":"muted","size":11,"a":"start"}]}
---
pH dell'acqua pura, cioè della neutralità, in funzione della temperatura, calcolato dal prodotto ionico dell'acqua. A $25\,^\circ\mathrm C$ vale $7{,}00$; a $37\,^\circ\mathrm C$ vale $6{,}81$, a $100\,^\circ\mathrm C$ circa $6{,}13$. L'acqua pura calda resta neutra: la neutralità corrisponde a $[\mathrm{H_3O^+}]=[\mathrm{OH^-}]$, non a un pH fisso.
:::

## La scala del pH {#ph}

Le concentrazioni dello ione ossonio nelle soluzioni comuni vanno da circa $1\un{M}$ a $10^{-14}\un{M}$: quattordici ordini di grandezza. Per maneggiarle comodamente il chimico danese Søren Sørensen, che studiava al laboratorio Carlsberg di Copenaghen l'effetto dell'acidità sugli enzimi della fermentazione, introdusse nel 1909 una scala logaritmica.

::: definizione pH e pOH
$$\mathrm{pH}=-\log[\mathrm{H_3O^+}],\qquad\mathrm{pOH}=-\log[\mathrm{OH^-}],$$
con le concentrazioni in $\mathrm{mol/L}$. Dal prodotto ionico dell'acqua, a $25\,^\circ\mathrm C$,
$$\mathrm{pH}+\mathrm{pOH}=\mathrm pK_\mathrm w=14{,}00.$$
:::

Il segno meno rende positivi i valori nelle soluzioni comuni. A $25\,^\circ\mathrm C$ una soluzione neutra ha pH $7$, una soluzione acida pH minore di $7$, una soluzione basica pH maggiore di $7$. La scala è logaritmica: una unità di pH in meno significa una concentrazione di ione ossonio dieci volte maggiore. Il succo di limone, con pH intorno a $2{,}3$, contiene circa $5\times10^{-3}\un{mol/L}$ di ione ossonio, più di centomila volte quanto ne contiene il sangue, con pH $7{,}4$.

::: figura scala
{"w":660,"h":240,"items":[{"t":"rect","p":[50.0,56,160.0,28],"c":"force4","r":0},{"t":"rect","p":[210.0,56,120.0,28],"c":"force","r":0},{"t":"rect","p":[330.0,56,120.0,28],"c":"force3","r":0},{"t":"rect","p":[450.0,56,160.0,28],"c":"force2","r":0},{"t":"line","p":[50.0,84,50.0,90],"c":"ax","w":1.2},{"t":"text","p":[50.0,106],"s":"0","c":"muted","size":12},{"t":"line","p":[130.0,84,130.0,90],"c":"ax","w":1.2},{"t":"text","p":[130.0,106],"s":"2","c":"muted","size":12},{"t":"line","p":[210.0,84,210.0,90],"c":"ax","w":1.2},{"t":"text","p":[210.0,106],"s":"4","c":"muted","size":12},{"t":"line","p":[290.0,84,290.0,90],"c":"ax","w":1.2},{"t":"text","p":[290.0,106],"s":"6","c":"muted","size":12},{"t":"line","p":[370.0,84,370.0,90],"c":"ax","w":1.2},{"t":"text","p":[370.0,106],"s":"8","c":"muted","size":12},{"t":"line","p":[450.0,84,450.0,90],"c":"ax","w":1.2},{"t":"text","p":[450.0,106],"s":"10","c":"muted","size":12},{"t":"line","p":[530.0,84,530.0,90],"c":"ax","w":1.2},{"t":"text","p":[530.0,106],"s":"12","c":"muted","size":12},{"t":"line","p":[610.0,84,610.0,90],"c":"ax","w":1.2},{"t":"text","p":[610.0,106],"s":"14","c":"muted","size":12},{"t":"text","p":[330.0,44],"s":"neutro","c":"ax","size":12},{"t":"text","p":[90.0,44],"s":"acido","c":"force4","size":12},{"t":"text","p":[570.0,44],"s":"basico","c":"force2","size":12},{"t":"line","p":[110.0,84,110.0,118],"c":"muted","w":1,"dash":true},{"t":"circle","p":[110.0,70,3.5],"c":"ax"},{"t":"text","p":[110.0,130],"s":"succo gastrico","c":"ax","size":11},{"t":"line","p":[142.0,84,142.0,140],"c":"muted","w":1,"dash":true},{"t":"circle","p":[142.0,70,3.5],"c":"ax"},{"t":"text","p":[142.0,152],"s":"limone","c":"ax","size":11},{"t":"line","p":[162.0,84,162.0,162],"c":"muted","w":1,"dash":true},{"t":"circle","p":[162.0,70,3.5],"c":"ax"},{"t":"text","p":[162.0,174],"s":"aceto","c":"ax","size":11},{"t":"line","p":[250.0,84,250.0,118],"c":"muted","w":1,"dash":true},{"t":"circle","p":[250.0,70,3.5],"c":"ax"},{"t":"text","p":[250.0,130],"s":"caffè","c":"ax","size":11},{"t":"line","p":[314.0,84,314.0,140],"c":"muted","w":1,"dash":true},{"t":"circle","p":[314.0,70,3.5],"c":"ax"},{"t":"text","p":[314.0,152],"s":"latte","c":"ax","size":11},{"t":"line","p":[346.0,84,346.0,162],"c":"muted","w":1,"dash":true},{"t":"circle","p":[346.0,70,3.5],"c":"ax"},{"t":"text","p":[346.0,174],"s":"sangue","c":"ax","size":11},{"t":"line","p":[374.0,84,374.0,118],"c":"muted","w":1,"dash":true},{"t":"circle","p":[374.0,70,3.5],"c":"ax"},{"t":"text","p":[374.0,130],"s":"mare","c":"ax","size":11},{"t":"line","p":[382.0,84,382.0,140],"c":"muted","w":1,"dash":true},{"t":"circle","p":[382.0,70,3.5],"c":"ax"},{"t":"text","p":[382.0,152],"s":"bicarbonato","c":"ax","size":11},{"t":"line","p":[510.0,84,510.0,118],"c":"muted","w":1,"dash":true},{"t":"circle","p":[510.0,70,3.5],"c":"ax"},{"t":"text","p":[510.0,130],"s":"ammoniaca","c":"ax","size":11},{"t":"line","p":[550.0,84,550.0,140],"c":"muted","w":1,"dash":true},{"t":"circle","p":[550.0,70,3.5],"c":"ax"},{"t":"text","p":[550.0,152],"s":"candeggina","c":"ax","size":11},{"t":"text","p":[330,222],"s":"valori indicativi; ogni unità corrisponde a un fattore 10 in [H₃O⁺]","c":"muted","size":11}]}
---
La scala del pH con alcuni valori indicativi di sostanze comuni. I valori reali variano da un campione all'altro: il succo gastrico, per esempio, va da circa $1$ a circa $3$; il sangue è mantenuto fra $7{,}35$ e $7{,}45$.
:::

::: metodo Passare da concentrazione a pH e viceversa
1. Dalla concentrazione al pH: $\mathrm{pH}=-\log[\mathrm{H_3O^+}]$. Le cifre decimali del pH corrispondono alle cifre significative della concentrazione: $[\mathrm{H_3O^+}]=2{,}5\times10^{-4}\un{M}$ dà $\mathrm{pH}=3{,}60$.
2. Dal pH alla concentrazione: $[\mathrm{H_3O^+}]=10^{-\mathrm{pH}}$. Un pH di $8{,}30$ corrisponde a $[\mathrm{H_3O^+}]=5{,}0\times10^{-9}\un{M}$.
3. Per le basi conviene calcolare prima $[\mathrm{OH^-}]$ e il pOH, poi $\mathrm{pH}=14{,}00-\mathrm{pOH}$.
:::

Il pH si misura in due modi. Gli **indicatori**, sostanze che cambiano colore con il pH, danno una stima rapida, e le cartine indicatrici, imbevute di una miscela di indicatori, la danno con un'approssimazione di circa un'unità. Il **pH-metro** misura la differenza di potenziale fra un elettrodo di vetro, sensibile allo ione ossonio, e un elettrodo di riferimento, e fornisce il pH con due decimali; il suo funzionamento sarà chiarito nel capitolo [Ossidazione, riduzione ed elettrochimica](unit:chemistry-23).

## Acidi forti e basi forti {#forti}

Un **acido forte** cede il protone all'acqua in modo praticamente completo: in soluzione diluita non restano molecole indissociate. Gli acidi forti comuni sono sei: cloridrico $\mathrm{HCl}$, bromidrico $\mathrm{HBr}$, iodidrico $\mathrm{HI}$, nitrico $\mathrm{HNO_3}$, perclorico $\mathrm{HClO_4}$ e solforico $\mathrm{H_2SO_4}$, quest'ultimo soltanto per il primo protone. Le **basi forti** comuni sono gli idrossidi dei metalli alcalini, come $\mathrm{NaOH}$ e $\mathrm{KOH}$, e quelli dei metalli alcalino-terrosi più pesanti, $\mathrm{Ca(OH)_2}$, $\mathrm{Sr(OH)_2}$ e $\mathrm{Ba(OH)_2}$, che si dissociano completamente nella parte che si scioglie.

Per un acido o una base forte il calcolo del pH è diretto: la concentrazione dello ione ossonio, o dello ione idrossido, coincide con quella del soluto, moltiplicata per il numero di ioni che ogni unità libera.

- Acido cloridrico $0{,}025\un{M}$: $[\mathrm{H_3O^+}]=0{,}025\un{M}$ e $\mathrm{pH}=1{,}60$.
- Idrossido di bario $0{,}0050\un{M}$: ogni unità libera due ioni idrossido, $[\mathrm{OH^-}]=0{,}010\un{M}$, $\mathrm{pOH}=2{,}00$ e $\mathrm{pH}=12{,}00$.
- Due grammi di idrossido di sodio in $500\un{mL}$ di soluzione: $0{,}050\un{mol}$ in $0{,}500\un{L}$, cioè $[\mathrm{OH^-}]=0{,}100\un{M}$ e $\mathrm{pH}=13{,}00$.

Il contributo dell'acqua, $10^{-7}\un{M}$, è trascurabile finché la concentrazione dell'acido o della base è molto maggiore. Per soluzioni molto diluite, intorno a $10^{-7}\un{M}$ o meno, bisogna tenerne conto: una soluzione di acido cloridrico $1{,}0\times10^{-8}\un{M}$ ha pH poco inferiore a $7$, e il calcolo che lo mostra è uno degli esercizi del capitolo.

Mescolando un acido forte e una base forte, si neutralizzano nel rapporto stechiometrico, e il pH dipende da quale dei due è in eccesso. Unendo $100\un{mL}$ di acido cloridrico $0{,}050\un{M}$ e $100\un{mL}$ di idrossido di sodio $0{,}040\un{M}$, $4{,}0\un{mmol}$ di ioni idrossido neutralizzano altrettanti ioni ossonio, e restano $1{,}0\un{mmol}$ di ione ossonio in $200\un{mL}$: $[\mathrm{H_3O^+}]=5{,}0\times10^{-3}\un{M}$, $\mathrm{pH}=2{,}30$.

## Acidi deboli e costante di acidità {#deboli}

La maggior parte degli acidi è **debole**: in acqua cede il protone soltanto in parte, e si stabilisce un equilibrio fra l'acido indissociato e i suoi ioni,

$$\mathrm{HA(aq)}+\mathrm{H_2O(l)}\rightleftharpoons\mathrm{H_3O^+(aq)}+\mathrm{A^-(aq)}.$$

::: definizione Costante di acidità
$$K_\mathrm a=\frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]},\qquad\mathrm pK_\mathrm a=-\log K_\mathrm a.$$
Più grande è $K_\mathrm a$, cioè più piccolo è $\mathrm pK_\mathrm a$, più l'acido è forte.
:::

| acido | $K_\mathrm a$ | $\mathrm pK_\mathrm a$ |
|---|---|---|
| fluoridrico, $\mathrm{HF}$ | $6{,}6\times10^{-4}$ | $3{,}18$ |
| formico, $\mathrm{HCOOH}$ | $1{,}8\times10^{-4}$ | $3{,}74$ |
| acetico, $\mathrm{CH_3COOH}$ | $1{,}8\times10^{-5}$ | $4{,}74$ |
| ipocloroso, $\mathrm{HOCl}$ | $2{,}9\times10^{-8}$ | $7{,}54$ |
| cianidrico, $\mathrm{HCN}$ | $6{,}2\times10^{-10}$ | $9{,}21$ |

I valori, a $25\,^\circ\mathrm C$, coprono molti ordini di grandezza. L'acido acetico, che dà all'aceto il suo sapore, è un acido debole tipico; l'acido cianidrico è così debole che la sua soluzione è quasi neutra.

::: esempio Il pH di una soluzione di acido acetico
Calcolare il pH e la frazione ionizzata di una soluzione di acido acetico $0{,}10\un{M}$, con $K_\mathrm a=1{,}8\times10^{-5}$.

Se $x$ è la concentrazione di acido che si ionizza, all'equilibrio $[\mathrm{H_3O^+}]=[\mathrm{A^-}]=x$ e $[\mathrm{HA}]=0{,}10-x$:
$$\frac{x^2}{0{,}10-x}=1{,}8\times10^{-5}.$$
Poiché la costante è piccola, si suppone $x\ll0{,}10$: allora $x^2\simeq1{,}8\times10^{-6}$ e $x\simeq1{,}34\times10^{-3}\un{M}$. La frazione ionizzata è l'$1{,}3\%$, ben sotto il limite del $5\%$, e l'approssimazione è giustificata; l'equazione di secondo grado dà $x=1{,}33\times10^{-3}\un{M}$. Il pH è $2{,}88$.
:::

La frazione ionizzata di un acido debole cresce con la diluizione. Con $[\mathrm{HA}]$ al denominatore e due concentrazioni al numeratore, diluendo il quoziente diminuisce e l'equilibrio si sposta verso gli ioni, come prevede il principio di Le Chatelier. Per l'acido acetico la frazione ionizzata passa dall'$1{,}3\%$ a $0{,}10\un{M}$ al $4{,}2\%$ a $0{,}010\un{M}$ e al $12{,}5\%$ a $0{,}0010\un{M}$; in queste soluzioni più diluite l'approssimazione $x\ll c$ comincia a non valere, e conviene risolvere l'equazione di secondo grado.

::: figura ionizzazione
{"w":680,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[215,""],"sx":130,"sy":4.6,"xt":[[0.2,"10⁻⁴"],[1.2,"10⁻³"],[2.2,"10⁻²"],[3.2,"10⁻¹"],[4.2,"10⁰"]],"yt":[[10,"10"],[20,"20"],[30,"30"],[40,"40"]]},{"t":"text","p":[40,28],"s":"acido ionizzato (%)","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"concentrazione analitica (mol/L)","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":130,"sy":4.6,"pts":[[0.0,41.0195081],[0.02,40.3220914],[0.04,39.6315642],[0.06,38.9480706],[0.08,38.2717442],[0.1,37.6027081],[0.12,36.9410753],[0.14,36.286949],[0.16,35.6404226],[0.18,35.0015802],[0.2,34.3704969],[0.22,33.7472388],[0.24,33.1318635],[0.26,32.5244203],[0.28,31.9249507],[0.3,31.3334882],[0.32,30.7500592],[0.34,30.1746827],[0.36,29.607371],[0.38,29.0481298],[0.4,28.4969585],[0.42,27.9538506],[0.44,27.4187937],[0.46,26.89177],[0.48,26.3727564],[0.5,25.8617251],[0.52,25.3586433],[0.54,24.8634739],[0.56,24.3761756],[0.58,23.8967031],[0.6,23.4250073],[0.62,22.9610355],[0.64,22.504732],[0.66,22.0560376],[0.68,21.6148904],[0.7,21.1812258],[0.72,20.7549767],[0.74,20.3360737],[0.76,19.9244449],[0.78,19.520017],[0.8,19.1227143],[0.82,18.7324598],[0.84,18.3491749],[0.86,17.9727797],[0.88,17.6031928],[0.9,17.2403319],[0.92,16.8841139],[0.94,16.5344545],[0.96,16.1912689],[0.98,15.8544716],[1.0,15.5239767],[1.02,15.1996978],[1.04,14.881548],[1.06,14.5694406],[1.08,14.2632884],[1.1,13.9630043],[1.12,13.6685011],[1.14,13.379692],[1.16,13.0964899],[1.18,12.8188083],[1.2,12.5465609],[1.22,12.2796617],[1.24,12.0180251],[1.26,11.761566],[1.28,11.5101997],[1.3,11.2638423],[1.32,11.0224102],[1.34,10.7858207],[1.36,10.5539914],[1.38,10.3268409],[1.4,10.1042885],[1.42,9.8862542],[1.44,9.6726587],[1.46,9.4634237],[1.48,9.2584716],[1.5,9.0577256],[1.52,8.8611098],[1.54,8.6685494],[1.56,8.4799703],[1.58,8.2952991],[1.6,8.1144638],[1.62,7.9373931],[1.64,7.7640164],[1.66,7.5942645],[1.68,7.4280687],[1.7,7.2653618],[1.72,7.1060769],[1.74,6.9501487],[1.76,6.7975123],[1.78,6.6481043],[1.8,6.5018618],[1.82,6.3587231],[1.84,6.2186275],[1.86,6.0815151],[1.88,5.9473271],[1.9,5.8160055],[1.92,5.6874933],[1.94,5.5617345],[1.96,5.438674],[1.98,5.3182576],[2.0,5.2004321],[2.02,5.0851451],[2.04,4.9723451],[2.06,4.8619815],[2.08,4.7540048],[2.1,4.6483661],[2.12,4.5450174],[2.14,4.4439118],[2.16,4.345003],[2.18,4.2482457],[2.2,4.1535952],[2.22,4.0610078],[2.24,3.9704408],[2.26,3.8818518],[2.28,3.7951996],[2.3,3.7104437],[2.32,3.6275442],[2.34,3.5464622],[2.36,3.4671593],[2.38,3.389598],[2.4,3.3137415],[2.42,3.2395537],[2.44,3.1669992],[2.46,3.0960432],[2.48,3.0266517],[2.5,2.9587914],[2.52,2.8924296],[2.54,2.8275342],[2.56,2.7640738],[2.58,2.7020176],[2.6,2.6413354],[2.62,2.5819978],[2.64,2.5239756],[2.66,2.4672406],[2.68,2.411765],[2.7,2.3575214],[2.72,2.3044833],[2.74,2.2526245],[2.76,2.2019194],[2.78,2.1523429],[2.8,2.1038705],[2.82,2.0564782],[2.84,2.0101424],[2.86,1.96484],[2.88,1.9205484],[2.9,1.8772457],[2.92,1.8349101],[2.94,1.7935204],[2.96,1.753056],[2.98,1.7134964],[3.0,1.6748219],[3.02,1.6370129],[3.04,1.6000505],[3.06,1.563916],[3.08,1.5285911],[3.1,1.494058],[3.12,1.4602993],[3.14,1.4272978],[3.16,1.3950367],[3.18,1.3634998],[3.2,1.332671],[3.22,1.3025346],[3.24,1.2730752],[3.26,1.2442779],[3.28,1.216128],[3.3,1.188611],[3.32,1.161713],[3.34,1.1354202],[3.36,1.1097191],[3.38,1.0845965],[3.4,1.0600397],[3.42,1.0360359],[3.44,1.0125728],[3.46,0.9896385],[3.48,0.967221],[3.5,0.945309],[3.52,0.923891],[3.54,0.902956],[3.56,0.8824933],[3.58,0.8624923],[3.6,0.8429427],[3.62,0.8238344],[3.64,0.8051574],[3.66,0.7869022],[3.68,0.7690593],[3.7,0.7516194],[3.72,0.7345735],[3.74,0.7179128],[3.76,0.7016287],[3.78,0.6857126],[3.8,0.6701563],[3.82,0.6549518],[3.84,0.6400912],[3.86,0.6255666],[3.88,0.6113707],[3.9,0.5974959],[3.92,0.583935],[3.94,0.5706811],[3.96,0.5577271],[3.98,0.5450664],[4.0,0.5326923],[4.02,0.5205984],[4.04,0.5087784],[4.06,0.497226],[4.08,0.4859353],[4.1,0.4749004],[4.12,0.4641155],[4.14,0.453575],[4.16,0.4432733],[4.18,0.4332051],[4.2,0.423365]],"c":"force2","w":2.6},{"t":"circle","p":[236.0,192.3,4.5],"c":"force4"},{"t":"text","p":[244.0,184.3],"s":"12,5 %","c":"ax","size":11,"a":"start"},{"t":"circle","p":[366.0,230.9,4.5],"c":"force4"},{"t":"text","p":[374.0,222.9],"s":"4,2 %","c":"ax","size":11,"a":"start"},{"t":"circle","p":[496.0,243.9,4.5],"c":"force4"},{"t":"text","p":[504.0,235.9],"s":"1,3 %","c":"ax","size":11,"a":"start"}]}
---
Percentuale di acido acetico ionizzato in funzione della concentrazione analitica, su scala logaritmica, a $25\,^\circ\mathrm C$. Diluendo, la frazione ionizzata cresce; il pH cresce comunque, perché la concentrazione totale diminuisce più in fretta.
:::

## Basi deboli {#basi-deboli}

Una **base debole** accetta un protone dall'acqua soltanto in parte. Per l'ammoniaca e per le ammine, i suoi derivati organici,

$$\mathrm{B(aq)}+\mathrm{H_2O(l)}\rightleftharpoons\mathrm{BH^+(aq)}+\mathrm{OH^-(aq)},\qquad K_\mathrm b=\frac{[\mathrm{BH^+}][\mathrm{OH^-}]}{[\mathrm B]}.$$

L'ammoniaca ha $K_\mathrm b=1{,}8\times10^{-5}$, la metilammina $\mathrm{CH_3NH_2}$ $4{,}2\times10^{-4}$, la piridina $1{,}5\times10^{-9}$. Il calcolo procede come per gli acidi deboli, con lo ione idrossido al posto dello ione ossonio. Una soluzione di ammoniaca $0{,}10\un{M}$ ha, per la coincidenza numerica con l'acido acetico, $[\mathrm{OH^-}]=1{,}33\times10^{-3}\un{M}$, $\mathrm{pOH}=2{,}88$ e $\mathrm{pH}=11{,}12$. Molte molecole di interesse biologico e farmacologico, come la caffeina, la nicotina e la morfina, contengono atomi di azoto con una coppia elettronica libera, e sono basi deboli.

## Coppie coniugate e forza relativa {#coniugate}

Per una coppia coniugata, la costante di acidità dell'acido e la costante di basicità della base non sono indipendenti. Per l'acido acetico e lo ione acetato,

$$K_\mathrm a=\frac{[\mathrm{H_3O^+}][\mathrm{CH_3COO^-}]}{[\mathrm{CH_3COOH}]},\qquad K_\mathrm b=\frac{[\mathrm{CH_3COOH}][\mathrm{OH^-}]}{[\mathrm{CH_3COO^-}]},$$

e il prodotto delle due espressioni si semplifica nel prodotto ionico dell'acqua.

::: legge Costanti di una coppia coniugata
Per un acido e la sua base coniugata,
$$K_\mathrm aK_\mathrm b=K_\mathrm w,\qquad\mathrm pK_\mathrm a+\mathrm pK_\mathrm b=14{,}00\quad\text{a }25\,^\circ\mathrm C.$$
:::

La relazione esprime in numeri un'idea intuitiva: quanto più un acido cede volentieri il protone, tanto meno la sua base coniugata tende a riprenderlo. La base coniugata di un acido forte, come lo ione cloruro, è così debole che in acqua non ha alcun comportamento basico misurabile. La base coniugata di un acido debole è una base debole: lo ione acetato ha $K_\mathrm b=K_\mathrm w/K_\mathrm a$, cioè $5{,}6\times10^{-10}$; lo ione cianuro, coniugato di un acido molto più debole, ha $K_\mathrm b=1{,}6\times10^{-5}$, paragonabile a quella dell'ammoniaca. Allo stesso modo lo ione ammonio, acido coniugato dell'ammoniaca, ha $K_\mathrm a=5{,}6\times10^{-10}$.

Le reazioni acido-base procedono di preferenza nel verso che forma l'acido più debole e la base più debole. Lo ione acetato reagisce con lo ione ossonio, un acido forte, per dare acido acetico, un acido debole; per lo stesso motivo un acido forte libera l'acido debole dai suoi sali, e l'aceto versato sul bicarbonato libera acido carbonico, che si decompone in acqua e anidride carbonica.

## Acidi poliprotici {#poliprotici}

Alcuni acidi possono cedere più di un protone: si dicono **poliprotici**. L'acido carbonico ne cede due, l'acido fosforico tre. I protoni si staccano uno alla volta, e ogni passaggio ha la propria costante. Per l'acido fosforico, a $25\,^\circ\mathrm C$,

$$\begin{aligned}
\mathrm{H_3PO_4}+\mathrm{H_2O}&\rightleftharpoons\mathrm{H_3O^+}+\mathrm{H_2PO_4^-},&K_{\mathrm a1}&=7{,}1\times10^{-3},\\
\mathrm{H_2PO_4^-}+\mathrm{H_2O}&\rightleftharpoons\mathrm{H_3O^+}+\mathrm{HPO_4^{2-}},&K_{\mathrm a2}&=6{,}3\times10^{-8},\\
\mathrm{HPO_4^{2-}}+\mathrm{H_2O}&\rightleftharpoons\mathrm{H_3O^+}+\mathrm{PO_4^{3-}},&K_{\mathrm a3}&=4{,}2\times10^{-13}.
\end{aligned}$$

Le costanti successive diminuiscono di molti ordini di grandezza, perché staccare un protone da uno ione negativo è più difficile che staccarlo da una molecola neutra, e diventa ancora più difficile quando la carica negativa cresce. Ne seguono due regole pratiche per le soluzioni di un acido poliprotico: lo ione ossonio proviene quasi tutto dalla prima ionizzazione, e la concentrazione dell'anione formato nel secondo passaggio è circa uguale a $K_{\mathrm a2}$.

::: esempio L'acido fosforico
In una soluzione di acido fosforico $0{,}10\un{M}$ la prima ionizzazione, con $x^2/(0{,}10-x)=7{,}1\times10^{-3}$, dà $x=0{,}023\un{M}$: l'approssimazione $x\ll0{,}10$ non vale, e serve l'equazione di secondo grado. Il pH è $1{,}63$. Nel secondo passaggio $[\mathrm{H_3O^+}]$ e $[\mathrm{H_2PO_4^-}]$ sono quasi uguali e si semplificano, e $[\mathrm{HPO_4^{2-}}]\simeq K_{\mathrm a2}=6{,}3\times10^{-8}\un{M}$. Lo ione fosfato, dal terzo passaggio, è presente in tracce, circa $10^{-18}\un{M}$.
:::

La figura mostra quale forma prevale a ogni pH. Ogni specie domina in un intervallo di circa quattro o cinque unità, e due forme successive sono in quantità uguali quando il pH coincide con il $\mathrm pK_\mathrm a$ del passaggio che le collega. Al pH del sangue, $7{,}4$, i fosfati sono presenti come $\mathrm{H_2PO_4^-}$ e $\mathrm{HPO_4^{2-}}$, nel rapporto di circa $2:3$; il capitolo [Soluzioni tampone](unit:chemistry-22) mostrerà perché questa coppia è utile alle cellule.

::: figura fosforico
{"w":680,"h":306,"items":[{"t":"axes","o":[80,250],"x":[560,""],"y":[215,""],"sx":40,"sy":200,"xt":[[2,"2"],[4,"4"],[6,"6"],[8,"8"],[10,"10"],[12,"12"],[14,"14"]],"yt":[[0.25,"0,25"],[0.5,"0,50"],[0.75,"0,75"],[1.0,"1,00"]]},{"t":"text","p":[40,20],"s":"frazione","c":"ax","size":12,"a":"start"},{"t":"text","p":[630,292],"s":"pH","c":"ax","size":13,"a":"end"},{"t":"plot","o":[80,250],"sx":40,"sy":200,"pts":[[0.0,0.9929501],[0.05,0.9920966],[0.1,0.9911408],[0.15,0.9900706],[0.2,0.9888725],[0.25,0.9875316],[0.3,0.9860315],[0.35,0.9843538],[0.4,0.9824781],[0.45,0.980382],[0.5,0.9780409],[0.55,0.9754273],[0.6,0.9725114],[0.65,0.9692604],[0.7,0.9656384],[0.75,0.9616067],[0.8,0.9571228],[0.85,0.9521414],[0.9,0.9466135],[0.95,0.9404871],[1.0,0.9337068],[1.05,0.9262146],[1.1,0.9179502],[1.15,0.9088511],[1.2,0.8988542],[1.25,0.887896],[1.3,0.8759146],[1.35,0.8628504],[1.4,0.8486485],[1.45,0.83326],[1.5,0.8166451],[1.55,0.7987743],[1.6,0.7796318],[1.65,0.7592171],[1.7,0.7375479],[1.75,0.7146615],[1.8,0.6906166],[1.85,0.6654937],[1.9,0.6393961],[1.95,0.612448],[2.0,0.5847938],[2.05,0.5565949],[2.1,0.5280266],[2.15,0.4992734],[2.2,0.470525],[2.25,0.4419709],[2.3,0.4137953],[2.35,0.3861728],[2.4,0.3592641],[2.45,0.3332126],[2.5,0.3081415],[2.55,0.284153],[2.6,0.2613264],[2.65,0.2397195],[2.7,0.2193684],[2.75,0.2002898],[2.8,0.1824826],[2.85,0.16593],[2.9,0.1506021],[2.95,0.1364585],[3.0,0.12345],[3.05,0.1115213],[3.1,0.1006129],[3.15,0.0906626],[3.2,0.0816069],[3.25,0.0733827],[3.3,0.0659276],[3.35,0.0591815],[3.4,0.0530864],[3.45,0.0475872],[3.5,0.0426318],[3.55,0.0381718],[3.6,0.0341615],[3.65,0.0305591],[3.7,0.0273257],[3.75,0.0244258],[3.8,0.0218265],[3.85,0.0194983],[3.9,0.0174139],[3.95,0.0155486],[4.0,0.0138803],[4.05,0.0123886],[4.1,0.0110553],[4.15,0.0098639],[4.2,0.0087997],[4.25,0.0078493],[4.3,0.0070008],[4.35,0.0062432],[4.4,0.0055671],[4.45,0.0049638],[4.5,0.0044254],[4.55,0.0039451],[4.6,0.0035166],[4.65,0.0031344],[4.7,0.0027936],[4.75,0.0024896],[4.8,0.0022185],[4.85,0.0019767],[4.9,0.0017612],[4.95,0.001569],[5.0,0.0013977],[5.05,0.0012449],[5.1,0.0011087],[5.15,0.0009873],[5.2,0.0008791],[5.25,0.0007826],[5.3,0.0006966],[5.35,0.00062],[5.4,0.0005517],[5.45,0.0004908],[5.5,0.0004365],[5.55,0.0003881],[5.6,0.000345],[5.65,0.0003066],[5.7,0.0002723],[5.75,0.0002418],[5.8,0.0002146],[5.85,0.0001904],[5.9,0.0001688],[5.95,0.0001496],[6.0,0.0001325],[6.05,0.0001172],[6.1,0.0001036],[6.15,9.16e-05],[6.2,8.08e-05],[6.25,7.12e-05],[6.3,6.27e-05],[6.35,5.51e-05],[6.4,4.84e-05],[6.45,4.24e-05],[6.5,3.71e-05],[6.55,3.24e-05],[6.6,2.83e-05],[6.65,2.46e-05],[6.7,2.14e-05],[6.75,1.85e-05],[6.8,1.6e-05],[6.85,1.38e-05],[6.9,1.18e-05],[6.95,1.01e-05],[7.0,8.6e-06],[7.05,7.4e-06],[7.1,6.2e-06],[7.15,5.3e-06],[7.2,4.4e-06],[7.25,3.7e-06],[7.3,3.1e-06],[7.35,2.6e-06],[7.4,2.2e-06],[7.45,1.8e-06],[7.5,1.5e-06],[7.55,1.2e-06],[7.6,1e-06],[7.65,8e-07],[7.7,7e-07],[7.75,6e-07],[7.8,4e-07],[7.85,4e-07],[7.9,3e-07],[7.95,2e-07],[8.0,2e-07],[8.05,2e-07],[8.1,1e-07],[8.15,1e-07],[8.2,1e-07],[8.25,1e-07],[8.3,1e-07],[8.35,0.0],[8.4,0.0],[8.45,0.0],[8.5,0.0],[8.55,0.0],[8.6,0.0],[8.65,0.0],[8.7,0.0],[8.75,0.0],[8.8,0.0],[8.85,0.0],[8.9,0.0],[8.95,0.0],[9.0,0.0],[9.05,0.0],[9.1,0.0],[9.15,0.0],[9.2,0.0],[9.25,0.0],[9.3,0.0],[9.35,0.0],[9.4,0.0],[9.45,0.0],[9.5,0.0],[9.55,0.0],[9.6,0.0],[9.65,0.0],[9.7,0.0],[9.75,0.0],[9.8,0.0],[9.85,0.0],[9.9,0.0],[9.95,0.0],[10.0,0.0],[10.05,0.0],[10.1,0.0],[10.15,0.0],[10.2,0.0],[10.25,0.0],[10.3,0.0],[10.35,0.0],[10.4,0.0],[10.45,0.0],[10.5,0.0],[10.55,0.0],[10.6,0.0],[10.65,0.0],[10.7,0.0],[10.75,0.0],[10.8,0.0],[10.85,0.0],[10.9,0.0],[10.95,0.0],[11.0,0.0],[11.05,0.0],[11.1,0.0],[11.15,0.0],[11.2,0.0],[11.25,0.0],[11.3,0.0],[11.35,0.0],[11.4,0.0],[11.45,0.0],[11.5,0.0],[11.55,0.0],[11.6,0.0],[11.65,0.0],[11.7,0.0],[11.75,0.0],[11.8,0.0],[11.85,0.0],[11.9,0.0],[11.95,0.0],[12.0,0.0],[12.05,0.0],[12.1,0.0],[12.15,0.0],[12.2,0.0],[12.25,0.0],[12.3,0.0],[12.35,0.0],[12.4,0.0],[12.45,0.0],[12.5,0.0],[12.55,0.0],[12.6,0.0],[12.65,0.0],[12.7,0.0],[12.75,0.0],[12.8,0.0],[12.85,0.0],[12.9,0.0],[12.95,0.0],[13.0,0.0],[13.05,0.0],[13.1,0.0],[13.15,0.0],[13.2,0.0],[13.25,0.0],[13.3,0.0],[13.35,0.0],[13.4,0.0],[13.45,0.0],[13.5,0.0],[13.55,0.0],[13.6,0.0],[13.65,0.0],[13.7,0.0],[13.75,0.0],[13.8,0.0],[13.85,0.0],[13.9,0.0],[13.95,0.0],[14.0,0.0]],"c":"force4","w":2.4},{"t":"plot","o":[80,250],"sx":40,"sy":200,"pts":[[0.0,0.0070499],[0.05,0.0079034],[0.1,0.0088592],[0.15,0.0099294],[0.2,0.0111275],[0.25,0.0124684],[0.3,0.0139685],[0.35,0.0156462],[0.4,0.0175219],[0.45,0.019618],[0.5,0.0219591],[0.55,0.0245727],[0.6,0.0274886],[0.65,0.0307396],[0.7,0.0343616],[0.75,0.0383933],[0.8,0.0428772],[0.85,0.0478586],[0.9,0.0533865],[0.95,0.0595129],[1.0,0.0662932],[1.05,0.0737853],[1.1,0.0820498],[1.15,0.0911488],[1.2,0.1011457],[1.25,0.1121038],[1.3,0.1240852],[1.35,0.1371494],[1.4,0.1513513],[1.45,0.1667397],[1.5,0.1833546],[1.55,0.2012252],[1.6,0.2203677],[1.65,0.2407822],[1.7,0.2624512],[1.75,0.2853374],[1.8,0.3093822],[1.85,0.3345048],[1.9,0.3606021],[1.95,0.3875498],[2.0,0.4152036],[2.05,0.4434019],[2.1,0.4719697],[2.15,0.5007221],[2.2,0.5294697],[2.25,0.5580229],[2.3,0.5861974],[2.35,0.6138186],[2.4,0.6407258],[2.45,0.6667756],[2.5,0.6918447],[2.55,0.715831],[2.6,0.7386551],[2.65,0.7602591],[2.7,0.780607],[2.75,0.7996818],[2.8,0.8174849],[2.85,0.8340328],[2.9,0.8493554],[2.95,0.863493],[3.0,0.8764948],[3.05,0.8884159],[3.1,0.8993157],[3.15,0.9092565],[3.2,0.9183014],[3.25,0.9265135],[3.3,0.933955],[3.35,0.9406858],[3.4,0.9467638],[3.45,0.9522438],[3.5,0.9571775],[3.55,0.9616133],[3.6,0.9655963],[3.65,0.9691681],[3.7,0.9723672],[3.75,0.9752287],[3.8,0.9777848],[3.85,0.9800646],[3.9,0.9820947],[3.95,0.9838989],[4.0,0.9854989],[4.05,0.9869138],[4.1,0.988161],[4.15,0.9892557],[4.2,0.9902116],[4.25,0.9910404],[4.3,0.9917526],[4.35,0.9923572],[4.4,0.9928617],[4.45,0.9932726],[4.5,0.9935951],[4.55,0.9938334],[4.6,0.9939904],[4.65,0.9940682],[4.7,0.9940677],[4.75,0.993989],[4.8,0.993831],[4.85,0.9935918],[4.9,0.9932682],[4.95,0.9928562],[5.0,0.9923505],[5.05,0.9917447],[5.1,0.9910312],[5.15,0.9902009],[5.2,0.9892435],[5.25,0.988147],[5.3,0.9868979],[5.35,0.9854808],[5.4,0.9838786],[5.45,0.9820717],[5.5,0.9800388],[5.55,0.9777559],[5.6,0.9751963],[5.65,0.972331],[5.7,0.9691276],[5.75,0.9655511],[5.8,0.9615629],[5.85,0.9571214],[5.9,0.9521814],[5.95,0.9466946],[6.0,0.9406091],[6.05,0.9338701],[6.1,0.9264198],[6.15,0.9181981],[6.2,0.9091428],[6.25,0.8991909],[6.3,0.8882792],[6.35,0.8763455],[6.4,0.8633304],[6.45,0.8491788],[6.5,0.8338418],[6.55,0.8172789],[6.6,0.7994606],[6.65,0.7803704],[6.7,0.7600074],[6.75,0.7383883],[6.8,0.7155499],[6.85,0.69155],[6.9,0.6664684],[6.95,0.6404074],[7.0,0.6134906],[7.05,0.5858617],[7.1,0.5576814],[7.15,0.5291246],[7.2,0.5003757],[7.25,0.4716242],[7.3,0.4430596],[7.35,0.4148665],[7.4,0.3872201],[7.45,0.3602815],[7.5,0.3341949],[7.55,0.3090845],[7.6,0.2850529],[7.65,0.2621807],[7.7,0.2405263],[7.75,0.2201268],[7.8,0.2009994],[7.85,0.1831437],[7.9,0.1665435],[7.95,0.1511695],[8.0,0.1369813],[8.05,0.1239303],[8.1,0.1119614],[8.15,0.101015],[8.2,0.0910291],[8.25,0.0819404],[8.3,0.0736854],[8.35,0.0662021],[8.4,0.0594299],[8.45,0.0533108],[8.5,0.0477897],[8.55,0.0428145],[8.6,0.0383363],[8.65,0.0343096],[8.7,0.0306923],[8.75,0.0274455],[8.8,0.0245333],[8.85,0.0219232],[8.9,0.019585],[8.95,0.0174917],[9.0,0.0156185],[9.05,0.013943],[9.1,0.0124449],[9.15,0.0111058],[9.2,0.0099094],[9.25,0.0088405],[9.3,0.007886],[9.35,0.0070337],[9.4,0.0062729],[9.45,0.0055938],[9.5,0.0049878],[9.55,0.0044471],[9.6,0.0039647],[9.65,0.0035343],[9.7,0.0031505],[9.75,0.0028081],[9.8,0.0025028],[9.85,0.0022305],[9.9,0.0019877],[9.95,0.0017712],[10.0,0.0015782],[10.05,0.0014061],[10.1,0.0012526],[10.15,0.0011158],[10.2,0.0009939],[10.25,0.0008852],[10.3,0.0007883],[10.35,0.0007019],[10.4,0.0006249],[10.45,0.0005563],[10.5,0.0004951],[10.55,0.0004406],[10.6,0.000392],[10.65,0.0003487],[10.7,0.0003101],[10.75,0.0002757],[10.8,0.000245],[10.85,0.0002177],[10.9,0.0001933],[10.95,0.0001716],[11.0,0.0001523],[11.05,0.0001351],[11.1,0.0001197],[11.15,0.0001061],[11.2,9.39e-05],[11.25,8.31e-05],[11.3,7.34e-05],[11.35,6.48e-05],[11.4,5.72e-05],[11.45,5.04e-05],[11.5,4.43e-05],[11.55,3.89e-05],[11.6,3.42e-05],[11.65,2.99e-05],[11.7,2.62e-05],[11.75,2.28e-05],[11.8,1.99e-05],[11.85,1.73e-05],[11.9,1.5e-05],[11.95,1.3e-05],[12.0,1.12e-05],[12.05,9.6e-06],[12.1,8.2e-06],[12.15,7.1e-06],[12.2,6e-06],[12.25,5.1e-06],[12.3,4.3e-06],[12.35,3.7e-06],[12.4,3.1e-06],[12.45,2.6e-06],[12.5,2.2e-06],[12.55,1.8e-06],[12.6,1.5e-06],[12.65,1.2e-06],[12.7,1e-06],[12.75,8e-07],[12.8,7e-07],[12.85,6e-07],[12.9,5e-07],[12.95,4e-07],[13.0,3e-07],[13.05,2e-07],[13.1,2e-07],[13.15,2e-07],[13.2,1e-07],[13.25,1e-07],[13.3,1e-07],[13.35,1e-07],[13.4,1e-07],[13.45,0.0],[13.5,0.0],[13.55,0.0],[13.6,0.0],[13.65,0.0],[13.7,0.0],[13.75,0.0],[13.8,0.0],[13.85,0.0],[13.9,0.0],[13.95,0.0],[14.0,0.0]],"c":"force","w":2.4},{"t":"plot","o":[80,250],"sx":40,"sy":200,"pts":[[0.0,0.0],[0.05,0.0],[0.1,0.0],[0.15,0.0],[0.2,0.0],[0.25,0.0],[0.3,0.0],[0.35,0.0],[0.4,0.0],[0.45,0.0],[0.5,0.0],[0.55,0.0],[0.6,0.0],[0.65,0.0],[0.7,0.0],[0.75,0.0],[0.8,0.0],[0.85,0.0],[0.9,0.0],[0.95,0.0],[1.0,0.0],[1.05,1e-07],[1.1,1e-07],[1.15,1e-07],[1.2,1e-07],[1.25,1e-07],[1.3,2e-07],[1.35,2e-07],[1.4,2e-07],[1.45,3e-07],[1.5,4e-07],[1.55,4e-07],[1.6,6e-07],[1.65,7e-07],[1.7,8e-07],[1.75,1e-06],[1.8,1.2e-06],[1.85,1.5e-06],[1.9,1.8e-06],[1.95,2.2e-06],[2.0,2.6e-06],[2.05,3.1e-06],[2.1,3.7e-06],[2.15,4.5e-06],[2.2,5.3e-06],[2.25,6.3e-06],[2.3,7.4e-06],[2.35,8.7e-06],[2.4,1.01e-05],[2.45,1.18e-05],[2.5,1.38e-05],[2.55,1.6e-05],[2.6,1.85e-05],[2.65,2.14e-05],[2.7,2.46e-05],[2.75,2.83e-05],[2.8,3.25e-05],[2.85,3.72e-05],[2.9,4.25e-05],[2.95,4.85e-05],[3.0,5.52e-05],[3.05,6.28e-05],[3.1,7.13e-05],[3.15,8.09e-05],[3.2,9.17e-05],[3.25,0.0001038],[3.3,0.0001174],[3.35,0.0001327],[3.4,0.0001498],[3.45,0.0001691],[3.5,0.0001907],[3.55,0.000215],[3.6,0.0002422],[3.65,0.0002727],[3.7,0.000307],[3.75,0.0003455],[3.8,0.0003887],[3.85,0.0004371],[3.9,0.0004915],[3.95,0.0005524],[4.0,0.0006209],[4.05,0.0006976],[4.1,0.0007837],[4.15,0.0008803],[4.2,0.0009887],[4.25,0.0011103],[4.3,0.0012466],[4.35,0.0013996],[4.4,0.0015712],[4.45,0.0017636],[4.5,0.0019795],[4.55,0.0022215],[4.6,0.002493],[4.65,0.0027974],[4.7,0.0031387],[4.75,0.0035215],[4.8,0.0039505],[4.85,0.0044315],[4.9,0.0049706],[4.95,0.0055748],[5.0,0.0062518],[5.05,0.0070104],[5.1,0.0078601],[5.15,0.0088118],[5.2,0.0098774],[5.25,0.0110704],[5.3,0.0124055],[5.35,0.0138992],[5.4,0.0155698],[5.45,0.0174375],[5.5,0.0195247],[5.55,0.021856],[5.6,0.0244587],[5.65,0.0273624],[5.7,0.0306],[5.75,0.0342071],[5.8,0.0382224],[5.85,0.0426882],[5.9,0.0476497],[5.95,0.0531558],[6.0,0.0592584],[6.05,0.0660126],[6.1,0.0734765],[6.15,0.0817103],[6.2,0.0907763],[6.25,0.1007378],[6.3,0.111658],[6.35,0.1235993],[6.4,0.136621],[6.45,0.1507786],[6.5,0.1661209],[6.55,0.1826884],[6.6,0.2005107],[6.65,0.2196046],[6.7,0.2399708],[6.75,0.2615926],[6.8,0.2844333],[6.85,0.3084353],[6.9,0.3335187],[6.95,0.3595811],[7.0,0.3864991],[7.05,0.414129],[7.1,0.44231],[7.15,0.4708673],[7.2,0.4996165],[7.25,0.5283681],[7.3,0.5569326],[7.35,0.5851254],[7.4,0.6127713],[7.45,0.6397091],[7.5,0.6657948],[7.55,0.690904],[7.6,0.7149341],[7.65,0.7378046],[7.7,0.759457],[7.75,0.7798542],[7.8,0.798979],[7.85,0.8168316],[7.9,0.8334284],[7.95,0.8487985],[8.0,0.8629823],[8.05,0.8760282],[8.1,0.8879915],[8.15,0.8989315],[8.2,0.9089103],[8.25,0.917991],[8.3,0.9262369],[8.35,0.9337101],[8.4,0.9404709],[8.45,0.9465771],[8.5,0.9520838],[8.55,0.9570429],[8.6,0.9615029],[8.65,0.9655092],[8.7,0.9691037],[8.75,0.9723249],[8.8,0.9752082],[8.85,0.9777861],[8.9,0.980088],[8.95,0.9821406],[9.0,0.9839682],[9.05,0.9855925],[9.1,0.9870332],[9.15,0.9883078],[9.2,0.989432],[9.25,0.9904197],[9.3,0.9912833],[9.35,0.9920335],[9.4,0.9926798],[9.45,0.9932305],[9.5,0.9936924],[9.55,0.9940715],[9.6,0.9943727],[9.65,0.9945997],[9.7,0.9947556],[9.75,0.9948422],[9.8,0.9948608],[9.85,0.9948116],[9.9,0.9946938],[9.95,0.9945061],[10.0,0.994246],[10.05,0.9939102],[10.1,0.9934943],[10.15,0.9929931],[10.2,0.9924001],[10.25,0.991708],[10.3,0.9909078],[10.35,0.9899896],[10.4,0.9889418],[10.45,0.9877515],[10.5,0.9864039],[10.55,0.9848825],[10.6,0.9831689],[10.65,0.9812425],[10.7,0.9790804],[10.75,0.9766573],[10.8,0.9739452],[10.85,0.9709134],[10.9,0.9675282],[10.95,0.9637526],[11.0,0.9595467],[11.05,0.954867],[11.1,0.9496668],[11.15,0.9438958],[11.2,0.9375009],[11.25,0.9304256],[11.3,0.9226109],[11.35,0.9139956],[11.4,0.904517],[11.45,0.8941118],[11.5,0.882717],[11.55,0.8702718],[11.6,0.8567183],[11.65,0.8420041],[11.7,0.8260842],[11.75,0.808923],[11.8,0.7904968],[11.85,0.7707963],[11.9,0.7498288],[11.95,0.7276203],[12.0,0.7042175],[12.05,0.6796886],[12.1,0.6541244],[12.15,0.6276373],[12.2,0.6003608],[12.25,0.5724471],[12.3,0.5440643],[12.35,0.5153922],[12.4,0.4866183],[12.45,0.4579328],[12.5,0.4295234],[12.55,0.4015708],[12.6,0.3742439],[12.65,0.3476961],[12.7,0.3220623],[12.75,0.2974565],[12.8,0.2739708],[12.85,0.2516752],[12.9,0.2306177],[12.95,0.2108257],[13.0,0.1923076],[13.05,0.1750554],[13.1,0.159046],[13.15,0.1442448],[13.2,0.1306071],[13.25,0.1180808],[13.3,0.1066086],[13.35,0.0961295],[13.4,0.0865807],[13.45,0.0778986],[13.5,0.0700203],[13.55,0.0628845],[13.6,0.0564318],[13.65,0.0506055],[13.7,0.0453518],[13.75,0.0406201],[13.8,0.0363634],[13.85,0.0325375],[13.9,0.0291021],[13.95,0.0260196],[14.0,0.0232558]],"c":"force3","w":2.4},{"t":"plot","o":[80,250],"sx":40,"sy":200,"pts":[[0.0,0.0],[0.05,0.0],[0.1,0.0],[0.15,0.0],[0.2,0.0],[0.25,0.0],[0.3,0.0],[0.35,0.0],[0.4,0.0],[0.45,0.0],[0.5,0.0],[0.55,0.0],[0.6,0.0],[0.65,0.0],[0.7,0.0],[0.75,0.0],[0.8,0.0],[0.85,0.0],[0.9,0.0],[0.95,0.0],[1.0,0.0],[1.05,0.0],[1.1,0.0],[1.15,0.0],[1.2,0.0],[1.25,0.0],[1.3,0.0],[1.35,0.0],[1.4,0.0],[1.45,0.0],[1.5,0.0],[1.55,0.0],[1.6,0.0],[1.65,0.0],[1.7,0.0],[1.75,0.0],[1.8,0.0],[1.85,0.0],[1.9,0.0],[1.95,0.0],[2.0,0.0],[2.05,0.0],[2.1,0.0],[2.15,0.0],[2.2,0.0],[2.25,0.0],[2.3,0.0],[2.35,0.0],[2.4,0.0],[2.45,0.0],[2.5,0.0],[2.55,0.0],[2.6,0.0],[2.65,0.0],[2.7,0.0],[2.75,0.0],[2.8,0.0],[2.85,0.0],[2.9,0.0],[2.95,0.0],[3.0,0.0],[3.05,0.0],[3.1,0.0],[3.15,0.0],[3.2,0.0],[3.25,0.0],[3.3,0.0],[3.35,0.0],[3.4,0.0],[3.45,0.0],[3.5,0.0],[3.55,0.0],[3.6,0.0],[3.65,0.0],[3.7,0.0],[3.75,0.0],[3.8,0.0],[3.85,0.0],[3.9,0.0],[3.95,0.0],[4.0,0.0],[4.05,0.0],[4.1,0.0],[4.15,0.0],[4.2,0.0],[4.25,0.0],[4.3,0.0],[4.35,0.0],[4.4,0.0],[4.45,0.0],[4.5,0.0],[4.55,0.0],[4.6,0.0],[4.65,0.0],[4.7,0.0],[4.75,0.0],[4.8,0.0],[4.85,0.0],[4.9,0.0],[4.95,0.0],[5.0,0.0],[5.05,0.0],[5.1,0.0],[5.15,0.0],[5.2,0.0],[5.25,0.0],[5.3,0.0],[5.35,0.0],[5.4,0.0],[5.45,0.0],[5.5,0.0],[5.55,0.0],[5.6,0.0],[5.65,0.0],[5.7,0.0],[5.75,0.0],[5.8,0.0],[5.85,0.0],[5.9,0.0],[5.95,0.0],[6.0,0.0],[6.05,0.0],[6.1,0.0],[6.15,0.0],[6.2,1e-07],[6.25,1e-07],[6.3,1e-07],[6.35,1e-07],[6.4,1e-07],[6.45,2e-07],[6.5,2e-07],[6.55,3e-07],[6.6,3e-07],[6.65,4e-07],[6.7,5e-07],[6.75,6e-07],[6.8,8e-07],[6.85,9e-07],[6.9,1.1e-06],[6.95,1.3e-06],[7.0,1.6e-06],[7.05,2e-06],[7.1,2.3e-06],[7.15,2.8e-06],[7.2,3.3e-06],[7.25,3.9e-06],[7.3,4.7e-06],[7.35,5.5e-06],[7.4,6.5e-06],[7.45,7.6e-06],[7.5,8.8e-06],[7.55,1.03e-05],[7.6,1.2e-05],[7.65,1.38e-05],[7.7,1.6e-05],[7.75,1.84e-05],[7.8,2.12e-05],[7.85,2.43e-05],[7.9,2.78e-05],[7.95,3.18e-05],[8.0,3.62e-05],[8.05,4.13e-05],[8.1,4.7e-05],[8.15,5.33e-05],[8.2,6.05e-05],[8.25,6.86e-05],[8.3,7.76e-05],[8.35,8.78e-05],[8.4,9.92e-05],[8.45,0.000112],[8.5,0.0001265],[8.55,0.0001426],[8.6,0.0001608],[8.65,0.0001811],[8.7,0.000204],[8.75,0.0002296],[8.8,0.0002584],[8.85,0.0002907],[8.9,0.000327],[8.95,0.0003676],[9.0,0.0004133],[9.05,0.0004645],[9.1,0.0005219],[9.15,0.0005863],[9.2,0.0006586],[9.25,0.0007397],[9.3,0.0008307],[9.35,0.0009328],[9.4,0.0010473],[9.45,0.0011757],[9.5,0.0013198],[9.55,0.0014814],[9.6,0.0016626],[9.65,0.0018659],[9.7,0.0020939],[9.75,0.0023497],[9.8,0.0026364],[9.85,0.0029579],[9.9,0.0033185],[9.95,0.0037227],[10.0,0.0041758],[10.05,0.0046838],[10.1,0.0052531],[10.15,0.0058911],[10.2,0.006606],[10.25,0.0074068],[10.3,0.0083039],[10.35,0.0093085],[10.4,0.0104333],[10.45,0.0116922],[10.5,0.013101],[10.55,0.0146769],[10.6,0.0164391],[10.65,0.0184088],[10.7,0.0206095],[10.75,0.023067],[10.8,0.0258098],[10.85,0.0288689],[10.9,0.0322785],[10.95,0.0360757],[11.0,0.040301],[11.05,0.0449979],[11.1,0.0502135],[11.15,0.0559981],[11.2,0.0624052],[11.25,0.0694914],[11.3,0.0773157],[11.35,0.0859396],[11.4,0.0954258],[11.45,0.1058379],[11.5,0.1172386],[11.55,0.1296893],[11.6,0.1432476],[11.65,0.157966],[11.7,0.1738896],[11.75,0.1910542],[11.8,0.2094833],[11.85,0.2291864],[11.9,0.2501563],[11.95,0.2723668],[12.0,0.2957713],[12.05,0.3203017],[12.1,0.3458674],[12.15,0.3723557],[12.2,0.3996332],[12.25,0.4275478],[12.3,0.4559314],[12.35,0.4846041],[12.4,0.5133786],[12.45,0.5420646],[12.5,0.5704744],[12.55,0.5984274],[12.6,0.6257546],[12.65,0.6523026],[12.7,0.6779367],[12.75,0.7025427],[12.8,0.7260285],[12.85,0.7483242],[12.9,0.7693818],[12.95,0.789174],[13.0,0.8076921],[13.05,0.8249444],[13.1,0.8409538],[13.15,0.855755],[13.2,0.8693928],[13.25,0.8819191],[13.3,0.8933913],[13.35,0.9038704],[13.4,0.9134193],[13.45,0.9221014],[13.5,0.9299796],[13.55,0.9371154],[13.6,0.9435682],[13.65,0.9493945],[13.7,0.9546482],[13.75,0.9593799],[13.8,0.9636366],[13.85,0.9674624],[13.9,0.9708979],[13.95,0.9739804],[14.0,0.9767442]],"c":"force2","w":2.4},{"t":"text","p":[104.0,44.0],"s":"H₃PO₄","c":"force4","size":12},{"t":"text","p":[264.0,44.0],"s":"H₂PO₄⁻","c":"force","size":12},{"t":"text","p":[472.0,44.0],"s":"HPO₄²⁻","c":"force3","size":12},{"t":"text","p":[600.0,44.0],"s":"PO₄³⁻","c":"force2","size":12},{"t":"plot","o":[80,250],"sx":40,"sy":200,"pts":[[2.15,0],[2.15,0.5]],"c":"muted","w":1,"dash":true},{"t":"text","p":[171.0,230.0],"s":"pKₐ₁","c":"muted","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":40,"sy":200,"pts":[[7.2,0],[7.2,0.5]],"c":"muted","w":1,"dash":true},{"t":"text","p":[373.0,230.0],"s":"pKₐ₂","c":"muted","size":11,"a":"start"},{"t":"plot","o":[80,250],"sx":40,"sy":200,"pts":[[12.38,0],[12.38,0.5]],"c":"muted","w":1,"dash":true},{"t":"text","p":[580.2,230.0],"s":"pKₐ₃","c":"muted","size":11,"a":"start"}]}
---
Frazioni delle quattro forme dell'acido fosforico in funzione del pH, a $25\,^\circ\mathrm C$. Le linee tratteggiate indicano i tre $\mathrm pK_\mathrm a$, ai quali due forme successive sono presenti in quantità uguali.
:::

::: esempio Il pH della pioggia
Anche la pioggia più pulita è leggermente acida, perché scioglie l'anidride carbonica dell'aria. Con una pressione parziale di $4{,}2\times10^{-4}\un{bar}$ e la costante di Henry di $0{,}034\un{mol/(L\,bar)}$ del capitolo [Equilibrio chimico](unit:chemistry-19), l'acqua in equilibrio con l'aria contiene $1{,}43\times10^{-5}\un{mol/L}$ di anidride carbonica disciolta. Trattando l'anidride carbonica disciolta come acido carbonico, con $K_{\mathrm a1}=4{,}4\times10^{-7}$,
$$[\mathrm{H_3O^+}]\simeq\sqrt{4{,}4\times10^{-7}\times1{,}43\times10^{-5}}=2{,}5\times10^{-6}\un{M},$$
e il pH è $5{,}60$. Le piogge con pH inferiore a questo valore contengono acidi più forti, come l'acido solforico e l'acido nitrico che si formano dagli ossidi di zolfo e di azoto emessi dalle combustioni: sono le **piogge acide**.
:::

L'acido solforico è un caso particolare: il primo protone si stacca completamente, il secondo soltanto in parte, con $K_{\mathrm a2}=1{,}1\times10^{-2}$. In una soluzione $0{,}010\un{M}$ il secondo passaggio aggiunge altri $4{,}3\times10^{-3}\un{M}$ di ione ossonio, e il pH è $1{,}84$, più basso di quello di un acido monoprotico forte della stessa concentrazione.

## Sali che cambiano il pH {#sali}

Un sale è formato dal catione di una base e dall'anione di un acido. Sciolto in acqua, può dare una soluzione neutra, acida o basica, secondo il comportamento dei suoi ioni.

- **Ioni spettatori.** I cationi dei metalli alcalini e degli alcalino-terrosi pesanti, come $\mathrm{Na^+}$, $\mathrm{K^+}$ e $\mathrm{Ca^{2+}}$, e gli anioni degli acidi forti, come $\mathrm{Cl^-}$, $\mathrm{NO_3^-}$ e $\mathrm{ClO_4^-}$, non reagiscono con l'acqua. Il cloruro di sodio dà una soluzione neutra.
- **Anioni basici.** Gli anioni degli acidi deboli, come l'acetato, il fluoruro, il cianuro e il carbonato, sono basi deboli: una soluzione di acetato di sodio è basica.
- **Cationi acidi.** Lo ione ammonio e i cationi delle ammine sono acidi deboli. Lo sono anche molti cationi metallici piccoli e con carica alta, come $\mathrm{Al^{3+}}$, $\mathrm{Fe^{3+}}$ e $\mathrm{Cr^{3+}}$: in acqua sono circondati da molecole d'acqua, e la carica del metallo indebolisce i legami ossigeno-idrogeno di queste molecole, che cedono un protone con facilità. Le soluzioni di cloruro di ammonio e di cloruro di alluminio sono acide.

::: esempio Due sali, due pH
Una soluzione di cloruro di ammonio $0{,}10\un{M}$ contiene lo ione ammonio, acido debole con $K_\mathrm a=5{,}6\times10^{-10}$: $x^2\simeq5{,}6\times10^{-11}$, $[\mathrm{H_3O^+}]\simeq7{,}5\times10^{-6}\un{M}$, $\mathrm{pH}\simeq5{,}13$. Una soluzione di acetato di sodio $0{,}10\un{M}$ contiene lo ione acetato, base debole con $K_\mathrm b=5{,}6\times10^{-10}$: $[\mathrm{OH^-}]\simeq7{,}5\times10^{-6}\un{M}$, $\mathrm{pOH}\simeq5{,}13$, $\mathrm{pH}\simeq8{,}87$. I due risultati sono simmetrici rispetto a $7$, perché le due costanti sono uguali.
:::

Quando entrambi gli ioni reagiscono con l'acqua, il pH dipende dal confronto fra la costante di acidità del catione e quella di basicità dell'anione. L'acetato di ammonio dà una soluzione quasi neutra, perché le due costanti coincidono; il cianuro di ammonio dà una soluzione basica, perché lo ione cianuro è una base più forte di quanto lo ione ammonio sia un acido.

## Struttura e forza degli acidi {#struttura}

Perché l'acido cloridrico è forte e l'acido fluoridrico debole? Perché l'acido perclorico è molto più forte dell'acido ipocloroso? La forza di un acido dipende da quanto facilmente si rompe il legame che trattiene il protone e da quanto è stabile la base coniugata che resta.

**Acidi binari.** Negli acidi formati dall'idrogeno e da un altro elemento, lungo un gruppo della tavola periodica la forza cresce scendendo: $\mathrm{HF}\ll\mathrm{HCl}<\mathrm{HBr}<\mathrm{HI}$. Il fattore decisivo è l'energia del legame, che diminuisce rapidamente perché l'atomo dell'alogeno diventa più grande; l'acido fluoridrico ha il legame più forte, e la sua debolezza dipende anche dai legami a idrogeno fra l'acido indissociato, lo ione fluoruro e l'acqua. Lungo un periodo, invece, conta l'elettronegatività: $\mathrm{CH_4}$ non ha proprietà acide in acqua, $\mathrm{NH_3}$ è un acido debolissimo, $\mathrm{H_2O}$ un poco più forte, $\mathrm{HF}$ un acido debole vero e proprio.

**Ossiacidi.** Negli acidi in cui il protone è legato a un ossigeno, a sua volta legato a un atomo centrale, la forza cresce con l'elettronegatività dell'atomo centrale e con il numero di atomi di ossigeno legati a esso. Gli ossiacidi del cloro ne sono l'esempio classico: l'acido ipocloroso $\mathrm{HOCl}$ ha $\mathrm pK_\mathrm a=7{,}54$, l'acido cloroso $\mathrm{HClO_2}$ circa $1{,}96$, l'acido clorico $\mathrm{HClO_3}$ e l'acido perclorico $\mathrm{HClO_4}$ sono forti. Ogni ossigeno in più attira densità elettronica dal legame ossigeno-idrogeno e, nella base coniugata, distribuisce la carica negativa su più atomi, stabilizzandola.

**Acidi carbossilici.** Lo stesso effetto di attrazione elettronica, trasmesso lungo i legami, spiega l'aumento di forza degli acidi acetici sostituiti con il cloro: $\mathrm pK_\mathrm a$ vale $4{,}74$ per l'acido acetico, $2{,}85$ per l'acido cloroacetico, $1{,}26$ per l'acido dicloroacetico e $0{,}52$ per il tricloroacetico. Ogni atomo di cloro, molto elettronegativo, sottrae densità elettronica al gruppo carbossilico e stabilizza l'anione.

## Acidi e basi di Lewis {#lewis}

Nello stesso anno di Brønsted e Lowry, il chimico statunitense Gilbert Newton Lewis propose una definizione ancora più generale, basata sulle coppie di elettroni invece che sui protoni.

::: definizione Acido e base secondo Lewis
Una **base di Lewis** è una specie che cede una coppia di elettroni per formare un legame; un **acido di Lewis** è una specie che accetta una coppia di elettroni.
:::

Ogni base di Brønsted è anche una base di Lewis, perché per legare un protone deve offrirgli una coppia di elettroni; il protone è l'acido di Lewis più semplice. La definizione comprende però molte reazioni senza protoni. Il trifluoruro di boro, con soltanto sei elettroni intorno al boro, accetta la coppia libera dell'ammoniaca e forma un composto di addizione, $\mathrm{F_3B{-}NH_3}$. I cationi metallici sono acidi di Lewis: lo ione argento lega due molecole di ammoniaca nello ione complesso $[\mathrm{Ag(NH_3)_2}]^+$, gli ioni ferro dell'emoglobina legano l'ossigeno, e gli ioni complessi del capitolo [Solubilità ed equilibrio eterogeneo](unit:chemistry-13) sono tutti prodotti di reazioni fra acidi e basi di Lewis. Anche l'anidride carbonica si comporta da acido di Lewis quando reagisce con lo ione idrossido per formare lo ione idrogenocarbonato.

## Gli indicatori {#indicatori}

Un **indicatore acido-base** è un acido debole, o una base debole, in cui la forma protonata e quella deprotonata hanno colori diversi:

$$\mathrm{HIn}+\mathrm{H_2O}\rightleftharpoons\mathrm{H_3O^+}+\mathrm{In^-},\qquad\frac{[\mathrm{In^-}]}{[\mathrm{HIn}]}=\frac{K_\mathrm a}{[\mathrm{H_3O^+}]}.$$

Il rapporto fra le due forme dipende dal pH. Quando una forma è almeno dieci volte più abbondante dell'altra, l'occhio vede soltanto il suo colore; fra questi due estremi vede una miscela. Il **viraggio** avviene quindi in un intervallo di circa due unità di pH centrato sul $\mathrm pK_\mathrm a$ dell'indicatore. Una piccola quantità di indicatore basta a colorare la soluzione senza modificarne apprezzabilmente il pH.

::: figura indicatori
{"w":660,"h":290,"items":[{"t":"line","p":[170,236,620,236],"c":"ax","w":1.4},{"t":"line","p":[170.0,232,170.0,240],"c":"ax","w":1.2},{"t":"text","p":[170.0,258],"s":"0","c":"muted","size":12},{"t":"line","p":[234.3,232,234.3,240],"c":"ax","w":1.2},{"t":"text","p":[234.3,258],"s":"2","c":"muted","size":12},{"t":"line","p":[298.6,232,298.6,240],"c":"ax","w":1.2},{"t":"text","p":[298.6,258],"s":"4","c":"muted","size":12},{"t":"line","p":[362.9,232,362.9,240],"c":"ax","w":1.2},{"t":"text","p":[362.9,258],"s":"6","c":"muted","size":12},{"t":"line","p":[427.1,232,427.1,240],"c":"ax","w":1.2},{"t":"text","p":[427.1,258],"s":"8","c":"muted","size":12},{"t":"line","p":[491.4,232,491.4,240],"c":"ax","w":1.2},{"t":"text","p":[491.4,258],"s":"10","c":"muted","size":12},{"t":"line","p":[555.7,232,555.7,240],"c":"ax","w":1.2},{"t":"text","p":[555.7,258],"s":"12","c":"muted","size":12},{"t":"line","p":[620.0,232,620.0,240],"c":"ax","w":1.2},{"t":"text","p":[620.0,258],"s":"14","c":"muted","size":12},{"t":"text","p":[620,280],"s":"pH","c":"ax","size":13,"a":"end"},{"t":"text","p":[20,45],"s":"metilarancio","c":"ax","size":12,"a":"start"},{"t":"rect","p":[269.6,31,41.8,18],"c":"force3","r":3},{"t":"text","p":[263.6,45],"s":"rosso","c":"muted","size":11,"a":"end"},{"t":"text","p":[317.4,45],"s":"giallo","c":"muted","size":11,"a":"start"},{"t":"text","p":[20,91],"s":"rosso metile","c":"ax","size":12,"a":"start"},{"t":"rect","p":[311.4,77,57.9,18],"c":"force3","r":3},{"t":"text","p":[305.4,91],"s":"rosso","c":"muted","size":11,"a":"end"},{"t":"text","p":[375.3,91],"s":"giallo","c":"muted","size":11,"a":"start"},{"t":"text","p":[20,137],"s":"blu di bromotimolo","c":"ax","size":12,"a":"start"},{"t":"rect","p":[362.9,123,51.4,18],"c":"force3","r":3},{"t":"text","p":[356.9,137],"s":"giallo","c":"muted","size":11,"a":"end"},{"t":"text","p":[420.3,137],"s":"blu","c":"muted","size":11,"a":"start"},{"t":"text","p":[20,183],"s":"fenolftaleina","c":"ax","size":12,"a":"start"},{"t":"rect","p":[433.6,169,57.9,18],"c":"force3","r":3},{"t":"text","p":[427.6,183],"s":"incolore","c":"muted","size":11,"a":"end"},{"t":"text","p":[497.4,183],"s":"rosa","c":"muted","size":11,"a":"start"}]}
---
Intervalli di viraggio di quattro indicatori comuni, con i colori della forma acida a sinistra e della forma basica a destra. La scelta dell'indicatore dipende dal pH che si vuole rivelare.
:::

Il metilarancio vira fra $3{,}1$ e $4{,}4$, il blu di bromotimolo fra $6{,}0$ e $7{,}6$, la fenolftaleina fra $8{,}2$ e $10{,}0$. Combinando più indicatori con intervalli diversi si ottengono gli indicatori universali delle cartine, che assumono un colore diverso a ogni unità di pH. Il capitolo [Soluzioni tampone](unit:chemistry-22) userà gli indicatori per riconoscere la fine di una titolazione.

::: quotidiano Il cavolo rosso
Le foglie del cavolo rosso, come i mirtilli, le more e i petali di molti fiori, contengono **antociani**, pigmenti che sono anch'essi indicatori acido-base, con più forme di colore diverso. L'acqua di cottura del cavolo è rossa in ambiente fortemente acido, viola vicino alla neutralità, blu e poi verde in ambiente basico, gialla in ambiente fortemente basico. Bastano qualche goccia di succo di limone, di aceto, una soluzione di bicarbonato o di sapone per vedere in cucina una scala del pH quasi completa. Gli stessi pigmenti spiegano perché le ortensie cambiano colore: la tonalità dei fiori dipende dall'acidità del terreno, che regola la disponibilità degli ioni alluminio con cui i pigmenti si legano.
:::

::: storia Da Arrhenius a Lewis
Antoine Lavoisier, alla fine del Settecento, pensava che tutti gli acidi contenessero ossigeno, e da qui il nome dell'elemento, «generatore di acidi». Humphry Davy mostrò nel 1810 che l'acido muriatico, il nostro acido cloridrico, non ne contiene, e che il responsabile dell'acidità è l'idrogeno. La spiegazione moderna arrivò con la teoria della dissociazione elettrolitica di Svante Arrhenius, accolta con diffidenza quando fu presentata nella sua tesi del 1884 e premiata con il Nobel per la chimica nel 1903. Nel 1909 Søren Sørensen introdusse la scala del pH. Nel 1923, a pochi mesi di distanza, Johannes Brønsted a Copenaghen e Thomas Lowry a Cambridge pubblicarono la definizione basata sul protone, e Gilbert Lewis, a Berkeley, quella basata sulle coppie di elettroni, nel libro *Valence and the Structure of Atoms and Molecules*. Le tre definizioni convivono ancora: ciascuna è la più comoda in un diverso campo della chimica.
:::

## Errori frequenti {#errori}

::: errore Forte vuol dire concentrato
Forza e concentrazione sono indipendenti. Un acido forte diluito, come l'acido cloridrico $0{,}0010\un{M}$, ha pH $3$; un acido debole concentrato, come l'acido acetico glaciale, è quasi tutto indissociato. La forza riguarda la frazione ionizzata, la concentrazione la quantità di soluto.
:::

::: errore pH 7 è sempre la neutralità
La neutralità corrisponde a $[\mathrm{H_3O^+}]=[\mathrm{OH^-}]$. A $25\,^\circ\mathrm C$ questo accade a pH $7{,}00$; a $37\,^\circ\mathrm C$ a pH $6{,}81$, a $100\,^\circ\mathrm C$ a circa $6{,}13$.
:::

::: errore Diluendo un acido il pH arriva sopra 7
Diluendo un acido il pH si avvicina a $7$ senza superarlo, perché lo ione ossonio dell'acqua stessa diventa la parte principale. Una soluzione di acido cloridrico $10^{-8}\un{M}$ ha pH poco inferiore a $7$.
:::

::: errore Tutti i sali danno soluzioni neutre
Il cloruro di sodio dà una soluzione neutra; il cloruro di ammonio una soluzione acida, l'acetato di sodio e il carbonato di sodio soluzioni basiche. Conta il comportamento acido o basico di ciascuno ione.
:::

::: errore Una base debole ha un acido coniugato forte
La base coniugata di un acido debole è una base debole, e l'acido coniugato di una base debole è un acido debole: le due costanti sono legate da $K_\mathrm aK_\mathrm b=K_\mathrm w$. Soltanto gli acidi forti hanno basi coniugate trascurabili.
:::

## Sintesi {#sintesi}

::: sintesi Che cosa portare con sé
- Arrhenius: un acido libera $\mathrm{H^+}$ in acqua, una base $\mathrm{OH^-}$. Brønsted e Lowry: un acido cede un protone, una base lo accetta. Lewis: una base cede una coppia di elettroni, un acido la accetta.
- Ogni reazione acido-base di Brønsted coinvolge due coppie coniugate.
- $K_\mathrm w=[\mathrm{H_3O^+}][\mathrm{OH^-}]=1{,}0\times10^{-14}$ a $25\,^\circ\mathrm C$; il valore cresce con la temperatura.
- $\mathrm{pH}=-\log[\mathrm{H_3O^+}]$ e, a $25\,^\circ\mathrm C$, $\mathrm{pH}+\mathrm{pOH}=14{,}00$.
- Acidi e basi forti si ionizzano completamente; per quelli deboli valgono $K_\mathrm a$ e $K_\mathrm b$, con $K_\mathrm aK_\mathrm b=K_\mathrm w$ per una coppia coniugata.
- Per un acido debole $[\mathrm{H_3O^+}]\simeq\sqrt{K_\mathrm ac}$ se la frazione ionizzata è minore del $5\%$; la frazione ionizzata cresce con la diluizione.
- Negli acidi poliprotici le costanti successive diminuiscono molto; lo ione ossonio viene quasi tutto dal primo passaggio.
- I sali danno soluzioni acide, basiche o neutre secondo il comportamento dei loro ioni.
- Un indicatore vira in circa due unità di pH intorno al proprio $\mathrm pK_\mathrm a$.
:::

## Glossario {#glossario}

- **Acido e base di Arrhenius**: sostanze che in acqua liberano, rispettivamente, ioni idrogeno e ioni idrossido.
- **Acido e base di Brønsted-Lowry**: specie che cedono o accettano un protone.
- **Acido e base di Lewis**: specie che accettano o cedono una coppia di elettroni.
- **Ione ossonio**: $\mathrm{H_3O^+}$, forma del protone in acqua.
- **Coppia coniugata**: acido e base che differiscono per un protone.
- **Specie anfiprotica**: specie che può comportarsi da acido o da base.
- **Prodotto ionico dell'acqua**: costante $K_\mathrm w=[\mathrm{H_3O^+}][\mathrm{OH^-}]$.
- **pH**: opposto del logaritmo decimale della concentrazione dello ione ossonio.
- **Acido forte**: acido che in acqua cede il protone in modo praticamente completo.
- **Costante di acidità** e **di basicità**: costanti di equilibrio della reazione di un acido o di una base debole con l'acqua.
- **Frazione ionizzata**: rapporto fra la concentrazione di acido ionizzato e la concentrazione analitica.
- **Acido poliprotico**: acido che può cedere più di un protone, uno alla volta.
- **Ossiacido**: acido in cui il protone acido è legato a un atomo di ossigeno.
- **Indicatore**: acido o base debole con forme di colore diverso; vira in un intervallo di pH caratteristico.
- **Pioggia acida**: pioggia con pH inferiore a circa $5{,}6$ per la presenza di acidi forti.

## Esercizi {#esercizi}

Gli esercizi sono divisi in tre livelli. Dove non è indicato diversamente, la temperatura è $25\,^\circ\mathrm C$, $K_\mathrm w=1{,}0\times10^{-14}$ e le costanti sono quelle del testo.

::: esercizio Coppie coniugate [base]
Individuare l'acido, la base e le due coppie coniugate in ciascuna reazione: (a) $\mathrm{HNO_2}+\mathrm{H_2O}\rightleftharpoons\mathrm{H_3O^+}+\mathrm{NO_2^-}$; (b) $\mathrm{HCO_3^-}+\mathrm{OH^-}\rightleftharpoons\mathrm{CO_3^{2-}}+\mathrm{H_2O}$; (c) $\mathrm{NH_4^+}+\mathrm{CN^-}\rightleftharpoons\mathrm{NH_3}+\mathrm{HCN}$.
>>> soluzione
(a) Acido $\mathrm{HNO_2}$, base $\mathrm{H_2O}$; coppie $\mathrm{HNO_2}/\mathrm{NO_2^-}$ e $\mathrm{H_3O^+}/\mathrm{H_2O}$. (b) Acido $\mathrm{HCO_3^-}$, base $\mathrm{OH^-}$; coppie $\mathrm{HCO_3^-}/\mathrm{CO_3^{2-}}$ e $\mathrm{H_2O}/\mathrm{OH^-}$. (c) Acido $\mathrm{NH_4^+}$, base $\mathrm{CN^-}$; coppie $\mathrm{NH_4^+}/\mathrm{NH_3}$ e $\mathrm{HCN}/\mathrm{CN^-}$.
:::

::: esercizio Dal pH alle concentrazioni [base]
Calcolare il pH di una soluzione con $[\mathrm{H_3O^+}]=3{,}2\times10^{-5}\un{M}$. Calcolare poi $[\mathrm{H_3O^+}]$ e $[\mathrm{OH^-}]$ in una soluzione con pH $9{,}25$.
>>> soluzione
$\mathrm{pH}=-\log(3{,}2\times10^{-5})=4{,}49$. Con pH $9{,}25$, $[\mathrm{H_3O^+}]=10^{-9{,}25}=5{,}6\times10^{-10}\un{M}$ e $[\mathrm{OH^-}]=K_\mathrm w/[\mathrm{H_3O^+}]=1{,}8\times10^{-5}\un{M}$.
:::

::: esercizio Acidi e basi forti [base]
Calcolare il pH di: (a) acido nitrico $0{,}0040\un{M}$; (b) idrossido di potassio $0{,}025\un{M}$; (c) idrossido di calcio $1{,}0\times10^{-3}\un{M}$.
>>> soluzione
(a) $\mathrm{pH}=-\log0{,}0040=2{,}40$. (b) $\mathrm{pOH}=-\log0{,}025=1{,}60$, $\mathrm{pH}=12{,}40$. (c) Ogni unità libera due ioni idrossido: $[\mathrm{OH^-}]=2{,}0\times10^{-3}\un{M}$, $\mathrm{pOH}=2{,}70$, $\mathrm{pH}=11{,}30$.
:::

::: esercizio Acidi, basi o neutri [base]
Dire se le soluzioni acquose dei sali seguenti sono acide, basiche o neutre: $\mathrm{KNO_3}$, $\mathrm{NH_4NO_3}$, $\mathrm{Na_2CO_3}$, $\mathrm{NaF}$, $\mathrm{FeCl_3}$.
>>> soluzione
$\mathrm{KNO_3}$: neutra, entrambi gli ioni sono spettatori. $\mathrm{NH_4NO_3}$: acida, per lo ione ammonio. $\mathrm{Na_2CO_3}$: basica, lo ione carbonato è una base. $\mathrm{NaF}$: basica, il fluoruro è la base coniugata di un acido debole. $\mathrm{FeCl_3}$: acida, per lo ione ferro(III) idratato.
:::

::: esercizio Dalla costante di acidità alla costante di basicità [base]
Calcolare la costante di basicità dello ione fluoruro, sapendo che l'acido fluoridrico ha $K_\mathrm a=6{,}6\times10^{-4}$, e la costante di acidità dello ione ammonio, sapendo che l'ammoniaca ha $K_\mathrm b=1{,}8\times10^{-5}$.
>>> soluzione
Per il fluoruro $K_\mathrm b=K_\mathrm w/K_\mathrm a$, cioè $1{,}0\times10^{-14}/6{,}6\times10^{-4}=1{,}5\times10^{-11}$. Per lo ione ammonio $K_\mathrm a=K_\mathrm w/K_\mathrm b$, cioè $1{,}0\times10^{-14}/1{,}8\times10^{-5}=5{,}6\times10^{-10}$.
:::

::: esercizio Acido fluoridrico [medio]
Calcolare il pH e la frazione ionizzata di una soluzione di acido fluoridrico $0{,}10\un{M}$. L'approssimazione $x\ll c$ è accettabile?
>>> soluzione
Con l'approssimazione, $x=\sqrt{6{,}6\times10^{-5}}=8{,}1\times10^{-3}\un{M}$, cioè l'$8{,}1\%$ di $0{,}10$: oltre il limite del $5\%$. Risolvendo $x^2+6{,}6\times10^{-4}x-6{,}6\times10^{-5}=0$ si ottiene $x=7{,}8\times10^{-3}\un{M}$, pH $2{,}11$ e frazione ionizzata del $7{,}8\%$.
:::

::: esercizio La costante da una misura [medio]
Una soluzione $0{,}050\un{M}$ di un acido debole monoprotico ha pH $3{,}00$. Calcolare la costante di acidità.
>>> soluzione
$[\mathrm{H_3O^+}]=[\mathrm{A^-}]=1{,}0\times10^{-3}\un{M}$ e $[\mathrm{HA}]=0{,}050-0{,}001=0{,}049\un{M}$, quindi $K_\mathrm a=(1{,}0\times10^{-3})^2/0{,}049=2{,}0\times10^{-5}$.
:::

::: esercizio Metilammina [medio]
Calcolare il pH di una soluzione di metilammina $0{,}050\un{M}$, con $K_\mathrm b=4{,}2\times10^{-4}$.
>>> soluzione
Dall'equazione $x^2/(0{,}050-x)=4{,}2\times10^{-4}$, risolta senza approssimazioni perché $\sqrt{K_\mathrm bc}$ supera il $5\%$ di $c$, si ottiene $x=[\mathrm{OH^-}]=4{,}4\times10^{-3}\un{M}$. $\mathrm{pOH}=2{,}36$ e $\mathrm{pH}=11{,}64$.
:::

::: esercizio Cianuro di sodio [medio]
Calcolare il pH di una soluzione di cianuro di sodio $0{,}10\un{M}$, sapendo che l'acido cianidrico ha $K_\mathrm a=6{,}2\times10^{-10}$.
>>> soluzione
Lo ione cianuro ha $K_\mathrm b=K_\mathrm w/K_\mathrm a$, cioè $1{,}6\times10^{-5}$. Con $x^2/(0{,}10-x)=1{,}6\times10^{-5}$ si trova $[\mathrm{OH^-}]=1{,}26\times10^{-3}\un{M}$, $\mathrm{pOH}=2{,}90$ e $\mathrm{pH}=11{,}10$: una soluzione nettamente basica.
:::

::: esercizio Un mescolamento [medio]
Si uniscono $25{,}0\un{mL}$ di acido cloridrico $0{,}100\un{M}$ e $30{,}0\un{mL}$ di idrossido di sodio $0{,}100\un{M}$. Calcolare il pH della soluzione finale.
>>> soluzione
Le moli di ione ossonio sono $2{,}50\un{mmol}$, quelle di ione idrossido $3{,}00\un{mmol}$. Dopo la neutralizzazione restano $0{,}50\un{mmol}$ di ione idrossido in $55{,}0\un{mL}$: $[\mathrm{OH^-}]=9{,}1\times10^{-3}\un{M}$, $\mathrm{pOH}=2{,}04$, $\mathrm{pH}=11{,}96$.
:::

::: esercizio Un acido molto diluito [avanzato]
Calcolare il pH di una soluzione di acido cloridrico $1{,}0\times10^{-8}\un{M}$, tenendo conto dell'autoionizzazione dell'acqua.
>>> soluzione
Lo ione ossonio proviene dall'acido, $1{,}0\times10^{-8}\un{M}$, e dall'acqua, una quantità $y$ uguale a quella dello ione idrossido. Con $[\mathrm{H_3O^+}]=1{,}0\times10^{-8}+y$ e $[\mathrm{OH^-}]=y$, la condizione $K_\mathrm w=(10^{-8}+y)y$ dà $y^2+10^{-8}y-10^{-14}=0$, con $y=9{,}5\times10^{-8}\un{M}$. Quindi $[\mathrm{H_3O^+}]=1{,}05\times10^{-7}\un{M}$ e $\mathrm{pH}=6{,}98$: appena acida, come deve essere.
:::

::: esercizio Quando l'acido è ionizzato al dieci per cento [avanzato]
L'acido formico ha $K_\mathrm a=1{,}8\times10^{-4}$. Calcolare il pH e la frazione ionizzata di una soluzione $0{,}20\un{M}$, e la concentrazione alla quale la frazione ionizzata sale al $10\%$.
>>> soluzione
A $0{,}20\un{M}$: $x^2/(0{,}20-x)=1{,}8\times10^{-4}$ dà $x=5{,}9\times10^{-3}\un{M}$, pH $2{,}23$, frazione ionizzata $3{,}0\%$. Indicando con $\alpha$ la frazione ionizzata, $K_\mathrm a=c\alpha^2/(1-\alpha)$; con $\alpha=0{,}10$ si ottiene
$$c=\frac{K_\mathrm a(1-\alpha)}{\alpha^2}=\frac{1{,}8\times10^{-4}\times0{,}90}{0{,}010}=0{,}016\un{M}.$$
:::

::: esercizio Il sangue è basico [avanzato]
A $37\,^\circ\mathrm C$ il prodotto ionico dell'acqua vale circa $2{,}4\times10^{-14}$. Calcolare il pH della neutralità a questa temperatura e il rapporto $[\mathrm{OH^-}]/[\mathrm{H_3O^+}]$ nel sangue, con pH $7{,}40$.
>>> soluzione
Alla neutralità $[\mathrm{H_3O^+}]=\sqrt{K_\mathrm w}$, cioè $1{,}55\times10^{-7}\un{M}$, e $\mathrm{pH}=6{,}81$. Nel sangue $[\mathrm{H_3O^+}]=10^{-7{,}40}=4{,}0\times10^{-8}\un{M}$ e $[\mathrm{OH^-}]=K_\mathrm w/[\mathrm{H_3O^+}]=6{,}0\times10^{-7}\un{M}$: lo ione idrossido è circa quindici volte più abbondante dello ione ossonio.
:::

::: esercizio Pioggia e anidride carbonica [avanzato]
Calcolare il pH della pioggia in equilibrio con un'aria che contenga il doppio dell'anidride carbonica attuale, $8{,}4\times10^{-4}\un{bar}$. Calcolare poi il pH di una pioggia che contiene, oltre all'anidride carbonica, $2{,}0\times10^{-5}\un{mol/L}$ di acido solforico, supponendo che ceda entrambi i protoni.
>>> soluzione
La concentrazione di anidride carbonica disciolta raddoppia, $2{,}86\times10^{-5}\un{M}$, e
$$[\mathrm{H_3O^+}]=\sqrt{4{,}4\times10^{-7}\times2{,}86\times10^{-5}}=3{,}5\times10^{-6}\un{M},$$
con pH $5{,}45$. Con l'acido solforico lo ione ossonio vale circa $4{,}0\times10^{-5}\un{M}$, e il pH scende a circa $4{,}4$: in presenza di un acido forte la ionizzazione dell'acido carbonico è soppressa e il suo contributo diventa trascurabile.
:::

::: esercizio Il colore di un indicatore [avanzato]
Il blu di bromotimolo ha $\mathrm pK_\mathrm a\simeq7{,}1$; la forma acida è gialla, quella basica blu. Calcolare la frazione presente nella forma basica a pH $6{,}1$, $7{,}1$ e $8{,}1$, e descrivere il colore.
>>> soluzione
Il rapporto $[\mathrm{In^-}]/[\mathrm{HIn}]$ vale $10^{\mathrm{pH}-\mathrm pK_\mathrm a}$: $0{,}1$, $1$ e $10$. Le frazioni nella forma basica sono quindi $0{,}1/1{,}1\simeq9\%$, $50\%$ e $10/11\simeq91\%$. A pH $6{,}1$ la soluzione appare gialla, a $7{,}1$ verde, mescolanza delle due forme, a $8{,}1$ blu.
:::

## Fonti {#fonti}

Il testo, le figure, gli esempi e gli esercizi di questo capitolo sono originali; i valori di pH delle sostanze comuni nella figura della scala sono indicativi. Per la scelta e l'ordine degli argomenti il riferimento principale è il manuale di R. H. Petrucci, F. G. Herring, J. D. Madura e C. Bissonnette, *General Chemistry: Principles and Modern Applications*, 11ª edizione, Pearson Canada, Toronto, 2017, paragrafi 16-1–16-6, 16-8, 16-10, 16-11 e 17-3. I dati numerici provengono dalle fonti seguenti.

1. Costanti di acidità e di basicità a $25\,^\circ\mathrm C$: tabella D.3 dell'appendice D del manuale di Petrucci et al.
2. Prodotto ionico dell'acqua fra $0$ e $100\,^\circ\mathrm C$: W. L. Marshall e E. U. Franck, J. Phys. Chem. Ref. Data 10 (1981) 295, nei valori riportati dal CRC Handbook of Chemistry and Physics.
3. Entalpia di neutralizzazione: entalpie standard di formazione di $\mathrm{H_2O(l)}$ e $\mathrm{OH^-(aq)}$ delle tabelle NBS (D. D. Wagman et al., J. Phys. Chem. Ref. Data 11, 1982, supplemento 2).
4. Costante della legge di Henry per l'anidride carbonica: R. Sander, Atmos. Chem. Phys. 23 (2023) 10901; frazione di anidride carbonica nell'aria: NOAA Global Monitoring Laboratory. Intervallo del pH del sangue: letteratura di fisiologia.
5. Intervalli di viraggio degli indicatori: CRC Handbook of Chemistry and Physics, tabella degli indicatori acido-base.
6. Per la storia: S. Arrhenius, Z. Phys. Chem. 1 (1887) 631; S. P. L. Sørensen, Biochem. Z. 21 (1909) 131; J. N. Brønsted, Recl. Trav. Chim. Pays-Bas 42 (1923) 718; T. M. Lowry, J. Soc. Chem. Ind. 42 (1923) 43; G. N. Lewis, *Valence and the Structure of Atoms and Molecules*, Chemical Catalog Company, New York, 1923; H. Davy, Phil. Trans. R. Soc. 100 (1810) 231.
