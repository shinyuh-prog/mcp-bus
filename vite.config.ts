import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import 'dotenv/config';
import {defineConfig, Plugin} from 'vite';

function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'api-server-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }
        try {
          const url = new URL(req.url, 'http://localhost');
          const pathname = url.pathname;
          if (pathname === '/api/health') {
            const { default: handler } = await import('./api/health.js');
            return handler(req, res);
          }
          if (pathname === '/api/bus-arrival' || pathname === '/api/busArrival') {
            const { default: handler } = await import('./api/bus-arrival.js');
            return handler(req, res);
          }
          next();
        } catch (err) {
          console.error('API middleware error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

