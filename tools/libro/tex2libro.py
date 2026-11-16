#!/usr/bin/env python3
"""Converts the physics handout (LaTeX) into the chapters of «Il libro della galassia».

Usage:
    python3 tools/libro/tex2libro.py --dispensa PATH/TO/fisica_build [--no-figure]

The handout is not part of the repository: the generated chapters (content/libro/*.md)
and figures (content/libro/fig/*.svg) are committed, and this script documents how they
were produced. The assignment of handout sections to galaxy units lives in
tools/libro/mappa.json, the GAIA openings in tools/libro/aperture.md.
"""
import argparse, hashlib, json, os, re, shutil, subprocess, sys, tempfile
from collections import OrderedDict, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
ORDER = ['00_vettori', '01_cinematica', '02_dinamica', '03_energia', '06_gravitazione',
         '05_oscillazioni', '04_termodinamica', '07_elettromagnetismo', '08_fisica_moderna_quantistica']
CHAPTER_NAMES = ['Strumenti matematici e vettori', 'Cinematica', 'Dinamica', 'Lavoro, energia e potenza',
                 'Gravitazione e meccanica celeste', 'Moto armonico, onde meccaniche e suono',
                 'Termodinamica e meccanica statistica', 'Elettromagnetismo, onde e ottica',
                 'Fisica moderna e meccanica ondulatoria']

warnings = defaultdict(set)

# ---------------------------------------------------------------- LaTeX reading

def strip_comments(s):
    return re.sub(r'(?<!\\)%[^\n]*', '', s)

def flatten(root, path):
    p = os.path.join(root, path if path.endswith('.tex') else path + '.tex')
    s = strip_comments(open(p, encoding='utf-8').read())
    # The site shows solutions: keep the \ifshowsolutions branch, drop any \else branch.
    s = re.sub(r'\\ifshowsolutions\b([\s\S]*?)(?:\\else\b[\s\S]*?)?\\fi\b', lambda m: m.group(1), s)
    def rep(m):
        name = m.group(1)
        if name in ('licenza',):
            return ''
        q = os.path.join(root, name if name.endswith('.tex') else name + '.tex')
        if not os.path.exists(q):
            warnings['input mancante'].add(name)
            return ''
        return '\n' + flatten(root, name) + '\n'
    return re.sub(r'\\(?:input|include)\{([^}]+)\}', rep, s)

def group(s, i, open_='{', close='}'):
    """Returns (content, end) for the balanced group starting at s[i] == open_."""
    assert s[i] == open_, (s[i:i + 40], open_)
    depth, j = 0, i
    while j < len(s):
        c = s[j]
        if c == '\\':
            j += 2
            continue
        if c == open_:
            depth += 1
        elif c == close:
            depth -= 1
            if depth == 0:
                return s[i + 1:j], j + 1
        j += 1
    raise ValueError('gruppo non chiuso: ' + s[i:i + 80])

def skip_ws(s, i):
    while i < len(s) and s[i] in ' \t\n':
        i += 1
    return i

def args(s, i, n, opt=False):
    """Reads an optional [..] (if opt) and n {..} arguments after position i."""
    o = None
    j = skip_ws(s, i)
    if opt and j < len(s) and s[j] == '[':
        o, i = group(s, j, '[', ']')
    out = []
    for _ in range(n):
        j = skip_ws(s, i)
        if j >= len(s) or s[j] != '{':
            break
        a, i = group(s, j)
        out.append(a)
    return o, out, i

def find_end(s, i, env):
    """Index of the matching \\end{env} starting the search at i (handles nesting)."""
    depth, pat = 1, re.compile(r'\\(begin|end)\{' + re.escape(env) + r'\}')
    for m in pat.finditer(s, i):
        depth += 1 if m.group(1) == 'begin' else -1
        if depth == 0:
            return m.start(), m.end()
    raise ValueError('ambiente non chiuso: ' + env)

# ---------------------------------------------------------------- units (siunitx)

UNITS = {'metre': 'm', 'meter': 'm', 'second': 's', 'kilogram': 'kg', 'gram': 'g', 'newton': 'N', 'joule': 'J',
         'watt': 'W', 'kelvin': 'K', 'pascal': 'Pa', 'hertz': 'Hz', 'coulomb': 'C', 'volt': 'V', 'ampere': 'A',
         'ohm': '\\Omega', 'tesla': 'T', 'farad': 'F', 'henry': 'H', 'weber': 'Wb', 'litre': 'L', 'liter': 'L',
         'mole': 'mol', 'radian': 'rad', 'hour': 'h', 'minute': 'min', 'day': 'd', 'electronvolt': 'eV',
         'decibel': 'dB', 'bar': 'bar', 'steradian': 'sr', 'candela': 'cd', 'siemens': 'S', 'becquerel': 'Bq',
         'astronomicalunit': 'au', 'atomicmassunit': 'u', 'dalton': 'Da', 'calorie': 'cal', 'tonne': 't',
         'lightyear': 'ly', 'parsec': 'pc', 'year': 'anni', 'angstrom': '\\unicode{x212B}', 'atm': 'atm',
         'atmosphere': 'atm', 'celsius': '°C', 'EUR': '\\text{€}', 'rev': 'giri', 'kWh': 'kWh', 'erg': 'erg', 'gauss': 'G', 'hectare': 'ha', 'barn': 'b', 'lumen': 'lm', 'lux': 'lx'}
PREFIX = {'yocto': 'y', 'zepto': 'z', 'atto': 'a', 'femto': 'f', 'pico': 'p', 'nano': 'n', 'micro': '\\mu ', 'milli': 'm',
          'centi': 'c', 'deci': 'd', 'deca': 'da', 'hecto': 'h', 'kilo': 'k', 'mega': 'M', 'giga': 'G', 'tera': 'T', 'peta': 'P', 'exa': 'E'}

def unit(u):
    u = u.strip()
    if not u:
        return ''
    if '\\' not in u:
        return u.replace('.', '\\,').replace('~', '\\,')
    num, den, pending, per, last = [], [], '', False, None
    for t in re.findall(r'\\[A-Za-z]+(?:\{[^}]*\})?|[^\\]+', u):
        if not t.startswith('\\'):
            t = t.strip().strip('.')
            if t:
                last = den if per else num
                last.append(t)
                per = False
            continue
        name = t[1:].split('{')[0]
        if name == 'per':
            per = True
        elif name in PREFIX:
            pending += PREFIX[name]
        elif name in UNITS:
            last = den if per else num
            last.append(pending + UNITS[name])
            pending, per = '', False
        elif name in ('squared', 'cubed', 'tothe'):
            e = {'squared': '2', 'cubed': '3'}.get(name) or t.split('{', 1)[1].rstrip('}')
            if last:
                last[-1] = f'{last[-1]}^{{{e}}}' if len(e) > 1 else f'{last[-1]}^{e}'
        elif name == 'degree':
            num.append('°')
        elif name in ('degreeCelsius', 'celsius'):
            num.append('°C')
        elif name == 'percent':
            num.append('%')
        else:
            warnings['unità sconosciuta'].add(name)
            num.append(name)
    if num == ['°'] or num == ['°C'] or num == ['%']:
        return num[0]
    out = '\\,'.join(num)
    if den:
        if not num:
            out = '\\,'.join(re.sub(r'\^\{?(-?\d+)\}?$', lambda m: '^{-' + m.group(1) + '}', x) if '^' in x else x + '^{-1}' for x in den)
        else:
            out += '/' + (f'({"\\,".join(den)})' if len(den) > 1 else den[0])
    return out

def number(n):
    n = n.strip()
    n = re.sub(r'\s+', '', n)
    m = re.fullmatch(r'([-+]?)([\d.]*\d)(?:[eE]([-+]?\d+))?', n)
    if m:
        sign, mant, exp = m.groups()
        mant = mant.replace('.', '{,}')
        if exp is not None:
            exp = str(int(exp))
            return f'{sign}{mant}\\times10^{{{exp}}}' if mant not in ('1',) else f'{sign}10^{{{exp}}}'
        return sign + mant
    n = re.sub(r'(?<=\d)\.(?=\d)', '{,}', n)
    n = re.sub(r'(?<=\d)[eE]([-+]?\d+)', lambda m: f'\\times10^{{{int(m.group(1))}}}', n)
    return n.replace('x', '\\times')

def si(value, u):
    v, uu = number(value), unit(u)
    if uu in ('°',):
        return f'{v}^\\circ'
    if uu in ('°C',):
        return f'{v}\\,{{}}^\\circ\\mathrm{{C}}'
    if uu == '%':
        return f'{v}\\,\\%'
    return f'{v}\\un{{{uu}}}' if uu else v

# ---------------------------------------------------------------- math

class Ctx:
    """Per-unit state: figures, equation tags, citations."""
    def __init__(self, unit_id):
        self.unit = unit_id
        self.figures = []      # (file, snippet, caption)
        self.eq = {}           # label -> tag
        self.cites = []        # bibliography keys in order of first use
        self.labels = {}       # label -> text used by \ref

def fix_math(m, ctx):
    out, i = [], 0
    while True:
        k = m.find('\\', i)
        if k < 0:
            out.append(m[i:])
            break
        out.append(m[i:k])
        mm = re.match(r'\\([A-Za-z]+)', m[k:])
        if not mm:
            out.append(m[k:k + 2])
            i = k + 2
            continue
        name, j = mm.group(1), k + len(mm.group(0))
        if name in ('SI', 'qty'):
            _, a, j = args(m, j, 2, opt=True)
            out.append(si(a[0], a[1]))
        elif name == 'SIrange':
            _, a, j = args(m, j, 3, opt=True)
            out.append(f'{number(a[0])}\\text{{–}}{si(a[1], a[2])}')
        elif name in ('si', 'unit'):
            _, a, j = args(m, j, 1, opt=True)
            uu = unit(a[0])
            out.append('^\\circ' if uu == '°' else f'\\mathrm{{{uu}}}')
        elif name == 'num':
            _, a, j = args(m, j, 1, opt=True)
            out.append(number(a[0]))
        elif name == 'mps':
            out.append('\\un{m/s}')
        elif name == 'mpss':
            out.append('\\un{m/s^2}')
        elif name == 'N' :
            out.append('\\un{N}')
        elif name == 'kg':
            out.append('\\un{kg}')
        elif name == 'bm':
            out.append('\\boldsymbol')
        elif name in ('label',):
            _, a, j = args(m, j, 1)
            if a and a[0] not in ctx.eq:
                ctx.eq[a[0]] = str(len(ctx.eq) + 1)
                out.append(f'\\tag{{{ctx.eq[a[0]]}}}')
        elif name in ('eqref', 'ref'):
            _, a, j = args(m, j, 1)
            out.append(f'\\text{{({ctx.eq[a[0]]})}}' if a[0] in ctx.eq else '\\text{(?)}')
        elif name in ('nonumber', 'notag', 'displaybreak', 'allowbreak'):
            pass
        elif name in ('textcolor',):
            _, a, j = args(m, j, 2)
            out.append('{' + a[1] + '}')
        elif name == 'color':
            _, a, j = args(m, j, 1)
        elif name == 'ensuremath':
            _, a, j = args(m, j, 1)
            out.append(a[0])
        elif name == 'mbox':
            out.append('\\text')
        elif name == 'intertext':
            _, a, j = args(m, j, 1)
            out.append('\\\\ \\text{' + a[0] + '}\\\\')
        elif name in ('degree',):
            out.append('^\\circ')
        elif name == 'percent':
            out.append('\\%')
        elif name == 'textsuperscript':
            out.append('^')
        else:
            out.append(mm.group(0))
        i = j
    s = ''.join(out)
    s = re.sub(r'(?<=\d)\.(?=\d)', '{,}', s)
    return s.strip()

# ---------------------------------------------------------------- text conversion

BOX = {  # env -> (block type, default title, title prefix)
    'formulabox': ('legge', '', ''), 'modellobox': ('nota', 'Ipotesi e modello', ''),
    'storiabox': ('storia', 'Storia e contesto', ''), 'quotidianobox': ('quotidiano', 'Applicazione concreta', ''),
    'pitfallbox': ('errore', 'Errore frequente', ''), 'methodbox': ('metodo', 'Metodo operativo', ''),
    'discretebox': ('approfondimento', 'Percorso discreto e numerico', ''), 'calculusbox': ('approfondimento', 'Derivazione continua', 'Calcolo: '),
    'pontibox': ('approfondimento', 'Collegamenti fra modelli', ''), 'letturabox': ('nota', 'Guida alla lettura', ''),
    'nucleobox': ('nota', 'Nucleo', ''), 'checkpoint': ('sintesi', 'Sintesi concettuale', ''),
    'verificabox': ('sintesi', 'Autoverifica', ''), 'obiettivi': ('obiettivi', '', ''),
    'capitolobox': ('nota', 'Problema fisico', ''), 'dimostrazione': ('approfondimento', '', 'Dimostrazione: '),
    'worked': ('esempio', '', ''), 'casostudio': ('approfondimento', '', 'Caso di studio: '),
    'laboratoriobox': ('approfondimento', '', 'Attività sperimentale: '), 'soluzione': ('nota', 'Svolgimento', ''),
}
MANDATORY_TITLE = {'formulabox', 'worked', 'casostudio', 'laboratoriobox', 'dimostrazione'}
SKIP_ENVS = {'docentebox'}
DISPLAY = {'equation', 'equation*', 'align', 'align*', 'gather', 'gather*', 'multline', 'multline*', 'displaymath'}
LABELS = {'passo': None, 'ipotesi': 'Ipotesi', 'derivazione': 'Passaggi', 'significato': 'Significato fisico',
          'limiti': 'Limiti di validità', 'campolaboratorio': None}
DROP0 = {'noindent', 'smallskip', 'medskip', 'bigskip', 'clearpage', 'newpage', 'centering', 'small', 'footnotesize',
         'scriptsize', 'normalsize', 'large', 'Large', 'phantomsection', 'hfill', 'vfill', 'raggedright', 'justifying',
         'par', 'newline', 'linebreak', 'break', 'relax', 'protect', 'leavevmode', 'nopagebreak', 'pagebreak', 'item',
         'sloppy', 'itshape', 'bfseries', 'upshape', 'normalfont', 'selectfont', 'strut', 'quad', 'qquad', 'xspace', 'unskip', 'ignorespaces', 'hline', 'toprule', 'midrule', 'bottomrule', 'cmidrule'}
DROP1 = {'index', 'Needspace', 'needspace', 'vspace', 'hspace', 'licenzacapitolo', 'addcontentsline', 'pdfbookmark',
         'markboth', 'setlength', 'phantom', 'hypertarget', 'addvspace', 'enlargethispage', 'rule', 'vspace*', 'hspace*', 'captionsetup', 'setcounter', 'addtocounter', 'color', 'colorbox'}
KEEP1 = {'textrm', 'textsf', 'textnormal', 'textup', 'mbox', 'makebox', 'text', 'textsc', 'hbox', 'textmd', 'NoHyper', 'mathrm'}

def is_diag_macro(name):
    return name.startswith('Diag')

class Conv:
    def __init__(self, ctx, bib, labels):
        self.ctx, self.bib, self.labels = ctx, bib, labels

    # Converts a LaTeX body to markdown. nested=True when inside a block.
    def text(self, s, nested=False):
        out, i, n = [], 0, len(s)
        while i < n:
            c = s[i]
            if c == '$':
                if s.startswith('$$', i):
                    e = s.index('$$', i + 2)
                    out.append(self.display(s[i + 2:e]))
                    i = e + 2
                else:
                    e = i + 1
                    while s[e] != '$' or s[e - 1] == '\\':
                        e += 1
                    out.append(self.inline_math(s[i + 1:e]))
                    i = e + 1
                continue
            if c == '\\':
                if s.startswith('\\[', i):
                    e = s.index('\\]', i)
                    out.append(self.display(s[i + 2:e]))
                    i = e + 2
                    continue
                if s.startswith('\\(', i):
                    e = s.index('\\)', i)
                    out.append(self.inline_math(s[i + 2:e]))
                    i = e + 2
                    continue
                m = re.match(r'\\([A-Za-z]+\*?|.)', s[i:])
                name, j = m.group(1), i + len(m.group(0))
                r, j = self.command(name, s, j, nested)
                out.append(r)
                i = j
                continue
            if c == '~':
                out.append('\u00a0')
                i += 1
                continue
            if c in '{}':
                i += 1
                continue
            if c == '&':
                out.append(' ')
                i += 1
                continue
            out.append(c)
            i += 1
        t = ''.join(out)
        t = t.replace('---', '–').replace('--', '–').replace('``', '“').replace("''", '”')
        t = re.sub(r'[ \t]+\n', '\n', t)
        t = re.sub(r'\n{3,}', '\n\n', t)
        return t

    def inline_math(self, m):
        return '$' + re.sub(r'\s*\n\s*', ' ', fix_math(m, self.ctx)) + '$'

    def display(self, m):
        body = fix_math(m, self.ctx)
        body = re.sub(r'\n\s*\n', '\n', body).strip()
        return '\n\n$$' + body + '$$\n\n'

    def command(self, name, s, j, nested):
        ctx = self.ctx
        if name == 'begin':
            _, a, j2 = args(s, j, 1)
            env = a[0]
            start, end = find_end(s, j2, env)
            body = s[j2:start]
            return self.environment(env, body, nested), end
        if name in ('section', 'section*', 'subsection', 'subsection*', 'subsubsection', 'subsubsection*', 'paragraph', 'paragraph*'):
            _, a, j = args(s, j, 1, opt=True)
            t = self.text(a[0], True).strip()
            if name.startswith('sub') and not nested:
                return f'\n\n### {t}\n\n', j
            return f'\n\n**{t}.** ', j
        if name == 'aperturaesercizi':
            _, a, j = args(s, j, 2)
            t = self.text(a[0], True).strip()
            d = self.text(a[1], True).strip() if len(a) > 1 else ''
            return (f'\n\n### {t}\n\n' if not nested else f'\n\n**{t}.** ') + (f'*{d}*\n\n' if d else ''), j
        if name in LABELS:
            _, a, j = args(s, j, 1)
            label = LABELS[name] or self.text(a[0], True).strip().rstrip('.')
            rest = '' if LABELS[name] is None else self.text(a[0], True).strip()
            return f'\n\n**{label}.** {rest}', j
        if name == 'risultato':
            _, a, j = args(s, j, 1)
            return '\n\n$$\\boxed{' + fix_math(a[0], ctx) + '}$$\n\n', j
        if name == 'attenzione':
            _, a, j = args(s, j, 1)
            return '\n\n**Attenzione.** ' + self.text(a[0], True).strip() + '\n\n', j
        if name == 'condizioneuso':
            _, a, j = args(s, j, 1)
            return "\n\n**Condizione d'uso.** " + self.text(a[0], True).strip() + '\n\n', j
        if name == 'unitcheck':
            _, a, j = args(s, j, 1)
            return '*Controllo dimensionale:* ' + self.text(a[0], True).strip(), j
        if name in ('emph', 'textit', 'textsl'):
            _, a, j = args(s, j, 1)
            t = self.text(a[0], True).strip()
            return (f'*{t}*' if t and '*' not in t else t), j
        if name in ('textbf', 'parolachiave'):
            _, a, j = args(s, j, 1)
            t = self.text(a[0], True).strip()
            return (f'**{t}**' if t and '*' not in t else t), j
        if name == 'texttt':
            _, a, j = args(s, j, 1)
            return '`' + self.text(a[0], True).strip() + '`', j
        if name == 'enquote':
            _, a, j = args(s, j, 1)
            return '«' + self.text(a[0], True) + '»', j
        if name == 'texorpdfstring':
            _, a, j = args(s, j, 2)
            return self.text(a[0], True), j
        if name in KEEP1:
            _, a, j = args(s, j, 1, opt=True)
            return self.text(a[0], True) if a else '', j
        if name in ('url',):
            _, a, j = args(s, j, 1)
            u = a[0]
            return (f'[{u}]({u})' if u.startswith('https://') else u), j
        if name == 'href':
            _, a, j = args(s, j, 2)
            return (f'[{self.text(a[1], True)}]({a[0]})' if a[0].startswith('https://') else self.text(a[1], True)), j
        if name == 'footnote':
            _, a, j = args(s, j, 1)
            return ' (' + self.text(a[0], True).strip() + ')', j
        if name in ('cite', 'citep', 'citet'):
            o, a, j = args(s, j, 1, opt=True)
            nums = []
            for k in [x.strip() for x in a[0].split(',')]:
                if k not in self.bib:
                    warnings['citazione sconosciuta'].add(k)
                    continue
                if k not in ctx.cites:
                    ctx.cites.append(k)
                nums.append(str(ctx.cites.index(k) + 1))
            return (' [' + ', '.join(nums) + '](#fonti)' if nums else ''), j
        if name in ('ref', 'eqref', 'autoref'):
            _, a, j = args(s, j, 1)
            key = a[0]
            if key in ctx.eq:
                return f'({ctx.eq[key]})', j
            if key in ctx.labels:
                return ctx.labels[key], j
            return '\x00REF:' + key + '\x00', j
        if name == 'label':
            _, a, j = args(s, j, 1)
            return '', j
        if name == 'SI' or name == 'qty':
            _, a, j = args(s, j, 2, opt=True)
            return '$' + si(a[0], a[1]) + '$', j
        if name == 'si':
            _, a, j = args(s, j, 1, opt=True)
            uu = unit(a[0])
            if uu == '%' or uu == '\\%':
                return '%', j
            return ('°' if uu == '°' else f'$\\mathrm{{{uu}}}$'), j
        if name == 'num':
            _, a, j = args(s, j, 1, opt=True)
            return '$' + number(a[0]) + '$', j
        if name == 'SIrange':
            _, a, j = args(s, j, 3, opt=True)
            return f'${number(a[0])}\\text{{–}}{si(a[1], a[2])}$', j
        if name in ('mps', 'mpss', 'N', 'kg'):
            return '$' + fix_math('\\' + name, ctx) + '$', j
        if name in ('schemacaption', 'diagramcaption', 'caption'):
            _, a, j = args(s, j, 1, opt=True)
            return '', j
        if is_diag_macro(name):
            snippet, j = self.macro_call(name, s, j)
            return self.figure(snippet, self.macro_caption(name, snippet)), j
        if name in DROP0:
            return (' ' if name in ('quad', 'qquad') else ''), j
        if name in DROP1 or name.rstrip('*') in DROP1:
            _, a, j = args(s, j, 1, opt=True)
            return '', j
        if name == '\\':
            if j < len(s) and s[j] == '[':
                _, j = group(s, j, '[', ']')
            return '\n', j
        simple = {',': '\u2009', ' ': ' ', '%': '%', '&': '&', '#': '#', '_': '_', '$': '＄', '{': '{', '}': '}',
                  '-': '', '/': '', '@': '', ';': ' ', ':': ' ', '!': '', 'ldots': '…', 'dots': '…', 'textdegree': '°',
                  'S': '§', 'copyright': '©', 'LaTeX': 'LaTeX', 'TeX': 'TeX', 'textendash': '–', 'textemdash': '–',
                  'guillemotleft': '«', 'guillemotright': '»', 'og': '«', 'fg': '»', 'textellipsis': '…', 'times': '×',
                  'euro': '€', 'textless': '<', 'textgreater': '>', 'ae': 'æ', 'oe': 'œ', 'ss': 'ß', 'o': 'ø', 'i': 'ı',
                  'textasciitilde': '~', 'OE': 'Œ', 'begingroup': '', 'endgroup': '', 'textbackslash': '\\', 'P': '¶', 'ccbysa': 'CC BY-SA', 'slash': '/'}
        if name in simple:
            return simple[name], j
        acc = {"'": {'e': 'é', 'a': 'á', 'i': 'í', 'o': 'ó', 'u': 'ú', 'E': 'É'}, '`': {'e': 'è', 'a': 'à', 'i': 'ì', 'o': 'ò', 'u': 'ù', 'E': 'È'},
               '"': {'o': 'ö', 'u': 'ü', 'a': 'ä', 'e': 'ë'}, '^': {'o': 'ô', 'e': 'ê', 'a': 'â'}, '~': {'n': 'ñ', 'a': 'ã'}, 'c': {'c': 'ç'}, 'v': {'s': 'š', 'c': 'č', 'z': 'ž', 'r': 'ř'}}
        if name in acc:
            k = skip_ws(s, j)
            if s[k] == '{':
                ch, j = group(s, k)
            else:
                ch, j = s[k], k + 1
            return acc[name].get(ch.strip(), ch), j
        warnings['comando sconosciuto'].add(name)
        return '', j

    def macro_call(self, name, s, j):
        """Reads the arguments of a \\Diag macro, returning the whole call."""
        k = j
        while True:
            t = skip_ws(s, k)
            if t < len(s) and s[t] in '{[':
                _, k = group(s, t, s[t], '}' if s[t] == '{' else ']')
            else:
                break
        return '\\' + name + s[j:k], k

    def macro_caption(self, name, call):
        d = self.labels.get('__macro__' + name)
        if not d:
            return ''
        nargs, defn = d
        argv = []
        k = len(name) + 1
        if call[k:k + 1] == '[':
            _, k = group(call, k, '[', ']')
        for _ in range(nargs):
            t = skip_ws(call, k)
            if t >= len(call) or call[t] != '{':
                break
            a, k = group(call, t)
            argv.append(a)
        m = re.search(r'\\schemacaption\{', defn)
        if not m:
            return ''
        cap, _ = group(defn, m.end() - 1)
        for idx, a in enumerate(argv, 1):
            cap = cap.replace(f'#{idx}', a)
        return self.text(cap, True).strip()

    def figure(self, snippet, caption):
        ctx = self.ctx
        n = len(ctx.figures) + 1
        fname = f'fig/{ctx.unit}-{n:02d}.svg'
        caption = re.sub(r'\s+', ' ', caption).strip()
        if caption and not re.search(r'[.!?]$', caption):
            caption += '.'
        ctx.figures.append((fname, snippet, caption))
        return f'\n\n![{caption}]({fname})\n\n'

    def environment(self, env, body, nested):
        ctx = self.ctx
        if env in SKIP_ENVS:
            return ''
        if env in DISPLAY:
            if env.startswith('align'):
                return self.display('\\begin{aligned}' + body + '\\end{aligned}')
            if env.startswith('gather'):
                return self.display('\\begin{gathered}' + body + '\\end{gathered}')
            if env.startswith('multline'):
                return self.display('\\begin{split}' + body + '\\end{split}')
            return self.display(body)
        if env in ('itemize', 'enumerate', 'description'):
            return self.listing(env, body)
        if env in ('tabular', 'tabularx', 'tabular*', 'longtable'):
            return self.table(env, body)
        if env in ('center', 'flushleft', 'flushright', 'minipage', 'quote', 'quotation', 'small', 'footnotesize', 'multicols', 'samepage'):
            if env in ('minipage', 'multicols'):
                body = re.sub(r'^\s*(\[[^\]]*\])?\s*\{[^}]*\}', '', body, count=1)
            return self.text(body, nested)
        if env in ('diagramma', 'figure', 'tikzpicture', 'figure*'):
            full = f'\\begin{{{env}}}{body}\\end{{{env}}}'
            if env == 'tikzpicture':
                return self.figure(full, '')
            cap = ''
            m = re.search(r'\\(diagramcaption|schemacaption|caption)\s*(\[[^\]]*\])?\s*\{', body)
            if m:
                c, _ = group(body, m.end() - 1)
                cap = self.text(c, True).strip()
                lab = m.group(2)[1:-1] if m.group(2) else None
                ml = re.search(r'\\label\{([^}]+)\}', body)
                for l in (lab, ml.group(1) if ml else None):
                    if l:
                        ctx.labels[l] = str(len(ctx.figures) + 1)
            if '\\includegraphics' in body:
                warnings['immagine raster'].add(body[:60])
                return ''
            if '\\begin{tikzpicture}' not in body and not re.search(r'\\Diag[A-Za-z]+', body):
                return self.text(body, nested)
            return self.figure(full, cap)
        if env in BOX:
            kind, default, prefix = BOX[env]
            if env == 'letturabox' and re.match(r'\s*\[\s*Risposte', body):
                kind = 'approfondimento'
            o, a, j = args(body, 0, 1 if env in MANDATORY_TITLE else 0, opt=True)
            title = (a[0] if env in MANDATORY_TITLE and a else None) or o or default
            title = prefix + self.text(title, True).strip() if (title or prefix) else ''
            inner = self.text(body[j:], True).strip()
            if nested:
                return f'\n\n**{title}.** ' + inner + '\n\n' if title else '\n\n' + inner + '\n\n'
            return f'\n\n::: {kind}{" " + title if title else ""}\n{self.block_body(inner)}\n:::\n\n'
        if env in ('exercise', 'soluzioneesercizio'):
            # Exercises reached here are nested in another box: render them as plain text.
            o, a, j = args(body, 0, 1 if env == 'exercise' else 0)
            head = ('**Esercizio: ' + self.text(a[0], True).strip() + '.** ') if env == 'exercise' and a else '**Soluzione.** '
            return '\n\n' + head + self.text(body[j:], True).strip() + '\n\n'
        warnings['ambiente sconosciuto'].add(env)
        return self.text(body, nested)

    def block_body(self, md):
        lines = [l.rstrip() for l in md.split('\n')]
        return '\n'.join(l for l in lines if l.strip() != ':::').strip()

    def listing(self, env, body):
        parts = re.split(r'\\item\b', body)
        items = []
        for p in parts[1:]:
            label = ''
            p = p.lstrip()
            if p.startswith('['):
                lab, k = group(p, 0, '[', ']')
                label, p = self.text(lab, True).strip(), p[k:]
            t = self.text(p, True).strip()
            figs = re.findall(r'\n*!\[[^\]]*\]\([^)]*\)\n*', t)
            for f in figs:
                t = t.replace(f, ' ')
            t = re.sub(r'\$\$([\s\S]*?)\$\$', lambda m: '$\\displaystyle ' + re.sub(r'\s*\n\s*', ' ', m.group(1)) + '$', t)
            t = re.sub(r'\s*\n\s*', ' ', t).strip()
            if label:
                t = f'**{label}** {t}'
            items.append((t, [f.strip() for f in figs]))
        mark = (lambda k: f'{k}. ') if env == 'enumerate' else (lambda k: '- ')
        lines = [mark(k) + t for k, (t, _) in enumerate(items, 1)]
        tail = [f for _, fs in items for f in fs]
        return '\n\n' + '\n'.join(lines) + '\n\n' + ('\n\n'.join(tail) + '\n\n' if tail else '')

    def table(self, env, body):
        body = re.sub(r'^\s*(\{[^}]*\}\s*)?\{[^{}]*(\{[^{}]*\}[^{}]*)*\}', '', body, count=1) if env in ('tabularx', 'tabular*') else re.sub(r'^\s*\{[^{}]*(\{[^{}]*\}[^{}]*)*\}', '', body, count=1)
        body = re.sub(r'\\(toprule|midrule|bottomrule|hline)\b', '', body)
        body = re.sub(r'\\cmidrule(\([^)]*\))?\{[^}]*\}', '', body)
        body = re.sub(r'\\multicolumn\{\d+\}\{[^}]*\}', '', body)
        rows = [r for r in re.split(r'\\\\(?:\[[^\]]*\])?', body) if r.strip()]
        cells = []
        for r in rows:
            parts, depth, cur = [], 0, ''
            k = 0
            while k < len(r):
                ch = r[k]
                if ch == '\\' and k + 1 < len(r):
                    cur += r[k:k + 2]
                    k += 2
                    continue
                if ch == '{':
                    depth += 1
                elif ch == '}':
                    depth -= 1
                if ch == '&' and depth == 0:
                    parts.append(cur)
                    cur = ''
                else:
                    cur += ch
                k += 1
            parts.append(cur)
            cells.append([re.sub(r'\s+', ' ', self.text(c, True)).strip().replace('|', '/') for c in parts])
        if not cells:
            return ''
        w = max(len(r) for r in cells)
        cells = [r + [''] * (w - len(r)) for r in cells]
        out = ['| ' + ' | '.join(cells[0]) + ' |', '|' + '---|' * w]
        out += ['| ' + ' | '.join(r) + ' |' for r in cells[1:]]
        return '\n\n' + '\n'.join(out) + '\n\n'

# ---------------------------------------------------------------- fragments

TOP_ENVS = set(BOX) | {'exercise', 'soluzioneesercizio', 'diagramma', 'figure', 'tikzpicture', 'docentebox'}

def fragments(body):
    """Splits a section body into top-level fragments, keeping their order."""
    out, i, buf = [], 0, []
    pat = re.compile(r'\\begin\{([A-Za-z*]+)\}|\\subsection\*?\s*\{|\\aperturaesercizi\s*\{|\\(Diag[A-Za-z]+)')
    while True:
        m = pat.search(body, i)
        if not m:
            buf.append(body[i:])
            break
        if m.group(1) and m.group(1) not in TOP_ENVS:
            # Non-box environment: keep it inside the prose.
            start, end = find_end(body, m.end(), m.group(1))
            buf.append(body[i:end])
            i = end
            continue
        buf.append(body[i:m.start()])
        if ''.join(buf).strip():
            out.append({'kind': 'prose', 'tex': ''.join(buf)})
        buf = []
        if m.group(1):
            env = m.group(1)
            start, end = find_end(body, m.end(), env)
            inner = body[m.end():start]
            title = ''
            if env in MANDATORY_TITLE or env == 'exercise':
                _, a, _ = args(inner, 0, 1, opt=True)
                title = a[0] if a else ''
            else:
                o, _, _ = args(inner, 0, 0, opt=True)
                title = o or ''
            out.append({'kind': env, 'tex': body[m.start():end], 'title': re.sub(r'\s+', ' ', title).strip()})
            i = end
        elif m.group(2):
            k = m.end()
            while True:
                t = skip_ws(body, k)
                if t < len(body) and body[t] == '{':
                    _, k = group(body, t)
                else:
                    break
            out.append({'kind': 'diag', 'tex': body[m.start():k], 'title': ''})
            i = k
        else:
            k = m.end() - 1
            t, k = group(body, k)
            if m.group(0).startswith('\\aperturaesercizi'):
                kk = skip_ws(body, k)
                if kk < len(body) and body[kk] == '{':
                    _, k = group(body, kk)
                out.append({'kind': 'gruppo', 'tex': body[m.start():k], 'title': t.strip()})
            else:
                out.append({'kind': 'subsection', 'tex': body[m.start():k], 'title': t.strip(), 'starred': '*' in m.group(0)})
            i = k
    return out

# ---------------------------------------------------------------- main

def load_toc(root):
    toc = {}
    for line in open(os.path.join(root, 'libro_digitale.toc'), encoding='utf-8'):
        m = re.match(r'\\contentsline \{(section|subsection)\}\{\\numberline \{([\d.]+)\}\{(.*)\}\}\{\d+\}', line)
        if m:
            toc[m.group(2)] = m.group(3)
    return toc

def load_bib(root):
    s = strip_comments(open(os.path.join(root, 'bibliografia.tex'), encoding='utf-8').read())
    bib = OrderedDict()
    for m in re.finditer(r'\\bibitem\{([^}]+)\}([\s\S]*?)(?=\\bibitem|\\end\{thebibliography\})', s):
        bib[m.group(1)] = m.group(2).strip()
    return bib

def load_glossary(root):
    s = strip_comments(open(os.path.join(root, 'glossario.tex'), encoding='utf-8').read())
    return [(m.group(1).strip(), m.group(2).strip()) for m in re.finditer(r'\\item\[([^\]]+)\]([\s\S]*?)(?=\\item\[|\\end\{description\})', s)]

def load_macros(root):
    out = {}
    for f in ('diagrammi.tex', 'diagrammi_esercizi.tex', 'diagrammi_quantistica.tex'):
        p = os.path.join(root, f)
        if not os.path.exists(p):
            continue
        s = strip_comments(open(p, encoding='utf-8').read())
        for m in re.finditer(r'\\newcommand\{\\(Diag[A-Za-z]+)\}(?:\[(\d)\])?(?:\[[^\]]*\])?\{', s):
            body, _ = group(s, m.end() - 1)
            out['__macro__' + m.group(1)] = (int(m.group(2) or 0), body)
    return out

def parse_handout(root, toc):
    """Returns {number: {'title', 'chapter', 'pieces': [(subnumber or None, title, fragments)]}}."""
    sections = OrderedDict()
    for ci, ch in enumerate(ORDER):
        src = flatten(root, 'chapters/' + ch)
        parts = re.split(r'\\section\{', src)
        for n, p in enumerate(parts[1:], 1):
            title, k = group('{' + p, 0)
            body = p[k - 1:]
            num = f'{ci}.{n}'
            assert toc.get(num, '').startswith(title[:12]), (num, title, toc.get(num))
            # Split into subsections (numbered ones only).
            chunks = re.split(r'(\\subsection\{)', body)
            pieces = [(None, title, chunks[0])]
            sub = 0
            for a in range(1, len(chunks), 2):
                stitle, kk = group('{' + chunks[a + 1], 0)
                sub += 1
                pieces.append((f'{num}.{sub}', stitle, chunks[a + 1][kk - 1:]))
            sections[num] = {'title': title, 'chapter': ci, 'pieces': pieces}
    return sections

def slug_num(n):
    return 's-' + n.replace('.', '-')

def render_unit(uid, spec, mapdata, sections, owner_frag, owner_piece, conv_args, aperture, glossary_for, extra=''):
    ctx = Ctx(uid)
    conv = Conv(ctx, *conv_args)
    md = []
    used = []
    exercises = []           # (group title, md)
    buckets = defaultdict(list)
    # Pre-assign figure labels and equation labels by scanning the text in order of rendering.
    pieces = []
    for ref in spec['sezioni']:
        if ref.count('.') == 2:
            sec = sections[ref.rsplit('.', 1)[0]]
            piece = next(p for p in sec['pieces'] if p[0] == ref)
            pieces.append((ref, piece[1], [piece]))
        else:
            sec = sections[ref]
            keep = [p for p in sec['pieces'] if p[0] is None or owner_piece.get(p[0], uid) == uid]
            pieces.append((ref, sec['title'], keep))
    for ref, title, plist in pieces:
        used.append(ref)
        title = spec.get('titoli', {}).get(ref, title)
        md.append(f'## {conv.text(title, True).strip()} {{#{slug_num(ref)}}}\n')
        group_title = None
        for pnum, ptitle, ptex in plist:
            if pnum and pnum != ref:
                md.append(f'### {conv.text(ptitle, True).strip()}\n')
            frs = fragments(ptex)
            k = 0
            while k < len(frs):
                f = frs[k]
                if f['kind'] == 'gruppo':
                    group_title = conv.text(f['title'], True).strip()
                elif f['kind'] == 'exercise':
                    sol = frs[k + 1] if k + 1 < len(frs) and frs[k + 1]['kind'] == 'soluzioneesercizio' else None
                    if sol:
                        k += 1
                    dest = owner_frag.get(('', f['title']), uid)
                    exercises_target = exercises if dest == uid else None
                    if exercises_target is not None:
                        exercises.append((group_title or conv.text(title, True).strip(), f, sol, False))
                elif f['kind'] == 'soluzioneesercizio':
                    warnings['soluzione senza traccia'].add(ref)
                elif f['kind'] == 'subsection':
                    md.append(f'### {conv.text(f["title"], True).strip()}\n')
                else:
                    dest = owner_frag.get(('', f.get('title', '')), uid) if f.get('title') else uid
                    if dest == uid:
                        md.append(conv.text(f['tex']).strip() + '\n')
                k += 1
    # Sections written for the site (tools/libro/integrazioni.md).
    if extra.strip():
        md.append(extra.strip() + '\n')
    # Fragments moved here from other sections or aggregates.
    for (num, f, sol, gtitle, bucket) in owner_frag.get(('__in__', uid), []):
        if f['kind'] == 'exercise':
            exercises.append((conv.text(gtitle or sections[num]['title'], True).strip(), f, sol, bucket == 'aggregato'))
        else:
            buckets[bucket_of(f, num, sections)].append(f)
    # Buckets.
    names = [('casi', 'Casi di studio e attività sperimentali'), ('esempi', 'Esempi svolti'),
             ('sintesi', 'Sintesi e autoverifica'), ('formulario', 'Formulario ragionato')]
    for key, heading in names:
        if not buckets[key]:
            continue
        md.append(f'## {heading} {{#{key}}}\n')
        for f in buckets[key]:
            if key == 'casi' and f['kind'] in ('casostudio', 'laboratoriobox'):
                prefix = 'Caso di studio' if f['kind'] == 'casostudio' else 'Attività sperimentale'
                inner = f['tex'][len('\\begin{' + f['kind'] + '}'):]
                _, a, j = args(inner, 0, 1)
                inner = inner[j:inner.rindex('\\end{')]
                md.append(f'### {prefix}: {conv.text(a[0], True).strip()}\n')
                md.append(conv.text(inner).strip() + '\n')
            else:
                md.append(conv.text(f['tex']).strip() + '\n')
    # Glossary.
    gl = glossary_for(uid)
    if gl:
        md.append('## Glossario {#glossario}\n')
        md.append('\n'.join(f'- **{conv.text(t, True).strip()}**: {conv.text(d, True).strip()}' for t, d in gl) + '\n')
    # Exercises.
    if exercises:
        md.append('## Esercizi {#esercizi}\n')
        md.append('Gli esercizi riprendono quelli della dispensa. Ogni soluzione è nascosta finché non la apri: prova prima a impostare il problema da solo.\n')
        last = None
        # Difficulty: rank the exercises of the chapter by the size of their solution and split in thirds.
        def score(item):
            _, f, sol, agg = item
            t = sol['tex'] if sol else ''
            return len(re.sub(r'\s+', '', t)) / 300 + len(re.findall(r'\\passo\b', t)) + len(re.findall(r'\\\[|\\begin\{(?:align|equation)', t)) / 2 + (2 if agg else 0)
        order = sorted(range(len(exercises)), key=lambda k: score(exercises[k]))
        levels = {}
        for rank, k in enumerate(order):
            levels[k] = 'base' if rank < len(order) / 3 else ('medio' if rank < 2 * len(order) / 3 else 'avanzato')
        for k_ex, (gtitle, f, sol, agg) in enumerate(exercises):
            if gtitle != last:
                md.append(f'### {gtitle}\n')
                last = gtitle
            inner = f['tex'][len('\\begin{exercise}'):f['tex'].rindex('\\end{exercise}')]
            _, a, j = args(inner, 0, 1)
            title = conv.text(a[0], True).strip()
            task = conv.text(inner[j:], True).strip()
            soltex = sol['tex'][len('\\begin{soluzioneesercizio}'):sol['tex'].rindex('\\end{soluzioneesercizio}')] if sol else ''
            lv = levels[k_ex]
            body = task + ('\n>>> soluzione\n' + conv.text(soltex, True).strip() if sol else '')
            body = '\n'.join(l for l in body.split('\n') if l.strip() != ':::')
            md.append(f'::: esercizio {title} [{lv}]\n{body}\n:::\n')
    return ctx, md, used

def bucket_of(f, num, sections):
    title = sections[num]['title']
    if f['kind'] in ('casostudio', 'laboratoriobox'):
        return 'casi'
    if f['kind'] == 'worked' or title.startswith('Esempi'):
        return 'esempi'
    if title.startswith('Formulario'):
        return 'formulario'
    if title.startswith('Sintesi'):
        return 'sintesi'
    return 'casi'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dispensa', required=True)
    ap.add_argument('--no-figure', action='store_true')
    ap.add_argument('--solo', help='genera soltanto queste unità (separate da virgole)')
    opt = ap.parse_args()
    root = os.path.abspath(opt.dispensa)
    mapdata = json.load(open(os.path.join(HERE, 'mappa.json'), encoding='utf-8'))
    aperture = parse_aperture(open(os.path.join(HERE, 'aperture.md'), encoding='utf-8').read())
    integrazioni = parse_aperture(open(os.path.join(HERE, 'integrazioni.md'), encoding='utf-8').read())
    toc = load_toc(root)
    bib = load_bib(root)
    macros = load_macros(root)
    sections = parse_handout(root, toc)
    units = mapdata['unita']

    # Ownership of moved subsections.
    owner_piece = {}
    for uid, spec in units.items():
        for ref in spec['sezioni']:
            if ref.count('.') == 2:
                owner_piece[ref] = uid
    moves = mapdata.get('spostamenti', {})
    owner_frag = defaultdict(list)
    # Titles of fragments that leave their section.
    for t, dest in moves.items():
        owner_frag[('', t)] = dest
    # Sections owned by each unit, to find the source owner of every fragment.
    sec_owner = {}
    for uid, spec in units.items():
        for ref in spec['sezioni']:
            if ref.count('.') == 1:
                sec_owner[ref] = uid
    aggregates = mapdata['aggregati']
    found_moves = set()
    for num, sec in sections.items():
        owner = aggregates.get(num) or sec_owner.get(num)
        if owner is None:
            continue
        agg = num in aggregates
        for pnum, ptitle, ptex in sec['pieces']:
            frs = fragments(ptex)
            gtitle = None
            k = 0
            while k < len(frs):
                f = frs[k]
                if f['kind'] in ('gruppo', 'subsection'):
                    gtitle = f['title']
                    if agg and f['kind'] == 'subsection':
                        pass
                    k += 1
                    continue
                sol = None
                if f['kind'] == 'exercise' and k + 1 < len(frs) and frs[k + 1]['kind'] == 'soluzioneesercizio':
                    sol = frs[k + 1]
                    k += 1
                title = f.get('title', '')
                dest = moves.get(title)
                if dest:
                    found_moves.add(title)
                if agg:
                    dest = dest or owner
                    if f['kind'] == 'diag' and owner_frag[('__in__', dest)]:
                        pass
                    owner_frag[('__in__', dest)].append((num, f, sol, gtitle, 'aggregato'))
                elif dest and dest != (owner_piece.get(pnum) or sec_owner.get(num)):
                    owner_frag[('__in__', dest)].append((num, f, sol, gtitle, 'sezione'))
                k += 1
    for t in moves:
        if t not in found_moves:
            warnings['spostamento senza frammento'].add(t)
    # Glossary terms: unit where the term is first indexed.
    glossary = load_glossary(root)
    first_index = {}
    for num, sec in sections.items():
        for pnum, ptitle, ptex in sec['pieces']:
            for m in re.finditer(r'\\index\{([^}!@]+)', ptex):
                first_index.setdefault(m.group(1).strip().lower(), pnum or num)
    for num, sec in sections.items():
        for pnum, ptitle, ptex in sec['pieces']:
            for m in re.finditer(r'\\(?:parolachiave|textbf|emph)\{([^{}]+)\}', ptex):
                first_index.setdefault('~' + m.group(1).strip().lower(), pnum or num)
    def piece_owner(ref):
        if ref in owner_piece:
            return owner_piece[ref]
        sec = ref if ref.count('.') == 1 else ref.rsplit('.', 1)[0]
        return sec_owner.get(sec) or aggregates.get(sec)
    gl_units = defaultdict(list)
    for term, d in glossary:
        ref = first_index.get(term.lower()) or first_index.get('~' + term.lower())
        if ref and piece_owner(ref):
            gl_units[piece_owner(ref)].append((term, d))
            continue
        # Fallback: the unit whose handout text uses the term most often.
        counts = defaultdict(int)
        pat = re.compile(r'(?<![\w])' + re.escape(term.lower()) + r'(?![\w])')
        for num, sec in sections.items():
            for pnum, ptitle, ptex in sec['pieces']:
                u = piece_owner(pnum or num)
                if u:
                    counts[u] += len(pat.findall(ptex.lower()))
        if counts and max(counts.values()) >= 1:
            gl_units[max(counts, key=counts.get)].append((term, d))
        else:
            warnings['glossario senza unità'].add(term)
    labels = dict(macros)
    targets = [u for u in units if not opt.solo or u in opt.solo.split(',')]
    os.makedirs(os.path.join(REPO, 'content/libro/fig'), exist_ok=True)
    allfigs = []
    report = []
    pending = []
    for uid in targets:
        spec = dict(units[uid])
        spec['fonte'] = fonte_string(spec['sezioni'], [num for (num, *_rest) in owner_frag.get(('__in__', uid), [])])
        ctx, body, used = render_unit(uid, spec, mapdata, sections, owner_frag, owner_piece, (bib, labels), aperture, lambda u: gl_units.get(u, []), integrazioni.get(uid, ''))
        # Sources.
        refs = ', '.join(spec['sezioni'])
        conv = Conv(ctx, bib, labels)
        where = spec['fonte'].split(', ', 1)[1]
        fonti = ['## Fonti {#fonti}\n',
                 f'Il testo, le formule, i diagrammi e gli esercizi di questo capitolo provengono dalla *{mapdata["fonte"]}* del corso '
                 f'({where}), consultabile nel lettore della galassia. Per la lettura sul sito sono cambiati l\'impaginazione, i colori '
                 'delle figure, la numerazione e la posizione di alcuni riquadri ed esercizi; la sezione iniziale è scritta per il pianeta di questa unità.\n']
        if ctx.cites:
            fonti.append('Opere citate nel testo:\n')
            fonti.append('\n'.join(f'{k}. ' + re.sub(r'\s+', ' ', conv.text(bib[c], True)).strip() for k, c in enumerate(ctx.cites, 1)) + '\n')
        front = ['---', f'unit: {uid}', f'titolo: {spec["titolo"]}', f'sottotitolo: {spec["sottotitolo"]}',
                 'volume: Volume di fisica', f'fonte: {spec["fonte"]}', 'origine: dispensa', '---', '']
        if uid not in aperture:
            warnings['apertura mancante'].add(uid)
        opening = ['## Prima di cominciare {#apertura}\n', aperture.get(uid, '').strip() + '\n']
        text = '\n'.join(front) + '\n'.join(opening + body + fonti)
        def ref(m):
            if m.group(1) in ctx.labels:
                return ctx.labels[m.group(1)]
            warnings['rimando non risolto'].add(m.group(1))
            return 'più avanti'
        text = re.sub('\x00REF:([^\x00]+)\x00', ref, text)
        text = chapter_links(text, uid, mapdata)
        text = tidy(text)
        pending.append((uid, text, ctx.figures))
        allfigs += ctx.figures
        words = len(re.findall(r'[\wÀ-ÿ]+', re.sub(r'\$\$[\s\S]*?\$\$|\$[^$]+\$', ' ', text)))
        report.append(f'{uid}: {words} parole, {len(ctx.figures)} figure, {text.count("::: esercizio")} esercizi, sezioni {",".join(used)}')
    if not opt.no_figure and allfigs:
        compile_figures(root, allfigs)
        # Remove figures of the regenerated units that are no longer referenced.
        keep = {os.path.basename(f) for f, _, _ in allfigs}
        figdir = os.path.join(REPO, 'content/libro/fig')
        for f in os.listdir(figdir):
            if f.rsplit('-', 1)[0] in targets and f not in keep:
                os.remove(os.path.join(figdir, f))
    for uid, text, figs in pending:
        for fname, _, _ in figs:
            p = os.path.join(REPO, 'content/libro', fname)
            if os.path.exists(p):
                m = re.search(r'width="(\d+)" height="(\d+)"', open(p, encoding='utf-8').read(2000))
                text = text.replace(f']({fname})', f']({fname} "{m.group(1)}x{m.group(2)}")')
        open(os.path.join(REPO, 'content/libro', uid + '.md'), 'w', encoding='utf-8').write(text)
    print('\n'.join(report))
    for k, v in sorted(warnings.items()):
        print(f'[{k}] {len(v)}: ' + ', '.join(sorted(v))[:1500])

def fonte_string(refs, extra):
    def key(r):
        return tuple(int(x) for x in r.split('.'))
    nums = sorted(set(refs), key=key)
    runs, cur = [], []
    for r in nums:
        if cur and r.count('.') == 1 and cur[-1].count('.') == 1 and r.split('.')[0] == cur[-1].split('.')[0] and int(r.split('.')[1]) == int(cur[-1].split('.')[1]) + 1:
            cur.append(r)
        else:
            if cur:
                runs.append(cur)
            cur = [r]
    if cur:
        runs.append(cur)
    text = ', '.join(c[0] if len(c) == 1 else f'{c[0]}-{c[-1]}' for c in runs)
    more = sorted(set(extra) - set(refs), key=key)
    label = 'sezione' if len(nums) == 1 and nums[0].count('.') == 1 else 'sezioni'
    out = f'Dispensa di fisica, {label} {text}'
    if more:
        out += ' e materiali delle sezioni ' + ', '.join(more)
    return out

def chapter_links(text, uid, mapdata):
    """«Capitolo 7» of the handout becomes a link to the galaxy chapter that holds that material."""
    table = dict(mapdata.get('capitoli', {}), **mapdata.get('capitoli_per_unita', {}).get(uid, {}))
    titles = {u: v['titolo'] for u, v in mapdata['unita'].items()}
    own = {'Il': 'Il resto del capitolo', 'il': 'il resto del capitolo', 'Nel': 'In questo capitolo', 'nel': 'in questo capitolo', 'del': 'di questo capitolo', 'dal': 'da questo capitolo'}
    def rep(m):
        art, n = m.group(1), m.group(2)
        target = table.get(n)
        if not target:
            return m.group(0)
        if target == uid:
            return own.get(art, (art + ' ' if art else '') + 'questo capitolo')
        return (art + ' ' if art else '') + f'[capitolo «{titles[target]}»](unit:{target})'
    head, body = text.split('\n---\n', 1)
    return head + '\n---\n' + re.sub(r'\b(?:(Il|il|Nel|nel|del|dal) )?Capitolo (\d)\b', rep, body)

def tidy(text):
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \u00a0]+\n', '\n', text)
    lines, out = text.split('\n'), []
    for l in lines:
        out.append(l.strip() if not l.startswith('  ') else l.rstrip())
    text = '\n'.join(out)
    return text.strip() + '\n'

def parse_aperture(s):
    out, cur, buf = {}, None, []
    for line in s.split('\n'):
        m = re.match(r'^# (physics-\d\d)\s*$', line)
        if m:
            if cur:
                out[cur] = '\n'.join(buf).strip()
            cur, buf = m.group(1), []
        elif cur:
            buf.append(line)
    if cur:
        out[cur] = '\n'.join(buf).strip()
    return out

# ---------------------------------------------------------------- figures

BG = (11, 20, 34)
SCALE = 1.45
ROLES = {'ink': ((74, 74, 78), (224, 231, 242)), 'accent': ((125, 31, 40), (240, 194, 122)),
         'accentdark': ((91, 25, 32), (232, 178, 94)), 'warm': ((183, 161, 126), (216, 195, 155))}

def dark_colour(rgb):
    r, g, b = rgb
    if min(rgb) >= 254:
        return BG
    best = None
    for name, (base, role) in ROLES.items():
        ts = [(255 - c) / (255 - bc) for c, bc in zip(rgb, base)]
        t = sum(ts) / 3
        res = max(abs(x - t) for x in ts)
        if name == 'ink' and max(rgb) - min(rgb) < 8:
            res = min(res, 0.02)
        if best is None or res < best[0]:
            best = (res, min(t, 1.0), role, name)
    res, t, role, name = best
    if res > 0.18:
        # Colour outside the handout palette: invert its lightness keeping the hue.
        import colorsys
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        rr, gg, bb = colorsys.hls_to_rgb(h, 1 - l * 0.85, min(1, s * 0.9))
        warnings['colore fuori tavolozza'].add('#%02x%02x%02x' % rgb)
        return (round(rr * 255), round(gg * 255), round(bb * 255))
    return tuple(round(bg + t * (rc - bg)) for bg, rc in zip(BG, role))

def recolour(svg, prefix):
    def col(m):
        vals = [float(x) for x in re.findall(r'[\d.]+', m.group(1))]
        rgb = tuple(max(0, min(255, round(v * 2.55))) for v in vals)
        return '#%02x%02x%02x' % dark_colour(rgb)
    svg = re.sub(r'rgb\(([\d.]+%,\s*[\d.]+%,\s*[\d.]+%)\)', col, svg)
    svg = re.sub(r'<\?xml[^>]*>\s*', '', svg)
    svg = re.sub(r'\bid="([^"]+)"', lambda m: f'id="{prefix}{m.group(1)}"', svg)
    svg = re.sub(r'(xlink:href|href)="#([^"]+)"', lambda m: f'{m.group(1)}="#{prefix}{m.group(2)}"', svg)
    svg = re.sub(r'url\(#([^)]+)\)', lambda m: f'url(#{prefix}{m.group(1)})', svg)
    svg = re.sub(r'(\d+\.\d{3})\d+', r'\1', svg)
    def size(m):
        w, h = float(m.group(1)), float(m.group(2))
        return f'width="{w * SCALE:.0f}" height="{h * SCALE:.0f}"'
    head_end = svg.index('>', svg.index('<svg'))
    svg = re.sub(r'width="([\d.]+)"\s+height="([\d.]+)"', size, svg[:head_end], count=1) + svg[head_end:]
    svg = svg.replace('<svg ', '<svg aria-hidden="true" focusable="false" ', 1)
    return svg.strip() + '\n'

FIG_PREAMBLE = r'''\def\DispensaDigitale{1}
\documentclass[11pt,a4paper,oneside,openany,fleqn,numbers=noenddot]{scrreprt}
\input{preambolo_comune}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{4pt}
\RenewDocumentEnvironment{diagramma}{}{}{}
\RenewDocumentCommand{\diagramcaption}{O{} m}{}
\renewcommand{\schemacaption}[1]{}
\pagestyle{empty}
\begin{document}
'''

def strip_command(s, name):
    out, i = [], 0
    while True:
        k = s.find('\\' + name, i)
        if k < 0 or s[k + len(name) + 1:k + len(name) + 2].isalpha():
            out.append(s[i:] if k < 0 else s[i:k + 1])
            if k < 0:
                break
            i = k + 1
            continue
        out.append(s[i:k])
        j = k + len(name) + 1
        j = skip_ws(s, j)
        if j < len(s) and s[j] == '[':
            _, j = group(s, j, '[', ']')
        j = skip_ws(s, j)
        if j < len(s) and s[j] == '{':
            _, j = group(s, j)
        i = j
    return ''.join(out)

def compile_figures(root, figs):
    work = tempfile.mkdtemp(prefix='libro-fig-')
    doc = [FIG_PREAMBLE]
    for fname, snippet, cap in figs:
        s = re.sub(r'\\begin\{figure\*?\}(\[[^\]]*\])?|\\end\{figure\*?\}', '', snippet)
        s = s.replace('\\centering', '')
        s = strip_command(s, 'caption')
        # Ball shadings become thousands of path segments in SVG: use a flat fill.
        s = re.sub(r'\\shade\[ball color=([^,\]]+)', r'\\fill[\1', s)
        s = re.sub(r'\\label\{[^}]*\}', '', s)
        doc.append('\\begin{preview}' + s + '\\end{preview}\n')
    doc.append('\\end{document}\n')
    name = '_libro_figure'
    tex = os.path.join(root, name + '.tex')
    open(tex, 'w', encoding='utf-8').write(''.join(doc))
    try:
        r = subprocess.run(['pdflatex', '-interaction=nonstopmode', '-halt-on-error', name + '.tex'], cwd=root, capture_output=True, text=True, timeout=900)
        if r.returncode != 0:
            print(r.stdout[-4000:])
            raise SystemExit('pdflatex non riuscito per le figure')
        pages = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', name + '.pdf'], cwd=root, capture_output=True, text=True).stdout).group(1))
        if pages == len(figs) + 1:
            # preview emits a trailing empty page: accept it only if it really is empty.
            last = os.path.join(work, 'ultima.svg')
            subprocess.run(['pdftocairo', '-svg', '-f', str(pages), '-l', str(pages), name + '.pdf', last], cwd=root, check=True)
            if '<path' in open(last, encoding='utf-8').read():
                raise SystemExit('ultima pagina delle figure non vuota')
        elif pages != len(figs):
            raise SystemExit(f'pagine {pages} diverse dalle figure {len(figs)}')
        for k, (fname, snippet, cap) in enumerate(figs, 1):
            out = os.path.join(work, f'p{k}.svg')
            subprocess.run(['pdftocairo', '-svg', '-f', str(k), '-l', str(k), name + '.pdf', out], cwd=root, check=True)
            svg = open(out, encoding='utf-8').read()
            prefix = re.sub(r'[^a-z0-9]', '', os.path.basename(fname)[:-4]) + '-'
            open(os.path.join(REPO, 'content/libro', fname), 'w', encoding='utf-8').write(recolour(svg, prefix))
    finally:
        for ext in ('.tex', '.pdf', '.log', '.aux', '.out'):
            p = os.path.join(root, name + ext)
            if os.path.exists(p):
                os.remove(p)
        shutil.rmtree(work, ignore_errors=True)

if __name__ == '__main__':
    main()
