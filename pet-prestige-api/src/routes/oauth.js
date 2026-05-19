// src/routes/oauth.js — Google OAuth 2.0
const fetch = global.fetch;
const express = require('express');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const db      = require('../config/db');
const router  = express.Router();

// ── POST /api/oauth/google ────────────────────────────────────
// Receives Google ID token from frontend, verifies it, creates/logs in user
router.post('/google', async (req, res) => {
    const { credential } = req.body; // Google ID token
    if (!credential) return res.status(400).json({ error: 'Google credential required' });

    try {
        // Verify Google token by calling Google's tokeninfo endpoint
        const googleRes  = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        const googleData = await googleRes.json();

        if (googleData.error) return res.status(401).json({ error: 'Invalid Google token' });
        if (googleData.aud !== process.env.GOOGLE_CLIENT_ID) {
            return res.status(401).json({ error: 'Token audience mismatch' });
        }

        const { email, name, picture, sub: googleId } = googleData;

        // Check if user exists
        let [users] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
        let user = users[0];

        if (!user) {
            // Create new user from Google account
            const dummyHash = await bcrypt.hash(googleId + Math.random(), 8);
            const [result]  = await db.query(
                'INSERT INTO users (name, email, password_hash, avatar, is_active) VALUES (?, ?, ?, ?, 1)',
                [name, email.toLowerCase(), dummyHash, picture || null]
            );
            const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
            user = newUser[0];
        } else if (!user.is_active) {
            return res.status(403).json({ error: 'Account is deactivated' });
        } else {
            // Update avatar if changed
            if (picture && user.avatar !== picture) {
                await db.query('UPDATE users SET avatar = ? WHERE id = ?', [picture, user.id]);
                user.avatar = picture;
            }
        }

        // Generate JWT tokens
        const payload = { id: user.id, email: user.email, is_admin: user.is_admin };
        const accessToken  = jwt.sign(payload, process.env.JWT_SECRET,         { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Google login successful',
            user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar, is_admin: user.is_admin },
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error('Google OAuth error:', err);
        res.status(500).json({ error: 'Google authentication failed' });
    }
});

module.exports = router;