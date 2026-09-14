DAILY VITALITY V3 — ROOT-ONLY REPAIR PACK

WHY THE PREVIOUS ZIP SHOWED DIFFERENT COUNTS
The previous ZIP had 21 file entries, but 9 were inside subfolders (docs/, media/, scripts/, shop/).
Your phone/GitHub picker showed only the 12 ROOT files. The missing /shop file is why the product detail URL returned 404.

THIS V3 PACK IS INTENTIONALLY ROOT-ONLY.
Every deploy file is visible in one folder after extraction. No hidden .gitkeep files. No nested shop/scripts folders.

UPLOAD
1. Extract this ZIP.
2. You should see exactly 10 files in ONE folder.
3. Select all 10 and upload them to the ROOT of the existing GitHub repository.
4. Replace same-name files. DO NOT delete other repo files.
5. Commit and wait for GitHub Pages.

FIXES
- Unified top navigation with Articles/Blogs, Photos, Premium Photos, Videos, 4K, eBooks/PDFs,
  Templates/Workbooks, Thumbnails/Covers, Digital Files, Bundles, Free Resources, Products.
- Mobile horizontal navigation remains usable.
- Restores 5 PUBLIC Gumroad products visible in the supplied screenshot.
- Product cards use Buy Now and open the real Gumroad product URL.
- No product card points to the missing /shop page, so that 404 path is removed from the active flow.
- Broken demo product URL removed from sitemap.
- Product cards use a branded fallback if a local cover image is not available.

NOT CLAIMED FIXED YET
- All article topic-specific thumbnails. The actual complete image library was not included here.
  Existing article pages/images are preserved rather than randomly overwritten.
- Contributor login, secure uploads, likes/comments/follows/earnings: backend phase.
