export interface IOtpRepository{
    saveOtp(email:string,otp:string,expiry:number):Promise<void>;
    getOtp(email:string):Promise<string|null>;
    deleteOtp(email:string):Promise<void>
}