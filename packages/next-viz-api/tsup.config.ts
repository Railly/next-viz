import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  bundle: true,
  splitting: false,
  clean: true,
  platform: "node",
  target: "esnext",
  external: [],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
});
