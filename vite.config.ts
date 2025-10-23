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
  },
  // IMPORTANT: do NOT set a global esbuild.loader here (it breaks .ts/.tsx parsing)
  optimizeDeps: {
    // only treat plain .js as JSX for deps pre-bundle
    esbuildOptions: { loader: { '.js': 'jsx' } },
    dedupe: ['react', 'react-dom'],
    include: ['react', 'react-dom'],
  },
  build: { rollupOptions: { input: 'index.html' } },
  server: { port: 8080, strictPort: false },
});
