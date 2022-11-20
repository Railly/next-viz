import { Import } from "./Import";
import { JSXElement } from "./JSXElement";
import { ParsableNode } from "./ParsableNode";

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
    // if (!super.isOpen()) {
    //   throw new Error(
    //     `TracingNode.addImport: This node has not been opened yet in ${super.getLocation()}`
    //   );
    // }
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
    if (node) {
      return node.span.end - node.span.start;
    } else {
      throw new Error(
        `TracingNode.getLinesOfCode: This node has not been opened yet in ${super.getLocation()}`
      );
    }
  }

  peek<T>(stack: T[]): T {
    return stack[stack.length - 1];
  }

  extractData() {
    return {
      path: super.getPath(),
      imports: this.imports,
      code: this.code,
    };
  }
}
