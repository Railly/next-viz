import { memo, useEffect } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import * as s from "./styles";
import DialogDemo from "../Dialog";
import TracingAccordion from "../Accordion";
import DropdownMenuDemo from "../Dropdown";

export type TracingNodeData = {
  id: string;
  path: string;
  imports: any[];
  code: string;
  outDegree: number;
  inDegree: number;
  linesOfCode: number;
  jsxElements: any[];
};

const VizTracingNode = ({ data }: NodeProps<TracingNodeData>) => {
  const title = data.id.split(":").length > 1 ? data.id.split(":")[1] : data.id;
  const isMain = title.includes("/");

  return (
    <>
      {isMain && (
        <div className="cloud gradient">
          <div>
            <DropdownMenuDemo code={data.code} title={title} />
          </div>
        </div>
      )}
      <div className="wrapper gradient">
        <div className="inner">
          <s.TitleContainer>
            <div className="title">{title}</div>
          </s.TitleContainer>
          <TracingAccordion
            title="Imports"
            fileName={data.path}
            data={data.imports}
          />
          {isMain && (
            <TracingAccordion
              title="JSXElements"
              fileName={data.path}
              data={data.jsxElements}
            />
          )}
          {isMain && (
            <TracingAccordion
              title="LOC"
              fileName={data.path}
              data={
                data.code.split(`
`).length
              }
            />
          )}
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
};

export default memo(VizTracingNode);
