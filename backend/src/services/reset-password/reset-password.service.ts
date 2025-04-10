import { IUserDocument } from "../../interfaces/userInterfaces";
import { commonErrors } from "../../messages/common-errors";
import { emailMessages } from "../../messages/mail-related";
import { IRedisRepository } from "../../repositories/redis/IRedis-repository";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { sendMail } from "../../utils/nodeMailer";
import { hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/token";
import { IResetPasswordService } from "./IResetPasswordService";

export class ResetPasswordService implements IResetPasswordService{
    private redisRepository:IRedisRepository
    private userRepository:IUserRepository
    private trainerRepository:ITrainerRepository
    constructor(redisRepository:IRedisRepository,userRepository:IUserRepository,trainerRepository:ITrainerRepository){
        this.redisRepository = redisRepository
        this.userRepository = userRepository
        this.trainerRepository = trainerRepository
    }

    async sendLink(email: string): Promise<void> {
        try {
            const token = generateToken()
        await this.redisRepository.saveToken(email,token,600)
        await sendMail(email,emailMessages.TOKEN_SUBJECT,`click the link http://localhost:5173/reset-password/${token}?email=${email}`)
        } catch (error) {
            throw error
        }

    }

   async verifyLink(email:string,password: string, token: string): Promise<void> {
        try {
           const existingToken= await this.redisRepository.getToken(email)
           if(existingToken !== token){
            throw new Error (commonErrors.INVALID_TOKEN)
           }
           const hashedPassword = await hashPassword(password)
           const user = await this.userRepository.findUserByEmail(email)
           
           if(user){
              await this.userRepository.updatePassword(email,hashedPassword)
              return 
           }
           const trainer = await this.trainerRepository.findTrainerByEmail(email)
           if(trainer){
            await this.trainerRepository.updatePassword(email,hashedPassword)
            return 
           }
        } catch (error:any) {
            if(error.message){
                throw new Error(error.message)
            }
            throw new Error (commonErrors.RESET_PASSWORD_ERROR)
        }
    }
}