# 🩸 Blood Donation Camp Management System (BDCMS)
## Phased Product Requirements Document (Developer & AI Agent Friendly)

**Version:** 1.1  
**Author:** Gautam Kakkar  
**Stack:** MERN (MongoDB, Express.js, React.js, Node.js)  
**Database:** MongoDB (Mongoose ODM)  
**Frontend:** React + TailwindCSS  
**Auth:** JWT + bcrypt  
**Notifications:** Twilio / Web Push  
**Goal:** Modular, secure, and production-ready web system  

---

## 🧩 0. Project Overview

The **Blood Donation Camp Management System (BDCMS)** is a full-stack MERN application to manage donors, camps, and blood requests, with secure authentication, analytics, and notifications.  

The project is implemented in **5 structured phases** for clean modular progression.

---

# 🗂️ Folder Structure (Final Reference)

This structure remains **consistent across all phases** — each phase progressively fills in functionality within these folders.

```
blood-donation-camp-management/
│
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/              # Navbar, Cards, Alerts, Forms
│   │   ├── pages/                   # Login, Dashboard, Camps, Reports
│   │   ├── services/                # Axios API clients
│   │   ├── context/                 # AuthContext for JWT storage
│   │   ├── charts/                  # Chart.js visual components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   │
│   ├── models/                      # Mongoose Schemas
│   │   ├── User.js
│   │   ├── Donor.js
│   │   ├── Camp.js
│   │   ├── Request.js
│   │   ├── Donation.js
│   │   └── Notification.js
│   │
│   ├── controllers/                 # Business logic
│   │   ├── authController.js
│   │   ├── donorController.js
│   │   ├── campController.js
│   │   ├── requestController.js
│   │   ├── notificationController.js
│   │   └── reportController.js
│   │
│   ├── routes/                      # API route mapping
│   │   ├── authRoutes.js
│   │   ├── donorRoutes.js
│   │   ├── campRoutes.js
│   │   ├── requestRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── reportRoutes.js
│   │
│   ├── middleware/                  # Middleware functions
│   │   ├── authMiddleware.js        # JWT verification
│   │   ├── errorMiddleware.js       # Global error handler
│   │   └── rateLimiter.js           # Optional: express-rate-limit setup
│   │
│   ├── utils/                       # Utility files
│   │   ├── sendSMS.js               # Twilio integration
│   │   ├── pushNotification.js      # Web Push fallback
│   │   ├── generateToken.js         # JWT creation
│   │   └── responseHandler.js       # Unified API responses
│   │
│   ├── server.js                    # Express entry point
│   ├── .env                         # Environment variables
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

> **Note:** Each phase below assumes this structure exists.  
> Controllers, routes, and models will be implemented progressively within their respective folders.

---

# ⚙️ PHASE 1 – Core Setup & Authentication

### 🎯 Goal
Establish base infrastructure — backend, DB connection, JWT authentication.

### 📦 Deliverables
- Express server setup (`server.js`).
- MongoDB connection via `config/db.js`.
- `.env` environment configuration.
- `User` model + Auth routes + Controllers.
- JWT-based login & registration.
- Error handling + request logging (Morgan).

### 🧠 Steps
1. Initialize server and connect to MongoDB.  
2. Create routes and controllers for:
   - `/api/auth/register`
   - `/api/auth/login`
   - `/api/auth/profile`
3. Add password hashing (bcrypt).
4. Implement `authMiddleware.js` for JWT verification.
5. Test routes via Postman.

---

# 💉 PHASE 2 – Donor Management

### 🎯 Goal
Develop donor CRUD + eligibility checking.

### 📦 Deliverables
- `Donor.js` schema.
- Controller: `donorController.js`.
- Routes: `donorRoutes.js`.
- JWT-protected donor endpoints.

### 🧠 Steps
1. Implement donor registration & retrieval logic.
2. Add eligibility field (true if last donation ≥ 90 days).
3. Integrate with userId (ref from `User`).
4. Add donor update route for health info.

### 🔗 Endpoints
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/donors/register` | Register new donor |
| GET | `/api/donors` | Get all donors |
| GET | `/api/donors/:id` | Get donor by ID |
| PATCH | `/api/donors/:id` | Update donor info |

---

# 🏕️ PHASE 3 – Camp & Request Management

### 🎯 Goal
Allow organizers to schedule blood camps and handle blood requests.

### 📦 Deliverables
- Models: `Camp.js`, `Request.js`.
- Controllers: `campController.js`, `requestController.js`.
- Routes: `campRoutes.js`, `requestRoutes.js`.
- Matching logic for donor requests.

### 🧠 Steps
1. Create APIs for camp creation and retrieval.
2. Implement request creation and donor matching by `bloodGroup` + `location`.
3. Allow linking donors to camps.

### 🔗 Camp Endpoints
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/camps/create` | Create camp |
| GET | `/api/camps` | Get all camps |
| DELETE | `/api/camps/:id` | Delete camp |

### 🔗 Request Endpoints
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/requests` | Create blood request |
| GET | `/api/requests/match/:group` | Find matching donors |

---

# 📊 PHASE 4 – Reporting & Analytics

### 🎯 Goal
Integrate backend analytics and frontend visualization.

### 📦 Deliverables
- Controller: `reportController.js`.
- Route: `reportRoutes.js`.
- Frontend dashboard (React + Chart.js).
- Aggregation for donations, donors, and camp data.

### 🧠 Steps
1. Create aggregation pipelines in controller.
2. Expose REST APIs for report data.
3. Add frontend charts in `/client/src/charts`.

### 🔗 Endpoints
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/api/reports/donations` | Donations by blood group |
| GET | `/api/reports/camps` | Camp performance summary |

---

# 📢 PHASE 5 – Notification System (Final)

### 🎯 Goal
Implement SMS/Web Push alerts for donors.

### 📦 Deliverables
- Utility files: `sendSMS.js`, `pushNotification.js`.
- Model: `Notification.js`.
- Controller: `notificationController.js`.
- Route: `notificationRoutes.js`.

### 🧠 Steps
1. Integrate Twilio API.
2. Add Web Push fallback.
3. Trigger notifications after:
   - New camp creation.
   - New donor request match.
4. Store sent messages in DB.

### 🔗 Endpoints
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/notifications/sms` | Send SMS |
| POST | `/api/notifications/webpush` | Send web notification |

---

# 🚀 PHASE 6 – Optimization & Deployment (Optional)

### 🎯 Goal
Prepare the project for production release.

### 📦 Deliverables
- Add security packages: `helmet`, `express-rate-limit`.
- Add `rateLimiter.js` middleware.
- CORS setup.
- Build and deploy on cloud (Render / Vercel / MongoDB Atlas).
- CI/CD GitHub workflow.

---

# 🧾 Environment Configuration

**`.env` Example**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=<your_jwt_secret_key>
TWILIO_SID=<your_twilio_sid>
TWILIO_TOKEN=<your_twilio_token>
TWILIO_NUMBER=<your_twilio_phone_number>
```

---

# 🧰 Development Standards

- Follow folder hierarchy strictly.
- ES6 syntax (`import/export`).
- Async/await only — no callbacks.
- RESTful naming conventions.
- JWT expiration = 2 hours.
- Log all API requests via Morgan.
- Handle all errors via `errorMiddleware.js`.

---

# ✅ Phase Summary

| Phase | Scope | Deliverable |
|--------|--------|-------------|
| 1 | Core setup | Auth + DB connection |
| 2 | Donor module | CRUD + eligibility |
| 3 | Camp & Requests | Matching + event mgmt |
| 4 | Reporting | Aggregation + charts |
| 5 | Notifications | Twilio/Web Push |
| 6 | Deployment | Cloud-ready release |

---

# 📅 Recommended Timeline

| Phase | Duration | Description |
|--------|-----------|-------------|
| 1 | 2–3 days | Base setup + Auth |
| 2 | 3–4 days | Donor module |
| 3 | 4–5 days | Camps + Requests |
| 4 | 3 days | Reporting |
| 5 | 2–3 days | Notifications |
| 6 | 1–2 days | Deployment polish |

---

# 🧭 Implementation Notes

- Keep **notifications last**.
- Test every API with Postman before moving phases.
- Each phase = one GitHub commit/tag (`phase-1`, `phase-2`, etc.).
- Push final build after all routes tested end-to-end.

---

**End of Phased Developer PRD**
