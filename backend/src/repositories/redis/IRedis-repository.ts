export interface IRedisRepository{
    saveOtp(email:string,otp:string,expiry:number):Promise<void>;
    getOtp(email:string):Promise<string|null>;
    deleteOtp(email:string):Promise<void>
    saveToken(token:string,email:string,expiry:number):Promise<void>
    getToken(token:string):Promise<string|null>
    deleteToken(token:string):Promise<void>
}