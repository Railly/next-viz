import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { styled, keyframes } from "@stitches/react";

export const AccordionRoot = styled(Accordion.Root, {
  borderRadius: "6px",
  width: "300px",
  backgroundColor: "var(--mauve6)",
  boxShadow: "0 2px 10px var(--blackA4)",
});

export const AccordionItem = styled(Accordion.Item, {
  overflow: "hidden",
  marginTop: "1px",
  "&:first-child": {
    marginTop: "0",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },

  "&:last-child": {
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },

  "&:focus-within": {
    position: "relative",
    zIndex: "1",
    boxShadow: "0 0 0 2px var(--mauve12)",
  },
});

export const AccordionTrigger = styled(Accordion.Trigger, {
  fontFamily: "inherit",
  padding: "0 20px",
  height: "45px",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "15px",
  lineHeight: "1",
  color: "white",
  boxShadow: "0 1px 0 var(--mauve6)",
  backgroundColor: "#282F33",
  cursor: "pointer",
  border: "none",

  "&[data-state=open] .DownArrowIcon": {
    transform: "rotate(180deg)",
  },

  "&:hover": {
    backgroundColor: "#363636",
    transition: "background-color 0.2s ease",
  },
  variants: {
    isMain: {
      true: {
        backgroundColor: "#1D2124",
        "&:hover": {
          backgroundColor: "#1D2124",
        },
      },
    },
  },
});

export const AccordionHeader = styled("div", {
  display: "flex",
});

export const AccordionChevron = styled(ChevronDownIcon, {
  color: "var(--violet10)",
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
});

export const slideDown = keyframes({
  from: {
    height: 0,
  },
  to: {
    height: "var(--radix-accordion-content-height)",
  },
});

export const slideUp = keyframes({
  from: {
    height: "var(--radix-accordion-content-height)",
  },
  to: {
    height: 0,
  },
});

export const AccordionContent = styled(Accordion.Content, {
  overflow: "hidden",
  borderTop: "1.5px dashed white",
  "&[data-state=open]": {
    animation: `${slideDown} 300ms ease-out`,
  },
  "&[data-state=closed]": {
    animation: `${slideUp} 300ms ease-out`,
  },
  "& .AccordionContentText": {
    padding: "5px 20px",
  },
});

export const CustomOption = styled("div", {
  fontFamily: "inherit",
  padding: "16px 20px",
  height: "45px",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "15px",
  lineHeight: "1",
  color: "white",
  boxShadow: "0 1px 0 var(--mauve6)",
  backgroundColor: "#0E2642",
  cursor: "pointer",
  borderTop: "1.5px dashed white",

  "&[data-state=open] .DownArrowIcon": {
    transform: "rotate(180deg)",
  },

  "&:hover": {
    backgroundColor: "#363636",
    transition: "background-color 0.2s ease",
  },
  variants: {
    isMain: {
      true: {
        backgroundColor: "#1D2124",
        "&:hover": {
          backgroundColor: "#1D2124",
        },
      },
    },
  },
});
