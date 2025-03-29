import { ITrainerSignUp,ITrainerDocument } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";

export interface ITrainerRepository{
    findTrainerByEmail(email:string):Promise<ITrainerDocument|null>;
    createTrainer(data:ITrainerSignUp):Promise<ITrainerDocument>
    findOne(googleId:string):Promise<ITrainerDocument|null>
    saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
}