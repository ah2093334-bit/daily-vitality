/* Daily Vitality v15 — homepage: topic tiles, searchable/filterable article library with Load more (all articles reachable) */
(function () {
  var PAGE = 12, state = { cat: 'All', q: '', shown: PAGE }, data = [];
  var ICON = { 'Nutrition & Food': '🥗', 'Heart & Circulation': '❤️', 'Gut & Digestion': '🌿', 'Sleep & Recovery': '🌙', 'Skin, Hair & Beauty': '✨', 'Bones, Joints & Movement': '🚶', 'Brain & Mind': '🧠', 'Immunity & Lungs': '🛡️', 'Kidney, Urinary & Hydration': '💧', 'Eyes, Ears & Oral Care': '👁️', 'Metabolic Health': '⚖️', 'Daily Routines & Habits': '☀️' };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  function card(a) { return '<a class="article-card" data-cat="' + esc(a.category) + '" href="' + esc(a.slug) + '"><div class="card-cover"><img loading="lazy" src="assets/photos/' + esc(a.slug.replace(/\.html$/i, '')) + '.webp" decoding="async" alt="' + esc(a.title) + '"></div><div class="inside"><span class="cat">' + esc(a.category.toUpperCase()) + '</span><h3>' + esc(a.title) + '</h3><p>' + esc(a.description || '') + '</p></div></a>'; }
  function list() { var q = state.q.trim().toLowerCase(); return data.filter(function (a) { return (state.cat === 'All' || a.category === state.cat) && (!q || (a.title + ' ' + (a.description || '') + ' ' + a.category).toLowerCase().indexOf(q) > -1); }); }
  function render() {
    var l = list(), grid = document.getElementById('articleGrid'), more = document.getElementById('loadMore'), cnt = document.getElementById('articleCount');
    grid.innerHTML = l.slice(0, state.shown).map(card).join('') || '<p class="empty">No articles match your search yet.</p>';
    if (more) more.style.display = state.shown >= l.length ? 'none' : '';
    if (cnt) cnt.textContent = l.length + ' wellness reads' + (state.cat !== 'All' ? ' in ' + state.cat : '');
    document.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.toggle('active', b.dataset.cat === state.cat); });
  }
  function setCat(c, scroll) { state.cat = c; state.shown = PAGE; render(); if (scroll) { var el = document.getElementById('articles'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }
  function boot() {
    var grid = document.getElementById('articleGrid'); if (!grid) return;
    fetch('articles.json').then(function (r) { return r.json(); }).then(function (d) {
      data = d; var counts = {}; d.forEach(function (a) { counts[a.category] = (counts[a.category] || 0) + 1; });
      var cats = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; });
      var f = document.getElementById('filters'); f.innerHTML = '<button class="filter-pill active" data-cat="All">All (' + d.length + ')</button>' + cats.map(function (c) { return '<button class="filter-pill" data-cat="' + esc(c) + '">' + esc(c) + ' (' + counts[c] + ')</button>'; }).join('');
      f.addEventListener('click', function (e) { var b = e.target.closest('.filter-pill'); if (b) setCat(b.dataset.cat, false); });
      var t = document.getElementById('topicTiles'); if (t) { t.innerHTML = cats.map(function (c) { return '<button class="topic-tile" data-cat="' + esc(c) + '"><span class="ti">' + (ICON[c] || '🌱') + '</span><b>' + esc(c) + '</b><small>' + counts[c] + ' articles</small></button>'; }).join(''); t.addEventListener('click', function (e) { var b = e.target.closest('.topic-tile'); if (b) setCat(b.dataset.cat, true); }); }
      var s = document.getElementById('articleSearch'); if (s) s.addEventListener('input', function () { state.q = s.value; state.shown = PAGE; render(); });
      var m = document.getElementById('loadMore'); if (m) m.addEventListener('click', function (e) { e.preventDefault(); state.shown += PAGE; render(); });
      render();
    }).catch(function () { /* static first cards remain */ });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
