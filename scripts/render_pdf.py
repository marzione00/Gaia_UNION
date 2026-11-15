"""Render the provided PDF faithfully for GPU display. Not AI image generation."""
from pathlib import Path
import fitz, json, hashlib
from PIL import Image
from concurrent.futures import ProcessPoolExecutor
root=Path(__file__).resolve().parents[1]
pdf=root/'materials/matematica-di-base.pdf'
def work(i):
 doc=fitz.open(pdf);p=doc[i];w=1200;pix=p.get_pixmap(matrix=fitz.Matrix(w/p.rect.width,w/p.rect.width),alpha=False)
 out=root/f'assets/pdf/{i+1:03d}.webp';Image.frombytes('RGB',[pix.width,pix.height],pix.samples).save(out,'WEBP',quality=86,method=4)
 return {'page':i+1,'width':pix.width,'height':pix.height,'file':str(out.relative_to(root)),'text':p.get_text()}
if __name__=='__main__':
 count=len(fitz.open(pdf));
 with ProcessPoolExecutor(max_workers=6) as pool: result=list(pool.map(work,range(count)))
 (root/'assets/pdf/index.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')))
 print('PDF pages',len(result),'bytes',sum((root/x['file']).stat().st_size for x in result),flush=True)
