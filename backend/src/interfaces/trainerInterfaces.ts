import { Document,Types } from "mongoose";
import { ITrainerModel } from "../models/trainer/ItrainerModel";
import { IAvailabilityDocument } from "../models/availability/IavailabilityModel";
export interface ITrainerSignUp{
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    yearsOfExperience:number;
    bio:string
    trainerCertificate:string[]
}

export interface ITrainerLogin{
    email:string;
    password:string
}

export interface ITrainerDocument extends ITrainerModel,Document{
    _id:Types.ObjectId
}

export interface ITrainerLoginResponse{
    trainer:ITrainerDocument;
    accessToken:string;
    refreshToken:string;
    trainerNew?:boolean
}

export interface ITrainerProfile{
    name:string;
    email:string;
    gender:string;
    age:number;
    yearsOfExperience:number;
    bio:string;
    approved?:boolean;
    rejectedDate:Date;
    profilePicture?:string;
    trainerCertificate:string[]

}

export interface ITrainersAvailability extends ITrainerDocument{
    availability:IAvailabilityDocument
}

export interface ITrainersAvailabilityDocument extends ITrainersAvailability, Document {
    _id: Types.ObjectId;
  }
