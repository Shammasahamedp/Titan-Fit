import { Types ,Document } from "mongoose";
export interface IuserModel extends Document {
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    fitnessGoal:string;
    fitnessLevel:string;
    subscriptionId?:Types.ObjectId;
    phone?:number;
    profilePicture?:string;
    weight?:number;
    height?:number;
    mealPlanId?:Types.ObjectId;
    blocked:boolean;
    testimonialId?:Types.ObjectId,
    googleId:string;
    isGoogleAuthenticated:boolean
    
}