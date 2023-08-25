import React from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";
import { Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Grid container spacing={3} mt={3} ml={2}>
        <Grid item xs={4}>
          <Upload />
        </Grid>
      </Grid>
    </>
  );
}
