# Tamrapatra — Brand Architecture

## Overview

**Tamrapatra** is a Gujarat-based Indian handicrafts and home decor brand established in 1998. This repository contains the complete e-commerce website for the brand, built with React (frontend) and Node.js/Express/MongoDB (backend).

**Brand Tagline:** "Royal Indian Handicrafts Since 1998"
**Subtitle:** "Authentic Handcrafted Decor from Gujarat"

---

## Tech Stack

### Frontend
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS 4 with custom theme
- **Animations:** Framer Motion
- **Icons:** Lucide React (Gem icon as brand logo)
- **Routing:** React Router DOM
- **State:** React Context (Auth, Cart, Wishlist, Coupon, Theme)
- **HTTP Client:** Axios
- **Notifications:** React Toastify

### Backend
- **Runtime:** Node.js with ES Modules
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT (JSON Web Tokens) + bcryptjs
- **Security:** Rate limiting, CORS, Helmet-ready

---

## Brand Identity

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Royal Indigo | `#312E81` | Primary, headings, CTAs |
| Gold | `#B8860B` | Accents, highlights, decorative elements |
| Ivory | `#FFFBEB` | Backgrounds, light surfaces |
| Deep Plum | `#3B0764` | Dark mode background |
| Warm Grey | `#78716C` | Secondary text |
| Amber | `#F59E0B` | Hover states, badges |

### Typography
- **Headings:** Cormorant Garamond (Google Font) — elegant serif with royal feel
- **Body:** Outfit (Google Font) — clean modern sans-serif

### Logo
- **Icon:** Gem (from lucide-react) — represents precious, handcrafted artistry
- **Text:** "TAMRAPATRA" in Cormorant Garamond, tracked wide

---

## Project Structure

```
tamrapatra/
├── ARCHITECTURE.md           # This file
├── README.md                 # Project documentation
├── backend/
│   ├── .env                  # Environment variables (PORT=5002)
│   ├── package.json          # Backend dependencies
│   ├── server.js             # Express server entry
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── data/
│   │   └── products.js       # Seed product data (8 handicraft products)
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT verification
│   │   └── rateLimiter.js    # API rate limiting
│   ├── models/
│   │   ├── Product.js        # Product schema
│   │   ├── User.js           # User schema
│   │   ├── Order.js          # Order schema
│   │   ├── Review.js         # Review schema
│   │   └── Coupon.js         # Coupon schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── productRoutes.js  # Product CRUD
│   │   ├── orderRoutes.js    # Order management
│   │   ├── cartRoutes.js     # Cart operations
│   │   ├── reviewRoutes.js   # Reviews
│   │   ├── couponRoutes.js   # Coupons
│   │   ├── WishlistRoutes.js # Wishlist
│   │   └── adminRoutes.js    # Admin endpoints
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── cartController.js
│   │   ├── reviewController.js
│   │   ├── WishlistController.js
│   │   └── adminController.js
│   ├── utils/
│   │   └── generateToken.js  # JWT token generation
│   └── seeder.js             # Database seeder
├── frontend/
│   ├── index.html            # Entry HTML (Cormorant Garamond + Outfit fonts)
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── main.jsx          # React entry point
│       ├── App.jsx           # Router + layout
│       ├── index.css         # Global styles (Tamrapatra theme)
│       ├── api/              # API service modules
│       ├── context/          # React context providers
│       ├── hook/             # Custom React hooks
│       ├── services/
│       │   └── api.js        # Axios instance
│       ├── components/
│       │   ├── Navbar.jsx     # Navigation with Gem logo
│       │   ├── Footer.jsx     # Footer with gold accents
│       │   ├── Newsletter.jsx # Newsletter subscription
│       │   ├── PageBackground.jsx # Animated page backgrounds
│       │   ├── DarkModeToggle.jsx # Theme switcher
│       │   ├── ProductCard.jsx
│       │   ├── ReviewSection.jsx
│       │   ├── QuickViewModal.jsx
│       │   └── ...
│       ├── pages/
│       │   ├── Home.jsx       # Hero + products + journal
│       │   ├── About.jsx      # Brand story + timeline + artisans
│       │   ├── products.jsx   # Product listing
│       │   ├── ProductDetails.jsx
│       │   ├── Cart.jsx
│       │   ├── Checkout.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Journal.jsx
│       │   ├── Contact.jsx
│       │   ├── TrackOrder.jsx
│       │   ├── Wishlist.jsx
│       │   ├── OrderSuccess.jsx
│       │   └── admin/         # Admin dashboard pages
│       └── assets/
└── dist/                     # Build output
```

---

## Design System

### Theme Style
- Elegant, ornate, museum-gallery feel
- Rounded cards (24-32px radius) with subtle gold borders
- Parallax-like scroll effects via Framer Motion
- Floating decorative elements (geometric Indian diamond patterns)
- Soft animations, fade-ins, and hover interactions

### CSS Utilities
- `.bg-ornate-gradient` — Royal indigo to deep plum gradient
- `.text-gradient-gold` — Shimmering gold text gradient
- `.card-ornate` — Cards with gold border hover effect
- `.deco-diamond` — Decorative rotated square element
- `.deco-line` — Horizontal gold gradient line
- `.pattern-rangoli` — Subtle radial gradient background pattern
- `.animate-diamond-float` — Floating diamond animation
- `.animate-gold-glow` — Pulsing gold glow effect

### Animations
- `blob-morph` — Organic shape morphing for background blobs
- `float` / `float-slow` — Gentle floating motion
- `diamond-float` — Decorative diamond floating with rotation
- `gold-glow` — Subtle gold box-shadow pulsing
- `border-shimmer` — Border color animation
- `slide-up` / `fade-in` — Entrance animations

---

## Product Catalog (8 Items)

| # | Product | Category | Price (INR) |
|---|---------|----------|-------------|
| 1 | Brass Ganesha Idol | Brass Decor | ₹1,299 |
| 2 | Wooden Jharokha Wall Art | Wall Art | ₹2,499 |
| 3 | Copper Puja Thali Set | Puja Essentials | ₹899 |
| 4 | Ethnic Brass Diya Set | Puja Essentials | ₹599 |
| 5 | Hand-Painted Elephant | Brass Decor | ₹1,799 |
| 6 | Brass Bell (Ghanti) | Puja Essentials | ₹449 |
| 7 | Carved Wooden Box | Wooden Crafts | ₹749 |
| 8 | Ethnic Wall Hanging | Wall Art | ₹1,199 |

---

## Admin Credentials

- **Email:** prince@creatordev.in
- **Password:** Admin@123

---

## Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| PORT | 5002 | Backend server port |
| MONGO_URI | (Atlas connection string) | MongoDB Atlas connection |
| JWT_SECRET | (random hash) | JWT signing secret |
| ADMIN_EMAIL | prince@creatordev.in | Admin login email |
| ADMIN_PASSWORD | Admin@123 | Admin login password |

---

## Developer

- **Built by:** Prince
- **Studio:** Creator Dev
- **Year:** 2026
- **Contact:** prince@creatordev.in
