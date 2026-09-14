// SINGLE SOURCE OF TRUTH for every product/asset sold on Daily Vitality.
//
// Each "id" is PERMANENT — generated once, never reused, never reassigned,
// even if the product is later removed. The "slug" maps permanently to a
// generated static page in /shop/ (see scripts/build-product-pages.py).
//
// NOTE: keys below are double-quoted on purpose (valid JS, and lets
// scripts/build-product-pages.py parse this file directly as JSON without
// fragile regex conversion). Keep new entries in this same quoted style.
//
// To add a new product:
//   1. Add its files (thumbnail, preview, download) to the repo root or a
//      dedicated folder.
//   2. Add one entry below with the next sequential ID for its type
//      (DV-PH-###### photos, DV-VD-###### videos, DV-EB-###### eBooks,
//      DV-PDF-###### PDF books, DV-TMP-###### templates, DV-DOC-######
//      documents, DV-SOC-###### social packs, DV-SCR-###### scripts,
//      DV-BND-###### bundles, DV-SW-###### software/tools).
//   3. Run: python3 scripts/build-product-pages.py
//      This generates the static product detail page; the shop grid
//      (products.html via shop.js) reads this file directly at runtime.
//
// status: "draft" | "pending_review" | "approved" | "published" | "unpublished"
// Only "published" items appear in the live shop.

const SITE_PRODUCTS = [
  {
    "id": "DV-EB-000001",
    "title": "Bone Strength Blueprint",
    "slug": "bone-strength-blueprint",
    "shortDescription": "A practical, science-based guide to building and protecting strong bones for life.",
    "description": "A practical, science-based guide to building and protecting strong bones for life. Covers what actually affects bone density, everyday habits that help, and how to build a sustainable routine, written in plain language, with no unsupported medical claims.",
    "category": "ebooks",
    "subcategory": "health",
    "price": 9.99,
    "currency": "USD",
    "thumbnail": "ebook-cover.jpg",
    "previewFile": "Bone_Strength_Blueprint_Chapter1_Dark-1.pdf",
    "downloadFile": "",
    "buyUrl": "",
    "keywords": ["bone health", "bone density", "calcium", "osteoporosis prevention", "healthy aging"],
    "tags": ["ebook", "bone health", "wellness guide"],
    "seoTitle": "Bone Strength Blueprint — Premium eBook | Daily Vitality",
    "metaDescription": "A practical, science-based eBook on building and protecting strong bones for life. Read the free sample chapter.",
    "altText": "Bone Strength Blueprint eBook cover",
    "aiGenerated": false,
    "license": "Personal Use — Single Reader",
    "quality": "Premium",
    "format": "PDF",
    "width": 1024,
    "height": 1536,
    "resolution": "",
    "orientation": "portrait",
    "duration": "",
    "fps": "",
    "pageCount": "",
    "featured": true,
    "status": "published",
    "whatsIncluded": [
      "Full eBook (PDF, optimized for phone, tablet and desktop reading)",
      "Free sample — Chapter 1 preview"
    ]
  }
];
