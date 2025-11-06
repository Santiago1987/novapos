import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://pos-srvrpcg.dvlp.local:57772',
        changeOrigin: true,
        secure: false,
      },
      '/sales': {
        target: 'http://pos-srvrpcg.dvlp.local:57772',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sales/, '/api'),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Inyectamos los headers EXACTOS que espera IRIS
            //const user = 'sdp';
            //const pass = 'dJ0cJq';
            const token = req.headers['sdp_token'];

            if (token) {
              proxyReq.setHeader('sdp_token', token);
            } else {
              console.warn('⚠️ No se envió token en x-auth-token');
            }
          });

          // Debug extra para errores del proxy
          proxy.on('error', (err) => {
            console.error('❌ Error en proxy Vite:', err);
          });

          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(
              '✅ Respuesta del backend IRIS:',
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
