import re
import urllib.request

with open('reference/persist/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', html)
print("Scripts found:")
for s in scripts:
    print(" -", s)

inline_scripts = re.findall(r'<script(?![^>]*src)[^>]*>(.*?)</script>', html, re.DOTALL)
print(f"Inline script tags count: {len(inline_scripts)}")
for idx, sc in enumerate(inline_scripts):
    print(f"--- Inline script {idx} (len {len(sc)}) ---")
    print(sc[:500])

links = re.findall(r'<link[^>]*href=["\']([^"\']+)["\']', html)
print("Links found:")
for l in links:
    print(" -", l)
