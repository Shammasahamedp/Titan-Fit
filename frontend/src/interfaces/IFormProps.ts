import { IinputFieldProps } from "./IinputFieldProps";

export interface IFormProps {
    initialData : {[key:string]:any}|null;
    fieldConfig : Omit<IinputFieldProps,"register">[]
}