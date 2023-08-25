import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import DnDUpload from "./DnDUpload";
import axios from "axios";

export default function Upload({ setNewUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile);
    const response = await axios.post("/upload", formData);
    setImgURL(response.data.url);
    setNewUpload(true);
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
    </Box>
  );
}
