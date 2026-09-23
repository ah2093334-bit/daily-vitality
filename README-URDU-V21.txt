DAILY VITALITY V21 — UPLOAD

یہ EXISTING GitHub repo کے اوپر update ہے۔ پرانی files delete مت کریں۔
ZIP extract کریں، اندر کی تمام files select کریں اور اسی repo root میں drag/drop کریں جہاں index.html موجود ہے۔ Replace/overwrite ہونے دیں، پھر Commit changes کریں۔

V21 اہم fixes:
- stop/start scrolling ختم: مسلسل smooth rails
- categories کے low-quality thumbnails کو stronger existing WebP covers سے replace کیا گیا
- نئے simple gradient article covers کو real topic covers سے map کیا گیا
- ہر article کے آخر میں image-based Related Articles + Tools + Products rails خود add ہوتے ہیں
- heart/blood-pressure pages میں animated ECG monitor اور optional heartbeat sound
- eye pages میں lightweight blink visual
- article کے data-SVG placeholders کو topic-matched existing images سے replace کیا جاتا ہے
- 3 نئے daily-use tools
- 10 نئے evergreen/high-interest articles
- sitemap.xml + robots.txt + articles.json
- newsletter endpoint owner email پر set
- Firebase auth code تیار، مگر project config آپ کو ایک بار manually paste کرنا ہے (FIREBASE-SETUP-URDU-V21.txt دیکھیں)

نوٹ: WebP source image پہلے سے اگر چھوٹی ہو تو software detail پیدا نہیں کر سکتا۔ V21 نے Topaz-upscale کے بجائے stronger existing topic images استعمال کی ہیں تاکہ page weight نہ بڑھے۔
