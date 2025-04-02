import { ITrainerLoginResponse } from "../../interfaces/trainerInterfaces";
import { ILoginResponse } from "../../interfaces/userInterfaces";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { IAuthService } from "./Iauth-service";


export class AuthService implements IAuthService{
    private userRepository : IUserRepository
    private trainerRepository : ITrainerRepository

    constructor(userRepository:IUserRepository,trainerRepository:ITrainerRepository){
        this.userRepository = userRepository
        this.trainerRepository = trainerRepository
    }

   async findUserOrTrainerByEmail(email: string): Promise<boolean> {
        const existingUser =await this.userRepository.findUserByEmail(email)
        const existingTrainer =await this.trainerRepository.findTrainerByEmail(email)

       if(existingTrainer||existingUser){
        return true
       }else{
        return false
       }
    }

    async handleGoogleLogin(role:string,email:string,googleId:string):Promise<ILoginResponse|ITrainerLoginResponse|null|undefined>{
        if(role === 'user'){
            
            const user= await this.userRepository.findOne(googleId)
            if(user){
                
                const accessToken = generateAccessToken(user?._id.toString() as string)
            const refreshToken = generateRefreshToken(user?._id.toString() as string)
            console.log('this is tokens',accessToken,'llllllllllllllllllllllllllllllllllllllllllllllllllllllll',refreshToken)
            return {user,accessToken,refreshToken}
            }
            if(!user){
                const user = await this.userRepository.findUserByEmail(email)
                if(user){
                    await this.userRepository.saveGoogleId(email,googleId)
                    const accessToken = generateAccessToken(user?._id.toString() as string)
            const refreshToken = generateRefreshToken(user?._id.toString() as string)

            return {user,accessToken,refreshToken}
                }
                throw new Error('user not found')
            }
            

        }else if(role === 'trainer'){
            const trainer= await this.trainerRepository.findOne(googleId)
            if(trainer){
                
                const accessToken = generateAccessToken(trainer?._id.toString() as string)
            const refreshToken = generateRefreshToken(trainer?._id.toString() as string)

            return {trainer,accessToken,refreshToken}
            }
            if(!trainer){
                const trainer = await this.trainerRepository.findTrainerByEmail(email)
                if(trainer){
                    await this.trainerRepository.saveGoogleId(email,googleId)
                    const accessToken = generateAccessToken(trainer?._id.toString() as string)
            const refreshToken = generateRefreshToken(trainer?._id.toString() as string)

            return {trainer,accessToken,refreshToken}
                }
                throw new Error('trainer not found')
            }
            
        }
    }
}