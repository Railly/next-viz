import { Trigger, Content } from "@radix-ui/react-accordion";
import React from "react";
import * as s from "./styles";

interface TracingNodeImport {
  name: string;
  path: string;
  hasDefault: boolean;
  hasNamespace: boolean;
  named: string[];
}

interface IAccordionProps {
  fileName: string;
  imports: TracingNodeImport[];
}

const TracingAccordion: React.FC<IAccordionProps> = ({ fileName, imports }) => (
  <s.AccordionRoot type="single" defaultValue="item-1" collapsible>
    <s.AccordionItem value={`imports-${fileName}`}>
      <AccordionTrigger>Imports</AccordionTrigger>
      {imports.map((imp, index) => (
        <AccordionContent>
          <div className="AccordionContentText">- {imp.path}</div>
        </AccordionContent>
      ))}
    </s.AccordionItem>
  </s.AccordionRoot>
);

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ children, ...props }, forwardedRef) => (
  <s.AccordionHeader>
    <s.AccordionTrigger {...props} ref={forwardedRef}>
      {children}
      <s.AccordionChevron className="DownArrowIcon" aria-hidden />
    </s.AccordionTrigger>
  </s.AccordionHeader>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ children, ...props }, forwardedRef) => (
  <s.AccordionContent {...props} ref={forwardedRef}>
    <div className="AccordionContentText">{children}</div>
  </s.AccordionContent>
));

AccordionContent.displayName = "AccordionContent";

export default TracingAccordion;
