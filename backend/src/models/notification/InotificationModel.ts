import { Types,Document } from "mongoose";

export interface INotificationModel extends Document{
    recipientId:string|Types.ObjectId,
    recipientRole:'user'|'trainer'|'admin',
    senderId:string|Types.ObjectId,
    senderRole:'trainer'|'admin',
    message:string,
    isRead:boolean
}

