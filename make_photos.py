#!/usr/bin/env python3
"""Daily Vitality — real-photo maker.
Creates a photo for every article (assets/photos/<slug>.webp) and refreshes assets/photos/manifest.json.
The website switches to a photo automatically when its file exists; otherwise the illustrated cover stays.

Usage (run inside the site folder):
  pip install pillow
  python TOOLS/make_photos.py                      # free provider (pollinations.ai), resumes where it stopped
  python TOOLS/make_photos.py --limit 10           # try 10 first
  python TOOLS/make_photos.py --provider openai --key sk-...   # OpenAI image API (better, paid)
Then publish:  python TOOLS/dv_publish.py deploy --repo USER/REPO
"""
import argparse, io, json, os, sys, time, urllib.parse, urllib.request, urllib.error, base64

SCENES = {
 'Nutrition & Food': 'colorful fresh whole foods, vegetables and fruit on a rustic wooden kitchen table, natural window light',
 'Heart & Circulation': 'a relaxed middle-aged couple walking together in a sunny park, warm golden light',
 'Gut & Digestion': 'a bowl of fiber-rich vegetables, yogurt and herbal tea on a bright kitchen counter',
 'Sleep & Recovery': 'a calm, cozy bedroom in soft morning light, a person waking up rested',
 'Skin, Hair & Beauty': 'natural skincare products on a marble bathroom shelf, soft glowing daylight, fresh healthy skin',
 'Bones, Joints & Movement': 'a person stretching and walking outdoors at sunrise, active healthy lifestyle',
 'Brain & Mind': 'a person sitting quietly by a bright window with a journal and tea, calm mindful mood',
 'Immunity & Lungs': 'fresh citrus, ginger and greens in a clean bright kitchen, a person breathing fresh air outdoors',
 'Kidney, Urinary & Hydration': 'a glass of water with lemon and a reusable bottle in soft natural light',
 'Eyes, Ears & Oral Care': 'a bright natural smile and a healthy morning routine at a clean bathroom sink',
 'Metabolic Health': 'a balanced healthy plate and a morning walk, measured portions, natural light',
 'Daily Routines & Habits': 'a sunlit morning routine: planner, tea and fruit on a kitchen table, cozy home',
}
def prompt(a):
    scene = SCENES.get(a['category'], 'a healthy everyday lifestyle scene in natural light')
    return ('Photorealistic editorial lifestyle photograph for a health and wellness article titled "%s". %s. '
            'Warm natural tones, candid, shallow depth of field, professional magazine quality, 16:10 composition, '
            'no text, no logos, no watermark.' % (a['title'], scene))

def fetch(url, data=None, headers=None, timeout=180):
    req = urllib.request.Request(url, data=data, headers=headers or {'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()

def gen_pollinations(p, seed):
    url = 'https://image.pollinations.ai/prompt/%s?width=1280&height=800&model=flux&nologo=true&seed=%d' % (urllib.parse.quote(p), seed)
    return fetch(url)

def gen_openai(p, key):
    body = json.dumps({'model': 'gpt-image-1', 'prompt': p, 'size': '1536x1024', 'n': 1}).encode()
    out = json.loads(fetch('https://api.openai.com/v1/images/generations', body, {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key}))
    return base64.b64decode(out['data'][0]['b64_json'])

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--provider', default='pollinations', choices=['pollinations', 'openai'])
    ap.add_argument('--key', default=os.environ.get('OPENAI_API_KEY', ''))
    ap.add_argument('--limit', type=int, default=0)
    ap.add_argument('--delay', type=float, default=6.0, help='seconds between images (be polite to free services)')
    ap.add_argument('--site', default='.')
    args = ap.parse_args()
    try:
        from PIL import Image
    except ImportError:
        sys.exit('Please run:  pip install pillow')
    site = os.path.abspath(args.site); pdir = os.path.join(site, 'assets', 'photos'); os.makedirs(pdir, exist_ok=True)
    arts = json.load(open(os.path.join(site, 'articles.json'), encoding='utf-8'))
    todo = [a for a in arts if not os.path.exists(os.path.join(pdir, a['slug'].replace('.html', '') + '.webp'))]
    if args.limit: todo = todo[:args.limit]
    print('%d articles, %d photos still to make' % (len(arts), len(todo)))
    done = 0
    for i, a in enumerate(todo, 1):
        slug = a['slug'].replace('.html', ''); out = os.path.join(pdir, slug + '.webp')
        try:
            raw = gen_openai(prompt(a), args.key) if args.provider == 'openai' else gen_pollinations(prompt(a), abs(hash(slug)) % 100000)
            im = Image.open(io.BytesIO(raw)).convert('RGB')
            w, h = im.size; tw, th = 1280, 800; s = max(tw / w, th / h); im = im.resize((int(w * s), int(h * s)))
            l, t = (im.size[0] - tw) // 2, (im.size[1] - th) // 2; im = im.crop((l, t, l + tw, t + th))
            im.save(out, 'WEBP', quality=82); done += 1
            print('[%d/%d] ok  %s' % (i, len(todo), slug))
        except (urllib.error.URLError, OSError, KeyError, ValueError) as e:
            print('[%d/%d] FAILED %s — %s' % (i, len(todo), slug, e))
        names = sorted(f[:-5] for f in os.listdir(pdir) if f.endswith('.webp'))
        json.dump(names, open(os.path.join(pdir, 'manifest.json'), 'w'))
        time.sleep(args.delay)
    print('finished: %d new photos. Now publish with dv_publish.py' % done)

if __name__ == '__main__':
    main()
