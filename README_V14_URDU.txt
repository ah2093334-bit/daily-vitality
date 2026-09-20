DAILY VITALITY V14 — SEO + PHOTO-READY PATCH

KYA BADLA
1. Har page par title / meta description / canonical / Open Graph / Twitter tags (pehle 42 pages mein canonical/description missing thi).
2. Har article ka meta description ab UNIQUE hai (pehle 78 articles ka ek jaisa template tha).
3. Article schema + Breadcrumb schema (JSON-LD) un articles mein jin mein nahi tha; homepage par WebSite + Organization schema.
4. sitemap.xml dobara bana (218 URLs, lastmod ke saath, account/verification placeholder pages nikaal diye). robots.txt saaf.
5. all-articles.html — sab articles ki static links list (Google ko JS ke baghair bhi links milte hain). Homepage footer mein link.
6. Do articles ke URL mein spaces the (Collagen..., Eczema...) — ab clean URLs; purane URL par redirect stub.
7. REAL PHOTOS ka hook: dv-photos.js. Agar assets/photos/<article-slug>.webp rakh dein aur update_photo_manifest.py chala dein, to cover automatically photo ban jata hai. Photo na ho to purana cover chalta rahega.
8. photo-prompts/cover-prompts.tsv — 174 articles ke liye photo prompts.

ZAROORI WARNINGS
- assets/article-covers, step-galleries, v9-covers, v9-steps, tool-covers folders is ZIP mein maujood nahi (1227 image links un ki taraf jaate hain). Live GitHub repo mein purani files rehne dein — repo ko DELETE karke replace na karein, sirf files upload/overwrite karein.
- library.html, contribute.html aur dv-products-v5.js ka link hai lekin ZIP mein file nahi hai (products page ke liye zaroori).
- google-site-verification.html sirf placeholder hai — verification homepage ke meta tag se ho rahi hai. Is file ko delete kar dein.
- about.html mein sirf ~30 words hain. Health site ke liye real About/author/editorial policy zaroori hai.
