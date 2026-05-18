// src/routes/admin.js — Admin Dashboard & Management
const express = require('express');
const db      = require('../config/db');
const { requireAdmin } = require('../middleware/auth');
const router  = express.Router();

// All routes require admin
router.use(requireAdmin);

// ── GET /api/admin/dashboard ─────────────────────────────────
router.get('/dashboard', async (req, res) => {
    try {
        const [[{ total_revenue }]] = await db.query(
            "SELECT COALESCE(SUM(total),0) AS total_revenue FROM orders WHERE status != 'cancelled'"
        );
        const [[{ total_orders }]] = await db.query('SELECT COUNT(*) AS total_orders FROM orders');
        const [[{ total_products }]] = await db.query('SELECT COUNT(*) AS total_products FROM products WHERE is_active = 1');
        const [[{ total_customers }]] = await db.query('SELECT COUNT(DISTINCT email) AS total_customers FROM orders');

        // Orders by status
        const [statusBreakdown] = await db.query(
            'SELECT status, COUNT(*) AS count FROM orders GROUP BY status'
        );

        // Recent orders
        const [recentOrders] = await db.query(
            `SELECT id, order_number, CONCAT(first_name,' ',last_name) AS customer,
                    total, status, created_at
             FROM orders ORDER BY created_at DESC LIMIT 8`
        );

        // Monthly revenue (last 6 months)
        const [monthlyRevenue] = await db.query(
            `SELECT DATE_FORMAT(created_at, '%b %Y') AS month,
                    SUM(total) AS revenue,
                    COUNT(*) AS orders
             FROM orders
             WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
             AND status != 'cancelled'
             GROUP BY DATE_FORMAT(created_at, '%Y-%m')
             ORDER BY MIN(created_at)`
        );

        // Top products
        const [topProducts] = await db.query(
            `SELECT p.name, SUM(oi.quantity) AS total_sold, SUM(oi.subtotal) AS revenue
             FROM order_items oi
             JOIN products p ON p.id = oi.product_id
             GROUP BY oi.product_id
             ORDER BY total_sold DESC LIMIT 5`
        );

        res.json({
            stats: { total_revenue, total_orders, total_products, total_customers },
            statusBreakdown,
            recentOrders,
            monthlyRevenue,
            topProducts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET /api/admin/customers ─────────────────────────────────
router.get('/customers', async (req, res) => {
    const { search, page = 1, limit = 20 } = req.query;
    try {
        let where = [];
        let params = [];
        if (search) {
            where.push('(u.name LIKE ? OR u.email LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }
        const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const [customers] = await db.query(
            `SELECT u.id, u.name, u.email, u.phone, u.created_at,
                    COUNT(o.id) AS order_count,
                    COALESCE(SUM(o.total),0) AS total_spent
             FROM users u
             LEFT JOIN orders o ON o.email = u.email
             ${whereClause}
             GROUP BY u.id
             ORDER BY total_spent DESC
             LIMIT ? OFFSET ?`,
            [...params, parseInt(limit), offset]
        );
        res.json({ customers });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET /api/admin/activity-log ──────────────────────────────
router.get('/activity-log', async (req, res) => {
    try {
        const [logs] = await db.query(
            `SELECT al.*, u.name AS actor
             FROM activity_log al
             LEFT JOIN users u ON u.id = al.user_id
             ORDER BY al.created_at DESC LIMIT 100`
        );
        res.json({ logs });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── GET /api/admin/reports ───────────────────────────────────
router.get('/reports', async (req, res) => {
    const { from, to } = req.query;
    try {
        let where = ["status != 'cancelled'"];
        let params = [];
        if (from) { where.push('created_at >= ?'); params.push(from); }
        if (to)   { where.push('created_at <= ?'); params.push(to + ' 23:59:59'); }

        const [[stats]] = await db.query(
            `SELECT
                COALESCE(SUM(total),0) AS total_revenue,
                COUNT(*) AS total_orders,
                COALESCE(AVG(total),0) AS avg_order_value,
                COUNT(DISTINCT email) AS unique_customers
             FROM orders WHERE ${where.join(' AND ')}`,
            params
        );

        const [byStatus] = await db.query(
            `SELECT status, COUNT(*) AS count, SUM(total) AS revenue
             FROM orders WHERE ${where.join(' AND ')}
             GROUP BY status`, params
        );

        const [topProducts] = await db.query(
            `SELECT p.name, SUM(oi.quantity) AS qty, SUM(oi.subtotal) AS revenue
             FROM order_items oi
             JOIN products p ON p.id = oi.product_id
             JOIN orders o ON o.id = oi.order_id
             WHERE ${where.join(' AND ')}
             GROUP BY oi.product_id
             ORDER BY revenue DESC LIMIT 10`,
            params
        );

        res.json({ stats, byStatus, topProducts });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── Lost & Found admin management ───────────────────────────
router.put('/lost-found/:id/verify', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT is_verified FROM lost_found WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Report not found' });
        const newVal = rows[0].is_verified ? 0 : 1;
        await db.query('UPDATE lost_found SET is_verified = ? WHERE id = ?', [newVal, req.params.id]);
        res.json({ verified: !!newVal });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;