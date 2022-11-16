import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Background,
} from "reactflow";

import "reactflow/dist/base.css";
import "./index.css";
import TracingNode, { TracingNodeData } from "./components/TracingNode";
import TracingEdge from "./components/TracingEdge";
import FunctionIcon from "./components/FunctionIcon";
import FileIcon from "./components/FileIcon";
import { styled } from "@stitches/react";

const initialNodes: Node<TracingNodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { icon: <FunctionIcon />, title: "readFile", subline: "api.ts" },
    type: "nextviz",
  },
  {
    id: "2",
    position: { x: 350, y: 0 },
    data: { icon: <FunctionIcon />, title: "bundle", subline: "apiContents" },
    type: "nextviz",
  },
  {
    id: "3",
    position: { x: 0, y: 350 },
    data: { icon: <FunctionIcon />, title: "readFile", subline: "sdk.ts" },
    type: "nextviz",
  },
  {
    id: "4",
    position: { x: 350, y: 350 },
    data: { icon: <FunctionIcon />, title: "bundle", subline: "sdkContents" },
    type: "nextviz",
  },
  {
    id: "5",
    position: { x: 700, y: 225 },
    data: { icon: <FunctionIcon />, title: "concat", subline: "api, sdk" },
    type: "nextviz",
  },
  {
    id: "6",
    position: { x: 1050, y: 225 },
    data: { icon: <FileIcon />, title: "fullBundle" },
    type: "nextviz",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
  },
];

const nodeTypes = {
  nextviz: TracingNode,
};

const edgeTypes = {
  nextviz: TracingEdge,
};

const defaultEdgeOptions = {
  type: "tracingEdge",
  markerEnd: "edge-circle",
};

const GraphPanelContainer = styled("div", {
  height: "100vh",
  width: "100vw",
});

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <GraphPanelContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls showInteractive={false} />
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#1FAAE5" />
              <stop offset="100%" stopColor="#3C64EE" />
            </linearGradient>

            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle
                stroke="#2a8af6"
                strokeOpacity="0.75"
                r="2"
                cx="0"
                cy="0"
              />
            </marker>
          </defs>
        </svg>
        <Background />
      </ReactFlow>
    </GraphPanelContainer>
  );
};

export default Flow;
