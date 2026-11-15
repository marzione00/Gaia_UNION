"""Build faithful text/MathJax texture tiles; no font files are included in output."""
import asyncio,json,html,io,re,os
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright
root=Path(__file__).resolve().parents[1]
def documents():
 out=[]
 lessons=[json.loads(p.read_text()) for p in (root/'content/lessons').glob('*.json')]+[json.loads((root/'content/gaia.json').read_text())]
 for l in lessons:
  for s in l['sections']:
   intro=f'<div class="eyebrow">{html.escape(l["title"])} / {html.escape(s.get("sourceSection",""))}</div><h1>{html.escape(s["title"])}</h1><p class="lead">{html.escape(s.get("lead",""))}</p>'
   source=f'<p class="source">'+(f'Dispensa · sezione {s["sourceSection"]} · pagina stampata {s.get("printedPage","—")}. Cornice narrativa adattata per GAIA; la fonte originale resta disponibile.' if l['id']!='gaia' else 'Dossier originale GAIA. Fonti e assunzioni: docs/SCIENTIFIC_MODEL.md.')+'</p>'
   out.append({'key':s['id'],'title':s['title'],'html':intro+s['html']+source,'moduleId':l['id'],'type':'lesson'})
 q=json.loads((root/'content/quizzes/math-c08.json').read_text())
 for v in q['questions']:
  body=f'<div class="eyebrow">FUNZIONI / QUESITO {v["id"]}</div><h1>Una risposta, un ragionamento</h1><p>{html.escape(v["prompt"])}</p>'
  fig=v.get('figure');
  if fig:
   src=fig if isinstance(fig,str) else fig.get('src','');src='../'+src if src else ''
   if src:body+=f'<img src="{src}" alt="{html.escape(fig.get("alt","Figura del quesito"))}">'
  for opt in v['options']:body+=f'<div class="option" data-opt="{opt["id"]}"><b>{opt["id"]}</b> {html.escape(opt["text"])}</div>'
  out.append({'key':v['id']+'-question','title':'Quesito '+v['id'],'html':body,'moduleId':'math-c08','type':'question'})
  explanation=f'<div class="eyebrow">SOLUZIONE {v["id"]}</div><h1>Risposta {v["correctOptionId"]}</h1><p>{html.escape(v["explanation"])}</p><h3>Le altre alternative</h3>'
  for k,t in v['distractors'].items():explanation+=f'<p><strong>{k}.</strong> {html.escape(t)}</p>'
  explanation+=f'<p class="source">Fonte: dispensa, pagina stampata {v["source"]["solutionPrintedPage"]}, pagina PDF {v["source"]["solutionPdfPage"]}.</p>'
  out.append({'key':v['id']+'-solution','title':'Soluzione '+v['id'],'html':explanation,'moduleId':'math-c08','type':'solution'})
 return out
def inline_images(h):
 import base64
 def repl(m):
  path=(root/m.group(1).replace('../','')).resolve()
  if not path.is_file():return m.group(0)
  mime='image/svg+xml' if path.suffix=='.svg' else 'image/png'
  return 'src="data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()+'"'
 return re.sub(r'src="([^"]+)"',repl,h)
async def main():
 docs=documents();allmeta={}
 selected=set(filter(None,os.environ.get('GAIA_READER_FILTER','').split(',')))
 if selected:
  docs=[d for d in docs if d['key'] in selected];allmeta=json.loads((root/'assets/reader/index.json').read_text())
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  page=await browser.new_page(viewport={'width':800,'height':1000},device_scale_factor=1.5)
  template=(root/'scripts/reader-template.html').read_text();template=template.replace('<script src="../vendor/mathjax/tex-svg.js"></script>','');await page.set_content(template);await page.add_script_tag(content=(root/'vendor/mathjax/tex-svg.js').read_text());await page.evaluate('MathJax.startup.promise')
  for i,d in enumerate(docs):
   meta={k:v for k,v in d.items() if k!='html'};meta['variants']={}
   for variant,width in [('desktop',760),('mobile',360)]:
    await page.set_viewport_size({'width':width,'height':1200})
    await page.evaluate('''({html,width,mobile})=>{MathJax.typesetClear();document.body.classList.toggle('mobile',mobile);const el=document.getElementById('doc');el.style.width=width+'px';el.innerHTML=html;el.querySelectorAll('details').forEach(d=>d.open=true);return MathJax.typesetPromise([el]);}''',{'html':inline_images(d['html']),'width':width,'mobile':variant=='mobile'})
    await page.evaluate('Promise.all(Array.from(document.images).map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r})))')
    size=await page.locator('#doc').bounding_box();height=int(size['height']+1)
    meta['text']=await page.locator('#doc').inner_text()
    meta['plainSource']=re.sub('<[^>]*>',' ',d['html'])
    alt=re.findall(r'alt="([^"]+)"',d['html'])
    if alt:
     meta['text']+='\nDescrizione della figura: '+' '.join(alt)
     meta['plainSource']+='\nDescrizione della figura: '+' '.join(alt)
    options=await page.locator('.option').evaluate_all('(els)=>els.map(e=>({id:e.dataset.opt,y:e.offsetTop,height:e.offsetHeight}))')
    tiles=[]
    data=await page.locator('#doc').screenshot(omit_background=True);full=Image.open(io.BytesIO(data));scale=full.width/width
    for top in range(0,height,1000):
     hh=min(1000,height-top)
     out=root/'assets/reader'/f'{d["key"]}-{variant}-{top//1000}.webp';im=full.crop((0,round(top*scale),full.width,min(full.height,round((top+hh)*scale))));im.save(out,'WEBP',quality=90,method=4)
     tiles.append({'file':str(out.relative_to(root)),'top':top,'height':hh})
    meta['variants'][variant]={'width':width,'height':height,'tiles':tiles,'options':options}
   allmeta[d['key']]=meta
   if i%15==0:print('Reader documents',i+1,'/',len(docs),flush=True)
  await browser.close()
 (root/'assets/reader/index.json').write_text(json.dumps(allmeta,ensure_ascii=False,separators=(',',':')))
 print('DONE',len(allmeta),flush=True)
asyncio.run(main())
