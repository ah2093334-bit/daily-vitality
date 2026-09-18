
(function(){
  const altBlocks=['Topic visuals','Helpful visual guide','Related wellness scene','Practical routine visual'];
  document.addEventListener('DOMContentLoaded', ()=>{
    const article=document.querySelector('.article-hero'); if(!article) return;
    const h1=article.querySelector('h1'); const cat=(document.querySelector('.eyebrow')?.textContent.split('·')[1]||document.querySelector('.breadcrumbs span')?.textContent||'Wellness').trim();
    if(h1){
      h1.classList.add('animated');
      const pal=DV.pickPalette(h1.textContent);
      h1.style.setProperty('--a1',pal[3]); h1.style.setProperty('--a2',pal[1]); h1.style.setProperty('--a3',pal[2]);
      if(!document.querySelector('.title-echo')){ const echo=document.createElement('div'); echo.className='title-echo'; h1.insertAdjacentElement('afterend', echo); let i=0, del=false, idx=0; const title=h1.textContent; setInterval(()=>{ if(!del){ idx++; echo.textContent=title.slice(0,idx); if(idx>=title.length){del=true;} } else { idx--; echo.textContent=title.slice(0,idx); if(idx<=0){del=false;} } }, 85); }
    }
    // replace inline remote images with local generated covers
    const heroImg=document.querySelector('.hero-cover img'); if(heroImg) heroImg.src = DV.svgData(h1?.textContent||'Daily Vitality', cat, 'hero');
    document.querySelectorAll('.inline-image img').forEach((img,i)=>img.src=DV.svgData(h1?.textContent||'Article', altBlocks[i%altBlocks.length], 'inline'+i));
    // marquee galleries
    function marqueeSection(title, subtitle, dir, startIndex){
      const items = Array.from({length:8}, (_,i)=>({title:(h1?.textContent||'Article')+' — Visual '+(i+1), cat: cat}));
      const cards = items.map((it,i)=>DV.card(it, subtitle, dir+i+startIndex)).join('') + items.map((it,i)=>DV.card(it, subtitle, dir+'dup'+i)).join('');
      const box=document.createElement('section'); box.className='marquee-box'; box.innerHTML=`<div class="marquee-title"><div><span class="eyebrow">TOPIC GALLERY</span><h3>${title}</h3></div><p>${subtitle}</p></div><div class="marquee-track ${dir==='right'?'right':''}"><div class="marquee-row">${cards}</div></div>`; return box;
    }
    const blocks=document.querySelectorAll('.content-block');
    if(blocks[0]) blocks[0].insertAdjacentElement('afterend', marqueeSection('Topic image stream','Auto-scrolling related visuals that keep the article lively.','left',0));
    if(blocks[2]) blocks[2].insertAdjacentElement('afterend', marqueeSection('More practical visuals','Another strip of non-duplicate visuals moving in the opposite direction.','right',20));
    if(blocks[4]) blocks[4].insertAdjacentElement('afterend', marqueeSection('Quick reference gallery','A final visual band before the product and tool links.','left',40));
    // add products and tools with covers
    const main = document.querySelector('.article-main');
    if(main){
      const productSection=document.createElement('section'); productSection.className='link-card'; productSection.innerHTML=`<span class="eyebrow">PRODUCTS</span><h3>Helpful Daily Vitality products</h3><p>Continue with premium resources related to this topic.</p><div class="resource-grid">${DV.products.map((p,i)=>`<a class="resource-card" href="${p.href}" target="_blank" rel="noopener"><div class="card-cover"><img loading="lazy" src="${DV.svgData(p.title,p.cat,'prod'+i)}" alt="${p.title}"></div><div class="inside"><span class="cat">${p.cat.toUpperCase()}</span><h3>${p.title}</h3><p>Premium Daily Vitality resource.</p></div></a>`).join('')}</div>`;
      const toolSection=document.createElement('section'); toolSection.className='marquee-box'; toolSection.innerHTML=`<div class="marquee-title"><div><span class="eyebrow">TOOLS</span><h3>Try the wellness tools</h3></div><p>Tool covers are auto-generated and scroll continuously.</p></div><div class="marquee-track right"><div class="marquee-row">${DV.tools.map((t,i)=>DV.card({title:t.title,cat:t.cat},'Open tool →', 'tool'+i)).join('') + DV.tools.map((t,i)=>DV.card({title:t.title,cat:t.cat},'Open tool →', 'tooldup'+i)).join('')}</div></div>`;
      const toolCards=toolSection.querySelectorAll('.mini-card'); toolCards.forEach((card,i)=>card.parentElement.children[i]?.addEventListener); // no-op keeps layout
      // make first 6 clickable
      toolSection.querySelectorAll('.mini-card').forEach((card,i)=>{card.style.cursor='pointer'; card.onclick=()=>location.href=DV.tools[i%DV.tools.length].href;});
      const newsletter=document.createElement('section'); newsletter.className='article-newsletter'; newsletter.innerHTML=`<div class="newsletter-card"><div><span class="eyebrow">EMAIL SIGNUP</span><h2 class="newsletter-title">Enjoyed this article?</h2><p class="newsletter-note">Join the Daily Vitality list and come back for more wellness reads, tools and product updates.</p><div class="nl-status"></div></div><div><form class="newsletter-form"><input type="email" placeholder="Enter your email" required><button type="submit">Join Free</button></form><div class="newsletter-note">Open <b>subscribe-config.js</b> and replace <b>YOUR_EMAIL@example.com</b> to activate email collection.</div></div></div>`;
      main.appendChild(productSection); main.appendChild(toolSection); main.appendChild(newsletter);
    }
  });
})();
