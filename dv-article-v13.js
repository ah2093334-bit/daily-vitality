
(function(){
function h(s){return [...s].reduce((a,c)=>a+c.charCodeAt(0),0)}
const colors=[['#07182e','#0c78a5','#23cdb5'],['#121633','#7c3aed','#22d3ee'],['#09241f','#0f766e','#84cc16'],['#2b102c','#be185d','#8b5cf6'],['#2b180a','#d97706','#ef4444']];
function icon(title){const t=title.toLowerCase();if(/heart|blood|cholesterol/.test(t))return '♥';if(/sleep|night/.test(t))return '☾';if(/brain|mind|stress|anxiety/.test(t))return '✦';if(/skin|hair|eczema/.test(t))return '✿';if(/kidney/.test(t))return '◈';if(/bone|joint|arthritis/.test(t))return '◆';if(/food|nutrition|protein|fruit|meal/.test(t))return '✚';if(/walk|movement|fitness/.test(t))return '➜';return '✦'}
function svg(title,sub,seed){const [a,b,c]=colors[(h(title)+seed)%colors.length],ic=icon(title);const e=x=>String(x).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));const s=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect width="1200" height="760" rx="36" fill="url(#g)"/><circle cx="950" cy="390" r="170" fill="#001827" fill-opacity=".24" stroke="#fff" stroke-opacity=".18"/><text x="100" y="145" fill="#66f5e9" font-size="32" font-family="Arial" font-weight="800">DAILY VITALITY</text><text x="100" y="270" fill="#fff" font-size="66" font-family="Georgia" font-weight="700">${e(title.slice(0,42))}</text><text x="100" y="330" fill="#d8f0f4" font-size="28" font-family="Arial">${e(sub.slice(0,34))}</text><text x="950" y="455" text-anchor="middle" fill="#fff" font-size="170" font-family="Arial">${ic}</text></svg>`;return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(s)}
document.addEventListener('DOMContentLoaded',()=>{
 const art=document.querySelector('.article-hero'); if(!art)return;
 const title=(art.querySelector('h1')?.textContent||document.title.split('|')[0]).trim();
 const hero=art.querySelector('.hero-cover img');
 if(hero){
   if(/collagen/i.test(title) && document.querySelector('link[href*="dv-premium-v13.css"]')) hero.src='assets/reference/daily-vitality-premium-reference.png';
   else hero.src=svg(title,'Premium topic overview',0);
 }
 const top=art.querySelector('.article-top'); if(top&&!art.querySelector('.premium-nav')){
   const nav=document.createElement('section'); nav.className='premium-block'; const labels=['Overview','Benefits','Daily Habits','Food Sources','What to Watch','Practical Steps','Quick Reference']; nav.innerHTML='<span class="eyebrow">IN THIS ARTICLE</span><div class="premium-nav">'+labels.map((x,i)=>`<div class="nav-tile"><img src="${svg(title,x,i+1)}"><b>${x}</b></div>`).join('')+'</div>'; top.insertAdjacentElement('afterend',nav);
 }
 function rail(title2,right,seed){const labels=['Everyday choice','Practical routine','Food & lifestyle','Movement & recovery','Daily context','Simple habit','Helpful visual']; const cards=labels.map((x,i)=>`<div class="mini-card"><img src="${svg(title,x,seed+i)}"><div class="cap"><b>${x}</b><span>${title2}</span></div></div>`).join('');const sec=document.createElement('section');sec.className='marquee-box';sec.innerHTML=`<span class="eyebrow">TOPIC GALLERY</span><h3>${title2}</h3><div class="marquee-track ${right?'right':''}"><div class="marquee-row">${cards}${cards}</div></div>`;return sec}
 const main=art.querySelector('.article-main')||art;
 const blocks=main.querySelectorAll('.content-block');
 if(blocks[0])blocks[0].insertAdjacentElement('afterend',rail('Real habits and supporting visuals',false,20));
 if(blocks[2])blocks[2].insertAdjacentElement('afterend',rail('More practical visuals',true,40));
 const products=document.createElement('section');products.className='link-card';products.innerHTML=`<span class="eyebrow">RELATED PRODUCTS</span><h3>Explore Daily Vitality resources</h3><div class="resource-grid">
 <a class="resource-card" href="products.html"><div class="card-cover"><img src="${svg('Wellness Guide','Digital guide',61)}"></div><div class="inside"><span class="cat">GUIDE</span><h3>Premium Wellness Guides</h3><p>Browse deeper digital resources.</p></div></a>
 <a class="resource-card" href="products.html"><div class="card-cover"><img src="${svg('Daily Planner','Routine resource',62)}"></div><div class="inside"><span class="cat">PLANNER</span><h3>Daily Wellness Planners</h3><p>Build better routines step by step.</p></div></a>
 <a class="resource-card" href="products.html"><div class="card-cover"><img src="${svg('Wellness eBooks','Premium reading',63)}"></div><div class="inside"><span class="cat">EBOOK</span><h3>Daily Vitality eBooks</h3><p>Go deeper than a single article.</p></div></a></div>`;
 const tools=document.createElement('section');tools.className='marquee-box';tools.innerHTML=`<span class="eyebrow">HELPFUL TOOLS</span><h3>Try a Daily Vitality tool</h3><div class="premium-nav">
 <a class="nav-tile" href="bmi-calculator.html"><img src="${svg('BMI Calculator','Body basics',71)}"><b>BMI Calculator</b></a>
 <a class="nav-tile" href="water-intake-planner.html"><img src="${svg('Water Planner','Hydration',72)}"><b>Water Planner</b></a>
 <a class="nav-tile" href="sleep-schedule-calculator.html"><img src="${svg('Sleep Schedule','Recovery',73)}"><b>Sleep Schedule</b></a>
 <a class="nav-tile" href="daily-routine-builder.html"><img src="${svg('Daily Routine','Habits',74)}"><b>Routine Builder</b></a>
 </div>`;
 main.appendChild(products);main.appendChild(tools);
});
})();
