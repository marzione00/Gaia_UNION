# I tre livelli dei percorsi guidati

Ogni tappa di un percorso guidato si legge a tre livelli: Base, Applica e Approfondisci. Nei dati i tre testi si chiamano `base`, `intermediate` e `advanced`. Fino alla 1.33.1 i livelli erano spesso copie l'uno dell'altro; dalla 1.34.0 la chimica ha tre testi distinti in ogni tappa, dalla 1.35.0 anche la matematica, dalla 1.36.0 la fisica e dalla 1.37.0 la biologia. Questo documento descrive il problema, la regola di scrittura e i controlli che la fanno rispettare.

## Il problema

Nella 1.33.1 le tappe con testo visibile erano 625: 125 unità per cinque tappe, perché la tappa Verifica mostra soltanto le domande. In 335 di esse almeno due livelli coincidevano parola per parola, e in chimica il caso riguardava 101 tappe su 125. Le unità di fisica da 1 a 25 sono generate da `content/curriculum/authored.json` con livelli composti dagli stessi paragrafi, e anche molte unità scritte a mano ripetevano lo stesso paragrafo in più livelli o in più tappe. Lo studente che passava da Base ad Approfondisci leggeva spesso lo stesso testo.

## La regola di scrittura

- **Base** spiega il concetto con un esempio semplice, in prosa, senza dare per scontati i passaggi.
- **Applica** svolge esempi numerici completi, con i dati del capitolo, e chiude con una domanda per lo studente.
- **Approfondisci** estende il concetto: derivazioni, limiti del modello, incertezze, storia della scoperta.

I tre livelli non condividono paragrafi. In matematica le spiegazioni sono più ampie e ogni livello racconta anche la storia dei concetti: le fonti antiche, gli autori, le date e i problemi da cui le idee sono nate. Base presenta il personaggio o il problema storico, Applica lo trasforma in un esempio svolto, Approfondisci ne discute le conseguenze e i limiti. Nella tappa Sperimenta delle unità con laboratorio, prive del pannello di attività, ogni livello spiega con parole proprie come salvare le due configurazioni con «Salva A» e «Salva B», perché lo studente legge un solo livello alla volta. In chimica i numeri vengono dai capitoli del libro, già verificati sulle fonti, oppure si ricavano da essi con calcoli riportati nel testo. Per la matematica il repository è privo di capitoli, quindi esempi e risultati vengono dalla dispensa «Matematica di base» o si ricavano con calcoli riportati nel testo e ricontrollati, mentre date e notizie storiche sono state confrontate con J. Gullberg, «Mathematics: From the Birth of Numbers» (Norton, 1997); le notizie assenti da quel libro sono dati di uso comune nella letteratura storica. I testi riassumono con parole proprie e non riportano brani del libro. In fisica i numeri vengono dai capitoli del libro, dalle costanti del Sistema internazionale e da valori di riferimento noti, oppure si ricavano con calcoli riportati nel testo e ricontrollati; anche qui ogni livello racconta la storia, dagli esperimenti di Galileo e di Faraday alle onde gravitazionali. In biologia i numeri vengono dai capitoli del libro, dagli articoli e dalle missioni che i capitoli citano e da valori di riferimento noti, oppure si ricavano con calcoli riportati nel testo e ricontrollati; la storia va da Pasteur, Darwin e Mendel alle sonde Viking, Cassini e JWST, e i livelli Approfondisci raccontano anche gli annunci poi smentiti, come il meteorite ALH84001 o il segnale di BLC1. I valori dei laboratori e delle attività, come le previsioni da salvare con «Salva A» e «Salva B» o lo scarto residuo delle serie di adattamento, sono ricalcolati con le stesse formule del programma.

## Le unità generate

Le unità di fisica da 1 a 25 sono generate da `content/curriculum/authored.json`, che fornisce modello, domande e glossario. Dalla 1.36.0 i loro testi vengono da `content/curriculum/levels.json`, che per ogni unità contiene i tre livelli delle tappe con testo visibile e la nota sulla narrazione. `tools/build_curriculum.mjs` sostituisce con questi i testi composti dai campi di `authored.json`; per le unità scritte a mano valgono i testi di `content/curriculum/prototypes.json`. La nota sulla narrazione delle 25 unità precisa che lo scenario della spedizione è di fantasia e i dati del laboratorio sono sintetici, mentre i fatti storici e i valori citati nei testi sono reali. I testi restano coerenti con le domande generate: i calcoli delle domande compaiono anche negli esempi.

## I controlli

`tests/levels.test.mjs` verifica le discipline elencate in `REWRITTEN`, oggi chimica, matematica, fisica e biologia. Per ogni tappa con testo visibile controlla:

- che i tre livelli siano presenti e abbiano una lunghezza minima, fissata per disciplina in `MIN_BY`: in chimica 90 parole in Scopri, 230 in Capisci, 100 in Sperimenta, 120 in Interpreta e 75 in Collega; in matematica 140, 330, 130, 170 e 110; in fisica e in biologia gli stessi valori della chimica;
- che due livelli non condividano alcun paragrafo e che la somiglianza fra i loro testi, misurata come indice di Jaccard sulle sequenze di tre parole, non superi 0,2;
- che nessun paragrafo si ripeta in due tappe della stessa unità;
- che il testo eviti le costruzioni escluse dalla guida di stile del progetto;
- che nelle unità con laboratorio ogni livello della tappa Sperimenta nomini «Salva A» e «Salva B».

Il controllo dei caratteri di `tests/curriculum.test.mjs` resta valido: i testi usano soltanto caratteri presenti nell'atlante dei glifi, oppure convertiti da `displayText`, che dalla 1.34.0 converte anche «ô».

## I numeri della chimica

| Misura | 1.33.1 | 1.34.0 |
|---|---:|---:|
| Tappe con almeno due livelli uguali | 101 su 125 | 0 su 125 |
| Somiglianza massima fra due livelli della stessa tappa | 1,000 | 0,066 |
| Prosa distinta per unità, sommando i tre livelli (mediana, parole) | 674 | 2000 |
| Prosa distinta in tutte le 25 unità (parole) | 19 027 | 50 364 |
| Lunghezza di un percorso letto a un solo livello (mediana, parole: Base / Applica / Approfondisci) | 669 / 718 / 718 | 665 / 673 / 663 |
| Tappa Capisci, livello Base (mediana, parole) | 189 | 247 |

Un percorso letto a un solo livello ha circa la stessa lunghezza di prima. Il guadagno sta nella prosa distinta, triplicata, e nella tappa Capisci, che a livello Base si è allungata di circa il 30 per cento. Le tappe Sperimenta e Collega si sono accorciate, perché i testi precedenti vi ripetevano frasi già presenti nelle altre tappe.

## I numeri della matematica

| Misura | 1.34.0 | 1.35.0 |
|---|---:|---:|
| Tappe con i tre livelli uguali | 42 su 125 | 0 su 125 |
| Somiglianza massima fra due livelli della stessa tappa | 1,000 | 0,198 |
| Prosa distinta per unità, sommando i tre livelli (mediana, parole) | 839 | 2926 |
| Prosa distinta in tutte le 25 unità (parole) | 23 003 | 73 749 |
| Lunghezza di un percorso letto a un solo livello (mediana, parole: Base / Applica / Approfondisci) | 743 / 855 / 821 | 963 / 992 / 974 |
| Tappa Capisci, livello Base (mediana, parole) | 264 | 352 |
| Tappa Scopri, livello Base (mediana, parole) | 130 | 190 |
| Tappa Interpreta, livello Base (mediana, parole) | 122 | 178 |

In matematica il percorso letto a un solo livello si allunga di circa il 20 per cento, perché ogni tappa aggiunge esempi svolti e storia; la prosa distinta di un'unità cresce di circa tre volte e mezza. La tappa Sperimenta si accorcia leggermente, da una mediana di 159 a 137 parole a livello Base, perché i testi precedenti vi ripetevano la descrizione del modello già data nella tappa Capisci. La somiglianza più alta, 0,198, riguarda una tappa Sperimenta con laboratorio, dove i tre livelli descrivono lo stesso protocollo con parole diverse.

## I numeri della fisica

| Misura | 1.35.0 | 1.36.0 |
|---|---:|---:|
| Tappe con almeno un paragrafo condiviso fra due livelli | 200 su 200 | 0 su 200 |
| Tappe con almeno due livelli uguali | 45 su 200 | 0 su 200 |
| Somiglianza massima fra due livelli della stessa tappa | 1,000 | 0,174 |
| Prosa distinta per unità, sommando i tre livelli (mediana, parole) | 386,5 | 2299,5 |
| Prosa distinta in tutte le 40 unità (parole) | 25 950 | 96 021 |
| Lunghezza di un percorso letto a un solo livello (mediana, parole: Base / Applica / Approfondisci) | 348,5 / 443,5 / 424 | 752,5 / 791,5 / 765,5 |
| Tappa Capisci, livello Base (mediana, parole) | 58 | 247 |
| Tappa Scopri, livello Base (mediana, parole) | 60,5 | 163 |
| Tappa Interpreta, livello Base (mediana, parole) | 88 | 138 |

Le unità di fisica sono 40, quindi le tappe con testo visibile sono 200 e le mediane cadono fra due valori. Prima della 1.36.0 ogni tappa aveva almeno un paragrafo in comune fra due livelli: nelle unità generate i livelli erano composti dagli stessi campi di `authored.json`, in quelle scritte a mano ogni livello ripeteva il precedente aggiungendo un paragrafo. Il percorso letto a livello Base ha ora più del doppio delle parole, e la tappa Capisci, che nelle unità generate conteneva soltanto il concetto e un esempio, passa da 58 a 247 parole. Nelle unità scritte a mano, da 26 a 40, i paragrafi già presenti restano, ciascuno in un solo livello, accanto a esempi svolti e notizie storiche nuove.

## I numeri della biologia

| Misura | 1.36.0 | 1.37.0 |
|---|---:|---:|
| Tappe con almeno un paragrafo condiviso fra due livelli | 175 su 175 | 0 su 175 |
| Tappe con almeno due livelli uguali | 106 su 175 | 0 su 175 |
| Tappe con i tre livelli uguali | 35 su 175 | 0 su 175 |
| Somiglianza massima fra due livelli della stessa tappa | 1,000 | 0,188 |
| Prosa distinta per unità, sommando i tre livelli (mediana, parole) | 1015 | 2418 |
| Prosa distinta in tutte le 35 unità (parole) | 35 651 | 84 807 |
| Lunghezza di un percorso letto a un solo livello (mediana, parole: Base / Applica / Approfondisci) | 685 / 810 / 1015 | 765 / 784 / 877 |
| Tappa Capisci, livello Base (mediana, parole) | 121 | 235 |
| Tappa Scopri, livello Base (mediana, parole) | 120 | 159 |
| Tappa Interpreta, livello Base (mediana, parole) | 107 | 141 |
| Tappa Sperimenta, livello Base (mediana, parole) | 202 | 138 |
| Tappa Collega, livello Base (mediana, parole) | 142 | 79 |

Le 35 unità di biologia sono tutte scritte a mano e tutte con laboratorio. Nella 1.36.0 ogni livello ripeteva il precedente aggiungendo un paragrafo, quindi Approfondisci conteneva tutta la prosa dell'unità e in 35 tappe i tre livelli coincidevano. Ora i paragrafi già presenti restano, ciascuno in un solo livello, accanto a esempi svolti, protocolli con i numeri calcolati e notizie storiche nuove, e la prosa distinta di un'unità cresce di circa due volte e mezza. Il percorso letto ad Approfondisci si accorcia, da 1015 a 877 parole, perché prima includeva anche i paragrafi di Base e di Applica; il percorso letto a Base si allunga di circa il 12 per cento, e la sua tappa Capisci quasi raddoppia. Le tappe Sperimenta e Collega si accorciano a livello Base, perché la descrizione del laboratorio, le osservazioni, l'esperienza a casa e il diario, prima ripetuti in ogni livello, sono ora distribuiti fra i tre. La somiglianza più alta, 0,188, riguarda la tappa Sperimenta di «Sorgenti idrotermali e metabolismo primordiale», dove Base e Applica descrivono lo stesso protocollo con parole diverse.

Durante la riscrittura sono stati corretti un valore e un refuso dei testi precedenti. In «Titano, la chimica senza acqua» una reazione con energia di attivazione di 100 kJ/mol risultava a 94 K circa 10⁴⁰ volte più lenta che a 298 K; il calcolo con la legge di Arrhenius dà circa 10³⁸, e il valore è stato corretto anche nella risposta della domanda corrispondente. In «Mutazioni e soglia d'errore» «ipercicio» è diventato «iperciclo».

## Dopo la biologia

Con la 1.37.0 le quattro discipline del curriculum hanno tre livelli distinti in ogni tappa con testo visibile. Una disciplina nuova si aggiunge a `REWRITTEN` e, se servono lunghezze minime diverse, a `MIN_BY`; i suoi testi seguono la stessa regola di scrittura.
