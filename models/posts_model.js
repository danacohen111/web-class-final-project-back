const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: String,
    owner: {
      type: String,
      required: true,
    },
    comments: {
        type: Array,
        default: []
    }
  });
  
  const postModel = mongoose.model("Posts", postSchema);
  
  module.exports = postModel;