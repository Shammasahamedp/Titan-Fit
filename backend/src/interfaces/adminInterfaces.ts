import { Document,Types } from "mongoose";

export interface IAdminLogin{
    email:string;
    password:string
}

export interface IAdminDocument extends IAdminLogin, Document{
    _id:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date
}

export interface IAdminLoginResponse {
    admin:IAdminDocument;
    accessToken:string;
    refreshToken:string
}

