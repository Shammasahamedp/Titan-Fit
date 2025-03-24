import { ITrainerSignUp,ITrainerDocument } from "../../interfaces/trainerInterfaces";

export interface ITrainerRepository{
    findTrainerByEmail(email:string):Promise<ITrainerDocument|null>;
    createTrainer(data:ITrainerSignUp):Promise<ITrainerDocument>
}