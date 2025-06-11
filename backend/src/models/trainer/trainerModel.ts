import mongoose, { Schema, Types } from "mongoose";
import { ITrainerDocument } from "../../interfaces/trainerInterfaces";


const TrainerSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    gender: { type: String },
    age: { type: String },
    phone: { type: Number },
    bio: { type: String },
    profilePicture: { type: String },
    trainerCertificate: { type: [String] },
    yearsOfExperience: { type: Number },
    approved: { type: Boolean, default: false },
    blocked:{type:Boolean,default:false},
    // availableSlots: { type: Types.ObjectId },
    rejectedDate:{type:Date},
    priceForSession: { type: Number },
    googleId:{type:String},
    isGoogleAuthenticated:{type:Boolean,default:false}
  },
  { timestamps: true }
);
TrainerSchema.index({name:'text'})
export const trainerModel = mongoose.model<ITrainerDocument>(
  "Trainer",
  TrainerSchema
);
