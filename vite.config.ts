import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      // process JSX in plain .js files (incl. monorepo packages/creator/**)
      include: [
        /\.[jt]sx?$/,                        // normal app files
        /packages\/creator\/src\/.*\.js$/ // workspace JS with JSX
      ],
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
  // dev transforms: treat .js files as JSX
  esbuild: { loader: 'jsx' },
  optimizeDeps: {
    dedupe: ['react', 'react-dom'],
    include: ['react', 'react-dom'],
    esbuildOptions: {
      // dep-scan: also parse .js as JSX
      loader: { '.js': 'jsx' },
    },
  },
  // single entry; don't scan docs/** html
  build: { rollupOptions: { input: 'index.html' } },
  // allow reading files from ./packages during dev
  server: {  host: true,  port: 8080, strictPort: false, fs: { allow: ['.', 'packages'] , hmr: { clientPort: 443  } } },
});
