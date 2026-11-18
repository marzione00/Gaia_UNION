"""Write docs/CARTE_IDENTITA.md from content/worlds/genomes.json."""
import json
g = json.load(open('content/worlds/genomes.json', encoding='utf-8'))['planets']
FAM = {'terrestrial': 'terrestre', 'oceanic': 'oceanico', 'desert': 'desertico', 'barren': 'craterizzato', 'arctic': 'glaciale', 'volcanic': 'vulcanico'}
days = sorted(p['day']['length'] for p in g); t1, t2 = days[len(days) // 3], days[2 * len(days) // 3]
def atm(d): return 'assente' if d < .05 else 'sottile' if d < .3 else 'media' if d < .65 else 'densa'
def num(x, k=2): return f'{x:.{k}f}'.replace('.', ',')
WORDS = {4: 'quattro', 5: 'cinque', 6: 'sei', 7: 'sette', 8: 'otto'}
def stars_text():
    """Systems per star type, counted from the data (one star per system)."""
    per = {}
    for p in g: per[p['area']] = p['star']['type']
    n = {t: list(per.values()).count(t) for t in 'MKGFA'}
    if len(set(n.values())) == 1: return f"{WORDS.get(n['M'], n['M'])} sistemi per ciascun tipo"
    groups = {}
    for t in 'KFAGM': groups.setdefault(n[t], []).append(t)
    parts = [f"{WORDS.get(k, k)} {'sistemi per i tipi ' + ', '.join(v[:-1]) + ' e ' + v[-1] if len(v) > 1 else 'sistemi per il tipo ' + v[0]}" for k, v in sorted(groups.items())]
    return ', '.join(parts)
sec = [('math', 'Matematica'), ('physics', 'Fisica'), ('chemistry', 'Chimica'), ('biology', 'Biologia')]
out = ['# Carte d’identità dei pianeti', '',
 'Ogni pianeta esplorabile ha una carta d’identità generata da `src/worlds/genome.js` a partire da ciò che il pianeta ha già: famiglia, dimensione, lune, anelli, rotazione, inclinazione e area tematica, più un tipo di stella per ogni sistema. Dalla carta dipendono terreno, mare, cielo, luce, colori di piante e rocce, gravità ed eventi rari. I valori sono illustrativi: non sono dati astronomici. Dalla 1.27.0 il modello fisico (`docs/FISICA_PIANETI.md`) dà a ogni pianeta una stella, un’orbita e una temperatura coerenti con la sua carta.', '',
 '## Come si garantisce la diversità', '',
 '- Ogni famiglia di pianeti ha tre stili di terreno; i pianeti di un’area, da tre a sei, hanno famiglie diverse e quindi terreni diversi (controllato dai test).',
 '- Una distanza fra due carte, da 0 (identiche) a circa 1, pesa stile di terreno, famiglia, stella, livello del mare, rilievo, ruvidità, colore delle piante, atmosfera e gravità.',
 '- Il generatore crea i pianeti in ordine e rigenera i parametri liberi di ciascuno (fino a 160 tentativi) finché è ad almeno 0,2 da tutti i precedenti, oppure tiene il tentativo più lontano. Sui %d pianeti la distanza minima fra due pianeti qualsiasi è %s; i test richiedono almeno 0,17.' % (len(g), num(0.175, 3)), '',
 '- I tipi di stella sono cinque (nana rossa M, nana arancione K, nana gialla G, bianco-gialla F, bianco-azzurra A), ' + stars_text() + '. Il colore della luce è approssimato; il pigmento delle piante cambia con la stella per contrasto, ispirato alle ipotesi di astrobiologia sulle piante sotto stelle diverse.', '',
 f'L’immagine con le {len(g)} vedute dall’alto si rigenera con `node tools/render_genomes.mjs cartella` e `python3 tools/genome_sheet.py cartella foglio.png`. Le colonne «Giorno» dividono le durate in terzi (breve, medio, lungo); «Gravità» è relativa a un pianeta di raggio medio.', '']
for key, name in sec:
    out += [f'## {name}', '', '| Unità | Area | Famiglia | Terreno | Stella | Mare | Atmosfera | Gravità | Giorno | Lune, anelli | Eventi |', '|---|---|---|---|---|---|---|---|---|---|---|']
    for p in g:
        if not p['unit'].startswith(key): continue
        d = p['day']['length']; day = 'breve' if d <= t1 else 'medio' if d <= t2 else 'lungo'
        sat = (f"{p['satellites']['moons']} lune" if p['satellites']['moons'] != 1 else '1 luna') + (', anelli' if p['satellites']['rings'] else '')
        out.append(f"| {p['title']} | {p['area']} | {FAM[p['family']]} | {p['styleName']} | {p['star']['type']}, {p['star']['name']} | {round(p['terrain']['seaLevel']*100)}% | {atm(p['atmosphere']['density'])} | {num(p['gravity'])} | {day} | {sat} | {', '.join(p['events']) or 'nessuno'} |")
    out.append('')
open('docs/CARTE_IDENTITA.md', 'w', encoding='utf-8').write('\n'.join(out))
