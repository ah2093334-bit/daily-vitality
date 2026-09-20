
(function(){
  const $=s=>document.querySelector(s);
  let qIndex=0,locked=false,rotationTimer=null,nextTimer=null;
  function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
  function questions(){return shuffle(window.DV_QUIZ_QUESTIONS||[])}
  let pool=[];
  function ensure(){if(!pool.length)pool=questions();}
  function draw(){
    const box=$('#homeQuickQuiz'); if(!box)return;
    ensure(); const q=pool[qIndex%pool.length]; locked=false;
    $('#hqTopic').textContent=q.topic.toUpperCase(); $('#hqQuestion').textContent=q.q;
    $('#hqFeedback').innerHTML='Choose one answer. Correct answers turn green; incorrect answers turn red.';
    const opts=$('#hqOptions'); opts.innerHTML='';
    q.o.forEach((opt,i)=>{const b=document.createElement('button');b.className='hq-option';b.textContent=opt;b.onclick=()=>answer(q,i,b);opts.appendChild(b);});
    clearTimeout(rotationTimer);rotationTimer=setTimeout(()=>{if(!locked){qIndex++;draw();}},30000);
  }
  function answer(q,choice,btn){
    if(locked)return;locked=true;clearTimeout(rotationTimer);
    const buttons=[...document.querySelectorAll('#hqOptions .hq-option')];
    buttons.forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add('correct');});
    if(choice!==q.a){btn.classList.add('wrong');$('#hqFeedback').innerHTML='<b>Incorrect.</b> Correct answer: <strong>'+q.o[q.a]+'</strong>. '+q.e;}
    else{$('#hqFeedback').innerHTML='<b>Correct.</b> '+q.e;}
    $('#hqFeedback').innerHTML+=' <a href="'+q.link+'">Learn more →</a><span>New question in 5 seconds.</span>';
    clearTimeout(nextTimer);nextTimer=setTimeout(()=>{qIndex++;draw();},5000);
  }
  document.addEventListener('DOMContentLoaded',()=>{if($('#homeQuickQuiz'))draw();});
})();
