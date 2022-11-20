import {
  Accessibility,
  ArrayExpression,
  ArrayPattern,
  ArrowFunctionExpression,
  Argument,
  AssignmentExpression,
  AssignmentPattern,
  AssignmentPatternProperty,
  AssignmentProperty,
  AwaitExpression,
  BigIntLiteral,
  BinaryExpression,
  BlockStatement,
  BooleanLiteral,
  BreakStatement,
  CallExpression,
  CatchClause,
  Class,
  ClassDeclaration,
  ClassExpression,
  ClassMember,
  ClassMethod,
  ClassProperty,
  ComputedPropName,
  ConditionalExpression,
  Constructor,
  ContinueStatement,
  DebuggerStatement,
  Declaration,
  Decorator,
  DefaultDecl,
  DoWhileStatement,
  EmptyStatement,
  ExportAllDeclaration,
  ExportDeclaration,
  ExportDefaultDeclaration,
  ExportDefaultExpression,
  ExportDefaultSpecifier,
  ExportNamedDeclaration,
  ExportNamespaceSpecifier,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  Fn,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  GetterProperty,
  Identifier,
  IfStatement,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXAttributeName,
  JSXAttributeOrSpread,
  JSXAttrValue,
  JSXClosingElement,
  JSXClosingFragment,
  JSXElement,
  JSXElementChild,
  JSXElementName,
  JSXEmptyExpression,
  JSXExpressionContainer,
  JSXFragment,
  JSXMemberExpression,
  JSXNamespacedName,
  JSXObject,
  JSXOpeningElement,
  JSXOpeningFragment,
  JSXSpreadChild,
  JSXText,
  KeyValuePatternProperty,
  KeyValueProperty,
  LabeledStatement,
  MemberExpression,
  MetaProperty,
  MethodProperty,
  Module,
  ModuleDeclaration,
  ModuleItem,
  NamedExportSpecifier,
  NamedImportSpecifier,
  NewExpression,
  NullLiteral,
  NumericLiteral,
  ObjectExpression,
  ObjectPattern,
  ObjectPatternProperty,
  OptionalChainingExpression,
  ParenthesisExpression,
  Pattern,
  PrivateMethod,
  PrivateName,
  PrivateProperty,
  Program,
  Property,
  PropertyName,
  RegExpLiteral,
  RestElement,
  ReturnStatement,
  Script,
  SequenceExpression,
  SetterProperty,
  SpreadElement,
  Statement,
  StringLiteral,
  Super,
  SwitchCase,
  SwitchStatement,
  TaggedTemplateExpression,
  TemplateLiteral,
  ThisExpression,
  ThrowStatement,
  TryStatement,
  TsAsExpression,
  TsEntityName,
  TsEnumDeclaration,
  TsEnumMember,
  TsEnumMemberId,
  TsExportAssignment,
  TsExpressionWithTypeArguments,
  TsExternalModuleReference,
  TsFnParameter,
  TsImportEqualsDeclaration,
  TsIndexSignature,
  TsInterfaceBody,
  TsInterfaceDeclaration,
  TsModuleBlock,
  TsModuleDeclaration,
  TsModuleName,
  TsModuleReference,
  TsNamespaceBody,
  TsNamespaceDeclaration,
  TsNamespaceExportDeclaration,
  TsNonNullExpression,
  TsParameterProperty,
  TsParameterPropertyParameter,
  TsQualifiedName,
  TsType,
  TsTypeAliasDeclaration,
  TsTypeAnnotation,
  TsTypeAssertion,
  TsTypeElement,
  TsTypeParameter,
  TsTypeParameterDeclaration,
  TsTypeParameterInstantiation,
  UnaryExpression,
  UpdateExpression,
  VariableDeclaration,
  VariableDeclarator,
  WhileStatement,
  WithStatement,
  YieldExpression,
  Param,
  ExprOrSpread,
  TsConstAssertion,
  Import,
  SuperPropExpression,
} from "@swc/core";
import { JSXAttribute as JSXAttributeClass } from "./parser/JSXAttribute";
import { JSXElement as JSXElementClass } from "./parser/JSXElement";
import ParsedFile from "./parser/ParsedFile";
import { TracingNode } from "./parser/TracingNode";

export class Visitor {
  tracingNode: TracingNode;
  parsedFile: ParsedFile;
  elements: JSXElementClass[] = [];
  attributes = [new JSXAttributeClass()];

  hooks = new Map<Pattern, Expression | undefined>();

  exports = new Map<string, Expression | undefined>();

  constructor(path: string, fileContent: string) {
    this.tracingNode = new TracingNode(path, fileContent);
    this.parsedFile = new ParsedFile(path);
    this.elements = [new JSXElementClass(path)];
    this.attributes = [new JSXAttributeClass()];
  }

  visitProgram(n: Program): Program {
    switch (n.type) {
      case "Module":
        return this.visitModule(n);
      case "Script":
        return this.visitScript(n);
    }
  }
  visitModule(m: Module): Module {
    // console.log("Module", m);
    m.body = this.visitModuleItems(m.body);
    return m;
  }
  visitScript(m: Script): Script {
    // console.log("Script", m);
    m.body = this.visitStatements(m.body);
    return m;
  }
  visitModuleItems(items: ModuleItem[]): ModuleItem[] {
    // console.log("ModuleItems", items);
    return items.map(this.visitModuleItem.bind(this));
  }
  visitModuleItem(n: ModuleItem): ModuleItem {
    // console.log("ModuleItem", n);
    switch (n.type) {
      case "ExportDeclaration":
      case "ExportDefaultDeclaration":
      case "ExportNamedDeclaration":
      case "ExportDefaultExpression":
      case "ImportDeclaration":
      case "ExportAllDeclaration":
      case "TsImportEqualsDeclaration":
      case "TsExportAssignment":
      case "TsNamespaceExportDeclaration":
        return this.visitModuleDeclaration(n);
      default:
        return this.visitStatement(n);
    }
  }
  visitModuleDeclaration(n: ModuleDeclaration): ModuleDeclaration {
    // console.log("ModuleDeclaration", n);
    switch (n.type) {
      case "ExportDeclaration":
        return this.visitExportDeclaration(n);
      case "ExportDefaultDeclaration":
        return this.visitExportDefaultDeclaration(n);
      case "ExportNamedDeclaration":
        return this.visitExportNamedDeclaration(n);
      case "ExportDefaultExpression":
        return this.visitExportDefaultExpression(n);
      case "ImportDeclaration":
        return this.visitImportDeclaration(n);
      case "ExportAllDeclaration":
        return this.visitExportAllDeclaration(n);
      case "TsImportEqualsDeclaration":
        return this.visitTsImportEqualsDeclaration(n);
      case "TsExportAssignment":
        return this.visitTsExportAssignment(n);
      case "TsNamespaceExportDeclaration":
        return this.visitTsNamespaceExportDeclaration(n);
    }
  }
  visitTsNamespaceExportDeclaration(
    n: TsNamespaceExportDeclaration
  ): ModuleDeclaration {
    // console.log("TsNamespaceExportDeclaration", n);
    n.id = this.visitBindingIdentifier(n.id);
    return n;
  }
  visitTsExportAssignment(n: TsExportAssignment): TsExportAssignment {
    // console.log("TsExportAssignment", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitTsImportEqualsDeclaration(
    n: TsImportEqualsDeclaration
  ): ModuleDeclaration {
    // console.log("TsImportEqualsDeclaration", n);
    n.id = this.visitBindingIdentifier(n.id);
    n.moduleRef = this.visitTsModuleReference(n.moduleRef);
    return n;
  }
  visitTsModuleReference(n: TsModuleReference): TsModuleReference {
    // console.log("TsModuleReference", n);
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "TsExternalModuleReference":
        return this.visitTsExternalModuleReference(n);
      case "TsQualifiedName":
        return this.visitTsQualifiedName(n);
    }
  }
  visitTsExternalModuleReference(
    n: TsExternalModuleReference
  ): TsExternalModuleReference {
    // console.log("TsExternalModuleReference", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitExportAllDeclaration(n: ExportAllDeclaration): ModuleDeclaration {
    // console.log("ExportAllDeclaration", n);
    n.source = this.visitStringLiteral(n.source);
    return n;
  }
  visitExportDefaultExpression(n: ExportDefaultExpression): ModuleDeclaration {
    // console.log("ExportDefaultExpression", n);
    n.expression = this.visitExpression(n.expression);
    this.exports.set("default", n.expression);
    return n;
  }
  visitExportNamedDeclaration(n: ExportNamedDeclaration): ModuleDeclaration {
    // console.log("ExportNamedDeclaration", n);
    n.specifiers = this.visitExportSpecifiers(n.specifiers);
    n.source = this.visitOptionalStringLiteral(n.source);
    return n;
  }
  visitExportSpecifiers(nodes: ExportSpecifier[]): ExportSpecifier[] {
    // console.log("ExportSpecifiers", nodes);
    return nodes.map(this.visitExportSpecifier.bind(this));
  }
  visitExportSpecifier(n: ExportSpecifier): ExportSpecifier {
    // console.log("ExportSpecifier", n);
    switch (n.type) {
      case "ExportDefaultSpecifier":
        return this.visitExportDefaultSpecifier(n);
      case "ExportNamespaceSpecifier":
        return this.visitExportNamespaceSpecifier(n);
      case "ExportSpecifier":
        return this.visitNamedExportSpecifier(n);
    }
  }
  visitNamedExportSpecifier(n: NamedExportSpecifier): ExportSpecifier {
    // console.log("NamedExportSpecifier", n);
    if (n.exported) {
      n.exported = this.visitBindingIdentifier(n.exported);
    }
    n.orig = this.visitIdentifierReference(n.orig);
    return n;
  }
  visitExportNamespaceSpecifier(n: ExportNamespaceSpecifier): ExportSpecifier {
    // console.log("ExportNamespaceSpecifier", n);
    n.name = this.visitBindingIdentifier(n.name);
    return n;
  }
  visitExportDefaultSpecifier(n: ExportDefaultSpecifier): ExportSpecifier {
    // console.log("ExportDefaultSpecifier", n);
    n.exported = this.visitBindingIdentifier(n.exported);
    return n;
  }
  visitOptionalStringLiteral(
    n: StringLiteral | undefined
  ): StringLiteral | undefined {
    // console.log("OptionalStringLiteral", n);
    if (n) {
      return this.visitStringLiteral(n);
    }
  }
  visitExportDefaultDeclaration(
    n: ExportDefaultDeclaration
  ): ModuleDeclaration {
    // console.log("ExportDefaultDeclaration", n);
    n.decl = this.visitDefaultDeclaration(n.decl);
    return n;
  }
  visitDefaultDeclaration(n: DefaultDecl): DefaultDecl {
    // console.log("DefaultDeclaration", n);
    switch (n.type) {
      case "ClassExpression":
        return this.visitClassExpression(n);
      case "FunctionExpression":
        return this.visitFunctionExpression(n);
      case "TsInterfaceDeclaration":
        return this.visitTsInterfaceDeclaration(n);
    }
  }
  visitFunctionExpression(n: FunctionExpression): FunctionExpression {
    // console.log("FunctionExpression", n);
    n = this.visitFunction(n);
    if (n.identifier) {
      n.identifier = this.visitBindingIdentifier(n.identifier);
    }
    return n;
  }
  visitClassExpression(n: ClassExpression): ClassExpression {
    // console.log("ClassExpression", n);
    n = this.visitClass(n);
    if (n.identifier) {
      n.identifier = this.visitBindingIdentifier(n.identifier);
    }
    return n;
  }
  visitExportDeclaration(n: ExportDeclaration): ModuleDeclaration {
    console.log("ExportDeclaration", n);
    n.declaration = this.visitDeclaration(n.declaration);
    return n;
  }
  visitArrayExpression(e: ArrayExpression): Expression {
    // console.log("ArrayExpression", e);
    if (e.elements) {
      e.elements = e.elements.map(this.visitArrayElement.bind(this));
    }
    return e;
  }
  visitArrayElement(e: ExprOrSpread | undefined): ExprOrSpread | undefined {
    // console.log("ArrayElement", e);
    if (e) {
      return this.visitExprOrSpread(e);
    }
  }
  visitExprOrSpread(e: ExprOrSpread): ExprOrSpread {
    // console.log("ExprOrSpread", e);
    return Object.assign(Object.assign({}, e), {
      expression: this.visitExpression(e.expression),
    });
  }
  visitSpreadElement(e: SpreadElement): SpreadElement {
    // console.log("SpreadElement", e);
    e.arguments = this.visitExpression(e.arguments);
    return e;
  }
  visitOptionalExpression(e: Expression | undefined): Expression | undefined {
    // console.log("OptionalExpression", e);
    if (e) {
      return this.visitExpression(e);
    }
  }
  visitArrowFunctionExpression(e: ArrowFunctionExpression): Expression {
    // console.log("ArrowFunctionExpression", e);
    e.body = this.visitArrowBody(e.body);
    e.params = this.visitPatterns(e.params);
    e.returnType = this.visitTsTypeAnnotation(e.returnType);
    e.typeParameters = this.visitTsTypeParameterDeclaration(e.typeParameters);
    return e;
  }
  visitArrowBody(
    body: BlockStatement | Expression
  ): BlockStatement | Expression {
    // console.log("ArrowBody", body);
    switch (body.type) {
      case "BlockStatement":
        return this.visitBlockStatement(body);
      default:
        return this.visitExpression(body);
    }
  }
  visitBlockStatement(block: BlockStatement): BlockStatement {
    // console.log("BlockStatement", block);
    block.stmts = this.visitStatements(block.stmts);
    return block;
  }
  visitStatements(stmts: Statement[]): Statement[] {
    // console.log("Statements", stmts);
    return stmts.map(this.visitStatement.bind(this));
  }
  visitStatement(stmt: Statement): Statement {
    // console.log("Statement", stmt);
    switch (stmt.type) {
      case "ClassDeclaration":
      case "FunctionDeclaration":
      case "TsEnumDeclaration":
      case "TsInterfaceDeclaration":
      case "TsModuleDeclaration":
      case "TsTypeAliasDeclaration":
      case "VariableDeclaration":
        return this.visitDeclaration(stmt);
      case "BreakStatement":
        return this.visitBreakStatement(stmt);
      case "BlockStatement":
        return this.visitBlockStatement(stmt);
      case "ContinueStatement":
        return this.visitContinueStatement(stmt);
      case "DebuggerStatement":
        return this.visitDebuggerStatement(stmt);
      case "DoWhileStatement":
        return this.visitDoWhileStatement(stmt);
      case "EmptyStatement":
        return this.visitEmptyStatement(stmt);
      case "ForInStatement":
        return this.visitForInStatement(stmt);
      case "ForOfStatement":
        return this.visitForOfStatement(stmt);
      case "ForStatement":
        return this.visitForStatement(stmt);
      case "IfStatement":
        return this.visitIfStatement(stmt);
      case "LabeledStatement":
        return this.visitLabeledStatement(stmt);
      case "ReturnStatement":
        return this.visitReturnStatement(stmt);
      case "SwitchStatement":
        return this.visitSwitchStatement(stmt);
      case "ThrowStatement":
        return this.visitThrowStatement(stmt);
      case "TryStatement":
        return this.visitTryStatement(stmt);
      case "WhileStatement":
        return this.visitWhileStatement(stmt);
      case "WithStatement":
        return this.visitWithStatement(stmt);
      case "ExpressionStatement":
        return this.visitExpressionStatement(stmt);
      default:
        throw new Error("Unknown statement type");
    }
  }
  visitSwitchStatement(stmt: SwitchStatement): Statement {
    // console.log("SwitchStatement", stmt);
    stmt.discriminant = this.visitExpression(stmt.discriminant);
    stmt.cases = this.visitSwitchCases(stmt.cases);
    return stmt;
  }
  visitSwitchCases(cases: SwitchCase[]): SwitchCase[] {
    // console.log("SwitchCases", cases);
    return cases.map(this.visitSwitchCase.bind(this));
  }
  visitSwitchCase(c: SwitchCase): SwitchCase {
    // console.log("SwitchCase", c);
    c.test = this.visitOptionalExpression(c.test);
    c.consequent = this.visitStatements(c.consequent);
    return c;
  }
  visitIfStatement(stmt: IfStatement): Statement {
    // console.log("IfStatement", stmt);
    stmt.test = this.visitExpression(stmt.test);
    stmt.consequent = this.visitStatement(stmt.consequent);
    stmt.alternate = this.visitOptionalStatement(stmt.alternate);
    return stmt;
  }
  visitOptionalStatement(stmt: Statement | undefined): Statement | undefined {
    // console.log("OptionalStatement", stmt);
    if (stmt) {
      return this.visitStatement(stmt);
    }
  }
  visitBreakStatement(stmt: BreakStatement): Statement {
    // console.log("BreakStatement", stmt);
    if (stmt.label) {
      stmt.label = this.visitLabelIdentifier(stmt.label);
    }
    return stmt;
  }
  visitWhileStatement(stmt: WhileStatement): Statement {
    // console.log("WhileStatement", stmt);
    stmt.test = this.visitExpression(stmt.test);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitTryStatement(stmt: TryStatement): Statement {
    // console.log("TryStatement", stmt);
    stmt.block = this.visitBlockStatement(stmt.block);
    stmt.handler = this.visitCatchClause(stmt.handler);
    if (stmt.finalizer) {
      stmt.finalizer = this.visitBlockStatement(stmt.finalizer);
    }
    return stmt;
  }
  visitCatchClause(handler: CatchClause | undefined): CatchClause | undefined {
    // console.log("CatchClause", handler);
    if (handler) {
      if (handler.param) {
        handler.param = this.visitPattern(handler.param);
      }
      handler.body = this.visitBlockStatement(handler.body);
    }
    return handler;
  }
  visitThrowStatement(stmt: ThrowStatement): Statement {
    // console.log("ThrowStatement", stmt);
    stmt.argument = this.visitExpression(stmt.argument);
    return stmt;
  }
  visitReturnStatement(stmt: ReturnStatement): Statement {
    // console.log("ReturnStatement", stmt);
    if (stmt.argument) {
      stmt.argument = this.visitExpression(stmt.argument);
    }
    return stmt;
  }
  visitLabeledStatement(stmt: LabeledStatement): Statement {
    // console.log("LabeledStatement", stmt);
    stmt.label = this.visitLabelIdentifier(stmt.label);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitForStatement(stmt: ForStatement): Statement {
    // console.log("ForStatement", stmt);
    if (stmt.init) {
      if (stmt.init.type === "VariableDeclaration") {
        stmt.init = this.visitVariableDeclaration(stmt.init);
      } else {
        stmt.init = this.visitOptionalExpression(stmt.init);
      }
    }
    stmt.test = this.visitOptionalExpression(stmt.test);
    stmt.update = this.visitOptionalExpression(stmt.update);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitForOfStatement(stmt: ForOfStatement): Statement {
    // console.log("ForOfStatement", stmt);
    if (stmt.left.type === "VariableDeclaration") {
      stmt.left = this.visitVariableDeclaration(stmt.left);
    } else {
      stmt.left = this.visitPattern(stmt.left);
    }
    stmt.right = this.visitExpression(stmt.right);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitForInStatement(stmt: ForInStatement): Statement {
    // console.log("ForInStatement", stmt);
    if (stmt.left.type === "VariableDeclaration") {
      stmt.left = this.visitVariableDeclaration(stmt.left);
    } else {
      stmt.left = this.visitPattern(stmt.left);
    }
    stmt.right = this.visitExpression(stmt.right);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitEmptyStatement(stmt: EmptyStatement): Statement {
    // console.log("EmptyStatement", stmt);
    return stmt;
  }
  visitDoWhileStatement(stmt: DoWhileStatement): Statement {
    // console.log("DoWhileStatement", stmt);
    stmt.body = this.visitStatement(stmt.body);
    stmt.test = this.visitExpression(stmt.test);
    return stmt;
  }
  visitDebuggerStatement(stmt: DebuggerStatement): Statement {
    // console.log("DebuggerStatement", stmt);
    return stmt;
  }
  visitWithStatement(stmt: WithStatement): Statement {
    // console.log("WithStatement", stmt);
    stmt.object = this.visitExpression(stmt.object);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitDeclaration(decl: Declaration): Declaration {
    // console.log("Declaration", decl);
    switch (decl.type) {
      case "ClassDeclaration":
        return this.visitClassDeclaration(decl);
      case "FunctionDeclaration":
        return this.visitFunctionDeclaration(decl);
      case "TsEnumDeclaration":
        return this.visitTsEnumDeclaration(decl);
      case "TsInterfaceDeclaration":
        return this.visitTsInterfaceDeclaration(decl);
      case "TsModuleDeclaration":
        return this.visitTsModuleDeclaration(decl);
      case "TsTypeAliasDeclaration":
        return this.visitTsTypeAliasDeclaration(decl);
      case "VariableDeclaration":
        return this.visitVariableDeclaration(decl);
    }
  }
  visitVariableDeclaration(n: VariableDeclaration): VariableDeclaration {
    // console.log("VariableDeclaration", n);
    n.declarations = this.visitVariableDeclarators(n.declarations);
    return n;
  }
  visitVariableDeclarators(nodes: VariableDeclarator[]): VariableDeclarator[] {
    // console.log("VariableDeclarators", nodes);
    return nodes.map(this.visitVariableDeclarator.bind(this));
  }
  visitVariableDeclarator(n: VariableDeclarator): VariableDeclarator {
    // console.log("VariableDeclarator", n);
    n.id = this.visitPattern(n.id);
    n.init = this.visitOptionalExpression(n.init);
    this.hooks.set(n.id, n.init);
    return n;
  }
  visitTsTypeAliasDeclaration(n: TsTypeAliasDeclaration): Declaration {
    // console.log("TsTypeAliasDeclaration", n);
    n.id = this.visitBindingIdentifier(n.id);
    n.typeAnnotation = this.visitTsType(n.typeAnnotation);
    n.typeParams = this.visitTsTypeParameterDeclaration(n.typeParams);
    return n;
  }
  visitTsModuleDeclaration(n: TsModuleDeclaration): Declaration {
    // console.log("TsModuleDeclaration", n);
    n.id = this.visitTsModuleName(n.id);
    if (n.body) {
      n.body = this.visitTsNamespaceBody(n.body);
    }
    return n;
  }
  visitTsModuleName(n: TsModuleName): TsModuleName {
    // console.log("TsModuleName", n);
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
    }
  }
  visitTsNamespaceBody(n: TsNamespaceBody): TsNamespaceBody | undefined {
    // console.log("TsNamespaceBody", n);
    if (n) {
      switch (n.type) {
        case "TsModuleBlock":
          return this.visitTsModuleBlock(n);
        case "TsNamespaceDeclaration":
          return this.visitTsNamespaceDeclaration(n);
      }
    }
  }
  visitTsNamespaceDeclaration(
    n: TsNamespaceDeclaration
  ): TsModuleBlock | TsNamespaceDeclaration {
    // console.log("TsNamespaceDeclaration", n);
    const body = this.visitTsNamespaceBody(n.body);
    if (body) {
      n.body = body;
    }
    n.id = this.visitBindingIdentifier(n.id);
    return n;
  }
  visitTsModuleBlock(n: TsModuleBlock): TsModuleBlock | TsNamespaceDeclaration {
    // console.log("TsModuleBlock", n);
    n.body = this.visitModuleItems(n.body);
    return n;
  }
  visitTsInterfaceDeclaration(
    n: TsInterfaceDeclaration
  ): TsInterfaceDeclaration {
    // console.log("TsInterfaceDeclaration", n);
    n.id = this.visitBindingIdentifier(n.id);
    n.typeParams = this.visitTsTypeParameterDeclaration(n.typeParams);
    n.extends = this.visitTsExpressionsWithTypeArguments(n.extends);
    n.body = this.visitTsInterfaceBody(n.body);
    return n;
  }
  visitTsInterfaceBody(n: TsInterfaceBody): TsInterfaceBody {
    // console.log("TsInterfaceBody", n);
    n.body = this.visitTsTypeElements(n.body);
    return n;
  }
  visitTsTypeElements(nodes: TsTypeElement[]): TsTypeElement[] {
    // console.log("TsTypeElements", nodes);
    return nodes.map(this.visitTsTypeElement.bind(this));
  }
  visitTsTypeElement(n: TsTypeElement): TsTypeElement {
    // console.log("TsTypeElement", n);
    n.params = this.visitTsFnParameters(n.params);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitTsEnumDeclaration(n: TsEnumDeclaration): Declaration {
    // console.log("TsEnumDeclaration", n);
    n.id = this.visitIdentifier(n.id);
    n.members = this.visitTsEnumMembers(n.members);
    return n;
  }
  visitTsEnumMembers(nodes: TsEnumMember[]): TsEnumMember[] {
    // console.log("TsEnumMembers", nodes);
    return nodes.map(this.visitTsEnumMember.bind(this));
  }
  visitTsEnumMember(n: TsEnumMember): TsEnumMember {
    // console.log("TsEnumMember", n);
    n.id = this.visitTsEnumMemberId(n.id);
    n.init = this.visitOptionalExpression(n.init);
    return n;
  }
  visitTsEnumMemberId(n: TsEnumMemberId): TsEnumMemberId {
    // console.log("TsEnumMemberId", n);
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
    }
  }
  visitFunctionDeclaration(decl: FunctionDeclaration): Declaration {
    console.log("FunctionDeclaration", decl);
    decl.identifier = this.visitIdentifier(decl.identifier);
    decl = this.visitFunction(decl);
    return decl;
  }
  visitClassDeclaration(decl: ClassDeclaration): Declaration {
    // console.log("ClassDeclaration", decl);
    decl = this.visitClass(decl);
    decl.identifier = this.visitIdentifier(decl.identifier);
    return decl;
  }
  visitClassBody(members: ClassMember[]): ClassMember[] {
    // console.log("ClassBody", members);
    return members.map(this.visitClassMember.bind(this));
  }
  visitClassMember(member: ClassMember): ClassMember {
    // console.log("ClassMember", member);
    switch (member.type) {
      case "ClassMethod":
        return this.visitClassMethod(member);
      case "ClassProperty":
        return this.visitClassProperty(member);
      case "Constructor":
        return this.visitConstructor(member);
      case "PrivateMethod":
        return this.visitPrivateMethod(member);
      case "PrivateProperty":
        return this.visitPrivateProperty(member);
      case "TsIndexSignature":
        return this.visitTsIndexSignature(member);
    }
  }
  visitTsIndexSignature(n: TsIndexSignature): ClassMember {
    // console.log("TsIndexSignature", n);
    n.params = this.visitTsFnParameters(n.params);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitTsFnParameters(params: TsFnParameter[]): TsFnParameter[] {
    // console.log("TsFnParameters", params);
    return params.map(this.visitTsFnParameter.bind(this));
  }
  visitTsFnParameter(n: TsFnParameter): TsFnParameter {
    // console.log("TsFnParameter", n);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitPrivateProperty(n: PrivateProperty): ClassMember {
    // console.log("PrivateProperty", n);
    n.decorators = this.visitDecorators(n.decorators);
    n.key = this.visitPrivateName(n.key);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    n.value = this.visitOptionalExpression(n.value);
    return n;
  }
  visitPrivateMethod(n: PrivateMethod): ClassMember {
    // console.log("PrivateMethod", n);
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.function = this.visitFunction(n.function);
    n.key = this.visitPrivateName(n.key);
    return n;
  }
  visitPrivateName(n: PrivateName): PrivateName {
    // console.log("PrivateName", n);
    return n;
  }
  visitConstructor(n: Constructor): ClassMember {
    // console.log("Constructor", n);
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.key = this.visitPropertyName(n.key);
    n.params = this.visitConstructorParameters(n.params);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    return n;
  }
  visitConstructorParameters(
    nodes: (Param | TsParameterProperty)[]
  ): (Param | TsParameterProperty)[] {
    // console.log("ConstructorParameters", nodes);
    return nodes.map(this.visitConstructorParameter.bind(this));
  }
  visitConstructorParameter(
    n: Param | TsParameterProperty
  ): Param | TsParameterProperty {
    // console.log("ConstructorParameter", n);
    switch (n.type) {
      case "TsParameterProperty":
        return this.visitTsParameterProperty(n);
      default:
        return this.visitParameter(n);
    }
  }
  visitTsParameterProperty(
    n: TsParameterProperty
  ): TsParameterProperty | Param {
    // console.log("TsParameterProperty", n);
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.decorators = this.visitDecorators(n.decorators);
    n.param = this.visitTsParameterPropertyParameter(n.param);
    return n;
  }
  visitTsParameterPropertyParameter(
    n: TsParameterPropertyParameter
  ): TsParameterPropertyParameter {
    // console.log("TsParameterPropertyParameter", n);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitPropertyName(key: PropertyName): PropertyName {
    // console.log("PropertyName", key);
    switch (key.type) {
      case "Identifier":
        return this.visitBindingIdentifier(key);
      case "StringLiteral":
        return this.visitStringLiteral(key);
      case "NumericLiteral":
        return this.visitNumericLiteral(key);
      case "BigIntLiteral":
        return this.visitBigIntLiteral(key);
      default:
        return this.visitComputedPropertyKey(key);
    }
  }
  visitAccessibility(n: Accessibility | undefined): Accessibility | undefined {
    // console.log("Accessibility", n);
    return n;
  }
  visitClassProperty(n: ClassProperty): ClassMember {
    // console.log("ClassProperty", n);
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.decorators = this.visitDecorators(n.decorators);
    n.key = this.visitPropertyName(n.key);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    n.value = this.visitOptionalExpression(n.value);
    return n;
  }
  visitClassMethod(n: ClassMethod): ClassMember {
    // console.log("ClassMethod", n);
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.function = this.visitFunction(n.function);
    n.key = this.visitPropertyName(n.key);
    return n;
  }
  visitComputedPropertyKey(n: ComputedPropName): ComputedPropName {
    // console.log("ComputedPropertyKey", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitClass<T extends Class>(n: T): T {
    // console.log("Class", n);
    n.decorators = this.visitDecorators(n.decorators);
    n.superClass = this.visitOptionalExpression(n.superClass);
    n.superTypeParams = this.visitTsTypeParameterInstantiation(
      n.superTypeParams
    );
    if (n.implements) {
      n.implements = this.visitTsExpressionsWithTypeArguments(n.implements);
    }
    n.body = this.visitClassBody(n.body);
    return n;
  }
  visitFunction<T extends Fn>(n: T): T {
    // console.log("Function", n);
    n.decorators = this.visitDecorators(n.decorators);
    n.params = this.visitParameters(n.params);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    n.returnType = this.visitTsTypeAnnotation(n.returnType);
    n.typeParameters = this.visitTsTypeParameterDeclaration(n.typeParameters);
    return n;
  }
  visitTsExpressionsWithTypeArguments(
    nodes: TsExpressionWithTypeArguments[]
  ): TsExpressionWithTypeArguments[] {
    // console.log("TsExpressionsWithTypeArguments", nodes);
    return nodes.map(this.visitTsExpressionWithTypeArguments.bind(this));
  }
  visitTsExpressionWithTypeArguments(
    n: TsExpressionWithTypeArguments
  ): TsExpressionWithTypeArguments {
    // console.log("TsExpressionWithTypeArguments", n);
    n.expression = this.visitTsEntityName(n.expression);
    n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    return n;
  }
  visitTsTypeParameterInstantiation(
    n: TsTypeParameterInstantiation | undefined
  ): TsTypeParameterInstantiation | undefined {
    // console.log("TsTypeParameterInstantiation", n);
    if (n) {
      n.params = this.visitTsTypes(n.params);
    }
    return n;
  }
  visitTsTypes(nodes: TsType[]): TsType[] {
    // console.log("TsTypes", nodes);
    return nodes.map(this.visitTsType.bind(this));
  }
  visitTsEntityName(n: TsEntityName): TsEntityName {
    // console.log("TsEntityName", n);
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "TsQualifiedName":
        return this.visitTsQualifiedName(n);
    }
  }
  visitTsQualifiedName(n: TsQualifiedName): TsQualifiedName {
    // console.log("TsQualifiedName", n);
    n.left = this.visitTsEntityName(n.left);
    n.right = this.visitIdentifier(n.right);
    return n;
  }
  visitDecorators(nodes: Decorator[] | undefined): Decorator[] | undefined {
    // console.log("Decorators", nodes);
    if (nodes) {
      return nodes.map(this.visitDecorator.bind(this));
    }
  }
  visitDecorator(n: Decorator): Decorator {
    // console.log("Decorator", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitExpressionStatement(stmt: ExpressionStatement): Statement {
    // console.log("ExpressionStatement", stmt);
    stmt.expression = this.visitExpression(stmt.expression);
    return stmt;
  }
  visitContinueStatement(stmt: ContinueStatement): Statement {
    // console.log("ContinueStatement", stmt);
    if (stmt.label) {
      stmt.label = this.visitLabelIdentifier(stmt.label);
    }
    return stmt;
  }
  visitExpression(n: Expression): Expression {
    // console.log("Expression", n);
    switch (n.type) {
      case "ArrayExpression":
        return this.visitArrayExpression(n);
      case "ArrowFunctionExpression":
        return this.visitArrowFunctionExpression(n);
      case "AssignmentExpression":
        return this.visitAssignmentExpression(n);
      case "AwaitExpression":
        return this.visitAwaitExpression(n);
      case "BinaryExpression":
        return this.visitBinaryExpression(n);
      case "BooleanLiteral":
        return this.visitBooleanLiteral(n);
      case "CallExpression":
        return this.visitCallExpression(n);
      case "ClassExpression":
        return this.visitClassExpression(n);
      case "ConditionalExpression":
        return this.visitConditionalExpression(n);
      case "FunctionExpression":
        return this.visitFunctionExpression(n);
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXElement":
        return this.visitJSXElement(n);
      case "JSXEmptyExpression":
        return this.visitJSXEmptyExpression(n);
      case "JSXFragment":
        return this.visitJSXFragment(n);
      case "JSXMemberExpression":
        return this.visitJSXMemberExpression(n);
      case "JSXNamespacedName":
        return this.visitJSXNamespacedName(n);
      case "JSXText":
        return this.visitJSXText(n);
      case "MemberExpression":
        return this.visitMemberExpression(n);
      case "SuperPropExpression":
        return this.visitSuperPropExpression(n);
      case "MetaProperty":
        return this.visitMetaProperty(n);
      case "NewExpression":
        return this.visitNewExpression(n);
      case "NullLiteral":
        return this.visitNullLiteral(n);
      case "NumericLiteral":
        return this.visitNumericLiteral(n);
      case "ObjectExpression":
        return this.visitObjectExpression(n);
      case "ParenthesisExpression":
        return this.visitParenthesisExpression(n);
      case "PrivateName":
        return this.visitPrivateName(n);
      case "RegExpLiteral":
        return this.visitRegExpLiteral(n);
      case "SequenceExpression":
        return this.visitSequenceExpression(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
      case "TaggedTemplateExpression":
        return this.visitTaggedTemplateExpression(n);
      case "TemplateLiteral":
        return this.visitTemplateLiteral(n);
      case "ThisExpression":
        return this.visitThisExpression(n);
      case "TsAsExpression":
        return this.visitTsAsExpression(n);
      case "TsNonNullExpression":
        return this.visitTsNonNullExpression(n);
      case "TsTypeAssertion":
        return this.visitTsTypeAssertion(n);
      case "TsConstAssertion":
        return this.visitTsConstAssertion(n);
      case "UnaryExpression":
        return this.visitUnaryExpression(n);
      case "UpdateExpression":
        return this.visitUpdateExpression(n);
      case "YieldExpression":
        return this.visitYieldExpression(n);
      case "OptionalChainingExpression":
        return this.visitOptionalChainingExpression(n);
      case "Invalid":
        return n;
    }
  }
  visitOptionalChainingExpression(n: OptionalChainingExpression): Expression {
    // console.log("OptionalChainingExpression", n);
    n.base = this.visitExpression(n.base);
    return n;
  }
  visitAssignmentExpression(n: AssignmentExpression): Expression {
    // console.log("AssignmentExpression", n);
    n.left = this.visitPatternOrExpression(n.left);
    n.right = this.visitExpression(n.right);
    return n;
  }
  visitPatternOrExpression(n: Pattern | Expression): Pattern | Expression {
    // console.log("PatternOrExpression", n);
    switch (n.type) {
      case "ObjectPattern":
      case "ArrayPattern":
      case "Identifier":
      case "AssignmentPattern":
      case "RestElement":
        return this.visitPattern(n);
      default:
        return this.visitExpression(n);
    }
  }
  visitYieldExpression(n: YieldExpression): Expression {
    // console.log("YieldExpression", n);
    n.argument = this.visitOptionalExpression(n.argument);
    return n;
  }
  visitUpdateExpression(n: UpdateExpression): Expression {
    // console.log("UpdateExpression", n);
    n.argument = this.visitExpression(n.argument);
    return n;
  }
  visitUnaryExpression(n: UnaryExpression): Expression {
    // console.log("UnaryExpression", n);
    n.argument = this.visitExpression(n.argument);
    return n;
  }
  visitTsTypeAssertion(n: TsTypeAssertion): Expression {
    // console.log("TsTypeAssertion", n);
    n.expression = this.visitExpression(n.expression);
    n.typeAnnotation = this.visitTsType(n.typeAnnotation);
    return n;
  }
  visitTsConstAssertion(n: TsConstAssertion): Expression {
    // console.log("TsConstAssertion", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitTsNonNullExpression(n: TsNonNullExpression): Expression {
    // console.log("TsNonNullExpression", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitTsAsExpression(n: TsAsExpression): Expression {
    // console.log("TsAsExpression", n);
    n.expression = this.visitExpression(n.expression);
    n.typeAnnotation = this.visitTsType(n.typeAnnotation);
    return n;
  }
  visitThisExpression(n: ThisExpression): Expression {
    // console.log("ThisExpression", n);
    return n;
  }
  visitTemplateLiteral(n: TemplateLiteral): Expression {
    // console.log("TemplateLiteral", n);
    n.expressions = n.expressions.map(this.visitExpression.bind(this));
    return n;
  }
  visitParameters(n: Param[]): Param[] {
    // console.log("Parameters", n);
    return n.map(this.visitParameter.bind(this));
  }
  visitParameter(n: Param): Param {
    // console.log("Parameter", n);
    n.pat = this.visitPattern(n.pat);
    return n;
  }
  visitTaggedTemplateExpression(n: TaggedTemplateExpression): Expression {
    // console.log("TaggedTemplateExpression", n);
    n.tag = this.visitExpression(n.tag);
    const template = this.visitTemplateLiteral(n.template);
    if (template.type === "TemplateLiteral") {
      n.template = template;
    }
    return n;
  }
  visitSequenceExpression(n: SequenceExpression): Expression {
    // console.log("SequenceExpression", n);
    n.expressions = n.expressions.map(this.visitExpression.bind(this));
    return n;
  }
  visitRegExpLiteral(n: RegExpLiteral): Expression {
    // console.log("RegExpLiteral", n);
    return n;
  }
  visitParenthesisExpression(n: ParenthesisExpression): Expression {
    // console.log("ParenthesisExpression", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitObjectExpression(n: ObjectExpression): Expression {
    // console.log("ObjectExpression", n);
    if (n.properties) {
      n.properties = this.visitObjectProperties(n.properties);
    }
    return n;
  }
  visitObjectProperties(
    nodes: (Property | SpreadElement)[]
  ): (Property | SpreadElement)[] {
    // console.log("ObjectProperties", nodes);
    return nodes.map(this.visitObjectProperty.bind(this));
  }
  visitObjectProperty(n: Property | SpreadElement): Property | SpreadElement {
    // console.log("ObjectProperty", n);
    switch (n.type) {
      case "SpreadElement":
        return this.visitSpreadElement(n);
      default:
        return this.visitProperty(n);
    }
  }
  visitProperty(n: Property): Property | SpreadElement {
    // console.log("Property", n);
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifier(n);
      case "AssignmentProperty":
        return this.visitAssignmentProperty(n);
      case "GetterProperty":
        return this.visitGetterProperty(n);
      case "KeyValueProperty":
        return this.visitKeyValueProperty(n);
      case "MethodProperty":
        return this.visitMethodProperty(n);
      case "SetterProperty":
        return this.visitSetterProperty(n);
    }
  }
  visitSetterProperty(n: SetterProperty): Property | SpreadElement {
    // console.log("SetterProperty", n);
    n.key = this.visitPropertyName(n.key);
    n.param = this.visitPattern(n.param);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    return n;
  }
  visitMethodProperty(n: MethodProperty): Property | SpreadElement {
    // console.log("MethodProperty", n);
    n.key = this.visitPropertyName(n.key);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    n.decorators = this.visitDecorators(n.decorators);
    n.params = this.visitParameters(n.params);
    n.returnType = this.visitTsTypeAnnotation(n.returnType);
    n.typeParameters = this.visitTsTypeParameterDeclaration(n.typeParameters);
    return n;
  }
  visitKeyValueProperty(n: KeyValueProperty): Property | SpreadElement {
    // console.log("KeyValueProperty", n);
    n.key = this.visitPropertyName(n.key);
    n.value = this.visitExpression(n.value);
    return n;
  }
  visitGetterProperty(n: GetterProperty): Property | SpreadElement {
    // console.log("GetterProperty", n);
    n.key = this.visitPropertyName(n.key);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitAssignmentProperty(n: AssignmentProperty): Property | SpreadElement {
    // console.log("AssignmentProperty", n);
    n.key = this.visitIdentifier(n.key);
    n.value = this.visitExpression(n.value);
    return n;
  }
  visitNullLiteral(n: NullLiteral): NullLiteral {
    // console.log("NullLiteral", n);
    return n;
  }
  visitNewExpression(n: NewExpression): Expression {
    // console.log("NewExpression", n);
    n.callee = this.visitExpression(n.callee);
    if (n.arguments) {
      n.arguments = this.visitArguments(n.arguments);
    }
    n.typeArguments = this.visitTsTypeArguments(n.typeArguments);
    return n;
  }
  visitTsTypeArguments(
    n: TsTypeParameterInstantiation | undefined
  ): TsTypeParameterInstantiation | undefined {
    // console.log("TsTypeArguments", n);
    if (n) {
      n.params = this.visitTsTypes(n.params);
    }
    return n;
  }
  visitArguments(nodes: Argument[]): Argument[] {
    // console.log("Arguments", nodes);
    return nodes.map(this.visitArgument.bind(this));
  }
  visitArgument(n: Argument): Argument {
    // console.log("Argument", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitMetaProperty(n: MetaProperty): Expression {
    // console.log("MetaProperty", n);
    return n;
  }
  visitMemberExpression(n: MemberExpression): Expression {
    // console.log("MemberExpression", n);
    n.object = this.visitExpression(n.object);
    switch (n.property.type) {
      case "Computed": {
        n.property = this.visitComputedPropertyKey(n.property);
        return n;
      }
      case "Identifier": {
        n.property = this.visitIdentifier(n.property);
        return n;
      }
      case "PrivateName": {
        n.property = this.visitPrivateName(n.property);
        return n;
      }
    }
  }
  visitSuperPropExpression(n: SuperPropExpression): Expression {
    // console.log("SuperPropExpression", n);
    switch (n.property.type) {
      case "Computed": {
        n.property = this.visitComputedPropertyKey(n.property);
        return n;
      }
      case "Identifier": {
        n.property = this.visitIdentifier(n.property);
        return n;
      }
    }
  }
  visitCallee(n: Expression | Super | Import): Expression | Super | Import {
    // console.log("Callee", n);
    if (n.type === "Super" || n.type === "Import") {
      return n;
    }
    return this.visitExpression(n);
  }
  visitJSXText(n: JSXText): JSXText {
    // console.log("JSXText", n);
    return n;
  }
  visitJSXNamespacedName(n: JSXNamespacedName): JSXNamespacedName {
    // console.log("JSXNamespacedName", n);
    n.namespace = this.visitIdentifierReference(n.namespace);
    n.name = this.visitIdentifierReference(n.name);
    return n;
  }
  visitJSXMemberExpression(n: JSXMemberExpression): JSXMemberExpression {
    // console.log("JSXMemberExpression", n);
    n.object = this.visitJSXObject(n.object);
    n.property = this.visitIdentifierReference(n.property);
    return n;
  }
  visitJSXObject(n: JSXObject): JSXObject {
    // console.log("JSXObject", n);
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXMemberExpression":
        return this.visitJSXMemberExpression(n);
    }
  }
  visitJSXFragment(n: JSXFragment): JSXFragment {
    // console.log("JSXFragment", n);
    n.opening = this.visitJSXOpeningFragment(n.opening);
    if (n.children) {
      n.children = this.visitJSXElementChildren(n.children);
    }
    n.closing = this.visitJSXClosingFragment(n.closing);
    return n;
  }
  visitJSXClosingFragment(n: JSXClosingFragment): JSXClosingFragment {
    // console.log("JSXClosingFragment", n);
    return n;
  }
  visitJSXElementChildren(nodes: JSXElementChild[]): JSXElementChild[] {
    // console.log("JSXElementChildren", nodes);
    return nodes.map(this.visitJSXElementChild.bind(this));
  }
  visitJSXElementChild(n: JSXElementChild): JSXElementChild {
    // console.log("JSXElementChild", n);
    switch (n.type) {
      case "JSXElement":
        return this.visitJSXElement(n);
      case "JSXExpressionContainer":
        return this.visitJSXExpressionContainer(n);
      case "JSXFragment":
        return this.visitJSXFragment(n);
      case "JSXSpreadChild":
        return this.visitJSXSpreadChild(n);
      case "JSXText":
        return this.visitJSXText(n);
    }
  }
  visitJSXExpressionContainer(
    n: JSXExpressionContainer
  ): JSXExpressionContainer {
    // console.log("JSXExpressionContainer", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitJSXSpreadChild(n: JSXSpreadChild): JSXElementChild {
    // console.log("JSXSpreadChild", n);
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitJSXOpeningFragment(n: JSXOpeningFragment): JSXOpeningFragment {
    // console.log("JSXOpeningFragment", n);
    return n;
  }
  visitJSXEmptyExpression(n: JSXEmptyExpression): Expression {
    // console.log("JSXEmptyExpression", n);
    return n;
  }
  visitJSXElement(n: JSXElement): JSXElement {
    // console.log("JSXElement", n);
    n.opening = this.visitJSXOpeningElement(n.opening);
    n.children = this.visitJSXElementChildren(n.children);
    n.closing = this.visitJSXClosingElement(n.closing);
    return n;
  }
  visitJSXClosingElement(
    n: JSXClosingElement | undefined
  ): JSXClosingElement | undefined {
    // console.log("JSXClosingElement", n);
    if (n) {
      n.name = this.visitJSXElementName(n.name);
    }
    return n;
  }
  visitJSXElementName(n: JSXElementName): JSXElementName {
    // console.log("JSXElementName", n);
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXMemberExpression":
        return this.visitJSXMemberExpression(n);
      case "JSXNamespacedName":
        return this.visitJSXNamespacedName(n);
    }
  }
  visitJSXOpeningElement(n: JSXOpeningElement): JSXOpeningElement {
    // console.log("JSXOpeningElement", n);
    const jsxElement = this.tracingNode.peek(this.elements);
    const attribute = this.tracingNode.peek(this.attributes);
    n.name = this.visitJSXElementName(n.name);
    n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    n.attributes = this.visitJSXAttributeOrSpreads(n.attributes);

    if (jsxElement.isUndefined()) {
      console.log("Opening JSXElement");
      jsxElement.open(n);
    } else {
      if (
        n.name.type === "Identifier" &&
        attribute.getElementName() === "element"
      ) {
        jsxElement.setName(n.name.value);
      }
      if (
        attribute.getElementName() === "render" ||
        attribute.getElementName() === "element"
      ) {
        console.log(
          "Opening JSXElement within render attribute, Resetting identifier"
        );
        jsxElement.open(n);
        jsxElement.resetIdentifier();
      }
    }
    return n;
  }
  visitJSXAttributes(
    attrs: JSXAttributeOrSpread[] | undefined
  ): JSXAttributeOrSpread[] | undefined {
    // console.log("JSXAttributes", attrs);
    if (attrs) return attrs.map(this.visitJSXAttributeOrSpread.bind(this));
  }
  visitJSXAttributeOrSpread(n: JSXAttributeOrSpread): JSXAttributeOrSpread {
    // console.log("JSXAttributeOrSpread", n);
    switch (n.type) {
      case "JSXAttribute":
        return this.visitJSXAttribute(n);
      case "SpreadElement":
        return this.visitSpreadElement(n);
    }
  }

  visitJSXAttributeOrSpreads(
    nodes: JSXAttributeOrSpread[]
  ): JSXAttributeOrSpread[] {
    return nodes.map(this.visitJSXAttributeOrSpread.bind(this));
  }

  visitJSXAttribute(n: JSXAttribute): JSXAttributeOrSpread {
    // console.log("JSXAttribute", n);
    const attribute = this.tracingNode.peek(this.attributes);
    n.name = this.visitJSXAttributeName(n.name);
    n.value = this.visitJSXAttributeValue(n.value);
    if (attribute.isUndefined()) {
      console.log("Opening JSXAttribute");
      attribute.open(n);
    } else {
      console.log("Opening JSXAttribute");
      const newAttribute = new JSXAttributeClass();
      newAttribute.open(n);
      this.attributes.push(newAttribute);
    }
    return n;
  }
  visitJSXAttributeValue(
    n: JSXAttrValue | undefined
  ): JSXAttrValue | undefined {
    // console.log("JSXAttributeValue", n);
    if (!n) return n;
    switch (n.type) {
      case "BooleanLiteral":
        return this.visitBooleanLiteral(n);
      case "NullLiteral":
        return this.visitNullLiteral(n);
      case "NumericLiteral":
        return this.visitNumericLiteral(n);
      case "JSXText":
        return this.visitJSXText(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
      case "JSXElement":
        return this.visitJSXElement(n);
      case "JSXExpressionContainer":
        return this.visitJSXExpressionContainer(n);
      case "JSXFragment":
        return this.visitJSXFragment(n);
    }
    return n;
  }
  visitJSXAttributeName(n: JSXAttributeName): JSXAttributeName {
    // console.log("JSXAttributeName", n);
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXNamespacedName":
        return this.visitJSXNamespacedName(n);
    }
  }
  visitConditionalExpression(n: ConditionalExpression): Expression {
    // console.log("ConditionalExpression", n);
    n.test = this.visitExpression(n.test);
    n.consequent = this.visitExpression(n.consequent);
    n.alternate = this.visitExpression(n.alternate);
    return n;
  }
  visitCallExpression(n: CallExpression): Expression {
    // console.log("CallExpression", n);
    n.callee = this.visitCallee(n.callee);
    n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    if (n.arguments) {
      n.arguments = this.visitArguments(n.arguments);
    }
    return n;
  }
  visitBooleanLiteral(n: BooleanLiteral): BooleanLiteral {
    // console.log("BooleanLiteral", n);
    return n;
  }
  visitBinaryExpression(n: BinaryExpression): Expression {
    // console.log("BinaryExpression", n);
    n.left = this.visitExpression(n.left);
    n.right = this.visitExpression(n.right);
    return n;
  }
  visitAwaitExpression(n: AwaitExpression): Expression {
    // console.log("AwaitExpression", n);
    n.argument = this.visitExpression(n.argument);
    return n;
  }
  visitTsTypeParameterDeclaration(
    n: TsTypeParameterDeclaration | undefined
  ): TsTypeParameterDeclaration | undefined {
    // console.log("TsTypeParameterDeclaration", n);
    if (n) {
      n.parameters = this.visitTsTypeParameters(n.parameters);
    }
    return n;
  }
  visitTsTypeParameters(nodes: TsTypeParameter[]): TsTypeParameter[] {
    // console.log("TsTypeParameters", nodes);
    return nodes.map(this.visitTsTypeParameter.bind(this));
  }
  visitTsTypeParameter(n: TsTypeParameter): TsTypeParameter {
    // console.log("TsTypeParameter", n);
    if (n.constraint) {
      n.constraint = this.visitTsType(n.constraint);
    }
    if (n.default) {
      n.default = this.visitTsType(n.default);
    }
    n.name = this.visitIdentifierReference(n.name);
    return n;
  }
  visitTsTypeAnnotation(
    a: TsTypeAnnotation | undefined
  ): TsTypeAnnotation | undefined {
    // console.log("TsTypeAnnotation", a);
    if (a) {
      a.typeAnnotation = this.visitTsType(a.typeAnnotation);
    }
    return a;
  }
  visitTsType(n: TsType): TsType {
    // console.log("TsType", n);
    throw new Error("Method visitTsType not implemented.");
  }
  visitPatterns(nodes: Pattern[]): Pattern[] {
    // console.log("Patterns", nodes);
    return nodes.map(this.visitPattern.bind(this));
  }
  visitImportDeclaration(n: ImportDeclaration): ImportDeclaration {
    // console.log("ImportDeclaration", n);
    n.source = this.visitStringLiteral(n.source);
    n.specifiers = this.visitImportSpecifiers(n.specifiers || []);
    this.tracingNode.addImport({
      name: n.specifiers[0].local.value,
      path: n.source.value,
      hasDefault: n.specifiers[0].type === "ImportDefaultSpecifier",
      hasNamespace: n.specifiers[0].type === "ImportNamespaceSpecifier",
      named: n.specifiers
        .filter((s) => s.type === "ImportSpecifier")
        .map((s) => s.local.value),
    });

    // this.imports.set(n.source.value, {
    // });
    return n;
  }
  visitImportSpecifiers(nodes: ImportSpecifier[]): ImportSpecifier[] {
    // console.log("ImportSpecifiers", nodes);
    return nodes.map(this.visitImportSpecifier.bind(this));
  }
  visitImportSpecifier(node: ImportSpecifier): ImportSpecifier {
    // console.log("ImportSpecifier", node);
    switch (node.type) {
      case "ImportDefaultSpecifier":
        return this.visitImportDefaultSpecifier(node);
      case "ImportNamespaceSpecifier":
        return this.visitImportNamespaceSpecifier(node);
      case "ImportSpecifier":
        return this.visitNamedImportSpecifier(node);
    }
  }
  visitNamedImportSpecifier(node: NamedImportSpecifier): NamedImportSpecifier {
    // console.log("NamedImportSpecifier", node);
    node.local = this.visitBindingIdentifier(node.local);
    if (node.imported) {
      node.imported = this.visitIdentifierReference(node.imported);
    }
    return node;
  }
  visitImportNamespaceSpecifier(
    node: ImportNamespaceSpecifier
  ): ImportNamespaceSpecifier {
    // console.log("ImportNamespaceSpecifier", node);
    node.local = this.visitBindingIdentifier(node.local);
    return node;
  }
  visitImportDefaultSpecifier(node: ImportDefaultSpecifier): ImportSpecifier {
    // console.log("ImportDefaultSpecifier", node);
    node.local = this.visitBindingIdentifier(node.local);
    return node;
  }
  visitBindingIdentifier(i: Identifier): Identifier {
    // console.log("BindingIdentifier", i);
    return this.visitIdentifier(i);
  }
  visitIdentifierReference(i: Identifier): Identifier {
    // console.log("IdentifierReference", i);
    const jsxElement = this.tracingNode.peek(this.elements);
    const attribute = this.tracingNode.peek(this.attributes);
    if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
      console.log(`Identified JSXElement:  ${i.value}`);
      jsxElement.identify(i);
    } else if (attribute.isOpen() && !attribute.isIdentified()) {
      console.log(`Identified JSXAttribute: ${i.value}`);
      attribute.identify(i);
    }

    return this.visitIdentifier(i);
  }
  visitLabelIdentifier(label: Identifier): Identifier {
    // console.log("LabelIdentifier", label);
    return this.visitIdentifier(label);
  }
  visitIdentifier(n: Identifier): Identifier {
    // console.log("Identifier", n);
    return n;
  }
  visitStringLiteral(n: StringLiteral): StringLiteral {
    // console.log("StringLiteral", n);
    return n;
  }
  visitNumericLiteral(n: NumericLiteral): NumericLiteral {
    // console.log("NumericLiteral", n);
    return n;
  }
  visitBigIntLiteral(n: BigIntLiteral): BigIntLiteral {
    // console.log("BigIntLiteral", n);
    return n;
  }
  visitPattern(n: Pattern): Pattern {
    // console.log("Pattern", n);
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "ArrayPattern":
        return this.visitArrayPattern(n);
      case "ObjectPattern":
        return this.visitObjectPattern(n);
      case "AssignmentPattern":
        return this.visitAssignmentPattern(n);
      case "RestElement":
        return this.visitRestElement(n);
      default:
        return this.visitExpression(n);
    }
  }
  visitRestElement(n: RestElement): RestElement {
    // console.log("RestElement", n);
    n.argument = this.visitPattern(n.argument);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitAssignmentPattern(n: AssignmentPattern): Pattern {
    // console.log("AssignmentPattern", n);
    n.left = this.visitPattern(n.left);
    n.right = this.visitExpression(n.right);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitObjectPattern(n: ObjectPattern): Pattern {
    // console.log("ObjectPattern", n);
    n.properties = this.visitObjectPatternProperties(n.properties || []);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitObjectPatternProperties(
    nodes: ObjectPatternProperty[]
  ): ObjectPatternProperty[] {
    // console.log("ObjectPatternProperties", nodes);
    return nodes.map(this.visitObjectPatternProperty.bind(this));
  }
  visitObjectPatternProperty(n: ObjectPatternProperty): ObjectPatternProperty {
    // console.log("ObjectPatternProperty", n);
    switch (n.type) {
      case "AssignmentPatternProperty":
        return this.visitAssignmentPatternProperty(n);
      case "KeyValuePatternProperty":
        return this.visitKeyValuePatternProperty(n);
      case "RestElement":
        return this.visitRestElement(n);
    }
  }
  visitKeyValuePatternProperty(
    n: KeyValuePatternProperty
  ): ObjectPatternProperty {
    // console.log("KeyValuePatternProperty", n);
    n.key = this.visitPropertyName(n.key);
    n.value = this.visitPattern(n.value);
    return n;
  }
  visitAssignmentPatternProperty(
    n: AssignmentPatternProperty
  ): ObjectPatternProperty {
    // console.log("AssignmentPatternProperty", n);
    n.key = this.visitBindingIdentifier(n.key);
    n.value = this.visitOptionalExpression(n.value);
    return n;
  }
  visitArrayPattern(n: ArrayPattern): Pattern {
    // console.log("ArrayPattern", n);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    n.elements = this.visitArrayPatternElements(n.elements);
    return n;
  }
  visitArrayPatternElements(
    nodes: (Pattern | undefined)[]
  ): (Pattern | undefined)[] {
    // console.log("ArrayPatternElements", nodes);
    return nodes.map(this.visitArrayPatternElement.bind(this));
  }
  visitArrayPatternElement(n: Pattern | undefined): Pattern | undefined {
    // console.log("ArrayPatternElement", n);
    if (n) {
      n = this.visitPattern(n);
    }
    return n;
  }

  getTracingNode(): TracingNode {
    return this.tracingNode;
  }

  getImports() {
    return this.tracingNode.getImports();
  }

  getJSXElements() {
    return this.tracingNode.getJSXElements();
  }

  getHooks() {
    return this.hooks;
  }

  getExports() {
    return this.exports;
  }
}
