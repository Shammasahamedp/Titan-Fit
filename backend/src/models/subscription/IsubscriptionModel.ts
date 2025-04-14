import {Document} from 'mongoose'

export interface IsubscriptionModel extends Document{
    planName:string;
    price:number;
    description:string;
    durationInMonth:number;
    credits:number;
    isActive:boolean
}