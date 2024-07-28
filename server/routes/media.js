const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
const Media = require("../models/Media");
const S3Service = require("../services/S3Service");
const s3Service = new S3Service();

// POST using the upload middleware
router.post(
  "/media",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const media = new Media();
      media.title = req.body.title;
      media.videoUrls = [];
      media.images = [];

      // multiple file
      const timestamp = Date.now().toString();
      const videoKey = `videos/${timestamp}`;
      const imageKey = `images/${timestamp}`;

      const videoUrls = await s3Service.uploadVideos(
        req.files,
        "claireawsbucket",
        "posts",
        videoKey
      );
      videoUrls.map((url) => {
        media.videoUrls.push(url);
      });

      const images = await s3Service.uploadImages(
        req.files,
        "claireawsbucket",
        "posts",
        imageKey
      );
      images.map((url) => {
        media.images.push(url);
      });

      const savedMedia = await media.save();
      res.json({
        savedMedia,
        message: "Media uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while uploading the video",
      });
    }
  }
);

module.exports = router;
