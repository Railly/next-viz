import dagre from "dagre";
import { useCallback, useState } from "react";
import { Edge, Node, Position } from "reactflow";
import { TracingNodeData } from "../components/TracingNode";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const useDagre = () => {
  const [nodeWidth, setNodeWidth] = useState(300);
  const [nodeHeight, setNodeHeight] = useState(300);

  const getLayoutedElements = useCallback(
    (nodes: Node<TracingNodeData>[], edges: Edge[], direction = "LR") => {
      const isHorizontal = direction === "LR";
      dagreGraph.setGraph({ rankdir: direction });

      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
      });

      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? Position.Left : Position.Top;
        node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

        node.position = {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
      });

      return { nodes, edges };
    },
    [nodeWidth, nodeHeight]
  );
  return { getLayoutedElements, setNodeWidth, setNodeHeight };
};
