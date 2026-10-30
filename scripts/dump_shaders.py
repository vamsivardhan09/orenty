import re

with open('reference/persist/index-BDrtZzZ4.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Look for multi-line string templates with gl_FragColor or gl_Position
shaders = re.findall(r'(`[^`]*gl_FragColor[^`]*`)', js)
print(f"Found {len(shaders)} fragment shaders:")
for i, s in enumerate(shaders):
    print(f"=== Shader {i} ===")
    print(s[:1500])
    print("\n" + "="*40 + "\n")

vert_shaders = re.findall(r'(`[^`]*gl_Position[^`]*`)', js)
print(f"Found {len(vert_shaders)} vertex shaders:")
for i, s in enumerate(vert_shaders):
    print(f"=== Vert Shader {i} ===")
    print(s[:1000])
    print("\n" + "="*40 + "\n")
