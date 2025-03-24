import { Document,Types } from "mongoose";

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

export interface ITrainerDocument extends ITrainerSignUp,Document{
    _id:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date
}

export interface ITrainerLoginResponse{
    trainer:ITrainerDocument;
    accessToken:string;
    refreshToken:string
}
