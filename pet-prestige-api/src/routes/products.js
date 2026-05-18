// src/routes/products.js — Products & Categories
const express = require('express');
const db      = require('../config/db');
const { requireAdmin } = require('../middleware/auth');
const router  = express.Router();

// ── GET /api/products ────────────────────────────────────────
// Query params: category, subcategory, search, minPrice, maxPrice, minRating, sort, page, limit
router.get('/', async (req, res) => {
    try {
        const {
            category, subcategory, search,
            minPrice = 0, maxPrice = 99999,
            minRating = 0,
            sort = 'featured',
            page = 1, limit = 20
        } = req.query;

        let where = ['p.is_active = 1'];
        let params = [];

        if (category) {
            where.push('c.slug = ?');
            params.push(category);
        }
        if (subcategory) {
            where.push('p.subcategory = ?');
            params.push(subcategory);
        }
        if (search) {
            where.push('(p.name LIKE ? OR p.description LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }
        where.push('p.price BETWEEN ? AND ?');
        params.push(parseFloat(minPrice), parseFloat(maxPrice));

        if (parseFloat(minRating) > 0) {
            where.push('p.rating >= ?');
            params.push(parseFloat(minRating));
        }

        const orderMap = {
            'featured':   'p.is_featured DESC, p.created_at DESC',
            'price-low':  'p.price ASC',
            'price-high': 'p.price DESC',
            'rating':     'p.rating DESC',
            'newest':     'p.created_at DESC'
        };
        const orderBy = orderMap[sort] || orderMap['featured'];

        const offset = (parseInt(page) - 1) * parseInt(limit);

        // Count total
        const [countRows] = await db.query(
            `SELECT COUNT(*) AS total FROM products p
             JOIN categories c ON c.id = p.category_id
             WHERE ${where.join(' AND ')}`,
            params
        );
        const total = countRows[0].total;

        // Fetch products
        const [products] = await db.query(
            `SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon
             FROM products p
             JOIN categories c ON c.id = p.category_id
             WHERE ${where.join(' AND ')}
             ORDER BY ${orderBy}
             LIMIT ? OFFSET ?`,
            [...params, parseInt(limit), offset]
        );

        res.json({
            products,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET /api/products/featured ───────────────────────────────
router.get('/featured', async (req, res) => {
    try {
        const [products] = await db.query(
            `SELECT p.*, c.name AS category_name, c.slug AS category_slug
             FROM products p
             JOIN categories c ON c.id = p.category_id
             WHERE p.is_featured = 1 AND p.is_active = 1
             ORDER BY p.created_at DESC LIMIT 8`
        );
        res.json({ products });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET /api/products/:id ────────────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT p.*, c.name AS category_name, c.slug AS category_slug
             FROM products p
             JOIN categories c ON c.id = p.category_id
             WHERE p.id = ? AND p.is_active = 1`,
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Product not found' });

        // Get gallery images
        const [images] = await db.query(
            'SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order',
            [req.params.id]
        );

        // Get related products (same category)
        const [related] = await db.query(
            `SELECT p.*, c.slug AS category_slug FROM products p
             JOIN categories c ON c.id = p.category_id
             WHERE p.category_id = ? AND p.id != ? AND p.is_active = 1
             ORDER BY p.rating DESC LIMIT 4`,
            [rows[0].category_id, req.params.id]
        );

        res.json({ product: rows[0], images, related });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET /api/products/categories/all ────────────────────────
router.get('/categories/all', async (req, res) => {
    try {
        const [categories] = await db.query(
            'SELECT * FROM categories ORDER BY sort_order'
        );
        res.json({ categories });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ══ ADMIN ROUTES ══════════════════════════════════════════════

// ── POST /api/products (admin) ───────────────────────────────
router.post('/', requireAdmin, async (req, res) => {
    const { name, description, price, original_price, category_id, subcategory, image, stock, is_featured } = req.body;
    if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'name, price, category_id are required' });
    }
    try {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
        const [result] = await db.query(
            `INSERT INTO products (name, slug, description, price, original_price, category_id, subcategory, image, stock, is_featured)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, slug, description || null, price, original_price || null, category_id, subcategory || null, image || null, stock || 0, is_featured ? 1 : 0]
        );
        res.status(201).json({ message: 'Product created', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── PUT /api/products/:id (admin) ────────────────────────────
router.put('/:id', requireAdmin, async (req, res) => {
    const { name, description, price, original_price, category_id, subcategory, image, stock, is_featured, is_active } = req.body;
    try {
        await db.query(
            `UPDATE products SET
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                price = COALESCE(?, price),
                original_price = COALESCE(?, original_price),
                category_id = COALESCE(?, category_id),
                subcategory = COALESCE(?, subcategory),
                image = COALESCE(?, image),
                stock = COALESCE(?, stock),
                is_featured = COALESCE(?, is_featured),
                is_active = COALESCE(?, is_active)
             WHERE id = ?`,
            [name||null, description||null, price||null, original_price||null,
             category_id||null, subcategory||null, image||null, stock!=null?stock:null,
             is_featured!=null?is_featured:null, is_active!=null?is_active:null, req.params.id]
        );
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── DELETE /api/products/:id (admin) ─────────────────────────
router.delete('/:id', requireAdmin, async (req, res) => {
    try {
        await db.query('UPDATE products SET is_active = 0 WHERE id = ?', [req.params.id]);
        res.json({ message: 'Product deactivated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;