/* BaobaoBytes site script. Nothing here sends data anywhere: games and tools run on the visitor's own device. */
(function(){
var app=document.getElementById('app');if(!app)return;
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function lite(){return app.hasAttribute('data-lite')}
function calm(){return lite()||RM}
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
/* Visible text. Kiswahili pages load b3-sw.js first, which sets window.B3_SW to override these. */
var SW=window.B3_SW||{};
var UI={selected:'Selected, press copy',copied:'Copied ✓',copyNo:'Copy not allowed here',copyAgree:'Copy agreement',
 question:function(i,n){return 'Question '+i+' of '+n},good:'Nice one! ✅',miss:'Not quite. Here’s why',best:'Best move:',seeBadge:'See my badge',next:'Next',
 unlocked:'Badge unlocked',spotted:function(s,n){return 'You spotted '+s+' of '+n+' tricks. '},perfect:'Perfect score! 🎉',sharper:'Every try makes you sharper.',
 earned:'Badge earned',again:'Play again',parentsAll:'You’d handle all three calmly. Share these with another parent.',parentsSome:'Calm first, then act. Try again or read the steps on this page.',
 kidsAll:'You got every one right. Teach a grown-up one trick you spotted!',kidsSome:'Want to try again? Practice makes you faster in real life.',
 tapBox:'Now tap a box: “OK to share” or “Keep secret”.',tapCard:'First tap a card above.',sorted:'🎉 All sorted! You know what to keep secret.',
 yes:function(x){return 'Yes! “'+x+'” goes there.'},secretWhy:function(x){return 'Hmm, think again: a stranger could use “'+x+'” to find you or get into your things.'},
 shareWhy:function(x){return 'Hmm, think again: “'+x+'” is fine to share. It doesn’t show where you are.'},
 tickPromises:'Tick a few promises to build your agreement.',agreeTitle:'Our family online agreement'};
if(SW.ui)for(var uk in SW.ui)UI[uk]=SW.ui[uk];

/* ---- menu ---- */
var menu=$('.menu'),nav=$('#nav');
if(menu&&nav)menu.addEventListener('click',function(){var o=!nav.classList.contains('open');nav.classList.toggle('open',o);menu.setAttribute('aria-expanded',o)});

/* ---- low-data mode (remembered across pages) ---- */
var liteBtn=$('#lite');
function setLite(on){on?app.setAttribute('data-lite',''):app.removeAttribute('data-lite');if(liteBtn)liteBtn.setAttribute('aria-pressed',on);store('b3-lite',on?'1':'')}
if(store('b3-lite'))setLite(true);
if(liteBtn)liteBtn.addEventListener('click',function(){setLite(!lite())});

/* ---- headline typewriter ---- */
var tw=$('#tw'),twTimer=0;
function typeLine(t){clearInterval(twTimer);if(!tw)return;if(calm()){tw.textContent=t;return}var i=0;tw.textContent='';twTimer=setInterval(function(){tw.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(twTimer)},55)}

/* ---- count-up numbers (stats show real facts only) ---- */
$$('.num[data-n]').forEach(function(el){
  var n=+el.dataset.n;el.textContent=n;if(calm())return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.disconnect();var t0=null;
    (function f(t){t0=t0||t;var k=Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(performance.now())})},{threshold:.4});
  io.observe(el);
});

/* ---- Wabunifu: tilt toward the pointer ---- */
$$('.tilt,.pc').forEach(function(c){
  c.addEventListener('pointermove',function(e){if(app.dataset.skin!=='wabunifu'||calm())return;var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(700px) rotateY('+x*12+'deg) rotateX('+(-y*12)+'deg)'});
  c.addEventListener('pointerleave',function(){c.style.transform=''});
});

/* ---- confetti dots ---- */
var cs=['#FFD60A','#FF2E93','#00D4D8','#7ED321','#FF7A00'];
function burst(x,y){
  if(calm()||app.dataset.skin==='parents')return;
  for(var i=0;i<10;i++){var d=document.createElement('i'),a=i/10*6.283,k=46+Math.random()*34;d.className='dot-burst';d.style.left=x+'px';d.style.top=y+'px';d.style.background=cs[i%5];document.body.appendChild(d);
    d.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:'translate(calc(-50% + '+Math.cos(a)*k+'px),calc(-50% + '+Math.sin(a)*k+'px)) scale(0)',opacity:0}],{duration:650,easing:'ease-out'}).onfinish=(function(n){return function(){n.remove()}})(d)}
}

/* ---- copy buttons ---- */
function copyText(btn,el,label){
  var t=el.textContent;
  function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent=UI.selected}
  try{navigator.clipboard.writeText(t).then(function(){btn.textContent=UI.copied;setTimeout(function(){btn.textContent=label},1800)},sel)}catch(x){sel()}
}
$$('.mail').forEach(function(m){var b=$('button',m),s=$('span',m);if(b&&s){var l=b.textContent;b.addEventListener('click',function(){copyText(b,s,l)})}});

/* ================= Spot the Trick ================= */
var BADGE=SW.badge||{home:['🌳','Explorer'],chipukizi:['🌱','Safe Online'],wabunifu:['🎨','Creator'],walinzi:['🛡️','Defender'],parents:['🤝','Calm Guide']};
var Q={
 chipukizi:[
  {app:['⭐','Star_Gamer','In the game chat'],kind:'chat',msg:'Hi! I’m 10 too 😊 What school do you go to? Maybe we live near each other!',q:'What should you do?',o:[
   ['Tell them your school. They’re a kid too!',0,'Anyone can pretend to be 10 online. Your school tells a stranger where to find you.'],
   ['Don’t share, and tell a trusted grown-up',1,'Yes! Your school, home and where you go are secrets to keep. A grown-up can help you block and report.'],
   ['Send a photo in your uniform instead',0,'A uniform shows your school just like saying its name.']]},
  {app:['🎮','Game pop-up','Just now'],kind:'popup',msg:'🎉 YOU WON 5,000 FREE COINS! Type your mum’s phone number to claim now!',q:'Real prize or trick?',o:[
   ['Real prize! Type the number quickly',0,'Prizes that ask for phone numbers are tricks to collect family details.'],
   ['Trick! Close it and tell a grown-up',1,'Correct. Real games don’t ask for family phone numbers to give you coins.']]},
  {app:['🦁','SimbaKing','Friend from a game'],kind:'chat',msg:'You’re my best friend 💛 Let’s keep our chats a secret, ok? Don’t tell your parents.',q:'How does this feel?',o:[
   ['Fine, secrets are fun',0,'Surprises are fine. Secrets that leave out your grown-ups are a warning sign.'],
   ['Uh-oh. Tell a trusted grown-up',1,'Spot on. Anyone who asks you to hide chats from your family is not being a real friend.'],
   ['Just stop replying and say nothing',0,'Stopping is good, but tell a grown-up too, so they can help block and report.']]},
  {app:['🔒','Your tablet','Settings'],kind:'post',msg:'Your cousin asks for your game password so they can “help you level up”.',q:'What do you do?',o:[
   ['Share it. They’re family',0,'Even people you like can lose or misuse a password. Passwords stay with you and your parent.'],
   ['Keep it secret. Only you and your parent know it',1,'Yes! A password is like a toothbrush: don’t share it.']]}
 ],
 wabunifu:[
  {app:['✨','@glowbrand.ke','Business account'],kind:'chat',msg:'We LOVE your dance videos 🔥 We want to sponsor you! Just pay KSh 500 registration and send your phone number.',q:'Real deal or scam?',o:[
   ['Pay the 500. It’s a small price for a sponsor',0,'Real brands pay creators. They never ask you to pay them first.'],
   ['Scam: real brands never ask you to pay',1,'Exactly. Screenshot, block, and show a trusted adult if you are unsure.'],
   ['Send your number but don’t pay',0,'Your number lets them keep pressuring you. Don’t send it.']]},
  {app:['🎤','Trending video','1.2M views'],kind:'post',msg:'A video shows a famous Kenyan musician saying: “Download this app for FREE airtime, link in bio!” Their lips look slightly off.',q:'What’s your move?',o:[
   ['Download it. They’re famous, it must be real',0,'AI can fake faces and voices. Fame is exactly why scammers copy them.'],
   ['Check the star’s official account first',1,'Smart. Look for the verified account. If it isn’t there, it’s likely a deepfake.']]},
  {app:['📱','Your draft','About to post'],kind:'post',msg:'Your new video was filmed outside your gate. You can see your house number and your school jumper.',q:'Before you post…',o:[
   ['Post it. Nobody notices backgrounds',0,'People do notice. Strangers can piece together where you live.'],
   ['Re-film or blur the house number and uniform',1,'Yes. Check the background, not just yourself, every time.']]},
  {app:['🎨','@copycat_art','Repost'],kind:'post',msg:'Someone reposted your drawing with no credit and is getting lots of likes.',q:'Best next step?',o:[
   ['Leave mean comments everywhere',0,'That can turn into a fight and hurts your reputation.'],
   ['Report it, ask for credit, keep your original files',1,'Good. Your dated originals prove it’s yours. A trusted adult can help you report it.']]}
 ],
 walinzi:[
  {app:['💬','SMS · 0712 xxx xxx','Not from M-PESA'],kind:'sms',msg:'Confirmed. You have received Ksh2,500.00 from JOHN K… Kindly reverse, I sent by mistake. Call me.',q:'What do you do?',o:[
   ['Send it back. Being honest matters',0,'This is the classic reversal scam. The SMS came from a normal number, and there was no money.'],
   ['Check your real M-PESA balance first, and don’t send',1,'Right. Real M-PESA messages come from MPESA, not a personal number. Check your balance and ignore it.'],
   ['Call them back to sort it out',0,'Calling gives them a chance to pressure you. Check your balance, then ignore or report.']]},
  {app:['🙋','Your friend Brian','Instagram DM'],kind:'chat',msg:'Bro please vote for me in a contest 🙏 I just sent a 6-digit code to your phone, send it to me!',q:'Should you send the code?',o:[
   ['Yes, he’s my friend',0,'Brian’s account was probably hacked. That code lets them take over YOUR account.'],
   ['No. Codes are never shared. Call Brian directly',1,'Correct. A one-time code is a key to your account. Check with the real Brian another way.']]},
  {app:['💼','Remote jobs KE','Telegram'],kind:'chat',msg:'Earn KSh 3,000/day just liking videos 👍 Deposit KSh 1,000 to unlock premium tasks.',q:'Your verdict?',o:[
   ['Try it. The first tasks might pay',0,'Task scams often pay a little first so you deposit more.'],
   ['Scam: real jobs don’t charge you to start',1,'Yes. Any “job” that needs your deposit is taking money, not paying it.']]},
  {app:['⚠️','Unknown account','Message request'],kind:'chat',msg:'I have an edited photo of you. Pay KSh 5,000 or I send it to your school group.',q:'What is the safest move?',o:[
   ['Pay quickly so it goes away',0,'Paying almost never ends it. They usually ask for more.'],
   ['Don’t pay. Save evidence, block, tell a trusted adult and report',1,'Right. You’ve done nothing wrong. Get help: Childline 116 is free, and police can act on blackmail.'],
   ['Delete everything and tell no one',0,'Keep the evidence. It helps adults, the platform and police stop them.']]}
 ],
 parents:[
  {app:['👧','Your daughter, 10','In the kitchen'],kind:'chat',msg:'Mum… someone in my game keeps asking for my picture.',q:'Which response helps most?',o:[
   ['“That’s it, no more games for you!”',0,'Banning the game teaches her that telling you leads to punishment.'],
   ['“Thank you for telling me. Let’s look together, then block and report.”',1,'Yes. Calm thanks keeps her talking to you. Then save evidence, block and report.']]},
  {app:['🧒','Your son, 14','Evening'],kind:'chat',msg:'A brand wants to sponsor my TikTok, but I need to pay a registration fee.',q:'Best advice?',o:[
   ['“Real sponsors pay you. Let’s check who they are.”',1,'Right. Brands never ask children to pay first. Check together and report it.'],
   ['“Pay it if it’s small. It might be a big break.”',0,'Fees and “registration” are the hook in most fake sponsorship scams.']]},
  {app:['🧑','Your teen, 16','Late at night'],kind:'chat',msg:'Someone has a fake photo of me and wants money or they’ll share it.',q:'What do you say first?',o:[
   ['“How could you be so careless?”',0,'Blame makes teens stop talking, and blackmailers rely on that silence.'],
   ['“You’re not in trouble. We’ll handle this together. Don’t pay.”',1,'Yes. Reassure, don’t pay, save evidence, report on the platform, and call Childline 116 or the police.']]}
 ]
};
if(SW.Q)Q=SW.Q;
Q.home=[Q.chipukizi[1],Q.wabunifu[0],Q.walinzi[1]];

var gameEl=$('#game'),mountGame=function(){};
if(gameEl){
  var set,qs,screen=$('.screen',gameEl),quiz=$('.quiz',gameEl),st;
  mountGame=function(s){set=Q[s]?s:'chipukizi';qs=Q[set];start()};
  function start(){st={i:0,score:0,answered:false};renderQ()}
  function renderQ(){
    var q=qs[st.i];st.answered=false;
    screen.innerHTML='<div class="app"><span class="av">'+q.app[0]+'</span><span class="who">'+esc(q.app[1])+'<small>'+esc(q.app[2])+'</small></span></div><div class="bubble '+q.kind+'">'+esc(q.msg)+'</div>';
    var bars='';for(var k=0;k<qs.length;k++)bars+='<i class="'+(k<st.i?'done':k===st.i?'now':'')+'"></i>';
    var opts='';q.o.forEach(function(o,n){opts+='<button type="button" class="opt" data-n="'+n+'"><span class="k">'+'ABC'[n]+'</span><span>'+esc(o[0])+'</span></button>'});
    quiz.innerHTML='<div class="progress" aria-hidden="true">'+bars+'</div><p class="small">'+UI.question(st.i+1,qs.length)+'</p><p class="qtext">'+esc(q.q)+'</p><div class="opts">'+opts+'</div><div class="fb" aria-live="polite"></div>';
    $$('.opt',quiz).forEach(function(b){b.addEventListener('click',function(e){answer(+b.dataset.n,e)})});
  }
  function answer(n,e){
    if(st.answered)return;st.answered=true;
    var q=qs[st.i],pick=q.o[n],good=!!pick[1],best=q.o.filter(function(o){return o[1]})[0][0],last=st.i===qs.length-1;if(good)st.score++;
    $$('.opt',quiz).forEach(function(b,k){b.disabled=true;if(q.o[k][1])b.classList.add('right');else if(k===n)b.classList.add('wrong')});
    $('.fb',quiz).innerHTML='<div class="feedback'+(good?'':' miss')+'"><b>'+(good?UI.good:UI.miss)+'</b>'+esc(pick[2])+(good?'':'<br><strong>'+UI.best+'</strong> '+esc(best))+'</div>'+
      '<div class="ctas" style="margin-top:14px"><button type="button" class="btn next">'+(last?UI.seeBadge:UI.next)+' →</button></div>';
    $('.next',quiz).addEventListener('click',function(){if(last)finish();else{st.i++;renderQ();$('.opt',quiz).focus()}});
    if(good&&e)burst(e.clientX,e.clientY);
  }
  function finish(){
    var b=BADGE[set],n=qs.length,all=st.score===n;
    screen.innerHTML='<div class="app"><span class="av">'+b[0]+'</span><span class="who">BaobaoBytes<small>'+UI.unlocked+'</small></span></div><div class="bubble">'+UI.spotted(st.score,n)+(all?UI.perfect:UI.sharper)+'</div>';
    quiz.innerHTML='<div class="done-card"><div class="badge"><span class="medal" aria-hidden="true">'+b[0]+'</span><div><p class="small">'+UI.earned+'</p><h3>'+b[1]+'</h3></div></div><p>'+
      (set==='parents'?(all?UI.parentsAll:UI.parentsSome):(all?UI.kidsAll:UI.kidsSome))+
      '</p><div class="ctas"><button type="button" class="btn again">'+UI.again+'</button></div></div>';
    $('.again',quiz).addEventListener('click',start);
    if(!calm()){var r=quiz.getBoundingClientRect();for(var k=0;k<3;k++)setTimeout(function(){burst(r.left+r.width*Math.random(),r.top+60)},k*180)}
  }
  if(gameEl.dataset.set!=='skin')mountGame(gameEl.dataset.set);
}

/* ================= Landing: skin switcher (from the brand preview) ================= */
var LINES=SW.lines||{chipukizi:'Let’s play, and stay safe!',wabunifu:'Create it. Check it. Own it.',walinzi:'Defend. Build. Show your work.',parents:'Calm, practical online safety for your child.'};
var skBtns=$$('.sk button[data-s]');
if(skBtns.length){
  var lede=$('#skin-lede'),cta=$('#skin-cta'),LEDE=SW.lede||{
    chipukizi:['Games and stories for ages 9–11 to spot tricks, keep secrets safe and know who to tell.','chipukizi.html','Explore Chipukizi'],
    wabunifu:['For creators aged 12–14: check before you post, spot fakes and protect your work.','wabunifu.html','Explore Wabunifu'],
    walinzi:['For ages 15–18: lock down your accounts, beat Kenyan scams and use AI wisely.','walinzi.html','Explore Walinzi'],
    parents:['Plain-language help for parents and carers, so you can support your child without panic.','wazazi.html','Explore Wazazi']};
  function skin(s,animate){
    if(!LINES[s])s='chipukizi';app.dataset.skin=s;
    skBtns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.s===s)});
    $$('.fl').forEach(function(f){f.style.translate=''});
    if(lede)lede.textContent=LEDE[s][0];
    if(cta){cta.href=LEDE[s][1];cta.textContent=LEDE[s][2]+' →'}
    store('b3-skin',s);
    if(animate)typeLine(LINES[s]);else if(tw)tw.textContent=LINES[s];
    mountGame(s);
  }
  skBtns.forEach(function(b){b.addEventListener('click',function(){skin(b.dataset.s,true)})});
  skin(store('b3-skin')||'chipukizi',false);
  /* Wabunifu: floating icons drift with scroll, as in the preview */
  var tk=0;addEventListener('scroll',function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;if(app.dataset.skin!=='wabunifu'||calm())return;$$('.fl').forEach(function(f){f.style.translate='0 '+scrollY*f.dataset.sp+'px'})})},{passive:true});
}
if(liteBtn)liteBtn.addEventListener('click',function(){if(tw&&skBtns.length)typeLine(LINES[app.dataset.skin])});

/* path pages type their own headline once */
if(tw&&!skBtns.length&&tw.textContent)typeLine(tw.textContent);

/* ================= Chipukizi: Secret or Share sorter ================= */
var sorter=$('#sorter');
if(sorter){
  var items=SW.sorter||[['Your favourite colour','share'],['Your password','secret'],['Your school’s name','secret'],['Your favourite animal','share'],['Your home address','secret'],['A drawing (no face, no name)','share'],['Your phone number','secret'],['The game you like best','share']];
  var tray=$('.tray',sorter),say=$('.say',sorter),picked=null,placed=0;
  items.forEach(function(it,i){var b=document.createElement('button');b.type='button';b.className='chip';b.textContent=it[0];b.dataset.i=i;tray.appendChild(b);
    b.addEventListener('click',function(){$$('.chip.picked',sorter).forEach(function(c){c.classList.remove('picked')});picked=b;b.classList.add('picked');say.textContent=UI.tapBox})});
  $$('.bin',sorter).forEach(function(bin){bin.addEventListener('click',function(e){
    if(!picked)return say.textContent=UI.tapCard;
    var it=items[+picked.dataset.i],right=it[1]===bin.dataset.bin;
    if(right){picked.classList.remove('picked');picked.classList.add(bin.dataset.bin==='share'?'good':'bad');picked.disabled=true;$('.in',bin).appendChild(picked);placed++;burst(e.clientX,e.clientY);
      say.textContent=placed===items.length?UI.sorted:UI.yes(it[0]);picked=null}
    else say.textContent=it[1]==='secret'?UI.secretWhy(it[0]):UI.shareWhy(it[0]);
  })});
  $('.reset',sorter).addEventListener('click',function(){$$('.chip',sorter).forEach(function(c){c.disabled=false;c.className='chip';tray.appendChild(c)});placed=0;picked=null;say.textContent=''});
}

/* ================= Chipukizi: super password maker ================= */
var pw=$('#pw');
if(pw){
  var PW=SW.pw||{};
  var A=PW.A||['Mango','Simba','Twiga','Pilipili','Rocket','Banana','Ndovu','Chapati','Kifaru','Pancake','Thunder','Mandazi','Zebra','Comet','Pineapple','Baobab'];
  var B=PW.B||['Dances','Sings','Jumps','Sleeps','Giggles','Paints','Flies','Swims','Bakes','Drums'];
  var C=PW.C||['OnTheMoon','InMombasa','AtMidnight','WithSocks','UnderTheBed','OnABus','InTheRain','ByTheLake'];
  function pick(a){var r=new Uint32Array(1);crypto.getRandomValues(r);return a[r[0]%a.length]}
  function make(){var n=new Uint32Array(1);crypto.getRandomValues(n);$('.pw-out',pw).textContent=pick(A)+'-'+pick(B)+'-'+pick(C)+'-'+(10+n[0]%90)}
  $('button',pw).addEventListener('click',function(e){make();burst(e.clientX,e.clientY)});make();
}

/* ================= checklists with a meter ================= */
$$('.checklist').forEach(function(cl){
  var boxes=$$('input[type=checkbox]',cl),bar=$('.meter i',cl),out=$('.verdict',cl),note=$('.vnote',cl);
  var msgs=JSON.parse(cl.dataset.msgs);
  function upd(){var n=boxes.filter(function(b){return b.checked}).length,p=Math.round(n/boxes.length*100);bar.style.width=p+'%';
    var m=n===boxes.length?msgs[2]:n>=Math.ceil(boxes.length/2)?msgs[1]:msgs[0];out.textContent=m[0]+' · '+p+'%';note.textContent=m[1]}
  boxes.forEach(function(b){b.addEventListener('change',function(){upd();if(b.checked&&boxes.every(function(x){return x.checked})){var r=out.getBoundingClientRect();burst(r.left+40,r.top)}})});
  upd();
});

/* ================= Wazazi: family agreement ================= */
var ag=$('#agree');
if(ag){
  var outL=$('.agree-out ul',ag),boxes2=$$('input[type=checkbox]',ag);
  function upd2(){var picked=boxes2.filter(function(b){return b.checked});outL.innerHTML=picked.length?picked.map(function(b){return '<li>'+esc(b.value)+'</li>'}).join(''):'<li>'+UI.tickPromises+'</li>'}
  boxes2.forEach(function(b){b.addEventListener('change',upd2)});upd2();
  var cb=$('.copy-agree',ag);cb.addEventListener('click',function(){var t=UI.agreeTitle+'\n'+boxes2.filter(function(b){return b.checked}).map(function(b){return '• '+b.value}).join('\n');
    try{navigator.clipboard.writeText(t).then(function(){cb.textContent=UI.copied;setTimeout(function(){cb.textContent=UI.copyAgree},1800)},function(){cb.textContent=UI.copyNo})}catch(x){cb.textContent=UI.copyNo}});
}
})();
