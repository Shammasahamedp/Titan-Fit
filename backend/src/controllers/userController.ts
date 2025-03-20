import { ILoginResponse } from "../interfaces/userInterfaces";
import { userMessages } from "../messages/userRelated";
import { IUserService } from "../services/user/IuserService";
import { Request,Response } from "express";

export class UserController {
    private userService:IUserService

    constructor(userService:IUserService){
        this.userService = userService
    }

    async registerUser(req:Request,res:Response):Promise<void>{
        try {
            const user = await this.userService.registerUser(req.body)
            res.status(201).json({success:true,data:user,message:userMessages.SIGNUP_SUCCESS})
        } catch (error:any) {
            res.status(400).json({success:false,message:error.message})
        }
    }

    async loginUser (req:Request,res:Response):Promise<void>{
        try {
            const loginResults= await this.userService.loginUser(req.body)
            res.cookie('refreshToken',loginResults?.refreshToken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
                sameSite:"strict"
            })
            const data = {
                user:loginResults?.user,
                accessToken:loginResults?.accessToken
            }
            res.status(200).json({success:true,data,message:userMessages.LOGIN_SUCCESS})
        } catch (error:any) {
            res.status(401).json({success:false,message:userMessages.LOGIN_FAILED})
        }
    }
}