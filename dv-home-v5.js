
(function(){
 const A=[...(window.DV_ARTICLES_V5||[]), ...(window.DV_AUTO_ARTICLES||[])], B=window.DV_BLOGS_V5||[], grid=document.getElementById('articleGrid'), filters=document.getElementById('filters'), count=document.getElementById('articleCount'), more=document.getElementById('loadMore');
 let active='All', shown=20;
 const colors={"Heart & Circulation":"#e94f64","Brain & Mind":"#7b61ff","Gut & Digestion":"#f39c44","Nutrition":"#1ea97c","Eyes, Ears & Skin":"#d06ac6","Kidney & Urinary":"#3b82f6","Bones & Movement":"#12a7a0","Lungs & Immunity":"#4d86e8","Metabolic Health":"#e07145","Healthy Living":"#6b9f3b"};
 const cats=['All',...new Set(A.map(a=>a.category))];
 filters.innerHTML='';
 cats.forEach(c=>{let b=document.createElement('button');b.textContent=c;b.style.setProperty('--c',c==='All'?'#0c6688':(colors[c]||'#0c6688')); if(c==='All')b.classList.add('active'); b.onclick=()=>{active=c;shown=20;[...filters.children].forEach(x=>x.classList.remove('active'));b.classList.add('active');render()};filters.appendChild(b)});
 function card(a,i){let x=document.createElement('a');x.className='article-card';x.href=a.url;x.innerHTML=`<div class="article-cover"><img ${i<8?'fetchpriority="high"':''} loading="${i<8?'eager':'lazy'}" src="${a.cover}" alt="${a.title}"/></div><div class="cardbody"><span class="cat" style="color:${a.color}">${a.category}</span><h3>${a.title}</h3><p>Clear, practical wellness guidance matched to this topic.</p></div>`;return x}
 function render(){let list=active==='All'?A:A.filter(a=>a.category===active);grid.innerHTML='';list.slice(0,shown).forEach((a,i)=>grid.appendChild(card(a,i)));count.textContent=`${list.length} published wellness reads`;more.style.display=shown>=list.length?'none':'block'}
 more.onclick=()=>{shown+=20;render()};render();
 const hb=document.getElementById('homeBlogs'); if(hb){hb.innerHTML='';B.slice(0,3).forEach((a)=>{let x=document.createElement('a');x.className='blog-card';x.href=a.url;x.innerHTML=`<img loading="lazy" src="${a.cover}" alt="${a.title}"><div class="inside"><small>DAILY VITALITY BLOG</small><h3>${a.title}</h3><span>Read the story →</span></div>`;hb.appendChild(x)});} 
})();
