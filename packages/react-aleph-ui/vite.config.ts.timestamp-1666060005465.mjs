// vite.config.ts
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
var __vite_injected_original_import_meta_url = "file:///C:/workspace/unmsm/THESIS/react-aleph-v2/my-turborepo/packages/react-aleph-ui/vite.config.ts";
var current = fileURLToPath(__vite_injected_original_import_meta_url);
var root = path.dirname(current);
var vite_config_default = defineConfig({
  plugins: [react({
    include: [/\.tsx?$/, /\.jsx?$/, /\.css$/]
  })],
  build: {
    lib: {
      entry: path.resolve(root, "src/App.tsx"),
      name: "@react-aleph-ui",
      fileName: (format) => `react-aleph-ui.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime.js"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3b3Jrc3BhY2VcXFxcdW5tc21cXFxcVEhFU0lTXFxcXHJlYWN0LWFsZXBoLXYyXFxcXG15LXR1cmJvcmVwb1xcXFxwYWNrYWdlc1xcXFxyZWFjdC1hbGVwaC11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcd29ya3NwYWNlXFxcXHVubXNtXFxcXFRIRVNJU1xcXFxyZWFjdC1hbGVwaC12MlxcXFxteS10dXJib3JlcG9cXFxccGFja2FnZXNcXFxccmVhY3QtYWxlcGgtdWlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3dvcmtzcGFjZS91bm1zbS9USEVTSVMvcmVhY3QtYWxlcGgtdjIvbXktdHVyYm9yZXBvL3BhY2thZ2VzL3JlYWN0LWFsZXBoLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG5jb25zdCBjdXJyZW50ID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuY29uc3Qgcm9vdCA9IHBhdGguZGlybmFtZShjdXJyZW50KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KHtcbiAgICBpbmNsdWRlOiBbL1xcLnRzeD8kLywgL1xcLmpzeD8kLywgL1xcLmNzcyQvXVxuICB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKHJvb3QsIFwic3JjL0FwcC50c3hcIiksXG4gICAgICBuYW1lOiBcIkByZWFjdC1hbGVwaC11aVwiLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGByZWFjdC1hbGVwaC11aS4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCIsIFwicmVhY3QvanN4LXJ1bnRpbWVcIl0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiBcIlJlYWN0XCIsXG4gICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLFxuICAgICAgICAgIFwicmVhY3QvanN4LXJ1bnRpbWVcIjogXCJyZWFjdC9qc3gtcnVudGltZS5qc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlhLE9BQU8sVUFBVTtBQUMxYixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFIK1AsSUFBTSwyQ0FBMkM7QUFLbFUsSUFBTSxVQUFVLGNBQWMsd0NBQWU7QUFDN0MsSUFBTSxPQUFPLEtBQUssUUFBUSxPQUFPO0FBRWpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNO0FBQUEsSUFDZCxTQUFTLENBQUMsV0FBVyxXQUFXLFFBQVE7QUFBQSxFQUMxQyxDQUFDLENBQUM7QUFBQSxFQUNGLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sS0FBSyxRQUFRLE1BQU0sYUFBYTtBQUFBLE1BQ3ZDLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxXQUFXLGtCQUFrQjtBQUFBLElBQzFDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxhQUFhLG1CQUFtQjtBQUFBLE1BQ3BELFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLHFCQUFxQjtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
