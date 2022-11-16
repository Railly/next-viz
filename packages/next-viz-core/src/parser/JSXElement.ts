import { JSXAttribute } from "./JSXAttribute";
import { ParsableNode } from "./ParsableNode";

export class JSXElement extends ParsableNode {
  private attributes: Map<string, JSXAttribute> = new Map();
  private conditional = false;
  public isRouteElement = false;

  constructor(path: string) {
    super(path);
  }

  getId(): string {
    return `${super.getPath()}:${this.getName()}:${super.getLocation().start}:${
      super.getLocation().end
    }`;
  }

  addAttribute(attribute: JSXAttribute): void {
    if (!super.isOpen()) {
      throw new Error(
        `JSXElement.addAttribute: This element has not been opened yet in ${super.getLocation()}`
      );
    }
    this.attributes.set(attribute.getElementName(), attribute);
  }

  getAttribute(key: string): JSXAttribute | undefined {
    const attribute = this.attributes.get(key);
    if (attribute) {
      return attribute;
    }
    throw new Error(
      `JSXElement.getAttribute: This element does not have an attribute named ${key} in ${super.getLocation()}`
    );
  }

  getAttributes(): Map<string, JSXAttribute> {
    return this.attributes;
  }

  setIsConditional(): void {
    this.conditional = true;
  }

  isConditional(): boolean {
    return this.conditional;
  }

  isRoute(): boolean {
    return this.isRouteElement;
  }

  getName(): string {
    if (
      super.getElementName() === "Route" &&
      this.attributes.has("component")
    ) {
      try {
        const component = this.getAttribute("component");
        return component?.getValue() || "";
      } catch (error) {
        return super.getElementName();
      }
    } else {
      return super.getElementName();
    }
  }
}
