import { NextFunction, Request,Response } from "express"
import { handleError } from "../utils/handleResponse"
import { usersMap } from "../config/socket"
export const registerWithSocket=async (req:Request,res:Response,next:NextFunction)=>{
   try {
     let userId = res.locals.user.userId
     if(usersMap.has(userId)){
        next()
     }
     usersMap
   } catch (error) {
     handleError(res,error)
   }
}