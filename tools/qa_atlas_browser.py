"""Real Chromium/WebGL smoke of the built atlas. Mobile viewport emulation, not an iPhone test.
Run: xvfb-run -a python tools/qa_atlas_browser.py --root dist
Requires Playwright and its Chromium browser. Does not install anything in the application.
"""
import argparse, functools, http.server, json, os, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--root',default='dist');parser.add_argument('--output',default='qa-atlas/browser');parser.add_argument('--executable')
args=parser.parse_args();root=Path(args.root).resolve();out=Path(args.output).resolve();out.mkdir(parents=True,exist_ok=True)
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(root)))
threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
report={'method':'Real Chromium WebGL 2, desktop and touch viewport emulation; not physical GPU or Safari certification','checks':[],'errors':[],'failedResponses':[]}
with sync_playwright() as p:
    launch={'headless':True,'args':['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']}
    if args.executable:launch['executable_path']=args.executable
    browser=p.chromium.launch(**launch)
    context=browser.new_context(viewport={'width':1280,'height':900},device_scale_factor=1,has_touch=True,reduced_motion='reduce')
    context.add_init_script("if(!localStorage.getItem('gaia.beyond-knowledge.v1'))localStorage.setItem('gaia.beyond-knowledge.v1',JSON.stringify({schema:1,preferences:{graphics:'low',motion:false}}));")
    page=context.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
    page.on('response',lambda r:report['failedResponses'].append({'url':r.url,'status':r.status}) if r.status>=400 else None)
    def ready():
        page.wait_for_function('window.GAIA && GAIA.atlas && GAIA.state.loaded && GAIA.diagnostics().frameCount>2',timeout=150000)
        assert page.locator('#error').is_hidden(),page.locator('#error').inner_text()
    def frame():
        n=page.evaluate('GAIA.diagnostics().frameCount');page.wait_for_function('(n)=>GAIA.diagnostics().frameCount>n',arg=n,timeout=30000)
    def check(name,expression):
        assert page.evaluate(expression),name;report['checks'].append(name)
    def action(id,tap=False):
        page.wait_for_function('(id)=>GAIA.buttons.some(b=>b.id===id&&!b.disabled)',arg=id,timeout=30000)
        b=page.evaluate('(id)=>{const b=GAIA.buttons.find(b=>b.id===id);return {x:b.x+b.w/2,y:b.y+b.h/2}}',id)
        if tap:page.touchscreen.tap(b['x'],b['y'])
        else:page.mouse.click(b['x'],b['y'])
        frame()
    try:
        page.goto(url,wait_until='domcontentloaded',timeout=90000);ready();frame()
        check('Welcome offers search, paths and map','GAIA.atlas.sheet==="welcome" && ["atlas-welcome-search","atlas-welcome-paths","atlas-welcome-map"].every(id=>GAIA.buttons.some(b=>b.id===id))')
        action('atlas-close')
        check('One million stars still rendered','GAIA.diagnostics().starsDrawn===1000000')
        check('27 thematic areas on four arms, permanent 3D markers','GAIA.world.systems.length===27 && new Set(GAIA.world.systems.map(s=>s.sector)).size===4 && GAIA.diagnostics().atlasMarkers>0')
        check('No initial visit awards progress','GAIA.store.data.atlas.visited.length===0')
        report['renderer']=page.evaluate('GAIA.diagnostics()')
        page.screenshot(path=str(out/'desktop-map.png'))
        # Hover uses actual pointer events and stable projected coordinates.
        point=page.evaluate('''()=>{const r=GAIA.atlas.layout.map;return GAIA.world.projections.find(p=>p.depth>0&&p.x>r.x+50&&p.x<r.x+r.w-50&&p.y>r.y+70&&p.y<r.y+r.h-50)}''')
        assert point;page.mouse.move(point['x'],point['y']);page.wait_for_timeout(300);frame()
        check('Hover preview follows a marked system',f'GAIA.atlas.hoverId==={point["index"]}')
        action('atlas-list');action('atlas-search')
        page.locator('#atlas-search').fill('VSEPR');frame()
        check('Search finds a topic by name','GAIA.atlas.results[0]?.id==="chemistry-08"')
        action('atlas-result-chemistry-08')
        check('Search centers without entering','GAIA.state.scene==="galaxy" && GAIA.state.selected===57 && GAIA.atlas.flight===null')
        check('Card lists the units of the area','GAIA.buttons.some(b=>b.id==="atlas-unit-chemistry-08") && GAIA.buttons.some(b=>b.id==="atlas-open-unit")')
        page.evaluate('GAIA.atlas.open("detail")');frame();action('atlas-level-2')
        check('Narrative and semantic detail','GAIA.atlas.level===2 && document.querySelector("#semantic-text").textContent.includes("Geometria")')
        action('atlas-close');action('atlas-routes')
        path=page.evaluate('GAIA.atlas.bundle.paths[0].id');action('atlas-path-'+path)
        check('Route mesh created from curriculum','GAIA.renderer.meshes.has("atlas-route")')
        action('atlas-access');action('atlas-option-scale');action('atlas-option-scale');action('atlas-option-contrast')
        check('Large text and contrast saved','GAIA.store.data.atlas.textScale===1.4 && GAIA.renderer.highContrast===true')
        action('atlas-close');action('atlas-open-unit')
        check('Unit opened from the atlas card in one click','GAIA.state.scene==="mission" && GAIA.renderer.readingScale===1.4')
        page.evaluate('GAIA.route("galaxy")');frame();action('atlas-history')
        check('Resume history exists','GAIA.store.data.atlas.recent.length>0 && GAIA.buttons.some(b=>b.id.startsWith("atlas-resume-"))')
        action('atlas-close');action('atlas-guide');action('atlas-guide-next')
        check('Optional guide advances','GAIA.atlas.guideStep===1');page.keyboard.press('Escape');frame()
        check('Escape dismisses guide','GAIA.atlas.sheet===null')
        # A native semantic button can be focused and activated without hitting a star.
        page.locator('[data-id="scene-system-12"]').focus();page.keyboard.press('Enter');frame()
        check('Keyboard selects area 13','GAIA.state.system===12 && GAIA.state.scene==="galaxy"')
        page.set_viewport_size({'width':390,'height':844});frame();frame()
        page.evaluate('GAIA.atlas.reset()');frame()
        page.screenshot(path=str(out/'mobile-map.png'))
        page.evaluate('GAIA.atlas.open("detail")');frame();page.screenshot(path=str(out/'mobile-large-text.png'));action('atlas-close',True)
        # First touch selects; opening needs a second touch or the explicit button.
        point=page.evaluate('''()=>{const r=GAIA.atlas.layout.map;return GAIA.world.projections.find(p=>p.depth>0&&p.x>r.x+40&&p.x<r.x+r.w-40&&p.y>r.y+75&&p.y<r.y+r.h-40&&GAIA.world.pick(p.x,p.y,GAIA.state)?.index===p.index)}''')
        assert point;page.touchscreen.tap(point['x'],point['y']);frame()
        check('First touch only selects','GAIA.state.scene==="galaxy"')
        action('atlas-explore',True);check('Explicit touch entry works','GAIA.state.scene==="system"')
        page.evaluate('GAIA.backToParent()');frame();action('atlas-history',True)
        check('Visited != completed','GAIA.store.data.atlas.visited.length>0 && Object.values(GAIA.store.data.courses).every(r=>!r.completedAt)')
        page.reload(wait_until='domcontentloaded');ready()
        check('Preferences and visit history survive reload','GAIA.store.data.atlas.textScale===1.4 && GAIA.store.data.atlas.contrast===true && GAIA.store.data.atlas.visited.length>0')
        for w,h in [(320,568),(844,390)]:
            page.set_viewport_size({'width':w,'height':h});frame();page.evaluate('GAIA.atlas.open("list")');frame()
            check(f'Controls stay inside {w}x{h}','GAIA.buttons.every(b=>b.x>=0&&b.y>=0&&b.x+b.w<=innerWidth+.1&&b.y+b.h<=innerHeight+.1)')
            page.screenshot(path=str(out/f'list-{w}x{h}.png'));page.keyboard.press('Escape');frame()
        check('Renderer reports no GL error','GAIA.diagnostics().webglError===0')
        assert not report['errors'],report['errors'];assert not report['failedResponses'],report['failedResponses']
        report['passed']=len(report['checks']);report['success']=True
    except Exception as e:
        report['success']=False;report['failure']=str(e)
        try:report['errorPanel']=page.locator('#error').inner_text();page.screenshot(path=str(out/'failure.png'))
        except Exception:pass
        raise
    finally:
        (out/'report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False));print(json.dumps(report,ensure_ascii=False),flush=True)
        browser.close();server.shutdown()
