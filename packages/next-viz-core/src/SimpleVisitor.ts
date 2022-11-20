import { Visitor } from "@swc/core/Visitor.js";
import ParsedFile from "./parser/ParsedFile";
import { TracingNode } from "./parser/TracingNode";
import { JSXAttribute as JSXAttributeClass } from "./parser/JSXAttribute";
import { JSXElement as JSXElementClass } from "./parser/JSXElement";
import { Pattern } from "fast-glob";
import {
  Expression,
  Identifier,
  ImportDeclaration,
  JSXClosingElement,
  JSXElement,
  JSXOpeningElement,
} from "@swc/core";

export class SimpleVisitor extends Visitor {
  tracingNode: TracingNode;
  parsedFile: ParsedFile;
  elements: JSXElementClass[] = [];
  attributes: JSXAttributeClass[] = [];

  hooks = new Map<Pattern, Expression | undefined>();

  exports = new Map<string, Expression | undefined>();

  constructor(path: string, fileContent: string) {
    super();
    this.tracingNode = new TracingNode(path, fileContent);
    this.parsedFile = new ParsedFile(path);
    this.elements = [new JSXElementClass(path)];
    this.attributes = [new JSXAttributeClass()];
  }

  visitImportDeclaration(n: ImportDeclaration): ImportDeclaration {
    this.tracingNode.addImport({
      name: n.specifiers[0].local.value,
      path: n.source.value,
      hasDefault: n.specifiers[0].type === "ImportDefaultSpecifier",
      hasNamespace: n.specifiers[0].type === "ImportNamespaceSpecifier",
      named: n.specifiers
        .filter((s) => s.type === "ImportSpecifier")
        .map((s) => s.local.value),
    });
    return n;
  }

  visitJSXOpeningElement(n: JSXOpeningElement): JSXOpeningElement {
    const jsxElement = this.tracingNode.peek(this.elements);
    if (jsxElement.isUndefined()) {
      console.log("Current jsxElement is undefined, opening it");
      if (n.name.type === "Identifier") {
        jsxElement.open(n);
        jsxElement.setName(n.name.value);
      }
    } else {
      console.log("Current jsxElement is defined, creating a new one");
      const newElement = new JSXElementClass(this.parsedFile.path);
      if (n.name.type === "Identifier") {
        newElement.open(n);
        newElement.setName(n.name.value);
      }
    }
    console.log({ opening: n });
    return n;
  }

  visitJSXClosingElement(
    n: JSXClosingElement | undefined
  ): JSXClosingElement | undefined {
    const jsxElement = this.tracingNode.peek(this.elements);

    if (!jsxElement.isUndefined() && n?.name.type === "Identifier") {
      console.log("Closing jsxElement and adding it to tracingNode");
      this.tracingNode.addJSXElement(jsxElement);
      this.elements.pop();
      if (this.elements.length === 0)
        this.elements.push(new JSXElementClass(this.parsedFile.path));
    } else {
      console.log("Current jsxElement is undefined, nothing to close");
    }
    console.log({ closing: n });
    return n;
  }

  // visitIdentifier(n: Identifier): Identifier {
  //   console.log({ identifier: JSON.stringify(n) });
  //   return n;
  // }

  getTracingNode(): TracingNode {
    return this.tracingNode;
  }

  getJSXElements() {
    return this.tracingNode.getJSXElements();
  }
}
