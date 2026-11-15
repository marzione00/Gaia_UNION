# Daisyworld: formulazione, unità e limiti

## Riferimento e ambito

Watson, A. J. e Lovelock, J. E. (1983), *Biological homeostasis of the global environment: the parable of Daisyworld*, Tellus 35B, 284–289. Fonte primaria: https://www.jameslovelock.org/biological-homeostasis-of-the-global-environment-the-parable-of-daisyworld/

Il motore usa la famiglia di equazioni 1–6: due coperture biologiche modificano l’albedo e rispondono alle temperature locali. È un esperimento ideale di retroazione, non una dimostrazione che la Terra o ogni biosfera si autoregolino sempre. La superficie esagonale dell’esplorazione è una scena illustrativa separata, non il dominio discreto di queste equazioni.

## Convenzioni di questa implementazione

`a_b` e `a_w` sono frazioni adimensionali. Con tutta la superficie fertile, `x = 1 - a_b - a_w`. L’albedo globale è la media pesata di scure, chiare e suolo. L’energia soddisfa `sigma * T_e^4 = S * L * (1 - A)`, con temperature radiative in kelvin. La temperatura locale segue `T_i^4 = T_e^4 + q * (A - A_i)`. La crescita assume `beta_i = max(0, 1 - c * (22.5 - t_i)^2)`, con `t_i` in °C. La variazione di copertura è `a_i * (x * beta_i - gamma)`.

| Parametro | Valore iniziale | Unità / significato |
|---|---:|---|
| S | 917 | W/m², coefficiente del modello |
| L | 1 | Moltiplicatore adimensionale, controllo 0,6–1,6 |
| sigma | 5,67 × 10⁻⁸ | W m⁻² K⁻⁴ |
| A_b / A_g / A_w | 0,25 / 0,50 / 0,75 | Albedo |
| q | 2 × 10⁹ | K⁴; contrasto termico scelto per questa implementazione |
| gamma | 0,30 | Mortalità per unità di tempo del modello |
| c | 0,003265 | Coefficiente della risposta termica |
| a_b(0), a_w(0) | 0,01 / 0,01 | Coperture iniziali |
| dt | 0,1 | Passo adimensionale |
| Durata | 300 | Tempo del modello, **non anni** |

La conversione usa 273,15 K. Parametri, discretizzazione e conversione sono dichiarati: non si afferma di riprodurre pixel per pixel una figura del lavoro originale.

## Calcolo e grafici

L’integrazione usa Runge–Kutta di ordine quattro. L’ultimo passo termina esattamente alla durata richiesta. Vengono controllate finitezza, albedo ordinate, coperture non negative e disponibilità di superficie. Il residuo mostrato è il massimo valore assoluto delle due derivate finali: sotto `1e-7` si segnala convergenza numerica, **non una prova generale di stabilità**.

La curva rispetto a L è una scansione di 51 integrazioni indipendenti da 0,6 a 1,6. Ogni campione riparte dalle coperture iniziali: non è una traiettoria temporale o una scansione di isteresi. La temperatura del mondo senza organismi è calcolata con l’albedo del suolo. Frazioni e temperature hanno assi separati.

L’esperimento corrente ricalcola lo stato finale quando muovi L o gamma. Lo scenario A conserva i parametri e il risultato del momento in cui viene salvato; B è quello corrente. L’esportazione JSON include parametri, metodo, residuo e traccia. Il CSV riporta tempo, temperature, frazioni e albedo.

## Esclusioni e falsificabilità

Non sono inclusi oceani dinamici, nubi, chimica atmosferica, migrazione, evoluzione o competizione spaziale. I marcatori sulla sfera visualizzano soltanto le percentuali arrotondate su 180 posizioni. Non sono individui né fotografie satellitari.

I test confrontano passi 0,1 e 0,05, bilancio radiativo, assenza di crescita da popolazioni nulle, conservazione della superficie e regimi con estinzione. Questi controlli verificano l’implementazione delle equazioni assunte, non la validità delle assunzioni per un sistema reale.

## Dossier didattico

Le sei sezioni `content/gaia.json` sono nuove per GAIA, distinte dalla dispensa matematica dell’utente. I collegamenti a Funzioni, Esponenziali e P08 sono un progetto didattico, non rimandi attribuiti agli autori della dispensa. Un ulteriore riferimento di approfondimento è Weber (2001), *On homeostasis in Daisyworld*: https://www.knmi.nl/research/publications/on-homeostasis-in-daisyworld
