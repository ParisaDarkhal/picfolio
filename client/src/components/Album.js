import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";

const Album = ({ newUpload, setNewUpload }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/images");
        const urls = response.data.map(
          (imageName) => `http://localhost:3001/images/${imageName}`
        );
        setImageUrls(urls);

        setNewUpload(false);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (newUpload) {
      const fetchImages = async () => {
        try {
          const response = await axios.get("/api/images");
          const urls = response.data.map(
            (imageName) => `http://localhost:3001/images/${imageName}`
          );
          setImageUrls(urls);
          console.log(urls);
          setNewUpload(false);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
      fetchImages();
    }
  }, [newUpload]);

  const handlePicClick = () => {};

  return (
    <Grid container>
      {imageUrls.map((imageUrl, index) => (
        <Grid
          item
          style={{ marginTop: 1, marginLeft: 5 }}
          sx={{
            transition: "transform 0.3s",
            cursor: "pointer",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            width={200}
            height={200}
            onClick={handlePicClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Album;
