// src/routes/shop.js — Cart, Wishlist, Orders, Vouchers
const express = require('express');
const db      = require('../config/db');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const router  = express.Router();

// ══ CART ══════════════════════════════════════════════════════

// GET /api/shop/cart
router.get('/cart', requireAuth, async (req, res) => {
    try {
        const [items] = await db.query(
            `SELECT c.id, c.quantity, c.product_id,
                    p.name, p.price, p.image, p.stock, p.is_active,
                    cat.slug AS category
             FROM cart c
             JOIN products p ON p.id = c.product_id
             JOIN categories cat ON cat.id = p.category_id
             WHERE c.user_id = ?`,
            [req.user.id]
        );
        const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        res.json({ items, subtotal });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/shop/cart — add or update quantity
router.post('/cart', requireAuth, async (req, res) => {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) return res.status(400).json({ error: 'product_id required' });
    try {
        // Check stock
        const [prod] = await db.query('SELECT stock, is_active FROM products WHERE id = ?', [product_id]);
        if (!prod.length || !prod[0].is_active) return res.status(404).json({ error: 'Product not found' });
        if (prod[0].stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

        await db.query(
            `INSERT INTO cart (user_id, product_id, quantity)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
            [req.user.id, product_id, quantity]
        );
        res.json({ message: 'Added to cart' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/shop/cart/:productId — set exact quantity
router.put('/cart/:productId', requireAuth, async (req, res) => {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
        // quantity 0 = remove
        await db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [req.user.id, req.params.productId]);
        return res.json({ message: 'Item removed' });
    }
    try {
        await db.query(
            'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
            [quantity, req.user.id, req.params.productId]
        );
        res.json({ message: 'Cart updated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/shop/cart/:productId
router.delete('/cart/:productId', requireAuth, async (req, res) => {
    try {
        await db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [req.user.id, req.params.productId]);
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/shop/cart — clear cart
router.delete('/cart', requireAuth, async (req, res) => {
    try {
        await db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ══ WISHLIST ══════════════════════════════════════════════════

// GET /api/shop/wishlist
router.get('/wishlist', requireAuth, async (req, res) => {
    try {
        const [items] = await db.query(
            `SELECT w.id, w.product_id, w.added_at,
                    p.name, p.price, p.image, p.rating, p.stock,
                    cat.slug AS category
             FROM wishlist w
             JOIN products p ON p.id = w.product_id
             JOIN categories cat ON cat.id = p.category_id
             WHERE w.user_id = ?
             ORDER BY w.added_at DESC`,
            [req.user.id]
        );
        res.json({ items });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/shop/wishlist/toggle
router.post('/wishlist/toggle', requireAuth, async (req, res) => {
    const { product_id } = req.body;
    if (!product_id) return res.status(400).json({ error: 'product_id required' });
    try {
        const [existing] = await db.query(
            'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
            [req.user.id, product_id]
        );
        if (existing.length) {
            await db.query('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [req.user.id, product_id]);
            return res.json({ message: 'Removed from wishlist', wishlisted: false });
        }
        await db.query('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)', [req.user.id, product_id]);
        res.json({ message: 'Added to wishlist', wishlisted: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ══ VOUCHERS ══════════════════════════════════════════════════

// POST /api/shop/voucher/validate
router.post('/voucher/validate', async (req, res) => {
    const { code, subtotal } = req.body;
    if (!code) return res.status(400).json({ error: 'Voucher code required' });
    try {
        const [rows] = await db.query(
            `SELECT * FROM vouchers
             WHERE code = ? AND is_active = 1
             AND (expires_at IS NULL OR expires_at > NOW())
             AND (max_uses IS NULL OR used_count < max_uses)`,
            [code.toUpperCase()]
        );
        if (!rows.length) return res.status(404).json({ error: 'Invalid or expired voucher' });

        const voucher = rows[0];
        if (subtotal < voucher.min_order) {
            return res.status(400).json({
                error: `Minimum order of ₱${voucher.min_order} required for this voucher`
            });
        }

        const discount = voucher.type === 'percent'
            ? (subtotal * voucher.value / 100)
            : voucher.value;

        res.json({
            valid: true,
            voucher: { code: voucher.code, type: voucher.type, value: voucher.value },
            discount: Math.min(discount, subtotal)
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ══ ORDERS ════════════════════════════════════════════════════

// POST /api/shop/orders — place order
router.post('/orders', requireAuth, async (req, res) => {
    const {
        first_name, last_name, email, phone,
        address_line, city, province, zip_code,
        payment_method = 'cod',
        voucher_code,
        notes
    } = req.body;

    if (!first_name || !last_name || !email || !phone || !address_line || !city || !province) {
        return res.status(400).json({ error: 'Complete shipping information required' });
    }

    try {
        // Get cart items
        const [cartItems] = await db.query(
            `SELECT c.quantity, p.id AS product_id, p.name, p.price, p.image, p.stock
             FROM cart c JOIN products p ON p.id = c.product_id
             WHERE c.user_id = ? AND p.is_active = 1`,
            [req.user.id]
        );
        if (!cartItems.length) return res.status(400).json({ error: 'Your cart is empty' });

        // Check stock for all items
        for (const item of cartItems) {
            if (item.stock < item.quantity) {
                return res.status(400).json({ error: `Insufficient stock for ${item.name}` });
            }
        }

        // Calculate totals
        const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const shipping_fee = subtotal >= 500 ? 0 : 80;
        let discount = 0;

        if (voucher_code) {
            const [vouchers] = await db.query(
                `SELECT * FROM vouchers WHERE code = ? AND is_active = 1
                 AND (expires_at IS NULL OR expires_at > NOW())
                 AND (max_uses IS NULL OR used_count < max_uses)`,
                [voucher_code.toUpperCase()]
            );
            if (vouchers.length) {
                const v = vouchers[0];
                discount = v.type === 'percent' ? (subtotal * v.value / 100) : v.value;
            }
        }

        const total = subtotal + shipping_fee - discount;

        // Generate order number PP-000001
        const orderNumber = 'PP-' + String(Date.now()).slice(-6).padStart(6, '0');

        // Insert order
        const [orderResult] = await db.query(
            `INSERT INTO orders
             (order_number, user_id, first_name, last_name, email, phone,
              address_line, city, province, zip_code,
              subtotal, shipping_fee, discount, total, voucher_code,
              payment_method, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
            [orderNumber, req.user.id, first_name, last_name, email, phone,
             address_line, city, province, zip_code || null,
             subtotal, shipping_fee, discount, total, voucher_code || null,
             payment_method]
        );

        const orderId = orderResult.insertId;

        // Insert order items + reduce stock
        for (const item of cartItems) {
            await db.query(
                'INSERT INTO order_items (order_id, product_id, name, image, price, quantity, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [orderId, item.product_id, item.name, item.image, item.price, item.quantity, item.price * item.quantity]
            );
            await db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
        }

        // Increment voucher used count
        if (voucher_code) {
            await db.query('UPDATE vouchers SET used_count = used_count + 1 WHERE code = ?', [voucher_code.toUpperCase()]);
        }

        // Clear cart
        await db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

        res.status(201).json({
            message: 'Order placed successfully!',
            order: { id: orderId, order_number: orderNumber, total, status: 'pending' }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/shop/orders — user's own orders
router.get('/orders', requireAuth, async (req, res) => {
    try {
        const [orders] = await db.query(
            `SELECT o.*, COUNT(oi.id) AS item_count
             FROM orders o
             LEFT JOIN order_items oi ON oi.order_id = o.id
             WHERE o.user_id = ?
             GROUP BY o.id
             ORDER BY o.created_at DESC`,
            [req.user.id]
        );
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/shop/orders/:id — order detail
router.get('/orders/:id', requireAuth, async (req, res) => {
    try {
        const [orders] = await db.query(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );
        if (!orders.length) return res.status(404).json({ error: 'Order not found' });

        const [items] = await db.query(
            'SELECT * FROM order_items WHERE order_id = ?',
            [req.params.id]
        );
        res.json({ order: orders[0], items });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ══ ADMIN ORDER MANAGEMENT ════════════════════════════════════

// GET /api/shop/admin/orders — all orders
router.get('/admin/orders', requireAdmin, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        let where = [];
        let params = [];
        if (status) { where.push('o.status = ?'); params.push(status); }

        const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const [orders] = await db.query(
            `SELECT o.*, COUNT(oi.id) AS item_count
             FROM orders o
             LEFT JOIN order_items oi ON oi.order_id = o.id
             ${whereClause}
             GROUP BY o.id
             ORDER BY o.created_at DESC
             LIMIT ? OFFSET ?`,
            [...params, parseInt(limit), offset]
        );
        const [[{ total }]] = await db.query(
            `SELECT COUNT(*) AS total FROM orders o ${whereClause}`, params
        );
        res.json({ orders, total });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/shop/admin/orders/:id/status
router.put('/admin/orders/:id/status', requireAdmin, async (req, res) => {
    const { status } = req.body;
    const valid = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    try {
        await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Order status updated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;