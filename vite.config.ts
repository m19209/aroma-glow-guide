import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import path from "path";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        entry: "src/server.ts",
      },
    }),
    nitro({
      preset: "vercel",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      ignored: [
        "**/local.db",
        "**/local.db-journal",
        "**/local.db-wal",
        "**/local.db-shm",
        "**/.agents/**",
        "**/specs/**",
      ],
    },
    hmr: {
      overlay: false,
    },
  },
});
