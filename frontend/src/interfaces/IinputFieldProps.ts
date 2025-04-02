import React from "react";
import { UseFormRegister } from "react-hook-form";
export interface IinputFieldProps{
     label:string;
     name:string;
     type?:string;
     placeholder?:string;
     value?:string|number;
     onchange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
     register:UseFormRegister<any>;
     error?:string;
     className?:string;
}