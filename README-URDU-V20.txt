DAILY VITALITY — V20 NUMBERED PREMIUM UPDATE

اپ لوڈ کرنے کا طریقہ:
1) ZIP extract کریں۔
2) Extracted folder کے اندر موجود تمام files کو Ctrl+A سے select کریں۔
3) GitHub repository کے root میں جائیں، جہاں index.html موجود ہے۔
4) تمام files drag/drop کریں اور existing files کو replace ہونے دیں۔
5) Commit changes کریں۔
6) GitHub Pages deploy ہونے کے بعد site کو Ctrl+F5 سے hard refresh کریں۔

اس build میں کوئی لازمی subfolder نہیں بنایا گیا۔ تمام نئی files root میں ہیں۔

V20 میں نئی چیزیں:
- Daily Wellness Dashboard: routine + reminders + local weather
- Daily Brain Challenge
- Waist-to-Height Ratio Checker
- Vitamin & Supplement Reminder
- Email signup FormSubmit endpoint آپ کے email ah209334@gmail.com پر set
- Account page پر password Show/Hide + Confirm Password
- دو نئے vitamin-related articles
- Homepage tools اور latest articles میں نئی entries
- Auto-scroll speed کو قدرے آہستہ اور premium feel کے لیے adjust کیا گیا

اہم نوٹ — Account / Google Sign-in:
Real email/password اور Continue with Google تب ہی کام کریں گے جب firebase-config.js میں آپ اپنے Firebase project کی public web configuration paste کریں گے۔ یہ credentials ابھی placeholder ہیں۔

اہم نوٹ — Reminders:
Browser reminders سب سے زیادہ reliable تب ہیں جب page/PWA کھلی ہو اور notifications allow ہوں۔ Simple static website browser بند ہونے کے بعد ہر device پر alarm کی guarantee نہیں دے سکتی۔

Newsletter:
FormSubmit endpoint آپ کے email پر set ہے۔ پہلی submission پر FormSubmit activation/confirmation email بھیج سکتا ہے؛ اسے confirm کرنا ضروری ہو سکتا ہے۔ Central subscriber dashboard کے لیے بعد میں MailerLite/Brevo یا Google Sheet integration بہتر ہے۔
