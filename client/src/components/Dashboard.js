import React from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";
import DnDUpload from "./DnDUpload";
import Album from "./Album";
import { Grid } from "@mui/material";
import { useState } from "react";
import MyAlbum from "./PhotoAlbumPage";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Dashboard() {
  const [newUpload, setNewUpload] = useState(false);
  const [index, setIndex] = useState(-1);
  const [imageUrls, setImageUrls] = useState([]);

  return (
    <>
      <Navbar />
      <Grid container spacing={3} mt={3} ml={2}>
        <Grid item xs={3}>
          <Upload setNewUpload={setNewUpload} />
          <DnDUpload setNewUpload={setNewUpload} />
        </Grid>
        <Grid item xs={9}>
          {/* <Album setNewUpload={setNewUpload} newUpload={newUpload} /> */}
          <MyAlbum
            setNewUpload={setNewUpload}
            newUpload={newUpload}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            setIndex={setIndex}
          />
          <Lightbox
            slides={imageUrls}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </Grid>
      </Grid>
    </>
  );
}
