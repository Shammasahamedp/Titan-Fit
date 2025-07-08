import { adminMessages } from "../messages/admin-related";
import { Request,Response } from "express";
import { handleError } from "../utils/handleResponse";
import { IAdminService } from "../services/admin/IadminService";
import { subscriptionMessage } from "../messages/subscription-related";
import { userMessages } from "../messages/userRelated";
import { trainerMessages } from "../messages/trainerRelated";

export class AdminController {
    private adminService:IAdminService

    constructor(adminService:IAdminService){
        this.adminService=adminService
    }

    async loginAdmin (req:Request,res:Response):Promise<void>{
        try {
            const loginResults = await this.adminService.loginAdmin(req.body)
            res.cookie('refreshToken',loginResults?.refreshToken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
                sameSite:"strict"
            })
            const data = {
                admin:loginResults?.admin,
                accessToken:loginResults?.accessToken
            }
            
            res.status(200).json({success:true,data,message:adminMessages.LOGIN_SUCCESS})
        } catch (error:any) {
           handleError(res,error)
        }
    }

    async getUsers (req:Request,res:Response):Promise<void>{
        try {
            const users = await this.adminService.getUsers()
            res.status(200).json({success:true,message:adminMessages.GET_USERS_SUCCESS,users})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getTrainers(req:Request,res:Response):Promise<void>{
        try {
            const trainers = await this.adminService.getTrainers()
            res.status(200).json({success:true,message:adminMessages.GET_TRAINERS_SUCCESS,trainers})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getNewTrainers(req:Request,res:Response):Promise<void>{
        try {
            const newTrainers = await this.adminService.getNewTrainers()
            res.status(200).json({success:true,message:adminMessages.GET_TRAINERS_SUCCESS,newTrainers})
        } catch (error) {
            handleError(res,error)
        }
    }

    async changeTrainerApproval(req:Request,res:Response):Promise<void>{
        try {
           const trainer= await this.adminService.changeTrainerApproval(req.body.trainerId,req.body.approved,req.body.reason)
           if(trainer){
            res.status(200).json({success:true,message:adminMessages.TOGGLE_TRAINER_SUCCESS,trainer})
           }
        } catch (error) {
            handleError(res,error)
        }
    }

    async userToggle(req:Request,res:Response):Promise<void>{
        try {
            const user = await this.adminService.userToggle(req.body.userId,req.body.blocked)
            if(user){
                res.status(200).json({success:true,message:adminMessages.TOGGLE_USER_SUCCESS,user})
            }
        } catch (error) {
            handleError(res,error)
        }
    }

    async getSubscribers(req:Request,res:Response):Promise<void>{
        try {
            const subscribers = await this.adminService.getSubscribers()
            res.status(200).json({success:true,message:subscriptionMessage.SUBSCRIBERS_GET_SUCCESSFULL,subscribers})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getSingleUserSubscriptions(req:Request,res:Response):Promise<void>{
        try {
            const subscriptions = await this.adminService.getSingleUserSubscriptions(req.params.id)
            res.status(200).json({success:true,message:userMessages.SUBSCRIPTION_GET_SUCCESS,subscriptions})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getSingleTrainer (req:Request,res:Response):Promise<void>{
        try {
            const {trainer,availability} = await this.adminService.getSingleTrainer(req.params.id)
            res.status(200).json({success:true,message:trainerMessages.GET_TRAINER_PROFILE_SUCCESS,trainer,availability})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getSingleUser (req:Request,res:Response):Promise<void>{
        try {
            const {user} = await this.adminService.getSingleUser(req.params.id)
            res.status(200).json({success:true,message:userMessages.GET_PROFILE_SUCCESS,user})
        } catch (error) {
            handleError(res,error)
        }
    }
     
   
   
}