import { UseFormRegisterReturn } from "react-hook-form";

export interface IselectFieldProps{
    label :string;
    register ?: UseFormRegisterReturn;
    error?:string;
    options:{value:string,label:string}[]
}