import { commonMessages } from "../messages/common";
import { commonErrors } from "../messages/common-errors";
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
                sameSite:"lax"
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
    async getProfile(req:Request,res:Response):Promise<void>{
        try {
            const userProfile = await this.userService.getUserProfile(res.locals.user?.userId)
            if(userProfile){
                res.status(200).json({success:true,userProfile,message:userMessages.GET_PROFILE_SUCCESS})
            }

        } catch (error:any) {
            res.status(400).json({success:false,message:error.message})
        }
    }
    async editProfile(req:Request,res:Response):Promise<void>{
        try {
            const returnUserData = await this.userService.editUserProfile(res.locals.user?.userId,req.body)
            if(returnUserData){
                res.status(200).json({success:true,message:userMessages.EDIT_PROFILE_SUCCESS,returnUserData})
            }
        } catch (error:any) {
            res.status(400).json({success:false,message:userMessages.EDIT_PROFILE_FAILURE})
        }
    }
    async addProfileImage(req:Request,res:Response):Promise<void>{
        try {
            console.log('this is url',req.body)
            console.log('this is url',req.body.userProfileImage)

            const image = await this.userService.addProfilePic(res.locals.user?.userId,req.body.userProfileImage)
            if(image){
                res.status(200).json({success:true,message:userMessages.ADD_PROFILE_IMAGE_SUCCESS,image})
            }
        } catch (error:any) {
              res.status(400).json({success:false,message:userMessages.ADD_PROFILE_IMAGE_FAILURE})
        }
    }
    async checkPassword(req:Request,res:Response):Promise<void>{
        try {
            const isTrue = await this.userService.checkPassword(res.locals.user.userId,req.body.password)
            if(!isTrue){
                res.status(400).json({success:false,message:userMessages.PASSWORD_CHECK_FAILURE})
                return 
            }
            res.status(200).json({success:true,message:userMessages.PASSWORD_CHECK_SUCCESS})
        } catch (error) {
            res.status(400).json({success:false,message:userMessages.PASSWORD_CHECK_ERROR})
        }
    }
    async resetPassword(req:Request,res:Response):Promise<void>{
        try {
            const user = await this.userService.resetPassword(res.locals.user.userId,req.body.password)
            if(!user){
                res.status(400).json({success:false,message:commonErrors.RESET_PASSWORD_ERROR})
                return 
            }
            res.status(201).json({success:true,message:commonMessages.PASSWORD_UPDATE_SUCCESS})
        } catch (error) {
            res.status(400).json({success:false,message:commonErrors.RESET_PASSWORD_ERROR})

        }
    }
}