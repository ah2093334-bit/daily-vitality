#!/usr/bin/env python3
"""
Regenerates the article cards on index.html from articles-data.js.

articles-data.js is the single source of truth for every published article
(id, title, url, category, date, thumbnail, description). Never hand-edit the
post-card markup in index.html directly — edit articles-data.js instead, then
run this script:

    python3 scripts/build-homepage-cards.py

This keeps the homepage and the data file permanently in sync and prevents
the duplicate/broken/mismatched-thumbnail cards problem from coming back.

To add a new article:
  1. Publish the article .html file (same folder as index.html).
  2. Add one entry to the SITE_ARTICLES array in articles-data.js with a
     permanent, never-reused `id` and a `thumbnail` (an unused hero-NNN.webp,
     or the article's own distinct image).
  3. Run this script. It re-sorts newest-first and rewrites the card block.
"""
import re
import html
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "articles-data.js"
INDEX_FILE = ROOT / "index.html"

START_MARKER = "<!-- WAFADAR_INDEX_ARTICLES_AUTO -->"

# Canonical display label per category slug (must match styles.css / category-nav filters).
CATEGORY_LABELS = {
    "mind": "Mind",
    "body": "Body",
    "fitness": "Fitness",
    "nutrition": "Nutrition",
    "immunity": "Immunity",
    "skin": "Skin & Senses",
    "chronic": "Chronic Health",
    "sleep": "Sleep",
}


def parse_articles_data(text: str):
    """Parse the SITE_ARTICLES array out of articles-data.js (simple, controlled format)."""
    entries = []
    for m in re.finditer(r"\{([^{}]*)\}", text):
        body = m.group(1)
        fields = {}
        for fm in re.finditer(r'(\w+):\s*"((?:[^"\\]|\\.)*)"', body):
            key, val = fm.group(1), fm.group(2)
            fields[key] = val.replace('\\"', '"').replace("\\\\", "\\")
        if "id" in fields and "url" in fields:
            entries.append(fields)
    return entries


def esc(s: str) -> str:
    return html.escape(s, quote=False).replace("'", "&#39;")


def build_card(r: dict) -> str:
    cat = r["category"]
    title_e = esc(r["title"])
    desc_e = esc(r.get("description") or "Practical evidence-aware wellness guidance from Daily Vitality.")
    return (
        f'    <a href="{r["url"]}" class="post-card cat-{cat}" data-wafadar-article="{r["url"]}">\n'
        f'      <img src="{r["thumbnail"]}" class="post-thumb" alt="{title_e}">\n'
        f'      <div class="post-card-body"><div class="date">{r["date"]}</div>'
        f'<span class="category-tag {cat}">{CATEGORY_LABELS.get(cat, cat.title())}</span>'
        f'<h3>{title_e}</h3><p>{desc_e}</p></div>\n'
        f'    </a>\n'
    )


def main():
    data_text = DATA_FILE.read_text(encoding="utf-8")
    entries = parse_articles_data(data_text)
    if not entries:
        print("ERROR: no entries parsed from articles-data.js — aborting, index.html untouched.")
        sys.exit(1)

    ids = [e["id"] for e in entries]
    if len(ids) != len(set(ids)):
        seen, dupes = set(), set()
        for i in ids:
            (dupes if i in seen else seen).add(i)
        print(f"ERROR: duplicate article id(s) in articles-data.js: {sorted(dupes)} — fix before regenerating.")
        sys.exit(1)

    thumbs = [e["thumbnail"] for e in entries]
    if len(thumbs) != len(set(thumbs)):
        seen, dupes = set(), set()
        for t in thumbs:
            (dupes if t in seen else seen).add(t)
        print(f"WARNING: duplicate thumbnail(s) reused across articles: {sorted(dupes)}")

    block = "\n".join(build_card(e) for e in entries)

    index_lines = INDEX_FILE.read_text(encoding="utf-8").splitlines(keepends=True)
    start_idx = next(i for i, l in enumerate(index_lines) if START_MARKER in l)
    # find the closing </div> of the .posts wrap that follows the card block
    end_idx = next(i for i in range(start_idx + 1, len(index_lines)) if index_lines[i].strip() == "</div>")

    new_lines = index_lines[: start_idx + 1] + [block + "\n"] + index_lines[end_idx:]
    INDEX_FILE.write_text("".join(new_lines), encoding="utf-8")
    print(f"Regenerated {len(entries)} homepage cards from articles-data.js -> index.html")


if __name__ == "__main__":
    main()
