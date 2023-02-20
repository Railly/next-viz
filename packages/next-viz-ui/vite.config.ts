import path from "path";
import { VitePluginNode } from "vite-plugin-node";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const current = fileURLToPath(import.meta.url);
const root = path.dirname(current);

export default defineConfig({
  plugins: [
    VitePluginNode({
      adapter: "express",
      appPath: "./src/index.ts",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(root, "src/index.ts"),
      name: "next-viz-ui",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["express", "@next-viz/core"],
      output: {
        globals: {
          vite: "vite",
          express: "express",
          "@next-viz/core": "@next-viz/core",
        },
      },
    },
  },
});
