import { INotificationModel } from "../../models/notification/InotificationModel";
import { IBaseRepository } from "../IbaseRepository";

export interface INotificationRepository extends IBaseRepository<INotificationModel>{
    getNotifications(recipientId:string):Promise<INotificationModel[]|null>
    getCount(recipientId:string):Promise<number>
    changeStatus(id:string):Promise<INotificationModel|null>
}