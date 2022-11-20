import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import TracingAccordion from "./Accordion";
import { AccordionChevron } from "./Accordion/styles";
import CloudIcon from "./CloudIcon";

export type TracingNodeData = {
  path: string;
  imports: any[];
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
            <div className="title">{data.path}</div>
            <TransparentButton className="dots">
              <DotsVerticalIcon />
            </TransparentButton>
          </TitleContainer>
          {/* {data.icon && <div className="icon">{data.icon}</div>} */}
          {console.log({
            imports: data.imports,
          })}
          <TracingAccordion fileName="index.tsx" imports={data.imports} />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
};

export default memo(VizTracingNode);
