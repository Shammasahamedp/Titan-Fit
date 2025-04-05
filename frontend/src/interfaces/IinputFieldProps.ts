import React from "react";
import {  UseFormRegisterReturn } from "react-hook-form";
export interface IinputFieldProps{
     label:string;
     type?:string;
     placeholder?:string;
     value?:string|number;
     onchange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
     register:UseFormRegisterReturn<any>;
     error?:string;
     name?:string
     className?:string;
     disabled?:boolean
}