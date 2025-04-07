import { trainerMessages } from "../messages/trainerRelated";
import { ITrainerService } from "../services/trainer/ItrainerService";
import { Request,Response } from "express";

export class TrainerController {
    private trainerService:ITrainerService

    constructor(trainerService:ITrainerService){
        this.trainerService = trainerService
    }

    async registerTrainer(req:Request,res:Response):Promise<void>{
        try {
           
            const trainer = await this.trainerService.registerTrainer(req.body)
            res.status(201).json({success:true,data:trainer,message:trainerMessages.SIGNUP_SUCCESS})
        } catch (error:any) {
            res.status(400).json({success:false,message:error.message})
        }
    }

    async loginTrainer(req:Request,res:Response):Promise<void>{
        try {
            const response = await this.trainerService.loginTrainer(req.body)
            res.cookie('refreshToken',response?.refreshToken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
                sameSite:"lax"
            })
            const data ={
                trainer:response?.trainer,
                accessToken:response?.accessToken
            }
            res.status(200).json({success:true,data,message:trainerMessages.LOGIN_SUCCESS})
        } catch (error:any) {
            res.status(401).json({success:false,message:trainerMessages.LOGIN_FAILED})
        }
    }
}