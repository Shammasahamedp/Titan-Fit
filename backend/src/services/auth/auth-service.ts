import { ITrainerDocument, ITrainerLoginResponse } from "../../interfaces/trainerInterfaces";
import { ILoginResponse, IUserDocument } from "../../interfaces/userInterfaces";
import { trainerModel } from "../../models/trainer/trainerModel";
import { userModel } from "../../models/user/userModel";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { AppError } from "../../utils/handleResponse";
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
        const existingUser =await this.userRepository.findOne({email:email})
        const existingTrainer =await this.trainerRepository.findOne({email:email})

       if(existingTrainer||existingUser){
        return true
       }else{
        return false
       }
    }

    async handleGoogleLogin(role:string,email:string,googleId:string):Promise<ILoginResponse|ITrainerLoginResponse|null|undefined>{
        try {
            if(role === 'user'){
            
                const user= await this.userRepository.findOne({googleId:googleId})
                if(user){
                    if(user.blocked){
                        throw new AppError('User is blocked,contact admin',403)
                    }
                    const accessToken = generateAccessToken(user?._id.toString() as string,role)
                const refreshToken = generateRefreshToken(user?._id.toString() as string,role)
                return {user,accessToken,refreshToken}
                }
                if(!user){
                    
                    const user = await this.userRepository.findOne({email})
                    if(user){
                        if(user.blocked){
                            throw new AppError('User is blocked,contact admin',403)
                        }
                        await this.userRepository.findOneAndUpdate({email:email},{googleId:googleId},{new:true})
                        const accessToken = generateAccessToken(user?._id.toString() as string,'user')
                const refreshToken = generateRefreshToken(user?._id.toString() as string,'user')
    
                return {user,accessToken,refreshToken}
                    }
                    else{
                        console.log('reached..')
                        const newUser = new userModel(
                                {
                                    googleId:googleId,
                                    email:email,
                                    isGoogleAuthenticated:true
                                }
                        )
    
                       const user:IUserDocument|null= await newUser.save()
                       
                       const accessToken = generateAccessToken(user?._id.toString() as string,'user')
                       const refreshToken = generateRefreshToken(user?._id.toString() as string,'user')
                       return {user,accessToken,refreshToken,userNew:true}
                    }
                }
                
    
    
            }else if(role === 'trainer'){
                const trainer= await this.trainerRepository.findOne({googleId})
                if(trainer){
                    if(trainer.blocked){
                        throw new AppError('Trainer is blocked,contact admin',403)
                    }
                    
                    const accessToken = generateAccessToken(trainer?._id.toString() as string,'trainer')
                const refreshToken = generateRefreshToken(trainer?._id.toString() as string,'trainer')
    
                return {trainer,accessToken,refreshToken}
                }
                if(!trainer){
                    const trainer = await this.trainerRepository.findOne({email})
                    if(trainer){
                        if(trainer.blocked){
                            throw new AppError('Trainer is blocked,contact admin',403)
                        }
                        await this.trainerRepository.findOneAndUpdate({email},{googleId},{new:true})
                        const accessToken = generateAccessToken(trainer?._id.toString() as string,'trainer')
                const refreshToken = generateRefreshToken(trainer?._id.toString() as string,'trainer')
    
                return {trainer,accessToken,refreshToken}
                    }else{
                        const newTrainer = new trainerModel({
                            googleId:googleId,
                            email:email,
                            isGoogleAuthenticated:true
                        })
    
                        const trainer:ITrainerDocument|null = await newTrainer.save()
                        const accessToken = generateAccessToken(trainer?._id.toString() as string,'trainer')
                        const refreshToken = generateRefreshToken(trainer?._id.toString() as string,'trainer')
                            return {trainer,accessToken,refreshToken,userNew:true}
                    }
                }
                
            }
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            console.log(error)
            throw new AppError('something went wrong while google login',500)
            
        }
    }
}