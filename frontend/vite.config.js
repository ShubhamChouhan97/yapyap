import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this is correct for Render
  build: {
    outDir: 'dist', // Ensure this matches your deployment folder
    assetsDir: 'assets',
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
  },
  server: {
    host: true,
    port: process.env.PORT || 3000,
    allowedHosts: ['wfront.onrender.com'],
  },
});
