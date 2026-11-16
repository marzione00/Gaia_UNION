from PIL import Image, ImageFont, ImageDraw
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
# style: (font file, size in CSS pixels, raster scale). Glyphs are drawn at size*scale texels and
# their metrics are stored in CSS pixels, so text stays sharp on screens with 2x or 3x density.
fonts={
 'display':('/usr/share/fonts/opentype/inter/InterDisplay-Light.otf',73,2),
 'head':('/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf',28,3),
 'sub':('/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf',21,3),
 'body':('/usr/share/fonts/opentype/inter/Inter-Regular.otf',17,3),
 'mini':('/usr/share/fonts/opentype/inter/Inter-SemiBold.otf',14,3),
 'micro':('/usr/share/fonts/opentype/inter/Inter-Medium.otf',13,3),
 'number':('/usr/share/fonts/opentype/inter/InterDisplay-Light.otf',42,2.5),
 'serif':('/usr/share/fonts/truetype/noto/NotoSerif-Regular.ttf',20,3)
}
chars=''.join(chr(i) for i in range(32,127))+'àèéìíîòùúÀÈÉÌÒÙ°²³μλπτΔΣ∑∂∇∞≈≠≤≥→↗←↑↓×·•◌●◯✦☼☾∈ΩβαγδεηθρφψωΓΛΠΦΨ↔⁰¹₂₃₄₅₆₇₈₉⋅—–«»…✓□◈'
chars+='’‘“”−◂▸⚙αβγδΓΛΞΠΣΦΨΩ₀₁₊₋₌∅∩∪∀∃⊂⊆∉⇒⇔√⁴⁵'
# Added in 1.9.0 for ion charges, number sets and logic symbols.
chars+='⁺⁻⁶⁷⁸⁹∧∨¬ℕℤℚℝ⇌σχ½′≡ℂₙⁿₘₖ±ħöüäÖÜÄν₀₁≪≫øØᵢçÇ';chars=''.join(sorted(set(chars)))
import sys
W=4096;H=4096
# --append keeps every existing glyph where it is and draws only the missing characters
# below the used area, so text metrics and layouts do not move.
append='--append' in sys.argv
if append:
 old=json.loads((root/'assets/glyphs.json').read_text(encoding='utf-8'))
 im=Image.open(root/'assets/glyph-atlas.png').convert('L');all_metrics=old['styles']
 cy=max(g['y']+g.get('th',g['h']) for st in all_metrics.values() for g in st['glyphs'].values())+8
else:
 im=Image.new('L',(W,H));all_metrics={};cy=4
draw=ImageDraw.Draw(im);cx=4;rowH=0
try:
 from fontTools.ttLib import TTFont
 def covered(file):
  try:return set(TTFont(file).getBestCmap())
  except Exception:return set()
except ImportError:
 covered=lambda file:set(range(0x2000))
def font(file,sz):
 try:return ImageFont.truetype(file,sz)
 except OSError:
  # Noto Serif is not installed everywhere; the serif style is unused by the interface.
  return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf' if 'Serif' in file else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',sz)
for style,(file,css,scale) in fonts.items():
 if append:scale=all_metrics[style].get('scale',1)
 sz=round(css*scale);f=font(file,sz);own=covered(file)
 m=all_metrics[style]['glyphs'] if append else {}; ascent,descent=f.getmetrics()
 if append:ascent,descent=all_metrics[style]['ascent']*scale,all_metrics[style]['descent']*scale
 for c in chars:
  if c in m:continue
  # The style's own face draws every character it covers, so superscripts and arrows share its
  # weight; DejaVu fills in only what the face lacks.
  ff=f if ord(c) in own else font('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',sz)
  bbox=draw.textbbox((0,0),c,font=ff,anchor='ls',stroke_width=0)
  ww=max(1,bbox[2]-bbox[0]);hh=max(1,bbox[3]-bbox[1]);advance=ff.getlength(c)
  if cx+ww+8>W:
   cx=4;cy+=rowH+8;rowH=0
  if cy+hh+8>H:raise RuntimeError('atlas too small')
  if c!=' ':
   draw.text((cx-bbox[0],cy-bbox[1]),c,font=ff,fill=255,anchor='ls')
  k=lambda v:round(v/scale,3)
  m[c]={'x':cx,'y':cy,'tw':ww,'th':hh,'w':k(ww),'h':k(hh),'by':k(bbox[1]),'bx':k(bbox[0]),'advance':k(advance)}
  cx+=ww+8;rowH=max(rowH,hh)
 cx=4;cy+=rowH+8;rowH=0
 all_metrics[style]={'size':css,'scale':scale,'ascent':round(ascent/scale,3),'descent':round(descent/scale,3),'glyphs':m}
im.save(root/'assets/glyph-atlas.png',optimize=True)
(root/'assets/glyphs.json').write_text(json.dumps({'width':W,'height':H,'styles':all_metrics},ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print('atlas',im.size,(root/'assets/glyph-atlas.png').stat().st_size,'bytes',cy)
