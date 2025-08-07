# Full-Stack E-commerce Site

A modern, full-stack e-commerce application built with Node.js/Express backend and React frontend. This project implements a complete online shopping experience with user authentication, product management, shopping cart functionality, and secure order processing.

## 🚀 Project Status

- ✅ **Backend**: Fully implemented and functional
- 🚧 **Frontend**: Work in progress

## 🛠️ Tech Stack

### Backend

- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-rate-limit** for API protection
- **crypto** for secure token generation

### Frontend (In Development)

- **React** with Vite build tool
- **React Router** for SPA navigation
- **Environment-based configuration**

## 📋 Features Implemented

### Backend Features ✅

#### User Management

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected user routes

#### Seller Management

- Seller registration and login
- Separate seller authentication system
- Product creation and management by sellers

#### Product Management

- CRUD operations for products
- Product categorization
- Stock management
- Image URL support
- Product validation middleware

#### Shopping Cart

- Add/remove products from cart
- Quantity management
- Cart persistence per user
- Automatic cart cleanup after order

#### Order System

- Complete order processing
- **Public order tracking** with secure tokens
- Order status management (pending, shipped, delivered)
- Guest order tracking (no authentication required)
- Random token generation for order privacy

#### Security & Performance

- Rate limiting for API endpoints
- Separate rate limiters for auth and general endpoints
- Input validation middleware
- Protected routes with authentication

### Frontend Features 🚧 (In Development)

- Modern responsive layout with ECOM branding
- Product browsing and search
- User authentication flows
- Shopping cart interface
- Order placement and tracking
- Public order tracking with tokens

## 🗂️ Project Structure

```
├── backend/
│   ├── middleware/
│   │   ├── rate-limiter/
│   │   │   ├── authLimiter.js
│   │   │   └── generalLimiter.js
│   │   ├── seller/
│   │   │   ├── AuthMiddleware.js
│   │   │   └── productInputValidation/
│   │   └── user/
│   │       └── AuthMiddleware.js
│   ├── models/
│   │   └── db.js
│   ├── routes/
│   │   ├── cart.js
│   │   ├── order.js
│   │   ├── product.js
│   │   ├── seller.js
│   │   └── user.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── AppLayout.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🔑 Key Backend APIs

### Authentication

- `POST /user/register` - User registration
- `POST /user/login` - User login
- `POST /seller/register` - Seller registration
- `POST /seller/login` - Seller login

### Products

- `GET /product` - Get all products
- `POST /product` - Create product (seller only)
- `PUT /product/:id` - Update product (seller only)
- `DELETE /product/:id` - Delete product (seller only)

### Cart

- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart` - Update cart item quantity
- `DELETE /cart/:productId` - Remove item from cart

### Orders

- `POST /order` - Create order (returns tracking token)
- `GET /order/track/:token` - **Public order tracking** (no auth required)

## 🔒 Security Features

### Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Authentication endpoints**: Stricter limits for security
- IP-based rate limiting with informative error messages

### Order Privacy

- **Secure token-based tracking**: Each order gets a unique, random 48-character token
- **Guest-friendly**: Anyone with the token can track the order
- **No sensitive data exposure**: Public tracking hides user information

### Authentication

- JWT tokens for session management
- Password hashing with bcrypt
- Protected routes requiring valid authentication
- Separate auth systems for users and sellers

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secure-jwt-secret-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup (When Ready)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 Upcoming Frontend Features

- [ ] User registration and login forms
- [ ] Product catalog with search and filtering
- [ ] Product detail pages
- [ ] Shopping cart interface
- [ ] Checkout process
- [ ] Order confirmation and tracking
- [ ] User dashboard
- [ ] Seller dashboard (if implemented)
- [ ] Responsive mobile design
- [ ] Payment integration (future)

## 🤝 Contributing

This is a learning project. Feel free to explore the code, suggest improvements, or contribute new features!

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Note**: The frontend is currently under development. The backend is fully functional and ready for integration with any frontend framework or for API testing with tools like Postman or Insomnia.
