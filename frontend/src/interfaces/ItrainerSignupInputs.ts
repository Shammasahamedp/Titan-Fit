export interface TrainerSignupSchemaInput{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    gender:string;
    age:number;
    yearsOfExperience:number;
    trainerCertificate:FileList;
    bio:string
}

export interface TrainerSignupData{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    gender:string;
    age:number;
    yearsOfExperience:number;
    trainerCertificate:string;
    bio:string
}