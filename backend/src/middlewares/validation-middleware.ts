import { Request,Response,NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema:ZodSchema<any>) =>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const result = schema.safeParse(req.body)

        if(!result.success){
             res.status(400).json({success:false,validationError:true,errorResult:result.error.format()})
             return
        }
        next()
    }
}