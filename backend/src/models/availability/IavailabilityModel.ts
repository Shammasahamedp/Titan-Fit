import { Types,Document } from "mongoose";

export interface ISlot{
    startTime:string,
    isBooked:boolean,
    userId?:string
}

export interface IAvailableDate{
    date: Date,
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

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  fitnessLevel?:string
}

export interface ISlotPopulated {
  startTime: string;
  isBooked: boolean;
  userId?: string;
  userDetails?: IUserInfo | null;
}

export interface IAvailableDatePopulated {
  date: string;
  isCompleted: boolean;
  timeSlots: ISlotPopulated[];
}

export interface IBookedSessionData {
  date: string;
  isCompleted: boolean;
  timeSlot: ISlotPopulated;
}

export interface IAvailabilityPopulated {
  // _id: string;
  // trainerId: string;
  availability: IBookedSessionData[];
  totalPages:number
}

export interface IUserBookedSessionData{
   trainerName: string,
    trainerEmail: string,
    date: string,
    startTime: string,
    isCompleted: false
}

export interface IUserBookedSessionPopulated{
   sessions:IUserBookedSessionData[];
   totalPages:number
}

export interface IUserBookedSessionTableData{
  sessions:IUserBookedSessionDetails,
  totalPages:number
}


export interface IBookedSessionDetails {
    name:string;
    user:string,
    userId:string,
    email:string;
    fitnessLevel:string;
    date:Date;
    time:string;
    status:'upcoming'|'completed'|'user attended'
}

export interface IUserBookedSessionDetails{
  trainer:string;
  email:string;
  date:Date;
  time:string;
  status:'upcoming'|'completed'|'attended'
}