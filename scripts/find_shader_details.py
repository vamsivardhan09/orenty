import re

with open('reference/persist/index-BDrtZzZ4.js', 'r', encoding='utf-8') as f:
    js = f.read()

# find comments or code around shader/canvas
for m in re.finditer(r'(gl\.|createShader|compileShader|getAttribLocation|getUniformLocation|ScrollTrigger)', js):
    start = max(0, m.start() - 100)
    end = min(len(js), m.end() + 200)
    print(f"Match around index {m.start()}:")
    print(js[start:end])
    print("="*60)
