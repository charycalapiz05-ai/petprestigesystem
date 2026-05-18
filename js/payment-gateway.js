// js/payment-gateway.js
// Frontend integration for PayMongo, Google OAuth, Google Maps
// Include in checkout.html and login.html

// ══════════════════════════════════════════════════════════════
// PAYMONGO — GCash / PayMaya / Card Payments
// ══════════════════════════════════════════════════════════════
const PaymentGateway = {

    PAYMONGO_PUBLIC_KEY: window.PAYMONGO_PUBLIC_KEY || '',

    // Show payment method selector
    showPaymentMethods(containerId, orderId, total) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="payment-methods" style="margin-top:20px;">
                <h3 style="margin-bottom:16px;color:#2C3E50;">Choose Payment Method</h3>

                <div class="payment-options" style="display:grid;gap:12px;">

                    <!-- GCash -->
                    <label class="payment-option" style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid #eee;border-radius:10px;cursor:pointer;transition:all 0.2s;">
                        <input type="radio" name="paymentMethod" value="gcash" style="margin:0;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/GCash_Logo.svg/200px-GCash_Logo.svg.png" style="height:28px;" alt="GCash">
                        <div>
                            <strong style="display:block;">GCash</strong>
                            <small style="color:#888;">Pay via GCash wallet</small>
                        </div>
                    </label>

                    <!-- PayMaya -->
                    <label class="payment-option" style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid #eee;border-radius:10px;cursor:pointer;transition:all 0.2s;">
                        <input type="radio" name="paymentMethod" value="paymaya" style="margin:0;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Maya_logo.png/200px-Maya_logo.png" style="height:28px;" alt="PayMaya">
                        <div>
                            <strong style="display:block;">Maya (PayMaya)</strong>
                            <small style="color:#888;">Pay via Maya wallet</small>
                        </div>
                    </label>

                    <!-- Cash on Delivery -->
                    <label class="payment-option" style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid #eee;border-radius:10px;cursor:pointer;transition:all 0.2s;">
                        <input type="radio" name="paymentMethod" value="cod" checked style="margin:0;">
                        <span style="font-size:1.5rem;">💵</span>
                        <div>
                            <strong style="display:block;">Cash on Delivery</strong>
                            <small style="color:#888;">Pay when you receive your order</small>
                        </div>
                    </label>
                </div>

                <div style="margin-top:20px;padding:16px;background:#fff8f5;border-radius:8px;border:1px solid #ffe0d0;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                        <span style="color:#666;">Total to pay:</span>
                        <strong style="color:#FF6B35;font-size:1.1rem;">₱${parseFloat(total).toLocaleString()}</strong>
                    </div>
                </div>

                <button onclick="PaymentGateway.processPayment('${orderId}', ${total})"
                    style="width:100%;margin-top:16px;background:#FF6B35;color:white;border:none;padding:14px;border-radius:10px;font-size:1rem;font-weight:600;cursor:pointer;">
                    Complete Payment
                </button>
            </div>
        `;

        // Style selected option
        container.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
            input.addEventListener('change', function() {
                container.querySelectorAll('.payment-option').forEach(opt => {
                    opt.style.borderColor = '#eee';
                    opt.style.background  = 'white';
                });
                this.closest('.payment-option').style.borderColor = '#FF6B35';
                this.closest('.payment-option').style.background  = '#fff8f5';
            });
        });

        // Trigger initial selection style
        container.querySelector('input[value="cod"]').dispatchEvent(new Event('change'));
    },

    // Process payment based on selected method
    async processPayment(orderId, total) {
        const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
        if (!method) { alert('Please select a payment method'); return; }

        if (method === 'cod') {
            // COD — just redirect to success
            window.location.href = `order-success.html?order=${orderId}&method=cod`;
            return;
        }

        // Online payment via PayMongo
        try {
            const btn = document.querySelector('[onclick*="processPayment"]');
            if (btn) { btn.textContent = 'Creating payment...'; btn.disabled = true; }

            const data = await API.request('POST', '/payments/create-link', { order_id: orderId }, true);

            // Redirect to PayMongo payment page
            window.location.href = data.payment_url;

        } catch (err) {
            alert('Payment error: ' + (err.message || 'Please try again'));
            const btn = document.querySelector('[onclick*="processPayment"]');
            if (btn) { btn.textContent = 'Complete Payment'; btn.disabled = false; }
        }
    }
};

// ══════════════════════════════════════════════════════════════
// GOOGLE OAUTH — Login with Google
// ══════════════════════════════════════════════════════════════
const GoogleAuth = {

    // Initialize Google Sign-In
    init(buttonId) {
        if (!window.GOOGLE_CLIENT_ID) {
            console.warn('Google Client ID not configured');
            return;
        }

        // Load Google Identity Services script
        if (!document.getElementById('google-identity-script')) {
            const script = document.createElement('script');
            script.id  = 'google-identity-script';
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => this.renderButton(buttonId);
            document.head.appendChild(script);
        } else {
            this.renderButton(buttonId);
        }
    },

    // Render Google Sign-In button
    renderButton(buttonId) {
        if (!window.google) return;

        google.accounts.id.initialize({
            client_id: window.GOOGLE_CLIENT_ID,
            callback:  this.handleCredential.bind(this)
        });

        const container = document.getElementById(buttonId);
        if (container) {
            google.accounts.id.renderButton(container, {
                theme: 'outline',
                size:  'large',
                width: container.offsetWidth || 300,
                text:  'continue_with',
                logo_alignment: 'left'
            });
        }

        // Also show One Tap prompt
        google.accounts.id.prompt();
    },

    // Handle Google credential response
    async handleCredential(response) {
        try {
            const data = await API.request('POST', '/oauth/google', { credential: response.credential });

            // Save tokens
            API.setToken(data.accessToken);
            localStorage.setItem('petPrestigeUser', JSON.stringify(data.user));

            if (typeof showToast === 'function') showToast('Welcome, ' + data.user.name + '! 🐾');

            setTimeout(() => {
                if (data.user.is_admin) window.location.href = 'admin/dashboard.html';
                else {
                    const redirect = localStorage.getItem('petPrestigeLoginRedirect');
                    localStorage.removeItem('petPrestigeLoginRedirect');
                    window.location.href = redirect || 'index.html';
                }
            }, 800);

        } catch (err) {
            console.error('Google login failed:', err);
            alert('Google login failed: ' + (err.message || 'Please try again'));
        }
    }
};

// ══════════════════════════════════════════════════════════════
// GOOGLE MAPS — Address Autocomplete
// ══════════════════════════════════════════════════════════════
const MapsIntegration = {

    // Initialize address autocomplete on an input field
    initAddressAutocomplete(inputId) {
        if (!window.GOOGLE_MAPS_API_KEY) {
            console.warn('Google Maps API key not configured');
            return;
        }

        // Load Maps script if not loaded
        if (!window.google?.maps) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${window.GOOGLE_MAPS_API_KEY}&libraries=places&callback=MapsIntegration.onMapsLoaded`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            window.MapsIntegration = MapsIntegration;
            this._pendingInputId = inputId;
        } else {
            this.setupAutocomplete(inputId);
        }
    },

    onMapsLoaded() {
        if (this._pendingInputId) this.setupAutocomplete(this._pendingInputId);
    },

    setupAutocomplete(inputId) {
        const input = document.getElementById(inputId);
        if (!input || !window.google?.maps?.places) return;

        const autocomplete = new google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: 'ph' },  // Philippines only
            fields: ['address_components', 'formatted_address', 'geometry'],
            types: ['address']
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.address_components) return;

            // Extract address parts
            let city = '', province = '', zip = '', street = '';
            place.address_components.forEach(c => {
                if (c.types.includes('locality'))                     city     = c.long_name;
                if (c.types.includes('administrative_area_level_2'))  province = c.long_name;
                if (c.types.includes('postal_code'))                  zip      = c.long_name;
                if (c.types.includes('route'))                        street   = c.long_name;
            });

            // Auto-fill form fields if they exist
            if (document.getElementById('city')     && city)     document.getElementById('city').value     = city;
            if (document.getElementById('province') && province) document.getElementById('province').value = province;
            if (document.getElementById('postal')   && zip)      document.getElementById('postal').value   = zip;

            console.log('Address selected:', place.formatted_address);
        });
    },

    // Show delivery map for an order
    showDeliveryMap(containerId, address) {
        if (!window.GOOGLE_MAPS_API_KEY) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        const encoded = encodeURIComponent(address + ', Philippines');
        container.innerHTML = `
            <iframe
                width="100%"
                height="250"
                style="border:0;border-radius:8px;"
                loading="lazy"
                allowfullscreen
                src="https://www.google.com/maps/embed/v1/place?key=${window.GOOGLE_MAPS_API_KEY}&q=${encoded}">
            </iframe>
        `;
    }
};

// ══════════════════════════════════════════════════════════════
// AUTO-INIT on page load
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google login button if on login page
    if (document.getElementById('googleLoginBtn')) {
        GoogleAuth.init('googleLoginBtn');
    }

    // Initialize address autocomplete if on checkout page
    if (document.getElementById('address')) {
        MapsIntegration.initAddressAutocomplete('address');
    }
});

window.PaymentGateway = PaymentGateway;
window.GoogleAuth     = GoogleAuth;
window.MapsIntegration = MapsIntegration;