import { Request } from "express";

export interface IGoogleAuthenticatedRequest extends Request{
       user?:{
    email:string,
    role:string,
    googleId:string
   }
}