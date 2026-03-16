// ─── DATA ───────────────────────────────
var CU = null;
var PRODS = [];
var ADMINS = [];
var NID = 10;
var PF = 'all';
var AF = 'all';

var MA = {username:'oshan',password:'oshan5555',name:'P.A.O. Angel',role:'main',area:'Madampe',contact:'076 102 9880'};

var DP = [
  {id:1,name:'Ripe Red Papaya',cat:'fruit',price:320,unit:'per kg',desc:'Vibrant, sun-ripened papaya with velvety red flesh. Rich in Vitamin C and antioxidants. Harvested from Kurunegala.',emoji:'🍈',avail:true,img:'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&q=80',by:'oshan',byn:'P.A.O. Angel'},
  {id:2,name:'Sweet Mango',cat:'fruit',price:480,unit:'per kg',desc:'Juicy Willard mangoes at peak ripeness. Sweet golden-orange flesh and tropical aroma.',emoji:'🥭',avail:true,img:'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80',by:'oshan',byn:'P.A.O. Angel'},
  {id:3,name:'King Coconut',cat:'fruit',price:120,unit:'each',desc:'Fresh thambili from Kelaniya farms. Natural electrolytes for hydration.',emoji:'🥥',avail:true,img:'https://images.unsplash.com/photo-1560637902-e019f5a8c5e7?w=600&q=80',by:'oshan',byn:'P.A.O. Angel'},
  {id:4,name:'Garden Carrot',cat:'vegetable',price:180,unit:'per 500g',desc:'Crisp organic carrots from Nuwara Eliya highlands. Deep orange and naturally sweet.',emoji:'🥕',avail:true,img:'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80',by:'oshan',byn:'P.A.O. Angel'},
  {id:5,name:'Red Tomatoes',cat:'vegetable',price:140,unit:'per 500g',desc:'Vine-ripened tomatoes from Jaffna red soil. Perfect for curries and salads.',emoji:'🍅',avail:true,img:'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80',by:'oshan',byn:'P.A.O. Angel'},
  {id:6,name:'Fresh Pineapple',cat:'seasonal',price:260,unit:'each',desc:'Kew pineapples at peak season — golden and intensely aromatic from Kurunegala.',emoji:'🍍',avail:true,img:'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80',by:'oshan',byn:'P.A.O. Angel'},
  {id:7,name:'Watermelon',cat:'seasonal',price:350,unit:'per piece',desc:'Sweet watermelons from the dry zone. Deep red flesh and high water content.',emoji:'🍉',avail:false,img:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',by:'oshan',byn:'P.A.O. Angel'},
];

function save(){try{localStorage.setItem('pp_p',JSON.stringify(PRODS));localStorage.setItem('pp_a',JSON.stringify(ADMINS));localStorage.setItem('pp_n',NID);}catch(e){}}
function load(){
  try{
    var p=localStorage.getItem('pp_p');
    var a=localStorage.getItem('pp_a');
    var n=localStorage.getItem('pp_n');
    if(p)PRODS=JSON.parse(p);
    if(a)ADMINS=JSON.parse(a);
    if(n)NID=parseInt(n);
    if(!PRODS.length){PRODS=JSON.parse(JSON.stringify(DP));NID=10;save();}
  }catch(e){PRODS=JSON.parse(JSON.stringify(DP));NID=10;}
}

// ─── PUBLIC ─────────────────────────────
function filterP(cat,el){
  var tabs=document.querySelectorAll('.fts .ft');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('on');
  el.classList.add('on');
  PF=cat; renderPub();
}
function renderPub(){
  var list=PF==='all'?PRODS:PRODS.filter(function(p){return p.cat===PF;});
  var g=document.getElementById('pg');
  document.getElementById('pcount').textContent=PRODS.length+'+';
  if(!list.length){g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--mt)"><div style="font-size:3rem;margin-bottom:1rem">🌿</div>No products yet!</div>';return;}
  var html='';
  for(var i=0;i<list.length;i++){
    var p=list[i];
    var cat=p.cat.charAt(0).toUpperCase()+p.cat.slice(1);
    html+='<div class="pc">';
    if(!p.avail) html+='<div class="oos">Out of Stock</div>';
    html+='<div class="pi">';
    if(p.img) html+='<img src="'+p.img+'" alt="'+p.name+'" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display=\'none\'">';
    else html+='<span style="font-size:3.5rem">'+p.emoji+'</span>';
    html+='</div>';
    html+='<div class="pb">';
    html+='<span class="pbdg">'+cat+'</span>';
    html+='<div class="pn">'+p.name+'</div>';
    html+='<div class="pd">'+p.desc.substring(0,82)+'...</div>';
    html+='<div class="pf"><div><span class="pp">LKR '+p.price+'</span><br><span class="pu">'+p.unit+'</span></div>';
    if(p.avail) html+='<button class="pa" onclick="addCart(\''+p.name.replace(/\'/g,"\\'")+'\')" >+</button>';
    else html+='<button class="pa" disabled style="opacity:.4;cursor:not-allowed">+</button>';
    html+='</div>';
    html+='<div style="font-size:.69rem;color:var(--mt);margin-top:.32rem;">By: '+(p.byn||p.by||'PurePick')+'</div>';
    html+='</div></div>';
  }
  g.innerHTML=html;
}

function addCart(name){
  var t=document.getElementById('ctt');
  t.textContent='✅ '+name+' added to cart!';
  t.style.display='block';
  setTimeout(function(){t.style.display='none';},2800);
}

// ─── AI CHAT ────────────────────────────
var AIR={
  papaya:'🍈 Ripe Red Papaya is at peak freshness! Loaded with Vitamin C and papain enzymes. Try it chilled or in a smoothie!',
  mango:'🥭 Mangoes are in full season! Willard variety is sweeter. Price stable at LKR 480/kg.',
  tomato:'🍅 Tomatoes at LKR 140/500g — great value. Jaffna-grown have more lycopene.',
  carrot:'🥕 Nuwara Eliya carrots are super fresh. High altitude gives better sweetness.',
  pineapple:'🍍 Peak pineapple season! Kew variety is firm, golden and intensely aromatic.',
  coconut:'🥥 King Coconut is the best hydrator! Rich in potassium. Perfect after exercise.',
  recipe:'🍽️ Tell me which dish you\'re cooking and I\'ll list ingredients from PurePick!',
  fresh:'✅ All PurePick products harvested within 24 hours. 50+ local farmers, strict freshness checks.',
  def:'🌿 I can help with freshness, nutrition, recipes, and prices. What are you curious about?'
};
function aiSend(){
  var inp=document.getElementById('aii');
  var txt=inp.value.trim();
  if(!txt)return;
  var m=document.getElementById('aim');
  m.innerHTML+='<div class="msg us">'+txt+'</div>';
  m.innerHTML+='<div class="msg ty" id="aitype">PurePick AI is thinking...</div>';
  inp.value='';
  m.scrollTop=m.scrollHeight;
  setTimeout(function(){
    var ty=document.getElementById('aitype');
    if(ty)ty.parentNode.removeChild(ty);
    var l=txt.toLowerCase(),r=AIR.def;
    if(l.indexOf('papaya')>=0)r=AIR.papaya;
    else if(l.indexOf('mango')>=0)r=AIR.mango;
    else if(l.indexOf('tomato')>=0)r=AIR.tomato;
    else if(l.indexOf('carrot')>=0)r=AIR.carrot;
    else if(l.indexOf('pineapple')>=0)r=AIR.pineapple;
    else if(l.indexOf('coconut')>=0||l.indexOf('thambili')>=0)r=AIR.coconut;
    else if(l.indexOf('recipe')>=0||l.indexOf('cook')>=0)r=AIR.recipe;
    else if(l.indexOf('fresh')>=0||l.indexOf('quality')>=0)r=AIR.fresh;
    m.innerHTML+='<div class="msg ai">'+r+'</div>';
    m.scrollTop=m.scrollHeight;
  },1200);
}

// ─── LOGIN ──────────────────────────────
function showLogin(){
  document.getElementById('lm').style.display='flex';
  document.getElementById('merr').style.display='none';
  document.getElementById('lu').value='';
  document.getElementById('lp').value='';
  setTimeout(function(){document.getElementById('lu').focus();},100);
}
function hideLogin(){
  document.getElementById('lm').style.display='none';
}
function doLogin(){
  var u=document.getElementById('lu').value.trim();
  var p=document.getElementById('lp').value;
  document.getElementById('merr').style.display='none';

  // Check main admin
  if(u===MA.username && p===MA.password){
    CU={username:MA.username,name:MA.name,role:'main',area:MA.area,contact:MA.contact};
    hideLogin();
    openDash();
    return;
  }

  // Check seller admins
  var found=null;
  for(var i=0;i<ADMINS.length;i++){
    if(ADMINS[i].username===u && ADMINS[i].password===p){
      found=ADMINS[i];
      break;
    }
  }
  if(found){
    CU={username:found.username,name:found.name,role:'seller',area:found.area||'',contact:found.contact||'',district:found.district||'',town:found.town||'',village:found.village||''};
    hideLogin();
    openDash();
  }else{
    document.getElementById('merr').style.display='block';
  }
}

// ─── DASHBOARD ──────────────────────────
function openDash(){
  var d=document.getElementById('db');
  d.style.display='flex';
  buildNav();
  buildSide();
  updStats();
  renderMine();
  if(CU.role==='main'){renderAll();renderAdmins();}
  renderProf();
  goPanel('p-ov','t-ov');
}
function closeDash(){
  CU=null;
  document.getElementById('db').style.display='none';
}

function buildNav(){
  var isMa=CU.role==='main';
  var nav=document.getElementById('dnav');
  nav.className='dn '+(isMa?'ma':'sa');
  nav.innerHTML=
    '<div style="display:flex;align-items:center;gap:.85rem;">'+
      '<span class="dl">Pure<b>Pick</b></span>'+
      '<span class="dr '+(isMa?'ma':'sa')+'">'+(isMa?'⭐ MAIN ADMIN':'🌿 SELLER ADMIN')+'</span>'+
    '</div>'+
    '<div style="display:flex;align-items:center;gap:.85rem;">'+
      '<span style="font-size:.82rem;opacity:.78;">👤 '+(CU.name||CU.username)+'</span>'+
      '<button class="do" onclick="closeDash()">Logout ↗</button>'+
    '</div>';
}

function buildSide(){
  var isMa=CU.role==='main';
  var s='';
  s+='<div class="dsl">General</div>';
  s+='<button class="dt" id="t-ov" onclick="goPanel(\'p-ov\',\'t-ov\')">📊 <span>Overview</span></button>';
  s+='<div class="dsl">Products</div>';
  s+='<button class="dt" id="t-add" onclick="goPanel(\'p-add\',\'t-add\')">➕ <span>Add Product</span></button>';
  s+='<button class="dt" id="t-mine" onclick="goPanel(\'p-mine\',\'t-mine\')">📦 <span>My Products</span></button>';
  if(isMa){
    s+='<div class="dsl" style="color:var(--gd)">⭐ Main Admin</div>';
    s+='<button class="dt" id="t-all" onclick="goPanel(\'p-all\',\'t-all\')">🌍 <span>All Products</span></button>';
    s+='<button class="dt" id="t-adm" onclick="goPanel(\'p-adm\',\'t-adm\')">👥 <span>Manage Admins</span></button>';
  }
  s+='<div class="dsl">Account</div>';
  s+='<button class="dt" id="t-prof" onclick="goPanel(\'p-prof\',\'t-prof\')">👤 <span>Profile</span></button>';
  document.getElementById('dside').innerHTML=s;
}

function goPanel(pid,tid){
  var panels=document.querySelectorAll('.dp');
  for(var i=0;i<panels.length;i++) panels[i].classList.remove('on');
  var tabs=document.querySelectorAll('.dt');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('on');
  var panel=document.getElementById(pid);
  var tab=document.getElementById(tid);
  if(panel) panel.classList.add('on');
  if(tab) tab.classList.add('on');
  if(pid==='p-mine') renderMine();
  if(pid==='p-all') renderAll();
  if(pid==='p-adm') renderAdmins();
}

function updStats(){
  if(!CU)return;
  var mine=PRODS.filter(function(p){return p.by===CU.username;});
  var isMa=CU.role==='main';
  var fr=PRODS.filter(function(p){return p.cat==='fruit';}).length;
  var vg=PRODS.filter(function(p){return p.cat==='vegetable';}).length;
  var se=PRODS.filter(function(p){return p.cat==='seasonal';}).length;
  var av=PRODS.filter(function(p){return p.avail;}).length;
  var h='';
  if(isMa){
    h+=scard(PRODS.length,'Total Products');
    h+=scard(av,'Available');
    h+=scard(fr,'Fruits');
    h+=scard(vg,'Vegetables');
    h+=scard(se,'Seasonal');
    h+=scard(ADMINS.length,'Seller Admins');
  }else{
    h+=scard(mine.length,'My Products');
    h+=scard(mine.filter(function(p){return p.avail;}).length,'Available');
    h+=scard(mine.filter(function(p){return p.cat==='fruit';}).length,'Fruits');
    h+=scard(mine.filter(function(p){return p.cat==='vegetable';}).length,'Vegetables');
  }
  document.getElementById('dsc').innerHTML=h;
  document.getElementById('dwel').textContent='Welcome back, '+(CU.name||CU.username)+'!';
  document.getElementById('dsum').innerHTML=isMa?
    '→ '+PRODS.length+' total products across all sellers<br>→ '+ADMINS.length+' active seller admin accounts<br>→ '+fr+' fruits, '+vg+' vegetables, '+se+' seasonal items<br>→ '+PRODS.filter(function(p){return !p.avail;}).length+' products currently out of stock':
    '→ You have '+mine.length+' products listed<br>→ '+mine.filter(function(p){return p.avail;}).length+' available, '+mine.filter(function(p){return !p.avail;}).length+' out of stock';
}
function scard(n,l){return '<div class="scd"><div class="n">'+n+'</div><div class="l">'+l+'</div></div>';}

// ─── PRODUCT CRUD ────────────────────────
function addProd(){
  var n=document.getElementById('fn').value.trim();
  var c=document.getElementById('fc').value;
  var pr=parseInt(document.getElementById('fp').value);
  var u=document.getElementById('fu').value.trim();
  var d=document.getElementById('fd').value.trim();
  var av=document.getElementById('fa').value==='1';
  var img=document.getElementById('iprev').dataset.img||'';
  if(!n||!pr||!u||!d){showToast('⚠️ Please fill all required fields','er');return;}
  PRODS.push({id:NID++,name:n,cat:c,price:pr,unit:u,desc:d,avail:av,img:img,emoji:'🌿',by:CU.username,byn:CU.name||CU.username});
  save();renderPub();updStats();
  showToast('✅ "'+n+'" added to market!','ok');
  clearPF();goPanel('p-mine','t-mine');
}
function clearPF(){
  ['fn','fp','fu','fd'].forEach(function(id){document.getElementById(id).value='';});
  var prev=document.getElementById('iprev');
  var img=prev.querySelector('img');if(img)prev.removeChild(img);
  document.getElementById('iprevtxt').style.display='';
  delete prev.dataset.img;
}

function renderMine(){
  if(!CU)return;
  var mine=PRODS.filter(function(p){return p.by===CU.username;});
  var tb=document.getElementById('minetb');
  if(!mine.length){tb.innerHTML='<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--mt)">No products yet — add your first one!</td></tr>';return;}
  var h='';
  for(var i=0;i<mine.length;i++){
    var p=mine[i];
    h+='<tr>';
    h+='<td>'+(p.img?'<img src="'+p.img+'" class="ti" onerror="this.style.display=\'none\'">':'<span style="font-size:1.7rem">'+p.emoji+'</span>')+'</td>';
    h+='<td><strong>'+p.name+'</strong></td><td>'+p.cat+'</td><td>LKR '+p.price+'</td>';
    h+='<td><span class="'+(p.avail?'bav':'bos')+'">'+(p.avail?'Available':'Out of Stock')+'</span></td>';
    h+='<td><button class="be" onclick="openEdit('+p.id+')">✏️ Edit</button><button class="bd" onclick="delP('+p.id+',\''+p.name.replace(/\'/g,"\\'")+'\')">🗑</button></td>';
    h+='</tr>';
  }
  tb.innerHTML=h;
}

function renderAll(){
  var list=AF==='all'?PRODS:PRODS.filter(function(p){return p.cat===AF;});
  var tb=document.getElementById('alltb');
  if(!list.length){tb.innerHTML='<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--mt)">No products.</td></tr>';return;}
  var h='';
  for(var i=0;i<list.length;i++){
    var p=list[i];
    h+='<tr>';
    h+='<td>'+(p.img?'<img src="'+p.img+'" class="ti" onerror="this.style.display=\'none\'">':'<span style="font-size:1.7rem">'+p.emoji+'</span>')+'</td>';
    h+='<td><strong>'+p.name+'</strong></td><td>'+p.cat+'</td><td>LKR '+p.price+'</td>';
    h+='<td><span class="bsl">'+(p.byn||p.by)+'</span></td>';
    h+='<td><span class="'+(p.avail?'bav':'bos')+'">'+(p.avail?'Available':'Out of Stock')+'</span></td>';
    h+='<td><button class="bd" onclick="delP('+p.id+',\''+p.name.replace(/\'/g,"\\'")+'\')">🗑 Delete</button></td>';
    h+='</tr>';
  }
  tb.innerHTML=h;
}
function setAF(f,el){
  var tabs=document.querySelectorAll('#aftabs .ft');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('on');
  el.classList.add('on');AF=f;renderAll();
}

function openEdit(id){
  var p=null;
  for(var i=0;i<PRODS.length;i++){if(PRODS[i].id===id){p=PRODS[i];break;}}
  if(!p)return;
  var b=document.getElementById('ebox');
  b.style.display='block';
  b.innerHTML='<div class="pf" style="border-left:4px solid var(--gl);margin-bottom:1.2rem;">'+
    '<h3 style="font-family:\'Playfair Display\',serif;margin-bottom:.85rem;">✏️ Editing: '+p.name+'</h3>'+
    '<div class="fg2">'+
      '<div class="fi"><label>Name</label><input id="en" value="'+p.name+'"></div>'+
      '<div class="fi"><label>Category</label><select id="ec">'+
        '<option value="fruit"'+(p.cat==='fruit'?' selected':'')+'>Fruit</option>'+
        '<option value="vegetable"'+(p.cat==='vegetable'?' selected':'')+'>Vegetable</option>'+
        '<option value="seasonal"'+(p.cat==='seasonal'?' selected':'')+'>Seasonal</option>'+
      '</select></div>'+
      '<div class="fi"><label>Price (LKR)</label><input type="number" id="ep" value="'+p.price+'"></div>'+
      '<div class="fi"><label>Unit</label><input id="eu" value="'+p.unit+'"></div>'+
      '<div class="fi fw"><label>Description</label><textarea id="ed">'+p.desc+'</textarea></div>'+
      '<div class="fi"><label>Status</label><select id="es">'+
        '<option value="1"'+(p.avail?' selected':'')+'>Available</option>'+
        '<option value="0"'+(!p.avail?' selected':'')+'>Out of Stock</option>'+
      '</select></div>'+
      '<div class="fi"><label>New Image (optional)</label>'+
        '<div class="ip" id="eprev" onclick="document.getElementById(\'ef\').click()" style="height:72px">'+
          '<span id="eprevtxt">📷 Upload new image</span>'+
          '<input type="file" id="ef" accept="image/*" onchange="prevImg(this,\'eprev\',\'eprevtxt\')">'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="fa">'+
      '<button class="bs" onclick="saveEdit('+id+')">💾 Save Changes</button>'+
      '<button class="bc" onclick="closeEdit()">Cancel</button>'+
    '</div>'+
  '</div>';
  b.scrollIntoView({behavior:'smooth'});
}
function closeEdit(){var b=document.getElementById('ebox');b.style.display='none';b.innerHTML='';}
function saveEdit(id){
  var p=null;
  for(var i=0;i<PRODS.length;i++){if(PRODS[i].id===id){p=PRODS[i];break;}}
  if(!p)return;
  p.name=document.getElementById('en').value.trim();
  p.cat=document.getElementById('ec').value;
  p.price=parseInt(document.getElementById('ep').value);
  p.unit=document.getElementById('eu').value.trim();
  p.desc=document.getElementById('ed').value.trim();
  p.avail=document.getElementById('es').value==='1';
  var ni=document.getElementById('eprev').dataset.img;
  if(ni)p.img=ni;
  save();renderPub();renderMine();
  if(CU&&CU.role==='main')renderAll();
  updStats();showToast('✅ "'+p.name+'" updated!','ok');closeEdit();
}
function delP(id,name){
  if(!confirm('Delete "'+name+'"?'))return;
  var newP=[];
  for(var i=0;i<PRODS.length;i++){if(PRODS[i].id!==id)newP.push(PRODS[i]);}
  PRODS=newP;
  save();renderPub();renderMine();
  if(CU&&CU.role==='main')renderAll();
  updStats();showToast('🗑 "'+name+'" deleted.','ok');
}

// ─── ADMINS ──────────────────────────────
function createAdmin(){
  if(!CU||CU.role!=='main')return;
  var n=document.getElementById('an').value.trim();
  var c=document.getElementById('ac').value.trim();
  var di=document.getElementById('adi').value.trim();
  var to=document.getElementById('ato').value.trim();
  var vi=document.getElementById('avi').value.trim();
  var ar=document.getElementById('aar').value.trim();
  var u=document.getElementById('au').value.trim();
  var pw=document.getElementById('apw').value;
  if(!n||!u||!pw){showToast('⚠️ Name, username and password are required','er');return;}
  for(var i=0;i<ADMINS.length;i++){
    if(ADMINS[i].username===u){showToast('❌ Username already taken','er');return;}
  }
  if(u===MA.username){showToast('❌ That username is reserved','er');return;}
  ADMINS.push({id:Date.now(),name:n,contact:c,district:di,town:to,village:vi,area:ar,username:u,password:pw,role:'seller',created:(new Date()).toLocaleDateString()});
  save();renderAdmins();updStats();
  showToast('✅ Seller admin "'+n+'" created!','ok');
  clearAF();
}
function clearAF(){
  ['an','ac','adi','ato','avi','aar','au','apw'].forEach(function(id){document.getElementById(id).value='';});
}
function renderAdmins(){
  var tb=document.getElementById('admtb');
  if(!ADMINS.length){tb.innerHTML='<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--mt)">No seller admins yet. Create one above!</td></tr>';return;}
  var h='';
  for(var i=0;i<ADMINS.length;i++){
    var a=ADMINS[i];
    var cnt=0;for(var j=0;j<PRODS.length;j++){if(PRODS[j].by===a.username)cnt++;}
    h+='<tr>';
    h+='<td><strong>'+a.name+'</strong></td>';
    h+='<td><code style="background:#f0f5ee;padding:.17rem .42rem;border-radius:5px;">'+a.username+'</code></td>';
    h+='<td>'+(a.district||'—')+'</td><td>'+(a.town||'—')+'</td><td>'+(a.village||'—')+'</td>';
    h+='<td>'+(a.contact||'—')+'</td><td>'+cnt+' products</td>';
    h+='<td><button class="bd" onclick="delAdmin('+a.id+',\''+a.name.replace(/\'/g,"\\'")+'\',\''+a.username+'\')">🗑 Delete</button></td>';
    h+='</tr>';
  }
  tb.innerHTML=h;
}
function delAdmin(id,name,uname){
  if(!CU||CU.role!=='main')return;
  var cnt=0;for(var i=0;i<PRODS.length;i++){if(PRODS[i].by===uname)cnt++;}
  if(!confirm('Delete admin "'+name+'"?\nThis will also delete all '+cnt+' of their products!'))return;
  var newP=[];for(var i=0;i<PRODS.length;i++){if(PRODS[i].by!==uname)newP.push(PRODS[i]);}
  PRODS=newP;
  var newA=[];for(var i=0;i<ADMINS.length;i++){if(ADMINS[i].id!==id)newA.push(ADMINS[i]);}
  ADMINS=newA;
  save();renderAdmins();renderPub();renderAll();updStats();
  showToast('🗑 "'+name+'" and '+cnt+' products deleted.','ok');
}

// ─── PROFILE ────────────────────────────
function renderProf(){
  var isMa=CU&&CU.role==='main';
  var rows='';
  rows+=pr('👤','Name',CU.name||'—');
  rows+=pr('🔑','Username',CU.username);
  rows+=pr('🎭','Role',isMa?'Main Admin (Full Access)':'Seller Admin');
  if(CU.contact)rows+=pr('📞','Contact',CU.contact);
  if(CU.area)rows+=pr('🏪','Area',CU.area);
  if(CU.district)rows+=pr('🗺️','District',CU.district);
  if(CU.town)rows+=pr('🏙️','Town',CU.town);
  if(CU.village)rows+=pr('🏡','Village',CU.village);
  if(isMa)rows+=pr('🏪','Branches','Madampe • Chilaw • Kuliyapitiya');
  document.getElementById('profbox').innerHTML=
    '<div class="pc2">'+
      '<div class="pt">'+
        '<img src="photo.jpg" onerror="this.src=\'https://ui-avatars.com/api/?name='+encodeURIComponent(CU.name||CU.username)+'&background=1a5e2a&color=fff&size=200\'" class="pav">'+
        '<div><div class="pnm">'+(CU.name||CU.username)+'</div><div class="prl">'+(isMa?'⭐ Main Administrator — PurePick':'🌿 Seller Admin')+'</div></div>'+
      '</div>'+
      '<div class="pfs">'+rows+'</div>'+
    '</div>';
}
function pr(icon,label,val){return '<div class="pr"><div class="pic2">'+icon+'</div><div><div class="plb">'+label+'</div><div class="pvl">'+val+'</div></div></div>';}

// ─── IMAGE PREVIEW ───────────────────────
function prevImg(input,prevId,txtId){
  var file=input.files[0];if(!file)return;
  var r=new FileReader();
  r.onload=function(e){
    var prev=document.getElementById(prevId);
    var ex=prev.querySelector('img');if(ex)prev.removeChild(ex);
    var img=document.createElement('img');
    img.src=e.target.result;
    img.style.cssText='width:100%;height:100%;object-fit:cover;';
    prev.insertBefore(img,prev.querySelector('input'));
    if(txtId)document.getElementById(txtId).style.display='none';
    prev.dataset.img=e.target.result;
  };
  r.readAsDataURL(file);
}

// ─── TOAST ───────────────────────────────
function showToast(msg,type){
  var t=document.getElementById('att');
  t.textContent=msg;
  t.className=type==='er'?'er':'ok';
  t.style.display='block';
  setTimeout(function(){t.style.display='none';},3000);
}

// ─── NAVBAR SCROLL ───────────────────────
window.onscroll=function(){
  document.getElementById('nav').classList.toggle('sc',window.scrollY>20);
};

// ─── INIT ────────────────────────────────
window.onload=function(){
  load();
  renderPub();
};