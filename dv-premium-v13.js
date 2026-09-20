
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.getElementById('mobileMenu'),hamb=document.getElementById('hamb'); if(hamb&&menu)hamb.onclick=()=>menu.classList.toggle('show');
 const phrases=['smarter everyday habits','better sleep and recovery','clearer nutrition choices','calmer daily routines','consistent movement','simple self-care'];
 const el=document.getElementById('hookLine'); let p=0,i=phrases[0].length,mode='hold';
 function next(){
   const word=phrases[p];
   if(mode==='type'){i++;el.textContent=word.slice(0,i); if(i>=word.length){mode='hold';setTimeout(next,4200);return;} setTimeout(next,95);}
   else if(mode==='delete'){i--;el.textContent=word.slice(0,i); if(i<=0){p=(p+1)%phrases.length;mode='type';setTimeout(next,350);return;} setTimeout(next,48);}
   else {mode='delete';setTimeout(next,80);}
 }
 setTimeout(next,4200);
 const buttons=[...document.querySelectorAll('.filter-pill')],cards=[...document.querySelectorAll('#articleGrid .article-card')];
 buttons.forEach((b,idx)=>{if(idx===0)b.classList.add('active'); b.onclick=()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');const c=b.dataset.cat;cards.forEach(card=>card.style.display=(c==='All'||card.dataset.cat===c)?'':'none');}});
 // subtle click chime
 let ac; document.addEventListener('click',e=>{if(!e.target.closest('a,button'))return;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.value=880;g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.025,ac.currentTime+.005);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.06);o.start();o.stop(ac.currentTime+.065);}catch(_){}} ,true);
});
