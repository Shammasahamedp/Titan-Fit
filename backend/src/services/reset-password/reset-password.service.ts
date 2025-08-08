import { IUserDocument } from "../../interfaces/userInterfaces";
import { commonErrors } from "../../messages/common-errors";
import { emailMessages } from "../../messages/mail-related";
import { IRedisRepository } from "../../repositories/redis/IRedis-repository";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { AppError } from "../../utils/handleResponse";
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
        await sendMail(email,emailMessages.TOKEN_SUBJECT,`click the link http://localhost:5173/reset-password/${token}`)
        } catch (error) {
            console.log(error)
            throw new AppError('something went wrong while send link to email',500)
        }

    }

   async verifyLink(password: string, token: string): Promise<void> {
        try {

           const existingEmail= await this.redisRepository.getToken(token)
           if(!existingEmail ){
            throw new AppError (commonErrors.INVALID_TOKEN,401)
           }
           const hashedPassword = await hashPassword(password)
           const user = await this.userRepository.findOne({email:existingEmail})
           
           if(user){
              await this.userRepository.findByIdAndUpdate(user._id.toString() ,{password:hashedPassword},{new:true})
              return 
           }
           const trainer = await this.trainerRepository.findOne({email:existingEmail})
           if(trainer){
            await this.trainerRepository.findByIdAndUpdate(trainer._id.toString(),{password:hashedPassword},{new:true})
            return 
           }
        } catch (error:any) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError (commonErrors.RESET_PASSWORD_ERROR,500)
        }
    }
}