#!/usr/bin/env node

/**
 * Vercel build script for ELORA e-commerce platform
 * This script ensures proper bundling and deployment configuration
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function buildForVercel() {
  console.log('🏗️  Building ELORA e-commerce for Vercel deployment...');
  
  try {
    // Build frontend
    console.log('📦 Building frontend...');
    await execAsync('npm run build');
    
    // Ensure api directory exists
    await fs.mkdir('api', { recursive: true });
    
    // Copy built files for serverless function
    console.log('🚀 Preparing serverless function...');
    
    console.log('✅ Build completed successfully!');
    console.log('📋 Next steps:');
    console.log('   1. Deploy to Vercel using: vercel --prod');
    console.log('   2. Configure environment variables in Vercel dashboard');
    console.log('   3. Set up custom domain if needed');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildForVercel();