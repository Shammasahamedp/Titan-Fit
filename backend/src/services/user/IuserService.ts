import { IUserSignUp,IUserDocument } from "../../interfaces/userInterfaces";


export interface IUserService{
    registerUser(data:IUserSignUp):Promise<IUserDocument|null>
}