import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import DnDUpload from "./DnDUpload";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {};
  return (
    <Box>
      <Paper>
        <TextField
          type="file"
          id="file-input"
          onChange={handleFileChange}
          fullWidth
          variant="outlined"
        ></TextField>
        {selectedFile && (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 5 }}
            onClick={handleUpload}
          >
            Upload
          </Button>
        )}
      </Paper>
      <DnDUpload />
    </Box>
  );
}
