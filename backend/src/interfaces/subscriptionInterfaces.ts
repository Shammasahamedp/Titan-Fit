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

export interface ISubscriptionTableData{
    id:string,
    name:string,
                    planName:string
                    status:string
                    totalCredits:number,
                    creditsRemaining:number
}

export interface ISingleUserSubscriptions{
    planName:string,
        subscriptionId: Types.ObjectId|string,
        paymentId: Types.ObjectId|string,
        startDate: Date,
        endDate: Date,
        creditsRemaining:number,
        totalCredits:number,
        status:'active'|'completed',
}