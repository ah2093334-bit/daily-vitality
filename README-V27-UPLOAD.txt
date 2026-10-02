DAILY VITALITY V27 FINAL — ROOT UPLOAD PATCH

UPLOAD:
1. DO NOT delete the existing daily-vitality repository.
2. Extract this ZIP.
3. Upload the files inside this folder to the repository ROOT (same level as index.html).
4. Replace matching filenames and commit.
5. If GitHub web upload handles only a smaller batch comfortably, upload in batches; paths stay the same.
6. Wait for GitHub Pages deployment, then Ctrl+F5.

AFTER DEPLOYMENT:
- Re-run PageSpeed Mobile + Desktop.
- Search Console sitemap.xml was successfully submitted on Oct 1, 2026; do not repeatedly submit it.
- Inspect and request indexing once for: /, /all-articles.html, /tools.html, /blogs.html and a few strong articles after deployment.

V27 CHANGES:
- One consolidated premium CSS bundle replaces multiple legacy premium CSS requests.
- One V27 premium JS replaces old V21-V26 premium runtime layers.
- First homepage hero image is preloaded/eager/high priority; later hero images lazy-load.
- Faster smooth Categories / Tools / Products rails plus working left/right arrows.
- Sticky responsive header and earlier mobile-menu fallback.
- Sitewide crawl links before footer.
- Public pages get index/follow + canonical + breadcrumb schema where missing.
- Account/Saved utility pages use noindex.
- Clean regenerated sitemap.xml and robots.txt.
- 12 lightweight user-selectable themes saved in the browser; reduced-motion supported.
- 4 new tools: BMR/TDEE Calculator, Macro Split Planner, Sleep Schedule Planner, Habit Streak Planner.
- 4 new sourced wellness articles tied to those tools.

IMPORTANT:
Google crawling, indexing and rankings are not instant or guaranteed. The patch fixes discovery, technical SEO and performance structure; Search Console needs time to process the new deployment.
