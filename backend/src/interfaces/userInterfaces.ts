import { Document,Types } from "mongoose";

export interface IUserSignUp{
    name:string;
    email:string;
    password:string;
    
    gender:string;
    age:number;
    fitnessGoal:string;
    fitnessLevel:string;
}

export interface IUserDocument extends IUserSignUp,Document{
    _id:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}