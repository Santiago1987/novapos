import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
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
          target: env.VITE_SERVER_URL_COLRYUT,
          changeOrigin: true,
          secure: false,
        },
        '/sales': {
          target: env.VITE_SERVER_URL_COLRYUT,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
