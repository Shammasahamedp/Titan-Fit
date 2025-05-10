import mongoose, { Schema, Types } from "mongoose";
import { IUserDocument } from "../../interfaces/userInterfaces";


const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String},
    phone: { type: String },
    profilePicture: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String , },
    fitnessGoal: { type: String },
    fitnessLevel: { type: String },
    subscription: [
      {
        planName:{type:String,required:true},
        subscriptionId: { type: Types.ObjectId, ref: 'Subscription', required: true },
        paymentId: { type: Types.ObjectId, ref: 'Payment', required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        creditsRemaining: { type: Number, required: true },
        totalCredits:{type:Number,required:true},
        status: { type: String, enum: ['active', 'completed'], default: 'active' },
      },
    ],
    blocked:{type:Boolean,default:false},
    mealPlanId: { type: Types.ObjectId },
    testimonialId: { type: Types.ObjectId },
    googleId:{type:String},
    isGoogleAuthenticated:{type:Boolean,default:false}
   
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IUserDocument>("User", UserSchema);
