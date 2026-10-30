import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
base = 'https://persist.org'

for asset in ['/assets/index-BDrtZzZ4.js', '/assets/index-DCnnCfjk.css', '/assets/gsap-Bxjai2tQ.js']:
    try:
        url = base + asset
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        filename = asset.split('/')[-1]
        with open(f'reference/persist/{filename}', 'w', encoding='utf-8') as f:
            f.write(data)
        print(f"Downloaded {filename}: {len(data)} bytes")
    except Exception as e:
        print(f"Failed {asset}: {e}")
