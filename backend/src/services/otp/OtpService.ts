import { IRedisRepository } from "../../repositories/redis/IRedis-repository";
import { IOtpService } from "./IOtpService";
import { generateOtp } from "../../utils/otp";
import { sendMail } from "../../utils/nodeMailer";
import { emailMessages } from "../../messages/mail-related";
import { AppError } from "../../utils/handleResponse";
export class OtpService implements IOtpService{
    private otpRepository:IRedisRepository

    constructor(otpRepository:IRedisRepository){
        this.otpRepository = otpRepository
    }

    async sendOtp(email: string): Promise<void> {
        try {
            const otp = generateOtp()
        console.log('this is otp:',otp)
        await this.otpRepository.saveOtp(email,otp,60)
        await sendMail(email,emailMessages.OTP_SUBJECT,`Your otp is ${otp}`)
        } catch (error) {
            throw new AppError('something went wrong while send otp',500)
        }
    }

    async verifyOtp(email: string, enteredOtp: string): Promise<boolean> {
       try {
        const storedOtp = await this.otpRepository.getOtp(email)
        if(storedOtp&&storedOtp===enteredOtp){
            await this.otpRepository.deleteOtp(email)
            return true
        }
        return false
       } catch (error) {
        throw new AppError('something went wrong while verify otp',500)
       }
    }
}