import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@stitches/react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Background,
  ConnectionLineType,
} from "reactflow";

import { useDagre } from "./hooks/useDagre";
import { defaultEdgeOptions, edgeTypes, nodeTypes } from "./utils";

const GraphPanelContainer = styled("div", {
  height: "100vh",
  width: "100vw",
});

const Flow = () => {
  const { getLayoutedElements } = useDagre();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const getTestNodes = useCallback(async () => {
    const response = await window.fetch("/api/tracing-nodes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log({ data });
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      data.nodes,
      data.edges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, []);

  useEffect(() => {
    getTestNodes();
  }, []);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  // const onLayout = useCallback(
  //   (direction: string) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } =
  //       getLayoutedElements(nodes, edges, direction);

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges]
  // );

  return (
    <GraphPanelContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
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
      {/* <div className="controls">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </div> */}
    </GraphPanelContainer>
  );
};

export default Flow;
