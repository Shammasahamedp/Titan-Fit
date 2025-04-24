import {  UseFormRegisterReturn } from "react-hook-form";

export interface IselectFieldProps{
    label :string;
    register : UseFormRegisterReturn<any>;
    error?:string;
    options:{value:string|boolean,label:string}[]
}