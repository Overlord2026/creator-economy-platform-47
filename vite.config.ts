import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      // process JSX in plain .js files too (monorepo packages/creator/**)
      include: [
        /\.[jt]sx?$/,                      // normal app files
        /packages\/creator\/src\/.*\.js$/, // workspace JS with JSX
      ],
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    // enforce ONE React at runtime/build
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  // dev transform loader: allow JSX in .js
  esbuild: { loader: 'jsx' },
  optimizeDeps: {
    dedupe: ['react', 'react-dom'],
    include: ['react', 'react-dom'],
    esbuildOptions: { loader: { '.js': 'jsx' } }, // prebundle map form is allowed
  },
  // do NOT scan docs/** html as entries
  build: { rollupOptions: { input: 'index.html' } },
  server: { port: 8080, strictPort: false },
});
