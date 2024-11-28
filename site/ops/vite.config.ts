import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../dist/ops-static",
  },
  server: {
    port: 3003,
    proxy: {
      "/admin-token": "http://localhost:3002",
    },
  },
});
