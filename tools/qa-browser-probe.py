import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 page=b.new_page()
 result=page.evaluate('''()=>{const c=document.createElement('canvas'),g=c.getContext('webgl2');return g?{available:true,version:g.getParameter(g.VERSION),renderer:g.getParameter(g.RENDERER),vendor:g.getParameter(g.VENDOR)}:{available:false};}''')
 print(json.dumps(result));b.close()
