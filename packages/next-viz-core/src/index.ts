export { ASTParser } from "./parser/ASTParser";
export * from "./types";
// import { ESLint } from "eslint";
// import { logger } from "@next-viz/cli";

// const __dirname = path
//   .dirname(fileURLToPath(import.meta.url))
//   .split(path.sep)
//   .slice(0, -1)
//   .join(path.sep);

// const a = swc.transformSync(myTSX, {
//   jsc: {
//     parser: {
//       syntax: "typescript",
//       tsx: true,
//     },
//     target: "es2015",
//   },
//   plugin: (c) => {
//     return new Visitor().visitProgram(c);
//   },
// });
