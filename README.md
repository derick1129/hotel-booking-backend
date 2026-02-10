# 🏨 Seasons – Hotel Booking Backend

A **production-grade hotel booking backend system** built using **Bun, TypeScript, Express, MongoDB, and Razorpay**, designed to handle real-world booking logic, secure payments, and scalable backend architecture.

This project focuses on **correct system design**, **security**, and **business logic**, rather than basic CRUD APIs.

---

## 🚀 Tech Stack

- **Runtime:** Bun  
- **Language:** TypeScript  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Payments:** Razorpay  
- **Architecture:** Feature-based modular backend  

---

## 📂 Project Structure
backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── user.model.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── hotel/
│   │   │   ├── hotel.model.ts
│   │   │   ├── hotel.controller.ts
│   │   │   └── hotel.routes.ts
│   │   │
│   │   ├── room/
│   │   │   ├── room.model.ts
│   │   │   ├── room.controller.ts
│   │   │   └── room.routes.ts
│   │   │
│   │   ├── booking/
│   │   │   ├── booking.model.ts
│   │   │   ├── booking.controller.ts
│   │   │   └── booking.routes.ts
│   │   │
│   │   └── payment/
│   │       ├── payment.controller.ts
│   │       └── payment.routes.ts
│
├── .env
├── package.json
├── bun.lockb
└── tsconfig.json

---

## 🔐 Authentication & Authorization

- User registration & login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes using middleware
- Role-based authorization (`admin`, `guest`)
- Secure request user typing (`req.user`)

### Middleware
- `protect` – verifies JWT token
- `adminOnly` – restricts admin-only routes

---

## 🏨 Hotel & Room Management

### Hotels
- Hotel data modeling
- Admin-only hotel creation
- Public hotel listing

### Rooms
- Room data modeling
- One-to-many relationship (Hotel → Rooms)
- Admin-only room creation
- Public room listing per hotel

---

## 📅 Booking System (Core Logic)

### Booking Lifecycle

### Implemented Features
- Booking creation API
- Date validation (check-in < check-out)
- Room existence validation
- Date overlap detection (prevents double booking)
- Night calculation logic
- Total price calculation
- Booking linked to authenticated user
- Type-safe MongoDB ObjectId handling
- Proper HTTP status codes

---

## 💳 Payment Integration (Razorpay)

### Payment Flow
1. Booking created with status `PENDING`
2. Backend creates Razorpay payment order
3. Frontend opens Razorpay Checkout
4. User completes payment
5. Backend verifies payment signature
6. Booking status updated to `CONFIRMED`

### Security Highlights
- Backend-only payment verification
- HMAC SHA-256 signature validation
- Razorpay secret key never exposed
- Frontend never trusted for payment success

---

## 🔁 End-to-End Flow