import { ParsableNode } from "./ParsableNode";

export class JSXAttribute extends ParsableNode {
  private value: string | undefined;

  constructor() {
    super("");
  }

  setValue(value: string): void {
    if (!super.isOpen()) {
      throw new Error(
        `JSXAttribute.setValue: This attribute has not been opened yet in ${super.getLocation()}`
      );
    }

    if (!super.isIdentified()) {
      throw new Error(
        `JSXAttribute.setValue: This attribute has not been identified yet in ${super.getLocation()}`
      );
    }

    this.value = value;
  }

  getValue(): string {
    if (this.value) {
      return this.value;
    }
    throw new Error("This attribute has not been assigned a value yet.");
  }
}
