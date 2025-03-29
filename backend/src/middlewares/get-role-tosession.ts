import { NextFunction, Request,Response } from "express"
import { commonErrors } from "../messages/common-errors"
declare module "express-session"{
    interface SessionData{
        role?:string
    }
}
export const getRole = (req:Request,res:Response,next:NextFunction)=>{
   if(req.params){
    const {role} = req.params
    req.session.role = role
    next()
   }else{
    res.status(400).json({success:false,message:commonErrors.NEED_ROLE})
   }
}