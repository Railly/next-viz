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

const TracingAccordion: React.FC<IAccordionProps> = ({ fileName, imports }) => {
  const firstTrigger = React.useRef<HTMLButtonElement>(null);
  const secondTrigger = React.useRef<HTMLButtonElement>(null);

  return (
    <s.AccordionRoot type="multiple" defaultValue="item-1" collapsible>
      <s.AccordionItem value={`imports-${fileName}`}>
        <AccordionTrigger ref={firstTrigger}>Imports</AccordionTrigger>
        {console.log({ imports })}
        {imports.map((imp, index) => (
          <AccordionContent noPadding key={`imports-${fileName}-${index}`}>
            <s.AccordionItem value={`imports-${fileName}-${index}`}>
              <AccordionTrigger prefix="-" ref={secondTrigger}>
                {imp.path}
              </AccordionTrigger>
              {imp.named.length > 0 &&
                imp.named.map((named, index) => (
                  <AccordionContent
                    key={`imports-${fileName}-${index}-${named}`}
                  >
                    <div className="AccordionContentText">- {named}</div>
                  </AccordionContent>
                ))}
            </s.AccordionItem>
          </AccordionContent>
        ))}
      </s.AccordionItem>
    </s.AccordionRoot>
  );
};

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
>(({ children, noPadding, ...props }, forwardedRef) => (
  <s.AccordionContent {...props} ref={forwardedRef}>
    <div
      className={
        noPadding ? "AccordionContentNoPadding" : "AccordionContentText"
      }
    >
      {children}
    </div>
  </s.AccordionContent>
));

AccordionContent.displayName = "AccordionContent";

export default TracingAccordion;
