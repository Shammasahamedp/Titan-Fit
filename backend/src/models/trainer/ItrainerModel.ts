import { Types,Document } from "mongoose";

export interface ITrainerModel extends Document{
    name?:string;
    email?:string;
    password?:string;
    gender?:string;
    age?:number;
    phone?:string;
    bio?:string;
    profilePicture?:string;
    trainerCertificate:string[];
    yearsOfExperience?:number;
    approved:boolean;
    blocked:boolean
    availableSlots?:Types.ObjectId;
    priceForSession?:number;
    googleId?:string,
    isGoogleAuthenticated:boolean
}