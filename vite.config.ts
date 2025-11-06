import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
const previewStubPath = path.resolve(__dirname, 'src/_stubs/empty.ts');
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      include: [/\.[jt]sx?$/, /packages\/creator\/src\/.*\.js$/],
      jsxRuntime: 'automatic',
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    dedupe: ['react', 'react-dom'],
    include: ['react', 'react-dom'],
    esbuildOptions: { loader: { '.js': 'jsx' } },
  },
  build: { rollupOptions: { input: 'index.html' } },
  server: { host: '::', port: 8080, strictPort: false },
}));
