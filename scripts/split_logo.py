from PIL import Image
import numpy as np

img = Image.open('reference/orenty-logo-original.jpg')
w, h = img.size
print(f"Original image size: {w}x{h}")

# Left half (black on white): x: 0..w//2
left = img.crop((0, 0, w // 2, h))
left.save('reference/logo-left-raw.png')

# Right half (white on black): x: w//2..w
right = img.crop((w // 2, 0, w, h))
right.save('reference/logo-right-raw.png')

print("Saved left and right raw crops.")
