import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080 },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  define: {
    __RUNTIME_REPO__: JSON.stringify(process.env.GITHUB_REPOSITORY || 'unknown'),
    __RUNTIME_BRANCH__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || 'local')
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@advisor": path.resolve(__dirname, "src/features/advisors/platform"),
      "@creator": path.resolve(__dirname, "packages/creator/src"),
    },
    dedupe: ["react","react-dom","react-dom/client","react/jsx-runtime","react/jsx-dev-runtime"],
  },
  optimizeDeps: { include: ["react","react-dom","react-dom/client"] }
}));
