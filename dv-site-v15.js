/* Daily Vitality v15 — shared header behaviour (hamburger) */
(function () {
  function init() {
    var b = document.getElementById('hamb'), m = document.getElementById('mobileMenu'); if (!b || !m) return;
    var nb = b.cloneNode(true); b.parentNode.replaceChild(nb, b);
    nb.addEventListener('click', function (e) { e.stopPropagation(); var open = m.classList.toggle('show'); nb.setAttribute('aria-expanded', open ? 'true' : 'false'); nb.textContent = open ? '✕' : '☰'; });
    m.addEventListener('click', function (e) { if (e.target.closest('a')) { m.classList.remove('show'); nb.textContent = '☰'; } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
