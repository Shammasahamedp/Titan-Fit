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
            res.status(400).json({success:false,message:'email already exists'})
        }
    }
}