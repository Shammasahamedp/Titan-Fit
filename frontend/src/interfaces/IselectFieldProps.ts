import { UseFormRegister } from "react-hook-form";

export interface IselectFieldProps{
    label :string;
    name:string
    register : UseFormRegister<any>;
    error?:string;
    options:{value:string,label:string}[]
}