import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      include: [/\.[jt]sx?$/, /packages\/creator\/src\/.*\.js$/],
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@': path.resolve(__dirname, 'src'),
    },
    preserveSymlinks: false,
  },
  optimizeDeps: {
    dedupe: ['react', 'react-dom'],
    include: ['react', 'react-dom'],
    esbuildOptions: { loader: { '.js': 'jsx' } }, // dep-scan
  },
  build: { rollupOptions: { input: 'index.html' } }, // don't scan docs/**
  server: { host: true, port: 8080, strictPort: false, fs: { allow: ['.', 'packages'] }, hmr: { clientPort: 443 } },
});
