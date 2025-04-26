import { Response } from "express"

export class AppError extends Error{
   protected statusCode:number
    constructor(message:string,statusCode:number){
         super(message)
         this.statusCode = statusCode
         Error.captureStackTrace(this,this.constructor)
    }
}

export const handleError = (res:Response,error :any)=>{
    const statusCode = error.statusCode || 500
    const message = error.message || 'something went wrong'
    res.status(statusCode).json({
           success:false,
           message
    })
}