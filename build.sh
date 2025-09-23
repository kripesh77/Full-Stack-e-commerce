#!/bin/bash
# Build script for Sevalla deployment

echo "Starting deployment build..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install --production

# Install frontend dependencies and build
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Build frontend for production
echo "Building frontend..."
npm run build

echo "Build completed successfully!"