import { Compiler, transform } from "@swc/core";

export class Traverser {
  ast: any;
  visitor: any;
  constructor(ast: any, visitor: any) {
    this.ast = ast;
    this.visitor = visitor;
  }

  traverseArray(array: any, parent: any) {
    array.forEach((child: any) => {
      this.traverseNode(child, parent);
    });
  }

  traverseNode(node: any, parent: any) {
    const methods = this.visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        this.traverseArray(node.body, node);
        break;
      case "CallExpression":
        this.traverseNode(node.callee, node);
        this.traverseArray(node.arguments, node);
        break;
      case "Identifier":
        break;
      case "NumberLiteral":
        break;
      case "StringLiteral":
        break;
      case "ExpressionStatement":
        this.traverseNode(node.expression, node);
        break;
      case "VariableDeclaration":
        this.traverseArray(node.declarations, node);
        break;
      case "VariableDeclarator":
        this.traverseNode(node.id, node);
        this.traverseNode(node.init, node);
        break;
      case "FunctionDeclaration":
        this.traverseNode(node.id, node);
        this.traverseArray(node.params, node);
        this.traverseNode(node.body, node);
        break;
      case "BlockStatement":
        this.traverseArray(node.body, node);
        break;
      case "IfStatement":
        this.traverseNode(node.test, node);
        this.traverseNode(node.consequent, node);
        break;
      case "ReturnStatement":
        this.traverseNode(node.argument, node);
        break;
      case "UnaryExpression":
        this.traverseNode(node.argument, node);
        break;
      case "BinaryExpression":
        this.traverseNode(node.left, node);
        this.traverseNode(node.right, node);
        break;
      default:
        console.log(node.type);
        throw new Error(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseProgram() {
    this.traverseNode(this.ast, null);
  }
}
