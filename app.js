// PurePick - app.js
// Customer Login + Seller Connect AI + Harvest Calendar AI + Cart + Orders + Dashboard

// ═══════════════════════════════════
//  DATA
// ═══════════════════════════════════
var CU=null, CUSTS=[], PRODS=[], ADMINS=[], ORDERS=[], CONNECTIONS=[], NID=1000;
var CART=[], PF='all', AF='all', lastOrderId='';
var MA={username:'oshan',password:'oshan5555',name:'P.A.O. Angel',role:'main',area:'Madampe',contact:'076 102 9880'};

// Default products - 50 Fruits + 50 Vegetables (price per 100kg)
var DP=[
  // ── 50 FRUITS ──
  {id:1,name:'Ripe Red Papaya',cat:'fruit',price:32000,unit:'per 100kg',desc:'Vibrant sun-ripened Sri Lankan papaya with velvety red flesh. Rich in Vitamin C and antioxidants.',emoji:'🍈',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:2,name:'Sweet Mango (Willard)',cat:'fruit',price:48000,unit:'per 100kg',desc:'Juicy Willard mangoes at peak ripeness. Naturally sweet golden-orange flesh with tropical aroma.',emoji:'🥭',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/320px-Red_Apple.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:3,name:'Banana (Ambul)',cat:'fruit',price:22000,unit:'per 100kg',desc:'Classic Sri Lankan Ambul banana. Sweet, slightly tangy flavour. Perfect for eating fresh or cooking.',emoji:'🍌',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Tres_Jolie.jpg/320px-Banana-Tres_Jolie.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:4,name:'Fresh Pineapple (Kew)',cat:'fruit',price:26000,unit:'per 100kg',desc:'Golden Kew pineapples at peak season from Kurunegala valley. Intensely aromatic.',emoji:'🍍',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/320px-Pineapple_and_cross_section.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:5,name:'Watermelon',cat:'fruit',price:15000,unit:'per 100kg',desc:'Heavy sweet watermelons from the dry zone. Deep red flesh with extremely high water content.',emoji:'🍉',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png',by:'oshan',byn:'P.A.O. Angel'},
  {id:6,name:'Passion Fruit',cat:'fruit',price:85000,unit:'per 100kg',desc:'Aromatic passion fruit from Nuwara Eliya highlands. Intense tropical flavour.',emoji:'🟣',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Passiflora_edulis_flavicarpa.jpg/320px-Passiflora_edulis_flavicarpa.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:7,name:'Avocado',cat:'fruit',price:95000,unit:'per 100kg',desc:'Creamy Sri Lankan avocados from Kandy and Badulla districts. Rich in healthy fats.',emoji:'🥑',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Avocado_on_white_background.jpg/320px-Avocado_on_white_background.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:8,name:'Guava (Pink)',cat:'fruit',price:28000,unit:'per 100kg',desc:'Sweet pink-fleshed guava from the North Western Province. Rich in Vitamin C.',emoji:'🍐',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guava_ID.jpg/320px-Guava_ID.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:9,name:'Rambutan',cat:'fruit',price:45000,unit:'per 100kg',desc:'Exotic hairy tropical fruit from Sri Lanka. Juicy white flesh with sweet refreshing taste.',emoji:'🔴',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Rambutan_edit.jpg/320px-Rambutan_edit.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:10,name:'Mangosteen',cat:'fruit',price:120000,unit:'per 100kg',desc:'The Queen of Fruits from Sri Lankan rainforests. Delicate white segments with sweet-tangy flavour.',emoji:'🟣',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Mangosteen_ENG.jpg/320px-Mangosteen_ENG.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:11,name:'Jackfruit (Kos)',cat:'fruit',price:25000,unit:'per 100kg',desc:'Giant tropical jackfruit from Sri Lankan villages. Eaten ripe or unripe in curries.',emoji:'🟡',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jackfruit_Bangladesh.jpg/320px-Jackfruit_Bangladesh.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:12,name:'Lime (Dehi)',cat:'fruit',price:38000,unit:'per 100kg',desc:'Tangy Sri Lankan lime essential for cooking. Adds bright citrus flavour to curries and sambols.',emoji:'🍋',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:13,name:'Orange (Navel)',cat:'fruit',price:55000,unit:'per 100kg',desc:'Juicy navel oranges from cooler highlands. Rich in Vitamin C. Perfect for fresh juice.',emoji:'🍊',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/320px-Oranges_and_orange_juice.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:14,name:'Grape (Red Seedless)',cat:'fruit',price:145000,unit:'per 100kg',desc:'Sweet red seedless grapes. Premium quality fruit popular for gifting and desserts.',emoji:'🍇',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-beauty-grapes.jpg/320px-24701-nature-beauty-grapes.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:15,name:'Apple (Fuji)',cat:'fruit',price:135000,unit:'per 100kg',desc:'Crisp Fuji apples with perfect sweet-tart balance. Highly popular in Sri Lankan markets.',emoji:'🍎',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/320px-Red_Apple.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:16,name:'Strawberry',cat:'fruit',price:320000,unit:'per 100kg',desc:'Fresh strawberries from Nuwara Eliya cool climate farms. Bright red, sweet and aromatic.',emoji:'🍓',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/320px-PerfectStrawberry.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:17,name:'Mango (Karuthakolomban)',cat:'fruit',price:52000,unit:'per 100kg',desc:'Traditional Sri Lankan Karuthakolomban mango. Fibreless, sweet and aromatic. Best local variety.',emoji:'🥭',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:18,name:'Soursop (Katu Anoda)',cat:'fruit',price:65000,unit:'per 100kg',desc:'Spiky tropical soursop with creamy white flesh. Sweet-sour flavour for juices.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Soursop.jpg/320px-Soursop.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:19,name:'Pomelo (Jambola)',cat:'fruit',price:40000,unit:'per 100kg',desc:'Large fragrant pomelo from the dry zone. Sweet-bitter citrus taste. Rich in antioxidants.',emoji:'🟡',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Pomelo_on_white.jpg/320px-Pomelo_on_white.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:20,name:'Lemon',cat:'fruit',price:42000,unit:'per 100kg',desc:'Fresh yellow lemons for cooking and drinks. Essential kitchen ingredient.',emoji:'🍋',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Lemon.jpg/320px-Lemon.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:21,name:'Coconut (Pol)',cat:'fruit',price:18000,unit:'per 100kg',desc:'Mature brown coconuts. Essential in Sri Lankan cooking for milk, sambol and curries.',emoji:'🥥',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/320px-Good_Food_Display_-_NCI_Visuals_Online.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:22,name:'King Coconut (Thambili)',cat:'fruit',price:24000,unit:'per 100kg',desc:'Fresh orange king coconuts. Natural electrolytes and hydration. Harvested daily.',emoji:'🥥',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/King_coconut.JPG/320px-King_coconut.JPG',by:'oshan',byn:'P.A.O. Angel'},
  {id:23,name:'Sapodilla (Sapotu)',cat:'fruit',price:55000,unit:'per 100kg',desc:'Brown caramel-sweet sapodilla. Grainy soft texture with uniquely sweet flavour.',emoji:'🟤',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Sapodilla_1.jpg/320px-Sapodilla_1.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:24,name:'Banana (Kolikuttu)',cat:'fruit',price:30000,unit:'per 100kg',desc:'Premium Kolikuttu banana — most flavourful Sri Lankan variety. Smaller and sweeter.',emoji:'🍌',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Tres_Jolie.jpg/320px-Banana-Tres_Jolie.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:25,name:'Pomegranate',cat:'fruit',price:95000,unit:'per 100kg',desc:'Ruby-red pomegranate packed with antioxidants. Juicy seeds with sweet-tart flavour.',emoji:'🔴',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pomegranate_fruit_-_single.JPG/320px-Pomegranate_fruit_-_single.JPG',by:'oshan',byn:'P.A.O. Angel'},
  {id:26,name:'Dragon Fruit (Red)',cat:'fruit',price:145000,unit:'per 100kg',desc:'Vibrant pink dragon fruit with sweet red flesh. Rich in antioxidants.',emoji:'🔴',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Beautiful_dragon_fruit.jpg/320px-Beautiful_dragon_fruit.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:27,name:'Dragon Fruit (White)',cat:'fruit',price:125000,unit:'per 100kg',desc:'White-fleshed dragon fruit with mild sweet flavour. Beautiful for fruit platters.',emoji:'⚪',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Beautiful_dragon_fruit.jpg/320px-Beautiful_dragon_fruit.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:28,name:'Custard Apple (Seetha)',cat:'fruit',price:72000,unit:'per 100kg',desc:'Creamy white custard apple with sweet fragrant flesh. Beloved Sri Lankan seasonal fruit.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Custard_apple_on_white_background.jpg/320px-Custard_apple_on_white_background.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:29,name:'Tamarind (Siyambala)',cat:'fruit',price:75000,unit:'per 100kg',desc:'Sour tamarind pods used in curries, chutneys and drinks.',emoji:'🟤',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Tamarind_-_Flickr_-_thinboyfatter.jpg/320px-Tamarind_-_Flickr_-_thinboyfatter.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:30,name:'Longan',cat:'fruit',price:85000,unit:'per 100kg',desc:'Small juicy longans with translucent white flesh. Sweet grape-like flavour.',emoji:'⚪',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Longan_-_Flickr_-_Photo_Phiend.jpg/320px-Longan_-_Flickr_-_Photo_Phiend.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:31,name:'Melon (Honeydew)',cat:'fruit',price:45000,unit:'per 100kg',desc:'Sweet pale green honeydew melon. Juicy refreshing flesh for salads and desserts.',emoji:'🍈',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Melon.jpg/320px-Melon.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:32,name:'Melon (Cantaloupe)',cat:'fruit',price:55000,unit:'per 100kg',desc:'Orange-fleshed cantaloupe melon with sweet musky aroma. Rich in beta-carotene.',emoji:'🍊',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Melon.jpg/320px-Melon.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:33,name:'Pear (Korean)',cat:'fruit',price:165000,unit:'per 100kg',desc:'Crisp juicy Korean pears. Very sweet and refreshing. Premium imported fruit.',emoji:'🍐',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pears.jpg/320px-Pears.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:34,name:'Kiwi Fruit',cat:'fruit',price:285000,unit:'per 100kg',desc:'Tangy green kiwi fruit packed with Vitamin C. Popular for desserts and fruit salads.',emoji:'🥝',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Kiwi_aka.jpg/320px-Kiwi_aka.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:35,name:'Pineapple (Queen)',cat:'fruit',price:30000,unit:'per 100kg',desc:'Smaller sweeter Queen variety pineapple. More intense flavour. Perfect for desserts.',emoji:'🍍',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/320px-Pineapple_and_cross_section.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:36,name:'Banana (Seeni Kesel)',cat:'fruit',price:35000,unit:'per 100kg',desc:'Sweet finger bananas — honey banana variety. Extremely sweet and fragrant.',emoji:'🍌',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Tres_Jolie.jpg/320px-Banana-Tres_Jolie.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:37,name:'Breadfruit (Del)',cat:'fruit',price:20000,unit:'per 100kg',desc:'Starchy breadfruit from village gardens. Used in curries and chips.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Breadfruit.jpg/320px-Breadfruit.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:38,name:'Star Fruit (Carambola)',cat:'fruit',price:48000,unit:'per 100kg',desc:'Exotic star-shaped fruit. Crisp juicy flesh with sweet-sour flavour.',emoji:'⭐',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Starfruit2.jpg/320px-Starfruit2.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:39,name:'Papaya (Green, Raw)',cat:'fruit',price:18000,unit:'per 100kg',desc:'Raw green papaya for cooking. Essential for papaya curry, salads and pickles.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:40,name:'Mango (Gira Amba)',cat:'fruit',price:42000,unit:'per 100kg',desc:'Traditional village Gira Amba mango. Fibreless sweet flesh from home gardens.',emoji:'🥭',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:41,name:'Beli Fruit (Bael)',cat:'fruit',price:58000,unit:'per 100kg',desc:'Sacred beli fruit used in Ayurvedic medicine. Famous sherbet drink across Sri Lanka.',emoji:'🟡',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bael_Fruit.jpg/320px-Bael_Fruit.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:42,name:'Wood Apple (Divul)',cat:'fruit',price:35000,unit:'per 100kg',desc:'Traditional Sri Lankan wood apple with unique tangy-sweet flavour for juices.',emoji:'🟤',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Woodapple.jpg/320px-Woodapple.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:43,name:'Durian',cat:'fruit',price:180000,unit:'per 100kg',desc:'The King of Fruits. Rich custard-like flesh with complex flavour.',emoji:'🟡',avail:false,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Durian.jpg/320px-Durian.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:44,name:'Banana (Anamalu)',cat:'fruit',price:25000,unit:'per 100kg',desc:'Large cooking banana. Used for banana chips, curries and boiled dishes.',emoji:'🍌',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Tres_Jolie.jpg/320px-Banana-Tres_Jolie.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:45,name:'Jackfruit (Young Polos)',cat:'fruit',price:18000,unit:'per 100kg',desc:'Young unripe jackfruit. Famous Sri Lankan curry ingredient. Tastes like pulled meat.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jackfruit_Bangladesh.jpg/320px-Jackfruit_Bangladesh.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:46,name:'Mango (Totapuri)',cat:'fruit',price:38000,unit:'per 100kg',desc:'Large Totapuri mangoes with firm yellow flesh. Perfect for pickles and raw salads.',emoji:'🥭',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:47,name:'Banana (Puwalu)',cat:'fruit',price:28000,unit:'per 100kg',desc:'Medicinal Puwalu banana variety. Used for digestive health.',emoji:'🍌',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Tres_Jolie.jpg/320px-Banana-Tres_Jolie.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:48,name:'Lychee',cat:'fruit',price:135000,unit:'per 100kg',desc:'Fragrant lychees with juicy translucent white flesh. Sweet floral flavour.',emoji:'🔴',avail:false,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Lychee_icecream_3.jpg/320px-Lychee_icecream_3.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:49,name:'Fig (Attikka)',cat:'fruit',price:110000,unit:'per 100kg',desc:'Fresh figs from local gardens. Sweet honey-like flavour. Rich in fibre.',emoji:'🟣',avail:false,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Figs_01_Pengo.jpg/320px-Figs_01_Pengo.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:50,name:'Coconut Young (Kurumba)',cat:'fruit',price:28000,unit:'per 100kg',desc:'Young tender king coconut with soft jelly flesh. Both water and flesh are consumed.',emoji:'🥥',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/King_coconut.JPG/320px-King_coconut.JPG',by:'oshan',byn:'P.A.O. Angel'},

  // ── 50 VEGETABLES ──
  {id:51,name:'Red Tomato',cat:'vegetable',price:14000,unit:'per 100kg',desc:'Plump vine-ripened tomatoes from Jaffna fertile red soil. Perfect for curries and salads.',emoji:'🍅',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/320px-Tomato_je.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:52,name:'Garden Carrot',cat:'vegetable',price:18000,unit:'per 100kg',desc:'Crisp organic carrots from Nuwara Eliya cool highlands. Deep orange colour and sweet.',emoji:'🥕',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetarian_bailout.jpg/320px-Vegetarian_bailout.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:53,name:'Green Cabbage',cat:'vegetable',price:12000,unit:'per 100kg',desc:'Fresh green cabbage from up-country farms. Crunchy leaves for mallum and stir-fries.',emoji:'🥬',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Chou_cabus_1.jpg/320px-Chou_cabus_1.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:54,name:'Leek',cat:'vegetable',price:22000,unit:'per 100kg',desc:'Fresh Nuwara Eliya leeks. Mild onion flavour. Essential in Sri Lankan egg hoppers.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Leeks.jpg/320px-Leeks.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:55,name:'Brinjal (Purple)',cat:'vegetable',price:16000,unit:'per 100kg',desc:'Glossy purple brinjal — most beloved Sri Lankan vegetable. Used in curries and moju.',emoji:'🍆',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Aubergine.jpg/320px-Aubergine.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:56,name:'Bitter Gourd (Karawila)',cat:'vegetable',price:20000,unit:'per 100kg',desc:'Bitter gourd famous in Sri Lankan medicine. Controls blood sugar.',emoji:'🥒',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Bittermelon.jpg/320px-Bittermelon.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:57,name:'Snake Gourd (Pathola)',cat:'vegetable',price:15000,unit:'per 100kg',desc:'Long snake gourd used in Sri Lankan curries. Light flavour, absorbs spices.',emoji:'🥒',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Trichosanthes_cucumerina1.jpg/320px-Trichosanthes_cucumerina1.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:58,name:'Ladies Fingers (Okra)',cat:'vegetable',price:18000,unit:'per 100kg',desc:'Tender okra pods with mild flavour. Used in curries and stir-fries. Rich in fibre.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Okra_2.jpg/320px-Okra_2.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:59,name:'Green Capsicum',cat:'vegetable',price:22000,unit:'per 100kg',desc:'Crisp green capsicum with mild slightly bitter flavour. Used in stir-fries.',emoji:'🫑',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Freshly_washed_and_sliced_paprika.jpg/320px-Freshly_washed_and_sliced_paprika.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:60,name:'Red Capsicum',cat:'vegetable',price:28000,unit:'per 100kg',desc:'Sweet red capsicum with vibrant colour. Richer in Vitamin C than green varieties.',emoji:'🫑',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Fresh_made_paprika.jpg/320px-Fresh_made_paprika.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:61,name:'Green Beans',cat:'vegetable',price:20000,unit:'per 100kg',desc:'Tender green beans from Nuwara Eliya. Crisp texture. Excellent stir-fried.',emoji:'🫘',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Green_beans_and_peas.jpg/320px-Green_beans_and_peas.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:62,name:'Pumpkin (Wattakka)',cat:'vegetable',price:10000,unit:'per 100kg',desc:'Sri Lankan pumpkin with sweet orange flesh. Used in creamy curries and soups.',emoji:'🎃',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/FrenchMarketPumpkinsB.jpg/320px-FrenchMarketPumpkinsB.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:63,name:'Sweet Potato',cat:'vegetable',price:14000,unit:'per 100kg',desc:'Orange-fleshed sweet potato from the dry zone. Naturally sweet.',emoji:'🟠',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ipomoea_batatas_006.jpg/320px-Ipomoea_batatas_006.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:64,name:'Potato (Up-Country)',cat:'vegetable',price:28000,unit:'per 100kg',desc:'Fresh up-country potatoes from Nuwara Eliya. Firm texture with earthy flavour.',emoji:'🥔',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Potato_and_cross_section.jpg/320px-Potato_and_cross_section.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:65,name:'Red Onion (Lunu)',cat:'vegetable',price:35000,unit:'per 100kg',desc:'Small red shallots essential in Sri Lankan cuisine. Pungent flavour base for curries.',emoji:'🧅',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Red_onion_cross_section.jpg/320px-Red_onion_cross_section.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:66,name:'White Onion (Big)',cat:'vegetable',price:28000,unit:'per 100kg',desc:'Large white onions from Matale and Dambulla regions. Milder than red onions.',emoji:'🧅',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Onions.jpg/320px-Onions.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:67,name:'Garlic',cat:'vegetable',price:65000,unit:'per 100kg',desc:'Pungent garlic from Sri Lankan farms. Essential flavour base in all Sri Lankan cooking.',emoji:'🧄',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Garlic_bulbs.jpg/320px-Garlic_bulbs.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:68,name:'Ginger (Inguru)',cat:'vegetable',price:55000,unit:'per 100kg',desc:'Fresh ginger root with strong warm flavour. Used in cooking, medicine and tea.',emoji:'🟡',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Ginger.jpg/320px-Ginger.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:69,name:'Drumstick (Murunga)',cat:'vegetable',price:24000,unit:'per 100kg',desc:'Moringa drumstick — a superfood vegetable. Used in curries. Extremely nutritious.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Moringa_stenopetala.jpg/320px-Moringa_stenopetala.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:70,name:'Gotukola (Pennywort)',cat:'vegetable',price:30000,unit:'per 100kg',desc:'Traditional Sri Lankan herb. Used fresh in sambol. Brain health superfood.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Centella_asiatica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-171.jpg/320px-Centella_asiatica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-171.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:71,name:'Spinach (Nivithi)',cat:'vegetable',price:25000,unit:'per 100kg',desc:'Tender Ceylon spinach with mild flavour. Cooked as a stir-fry with garlic.',emoji:'🥬',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Spinach_leaves.jpg/320px-Spinach_leaves.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:72,name:'Cauliflower',cat:'vegetable',price:32000,unit:'per 100kg',desc:'White cauliflower from Nuwara Eliya cool climate. Used in curries and fried snacks.',emoji:'🥦',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Cauliflower.jpg/320px-Cauliflower.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:73,name:'Broccoli',cat:'vegetable',price:48000,unit:'per 100kg',desc:'Fresh dark green broccoli from hill country farms. Nutritional powerhouse.',emoji:'🥦',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_and_cross_section_edit.jpg/320px-Broccoli_and_cross_section_edit.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:74,name:'Cucumber (Thiyambara)',cat:'vegetable',price:12000,unit:'per 100kg',desc:'Crisp fresh cucumbers. Eaten raw in salads and as a cooling snack.',emoji:'🥒',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Cucumber_-_whole_and_slice.jpg/320px-Cucumber_-_whole_and_slice.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:75,name:'Radish (Raabu)',cat:'vegetable',price:15000,unit:'per 100kg',desc:'White radish with peppery fresh flavour. Used in salads and pickles.',emoji:'⚪',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Daikon_Radish.jpg/320px-Daikon_Radish.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:76,name:'Beet Root',cat:'vegetable',price:22000,unit:'per 100kg',desc:'Deep purple beetroot with sweet earthy flavour. Used in salads and curries.',emoji:'🔴',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Beetroots.jpg/320px-Beetroots.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:77,name:'Corn (Maize)',cat:'vegetable',price:20000,unit:'per 100kg',desc:'Fresh sweet corn on the cob. Grilled, boiled or made into corn curry.',emoji:'🌽',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Maiz_de_la_desgranadora.jpg/320px-Maiz_de_la_desgranadora.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:78,name:'Spring Onion',cat:'vegetable',price:30000,unit:'per 100kg',desc:'Fresh spring onions with mild flavour. Used as garnish and in fried rice.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Chives-Bundle.jpg/320px-Chives-Bundle.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:79,name:'Celery',cat:'vegetable',price:45000,unit:'per 100kg',desc:'Crisp celery stalks from highland farms. Used in soups and stir-fries.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/CeleriacYoungerPlant.jpg/320px-CeleriacYoungerPlant.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:80,name:'Lettuce (Iceberg)',cat:'vegetable',price:35000,unit:'per 100kg',desc:'Crisp iceberg lettuce from Nuwara Eliya. Perfect for salads and wraps.',emoji:'🥬',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Iceberg_lettuce_leaf.jpg/320px-Iceberg_lettuce_leaf.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:81,name:'Green Chilli (Miris)',cat:'vegetable',price:28000,unit:'per 100kg',desc:'Fresh hot green chillies. Essential spice in Sri Lankan cooking.',emoji:'🌶️',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Chilli_Pepper_2007.jpg/320px-Chilli_Pepper_2007.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:82,name:'Red Chilli (Rathu Miris)',cat:'vegetable',price:35000,unit:'per 100kg',desc:'Fiery red chillies used fresh and dried. The colour and heat of Sri Lankan curries.',emoji:'🌶️',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/CayennePepperRipe.jpg/320px-CayennePepperRipe.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:83,name:'Ash Gourd (Ash Puhul)',cat:'vegetable',price:10000,unit:'per 100kg',desc:'Large waxy ash gourd used in curries. A popular Ayurvedic cooling drink.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Benincasa_hispida0.jpg/320px-Benincasa_hispida0.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:84,name:'Ridge Gourd (Watakolu)',cat:'vegetable',price:14000,unit:'per 100kg',desc:'Ridged gourd with spongy texture. Used in curries with coconut milk.',emoji:'🥒',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Luffa_fruit_top.jpg/320px-Luffa_fruit_top.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:85,name:'Yam (Kesavelu)',cat:'vegetable',price:28000,unit:'per 100kg',desc:'Sri Lankan yam with starchy firm flesh. Boiled, curried or made into chips.',emoji:'🟤',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/YamsatBrixtonMarket.jpg/320px-YamsatBrixtonMarket.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:86,name:'Cassava (Manioc)',cat:'vegetable',price:12000,unit:'per 100kg',desc:'Starchy cassava root. Boiled with sambol, fried as chips or made into flour.',emoji:'🟤',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tapioca_ap.jpg/320px-Tapioca_ap.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:87,name:'Banana Flower (Kesel Muwa)',cat:'vegetable',price:20000,unit:'per 100kg',desc:'Fresh banana flower used as a vegetable. Made into curries and stir-fries.',emoji:'🌸',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Banana_flower.jpg/320px-Banana_flower.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:88,name:'Curry Leaves (Karapincha)',cat:'vegetable',price:45000,unit:'per 100kg',desc:'Fresh aromatic curry leaves. Essential flavour in Sri Lankan tempering.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Murraya_koenigii.jpg/320px-Murraya_koenigii.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:89,name:'Lemongrass (Sera)',cat:'vegetable',price:35000,unit:'per 100kg',desc:'Fresh lemongrass with citrus fragrance. Used in curries, teas and herbal remedies.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Lemongrass.jpg/320px-Lemongrass.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:90,name:'White Brinjal',cat:'vegetable',price:20000,unit:'per 100kg',desc:'White variety brinjal with milder flavour. Used in curries and pickled moju.',emoji:'⚪',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Aubergine.jpg/320px-Aubergine.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:91,name:'Chayote (Seeni Maththa)',cat:'vegetable',price:16000,unit:'per 100kg',desc:'Light green chayote squash from highland farms. Mild flavour in curries.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Chayote_-_cross_section.jpg/320px-Chayote_-_cross_section.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:92,name:'Long Beans',cat:'vegetable',price:18000,unit:'per 100kg',desc:'Long yard-long beans from Sri Lankan gardens. Used in stir-fries and curries.',emoji:'🫘',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Green_beans_and_peas.jpg/320px-Green_beans_and_peas.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:93,name:'Kohlrabi (Knol Khol)',cat:'vegetable',price:18000,unit:'per 100kg',desc:'Mild sweet kohlrabi from up-country farms. Used in salads and stir-fries.',emoji:'🟣',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kohlrabi_2.jpg/320px-Kohlrabi_2.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:94,name:'Mukunuwenna',cat:'vegetable',price:28000,unit:'per 100kg',desc:'Traditional Sri Lankan green herb. Used in sambol and stir-fries.',emoji:'🌿',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Spinach_leaves.jpg/320px-Spinach_leaves.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:95,name:'Ash Plantain (Alu Kesel)',cat:'vegetable',price:16000,unit:'per 100kg',desc:'Raw ash plantain cooked as a vegetable in Sri Lankan curries. Starchy flavour.',emoji:'🍌',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Tres_Jolie.jpg/320px-Banana-Tres_Jolie.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:96,name:'Kangkung (Water Spinach)',cat:'vegetable',price:18000,unit:'per 100kg',desc:'Aquatic kangkung greens. Used in stir-fries with spices and coconut.',emoji:'🥬',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Spinach_leaves.jpg/320px-Spinach_leaves.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:97,name:'Cluster Beans (Kassoali)',cat:'vegetable',price:22000,unit:'per 100kg',desc:'Bitter cluster beans used in traditional Sri Lankan side dishes.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Green_beans_and_peas.jpg/320px-Green_beans_and_peas.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:98,name:'Winged Bean (Dambala)',cat:'vegetable',price:25000,unit:'per 100kg',desc:'Unique winged bean with frilly edges. Entire plant is edible. Mild flavour.',emoji:'🫘',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Winged_bean.jpg/320px-Winged_bean.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:99,name:'Young Breadfruit',cat:'vegetable',price:15000,unit:'per 100kg',desc:'Young unripe breadfruit used as a vegetable. Starchy texture similar to potato.',emoji:'🟢',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Breadfruit.jpg/320px-Breadfruit.jpg',by:'oshan',byn:'P.A.O. Angel'},
  {id:100,name:'Jackfruit (Semi-ripe)',cat:'vegetable',price:22000,unit:'per 100kg',desc:'Semi-ripe jackfruit used as a vegetable. Middle stage between polos and ripe.',emoji:'🟡',avail:true,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jackfruit_Bangladesh.jpg/320px-Jackfruit_Bangladesh.jpg',by:'oshan',byn:'P.A.O. Angel'},
];
// ═══════════════════════════════════
//  FIREBASE CONFIG
// ═══════════════════════════════════
var FB_URL='https://purepick-cdae5-default-rtdb.asia-southeast1.firebasedatabase.app';
function fbSet(path,data){return fetch(FB_URL+'/'+path+'.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(function(){});}
function fbGet(path){return fetch(FB_URL+'/'+path+'.json').then(function(r){return r.json();}).catch(function(){return null;});}

// ═══════════════════════════════════
//  STORAGE — Firebase + localStorage backup
// ═══════════════════════════════════
function save(){
  try{
    var custom=PRODS.filter(function(p){return p.id>=1000;});
    var edits={};
    for(var i=0;i<PRODS.length;i++){
      if(PRODS[i].id<1000){
        edits[PRODS[i].id]={name:PRODS[i].name,price:PRODS[i].price,avail:PRODS[i].avail,desc:PRODS[i].desc,img:PRODS[i].img,unit:PRODS[i].unit,cat:PRODS[i].cat};
      }
    }
    // Save to Firebase
    fbSet('custom_products',custom.length?custom:null);
    fbSet('product_edits',edits);
    fbSet('admins',ADMINS.length?ADMINS:null);
    fbSet('orders',ORDERS.length?ORDERS:null);
    fbSet('customers',CUSTS.length?CUSTS:null);
    fbSet('connections',CONNECTIONS.length?CONNECTIONS:null);
    fbSet('nid',NID);
    // Backup to localStorage
    localStorage.setItem('pp_custom',JSON.stringify(custom));
    localStorage.setItem('pp_edits',JSON.stringify(edits));
    localStorage.setItem('pp_a',JSON.stringify(ADMINS));
    localStorage.setItem('pp_o',JSON.stringify(ORDERS));
    localStorage.setItem('pp_c',JSON.stringify(CUSTS));
    localStorage.setItem('pp_cn',JSON.stringify(CONNECTIONS));
    localStorage.setItem('pp_n',NID);
  }catch(e){}
}

function applyLoadedData(custom,editsRaw,admins,orders,custs,conns,nid){
  function toArr(x){if(!x)return[];if(Array.isArray(x))return x.filter(Boolean);if(typeof x==='object')return Object.values(x).filter(Boolean);return[];}
  ADMINS=toArr(admins); ORDERS=toArr(orders); CUSTS=toArr(custs); CONNECTIONS=toArr(conns);
  if(nid&&nid>=1000)NID=nid; if(NID<1000)NID=1000;
  PRODS=JSON.parse(JSON.stringify(DP));
  // Apply edits to default products
  if(editsRaw&&typeof editsRaw==='object'){
    for(var i=0;i<PRODS.length;i++){
      var e=editsRaw[PRODS[i].id];
      if(e){
        if(e.name!==undefined)PRODS[i].name=e.name;
        if(e.price!==undefined)PRODS[i].price=e.price;
        if(e.avail!==undefined)PRODS[i].avail=e.avail;
        if(e.desc!==undefined)PRODS[i].desc=e.desc;
        if(e.img!==undefined)PRODS[i].img=e.img;
        if(e.unit!==undefined)PRODS[i].unit=e.unit;
        if(e.cat!==undefined)PRODS[i].cat=e.cat;
      }
    }
  }
  // Add custom admin products
  var cp=toArr(custom);
  for(var j=0;j<cp.length;j++) PRODS.push(cp[j]);
}

function loadFromLocal(){
  try{
    var a=localStorage.getItem('pp_a'),o=localStorage.getItem('pp_o'),
        c=localStorage.getItem('pp_c'),cn=localStorage.getItem('pp_cn'),
        n=localStorage.getItem('pp_n'),cp=localStorage.getItem('pp_custom'),
        ed=localStorage.getItem('pp_edits');
    applyLoadedData(cp?JSON.parse(cp):null,ed?JSON.parse(ed):null,
      a?JSON.parse(a):null,o?JSON.parse(o):null,
      c?JSON.parse(c):null,cn?JSON.parse(cn):null,n?parseInt(n):1000);
  }catch(ex){PRODS=JSON.parse(JSON.stringify(DP));NID=1000;}
}

function load(){
  var pg=document.getElementById('pg');
  if(pg)pg.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--mt)"><div style="font-size:2.5rem;margin-bottom:1rem">🔄</div><p style="font-size:.95rem;">Loading products from cloud database...</p></div>';
  Promise.all([
    fbGet('custom_products'),fbGet('product_edits'),fbGet('admins'),
    fbGet('orders'),fbGet('customers'),fbGet('connections'),fbGet('nid')
  ]).then(function(r){
    applyLoadedData(r[0],r[1],r[2],r[3],r[4],r[5],r[6]);
    renderPub();updateCartBadge();buildHarvestCalendar();updateCustNav();
  }).catch(function(){
    loadFromLocal();
    renderPub();updateCartBadge();buildHarvestCalendar();updateCustNav();
  });
}
// ═══════════════════════════════════
//  SEARCH + FILTER
// ═══════════════════════════════════
function updatePriceLabel(){
  var v=parseInt(document.getElementById('price-range').value);
  document.getElementById('price-label').textContent='LKR '+v.toLocaleString();
}
function filterP(cat,el){
  var tabs=document.querySelectorAll('.fts .ft');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('on');
  el.classList.add('on'); PF=cat; renderPub();
}
function renderPub(){
  var search=document.getElementById('search-input').value.toLowerCase().trim();
  var maxP=parseInt(document.getElementById('price-range').value);
  var sort=document.getElementById('sort-sel').value;
  var list=PRODS.filter(function(p){
    return (PF==='all'||p.cat===PF)&&
           (!search||p.name.toLowerCase().indexOf(search)>=0||p.cat.toLowerCase().indexOf(search)>=0)&&
           p.price<=maxP;
  });
  if(sort==='price-asc') list.sort(function(a,b){return a.price-b.price;});
  else if(sort==='price-desc') list.sort(function(a,b){return b.price-a.price;});
  else if(sort==='name-asc') list.sort(function(a,b){return a.name.localeCompare(b.name);});
  var g=document.getElementById('pg');
  document.getElementById('pcount').textContent=PRODS.length+'+';
  if(!list.length){g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--mt)"><div style="font-size:3rem;margin-bottom:1rem">🔍</div>No products match your search.</div>';return;}
  var h='';
  for(var i=0;i<list.length;i++){
    var p=list[i], cat=p.cat.charAt(0).toUpperCase()+p.cat.slice(1);
    h+='<div class="pc">';
    if(!p.avail) h+='<div class="oos">Out of Stock</div>';
    h+='<div class="pi">'+(p.img?'<img src="'+p.img+'" alt="'+p.name+'" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display=\'none\'">':'<span style="font-size:3.5rem">'+p.emoji+'</span>')+'</div>';
    h+='<div class="pb"><span class="pbdg">'+cat+'</span><div class="pn">'+p.name+'</div><div class="pd">'+p.desc.substring(0,82)+'...</div>';
    h+='<div class="pf"><div><span class="pp">LKR '+p.price+'</span><br><span class="pu">'+p.unit+'</span></div>';
    if(p.avail) h+='<button class="pa" onclick="addToCart('+p.id+')">+</button>';
    else h+='<button class="pa" disabled style="opacity:.4;cursor:not-allowed">+</button>';
    h+='</div><div style="font-size:.69rem;color:var(--mt);margin-top:.32rem;">By: '+(p.byn||p.by||'PurePick')+'</div></div></div>';
  }
  g.innerHTML=h;
}

// ═══════════════════════════════════
//  CART
// ═══════════════════════════════════
function addToCart(id){
  var prod=null;
  for(var i=0;i<PRODS.length;i++){if(PRODS[i].id===id){prod=PRODS[i];break;}}
  if(!prod||!prod.avail)return;
  var ex=null;
  for(var i=0;i<CART.length;i++){if(CART[i].id===id){ex=CART[i];break;}}
  if(ex) ex.qty++;
  else CART.push({id:prod.id,name:prod.name,price:prod.price,unit:prod.unit,img:prod.img,emoji:prod.emoji,qty:1});
  updateCartBadge(); renderCart();
  showToast('✅ '+prod.name+' added to cart!','ok');
}
function removeFromCart(id){
  var n=[];for(var i=0;i<CART.length;i++){if(CART[i].id!==id)n.push(CART[i]);}
  CART=n; updateCartBadge(); renderCart();
}
function changeQty(id,d){
  for(var i=0;i<CART.length;i++){
    if(CART[i].id===id){
      CART[i].qty+=d;
      if(CART[i].qty<=0) removeFromCart(id);
      else{updateCartBadge();renderCart();}
      return;
    }
  }
}
function cartTotal(){var t=0;for(var i=0;i<CART.length;i++)t+=CART[i].price*CART[i].qty;return t;}
function updateCartBadge(){
  var t=0;for(var i=0;i<CART.length;i++)t+=CART[i].qty;
  var b=document.getElementById('cart-badge');
  b.textContent=t; b.style.display=t>0?'flex':'none';
}
function renderCart(){
  var box=document.getElementById('cart-items'),footer=document.getElementById('cart-footer');
  if(!CART.length){
    box.innerHTML='<div class="cart-empty"><div>🛒</div><p>Your cart is empty</p></div>';
    footer.style.display='none';return;
  }
  var h='';
  for(var i=0;i<CART.length;i++){
    var c=CART[i];
    h+='<div class="ci"><div class="ci-img">'+(c.img?'<img src="'+c.img+'" onerror="this.style.display=\'none\'">':'<span>'+c.emoji+'</span>')+'</div>';
    h+='<div class="ci-info"><div class="ci-name">'+c.name+'</div><div class="ci-price">LKR '+(c.price*c.qty)+' ('+c.qty+'×'+c.price+')</div>';
    h+='<div class="ci-qty"><button class="qty-btn" onclick="changeQty('+c.id+',-1)">−</button><span class="qty-num">'+c.qty+'</span><button class="qty-btn" onclick="changeQty('+c.id+',1)">+</button></div>';
    h+='</div><button class="ci-del" onclick="removeFromCart('+c.id+')">🗑</button></div>';
  }
  box.innerHTML=h;
  document.getElementById('cart-total').textContent='LKR '+cartTotal();
  footer.style.display='block';
}
function toggleCart(){
  var cp=document.getElementById('cart-panel'),ov=document.getElementById('overlay');
  if(cp.classList.contains('open')){cp.classList.remove('open');ov.style.display='none';}
  else{renderCart();cp.classList.add('open');ov.style.display='block';}
}
function closeCart(){
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('overlay').style.display='none';
}

// ═══════════════════════════════════
//  CHECKOUT
// ═══════════════════════════════════
function openCheckout(){
  if(!CART.length)return;
  closeCart();
  var sum='';
  for(var i=0;i<CART.length;i++) sum+='<div class="os-item"><span>'+CART[i].name+' ×'+CART[i].qty+'</span><span>LKR '+(CART[i].price*CART[i].qty)+'</span></div>';
  sum+='<div class="os-total"><span>Total</span><span>LKR '+cartTotal()+'</span></div>';
  document.getElementById('chk-summary').innerHTML=sum;
  // Pre-fill if customer logged in
  if(CU&&CU.type==='customer'){
    document.getElementById('chk-name').value=CU.name||'';
    document.getElementById('chk-phone').value=CU.phone||'';
  }
  document.getElementById('checkout-modal').style.display='flex';
}
function closeCheckout(){document.getElementById('checkout-modal').style.display='none';}
function placeOrder(){
  var name=document.getElementById('chk-name').value.trim();
  var phone=document.getElementById('chk-phone').value.trim();
  var addr=document.getElementById('chk-addr').value.trim();
  if(!name||!phone||!addr){showToast('⚠️ Please fill name, phone and address','er');return;}
  var oid='PP-'+Math.floor(10000+Math.random()*90000);
  var order={
    id:oid,name:name,phone:phone,address:addr,
    zone:document.getElementById('chk-zone').value,
    payment:document.getElementById('chk-pay').value,
    note:document.getElementById('chk-note').value,
    items:JSON.parse(JSON.stringify(CART)),
    total:cartTotal(),status:'Pending',
    date:(new Date()).toLocaleString(),
    custPhone:CU&&CU.type==='customer'?CU.phone:''
  };
  ORDERS.push(order); save();
  CART=[]; updateCartBadge(); renderCart(); closeCheckout();
  lastOrderId=oid;
  document.getElementById('order-id-display').textContent=oid;
  document.getElementById('order-success').style.display='flex';
  ['chk-name','chk-phone','chk-addr','chk-note'].forEach(function(id){document.getElementById(id).value='';});
  if(CU&&CU.role) renderOrdersTable();
  // Send WhatsApp notification
  sendWhatsAppNotification(order);
}

function sendWhatsAppNotification(order){
  var waNum = localStorage.getItem('pp_wa_num') || '94761029880';
  var itemsList = order.items.map(function(it){return it.name+' x'+it.qty;}).join(', ');
  var msg =
    '🛒 *NEW ORDER - PurePick*\n\n' +
    '🆔 Order ID: '+order.id+'\n' +
    '👤 Customer: '+order.name+'\n' +
    '📞 Phone: '+order.phone+'\n' +
    '📍 Address: '+order.address+'\n' +
    '🚚 Zone: '+order.zone+'\n' +
    '💳 Payment: '+order.payment+'\n\n' +
    '🧺 *Items:*\n'+itemsList+'\n\n' +
    '💰 *Total: LKR '+order.total+'*\n' +
    '📅 Date: '+order.date+'\n' +
    (order.note ? '📝 Note: '+order.note+'\n' : '') +
    '\n_Sent via PurePick_';
  var encoded = encodeURIComponent(msg);
  var waUrl = 'https://wa.me/'+waNum+'?text='+encoded;
  // Show WhatsApp popup
  document.getElementById('wa-order-id').textContent = order.id;
  document.getElementById('wa-send-btn').onclick = function(){ window.open(waUrl,'_blank'); closeWaPopup(); };
  document.getElementById('wa-popup').style.display = 'flex';
}
function closeWaPopup(){ document.getElementById('wa-popup').style.display='none'; }
function closeOrderSuccess(){document.getElementById('order-success').style.display='none';}
function goTrackOrder(){closeOrderSuccess();document.getElementById('trk-input').value=lastOrderId;showTracking();trackOrder();}

// ═══════════════════════════════════
//  ORDER TRACKING
// ═══════════════════════════════════
function showTracking(){document.getElementById('tracking-modal').style.display='flex';document.getElementById('trk-result').style.display='none';}
function closeTracking(){document.getElementById('tracking-modal').style.display='none';}
function trackOrder(){
  var id=document.getElementById('trk-input').value.trim().toUpperCase();
  var result=document.getElementById('trk-result');
  var order=null;for(var i=0;i<ORDERS.length;i++){if(ORDERS[i].id===id){order=ORDERS[i];break;}}
  if(!order){result.style.display='block';result.innerHTML='<div style="text-align:center;padding:2rem;color:var(--mt)"><div style="font-size:3rem;margin-bottom:1rem">🔍</div><p>Order not found.</p></div>';return;}
  var steps=[
    {icon:'✅',label:'Order Placed',desc:'Order received on '+order.date},
    {icon:'⚙️',label:'Processing',desc:'Preparing your fresh produce'},
    {icon:'📦',label:'Packed & Ready',desc:'Order packed and ready for delivery'},
    {icon:'🚚',label:'Out for Delivery',desc:'Your order is on its way'},
    {icon:'🏠',label:'Delivered',desc:'Order delivered successfully'},
  ];
  var sm={'Pending':0,'Processing':1,'Packed':2,'Out for Delivery':3,'Delivered':4};
  var cs=sm[order.status]||0;
  var sh='';
  for(var i=0;i<steps.length;i++){
    var cls=i<cs?'done':i===cs?'active':'pending';
    sh+='<div class="trk-step"><div class="trk-dot '+cls+'">'+steps[i].icon+'</div><div class="trk-step-info"><h4>'+steps[i].label+'</h4><p>'+steps[i].desc+'</p></div></div>';
  }
  result.style.display='block';
  result.innerHTML='<div class="trk-order-info">'+
    '<div class="trk-info-row"><span class="trk-info-label">Order ID</span><span class="trk-info-val">'+order.id+'</span></div>'+
    '<div class="trk-info-row"><span class="trk-info-label">Customer</span><span class="trk-info-val">'+order.name+'</span></div>'+
    '<div class="trk-info-row"><span class="trk-info-label">Zone</span><span class="trk-info-val">'+order.zone+'</span></div>'+
    '<div class="trk-info-row"><span class="trk-info-label">Total</span><span class="trk-info-val" style="color:var(--g);font-size:1rem;">LKR '+order.total+'</span></div>'+
    '<div class="trk-info-row"><span class="trk-info-label">Status</span><span class="trk-info-val"><span class="ord-status '+(order.status==='Delivered'?'delivered':order.status==='Pending'?'pending':'processing')+'">'+order.status+'</span></span></div>'+
    '</div><h4 style="font-size:.85rem;margin-bottom:.9rem;color:var(--mt);">DELIVERY PROGRESS</h4>'+
    '<div class="trk-steps">'+sh+'</div>';
}

// ═══════════════════════════════════
//  CUSTOMER LOGIN / REGISTER
// ═══════════════════════════════════
function showCustLogin(){
  document.getElementById('cust-modal').style.display='flex';
  document.getElementById('cl-err').style.display='none';
  document.getElementById('cr-err').style.display='none';
  switchCustTab('login');
}
function hideCustLogin(){document.getElementById('cust-modal').style.display='none';}
function switchCustTab(tab){
  var isLogin=tab==='login';
  document.getElementById('cust-login-form').style.display=isLogin?'block':'none';
  document.getElementById('cust-register-form').style.display=isLogin?'none':'block';
  document.getElementById('tab-login').style.background=isLogin?'var(--g)':'none';
  document.getElementById('tab-login').style.color=isLogin?'#fff':'var(--g)';
  document.getElementById('tab-register').style.background=isLogin?'none':'var(--g)';
  document.getElementById('tab-register').style.color=isLogin?'var(--g)':'#fff';
}
function custLogin(){
  var phone=document.getElementById('cl-phone').value.trim();
  var name=document.getElementById('cl-name').value.trim();
  var found=null;
  for(var i=0;i<CUSTS.length;i++){
    if(CUSTS[i].phone===phone&&CUSTS[i].name.toLowerCase()===name.toLowerCase()){found=CUSTS[i];break;}
  }
  if(found){
    CU={type:'customer',name:found.name,village:found.village,phone:found.phone};
    hideCustLogin();
    updateCustNav();
    showToast('👋 Welcome back, '+found.name+'!','ok');
  } else {
    document.getElementById('cl-err').style.display='block';
  }
}
function custRegister(){
  var name=document.getElementById('cr-name').value.trim();
  var village=document.getElementById('cr-village').value.trim();
  var phone=document.getElementById('cr-phone').value.trim();
  var err=document.getElementById('cr-err');
  if(!name||!village||!phone){err.style.display='block';err.textContent='❌ Please fill all fields.';return;}
  for(var i=0;i<CUSTS.length;i++){
    if(CUSTS[i].phone===phone){err.style.display='block';err.textContent='❌ This phone number is already registered.';return;}
  }
  var cust={id:Date.now(),name:name,village:village,phone:phone,joined:(new Date()).toLocaleDateString()};
  CUSTS.push(cust); save();
  CU={type:'customer',name:name,village:village,phone:phone};
  hideCustLogin();
  updateCustNav();
  showToast('🎉 Account created! Welcome, '+name+'!','ok');
}
function updateCustNav(){
  var btn=document.getElementById('cust-nav-btn');
  if(CU&&CU.type==='customer'){
    btn.textContent='👤 '+CU.name.split(' ')[0];
    btn.classList.add('logged');
    btn.onclick=custLogout;
    document.getElementById('connect-login-hint').style.display='none';
  } else {
    btn.textContent='👤 Login';
    btn.classList.remove('logged');
    btn.onclick=showCustLogin;
    document.getElementById('connect-login-hint').style.display='block';
  }
}
function custLogout(){
  if(CU&&CU.type==='customer'){
    CU=null; updateCustNav();
    showToast('👋 Logged out successfully','ok');
  }
}

// ═══════════════════════════════════
//  AI AGENT 1: SELLER CONNECT
// ═══════════════════════════════════
var connectStep=0;
var currentConnection={};

function connectSend(){
  var inp=document.getElementById('connect-input');
  var txt=inp.value.trim(); if(!txt)return;
  var m=document.getElementById('connect-msgs');
  m.innerHTML+='<div class="msg us">'+txt+'</div><div class="msg ty" id="ctyp">Connecting AI is thinking...</div>';
  inp.value=''; m.scrollTop=m.scrollHeight;

  setTimeout(function(){
    var ty=document.getElementById('ctyp'); if(ty)ty.parentNode.removeChild(ty);
    var reply='', l=txt.toLowerCase();

    if(connectStep===0){
      // First message - analyze what they need
      currentConnection={query:txt, date:(new Date()).toLocaleString()};
      var item='vegetables';
      if(l.indexOf('mango')>=0) item='mangoes';
      else if(l.indexOf('tomato')>=0) item='tomatoes';
      else if(l.indexOf('papaya')>=0) item='papayas';
      else if(l.indexOf('carrot')>=0) item='carrots';
      else if(l.indexOf('pineapple')>=0) item='pineapples';
      else if(l.indexOf('coconut')>=0) item='king coconuts';
      currentConnection.item=item;

      // Find a matching seller
      var sellers=ADMINS.length>0?ADMINS:[{name:'P.A.O. Angel',username:'oshan',area:'Madampe',contact:'076 102 9880'}];
      var seller=sellers[0];
      currentConnection.seller=seller.name||'P.A.O. Angel';
      currentConnection.sellerContact=seller.contact||'076 102 9880';

      reply='🤝 Great! I can help you get a bulk deal on '+item+'!\n\n'+
            'I found the perfect seller for you:\n'+
            '👨‍🌾 **'+currentConnection.seller+'** — '+seller.area+'\n'+
            '📞 Contact: '+currentConnection.sellerContact+'\n\n'+
            'What quantity do you need? (e.g. 20kg, 50 pieces)';
      connectStep=1;
    } else if(connectStep===1){
      currentConnection.quantity=txt;
      reply='📅 Perfect! And what is the occasion?\n\n'+
            '(e.g. Wedding, Birthday Party, Restaurant, Home Use)';
      connectStep=2;
    } else if(connectStep===2){
      currentConnection.occasion=txt;
      // Calculate discount
      var discount=10;
      var qty=currentConnection.quantity||'';
      if(qty.indexOf('50')>=0||qty.indexOf('100')>=0) discount=20;
      else if(qty.indexOf('20')>=0||qty.indexOf('30')>=0) discount=15;
      currentConnection.discount=discount;
      currentConnection.status='Connected';

      // Save connection for admin to see
      if(!currentConnection.customer) currentConnection.customer=CU&&CU.type==='customer'?CU.name:'Guest';
      CONNECTIONS.push(JSON.parse(JSON.stringify(currentConnection)));
      save();

      reply='🎉 Connection made! Here are your bulk deal details:\n\n'+
            '👨‍🌾 Seller: '+currentConnection.seller+'\n'+
            '📦 Item: '+currentConnection.item+'\n'+
            '📊 Quantity: '+currentConnection.quantity+'\n'+
            '🎊 Occasion: '+currentConnection.occasion+'\n'+
            '💰 Discount: '+discount+'% OFF regular price!\n'+
            '📞 Contact seller: '+currentConnection.sellerContact+'\n\n'+
            'The seller will call you within 2 hours to confirm your order. Is there anything else you need?';
      connectStep=0;
      currentConnection={};
    } else {
      reply='🤝 Ready to help with another bulk order! Just tell me what you need for your occasion.';
      connectStep=0;
    }

    m.innerHTML+='<div class="msg ai">'+reply.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')+'</div>';
    m.scrollTop=m.scrollHeight;
  },1300);
}

// ═══════════════════════════════════
//  AI AGENT 2: HARVEST CALENDAR
// ═══════════════════════════════════
var HARVEST_DATA=[
  {item:'Mango',peak:'Feb–May',low:'Nov–Jan',nowPrice:480,peakPrice:280,tip:'Buy in March for best quality & price!',season:'peak'},
  {item:'Papaya',peak:'Year Round',low:'Jul–Aug',nowPrice:320,peakPrice:200,tip:'Always fresh — best value in Apr & Oct',season:'peak'},
  {item:'Pineapple',peak:'Mar–Jun',low:'Sep–Nov',nowPrice:260,peakPrice:160,tip:'Peak season now! Buy in bulk.',season:'peak'},
  {item:'Tomatoes',peak:'Dec–Mar',low:'Jun–Sep',nowPrice:140,peakPrice:80,tip:'Wait until December for best price!',season:'normal'},
  {item:'Carrots',peak:'Oct–Feb',low:'Jun–Aug',nowPrice:180,peakPrice:100,tip:'Highland harvest peaks in November.',season:'normal'},
  {item:'Coconut',peak:'Year Round',low:'Never',nowPrice:120,peakPrice:80,tip:'Always available — buy any time!',season:'peak'},
  {item:'Watermelon',peak:'Nov–Feb',low:'Apr–Sep',nowPrice:350,peakPrice:180,tip:'Currently off-season — price is higher.',season:'off'},
  {item:'Banana',peak:'Year Round',low:'Never',nowPrice:200,peakPrice:150,tip:'Ambul banana best in June–September.',season:'peak'},
];

function buildHarvestCalendar(){
  var g=document.getElementById('cal-grid');
  if(!g)return;
  var h='';
  for(var i=0;i<HARVEST_DATA.length;i++){
    var d=HARVEST_DATA[i];
    var cls=d.season==='peak'?'peak':d.season==='off'?'off':'';
    var badge=d.season==='peak'?'🟢 Peak':'🟡 Normal';
    if(d.season==='off') badge='🔴 Off-Season';
    h+='<div class="cal-item '+cls+'">'+
      '<div class="cal-month">'+badge+' • '+d.peak+'</div>'+
      '<h4>'+d.item+'</h4>'+
      '<div class="cal-price">Now: LKR '+d.nowPrice+' | Peak: LKR '+d.peakPrice+'</div>'+
      '<div class="cal-tip">💡 '+d.tip+'</div>'+
    '</div>';
  }
  g.innerHTML=h;
}

var HARVEST_REPLIES={
  mango:'🥭 **Mango Season Alert!** Mangoes are in PEAK season right now (Feb–May)! Current price: LKR 480/kg. Wait for March when price drops to LKR 280/kg. Willard variety gives the best flavour. 🌟 **Best time to buy: March!**',
  papaya:'🍈 **Papaya is available year-round** in Sri Lanka! Current price: LKR 320/kg. Best value months are April and October when price drops to LKR 200/kg. Always fresh and nutritious!',
  tomato:'🍅 **Tomato Price Forecast:** Current price LKR 140/500g. Wait for December–March harvest when prices drop to LKR 80/500g. Jaffna dry zone produces the best tomatoes. 📊 **Price will drop 43% in December!**',
  carrot:'🥕 **Carrot Harvest Calendar:** Nuwara Eliya highlands peak season is October–February. Current price LKR 180/500g drops to LKR 100/500g in November! 💡 **Save 44% by waiting 2 months!**',
  pineapple:'🍍 **Pineapple Peak Season NOW!** March–June is the best time. Current price LKR 260. Buy in bulk now for events — price will rise after June. 🌟 **This is the BEST time to buy!**',
  coconut:'🥥 **King Coconut is always available** — no seasonal price changes! LKR 120 each year-round. Buy any time. Perfect for daily hydration and cooking.',
  watermelon:'🍉 **Watermelon is currently OFF-SEASON.** Current price LKR 350 is 94% higher than peak season price of LKR 180. 📅 **Wait until November–February for best price and quality!**',
  cheap:'💰 **Cheapest items this week:**\n1. 🥥 King Coconut — LKR 120 (always available)\n2. 🍅 Red Tomatoes — LKR 140/500g\n3. 🥕 Garden Carrots — LKR 180/500g\n\n**Best value seasonal pick:** 🍍 Fresh Pineapple at LKR 260 — peak season now!',
  meal:'🍽️ **Weekly Meal Plan based on freshest & cheapest produce:**\n\n📅 Mon/Tue: Tomato curry + Carrot salad (LKR 320)\n📅 Wed/Thu: Papaya smoothie + Coconut rice (LKR 240)\n📅 Fri/Sat: Pineapple dessert + Mango salad (LKR 380)\n📅 Sunday: Mixed vegetable rice (LKR 280)\n\n✅ Total weekly budget: ~LKR 1,220',
  best:'🌟 **Best time to buy RIGHT NOW:**\n✅ Mangoes — peak season!\n✅ Pineapples — peak season!\n✅ Papayas — good availability!\n⏳ Wait for: Tomatoes (Dec), Carrots (Oct), Watermelon (Nov)',
  def:'🌱 I can tell you about seasonal availability, price forecasts, best buying times, cheap weekly picks, or create a meal plan! Try asking:\n• "When to buy mangoes?"\n• "What\'s cheapest this week?"\n• "Give me a weekly meal plan"',
};

function harvestSend(){
  var inp=document.getElementById('harvest-input');
  var txt=inp.value.trim(); if(!txt)return;
  var m=document.getElementById('harvest-msgs');
  m.innerHTML+='<div class="msg us" style="background:var(--g);color:#fff;align-self:flex-end;">'+txt+'</div><div class="msg ty" id="htyp" style="background:rgba(26,94,42,.1);color:var(--tx);">Harvest AI is thinking...</div>';
  inp.value=''; m.scrollTop=m.scrollHeight;
  setTimeout(function(){
    var ty=document.getElementById('htyp'); if(ty)ty.parentNode.removeChild(ty);
    var l=txt.toLowerCase(), r=HARVEST_REPLIES.def;
    if(l.indexOf('mango')>=0) r=HARVEST_REPLIES.mango;
    else if(l.indexOf('papaya')>=0) r=HARVEST_REPLIES.papaya;
    else if(l.indexOf('tomato')>=0) r=HARVEST_REPLIES.tomato;
    else if(l.indexOf('carrot')>=0) r=HARVEST_REPLIES.carrot;
    else if(l.indexOf('pineapple')>=0) r=HARVEST_REPLIES.pineapple;
    else if(l.indexOf('coconut')>=0||l.indexOf('thambili')>=0) r=HARVEST_REPLIES.coconut;
    else if(l.indexOf('watermelon')>=0) r=HARVEST_REPLIES.watermelon;
    else if(l.indexOf('cheap')>=0||l.indexOf('budget')>=0||l.indexOf('save')>=0) r=HARVEST_REPLIES.cheap;
    else if(l.indexOf('meal')>=0||l.indexOf('plan')>=0||l.indexOf('week')>=0) r=HARVEST_REPLIES.meal;
    else if(l.indexOf('best')>=0||l.indexOf('now')>=0||l.indexOf('today')>=0) r=HARVEST_REPLIES.best;
    var msgDiv=document.createElement('div');
    msgDiv.className='msg ai';
    msgDiv.style.cssText='background:rgba(26,94,42,.1);border:1px solid rgba(26,94,42,.2);color:var(--tx);align-self:flex-start;';
    msgDiv.innerHTML=r.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
    m.appendChild(msgDiv);
    m.scrollTop=m.scrollHeight;
  },1200);
}

// ═══════════════════════════════════
//  ADMIN LOGIN
// ═══════════════════════════════════
function showLogin(){
  document.getElementById('lm').style.display='flex';
  document.getElementById('merr').style.display='none';
  document.getElementById('lu').value='';
  document.getElementById('lp').value='';
}
function hideLogin(){document.getElementById('lm').style.display='none';}
function doLogin(){
  var u=document.getElementById('lu').value.trim(),p=document.getElementById('lp').value;
  document.getElementById('merr').style.display='none';
  if(u===MA.username&&p===MA.password){
    CU={username:MA.username,name:MA.name,role:'main',area:MA.area,contact:MA.contact};
    hideLogin(); openDash(); return;
  }
  var found=null;
  for(var i=0;i<ADMINS.length;i++){if(ADMINS[i].username===u&&ADMINS[i].password===p){found=ADMINS[i];break;}}
  if(found){
    CU={username:found.username,name:found.name,role:'seller',area:found.area||'',contact:found.contact||'',district:found.district||'',town:found.town||'',village:found.village||''};
    hideLogin(); openDash();
  } else {
    document.getElementById('merr').style.display='block';
  }
}

// ═══════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════
function openDash(){
  document.getElementById('db').style.display='flex';
  buildNav(); buildSide(); updStats(); renderMine();
  if(CU.role==='main'){renderAll();renderAdmins();renderOrdersTable();renderCustomersTable();renderConnectionsTable();}
  renderProf(); goPanel('p-ov','t-ov');
}
function closeDash(){CU=null;document.getElementById('db').style.display='none';}

function buildNav(){
  var isMa=CU.role==='main', nav=document.getElementById('dnav');
  nav.className='dn '+(isMa?'ma':'sa');
  nav.innerHTML='<div style="display:flex;align-items:center;gap:.85rem;"><img src="data:image/png;base64,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" alt="PurePick" style="height:36px;width:auto;"><span class="dl">Pure<b>Pick</b></span><span class="dr '+(isMa?'ma':'sa')+'">'+(isMa?'⭐ MAIN ADMIN':'🌿 SELLER ADMIN')+'</span></div>'+
    '<div style="display:flex;align-items:center;gap:.85rem;"><span style="font-size:.82rem;opacity:.78;">👤 '+(CU.name||CU.username)+'</span><button class="do" onclick="closeDash()">Logout ↗</button></div>';
}

function buildSide(){
  var isMa=CU.role==='main', s='';
  s+='<div class="dsl">General</div><button class="dt" id="t-ov" onclick="goPanel(\'p-ov\',\'t-ov\')">📊 <span>Overview</span></button>';
  if(isMa){
    s+='<button class="dt" id="t-orders" onclick="goPanel(\'p-orders\',\'t-orders\')">📋 <span>Orders</span></button>';
    s+='<button class="dt" id="t-customers" onclick="goPanel(\'p-customers\',\'t-customers\')">👥 <span>Customers</span></button>';
    s+='<button class="dt" id="t-connections" onclick="goPanel(\'p-connections\',\'t-connections\')">🤝 <span>Connections</span></button>';
  }
  s+='<div class="dsl">Products</div><button class="dt" id="t-add" onclick="goPanel(\'p-add\',\'t-add\')">➕ <span>Add Product</span></button><button class="dt" id="t-mine" onclick="goPanel(\'p-mine\',\'t-mine\')">📦 <span>My Products</span></button>';
  if(isMa){
    s+='<div class="dsl" style="color:var(--gd)">⭐ Main Admin</div>';
    s+='<button class="dt" id="t-all" onclick="goPanel(\'p-all\',\'t-all\')">🌍 <span>All Products</span></button>';
    s+='<button class="dt" id="t-adm" onclick="goPanel(\'p-adm\',\'t-adm\')">👥 <span>Admins</span></button>';
  }
  s+='<div class="dsl">Account</div><button class="dt" id="t-prof" onclick="goPanel(\'p-prof\',\'t-prof\')">👤 <span>Profile</span></button>';
  if(isMa) s+='<button class="dt" id="t-wa" onclick="goPanel(\'p-wa\',\'t-wa\')">💬 <span>WhatsApp</span></button>';
  document.getElementById('dside').innerHTML=s;
}

function goPanel(pid,tid){
  var panels=document.querySelectorAll('.dp'),tabs=document.querySelectorAll('.dt');
  for(var i=0;i<panels.length;i++) panels[i].classList.remove('on');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('on');
  var panel=document.getElementById(pid),tab=document.getElementById(tid);
  if(panel) panel.classList.add('on');
  if(tab) tab.classList.add('on');
  if(pid==='p-mine') renderMine();
  if(pid==='p-all') renderAll();
  if(pid==='p-adm') renderAdmins();
  if(pid==='p-orders') renderOrdersTable();
  if(pid==='p-customers') renderCustomersTable();
  if(pid==='p-connections') renderConnectionsTable();
  if(pid==='p-wa') loadWaSettings();
}

function updStats(){
  if(!CU)return;
  var mine=PRODS.filter(function(p){return p.by===CU.username;}), isMa=CU.role==='main';
  var fr=PRODS.filter(function(p){return p.cat==='fruit';}).length;
  var vg=PRODS.filter(function(p){return p.cat==='vegetable';}).length;
  var se=PRODS.filter(function(p){return p.cat==='seasonal';}).length;
  var av=PRODS.filter(function(p){return p.avail;}).length;
  var h=isMa?
    scard(PRODS.length,'Total Products')+scard(av,'Available')+scard(fr,'Fruits')+scard(vg,'Vegetables')+
    scard(ADMINS.length,'Seller Admins')+scard(CUSTS.length,'Customers')+
    scard(ORDERS.length,'Orders')+scard(CONNECTIONS.length,'AI Connections'):
    scard(mine.length,'My Products')+scard(mine.filter(function(p){return p.avail;}).length,'Available')+
    scard(mine.filter(function(p){return p.cat==='fruit';}).length,'Fruits')+
    scard(mine.filter(function(p){return p.cat==='vegetable';}).length,'Vegetables');
  document.getElementById('dsc').innerHTML=h;
  document.getElementById('dwel').textContent='Welcome back, '+(CU.name||CU.username)+'!';
  var rev=ORDERS.reduce(function(s,o){return s+o.total;},0);
  document.getElementById('dsum').innerHTML=isMa?
    '→ '+PRODS.length+' products across all sellers<br>→ '+CUSTS.length+' registered customers<br>→ '+ORDERS.length+' orders placed | LKR '+rev+' total revenue<br>→ '+CONNECTIONS.length+' bulk deals connected via AI':
    '→ You have '+mine.length+' products | '+mine.filter(function(p){return p.avail;}).length+' available';
}
function scard(n,l){return '<div class="scd"><div class="n">'+n+'</div><div class="l">'+l+'</div></div>';}

// ─── PRODUCTS CRUD ───────────────────
function addProd(){
  var n=document.getElementById('fn').value.trim(),c=document.getElementById('fc').value;
  var pr=parseInt(document.getElementById('fp').value),u=document.getElementById('fu').value.trim();
  var d=document.getElementById('fd').value.trim(),av=document.getElementById('fa').value==='1';
  var img=document.getElementById('iprev').dataset.img||'';
  if(!n||!pr||!u||!d){showToast('⚠️ Please fill all required fields','er');return;}
  PRODS.push({id:NID++,name:n,cat:c,price:pr,unit:u,desc:d,avail:av,img:img,emoji:'🌿',by:CU.username,byn:CU.name||CU.username});
  save();renderPub();updStats();showToast('✅ "'+n+'" added!','ok');clearPF();goPanel('p-mine','t-mine');
}
function clearPF(){
  ['fn','fp','fu','fd'].forEach(function(id){document.getElementById(id).value='';});
  var prev=document.getElementById('iprev'),img=prev.querySelector('img');if(img)prev.removeChild(img);
  document.getElementById('iprevtxt').style.display='';delete prev.dataset.img;
}
function renderMine(){
  if(!CU)return;
  var mine=PRODS.filter(function(p){return p.by===CU.username;}),tb=document.getElementById('minetb');
  if(!mine.length){tb.innerHTML='<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--mt)">No products yet!</td></tr>';return;}
  var h='';
  for(var i=0;i<mine.length;i++){
    var p=mine[i];
    h+='<tr><td>'+(p.img?'<img src="'+p.img+'" class="ti" onerror="this.style.display=\'none\'">':'<span style="font-size:1.7rem">'+p.emoji+'</span>')+'</td>';
    h+='<td><strong>'+p.name+'</strong></td><td>'+p.cat+'</td><td>LKR '+p.price+'</td>';
    h+='<td><span class="'+(p.avail?'bav':'bos')+'">'+(p.avail?'Available':'Out of Stock')+'</span></td>';
    h+='<td><button class="be" onclick="openEdit('+p.id+')">✏️ Edit</button><button class="bd" onclick="delP('+p.id+',\''+p.name.replace(/'/g,"\\'")+'\')">🗑</button></td></tr>';
  }
  tb.innerHTML=h;
}
function renderAll(){
  var list=AF==='all'?PRODS:PRODS.filter(function(p){return p.cat===AF;}),tb=document.getElementById('alltb');
  if(!list.length){tb.innerHTML='<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--mt)">No products.</td></tr>';return;}
  var h='';
  for(var i=0;i<list.length;i++){
    var p=list[i];
    h+='<tr><td>'+(p.img?'<img src="'+p.img+'" class="ti" onerror="this.style.display=\'none\'">':'<span style="font-size:1.7rem">'+p.emoji+'</span>')+'</td>';
    h+='<td><strong>'+p.name+'</strong></td><td>'+p.cat+'</td><td>LKR '+p.price+'</td>';
    h+='<td><span class="bsl">'+(p.byn||p.by)+'</span></td>';
    h+='<td><span class="'+(p.avail?'bav':'bos')+'">'+(p.avail?'Available':'Out of Stock')+'</span></td>';
    h+='<td><button class="bd" onclick="delP('+p.id+',\''+p.name.replace(/'/g,"\\'")+'\')">🗑</button></td></tr>';
  }
  tb.innerHTML=h;
}
function setAF(f,el){
  var tabs=document.querySelectorAll('#aftabs .ft');for(var i=0;i<tabs.length;i++)tabs[i].classList.remove('on');
  el.classList.add('on');AF=f;renderAll();
}
function openEdit(id){
  var p=null;for(var i=0;i<PRODS.length;i++){if(PRODS[i].id===id){p=PRODS[i];break;}}
  if(!p)return;
  var b=document.getElementById('ebox');b.style.display='block';
  b.innerHTML='<div class="pf2" style="border-left:4px solid var(--gl);margin-bottom:1.2rem;">'+
    '<h3 style="font-family:\'Playfair Display\',serif;margin-bottom:.85rem;">✏️ Editing: '+p.name+'</h3>'+
    '<div class="fg2">'+
    '<div class="fi"><label>Name</label><input id="en" value="'+p.name+'"></div>'+
    '<div class="fi"><label>Category</label><select id="ec"><option value="fruit"'+(p.cat==='fruit'?' selected':'')+'>Fruit</option><option value="vegetable"'+(p.cat==='vegetable'?' selected':'')+'>Vegetable</option><option value="seasonal"'+(p.cat==='seasonal'?' selected':'')+'>Seasonal</option></select></div>'+
    '<div class="fi"><label>Price</label><input type="number" id="ep" value="'+p.price+'"></div>'+
    '<div class="fi"><label>Unit</label><input id="eu" value="'+p.unit+'"></div>'+
    '<div class="fi fw"><label>Description</label><textarea id="ed">'+p.desc+'</textarea></div>'+
    '<div class="fi"><label>Status</label><select id="es"><option value="1"'+(p.avail?' selected':'')+'>Available</option><option value="0"'+(!p.avail?' selected':'')+'>Out of Stock</option></select></div>'+
    '<div class="fi"><label>New Image</label><div class="ip" id="eprev" onclick="document.getElementById(\'ef\').click()" style="height:72px"><span id="eprevtxt">📷 Upload</span><input type="file" id="ef" accept="image/*" onchange="prevImg(this,\'eprev\',\'eprevtxt\')"></div></div>'+
    '</div><div class="fa2"><button class="bs" onclick="saveEdit('+id+')">💾 Save</button><button class="bc" onclick="closeEdit()">Cancel</button></div></div>';
  b.scrollIntoView({behavior:'smooth'});
}
function closeEdit(){var b=document.getElementById('ebox');b.style.display='none';b.innerHTML='';}
function saveEdit(id){
  var p=null;for(var i=0;i<PRODS.length;i++){if(PRODS[i].id===id){p=PRODS[i];break;}}
  if(!p)return;
  p.name=document.getElementById('en').value.trim();p.cat=document.getElementById('ec').value;
  p.price=parseInt(document.getElementById('ep').value);p.unit=document.getElementById('eu').value.trim();
  p.desc=document.getElementById('ed').value.trim();p.avail=document.getElementById('es').value==='1';
  var ni=document.getElementById('eprev').dataset.img;if(ni)p.img=ni;
  save();renderPub();renderMine();if(CU&&CU.role==='main')renderAll();updStats();
  showToast('✅ "'+p.name+'" updated!','ok');closeEdit();
}
function delP(id,name){
  if(!confirm('Delete "'+name+'"?'))return;
  var nP=[];for(var i=0;i<PRODS.length;i++){if(PRODS[i].id!==id)nP.push(PRODS[i]);}PRODS=nP;
  save();renderPub();renderMine();if(CU&&CU.role==='main')renderAll();updStats();
  showToast('🗑 "'+name+'" deleted.','ok');
}

// ─── ORDERS TABLE ────────────────────
function renderOrdersTable(){
  var tb=document.getElementById('orders-tbody');
  if(!ORDERS.length){tb.innerHTML='<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--mt)">No orders yet.</td></tr>';return;}
  var opts='<option value="Pending">Pending</option><option value="Processing">Processing</option><option value="Packed">Packed</option><option value="Out for Delivery">Out for Delivery</option><option value="Delivered">Delivered</option>';
  var h='';
  for(var i=ORDERS.length-1;i>=0;i--){
    var o=ORDERS[i],sc=o.status==='Delivered'?'delivered':o.status==='Pending'?'pending':'processing';
    h+='<tr><td><strong>'+o.id+'</strong></td><td>'+o.name+'</td><td>'+o.phone+'</td><td style="font-size:.75rem;">'+o.zone+'</td><td><strong>LKR '+o.total+'</strong></td>';
    h+='<td><span class="ord-status '+sc+'">'+o.status+'</span></td>';
    h+='<td><select onchange="updateOrderStatus(\''+o.id+'\',this.value)" style="padding:.28rem .5rem;border:1px solid #e0e8d8;border-radius:6px;font-size:.76rem;">'+opts+'</select></td></tr>';
  }
  tb.innerHTML=h;
  // Set current values
  var rows=tb.querySelectorAll('tr');
  for(var i=0;i<rows.length;i++){
    var sel=rows[i].querySelector('select');
    if(sel){
      var oid=rows[i].querySelector('strong').textContent;
      for(var j=0;j<ORDERS.length;j++){if(ORDERS[j].id===oid){sel.value=ORDERS[j].status;break;}}
    }
  }
}
function updateOrderStatus(oid,status){
  var order=null;
  for(var i=0;i<ORDERS.length;i++){if(ORDERS[i].id===oid){ORDERS[i].status=status;order=ORDERS[i];break;}}
  save();updStats();showToast('✅ Order '+oid+' → '+status,'ok');
  // Show WA notification option
  if(order && confirm('Send WhatsApp notification for this status update?')){
    sendWaStatusUpdate(order, status);
  }
}

// ─── CUSTOMERS TABLE ─────────────────
function renderCustomersTable(){
  var tb=document.getElementById('cust-tbody');
  if(!CUSTS.length){tb.innerHTML='<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--mt)">No registered customers yet.</td></tr>';return;}
  var h='';
  for(var i=0;i<CUSTS.length;i++){
    var c=CUSTS[i];
    var orderCount=0;for(var j=0;j<ORDERS.length;j++){if(ORDERS[j].phone===c.phone)orderCount++;}
    h+='<tr><td>'+(i+1)+'</td><td><strong>'+c.name+'</strong></td><td>'+c.village+'</td><td>'+c.phone+'</td><td>'+orderCount+' orders</td><td>'+c.joined+'</td></tr>';
  }
  tb.innerHTML=h;
}

// ─── CONNECTIONS TABLE ────────────────
function renderConnectionsTable(){
  var tb=document.getElementById('conn-tbody');
  if(!CONNECTIONS.length){tb.innerHTML='<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--mt)">No AI connections yet.</td></tr>';return;}
  var h='';
  for(var i=CONNECTIONS.length-1;i>=0;i--){
    var c=CONNECTIONS[i];
    h+='<tr>'+
      '<td style="font-size:.75rem;">'+c.date+'</td>'+
      '<td><strong>'+c.customer+'</strong></td>'+
      '<td>'+c.seller+'</td>'+
      '<td>'+c.item+'</td>'+
      '<td>'+c.quantity+'</td>'+
      '<td>'+c.occasion+'</td>'+
      '<td><span class="bav">'+(c.discount||10)+'% OFF</span></td>'+
    '</tr>';
  }
  tb.innerHTML=h;
}

// ─── ADMINS ──────────────────────────
function createAdmin(){
  if(!CU||CU.role!=='main')return;
  var n=document.getElementById('an').value.trim(),c=document.getElementById('ac').value.trim();
  var di=document.getElementById('adi').value.trim(),to=document.getElementById('ato').value.trim();
  var vi=document.getElementById('avi').value.trim(),ar=document.getElementById('aar').value.trim();
  var u=document.getElementById('au').value.trim(),pw=document.getElementById('apw').value;
  if(!n||!u||!pw){showToast('⚠️ Name, username and password required','er');return;}
  for(var i=0;i<ADMINS.length;i++){if(ADMINS[i].username===u){showToast('❌ Username already taken','er');return;}}
  if(u===MA.username){showToast('❌ Reserved username','er');return;}
  ADMINS.push({id:Date.now(),name:n,contact:c,district:di,town:to,village:vi,area:ar,username:u,password:pw,role:'seller',created:(new Date()).toLocaleDateString()});
  save();renderAdmins();updStats();showToast('✅ Seller admin "'+n+'" created!','ok');clearAF();
}
function clearAF(){['an','ac','adi','ato','avi','aar','au','apw'].forEach(function(id){document.getElementById(id).value='';});}
function renderAdmins(){
  var tb=document.getElementById('admtb');
  if(!ADMINS.length){tb.innerHTML='<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--mt)">No seller admins yet.</td></tr>';return;}
  var h='';
  for(var i=0;i<ADMINS.length;i++){
    var a=ADMINS[i],cnt=0;for(var j=0;j<PRODS.length;j++){if(PRODS[j].by===a.username)cnt++;}
    h+='<tr><td><strong>'+a.name+'</strong></td><td><code style="background:#f0f5ee;padding:.17rem .42rem;border-radius:5px;">'+a.username+'</code></td>'+
       '<td>'+(a.district||'—')+'</td><td>'+(a.town||'—')+'</td><td>'+(a.village||'—')+'</td>'+
       '<td>'+(a.contact||'—')+'</td><td>'+cnt+' products</td>'+
       '<td><button class="bd" onclick="delAdmin('+a.id+',\''+a.name.replace(/'/g,"\\'")+'\',\''+a.username+'\')">🗑</button></td></tr>';
  }
  tb.innerHTML=h;
}
function delAdmin(id,name,uname){
  if(!CU||CU.role!=='main')return;
  var cnt=0;for(var i=0;i<PRODS.length;i++){if(PRODS[i].by===uname)cnt++;}
  if(!confirm('Delete admin "'+name+'"?\nThis will also delete their '+cnt+' products!'))return;
  var nP=[];for(var i=0;i<PRODS.length;i++){if(PRODS[i].by!==uname)nP.push(PRODS[i]);}PRODS=nP;
  var nA=[];for(var i=0;i<ADMINS.length;i++){if(ADMINS[i].id!==id)nA.push(ADMINS[i]);}ADMINS=nA;
  save();renderAdmins();renderPub();renderAll();updStats();
  showToast('🗑 "'+name+'" and '+cnt+' products deleted.','ok');
}

// ─── PROFILE ─────────────────────────
function renderProf(){
  var isMa=CU&&CU.role==='main',rows='';
  rows+=pr2('👤','Name',CU.name||'—');
  rows+=pr2('🔑','Username',CU.username);
  rows+=pr2('🎭','Role',isMa?'Main Admin (Full Access)':'Seller Admin');
  if(CU.contact)rows+=pr2('📞','Contact',CU.contact);
  if(CU.area)rows+=pr2('🏪','Area',CU.area);
  if(CU.district)rows+=pr2('🗺️','District',CU.district);
  if(CU.town)rows+=pr2('🏙️','Town',CU.town);
  if(CU.village)rows+=pr2('🏡','Village',CU.village);
  if(isMa)rows+=pr2('🏪','Branches','Madampe • Chilaw • Kuliyapitiya');
  document.getElementById('profbox').innerHTML=
    '<div class="pc2"><div class="pt">'+
    '<img src="photo.jpg" onerror="this.src=\'https://ui-avatars.com/api/?name='+encodeURIComponent(CU.name||CU.username)+'&background=1a5e2a&color=fff&size=200\'" class="pav">'+
    '<div><div class="pnm">'+(CU.name||CU.username)+'</div><div class="prl">'+(isMa?'⭐ Main Administrator — PurePick':'🌿 Seller Admin')+'</div></div>'+
    '</div><div class="pfs">'+rows+'</div></div>';
}
function pr2(ic,lb,vl){return '<div class="prow"><div class="pic2">'+ic+'</div><div><div class="plb">'+lb+'</div><div class="pvl">'+vl+'</div></div></div>';}

// ─── IMAGE PREVIEW ───────────────────
function prevImg(input,prevId,txtId){
  var file=input.files[0];if(!file)return;
  var r=new FileReader();
  r.onload=function(e){
    var prev=document.getElementById(prevId),ex=prev.querySelector('img');if(ex)prev.removeChild(ex);
    var img=document.createElement('img');img.src=e.target.result;img.style.cssText='width:100%;height:100%;object-fit:cover;';
    prev.insertBefore(img,prev.querySelector('input'));
    if(txtId)document.getElementById(txtId).style.display='none';
    prev.dataset.img=e.target.result;
  };r.readAsDataURL(file);
}

// ─── WHATSAPP SETTINGS ───────────────
function loadWaSettings(){
  var num = localStorage.getItem('pp_wa_num') || '94761029880';
  var el = document.getElementById('wa-number-input');
  if(el) el.value = num;
}
function saveWaSettings(){
  var num = document.getElementById('wa-number-input').value.trim().replace(/\D/g,'');
  if(!num){showToast('⚠️ Please enter a valid WhatsApp number','er');return;}
  localStorage.setItem('pp_wa_num', num);
  showToast('✅ WhatsApp number saved: +'+num,'ok');
}
function testWaNotification(){
  var num = localStorage.getItem('pp_wa_num') || '94761029880';
  var msg = '🌿 *PurePick Test Message*\n\nWhatsApp notifications are working correctly!\n\nYou will receive order alerts on this number.\n\n_Sent from PurePick Admin_';
  window.open('https://wa.me/'+num+'?text='+encodeURIComponent(msg),'_blank');
}
function sendWaStatusUpdate(order, status){
  var num = localStorage.getItem('pp_wa_num') || '94761029880';
  var emoji = {'Pending':'⏳','Processing':'⚙️','Packed':'📦','Out for Delivery':'🚚','Delivered':'✅'}[status]||'📋';
  var msg =
    emoji+' *ORDER STATUS UPDATE - PurePick*\n\n' +
    '🆔 Order: '+order.id+'\n' +
    '👤 Customer: '+order.name+'\n' +
    '📞 Phone: '+order.phone+'\n' +
    '📋 New Status: *'+status+'*\n' +
    '💰 Total: LKR '+order.total+'\n\n' +
    '_PurePick Farmers Market_';
  window.open('https://wa.me/'+num+'?text='+encodeURIComponent(msg),'_blank');
}

// ─── TOAST ───────────────────────────
function showToast(msg,type){
  var t=document.getElementById('att');t.textContent=msg;t.className=type==='er'?'er':'ok';
  t.style.display='block';setTimeout(function(){t.style.display='none';},3000);
}

// ─── NAVBAR ──────────────────────────
window.onscroll=function(){document.getElementById('nav').classList.toggle('sc',window.scrollY>20);};

// ─── INIT ────────────────────────────
window.onload=function(){
  document.getElementById('cart-badge').style.display='none';
  load(); // async — handles renderPub, buildHarvestCalendar, updateCustNav internally
};
