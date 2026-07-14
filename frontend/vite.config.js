import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
  },
  server: {
    proxy: {
      // Directs any frontend network requests starting with /api over to your Express port
      "/api": {
        target: "http://localhost:5002",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:5002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});