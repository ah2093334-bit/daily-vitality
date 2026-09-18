
(function(){
  async function fetchJSON(path){const r=await fetch(path); return r.json();}
  function catColor(name){const n=[...name].reduce((a,c)=>a+c.charCodeAt(0),0); const hues=[190,220,280,330,40,150,200]; const h=hues[n%hues.length]; return `linear-gradient(135deg, hsla(${h},85%,58%,.28), hsla(${(h+50)%360},85%,52%,.12))`; }
  function articleCard(a){ return `<a class="article-card" href="${a.slug}"><div class="card-cover"><img loading="lazy" src="${DV.svgData(a.title,a.category,a.slug)}" alt="${a.title} cover image"></div><div class="inside"><span class="cat">${a.category.toUpperCase()}</span><h3>${a.title}</h3><p>${a.description}</p></div></a>`; }
  function blogCard(a){ return `<a class="blog-card" href="${a.slug}"><div class="card-cover"><img loading="lazy" src="${DV.svgData(a.title,a.category,a.slug+'blog')}" alt="${a.title} cover image"></div><div class="inside"><span class="cat">BLOG / GUIDE</span><h3>${a.title}</h3><p>${a.description}</p></div></a>`; }
  document.addEventListener('DOMContentLoaded', async ()=>{
    const grid=document.getElementById('articleGrid'); if(!grid) return;
    const count=document.getElementById('articleCount'); const filters=document.getElementById('filters'); const loadMore=document.getElementById('loadMore');
    const data=await fetchJSON('articles.json'); const blogs=await fetchJSON('blogs-data.json').catch(()=>data.slice(0,3));
    const cats=['All', ...Array.from(new Set(data.map(x=>x.category)))]; let active='All', visible=9;
    function renderFilters(){ filters.innerHTML=cats.map(c=>`<button class="filter-pill ${active===c?'active':''}" style="background:${active===c?'':catColor(c)}" data-cat="${c}">${c}</button>`).join(''); filters.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{active=b.dataset.cat; visible=9; renderFilters(); renderGrid();}); }
    function renderGrid(){ const list=active==='All'?data:data.filter(x=>x.category===active); count.textContent=`${list.length} published wellness reads`; grid.innerHTML=list.slice(0,visible).map(articleCard).join(''); loadMore.classList.toggle('hidden', visible>=list.length); }
    renderFilters(); renderGrid(); loadMore.onclick=()=>{visible+=9; renderGrid();};
    const homeBlogs=document.getElementById('homeBlogs'); if(homeBlogs) homeBlogs.innerHTML=blogs.slice(0,3).map(blogCard).join('');
    // inject newsletter if missing
    if(!document.querySelector('.newsletter')){
      const band=document.createElement('section'); band.className='newsletter'; band.innerHTML=`<div class="wrap"><div class="newsletter-card"><div><span class="eyebrow">ONE-CLICK EMAIL LIST</span><h2 class="newsletter-title">Get new Daily Vitality wellness reads in your inbox.</h2><p class="newsletter-note">Simple email signup. You can connect this form to FormSubmit, Formspree, Buttondown or MailerLite by editing one config line.</p><div class="nl-status"></div></div><div><form class="newsletter-form"><input type="email" placeholder="Enter your email" required><button type="submit">Subscribe Free</button></form><div class="newsletter-note">Tip: open <b>subscribe-config.js</b> and replace <b>YOUR_EMAIL@example.com</b> to activate the list.</div></div></div></div>`;
      document.querySelector('main')?.appendChild(band);
    }
  });
})();
