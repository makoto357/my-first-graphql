const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMedia');
const Video = require('../models/Video');

// POST using the upload middleware
router.post('/media', upload.array('files', 5), async (req, res) => {
  try {
    // Create a new Video object with the uploaded video details
    const video = new Video();
    video.title = req.body.title;
    video.url = [];
    // multiple file
    req.files.forEach(file => {
      video.url.push(file.location);
    });

    const savedVideo = await video.save();

    res.json({
      message: 'Video uploaded successfully',
      media: savedVideo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while uploading the video',
    });
  }
});

module.exports = router;
