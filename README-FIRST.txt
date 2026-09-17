DAILY VITALITY — PREMIUM V4 UPDATE PACK

WHAT THIS PACK DOES
- Replaces the homepage with a premium responsive design.
- Uses your existing articles-data.js as the article source.
- Filters obvious non-article/template entries from the homepage.
- Uses existing hero-001.webp ... hero-145.webp files for the cinematic hero rail.
- Adds animated type/delete hero hooks.
- Adds swipe/drag-friendly article cards and arrow navigation.
- Adds six free wellness tools (existing BMI page + five new tool pages).
- Replaces contribute.html with a dedicated premium contributor landing page.
- Adds a signup/login MODAL UI, but intentionally does NOT fake account creation.
  Google/email authentication needs a real auth/database backend before launch.

FILES TO UPLOAD/REPLACE
REPLACE:
  index.html
  contribute.html
ADD:
  premium-v4.css
  premium-v4.js
  water-intake-planner.html
  sleep-schedule-calculator.html
  protein-intake-planner.html
  steps-walking-planner.html
  wellness-habit-tracker.html

KEEP:
  styles.css
  articles-data.js
  all existing article HTML files
  hero images, logo, products, library and policy pages

IMPORTANT
- Test on a staging branch before replacing the live homepage.
- The package does not guarantee Google rankings. SEO depends on content quality,
  authority, performance, indexing, competition and other signals.
- Health tools are educational, not diagnostic.
- Contributor page can live in THIS SAME REPOSITORY. A separate repository is
  unnecessary unless you later choose a separate app/subdomain/backend.
