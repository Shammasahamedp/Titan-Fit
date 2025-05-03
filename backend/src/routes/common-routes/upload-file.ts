import express from"express"
import { uploadMiddleware } from "../../middlewares/file-upload.middleware"
import upload from "../../utils/upload-file"
import {Request,Response,NextFunction} from "express"
import { commonErrors } from "../../messages/common-errors"

const uploadRoute = express.Router()

uploadRoute.post('/:field',(req:Request,res:Response,next:NextFunction)=>{
    upload.single(req.params.field)(req,res,(err:any)=>{
        if(err){
            console.log(err)
            res.status(400).json({success:false,message:commonErrors.FILE_UPLOAD_ERROR})
            return 
        }
        next()
    });
}
,uploadMiddleware)

export default uploadRoute

