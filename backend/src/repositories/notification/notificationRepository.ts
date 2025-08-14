import { INotificationModel } from "../../models/notification/InotificationModel";
import { notificationModel } from "../../models/notification/notification-model";
import { BaseRepository } from "../baseRepository";
import { INotificationRepository } from "./INotificationRepository";

export class NotificationRepository extends BaseRepository<INotificationModel> implements INotificationRepository{
    constructor(){
        super(notificationModel)
    }
    async getNotifications(recipientId: string): Promise<INotificationModel[] | null> {
        return await notificationModel.find({recipientId:recipientId})
    }

    async getCount(recipientId: string): Promise<number> {
        return await notificationModel.countDocuments({recipientId:recipientId,isRead:false})
    }

    async changeStatus(id: string): Promise<INotificationModel | null> {
        return await notificationModel.findByIdAndUpdate(
            {_id:id},
            {$set:{isRead:true}},
            {new:true}
        )
    }
}