import mongoose, { Schema, Document, Types } from "mongoose";
import { IuserModel } from "./IuserModel";

interface IuserDocument extends IuserModel, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number },
    profilePicture: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String },
    fitnessGoal: { type: String },
    fitnessLevel: { tyep: String },
    subscriptionId: { type: Types.ObjectId },
    mealPlanId: { type: Types.ObjectId },
    testimonialId: { type: Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IuserDocument>("User", UserSchema);
