import { defineConfig } from "tsup";

const ESM_REQUIRE_SHIM = `
import { createRequire } from 'module';const require = createRequire(import.meta.url);
`;

export default defineConfig({
  entry: ["src/index.ts"],
  bundle: true,
  splitting: false,
  clean: true,
  platform: "node",
  external: ["globby", "react-hot-toast"],
  format: "esm",
  target: "esnext",
  dts: true,
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
    // js: ESM_REQUIRE_SHIM,
  },
});
