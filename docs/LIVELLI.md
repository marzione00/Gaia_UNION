# I tre livelli dei percorsi guidati

Ogni tappa di un percorso guidato si legge a tre livelli: Base, Applica e Approfondisci. Nei dati i tre testi si chiamano `base`, `intermediate` e `advanced`. Fino alla 1.33.1 i livelli erano spesso copie l'uno dell'altro, e dalla 1.34.0 la chimica ha tre testi distinti in ogni tappa. Questo documento descrive il problema, la regola di scrittura e i controlli che la fanno rispettare.

## Il problema

Nella 1.33.1 le tappe con testo visibile erano 625: 125 unità per cinque tappe, perché la tappa Verifica mostra soltanto le domande. In 335 di esse almeno due livelli coincidevano parola per parola, e in chimica il caso riguardava 101 tappe su 125. Le unità di fisica da 1 a 25 sono generate da `content/curriculum/authored.json` con livelli composti dagli stessi paragrafi, e anche molte unità scritte a mano ripetevano lo stesso paragrafo in più livelli o in più tappe. Lo studente che passava da Base ad Approfondisci leggeva spesso lo stesso testo.

## La regola di scrittura

- **Base** spiega il concetto con un esempio semplice, in prosa, senza dare per scontati i passaggi.
- **Applica** svolge esempi numerici completi, con i dati del capitolo, e chiude con una domanda per lo studente.
- **Approfondisci** estende il concetto: derivazioni, limiti del modello, incertezze, storia della scoperta.

I tre livelli non condividono paragrafi. Nella tappa Sperimenta delle unità con laboratorio, prive del pannello di attività, ogni livello spiega con parole proprie come salvare le due configurazioni con «Salva A» e «Salva B», perché lo studente legge un solo livello alla volta. I numeri vengono dai capitoli del libro, già verificati sulle fonti, oppure si ricavano da essi con calcoli riportati nel testo.

## I controlli

`tests/levels.test.mjs` verifica le discipline elencate in `REWRITTEN`, oggi soltanto la chimica. Per ogni tappa con testo visibile controlla:

- che i tre livelli siano presenti e abbiano almeno 90 parole in Scopri, 230 in Capisci, 100 in Sperimenta, 120 in Interpreta e 75 in Collega;
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

## Le prossime discipline

Restano da riscrivere fisica, biologia e matematica, una disciplina per volta. Per ciascuna si aggiunge il prefisso a `REWRITTEN`. Per le unità di fisica da 1 a 25 serve anche cambiare la composizione dei livelli in `tools/build_curriculum.mjs`, oppure spostare le unità fra quelle scritte a mano in `content/curriculum/prototypes.json`.
