# 🚗 Finance Management System — Car Rental Backend API

A RESTful backend API for a **Car Rental Management System** built with Node.js, Express, and MongoDB. Includes user authentication (JWT + email verification), vehicle management, booking management, and category management with role-based access control (Admin / User).

---

## 📋 Features

- **User Authentication & Authorization**
  - Sign Up / Sign In / Sign Out
  - Email verification with OTP code
  - Forgot password with email code verification
  - Change password (authenticated)
  - JWT-based session management via HTTP-only cookies
  - Role-based access: `Admin` and `User`

- **Vehicle Management** *(Admin only for CUD)*
  - Add, update, delete vehicles
  - View all vehicles or a single vehicle
  - Vehicles linked to categories and owners

- **Booking Management** *(Authenticated users)*
  - Create, update, delete bookings
  - View all bookings or bookings by user
  - Booking statuses: Pending, Confirmed, Cancelled

- **Category Management** *(Admin only for CUD)*
  - Create, update, delete vehicle categories
  - View all categories

---

## 🛠️ Tech Stack

| Technology     | Purpose                        |
|----------------|-------------------------------|
| Node.js        | Runtime                       |
| Express.js     | Web framework                 |
| MongoDB        | Database                      |
| Mongoose       | ODM for MongoDB               |
| JSON Web Token | Authentication                |
| bcryptjs       | Password hashing              |
| Joi            | Request validation            |
| Nodemailer     | Email sending (OTP, resets)   |
| Helmet         | HTTP security headers         |
| CORS           | Cross-origin resource sharing |
| cookie-parser  | Cookie handling               |

---

## 📁 Project Structure

```
Finance_Management_System/
├── controllers/
│   ├── authController.js
│   ├── bookingController.js
│   ├── categoryController.js
│   └── vehicleController.js
├── middlewares/
│   ├── identification.js     # JWT auth & role middleware
│   ├── sendMail.js           # Nodemailer transport config
│   └── validator.js          # Joi validation schemas
├── models/
│   ├── bookingModel.js
│   ├── categoryModel.js
│   ├── userModel.js
│   └── vehicleModel.js
├── routers/
│   ├── authRouter.js
│   ├── bookingRouter.js
│   ├── categoryRouter.js
│   └── vehicleRouter.js
├── utils/
│   └── hashing.js            # Password hash & HMAC helpers
├── index.js                  # App entry point
├── package.json
└── .env                      # Environment variables (not committed)
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI

### 1. Clone the repository
```bash
git clone https://github.com/IT22182678-Maleesha/Finance_Management_System.git
cd Finance_Management_System
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the root directory
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/finance_management
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
HMAC_SECRET=your_hmac_secret_key
```

### 4. Run the server
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Server will start at `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint                        | Access     | Description                      |
|--------|----------------------------------|------------|----------------------------------|
| POST   | `/signup`                        | Public     | Register a new user              |
| POST   | `/signin`                        | Public     | Login                            |
| POST   | `/signout`                       | User       | Logout                           |
| PATCH  | `/sent-verification-code`        | User       | Send email verification OTP      |
| PATCH  | `/verify-verification-code`      | User       | Verify email OTP                 |
| PATCH  | `/send-forgot-password-code`     | Public     | Send forgot password code        |
| PATCH  | `/verify-forgot-password-code`   | Public     | Verify forgot password code      |
| PATCH  | `/change-password`               | User       | Change password                  |
| GET    | `/admin`                         | Admin      | Admin-only test route            |

### Vehicles — `/api/vehicle`

| Method | Endpoint           | Access  | Description               |
|--------|--------------------|---------|---------------------------|
| GET    | `/all-vehicles`    | Public  | Get all vehicles          |
| GET    | `/single-vehicle`  | Public  | Get a single vehicle      |
| POST   | `/create-vehicle`  | Admin   | Add a new vehicle         |
| PUT    | `/update-vehicle`  | Admin   | Update a vehicle          |
| DELETE | `/delete-vehicle`  | Admin   | Delete a vehicle          |

### Bookings — `/api/booking`

| Method | Endpoint           | Access  | Description                    |
|--------|--------------------|---------|--------------------------------|
| GET    | `/all-booking`     | Public  | Get all bookings               |
| GET    | `/single-booking`  | Public  | Get a single booking           |
| GET    | `/user-booking`    | User    | Get bookings by logged-in user |
| POST   | `/create-booking`  | User    | Create a new booking           |
| PUT    | `/update-booking`  | User    | Update a booking               |
| DELETE | `/delete-booking`  | User    | Delete a booking               |

### Categories — `/api/category`

| Method | Endpoint           | Access  | Description              |
|--------|--------------------|---------|--------------------------|
| GET    | `/all-category`    | Public  | Get all categories       |
| POST   | `/create-category` | Admin   | Create a new category    |
| PUT    | `/update-category` | Admin   | Update a category        |
| DELETE | `/delete-category` | Admin   | Delete a category        |

---

## 🗄️ Data Models

### User
| Field        | Type    | Notes                  |
|--------------|---------|------------------------|
| name         | String  | Required               |
| email        | String  | Required, unique       |
| phoneNumber  | String  | Required               |
| password     | String  | Hashed with bcrypt     |
| verified     | Boolean | Email verified flag    |
| role         | String  | `user` or `admin`      |

### Vehicle
| Field                    | Type   | Notes                              |
|--------------------------|--------|------------------------------------|
| brand                    | String | Required                           |
| model                    | String | Required                           |
| category                 | ObjectId | Ref → Category                   |
| year                     | Number | Required                           |
| fuelType                 | String | Petrol / Diesel / Electric / Hybrid|
| rentalPricePerDay        | Number | Required                           |
| additionalPricePayKilometer | Number | Required                        |
| status                   | String | Available / Booked / Maintenance   |
| imageUrl                 | String | Optional                           |
| userId                   | ObjectId | Ref → User (owner)              |

### Booking
| Field           | Type   | Notes                          |
|-----------------|--------|--------------------------------|
| customerName    | String | Required                       |
| contactNumber   | String | Required                       |
| email           | String | Required                       |
| vehicle         | String | Required                       |
| pickupLocation  | String | Default: `Godagama`           |
| pickupDate      | String | Required                       |
| pickupTime      | String | Required                       |
| dropoffDate     | String | Required                       |
| dropoffTime     | String | Required                       |
| bookingStatus   | String | Confirmed / Cancelled / Pending|
| userId          | ObjectId | Ref → User                   |

### Category
| Field | Type   | Notes    |
|-------|--------|----------|
| name  | String | Required |


