import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/program.ts"],
  bundle: true,
  splitting: false,
  clean: true,
  platform: "node",
  target: "esnext",
  external: [
    "chalk",
    "clear",
    "commander",
    "commitizen",
    "gradient-string",
    "figlet",
    "path",
    "shelljs",
  ],
  format: "esm",
  dts: true,
});
