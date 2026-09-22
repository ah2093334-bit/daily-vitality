#!/usr/bin/env python3
"""Daily Vitality — publish tool (uploads EVERY file including sub-folders in ONE GitHub commit; never deletes anything).

  python TOOLS/dv_publish.py deploy --repo USER/REPO            # upload the whole site folder (only changed files)
  python TOOLS/dv_publish.py layer  --repo USER/REPO            # keep your live pages, add the new theme + cover engine to them

Token: create a GitHub token (Contents: Read and write) and set it as GITHUB_TOKEN, or paste it when asked.
"""
import argparse, base64, getpass, hashlib, json, os, re, sys, urllib.request, urllib.error

API = os.environ.get('DV_GITHUB_API', 'https://api.github.com')
SKIP_DIRS = {'.git', 'TOOLS', 'node_modules', '__pycache__', 'DEV-TESTS'}
SKIP_EXT = {'.py', '.bat', '.pyc'}
LAYER_FILES = ['dv-natural-v15.css', 'dv-covers.js', 'dv-site-v15.js']

def call(method, path, token, body=None):
    req = urllib.request.Request(API + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json', 'User-Agent': 'dv-publish'})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            t = r.read(); return json.loads(t) if t else {}
    except urllib.error.HTTPError as e:
        msg = e.read().decode('utf-8', 'ignore')[:300]
        if e.code == 404: return None
        sys.exit('GitHub error %s on %s %s: %s' % (e.code, method, path, msg))

def gitsha(data): return hashlib.sha1(b'blob %d\0' % len(data) + data).hexdigest()

def local_files(folder):
    out = {}
    for root, dirs, files in os.walk(folder):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if os.path.splitext(f)[1].lower() in SKIP_EXT: continue
            p = os.path.join(root, f); rel = os.path.relpath(p, folder).replace(os.sep, '/')
            out[rel] = open(p, 'rb').read()
    return out

def commit(repo, token, files, message):
    info = call('GET', '/repos/%s' % repo, token)
    if not info: sys.exit('Repo not found or token has no access: ' + repo)
    branch = info['default_branch']
    ref = call('GET', '/repos/%s/git/ref/heads/%s' % (repo, branch), token); parent = ref['object']['sha']
    ptree = call('GET', '/repos/%s/git/commits/%s' % (repo, parent), token)['tree']['sha']
    remote = call('GET', '/repos/%s/git/trees/%s?recursive=1' % (repo, ptree), token) or {'tree': []}
    have = {t['path']: t['sha'] for t in remote['tree'] if t['type'] == 'blob'}
    changed = {p: d for p, d in files.items() if have.get(p) != gitsha(d)}
    print('%d files checked, %d new/changed' % (len(files), len(changed)))
    if not changed: print('Nothing to upload — site already up to date.'); return
    tree = []
    for i, (p, d) in enumerate(sorted(changed.items()), 1):
        b = call('POST', '/repos/%s/git/blobs' % repo, token, {'content': base64.b64encode(d).decode(), 'encoding': 'base64'})
        tree.append({'path': p, 'mode': '100644', 'type': 'blob', 'sha': b['sha']})
        if i % 25 == 0: print('  uploaded %d/%d' % (i, len(changed)))
    t = call('POST', '/repos/%s/git/trees' % repo, token, {'base_tree': ptree, 'tree': tree})
    c = call('POST', '/repos/%s/git/commits' % repo, token, {'message': message, 'tree': t['sha'], 'parents': [parent]})
    call('PATCH', '/repos/%s/git/refs/heads/%s' % (repo, branch), token, {'sha': c['sha'], 'force': False})
    print('DONE — one commit %s on %s/%s. GitHub Pages will update in 1-2 minutes.' % (c['sha'][:7], repo, branch))

def inject(html):
    if 'dv-natural-v15.css' not in html: html = html.replace('</head>', '<link rel="stylesheet" href="dv-natural-v15.css">\n</head>', 1)
    if 'dv-covers.js' not in html: html = html.replace('</body>', '<script src="dv-site-v15.js"></script><script src="dv-covers.js"></script></body>', 1)
    return html

def layer(repo, token, folder):
    info = call('GET', '/repos/%s' % repo, token)
    if not info: sys.exit('Repo not found: ' + repo)
    branch = info['default_branch']
    ref = call('GET', '/repos/%s/git/ref/heads/%s' % (repo, branch), token)
    ptree = call('GET', '/repos/%s/git/commits/%s' % (repo, ref['object']['sha']), token)['tree']['sha']
    remote = call('GET', '/repos/%s/git/trees/%s?recursive=1' % (repo, ptree), token)['tree']
    files = {}
    for f in LAYER_FILES: files[f] = open(os.path.join(folder, f), 'rb').read()
    if os.path.exists(os.path.join(folder, 'assets/photos/manifest.json')):
        for rel, d in local_files(os.path.join(folder, 'assets/photos')).items(): files['assets/photos/' + rel] = d
    n = 0
    for t in remote:
        if t['type'] == 'blob' and t['path'].endswith('.html') and '/' not in t['path']:
            b = call('GET', '/repos/%s/git/blobs/%s' % (repo, t['sha']), token); html = base64.b64decode(b['content']).decode('utf-8', 'ignore')
            if 'http-equiv="refresh"' in html: continue
            new = inject(html)
            if new != html: files[t['path']] = new.encode('utf-8'); n += 1
    print('%d live pages will get the new theme layer' % n)
    commit(repo, token, files, 'Daily Vitality: natural theme + cover engine layer')

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('command', choices=['deploy', 'layer']); ap.add_argument('--repo', required=True, help='USER/REPO')
    ap.add_argument('--folder', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')); ap.add_argument('--token', default=os.environ.get('GITHUB_TOKEN', ''))
    a = ap.parse_args(); token = a.token or getpass.getpass('GitHub token: '); folder = os.path.abspath(a.folder)
    if a.command == 'deploy': commit(a.repo, token, local_files(folder), 'Daily Vitality: site update')
    else: layer(a.repo, token, folder)

if __name__ == '__main__':
    main()
