#!/bin/bash

# Kill any existing processes
pkill -f "next" 2>/dev/null || true

# Set environment variables
export NODE_ENV=development
export PORT=3000

# Start Next.js development server
echo "Starting ELORA e-commerce platform..."
echo "Database URL: $DATABASE_URL"
cd /home/runner/workspace

# Generate Prisma client
npx prisma generate

# Start the application
npx next dev --port 3000