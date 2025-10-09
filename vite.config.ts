import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Async config to safely handle optional lovable-tagger plugin
export default defineConfig(async ({ mode }) => {
  const plugins = [
    react({
      include: [/\.[jt]sx?$/, /packages\/creator\/src\/.*\.js$/],
      jsxRuntime: 'automatic',
    }),
  ];

  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger');
      plugins.push(componentTagger());
    } catch {
      // OK if lovable-tagger isn't present
    }
  }

  return {
    plugins,
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      esbuildOptions: { loader: { '.js': 'jsx' } },
    },
    server: { port: 8080, strictPort: false },
  };
});
