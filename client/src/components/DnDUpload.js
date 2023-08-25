import React, { useState } from "react";
import { Button, Box, Paper } from "@mui/material";
import axios from "axios";

const DragAndDropUpload = ({ setNewUpload }) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgURL, setImgURL] = useState("");

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
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
    <Paper>
      <Box
        border={dragOver ? 2 : 1}
        borderColor={dragOver ? "primary.main" : "text.secondary"}
        borderRadius={1}
        p={5}
        mt={5}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        textAlign="center"
        sx={{ cursor: "pointer" }}
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>Drag and drop a file here or click to select</p>
        )}
      </Box>
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
  );
};

export default DragAndDropUpload;
