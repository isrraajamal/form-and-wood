document.addEventListener("DOMContentLoaded", function () {
    // Navbar scroll effect
    const navbar = document.getElementById("mainNavbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Close mobile nav offcanvas smoothly when an anchor link is clicked
    const navOffcanvasEl = document.getElementById("navOffcanvas");
    if (navOffcanvasEl && typeof bootstrap !== "undefined") {
        const navLinks = navOffcanvasEl.querySelectorAll(".nav-offcanvas-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                const bsNav = bootstrap.Offcanvas.getInstance(navOffcanvasEl);
                if (bsNav) bsNav.hide();
            });
        });
    }

    // Global catalog metadata dictionary for accurate pricing, category, aliases, and imagery
    const LUXURY_CATALOG = {
        'Signature Tailored Blazer': {
            name: 'Signature Tailored Blazer',
            aliases: ['Tailored Wool Blazer', 'Signature Tailored Blazer', 'Oversized Blazer'],
            price: 179.0,
            category: 'Outerwear • Virgin Wool',
            img: 'assets/images/trend_blazer.jpg'
        },
        'Classic Pleated Midi Skirt': {
            name: 'Classic Pleated Midi Skirt',
            aliases: ['Pleated Midi Skirt', 'Classic Pleated Midi Skirt'],
            price: 125.0,
            category: 'Skirts • Structured Drape',
            img: 'assets/images/trend_skirt.jpg'
        },
        'Chunky Loafers': {
            name: 'Chunky Loafers',
            aliases: ['Chunky Atelier Loafers', 'Chunky Loafers'],
            price: 109.0,
            category: 'Footwear • Tuscan Calfskin',
            img: 'assets/images/trend_loafers.jpg'
        },
        'Signature Crossbody Bag': {
            name: 'Signature Crossbody Bag',
            aliases: ['Shoulder Bag', 'Signature Crossbody Bag'],
            price: 119.0,
            category: 'Accessories • Nappa Leather',
            img: 'assets/images/trend_bag.jpg'
        },
        'Layered Gold Necklace': {
            name: 'Layered Gold Necklace',
            aliases: ['Layered Necklace', 'Layered Gold Necklace', 'Layered Gold Vermeil Necklace'],
            price: 49.0,
            category: 'Jewelry • 18K Recycled Vermeil',
            img: 'assets/images/trend_necklace.jpg'
        },
        'Tortoiseshell Sunglasses': {
            name: 'Tortoiseshell Sunglasses',
            aliases: ['Cat-Eye Glasses', 'Tortoiseshell Sunglasses', 'Cat-Eye Bio-Acetate Glasses'],
            price: 39.0,
            category: 'Eyewear • Bio-Acetate',
            img: 'assets/images/trend_sunglasses.jpg'
        },
        'Monochrome Linen Set': {
            name: 'Monochrome Linen Set',
            aliases: ['Monochrome Linen Set', 'Monochrome Linen Trench Set'],
            price: 210.0,
            category: 'Tailoring • Organic Linen',
            img: 'assets/images/city.jpg'
        },
        'The Executive Blazer Look': {
            name: 'The Executive Blazer Look',
            aliases: ['The Executive Blazer Look', 'Executive Double-Breasted Suit'],
            price: 265.0,
            category: 'Suiting • Double-Breasted',
            img: 'assets/images/power.jpg'
        },
        'Weekend Knit & Drape Trousers': {
            name: 'Weekend Knit & Drape Trousers',
            aliases: ['Weekend Knit & Drape Trousers'],
            price: 165.0,
            category: 'Knitwear • Cashmere Blend',
            img: 'assets/images/weekend.jpg'
        },
        'Sunset Amber Silk Ensemble': {
            name: 'Sunset Amber Silk Ensemble',
            aliases: ['Sunset Amber Silk Ensemble'],
            price: 245.0,
            category: 'Evening • Mulberry Silk',
            img: 'assets/images/sunset.jpg'
        }
    };

    function resolveProductInfo(inputName) {
        if (!inputName) return { name: 'Curated Piece', price: 150.0, category: 'Luxury Capsule', img: 'assets/images/trend_bag.jpg' };
        const clean = inputName.trim();
        if (LUXURY_CATALOG[clean]) return LUXURY_CATALOG[clean];
        for (const key in LUXURY_CATALOG) {
            const item = LUXURY_CATALOG[key];
            if (item.aliases && item.aliases.some(a => a.toLowerCase() === clean.toLowerCase())) {
                return item;
            }
        }
        return {
            name: clean,
            price: 150.0,
            category: 'Luxury Capsule',
            img: (typeof imageMap !== 'undefined' && imageMap[clean]) ? imageMap[clean] : 'assets/images/trend_bag.jpg'
        };
    }

    // Wishlist State Management
    let wishlist = [];
    function loadWishlistFromStorage() {
        try {
            const savedWishlist = localStorage.getItem("verde_wishlist");
            if (savedWishlist !== null) {
                wishlist = JSON.parse(savedWishlist);
                if (!Array.isArray(wishlist)) wishlist = [];
            } else {
                // Initial curated luxury archive for first-time visitors
                wishlist = [
                    { name: 'Signature Tailored Blazer', price: 179.0, category: 'Outerwear • Virgin Wool', img: 'assets/images/trend_blazer.jpg' },
                    { name: 'Classic Pleated Midi Skirt', price: 125.0, category: 'Skirts • Structured Drape', img: 'assets/images/trend_skirt.jpg' },
                    { name: 'Signature Crossbody Bag', price: 119.0, category: 'Accessories • Nappa Leather', img: 'assets/images/trend_bag.jpg' }
                ];
                localStorage.setItem("verde_wishlist", JSON.stringify(wishlist));
            }
        } catch (e) {
            wishlist = [];
        }
        return wishlist;
    }
    loadWishlistFromStorage();

    const wishlistBadge = document.getElementById("wishlistCount");
    updateWishlistBadge();
    syncWishlistUIButtons();

    function saveWishlistState() {
        try {
            localStorage.setItem("verde_wishlist", JSON.stringify(wishlist));
        } catch (e) {
            console.warn("Could not save wishlist to localStorage:", e);
        }
    }

    function updateWishlistBadge() {
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
            wishlistBadge.style.transform = "scale(1.25)";
            setTimeout(() => {
                wishlistBadge.style.transform = "scale(1)";
            }, 250);
        }
        saveWishlistState();
    }

    function isProductInWishlist(productName) {
        if (!productName || !wishlist || !wishlist.length) return false;
        const resolved = resolveProductInfo(productName);
        return wishlist.some(item => {
            if (item.name === productName || item.name === resolved.name) return true;
            const itemResolved = resolveProductInfo(item.name);
            return itemResolved.name === resolved.name;
        });
    }

    function syncWishlistUIButtons() {
        // Synchronize all wishlist heart buttons across the active page
        const wishlistButtons = document.querySelectorAll(".btn-wishlist, button[onclick*='toggleWishlist']");
        wishlistButtons.forEach(btn => {
            const onclickAttr = btn.getAttribute("onclick") || "";
            const match = onclickAttr.match(/toggleWishlist\s*\(\s*this\s*,\s*['"]([^'"]+)['"]/);
            if (match && match[1]) {
                const pName = match[1];
                const saved = isProductInWishlist(pName);
                const icon = btn.querySelector("i");
                if (saved) {
                    btn.classList.add("active");
                    if (icon) {
                        icon.classList.remove("bi-heart");
                        icon.classList.add("bi-heart-fill");
                    }
                } else {
                    btn.classList.remove("active");
                    if (icon) {
                        icon.classList.remove("bi-heart-fill");
                        icon.classList.add("bi-heart");
                    }
                }
            }
        });
    }

    window.toggleWishlist = function (btn, productName = "Item", price, category) {
        const info = resolveProductInfo(productName);
        const targetName = info.name;

        let itemPrice = price;
        let itemCategory = category;
        let itemImg = info.img;

        if (btn) {
            const card = btn.closest(".product-card") || btn.closest(".wishlist-card");
            if (card) {
                if (!itemPrice) {
                    const priceEl = card.querySelector(".product-price");
                    if (priceEl) {
                        const parsed = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ''));
                        if (!isNaN(parsed) && parsed > 0) itemPrice = parsed;
                    }
                }
                if (!itemCategory) {
                    const catEl = card.querySelector(".product-category");
                    if (catEl) itemCategory = catEl.textContent.trim();
                }
                const imgEl = card.querySelector("img");
                if (imgEl && imgEl.getAttribute("src")) {
                    itemImg = imgEl.getAttribute("src");
                }
            }
        }
        itemPrice = itemPrice || info.price;
        itemCategory = itemCategory || info.category;

        const existingIdx = wishlist.findIndex(item => {
            if (item.name === targetName || item.name === productName) return true;
            return resolveProductInfo(item.name).name === targetName;
        });

        if (existingIdx > -1) {
            wishlist.splice(existingIdx, 1);
            showToast(`Removed "${targetName}" from Wishlist`);
        } else {
            wishlist.push({
                name: targetName,
                price: itemPrice,
                category: itemCategory,
                img: itemImg
            });
            showToast(`Added "${targetName}" to your Wishlist`);
        }

        updateWishlistBadge();
        syncWishlistUIButtons();

        // If on wishlist page, re-render immediately
        if (typeof renderWishlistPage === "function") {
            renderWishlistPage();
        }
    };

    window.getWishlistData = function() {
        loadWishlistFromStorage();
        return wishlist;
    };

    window.syncWishlistUIButtons = syncWishlistUIButtons;

    // =========================================================================
    // Shopping Bag State & Offcanvas Drawer Management
    // =========================================================================
    let cart = [];
    const cartBadge = document.getElementById("cartCount");
    const drawerCartBadge = document.getElementById("drawerCartBadge");
    const cartItemsList = document.getElementById("cartItemsList");
    const cartEmptyState = document.getElementById("cartEmptyState");
    const cartSummaryFooter = document.getElementById("cartSummaryFooter");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const checkoutTotalBtn = document.getElementById("checkoutTotalBtn");
    const shippingProgressBar = document.getElementById("shippingProgressBar");
    const shippingProgressText = document.getElementById("shippingProgressText");
    const shippingPercent = document.getElementById("shippingPercent");
    const cartShippingValue = document.getElementById("cartShippingValue");

    // Product image mapping helper
    const imageMap = {
        'Signature Tailored Blazer': 'assets/images/trend_blazer.jpg',
        'Tailored Wool Blazer': 'assets/images/trend_blazer.jpg',
        'Classic Pleated Midi Skirt': 'assets/images/trend_skirt.jpg',
        'Pleated Midi Skirt': 'assets/images/trend_skirt.jpg',
        'Signature Crossbody Bag': 'assets/images/trend_bag.jpg',
        'Tortoiseshell Sunglasses': 'assets/images/trend_sunglasses.jpg',
        'Oversized Blazer': 'assets/images/trend_blazer.jpg',
        'Chunky Loafers': 'assets/images/trend_loafers.jpg',
        'Chunky Atelier Loafers': 'assets/images/trend_loafers.jpg',
        'Layered Necklace': 'assets/images/trend_necklace.jpg',
        'Layered Gold Necklace': 'assets/images/trend_necklace.jpg',
        'Layered Gold Vermeil Necklace': 'assets/images/trend_necklace.jpg',
        'Shoulder Bag': 'assets/images/trend_bag.jpg',
        'Cat-Eye Glasses': 'assets/images/trend_sunglasses.jpg',
        'Cat-Eye Bio-Acetate Glasses': 'assets/images/trend_sunglasses.jpg',
        'Monochrome Linen Set': 'assets/images/city.jpg',
        'Monochrome Linen Trench Set': 'assets/images/city.jpg',
        'The Executive Blazer Look': 'assets/images/power.jpg',
        'Executive Double-Breasted Suit': 'assets/images/power.jpg',
        'Weekend Knit & Drape Trousers': 'assets/images/weekend.jpg',
        'Sunset Amber Silk Ensemble': 'assets/images/sunset.jpg'
    };

    window.addToCart = function (productName, price) {
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            const imgSrc = imageMap[productName] || 'assets/images/trend_bag.jpg';
            cart.push({
                name: productName,
                price: price,
                qty: 1,
                img: imgSrc
            });
        }

        renderCart();
        showToast(`Added ${productName} ($${price.toFixed(2)}) to your bag`);

        // Automatically open offcanvas drawer for seamless shopping feedback
        const cartOffcanvasEl = document.getElementById("cartOffcanvas");
        if (cartOffcanvasEl && typeof bootstrap !== "undefined") {
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvasEl);
            bsOffcanvas.show();
        }
    };

    window.updateCartQty = function (index, change) {
        if (!cart[index]) return;
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        renderCart();
    };

    window.removeFromCart = function (index) {
        if (!cart[index]) return;
        const removed = cart.splice(index, 1);
        if (removed.length > 0) {
            showToast(`Removed "${removed[0].name}" from your bag`);
        }
        renderCart();
    };

    // Load persistent cart from localStorage if available
    try {
        const savedCart = localStorage.getItem("verde_cart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        console.warn("Could not read localStorage:", e);
    }

    function saveCartState() {
        try {
            localStorage.setItem("verde_cart", JSON.stringify(cart));
        } catch (e) {
            console.warn("Could not save to localStorage:", e);
        }
    }

    window.removeWishlistItem = function(index) {
        if (!wishlist[index]) return;
        const removed = wishlist.splice(index, 1);
        updateWishlistBadge();
        syncWishlistUIButtons();
        if (removed.length > 0) {
            showToast(`Removed "${removed[0].name}" from your Wishlist`);
        }
    };

    window.moveWishlistToCart = function(index) {
        if (!wishlist[index]) return;
        const item = wishlist[index];
        addToCart(item.name, item.price);
        wishlist.splice(index, 1);
        updateWishlistBadge();
        syncWishlistUIButtons();
        showToast(`Moved "${item.name}" directly to your Shopping Bag!`);
    };

    window.proceedToCheckout = function () {
        saveCartState();
        window.location.href = "checkout.html";
    };

    function renderCart() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        // Update badge counts
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.transform = "scale(1.35)";
            setTimeout(() => { cartBadge.style.transform = "scale(1)"; }, 250);
        }
        if (drawerCartBadge) {
            drawerCartBadge.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
        }

        // Toggle Empty state vs. Items list
        if (cart.length === 0) {
            if (cartEmptyState) cartEmptyState.style.display = "block";
            if (cartItemsList) cartItemsList.innerHTML = "";
            if (cartSummaryFooter) cartSummaryFooter.style.display = "none";
            if (shippingProgressBar) shippingProgressBar.style.width = "0%";
            if (shippingPercent) shippingPercent.textContent = "0%";
            if (shippingProgressText) {
                shippingProgressText.innerHTML = `<i class="bi bi-truck me-1"></i> Add <strong>$150.00</strong> for Complimentary Express Shipping`;
            }
            return;
        }

        if (cartEmptyState) cartEmptyState.style.display = "none";
        if (cartSummaryFooter) cartSummaryFooter.style.display = "block";

        // Render Item Cards
        if (cartItemsList) {
            cartItemsList.innerHTML = cart.map((item, idx) => `
                <div class="cart-item-card">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-thumb">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-1">
                            <h6 class="fs-8 fw-bold mb-0 text-dark">${item.name}</h6>
                            <button class="cart-remove-btn" onclick="removeFromCart(${idx})" title="Remove item">&times;</button>
                        </div>
                        <div class="fs-8 fw-semibold text-secondary-theme mb-2">$${item.price.toFixed(2)}</div>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <button class="cart-qty-btn" onclick="updateCartQty(${idx}, -1)">&minus;</button>
                                <span class="fs-8 fw-bold px-1">${item.qty}</span>
                                <button class="cart-qty-btn" onclick="updateCartQty(${idx}, 1)">&plus;</button>
                            </div>
                            <span class="fs-8 fw-bold text-dark">$${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update Subtotals
        if (cartSubtotal) cartSubtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
        if (checkoutTotalBtn) checkoutTotalBtn.innerHTML = `$${subtotalAmount.toFixed(2)} &rarr;`;

        // Free shipping progress logic ($150 target)
        const freeShippingThreshold = 150.0;
        if (subtotalAmount >= freeShippingThreshold) {
            if (shippingProgressBar) {
                shippingProgressBar.style.width = "100%";
                shippingProgressBar.classList.add("bg-success");
            }
            if (shippingPercent) shippingPercent.textContent = "100%";
            if (shippingProgressText) {
                shippingProgressText.innerHTML = `<i class="bi bi-check-circle-fill text-success me-1"></i> <strong>You've unlocked Complimentary Express Shipping!</strong>`;
            }
            if (cartShippingValue) cartShippingValue.textContent = "FREE";
        } else {
            const difference = (freeShippingThreshold - subtotalAmount).toFixed(2);
            const percent = Math.min(100, Math.round((subtotalAmount / freeShippingThreshold) * 100));
            if (shippingProgressBar) {
                shippingProgressBar.style.width = `${percent}%`;
                shippingProgressBar.classList.remove("bg-success");
            }
            if (shippingPercent) shippingPercent.textContent = `${percent}%`;
            if (shippingProgressText) {
                shippingProgressText.innerHTML = `<i class="bi bi-truck me-1"></i> Add <strong>$${difference}</strong> more for Complimentary Express Shipping`;
            }
            if (cartShippingValue) cartShippingValue.textContent = "Calculated at checkout";
        }
        // Persist cart
        saveCartState();
    }

    // Initial render on page load
    renderCart();

    // Toast Notification Utility
    const toast = document.getElementById("toastNotice");
    const toastMsg = document.getElementById("toastMsg");
    let toastTimeout = null;

    function showToast(message) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Filter Buttons Interactive Behavior for Recommended Outfits
    const filterButtons = document.querySelectorAll(".filter-btn");
    const styleItems = document.querySelectorAll(".style-item");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            filterButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter") || "all";
            let matchCount = 0;

            styleItems.forEach(item => {
                const categories = item.getAttribute("data-category") || "";
                if (filterValue === "all" || categories.includes(filterValue)) {
                    item.style.display = "";
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.96)";
                    setTimeout(() => {
                        item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                    matchCount++;
                } else {
                    item.style.display = "none";
                }
            });

            showToast(`Showing ${this.textContent.trim()} (${matchCount} looks)`);
        });
    });

    // Newsletter Form
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = this.querySelector("input[type='email']");
            if (input && input.value) {
                showToast("Thank you for joining the VERDE community!");
                input.value = "";
            }
        });
    }
});
