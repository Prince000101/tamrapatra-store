# Tamrapatra — Royal Indian Handicrafts Store

Full-stack Indian handicrafts e-commerce app built with React (Vite) + Node.js/Express + MongoDB (Atlas).

---

## URLs (Local Dev)

| Service      | URL                              |
|--------------|----------------------------------|
| Frontend     | http://localhost:5173            |
| Backend API  | http://localhost:5000            |
| Admin Panel  | http://localhost:5173/admin      |
| Admin Login  | http://localhost:5173/admin/login |

---

## Login Credentials

### Admin Account

| Field    | Value             |
|----------|-------------------|
| Email    | prince@creatordev.in |
| Password | Admin@123         |

The admin account is created by running the seed script. It has full access to the admin dashboard at `/admin` where you can manage products, orders, users, coupons, and reviews.

### Regular Users

No default user is seeded. Users must **register themselves** at `/register` on the frontend. After registering, they can browse products, add to cart, place orders, and manage their wishlist.

---

## Quick Start

### Prerequisites
- **Node.js** v18+
- **npm**
- **MongoDB** — [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) or local

### 1. Clone & Install

```bash
git clone <repo-url>
cd Tamrapatra

# Backend
cd backend
cp .env.example .env   # then edit .env with your values
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/Tamrapatra
JWT_SECRET=<generate with: openssl rand -hex 64>
ADMIN_PASSWORD=Admin@123
ADMIN_EMAIL=prince@creatordev.in
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database & Run

```bash
# Terminal 1 — Backend
cd backend
npm run seed    # creates admin account + sample products
npm start       # http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm run dev     # http://localhost:5173
```

---

## Features

### Customer Features
- Browse products with search, category filter, and sort
- Product detail page with image gallery and variants
- Shopping cart (add, update quantity, remove)
- Wishlist (persisted locally and synced to backend when logged in)
- Checkout with COD (Cash on Delivery)
- Order tracking by order ID
- User authentication (register / login / logout)
- Responsive design (mobile, tablet, desktop)

### Admin Features
- Dashboard with stats (users, products, orders, revenue)
- Product management (CRUD)
- Order management (view all, mark delivered)
- User management (view all users)
- Coupon management (create, delete discount codes)
- Review management (view and delete customer reviews)
- Sales chart (last 30 days)
- Low stock alerts

---

## API Routes

### Public
| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| GET    | /api/products             | All products              |
| GET    | /api/products/:id         | Single product            |
| GET    | /api/products/:id/reviews | Reviews for a product     |
| POST   | /api/auth/login           | Login                     |
| POST   | /api/auth/register        | Register                  |

### Protected (auth required)
| Method | Endpoint                        | Description           |
|--------|---------------------------------|-----------------------|
| GET    | /api/cart                       | Get cart              |
| POST   | /api/cart                       | Add to cart           |
| DELETE | /api/cart/:id                   | Remove from cart      |
| GET    | /api/wishlist                   | Get wishlist          |
| POST   | /api/wishlist                   | Add to wishlist       |
| DELETE | /api/wishlist/:productId        | Remove from wishlist  |
| POST   | /api/orders                     | Create order          |
| GET    | /api/orders/:id                 | Get order by ID       |

### Admin Only
| Method | Endpoint                        | Description                  |
|--------|---------------------------------|------------------------------|
| GET    | /api/admin/dashboard            | Dashboard stats              |
| GET    | /api/admin/recent-orders        | Last 5 orders                |
| GET    | /api/admin/top-products         | Top selling products         |
| GET    | /api/admin/low-stock            | Products with stock ≤ 10     |
| GET    | /api/admin/product-stats        | Cart/wishlist counts         |
| GET    | /api/admin/sales                | Daily sales (last 30 days)   |
| GET    | /api/auth/users                 | All users                    |
| GET    | /api/orders/admin               | All orders                   |
| PUT    | /api/orders/:id/deliver         | Mark order delivered         |
| POST   | /api/products                   | Create product               |
| PUT    | /api/products/:id               | Update product               |
| DELETE | /api/products/:id               | Delete product               |
| GET    | /api/coupons                    | All coupons                  |
| POST   | /api/coupons                    | Create coupon                |
| DELETE | /api/coupons/:id                | Delete coupon                |
| GET    | /api/reviews                    | All reviews                  |
| DELETE | /api/reviews/:id                | Delete review                |

---

## Tech Stack

| Layer    | Technology                                    |
|----------|-----------------------------------------------|
| Frontend | React 19, Vite 8, Tailwind v4, Framer Motion |
| Backend  | Node.js, Express, Mongoose, JWT, bcryptjs     |
| Database | MongoDB Atlas                                 |
| Auth     | JWT (30-day expiry)                           |
| Rate Limiting | express-rate-limit (100 req/15min global, 20 req/15min on auth) |

---

## Environment Variables (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/Tamrapatra
JWT_SECRET=<random-64-hex>
ADMIN_PASSWORD=Admin@123
ADMIN_EMAIL=prince@creatordev.in
CLIENT_URL=http://localhost:5173
```

---

## Security

- Rate limiting on all `/api/*` routes (100 requests per 15 min)
- Stricter rate limit on login/register (20 requests per 15 min)
- Request body limited to 10 KB
- CSP, HSTS, X-Frame-Options, X-XSS-Protection headers set
- Passwords hashed with bcrypt (12 rounds)
- `totalPrice` calculated server-side
- Stock validated before adding to cart
- Users can only view their own orders
- JWT with strong 64-byte random secret
- `.env` in `.gitignore` — credentials never committed
- Error messages are generic; real errors logged server-side
- Input validation on wishlist endpoints (valid ObjectId check)

---

## Deployment

### Free Tier
| Service          | Role     | Cost  |
|------------------|----------|-------|
| Vercel           | Frontend | Free  |
| Render           | Backend  | Free  |
| MongoDB Atlas    | Database | Free  |

### Cheap VPS ($5-6/mo)
Hetzner CX22, DigitalOcean Basic, or Linode Nanode. Use `pm2` or `docker-compose`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| MongoDB timeout | Atlas free tier spins down — wait 20s and refresh |
| Invalid login | Run `npm run seed` first |
| Module not found | Run `npm install` in both `backend/` and `frontend/` |
| Port in use | `lsof -ti:5000 \| xargs kill` (Linux/macOS) or `taskkill /PID <pid>` (Windows) |
| Images not loading | Update product images to use hosted URLs or configure static file serving for `/images` |

---

## Project Structure

```
Tamrapatra/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── data/
│   │   └── products.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── Coupon.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── WishlistRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── seeder.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hook/
│   │   ├── pages/
│   │   │   └── admin/
│   │   └── services/
│   ├── index.html
│   └── vite.config.js
└── README.md
```
