# 👓 NETRA

> **NETRA** is a full-stack e-commerce web application for eyewear that provides a seamless shopping experience for sunglasses, eyeglasses, contact lenses, and accessories. It features secure authentication, online payments, an admin dashboard, analytics, and much more.

---

## 🚀 Project Overview

🛍️ **NETRA** is a complete MERN Stack e-commerce platform designed specifically for eyewear shopping.

It includes:
- 👓 Sunglasses
- 🤓 Eyeglasses
- 👁️ Contact Lenses
- 🎒 Accessories

The application provides users with a modern shopping experience while allowing administrators to efficiently manage products, orders, users, and business analytics.

---

## ✨ Features

### 👤 User Features
- 🔐 Secure User Registration
- 📧 Email OTP Verification
- 🔑 JWT Authentication
- 👤 Profile Management
- 🛒 Add to Cart
- ❤️ Update Cart Items
- 💳 Secure Checkout
- 📦 Order History

### 🛍️ Product Features
- 📂 Product Categories
- 🔍 Product Details
- 📦 Stock Management
- 🖼️ High-quality Product Images
- 🛒 Smooth Shopping Experience

### 💳 Payment Features
- 💰 Razorpay Payment Gateway
- ✅ Secure Payment Verification
- 📄 Automatic Order Creation

### 🛠️ Admin Features
- 📊 Dashboard Analytics
- 👥 Manage Users
- 📦 Manage Products
- 📝 Update Orders
- ➕ Add/Edit/Delete Products
- 📈 Revenue Statistics

### ☁️ File Uploads
- ☁️ Cloudinary Image Upload
- 🔒 Secure Image Storage
- ⚡ Fast Image Delivery

### 🌱 Database Seeding
- 👥 Seed Users
- 📦 Seed Products
- 🛒 Seed Orders

---

# 🛠️ Tech Stack

## 🎨 Frontend
- ⚛️ React
- 🛣️ React Router
- 🗂️ Redux Toolkit
- 🎨 Tailwind CSS
- 📜 React Scripts

## ⚙️ Backend
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 🧩 Mongoose
- 🔐 JWT Authentication
- 🔒 bcrypt Password Hashing

## 🌐 Third-Party Services
- ☁️ Cloudinary
- 💳 Razorpay
- 📧 Nodemailer

---

# ⚙️ How It Works

### 🔐 Authentication Flow

1. 👤 User Registers
2. 📧 OTP Sent via Email
3. ✅ OTP Verification
4. 🔑 JWT Generated
5. 🛡️ Protected Routes Accessible using:

```http
Authorization: Bearer <token>
```

---

### 📊 Admin Analytics

The admin dashboard fetches data from:

```http
GET /api/analytics
```

It displays:
- 👥 Total Users
- 📦 Total Products
- 🛒 Total Orders
- 💰 Total Revenue

---

### 💳 Payment Flow

1. 🛒 User Places Order
2. 💳 Razorpay Payment Opens
3. ✅ Payment Verification
4. 📦 Order Stored in Database

---

### ☁️ Image Upload Flow

Admin uploads product image →

📤 Cloudinary →

🔗 Secure Image URL →

💾 MongoDB →

🖼️ Displayed on Website

---

# 📁 Project Structure

## 🔹 Backend

- 📄 `backend/index.js` → Express Server
- 🌱 `backend/seed.js` → Database Seeder

## 🔹 Frontend

- 📊 `frontend/src/admin/AdminDashboard.jsx` → Admin Dashboard
- 🛒 Redux Store
- ⚛️ React Components
- 🎨 Tailwind UI

---

# 📚 Key Learnings

## ☁️ Cloudinary Integration
- 📤 Upload images directly from the admin panel.
- 🔗 Store secure image URLs.
- ⚡ Efficient image delivery.

---

## 💳 Razorpay Integration
- Implemented complete client-server payment flow.
- Verified payments securely.
- Automatically created orders after successful payment.

---

## 🗂️ Redux Toolkit
- Learned Redux from official documentation.
- Managed global cart state efficiently.
- Persisted cart items.
- Calculated derived states like cart totals.

---

## 🔐 Authentication & Security
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Admin Middleware

---

## 📧 Email Verification
- Built OTP Verification using Nodemailer.
- Stored hashed OTPs securely.
- Added verification before allowing login.

---

# 🚀 Future Improvements

- 🔍 Product Search
- 📄 Pagination
- ⭐ Product Reviews
- ❤️ Wishlist Feature
- 📱 Better Mobile Responsiveness
- 📈 Advanced Analytics
- 🧪 Unit & Integration Testing
- 🐳 Docker Support
- ⚙️ CI/CD Pipeline
- 📝 Audit Logs for Admin Actions

---

# 👩‍💻 Built By

### **Manabika Das**

---
