// src/index.js — Pet Prestige API Server
require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const path      = require('path');
const rateLimit = require('express-rate-limit');

const app = express();

// ── CORS ─────────────────────────────────────────────────────
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:8080',
        'http://127.0.0.1:8080',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        /\.ngrok\.io$/,
        /\.ngrok-free\.app$/,
        /\.loca\.lt$/
    ],
    credentials: true
}));

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Static uploads ───────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ── Rate limiting ────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, max: 200,
    message: { error: 'Too many requests, please try again later.' }
});
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, max: 20,
    message: { error: 'Too many login attempts. Please wait 15 minutes.' }
});
app.use('/api/', limiter);
app.use('/api/auth/login',    authLimiter);
app.use('/api/auth/register', authLimiter);

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/products',  require('./routes/products'));
app.use('/api/shop',      require('./routes/shop'));
app.use('/api/community', require('./routes/community'));
app.use('/api/admin',     require('./routes/admin'));
app.use('/api/payments',  require('./routes/payments'));
app.use('/api/oauth',     require('./routes/oauth'));

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status:    'ok',
        service:   'Pet Prestige API',
        version:   '1.0.0',
        timestamp: new Date().toISOString(),
        integrations: {
            paymongo: !!process.env.PAYMONGO_SECRET_KEY,
            google_oauth: !!process.env.GOOGLE_CLIENT_ID,
            email: !!process.env.EMAIL_USER,
            sms: !!process.env.SEMAPHORE_API_KEY,
            maps: !!process.env.GOOGLE_MAPS_API_KEY
        }
    });
});

// ── 404 ──────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: `Route ${req.method} ${req.path} not found` }));

// ── Error handler ────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// ── Start ────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('');
    console.log('🐾 ═══════════════════════════════════════════');
    console.log(`   Pet Prestige API running on port ${PORT}`);
    console.log(`   http://localhost:${PORT}/api/health`);
    console.log('');
    console.log('   Integrations:');
    console.log(`   PayMongo:     ${process.env.PAYMONGO_SECRET_KEY ? '✅ Configured' : '⚠️  Not configured'}`);
    console.log(`   Google OAuth: ${process.env.GOOGLE_CLIENT_ID    ? '✅ Configured' : '⚠️  Not configured'}`);
    console.log(`   Email (SMTP): ${process.env.EMAIL_USER          ? '✅ Configured' : '⚠️  Not configured'}`);
    console.log(`   SMS:          ${process.env.SEMAPHORE_API_KEY   ? '✅ Configured' : '⚠️  Not configured'}`);
    console.log(`   Google Maps:  ${process.env.GOOGLE_MAPS_API_KEY ? '✅ Configured' : '⚠️  Not configured'}`);
    console.log('🐾 ═══════════════════════════════════════════');
    console.log('');
});