import { ESLint } from "eslint";
import fs from "fs";
import path from "path";
import swc from "@swc/core";
import { fileURLToPath } from "url";
import { Visitor } from "./Visitor";

const __dirname = path
  .dirname(fileURLToPath(import.meta.url))
  .split(path.sep)
  .slice(0, -1)
  .join(path.sep);

const myTSX = fs.readFileSync(
  path.resolve(__dirname, "src", "test.tsx"),
  "utf-8"
);

swc
  .parse(myTSX, {
    syntax: "typescript",
    target: "es2015",
    tsx: true,
    decorators: true,
  })
  .then(async (ast) => {
    const visitor = new Visitor();
    visitor.visitModule(ast);
    console.log(visitor.getImports());
    // console.log(visitor.getHooks());
    // console.log(visitor.getExports());
    // console.log(visitor.getComponents());
  })
  .catch((err) => {
    console.error(err);
  });

const a = swc.transformSync(myTSX, {
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: true,
    },
    target: "es2015",
  },
  plugin: (c) => {
    return new Visitor().visitProgram(c);
  },
});
