import { IRedisRepository } from "../../repositories/redis/IRedis-repository";
import { IOtpService } from "./IOtpService";
import { generateOtp } from "../../utils/otp";
import { sendMail } from "../../utils/nodeMailer";
import { emailMessages } from "../../messages/mail-related";
export class OtpService implements IOtpService{
    private otpRepository:IRedisRepository

    constructor(otpRepository:IRedisRepository){
        this.otpRepository = otpRepository
    }

    async sendOtp(email: string): Promise<void> {
        const otp = generateOtp()
        await this.otpRepository.saveOtp(email,otp,60)
        await sendMail(email,emailMessages.OTP_SUBJECT,`Your otp is ${otp}`)
    }

    async verifyOtp(email: string, enteredOtp: string): Promise<boolean> {
        const storedOtp = await this.otpRepository.getOtp(email)
        if(storedOtp&&storedOtp===enteredOtp){
            await this.otpRepository.deleteOtp(email)
            return true
        }
        return false
    }
}