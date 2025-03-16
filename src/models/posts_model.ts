import mongoose from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  user: mongoose.Schema.Types.ObjectId;
  comments: mongoose.Schema.Types.ObjectId[];
  realestate: mongoose.Schema.Types.ObjectId;
  userLikes: mongoose.Schema.Types.ObjectId[];
}

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    }, 
    realestate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Realestate',
        required: true
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    userLikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }]
  });
  
  const postModel = mongoose.model<IPost>('Post', postSchema);

  export default postModel;