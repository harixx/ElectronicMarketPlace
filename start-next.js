#!/usr/bin/env node
import { spawn } from 'child_process';

// Start Next.js development server
const nextProcess = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
});

process.on('SIGTERM', () => {
  nextProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  nextProcess.kill('SIGINT');
});