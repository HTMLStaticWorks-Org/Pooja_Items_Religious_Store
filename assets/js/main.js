/**
 * DivyaKala — Sacred Heritage & Artisanal Pooja Emporium
 * Main Application JavaScript (ES6+)
 * Handles Theme (Light/Dark), RTL, Navigation, Search, Cart, Wishlist,
 * Quick View Modal, Product Filtering/Sorting, Festival Filters, Forms & Animations.
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    THEME: 'divyakala_theme',
    DIR: 'divyakala_dir',
    CART: 'divyakala_cart',
    WISHLIST: 'divyakala_wishlist'
  };

  // Detect path prefix so modals/search work from both root (index.html) and /pages/*.html
  const isSubPage = window.location.pathname.replace(/\\/g, '/').includes('/pages/');
  const ASSET_PREFIX = isSubPage ? '../' : '';
  const PAGE_PREFIX = isSubPage ? '' : 'pages/';
  const HOME1_PATH = isSubPage ? '../index.html' : 'index.html';

  // Master Product Database for Global Search, Quick View, Wishlist & Cart
  const MASTER_PRODUCTS = [
    {
      id: 'dk-h1-1',
      sku: 'DK-BS-01',
      name: 'Kumbakonam Panchamukhi Nilavilakku Lamp',
      category: 'diyas',
      categoryLabel: 'Brass & Copper Diyas',
      price: 4850,
      oldPrice: 5600,
      rating: 4.9,
      reviews: 142,
      badge: 'Bestseller',
      craftOrigin: 'Kumbakonam, Tamil Nadu',
      material: '100% Virgin Solid Temple Brass (3.2 kg)',
      image: 'assets/images/h1-prod-1.webp',
      desc: 'Hand-cast by hereditary sthapati artisans in Kumbakonam, this five-wick Nilavilakku lamp radiates auspicious Panchabhoota harmony during morning and evening Sandhya Arati.'
    },
    {
      id: 'dk-h1-2',
      sku: 'DK-BS-02',
      name: 'Ashtalakshmi Embossed Pure Brass Pooja Thali (7-Pc Set)',
      category: 'pooja-thalis',
      categoryLabel: 'Pooja Thalis',
      price: 3490,
      oldPrice: 4100,
      rating: 4.9,
      reviews: 118,
      badge: 'Artisan Pick',
      craftOrigin: 'Moradabad & Thanjavur Guild',
      material: 'Heavy Gauge Repoussé Brass (12-Inch Diameter)',
      image: 'assets/images/h1-prod-2.webp',
      desc: 'Intricately embossed with the eight sacred forms of Goddess Mahalakshmi. Includes thali plate, panchamrit kalash, achamani spoon, ghanti bell, two haldi-kumkum katoris, and niranjana diya.'
    },
    {
      id: 'dk-h1-3',
      sku: 'DK-BS-03',
      name: 'Prana-Pratishtha Brass Siddhi Vinayak Ganesha Murti',
      category: 'idols',
      categoryLabel: 'Deity Idols',
      price: 6250,
      oldPrice: 7200,
      rating: 5.0,
      reviews: 204,
      badge: 'Sacred Idol',
      craftOrigin: 'Swamimalai, Tamil Nadu',
      material: 'Solid Lost-Wax Panchaloha-Style Brass (9 Inches)',
      image: 'assets/images/h1-prod-3.webp',
      desc: 'Sculpted according to Shilpa Shastra proportions with right-turning auspicious trunk, modak bowl, and ornate prabhavali arch for home mandirs.'
    },
    {
      id: 'dk-h1-4',
      sku: 'DK-BS-04',
      name: 'Himalayan 5-Mukhi Authentic Rudraksha Japa Mala (108+1)',
      category: 'rudraksha',
      categoryLabel: 'Rudraksha',
      price: 1950,
      oldPrice: 2400,
      rating: 4.8,
      reviews: 96,
      badge: 'Lab Certified',
      craftOrigin: 'Sankhuwasabha, Nepal',
      material: 'Natural 8mm A+ Nepali Rudraksha & Pure Silk Knots',
      image: 'assets/images/h1-prod-4.webp',
      desc: 'Hand-selected high-density Nepali 5-Mukhi Rudraksha beads knotted in traditional sacred red silk thread with a Sumeru guru bead for daily mantra japa.'
    },
    {
      id: 'dk-h1-5',
      sku: 'DK-BS-05',
      name: 'Mysore Sandalwood & Temple Parijata Hand-Rolled Dhoop',
      category: 'incense',
      categoryLabel: 'Incense & Dhoop',
      price: 890,
      oldPrice: 1150,
      rating: 4.9,
      reviews: 310,
      badge: 'Charcoal-Free',
      craftOrigin: 'Mysuru, Karnataka',
      material: 'Upcycled Temple Flowers, Halmaddi Resin & Santalum Album Oil',
      image: 'assets/images/h1-prod-5.webp',
      desc: '100% charcoal-free Vedic masala dhoop cones crafted from sacred temple florals, pure Mysore sandalwood powder, guggal resin, and cow ghee.'
    },
    {
      id: 'dk-h1-6',
      sku: 'DK-BS-06',
      name: 'Nandi Finial Heavy Temple Ghanti Bell in Aged Bronze',
      category: 'accessories',
      categoryLabel: 'Spiritual Accessories',
      price: 2150,
      oldPrice: 2600,
      rating: 4.9,
      reviews: 87,
      badge: 'Deep Resonance',
      craftOrigin: 'Nachiarkoil, Tamil Nadu',
      material: 'Acoustic Bell Metal / Kansa Alloy (7.5 Inches)',
      image: 'assets/images/h1-prod-6.webp',
      desc: 'Tuned for a long, meditative Omkar frequency resonance that clears stagnant energy during daily pooja and abhishekam rituals.'
    },
    {
      id: 'dk-cat-101',
      sku: 'DK-101',
      name: 'Thanjavur Peacock Annam Kuthu Vilakku Standing Lamp (24")',
      category: 'diyas',
      categoryLabel: 'Brass & Copper Diyas',
      price: 7450,
      oldPrice: 8900,
      rating: 5.0,
      reviews: 94,
      badge: 'Heirloom Piece',
      craftOrigin: 'Thanjavur, Tamil Nadu',
      material: 'Heavy Cast Heritage Brass (5.4 kg)',
      image: 'assets/images/catalog-p01.webp',
      desc: 'A majestic 24-inch traditional floor standing lamp crowned with the sacred Annam (celestial swan) finial and five deep oil reservoirs.'
    },
    {
      id: 'dk-cat-102',
      sku: 'DK-102',
      name: 'Surya-Chandra Engraved Pure Copper Pooja Thali & Achamani',
      category: 'pooja-thalis',
      categoryLabel: 'Pooja Thalis',
      price: 2790,
      oldPrice: 3300,
      rating: 4.8,
      reviews: 76,
      badge: '99.9% Pure Copper',
      craftOrigin: 'Varanasi, Uttar Pradesh',
      material: 'Hammered Electrolytic-Grade Pure Copper',
      image: 'assets/images/catalog-p02.webp',
      desc: 'Hand-engraved with Vedic Surya, Chandra, and Gayatri yantra motifs. Ideal for daily Surya Arghya, Sankalpa, and Tarpanam offerings.'
    },
    {
      id: 'dk-cat-103',
      sku: 'DK-103',
      name: 'Chola Bronze Finish Lord Krishna Venugopala Flute Idol',
      category: 'idols',
      categoryLabel: 'Deity Idols',
      price: 8900,
      oldPrice: 10500,
      rating: 5.0,
      reviews: 129,
      badge: 'Museum Grade',
      craftOrigin: 'Swamimalai, Tamil Nadu',
      material: 'Lost-Wax Cast Antique Bronze Finish (11 Inches)',
      image: 'assets/images/catalog-p03.webp',
      desc: 'Graceful Tribhanga posture of Lord Venugopala playing the divine flute atop an inverted lotus pedestal with delicate jewelry carvings.'
    },
    {
      id: 'dk-cat-104',
      sku: 'DK-104',
      name: '7-Mukhi Mahalakshmi Certified Nepali Rudraksha Mala',
      category: 'rudraksha',
      categoryLabel: 'Rudraksha',
      price: 3850,
      oldPrice: 4500,
      rating: 4.9,
      reviews: 64,
      badge: 'X-Ray Verified',
      craftOrigin: 'Arun Valley, Nepal',
      material: 'Natural 7-Mukhi Collector Beads with Silver Caps',
      image: 'assets/images/catalog-p04.webp',
      desc: 'Sacred to Goddess Mahalakshmi, this certified 7-Mukhi Rudraksha mala promotes spiritual abundance, inner equipoise, and dhyana focus.'
    },
    {
      id: 'dk-cat-105',
      sku: 'DK-105',
      name: 'Loban, Guggal & Dasangam Sambrani Brass Dhuni Burner',
      category: 'incense',
      categoryLabel: 'Incense & Dhoop',
      price: 1680,
      oldPrice: 2050,
      rating: 4.8,
      reviews: 152,
      badge: 'Complete Set',
      craftOrigin: 'Moradabad & Madurai',
      material: 'Perforated Brass Burner with Rosewood Handle + 40 Cups',
      image: 'assets/images/catalog-p05.webp',
      desc: 'Traditional perforated brass loban burner with heat-insulated rosewood grip, accompanied by 40 natural Dasangam and Guggal sambrani cups.'
    },
    {
      id: 'dk-cat-106',
      sku: 'DK-106',
      name: 'Sampoorna Griha Pravesh & Satyanarayan 32-Item Pooja Kit',
      category: 'pooja-kits',
      categoryLabel: 'Pooja Kits',
      price: 4290,
      oldPrice: 5100,
      rating: 4.9,
      reviews: 183,
      badge: 'All-In-One Kit',
      craftOrigin: 'Varanasi Vedic Curators',
      material: '32 Authentic Samagri Items in Velvet Heritage Trunk',
      image: 'assets/images/catalog-p06.webp',
      desc: 'Curated by Kashi pandits with copper kalash, navagraha samidha, gangajal, gomti chakras, yellow mustard, kumkum, haldi, janeu, and bilingual vidhi book.'
    },
    {
      id: 'dk-cat-107',
      sku: 'DK-107',
      name: 'Akhand Jyoti Borosilicate Glass & Heavy Brass Chimney Diya',
      category: 'diyas',
      categoryLabel: 'Brass & Copper Diyas',
      price: 1890,
      oldPrice: 2300,
      rating: 4.9,
      reviews: 215,
      badge: 'Wind-Protected',
      craftOrigin: 'Jaipur & Moradabad',
      material: 'Optical Borosilicate Glass & Solid Brass Base',
      image: 'assets/images/catalog-p07.webp',
      desc: 'Engineered for uninterrupted 9-day Navratri and Deepavali Akhand Jyoti with adjustable brass wick lifter and heat-resistant crystal chimney.'
    },
    {
      id: 'dk-cat-108',
      sku: 'DK-108',
      name: 'Carved Rosewood & Brass Inlay Temple Wall Mandapam',
      category: 'accessories',
      categoryLabel: 'Spiritual Accessories',
      price: 11500,
      oldPrice: 13800,
      rating: 5.0,
      reviews: 58,
      badge: 'Handcrafted',
      craftOrigin: 'Saharanpur & Mysuru',
      material: 'Seasoned Indian Rosewood with Tarkashi Brass Inlay',
      image: 'assets/images/catalog-p08.webp',
      desc: 'Architectural home sanctum shelf featuring Gopuram dome carvings, hanging brass bells, pull-out prasadam tray, and warm concealed diya alcove.'
    },
    {
      id: 'dk-cat-109',
      sku: 'DK-109',
      name: 'Ganga Jal Pure Copper Purnakumbha Kalash with Brass Spoon',
      category: 'brass-items',
      categoryLabel: 'Brass Items',
      price: 1750,
      oldPrice: 2150,
      rating: 4.8,
      reviews: 109,
      badge: 'Vedic Vessel',
      craftOrigin: 'Kumbakonam, Tamil Nadu',
      material: 'Heavy Hammered Copper & Brass Rim (1.2 Litre)',
      image: 'assets/images/catalog-p09.webp',
      desc: 'Sacred Purnakumbha vessel crafted for Kalash Sthapana, Abhishekam, and storing energized Gangajal in the home altar.'
    },
    {
      id: 'dk-cat-110',
      sku: 'DK-110',
      name: 'Kashi Vishwanath Brass Nandi & Shiva Lingam Jaladhara Stand',
      category: 'idols',
      categoryLabel: 'Deity Idols',
      price: 5400,
      oldPrice: 6400,
      rating: 5.0,
      reviews: 147,
      badge: 'Abhishekam Set',
      craftOrigin: 'Varanasi, Uttar Pradesh',
      material: 'Solid Brass Lingam, Nandi, Cobra Hood & Tripod Dhara Patra',
      image: 'assets/images/catalog-p10.webp',
      desc: 'Complete continuous-drip Rudrabhishekam ensemble featuring a tripod overhead Jaladhara pot, Five-Hooded Sheshnag canopy, and kneeling Nandi.'
    },
    {
      id: 'dk-cat-111',
      sku: 'DK-111',
      name: '108-Bead Vrindavan Tulsi Kanthi & Sphatik Crystal Mala',
      category: 'rudraksha',
      categoryLabel: 'Rudraksha',
      price: 1590,
      oldPrice: 1990,
      rating: 4.9,
      reviews: 88,
      badge: 'Cooling Prana',
      craftOrigin: 'Vrindavan & Haridwar',
      material: 'Sacred Krishna Tulsi Wood & Natural Quartz Sphatik',
      image: 'assets/images/catalog-p11.webp',
      desc: 'Alternating hand-carved Vrindavan Tulsi beads and natural Himalayan Sphatik crystal beads for Vaishnava and Devi mantra meditation.'
    },
    {
      id: 'dk-cat-112',
      sku: 'DK-112',
      name: 'Repoussé Ashtamangala Brass Pancharti Five-Wick Lamp',
      category: 'brass-items',
      categoryLabel: 'Brass Items',
      price: 2290,
      oldPrice: 2750,
      rating: 4.9,
      reviews: 134,
      badge: 'Temple Arati',
      craftOrigin: 'Nachiarkoil, Tamil Nadu',
      material: 'Solid Cast Brass with Cobra Handle (850g)',
      image: 'assets/images/catalog-p12.webp',
      desc: 'Balanced handheld five-wick Arati lamp adorned with the eight auspicious Ashtamangala symbols and an ergonomic heat-safe grip.'
    }
  ];

  // Format INR currency cleanly
  function formatINR(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  // =========================================================================
  // 1. THEME (LIGHT / DARK) & RTL INITIALIZATION AND PERSISTENCE
  // =========================================================================
  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    // Update all theme toggle buttons across header & mobile menu
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      const labelEl = btn.querySelector('.theme-toggle-label');
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
      if (labelEl) {
        labelEl.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  function getStoredDir() {
    return localStorage.getItem(STORAGE_KEYS.DIR) || 'ltr';
  }

  function applyDirection(dir) {
    const root = document.documentElement;
    root.setAttribute('dir', dir);
    localStorage.setItem(STORAGE_KEYS.DIR, dir);

    document.querySelectorAll('[data-rtl-toggle]').forEach((btn) => {
      const badge = btn.querySelector('[data-rtl-label]');
      btn.setAttribute('aria-pressed', dir === 'rtl' ? 'true' : 'false');
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right (LTR)' : 'Switch to Right-to-Left (RTL)');
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
      if (badge) {
        badge.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });
  }

  // Apply immediately on script load to prevent flash
  applyTheme(getStoredTheme());
  applyDirection(getStoredDir());

  // =========================================================================
  // 2. CART & WISHLIST STATE MANAGEMENT
  // =========================================================================
  function getCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CART);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateHeaderBadges();
    renderCartDrawer();
  }

  function getWishlist() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(list) {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    updateHeaderBadges();
    syncWishlistButtons();
    renderWishlistDrawer();
  }

  function findProduct(idOrName) {
    let found = MASTER_PRODUCTS.find((p) => p.id === idOrName || p.sku === idOrName);
    if (!found && idOrName) {
      found = MASTER_PRODUCTS.find((p) => p.name.toLowerCase().includes(String(idOrName).toLowerCase()));
    }
    return found || MASTER_PRODUCTS[0];
  }

  function addToCart(productObj, qty = 1) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === productObj.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: productObj.id,
        name: productObj.name,
        price: Number(productObj.price),
        qty: qty,
        image: productObj.image
      });
    }
    saveCart(cart);
    showToast(`Added "${productObj.name}" to your Sacred Bag`);
  }

  function toggleWishlistItem(productId, fallbackProduct) {
    const list = getWishlist();
    const idx = list.indexOf(productId);
    const prod = fallbackProduct || findProduct(productId);
    if (idx > -1) {
      list.splice(idx, 1);
      saveWishlist(list);
      showToast(`Removed "${prod.name}" from Wishlist`);
    } else {
      list.push(productId);
      saveWishlist(list);
      showToast(`Saved "${prod.name}" to your Sacred Wishlist`);
    }
  }

  function updateHeaderBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((acc, item) => acc + Number(item.qty || 1), 0);
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = totalCount;
    });

    const wishlist = getWishlist();
    document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
      el.textContent = wishlist.length;
    });
  }

  function syncWishlistButtons() {
    const wishlist = getWishlist();
    document.querySelectorAll('[data-wishlist-btn]').forEach((btn) => {
      const pid = btn.getAttribute('data-product-id');
      const isSaved = wishlist.includes(pid);
      btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
      if (isSaved) {
        btn.classList.add('bg-[#702B32]', 'text-[#FFF9EF]', 'border-[#C69B45]');
      } else {
        btn.classList.remove('bg-[#702B32]', 'text-[#FFF9EF]', 'border-[#C69B45]');
      }
    });
  }

  // =========================================================================
  // 3. TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message) {
    let container = document.getElementById('dk-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'dk-toast-container';
      container.className = 'fixed bottom-6 right-6 z-[90] flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-theme-surface border border-theme-strong shadow-theme-elevated text-theme-primary text-sm font-medium transition-all duration-300 transform translate-y-2 opacity-0';
    toast.innerHTML = `
      <span class="w-8 h-8 rounded-full bg-[#702B32] text-[#FFF9EF] flex items-center justify-center shrink-0 font-bold">✦</span>
      <span class="flex-1 leading-snug">${message}</span>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 320);
    }, 3200);
  }

  // =========================================================================
  // 4. SHARED INTERACTIVE OVERLAYS (SEARCH, CART, WISHLIST, QUICK VIEW)
  // =========================================================================
  function injectDynamicModals() {
    if (document.getElementById('dk-global-modals')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'dk-global-modals';
    wrapper.innerHTML = `
      <!-- Global Search Modal -->
      <div id="dk-search-modal" class="fixed inset-0 z-[80] hidden items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search Sacred Catalog">
        <div class="bg-theme-surface border border-theme-strong rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-theme-elevated relative">
          <div class="flex items-center justify-between gap-4 pb-4 border-b border-theme">
            <div class="flex items-center gap-2.5">
              <span class="text-brand-gold text-xl">✦</span>
              <h3 class="heading-serif text-2xl font-bold text-theme-primary">Search Sacred Emporium</h3>
            </div>
            <button type="button" data-close-modal="dk-search-modal" class="w-10 h-10 rounded-full border border-theme flex items-center justify-center text-theme-primary hover:border-theme-strong" aria-label="Close search">✕</button>
          </div>
          <div class="mt-4">
            <label for="dk-global-search-input" class="sr-only">Search products by name, deity, or ritual</label>
            <input id="dk-global-search-input" type="search" class="sacred-input" placeholder="Search brass diyas, Ganesha idols, Rudraksha, Pooja thalis, Diwali kits..." autocomplete="off" />
          </div>
          <div id="dk-global-search-results" class="mt-5 max-h-80 overflow-y-auto divide-y divide-[var(--border-subtle)]"></div>
        </div>
      </div>

      <!-- Sacred Bag / Cart Drawer -->
      <div id="dk-cart-modal" class="fixed inset-0 z-[80] hidden justify-end bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Sacred Shopping Bag">
        <div class="bg-theme-surface border-l border-theme-strong w-full max-w-md h-full flex flex-col justify-between p-6 shadow-theme-elevated">
          <div class="flex items-center justify-between pb-4 border-b border-theme">
            <div>
              <span class="text-xs uppercase tracking-widest text-brand-gold font-semibold">Your Offerings</span>
              <h3 class="heading-serif text-2xl font-bold text-theme-primary">Sacred Shopping Bag</h3>
            </div>
            <button type="button" data-close-modal="dk-cart-modal" class="w-10 h-10 rounded-full border border-theme flex items-center justify-center text-theme-primary" aria-label="Close bag">✕</button>
          </div>
          <div id="dk-cart-items-list" class="flex-1 overflow-y-auto py-4 space-y-4"></div>
          <div class="pt-4 border-t border-theme space-y-4">
            <div class="flex items-center justify-between text-base font-semibold text-theme-primary">
              <span>Auspicious Subtotal</span>
              <span id="dk-cart-subtotal" class="text-xl text-brand-gold font-bold">₹0</span>
            </div>
            <p class="text-xs text-theme-muted">Includes sacred silk wrapping, energized Kashi Vibhuti & insured pan-India dispatch.</p>
            <div class="grid grid-cols-2 gap-3">
              <a href="${PAGE_PREFIX}products.html" class="btn-sacred-outline text-center text-sm py-2.5">Explore Catalog</a>
              <a href="${PAGE_PREFIX}contact.html#enquiry-form" class="btn-sacred-primary text-center text-sm py-2.5">Complete Order</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Sacred Wishlist Drawer -->
      <div id="dk-wishlist-modal" class="fixed inset-0 z-[80] hidden justify-end bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Sacred Wishlist">
        <div class="bg-theme-surface border-l border-theme-strong w-full max-w-md h-full flex flex-col justify-between p-6 shadow-theme-elevated">
          <div class="flex items-center justify-between pb-4 border-b border-theme">
            <div>
              <span class="text-xs uppercase tracking-widest text-brand-gold font-semibold">Saved Treasures</span>
              <h3 class="heading-serif text-2xl font-bold text-theme-primary">Sacred Wishlist</h3>
            </div>
            <button type="button" data-close-modal="dk-wishlist-modal" class="w-10 h-10 rounded-full border border-theme flex items-center justify-center text-theme-primary" aria-label="Close wishlist">✕</button>
          </div>
          <div id="dk-wishlist-items-list" class="flex-1 overflow-y-auto py-4 space-y-4"></div>
          <div class="pt-4 border-t border-theme">
            <a href="${PAGE_PREFIX}products.html" class="btn-sacred-primary w-full text-center text-sm">Browse All Sacred Products</a>
          </div>
        </div>
      </div>

      <!-- Product Quick View Modal -->
      <div id="dk-quickview-modal" class="fixed inset-0 z-[85] hidden items-center justify-center p-4 bg-black/75 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Product Quick View">
        <div class="bg-theme-surface border border-theme-strong rounded-3xl max-w-3xl w-full overflow-hidden shadow-theme-elevated relative">
          <button type="button" data-close-modal="dk-quickview-modal" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-theme-primary border border-theme-strong flex items-center justify-center text-theme-primary" aria-label="Close quick view">✕</button>
          <div id="dk-quickview-body" class="grid grid-cols-1 md:grid-cols-2"></div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('hidden');
    el.classList.add('flex');
    if (id === 'dk-search-modal') {
      const input = document.getElementById('dk-global-search-input');
      renderGlobalSearchResults('');
      if (input) setTimeout(() => input.focus(), 60);
    } else if (id === 'dk-cart-modal') {
      renderCartDrawer();
    } else if (id === 'dk-wishlist-modal') {
      renderWishlistDrawer();
    }
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('hidden');
    el.classList.remove('flex');
    if (id === 'dk-quickview-modal') {
      const qvBody = document.getElementById('dk-quickview-body');
      if (qvBody) qvBody.innerHTML = '';
    }
  }

  function renderGlobalSearchResults(query) {
    const container = document.getElementById('dk-global-search-results');
    if (!container) return;
    const q = String(query || '').trim().toLowerCase();
    const matches = q
      ? MASTER_PRODUCTS.filter((p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.craftOrigin.toLowerCase().includes(q)
        )
      : MASTER_PRODUCTS.slice(0, 6);

    if (matches.length === 0) {
      container.innerHTML = `<p class="py-8 text-center text-theme-muted text-sm">No sacred items matched "${query}". Try searching "Diya", "Ganesha", "Thali", or "Rudraksha".</p>`;
      return;
    }

    container.innerHTML = matches.map((p) => `
      <div class="py-3 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="w-12 h-12 rounded-xl bg-[#702B32] text-[#F6D379] border border-[#C69B45] flex items-center justify-center shrink-0 font-serif font-bold text-sm">✦</div>
          <div class="min-w-0">
            <span class="text-[11px] uppercase tracking-wider text-brand-gold font-semibold block">${p.categoryLabel}</span>
            <h4 class="text-sm font-semibold text-theme-primary truncate">${p.name}</h4>
            <span class="text-xs font-bold text-theme-secondary">${formatINR(p.price)}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button type="button" data-quickview-btn data-product-id="${p.id}" class="px-3 py-1.5 rounded-full text-xs font-semibold border border-theme text-theme-primary hover:border-theme-strong">Quick View</button>
          <button type="button" data-add-to-cart data-product-id="${p.id}" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#702B32] text-[#FFF9EF] hover:bg-[#521D22]">+ Bag</button>
        </div>
      </div>
    `).join('');
  }

  function renderCartDrawer() {
    const listEl = document.getElementById('dk-cart-items-list');
    const subEl = document.getElementById('dk-cart-subtotal');
    if (!listEl || !subEl) return;

    const cart = getCart();
    if (cart.length === 0) {
      listEl.innerHTML = `
        <div class="py-12 text-center space-y-3">
          <p class="heading-serif text-xl text-theme-primary">Your Sacred Bag is Empty</p>
          <p class="text-sm text-theme-muted">Explore our handcrafted brass diyas, deity idols, and Vedic pooja kits.</p>
        </div>
      `;
      subEl.textContent = '₹0';
      return;
    }

    let subtotal = 0;
    listEl.innerHTML = cart.map((item) => {
      const lineTotal = Number(item.price) * Number(item.qty);
      subtotal += lineTotal;
      return `
        <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-theme-primary border border-theme">
          <div class="w-12 h-12 rounded-xl bg-[#702B32] text-[#F6D379] border border-[#C69B45] flex items-center justify-center shrink-0 font-bold">✦</div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-theme-primary truncate">${item.name}</h4>
            <p class="text-xs text-brand-gold font-bold mt-0.5">${formatINR(item.price)} × ${item.qty} = ${formatINR(lineTotal)}</p>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" data-cart-qty="${item.id}" data-delta="-1" class="w-6 h-6 rounded-full border border-theme text-xs font-bold text-theme-primary" aria-label="Decrease quantity">−</button>
              <span class="text-xs font-semibold text-theme-primary">${item.qty}</span>
              <button type="button" data-cart-qty="${item.id}" data-delta="1" class="w-6 h-6 rounded-full border border-theme text-xs font-bold text-theme-primary" aria-label="Increase quantity">+</button>
              <button type="button" data-cart-remove="${item.id}" class="ml-auto text-xs text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    subEl.textContent = formatINR(subtotal);
  }

  function renderWishlistDrawer() {
    const listEl = document.getElementById('dk-wishlist-items-list');
    if (!listEl) return;
    const wishlist = getWishlist();
    if (wishlist.length === 0) {
      listEl.innerHTML = `
        <div class="py-12 text-center space-y-2">
          <p class="heading-serif text-xl text-theme-primary">No Saved Sacred Items Yet</p>
          <p class="text-sm text-theme-muted">Tap the heart icon on any idol, lamp, or thali to save it for auspicious occasions.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = wishlist.map((pid) => {
      const p = findProduct(pid);
      return `
        <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-theme-primary border border-theme">
          <div class="w-12 h-12 rounded-xl bg-[#702B32] text-[#F6D379] border border-[#C69B45] flex items-center justify-center shrink-0 font-bold">♥</div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-theme-primary truncate">${p.name}</h4>
            <p class="text-xs text-brand-gold font-bold mt-0.5">${formatINR(p.price)}</p>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" data-add-to-cart data-product-id="${p.id}" class="px-3 py-1 rounded-full text-xs font-semibold bg-[#702B32] text-[#FFF9EF]">Move to Bag</button>
              <button type="button" data-wishlist-btn data-product-id="${p.id}" class="text-xs text-theme-muted hover:underline">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function openQuickView(productId, cardFallback) {
    const prod = cardFallback || findProduct(productId);
    const body = document.getElementById('dk-quickview-body');
    if (!body) return;

    body.innerHTML = `
      <div class="bg-theme-secondary p-6 flex items-center justify-center">
        <img src="${ASSET_PREFIX}${prod.image}" alt="${prod.name}" class="w-full max-h-80 object-contain rounded-2xl border border-theme-strong shadow-theme-soft bg-theme-surface p-3" />
      </div>
      <div class="p-6 sm:p-8 flex flex-col justify-between space-y-4">
        <div>
          <span class="sacred-pill">${prod.categoryLabel || 'Sacred Collection'}</span>
          <h3 class="heading-serif text-2xl sm:text-3xl font-bold text-theme-primary mt-3">${prod.name}</h3>
          <div class="flex items-center gap-3 mt-2">
            <span class="text-brand-gold font-bold text-sm">★★★★★ (${prod.rating || '4.9'})</span>
            <span class="text-xs text-theme-muted">• ${prod.reviews || 112} Verified Devotees</span>
          </div>
          <div class="flex items-baseline gap-3 mt-4">
            <span class="text-2xl font-bold text-brand-gold">${formatINR(prod.price)}</span>
            ${prod.oldPrice ? `<span class="text-sm line-through text-theme-muted">${formatINR(prod.oldPrice)}</span>` : ''}
          </div>
          <p class="text-sm text-theme-secondary mt-3 leading-relaxed">${prod.desc}</p>
          <div class="mt-4 pt-4 border-t border-theme space-y-1.5 text-xs text-theme-secondary">
            <p><strong class="text-theme-primary">Craft Guild:</strong> ${prod.craftOrigin || 'Kumbakonam & Varanasi Artisan Guild'}</p>
            <p><strong class="text-theme-primary">Material Purity:</strong> ${prod.material || '100% Virgin Temple Brass & Vedic Samagri'}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 pt-3">
          <button type="button" data-add-to-cart data-product-id="${prod.id}" class="btn-sacred-primary flex-1">Add to Sacred Bag</button>
          <button type="button" data-wishlist-btn data-product-id="${prod.id}" class="btn-sacred-outline px-4 py-3" aria-label="Save to Wishlist">♥</button>
        </div>
      </div>
    `;
    openModal('dk-quickview-modal');
    syncWishlistButtons();
  }

  // =========================================================================
  // 5. PRODUCTS PAGE FILTERING, SEARCH & SORTING
  // =========================================================================
  function initProductsCatalog() {
    const grid = document.getElementById('products-catalog-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('[data-catalog-card]'));
    const filterBtns = Array.from(document.querySelectorAll('[data-category-filter]'));
    const searchInput = document.getElementById('catalog-search-input');
    const sortSelect = document.getElementById('catalog-sort-select');
    const countEl = document.getElementById('catalog-results-count');
    const emptyEl = document.getElementById('catalog-empty-state');
    const resetBtn = document.getElementById('catalog-reset-btn');

    let activeCategory = 'all';
    let searchQuery = '';
    let sortMode = 'featured';

    // Check URL parameters (e.g., ?category=diyas)
    const params = new URLSearchParams(window.location.search);
    if (params.get('category')) {
      activeCategory = params.get('category').toLowerCase();
    }
    if (params.get('q')) {
      searchQuery = params.get('q');
      if (searchInput) searchInput.value = searchQuery;
    }

    function applyCatalogFilters() {
      // Update active state on filter buttons
      filterBtns.forEach((btn) => {
        const cat = btn.getAttribute('data-category-filter');
        if (cat === activeCategory) {
          btn.classList.add('bg-[#702B32]', 'text-[#FFF9EF]', 'border-[#C69B45]');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.classList.remove('bg-[#702B32]', 'text-[#FFF9EF]', 'border-[#C69B45]');
          btn.setAttribute('aria-pressed', 'false');
        }
      });

      const q = searchQuery.trim().toLowerCase();
      const visibleCards = [];

      cards.forEach((card) => {
        const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
        const cardTitle = (card.getAttribute('data-name') || '').toLowerCase();
        const cardTags = (card.getAttribute('data-tags') || '').toLowerCase();

        const matchesCategory = activeCategory === 'all' || cardCat === activeCategory || cardTags.includes(activeCategory);
        const matchesSearch = !q || cardTitle.includes(q) || cardCat.includes(q) || cardTags.includes(q);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
          visibleCards.push(card);
        } else {
          card.classList.add('hidden');
        }
      });

      // Sort visible cards
      visibleCards.sort((a, b) => {
        const priceA = Number(a.getAttribute('data-price') || 0);
        const priceB = Number(b.getAttribute('data-price') || 0);
        const ratingA = Number(a.getAttribute('data-rating') || 0);
        const ratingB = Number(b.getAttribute('data-rating') || 0);
        const nameA = (a.getAttribute('data-name') || '').toLowerCase();
        const nameB = (b.getAttribute('data-name') || '').toLowerCase();
        const orderA = Number(a.getAttribute('data-order') || 0);
        const orderB = Number(b.getAttribute('data-order') || 0);

        if (sortMode === 'price-asc') return priceA - priceB;
        if (sortMode === 'price-desc') return priceB - priceA;
        if (sortMode === 'rating-desc') return ratingB - ratingA;
        if (sortMode === 'name-asc') return nameA.localeCompare(nameB);
        return orderA - orderB;
      });

      visibleCards.forEach((card) => grid.appendChild(card));

      if (countEl) {
        countEl.textContent = `Showing ${visibleCards.length} of ${cards.length} Sacred Creations`;
      }
      if (emptyEl) {
        emptyEl.classList.toggle('hidden', visibleCards.length > 0);
      }
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-category-filter') || 'all';
        applyCatalogFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value || '';
        applyCatalogFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sortMode = e.target.value || 'featured';
        applyCatalogFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'all';
        searchQuery = '';
        sortMode = 'featured';
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'featured';
        applyCatalogFilters();
      });
    }

    applyCatalogFilters();
  }

  // =========================================================================
  // 6. FESTIVAL CALENDAR INTERACTIVE FILTERING
  // =========================================================================
  function initFestivalCalendar() {
    const filterBtns = Array.from(document.querySelectorAll('[data-festival-filter]'));
    const items = Array.from(document.querySelectorAll('[data-festival-card]'));
    if (filterBtns.length === 0 || items.length === 0) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-festival-filter') || 'all';
        filterBtns.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle('bg-[#702B32]', isActive);
          b.classList.toggle('text-[#FFF9EF]', isActive);
          b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        items.forEach((card) => {
          const tags = (card.getAttribute('data-festival-season') || '').toLowerCase();
          if (target === 'all' || tags.includes(target)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // =========================================================================
  // 7. TESTIMONIAL SLIDER & FAQ ACCORDIONS
  // =========================================================================
  function initTestimonialsAndFaq() {
    // FAQ Accordions
    document.querySelectorAll('[data-faq-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panelId = btn.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : btn.nextElementSibling;
        const icon = btn.querySelector('[data-faq-icon]');
        if (!panel) return;

        const isOpen = !panel.classList.contains('hidden');
        panel.classList.toggle('hidden', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        if (icon) {
          icon.classList.toggle('rotate-180', !isOpen);
          if (!icon.querySelector('svg')) {
            icon.textContent = isOpen ? '+' : '−';
          }
        }
      });
    });

    // Testimonial Filter/Highlight Tabs on Home 1
    const revTabs = Array.from(document.querySelectorAll('[data-review-tab]'));
    const revCards = Array.from(document.querySelectorAll('[data-review-card]'));
    if (revTabs.length > 0 && revCards.length > 0) {
      revTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const filter = tab.getAttribute('data-review-tab');
          revTabs.forEach((t) => {
            t.classList.toggle('bg-[#702B32]', t === tab);
            t.classList.toggle('text-[#FFF9EF]', t === tab);
          });
          revCards.forEach((card) => {
            const cTag = card.getAttribute('data-review-card');
            if (filter === 'all' || cTag === filter) {
              card.classList.remove('opacity-40', 'scale-95');
            } else {
              card.classList.add('opacity-40', 'scale-95');
            }
          });
        });
      });
    }
  }

  // =========================================================================
  // 8. FORM VALIDATION (NEWSLETTER, CONTACT ENQUIRY, COMING SOON)
  // =========================================================================
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
  }

  function initForms() {
    // Newsletter forms across pages
    document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const msgEl = form.querySelector('[data-form-feedback]');
        const email = emailInput ? emailInput.value.trim() : '';

        if (!isValidEmail(email)) {
          if (emailInput) emailInput.classList.add('input-error');
          if (msgEl) {
            msgEl.textContent = 'Please enter a valid email address (e.g., devotee@domain.com).';
            msgEl.className = 'text-xs mt-2 text-red-500 font-medium block';
          }
          return;
        }

        if (emailInput) {
          emailInput.classList.remove('input-error');
          emailInput.value = '';
        }
        if (msgEl) {
          msgEl.textContent = '✦ Subhamastu! You are subscribed to DivyaKala Panchangam & Sacred Releases.';
          msgEl.className = 'text-xs mt-2 text-brand-gold font-semibold block';
        }
        showToast('Subscribed to Sacred Panchangam Alerts!');
      });
    });

    // Contact & Order Enquiry Form
    const contactForm = document.getElementById('dk-contact-enquiry-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEl = contactForm.querySelector('#enquiry-name');
        const emailEl = contactForm.querySelector('#enquiry-email');
        const phoneEl = contactForm.querySelector('#enquiry-phone');
        const topicEl = contactForm.querySelector('#enquiry-topic');
        const messageEl = contactForm.querySelector('#enquiry-message');
        const statusBox = document.getElementById('enquiry-form-status');

        let hasError = false;
        [nameEl, emailEl, phoneEl, topicEl, messageEl].forEach((el) => {
          if (el) el.classList.remove('input-error');
        });

        if (!nameEl || nameEl.value.trim().length < 2) {
          if (nameEl) nameEl.classList.add('input-error');
          hasError = true;
        }
        if (!emailEl || !isValidEmail(emailEl.value)) {
          if (emailEl) emailEl.classList.add('input-error');
          hasError = true;
        }
        const phoneClean = phoneEl ? phoneEl.value.replace(/[\s\-+()]/g, '') : '';
        if (!phoneEl || phoneClean.length < 8 || !/^\d+$/.test(phoneClean)) {
          if (phoneEl) phoneEl.classList.add('input-error');
          hasError = true;
        }
        if (!messageEl || messageEl.value.trim().length < 10) {
          if (messageEl) messageEl.classList.add('input-error');
          hasError = true;
        }

        if (hasError) {
          if (statusBox) {
            statusBox.className = 'mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-500 text-sm font-medium';
            statusBox.textContent = 'Please complete all highlighted fields accurately (valid name, email, 8+ digit phone number, and message of at least 10 characters).';
            statusBox.classList.remove('hidden');
          }
          return;
        }

        const refCode = 'DK-' + Math.floor(100000 + Math.random() * 900000);
        if (statusBox) {
          statusBox.className = 'mt-4 p-5 rounded-2xl bg-theme-secondary border border-theme-strong text-theme-primary text-sm space-y-1';
          statusBox.innerHTML = `
            <p class="font-bold text-brand-gold text-base">✦ Namaskaram, ${nameEl.value.trim()}! Your Enquiry is Registered (${refCode})</p>
            <p class="text-theme-secondary">Our Vedic Pooja Concierge in Varanasi & Kumbakonam will respond to <strong>${emailEl.value.trim()}</strong> within 4 business hours.</p>
          `;
          statusBox.classList.remove('hidden');
        }
        contactForm.reset();
        showToast(`Enquiry ${refCode} received! Our Concierge will contact you shortly.`);
      });
    }

    // Password Visibility Toggles
    const eyeSvg = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const eyeOffSvg = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499A10.75 10.75 0 0 1 2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 2.898-3.99"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>`;

    document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-toggle-password');
        const input = document.getElementById(targetId);
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.innerHTML = isPassword ? eyeOffSvg : eyeSvg;
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        btn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
      });
    });

    // Patron Sign In Form
    const loginForm = document.getElementById('dk-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailEl = loginForm.querySelector('#login-email');
        const passEl = loginForm.querySelector('#login-password');
        const statusBox = document.getElementById('login-form-status');

        let hasError = false;
        [emailEl, passEl].forEach((el) => { if (el) el.classList.remove('input-error'); });

        if (!emailEl || !isValidEmail(emailEl.value)) {
          if (emailEl) emailEl.classList.add('input-error');
          hasError = true;
        }
        if (!passEl || passEl.value.trim().length < 6) {
          if (passEl) passEl.classList.add('input-error');
          hasError = true;
        }

        if (hasError) {
          if (statusBox) {
            statusBox.className = 'p-3.5 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-500 text-xs font-semibold';
            statusBox.textContent = 'Please enter a valid email address and password of at least 6 characters.';
            statusBox.classList.remove('hidden');
          }
          return;
        }

        const username = emailEl.value.split('@')[0];
        if (statusBox) {
          statusBox.className = 'p-3.5 rounded-2xl bg-[#702B32]/10 border border-[#C69B45] text-theme-primary text-xs font-semibold space-y-1';
          statusBox.innerHTML = `
            <p class="text-brand-gold font-bold">✦ Shubh Pravesh, ${username}!</p>
            <p class="text-theme-secondary">You are signed in to your Patron Sanctum. Redirecting to offerings...</p>
          `;
          statusBox.classList.remove('hidden');
        }
        showToast(`Welcome back, ${username}! Sanctum session active.`);
        setTimeout(() => {
          window.location.href = isSubPage ? 'products.html' : 'pages/products.html';
        }, 1200);
      });
    }

    // Patron Sign Up Form
    const signupForm = document.getElementById('dk-signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEl = signupForm.querySelector('#signup-name');
        const phoneEl = signupForm.querySelector('#signup-phone');
        const emailEl = signupForm.querySelector('#signup-email');
        const passEl = signupForm.querySelector('#signup-password');
        const confirmEl = signupForm.querySelector('#signup-confirm');
        const termsEl = signupForm.querySelector('#signup-terms');
        const statusBox = document.getElementById('signup-form-status');

        let hasError = false;
        let errorMsg = 'Please complete all required fields accurately.';
        [nameEl, phoneEl, emailEl, passEl, confirmEl].forEach((el) => { if (el) el.classList.remove('input-error'); });

        if (!nameEl || nameEl.value.trim().length < 2) {
          if (nameEl) nameEl.classList.add('input-error');
          hasError = true;
        }
        const phoneClean = phoneEl ? phoneEl.value.replace(/[\s\-+()]/g, '') : '';
        if (!phoneEl || phoneClean.length < 8 || !/^\d+$/.test(phoneClean)) {
          if (phoneEl) phoneEl.classList.add('input-error');
          hasError = true;
        }
        if (!emailEl || !isValidEmail(emailEl.value)) {
          if (emailEl) emailEl.classList.add('input-error');
          hasError = true;
        }
        if (!passEl || passEl.value.trim().length < 6) {
          if (passEl) passEl.classList.add('input-error');
          hasError = true;
        }
        if (passEl && confirmEl && passEl.value !== confirmEl.value) {
          confirmEl.classList.add('input-error');
          hasError = true;
          errorMsg = 'Passwords do not match. Please ensure both passwords match.';
        }
        if (termsEl && !termsEl.checked) {
          hasError = true;
          errorMsg = 'Please agree to the Terms of Seva to register your patron account.';
        }

        if (hasError) {
          if (statusBox) {
            statusBox.className = 'p-3.5 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-500 text-xs font-semibold';
            statusBox.textContent = errorMsg;
            statusBox.classList.remove('hidden');
          }
          return;
        }

        if (statusBox) {
          statusBox.className = 'p-4 rounded-2xl bg-theme-secondary border border-theme-strong text-theme-primary text-xs space-y-1.5';
          statusBox.innerHTML = `
            <p class="font-bold text-brand-gold text-sm">✦ Subhamastu, ${nameEl.value.trim()}! Your Patron Account is Created</p>
            <p class="text-theme-secondary">Use code <strong>SHUBH10</strong> for 10% off your inaugural order. Redirecting to offerings...</p>
          `;
          statusBox.classList.remove('hidden');
        }
        showToast(`Namaskaram ${nameEl.value.trim()}! Welcome to DivyaKala Patron Circle.`);
        signupForm.reset();
        setTimeout(() => {
          window.location.href = isSubPage ? 'products.html' : 'pages/products.html';
        }, 1500);
      });
    }
  }

  // =========================================================================
  // 9. HEADER SCROLL, MOBILE MENU, BACK TO TOP & GLOBAL CLICK DELEGATION
  // =========================================================================
  function initNavigationAndListeners() {
    const header = document.querySelector('.site-header');
    const backToTopBtn = document.getElementById('dk-back-to-top');

    function handleScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (header) {
        header.classList.toggle('is-scrolled', y > 24);
      }
      if (backToTopBtn) {
        backToTopBtn.classList.toggle('hidden', y < 380);
        backToTopBtn.classList.toggle('flex', y >= 380);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Mobile Menu Drawer Toggle
    const mobileMenuBtn = document.getElementById('dk-mobile-menu-btn');
    const mobileMenu = document.getElementById('dk-mobile-menu');
    const mobileMenuClose = document.getElementById('dk-mobile-menu-close');

    function toggleMobileMenu(forceOpen) {
      if (!mobileMenu) return;
      const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !shouldOpen);
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      }
    }

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
    }
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
    }
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMobileMenu(false));
      });
    }

    // Global Search input listener
    document.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'dk-global-search-input') {
        renderGlobalSearchResults(e.target.value);
      }
    });

    // Global Click Delegation for Theme, RTL, Modals, Cart, Wishlist, Quick View
    document.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('[data-theme-toggle]');
      if (themeBtn) {
        const nextTheme = getStoredTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        return;
      }

      const rtlBtn = e.target.closest('[data-rtl-toggle]');
      if (rtlBtn) {
        const nextDir = getStoredDir() === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(nextDir);
        return;
      }

      const openSearchBtn = e.target.closest('[data-open-search]');
      if (openSearchBtn) {
        openModal('dk-search-modal');
        return;
      }

      const openCartBtn = e.target.closest('[data-open-cart]');
      if (openCartBtn) {
        openModal('dk-cart-modal');
        return;
      }

      const openWishlistBtn = e.target.closest('[data-open-wishlist]');
      if (openWishlistBtn) {
        openModal('dk-wishlist-modal');
        return;
      }

      const closeBtn = e.target.closest('[data-close-modal]');
      if (closeBtn) {
        closeModal(closeBtn.getAttribute('data-close-modal'));
        return;
      }

      // Close modal on backdrop click
      if (e.target && e.target.id && e.target.id.startsWith('dk-') && e.target.id.endsWith('-modal')) {
        closeModal(e.target.id);
        return;
      }

      const addCartBtn = e.target.closest('[data-add-to-cart]');
      if (addCartBtn) {
        const pid = addCartBtn.getAttribute('data-product-id');
        const customName = addCartBtn.getAttribute('data-product-name');
        const customPrice = addCartBtn.getAttribute('data-product-price');
        const customImg = addCartBtn.getAttribute('data-product-image');
        let prod = findProduct(pid || customName);
        if (customName && customPrice) {
          prod = {
            id: pid || customName.toLowerCase().replace(/\s+/g, '-'),
            name: customName,
            price: Number(customPrice),
            image: customImg || prod.image
          };
        }
        addToCart(prod, 1);
        return;
      }

      const wishBtn = e.target.closest('[data-wishlist-btn]');
      if (wishBtn) {
        const pid = wishBtn.getAttribute('data-product-id') || 'dk-h1-1';
        toggleWishlistItem(pid);
        return;
      }

      const qvBtn = e.target.closest('[data-quickview-btn]');
      if (qvBtn) {
        const pid = qvBtn.getAttribute('data-product-id');
        openQuickView(pid);
        return;
      }

      const qtyBtn = e.target.closest('[data-cart-qty]');
      if (qtyBtn) {
        const pid = qtyBtn.getAttribute('data-cart-qty');
        const delta = Number(qtyBtn.getAttribute('data-delta') || 0);
        const cart = getCart();
        const item = cart.find((i) => i.id === pid);
        if (item) {
          item.qty += delta;
          if (item.qty <= 0) {
            const idx = cart.indexOf(item);
            cart.splice(idx, 1);
          }
          saveCart(cart);
        }
        return;
      }

      const remBtn = e.target.closest('[data-cart-remove]');
      if (remBtn) {
        const pid = remBtn.getAttribute('data-cart-remove');
        const cart = getCart().filter((i) => i.id !== pid);
        saveCart(cart);
        return;
      }
    });

    // Escape key closes modals & mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['dk-search-modal', 'dk-cart-modal', 'dk-wishlist-modal', 'dk-quickview-modal'].forEach(closeModal);
        toggleMobileMenu(false);
      }
    });
  }

  // =========================================================================
  // 10. INITIALIZE EVERYTHING ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    injectDynamicModals();
    applyTheme(getStoredTheme());
    applyDirection(getStoredDir());
    updateHeaderBadges();
    syncWishlistButtons();
    initNavigationAndListeners();
    initProductsCatalog();
    initFestivalCalendar();
    initTestimonialsAndFaq();
    initForms();

    // Initialize Lucide icons if loaded
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Initialize AOS with reduced-motion and mobile awareness
    if (window.AOS && typeof window.AOS.init === 'function') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmallScreen = window.innerWidth < 640;
      window.AOS.init({
        duration: isSmallScreen ? 500 : 750,
        easing: 'ease-out-cubic',
        once: true,
        offset: isSmallScreen ? 30 : 70,
        disable: prefersReduced
      });
    }
  });
})();

