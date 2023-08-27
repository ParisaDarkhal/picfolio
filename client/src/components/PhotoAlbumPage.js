import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoAlbum from "react-photo-album";
import { Button, Card } from "@mui/material";

const MyAlbum = ({
  newUpload,
  setNewUpload,
  imageUrls,
  setImageUrls,
  setIndex,
}) => {
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/images");
        const images = response.data.map((imgname) => {
          const src = `http://localhost:3001/images/${imgname}`;
          const img = new Image();
          img.src = src;
          if (img.width > img.height) {
            img.width = 400;
            img.height = 300;
          } else {
            img.width = 300;
            img.height = 400;
          }
          return img;
        });

        const urls = images.map((image) => ({
          key: image.src,
          src: image.src,
          width: image.width,
          height: image.height,
        }));
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
          const images = response.data.map((imgName) => {
            const src = `http://localhost:3001/images/${imgName}`;
            const img = new Image();
            img.src = src;
            if (img.width > img.height) {
              img.width = 400;
              img.height = 300;
            } else {
              img.width = 300;
              img.height = 400;
            }
            return img;
          });

          const urls = images.map((image) => ({
            key: image.src,
            src: image.src,
            width: image.width,
            height: image.height,
          }));
          setImageUrls(urls);
          setNewUpload(false);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
      fetchImages();
    }
  }, [newUpload]);

  const handleDelete = (index) => {};

  return (
    <>
      <PhotoAlbum
        columns={(containerWidth) => {
          if (containerWidth < 400) return 2;
          if (containerWidth < 800) return 3;
          return 4;
        }}
        layout="masonry"
        photos={imageUrls}
        onClick={({ index }) => setIndex(index)}
        renderPhoto={({
          imageProps: { src, alt, style, ...restImageProps },
        }) => (
          <Card
            style={{
              border: "solid black 1px",
              margin: "10px",
              padding: "5px",
            }}
          >
            <img src={src} alt={alt} style={style} {...restImageProps} />
            <Button
              variant="contained"
              color="error"
              sx={{ mb: 1 }}
              onClick={({ index }) => handleDelete(index)}
            >
              Delete
            </Button>
          </Card>
        )}
      />
    </>
  );
};

export default MyAlbum;
