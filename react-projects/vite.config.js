import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '../',
  server: {
    open: '/index.html',
    fs: {
      allow: ['../'],
    },
  },
  build: {
    outDir: 'react-projects/dist',
    rollupOptions: {
      input: {
        react: 'react.html',
        spa: 'spa.html',
        axios: 'axios.html',
      },
    },
  },
});
