export interface IRedisRepository{
    saveOtp(email:string,otp:string,expiry:number):Promise<void>;
    getOtp(email:string):Promise<string|null>;
    deleteOtp(email:string):Promise<void>
    saveToken(email:string,token:string,expiry:number):Promise<void>
    getToken(email:string):Promise<string|null>
    deleteToken(email:string):Promise<void>
}