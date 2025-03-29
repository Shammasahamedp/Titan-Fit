import { Document,Types } from "mongoose";
import { ITrainerModel } from "../models/trainer/ItrainerModel";
export interface ITrainerSignUp{
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    yearsOfExperience:number;
    trainerCertificate:string|null
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
    refreshToken:string
}
