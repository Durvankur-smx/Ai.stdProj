import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import app from './backend/src/app';
import sequelize from './backend/src/config/database';

// Configuration
const PORT = process.env.PORT || 8080;
const isPreview = process.env.AI_STUDIO_PREVIEW === 'true' || process.env.NODE_ENV !== 'production';

async function startServer() {
  console.log(`🚀 Starting server in ${isPreview ? 'PREVIEW' : 'PRODUCTION'} mode...`);

  // 1. Database Initialization (Conditional)
  if (!isPreview) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected.');
      await sequelize.sync();
    } catch (error) {
      console.error('❌ Database connection failed. Skipping sync for stability.');
    }
  } else {
    console.log('ℹ️ Skipping Database sync (Preview Mode).');
  }

  // 2. Health Check (Required for Cloud Run / AI Studio)
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      mode: isPreview ? 'preview' : 'production',
      timestamp: new Date().toISOString() 
    });
  });

  // 3. Frontend Serving Logic
  if (process.env.NODE_ENV !== 'production') {
    // In development/preview, we use Vite middleware ONLY if explicitly requested
    // Otherwise, we recommend running 'npm run dev' which uses the vite CLI
    if (!isPreview) {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  } else {
    // Production: Serve static assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // 4. Start Listening
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`✨ Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('🔥 Critical server failure:', err);
  process.exit(1);
});
