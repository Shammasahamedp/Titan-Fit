import { NextFunction, Request,Response } from "express";
import { commonErrors } from "../messages/common-errors";
import jwt from 'jsonwebtoken'
export const jwtTokenVerify = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            res.status(401).json({success:false,message:commonErrors.INVALID_JWT_TOKEN})
            return 
        }
        console.log('this is token in jwt',token)
        console.log('decodedtoken',jwt.decode(token))
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) 
         console.log('this is decoded',decoded)
        res.locals.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:commonErrors.INVALID_JWT_TOKEN})
    }
}
