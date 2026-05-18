// src/routes/community.js — Community Posts, Lost & Found, Reviews
const express = require('express');
const db      = require('../config/db');
const { requireAuth, optionalAuth, requireAdmin } = require('../middleware/auth');
const router  = express.Router();

// ══ REVIEWS ═══════════════════════════════════════════════════

// GET /api/community/reviews/:productId
router.get('/reviews/:productId', async (req, res) => {
    try {
        const [reviews] = await db.query(
            `SELECT r.*, u.name AS author
             FROM reviews r
             JOIN users u ON u.id = r.user_id
             WHERE r.product_id = ? AND r.is_approved = 1
             ORDER BY r.created_at DESC`,
            [req.params.productId]
        );
        const avg = reviews.length
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : 0;
        res.json({ reviews, average: parseFloat(avg), total: reviews.length });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/community/reviews/:productId
router.post('/reviews/:productId', requireAuth, async (req, res) => {
    const { rating, title, body } = req.body;
    if (!rating || !body) return res.status(400).json({ error: 'Rating and review text required' });
    if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be 1-5' });

    try {
        // One review per user per product
        const [existing] = await db.query(
            'SELECT id FROM reviews WHERE user_id = ? AND product_id = ?',
            [req.user.id, req.params.productId]
        );
        if (existing.length) return res.status(409).json({ error: 'You already reviewed this product' });

        await db.query(
            'INSERT INTO reviews (product_id, user_id, rating, title, body) VALUES (?, ?, ?, ?, ?)',
            [req.params.productId, req.user.id, rating, title || null, body]
        );

        // Update product rating
        await db.query(
            `UPDATE products SET
                rating = (SELECT AVG(rating) FROM reviews WHERE product_id = ? AND is_approved = 1),
                review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = ? AND is_approved = 1)
             WHERE id = ?`,
            [req.params.productId, req.params.productId, req.params.productId]
        );

        res.status(201).json({ message: 'Review submitted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/community/reviews/:id/reply (admin)
router.put('/reviews/:id/reply', requireAdmin, async (req, res) => {
    const { reply } = req.body;
    try {
        await db.query(
            'UPDATE reviews SET admin_reply = ?, replied_at = NOW() WHERE id = ?',
            [reply, req.params.id]
        );
        res.json({ message: 'Reply saved' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/community/reviews/:id (admin)
router.delete('/reviews/:id', requireAdmin, async (req, res) => {
    try {
        await db.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ══ LOST & FOUND ══════════════════════════════════════════════

// GET /api/community/lost-found
router.get('/lost-found', async (req, res) => {
    const { type, search, page = 1, limit = 12 } = req.query;
    try {
        let where = ['lf.is_resolved = 0'];
        let params = [];

        if (type && type !== 'all') { where.push('lf.type = ?'); params.push(type); }
        if (search) {
            where.push('(lf.breed LIKE ? OR lf.pet_name LIKE ? OR lf.location LIKE ?)');
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const [[{ total }]] = await db.query(
            `SELECT COUNT(*) AS total FROM lost_found lf WHERE ${where.join(' AND ')}`, params
        );

        const [reports] = await db.query(
            `SELECT lf.*, u.name AS poster_name,
                    (SELECT COUNT(*) FROM lost_found_comments c WHERE c.report_id = lf.id) AS comment_count
             FROM lost_found lf
             LEFT JOIN users u ON u.id = lf.user_id
             WHERE ${where.join(' AND ')}
             ORDER BY lf.created_at DESC
             LIMIT ? OFFSET ?`,
            [...params, parseInt(limit), offset]
        );
        res.json({ reports, total, pages: Math.ceil(total / parseInt(limit)) });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/community/lost-found
router.post('/lost-found', requireAuth, async (req, res) => {
    const { type, pet_name, breed, description, image, location, contact_name, contact_phone } = req.body;
    if (!type || !description || !location || !contact_name || !contact_phone) {
        return res.status(400).json({ error: 'Required fields missing' });
    }
    try {
        const [result] = await db.query(
            `INSERT INTO lost_found (user_id, type, pet_name, breed, description, image, location, contact_name, contact_phone)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.user.id, type, pet_name || null, breed || null, description, image || null, location, contact_name, contact_phone]
        );
        res.status(201).json({ message: 'Report submitted', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/community/lost-found/:id/comment
router.post('/lost-found/:id/comment', optionalAuth, async (req, res) => {
    const { body, guest_name } = req.body;
    if (!body) return res.status(400).json({ error: 'Comment text required' });
    try {
        await db.query(
            'INSERT INTO lost_found_comments (report_id, user_id, guest_name, body) VALUES (?, ?, ?, ?)',
            [req.params.id, req.user?.id || null, guest_name || null, body]
        );
        res.status(201).json({ message: 'Comment added' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/community/lost-found/:id/resolve (owner or admin)
router.put('/lost-found/:id/resolve', requireAuth, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT user_id FROM lost_found WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Report not found' });
        if (rows[0].user_id !== req.user.id && !req.user.is_admin) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        await db.query('UPDATE lost_found SET is_resolved = 1 WHERE id = ?', [req.params.id]);
        res.json({ message: 'Marked as resolved' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/community/lost-found/:id (admin)
router.delete('/lost-found/:id', requireAdmin, async (req, res) => {
    try {
        await db.query('DELETE FROM lost_found WHERE id = ?', [req.params.id]);
        res.json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ══ COMMUNITY POSTS ═══════════════════════════════════════════

// GET /api/community/posts
router.get('/posts', async (req, res) => {
    const { topic, sort = 'newest', page = 1, limit = 10 } = req.query;
    try {
        let where = [];
        let params = [];
        if (topic && topic !== 'all') { where.push('cp.topic = ?'); params.push(topic); }

        const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
        const orderBy = sort === 'popular' ? 'cp.likes DESC' : 'cp.is_pinned DESC, cp.created_at DESC';
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const [[{ total }]] = await db.query(
            `SELECT COUNT(*) AS total FROM community_posts cp ${whereClause}`, params
        );
        const [posts] = await db.query(
            `SELECT cp.*, u.name AS author, u.avatar AS author_avatar,
                    (SELECT COUNT(*) FROM community_comments cc WHERE cc.post_id = cp.id) AS comment_count
             FROM community_posts cp
             JOIN users u ON u.id = cp.user_id
             ${whereClause}
             ORDER BY ${orderBy}
             LIMIT ? OFFSET ?`,
            [...params, parseInt(limit), offset]
        );
        res.json({ posts, total, pages: Math.ceil(total / parseInt(limit)) });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/community/posts
router.post('/posts', requireAuth, async (req, res) => {
    const { topic, title, body, image } = req.body;
    if (!title || !body) return res.status(400).json({ error: 'Title and body required' });
    try {
        const [result] = await db.query(
            'INSERT INTO community_posts (user_id, topic, title, body, image) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, topic || 'general', title, body, image || null]
        );
        res.status(201).json({ message: 'Post created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/community/posts/:id/like
router.put('/posts/:id/like', requireAuth, async (req, res) => {
    try {
        const [existing] = await db.query(
            'SELECT 1 FROM post_likes WHERE user_id = ? AND post_id = ?',
            [req.user.id, req.params.id]
        );
        if (existing.length) {
            await db.query('DELETE FROM post_likes WHERE user_id = ? AND post_id = ?', [req.user.id, req.params.id]);
            await db.query('UPDATE community_posts SET likes = likes - 1 WHERE id = ?', [req.params.id]);
            return res.json({ liked: false });
        }
        await db.query('INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)', [req.user.id, req.params.id]);
        await db.query('UPDATE community_posts SET likes = likes + 1 WHERE id = ?', [req.params.id]);
        res.json({ liked: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/community/posts/:id/comments
router.get('/posts/:id/comments', async (req, res) => {
    try {
        const [comments] = await db.query(
            `SELECT cc.*, u.name AS author, u.avatar AS author_avatar
             FROM community_comments cc
             JOIN users u ON u.id = cc.user_id
             WHERE cc.post_id = ? AND cc.parent_id IS NULL
             ORDER BY cc.created_at ASC`,
            [req.params.id]
        );
        res.json({ comments });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/community/posts/:id/comments
router.post('/posts/:id/comments', requireAuth, async (req, res) => {
    const { body, parent_id } = req.body;
    if (!body) return res.status(400).json({ error: 'Comment text required' });
    try {
        await db.query(
            'INSERT INTO community_comments (post_id, user_id, parent_id, body) VALUES (?, ?, ?, ?)',
            [req.params.id, req.user.id, parent_id || null, body]
        );
        res.status(201).json({ message: 'Comment added' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/community/posts/:id (owner or admin)
router.delete('/posts/:id', requireAuth, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT user_id FROM community_posts WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Post not found' });
        if (rows[0].user_id !== req.user.id && !req.user.is_admin) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        await db.query('DELETE FROM community_posts WHERE id = ?', [req.params.id]);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;