# Full-Stack E-Commerce Application

A modern e-commerce platform built with MERN stack (MongoDB, Express.js, React, Node.js) featuring eSewa payment integration.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication
- **Product Management**: Browse products with pagination
- **Shopping Cart**: Add, remove, and manage cart items
- **Payment Integration**: eSewa payment gateway integration
- **Responsive Design**: Mobile-friendly interface
- **Lazy Loading**: Optimized performance with code splitting
- **Real-time Updates**: React Query for efficient data fetching

## 📁 Project Structure

```
Full-Stack-ecommerce-site/
├── backend/                 # Express.js backend
│   ├── controller/         # Route controllers
│   ├── model/             # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── app.js            # Express app configuration
│   └── server.js         # Server entry point
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── features/     # Feature-based modules
│   │   ├── pages/        # Page components
│   │   ├── styles/       # SCSS styles (7-1 architecture)
│   │   ├── utils/        # API utilities
│   │   └── App.jsx       # Main app component
│   └── dist/             # Production build (generated)
│
└── docs/                  # Documentation
    ├── SEVALLA_UNIFIED_DEPLOYMENT.md
    └── SEVALLA_DEPLOYMENT_GUIDE.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Rate Limit** - Rate limiting

### Frontend
- **React 19** - UI framework
- **React Router v7** - Routing
- **TanStack Query** - Data fetching
- **Vite** - Build tool
- **SCSS** - Styling
- **GSAP** - Animations
- **React Hook Form** - Form handling

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB or MongoDB Atlas account
- npm or yarn

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/kripesh77/Full-Stack-e-commerce.git
cd Full-Stack-ecommerce-site
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install

# Create .env file (optional)
cp .env.example .env
```

4. **Start Development Servers**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🌐 Deployment

### Deploy to Sevalla (Recommended - Unified Deployment)

See detailed guide: [SEVALLA_UNIFIED_DEPLOYMENT.md](./SEVALLA_UNIFIED_DEPLOYMENT.md)

**Quick Summary:**
1. Create MongoDB Atlas cluster
2. Push code to GitHub
3. Create Sevalla application (root: `backend`)
4. Add environment variables
5. Deploy!

The backend serves both API and frontend static files in production.

### Alternative: Separate Deployment

See: [SEVALLA_DEPLOYMENT_GUIDE.md](./SEVALLA_DEPLOYMENT_GUIDE.md)

Deploy frontend and backend as separate applications.

## 🔧 Configuration

### Backend Environment Variables

```bash
# Database
MY_DATABASE_LINK=mongodb://localhost:27017/ecommerce

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key

# eSewa (Testing)
ESEWA_PRODUCT_CODE=EPAYTEST
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_PAYMENT_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
ESEWA_STATUS_CHECK_URL=https://rc.esewa.com.np/api/epay/transaction/status

# URLs
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables

```bash
VITE_API_URL=http://localhost:5000
```

## 📚 API Documentation

### Authentication
- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/signin` - Login user

### Products
- `GET /api/v1/products` - Get all products (paginated)
- `GET /api/v1/products/:id` - Get single product

### Cart
- `GET /api/v1/carts` - Get user cart
- `POST /api/v1/carts` - Add item to cart
- `PATCH /api/v1/carts/:id` - Update cart item
- `DELETE /api/v1/carts/:id` - Remove from cart

### Orders
- `POST /api/v1/orders/checkout` - Create order and initiate payment
- `GET /api/v1/orders/verify-payment` - Verify eSewa payment
- `GET /api/v1/orders/history` - Get order history
- `GET /api/v1/orders/status/:orderId` - Check payment status

## 🧪 Testing

### Test eSewa Payment (Development)

Use these test credentials:
- **Product Code**: EPAYTEST
- **Secret Key**: 8gBm/:&EnhH.1/q
- **Test Card**: Use eSewa's test environment

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Environment variables for sensitive data
- HTTPS in production (via Sevalla)

## 📈 Performance Optimizations

- **Lazy Loading**: Route-based code splitting
- **Image Lazy Loading**: Native lazy loading for images
- **Code Splitting**: Manual chunks for vendors
- **Minification**: Terser minification in production
- **SCSS Optimization**: 7-1 architecture
- **React Query**: Efficient data caching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Kripesh Ghimire**
- GitHub: [@kripesh77](https://github.com/kripesh77)

## 🙏 Acknowledgments

- eSewa Payment Gateway
- MongoDB Atlas
- Sevalla Hosting
- React & Vite communities

## 📞 Support

For deployment help, see:
- [Sevalla Unified Deployment Guide](./SEVALLA_UNIFIED_DEPLOYMENT.md)
- [Sevalla Separate Deployment Guide](./SEVALLA_DEPLOYMENT_GUIDE.md)
- [Sevalla Discord](https://discord.gg/sevalla)

---

**Happy Coding! 🚀**
