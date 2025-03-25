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
   
}