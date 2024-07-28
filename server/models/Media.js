const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrls: { type: Array },
  images: { type: Array },
});

module.exports = mongoose.model("Media", MediaSchema);
