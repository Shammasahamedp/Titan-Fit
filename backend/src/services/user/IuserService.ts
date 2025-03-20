import { IUserSignUp,IUserDocument, IUserLogin, ILoginResponse } from "../../interfaces/userInterfaces";


export interface IUserService{
    registerUser(data:IUserSignUp):Promise<IUserDocument|null>
    loginUser(data:IUserLogin):Promise<ILoginResponse|null>
}