import { ITrainerDocument, ITrainerLogin, ITrainerLoginResponse, ITrainerProfile, ITrainerSignUp } from "../../interfaces/trainerInterfaces";


export interface ITrainerService {
    registerTrainer(data:ITrainerSignUp):Promise<ITrainerDocument|null>
    loginTrainer(data:ITrainerLogin):Promise<ITrainerLoginResponse|null>
    getTrainerProfile(trainerId:string):Promise<ITrainerProfile|null>
    editTrainerProfile(trainerId:string,trainerProfileData:ITrainerProfile):Promise<ITrainerDocument|null>
    addTrainerProfilePic(trainerId:string,trainerProfilePic:string):Promise<string|null>
    addCertificate(trainerId:string,trainerCertificate:string):Promise<string[]>
    checkPassword(trainerId:string,password:string):Promise<boolean>
    resetPassword(trainerId:string,password:string):Promise<ITrainerDocument|null>
}