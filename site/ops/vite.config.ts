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
      "/api": "http://localhost:3002",
      "/": {
        bypass: (req) => {
          if (req.headers.cookie?.includes("mitmh2025_api_auth=")) {
            return req.url;
          }
          return undefined;
        },
        target: "http://localhost:3002",
      },
    },
  },
  define: {
    "process.env.ARCHIVE_MODE": process.env.ARCHIVE_MODE,
  },
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
});
