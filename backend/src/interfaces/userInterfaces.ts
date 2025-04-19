import { Document,Types } from "mongoose";
import { IuserModel } from "../models/user/IuserModel";
export interface IUserSignUp{
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    fitnessGoal:string;
    fitnessLevel:string;
}

export interface IUserLogin{
    email:string;
    password:string
}

export interface IUserDocument extends IuserModel,Document{
    _id:Types.ObjectId
}

export interface ILoginResponse  {
    user:IUserDocument;
    accessToken:string;
    refreshToken:string;
    userNew?:boolean
}

export interface  IUserProfile {
    name:string;
    email:string;
    gender:string;
    age:number;
    fitnessGoal:string;
    fitnessLevel:string;
    phone?:number;
    profilePicture?:string;
    weight?:number;
    height?:number;
}

