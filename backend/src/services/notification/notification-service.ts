import { notificationMessage } from "../../messages/notification-related";
import { INotificationModel } from "../../models/notification/InotificationModel";
import { INotificationRepository } from "../../repositories/notification/INotificationRepository";
import { AppError } from "../../utils/handleResponse";
import { INotificationService } from "./INotification-service";

export class NotificationService implements INotificationService{
   private notificationRepository : INotificationRepository
    constructor(notificationRepo:INotificationRepository){
        this.notificationRepository = notificationRepo
    }
    async getNotification(userId: string): Promise<INotificationModel[]|[]> {
        try {
            let notifications = await this.notificationRepository.getNotifications(userId)
            if(!notifications){
                return []
            }
            return notifications
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError('something went wrong while fetching notification',500)
        }
    }

    async getNotificationCount(userId: string): Promise<number> {
        try {
            let unreadNotifications = await this.notificationRepository.getCount(userId)
           
            return unreadNotifications
        } catch (error) {
            if(error instanceof AppError){
                throw error 
            }

            throw new AppError('something went wrong while fetching count of notifications',500)
        }
    } 

    async markNotificationAsRead(id: string): Promise<boolean> {
        try {
            let updatedNotification = await this.notificationRepository.changeStatus(id)
            if(!updatedNotification){
                throw new AppError(notificationMessage.NOTIFICATION_NOT_FOUND,404)
            }
            if(updatedNotification.isRead){
                return true
            }
            throw 'error'
        } catch (error) {
            if(error instanceof AppError){
                throw error 
            }

            throw new AppError('something went wrong while changing the notification status',500)
        }
    }

    async saveSessionNotification(senderId: string, senderRole: "trainer" | "admin", recipientId:string , recipientRole: "trainer" | "user" | "admin", date: string, time: string): Promise<INotificationModel | null> {
        try {
            let message = `You have a session notification from trainer time :${time} ,date:${date}`
            let notificationData = {
                recipientId,
                recipientRole,
                senderId,
                senderRole,
                message
            }
           return await this.notificationRepository.create(notificationData)
        } catch (error) {
            if(error instanceof AppError){
                throw error 
            }
            throw new AppError('something went wrong while save the notification',500)
        }
    }
}