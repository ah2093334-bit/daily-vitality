
(function(){
  // subtle falling stars
  if(!document.documentElement.dataset.dvStars){
    document.documentElement.dataset.dvStars='1';
    setInterval(()=>{ if(document.hidden) return; const s=document.createElement('i');s.className='dv-star';s.style.left=(Math.random()*100)+'vw';s.style.opacity=(.25+Math.random()*.55);s.style.animationDuration=(6+Math.random()*8)+'s';document.body.appendChild(s);setTimeout(()=>s.remove(),15000)},650);
  }
  // short click chime for article/blog cards, with mute button
  let muted=localStorage.getItem('dvSoundMuted')==='1';
  const btn=document.createElement('button');btn.className='sound-toggle';btn.textContent=muted?'🔇 Click sound':'🔊 Click sound';document.body.appendChild(btn);
  btn.onclick=()=>{muted=!muted;localStorage.setItem('dvSoundMuted',muted?'1':'0');btn.textContent=muted?'🔇 Click sound':'🔊 Click sound'};
  function chime(){
    if(muted) return;
    try{
      const AC=window.AudioContext||window.webkitAudioContext, ac=new AC();
      const o=ac.createOscillator(), g=ac.createGain();o.connect(g);g.connect(ac.destination);
      o.type='sine';o.frequency.setValueAtTime(740,ac.currentTime);o.frequency.exponentialRampToValueAtTime(1110,ac.currentTime+.12);
      g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.12,ac.currentTime+.015);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.18);
      o.start();o.stop(ac.currentTime+.19);setTimeout(()=>ac.close(),300);
    }catch(e){}
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('a.article-card,a.blog-card,a.blog-page-card,a.blog-card-article');
    if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button===1) return;
    const href=a.getAttribute('href'); if(!href||href.startsWith('#')) return;
    e.preventDefault();chime();setTimeout(()=>location.href=href,170);
  });
})();
