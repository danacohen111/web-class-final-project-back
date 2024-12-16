import mongoose from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  comments: mongoose.Schema.Types.ObjectId[];
}

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: String,
    senderID: {
      type: String,
      required: true,
    }
  });
  
  const postModel = mongoose.model<IPost>('Post', postSchema);

  export default postModel;