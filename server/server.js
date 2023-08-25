const express = require("express"); //
const multer = require("multer");

const path = require("path"); //
const PORT = process.env.PORT || 3001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
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
  res.send("success");
  console.log("file :>> ", file);
});

app.listen(PORT, () => {
  console.log("🐱🐱🐱Server listening on: http://localhost:" + PORT);
});
