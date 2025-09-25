import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  optimizeDeps: {
    dedupe: ['react', 'react-dom'],
    include: ['react', 'react-dom'],
  },
  server: {
    port: 8080,
  },
});
