#!/bin/bash

# Build script for Vercel deployment
echo "Building ELORA e-commerce platform..."

# Install dependencies
npm install

# Build frontend and backend
npm run build

echo "Build completed successfully!"