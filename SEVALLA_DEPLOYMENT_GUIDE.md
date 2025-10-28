# Sevalla Deployment Guide

This guide will help you deploy your full-stack e-commerce application to Sevalla platform.

## Architecture Overview

Your application consists of:
- **Backend**: Node.js/Express API (port 5000 locally)
- **Frontend**: React/Vite application (Vite build)
- **Database**: MongoDB

## Deployment Strategy

Sevalla will host:
1. **Backend Application** - Node.js app from GitHub
2. **Frontend Static Site** - Built React app (deployed separately as static site)
3. **MongoDB Database** - Create a managed MongoDB database OR use external MongoDB Atlas

> **Note**: Sevalla doesn't currently support MongoDB in their managed database offerings (only PostgreSQL, MySQL, MariaDB, Redis, Valkey). You have two options:
> - Use MongoDB Atlas (external connection)
> - Deploy MongoDB using a Dockerfile on Sevalla Application Hosting with persistent storage

## Step-by-Step Deployment

### Option 1: Using MongoDB Atlas (Recommended)

#### 1. Set Up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`)
4. Whitelist all IP addresses (0.0.0.0/0) for Sevalla to connect

#### 2. Deploy Backend Application

1. **Log in to Sevalla** at https://app.sevalla.com/
2. Click **Applications > Add application**
3. **Choose Git Repository**:
   - Select **GitHub** and connect your account
   - Select repository: `kripesh77/Full-Stack-e-commerce`
   - Branch: `main`
   - **Automatic deployment on commit**: Enable (optional)

4. **Configure Application**:
   - **Name**: `ecommerce-backend` (or any name)
   - **Location**: Choose nearest data center to your users
   - **Resources**: Start with **Hobby (H1)** for testing (free tier if available)

5. **Build Detection**:
   - Sevalla will auto-detect Node.js
   - It will read `package.json` and use `npm start` as start command

6. **IMPORTANT - Configure Root Path**:
   - Since your backend is in a subdirectory, you need to configure the root path
   - After creating the app, go to **Settings > Build**
   - Set **Root directory**: `backend`

7. **Add Environment Variables** (Applications > your-app > Environment variables):
   ```bash
   # Database Configuration
   MY_DATABASE_LINK=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   
   # JWT Secret (Generate a strong random string)
   JWT_SECRET=your-production-jwt-secret-key-min-32-chars
   
   # Environment
   NODE_ENV=production
   
   # eSewa Payment Gateway (For Production)
   ESEWA_PRODUCT_CODE=your-production-code
   ESEWA_SECRET_KEY=your-production-secret
   ESEWA_PAYMENT_URL=https://epay.esewa.com.np/api/epay/main/v2/form
   ESEWA_STATUS_CHECK_URL=https://epay.esewa.com.np/api/epay/transaction/status
   
   # CORS Origins (will be updated after frontend deployment)
   CORS_ORIGIN=https://your-frontend-url.sevalla.app
   
   # URLs
   BACKEND_URL=https://your-backend-url.sevalla.app
   FRONTEND_URL=https://your-frontend-url.sevalla.app
   ```
   
   **Important**: 
   - Check both "Runtime" and "Build process" for all variables
   - Replace MongoDB credentials with your actual Atlas credentials
   - Update URLs after deployment

8. **Update Backend Start Command**:
   - Go to **Processes > Web Process > Update process**
   - Change start command from `npm start` to: `node server.js`
   - Set **Healthcheck path**: `/` (or create a health endpoint like `/api/health`)

9. **Deploy**:
   - Click **Deployments > Deploy now**
   - Wait for build to complete
   - Note your backend URL (e.g., `https://ecommerce-backend-abc123.sevalla.app`)

#### 3. Deploy Frontend Static Site

1. **Update Frontend Environment**:
   - Before deploying, you need to configure your frontend to point to the Sevalla backend URL
   - Check if you have a `.env` file or API configuration in frontend
   - Update API base URL to point to your Sevalla backend URL

2. **In Sevalla Dashboard**:
   - Click **Static Sites > Add static site**
   
3. **Choose Git Repository**:
   - Select **GitHub**
   - Repository: `kripesh77/Full-Stack-e-commerce`
   - Branch: `main`

4. **Configure Static Site**:
   - **Name**: `ecommerce-frontend`
   - **Location**: Same as backend (recommended)
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Output directory**: `dist` (Vite default)

5. **Add Environment Variables** (if your frontend uses them):
   ```bash
   VITE_API_URL=https://your-backend-url.sevalla.app
   ```
   - Check "Build process" for these variables

6. **Deploy**:
   - Click **Create & deploy**
   - Wait for build to complete
   - Note your frontend URL (e.g., `https://ecommerce-frontend-xyz789.sevalla.app`)

#### 4. Update CORS and URLs

1. **Update Backend Environment Variables**:
   - Go to backend app: **Applications > ecommerce-backend > Environment variables**
   - Update:
     ```bash
     CORS_ORIGIN=https://ecommerce-frontend-xyz789.sevalla.app
     FRONTEND_URL=https://ecommerce-frontend-xyz789.sevalla.app
     BACKEND_URL=https://ecommerce-backend-abc123.sevalla.app
     ```
   - Click **Save**
   - Go to **Deployments > Deploy now** to apply changes

2. **Update Frontend API URL** (if needed):
   - If your frontend hardcodes API URLs, update them in your code
   - Push changes to GitHub (will auto-deploy if you enabled automatic deployments)

#### 5. Test Your Application

1. Visit your frontend URL
2. Test authentication
3. Test product browsing
4. Test cart functionality
5. Test eSewa payment integration

### Option 2: Using MongoDB on Sevalla (Advanced)

If you want to host MongoDB on Sevalla:

1. Create a separate application for MongoDB using Dockerfile
2. Use persistent storage for MongoDB data
3. Create internal connection between MongoDB and backend
4. This is more complex and not recommended for beginners

## Required Backend Code Changes

Before deploying, ensure your backend code is production-ready:

### 1. Update `server.js` to use PORT environment variable:

```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

> **Important**: Sevalla automatically sets the `PORT` environment variable. Your app MUST listen on `process.env.PORT`.

### 2. Update CORS Configuration in `app.js`:

```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
```

### 3. Ensure Production Build Script:

Update `backend/package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Required Frontend Code Changes

### 1. API Base URL Configuration:

Create `frontend/src/config.js`:
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Update all your API calls to use this base URL.

### 2. Update Vite Config (if needed):

`frontend/vite.config.js`:
```javascript
export default defineConfig({
  // ... existing config
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
  }
});
```

## Scaling and Performance

### Backend Scaling:
- Start with **Hobby (H1)** pod: Free tier (if available)
- Upgrade to **S1** (0.5 CPU / 1GB RAM) for production
- Enable **Horizontal Autoscaling** if traffic increases (requires paid plan)

### Frontend:
- Static sites are FREE on Sevalla
- Automatically scales with CDN

### Database:
- MongoDB Atlas free tier: 512MB storage
- Upgrade as needed for production

## Monitoring and Debugging

1. **View Logs**:
   - Applications > your-app > **Logs**
   - Check runtime logs for errors

2. **Check Build Status**:
   - Applications > your-app > **Deployments**
   - View build logs if deployment fails

3. **Resource Usage**:
   - Applications > your-app > **Analytics**
   - Monitor CPU, RAM, bandwidth

## Troubleshooting

### Build Fails
- Check **Deployments > Build logs**
- Ensure `package.json` has correct scripts
- Verify root directory is set to `backend` or `frontend`

### Cannot Connect to Database
- Verify MongoDB Atlas connection string
- Check if IP whitelist includes 0.0.0.0/0
- Verify environment variables are set correctly

### CORS Errors
- Ensure `CORS_ORIGIN` environment variable matches frontend URL
- Redeploy backend after updating environment variables

### Application Crashes
- Check **Logs** for error messages
- Ensure `NODE_ENV=production`
- Verify all required environment variables are set

## Cost Estimation

### Sevalla Pricing (Approximate):
- **Frontend Static Site**: FREE
- **Backend Hobby Pod**: FREE or ~$5/month
- **Backend S1 Pod** (0.5 CPU / 1GB): ~$12/month
- **Bandwidth**: $0.10/GB (egress only)
- **Build Time**: Included

### MongoDB Atlas:
- **Free Tier**: $0 (512MB)
- **Shared**: $9/month (2-5GB)
- **Dedicated**: $57+/month

## Custom Domain (Optional)

1. **Add Custom Domain**:
   - Applications > your-app > **Domains**
   - Add your domain
   - Update DNS records as instructed

2. **SSL Certificate**:
   - Automatically provided by Sevalla (free)

## Continuous Deployment

Enable automatic deployments:
- Applications > your-app > **Settings > Repository**
- Enable "Automatic deployment on commit"
- Every push to `main` branch will auto-deploy

## Security Checklist

- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Use production eSewa credentials
- [ ] Set NODE_ENV=production
- [ ] Whitelist only necessary IPs for MongoDB
- [ ] Never commit .env files
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic with Sevalla)

## Next Steps After Deployment

1. Test all functionality thoroughly
2. Monitor logs for errors
3. Set up error tracking (e.g., Sentry)
4. Configure custom domain
5. Set up monitoring/alerts
6. Document your deployment for team members

## Support

- **Sevalla Docs**: https://docs.sevalla.com/
- **Sevalla Discord**: https://discord.gg/sevalla
- **MongoDB Atlas Support**: https://www.mongodb.com/support

---

## Quick Commands Reference

### Backend Deployment:
```bash
# Ensure you're on main branch
git status
git branch

# Push latest code
git push origin main

# Sevalla will auto-deploy if enabled
```

### Frontend Deployment:
```bash
# Test build locally first
cd frontend
npm run build

# Push to GitHub
git add .
git commit -m "Update frontend for production"
git push origin main
```

### Update Environment Variables:
1. Go to Sevalla dashboard
2. Applications > your-app > Environment variables
3. Update variables
4. Deployments > Deploy now

---

**Last Updated**: October 28, 2025
