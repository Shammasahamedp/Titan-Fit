import React from "react";

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

export interface ITrainers{
    _id:string
    name:string;
    email:string;
    gender:string;
    age:number;
    phone:string;
    bio:string;
    profilePicture?:string;
    trainerCertificate:string[];
    yearsOfExperience:number;
    approved:boolean
}

export interface ITrainerProfileContextType  {
    trainerProfile:ITrainerProfile |null;
    setTrainerProfile:React.Dispatch<React.SetStateAction<ITrainerProfile|null>>
    setPasswordModal:React.Dispatch<React.SetStateAction<boolean>>
}

export interface ITrainerAvailableSlots{
    date:Date;
    slots:string[],
    
}

export interface IAvailability{
    date:Date,
    timeSlots:[{
        startTime:string,
        isBooked:boolean
    }],
    isCompleted:boolean


}


