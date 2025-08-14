import { INotificationSessionData ,INotificationReceiveDetails} from "@/interfaces/INotification"
import { showErrorToast, showSuccessToast } from "../toast"
import { socket } from "./socket"

export const sendSessionNotification = async(data:INotificationSessionData)=>{
    try {
        socket.emit('send_notification',data)
    } catch (error) {
        showErrorToast(error)
    }
}

export const registerUserWithSocket = async(userId:string)=>{
    try {
        console.log('emititng userId',userId)
        socket.emit('register',userId)
    } catch (error) {
        showErrorToast(error)
    }
}

export const receiveNotification = async (notificationData:INotificationReceiveDetails)=>{
   try {
      showSuccessToast(`You have session notification from ${notificationData.trainer} to the date and time ${notificationData.date} , ${notificationData.time}`)
   } catch (error) {
      showErrorToast(error)
   }
}