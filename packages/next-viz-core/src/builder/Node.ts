import { NodeData, TracingNode } from "../parser/TracingNode";

type DebugComponentType = "component" | "page";

interface Position {
  x: number;
  y: number;
}
class Node {
  public id: string;
  public position: Position = { x: 0, y: 0 };
  public data: NodeData;
  public debugType: DebugComponentType;
  public type = "nextviz";

  constructor(id: string, data: NodeData, type?: DebugComponentType) {
    this.id = id;
    this.data = {
      ...data,
      id,
    };
    this.debugType = type || "component";
  }
}

export default Node;
