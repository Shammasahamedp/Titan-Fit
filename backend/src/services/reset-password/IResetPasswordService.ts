export interface IResetPasswordService{
    sendLink(email:string,id:string):Promise<void>
    verifyLink(id:string,password:string,token:string):Promise<void>
}