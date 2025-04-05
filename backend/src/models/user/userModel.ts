import mongoose, { Schema, Types } from "mongoose";
import { IuserModel } from "./IuserModel";


const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    profilePicture: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String , },
    fitnessGoal: { type: String ,required:true},
    fitnessLevel: { type: String ,required:true},
    subscriptionId: { type: Types.ObjectId },
    mealPlanId: { type: Types.ObjectId },
    testimonialId: { type: Types.ObjectId },
    googleId:{type:String},
   
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IuserModel>("User", UserSchema);
