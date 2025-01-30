import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';
import webconfig from './config';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  clearScreen: true,
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/auth/token/generate': {
        target: `http://localhost:${webconfig.serverport}/auth/token/generate`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth\/token\/generate/, ''),
      },
      '/api': {
        target: `http://localhost:${webconfig.serverport}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})