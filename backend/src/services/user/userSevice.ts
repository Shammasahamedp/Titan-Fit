import { IUserSignUp, IUserDocument } from "../../interfaces/userInterfaces";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { IUserService } from "./IuserService";


export class UserService implements IUserService{
    private userRepository:IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository
    }

  async registerUser(data: IUserSignUp): Promise<IUserDocument> {
        const existingUser = await this.userRepository.findUserByEmail(data.email)
        if(existingUser){
            throw new Error("User already exist")
        }
        return await this.userRepository.createUser(data)
    }
}