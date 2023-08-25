import React from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";
import DnDUpload from "./DnDUpload";
import Album from "./Album";
import { Grid } from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
  const [newUpload, setNewUpload] = useState(false);
  return (
    <>
      <Navbar />
      <Grid container spacing={3} mt={3} ml={2}>
        <Grid item xs={3}>
          <Upload setNewUpload={setNewUpload} />
          <DnDUpload setNewUpload={setNewUpload} />
        </Grid>
        <Grid item xs={9}>
          <Album setNewUpload={setNewUpload} newUpload={newUpload} />
        </Grid>
      </Grid>
    </>
  );
}
