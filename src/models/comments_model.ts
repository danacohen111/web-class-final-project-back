import mongoose from 'mongoose';

export interface IComment {
  content: string;
  sender: string;
  post: mongoose.Schema.Types.ObjectId;
}

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

const commentModel = mongoose.model<IComment>('Comments', commentSchema);

export default commentModel;