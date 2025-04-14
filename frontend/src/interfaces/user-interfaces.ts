

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



