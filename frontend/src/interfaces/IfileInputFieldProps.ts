import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
export interface IFileinputFieldProps{
     label:string;
     type?:string;
     accept?:string;
     placeholder?:string;
     value?:string;
     onchange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
     register?:UseFormRegisterReturn;
     error?:string;
     className?:string
}