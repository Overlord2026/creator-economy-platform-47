import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Ensure .js files with JSX in packages/* parse correctly
  esbuild: {
    loader: { '.js': 'jsx' },
  },
  optimizeDeps: {
    dedupe: ['react', 'react-dom'],
    include: ['react', 'react-dom'],
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: { port: 8080, strictPort: false },
});
