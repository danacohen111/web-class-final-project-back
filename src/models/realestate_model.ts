import mongoose from "mongoose";

export interface IRealestate {
    city: string;
    address: string;
    owner: mongoose.Types.ObjectId; 
    description: string;
    area: string; 
    location: string; 
    }

const Schema = mongoose.Schema;
const realestateSchema = new Schema<IRealestate>({
  city: {
        type: String,
        required: true
    },
    address: {
      type: String,
      required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    description:{
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    location:{
      type: String,
      required: true
    }
    })

const realestateModel = mongoose.model<IRealestate>("Realestate", realestateSchema);
export default realestateModel;