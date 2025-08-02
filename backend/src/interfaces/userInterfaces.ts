import { Document,Types } from "mongoose";
import { ISubscriptionDetails, IuserModel } from "../models/user/IuserModel";
import { ISubscriptionDocument } from "./subscriptionInterfaces";
import { IPaymentDocument } from "./paymentInterfaces";
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
    subscription?:ISubscriptionDetails[]
}

export interface IUsersForChat {
    id:string,
    name:string,
    profilePicture?:string
}

export interface IUserSubscriptionDetailsPopulated extends Omit<IUserDocument,'subscription'>{
    subscription: {
    planName: string;
    subscriptionId: ISubscriptionDocument; 
    paymentId: IPaymentDocument;           
    startDate: Date;
    endDate: Date;
    creditsRemaining: number;
    totalCredits: number;
    status: 'active' | 'completed';
  }[];
}

