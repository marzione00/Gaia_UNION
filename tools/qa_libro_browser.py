"""Browser check of «Il libro della galassia»: opens every chapter, waits for MathJax, loads every figure.

Usage: start the local server (npm start), then
    python3 tools/qa_libro_browser.py [--url http://127.0.0.1:8000] [--shots previews/libro]
Reports, for every chapter, typesetting time, formulas, MathJax errors and figures that failed to load.
Exit status 1 if any chapter has errors.
"""
import argparse, json, os, sys, time
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument('--url', default='http://127.0.0.1:8000')
ap.add_argument('--shots', default='')
ap.add_argument('--solo', default='')
ap.add_argument('--chrome', default=os.environ.get('CHROMIUM_BIN', '/usr/bin/google-chrome'))
opt = ap.parse_args()
index = json.load(open(os.path.join(os.path.dirname(__file__), '..', 'content/libro/index.json'), encoding='utf-8'))
units = [c['unit'] for c in index['capitoli'] if not opt.solo or c['unit'] in opt.solo.split(',')]
bad, rows = 0, []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=opt.chrome, headless=True, args=['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'])
    page = b.new_page(viewport={'width': 1400, 'height': 900})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(opt.url + '/#/libro?unit=' + units[0], wait_until='domcontentloaded')
    page.wait_for_function('Boolean(window.GAIA && GAIA.book)', timeout=120000)
    for unit in units:
        t0 = time.time()
        page.evaluate("u => { location.hash = '#/libro?unit=' + u; }", unit)
        page.wait_for_function("u => GAIA.book && GAIA.book.unit === u && ['pronte','errore'].includes(document.querySelector('.libro').dataset.formule) && document.querySelector('.libro-capitolo')", arg=unit, timeout=240000)
        page.evaluate("() => { document.querySelector('.libro').dataset.formule = ''; }")
        # The attribute is reset after reading: the next chapter must set it again.
        typeset = time.time() - t0
        page.evaluate('() => GAIA.book.loadAllFigures && GAIA.book.loadAllFigures()')
        page.wait_for_function("() => [...document.querySelectorAll('.libro-svg-esterno')].every(e => ['pronta','errore'].includes(e.dataset.stato))", timeout=120000)
        r = page.evaluate("""() => ({
            formulas: document.querySelectorAll('.libro-capitolo mjx-container').length,
            mjxErrors: [...document.querySelectorAll('.libro-capitolo mjx-merror, .libro-capitolo [data-mjx-error]')].map(e => e.getAttribute('data-mjx-error') || e.textContent).slice(0, 8),
            figures: document.querySelectorAll('.libro-figura').length,
            figureErrors: [...document.querySelectorAll('.libro-svg-esterno[data-stato="errore"]')].map(e => e.dataset.src),
            dollars: [...document.querySelectorAll('.libro-capitolo p, .libro-capitolo li, .libro-capitolo td')].filter(e => /\\$/.test(e.textContent)).map(e => e.textContent.slice(0, 80)).slice(0, 5),
            height: document.querySelector('.libro-pagina').scrollHeight
        })""")
        r.update(unit=unit, seconds=round(typeset, 1))
        ok = not r['mjxErrors'] and not r['figureErrors'] and not r['dollars']
        bad += not ok
        rows.append(r)
        print(('OK  ' if ok else 'ERR ') + json.dumps(r, ensure_ascii=False), flush=True)
        if opt.shots:
            os.makedirs(opt.shots, exist_ok=True)
            page.screenshot(path=os.path.join(opt.shots, unit + '.png'))
    if errors:
        print('Errori della pagina:', errors[:5])
        bad += 1
    b.close()
print(f'Capitoli: {len(rows)}, formule: {sum(r["formulas"] for r in rows)}, figure: {sum(r["figures"] for r in rows)}, con errori: {bad}')
sys.exit(1 if bad else 0)
