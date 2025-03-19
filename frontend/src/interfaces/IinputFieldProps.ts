import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
export interface IinputFieldProps{
     label:string;
     type?:string;
     placeholder?:string;
     value?:string;
     onchange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
     register?:UseFormRegisterReturn;
     error?:string
}