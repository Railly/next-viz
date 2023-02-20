import { styled } from "@stitches/react";

export const TitleContainer = styled("div", {
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

export const TransparentButton = styled("button", {
  border: "none",
  background: "none",
  cursor: "pointer",
  padding: "0",
  margin: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
