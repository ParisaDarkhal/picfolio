import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoAlbum from "react-photo-album";

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
        style={{
          transition: "transform 0.3s",
          cursor: "pointer",
          "&:hover": { transform: "scale(1.1)" },
        }}
        onClick={({ index }) => setIndex(index)}
      />
    </>
  );
};

export default MyAlbum;
