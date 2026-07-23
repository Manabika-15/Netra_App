# 👓 NETRA

> NETRA is a full-stack e-commerce web application for eyewear that provides a smooth shopping experience for sunglasses, eyeglasses, contact lenses, and accessories. It includes secure authentication, payments, an admin dashboard, analytics, and more.

## 🔗 Live Demo

👉 **Live Website:** https://netra-app-tps8.onrender.com


## 🚀 Project Overview

NETRA is a complete MERN Stack e-commerce platform designed for eyewear shopping.

- Product browsing for sunglasses, eyeglasses, contact lenses, and accessories
- User accounts with email verification OTP and JWT authentication
- Cart, checkout, and order management
- Admin tools for users, products, orders, and analytics
- Image uploads through Cloudinary and secure payment handling with Razorpay

## ✨ Features

### 👤 User Features
- Secure registration and login
- Email OTP verification
- JWT-based authentication and profile management
- Add, update, and remove cart items
- Secure checkout and order history

### 🛍️ Product Features
- Product categories and product detail pages
- Stock management and product images
- Smooth shopping experience

### 💳 Payment Features
- Razorpay payment gateway integration
- Secure payment verification
- Automatic order creation after successful payment

### 🛠️ Admin Features
- Dashboard analytics
- Manage users, products, and orders
- Add, edit, and delete products
- View revenue statistics

### ☁️ File Uploads
- Cloudinary image upload
- Secure image storage
- Fast image delivery

### 🌱 Database Seeding
- Seed users, products, and orders

## 🛠️ Tech Stack

### 🎨 Frontend
- React
- React Router
- Redux Toolkit
- Tailwind CSS
- React Scripts

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing

### 🌐 Third-Party Services
- Cloudinary
- Razorpay
- Nodemailer

## ⚙️ How It Works

### 🔐 Authentication Flow
1. User registers
2. Email OTP is sent
3. OTP is verified
4. JWT is issued
5. Protected routes are accessed using the Authorization header

### 📊 Admin Analytics
The admin dashboard fetches analytics from the protected admin API and displays totals for users, products, orders, and revenue.

### 💳 Payment Flow
1. User places an order
2. Razorpay payment opens
3. Payment is verified
4. Order is stored in the database

### ☁️ Image Upload Flow
Admin uploads product images → Cloudinary stores them → a secure URL is saved in MongoDB → the image appears on the website.

## 📁 Project Structure

### 🔹 Backend
- backend/index.js — Express server entry point
- backend/seed.js — database seeding

### 🔹 Frontend
- frontend/src/admin/AdminDashboard.jsx — admin analytics dashboard
- frontend/src — React components and Redux store

## 📚 Key Learnings
- Cloudinary integration for image uploads
- Razorpay integration for secure payments
- Redux Toolkit for global cart state
- Authentication and security with JWT and bcrypt
- Email verification using Nodemailer

## 🚀 Future Improvements
- Product search
- Pagination
- Product reviews
- Wishlist feature
- Better mobile responsiveness
- Advanced analytics
- Testing and CI/CD
- Docker support

## 👩‍💻 Built By

Manabika Das
