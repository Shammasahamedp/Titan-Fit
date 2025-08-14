export interface INotification {
    _id:string,
    recipientId:string,
    recipientRole:string,
    senderId:string,
    senderRole:string,
    message:string,
    createdAt?:string,
    isRead:boolean,
}

export interface INotificationSessionData{
    userId:string,
    trainerId:string,
    time:string,
    date:string
}

export interface INotificationReceiveDetails{
    trainer:string,
    time:string,
    date:string|Date
}

