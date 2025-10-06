import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    dedupe: ['react', 'react-dom'], // force one copy (Vite-documented)
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // prebundle the same pair
  },
});
