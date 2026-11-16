"""Render the provided PDFs faithfully for GPU display. Not AI image generation.

Usage: python3 scripts/render_pdf.py [mat|fis]   (default: mat)
"""
from pathlib import Path
import fitz, json, sys
from PIL import Image
from concurrent.futures import ProcessPoolExecutor
root=Path(__file__).resolve().parents[1]
DOCS={'mat':('materials/matematica-di-base.pdf','assets/pdf'),'fis':('materials/fisica-generale-e-moderna.pdf','assets/pdf-fisica')}
key=sys.argv[1] if len(sys.argv)>1 else 'mat'
pdf,out_dir=root/DOCS[key][0],root/DOCS[key][1]
def work(i):
 doc=fitz.open(pdf);p=doc[i];w=1200;pix=p.get_pixmap(matrix=fitz.Matrix(w/p.rect.width,w/p.rect.width),alpha=False)
 out=out_dir/f'{i+1:03d}.webp';Image.frombytes('RGB',[pix.width,pix.height],pix.samples).save(out,'WEBP',quality=86,method=4)
 entry={'page':i+1,'width':pix.width,'height':pix.height,'file':str(out.relative_to(root)),'text':p.get_text()}
 # The physics volume numbers its front matter in roman figures: keep the printed label.
 if key!='mat':entry['label']=p.get_label() or str(i+1)
 return entry
if __name__=='__main__':
 out_dir.mkdir(parents=True,exist_ok=True);count=len(fitz.open(pdf))
 with ProcessPoolExecutor(max_workers=6) as pool: result=list(pool.map(work,range(count)))
 (out_dir/'index.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')))
 print('PDF pages',len(result),'bytes',sum((root/x['file']).stat().st_size for x in result),flush=True)
