const File = require("../models/File");

const uploadFile = async (
  req,
  res
) => {
  try {
    const file = await File.create({
      fileName: req.file.originalname,
      filePath: req.file.filename,
      fileSize: `${(
        req.file.size /
        1024 /
        1024
      ).toFixed(2)} MB`,
    });

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFiles = async (
  req,
  res
) => {
  const files = await File.find();

  res.json(files);
};

module.exports = {
  uploadFile,
  getFiles,
};