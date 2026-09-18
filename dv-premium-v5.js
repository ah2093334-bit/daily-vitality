
(function(){
 const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
 const ham=q('#hamb'), mobile=q('#mobileMenu'); if(ham&&mobile) ham.onclick=()=>mobile.classList.toggle('open');
 document.addEventListener('click',e=>{if(mobile&&!e.target.closest('.brandrow')&&!e.target.closest('#mobileMenu'))mobile.classList.remove('open')});
 qa('.dropdown>.dropbtn').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));

 // Slow type -> pause -> erase -> next
 const hook=q('#hookLine');
 if(hook){
   const lines=[
    'smarter everyday habits.',
    'a healthier heart and body.',
    'better sleep and recovery.',
    'clearer nutrition choices.',
    'wellness that fits real life.'
   ];
   let li=0, ci=0, deleting=false;
   function tick(){
     const s=lines[li];
     if(!deleting){
       ci++; hook.textContent=s.slice(0,ci);
       if(ci>=s.length){deleting=true; setTimeout(tick,1800); return;}
       setTimeout(tick,72);
     }else{
       ci--; hook.textContent=s.slice(0,ci);
       if(ci<=0){deleting=false; li=(li+1)%lines.length; setTimeout(tick,650); return;}
       setTimeout(tick,42);
     }
   }
   tick();
 }

 // Smooth left-right image slider + buttons + touch
 const track=q('#heroTrack'), win=q('#heroWindow');
 if(track&&win){
   const slides=qa('#heroTrack .slide'); let idx=0, dir=1, timer;
   function maxIndex(){return Math.max(0,slides.length-2)}
   function go(n){
     idx=Math.max(0,Math.min(maxIndex(),n));
     const step=slides[0].getBoundingClientRect().width+14;
     track.style.transform=`translateX(${-idx*step}px)`;
   }
   function auto(){
     if(idx>=maxIndex())dir=-1; if(idx<=0)dir=1; go(idx+dir);
   }
   timer=setInterval(auto,6500);
   q('#heroPrev')?.addEventListener('click',()=>go(idx-1));
   q('#heroNext')?.addEventListener('click',()=>go(idx+1));
   let sx=0; win.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
   win.addEventListener('touchend',e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)go(idx+(dx<0?1:-1))},{passive:true});
   win.addEventListener('mouseenter',()=>clearInterval(timer)); win.addEventListener('mouseleave',()=>timer=setInterval(auto,6500));
   addEventListener('resize',()=>go(idx));
 }

 // Signup modal shell - never stores passwords locally.
 const modal=q('#joinModal'); qa('[data-join]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();modal?.classList.add('open')}));
 q('#closeJoin')?.addEventListener('click',()=>modal?.classList.remove('open'));
 modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 qa('[data-auth-not-ready]').forEach(b=>b.addEventListener('click',()=>{
   const t=q('#authToast'); if(t){t.textContent='Secure sign-in needs the Firebase web configuration before accounts can be created. No password or email is stored by this page.';t.classList.add('show')}
 }));
})();
