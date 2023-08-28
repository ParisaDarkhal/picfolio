const express = require("express"); //
const multer = require("multer");
const fs = require("fs/promises");

const path = require("path"); //
const PORT = process.env.PORT || 3001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Sets up the Express App
const app = express();

// to make it possible to make a POST request
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// To access the public/front-end content!
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", async (req, res) => {
  res.send("Server is running");
});

app.post("/upload", upload.single("myFile"), async (req, res) => {
  const file = req.file;
  const imgURL = `http://localhost:${PORT}/images/${file.originalname}`;
  res.json({ status: "success", url: imgURL });
});

app.get("/api/images", async (req, res) => {
  try {
    const imagesFolder = path.join(__dirname, "/public/images");
    const imageFiles = await fs.readdir(imagesFolder);
    res.json(imageFiles);
  } catch (error) {
    console.error("Error reading image files", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete(`/api/images/:imageName`, async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "/public/images", imageName);
    //delete img file
    await fs.unlink(imagePath);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log("🐱🐱🐱Server listening on: http://localhost:" + PORT);
});
