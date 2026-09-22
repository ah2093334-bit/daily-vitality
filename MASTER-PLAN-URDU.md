# Daily Vitality — ماسٹر ویب سائٹ پلان V16

## 1) اصل مسئلہ کیا تھا؟
موجودہ صفحات میں تصاویر کے paths `assets/...` کے اندر جا رہے تھے، لیکن live repository میں ضروری nested asset folders مکمل موجود نہیں تھے۔ اسی وجہ سے article/blog thumbnails، hero covers اور کچھ دوسرے visual boxes blank یا broken دکھائی دے رہے تھے۔ دوسری طرف `assets/photos/manifest.json` میں article-specific photos کی فہرست بھی خالی تھی، اس لیے photo replacement system کے پاس دکھانے کے لیے اصل local cover موجود نہیں تھا۔

## 2) V16 میں image system کیسے رکھا گیا ہے؟
ہر موجود article کے لیے اس کے exact slug کے نام سے local WebP cover رکھا گیا ہے:
`assets/photos/<article-slug>.webp`

Priority ہمیشہ یہ ہوگی:
1. Article-specific local WebP cover
2. Product/eBook/PDF کا اپنا store cover
3. Tool-specific cover under `assets/tool-covers/`
4. اگر کوئی file خراب یا missing ہو تو `dv-covers.js` کا inline fallback

اس structure کا مقصد یہ ہے کہ normal browsing میں external image server کی ضرورت نہ پڑے اور broken-image box نہ آئے۔

## 3) Design system مستقل کیسے رکھنا ہے؟
- Warm natural wellness look برقرار رکھیں: cream/paper background، forest green، coral اور soft gold accents۔
- Main body layout اور content hierarchy کو ہر update میں نہ بدلیں۔
- Article/blog cards کے لیے 16:10 cover ratio استعمال کریں۔
- Tools کے لیے 16:9 preview اور products/eBooks کے لیے 4:5 tall cover رکھیں۔
- Rounded cards، restrained shadows، clear headings اور کافی white space رکھیں۔
- Hover animation ہلکی ہو؛ readability کو animation پر قربان نہ کریں۔
- موجود click/audio behavior کو الگ feature سمجھیں؛ visual updates اسے remove نہ کریں۔

## 4) Articles اور Blogs کے لیے rule
ہر نئے article کے ساتھ future میں لازماً:
- 1200×720 WebP visual بنے
- filename article کے exact slug کے مطابق ہو
- visual پر غیر ضروری text/logo نہ ہو
- meaningful alt text ہو
- `og:image`, `twitter:image` اور Article schema میں اسی local image کا absolute URL ہو
- slug کو `assets/photos/manifest.json` میں شامل کیا جائے

Existing V16 میں یہی system 174 موجود articles پر لگا دیا گیا ہے۔

## 5) Products / PDF Books / eBooks
- Cover mobile thumbnail size پر بھی readable ہو۔
- Daily Vitality brand واضح مگر clean ہو۔
- Product title، category اور visual hierarchy ایک نظر میں سمجھ آئے۔
- Product schema میں title، description، price/offer (جہاں دستیاب ہو) اور image URL رکھا جائے۔
- Product file اور store cover کو الگ سمجھیں؛ store listing کے لیے dedicated cover رکھیں۔

## 6) Tools
- ہر tool card کے اوپر clear visual preview ہو۔
- Tool title اور purpose image کے نیچے فوراً واضح ہو۔
- Calculators/planners کے visual covers ایک ہی design family میں ہوں تاکہ پوری site consistent لگے۔
- V16 میں موجود 26 tool cards کے لیے local covers بنائے گئے ہیں؛ کوئی نیا tool شامل نہیں کیا گیا۔

## 7) SEO foundation
Ranking کی guarantee کسی single CSS/tag سے نہیں ہوتی، اس لیے focus technical clarity + useful content + crawlability پر رہے:
- ہر page کا canonical URL درست ہو۔
- natural English title/description استعمال ہوں۔
- hidden keyword lists یا city/country keyword stuffing نہ ہو۔
- `max-image-preview:large` برقرار رہے۔
- Article/Product structured data میں valid local image URL ہو۔
- ہر اہم تصویر کا descriptive alt text ہو۔
- `sitemap.xml` pages کے لیے اور `image-sitemap.xml` imagery کے لیے موجود ہو۔
- `robots.txt` دونوں sitemaps کو point کرے۔
- related articles، topics اور tools کے internal links واضح ہوں۔

## 8) USA / UK targeting
- Customer-facing language natural U.S. English رہ سکتی ہے، جبکہ topics USA/UK search intent کے مطابق منتخب کیے جائیں۔
- Search Console data دیکھ کر titles/topics بہتر کیے جائیں۔
- fake `hreflang` نہ لگائیں؛ صرف تب استعمال کریں جب واقعی الگ US/UK localized versions ہوں۔
- “USA, UK, London, New York…” جیسی hidden repetitive keyword lists استعمال نہ کریں۔

## 9) Performance اور slow internet
- Article/tool imagery WebP میں رکھی گئی ہے تاکہ file size کم رہے۔
- Listing thumbnails lazy-load ہوں۔
- Hero images کو priority دی جا سکتی ہے۔
- Card aspect ratio پہلے سے reserved ہو تاکہ image load ہونے پر layout نہ اچھلے۔
- Remote image hotlinks کو normal rendering کے لیے required نہ بنائیں۔

## 10) Upload rule — سب سے اہم
ZIP extract کرنے کے بعد صرف `index.html` یا صرف CSS upload نہ کریں۔
Repository root پر تمام files کے ساتھ پورا `assets/` folder بھی upload کریں، خاص طور پر:
- `assets/photos/`
- `assets/tool-covers/`
- `assets/brand/`

اگر folders upload نہ ہوئے تو images دوبارہ missing ہو جائیں گی۔

## 11) ہر deploy سے پہلے checklist
- Homepage hero کی ہر image اپنے صحیح link/title کے ساتھ ہے؟
- Article cards پر blank image تو نہیں؟
- 2–3 random article hero covers کھل رہے ہیں؟
- Products کے covers readable ہیں؟
- Tools cards پر covers موجود ہیں؟
- Mobile پر cards ایک column میں صاف نظر آ رہے ہیں؟
- کوئی local CSS/JS/image path missing تو نہیں؟
- JSON valid ہے؟
- `sitemap.xml`, `image-sitemap.xml`, `robots.txt` موجود ہیں؟
- GitHub Pages deployment complete ہونے کے بعد hard refresh کیا؟

## 12) Future high-demand ideas — ابھی V16 میں شامل نہیں کیے گئے
Search Console data کے بعد evergreen clusters پر کام کیا جا سکتا ہے: sleep routines، budget high-protein meals، fiber/gut habits، beginner walking/strength، hydration، healthy aging، stress management، grocery planning، desk-worker movement، اور blood-pressure lifestyle basics۔ Health content educational اور non-diagnostic ہی رہنا چاہیے۔


## 13) V17 engagement additions
- 3 new evergreen guides have been added: sleep regularity, supplement-label reading, and a 10-minute walking habit.
- 2 new repeat-use tools have been added: Desk Break Timer and Wind-Down Checklist Builder.
- Save Reads for Later now stores a visitor's saved articles locally in their browser.
- Homepage now gives stronger reasons to return: daily-use tools, saved reading, and fresh practical guides.
- Do not fabricate “trending” or “most popular” labels without analytics. Use Search Console/GA4 data later to create genuine Popular Now sections.
