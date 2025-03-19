import { Types } from "mongoose";
export interface IuserModel {
    
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    fitnessGoal:string;
    fitnessLevel:string;
    subscriptionId:Types.ObjectId;
    phone:number;
    profilePicture:string;
    weight:number;
    height:number;
    mealPlanId:Types.ObjectId;
    blocked:boolean;
    testimonialId:Types.ObjectId
    createdAt:Date;
    updatedAt:Date;
}