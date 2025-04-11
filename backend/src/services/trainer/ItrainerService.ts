import { ITrainerDocument, ITrainerLogin, ITrainerLoginResponse, ITrainerProfile, ITrainerSignUp } from "../../interfaces/trainerInterfaces";


export interface ITrainerService {
    registerTrainer(data:ITrainerSignUp):Promise<ITrainerDocument|null>
    loginTrainer(data:ITrainerLogin):Promise<ITrainerLoginResponse|null>
    getTrainerProfile(trainerId:string):Promise<ITrainerProfile|null>
    editTrainerProfile(trainerId:string,trainerProfileData:ITrainerProfile):Promise<ITrainerProfile|null>
    addTrainerProfilePic(trainerId:string,trainerProfilePic:string):Promise<string|null>
    addCertificate(trainerId:string,trainerCertificate:string):Promise<string[]>
}