export interface ITrainerProfile{
    name:string;
    email:string;
    gender:string;
    age:number;
    phone:string;
    bio:string;
    profilePicture?:string;
    trainerCertificate:string[];
    yearsOfExperience:number;
    
}

export interface ITrainerEditProfile{
    name:string;
    email:string;
    gender:string;
    age:number;
    phone:string;
    bio:string;
    yearsOfExperience:number;
}