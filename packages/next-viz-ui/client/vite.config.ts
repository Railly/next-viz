import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const current = fileURLToPath(import.meta.url);
const root = path.dirname(current);

export default defineConfig({
  plugins: [
    react({
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
      input: "src/main.tsx",
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
