$(document).ready(function () {
  // ==========================================
  // 1. CAROUSEL INITIALIZATION
  // ==========================================
  const totalChairItems = 4;
  let currentChairIndex = 1;

  const $chairsCarousel = $('.chairs-carousel');
  let chairsCarousel = null;
  if ($chairsCarousel.length) {
    chairsCarousel = $chairsCarousel.owlCarousel({
      loop: true,
      margin: 24,
      nav: false,
      dots: false,
      autoplay: false,
      smartSpeed: 550,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          margin: 16
        },
        680: {
          items: 2,
          margin: 20
        },
        1024: {
          items: 3,
          margin: 24
        }
      },
      onTranslated: function (event) {
        if (event.item) {
          const index = (event.item.index % event.item.count) + 1;
          $('#carouselCounter').text(
            (index < 10 ? '0' : '') + index + ' / ' + (totalChairItems < 10 ? '0' : '') + totalChairItems
          );
        }
      }
    });

    $('#chairsPrev').on('click', function () {
      chairsCarousel.trigger('prev.owl.carousel');
    });

    $('#chairsNext').on('click', function () {
      chairsCarousel.trigger('next.owl.carousel');
    });
  }

  // Customer Testimonials / Stories Carousel
  const $storiesCarousel = $('.stories-carousel');
  if ($storiesCarousel.length) {
    const storiesCarousel = $storiesCarousel.owlCarousel({
      loop: true,
      margin: 24,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          margin: 16
        },
        768: {
          items: 2,
          margin: 20
        },
        1100: {
          items: 3,
          margin: 24
        }
      }
    });

    $('#storiesPrev').on('click', function () {
      storiesCarousel.trigger('prev.owl.carousel');
    });

    $('#storiesNext').on('click', function () {
      storiesCarousel.trigger('next.owl.carousel');
    });
  }

  // ==========================================
  // 2. HERO INTERACTIVE SWATCH PICKER & COMPANION CARD
  // ==========================================
  $('.hero-swatch').on('click', function () {
    const $this = $(this);
    const newImgSrc = $this.data('img');
    const swatchName = $this.data('name');

    $('.hero-swatch').removeClass('active');
    $this.addClass('active');

    $('#heroSwatchLabel').text(swatchName);

    const $heroImg = $('#heroMainChairImg');
    $heroImg.css('opacity', '0.2');

    setTimeout(function () {
      $heroImg.attr('src', newImgSrc);
      $heroImg.css('opacity', '1');
    }, 180);
  });

  // Floating Mini Companion Cards Cycle
  const miniCardCompanions = [
    {
      img: 'assets/images/chair-stationmaster.jpg',
      badge: "curator's pick",
      title: '«Heritage Wool Cantilever Chair»',
      price: '€920 • limited 24 pcs',
      productId: 'c2'
    },
    {
      img: 'assets/images/chair-trust-issues.jpg',
      badge: 'studio icon',
      title: '«Smoked Ash & Mustard Club Chair»',
      price: '€820 • in stock',
      productId: 'c3'
    },
    {
      img: 'assets/images/chair-silent.jpg',
      badge: 'minimalist draft',
      title: '«Minimalist Oak & Linen Lounge»',
      price: '€760 • atelier batch',
      productId: 'c4'
    }
  ];

  let currentMiniIdx = 0;

  function updateMiniCompanion(idx) {
    const item = miniCardCompanions[idx];
    if (!item) return;
    currentMiniIdx = idx;

    const $img = $('#miniCardImg');
    $img.css('opacity', '0.2');

    setTimeout(() => {
      $img.attr('src', item.img).attr('alt', item.title);
      $img.css('opacity', '1');
    }, 140);

    $('#miniCardBadge').text(item.badge);
    $('#miniCardTitle').html(item.title);
    $('#miniCardPrice').html(item.price);
    $('#openStationmasterModal').attr('data-product', item.productId);

    $('.mini-card-dots .dot').removeClass('active');
    $(`.mini-card-dots .dot[data-mini-idx="${idx}"]`).addClass('active');
  }

  $(document).on('click', '.mini-card-dots .dot', function (e) {
    e.stopPropagation();
    const idx = parseInt($(this).data('mini-idx'), 10);
    updateMiniCompanion(idx);
  });

  $(document).on('click', '#openStationmasterModal', function (e) {
    e.stopPropagation();
    const item = miniCardCompanions[currentMiniIdx];
    if (typeof openQuickModal === 'function' && item) {
      openQuickModal(item.productId);
    }
  });

  // ==========================================
  // 3. VINTAGE IN ACTION: ASYMMETRIC MONOGRAPH MAGAZINE SPREAD
  // ==========================================
  const monographFolioData = [
    {
      index: '01',
      plate: 'PLATE 01 • BERLIN KREUZBERG LOFT',
      roomName: 'Kreuzberg Loft',
      location: 'Kreuzberg · Berlin',
      coords: "52°29'N 13°23'E",
      exposure: 'Eastern Sun (3200K)',
      ceiling: '3.60m Altbau Stucco',
      medium: 'Hasselblad / Portra',
      mainImg: 'assets/images/monograph_kreuzberg_loft.jpg',
      alt: 'Kreuzberg Artist Loft interior with Jeanneret Teak Lounge Chair',
      detailImg: 'assets/images/hero-card-ready.jpg',
      detailTag: 'DETAIL 1:1',
      piece: 'Jeanneret Teak Lounge Chair',
      desc: 'Restored 1950s French cane lounge chair nestled under eastern sun in a Kreuzberg Altbau loft.',
      residentQuote: '“Morning eastern rays bathe the natural cane weave and teak with quiet warmth.”',
      soundscape: 'soundscape: 33rpm vinyl • 42dB',
      productId: 'c1',
      pinTop: '66%',
      pinLeft: '34%'
    },
    {
      index: '02',
      plate: 'PLATE 02 • COPENHAGEN VESTERBRO',
      roomName: 'Vesterbro Library',
      location: 'Vesterbro · Copenhagen',
      coords: "55°40'N 12°33'E",
      exposure: 'North Daylight (4800K)',
      ceiling: '3.20m Solid White Oak',
      medium: 'Leica M6 / Ilford HP5',
      mainImg: 'assets/images/vintage-living-room.jpg',
      alt: 'Warm retro vintage living room with amber velvet armchair',
      detailImg: 'assets/images/chair-stationmaster.jpg',
      detailTag: 'DETAIL 1:1',
      piece: 'Amber Velvet Stationmaster Chair',
      desc: 'High-back velvet lounger nestled within floor-to-ceiling solid oak library shelves.',
      residentQuote: '“The amber velvet captures rain against the bay windows like an old hearth fire.”',
      soundscape: 'soundscape: hearth crackle & rain • 38dB',
      productId: 'c2',
      pinTop: '62%',
      pinLeft: '56%'
    },
    {
      index: '03',
      plate: 'PLATE 03 • PARIS LE MARAIS',
      roomName: 'Marais Sunlit Study',
      location: 'Marais · Paris',
      coords: "48°51'N 2°21'E",
      exposure: 'South-West Sun (3800K)',
      ceiling: '3.40m 18th C. Beams',
      medium: 'Mamiya 7II / Fuji Pro',
      mainImg: 'assets/images/vintage-dining-chair.jpg',
      alt: 'Sunlit mid-century dining chair corner in Paris',
      detailImg: 'assets/images/chair-backup.jpg',
      detailTag: 'DETAIL 1:1',
      piece: 'Sunlit Cane & Oak Dining Set',
      desc: 'Double-woven French cane webbing breathing under warm herringbone afternoon rays.',
      residentQuote: '“Open weave cane breathes effortlessly through the summer heat.”',
      soundscape: 'soundscape: espresso murmur & street jazz • 35dB',
      productId: 'c3',
      pinTop: '58%',
      pinLeft: '48%'
    },
    {
      index: '04',
      plate: 'PLATE 04 • PARIS SAINT-GERMAIN',
      roomName: 'Saint-Germain Suite',
      location: 'Saint-Germain · Paris',
      coords: "48°51'N 2°20'E",
      exposure: 'Courtyard Reflection (4200K)',
      ceiling: '3.80m Haussmannian',
      medium: 'Pentax 67 / Kodak Ektar',
      mainImg: 'assets/images/boutique_paris.jpg',
      alt: 'Restored Teak Credenza & Dining Area in Parisian home',
      detailImg: 'assets/images/boutique_newyork.jpg',
      detailTag: 'DETAIL 1:1',
      piece: 'Restored Teak Credenza & Dining Area',
      desc: 'Hand-restored 1964 credenza paired with sculptural curved dining companions.',
      residentQuote: '“Generous proportions that anchor the salon without cluttering sightlines.”',
      soundscape: 'soundscape: courtyard fountain • 30dB',
      productId: 'c4',
      pinTop: '52%',
      pinLeft: '60%'
    }
  ];

  let currentMonographIdx = 0;

  function renderMonographRoom(idx) {
    const data = monographFolioData[idx];
    if (!data) return;
    currentMonographIdx = idx;

    // Update Tab Pills
    $('.mono-tab-pill').removeClass('active').attr('aria-selected', 'false');
    $(`.mono-tab-pill[data-room-idx="${idx}"]`).addClass('active').attr('aria-selected', 'true');

    // Cross-fade main image
    const $mainImg = $('#monoMainImg');
    $mainImg.css('opacity', 0.2);
    setTimeout(() => {
      $mainImg.attr('src', data.mainImg).attr('alt', data.alt);
      $mainImg.css('opacity', 1);
    }, 150);

    // Cross-fade detail image
    const $detailImg = $('#monoDetailImg');
    $detailImg.css('opacity', 0.2);
    setTimeout(() => {
      $detailImg.attr('src', data.detailImg).attr('alt', data.piece);
      $detailImg.css('opacity', 1);
    }, 150);

    // Update text content with subtle update animation
    $('#monoPlateTag').text(data.plate);
    $('#monoSoundLabel').text(data.soundscape);
    $('#monoQuote').html(`&ldquo;${data.residentQuote.replace(/^[“"]|[”"]$/g, '')}&rdquo;`);
    $('#monoWatermark').text(`ARCHIVAL FOLIO // PL. ${data.index}`);
    $('#monoPieceName').text(data.piece);
    $('#monoPieceDesc').text(data.desc);
    $('#monoDetailPill').text(data.detailTag);
    $('#monoInspectBtn').attr('data-product', data.productId);

    // Provenance Card
    $('#monoLocation').html(`${data.location}`);
    $('#monoCoords').html(data.coords);
    $('#monoExposure').text(data.exposure);
    $('#monoCeiling').text(data.ceiling);
    $('#monoMedium').text(data.medium);
    $('#monoFolioPagination').html(`PLATE ${data.index} &bull; 04`);

    // In-room pin positioning & tooltip
    const pinLeftNum = parseFloat(data.pinLeft) || 50;
    if (pinLeftNum > 45) {
      $('#monoInroomPin').addClass('pin-flip');
    } else {
      $('#monoInroomPin').removeClass('pin-flip');
    }
    $('#monoInroomPin').css({
      top: data.pinTop,
      left: data.pinLeft,
      bottom: 'auto'
    });
    $('#monoPinTooltip').text(`${data.piece} // Specimen`);
  }

  // Folio Navigation Event Listeners
  $(document).on('click', '.mono-tab-pill', function () {
    const idx = parseInt($(this).data('room-idx'), 10);
    renderMonographRoom(idx);
  });

  $(document).on('click', '#monoPrevBtn', function () {
    const nextIdx = (currentMonographIdx - 1 + monographFolioData.length) % monographFolioData.length;
    renderMonographRoom(nextIdx);
  });

  $(document).on('click', '#monoNextBtn', function () {
    const nextIdx = (currentMonographIdx + 1) % monographFolioData.length;
    renderMonographRoom(nextIdx);
  });

  // Soundscape Ambient Audio Synthesizer (Gentle vinyl crackle / room ambient noise using Web Audio API)
  let audioCtx = null;
  let noiseNode = null;
  let isSoundscapePlaying = false;

  function toggleSoundscape() {
    const $btn = $('#monoSoundscapeBtn');

    if (!isSoundscapePlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        // Generate gentle warm low-pass pink noise / vinyl crackle texture
        const bufferSize = audioCtx.sampleRate * 2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          // occasional gentle vinyl pop
          const pop = (Math.random() > 0.9996) ? (Math.random() * 0.8) : 0;
          data[i] = (b0 + b1 + b2) * 0.035 + pop;
        }

        noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;
        noiseNode.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioCtx.currentTime);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);

        noiseNode.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        noiseNode.start();

        isSoundscapePlaying = true;
        $btn.addClass('playing');
      } catch (err) {
        // Fallback: visual animation toggle if Web Audio not supported
        isSoundscapePlaying = true;
        $btn.addClass('playing');
      }
    } else {
      if (noiseNode) {
        try { noiseNode.stop(); } catch (e) {}
        noiseNode = null;
      }
      isSoundscapePlaying = false;
      $btn.removeClass('playing');
    }
  }

  $(document).on('click', '#monoSoundscapeBtn', toggleSoundscape);
  $(document).on('click', '#monoInroomPin', function () {
    const data = monographFolioData[currentMonographIdx];
    if (data && typeof openQuickModal === 'function') {
      openQuickModal(data.productId);
    }
  });

  // Initial folio load
  renderMonographRoom(0);

  // ==========================================
  // 4. CRAFT PHILOSOPHY PILLARS & HOTSPOTS
  // ==========================================
  $('.pillar-item').on('click', function () {
    $('.pillar-item').removeClass('active');
    $(this).addClass('active');
  });

  $('.hotspot-pin').on('click', function (e) {
    e.stopPropagation();
    const $hotspot = $(this).closest('.craft-hotspot');
    $('.craft-hotspot').not($hotspot).removeClass('active');
    $hotspot.toggleClass('active');
  });

  $(document).on('click', function () {
    $('.craft-hotspot').removeClass('active');
  });

  // ==========================================
  // 5. ATELIER CART SYSTEM & DRAWER (PERSISTENT)
  // ==========================================
  let cart = [];
  try {
    const savedCart = localStorage.getItem('fw_cart');
    if (savedCart) cart = JSON.parse(savedCart);
  } catch (e) {
    cart = [];
  }

  function saveCart() {
    try {
      localStorage.setItem('fw_cart', JSON.stringify(cart));
    } catch (e) {}
  }

  function updateCartUI() {
    try {
      const savedCart = localStorage.getItem('fw_cart');
      if (savedCart) cart = JSON.parse(savedCart);
    } catch (e) {}
    saveCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    $('#cartCountBadge').text(totalItems);
    $('#cartDrawerItemCount').text(`(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`);

    const $container = $('#cartItemsContainer');
    if ($container.length) {
      $container.empty();

      if (cart.length === 0) {
        $container.html(`
          <div class="cart-empty-state" id="cartEmptyState">
              <p>your atelier bag is empty.</p>
              <span>explore our new armchair drops to begin.</span>
              <a href="shop.html" class="btn-shop-empty" id="shopEmptyBtn">explore chairs</a>
          </div>
        `);
        $('#cartDrawerFooter').hide();
      } else {
        cart.forEach((item, index) => {
          $container.append(`
            <div class="cart-item">
              <img src="${item.img}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">&euro;${item.price} &times; ${item.quantity || 1}</span>
              </div>
              <button type="button" class="cart-remove-btn" data-index="${index}" title="Remove item">&times;</button>
            </div>
          `);
        });

        $('#cartSubtotalPrice').html(`&euro;${totalPrice.toLocaleString()}`);
        $('#cartDrawerFooter').show();
      }
    }
  }

  // Initial render on load
  updateCartUI();

  function addToCart(product) {
    const qtyToAdd = product.quantity ? parseInt(product.quantity, 10) : 1;
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + qtyToAdd;
    } else {
      cart.push({ ...product, quantity: qtyToAdd });
    }
    updateCartUI();
    showToast(`Added "${product.name}" to atelier bag`);
  }
  window.addToCart = addToCart;
  window.updateCartUI = updateCartUI;

  function openCartDrawer() {
    $('#cartDrawer').addClass('open');
    $('#drawerBackdrop').addClass('active');
  }

  function closeCartDrawer() {
    $('#cartDrawer').removeClass('open');
    $('#drawerBackdrop').removeClass('active');
  }

  // Note: #openCartBtn is an anchor tag linking directly to cart.html across all pages.
  $('#closeCartBtn').on('click', closeCartDrawer);

  // Close cart drawer when clicking "explore chairs" empty state CTA
  $(document).on('click', '#shopEmptyBtn, .btn-shop-empty', function () {
    closeCartDrawer();
  });

  $(document).on('click', '.cart-remove-btn', function () {
    const idx = $(this).data('index');
    const removedItem = cart[idx];
    cart.splice(idx, 1);
    updateCartUI();
    if (removedItem) {
      showToast(`Removed "${removedItem.name}" from bag`);
    }
  });

  $(document).on('click', '.add-to-bag-btn', function () {
    const product = {
      id: $(this).data('product-id') || 'c-' + Date.now(),
      name: $(this).data('name'),
      price: parseInt($(this).data('price'), 10),
      img: $(this).data('img'),
      quantity: 1
    };
    addToCart(product);
  });

  $('#checkoutBtn').on('click', function () {
    closeCartDrawer();
    window.location.href = 'checkout.html';
  });

  // ==========================================
  // 6. QUICK VIEW MODAL & CATALOG DATABASE
  // ==========================================
  const productsDB = {
    c1: {
      id: 'c1',
      name: 'Nordic Sculptural Bouclé Lounge',
      price: 840,
      img: 'assets/images/hero-card-ready.jpg',
      gallery: [
        'assets/images/hero-card-ready.jpg',
        'assets/images/chair-backup.jpg',
        'assets/images/hero-cane-chair.jpg',
        'assets/images/craft_detail.jpg'
      ],
      category: 'lounge',
      material: 'Virgin Sage Bouclé · Solid European Ash',
      badge: 'batch #04 drop · atelier release',
      desc: 'Monolithic sculptural armchair tailored in sage green textured bouclé with deep interior ergonomics and reinforced timber bracing.',
      specs: '88cm W × 82cm D × 76cm H · Solid Ash Frame · In Stock',
      wood: 'Natural Nordic Ash',
      upholstery: 'Sage Green Bouclé',
      leadTime: 'In stock — dispatches in 48h'
    },
    c2: {
      id: 'c2',
      name: 'Atelier Cane & Cognac Armchair',
      price: 790,
      img: 'assets/images/hero-card-custom.jpg',
      gallery: [
        'assets/images/hero-card-custom.jpg',
        'assets/images/chair-decisions.jpg',
        'assets/images/craft_cane_weaving.jpg',
        'assets/images/hero-cane-chair.jpg'
      ],
      category: 'cane',
      material: 'Hand-Woven Natural Cane · Cognac Velvet',
      badge: 'atelier craft · heritage line',
      desc: 'Hand-woven natural cane webbing paired with cognac velvet and angled solid wood craftsmanship.',
      specs: '82cm W × 80cm D × 78cm H · European Ash & Cane · In Stock',
      wood: 'Solid Plantation Teak',
      upholstery: 'Cognac Silk Velvet',
      leadTime: 'In stock — dispatches in 48h'
    },
    c3: {
      id: 'c3',
      name: 'Smoked Ash & Mustard Club Chair',
      price: 820,
      img: 'assets/images/chair-trust-issues.jpg',
      gallery: [
        'assets/images/chair-trust-issues.jpg',
        'assets/images/chair-backup.jpg',
        'assets/images/craft_detail.jpg',
        'assets/images/weekend.jpg'
      ],
      category: 'lounge',
      material: 'Mustard Cotton Velvet · Smoked Ash Framing',
      badge: 'studio icon · best seller',
      desc: 'Sculptural ash framing meeting rich mustard velvet cushions with natural latex ergonomic interior core.',
      specs: '80cm W × 78cm D × 75cm H · Smoked Ash · In Stock',
      wood: 'Smoked Mountain Ash',
      upholstery: 'Ochre Club Velvet',
      leadTime: 'In stock — dispatches in 48h'
    },
    c4: {
      id: 'c4',
      name: 'Minimalist Oak & Linen Lounge',
      price: 760,
      img: 'assets/images/chair-silent.jpg',
      gallery: [
        'assets/images/chair-silent.jpg',
        'assets/images/hero-card-terracotta.jpg',
        'assets/images/craft_detail.jpg',
        'assets/images/vintage-living-room.jpg'
      ],
      category: 'lounge',
      material: 'Belgian Oatmeal Linen · Curved White Oak',
      badge: 'minimalist · quiet luxury',
      desc: 'Oatmeal textured linen tailored over curved solid oak architecture for contemplative seating spaces.',
      specs: '85cm W × 82cm D × 74cm H · Natural Oak · In Stock',
      wood: 'Curved European White Oak',
      upholstery: 'Belgian Oatmeal Linen',
      leadTime: 'In stock — dispatches in 48h'
    },
    stationmaster: {
      id: 'stationmaster',
      name: 'Heritage Wool Cantilever Chair',
      price: 920,
      img: 'assets/images/chair-stationmaster.jpg',
      gallery: [
        'assets/images/chair-stationmaster.jpg',
        'assets/images/hero-chair.jpg',
        'assets/images/craft_detail.jpg',
        'assets/images/monograph_kreuzberg_loft.jpg'
      ],
      category: 'limited',
      material: 'Forest Virgin Wool · Kiln-Dried Teak Bracing',
      badge: 'curator selection · limited 24 pcs',
      desc: 'Signature forest-green tailored armchair with curved cantilevered armrests and heavy virgin Scandinavian wool.',
      specs: '90cm W × 86cm D × 80cm H · Kiln-Dried Ash · Limited Edition',
      wood: 'Kiln-Dried Ash Bracing',
      upholstery: 'Forest Virgin Wool',
      leadTime: 'Limited batch — 6 pieces remaining'
    },
    credenza: {
      id: 'credenza',
      name: 'Atelier Smoked Ash Lowboard Credenza',
      price: 1450,
      img: 'assets/images/dept_credenza.jpg',
      gallery: [
        'assets/images/dept_credenza.jpg',
        'assets/images/vintage-credenza.jpg',
        'assets/images/craft_detail.jpg',
        'assets/images/vintage-living-room.jpg'
      ],
      category: 'storage',
      material: 'Solid Smoked Ash · Brass Sliding Hardware',
      badge: 'architectural case goods',
      desc: 'Hand-planed smoked ash credenza with soft-close tambour sliding panels and solid brass recessed hardware.',
      specs: '180cm W × 45cm D × 58cm H · Solid Ash · In Stock',
      wood: 'Smoked European Ash',
      upholstery: 'Natural Wax Finish',
      leadTime: 'In stock — dispatches in 72h'
    },
    stools: {
      id: 'stools',
      name: 'Sculptural Teak Counter & Dining Stool',
      price: 480,
      img: 'assets/images/dept_dining_stools.jpg',
      gallery: [
        'assets/images/dept_dining_stools.jpg',
        'assets/images/vintage-dining-chair.jpg',
        'assets/images/craft_detail.jpg',
        'assets/images/weekend.jpg'
      ],
      category: 'dining',
      material: 'Solid Plantation Teak · Ergonomic Saddle',
      badge: 'artisan dining drop',
      desc: 'Carved saddle seat contouring to the body, supported by tapered 4-leg architectural splay with blind tenons.',
      specs: '46cm W × 42cm D × 68cm H · Plantation Teak · In Stock',
      wood: 'Plantation Teak',
      upholstery: 'Hand-Rubbed Linseed Oil',
      leadTime: 'In stock — dispatches in 48h'
    },
    lighting: {
      id: 'lighting',
      name: 'Hand-Turned Terracotta Pendant',
      price: 340,
      img: 'assets/images/dept_lighting_objects.jpg',
      gallery: [
        'assets/images/dept_lighting_objects.jpg',
        'assets/images/craft_detail.jpg',
        'assets/images/monograph_kreuzberg_loft.jpg',
        'assets/images/hero-card-terracotta.jpg'
      ],
      category: 'lighting',
      material: 'Raw Terracotta Clay · Braided Textile Cord',
      badge: 'ceramic studio drop',
      desc: 'Thrown on a slow potter’s wheel in Copenhagen and kiln-fired to porous matte terracotta perfection.',
      specs: '32cm Diam × 24cm H · Matte Terracotta · In Stock',
      wood: 'Turned Ash Finial',
      upholstery: 'Braided Wheat Cord',
      leadTime: 'In stock — dispatches in 24h'
    }
  };

  window.productsDB = productsDB;

  let selectedModalProduct = null;

  function openQuickModal(productKey) {
    const product = productsDB[productKey];
    if (!product) return;

    selectedModalProduct = product;
    $('#modalBadge').text(product.badge);
    $('#modalTitle').text(product.name);
    $('#modalPrice').html(`&euro;${product.price}`);
    $('#modalDesc').text(product.desc);
    $('#modalChairImg').attr('src', product.img);

    $('#quickModalBackdrop').addClass('active');
  }

  function closeQuickModal() {
    $('#quickModalBackdrop').removeClass('active');
  }

  $(document).on('click', '.btn-quick-view, [data-quick-view]', function () {
    const prodKey = $(this).data('product');
    openQuickModal(prodKey);
  });

  $('#openStationmasterModal').on('click', function () {
    openQuickModal('stationmaster');
  });

  $('#closeQuickModalBtn').on('click', closeQuickModal);

  // Close quick modal on outside backdrop click
  $('#quickModalBackdrop').on('click', function (e) {
    if ($(e.target).is('#quickModalBackdrop')) {
      closeQuickModal();
    }
  });

  $('#modalAddToCartBtn').on('click', function () {
    if (selectedModalProduct) {
      addToCart({
        id: selectedModalProduct.id,
        name: selectedModalProduct.name,
        price: selectedModalProduct.price,
        img: selectedModalProduct.img
      });
      closeQuickModal();
    }
  });

  // ==========================================
  // 7. MOBILE MENU DRAWER
  // ==========================================
  $('#mobileMenuBtn').on('click', function () {
    $('#mobileDrawer').addClass('open');
    $('#drawerBackdrop').addClass('active');
  });

  function closeMobileDrawer() {
    $('#mobileDrawer').removeClass('open');
    $('#drawerBackdrop').removeClass('active');
  }

  $('#closeMobileMenuBtn').on('click', closeMobileDrawer);
  $('.mobile-nav-link').on('click', closeMobileDrawer);

  $('#drawerBackdrop').on('click', function () {
    closeCartDrawer();
    closeMobileDrawer();
    closeQuickModal();
  });

  // ==========================================
  // OVERLAY SCROLL & KEYBOARD STABILITY
  // Keeps page scrollbar-y permanently visible
  // without page twitch or background scrolling
  // ==========================================
  function isOverlayOpen() {
    return $('#cartDrawer').hasClass('open') || 
           $('#quickModalBackdrop').hasClass('active') || 
           $('#mobileDrawer').hasClass('open');
  }

  // Prevent background wheel scrolling when overlay is active
  window.addEventListener('wheel', function (e) {
    if (isOverlayOpen()) {
      if (!e.target.closest('.cart-items-wrap, .quick-modal, .mobile-drawer')) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  // Prevent background touch scrolling on mobile
  window.addEventListener('touchmove', function (e) {
    if (isOverlayOpen()) {
      if (!e.target.closest('.cart-items-wrap, .quick-modal, .mobile-drawer')) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  // Close overlays on Escape key
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && isOverlayOpen()) {
      closeCartDrawer();
      closeMobileDrawer();
      closeQuickModal();
    }
  });

  // ==========================================
  // 8. WISHLIST TOGGLE & TOAST (PERSISTENT)
  // ==========================================
  let wishlist = [];
  try {
    const savedWish = localStorage.getItem('fw_wishlist');
    if (savedWish) wishlist = JSON.parse(savedWish);
  } catch (e) {
    wishlist = [];
  }

  function saveWishlist() {
    try {
      localStorage.setItem('fw_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
    updateWishlistUI();
  }

  function updateWishlistUI() {
    try {
      const savedWish = localStorage.getItem('fw_wishlist');
      if (savedWish) wishlist = JSON.parse(savedWish);
    } catch (e) {}
    const count = wishlist.length;
    $('#wishlistCountBadge, .wishlist-count-badge').text(count);
    $('.chair-wishlist-btn').each(function () {
      const pid = $(this).data('product-id') || $(this).closest('[data-product-id]').data('product-id');
      if (pid && wishlist.some(item => item.id === pid)) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }
  window.updateWishlistUI = updateWishlistUI;

  updateWishlistUI();

  $(document).on('click', '.chair-wishlist-btn', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const $btn = $(this);
    const pid = $btn.data('product-id') || $btn.closest('[data-product-id]').data('product-id') || ('specimen-' + Date.now());
    const pieceName = $btn.data('name') || $btn.closest('[data-name]').data('name') || 'Atelier Specimen';
    const price = parseInt($btn.data('price') || $btn.closest('[data-price]').data('price') || 840, 10);
    const img = $btn.data('img') || $btn.closest('[data-img]').data('img') || 'assets/images/chair-backup.jpg';

    const index = wishlist.findIndex(item => item.id === pid);
    if (index > -1) {
      wishlist.splice(index, 1);
      $btn.removeClass('active');
      showToast(`Removed &ldquo;${pieceName}&rdquo; from wishlist`);
    } else {
      wishlist.push({ id: pid, name: pieceName, price: price, img: img });
      $btn.addClass('active');
      showToast(`Saved &ldquo;${pieceName}&rdquo; to your private wishlist`);
    }
    saveWishlist();
  });

  // Swatch interaction for cards
  $(document).on('click', '.c-swatch', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  // Department card click delegation (smoothly scroll to target)
  $(document).on('click', '.dept-card', function (e) {
    const $link = $(this).find('.dept-action-pill');
    if ($link.length && $link.attr('href')) {
      e.preventDefault();
      const target = $link.attr('href');
      if (target && target.startsWith('#')) {
        const $targetEl = $(target);
        if ($targetEl.length) {
          $('html, body').animate({ scrollTop: $targetEl.offset().top - 70 }, 600);
        }
      }
    }
  });

  // ==========================================
  // 9. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message) {
    const $toast = $(`
      <div class="toast">
        <span class="toast-spark" aria-hidden="true">✦</span>
        <span>${message}</span>
      </div>
    `);

    $('#toastContainer').append($toast);

    setTimeout(() => {
      $toast.fadeOut(300, function () {
        $(this).remove();
      });
    }, 3200);
  }
  window.showToast = showToast;

  // ==========================================
  // 10. NEWSLETTER SUBMISSION
  // ==========================================
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#newsletterEmail').val().trim();
    if (email) {
      $('#newsletterFeedback').text(`Welcome, ${email}. You will receive the next private archive release.`).fadeIn();
      $('#newsletterEmail').val('');
      showToast('VIP archive invitation confirmed');
    }
  });

  // ==========================================
  // 11. SCROLL TO TOP
  // ==========================================
  $('#scrollTopBtn').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // ==========================================
  // 12. HERO INTERACTIVE MATERIAL SWATCH BAR
  // ==========================================
  $('.swatch-chip').on('click', function () {
    const $this = $(this);
    if ($this.hasClass('active')) return;

    $('.swatch-chip').removeClass('active');
    $this.addClass('active');

    const finish = $this.data('finish');
    const grain = $this.data('grain');
    const label = $this.data('label');

    // Smoothly update the live spec description
    const $specText = $('#swatchSpecText');
    $specText.css('opacity', 0);
    setTimeout(() => {
      $specText.html(grain);
      $specText.css('opacity', 1);
    }, 180);

    // Apply wood tone finish to the featured chair
    const $chairImg = $('#heroMainChairImg');
    $chairImg.removeClass('finish-teak finish-walnut finish-ebonized finish-oak');
    $chairImg.addClass(`finish-${finish}`);
  });

  // ==========================================
  // HERO CREATIVE INTERACTIONS: HOTSPOTS, BLUEPRINT SPECS & 3D TILT
  // ==========================================

  // 1. Craft Anatomy Hotspots Toggle
  $(document).on('click', '.hero-hotspot', function (e) {
    e.stopPropagation();
    const $this = $(this);
    const wasActive = $this.hasClass('active');
    $('.hero-hotspot').removeClass('active');
    if (!wasActive) {
      $this.addClass('active');
    }
  });

  // Hotspots Keyboard Access
  $(document).on('keydown', '.hero-hotspot', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).trigger('click');
    } else if (e.key === 'Escape') {
      $('.hero-hotspot').removeClass('active');
    }
  });

  // Click outside to close hotspots
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.hero-hotspot').length) {
      $('.hero-hotspot').removeClass('active');
    }
  });

  // 2. Architectural Blueprint Dimensions Mode Toggle
  $('#toggleDimensionsBtn').on('click', function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $blueprint = $('#heroBlueprintLayer');
    const $hotspots = $('#heroHotspotsLayer');
    const isActivating = !$btn.hasClass('active');

    $btn.toggleClass('active', isActivating);
    $blueprint.toggleClass('active', isActivating);

    if (isActivating) {
      $btn.find('.btn-label').text('Exit Specs');
      $hotspots.css({ opacity: 0, pointerEvents: 'none' });
      $('.hero-hotspot').removeClass('active');
    } else {
      $btn.find('.btn-label').html('360&deg; Specs');
      $hotspots.css({ opacity: 1, pointerEvents: 'auto' });
    }
  });

  // 3. Subtle 3D Parallax Tilt for the Hero Chair Canvas
  const $heroStage = $('#heroChairStage');
  const $chairCanvas = $('#heroChairCanvas');
  const $giantWord = $('.hero-giant-word');

  if ($heroStage.length && $chairCanvas.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let tiltTicking = false;

    $('#hero').on('mousemove', function (e) {
      if (window.innerWidth <= 992) return; // desktop only
      if (!tiltTicking) {
        window.requestAnimationFrame(() => {
          const rect = $heroStage[0].getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
          const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

          const rotateY = deltaX * 8; // -8deg to +8deg
          const rotateX = -deltaY * 6; // -6deg to +6deg

          $chairCanvas.css('transform', `perspective(1100px) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg) translateY(-2px)`);
          
          if ($giantWord.length) {
            $giantWord.css('transform', `translateX(${(-deltaX * 6).toFixed(1)}px)`);
          }
          tiltTicking = false;
        });
        tiltTicking = true;
      }
    });

    $('#hero').on('mouseleave', function () {
      $chairCanvas.css('transform', 'perspective(1100px) rotateY(0deg) rotateX(0deg) translateY(0px)');
      if ($giantWord.length) {
        $giantWord.css('transform', 'none');
      }
    });
  }

  // Enable Enter / Space key press for interactive quick-view cards
  $(document).on('keydown', '.btn-quick-view[role="button"], [data-quick-view][role="button"]', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).click();
    }
  });

  // 13. LIVING SUITE BUNDLE INTERACTIVE LOGIC & ADD TO CART
  // ==========================================
  function updateSuiteBundlePricing() {
    const chairChecked = $('.bundle-item-checkbox[data-item="chair"]').is(':checked');
    const credenzaChecked = $('.bundle-item-checkbox[data-item="credenza"]').is(':checked');

    $('.bundle-item[data-item="chair"]').toggleClass('disabled', !chairChecked);
    $('.bundle-item[data-item="credenza"]').toggleClass('disabled', !credenzaChecked);

    $('.suite-pin[data-target="chair"]').css('opacity', chairChecked ? '1' : '0.35');
    $('.suite-pin[data-target="credenza"]').css('opacity', credenzaChecked ? '1' : '0.35');

    let total = 0;
    let originalTotal = 0;

    if (chairChecked && credenzaChecked) {
      originalTotal = 2290;
      total = 2060; // 10% suite discount
      $('#suiteOriginalPrice').text('€2,290').show();
      $('#suiteSavingsBadge').removeClass('hidden');
      $('#suitePrivilegeTag').removeClass('disabled').text('10% PRIVILEGE APPLIED');
      $('#suiteBtnText').text('add complete suite to bag');
      $('#addSuiteBundleBtn').prop('disabled', false).css('opacity', '1');
    } else if (chairChecked) {
      total = 840;
      $('#suiteOriginalPrice').hide();
      $('#suiteSavingsBadge').addClass('hidden');
      $('#suitePrivilegeTag').addClass('disabled').text('INDIVIDUAL SPECIMEN');
      $('#suiteBtnText').text('add armchair to bag');
      $('#addSuiteBundleBtn').prop('disabled', false).css('opacity', '1');
    } else if (credenzaChecked) {
      total = 1450;
      $('#suiteOriginalPrice').hide();
      $('#suiteSavingsBadge').addClass('hidden');
      $('#suitePrivilegeTag').addClass('disabled').text('INDIVIDUAL SPECIMEN');
      $('#suiteBtnText').text('add credenza to bag');
      $('#addSuiteBundleBtn').prop('disabled', false).css('opacity', '1');
    } else {
      total = 0;
      $('#suiteOriginalPrice').hide();
      $('#suiteSavingsBadge').addClass('hidden');
      $('#suitePrivilegeTag').addClass('disabled').text('NO PIECES SELECTED');
      $('#suiteBtnText').text('select at least 1 piece');
      $('#addSuiteBundleBtn').prop('disabled', true).css('opacity', '0.5');
    }

    $('#suiteTotalPrice').text('€' + total.toLocaleString());
  }

  $(document).on('change', '.bundle-item-checkbox', function () {
    updateSuiteBundlePricing();
  });

  // Clicking anywhere on the bundle item toggles the checkbox
  $(document).on('click', '.bundle-item', function (e) {
    if ($(e.target).is('input[type="checkbox"]')) return;
    const $checkbox = $(this).find('.bundle-item-checkbox');
    $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
  });

  // Two-way hover / click linking between Pins and Bundle Items
  $(document).on('mouseenter', '.suite-pin', function () {
    const target = $(this).data('target');
    $('.bundle-item[data-item="' + target + '"]').addClass('highlight');
  }).on('mouseleave', '.suite-pin', function () {
    $('.bundle-item').removeClass('highlight');
  });

  $(document).on('mouseenter', '.bundle-item', function () {
    const target = $(this).data('item');
    $('.suite-pin[data-target="' + target + '"]').addClass('active');
  }).on('mouseleave', '.bundle-item', function () {
    $('.suite-pin').removeClass('active');
  });

  $('#addSuiteBundleBtn').on('click', function () {
    const chairChecked = $('.bundle-item-checkbox[data-item="chair"]').is(':checked');
    const credenzaChecked = $('.bundle-item-checkbox[data-item="credenza"]').is(':checked');

    if (!chairChecked && !credenzaChecked) {
      showToast('Please select at least one piece to add to bag');
      return;
    }

    const itemsToAdd = [];
    if (chairChecked) {
      itemsToAdd.push({ id: 'b1', name: 'Jeanneret Teak Lounge Chair', price: chairChecked && credenzaChecked ? 756 : 840, img: 'assets/images/hero-card-ready.jpg?v=2' });
    }
    if (credenzaChecked) {
      itemsToAdd.push({ id: 'b2', name: '1968 Danish Teak Credenza', price: chairChecked && credenzaChecked ? 1304 : 1450, img: 'assets/images/vintage-credenza.jpg' });
    }

    itemsToAdd.forEach(product => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
    });

    updateCartUI();
    const msg = chairChecked && credenzaChecked 
      ? 'Living Suite Bundle added to bag (10% privilege applied)' 
      : 'Selected piece added to your atelier bag';
    showToast(msg);
    openCartDrawer();
  });

  // 14. CONCIERGE & CARE FAQ ACCORDION
  // ==========================================
  $('.faq-accordion-header').on('click', function () {
    const $item = $(this).closest('.faq-accordion-item');
    const isActive = $item.hasClass('active');

    // Close all items
    $('.faq-accordion-item').removeClass('active');
    $('.faq-accordion-header').attr('aria-expanded', 'false');
    $('.faq-chevron').html('&plus;');
    $('.faq-accordion-body').slideUp(240);

    // Open clicked item if it was closed
    if (!isActive) {
      $item.addClass('active');
      $(this).attr('aria-expanded', 'true');
      $(this).find('.faq-chevron').html('&minus;');
      $item.find('.faq-accordion-body').slideDown(240);
    }
  });

  // 15. FIXED HEADER & ACTIVE NAV SCROLLSPY
  // ==========================================
  const $navLinks = $('.nav-center-links .nav-link');
  const targetSections = ['collection', 'catalog', 'suite', 'vintage', 'faq'];

  function handleHeaderScrollAndSpy() {
    const scrollY = $(window).scrollTop();

    // 1. Fixed Header Elevation
    if (scrollY > 15) {
      $('#header').addClass('scrolled');
    } else {
      $('#header').removeClass('scrolled');
    }

    // 2. Active Link ScrollSpy
    let currentSectionId = '';
    const scrollTrigger = scrollY + 160;

    targetSections.forEach(id => {
      const $sec = $('#' + id);
      if ($sec.length) {
        const top = $sec.offset().top;
        const bottom = top + $sec.outerHeight();
        if (scrollTrigger >= top && scrollTrigger < bottom) {
          currentSectionId = id;
        }
      }
    });

    $navLinks.removeClass('active');
    if (currentSectionId) {
      $(`.nav-center-links .nav-link[href="#${currentSectionId}"]`).addClass('active');
    } else {
      // Default to Home when at the top of index page
      $(`.nav-center-links .nav-link[href="#hero"]`).addClass('active');
    }
  }

  $(window).on('scroll', handleHeaderScrollAndSpy);
  handleHeaderScrollAndSpy();

  // ==========================================
  // 16. LUXURY SCROLL-REVEAL ENTRANCE ANIMATIONS (ONE-TIME TRIGGER)
  // ==========================================
  function initScrollEntranceAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Target content across all sections
    const allSections = [
      '.trust-guarantees-strip',
      '.departments-section',
      '.catalog-spotlight-section',
      '.vintage-outer-wrapper',
      '.curated-suite-section',
      '.craft-philosophy-section',
      '.stories-outer-section',
      '.concierge-faq-section',
      '.newsletter-outer-wrapper',
      '.site-footer'
    ];

    const itemSelector = [
      'h2', '.section-label', '[class*="kicker"]',
      '.philosophy-desc', '.pillar-item',
      '.owl-carousel', '[class*="-card"]:not(.owl-item [class*="-card"])',
      '.craft-image-frame', '.suite-showcase-stage'
    ].join(', ');
    const skipSelector = '[class*="hotspot"], [class*="tooltip"], [class*="pin"], .owl-item, .owl-stage, .owl-stage-outer';

    const items = [];
    document.querySelectorAll(allSections.join(', ')).forEach(section => {
      const found = Array.from(section.querySelectorAll(itemSelector)).filter(el => {
        if (el.matches(skipSelector) || el.closest(skipSelector)) return false;
        // avoid animating nested items twice
        let p = el.parentElement;
        while (p && p !== section) {
          if (p.matches(itemSelector)) return false;
          p = p.parentElement;
        }
        return true;
      });
      found.forEach(el => {
        // stagger by position among its siblings (capped)
        const idx = Array.from(el.parentElement.children).indexOf(el);
        el.style.setProperty('--rv-delay', (Math.min(idx, 5) * 80) + 'ms');
        el.classList.add(el.matches('.craft-image-frame, .suite-showcase-stage') ? 'rv-media' : 'rv-item');
        items.push(el);
      });
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('rv-in'));
      return;
    }

    const rvObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rv-in');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    items.forEach(el => rvObserver.observe(el));
  }

  initScrollEntranceAnimations();
});

