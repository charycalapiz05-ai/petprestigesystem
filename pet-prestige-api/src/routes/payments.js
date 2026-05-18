// src/routes/payments.js — PayMongo Payment Gateway
// Handles GCash, PayMaya, and card payments
const express = require('express');
const db      = require('../config/db');
const { requireAuth } = require('../middleware/auth');
const router  = express.Router();

const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_BASE   = 'https://api.paymongo.com/v1';

// Helper: PayMongo API call
async function paymongoRequest(method, path, body = null) {
    const credentials = Buffer.from(PAYMONGO_SECRET + ':').toString('base64');
    const options = {
        method,
        headers: {
            'Authorization': 'Basic ' + credentials,
            'Content-Type':  'application/json',
            'Accept':        'application/json'
        }
    };
    if (body) options.body = JSON.stringify(body);

    const res  = await fetch(PAYMONGO_BASE + path, options);
    const data = await res.json();
    if (!res.ok) throw { status: res.status, message: data.errors?.[0]?.detail || 'PayMongo error' };
    return data;
}

// ── POST /api/payments/create-link ────────────────────────────
// Creates a PayMongo payment link for GCash/PayMaya/card
router.post('/create-link', requireAuth, async (req, res) => {
    const { order_id } = req.body;
    if (!order_id) return res.status(400).json({ error: 'order_id required' });

    try {
        // Get order details
        const [orders] = await db.query(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [order_id, req.user.id]
        );
        if (!orders.length) return res.status(404).json({ error: 'Order not found' });
        const order = orders[0];

        // Create PayMongo payment link
        const data = await paymongoRequest('POST', '/links', {
            data: {
                attributes: {
                    amount:      Math.round(order.total * 100), // in centavos
                    description: `Pet Prestige Order ${order.order_number}`,
                    remarks:     `Order ID: ${order.id}`,
                }
            }
        });

        // Save payment link to order
        await db.query(
            'UPDATE orders SET payment_link = ?, payment_reference = ? WHERE id = ?',
            [data.data.attributes.checkout_url, data.data.id, order_id]
        );

        res.json({
            payment_url:  data.data.attributes.checkout_url,
            reference_id: data.data.id,
            amount:       order.total
        });
    } catch (err) {
        console.error('PayMongo error:', err);
        res.status(500).json({ error: err.message || 'Payment creation failed' });
    }
});

// ── POST /api/payments/create-intent ─────────────────────────
// Creates a payment intent for specific methods (gcash/paymaya)
router.post('/create-intent', requireAuth, async (req, res) => {
    const { order_id, method } = req.body; // method: gcash | paymaya | card
    if (!order_id || !method) return res.status(400).json({ error: 'order_id and method required' });

    const methodMap = { gcash: 'gcash', paymaya: 'paymaya', card: 'card' };
    if (!methodMap[method]) return res.status(400).json({ error: 'Invalid payment method' });

    try {
        const [orders] = await db.query(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [order_id, req.user.id]
        );
        if (!orders.length) return res.status(404).json({ error: 'Order not found' });
        const order = orders[0];

        // Step 1: Create payment intent
        const intentData = await paymongoRequest('POST', '/payment_intents', {
            data: {
                attributes: {
                    amount:                Math.round(order.total * 100),
                    payment_method_allowed: [methodMap[method]],
                    currency:              'PHP',
                    description:           `Pet Prestige Order ${order.order_number}`,
                    statement_descriptor:  'PET PRESTIGE',
                    metadata:              { order_id: order.id, order_number: order.order_number }
                }
            }
        });

        res.json({
            client_key:   intentData.data.attributes.client_key,
            intent_id:    intentData.data.id,
            amount:       order.total,
            order_number: order.order_number
        });
    } catch (err) {
        console.error('PayMongo intent error:', err);
        res.status(500).json({ error: err.message || 'Payment intent creation failed' });
    }
});

// ── POST /api/payments/webhook ────────────────────────────────
// PayMongo webhook — called when payment succeeds or fails
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const event = JSON.parse(req.body);
        const type  = event.data?.attributes?.type;
        const data  = event.data?.attributes?.data;

        console.log('PayMongo webhook:', type);

        if (type === 'payment.paid') {
            const orderId = data?.attributes?.metadata?.order_id;
            if (orderId) {
                await db.query(
                    'UPDATE orders SET payment_status = ?, status = ? WHERE id = ?',
                    ['paid', 'processing', orderId]
                );
                console.log('Order', orderId, 'marked as paid');
            }
        }

        if (type === 'payment.failed') {
            const orderId = data?.attributes?.metadata?.order_id;
            if (orderId) {
                await db.query(
                    'UPDATE orders SET payment_status = ? WHERE id = ?',
                    ['failed', orderId]
                );
            }
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(400).json({ error: 'Webhook processing failed' });
    }
});

// ── GET /api/payments/status/:orderId ────────────────────────
// Check payment status of an order
router.get('/status/:orderId', requireAuth, async (req, res) => {
    try {
        const [orders] = await db.query(
            'SELECT payment_status, payment_reference, total, order_number FROM orders WHERE id = ? AND user_id = ?',
            [req.params.orderId, req.user.id]
        );
        if (!orders.length) return res.status(404).json({ error: 'Order not found' });
        res.json({ payment: orders[0] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;