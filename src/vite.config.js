import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [viteCompression(),react(), imagetools(),],

  build: {
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth'],
          ui: ['./utilis/DashboardLayout', './components/Hero'],
        }
      },

      external: ['firebase'] // Optional – only if you're handling Firebase separately
    }
  }
});
