import { commonMessages } from "../messages/common";
import { commonErrors } from "../messages/common-errors";
import { IAuthService } from "../services/auth/Iauth-service";
import { Request,Response } from "express";

export class AuthController {
    private authService:IAuthService

    constructor(authService:IAuthService){
        this.authService = authService
    }

    async  findUserOrTrainerByEmail (req:Request,res:Response):Promise<void>{
        try {
           const isTrue= await this.authService.findUserOrTrainerByEmail(req.query.email as string)
            if(isTrue){
                res.status(409).json({success:false,message:commonErrors.EMAIL_ALREADY_EXIST})
            }else {
                res.status(200).json({success:true,message:commonMessages.NO_DUPLICATE_EMAIL})
            }

        } catch (error) {
            res.status(400).json({success:false,message:commonErrors.ERROR_EMAIL_CHECK})
        }
    }

    async googleLogin(req:Request,res:Response):Promise<void>{
        try {
            
            if(res.locals.user){
            const {email,role,googleId} = res.locals.user
           const loginResponseData=await this.authService.handleGoogleLogin(role,email,googleId)
           if(loginResponseData){
            res.cookie('refreshToken',loginResponseData?.refreshToken,{
                httpOnly:true,
                secure:false,
                sameSite:"lax"
            })
            res.status(200).json({success:true,message:commonMessages.GOOGLE_LOGIN_SUCCESS,data:loginResponseData})
           }else{
            res.status(400).json({success:false,message:commonErrors.GOOGLE_LOGIN_FAILURE})
           }
        }
            
            
        } catch (error) {
            res.status(400).json({success:false,message:commonErrors.GOOGLE_LOGIN_FAILURE,error})
        }
    }

    async logout (req:Request,res:Response):Promise<void>{
        try {
            res.clearCookie('refreshToken',{
                httpOnly:true,
                secure:false,
                sameSite:"lax"
            })
            res.status(200).json({success:true,message:commonMessages.LOGOUT_SUCCESS})
        } catch (error) {
            res.status(400).json({success:false,message:commonErrors.LOGOUT_FAILURE})
        }
    }
}