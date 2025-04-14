import { adminMessages } from "../messages/admin-related";
import { AdminService } from "../services/admin/adminService";
import { Request,Response } from "express";


export class AdminController {
    private adminService:AdminService

    constructor(adminService:AdminService){
        console.log('this is adminService',adminService)
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
            res.status(401).json({success:false,message:error.message})
        }
    }

    async getUsers (req:Request,res:Response):Promise<void>{
        try {
            const users = await this.adminService.getUsers()
            res.status(200).json({success:true,message:adminMessages.GET_USERS_SUCCESS,users})
        } catch (error) {
            res.status(400).json({success:false,message:adminMessages.GET_USERS_FAILURE})
        }
    }

    async getTrainers(req:Request,res:Response):Promise<void>{
        try {
            const trainers = await this.adminService.getTrainers()
            res.status(200).json({success:true,message:adminMessages.GET_TRAINERS_SUCCESS,trainers})
        } catch (error) {
            res.status(400).json({success:false,message:adminMessages.GET_TRAINERS_FAILURE})
        }
    }

    async changeTrainerApproval(req:Request,res:Response):Promise<void>{
        try {
           const trainer= await this.adminService.changeTrainerApproval(req.body.trainerId,req.body.approved)
           if(trainer){
            res.status(200).json({success:true,message:adminMessages.TOGGLE_TRAINER_SUCCESS,trainer})
           }
        } catch (error) {
            res.status(400).json({success:false,message:adminMessages.TOGGLE_TRAINER_FAILURE})
        }
    }

    async userToggle(req:Request,res:Response):Promise<void>{
        try {
            const user = await this.adminService.userToggle(req.body.userId,req.body.blocked)
            if(user){
                res.status(200).json({success:true,message:adminMessages.TOGGLE_USER_SUCCESS,user})
            }
        } catch (error) {
            res.status(400).json({success:false,message:adminMessages.TOGGLE_USER_FAILURE})
        }
    }
   
}