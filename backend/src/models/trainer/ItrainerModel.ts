import { Types,Document } from "mongoose";

export interface ITrainerModel extends Document{
    name:string;
    email:string;
    password:string;
    gender:string;
    age:number;
    phone?:number;
    bio:string;
    profilePicture?:string;
    trainerCertificate:string;
    yearsOfExperience:number;
    approved:boolean;
    availableSlots?:Types.ObjectId;
    priceForSession?:number;
    googleId?:string
}