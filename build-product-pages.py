#!/usr/bin/env python3
"""
Generates one static product detail page per published product in
assets-data.js, using product-template.html as the master template.

    python3 scripts/build-product-pages.py

Output: /shop/<ASSET-ID>-<slug>.html  (matches shop.js's productUrl()).

Never hand-edit a generated page in /shop/ — edit assets-data.js and rerun
this script. Re-running is safe and idempotent.
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "assets-data.js"
TEMPLATE_FILE = ROOT / "product-template.html"
SHOP_DIR = ROOT / "shop"
SITE_URL = "https://dailyvitality.xyz"

CATEGORY_LABELS = {
    "photos": "Photos", "premium-photos": "Premium Photos", "videos": "Videos",
    "hd-videos": "HD / Full HD Videos", "4k-videos": "4K Videos", "short-videos": "Short Videos",
    "ebooks": "eBooks", "pdf-books": "PDF Books", "digital-books": "Digital Books",
    "templates": "Templates", "workbooks": "Workbooks", "checklists": "Checklists",
    "documents": "Documents", "social-media-packs": "Social Media Packs", "scripts": "Scripts",
    "premium-articles": "Premium Articles", "bundles": "Bundles", "software-tools": "Software & Tools",
}


def parse_products(js_text: str):
    """Parse the SITE_PRODUCTS array. Keys in assets-data.js are kept double-quoted
    on purpose so this array is directly valid JSON (only // comment lines and the
    trailing `;` need stripping) — no fragile bare-key regex conversion needed."""
    no_comments = re.sub(r"^\s*//.*$", "", js_text, flags=re.M)
    m = re.search(r"const\s+SITE_PRODUCTS\s*=\s*(\[.*\]);", no_comments, re.S)
    if not m:
        print("ERROR: could not find SITE_PRODUCTS array in assets-data.js")
        sys.exit(1)
    array_src = m.group(1)
    try:
        data = json.loads(array_src)
    except json.JSONDecodeError as e:
        print("ERROR parsing assets-data.js as JSON:", e)
        print("Reminder: keys must stay double-quoted, e.g. \"title\": \"...\" — no trailing commas.")
        sys.exit(1)
    return data


def esc(s) -> str:
    return html.escape(str(s), quote=True)


def build_tech_rows(p: dict) -> str:
    field_labels = [
        ("format", "Format"), ("pageCount", "Page Count"), ("resolution", "Resolution"),
        ("width", "Width"), ("height", "Height"), ("orientation", "Orientation"),
        ("duration", "Duration"), ("fps", "Frame Rate"),
    ]
    rows = []
    for key, label in field_labels:
        val = p.get(key)
        if val in (None, "", 0):
            continue
        rows.append(f"            <tr><td>{esc(label)}</td><td>{esc(val)}</td></tr>")
    return "\n".join(rows) if rows else "            <tr><td>Format</td><td>" + esc(p.get("format", "")) + "</td></tr>"


def build_page(p: dict, template: str) -> str:
    slug = p["slug"]
    asset_id = p["id"]
    price_str = f'${p["price"]:.2f}' if p.get("currency", "USD") == "USD" else f'{p.get("currency")} {p["price"]:.2f}'
    canonical = f"{SITE_URL}/shop/{asset_id}-{slug}.html"
    thumb_path = "../" + p["thumbnail"]
    og_image = f"{SITE_URL}/{p['thumbnail']}"

    buy_url = p.get("buyUrl") or ""
    if buy_url:
        buy_href, buy_label, buy_state, buy_disabled = buy_url, "Buy Now \u2192", "", ""
    else:
        buy_href, buy_label, buy_state, buy_disabled = "#", "Checkout Coming Soon", "soon", 'aria-disabled="true" onclick="return false;"'

    preview_link = ""
    if p.get("previewFile"):
        preview_link = (
            f'<p style="margin-top:14px;"><a href="../{esc(p["previewFile"])}" target="_blank" '
            f'data-field="preview-file" data-action="preview">Read free sample chapter &rarr;</a></p>'
        )

    whats_included = "\n".join(
        f"            <li>{esc(item)}</li>" for item in p.get("whatsIncluded", [])
    ) or "            <li>Digital download</li>"

    tags = "\n".join(f"            <span>{esc(t)}</span>" for t in (p.get("tags") or []))

    ai_badge = '<span class="badge ai">AI Generated</span>' if p.get("aiGenerated") else ""

    structured_data_obj = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": p["title"],
        "image": og_image,
        "description": p.get("shortDescription", ""),
        "sku": asset_id,
    }
    # Only claim an Offer when there's a real, working checkout URL. Advertising
    # InStock availability while the button reads "Checkout Coming Soon" would be
    # inaccurate commerce structured data. Once buyUrl is set, this automatically
    # starts emitting a proper Offer on the next regenerate.
    if buy_url:
        structured_data_obj["offers"] = {
            "@type": "Offer",
            "priceCurrency": p.get("currency", "USD"),
            "price": p["price"],
            "availability": "https://schema.org/InStock",
            "url": canonical,
        }
    structured_data = json.dumps(structured_data_obj, indent=2)

    replacements = {
        "{{SEO_TITLE}}": esc(p.get("seoTitle") or f'{p["title"]} | Daily Vitality'),
        "{{META_DESCRIPTION}}": esc(p.get("metaDescription") or p.get("shortDescription", "")),
        "{{CANONICAL_URL}}": canonical,
        "{{OG_IMAGE}}": og_image,
        "{{STRUCTURED_DATA}}": structured_data,
        "{{ASSET_ID}}": esc(asset_id),
        "{{THUMBNAIL}}": esc(thumb_path),
        "{{ALT_TEXT}}": esc(p.get("altText") or p["title"]),
        "{{TITLE}}": esc(p["title"]),
        "{{CATEGORY_LABEL}}": esc(CATEGORY_LABELS.get(p["category"], p["category"].title())),
        "{{QUALITY}}": esc(p.get("quality", "Standard")),
        "{{AI_BADGE}}": ai_badge,
        "{{PRICE}}": price_str,
        "{{BUY_URL}}": esc(buy_href),
        "{{BUY_LABEL}}": buy_label,
        "{{BUY_STATE_CLASS}}": buy_state,
        "{{BUY_DISABLED_ATTR}}": buy_disabled,
        "{{PREVIEW_LINK}}": preview_link,
        "{{DESCRIPTION}}": esc(p.get("description") or p.get("shortDescription", "")),
        "{{WHATS_INCLUDED}}": whats_included,
        "{{TECH_ROWS}}": build_tech_rows(p),
        "{{LICENSE}}": esc(p.get("license", "Personal Use")),
        "{{TAGS}}": tags,
    }

    page = template
    for k, v in replacements.items():
        page = page.replace(k, v)
    return page


def main():
    products = parse_products(DATA_FILE.read_text(encoding="utf-8"))
    published = [p for p in products if p.get("status") == "published"]

    ids = [p["id"] for p in products]
    if len(ids) != len(set(ids)):
        print("ERROR: duplicate asset IDs in assets-data.js — aborting.")
        sys.exit(1)

    template = TEMPLATE_FILE.read_text(encoding="utf-8")
    SHOP_DIR.mkdir(exist_ok=True)

    built = []
    for p in published:
        out_path = SHOP_DIR / f'{p["id"]}-{p["slug"]}.html'
        out_path.write_text(build_page(p, template), encoding="utf-8")
        built.append(out_path.name)

    print(f"Built {len(built)} product page(s) in /shop/:")
    for name in built:
        print("  -", name)
    skipped = len(products) - len(published)
    if skipped:
        print(f"Skipped {skipped} non-published product(s) (draft/pending/unpublished).")


if __name__ == "__main__":
    main()
