// admin-guard.js — Include at top of every admin page
// Redirects non-admins away immediately
(function() {
    const user = JSON.parse(localStorage.getItem('petPrestigeUser') || 'null');
    const adminSession = JSON.parse(localStorage.getItem('petPrestigeAdminSession') || 'null');

    // Check both user and admin session
    if (!user || !user.isAdmin || !adminSession) {
        // Not logged in or not an admin — clear any stale state
        localStorage.removeItem('petPrestigeUser');
        localStorage.removeItem('petPrestigeAdminSession');
        localStorage.setItem('petPrestigeLoginRedirect', window.location.href);
        window.location.replace('../login.html');
    }

    // Session timeout: 8 hours
    if (adminSession && adminSession.loginTime) {
        const eightHours = 8 * 60 * 60 * 1000;
        if (Date.now() - adminSession.loginTime > eightHours) {
            localStorage.removeItem('petPrestigeAdminSession');
            localStorage.removeItem('petPrestigeUser');
            window.location.replace('../login.html?timeout=1');
        }
    }
})();