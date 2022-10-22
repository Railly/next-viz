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
    lib: {
      entry: path.resolve(root, "src/App.tsx"),
      name: "react-aleph-ui",
      fileName: (format) => `react-aleph-ui.${format}.js`,
    },
    rollupOptions: {
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
