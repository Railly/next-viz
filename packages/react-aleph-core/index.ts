import { ESLint } from "eslint"
import fs from "fs"
import { Compiler } from "@swc/core"
import { Traverser } from "./traverser"
import ast from "./module.json" assert { type: "json" }

const visitor = {
  VariableDeclaration: {
    enter(node, parent) {
      console.log("VariableDeclaration Enter", node)
    },
    exit(node, parent) {
      console.log("VariableDeclaration Exit", node)
    },
  },
  VariableDeclarator: {
    enter(node, parent) {
      console.log("VariableDeclarator Enter", node)
    },
    exit(node, parent) {
      console.log("VariableDeclarator Exit", node)
    },
  },
  Identifier: {
    enter(node, parent) {
      console.log("Identifier Enter", node)
    },
    exit(node, parent) {
      console.log("Identifier Exit", node)
    },
  },
}

// Create a new Traverser instance
const traverser = new Traverser(ast, visitor)
traverser.traverseProgram()
