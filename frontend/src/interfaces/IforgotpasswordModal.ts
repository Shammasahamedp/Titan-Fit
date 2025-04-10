export interface IForgotPasswordModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onSubmit:(email:string)=>void;
    
}