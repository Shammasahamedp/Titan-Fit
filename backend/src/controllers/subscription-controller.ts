import { subscriptionMessage } from "../messages/subscription-related";
import { ISubscriptionService } from "../services/subscription/IsubscriptionService";
import { Request,Response } from "express";
import { handleError } from "../utils/handleResponse";
export class SubscriptionController{
    private subscriptionService:ISubscriptionService

    constructor(subscriptionService:ISubscriptionService){
        this.subscriptionService = subscriptionService
    }

    async addSubscription(req:Request,res:Response):Promise<void>{
          try {
              const newSubscription = await this.subscriptionService.addSubscription(req.body)
              res.status(201).json({success:true,message:subscriptionMessage.SUBSCRIPTION_ADD_SUCCESSFULL})
          } catch (error:any) {
            handleError(res,error)
          }
    }

    async getSubAllSubscription(req:Request,res:Response):Promise<void>{
        try {
            const subscriptions = await this.subscriptionService.getAllSubscriptions()
            res.status(200).json({success:true,message:subscriptionMessage.SUBSCRIPTION_ADD_SUCCESSFULL,subscriptions})
        } catch (error) {
            handleError(res,error)
        }
    }

    async editSubscriptionPlan(req:Request,res:Response):Promise<void>{
        try {
            const editedSubscription = await this.subscriptionService.editSubscription(req.body.toEditSubscription,req.body.id)
            res.status(200).json({success:true,message:subscriptionMessage.SUBSCRIPTION_EDIT_SUCCESSS})
        } catch (error) {
            handleError(res,error)
        }
    }
 
    async getActiveSubscription(req:Request,res:Response):Promise<void>{
        try {
            const activeSubscriptions = await this.subscriptionService.getActiveSubscription()
            res.status(200).json({success:true,message:subscriptionMessage.SUBSCRIPTION_GET_SUCCESSFULL,activeSubscriptions})
        } catch (error) {
            handleError(res,error)
        }
    }
}