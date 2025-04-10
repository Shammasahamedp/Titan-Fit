export interface IResetPasswordService{
    sendLink(email:string):Promise<void>
    verifyLink(email:string,password:string,token:string):Promise<void>
}