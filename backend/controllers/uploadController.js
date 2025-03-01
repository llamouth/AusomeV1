const cloudinary = require("cloudinary");
const express = require("express");
const multer = require("multer");

const cloudinaryRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinaryRoute.post("/", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Upload image to Cloudinary
      cloudinary.v2.uploader.upload_stream(
        { folder: "ausome" }, // Cloudinary folder
        (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
  
          return res.json({ imageUrl: result.secure_url }); // Send Cloudinary URL back to frontend
        }
      ).end(req.file.buffer);
  
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
});

module.exports = cloudinaryRoute;
