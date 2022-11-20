import path from "path";
import { fileURLToPath } from "url";
import VitePluginReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const current = fileURLToPath(import.meta.url);
const root = path.dirname(current);

export default defineConfig({
  plugins: [
    VitePluginReact({
      include: [/\.tsx?$/, /\.jsx?$/, /\.css$/],
    }),
  ],
  build: {
    manifest: true,
    lib: {
      entry: path.resolve(root, "src/main.tsx"),
      name: "next-viz-ui",
      fileName: (format) => `next-viz-ui.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(root, "src/main.tsx"),
      },
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime.js",
        },
      },
    },
  },
});
