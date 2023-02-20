import { Import } from "./Import";
import { JSXElement } from "./JSXElement";
import { ParsableNode } from "./ParsableNode";

export interface NodeData {
  id: string;
  path: string;
  imports: Import[];
  linesOfCode: number;
  code: string;
  outDegree: number;
  inDegree: number;
  jsxElements: JSXElement[];
}

export class TracingNode extends ParsableNode {
  private JSXElements: JSXElement[] = [];
  private imports: Import[] = [];
  public timesUsed = 0;
  public code: string;

  constructor(path: string, code: string) {
    super(path);
    this.code = code;
  }

  addJSXElement(element: JSXElement): void {
    this.JSXElements.push(element);
  }

  getJSXElements(): JSXElement[] {
    return this.JSXElements;
  }

  addImport(imp: Import): void {
    this.imports.push(imp);
  }

  getImports(): Import[] {
    return this.imports;
  }

  hasJSXElements(): boolean {
    return this.JSXElements.length > 0;
  }

  getLinesOfCode(): number {
    const node = super.getNode();
    // console.log({ node });
    if (node) {
      return node.span.end - node.span.start;
      // } else {
      // throw new Error(
      //   `TracingNode.getLinesOfCode: This node has not been opened yet in ${super.getLocation()}`
      // );
    }
    return 0;
  }

  peek<T>(stack: T[]): T | undefined {
    if (stack.length !== 0) {
      return stack[stack.length - 1];
    }
  }

  getFormattedData(): NodeData {
    return {
      id: super.getId(),
      path: super.getPath(),
      imports: this.imports,
      linesOfCode: this.getLinesOfCode(),
      code: this.code,
      outDegree: this.JSXElements.length,
      inDegree: this.timesUsed,
      jsxElements: this.JSXElements,
    };
  }
}
