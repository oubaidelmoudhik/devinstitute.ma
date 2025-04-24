import { defineConfig, Plugin, IndexHtmlTransformContext } from "vite";
import react from "@vitejs/plugin-react";

const removeHtmlCommentsPlugin = (): Plugin => {
  return {
    name: "remove-html-comments",
    apply: "build",
    transformIndexHtml(html: string, _ctx: IndexHtmlTransformContext): string {
      return html.replace(/<!--[\s\S]*?-->/g, "");
    },
  };
};

export default defineConfig({
  plugins: [react(), removeHtmlCommentsPlugin()],
  build: {
    outDir: "dist",
    minify: "esbuild",
  },
  esbuild: { legalComments: "none" },
  server: {
    open: true,
  },
});
