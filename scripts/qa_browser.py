# Optional real-browser test. Run locally with the HTTP server; not executed in delivery QA.
import asyncio,json,sys,os,traceback
from pathlib import Path
from playwright.async_api import async_playwright
root=Path(os.environ.get('GAIA_ROOT',str(Path(__file__).resolve().parents[1])));sys.path.insert(0,str(root/'scripts'))
reports=[]
def check(name,value,detail=None):
 reports.append({'name':name,'pass':bool(value),'detail':detail});print(('PASS ' if value else 'FAIL ')+name,detail if not value else '',flush=True)
async def main():
 async with async_playwright() as p:
  options={'executable_path':os.environ['CHROMIUM_BIN']} if os.environ.get('CHROMIUM_BIN') else {}
  b=await p.chromium.launch(headless=True,**options)
  page=await b.new_page(viewport={'width':1600,'height':1000},device_scale_factor=1)
  errors=[];consoleerrors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda m:consoleerrors.append(m.text) if m.type=='error' else None)
  await page.add_init_script('window.__contextCalls=[];const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){__contextCalls.push(kind);return original.call(this,kind,...args)}')
  await page.goto(os.environ.get('GAIA_URL','http://127.0.0.1:8000'),wait_until='domcontentloaded')
  async def wait():
   if await page.evaluate('Boolean(window.GAIA?.state.loaded)'):
    n=await page.evaluate('GAIA.diagnostics().frameCount');await page.wait_for_function('(n)=>GAIA.diagnostics().frameCount>n',arg=n,timeout=15000)
   await page.wait_for_timeout(120)
  async def state(expr):return await page.evaluate('GAIA.'+expr)
  async def click(id):
   await wait();v=await page.evaluate('(id)=>{const b=GAIA.buttons.find(b=>b.id===id);return b?{x:b.x+b.w/2,y:b.y+b.h/2,disabled:b.disabled}:null}',id)
   if not v:raise RuntimeError('Button not present '+id+': '+str(await state('buttons.map(b=>b.id)')))
   await page.mouse.click(v['x'],v['y']);await wait()
  async def slider(id,fraction):
   v=await page.evaluate('(id)=>{let b=GAIA.buttons.find(b=>b.id===id);return {x:b.x,y:b.y,w:b.w,h:b.h}}',id)
   await page.mouse.move(v['x']+v['w']*fraction,v['y']+v['h']/2);await page.mouse.down();await page.mouse.move(v['x']+v['w']*fraction+1,v['y']+v['h']/2);await page.mouse.up();await wait()
  async def shot(name):await page.evaluate('GAIA.state.toastUntil=0');await wait();await page.screenshot(path=str(root/'previews'/name))
  try:
   await page.wait_for_function('window.GAIA?.state.loaded',timeout=120000);await wait()
   d=await state('diagnostics()');check('WebGL 2 inizializzato', 'WebGL 2' in d['webgl'],d)
   check('Un milione di stelle realmente sottoposto al rendering iniziale',d['starsDrawn']==1000000 and d['starsGenerated']==1000000)
   await shot('01_Galassia_Milione.png')
   check('100 pianeti, 25 unità matematiche, 75 posti riservati',d['planets']==100 and d['mathModules']==25 and d['planned']==75)
   check('39 sezioni, 40 quesiti, 769 pagine disponibili',d['lessonSections']==39 and d['questions']==40 and d['sourcePages']==769)
   check('Solo canvas WebGL a runtime',await page.evaluate('__contextCalls.every(x=>x==="webgl2")'),await page.evaluate('__contextCalls'))
   print('BUTTONS INITIAL',await state('buttons.map(b=>b.id)'),flush=True)
   await click('settings');await click('graphics-low');await click('toggle-motion');await click('close-settings')
   check('Qualità ridotta conserva un milione e pausa',await state('state.quality')==1000000 and await state('state.graphics')=='low' and await state('state.paused')==True)
   # Scene navigation, using the canvas buttons.
   await click('sector-1');check('Filtro Fisica selezionato',await state('state.sector')==1)
   await click('sector-all');check('Quattro settori ripristinati',await state('state.sector')==-1)
   before=await state('state.yaw');await page.mouse.move(700,650);await page.mouse.down();await page.mouse.move(760,680,steps=5);await page.mouse.up();await wait();check('Camera ruotabile tramite trascinamento',await state('state.yaw')!=before)
   await page.mouse.wheel(0,-150);await wait();check('Zoom da rotella',await state('state.distance')<60)
   await click('reset-camera');await wait();target=await page.evaluate('GAIA.world.projections.find(p=>p.index===7)')
   await page.mouse.move(target['x'],target['y']);await page.wait_for_timeout(180);await wait();check('Hover descrive il sistema stellare',await state('state.hoveredTarget?.type')=='system')
   await page.mouse.click(target['x'],target['y']);await wait();check('Clic singolo entra nel sistema',await state('state.scene')=='system' and await state('state.system')==7)
   check('Quattro pianeti e un milione di stelle nel sistema',len(await state('world.projections.filter(p=>p.type==="planet")'))==4 and await state('diagnostics().starsDrawn')==1000000)
   await shot('02_Sistema.png');await click('orbit-unit');check('Passaggio sistema → pianeta',await state('state.scene')=='orbit')
   await shot('02_Orbita.png')
   await click('nav-surface');check('Superficie tridimensionale con 875 celle campionate',await state('state.scene')=='surface' and await state('diagnostics().terrainCells')==875)
   await shot('03_Superficie.png');await page.evaluate('history.back()');await wait();check('Pulsante Indietro ripristina la scena precedente',await state('state.scene')=='orbit');await click('nav-surface')
   await click('nav-research');check('Rete scientifica navigabile',await state('state.scene')=='research')
   await shot('04_Ricerca.png')
   # Catalogue search / planned disclosure.
   await click('nav-catalogue');await page.keyboard.press('Control+k');await page.locator('#editor').fill('chimica');await page.keyboard.press('Escape');await wait();check('Ricerca globale aggiornata',await state('state.query')=='chimica')
   print('CATALOGBUTTONS',await state('buttons.map(b=>b.id)'),flush=True)
   # Reset via real editor input.
   await page.keyboard.press('Control+k');await page.locator('#editor').fill('Funzioni');await page.keyboard.press('Escape');await wait();check('Ricerca lezioni per titolo',await state('state.query')=='Funzioni')
   cat=await page.evaluate('GAIA.buttons.find(b=>b.id.startsWith("catalog-unit-")||b.id.startsWith("module-")||b.id.startsWith("unit-"))?.id')
   if cat:await click(cat)
   await page.evaluate("location.hash='#/study/math-c08?section=8'");await wait();await wait();check('Teoria narrativa della sezione originale 8.9',await state('state.reader')=='math-c08' and await state('state.section')==8)
   before=await state('state.scroll');await page.mouse.move(800,600);await page.mouse.wheel(0,480);await wait();check('Scorrimento effettivo del testo lungo',await state('state.scroll')>before)
   await shot('06_Teoria.png')
   print('THEORYBUTTONS',await state('buttons.map(b=>b.id)'),flush=True)
   await click('mark-read');check('Studio segnato esplicitamente',len(await state('store.data.read'))==1);await page.wait_for_timeout(500);check('Contenuto semantico preservato dopo aggiornamento',len(await page.locator('#semantic-text').inner_text())>100)
   await click('light-reader');check('Modalità lettura chiara WebGL',await state('state.light')==True)
   await click('light-reader');await click('source-reader');await wait();check('Rimando alla pagina originale del PDF',await state('state.scene')=='pdf' and await state('state.pdfPage')==256)
   await shot('10_Dispensa_Originale.png')
   print('PDFBUTTONS',await state('buttons.map(b=>b.id)'),flush=True)
   await click('pdf-next');check('Pagina PDF successiva',await state('state.pdfPage')==257)
   await click('pdf-prev');await click('pdf-goto');await page.locator('#editor').fill('769');await page.keyboard.press('Enter');await wait();check('Salto all’ultima pagina PDF',await state('state.pdfPage')==769)
   # All 7 labs; real model selector.
   await click('nav-lab');print('LABBUTTONS',await state('buttons.map(b=>b.id)'),flush=True)
   await click('lab-daisyworld');old=await state('state.sim.final.temperatureC');await slider('lum',.7);check('Daisyworld ricalcolato tramite parametro luminosità',await state('state.sim.final.temperatureC')!=old)
   await click('lab-save');a=await state('state.labCompare.data.final.temperatureC');await slider('lum',.3);check('Scenario A resta indipendente da B',await state('state.labCompare.data.final.temperatureC')==a and await state('state.sim.final.temperatureC')!=a)
   async with page.expect_download() as download:await click('lab-export')
   f=await download.value;check('Esportazione JSON scenario',f.suggested_filename.endswith('.json'))
   await shot('05_Daisyworld.png')
   for model in ['transform','rectangle','radical','linear','reserve','rational']:
    await click('lab-'+model);check('Laboratorio operativo: '+model,await state('state.lab')==model and not await page.locator('#error').is_visible())
    if model=='rectangle':
     await click('find-square');check('Massimo dell’area: lato P/4',await state('state.labValues.x')==await state('state.labValues.p/4'));await shot('11_Laboratorio_Matematico.png')
   await click('lab-transform');await click('model-sine');await slider('param-b',.7);check('Trasformazioni: base seno e scala orizzontale',await state('state.labValues.base')=='sine' and await state('state.labValues.b')!=1)
   await click('model-absolute');check('Trasformazioni: base valore assoluto',await state('state.labValues.base')=='absolute')
   await click('lab-radical');await click('model-square');check('Radicali: radice di un quadrato',await state('state.labValues.mode')=='square')
   await click('lab-reset');check('Ripristino delle opzioni complete dei modelli',await state('state.labValues.base')=='quadratic' and await state('state.labValues.mode')=='root')
   # Actual answer selection and marking.
   await click('nav-quiz');await wait();print('QUIZBUTTONS',await state('buttons.map(b=>b.id)'),flush=True)
   await click('answer-A');await click('quiz-check');check('Allenamento controlla e mostra soluzione',await state('store.data.quiz["08.01"].checked') and await state('state.quizSolution'))
   await click('quiz-next');await wait();await click('answer-A');await click('quiz-check');check('Seconda risposta registrata',bool(await state('store.data.quiz["08.02"]')))
   await page.evaluate('GAIA.state.quizIndex=5;GAIA.state.quizSolution=false;GAIA.state.scroll=0');await wait();await page.mouse.wheel(0,500);await wait();check('Quesito con figura vettoriale ricomposta e alternative',await page.evaluate('GAIA.buttons.some(b=>b.id.startsWith("answer-"))'));await shot('12_Quesito_Grafico.png');await click('mode-exam');await click('answer-A');check('Verifica non mostra correzione prima della consegna',not await state('state.examSubmitted') and not await state('state.quizSolution'))
   await click('quiz-submit');check('Consegna della verifica',await state('state.examSubmitted')==True)
   await shot('07_Verifica.png')
   # Diary text through hidden native editor, pixels displayed in GL.
   await click('nav-journal');await click('edit-notes');await page.locator('#editor').fill('Ipotesi: la retroazione dipende dai parametri.\nConfronto A/B; nessuna regolazione universale.');await click('save-notes');check('Diario registra il testo inserito', 'retroazione' in await state('store.data.notes.general'))
   async with page.expect_download() as download:await click('export-journal')
   f=await download.value;check('Esportazione diario JSON',f.suggested_filename=='GAIA_Diario.json')
   await shot('09_Diario.png')
   malicious={'schema':1,'notes':{'general':'<script>not executed</script>'},'quiz':{},'read':[]}
   await page.locator('#fileInput').set_input_files({'name':'diary.json','mimeType':'application/json','buffer':json.dumps(malicious).encode()});await wait();check('Importazione tratta il testo come dati',await state('store.data.notes.general')=='<script>not executed</script>')
   await page.locator('#fileInput').set_input_files({'name':'bad.json','mimeType':'application/json','buffer':b'{"schema":77}'});await wait();check('Importazione schema errato rifiutata','rifiutata' in await state('state.toast'))
   await page.evaluate("GAIA.store.data.notes.general='Ipotesi: la retroazione dipende dai parametri.\\nConfronto A/B; nessuna regolazione universale.'")
   await click('nav-catalogue');await page.keyboard.press('Control+k');await page.locator('#editor').fill('');await page.keyboard.press('Escape');await click('filter-0');await shot('08_Catalogo.png')
   await page.evaluate("GAIA.openTheory('math-c02')");await wait();check('Unità senza narrativa apre la fonte originale',await state('state.scene')=='pdf' and await state('state.pdfPage')==45);check('Percorso browser completato senza blocchi',True)
  except Exception as e:
   print('QA EXCEPTION',str(e),flush=True);traceback.print_exc();check('Percorso browser completato senza blocchi',False,str(e));await page.screenshot(path=str(root/'docs/QA_FAILURE.png'))
  # Always run independent mobile and error paths, even if a selector above changes.
  try:
   await page.set_viewport_size({'width':390,'height':844});await page.evaluate('GAIA.state.toastUntil=0;GAIA.state.menu=false;GAIA.state.settings=false');
   for scene in ['galaxy','system','orbit','surface','theory','lab','quiz','journal']:
    if scene=='theory':await page.evaluate("GAIA.openTheory('math-c08',8)")
    else:await page.evaluate('(scene)=>GAIA.route(scene)',scene)
    await wait();await wait();check('Mobile: '+scene+' senza errore di scena',not await page.locator('#error').is_visible())
    await shot('Mobile_'+scene+'.png')
    bounds=await page.evaluate('GAIA.buttons.filter(b=>b.x<0||b.y<0||b.x+b.w>390.5||b.y+b.h>844.5).map(b=>({id:b.id,x:b.x,y:b.y,w:b.w,h:b.h}))');check('Mobile: comandi entro viewport '+scene,len(bounds)==0,bounds)
   for model in ['transform','rectangle','radical','linear','reserve','rational']:
    await page.evaluate('(model)=>{GAIA.state.lab=model;GAIA.route("lab")}',model);await wait()
    bounds=await page.evaluate('GAIA.buttons.filter(b=>b.x<0||b.y<0||b.x+b.w>390.5||b.y+b.h>844.5).map(b=>b.id)')
    check('Mobile: controlli completi del modello '+model,len(bounds)==0 and not await page.locator('#error').is_visible(),bounds)
   await shot('Mobile_Laboratorio_Controlli.png')
   await page.evaluate("GAIA.route('galaxy')");await wait();await page.keyboard.press('Tab');await wait();check('Livello semantico navigabile da tastiera',await page.locator('#semantic button').count()>0)
   check('Nessuna richiesta Canvas 2D',await page.evaluate('!__contextCalls.includes("2d")'))
   d=await state('diagnostics()');check('Nessun errore WebGL finale',d['webglError']==0,d);check('Nessuna texture di contenuto mancante',len(d['textureErrors'])==0,d['textureErrors']);check('Nessuna eccezione JS non gestita',not errors,errors);check('Nessun errore console',not consoleerrors,consoleerrors)
   await page.evaluate('GAIA.renderer.gl.getExtension("WEBGL_lose_context").loseContext()');await page.locator('#error').wait_for(state='visible');check('Perdita del contesto segnalata senza falso renderer alternativo',await page.locator('#error').is_visible() and 'perso' in await page.locator('#error').inner_text())
   (root/'docs/QA_BROWSER.json').write_text(json.dumps({'checks':reports,'diagnostics':d,'pageErrors':errors,'consoleErrors':consoleerrors,'version':'1.4.0','conditions':{'transport':os.environ.get('GAIA_URL','http://127.0.0.1:8000'),'renderer':d['renderer'],'browser':b.version,'persistentBrowserStorage':'not tested after closing browser'}},ensure_ascii=False,indent=2))
  except Exception as e:print('SECONDARY QA',str(e));(root/'docs/QA_BROWSER.json').write_text(json.dumps({'checks':reports,'fatal':str(e)},ensure_ascii=False,indent=2))
  await b.close()
 print('TOTAL',sum(x['pass'] for x in reports),'/',len(reports),flush=True)
asyncio.run(main())
if not reports or any(not item["pass"] for item in reports):
 sys.exit(1)
