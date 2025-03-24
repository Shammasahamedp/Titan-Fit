import { ITrainerDocument, ITrainerLogin, ITrainerLoginResponse, ITrainerSignUp } from "../../interfaces/trainerInterfaces";


export interface ITrainerService {
    registerTrainer(data:ITrainerSignUp):Promise<ITrainerDocument|null>
    loginTrainer(data:ITrainerLogin):Promise<ITrainerLoginResponse|null>
}