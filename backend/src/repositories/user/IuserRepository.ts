import { IUserSignUp,IUserDocument } from "../../interfaces/userInterfaces";

export interface IUserRepository{
    findUserByEmail(email:string):Promise<IUserDocument|null>;
    createUser(data:IUserSignUp):Promise<IUserDocument>
}