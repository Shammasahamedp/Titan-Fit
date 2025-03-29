import mongoose, { Schema, Types } from "mongoose";
import { ITrainerModel } from "./ItrainerModel";


const TrainerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String },
    age: { type: String },
    phone: { type: Number },
    bio: { type: String },
    profilePicture: { type: String },
    trainerCertificate: { type: String },
    yearsOfExperience: { type: Number },
    approved: { type: Boolean, default: false },
    availableSlots: { type: Types.ObjectId },
    priceForSession: { type: Number },
    googleId:{type:String}
  },
  { timestamps: true }
);

export const trainerModel = mongoose.model<ITrainerModel>(
  "Trainer",
  TrainerSchema
);
