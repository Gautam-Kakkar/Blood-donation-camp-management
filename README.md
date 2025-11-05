# 🩸 Blood Donation Camp Management System (BDCMS)

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=mongodb&logoColor=white)](https://github.com/yourusername/bdcms)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

> A comprehensive full-stack web application for managing blood donation camps, donors, blood requests, and inventory with real-time analytics and SMS notifications.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

The **Blood Donation Camp Management System (BDCMS)** is a production-ready MERN stack application designed to streamline the entire blood donation lifecycle. From donor registration to inventory management, this system provides a centralized platform for blood banks, hospitals, and organizers to efficiently manage blood donation operations.

### 🚨 Problem Statement

- **Finding donors during emergencies is time-consuming and difficult**
- **No centralized system to track donor eligibility** (90-day rule)
- **Manual camp management leads to errors and inefficiencies**
- **Matching donors with blood requests is labor-intensive**
- **Lack of real-time inventory visibility**

### ✅ Solution

BDCMS provides:
- 🔍 **Smart Donor Search** - Find eligible donors by blood group and location instantly
- 📅 **Automated Eligibility Tracking** - 90-day rule enforcement with automatic updates
- 🏕️ **Camp Management** - Create, manage, and track donation camps
- 🩺 **Blood Request Matching** - Intelligent donor-request matching algorithm
- 📊 **Real-Time Analytics** - Comprehensive dashboards and reports
- 📦 **Inventory Management** - Track blood units with expiry dates and FIFO system
- 📱 **SMS Notifications** - Twilio-powered alerts for donors and organizers

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure JWT-based authentication** with bcrypt password hashing
- **Role-based access control** (Admin, Organizer, Donor)
- **Token expiration** (2-hour sessions for enhanced security)
- **Protected routes** with middleware-based verification

### 👥 Donor Management
- **Comprehensive donor profiles** with health information
- **90-day eligibility tracking** with automatic calculation
- **Donation history** tracking and statistics
- **Advanced search filters** (blood group, location, eligibility)
- **Emergency contact** management
- **Pagination** for large datasets

### 🏕️ Camp Management
- **Create and manage blood donation camps**
- **Donor registration** for camps
- **Capacity management** and slot availability
- **Real-time status tracking** (upcoming, ongoing, completed)
- **Location-based search**
- **Contact information** management

### 🩺 Blood Request Management
- **Create urgent blood requests** with priority levels
- **Smart donor matching** by blood group and location
- **Status tracking** (pending, partially fulfilled, fulfilled)
- **Hospital integration** with location data
- **Units tracking** and fulfillment monitoring
- **Automatic expiry** after required-by date

### 📦 Inventory Management
- **Real-time blood unit tracking** by blood group
- **FIFO (First In, First Out)** system for unit allocation
- **Expiry date management** (35-day shelf life)
- **Reservation system** for pending requests
- **Automated expiry checks**
- **Complete audit trail** with history tracking
- **Unit-level tracking** with unique IDs

### 📊 Analytics & Reporting
- **Dashboard with key metrics**
- **Blood group distribution** charts
- **Donation trends** over time
- **Camp performance** statistics
- **Inventory status** visualization
- **Donor engagement** metrics

### 📱 Notifications
- **SMS alerts** via Twilio integration
- **Donor notifications** for camp registrations
- **Request alerts** for matching donors
- **Inventory alerts** for low stock
- **Expiry notifications** for blood units

### 🎨 User Interface
- **Modern, responsive design** with Tailwind CSS
- **Intuitive navigation** with protected routes
- **Error boundaries** for graceful error handling
- **Loading states** and user feedback
- **Mobile-friendly** interface

## 🛠 Technology Stack

### Backend
- **Node.js** (v18+) - JavaScript runtime
- **Express.js** (v4.18.2) - Web framework
- **MongoDB** (v7.5.0) - NoSQL database
- **Mongoose** (v7.5.0) - ODM for MongoDB
- **JWT** (jsonwebtoken v9.0.2) - Authentication
- **bcryptjs** (v2.4.3) - Password hashing
- **Twilio** (v5.10.4) - SMS notifications
- **Morgan** - HTTP request logging
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** (v19.2.0) - UI library
- **React Router** (v6.30.1) - Client-side routing
- **Axios** (v1.12.2) - HTTP client
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework
- **Context API** - State management

### Development Tools
- **Nodemon** - Auto-restart server
- **ESLint** - Code linting
- **Postman** - API testing

### Database Design
- **MongoDB Atlas** (Cloud) / Local MongoDB
- **Indexed collections** for optimized queries
- **Referenced relationships** (User ↔ Donor, Camp ↔ Donors)
- **Embedded documents** for nested data (Address, Health Info)

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (React)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components  │  Pages  │  Context  │  Services       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP/HTTPS (Axios)
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVER (Express.js)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Middleware Pipeline                          │   │
│  │  CORS → JSON Parser → Morgan → JWT Auth             │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     ↓                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Routes (API Endpoints)                  │   │
│  │  /auth  /donors  /camps  /requests  /inventory      │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     ↓                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Controllers (Business Logic)              │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     ↓                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Models (Mongoose Schemas)                    │   │
│  └──────────────────┬───────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              MongoDB Database (Atlas/Local)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Collections: users, donors, camps, requests,        │   │
│  │               donations, inventory, notifications    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│            External Services (Twilio SMS)                   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (Atlas account or local installation)
- **npm** or **yarn**
- **Twilio account** (for SMS notifications - optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blood-donation-cms.git
   cd blood-donation-cms
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bdcms

   # JWT Secret (generate a random string)
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters

   # Twilio SMS (Optional)
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

   See `server/.env.example` for reference.

5. **Seed the database** (Optional)
   ```bash
   cd server
   npm run seed              # Seed sample donors
   npm run seed:inventory    # Seed blood inventory
   ```

6. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Quick Test

1. Register a new account
2. Login with credentials
3. Navigate to Dashboard
4. Explore features (Donors, Camps, Requests, Inventory)

## 📁 Project Structure

```
blood-donation-cms/
├── client/                          # React Frontend
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── ErrorBoundary.js     # Error handling
│   │   │   ├── Navbar.js            # Navigation bar
│   │   │   └── Navbar.css
│   │   ├── context/
│   │   │   └── AuthContext.js       # Authentication state
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.js              # Landing page
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Register.js          # Registration
│   │   │   ├── Dashboard.js         # Main dashboard
│   │   │   ├── DonorRegister.js     # Donor profile creation
│   │   │   ├── DonorProfile.js      # Donor profile view
│   │   │   ├── DonorList.js         # All donors list
│   │   │   ├── CampList.js          # Camps listing
│   │   │   ├── CampCreate.js        # Create new camp
│   │   │   ├── CampDetails.js       # Camp details
│   │   │   ├── RequestList.js       # Blood requests
│   │   │   ├── RequestCreate.js     # Create request
│   │   │   ├── RequestDetails.js    # Request details
│   │   │   ├── QuickDonation.js     # Quick donation entry
│   │   │   ├── Analytics.js         # Analytics dashboard
│   │   │   ├── Reports.js           # Reports page
│   │   │   └── Inventory.js         # Inventory management
│   │   ├── services/
│   │   │   └── api.js               # Axios API client
│   │   ├── styles/
│   │   │   └── global.css           # Global styles
│   │   ├── App.js                   # Root component
│   │   └── index.js                 # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/                 # Business logic
│   │   ├── authController.js        # Authentication
│   │   ├── donorController.js       # Donor operations
│   │   ├── campController.js        # Camp management
│   │   ├── requestController.js     # Blood requests
│   │   ├── donationController.js    # Donation records
│   │   ├── inventoryController.js   # Inventory management
│   │   ├── analyticsController.js   # Analytics data
│   │   └── notificationController.js # Notifications
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js                  # User model
│   │   ├── Donor.js                 # Donor model
│   │   ├── Camp.js                  # Camp model
│   │   ├── Request.js               # Request model
│   │   ├── Donation.js              # Donation model
│   │   ├── Inventory.js             # Inventory model
│   │   └── Notification.js          # Notification model
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── donorRoutes.js
│   │   ├── campRoutes.js
│   │   ├── requestRoutes.js
│   │   ├── donationRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── analyticsRoutes.js
│   │   └── notificationRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorMiddleware.js       # Error handling
│   ├── utils/
│   │   ├── generateToken.js         # JWT creation
│   │   ├── responseHandler.js       # API responses
│   │   ├── sendSMS.js               # Twilio integration
│   │   └── seedDonors.js            # Database seeding
│   ├── seedDatabase.js              # Donor seeding script
│   ├── seedInventory.js             # Inventory seeding script
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── .env.example
│
├── docs/                            # Documentation
│   ├── PRD.md                       # Product requirements
│   ├── PROJECT_COMPLETE_GUIDE.md    # Complete guide
│   ├── QUICK_START.md               # Quick start guide
│   └── INVENTORY_SEEDING.md         # Inventory setup
│
└── README.md                        # This file
```

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/profile` | Get user profile | Yes |

### Donor Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/donors/register` | Create donor profile | Yes |
| GET | `/donors` | Get all donors (with filters) | Yes |
| GET | `/donors/me` | Get my donor profile | Yes |
| GET | `/donors/:id` | Get donor by ID | Yes |
| PATCH | `/donors/:id` | Update donor | Yes (Owner/Admin) |
| DELETE | `/donors/:id` | Delete donor | Yes (Owner/Admin) |
| GET | `/donors/:id/eligibility` | Check eligibility | Yes |
| GET | `/donors/search/:bloodGroup` | Search by blood group | Yes |

### Camp Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/camps/create` | Create new camp | Yes (Organizer/Admin) |
| GET | `/camps` | Get all camps | Yes |
| GET | `/camps/:id` | Get camp details | Yes |
| PATCH | `/camps/:id` | Update camp | Yes (Owner/Admin) |
| DELETE | `/camps/:id` | Delete camp | Yes (Owner/Admin) |
| POST | `/camps/:id/register` | Register for camp | Yes |
| PATCH | `/camps/:id/attendance` | Mark attendance | Yes (Organizer/Admin) |

### Request Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/requests` | Create blood request | Yes |
| GET | `/requests` | Get all requests | Yes |
| GET | `/requests/:id` | Get request details | Yes |
| PATCH | `/requests/:id` | Update request | Yes (Owner/Admin) |
| DELETE | `/requests/:id` | Cancel request | Yes (Owner/Admin) |
| POST | `/requests/:id/match` | Match donors | Yes |

### Donation Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/donations` | Record donation | Yes (Organizer/Admin) |
| GET | `/donations` | Get all donations | Yes |
| GET | `/donations/:id` | Get donation details | Yes |
| GET | `/donations/donor/:donorId` | Get donor's donations | Yes |

### Inventory Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/inventory` | Get all inventory | Yes |
| GET | `/inventory/:bloodGroup` | Get by blood group | Yes |
| POST | `/inventory/reserve` | Reserve units | Yes (Organizer/Admin) |
| POST | `/inventory/issue` | Issue units | Yes (Organizer/Admin) |
| POST | `/inventory/unreserve` | Unreserve units | Yes (Organizer/Admin) |
| GET | `/inventory/expiring` | Get expiring units | Yes |
| POST | `/inventory/check-expired` | Mark expired units | Yes (Admin) |

### Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/analytics/overview` | Dashboard overview | Yes |
| GET | `/analytics/donors` | Donor statistics | Yes |
| GET | `/analytics/camps` | Camp statistics | Yes |
| GET | `/analytics/inventory` | Inventory stats | Yes |

### Example Request

```javascript
// Register Donor
POST /api/donors/register
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json"
}
Body: {
  "bloodGroup": "O+",
  "dateOfBirth": "1995-05-15",
  "gender": "Male",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "healthInfo": {
    "weight": 70,
    "height": 175,
    "hemoglobin": 14.5
  }
}

Response: {
  "success": true,
  "message": "Donor registered successfully",
  "data": {
    "_id": "65f7a3b2c1234567890abcdf",
    "userId": { ... },
    "bloodGroup": "O+",
    "isEligible": true,
    ...
  }
}
```


### Future Enhancements 🚀
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] QR code check-ins
- [ ] Donor rewards system
- [ ] Multi-language support
- [ ] Advanced analytics (ML predictions)
- [ ] Integration with hospital systems
- [ ] Automated donor reminders
- [ ] Blood donation history certificates
- [ ] Social media integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure
- Use ES6+ syntax
- Write descriptive commit messages
- Add comments for complex logic
- Test all API endpoints before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

**Made with ❤️ for saving lives**

⭐ Star this repository if you find it helpful!

</div>
