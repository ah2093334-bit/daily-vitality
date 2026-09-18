
(function(){
  let ctx;
  function ensure(){ if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)(); return ctx; }
  function toneSequence(freqs=[740,1100], dur=.05){
    const c=ensure(); c.resume(); let t=c.currentTime;
    freqs.forEach((f,i)=>{ const o=c.createOscillator(), g=c.createGain(); o.type='sine'; o.frequency.value=f; o.connect(g); g.connect(c.destination); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(.028,t+.005); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.start(t); o.stop(t+dur+.02); t+=dur*.72; });
  }
  document.addEventListener('click', function(e){
    const t = e.target.closest('a,button,summary,.filter-pill,.article-card,.tool-card,.blog-card,.resource-card,.mini-card');
    if(!t) return;
    toneSequence([880,1320], .045);
  }, true);
})();
