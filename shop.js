// Daily Vitality shop renderer. Published products only.
(function(){
  var CATEGORIES=[
    ["all","All"],["photos","Photos"],["premium-photos","Premium Photos"],["videos","Videos"],
    ["hd-videos","HD / Full HD Videos"],["4k-videos","4K Premium Videos"],["short-videos","Short Videos"],
    ["ebooks","eBooks"],["pdf-books","PDF Books"],["digital-books","Digital Books"],["templates","Templates"],
    ["workbooks","Workbooks"],["social-media-packs","Thumbnails & Covers"],["bundles","Bundles"]
  ];
  function esc(s){return String(s||"").replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function money(p){return (p.currency==="USD"||!p.currency?"$":p.currency+" ")+Number(p.price||0).toFixed(2)}
  function card(p){
    var el=document.createElement("article"); el.className="product-card"; el.dataset.assetId=p.id;
    var media=p.thumbnail?'<img src="'+esc(p.thumbnail)+'" alt="'+esc(p.altText||p.title)+'" loading="lazy" onerror="this.parentNode.classList.add(\'no-image\');this.remove()">':'';
    var primary=p.buyUrl?'<a class="product-buy-btn" href="'+esc(p.buyUrl)+'" target="_blank" rel="noopener sponsored">Buy Now</a>':'<span class="product-disabled-btn">Checkout Coming Soon</span>';
    var details=p.detailPage?'<a class="product-view-btn" href="shop/'+esc(p.id)+'-'+esc(p.slug)+'.html">View Details</a>':'';
    el.innerHTML='<div class="product-thumb-wrap '+(!p.thumbnail?'no-image':'')+'">'+media+'<div class="product-fallback">Daily Vitality<br><small>'+esc(p.category).replace(/-/g," ")+'</small></div></div>'+
      '<div class="product-card-body"><div class="product-badges"><span class="badge type">'+esc(p.category).replace(/-/g," ")+'</span><span class="badge quality">'+esc(p.quality||"Premium")+'</span></div>'+
      '<h3>'+esc(p.title)+'</h3><p class="product-desc">'+esc(p.shortDescription)+'</p><div class="product-card-footer"><span class="product-price">'+money(p)+'</span><div class="product-actions">'+details+primary+'</div></div></div>';
    return el;
  }
  document.addEventListener("DOMContentLoaded",function(){
    var grid=document.getElementById("productGrid"), filters=document.getElementById("shopFilters"), input=document.getElementById("shopSearch"), empty=document.getElementById("shopEmptyState");
    if(!grid||typeof SITE_PRODUCTS==="undefined")return;
    var list=SITE_PRODUCTS.filter(function(p){return p.status==="published"}), state={cat:"all",q:""};
    var counts={}; list.forEach(function(p){counts[p.category]=(counts[p.category]||0)+1});
    CATEGORIES.forEach(function(c){if(c[0]!=="all"&&!counts[c[0]])return;var b=document.createElement("button");b.className="shop-filter-btn"+(c[0]==="all"?" active":"");b.dataset.category=c[0];b.textContent=c[1]+" ("+(c[0]==="all"?list.length:counts[c[0]])+")";filters.appendChild(b)});
    function render(){var q=state.q.toLowerCase().trim(), shown=list.filter(function(p){return(state.cat==="all"||p.category===state.cat)&&(!q||[p.title,p.shortDescription,p.category].concat(p.keywords||[],p.tags||[]).join(" ").toLowerCase().includes(q))});grid.innerHTML="";empty.style.display=shown.length?"none":"block";shown.forEach(function(p){grid.appendChild(card(p))})}
    filters.addEventListener("click",function(e){var b=e.target.closest(".shop-filter-btn");if(!b)return;filters.querySelectorAll("button").forEach(function(x){x.classList.remove("active")});b.classList.add("active");state.cat=b.dataset.category;render()});
    if(input)input.addEventListener("input",function(){state.q=input.value;render()});render();
  });
})();