# 🐾 Pet Prestige API — Setup Guide

## Folder Structure
```
pet-prestige-api/
├── src/
│   ├── index.js              ← Main server entry point
│   ├── config/
│   │   └── db.js             ← MySQL connection
│   ├── middleware/
│   │   └── auth.js           ← JWT authentication
│   └── routes/
│       ├── auth.js           ← Register, Login, Profile
│       ├── products.js       ← Shop catalog
│       ├── shop.js           ← Cart, Wishlist, Orders
│       ├── community.js      ← Posts, Reviews, Lost & Found
│       └── admin.js          ← Admin dashboard & management
├── uploads/                  ← Image uploads stored here
├── .env                      ← Your environment variables
├── .env.example              ← Template (copy to .env)
└── package.json
```

---

## Step 1 — Prerequisites
Make sure you have installed:
- **Node.js** (v18+): https://nodejs.org
- **XAMPP** (for MySQL): https://www.apachefriends.org
- **ngrok**: https://ngrok.com/download

---

## Step 2 — Install & Configure

### 2a. Install dependencies
```bash
cd pet-prestige-api
npm install
```

### 2b. Create your .env file
Copy `.env.example` to `.env`:
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env` — the defaults work for XAMPP with no MySQL password:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          ← leave blank for XAMPP default
DB_NAME=pet_prestige
JWT_SECRET=your_random_secret_change_this
JWT_REFRESH_SECRET=another_random_secret
```

---

## Step 3 — Start MySQL & Import Schema
1. Open **XAMPP Control Panel**
2. Start **Apache** and **MySQL**
3. Go to `http://localhost/phpmyadmin`
4. Click **Import** → select `pet_prestige_schema.sql` → **Go**

---

## Step 4 — Start the API
```bash
npm run dev       ← development (auto-restarts on changes)
# or
npm start         ← production
```

You should see:
```
✅ MySQL connected successfully

🐾 ═══════════════════════════════════════
   Pet Prestige API running on port 5000
   http://localhost:5000/api/health
🐾 ═══════════════════════════════════════
```

---

## Step 5 — Expose with ngrok

### Install ngrok
1. Download from https://ngrok.com/download
2. Create a free account at https://ngrok.com
3. Copy your auth token from the dashboard
4. Run: `ngrok config add-authtoken YOUR_TOKEN`

### Start ngrok tunnel
Open a new terminal window and run:
```bash
ngrok http 5000
```

You'll see output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:5000
```

**Copy that https URL** — that's your public API URL!

---

## Step 6 — Connect Frontend to API

In your frontend HTML files, add this config before `script.js`:
```html
<script>
  // Change this to your ngrok URL when sharing with others
  // For local testing, use http://localhost:5000
  window.API_BASE = 'https://abc123.ngrok-free.app/api';
</script>
```

---

## API Endpoints Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| GET  | /api/auth/me | Get current user |
| PUT  | /api/auth/profile | Update profile |
| PUT  | /api/auth/change-password | Change password |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | /api/products | List products (filterable) |
| GET  | /api/products/featured | Featured products |
| GET  | /api/products/:id | Product detail |
| GET  | /api/products/categories/all | All categories |
| POST | /api/products | Create product (admin) |
| PUT  | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |

### Shop
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST/PUT/DELETE | /api/shop/cart | Cart management |
| GET | /api/shop/wishlist | Get wishlist |
| POST | /api/shop/wishlist/toggle | Toggle wishlist item |
| POST | /api/shop/voucher/validate | Check voucher code |
| POST | /api/shop/orders | Place order |
| GET  | /api/shop/orders | User's orders |
| GET  | /api/shop/orders/:id | Order detail |
| GET  | /api/shop/admin/orders | All orders (admin) |
| PUT  | /api/shop/admin/orders/:id/status | Update order status (admin) |

### Community
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | /api/community/reviews/:productId | Product reviews |
| PUT | /api/community/reviews/:id/reply | Admin reply to review |
| GET/POST | /api/community/lost-found | Lost & Found reports |
| POST | /api/community/lost-found/:id/comment | Comment on report |
| GET/POST | /api/community/posts | Community posts |
| PUT | /api/community/posts/:id/like | Like/unlike post |
| GET/POST | /api/community/posts/:id/comments | Post comments |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/dashboard | Dashboard stats & charts |
| GET | /api/admin/customers | Customer list |
| GET | /api/admin/reports | Analytics reports |
| GET | /api/admin/activity-log | Audit log |

---

## Default Admin Account
After importing the schema, **reset the admin password** by running this in phpMyAdmin SQL tab:

```sql
-- Replace 'YourNewPassword' with your desired password
UPDATE users SET password_hash = '$2b$12$...' WHERE email = 'admin@petprestige.ph';
```

Or use the register endpoint to create a new admin, then set `is_admin = 1` in phpMyAdmin.

---

## Troubleshooting

**"MySQL connection failed"**
→ Make sure MySQL is running in XAMPP

**"CORS error" in browser**
→ Add your frontend URL to `.env` FRONTEND_URL

**"Cannot find module"**
→ Run `npm install` again

**ngrok "ERR_NGROK_3200"**
→ Your API server isn't running. Start it with `npm run dev` first.
