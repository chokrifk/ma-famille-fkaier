const key='maFamilleFkaierData';
const defaults={
  lang:'fr',
  currentUser:null,
  tasks:[{id:1,text:'Preparer le cartable de Mariem',owner:'Mariem',done:false},{id:2,text:'Verifier la voiture',owner:'Choko',done:false},{id:3,text:'Preparer les courses',owner:'Ahlem',done:true}],
  messages:[{from:'Ahlem',text:'Bienvenue dans notre espace famille !',time:'09:12'},{from:'Choko',text:'N oubliez pas le gouter de Mariem 😊',time:'09:20'}],
  photos:[],
  mood:'😊',
  location:null,
  shopping:[{id:1,text:'Lait & Fromage',done:false},{id:2,text:'Cafe et biscuits pour Mariem',done:false},{id:3,text:'Legumes frais',done:true}],
  recipes:[{id:1,title:'Couscous du vendredi 🍲',note:'Demander a Ahlem la recette secrete !'},{id:2,title:'Gateau au chocolat 🍫',note:'Pour le gouter de Mariem ce week-end.'}],
  kidsTasks:[{id:1,text:'Ranger les jouets de la chambre',done:false},{id:2,text:'Lire une histoire ce soir',done:false},{id:3,text:'Dire je t aime a Papa et Maman',done:true}]
};

let data=JSON.parse(localStorage.getItem(key)||'null')||defaults; 
const save=()=>localStorage.setItem(key,JSON.stringify(data));

const t={
  fr:{
    brand:'Famille Fkaier',familyOnline:'Famille connectee',
    nav:{home:'Accueil',tasks:'Taches',school:'Ecole',shop:'Shopping & Cuisine',kids:'Coin de Mariem',location:'Localisation',chat:'Discussion',photos:'Souvenirs'},
    hello:'Bonjour',today:'Dimanche 6 septembre',welcome:'Bienvenue dans Ma Famille Fkaier.',
    tasks:'Taches du jour',addTask:'Ajouter une tache',taskPlaceholder:'Nouvelle tache…',
    school:'L ecole de Mariem',schedule:'Emploi du temps',upcoming:'A venir',
    shopTitle:'Shopping & Cuisine d Ahlem',shoppingList:'Liste de courses',addShop:'Ajouter un article',shopPlaceholder:'Ex: Pain, tomates...',recipes:'Idees de repas & Recettes',addRecipe:'Ajouter une idee',recipeTitle:'Nom de la recette / plat',recipeNote:'Notes / Ingredients...',
    kidsTitle:'Le coin magique de Mariem ✨',drawingBoard:'Mon ardoise magique 🎨',clearCanvas:'Effacer',saveDrawing:'Sauver le dessin',kidsChallenges:'Mes defis du jour 🌟',
    location:'Ou est la famille ?',locText:'Partagez votre position uniquement quand vous le souhaitez.',updateLocation:'Mettre a jour ma position',locationSaved:'Position enregistree sur cet appareil',
    chat:'Discussion familiale',message:'Ecrire un message…',send:'Envoyer',
    photos:'Nos souvenirs',addPhoto:'Ajouter une photo',mood:'Comment ca va ?',moodSaved:'Humeur enregistree',noPhotos:'Ajoutez le premier souvenir de la famille.',online:'en ligne',
    events:['Cours de maths','Devoir francais','Examen sciences','Natation']
  },
  ar:{
    brand:'عائلة فقيّر',familyOnline:'العائلة متصلة',
    nav:{home:'الرئيسية',tasks:'المهام',school:'المدرسة',shop:'التسوق والمطبخ',kids:'عالم مريم',location:'الموقع',chat:'المحادثة',photos:'الذكريات'},
    hello:'مرحباً',today:'الأحد 6 سبتمبر',welcome:'مرحباً بكم في تطبيق عائلة فقيّر.',
    tasks:'مهام اليوم',addTask:'إضافة مهمة',taskPlaceholder:'مهمة جديدة…',
    school:'مدرسة مريم',schedule:'الجدول الأسبوعي',upcoming:'القادم',
    shopTitle:'مطبخ وتسوق أحلام 🛒',shoppingList:'قائمة التسوق',addShop:'إضافة غرض',shopPlaceholder:'مثال: خبز، حليب...',recipes:'أفكار الوصفات والطبخ',addRecipe:'إضافة فكرة طبق',recipeTitle:'اسم الوجبة...',recipeNote:'ملاحظات أو مكونات...',
    kidsTitle:'العالم السحري لمريم ✨',drawingBoard:'لوحة الرسم السحرية 🎨',clearCanvas:'مسح اللوحة',saveDrawing:'حفظ الرسم',kidsChallenges:'تحدياتي اليومية 🌟',
    location:'أين العائلة؟',locText:'شاركي موقعك فقط عندما ترغبين.',updateLocation:'تحديث موقعي',locationSaved:'تم حفظ موقعك على هذا الجهاز',
    chat:'محادثة العائلة',message:'اكتبي رسالة…',send:'إرسال',
    photos:'ذكرياتنا',addPhoto:'إضافة صورة',mood:'كيف حالك؟',moodSaved:'تم حفظ المزاج',noPhotos:'أضيفوا أول ذكرى للعائلة.',online:'متصل',
    events:['درس الرياضيات','واجب الفرنسية','اختبار العلوم','السباحة']
  }
};

const icons={home:'⌂',tasks:'✓',school:'✎',shop:'🛒',kids:'⭐',location:'⌖',chat:'◌',photos:'▧'}; 
const q=()=>t[data.lang];

function login(name){
  data.currentUser=name;
  save();
  render();
}

function logout(){
  data.currentUser=null;
  save();
  render();
}

function toast(msg){const e=document.querySelector('#toast');e.textContent=msg;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2500)}

function nav(){
  let page=location.hash.slice(1)||'home',s=q();
  document.querySelector('#navigation').innerHTML=Object.entries(s.nav).map(([id,label])=>`<button class="nav-link ${id===page?'active':''}" data-icon="${icons[id]}" onclick="go('${id}')">${icons[id]} ${label}</button>`).join('');
  document.querySelector('#brandName').textContent=s.brand;
  document.querySelector('#currentUserBadge').textContent=`${data.currentUser}`;
  document.querySelector('#languageToggle').textContent=data.lang==='fr'?'عربي':'Français';
}

function header(title,sub,action=''){return `<header class="page-header"><div><p class="eyebrow">Ma Famille Fkaier</p><h1 class="page-title">${title}</h1>${sub?`<p class="page-subtitle">${sub}</p>`:''}</div>${action}</header>`}

function home(){
  let s=q(),remaining=data.tasks.filter(x=>!x.done).length;
  let greeting=`${s.hello}, ${data.currentUser} !`;
  return header(greeting,s.today)+`<section class="dashboard"><div>
    <article class="card today"><div class="today-icon">🏡</div><div><h2>${s.welcome}</h2><p class="muted">${s.tasks} · ${remaining} ${data.lang==='fr'?'a faire':'متبقية'}</p></div></article>
    <div class="stat-grid"><div class="stat"><strong>${remaining}</strong><span>${s.tasks}</span></div><div class="stat"><strong>🛒</strong><span>Shopping</span></div><div class="stat"><strong>${data.mood}</strong><span>${s.mood}</span></div></div>
    <article class="card" style="margin-top:22px"><div class="card-heading"><h2>${s.tasks}</h2><button class="button secondary" onclick="go('tasks')">${s.addTask}</button></div>${taskList(data.tasks.slice(0,3))}</article>
  </div><div>
    <article class="card"><h2>${s.mood}</h2><div class="mood-row">${moods()}</div></article>
    <article class="card" style="margin-top:22px"><div class="card-heading"><h2>${s.shopTitle}</h2><button class="button secondary" onclick="go('shop')">🛒</button></div><p class="muted">💡 ${data.shopping.filter(x=>!x.done).length} articles a acheter</p></article>
    <article class="card" style="margin-top:22px"><h2>${s.chat}</h2><div class="feed">${data.messages.slice(-3).map(m=>`<div class="feed-item"><b>${m.from}</b> ${m.text}<time>${m.time}</time></div>`).join('')}</div></article>
  </div></section>`;
}

function moods(){return ['😊','😌','🤗','😐','😔'].map(x=>`<button class="mood ${x===data.mood?'selected':''}" onclick="setMood('${x}')">${x}</button>`).join('')}
function taskList(items){return `<div class="check-list">${items.map(x=>`<div class="task-row ${x.done?'done':''}"><input type="checkbox" ${x.done?'checked':''} onchange="toggleTask(${x.id})" aria-label="Terminer"><label>${x.text}</label><span class="task-meta">${x.owner}</span></div>`).join('')}</div>`}

function tasks(){
  let s=q();
  return header(s.tasks,'',`<button class="button" onclick="document.querySelector('#newTask').focus()">＋ ${s.addTask}</button>`)+
  `<article class="card"><form class="task-form" onsubmit="addTask(event)"><input class="form-input" id="newTask" placeholder="${s.taskPlaceholder}" required><select class="form-input" id="owner"><option>Choko</option><option>Ahlem</option><option>Mariem</option></select><button class="button">${s.addTask}</button></form>${taskList(data.tasks)}</article>`;
}

function school(){
  let s=q(),days=data.lang==='fr'?['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']:['الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت','الأحد'];
  return header(s.school,'Mariem · CE2')+`<div class="two-col"><article class="card"><h2>${s.schedule}</h2><div class="planner">${days.map((d,i)=>`<div class="day"><strong>${d}</strong>${i<5?`<div class="event course">${s.events[0]}</div><div class="event">${s.events[1]}</div>`:''}${i===2?`<div class="event exam">${s.events[2]}</div>`:''}</div>`).join('')}</div></article><aside class="card"><h2>${s.upcoming}</h2><div class="feed"><div class="feed-item">🧪 <b>${s.events[2]}</b><br><span class="muted">Mercredi · 10:00</span></div><div class="feed-item">🏊 <b>${s.events[3]}</b><br><span class="muted">Vendredi · 17:00</span></div></div></aside></div>`;
}

function shop(){
  let s=q();
  return header(s.shopTitle,'Pour Ahlem & la maison')+
  `<div class="two-col">
    <article class="card">
      <h2>🛒 ${s.shoppingList}</h2>
      <form class="task-form" onsubmit="addShopItem(event)" style="grid-template-columns:1fr auto;margin-bottom:14px">
        <input class="form-input" id="newShop" placeholder="${s.shopPlaceholder}" required>
        <button class="button">＋</button>
      </form>
      <div class="check-list">${data.shopping.map(x=>`<div class="task-row ${x.done?'done':''}"><input type="checkbox" ${x.done?'checked':''} onchange="toggleShop(${x.id})"><label>${x.text}</label></div>`).join('')}</div>
    </article>
    <article class="card">
      <h2>🍳 ${s.recipes}</h2>
      <form onsubmit="addRecipe(event)" style="display:grid;gap:8px;margin-bottom:14px">
        <input class="form-input" id="recTitle" placeholder="${s.recipeTitle}" required>
        <input class="form-input" id="recNote" placeholder="${s.recipeNote}">
        <button class="button" style="width:100%">${s.addRecipe}</button>
      </form>
      <div class="feed">${data.recipes.map(r=>`<div class="feed-item"><b>🍲 ${r.title}</b><br><span class="muted">${r.note||''}</span></div>`).join('')}</div>
    </article>
  </div>`;
}

function kids(){
  let s=q();
  return header(s.kidsTitle,'Jeux, dessins et defis pour Mariem !')+
  `<div class="two-col">
    <article class="card">
      <h2>${s.drawingBoard}</h2>
      <div class="color-picker" style="display:flex;gap:8px;margin-bottom:10px">
        <button onclick="setPenColor('#6056d8')" style="background:#6056d8;width:25px;height:25px;border-radius:50%;border:none;cursor:pointer"></button>
        <button onclick="setPenColor('#ff595e')" style="background:#ff595e;width:25px;height:25px;border-radius:50%;border:none;cursor:pointer"></button>
        <button onclick="setPenColor('#ffca3a')" style="background:#ffca3a;width:25px;height:25px;border-radius:50%;border:none;cursor:pointer"></button>
        <button onclick="setPenColor('#8ac926')" style="background:#8ac926;width:25px;height:25px;border-radius:50%;border:none;cursor:pointer"></button>
        <button onclick="setPenColor('#1982c4')" style="background:#1982c4;width:25px;height:25px;border-radius:50%;border:none;cursor:pointer"></button>
        <button class="button secondary" style="padding:3px 10px;font-size:12px;margin-left:auto" onclick="clearCanvas()">${s.clearCanvas}</button>
      </div>
      <canvas id="paintCanvas" width="400" height="280" style="width:100%;background:#fff;border:2px dashed var(--line);border-radius:12px;cursor:crosshair"></canvas>
    </article>
    <article class="card">
      <h2>${s.kidsChallenges}</h2>
      <p class="muted" style="margin-bottom:14px">Coche tes defis une fois reussis ! 🌟</p>
      <div class="check-list">${data.kidsTasks.map(k=>`<div class="task-row ${k.done?'done':''}"><input type="checkbox" ${k.done?'checked':''} onchange="toggleKidsTask(${k.id})"><label>${k.text}</label></div>`).join('')}</div>
      ${data.kidsTasks.every(k=>k.done)?'<div style="text-align:center;margin-top:20px;font-size:18px;background:var(--mint);padding:12px;border-radius:12px;color:#236b43">🎉 Bravo Mariem ! Tu as gagne une super surprise ! 👑</div>':''}
    </article>
  </div>`;
}

function locationPage(){
  let s=q(),pin=data.location?`<div class="pin" style="top:42%;left:52%"><i><b>⌂</b></i><small>${data.location}</small></div>`:`<div class="pin" style="top:42%;left:52%"><i><b>⌂</b></i><small>${s.brand}</small></div>`;
  return header(s.location,s.locText)+`<article class="card map">${pin}</article><div class="loc-actions"><button class="button" onclick="getLocation()">⌖ ${s.updateLocation}</button><button class="button secondary" onclick="toast('${s.locText}')">ⓘ</button></div>`;
}

function chat(){
  let s=q();
  return header(s.chat,`${t.fr.familyOnline} · 3 ${s.online}`)+`<article class="card chat"><div class="messages">${data.messages.map(m=>`<div class="message ${m.from===data.currentUser?'me':''}"><b>${m.from}</b><br>${m.text}<small>${m.time}</small></div>`).join('')}</div><form class="chat-form" onsubmit="sendMessage(event)"><input id="messageInput" placeholder="${s.message}" required><button class="button">${s.send}</button></form></article>`;
}

function photos(){
  let s=q();
  return header(s.photos,'',`<label class="button" for="photoInput">＋ ${s.addPhoto}</label><input hidden id="photoInput" type="file" accept="image/*" onchange="addPhoto(event)">`)+`<section class="gallery"><label class="photo upload" for="photoInput">＋<small>${s.addPhoto}</small></label>${data.photos.map(x=>`<div class="photo"><img src="${x}" alt="Souvenir familial"></div>`).join('')}${!data.photos.length?`<p class="empty">${s.noPhotos}</p>`:''}</section>`;
}

function render(){
  const authScreen = document.querySelector('#authScreen');
  const appShell = document.querySelector('#appShell');

  if(!data.currentUser){
    authScreen.style.display = 'flex';
    appShell.style.display = 'none';
    return;
  }

  authScreen.style.display = 'none';
  appShell.style.display = 'grid';

  document.documentElement.lang=data.lang;
  document.documentElement.dir=data.lang==='ar'?'rtl':'ltr';
  document.body.classList.toggle('rtl',data.lang==='ar');
  nav();
  let p=location.hash.slice(1)||'home';
  document.querySelector('#app').innerHTML=({home,tasks,school,shop,kids,location:locationPage,chat,photos}[p]||home)();
  if(p==='kids') initCanvas();
}

function go(p){location.hash=p;render()} 
function toggleTask(id){let item=data.tasks.find(x=>x.id===id);item.done=!item.done;save();render()} 
function addTask(e){e.preventDefault();data.tasks.unshift({id:Date.now(),text:newTask.value,owner:owner.value,done:false});save();render()} 
function addShopItem(e){e.preventDefault();data.shopping.unshift({id:Date.now(),text:newShop.value,done:false});save();render()}
function toggleShop(id){let item=data.shopping.find(x=>x.id===id);item.done=!item.done;save();render()}
function addRecipe(e){e.preventDefault();data.recipes.unshift({id:Date.now(),title:recTitle.value,note:recNote.value});save();render()}
function toggleKidsTask(id){let item=data.kidsTasks.find(x=>x.id===id);item.done=!item.done;save();render()}
function setMood(m){data.mood=m;save();toast(q().moodSaved);render()} 
function sendMessage(e){e.preventDefault();data.messages.push({from:data.currentUser,text:messageInput.value,time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})});save();render()} 
function addPhoto(e){let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{data.photos.unshift(r.result);save();render()};r.readAsDataURL(f)} 
function getLocation(){if(!navigator.geolocation){toast('Geolocation indisponible');return}navigator.geolocation.getCurrentPosition(p=>{data.location=`${p.coords.latitude.toFixed(3)}, ${p.coords.longitude.toFixed(3)}`;save();toast(q().locationSaved);render()},()=>toast('Autorisation de localisation requise'))}

let penColor='#6056d8';
function setPenColor(c){penColor=c}
function initCanvas(){
  let canvas=document.querySelector('#paintCanvas');
  if(!canvas)return;
  let ctx=canvas.getContext('2d');
  let drawing=false;
  canvas.onmousedown=(e)=>{drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY)}
  canvas.onmousemove=(e)=>{if(!drawing)return;ctx.lineTo(e.offsetX,e.offsetY);ctx.strokeStyle=penColor;ctx.lineWidth=4;ctx.lineCap='round';ctx.stroke()}
  canvas.onmouseup=()=>drawing=false;
  canvas.ontouchstart=(e)=>{drawing=true;let rect=canvas.getBoundingClientRect();let t=e.touches[0];ctx.beginPath();ctx.moveTo(t.clientX-rect.left,t.clientY-rect.top);e.preventDefault()}
  canvas.ontouchmove=(e)=>{if(!drawing)return;let rect=canvas.getBoundingClientRect();let t=e.touches[0];ctx.lineTo(t.clientX-rect.left,t.clientY-rect.top);ctx.strokeStyle=penColor;ctx.lineWidth=4;ctx.lineCap='round';ctx.stroke();e.preventDefault()}
  canvas.ontouchend=()=>drawing=false;
}
function clearCanvas(){let canvas=document.querySelector('#paintCanvas');if(canvas){let ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height)}}

document.querySelector('#languageToggle').onclick=()=>{data.lang=data.lang==='fr'?'ar':'fr';save();render()};
window.onhashchange=render;
render();
