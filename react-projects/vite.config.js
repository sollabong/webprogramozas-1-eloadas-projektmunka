import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        react: 'react.html',
        // spa: 'spa.html',
        // axios: 'axios.html',
      },
    },
  },
});
