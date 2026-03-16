// ══════════════════════════════════════════
//  PurePick – app.js  (No Firebase)
//  All data stored in localStorage
// ══════════════════════════════════════════

// ── State ──
let CU        = null;
let PRODS     = [];
let ADMINS    = [];
let nextId    = 100;
let pubFilter = 'all';
let allFilter = 'all';

// ── Main Admin (hardcoded) ──
const MA = {
  username: 'oshan',
  password: 'oshan5555',
  name:     'P.A.O. Angel',
  role:     'main',
  area:     'Madampe',
  contact:  '076 102 9880'
};

// ── Default products ──
const DEFAULT_PRODS = [
  { name:"Ripe Red Papaya",  category:"fruit",     price:320, unit:"per kg",    desc:"Vibrant, sun-ripened Sri Lankan papaya with velvety red flesh and natural sweetness. Rich in Vitamin C and antioxidants.", emoji:"🍈", available:true,  img:"https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&q=80", addedBy:"oshan", addedByName:"P.A.O. Angel" },
  { name:"Sweet Mango",      category:"fruit",     price:480, unit:"per kg",    desc:"Juicy Willard mangoes picked at peak ripeness. Naturally sweet with golden-orange flesh and tropical aroma.",              emoji:"🥭", available:true,  img:"https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80", addedBy:"oshan", addedByName:"P.A.O. Angel" },
  { name:"King Coconut",     category:"fruit",     price:120, unit:"each",      desc:"Fresh thambili from Kelaniya farms. Packed with natural electrolytes — nature's best sports drink.",                       emoji:"🥥", available:true,  img:"https://images.unsplash.com/photo-1560637902-e019f5a8c5e7?w=600&q=80", addedBy:"oshan", addedByName:"P.A.O. Angel" },
  { name:"Garden Carrot",    category:"vegetable", price:180, unit:"per 500g",  desc:"Crisp, organically grown carrots from Nuwara Eliya. Deep orange and naturally sweet.",                                     emoji:"🥕", available:true,  img:"https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80", addedBy:"oshan", addedByName:"P.A.O. Angel" },
  { name:"Red Tomatoes",     category:"vegetable", price:140, unit:"per 500g",  desc:"Plump, vine-ripened tomatoes from Jaffna's fertile red soil. Perfect for curries and salads.",                             emoji:"🍅", available:true,  img:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80", addedBy:"oshan", addedByName:"P.A.O. Angel" },
  { name:"Fresh Pineapple",  category:"seasonal",  price:260, unit:"each",      desc:"Kew pineapples at the height of season — golden, acidic, and intensely aromatic.",                                         emoji:"🍍", available:true,  img:"https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80", addedBy:"oshan", addedByName:"P.A.O. Angel" },
  { name:"Watermelon",       category:"seasonal",  price:350, unit:"per piece", desc:"Heavy, sweet watermelons from the dry zone. Deep red flesh, extremely high water content.",                                 emoji:"🍉", available:false, img:"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80", addedBy:"oshan", addedByName:"P.A.O. Angel" },
];

// ══════════════════════════════════════════
//  LOCAL STORAGE HELPERS
// ══════════════════════════════════════════
function saveData() {
  localStorage.setItem('pp_prods',  JSON.stringify(PRODS));
  localStorage.setItem('pp_admins', JSON.stringify(ADMINS));
  localStorage.setItem('pp_nextid', JSON.stringify(nextId));
}

function loadData() {
  const p = localStorage.getItem('pp_prods');
  const a = localStorage.getItem('pp_admins');
  const n = localStorage.getItem('pp_nextid');
  if (p) PRODS   = JSON.parse(p);
  if (a) ADMINS  = JSON.parse(a);
  if (n) nextId  = JSON.parse(n);
  // Seed defaults if no products saved yet
  if (!PRODS.length) {
    PRODS = DEFAULT_PRODS.map((p, i) => ({ ...p, id: i + 1 }));
    nextId = DEFAULT_PRODS.length + 1;
    saveData();
  }
}

// ══════════════════════════════════════════
//  PUBLIC PRODUCT DISPLAY
// ══════════════════════════════════════════
window.filterProds = function(cat, el) {
  document.querySelectorAll('#products .filter-tabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  pubFilter = cat;
  renderPublic(cat);
};

function renderPublic(f) {
  const grid = document.getElementById('prod-grid');
  const list = f === 'all' ? PRODS : PRODS.filter(p => p.category === f);
  document.getElementById('pub-count').textContent = PRODS.length + '+';
  if (!list.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)"><div style="font-size:3rem;margin-bottom:1rem">🌿</div>No products yet!</div>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      ${!p.available ? '<div class="out-of-stock">Out of Stock</div>' : ''}
      <div class="product-img">
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.outerHTML='<span style=font-size:4rem;padding:2rem>${p.emoji||'🌿'}</span>'">`
          : `<span style="font-size:4rem;padding:2rem">${p.emoji || '🌿'}</span>`}
      </div>
      <div class="product-body">
        <span class="product-badge">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${(p.desc || '').substring(0, 80)}...</div>
        <div class="product-footer">
          <div>
            <span class="product-price">LKR ${p.price}</span><br>
            <span class="product-unit">${p.unit}</span>
          </div>
          <button class="add-btn" onclick="addCart('${p.name.replace(/'/g,"\\'")}')"
            ${!p.available ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>+</button>
        </div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:0.4rem;">By: ${p.addedByName || p.addedBy || 'PurePick'}</div>
      </div>
    </div>`).join('');
}

window.addCart = function(name) {
  document.getElementById('toast-txt').textContent = `${name} added to cart!`;
  const t = document.getElementById('cart-toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
};

// ══════════════════════════════════════════
//  AI CHAT
// ══════════════════════════════════════════
const AI_REPLIES = {
  papaya:    "🍈 Ripe Red Papaya is at peak freshness! Loaded with Vitamin C and papain enzymes for digestion. Try it chilled or in a smoothie!",
  mango:     "🥭 Mangoes are in full season! Willard variety is sweeter, great for smoothies. Price stable at LKR 480/kg this week.",
  tomato:    "🍅 Tomatoes are excellent value — LKR 140/500g. Jaffna-grown have more lycopene. Great for curries and chutneys.",
  carrot:    "🥕 Nuwara Eliya carrots are super fresh — high altitude gives better sweetness. Very high in beta-carotene.",
  pineapple: "🍍 Peak pineapple season! Kew variety is firm, golden, intensely aromatic. Very high in bromelain enzyme.",
  coconut:   "🥥 King Coconut (Thambili) is the best hydrator! Rich in potassium and natural electrolytes. Perfect after exercise.",
  recipe:    "🍽️ Tell me which dish you're cooking and I'll list the exact ingredients you need from PurePick!",
  fresh:     "✅ All PurePick products are harvested within 24 hours of delivery. We work with 50+ local farmers with strict freshness checks.",
  default:   "🌿 I can help with freshness, nutrition, recipes, prices and seasonal availability. What are you curious about?"
};

window.sendChat = function() {
  const input = document.getElementById('chat-in');
  const text  = input.value.trim();
  if (!text) return;
  const msgs = document.getElementById('chat-msgs');
  msgs.innerHTML += `<div class="msg user">${text}</div><div class="msg typing">PurePick AI is thinking...</div>`;
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    msgs.querySelectorAll('.typing').forEach(e => e.remove());
    const l = text.toLowerCase();
    let r = AI_REPLIES.default;
    if      (l.includes('papaya'))                          r = AI_REPLIES.papaya;
    else if (l.includes('mango'))                           r = AI_REPLIES.mango;
    else if (l.includes('tomato'))                          r = AI_REPLIES.tomato;
    else if (l.includes('carrot'))                          r = AI_REPLIES.carrot;
    else if (l.includes('pineapple'))                       r = AI_REPLIES.pineapple;
    else if (l.includes('coconut') || l.includes('thambili')) r = AI_REPLIES.coconut;
    else if (l.includes('recipe')  || l.includes('cook'))   r = AI_REPLIES.recipe;
    else if (l.includes('fresh')   || l.includes('quality')) r = AI_REPLIES.fresh;
    msgs.innerHTML += `<div class="msg ai">${r}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
};

// ══════════════════════════════════════════
//  LOGIN / LOGOUT
// ══════════════════════════════════════════
window.openLoginModal  = () => document.getElementById('login-modal').classList.add('open');
window.closeLoginModal = () => {
  document.getElementById('login-modal').classList.remove('open');
  document.getElementById('lg-err').style.display = 'none';
};

window.doLogin = function() {
  const u = document.getElementById('lg-user').value.trim();
  const p = document.getElementById('lg-pass').value;
  document.getElementById('lg-err').style.display = 'none';

  // Check main admin
  if (u === MA.username && p === MA.password) {
    CU = { ...MA };
    closeLoginModal();
    openDash();
    return;
  }

  // Check seller admins from localStorage
  const found = ADMINS.find(a => a.username === u && a.password === p);
  if (found) {
    CU = { ...found, role: 'seller' };
    closeLoginModal();
    openDash();
  } else {
    document.getElementById('lg-err').style.display = 'block';
  }
};

window.logout = function() {
  CU = null;
  document.getElementById('dashboard').classList.remove('open');
};

// ══════════════════════════════════════════
//  DASHBOARD OPEN & BUILD
// ══════════════════════════════════════════
function openDash() {
  document.getElementById('dashboard').classList.add('open');
  buildUI();
  updateStats();
  renderMyProds();
  if (CU.role === 'main') { renderAllProds(); renderAdmins(); }
  renderProfile();
  switchPanel('overview');
}

function buildUI() {
  const isMa = CU.role === 'main';

  // Nav
  document.getElementById('d-nav').className = `dash-nav ${isMa ? 'main-nav' : 'seller-nav'}`;
  document.getElementById('d-nav').innerHTML = `
    <div style="display:flex;align-items:center;gap:1rem;">
      <span class="dash-logo">Pure<span>Pick</span></span>
      <span style="background:${isMa ? 'var(--gold);color:var(--dark)' : 'rgba(255,255,255,0.18);color:white'};padding:0.3rem 0.9rem;border-radius:50px;font-size:0.72rem;font-weight:700;letter-spacing:1px;">
        ${isMa ? '⭐ MAIN ADMIN' : '🌿 SELLER ADMIN'}
      </span>
    </div>
    <div style="display:flex;align-items:center;gap:1rem;">
      <span style="font-size:0.85rem;opacity:0.8;">👤 ${CU.name || CU.username}</span>
      <button class="dash-logout" onclick="logout()">Logout ↗</button>
    </div>`;

  // Sidebar
  let sb = `
    <div style="font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin:1rem 0 0.3rem 0.5rem;font-weight:700;">General</div>
    <button class="dash-tab" id="tb-overview" onclick="switchPanel('overview')">📊 <span>Overview</span></button>
    <div style="font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin:1rem 0 0.3rem 0.5rem;font-weight:700;">Products</div>
    <button class="dash-tab" id="tb-add"    onclick="switchPanel('add')">➕ <span>Add Product</span></button>
    <button class="dash-tab" id="tb-manage" onclick="switchPanel('manage')">📦 <span>My Products</span></button>`;
  if (isMa) {
    sb += `
    <div style="font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:1rem 0 0.3rem 0.5rem;font-weight:700;">⭐ Main Admin Only</div>
    <button class="dash-tab" id="tb-all"    onclick="switchPanel('all')">🌍 <span>All Products</span></button>
    <button class="dash-tab" id="tb-admins" onclick="switchPanel('admins')">👥 <span>Manage Admins</span></button>`;
  }
  sb += `
    <div style="font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin:1rem 0 0.3rem 0.5rem;font-weight:700;">Account</div>
    <button class="dash-tab" id="tb-profile" onclick="switchPanel('profile')">👤 <span>My Profile</span></button>`;
  document.getElementById('d-sidebar').innerHTML = sb;
}

window.switchPanel = function(name) {
  document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById(`pnl-${name}`);
  const tab   = document.getElementById(`tb-${name}`);
  if (panel) panel.classList.add('active');
  if (tab)   tab.classList.add('active');
  if (name === 'manage') renderMyProds();
  if (name === 'all'    && CU?.role === 'main') renderAllProds();
  if (name === 'admins' && CU?.role === 'main') renderAdmins();
};

// ══════════════════════════════════════════
//  OVERVIEW STATS
// ══════════════════════════════════════════
function updateStats() {
  if (!CU) return;
  const mine = PRODS.filter(p => p.addedBy === CU.username);
  const isMa = CU.role === 'main';
  document.getElementById('d-stats').innerHTML = isMa ? `
    <div class="stat-card"><div class="num">${PRODS.length}</div><div class="label">Total Products</div></div>
    <div class="stat-card"><div class="num">${PRODS.filter(p => p.available).length}</div><div class="label">Available</div></div>
    <div class="stat-card"><div class="num">${PRODS.filter(p => p.category === 'fruit').length}</div><div class="label">Fruits</div></div>
    <div class="stat-card"><div class="num">${PRODS.filter(p => p.category === 'vegetable').length}</div><div class="label">Vegetables</div></div>
    <div class="stat-card"><div class="num">${PRODS.filter(p => p.category === 'seasonal').length}</div><div class="label">Seasonal</div></div>
    <div class="stat-card"><div class="num">${ADMINS.length}</div><div class="label">Seller Admins</div></div>` : `
    <div class="stat-card"><div class="num">${mine.length}</div><div class="label">My Products</div></div>
    <div class="stat-card"><div class="num">${mine.filter(p => p.available).length}</div><div class="label">Available</div></div>
    <div class="stat-card"><div class="num">${mine.filter(p => p.category === 'fruit').length}</div><div class="label">Fruits</div></div>
    <div class="stat-card"><div class="num">${mine.filter(p => p.category === 'vegetable').length}</div><div class="label">Vegetables</div></div>`;
  document.getElementById('d-welcome').textContent = `Welcome back, ${CU.name || CU.username}!`;
  document.getElementById('d-summary').innerHTML = isMa
    ? `→ ${PRODS.length} total products across all sellers<br>→ ${ADMINS.length} active seller admin accounts<br>→ ${PRODS.filter(p => p.category==='fruit').length} fruits, ${PRODS.filter(p => p.category==='vegetable').length} vegetables, ${PRODS.filter(p => p.category==='seasonal').length} seasonal<br>→ ${PRODS.filter(p => !p.available).length} products currently out of stock`
    : `→ You have ${mine.length} products in the market<br>→ ${mine.filter(p => p.available).length} available, ${mine.filter(p => !p.available).length} out of stock`;
}

// ══════════════════════════════════════════
//  ADD PRODUCT
// ══════════════════════════════════════════
window.addProduct = function() {
  const name  = document.getElementById('ap-name').value.trim();
  const cat   = document.getElementById('ap-cat').value;
  const price = parseInt(document.getElementById('ap-price').value);
  const unit  = document.getElementById('ap-unit').value.trim();
  const desc  = document.getElementById('ap-desc').value.trim();
  const avail = document.getElementById('ap-status').value === 'true';
  const img   = document.getElementById('ap-prev').dataset.img || '';
  if (!name || !price || !unit || !desc) { showToast('⚠️ Please fill all fields', 'err'); return; }
  PRODS.push({ id: nextId++, name, category: cat, price, unit, desc, available: avail, img, emoji: '🌿', addedBy: CU.username, addedByName: CU.name || CU.username });
  saveData();
  renderPublic(pubFilter);
  updateStats();
  showToast(`✅ "${name}" added to market!`);
  clearAddForm();
  switchPanel('manage');
};

window.clearAddForm = function() {
  ['ap-name','ap-price','ap-unit','ap-desc'].forEach(id => document.getElementById(id).value = '');
  const prev = document.getElementById('ap-prev');
  const img  = prev.querySelector('img');
  if (img) img.remove();
  document.getElementById('ap-prev-txt').style.display = '';
  delete prev.dataset.img;
};

// ══════════════════════════════════════════
//  MY PRODUCTS TABLE
// ══════════════════════════════════════════
function renderMyProds() {
  if (!CU) return;
  const mine  = PRODS.filter(p => p.addedBy === CU.username);
  const tbody = document.getElementById('my-tbody');
  if (!mine.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted)">No products yet — add your first one!</td></tr>';
    return;
  }
  tbody.innerHTML = mine.map(p => `<tr>
    <td>${p.img ? `<img src="${p.img}" class="td-img" onerror="this.outerHTML='<span style=font-size:1.8rem>${p.emoji||'🌿'}</span>'">` : `<span style="font-size:1.8rem">${p.emoji||'🌿'}</span>`}</td>
    <td><strong>${p.name}</strong></td>
    <td>${p.category}</td>
    <td>LKR ${p.price}</td>
    <td><span class="${p.available ? 'badge-available' : 'badge-oos'}">${p.available ? 'Available' : 'Out of Stock'}</span></td>
    <td>
      <button class="edit-btn" onclick="openEdit(${p.id})">✏️ Edit</button>
      <button class="del-btn"  onclick="delProd(${p.id},'${p.name.replace(/'/g,"\\'")}')">🗑</button>
    </td>
  </tr>`).join('');
}

// ══════════════════════════════════════════
//  ALL PRODUCTS TABLE (main admin only)
// ══════════════════════════════════════════
window.setAllFilter = function(f, el) {
  document.querySelectorAll('#all-filter-tabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  allFilter = f;
  renderAllProds();
};

function renderAllProds() {
  const list  = allFilter === 'all' ? PRODS : PRODS.filter(p => p.category === allFilter);
  const tbody = document.getElementById('all-tbody');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No products.</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(p => `<tr>
    <td>${p.img ? `<img src="${p.img}" class="td-img" onerror="this.outerHTML='<span style=font-size:1.8rem>${p.emoji||'🌿'}</span>'">` : `<span style="font-size:1.8rem">${p.emoji||'🌿'}</span>`}</td>
    <td><strong>${p.name}</strong></td>
    <td>${p.category}</td>
    <td>LKR ${p.price}</td>
    <td><span style="background:#e8f0fe;color:#1a73e8;padding:0.2rem 0.7rem;border-radius:50px;font-size:0.72rem;font-weight:700;">${p.addedByName || p.addedBy}</span></td>
    <td><span class="${p.available ? 'badge-available' : 'badge-oos'}">${p.available ? 'Available' : 'Out of Stock'}</span></td>
    <td><button class="del-btn" onclick="delProd(${p.id},'${p.name.replace(/'/g,"\\'")}')">🗑 Delete</button></td>
  </tr>`).join('');
}

// ══════════════════════════════════════════
//  EDIT PRODUCT
// ══════════════════════════════════════════
window.openEdit = function(id) {
  const p = PRODS.find(x => x.id === id);
  if (!p) return;
  const box = document.getElementById('edit-box');
  box.style.display = 'block';
  box.innerHTML = `
    <div class="product-form" style="border-left:4px solid var(--green-light);margin-bottom:1.5rem;">
      <h3 style="font-family:'Playfair Display',serif;margin-bottom:1rem;">✏️ Editing: ${p.name}</h3>
      <div class="form-grid">
        <div class="form-group"><label>Name</label><input id="e-n" value="${p.name}"></div>
        <div class="form-group"><label>Category</label>
          <select id="e-c">
            <option value="fruit"     ${p.category==='fruit'?'selected':''}>Fruit</option>
            <option value="vegetable" ${p.category==='vegetable'?'selected':''}>Vegetable</option>
            <option value="seasonal"  ${p.category==='seasonal'?'selected':''}>Seasonal</option>
          </select>
        </div>
        <div class="form-group"><label>Price (LKR)</label><input type="number" id="e-p" value="${p.price}"></div>
        <div class="form-group"><label>Unit</label><input id="e-u" value="${p.unit}"></div>
        <div class="form-group full"><label>Description</label><textarea id="e-d">${p.desc}</textarea></div>
        <div class="form-group"><label>Status</label>
          <select id="e-s">
            <option value="true"  ${p.available?'selected':''}>Available</option>
            <option value="false" ${!p.available?'selected':''}>Out of Stock</option>
          </select>
        </div>
        <div class="form-group">
          <label>New Image (optional)</label>
          <div class="img-preview" id="e-img" onclick="document.getElementById('e-f').click()" style="height:80px">
            <span id="e-img-t">📷 Upload</span>
            <input type="file" id="e-f" accept="image/*" onchange="prevImg(this,'e-img','e-img-t')">
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn-save"   onclick="saveEdit(${id})">💾 Save Changes</button>
        <button class="btn-cancel" onclick="closeEdit()">Cancel</button>
      </div>
    </div>`;
  box.scrollIntoView({ behavior: 'smooth' });
};

window.closeEdit = function() {
  document.getElementById('edit-box').style.display = 'none';
  document.getElementById('edit-box').innerHTML = '';
};

window.saveEdit = function(id) {
  const p = PRODS.find(x => x.id === id);
  if (!p) return;
  p.name      = document.getElementById('e-n').value.trim();
  p.category  = document.getElementById('e-c').value;
  p.price     = parseInt(document.getElementById('e-p').value);
  p.unit      = document.getElementById('e-u').value.trim();
  p.desc      = document.getElementById('e-d').value.trim();
  p.available = document.getElementById('e-s').value === 'true';
  const newImg = document.getElementById('e-img').dataset.img;
  if (newImg) p.img = newImg;
  saveData();
  renderPublic(pubFilter);
  renderMyProds();
  if (CU.role === 'main') renderAllProds();
  showToast(`✅ "${p.name}" updated!`);
  closeEdit();
};

window.delProd = function(id, name) {
  if (!confirm(`Delete "${name}"?`)) return;
  PRODS = PRODS.filter(x => x.id !== id);
  saveData();
  renderPublic(pubFilter);
  renderMyProds();
  if (CU?.role === 'main') renderAllProds();
  updateStats();
  showToast(`🗑 "${name}" deleted.`);
};

// ══════════════════════════════════════════
//  CREATE SELLER ADMIN (main admin only)
// ══════════════════════════════════════════
window.createAdmin = function() {
  if (CU?.role !== 'main') return;
  const name     = document.getElementById('na-name').value.trim();
  const contact  = document.getElementById('na-contact').value.trim();
  const district = document.getElementById('na-district').value.trim();
  const town     = document.getElementById('na-town').value.trim();
  const village  = document.getElementById('na-village').value.trim();
  const area     = document.getElementById('na-area').value.trim();
  const username = document.getElementById('na-user').value.trim();
  const password = document.getElementById('na-pass').value;
  if (!name || !username || !password) { showToast('⚠️ Fill name, username and password', 'err'); return; }
  if (ADMINS.find(a => a.username === username) || username === MA.username) { showToast('❌ Username already taken', 'err'); return; }
  ADMINS.push({ id: Date.now(), name, contact, district, town, village, area, username, password, role: 'seller', createdAt: new Date().toLocaleDateString() });
  saveData();
  renderAdmins();
  updateStats();
  showToast(`✅ Seller admin "${name}" created!`);
  clearAdminForm();
};

window.clearAdminForm = function() {
  ['na-name','na-contact','na-district','na-town','na-village','na-area','na-user','na-pass']
    .forEach(id => document.getElementById(id).value = '');
};

// ══════════════════════════════════════════
//  ADMINS TABLE
// ══════════════════════════════════════════
function renderAdmins() {
  const tbody = document.getElementById('admins-tbody');
  if (!ADMINS.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--muted)">No seller admins yet. Create one above!</td></tr>';
    return;
  }
  tbody.innerHTML = ADMINS.map(a => `<tr>
    <td><strong>${a.name}</strong></td>
    <td><code style="background:#f0f5ee;padding:0.2rem 0.5rem;border-radius:5px;">${a.username}</code></td>
    <td>${a.district || '—'}</td>
    <td>${a.town     || '—'}</td>
    <td>${a.village  || '—'}</td>
    <td>${a.contact  || '—'}</td>
    <td>${PRODS.filter(p => p.addedBy === a.username).length} products</td>
    <td><button class="del-btn" onclick="delAdmin(${a.id},'${a.name.replace(/'/g,"\\'")}','${a.username}')">🗑 Delete</button></td>
  </tr>`).join('');
}

window.delAdmin = function(id, name, uname) {
  if (CU?.role !== 'main') return;
  const cnt = PRODS.filter(p => p.addedBy === uname).length;
  if (!confirm(`Delete admin "${name}"?\n\nThis will also delete all ${cnt} products they added!`)) return;
  PRODS  = PRODS.filter(p => p.addedBy !== uname);
  ADMINS = ADMINS.filter(a => a.id !== id);
  saveData();
  renderAdmins();
  renderPublic(pubFilter);
  updateStats();
  showToast(`🗑 "${name}" and ${cnt} products deleted.`);
};

// ══════════════════════════════════════════
//  PROFILE PANEL
// ══════════════════════════════════════════
function renderProfile() {
  const isMa = CU?.role === 'main';
  document.getElementById('prof-content').innerHTML = `
    <div class="profile-card">
      <div class="profile-photo-section">
        <img src="photo.jpg"
             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(CU.name||CU.username)}&background=1a5e2a&color=fff&size=200'"
             alt="${CU.name}" class="profile-avatar">
        <div class="profile-name-block">
          <div class="name">${CU.name || CU.username}</div>
          <div class="role">${isMa ? '⭐ Main Administrator — PurePick' : '🌿 Seller Admin'}</div>
        </div>
      </div>
      <div class="profile-fields">
        <div class="profile-field"><div class="pf-icon">👤</div><div><div class="pf-label">Name</div><div class="pf-value">${CU.name||'—'}</div></div></div>
        <div class="profile-field"><div class="pf-icon">🔑</div><div><div class="pf-label">Username</div><div class="pf-value">${CU.username}</div></div></div>
        <div class="profile-field"><div class="pf-icon">🎭</div><div><div class="pf-label">Role</div><div class="pf-value">${isMa?'Main Admin (Full Access)':'Seller Admin'}</div></div></div>
        ${CU.area     ? `<div class="profile-field"><div class="pf-icon">🏪</div><div><div class="pf-label">Branch / Area</div><div class="pf-value">${CU.area}</div></div></div>`     : ''}
        ${CU.district ? `<div class="profile-field"><div class="pf-icon">🗺️</div><div><div class="pf-label">District</div><div class="pf-value">${CU.district}</div></div></div>`   : ''}
        ${CU.town     ? `<div class="profile-field"><div class="pf-icon">🏙️</div><div><div class="pf-label">Town</div><div class="pf-value">${CU.town}</div></div></div>`           : ''}
        ${CU.village  ? `<div class="profile-field"><div class="pf-icon">🏡</div><div><div class="pf-label">Village</div><div class="pf-value">${CU.village}</div></div></div>`     : ''}
        ${CU.contact  ? `<div class="profile-field"><div class="pf-icon">📞</div><div><div class="pf-label">Contact</div><div class="pf-value">${CU.contact}</div></div></div>`     : ''}
        ${isMa        ? `<div class="profile-field"><div class="pf-icon">🏪</div><div><div class="pf-label">Branches</div><div class="pf-value">Madampe • Chilaw • Kuliyapitiya</div></div></div>` : ''}
      </div>
    </div>`;
}

// ══════════════════════════════════════════
//  IMAGE PREVIEW
// ══════════════════════════════════════════
window.prevImg = function(input, prevId, txtId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById(prevId);
    const ex   = prev.querySelector('img');
    if (ex) ex.remove();
    const img  = document.createElement('img');
    img.src    = e.target.result;
    prev.insertBefore(img, prev.querySelector('input'));
    if (txtId) document.getElementById(txtId).style.display = 'none';
    prev.dataset.img = e.target.result;
  };
  reader.readAsDataURL(file);
};

// ══════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════
window.showToast = function(msg, type = 'ok') {
  const t = document.getElementById('app-toast');
  t.textContent = msg;
  t.className   = `success-toast${type === 'err' ? ' error-toast' : ''}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
};

// ══════════════════════════════════════════
//  NAVBAR SCROLL
// ══════════════════════════════════════════
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 20);
});

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
window.addEventListener('load', () => {
  loadData();
  renderPublic('all');
  // Hide loading screen
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) { ls.classList.add('hide'); setTimeout(() => ls.remove(), 600); }
  }, 800);
});
