// ============================================================
// admin-common.js — Shared admin utilities
// Pet Prestige Admin Panel
// ============================================================

// ── Toast notification ───────────────────────────────────────
function adminToast(msg, type) {
    type = type || 'success';
    const colors = { success:'#27ae60', error:'#e74c3c', info:'#3498db', warning:'#f39c12' };
    const icons  = { success:'✓', error:'✕', info:'ℹ', warning:'⚠' };
    const t = document.createElement('div');
    t.innerHTML = '<span style="margin-right:8px;font-size:1rem;">' + (icons[type]||'✓') + '</span>' + msg;
    t.style.cssText = [
        'position:fixed','bottom:28px','right:28px',
        'background:' + (colors[type]||'#333'),
        'color:white','padding:13px 22px','border-radius:12px',
        'z-index:99999','font-size:0.9rem','font-family:inherit',
        'box-shadow:0 6px 24px rgba(0,0,0,0.18)',
        'display:flex','align-items:center','gap:4px',
        'animation:fadeInUp 0.25s ease','max-width:360px'
    ].join(';');
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 3000);
}
// Override legacy showToast used across admin pages
window.showToast = adminToast;

// ── Activity Log ─────────────────────────────────────────────
const ActivityLog = {
    KEY: 'petPrestigeActivityLog',

    add: function(action, detail, category) {
        const user = JSON.parse(localStorage.getItem('petPrestigeUser') || '{}');
        const logs = this.get();
        logs.unshift({
            id:       Date.now(),
            time:     new Date().toISOString(),
            actor:    user.name || user.email || 'Admin',
            action:   action,
            detail:   detail || '',
            category: category || 'general'
        });
        // Keep last 500 entries
        localStorage.setItem(this.KEY, JSON.stringify(logs.slice(0, 500)));
    },

    get: function(limit) {
        const raw = JSON.parse(localStorage.getItem(this.KEY) || '[]');
        return limit ? raw.slice(0, limit) : raw;
    },

    clear: function() {
        localStorage.removeItem(this.KEY);
    }
};
window.ActivityLog = ActivityLog;

// ── Sidebar "Admin Panel" button visibility ──────────────────
// Hide the "Admin Panel" link when already on an admin page
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // The storefront has a "Back to Admin" button injected by script.js.
        // Inside admin pages we don't need it — it doesn't exist here anyway.
        // What we DO want: make sure "View Store" always opens in a new tab.
        document.querySelectorAll('.admin-sidebar-bottom a[href*="index.html"]').forEach(function(a) {
            a.setAttribute('target', '_blank');
        });
    });
})();