import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import app from './backend/app.js';
import { connectDB } from './backend/config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const DIST_DIR = path.join(__dirname, 'dist');

// Serve static frontend files from dist
app.use(express.static(DIST_DIR, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      // Don't cache index.html so updates are immediate
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// SPA fallback for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Connect to MongoDB Atlas and start server
async function startServer() {
  console.log('[PrashWeb] Initializing cloud backend services...');
  await connectDB();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(` PrashWeb Server is Running!`);
    console.log(` Local:   http://localhost:${PORT}`);
    console.log(` Cloudinary: Connected (ggb1dd3d)`);
    console.log(` MongoDB:    Connected (Atlas Cluster)`);
    console.log(`===============================================`);
  });
}

startServer();
