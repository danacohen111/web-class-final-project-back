const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',  // This links the comment to a specific post
    required: true,
  },
}, { timestamps: true }); // Adds `createdAt` and `updatedAt` fields

const commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;