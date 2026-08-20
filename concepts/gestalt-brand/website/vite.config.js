import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  // PORT comes from the launcher (autoPort); 5173 is the standalone default
  server: { open: true, port: Number(process.env.PORT) || 5173 },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        institutions: resolve(__dirname, "for-institutions.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
