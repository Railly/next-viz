import { JSXElement } from "../parser/JSXElement";
import { TracingNode } from "../parser/TracingNode";
import Edge from "./Edge";
import Node from "./Node";
const glob = require("fast-glob");

export class Graph {
  public nodes: Node[] = [];
  private tracingNodes: Map<string, TracingNode>;
  public edges: Edge[] = [];
  public rootFolderPath: string;

  constructor(tracingNodes: Map<string, TracingNode>, rootFolderPath: string) {
    this.tracingNodes = tracingNodes;
    this.rootFolderPath = rootFolderPath;
  }

  build(pages: string[]): void {
    console.log("[Graph Builder] Building graph...");
    pages.forEach((page) => {
      const pageNode = this.tracingNodes.get(page);
      if (pageNode) {
        console.log(`[Graph Builder] Adding page: ${page}`);
        const jsxElements = pageNode.getJSXElements();
        pageNode.timesUsed++;
        const root = this.createNode(
          pageNode.getElementName(),
          pageNode,
          "page"
        );
        this.buildPageTree(root, jsxElements);
        // this.buildPageComponents(root, jsxElements);
      }
    });
  }

  private buildPageTree(root: Node, jsxElements: JSXElement[]): void {
    jsxElements.forEach((jsxElement) => {
      const tracingNode = this.tracingNodes.get(jsxElement.getPath());
      if (tracingNode) {
        tracingNode.timesUsed++;
        if (jsxElement.getElementName().match(/^[A-Z]/)) {
          console.log(
            `[Graph Builder] Adding component: ${jsxElement.getElementName()}`
          );
          const id = `${root.id}:${jsxElement.getElementName()}`;
          if (!this.nodes.find((node) => node.id === id)) {
            if (root.id.split(":").includes(jsxElement.getElementName())) {
              console.log("Found a circular reference");
              return;
            }
            const node = this.createNode(id, tracingNode, "component");
            this.createEdge(root, node);
          } else {
            console.log(`[Graph Builder] Node already exists: ${id}`);
          }
        }
      }
    });
  }

  private buildPageComponents(root: Node, jsxElements: JSXElement[]): void {
    // console.log({ jsxElements });
    jsxElements.forEach((jsxElement) => {
      const jsxElementName = jsxElement.getElementName();
      return glob([`**/${jsxElementName}.jsx`], {
        ignore: ["**/node_modules/**"],
        cwd: this.rootFolderPath,
      });
    });
  }

  private createNode(
    id: string,
    tracingNode: TracingNode,
    componentType: "page" | "component"
  ): Node {
    const node = new Node(id, tracingNode.getFormattedData(), componentType);
    this.nodes.push(node);
    return node;
  }

  private createEdge(source: Node, target: Node): Edge {
    const edge = new Edge(target.id, source.id, target.id);
    this.edges.push(edge);
    return edge;
  }

  public toString(): string {
    return JSON.stringify(
      {
        nodes: this.nodes,
        edges: this.edges,
      },
      null,
      2
    );
  }
}
