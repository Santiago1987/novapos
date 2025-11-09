import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
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
      },
    },
  },
});
