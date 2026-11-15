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
chars+='’‘“”−◂▸⚙αβγδΓΛΞΠΣΦΨΩ₀₁₊₋₌∅∩∪∀∃⊂⊆∉⇒⇔√⁴⁵'
# Added in 1.9.0 for ion charges, number sets and logic symbols.
chars+='⁺⁻⁶⁷⁸⁹∧∨¬ℕℤℚℝ⇌σχ½′≡ℂₙⁿₘₖ±ħöüäÖÜÄν₀₁≪≫øØ';chars=''.join(sorted(set(chars)))
import sys
W=4096;H=4096
# --append keeps every existing glyph where it is and draws only the missing characters
# below the used area, so text metrics and layouts do not move.
append='--append' in sys.argv
if append:
 old=json.loads((root/'assets/glyphs.json').read_text(encoding='utf-8'))
 im=Image.open(root/'assets/glyph-atlas.png').convert('L');all_metrics=old['styles']
 cy=max(g['y']+g['h'] for st in all_metrics.values() for g in st['glyphs'].values())+8
else:
 im=Image.new('L',(W,H));all_metrics={};cy=4
draw=ImageDraw.Draw(im);cx=4;rowH=0
def font(file,sz):
 try:return ImageFont.truetype(file,sz)
 except OSError:
  if not append:raise
  return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf' if 'Serif' in file else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',sz)
for style,(file,sz) in fonts.items():
 f=font(file,sz)
 m=all_metrics[style]['glyphs'] if append else {}; ascent,descent=f.getmetrics()
 if append:ascent,descent=all_metrics[style]['ascent'],all_metrics[style]['descent']
 for c in chars:
  if c in m:continue
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
