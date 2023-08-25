import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import DnDUpload from "./DnDUpload";
import axios from "axios";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile);
    const response = await axios.post("/upload", formData);
    console.log("response :>> ", response);
  };
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
