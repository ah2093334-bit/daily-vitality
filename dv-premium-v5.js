
window.DV = window.DV || {};
DV.hooks = ['better sleep','better food choices','calm routines','simple movement','daily recovery','more energy'];
DV.tools = [
  {href:'bmi-calculator.html',title:'BMI & Healthy Weight',cat:'Body Basics'},
  {href:'water-intake-planner.html',title:'Water Intake Planner',cat:'Hydration'},
  {href:'sleep-schedule-calculator.html',title:'Sleep Schedule',cat:'Sleep'},
  {href:'protein-intake-planner.html',title:'Protein Planner',cat:'Nutrition'},
  {href:'steps-walking-planner.html',title:'Walking & Steps',cat:'Movement'},
  {href:'wellness-habit-tracker.html',title:'Habit Tracker',cat:'Routine'}
];
DV.products = [
  {href:'https://6517409126048.gumroad.com/l/10-health-conditions-explained',title:'10 Health Conditions Explained',cat:'eBook'},
  {href:'https://6517409126048.gumroad.com/l/simple-habits-healthier-life',title:'Simple Habits for a Healthier Life',cat:'Guide'},
  {href:'https://6517409126048.gumroad.com/l/30-day-grocery-budget-meal-plan',title:'30-Day Grocery Budget Meal Plan',cat:'Meal Plan'}
];
DV.hash = str => [...str].reduce((a,c)=>a+c.charCodeAt(0),0);
DV.palettes = [
  ['#0f172a','#0ea5e9','#22c55e','#e2e8f0'],['#111827','#8b5cf6','#06b6d4','#f8fafc'],['#1f2937','#ec4899','#22c55e','#f9fafb'],['#172554','#06b6d4','#34d399','#ecfeff'],['#3b0764','#c026d3','#fb7185','#fdf4ff'],['#0c4a6e','#14b8a6','#a3e635','#ecfeff'],['#1e293b','#f59e0b','#ef4444','#fff7ed']
];
DV.pickPalette = seed => DV.palettes[DV.hash(seed)%DV.palettes.length];
DV.svgData = function(title, subtitle='', seed=''){
  const [bg,c1,c2,textc] = DV.pickPalette(title+seed);
  const icon = ['✦','✚','◉','✺','⬢','◎','✷'][DV.hash(seed+title)%7];
  const esc = s => String(s).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="${c1}"/></linearGradient><linearGradient id="g2" x1="1" y1="0" x2="0" y2="1"><stop stop-color="${c2}" stop-opacity=".9"/><stop offset="1" stop-color="${c1}" stop-opacity=".25"/></linearGradient><filter id="blur"><feGaussianBlur stdDeviation="40"/></filter></defs><rect width="1200" height="760" fill="url(#g)"/><circle cx="980" cy="130" r="180" fill="url(#g2)" filter="url(#blur)"/><circle cx="230" cy="620" r="210" fill="${c2}" opacity=".18" filter="url(#blur)"/><rect x="70" y="70" width="1060" height="620" rx="38" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.14)"/><text x="100" y="160" fill="${c2}" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="700">DAILY VITALITY</text><text x="100" y="285" fill="${textc}" font-size="76" font-family="Georgia, Times New Roman, serif" font-weight="700">${esc(title.slice(0,48))}</text><text x="100" y="348" fill="${textc}" opacity=".85" font-size="28" font-family="Arial, Helvetica, sans-serif">${esc(subtitle.slice(0,36))}</text><text x="1030" y="620" fill="rgba(255,255,255,.16)" font-size="200" font-family="Arial">${icon}</text><g opacity=".32" fill="none" stroke="rgba(255,255,255,.28)"><path d="M90 470 C 340 390, 500 570, 760 470 S 1070 410, 1110 470"/><path d="M90 520 C 340 440, 500 620, 760 520 S 1070 460, 1110 520"/></g></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
};
DV.card = function(item, subtitle, seed=''){
  return `<div class="mini-card"><img loading="lazy" src="${DV.svgData(item.title, subtitle || item.cat || '', seed)}" alt="${item.title}"><div class="cap"><b>${item.title}</b><span>${subtitle || item.cat || ''}</span></div></div>`;
};
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn)}
ready(()=>{
  const hookLine = document.getElementById('hookLine');
  if(hookLine){let i=0,j=0,del=false; setInterval(()=>{const word=DV.hooks[i%DV.hooks.length]; if(!del){j++; hookLine.textContent=word.slice(0,j); if(j>=word.length){del=true; setTimeout(()=>{},800)}} else {j--; hookLine.textContent=word.slice(0,j); if(j<=0){del=false; i++;}} },110)}
  const hamb=document.getElementById('hamb'), mobile=document.getElementById('mobileMenu'); if(hamb&&mobile) hamb.onclick=()=>mobile.classList.toggle('show');
  document.querySelectorAll('[data-join]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault(); document.getElementById('joinModal')?.classList.add('show')}));
  document.getElementById('closeJoin')?.addEventListener('click',()=>document.getElementById('joinModal')?.classList.remove('show'));
  document.getElementById('joinModal')?.addEventListener('click',e=>{if(e.target.id==='joinModal') e.target.classList.remove('show')});
  document.querySelectorAll('[data-auth-not-ready]').forEach(btn=>btn.addEventListener('click',()=>{const t=document.getElementById('authToast'); if(t) t.textContent='Connect Firebase Authentication or your email-signup provider to activate one-click account signup.'}))
  document.querySelectorAll('img').forEach((img,idx)=>{img.onerror=()=>{const alt=img.alt||'Daily Vitality'; img.src=DV.svgData(alt,'Visual placeholder',String(idx));};});
  // newsletter forms
  document.querySelectorAll('.newsletter-form').forEach(form=>form.addEventListener('submit', async e=>{
    e.preventDefault(); const email=form.querySelector('input[type="email"]'); const status=form.parentElement.querySelector('.nl-status') || form.querySelector('.nl-status'); if(status) status.textContent='';
    const endpoint=(window.DV_SUBSCRIBE&&window.DV_SUBSCRIBE.endpoint)||''; const placeholder=(window.DV_SUBSCRIBE&&window.DV_SUBSCRIBE.placeholderEmail)||'YOUR_EMAIL@example.com';
    if(!endpoint || endpoint.includes(placeholder)) { if(status) status.textContent='Signup form is ready. To connect your email list, open subscribe-config.js and replace YOUR_EMAIL@example.com with your own email/list endpoint.'; return; }
    try{
      const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email:email.value,_subject:'Daily Vitality subscriber'})});
      if(!res.ok) throw new Error('Request failed');
      if(status) status.textContent=(window.DV_SUBSCRIBE&&window.DV_SUBSCRIBE.successMessage)||'Thanks for subscribing!'; form.reset();
    }catch(err){ if(status) status.textContent='The form is ready, but the email endpoint needs to be checked.'; }
  }));
  // Home slider duplicate for continuous movement
  const track=document.getElementById('heroTrack');
  if(track && !track.dataset.looped){ track.innerHTML += track.innerHTML; track.dataset.looped='1'; track.classList.add('auto-scroll'); }
});
