import React, { useState } from "react";
import { Button, Box, Paper } from "@mui/material";

const DragAndDropUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleUpload = () => {
    // Here, you can handle the file upload logic
    console.log("Uploading file:", selectedFile);
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
