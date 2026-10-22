import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
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

// Fallback for unmatched API routes (Express 5 compatible)
app.use('/api', (req, res) => {
  res.status(404).json({
    error: `API route not found: ${req.method} ${req.originalUrl}`,
    status: 404
  });
});

// SPA fallback for client-side routing (Express 5 compatible catch-all)
app.use((req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>PrashWeb Server</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
          .card { background: #1e293b; padding: 2.5rem; border-radius: 1rem; border: 1px solid #334155; max-width: 500px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
          h1 { color: #38bdf8; margin-top: 0; }
          p { color: #94a3b8; line-height: 1.6; }
          code { background: #0f172a; color: #a5f3fc; padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
          a { color: #38bdf8; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 PrashWeb Backend is Running!</h1>
          <p>Frontend assets are not yet compiled in <code>dist/</code>. Run <code>npm run build</code> to compile the frontend application.</p>
          <p><a href="/api/health">Check API Health Status &rarr;</a></p>
        </div>
      </body>
    </html>
  `);
});

// Connect to MongoDB Atlas and start server
async function startServer() {
  console.log('[PrashWeb] Initializing cloud backend services...');

  // Start HTTP server immediately so Render detects open port without delay
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(` PrashWeb Server is Running!`);
    console.log(` Port:    ${PORT}`);
    console.log(` Bound:   0.0.0.0:${PORT} (Render compatible)`);
    console.log(` Mode:    ${process.env.NODE_ENV || 'production'}`);
    console.log(` Local:   http://localhost:${PORT}`);
    console.log(` Health:  http://localhost:${PORT}/api/health`);
    console.log(`===============================================`);
  });

  // Connect to MongoDB in parallel
  connectDB().catch(err => {
    console.error('[MongoDB Atlas] Background connection warning:', err.message);
  });

  // Graceful shutdown
  const handleShutdown = (signal) => {
    console.log(`[PrashWeb] Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('[PrashWeb] Closed out remaining connections.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer();
