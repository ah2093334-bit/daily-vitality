
(function(){
  function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn)}
  function show(msg){ const el=document.getElementById('authToast')||document.getElementById('authStatus'); if(el) el.textContent=msg; }
  function configReady(){ return window.DV_FIREBASE && window.DV_FIREBASE.apiKey && !window.DV_FIREBASE.apiKey.includes('PASTE_'); }
  function attachScripts(){
    return new Promise((resolve,reject)=>{
      const urls=['https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js'];
      let i=0; function next(){ if(i>=urls.length) return resolve(); const s=document.createElement('script'); s.src=urls[i++]; s.onload=next; s.onerror=reject; document.head.appendChild(s);} next();
    });
  }
  function wireAuth(){
    if(!window.firebase.apps.length){ firebase.initializeApp(window.DV_FIREBASE); }
    const auth = firebase.auth();
    const email = document.getElementById('authEmail');
    const pass = document.getElementById('authPassword');
    const signup = document.getElementById('emailSignupBtn');
    const signin = document.getElementById('emailSigninBtn');
    const googleBtn = document.getElementById('googleAuthBtn');
    const signout = document.getElementById('signOutBtn');
    auth.onAuthStateChanged(user=>{
      const badge=document.getElementById('authUserBadge');
      if(user){ show('Signed in as '+(user.email||'user')+'.'); if(badge) badge.textContent='Signed in: '+(user.email||'Google user'); }
      else { if(badge) badge.textContent='Not signed in yet'; }
    });
    signup && signup.addEventListener('click', async ()=>{
      if(!email?.value || !pass?.value) return show('Enter an email and password first.');
      try{ await auth.createUserWithEmailAndPassword(email.value, pass.value); show('Account created successfully.'); }catch(err){ show(err.message); }
    });
    signin && signin.addEventListener('click', async ()=>{
      if(!email?.value || !pass?.value) return show('Enter an email and password first.');
      try{ await auth.signInWithEmailAndPassword(email.value, pass.value); show('Signed in successfully.'); }catch(err){ show(err.message); }
    });
    googleBtn && googleBtn.addEventListener('click', async ()=>{
      try{ const provider = new firebase.auth.GoogleAuthProvider(); await auth.signInWithPopup(provider); show('Signed in with Google.'); }catch(err){ show(err.message); }
    });
    signout && signout.addEventListener('click', async ()=>{ try{ await auth.signOut(); show('Signed out.'); }catch(err){ show(err.message); } });
  }
  ready(async ()=>{
    const modal=document.getElementById('joinModal');
    if(!modal){
      document.querySelectorAll('[data-join]').forEach(a=>a.href='account.html');
      return;
    }
    document.querySelectorAll('[data-join]').forEach(a=>a.addEventListener('click', e=>{e.preventDefault(); modal.classList.add('show')}));
    if(!configReady()){ show('Firebase-ready: add your public Firebase web config in firebase-config.js to activate signup and login.'); return; }
    try{ await attachScripts(); wireAuth(); }catch(err){ show('Firebase libraries failed to load. Check the network connection.'); }
  });
})();
