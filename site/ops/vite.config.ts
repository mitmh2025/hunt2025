import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.xlsx", "**/*.stl", "**/*.3mf"],
  build: {
    outDir: "../dist-ops/static",
  },
  server: {
    port: 3003,
    proxy: {
      "/admin-token": "http://localhost:3002",
    },
  },
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
});
