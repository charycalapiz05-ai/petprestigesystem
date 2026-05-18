// src/services/notifications.js
// Email via Nodemailer + Gmail SMTP
// SMS via Semaphore (Philippine SMS gateway)
const nodemailer = require('nodemailer');

// ── Email transporter (Gmail SMTP) ───────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,   // your gmail
        pass: process.env.EMAIL_PASS    // gmail app password
    }
});

// ── Send order confirmation email ────────────────────────────
async function sendOrderConfirmation(order, items) {
    const itemRows = items.map(i => `
        <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;">${i.name}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₱${parseFloat(i.price).toLocaleString()}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₱${parseFloat(i.subtotal).toLocaleString()}</td>
        </tr>
    `).join('');

    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="font-family:Arial,sans-serif;background:#f8f9fa;margin:0;padding:0;">
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background:#FF6B35;padding:32px;text-align:center;">
                <h1 style="color:white;margin:0;font-size:1.8rem;">🐾 Pet Prestige</h1>
                <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Order Confirmation</p>
            </div>

            <!-- Body -->
            <div style="padding:32px;">
                <h2 style="color:#2C3E50;margin-bottom:4px;">Thank you for your order! 🎉</h2>
                <p style="color:#666;">Hi ${order.first_name}, your order has been received and is being processed.</p>

                <!-- Order Info -->
                <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:20px 0;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <span style="color:#888;font-size:0.85rem;">Order Number</span>
                        <strong style="color:#FF6B35;">${order.order_number}</strong>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <span style="color:#888;font-size:0.85rem;">Payment Method</span>
                        <strong>${order.payment_method.toUpperCase()}</strong>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                        <span style="color:#888;font-size:0.85rem;">Delivery Address</span>
                        <strong style="text-align:right;max-width:60%;">${order.address_line}, ${order.city}, ${order.province}</strong>
                    </div>
                </div>

                <!-- Items Table -->
                <h3 style="color:#2C3E50;margin-bottom:12px;">Order Items</h3>
                <table style="width:100%;border-collapse:collapse;font-size:0.88rem;">
                    <thead>
                        <tr style="background:#f8f9fa;">
                            <th style="padding:8px;text-align:left;color:#888;">Product</th>
                            <th style="padding:8px;text-align:center;color:#888;">Qty</th>
                            <th style="padding:8px;text-align:right;color:#888;">Price</th>
                            <th style="padding:8px;text-align:right;color:#888;">Total</th>
                        </tr>
                    </thead>
                    <tbody>${itemRows}</tbody>
                </table>

                <!-- Totals -->
                <div style="margin-top:16px;padding-top:16px;border-top:2px solid #eee;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                        <span style="color:#666;">Subtotal</span>
                        <span>₱${parseFloat(order.subtotal).toLocaleString()}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                        <span style="color:#666;">Shipping</span>
                        <span>${parseFloat(order.shipping_fee) === 0 ? '<span style="color:#27ae60;">FREE</span>' : '₱' + parseFloat(order.shipping_fee).toLocaleString()}</span>
                    </div>
                    ${parseFloat(order.discount) > 0 ? `
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                        <span style="color:#27ae60;">Discount</span>
                        <span style="color:#27ae60;">-₱${parseFloat(order.discount).toLocaleString()}</span>
                    </div>` : ''}
                    <div style="display:flex;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px solid #eee;">
                        <strong style="font-size:1.05rem;">Total</strong>
                        <strong style="font-size:1.05rem;color:#FF6B35;">₱${parseFloat(order.total).toLocaleString()}</strong>
                    </div>
                </div>

                <!-- CTA -->
                <div style="text-align:center;margin-top:32px;">
                    <a href="http://localhost:8080/profile.html" style="background:#FF6B35;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">
                        Track My Order
                    </a>
                </div>

                <p style="color:#aaa;font-size:0.8rem;margin-top:32px;text-align:center;">
                    Questions? Contact us at hello@petprestige.ph or +63 912 345 6789<br>
                    Mon–Sat, 8AM–6PM PHT
                </p>
            </div>

            <!-- Footer -->
            <div style="background:#f8f9fa;padding:16px;text-align:center;">
                <p style="color:#aaa;font-size:0.75rem;margin:0;">
                    © 2026 Pet Prestige. Made with 🐾 in the Philippines.
                </p>
            </div>
        </div>
    </body>
    </html>`;

    try {
        await transporter.sendMail({
            from:    `"Pet Prestige 🐾" <${process.env.EMAIL_USER}>`,
            to:      order.email,
            subject: `Order Confirmed! ${order.order_number} - Pet Prestige`,
            html
        });
        console.log('Order confirmation email sent to', order.email);
        return true;
    } catch (err) {
        console.error('Email send failed:', err.message);
        return false;
    }
}

// ── Send order status update email ───────────────────────────
async function sendStatusUpdate(order) {
    const statusMessages = {
        processing: { emoji: '⚙️', title: 'Your order is being processed!', msg: 'We\'re preparing your items for shipment.' },
        shipped:    { emoji: '🚚', title: 'Your order is on its way!',       msg: 'Your package has been handed to our delivery partner.' },
        delivered:  { emoji: '✅', title: 'Order delivered!',                msg: 'Your order has been delivered. Enjoy your purchase!' },
        cancelled:  { emoji: '❌', title: 'Order cancelled',                  msg: 'Your order has been cancelled. If you have concerns, please contact us.' }
    };

    const info = statusMessages[order.status];
    if (!info) return;

    const html = `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:32px;">
        <h1 style="color:#FF6B35;">🐾 Pet Prestige</h1>
        <h2>${info.emoji} ${info.title}</h2>
        <p>Hi ${order.first_name},</p>
        <p>${info.msg}</p>
        <div style="background:#f8f9fa;padding:16px;border-radius:8px;margin:20px 0;">
            <strong>Order:</strong> ${order.order_number}<br>
            <strong>Status:</strong> <span style="color:#FF6B35;text-transform:capitalize;">${order.status}</span>
        </div>
        <a href="http://localhost:8080/profile.html" style="background:#FF6B35;color:white;padding:10px 24px;border-radius:6px;text-decoration:none;">View Order</a>
        <p style="color:#aaa;font-size:0.8rem;margin-top:24px;">Pet Prestige · hello@petprestige.ph · +63 912 345 6789</p>
    </div>`;

    try {
        await transporter.sendMail({
            from:    `"Pet Prestige 🐾" <${process.env.EMAIL_USER}>`,
            to:      order.email,
            subject: `${info.emoji} Order Update: ${order.order_number} is now ${order.status}`,
            html
        });
        return true;
    } catch (err) {
        console.error('Status email failed:', err.message);
        return false;
    }
}

// ── Send SMS via Semaphore ────────────────────────────────────
async function sendSMS(phone, message) {
    if (!process.env.SEMAPHORE_API_KEY) {
        console.log('SMS skipped — no Semaphore API key configured');
        return false;
    }

    // Clean phone number — remove spaces, dashes, +63 prefix
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('+63')) cleaned = '0' + cleaned.slice(3);
    if (cleaned.startsWith('63'))  cleaned = '0' + cleaned.slice(2);

    try {
        const params = new URLSearchParams({
            apikey:      process.env.SEMAPHORE_API_KEY,
            number:      cleaned,
            message:     message,
            sendername:  process.env.SEMAPHORE_SENDER || 'PETPRESTIGE'
        });

        const res  = await fetch('https://api.semaphore.co/api/v4/messages', {
            method:  'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body:    params.toString()
        });
        const data = await res.json();
        console.log('SMS sent to', cleaned, ':', data);
        return true;
    } catch (err) {
        console.error('SMS send failed:', err.message);
        return false;
    }
}

// ── SMS Templates ─────────────────────────────────────────────
async function sendOrderSMS(order) {
    const message = `Pet Prestige: Your order ${order.order_number} has been confirmed! Total: P${parseFloat(order.total).toLocaleString()}. Track at petprestige.ph`;
    return sendSMS(order.phone, message);
}

async function sendStatusSMS(order) {
    const messages = {
        processing: `Pet Prestige: Order ${order.order_number} is now being processed. We'll notify you when it ships!`,
        shipped:    `Pet Prestige: Great news! Order ${order.order_number} is on its way to you. Expected delivery: 2-5 days.`,
        delivered:  `Pet Prestige: Order ${order.order_number} has been delivered! Thank you for shopping with us. 🐾`,
        cancelled:  `Pet Prestige: Order ${order.order_number} has been cancelled. Contact us at +63 912 345 6789 for help.`
    };
    const msg = messages[order.status];
    if (!msg) return false;
    return sendSMS(order.phone, msg);
}

module.exports = {
    sendOrderConfirmation,
    sendStatusUpdate,
    sendOrderSMS,
    sendStatusSMS,
    sendSMS
};