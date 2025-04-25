import { Document,Types } from "mongoose";
import { IAdminModel } from "../models/admin/IAdminModel";

export interface IAdminLogin{
    email:string;
    password:string
}

export interface IAdminDocument extends IAdminModel, Document{
    _id:Types.ObjectId;
  
}

export interface IAdminLoginResponse {
    admin:IAdminDocument;
    accessToken:string;
    refreshToken:string
}

