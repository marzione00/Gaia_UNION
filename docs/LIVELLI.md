# I tre livelli dei percorsi guidati

Ogni tappa di un percorso guidato si legge a tre livelli: Base, Applica e Approfondisci. Nei dati i tre testi si chiamano `base`, `intermediate` e `advanced`. Fino alla 1.33.1 i livelli erano spesso copie l'uno dell'altro; dalla 1.34.0 la chimica ha tre testi distinti in ogni tappa, e dalla 1.35.0 anche la matematica. Questo documento descrive il problema, la regola di scrittura e i controlli che la fanno rispettare.

## Il problema

Nella 1.33.1 le tappe con testo visibile erano 625: 125 unità per cinque tappe, perché la tappa Verifica mostra soltanto le domande. In 335 di esse almeno due livelli coincidevano parola per parola, e in chimica il caso riguardava 101 tappe su 125. Le unità di fisica da 1 a 25 sono generate da `content/curriculum/authored.json` con livelli composti dagli stessi paragrafi, e anche molte unità scritte a mano ripetevano lo stesso paragrafo in più livelli o in più tappe. Lo studente che passava da Base ad Approfondisci leggeva spesso lo stesso testo.

## La regola di scrittura

- **Base** spiega il concetto con un esempio semplice, in prosa, senza dare per scontati i passaggi.
- **Applica** svolge esempi numerici completi, con i dati del capitolo, e chiude con una domanda per lo studente.
- **Approfondisci** estende il concetto: derivazioni, limiti del modello, incertezze, storia della scoperta.

I tre livelli non condividono paragrafi. In matematica le spiegazioni sono più ampie e ogni livello racconta anche la storia dei concetti: le fonti antiche, gli autori, le date e i problemi da cui le idee sono nate. Base presenta il personaggio o il problema storico, Applica lo trasforma in un esempio svolto, Approfondisci ne discute le conseguenze e i limiti. Nella tappa Sperimenta delle unità con laboratorio, prive del pannello di attività, ogni livello spiega con parole proprie come salvare le due configurazioni con «Salva A» e «Salva B», perché lo studente legge un solo livello alla volta. In chimica i numeri vengono dai capitoli del libro, già verificati sulle fonti, oppure si ricavano da essi con calcoli riportati nel testo. Per la matematica il repository è privo di capitoli, quindi esempi e risultati vengono dalla dispensa «Matematica di base» o si ricavano con calcoli riportati nel testo e ricontrollati, mentre date e notizie storiche sono state confrontate con J. Gullberg, «Mathematics: From the Birth of Numbers» (Norton, 1997); le notizie assenti da quel libro sono dati di uso comune nella letteratura storica. I testi riassumono con parole proprie e non riportano brani del libro. I valori dei laboratori e delle attività, come le previsioni da salvare con «Salva A» e «Salva B» o lo scarto residuo delle serie di adattamento, sono ricalcolati con le stesse formule del programma.

## I controlli

`tests/levels.test.mjs` verifica le discipline elencate in `REWRITTEN`, oggi chimica e matematica. Per ogni tappa con testo visibile controlla:

- che i tre livelli siano presenti e abbiano una lunghezza minima, fissata per disciplina in `MIN_BY`: in chimica 90 parole in Scopri, 230 in Capisci, 100 in Sperimenta, 120 in Interpreta e 75 in Collega; in matematica 140, 330, 130, 170 e 110;
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

## Le prossime discipline

Restano da riscrivere fisica e biologia, una disciplina per volta. Per ciascuna si aggiunge il prefisso a `REWRITTEN`. Per le unità di fisica da 1 a 25 serve anche cambiare la composizione dei livelli in `tools/build_curriculum.mjs`, oppure spostare le unità fra quelle scritte a mano in `content/curriculum/prototypes.json`.
