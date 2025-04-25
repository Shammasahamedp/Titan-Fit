export interface IResetPasswordService{
    sendLink(email:string):Promise<void>
    verifyLink(password:string,token:string):Promise<void>
}