import { ESLint } from "eslint"
import fs from "fs"
import swc from "@swc/core"

try {
  // const eslint = new ESLint({
  //   useEslintrc: false,
  //   baseConfig: {
  //     extends: ["eslint:recommended"],
  //     env: {
  //       es6: true,
  //       node: true,
  //     },
  //     // parser: "@typescript-eslint/parser",
  //     // parserOptions: {
  //     //   ecmaVersion: 2018,
  //     //   sourceType: "module",
  //     //   ecmaFeatures: {
  //     //     jsx: true,
  //     //   },
  //     // },
  //     // plugins: ["@typescript-eslint"],
  //   },
  // });
  console.time("swc")
  const code = fs.readFileSync(
    "C://workspace/projects/cinfo/cinfo-proyecto-front/pages/login/index.js",
    "utf8"
  )
  swc
    .parse(code, {
      syntax: "ecmascript", // "ecmascript" | "typescript"
      comments: false,
      script: true,

      // Defaults to es3
      target: "es3",
      jsx: true,

      // Input source code are treated as module by default
    })
    .then((module) => {
      console.log(module.interpreter, "@module.interpreter")
      console.log(module.type, "@module.type") // file type

      // @module.body AST
      // [
      // {
      //   type: 'FunctionDeclaration',
      //   identifier: {
      //     type: 'Identifier',
      //     span: [Object],
      //     value: 'sum',
      //     optional: false
      //   },
      //   declare: false,
      //   params: [ [Object], [Object] ],
      //   decorators: [],
      //   span: { start: 1, end: 41, ctxt: 0 },
      //   body: { type: 'BlockStatement', span: [Object], stmts: [Array] },
      //   generator: false,
      //   async: false,
      //   typeParameters: null,
      //   returnType: null
      // },
      // {
      //   type: 'VariableDeclaration',
      //   span: { start: 45, end: 70, ctxt: 0 },
      //   kind: 'const',
      //   declare: false,
      //   declarations: [ [Object] ]
      // },
      // {
      //   type: 'VariableDeclaration',
      //   span: { start: 72, end: 96, ctxt: 0 },
      //   kind: 'let',
      //   declare: false,
      //   declarations: [ [Object] ]
      // },
      // {
      //   type: 'ExpressionStatement',
      //   span: { start: 100, end: 120, ctxt: 0 },
      //   expression: {
      //     type: 'CallExpression',
      //     span: [Object],
      //     callee: [Object],
      //     arguments: [Array],
      //     typeArguments: null
      //   }
      // }
      // ]
      module.body.forEach((item) => {
        Object.entries(item).forEach(([key, value], num) => {
          console.log(`******************${num}******************`)
          console.table(key)
          if (value instanceof Array) {
            value.forEach((item, num) => {
              console.log(`******************${num}******************`)
              console.table(item)
            })
          } else {
            console.log(value, "RAW")
          }
        })
        // console.log(item.value, "@item.value");
        // console.log(item.optional, "@item.optional");
        // console.log(item.declare, "@item.declare");
        // console.log(item.params, "@item.params");
        // console.log(item.decorators, "@item.decorators");
        // console.log(item.body, "@item.body");
        // console.log(item.generator, "@item.generator");
        // console.log(item.async, "@item.async");
        // console.log(item.typeParameters, "@item.typeParameters");
        // console.log(item.returnType, "@item.returnType");
        // loop module.body, but prints correctly the [Object]
      })
    })

  console.timeEnd("swc")

  // 2. Lint files.
  // const results = await eslint.lintFiles(["./test.js"]);

  // 3. Format the results.
  // const formatter = await eslint.loadFormatter("stylish");
  // console.log(formatter, "formatter");
  // console.log(results, "results");
  // const resultText = formatter.format(results);

  // 4. Output it.
  // console.log(resultText);
} catch (error) {
  process.exitCode = 1
  console.error(error)
}
