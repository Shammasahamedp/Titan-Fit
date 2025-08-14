import { INotificationModel } from "../../models/notification/InotificationModel";

export interface INotificationService{
    getNotification(userId:string):Promise<INotificationModel[]|[]>
    getNotificationCount(userId:string):Promise<number>
    markNotificationAsRead(id:string):Promise<boolean>
    saveSessionNotification(senderId:string,senderRole:'trainer'|'user'|'admin',recipientId:'trainer'|'user'|'admin',recipientRole:string,date:string,time:string):Promise<INotificationModel|null>
}

// recipientId:{type:String,required:true},
//         recipientRole:{type:String,enum:['user','trainer','admin'],required:true},
//         senderId:{type:String,required:true},
//         senderRole:{type:String,enum:['trainer','admin'],required:true},
//         message:{type:String,required:true},
//         isRead:{type:Boolean,required:true}