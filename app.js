// PurePick - app.js
// ══════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════
var CU = null;
var PRODS = [];
var ADMINS = [];
var NID = 10;
var PF = 'all';
var AF = 'all';

var MA = { username:'oshan', password:'oshan5555', name:'P.A.O. Angel', role:'main', area:'Madampe', contact:'076 102 9880' };

var DPRODS = [
  { id:1, name:'Ripe Red Papaya',  cat:'fruit',     price:320, unit:'per kg',    desc:'Vibrant, sun-ripened Sri Lankan papaya with velvety red flesh and natural sweetness. Rich in Vitamin C.',       emoji:'🍈', avail:true,  img:'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&q=80', by:'oshan', byn:'P.A.O. Angel' },
  { id:2, name:'Sweet Mango',      cat:'fruit',     price:480, unit:'per kg',    desc:'Juicy Willard mangoes picked at peak ripeness. Naturally sweet with golden-orange flesh.',                      emoji:'🥭', avail:true,  img:'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80', by:'oshan', byn:'P.A.O. Angel' },
  { id:3, name:'King Coconut',     cat:'fruit',     price:120, unit:'each',      desc:'Fresh thambili from Kelaniya farms. Packed with natural electrolytes.',                                         emoji:'🥥', avail:true,  img:'https://images.unsplash.com/photo-1560637902-e019f5a8c5e7?w=600&q=80', by:'oshan', byn:'P.A.O. Angel' },
  { id:4, name:'Garden Carrot',    cat:'vegetable', price:180, unit:'per 500g',  desc:'Crisp, organically grown carrots from Nuwara Eliya. Deep orange and naturally sweet.',                         emoji:'🥕', avail:true,  img:'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80', by:'oshan', byn:'P.A.O. Angel' },
  { id:5, name:'Red Tomatoes',     cat:'vegetable', price:140, unit:'per 500g',  desc:'Plump, vine-ripened tomatoes from Jaffna. Perfect for curries and salads.',                                    emoji:'🍅', avail:true,  img:'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80', by:'oshan', byn:'P.A.O. Angel' },
  { id:6, name:'Fresh Pineapple',  cat:'seasonal',  price:260, unit:'each',      desc:'Kew pineapples at peak season — golden, acidic, and intensely aromatic from Kurunegala valley.',              emoji:'🍍', avail:true,  img:'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80', by:'oshan', byn:'P.A.O. Angel' },
  { id:7, name:'Watermelon',       cat:'seasonal',  price:350, unit:'per piece', desc:'Heavy, sweet watermelons from the dry zone. Deep red flesh, extremely high water content.',                    emoji:'🍉', avail:false, img:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80', by:'oshan', byn:'P.A.O. Angel' },
];

// ── localStorage ──
function save() {
  try {
    localStorage.setItem('pp_p', JSON.stringify(PRODS));
    localStorage.setItem('pp_a', JSON.stringify(ADMINS));
    localStorage.setItem('pp_n', NID);
  } catch(e){}
}
function load() {
  try {
    var p = localStorage.getItem('pp_p');
    var a = localStorage.getItem('pp_a');
    var n = localStorage.getItem('pp_n');
    if(p) PRODS  = JSON.parse(p);
    if(a) ADMINS = JSON.parse(a);
    if(n) NID    = parseInt(n);
    if(!PRODS.length){ PRODS = JSON.parse(JSON.stringify(DPRODS)); NID=10; save(); }
  } catch(e){ PRODS = JSON.parse(JSON.stringify(DPRODS)); NID=10; }
}

// ══════════════════════════════════════════
//  PUBLIC
// ══════════════════════════════════════════
function filterP(cat, el) {
  document.querySelectorAll('.ftabs .ftab').forEach(function(t){ t.classList.remove('on'); });
  el.classList.add('on');
  PF = cat;
  renderPub();
}
function renderPub() {
  var list = PF==='all' ? PRODS : PRODS.filter(function(p){ return p.cat===PF; });
  var g = document.getElementById('pgrid');
  document.getElementById('pubcount').textContent = PRODS.length + '+';
  if(!list.length){ g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)"><div style="font-size:3rem;margin-bottom:1rem">🌿</div>No products yet!</div>'; return; }
  g.innerHTML = list.map(function(p){
    return '<div class="pcard">' +
      (!p.avail ? '<div class="oos">Out of Stock</div>' : '') +
      '<div class="pimg">' + (p.img ? '<img src="'+p.img+'" alt="'+p.name+'" onerror="this.style.display=\'none\'">' : '<span style="font-size:3.5rem">'+p.emoji+'</span>') + '</div>' +
      '<div class="pbody">' +
        '<span class="pbadge">'+(p.cat.charAt(0).toUpperCase()+p.cat.slice(1))+'</span>' +
        '<div class="pname">'+p.name+'</div>' +
        '<div class="pdesc">'+p.desc.substring(0,80)+'...</div>' +
        '<div class="pfoot">' +
          '<div><span class="pprice">LKR '+p.price+'</span><br><span class="punit">'+p.unit+'</span></div>' +
          '<button class="padd" onclick="addCart(\''+p.name.replace(/'/g,"\\'")+'\')" '+(p.avail?'':'disabled style="opacity:.4;cursor:not-allowed"')+'>+</button>' +
        '</div>' +
        '<div class="pby">By: '+(p.byn||p.by||'PurePick')+'</div>' +
      '</div></div>';
  }).join('');
}

function addCart(name) {
  var t = document.getElementById('cttoast');
  t.textContent = '✅ '+name+' added to cart!';
  t.style.display = 'block';
  setTimeout(function(){ t.style.display='none'; }, 2800);
}

// ══════════════════════════════════════════
//  AI CHAT
// ══════════════════════════════════════════
var AIR = {
  papaya:'🍈 Ripe Red Papaya is at peak freshness! Loaded with Vitamin C and papain enzymes. Try it chilled or in a smoothie!',
  mango:'🥭 Mangoes are in full season! Willard variety is sweeter. Price stable at LKR 480/kg.',
  tomato:'🍅 Tomatoes at LKR 140/500g — great value. Jaffna-grown have more lycopene. Perfect for curries.',
  carrot:'🥕 Nuwara Eliya carrots are super fresh. High altitude gives better sweetness and beta-carotene.',
  pineapple:'🍍 Peak pineapple season! Kew variety is firm, golden, intensely aromatic.',
  coconut:'🥥 King Coconut is the best hydrator! Rich in potassium. Perfect after exercise.',
  recipe:'🍽️ Tell me which dish you\'re cooking and I\'ll list the ingredients from PurePick!',
  fresh:'✅ All PurePick products harvested within 24 hours. 50+ local farmers, strict freshness checks.',
  def:'🌿 I can help with freshness, nutrition, recipes, and prices. What are you curious about?'
};
function aiChat() {
  var inp = document.getElementById('aiin');
  var txt = inp.value.trim();
  if(!txt) return;
  var m = document.getElementById('aimsgs');
  m.innerHTML += '<div class="msg user">'+txt+'</div><div class="msg typing" id="ait">PurePick AI is thinking...</div>';
  inp.value=''; m.scrollTop=m.scrollHeight;
  setTimeout(function(){
    var t=document.getElementById('ait'); if(t) t.remove();
    var l=txt.toLowerCase(), r=AIR.def;
    if(l.includes('papaya')) r=AIR.papaya;
    else if(l.includes('mango')) r=AIR.mango;
    else if(l.includes('tomato')) r=AIR.tomato;
    else if(l.includes('carrot')) r=AIR.carrot;
    else if(l.includes('pineapple')) r=AIR.pineapple;
    else if(l.includes('coconut')||l.includes('thambili')) r=AIR.coconut;
    else if(l.includes('recipe')||l.includes('cook')) r=AIR.recipe;
    else if(l.includes('fresh')||l.includes('quality')) r=AIR.fresh;
    m.innerHTML+='<div class="msg ai">'+r+'</div>';
    m.scrollTop=m.scrollHeight;
  }, 1200);
}

// ══════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════
function showLogin() {
  document.getElementById('loginmodal').style.display = 'flex';
  document.getElementById('merr').style.display = 'none';
  document.getElementById('lu').value = '';
  document.getElementById('lp').value = '';
}
function hideLogin() {
  document.getElementById('loginmodal').style.display = 'none';
}
function tryLogin() {
  var u = document.getElementById('lu').value.trim();
  var p = document.getElementById('lp').value;
  document.getElementById('merr').style.display = 'none';
  if(u===MA.username && p===MA.password) {
    CU = { username:MA.username, password:MA.password, name:MA.name, role:'main', area:MA.area, contact:MA.contact };
    hideLogin();
    openDash();
    return;
  }
  var found = null;
  for(var i=0;i<ADMINS.length;i++){
    if(ADMINS[i].username===u && ADMINS[i].password===p){ found=ADMINS[i]; break; }
  }
  if(found){
    CU = { username:found.username, password:found.password, name:found.name, role:'seller', area:found.area, contact:found.contact, district:found.district, town:found.town, village:found.village };
    hideLogin();
    openDash();
  } else {
    document.getElementById('merr').style.display = 'block';
  }
}

// ══════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════
function openDash() {
  var dash = document.getElementById('dash');
  dash.style.display = 'flex';
  buildNav();
  buildSide();
  updStats();
  renderMine();
  if(CU.role==='main'){ renderAll(); renderAdmins(); }
  renderProf();
  showPanel('pov','tov');
}
function closeDash() {
  CU = null;
  document.getElementById('dash').style.display = 'none';
}

function buildNav() {
  var isMa = CU.role==='main';
  var nav = document.getElementById('dnav');
  nav.className = 'dnav '+(isMa?'main':'seller');
  nav.innerHTML =
    '<div style="display:flex;align-items:center;gap:.9rem;">' +
      '<span class="dlogo">Pure<span>Pick</span></span>' +
      '<span class="drole '+(isMa?'main':'seller')+'">'+(isMa?'⭐ MAIN ADMIN':'🌿 SELLER ADMIN')+'</span>' +
    '</div>' +
    '<div style="display:flex;align-items:center;gap:.9rem;">' +
      '<span style="font-size:.84rem;opacity:.78;">👤 '+(CU.name||CU.username)+'</span>' +
      '<button class="dout" onclick="closeDash()">Logout ↗</button>' +
    '</div>';
}

function buildSide() {
  var isMa = CU.role==='main';
  var s = '<div class="dseclbl">General</div>' +
    '<button class="dtab" id="tov" onclick="showPanel(\'pov\',\'tov\')">📊 <span>Overview</span></button>' +
    '<div class="dseclbl">Products</div>' +
    '<button class="dtab" id="tadd" onclick="showPanel(\'padd\',\'tadd\')">➕ <span>Add Product</span></button>' +
    '<button class="dtab" id="tmine" onclick="showPanel(\'pmine\',\'tmine\')">📦 <span>My Products</span></button>';
  if(isMa){
    s += '<div class="dseclbl" style="color:var(--gold)">⭐ Main Admin</div>' +
      '<button class="dtab" id="tall" onclick="showPanel(\'pall\',\'tall\')">🌍 <span>All Products</span></button>' +
      '<button class="dtab" id="tadmins" onclick="showPanel(\'padmins\',\'tadmins\')">👥 <span>Manage Admins</span></button>';
  }
  s += '<div class="dseclbl">Account</div>' +
    '<button class="dtab" id="tprof" onclick="showPanel(\'pprof\',\'tprof\')">👤 <span>Profile</span></button>';
  document.getElementById('dside').innerHTML = s;
}

function showPanel(pid, tid) {
  document.querySelectorAll('.dpanel').forEach(function(p){ p.classList.remove('on'); });
  document.querySelectorAll('.dtab').forEach(function(t){ t.classList.remove('on'); });
  var panel = document.getElementById(pid);
  var tab   = document.getElementById(tid);
  if(panel) panel.classList.add('on');
  if(tab)   tab.classList.add('on');
  if(pid==='pmine') renderMine();
  if(pid==='pall' && CU&&CU.role==='main') renderAll();
  if(pid==='padmins' && CU&&CU.role==='main') renderAdmins();
}

function updStats() {
  if(!CU) return;
  var mine = PRODS.filter(function(p){ return p.by===CU.username; });
  var isMa = CU.role==='main';
  var fruits = PRODS.filter(function(p){ return p.cat==='fruit'; }).length;
  var vegs   = PRODS.filter(function(p){ return p.cat==='vegetable'; }).length;
  var seas   = PRODS.filter(function(p){ return p.cat==='seasonal'; }).length;
  var avail  = PRODS.filter(function(p){ return p.avail; }).length;
  document.getElementById('dstats').innerHTML = isMa ?
    sc(PRODS.length,'Total Products')+sc(avail,'Available')+sc(fruits,'Fruits')+sc(vegs,'Vegetables')+sc(seas,'Seasonal')+sc(ADMINS.length,'Seller Admins') :
    sc(mine.length,'My Products')+sc(mine.filter(function(p){return p.avail;}).length,'Available')+sc(mine.filter(function(p){return p.cat==='fruit';}).length,'Fruits')+sc(mine.filter(function(p){return p.cat==='vegetable';}).length,'Vegetables');
  document.getElementById('dwelcome').textContent = 'Welcome back, '+(CU.name||CU.username)+'!';
  document.getElementById('dsum').innerHTML = isMa ?
    '→ '+PRODS.length+' total products across all sellers<br>→ '+ADMINS.length+' active seller admin accounts<br>→ '+fruits+' fruits, '+vegs+' vegetables, '+seas+' seasonal items<br>→ '+PRODS.filter(function(p){return !p.avail;}).length+' products currently out of stock' :
    '→ You have '+mine.length+' products listed<br>→ '+mine.filter(function(p){return p.avail;}).length+' available, '+mine.filter(function(p){return !p.avail;}).length+' out of stock';
}
function sc(n,l){ return '<div class="scard"><div class="n">'+n+'</div><div class="l">'+l+'</div></div>'; }

// ══════════════════════════════════════════
//  PRODUCTS CRUD
// ══════════════════════════════════════════
function addProd() {
  var n=document.getElementById('pn').value.trim();
  var c=document.getElementById('pc').value;
  var pr=parseInt(document.getElementById('pp').value);
  var u=document.getElementById('pu').value.trim();
  var d=document.getElementById('pd').value.trim();
  var av=document.getElementById('pa').value==='1';
  var img=document.getElementById('pprev').dataset.img||'';
  if(!n||!pr||!u||!d){ toast('⚠️ Please fill all required fields','err'); return; }
  PRODS.push({ id:NID++, name:n, cat:c, price:pr, unit:u, desc:d, avail:av, img:img, emoji:'🌿', by:CU.username, byn:CU.name||CU.username });
  save(); renderPub(); updStats();
  toast('✅ "'+n+'" added to market!','ok');
  clearProdForm();
  showPanel('pmine','tmine');
}
function clearProdForm() {
  ['pn','pp','pu','pd'].forEach(function(id){ document.getElementById(id).value=''; });
  var prev=document.getElementById('pprev');
  var img=prev.querySelector('img'); if(img) img.remove();
  document.getElementById('pprevtxt').style.display='';
  delete prev.dataset.img;
}
function renderMine() {
  if(!CU) return;
  var mine=PRODS.filter(function(p){ return p.by===CU.username; });
  var tb=document.getElementById('mytbody');
  if(!mine.length){ tb.innerHTML='<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted)">No products yet — add your first one!</td></tr>'; return; }
  tb.innerHTML=mine.map(function(p){
    return '<tr>'+
      '<td>'+(p.img?'<img src="'+p.img+'" class="timg" onerror="this.style.display=\'none\'">':'<span style="font-size:1.7rem">'+p.emoji+'</span>')+'</td>'+
      '<td><strong>'+p.name+'</strong></td><td>'+p.cat+'</td><td>LKR '+p.price+'</td>'+
      '<td><span class="'+(p.avail?'bav':'boos')+'">'+(p.avail?'Available':'Out of Stock')+'</span></td>'+
      '<td><button class="bedit" onclick="openEdit('+p.id+')">✏️ Edit</button><button class="bdel" onclick="delProd('+p.id+',\''+p.name.replace(/'/g,"\\'")+'\')" >🗑</button></td>'+
    '</tr>';
  }).join('');
}
function renderAll() {
  var list=AF==='all'?PRODS:PRODS.filter(function(p){ return p.cat===AF; });
  var tb=document.getElementById('alltbody');
  if(!list.length){ tb.innerHTML='<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No products.</td></tr>'; return; }
  tb.innerHTML=list.map(function(p){
    return '<tr>'+
      '<td>'+(p.img?'<img src="'+p.img+'" class="timg" onerror="this.style.display=\'none\'">':'<span style="font-size:1.7rem">'+p.emoji+'</span>')+'</td>'+
      '<td><strong>'+p.name+'</strong></td><td>'+p.cat+'</td><td>LKR '+p.price+'</td>'+
      '<td><span class="bsell">'+(p.byn||p.by)+'</span></td>'+
      '<td><span class="'+(p.avail?'bav':'boos')+'">'+(p.avail?'Available':'Out of Stock')+'</span></td>'+
      '<td><button class="bdel" onclick="delProd('+p.id+',\''+p.name.replace(/'/g,"\\'")+'\')" >🗑 Delete</button></td>'+
    '</tr>';
  }).join('');
}
function setAllF(f,el) {
  document.querySelectorAll('#allftabs .ftab').forEach(function(t){ t.classList.remove('on'); });
  el.classList.add('on'); AF=f; renderAll();
}
function openEdit(id) {
  var p=PRODS.find(function(x){ return x.id===id; });
  if(!p) return;
  var b=document.getElementById('editbox'); b.style.display='block';
  b.innerHTML='<div class="pform" style="border-left:4px solid var(--gl);margin-bottom:1.3rem;">'+
    '<h3 style="font-family:Playfair Display,serif;margin-bottom:.9rem;">✏️ Editing: '+p.name+'</h3>'+
    '<div class="fgrid">'+
      '<div class="fg"><label>Name</label><input id="en" value="'+p.name+'"></div>'+
      '<div class="fg"><label>Category</label><select id="ec"><option value="fruit"'+(p.cat==='fruit'?' selected':'')+'>Fruit</option><option value="vegetable"'+(p.cat==='vegetable'?' selected':'')+'>Vegetable</option><option value="seasonal"'+(p.cat==='seasonal'?' selected':'')+'>Seasonal</option></select></div>'+
      '<div class="fg"><label>Price (LKR)</label><input type="number" id="ep" value="'+p.price+'"></div>'+
      '<div class="fg"><label>Unit</label><input id="eu" value="'+p.unit+'"></div>'+
      '<div class="fg full"><label>Description</label><textarea id="ed">'+p.desc+'</textarea></div>'+
      '<div class="fg"><label>Status</label><select id="es"><option value="1"'+(p.avail?' selected':'')+'>Available</option><option value="0"'+(!p.avail?' selected':'')+'>Out of Stock</option></select></div>'+
      '<div class="fg"><label>New Image (optional)</label><div class="imgprev" id="eprev" onclick="document.getElementById(\'ef\').click()" style="height:75px"><span id="eprevtxt">📷 Upload</span><input type="file" id="ef" accept="image/*" onchange="prevImg(this,\'eprev\',\'eprevtxt\')"></div></div>'+
    '</div>'+
    '<div class="facts"><button class="bsave" onclick="saveEdit('+id+')">💾 Save</button><button class="bcanc" onclick="closeEdit()">Cancel</button></div>'+
  '</div>';
  b.scrollIntoView({behavior:'smooth'});
}
function closeEdit(){ var b=document.getElementById('editbox'); b.style.display='none'; b.innerHTML=''; }
function saveEdit(id) {
  var p=PRODS.find(function(x){ return x.id===id; });
  if(!p) return;
  p.name  = document.getElementById('en').value.trim();
  p.cat   = document.getElementById('ec').value;
  p.price = parseInt(document.getElementById('ep').value);
  p.unit  = document.getElementById('eu').value.trim();
  p.desc  = document.getElementById('ed').value.trim();
  p.avail = document.getElementById('es').value==='1';
  var ni  = document.getElementById('eprev').dataset.img;
  if(ni) p.img=ni;
  save(); renderPub(); renderMine();
  if(CU&&CU.role==='main') renderAll();
  updStats(); toast('✅ "'+p.name+'" updated!','ok'); closeEdit();
}
function delProd(id,name) {
  if(!confirm('Delete "'+name+'"?')) return;
  PRODS=PRODS.filter(function(x){ return x.id!==id; });
  save(); renderPub(); renderMine();
  if(CU&&CU.role==='main') renderAll();
  updStats(); toast('🗑 "'+name+'" deleted.','ok');
}

// ══════════════════════════════════════════
//  ADMINS CRUD
// ══════════════════════════════════════════
function createAdmin() {
  if(!CU||CU.role!=='main') return;
  var n=document.getElementById('an').value.trim();
  var c=document.getElementById('ac').value.trim();
  var di=document.getElementById('adi').value.trim();
  var to=document.getElementById('ato').value.trim();
  var vi=document.getElementById('avi').value.trim();
  var ar=document.getElementById('aar').value.trim();
  var u=document.getElementById('au').value.trim();
  var pw=document.getElementById('apw').value;
  if(!n||!u||!pw){ toast('⚠️ Name, username and password are required','err'); return; }
  for(var i=0;i<ADMINS.length;i++){
    if(ADMINS[i].username===u){ toast('❌ Username already taken','err'); return; }
  }
  if(u===MA.username){ toast('❌ That username is reserved','err'); return; }
  ADMINS.push({ id:Date.now(), name:n, contact:c, district:di, town:to, village:vi, area:ar, username:u, password:pw, role:'seller', created:(new Date()).toLocaleDateString() });
  save(); renderAdmins(); updStats();
  toast('✅ Seller admin "'+n+'" created!','ok');
  clearAdminForm();
}
function clearAdminForm() {
  ['an','ac','adi','ato','avi','aar','au','apw'].forEach(function(id){ document.getElementById(id).value=''; });
}
function renderAdmins() {
  var tb=document.getElementById('admintbody');
  if(!ADMINS.length){ tb.innerHTML='<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--muted)">No seller admins yet.</td></tr>'; return; }
  tb.innerHTML=ADMINS.map(function(a){
    var cnt=PRODS.filter(function(p){ return p.by===a.username; }).length;
    return '<tr>'+
      '<td><strong>'+a.name+'</strong></td>'+
      '<td><code style="background:#f0f5ee;padding:.18rem .45rem;border-radius:5px;">'+a.username+'</code></td>'+
      '<td>'+(a.district||'—')+'</td><td>'+(a.town||'—')+'</td><td>'+(a.village||'—')+'</td>'+
      '<td>'+(a.contact||'—')+'</td><td>'+cnt+' products</td>'+
      '<td><button class="bdel" onclick="delAdmin('+a.id+',\''+a.name.replace(/'/g,"\\'")+'\'  ,\''+a.username+'\')">🗑 Delete</button></td>'+
    '</tr>';
  }).join('');
}
function delAdmin(id,name,uname) {
  if(!CU||CU.role!=='main') return;
  var cnt=PRODS.filter(function(p){ return p.by===uname; }).length;
  if(!confirm('Delete admin "'+name+'"?\nThis will also delete all '+cnt+' of their products!')) return;
  PRODS  = PRODS.filter(function(p){ return p.by!==uname; });
  ADMINS = ADMINS.filter(function(a){ return a.id!==id; });
  save(); renderAdmins(); renderPub(); renderAll(); updStats();
  toast('🗑 "'+name+'" and '+cnt+' products deleted.','ok');
}

// ══════════════════════════════════════════
//  PROFILE
// ══════════════════════════════════════════
function renderProf() {
  var isMa=CU&&CU.role==='main';
  var rows='';
  rows+=prow('👤','Name',CU.name||'—');
  rows+=prow('🔑','Username',CU.username);
  rows+=prow('🎭','Role',isMa?'Main Admin (Full Access)':'Seller Admin');
  if(CU.contact)  rows+=prow('📞','Contact',CU.contact);
  if(CU.area)     rows+=prow('🏪','Area',CU.area);
  if(CU.district) rows+=prow('🗺️','District',CU.district);
  if(CU.town)     rows+=prow('🏙️','Town',CU.town);
  if(CU.village)  rows+=prow('🏡','Village',CU.village);
  if(isMa)        rows+=prow('🏪','Branches','Madampe • Chilaw • Kuliyapitiya');
  document.getElementById('profcontent').innerHTML=
    '<div class="profcard">'+
      '<div class="proftop">'+
        '<img src="photo.jpg" onerror="this.src=\'https://ui-avatars.com/api/?name='+encodeURIComponent(CU.name||CU.username)+'&background=1a5e2a&color=fff&size=200\'" class="profava">'+
        '<div><div class="profname">'+(CU.name||CU.username)+'</div><div class="profrole">'+(isMa?'⭐ Main Administrator — PurePick':'🌿 Seller Admin')+'</div></div>'+
      '</div>'+
      '<div class="proffields">'+rows+'</div>'+
    '</div>';
}
function prow(icon,label,val){ return '<div class="prow"><div class="pric">'+icon+'</div><div><div class="prlb">'+label+'</div><div class="prvl">'+val+'</div></div></div>'; }

// ══════════════════════════════════════════
//  IMAGE PREVIEW
// ══════════════════════════════════════════
function prevImg(input,prevId,txtId) {
  var file=input.files[0]; if(!file) return;
  var r=new FileReader();
  r.onload=function(e){
    var prev=document.getElementById(prevId);
    var ex=prev.querySelector('img'); if(ex) ex.remove();
    var img=document.createElement('img'); img.src=e.target.result;
    prev.insertBefore(img,prev.querySelector('input'));
    if(txtId) document.getElementById(txtId).style.display='none';
    prev.dataset.img=e.target.result;
  };
  r.readAsDataURL(file);
}

// ══════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════
function toast(msg,type) {
  var t=document.getElementById('apptoast');
  t.textContent=msg;
  t.className=type==='err'?'err':'ok';
  t.style.display='block';
  setTimeout(function(){ t.style.display='none'; },3200);
}

// ══════════════════════════════════════════
//  NAVBAR SCROLL
// ══════════════════════════════════════════
window.onscroll = function(){ document.getElementById('nav').classList.toggle('sc', window.scrollY > 20); };

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
window.onload = function(){
  load();
  renderPub();
};
