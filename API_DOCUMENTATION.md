# E-commerce API Documentation

Base URL: `http://localhost:5000`

## 📋 Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Sellers](#sellers)
- [Products](#products)
- [Cart](#cart)
- [Orders](#orders)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

### Headers Required for Protected Routes

```javascript
{
  "token": "your-jwt-token-here"
}
```

### Token Storage (Frontend)

```javascript
// Store token after login
localStorage.setItem("userToken", response.data.token);

// Use in API calls
const token = localStorage.getItem("userToken");
fetch("/api/endpoint", {
  headers: {
    token: token,
    "Content-Type": "application/json",
  },
});
```

---

## 👤 Users

### Register User

**POST** `/user/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "64f7b8c9e1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**

```json
{
  "error": "User already exists"
}
```

---

### Login User

**POST** `/user/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f7b8c9e1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Invalid credentials"
}
```

---

## 🏪 Sellers

### Register Seller

**POST** `/seller/register`

**Request Body:**

```json
{
  "name": "Amazing Store",
  "email": "store@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**

```json
{
  "message": "Seller registered successfully",
  "seller": {
    "_id": "64f7b8c9e1234567890abcdf",
    "name": "Amazing Store",
    "email": "store@example.com"
  }
}
```

---

### Login Seller

**POST** `/seller/login`

**Request Body:**

```json
{
  "email": "store@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "seller": {
    "_id": "64f7b8c9e1234567890abcdf",
    "name": "Amazing Store",
    "email": "store@example.com"
  }
}
```

---

## 📦 Products

### Get All Products

**GET** `/product`

**Query Parameters (Optional):**

- `category` - Filter by category
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:** `/product?category=electronics&page=1&limit=12`

**Success Response (200):**

```json
{
  "products": [
    {
      "_id": "64f7b8c9e1234567890abce0",
      "name": "iPhone 15",
      "description": "Latest smartphone with amazing features",
      "price": 999,
      "imageUrl": "https://example.com/iphone15.jpg",
      "stock": 50,
      "category": "electronics",
      "creatorId": "64f7b8c9e1234567890abcdf",
      "createdAt": "2024-08-02T10:30:00.000Z"
    }
  ],
  "totalProducts": 1,
  "currentPage": 1
}
```

---

### Get Single Product

**GET** `/product/:id`

**Success Response (200):**

```json
{
  "_id": "64f7b8c9e1234567890abce0",
  "name": "iPhone 15",
  "description": "Latest smartphone with amazing features",
  "price": 999,
  "imageUrl": "https://example.com/iphone15.jpg",
  "stock": 50,
  "category": "electronics",
  "creatorId": "64f7b8c9e1234567890abcdf",
  "createdAt": "2024-08-02T10:30:00.000Z"
}
```

**Error Response (404):**

```json
{
  "error": "Product not found"
}
```

---

### Create Product (Seller Only)

**POST** `/product`

**Headers Required:**

```javascript
{
  "token": "seller-jwt-token",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "name": "iPhone 15",
  "description": "Latest smartphone with amazing features",
  "price": 999,
  "imageUrl": "https://example.com/iphone15.jpg",
  "stock": 50,
  "category": "electronics"
}
```

**Success Response (201):**

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "64f7b8c9e1234567890abce0",
    "name": "iPhone 15",
    "description": "Latest smartphone with amazing features",
    "price": 999,
    "imageUrl": "https://example.com/iphone15.jpg",
    "stock": 50,
    "category": "electronics",
    "creatorId": "64f7b8c9e1234567890abcdf",
    "createdAt": "2024-08-02T10:30:00.000Z"
  }
}
```

---

### Update Product (Seller Only)

**PUT** `/product/:id`

**Headers Required:**

```javascript
{
  "token": "seller-jwt-token",
  "Content-Type": "application/json"
}
```

**Request Body (Partial Update):**

```json
{
  "price": 899,
  "stock": 45
}
```

**Success Response (200):**

```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "64f7b8c9e1234567890abce0",
    "name": "iPhone 15",
    "description": "Latest smartphone with amazing features",
    "price": 899,
    "imageUrl": "https://example.com/iphone15.jpg",
    "stock": 45,
    "category": "electronics",
    "creatorId": "64f7b8c9e1234567890abcdf"
  }
}
```

---

### Delete Product (Seller Only)

**DELETE** `/product/:id`

**Headers Required:**

```javascript
{
  "token": "seller-jwt-token"
}
```

**Success Response (200):**

```json
{
  "message": "Product deleted successfully"
}
```

---

## 🛒 Cart

### Get User's Cart

**GET** `/cart`

**Headers Required:**

```javascript
{
  "token": "user-jwt-token"
}
```

**Success Response (200):**

```json
{
  "cart": {
    "_id": "64f7b8c9e1234567890abce1",
    "creatorId": "64f7b8c9e1234567890abcde",
    "products": [
      {
        "productId": {
          "_id": "64f7b8c9e1234567890abce0",
          "name": "iPhone 15",
          "price": 999,
          "imageUrl": "https://example.com/iphone15.jpg"
        },
        "quantity": 2,
        "_id": "64f7b8c9e1234567890abce2"
      }
    ],
    "createdAt": "2024-08-02T10:30:00.000Z"
  },
  "totalItems": 2,
  "totalPrice": 1998
}
```

**Empty Cart Response (200):**

```json
{
  "cart": null,
  "totalItems": 0,
  "totalPrice": 0
}
```

---

### Add Item to Cart

**POST** `/cart`

**Headers Required:**

```javascript
{
  "token": "user-jwt-token",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "productId": "64f7b8c9e1234567890abce0",
  "quantity": 2
}
```

**Success Response (200):**

```json
{
  "message": "Product added to cart",
  "cart": {
    "_id": "64f7b8c9e1234567890abce1",
    "creatorId": "64f7b8c9e1234567890abcde",
    "products": [
      {
        "productId": "64f7b8c9e1234567890abce0",
        "quantity": 2,
        "_id": "64f7b8c9e1234567890abce2"
      }
    ]
  }
}
```

---

### Update Cart Item Quantity

**PUT** `/cart`

**Headers Required:**

```javascript
{
  "token": "user-jwt-token",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "productId": "64f7b8c9e1234567890abce0",
  "quantity": 3
}
```

**Success Response (200):**

```json
{
  "message": "Cart updated successfully",
  "cart": {
    "_id": "64f7b8c9e1234567890abce1",
    "products": [
      {
        "productId": "64f7b8c9e1234567890abce0",
        "quantity": 3,
        "_id": "64f7b8c9e1234567890abce2"
      }
    ]
  }
}
```

---

### Remove Item from Cart

**DELETE** `/cart/:productId`

**Headers Required:**

```javascript
{
  "token": "user-jwt-token"
}
```

**Success Response (200):**

```json
{
  "message": "Product removed from cart",
  "cart": {
    "_id": "64f7b8c9e1234567890abce1",
    "products": []
  }
}
```

---

## 📝 Orders

### Create Order (Checkout)

**POST** `/order`

**Headers Required:**

```javascript
{
  "token": "user-jwt-token"
}
```

**Success Response (201):**

```json
{
  "order": {
    "_id": "64f7b8c9e1234567890abce3",
    "userId": "64f7b8c9e1234567890abcde",
    "products": [
      {
        "productId": "64f7b8c9e1234567890abce0",
        "quantity": 2
      }
    ],
    "totalPrice": 1998,
    "status": "pending",
    "publicToken": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4",
    "createdAt": "2024-08-02T10:30:00.000Z"
  },
  "publicToken": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4"
}
```

**Error Response (400):**

```json
{
  "error": "Cart is empty or not found"
}
```

---

### Track Order (Public - No Auth Required)

**GET** `/order/track/:token`

**Example:** `/order/track/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4`

**Success Response (200):**

```json
{
  "order": {
    "_id": "64f7b8c9e1234567890abce3",
    "products": [
      {
        "productId": {
          "_id": "64f7b8c9e1234567890abce0",
          "name": "iPhone 15",
          "price": 999,
          "imageUrl": "https://example.com/iphone15.jpg"
        },
        "quantity": 2
      }
    ],
    "totalPrice": 1998,
    "status": "pending",
    "publicToken": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4",
    "createdAt": "2024-08-02T10:30:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "error": "Order not found"
}
```

---

## ⚠️ Error Handling

### Common Error Status Codes

| Status Code | Description           | Common Causes                                 |
| ----------- | --------------------- | --------------------------------------------- |
| `400`       | Bad Request           | Invalid request body, missing required fields |
| `401`       | Unauthorized          | Missing or invalid token, wrong credentials   |
| `403`       | Forbidden             | Valid token but insufficient permissions      |
| `404`       | Not Found             | Resource doesn't exist                        |
| `409`       | Conflict              | Duplicate email, username already exists      |
| `429`       | Too Many Requests     | Rate limit exceeded                           |
| `500`       | Internal Server Error | Server-side error                             |

### Error Response Format

```json
{
  "error": "Descriptive error message",
  "details": "Additional error details (development only)"
}
```

---

## 🚦 Rate Limiting

### General API Endpoints

- **Limit**: 100 requests per 15 minutes per IP
- **Response when exceeded**:

```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

### Authentication Endpoints

- **Stricter limits** applied to login/register endpoints
- **Headers included**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## 🔧 Frontend Integration Examples

### React API Service Example

```javascript
// api.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem("userToken");

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { token }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    return this.request("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name, email, password) {
    return this.request("/user/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Product methods
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/product?${queryString}`);
  }

  async getProduct(id) {
    return this.request(`/product/${id}`);
  }

  // Cart methods
  async getCart() {
    return this.request("/cart");
  }

  async addToCart(productId, quantity) {
    return this.request("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(productId, quantity) {
    return this.request("/cart", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(productId) {
    return this.request(`/cart/${productId}`, {
      method: "DELETE",
    });
  }

  // Order methods
  async createOrder() {
    return this.request("/order", {
      method: "POST",
    });
  }

  async trackOrder(token) {
    return this.request(`/order/track/${token}`);
  }
}

export default new ApiService();
```

### React Hook Example

```javascript
// hooks/useAuth.js
import { useState, useContext, createContext } from "react";
import ApiService from "../api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await ApiService.login(email, password);
      localStorage.setItem("userToken", response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

## 📱 Frontend Pages to Build

### Required Pages

1. **Home/Landing** - Product showcase
2. **Products** - Product listing with filters
3. **Product Detail** - Single product view
4. **Login/Register** - Authentication forms
5. **Cart** - Shopping cart management
6. **Checkout** - Order creation
7. **Order Confirmation** - Show order token
8. **Order Tracking** - Public order lookup
9. **User Dashboard** - User profile and orders

### Optional Pages

10. **Seller Dashboard** - Product management (if implementing seller features)
11. **About** - Company information
12. **Contact** - Contact form

---

This documentation should give you everything you need to build a complete frontend! Let me know if you need clarification on any endpoint or want additional examples. 🚀
