
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Polyfill __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isReplit = process.env.REPL_ID !== undefined;
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  base: "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(isDev && isReplit
      ? [require("@replit/vite-plugin-cartographer").cartographer()]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});

