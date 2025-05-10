import React from "react";


export interface SignupFormatInputs{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    gender:string;
    age:number;
    fitnessGoal:string;
    fitnessLevel:string
}

export interface ISubscriptionDetails{
    planName:string,
    subscriptionId:string,
    paymentId:string,
    startDate:Date,
    endDate:Date,
    creditsRemaining:number,
    totalCredits:number
    status:'active'|'completed'
}

export interface IUserProfile{
    name:string;
    email:string;
    phone:string;
    profilePicture?:string;
    age:number;
    weight:number;
    height:number;
    gender:string;
    fitnessGoal:string;
    fitnessLevel:string;
    subscription?:ISubscriptionDetails[]
}

export interface IUserEditProfile{
    name:string;
    email:string;
    phone:string;
    age:number;
    weight:number;
    height:number;
    gender:string;
    fitnessGoal:string;
    fitnessLevel:string;
}

export interface IUsers{
    _id:string;
    name:string;
    email:string;
    phone:string;
    profilePicture?:string;
    age:number;
    weight:number;
    height:number;
    gender:string;
    fitnessGoal:string;
    fitnessLevel:string;
    blocked:boolean
}

export interface IUserProfileContextType{
    userProfile:IUserProfile|null,
    setConfirmPasswordModal:React.Dispatch<React.SetStateAction<boolean>>,
    setUserProfile:React.Dispatch<React.SetStateAction<IUserProfile|null>>
}

export interface ISubscribersTableData{
    id:string,
    name:string,
    planName:string,
    status:string,
    totalCredits:number,
    creditsRemaining:number
}

export interface ISingleUserSubscriptions{
    planName:string,
        subscriptionId: string,
        paymentId: string,
        startDate: string,
        endDate: string,
        creditsRemaining:number,
        totalCredits:number,
        status:'active'|'completed',
}


