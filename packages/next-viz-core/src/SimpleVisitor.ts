import { Visitor } from "@swc/core/Visitor.js";
import ParsedFile from "./parser/ParsedFile";
import { TracingNode } from "./parser/TracingNode";
import { JSXAttribute as JSXAttributeClass } from "./parser/JSXAttribute";
import { JSXElement as JSXElementClass } from "./parser/JSXElement";
import { Pattern } from "fast-glob";
import {
  ClassDeclaration,
  Declaration,
  Expression,
  FunctionDeclaration,
  ImportDeclaration,
  JSXAttribute,
  JSXAttributeOrSpread,
  JSXClosingElement,
  JSXOpeningElement,
  VariableDeclaration,
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
    const specifier = this.tracingNode.peek(n.specifiers);

    this.tracingNode.addImport({
      name: specifier?.local.value || "",
      path: n.source.value,
      hasDefault: specifier?.type === "ImportDefaultSpecifier",
      hasNamespace: specifier?.type === "ImportNamespaceSpecifier",
      named: n.specifiers
        .filter((s) => s.type === "ImportSpecifier")
        .map((s) => s.local.value),
    });
    return n;
  }

  visitJSXOpeningElement(n: JSXOpeningElement): JSXOpeningElement {
    n.name = this.visitJSXElementName(n.name);
    n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    n.attributes = this.visitJSXAttributeOrSpreads(n.attributes);

    const jsxElement = this.tracingNode.peek(this.elements);

    if (jsxElement?.isUndefined()) {
      console.log("Current jsxElement is undefined, opening it");
      jsxElement.open(n);
      if (n.name.type === "Identifier") {
        jsxElement.setName(n.name.value);
      }
    } else {
      console.log("Current jsxElement is defined, creating a new one");
      const newElement = new JSXElementClass(this.parsedFile.path);
      newElement.open(n);
      if (n.name.type === "Identifier") {
        newElement.setName(n.name.value);
      }
      this.elements.push(newElement);
    }
    return n;
  }

  visitJSXAttribute(n: JSXAttribute): JSXAttributeOrSpread {
    n.name = this.visitJSXAttributeName(n.name);
    n.value = this.visitJSXAttributeValue(n.value);

    const jsxAttribute = this.tracingNode.peek(this.attributes);

    if (jsxAttribute?.isUndefined()) {
      jsxAttribute.open(n);
      jsxAttribute.setName(n.name.type === "Identifier" ? n.name.value : "");
    } else {
      const newAttribute = new JSXAttributeClass();
      newAttribute.open(n);
      newAttribute.setName(n.name.type === "Identifier" ? n.name.value : "");
    }

    return n;
  }

  visitJSXClosingElement(
    n: JSXClosingElement | undefined
  ): JSXClosingElement | undefined {
    if (n) {
      n.name = this.visitJSXElementName(n.name);
      const jsxElement = this.tracingNode.peek(this.elements);

      if (jsxElement && !jsxElement.isUndefined()) {
        console.log("Closing jsxElement and adding it to tracingNode");
        this.tracingNode.addJSXElement(jsxElement);
        this.elements.pop();
        if (this.elements.length === 0)
          this.elements.push(new JSXElementClass(this.parsedFile.path));
      } else {
        console.log("Current jsxElement is undefined, nothing to close");
      }
    }
    return n;
  }

  // open tha tracing node
  visitVariableDeclaration(n: VariableDeclaration): VariableDeclaration {
    n.declarations = this.visitVariableDeclarators(n.declarations);
    if (this.tracingNode.isUndefined()) {
      this.tracingNode.open(n);
      console.log("Opened tracing node");
    }
    return n;
  }

  visitFunctionDeclaration(decl: FunctionDeclaration): Declaration {
    decl.identifier = this.visitIdentifier(decl.identifier);
    decl = this.visitFunction(decl);
    console.log({
      path: this.tracingNode.getPath(),
    });
    if (this.tracingNode.isUndefined()) {
      this.tracingNode.open(decl);
      console.log("Opened tracing node");
    }
    return decl;
  }

  visitClassDeclaration(decl: ClassDeclaration): Declaration {
    decl = this.visitClass(decl);
    decl.identifier = this.visitIdentifier(decl.identifier);
    if (this.tracingNode.isUndefined()) {
      this.tracingNode.open(decl);
      console.log("Opened tracing node");
    }
    return decl;
  }

  getTracingNode(): TracingNode {
    return this.tracingNode;
  }
}
