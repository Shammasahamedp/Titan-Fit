import { Document } from "mongoose"

export interface IAdminModel extends Document{
    
    email:string,
    password:string,
    createdAt:Date,
    updatedAt:Date
}