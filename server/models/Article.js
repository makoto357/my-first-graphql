const mongoose = require('mongoose');

// data format (on mongoDB)
const ArticleSchema = new mongoose.Schema(
  {
    content: String,
    coverImage: String,
    summary: String,
    tag: {
      type: String,
      enum: ['Art', 'Art Market'],
    },
    title: String,
    // ObjectId (_id) is created automatically, when a new record is created in the collection
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
  },
  {
    timestamps: true,
  },
);

// export collection name (on mongoDB) and schema
module.exports = mongoose.model('Article', ArticleSchema);
