(function(){
  // Uses real photos from assets/photos/<article-slug>.webp when they exist (listed in assets/photos/manifest.json); otherwise keeps the current cover.
  var base='assets/photos/',have={};
  function slugFromHref(h){try{return decodeURIComponent((h||'').split('#')[0].split('?')[0].split('/').pop()).replace(/\.html$/,'');}catch(e){return ''}}
  function up(img,slug){if(!slug||!have[slug]||img.dataset.dvp)return;img.dataset.dvp=1;var t=new Image();t.onload=function(){img.src=t.src;img.removeAttribute('srcset');};t.src=base+slug+'.webp';}
  function run(){
    var s=slugFromHref(location.pathname);
    document.querySelectorAll('.hero-cover img').forEach(function(i){up(i,s)});
    document.querySelectorAll('a.article-card,a.blog-card').forEach(function(a){var i=a.querySelector('.card-cover img');if(i)up(i,slugFromHref(a.getAttribute('href')))});
  }
  fetch(base+'manifest.json').then(function(r){return r.ok?r.json():[]}).catch(function(){return[]}).then(function(list){
    list.forEach(function(x){have[x]=1});run();
    new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
  });
})();