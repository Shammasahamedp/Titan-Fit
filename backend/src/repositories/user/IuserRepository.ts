import { IUserSignUp,IUserDocument } from "../../interfaces/userInterfaces";

export interface IUserRepository{
    findUserByEmail(email:string):Promise<IUserDocument|null>;
    createUser(data:IUserSignUp):Promise<IUserDocument>
    findOne(googleId:string):Promise<IUserDocument|null>
    saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
    findUserById(userId:string):Promise<IUserDocument|null>
}