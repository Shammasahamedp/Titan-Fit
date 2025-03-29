import { IUserSignUp, IUserDocument } from "../../interfaces/userInterfaces";
import { userModel } from "../../models/user/userModel";
import { IUserRepository } from "./IuserRepository";


export class UserRepository implements IUserRepository{
  async  createUser(data: IUserSignUp): Promise<IUserDocument> {
    console.log('this is data',data)
        return (await userModel.create(data)) as IUserDocument
    }
  async  findUserByEmail(email: string): Promise<IUserDocument | null> {
        return await userModel.findOne({email})
    }
   async findOne(googleId: string): Promise<IUserDocument | null> {
        return await userModel.findOne({googleId})
    }
   async saveGoogleId(email: string, googleId: string): Promise<IUserDocument|null> {
        return await userModel.findOneAndUpdate(
          {email:email},
          {$set:{googleId:googleId}},
          {new:true}
        )
    }
}