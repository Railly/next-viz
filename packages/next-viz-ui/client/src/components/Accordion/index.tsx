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
  title: "Imports" | "JSXElements" | "LOC";
  fileName: string;
  data: any;
}

const TracingAccordion: React.FC<IAccordionProps> = ({
  title,
  fileName,
  data,
}) => {
  const firstTrigger = React.useRef<HTMLButtonElement>(null);
  const secondTrigger = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      {title === "Imports" && (
        <s.AccordionRoot type="multiple" defaultValue={["data-1"]}>
          <s.AccordionItem value={`imports-${fileName}`}>
            <AccordionTrigger
              ref={firstTrigger}
              hasContent={data.length > 0}
              isMain
            >
              {title}
            </AccordionTrigger>
            {data.map((imp: any, index: number) => (
              <AccordionContent noPadding key={`imports-${fileName}-${index}`}>
                <s.AccordionItem value={`imports-${fileName}-${index}`}>
                  <AccordionTrigger
                    prefix="-"
                    ref={secondTrigger}
                    hasContent={imp.named.length > 0}
                  >
                    {imp.path}
                  </AccordionTrigger>
                  {imp.named.length > 0 &&
                    imp.named.map((named: string, index: number) => (
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
      )}
      {title === "JSXElements" && (
        <s.CustomOption>
          {title}: {JSON.stringify(data.length)} elements
        </s.CustomOption>
      )}
      {title === "LOC" && <s.CustomOption>{data} lines of code</s.CustomOption>}
    </>
  );
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger> & {
    hasContent: boolean;
    isMain?: boolean;
  }
>(({ children, hasContent, ...props }, forwardedRef) => (
  <s.AccordionHeader>
    <s.AccordionTrigger {...props} ref={forwardedRef}>
      {children}
      {hasContent && (
        <s.AccordionChevron className="DownArrowIcon" aria-hidden />
      )}
    </s.AccordionTrigger>
  </s.AccordionHeader>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & { noPadding?: boolean }
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
