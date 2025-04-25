import { commonMessages } from "../messages/common";
import { commonErrors } from "../messages/common-errors";
import { emailMessages } from "../messages/mail-related";
import { IResetPasswordService } from "../services/reset-password/IResetPasswordService";
import { Request,Response } from "express";

export class ResetPasswordController{
   private resetPasswordService:IResetPasswordService

   constructor(resetPasswordService:IResetPasswordService){
    this.resetPasswordService = resetPasswordService
   }

   async sendLink(req:Request,res:Response){
      try {
       await this.resetPasswordService.sendLink(req.body.email)
       res.status(200).json({success:true,message:emailMessages.TOKEN_SEND_SUCCESSFULL})
      } catch (error:any) {
         console.log(error)
        res.status(400).json({success:false,message:emailMessages.TOKEN_SEND_FAILURE})
      }
   }

   async verifyLink(req:Request,res:Response){
      try {
         await this.resetPasswordService.verifyLink(req.body.password,req.body.token)
         res.status(200).json({success:true,message:commonMessages.PASSWORD_UPDATE_SUCCESS})
      } catch (error:any) {
         if(error.message){
            res.status(400).json({success:false,message:error.message})
            return
         }
         res.status(400).json({success:false,message:commonErrors.RESET_PASSWORD_ERROR})
      }
   }
}