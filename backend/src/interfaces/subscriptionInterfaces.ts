import { IsubscriptionModel } from "../models/subscription/IsubscriptionModel";
import { Document,Types } from "mongoose";
export interface ISubscription{
    planName:string;
    price:number,
    description:string;
    durationInMonth:number;
    credits:number;
    isActive:boolean
}

export interface ISubscriptionDocument extends IsubscriptionModel ,Document{
   _id:Types.ObjectId
}

export interface IStripePlan{
    _id:string;
    title:string;
    price:number;
}