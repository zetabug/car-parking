import React from "react";
import { Box, Link } from "@mui/material";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car Parking Dashboard
          </Typography>
          <Button
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/dashboard"
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/bills"
          >
            View Bill History
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            component={RouterLink}
            to="/logout"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
