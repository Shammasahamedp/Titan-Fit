import { Types ,Document } from "mongoose";

export interface ISubscriptionDetails{
    subscriptionId:Types.ObjectId|string,
    paymentId:Types.ObjectId|string,
    startDate:Date,
    endDate:Date,
    creditsRemaining:number,
    status:'active'|'completed'
}

export interface IuserModel extends Document {
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    fitnessGoal:string;
    fitnessLevel:string;
    subscription?:ISubscriptionDetails;
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