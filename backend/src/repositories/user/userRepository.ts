import { IUserSignUp, IUserDocument } from "../../interfaces/userInterfaces";
import { userModel } from "../../models/user/userModel";
import { IUserRepository } from "./IuserRepository";


export class UserRepository implements IUserRepository{
  async  createUser(data: IUserSignUp): Promise<IUserDocument> {
        return (await userModel.create(data)) as IUserDocument
    }
  async  findUserByEmail(email: string): Promise<IUserDocument | null> {
        return await userModel.findOne({email})
    }
}