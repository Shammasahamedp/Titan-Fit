import { INotificationService } from "../services/notification/INotification-service";
import { Request,Response } from "express";
import { handleError } from "../utils/handleResponse";
export class NotificationController{
    private notficationService :INotificationService
    constructor(notificationService:INotificationService){
        this.notficationService = notificationService
    }

    async getNotification (req:Request,res:Response){
        try {
            const notifications = await this.notficationService.getNotification(res.locals.user.userId)
            res.status(200).json({success:true,notifications})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getCount(req:Request,res:Response){
        try {
            const count = await this.notficationService.getNotificationCount(res.locals.user.userId)
            res.status(200).json({success:true,count})
        } catch (error) {
            handleError(res,error)
        }
    }

    async changeNotificationStatus(req:Request,res:Response){
        try {
            const {id} = req.params
            const success = await this.notficationService.markNotificationAsRead(id as string)
            res.status(200).json({success:true})
        } catch (error) {
            handleError(res,error)
        }
    }
}