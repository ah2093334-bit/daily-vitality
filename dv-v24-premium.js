(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function uniqueOriginals(rail){
  const seen=new Set();
  Array.from(rail.children).forEach(el=>{
    if(el.dataset.dv24clone==='1'||el.classList.contains('dv22-clone')||el.classList.contains('dv23-clone')){el.remove();return;}
    const a=el.matches('a[href]')?el:el.querySelector('a[href]');
    const k=((a&&a.getAttribute('href'))||'')+'|'+(el.textContent||'').trim().slice(0,90);
    if(k&&seen.has(k))el.remove(); else if(k)seen.add(k);
  });
  return Array.from(rail.children);
}
function smoothRail(rail,dir=1,speed=.018){
  if(!rail||rail.dataset.dv24rail==='1')return;
  const originals=uniqueOriginals(rail); if(originals.length<2)return;
  rail.dataset.dv24rail='1'; rail.classList.add('dv24-article-rail');
  originals.forEach(n=>{const c=n.cloneNode(true);c.dataset.dv24clone='1';c.setAttribute('aria-hidden','true');rail.appendChild(c)});
  let paused=false,last=performance.now(); const half=()=>rail.scrollWidth/2;
  if(dir<0)rail.scrollLeft=Math.max(0,half()-1);
  function frame(t){const dt=Math.min(40,t-last);last=t;if(!paused){rail.scrollLeft+=dir*speed*dt;if(dir>0&&rail.scrollLeft>=half()-2)rail.scrollLeft-=half();if(dir<0&&rail.scrollLeft<=2)rail.scrollLeft+=half();}requestAnimationFrame(frame)}
  rail.addEventListener('mouseenter',()=>paused=true);rail.addEventListener('mouseleave',()=>paused=false);rail.addEventListener('touchstart',()=>paused=true,{passive:true});rail.addEventListener('touchend',()=>paused=false,{passive:true});requestAnimationFrame(frame);
}
function findRailByHeading(words){
  const out=[]; $$('h2,h3').forEach(h=>{const t=h.textContent.toLowerCase();if(words.some(w=>t.includes(w))){const sec=h.closest('section,div');if(!sec)return;const r=sec.querySelector('.dv-rail,.related-grid,.resource-grid,.products-grid,.tool-grid,.cards,.dv24-story-gallery');if(r)out.push(r)}});return [...new Set(out)];
}
function articleRails(){
  if(!document.body.classList.contains('article-page')&&!$('.article-shell')&&!$('article'))return;
  findRailByHeading(['related articles','keep reading']).forEach(r=>smoothRail(r,1,.016));
  findRailByHeading(['useful tools','wellness tool','free tools']).forEach(r=>smoothRail(r,-1,.016));
  findRailByHeading(['guides & products','guides, ebooks','premium resources','products']).forEach(r=>smoothRail(r,1,.015));
}
function topicGroup(){const t=(document.title+' '+(document.body.innerText||'').slice(0,2200)).toLowerCase();
 if(/heart|blood pressure|circulation|cholesterol|artery/.test(t))return 'heart';
 if(/brain|mind|anxiety|stress|focus|memory|mood/.test(t))return 'brain';
 if(/sleep|insomnia|caffeine|bedroom/.test(t))return 'sleep';
 if(/skin|hair|eczema|psoriasis|collagen|biotin|acne/.test(t))return 'skin';
 if(/water|hydration|kidney|electrolyte/.test(t))return 'hydration';
 if(/food|nutrition|vitamin|zinc|magnesium|protein|fiber|gut|meal|omega|sugar/.test(t))return 'nutrition';
 if(/walk|movement|routine|habit|exercise|bone|joint/.test(t))return 'routine'; return 'generic';}
const pools={
 heart:['article-heart-01.webp','article-heart-02.webp','article-heart-03.webp','article-heart-04.webp','article-heart-05.webp','article-heart-06.webp'],
 brain:['article-brain-01.webp','article-brain-02.webp','article-brain-03.webp','article-brain-04.webp','article-brain-05.webp','article-brain-06.webp'],
 sleep:['article-sleep-01.webp','article-sleep-02.webp','article-sleep-03.webp','article-sleep-04.webp','article-sleep-05.webp','article-sleep-06.webp'],
 skin:['article-skin-01.webp','article-skin-02.webp','article-skin-03.webp','article-skin-04.webp','article-skin-05.webp','article-skin-06.webp'],
 hydration:['article-hydration-01.webp','article-hydration-02.webp','article-hydration-03.webp','article-hydration-04.webp','article-hydration-05.webp','article-hydration-06.webp'],
 nutrition:['article-nutrition-01.webp','article-nutrition-02.webp','article-nutrition-03.webp','article-nutrition-04.webp','article-nutrition-05.webp','article-nutrition-06.webp'],
 routine:['article-routine-01.webp','article-routine-02.webp','article-routine-03.webp','article-routine-04.webp','article-routine-05.webp','article-routine-06.webp'],
 generic:['article-generic-01.webp','article-generic-02.webp','article-generic-03.webp','article-generic-04.webp','article-generic-05.webp','article-generic-06.webp']
};
function injectStoryGallery(){
  if(!$('.article-shell')&& !$('article'))return; if($('.dv24-auto-gallery'))return;
  const blocks=$$('.content-block,.article-main > section,.article-main > div').filter(x=>!x.classList.contains('dv24-story-gallery'));
  if(blocks.length<2)return; const g=topicGroup(), imgs=pools[g]||pools.generic;
  const wrap=document.createElement('div');wrap.className='dv24-auto-gallery';
  const label=document.createElement('div');label.className='dv24-gallery-label';label.textContent='VISUAL GUIDE';
  const rail=document.createElement('div');rail.className='dv24-story-gallery';
  imgs.forEach((src,i)=>{const im=document.createElement('img');im.src=src;im.loading='lazy';im.decoding='async';im.alt=`${g} wellness visual ${i+1}`;rail.appendChild(im)});
  wrap.append(label,rail); blocks[Math.min(1,blocks.length-1)].after(wrap); smoothRail(rail,1,.010);
}
function cleanBrokenTextCovers(){
  // Data-SVG placeholders from old V22 are replaced in the ZIP; this is a fallback for cached pages.
  const g=topicGroup(), imgs=pools[g]||pools.generic;let n=0;
  $$('img').forEach(img=>{const s=img.getAttribute('src')||'';if(s.startsWith('data:image/svg+xml')){img.src=imgs[n++%imgs.length];img.classList.add('dv24-real-article-image')}})
}
function heroPause(){const slider=$('#heroSlider');if(!slider)return;slider.addEventListener('mouseenter',()=>slider.dataset.dv24pause='1');slider.addEventListener('mouseleave',()=>delete slider.dataset.dv24pause)}
function markArticlePage(){if($('.article-shell')||document.querySelector('article.article-hero'))document.body.classList.add('article-page')}
function init(){markArticlePage();cleanBrokenTextCovers();injectStoryGallery();setTimeout(articleRails,280);heroPause();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
