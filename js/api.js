// ============================================================
// api.js — Pet Prestige Frontend API Bridge
// Connects your frontend to the Node.js backend
// Include this BEFORE script.js in all HTML files:
// <script src="js/api.js"></script>
// <script src="js/script.js"></script>
// ============================================================

const API = {

    // ── Base URL — change this to your ngrok URL when sharing ──
BASE: window.API_BASE || 'http://localhost:5000/api',    getToken() {
        return localStorage.getItem('petPrestigeToken');
    },

    // ── Save auth token ─────────────────────────────────────────
    setToken(token) {
        localStorage.setItem('petPrestigeToken', token);
    },

    // ── Remove auth token ───────────────────────────────────────
    clearToken() {
    localStorage.removeItem('petPrestigeToken');
    localStorage.removeItem('petPrestigeUser');
    localStorage.removeItem('petPrestigeCart');
    localStorage.removeItem('petPrestigeWishlist');
    localStorage.removeItem('petPrestigeVoucher');
    localStorage.removeItem('petPrestigeAdminSession');
},

    // ── Base fetch wrapper ──────────────────────────────────────
    async request(method, path, body = null, auth = false) {
        const headers = { 'Content-Type': 'application/json' };
        if (auth) {
            const token = this.getToken();
            if (token) headers['Authorization'] = 'Bearer ' + token;
        }
        const options = { method, headers };
        if (body) options.body = JSON.stringify(body);

        try {
            const res = await fetch(this.BASE + path, options);
            const data = await res.json();
            if (!res.ok) throw { status: res.status, message: data.error || 'Request failed' };
            return data;
        } catch (err) {
            if (err.status) throw err;
            throw { status: 0, message: 'Cannot connect to server. Make sure the API is running.' };
        }
    },

    // ── Auth ────────────────────────────────────────────────────
    auth: {
        async register(name, email, password, phone) {
            const data = await API.request('POST', '/auth/register', { name, email, password, phone });
            if (data.accessToken) API.setToken(data.accessToken);
            if (data.user) localStorage.setItem('petPrestigeUser', JSON.stringify(data.user));
            return data;
        },

        async login(email, password) {
            const data = await API.request('POST', '/auth/login', { email, password });
            if (data.accessToken) API.setToken(data.accessToken);
            if (data.user) localStorage.setItem('petPrestigeUser', JSON.stringify(data.user));
            return data;
        },

        async logout() {
            try { await API.request('POST', '/auth/logout', null, true); } catch {}
            API.clearToken();
        },

        async me() {
            return await API.request('GET', '/auth/me', null, true);
        },

        async updateProfile(data) {
            return await API.request('PUT', '/auth/profile', data, true);
        },

        async changePassword(currentPassword, newPassword) {
            return await API.request('PUT', '/auth/change-password', { currentPassword, newPassword }, true);
        },

        isLoggedIn() {
            return !!API.getToken();
        },

        getUser() {
            const raw = localStorage.getItem('petPrestigeUser');
            return raw ? JSON.parse(raw) : null;
        },

        isAdmin() {
            const user = this.getUser();
            return user && user.is_admin === 1;
        }
    },

    // ── Products ────────────────────────────────────────────────
    products: {
        async list(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await API.request('GET', '/products' + (query ? '?' + query : ''));
        },

        async featured() {
            return await API.request('GET', '/products/featured');
        },

        async get(id) {
            return await API.request('GET', '/products/' + id);
        },

        async categories() {
            return await API.request('GET', '/products/categories/all');
        },

        // Admin
        async create(data) {
            return await API.request('POST', '/products', data, true);
        },

        async update(id, data) {
            return await API.request('PUT', '/products/' + id, data, true);
        },

        async delete(id) {
            return await API.request('DELETE', '/products/' + id, null, true);
        }
    },

    // ── Cart ────────────────────────────────────────────────────
    cart: {
        async get() {
            return await API.request('GET', '/shop/cart', null, true);
        },

        async add(product_id, quantity = 1) {
            return await API.request('POST', '/shop/cart', { product_id, quantity }, true);
        },

        async update(productId, quantity) {
            return await API.request('PUT', '/shop/cart/' + productId, { quantity }, true);
        },

        async remove(productId) {
            return await API.request('DELETE', '/shop/cart/' + productId, null, true);
        },

        async clear() {
            return await API.request('DELETE', '/shop/cart', null, true);
        }
    },

    // ── Wishlist ────────────────────────────────────────────────
    wishlist: {
        async get() {
            return await API.request('GET', '/shop/wishlist', null, true);
        },

        async toggle(product_id) {
            return await API.request('POST', '/shop/wishlist/toggle', { product_id }, true);
        }
    },

    // ── Orders ──────────────────────────────────────────────────
    orders: {
        async place(orderData) {
            return await API.request('POST', '/shop/orders', orderData, true);
        },

        async list() {
            return await API.request('GET', '/shop/orders', null, true);
        },

        async get(id) {
            return await API.request('GET', '/shop/orders/' + id, null, true);
        },

        // Admin
        async adminList(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await API.request('GET', '/shop/admin/orders' + (query ? '?' + query : ''), null, true);
        },

        async updateStatus(id, status) {
            return await API.request('PUT', '/shop/admin/orders/' + id + '/status', { status }, true);
        }
    },

    // ── Vouchers ────────────────────────────────────────────────
    vouchers: {
        async validate(code, subtotal) {
            return await API.request('POST', '/shop/voucher/validate', { code, subtotal });
        }
    },

    // ── Reviews ─────────────────────────────────────────────────
    reviews: {
        async list(productId) {
            return await API.request('GET', '/community/reviews/' + productId);
        },

        async submit(productId, rating, body, title = '') {
            return await API.request('POST', '/community/reviews/' + productId, { rating, body, title }, true);
        },

        async reply(reviewId, reply) {
            return await API.request('PUT', '/community/reviews/' + reviewId + '/reply', { reply }, true);
        },

        async delete(reviewId) {
            return await API.request('DELETE', '/community/reviews/' + reviewId, null, true);
        }
    },

    // ── Lost & Found ────────────────────────────────────────────
    lostFound: {
        async list(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await API.request('GET', '/community/lost-found' + (query ? '?' + query : ''));
        },

        async submit(data) {
            return await API.request('POST', '/community/lost-found', data, true);
        },

        async comment(reportId, body, guestName = '') {
            return await API.request('POST', '/community/lost-found/' + reportId + '/comment', { body, guest_name: guestName }, false);
        },

        async delete(id) {
            return await API.request('DELETE', '/community/lost-found/' + id, null, true);
        }
    },

    // ── Community Posts ─────────────────────────────────────────
    community: {
        async list(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await API.request('GET', '/community/posts' + (query ? '?' + query : ''));
        },

        async create(data) {
            return await API.request('POST', '/community/posts', data, true);
        },

        async like(postId) {
            return await API.request('PUT', '/community/posts/' + postId + '/like', null, true);
        },

        async getComments(postId) {
            return await API.request('GET', '/community/posts/' + postId + '/comments');
        },

        async addComment(postId, body, parentId = null) {
            return await API.request('POST', '/community/posts/' + postId + '/comments', { body, parent_id: parentId }, true);
        },

        async delete(postId) {
            return await API.request('DELETE', '/community/posts/' + postId, null, true);
        }
    },

    // ── Admin ───────────────────────────────────────────────────
    admin: {
        async dashboard() {
            return await API.request('GET', '/admin/dashboard', null, true);
        },

        async customers(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await API.request('GET', '/admin/customers' + (query ? '?' + query : ''), null, true);
        },

        async reports(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await API.request('GET', '/admin/reports' + (query ? '?' + query : ''), null, true);
        },

        async activityLog() {
            return await API.request('GET', '/admin/activity-log', null, true);
        },

        async verifyLostFound(id) {
            return await API.request('PUT', '/admin/lost-found/' + id + '/verify', null, true);
        }
    }
};

// ── Auto-sync: keep localStorage user fresh ─────────────────
// If token exists, refresh user info on page load
(async function() {
    if (API.getToken()) {
        try {
            const data = await API.auth.me();
            if (data.user) localStorage.setItem('petPrestigeUser', JSON.stringify(data.user));
        } catch (err) {
            // Token expired or invalid — clear it
            if (err.status === 401) API.clearToken();
        }
    }
})();

// ── Override login function used by script.js ────────────────
// This hooks into your existing login flow
window.API = API;

console.log('🐾 Pet Prestige API bridge loaded — connected to', API.BASE);