// import { Types } from "mongoose";
import { ITrainerDocument, ITrainerLogin, ITrainerLoginResponse, ITrainerProfile, ITrainersForChat, ITrainerSignUp } from "../../interfaces/trainerInterfaces";
import { IUsersForChat } from "../../interfaces/userInterfaces";
import { IAvailabilityDocument, IAvailableDate } from "../../models/availability/IavailabilityModel";


export interface ITrainerService {
    registerTrainer(data:ITrainerSignUp):Promise<ITrainerDocument|null>
    loginTrainer(data:ITrainerLogin):Promise<ITrainerLoginResponse|null>
    getTrainerProfile(trainerId:string):Promise<ITrainerProfile|null>
    editTrainerProfile(trainerId:string,trainerProfileData:ITrainerProfile):Promise<ITrainerDocument|null>
    addTrainerProfilePic(trainerId:string,trainerProfilePic:string):Promise<string|null>
    addCertificate(trainerId:string,trainerCertificate:string):Promise<string[]>
    checkPassword(trainerId:string,password:string):Promise<boolean>
    resetPassword(trainerId:string,password:string):Promise<ITrainerDocument|null>
    updateAvailability(trainerId:string,availability:{date:string,slots:string[]}):Promise<IAvailabilityDocument|null>
    getTrainersForChat():Promise<ITrainersForChat[]>
    getUsersForChat(trainerId:string):Promise<IUsersForChat[]>
}