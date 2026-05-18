// src/routes/auth.js — Register, Login, Logout, Refresh Token
const express   = require('express');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db        = require('../config/db');
const { requireAuth } = require('../middleware/auth');
const router    = express.Router();

// Helper: generate tokens
function generateTokens(user) {
    const payload = { id: user.id, email: user.email, is_admin: user.is_admin };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    });
    return { accessToken, refreshToken };
}

// ── POST /api/auth/register ──────────────────────────────────
router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, phone } = req.body;

    try {
        // Check if email already exists
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
        if (existing.length) return res.status(409).json({ error: 'Email already registered' });

        // Hash password
        const hash = await bcrypt.hash(password, 12);

        // Insert user
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)',
            [name, email.toLowerCase(), hash, phone || null]
        );

        const user = { id: result.insertId, email: email.toLowerCase(), is_admin: 0 };
        const { accessToken, refreshToken } = generateTokens(user);

        // Store refresh token hash
        const tokenHash = await bcrypt.hash(refreshToken, 8);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await db.query(
            'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
            [user.id, tokenHash, expiresAt]
        );

        res.status(201).json({
            message: 'Account created successfully',
            user: { id: user.id, name, email: user.email, is_admin: 0 },
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── POST /api/auth/login ─────────────────────────────────────
router.post('/login', [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const [rows] = await db.query(
            'SELECT id, name, email, password_hash, is_admin, is_active FROM users WHERE email = ?',
            [email.toLowerCase()]
        );

        if (!rows.length) return res.status(401).json({ error: 'Invalid email or password' });

        const user = rows[0];
        if (!user.is_active) return res.status(403).json({ error: 'Account is deactivated' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

        const { accessToken, refreshToken } = generateTokens(user);

        // Store refresh token
        const tokenHash = await bcrypt.hash(refreshToken, 8);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await db.query(
            'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
            [user.id, tokenHash, expiresAt]
        );

        res.json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin },
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── POST /api/auth/logout ────────────────────────────────────
router.post('/logout', requireAuth, async (req, res) => {
    try {
        // Remove all refresh tokens for this user
        await db.query('DELETE FROM refresh_tokens WHERE user_id = ?', [req.user.id]);
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET /api/auth/me ─────────────────────────────────────────
router.get('/me', requireAuth, async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, name, email, phone, avatar, is_admin, created_at FROM users WHERE id = ?',
            [req.user.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'User not found' });
        res.json({ user: rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── PUT /api/auth/profile ────────────────────────────────────
router.put('/profile', requireAuth, [
    body('name').optional().trim().notEmpty(),
    body('phone').optional().trim(),
], async (req, res) => {
    const { name, phone } = req.body;
    try {
        await db.query(
            'UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone) WHERE id = ?',
            [name || null, phone || null, req.user.id]
        );
        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── PUT /api/auth/change-password ───────────────────────────
router.put('/change-password', requireAuth, [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentPassword, newPassword } = req.body;
    try {
        const [rows] = await db.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
        const valid = await bcrypt.compare(currentPassword, rows[0].password_hash);
        if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });

        const newHash = await bcrypt.hash(newPassword, 12);
        await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, req.user.id]);
        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;