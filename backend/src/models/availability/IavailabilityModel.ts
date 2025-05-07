import { Types,Document } from "mongoose";

export interface ISlot{
    startTime:string,
    isBooked:boolean,
    userId?:string
}

export interface IAvailableDate{
    date:string,
    timeSlots:ISlot[]
    isCompleted:boolean
}

export interface IAvailability extends Document{
    trainerId:Types.ObjectId,
    availability:IAvailableDate[]
}

export interface IAvailabilityDocument extends IAvailability,Document{
    _id:Types.ObjectId
}