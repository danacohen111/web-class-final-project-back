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
    ref: 'Post',  
    required: true,
  },
}, 
{ 
    timestamps: true
}); 

const commentModel = mongoose.model('Comments', commentSchema);

module.exports = commentModel;