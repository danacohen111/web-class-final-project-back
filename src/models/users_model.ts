import mongoose from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    _id?: string,
    refreshTokens?: string[],
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
      },
    refreshTokens: {
        type: [String],
        default: [],
  }
});

const userModel = mongoose.model<IUser>("Users", userSchema);

export default userModel;