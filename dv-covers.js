/* Daily Vitality v15 — cover engine. Draws warm, photo-like editorial artwork (no text) for any article/tool/blog image,
   upgrades to a real photo when assets/photos/<slug>.webp exists, and never leaves a broken image on the page. */
(function () {
  'use strict';
  var PAL = {
    nutrition: ['#FFF1D6', '#F6A64B', '#3F8F5B', '#E4572E'], heart: ['#FFE6E3', '#F28B82', '#B8324A', '#FFB4A2'],
    gut: ['#EEF7E4', '#9CCB6E', '#E9A93B', '#4E9A66'], sleep: ['#ECE7FF', '#9C8BE6', '#3E3B86', '#F6C177'],
    skin: ['#FFEDE4', '#F4B29E', '#C7737F', '#F7D8A8'], move: ['#FFF0D9', '#F2A65A', '#2F8079', '#E86F51'],
    mind: ['#EFE9FF', '#B39DDB', '#2C7A7B', '#F3C969'], immune: ['#EAF7E8', '#86CE97', '#E8B33F', '#2F8F6B'],
    water: ['#E3F5F6', '#7CC8D0', '#2A8090', '#F5C26B'], general: ['#E6F5EC', '#78CDB0', '#EFB35F', '#2E8B6E']
  };
  var KEYS = [
    ['heart', /heart|blood|pressure|cholesterol|circulat|stroke|cardio|vascular/i], ['sleep', /sleep|insomnia|recovery|rest|nap|circadian|melatonin/i],
    ['gut', /gut|digest|stomach|bowel|probiotic|fiber|fibre|ibs|reflux|constipation|microbio/i], ['skin', /skin|hair|eczema|psoria|acne|collagen|beauty|nail|glow/i],
    ['mind', /brain|mind|mental|anxiety|stress|mood|focus|memory|depress|mindful|calm/i], ['move', /bone|joint|muscle|move|walk|exercise|fitness|posture|arthritis|back|spine|strength|step/i],
    ['water', /kidney|urinary|hydrat|water|bladder|thirst/i], ['immune', /immun|cold|flu|vitamin|infection|allerg|asthma|respirat|lung/i],
    ['nutrition', /nutri|food|diet|meal|protein|fruit|vegetable|eat|recipe|sugar|salt|sodium|apple|banana|superfood|carb|fat|oil|breakfast|drink|tea|coffee/i]
  ];
  function guess(text, cat) {
    var t = (cat || '') + ' ' + (text || '');
    for (var i = 0; i < KEYS.length; i++) if (KEYS[i][1].test(t)) return KEYS[i][0];
    return 'general';
  }
  function hash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var a = seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function n(x) { return Math.round(x * 10) / 10; }

  function motif(kind, r, c, cx, cy, s) {
    var o = '', k, i;
    if (kind === 'nutrition') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')"><circle r="150" fill="' + c[3] + '" opacity=".95"/><circle r="128" fill="#FFE2A8"/><circle r="112" fill="' + c[1] + '"/>';
      for (i = 0; i < 10; i++) { o += '<path d="M0 0L' + n(Math.cos(i * 0.628) * 104) + ' ' + n(Math.sin(i * 0.628) * 104) + '" stroke="#FFF3D6" stroke-width="5" opacity=".75"/>'; }
      o += '<circle r="14" fill="#FFF3D6"/></g>';
      for (i = 0; i < 3; i++) { var lx = cx - 250 + i * 30, ly = cy + 150 - i * 45; o += '<path transform="rotate(' + (-40 + i * 25) + ' ' + lx + ' ' + ly + ')" d="M' + lx + ' ' + ly + 'c40-60 110-70 170-30c-50 70-120 80-170 30z" fill="' + c[2] + '" opacity="' + (0.92 - i * 0.14) + '"/>'; }
    } else if (kind === 'heart') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')"><path d="M0 130C-150 30-160-90-70-115C-25-128 0-95 0-80C0-95 25-128 70-115C160-90 150 30 0 130Z" fill="' + c[2] + '"/><path d="M0 105C-120 25-125-70-62-90C-28-100-8-78 0-62" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="10" stroke-linecap="round"/></g>';
      o += '<path d="M' + (cx - 360) + ' ' + (cy + 40) + 'h180l30-70 50 150 45-110 30 30h250" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>';
    } else if (kind === 'sleep') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')"><circle r="135" fill="#FFF2CF"/><circle cx="58" cy="-22" r="118" fill="' + c[2] + '"/></g>';
      for (i = 0; i < 14; i++) { o += '<circle cx="' + n(r() * 1200) + '" cy="' + n(r() * 330) + '" r="' + n(2 + r() * 4) + '" fill="#fff" opacity="' + n(0.4 + r() * 0.5) + '"/>'; }
    } else if (kind === 'skin') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')"><path d="M0-160C70-70 120-10 120 60A120 120 0 0 1-120 60C-120-10-70-70 0-160Z" fill="' + c[2] + '" opacity=".92"/><path d="M-60 70a62 62 0 0 0 52 44" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="12" stroke-linecap="round"/></g>';
      for (i = 0; i < 3; i++) { o += '<circle cx="' + (cx - 260 + i * 60) + '" cy="' + (cy + 120 - i * 40) + '" r="' + (16 + i * 9) + '" fill="#fff" opacity=".45"/>'; }
    } else if (kind === 'mind') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')">';
      for (i = -2; i <= 2; i++) { o += '<ellipse cx="' + (i * 46) + '" cy="' + (Math.abs(i) * 14) + '" rx="46" ry="122" transform="rotate(' + (i * 24) + ' ' + (i * 46) + ' 100)" fill="' + (i % 2 ? c[1] : c[2]) + '" opacity="' + (0.9 - Math.abs(i) * 0.12) + '"/>'; }
      o += '</g>';
    } else if (kind === 'move') {
      o += '<circle cx="' + (cx + 40) + '" cy="' + (cy - 20) + '" r="120" fill="#FFF0C9"/>';
      for (i = 0; i < 5; i++) { o += '<rect x="' + (cx - 300 + i * 88) + '" y="' + (cy + 150 - i * 44) + '" width="88" height="' + (300 + i * 44) + '" rx="16" fill="' + (i % 2 ? c[2] : c[3]) + '" opacity="' + n(0.95 - i * 0.05) + '"/>'; }
    } else if (kind === 'gut') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')" fill="none" stroke-linecap="round"><path d="M-150 90C-150-40 90-40 90 40C90 130-60 110-40 30C-30-20 40-10 40 20" stroke="' + c[2] + '" stroke-width="34"/><path d="M-150 90C-150-40 90-40 90 40" stroke="#fff" stroke-opacity=".3" stroke-width="10"/></g>';
      for (i = 0; i < 6; i++) { o += '<circle cx="' + n(cx - 300 + r() * 600) + '" cy="' + n(cy - 140 + r() * 280) + '" r="' + n(8 + r() * 14) + '" fill="' + (i % 2 ? c[1] : c[3]) + '" opacity=".7"/>'; }
    } else if (kind === 'immune') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')"><path d="M0-150L118-100V-6C118 70 66 122 0 150C-66 122-118 70-118-6V-100Z" fill="' + c[2] + '"/><path d="M-46 4L-12 40 52-34" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></g>';
    } else if (kind === 'water') {
      o += '<g transform="translate(' + cx + ',' + cy + ') scale(' + s + ')"><path d="M0-165C75-70 125-5 125 62A125 125 0 0 1-125 62C-125-5-75-70 0-165Z" fill="' + c[2] + '" opacity=".9"/><path d="M-70 78a72 72 0 0 0 60 52" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="12" stroke-linecap="round"/></g>';
      for (i = 0; i < 4; i++) { o += '<ellipse cx="' + (cx + 180 + i * 34) + '" cy="' + (cy + 130 + (i % 2) * 20) + '" rx="' + (46 - i * 6) + '" ry="10" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="4"/>'; }
    } else {
      o += '<circle cx="' + cx + '" cy="' + (cy - 30) + '" r="' + n(120 * s) + '" fill="#FFF0C9"/>';
      for (i = 0; i < 12; i++) { var a = i * Math.PI / 6; o += '<path d="M' + n(cx + Math.cos(a) * 150 * s) + ' ' + n(cy - 30 + Math.sin(a) * 150 * s) + 'L' + n(cx + Math.cos(a) * 200 * s) + ' ' + n(cy - 30 + Math.sin(a) * 200 * s) + '" stroke="#FFE3A3" stroke-width="10" stroke-linecap="round"/>'; }
      for (i = 0; i < 3; i++) { var lx2 = cx - 230 + i * 36, ly2 = cy + 150 - i * 40; o += '<path transform="rotate(' + (-30 + i * 22) + ' ' + lx2 + ' ' + ly2 + ')" d="M' + lx2 + ' ' + ly2 + 'c40-60 110-70 170-30c-50 70-120 80-170 30z" fill="' + c[3] + '" opacity="' + (0.92 - i * 0.15) + '"/>'; }
    }
    return o;
  }

  function art(title, cat, seed) {
    var kind = guess(title, cat), c = PAL[kind] || PAL.general, s0 = hash((seed || '') + '|' + title), r = rng(s0), id = 'g' + s0.toString(36);
    var cx = n(690 + r() * 130), cy = n(300 + r() * 50), sc = n(0.9 + r() * 0.25), flip = r() > 0.5;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice"><defs>' +
      '<linearGradient id="' + id + 'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '" stop-opacity=".55"/></linearGradient>' +
      '<radialGradient id="' + id + 'b" cx="' + (flip ? 0.75 : 0.3) + '" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<filter id="' + id + 'n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + (s0 % 97) + '"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .25  0 0 0 0 .2  0 0 0 .09 0"/></filter>' +
      '<filter id="' + id + 'f"><feGaussianBlur stdDeviation="14"/></filter></defs>' +
      '<rect width="1200" height="720" fill="url(#' + id + 'a)"/><rect width="1200" height="720" fill="url(#' + id + 'b)"/>';
    for (var i = 0; i < 7; i++) { svg += '<circle cx="' + n(r() * 1200) + '" cy="' + n(r() * 500) + '" r="' + n(28 + r() * 70) + '" fill="#fff" opacity="' + n(0.12 + r() * 0.2) + '" filter="url(#' + id + 'f)"/>'; }
    svg += '<path d="M0 470C180 400 330 430 520 480S900 520 1200 430V720H0Z" fill="' + c[1] + '" opacity=".38"/>' +
      '<path d="M0 540C240 470 430 520 640 560S1000 600 1200 520V720H0Z" fill="' + c[2] + '" opacity=".55"/>';
    svg += '<g' + (flip ? ' transform="translate(1200,0) scale(-1,1)"' : '') + '>' + motif(kind, r, c, cx, cy, sc) + '</g>';
    svg += '<path d="M0 640C260 590 470 650 700 640S1040 600 1200 630V720H0Z" fill="' + c[2] + '" opacity=".9"/>' +
      '<rect width="1200" height="720" filter="url(#' + id + 'n)"/></svg>';
    return svg;
  }
  var enc = function (svg) { return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); };
  var LOGO = "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 74"><defs><linearGradient id="l" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#38b98f"/><stop offset="1" stop-color="#0f7a63"/></linearGradient></defs><g transform="translate(4,5)"><path d="M31 60C12 48 5 28 12 8c18 7 27 19 29 33 5-15 17-27 33-34 4 25-5 46-30 59-5 3-9 3-13-6z" fill="url(#l)"/><path d="M42 58V21" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/></g><text x="88" y="38" fill="#16352d" font-family="Georgia,\'Times New Roman\',serif" font-size="30" font-weight="700">Daily Vitality</text><text x="89" y="60" fill="#5d7a70" font-family="Arial,sans-serif" font-size="12" letter-spacing=".4">Better Habits. A Healthier You.</text></svg>');

  window.DV = window.DV || {};
  var legacySvg = window.DV.svgData;
  window.DV.svgData = function (title, sub, seed) { return enc(art(String(title || ''), String(sub || ''), String(seed || ''))); };
  window.DVC = { art: art, dataUri: window.DV.svgData, logo: LOGO, guess: guess };

  var LEGACY = /(assets\/(topic-visuals|article-covers|v9-covers|tool-covers|step-galleries|v9-steps|reference)\/|(^|\/)hero-\d+\.webp)/i;
  var photos = null, base = '';
  function slugOf(img) {
    var a = img.closest('a[href]'); var h = a ? a.getAttribute('href') : location.pathname;
    try { h = decodeURIComponent(String(h || '').split('#')[0].split('?')[0].split('/').pop()); } catch (e) { h = ''; }
    return h.replace(/\.html$/i, '');
  }
  function textOf(img) {
    var t = (img.getAttribute('alt') || '').replace(/ (cover image|step \d+ visual \d+|wellness visual|premium editorial feature)$/i, '');
    var card = img.closest('.article-card,.blog-card,.mini-card,.tool-card,.slide,.nav-tile'); var h = card && card.querySelector('h3,b,.cap b,.slide-cap');
    return (h && h.textContent) || t || document.title;
  }
  function catOf(img) { var el = img.closest('[data-cat]'); if (el) return el.getAttribute('data-cat'); var c = img.closest('.article-card,.blog-card'); var s = c && c.querySelector('.cat'); return s ? s.textContent : ''; }
  function usePhoto(img) { var slug = img.__dvSlug, art = img.__dvArt; var t = new Image(); t.onload = function () { img.src = t.src; }; t.onerror = function () { img.src = art; }; t.src = base + 'assets/photos/' + slug + '.webp'; if (!img.src || img.src.indexOf('data:') !== 0) img.src = art; }
  function fix(img) {
    if (!img || img.dataset.dvc) return; var src = img.getAttribute('src') || '';
    var isLogo = img.closest('.brand,.logo'); if (isLogo) { img.dataset.dvc = '1'; if (!/^data:/.test(src)) { img.src = LOGO; } return; }
    var inCover = img.closest('.card-cover,.hero-cover,.slide,.mini-card,.nav-tile,.step-card,.article-top');
    var legacy = LEGACY.test(src) || (/^data:image\/svg/.test(src) && inCover);
    if (!legacy) return; img.dataset.dvc = '1';
    var title = textOf(img), cat = catOf(img), slug = slugOf(img), seed = src.slice(-40) + slug;
    var artUri = window.DV.svgData(title, cat, seed);
    img.__dvSlug = slug; img.__dvArt = artUri;
    if (photos && photos[slug]) usePhoto(img); else img.src = artUri;
    img.removeAttribute('srcset');
  }
  function run(root) { (root || document).querySelectorAll('img').forEach(fix); }
  document.addEventListener('error', function (e) {
    var t = e.target; if (!t || t.tagName !== 'IMG' || t.dataset.dvc === 'x') return; t.dataset.dvc = 'x';
    if (t.closest('.brand,.logo')) { t.src = LOGO; return; }
    t.src = window.DV.svgData(textOf(t), catOf(t), slugOf(t) + (t.getAttribute('src') || '').slice(-20));
  }, true);
  function boot() {
    fetch(base + 'assets/photos/manifest.json').then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }).then(function (l) {
      photos = {}; (l || []).forEach(function (x) { photos[x] = 1; }); document.querySelectorAll('img').forEach(function (i) { if (i.__dvSlug && photos[i.__dvSlug]) usePhoto(i); }); run(document);
    });
    run(document);
    new MutationObserver(function (m) { m.forEach(function (x) { x.addedNodes.forEach(function (nd) { if (nd.nodeType === 1) { if (nd.tagName === 'IMG') fix(nd); else run(nd); } }); }); }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
