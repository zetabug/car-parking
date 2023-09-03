import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Grid } from "@mui/material";

function Logout({ handleLogout }) {
  useEffect(() => {
    setTimeout(() => {
      handleLogout();
    }, 2000);
  }, []);
  return (
    <Grid container p={5}>
      <Grid item xs={12}>
        <h1>Logout</h1>
      </Grid>
      <Grid item xs={12}>
        You are successfully logged out. Redirecting you to login page now...
      </Grid>
    </Grid>
  );
}

export default Logout;
