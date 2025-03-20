import { Request, Response } from "express";
import { IOtpService } from "../services/otp/IOtpService";
import { otpMessages } from "../messages/otp-related";
import { userMessages } from "../messages/userRelated";

export class OtpController {
  private otpService: IOtpService;

  constructor(otpSevice: IOtpService) {
    this.otpService = otpSevice;
  }

  async sendOtp(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    if (!email)
      res
        .status(400)
        .json({ success: false, message: userMessages.REQUIRE_EMAIL });
    this.otpService.sendOtp(email);
    res
      .status(200)
      .json({ success: true, message: otpMessages.OTP_SEND_SUCCESSFULL });
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    if (!email || !otp){
        res
        .status(400)
        .json({ success: false, message: otpMessages.REQUIRE_EMAIL_OTP });
    }
      
    const isValid = await this.otpService.verifyOtp(email, otp);
    if (isValid === false) {
      res
        .status(400)
        .json({ success: false, message: otpMessages.INVALID_OTP });
        return 
    }
    res.status(200).json({ success: true, messages: otpMessages.SUCCESS_OTP });
  }
}
