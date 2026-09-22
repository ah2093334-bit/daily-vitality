/* Daily Vitality v15 — article page enhancements: table of contents, related reads, resources, tools, newsletter (no fake galleries) */
(function () {
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  var PRODUCTS = [
    { href: 'https://6517409126048.gumroad.com/l/simple-habits-healthier-life', title: 'Simple Habits for a Healthier Life', cat: 'Guide', d: 'Small daily habits you can actually keep.' },
    { href: 'https://6517409126048.gumroad.com/l/gut-health-blueprint', title: 'The Complete Gut Health Blueprint', cat: 'eBook', d: 'A practical guide to everyday digestive wellness.' },
    { href: 'https://6517409126048.gumroad.com/l/simple-sleep-reset-guide', title: 'Simple Sleep Reset Guide', cat: 'Guide', d: 'A gentle plan for calmer nights.' }
  ];
  var TOOLS = [['bmi-calculator.html', '⚖️', 'BMI Calculator'], ['water-intake-planner.html', '💧', 'Water Planner'], ['sleep-schedule-calculator.html', '🌙', 'Sleep Schedule'], ['daily-routine-builder.html', '☀️', 'Routine Builder'], ['breathing-exercise-timer.html', '🌬️', 'Breathing Timer']];
  function card(a) { return '<a class="article-card" data-cat="' + esc(a.category) + '" href="' + esc(a.slug) + '"><div class="card-cover"><img loading="lazy" src="cover-' + esc(a.slug.replace(/\.html$/i, '').toLowerCase()) + '.webp" decoding="async" alt="' + esc(a.title) + '"></div><div class="inside"><span class="cat">' + esc(a.category.toUpperCase()) + '</span><h3>' + esc(a.title) + '</h3><p>' + esc(a.description || '') + '</p></div></a>'; }
  document.addEventListener('DOMContentLoaded', function () {
    var art = document.querySelector('.article-hero'); if (!art) return; var main = art.querySelector('.article-main'); if (!main) return;
    var blocks = [].slice.call(main.querySelectorAll('.content-block')), hs = [];
    blocks.forEach(function (b, i) { var h = b.querySelector('h2'); if (h) { h.id = h.id || 's' + (i + 1); hs.push(h); } });
    var grid = art.querySelector('.intro-grid');
    if (hs.length >= 3 && grid) { var toc = document.createElement('section'); toc.className = 'toc-box'; toc.innerHTML = '<span class="eyebrow">IN THIS ARTICLE</span><div class="toc-chips">' + hs.map(function (h) { return '<a href="#' + h.id + '">' + esc(h.textContent.replace(/^Step \d+:\s*/, '')) + '</a>'; }).join('') + '</div>'; grid.insertAdjacentElement('afterend', toc); }
    var slug = decodeURIComponent(location.pathname.split('/').pop() || '');
    var res = document.createElement('section'); res.className = 'link-card resources';
    res.innerHTML = '<span class="eyebrow">GO DEEPER</span><h3>Helpful Daily Vitality resources</h3><div class="resource-grid">' + PRODUCTS.map(function (p, i) { return '<a class="resource-card" href="' + p.href + '" target="_blank" rel="noopener"><div class="card-cover"><img loading="lazy" src="' + (i===0?'ebook-cover.jpg':i===1?'gut-health-cover.jpg':'sleep-reset-cover.jpg') + '" alt="' + esc(p.title) + '"></div><div class="inside"><span class="cat">' + p.cat.toUpperCase() + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.d) + '</p></div></a>'; }).join('') + '</div>';
    var tools = document.createElement('section'); tools.className = 'link-card tools-strip'; tools.innerHTML = '<span class="eyebrow">FREE TOOLS</span><h3>Try a wellness tool</h3><div class="tool-tiles">' + TOOLS.map(function (t) { return '<a class="tool-tile" href="' + t[0] + '"><span>' + t[1] + '</span><b>' + t[2] + '</b></a>'; }).join('') + '</div>';
    var news = document.createElement('section'); news.className = 'article-newsletter';
    news.innerHTML = '<div class="newsletter-card"><div><span class="eyebrow">EMAIL SIGNUP</span><h2 class="newsletter-title">Enjoyed this article?</h2><p class="newsletter-note">Join the Daily Vitality list for new wellness reads, tools and product updates.</p><div class="nl-status"></div></div><div><form class="newsletter-form"><input type="email" placeholder="Enter your email" required><button type="submit">Join Free</button></form></div></div>';
    var end = main.querySelector('.end-note');
    [res, tools].forEach(function (n) { end ? main.insertBefore(n, end) : main.appendChild(n); }); main.appendChild(news);
    fetch('articles.json').then(function (r) { return r.json(); }).then(function (list) {
      var me = list.filter(function (a) { return a.slug === slug; })[0], cat = me && me.category; var rel = list.filter(function (a) { return a.slug !== slug && (!cat || a.category === cat); }).slice(0, 3);
      if (rel.length < 3) list.filter(function (a) { return a.slug !== slug && rel.indexOf(a) < 0; }).slice(0, 3 - rel.length).forEach(function (a) { rel.push(a); });
      var sec = document.createElement('section'); sec.className = 'related-reads'; sec.innerHTML = '<span class="eyebrow">KEEP READING</span><h2>Related articles</h2><div class="article-grid">' + rel.map(card).join('') + '</div>';
      var wrap = document.querySelector('.article-wrap'); if (wrap) wrap.appendChild(sec);
    }).catch(function () { });
  });
})();
