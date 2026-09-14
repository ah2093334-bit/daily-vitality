// Renders the Daily Vitality shop grid from SITE_PRODUCTS (assets-data.js).
// Handles search + category filtering client-side. No backend required.
(function () {
  var CATEGORIES = [
    { slug: "all", label: "All" },
    { slug: "photos", label: "Photos" },
    { slug: "premium-photos", label: "Premium Photos" },
    { slug: "videos", label: "Videos" },
    { slug: "hd-videos", label: "HD / Full HD Videos" },
    { slug: "4k-videos", label: "4K Videos" },
    { slug: "short-videos", label: "Short Videos" },
    { slug: "ebooks", label: "eBooks" },
    { slug: "pdf-books", label: "PDF Books" },
    { slug: "digital-books", label: "Digital Books" },
    { slug: "templates", label: "Templates" },
    { slug: "workbooks", label: "Workbooks" },
    { slug: "checklists", label: "Checklists" },
    { slug: "documents", label: "Documents" },
    { slug: "social-media-packs", label: "Social Media Packs" },
    { slug: "scripts", label: "Scripts" },
    { slug: "premium-articles", label: "Premium Articles" },
    { slug: "bundles", label: "Bundles" },
    { slug: "software-tools", label: "Software & Tools" },
  ];

  function money(n, currency) {
    var symbol = currency === "USD" || !currency ? "$" : currency + " ";
    return symbol + Number(n).toFixed(2);
  }

  function productUrl(p) {
    return "shop/" + p.id + "-" + p.slug + ".html";
  }

  function buildCard(p) {
    var a = document.createElement("a");
    a.href = productUrl(p);
    a.className = "product-card";
    a.setAttribute("data-field", "product-card");
    a.setAttribute("data-asset-id", p.id);

    var badges = '<div class="product-badges">'
      + '<span class="badge type">' + escapeHtml(p.category.replace(/-/g, " ")) + "</span>"
      + (p.quality ? '<span class="badge quality">' + escapeHtml(p.quality) + "</span>" : "")
      + (p.aiGenerated ? '<span class="badge ai">AI</span>' : "")
      + "</div>";

    a.innerHTML =
      '<div class="product-thumb-wrap">' + badges +
      '<img src="' + p.thumbnail + '" alt="' + escapeHtml(p.altText || p.title) + '" loading="lazy"></div>' +
      '<div class="product-card-body">' +
      "<h3>" + escapeHtml(p.title) + "</h3>" +
      '<p class="product-desc">' + escapeHtml(p.shortDescription) + "</p>" +
      '<div class="product-card-footer">' +
      '<span class="product-price">' + money(p.price, p.currency) + "</span>" +
      '<span class="product-view-btn">View →</span>' +
      "</div></div>";
    return a;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("productGrid");
    var searchInput = document.getElementById("shopSearch");
    var filterWrap = document.getElementById("shopFilters");
    var emptyState = document.getElementById("shopEmptyState");
    if (!grid || typeof SITE_PRODUCTS === "undefined") return;

    var published = SITE_PRODUCTS.filter(function (p) { return p.status === "published"; });

    var counts = {};
    published.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });

    CATEGORIES.forEach(function (c) {
      if (c.slug !== "all" && !counts[c.slug]) return; // hide empty categories from the filter bar
      var btn = document.createElement("button");
      btn.className = "shop-filter-btn" + (c.slug === "all" ? " active" : "");
      btn.textContent = c.label + (c.slug === "all" ? " (" + published.length + ")" : " (" + counts[c.slug] + ")");
      btn.setAttribute("data-field", "category-filter");
      btn.setAttribute("data-category", c.slug);
      btn.setAttribute("data-action", "filter");
      filterWrap.appendChild(btn);
    });

    var state = { category: "all", query: "" };

    function render() {
      var q = state.query.trim().toLowerCase();
      var filtered = published.filter(function (p) {
        var matchesCategory = state.category === "all" || p.category === state.category;
        if (!matchesCategory) return false;
        if (!q) return true;
        var haystack = [p.title, p.shortDescription, p.category]
          .concat(p.keywords || [], p.tags || [])
          .join(" ")
          .toLowerCase();
        return haystack.indexOf(q) !== -1;
      });

      grid.innerHTML = "";
      if (!filtered.length) {
        emptyState.style.display = "block";
        return;
      }
      emptyState.style.display = "none";
      filtered.forEach(function (p) { grid.appendChild(buildCard(p)); });
    }

    filterWrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".shop-filter-btn");
      if (!btn) return;
      filterWrap.querySelectorAll(".shop-filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.category = btn.getAttribute("data-category");
      render();
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value;
        render();
      });
    }

    render();
  });
})();
