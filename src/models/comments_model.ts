import mongoose from 'mongoose';

export interface IComment {
  content: string;
  user: mongoose.Schema.Types.ObjectId;
  post: mongoose.Schema.Types.ObjectId;
}

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',  
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