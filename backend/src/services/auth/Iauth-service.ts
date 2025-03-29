import { ITrainerLoginResponse } from "../../interfaces/trainerInterfaces"
import { ILoginResponse } from "../../interfaces/userInterfaces"

export interface IAuthService{
    findUserOrTrainerByEmail(email:string):Promise<boolean>
    handleGoogleLogin(role:string,email:string,googleId:string):Promise<ILoginResponse|ITrainerLoginResponse|null|undefined>
}