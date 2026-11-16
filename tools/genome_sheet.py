"""Assemble the contact sheet of the 100 planets from the raw tiles written by tools/render_genomes.mjs.
Usage: python3 tools/genome_sheet.py tiles-dir out.png"""
import json, sys
from PIL import Image, ImageDraw, ImageFont
d, out = sys.argv[1], sys.argv[2]
meta = json.load(open(f'{d}/tiles.json')); T = meta['size']
SKY, LAB, PAD, GAP = 14, 38, 10, 30
font = ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-SemiBold.otf', 13)
small = ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Regular.otf', 12)
head = ImageFont.truetype('/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf', 22)
DISC = ['Matematica', 'Fisica', 'Chimica', 'Biologia']; COL = [(242, 183, 102), (127, 178, 255), (180, 156, 255), (111, 211, 160)]
cw, ch = T + PAD, T + SKY + LAB + PAD
W = 2 * 5 * cw + GAP + 40; H = 70 + 2 * (5 * ch + 40) + GAP
img = Image.new('RGB', (W, H), (7, 12, 24)); dr = ImageDraw.Draw(img)
dr.text((20, 18), 'GAIA · carte d’identità dei 100 pianeti: vedute dall’alto (min. distanza fra due pianeti %.3f)' % meta['minDistance'], font=head, fill=(238, 242, 248))
for s in range(4):
    bx = 20 + (s % 2) * (5 * cw + GAP); by = 70 + (s // 2) * (5 * ch + 40 + GAP)
    dr.text((bx, by), DISC[s], font=head, fill=COL[s])
    for k, t in enumerate([t for t in meta['tiles'] if t['sector'] == s]):
        x = bx + (k % 5) * cw; y = by + 34 + (k // 5) * ch
        tile = Image.frombytes('RGB', (T, T), open(f"{d}/{t['index']}.rgb", 'rb').read()); img.paste(tile, (x, y))
        sky = tuple(int(min(255, v * 255)) for v in t['sky']); dr.rectangle([x, y + T, x + T - 1, y + T + SKY - 1], fill=sky)
        for m in range(t['moons']): dr.ellipse([x + T - 12 - m * 11, y + T + 3, x + T - 4 - m * 11, y + T + 11], fill=(225, 225, 220))
        if t['rings']: dr.line([x + 4, y + T + 7, x + 30, y + T + 7], fill=(225, 210, 170), width=2)
        if t['pilot']: dr.rectangle([x - 2, y - 2, x + T + 1, y + T + SKY + 1], outline=COL[s], width=3)
        title = t['title'] if len(t['title']) <= 24 else t['title'][:23] + '…'
        dr.text((x, y + T + SKY + 3), title, font=font, fill=(238, 242, 248))
        dr.text((x, y + T + SKY + 20), f"{t['style']} · stella {t['star']}", font=small, fill=(174, 185, 203))
img.save(out, optimize=True); print(out, img.size)
