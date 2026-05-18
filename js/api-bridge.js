// ============================================================
// api-bridge.js — Overrides script.js localStorage functions
// with real API calls. Include AFTER script.js:
// <script src="js/api.js"></script>
// <script src="js/script.js"></script>
// <script src="js/api-bridge.js"></script>
// ============================================================

// Wait for DOM and scripts to load
document.addEventListener('DOMContentLoaded', async function() {

    // ── Sync cart count from API if logged in ─────────────────
    if (window.API && API.auth.isLoggedIn()) {
        try {
            const data = await API.cart.get();
            const count = (data.items || []).reduce((s, i) => s + i.quantity, 0);
            document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
        } catch(e) {}
    }

    // ── Sync wishlist count from API if logged in ─────────────
    if (window.API && API.auth.isLoggedIn()) {
        try {
            const data = await API.wishlist.get();
            const count = (data.items || []).length;
            document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = count);
            // Sync wishlist to localStorage for compatibility
            window.wishlist = (data.items || []).map(i => ({ id: i.product_id, ...i }));
        } catch(e) {}
    }
});

// ── Override addToCart ────────────────────────────────────────
const _originalAddToCart = window.addToCart;
window.addToCart = async function(productId, quantity = 1) {
    if (!window.API) return _originalAddToCart && _originalAddToCart(productId, quantity);
    if (!API.auth.isLoggedIn()) {
        // Fall back to localStorage cart for guests
        return _originalAddToCart && _originalAddToCart(productId, quantity);
    }
    try {
        await API.cart.add(productId, quantity);
        // Update cart count
        const data = await API.cart.get();
        const count = (data.items || []).reduce((s, i) => s + i.quantity, 0);
        document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
        if (typeof showToast === 'function') showToast('Added to cart! 🛒');
    } catch(err) {
        if (typeof showToast === 'function') showToast(err.message || 'Failed to add to cart', 'error');
    }
};

// ── Override toggleWishlist ───────────────────────────────────
const _originalToggleWishlist = window.toggleWishlist;
window.toggleWishlist = async function(productId) {
    if (!window.API) return _originalToggleWishlist && _originalToggleWishlist(productId);
    if (!API.auth.isLoggedIn()) {
        return _originalToggleWishlist && _originalToggleWishlist(productId);
    }
    try {
        const data = await API.wishlist.toggle(productId);
        // Update wishlist count
        const wData = await API.wishlist.get();
        const count = (wData.items || []).length;
        document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = count);
        window.wishlist = (wData.items || []).map(i => ({ id: i.product_id, ...i }));
        if (typeof showToast === 'function') {
            showToast(data.wishlisted ? '❤️ Added to wishlist!' : 'Removed from wishlist');
        }
        // Refresh page if on wishlist page
        if (window.location.pathname.includes('wishlist') && typeof refreshPage === 'function') {
            refreshPage();
        }
    } catch(err) {
        if (typeof showToast === 'function') showToast(err.message || 'Failed', 'error');
    }
};

// ── Override loadCart (cart.html) ────────────────────────────
const _originalLoadCart = window.loadCart;
window.loadCart = async function() {
    if (!window.API || !API.auth.isLoggedIn()) {
        return _originalLoadCart && _originalLoadCart();
    }
    try {
        const data = await API.cart.get();
        const items = data.items || [];

        // Sync to localStorage cart format for compatibility
        window.cart = items.map(i => ({
            id: i.product_id,
            name: i.name,
            price: parseFloat(i.price),
            image: i.image,
            quantity: i.quantity,
            stock: i.stock
        }));

        // Save to localStorage for checkout compatibility
        localStorage.setItem('petPrestigeCart', JSON.stringify(window.cart));

        // Call original loadCart to render (it reads from window.cart)
        if (_originalLoadCart) _originalLoadCart();

    } catch(err) {
        console.error('Failed to load cart from API:', err);
        if (_originalLoadCart) _originalLoadCart();
    }
};

// ── Override placeOrder (checkout.html) ──────────────────────
const _originalPlaceOrder = window.placeOrder;
window.placeOrder = async function() {
    if (!window.API || !API.auth.isLoggedIn()) {
        return _originalPlaceOrder && _originalPlaceOrder();
    }

    const elId = id => document.getElementById(id)?.value || '';

    const orderData = {
        first_name:     elId('firstName'),
        last_name:      elId('lastName'),
        email:          elId('email'),
        phone:          elId('phone'),
        address_line:   elId('address'),
        city:           elId('city'),
        province:       elId('province'),
        zip_code:       elId('postal'),
        payment_method: document.querySelector('input[name="payment"]:checked')?.value || 'cod',
        voucher_code:   window.appliedVoucher?.code || null,
        notes:          elId('notes') || null
    };

    if (!orderData.first_name || !orderData.last_name || !orderData.email || !orderData.phone || !orderData.address_line || !orderData.city || !orderData.province) {
        if (typeof showToast === 'function') showToast('Please fill in all required fields.', 'error');
        return;
    }

    try {
        const data = await API.orders.place(orderData);

        // Clear local cart
        window.cart = [];
        window.appliedVoucher = null;
        localStorage.removeItem('petPrestigeCart');
        localStorage.removeItem('petPrestigeVoucher');

        window.location.href = 'order-success.html?order=' + data.order.order_number;
    } catch(err) {
        if (typeof showToast === 'function') showToast(err.message || 'Failed to place order', 'error');
    }
};

// ── Override loadShopProducts to use API ─────────────────────
const _originalLoadShopProducts = window.loadShopProducts;
window.loadShopProducts = async function() {
    if (!window.API) return _originalLoadShopProducts && _originalLoadShopProducts();

    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;"><i class="fas fa-spinner fa-spin" style="font-size:2rem;"></i><p>Loading products...</p></div>';

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
            limit: 200,
            category: urlParams.get('category') || '',
            search: urlParams.get('search') || ''
        };
        // Remove empty params
        Object.keys(params).forEach(k => !params[k] && delete params[k]);

        const data = await API.products.list(params);
        window._apiProducts = data.products || [];

        // Override filterProducts to use API products
        window._useAPIProducts = true;

        // Set search value if present
        if (urlParams.get('search') && document.getElementById('shopSearch')) {
            document.getElementById('shopSearch').value = urlParams.get('search');
        }

        // Apply category filter if present
        const cat = urlParams.get('category');
        if (cat && cat !== 'all') {
            window.activeCategory = cat;
            document.querySelectorAll('.cat-filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.cat === cat);
            });
        }

        renderAPIProducts(window._apiProducts);

    } catch(err) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#e74c3c;">Failed to load products: ' + err.message + '</div>';
    }
};

// ── Render API products in the grid ──────────────────────────
function renderAPIProducts(products) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const countEl = document.getElementById('showingCount');
    const totalEl = document.getElementById('totalCount');
    if (countEl) countEl.textContent = products.length;
    if (totalEl) totalEl.textContent = products.length;

    if (!products.length) {
        grid.innerHTML = '<div class="no-results" style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;">No products found.</div>';
        return;
    }

    grid.innerHTML = products.map(p => {
        // Map API product format to createProductCard format
        const mapped = {
            id: p.id,
            name: p.name,
            price: parseFloat(p.price),
            comparePrice: p.original_price ? parseFloat(p.original_price) : null,
            image: p.image,
            rating: parseFloat(p.rating) || 0,
            reviews: p.review_count || 0,
            stock: p.stock,
            category: p.category_slug,
            subcategory: p.subcategory,
            featured: p.is_featured
        };
        return createProductCard(mapped);
    }).join('');
}

// ── Override filterProducts to filter API products ────────────
const _originalFilterProducts = window.filterProducts;
window.filterProducts = function() {
    if (!window._useAPIProducts || !window._apiProducts) {
        return _originalFilterProducts && _originalFilterProducts();
    }

    const query    = (document.getElementById('shopSearch')?.value || '').toLowerCase().trim();
    const sort     = document.getElementById('sortSelect')?.value || 'featured';
    const maxPrice = parseInt(document.getElementById('priceRange')?.value || '99999');
    const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || '0');

    if (document.getElementById('priceValue')) {
        document.getElementById('priceValue').textContent = '₱' + maxPrice.toLocaleString();
    }

    let filtered = window._apiProducts.filter(p => {
        const matchSearch = !query ||
            p.name.toLowerCase().includes(query) ||
            (p.description || '').toLowerCase().includes(query);
        const matchCat    = !window.activeCategory || window.activeCategory === 'all' || p.category_slug === window.activeCategory;
        const matchSubcat = !window.activeSubcategory || window.activeSubcategory === 'all' || p.subcategory === window.activeSubcategory;
        const matchPrice  = parseFloat(p.price) <= maxPrice;
        const matchRat    = (parseFloat(p.rating) || 0) >= minRating;
        return matchSearch && matchCat && matchSubcat && matchPrice && matchRat;
    });

    if (sort === 'price-low')  filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === 'featured')   filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));

    renderAPIProducts(filtered);
};

// ── Override loadProductDetail (product-detail.html) ─────────
const _originalLoadProductDetail = window.loadProductDetail;
window.loadProductDetail = async function() {
    if (!window.API) return _originalLoadProductDetail && _originalLoadProductDetail();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return _originalLoadProductDetail && _originalLoadProductDetail();

    try {
        const data = await API.products.get(id);
        const p = data.product;

        // Map to script.js format
        const mapped = {
            id: p.id,
            name: p.name,
            price: parseFloat(p.price),
            comparePrice: p.original_price ? parseFloat(p.original_price) : null,
            image: p.image,
            rating: parseFloat(p.rating) || 0,
            reviews: p.review_count || 0,
            stock: p.stock,
            category: p.category_slug,
            subcategory: p.subcategory,
            featured: p.is_featured,
            description: p.description
        };

        // Store globally for script.js compatibility
        window._currentProduct = mapped;
        window.DB = window.DB || {};
        window.DB.products = window.DB.products || [];

        // Add/update product in DB for script.js compatibility
        const existingIdx = window.DB.products.findIndex(x => x.id === mapped.id);
        if (existingIdx >= 0) window.DB.products[existingIdx] = mapped;
        else window.DB.products.push(mapped);

        // Fall through to original to render
        if (_originalLoadProductDetail) _originalLoadProductDetail();

    } catch(err) {
        console.error('Failed to load product:', err);
        if (_originalLoadProductDetail) _originalLoadProductDetail();
    }
};

// ── Override loadCommunityPosts ───────────────────────────────
const _originalLoadCommunityPosts = window.loadCommunityPosts;
window.loadCommunityPosts = async function(filter) {
    if (!window.API) return _originalLoadCommunityPosts && _originalLoadCommunityPosts(filter);

    const feed = document.getElementById('postsFeed');
    if (!feed) return;

    feed.innerHTML = '<div style="text-align:center;padding:40px;color:#aaa;"><i class="fas fa-spinner fa-spin"></i> Loading posts...</div>';

    try {
        const sort = document.getElementById('sortPosts')?.value || 'newest';
        const data = await API.community.list({ topic: filter || 'all', sort });
        const posts = data.posts || [];

        if (!posts.length) {
            feed.innerHTML = '<div style="text-align:center;padding:40px;color:#aaa;">No posts yet. Be the first to post!</div>';
            return;
        }

        feed.innerHTML = posts.map(p => `
            <div class="community-post-card" style="background:white;border-radius:14px;padding:20px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                    <div style="width:40px;height:40px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;">
                        ${(p.author || 'A').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <strong>${p.author || 'Anonymous'}</strong>
                        <div style="font-size:0.78rem;color:#aaa;">${new Date(p.created_at).toLocaleDateString('en-PH')} · ${p.topic}</div>
                    </div>
                </div>
                ${p.image ? `<img src="${p.image}" style="width:100%;border-radius:10px;margin-bottom:12px;max-height:300px;object-fit:cover;">` : ''}
                <h3 style="margin-bottom:8px;font-size:1rem;">${p.title}</h3>
                <p style="color:#666;font-size:0.9rem;line-height:1.6;">${p.body}</p>
                <div style="display:flex;gap:16px;margin-top:12px;color:#aaa;font-size:0.85rem;">
                    <button onclick="likePost(${p.id}, this)" style="background:none;border:none;cursor:pointer;color:#aaa;font-size:0.85rem;">
                        <i class="fas fa-heart"></i> ${p.likes || 0}
                    </button>
                    <span><i class="fas fa-comment"></i> ${p.comment_count || 0} comments</span>
                </div>
            </div>
        `).join('');

    } catch(err) {
        feed.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c;">Failed to load posts: ' + err.message + '</div>';
    }
};

// ── Like post ─────────────────────────────────────────────────
window.likePost = async function(postId, btn) {
    if (!API.auth.isLoggedIn()) {
        if (typeof showToast === 'function') showToast('Please login to like posts');
        return;
    }
    try {
        const data = await API.community.like(postId);
        if (btn) {
            const countEl = btn.querySelector('i');
            const current = parseInt(btn.textContent.replace(/\D/g, '')) || 0;
            btn.innerHTML = `<i class="fas fa-heart" style="color:${data.liked ? '#e74c3c' : '#aaa'}"></i> ${data.liked ? current + 1 : current - 1}`;
        }
    } catch(err) {}
};

// ── Override submitPost ───────────────────────────────────────
const _originalSubmitPost = window.submitPost;
window.submitPost = async function() {
    if (!window.API || !API.auth.isLoggedIn()) {
        if (typeof showToast === 'function') showToast('Please login to post');
        return;
    }

    const topic = document.getElementById('postTopic')?.value;
    const title = document.getElementById('postTitle')?.value?.trim();
    const body  = document.getElementById('postContent')?.value?.trim();
    const imgEl = document.getElementById('postImagePreviewImg');
    const image = imgEl?.src && imgEl.src !== window.location.href ? imgEl.src : null;

    if (!topic || !title || !body) {
        if (typeof showToast === 'function') showToast('Please fill in all fields', 'error');
        return;
    }

    try {
        await API.community.create({ topic, title, body, image });
        if (typeof showToast === 'function') showToast('Post created! 🐾');
        if (typeof closePostModal === 'function') closePostModal();
        if (typeof loadCommunityPosts === 'function') loadCommunityPosts('all');
    } catch(err) {
        if (typeof showToast === 'function') showToast(err.message || 'Failed to create post', 'error');
    }
};

// ── Override loadLostFound ────────────────────────────────────
const _originalLoadLostFound = window.loadLostFound;
window.loadLostFound = async function() {
    if (!window.API) return _originalLoadLostFound && _originalLoadLostFound();

    const grid = document.getElementById('lfGrid') || document.getElementById('lostFoundGrid');
    if (!grid) return;

    grid.innerHTML = '<div style="text-align:center;padding:40px;color:#aaa;"><i class="fas fa-spinner fa-spin"></i> Loading reports...</div>';

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const type = document.getElementById('lfTypeFilter')?.value || 'all';
        const search = document.getElementById('lfSearch')?.value || '';

        const data = await API.lostFound.list({ type, search });
        const reports = data.reports || [];

        if (!reports.length) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;">No reports found.</div>';
            return;
        }

        grid.innerHTML = reports.map(r => `
            <div class="lf-card" style="background:white;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
                <div style="position:relative;">
                    <img src="${r.image || 'https://via.placeholder.com/400x250/f8f9fa/999?text=No+Photo'}"
                         style="width:100%;height:200px;object-fit:cover;"
                         onerror="this.src='https://via.placeholder.com/400x250/f8f9fa/999?text=No+Photo'">
                    <span style="position:absolute;top:12px;left:12px;background:${r.type === 'lost' ? '#e74c3c' : '#27ae60'};color:white;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:700;">
                        ${r.type.toUpperCase()}
                    </span>
                    ${r.is_verified ? '<span style="position:absolute;top:12px;right:12px;background:#3498db;color:white;padding:4px 10px;border-radius:20px;font-size:0.75rem;">✓ Verified</span>' : ''}
                </div>
                <div style="padding:16px;">
                    <h3 style="margin-bottom:4px;">${r.breed || 'Unknown Breed'} ${r.pet_name && r.pet_name !== 'Unknown' ? '("' + r.pet_name + '")' : ''}</h3>
                    <p style="color:#888;font-size:0.85rem;margin-bottom:8px;"><i class="fas fa-map-marker-alt"></i> ${r.location}</p>
                    <p style="color:#666;font-size:0.88rem;margin-bottom:12px;line-height:1.5;">${r.description.substring(0, 100)}${r.description.length > 100 ? '...' : ''}</p>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div style="font-size:0.82rem;color:#aaa;">${new Date(r.created_at).toLocaleDateString('en-PH')}</div>
                        <a href="tel:${r.contact_phone}" class="btn btn-sm btn-primary">
                            <i class="fas fa-phone"></i> Contact
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

    } catch(err) {
        grid.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c;">Failed to load reports: ' + err.message + '</div>';
    }
};

// ── Override voucher validation ───────────────────────────────
const _originalApplyVoucher = window.applyVoucher;
window.applyVoucher = async function() {
    if (!window.API) return _originalApplyVoucher && _originalApplyVoucher();

    const code = document.getElementById('voucherCode')?.value?.trim();
    if (!code) return;

    const subtotal = window.getCartTotal ? window.getCartTotal() : 0;

    try {
        const data = await API.vouchers.validate(code, subtotal);
        window.appliedVoucher = { code: data.voucher.code, discount: data.discount };
        localStorage.setItem('petPrestigeVoucher', JSON.stringify(window.appliedVoucher));
        if (typeof showToast === 'function') showToast('Voucher applied! You save ₱' + data.discount);
        if (typeof updateCartSummary === 'function') updateCartSummary();
    } catch(err) {
        if (typeof showToast === 'function') showToast(err.message || 'Invalid voucher', 'error');
    }
};

console.log('🐾 API bridge loaded — localStorage overrides active');