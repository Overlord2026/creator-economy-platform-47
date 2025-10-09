import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      include: [/\.[jt]sx?$/, /packages\/creator\/src\/.*\.js$/],
      jsxRuntime: "automatic",
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    dedupe: ["react", "react-dom"], // force a single React at runtime
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    esbuildOptions: { loader: { ".js": "jsx" } }, // allow JSX in .js files
  },
  server: { port: 8080, strictPort: false },
});
