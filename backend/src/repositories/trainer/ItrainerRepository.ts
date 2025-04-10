import { ITrainerSignUp,ITrainerDocument, ITrainerProfile } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";

export interface ITrainerRepository{
    findTrainerByEmail(email:string):Promise<ITrainerDocument|null>;
    createTrainer(data:ITrainerSignUp):Promise<ITrainerDocument>
    findOne(googleId:string):Promise<ITrainerDocument|null>
    saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
    findTrainerById(trainerId:string):Promise<ITrainerDocument|null>
    editTrainerProfile(trainerId:string,trainerProfileData:ITrainerProfile):Promise<ITrainerDocument|null>
    addProfilePic(trainerId:string,profilePic:string):Promise<ITrainerDocument|null>
    updatePassword(email:string,password:string):Promise<ITrainerDocument|null>
}