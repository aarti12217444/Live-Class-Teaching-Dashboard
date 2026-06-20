const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
  uploadFile,
  getFiles,
} = require(
  "../controllers/fileController"
);

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(null, "uploads/");
  },

  filename: (
    req,
    file,
    cb
  ) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

router.get("/", getFiles);

router.post(
  "/upload",
  upload.single("file"),
  uploadFile
);
router.get("/test", (req, res) => {
  res.send("File Route Working");
});
module.exports = router;