# Daily Vitality — Deploy Instructions

یہ ZIP پوری ویب سائٹ کا replacement نہیں ہے۔ یہ Phase-1 update pack ہے۔

## GitHub میں upload/overwrite کریں
- index.html
- products.html
- styles.css
- articles-data.js
- assets-data.js
- shop.js
- product-template.html
- robots.txt
- sitemap.xml
- scripts/build-homepage-cards.py
- scripts/build-product-pages.py
- shop/DV-EB-000001-bone-strength-blueprint.html

## موجودہ repo سے delete نہ کریں
- 57 article HTML files
- hero/webp images
- logo/favicon/founder image
- about/faq/contact/privacy/terms/disclaimer/support/contribute/BMI pages
- CNAME
- existing product media files such as ebook-cover.jpg and preview PDF

## CNAME
Live repo میں CNAME کا content یہ ہونا چاہیے:

dailyvitality.xyz

## Important
- ZIP extract کرکے files کو repo root میں merge کریں۔
- پوری repo کو خالی کرکے صرف یہ ZIP نہ ڈالیں۔
- same-name files overwrite کریں، باقی existing files preserve رہیں۔
- deploy کے بعد homepage, products, product page, robots.txt اور sitemap.xml live test کریں۔
