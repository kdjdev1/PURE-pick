<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PurePick – Digitized Farmers Market</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
 
<!-- NAV -->
<nav id="nav">
  <span class="logo">Pure<b>Pick</b></span>
  <ul class="nl">
    <li><a href="#products">Shop</a></li>
    <li><a href="#ai">AI Advisor</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="#about">About</a></li>
  </ul>
  <a href="#products" class="nbtn">Shop Now</a>
</nav>
 
<!-- HERO -->
<section id="hero">
  <div class="hbg"></div>
  <div class="hc">
    <div class="hbdg">🌱 Sri Lanka's First Digital Farmers Market</div>
    <h1>Farm Fresh,<br><em>Delivered Smart</em></h1>
    <p class="hs">Order the freshest fruits and vegetables directly from local farmers — powered by AI for the smartest shopping experience in modern Sri Lanka.</p>
    <div class="hb">
      <a href="#products" class="b1">🛒 Browse Market</a>
      <a href="#ai" class="b2">🤖 Ask AI Advisor</a>
    </div>
    <div class="hst">
      <div><div class="hst-n" id="pcount">7+</div><div class="hst-l">Fresh Products</div></div>
      <div><div class="hst-n">50+</div><div class="hst-l">Local Farmers</div></div>
      <div><div class="hst-n">4.9★</div><div class="hst-l">Customer Rating</div></div>
    </div>
  </div>
</section>
 
<!-- SEASONAL BANNER -->
<div class="sbn">
  <span>🌾</span>
  <p>Tropical Harvest Special — Mangoes, Pineapples & King Coconuts now in peak season!</p>
  <a href="#products" class="sbna">View Seasonal</a>
</div>
 
<!-- PRODUCTS -->
<section id="products">
  <div class="ph">
    <div>
      <div class="sl">Fresh Market</div>
      <h2 class="st">Today's Harvest</h2>
      <p class="ss">Handpicked daily from farms across Sri Lanka, delivered within 24 hours.</p>
    </div>
    <div class="fts">
      <button class="ft on" onclick="filterP('all',this)">All</button>
      <button class="ft" onclick="filterP('fruit',this)">Fruits</button>
      <button class="ft" onclick="filterP('vegetable',this)">Vegetables</button>
      <button class="ft" onclick="filterP('seasonal',this)">Seasonal</button>
    </div>
  </div>
  <div class="pg" id="pg"></div>
</section>
 
<!-- AI -->
<section id="ai">
  <div class="aig">
    <div>
      <div class="sl" style="color:var(--lm)">Powered by AI</div>
      <h2 class="st" style="color:#fff">Your Smart<br>Market Advisor</h2>
      <p class="ss" style="color:rgba(255,255,255,.6);margin-bottom:1.9rem;">PurePick's AI advisor helps you choose the best produce, tracks prices, and recommends based on your recipes and diet goals.</p>
      <div class="aif">
        <div class="aifc"><div class="aifi">🔍</div><div><h4>Smart Freshness Detection</h4><p>AI flags the freshest picks each day based on harvest data.</p></div></div>
        <div class="aifc"><div class="aifi">🍽️</div><div><h4>Recipe-Based Shopping</h4><p>Tell the AI what you're cooking — it builds your ingredient list.</p></div></div>
        <div class="aifc"><div class="aifi">📊</div><div><h4>Price Trend Alerts</h4><p>AI monitors daily price changes and advises best time to buy.</p></div></div>
        <div class="aifc"><div class="aifi">🌿</div><div><h4>Nutrition Guidance</h4><p>Get AI-powered nutrition tips and healthier substitution ideas.</p></div></div>
      </div>
    </div>
    <div class="aib">
      <div class="aih"><div class="aip">🌿</div><div><div class="ain">PurePick AI Advisor</div><div class="ais">● Online & Ready</div></div></div>
      <div class="aim" id="aim"><div class="msg ai">Hello! 👋 I'm your PurePick AI advisor. Ask me about freshness, recipes, nutrition, or today's best deals!</div></div>
      <div class="aii">
        <input type="text" id="aii" placeholder="Ask about any fruit or vegetable..." onkeypress="if(event.key==='Enter')aiSend()">
        <button class="ais2" onclick="aiSend()">➤</button>
      </div>
    </div>
  </div>
</section>
 
<!-- HOW -->
<section id="how">
  <div style="text-align:center;max-width:560px;margin:0 auto 2.3rem">
    <div class="sl">Simple & Fast</div>
    <h2 class="st">Farm to Table in 4 Easy Steps</h2>
  </div>
  <div class="hwg">
    <div class="hwc"><div class="hwn">1</div><div class="hwi">🔍</div><h3>Browse Market</h3><p>Explore fresh fruits and vegetables harvested daily from trusted local farmers.</p></div>
    <div class="hwc"><div class="hwn">2</div><div class="hwi">🤖</div><h3>Ask the AI</h3><p>Use our AI advisor for personalized recommendations and freshness ratings.</p></div>
    <div class="hwc"><div class="hwn">3</div><div class="hwi">🛒</div><h3>Add & Order</h3><p>Add items to your cart and complete your order in just a few taps.</p></div>
    <div class="hwc"><div class="hwn">4</div><div class="hwi">🚚</div><h3>Fresh Delivery</h3><p>Receive farm-fresh produce at your doorstep within 24 hours — guaranteed.</p></div>
  </div>
</section>
 
<!-- TESTIMONIALS -->
<section id="testimonials">
  <div class="sl">What Customers Say</div>
  <h2 class="st">Loved by Families Across Sri Lanka</h2>
  <div class="tg">
    <div class="tc"><p class="tt">The papaya I ordered was the most vibrant, sweet one I've ever had. Arrived perfectly ripe the next morning. The AI advisor suggested pairing it with lime — brilliant!</p><div class="ta"><div class="tav">P</div><div><div class="tst">★★★★★</div><div class="tn">Priya Mendis</div><div class="tr">Home Cook, Colombo</div></div></div></div>
    <div class="tc"><p class="tt">PurePick completely changed how I source ingredients for my restaurant. Fair prices, always fresh, and the AI helps me plan menus based on what's in season.</p><div class="ta"><div class="tav">K</div><div><div class="tst">★★★★★</div><div class="tn">Kamal Jayawardena</div><div class="tr">Restaurant Owner, Kandy</div></div></div></div>
    <div class="tc"><p class="tt">As a farmer, this platform opened a whole new market for me. I now sell directly to customers at fair prices with no middlemen. PurePick truly empowers us.</p><div class="ta"><div class="tav">S</div><div><div class="tst">★★★★★</div><div class="tn">Sunil Rathnayake</div><div class="tr">Farmer, Nuwara Eliya</div></div></div></div>
  </div>
</section>
 
<!-- ABOUT -->
<section id="about">
  <div class="abg">
    <div style="display:flex;flex-direction:column;align-items:center;">
      <img src="photo.jpg" onerror="this.src='https://ui-avatars.com/api/?name=PAO+Angel&background=1a5e2a&color=fff&size=400'" alt="P.A.O. Angel" class="aph">
      <span class="apbdg">🌿 PurePick Founder</span>
    </div>
    <div>
      <div class="sl">Meet the Seller</div>
      <div class="an">P.A.O. Angel</div>
      <div class="at">Founder & Lead Seller — PurePick Digital Farmers Market</div>
      <p class="abio">Passionate about connecting Sri Lankan farmers with modern households, I built PurePick to bring the freshest fruits and vegetables to your doorstep. Based in Madampe, our roots run deep in Sri Lanka's farming heartland.</p>
      <div class="adg">
        <div class="adc"><div class="adi">👤</div><div><div class="adl">Full Name</div><div class="adv">P.A.O. Angel</div></div></div>
        <div class="adc"><div class="adi">📞</div><div><div class="adl">Contact</div><div class="adv">076 102 9880</div></div></div>
        <div class="adc"><div class="adi">📍</div><div><div class="adl">Home Area</div><div class="adv">Madampe</div></div></div>
        <div class="adc"><div class="adi">🏪</div><div><div class="adl">Branches</div><div class="adv">3 Locations</div></div></div>
      </div>
      <div style="font-size:.69rem;color:var(--mt);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.52rem;">Our Branch Locations</div>
      <div class="bts"><span class="bt">📍 Madampe</span><span class="bt">📍 Chilaw</span><span class="bt">📍 Kuliyapitiya</span></div>
    </div>
  </div>
</section>
 
<!-- FOOTER -->
<footer>
  <div class="fg">
    <div class="fb"><span class="logo flogo">Pure<b>Pick</b></span><p>Sri Lanka's premier digitized farmers market, connecting local farmers with modern households through technology and AI.</p></div>
    <div class="fc"><h4>Shop</h4><a href="#products">All Products</a><a href="#products">Fruits</a><a href="#products">Vegetables</a><a href="#products">Seasonal</a></div>
    <div class="fc"><h4>Company</h4><a href="#">About Us</a><a href="#">Our Farmers</a><a href="#">Sustainability</a><a href="#">Contact</a></div>
    <div class="fc"><h4>Admin</h4><a href="javascript:void(0)" onclick="showLogin()" style="color:var(--lm)">🔒 Admin Login</a><a href="#">Help Center</a><a href="#">Privacy Policy</a></div>
  </div>
  <div class="fb2"><p>© 2025 PurePick. All rights reserved.</p><p>Built with ♥ for fresh, local produce</p></div>
</footer>
 
<!-- TOASTS -->
<div id="ctt"></div>
<div id="att"></div>
 
<!-- LOGIN MODAL -->
<div id="lm">
  <div class="mb">
    <button class="mc" onclick="hideLogin()">✕</button>
    <div style="text-align:center;margin-bottom:1rem;">
      <div style="width:50px;height:50px;background:linear-gradient(135deg,var(--g),var(--lm));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin:0 auto .65rem;">🔐</div>
      <h2>Admin Login</h2>
      <p>PurePick Admin & Seller Access</p>
    </div>
    <input type="text" id="lu" placeholder="Username" autocomplete="off" onkeypress="if(event.key==='Enter')doLogin()">
    <input type="password" id="lp" placeholder="Password" onkeypress="if(event.key==='Enter')doLogin()">
    <button class="mlb" onclick="doLogin()">Login →</button>
    <div id="merr">❌ Incorrect username or password.</div>
  </div>
</div>
 
<!-- ════════════ DASHBOARD ════════════ -->
<div id="db">
  <div id="dnav" class="dn ma"></div>
  <div class="dbd">
    <div class="ds" id="dside"></div>
    <div class="dm">
 
      <!-- Overview -->
      <div class="dp" id="p-ov">
        <div class="dtt">Dashboard Overview</div>
        <div class="dts" id="dwel"></div>
        <div class="sc" id="dsc"></div>
        <div class="pf" style="padding:1.35rem;">
          <h3 style="font-family:'Playfair Display',serif;margin-bottom:.85rem;">📋 Summary</h3>
          <div id="dsum" style="font-size:.83rem;color:var(--mt);line-height:2.1;"></div>
        </div>
      </div>
 
      <!-- Add Product -->
      <div class="dp" id="p-add">
        <div class="dtt">Add New Product</div>
        <div class="dts">Fill in all details and save to the market.</div>
        <div class="pf">
          <div class="fg2">
            <div class="fi fw">
              <label>Product Image</label>
              <div class="ip" id="iprev" onclick="document.getElementById('ifile').click()">
                <span id="iprevtxt">📷 Click to upload image</span>
                <input type="file" id="ifile" accept="image/*" onchange="prevImg(this,'iprev','iprevtxt')">
              </div>
            </div>
            <div class="fi"><label>Product Name *</label><input type="text" id="fn" placeholder="e.g. Ripe Red Papaya"></div>
            <div class="fi"><label>Category *</label><select id="fc"><option value="fruit">Fruit</option><option value="vegetable">Vegetable</option><option value="seasonal">Seasonal</option></select></div>
            <div class="fi"><label>Price (LKR) *</label><input type="number" id="fp" placeholder="e.g. 350"></div>
            <div class="fi"><label>Unit *</label><input type="text" id="fu" placeholder="e.g. per kg"></div>
            <div class="fi fw"><label>Description *</label><textarea id="fd" placeholder="Describe the product..."></textarea></div>
            <div class="fi"><label>Availability</label><select id="fa"><option value="1">Available</option><option value="0">Out of Stock</option></select></div>
          </div>
          <div class="fa">
            <button class="bs" onclick="addProd()">✅ Add to Market</button>
            <button class="bc" onclick="clearPF()">Clear</button>
          </div>
        </div>
      </div>
 
      <!-- My Products -->
      <div class="dp" id="p-mine">
        <div class="dtt">My Products</div>
        <div class="dts">Edit or remove your products from the market.</div>
        <button class="bad" onclick="goPanel('p-add','t-add')">➕ Add New Product</button>
        <div id="ebox" style="display:none;margin-bottom:1.2rem;"></div>
        <table class="tb">
          <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="minetb"></tbody>
        </table>
      </div>
 
      <!-- All Products (main admin only) -->
      <div class="dp" id="p-all">
        <div class="dtt">🌍 All Market Products</div>
        <div class="dts">Every product from all seller admins. Only you can delete any product.</div>
        <div style="display:flex;gap:.45rem;margin-bottom:1.2rem;flex-wrap:wrap;" id="aftabs">
          <button class="ft on" onclick="setAF('all',this)" style="font-size:.77rem;">All</button>
          <button class="ft" onclick="setAF('fruit',this)" style="font-size:.77rem;">🍎 Fruits</button>
          <button class="ft" onclick="setAF('vegetable',this)" style="font-size:.77rem;">🥦 Vegetables</button>
          <button class="ft" onclick="setAF('seasonal',this)" style="font-size:.77rem;">🌾 Seasonal</button>
        </div>
        <table class="tb">
          <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Added By</th><th>Status</th><th>Delete</th></tr></thead>
          <tbody id="alltb"></tbody>
        </table>
      </div>
 
      <!-- Manage Admins (main admin only) -->
      <div class="dp" id="p-adm">
        <div class="dtt">👥 Manage Seller Admins</div>
        <div class="dts">Create and delete seller admin accounts. Only you can do this.</div>
        <div class="af">
          <h3>⭐ Create New Seller Admin Account</h3>
          <p>Fill in the details below to create a new seller admin account.</p>
          <div class="afs">👤 Personal Info</div>
          <div class="afg afg2">
            <div class="afi"><label>Full Name *</label><input type="text" id="an" placeholder="e.g. Kamal Perera"></div>
            <div class="afi"><label>Contact</label><input type="text" id="ac" placeholder="e.g. 0771234567"></div>
          </div>
          <div class="afs">📍 Location</div>
          <div class="afg afg3">
            <div class="afi"><label>District</label><input type="text" id="adi" placeholder="e.g. Puttalam"></div>
            <div class="afi"><label>Town</label><input type="text" id="ato" placeholder="e.g. Chilaw"></div>
            <div class="afi"><label>Village</label><input type="text" id="avi" placeholder="e.g. Madampe"></div>
          </div>
          <div class="afg afg2" style="margin-top:.7rem;">
            <div class="afi"><label>Area / Branch</label><input type="text" id="aar" placeholder="e.g. North Branch"></div>
          </div>
          <div class="afs">🔑 Login Credentials</div>
          <div class="afg afg2">
            <div class="afi"><label>Username *</label><input type="text" id="au" placeholder="e.g. kamal123"></div>
            <div class="afi"><label>Password *</label><input type="password" id="apw" placeholder="Set a password"></div>
          </div>
          <div class="afbt">
            <button class="afbs" onclick="createAdmin()">✅ Create Admin Account</button>
            <button class="afbc" onclick="clearAF()">Clear</button>
          </div>
        </div>
        <h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:.85rem;">Current Seller Admins</h3>
        <table class="tb">
          <thead><tr><th>Name</th><th>Username</th><th>District</th><th>Town</th><th>Village</th><th>Contact</th><th>Products</th><th>Delete</th></tr></thead>
          <tbody id="admtb"></tbody>
        </table>
      </div>
 
      <!-- Profile -->
      <div class="dp" id="p-prof">
        <div class="dtt">My Profile</div>
        <div class="dts">Your account information.</div>
        <div id="profbox"></div>
      </div>
 
    </div>
  </div>
</div>
 
<script src="app.js"></script>
</body>
</html>
 
