# Phase 2 — Upload Automation / Extension Plan

Current Phase 1 provides the public catalog/shop structure. It does NOT yet provide a secure web uploader.

## Next extension modules
1. Article / Blog Uploader
   - title, slug, category, description, SEO title, meta description
   - article body, thumbnail, tags/keywords
   - generate/update articles-data.js
   - create article HTML from one template
   - regenerate homepage cards
   - update sitemap safely

2. Photo Uploader
   - permanent Asset ID (DV-PH-######)
   - title, category/subcategory, keywords/tags
   - thumbnail/preview/original paths
   - width, height, orientation, license, AI disclosure, price, quality
   - add record to assets-data.js

3. Video Uploader
   - permanent Asset ID (DV-VD-######)
   - title, category/subcategory, keywords/tags
   - preview/poster/original paths
   - resolution, FPS, duration, orientation, codec, price/license
   - add record to assets-data.js

4. eBook/PDF/Template Uploader
   - cover, sample preview, checkout URL, price, page count
   - generate product detail page

5. Safe Publish Pipeline
   Draft -> Validate -> Preview -> Owner Approval -> Publish -> Verify -> Sitemap Update

6. Repair/Scanner
   - duplicate ID/slug
   - missing file/image
   - broken internal link
   - missing title/meta/canonical/H1
   - bad checkout URL
   - thumbnail mismatch flagged for review

## Media folder convention prepared in this pack
- media/photos/
- media/videos/
- media/previews/
- media/covers/

The extension should upload files into these folders and write stable relative paths into assets-data.js. Existing current assets can stay where they are until migrated safely.
