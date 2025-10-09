import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    dedupe: ['react', 'react-dom'],        // force same copy
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],       // prebundle same pair
  },
});
