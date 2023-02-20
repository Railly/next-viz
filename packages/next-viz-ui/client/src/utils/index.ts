import TracingEdge from "../components/TracingEdge";
import TracingNode from "../components/TracingNode";

export const nodeTypes = {
  nextviz: TracingNode,
};

export const edgeTypes = {
  nextviz: TracingEdge,
};

export const defaultEdgeOptions = {
  type: "nextViz",
  markerEnd: "edge-circle",
};
