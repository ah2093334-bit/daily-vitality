(function(){
const A=window.DV_RESTORED_ARTICLES||[], grid=document.getElementById('articleGrid'), filters=document.getElementById('filters'), count=document.getElementById('articleCount');
const cats=['All',...new Set(A.map(x=>x.category))]; let active='All';
function render(){let list=active==='All'?A:A.filter(x=>x.category===active);grid.innerHTML='';count.textContent=list.length+' published wellness reads';list.forEach(a=>{let x=document.createElement('a');x.className='dv-card';x.href=a.url;x.innerHTML=`<div class="dv-cover"><img src="${a.cover}" alt="${a.title}" loading="lazy"></div><div class="dv-card-body"><small>${a.category}</small><h3>${a.title}</h3><p>Practical, easy-to-understand wellness guidance from Daily Vitality.</p></div>`;grid.appendChild(x)})}
cats.forEach(c=>{let b=document.createElement('button');b.textContent=c;b.className=c==='All'?'active':'';b.onclick=()=>{active=c;[...filters.children].forEach(z=>z.classList.remove('active'));b.classList.add('active');render();document.getElementById('articles').scrollIntoView({behavior:'smooth'})};filters.appendChild(b)});
render();
document.getElementById('menuBtn').onclick=()=>document.getElementById('menu').classList.toggle('open');
document.addEventListener('click',e=>{if(!e.target.closest('.dv-brandrow'))document.getElementById('menu').classList.remove('open')});
const gallery=document.getElementById('heroGallery');['hero-012.webp','hero-040.webp','hero-100.webp'].forEach(s=>{let i=new Image();i.src=s;i.alt='Daily Vitality wellness';gallery.appendChild(i)});
const hooks=['smarter everyday habits.','better sleep and recovery.','practical nutrition choices.','a healthier heart and body.','wellness that fits real life.'];let h=0;setInterval(()=>{h=(h+1)%hooks.length;document.getElementById('hook').textContent=hooks[h]},3200);
document.querySelectorAll('[data-filter-link]').forEach(a=>a.onclick=e=>{e.preventDefault();let c=a.dataset.filterLink;[...filters.children].find(b=>b.textContent===c)?.click()});
})();