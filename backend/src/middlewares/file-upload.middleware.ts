import {  Request,Response } from "express";
import { commonErrors } from "../messages/common-errors";
import { commonMessages } from "../messages/common";


export const uploadMiddleware = (req:Request,res:Response)=>{
    
        if(!req.file) {
            console.log('error in upload middleware')
            res.status(400).json({success:false,message:commonErrors.FILE_UPLOAD_ERROR})
        }
        if(req.file){
            console.log('this is req.file inside the uploadmiddleware',req.file)
            res.status(200).json({success:true,message:commonMessages.UPLOAD_FILE_SUCCESS,url:req.file.path})
        }
    
}