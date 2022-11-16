import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["express", "react", "react-dom", "react/jsx-runtime", "esbuild"],
  format: ["esm", "cjs"],
  dts: true,
});
