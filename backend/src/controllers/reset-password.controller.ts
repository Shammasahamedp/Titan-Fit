import { commonMessages } from "../messages/common";
import { commonErrors } from "../messages/common-errors";
import { emailMessages } from "../messages/mail-related";
import { IResetPasswordService } from "../services/reset-password/IResetPasswordService";
import { Request,Response } from "express";
import { handleError } from "../utils/handleResponse";

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
         handleError(res,error)
      }
   }

   async verifyLink(req:Request,res:Response){
      try {
         await this.resetPasswordService.verifyLink(req.body.password,req.body.token)
         res.status(200).json({success:true,message:commonMessages.PASSWORD_UPDATE_SUCCESS})
      } catch (error:any) {
        handleError(res,error)
      }
   }
}