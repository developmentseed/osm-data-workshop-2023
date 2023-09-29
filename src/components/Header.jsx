import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { Weekend } from "@mui/icons-material";
function Header() {
  return (
    <AppBar position="static" sx={{ height: "48px", marginBottom: "10px" }}>
      <Toolbar
        variant="dense"
        sx={{ height: "48px", paddingLeft: "24px", paddingRight: "24px" }}
      >
        <Weekend sx={{ mr: 2 }} fontSize="large" />
        <Typography variant="h6" sx={{ mr: 3 }}>
          DEVELOPMENT<label style={{ color: "#ed4700" }}>SEED</label>
        </Typography>
        <Typography variant="label">POD WEEK 2023</Typography>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
