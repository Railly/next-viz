import { Identifier, JSXElementName, Node, HasSpan } from "@swc/core";

interface Location {
  start: number | null;
  end: number | null;
}

export class ParsableNode {
  private path: string;
  private location: Location | undefined;
  private node: (Node & HasSpan) | undefined;
  private name: string | undefined;

  constructor(path: string) {
    this.path = path;
  }
  getNode(): (Node & HasSpan) | undefined {
    return this.node;
  }

  open(node: Node & HasSpan): void {
    this.node = node;
    this.location = { start: this.node.span.start, end: this.node.span.end };
  }
  isOpen(): boolean {
    return !!this.node;
  }
  close(node: Node): boolean {
    return node === this.node;
  }
  isUndefined(): boolean {
    return this.node === undefined;
  }
  isIdentified(): boolean {
    return !!this.name;
  }
  identify(identifier: Identifier | JSXElementName): void {
    if (this.node === undefined) {
      throw new Error(
        "ParsableElement.identify: This component has not been opened yet."
      );
    }
    console.log(
      "TODO: You should check identifier type before calling this method."
    );
    this.name = identifier.type;
  }
  setName(name: string): void {
    this.name = name;
  }
  resetIdentifier(): void {
    this.name = undefined;
  }

  getElementName(): string {
    if (!this.isOpen()) {
      throw new Error(
        "ParsableElement.getElementName: This component has not been opened yet."
      );
    }

    if (this.name) {
      return this.name;
    }
    throw new Error("This component has not been identified yet.");
  }

  getLocation(): Location {
    if (this.location === undefined) {
      throw new Error(
        "ParsableElement.getLocation: This component has not been opened yet."
      );
    }
    return this.location;
  }

  getId(): string {
    return `${this.getPath()}:${this.getElementName()}`;
  }

  getPath(): string {
    return this.path;
  }
}
