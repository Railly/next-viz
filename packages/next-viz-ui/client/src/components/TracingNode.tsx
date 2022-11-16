import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import TracingAccordion from "./Accordion";
import { AccordionChevron } from "./Accordion/styles";
import CloudIcon from "./CloudIcon";

export type TracingNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

const TitleContainer = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  width: "100%",
  "& .dots": {
    position: "absolute",
    right: "0.5rem",
  },
});

const BodyContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const TransparentButton = styled("button", {
  border: "none",
  background: "none",
  cursor: "pointer",
  padding: "0",
  margin: "0",
});

const VizTracingNode = ({ data }: NodeProps<TracingNodeData>) => {
  return (
    <>
      {/* <div className="cloud gradient">
        <div>
          <CloudIcon />
        </div>
      </div> */}
      <div className="wrapper gradient">
        <div className="inner">
          <TitleContainer>
            <div className="title">{data.title}</div>
            <TransparentButton className="dots">
              <DotsVerticalIcon />
            </TransparentButton>
          </TitleContainer>
          {/* {data.icon && <div className="icon">{data.icon}</div>} */}
          <TracingAccordion
            fileName="index.tsx"
            imports={[
              {
                name: "React",
                path: "react",
                hasDefault: true,
                hasNamespace: false,
                named: [],
              },
              {
                name: "styled",
                path: "@stitches/react",
                hasDefault: false,
                hasNamespace: false,
                named: ["styled"],
              },
            ]}
          />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
};

export default memo(VizTracingNode);
