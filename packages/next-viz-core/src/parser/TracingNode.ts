import { Import } from "./Import";
import { JSXElement } from "./JSXElement";
import { ParsableNode } from "./ParsableNode";

export class TracingNode extends ParsableNode {
  private JSXElements: Map<string, JSXElement> = new Map();
  private imports: Import[] = [];
  public timesUsed = 0;
  public code: string;

  constructor(path: string, code: string) {
    super(path);
    this.code = code;
  }

  addJSXElement(element: JSXElement): void {
    if (!super.isOpen()) {
      throw new Error(
        `TracingNode.addJSXElement: This node has not been opened yet in ${super.getLocation()}`
      );
    }
    this.JSXElements.set(element.getId(), element);
  }

  getJSXElement(id: string): JSXElement | undefined {
    const element = this.JSXElements.get(id);
    if (element) {
      return element;
    }
    throw new Error(
      `TracingNode.getJSXElement: This node does not have an element with id ${id} in ${super.getLocation()}`
    );
  }

  getJSXElements(): Map<string, JSXElement> {
    return this.JSXElements;
  }

  addImport(imp: Import): void {
    if (!super.isOpen()) {
      throw new Error(
        `TracingNode.addImport: This node has not been opened yet in ${super.getLocation()}`
      );
    }
    this.imports.push(imp);
  }

  getImports(): Import[] {
    return this.imports;
  }

  hasJSXElements(): boolean {
    return this.JSXElements.size > 0;
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
}
