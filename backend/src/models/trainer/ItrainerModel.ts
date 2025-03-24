import { Types } from "mongoose";

export interface ITrainerModel{
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    phone:number;
    bio:string;
    profilePicture:string;
    trainerCertificate:string;
    yearsOfExperience:number;
    approved:boolean;
    availableSlots:Types.ObjectId;
    priceForSession:number;
    createdAt:Date;
    updatedAt:Date;
}