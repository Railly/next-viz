// {
//   "type": "Module",
//   "span": {
//     "start": 1,
//     "end": 293,
//     "ctxt": 0
//   },
//   "body": [
//     {
//       "type": "ImportDeclaration",
//       "span": {
//         "start": 1,
//         "end": 34,
//         "ctxt": 0
//       },
//       "specifiers": [
//         {
//           "type": "ImportSpecifier",
//           "span": {
//             "start": 10,
//             "end": 18,
//             "ctxt": 0
//           },
//           "local": {
//             "type": "Identifier",
//             "span": {
//               "start": 10,
//               "end": 18,
//               "ctxt": 0
//             },
//             "value": "useState",
//             "optional": false
//           },
//           "imported": null,
//           "isTypeOnly": false
//         }
//       ],
//       "source": {
//         "type": "StringLiteral",
//         "span": {
//           "start": 26,
//           "end": 33,
//           "ctxt": 0
//         },
//         "value": "react",
//         "raw": "\"react\""
//       },
//       "typeOnly": false,
//       "asserts": null
//     },
//     {
//       "type": "ImportDeclaration",
//       "span": {
//         "start": 35,
//         "end": 54,
//         "ctxt": 0
//       },
//       "specifiers": [],
//       "source": {
//         "type": "StringLiteral",
//         "span": {
//           "start": 42,
//           "end": 53,
//           "ctxt": 0
//         },
//         "value": "./App.css",
//         "raw": "\"./App.css\""
//       },
//       "typeOnly": false,
//       "asserts": null
//     },
//     {
//       "type": "FunctionDeclaration",
//       "identifier": {
//         "type": "Identifier",
//         "span": {
//           "start": 65,
//           "end": 68,
//           "ctxt": 0
//         },
//         "value": "App",
//         "optional": false
//       },
//       "declare": false,
//       "params": [],
//       "decorators": [],
//       "span": {
//         "start": 56,
//         "end": 272,
//         "ctxt": 0
//       },
//       "body": {
//         "type": "BlockStatement",
//         "span": {
//           "start": 71,
//           "end": 272,
//           "ctxt": 0
//         },
//         "stmts": [
//           {
//             "type": "VariableDeclaration",
//             "span": {
//               "start": 75,
//               "end": 113,
//               "ctxt": 0
//             },
//             "kind": "const",
//             "declare": false,
//             "declarations": [
//               {
//                 "type": "VariableDeclarator",
//                 "span": {
//                   "start": 81,
//                   "end": 112,
//                   "ctxt": 0
//                 },
//                 "id": {
//                   "type": "ArrayPattern",
//                   "span": {
//                     "start": 81,
//                     "end": 98,
//                     "ctxt": 0
//                   },
//                   "elements": [
//                     {
//                       "type": "Identifier",
//                       "span": {
//                         "start": 82,
//                         "end": 87,
//                         "ctxt": 0
//                       },
//                       "value": "count",
//                       "optional": false,
//                       "typeAnnotation": null
//                     },
//                     {
//                       "type": "Identifier",
//                       "span": {
//                         "start": 89,
//                         "end": 97,
//                         "ctxt": 0
//                       },
//                       "value": "setCount",
//                       "optional": false,
//                       "typeAnnotation": null
//                     }
//                   ],
//                   "optional": false,
//                   "typeAnnotation": null
//                 },
//                 "init": {
//                   "type": "CallExpression",
//                   "span": {
//                     "start": 101,
//                     "end": 112,
//                     "ctxt": 0
//                   },
//                   "callee": {
//                     "type": "Identifier",
//                     "span": {
//                       "start": 101,
//                       "end": 109,
//                       "ctxt": 0
//                     },
//                     "value": "useState",
//                     "optional": false
//                   },
//                   "arguments": [
//                     {
//                       "spread": null,
//                       "expression": {
//                         "type": "NumericLiteral",
//                         "span": {
//                           "start": 110,
//                           "end": 111,
//                           "ctxt": 0
//                         },
//                         "value": 0,
//                         "raw": "0"
//                       }
//                     }
//                   ],
//                   "typeArguments": null
//                 },
//                 "definite": false
//               }
//             ]
//           },
//           {
//             "type": "ReturnStatement",
//             "span": {
//               "start": 117,
//               "end": 270,
//               "ctxt": 0
//             },
//             "argument": {
//               "type": "ParenthesisExpression",
//               "span": {
//                 "start": 124,
//                 "end": 269,
//                 "ctxt": 0
//               },
//               "expression": {
//                 "type": "JSXElement",
//                 "span": {
//                   "start": 130,
//                   "end": 265,
//                   "ctxt": 0
//                 },
//                 "opening": {
//                   "type": "JSXOpeningElement",
//                   "name": {
//                     "type": "Identifier",
//                     "span": {
//                       "start": 131,
//                       "end": 134,
//                       "ctxt": 0
//                     },
//                     "value": "div",
//                     "optional": false
//                   },
//                   "span": {
//                     "start": 130,
//                     "end": 151,
//                     "ctxt": 0
//                   },
//                   "attributes": [
//                     {
//                       "type": "JSXAttribute",
//                       "span": {
//                         "start": 135,
//                         "end": 150,
//                         "ctxt": 0
//                       },
//                       "name": {
//                         "type": "Identifier",
//                         "span": {
//                           "start": 135,
//                           "end": 144,
//                           "ctxt": 0
//                         },
//                         "value": "className",
//                         "optional": false
//                       },
//                       "value": {
//                         "type": "StringLiteral",
//                         "span": {
//                           "start": 145,
//                           "end": 150,
//                           "ctxt": 0
//                         },
//                         "value": "App",
//                         "raw": "\"App\""
//                       }
//                     }
//                   ],
//                   "selfClosing": false,
//                   "typeArguments": null
//                 },
//                 "children": [
//                   {
//                     "type": "JSXText",
//                     "span": {
//                       "start": 151,
//                       "end": 158,
//                       "ctxt": 0
//                     },
//                     "value": "\n\n      ",
//                     "raw": "\n\n      "
//                   },
//                   {
//                     "type": "JSXElement",
//                     "span": {
//                       "start": 158,
//                       "end": 254,
//                       "ctxt": 0
//                     },
//                     "opening": {
//                       "type": "JSXOpeningElement",
//                       "name": {
//                         "type": "Identifier",
//                         "span": {
//                           "start": 159,
//                           "end": 165,
//                           "ctxt": 0
//                         },
//                         "value": "button",
//                         "optional": false
//                       },
//                       "span": {
//                         "start": 158,
//                         "end": 213,
//                         "ctxt": 0
//                       },
//                       "attributes": [
//                         {
//                           "type": "JSXAttribute",
//                           "span": {
//                             "start": 166,
//                             "end": 212,
//                             "ctxt": 0
//                           },
//                           "name": {
//                             "type": "Identifier",
//                             "span": {
//                               "start": 166,
//                               "end": 173,
//                               "ctxt": 0
//                             },
//                             "value": "onClick",
//                             "optional": false
//                           },
//                           "value": {
//                             "type": "JSXExpressionContainer",
//                             "span": {
//                               "start": 174,
//                               "end": 212,
//                               "ctxt": 0
//                             },
//                             "expression": {
//                               "type": "ArrowFunctionExpression",
//                               "span": {
//                                 "start": 175,
//                                 "end": 211,
//                                 "ctxt": 0
//                               },
//                               "params": [],
//                               "body": {
//                                 "type": "CallExpression",
//                                 "span": {
//                                   "start": 181,
//                                   "end": 211,
//                                   "ctxt": 0
//                                 },
//                                 "callee": {
//                                   "type": "Identifier",
//                                   "span": {
//                                     "start": 181,
//                                     "end": 189,
//                                     "ctxt": 0
//                                   },
//                                   "value": "setCount",
//                                   "optional": false
//                                 },
//                                 "arguments": [
//                                   {
//                                     "spread": null,
//                                     "expression": {
//                                       "type": "ArrowFunctionExpression",
//                                       "span": {
//                                         "start": 190,
//                                         "end": 210,
//                                         "ctxt": 0
//                                       },
//                                       "params": [
//                                         {
//                                           "type": "Identifier",
//                                           "span": {
//                                             "start": 191,
//                                             "end": 196,
//                                             "ctxt": 0
//                                           },
//                                           "value": "count",
//                                           "optional": false,
//                                           "typeAnnotation": null
//                                         }
//                                       ],
//                                       "body": {
//                                         "type": "BinaryExpression",
//                                         "span": {
//                                           "start": 201,
//                                           "end": 210,
//                                           "ctxt": 0
//                                         },
//                                         "operator": "+",
//                                         "left": {
//                                           "type": "Identifier",
//                                           "span": {
//                                             "start": 201,
//                                             "end": 206,
//                                             "ctxt": 0
//                                           },
//                                           "value": "count",
//                                           "optional": false
//                                         },
//                                         "right": {
//                                           "type": "NumericLiteral",
//                                           "span": {
//                                             "start": 209,
//                                             "end": 210,
//                                             "ctxt": 0
//                                           },
//                                           "value": 1,
//                                           "raw": "1"
//                                         }
//                                       },
//                                       "async": false,
//                                       "generator": false,
//                                       "typeParameters": null,
//                                       "returnType": null
//                                     }
//                                   }
//                                 ],
//                                 "typeArguments": null
//                               },
//                               "async": false,
//                               "generator": false,
//                               "typeParameters": null,
//                               "returnType": null
//                             }
//                           }
//                         }
//                       ],
//                       "selfClosing": false,
//                       "typeArguments": null
//                     },
//                     "children": [
//                       {
//                         "type": "JSXText",
//                         "span": {
//                           "start": 213,
//                           "end": 231,
//                           "ctxt": 0
//                         },
//                         "value": "\n\n        count is ",
//                         "raw": "\n\n        count is "
//                       },
//                       {
//                         "type": "JSXExpressionContainer",
//                         "span": {
//                           "start": 231,
//                           "end": 238,
//                           "ctxt": 0
//                         },
//                         "expression": {
//                           "type": "Identifier",
//                           "span": {
//                             "start": 232,
//                             "end": 237,
//                             "ctxt": 0
//                           },
//                           "value": "count",
//                           "optional": false
//                         }
//                       },
//                       {
//                         "type": "JSXText",
//                         "span": {
//                           "start": 238,
//                           "end": 245,
//                           "ctxt": 0
//                         },
//                         "value": "\n\n      ",
//                         "raw": "\n\n      "
//                       }
//                     ],
//                     "closing": {
//                       "type": "JSXClosingElement",
//                       "span": {
//                         "start": 245,
//                         "end": 254,
//                         "ctxt": 0
//                       },
//                       "name": {
//                         "type": "Identifier",
//                         "span": {
//                           "start": 247,
//                           "end": 253,
//                           "ctxt": 0
//                         },
//                         "value": "button",
//                         "optional": false
//                       }
//                     }
//                   },
//                   {
//                     "type": "JSXText",
//                     "span": {
//                       "start": 254,
//                       "end": 259,
//                       "ctxt": 0
//                     },
//                     "value": "\n\n    ",
//                     "raw": "\n\n    "
//                   }
//                 ],
//                 "closing": {
//                   "type": "JSXClosingElement",
//                   "span": {
//                     "start": 259,
//                     "end": 265,
//                     "ctxt": 0
//                   },
//                   "name": {
//                     "type": "Identifier",
//                     "span": {
//                       "start": 261,
//                       "end": 264,
//                       "ctxt": 0
//                     },
//                     "value": "div",
//                     "optional": false
//                   }
//                 }
//               }
//             }
//           }
//         ]
//       },
//       "generator": false,
//       "async": false,
//       "typeParameters": null,
//       "returnType": null
//     },
//     {
//       "type": "ExportDefaultExpression",
//       "span": {
//         "start": 274,
//         "end": 293,
//         "ctxt": 0
//       },
//       "expression": {
//         "type": "Identifier",
//         "span": {
//           "start": 289,
//           "end": 292,
//           "ctxt": 0
//         },
//         "value": "App",
//         "optional": false
//       }
//     }
//   ],
//   "interpreter": null
// }

// Create a Traverser Class to traverse the AST
import { Compiler, transform } from "@swc/core"

export class Traverser {
  ast: any
  visitor: any
  constructor(ast, visitor) {
    this.ast = ast
    this.visitor = visitor
  }

  traverseArray(array, parent) {
    array.forEach((child) => {
      this.traverseNode(child, parent)
    })
  }

  traverseNode(node, parent) {
    const methods = this.visitor[node.type]
    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case "Program":
        this.traverseArray(node.body, node)
        break
      case "CallExpression":
        this.traverseNode(node.callee, node)
        this.traverseArray(node.arguments, node)
        break
      case "Identifier":
        break
      case "NumberLiteral":
        break
      case "StringLiteral":
        break
      case "ExpressionStatement":
        this.traverseNode(node.expression, node)
        break
      case "VariableDeclaration":
        this.traverseArray(node.declarations, node)
        break
      case "VariableDeclarator":
        this.traverseNode(node.id, node)
        this.traverseNode(node.init, node)
        break
      case "FunctionDeclaration":
        this.traverseNode(node.id, node)
        this.traverseArray(node.params, node)
        this.traverseNode(node.body, node)
        break
      case "BlockStatement":
        this.traverseArray(node.body, node)
        break
      case "IfStatement":
        this.traverseNode(node.test, node)
        this.traverseNode(node.consequent, node)
        break
      case "ReturnStatement":
        this.traverseNode(node.argument, node)
        break
      case "UnaryExpression":
        this.traverseNode(node.argument, node)
        break
      case "BinaryExpression":
        this.traverseNode(node.left, node)
        this.traverseNode(node.right, node)
        break
      default:
        console.log(node.type)
        throw new Error(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseProgram() {
    this.traverseNode(this.ast, null)
  }
}
