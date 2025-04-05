import { AnyObjectSchema, InferType } from "yup";
import { IinputFieldProps } from "./IinputFieldProps";
import { SubmitHandler } from "react-hook-form";
export interface    IFormProps<T extends AnyObjectSchema> {
    initialData : Partial<InferType<T>>|null
    fieldConfig : Omit<IinputFieldProps,"register">[];
    onSubmit:SubmitHandler<InferType<T>>,
    schema : T
}