# Sri Nandi Krishi Organic Enterprise — Full MERN Stack Platform

A modern, high-performance, and responsive agricultural consultancy website and administrative platform built for **Sri Nandi Krishi Organic Enterprise** using the full **MERN stack** (MongoDB, Express.js, React.js with Vite, and Node.js).

Designed specifically for commercial farmers cultivating **Sugarcane**, **Banana**, **Papaya**, and **Watermelon**, providing practical, stage-wise agronomic guidance, organic farming solutions, direct WhatsApp consultation bookings, and a separate administrative dashboard.

---

## 🌾 Primary Brand Identity & Palette

Strictly adhere to the three primary brand colors:
1. **Forest Green** (`#124B2A`): Deep agricultural foundation, navigation bars, headers, cards, and primary call-to-actions.
2. **Harvest Gold** (`#E3B341`): Accent buttons, highlighting text, quotation accents, and active indicators.
3. **Ivory White** (`#FAF9F2`): Natural background, clean readability, and frosted glass cards.

---

## 🚀 Key Features

### 1. Public Website (`http://localhost:5173/`)
- **Sticky Glassmorphism Navbar**: Featuring the official Sri Nandi Krishi logo, smooth-scrolling section links, active states, and quick-action consultation button.
- **Split-Layout Hero Section**:
  - Crisp typography: *"Better Farming. Brighter Tomorrow."*
  - Authentic high-resolution photography of an Indian farmer holding fresh sugarcane.
  - Three frosted-glass badges: *Expert Consultation*, *Organic Farming Solutions*, *Better Crop Management*.
  - Verified statistics: *4 Crop Categories*, *100% Practical Farming Guidance*, *Dedicated Farmer-Focused Support*.
- **About Us Section**:
  - *"Growing Better Farms, Together"*
  - Grounded in real field operations, variety selection, balanced organic fertilization, irrigation management, and harvest planning.
- **Crop Guidance Services (4 Commercial Crops)**:
  - **Sugarcane Farming**: Sett selection, variety recommendation, organic nutrient schedules, tillering management, early shoot borer control, and harvest planning.
  - **Banana Farming**: Tissue culture planting, pit preparation, precise potassium-nitrogen management, bunch bagging, and market support.
  - **Papaya Farming**: Red Lady 786 raised-bed preparation, waterlogging prevention, organic aphid/virus suppression, and uniform ripening.
  - **Watermelon Farming**: Drip irrigation, plastic mulching, vine training, fruit thinning, and sweetness (Brix) optimization.
  - Direct WhatsApp booking button prefilling the selected crop automatically.
  - *"Cultivation Guide & Details"* link opening individual crop pages.
- **Individual Crop Detail Pages (`/services/:slug`)**:
  - Dedicated pages for `/services/sugarcane`, `/services/banana`, `/services/papaya`, and `/services/watermelon`.
  - Step-by-step 5-stage cultivation roadmap.
  - Detailed sections on Soil Preparation, Variety Selection, Irrigation & Nutrition, Pest & Disease Management, and Harvest Planning.
  - Interactive FAQ accordion and direct consultation triggers.
- **Why Choose Us**: 4 frosted-glass feature cards highlighting practical advice, crop-specific support, farmer-friendly communication, and cultivation roadmaps.
- **Filterable Photographic Gallery**:
  - Filter pills: *All*, *Sugarcane*, *Banana*, *Papaya*, *Watermelon*, *Field Work*.
  - Smooth hover zoom and interactive full-screen Lightbox view with captions.
- **Farmer Testimonial Carousel**:
  - Verified initial testimonial from sugarcane farmer Ramesh Patil praising timely fertilizer and growth stage guidance from Nagaraj.
  - Previous / Next controls and dynamic admin management.
- **Contact & Consultation Section**:
  - Phone, official email (`srinandikrushi70@gmail.com`), location, and working hours cards.
  - Consultation request form saving directly to MongoDB via the REST API with instantaneous WhatsApp continuation option.
- **Floating Action Controls**:
  - WhatsApp booking button (right side).
  - Direct telephone dialer (`tel:`, right side).
  - *"Ask Krishi"* interactive FAQ assistant with instant answers and WhatsApp escalation (bottom left).
- **Footer**:
  - Forest Green background with Harvest Gold divider.
  - Official logo, navigation links, and social media brand buttons (Facebook, Instagram, YouTube, WhatsApp, Twitter/X, LinkedIn).
  - Required credit: *"Designed and developed by [bookmywebsite.in](https://bookmywebsite.in)"*.

---

### 2. Separate Admin Dashboard (`http://localhost:5173/admin/login`)
- **JWT-Protected Authentication**: Secure bcrypt password hashing and token authorization.
- **Overview Dashboard**: High-level metrics (Total Bookings, New Consultations, Active Services, Gallery Items, Messages) and quick-action shortcuts.
- **Consultation Bookings Manager**:
  - Review incoming farmer consultation requests.
  - Status management dropdown: `New`, `Contacted`, `Confirmed`, `Completed`, `Cancelled`.
  - Add internal agronomy follow-up notes.
  - One-click WhatsApp button to respond directly to the farmer with prefilled text.
  - Delete consultation with confirmation.
- **Crop Services Manager**: Edit crop highlights, descriptions, stage roadmaps, and ordering.
- **Gallery Manager**: Add new crop photos, assign categories, and update captions.
- **Testimonials Manager**: Create, update, or remove farmer testimonials.
- **Contact Messages Manager**: View enquiries and mark as `Read` or `Replied`.
- **Website Settings**: Configure business WhatsApp number, telephone, official email, address, and social links in real time without code deployment.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, React Router DOM v6, Plain CSS & Glassmorphism, Framer Motion, Lucide Icons, React Icons (FontAwesome), Axios |
| **Backend** | Node.js, Express.js (ES Modules), MongoDB, Mongoose ODM, JWT, BcryptJS, Dotenv, CORS |
| **Database** | MongoDB (Local service or MongoDB Atlas) |

---

## 📦 Directory Structure

```
Sri Nandi Krishi Organic/
├── client/                      # React + Vite Frontend
│   ├── public/
│   │   └── images/              # Farm assets & crop photography
│   ├── src/
│   │   ├── assets/              # Logo and high-resolution photographs
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Lightbox.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FloatingActions.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── BookingModal.jsx
│   │   ├── pages/               # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── CropDetails.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── BookingsManager.jsx
│   │   │       ├── ServicesManager.jsx
│   │   │       ├── GalleryManager.jsx
│   │   │       ├── TestimonialsManager.jsx
│   │   │       ├── MessagesManager.jsx
│   │   │       └── SettingsManager.jsx
│   │   ├── services/api.js      # Centralized Axios API client
│   │   ├── utils/whatsapp.js    # WhatsApp URL builder & validation helper
│   │   ├── App.jsx              # React Router SPA routes
│   │   ├── main.jsx             # Entry point
│   │   ├── styles.css           # Brand styles & glassmorphic system
│   │   └── admin.css            # Admin portal styling
│   ├── .env.example
│   └── package.json
├── server/                      # Node.js + Express Backend
│   ├── config/db.js             # Mongoose MongoDB connection
│   ├── middleware/auth.js       # Admin JWT protection middleware
│   ├── models/                  # Mongoose Schemas
│   │   ├── Admin.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   ├── Testimonial.js
│   │   ├── GalleryImage.js
│   │   ├── ContactMessage.js
│   │   └── WebsiteSettings.js
│   ├── routes/                  # Express REST Routes
│   │   ├── authRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── testimonialRoutes.js
│   │   ├── galleryRoutes.js
│   │   ├── contactRoutes.js
│   │   └── settingsRoutes.js
│   ├── utils/seeder.js          # Automatic database seeder
│   ├── server.js                # Express app entry point
│   ├── .env.example
│   └── package.json
├── package.json                 # Root script runner (concurrently)
└── README.md
```

---

## ⚡ Installation & Setup Instructions

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** running locally on port `27017` or a MongoDB Atlas URI

### 2. Install Dependencies
Run the following command from the project root:
```bash
npm run install:all
```
*(Or navigate into `client` and `server` separately and run `npm install` in each).*

### 3. Environment Configuration

#### Backend (`server/.env`):
```ini
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sri_nandi_krishi
JWT_SECRET=sri_nandi_krishi_secret_jwt_key_2026_organic_farming
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@srinandikrishi.com
ADMIN_PASSWORD=Admin@123456
WHATSAPP_NUMBER=919876543210
BUSINESS_PHONE=+91 98765 43210
BUSINESS_EMAIL=srinandikrushi70@gmail.com
BUSINESS_WEBSITE=https://srinandikrishi.com
FACEBOOK_URL=https://www.facebook.com/share/19CwgVuDLW/?mibextid=wwXIfr
```

#### Frontend (`client/.env`):
```ini
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the Application

### Option A: Run Both Together (Recommended)
From the project root:
```bash
npm run dev
```
This runs both the backend server (on `http://localhost:5000`) and the Vite client (on `http://localhost:5173`) concurrently.

### Option B: Run Separately
Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

---

## 🔐 Administrator Setup & Default Credentials

On initial server startup, the database seeder automatically provisions the default administrator account:

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@srinandikrishi.com`
- **Password**: `Admin@123456`

*(You can modify these credentials in `server/.env` or change passwords from the admin settings).*

---

## 🧪 Testing Checklist & Verification

- [x] **MongoDB Connection**: Automatically verifies connection to `mongodb://127.0.0.1:27017/sri_nandi_krishi`.
- [x] **Database Seeding**: Default Admin, 4 Crop Guidance Services, Ramesh Patil testimonial, 8 farm gallery images, and website settings seed on first launch without duplication.
- [x] **Public Homepage**: Renders Navbar, Hero, About Us, 4 Crop Services, Why Choose Us, Filterable Gallery, Testimonials Carousel, Contact Form, and Footer.
- [x] **Crop Detail Pages**:
  - `/services/sugarcane`
  - `/services/banana`
  - `/services/papaya`
  - `/services/watermelon`
- [x] **Direct WhatsApp Booking**: Opens `https://wa.me/919876543210?text=...` prefilled with the chosen crop.
- [x] **Consultation Form**: Validates inputs, saves directly to MongoDB `bookings` collection, and presents an option to continue via WhatsApp.
- [x] **Interactive Chatbot**: *"Ask Krishi"* responds deterministically to common crop queries and provides WhatsApp escalation.
- [x] **Admin Authentication**: Rejects invalid credentials, signs JWT on success, stores session token, and guards `/admin/dashboard`.
- [x] **Admin Management Modules**:
  - Bookings status update (`New` → `Contacted` → `Confirmed` → `Completed`) with internal notes.
  - Crop Services editing and highlight management.
  - Gallery photo uploading and category tagging.
  - Testimonial creation and moderation.
  - Contact message reading and reply status.
  - Dynamic website settings updates (WhatsApp, phone, social URLs).

---

## 📋 Outstanding Business Information
When final details become available from Sri Nandi Krishi Organic Enterprise, simply update them in the Admin Dashboard (`/admin/dashboard` → *Website Settings*) or `server/.env`:
1. **Actual Business WhatsApp Number**: Currently configured with placeholder `919876543210`.
2. **Actual Business Telephone**: Currently configured as `+91 98765 43210`.
3. **Exact Farm / Office Physical Address**: Currently set as `Agricultural Guidance Center, Karnataka, India`.
4. **Custom Domain / Hosting**: When ready, deploy frontend to Vercel/Netlify/Nginx and backend to VPS/DigitalOcean/Render and point DNS records.
