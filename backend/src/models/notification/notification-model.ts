import mongoose, { Schema } from "mongoose";
import { INotificationModel } from "./InotificationModel";

const NotificationSchema:Schema = new Schema(
    {
        recipientId:{type:String,required:true},
        recipientRole:{type:String,enum:['user','trainer','admin'],required:true},
        senderId:{type:String,required:true},
        senderRole:{type:String,enum:['trainer','admin'],required:true},
        message:{type:String,required:true},
        isRead:{type:Boolean,required:true}
    },{
        timestamps:true
    }
);

export const notificationModel = mongoose.model<INotificationModel>(
    'Notification',
    NotificationSchema
)