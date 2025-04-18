import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      mozjpeg: { quality: 75 },
      optipng: { optimizationLevel: 5 },
      webp: { quality: 80 },
    }),
  ],
  build: {
    outDir: "dist",
  },
  server: {
    open: true,
  },
  // base: "/devinstitute.ma",
});
