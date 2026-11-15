"""Dependency-free bundler for this project's static ESM subset (no external imports)."""
import re,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
def bundle():
 registry={}
 def visit(path):
  path=path.resolve();key=path.relative_to(root).as_posix()
  if key in registry:return key
  text=path.read_text();registry[key]=''
  def imports(m):
   names,url=m.group(1),m.group(2);target=visit(path.parent/url)
   return f'const {{{names}}}=__require({json.dumps(target)});'
  text=re.sub(r"import\s*\{([^}]+)\}\s*from\s*['\"]([^'\"]+)['\"];?",imports,text)
  exports=re.findall(r'export\s+(?:async\s+)?(?:const|let|class|function)\s+(\w+)',text)
  text=re.sub(r'\bexport\s+','',text).replace('import.meta.url','location.href')
  registry[key]=text+'\nObject.assign(exports,{'+','.join(exports)+'});'
  return key
 entry=visit(root/'src/app.js')
 js='(()=>{const __modules={'+',\n'.join(json.dumps(k)+':(exports,__require)=>{\n'+v+'\n}' for k,v in registry.items())+'};const __cache={};function __require(id){if(__cache[id])return __cache[id];const e={};__cache[id]=e;__modules[id](e,__require);return e}__require('+json.dumps(entry)+');})();'
 worker=(root/'src/scene/data.js').read_text();worker=re.sub(r'\bexport\s+','',worker);w=(root/'src/scene/worker.js').read_text();w=re.sub(r"import[^;]+;",'',w);worker+=w
 return js,worker
if __name__=='__main__':
 js,worker=bundle();(root/'app.bundle.js').write_text('window.__GAIA_WORKER_SOURCE__='+json.dumps(worker)+';\n'+js);print('bundle bytes',len(js))
