# 🩸 Blood Donation Camp Management System (BDCMS)
## Complete Technical & Beginner's Guide

---

# TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Technology Stack Explained](#2-technology-stack-explained)
3. [Project Architecture](#3-project-architecture)
4. [Folder Structure Deep Dive](#4-folder-structure-deep-dive)
5. [Phase 1: Authentication System](#5-phase-1-authentication-system)
6. [Phase 2: Donor Management](#6-phase-2-donor-management)
7. [Database Design](#7-database-design)
8. [API Design & REST Principles](#8-api-design--rest-principles)
9. [Security Implementation](#9-security-implementation)
10. [How Everything Works Together](#10-how-everything-works-together)
11. [Development Best Practices Used](#11-development-best-practices-used)
12. [Testing Guide](#12-testing-guide)
13. [What's Next (Remaining Phases)](#13-whats-next-remaining-phases)

---

# 1. PROJECT OVERVIEW

## 1.1 What is BDCMS?

**Blood Donation Camp Management System (BDCMS)** is a full-stack web application designed to manage:
- Blood donors and their information
- Blood donation camps and events
- Blood requests from hospitals/patients
- Matching donors with requests
- Notifications and alerts
- Analytics and reporting

## 1.2 Why This Project?

### Real-World Problem:
- Finding blood donors during emergencies is difficult
- No centralized system to track donor eligibility
- Manual camp management is error-prone
- Matching donors to requests is time-consuming

### Our Solution:
- Digital donor database with search capabilities
- Automatic eligibility tracking (90-day rule)
- Centralized camp management
- Quick donor matching by blood group and location
- Automated notifications

## 1.3 Project Phases

The project is divided into **6 phases** for structured development:

| Phase | Name | Status | Purpose |
|-------|------|--------|---------|
| 1 | Authentication | ✅ Complete | User registration, login, JWT security |
| 2 | Donor Management | ✅ Complete | Donor profiles, CRUD, eligibility |
| 3 | Camp & Requests | 🔜 Pending | Camp creation, blood requests |
| 4 | Reporting | 🔜 Pending | Analytics, charts, statistics |
| 5 | Notifications | 🔜 Pending | SMS/Web push alerts |
| 6 | Deployment | 🔜 Pending | Production optimization, cloud hosting |

## 1.4 Target Users

1. **Donors** - Register, track donation history, check eligibility
2. **Organizers** - Create camps, manage events, find donors
3. **Admins** - Oversee system, manage users, view reports

---

# 2. TECHNOLOGY STACK EXPLAINED

## 2.1 The MERN Stack

**MERN** stands for: **M**ongoDB + **E**xpress + **R**eact + **N**ode.js

### Why MERN?

#### Advantage 1: JavaScript Everywhere
- **One language** (JavaScript) for both frontend and backend
- Easier to learn and maintain
- Shared code between client and server

#### Advantage 2: JSON All the Way
- Data flows in JSON format from database → server → client
- MongoDB stores data as JSON-like documents
- No data format conversions needed

#### Advantage 3: Fast Development
- Large ecosystem of libraries (npm packages)
- Active community support
- Rapid prototyping capabilities

## 2.2 Backend Technologies (What We've Built)

### Node.js
**What:** JavaScript runtime environment (runs JavaScript outside browsers)
**Why:** 
- Non-blocking I/O (handles many requests simultaneously)
- Event-driven architecture (perfect for real-time apps)
- Massive npm ecosystem (500,000+ packages)

**In Our Project:**
- Runs our server
- Executes JavaScript code for API logic
- Handles database operations

### Express.js
**What:** Lightweight web framework for Node.js
**Why:**
- Simplifies HTTP request/response handling
- Middleware support (plug-in functionality)
- Routing made easy

**In Our Project:**
- Defines API endpoints (`/api/auth/login`, `/api/donors/register`)
- Handles HTTP methods (GET, POST, PATCH, DELETE)
- Processes request bodies and sends responses

**Example:**
```javascript
app.post('/api/auth/login', (req, res) => {
  // Handle login logic
});
```

### MongoDB
**What:** NoSQL document database
**Why:**
- Flexible schema (no fixed table structure)
- Stores data as JSON-like documents
- Scales horizontally (can add more servers)
- Fast for read-heavy operations

**In Our Project:**
- Stores users, donors, camps, requests
- No joins needed (embedded documents)
- Quick queries by blood group, location

**Document Structure Example:**
```json
{
  "_id": "abc123",
  "name": "John Doe",
  "bloodGroup": "O+",
  "address": {
    "city": "Mumbai",
    "state": "Maharashtra"
  }
}
```

### Mongoose
**What:** MongoDB Object Data Modeling (ODM) library
**Why:**
- Provides schema validation (structure enforcement)
- Simplifies database operations
- Built-in type casting and validation

**In Our Project:**
- Defines data models (User, Donor)
- Validates input data
- Provides query helpers

**Example:**
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true }
});
```

## 2.3 Additional Backend Libraries

### bcryptjs
**Purpose:** Password hashing and encryption
**Why:** 
- Never store plain-text passwords
- One-way encryption (cannot be decrypted)
- Salt rounds prevent rainbow table attacks

**How It Works:**
```
Plain Password: "password123"
            ↓ (bcrypt hashing)
Hashed: "$2a$10$XYZ...abc" (60 characters)
```

**In Our Project:**
- Hashes passwords before saving to database
- Compares entered password with hashed version during login

### jsonwebtoken (JWT)
**Purpose:** Token-based authentication
**Why:**
- Stateless authentication (no server-side sessions)
- Contains user information (encrypted)
- 2-hour expiration for security

**JWT Structure:**
```
Header.Payload.Signature
eyJhbGci...  (base64 encoded JSON)
```

**Flow:**
1. User logs in → Server creates JWT → Sends to client
2. Client stores JWT (localStorage/cookies)
3. Client sends JWT with every request (Authorization header)
4. Server verifies JWT → Allows/denies access

**In Our Project:**
- Generated on login/registration
- Required for all protected routes
- Contains user ID and role

### dotenv
**Purpose:** Environment variable management
**Why:**
- Keeps secrets out of code
- Different configs for dev/production
- Security best practice

**In Our Project:**
- Loads `.env` file into `process.env`
- Stores: MongoDB URI, JWT secret, port, API keys

### cors
**Purpose:** Cross-Origin Resource Sharing
**Why:**
- Browsers block requests from different origins (security)
- CORS allows frontend (localhost:3000) to call backend (localhost:5000)

**In Our Project:**
- Enables React frontend to communicate with Express backend

### morgan
**Purpose:** HTTP request logger
**Why:**
- Logs every API request to console
- Helps debugging
- Tracks performance

**Output Example:**
```
POST /api/auth/login 200 45.123 ms - 256
GET /api/donors 200 12.456 ms - 1024
```

---

# 3. PROJECT ARCHITECTURE

## 3.1 MVC Pattern (Model-View-Controller)

Our project follows **MVC architecture** (adapted for APIs):

```
Client Request → Routes → Controller → Model → Database
                              ↓
                          Response
```

### Model (M)
- **What:** Data structure and database interaction
- **Files:** `models/User.js`, `models/Donor.js`
- **Responsibility:** Define schemas, validation, database queries

### Controller (C)
- **What:** Business logic and request handling
- **Files:** `controllers/authController.js`, `controllers/donorController.js`
- **Responsibility:** Process requests, call models, send responses

### View (V)
- **What:** In APIs, this is JSON responses (not HTML)
- **Files:** Handled by `utils/responseHandler.js`
- **Responsibility:** Format data for client consumption

### Routes (R)
- **What:** URL to controller mapping
- **Files:** `routes/authRoutes.js`, `routes/donorRoutes.js`
- **Responsibility:** Define endpoints, apply middleware

## 3.2 Request-Response Cycle

**Example: User Registration**

```
1. Client sends POST /api/auth/register with JSON body
                ↓
2. Express receives request
                ↓
3. Middleware processes (CORS, JSON parser, logger)
                ↓
4. Routes match: /api/auth → authRoutes
                ↓
5. Route matches: POST /register → register controller
                ↓
6. Controller (authController.register):
   - Validates input
   - Checks if user exists
   - Hashes password (bcrypt)
   - Saves to database (User model)
   - Generates JWT token
                ↓
7. Response sent back:
   {
     "success": true,
     "message": "User registered successfully",
     "data": { ...user, token }
   }
```

## 3.3 Middleware Pipeline

Middleware functions execute **in order** before reaching controllers:

```javascript
Request
   ↓
cors()                    // Allow cross-origin requests
   ↓
express.json()            // Parse JSON body
   ↓
morgan('dev')             // Log request
   ↓
protect middleware        // Verify JWT (if protected route)
   ↓
authorize('admin')        // Check user role (if needed)
   ↓
Controller Function       // Your business logic
   ↓
Response
```

---

# 4. FOLDER STRUCTURE DEEP DIVE

```
blood-donation/
├── PRD.md                          # Product Requirements Document
├── PHASE2_README.md                # Phase 2 testing guide
├── PROJECT_COMPLETE_GUIDE.md       # This file
├── .gitignore                      # Git ignore rules
│
└── server/                         # Backend application
    ├── package.json                # Dependencies list
    ├── package-lock.json           # Dependency tree lock
    ├── .env                        # Environment variables (SECRET!)
    ├── .env.example                # Template for .env
    ├── .gitignore                  # Server-specific ignores
    ├── server.js                   # Entry point (main file)
    │
    ├── config/                     # Configuration files
    │   └── db.js                   # MongoDB connection setup
    │
    ├── models/                     # Database schemas
    │   ├── User.js                 # User schema (auth)
    │   └── Donor.js                # Donor schema (profiles)
    │
    ├── controllers/                # Business logic
    │   ├── authController.js       # Auth operations (register, login, profile)
    │   └── donorController.js      # Donor operations (CRUD, search)
    │
    ├── routes/                     # API endpoint definitions
    │   ├── authRoutes.js           # /api/auth/* routes
    │   └── donorRoutes.js          # /api/donors/* routes
    │
    ├── middleware/                 # Custom middleware functions
    │   ├── authMiddleware.js       # JWT verification & role checking
    │   └── errorMiddleware.js      # Error handling
    │
    ├── utils/                      # Helper functions
    │   ├── generateToken.js        # JWT creation utility
    │   └── responseHandler.js      # Unified response format
    │
    └── node_modules/               # Installed packages (auto-generated)
```

## 4.1 File-by-File Explanation

### `server.js` - The Heart of the Application

**Purpose:** Application entry point, server initialization

**Key Responsibilities:**
1. Load environment variables (`dotenv.config()`)
2. Connect to MongoDB (`connectDB()`)
3. Initialize Express app
4. Apply global middleware (CORS, JSON parser, logger)
5. Define routes
6. Error handling
7. Start server on port 5000

**Code Breakdown:**
```javascript
import express from 'express';      // Import Express framework
import dotenv from 'dotenv';        // Load .env variables
import cors from 'cors';            // Enable cross-origin requests
import morgan from 'morgan';        // HTTP request logger
import connectDB from './config/db.js';  // DB connection
import authRoutes from './routes/authRoutes.js';  // Auth routes
import donorRoutes from './routes/donorRoutes.js'; // Donor routes
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();  // Load .env file
connectDB();      // Connect to MongoDB

const app = express();  // Create Express application

// Middleware
app.use(cors());        // Allow cross-origin requests
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(morgan('dev')); // Log requests in development

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'BDCMS API' });  // Root endpoint
});

app.use('/api/auth', authRoutes);     // Auth routes: /api/auth/*
app.use('/api/donors', donorRoutes);   // Donor routes: /api/donors/*

// Error handling
app.use(notFound);      // 404 handler (must be after all routes)
app.use(errorHandler);  // Global error handler

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### `config/db.js` - Database Connection

**Purpose:** Establish connection to MongoDB

**How It Works:**
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,      // Use new URL parser
      useUnifiedTopology: true,   // Use new connection engine
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Exit with failure
  }
};

export default connectDB;
```

**What Happens:**
1. Reads `MONGO_URI` from `.env` file
2. Attempts connection to MongoDB Atlas (or local)
3. If success: logs host name
4. If failure: logs error and exits process

### `models/User.js` - User Data Model

**Purpose:** Define user structure and authentication methods

**Schema Fields:**
- `name`: String, required
- `email`: String, unique, lowercase, validated
- `password`: String, hashed, not returned in queries
- `role`: Enum ('admin', 'organizer', 'donor')
- `phone`: String, validated format
- `isActive`: Boolean, default true
- `timestamps`: Auto-generated createdAt/updatedAt

**Key Features:**

#### 1. Pre-save Hook (Password Hashing)
```javascript
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();  // Skip if password not changed
  }
  const salt = await bcrypt.genSalt(10);  // Generate salt
  this.password = await bcrypt.hash(this.password, salt);  // Hash password
});
```

**When:** Before saving user to database
**What:** Automatically hashes password
**Why:** Never store plain-text passwords

#### 2. Instance Method (Password Comparison)
```javascript
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

**Usage:**
```javascript
const isMatch = await user.matchPassword('password123');
if (isMatch) {
  // Password correct
}
```

### `models/Donor.js` - Donor Data Model

**Purpose:** Define donor profile structure

**Schema Fields:**
- `userId`: Reference to User (ObjectId, unique)
- `bloodGroup`: Enum (A+, A-, B+, B-, AB+, AB-, O+, O-)
- `dateOfBirth`: Date
- `gender`: Enum (Male, Female, Other)
- `address`: Embedded object (street, city, state, zipCode, country)
- `lastDonationDate`: Date (null if never donated)
- `isEligible`: Boolean (calculated automatically)
- `healthInfo`: Embedded object (weight, height, BP, hemoglobin, conditions)
- `donationHistory`: Array of donation records
- `totalDonations`: Number
- `emergencyContact`: Embedded object
- `isActive`: Boolean

**Key Features:**

#### 1. Eligibility Auto-Calculation
```javascript
donorSchema.pre('save', function (next) {
  if (this.lastDonationDate) {
    const daysSince = Math.floor(
      (Date.now() - this.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    this.isEligible = daysSince >= 90;  // 90-day rule
  } else {
    this.isEligible = true;  // Never donated = eligible
  }
  next();
});
```

#### 2. Instance Method for Eligibility Check
```javascript
donorSchema.methods.checkEligibility = function () {
  if (!this.lastDonationDate) return true;
  
  const daysSince = Math.floor(
    (Date.now() - this.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return daysSince >= 90;
};
```

**Usage:**
```javascript
const donor = await Donor.findById(id);
const eligible = donor.checkEligibility();
```

### `controllers/authController.js` - Authentication Logic

**Three Main Functions:**

#### 1. Register
```javascript
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }
    
    // Create user (password auto-hashed by pre-save hook)
    const user = await User.create({ name, email, password, role, phone });
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    // Send response
    return sendResponse(res, 201, true, 'User registered', {
      ...user._doc,
      token
    });
  } catch (error) {
    next(error);  // Pass to error handler
  }
};
```

#### 2. Login
```javascript
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user (include password field)
    const user = await User.findOne({ email }).select('+password');
    
    // Check password
    if (user && (await user.matchPassword(password))) {
      if (!user.isActive) {
        throw new Error('Account deactivated');
      }
      
      const token = generateToken(user._id);
      return sendResponse(res, 200, true, 'Login successful', {
        ...user._doc,
        token
      });
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};
```

#### 3. Get Profile
```javascript
export const getProfile = async (req, res, next) => {
  try {
    // req.user set by protect middleware
    const user = await User.findById(req.user._id);
    
    return sendResponse(res, 200, true, 'Profile retrieved', user);
  } catch (error) {
    next(error);
  }
};
```

### `controllers/donorController.js` - Donor Operations

**Eight Main Functions:**

1. **registerDonor** - Create donor profile (one per user)
2. **getAllDonors** - List all donors (with filters, pagination)
3. **getDonorById** - Get specific donor
4. **getMyDonorProfile** - Get logged-in user's donor profile
5. **updateDonor** - Update donor info (owner/admin only)
6. **deleteDonor** - Deactivate donor (soft delete)
7. **checkDonorEligibility** - Check 90-day rule
8. **searchDonorsByBloodGroup** - Find donors by blood type & location

**Example: getAllDonors with Filters**
```javascript
export const getAllDonors = async (req, res, next) => {
  try {
    const { bloodGroup, city, isEligible, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = { isActive: true };
    
    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }
    
    if (city) {
      filter['address.city'] = { $regex: city, $options: 'i' };  // Case-insensitive
    }
    
    if (isEligible !== undefined) {
      filter.isEligible = isEligible === 'true';
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Query database
    const donors = await Donor.find(filter)
      .populate('userId', 'name email phone')  // Join with User
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });  // Newest first
    
    const total = await Donor.countDocuments(filter);
    
    return sendResponse(res, 200, true, 'Donors retrieved', {
      donors,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};
```

### `routes/authRoutes.js` - Auth Endpoints

**Purpose:** Map URLs to controller functions

```javascript
import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);           // Public
router.post('/login', login);                 // Public
router.get('/profile', protect, getProfile);  // Protected

export default router;
```

**Routes:**
- `POST /api/auth/register` → Anyone can register
- `POST /api/auth/login` → Anyone can login
- `GET /api/auth/profile` → Requires JWT (protected)

### `routes/donorRoutes.js` - Donor Endpoints

```javascript
import express from 'express';
import {
  registerDonor,
  getAllDonors,
  getDonorById,
  getMyDonorProfile,
  updateDonor,
  deleteDonor,
  checkDonorEligibility,
  searchDonorsByBloodGroup,
} from '../controllers/donorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require JWT authentication
router.post('/register', protect, registerDonor);
router.get('/', protect, getAllDonors);
router.get('/me', protect, getMyDonorProfile);
router.get('/search/:bloodGroup', protect, searchDonorsByBloodGroup);
router.get('/:id', protect, getDonorById);
router.get('/:id/eligibility', protect, checkDonorEligibility);
router.patch('/:id', protect, updateDonor);
router.delete('/:id', protect, deleteDonor);

export default router;
```

**Route Order Matters:**
- `/me` must come **before** `/:id`
- Otherwise `/me` would match `/:id` with `id="me"`

### `middleware/authMiddleware.js` - JWT Verification

**Two Middleware Functions:**

#### 1. Protect (JWT Verification)
```javascript
export const protect = async (req, res, next) => {
  let token;
  
  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        throw new Error('User not found');
      }
      
      next();  // Proceed to next middleware/controller
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};
```

**Flow:**
1. Check Authorization header: `Bearer eyJhbGci...`
2. Extract token (split by space, take second part)
3. Verify token with JWT_SECRET
4. Decode token → get user ID
5. Fetch user from database
6. Attach user to `req.user`
7. Call `next()` to continue

#### 2. Authorize (Role Checking)
```javascript
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role '${req.user.role}' not authorized`);
    }
    next();
  };
};
```

**Usage:**
```javascript
router.delete('/camps/:id', protect, authorize('admin', 'organizer'), deleteCamp);
```

Only admins and organizers can delete camps.

### `middleware/errorMiddleware.js` - Error Handling

**Two Functions:**

#### 1. notFound (404 Handler)
```javascript
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);  // Pass to error handler
};
```

**When:** No route matches the request
**Example:** `GET /api/wrong/endpoint` → 404

#### 2. errorHandler (Global Error Handler)
```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
```

**Purpose:** Catch all errors and send consistent JSON response

**Response Format:**
```json
{
  "success": false,
  "message": "User already exists",
  "stack": "Error: User already exists\n    at register..."
}
```

### `utils/generateToken.js` - JWT Creation

```javascript
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign(
    { id },                           // Payload (user ID)
    process.env.JWT_SECRET,           // Secret key
    { expiresIn: '2h' }              // Token expires in 2 hours
  );
};

export default generateToken;
```

**Usage:**
```javascript
const token = generateToken(user._id);
// Returns: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### `utils/responseHandler.js` - Consistent Responses

```javascript
const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = {
    success,
    message,
  };
  
  if (data) {
    response.data = data;
  }
  
  return res.status(statusCode).json(response);
};

export default sendResponse;
```

**Usage:**
```javascript
sendResponse(res, 200, true, 'Success', { user });

// Sends:
// {
//   "success": true,
//   "message": "Success",
//   "data": { user: {...} }
// }
```

---

# 5. PHASE 1: AUTHENTICATION SYSTEM

## 5.1 What Was Built

1. **User Registration** - Create new accounts
2. **User Login** - Authenticate users
3. **JWT Token System** - Secure, stateless authentication
4. **Password Hashing** - bcrypt encryption
5. **Protected Routes** - Middleware-based access control
6. **User Profile** - Get logged-in user info

## 5.2 How Authentication Works

### Registration Flow

```
1. User submits registration form
   POST /api/auth/register
   Body: { name, email, password, role, phone }
        ↓
2. Controller receives request
   - Validates input
   - Checks if email already exists
        ↓
3. User model receives data
   - Pre-save hook triggers
   - Password hashed with bcrypt
   - User saved to database
        ↓
4. JWT token generated
   - Token contains user ID
   - Signed with JWT_SECRET
   - 2-hour expiration set
        ↓
5. Response sent to client
   - User data (without password)
   - JWT token
   - Status 201 (Created)
```

### Login Flow

```
1. User submits login credentials
   POST /api/auth/login
   Body: { email, password }
        ↓
2. Controller finds user by email
   - Include password field (.select('+password'))
        ↓
3. Password comparison
   - bcrypt.compare(enteredPassword, hashedPassword)
   - Returns true/false
        ↓
4. If match:
   - Check if account active
   - Generate JWT token
   - Return user + token
   
   If no match:
   - Return 401 Unauthorized
```

### Protected Route Access

```
1. Client makes request to protected endpoint
   GET /api/auth/profile
   Headers: { Authorization: Bearer eyJhbGci... }
        ↓
2. protect middleware executes
   - Extract token from header
   - Verify token with JWT_SECRET
   - Decode token → get user ID
        ↓
3. User fetched from database
   - req.user = user (attached to request)
        ↓
4. Controller executes
   - Access user via req.user
   - Return user profile
```

## 5.3 Security Features

### 1. Password Hashing
**Plain Text:** `password123`
**Hashed:** `$2a$10$N9qo8uLOickgx2ZMRZoMye...` (60 chars)

**Why Hashing:**
- If database is hacked, passwords remain secure
- One-way encryption (cannot reverse)
- Same password = different hash (due to salt)

### 2. JWT Tokens
**Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  (Header)
.
eyJpZCI6IjY1ZjdhM2IyYzEyMzQ1Njc4OTBhYmNkZSIsImlhdCI6MTcxMDg2NDAwMCwiZXhwIjoxNzEwODcxMjAwfQ  (Payload)
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  (Signature)
```

**Decoded Payload:**
```json
{
  "id": "65f7a3b2c1234567890abcde",
  "iat": 1710864000,  // Issued at
  "exp": 1710871200   // Expires at
}
```

**Benefits:**
- Stateless (no server-side sessions)
- Self-contained (includes user info)
- Tamper-proof (signature verification)

### 3. Token Expiration
- Tokens expire after 2 hours
- User must re-login
- Reduces risk if token is stolen

### 4. Environment Variables
- Secrets stored in `.env` (not in code)
- `.env` in `.gitignore` (not committed to Git)
- Different values for dev/production

---

# 6. PHASE 2: DONOR MANAGEMENT

## 6.1 What Was Built

1. **Donor Registration** - Create detailed donor profiles
2. **CRUD Operations** - Create, Read, Update, Delete
3. **Eligibility Checking** - 90-day rule automation
4. **Blood Group Search** - Find donors by blood type
5. **Location Filtering** - Search by city/state
6. **Pagination** - Handle large datasets
7. **Authorization** - Owner-only updates

## 6.2 Donor Profile Components

### Personal Information
- Name (from linked User)
- Email (from linked User)
- Phone (from linked User)
- Date of Birth
- Gender
- Blood Group

### Address
- Street
- City
- State
- Zip Code
- Country

### Health Information
- Weight (minimum 45kg)
- Height
- Hemoglobin (minimum 12.5 g/dL)
- Blood Pressure (systolic/diastolic)
- Medical Conditions (array)
- Current Medications (array)
- Allergies (array)
- Last Checkup Date

### Donation Tracking
- Last Donation Date
- Total Donations Count
- Donation History (array of records)
- Eligibility Status (calculated)

### Emergency Contact
- Name
- Phone
- Relationship

## 6.3 Eligibility System Explained

### The 90-Day Rule

**Medical Guideline:**
- Blood donors must wait **90 days** (3 months) between donations
- Allows body to replenish blood cells and iron

**Implementation:**

#### Automatic Calculation (Pre-save Hook)
```javascript
donorSchema.pre('save', function (next) {
  if (this.lastDonationDate) {
    const daysSince = Math.floor(
      (Date.now() - this.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    this.isEligible = daysSince >= 90;
  } else {
    this.isEligible = true;  // Never donated
  }
  next();
});
```

**When Triggered:**
- Every time donor document is saved
- Recalculates eligibility automatically

**Example:**
```
Today: 2025-01-22
Last Donation: 2024-11-15
Days Since: 68 days
isEligible: false (needs 22 more days)

Today: 2025-01-22
Last Donation: 2024-10-10
Days Since: 104 days
isEligible: true (can donate)
```

#### Manual Check Endpoint
```
GET /api/donors/:id/eligibility

Response:
{
  "donorId": "...",
  "isEligible": false,
  "lastDonationDate": "2024-11-15",
  "daysUntilEligible": 22
}
```

## 6.4 Search & Filter Features

### Filter by Blood Group
```
GET /api/donors?bloodGroup=O+
```
Returns only O+ donors.

### Filter by City
```
GET /api/donors?city=Mumbai
```
Case-insensitive search (Mumbai, mumbai, MUMBAI all work).

### Filter by Eligibility
```
GET /api/donors?isEligible=true
```
Returns only eligible donors (ready to donate).

### Combined Filters
```
GET /api/donors?bloodGroup=AB-&city=Delhi&isEligible=true
```
Returns eligible AB- donors in Delhi.

### Blood Group Search
```
GET /api/donors/search/O-?city=Mumbai
```
Optimized search for emergencies:
- Only shows eligible donors
- Only shows active profiles
- Sorted by total donations (most experienced first)

## 6.5 Pagination

**Why Needed:**
- Database may have 10,000+ donors
- Sending all at once is slow
- Better UX (load 10 at a time)

**Implementation:**
```
GET /api/donors?page=2&limit=20
```

**Logic:**
```javascript
const page = 2;
const limit = 20;
const skip = (page - 1) * limit;  // (2-1) * 20 = 20

// Skip first 20, return next 20
const donors = await Donor.find().skip(20).limit(20);
```

**Response:**
```json
{
  "donors": [...],
  "pagination": {
    "total": 156,      // Total donors
    "page": 2,         // Current page
    "pages": 8,        // Total pages (156 / 20 = 8)
    "limit": 20        // Per page
  }
}
```

## 6.6 Authorization

**Rule:** Users can only update/delete their own donor profiles (unless admin).

**Implementation:**
```javascript
if (donor.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
  throw new Error('Not authorized');
}
```

**Example:**
- User A (ID: 123) creates donor profile
- User B (ID: 456) tries to update User A's profile
- Check: `123 !== 456 && role !== 'admin'` → Access Denied

---

# 7. DATABASE DESIGN

## 7.1 MongoDB Concepts

### Collections (like SQL tables)
- users
- donors
- camps (Phase 3)
- requests (Phase 3)

### Documents (like SQL rows)
- JSON-like objects
- Flexible schema
- Embedded sub-documents

### ObjectId
- Unique identifier: `65f7a3b2c1234567890abcde` (24 hex characters)
- Auto-generated by MongoDB
- Used for references between collections

## 7.2 User Collection

```javascript
{
  _id: ObjectId("65f7a3b2c1234567890abcde"),
  name: "Gautam Kakkar",
  email: "gautam@example.com",
  password: "$2a$10$N9qo8uLOickgx2ZMRZoMye...",  // Hashed
  role: "donor",
  phone: "+919876543210",
  isActive: true,
  createdAt: ISODate("2024-10-22T00:00:00Z"),
  updatedAt: ISODate("2024-10-22T00:00:00Z")
}
```

**Indexes:**
- `email` (unique)
- `_id` (auto-indexed)

## 7.3 Donor Collection

```javascript
{
  _id: ObjectId("65f7a3b2c1234567890abcdf"),
  userId: ObjectId("65f7a3b2c1234567890abcde"),  // References User
  bloodGroup: "O+",
  dateOfBirth: ISODate("1995-05-15T00:00:00Z"),
  gender: "Male",
  address: {
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India"
  },
  lastDonationDate: ISODate("2024-10-01T00:00:00Z"),
  isEligible: false,
  healthInfo: {
    weight: 70,
    height: 175,
    hemoglobin: 14.5,
    bloodPressure: {
      systolic: 120,
      diastolic: 80
    },
    medicalConditions: [],
    medications: [],
    allergies: ["Penicillin"]
  },
  donationHistory: [
    {
      campId: ObjectId("..."),
      donationDate: ISODate("2024-10-01T00:00:00Z"),
      unitsCollected: 1,
      notes: "Normal donation"
    }
  ],
  totalDonations: 1,
  emergencyContact: {
    name: "John Doe",
    phone: "+919876543210",
    relationship: "Brother"
  },
  isActive: true,
  createdAt: ISODate("2024-10-22T00:00:00Z"),
  updatedAt: ISODate("2024-10-22T00:00:00Z")
}
```

**Indexes:**
- `userId` (unique)
- `bloodGroup`
- `address.city`
- `isEligible`

## 7.4 Relationships

### One-to-One: User ↔ Donor
- Each User has **one** Donor profile
- Each Donor belongs to **one** User
- Linked via `donor.userId → user._id`

### Populate (Join)
```javascript
const donor = await Donor.findById(id).populate('userId', 'name email phone');

// Result:
{
  _id: "...",
  userId: {
    _id: "...",
    name: "Gautam Kakkar",
    email: "gautam@example.com",
    phone: "+919876543210"
  },
  bloodGroup: "O+",
  ...
}
```

**Without populate:**
```javascript
userId: "65f7a3b2c1234567890abcde"  // Just ID
```

**With populate:**
```javascript
userId: {
  _id: "65f7a3b2c1234567890abcde",
  name: "Gautam Kakkar",
  email: "gautam@example.com",
  phone: "+919876543210"
}
```

---

# 8. API DESIGN & REST PRINCIPLES

## 8.1 REST Architecture

**REST** = Representational State Transfer

**Principles:**
1. **Stateless** - Each request independent (no server-side sessions)
2. **Resource-Based** - URLs represent resources (nouns, not verbs)
3. **HTTP Methods** - CRUD mapped to GET, POST, PUT/PATCH, DELETE
4. **JSON Format** - Data exchanged as JSON

## 8.2 HTTP Methods

| Method | Purpose | Example | Idempotent* |
|--------|---------|---------|-------------|
| GET | Retrieve data | GET /api/donors | Yes |
| POST | Create new resource | POST /api/donors/register | No |
| PUT | Replace entire resource | PUT /api/donors/:id | Yes |
| PATCH | Update partial resource | PATCH /api/donors/:id | Yes |
| DELETE | Remove resource | DELETE /api/donors/:id | Yes |

*Idempotent = Same request multiple times = same result

## 8.3 Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PATCH, DELETE |
| 201 | Created | Successful POST (new resource) |
| 400 | Bad Request | Invalid input, validation error |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Valid token, insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

## 8.4 URL Design

**Good REST URLs:**
```
GET    /api/donors              ✅ Get all donors
POST   /api/donors/register     ✅ Create donor
GET    /api/donors/:id          ✅ Get donor by ID
PATCH  /api/donors/:id          ✅ Update donor
DELETE /api/donors/:id          ✅ Delete donor
GET    /api/donors/search/O+    ✅ Search by blood group
```

**Bad URLs:**
```
GET    /api/getDonors           ❌ Verb in URL
POST   /api/createDonor         ❌ Should use POST /donors
GET    /api/donors/delete/:id   ❌ Should use DELETE method
```

## 8.5 Request/Response Format

### Request (Client → Server)

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGci...
```

**Body (JSON):**
```json
{
  "bloodGroup": "O+",
  "address": {
    "city": "Mumbai"
  }
}
```

### Response (Server → Client)

**Success:**
```json
{
  "success": true,
  "message": "Donor registered successfully",
  "data": {
    "_id": "...",
    "bloodGroup": "O+",
    ...
  }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Donor profile already exists",
  "stack": "Error: Donor profile already exists\n..."
}
```

---

# 9. SECURITY IMPLEMENTATION

## 9.1 Password Security

### Hashing with bcrypt
```javascript
const salt = await bcrypt.genSalt(10);           // Generate random salt
const hashed = await bcrypt.hash(password, salt); // Hash password
```

**What is Salt?**
- Random string added to password before hashing
- Same password + different salt = different hash
- Prevents rainbow table attacks

**Example:**
```
Password: "password123"
Salt 1: "$2a$10$ABC..."
Hash 1: "$2a$10$ABC...XYZ"

Password: "password123"
Salt 2: "$2a$10$DEF..."
Hash 2: "$2a$10$DEF...UVW"  (different!)
```

### Password Comparison
```javascript
const isMatch = await bcrypt.compare("password123", hashedPassword);
```

bcrypt re-hashes input with same salt and compares results.

## 9.2 JWT Security

### Token Generation
```javascript
const token = jwt.sign(
  { id: user._id },              // Payload (not sensitive)
  process.env.JWT_SECRET,        // Secret key (sensitive!)
  { expiresIn: '2h' }           // Expiration
);
```

**JWT_SECRET:**
- Long random string (32+ characters)
- Never committed to Git
- Different for dev/production
- Used to sign and verify tokens

### Token Verification
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// decoded = { id: "65f7a3b2c...", iat: 1710864000, exp: 1710871200 }
```

**If tampered:**
```javascript
// Modified token → Verification fails → 401 Unauthorized
```

## 9.3 CORS Security

**Problem:**
- Frontend (http://localhost:3000)
- Backend (http://localhost:5000)
- Browsers block cross-origin requests by default

**Solution:**
```javascript
app.use(cors());  // Allow all origins (dev only)
```

**Production (restrict origins):**
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',  // Only allow your frontend
  credentials: true
}));
```

## 9.4 Environment Variables

**.env File:**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=<your_super_secret_jwt_key>
NODE_ENV=development
```

**Security Rules:**
1. Never commit `.env` to Git
2. Add `.env` to `.gitignore`
3. Use different secrets for dev/production
4. Rotate secrets regularly

## 9.5 Input Validation

### Mongoose Schema Validation
```javascript
email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,
  match: [/regex/, 'Invalid email format']
}
```

**Validates:**
- Required fields
- Data types
- Enum values
- Min/max values
- Regex patterns

### Controller-Level Validation
```javascript
if (!email || !password) {
  throw new Error('Email and password required');
}
```

## 9.6 Error Handling

### Never Expose Sensitive Info
```javascript
// ❌ Bad (exposes database structure)
catch (error) {
  res.json({ error: error.toString() });
}

// ✅ Good (generic message)
catch (error) {
  res.status(500).json({ message: 'Server error' });
}
```

### Stack Traces (Dev Only)
```javascript
stack: process.env.NODE_ENV === 'production' ? null : err.stack
```

Production: Hide stack traces
Development: Show for debugging

---

# 10. HOW EVERYTHING WORKS TOGETHER

## 10.1 Complete User Journey

### Journey 1: New User Registration & Donor Profile

```
STEP 1: User Registration
─────────────────────────
Client → POST /api/auth/register
Body: { name, email, password, role, phone }
         ↓
Server: authController.register
  - Check email unique
  - Create user (password auto-hashed)
  - Generate JWT token
         ↓
Response: { user, token }
Client stores token in localStorage/state

──────────────────────────────────────────

STEP 2: Login (Next Time)
─────────────────────────
Client → POST /api/auth/login
Body: { email, password }
         ↓
Server: authController.login
  - Find user by email
  - Compare passwords (bcrypt)
  - Generate new token
         ↓
Response: { user, token }

──────────────────────────────────────────

STEP 3: Create Donor Profile
─────────────────────────────
Client → POST /api/donors/register
Headers: { Authorization: Bearer TOKEN }
Body: { bloodGroup, dateOfBirth, address, healthInfo, ... }
         ↓
Middleware: protect
  - Verify JWT token
  - Attach user to req.user
         ↓
Controller: donorController.registerDonor
  - Check one donor per user
  - Create donor (link to userId)
  - Auto-calculate isEligible
         ↓
Response: { donor with populated user info }

──────────────────────────────────────────

STEP 4: Update Health Info
───────────────────────────
Client → PATCH /api/donors/:id
Headers: { Authorization: Bearer TOKEN }
Body: { healthInfo: { weight: 72 } }
         ↓
Middleware: protect
  - Verify token
         ↓
Controller: donorController.updateDonor
  - Find donor
  - Check authorization (owner or admin)
  - Update fields
  - Save (triggers eligibility recalc)
         ↓
Response: { updated donor }

──────────────────────────────────────────

STEP 5: Search for O+ Donors in Emergency
──────────────────────────────────────────
Client → GET /api/donors/search/O+?city=Mumbai
Headers: { Authorization: Bearer TOKEN }
         ↓
Middleware: protect
         ↓
Controller: donorController.searchDonorsByBloodGroup
  - Filter: bloodGroup=O+, city=Mumbai, isEligible=true
  - Sort by totalDonations (most experienced first)
         ↓
Response: { donors: [...] }
```

## 10.2 Data Flow Diagram

```
┌──────────────┐
│   CLIENT     │  (Postman / React App)
│  (Browser)   │
└──────┬───────┘
       │ HTTP Request (JSON + JWT)
       ↓
┌──────────────────────────────────────┐
│         EXPRESS SERVER               │
│  ┌────────────────────────────────┐  │
│  │   Middleware Pipeline          │  │
│  │   1. CORS                      │  │
│  │   2. JSON Parser               │  │
│  │   3. Morgan Logger             │  │
│  │   4. protect (JWT verify)      │  │
│  └────────────┬───────────────────┘  │
│               ↓                      │
│  ┌────────────────────────────────┐  │
│  │   Routes                       │  │
│  │   /api/auth → authRoutes       │  │
│  │   /api/donors → donorRoutes    │  │
│  └────────────┬───────────────────┘  │
│               ↓                      │
│  ┌────────────────────────────────┐  │
│  │   Controllers                  │  │
│  │   Business Logic               │  │
│  └────────────┬───────────────────┘  │
│               ↓                      │
│  ┌────────────────────────────────┐  │
│  │   Models                       │  │
│  │   Mongoose Schemas             │  │
│  └────────────┬───────────────────┘  │
└───────────────┼────────────────────┘
                ↓
┌───────────────────────────────────┐
│      MONGODB DATABASE             │
│  ┌─────────────────────────────┐  │
│  │  Collections:               │  │
│  │  • users                    │  │
│  │  • donors                   │  │
│  │  • camps (Phase 3)          │  │
│  │  • requests (Phase 3)       │  │
│  └─────────────────────────────┘  │
└───────────────────────────────────┘
```

## 10.3 Authentication Flow Diagram

```
┌──────────┐                    ┌──────────┐
│  Client  │                    │  Server  │
└────┬─────┘                    └────┬─────┘
     │                               │
     │  1. POST /api/auth/register  │
     │  { email, password, ... }     │
     ├──────────────────────────────>│
     │                               │
     │                         2. Hash Password
     │                         3. Save to DB
     │                         4. Generate JWT
     │                               │
     │  5. Response: { user, token } │
     │<──────────────────────────────┤
     │                               │
     │  6. Store token (localStorage)│
     │                               │
     │                               │
     │  7. POST /api/donors/register │
     │  Headers: { Authorization:    │
     │    Bearer TOKEN }             │
     ├──────────────────────────────>│
     │                               │
     │                         8. Verify JWT
     │                         9. Decode token
     │                         10. Get user ID
     │                         11. Execute logic
     │                               │
     │  12. Response: { donor }      │
     │<──────────────────────────────┤
     │                               │
```

## 10.4 Database Relationships

```
┌─────────────────────┐
│      User           │
│  ─────────────────  │
│  _id (PK)           │
│  name               │
│  email (unique)     │
│  password (hashed)  │
│  role               │
│  phone              │
└──────────┬──────────┘
           │
           │ One-to-One
           │
           ↓
┌──────────────────────┐
│      Donor           │
│  ──────────────────  │
│  _id (PK)            │
│  userId (FK) ←───────┘  (References User._id)
│  bloodGroup          │
│  dateOfBirth         │
│  address             │
│  healthInfo          │
│  lastDonationDate    │
│  isEligible          │
│  donationHistory []  │
└──────────────────────┘
           │
           │ One-to-Many (Phase 3)
           │
           ↓
┌──────────────────────┐
│  DonationHistory     │
│  (Embedded Array)    │
│  ──────────────────  │
│  campId (FK)         │───────> Camp._id
│  donationDate        │
│  unitsCollected      │
│  notes               │
└──────────────────────┘
```

---

# 11. DEVELOPMENT BEST PRACTICES USED

## 11.1 Code Organization

### 1. Separation of Concerns
- **Models** - Data layer only
- **Controllers** - Business logic only
- **Routes** - Routing only
- **Middleware** - Cross-cutting concerns

### 2. DRY (Don't Repeat Yourself)
```javascript
// ✅ Reusable utility
const sendResponse = (res, code, success, message, data) => { ... };

// Used everywhere
sendResponse(res, 200, true, 'Success', user);
sendResponse(res, 404, false, 'Not found', null);
```

### 3. Single Responsibility
Each function does **one thing**:
```javascript
// ✅ Good
const hashPassword = async (password) => { ... };
const generateToken = (id) => { ... };

// ❌ Bad (does too much)
const registerUser = (data) => {
  // validate, hash, save, send email, log, ...
};
```

## 11.2 Naming Conventions

### Files
- `camelCase.js` - e.g., `authController.js`, `donorRoutes.js`
- Descriptive names - `generateToken.js` not `utils.js`

### Variables & Functions
```javascript
// camelCase for variables/functions
const userProfile = await getProfile();

// PascalCase for classes/models
const User = mongoose.model('User', userSchema);

// UPPER_SNAKE_CASE for constants
const MAX_LOGIN_ATTEMPTS = 5;
```

### Routes
- Lowercase, plural nouns
- `/api/donors` not `/api/Donor` or `/api/DONORS`

## 11.3 Error Handling

### Try-Catch in Controllers
```javascript
export const register = async (req, res, next) => {
  try {
    // Logic here
  } catch (error) {
    next(error);  // Pass to error middleware
  }
};
```

### Global Error Handler
- Centralized error responses
- Consistent format
- Hide sensitive info in production

## 11.4 Async/Await (No Callbacks)

```javascript
// ✅ Modern (async/await)
const user = await User.findOne({ email });

// ❌ Old (callbacks - avoided)
User.findOne({ email }, (err, user) => {
  if (err) { ... }
});
```

## 11.5 ES6 Modules

```javascript
// ✅ ES6 (import/export)
import express from 'express';
export default router;

// ❌ CommonJS (avoided in this project)
const express = require('express');
module.exports = router;
```

**Note:** `"type": "module"` in `package.json` enables ES6.

## 11.6 Environment-Based Config

```javascript
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));  // Logging in dev only
}
```

## 11.7 Validation at Multiple Layers

1. **Client-side** (Phase 4: React forms)
2. **Mongoose Schema** (required, min, max, enum)
3. **Controller** (custom business logic)

## 11.8 Security Best Practices

- ✅ Password hashing (bcrypt)
- ✅ JWT tokens (not plain cookies)
- ✅ Token expiration (2 hours)
- ✅ Environment variables (.env)
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error messages sanitized

---

# 12. TESTING GUIDE

## 12.1 Testing Tools

### Postman (API Testing)
- Test all endpoints
- Save requests in collections
- Environment variables for tokens
- Automated test scripts

### MongoDB Compass (Database Inspection)
- Visual database browser
- Query data directly
- Verify document structure
- Check indexes

## 12.2 Test Scenarios

### Authentication Tests

#### Test 1: Register New User
```
POST /api/auth/register
Body: { name, email, password, role, phone }
Expected: 201 Created, token returned
```

#### Test 2: Register Duplicate Email
```
POST /api/auth/register
Body: { same email }
Expected: 400 Bad Request, "User already exists"
```

#### Test 3: Login with Correct Credentials
```
POST /api/auth/login
Body: { email, password }
Expected: 200 OK, token returned
```

#### Test 4: Login with Wrong Password
```
POST /api/auth/login
Body: { email, wrong password }
Expected: 401 Unauthorized, "Invalid credentials"
```

#### Test 5: Access Protected Route Without Token
```
GET /api/auth/profile
Headers: (no Authorization)
Expected: 401 Unauthorized, "Not authorized, no token"
```

#### Test 6: Access Protected Route With Valid Token
```
GET /api/auth/profile
Headers: { Authorization: Bearer VALID_TOKEN }
Expected: 200 OK, user profile
```

### Donor Management Tests

#### Test 7: Register Donor Profile
```
POST /api/donors/register
Headers: { Authorization: Bearer TOKEN }
Body: { bloodGroup, dateOfBirth, address, healthInfo }
Expected: 201 Created, donor profile
```

#### Test 8: Register Duplicate Donor
```
POST /api/donors/register (same user)
Expected: 400 Bad Request, "Donor profile already exists"
```

#### Test 9: Get All Donors
```
GET /api/donors
Expected: 200 OK, array of donors
```

#### Test 10: Filter by Blood Group
```
GET /api/donors?bloodGroup=O+
Expected: 200 OK, only O+ donors
```

#### Test 11: Search by Blood Group
```
GET /api/donors/search/AB-?city=Mumbai
Expected: 200 OK, eligible AB- donors in Mumbai
```

#### Test 12: Update Own Donor Profile
```
PATCH /api/donors/:id
Headers: { Authorization: Bearer TOKEN }
Body: { healthInfo: { weight: 75 } }
Expected: 200 OK, updated profile
```

#### Test 13: Update Someone Else's Profile
```
PATCH /api/donors/:otherId (different user's ID)
Expected: 403 Forbidden, "Not authorized"
```

#### Test 14: Check Eligibility (Never Donated)
```
GET /api/donors/:id/eligibility
Expected: { isEligible: true, daysUntilEligible: 0 }
```

#### Test 15: Check Eligibility (Recent Donation)
```
First: PATCH /api/donors/:id with lastDonationDate: "2025-01-01"
Then: GET /api/donors/:id/eligibility
Expected: { isEligible: false, daysUntilEligible: X }
```

## 12.3 Database Verification

After each test:

1. Open **MongoDB Compass**
2. Connect to your database
3. Navigate to collection
4. Verify document structure

**Example:**
```
Test: Register user
     ↓
MongoDB: users collection
     ↓
Check:
  ✓ User document created
  ✓ Password is hashed (not plain text)
  ✓ Email is lowercase
  ✓ createdAt timestamp exists
```

## 12.4 Common Test Issues

### Issue: "Token expired"
**Solution:** Token expires after 2 hours. Re-login to get new token.

### Issue: "Invalid token"
**Solution:** Check token format: `Bearer eyJhbGci...` (space after Bearer)

### Issue: "Cannot read properties of null"
**Solution:** Document doesn't exist. Verify ID is correct.

### Issue: "Validation failed"
**Solution:** Check required fields, data types, enum values.

---

# 13. WHAT'S NEXT (REMAINING PHASES)

## 13.1 Phase 3: Camp & Request Management

### Camp Features
- Create blood donation camps
- Schedule date, time, location
- Organizer management
- Donor attendance tracking
- Camp status (upcoming, ongoing, completed)

### Request Features
- Create blood requests (from hospitals/patients)
- Specify blood group, quantity, urgency
- Automatic donor matching
- Location-based search
- Request status (pending, fulfilled, cancelled)

**New Models:**
```javascript
Camp {
  organizerId: ObjectId (ref: User)
  name: String
  description: String
  date: Date
  location: { address, city, state }
  donors: [ObjectId] (ref: Donor)
  status: enum (upcoming, ongoing, completed)
}

Request {
  requesterId: ObjectId (ref: User)
  bloodGroup: String
  quantity: Number
  urgency: enum (low, medium, high, critical)
  location: { city, state }
  status: enum (pending, fulfilled, cancelled)
  matchedDonors: [ObjectId]
}
```

**New Endpoints:**
```
POST   /api/camps/create
GET    /api/camps
GET    /api/camps/:id
PATCH  /api/camps/:id
DELETE /api/camps/:id

POST   /api/requests
GET    /api/requests
GET    /api/requests/match/:bloodGroup
PATCH  /api/requests/:id/fulfill
```

## 13.2 Phase 4: Reporting & Analytics

### Analytics Features
- Donations by blood group (pie chart)
- Donations over time (line chart)
- Camp performance metrics
- Donor leaderboard (most donations)
- City-wise statistics

### Frontend Components
- React dashboard
- Chart.js integration
- Real-time data updates

**New Endpoints:**
```
GET /api/reports/donations
GET /api/reports/camps
GET /api/reports/donors-stats
```

**Aggregation Example:**
```javascript
// Donations by blood group
Donor.aggregate([
  { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

// Result:
[
  { _id: "O+", count: 350 },
  { _id: "A+", count: 280 },
  { _id: "B+", count: 220 },
  ...
]
```

## 13.3 Phase 5: Notification System

### Notification Features
- SMS alerts via Twilio
- Web push notifications (fallback)
- Email notifications (optional)

### Trigger Events
- New camp created → Notify nearby eligible donors
- Blood request created → Notify matching donors
- Eligibility restored (90 days passed) → Notify donor

**New Model:**
```javascript
Notification {
  userId: ObjectId
  type: enum (sms, webpush, email)
  message: String
  sentAt: Date
  status: enum (sent, failed)
}
```

**Twilio Integration:**
```javascript
import twilio from 'twilio';

const client = twilio(TWILIO_SID, TWILIO_TOKEN);

await client.messages.create({
  to: '+919876543210',
  from: TWILIO_NUMBER,
  body: 'Blood donation camp tomorrow at Mumbai!'
});
```

## 13.4 Phase 6: Deployment & Optimization

### Deployment Tasks
- Deploy backend to **Render** / **Railway** / **Heroku**
- Deploy frontend to **Vercel** / **Netlify**
- MongoDB Atlas (already cloud-based)

### Optimization
- Add rate limiting (express-rate-limit)
- Add helmet (security headers)
- Compression (gzip responses)
- Caching (Redis for frequent queries)
- Logging (Winston for production)

### CI/CD
- GitHub Actions workflow
- Automated testing
- Auto-deploy on push to main

### Production Config
```javascript
// Restrict CORS
app.use(cors({
  origin: 'https://bdcms.com',
  credentials: true
}));

// Rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // 100 requests per window
});
app.use('/api/', limiter);

// Security headers
import helmet from 'helmet';
app.use(helmet());
```

---

# SUMMARY: PROJECT STATUS

## ✅ Completed (Phases 1-2)

### Phase 1: Authentication
- User registration with validation
- Login with password hashing (bcrypt)
- JWT token generation (2-hour expiration)
- Protected routes middleware
- Role-based authorization framework
- User profile endpoint

### Phase 2: Donor Management
- Donor registration (one per user)
- Full CRUD operations
- Automatic eligibility checking (90-day rule)
- Blood group search
- Location-based filtering
- Pagination support
- Owner/admin authorization

## 🔜 Upcoming (Phases 3-6)

- Phase 3: Camp creation, blood requests, donor matching
- Phase 4: Dashboard with charts and analytics
- Phase 5: SMS/Web push notifications
- Phase 6: Cloud deployment and optimization

## 📊 Current Stats

- **Total Files:** 19
- **Models:** 2 (User, Donor)
- **Controllers:** 2 (Auth, Donor)
- **Routes:** 2 (Auth, Donor)
- **Endpoints:** 11 (3 auth + 8 donor)
- **Middleware:** 4 (protect, authorize, notFound, errorHandler)
- **Lines of Code:** ~1,200

---

# GLOSSARY OF TERMS

**API** - Application Programming Interface (how frontend talks to backend)
**Authentication** - Verifying user identity (login)
**Authorization** - Checking user permissions (role-based access)
**bcrypt** - Password hashing library
**CORS** - Cross-Origin Resource Sharing (allows frontend-backend communication)
**CRUD** - Create, Read, Update, Delete operations
**JWT** - JSON Web Token (secure authentication tokens)
**Middleware** - Functions that process requests before controllers
**MongoDB** - NoSQL document database
**Mongoose** - MongoDB ODM (Object Data Modeling)
**ODM** - Object Document Mapper (like ORM for NoSQL)
**Populate** - Mongoose method to join related documents
**REST** - Representational State Transfer (API architecture)
**Schema** - Data structure definition
**Stateless** - No server-side session storage (JWT-based)

---

**End of Complete Project Guide**
