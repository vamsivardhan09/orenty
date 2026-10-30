import re

with open('reference/persist/index-BDrtZzZ4.js', 'r', encoding='utf-8') as f:
    js = f.read()

keywords = ['three', 'webgl', 'shader', 'canvas', 'ScrollTrigger', 'lenis', 'locomotive', 'beam', 'particle', 'hud', 'bracket', 'glass', 'perspective', 'matrix3d', 'requestAnimationFrame']
for kw in keywords:
    matches = len([m for m in re.finditer(re.escape(kw), js, re.IGNORECASE)])
    print(f"Keyword '{kw}': {matches} occurrences")

shaders = re.findall(r'(void\s+main\s*\([^)]*\)\s*\{[^}]+\})', js)
print(f"GLSL Shaders detected: {len(shaders)}")
canvas_matches = re.findall(r'(\bcanvas\b[^;,{}]{0,50})', js, re.IGNORECASE)
print(f"Canvas occurrences: {canvas_matches[:5]}")

