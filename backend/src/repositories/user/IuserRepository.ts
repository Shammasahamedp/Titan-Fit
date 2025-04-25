import { IUserSignUp,IUserDocument, IUserProfile } from "../../interfaces/userInterfaces";
import { IBaseRepository } from "../IbaseRepository";

export interface IUserRepository extends IBaseRepository<IUserDocument>{
    // findUserByEmail(email:string):Promise<IUserDocument|null>;
    // createUser(data:IUserSignUp):Promise<IUserDocument>
    // findOne(googleId:string):Promise<IUserDocument|null>
    // saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
    // findUserById(userId:string):Promise<IUserDocument|null>
    // editUserProfile(userId:string,profileData:IUserProfile):Promise<IUserDocument|null>
    // addProfilePic(userId:string,profilePic:string):Promise<IUserDocument|null>
    // updatePassword(id:string,password:string):Promise<IUserDocument|null>
    // getUsers():Promise<IUserDocument[]|null>
    // userToggle(userId:string,blocked:boolean):Promise<IUserDocument|null>
}