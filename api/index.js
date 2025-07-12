// Vercel serverless function entry point
import express from 'express';
import { registerRoutes } from '../server/routes.js';

const app = express();

// Register all routes
await registerRoutes(app);

// Export the app for Vercel
export default app;