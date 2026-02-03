import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "https://deepguardai.com/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()], // Tailwind is handled via PostCSS config
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate source maps for production debugging
    sourcemap: mode === "production" ? "hidden" : true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
}));
