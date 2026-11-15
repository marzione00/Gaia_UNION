from PIL import Image, ImageFont, ImageDraw
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
fonts={
 'display':('/usr/share/fonts/opentype/inter/InterDisplay-Light.otf',73),
 'head':('/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf',34),
 'sub':('/usr/share/fonts/opentype/inter/InterDisplay-Medium.otf',21),
 'body':('/usr/share/fonts/opentype/inter/Inter-Regular.otf',17),
 'mini':('/usr/share/fonts/opentype/inter/Inter-Medium.otf',12),
 'micro':('/usr/share/fonts/opentype/inter/Inter-Medium.otf',10),
 'number':('/usr/share/fonts/opentype/inter/InterDisplay-Light.otf',42),
 'serif':('/usr/share/fonts/truetype/noto/NotoSerif-Regular.ttf',20)
}
chars=''.join(chr(i) for i in range(32,127))+'àèéìíîòùúÀÈÉÌÒÙ°²³μλπτΔΣ∑∂∇∞≈≠≤≥→↗←↑↓×·•◌●◯✦☼☾∈ΩβαγδεηθρφψωΓΛΠΦΨ↔⁰¹₂₃₄₅₆₇₈₉⋅—–«»…✓□◈'
chars+='’‘“”−◂▸⚙αβγδΓΛΞΠΣΦΨΩ₀₁₊₋₌∅∩∪∀∃⊂⊆∉⇒⇔√⁴⁵';chars=''.join(sorted(set(chars)))
W=4096;H=4096; im=Image.new('L',(W,H)); draw=ImageDraw.Draw(im)
all_metrics={};cx=4;cy=4;rowH=0
for style,(file,sz) in fonts.items():
 f=ImageFont.truetype(file,sz)
 m={}; ascent,descent=f.getmetrics()
 for c in chars:
  ff=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',sz) if ord(c)>0x2000 else f
  bbox=draw.textbbox((0,0),c,font=ff,anchor='ls',stroke_width=0)
  # When using anchor lt, top of ink is 0 except accents; compensate by offset
  ww=max(1,bbox[2]-bbox[0]);hh=max(1,bbox[3]-bbox[1]);advance=ff.getlength(c)
  if cx+ww+8>W:
   cx=4;cy+=rowH+5;rowH=0
  if cy+hh+6>H:raise RuntimeError('atlas too small')
  if c!=' ':
   draw.text((cx-bbox[0],cy-bbox[1]),c,font=ff,fill=255,anchor='ls')
  m[c]={'x':cx,'y':cy,'w':ww,'h':hh,'by':bbox[1],'bx':bbox[0],'advance':round(advance,3)}
  cx+=ww+8;rowH=max(rowH,hh)
 all_metrics[style]={'size':sz,'ascent':ascent,'descent':descent,'glyphs':m}
im.save(root/'assets/glyph-atlas.png',optimize=True)
(root/'assets/glyphs.json').write_text(json.dumps({'width':W,'height':H,'styles':all_metrics},ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print('atlas',im.size,(root/'assets/glyph-atlas.png').stat().st_size,'bytes',cy)
