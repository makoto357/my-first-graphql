const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  content: String,
  cover_image: String,
  created_at: String,
  status: String,
  summary: String,
  tag: String,
  title: String,
  updated_at: String,
  // ObjectId (_id) is created automatically, when a new record is created in the collection
  authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
});

// export name of object, and schema
module.exports = mongoose.model('Article', ArticleSchema);
