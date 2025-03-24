import { IUserSignUp, IUserDocument, IUserLogin, ILoginResponse } from "../../interfaces/userInterfaces";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { IUserService } from "./IuserService";
import { hashPassword,comparePassword } from "../../utils/password";
import { generateAccessToken,generateRefreshToken } from "../../utils/jwt";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";

export class UserService implements IUserService{
    private userRepository:IUserRepository;
    private trainerRepository:ITrainerRepository;
    constructor(userRepository:IUserRepository,trainerRepository:ITrainerRepository){
        this.userRepository = userRepository
        this.trainerRepository = trainerRepository
    }

  async registerUser(data: IUserSignUp): Promise<IUserDocument> {
        const existingUser = await this.userRepository.findUserByEmail(data.email)
        const existingTrainer = await this.trainerRepository.findTrainerByEmail(data.email)
        if(existingUser || existingTrainer){
            throw new Error("User already exist")
        }
        data.password = await hashPassword(data.password)
        return await this.userRepository.createUser(data)
    }
    
    async loginUser(data:IUserLogin):Promise<ILoginResponse>{
        const user = await this.userRepository.findUserByEmail(data.email)
        if(!user){
            throw new Error("User not found")
        }
       const isValid= comparePassword(data.password,user.password)
       if(!isValid){
          throw new Error('Invalid credentials')
       }
        const accessToken = generateAccessToken(user._id.toString()) 
        const refreshToken = generateRefreshToken(user._id.toString())
       

        return  {user,accessToken,refreshToken}
    }
}