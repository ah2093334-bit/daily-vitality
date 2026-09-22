DAILY VITALITY V15 — NATURAL THEME + NEVER-BROKEN IMAGES

مسئلہ کیا تھا
- سکرین شاٹ میں لوگو/تصویریں اس لیے غائب تھیں کہ لائیو GitHub پر assets فولڈر پہنچا ہی نہیں (فولڈر کے اندر کی فائلیں چن کر اپلوڈ کرنے سے فولڈر نہیں جاتا)۔
- V15 میں لوگو ہر صفحے کے اندر ہی شامل ہے اور کور خود بنتے ہیں، اس لیے assets فولڈر نہ بھی ہو تو کچھ blank نہیں ہوتا (ٹیسٹ شدہ)۔

پبلش کرنے کا آسان طریقہ (Windows)
1. python.org سے Python انسٹال کریں (Add to PATH ٹک کریں)۔
2. GitHub > Settings > Developer settings > Fine-grained tokens: اپنی repo پر Contents = Read and write والا token بنائیں۔
3. اس فولڈر میں TOOLS\2_PUBLISH_SITE.bat پر ڈبل کلک کریں، repo لکھیں (مثلاً ah2093334-bit/daily-vitality) اور token paste کریں۔
   یہ سارے فولڈرز سمیت ایک ہی commit میں اپلوڈ کرتا ہے، کچھ delete نہیں کرتا، اور جو فائل بدلی نہ ہو اسے چھوڑ دیتا ہے۔
4. اگر آپ کی لائیو سائٹ پر اضافی چیزیں ہیں (جیسے Quiz) جو اس فولڈر میں نہیں، تو پوری سائٹ اوپر لکھنے کے بجائے:
      python TOOLS\dv_publish.py layer --repo USER/REPO
   یہ آپ کے لائیو صفحات کا مواد رکھ کر صرف نیا تھیم + cover engine جوڑتا ہے۔

اصلی فوٹوز
- TOOLS\1_MAKE_PHOTOS.bat پہلے 10 فوٹوز بناتا ہے (مفت pollinations.ai)۔ اچھے لگیں تو: python TOOLS\make_photos.py
- بہتر کوالٹی کے لیے: python TOOLS\make_photos.py --provider openai --key sk-...
- فوٹو assets/photos/<article-slug>.webp میں بنتی ہے؛ سائٹ خود اسے کور کی جگہ لگا دیتی ہے۔ پھر دوبارہ publish کریں۔
- نوٹ: یہ اسکرپٹ آپ کے PC سے انٹرنیٹ پر چلتا ہے؛ میں اسے یہاں اصلی سروس پر چلا نہیں سکا (نقلی جنریٹر کے ساتھ ٹیسٹ ہوا)۔

V15 میں کیا ٹھیک ہوا
- گرم کریم/سبز/مرجانی تھیم (نیلا نہیں)، صاف ہیڈر/فوٹر ہر صفحے پر۔
- ہوم پیج: تلاش، 12 ٹاپکس، Load more — اب سارے 174 مضامین تک پہنچا جا سکتا ہے (پہلے صرف 18)۔
- مضمون کے صفحے: فالتو ">" ختم، صفحہ چوڑا ہونے کا مسئلہ ختم، جعلی گیلری/ٹائپنگ ہٹا دی، فہرستِ مضامین + متعلقہ مضامین + Tools شامل۔
- Shop: 5 پروڈکٹس (4 کی قیمتیں آپ کی پرانی reference فائل سے)۔ نیا پروڈکٹ products-data.json/products.html میں شامل ہوتا ہے (WAFADAR_PRODUCTS_AUTO مارکر برقرار ہے)۔
- ٹولز کے صفحات کا ڈیزائن، نیا About اور Medical Disclaimer۔
- مضامین کی 12 واضح کیٹگریز (پہلے 99 "Healthy Living" میں تھے)۔
- sitemap نیا، ہر صفحے پر canonical/OG/schema۔

یہ آپ خود دیکھ لیں
- Google Analytics کا وہی ID (G-8L1LKGGNXW) جو آپ کی پرانی سائٹ میں تھا، ہر صفحے پر شامل کر دیا ہے۔ نہ چاہیں تو build سے ہٹا دیں۔
- Products کی کور تصاویر کے نام: ebook-cover.jpg, sleep-reset-cover.jpg, health-conditions-cover.jpg (روٹ فولڈر میں)۔ Gut اور Meal Plan کی کور فائلیں موجود نہ ہوں تو خود بنا کور آتا ہے۔
- About کا متن میں نے لکھا ہے؛ اس میں "AI-assisted drafting" اور "ڈاکٹر نے ریویو نہیں کیا" لکھا ہے۔ اگر حقیقت مختلف ہے تو بدل دیں۔
- Contact / Privacy / Terms ابھی مختصر ہیں۔ اصلی رابطہ ای میل اور قانونی متن آپ کو خود ڈالنا ہے۔
- مضامین کے اندر کا متن اب بھی بہت سے صفحات پر ٹیمپلیٹ جیسا ہے؛ Google کے لیے اسے اصلی، مختلف مواد سے بدلنا ضروری ہے۔
