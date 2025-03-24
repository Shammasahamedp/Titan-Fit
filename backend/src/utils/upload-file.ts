import multer,{FileFilterCallback} from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary";
import { Request } from "express";

const getFolderName = (fieldName:string):string=>{
    switch(fieldName){
        case "trainerCertificate":
            return "trainer_certificate"
        default:return "others"
    }
}

const storage = new CloudinaryStorage({
    cloudinary,
    params:async (req:Request,file:Express.Multer.File)=>(console.log('this is file.fieldname',file.fieldname),{
        
        folder : getFolderName(file.fieldname),
        format:file.mimetype.split("/")[1],
        public_id:Date.now()+"-"+file.originalname
    })
})

const fileFilter = (req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{
    const allowedFileTypes = ["image/jpeg","image/png","application/pdf"]
    if(allowedFileTypes.includes(file.mimetype)){
        console.log('this is inside filefilter')
        cb(null,true)
    }else{
        console.log('this is inside else case of filefilter')
        cb(new Error("Only JPG,PNG, and PDF files are allowed"))
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:fileFilter
})

export default upload