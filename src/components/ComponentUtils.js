import { styled } from "@mui/system";
import { Button, ListItem } from "@mui/material";

export const CustomBox = styled("div")({
  width: "100%",
  height: "calc(100vh - 64px - 10px)",
  overflow: "auto",
});
export const CustomBoxAside = styled(CustomBox)({
  padding: "10px",
});

export const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export const CustomButton = styled(Button)({
  width: "100%",
  marginBottom: 10,
});

export const CustomListItem = styled(ListItem)({
  paddingBottom: 0,
  paddingTop: 0,
});
