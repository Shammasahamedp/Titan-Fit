import { IUserSignUp,IUserDocument, IUserProfile } from "../../interfaces/userInterfaces";

export interface IUserRepository{
    findUserByEmail(email:string):Promise<IUserDocument|null>;
    createUser(data:IUserSignUp):Promise<IUserDocument>
    findOne(googleId:string):Promise<IUserDocument|null>
    saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
    findUserById(userId:string):Promise<IUserDocument|null>
    editUserProfile(userId:string,profileData:IUserProfile):Promise<IUserDocument|null>
    addProfilePic(userId:string,profilePic:string):Promise<IUserDocument|null>
}