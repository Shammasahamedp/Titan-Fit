import React from "react";

export interface IinputFieldProps{
     label:string;
     type?:string;
     placeholder?:string;
     value?:string;
     onchange?:(e:React.ChangeEvent<HTMLInputElement>) => void
}