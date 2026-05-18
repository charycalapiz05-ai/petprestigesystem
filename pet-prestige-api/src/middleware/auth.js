// src/middleware/auth.js — JWT verification middleware
const jwt = require('jsonwebtoken');
const db  = require('../config/db');

// Verify access token — required login
exports.requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user to request
        const [rows] = await db.query(
            'SELECT id, name, email, is_admin, is_active FROM users WHERE id = ?',
            [decoded.id]
        );
        if (!rows.length || !rows[0].is_active) {
            return res.status(401).json({ error: 'User not found or deactivated' });
        }
        req.user = rows[0];
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Optional auth — attaches user if token present, continues either way
exports.optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [rows] = await db.query(
            'SELECT id, name, email, is_admin FROM users WHERE id = ? AND is_active = 1',
            [decoded.id]
        );
        req.user = rows[0] || null;
    } catch {
        req.user = null;
    }
    next();
};

// Admin only
exports.requireAdmin = async (req, res, next) => {
    exports.requireAuth(req, res, async () => {
        if (!req.user.is_admin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    });
};